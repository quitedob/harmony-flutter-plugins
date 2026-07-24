"""rn.py create ohos/harmony/example/har 子命令测试（仅 --light）

深度验证：
- 目录结构正确性
- 文件内容正确性
- 占位符替换正确性

测试用例：
- CREATE-SUBCMD-01 ~ CREATE-SUBCMD-15: create 子命令测试
"""

import json
import os
import unittest

from test_helpers import (
    create_fixture_dir, cleanup_fixture, FIXTURES_DIR,
    read_json, read_file, file_exists, dir_exists,
    run_rn_create_ohos, run_rn_create_harmony,
    run_rn_create_example, run_rn_create_har
)


class TestRnCreateSubcmd(unittest.TestCase):
    """rn.py create ohos/harmony/example/har 子命令测试（仅 --light）
    
    深度验证：
    - 目录结构正确性
    - 文件内容正确性
    - 占位符替换正确性
    """

    def setUp(self):
        self._cleanups = []

    def tearDown(self):
        for path in self._cleanups:
            cleanup_fixture(path)
        self._cleanups.clear()

    def _create_fixture_with_cleanup(self, name: str, files: dict) -> str:
        path = create_fixture_dir(name, files)
        self._cleanups.append(path)
        return path

    def test_create_ohos_js_only_light(self):
        """CREATE-SUBCMD-01: create ohos --light (js-only)
        
        验证：
        1. ohos/package.json 存在且版本正确
        2. js-only 正确裁剪（删除 bob、prepare）
        3. node_modules 不存在（--light）
        """
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_01", {
            "package.json": {
                "name": "test-js-only-lib",
                "version": "1.0.0",
                "main": "index.js"
            },
            "index.js": "export const foo = 'bar';"
        })

        result = run_rn_create_ohos(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)

        ohos_dir = os.path.join(fixture_path, "ohos")
        self.assertTrue(dir_exists(ohos_dir))
        
        ohos_pkg = os.path.join(ohos_dir, "package.json")
        pkg = read_json(ohos_pkg)
        
        self.assertIn("test-js-only-lib", pkg.get("name", ""), "package.json name 应继承")
        self.assertEqual(pkg.get("version"), "1.0.0", "package.json version 应继承")
        self.assertIn("./src/", pkg.get("main", ""), "js-only 入口应为 ./src/")
        self.assertNotIn("react-native-builder-bob", pkg, "js-only 应删除 bob 配置")
        self.assertNotIn("prepare", pkg.get("scripts", {}), "js-only 应删除 prepare script")
        self.assertIn("src/", pkg.get("files", []), "js-only files 应包含 src/")
        
        node_modules = os.path.join(ohos_dir, "node_modules")
        self.assertFalse(dir_exists(node_modules), "--light 应跳过 node_modules")

    def test_create_ohos_ts_light(self):
        """CREATE-SUBCMD-02: create ohos --light (TS source)
        
        验证：
        1. ohos/package.json: main、module、types 保留 dist 路径
        2. bob 配置保留
        3. prepare script 保留
        """
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_02", {
            "package.json": {
                "name": "test-ts-lib",
                "version": "2.0.0",
                "main": "src/index.ts"
            },
            "src/index.ts": "export const foo: string = 'bar';"
        })

        result = run_rn_create_ohos(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)

        ohos_pkg = os.path.join(fixture_path, "ohos", "package.json")
        pkg = read_json(ohos_pkg)
        
        self.assertIn("./dist/commonjs/", pkg.get("main", ""), "TS 入口应为 dist/commonjs")
        self.assertIn("./dist/module/", pkg.get("module", ""), "TS module 应为 dist/module")
        self.assertIn("./dist/typescript/", pkg.get("types", ""), "TS types 应为 dist/typescript")
        
        bob_config = pkg.get("react-native-builder-bob", {})
        self.assertIsInstance(bob_config, dict, "TS 应保留 bob 配置")
        self.assertEqual(bob_config.get("source"), "src", "bob.source 应为 src")
        self.assertEqual(bob_config.get("output"), "dist", "bob.output 应为 dist")
        
        scripts = pkg.get("scripts", {})
        self.assertIn("prepare", scripts, "TS 应保留 prepare script")
        self.assertIn("bob build", scripts.get("prepare", ""), "prepare 应包含 bob build")

    def test_create_harmony_native_light(self):
        """CREATE-SUBCMD-03: create harmony --light (原生模块)
        
        验证：
        1. harmony/test_module 目录存在
        2. oh-package.json5: name 替换正确
        3. module.json5: name 字段替换为 test_module
        4. Package.h 存在且内容正确
        5. index.ets: {{CAMEL_NAME}} 替换正确
        6. CMakeLists.txt: {{SHORT_NAME}} 替换正确
        """
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_03", {
            "package.json": {
                "name": "react-native-test-module",
                "version": "1.0.0"
            },
            "src/NativeTestModule.ts": "import { TurboModuleRegistry } from 'react-native';\nexport default TurboModuleRegistry.getEnforcing('TestModule');"
        })

        result = run_rn_create_ohos(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)
        
        ohos_pkg = os.path.join(fixture_path, "ohos", "package.json")
        self.assertTrue(file_exists(ohos_pkg), "ohos/package.json 应存在")

        result = run_rn_create_harmony(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)

        harmony_dir = os.path.join(fixture_path, "ohos", "harmony", "test_module")
        self.assertTrue(dir_exists(harmony_dir), "harmony/test_module 应存在")

        oh_pkg = os.path.join(harmony_dir, "oh-package.json5")
        self.assertTrue(file_exists(oh_pkg))
        content = read_file(oh_pkg)
        self.assertIn("@oh-rn/react-native-test-module", content, "oh-package.json5 name 应替换正确")

        module_json5 = os.path.join(harmony_dir, "src", "main", "module.json5")
        self.assertTrue(file_exists(module_json5))
        content = read_file(module_json5)
        self.assertIn('"name": "test_module"', content, "module.json5 name 应为 test_module")
        self.assertNotIn('"name": "library"', content, "module.json5 name 不应为 library")

        package_h = os.path.join(harmony_dir, "src", "main", "cpp", "TestModulePackage.h")
        self.assertTrue(file_exists(package_h), "Package.h 应创建")
        content = read_file(package_h)
        self.assertIn("TestModulePackage", content, "Package.h 应包含 TestModulePackage")
        self.assertIn("BaseTestModulePackage", content, "Package.h 应包含 BaseTestModulePackage")

        index_ets = os.path.join(harmony_dir, "index.ets")
        self.assertTrue(file_exists(index_ets))
        content = read_file(index_ets)
        self.assertIn("TestModule", content, "index.ets 应替换 {{CAMEL_NAME}}")

        cmake = os.path.join(harmony_dir, "src", "main", "cpp", "CMakeLists.txt")
        self.assertTrue(file_exists(cmake))
        content = read_file(cmake)
        self.assertIn("test_module", content, "CMakeLists.txt 应替换 {{SHORT_NAME}}")

    def test_create_harmony_js_only_skip(self):
        """CREATE-SUBCMD-04: create harmony --light (js-only 应跳过)"""
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_04", {
            "package.json": {
                "name": "test-js-skip",
                "version": "1.0.0"
            },
            "index.js": "export const foo = 'bar';"
        })

        ohos_dir = os.path.join(fixture_path, "ohos")
        os.makedirs(ohos_dir, exist_ok=True)

        result = run_rn_create_harmony(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)

        harmony_dir = os.path.join(fixture_path, "ohos", "harmony")
        self.assertFalse(dir_exists(harmony_dir), "js-only 不应创建 harmony 目录")

    def test_create_example_light(self):
        """CREATE-SUBCMD-05: create example --light
        
        验证：
        1. example/package.json: dependencies 包含正确的 tgz 引用
        2. example/harmony 目录存在
        3. example/package.json name 正确
        """
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_05", {
            "package.json": {
                "name": "test-example-lib",
                "version": "1.0.0"
            },
            "index.js": "export const foo = 'bar';"
        })

        ohos_dir = os.path.join(fixture_path, "ohos")
        os.makedirs(ohos_dir, exist_ok=True)
        
        ohos_pkg = {"name": "@oh-rn/test-example-lib", "version": "1.0.0"}
        with open(os.path.join(ohos_dir, "package.json"), "w", encoding="utf-8") as f:
            json.dump(ohos_pkg, f)

        result = run_rn_create_example(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)

        example_dir = os.path.join(fixture_path, "ohos", "example")
        self.assertTrue(dir_exists(example_dir))

        example_pkg = os.path.join(example_dir, "package.json")
        pkg = read_json(example_pkg)
        
        deps = pkg.get("dependencies", {})
        self.assertIn("@oh-rn/test-example-lib", deps)
        tgz_ref = deps.get("@oh-rn/test-example-lib", "")
        self.assertIn("file:../", tgz_ref, "依赖应为 file:../xxx.tgz")
        self.assertIn("test-example-lib-1.0.0.tgz", tgz_ref, "tgz 名称应正确")

        example_harmony = os.path.join(example_dir, "harmony")
        self.assertTrue(dir_exists(example_harmony), "example/harmony 应存在")

    def test_create_har_native_light(self):
        """CREATE-SUBCMD-06: create har --light (原生模块)
        
        验证：
        1. har_wrapper 目录存在
        2. build-profile.json5: {{SHORT_NAME}} 替换正确
        3. library 重命名为 test_har
        4. test_har/module.json5: name 替换正确
        5. test_har/CMakeLists.txt: {{SHORT_NAME}} 替换正确
        """
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_06", {
            "package.json": {
                "name": "react-native-test-har",
                "version": "1.0.0"
            },
            "src/NativeTestHar.ts": "import { TurboModuleRegistry } from 'react-native';\nexport default TurboModuleRegistry.getEnforcing('TestHar');"
        })

        result = run_rn_create_ohos(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)
        
        ohos_pkg = os.path.join(fixture_path, "ohos", "package.json")
        self.assertTrue(file_exists(ohos_pkg), "ohos/package.json 应存在")

        result = run_rn_create_har(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)

        har_wrapper_dir = os.path.join(fixture_path, "ohos", ".rn-build", "har_wrapper")
        self.assertTrue(dir_exists(har_wrapper_dir))

        build_profile = os.path.join(har_wrapper_dir, "build-profile.json5")
        self.assertTrue(file_exists(build_profile))
        content = read_file(build_profile)
        self.assertIn("test_har", content, "build-profile.json5 应替换 {{SHORT_NAME}}")
        self.assertNotIn("{{SHORT_NAME}}", content, "{{SHORT_NAME}} 应被替换")

        library_dir = os.path.join(har_wrapper_dir, "test_har")
        self.assertTrue(dir_exists(library_dir), "library 应重命名为 test_har")
        self.assertFalse(dir_exists(os.path.join(har_wrapper_dir, "library")), "原 library 目录应不存在")

        module_json5 = os.path.join(library_dir, "src", "main", "module.json5")
        self.assertTrue(file_exists(module_json5))
        content = read_file(module_json5)
        self.assertIn('"name": "test_har"', content, "module.json5 name 应为 test_har")

        cmake = os.path.join(library_dir, "src", "main", "cpp", "CMakeLists.txt")
        self.assertTrue(file_exists(cmake))
        content = read_file(cmake)
        self.assertIn("test_har", content, "CMakeLists.txt 应替换 {{SHORT_NAME}}")

    def test_create_har_js_only_skip(self):
        """CREATE-SUBCMD-07: create har --light (js-only 应跳过)"""
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_07", {
            "package.json": {
                "name": "test-har-skip",
                "version": "1.0.0"
            },
            "index.js": "export const foo = 'bar';"
        })

        ohos_dir = os.path.join(fixture_path, "ohos")
        os.makedirs(ohos_dir, exist_ok=True)

        result = run_rn_create_har(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)

        har_wrapper_dir = os.path.join(fixture_path, "ohos", ".rn-build", "har_wrapper")
        self.assertFalse(dir_exists(har_wrapper_dir), "js-only 不应创建 har_wrapper")

    def test_create_subcmd_order(self):
        """CREATE-SUBCMD-08: 子命令执行顺序（先 ohos 再其他）
        
        验证：
        1. 顺序执行：ohos → harmony → example → har
        2. 每步目录正确创建
        3. 最终结构完整
        """
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_08", {
            "package.json": {
                "name": "react-native-order-test",
                "version": "1.0.0"
            },
            "src/NativeOrderTest.ts": "import { TurboModuleRegistry } from 'react-native';\nexport default TurboModuleRegistry.getEnforcing('OrderTest');"
        })

        result = run_rn_create_ohos(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)
        ohos_dir = os.path.join(fixture_path, "ohos")
        self.assertTrue(dir_exists(ohos_dir))
        self.assertTrue(file_exists(os.path.join(ohos_dir, "package.json")))

        result = run_rn_create_harmony(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)
        harmony_dir = os.path.join(ohos_dir, "harmony", "order_test")
        self.assertTrue(dir_exists(harmony_dir))
        self.assertTrue(file_exists(os.path.join(harmony_dir, "oh-package.json5")))

        result = run_rn_create_example(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)
        example_dir = os.path.join(ohos_dir, "example")
        self.assertTrue(dir_exists(example_dir))
        self.assertTrue(file_exists(os.path.join(example_dir, "package.json")))

        result = run_rn_create_har(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)
        har_wrapper_dir = os.path.join(ohos_dir, ".rn-build", "har_wrapper")
        self.assertTrue(dir_exists(har_wrapper_dir))
        self.assertTrue(dir_exists(os.path.join(har_wrapper_dir, "order_test")))

    def test_create_ohos_light_skip_compilation_artifacts(self):
        """CREATE-SUBCMD-09: create ohos --light 跳过编译产物
        
        验证：
        1. node_modules 不存在
        2. oh_modules 不存在（如果模板有）
        3. build 目录不存在（如果模板有）
        """
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_09", {
            "package.json": {
                "name": "test-light-skip",
                "version": "1.0.0"
            },
            "index.js": "export const foo = 'bar';"
        })

        result = run_rn_create_ohos(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)

        ohos_dir = os.path.join(fixture_path, "ohos")
        
        node_modules = os.path.join(ohos_dir, "node_modules")
        self.assertFalse(dir_exists(node_modules), "--light 应跳过 node_modules")
        
        oh_modules = os.path.join(ohos_dir, "oh_modules")
        self.assertFalse(dir_exists(oh_modules), "--light 应跳过 oh_modules")

    def test_create_ohos_package_merge(self):
        """CREATE-SUBCMD-10: create ohos package.json 合并
        
        验证：
        1. 根 package.json 字段正确合并到 ohos
        2. dependencies 合并
        3. peerDependencies 合并
        """
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_10", {
            "package.json": {
                "name": "test-merge-pkg",
                "version": "3.0.0",
                "description": "Test package merge",
                "dependencies": {
                    "react-native": "^0.70.0"
                },
                "peerDependencies": {
                    "react": "^18.0.0"
                }
            },
            "index.js": "export const foo = 'bar';"
        })

        result = run_rn_create_ohos(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)

        ohos_pkg = os.path.join(fixture_path, "ohos", "package.json")
        pkg = read_json(ohos_pkg)
        
        self.assertIn("test-merge-pkg", pkg.get("name", ""), "name 应合并")
        self.assertEqual(pkg.get("version"), "3.0.0", "version 应合并")
        self.assertEqual(pkg.get("description"), "Test package merge", "description 应合并")
        
        deps = pkg.get("dependencies", {})
        self.assertIn("react-native", deps, "dependencies 应合并")
        
        peer_deps = pkg.get("peerDependencies", {})
        self.assertIn("react", peer_deps, "peerDependencies 应合并")

    def test_create_ohos_source_copy_single_file(self):
        """CREATE-SUBCMD-11: create ohos 源码拷贝（单文件）
        
        验证：
        1. ohos/src/index.js 存在（入口文件拷贝）
        2. 源码内容正确
        """
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_11", {
            "package.json": {
                "name": "test-single-source",
                "version": "1.0.0",
                "main": "index.js"
            },
            "index.js": "export const single = 'file';\nexport function hello() { return 'world'; }"
        })

        result = run_rn_create_ohos(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(dir_exists(ohos_src), "ohos/src 应存在")

        index_file = os.path.join(ohos_src, "index.js")
        self.assertTrue(file_exists(index_file), "ohos/src/index.js 应存在")

        content = read_file(index_file)
        self.assertIn("export const single", content, "源码内容应正确拷贝")
        self.assertIn("export function hello", content, "函数定义应正确拷贝")

    def test_create_ohos_source_copy_with_directory(self):
        """CREATE-SUBCMD-12: create ohos 源码拷贝（多文件保持目录结构）
        
        验证：
        1. ohos/src/utils/helper.js 存在
        2. ohos/src/index.js 存在
        3. 目录结构正确
        """
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_12", {
            "package.json": {
                "name": "test-multi-source",
                "version": "1.0.0",
                "main": "src/index.js"
            },
            "src/index.js": "import { helper } from './utils/helper';\nexport const main = 'entry';",
            "src/utils/helper.js": "export function helper() { return 'help'; }"
        })

        result = run_rn_create_ohos(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        
        index_file = os.path.join(ohos_src, "index.js")
        self.assertTrue(file_exists(index_file), "ohos/src/index.js 应存在")

        utils_dir = os.path.join(ohos_src, "utils")
        self.assertTrue(dir_exists(utils_dir), "ohos/src/utils 目录应存在")

        helper_file = os.path.join(utils_dir, "helper.js")
        self.assertTrue(file_exists(helper_file), "ohos/src/utils/helper.js 应存在")

        content = read_file(helper_file)
        self.assertIn("export function helper", content, "子目录文件内容应正确")

    def test_create_ohos_dual_entry_barrel(self):
        """CREATE-SUBCMD-12b: 根 index.js barrel + src/index.js 实现均保留"""
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_dual", {
            "package.json": {
                "name": "test-dual-entry-ohos",
                "version": "1.0.0",
                "main": "index.js",
            },
            "index.js": "import { fn } from './src';\nexport default { fn };\nexport { fn };\n",
            "src/index.js": "import { NativeModules } from 'react-native';\nexport const fn = () => NativeModules.X.fn();\n",
        })

        result = run_rn_create_ohos(fixture_path, light=True)
        self.assertEqual(result.returncode, 0, f"create ohos failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        self.assertTrue(file_exists(os.path.join(ohos_src, "index.js")))
        self.assertTrue(file_exists(os.path.join(ohos_src, "src", "index.js")))

        barrel = read_file(os.path.join(ohos_src, "index.js"))
        impl = read_file(os.path.join(ohos_src, "src", "index.js"))
        self.assertIn("from './src'", barrel)
        self.assertIn("NativeModules", impl)

    def test_create_ohos_specs_copy(self):
        """CREATE-SUBCMD-13: create ohos specs 拷贝
        
        验证：
        1. ohos/src/specs/v1/NativeTestSpec.ts 存在
        2. specs 文件内容正确
        3. v1 目录结构正确
        """
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_13", {
            "package.json": {
                "name": "test-specs-copy",
                "version": "1.0.0"
            },
            "src/NativeTestSpec.ts": "import { TurboModuleRegistry } from 'react-native';\nexport default TurboModuleRegistry.getEnforcing('TestSpec');",
            "src/index.ts": "export { default as TestSpec } from './NativeTestSpec';"
        })

        result = run_rn_create_ohos(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)

        specs_v1_dir = os.path.join(fixture_path, "ohos", "src", "specs", "v1")
        self.assertTrue(dir_exists(specs_v1_dir), "ohos/src/specs/v1 目录应存在")

        spec_file = os.path.join(specs_v1_dir, "NativeTestSpec.ts")
        self.assertTrue(file_exists(spec_file), "Spec 文件应拷贝到 v1 目录")

        content = read_file(spec_file)
        self.assertIn("TurboModuleRegistry", content, "Spec 内容应正确")
        self.assertIn("TestSpec", content, "Spec 名称应正确")

    def test_create_ohos_ts_entry_copy(self):
        """CREATE-SUBCMD-14: create ohos TS 入口文件拷贝
        
        验证：
        1. TS 入口正确拷贝为 index.ts
        2. TSX 文件正确处理
        """
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_14", {
            "package.json": {
                "name": "test-ts-entry",
                "version": "1.0.0",
                "main": "src/index.ts"
            },
            "src/index.ts": "import { MyType } from './types';\nexport const tsEntry: MyType = { name: 'typescript' };",
            "src/types.ts": "export type MyType = { name: string };"
        })

        result = run_rn_create_ohos(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        
        index_ts = os.path.join(ohos_src, "index.ts")
        self.assertTrue(file_exists(index_ts), "TS 入口应为 index.ts")

        content = read_file(index_ts)
        self.assertIn("typescript", content, "TS 入口内容应正确")

        types_ts = os.path.join(ohos_src, "types.ts")
        self.assertTrue(file_exists(types_ts), "其他 TS 文件应拷贝")

        content = read_file(types_ts)
        self.assertIn("MyType", content, "类型定义应正确拷贝")

    def test_create_ohos_source_skip_spec_in_remaining(self):
        """CREATE-SUBCMD-15: create ohos 源码拷贝跳过已拷贝的 spec
        
        验证：
        1. spec 文件只存在于 specs/v1 目录
        2. src 根目录下没有重复的 spec 文件
        """
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_15", {
            "package.json": {
                "name": "test-spec-skip",
                "version": "1.0.0"
            },
            "src/NativeSkipSpec.ts": "import { TurboModuleRegistry } from 'react-native';\nexport default TurboModuleRegistry.getEnforcing('SkipSpec');",
            "src/index.ts": "export { default as SkipSpec } from './NativeSkipSpec';"
        })

        result = run_rn_create_ohos(fixture_path, light=True)
        self.assertEqual(result.returncode, 0)

        ohos_src = os.path.join(fixture_path, "ohos", "src")

        spec_in_v1 = os.path.join(ohos_src, "specs", "v1", "NativeSkipSpec.ts")
        self.assertTrue(file_exists(spec_in_v1), "Spec 应在 v1 目录")

        spec_in_root = os.path.join(ohos_src, "NativeSkipSpec.ts")
        self.assertFalse(file_exists(spec_in_root), "Spec 不应在 src 根目录重复")

    def test_create_ohos_nitro_spec_vs_export_layer(self):
        """CREATE-SUBCMD-16: NitroModules spec 定义 vs 导出层区分
        
        验证：
        1. extends HybridObject< 的 spec 定义文件拷贝到 specs/v1/
        2. 使用 NitroModules.createHybridObject 的导出层文件拷贝到 ohos/src/（而非 specs/v1/）
        3. 导出层文件不会被误识别为 spec
        
        这是 react-native-bluetooth-state-manager 等库的实际结构
        """
        fixture_path = self._create_fixture_with_cleanup("create_subcmd_16", {
            "package.json": {
                "name": "test-nitro-structure",
                "version": "1.0.0",
                "main": "src/index.ts"
            },
            "src/index.ts": """export * from './BluetoothStateManager'
""",
            "src/BluetoothStateManager.ts": """import { NitroModules } from 'react-native-nitro-modules'
import type { BluetoothState } from './specs/BluetoothStateManager.nitro'

const module = NitroModules.createHybridObject<BluetoothStateManagerSpec>('BluetoothStateManager')

export const BluetoothStateManager = {
  getState: () => module.getState(),
  getStateSync: () => module.getStateSync(),
}
""",
            "src/specs/BluetoothStateManager.nitro.ts": """import { type HybridObject } from 'react-native-nitro-modules'

export type BluetoothState = 'PoweredOn' | 'PoweredOff' | 'Unknown'

export interface BluetoothStateManager
  extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  getState(): Promise<BluetoothState>
  getStateSync(): BluetoothState
}
""",
        })

        result = run_rn_create_ohos(fixture_path, light=True)
        self.assertEqual(result.returncode, 0, f"create failed: {result.stderr}")

        ohos_src = os.path.join(fixture_path, "ohos", "src")
        specs_v1 = os.path.join(ohos_src, "specs", "v1")
        
        # 验证 1: spec 定义文件应在 specs/v1/（或 specs/）
        nitro_spec_in_v1 = os.path.join(specs_v1, "BluetoothStateManager.nitro.ts")
        nitro_spec_in_specs = os.path.join(ohos_src, "specs", "BluetoothStateManager.nitro.ts")
        spec_exists = file_exists(nitro_spec_in_v1) or file_exists(nitro_spec_in_specs)
        self.assertTrue(spec_exists, "Nitro spec 定义文件应被拷贝")
        
        # 验证 2: 导出层文件应在 ohos/src/（而非 specs/v1/）
        export_layer_in_src = os.path.join(ohos_src, "BluetoothStateManager.ts")
        export_layer_in_v1 = os.path.join(specs_v1, "BluetoothStateManager.ts")
        
        self.assertTrue(file_exists(export_layer_in_src), 
            "导出层文件（使用 createHybridObject）应拷贝到 ohos/src/")
        self.assertFalse(file_exists(export_layer_in_v1), 
            "导出层文件不应被误拷贝到 specs/v1/")
        
        # 验证 3: 导出层内容正确（包含 createHybridObject）
        if file_exists(export_layer_in_src):
            content = read_file(export_layer_in_src)
            self.assertIn("createHybridObject", content, 
                "导出层文件应保留 createHybridObject 使用")


if __name__ == "__main__":
    unittest.main()
