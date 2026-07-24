#!/usr/bin/env python3
"""
RN 插件 Example 生成器 (重构版 - 完全对齐 Flutter)

基于 04-test-cases.json 生成 ohos/example_auto/ 测试 Demo App

目录结构：
example_auto/
├── App.tsx                  # 入口 + 路由容器
├── data/
│   └── testCases.ts         # 完整的测试用例数据（含步骤、预期结果）
├── pages/
│   ├── ModuleList.tsx       # 模块列表页
│   ├── TestCaseList.tsx     # 用例列表页
│   └── TestCase_*.tsx       # 每个测试用例一个独立页面
└── components/
    └── ResultPanel.tsx      # 结果展示组件

用法：
    python generate_example.py [--plugin-root <path>]
"""

import argparse
import json
import os
import re
import shutil
import subprocess
from pathlib import Path
from typing import List, Dict, Any

_SKELETON_DIR = Path(__file__).parent / "example_skeleton"

# 推导 workspace root（generate_example.py 在 tool/ 目录下）
# tool/ → rn-plugin-example-generator/ → skills/ → .claude/ → agent-rn/ → workspace_root
_WORKSPACE_ROOT = Path(__file__).resolve().parent.parent.parent.parent.parent.parent


def _inject_signing_to_example_auto(example_auto_dir: Path) -> None:
    """生成 example_auto 后调用 ohos-sync-build-profile.js 注入签名配置。"""
    script = _WORKSPACE_ROOT / "adapt-workflow" / "bin" / "ohos-sync-build-profile.js"
    if not script.is_file():
        print(f"  [warn] 签名注入脚本不存在: {script}")
        return
    ohos_harmony = str(example_auto_dir / "harmony")
    cwd = str(example_auto_dir.parent.parent)  # plugin_root
    try:
        result = subprocess.run(
            ["node", str(script), "--mode=apply", f"--ohos={ohos_harmony}", f"--cwd={cwd}"],
            capture_output=True, text=True, timeout=30,
            encoding='utf-8', errors='replace'
        )
        if result.returncode == 0:
            print(f"  已注入签名到 {ohos_harmony}")
        else:
            print(f"  [warn] 签名注入失败: {result.stderr.strip()}")
    except Exception as e:
        print(f"  [warn] 签名注入异常: {e}")


def _ensure_node_modules(example_auto_dir: Path) -> None:
    """确保 example_auto/node_modules 齐全（首次 npm install）。

    必须在 _ensure_oh_modules 之前跑——oh-package.json5 的 overrides 引用
    `file:../node_modules/@react-native-oh/react-native-harmony/react_native_openharmony_release.har`，
    ohpm install 时要找这个 .har 文件。如果 node_modules 不存在，ohpm 报 File Not Exist。

    历史教训：i18n / measure_text demo-gen 时 _ensure_oh_modules 跑 ohpm install
    报 File Not Exist 找不到 .har，agent 手动修复浪费 ~5 分钟，且 oh_modules 不全
    导致后续 CMake 三联错，再浪费 ~5 分钟。

    copy_example_to_auto 用 ignore_patterns 排除了 node_modules，所以 example_auto
    创建后没有 node_modules，必须这里装上。
    """
    nm_dir = example_auto_dir / "node_modules"
    if nm_dir.exists():
        return  # 已存在（rerun 时保留），跳过

    print(f"  npm install（首次安装 node_modules，约 2-5 分钟）...")

    # Windows 下 npm 实际是 npm.CMD，subprocess 不带 shell=True 找不到
    npm_cmd = shutil.which("npm") or shutil.which("npm.CMD")
    if not npm_cmd:
        print(f"  [warn] 未找到 npm 命令（PATH 上无 npm/npm.CMD），跳过 install")
        return

    try:
        result = subprocess.run(
            [npm_cmd, "install", "--registry=https://registry.npmmirror.com",
             "--legacy-peer-deps", "--install-strategy=hoisted", "--no-package-lock"],
            cwd=str(example_auto_dir),
            capture_output=True, text=True, timeout=600,
            encoding='utf-8', errors='replace'
        )
        # 跟 _ensure_oh_modules 一样的错误检查（npm 错误可能在 stdout）
        output = (result.stdout or '') + '\n' + (result.stderr or '')
        has_error = 'npm error' in output.lower() or 'npm ERR' in output
        if result.returncode == 0 and not has_error:
            print(f"  npm install 完成")
        else:
            tail = output.strip()[-400:]
            print(f"  [warn] npm install 失败（returncode={result.returncode}）: {tail}")
    except Exception as e:
        print(f"  [warn] npm install 异常: {e}")


def _ensure_oh_modules(example_auto_dir: Path, plugin_root: Path) -> None:
    """确保 example_auto/harmony/oh_modules 齐全。

    两步：
    1. 先从 example/harmony/oh_modules 拷贝（保留 HAR 安装的 .har 包）
    2. 再跑 ohpm install --all 强制刷新，确保 C++ 头文件 / include 目录齐全

    历史教训：仅靠拷贝不够，toast demo-gen 出现 cpp/folly-config/include 三联错
    都是 oh_modules 不全导致，agent 用三次 Copy-Item 绕过，本可一次 ohpm install 解决。
    详见 failure-lessons 的 demo-gen-cpp-001。
    """
    src_oh_modules = plugin_root / "ohos" / "example" / "harmony" / "oh_modules"
    dst_oh_modules = example_auto_dir / "harmony" / "oh_modules"

    # ① 拷贝（仅当首次创建，未保留时）
    if not dst_oh_modules.exists() and src_oh_modules.exists():
        try:
            shutil.copytree(src_oh_modules, dst_oh_modules)
            print(f"  已拷贝 oh_modules")
        except Exception as e:
            print(f"  [warn] oh_modules 拷贝失败: {e}")

    # ② 强制 ohpm install，补齐缺失的 C++ 头文件/include 子目录
    harmony_dir = example_auto_dir / "harmony"
    print(f"  ohpm install --all（确保 oh_modules 完整，约 30-60s）...")

    # Windows 下 ohpm 实际是 ohpm.BAT / ohpm.CMD，subprocess 不带 shell=True 找不到
    # 会报 [WinError 2] 系统找不到指定的文件。用 shutil.which 显式解析（参考 rn.py _run）
    ohpm_cmd = shutil.which("ohpm") or shutil.which("ohpm.BAT") or shutil.which("ohpm.CMD")
    if not ohpm_cmd:
        print(f"  [warn] 未找到 ohpm 命令（PATH 上无 ohpm/ohpm.BAT/ohpm.CMD），跳过 install")
        return

    try:
        result = subprocess.run(
            [ohpm_cmd, "install", "--all"],
            cwd=str(harmony_dir),
            capture_output=True, text=True, timeout=180,
            encoding='utf-8', errors='replace'
        )
        # ohpm 工具自身有 bug：returncode 不准 + 错误信息可能在 stdout（带 'ohpm ERROR' 关键字）
        # 仅看 returncode 会误判；仅看 stderr 会漏 stdout 里的错误
        output = (result.stdout or '') + '\n' + (result.stderr or '')
        has_ohpm_error = (
            'ohpm ERROR' in output
            or 'install failed' in output.lower()
            or 'File Not Exist' in output
        )
        if result.returncode == 0 and not has_ohpm_error:
            print(f"  ohpm install 完成")
        else:
            # 打印 stdout + stderr 末尾，方便诊断（ohpm 经常把错误信息打到 stdout）
            tail = output.strip()[-400:]
            print(f"  [warn] ohpm install 失败（returncode={result.returncode}）: {tail}")
    except Exception as e:
        print(f"  [warn] ohpm install 异常: {e}")


def _ensure_ffrt_native_lib(example_auto_dir: Path) -> None:
    """补齐 hvigor 不自动收集的 @ppd/ffrt 的 libffrt_cpp.so 到 entry/libs/。

    背景：@ppd/ffrt 是 RNOH 的传递依赖，提供 FFRT（华为 Function Flow Runtime）。
    hvigor 对 nativeComponents 类型的传递依赖存在解析缺陷——新工程第一次 build
    时不会自动从 @ppd/ffrt/libs/<abi>/ 收集 libffrt_cpp.so 到 HAP，导致
    librnoh_semi.so 启动时 dlopen 失败，整个 RNOH native module 起不来，
    app 启动即崩溃（装得上但打不开）。

    历史教训：react_native_measure_text demo 装得上但打不开，根因就是这个。
    解决：手动把 libffrt_cpp.so 拷到 entry/libs/<abi>/，hvigor 会从这里强制
    打包到 HAP。

    注意：本函数只补 libffrt_cpp.so（已知的必需传递依赖）。如果 RNOH 后续升级
    引入新的传递 native 依赖，需要再扩展这里。
    """
    harmony_dir = example_auto_dir / "harmony"
    oh_modules_dir = harmony_dir / "oh_modules"
    if not oh_modules_dir.is_dir():
        print(f"  [warn] oh_modules 不存在，跳过 libffrt_cpp.so 注入")
        return

    # @ppd/ffrt 路径形如 oh_modules/.ohpm/@ppd+ffrt@<hash>/oh_modules/@ppd/ffrt/libs/
    # <hash> 部分随 ohpm install 变化，用前缀匹配扫描
    ffrt_libs_dirs = []
    ospm_cache = oh_modules_dir / ".ohpm"
    scan_roots = [ospm_cache, oh_modules_dir] if ospm_cache.is_dir() else [oh_modules_dir]
    for root in scan_roots:
        for entry in root.iterdir():
            if not entry.is_dir() or not entry.name.startswith("@ppd+ffrt"):
                continue
            ffrt_pkg = entry / "oh_modules" / "@ppd" / "ffrt" / "libs"
            if ffrt_pkg.is_dir():
                ffrt_libs_dirs.append(ffrt_pkg)

    if not ffrt_libs_dirs:
        print(f"  [warn] 未找到 @ppd/ffrt 包，跳过 libffrt_cpp.so 注入")
        return

    entry_libs = harmony_dir / "entry" / "libs"
    copied = 0
    for ffrt_libs in ffrt_libs_dirs:
        for abi_dir in ffrt_libs.iterdir():
            if not abi_dir.is_dir():
                continue
            abi = abi_dir.name  # arm64-v8a / x86_64
            src_so = abi_dir / "libffrt_cpp.so"
            if not src_so.is_file():
                continue
            dst_dir = entry_libs / abi
            dst_dir.mkdir(parents=True, exist_ok=True)
            dst_so = dst_dir / "libffrt_cpp.so"
            if dst_so.exists():
                continue  # 已拷过（rerun 场景）
            shutil.copy2(src_so, dst_so)
            copied += 1
            print(f"  已注入 {abi}/libffrt_cpp.so（@ppd/ffrt 传递依赖，hvigor 不自动收集）")

    if copied == 0:
        print(f"  libffrt_cpp.so 未拷贝（已存在或源文件缺失）")


def find_test_cases_file(adaptation_dir: Path) -> Path | None:
    """查找测试用例 JSON 文件"""
    candidates = ["04-test-cases.json", "test-cases.json"]
    for name in candidates:
        path = adaptation_dir / name
        if path.exists():
            return path
    for f in adaptation_dir.glob("*test-cases*.json"):
        return f
    return None


def load_test_cases(path: Path) -> dict:
    """加载测试用例 JSON"""
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def copy_example_to_auto(plugin_root: Path) -> Path:
    """创建 example_auto 目录并拷贝必要文件（保留已构建环境）。"""
    src = plugin_root / "ohos" / "example"
    dst = plugin_root / "ohos" / "example_auto"

    if not src.exists():
        raise FileNotFoundError(f"example 目录不存在: {src}")

    # 定义忽略模式（排除构建产物和缓存）
    def ignore_patterns(path, names):
        ignore = {
            "node_modules", ".harmony", "build", ".cxx", ".preview",
            "oh_modules", ".hvigor", "package-lock.json",
            ".cache", ".idea", ".deveco",
        }
        return {n for n in names if n in ignore}

    if dst.exists():
        # 保留 node_modules 和 oh_modules（依赖已安装，无需重新 npm install / ohpm install）
        preserved = []
        for name in ["node_modules", "oh_modules"]:
            preserved_path = dst / name
            if preserved_path.exists():
                tmp_path = dst / f"__preserve_{name}"
                preserved_path.rename(tmp_path)
                preserved.append(name)

        # 删除其余内容
        for root, dirs, files in os.walk(dst, topdown=False):
            for name in files:
                filepath = os.path.join(root, name)
                try:
                    os.unlink(filepath)
                except PermissionError:
                    print(f"  跳过被占用: {filepath}")
            for name in dirs:
                if name.startswith("__preserve_"):
                    continue
                dirpath = os.path.join(root, name)
                try:
                    os.rmdir(dirpath)
                except:
                    pass
        for root, dirs, _ in os.walk(dst, topdown=False):
            for name in dirs:
                if name.startswith("__preserve_"):
                    continue
                dirpath = os.path.join(root, name)
                try:
                    os.rmdir(dirpath)
                except:
                    pass
        try:
            os.rmdir(dst)
        except:
            pass

        # 恢复 node_modules / oh_modules
        for name in preserved:
            tmp_path = dst / f"__preserve_{name}"
            if tmp_path.exists():
                tmp_path.rename(dst / name)

        dst.mkdir(parents=True, exist_ok=True)
    else:
        dst.mkdir(parents=True, exist_ok=True)

    # 1. 拷贝 harmony 目录（排除构建产物和缓存）
    harmony_src = src / "harmony"
    harmony_dst = dst / "harmony"
    if harmony_src.exists():
        shutil.copytree(harmony_src, harmony_dst, ignore=ignore_patterns, dirs_exist_ok=True)
        print(f"  拷贝 harmony/ (已排除构建产物和缓存)")

    # 1.1 清理残留缓存（rerun 时 .hvigor/.cxx 可能未被清理，缓存含旧路径）
    # entry/.cxx + entry/build 必须清，否则 CMake 复用旧 junction 路径导致首轮编译失败
    for cache_dir_rel in [".hvigor", ".cxx", "entry/.cxx", "entry/build"]:
        cache_dir = harmony_dst / cache_dir_rel
        if cache_dir.exists():
            try:
                shutil.rmtree(cache_dir)
            except Exception:
                pass

    # 1.1 拷贝 hvigorw 包装脚本（hvigorw.bat / hvigorw，编译 HAP 必需）
    for wrapper in ["hvigorw.bat", "hvigorw.cmd", "hvigorw"]:
        src_wrapper = harmony_src / wrapper
        if src_wrapper.exists():
            shutil.copy2(src_wrapper, harmony_dst / wrapper)
            print(f"  拷贝 {wrapper}")
    # 如果 harmony 根没有，从 example 根目录查找
    for wrapper in ["hvigorw.bat", "hvigorw.cmd", "hvigorw"]:
        src_wrapper = src / wrapper
        if src_wrapper.exists():
            shutil.copy2(src_wrapper, harmony_dst / wrapper)
            print(f"  拷贝 {wrapper} (从 example 根目录)")

    # 2. 拷贝根目录核心文件（不拷贝 App.tsx，由测试页面生成器重新生成）
    source_files = ["app.json", "babel.config.js", "index.js", "metro.config.js", "package.json", "tsconfig.json", ".gitignore"]
    for f in source_files:
        src_file = src / f
        if src_file.exists():
            shutil.copy2(src_file, dst / f)

    # 3. 拷贝 declarations.d.ts 等补丁文件（example 阶段编译修复产物）
    for f in src.iterdir():
        if f.name not in source_files + ["App.tsx", "node_modules", "oh_modules", "harmony", "package-lock.json"] and f.is_file():
            shutil.copy2(f, dst / f.name)

    print(f"[OK] 创建 example_auto（保留 node_modules/oh_modules，已拷贝 harmony + 配置）")
    return dst


def write_test_cases_data(out_dir: Path, test_cases: dict):
    """生成 data/testCases.ts (包含完整信息)"""
    data_dir = out_dir / "data"
    data_dir.mkdir(exist_ok=True)
    
    modules = test_cases.get("modules", [])
    lines = ["// 自动生成的测试用例数据", ""]
    lines.append("export interface TestStep {")
    lines.append("  action: string;")
    lines.append("  checkpoint: string;")
    lines.append("}")
    lines.append("")
    lines.append("export interface TestCase {")
    lines.append("  id: string;")
    lines.append("  title: string;")
    lines.append("  level: string;")
    lines.append("  moduleCode: string;")
    lines.append("  moduleName: string;")
    lines.append("  preconditions: string;")
    lines.append("  testSteps: TestStep[];")
    lines.append("  expectedResult: string;")
    lines.append("  postconditions: string;")
    lines.append("}")
    lines.append("")
    lines.append("export interface Module {")
    lines.append("  code: string;")
    lines.append("  name: string;")
    lines.append("  testCases: TestCase[];")
    lines.append("}")
    lines.append("")
    lines.append("export const modules: Module[] = [")
    
    for module in modules:
        module_code = module.get("moduleCode", "")
        module_name = module.get("moduleName", "")
        test_cases_list = module.get("test_cases", [])
        
        lines.append("  {")
        lines.append(f"    code: '{module_code}',")
        lines.append(f"    name: '{module_name}',")
        lines.append("    testCases: [")
        
        for tc in test_cases_list:
            tc_id = tc.get("id", "")
            tc_title = tc.get("title", "")
            tc_level = tc.get("level", "")
            preconditions = tc.get("preconditions", "")
            expected_result = tc.get("expected_result", "")
            postconditions = tc.get("postconditions", "")
            test_steps = tc.get("test_steps", [])
            
            # 格式化 test_steps
            steps_json = json.dumps(test_steps, ensure_ascii=False, indent=6)
            
            lines.append("      {")
            lines.append(f"        id: '{tc_id}',")
            lines.append(f"        title: '{tc_title}',")
            lines.append(f"        level: '{tc_level}',")
            lines.append(f"        moduleCode: '{module_code}',")
            lines.append(f"        moduleName: '{module_name}',")
            lines.append(f"        preconditions: `{preconditions}`,")
            lines.append(f"        testSteps: {steps_json},")
            lines.append(f"        expectedResult: `{expected_result}`,")
            lines.append(f"        postconditions: `{postconditions}`,")
            lines.append("      },")
        
        lines.append("    ],")
        lines.append("  },")
    
    lines.append("];")
    
    content = "\n".join(lines)
    (data_dir / "testCases.ts").write_text(content, encoding="utf-8")
    print(f"  生成 data/testCases.ts")


def write_result_panel(out_dir: Path):
    """生成 components/ResultPanel.tsx"""
    comp_dir = out_dir / "components"
    comp_dir.mkdir(exist_ok=True)
    
    content = """import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface ResultPanelProps {
  status: 'idle' | 'running' | 'success' | 'fail';
  message: string;
  details?: string;
}

export function ResultPanel({ status, message, details }: ResultPanelProps) {
  const statusColor = {
    idle: '#666',
    running: '#2196F3',
    success: '#4CAF50',
    fail: '#F44336',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>执行结果:</Text>
      <ScrollView style={styles.scroll}>
        <Text
          testID="txt_result"
          style={[styles.text, { color: statusColor[status] }]}
        >
          {message || '待执行'}
        </Text>
        {details && <Text style={styles.details}>{details}</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 12,
    backgroundColor: '#fff',
  },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  scroll: { flex: 1 },
  text: { fontSize: 14, fontFamily: 'monospace' },
  details: { fontSize: 12, color: '#666', marginTop: 4 },
});
"""
    (comp_dir / "ResultPanel.tsx").write_text(content, encoding="utf-8")
    print(f"  生成 components/ResultPanel.tsx")


def write_module_list(out_dir: Path):
    """生成 pages/ModuleList.tsx"""
    pages_dir = out_dir / "pages"
    pages_dir.mkdir(exist_ok=True)
    
    content = """import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Module } from '../data/testCases';

interface ModuleListProps {
  modules: Module[];
  onSelectModule: (module: Module) => void;
}

export function ModuleList({ modules, onSelectModule }: ModuleListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>测试模块列表</Text>
      <FlatList
        data={modules}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            testID={`module_${item.code}`}
            style={styles.card}
            onPress={() => onSelectModule(item)}
          >
            <Text style={styles.title}><Text style={styles.code}>[{item.code}] </Text>{item.name}</Text>
            <Text style={styles.subtitle}>测试用例: {item.testCases.length}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  code: { fontSize: 14, fontWeight: '600', color: '#2196F3' },
  subtitle: { fontSize: 12, color: '#666', marginTop: 4 },
});
"""
    (pages_dir / "ModuleList.tsx").write_text(content, encoding="utf-8")
    print(f"  生成 pages/ModuleList.tsx")


def write_test_case_list(out_dir: Path):
    """生成 pages/TestCaseList.tsx"""
    pages_dir = out_dir / "pages"
    pages_dir.mkdir(exist_ok=True)
    
    content = """import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TestCase } from '../data/testCases';

interface TestCaseListProps {
  moduleName: string;
  testCases: TestCase[];
  onSelectTestCase: (tc: TestCase) => void;
  onBack: () => void;
}

export function TestCaseList({ moduleName, testCases, onSelectTestCase, onBack }: TestCaseListProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回模块列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}>{moduleName}</Text>
      <FlatList
        data={testCases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            testID={`testcase_${item.id}`}
            style={styles.card}
            onPress={() => onSelectTestCase(item)}
          >
            <Text style={styles.title}><Text style={styles.code}>[{item.id}] </Text>{item.title}</Text>
            <Text style={styles.level}>级别: {item.level}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  backButton: { marginBottom: 16 },
  backText: { fontSize: 14, color: '#2196F3' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: { padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8 },
  title: { fontSize: 14, fontWeight: '500' },
  code: { fontSize: 12, fontWeight: '600', color: '#2196F3' },
  level: { fontSize: 12, color: '#666', marginTop: 4 },
});
"""
    (pages_dir / "TestCaseList.tsx").write_text(content, encoding="utf-8")
    print(f"  生成 pages/TestCaseList.tsx")


def write_test_case_detail(out_dir: Path, test_case: dict):
    """为单个测试用例生成独立页面 pages/TestCase_${id}.tsx"""
    pages_dir = out_dir / "pages"
    pages_dir.mkdir(exist_ok=True)
    
    tc_id = test_case.get("id", "Unknown")
    tc_title = test_case.get("title", "")
    tc_level = test_case.get("level", "")
    preconditions = test_case.get("preconditions", "")
    expected_result = test_case.get("expected_result", "")
    postconditions = test_case.get("postconditions", "")
    test_steps = test_case.get("test_steps", [])
    
    safe_id = re.sub(r'[^a-zA-Z0-9]', '_', tc_id)
    component_name = f"TestCase_{safe_id}"
    
    # 生成步骤列表
    steps_lines = []
    for i, step in enumerate(test_steps):
        action = step.get("action", "")
        checkpoint = step.get("checkpoint", "")
        steps_lines.append("          <View style={styles.stepItem}>")
        steps_lines.append("            <Text style={styles.stepText}>" + str(i + 1) + ". " + action + "</Text>")
        if checkpoint:
            steps_lines.append("            <Text style={styles.checkpointText}>[验证点: " + checkpoint + "]</Text>")
        steps_lines.append("          </View>")
    steps_ui = "\n".join(steps_lines)
    
    # 使用字符串拼接避免 f-string 中的 JSX 注释问题
    content = """import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ResultPanel } from '../components/ResultPanel';

interface TestResult {
  status: 'idle' | 'running' | 'success' | 'fail';
  message: string;
  details?: string;
}

interface TestCaseDetailProps {
  onBack: () => void;
}

export function """ + component_name + """({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[""" + tc_id + """] </Text>""" + tc_title + """</Text>
      <Text style={styles.subHeader}>级别: """ + tc_level + """</Text>
      
      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>""" + preconditions + """</Text>
          
          <Text style={styles.infoLabel}>测试步骤:</Text>
""" + steps_ui + """
          
          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>""" + expected_result + """</Text>
          
          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>""" + postconditions + """</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>Actions</Text>
          {/* TODO: 根据测试用例生成操作按钮 */}
          <TouchableOpacity
            testID="btn_placeholder"
            style={styles.actionButton}
            onPress={() => setResult({ status: 'running', message: '执行中...' })}
          >
            <Text style={styles.actionButtonText}>执行测试 (占位)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ResultPanel status={result.status} message={result.message} details={result.details} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  backButton: { padding: 16 },
  backText: { fontSize: 14, color: '#2196F3' },
  header: { fontSize: 20, fontWeight: 'bold', paddingHorizontal: 16 },
  caseId: { fontSize: 16, fontWeight: '600', color: '#2196F3' },
  subHeader: { fontSize: 14, color: '#666', paddingHorizontal: 16, marginBottom: 8 },
  content: { flex: 1, paddingHorizontal: 16 },
  infoCard: { padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 16 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  infoLabel: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  infoValue: { fontSize: 14, color: '#333', marginTop: 2 },
  stepItem: { marginTop: 4 },
  stepText: { fontSize: 14 },
  checkpointText: { fontSize: 12, color: '#2196F3', marginTop: 2 },
  actionsContainer: { marginTop: 8 },
  actionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  actionButton: { padding: 12, backgroundColor: '#2196F3', borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  actionButtonText: { color: '#fff', fontWeight: 'bold' },
});
"""
    
    file_name = f"TestCase_{safe_id}.tsx"
    (pages_dir / file_name).write_text(content, encoding="utf-8")
    return component_name, file_name


def write_app_tsx(out_dir: Path, test_cases: dict):
    """生成 App.tsx (路由容器 - 动态加载所有用例页面)"""
    modules = test_cases.get("modules", [])
    
    # 收集所有用例页面
    imports = ["import React, { useState, useEffect } from 'react';", "import { SafeAreaView, StyleSheet, BackHandler } from 'react-native';"]
    imports.append("import { modules, Module, TestCase } from './data/testCases';")
    imports.append("import { ModuleList } from './pages/ModuleList';")
    imports.append("import { TestCaseList } from './pages/TestCaseList';")
    
    # 生成映射表
    page_map_entries = []
    for module in modules:
        for tc in module.get("test_cases", []):
            safe_id = re.sub(r'[^a-zA-Z0-9]', '_', tc.get("id", ""))
            comp_name = f"TestCase_{safe_id}"
            imports.append(f"import {{ {comp_name} }} from './pages/TestCase_{safe_id}';")
            page_map_entries.append(f"  '{tc.get('id')}': {comp_name},")
    
    page_map_content = "\n".join(page_map_entries)
    
    content = f"""{chr(10).join(imports)}

// 用例 ID 到组件的映射（使用 Record 类型允许字符串索引）
const DetailPages: Record<string, React.ComponentType<{{ onBack: () => void }}>> = {{
{page_map_content}
}};

export default function App() {{
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);

  // 监听返回事件（支持鸿蒙侧滑返回和物理返回键）
  useEffect(() => {{
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {{
      if (selectedTestCase) {{
        setSelectedTestCase(null);
        return true;
      }}
      if (selectedModule) {{
        setSelectedModule(null);
        return true;
      }}
      return false;
    }});
    return () => backHandler.remove();
  }}, [selectedModule, selectedTestCase]);

  // 渲染详情页
  if (selectedTestCase && selectedModule) {{
    const DetailComponent = DetailPages[selectedTestCase.id];
    if (DetailComponent) {{
      return (
        <SafeAreaView style={{styles.container}}>
          <DetailComponent onBack={{() => setSelectedTestCase(null)}} />
        </SafeAreaView>
      );
    }}
  }}

  // 渲染列表页
  if (selectedModule) {{
    return (
      <SafeAreaView style={{styles.container}}>
        <TestCaseList
          moduleName={{selectedModule.name}}
          testCases={{selectedModule.testCases}}
          onSelectTestCase={{setSelectedTestCase}}
          onBack={{() => setSelectedModule(null)}}
        />
      </SafeAreaView>
    );
  }}

  // 渲染模块页
  return (
    <SafeAreaView style={{styles.container}}>
      <ModuleList modules={{modules}} onSelectModule={{setSelectedModule}} />
    </SafeAreaView>
  );
}}

const styles = StyleSheet.create({{
  container: {{ flex: 1 }},
}});
"""
    (out_dir / "App.tsx").write_text(content, encoding="utf-8")
    print(f"  生成 App.tsx (含 {len(page_map_entries)} 个用例路由)")


def main():
    parser = argparse.ArgumentParser(description="生成 RN 插件 Example App (重构版)")
    parser.add_argument("--plugin-root", default=os.getcwd(), help="插件仓库根目录")
    args = parser.parse_args()

    plugin_root = Path(args.plugin_root)
    adaptation_dir = plugin_root / ".rn-ohos-adaptation"

    test_cases_file = find_test_cases_file(adaptation_dir)
    if not test_cases_file:
        print(f"❌ 未找到测试用例文件: {adaptation_dir}")
        return

    print(f"[OK] 找到测试用例文件: {test_cases_file}")
    test_cases = load_test_cases(test_cases_file)

    try:
        example_auto_dir = copy_example_to_auto(plugin_root)
    except FileNotFoundError as e:
        print(f"❌ {e}")
        return

    # 拷贝完成后，注入签名配置
    _inject_signing_to_example_auto(example_auto_dir)
    # 先 npm install，把 @react-native-oh/react-native-harmony 等 npm 包的 .har 装上
    # （ohpm install 依赖 node_modules 里的 .har 文件，必须先 npm install）
    _ensure_node_modules(example_auto_dir)
    # 确保 oh_modules 完整（拷贝 + 强制 ohpm install 补齐 C++ 头文件）
    _ensure_oh_modules(example_auto_dir, plugin_root)
    # 补齐 hvigor 不自动收集的 libffrt_cpp.so（RNOH 传递依赖）
    _ensure_ffrt_native_lib(example_auto_dir)

    print("生成代码结构...")
    write_test_cases_data(example_auto_dir, test_cases)
    write_result_panel(example_auto_dir)
    write_module_list(example_auto_dir)
    write_test_case_list(example_auto_dir)
    
    # 为每个用例生成独立页面
    modules = test_cases.get("modules", [])
    total_cases = 0
    for module in modules:
        for tc in module.get("test_cases", []):
            write_test_case_detail(example_auto_dir, tc)
            total_cases += 1
    
    write_app_tsx(example_auto_dir, test_cases)

    print(f"[OK] 生成完成")
    print(f"   模块数: {len(modules)}")
    print(f"   测试用例数: {total_cases}")
    print(f"   输出目录: {example_auto_dir}")


if __name__ == "__main__":
    main()
