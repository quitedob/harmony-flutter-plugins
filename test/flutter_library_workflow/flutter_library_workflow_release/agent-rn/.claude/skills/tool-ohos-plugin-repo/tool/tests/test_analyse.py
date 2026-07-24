"""rn.py analyse 命令测试

测试用例：
- ANALYSE-01 ~ ANALYSE-28: analyse 命令测试
"""

import json
import os
import unittest

from test_helpers import (
    create_fixture_dir, cleanup_fixture, FIXTURES_DIR,
    run_rn_analyse
)


class TestRnAnalyse(unittest.TestCase):
    """rn.py analyse 命令测试"""

    def tearDown(self):
        for name in ["a01", "a02", "a03", "a04", "a05", "a06", "a07", "a08", "a09", "a10",
                     "a11", "a12", "a13", "a14", "a15", "a16", "a17", "a18", "a19", "a20",
                     "a21", "a22", "a23", "a24", "a25", "a26", "a27", "a28", "a29", "a30",
                     "a31", "a32", "a33", "a34", "a35", "a36", "a37"]:
            path = os.path.join(FIXTURES_DIR, f"analyse_{name}")
            if os.path.exists(path):
                cleanup_fixture(f"analyse_{name}")

    def test_analyse_01_pure_js(self):
        """ANALYSE-01: 纯 JS 无原生"""
        fixture_path = create_fixture_dir("analyse_a01", {
            "package.json": {"name": "test-a01", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")

        self.assertIn("Module Kind: js-only", result.stdout)
        self.assertIn("Source Type: js", result.stdout)
        self.assertIn("NativeModules: False", result.stdout)
        self.assertIn("requireNativeComponent: False", result.stdout)
        self.assertIn("Pure JS/TS module, no migration needed", result.stdout)

    def test_analyse_02_pure_ts(self):
        """ANALYSE-02: 纯 TS 无原生"""
        fixture_path = create_fixture_dir("analyse_a02", {
            "package.json": {"name": "test-a02", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "export const foo = 'bar';",
            "src/utils.ts": "export const helper = () => {};"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")

        self.assertIn("Module Kind: js-only", result.stdout)
        self.assertIn("Source Type: ts", result.stdout)
        self.assertIn("Source Dir:  src", result.stdout)

    def test_analyse_03_old_arch_native_modules(self):
        """ANALYSE-03: 老架构 NativeModules"""
        fixture_path = create_fixture_dir("analyse_a03", {
            "package.json": {"name": "test-a03", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const { RNTestModule, RNOtherModule } = NativeModules;
export const get = RNTestModule.get();
"""
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")

        self.assertIn("Module Kind: turbo", result.stdout)
        self.assertIn("NativeModules: True", result.stdout)
        self.assertIn("RNTestModule", result.stdout)
        self.assertIn("RNOtherModule", result.stdout)
        self.assertIn("need migrate to TurboModule", result.stdout)

    def test_analyse_04_old_arch_require_native_component(self):
        """ANALYSE-04: 老架构 requireNativeComponent"""
        fixture_path = create_fixture_dir("analyse_a04", {
            "package.json": {"name": "test-a04", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { requireNativeComponent } from 'react-native';
const TestView = requireNativeComponent('TestView');
const OtherView = requireNativeComponent('OtherView');
export { TestView, OtherView };
"""
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")

        self.assertIn("Module Kind: fabric", result.stdout)
        self.assertIn("requireNativeComponent: True", result.stdout)
        self.assertIn("TestView", result.stdout)
        self.assertIn("OtherView", result.stdout)
        self.assertIn("need migrate to Fabric", result.stdout)

    def test_analyse_05_old_arch_mixed(self):
        """ANALYSE-05: 老架构混合（NativeModules + requireNativeComponent）"""
        fixture_path = create_fixture_dir("analyse_a05", {
            "package.json": {"name": "test-a05", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules, requireNativeComponent } from 'react-native';
const { RNConfigModule } = NativeModules;
const ConfigView = requireNativeComponent('ConfigView');
export const config = RNConfigModule.getConfig();
export { ConfigView };
"""
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")

        self.assertIn("Module Kind: both", result.stdout)
        self.assertIn("NativeModules: True", result.stdout)
        self.assertIn("requireNativeComponent: True", result.stdout)
        self.assertIn("RNConfigModule", result.stdout)
        self.assertIn("ConfigView", result.stdout)

    def test_analyse_06_new_arch_turbo_spec(self):
        """ANALYSE-06: 新架构 TurboModule Spec"""
        fixture_path = create_fixture_dir("analyse_a06", {
            "package.json": {"name": "test-a06", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "import NativeTest from './specs/NativeTest';",
            "src/specs/NativeTest.ts": """import { TurboModuleRegistry } from 'react-native';
export interface Spec extends TurboModule {
  get(): Promise<string>;
}
export default TurboModuleRegistry.getEnforcing<Spec>('TestModule');
"""
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")

        self.assertIn("Module Kind: turbo", result.stdout)
        self.assertIn("TurboModule Spec: True", result.stdout)
        self.assertIn("TestModule", result.stdout)
        self.assertIn("Source Type: ts", result.stdout)

    def test_analyse_07_new_arch_fabric_spec(self):
        """ANALYSE-07: 新架构 Fabric Spec"""
        fixture_path = create_fixture_dir("analyse_a07", {
            "package.json": {"name": "test-a07", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "import TestView from './specs/TestViewNativeComponent';",
            "src/specs/TestViewNativeComponent.ts": """import { codegenNativeComponent } from 'react-native';
export interface TestViewProps {
  title?: string;
}
export default codegenNativeComponent<TestViewProps>('TestView');
"""
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")

        self.assertIn("Module Kind: fabric", result.stdout)
        self.assertIn("Fabric Spec: True", result.stdout)
        self.assertIn("TestView", result.stdout)

    def test_analyse_08_new_arch_both(self):
        """ANALYSE-08: 新架构混合（TurboModule + Fabric）"""
        fixture_path = create_fixture_dir("analyse_a08", {
            "package.json": {"name": "test-a08", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import NativeTest from './specs/NativeTest';
import TestView from './specs/TestViewNativeComponent';
export const get = NativeTest.get();
export { TestView };
""",
            "src/specs/NativeTest.ts": """import { TurboModuleRegistry } from 'react-native';
export default TurboModuleRegistry.getEnforcing<Spec>('TestTurbo');
""",
            "src/specs/TestViewNativeComponent.ts": """import { codegenNativeComponent } from 'react-native';
export default codegenNativeComponent('TestFabric');
"""
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")

        self.assertIn("Module Kind: both", result.stdout)
        self.assertIn("TurboModule Spec: True", result.stdout)
        self.assertIn("Fabric Spec: True", result.stdout)
        self.assertIn("TestTurbo", result.stdout)
        self.assertIn("TestFabric", result.stdout)

    def test_analyse_09_old_and_new_mixed(self):
        """ANALYSE-09: 老架构 + 新架构混合"""
        fixture_path = create_fixture_dir("analyse_a09", {
            "package.json": {"name": "test-a09", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import { NativeModules } from 'react-native';
import NativeTurbo from './specs/NativeTurbo';

const { RNOldModule } = NativeModules;
export const turboGet = NativeTurbo.get();
export const oldGet = RNOldModule.getData();
""",
            "src/specs/NativeTurbo.ts": """import { TurboModuleRegistry } from 'react-native';
export default TurboModuleRegistry.getEnforcing<Spec>('TurboModule');
"""
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")

        self.assertIn("Module Kind: turbo", result.stdout)
        self.assertIn("TurboModule Spec: True", result.stdout)
        self.assertIn("NativeModules: True", result.stdout)
        self.assertIn("TurboModule", result.stdout)
        self.assertIn("RNOldModule", result.stdout)

    def test_analyse_10_module_names_extraction(self):
        """ANALYSE-10: 模块名称提取准确性"""
        fixture_path = create_fixture_dir("analyse_a10", {
            "package.json": {"name": "test-a10", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';

// 直接访问
export const v1 = NativeModules.RNModuleA.getValue();

// 解构赋值
const { RNModuleB, RNModuleC, RNModuleD } = NativeModules;
export const v2 = RNModuleB.get();
export const v3 = RNModuleC.count;
export const v4 = RNModuleD.fetch();
"""
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")

        self.assertIn("RNModuleA", result.stdout)
        self.assertIn("RNModuleB", result.stdout)
        self.assertIn("RNModuleC", result.stdout)
        self.assertIn("RNModuleD", result.stdout)

    def test_analyse_11_entry_file_detection(self):
        """ANALYSE-11: 入口文件检测"""
        fixture_path = create_fixture_dir("analyse_a11", {
            "package.json": {"name": "test-a11", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "export const foo = 'bar';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("Entry File: src/index.ts", result.stdout)

    def test_analyse_12_single_source_file(self):
        """ANALYSE-12: 单个源码文件"""
        fixture_path = create_fixture_dir("analyse_a12", {
            "package.json": {"name": "test-a12", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 1;"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("Source Files: 1", result.stdout)
        self.assertIn("index.js", result.stdout)

    def test_analyse_13_multi_source_files(self):
        """ANALYSE-13: 多个源码文件（递归依赖）"""
        fixture_path = create_fixture_dir("analyse_a13", {
            "package.json": {"name": "test-a13", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "import { helper } from './utils'; export const main = helper();",
            "src/utils.ts": "import { config } from './config'; export const helper = () => config;",
            "src/config.ts": "export const config = 'config';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("Source Files: 3", result.stdout)
        self.assertIn("src/index.ts", result.stdout)
        self.assertIn("src/utils.ts", result.stdout)
        self.assertIn("src/config.ts", result.stdout)

    def test_analyse_14_deep_dependencies(self):
        """ANALYSE-14: 深层依赖（4层）"""
        fixture_path = create_fixture_dir("analyse_a14", {
            "package.json": {"name": "test-a14", "version": "1.0.0", "main": "index.ts"},
            "index.ts": "export { result } from './src/a';",
            "src/a.ts": "import { b } from './b'; export const result = b();",
            "src/b.ts": "import { c } from './c'; export const b = () => c;",
            "src/c.ts": "import { d } from './d'; export const c = d;",
            "src/d.ts": "export const d = 'deep';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("Source Files: 5", result.stdout)
        self.assertIn("index.ts", result.stdout)
        self.assertIn("src/a.ts", result.stdout)
        self.assertIn("src/b.ts", result.stdout)
        self.assertIn("src/c.ts", result.stdout)
        self.assertIn("src/d.ts", result.stdout)

    def test_analyse_15_dynamic_require(self):
        """ANALYSE-15: 动态 require"""
        fixture_path = create_fixture_dir("analyse_a15", {
            "package.json": {"name": "test-a15", "version": "1.0.0", "main": "index.js"},
            "index.js": "const mod = require(`./modules/${process.env.MOD}`); export default mod;",
            "modules/a.ts": "export const a = 'a';",
            "modules/b.ts": "export const b = 'b';",
            "modules/c.ts": "export const c = 'c';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("Dynamic Require: True", result.stdout)
        self.assertIn("modules/a.ts", result.stdout)
        self.assertIn("modules/b.ts", result.stdout)
        self.assertIn("modules/c.ts", result.stdout)

    def test_analyse_16_dts_association(self):
        """ANALYSE-16: .d.ts 文件关联"""
        fixture_path = create_fixture_dir("analyse_a16", {
            "package.json": {"name": "test-a16", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "import { foo } from './module'; export const bar = foo;",
            "src/module.ts": "export const foo = 'foo';",
            "src/module.d.ts": "declare const foo: string; export { foo };"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("src/module.ts", result.stdout)
        self.assertIn("src/module.d.ts", result.stdout)

    def test_analyse_17_bob_source_priority(self):
        """ANALYSE-17: bob.source 配置优先（源码目录全拷贝）"""
        fixture_path = create_fixture_dir("analyse_a17", {
            "package.json": {
                "name": "test-a17",
                "version": "1.0.0",
                "main": "dist/index.js",
                "react-native-builder-bob": {
                    "source": "src",
                    "output": "dist"
                }
            },
            "src/index.ts": "export const foo = 'bar';",
            "src/utils.ts": "export const helper = () => {};",
            "dist/index.js": "// compiled output"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        # bob.source 目录下的所有文件被解析（不递归依赖）
        self.assertIn("src/index.ts", result.stdout)
        self.assertIn("src/utils.ts", result.stdout)
        self.assertIn("Source Files: 2", result.stdout)

    def test_analyse_18_cross_dir_import(self):
        """ANALYSE-18: 跨目录 import"""
        fixture_path = create_fixture_dir("analyse_a18", {
            "package.json": {"name": "test-a18", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "import { foo } from '../lib/utils'; export const bar = foo;",
            "lib/utils.ts": "export const foo = 'bar';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("lib/utils.ts", result.stdout)

    def test_analyse_19_entry_variations(self):
        """ANALYSE-19: 各种入口字段"""
        fixture_path = create_fixture_dir("analyse_a19", {
            "package.json": {"name": "test-a19", "version": "1.0.0", "react-native": "src/rn.ts"},
            "src/rn.ts": "export const rn = 'rn';",
            "src/index.ts": "export const index = 'index';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("Entry File: src/rn.ts", result.stdout)
        self.assertIn("src/rn.ts", result.stdout)

    def test_analyse_20_source_file_count_large(self):
        """ANALYSE-20: 源码文件数量超过20（显示前10）"""
        fixture_path = create_fixture_dir("analyse_a20", {
            "package.json": {
                "name": "test-a20",
                "version": "1.0.0",
                "main": "dist/index.js",
                "react-native-builder-bob": {
                    "source": "src",
                    "output": "dist"
                }
            },
        })

        # 创建 src 目录
        os.makedirs(os.path.join(fixture_path, "src"), exist_ok=True)

        # 创建25个文件（bob.source 会全目录扫描）
        for i in range(1, 26):
            with open(os.path.join(fixture_path, "src", f"file{i}.ts"), "w") as f:
                f.write(f"export const val{i} = {i};")

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        # bob.source 配置会扫描整个目录
        self.assertIn("Source Files: 25", result.stdout)
        self.assertIn("(showing first 10)", result.stdout)

    def test_analyse_21_entry_priority_main_only(self):
        """ANALYSE-21: 入口优先级 - 只有 main"""
        fixture_path = create_fixture_dir("analyse_a21", {
            "package.json": {"name": "test-a21", "version": "1.0.0", "main": "lib/index.js"},
            "lib/index.js": "export const main = 'main';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("Entry File: lib/index.js", result.stdout)

    def test_analyse_22_entry_priority_module_over_main(self):
        """ANALYSE-22: 入口优先级 - module > main"""
        fixture_path = create_fixture_dir("analyse_a22", {
            "package.json": {
                "name": "test-a22",
                "version": "1.0.0",
                "main": "lib/index.js",
                "module": "esm/index.js"
            },
            "lib/index.js": "export const main = 'main';",
            "esm/index.js": "export const module = 'module';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("Entry File: esm/index.js", result.stdout)

    def test_analyse_23_entry_priority_source_over_module(self):
        """ANALYSE-23: 入口优先级 - source > module > main"""
        fixture_path = create_fixture_dir("analyse_a23", {
            "package.json": {
                "name": "test-a23",
                "version": "1.0.0",
                "main": "lib/index.js",
                "module": "esm/index.js",
                "source": "src/index.ts"
            },
            "lib/index.js": "export const main = 'main';",
            "esm/index.js": "export const module = 'module';",
            "src/index.ts": "export const source = 'source';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("Entry File: src/index.ts", result.stdout)

    def test_analyse_24_entry_priority_react_native_highest(self):
        """ANALYSE-24: 入口优先级 - react-native > source > module > main"""
        fixture_path = create_fixture_dir("analyse_a24", {
            "package.json": {
                "name": "test-a24",
                "version": "1.0.0",
                "main": "lib/index.js",
                "module": "esm/index.js",
                "source": "src/index.ts",
                "react-native": "src/native.ts"
            },
            "lib/index.js": "export const main = 'main';",
            "esm/index.js": "export const module = 'module';",
            "src/index.ts": "export const source = 'source';",
            "src/native.ts": "export const rn = 'rn';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("Entry File: src/native.ts", result.stdout)

    def test_analyse_25_needs_compile_ts(self):
        """ANALYSE-25: 需要编译（TS 源码）"""
        fixture_path = create_fixture_dir("analyse_a25", {
            "package.json": {"name": "test-a25", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "export const foo = 'bar';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("Source Type: ts", result.stdout)
        self.assertIn("Needs Compile: True", result.stdout)

    def test_analyse_26_needs_compile_js(self):
        """ANALYSE-26: 不需要编译（纯 JS）"""
        fixture_path = create_fixture_dir("analyse_a26", {
            "package.json": {"name": "test-a26", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("Source Type: js", result.stdout)
        self.assertIn("Needs Compile: False", result.stdout)

    def test_analyse_27_package_naming_fields(self):
        """ANALYSE-27: 命名字段正确推导"""
        fixture_path = create_fixture_dir("analyse_a27", {
            "package.json": {
                "name": "@react-native-community/async-storage",
                "version": "1.15.0",
                "repository": {"url": "https://github.com/react-native-community/async-storage"},
                "harmony": {"autolinking": {"cmakeLibraryTargetName": "async_storage"}}
            },
            "index.js": "export const storage = 'async';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("NPM Name: @react-native-community/async-storage", result.stdout)
        self.assertIn("Short Name: async_storage", result.stdout)
        self.assertIn("Camel Name: AsyncStorage", result.stdout)
        self.assertIn("OHOS Name: @oh-rn/async-storage", result.stdout)
        self.assertIn("Version: 1.15.0", result.stdout)
        self.assertIn("Autolink:", result.stdout)

    def test_analyse_28_package_naming_simple(self):
        """ANALYSE-28: 简单包名推导"""
        fixture_path = create_fixture_dir("analyse_a28", {
            "package.json": {
                "name": "react-native-fast-image",
                "version": "8.6.3"
            },
            "index.js": "export const image = 'fast';"
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        self.assertIn("NPM Name: react-native-fast-image", result.stdout)
        self.assertIn("Short Name: fast_image", result.stdout)
        self.assertIn("Camel Name: FastImage", result.stdout)
        self.assertIn("OHOS Name: @oh-rn/react-native-fast-image", result.stdout)
        self.assertIn("Autolink:", result.stdout)

    def test_analyse_29_js_source_with_ts_spec(self):
        """ANALYSE-29: 纯 JS 源码 + TS Spec（不需要 bob 编译）"""
        fixture_path = create_fixture_dir("analyse_a29", {
            "package.json": {"name": "test-a29", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';",
            "src/specs/v1/NativeTestModule.ts": """
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  get(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TestModule');
"""
        })

        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0)

        # source_type 应该是 js（排除 spec 文件）
        self.assertIn("Source Type: js", result.stdout)
        # module_kind 应该是 turbo（有 Spec）
        self.assertIn("Module Kind: turbo", result.stdout)
        # Needs Compile 应该是 False
        self.assertIn("Needs Compile: False", result.stdout)

    def test_analyse_30_platform_specific_extensions(self):
        """ANALYSE-30: 平台特定文件扩展名解析
        
        模拟 react_native_month_year_picker 的场景：
        - 入口导入 './MonthPicker'（不带平台后缀）
        - 存在 MonthPicker.android.js 和 MonthPicker.ios.js
        - 两者的依赖都应该被收集
        """
        fixture_path = create_fixture_dir("analyse_a30", {
            "package.json": {"name": "test-a30", "version": "1.0.0", "main": "src/index.js"},
            "src/index.js": "import MonthPicker from './MonthPicker'; export { MonthPicker };",
            # 平台特定文件
            "src/MonthPicker.android.js": """import { NativeModules } from 'react-native';
import { constants } from './constants';
const RNDialog = NativeModules.RNDialog;
export default () => RNDialog.open();
""",
            "src/MonthPicker.ios.js": """import { requireNativeComponent } from 'react-native';
import { constants } from './constants';
const RNPicker = requireNativeComponent('RNPicker');
export default RNPicker;
""",
            # 共用文件
            "src/constants.js": "export const constants = 'constants';",
        })
        
        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")
        
        # 验证所有平台版本的文件都被收集
        self.assertIn("src/MonthPicker.android.js", result.stdout)
        self.assertIn("src/MonthPicker.ios.js", result.stdout)
        self.assertIn("src/constants.js", result.stdout)
        self.assertIn("src/index.js", result.stdout)
        
        # 验证源文件数量（4个）
        self.assertIn("Source Files: 4", result.stdout)
        
        # 验证老架构模块被识别（两个平台的 NativeModules 和 requireNativeComponent）
        self.assertIn("Module Kind: both", result.stdout)
        self.assertIn("NativeModules: True", result.stdout)
        self.assertIn("requireNativeComponent: True", result.stdout)
        self.assertIn("RNDialog", result.stdout)  # 来自 android 版本
        self.assertIn("RNPicker", result.stdout)  # 来自 ios 版本

    def test_analyse_31_types_field_dts_collection(self):
        """ANALYSE-31: 通过 package.json types 字段收集 .d.ts
        
        模拟 react_native_month_year_picker 的场景：
        - package.json: "main": "src/index.js", "types": "index.d.ts"
        - index.d.ts 在根目录（不在 src/ 下）
        
        验证 .d.ts 通过 types 字段被正确收集
        """
        fixture_path = create_fixture_dir("analyse_a31", {
            "package.json": {
                "name": "test-a31",
                "version": "1.0.0",
                "main": "src/index.js",
                "types": "index.d.ts"
            },
            "index.d.ts": """declare module 'test-a31' {
  export function open(config: object): Promise<{action: string}>;
}
""",
            "src/index.js": "export const open = () => Promise.resolve({action: 'saved'});",
        })
        
        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")
        
        # 验证 index.d.ts 被收集
        self.assertIn("index.d.ts", result.stdout)
        self.assertIn("Source Files: 2", result.stdout)  # index.js + index.d.ts
        
        # 验证 source_type 是 js（排除 .d.ts）
        self.assertIn("Source Type: js", result.stdout)

    def test_analyse_32_types_field_in_src(self):
        """ANALYSE-32: types 字段指向 src/ 下的 .d.ts
        
        验证 types 字段指向 src/types/index.d.ts 时也能正确收集
        """
        fixture_path = create_fixture_dir("analyse_a32", {
            "package.json": {
                "name": "test-a32",
                "version": "1.0.0",
                "main": "src/index.ts",
                "types": "src/types/index.d.ts"
            },
            "src/index.ts": "export * from './types';",
            "src/types/index.d.ts": "export interface Config { value: number; }",
        })
        
        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")
        
        # 验证 src/types/index.d.ts 被收集
        self.assertIn("src/types/index.d.ts", result.stdout)
        self.assertIn("Source Type: ts", result.stdout)

    def test_analyse_33_nitro_modules(self):
        """ANALYSE-33: NitroModules 检测
        
        验证 NitroModules.createHybridObject 被正确识别为 turbo 模块
        """
        fixture_path = create_fixture_dir("analyse_a33", {
            "package.json": {"name": "test-a33", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import { NitroModules } from 'react-native-nitro-modules';
const Bluetooth = NitroModules.createHybridObject('BluetoothStateManager');
export const getState = () => Bluetooth.getState();
"""
        })
        
        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")
        
        # 验证 NitroModules 被识别
        self.assertIn("Module Kind: turbo", result.stdout)
        self.assertIn("NitroModules: True", result.stdout)
        self.assertIn("BluetoothStateManager", result.stdout)
        self.assertIn("need migrate to TurboModule", result.stdout)

    def test_analyse_34_nitro_with_fabric(self):
        """ANALYSE-34: NitroModules + Fabric 混合
        
        验证 NitroModules + requireNativeComponent 的组合
        """
        fixture_path = create_fixture_dir("analyse_a34", {
            "package.json": {"name": "test-a34", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import { NitroModules, requireNativeComponent } from 'react-native';
import { NitroModules } from 'react-native-nitro-modules';
const Location = NitroModules.createHybridObject('LocationModule');
const MapView = requireNativeComponent('MapView');
export { Location, MapView };
"""
        })
        
        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")
        
        # 验证混合模块被识别
        self.assertIn("Module Kind: both", result.stdout)
        self.assertIn("NitroModules: True", result.stdout)
        self.assertIn("requireNativeComponent: True", result.stdout)
        self.assertIn("LocationModule", result.stdout)
        self.assertIn("MapView", result.stdout)

    def test_analyse_35_nitro_with_generic(self):
        """ANALYSE-35: NitroModules 带泛型参数
        
        验证 NitroModules.createHybridObject<Spec>('Name') 被正确识别
        这是 react-native-bluetooth-state-manager 等库的实际使用方式
        """
        fixture_path = create_fixture_dir("analyse_a35", {
            "package.json": {"name": "test-a35", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import { NitroModules } from 'react-native-nitro-modules';
import type { BluetoothState } from './specs/BluetoothStateManager.nitro';

const module = NitroModules.createHybridObject<BluetoothStateManagerSpec>('BluetoothStateManager');
export const getState = () => module.getState();
""",
        })
        
        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")
        
        # 验证带泛型的 NitroModules 被识别
        self.assertIn("Module Kind: turbo", result.stdout)
        self.assertIn("NitroModules: True", result.stdout)
        self.assertIn("BluetoothStateManager", result.stdout)
        self.assertIn("need migrate to TurboModule", result.stdout)

    def test_analyse_36_nitro_multiline(self):
        """ANALYSE-36: NitroModules 跨行调用
        
        验证跨行的 NitroModules.createHybridObject 被正确识别
        """
        fixture_path = create_fixture_dir("analyse_a36", {
            "package.json": {"name": "test-a36", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import { NitroModules } from 'react-native-nitro-modules';

const module = NitroModules.createHybridObject(
  'BluetoothStateManager'
);
export default module;
""",
        })
        
        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")
        
        # 验证跨行的 NitroModules 被识别
        self.assertIn("Module Kind: turbo", result.stdout)
        self.assertIn("NitroModules: True", result.stdout)
        self.assertIn("BluetoothStateManager", result.stdout)

    def test_analyse_37_nitro_multiline_generic_comma(self):
        """ANALYSE-37: NitroModules 跨行+泛型+逗号
        
        验证完整的跨行格式被正确识别（react-native-bluetooth-state-manager 实际代码格式）
        """
        fixture_path = create_fixture_dir("analyse_a37", {
            "package.json": {"name": "test-a37", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import { NitroModules } from 'react-native-nitro-modules';

const module = NitroModules.createHybridObject<RNBluetoothStateMangerSpec>(
  'BluetoothStateManager',
);
export default module;
""",
        })
        
        result = run_rn_analyse(fixture_path)
        self.assertEqual(result.returncode, 0, f"analyse failed: {result.stderr}")
        
        # 验证完整跨行格式被识别
        self.assertIn("Module Kind: turbo", result.stdout)
        self.assertIn("NitroModules: True", result.stdout)
        self.assertIn("BluetoothStateManager", result.stdout)


if __name__ == "__main__":
    unittest.main()
