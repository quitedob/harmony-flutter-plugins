"""创建 / 增量补充 example entry 的 ohosTest 脚手架（Hypium onDeviceTest）。

与 create example / create harmony 平行：只处理
  ohos/example/harmony/entry/src/ohosTest/
及 entry 侧 hypium 依赖、build-profile ohosTest target。
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from typing import Callable

_SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_ROOT not in sys.path:
    sys.path.insert(0, _SKILL_ROOT)

from lib import paths
from lib.incremental_copy import copy_tree_incremental

_HYPium_VERSION = "1.0.25"
_ADAPTATION_DIR = ".rn-ohos-adaptation"
_REL_OHOSTEST = os.path.join(
    "example", "harmony", "entry", "src", "ohosTest"
)
_REL_ENTRY = os.path.join("example", "harmony", "entry")
_REL_MODULE_TEST = os.path.join(
    _REL_OHOSTEST, "ets", "test", "ui", "ModuleTest.test.ets"
)


def _read_json5_field(text: str, field: str) -> str | None:
    m = re.search(rf'"{re.escape(field)}"\s*:\s*"([^"]+)"', text)
    return m.group(1) if m else None


def _read_entry_ability_name(text: str) -> str | None:
    m = re.search(r'"mainElement"\s*:\s*"([^"]+)"', text)
    if m:
        return m.group(1)
    m = re.search(
        r'"abilities"\s*:\s*\[\s*\{\s*"name"\s*:\s*"([^"]+)"',
        text,
    )
    return m.group(1) if m else None


def _method_slug(method: str) -> str:
    """TurboModule method → findMethodButton slug (kebab-case)."""
    if not method:
        return method
    out: list[str] = []
    for i, ch in enumerate(method):
        if ch.isupper() and i > 0:
            out.append("-")
        out.append(ch.lower())
    return "".join(out)


def _load_implemented_methods(plugin_root: str) -> list[str]:
    coding_path = os.path.join(
        plugin_root, _ADAPTATION_DIR, "03-coding-library.json"
    )
    if not os.path.isfile(coding_path):
        return []
    try:
        with open(coding_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except (json.JSONDecodeError, OSError):
        return []
    names: list[str] = []
    for item in data.get("implemented_methods") or []:
        if not isinstance(item, dict):
            continue
        method = item.get("method")
        if isinstance(method, str) and method.strip():
            names.append(method.strip())
    return names


def _ensure_build_profile_ohostest(
    build_profile_path: str,
    dry_run: bool,
    log: Callable[[str], None],
) -> bool:
    if not os.path.isfile(build_profile_path):
        log(f"  [warn] 未找到 build-profile.json5: {build_profile_path}")
        return False
    text = open(build_profile_path, "r", encoding="utf-8").read()
    if re.search(r'"name"\s*:\s*"ohosTest"', text):
        return False
    if dry_run:
        log("  [dry-run] would add ohosTest target to entry/build-profile.json5")
        return True
    if '"targets"' not in text:
        log("  [warn] build-profile.json5 无 targets 数组，请手动添加 ohosTest target")
        return False
    insertion = '\n    {\n      "name": "ohosTest",\n    }'
    new_text, n = re.subn(
        r'(\s*"targets"\s*:\s*\[\s*\{\s*"name"\s*:\s*"default"\s*\})',
        r'\1,' + insertion,
        text,
        count=1,
    )
    if n == 0:
        log("  [warn] 未能自动插入 ohosTest target，请对照模板手动添加")
        return False
    with open(build_profile_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_text)
    log("  已补充 entry/build-profile.json5 的 ohosTest target")
    return True


def _ensure_hypium_dev_dep(
    oh_package_path: str,
    dry_run: bool,
    log: Callable[[str], None],
) -> bool:
    if not os.path.isfile(oh_package_path):
        log(f"  [warn] 未找到 entry/oh-package.json5: {oh_package_path}")
        return False
    text = open(oh_package_path, "r", encoding="utf-8").read()
    if "@ohos/hypium" in text:
        return False
    if dry_run:
        log("  [dry-run] would add @ohos/hypium to entry/oh-package.json5")
        return True
    if '"devDependencies"' in text:
        new_text, n = re.subn(
            r'"devDependencies"\s*:\s*\{',
            f'"devDependencies": {{\n    "@ohos/hypium": "{_HYPium_VERSION}",',
            text,
            count=1,
        )
        if n == 0:
            log("  [warn] 无法解析 devDependencies，请手动添加 @ohos/hypium")
            return False
    else:
        new_text = text.rstrip()
        if not new_text.endswith("}"):
            log("  [warn] oh-package.json5 格式异常，请手动添加 hypium")
            return False
        new_text = new_text[:-1] + (
            f',\n  "devDependencies": {{\n    "@ohos/hypium": "{_HYPium_VERSION}"\n  }}\n}}'
        )
    with open(oh_package_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_text)
    log(f"  已补充 entry/oh-package.json5 devDependencies @ohos/hypium {_HYPium_VERSION}")
    return True


def _sync_module_test_constants(
    module_test_path: str,
    bundle_name: str | None,
    ability_name: str | None,
    dry_run: bool,
    log: Callable[[str], None],
) -> bool:
    if not os.path.isfile(module_test_path):
        return False
    text = open(module_test_path, "r", encoding="utf-8").read()
    changed = False
    new_text = text
    if bundle_name:
        repl, n = re.subn(
            r"const BUNDLE_NAME = '[^']*';",
            f"const BUNDLE_NAME = '{bundle_name}';",
            new_text,
            count=1,
        )
        if n:
            new_text = repl
            changed = True
    if ability_name:
        repl, n = re.subn(
            r"const ENTRY_ABILITY = '[^']*';",
            f"const ENTRY_ABILITY = '{ability_name}';",
            new_text,
            count=1,
        )
        if n:
            new_text = repl
            changed = True
    if not changed:
        return False
    if dry_run:
        log("  [dry-run] would sync BUNDLE_NAME / ENTRY_ABILITY in ModuleTest.test.ets")
        return True
    with open(module_test_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_text)
    log("  已同步 ModuleTest.test.ets 的 BUNDLE_NAME / ENTRY_ABILITY")
    return True


def _it_block_exists(text: str, method: str) -> bool:
    slug = _method_slug(method)
    for name in (method, slug):
        if re.search(rf"\bit\s*\(\s*['\"]{re.escape(name)}['\"]", text):
            return True
    return False


def _append_method_it_stubs(
    module_test_path: str,
    methods: list[str],
    dry_run: bool,
    log: Callable[[str], None],
) -> int:
    if not methods or not os.path.isfile(module_test_path):
        return 0
    text = open(module_test_path, "r", encoding="utf-8").read()
    missing = [m for m in methods if not _it_block_exists(text, m)]
    if not missing:
        return 0
    blocks: list[str] = []
    for method in missing:
        slug = _method_slug(method)
        label = method
        blocks.append(
            f"""
    it('{slug}', 0, async () => {{
      const driver = appDriver!;
      const button = await findMethodButton(driver, '{slug}', '{label}');
      await button.click();
      expect((await waitForText(driver, 'Error:', 1500)) === null).assertTrue();
      let hasResult = (await waitForText(driver, 'Result:', RESULT_TIMEOUT_MS)) !== null
        || (await waitForId(driver, 'result-{slug}', 1500)) !== null;
      expect(hasResult).assertTrue();
    }});"""
        )
    insert_at = text.rfind("  });")
    if insert_at < 0:
        log("  [warn] ModuleTest.test.ets 结构异常，无法追加 it() 桩")
        return 0
    new_text = text[:insert_at] + "".join(blocks) + "\n" + text[insert_at:]
    if dry_run:
        log(f"  [dry-run] would append {len(missing)} it() stub(s) to ModuleTest.test.ets")
        return len(missing)
    with open(module_test_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_text)
    log(f"  已追加 {len(missing)} 个 it() 桩用例: {', '.join(missing)}")
    return len(missing)


def _run_ohpm_install(harmony_dir: str, log: Callable[[str], None]) -> None:
    ohpm_cmd = [
        "ohpm",
        "install",
        "--all",
        "--registry",
        "https://ohpm.openharmony.cn/ohpm/",
        "--strict_ssl",
        "true",
    ]
    log(f"  $ (cwd={harmony_dir}) {' '.join(ohpm_cmd)}")
    subprocess.run(ohpm_cmd, cwd=harmony_dir, check=True)


def create_ohos_test(
    plugin_root: str,
    *,
    dry_run: bool = False,
    skip_ohpm: bool = False,
    log: Callable[[str], None] = print,
) -> None:
    """增量补充 ohosTest 脚手架 + hypium + 可选 it() 桩。"""
    plugin_root = os.path.abspath(plugin_root)
    ohos_dir = paths.plugin_ohos_dir(plugin_root)
    if os.path.lexists(ohos_dir):
        ohos_dir = os.path.realpath(ohos_dir)

    entry_dir = os.path.join(ohos_dir, _REL_ENTRY)
    if not os.path.isdir(entry_dir):
        raise SystemExit(
            "ohos/example/harmony/entry 不存在，请先运行 "
            "'rn.py create example'（或确保 example 已生成）"
        )

    src_ohostest = os.path.join(
        paths.templates_example_dir(),
        "harmony",
        "entry",
        "src",
        "ohosTest",
    )
    dst_ohostest = os.path.join(ohos_dir, _REL_OHOSTEST)
    if not os.path.isdir(src_ohostest):
        raise SystemExit(f"模板缺失: {src_ohostest}")

    log("=== create ohos-test ===")
    log(f"  plugin_root: {plugin_root}")
    log(f"  dst: {dst_ohostest}")

    n = copy_tree_incremental(src_ohostest, dst_ohostest, dry_run=dry_run, log=log)
    if n:
        log(f"  补充 ohosTest 文件共 {n} 项")
    else:
        log("  ohosTest 目录已完整，跳过文件拷贝")

    build_profile = os.path.join(entry_dir, "build-profile.json5")
    oh_package = os.path.join(entry_dir, "oh-package.json5")
    _ensure_build_profile_ohostest(build_profile, dry_run, log)
    hypium_added = _ensure_hypium_dev_dep(oh_package, dry_run, log)

    app_json5 = os.path.join(ohos_dir, "example", "harmony", "AppScope", "app.json5")
    entry_module = os.path.join(entry_dir, "src", "main", "module.json5")
    bundle_name = None
    ability_name = None
    if os.path.isfile(app_json5):
        bundle_name = _read_json5_field(
            open(app_json5, encoding="utf-8").read(), "bundleName"
        )
    if os.path.isfile(entry_module):
        ability_name = _read_entry_ability_name(
            open(entry_module, encoding="utf-8").read()
        )

    module_test = os.path.join(ohos_dir, _REL_MODULE_TEST)
    _sync_module_test_constants(module_test, bundle_name, ability_name, dry_run, log)

    methods = _load_implemented_methods(plugin_root)
    if methods:
        n_stubs = _append_method_it_stubs(module_test, methods, dry_run, log)
        if n_stubs == 0:
            log(
                f"  implemented_methods 共 {len(methods)} 个，"
                "ModuleTest 已有对应 it()，跳过桩用例追加"
            )
    else:
        log("  [info] 未找到 03-coding-library.json implemented_methods，跳过 it() 桩")

    harmony_dir = os.path.join(ohos_dir, "example", "harmony")
    if skip_ohpm:
        log("  [skip] --skip-ohpm，未执行 ohpm install")
    elif dry_run:
        log(f"  [dry-run] would run ohpm install in {harmony_dir}")
    elif hypium_added or not os.path.isdir(os.path.join(harmony_dir, "oh_modules")):
        try:
            _run_ohpm_install(harmony_dir, log)
        except (subprocess.CalledProcessError, FileNotFoundError) as e:
            log(f"  [warn] ohpm install 失败: {e}")
    else:
        log("  hypium 已存在且 oh_modules 已有，跳过 ohpm install")

    log("\nDone: ohos-test scaffold ready.")
