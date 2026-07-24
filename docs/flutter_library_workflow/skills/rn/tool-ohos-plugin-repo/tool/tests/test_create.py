"""rn.py create 命令测试（旧版）

测试用例：
- CREATE-01 ~ CREATE-34: 旧版 create 命令测试
"""

import json
import os
import unittest

from test_helpers import (
    create_fixture_dir, cleanup_fixture, FIXTURES_DIR,
    cleanup_ohos, read_json, read_file, file_exists, dir_exists,
    run_rn_create, run_rn_migrate
)


class TestRnCreate(unittest.TestCase):
    """rn.py create 命令测试"""

    def tearDown(self):
        for name in [
            "c01", "c02", "c03", "c04", "c05", "c06", "c07",
            "c08", "c09", "c10", "c11", "c12", "c13", "c14",
            "c15", "c16", "c17", "c18", "c19", "c20", "c21",
            "c22", "c23", "c24", "c25", "c26", "c27", "c28",
            "c29", "c30", "c31", "c32", "c33", "c34", "c35",
            "c35b", "c36"
        ]:
            path = os.path.join(FIXTURES_DIR, f"create_{name}")
            if os.path.exists(path):
                cleanup_ohos(path)
                cleanup_fixture(f"create_{name}")

    def test_create_01_pure_js(self):
        """CREATE-01: 纯 JS 无原生"""
        fixture_path = create_fixture_dir("create_c01", {
            "package.json": {"name": "test-c01", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';",
            "index.d.ts": "declare const foo: string;\nexport { foo };"
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(file_exists(os.path.join(ohos_src, "index.js")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "index.d.ts")))

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertEqual(pkg["main"], "./src/index.js")
        self.assertNotIn("react-native-builder-bob", pkg)
        self.assertNotIn("codegen-lib", pkg.get("scripts", {}))
        self.assertNotIn("autolinking", pkg.get("harmony", {}))
        self.assertFalse(dir_exists(os.path.join(fixture_path, "ohos", "harmony")))

    def test_create_02_js_with_native(self):
        """CREATE-02: JS 有原生（老架构 NativeModules）"""
        fixture_path = create_fixture_dir("create_c02", {
            "package.json": {"name": "test-c02", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const { RNTestModule } = NativeModules;
export const getVersion = () => RNTestModule.getVersion();
export const appVersion = RNTestModule.appVersion;
""",
            "index.d.ts": """declare namespace TestModule {
  export const appVersion: string;
  export function getVersion(): Promise<string>;
}
export default TestModule;
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        self.assertTrue(file_exists(os.path.join(fixture_path, "ohos", "src", "index.js")))
        self.assertTrue(dir_exists(os.path.join(fixture_path, "ohos", "harmony")))

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertEqual(pkg["main"], "./src/index.js")
        self.assertNotIn("react-native-builder-bob", pkg)
        self.assertIn("codegen-lib", pkg.get("scripts", {}))
        self.assertIn("autolinking", pkg.get("harmony", {}))

    def test_create_03_ts_no_native(self):
        """CREATE-03: TS 无原生"""
        fixture_path = create_fixture_dir("create_c03", {
            "package.json": {"name": "test-c03", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "import { helper } from './utils';\nexport const foo = helper();",
            "src/utils.ts": "export const helper = () => 'helper';"
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(file_exists(os.path.join(ohos_src, "index.ts")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "utils.ts")))

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertEqual(pkg["main"], "./dist/commonjs/index.js")
        self.assertIn("react-native-builder-bob", pkg)
        self.assertNotIn("codegen-lib", pkg.get("scripts", {}))
        self.assertFalse(dir_exists(os.path.join(fixture_path, "ohos", "harmony")))

    def test_create_04_ts_with_turbo(self):
        """CREATE-04: TS 有原生（新架构 TurboModule）"""
        fixture_path = create_fixture_dir("create_c04", {
            "package.json": {"name": "test-c04", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "import NativeTest from './specs/NativeTest';\nexport const get = NativeTest.getVersion();",
            "src/specs/NativeTest.ts": """import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getVersion(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TestModule');
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        self.assertTrue(file_exists(os.path.join(fixture_path, "ohos", "src", "specs", "v1", "NativeTest.ts")))
        self.assertTrue(dir_exists(os.path.join(fixture_path, "ohos", "harmony")))

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertIn("codegen-lib", pkg.get("scripts", {}))
        self.assertIn("NativeTest.ts", pkg.get("scripts", {}).get("codegen-lib", ""))

    def test_create_05_ts_old_arch(self):
        """CREATE-05: TS 有原生（老架构 NativeModules）"""
        fixture_path = create_fixture_dir("create_c05", {
            "package.json": {"name": "test-c05", "version": "1.0.0", "main": "index.ts"},
            "index.ts": """import { NativeModules } from 'react-native';
const { RNOldModule } = NativeModules;
export const get = () => RNOldModule.getData('p1', 'p2');
export const version = RNOldModule.version;
""",
            "index.d.ts": """interface OldModule {
  version: string;
  count: number;
  getData(p1: string, p2: string): Promise<string>;
}
declare const OldModule: OldModule;
export default OldModule;
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        self.assertTrue(dir_exists(os.path.join(fixture_path, "ohos", "harmony")))

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertEqual(pkg["main"], "./dist/commonjs/index.js")
        self.assertIn("react-native-builder-bob", pkg)
        self.assertIn("codegen-lib", pkg.get("scripts", {}))

    def test_create_06_entry_root_dep_src(self):
        """CREATE-06: 入口在根目录，依赖在 src"""
        fixture_path = create_fixture_dir("create_c06", {
            "package.json": {"name": "test-c06", "version": "1.0.0", "main": "index.ts"},
            "index.ts": "export { foo } from './src/module';",
            "src/module.ts": "import { helper } from './utils';\nexport const foo = helper();",
            "src/utils.ts": "export const helper = () => 'helper';"
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(file_exists(os.path.join(ohos_src, "index.ts")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "module.ts")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "utils.ts")))

    def test_create_07_cross_dir_import(self):
        """CREATE-07: 跨目录 import 重写"""
        fixture_path = create_fixture_dir("create_c07", {
            "package.json": {"name": "test-c07", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "import { foo } from '../lib/utils';\nexport const bar = foo;",
            "lib/utils.ts": "export const foo = 'bar';"
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(file_exists(os.path.join(ohos_src, "index.ts")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "utils.ts")))

        content = read_file(os.path.join(ohos_src, "index.ts"))
        self.assertIn("./utils", content)
        self.assertNotIn("../lib", content)

    def test_create_08_bob_config(self):
        """CREATE-08: bob 配置优先"""
        fixture_path = create_fixture_dir("create_c08", {
            "package.json": {
                "name": "test-c08",
                "version": "1.0.0",
                "main": "dist/index.js",
                "react-native-builder-bob": {
                    "source": "src",
                    "output": "dist"
                }
            },
            "src/index.ts": "export const foo = 'bar';",
            "src/module.ts": "export const bar = 1;",
            "dist/index.js": "// compiled"
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(file_exists(os.path.join(ohos_src, "index.ts")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "module.ts")))
        self.assertFalse(file_exists(os.path.join(ohos_src, "dist", "index.js")))

    def test_create_09_dynamic_require(self):
        """CREATE-09: 动态 require"""
        fixture_path = create_fixture_dir("create_c09", {
            "package.json": {"name": "test-c09", "version": "1.0.0", "main": "index.js"},
            "index.js": "const mod = require(`./modules/${process.env.MOD}`);\nexport default mod;",
            "modules/a.ts": "export const a = 'a';",
            "modules/b.ts": "export const b = 'b';"
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(dir_exists(os.path.join(ohos_src, "modules")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "modules", "a.ts")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "modules", "b.ts")))

    def test_create_10_incremental(self):
        """CREATE-10: 增量补充（ohos 已存在，src 缺失）"""
        fixture_path = create_fixture_dir("create_c10", {
            "package.json": {"name": "test-c10", "version": "1.0.0", "main": "index.js"},
            "ohos/package.json": {"name": "@oh-rn/test-c10"},
            "index.js": "export const foo = 'bar';"
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        self.assertTrue(file_exists(os.path.join(fixture_path, "ohos", "src", "index.js")))

    def test_create_14_incremental_replaces_oh_package_npm_name(self):
        """CREATE-14: 增量补充时替换 harmony/oh-package.json5 的 {{NPM_NAME}}"""
        fixture_path = create_fixture_dir("create_c14", {
            "package.json": {
                "name": "@oh-rn/react-native-test-c14",
                "version": "1.0.0",
                "main": "index.js",
            },
            "index.js": """import { NativeModules } from 'react-native';
const { NativeTestC14 } = NativeModules;
export const get = NativeTestC14.get();
""",
            "src/specs/NativeTestC14.ts": """import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
export interface Spec extends TurboModule {
  get(): Promise<string>;
}
export default TurboModuleRegistry.getEnforcing<Spec>('NativeTestC14');
""",
            "ohos/package.json": {
                "name": "@oh-rn/react-native-test-c14",
                "version": "1.0.0",
            },
            "ohos/harmony/test_c14/oh-package.json5": (
                '{\n  "name": "{{NPM_NAME}}",\n  "main": "index.ets",\n  "version": "1.0.0"\n}\n'
            ),
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        oh_pkg = os.path.join(fixture_path, "ohos", "harmony", "test_c14", "oh-package.json5")
        self.assertTrue(file_exists(oh_pkg))
        content = read_file(oh_pkg)
        self.assertNotIn("{{NPM_NAME}}", content)
        self.assertIn("@oh-rn/react-native-test-c14", content)

    def test_create_11_force(self):
        """CREATE-11: --force 重建"""
        fixture_path = create_fixture_dir("create_c11", {
            "package.json": {"name": "test-c11", "version": "1.0.0", "main": "index.js"},
            "ohos/package.json": {"name": "@oh-rn/test-c11-old"},
            "index.js": "export const foo = 'bar';"
        })

        result = run_rn_create(fixture_path, ["--force"])
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertIn("test-c11", pkg.get("name", ""))

    def test_create_12_light_skip_deps(self):
        """CREATE-12: --light 跳过 node_modules/oh_modules"""
        fixture_path = create_fixture_dir("create_c12", {
            "package.json": {"name": "test-c12", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';"
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_dir = os.path.join(fixture_path, "ohos")
        self.assertFalse(dir_exists(os.path.join(ohos_dir, "node_modules")))
        self.assertFalse(dir_exists(os.path.join(ohos_dir, "oh_modules")))

        if dir_exists(os.path.join(ohos_dir, "harmony", "test_c12")):
            self.assertFalse(dir_exists(os.path.join(ohos_dir, "harmony", "test_c12", "oh_modules")))

    def test_create_13_fabric_component(self):
        """CREATE-13: Fabric 组件（新架构）"""
        fixture_path = create_fixture_dir("create_c13", {
            "package.json": {"name": "test-c13", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "import TestView from './specs/TestViewNativeComponent';\nexport { TestView };",
            "src/specs/TestViewNativeComponent.ts": """import type { HostComponent } from 'react-native';
import { codegenNativeComponent } from 'react-native';

export interface TestViewProps {
  title?: string;
  color?: string;
}

export default codegenNativeComponent<TestViewProps>('TestView');
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        self.assertTrue(file_exists(os.path.join(fixture_path, "ohos", "src", "specs", "v1", "TestViewNativeComponent.ts")))
        self.assertTrue(dir_exists(os.path.join(fixture_path, "ohos", "harmony")))

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertIn("codegen-lib", pkg.get("scripts", {}))
        self.assertIn("TestViewNativeComponent.ts", pkg.get("scripts", {}).get("codegen-lib", ""))

    def test_create_14_require_native_component(self):
        """CREATE-14: requireNativeComponent（老架构 UI 组件）"""
        fixture_path = create_fixture_dir("create_c14", {
            "package.json": {"name": "test-c14", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { requireNativeComponent } from 'react-native';
const OldView = requireNativeComponent('OldView');
export default OldView;
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        self.assertTrue(dir_exists(os.path.join(fixture_path, "ohos", "harmony")))

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertIn("codegen-lib", pkg.get("scripts", {}))

    def test_create_15_entry_rename(self):
        """CREATE-15: 入口重命名（main.js → index.js）"""
        fixture_path = create_fixture_dir("create_c15", {
            "package.json": {"name": "test-c15", "version": "1.0.0", "main": "main.js"},
            "main.js": "export { helper } from './utils';\nexport const foo = 'bar';",
            "utils.js": "export const helper = () => {};"
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(file_exists(os.path.join(ohos_src, "index.js")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "utils.js")))

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertEqual(pkg["main"], "./src/index.js")

    def test_create_16_spec_non_standard_location(self):
        """CREATE-16: Spec 文件在非标准位置（src/NativeModule.ts）"""
        fixture_path = create_fixture_dir("create_c16", {
            "package.json": {"name": "test-c16", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "import NativeTest from './NativeTest';\nexport const get = NativeTest.getVersion();",
            "src/NativeTest.ts": """import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getVersion(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TestModule');
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        self.assertTrue(file_exists(os.path.join(fixture_path, "ohos", "src", "specs", "v1", "NativeTest.ts")))
        self.assertFalse(file_exists(os.path.join(fixture_path, "ohos", "src", "NativeTest.ts")))

    def test_create_17_deep_recursive_deps(self):
        """CREATE-17: 多层递归依赖（4 层）"""
        fixture_path = create_fixture_dir("create_c17", {
            "package.json": {"name": "test-c17", "version": "1.0.0", "main": "index.ts"},
            "index.ts": "export { result } from './src/a';",
            "src/a.ts": "import { b } from './b';\nexport const result = b();",
            "src/b.ts": "import { c } from './c';\nexport const b = () => c;",
            "src/c.ts": "import { d } from './d';\nexport const c = d;",
            "src/d.ts": "export const d = 'deep';"
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(file_exists(os.path.join(ohos_src, "index.ts")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "a.ts")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "b.ts")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "c.ts")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "d.ts")))

    def test_create_18_dts_interface_format(self):
        """CREATE-18: .d.ts interface 格式"""
        fixture_path = create_fixture_dir("create_c18", {
            "package.json": {"name": "test-c18", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNInterfaceModule = NativeModules.RNInterfaceModule;
export const name = RNInterfaceModule.name;
export const count = RNInterfaceModule.count;
export const get = RNInterfaceModule.get();
""",
            "index.d.ts": """interface InterfaceModule {
  name: string;
  count: number;
  get(): Promise<string>;
}
declare const InterfaceModule: InterfaceModule;
export default InterfaceModule;
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        spec_content = read_file(os.path.join(ohos_src, "specs", "v1", spec_files[0]))
        # 常量应该在 getConstants() 中
        self.assertIn("getConstants()", spec_content)
        self.assertIn("name: string", spec_content)
        self.assertIn("count: number", spec_content)
        self.assertIn("get(): Promise", spec_content)

    def test_create_19_dts_type_format(self):
        """CREATE-19: .d.ts type 格式"""
        fixture_path = create_fixture_dir("create_c19", {
            "package.json": {"name": "test-c19", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNTypeModule = NativeModules.RNTypeModule;
export const value = RNTypeModule.value;
export const enabled = RNTypeModule.enabled;
""",
            "index.d.ts": """type TypeModule = {
  value: string;
  enabled: boolean;
}
declare const TypeModule: TypeModule;
export default TypeModule;
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        spec_content = read_file(os.path.join(ohos_src, "specs", "v1", spec_files[0]))
        # 常量应该在 getConstants() 中
        self.assertIn("getConstants()", spec_content)
        self.assertIn("value: string", spec_content)
        self.assertIn("enabled: boolean", spec_content)

    def test_create_20_idempotent_create(self):
        """CREATE-20: 幂等性：create → create（无变化）"""
        fixture_path = create_fixture_dir("create_c20", {
            "package.json": {"name": "test-c20", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';"
        })

        result1 = run_rn_create(fixture_path)
        self.assertEqual(result1.returncode, 0)

        pkg1 = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        index1 = read_file(os.path.join(fixture_path, "ohos", "src", "index.js"))

        result2 = run_rn_create(fixture_path)
        self.assertEqual(result2.returncode, 0)

        pkg2 = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        index2 = read_file(os.path.join(fixture_path, "ohos", "src", "index.js"))

        self.assertEqual(pkg1["name"], pkg2["name"])
        self.assertEqual(pkg1["main"], pkg2["main"])
        self.assertEqual(index1, index2)

    def test_create_21_dts_with_d_ts_only(self):
        """CREATE-21: 只有 .d.ts 文件（无 .ts/.tsx）"""
        fixture_path = create_fixture_dir("create_c21", {
            "package.json": {"name": "test-c21", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';",
            "index.d.ts": "declare const foo: string;\nexport { foo };"
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(file_exists(os.path.join(ohos_src, "index.js")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "index.d.ts")))

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertEqual(pkg["main"], "./src/index.js")
        self.assertNotIn("react-native-builder-bob", pkg)

    def test_create_22_turbo_and_fabric_both(self):
        """CREATE-22: TurboModule + Fabric 同时存在"""
        fixture_path = create_fixture_dir("create_c22", {
            "package.json": {"name": "test-c22", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import NativeTest from './specs/NativeTest';
import TestView from './specs/TestView';
export const get = NativeTest.getVersion();
export { TestView };
""",
            "src/specs/NativeTest.ts": """import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
export interface Spec extends TurboModule {
  getVersion(): Promise<string>;
}
export default TurboModuleRegistry.getEnforcing<Spec>('TestModule');
""",
            "src/specs/TestView.ts": """import type { HostComponent } from 'react-native';
import { codegenNativeComponent } from 'react-native';
export interface TestViewProps {
  title?: string;
}
export default codegenNativeComponent<TestViewProps>('TestView');
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(file_exists(os.path.join(ohos_src, "specs", "v1", "NativeTest.ts")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "specs", "v1", "TestView.ts")))
        self.assertTrue(dir_exists(os.path.join(fixture_path, "ohos", "harmony")))

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertIn("codegen-lib", pkg.get("scripts", {}))

    def test_create_23_new_old_arch_mixed(self):
        """CREATE-23: 新老架构混合（TurboModule + NativeModules）"""
        fixture_path = create_fixture_dir("create_c23", {
            "package.json": {"name": "test-c23", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import { NativeModules } from 'react-native';
import NativeTurbo from './specs/NativeTurbo';

const { RNOldModule } = NativeModules;

export const turboGet = NativeTurbo.get();
export const oldGet = RNOldModule.getData();
""",
            "src/specs/NativeTurbo.ts": """import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
export interface Spec extends TurboModule {
  get(): Promise<string>;
}
export default TurboModuleRegistry.getEnforcing<Spec>('TurboModule');
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(file_exists(os.path.join(ohos_src, "specs", "v1", "NativeTurbo.ts")))
        self.assertTrue(dir_exists(os.path.join(fixture_path, "ohos", "harmony")))

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertIn("codegen-lib", pkg.get("scripts", {}))
        self.assertIn("autolinking", pkg.get("harmony", {}))

    def test_create_24_turbo_get_vs_getEnforcing(self):
        """CREATE-24: TurboModule get vs getEnforcing"""
        fixture_path = create_fixture_dir("create_c24", {
            "package.json": {"name": "test-c24", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import NativeEnforcing from './specs/NativeEnforcing';
import NativeOptional from './specs/NativeOptional';

export const enforce = NativeEnforcing.getValue();
export const optional = NativeOptional?.getName();
""",
            "src/specs/NativeEnforcing.ts": """import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
export interface Spec extends TurboModule {
  getValue(): Promise<string>;
}
export default TurboModuleRegistry.getEnforcing<Spec>('EnforcingModule');
""",
            "src/specs/NativeOptional.ts": """import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
export interface Spec extends TurboModule {
  getName(): Promise<string>;
}
export default TurboModuleRegistry.get<Spec>('OptionalModule');
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(file_exists(os.path.join(ohos_src, "specs", "v1", "NativeEnforcing.ts")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "specs", "v1", "NativeOptional.ts")))
        self.assertTrue(dir_exists(os.path.join(fixture_path, "ohos", "harmony")))

    def test_create_25_fabric_complex_props(self):
        """CREATE-25: Fabric 多种属性类型（string/number/boolean/回调）"""
        fixture_path = create_fixture_dir("create_c25", {
            "package.json": {"name": "test-c25", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "import ComplexView from './specs/ComplexView';\nexport { ComplexView };",
            "src/specs/ComplexView.ts": """import type { HostComponent } from 'react-native';
import { codegenNativeComponent } from 'react-native';

export interface ComplexViewProps {
  title?: string;
  count?: number;
  enabled?: boolean;
  onPress?: () => void;
  onChange?: (value: string) => void;
}

export default codegenNativeComponent<ComplexViewProps>('ComplexView');
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_file = os.path.join(ohos_src, "specs", "v1", "ComplexView.ts")
        self.assertTrue(file_exists(spec_file))
        self.assertTrue(dir_exists(os.path.join(fixture_path, "ohos", "harmony")))

        spec_content = read_file(spec_file)
        self.assertIn("ComplexViewProps", spec_content)
        self.assertIn("onPress", spec_content)

    def test_create_26_native_modules_destructuring(self):
        """CREATE-26: NativeModules 解构赋值"""
        fixture_path = create_fixture_dir("create_c26", {
            "package.json": {"name": "test-c26", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';

const { RNA, RNB, RNC } = NativeModules;

export const a = RNA.getValue();
export const b = RNB.getName();
export const c = RNC.enabled;
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        self.assertTrue(file_exists(os.path.join(fixture_path, "ohos", "src", "index.js")))
        self.assertTrue(dir_exists(os.path.join(fixture_path, "ohos", "harmony")))

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertIn("codegen-lib", pkg.get("scripts", {}))

    def test_create_27_native_modules_direct_access(self):
        """CREATE-27: NativeModules 直接访问"""
        fixture_path = create_fixture_dir("create_c27", {
            "package.json": {"name": "test-c27", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';

export const value = NativeModules.RNDirect.getValue();
export const name = NativeModules.RNDirect.name;
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        self.assertTrue(dir_exists(os.path.join(fixture_path, "ohos", "harmony")))

    def test_create_28_ui_and_module_mixed(self):
        """CREATE-28: requireNativeComponent + NativeModules 混合"""
        fixture_path = create_fixture_dir("create_c28", {
            "package.json": {"name": "test-c28", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules, requireNativeComponent } from 'react-native';

const { RNConfigModule } = NativeModules;
const OldView = requireNativeComponent('OldView');

export const config = RNConfigModule.getConfig();
export { OldView };
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        self.assertTrue(dir_exists(os.path.join(fixture_path, "ohos", "harmony")))

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertIn("codegen-lib", pkg.get("scripts", {}))

    def test_create_29_example_with_native(self):
        """CREATE-29: example 目录拷贝（有原生模块）"""
        fixture_path = create_fixture_dir("create_c29", {
            "package.json": {"name": "test-c29", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const { RNTest } = NativeModules;
export const get = RNTest.get();
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_dir = os.path.join(fixture_path, "ohos")
        self.assertTrue(dir_exists(os.path.join(ohos_dir, "example")))
        self.assertTrue(file_exists(os.path.join(ohos_dir, "example", "package.json")))
        self.assertTrue(file_exists(os.path.join(ohos_dir, "example", "App.tsx")))
        self.assertFalse(dir_exists(os.path.join(ohos_dir, "example", "node_modules")))

    def test_create_30_example_no_native(self):
        """CREATE-30: example 目录拷贝（无原生模块）"""
        fixture_path = create_fixture_dir("create_c30", {
            "package.json": {"name": "test-c30", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';"
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_dir = os.path.join(fixture_path, "ohos")
        self.assertTrue(dir_exists(os.path.join(ohos_dir, "example")))
        self.assertFalse(dir_exists(os.path.join(ohos_dir, "harmony")))
        self.assertFalse(dir_exists(os.path.join(ohos_dir, ".rn-build", "har_wrapper")))

    def test_create_31_har_wrapper_with_native(self):
        """CREATE-31: har_wrapper 目录拷贝（有原生模块）"""
        fixture_path = create_fixture_dir("create_c31", {
            "package.json": {"name": "test-c31", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const { RNTest } = NativeModules;
export const get = RNTest.get();
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_dir = os.path.join(fixture_path, "ohos")
        har_wrapper_dir = os.path.join(ohos_dir, ".rn-build", "har_wrapper")
        self.assertTrue(dir_exists(har_wrapper_dir))
        self.assertTrue(file_exists(os.path.join(har_wrapper_dir, "build-profile.json5")))
        # library 已重命名为 short_name (test_c31)
        self.assertTrue(dir_exists(os.path.join(har_wrapper_dir, "test_c31")))
        self.assertFalse(dir_exists(os.path.join(har_wrapper_dir, "oh_modules")))
        self.assertFalse(dir_exists(os.path.join(har_wrapper_dir, "build")))

    def test_create_32_har_wrapper_no_native(self):
        """CREATE-32: har_wrapper 不拷贝（无原生模块）"""
        fixture_path = create_fixture_dir("create_c32", {
            "package.json": {"name": "test-c32", "version": "1.0.0", "main": "index.js"},
            "index.js": "export const foo = 'bar';"
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_dir = os.path.join(fixture_path, "ohos")
        self.assertFalse(dir_exists(os.path.join(ohos_dir, ".rn-build", "har_wrapper")))
        self.assertFalse(dir_exists(os.path.join(ohos_dir, "harmony")))

    def test_create_33_light_skip_compile_artifacts(self):
        """CREATE-33: --light 跳过编译产物"""
        fixture_path = create_fixture_dir("create_c33", {
            "package.json": {"name": "test-c33", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const { RNTest } = NativeModules;
export const get = RNTest.get();
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_dir = os.path.join(fixture_path, "ohos")
        
        # 检查 ohos 根目录编译产物被跳过
        self.assertFalse(dir_exists(os.path.join(ohos_dir, "node_modules")))
        
        # 检查 example 编译产物被跳过
        example_dir = os.path.join(ohos_dir, "example")
        self.assertFalse(dir_exists(os.path.join(example_dir, "node_modules")))
        if dir_exists(os.path.join(example_dir, "harmony")):
            self.assertFalse(dir_exists(os.path.join(example_dir, "harmony", "node_modules")))
            self.assertFalse(dir_exists(os.path.join(example_dir, "harmony", "oh_modules")))
            self.assertFalse(dir_exists(os.path.join(example_dir, "harmony", "build")))
        
        # 检查 harmony 编译产物被跳过
        harmony_dir = os.path.join(ohos_dir, "harmony", "test_c33")
        if dir_exists(harmony_dir):
            self.assertFalse(dir_exists(os.path.join(harmony_dir, "oh_modules")))
            self.assertFalse(dir_exists(os.path.join(harmony_dir, "build")))
            self.assertFalse(dir_exists(os.path.join(harmony_dir, ".cxx")))
            self.assertFalse(dir_exists(os.path.join(harmony_dir, ".hvigor")))
        
        # 检查 har_wrapper 编译产物被跳过
        har_wrapper_dir = os.path.join(ohos_dir, ".rn-build", "har_wrapper")
        if dir_exists(har_wrapper_dir):
            self.assertFalse(dir_exists(os.path.join(har_wrapper_dir, "oh_modules")))
            self.assertFalse(dir_exists(os.path.join(har_wrapper_dir, "build")))

    def test_create_34_light_not_skip_non_compile(self):
        """CREATE-34: --light 不跳过非编译产物"""
        fixture_path = create_fixture_dir("create_c34", {
            "package.json": {"name": "test-c34", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const { RNTest } = NativeModules;
export const get = RNTest.get();
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_dir = os.path.join(fixture_path, "ohos")
        
        # 检查非编译产物被拷贝
        self.assertTrue(dir_exists(os.path.join(ohos_dir, "example")))
        self.assertTrue(dir_exists(os.path.join(ohos_dir, "harmony", "test_c34")))
        self.assertTrue(dir_exists(os.path.join(ohos_dir, ".rn-build", "har_wrapper")))
        
        # 检查 .rn-build 目录存在（非编译产物）
        self.assertTrue(dir_exists(os.path.join(ohos_dir, ".rn-build")))
        
        # 检查 har_wrapper 目录结构完整
        har_wrapper_dir = os.path.join(ohos_dir, ".rn-build", "har_wrapper")
        self.assertTrue(file_exists(os.path.join(har_wrapper_dir, "build-profile.json5")))
        # library 已重命名为 short_name (test_c34)
        self.assertTrue(dir_exists(os.path.join(har_wrapper_dir, "test_c34")))
        self.assertTrue(dir_exists(os.path.join(har_wrapper_dir, "entry")))

    def test_create_35_js_source_with_ts_spec(self):
        """CREATE-35: 纯 JS 源码 + TS Spec（不需要 bob 编译）"""
        fixture_path = create_fixture_dir("create_c35", {
            "package.json": {"name": "test-c35", "version": "1.0.0", "main": "index.js"},
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

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_dir = os.path.join(fixture_path, "ohos")
        
        # 检查 spec 文件被拷贝
        self.assertTrue(file_exists(os.path.join(ohos_dir, "src", "specs", "v1", "NativeTestModule.ts")))
        
        # 检查 package.json 没有 bob 编译配置
        pkg = read_json(os.path.join(ohos_dir, "package.json"))
        self.assertNotIn("react-native-builder-bob", pkg)
        scripts = pkg.get("scripts", {})
        self.assertNotIn("prepare", scripts)
        # 入口应该是 ./src/index.js
        self.assertEqual(pkg.get("main"), "./src/index.js")

    def test_create_35_dual_entry_barrel_and_src_impl(self):
        """CREATE-35: 双 index.js（根 barrel + src 实现）互不覆盖"""
        barrel = """import { changeColor } from './src';
export default { changeColor };
export { changeColor };
"""
        impl = """import { NativeModules } from 'react-native';
const { NavigationBarColor } = NativeModules;
export const changeColor = (color, light) =>
  NavigationBarColor.changeNavigationBarColor(color, light);
"""
        fixture_path = create_fixture_dir("create_c35", {
            "package.json": {
                "name": "test-dual-entry-barrel",
                "version": "1.0.0",
                "main": "index.js",
            },
            "index.js": barrel,
            "src/index.js": impl,
            "ohos/package.json": {
                "name": "@oh-rn/test-dual-entry-barrel",
                "version": "1.0.0",
            },
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}\n{result.stdout}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        root_index = os.path.join(ohos_src, "index.js")
        nested_index = os.path.join(ohos_src, "src", "index.js")

        self.assertTrue(file_exists(root_index), "ohos/src/index.js (barrel) 应存在")
        self.assertTrue(file_exists(nested_index), "ohos/src/src/index.js (实现) 应存在")

        root_content = read_file(root_index)
        nested_content = read_file(nested_index)

        self.assertIn("from './src'", root_content, "根入口应为 barrel 再导出")
        self.assertNotIn("NativeModules", root_content, "barrel 不应包含 NativeModules 实现")
        self.assertIn("NativeModules", nested_content, "实现文件应保留 NativeModules")

    def test_create_35_dual_entry_function_default_becomes_object(self):
        """CREATE-35b: 根 default 为单函数时，ohos barrel 应聚合成 default 对象"""
        root_barrel = """import {
  changeNavigationBarColor,
  hideNavigationBar,
  showNavigationBar,
} from './src';

export default changeNavigationBarColor;
export {hideNavigationBar, showNavigationBar};
"""
        impl = "export const changeNavigationBarColor = () => {};\n"
        fixture_path = create_fixture_dir("create_c35b", {
            "package.json": {
                "name": "test-dual-entry-fn-default",
                "version": "1.0.0",
                "main": "index.js",
            },
            "index.js": root_barrel,
            "src/index.js": impl,
            "ohos/package.json": {
                "name": "@oh-rn/test-dual-entry-fn-default",
                "version": "1.0.0",
            },
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}\n{result.stdout}")

        root_index = read_file(os.path.join(fixture_path, "ohos", "src", "index.js"))
        self.assertIn("export default defaultExport", root_index)
        self.assertIn("hideNavigationBar", root_index)
        self.assertNotIn("export default changeNavigationBarColor", root_index)

        dts = read_file(os.path.join(fixture_path, "ohos", "src", "index.d.ts"))
        self.assertIn("export default defaultExport", dts)
        self.assertNotIn("export default changeNavigationBarColor", dts)

    def test_create_36_module_param_overrides_auto_detection(self):
        """CREATE-36: --module 参数应优先于自动检测
        
        场景：源码无 Spec 且无 NativeModules（自动检测为 js-only），但用户指定 --module both
        验证：应创建 harmony 和 har_wrapper 目录（js-only 模式不会创建）
        """
        fixture_path = create_fixture_dir("create_c36", {
            "package.json": {
                "name": "test-module-override",
                "version": "1.0.0",
                "main": "index.js",
            },
            "index.js": "export const foo = 'bar';",  # 纯 JS，无 NativeModules
        })
        # 添加 Android 原生目录（模拟 Old Arch 原生组件）
        android_dir = os.path.join(fixture_path, "android", "src", "main", "java", "com", "test")
        os.makedirs(android_dir, exist_ok=True)
        with open(os.path.join(android_dir, "TestManager.java"), "w", encoding="utf-8") as f:
            f.write("package com.test;\npublic class TestManager {}")

        # 指定 --module both（强制覆盖自动检测的 js-only）
        result = run_rn_create(fixture_path, extra_args=["--module", "both"])
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}\n{result.stdout}")

        # 验证 harmony 目录已创建（js-only 模式不会创建）
        harmony_dir = os.path.join(fixture_path, "ohos", "harmony")
        self.assertTrue(dir_exists(harmony_dir), "--module both 应创建 harmony 目录")

        # 验证 har_wrapper 目录已创建（js-only 模式不会创建）
        har_wrapper_dir = os.path.join(fixture_path, "ohos", ".rn-build", "har_wrapper")
        self.assertTrue(dir_exists(har_wrapper_dir), "--module both 应创建 har_wrapper 目录")

        # 验证 ohos/package.json 包含 harmony.autolinking（原生模块配置）
        ohos_pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertIn("harmony", ohos_pkg, "原生模块应有 harmony 配置")
        self.assertIn("autolinking", ohos_pkg["harmony"], "原生模块应有 autolinking 配置")


if __name__ == "__main__":
    unittest.main()
