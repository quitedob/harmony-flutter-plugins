"""rn.py migrate 命令测试

测试用例：
- MIGRATE-01 ~ MIGRATE-24: migrate 命令测试
"""

import json
import os
import unittest

from test_helpers import (
    create_fixture_dir, cleanup_fixture, FIXTURES_DIR,
    cleanup_ohos, read_json, read_file, file_exists, dir_exists,
    run_rn_migrate, run_rn_create
)


class TestRnMigrate(unittest.TestCase):
    """rn.py migrate 命令测试"""

    def tearDown(self):
        for name in ["m01", "m02", "m03", "m04", "m05", "m06", "m07", "m08",
                     "m09", "m10", "m11", "m12", "m13", "m14", "m15", "m16",
                     "m17", "m18", "m19", "m20", "m21", "m22", "m23", "m24",
                     "m25", "m26", "m27", "m28", "m29", "m30", "m31", "m32", "m33",
                     "m34", "m35", "m36", "m37", "m38", "m39", "m40", "m41", "m42", "m43"]:
            path = os.path.join(FIXTURES_DIR, f"migrate_{name}")
            if os.path.exists(path):
                cleanup_ohos(path)
                cleanup_fixture(f"migrate_{name}")

    def test_migrate_01_native_modules(self):
        """MIGRATE-01: 老架构 NativeModules 迁移"""
        fixture_path = create_fixture_dir("migrate_m01", {
            "package.json": {"name": "test-m01", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const { RNTestModule } = NativeModules;
export const version = RNTestModule.version;
export const count = RNTestModule.count;
export const fetch = () => RNTestModule.fetch();
""",
            "index.d.ts": """declare namespace TestModule {
  export const version: string;
  export const count: number;
  export function fetch(): Promise<boolean>;
}
export default TestModule;
"""
        })

        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")

        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(dir_exists(os.path.join(ohos_src, "specs", "v1")))
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        self.assertTrue(len(spec_files) >= 1)

        spec_content = read_file(os.path.join(ohos_src, "specs", "v1", spec_files[0]))
        # 常量应该在 getConstants() 中
        self.assertIn("getConstants()", spec_content)
        self.assertIn("version: string", spec_content)
        self.assertIn("count: number", spec_content)
        self.assertIn("fetch(): Promise<boolean>", spec_content)

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        self.assertIn("NativeRNTestModule.ts", pkg.get("scripts", {}).get("codegen-lib", ""))

        index_content = read_file(os.path.join(ohos_src, "index.js"))
        self.assertIn("NativeRNTestModule", index_content)
        self.assertNotIn("NativeModules", index_content)
        
        # 验证常量访问被替换为 getConstants() 调用
        self.assertIn("NativeRNTestModule.getConstants().version", index_content)
        self.assertIn("NativeRNTestModule.getConstants().count", index_content)

    def test_migrate_02_multiple_modules(self):
        """MIGRATE-02: 多个 NativeModules"""
        fixture_path = create_fixture_dir("migrate_m02", {
            "package.json": {"name": "test-m02", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNModuleA = NativeModules.RNModuleA;
const RNModuleB = NativeModules.RNModuleB;
export const a = RNModuleA.getValue();
export const b = RNModuleB.getData();
"""
        })

        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0)

        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        self.assertEqual(len(spec_files), 2)

    def test_migrate_03_constants_and_methods(self):
        """MIGRATE-03: 常量 + 方法"""
        fixture_path = create_fixture_dir("migrate_m03", {
            "package.json": {"name": "test-m03", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const { RNFullModule } = NativeModules;
export const name = RNFullModule.name;
export const version = RNFullModule.version;
export const get = () => RNFullModule.get();
export const set = (val) => RNFullModule.set(val);
export const fetch = (url, opts) => RNFullModule.fetch(url, opts);
""",
            "index.d.ts": """declare namespace FullModule {
  export const name: string;
  export const version: number;
  export function get(): Promise<string>;
  export function set(val: string): Promise<void>;
  export function fetch(url: string, opts: object): Promise<boolean>;
}
export default FullModule;
"""
        })

        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0)

        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        spec_content = read_file(os.path.join(ohos_src, "specs", "v1", spec_files[0]))

        # 常量应该在 getConstants() 中
        self.assertIn("getConstants()", spec_content)
        self.assertIn("name: string", spec_content)
        self.assertIn("version: number", spec_content)
        self.assertIn("get(): Promise<string>", spec_content)
        self.assertIn("set(val: string): Promise<void>", spec_content)
        self.assertIn("fetch(url: string, opts: object): Promise<boolean>", spec_content)
        
        # 验证 JS 层常量访问被替换为 getConstants() 调用
        index_content = read_file(os.path.join(ohos_src, "index.js"))
        self.assertIn("NativeRNFullModule.getConstants().name", index_content)
        self.assertIn("NativeRNFullModule.getConstants().version", index_content)

    def test_migrate_04_only_constants(self):
        """MIGRATE-04: 只有常量"""
        fixture_path = create_fixture_dir("migrate_m04", {
            "package.json": {"name": "test-m04", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const { RNConstModule } = NativeModules;
export const version = RNConstModule.version;
export const build = RNConstModule.build;
""",
            "index.d.ts": """declare namespace ConstModule {
  export const version: string;
  export const build: number;
}
export default ConstModule;
"""
        })

        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0)

        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        spec_content = read_file(os.path.join(ohos_src, "specs", "v1", spec_files[0]))

        # 常量应该在 getConstants() 中
        self.assertIn("getConstants()", spec_content)
        self.assertIn("version: string", spec_content)
        self.assertIn("build: number", spec_content)
        self.assertNotIn("(): Promise", spec_content)
        
        # 验证 JS 层常量访问被替换为 getConstants() 调用
        index_content = read_file(os.path.join(ohos_src, "index.js"))
        self.assertIn("NativeRNConstModule.getConstants().version", index_content)
        self.assertIn("NativeRNConstModule.getConstants().build", index_content)

    def test_migrate_05_only_methods(self):
        """MIGRATE-05: 只有方法"""
        fixture_path = create_fixture_dir("migrate_m05", {
            "package.json": {"name": "test-m05", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const { RNMethodModule } = NativeModules;
export const init = () => RNMethodModule.init();
export const start = (config) => RNMethodModule.start(config);
""",
            "index.d.ts": """declare namespace MethodModule {
  export function init(): Promise<void>;
  export function start(config: object): Promise<boolean>;
}
export default MethodModule;
"""
        })

        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0)

        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        spec_content = read_file(os.path.join(ohos_src, "specs", "v1", spec_files[0]))

        self.assertIn("init(): Promise<void>", spec_content)
        self.assertIn("start(config: object): Promise<boolean>", spec_content)
        self.assertNotIn("readonly", spec_content)

    def test_migrate_06_no_dts(self):
        """MIGRATE-06: 无 .d.ts 文件"""
        fixture_path = create_fixture_dir("migrate_m06", {
            "package.json": {"name": "test-m06", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNNoDtsModule = NativeModules.RNNoDtsModule;
export const value = RNNoDtsModule.value;
export const get = () => RNNoDtsModule.get();
"""
        })

        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0)

        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        self.assertTrue(len(spec_files) >= 1)

        spec_content = read_file(os.path.join(ohos_src, "specs", "v1", spec_files[0]))
        # 常量应该在 getConstants() 中
        self.assertIn("getConstants()", spec_content)
        self.assertIn("value:", spec_content)
        self.assertIn("get():", spec_content)

    def test_migrate_07_idempotent(self):
        """MIGRATE-07: 幂等性：migrate → migrate"""
        fixture_path = create_fixture_dir("migrate_m07", {
            "package.json": {"name": "test-m07", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const { RNIdempModule } = NativeModules;
export const version = RNIdempModule.version;
"""
        })

        run_rn_create(fixture_path)
        result1 = run_rn_migrate(fixture_path)
        self.assertEqual(result1.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files1 = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        spec1 = read_file(os.path.join(ohos_src, "specs", "v1", spec_files1[0]))
        index1 = read_file(os.path.join(ohos_src, "index.js"))

        result2 = run_rn_migrate(fixture_path)
        self.assertEqual(result2.returncode, 0)

        spec_files2 = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        spec2 = read_file(os.path.join(ohos_src, "specs", "v1", spec_files2[0]))
        index2 = read_file(os.path.join(ohos_src, "index.js"))

        self.assertEqual(len(spec_files1), len(spec_files2))
        self.assertEqual(spec1, spec2)
        self.assertEqual(index1, index2)

    def test_migrate_08_empty_module(self):
        """MIGRATE-08: 空模块（无方法无常量）"""
        fixture_path = create_fixture_dir("migrate_m08", {
            "package.json": {"name": "test-m08", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNEmptyModule = NativeModules.RNEmptyModule;
export default RNEmptyModule;
"""
        })

        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0)

        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        self.assertTrue(len(spec_files) >= 1)

        spec_content = read_file(os.path.join(ohos_src, "specs", "v1", spec_files[0]))
        self.assertIn("export interface Spec extends TurboModule", spec_content)

    def test_migrate_09_declare_namespace_format(self):
        """MIGRATE-09: declare namespace 格式"""
        fixture_path = create_fixture_dir("migrate_m09", {
            "package.json": {"name": "test-m09", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNNamespaceModule = NativeModules.RNNamespaceModule;
export const name = RNNamespaceModule.name;
export const getValue = RNNamespaceModule.getValue();
""",
            "index.d.ts": """declare namespace NamespaceModule {
  export const name: string;
  export const count: number;
  export function getValue(): Promise<string>;
  export function setValue(val: string): Promise<void>;
}
export default NamespaceModule;
"""
        })

        run_rn_create(fixture_path)
        result = run_rn_migrate(fixture_path)
        self.assertEqual(result.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        spec_content = read_file(os.path.join(ohos_src, "specs", "v1", spec_files[0]))

        # 常量应该在 getConstants() 中
        self.assertIn("getConstants()", spec_content)
        self.assertIn("name: string", spec_content)
        self.assertIn("getValue(): Promise<string>", spec_content)

    def test_migrate_10_declare_const_format(self):
        """MIGRATE-10: declare const 对象格式"""
        fixture_path = create_fixture_dir("migrate_m10", {
            "package.json": {"name": "test-m10", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNConstModule = NativeModules.RNConstModule;
export const title = RNConstModule.title;
export const fetch = RNConstModule.fetch();
""",
            "index.d.ts": """declare const ConstModule: {
  title: string;
  count: number;
  fetch(): Promise<boolean>;
}
export default ConstModule;
"""
        })

        run_rn_create(fixture_path)
        result = run_rn_migrate(fixture_path)
        self.assertEqual(result.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        spec_content = read_file(os.path.join(ohos_src, "specs", "v1", spec_files[0]))

        # 常量应该在 getConstants() 中
        self.assertIn("getConstants()", spec_content)
        self.assertIn("title: string", spec_content)
        self.assertIn("fetch(): Promise<boolean>", spec_content)

    def test_migrate_11_method_params_types(self):
        """MIGRATE-11: 方法多种参数类型"""
        fixture_path = create_fixture_dir("migrate_m11", {
            "package.json": {"name": "test-m11", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNParamModule = NativeModules.RNParamModule;
export const noParam = RNParamModule.noParam();
export const oneParam = RNParamModule.oneParam('value');
export const multiParam = RNParamModule.multiParam('a', 'b', 'c');
""",
            "index.d.ts": """declare namespace ParamModule {
  export function noParam(): Promise<void>;
  export function oneParam(val: string): Promise<string>;
  export function multiParam(a: string, b: number, c: boolean): Promise<object>;
}
export default ParamModule;
"""
        })

        run_rn_create(fixture_path)
        result = run_rn_migrate(fixture_path)
        self.assertEqual(result.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        spec_content = read_file(os.path.join(ohos_src, "specs", "v1", spec_files[0]))

        self.assertIn("noParam(): Promise<void>", spec_content)
        self.assertIn("oneParam(val: string): Promise<string>", spec_content)
        self.assertIn("multiParam(a: string, b: number, c: boolean): Promise<object>", spec_content)

    def test_migrate_12_promise_return_types(self):
        """MIGRATE-12: Promise 返回值类型多样性"""
        fixture_path = create_fixture_dir("migrate_m12", {
            "package.json": {"name": "test-m12", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNReturnModule = NativeModules.RNReturnModule;
export const getVoid = RNReturnModule.getVoid();
export const getString = RNReturnModule.getString();
export const getNumber = RNReturnModule.getNumber();
export const getBool = RNReturnModule.getBool();
export const getObject = RNReturnModule.getObject();
""",
            "index.d.ts": """declare namespace ReturnModule {
  export function getVoid(): Promise<void>;
  export function getString(): Promise<string>;
  export function getNumber(): Promise<number>;
  export function getBool(): Promise<boolean>;
  export function getObject(): Promise<object>;
}
export default ReturnModule;
"""
        })

        run_rn_create(fixture_path)
        result = run_rn_migrate(fixture_path)
        self.assertEqual(result.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        spec_content = read_file(os.path.join(ohos_src, "specs", "v1", spec_files[0]))

        self.assertIn("getVoid(): Promise<void>", spec_content)
        self.assertIn("getString(): Promise<string>", spec_content)
        self.assertIn("getNumber(): Promise<number>", spec_content)
        self.assertIn("getBool(): Promise<boolean>", spec_content)
        self.assertIn("getObject(): Promise<object>", spec_content)

    def test_migrate_13_multi_file_same_module(self):
        """MIGRATE-13: 多文件引用同一模块"""
        fixture_path = create_fixture_dir("migrate_m13", {
            "package.json": {"name": "test-m13", "version": "1.0.0", "main": "src/index.js"},
            "src/index.js": """import { NativeModules } from 'react-native';
import { helper } from './utils';
const RNSharedModule = NativeModules.RNSharedModule;
export const mainValue = RNSharedModule.getValue();
export { helper };
""",
            "src/utils.js": """import { NativeModules } from 'react-native';
const RNSharedModule = NativeModules.RNSharedModule;
export const helper = RNSharedModule.helper();
"""
        })

        run_rn_create(fixture_path)
        result = run_rn_migrate(fixture_path)
        self.assertEqual(result.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        self.assertEqual(len(spec_files), 1)

        index_content = read_file(os.path.join(ohos_src, "index.js"))
        utils_content = read_file(os.path.join(ohos_src, "utils.js"))

        self.assertIn("NativeRNSharedModule", index_content)
        self.assertIn("NativeRNSharedModule", utils_content)
        self.assertNotIn("NativeModules", index_content)
        self.assertNotIn("NativeModules", utils_content)

    def test_migrate_14_import_variations(self):
        """MIGRATE-14: import 多种写法"""
        fixture_path = create_fixture_dir("migrate_m14", {
            "package.json": {"name": "test-m14", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';

const { RNDestructModule } = NativeModules;
const RNDirectModule = NativeModules.RNDirectModule;

export const destructValue = RNDestructModule.getValue();
export const directValue = RNDirectModule.getValue();
"""
        })

        run_rn_create(fixture_path)
        result = run_rn_migrate(fixture_path)
        self.assertEqual(result.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        self.assertEqual(len(spec_files), 2)

        index_content = read_file(os.path.join(ohos_src, "index.js"))
        self.assertIn("NativeRNDestructModule", index_content)
        self.assertIn("NativeRNDirectModule", index_content)
        self.assertNotIn("NativeModules", index_content)

    def test_migrate_15_existing_spec_conflict(self):
        """MIGRATE-15: 已有 Spec 文件冲突"""
        fixture_path = create_fixture_dir("migrate_m15", {
            "package.json": {"name": "test-m15", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNConflictModule = NativeModules.RNConflictModule;
export const value = RNConflictModule.value;
"""
        })

        run_rn_create(fixture_path)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        specs_v1_dir = os.path.join(ohos_src, "specs", "v1")
        os.makedirs(specs_v1_dir, exist_ok=True)

        existing_spec = """import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
export interface Spec extends TurboModule {
  oldValue(): Promise<string>;
}
export default TurboModuleRegistry.getEnforcing<Spec>('ConflictModule');
"""
        with open(os.path.join(specs_v1_dir, "NativeRNConflictModule.ts"), "w") as f:
            f.write(existing_spec)

        result = run_rn_migrate(fixture_path)
        self.assertEqual(result.returncode, 0)

        spec_content = read_file(os.path.join(specs_v1_dir, "NativeRNConflictModule.ts"))
        # 常量应该在 getConstants() 中
        self.assertIn("getConstants()", spec_content)
        self.assertIn("value:", spec_content)

    def test_migrate_16_codegen_multi_spec(self):
        """MIGRATE-16: codegen 多 Spec 配置"""
        fixture_path = create_fixture_dir("migrate_m16", {
            "package.json": {"name": "test-m16", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNModuleA = NativeModules.RNModuleA;
const RNModuleB = NativeModules.RNModuleB;
export const a = RNModuleA.getValue();
export const b = RNModuleB.getName();
"""
        })

        run_rn_create(fixture_path)
        result = run_rn_migrate(fixture_path)
        self.assertEqual(result.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_files = [f for f in os.listdir(os.path.join(ohos_src, "specs", "v1")) if f.endswith(".ts")]
        self.assertEqual(len(spec_files), 2)

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        codegen_lib = pkg.get("scripts", {}).get("codegen-lib", "")
        self.assertIn("NativeRNModuleA.ts", codegen_lib)
        self.assertIn("NativeRNModuleB.ts", codegen_lib)

    def test_migrate_17_codegen_config_format(self):
        """MIGRATE-17: codegen 配置完整性"""
        fixture_path = create_fixture_dir("migrate_m17", {
            "package.json": {"name": "test-m17", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNConfigModule = NativeModules.RNConfigModule;
export const value = RNConfigModule.value;
export const get = RNConfigModule.get();
"""
        })

        run_rn_create(fixture_path)
        result = run_rn_migrate(fixture_path)
        self.assertEqual(result.returncode, 0)

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        codegen_lib = pkg.get("scripts", {}).get("codegen-lib", "")

        self.assertIn("codegen-lib-harmony", codegen_lib)
        self.assertIn("--npm-package-name", codegen_lib)
        self.assertIn("--cpp-output-path", codegen_lib)
        self.assertIn("--ets-output-path", codegen_lib)
        self.assertIn("--turbo-modules-spec-paths", codegen_lib)
        self.assertIn("NativeRNConfigModule.ts", codegen_lib)

    def test_migrate_18_codegen_turbo_vs_fabric(self):
        """MIGRATE-18: TurboModule vs Fabric 的 codegen 配置差异"""
        fixture_path_turbo = create_fixture_dir("migrate_m18_turbo", {
            "package.json": {"name": "test-m18-turbo", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNTurboModule = NativeModules.RNTurboModule;
export const get = RNTurboModule.get();
"""
        })

        run_rn_create(fixture_path_turbo)
        run_rn_migrate(fixture_path_turbo)

        pkg_turbo = read_json(os.path.join(fixture_path_turbo, "ohos", "package.json"))
        codegen_turbo = pkg_turbo.get("scripts", {}).get("codegen-lib", "")
        self.assertIn("--turbo-modules-spec-paths", codegen_turbo)

        cleanup_ohos(fixture_path_turbo)
        cleanup_fixture("migrate_m18_turbo")

    def test_migrate_19_codegen_existing_config(self):
        """MIGRATE-19: 已有 codegen 配置的更新"""
        fixture_path = create_fixture_dir("migrate_m19", {
            "package.json": {"name": "test-m19", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNUpdateModule = NativeModules.RNUpdateModule;
export const get = RNUpdateModule.get();
"""
        })

        run_rn_create(fixture_path)

        ohos_dir = os.path.join(fixture_path, "ohos")
        pkg_path = os.path.join(ohos_dir, "package.json")
        pkg = read_json(pkg_path)
        pkg["scripts"]["codegen-lib"] = "bash old-script.sh"
        with open(pkg_path, "w", encoding="utf-8") as f:
            json.dump(pkg, f, indent=2)

        result = run_rn_migrate(fixture_path)
        self.assertEqual(result.returncode, 0)

        pkg_updated = read_json(pkg_path)
        codegen_updated = pkg_updated.get("scripts", {}).get("codegen-lib", "")
        self.assertIn("NativeRNUpdateModule.ts", codegen_updated)
        self.assertNotIn("old-script.sh", codegen_updated)

    def test_migrate_20_codegen_spec_path_mapping(self):
        """MIGRATE-20: Spec 文件路径与 codegen 配置对应"""
        fixture_path = create_fixture_dir("migrate_m20", {
            "package.json": {"name": "test-m20", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNPathModule = NativeModules.RNPathModule;
export const get = RNPathModule.get();
"""
        })

        run_rn_create(fixture_path)
        result = run_rn_migrate(fixture_path)
        self.assertEqual(result.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_file = os.path.join(ohos_src, "specs", "v1", "NativeRNPathModule.ts")
        self.assertTrue(file_exists(spec_file))

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        codegen_lib = pkg.get("scripts", {}).get("codegen-lib", "")

        self.assertIn("specs/v1/NativeRNPathModule.ts", codegen_lib)

    def test_migrate_21_codegen_fabric_only(self):
        """MIGRATE-21: 纯 Fabric 组件（新架构）codegen 配置"""
        fixture_path = create_fixture_dir("migrate_m21", {
            "package.json": {"name": "test-m21", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import TestView from './specs/TestViewNativeComponent';
export { TestView };
""",
            "src/specs/TestViewNativeComponent.ts": """import type { HostComponent } from 'react-native';
import { codegenNativeComponent } from 'react-native';

export interface TestViewProps {
  title?: string;
  count?: number;
}

export default codegenNativeComponent<TestViewProps>('TestView');
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0)

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        codegen_lib = pkg.get("scripts", {}).get("codegen-lib", "")

        self.assertIn("--arkts-components-spec-paths", codegen_lib)
        self.assertIn("TestViewNativeComponent.ts", codegen_lib)
        self.assertNotIn("--turbo-modules-spec-paths", codegen_lib)

    def test_migrate_22_codegen_turbo_and_fabric_mixed(self):
        """MIGRATE-22: TurboModule（新架构）+ Fabric 混合 codegen 配置"""
        fixture_path = create_fixture_dir("migrate_m22", {
            "package.json": {"name": "test-m22", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import NativeTurbo from './specs/NativeTurbo';
import TestView from './specs/TestViewNativeComponent';

export const get = NativeTurbo.get();
export { TestView };
""",
            "src/specs/NativeTurbo.ts": """import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  get(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TurboModule');
""",
            "src/specs/TestViewNativeComponent.ts": """import type { HostComponent } from 'react-native';
import { codegenNativeComponent } from 'react-native';

export interface TestViewProps {
  title?: string;
}

export default codegenNativeComponent<TestViewProps>('TestView');
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0)

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        codegen_lib = pkg.get("scripts", {}).get("codegen-lib", "")

        self.assertIn("--turbo-modules-spec-paths", codegen_lib)
        self.assertIn("--arkts-components-spec-paths", codegen_lib)
        self.assertIn("NativeTurbo.ts", codegen_lib)
        self.assertIn("TestViewNativeComponent.ts", codegen_lib)

    def test_migrate_23_codegen_fabric_multiple(self):
        """MIGRATE-23: 多个 Fabric 组件 codegen 配置"""
        fixture_path = create_fixture_dir("migrate_m23", {
            "package.json": {"name": "test-m23", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import ViewA from './specs/ViewANativeComponent';
import ViewB from './specs/ViewBNativeComponent';
export { ViewA, ViewB };
""",
            "src/specs/ViewANativeComponent.ts": """import type { HostComponent } from 'react-native';
import { codegenNativeComponent } from 'react-native';

export interface ViewAProps {
  title?: string;
}

export default codegenNativeComponent<ViewAProps>('ViewA');
""",
            "src/specs/ViewBNativeComponent.ts": """import type { HostComponent } from 'react-native';
import { codegenNativeComponent } from 'react-native';

export interface ViewBProps {
  count?: number;
}

export default codegenNativeComponent<ViewBProps>('ViewB');
"""
        })

        result = run_rn_create(fixture_path)
        self.assertEqual(result.returncode, 0)

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        codegen_lib = pkg.get("scripts", {}).get("codegen-lib", "")

        self.assertIn("--arkts-components-spec-paths", codegen_lib)
        self.assertIn("ViewANativeComponent.ts", codegen_lib)
        self.assertIn("ViewBNativeComponent.ts", codegen_lib)
        self.assertNotIn("--turbo-modules-spec-paths", codegen_lib)

    def test_migrate_24_old_arch_plus_new_fabric(self):
        """MIGRATE-24: 老架构迁移 + 新架构 Fabric 混合 codegen 配置"""
        fixture_path = create_fixture_dir("migrate_m24", {
            "package.json": {"name": "test-m24", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import { NativeModules } from 'react-native';
import TestView from './specs/TestViewNativeComponent';

const { RNOldModule } = NativeModules;
export const oldGet = RNOldModule.getData();
export { TestView };
""",
            "src/specs/TestViewNativeComponent.ts": """import type { HostComponent } from 'react-native';
import { codegenNativeComponent } from 'react-native';

export interface TestViewProps {
  title?: string;
}

export default codegenNativeComponent<TestViewProps>('TestView');
"""
        })

        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0)

        pkg_create = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        codegen_create = pkg_create.get("scripts", {}).get("codegen-lib", "")
        self.assertIn("--arkts-components-spec-paths", codegen_create)
        self.assertIn("TestViewNativeComponent.ts", codegen_create)

        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0)

        pkg_migrate = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        codegen_migrate = pkg_migrate.get("scripts", {}).get("codegen-lib", "")
        self.assertIn("--turbo-modules-spec-paths", codegen_migrate)
        self.assertIn("--arkts-components-spec-paths", codegen_migrate)
        self.assertIn("NativeRNOldModule.ts", codegen_migrate)
        self.assertIn("TestViewNativeComponent.ts", codegen_migrate)

    def test_migrate_25_already_migrated(self):
        """MIGRATE-25: 已迁移的代码不会被再次迁移"""
        fixture_path = create_fixture_dir("migrate_m25", {
            "package.json": {"name": "test-m25", "version": "1.0.0", "main": "index.js"},
            "index.js": """import NativeRNTestModule from './specs/v1/NativeRNTestModule';
export const version = NativeRNTestModule && NativeRNTestModule.getConstants().version;
export const fetch = () => NativeRNTestModule.fetch();
""",
            "index.d.ts": """declare namespace TestModule {
  export const version: string;
  export function fetch(): Promise<boolean>;
}
export default TestModule;
"""
        })

        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0)

        # 创建已迁移的 index.js
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        migrated_index = """import NativeRNTestModule from './specs/v1/NativeRNTestModule';

const TestModule = {
  version: NativeRNTestModule && NativeRNTestModule.getConstants().version,
  fetch: () => NativeRNTestModule.fetch()
};

export default TestModule;
"""
        with open(os.path.join(ohos_src, "index.js"), "w", encoding="utf-8") as f:
            f.write(migrated_index)

        # 运行 migrate，不应该修改已迁移的代码
        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0)

        index_content = read_file(os.path.join(ohos_src, "index.js"))
        # 验证没有产生 NativeNativeRNTestModule
        self.assertNotIn("NativeNativeRNTestModule", index_content)
        # 验证代码保持正确
        self.assertIn("NativeRNTestModule.getConstants().version", index_content)

    def test_migrate_26_require_native_component_to_fabric_spec(self):
        """MIGRATE-26: requireNativeComponent → Fabric Spec（Harmony 安全 import）"""
        fixture_path = create_fixture_dir("migrate_m26", {
            "package.json": {"name": "test-m26", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { View, requireNativeComponent } from 'react-native';
const WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker');
module.exports = WheelCurvedPickerNative;
""",
        })

        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")

        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")

        spec_path = os.path.join(
            fixture_path, "ohos", "src", "specs", "v1", "WheelCurvedPickerNativeComponent.ts"
        )
        self.assertTrue(file_exists(spec_path), "应生成 WheelCurvedPickerNativeComponent.ts")

        spec_content = read_file(spec_path)
        self.assertIn(
            "react-native/Libraries/Utilities/codegenNativeComponent",
            spec_content,
            "Fabric Spec 须使用 Libraries 路径，不能 from 'react-native'",
        )
        self.assertNotIn(
            "import { codegenNativeComponent } from 'react-native'",
            spec_content,
        )

        index_content = read_file(os.path.join(fixture_path, "ohos", "src", "index.js"))
        self.assertIn("WheelCurvedPickerNativeComponent", index_content)
        self.assertNotIn("requireNativeComponent", index_content)

        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        codegen_lib = pkg.get("scripts", {}).get("codegen-lib", "")
        self.assertIn("WheelCurvedPickerNativeComponent.ts", codegen_lib)
        self.assertIn("--arkts-components-spec-paths", codegen_lib)

    def test_migrate_27_normalize_existing_fabric_spec_import(self):
        """MIGRATE-27: 修正已有 Fabric Spec 中错误的 codegenNativeComponent import"""
        fixture_path = create_fixture_dir("migrate_m27", {
            "package.json": {"name": "test-m27", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": "import TestView from './specs/v1/TestViewNativeComponent';\nexport { TestView };",
            "src/specs/v1/TestViewNativeComponent.ts": """import type { ViewProps } from 'react-native';
import { codegenNativeComponent } from 'react-native';

export interface TestViewProps extends ViewProps {
  title?: string;
}

export default codegenNativeComponent<TestViewProps>('TestView');
""",
        })

        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0)

        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0)

        spec_content = read_file(
            os.path.join(fixture_path, "ohos", "src", "specs", "v1", "TestViewNativeComponent.ts")
        )
        self.assertIn("react-native/Libraries/Utilities/codegenNativeComponent", spec_content)
        self.assertNotIn("import { codegenNativeComponent } from 'react-native'", spec_content)

    def test_migrate_28_old_arch_turbo_and_fabric_both_need_migrate(self):
        """MIGRATE-28: 老架构 NativeModules + 老架构 requireNativeComponent 都需要迁移
        
        模拟 react_native_month_year_picker 的场景：
        - NativeModules.RNDialog.open() → 需迁移到 TurboModule Spec
        - requireNativeComponent('RNPicker') → 需迁移到 Fabric Spec
        
        验证 codegen-lib 同时包含 --turbo-modules-spec-paths 和 --arkts-components-spec-paths
        """
        fixture_path = create_fixture_dir("migrate_m28", {
            "package.json": {"name": "test-m28", "version": "1.0.0", "main": "src/index.js"},
            "src/index.js": """import { NativeModules, requireNativeComponent } from 'react-native';

const RNDialog = NativeModules.RNDialog;
const RNPicker = requireNativeComponent('RNPicker');

export const open = (opts) => RNDialog.open(opts);
export { RNPicker };
""",
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")
        
        # 验证生成两个 Spec 文件
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        specs_dir = os.path.join(ohos_src, "specs", "v1")
        
        turbo_spec_path = os.path.join(specs_dir, "NativeRNDialog.ts")
        fabric_spec_path = os.path.join(specs_dir, "RNPickerNativeComponent.ts")
        
        self.assertTrue(file_exists(turbo_spec_path), "应生成 NativeRNDialog.ts (TurboModule Spec)")
        self.assertTrue(file_exists(fabric_spec_path), "应生成 RNPickerNativeComponent.ts (Fabric Spec)")
        
        # 验证 TurboModule Spec 内容
        turbo_spec_content = read_file(turbo_spec_path)
        self.assertIn("TurboModule", turbo_spec_content)
        self.assertIn("open", turbo_spec_content)
        
        # 验证 Fabric Spec 使用正确的 import 路径
        fabric_spec_content = read_file(fabric_spec_path)
        self.assertIn("react-native/Libraries/Utilities/codegenNativeComponent", fabric_spec_content)
        self.assertNotIn("import { codegenNativeComponent } from 'react-native'", fabric_spec_content)
        
        # 验证 codegen-lib 配置同时包含两种参数，且指定具体文件路径
        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        codegen_lib = pkg.get("scripts", {}).get("codegen-lib", "")
        
        self.assertIn("--turbo-modules-spec-paths", codegen_lib, "codegen-lib 应包含 --turbo-modules-spec-paths")
        self.assertIn("--arkts-components-spec-paths", codegen_lib, "codegen-lib 应包含 --arkts-components-spec-paths")
        
        # 验证具体文件路径（而非仅目录）
        self.assertIn("./src/specs/v1/NativeRNDialog.ts", codegen_lib, 
                      "codegen-lib 的 --turbo-modules-spec-paths 应指定具体文件路径")
        self.assertIn("./src/specs/v1/RNPickerNativeComponent.ts", codegen_lib,
                      "codegen-lib 的 --arkts-components-spec-paths 应指定具体文件路径")
        
        # 验证 JS 层迁移正确
        index_content = read_file(os.path.join(ohos_src, "index.js"))
        self.assertIn("NativeRNDialog", index_content, "index.js 应引用 NativeRNDialog")
        self.assertIn("RNPickerNativeComponent", index_content, "index.js 应引用 RNPickerNativeComponent")
        self.assertNotIn("NativeModules", index_content, "index.js 不应包含 NativeModules")
        self.assertNotIn("requireNativeComponent", index_content, "index.js 不应包含 requireNativeComponent")

    def test_migrate_29_export_default_with_import_chain(self):
        """MIGRATE-29: export default NativeModules.Xxx + 导入链追踪
        
        模拟 react_native_month_year_picker 的场景：
        - RNMonthPickerDialogModule.js: export default NativeModules.RNMonthPicker
        - MonthPicker.android.js: import RNMonthPickerDialogModule from './...' ; RNMonthPickerDialogModule.open({...})
        
        验证 migrate 能正确追踪导入链，提取方法签名
        """
        fixture_path = create_fixture_dir("migrate_m29", {
            "package.json": {"name": "test-m29", "version": "1.0.0", "main": "src/index.js"},
            "src/index.js": """import MonthPicker from './MonthPicker.android';
export default MonthPicker;
""",
            "src/MonthPicker.android.js": """import { NativeModules } from 'react-native';
import RNMonthPickerDialogModule from './RNMonthPickerDialogModule';

const MonthPicker = (opts) => {
  RNMonthPickerDialogModule.open({
    value: opts.value,
    minimumDate: opts.minimumDate,
    maximumDate: opts.maximumDate,
  }).then(result => {
    console.log(result);
  });
  return null;
};
export default MonthPicker;
""",
            "src/RNMonthPickerDialogModule.js": """import { NativeModules } from 'react-native';
export default NativeModules.RNMonthPicker;
""",
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")
        
        # 验证生成 TurboModule Spec
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        specs_dir = os.path.join(ohos_src, "specs", "v1")
        turbo_spec_path = os.path.join(specs_dir, "NativeRNMonthPicker.ts")
        
        self.assertTrue(file_exists(turbo_spec_path), "应生成 NativeRNMonthPicker.ts")
        
        # 验证 Spec 包含方法
        turbo_spec_content = read_file(turbo_spec_path)
        self.assertIn("open", turbo_spec_content, "Spec 应包含 open 方法")
        self.assertIn("TurboModule", turbo_spec_content, "Spec 应继承 TurboModule")
        self.assertNotIn("No methods or constants defined", turbo_spec_content, "Spec 不应为空")
        
        # 验证方法签名格式（对象参数使用 Config interface）
        self.assertTrue(
            "open(config:" in turbo_spec_content or "OpenConfig" in turbo_spec_content,
            "open 方法应有 config 参数或 OpenConfig interface"
        )
        self.assertIn("Promise", turbo_spec_content, "open 方法应返回 Promise")
        
        # 验证对象参数字段被正确推断
        self.assertIn("value", turbo_spec_content, "config 应包含 value 字段")
        self.assertIn("minimumDate", turbo_spec_content, "config 应包含 minimumDate 字段")
        self.assertIn("maximumDate", turbo_spec_content, "config 应包含 maximumDate 字段")

    def test_migrate_30_export_default_with_multiple_importers(self):
        """MIGRATE-30: export default NativeModules.Xxx + 多个导入者
        
        验证多个文件导入同一模块时，方法都能被提取
        """
        fixture_path = create_fixture_dir("migrate_m30", {
            "package.json": {"name": "test-m30", "version": "1.0.0", "main": "src/index.js"},
            "src/index.js": """import FeatureA from './featureA';
import FeatureB from './featureB';
export { FeatureA, FeatureB };
""",
            "src/RNConfig.js": """import { NativeModules } from 'react-native';
export default NativeModules.RNConfig;
""",
            "src/featureA.js": """import RNConfig from './RNConfig';

export const getConfig = () => {
  return RNConfig.get('keyA');
};
""",
            "src/featureB.js": """import RNConfig from './RNConfig';

export const setConfig = () => {
  RNConfig.set('keyB', 'valueB');
};
""",
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")
        
        # 验证生成 TurboModule Spec
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        specs_dir = os.path.join(ohos_src, "specs", "v1")
        turbo_spec_path = os.path.join(specs_dir, "NativeRNConfig.ts")
        
        self.assertTrue(file_exists(turbo_spec_path), "应生成 NativeRNConfig.ts")
        
        # 验证 Spec 包含两个方法（来自不同导入者）
        turbo_spec_content = read_file(turbo_spec_path)
        self.assertIn("get", turbo_spec_content, "Spec 应包含 get 方法（来自 featureA）")
        self.assertIn("set", turbo_spec_content, "Spec 应包含 set 方法（来自 featureB）")

    def test_migrate_31_export_default_rename_import(self):
        """MIGRATE-31: export default NativeModules.Xxx + 导入时重命名为不同名称
        
        验证导入时使用完全不同的名称也能正确追踪
        """
        fixture_path = create_fixture_dir("migrate_m31", {
            "package.json": {"name": "test-m31", "version": "1.0.0", "main": "src/index.js"},
            "src/index.js": """import MyDialog from './DialogModule';
export default MyDialog.show();
""",
            "src/DialogModule.js": """import { NativeModules } from 'react-native';
export default NativeModules.RNAlertDialog;
""",
            "src/DialogModule.android.js": """import MyDialog from './DialogModule';

export default {
  show: () => MyDialog.show({ title: 'Alert', message: 'Hello' }),
  dismiss: () => MyDialog.dismiss(),
};
""",
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")
        
        # 验证生成 TurboModule Spec
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        specs_dir = os.path.join(ohos_src, "specs", "v1")
        turbo_spec_path = os.path.join(specs_dir, "NativeRNAlertDialog.ts")
        
        self.assertTrue(file_exists(turbo_spec_path), "应生成 NativeRNAlertDialog.ts")
        
        # 验证 Spec 包含方法（即使导入时重命名为 MyDialog）
        turbo_spec_content = read_file(turbo_spec_path)
        self.assertIn("show", turbo_spec_content, "Spec 应包含 show 方法")
        self.assertIn("dismiss", turbo_spec_content, "Spec 应包含 dismiss 方法")

    def test_migrate_32_fabric_props_events_extraction(self):
        """MIGRATE-32: Fabric 组件 Props 和 Events 提取
        
        模拟 react_native_month_year_picker 的 Fabric 场景：
        - RNMonthPickerNativeComponent.js: requireNativeComponent('RNMonthPicker')
        - MonthPicker.ios.js: <RNMonthPickerView locale={...} onChange={...} />
        
        验证 migrate 能正确提取 Props 和 Events
        """
        fixture_path = create_fixture_dir("migrate_m32", {
            "package.json": {"name": "test-m32", "version": "1.0.0", "main": "src/index.js"},
            "src/index.js": """import MonthPicker from './MonthPicker.ios';
export default MonthPicker;
""",
            "src/RNMonthPickerNativeComponent.js": """import React from 'react';
import { requireNativeComponent } from 'react-native';

const RNMonthPickerView = props => <RNMonthPicker {...props} />;
const RNMonthPicker = requireNativeComponent('RNMonthPicker', RNMonthPickerView);
export default RNMonthPicker;
""",
            "src/MonthPicker.ios.js": """import React from 'react';
import RNMonthPickerView from './RNMonthPickerNativeComponent';

const MonthPicker = ({ value, locale, onChange, onDone }) => {
  return (
    <RNMonthPickerView
      locale={locale}
      value={value.getTime()}
      onChange={onChange}
      onDone={onDone}
      autoTheme={true}
    />
  );
};
export default MonthPicker;
""",
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")
        
        # 验证生成 Fabric Spec
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        specs_dir = os.path.join(ohos_src, "specs", "v1")
        fabric_spec_path = os.path.join(specs_dir, "RNMonthPickerNativeComponent.ts")
        
        self.assertTrue(file_exists(fabric_spec_path), "应生成 RNMonthPickerNativeComponent.ts")
        
        # 验证 Spec 包含 Props
        fabric_spec_content = read_file(fabric_spec_path)
        self.assertIn("locale", fabric_spec_content, "Spec 应包含 locale prop")
        self.assertIn("value", fabric_spec_content, "Spec 应包含 value prop")
        self.assertIn("autoTheme", fabric_spec_content, "Spec 应包含 autoTheme prop")
        
        # 验证 Spec 包含 Events
        self.assertIn("onChange", fabric_spec_content, "Spec 应包含 onChange event")
        self.assertIn("onDone", fabric_spec_content, "Spec 应包含 onDone event")
        self.assertIn("DirectEventHandler", fabric_spec_content, "Events 应使用 DirectEventHandler 类型")
        
        # 验证类型推断正确
        self.assertIn("string", fabric_spec_content, "locale 应推断为 string")
        self.assertIn("number", fabric_spec_content, "value 应推断为 number")
        self.assertIn("boolean", fabric_spec_content, "autoTheme 应推断为 boolean")

    def test_migrate_33_fabric_props_from_spread(self):
        """MIGRATE-33: Fabric Props 从 spread object 提取
        
        验证 {...{ prop1, prop2 }} 形式的 Props 能被正确提取
        """
        fixture_path = create_fixture_dir("migrate_m33", {
            "package.json": {"name": "test-m33", "version": "1.0.0", "main": "src/index.js"},
            "src/index.js": """import Picker from './Picker';
export default Picker;
""",
            "src/PickerNativeComponent.js": """import React from 'react';
import { requireNativeComponent } from 'react-native';

const PickerView = props => <Picker {...props} />;
const Picker = requireNativeComponent('Picker', PickerView);
export default Picker;
""",
            "src/Picker.js": """import React from 'react';
import PickerView from './PickerNativeComponent';

const Picker = ({ title, visible, onSelect, onCancel }) => {
  return (
    <PickerView
      {...{
        title,
        visible,
        onSelect,
        onCancel,
      }}
      style={{ height: 200 }}
    />
  );
};
export default Picker;
""",
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")
        
        # 验证生成 Fabric Spec
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        specs_dir = os.path.join(ohos_src, "specs", "v1")
        fabric_spec_path = os.path.join(specs_dir, "PickerNativeComponent.ts")
        
        self.assertTrue(file_exists(fabric_spec_path), "应生成 PickerNativeComponent.ts")
        
        # 验证 Spec 包含从 spread 提取的 Props
        fabric_spec_content = read_file(fabric_spec_path)
        self.assertIn("title", fabric_spec_content, "Spec 应包含 title prop（从 spread 提取）")
        self.assertIn("visible", fabric_spec_content, "Spec 应包含 visible prop（从 spread 提取）")
        
        # 验证 Spec 包含从 spread 提取的 Events
        self.assertIn("onSelect", fabric_spec_content, "Spec 应包含 onSelect event（从 spread 提取）")
        self.assertIn("onCancel", fabric_spec_content, "Spec 应包含 onCancel event（从 spread 提取）")

    def test_migrate_34_turbo_type_inference_from_js(self):
        """MIGRATE-34: TurboModule 类型推断（从 JS 调用分析）
        
        验证：
        1. 对象参数字段类型推断
        2. Promise 返回类型从 .then() 提取
        """
        fixture_path = create_fixture_dir("migrate_m34", {
            "package.json": {"name": "test-m34", "version": "1.0.0", "main": "src/index.js"},
            "src/index.js": """import DatePicker from './DatePicker';
export default DatePicker.show();
""",
            "src/DatePicker.js": """import { NativeModules } from 'react-native';
export default NativeModules.RNDatePicker;
""",
            "src/DatePicker.android.js": """import DatePicker from './DatePicker';

export default {
  show: (opts) => DatePicker.open({
    value: opts.value.getTime(),
    minimumDate: opts.minimumDate?.getTime() ?? null,
    maximumDate: opts.maximumDate?.getTime() ?? null,
    locale: 'en-US',
    mode: 'calendar',
  }).then(({ action, year, month, day }) => {
    return { action, year, month, day };
  }),
};
""",
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")
        
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        specs_dir = os.path.join(ohos_src, "specs", "v1")
        turbo_spec_path = os.path.join(specs_dir, "NativeRNDatePicker.ts")
        
        self.assertTrue(file_exists(turbo_spec_path), "应生成 NativeRNDatePicker.ts")
        
        turbo_spec_content = read_file(turbo_spec_path)
        
        self.assertIn("open", turbo_spec_content, "Spec 应包含 open 方法")
        self.assertIn("TurboModule", turbo_spec_content, "Spec 应继承 TurboModule")
        
        self.assertIn("value: number", turbo_spec_content, "open 参数应包含 value: number")
        self.assertIn("minimumDate: number | null", turbo_spec_content, "open 参数应包含 minimumDate: number | null")
        self.assertIn("maximumDate: number | null", turbo_spec_content, "open 参数应包含 maximumDate: number | null")
        self.assertIn("locale: string", turbo_spec_content, "open 参数应包含 locale: string")
        self.assertIn("mode: string", turbo_spec_content, "open 参数应包含 mode: string")
        
        self.assertIn("Promise<{", turbo_spec_content, "返回类型应为 Promise<{...}>")
        self.assertIn("action:", turbo_spec_content, "返回类型应包含 action")
        self.assertIn("year:", turbo_spec_content, "返回类型应包含 year")
        self.assertIn("month:", turbo_spec_content, "返回类型应包含 month")
        self.assertIn("day:", turbo_spec_content, "返回类型应包含 day")

    def test_migrate_35_nitro_modules_basic(self):
        """MIGRATE-35: NitroModules 基础迁移
        
        验证 NitroModules.createHybridObject 迁移到 TurboModule Spec
        """
        fixture_path = create_fixture_dir("migrate_m35", {
            "package.json": {"name": "test-m35", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import { NitroModules } from 'react-native-nitro-modules';
const Bluetooth = NitroModules.createHybridObject('BluetoothStateManager');
export const getState = () => Bluetooth.getState();
export const isEnabled = () => Bluetooth.isEnabled();
""",
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")
        
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        specs_dir = os.path.join(ohos_src, "specs", "v1")
        turbo_spec_path = os.path.join(specs_dir, "NativeBluetoothStateManager.ts")
        
        self.assertTrue(file_exists(turbo_spec_path), "应生成 NativeBluetoothStateManager.ts")
        
        turbo_spec_content = read_file(turbo_spec_path)
        self.assertIn("TurboModule", turbo_spec_content, "Spec 应继承 TurboModule")
        self.assertIn("getState", turbo_spec_content, "Spec 应包含 getState 方法")
        self.assertIn("isEnabled", turbo_spec_content, "Spec 应包含 isEnabled 方法")
        
        # 验证 JS import 已被修改
        index_content = read_file(os.path.join(ohos_src, "index.ts"))
        self.assertIn("import NativeBluetoothStateManager", index_content, "JS 应使用新 Spec import")
        self.assertNotIn("NitroModules", index_content, "JS 不应再有 NitroModules 引用")

    def test_migrate_36_nitro_with_fabric(self):
        """MIGRATE-36: NitroModules + Fabric 混合迁移
        
        验证 NitroModules 和 requireNativeComponent 同时迁移
        """
        fixture_path = create_fixture_dir("migrate_m36", {
            "package.json": {"name": "test-m36", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """import { NitroModules, requireNativeComponent } from 'react-native';
import { NitroModules } from 'react-native-nitro-modules';
const Location = NitroModules.createHybridObject('LocationModule');
const MapView = requireNativeComponent('MapView');
export { Location, MapView };
""",
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")
        
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        specs_dir = os.path.join(ohos_src, "specs", "v1")
        
        turbo_spec_path = os.path.join(specs_dir, "NativeLocationModule.ts")
        fabric_spec_path = os.path.join(specs_dir, "MapViewNativeComponent.ts")
        
        self.assertTrue(file_exists(turbo_spec_path), "应生成 NativeLocationModule.ts")
        self.assertTrue(file_exists(fabric_spec_path), "应生成 MapViewNativeComponent.ts")
        
        # 验证 codegen 配置包含两种 spec
        pkg = read_json(os.path.join(fixture_path, "ohos", "package.json"))
        codegen_lib = pkg.get("scripts", {}).get("codegen-lib", "")
        self.assertIn("--turbo-modules-spec-paths", codegen_lib)
        self.assertIn("--arkts-components-spec-paths", codegen_lib)
        self.assertIn("NativeLocationModule.ts", codegen_lib)
        self.assertIn("MapViewNativeComponent.ts", codegen_lib)

    def test_migrate_37_no_cumulative_replacement(self):
        """MIGRATE-37: 替换规则不会累积重复
        
        验证多次运行 migrate 不会产生 NativeNativeNativeRNAlipay 等累积错误
        
        Bug 背景：
        - 原代码使用 (r"\b" + module_name + r"\b", spec_import_name) 替换
        - 第二次运行时，NativeRNAlipay 中的 RNAlipay 会被再次匹配
        - 导致产生 NativeNativeRNAlipay，累积后变成 NativeNativeNative...
        """
        fixture_path = create_fixture_dir("migrate_m37", {
            "package.json": {"name": "test-m37", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNAlipay = NativeModules.RNAlipay;
export const pay = () => RNAlipay.pay('order123');
export const auth = () => RNAlipay.auth('token');
"""
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        # 第一次 migrate
        result_migrate1 = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate1.returncode, 0, f"migrate 1 failed: {result_migrate1.stderr}")
        
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        index1 = read_file(os.path.join(ohos_src, "index.js"))
        
        # 第一次 migrate 后应该正确替换
        self.assertIn("NativeRNAlipay.pay", index1)
        self.assertIn("NativeRNAlipay.auth", index1)
        self.assertNotIn("NativeNativeRNAlipay", index1)
        
        # 第二次 migrate
        result_migrate2 = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate2.returncode, 0, f"migrate 2 failed: {result_migrate2.stderr}")
        
        index2 = read_file(os.path.join(ohos_src, "index.js"))
        
        # 第二次 migrate 后不应产生累积
        self.assertIn("NativeRNAlipay.pay", index2)
        self.assertIn("NativeRNAlipay.auth", index2)
        self.assertNotIn("NativeNativeRNAlipay", index2)
        self.assertNotIn("NativeNativeNativeRNAlipay", index2)
        
        # 验证第一次和第二次结果相同（幂等）
        self.assertEqual(index1, index2, "migrate 应是幂等的，多次运行结果应相同")

    def test_migrate_38_no_duplicate_import(self):
        """MIGRATE-38: import 不会重复插入
        
        验证多次运行 migrate 不会产生重复的 import 语句
        
        Bug 背景：
        - 原代码未检查 import 是否已存在
        - 多次运行会在文件开头重复插入 import 语句
        """
        fixture_path = create_fixture_dir("migrate_m38", {
            "package.json": {"name": "test-m38", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules } from 'react-native';
const RNTest = NativeModules.RNTest;
export const getValue = () => RNTest.getValue();
"""
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        # 第一次 migrate
        result_migrate1 = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate1.returncode, 0, f"migrate 1 failed: {result_migrate1.stderr}")
        
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        index1 = read_file(os.path.join(ohos_src, "index.js"))
        
        # 计算第一次 migrate 后的 import 语句数量
        import_count1 = index1.count("import NativeRNTest from './specs/v1/NativeRNTest'")
        self.assertEqual(import_count1, 1, "第一次 migrate 后应该只有一个 import 语句")
        
        # 第二次 migrate
        result_migrate2 = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate2.returncode, 0, f"migrate 2 failed: {result_migrate2.stderr}")
        
        index2 = read_file(os.path.join(ohos_src, "index.js"))
        
        # 计算第二次 migrate 后的 import 语句数量
        import_count2 = index2.count("import NativeRNTest from './specs/v1/NativeRNTest'")
        self.assertEqual(import_count2, 1, "第二次 migrate 后仍然应该只有一个 import 语句")
        
        # 验证第一次和第二次结果相同（幂等）
        self.assertEqual(index1, index2, "migrate 应是幂等的，多次运行结果应相同")

    def test_migrate_39_already_migrated_var_definition(self):
        """MIGRATE-39: 已迁移的变量定义不应再次替换
        
        验证文件中已有 const RNAlipay = NativeRNAlipay 时，
        再次运行 migrate 不应替换 RNAlipay.xxx
        
        Bug 背景：
        - 用户手动保留了 const RNAlipay = NativeRNAlipay 的兼容写法
        - 再次运行 migrate 时，脚本无条件替换 RNAlipay.xxx
        - 导致产生错误的替换
        
        正确行为：
        - 检测到 const RNAlipay = NativeRNAlipay 后，跳过 RNAlipay.xxx 替换
        """
        fixture_path = create_fixture_dir("migrate_m39", {
            "package.json": {"name": "test-m39", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { NativeModules, Platform } from 'react-native';

const RNAlipay = NativeModules.RNAlipay || new Proxy({}, { get() { throw new Error('not linked'); } });

export default class Alipay {
  static pay(order) {
    return RNAlipay.pay(order);
  }
  static auth(token) {
    return RNAlipay.auth(token);
  }
}
"""
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        # 第一次 migrate
        result_migrate1 = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate1.returncode, 0, f"migrate 1 failed: {result_migrate1.stderr}")
        
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        index1 = read_file(os.path.join(ohos_src, "index.js"))
        
        # 第一次 migrate 后应该有 const RNAlipay = NativeRNAlipay
        self.assertIn("const RNAlipay = NativeRNAlipay", index1)
        self.assertIn("RNAlipay.pay(order)", index1)
        self.assertIn("RNAlipay.auth(token)", index1)
        
        # 第二次 migrate
        result_migrate2 = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate2.returncode, 0, f"migrate 2 failed: {result_migrate2.stderr}")
        
        index2 = read_file(os.path.join(ohos_src, "index.js"))
        
        # 第二次 migrate 后不应改变
        self.assertIn("const RNAlipay = NativeRNAlipay", index2)
        self.assertIn("RNAlipay.pay(order)", index2)
        self.assertIn("RNAlipay.auth(token)", index2)
        # 不应产生 NativeRNAlipay.pay（RNAlipay 已指向 NativeRNAlipay）
        self.assertNotIn("NativeRNAlipay.pay", index2)
        self.assertNotIn("NativeRNAlipay.auth", index2)
        
        # 幂等验证
        self.assertEqual(index1, index2, "migrate 应是幂等的")

    def test_migrate_40_complex_already_migrated_pattern(self):
        """MIGRATE-40: 复杂的已迁移模式
        
        验证多种已迁移写法都能正确识别并跳过替换：
        1. const Xxx = NativeXxx || fallback
        2. const Xxx = NativeXxx ? NativeXxx : fallback
        """
        fixture_path = create_fixture_dir("migrate_m40", {
            "package.json": {"name": "test-m40", "version": "1.0.0", "main": "src/index.js"},
            "src/index.js": """import { NativeModules } from 'react-native';

// 模式1: || fallback
const RNTestA = NativeModules.RNTestA || { method: () => {} };

// 模式2: 三元运算符（migrate 后可能变成）
// const RNTestB = NativeRNTestB ? NativeRNTestB : fallback;

export const testA = () => RNTestA.method();
// export const testB = () => RNTestB.method();
"""
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        # 第一次 migrate
        result_migrate1 = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate1.returncode, 0, f"migrate 1 failed: {result_migrate1.stderr}")
        
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        index1 = read_file(os.path.join(ohos_src, "index.js"))
        
        # 验证第一次 migrate 结果
        self.assertIn("NativeRNTestA", index1)
        
        # 第二次 migrate
        result_migrate2 = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate2.returncode, 0, f"migrate 2 failed: {result_migrate2.stderr}")
        
        index2 = read_file(os.path.join(ohos_src, "index.js"))
        
        # 不应产生累积
        self.assertNotIn("NativeNativeRNTestA", index2)
        self.assertNotIn("NativeNativeNativeRNTestA", index2)
        
        # 幂等验证
        self.assertEqual(index1, index2, "migrate 应是幂等的")

    def test_migrate_38_nitro_separate_spec_and_export(self):
        """MIGRATE-38: NitroModules 分离结构迁移
        
        验证真实 NitroModules 项目结构（类似 react-native-bluetooth-state-manager）：
        1. spec 定义文件（extends HybridObject）不被当作导出层
        2. 导出层文件（使用 createHybridObject）的 JS import 被正确修改
        3. 生成的 TurboModule Spec 正确
        """
        fixture_path = create_fixture_dir("migrate_m38", {
            "package.json": {"name": "test-m38", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """export * from './BluetoothStateManager'
""",
            "src/BluetoothStateManager.ts": """import { NitroModules } from 'react-native-nitro-modules'
import type { BluetoothState } from './specs/BluetoothStateManager.nitro'

const module = NitroModules.createHybridObject('BluetoothStateManager')

export const BluetoothStateManager = {
  getState: () => module.getState(),
  getStateSync: () => module.getStateSync(),
}
""",
            "src/specs/BluetoothStateManager.nitro.ts": """import { type HybridObject } from 'react-native-nitro-modules'

export type BluetoothState = 'PoweredOn' | 'PoweredOff' | 'Unknown'

export interface BluetoothStateManager extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  getState(): Promise<BluetoothState>
  getStateSync(): BluetoothState
}
""",
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")
        
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        specs_v1 = os.path.join(ohos_src, "specs", "v1")
        
        # 验证 1: 导出层文件在 ohos/src/（不在 specs/v1/）
        export_in_src = os.path.join(ohos_src, "BluetoothStateManager.ts")
        export_in_v1 = os.path.join(specs_v1, "BluetoothStateManager.ts")
        self.assertTrue(file_exists(export_in_src), "导出层文件应在 ohos/src/")
        self.assertFalse(file_exists(export_in_v1), "导出层文件不应在 specs/v1/")
        
        # 验证 2: TurboModule Spec 生成
        turbo_spec = os.path.join(specs_v1, "NativeBluetoothStateManager.ts")
        self.assertTrue(file_exists(turbo_spec), "应生成 NativeBluetoothStateManager.ts")
        
        turbo_spec_content = read_file(turbo_spec)
        self.assertIn("TurboModule", turbo_spec_content)
        self.assertIn("getState", turbo_spec_content)
        self.assertIn("getStateSync", turbo_spec_content)
        
        # 验证 3: 导出层 JS import 被修改
        export_content = read_file(export_in_src)
        self.assertIn("import NativeBluetoothStateManager", export_content, 
            "导出层应使用 TurboModule import")
        self.assertNotIn("import { NitroModules }", export_content, 
            "导出层不应有 NitroModules import")
        self.assertNotIn("createHybridObject", export_content, 
            "导出层不应有 createHybridObject 调用")
        
        # 验证 4: 方法调用被替换
        self.assertIn("NativeBluetoothStateManager.getState()", export_content,
            "方法调用应使用 TurboModule")

    def test_migrate_39_nitro_multiline_generic_format(self):
        """MIGRATE-39: NitroModules 跨行+泛型格式迁移
        
        验证 react-native-bluetooth-state-manager 实际代码格式：
        - 跨行的 createHybridObject 调用
        - 带泛型参数
        - 带尾随逗号
        
        migrate 应正确识别并移除这种格式
        """
        fixture_path = create_fixture_dir("migrate_m39", {
            "package.json": {"name": "test-m39", "version": "1.0.0", "main": "src/index.ts"},
            "src/index.ts": """export * from './BluetoothStateManager'
""",
            "src/BluetoothStateManager.ts": """import { NitroModules } from 'react-native-nitro-modules'

const module = NitroModules.createHybridObject<BluetoothStateManagerSpec>(
  'BluetoothStateManager',
)

export const BluetoothStateManager = {
  getState: () => module.getState(),
  getStateSync: () => module.getStateSync(),
}
""",
            "src/specs/BluetoothStateManager.nitro.ts": """import { type HybridObject } from 'react-native-nitro-modules'

export interface BluetoothStateManager extends HybridObject<{ ios: 'swift' }> {
  getState(): Promise<string>
  getStateSync(): string
}
""",
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")
        
        ohos_src = os.path.join(fixture_path, "ohos", "src")
        export_file = os.path.join(ohos_src, "BluetoothStateManager.ts")
        
        # 验证：NitroModules import 和 createHybridObject 被移除
        content = read_file(export_file)
        self.assertNotIn("import { NitroModules }", content, 
            "NitroModules import 应被移除")
        self.assertNotIn("createHybridObject", content, 
            "createHybridObject 调用应被移除（包括跨行格式）")
        self.assertIn("import NativeBluetoothStateManager", content,
            "应添加 TurboModule import")
        
        # 验证：const module 声明被移除
        self.assertNotIn("const module = NitroModules", content,
            "const module 声明应被完全移除")

    def test_migrate_41_fabric_props_from_android_react_prop(self):
        """MIGRATE-41: 从 Android @ReactProp 提取 Fabric props"""
        fixture_path = create_fixture_dir("migrate_m41", {
            "package.json": {"name": "test-m41", "version": "1.0.0"},
            "index.js": """import { requireNativeComponent } from 'react-native';
export default requireNativeComponent('TestView');
""",
            "android/src/main/java/com/test/TestViewManager.java": """package com.test;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

public class TestViewManager extends ViewGroupManager<TestView> {
    @Override
    public String getName() {
        return "TestView";
    }

    @ReactProp(name = "minimumZoomScale", defaultFloat = 1.0f)
    public void setMinimumZoomScale(TestView view, float scale) {
    }

    @ReactProp(name = "maximumZoomScale", defaultFloat = 3.0f)
    public void setMaximumZoomScale(TestView view, float scale) {
    }

    @ReactProp(name = "enabled", defaultBoolean = true)
    public void setEnabled(TestView view, boolean enabled) {
    }

    @ReactProp(name = "title")
    public void setTitle(TestView view, String title) {
    }
}
""",
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")
        
        # 验证 Fabric Spec 包含从 @ReactProp 提取的 props
        spec_path = os.path.join(fixture_path, "ohos", "src", "specs", "v1", "TestViewNativeComponent.ts")
        self.assertTrue(file_exists(spec_path), "Fabric Spec 应被生成")
        
        spec_content = read_file(spec_path)
        self.assertIn("minimumZoomScale", spec_content, "@ReactProp minimumZoomScale 应被提取")
        self.assertIn("maximumZoomScale", spec_content, "@ReactProp maximumZoomScale 应被提取")
        self.assertIn("enabled", spec_content, "@ReactProp enabled 应被提取")
        self.assertIn("title", spec_content, "@ReactProp title 应被提取")
        
        # 验证类型推断
        self.assertIn("minimumZoomScale?: number", spec_content, "defaultFloat 应推断为 number")
        self.assertIn("enabled?: boolean", spec_content, "defaultBoolean 应推断为 boolean")
        self.assertIn("title?: string", spec_content, "defaultString 应推断为 string")

    def test_migrate_42_fabric_props_from_ios_rct_export(self):
        """MIGRATE-42: 从 iOS RCT_EXPORT_VIEW_PROPERTY 提取 Fabric props"""
        fixture_path = create_fixture_dir("migrate_m42", {
            "package.json": {"name": "test-m42", "version": "1.0.0", "main": "index.js"},
            "index.js": """import { requireNativeComponent } from 'react-native';
export default requireNativeComponent('PickerView');
""",
            "ios/PickerViewManager.m": """
#import <React/RCTViewManager.h>

@interface PickerViewManager : RCTViewManager
@end

@implementation PickerViewManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(minimumValue, float)
RCT_EXPORT_VIEW_PROPERTY(maximumValue, float)
RCT_EXPORT_VIEW_PROPERTY(selectedIndex, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(enabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(title, NSString)

@end
""",
        })
        
        result_create = run_rn_create(fixture_path)
        self.assertEqual(result_create.returncode, 0, f"create failed: {result_create.stderr}")
        
        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")
        
        # 验证 Fabric Spec 包含从 RCT_EXPORT_VIEW_PROPERTY 提取的 props
        spec_path = os.path.join(fixture_path, "ohos", "src", "specs", "v1", "PickerViewNativeComponent.ts")
        self.assertTrue(file_exists(spec_path), "Fabric Spec 应被生成")
        
        spec_content = read_file(spec_path)
        self.assertIn("minimumValue", spec_content, "RCT_EXPORT_VIEW_PROPERTY minimumValue 应被提取")
        self.assertIn("maximumValue", spec_content, "RCT_EXPORT_VIEW_PROPERTY maximumValue 应被提取")
        self.assertIn("selectedIndex", spec_content, "RCT_EXPORT_VIEW_PROPERTY selectedIndex 应被提取")
        
        # 验证类型推断
        self.assertIn("minimumValue?: number", spec_content, "float 应推断为 number")
        self.assertIn("selectedIndex?: number", spec_content, "NSInteger 应推断为 number")
        self.assertIn("enabled?: boolean", spec_content, "BOOL 应推断为 boolean")


    def test_migrate_43_named_native_module_alias_constants(self):
        """MIGRATE-43: named NativeModules alias used across files."""
        fixture_path = create_fixture_dir("migrate_m43", {
            "package.json": {"name": "test-m43", "version": "1.0.0", "main": "src/index.ts"},
            "ohos/package.json": {
                "name": "@oh-rn/test-m43",
                "version": "1.0.0",
                "scripts": {"codegen-lib": "react-native codegen-harmony --cpp-output-path ./src/main/cpp/generated"}
            },
            "ohos/src/index.ts": """export * from './initial-mode';
""",
            "ohos/src/native-module.ts": """import { NativeModules } from 'react-native';

export const NativeModule = NativeModules.RNDarkMode
""",
            "ohos/src/initial-mode.ts": """import { NativeModule } from './native-module'

export const initialMode = NativeModule.initialMode
export const supportsDarkMode = NativeModule.supportsDarkMode
""",
        })

        result_migrate = run_rn_migrate(fixture_path)
        self.assertEqual(result_migrate.returncode, 0, f"migrate failed: {result_migrate.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        spec_path = os.path.join(ohos_src, "specs", "v1", "NativeRNDarkMode.ts")
        self.assertTrue(file_exists(spec_path), "TurboModule spec should be generated")

        spec_content = read_file(spec_path)
        self.assertIn("getConstants()", spec_content)
        self.assertIn("initialMode: any", spec_content)
        self.assertIn("supportsDarkMode: any", spec_content)
        self.assertNotIn("No methods or constants defined", spec_content)

        native_module_content = read_file(os.path.join(ohos_src, "native-module.ts"))
        self.assertIn("import NativeRNDarkMode from './specs/v1/NativeRNDarkMode';", native_module_content)
        self.assertIn("export const NativeModule = NativeRNDarkMode", native_module_content)
        self.assertNotIn("NativeModules", native_module_content)

        initial_mode_content = read_file(os.path.join(ohos_src, "initial-mode.ts"))
        self.assertIn("NativeModule.getConstants().initialMode", initial_mode_content)
        self.assertIn("NativeModule.getConstants().supportsDarkMode", initial_mode_content)


if __name__ == "__main__":
    unittest.main()
