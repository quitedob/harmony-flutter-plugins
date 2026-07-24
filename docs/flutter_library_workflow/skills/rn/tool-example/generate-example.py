#!/usr/bin/env python3
import os
import sys
import json
import shutil
import re
import argparse
import subprocess


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
        description="基于 example_auto 模板生成/更新 Example 工程。"
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
    从 oh-package.json5（json5/ts 风格）中尽量鲁棒地提取 main 字段。
    支持：
      - "main": "ts.ts"
      - main: "ts.ts"
      - 'main': 'Index.ets'
    """
    m = re.search(r'^\s*(?:"main"|main)\s*:\s*[\'"]([^\'"]+)[\'"]\s*,?\s*$', content, flags=re.MULTILINE)
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
    package_json_path = os.path.join(os.getcwd(), 'package.json')
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
    与 npm pack / example_auto 本地 tgz 依赖流程配套；若已有 prepare 则不改写。
    """
    package_json_path = os.path.join(os.getcwd(), 'package.json')
    if not os.path.exists(package_json_path):
        raise FileNotFoundError(f'未找到库根 package.json: {package_json_path}')
    with open(package_json_path, 'r', encoding='utf-8') as f:
        package_json = json.load(f)
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
    package_json_path = os.path.join(os.getcwd(), 'package.json')
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
    不会合并根 tsconfig 的 example_auto/harmony 排除项；因此在未手写 include 时补上
    '<source>/**/*'，使 tsc 只检查库源码（与 react-native-builder-bob.source 一致）。
    若已有非空 include 则不覆盖。
    """
    build_path = os.path.join(os.getcwd(), 'tsconfig.build.json')
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
    为 npm pack/prepare 触发的 tsc 提供“排除目录黑名单”，避免把 example_auto/harmony/node_modules 等目录编进类型检查导致打包失败。

    约束：
    - 根目录 tsconfig.json：只补齐/合并 exclude（已有 exclude 会保留）
    - tsconfig.build.json：若存在且尚无 include，则写入 <bob.source>/**/*（见 ensure_tsconfig_build_json_include_for_bob）
    - 激进排除所有点开头目录：**/.*/**
    """
    tsconfig_path = os.path.join(os.getcwd(), 'tsconfig.json')
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
                    'example_auto/**',
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

def read_ohos_library_package_name():
    """
    读取本仓库 harmony/library/oh-package.json5 中的 name 字段（OHOS 包名）。
    注意：OHOS 包名不一定等于 npm 的 package.json.name。
    """
    oh_pkg_path = os.path.join(os.getcwd(), 'harmony', 'library', 'oh-package.json5')
    if not os.path.exists(oh_pkg_path):
        raise FileNotFoundError(f'未找到 OHOS 包清单: {oh_pkg_path}')
    with open(oh_pkg_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    m = re.search(r'^\s*(?:"name"|name)\s*:\s*[\'"]([^\'"]+)[\'"]\s*,?\s*$', content, flags=re.MULTILINE)
    if not m:
        raise ValueError(f'无法从 oh-package.json5 提取 name 字段: {oh_pkg_path}')
    return m.group(1).strip()

def _absolute_har_file_uri(example_auto_root: str, *parts_under_node_modules: str) -> str:
    """node_modules 下某 HAR 的绝对路径，转为 file: URI（Windows 用正斜杠，便于 ohpm）。"""
    har_abs = os.path.abspath(os.path.join(example_auto_root, 'node_modules', *parts_under_node_modules))
    p = har_abs.replace('\\', '/')
    return f'file:{p}'


def _absolute_repo_tgz_file_ref(tgz_file_name: str) -> str:
    """库根目录 npm pack 产物的绝对 file: 路径（example_auto 在短路径/链接下时仍指向仓库根 tgz）。"""
    tgz_abs = os.path.abspath(os.path.join(os.getcwd(), tgz_file_name))
    p = tgz_abs.replace('\\', '/')
    return f'file:{p}'

def rewrite_harmony_oh_package_har_paths(example_auto_root: str) -> None:
    """
    拷贝模板后，将 harmony 内两处指向 npm 包内 HAR 的相对 file: 路径改为绝对路径
    （entry/oh-package.json5 的 dependencies、harmony/oh-package.json5 的 overrides）。
    使用 example_auto 根目录的绝对路径（Windows 短路径场景下为真实目录 D:\\rn\\N\\example_auto）。
    """
    root = os.path.abspath(example_auto_root)
    fast_uri = _absolute_har_file_uri(
        root,
        '@react-native-oh-tpl',
        'react-native-fast-image',
        'harmony',
        'fast_image.har',
    )
    rnoh_uri = _absolute_har_file_uri(
        root,
        '@react-native-oh',
        'react-native-harmony',
        'react_native_openharmony_release.har',
    )

    entry_path = os.path.join(example_auto_root, 'harmony', 'entry', 'oh-package.json5')
    with open(entry_path, 'r', encoding='utf-8') as f:
        entry_content = f.read()
    entry_content = entry_content.replace(
        '"@react-native-oh-tpl/react-native-fast-image": "file:../../node_modules/@react-native-oh-tpl/react-native-fast-image/harmony/fast_image.har"',
        f'"@react-native-oh-tpl/react-native-fast-image": {json.dumps(fast_uri)}',
    )
    entry_content = entry_content.replace(
        '"@rnoh/react-native-openharmony": "file:../../node_modules/@react-native-oh/react-native-harmony/react_native_openharmony_release.har"',
        f'"@rnoh/react-native-openharmony": {json.dumps(rnoh_uri)}',
    )
    with open(entry_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(entry_content)

    harmony_oh_path = os.path.join(example_auto_root, 'harmony', 'oh-package.json5')
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

def _remove_project_example_auto_slot(link_path: str) -> None:
    """
    删除项目根下的 example_auto：符号链接 / junction 用 unlink 或 rmdir；
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
    """在项目下创建指向真实 example_auto 目录的链接：优先目录符号链接，失败则回退为 junction。"""
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
    """拷贝模板工程：非 Windows 或无法使用盘符路径时仍拷至 ./example_auto；Windows 则拷至 <盘符>:\\rn\\<序号>\\example_auto 并在项目下建链接。"""
    cwd = os.getcwd()
    template_path = os.path.join(cwd, '.claude', 'skills', 'tool-example', 'example_auto')
    link_path = os.path.join(cwd, 'example_auto')

    use_windows_staging = (
        sys.platform == 'win32'
        and len(os.path.splitdrive(os.path.abspath(cwd))[0]) == 2
        and os.path.splitdrive(os.path.abspath(cwd))[0][1] == ':'
    )

    if use_windows_staging:
        drive = os.path.splitdrive(os.path.abspath(cwd))[0]
        rn_root = os.path.join(drive + '\\', 'rn')
        seq_dir = _next_rn_sequence_dir(rn_root)
        real_example = os.path.join(seq_dir, 'example_auto')
        if os.path.exists(real_example):
            shutil.rmtree(real_example)
        shutil.copytree(template_path, real_example)
        rewrite_harmony_oh_package_har_paths(real_example)
        _remove_project_example_auto_slot(link_path)
        print(f'模板已拷贝至（短路径，便于 ohpm/hvigor）: {real_example}')
        _create_dir_symlink_or_junction(link_path, real_example)
        return link_path

    _remove_project_example_auto_slot(link_path)
    shutil.copytree(template_path, link_path)
    rewrite_harmony_oh_package_har_paths(link_path)
    return link_path

def update_example_package_json(target_path, package_name, tgz_file_name):
    """更新 example_auto/package.json，添加本地依赖（tgz 使用库根绝对路径，避免 example_auto 为链接/短路径时相对路径失效）"""
    example_package_json_path = os.path.join(target_path, 'package.json')
    with open(example_package_json_path, 'r', encoding='utf-8') as f:
        example_package_json = json.load(f)
    
    # 添加本地依赖
    if 'dependencies' not in example_package_json:
        example_package_json['dependencies'] = {}
    example_package_json['dependencies'][package_name] = _absolute_repo_tgz_file_ref(tgz_file_name)
    
    with open(example_package_json_path, 'w', encoding='utf-8') as f:
        json.dump(example_package_json, f, indent=2)

def copy_library_directory(target_path):
    """拷贝 library 目录到目标位置"""
    source_library_path = os.path.join(os.getcwd(), 'harmony', 'library')
    target_library_path = os.path.join(target_path, 'harmony', 'library')
    
    # 如果目标目录已存在，先删除
    if os.path.exists(target_library_path):
        shutil.rmtree(target_library_path)
    # 拷贝 library 目录，忽略 oh_modules（符号链接目录，会在目标工程重新安装）
    shutil.copytree(source_library_path, target_library_path, ignore=shutil.ignore_patterns('oh_modules'))


def ensure_cpp_dummy_if_no_sources(target_path):
    """
    对于纯 ETS Fabric Component（cpp 目录下无 .cpp 源文件），自动创建 dummy.cpp。
    CMake 的 add_library 需要 SOURCES，无源文件时会导致构建失败。
    """
    cpp_dir = os.path.join(target_path, 'harmony', 'library', 'src', 'main', 'cpp')
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

def update_build_profile(target_path):
    """更新 build-profile.json5，添加 library 模块"""
    build_profile_path = os.path.join(target_path, 'harmony', 'build-profile.json5')
    with open(build_profile_path, 'r', encoding='utf-8') as f:
        build_profile_content = f.read()
    
    # 查找 modules 数组并添加 library 模块
    if '"modules": [' in build_profile_content:
        build_profile_content = build_profile_content.replace(
            '"modules": [',
            '"modules": [\n    {\n      "name": "library",\n      "srcPath": "./library",\n      "targets": [\n        {\n          "name": "default",\n          "applyToProducts": [\n            "default"\n          ]\n        }\n      ]\n    },'
        )
    
    with open(build_profile_path, 'w', encoding='utf-8') as f:
        f.write(build_profile_content)

def update_entry_oh_package(target_path, ohos_package_name):
    """更新 entry/oh-package.json5，添加 library 依赖"""
    entry_oh_package_path = os.path.join(target_path, 'harmony', 'entry', 'oh-package.json5')
    with open(entry_oh_package_path, 'r', encoding='utf-8') as f:
        entry_oh_package_content = f.read()
    
    # 查找 dependencies 并添加 library 依赖
    if '"dependencies": {' in entry_oh_package_content:
        entry_oh_package_content = entry_oh_package_content.replace(
            '"dependencies": {',
            f"\"dependencies\": {{\n    \"{ohos_package_name}\": \"file:../library\","
        )
    
    with open(entry_oh_package_path, 'w', encoding='utf-8') as f:
        f.write(entry_oh_package_content)

def extract_library_name(target_path):
    """从库的 CMakeLists.txt 文件中提取库名"""
    library_cmake_path = os.path.join(target_path, 'harmony', 'library', 'src', 'main', 'cpp', 'CMakeLists.txt')
    library_name = 'library'  # 默认值
    
    if os.path.exists(library_cmake_path):
        with open(library_cmake_path, 'r', encoding='utf-8') as f:
            library_cmake_content = f.read()
        
        # 查找 add_library 命令，提取库名
        add_library_match = re.search(r'add_library\s*\(\s*([^\s]+)', library_cmake_content)
        if add_library_match:
            library_name = add_library_match.group(1)
            print(f'提取到库名: {library_name}')
    
    return library_name

def update_cmake_lists(target_path, ohos_package_name):
    """更新 CMakeLists.txt，添加库的链接"""
    cmake_lists_path = os.path.join(target_path, 'harmony', 'entry', 'src', 'main', 'cpp', 'CMakeLists.txt')
    with open(cmake_lists_path, 'r', encoding='utf-8') as f:
        cmake_lists_content = f.read()
    
    # 添加 library 目录和链接
    # 参考模板工程的路径格式
    cmake_add_subdirectory = f'add_subdirectory("${{OH_MODULE_DIR}}/{ohos_package_name}/src/main/cpp" ./library)'
    
    # 提取库名
    library_name = extract_library_name(target_path)
    cmake_target_compile_options = f'target_compile_options({library_name} PUBLIC ${{folly_compile_options}})'
    cmake_target_link = f'target_link_libraries(rnoh_app PUBLIC {library_name})'
    
    # 在 add_library 之前添加 add_subdirectory（避免重复插入）
    if 'add_library(rnoh_app SHARED' in cmake_lists_content and cmake_add_subdirectory not in cmake_lists_content:
        replacement = f'{cmake_add_subdirectory}\n{cmake_target_compile_options}\n\nadd_library(rnoh_app SHARED'
        cmake_lists_content = cmake_lists_content.replace(
            'add_library(rnoh_app SHARED',
            replacement
        )
    
    # 在最后一个 target_link_libraries 之后添加新的 target_link_libraries
    if 'target_link_libraries(rnoh_app' in cmake_lists_content and cmake_target_link not in cmake_lists_content:
        # 找到最后一个 target_link_libraries 行
        lines = cmake_lists_content.split('\n')
        last_target_link_line = -1
        for i, line in enumerate(lines):
            if 'target_link_libraries(rnoh_app' in line:
                last_target_link_line = i
        
        if last_target_link_line != -1:
            # 在最后一个 target_link_libraries 行之后添加新的链接
            lines.insert(last_target_link_line + 1, cmake_target_link)
            cmake_lists_content = '\n'.join(lines)
    
    with open(cmake_lists_path, 'w', encoding='utf-8') as f:
        f.write(cmake_lists_content)

def find_package_classes(target_path):
    """在 lib/src/main/cpp 目录下递归查找继承自 public Package 的类"""
    package_classes = []
    library_cpp_path = os.path.join(target_path, 'harmony', 'library', 'src', 'main', 'cpp')
    
    if not os.path.exists(library_cpp_path):
        return package_classes
    
    # 递归查找所有 .h 文件
    for root, dirs, files in os.walk(library_cpp_path):
        for file in files:
            if file.endswith('.h'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # 查找继承自 public Package 的类
                import re
                # 匹配 class ClassName : public Package 或 class ClassName : public SomeBaseClass, public Package
                matches = re.findall(r'class\s+([\w]+)\s*[:]\s*[^;]*public\s+Package', content)
                for class_name in matches:
                    # 生成 include 路径
                    #
                    # 说明：
                    # - entry 侧 CMakeLists.txt 会通过 add_subdirectory(...) 把目标模块的 cpp 目录加入构建；
                    # - 模板工程的 PackageProvider.cpp 采用 `#include "XxxPackage.h"` 的形式，而不是相对路径 include；
                    # - 因此这里仅使用头文件 basename，保持与模板工程一致，避免深层相对路径引发包含路径问题。
                    include_path = os.path.basename(file_path)
                    package_classes.append({
                        'class_name': class_name,
                        'include_path': include_path
                    })
    
    return package_classes

def generate_package_provider(target_path):
    """生成 PackageProvider.cpp 文件"""
    package_provider_path = os.path.join(target_path, 'harmony', 'entry', 'src', 'main', 'cpp', 'PackageProvider.cpp')
    
    # 查找所有继承自 public Package 的类
    package_classes = find_package_classes(target_path)
    
    # 如果没有找到任何包类，保持原样不修改
    if not package_classes:
        print('未找到继承自 public Package 的类，保持 PackageProvider.cpp 不变')
        return

    # 增量更新：保留模板工程中已有的 packages（例如 FastImagePackage），只追加缺失项
    existing_content = ''
    if os.path.exists(package_provider_path):
        with open(package_provider_path, 'r', encoding='utf-8', errors='ignore') as f:
            existing_content = f.read()

    # 现有 include 与 make_shared（尽量宽松匹配）
    existing_includes = set(re.findall(r'^\s*#include\s+"([^"]+)"\s*$', existing_content, flags=re.MULTILINE))
    existing_shared = set(re.findall(r'std::make_shared<\s*([A-Za-z_]\w*)\s*>\s*\(\s*ctx\s*\)', existing_content))

    # 需要追加的 include / make_shared
    add_includes = []
    add_shared = []
    for pkg_class in package_classes:
        header = pkg_class["include_path"]
        cls = pkg_class["class_name"]
        if header not in existing_includes:
            add_includes.append(header)
        if cls not in existing_shared:
            add_shared.append(cls)

    if not add_includes and not add_shared:
        print('PackageProvider.cpp 已包含目标包，跳过修改')
        return

    # 若文件不存在或内容异常，降级为“重建但尽量保留已有包”
    if not existing_content.strip() or 'PackageProvider::getPackages' not in existing_content:
        include_statements = '#include "RNOH/PackageProvider.h"\n'
        # 保留已有 include（除 RNOH/PackageProvider.h）
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

    # 1) 追加 include：插到最后一个 include 之后
    lines = existing_content.splitlines()
    last_include_idx = -1
    for i, line in enumerate(lines):
        if re.match(r'^\s*#include\s+"[^"]+"\s*$', line):
            last_include_idx = i
    if last_include_idx != -1 and add_includes:
        insert_lines = [f'#include "{h}"' for h in add_includes]
        lines[last_include_idx + 1:last_include_idx + 1] = insert_lines

    # 2) 追加 make_shared：插到 return { ... }; 的末尾前
    content2 = '\n'.join(lines)
    m = re.search(r'return\s*\{\s*([\s\S]*?)\s*\};', content2)
    if m and add_shared:
        existing_block = m.group(1).rstrip()
        to_add = '\n'.join([f'        std::make_shared<{c}>(ctx)' for c in add_shared])
        # 如果已有内容非空且末行不以逗号结尾，补一个逗号（兼容已有格式）
        if existing_block.strip():
            # 在最后一个 make_shared 行后追加逗号
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

def find_rn_package_classes(target_path, package_name):
    """在 lib/src/main/ets 目录下递归查找实现了 RNPackage 的类"""
    rn_package_classes = []
    library_ets_path = os.path.join(target_path, 'harmony', 'library', 'src', 'main', 'ets')
    
    if not os.path.exists(library_ets_path):
        return rn_package_classes
    
    # 递归查找所有 .ets 文件
    for root, dirs, files in os.walk(library_ets_path):
        for file in files:
            if file.endswith('.ets') or file.endswith('.ts'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # 查找实现了 RNPackage 的类（包括继承 RNOHPackage 的子类）
                import re
                # 匹配 export class ClassName extends RNPackage 或 RNOHPackage
                matches = re.findall(r'(?:export\s+)?class\s+([\w]+)\s+extends\s+(?:RNPackage|RNOHPackage)', content)
                for class_name in matches:
                    # 计算相对路径，用于 import
                    # 从 library/src/main/ets 开始计算相对路径
                    relative_path = os.path.relpath(file_path, os.path.join(target_path, 'harmony', 'library', 'src', 'main', 'ets'))
                    # 移除扩展名（.ets / .ts）
                    import_path = os.path.splitext(relative_path)[0].replace('\\', '/')
                    rn_package_classes.append({
                        'class_name': class_name,
                        'import_path': import_path
                    })
    
    return rn_package_classes

def generate_rn_package_factory(target_path, package_name):
    """生成 RNPackagesFactory.ets 文件"""
    rn_package_factory_path = os.path.join(target_path, 'harmony', 'entry', 'src', 'main', 'ets', 'RNPackagesFactory.ets')
    
    # 查找所有实现了 RNPackage 的类
    rn_package_classes = find_rn_package_classes(target_path, package_name)
    
    # 如果没有找到任何包类，保持原样不修改
    if not rn_package_classes:
        print('未找到实现了 RNPackage 的类，保持 RNPackagesFactory.ets 不变')
        return

    # 增量更新：保留模板工程中已有 packages（例如 FastImagePackage），只追加缺失项
    existing_content = ''
    if os.path.exists(rn_package_factory_path):
        with open(rn_package_factory_path, 'r', encoding='utf-8', errors='ignore') as f:
            existing_content = f.read()

    # 解析 import 入口：由 oh-package.json5 的 main 决定（不硬编码 /ts）
    pkg_import_entry = resolve_ohos_import_entry(target_path, package_name)

    # 删除该 package 下“非当前入口”的 import（例如 from '@react-native-community/netinfo/NetInfoPackage'）
    existing_content = re.sub(
        rf'^\s*import\s+\{{[^}}]+\}}\s+from\s+[\'"]{re.escape(package_name)}/(?!{re.escape(pkg_import_entry.split("/", 1)[1])}\b)[^\'"]+[\'"];\s*$\n?',
        '',
        existing_content,
        flags=re.MULTILINE
    )

    # 收集已有 import / new（按行存储，避免破坏原格式）
    existing_import_lines = set(
        re.findall(r'^\s*import\s+\{[^}]+\}\s+from\s+[\'"][^\'"]+[\'"];\s*$', existing_content, flags=re.MULTILINE)
    )
    existing_new_classes = set(re.findall(r'new\s+([A-Za-z_]\w*)\s*\(\s*ctx\s*\)', existing_content))

    add_import_lines = []
    add_new_classes = []
    for pkg_class in rn_package_classes:
        cls = pkg_class["class_name"]
        imp = f"import {{ {cls}}} from '{pkg_import_entry}';"
        if imp not in existing_import_lines:
            add_import_lines.append(imp)
        if cls not in existing_new_classes:
            add_new_classes.append(cls)

    if not add_import_lines and not add_new_classes:
        print('RNPackagesFactory.ets 已包含目标包，跳过修改')
        return

    lines = existing_content.splitlines()
    if not lines:
        # 文件不存在或为空：重建一个最简版本
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

    # 1) 插入 imports：放到最后一个 import 之后
    last_import_idx = -1
    for i, line in enumerate(lines):
        if re.match(r'^\s*import\s+.*;\s*$', line):
            last_import_idx = i
    if last_import_idx != -1 and add_import_lines:
        lines[last_import_idx + 1:last_import_idx + 1] = add_import_lines

    content2 = '\n'.join(lines)

    # 2) 追加 new Xxx(ctx)：尽量在 return [...] 内追加
    m = re.search(r'return\s*\[\s*([\s\S]*?)\s*\]\s*;', content2)
    if m and add_new_classes:
        existing_block = m.group(1).strip()
        existing_items = []
        if existing_block:
            # 按逗号分隔可能不稳，这里直接追加一行，保持最小侵入
            existing_items = [existing_block]
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

# --- Fabric: arkTsComponentNames + buildCustomRNComponent（组件从 .../components/<Name> 引用，不经 ts.ts）---

FABRIC_IMPORTS_BEGIN = '// GEN:FABRIC_IMPORTS_BEGIN'
FABRIC_IMPORTS_END = '// GEN:FABRIC_IMPORTS_END'
FABRIC_ARK_BEGIN = '// GEN:FABRIC_ARK_CONST_BEGIN'
FABRIC_ARK_END = '// GEN:FABRIC_ARK_CONST_END'
FABRIC_BUILDER_BEGIN = '// GEN:FABRIC_BUILDER_BODY_BEGIN'
FABRIC_BUILDER_END = '// GEN:FABRIC_BUILDER_BODY_END'


def find_fabric_component_structs(target_path: str) -> list:
    """
    收集 Fabric 自定义 ArkTS 组件 struct 名（用于 Index.ets）。
    优先扫描 harmony/library/src/main/ets/components/*.ets 的 export struct；
    若存在旧版 ts.ts 中 export * from .../components/... 仍可作为补充（新版 ts.ts 不再 export .ets）。
    """
    library_root = os.path.join(target_path, 'harmony', 'library')
    names: list = []
    seen: set = set()

    def add(nm: str) -> None:
        nm = nm.strip()
        if nm.lower().endswith('.ets'):
            nm = nm[:-4]
        if nm and re.match(r'^[A-Za-z_]\w*$', nm) and nm not in seen:
            seen.add(nm)
            names.append(nm)

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
    lines = ['  Stack() {']
    for s in structs:
        lines.append(f'    if (ctx.componentName === {s}.NAME) {{')
        lines.append(f'      {s}({{')
        lines.append('        ctx: ctx.rnComponentContext,')
        lines.append('        tag: ctx.tag')
        lines.append('      })')
        lines.append('    }')
    lines.append('  }')
    lines.append("  .position({ x: 0, y: 0 })")
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
    builder_pattern = f'@Builder\nexport function buildCustomRNComponent(ctx: ComponentBuilderContext) {{\n{body}}}'
    content = re.sub(
        r'@Builder\s+export function buildCustomRNComponent\(ctx:\s*ComponentBuilderContext\)\s*\{\s*\}',
        builder_pattern,
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


def generate_index_fabric(target_path: str, ohos_package_name: str) -> None:
    """在 entry/pages/Index.ets 中注册 Fabric 组件（arkTsComponentNames + buildCustomRNComponent）。"""
    index_path = os.path.join(target_path, 'harmony', 'entry', 'src', 'main', 'ets', 'pages', 'Index.ets')
    if not os.path.exists(index_path):
        print(f'  未找到 Index.ets，跳过 Fabric 注册: {index_path}')
        return

    structs = find_fabric_component_structs(target_path)

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

    # 读取 OHOS 包名（来自 harmony/library/oh-package.json5）
    ohos_package_name = read_ohos_library_package_name()
    
    print(f'包名: {npm_package_name}')
    print(f'版本: {package_version}')
    print(f'tgz 文件名: {tgz_file_name}')
    print(f'驼峰命名: {package_name_camel}')
    print(f'小写下划线: {package_name_lower}')
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
            target_path = os.path.join(os.getcwd(), 'example_auto')
            if not os.path.exists(target_path):
                raise SystemExit(
                    f"未找到目标目录: {target_path}。若要重新生成，请先执行步骤 1（或不传参数执行全流程）。"
                )

        if step == 2:
            print('\n2. 修改 example_auto/package.json...')
            update_example_package_json(target_path, npm_package_name, tgz_file_name)
        elif step == 3:
            print('\n3. 拷贝 library 目录...')
            copy_library_directory(target_path)
            ensure_cpp_dummy_if_no_sources(target_path)
        elif step == 4:
            print('\n4. 修改 build-profile.json5...')
            update_build_profile(target_path)
        elif step == 5:
            print('\n5. 修改 entry/oh-package.json5...')
            update_entry_oh_package(target_path, ohos_package_name)
        elif step == 6:
            print('\n6. 修改 CMakeLists.txt...')
            update_cmake_lists(target_path, ohos_package_name)
        elif step == 7:
            print('\n7. 生成 PackageProvider.cpp...')
            generate_package_provider(target_path)
        elif step == 8:
            print('\n8. 生成 RNPackagesFactory.ets，并注册 Fabric 组件（Index.ets）...')
            generate_rn_package_factory(target_path, ohos_package_name)
            generate_index_fabric(target_path, ohos_package_name)
    
    print('\n=== Example 工程生成完成 ===')
    print('请执行以下命令完成剩余步骤（均在库根目录开始，除非另行 cd）:')
    print('【推荐顺序】先在生成 example_auto 之前完成打包（避免 npm pack/tsc 被 example_auto 目录拖死）：')
    print('1. （可选）运行本脚本步骤 9：确保库根 scripts.prepare 存在且正确（若已有则跳过）')
    print('2. （建议）运行本脚本步骤 10：补齐根目录 tsconfig exclude，并在 tsconfig.build.json 无 include 时写入 bob 源码目录 glob（避免 bob build 仍检查 example_auto 等）')
    print(
        '3. 先在库根打开 package.json 的 scripts（并参考 README），确认本项目用于编译发布产物的脚本名，'
        '再执行对应命令（如 npm run <脚本名>）；不要默认假定叫 prepare，以项目自身为准'
    )
    print(f'4. npm pack --ignore-scripts   # 生成 {tgz_file_name}（不跑 prepack/prepare；须先完成步骤 3 保证 lib 等产物已就绪）')
    print('')
    print('然后再生成/更新 example_auto：')
    print('5. python .claude/skills/tool-example/generate-example.py   # 生成 example_auto（或按需指定步骤 1-8）')
    print('6. cd example_auto && npm install --legacy-peer-deps   # 可能较久：未到 20 分钟须持续等待至结束；超过 20 分钟视为异常；失败不重试，先修依赖/网络后再执行')
    print('7. 修改 example_auto/App.tsx 生成测试页面')
    print('8. cd example_auto && npm run dev   # 生成 bundle.harmony.js')

if __name__ == '__main__':
    main()
