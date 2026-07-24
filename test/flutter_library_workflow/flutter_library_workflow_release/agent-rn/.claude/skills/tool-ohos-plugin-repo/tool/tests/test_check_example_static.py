"""check_example_static.py unit tests.

Note: check_public_exports and check_jsx_syntax_errors tests removed.
These checks are now covered by example's npm run tsc (TypeScript compiler).

Run:
    python -m pytest tests/test_check_example_static.py -v
Or:
    python tests/test_check_example_static.py
"""
import os
import re
import sys
import json
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from check_example_static import (
    check_fabric_component_index,
    check_fabric_builder_stack,
    check_runtime_dep_registration,
    _extract_ark_ts_component_names,
    _extract_builder_function_body,
    _resolve_fabric_component_name,
)


def write_fixture(root: Path, files: dict) -> None:
    for rel, content in files.items():
        p = root / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(content, encoding="utf-8")


def base_pkg(overrides: dict = None) -> dict:
    pkg = {
        "name": "@oh-rn/demo-plugin",
        "main": "src/index.ts",
        "harmony": {"alias": "react-native-demo"},
    }
    if overrides:
        pkg.update(overrides)
    return pkg


def _fabric_index_ets(ark_const: str, rnapp_ark: str) -> str:
    return "\n".join([
        "import { RNMonthPicker } from '@oh-rn/demo/src/main/ets/components/RNMonthPicker';",
        ark_const,
        "@Builder",
        "export function buildCustomRNComponent(ctx: ComponentBuilderContext) {",
        "  Stack() {",
        "    if (ctx.componentName === RNMonthPicker.NAME) {",
        "      RNMonthPicker({ ctx: ctx.rnComponentContext, tag: ctx.tag })",
        "    }",
        "  }",
        "}",
        "RNApp({",
        "  rnInstanceConfig: {",
        f"    {rnapp_ark}",
        "  },",
        "})",
    ])


def _fabric_component_ets() -> str:
    return "\n".join([
        "export struct RNMonthPicker {",
        '  public static readonly NAME = "RNMonthPicker"',
        "}",
    ])


class TestCheckFabricComponentIndex(unittest.TestCase):
    def setUp(self):
        self.tmp_root = Path(tempfile.mkdtemp(prefix="check-fabric-index-"))

    def tearDown(self):
        import shutil
        shutil.rmtree(self.tmp_root, ignore_errors=True)

    def _write_fabric_repo(self, index_content: str) -> Path:
        repo = self.tmp_root / "fabric"
        write_fixture(repo, {
            "ohos/package.json": json.dumps(base_pkg(), indent=2),
            "ohos/harmony/demo_picker/src/main/ets/components/RNMonthPicker.ets": _fabric_component_ets(),
            "ohos/example/harmony/entry/src/main/ets/pages/Index.ets": index_content,
        })
        return repo

    def test_pass_const_with_variable_ref(self):
        """Canonical template: const [...] + arkTsComponentNames: arkTsComponentNames."""
        repo = self._write_fabric_repo(_fabric_index_ets(
            "const arkTsComponentNames: Array<string> = [RNMonthPicker.NAME]",
            "arkTsComponentNames: arkTsComponentNames",
        ))
        r = check_fabric_component_index(str(repo))
        self.assertFalse(r["skipped"])
        self.assertTrue(r["ok"], msg=r.get("errors"))
        self.assertIn("RNMonthPicker.NAME", r["details"]["arkTsComponentNames"])

    def test_pass_inline_string_literal(self):
        repo = self._write_fabric_repo(_fabric_index_ets(
            "const arkTsComponentNames: Array<string> = ['RNMonthPicker']",
            "arkTsComponentNames: ['RNMonthPicker']",
        ))
        r = check_fabric_component_index(str(repo))
        self.assertTrue(r["ok"], msg=r.get("errors"))

    def test_fail_empty_registration(self):
        repo = self._write_fabric_repo(_fabric_index_ets(
            "const arkTsComponentNames: Array<string> = []",
            "arkTsComponentNames: arkTsComponentNames",
        ))
        r = check_fabric_component_index(str(repo))
        self.assertFalse(r["ok"])
        self.assertTrue(any("not in arkTsComponentNames" in e for e in r["errors"]))

    def test_pass_spec_name_via_const(self):
        """Component ETS uses Spec.NAME; const registers RNMonthPicker.NAME."""
        repo = self._write_fabric_repo(_fabric_index_ets(
            "const arkTsComponentNames: Array<string> = [RNMonthPicker.NAME]",
            "arkTsComponentNames: arkTsComponentNames",
        ))
        write_fixture(repo, {
            "ohos/harmony/demo_picker/src/main/ets/components/RNMonthPicker.ets": "\n".join([
                "import Spec from '../generated/components/RNMonthPicker'",
                "export struct RNMonthPicker {",
                "  public static readonly NAME = Spec.NAME",
                "}",
            ]),
            "ohos/harmony/demo_picker/src/main/ets/generated/components/RNMonthPicker.ts": "\n".join([
                'export const NAME = "RNMonthPicker" as const',
            ]),
        })
        r = check_fabric_component_index(str(repo))
        self.assertTrue(r["ok"], msg=r.get("errors"))

    def test_pass_multiline_const_array(self):
        index = _fabric_index_ets(
            "\n".join([
                "const arkTsComponentNames: Array<string> = [",
                "  RNMonthPicker.NAME,",
                "]",
            ]),
            "arkTsComponentNames: arkTsComponentNames",
        )
        repo = self._write_fabric_repo(index)
        r = check_fabric_component_index(str(repo))
        self.assertTrue(r["ok"], msg=r.get("errors"))

    def test_skip_fabric_when_capi_disabled(self):
        index = _fabric_index_ets(
            "const arkTsComponentNames: Array<string> = []",
            "enableCAPIArchitecture: false,\n    arkTsComponentNames: []",
        )
        repo = self._write_fabric_repo(index)
        r = check_fabric_component_index(str(repo))
        self.assertTrue(r["skipped"])
        self.assertEqual(r["details"]["reason"], "capi_disabled")

    def test_builder_body_nested_braces(self):
        index = "\n".join([
            "@Builder",
            "export function buildCustomRNComponent(ctx: ComponentBuilderContext) {",
            "  Stack() {",
            "    if (ctx.componentName === RNMonthPicker.NAME) {",
            "      RNMonthPicker({ ctx: ctx.rnComponentContext, tag: ctx.tag })",
            "    }",
            "  }",
            "  .position({ x: 0, y: 0 })",
            "}",
        ])
        body = _extract_builder_function_body(index)
        self.assertIn("Stack()", body)
        self.assertIn(".position", body)
        self.assertIn("RNMonthPicker", body)


class TestFabricHelpers(unittest.TestCase):
    def test_extract_ark_names_variable_ref_before_empty_inline(self):
        code = "\n".join([
            "const arkTsComponentNames: Array<string> = [RNMonthPicker.NAME]",
            "RNApp({ rnInstanceConfig: { arkTsComponentNames: arkTsComponentNames } })",
        ])
        self.assertIn("RNMonthPicker.NAME", _extract_ark_ts_component_names(code))

    def test_resolve_spec_name(self):
        import tempfile
        tmp = Path(tempfile.mkdtemp())
        ets = tmp / "src" / "main" / "ets" / "components" / "RNMonthPicker.ets"
        ets.parent.mkdir(parents=True, exist_ok=True)
        gen = tmp / "src" / "main" / "ets" / "generated" / "components"
        gen.mkdir(parents=True, exist_ok=True)
        ets.write_text(
            "export struct RNMonthPicker { public static readonly NAME = Spec.NAME }",
            encoding="utf-8",
        )
        (gen / "RNMonthPicker.ts").write_text(
            'export const NAME = "RNMonthPicker" as const',
            encoding="utf-8",
        )
        name = _resolve_fabric_component_name(ets, "RNMonthPicker", ets.read_text(encoding="utf-8"))
        self.assertEqual(name, "RNMonthPicker")


class TestRuntimeDepRegistration(unittest.TestCase):
    """整库漏注册检查（0610 async-storage 白屏）。"""

    def _make_repo(self, root: Path, entry_deps: str) -> None:
        write_fixture(root, {
            "ohos/package.json": json.dumps(base_pkg()),
            # 库的鸿蒙运行时代码 import 了原生三方库 async-storage
            "ohos/src/index.js": (
                "import AsyncStorage from '@react-native-async-storage/async-storage';\n"
                "export default AsyncStorage;\n"
            ),
            "ohos/example/package.json": json.dumps({"dependencies": {}}),
            "ohos/example/harmony/entry/oh-package.json5": (
                "{\n  \"dependencies\": {\n" + entry_deps + "\n  }\n}\n"
            ),
        })

    def test_fail_when_native_dep_unregistered(self):
        tmp = Path(tempfile.mkdtemp())
        self._make_repo(tmp, entry_deps="")  # entry 未注册 async-storage HAR
        r = check_runtime_dep_registration(str(tmp))
        self.assertFalse(r["skipped"])
        self.assertFalse(r["ok"], msg="未注册 async-storage 应当报错")
        self.assertIn("@react-native-async-storage/async-storage", r["details"]["unregistered"])

    def test_pass_when_native_dep_registered_via_ohos_name(self):
        tmp = Path(tempfile.mkdtemp())
        # entry 用鸿蒙化包名注册（按 accepts 等价匹配）
        self._make_repo(
            tmp,
            entry_deps='    "@react-native-ohos/async-storage": "file:../../node_modules/@react-native-ohos/async-storage/harmony/async_storage.har"',
        )
        r = check_runtime_dep_registration(str(tmp))
        self.assertFalse(r["skipped"])
        self.assertTrue(r["ok"], msg=r.get("errors"))

    def test_dep_reg_is_wired_into_main_aggregation(self):
        """回归护栏：result_dep_reg 必须进入 main() 的 all_results，否则检查变死代码。"""
        src = (Path(__file__).parent.parent / "check_example_static.py").read_text(encoding="utf-8")
        m = re.search(r"all_results\s*=\s*\[(.*?)\]", src, re.DOTALL)
        self.assertIsNotNone(m, "未找到 all_results 列表")
        self.assertIn("result_dep_reg", m.group(1),
                      "result_dep_reg 未加入 all_results —— 整库漏注册检查会被静默丢弃")


if __name__ == "__main__":
    unittest.main()