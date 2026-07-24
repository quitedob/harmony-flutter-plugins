#!/usr/bin/env python3
# Vendored from tool-example/generate-example.py — keep steps 1–10 in sync when upstream changes.
# This copy uses ./ohos/ layout and templates/example inside tool-ohos-plugin-repo.
import os
import sys
import json
import shutil
import re
import argparse
import subprocess

from lib.build_hap import _run, _resolve_cmd, enriched_env

_LIGHT: bool = False

def set_light(light: bool) -> None:
    """设置 light 模式"""
    global _LIGHT
    _LIGHT = light


def _configure_stdio_utf8() -> None:
    """在 Windows 控制台避免中文 print 乱码（UTF-8 输出 + 控制台代码页 65001）。"""
    if not sys.platform.startswith('win'):
        return
    try:
        import ctypes
        ctypes.windll.kernel32.SetConsoleOutputCP(65001)
        ctypes.windll.kernel32.SetConsoleCP(65001)
    except Exception:
        pass
    for name in ('stdout', 'stderr'):
        stream = getattr(sys, name, None)
        if stream is None or not hasattr(stream, 'reconfigure'):
            continue
        try:
            stream.reconfigure(encoding='utf-8', errors='replace')
        except (AttributeError, OSError, ValueError):
            pass


def parse_args():
    parser = argparse.ArgumentParser(
        description="（ohos 布局）基于内置 example 模板生成/更新 Example；逻辑与 tool-example/generate-example.py 步骤 1–10 一致。"
    )
    parser.add_argument(
        "steps",
        nargs="*",
        type=int,
        help="要执行的步骤号（1-10）。不传参数则执行全部步骤。例：`7` 仅执行第 7 步。",
    )
    return parser.parse_args()

def _package_name_to_ohos_dir(package_name: str) -> str:
    """
    将 npm 包名转换为 oh_modules 下的目录结构：
    - "@scope/name" -> "@scope/name"
    - "name" -> "name"
    """
    if package_name.startswith('@'):
        parts = package_name.split('/', 1)
        if len(parts) == 2:
            return os.path.join(parts[0], parts[1])
    return package_name

def _extract_main_from_oh_package_json5(content: str):
    """
    从 oh-package.json5（json5/ts 风格或单行 JSON）中尽量鲁棒地提取 main 字段。
    支持：
      - "main": "ts.ts"
      - main: "ts.ts"
      - 'main': 'Index.ets'
      - 单行 JSON: {"main":"ts.ts",...}
    """
    m = re.search(r'["\']?main["\']?\s*:\s*["\']([^"\']+)["\']', content)
    if not m:
        return None
    return m.group(1).strip()

def _main_value_to_import_entry(package_name: str, main_value: str) -> str:
    """将 oh-package.json5 的 main 字段转为 import 路径（与 resolve_ohos_import_entry 规则一致）。"""
    normalized = main_value.replace('\\', '/').strip()

    if normalized == 'ts.ts':
        return f"{package_name}/ts"

    base = os.path.basename(normalized).lower()
    if base in ('index.ets', 'index.ts'):
        return package_name

    no_ext = re.sub(r'\.(ets|ts)$', '', normalized, flags=re.IGNORECASE)
    if no_ext == normalized:
        return f"{package_name}/{normalized}"
    return f"{package_name}/{no_ext}"


def resolve_ohos_import_entry(target_path: str, package_name: str) -> str:
    """
    解析 OHOS 侧该包的 import 入口（用于 RNPackagesFactory.ets 的 import）。

    规则：优先读取 oh-package.json5 的 main 字段，生成最合理的 module specifier：
    - main == "ts.ts"            -> "<pkg>/ts"（常见约定）
    - main == "Index.ets"/etc    -> "<pkg>"（直接从包根导入）
    - main == "<path>.ets/.ts"   -> "<pkg>/<path_without_ext>"
    - 缺失/解析失败              -> "<pkg>/ts"（兜底）

    若 entry 尚未安装 oh_modules，则回退读取 example 内拷贝的 harmony/library/oh-package.json5，
    避免「先跑脚本后 npm install」时 import 入口与库不一致。
    """
    oh_pkg_dir = os.path.join(target_path, 'harmony', 'entry', 'oh_modules', _package_name_to_ohos_dir(package_name))
    oh_pkg_manifest = os.path.join(oh_pkg_dir, 'oh-package.json5')

    main_value = None
    if os.path.exists(oh_pkg_manifest):
        with open(oh_pkg_manifest, 'r', encoding='utf-8', errors='ignore') as f:
            main_value = _extract_main_from_oh_package_json5(f.read())

    if not main_value:
        lib_manifest = os.path.join(target_path, 'harmony', 'library', 'oh-package.json5')
        if os.path.exists(lib_manifest):
            with open(lib_manifest, 'r', encoding='utf-8', errors='ignore') as f:
                main_value = _extract_main_from_oh_package_json5(f.read())

    if not main_value:
        return f"{package_name}/ts"

    return _main_value_to_import_entry(package_name, main_value)


def resolve_ohos_fabric_component_import(package_name: str, struct_name: str) -> str:
    """
    Fabric ArkUI 组件（.ets）须在应用侧从包内路径直接引用。
    不可经 library 根 ts.ts（main）导入：ts.ts 为 TS 入口，re-export .ets 会触发
    Importing ArkTS files in JS and TS files is forbidden。
    """
    return f'{package_name}/src/main/ets/components/{struct_name}'


def read_package_info():
    """读取项目根目录的 package.json 信息"""
    package_json_path = os.path.join(os.getcwd(), 'ohos', 'package.json')
    with open(package_json_path, 'r', encoding='utf-8') as f:
        package_json = json.load(f)
    
    package_name = package_json['name']
    package_version = package_json['version']
    
    # 生成 tgz 包名（处理带作用域的包）
    tgz_package_name = package_name
    if tgz_package_name.startswith('@'):
        tgz_package_name = tgz_package_name[1:].replace('/', '-')
    tgz_file_name = f"{tgz_package_name}-{package_version}.tgz"
    
    # 生成不同格式的包名
    # 驼峰命名
    package_name_camel = package_name
    if package_name_camel.startswith('@'):
        package_name_camel = package_name_camel[1:]
    parts = re.split(r'[-_\/]', package_name_camel)
    package_name_camel = ''.join([part.capitalize() for part in parts])
    
    # 小写下划线
    package_name_lower = package_name
    if package_name_lower.startswith('@'):
        package_name_lower = package_name_lower[1:]
    package_name_lower = re.sub(r'[-_\/]', '_', package_name_lower).lower()
    
    return {
        'package_name': package_name,
        'package_version': package_version,
        'tgz_file_name': tgz_file_name,
        'package_name_camel': package_name_camel,
        'package_name_lower': package_name_lower
    }


def ensure_root_prepare_script():
    """
    在库根目录 package.json 的 scripts 中写入 prepare: bob build（若尚无 prepare）。
    与 npm pack / example 本地 tgz 依赖流程配套；若已有 prepare 则不改写。
    
    注意：如果 package.json 中没有 react-native-builder-bob 配置（纯 JS 模块），则不添加 prepare script。
    """
    package_json_path = os.path.join(os.getcwd(), 'ohos', 'package.json')
    if not os.path.exists(package_json_path):
        raise FileNotFoundError(f'未找到库根 package.json: {package_json_path}')
    with open(package_json_path, 'r', encoding='utf-8') as f:
        package_json = json.load(f)
    
    # 检查是否需要 bob 编译（有 react-native-builder-bob 配置）
    has_bob_config = 'react-native-builder-bob' in package_json
    if not has_bob_config:
        print('  [跳过] 无 bob 配置（纯 JS 模块），不添加 prepare script')
        return
    
    scripts = package_json.get('scripts')
    if not isinstance(scripts, dict):
        scripts = {}
        package_json['scripts'] = scripts
    if 'prepare' in scripts:
        existing = scripts['prepare']
        if existing == 'bob build':
            print(f'  scripts.prepare 已是 "bob build"，跳过')
        else:
            print(f'  已存在 scripts.prepare={existing!r}，未覆盖')
        return
    scripts['prepare'] = 'bob build'
    with open(package_json_path, 'w', encoding='utf-8') as f:
        json.dump(package_json, f, indent=2)
        f.write('\n')
    print('  已添加 scripts.prepare: "bob build"')

def _read_react_native_builder_bob_source_dir() -> str:
    """从库根 package.json 的 react-native-builder-bob.source 读取源码目录，默认 src。"""
    package_json_path = os.path.join(os.getcwd(), 'ohos', 'package.json')
    if not os.path.exists(package_json_path):
        return 'src'
    try:
        with open(package_json_path, 'r', encoding='utf-8') as f:
            pkg = json.load(f)
    except (OSError, json.JSONDecodeError):
        return 'src'
    bob = pkg.get('react-native-builder-bob')
    if not isinstance(bob, dict):
        return 'src'
    raw = bob.get('source')
    if isinstance(raw, str) and raw.strip():
        return raw.strip().replace('\\', '/').rstrip('/')
    return 'src'


def ensure_tsconfig_build_json_include_for_bob():
    """
    bob build 的 typescript 目标使用 tsconfig.build.json。子配置里的 exclude 会覆盖继承的 exclude，
    不会合并根 tsconfig 的 example/harmony 排除项；因此在未手写 include 时补上
    '<source>/**/*'，使 tsc 只检查库源码（与 react-native-builder-bob.source 一致）。
    若已有非空 include 则不覆盖。
    """
    build_path = os.path.join(os.getcwd(), 'ohos', 'tsconfig.build.json')
    if not os.path.exists(build_path):
        print('  未找到 tsconfig.build.json，跳过 include 补全（未使用 bob typescript 目标时可忽略）')
        return

    try:
        with open(build_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f'  读取 tsconfig.build.json 失败，跳过: {e}')
        return

    if not isinstance(data, dict):
        print('  tsconfig.build.json 不是对象结构，跳过')
        return

    inc = data.get('include')
    if isinstance(inc, list) and len(inc) > 0:
        print('  tsconfig.build.json 已有非空 include，跳过（避免覆盖手改）')
        return

    source = _read_react_native_builder_bob_source_dir()
    data['include'] = [f'{source}/**/*']

    try:
        with open(build_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
            f.write('\n')
    except OSError as e:
        print(f'  写入 tsconfig.build.json 失败: {e}')
        return

    print(
        f'  已更新 tsconfig.build.json：设置 include 为 {data["include"]!r} '
        f'（bob build 的 typescript 目标仅类型检查源码目录）'
    )


def ensure_root_tsconfig_exclude_for_pack():
    """
    为 npm pack/prepare 触发的 tsc 提供“排除目录黑名单”，避免把 example/harmony/node_modules 等目录编进类型检查导致打包失败。

    约束：
    - 根目录 tsconfig.json：只补齐/合并 exclude（已有 exclude 会保留）
    - tsconfig.build.json：若存在且尚无 include，则写入 <bob.source>/**/*（见 ensure_tsconfig_build_json_include_for_bob）
    - 激进排除所有点开头目录：**/.*/**
    """
    tsconfig_path = os.path.join(os.getcwd(), 'ohos', 'tsconfig.json')
    if os.path.exists(tsconfig_path):
        try:
            with open(tsconfig_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except Exception as e:
            print(f'  读取 tsconfig.json 失败，跳过 exclude 补全: {e}')
        else:
            if not isinstance(data, dict):
                print('  tsconfig.json 不是对象结构，跳过 exclude 补全')
            else:
                existing = data.get('exclude')
                exclude = existing if isinstance(existing, list) else []
                exclude_set = {x for x in exclude if isinstance(x, str)}

                to_add = [
                    'node_modules/**',
                    'oh_modules/**',
                    'example*/**',
                    'example/**',
                    'harmony*/**',
                    'android/**',
                    'ios/**',
                    'windows/**',
                    'macos/**',
                    'linux/**',
                    'dist/**',
                    'build/**',
                    'out/**',
                    'lib/**',
                    '**/.*/**',
                    '__tests__/**',
                    '**/*.test.*',
                    '**/*.spec.*',
                ]

                changed = False
                for p in to_add:
                    if p not in exclude_set:
                        exclude.append(p)
                        exclude_set.add(p)
                        changed = True

                if not changed and isinstance(existing, list):
                    print('  tsconfig.json exclude 已包含打包排除项，跳过写入')
                else:
                    data['exclude'] = exclude
                    with open(tsconfig_path, 'w', encoding='utf-8') as f:
                        json.dump(data, f, indent=2)
                        f.write('\n')
                    print('  已更新 tsconfig.json：补齐 exclude（用于 npm pack/prepare 的 tsc）')
    else:
        print(f'  未找到 tsconfig.json，跳过 exclude 补全: {tsconfig_path}')

    ensure_tsconfig_build_json_include_for_bob()

def read_ohos_library_package_name(short_name="library"):
    """
    读取本仓库 harmony/{short_name}/oh-package.json5 中的 name 字段（OHOS 包名）。
    注意：OHOS 包名不一定等于 npm 的 package.json.name。
    js-only 模块无 harmony/{short_name} 目录，返回 None。
    """
    oh_pkg_path = os.path.join(os.getcwd(), 'ohos', 'harmony', short_name, 'oh-package.json5')
    if not os.path.exists(oh_pkg_path):
        return None  # js-only 模块无原生库
    with open(oh_pkg_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    m = re.search(r'^\s*(?:"name"|name)\s*:\s*[\'"]([^\'"]+)[\'"]\s*,?\s*$', content, flags=re.MULTILINE)
    if not m:
        raise ValueError(f'无法从 oh-package.json5 提取 name 字段: {oh_pkg_path}')
    return m.group(1).strip()

def _absolute_har_file_uri(example_root: str, *parts_under_node_modules: str) -> str:
    """node_modules 下某 HAR 的绝对路径，转为 file: URI（Windows 用正斜杠，便于 ohpm）。"""
    har_abs = os.path.abspath(os.path.join(example_root, 'node_modules', *parts_under_node_modules))
    p = har_abs.replace('\\', '/')
    return f'file:{p}'


def _relative_repo_tgz_file_ref(tgz_file_name: str) -> str:
    """库根目录 npm pack 产物的相对 file: 路径（example 在 ohos/ 下，tgz 在 ohos/ 根）。"""
    return f'file:../{tgz_file_name}'


def _relative_ohos_package_file_ref() -> str:
    """Example 直接依赖上级 ohos/ 包（与 ohos/src 同步，避免陈旧 tgz 导致 Spec import 错误）。"""
    return "file:.."

def rewrite_harmony_oh_package_har_paths(example_root: str) -> None:
    """
    拷贝模板后，将 harmony 内两处指向 npm 包内 HAR 的相对 file: 路径改为绝对路径
    （entry/oh-package.json5 的 dependencies、harmony/oh-package.json5 的 overrides）。
    使用 example 根目录的绝对路径（Windows 短路径场景下为真实目录）。
    """
    root = os.path.abspath(example_root)
    rnoh_uri = _absolute_har_file_uri(
        root,
        '@react-native-oh',
        'react-native-harmony',
        'react_native_openharmony_release.har',
    )

    entry_path = os.path.join(example_root, 'harmony', 'entry', 'oh-package.json5')
    if os.path.isfile(entry_path):
        with open(entry_path, 'r', encoding='utf-8') as f:
            entry_content = f.read()
        entry_content = entry_content.replace(
            '"@rnoh/react-native-openharmony": "file:../../node_modules/@react-native-oh/react-native-harmony/react_native_openharmony_release.har"',
            f'"@rnoh/react-native-openharmony": {json.dumps(rnoh_uri)}',
        )
        with open(entry_path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(entry_content)

    harmony_oh_path = os.path.join(example_root, 'harmony', 'oh-package.json5')
    if os.path.isfile(harmony_oh_path):
        with open(harmony_oh_path, 'r', encoding='utf-8') as f:
            harmony_oh_content = f.read()
        harmony_oh_content = harmony_oh_content.replace(
            '"@rnoh/react-native-openharmony": "file:../node_modules/@react-native-oh/react-native-harmony/react_native_openharmony_release.har"',
            f'"@rnoh/react-native-openharmony": {json.dumps(rnoh_uri)}',
        )
        with open(harmony_oh_path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(harmony_oh_content)

def _windows_is_reparse_point(path: str) -> bool:
    """判断路径是否为重解析点（目录联接 junction 等），避免对其实施 shutil.rmtree 误删目标。"""
    try:
        import ctypes
        INVALID = 0xFFFFFFFF
        FILE_ATTRIBUTE_REPARSE_POINT = 0x400
        attrs = ctypes.windll.kernel32.GetFileAttributesW(os.path.abspath(path))
        return attrs != INVALID and (attrs & FILE_ATTRIBUTE_REPARSE_POINT) != 0
    except Exception:
        return False

def _remove_project_example_slot(link_path: str) -> None:
    """
    删除项目根下的 example：符号链接 / junction 用 unlink 或 rmdir；
    普通目录才 rmtree。
    """
    if not os.path.lexists(link_path):
        return
    if os.path.islink(link_path):
        os.unlink(link_path)
        return
    if sys.platform == 'win32' and _windows_is_reparse_point(link_path) and os.path.isdir(link_path):
        os.rmdir(link_path)
        return
    if os.path.isdir(link_path):
        shutil.rmtree(link_path)
        return
    os.unlink(link_path)

def _is_reparse_point(path: str) -> bool:
    """判断路径是否为重解析点（junction/symlink）。"""
    if not os.path.isdir(path):
        return False
    if sys.platform != "win32":
        return os.path.islink(path)
    try:
        import ctypes
        attr = ctypes.windll.kernel32.GetFileAttributesW(path)
        return attr != -1 and (attr & 0x400) != 0
    except Exception:
        return False


def _next_rn_sequence_dir(rn_root: str) -> str:
    """在 rn_root 下创建下一个数字子目录名（1,2,3…，取已有纯数字目录最大值 +1）。"""
    os.makedirs(rn_root, exist_ok=True)
    max_n = 0
    for name in os.listdir(rn_root):
        p = os.path.join(rn_root, name)
        if os.path.isdir(p) and name.isdigit():
            max_n = max(max_n, int(name))
    seq = str(max_n + 1)
    out = os.path.join(rn_root, seq)
    os.makedirs(out, exist_ok=True)
    return out

def _create_dir_symlink_or_junction(link_path: str, target_dir: str) -> None:
    """在项目下创建指向真实 example 目录的链接：优先目录符号链接，失败则回退为 junction。"""
    target_dir = os.path.normpath(os.path.abspath(target_dir))
    link_path = os.path.normpath(os.path.abspath(link_path))
    try:
        os.symlink(target_dir, link_path, target_is_directory=True)
        print('已在项目下创建目录符号链接（symlink）指向上述实际目录。')
        return
    except OSError as e:
        print(f'目录符号链接未创建（{e}），改试目录联接（junction，同盘可用、无需开发者模式）…')
    # mklink /J Link Target
    r = subprocess.run(
        ['cmd', '/c', 'mklink', '/J', link_path, target_dir],
        capture_output=True,
        text=True,
        encoding='utf-8',
        errors='replace',
    )
    if r.returncode != 0:
        raise OSError(
            f'创建 junction 失败: {r.stdout or ""} {r.stderr or ""}'.strip() or r.returncode
        )
    print('已在项目下创建目录联接（junction）指向上述实际目录（与 symlink 类似，资源管理器可跟随）。')

def copy_template_project():
    """拷贝模板工程。

    如果 ohos 目录已是 junction（整个 ohos 都在短路径），则直接拷贝到 ohos/example。
    否则，Windows 下单独处理 example 的短路径 + junction。
    """
    cwd = os.getcwd()
    _skill_lib = os.path.dirname(os.path.abspath(__file__))
    _skill_root = os.path.dirname(_skill_lib)
    template_path = os.path.join(_skill_root, 'templates', 'example')
    link_path = os.path.join(cwd, 'ohos', 'example')
    ohos_path = os.path.join(cwd, 'ohos')

    ohos_is_junction = (
        sys.platform == 'win32'
        and os.path.isdir(ohos_path)
        and _is_reparse_point(ohos_path)
    )

    if ohos_is_junction:
        if os.path.isdir(link_path):
            shutil.rmtree(link_path)
        ignore = shutil.ignore_patterns("node_modules", "oh_modules", "build", ".hvigor") if _LIGHT else None
        shutil.copytree(template_path, link_path, ignore=ignore)
        print(f'ohos 已是 junction，直接拷贝 example 到: {link_path}')
        return link_path

    use_windows_staging = (
        sys.platform == 'win32'
        and len(os.path.splitdrive(os.path.abspath(cwd))[0]) == 2
        and os.path.splitdrive(os.path.abspath(cwd))[0][1] == ':'
    )

    if use_windows_staging:
        drive = os.path.splitdrive(os.path.abspath(cwd))[0]
        rn_root = os.path.join(drive + '\\', 'rn')
        seq_dir = _next_rn_sequence_dir(rn_root)
        real_example = os.path.join(seq_dir, 'example')
        if os.path.exists(real_example):
            shutil.rmtree(real_example)
        ignore = shutil.ignore_patterns("node_modules", "oh_modules", "build", ".hvigor") if _LIGHT else None
        shutil.copytree(template_path, real_example, ignore=ignore)
        _remove_project_example_slot(link_path)
        print(f'模板已拷贝至（短路径，便于 ohpm/hvigor）: {real_example}')
        _create_dir_symlink_or_junction(link_path, real_example)
        return link_path

    _remove_project_example_slot(link_path)
    ignore = shutil.ignore_patterns("node_modules", "oh_modules", "build", ".hvigor") if _LIGHT else None
    shutil.copytree(template_path, link_path, ignore=ignore)
    return link_path

def update_example_package_json(target_path, package_name, tgz_file_name):
    """更新 example/package.json，添加本地依赖和 RN 插件依赖（仅从 ohos/package.json dependencies 读取）"""
    example_package_json_path = os.path.join(target_path, 'package.json')
    with open(example_package_json_path, 'r', encoding='utf-8') as f:
        example_package_json = json.load(f)
    
    ohos_package_json_path = os.path.join(os.getcwd(), 'ohos', 'package.json')
    ohos_deps = {}
    harmony_alias = None
    if os.path.exists(ohos_package_json_path):
        with open(ohos_package_json_path, 'r', encoding='utf-8') as f:
            ohos_pkg = json.load(f)
        deps = ohos_pkg.get('dependencies') or {}
        for dep_name, dep_version in deps.items():
            from lib.ohos_npm_config import is_ohos_scoped_package_name

            if is_ohos_scoped_package_name(dep_name) or dep_name.startswith('react-native-'):
                ohos_deps[dep_name] = dep_version
        harmony_info = ohos_pkg.get('harmony', {})
        if isinstance(harmony_info, dict):
            harmony_alias = harmony_info.get('alias')
    
    if 'dependencies' not in example_package_json:
        example_package_json['dependencies'] = {}
    example_package_json['dependencies'][package_name] = _relative_repo_tgz_file_ref(tgz_file_name)
    for dep_name, dep_version in ohos_deps.items():
        if dep_name not in example_package_json['dependencies']:
            example_package_json['dependencies'][dep_name] = dep_version
    
    with open(example_package_json_path, 'w', encoding='utf-8') as f:
        json.dump(example_package_json, f, indent=2)
        f.write('\n')
    
    if ohos_deps:
        print(f'  已添加 {len(ohos_deps)} 个 RN 插件依赖: {", ".join(ohos_deps.keys())}')
    
    if harmony_alias:
        update_example_tsconfig_paths(target_path, harmony_alias, package_name)


_REANIMATED_PLUGIN = 'react-native-reanimated/plugin'
# reanimated 在不同 scope 下的包名变体（原名 / TPC / OHOS）
_REANIMATED_PKG_NAMES = (
    'react-native-reanimated',
    '@react-native-oh-tpl/react-native-reanimated',
    '@react-native-ohos/react-native-reanimated',
)


def _library_uses_reanimated() -> bool:
    """判断被适配库是否（直接或间接）使用 react-native-reanimated。

    依据三类信号（命中任一即为 true）：
      1) ohos/package.json 的 dependencies/peerDependencies 含 reanimated（任意 scope 变体）；
      2) ohos/example/package.json 的 dependencies 含 reanimated；
      3) 库的鸿蒙运行时源码（ohos/src、ohos/harmony、*.harmony.*）含 'worklet' 指令
         或 import 'react-native-reanimated'。

    缺少该判断会导致：worklet 未经 babel 插件转换 -> 运行时
    `Cannot read property 'code' of undefined` -> 白屏（collapsible-tab-view 案）。
    """
    cwd = os.getcwd()

    def _pkg_has_reanimated(pkg_path: str) -> bool:
        if not os.path.isfile(pkg_path):
            return False
        try:
            with open(pkg_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except (ValueError, OSError):
            return False
        for field in ('dependencies', 'peerDependencies', 'devDependencies'):
            deps = data.get(field) or {}
            if any(name in deps for name in _REANIMATED_PKG_NAMES):
                return True
        return False

    if _pkg_has_reanimated(os.path.join(cwd, 'ohos', 'package.json')):
        return True
    if _pkg_has_reanimated(os.path.join(cwd, 'ohos', 'example', 'package.json')):
        return True

    # 源码扫描：worklet 指令或 reanimated import
    worklet_re = re.compile(r"""['"]worklet['"]""")
    import_re = re.compile(r"""(?:from|require\()\s*['"](react-native-reanimated|@react-native-o[ht]\w*/react-native-reanimated)['"]""")
    exts = ('.js', '.jsx', '.ts', '.tsx')
    scan_roots = [os.path.join(cwd, 'ohos', 'src'), os.path.join(cwd, 'ohos', 'harmony')]
    for root in scan_roots:
        if not os.path.isdir(root):
            continue
        for dirpath, dirnames, filenames in os.walk(root):
            dirnames[:] = [d for d in dirnames if d not in ('node_modules', 'oh_modules', 'build', 'dist', '.git')]
            for fn in filenames:
                if not fn.endswith(exts):
                    continue
                if '.android.' in fn or '.ios.' in fn:
                    continue
                fp = os.path.join(dirpath, fn)
                try:
                    with open(fp, 'r', encoding='utf-8', errors='ignore') as f:
                        code = f.read()
                except OSError:
                    continue
                if worklet_re.search(code) or import_re.search(code):
                    return True
    return False


def ensure_example_babel_reanimated(target_path: str) -> None:
    """库使用 reanimated 时，确保 example/babel.config.js 注册 reanimated 插件（必须位于 plugins 末尾）。

    幂等：已注册则跳过；每次生成 example 都会重跑（模板 babel.config.js 会被覆盖回无插件态）。
    """
    if not _library_uses_reanimated():
        return

    babel_path = os.path.join(target_path, 'babel.config.js')
    if not os.path.isfile(babel_path):
        return
    try:
        with open(babel_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except OSError:
        return

    if _REANIMATED_PLUGIN in content:
        return  # 已注册

    new_content = None
    # 情况 A：已有 plugins 数组 -> 在末尾追加（保证 reanimated 为最后一个）
    m = re.search(r"plugins\s*:\s*\[", content)
    if m:
        close = content.find(']', m.end())
        if close != -1:
            inner = content[m.end():close]
            sep = '' if inner.strip() in ('', ',') else ', '
            new_content = content[:close] + f"{sep}'{_REANIMATED_PLUGIN}'" + content[close:]
    # 情况 B：无 plugins 字段 -> 在 module.exports = { 后插入 plugins
    if new_content is None:
        m2 = re.search(r"module\.exports\s*=\s*\{", content)
        if m2:
            new_content = (
                content[:m2.end()]
                + f"\n  plugins: ['{_REANIMATED_PLUGIN}'],"
                + content[m2.end():]
            )

    if new_content is None:
        print('  [warn] 检测到 reanimated 但无法自动注入 babel 插件，请手动在 example/babel.config.js 的 plugins 末尾添加 '
              f"'{_REANIMATED_PLUGIN}'")
        return

    with open(babel_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"  已为 example/babel.config.js 注入 reanimated 插件（{_REANIMATED_PLUGIN}，worklet 转换必需）")


def update_example_tsconfig_paths(target_path: str, alias: str, package_name: str) -> None:
    """更新 example/tsconfig.json 的 paths，将 alias 映射到真实包名"""
    tsconfig_path = os.path.join(target_path, 'tsconfig.json')
    if not os.path.exists(tsconfig_path):
        print('  未找到 tsconfig.json，跳过 paths 配置')
        return
    
    with open(tsconfig_path, 'r', encoding='utf-8') as f:
        tsconfig = json.load(f)
    
    if not isinstance(tsconfig, dict):
        print('  tsconfig.json 结构异常，跳过 paths 配置')
        return
    
    compiler_options = tsconfig.get('compilerOptions', {})
    if not isinstance(compiler_options, dict):
        compiler_options = {}
        tsconfig['compilerOptions'] = compiler_options
    
    compiler_options['baseUrl'] = '.'
    compiler_options['paths'] = {
        alias: [f"./node_modules/{package_name}"]
    }
    
    with open(tsconfig_path, 'w', encoding='utf-8') as f:
        json.dump(tsconfig, f, indent=2)
        f.write('\n')
    
    print(f'  已配置 tsconfig.json paths: {alias} -> ./node_modules/{package_name}')

def copy_library_directory(target_path, short_name="library"):
    """拷贝 library 目录到目标位置"""
    source_library_path = os.path.join(os.getcwd(), 'ohos', 'harmony', short_name)
    target_library_path = os.path.join(target_path, 'harmony', short_name)
    
    # 如果目标目录已存在，先删除
    if os.path.exists(target_library_path):
        shutil.rmtree(target_library_path)
    # 拷贝 library 目录，忽略编译产物
    ignore_patterns = ('oh_modules', 'build', '.cxx', '.hvigor') if _LIGHT else ('oh_modules',)
    shutil.copytree(source_library_path, target_library_path, ignore=shutil.ignore_patterns(*ignore_patterns))


def ensure_cpp_dummy_if_no_sources(target_path, short_name="library"):
    """
    对于纯 ETS Fabric Component（cpp 目录下无 .cpp 源文件），自动创建 dummy.cpp。
    CMake 的 add_library 需要 SOURCES，无源文件时会导致构建失败。
    """
    cpp_dir = os.path.join(target_path, 'harmony', short_name, 'src', 'main', 'cpp')
    if not os.path.isdir(cpp_dir):
        return
    
    cpp_files = [f for f in os.listdir(cpp_dir) if f.endswith('.cpp')]
    generated_dir = os.path.join(cpp_dir, 'generated')
    generated_cpp_files = []
    if os.path.isdir(generated_dir):
        for root, dirs, files in os.walk(generated_dir):
            generated_cpp_files.extend([f for f in files if f.endswith('.cpp')])
    
    total_cpp_files = len(cpp_files) + len(generated_cpp_files)
    if total_cpp_files == 0:
        dummy_path = os.path.join(cpp_dir, 'dummy.cpp')
        with open(dummy_path, 'w', encoding='utf-8') as f:
            f.write('// Dummy source file for header-only library (pure ETS Fabric Component)\n')
        print(f'  已创建 dummy.cpp（纯 ETS Fabric Component 无 C++ 源文件）: {dummy_path}')

def update_build_profile(target_path, short_name="library"):
    """更新 build-profile.json5，添加 library 模块"""
    build_profile_path = os.path.join(target_path, 'harmony', 'build-profile.json5')
    with open(build_profile_path, 'r', encoding='utf-8') as f:
        build_profile_content = f.read()
    
    # 查找 modules 数组并添加 library 模块（使用 short_name）
    if '"modules": [' in build_profile_content:
        module_entry = '''"modules": [
    {
      "name": "{}",
      "srcPath": "./{}",
      "targets": [
        {
          "name": "default",
          "applyToProducts": [
            "default"
          ]
        }
      ]
    },'''.format(short_name, short_name)
        build_profile_content = build_profile_content.replace('"modules": [', module_entry)
    
    with open(build_profile_path, 'w', encoding='utf-8') as f:
        f.write(build_profile_content)

def _is_harmony_adapted_package(pkg_json: dict, node_modules_dir: str) -> bool:
    """
    判断是否是鸿蒙适配的 RN 包。
    优先检查 package.json 的 harmony 字段，其次检查 harmony 目录是否存在。
    """
    if 'harmony' in pkg_json:
        return True
    harmony_dir = os.path.join(node_modules_dir, 'harmony')
    return os.path.isdir(harmony_dir)


def _is_autolink_supported(pkg_json: dict) -> bool:
    """
    判断是否支持 autolink。
    检查 package.json 的 harmony.autolinking 字段是否存在。
    """
    harmony = pkg_json.get('harmony', {})
    if isinstance(harmony, dict):
        return 'autolinking' in harmony
    return False


def _get_harmony_info(pkg_json: dict, node_modules_dir: str, npm_name: str) -> dict | None:
    """
    从包中提取鸿蒙适配信息。
    返回: {'ohos_name': ..., 'short_name': ..., 'har_path': ..., 'cpp_dir': ...} 或 None
    """
    harmony_dir = os.path.join(node_modules_dir, 'harmony')
    if not os.path.isdir(harmony_dir):
        return None
    
    har_files = [f for f in os.listdir(harmony_dir) if f.endswith('.har')]
    if not har_files:
        return None
    
    har_file = har_files[0]
    short_name = har_file[:-4]
    har_path = f"../../node_modules/{npm_name}/harmony/{har_file}"
    
    ohos_name = None
    oh_pkg_path = os.path.join(harmony_dir, short_name, 'oh-package.json5')
    if os.path.exists(oh_pkg_path):
        with open(oh_pkg_path, 'r', encoding='utf-8', errors='ignore') as f:
            m = re.search(r'^\s*(?:"name"|name)\s*:\s*[\'"]([^\'"]+)[\'"]\s*,?\s*$', f.read(), flags=re.MULTILINE)
            if m:
                ohos_name = m.group(1).strip()
    
    if not ohos_name:
        harmony_info = pkg_json.get('harmony') or {}
        if isinstance(harmony_info, dict):
            # 优先使用 autolinking.ohPackageName（正确的 OHOS 包名）
            autolink_info = harmony_info.get('autolinking') or {}
            if isinstance(autolink_info, dict) and autolink_info.get('ohPackageName'):
                ohos_name = autolink_info['ohPackageName']
            else:
                ohos_name = harmony_info.get('alias')
    
    if not ohos_name:
        return None
    
    cpp_dir = None
    cpp_path = os.path.join(harmony_dir, short_name, 'src', 'main', 'cpp')
    if os.path.isdir(cpp_path):
        cpp_dir = cpp_path
    
    cmake_target_name = short_name
    cmake_path = os.path.join(harmony_dir, short_name, 'src', 'main', 'cpp', 'CMakeLists.txt')
    if os.path.exists(cmake_path):
        with open(cmake_path, 'r', encoding='utf-8', errors='ignore') as f:
            cmake_content = f.read()
            m = re.search(r'add_library\s*\(\s*([^\s]+)', cmake_content)
            if m:
                cmake_target_name = m.group(1).strip()
    
    # 检查是否支持 autolink
    autolink = _is_autolink_supported(pkg_json)
    
    return {
        'npm_name': npm_name,
        'ohos_name': ohos_name,
        'short_name': short_name,
        'har_path': har_path,
        'cpp_dir': cpp_dir,
        'cmake_target_name': cmake_target_name,
        'autolink': autolink,
    }


def _collect_all_dep_plugins(target_path: str) -> list:
    """
    扫描 example/package.json 的所有依赖，收集鸿蒙适配插件。
    不区分本地插件或远程依赖，一视同仁处理。
    返回: [{'npm_name': ..., 'ohos_name': ..., 'short_name': ..., 'har_path': ..., 'cpp_dir': ...}, ...]
    """
    example_pkg_path = os.path.join(target_path, 'package.json')
    if not os.path.exists(example_pkg_path):
        return []
    
    with open(example_pkg_path, 'r', encoding='utf-8') as f:
        pkg = json.load(f)
    
    deps = pkg.get('dependencies') or {}
    plugins = []
    
    for npm_name in deps.keys():
        node_modules_dir = os.path.join(target_path, 'node_modules', npm_name)
        pkg_json_path = os.path.join(node_modules_dir, 'package.json')
        
        if not os.path.isdir(node_modules_dir):
            continue
        
        pkg_json = {}
        if os.path.exists(pkg_json_path):
            with open(pkg_json_path, 'r', encoding='utf-8', errors='ignore') as f:
                try:
                    pkg_json = json.load(f)
                except json.JSONDecodeError:
                    pass
        
        if not _is_harmony_adapted_package(pkg_json, node_modules_dir):
            continue
        
        info = _get_harmony_info(pkg_json, node_modules_dir, npm_name)
        if info:
            plugins.append(info)
    
    # 按 ohos_name 去重：同一个 OHOS 包只保留一个（优先保留鸿蒙化 scope 包名）
    seen_ohos_names = {}
    deduped_plugins = []
    for p in plugins:
        ohos_name = p.get('ohos_name')
        if ohos_name in seen_ohos_names:
            # 如果当前是 harmony 版本，替换之前的
            from lib.ohos_npm_config import is_ohos_scoped_package_name

            if is_ohos_scoped_package_name(p['npm_name']):
                seen_ohos_names[ohos_name] = p
            continue
        seen_ohos_names[ohos_name] = p
        deduped_plugins.append(p)
    
    return deduped_plugins


def _append_manual_cmake_to_entry(
    cmake_lists_content: str,
    ohos_name: str,
    binary_dir_name: str,
    cmake_target_name: str | None = None,
) -> tuple[str, bool]:
    """向 entry CMakeLists 追加手动插件注册；已存在相同 add_subdirectory 则跳过（可重复 prepare-only）。"""
    target = cmake_target_name or binary_dir_name
    cmake_add_subdirectory = (
        f'add_subdirectory("${{OH_MODULE_DIR}}/{ohos_name}/src/main/cpp" ./{binary_dir_name})'
    )
    cmake_target_compile_options = (
        f"target_compile_options({target} PUBLIC ${{folly_compile_options}})"
    )
    cmake_target_link = f"target_link_libraries(rnoh_app PUBLIC {target})"

    if cmake_add_subdirectory in cmake_lists_content:
        return cmake_lists_content, False

    if "# RNOH_BEGIN: add_plugin_subdirectories" in cmake_lists_content:
        cmake_lists_content = cmake_lists_content.replace(
            "# RNOH_BEGIN: add_plugin_subdirectories",
            f"# RNOH_BEGIN: add_plugin_subdirectories\n{cmake_add_subdirectory}\n{cmake_target_compile_options}",
        )
    elif "add_library(rnoh_app SHARED" in cmake_lists_content:
        cmake_lists_content = cmake_lists_content.replace(
            "add_library(rnoh_app SHARED",
            f"{cmake_add_subdirectory}\n{cmake_target_compile_options}\n\nadd_library(rnoh_app SHARED",
        )
    else:
        return cmake_lists_content, False

    if cmake_target_link not in cmake_lists_content:
        if "# RNOH_BEGIN: link_plugins" in cmake_lists_content:
            cmake_lists_content = cmake_lists_content.replace(
                "# RNOH_BEGIN: link_plugins",
                f"# RNOH_BEGIN: link_plugins\n{cmake_target_link}",
            )
        elif "target_link_libraries(rnoh_app PUBLIC rnoh)" in cmake_lists_content:
            cmake_lists_content = cmake_lists_content.replace(
                "target_link_libraries(rnoh_app PUBLIC rnoh)",
                f"target_link_libraries(rnoh_app PUBLIC rnoh)\n{cmake_target_link}",
            )

    return cmake_lists_content, True


def register_dep_plugins(target_path: str) -> None:
    """
    注册所有依赖的鸿蒙适配插件（用于 build hap --apply-example）。
    
    扫描 example/package.json 的依赖，区分处理：
    - autolink 插件：只添加 HAR 依赖到 oh-package.json5
    - 手动注册插件：完整注册（HAR + CMake + PackageProvider + RNPackagesFactory）
    
    支持重复运行：已注册的不会重复添加。
    """
    dep_plugins = _collect_all_dep_plugins(target_path)
    
    if not dep_plugins:
        print('  未找到需要注册的依赖插件')
        return
    
    # 分类：autolink vs 手动注册
    autolink_plugins = [p for p in dep_plugins if p.get('autolink')]
    manual_plugins = [p for p in dep_plugins if not p.get('autolink')]
    
    if autolink_plugins:
        print(f'  发现 {len(autolink_plugins)} 个支持 autolink 的插件（仅添加 HAR 依赖）:')
        for dep in autolink_plugins:
            print(f'    - {dep["npm_name"]} -> {dep["ohos_name"]} [autolink]')
    
    if manual_plugins:
        print(f'  发现 {len(manual_plugins)} 个需要手动注册的插件:')
        for dep in manual_plugins:
            print(f'    - {dep["npm_name"]} -> {dep["ohos_name"]} [manual]')
    
    # 所有插件都需要添加 HAR 依赖到 oh-package.json5（不管是 autolink 还是手动注册）
    entry_oh_package_path = os.path.join(target_path, 'harmony', 'entry', 'oh-package.json5')
    with open(entry_oh_package_path, 'r', encoding='utf-8') as f:
        entry_oh_package_content = f.read()
    
    added_har_count = 0
    for dep in dep_plugins:
        ohos_name = dep['ohos_name']
        har_path = dep['har_path']
        if f'"{ohos_name}"' in entry_oh_package_content:
            continue
        if '"dependencies": {' in entry_oh_package_content:
            entry_oh_package_content = entry_oh_package_content.replace(
                '"dependencies": {',
                f'"dependencies": {{\n    "{ohos_name}": "file:{har_path}",'
            )
            added_har_count += 1
    
    with open(entry_oh_package_path, 'w', encoding='utf-8') as f:
        f.write(entry_oh_package_content)
    
    if added_har_count > 0:
        print(f'  已添加 {added_har_count} 个 HAR 依赖到 entry/oh-package.json5')
        # 新添加的 HAR 需要先安装，才能正确读取 oh-package.json5 的 main 字段
        harmony_dir = os.path.join(target_path, 'harmony')
        ohpm_cmd = [
            "ohpm",
            "install",
            "--all",
            "--registry",
            "https://ohpm.openharmony.cn/ohpm/",
            "--strict_ssl",
            "true",
        ]
        try:
            _run(ohpm_cmd, cwd=harmony_dir, quiet=True)
            print('  已同步新添加的 HAR 依赖')
        except subprocess.CalledProcessError as e:
            print(f'  [warn] ohpm install 失败: {e.stderr or e}')
    
    # 注册 Fabric Component 到 Index.ets（不管是 autolink 还是手动注册）
    # Fabric ArkTS 组件需要在 Index.ets 中注册 arkTsComponentNames 和 buildCustomRNComponent
    print(f'  检查 Fabric 组件: 共 {len(dep_plugins)} 个依赖插件')
    for dep in dep_plugins:
        npm_name = dep['npm_name']
        ohos_name = dep['ohos_name']
        
        # 检查是否有 Fabric 组件
        structs = find_fabric_component_structs(target_path, npm_name)
        print(f'    - {npm_name}: 检测到 {len(structs)} 个 Fabric 组件 ({structs})')
        if structs:
            generate_index_fabric(target_path, npm_name, ohos_name)
    
    # 只有手动注册的插件需要继续注册（CMake + PackageProvider + RNPackagesFactory）
    if not manual_plugins:
        print('  所有插件均支持 autolink，无需手动注册代码')
        return
    
    # CMakeLists.txt - 只处理手动注册的插件
    cmake_lists_path = os.path.join(target_path, 'harmony', 'entry', 'src', 'main', 'cpp', 'CMakeLists.txt')
    with open(cmake_lists_path, 'r', encoding='utf-8') as f:
        cmake_lists_content = f.read()
    
    added_cmake_count = 0
    for dep in manual_plugins:
        if dep.get('cpp_dir') is None:
            continue
        ohos_name = dep['ohos_name']
        short_name = dep['short_name']
        cmake_target_name = dep.get('cmake_target_name', short_name)
        cmake_lists_content, changed = _append_manual_cmake_to_entry(
            cmake_lists_content, ohos_name, short_name, cmake_target_name
        )
        if changed:
            added_cmake_count += 1
    
    with open(cmake_lists_path, 'w', encoding='utf-8') as f:
        f.write(cmake_lists_content)
    
    if added_cmake_count > 0:
        print(f'  已添加 {added_cmake_count} 个 CMake 配置')
    
    # PackageProvider.cpp - 只处理手动注册的插件
    package_provider_path = os.path.join(target_path, 'harmony', 'entry', 'src', 'main', 'cpp', 'PackageProvider.cpp')
    
    all_package_classes = []
    for dep in manual_plugins:
        if dep.get('cpp_dir') is None:
            continue
        dep_classes = find_package_classes(target_path, dep['npm_name'], dep['short_name'])
        for cls in dep_classes:
            cls['ohos_name'] = dep['ohos_name']
            all_package_classes.append(cls)
    
    if all_package_classes and os.path.exists(package_provider_path):
        with open(package_provider_path, 'r', encoding='utf-8', errors='ignore') as f:
            existing_content = f.read()
        
        existing_includes = set(re.findall(r'^\s*#include\s+"([^"]+)"\s*$', existing_content, flags=re.MULTILINE))
        existing_shared = set(re.findall(r'std::make_shared<\s*([A-Za-z_]\w*)\s*>\s*\(\s*ctx\s*\)', existing_content))
        
        add_includes = []
        add_shared = []
        
        for pkg_class in all_package_classes:
            cls_name = pkg_class['class_name']
            include_path = pkg_class['include_path']
            
            include_filename = os.path.basename(include_path)
            include_line = f'"{include_filename}"'
            
            if include_line not in existing_includes and f'#include {include_line}' not in existing_content:
                add_includes.append(f'#include {include_line}')
            
            if cls_name not in existing_shared:
                add_shared.append(cls_name)
        
        if add_includes or add_shared:
            content2 = existing_content
            
            content2 = re.sub(r'^\s*//\s*GEN:PACKAGE_LIST_(BEGIN|END)\s*$\n?', '', content2, flags=re.MULTILINE)
            
            if add_includes:
                include_block = '\n'.join(add_includes)
                if '#include "RNOH/PackageProvider.h"' in content2:
                    content2 = content2.replace(
                        '#include "RNOH/PackageProvider.h"',
                        f'#include "RNOH/PackageProvider.h"\n{include_block}'
                    )
                else:
                    content2 = include_block + '\n' + content2
            
            if add_shared:
                m = re.search(r'return\s*\{\s*([\s\S]*?)\s*\};', content2)
                if m:
                    existing_block = m.group(1).rstrip()
                    to_add = '\n'.join([f'        std::make_shared<{c}>(ctx)' for c in add_shared])
                    if existing_block.strip():
                        block_lines = existing_block.splitlines()
                        for j in range(len(block_lines) - 1, -1, -1):
                            if 'std::make_shared<' in block_lines[j]:
                                if not block_lines[j].rstrip().endswith(','):
                                    block_lines[j] = block_lines[j].rstrip() + ','
                                break
                        existing_block = '\n'.join(block_lines)
                        new_block = existing_block + '\n' + to_add
                    else:
                        new_block = to_add
                    content2 = content2[:m.start(1)] + new_block + content2[m.end(1):]
            
            with open(package_provider_path, 'w', encoding='utf-8') as f:
                f.write(content2)
            
            if add_shared:
                print(f'  已添加 {len(add_shared)} 个 C++ Package 类')
    
    # RNPackagesFactory.ets - 只处理手动注册的插件
    rn_package_factory_path = os.path.join(target_path, 'harmony', 'entry', 'src', 'main', 'ets', 'RNPackagesFactory.ets')
    
    all_rn_package_classes = []
    for dep in manual_plugins:
        dep_classes = find_rn_package_classes(target_path, dep['npm_name'], dep['short_name'])
        for cls in dep_classes:
            cls['ohos_package_name'] = dep['ohos_name']
            all_rn_package_classes.append(cls)
    
    if all_rn_package_classes:
        existing_content = ''
        if os.path.exists(rn_package_factory_path):
            with open(rn_package_factory_path, 'r', encoding='utf-8', errors='ignore') as f:
                existing_content = f.read()

        existing_new_classes = set(re.findall(r'new\s+([A-Za-z_]\w*)\s*\(\s*ctx\s*\)', existing_content))

        add_import_lines = []
        add_new_classes = []

        for pkg_class in all_rn_package_classes:
            cls = pkg_class["class_name"]
            ohos_name = pkg_class.get('ohos_package_name')
            pkg_import_entry = resolve_ohos_import_entry(target_path, ohos_name)

            import_cls_pattern = r"import\s+\{\s*" + cls + r"\s*\}\s+from\s+[\'\"][^\'\"]+[\'\"]"
            if not re.search(import_cls_pattern, existing_content):
                import_line = f"import {{ {cls} }} from '{pkg_import_entry}';"
                add_import_lines.append(import_line)

            if cls not in existing_new_classes:
                add_new_classes.append(cls)

        if not os.path.exists(rn_package_factory_path):
            import_statements = '''/**
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { RNPackageContext, RNPackage } from '@rnoh/react-native-openharmony/ts';
import { createRNOHPackages as createRNOHPackagesAutolinking } from "./RNOHPackagesFactory";

'''
            if add_import_lines:
                import_statements += '\n'.join(add_import_lines) + '\n'
            
            new_statements = ''
            if add_new_classes:
                new_statements = '\n'.join([f'    new {c}(ctx),' for c in add_new_classes]) + '\n'
            
            rn_package_factory_content = f'''{import_statements}
export function createRNPackages(ctx: RNPackageContext): RNPackage[] {{
  return [
    // autolink支持
    ...createRNOHPackagesAutolinking(ctx),
    
    // 手动注册:
{new_statements}  ];
}}
'''
            with open(rn_package_factory_path, 'w', encoding='utf-8') as f:
                f.write(rn_package_factory_content)
            if add_new_classes:
                print(f'  已添加 {len(add_new_classes)} 个 ETS RNPackage 类')
        elif os.path.exists(rn_package_factory_path) and (add_import_lines or add_new_classes):
            with open(rn_package_factory_path, 'r', encoding='utf-8', errors='ignore') as f:
                existing_content = f.read()
            
            for import_line in add_import_lines:
                if import_line not in existing_content:
                    import_match = re.search(r"^import\s+\{[^}]+\}\s+from\s+['\"][^'\"]+['\"];?\s*$", existing_content, flags=re.MULTILINE)
                    if import_match:
                        last_import_end = import_match.end()
                        existing_content = existing_content[:last_import_end] + '\n' + import_line + existing_content[last_import_end:]
                    else:
                        existing_content = import_line + '\n' + existing_content
            
            for cls in add_new_classes:
                if f'new {cls}(ctx)' not in existing_content:
                    existing_content = re.sub(
                        r'return\s*\[',
                        f'return [\n    new {cls}(ctx),',
                        existing_content
                    )
            
            with open(rn_package_factory_path, 'w', encoding='utf-8') as f:
                f.write(existing_content)
            
            if add_new_classes:
                print(f'  已添加 {len(add_new_classes)} 个 ETS RNPackage 类')


def _collect_rn_dep_plugins(target_path: str, current_npm_name: str) -> list:
    """
    收集依赖的鸿蒙适配 RN 插件信息（排除当前插件本身）。
    返回: [{'npm_name': ..., 'ohos_name': ..., 'short_name': ..., 'har_path': ..., 'cpp_dir': ...}, ...]
    """
    example_pkg_path = os.path.join(target_path, 'package.json')
    if not os.path.exists(example_pkg_path):
        return []
    
    with open(example_pkg_path, 'r', encoding='utf-8') as f:
        pkg = json.load(f)
    
    deps = pkg.get('dependencies') or {}
    plugins = []
    
    for npm_name in deps.keys():
        if npm_name == current_npm_name:
            continue
        
        node_modules_dir = os.path.join(target_path, 'node_modules', npm_name)
        pkg_json_path = os.path.join(node_modules_dir, 'package.json')
        
        if not os.path.isdir(node_modules_dir):
            continue
        
        pkg_json = {}
        if os.path.exists(pkg_json_path):
            with open(pkg_json_path, 'r', encoding='utf-8', errors='ignore') as f:
                try:
                    pkg_json = json.load(f)
                except json.JSONDecodeError:
                    pass
        
        if not _is_harmony_adapted_package(pkg_json, node_modules_dir):
            continue
        
        info = _get_harmony_info(pkg_json, node_modules_dir, npm_name)
        if info:
            plugins.append(info)
    
    return plugins


def update_entry_oh_package(target_path, ohos_package_name, npm_package_name, short_name="library"):
    """更新 entry/oh-package.json5，添加当前插件和依赖插件的 HAR 依赖"""
    entry_oh_package_path = os.path.join(target_path, 'harmony', 'entry', 'oh-package.json5')
    with open(entry_oh_package_path, 'r', encoding='utf-8') as f:
        entry_oh_package_content = f.read()
    
    deps_to_add = []
    
    library_path = f"../../node_modules/{npm_package_name}/harmony/{short_name}.har"
    deps_to_add.append((ohos_package_name, library_path))
    
    dep_plugins = _collect_rn_dep_plugins(target_path, npm_package_name)
    for dep in dep_plugins:
        deps_to_add.append((dep['ohos_name'], dep['har_path']))
    
    added_count = 0
    for ohos_name, path in deps_to_add:
        if f'"{ohos_name}"' in entry_oh_package_content:
            continue
        if '"dependencies": {' in entry_oh_package_content:
            entry_oh_package_content = entry_oh_package_content.replace(
                '"dependencies": {',
                f'"dependencies": {{\n    "{ohos_name}": "file:{path}",'
            )
            added_count += 1
    
    with open(entry_oh_package_path, 'w', encoding='utf-8') as f:
        f.write(entry_oh_package_content)
    
    if added_count > 0:
        print(f'  已添加 {added_count} 个 HAR 依赖到 entry/oh-package.json5')

def extract_library_name(target_path, short_name="library"):
    """从库的 CMakeLists.txt 文件中提取库名"""
    library_cmake_path = os.path.join(target_path, 'harmony', short_name, 'src', 'main', 'cpp', 'CMakeLists.txt')
    library_name = short_name  # 默认值
    
    if os.path.exists(library_cmake_path):
        with open(library_cmake_path, 'r', encoding='utf-8') as f:
            library_cmake_content = f.read()
        
        # 查找 add_library 命令，提取库名
        add_library_match = re.search(r'add_library\s*\(\s*([^\s]+)', library_cmake_content)
        if add_library_match:
            library_name = add_library_match.group(1)
            print(f'提取到库名: {library_name}')
    
    return library_name

def update_cmake_lists(target_path, ohos_package_name, npm_package_name, short_name="library"):
    """更新 CMakeLists.txt，添加当前插件和依赖插件的 CMake 配置"""
    cmake_lists_path = os.path.join(target_path, 'harmony', 'entry', 'src', 'main', 'cpp', 'CMakeLists.txt')
    with open(cmake_lists_path, 'r', encoding='utf-8') as f:
        cmake_lists_content = f.read()
    
    plugins_to_add = [(ohos_package_name, short_name, True)]
    dep_plugins = _collect_rn_dep_plugins(target_path, npm_package_name)
    for dep in dep_plugins:
        has_cpp = dep.get('cpp_dir') is not None
        plugins_to_add.append((dep['ohos_name'], dep['short_name'], has_cpp))
    
    added_count = 0
    for pkg_name, lib_name, has_cpp in plugins_to_add:
        if not has_cpp:
            continue
        cmake_lists_content, changed = _append_manual_cmake_to_entry(
            cmake_lists_content, pkg_name, lib_name, lib_name
        )
        if changed:
            added_count += 1
    
    with open(cmake_lists_path, 'w', encoding='utf-8') as f:
        f.write(cmake_lists_content)
    
    if added_count > 0:
        print(f'  已添加 {added_count} 个 CMake 配置')

def find_package_classes(target_path, npm_package_name, short_name="library"):
    """在 node_modules/<npm_package_name>/harmony/{short_name}/src/main/cpp 目录下递归查找继承自 public Package 的类"""
    all_package_classes = []
    library_cpp_path = os.path.join(target_path, 'node_modules', npm_package_name, 'harmony', short_name, 'src', 'main', 'cpp')
    
    if not os.path.exists(library_cpp_path):
        return []
    
    import re
    
    # 先扫描所有继承 Package 的类（包括 Base 类）
    base_package_classes = []
    for root, dirs, files in os.walk(library_cpp_path):
        for file in files:
            if file.endswith('.h'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                matches = re.findall(r'class\s+([\w]+)\s*[:]\s*[^;]*public\s+Package', content)
                for class_name in matches:
                    rel_from_cpp = os.path.relpath(file_path, library_cpp_path).replace('\\', '/')
                    all_package_classes.append({
                        'class_name': class_name,
                        'include_path': rel_from_cpp,
                        'is_base': class_name.startswith('Base')
                    })
                    if class_name.startswith('Base'):
                        base_package_classes.append(class_name)
    
    # 再扫描继承 Base 类的非 Base 类
    for root, dirs, files in os.walk(library_cpp_path):
        for file in files:
            if file.endswith('.h'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # 匹配 class ClassName : public BaseClassName
                for base_name in base_package_classes:
                    pattern = r'class\s+([\w]+)\s*[:]\s*[^;]*public\s+' + base_name
                    matches = re.findall(pattern, content)
                    for class_name in matches:
                        if class_name.startswith('Base'):
                            continue  # 跳过 Base 类自身
                        rel_from_cpp = os.path.relpath(file_path, library_cpp_path).replace('\\', '/')
                        # 检查是否已存在
                        if not any(c['class_name'] == class_name for c in all_package_classes):
                            all_package_classes.append({
                                'class_name': class_name,
                                'include_path': rel_from_cpp,
                                'is_base': False
                            })
    
    base_classes = [c for c in all_package_classes if c['is_base']]
    non_base_classes = [c for c in all_package_classes if not c['is_base']]
    
    # 优先返回非 Base 类（如果找到对应的 Base 类）
    for non_base in non_base_classes:
        base_name = f"Base{non_base['class_name']}"
        if any(c['class_name'] == base_name for c in base_classes):
            return [non_base]
    
    if non_base_classes:
        return non_base_classes
    
    return base_classes

def generate_package_provider(target_path, npm_package_name, short_name="library"):
    """生成 PackageProvider.cpp 文件，注册当前插件和依赖插件的 Package 类"""
    package_provider_path = os.path.join(target_path, 'harmony', 'entry', 'src', 'main', 'cpp', 'PackageProvider.cpp')
    
    all_package_classes = []
    
    package_classes = find_package_classes(target_path, npm_package_name, short_name)
    all_package_classes.extend(package_classes)
    
    dep_plugins = _collect_rn_dep_plugins(target_path, npm_package_name)
    for dep in dep_plugins:
        dep_classes = find_package_classes(target_path, dep['npm_name'], dep['short_name'])
        all_package_classes.extend(dep_classes)
    
    if not all_package_classes:
        print('未找到继承自 public Package 的类，保持 PackageProvider.cpp 不变')
        return
    
    existing_content = ''
    if os.path.exists(package_provider_path):
        with open(package_provider_path, 'r', encoding='utf-8', errors='ignore') as f:
            existing_content = f.read()
    
    existing_includes = set(re.findall(r'^\s*#include\s+"([^"]+)"\s*$', existing_content, flags=re.MULTILINE))
    existing_shared = set(re.findall(r'std::make_shared<\s*([A-Za-z_]\w*)\s*>\s*\(\s*ctx\s*\)', existing_content))
    
    existing_base_classes = [c for c in existing_shared if c.startswith('Base')]
    
    add_includes = []
    add_shared = []
    need_replace = False
    
    for pkg_class in all_package_classes:
        header = pkg_class["include_path"]
        cls = pkg_class["class_name"]
        is_base = pkg_class.get("is_base", cls.startswith('Base'))
        
        if header not in existing_includes:
            add_includes.append(header)
        
        base_name = f"Base{cls}" if not is_base else cls
        if base_name in existing_shared and cls not in existing_shared and not is_base:
            need_replace = True
            add_shared.append(cls)
        elif cls not in existing_shared and is_base:
            add_shared.append(cls)
        elif cls not in existing_shared:
            add_shared.append(cls)
    
    if need_replace:
        print(f'  检测到使用了 Base 类，将替换为非 Base 类并重建文件')
        all_includes = sorted([inc for inc in existing_includes if not inc.startswith('generated/RNOH/generated/Base')])
        all_shared = sorted([c for c in existing_shared if not c.startswith('Base')])
        
        for pkg_class in all_package_classes:
            header = pkg_class["include_path"]
            cls = pkg_class["class_name"]
            if header not in all_includes:
                all_includes.append(header)
            if cls not in all_shared:
                all_shared.append(cls)
        
        all_includes = sorted(all_includes)
        all_shared = sorted(all_shared)
        
        include_statements = '#include "RNOH/PackageProvider.h"\n'
        for inc in all_includes:
            if inc != 'RNOH/PackageProvider.h':
                include_statements += f'#include "{inc}"\n'
        
        make_shared_statements = [f'        std::make_shared<{c}>(ctx)' for c in all_shared]
        make_shared_joined = ',\n'.join(make_shared_statements)

        package_provider_content = f'''/**
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

{include_statements}

using namespace rnoh;

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {{
    return {{
{make_shared_joined}
    }};
}}
'''
        with open(package_provider_path, 'w', encoding='utf-8') as f:
            f.write(package_provider_content)
        print(f'  已重建 PackageProvider.cpp，包含 {len(all_shared)} 个 Package')
        return
    
    if not add_includes and not add_shared and not need_replace:
        print('PackageProvider.cpp 已包含目标包，跳过修改')
        return
    
    if not existing_content.strip() or 'PackageProvider::getPackages' not in existing_content:
        include_statements = '#include "RNOH/PackageProvider.h"\n'
        for inc in sorted(i for i in existing_includes if i != 'RNOH/PackageProvider.h'):
            include_statements += f'#include "{inc}"\n'
        for inc in add_includes:
            include_statements += f'#include "{inc}"\n'
        
        make_shared_classes = list(existing_shared) + add_shared
        make_shared_statements = [f'        std::make_shared<{c}>(ctx)' for c in make_shared_classes]
        make_shared_joined = ',\n'.join(make_shared_statements)

        package_provider_content = f'''
{include_statements}

using namespace rnoh;

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {{
    return {{
{make_shared_joined}
    }};
}}
'''
        with open(package_provider_path, 'w', encoding='utf-8') as f:
            f.write(package_provider_content)
        return
    
    lines = existing_content.splitlines()
    lines = [line for line in lines if not re.match(r'^\s*//\s*GEN:PACKAGE_LIST_(BEGIN|END)\s*$', line)]
    last_include_idx = -1
    for i, line in enumerate(lines):
        if re.match(r'^\s*#include\s+"[^"]+"\s*$', line):
            last_include_idx = i
    if last_include_idx != -1 and add_includes:
        insert_lines = [f'#include "{h}"' for h in add_includes]
        lines[last_include_idx + 1:last_include_idx + 1] = insert_lines
    
    content2 = '\n'.join(lines)
    m = re.search(r'return\s*\{\s*([\s\S]*?)\s*\};', content2)
    if m and add_shared:
        existing_block = m.group(1).rstrip()
        to_add = '\n'.join([f'        std::make_shared<{c}>(ctx)' for c in add_shared])
        if existing_block.strip():
            block_lines = existing_block.splitlines()
            for j in range(len(block_lines) - 1, -1, -1):
                if 'std::make_shared<' in block_lines[j]:
                    if not block_lines[j].rstrip().endswith(','):
                        block_lines[j] = block_lines[j].rstrip() + ','
                    break
            existing_block = '\n'.join(block_lines)
            new_block = existing_block + '\n' + to_add
        else:
            new_block = to_add
        content2 = content2[:m.start(1)] + new_block + content2[m.end(1):]
    
    with open(package_provider_path, 'w', encoding='utf-8') as f:
        f.write(content2)
    
    if add_shared:
        print(f'  已添加 {len(add_shared)} 个 Package 类')

def find_rn_package_classes(target_path, npm_package_name, short_name="library"):
    """在 node_modules/<npm_package_name>/harmony/{short_name}/src/main/ets 目录下递归查找实现了 RNPackage 的类"""
    rn_package_classes = []
    library_ets_path = os.path.join(target_path, 'node_modules', npm_package_name, 'harmony', short_name, 'src', 'main', 'ets')
    
    if not os.path.exists(library_ets_path):
        return rn_package_classes
    
    for root, dirs, files in os.walk(library_ets_path):
        for file in files:
            if file.endswith('.ets') or file.endswith('.ts'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                import re
                matches = re.findall(r'(?:export\s+)?class\s+([\w]+)\s+extends\s+(?:RNPackage|RNOHPackage)', content)
                for class_name in matches:
                    relative_path = os.path.relpath(file_path, os.path.join(target_path, 'node_modules', npm_package_name, 'harmony', short_name, 'src', 'main', 'ets'))
                    import_path = os.path.splitext(relative_path)[0].replace('\\', '/')
                    rn_package_classes.append({
                        'class_name': class_name,
                        'import_path': import_path
                    })
    
    return rn_package_classes

def generate_rn_package_factory(target_path, npm_package_name, ohos_package_name, short_name="library"):
    """生成 RNPackagesFactory.ets 文件，注册当前插件和依赖插件的 RNPackage 类"""
    rn_package_factory_path = os.path.join(target_path, 'harmony', 'entry', 'src', 'main', 'ets', 'RNPackagesFactory.ets')
    
    all_rn_package_classes = []
    
    rn_package_classes = find_rn_package_classes(target_path, npm_package_name, short_name)
    for cls in rn_package_classes:
        cls['ohos_package_name'] = ohos_package_name
        all_rn_package_classes.append(cls)
    
    dep_plugins = _collect_rn_dep_plugins(target_path, npm_package_name)
    for dep in dep_plugins:
        dep_classes = find_rn_package_classes(target_path, dep['npm_name'], dep['short_name'])
        for cls in dep_classes:
            cls['ohos_package_name'] = dep['ohos_name']
            all_rn_package_classes.append(cls)
    
    if not all_rn_package_classes:
        print('未找到实现了 RNPackage 的类，保持 RNPackagesFactory.ets 不变')
        return
    
    existing_content = ''
    if os.path.exists(rn_package_factory_path):
        with open(rn_package_factory_path, 'r', encoding='utf-8', errors='ignore') as f:
            existing_content = f.read()
    
    existing_import_lines = set(
        re.findall(r'^\s*import\s+\{[^}]+\}\s+from\s+[\'"][^\'"]+[\'"];\s*$', existing_content, flags=re.MULTILINE)
    )
    existing_new_classes = set(re.findall(r'new\s+([A-Za-z_]\w*)\s*\(\s*ctx\s*\)', existing_content))
    
    add_import_lines = []
    add_new_classes = []
    
    for pkg_class in all_rn_package_classes:
        cls = pkg_class["class_name"]
        dep_ohos_name = pkg_class.get('ohos_package_name', ohos_package_name)
        pkg_import_entry = resolve_ohos_import_entry(target_path, dep_ohos_name)
        imp = f"import {{ {cls} }} from '{pkg_import_entry}';"
        if imp not in existing_import_lines:
            add_import_lines.append(imp)
        if cls not in existing_new_classes:
            add_new_classes.append(cls)
    
    if not add_import_lines and not add_new_classes:
        print('RNPackagesFactory.ets 已包含目标包，跳过修改')
        return
    
    lines = existing_content.splitlines()
    lines = [line for line in lines if not re.match(r'^\s*//\s*GEN:RN_PACKAGE_(IMPORTS|LIST)_(BEGIN|END)\s*$', line)]
    if not lines:
        import_statements = "import { RNPackageContext, RNPackage } from '@rnoh/react-native-openharmony/ts';\n"
        import_statements += '\n'.join(add_import_lines) + '\n'
        new_statements = '\n'.join([f'  new {c}(ctx)' for c in add_new_classes])
        rn_package_factory_content = f'''
{import_statements}

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {{
  return [
{new_statements}
  ];
}}
'''
        with open(rn_package_factory_path, 'w', encoding='utf-8') as f:
            f.write(rn_package_factory_content)
        return
    
    last_import_idx = -1
    for i, line in enumerate(lines):
        if re.match(r'^\s*import\s+.*;\s*$', line):
            last_import_idx = i
    if last_import_idx != -1 and add_import_lines:
        lines[last_import_idx + 1:last_import_idx + 1] = add_import_lines
    
    content2 = '\n'.join(lines)
    
    m = re.search(r'return\s*\[\s*([\s\S]*?)\s*\]\s*;', content2)
    if m and add_new_classes:
        existing_block = m.group(1).strip()
        add_items = [f'new {c}(ctx)' for c in add_new_classes]
        if existing_block:
            new_block = existing_block.rstrip()
            if not new_block.rstrip().endswith(','):
                new_block = new_block + ','
            new_block = new_block + '\n  ' + ',\n  '.join(add_items)
        else:
            new_block = '  ' + ',\n  '.join(add_items)
        content2 = content2[:m.start(1)] + new_block + content2[m.end(1):]
    
    with open(rn_package_factory_path, 'w', encoding='utf-8') as f:
        f.write(content2)
    
    if add_new_classes:
        print(f'  已添加 {len(add_new_classes)} 个 RNPackage 类')

# --- Fabric: arkTsComponentNames + buildCustomRNComponent（组件从 .../components/<Name> 引用，不经 ts.ts）---

FABRIC_IMPORTS_BEGIN = '// GEN:FABRIC_IMPORTS_BEGIN'
FABRIC_IMPORTS_END = '// GEN:FABRIC_IMPORTS_END'
FABRIC_ARK_BEGIN = '// GEN:FABRIC_ARK_CONST_BEGIN'
FABRIC_ARK_END = '// GEN:FABRIC_ARK_CONST_END'
FABRIC_BUILDER_BEGIN = '// GEN:FABRIC_BUILDER_BODY_BEGIN'
FABRIC_BUILDER_END = '// GEN:FABRIC_BUILDER_BODY_END'


def find_fabric_component_structs(target_path: str, npm_package_name: str) -> list:
    """
    收集 Fabric 自定义 ArkTS 组件 struct 名（用于 Index.ets）。
    扫描 node_modules/<npm_package_name>/harmony/*/src/main/ets/components/*.ets 的 export struct。
    支持 library 或 short_name 目录名。
    """
    harmony_dir = os.path.join(target_path, 'node_modules', npm_package_name, 'harmony')
    names: list = []
    seen: set = set()

    def add(nm: str) -> None:
        nm = nm.strip()
        if nm.lower().endswith('.ets'):
            nm = nm[:-4]
        if nm and re.match(r'^[A-Za-z_]\w*$', nm) and nm not in seen:
            seen.add(nm)
            names.append(nm)

    if not os.path.isdir(harmony_dir):
        return names
    
    library_roots = []
    for item in os.listdir(harmony_dir):
        if item.endswith('.har'):
            continue
        subdir = os.path.join(harmony_dir, item)
        if os.path.isdir(subdir):
            comps_dir = os.path.join(subdir, 'src', 'main', 'ets', 'components')
            if os.path.isdir(comps_dir):
                library_roots.append(subdir)
    
    if not library_roots:
        library_root = os.path.join(harmony_dir, 'library')
        if os.path.isdir(library_root):
            library_roots.append(library_root)

    for library_root in library_roots:
        comps_dir = os.path.join(library_root, 'src', 'main', 'ets', 'components')
        if os.path.isdir(comps_dir):
            for fn in sorted(os.listdir(comps_dir)):
                if not fn.endswith('.ets'):
                    continue
                stem = fn[:-4]
                if stem in seen:
                    continue
                fp = os.path.join(comps_dir, fn)
                with open(fp, 'r', encoding='utf-8', errors='ignore') as f:
                    fc = f.read()
                sm = re.search(r'export\s+struct\s+(\w+)', fc)
                if sm:
                    add(sm.group(1))
                else:
                    add(stem)

        ts_ts = os.path.join(library_root, 'ts.ts')
        if os.path.exists(ts_ts):
            with open(ts_ts, 'r', encoding='utf-8', errors='ignore') as f:
                text = f.read()
            for m in re.finditer(
                r"export\s+\*\s+from\s+['\"](?:\./)?(?:src/main/ets/)?components/([^'\"]+)['\"]",
                text,
            ):
                tail = m.group(1).replace('\\', '/')
                base = os.path.basename(tail)
                add(base)

    return names


def _replace_fabric_marked_region(content: str, begin: str, end: str, inner: str) -> str:
    """将 begin/end 标记之间的内容替换为 inner（不含标记行）。"""
    pattern = re.escape(begin) + r'([\s\S]*?)' + re.escape(end)
    m = re.search(pattern, content)
    if not m:
        return content
    return content[: m.start(1)] + inner + content[m.end(1) :]


def _fabric_generate_builder_body(structs: list) -> str:
    """生成 buildCustomRNComponent 的 Builder 函数体。

    必须用 Stack 包裹所有 if 分支，否则 Fabric 组件编译通过但不渲染（RNOH 框架已知问题，无报错）。
    """
    lines = ['  Stack() {']
    for s in structs:
        lines.append(f'    if (ctx.componentName === {s}.NAME) {{')
        lines.append(f'      {s}({{')
        lines.append('        ctx: ctx.rnComponentContext,')
        lines.append('        tag: ctx.tag')
        lines.append('      })')
        lines.append('    }')
    lines.append('  }')
    lines.append('  .position({ x: 0, y: 0 })')
    return '\n'.join(lines) + '\n'


def _fabric_apply_index_fallback(content: str, structs: list, ohos_package_name: str) -> str:
    """无 GEN 占位注释时的降级：插入 import、const、展开 buildCustomRNComponent。"""
    import_lines = [
        f"import {{ {s} }} from '{resolve_ohos_fabric_component_import(ohos_package_name, s)}';"
        for s in structs
    ]
    import_block = '\n'.join(import_lines) + '\n'
    first_spec = resolve_ohos_fabric_component_import(ohos_package_name, structs[0]) if structs else ''
    has_component_import = first_spec and (
        f"from '{first_spec}'" in content or f'from "{first_spec}"' in content
    )
    if not has_component_import:
        m_pkg = re.search(
            r"(import\s+\{\s*createRNPackages\s*\}\s+from\s+['\"]\.\./RNPackagesFactory['\"];)\s*",
            content,
        )
        if m_pkg:
            content = content[: m.end(1)] + '\n' + import_block + content[m.end(1) :]

    names_list = ', '.join(f'{s}.NAME' for s in structs)
    ark_line = f'const arkTsComponentNames: Array<string> = [{names_list}]\n'
    if 'const arkTsComponentNames' not in content and '@Builder' in content:
        content = content.replace('@Builder', ark_line + '\n@Builder', 1)

    content = re.sub(
        r'arkTsComponentNames:\s*\[\s*\]',
        'arkTsComponentNames: arkTsComponentNames',
        content,
    )

    body = _fabric_generate_builder_body(structs)
    content = re.sub(
        r'@Builder\s+export function buildCustomRNComponent\(ctx:\s*ComponentBuilderContext\)\s*\{\s*\}',
        f'@Builder\nexport function buildCustomRNComponent(ctx: ComponentBuilderContext) {{\n{body}}}',
        content,
        count=1,
    )
    return content


def _fabric_clear_index_fallback(content: str) -> str:
    """降级路径下尽量恢复为无 Fabric 的占位（不删除可能手改的 import）。"""
    content = re.sub(
        r'arkTsComponentNames:\s*arkTsComponentNames',
        'arkTsComponentNames: []',
        content,
    )
    content = re.sub(
        r'const arkTsComponentNames:\s*Array<string>\s*=\s*\[[^\]]*\]\s*\n\s*',
        '',
        content,
    )
    content = re.sub(
        r'@Builder\s+export function buildCustomRNComponent\(ctx:\s*ComponentBuilderContext\)\s*\{[\s\S]*?\}\s*\n(?=const wrappedCustomRNComponentBuilder)',
        '@Builder\nexport function buildCustomRNComponent(ctx: ComponentBuilderContext) {}\n\n',
        content,
        count=1,
    )
    return content


def generate_index_fabric(target_path: str, npm_package_name: str, ohos_package_name: str) -> None:
    """在 entry/pages/Index.ets 中注册 Fabric 组件（arkTsComponentNames + buildCustomRNComponent）。"""
    index_path = os.path.join(target_path, 'harmony', 'entry', 'src', 'main', 'ets', 'pages', 'Index.ets')
    if not os.path.exists(index_path):
        print(f'  未找到 Index.ets，跳过 Fabric 注册: {index_path}')
        return

    structs = find_fabric_component_structs(target_path, npm_package_name)

    with open(index_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    has_markers = FABRIC_IMPORTS_BEGIN in content

    if structs:
        import_lines = [
            f"import {{ {s} }} from '{resolve_ohos_fabric_component_import(ohos_package_name, s)}';"
            for s in structs
        ]
        imports_block = '\n'.join(import_lines) + '\n'
        names_list = ', '.join(f'{s}.NAME' for s in structs)
        ark_block = f'const arkTsComponentNames: Array<string> = [{names_list}]\n'
        builder_block = _fabric_generate_builder_body(structs)

        if has_markers:
            content = _replace_fabric_marked_region(
                content, FABRIC_IMPORTS_BEGIN, FABRIC_IMPORTS_END, '\n' + imports_block + '\n'
            )
            content = _replace_fabric_marked_region(
                content, FABRIC_ARK_BEGIN, FABRIC_ARK_END, '\n' + ark_block + '\n'
            )
            content = _replace_fabric_marked_region(
                content, FABRIC_BUILDER_BEGIN, FABRIC_BUILDER_END, '\n' + builder_block + '\n'
            )
            content = re.sub(
                r'arkTsComponentNames:\s*\[\s*\]',
                'arkTsComponentNames: arkTsComponentNames',
                content,
            )
        else:
            content = _fabric_apply_index_fallback(content, structs, ohos_package_name)
        print(f'  已注册 Fabric 组件（Index.ets）: {", ".join(structs)}')
    else:
        if has_markers:
            content = _replace_fabric_marked_region(content, FABRIC_IMPORTS_BEGIN, FABRIC_IMPORTS_END, '\n')
            content = _replace_fabric_marked_region(content, FABRIC_ARK_BEGIN, FABRIC_ARK_END, '\n')
            content = _replace_fabric_marked_region(content, FABRIC_BUILDER_BEGIN, FABRIC_BUILDER_END, '\n')
            content = re.sub(
                r'arkTsComponentNames:\s*arkTsComponentNames',
                'arkTsComponentNames: []',
                content,
            )
        else:
            content = _fabric_clear_index_fallback(content)
        print('  未发现 harmony/library 中的 Fabric 组件导出，跳过 Index.ets Fabric 注入（保持 Turbo-only 占位）')

    with open(index_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)


def main():
    _configure_stdio_utf8()
    args = parse_args()
    requested_steps = args.steps or list(range(1, 11))
    invalid_steps = [s for s in requested_steps if s < 1 or s > 10]
    if invalid_steps:
        raise SystemExit(f"非法步骤号: {invalid_steps}，仅支持 1-10。")

    print('=== 开始生成 Example 工程 ===')
    
    # 读取包信息
    package_info = read_package_info()
    npm_package_name = package_info['package_name']
    package_version = package_info['package_version']
    tgz_file_name = package_info['tgz_file_name']
    package_name_camel = package_info['package_name_camel']
    package_name_lower = package_info['package_name_lower']

    # 推导 short_name（从 npm 包名）
    # 尝试从多个位置获取 npm name
    npm_name_for_short = npm_package_name
    ohos_pkg_path = os.path.join(os.getcwd(), 'ohos', 'package.json')
    if os.path.isfile(ohos_pkg_path):
        with open(ohos_pkg_path, 'r', encoding='utf-8') as f:
            ohos_pkg = json.load(f)
        npm_name_for_short = ohos_pkg.get("name", npm_package_name)
    
    # 导入 derive_package_short_name
    from lib import package_merge
    short_name = package_merge.derive_package_short_name(npm_name_for_short)

    # 读取 OHOS 包名（来自 harmony/{short_name}/oh-package.json5），js-only 返回 None
    ohos_package_name = read_ohos_library_package_name(short_name)
    is_js_only = ohos_package_name is None
    
    if is_js_only:
        print(f'[info] js-only 模块检测：无 harmony/{short_name}，仅执行步骤 1、2、9、10')
        valid_steps = [1, 2, 9, 10]
    else:
        valid_steps = list(range(1, 11))
    
    # 过滤请求的步骤，只保留有效步骤
    requested_steps = [s for s in requested_steps if s in valid_steps]
    if not requested_steps:
        print('[info] 无需执行的步骤，退出')
        return
    
    print(f'包名: {npm_package_name}')
    print(f'版本: {package_version}')
    print(f'tgz 文件名: {tgz_file_name}')
    print(f'驼峰命名: {package_name_camel}')
    print(f'小写下划线: {package_name_lower}')
    if ohos_package_name:
        print(f'OHOS 包名: {ohos_package_name}')
    
    target_path = None
    for step in sorted(set(requested_steps)):
        if step == 1:
            print('\n1. 拷贝模板工程...')
            target_path = copy_template_project()
            continue

        if step == 9:
            print('\n9. 检查库根 package.json 的 scripts.prepare...')
            ensure_root_prepare_script()
            continue

        if step == 10:
            print('\n10. 为 npm pack 准备 tsconfig：合并根目录 exclude；必要时为 tsconfig.build.json 补 include（bob typescript）...')
            ensure_root_tsconfig_exclude_for_pack()
            continue

        if target_path is None:
            target_path = os.path.join(os.getcwd(), 'ohos', 'example')
            if not os.path.exists(target_path):
                raise SystemExit(
                    f"未找到目标目录: {target_path}。若要重新生成，请先执行步骤 1（或不传参数执行全流程）。"
                )

        if step == 2:
            print('\n2. 修改 example/package.json...')
            update_example_package_json(target_path, npm_package_name, tgz_file_name)
            # 库使用 reanimated 时注入 babel 插件（worklet 转换必需，否则运行时白屏）
            ensure_example_babel_reanimated(target_path)
        elif step == 3:
            print('\n3. 拷贝 library 目录...')
            copy_library_directory(target_path, short_name)
            ensure_cpp_dummy_if_no_sources(target_path, short_name)
        elif step == 4:
            print('\n4. 修改 build-profile.json5...')
            update_build_profile(target_path, short_name)
        elif step == 5:
            print('\n5. 修改 entry/oh-package.json5...')
            update_entry_oh_package(target_path, ohos_package_name, npm_package_name, short_name)
        elif step == 6:
            print('\n6. 修改 CMakeLists.txt...')
            update_cmake_lists(target_path, ohos_package_name, npm_package_name, short_name)
        elif step == 7:
            print('\n7. 生成 PackageProvider.cpp...')
            generate_package_provider(target_path, npm_package_name, short_name)
        elif step == 8:
            print('\n8. 生成 RNPackagesFactory.ets，并注册 Fabric 组件（Index.ets）...')
            generate_rn_package_factory(target_path, npm_package_name, ohos_package_name, short_name)
            generate_index_fabric(target_path, npm_package_name, ohos_package_name)
    
    print('\n=== Example 工程生成完成 ===')
    print('请执行以下命令完成剩余步骤（在插件仓库根开始，鸿蒙子包在 ./ohos/）：')
    print('【推荐顺序】先在生成/更新 ohos/example 之前于 ohos 子包内完成打包（避免 npm pack/tsc 被 example 目录拖死）：')
    print('1. （可选）本脚本步骤 9：确保 ohos/package.json 的 scripts.prepare 存在且正确（若已有则跳过）')
    print('2. （建议）本脚本步骤 10：补齐 ohos/tsconfig exclude，并在 ohos/tsconfig.build.json 无 include 时写入 bob 源码目录 glob（避免 bob build 仍检查 example 等）')
    print(
        '3. 先在库根打开 package.json 的 scripts（并参考 README），确认本项目用于编译发布产物的脚本名，'
        '再执行对应命令（如 npm run <脚本名>）；不要默认假定叫 prepare，以项目自身为准'
    )
    print(f'4. cd ohos && npm pack --ignore-scripts   # 生成 {tgz_file_name}（不跑 prepack/prepare；须先完成步骤 3 保证 lib 等产物已就绪）')
    print('')
    print('然后再生成/更新 example：')
    print('5. python .claude/skills/tool-ohos-plugin-repo/tool/apply_example_auto.py   # 生成 ohos/example（或按需指定步骤 1-8）')
    print('6. cd ohos/example && npm install --legacy-peer-deps   # 可能较久：未到 20 分钟须持续等待至结束；超过 20 分钟视为异常；失败不重试，先修依赖/网络后再执行')
    print('7. 修改 ohos/example/App.tsx 生成测试页面')
    print('8. cd ohos/example && npm run dev   # 生成 bundle.harmony.js')

if __name__ == '__main__':
    main()
