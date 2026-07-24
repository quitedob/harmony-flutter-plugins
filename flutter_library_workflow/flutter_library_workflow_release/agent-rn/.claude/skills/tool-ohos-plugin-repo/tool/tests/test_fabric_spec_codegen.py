"""Unit tests for Harmony-safe Fabric spec codegen helpers."""

import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from lib.fabric_spec_codegen import (
    CODEGEN_NATIVE_COMPONENT_IMPORT,
    generate_fabric_native_component_spec,
    normalize_fabric_spec_content,
    uses_harmony_safe_codegen_import,
)
from lib.generate_library_common import render_fabric_component_ets_stub


class TestFabricSpecCodegen(unittest.TestCase):
    def test_generate_uses_harmony_safe_import(self):
        content = generate_fabric_native_component_spec("WheelCurvedPicker")
        self.assertIn("react-native/Libraries/Utilities/codegenNativeComponent", content)
        self.assertNotIn("from 'react-native'", content.split("codegenNativeComponent")[0][-80:])
        self.assertIn("WheelCurvedPickerProps", content)
        self.assertIn("'WheelCurvedPicker'", content)

    def test_normalize_wrong_named_import(self):
        raw = """import type { ViewProps } from 'react-native';
import { codegenNativeComponent } from 'react-native';

export default codegenNativeComponent<Props>('Test');
"""
        fixed = normalize_fabric_spec_content(raw)
        self.assertTrue(uses_harmony_safe_codegen_import(fixed))
        self.assertNotIn("{ codegenNativeComponent } from 'react-native'", fixed)

    def test_normalize_wrong_default_import(self):
        raw = "import codegenNativeComponent from 'react-native';\n"
        fixed = normalize_fabric_spec_content(raw)
        self.assertIn(CODEGEN_NATIVE_COMPONENT_IMPORT, fixed)


class TestFabricComponentEtsStub(unittest.TestCase):
    def test_render_basic_stub_without_codegen(self):
        """无 codegen 时生成基础 stub"""
        content = render_fabric_component_ets_stub("TestView")
        self.assertIn("@Component", content)
        self.assertIn("export struct TestView", content)
        self.assertIn("public static readonly NAME = Spec.NAME", content)
        self.assertIn("import { RNOHContext, RNViewBase } from '@rnoh/react-native-openharmony'", content)
        self.assertIn("aboutToAppear(): void", content)
        self.assertIn("aboutToDisappear(): void", content)
        self.assertIn("descriptor.rawProps as Spec.DirectRawProps", content)

    def test_render_stub_with_events(self):
        """有 EventPayloadByName 时生成事件注释"""
        codegen_ts = """
export const NAME = 'TestView';
export interface EventPayloadByName {
  onPress: { x: number; y: number };
  onLongPress: { duration: number };
}
export interface DirectRawProps {}
"""
        content = render_fabric_component_ets_stub("TestView", codegen_ts)
        self.assertIn("// codegen EventPayloadByName 事件: onPress, onLongPress", content)
        self.assertIn("this.eventEmitter!.emit", content)

    def test_render_stub_with_direct_raw_props(self):
        """有 DirectRawProps 时生成 @State 和赋值逻辑"""
        codegen_ts = """
export const NAME = 'TestView';
export interface DirectRawProps {
  title?: string;
  count?: number;
  visible?: boolean;
}
export interface EventPayloadByName {}
"""
        content = render_fabric_component_ets_stub("TestView", codegen_ts)
        self.assertIn("@State private title: string = ''", content)
        self.assertIn("@State private count: number = 0", content)
        self.assertIn("@State private visible: boolean = false", content)
        self.assertIn("this.title = rawProps.title ?? ''", content)
        self.assertIn("this.count = rawProps.count ?? 0", content)
        self.assertIn("this.visible = rawProps.visible ?? false", content)
        self.assertIn("// codegen DirectRawProps → 已从 descriptor.rawProps 同步", content)

    def test_render_stub_with_array_props(self):
        """Array 类型 props 正确转换"""
        codegen_ts = """
export const NAME = 'TestView';
export interface DirectRawProps {
  items?: Array<string>;
  colors?: ReadonlyArray<number>;
}
export interface EventPayloadByName {}
"""
        content = render_fabric_component_ets_stub("TestView", codegen_ts)
        self.assertIn("@State private items: Array<string> = []", content)
        self.assertIn("@State private colors: Array<number> = []", content)
        self.assertIn("this.items = rawProps.items ?? []", content)

    def test_render_container_stub(self):
        content = render_fabric_component_ets_stub("WrapView", layout="container")
        self.assertIn("LazyForEach", content)
        self.assertIn("applyDescriptor", content)
        self.assertNotIn("RNViewBase({ ctx:", content)

    def test_render_stub_with_color_props(self):
        """Color 类型 props 正确转换"""
        codegen_ts = """
export const NAME = 'TestView';
export interface DirectRawProps {
  backgroundColor?: ColorValue;
}
export interface EventPayloadByName {}
"""
        content = render_fabric_component_ets_stub("TestView", codegen_ts)
        self.assertIn("@State private backgroundColor: ColorValue = 0", content)
        self.assertIn("ColorValue", content)


if __name__ == "__main__":
    unittest.main()
