#!/usr/bin/env python3
"""
RN Plugin Runner - 执行 RN 插件的全部适配流程

用法: python run_rn_plugin.py <git_url> [阶段编号 ...]

例如:
  python run_rn_plugin.py https://github.com/.../react-native-device-country
  python run_rn_plugin.py https://github.com/.../react-native-device-country 3 4
  python run_rn_plugin.py https://github.com/.../react-native-device-country "1 3"

阶段编号固定为 1-6：
1=analysis 2=planning 3=coding-library 4=testing(example生成) 5=device-verify(测试验证) 6=summary
不传则默认 1 2 3 4 5 6（全部执行 run-all）

功能:
1. 从 git URL 解析仓库名，转换为插件名（- 替换为 _）
2. 检查 repos-rn 目录下是否存在该仓库
3. 如果不存在: 添加到 plugins.json 并 git clone
4. 如果存在: 调用 rn.py clean 清空 ohos（默认 non-build 模式，保留 build 缓存）
5. 未克隆时调用 adapt-workflow「Clone 源码」同款 API（git clone/pull + workspace 符号链接）
6. 调用 adapt-workflow API 执行全部/指定阶段适配，并实时 tail 各阶段 logs/*.log
7. 可选（--runner-log）将脚本终端输出写入 .rn-ohos-adaptation/logs/runner_*.log
"""

import argparse
import contextlib
import json
import os
import re
import threading
from datetime import datetime, timedelta, timezone
import shutil
import subprocess
import sys
import time
import urllib.parse
import urllib.request
import urllib.error
from pathlib import Path

# Windows 编码修复：确保 stdout/stderr 使用 utf-8
if sys.stdout:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if sys.stderr:
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')


# ─────────────────────────────────────────────────────────────────
# 配置常量
# ─────────────────────────────────────────────────────────────────

PROJECT_ROOT = Path(__file__).parent.parent.resolve()
REPOS_DIR = PROJECT_ROOT / "repos-rn"
PLUGINS_JSON = REPOS_DIR / "plugins.json"
API_BASE = "http://localhost:3000/api"
PROFILE_ID = "rn-ohos"
ADAPTATION_DIR = ".rn-ohos-adaptation"
WORKFLOW_DIR = PROJECT_ROOT / "adapt-workflow"
RN_PY = (
    PROJECT_ROOT
    / "agent-rn"
    / ".claude"
    / "skills"
    / "tool-ohos-plugin-repo"
    / "tool"
    / "rn.py"
)

# 1-6 与 rn-ohos Profile STAGES 顺序严格一致（禁止改编号映射）
# 1=analysis  2=planning  3=coding-library  4=testing(example生成)  5=device-verify(测试验证)  6=summary
RN_PIPELINE_STAGES: tuple[tuple[int, str, str], ...] = (
    (1, "analysis", "现状分析"),
    (2, "planning", "方案制定"),
    (3, "coding-library", "鸿蒙库适配"),
    (4, "testing", "example生成"),
    (5, "device-verify", "测试验证"),
    (6, "summary", "适配总结"),
)
RN_STAGE_ID_BY_NUM: dict[int, str] = {n: sid for n, sid, _ in RN_PIPELINE_STAGES}
RN_STAGE_LABEL_BY_NUM: dict[int, str] = {n: label for n, _, label in RN_PIPELINE_STAGES}
RN_STAGE_NUM_BY_ID: dict[str, int] = {sid: n for n, sid, _ in RN_PIPELINE_STAGES}
DEFAULT_STAGE_NUMS: tuple[int, ...] = tuple(n for n, _, _ in RN_PIPELINE_STAGES)
_active_profile_id: str = PROFILE_ID

# ANSI 转义（与 adapt-workflow stripAnsi 一致，便于终端阅读）
_ANSI_ESCAPE = re.compile(r"\x1b\[[0-9;]*[a-zA-Z]")
_LOG_HEADER_TIME = re.compile(r"^时间:\s*(.+)$", re.MULTILINE)
_LOG_LINE_TIME = re.compile(r"^\[(\d{2}):(\d{2}):(\d{2})\]\s*(.*)$")
# 仅 tail Agent 阶段日志（排除 runner_*.log，否则会读 tee 回写形成死循环）
_STAGE_LOG_STEM = re.compile(
    r"^(?P<stage>analysis|planning|coding-library|testing|device-verify|summary)"
    r"(?:_retry_(?P<retry>\d+))?$"
)


class _TeeStream:
    """同时写入终端与 runner 日志文件。"""

    def __init__(self, stream, log_file):
        self._stream = stream
        self._log_file = log_file

    def write(self, data: str) -> int:
        if not data:
            return 0
        self._stream.write(data)
        self._log_file.write(data)
        self._log_file.flush()
        return len(data)

    def flush(self) -> None:
        self._stream.flush()
        self._log_file.flush()

    def isatty(self) -> bool:
        return self._stream.isatty()

    def fileno(self):
        return self._stream.fileno()


@contextlib.contextmanager
def runner_session_log(
    plugin_dir: Path,
    *,
    repo_url: str,
    stage_nums: list[int],
):
    """将后续 print 同时落盘到 .rn-ohos-adaptation/logs/runner_*.log。"""
    logs_dir = plugin_dir / ADAPTATION_DIR / "logs"
    logs_dir.mkdir(parents=True, exist_ok=True)
    ts = time.strftime("%Y%m%d_%H%M%S")
    log_path = logs_dir / f"runner_{ts}.log"
    latest_path = logs_dir / "runner-latest.log"

    with open(log_path, "w", encoding="utf-8") as log_file:
        log_file.write("=== RN Plugin Runner 会话日志 ===\n")
        log_file.write(f"记录时间: {datetime.now().astimezone().isoformat()}\n")
        log_file.write(f"仓库 URL: {repo_url}\n")
        log_file.write(f"计划阶段: {format_stage_plan(stage_nums)}\n")
        log_file.write(f"插件目录: {plugin_dir}\n")
        log_file.write("=" * 60 + "\n\n")
        log_file.flush()

        out = _TeeStream(sys.__stdout__, log_file)
        err = _TeeStream(sys.__stderr__, log_file)
        old_out, old_err = sys.stdout, sys.stderr
        sys.stdout, sys.stderr = out, err
        try:
            yield log_path
        finally:
            sys.stdout, sys.stderr = old_out, old_err
            log_file.write(f"\n{'=' * 60}\n")
            log_file.write(f"结束时间: {datetime.now().astimezone().isoformat()}\n")

    try:
        shutil.copy2(log_path, latest_path)
    except OSError:
        pass


def api_path(path: str, profile_id: str | None = None) -> str:
    """为 API 路径附加 profileId，使服务端读取 repos-rn/plugins.json。"""
    pid = profile_id or _active_profile_id
    sep = "&" if "?" in path else "?"
    return f"{path}{sep}profileId={urllib.parse.quote(pid)}"


# ─────────────────────────────────────────────────────────────────
# 辅助函数
# ─────────────────────────────────────────────────────────────────

def parse_repo_url(url: str) -> tuple[str, str]:
    """解析 git URL，返回 (仓库名, 插件名)"""
    # 去掉 .git 后缀
    url = url.rstrip("/")
    if url.endswith(".git"):
        url = url[:-4]
    
    # 提取最后一部分作为仓库名
    parts = url.split("/")
    repo_name = parts[-1] if parts else ""
    
    if not repo_name:
        raise ValueError(f"无法从 URL 解析仓库名: {url}")
    
    # 替换 - 为 _ 得到插件名
    plugin_name = repo_name.replace("-", "_")
    
    return repo_name, plugin_name


def generate_id() -> str:
    """生成插件 ID（与 adapt-workflow 的 generateId 一致）
    JavaScript: Date.now().toString(36) + Math.random().toString(36).substr(2)
    结果类似: mnd0kcrcpriaxgpjn8
    """
    import random
    timestamp_part = int(time.time() * 1000).__str__(36)
    random_part = random.random().__str__(36)[2:]  # 去掉 "0." 前缀
    return timestamp_part + random_part


def read_plugins_json() -> dict:
    """读取 plugins.json"""
    if not PLUGINS_JSON.exists():
        return {"plugins": []}
    with open(PLUGINS_JSON, "r", encoding="utf-8") as f:
        return json.load(f)


def write_plugins_json(data: dict):
    """写入 plugins.json"""
    PLUGINS_JSON.parent.mkdir(parents=True, exist_ok=True)
    with open(PLUGINS_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


def find_plugin_by_name(plugin_name: str) -> dict | None:
    """根据名称查找插件"""
    data = read_plugins_json()
    for p in data["plugins"]:
        if p["name"] == plugin_name:
            return p
    return None


def find_plugin_by_name_api(plugin_name: str) -> dict | None:
    """从 adapt-workflow API 按名称查找插件（与面板列表一致）。"""
    try:
        plugins = call_api("GET", "/plugins")
        if isinstance(plugins, list):
            for p in plugins:
                if p.get("name") == plugin_name:
                    return p
    except Exception:
        pass
    return find_plugin_by_name(plugin_name)


def ensure_plugin_via_api(repo_url: str, plugin_name: str) -> dict:
    """POST /api/plugins 注册插件（已存在则返回已有记录，同面板「添加插件」）。"""
    existing = find_plugin_by_name_api(plugin_name)
    if existing:
        print(f"[INFO] 插件已注册: {plugin_name} (id={existing['id']}, status={existing.get('status')})")
        return existing

    repo_url_git = repo_url if repo_url.endswith(".git") else repo_url + ".git"
    plugin = call_api(
        "POST",
        "/plugins",
        {
            "repoUrl": repo_url_git,
            "name": plugin_name,
            "tpcRepoUrl": f"https://github.com/HarmonyOS-TPC/{plugin_name}.git",
        },
    )
    print(f"[INFO] 已通过 API 注册插件: {plugin_name} (id={plugin['id']})")
    return plugin


def start_clone_via_api(plugin_id: str, *, branch: str | None = None) -> dict:
    """POST /api/plugins/:id/clone，与面板「Clone 源码」相同（异步后台执行）。"""
    body = {"branch": branch} if branch else {}
    return call_api("POST", f"/plugins/{plugin_id}/clone", body)


def wait_clone_via_api(
    plugin_id: str,
    *,
    poll_interval: float = 3.0,
    timeout: float = 600.0,
) -> dict:
    """轮询插件列表直到 Clone 结束（同前端 clonePlugin 轮询逻辑）。"""
    print(f"[INFO] 等待 Clone 完成（最长 {int(timeout)} 秒）...")
    deadline = time.time() + timeout
    last_status: str | None = None

    while time.time() < deadline:
        plugins = call_api("GET", "/plugins")
        plugin = next((p for p in plugins if p.get("id") == plugin_id), None)
        if not plugin:
            raise RuntimeError(f"插件 {plugin_id} 不在列表中")

        status = plugin.get("status") or "unknown"
        if status != last_status:
            print(f"[INFO] Clone 状态: {status}")
            last_status = status

        if status == "cloned":
            commit = plugin.get("commitHash") or ""
            print(f"[OK] Clone 完成（commit: {commit or '未知'}）")
            return plugin
        if status == "clone_failed":
            raise RuntimeError("Clone 失败（面板状态 clone_failed）")

        time.sleep(poll_interval)

    raise RuntimeError(f"等待 Clone 超时（{int(timeout)} 秒）")


def clone_plugin_via_api(
    plugin_id: str,
    *,
    branch: str | None = None,
    poll_interval: float = 3.0,
    clone_timeout: float = 600.0,
) -> dict:
    """
    调用 adapt-workflow clone-service：
    - git clone 或 pull 源码到 repos-rn/{name}
    - 记录 commitHash / cloneTime
    - ensureWorkspaceLinks（.claude、opencode.json、CLAUDE.md 等）
    """
    print(
        "[INFO] 调用 adapt-workflow Clone API"
        "（git + workspace 符号链接，同面板「Clone 源码」）"
    )
    start_clone_via_api(plugin_id, branch=branch)
    return wait_clone_via_api(
        plugin_id, poll_interval=poll_interval, timeout=clone_timeout
    )


# subprocess text=True 在 Windows 上默认 gbk，工具输出常为 utf-8
_SUBPROCESS_UTF8 = {"capture_output": True, "text": True, "encoding": "utf-8", "errors": "replace"}


def clear_ohos_content(plugin_dir: Path, *, full: bool = False) -> bool:
    """调用 agent-rn 的 rn.py clean 清空 ohos（默认 non-build；full=True 时加 --full）。"""
    if not RN_PY.is_file():
        print(f"[ERROR] rn.py 不存在: {RN_PY}")
        return False

    cmd = [sys.executable, str(RN_PY), "clean", "--plugin-root", str(plugin_dir)]
    if full:
        cmd.append("--full")

    mode = "full（除 .git 外全部删除）" if full else "non-build（保留 build 缓存，删源码/产物）"
    print(f"[INFO] 调用 rn.py clean（{mode}）")
    print(f"[INFO] 命令: {' '.join(cmd)}")

    try:
        result = subprocess.run(
            cmd,
            cwd=str(plugin_dir),
            check=False,
            **_SUBPROCESS_UTF8,
        )
    except OSError as e:
        print(f"[ERROR] 执行 rn.py clean 失败: {e}")
        return False

    if result.stdout:
        print(result.stdout.rstrip())
    if result.stderr:
        print(result.stderr.rstrip(), file=sys.stderr)

    if result.returncode != 0:
        print(f"[ERROR] rn.py clean 退出码 {result.returncode}")
        return False

    print("[OK] rn.py clean 完成")
    return True


def call_api(method: str, path: str, data: dict = None) -> dict:
    """调用 adapt-workflow API（使用 _active_profile_id）"""
    url = f"{API_BASE}{api_path(path)}"
    
    try:
        if method == "GET":
            with urllib.request.urlopen(url, timeout=30) as resp:
                return json.loads(resp.read().decode('utf-8'))
        elif method == "POST":
            req_data = json.dumps(data or {}).encode('utf-8')
            req = urllib.request.Request(
                url,
                data=req_data,
                headers={"Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode('utf-8'))
        else:
            raise ValueError(f"不支持的 HTTP 方法: {method}")
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8')
        print(f"[ERROR] API 调用失败: {e.code} - {body}")
        raise
    except urllib.error.URLError as e:
        print(f"[ERROR] API 调用失败: {e.reason}")
        raise


def is_plugin_in_queue(plugin_id: str) -> bool:
    """检查插件是否仍在全局执行队列的 running/queued 中。"""
    batch = call_api("GET", "/plugins/batch/status")
    for entry in batch.get("running") or []:
        if entry.get("pluginId") == plugin_id:
            return True
    for entry in batch.get("queued") or []:
        if entry.get("pluginId") == plugin_id:
            return True
    return False


def wait_queue_idle(plugin_id: str, timeout: float = 45) -> bool:
    """等待插件从全局队列的 running/queued 中消失。"""
    deadline = time.time() + timeout
    while time.time() < deadline:
        if not is_plugin_in_queue(plugin_id):
            return True
        time.sleep(1)
    return False


def stop_plugin_run(plugin_id: str) -> None:
    """终止该插件在全局队列中的全部执行，并等待队列槽位释放。"""
    try:
        result = call_api("POST", f"/plugins/{plugin_id}/stop-all")
        print(f"[INFO] 已请求 stop-all: {result}")
    except Exception as e:
        print(f"[WARN] stop-all 失败: {e}")

    try:
        result = call_api("POST", f"/plugins/{plugin_id}/kill-agent")
        print(f"[INFO] 已请求 kill-agent: {result}")
    except Exception as e:
        print(f"[WARN] kill-agent 失败: {e}")

    try:
        result = call_api("POST", "/plugins/batch/cancel", {"pluginIds": [plugin_id]})
        print(f"[INFO] 已请求 batch/cancel: {result}")
    except Exception as e:
        print(f"[WARN] batch/cancel 失败: {e}")

    if wait_queue_idle(plugin_id, timeout=45):
        print("[OK] 全局队列已释放该插件槽位")
    else:
        print(
            "[WARN] 45 秒内队列仍显示该插件在 running/queued；"
            "请重启 adapt-workflow 服务后再试"
        )


def run_all_enqueued(result: dict) -> bool:
    """判断 POST run-all 是否成功入队或已启动。"""
    if result.get("queued") is True:
        return True
    if result.get("status") in ("started", "waiting"):
        return True
    return False


def parse_stage_numbers(stage_args: list[str] | None) -> list[int]:
    """解析阶段参数，如 [] → 1-5；['3','4'] 或 ['3 4'] → [3,4]。"""
    if not stage_args:
        return list(DEFAULT_STAGE_NUMS)
    nums: list[int] = []
    for tok in stage_args:
        for part in tok.replace(",", " ").split():
            part = part.strip()
            if not part:
                continue
            if not part.isdigit():
                raise ValueError(f"无效阶段编号: {part!r}（须为 1-5 的整数）")
            n = int(part)
            if n < 1 or n > 5:
                raise ValueError(f"阶段编号须在 1-5 之间，收到: {n}")
            nums.append(n)
    if not nums:
        return list(DEFAULT_STAGE_NUMS)
    seen: set[int] = set()
    ordered: list[int] = []
    for n in nums:
        if n not in seen:
            seen.add(n)
            ordered.append(n)
    return ordered


def stage_numbers_to_ids(nums: list[int]) -> list[str]:
    return [RN_STAGE_ID_BY_NUM[n] for n in nums]


def format_stage_plan(nums: list[int]) -> str:
    parts = [f"{n}={RN_STAGE_ID_BY_NUM[n]}({RN_STAGE_LABEL_BY_NUM[n]})" for n in nums]
    return ", ".join(parts)


def is_full_pipeline(stage_nums: list[int]) -> bool:
    return stage_nums == list(DEFAULT_STAGE_NUMS)


def iter_sse_events(url: str):
    """读取 adapt-workflow SSE（data: JSON）。"""
    req = urllib.request.Request(
        url,
        method="GET",
        headers={"Accept": "text/event-stream"},
    )
    with urllib.request.urlopen(req) as resp:
        while True:
            raw = resp.readline()
            if not raw:
                break
            line = raw.decode("utf-8", errors="replace").rstrip("\r\n")
            if not line.startswith("data:"):
                continue
            payload = line[5:].strip()
            if not payload:
                continue
            try:
                yield json.loads(payload)
            except json.JSONDecodeError:
                continue


def run_stage_and_wait(plugin_id: str, stage_id: str) -> tuple[bool, str | None]:
    """通过 GET .../stages/{id}/run SSE 执行单阶段并等待结束。"""
    path = f"/plugins/{plugin_id}/stages/{stage_id}/run"
    url = f"{API_BASE}{api_path(path)}"
    last_error: str | None = None
    for event in iter_sse_events(url):
        etype = event.get("type")
        if etype == "exit":
            ok = event.get("status") == "success"
            if not ok:
                last_error = event.get("errorType") or f"exit code {event.get('code')}"
            return ok, last_error
        if etype == "error":
            return False, event.get("error") or "unknown error"
        if etype == "gate_failed":
            errs = event.get("errors") or []
            return False, "质量门禁未通过: " + "; ".join(str(e) for e in errs)
    return False, "SSE 流结束但未收到 exit 事件"


def evaluate_selected_stages(plugin_id: str, stage_ids: list[str]) -> tuple[bool, str]:
    detail = call_api("GET", f"/plugins/{plugin_id}/detail")
    statuses = {s.get("id"): s.get("status") for s in (detail.get("stages") or []) if s.get("id")}
    for sid in stage_ids:
        st = statuses.get(sid, "unknown")
        num = RN_STAGE_NUM_BY_ID.get(sid, "?")
        if st == "failed":
            return False, f"阶段 {num}({sid}) 失败"
        if st != "success":
            return False, f"阶段 {num}({sid}) 状态为 {st}，未完成"
    return True, f"所选 {len(stage_ids)} 个阶段均成功"


def run_selected_stages(
    plugin_id: str,
    stage_nums: list[int],
    *,
    plugin_dir: Path | None = None,
    tail_logs: bool = True,
    log_tail_interval: float = 2.0,
    tail_history: bool = False,
) -> bool:
    """按 1-5 编号顺序依次执行指定阶段（非全部 5 阶段时走单阶段 API）。"""
    stage_ids = stage_numbers_to_ids(stage_nums)
    print(f"[INFO] 将依次执行阶段: {format_stage_plan(stage_nums)}")

    log_follower = (
        StageLogFollower(plugin_dir, tail_from_start=tail_history)
        if (tail_logs and plugin_dir)
        else None
    )
    tail_stop = threading.Event()

    def tail_loop() -> None:
        while not tail_stop.is_set():
            if log_follower:
                log_follower.flush_new()
            tail_stop.wait(log_tail_interval)

    tail_thread: threading.Thread | None = None
    if log_follower:
        tail_thread = threading.Thread(target=tail_loop, daemon=True)
        tail_thread.start()

    start_time = time.time()
    try:
        stop_plugin_run(plugin_id)
        for num in stage_nums:
            stage_id = RN_STAGE_ID_BY_NUM[num]
            label = RN_STAGE_LABEL_BY_NUM[num]
            print(f"\n{'=' * 60}")
            print(f"[INFO] 开始阶段 {num}: {stage_id}（{label}）")
            print(f"{'=' * 60}")
            ok, err = run_stage_and_wait(plugin_id, stage_id)
            if log_follower:
                log_follower.flush_all()
            if not ok:
                print(f"[FAIL] 阶段 {num} 执行失败: {err or '未知原因'}")
                return False
            print(f"[OK] 阶段 {num} 完成")
        ok, msg = evaluate_selected_stages(plugin_id, stage_ids)
        elapsed = int(time.time() - start_time)
        print_stage_timing_summary(
            plugin_id, plugin_dir, wall_elapsed_sec=elapsed, stage_ids=stage_ids
        )
        if ok:
            print(f"[OK] {msg}，脚本总耗时 {elapsed} 秒")
        else:
            print(f"[FAIL] {msg}，脚本总耗时 {elapsed} 秒")
        return ok
    finally:
        tail_stop.set()
        if tail_thread:
            tail_thread.join(timeout=log_tail_interval + 1)


def start_run_all(plugin_id: str, *, retry_on_busy: bool = True) -> dict:
    """启动全部执行；若已在队列中则先 stop-all 再重试一次。"""
    result = call_api("POST", f"/plugins/{plugin_id}/run-all")
    if run_all_enqueued(result):
        return result

    reason = result.get("reason", "")
    if retry_on_busy and reason in ("already_running", "already_queued"):
        print(f"[WARN] 插件已在执行/排队中 ({reason})，先停止并等待队列释放后重试...")
        stop_plugin_run(plugin_id)
        if is_plugin_in_queue(plugin_id):
            raise RuntimeError(
                "停止后队列槽位仍未释放。请重启 adapt-workflow（npm restart）后重试。"
            )
        result = call_api("POST", f"/plugins/{plugin_id}/run-all")
        if run_all_enqueued(result):
            return result
        raise RuntimeError(f"重试后仍无法入队: {result}")

    raise RuntimeError(f"无法启动全部执行: {result}")


def strip_ansi(text: str) -> str:
    return _ANSI_ESCAPE.sub("", text)


def pick_latest_log_per_stage(logs_dir: Path) -> dict[str, Path]:
    """
    每个阶段只取最新日志：优先 retry 编号最大，同编号取 mtime 更新。
    例如同时存在 coding-library.log 与 coding-library_retry_2.log 时只返回后者。
    """
    best: dict[str, tuple[int, float, Path]] = {}
    if not logs_dir.is_dir():
        return {}
    for path in logs_dir.glob("*.log"):
        if not StageLogFollower.is_agent_stage_log(path):
            continue
        m = _STAGE_LOG_STEM.match(path.stem)
        if not m:
            continue
        stage = m.group("stage")
        retry = int(m.group("retry") or 0)
        mtime = path.stat().st_mtime
        prev = best.get(stage)
        if prev is None or retry > prev[0] or (retry == prev[0] and mtime >= prev[1]):
            best[stage] = (retry, mtime, path)
    return {stage: path for stage, (_, _, path) in best.items()}


class StageLogFollower:
    """跟踪 .rn-ohos-adaptation/logs/*.log 并打印新增内容。"""

    def __init__(
        self,
        plugin_dir: Path,
        *,
        max_line_chars: int = 500,
        tail_from_start: bool = False,
    ):
        self.logs_dir = plugin_dir / ADAPTATION_DIR / "logs"
        self.max_line_chars = max_line_chars
        self.tail_from_start = tail_from_start
        self._offsets: dict[str, int] = {}
        self._primed: set[str] = set()
        self._opened: set[str] = set()
        self._log_start_ms: dict[str, int | None] = {}
        self._last_line_ts: dict[str, str] = {}

    @staticmethod
    def _parse_iso_ms(iso: str) -> int | None:
        try:
            return int(
                datetime.fromisoformat(iso.strip().replace("Z", "+00:00"))
                .timestamp()
                * 1000
            )
        except ValueError:
            return None

    @classmethod
    def _parse_header_start_ms(cls, text: str) -> int | None:
        m = _LOG_HEADER_TIME.search(text)
        if not m:
            return None
        return cls._parse_iso_ms(m.group(1))

    def _ensure_log_start(self, key: str, log_file: Path, chunk: str) -> None:
        if key in self._log_start_ms:
            if self._log_start_ms[key] is None:
                found = self._parse_header_start_ms(chunk)
                if found:
                    self._log_start_ms[key] = found
            return
        start = self._parse_header_start_ms(chunk)
        if start is None:
            try:
                head = log_file.read_text(encoding="utf-8", errors="replace")[:4096]
                start = self._parse_header_start_ms(head)
            except OSError:
                pass
        self._log_start_ms[key] = start

    def _resolve_bracket_ts(self, key: str, hour: int, minute: int, second: int) -> str:
        """行内 [HH:MM:SS] 可能是 UTC（OpenCode）或本地时间（langgraph），按与阶段起点接近程度判定。"""
        start_ms = self._log_start_ms.get(key)
        if start_ms:
            anchor = start_ms / 1000
            start_utc = datetime.fromtimestamp(anchor, tz=timezone.utc)
            start_local = start_utc.astimezone()
            line_utc = start_utc.replace(
                hour=hour, minute=minute, second=second, microsecond=0
            )
            line_local = start_local.replace(
                hour=hour, minute=minute, second=second, microsecond=0
            )
            diff_utc = abs(line_utc.timestamp() - anchor)
            diff_local = abs(line_local.timestamp() - anchor)
            if diff_local <= diff_utc:
                line_dt = line_local
                ts = line_dt.strftime("%Y-%m-%d %H:%M:%S")
            else:
                line_dt = line_utc
                if line_dt.timestamp() < anchor - 3600:
                    line_dt += timedelta(days=1)
                ts = line_dt.astimezone().strftime("%Y-%m-%d %H:%M:%S")
        else:
            now = datetime.now().astimezone()
            line_dt = now.replace(
                hour=hour, minute=minute, second=second, microsecond=0
            )
            ts = line_dt.strftime("%Y-%m-%d %H:%M:%S")
        self._last_line_ts[key] = ts
        return ts

    def _timestamp_and_body(self, key: str, line: str) -> tuple[str, str]:
        s = line.rstrip()
        m = _LOG_LINE_TIME.match(s)
        if m:
            ts = self._resolve_bracket_ts(
                key, int(m.group(1)), int(m.group(2)), int(m.group(3))
            )
            body = m.group(4).strip() if m.group(4) else ""
            return ts, body or s
        if s.startswith("时间:"):
            found = self._parse_iso_ms(s.split(":", 1)[1].strip())
            if found:
                self._log_start_ms[key] = found
                ts = datetime.fromtimestamp(found / 1000).astimezone().strftime(
                    "%Y-%m-%d %H:%M:%S"
                )
                self._last_line_ts[key] = ts
                return ts, s
        if key in self._last_line_ts:
            return self._last_line_ts[key], s
        ts = time.strftime("%Y-%m-%d %H:%M:%S")
        self._last_line_ts[key] = ts
        return ts, s

    @staticmethod
    def stage_from_log_name(name: str) -> str:
        m = _STAGE_LOG_STEM.match(Path(name).stem)
        if m:
            return m.group("stage")
        stem = Path(name).stem
        if "_retry_" in stem:
            return stem.split("_retry_")[0]
        return stem

    @staticmethod
    def is_agent_stage_log(path: Path) -> bool:
        """是否为 adapt-workflow 写入的阶段日志（非 runner 会话日志）。"""
        return _STAGE_LOG_STEM.match(path.stem) is not None

    def _list_log_files(self) -> list[Path]:
        """每阶段仅返回最新一份日志（含 retry）。"""
        latest = pick_latest_log_per_stage(self.logs_dir)
        return sorted(latest.values(), key=lambda p: p.stat().st_mtime)

    def _prime_log_offset(self, key: str, log_file: Path, raw: bytes) -> None:
        """首次跟踪某日志：默认跳到文件末尾，避免刷屏历史内容。"""
        if key in self._offsets:
            return
        if self.tail_from_start:
            self._offsets[key] = 0
            return
        self._offsets[key] = len(raw)
        if key not in self._primed:
            self._primed.add(key)
            label = self.stage_from_log_name(log_file.name)
            print(
                f"[INFO] 阶段日志 {log_file.name}（{label}）从当前末尾开始跟踪，"
                "不回放历史行（可用 --tail-history 改为从头）"
            )

    def flush_new(self) -> int:
        """输出各日志文件的新增行，返回本次打印的行数。"""
        printed = 0
        for log_file in self._list_log_files():
            key = str(log_file.resolve())
            try:
                raw = log_file.read_bytes()
            except OSError:
                continue
            self._prime_log_offset(key, log_file, raw)
            offset = self._offsets.get(key, 0)
            if len(raw) <= offset:
                continue
            chunk = strip_ansi(raw[offset:].decode("utf-8", errors="replace"))
            self._offsets[key] = len(raw)
            if not chunk.strip():
                continue
            label = self.stage_from_log_name(log_file.name)
            self._ensure_log_start(key, log_file, chunk)
            if key not in self._opened:
                self._opened.add(key)
                print(f"\n{'─' * 60}")
                print(f"[LOG] 阶段 {label} ← {log_file.relative_to(self.logs_dir.parent)}")
                print(f"{'─' * 60}")
            for line in chunk.splitlines():
                ts, body = self._timestamp_and_body(key, line)
                if not body:
                    continue
                if len(body) > self.max_line_chars:
                    body = body[: self.max_line_chars] + "…"
                print(f"[{label}] {ts} | {body}")
                printed += 1
        return printed

    def flush_all(self) -> None:
        """读完所有日志（结束前兜底）。"""
        while True:
            n = self.flush_new()
            if n == 0:
                break


def get_running_stage_from_detail(plugin_id: str) -> str | None:
    """从 detail API 读取正在运行的阶段（不依赖 run-all-status）。"""
    try:
        detail = call_api("GET", f"/plugins/{plugin_id}/detail")
        for stage in detail.get("stages") or []:
            if stage.get("status") == "running":
                return stage.get("id")
    except Exception:
        pass
    return None


def describe_log_progress(plugin_dir: Path | None) -> str | None:
    """根据各阶段最新日志判断是否在写入。"""
    if plugin_dir is None:
        return None
    logs_dir = plugin_dir / ADAPTATION_DIR / "logs"
    latest_by_stage = pick_latest_log_per_stage(logs_dir)
    if not latest_by_stage:
        return None
    path = max(latest_by_stage.values(), key=lambda p: p.stat().st_mtime)
    age = time.time() - path.stat().st_mtime
    stage = StageLogFollower.stage_from_log_name(path.name)
    return f"日志: {path.name}（阶段 {stage}，{int(age)} 秒前更新）"


def describe_adaptation_progress(plugin_dir: Path | None) -> str | None:
    """根据产物目录判断是否有进展。"""
    if plugin_dir is None:
        return None
    adapt = plugin_dir / ADAPTATION_DIR
    if not adapt.is_dir():
        return None
    json_files = sorted(adapt.glob("*.json"), key=lambda p: p.stat().st_mtime)
    if not json_files:
        return "产物目录已创建，尚无阶段 json"
    latest = json_files[-1]
    return f"产物: {len(json_files)} 个 json，最新 {latest.name}"


def format_run_progress(
    plugin_id: str,
    plugin_dir: Path | None,
    *,
    current_stage: str | None,
    completed: list,
) -> str:
    """汇总当前进度（阶段 1 为 OpenCode analysis；LangGraph 仅用于 coding-library/testing）。"""
    parts: list[str] = []
    if current_stage:
        parts.append(f"run-all-status 阶段: {current_stage}")
    detail_stage = get_running_stage_from_detail(plugin_id)
    if detail_stage:
        parts.append(f"detail 运行中: {detail_stage}")
    log_hint = describe_log_progress(plugin_dir)
    if log_hint:
        parts.append(log_hint)
    adapt_hint = describe_adaptation_progress(plugin_dir)
    if adapt_hint:
        parts.append(adapt_hint)
    if completed:
        done_ids = [s.get("id") for s in completed if s.get("id")]
        parts.append(f"已完成: {', '.join(done_ids)}")
    if parts:
        return " | ".join(parts)
    return (
        "队列活跃中（run-all-status 的 currentStageId 可能仍为 null；"
        "阶段 1 不是 LangGraph，请看 detail/日志/产物判断是否在跑 analysis）"
    )


def format_duration_ms(ms: int | float | None) -> str:
    """与 adapt-workflow frontend formatDuration 一致。"""
    if ms is None or ms < 0:
        return "-"
    total_seconds = int(ms // 1000)
    hours, rem = divmod(total_seconds, 3600)
    minutes, seconds = divmod(rem, 60)
    if hours > 0:
        return f"{hours}h {minutes}m {seconds}s"
    if minutes > 0:
        return f"{minutes}m {seconds}s"
    return f"{seconds}s"


def format_ts_ms(ms: int | float | None) -> str:
    if ms is None:
        return "-"
    try:
        return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(ms / 1000))
    except (OSError, OverflowError, ValueError):
        return "-"


_STATUS_LABEL = {
    "success": "成功",
    "failed": "失败",
    "running": "运行中",
    "idle": "未开始",
    "pending": "待执行",
    "interrupted": "中断",
    "unknown": "未知",
}


def parse_log_timings(log_path: Path) -> dict:
    """从阶段日志解析开始/结束/耗时（与 stage-manager.parseStageTimings 一致）。"""
    try:
        content = log_path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return {"startTime": None, "endTime": None, "duration": None}
    start_m = re.search(r"^时间: (.+)$", content, re.MULTILINE)
    end_m = re.search(r"^结束时间: (.+)$", content, re.MULTILINE)
    start_ms = end_ms = None
    if start_m:
        try:
            start_ms = int(
                datetime.fromisoformat(start_m.group(1).strip().replace("Z", "+00:00"))
                .timestamp()
                * 1000
            )
        except ValueError:
            pass
    if end_m:
        try:
            end_ms = int(
                datetime.fromisoformat(end_m.group(1).strip().replace("Z", "+00:00"))
                .timestamp()
                * 1000
            )
        except ValueError:
            pass
    duration = (end_ms - start_ms) if (start_ms and end_ms) else None
    return {"startTime": start_ms, "endTime": end_ms, "duration": duration}


def get_latest_stage_log(logs_dir: Path, stage_id: str) -> Path | None:
    """取某阶段最新日志（含 retry）。"""
    return pick_latest_log_per_stage(logs_dir).get(stage_id)


def collect_stage_timings(plugin_id: str, plugin_dir: Path | None) -> list[dict]:
    """从 detail API 与本地 logs 汇总各阶段耗时。"""
    detail = call_api("GET", f"/plugins/{plugin_id}/detail")
    stages = detail.get("stages") or []
    logs_dir = (plugin_dir / ADAPTATION_DIR / "logs") if plugin_dir else None
    now_ms = int(time.time() * 1000)
    rows: list[dict] = []

    for s in stages:
        sid = s.get("id") or ""
        status = s.get("status") or "unknown"
        start_ms = s.get("startTime")
        end_ms = s.get("endTime")
        duration_ms = s.get("duration")

        if logs_dir and logs_dir.is_dir():
            log_path = get_latest_stage_log(logs_dir, sid)
            if log_path:
                local = parse_log_timings(log_path)
                if start_ms is None:
                    start_ms = local.get("startTime")
                if end_ms is None:
                    end_ms = local.get("endTime")
                if duration_ms is None:
                    duration_ms = local.get("duration")

        if status == "running" and start_ms and duration_ms is None:
            duration_ms = max(0, now_ms - int(start_ms))

        rows.append(
            {
                "id": sid,
                "name": s.get("name") or sid,
                "status": status,
                "startTime": start_ms,
                "endTime": end_ms,
                "duration": duration_ms,
            }
        )
    return rows


def print_stage_timing_summary(
    plugin_id: str,
    plugin_dir: Path | None,
    *,
    wall_elapsed_sec: int | None = None,
    stage_ids: list[str] | None = None,
) -> list[dict]:
    """打印并保存各阶段执行时间汇总。"""
    try:
        rows = collect_stage_timings(plugin_id, plugin_dir)
    except Exception as e:
        print(f"[WARN] 无法获取阶段耗时: {e}")
        return []

    if stage_ids is not None:
        allowed = set(stage_ids)
        rows = [r for r in rows if r.get("id") in allowed]

    if not rows:
        return rows

    print(f"\n{'=' * 72}")
    print("各阶段执行时间")
    print(f"{'=' * 72}")
    print(f"{'阶段':<18} {'状态':<8} {'耗时':<12} {'开始':<20} {'结束':<20}")
    print("-" * 72)

    total_tracked_ms = 0
    counted = 0
    for r in rows:
        dur = r.get("duration")
        if dur is not None:
            total_tracked_ms += int(dur)
            counted += 1
        sid = r.get("id") or ""
        num = RN_STAGE_NUM_BY_ID.get(sid)
        stage_col = f"{num}-{sid}" if num else sid
        label = _STATUS_LABEL.get(r["status"], r["status"])
        print(
            f"{stage_col:<18} {label:<8} {format_duration_ms(dur):<12} "
            f"{format_ts_ms(r.get('startTime')):<20} {format_ts_ms(r.get('endTime')):<20}"
        )

    print("-" * 72)
    print(
        f"{'合计(有耗时记录)':<18} {'':<8} {format_duration_ms(total_tracked_ms):<12} "
        f"{f'{counted}/{len(rows)} 个阶段':<20}"
    )
    if wall_elapsed_sec is not None:
        print(f"{'脚本墙钟时间':<18} {'':<8} {format_duration_ms(wall_elapsed_sec * 1000):<12}")
    print(f"{'=' * 72}\n")

    if plugin_dir:
        summary_path = plugin_dir / ADAPTATION_DIR / "run-timing-summary.json"
        payload = {
            "pluginId": plugin_id,
            "recordedAt": time.strftime("%Y-%m-%dT%H:%M:%S.000Z", time.gmtime()),
            "wallElapsedSec": wall_elapsed_sec,
            "stages": rows,
            "totalTrackedMs": total_tracked_ms,
            "stagesWithDuration": counted,
        }
        try:
            summary_path.parent.mkdir(parents=True, exist_ok=True)
            with open(summary_path, "w", encoding="utf-8") as f:
                json.dump(payload, f, indent=2, ensure_ascii=False)
            print(f"[INFO] 阶段耗时已写入: {summary_path}")
        except OSError as e:
            print(f"[WARN] 写入 run-timing-summary.json 失败: {e}")

    return rows


def evaluate_adaptation_outcome(plugin_id: str) -> tuple[bool, str]:
    """根据详情页阶段状态判断适配是否成功。"""
    detail = call_api("GET", f"/plugins/{plugin_id}/detail")
    stages = detail.get("stages") or []
    if not stages:
        return False, "无阶段信息"

    statuses = {s.get("id"): s.get("status") for s in stages if s.get("id")}
    if any(st == "running" for st in statuses.values()):
        return False, "仍有阶段在运行"

    failed = [sid for sid, st in statuses.items() if st == "failed"]
    if failed:
        return False, f"失败阶段: {', '.join(failed)}"

    pending = [sid for sid, st in statuses.items() if st in ("idle", "pending", "unknown")]
    success = [sid for sid, st in statuses.items() if st == "success"]
    if pending and not success:
        return False, f"未完成阶段: {', '.join(pending)}"

    overall = detail.get("adaptation", {}) or {}
    overall_status = overall.get("overall_status")
    if overall_status == "failed":
        return False, "adaptation.overall_status=failed"
    if overall_status == "success":
        return True, "全部阶段成功"

    if success and not failed:
        return True, f"已完成 {len(success)} 个阶段"

    return False, json.dumps(statuses, ensure_ascii=False)


def wait_for_run_all_completion(
    plugin_id: str,
    poll_interval: int = 30,
    *,
    plugin_dir: Path | None = None,
    tail_logs: bool = True,
    log_tail_interval: float = 2.0,
    stage_ids: list[str] | None = None,
    tail_history: bool = False,
) -> bool:
    """等待全部执行完成，并 tail 各阶段 logs/*.log"""
    print("[INFO] 等待全部执行完成...")
    if tail_logs and plugin_dir:
        logs_dir = plugin_dir / ADAPTATION_DIR / "logs"
        print(f"[INFO] 将实时输出阶段日志: {logs_dir}")
        print(f"[INFO] 状态每 {poll_interval} 秒静默检查（不重复打印 [RUNNING] 汇总）")
    else:
        print(f"[INFO] 状态每 {poll_interval} 秒打印一次进度汇总")

    max_wait_time = 7200
    start_time = time.time()
    first_status_check = True
    last_completed_count = 0
    last_reported_stage: str | None = None
    last_status_poll = 0.0
    log_follower = (
        StageLogFollower(plugin_dir, tail_from_start=tail_history)
        if (tail_logs and plugin_dir)
        else None
    )

    def finish(success: bool, message: str) -> bool:
        if log_follower:
            log_follower.flush_all()
        elapsed = int(time.time() - start_time)
        print_stage_timing_summary(
            plugin_id,
            plugin_dir,
            wall_elapsed_sec=elapsed,
            stage_ids=stage_ids,
        )
        if success:
            print(f"[OK] {message}，脚本总耗时 {elapsed} 秒")
        else:
            print(f"[FAIL] {message}，脚本总耗时 {elapsed} 秒")
        if plugin_dir:
            logs_dir = plugin_dir / ADAPTATION_DIR / "logs"
            if logs_dir.is_dir():
                paths = sorted(logs_dir.glob("*.log"), key=lambda p: p.stat().st_mtime)
                if paths:
                    print("[INFO] 阶段日志文件:")
                    for p in paths:
                        print(f"       {p}")
        return success

    while True:
        try:
            if log_follower:
                log_follower.flush_new()

            elapsed = time.time() - start_time
            if elapsed > max_wait_time:
                return finish(False, f"等待超时，超过 {max_wait_time} 秒")

            now = time.time()
            if first_status_check or (now - last_status_poll) >= poll_interval:
                last_status_poll = now
                status = call_api("GET", f"/plugins/{plugin_id}/run-all-status")

                if first_status_check and not tail_logs:
                    print(
                        f"[DEBUG] run-all-status: "
                        f"{json.dumps(status, indent=2, ensure_ascii=False)}"
                    )
                first_status_check = False

                active = status.get("active", False)
                completed = status.get("completedStages") or []
                current_stage = status.get("currentStageId")

                if active:
                    if len(completed) > last_completed_count:
                        last_completed_count = len(completed)
                    # 开启日志 tail 时不再周期性打印 [RUNNING] 汇总（与 [analysis] 行重复）
                    if not tail_logs:
                        progress = format_run_progress(
                            plugin_id,
                            plugin_dir,
                            current_stage=current_stage,
                            completed=completed,
                        )
                        print(f"[RUNNING] {progress} | 已等待 {int(elapsed)} 秒")
                    else:
                        stage = current_stage or get_running_stage_from_detail(plugin_id)
                        if stage and stage != last_reported_stage:
                            last_reported_stage = stage
                            print(f"[INFO] 进入阶段: {stage}")
                elif completed:
                    if log_follower:
                        log_follower.flush_all()
                    all_success = all(s.get("success", False) for s in completed)
                    if all_success:
                        return finish(
                            True,
                            f"全部执行成功完成，共 {len(completed)} 个阶段",
                        )
                    failed = [s for s in completed if not s.get("success", False)]
                    return finish(False, f"全部执行失败，失败阶段: {failed}")
                else:
                    ok, msg = evaluate_adaptation_outcome(plugin_id)
                    if ok:
                        return finish(True, f"适配完成 ({msg})")

                    batch = call_api("GET", "/plugins/batch/status")
                    recent = [
                        r
                        for r in (batch.get("recentCompleted") or [])
                        if r.get("pluginId") == plugin_id
                    ]
                    if recent:
                        latest = recent[0]
                        if latest.get("success"):
                            return finish(True, "队列记录显示本次执行成功")
                        err = (
                            latest.get("errorMessage")
                            or latest.get("errorType")
                            or "未知错误"
                        )
                        return finish(False, f"队列记录显示失败: {err}")

                    if elapsed < 15:
                        print(f"[WAITING] 等待任务启动... ({int(elapsed)} 秒)")
                    else:
                        return finish(False, f"执行已结束但结果不成功: {msg}")

            time.sleep(log_tail_interval)

        except Exception as e:
            print(f"[ERROR] 获取执行状态失败: {e}")
            time.sleep(log_tail_interval)


def check_workflow_server() -> bool:
    """检查 adapt-workflow 服务是否运行"""
    try:
        call_api("GET", "/plugins")
        return True
    except:
        return False


def start_workflow_server() -> bool:
    """启动 adapt-workflow 服务"""
    print(f"[INFO] 启动 adapt-workflow 服务...")
    
    try:
        subprocess.run(
            ["npm", "start"],
            cwd=str(WORKFLOW_DIR),
            check=True,
            shell=True,
            **_SUBPROCESS_UTF8,
        )
        # 等待服务启动
        time.sleep(5)
        
        if check_workflow_server():
            print(f"[OK] adapt-workflow 服务已启动")
            return True
        else:
            print(f"[ERROR] 服务启动失败")
            return False
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] 启动服务失败: {e.stderr}")
        return False


# ─────────────────────────────────────────────────────────────────
# 主流程
# ─────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="执行 RN 插件的全部适配流程")
    parser.add_argument("repo_url", help="Git 仓库 URL，例如 https://github.com/dev-family/react-native-device-country")
    parser.add_argument(
        "stages",
        nargs="*",
        metavar="N",
        help="阶段编号 1-5（1=analysis … 5=summary），可多个，如: 1  或  3 4 ；默认 1 2 3 4 5",
    )
    parser.add_argument(
        "--skip-clone",
        action="store_true",
        help="跳过 Clone API（仓库必须已存在且 status=cloned）",
    )
    parser.add_argument(
        "--clone-timeout",
        type=int,
        default=600,
        help="等待 Clone API 完成的超时秒数（默认 600）",
    )
    parser.add_argument("--skip-clear", action="store_true", help="跳过清空 ohos 目录步骤")
    parser.add_argument("--poll-interval", type=int, default=30, help="轮询执行状态的间隔秒数")
    parser.add_argument(
        "--log-tail-interval",
        type=float,
        default=2.0,
        help="阶段日志 tail 间隔秒数（默认 2）",
    )
    parser.add_argument(
        "--no-stage-logs",
        action="store_true",
        help="不实时打印各阶段 logs/*.log",
    )
    parser.add_argument(
        "--runner-log",
        action="store_true",
        help="将脚本终端输出保存到 logs/runner_*.log（默认不保存）",
    )
    parser.add_argument(
        "--clean-full",
        action="store_true",
        help="rn.py clean 加 --full（删除 ohos 下除 .git 外全部内容；默认仅 non-build）",
    )
    parser.add_argument(
        "--tail-history",
        action="store_true",
        help="tail 阶段日志时从文件头回放历史（默认仅从本次运行末尾开始）",
    )
    parser.add_argument(
        "--profile-id",
        default=PROFILE_ID,
        help=f"adapt-workflow Profile ID（默认 {PROFILE_ID}）",
    )
    args = parser.parse_args()

    try:
        stage_nums = parse_stage_numbers(args.stages)
    except ValueError as e:
        print(f"[ERROR] {e}")
        sys.exit(1)

    try:
        repo_name, plugin_name = parse_repo_url(args.repo_url)
    except ValueError as e:
        print(f"[ERROR] {e}")
        sys.exit(1)

    plugin_dir = REPOS_DIR / plugin_name
    global _active_profile_id
    _active_profile_id = args.profile_id

    session_ctx = (
        runner_session_log(
            plugin_dir,
            repo_url=args.repo_url,
            stage_nums=stage_nums,
        )
        if args.runner_log
        else contextlib.nullcontext()
    )

    with session_ctx as runner_log_path:
        if runner_log_path is not None:
            print(f"[INFO] 脚本输出将同时写入: {runner_log_path}")

        # 1. 解析 URL
        print(f"\n{'='*60}")
        print(f"[START] RN Plugin Runner")
        print(f"{'='*60}\n")

        print(f"[INFO] 仓库名: {repo_name}")
        print(f"[INFO] 插件名: {plugin_name}")
        print(f"[INFO] 目标目录: {plugin_dir}")
        print(f"[INFO] 计划阶段: {format_stage_plan(stage_nums)}")
        print(f"[INFO] Profile: {_active_profile_id}")

        # 2. 检查服务状态
        if not check_workflow_server():
            print(f"[WARN] adapt-workflow 服务未运行")
            if not start_workflow_server():
                sys.exit(1)

        # 3. 注册插件 + Clone 源码（与面板「Clone 源码」同款 API）
        plugin = ensure_plugin_via_api(args.repo_url, plugin_name)
        plugin_id = plugin["id"]

        if args.skip_clone:
            if not plugin_dir.exists():
                print("[ERROR] 仓库目录不存在且使用了 --skip-clone，无法继续")
                sys.exit(1)
            if plugin.get("status") != "cloned":
                print(
                    f"[WARN] 插件状态为 {plugin.get('status')}，未执行 Clone，"
                    "可能缺少 workspace 符号链接"
                )
            else:
                print(f"[INFO] 跳过 Clone，仓库已存在: {plugin_dir}")
        else:
            need_clone = plugin.get("status") != "cloned" or not plugin_dir.exists()
            if need_clone:
                try:
                    plugin = clone_plugin_via_api(
                        plugin_id,
                        clone_timeout=float(args.clone_timeout),
                    )
                except Exception as e:
                    print(f"[ERROR] Clone 失败: {e}")
                    sys.exit(1)
            else:
                print(f"[INFO] 插件已 cloned，仓库目录: {plugin_dir}")

        if plugin_dir.exists():
            print(f"[INFO] 仓库目录: {plugin_dir}")
            if not args.skip_clear:
                if not clear_ohos_content(plugin_dir, full=args.clean_full):
                    sys.exit(1)
        else:
            print(f"[ERROR] Clone 后仓库目录仍不存在: {plugin_dir}")
            sys.exit(1)

        adaptation_dir = plugin_dir / ADAPTATION_DIR
        if is_full_pipeline(stage_nums) and adaptation_dir.exists():
            timestamp = time.strftime("%Y%m%d_%H%M%S")
            backup_name = f"{ADAPTATION_DIR}_backup_{timestamp}"
            backup_dir = plugin_dir / backup_name
            print(f"[INFO] 全流水线：备份产物目录 {adaptation_dir.name} -> {backup_name}")
            adaptation_dir.rename(backup_dir)
            print(f"[OK] 产物目录已备份")
        elif not is_full_pipeline(stage_nums) and adaptation_dir.exists():
            print(f"[INFO] 子集执行：保留现有 {adaptation_dir.name}（不备份）")

        print(f"\n[INFO] 插件 ID: {plugin_id}")
        stage_ids = stage_numbers_to_ids(stage_nums)

        if is_full_pipeline(stage_nums):
            print("[INFO] 执行模式: 全部执行（run-all）")
            try:
                result = start_run_all(plugin_id)
                print(f"[INFO] 全部执行已入队: {result}")
            except Exception as e:
                print(f"[ERROR] 启动全部执行失败: {e}")
                sys.exit(1)
            success = wait_for_run_all_completion(
                plugin_id,
                args.poll_interval,
                plugin_dir=plugin_dir,
                tail_logs=not args.no_stage_logs,
                log_tail_interval=args.log_tail_interval,
                stage_ids=stage_ids,
                tail_history=args.tail_history,
            )
        else:
            print("[INFO] 执行模式: 按编号执行所选阶段")
            success = run_selected_stages(
                plugin_id,
                stage_nums,
                plugin_dir=plugin_dir,
                tail_logs=not args.no_stage_logs,
                log_tail_interval=args.log_tail_interval,
                tail_history=args.tail_history,
            )

        print(f"\n{'='*60}")
        if success:
            print(f"[SUCCESS] 适配流程执行成功")
        else:
            print(f"[FAILED] 适配流程执行失败")
        print(f"{'='*60}\n")

        if runner_log_path is not None:
            latest = plugin_dir / ADAPTATION_DIR / "logs" / "runner-latest.log"
            print(f"[INFO] 脚本会话日志: {runner_log_path}")
            print(f"[INFO] 最新副本: {latest}")

        sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()