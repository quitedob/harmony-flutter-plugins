"""
build hap 自检门禁（doctor）。

在 ohpm/bundle/assembleHap 之前对 example 工程做一组高置信度静态校验，
把"装不上 / 白屏 / 改了没效果"这类深层失败提前成秒级、可定位的早失败。

校验项（来源：docs/0604_rn_faq 各插件调试记录）：
- [ERROR] 所有 file: 依赖（package.json + 各 oh-package.json5）必须解析到真实存在的文件
         （voice 案：entry 与 harmony 的 .har 路径不一致 -> Fetch Local Package Failed）
- [ERROR] entry/oh-package.json5 声明了插件 HAR 时，RNOHPackagesFactory.ets 必须注册 >=1 个 Package
         （avoid-softinput #1：autolinking 为空 -> 白屏只剩模板页）
- [WARN ] autolinking.cmake 的 AUTOLINKED_LIBRARIES 为空（纯 ArkTS 插件可正常为空）
- [WARN ] RNOHPackagesFactory.h（C++ 侧）为空但 .ets 非空（注册不一致）
- [WARN ] node_modules/.bin/react-native 不是符号链接（avoid-softinput #2：sync 报 Cannot find module）

返回 (errors, warnings)。errors 非空表示门禁失败。
设计成可扩展：新增检查只需往 _CHECKS 加函数。
"""

import os
import re

_FILE_REF_RE = re.compile(r'["\']file:([^"\']+)["\']')
_RETURN_ARRAY_RE = re.compile(r"return\s*\[(.*?)\]", re.DOTALL)


def _read(path: str) -> str | None:
    try:
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    except OSError:
        return None


def _rel(path: str, root: str) -> str:
    try:
        return os.path.relpath(path, root)
    except ValueError:
        return path


def _check_file_deps(example_real: str, harmony_dir: str, errors: list[str], warnings: list[str]) -> None:
    """所有 file: 依赖必须指向真实存在的文件。"""
    manifests = [
        os.path.join(example_real, "package.json"),
        os.path.join(harmony_dir, "oh-package.json5"),
        os.path.join(harmony_dir, "entry", "oh-package.json5"),
    ]
    for mf in manifests:
        body = _read(mf)
        if body is None:
            continue
        base = os.path.dirname(mf)
        for m in _FILE_REF_RE.finditer(body):
            raw = m.group(1).strip()
            if not raw:
                continue
            dep_path = raw if os.path.isabs(raw) else os.path.normpath(os.path.join(base, raw))
            if not os.path.exists(dep_path):
                errors.append(
                    f"[file-dep] {_rel(mf, example_real)} 的 file: 依赖不存在：{raw}\n"
                    f"           -> 解析为 {dep_path}\n"
                    f"           提示：路径里的 node_modules/<X> 段必须用『安装目录名』(package.json 的依赖 key)，"
                    f"而非 ohos 包名(@oh-rn/...)。"
                )


def _entry_has_plugin_har(harmony_dir: str) -> bool:
    """entry/oh-package.json5 是否声明了业务插件 HAR（排除 rnoh 自身的 release har）。"""
    body = _read(os.path.join(harmony_dir, "entry", "oh-package.json5"))
    if body is None:
        return False
    for m in _FILE_REF_RE.finditer(body):
        raw = m.group(1)
        if raw.endswith(".har") and "react_native_openharmony" not in raw:
            return True
    return False


def _return_array_is_empty(body: str) -> bool | None:
    """判断 createRNOHPackages 的 return [...] 是否为空数组；无法判定返回 None。"""
    m = _RETURN_ARRAY_RE.search(body)
    if not m:
        return None
    inner = m.group(1).strip()
    return inner == "" or inner == ","


def _check_autolinking(example_real: str, harmony_dir: str, errors: list[str], warnings: list[str]) -> None:
    """声明了插件 HAR 时，检查 autolinking.cmake 和 RNOHPackagesFactory.h。"""
    if not _entry_has_plugin_har(harmony_dir):
        return  # 没有业务插件依赖（如纯 js-only），跳过

    # RNOHPackagesFactory.ets 由 hvigor autolink 在 compile 时自动生成，doctor 不检查

    cmake_path = os.path.join(harmony_dir, "entry", "src", "main", "cpp", "autolinking.cmake")
    cmake_body = _read(cmake_path)
    if cmake_body is not None:
        m = re.search(r"set\(\s*AUTOLINKED_LIBRARIES\s*(.*?)\)", cmake_body, re.DOTALL)
        if m and m.group(1).strip() == "":
            warnings.append(
                f"[autolink] {_rel(cmake_path, example_real)} 的 AUTOLINKED_LIBRARIES 为空"
                f"（纯 ArkTS 组件插件可正常为空；若插件有 C++ TurboModule/Fabric 则说明 C++ 未链接）。"
            )


def _check_bin_symlinks(example_real: str, harmony_dir: str, errors: list[str], warnings: list[str]) -> None:
    """node_modules/.bin/react-native 应为符号链接，否则相对 require 解析失败（Cannot find module）。"""
    bin_rn = os.path.join(example_real, "node_modules", ".bin", "react-native")
    if os.path.exists(bin_rn) and not os.path.islink(bin_rn):
        warnings.append(
            "[node_modules] node_modules/.bin/react-native 不是符号链接（被复制成了普通文件），"
            "可能导致 `Cannot find module './tools/...'`。修复：`rm -rf node_modules && npm install`。"
        )


_CHECKS = (
    _check_file_deps,
    _check_autolinking,
    _check_bin_symlinks,
)


def run_doctor(example_real: str, harmony_dir: str) -> tuple[list[str], list[str]]:
    """返回 (errors, warnings)。errors 非空表示门禁失败。"""
    errors: list[str] = []
    warnings: list[str] = []
    for check in _CHECKS:
        try:
            check(example_real, harmony_dir, errors, warnings)
        except Exception as exc:  # 单个检查异常不应阻断整体
            warnings.append(f"[doctor] 检查 {check.__name__} 异常（已跳过）：{exc}")
    return errors, warnings


def report(errors: list[str], warnings: list[str], *, raise_on_error: bool = True) -> bool:
    """打印结果。raise_on_error 时若有 error 抛 SystemExit。返回是否通过。"""
    print("\n=== build hap: doctor 自检 ===")
    for w in warnings:
        print(f"  [WARN] {w}")
    if errors:
        print(f"\n  doctor 发现 {len(errors)} 个阻断性问题：")
        for e in errors:
            print(f"  [ERROR] {e}")
        if raise_on_error:
            raise SystemExit("doctor 自检未通过，已在编译/装包前中止。请修复以上 [ERROR] 后重试。")
        return False
    print(f"  doctor 通过（{len(warnings)} 个警告）。")
    return True
