#!/usr/bin/env python3
"""rnohos.py — RN→HarmonyOS 确定性脚手架/构建 CLI（agent-rn-fast）。

只做**确定性机械动作**，零代码生成：

  scaffold  派生名字(short/camel/ohos) + 拷静态模板 + 替占位符 + 注 autolinking + 根 .gitignore 忽略缓存
  codegen   官方 react-native codegen-harmony（生成 generated/ 类型胶水）
  build     har | hap（固定构建序列；hap 前自动 check）
  check     构建前只读自检（file: 依赖 / RNPackage 注册 / autolinking，防白屏）

ETS/C++/App.tsx 等**实现代码全部由 agent 编写**，本脚本不碰。名字派生与构建
序列是给定(包名+类型)只有唯一答案的纯机械动作，交脚本保证一致性与可复现。
"""

from __future__ import annotations

import argparse
import ctypes
import glob
import json
import os
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile
import time

# Windows 控制台默认 GBK，print 含 UTF-8 日志（metro 方块字符/中文/替换符 \ufffd）会 UnicodeEncodeError
# 直接崩（尤其在 _echo_log_tail 回显日志尾、超时分支里）。统一把 stdio 切 UTF-8，与 agent-rn 对齐。
if sys.platform == "win32":
    for _s in ("stdout", "stderr"):
        _stream = getattr(sys, _s, None)
        if _stream is not None and hasattr(_stream, "reconfigure"):
            try:
                _stream.reconfigure(encoding="utf-8", errors="replace")
            except (AttributeError, OSError, ValueError):
                pass

SKILL_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATES = os.path.join(SKILL_DIR, "templates")
NPM_REGISTRY = "https://registry.npmmirror.com"
OHPM_REGISTRY = "https://ohpm.openharmony.cn/ohpm/"
DEFAULT_SCOPE = "@oh-rn"
_KNOWN_PREFIXES = ("react-native-", "react_native_", "rn-", "rtn-")
_TEXT_EXT = {".json", ".json5", ".ets", ".ts", ".tsx", ".js", ".cpp", ".h",
             ".txt", ".cmake", ".md", ".json5", ".cfg"}

# ───────────────────────── 名字派生（纯函数） ─────────────────────────

# ───────────── Windows 短路径自治（避免 RN 构建路径超长 MAX_PATH=260；非 Windows no-op） ─────────────
# Windows 上 RN→鸿蒙构建有两类路径超长，rnohos.py 自动处理、无需外部注入环境变量或手动建链：
#   ① har_wrapper 里 RNOH C++ 头文件深嵌套 + ohpm ~90 字符哈希目录（lessons: win-path-259）
#      → har_wrapper 物理放浅目录 <drive>:\rnb\<short>\har_wrapper（见 _resolve_har_wrapper_path）。
#   ② hvigor 内部 pnpm 用 rnoh-hvigor-plugin tgz 全路径拼 cache key 文件名（lessons: pnpm-cache-path-259）
#      + hvigor exitIfNotExists 强制 realpath(p)===p，拒绝任何穿过 reparse point 的路径
#        （lessons: hvigor-path-not-found / 00303149）。
#      → ohos 真实内容物理放短目录 <drive>:\rn\<N>，项目 ohos 作 junction 指过去；
#        构建 cwd 用 realpath(ohos)（已解析过 junction），既短又无 reparse point → 同时解 ninja 260 与 hvigor PATH_NOT_FOUND。
# 关键反例（旧方案已废弃）：「短别名 → 长真实、在别名上构建」会让 hvigor realpath≠self → 必报 PATH_NOT_FOUND。
# junction 用 mklink /J（不需管理员权限）；HAR/HAP 产物仍回写真实 ohos/。

_JUNCTION_RECORD = ".rnohos-junction.json"


def _win_drive(p: str) -> str:
    d = os.path.splitdrive(os.path.abspath(p))[0]
    return d if len(d) == 2 and d[1] == ":" else "C:"


def _short_token(root: str) -> str:
    raw = re.sub(r"[^a-zA-Z0-9]", "", os.path.basename(os.path.normpath(root))).lower()[:8]
    return raw or "rnplugin"


def _is_junction(p: str) -> bool:
    """路径是否为 reparse point（junction/symlink），含目标已删的损坏链接。"""
    if not os.path.lexists(p):
        return False
    if sys.platform != "win32":
        return os.path.islink(p)
    try:
        attr = ctypes.windll.kernel32.GetFileAttributesW(os.path.abspath(p))
        return attr != -1 and bool(attr & 0x400)  # FILE_ATTRIBUTE_REPARSE_POINT
    except Exception:
        return False


def _rmtree_junction_aware(path: str) -> None:
    """删除目录树；遇到 reparse point(junction/软链接) 只删链接本身、不穿透删目标。

    shutil.rmtree 默认穿透 junction 删其目标内容，在 ohpm 建的 oh_modules 链接上
    要么报"目录不是空的"、要么误删 ohpm 共享缓存导致后续 install 异常。自上而下
    递归：命中 reparse point 就 os.rmdir/os.remove 删链接本身，绝不进入其目标。"""
    if not os.path.lexists(path):
        return
    if _is_junction(path) or os.path.islink(path):
        try:
            os.rmdir(path)  # junction/目录软链接：删链接本身
            return
        except OSError:
            try:
                os.remove(path)  # 文件软链接
                return
            except OSError:
                pass
    if os.path.isdir(path):
        for name in os.listdir(path):
            _rmtree_junction_aware(os.path.join(path, name))
        try:
            os.rmdir(path)
        except OSError:
            shutil.rmtree(path, ignore_errors=True)
    else:
        try:
            os.remove(path)
        except OSError:
            pass


def _next_rn_sequence_dir(drive: str) -> str:
    """在 <drive>:\\rn\\ 下找下一个未占用的序号目录（如 D:\\rn\\1, D:\\rn\\2）。不复用、不删别人的。"""
    rn_root = os.path.join(drive + os.sep, "rn")
    os.makedirs(rn_root, exist_ok=True)
    max_n = 0
    for name in os.listdir(rn_root):
        p = os.path.join(rn_root, name)
        if os.path.isdir(p) and name.isdigit():
            max_n = max(max_n, int(name))
    seq = max_n + 1
    while True:
        real_dir = os.path.join(rn_root, str(seq))
        if not os.path.exists(real_dir):
            return real_dir
        seq += 1


def _write_junction_record(plugin_root: str, real_path: str, link_path: str) -> None:
    """记录 ohos junction 的真实（短）目录，便于排查与清理（remove_ohos_completely 用）。"""
    try:
        with open(os.path.join(plugin_root, _JUNCTION_RECORD), "w", encoding="utf-8", newline="\n") as f:
            json.dump({"real_path": real_path, "link_path": link_path,
                       "note": f"项目 ohos 是 junction，真实(短)内容在 {real_path}；构建在 realpath 上跑。"},
                      f, indent=2, ensure_ascii=False)
            f.write("\n")
    except OSError:
        pass


def _read_junction_record(plugin_root: str) -> dict | None:
    """读取 ohos junction 记录；无/损坏返回 None。"""
    p = os.path.join(plugin_root, _JUNCTION_RECORD)
    if not os.path.isfile(p):
        return None
    try:
        return read_json(p)
    except Exception:
        return None


def should_use_ohos_junction(plugin_root: str) -> bool:
    """仅 Windows + 盘符路径用 ohos junction；非 Windows 用普通目录。"""
    if sys.platform != "win32":
        return False
    drive = os.path.splitdrive(os.path.abspath(plugin_root))[0]
    return len(drive) == 2 and drive[1] == ":"


def _create_junction(link_path: str, target_dir: str) -> None:
    """创建 junction（Windows）/ symlink（非 Windows）。失败抛 OSError。"""
    link_path = os.path.normpath(os.path.abspath(link_path))
    target_dir = os.path.normpath(os.path.abspath(target_dir))
    if sys.platform != "win32":
        os.symlink(target_dir, link_path, target_is_directory=True)
        print(f"  已创建 symlink: {link_path} -> {target_dir}")
        return
    r = subprocess.run(["cmd", "/c", "mklink", "/J", link_path, target_dir],
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    if r.returncode != 0:
        raise OSError(f"创建 junction 失败: {r.stdout or r.stderr or r.returncode}")
    print(f"  已创建 junction: {link_path} -> {target_dir}")


def create_ohos_junction(plugin_root: str, force: bool = False) -> str:
    """准备 ohos 目录并返回其路径（scaffold 往里 copytree）。

    Windows：ohos 真实内容物理放短目录 ``<drive>:\\rn\\<N>``，项目 ``ohos`` 作 junction 指过去——
    这样构建在 realpath(ohos) 上跑时既短（解 ninja 260）又无 reparse point（解 hvigor PATH_NOT_FOUND）。
    非 Windows：直接用 ``plugin_root/ohos`` 普通目录。幂等：有效 junction 复用；损坏自愈；--force 覆盖。"""
    link_path = os.path.join(plugin_root, "ohos")

    if os.path.lexists(link_path):
        is_link = _is_junction(link_path) or os.path.islink(link_path)
        if is_link:
            real = os.path.realpath(link_path)
            if os.path.isdir(real) and not force:
                print(f"  [Windows 短路径] ohos junction 已存在: {link_path} -> {real}")
                if should_use_ohos_junction(plugin_root):
                    _write_junction_record(plugin_root, real, link_path)
                return link_path
            _rmtree_junction_aware(link_path)  # 损坏 或 force → 删链接（不穿透真实目录）
        elif os.path.isdir(link_path):
            if not force:
                raise SystemExit("ohos/ 已存在。重新生成请加 --force（会覆盖脚手架，注意已写的实现）。")
            _rmtree_junction_aware(link_path)
        else:
            if not force:
                raise SystemExit(f"ohos/ 已存在（非目录）。重新生成请加 --force。")
            os.remove(link_path)

    if not should_use_ohos_junction(plugin_root):
        return link_path  # 非 Windows：普通目录，copytree 自动创建

    real_ohos = _next_rn_sequence_dir(_win_drive(plugin_root))
    os.makedirs(real_ohos, exist_ok=True)
    print(f"  [Windows 短路径] 真实(短)目录: {real_ohos}")
    print(f"  [Windows 短路径] 项目 junction: {link_path}")
    try:
        _create_junction(link_path, real_ohos)
        _write_junction_record(plugin_root, real_ohos, link_path)
    except OSError:
        try:  # 回滚刚分配的空真实目录，退化为普通目录（长路径但仍可用）
            if os.path.isdir(real_ohos) and not os.listdir(real_ohos):
                os.rmdir(real_ohos)
        except OSError:
            pass
        print(f"  [Windows 短路径] junction 建立失败，退化为普通目录: {link_path}")
    return link_path


def get_ohos_real_path(plugin_root: str) -> str:
    """ohos 真实物理路径（解析 junction）。**构建 cwd 必须用这个**：确保 hvigor ``realpath(p)===p``
    通过（链路无 reparse point），否则报 PATH_NOT_FOUND(00303149)。非 junction 时返回自身。"""
    link_path = os.path.join(plugin_root, "ohos")
    if os.path.lexists(link_path) and (_is_junction(link_path) or os.path.islink(link_path)):
        return os.path.realpath(link_path)
    return link_path


def remove_ohos_completely(plugin_root: str) -> list:
    """删 ohos 及全部内容（含 junction 指向的真实短目录 + 记录文件）。项目迁移/重置时清理，
    避免 ``<drive>:\\rn\\`` 堆积垃圾真实目录。"""
    removed = []
    link_path = os.path.join(plugin_root, "ohos")
    rec_path = os.path.join(plugin_root, _JUNCTION_RECORD)
    rec = _read_junction_record(plugin_root)
    real_path = rec.get("real_path") if rec else None

    if os.path.lexists(link_path):
        if _is_junction(link_path) or os.path.islink(link_path):
            try:
                os.rmdir(link_path)
            except OSError:
                os.unlink(link_path)
        elif os.path.isdir(link_path):
            _rmtree_junction_aware(link_path)
        else:
            os.remove(link_path)
        removed.append(link_path)

    if real_path:
        real_abs = os.path.normpath(os.path.abspath(real_path))
        link_abs = os.path.normpath(os.path.abspath(link_path))
        if real_abs != link_abs and os.path.isdir(real_abs):
            _rmtree_junction_aware(real_abs)
            removed.append(real_abs)
    if os.path.isfile(rec_path):
        os.remove(rec_path)
        removed.append(rec_path)
    return removed


def ohos_link_is_usable(plugin_root: str) -> bool:
    """ohos 链接存在且目标可访问（非损坏 junction）。供 check/自检用。"""
    link_path = os.path.join(plugin_root, "ohos")
    if not os.path.lexists(link_path):
        return False
    if _is_junction(link_path) or os.path.islink(link_path):
        try:
            os.listdir(link_path)
            return True
        except OSError:
            return False
    return os.path.isdir(link_path)


def _resolve_har_wrapper_path(ohos_dir: str, short: str | None = None) -> str:
    """har_wrapper 路径，三级优先：
      1) 显式环境变量 RNOH_HAR_WRAPPER_DIR（短路径）最优先；
      2) 否则 Windows 上自动放浅物理目录 <drive>:\\rnb\\<short>\\har_wrapper（避免 259 超长，无需手动设置）；
      3) 非 Windows 用默认 ohos/.rn-build/har_wrapper。
    构建产物 HAR 仍回写到 ohos/harmony/<short>.har，源码与产物路径不变。
    """
    custom = os.environ.get("RNOH_HAR_WRAPPER_DIR")
    if custom:
        hw = os.path.join(custom, "har_wrapper")
        os.makedirs(os.path.dirname(hw), exist_ok=True)
        return hw
    if sys.platform == "win32":
        tok = short or _short_token(os.path.dirname(os.path.normpath(ohos_dir)))
        hw = os.path.join(f"{_win_drive(ohos_dir)}\\rnb", tok, "har_wrapper")
        os.makedirs(os.path.dirname(hw), exist_ok=True)
        return hw
    return os.path.join(ohos_dir, ".rn-build", "har_wrapper")


def derive_short_name(npm_name: str) -> str:
    """react-native-get-device-locale → get_device_locale。去 scope、去一个前缀、- 转 _、小写。"""
    if not npm_name:
        return "library"
    name = npm_name.strip()
    if name.startswith("@") and "/" in name:
        name = name.split("/", 1)[1]
    for pre in _KNOWN_PREFIXES:
        if name.startswith(pre):
            name = name[len(pre):]
            break
    short = name.replace("-", "_")
    if not re.match(r"^[a-zA-Z_][a-zA-Z0-9_]*$", short):
        short = re.sub(r"^[^a-zA-Z_]+", "", short)
        short = re.sub(r"[^a-zA-Z0-9_]", "_", short)
    return (short or "library").lower()


def derive_camel_name(short_name: str) -> str:
    """get_device_locale → GetDeviceLocale。"""
    return "".join(p.capitalize() for p in short_name.split("_") if p) or "Library"


def derive_ohos_name(npm_name: str, scope: str = DEFAULT_SCOPE) -> str:
    """react-native-x → @oh-rn/react-native-x；@scope/x → @oh-rn/x。"""
    n = (npm_name or "").strip()
    if not n:
        return f"{scope}/package"
    if n.startswith("@") and "/" in n:
        return f"{scope}/{n.split('/', 1)[1].strip() or 'package'}"
    return f"{scope}/{n}"


# ───────────────────────── 子进程 / 环境 ─────────────────────────

def _deveco_studio_roots() -> list:
    """DevEco Studio 候选安装根（DEVECO_HOME 最优先，再兜底标准路径）。"""
    if sys.platform == "darwin":
        return ["/Applications/DevEco-Studio.app"]
    home = os.path.expanduser("~")
    if sys.platform == "win32":
        roots = [r"C:\Program Files\Huawei\DevEco Studio",
                 r"D:\Program Files\Huawei\DevEco Studio",
                 os.path.join(home, "DevEco Studio")]
    else:
        roots = ["/opt/DevEco Studio", os.path.join(home, "DevEco Studio")]
    deveco = os.environ.get("DEVECO_HOME")
    if deveco:
        roots.insert(0, deveco)
    return roots


def find_deveco_studio_root() -> str | None:
    """定位 DevEco Studio 安装根。DEVECO_HOME 优先，其次扫描标准路径。
    解决「只装了 DevEco 但没设 DEVECO_HOME」的环境识别失败（本机即此情况）。"""
    deveco = os.environ.get("DEVECO_HOME")
    if deveco and os.path.isdir(deveco):
        return os.path.abspath(deveco)
    for root in _deveco_studio_roots():
        if os.path.isdir(root):
            return os.path.abspath(root)
    return None


# 已解析的工具链（避免每次 run 都重新探测）。None=未探测；False=探测过但缺失。
_DEVECO_TC: dict | None | bool = None


def resolve_deveco_toolchain() -> dict | None:
    """在 DevEco Studio 内定位 node/java/hvigorw/ohpm，返回 {studio,node,java,hvigorw,ohpm_bin,path_dirs,missing}。
    缺失关键工具时返回 None（并打印缺失项，便于诊断「环境没识别」）。结果缓存。"""
    global _DEVECO_TC
    if _DEVECO_TC is not None:
        return _DEVECO_TC if _DEVECO_TC else None
    studio = find_deveco_studio_root()
    if not studio:
        _DEVECO_TC = False
        return None
    base = studio
    if sys.platform == "darwin":
        node = os.path.join(base, "Contents/tools/node/bin/node")
        java = os.path.join(base, "Contents/jbr/Contents/Home/bin/java")
        hvigorw = os.path.join(base, "Contents/tools/hvigor/bin/hvigorw")
        ohpm_bin = os.path.join(base, "Contents/tools/ohpm/bin")
    else:
        node = os.path.join(base, "tools/node/node.exe")
        java = os.path.join(base, "jbr/bin/java.exe")
        hvigorw = os.path.join(base, "tools/hvigor/bin/hvigorw.bat")
        ohpm_bin = os.path.join(base, "tools/ohpm/bin")
        if sys.platform == "win32":
            if not os.path.isfile(node):
                node = os.path.join(base, "tools/node/bin/node.exe")  # 部分版本在 bin/
            if not os.path.isfile(hvigorw):
                alt = os.path.join(base, "tools/hvigor/bin/hvigorw.BAT")
                if os.path.isfile(alt):
                    hvigorw = alt
    path_dirs = []
    for t in (node, java, hvigorw):
        if os.path.isfile(t):
            path_dirs.append(os.path.dirname(t))
    if os.path.isdir(ohpm_bin):
        path_dirs.append(ohpm_bin)
    missing = [n for n, p in (("node", node), ("java", java), ("hvigorw", hvigorw)) if not os.path.isfile(p)]
    tc = {"studio": studio, "node": node, "java": java, "hvigorw": hvigorw,
          "ohpm_bin": ohpm_bin, "path_dirs": list(dict.fromkeys(path_dirs)), "missing": missing}
    _DEVECO_TC = tc
    return tc


def resolve_subprocess_executable(cmd: str, env: dict | None = None) -> str:
    """把 CLI 名解析成 subprocess 能直接执行的路径（Windows 关键）。

    DevEco 自带 node 目录里的 npm/npx 常是无扩展名 shim，CreateProcess 会 WinError 193；
    这里优先用 DevEco 工具链里的 .cmd/.bat，再退回 PATH 查找并补扩展名。"""
    if sys.platform != "win32":
        return cmd
    base = os.path.basename(cmd).lower()
    for ext in (".exe", ".cmd", ".bat", ".com"):
        base = base.removesuffix(ext)
    env_map = dict(env if env is not None else os.environ)

    tc = resolve_deveco_toolchain()
    if tc:
        tc_bins = {"node": tc["node"], "java": tc["java"], "hvigorw": tc["hvigorw"],
                   "ohpm": os.path.join(tc["ohpm_bin"], "ohpm.cmd")}
        hit = tc_bins.get(base)
        if hit and os.path.isfile(hit):
            return hit
        if base in ("npm", "npx"):  # DevEco node 目录里找 npm.cmd/npx.cmd
            node_dir = os.path.dirname(tc["node"])
            for ext in (".cmd", ".CMD", ".exe", ".bat"):
                shim = os.path.join(node_dir, base + ext)
                if os.path.isfile(shim):
                    return shim
    if os.path.splitext(cmd)[1]:
        return cmd
    resolved = shutil.which(cmd, path=env_map.get("PATH", "")) or shutil.which(cmd)
    if not resolved:
        return cmd
    if os.path.splitext(resolved)[1].lower() in (".exe", ".cmd", ".bat", ".com"):
        return resolved
    for suf in (".cmd", ".CMD", ".exe", ".bat"):
        cand = resolved + suf
        if os.path.isfile(cand):
            return cand
    return resolved


def _resolve_deveco_sdk_home(studio: str) -> str | None:
    """解析 hvigor 期望的 ``DEVECO_SDK_HOME``——**含版本化 SDK 包目录的那一层**（如 ``...\\sdk``，里面是 ``default\\``）。

    常见误配：``DEVECO_SDK_HOME`` 指到了 ``...\\sdk\\default``（深一层，``default`` 本身是 SDK 包目录、
    内含 ``sdk-pkg.json``）。hvigor 的 ``getLocalSdks`` 在该层找不到版本子目录 → ``SDK_COMPONENT_MISSING``(00303168)，
    即使 SDK 与组件齐全、API 版本匹配。本函数：取 env 的 ``DEVECO_SDK_HOME``（无则用 ``<studio>/sdk`` 兜底），
    若它直接含 ``sdk-pkg.json``（即指在了包目录层）则上移到父目录。两种约定都安全。"""
    cand = os.environ.get("DEVECO_SDK_HOME")
    if not cand and os.path.isdir(os.path.join(studio, "sdk")):
        cand = os.path.join(studio, "sdk")
    if not cand or not os.path.isdir(cand):
        return None
    if os.path.isfile(os.path.join(cand, "sdk-pkg.json")):
        parent = os.path.dirname(cand)
        if parent and os.path.isdir(parent):
            return parent
    return cand


def enriched_env() -> dict:
    """返回注入了 DevEco 工具链的子进程环境（PATH 前置 + JAVA_HOME + DEVECO_HOME + 纠偏后的 DEVECO_SDK_HOME）。

    主动探测 DevEco 安装位置（不只认 DEVECO_HOME），解决「只装 DevEco 未设环境变量」的识别失败。
    找不到 DevEco 时原样返回 env（依赖系统 PATH 上已有 node/ohpm/hvigorw）。"""
    env = os.environ.copy()
    tc = resolve_deveco_toolchain()
    if not tc:
        return env
    sep = os.pathsep
    env["PATH"] = sep.join([*tc["path_dirs"], env.get("PATH", "")]).strip(sep)
    java_home = os.path.join(tc["studio"], "Contents/jbr/Contents/Home") if sys.platform == "darwin" \
        else os.path.join(tc["studio"], "jbr")
    if os.path.isdir(java_home):
        env["JAVA_HOME"] = java_home
    env["DEVECO_HOME"] = tc["studio"]
    sdk_home = _resolve_deveco_sdk_home(tc["studio"])
    if sdk_home:
        env["DEVECO_SDK_HOME"] = sdk_home  # 纠偏：确保指在含 default\ 的父级，避免 00303168
    env.setdefault("PYTHONIOENCODING", "utf-8")
    return env


# 安静模式构建日志目录（cmd_build / cmd_codegen 设为 <root>/.ohos-adaptation/logs）。
# 构建命令（npm install / metro bundle / ohpm / hvigorw / codegen）把全量输出落到文件，
# 终端只回显末尾若干行。
_LOG_DIR = None


def _set_log_dir(root: str) -> None:
    global _LOG_DIR
    _LOG_DIR = os.path.join(root, ".ohos-adaptation", "logs")


def _run_log_path(name: str) -> str:
    d = _LOG_DIR or os.path.join(os.getcwd(), ".ohos-adaptation", "logs")
    os.makedirs(d, exist_ok=True)
    return os.path.join(d, name)


def _echo_log_tail(logp: str, rc: int, tail: int = 20) -> None:
    try:
        with open(logp, "r", encoding="utf-8", errors="replace") as f:
            lines = f.read().splitlines()
    except OSError:
        lines = []
    n = tail if rc == 0 else max(tail, 80)  # 失败时多回显，便于按日志定位真实问题
    shown = lines[-n:]
    omitted = len(lines) - len(shown)
    note = f"，省略前 {omitted} 行，需全量请读该文件" if omitted > 0 else ""
    print(f"  [log] {logp}（{len(lines)} 行，退出码 {rc}{note}）")
    for ln in shown:
        print(ln)


# 单命令超时上限（秒）。单步超过即判挂死并清晰报错（而非被外层 bash 工具静默 kill 后误判成环境/SDK 问题）。
# 取宽裕值：正常构建单步 <5min，20min 上限只拦真·挂死（网络卡死/进程死锁）。
# 注意：这只防"单步挂死"；build hap 整体 3-5 分钟，**外层调用（bash 工具）仍须给 ≥600s 超时**，否则默认 120s 会把整条 python 进程砍掉。
_DEFAULT_CMD_TIMEOUT = 1200


def run(cmd: list, cwd: str, check: bool = True, quiet: bool = False, log_name=None,
        timeout=_DEFAULT_CMD_TIMEOUT) -> int:
    env = enriched_env()
    exe = resolve_subprocess_executable(cmd[0], env)
    resolved = [exe] + cmd[1:]
    print(f"$ (cwd={cwd}) {' '.join(resolved)}")
    t0 = time.time()
    logp = None
    try:
        if not quiet:
            rc = subprocess.run(resolved, cwd=cwd, env=env, encoding="utf-8",
                                errors="replace", timeout=timeout).returncode
        else:
            # 全量输出落日志文件（二进制直写 fd，避免编码歧义），终端只回显末尾。
            # stdin=DEVNULL：捕获输出时给命令一个 EOF，杜绝个别命令读 stdin 时挂起（这些构建命令本不读 stdin）。
            logp = _run_log_path(log_name or (os.path.basename(str(exe)) + ".log"))
            with open(logp, "wb") as f:
                rc = subprocess.run(resolved, cwd=cwd, env=env,
                                    stdin=subprocess.DEVNULL, stdout=f, stderr=subprocess.STDOUT,
                                    timeout=timeout).returncode
            _echo_log_tail(logp, rc)
    except subprocess.TimeoutExpired:
        elapsed = int(time.time() - t0)
        if logp:
            _echo_log_tail(logp, -1)
        msg = (f"命令超时（已运行 {elapsed}s，达 {int(timeout)}s 上限）：{' '.join(resolved)}\n"
               f"这通常是构建/依赖拉取本身慢或网络卡，**不是环境/SDK 问题**——别据此判环境不可用或跳过 build。\n"
               f"  · 外层 bash 工具调用须给 ≥600000ms 超时（build hap 整体约 3-5 分钟，默认 120s 会中途杀进程）；\n"
               f"  · 若反复卡在同一步：查网络/ohpm 源/磁盘 IO，确认非死锁后重试。")
        if check:
            raise SystemExit(msg)
        rc = -1
    if check and rc != 0:
        raise SystemExit(f"命令失败(exit {rc})：{' '.join(resolved)}")
    return rc


def find_hvigorw(d: str) -> str:
    for name in ("hvigorw", "hvigorw.bat"):
        if os.path.isfile(os.path.join(d, name)):
            return os.path.join(d, name)
    return "hvigorw"


def read_json(p: str) -> dict:
    with open(p, "r", encoding="utf-8") as f:
        return json.load(f)


def write_json(p: str, data: dict) -> None:
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def _ensure_root_gitignore(root: str) -> None:
    """幂等地把鸿蒙依赖/缓存与适配日志目录追加进插件仓库根 .gitignore，保持顶层 git status 干净。

    `oh_modules/` `.ohpm/` `.hvigor/` 由 build（ohpm install + hvigorw）生成在
    ohos/example/harmony 下，`node_modules/` 由 build hap 的 npm install 生成；这些
    不带前导 / 的 pattern 匹配任意层级，根 .gitignore 一处即覆盖深层缓存。
    `.ohos-adaptation/logs/` 是构建/会话日志（同目录下的 JSON+Markdown 报告保留，只忽略日志）。
    原仓常已用别的写法忽略 node_modules（node_modules、/node_modules、**/node_modules、
    node_modules/* …），规范化后任一形态命中即不重复追加。整体可重复调用。"""
    def _canon(pat: str) -> str:
        # 归一忽略项到可比较形态：去前导 / 与 **/、去尾部 / 与 /*
        s = pat.strip().lstrip("/")
        if s.startswith("**/"):
            s = s[3:]
        s = s.rstrip("/")
        if s.endswith("/*"):
            s = s[:-2]
        return s

    gi = os.path.join(root, ".gitignore")
    header = "# HarmonyOS dependencies and cache"
    entries = ["node_modules/", "oh_modules/", ".ohpm/", ".hvigor/", ".ohos-adaptation/logs/"]
    existing = ""
    if os.path.isfile(gi):
        with open(gi, "r", encoding="utf-8") as f:
            existing = f.read()
    raw = {ln.strip() for ln in existing.splitlines()}
    # 已有的正向忽略项（跳过注释/空行/取消忽略 ! 行），规范化后比对，各种写法都算已覆盖
    present = {_canon(ln) for ln in raw if ln and not ln.startswith(("#", "!"))}
    missing = [e for e in entries if _canon(e) not in present]
    if not missing:
        return
    block = ([header] if header not in raw else []) + missing
    sep = ("" if existing.endswith("\n") else "\n") + "\n" if existing else ""
    with open(gi, "a", encoding="utf-8", newline="\n") as f:
        f.write(sep + "\n".join(block) + "\n")
    print(f"  已更新根 .gitignore（+{' +'.join(missing)}）")


def substitute_tree(root: str, mapping: dict) -> None:
    """对目录下文本文件做占位符替换。"""
    for dirpath, _dirs, files in os.walk(root):
        if "node_modules" in dirpath or "oh_modules" in dirpath:
            continue
        for fn in files:
            if os.path.splitext(fn)[1] not in _TEXT_EXT and fn != "CMakeLists.txt":
                continue
            fp = os.path.join(dirpath, fn)
            try:
                with open(fp, "r", encoding="utf-8") as f:
                    text = f.read()
            except (OSError, UnicodeDecodeError):
                continue
            new = text
            for k, v in mapping.items():
                new = new.replace(k, v)
            if new != text:
                with open(fp, "w", encoding="utf-8", newline="\n") as f:
                    f.write(new)


# ───────────────────────── scaffold ─────────────────────────

def _codegen_script(short: str) -> str:
    return ("react-native codegen-harmony "
            f"--cpp-output-path ./harmony/{short}/src/main/cpp/generated "
            f"--ets-output-path ./harmony/{short}/src/main/ets/generated")


def _fill_ohos_package_json(path: str, npm_name: str, short: str, camel: str,
                            ohos_name: str, root_pkg: dict, is_js: bool) -> None:
    p = read_json(path)
    p["name"] = ohos_name
    p["version"] = root_pkg.get("version", "1.0.0")
    if root_pkg.get("description"):
        p["description"] = root_pkg["description"]
    for k in ("repository", "homepage", "license"):
        if root_pkg.get(k):
            p[k] = root_pkg[k]
    harmony = p.get("harmony") if isinstance(p.get("harmony"), dict) else {}
    harmony["alias"] = npm_name  # 原始 npm 包名：example 用原名 import，由 RNOH 映射
    if not is_js:
        harmony["autolinking"] = {
            "cmakeLibraryTargetName": short,
            "ohPackageName": ohos_name,
            "etsPackageClassName": f"{camel}Package",
            "cppPackageClassName": f"{camel}Package",
        }
        # react-native codegen-harmony 需要 harmony.codegenConfig 才能扫到 Spec；
        # 否则只产占位 ts.ts，不生成 <SpecName>.ts/.cpp（白屏根因之一）。
        # 已有 codegenConfig 时不覆盖（用户/模板可能自定义 spec 路径）。
        if not harmony.get("codegenConfig"):
            harmony["codegenConfig"] = [
                {"version": 1, "specPaths": ["./src/specs/v1"]}
            ]
    p["harmony"] = harmony
    scripts = p.get("scripts", {})
    if is_js:
        scripts.pop("codegen-lib", None)
    else:
        scripts["codegen-lib"] = _codegen_script(short)
    p["scripts"] = scripts
    write_json(path, p)


def _orig_repo_url(root_pkg: dict) -> str:
    """从源码 package.json 提取可浏览的原始仓库地址（清掉 git+ / .git / github: 前缀）。"""
    repo = root_pkg.get("repository")
    url = repo if isinstance(repo, str) else (repo.get("url", "") if isinstance(repo, dict) else "")
    url = url.replace("git+", "").replace("git://", "https://")
    if url.startswith("github:"):
        url = "https://github.com/" + url[len("github:"):]
    if url.endswith(".git"):
        url = url[:-4]
    return url or root_pkg.get("homepage", "")


def _fill_ohos_readme(path: str, ohos_name: str, short: str, camel: str,
                      npm_name: str, root_pkg: dict) -> None:
    """替换 README 里的【确定性】占位符（包名/原库名/链接/版本）。
    语义占位符 {{USAGE_EXAMPLE}}/{{USAGE_NOTES}}/{{API_ROWS}}/{{API_NOTES}} 留给 agent 在 validation 阶段填。"""
    if not os.path.isfile(path):
        return
    mapping = {
        "{{NPM_NAME}}": ohos_name,
        "{{CAMEL_NAME}}": camel,
        "{{SHORT_NAME}}": short,
        "{{ORIG_NAME}}": npm_name or ohos_name,
        "{{ORIG_REPO_URL}}": _orig_repo_url(root_pkg) or "原始库地址",
        "{{ORIG_VERSION}}": str(root_pkg.get("version", "见发布记录")),
    }
    try:
        with open(path, "r", encoding="utf-8") as f:
            text = f.read()
    except OSError:
        return
    new = text
    for k, v in mapping.items():
        new = new.replace(k, v)
    if new != text:
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(new)


def _write_package_h(lib_dst: str, camel: str) -> None:
    cpp_dir = os.path.join(lib_dst, "src", "main", "cpp")
    os.makedirs(cpp_dir, exist_ok=True)
    guard = f"{camel.upper()}PACKAGE_H"
    # codegen-harmony emits a single `generated/RNOHGeneratedPackage.h` (which
    # registers the ArkTSTurboModule via its TurboModuleFactoryDelegate); the
    # per-library package header simply re-exposes it under the class name that
    # autolinking expects (cppPackageClassName = "{Camel}Package").
    content = (f"#ifndef {guard}\n#define {guard}\n\n#pragma once\n\n"
               f'#include "generated/RNOHGeneratedPackage.h"\n\n'
               f"namespace rnoh {{\nclass {camel}Package : public RNOHGeneratedPackage {{\n"
               f"  public:\n    using Super = RNOHGeneratedPackage;\n"
               f"    using Super::Super;\n}};\n"
               f"}} // namespace rnoh\n#endif //{guard}\n")
    with open(os.path.join(cpp_dir, f"{camel}Package.h"), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)


def cmd_scaffold(args) -> int:
    root = os.path.abspath(args.plugin_root)
    root_pkg = read_json(os.path.join(root, "package.json"))
    npm_name = root_pkg.get("name", "")
    short = derive_short_name(npm_name)
    camel = derive_camel_name(short)
    ohos_name = derive_ohos_name(npm_name, args.ohos_scope)
    is_js = args.type == "js-only"

    print("=== rnohos scaffold ===")
    print(f"  npm_name : {npm_name}")
    print(f"  type     : {args.type}")
    print(f"  short    : {short}")
    print(f"  camel    : {camel}")
    print(f"  ohos_name: {ohos_name}")

    # Windows：ohos 作 junction → <drive>:\rn\<N>（短真实），内容物理落在短路径，从脚手架起即规避 MAX_PATH；
    # 非 Windows：普通 root/ohos。create_ohos_junction 已处理「已存在/--force/损坏 junction」语义。
    ohos_dir = create_ohos_junction(root, args.force)

    # 1) ohos/ JS 包装层（copytree 通过 junction 写入真实短目录；dirs_exist_ok 容纳 junction 已存在）
    shutil.copytree(os.path.join(TEMPLATES, "ohos"), ohos_dir, dirs_exist_ok=True)
    _fill_ohos_package_json(os.path.join(ohos_dir, "package.json"),
                            npm_name, short, camel, ohos_name, root_pkg, is_js)
    # README 基础信息（确定性）就地替好；语义占位符留给 validation 阶段的 agent。
    _fill_ohos_readme(os.path.join(ohos_dir, "README.md"),
                      ohos_name, short, camel, npm_name, root_pkg)
    src_dir = os.path.join(root, "src")
    if os.path.isdir(src_dir):
        shutil.copytree(src_dir, os.path.join(ohos_dir, "src"), dirs_exist_ok=True)
        print("  已拷贝 src/ → ohos/src/（导入改写由 agent 负责）")

    # 2) harmony/{short} 原生库（非 js-only）
    if not is_js:
        lib_dst = os.path.join(ohos_dir, "harmony", short)
        shutil.copytree(os.path.join(TEMPLATES, "harmony", "library"), lib_dst, dirs_exist_ok=True)
        substitute_tree(lib_dst, {
            "{{SHORT_NAME}}": short,
            "{{CAMEL_NAME}}": camel,
            "{{NPM_NAME}}": ohos_name,
            '"name": "library"': f'"name": "{short}"',
            '"name":"library"': f'"name":"{short}"',
        })
        _write_package_h(lib_dst, camel)
        print(f"  已生成 ohos/harmony/{short}/（占位符已替换）")

    # 3) example
    ex_dst = os.path.join(ohos_dir, "example")
    shutil.copytree(os.path.join(TEMPLATES, "example"), ex_dst, dirs_exist_ok=True)
    if is_js:
        ex_js = os.path.join(TEMPLATES, "example_js")
        if os.path.isdir(ex_js):
            shutil.copytree(ex_js, ex_dst, dirs_exist_ok=True)  # js-only harmony 配置覆盖
    print("  已生成 ohos/example/")

    # 4) har_wrapper（非 js-only）
    if not is_js:
        hw = _resolve_har_wrapper_path(ohos_dir, short)
        os.makedirs(os.path.dirname(hw), exist_ok=True)
        shutil.copytree(os.path.join(TEMPLATES, "har_wrapper"), hw)
        print(f"  已生成 har_wrapper: {hw}")

    # 5) 根 .gitignore 忽略鸿蒙依赖/缓存（赶在首次 build 生成 oh_modules/.ohpm/.hvigor 之前）
    _ensure_root_gitignore(root)

    print(f"\nDone。请在实现/报告里复用这组名字：short={short} camel={camel} ohos_name={ohos_name}")
    print("下一步：写 Spec（旧架构先转）→ rnohos.py codegen → 写 ETS/C++ 实现 → rnohos.py build。")
    return 0


# ───────────────────────── codegen ─────────────────────────

def cmd_codegen(args) -> int:
    root = os.path.abspath(args.plugin_root)
    _set_log_dir(root)
    ohos_dir = get_ohos_real_path(root)  # 在真实路径上跑（ohos 是 junction→短真实）
    if not os.path.isdir(ohos_dir):
        raise SystemExit("缺少 ohos/，先跑 rnohos.py scaffold。")
    short = derive_short_name(read_json(os.path.join(root, "package.json")).get("name", ""))
    lib_dir = os.path.join(ohos_dir, "harmony", short)
    if not os.path.isdir(lib_dir):
        print(f"  无 ohos/harmony/{short}（js-only?），跳过 codegen。")
        return 0
    print("=== rnohos codegen（官方 react-native codegen-harmony）===")
    run(["npm", "install", "--legacy-peer-deps", f"--registry={NPM_REGISTRY}"], cwd=ohos_dir,
        quiet=True, log_name="codegen-npm-install.log")
    run(["npx", "react-native", "codegen-harmony",
         "--cpp-output-path", f"./harmony/{short}/src/main/cpp/generated",
         "--ets-output-path", f"./harmony/{short}/src/main/ets/generated"], cwd=ohos_dir,
        quiet=True, log_name="codegen.log")
    print("Done：generated/ 类型胶水已生成（业务实现由你编写）。")
    return 0


# ───────────────────────── build ─────────────────────────

def _clean_hvigor_caches(harmony_dir: str) -> None:
    """清 hvigor pnpm 索引缓存，避免源 tarball 全路径过长导致索引文件名超 Windows MAX_PATH。

    pnpm 把源 tarball 的绝对路径用 '+' 拼接成 cache key 文件名（caches/v10/index/<sha>-file+<+拼接路径>）。
    源路径长时（如 RNOH hvigor plugin tarball 在 node_modules 深处），索引文件名超 260 字符，
    Node.js fs 默认不带 \\\\?\\ 前缀会 ENOENT（即使 OS LongPathsEnabled=1），导致 hvigorw assembleHap
    抛 ERR_PNPM_ENOENT。清掉 caches/v10/index/ 后 hvigor 会在下次 install 时从零重建索引。

    只清 caches/v10/index/（pnpm 索引）+ 项目本地 .hvigor/，**保留 wrapper/ 工具链与其他下载缓存**——
    清整个 .hvigor 会让 hvigorw 自身都跑不起来。
    """
    targets = [
        # 项目级 hvigor 缓存（每次 build 必清，避免脏状态）
        os.path.join(harmony_dir, ".hvigor"),
    ]
    # 全局 pnpm 索引缓存候选位置
    hvigor_home = os.environ.get("HVIGOR_HOME")
    if hvigor_home:
        targets.append(os.path.join(hvigor_home, "caches", "v10", "index"))
    if sys.platform == "win32":
        targets.append(r"D:\.hvigor\caches\v10\index")
        targets.append(r"C:\.hvigor\caches\v10\index")
    targets.append(os.path.join(os.path.expanduser("~"), ".hvigor", "caches", "v10", "index"))

    cleaned = []
    for t in targets:
        if os.path.isdir(t):
            shutil.rmtree(t, ignore_errors=True)
            if not os.path.exists(t):
                cleaned.append(t)
    if cleaned:
        print("  已清 hvigor pnpm 索引缓存（避免源 tarball 全路径超 Windows MAX_PATH）:")
        for c in cleaned:
            print(f"    - {c}")


def _build_har(root: str) -> int:
    root_pkg = read_json(os.path.join(root, "package.json"))
    short = derive_short_name(root_pkg.get("name", ""))
    camel = derive_camel_name(short)
    ohos_name = read_json(os.path.join(root, "ohos", "package.json")).get("name", "")
    lib_src = os.path.join(root, "ohos", "harmony", short)
    if not os.path.isdir(lib_src):
        raise SystemExit(f"未找到 ohos/harmony/{short}（js-only 无需 build har）。")
    hw = _resolve_har_wrapper_path(os.path.join(root, "ohos"), short)
    if not os.path.isdir(hw):
        raise SystemExit("缺少 har_wrapper，先 rnohos.py scaffold。")
    lib_dst = os.path.join(hw, short)
    if os.path.isdir(lib_dst):
        _rmtree_junction_aware(lib_dst)
    shutil.copytree(lib_src, lib_dst, ignore=shutil.ignore_patterns("oh_modules", "build"))

    # The har_wrapper template ships with unresolved {{SHORT_NAME}}/{{NPM_NAME}}
    # placeholders and an orphan template `library/` module (the real module is
    # <short>/). Resolve placeholders and drop the orphan so ohpm/hvigor see a
    # consistent project.
    orphan_lib = os.path.join(hw, "library")
    if os.path.isdir(orphan_lib):
        _rmtree_junction_aware(orphan_lib)
    substitute_tree(hw, {
        "{{SHORT_NAME}}": short,
        "{{CAMEL_NAME}}": camel,
        "{{NPM_NAME}}": ohos_name,
    })

    # The library references @rnoh/react-native-openharmony via
    # file:../react_native_openharmony_release.har. Provision that HAR (copied out
    # of the @react-native-oh/react-native-harmony npm package).
    rnoh_har = os.path.join(hw, "react_native_openharmony_release.har")
    if not os.path.isfile(rnoh_har):
        _provision_rnoh_har(root, rnoh_har)

    hw_real = os.path.realpath(hw)
    run(["ohpm", "install", "--all", "--registry", OHPM_REGISTRY, "--strict_ssl", "true"], cwd=hw_real,
        quiet=True, log_name="build-har-ohpm-install.log")
    run([find_hvigorw(hw_real), "assembleHar", "--no-daemon"], cwd=hw_real,
        quiet=True, log_name="build-har-assemble.log")
    har_src = os.path.join(lib_dst, "build", "default", "outputs", "default", f"{short}.har")
    if not os.path.isfile(har_src):
        raise SystemExit(f"[FAILED] 未生成 HAR：{har_src}")
    har_dst = os.path.join(root, "ohos", "harmony", f"{short}.har")
    shutil.copy2(har_src, har_dst)
    _finalize_native_har(har_dst, os.path.join(lib_src, "src", "main", "cpp"))
    print(f"[SUCCESS] HAR → {har_dst}")
    return 0


def _finalize_native_har(har_path: str, cpp_src: str) -> None:
    """就地重整原生库 HAR，满足 RNOH C-API autolinking 契约。

    消费端 example 里 example 的 autolinking.cmake 恒生成
    `add_subdirectory(${OH_MODULES_DIR}/<pkg>/src/main/cpp ...)`，要求 HAR 解包到
    oh_modules 后 **内含 src/main/cpp 源码**（CMakeLists + codegen 胶水）；且 ArkTS
    侧要靠 `.har` 作为正规 ohpm 包才会被合进 entry 的 modules.abc（源码目录 file:
    依赖在 useNormalizedOHMUrl 下只软链、不合并 → 运行时 `cannot find record
    '&@oh-rn/<pkg>/index&x.y.z'` ReferenceError 崩溃）。

    但 DevEco `assembleHar` 恰好反着来：剥掉 src/main/cpp 源码、塞进编译好的
    libs/*.so。若原样消费：① 缺 cpp → autolinking add_subdirectory 找不到源目录，
    CMake 配置失败；② 预编译 libwheel_picker.so 与消费端 add_subdirectory 重编出的
    同名 .so 冲突 → ProcessLibs 报 306049 Duplicated files。

    故构建后就地修正：注入 cpp 源码 + 删除 libs/ 预编译产物（消费端重编）。用
    tarfile 重打包（确定性，且规避 macOS tar 的 AppleDouble `._*` 伴随文件——它们
    非法 UTF-8，会被 CMake 当 .cpp 编译而报错）。纯 JS/TurboModule 无 cpp 则跳过注入。"""
    tmp = tempfile.mkdtemp()
    try:
        with tarfile.open(har_path, "r:gz") as tf:
            tf.extractall(tmp)
        pkg = os.path.join(tmp, "package")
        libs = os.path.join(pkg, "libs")
        if os.path.isdir(libs):
            shutil.rmtree(libs)  # 预编译 .so：消费端 add_subdirectory 重编，去重
        if os.path.isdir(cpp_src):
            dst_cpp = os.path.join(pkg, "src", "main", "cpp")
            if os.path.isdir(dst_cpp):
                shutil.rmtree(dst_cpp)
            shutil.copytree(cpp_src, dst_cpp,
                            ignore=shutil.ignore_patterns("._*", ".DS_Store"))
        with tarfile.open(har_path, "w:gz") as tf:
            tf.add(pkg, arcname="package")
        print(f"  已重整原生 HAR（注入 src/main/cpp、剥离预编译 libs/）")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def _provision_rnoh_har(root: str, dest: str) -> None:
    """Copy the RNOH HAR out of @react-native-oh/react-native-harmony (npm)."""
    rel = os.path.join("@react-native-oh", "react-native-harmony",
                       "react_native_openharmony_release.har")
    for base in (os.path.join(root, "ohos", "example", "node_modules"),
                 os.path.join(root, "ohos", "node_modules"),
                 os.path.join(root, "node_modules")):
        cand = os.path.join(base, rel)
        if os.path.isfile(cand):
            shutil.copy2(cand, dest)
            print(f"  RNOH HAR ← {cand}")
            return
    raise SystemExit(
        "未找到 react_native_openharmony_release.har（先跑一次 build hap 安装 "
        "@react-native-oh/react-native-harmony，或手动放入 har_wrapper/）。")


def _set_ohpkg_dep(path: str, section: str, key: str, value: str) -> None:
    """Idempotently set key=value inside a json5 oh-package section (deps/
    overrides). No-op when already present. Falls back to text-skip on json5
    features that json can't parse."""
    body = _read(path)
    if body is None or key in body:
        return
    try:
        data = json.loads(body)
    except json.JSONDecodeError:
        return  # leave exotic json5 untouched rather than risk corruption
    sec = data.setdefault(section, {})
    if sec.get(key) == value:
        return
    sec[key] = value
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"  已注入 oh-package {section}: {key} → {value}")


def _wire_native_har_deps(example_real: str, name: str, short: str) -> None:
    """Wire the built library HAR (shipped inside the npm package) as an ohpm
    dependency so its codegen C++ glue lands in entry/oh_modules, where the
    entry CMakeLists' OH_MODULES_DIR resolves. Required for libraries with
    generated native glue; no-op if build har hasn't produced the HAR yet."""
    har_in_npm = os.path.join(example_real, "node_modules", name,
                              "harmony", f"{short}.har")
    if not os.path.isfile(har_in_npm):
        print("  [info] 未发现已构建 HAR（建议先 rnohos.py build har）；跳过原生 HAR ohpm 依赖注入。")
        return
    _set_ohpkg_dep(os.path.join(example_real, "harmony", "entry", "oh-package.json5"),
                   "dependencies", name,
                   f"../../node_modules/{name}/harmony/{short}.har")
    _set_ohpkg_dep(os.path.join(example_real, "harmony", "oh-package.json5"),
                   "overrides", name,
                   f"../node_modules/{name}/harmony/{short}.har")


def _provision_hvigor_plugin(example_real: str) -> None:
    """确定性就位 RNOH hvigor 插件，规避 assembleHap 报 `Cannot find module '@rnoh/hvigor-plugin'`。
    把经验卡 enametoolong-pnpm-path / pnpm-cache-path-259 的手动绕法固化进脚本，根治两类坑：
      ① 模板默认用长 file: 路径(file:../../node_modules/.../rnoh-hvigor-plugin-*.tgz)，撑爆
         hvigor 内部 pnpm 缓存键(ENAMETOOLONG / Win MAX_PATH) → 插件装不上；
      ② js-only(example_js)覆盖出来的 hvigor-config 的 dependencies 为空、却仍 import 该插件 → 必报。
    做法：从 node_modules 找到真实 tgz 拷进 harmony/hvigor/(短路径)，并把 hvigor-config.json5 的
    `@rnoh/hvigor-plugin` 设成 `file:./<tgz>`(没声明则插进 dependencies)。幂等，每次 build 刷新。"""
    cli_harmony = os.path.join(example_real, "node_modules", "@react-native-oh",
                               "react-native-harmony-cli", "harmony")
    hvigor_dir = os.path.join(example_real, "harmony", "hvigor")
    cfg = os.path.join(hvigor_dir, "hvigor-config.json5")
    if not os.path.isdir(cli_harmony) or not os.path.isfile(cfg):
        return  # 异常态（未装 harmony-cli / 无 hvigor-config）：交给 hvigor 自行报错，不静默兜底
    tgzs = sorted(f for f in os.listdir(cli_harmony) if re.match(r"rnoh-hvigor-plugin-.*\.tgz$", f))
    if not tgzs:
        return
    tgz = tgzs[-1]
    os.makedirs(hvigor_dir, exist_ok=True)
    shutil.copy2(os.path.join(cli_harmony, tgz), os.path.join(hvigor_dir, tgz))
    body = _read(cfg)
    if body is None:
        return
    ref = f'"@rnoh/hvigor-plugin": "file:./{tgz}"'
    if "@rnoh/hvigor-plugin" in body:
        new = re.sub(r'"@rnoh/hvigor-plugin"\s*:\s*"[^"]*"', lambda _m: ref, body)
    else:  # dependencies 为空(js-only)：插进 { … }
        new = re.sub(r'("dependencies"\s*:\s*\{)', lambda m: m.group(1) + "\n    " + ref, body, count=1)
    if new != body:
        with open(cfg, "w", encoding="utf-8", newline="\n") as f:
            f.write(new)
    print(f"  已就位 hvigor 插件(短路径): harmony/hvigor/{tgz}")


def _build_hap(root: str, skip_check: bool, example_dir_name: str = "example") -> int:
    ohos_dir = os.path.join(root, "ohos")
    # example_dir_name 默认 "example"（标准 build hap）；
    # demo-gen 阶段传 "example_auto"（基于 example 拷贝 + Agent 写入 demo 代码）。
    # **必须用 realpath**：ohos 是 junction → <drive>:\rn\<N>（短真实），realpath 解析过去后，
    # hvigor 在真实短路径上跑 → realpath(p)===p 通过（不报 PATH_NOT_FOUND 00303149）且路径短（不撞 ninja 260）。
    # 旧方案用 abspath 不解析 junction → 构建穿过 reparse point → hvigor 必报 PATH_NOT_FOUND。
    example_real = os.path.realpath(os.path.join(ohos_dir, example_dir_name))
    harmony_dir = os.path.join(example_real, "harmony")
    if not os.path.isdir(harmony_dir):
        raise SystemExit(f"缺少 {harmony_dir}，先 rnohos.py scaffold。")
    pkg = read_json(os.path.join(ohos_dir, "package.json"))
    name, ver = pkg.get("name", ""), pkg.get("version", "")
    if not name or not ver:
        raise SystemExit("ohos/package.json 缺 name/version。")
    tgz = name.replace("@", "").replace("/", "-") + f"-{ver}.tgz"

    # prepare：pack → file: tgz → 安装
    run(["npm", "pack", "--ignore-scripts", "--loglevel=error"], cwd=ohos_dir)
    if not os.path.isfile(os.path.join(ohos_dir, tgz)):
        raise SystemExit(f"未生成 tgz：{tgz}")
    ex_pkg_path = os.path.join(example_real, "package.json")
    ex_pkg = read_json(ex_pkg_path)
    deps = ex_pkg.setdefault("dependencies", {})
    for n, v in (pkg.get("peerDependencies") or {}).items():
        deps.setdefault(n, v)
    deps[name] = f"file:../{tgz}"  # key 用 ohos 包名（@oh-rn/...），与 doctor 约定一致
    write_json(ex_pkg_path, ex_pkg)
    # 重建陷阱：npm 对同名同版本(x.y.z)的 file: tgz 会命中 package-lock 里锁定的旧
    # integrity，静默复用上一次 tgz 内容——本地库任何改动（ETS/C++ 源码、build har
    # 重整后的 HAR）都不会进入本次 hap，且不报错。装前清掉本地库的旧安装目录 +
    # lockfile，逼 npm 按刚打出的 tgz 的新 integrity 重新解析（缓存未命中 → 读实际
    # 文件）。example 是一次性 demo，重解析全量依赖成本可接受、正确性优先。
    stale_inst = os.path.join(example_real, "node_modules", *name.split("/"))
    if os.path.isdir(stale_inst):
        _rmtree_junction_aware(stale_inst)
    stale_lock = os.path.join(example_real, "package-lock.json")
    if os.path.isfile(stale_lock):
        os.remove(stale_lock)
    run(["npm", "install", "--legacy-peer-deps", f"--registry={NPM_REGISTRY}"], cwd=example_real,
        quiet=True, log_name="build-hap-npm-install.log")
    # npm install 后 harmony-cli 的 tgz 才存在 → 此刻把 hvigor 插件就位到短路径
    _provision_hvigor_plugin(example_real)
    # Libraries whose harmony module ships codegen C++ glue must have the built
    # HAR wired as an ohpm dep of the entry so it lands in entry/oh_modules
    # (where the entry CMakeLists' OH_MODULES_DIR resolves). Idempotent no-op
    # when the dep is already present (e.g. checked into the example template).
    _wire_native_har_deps(example_real, name, derive_short_name(name))
    run(["ohpm", "install", "--all", "--registry", OHPM_REGISTRY, "--strict_ssl", "true"], cwd=harmony_dir,
        quiet=True, log_name="build-hap-ohpm-install.log")

    # 构建前自检（白屏门禁）
    if not skip_check:
        errors, warnings = run_checks(example_real, harmony_dir)
        report_checks(errors, warnings)

    # compile：bundle → assembleHap（注册由 ohos/package.json autolinking + hvigor autolink 处理）
    # 直接跑 RNOH 官方 bundle 命令，**不经 example 的 `dev` 脚本
    # 类型核查保留为可选的 `npm run tsc`，不作出包门禁。
    run(["npx", "react-native", "bundle-harmony", "--dev", "false"], cwd=example_real,
        quiet=True, log_name="build-hap-bundle.log")
    # bundle 后白屏门禁：全局 Intl 调用但无 polyfill（dayjs timezone 等）
    if not skip_check:
        intl_polyfill_gate(harmony_dir)
    # 清 hvigor caches：避免 pnpm 把 RNOH hvigor plugin tarball 的全路径拼成超长 cache key
    # 触发 Windows MAX_PATH ENOENT（详见 lessons/build.json: pnpm-cache-path-259）。
    _clean_hvigor_caches(harmony_dir)
    run([find_hvigorw(harmony_dir), "assembleHap", "--no-daemon"], cwd=harmony_dir,
        quiet=True, log_name="build-hap-assemble.log")
    print("[SUCCESS] HAP assembled。")
    return 0


# build-fix 循环上限：连续失败达此次数后拒绝再 build，防止 agent 陷入无限重试烧推理洪量
# （socket hang up 的主要放大器）。成功任一次即归零，下一轮独立问题重新计数。
MAX_BUILDFIX = 15


def _buildfix_count_path() -> str:
    d = _LOG_DIR or os.path.join(os.getcwd(), ".ohos-adaptation", "logs")
    return os.path.join(d, ".buildfix-count.json")


def _read_buildfix_count() -> int:
    try:
        return int(read_json(_buildfix_count_path()).get("failures", 0))
    except Exception:
        return 0


def _write_buildfix_count(n: int) -> None:
    try:  # 计数落盘失败不阻塞 build 本身
        p = _buildfix_count_path()
        os.makedirs(os.path.dirname(p), exist_ok=True)
        write_json(p, {"failures": int(n)})
    except Exception:
        pass


def cmd_build(args) -> int:
    # ohos 已是 junction→短真实目录（scaffold 期建好）；_build_hap 用 realpath(ohos) 在真实短路径上构建。
    root = os.path.abspath(args.plugin_root)
    _set_log_dir(root)
    # build-fix 上限门禁：连续失败达 MAX_BUILDFIX 次后直接拒绝，断掉无限重试。
    fails = _read_buildfix_count()
    if fails >= MAX_BUILDFIX:
        print(
            f"[BLOCKED] build 已连续失败 {fails} 次（上限 {MAX_BUILDFIX}），停止重试以免烧推理洪量。"
            f" 请人工读 .ohos-adaptation/logs/ 最新构建日志修真实问题（或确认平台能力缺失、"
            f"按 lessons 记录差距后收尾）。修好后删 {_buildfix_count_path()} 解锁。",
            file=sys.stderr,
        )
        return 1
    try:
        if args.target == "har":
            rc = _build_har(root)
        else:
            rc = _build_hap(root, args.skip_check, args.example_dir)
    except BaseException:
        _write_buildfix_count(fails + 1)  # 任一步失败（含 run raise 的 SystemExit）计数 +1
        raise
    _write_buildfix_count(0)  # 成功归零
    return rc


# ───────────────────────── check（只读自检） ─────────────────────────

_FILE_REF_RE = re.compile(r'["\']file:([^"\']+)["\']')
_RETURN_ARRAY_RE = re.compile(r"return\s*\[(.*?)\]", re.DOTALL)


def _read(p):
    try:
        with open(p, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    except OSError:
        return None


def _entry_has_plugin_har(harmony_dir):
    body = _read(os.path.join(harmony_dir, "entry", "oh-package.json5"))
    if body is None:
        return False
    return any(m.group(1).endswith(".har") and "react_native_openharmony" not in m.group(1)
               for m in _FILE_REF_RE.finditer(body))


def _node_modules_ancestor(p: str) -> str | None:
    """返回路径所属的最近 ``node_modules`` 祖先目录路径（不判存在性，仅看路径字符串）；无则 None。

    用于区分 ``file:`` 依赖是否落在 node_modules 下（即由 ``build hap`` 的 npm install 提供，
    安装前缺失是预期态），避免把「框架 HAR 还没装」误报成阻断性 ERROR 吓退 build hap。"""
    cur = os.path.normpath(os.path.abspath(p))
    while True:
        if os.path.basename(cur) == "node_modules":
            return cur
        parent = os.path.dirname(cur)
        if parent == cur:
            return None
        cur = parent


# ── codegen 契约门禁：Spec ↔ generated cpp methodMap_ 一致性 ───────────────
# JS Spec（interface X extends TurboModule）声明的每个方法，codegen 都会在
# generated/<X>.cpp 的 methodMap_ 里生成一条 ARK_(ASYNC_)METHOD_METADATA。改 Spec
# 后没重跑 codegen、或手写 generated 漏注册，JS 调 NativeModule.<方法> 会经
# ArkTSTurboModule::callAsync 找不到方法而静默抛异常（常被 JS catch 吞掉）→ 功能
# 无响应/白屏（react_native_release_profiler 的 saveToDownloadsDir 即此坑）。此门禁把
# primary-03「generated/ 与 Spec 一致」的口头约定变成硬门禁。
_ARK_METHOD_RE = re.compile(r"ARK_(?:ASYNC_)?METHOD_METADATA\s*\(\s*(\w+)\s*,")
_SPEC_IFACE_RE = re.compile(r"interface\s+\w+\s+extends\s+TurboModule\s*\{")
_SPEC_METHOD_LINE_RE = re.compile(r"^\s*(?:readonly\s+)?(\w+)\s*\??\s*(?:<[^>]*>)?\s*\(")
# codegen 对这些特殊成员不生成常规 methodMap_ 条目，排除以免误报
_SPEC_METHOD_DENYLIST = {"getConstants", "addListener", "removeListeners"}
_SPEC_METHOD_KW = {"if", "for", "while", "switch", "catch", "return", "function",
                   "constructor", "get", "set"}
# TurboModule 构造时缓存易失上下文（react_native_store_review / react-native-dark-mode 同类坑）
_CTOR_RE = re.compile(r"constructor\s*\([^)]*\)\s*\{")
_CTX_READ_RE = re.compile(r"uiAbilityContext|config\.colorMode")
_FIELD_ASSIGN_RE = re.compile(r"this\.(\w+)\s*=(?!=)")


def _brace_body(text: str, open_idx: int) -> str:
    """返回 text[open_idx] 处 '{' 到其配对 '}' 之间的内容（不含大括号）。"""
    depth = 0
    for i in range(open_idx, len(text)):
        c = text[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return text[open_idx + 1:i]
    return text[open_idx + 1:]


def _spec_declared_methods(text: str) -> set:
    """从 JS Spec（interface X extends TurboModule {...}）提取声明的方法名。"""
    m = _SPEC_IFACE_RE.search(text)
    if not m:
        return set()
    names = set()
    for line in _brace_body(text, m.end() - 1).splitlines():
        mm = _SPEC_METHOD_LINE_RE.match(line)
        if mm and mm.group(1) not in _SPEC_METHOD_KW:
            names.add(mm.group(1))
    return names - _SPEC_METHOD_DENYLIST


def _ctor_context_cache_fields(text: str) -> list:
    """构造函数里读取 uiAbilityContext/config.colorMode 且把值写进实例字段
    → 有『构造时缓存易失上下文』时序风险。返回受影响字段（去掉裸 ctx），无则 []。"""
    m = _CTOR_RE.search(text)
    if not m:
        return []
    body = _brace_body(text, m.end() - 1)
    if not _CTX_READ_RE.search(body):
        return []
    return sorted({f for f in _FIELD_ASSIGN_RE.findall(body) if f != "ctx"})


def codegen_contract_checks(ohos_real: str):
    """Spec↔methodMap_ 一致性(ERROR) + TurboModule 构造时缓存上下文(WARNING)。

    parity 判定仅在已有 generated cpp 时执行（codegen 未跑时不误报）。"""
    errors, warnings = [], []
    gen_cpps = glob.glob(os.path.join(
        ohos_real, "harmony", "*", "src", "main", "cpp", "generated", "*.cpp"))
    spec_ts = (glob.glob(os.path.join(ohos_real, "src", "specs", "v1", "*.ts")) +
               glob.glob(os.path.join(ohos_real, "src", "specs", "v2", "*.ts")))
    lib_ets = (glob.glob(os.path.join(ohos_real, "harmony", "*", "src", "main", "ets", "*.ts")) +
               glob.glob(os.path.join(ohos_real, "harmony", "*", "src", "main", "ets", "*.ets")))

    # 1) Spec 声明的方法必须已注册进 generated cpp methodMap_
    if gen_cpps:
        registered = set()
        for c in gen_cpps:
            registered |= set(_ARK_METHOD_RE.findall(_read(c) or ""))
        declared = set()
        for s in spec_ts:
            declared |= _spec_declared_methods(_read(s) or "")
        missing = sorted(declared - registered)
        if missing:
            errors.append(
                "[codegen] Spec 声明的方法未注册进 generated cpp methodMap_：" + ", ".join(missing) +
                "。JS 调用会经 ArkTSTurboModule::callAsync 找不到方法而静默失败（无响应/白屏）。"
                "改 Spec 后必须重跑 `rnohos.py codegen`；若 generated 为手写，补 "
                "ARK_ASYNC_METHOD_METADATA(<方法>, <参数个数>)。"
                "（lessons/registration.json: cpp-methodmap-missing-method）")

    # 2) TurboModule 构造时缓存 uiAbilityContext/config → 时序风险（WARNING，不阻断）
    for e in sorted(lib_ets):
        if os.sep + "generated" + os.sep in e:
            continue
        fields = _ctor_context_cache_fields(_read(e) or "")
        if fields:
            warnings.append(
                f"[context-cache] {os.path.basename(e)} 构造函数读取 uiAbilityContext/config 并缓存到字段 "
                f"[{', '.join(fields)}]；UITurboModule 可能在上下文/配置就绪前被急切实例化，缓存值会失效/过期"
                "（深色模式误判、context 无效弹窗拉不起等）。改为在方法/getConstants 调用时即时读 "
                "this.ctx.uiAbilityContext，勿在构造时缓存。（lessons/contract.json: native-context-cache-stale）")
    return errors, warnings


def run_checks(example_real, harmony_dir):
    errors, warnings = [], []
    # 1) file: 依赖真实存在
    for mf in (os.path.join(example_real, "package.json"),
               os.path.join(harmony_dir, "oh-package.json5"),
               os.path.join(harmony_dir, "entry", "oh-package.json5")):
        body = _read(mf)
        if body is None:
            continue
        base = os.path.dirname(mf)
        for m in _FILE_REF_RE.finditer(body):
            raw = m.group(1).strip()
            if not raw:
                continue
            target = raw if os.path.isabs(raw) else os.path.normpath(os.path.join(base, raw))
            if os.path.exists(target):
                continue
            rel_mf = os.path.relpath(mf, example_real)
            # file: 指向 node_modules/ 的依赖（典型：RNOH 框架 HAR react_native_openharmony_release.har）
            # 由 build hap 的 npm install 提供——安装前缺失是预期态。node_modules 未装 → WARNING（不阻断）；
            # node_modules 已在却仍缺该文件（install 跑过仍缺）→ ERROR（真问题）。其余 file: 缺失 → ERROR。
            nm = _node_modules_ancestor(target)
            if nm and not os.path.isdir(nm):
                warnings.append(f"[file-dep] {rel_mf} 的 file: 依赖尚未安装：{raw}"
                                "（指向 node_modules/，build hap 的 npm install 会提供；安装前缺失属预期，不阻断 build hap）")
            else:
                errors.append(f"[file-dep] {rel_mf} 的 file: 依赖不存在：{raw}"
                              "（node_modules/<X> 段须用安装目录名/依赖 key，而非 @oh-rn/... 包名）")
    # 2) RNPackage 注册非空（声明了业务 HAR 时）
    if _entry_has_plugin_har(harmony_dir):
        factory = None
        for r, _d, fs in os.walk(harmony_dir):
            if "oh_modules" in r or os.sep + "build" + os.sep in r + os.sep:
                continue
            for fn in fs:
                if fn in ("RNOHPackagesFactory.ets", "RNPackagesFactory.ets"):
                    factory = os.path.join(r, fn)
        if factory is None:
            warnings.append("[register] 未找到 RNOHPackagesFactory.ets（autolink 编译时生成；手动路线缺失=白屏）。")
        else:
            m = _RETURN_ARRAY_RE.search(_read(factory) or "")
            if m and m.group(1).strip() in ("", ","):
                errors.append(f"[register] {os.path.relpath(factory, example_real)} createRNOHPackages 返回空数组 = 白屏。")
        cmake = _read(os.path.join(harmony_dir, "entry", "src", "main", "cpp", "autolinking.cmake"))
        if cmake is not None:
            m = re.search(r"set\(\s*AUTOLINKED_LIBRARIES\s*(.*?)\)", cmake, re.DOTALL)
            if m and m.group(1).strip() == "":
                warnings.append("[autolink] AUTOLINKED_LIBRARIES 为空（纯 ArkTS 可正常；有 C++ 则未链接）。")
    # 3) .bin/react-native 符号链接
    bin_rn = os.path.join(example_real, "node_modules", ".bin", "react-native")
    if os.path.exists(bin_rn) and not os.path.islink(bin_rn):
        warnings.append("[node_modules] .bin/react-native 非符号链接，可能 Cannot find module；rm -rf node_modules && npm install。")
    # 4) codegen 契约门禁：Spec↔methodMap_ 一致(ERROR) + 构造时上下文缓存(WARNING)
    # example_real=realpath(ohos/example) → 其父即 ohos 真实目录（Windows junction 已解引用）。
    ce, cw = codegen_contract_checks(os.path.dirname(example_real))
    errors.extend(ce)
    warnings.extend(cw)
    return errors, warnings


# 全局 Intl 被「调用/读取」（运行期必触发 ReferenceError，鸿蒙 Hermes 无 Intl）：
#   new Intl. / Intl.DateTimeFormat( / Intl.NumberFormat( / Intl.Collator(
# 典型来源：dayjs/plugin/timezone、moment-timezone、date-fns-tz 内部直接 new Intl.DateTimeFormat(...)
_INTL_USE_RE = re.compile(r"new\s+Intl\.|Intl\.(?:DateTimeFormat|NumberFormat|Collator)\s*\(")
# 全局 Intl 被「写入」（= 已注入 polyfill）：x.Intl= / globalThis.Intl / __rnOhos*Intl*
_INTL_POLYFILL_RE = re.compile(r"\.Intl\s*=|globalThis\.Intl|__rnOhos\w*[Ii]ntl")


def _find_bundle(harmony_dir):
    for r, _d, fs in os.walk(harmony_dir):
        if "oh_modules" in r or os.sep + "build" + os.sep in r + os.sep:
            continue
        if "bundle.harmony.js" in fs:
            return os.path.join(r, "bundle.harmony.js")
    return None


def intl_polyfill_gate(harmony_dir):
    """bundle 后白屏门禁：bundle 内调用了全局 Intl 但未注入全局 Intl polyfill →
    鸿蒙 Hermes 无 Intl，编译能过但真机渲染期 ReferenceError 白屏（dayjs timezone 等依赖高发）。"""
    bundle_path = _find_bundle(harmony_dir)
    if not bundle_path:
        return
    body = _read(bundle_path) or ""
    if _INTL_USE_RE.search(body) and not _INTL_POLYFILL_RE.search(body):
        raise SystemExit(
            "[intl] 白屏门禁未过：bundle.harmony.js 内有对全局 Intl 的调用（如 dayjs timezone 的 "
            "new Intl.DateTimeFormat(...)），但未发现全局 Intl polyfill 注入。鸿蒙 Hermes 无 Intl，"
            "编译能过但真机渲染期 ReferenceError → 白屏。\n"
            "  修复：建独立 ohos/src/intl-polyfill.js 补 globalThis.Intl（DateTimeFormat 兼容 new/无 new + "
            "format/formatToParts/resolvedOptions），在库/Example 入口第一行纯副作用 import './intl-polyfill'"
            "（早于 dayjs.extend(timezone)），重跑 build hap。\n"
            "  注意：仅补 Date.prototype.toLocaleString 不够——依赖读的是全局 Intl 对象本身。\n"
            "  （若确属 typeof 守卫的安全用法被误报，可临时 build hap --skip-check 跳过全部自检。）"
        )


def report_checks(errors, warnings):
    print("=== rnohos check（构建前自检）===")
    for w in warnings:
        print(f"  [WARN] {w}")
    if errors:
        print(f"\n  {len(errors)} 个阻断性问题：")
        for e in errors:
            print(f"  [ERROR] {e}")
        raise SystemExit("check 未通过，修复 [ERROR] 后重试。")
    print(f"  通过（{len(warnings)} 个警告）。")


def cmd_check(args) -> int:
    root = os.path.abspath(args.plugin_root)
    example_real = os.path.realpath(os.path.join(root, "ohos", "example"))
    if not os.path.isdir(example_real):
        print(f"[check] 未找到 {example_real}，跳过。")
        return 0
    report_checks(*run_checks(example_real, os.path.join(example_real, "harmony")))
    return 0


def cmd_check_readme(args) -> int:
    """校验 ohos/README.md 已填完：无残留 {{...}} 占位符、无 huawei 字样。
    独立命令（不进 build hap，避免"填之前每次构建都失败"死循环）；validation 填完 README 后收尾跑一次。"""
    root = os.path.abspath(args.plugin_root)
    path = os.path.join(root, "ohos", "README.md")
    if not os.path.isfile(path):
        print(f"[check-readme] 未找到 {path}")
        return 1
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    problems = []
    leftovers = sorted(set(re.findall(r"\{\{[^}]+\}\}", text)))
    if leftovers:
        problems.append(f"残留占位符未填: {', '.join(leftovers)}")
    if re.search(r"huawei", text, re.IGNORECASE):
        problems.append("出现禁用字样 huawei（应统一用 HarmonyOS）")
    if problems:
        print("[check-readme] 未通过：")
        for pb in problems:
            print(f"  - {pb}")
        return 1
    print("[check-readme] 通过：README 无残留占位符、无禁用字样。")
    return 0


def cmd_clean(args) -> int:
    """删除 ohos 及全部内容（含 junction 指向的真实短目录 + 记录文件）。

    项目迁移/删除/重置时清理，避免 <drive>:\\rn\\ 堆积垃圾真实目录。也清 har_wrapper 物理目录。"""
    root = os.path.abspath(args.plugin_root)
    print("=== rnohos clean ===")
    removed = remove_ohos_completely(root)
    # 顺带清 har_wrapper 物理短目录（若存在）
    for hw_root in (os.path.join(root, "ohos", ".rn-build"),
                    os.path.join(f"{_win_drive(root)}\\rnb", _short_token(root))):
        if os.path.isdir(hw_root):
            _rmtree_junction_aware(hw_root)
            removed.append(hw_root)
    if removed:
        for p in removed:
            print(f"  已删除: {p}")
    else:
        print("  无可清理项（ohos/ 不存在）。")
    return 0


# ───────────────────────── CLI ─────────────────────────

def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="rnohos",
                                description="RN→HarmonyOS 确定性脚手架/构建 CLI（scaffold/codegen/build/check）")
    p.add_argument("--plugin-root", default=os.getcwd(), help="插件仓库根（默认 cwd）")
    p.add_argument("--ohos-scope", default=DEFAULT_SCOPE, help="OHOS 包名 scope（默认 @oh-rn）")
    sp = p.add_subparsers(dest="cmd", required=True)

    ps = sp.add_parser("scaffold", help="派生名字 + 拷模板 + 替占位符 + 注 autolinking")
    ps.add_argument("--type", required=True, choices=["turbo", "fabric", "cpp", "js-only"])
    ps.add_argument("--force", action="store_true", help="覆盖已存在的 ohos/")
    ps.set_defaults(func=cmd_scaffold)

    pg = sp.add_parser("codegen", help="官方 codegen-harmony 生成 generated/ 胶水")
    pg.set_defaults(func=cmd_codegen)

    pb = sp.add_parser("build", help="构建 HAR / HAP（hap 前自动 check；hap bundle 后 Intl 白屏门禁）")
    pb.add_argument("target", choices=["har", "hap"])
    pb.add_argument("--skip-check", action="store_true")
    pb.add_argument("--example-dir", default="example", dest="example_dir",
                    help="hap 编译的 example 目录名（默认 example；demo-gen 阶段传 example_auto）")
    pb.set_defaults(func=cmd_build)

    pc = sp.add_parser("check", help="构建前只读自检")
    pc.set_defaults(func=cmd_check)

    pcr = sp.add_parser("check-readme", help="校验 ohos/README.md 占位符已填完、无禁用字样")
    pcr.set_defaults(func=cmd_check_readme)

    pcl = sp.add_parser("clean", help="删 ohos 全部内容（含 junction 真实短目录 + har_wrapper），项目重置/迁移时用")
    pcl.set_defaults(func=cmd_clean)
    return p


def main(argv=None) -> int:
    args = build_parser().parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
