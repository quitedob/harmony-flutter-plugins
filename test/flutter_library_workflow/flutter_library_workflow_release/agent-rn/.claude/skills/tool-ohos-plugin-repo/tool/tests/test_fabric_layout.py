"""Tests for Fabric container vs leaf layout detection."""

import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from lib.fabric_layout import detect_fabric_layout
from lib.generate_library_common import render_fabric_component_ets_stub
from lib.module_analyzer import analyze_module, format_analysis_report


class TestFabricLayoutDetection(unittest.TestCase):
    def test_android_view_group_manager(self):
        with tempfile.TemporaryDirectory() as tmp:
            android_dir = os.path.join(tmp, "android", "src", "main", "java", "com", "example")
            os.makedirs(android_dir)
            with open(
                os.path.join(android_dir, "PinchableViewManager.java"),
                "w",
                encoding="utf-8",
            ) as f:
                f.write(
                    """
import com.facebook.react.uimanager.ViewGroupManager;

public class PinchableViewManager extends ViewGroupManager<PinchableView> {
}
"""
                )
            result = detect_fabric_layout(tmp, "PinchableView")
            self.assertEqual(result.layout, "container")
            self.assertEqual(result.confidence, "high")
            self.assertTrue(any("ViewGroupManager" in s for s in result.signals))

    def test_android_simple_view_manager(self):
        with tempfile.TemporaryDirectory() as tmp:
            android_dir = os.path.join(tmp, "android", "src", "main", "java", "com", "example")
            os.makedirs(android_dir)
            with open(
                os.path.join(android_dir, "WheelPickerManager.java"),
                "w",
                encoding="utf-8",
            ) as f:
                f.write(
                    """
import com.facebook.react.uimanager.SimpleViewManager;

public class WheelPickerManager extends SimpleViewManager<WheelPickerView> {
}
"""
                )
            result = detect_fabric_layout(tmp, "WheelPicker")
            self.assertEqual(result.layout, "leaf")
            self.assertEqual(result.confidence, "high")

    def test_js_jsx_children(self):
        with tempfile.TemporaryDirectory() as tmp:
            src = os.path.join(tmp, "src")
            os.makedirs(src)
            with open(os.path.join(src, "App.tsx"), "w", encoding="utf-8") as f:
                f.write(
                    """
import { MyContainer } from './MyContainer';
export function App() {
  return (
    <MyContainer style={{ flex: 1 }}>
      <Text>child</Text>
    </MyContainer>
  );
}
"""
                )
            result = detect_fabric_layout(tmp, "MyContainer")
            self.assertEqual(result.layout, "container")
            self.assertTrue(any("jsx_children" in s for s in result.signals))

    def test_analyse_report_includes_layout(self):
        with tempfile.TemporaryDirectory() as tmp:
            android_dir = os.path.join(tmp, "android", "src")
            os.makedirs(android_dir)
            with open(os.path.join(android_dir, "FooManager.java"), "w", encoding="utf-8") as f:
                f.write(
                    "public class FooViewManager extends ViewGroupManager<FooView> {}\n"
                )
            spec_dir = os.path.join(tmp, "src", "specs")
            os.makedirs(spec_dir)
            with open(os.path.join(spec_dir, "NativeFoo.ts"), "w", encoding="utf-8") as f:
                f.write(
                    """
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
export default codegenNativeComponent<{}>('FooView');
"""
                )
            with open(os.path.join(tmp, "package.json"), "w", encoding="utf-8") as f:
                f.write('{"name": "react-native-foo", "version": "1.0.0"}')
            report = format_analysis_report(analyze_module(tmp))
            self.assertIn("Layout (container / leaf)", report)
            self.assertIn("FooView: container", report)


class TestFabricContainerStub(unittest.TestCase):
    def test_render_container_stub_has_lazy_for_each(self):
        content = render_fabric_component_ets_stub("WrapView", layout="container")
        self.assertIn("LazyForEach", content)
        self.assertIn("wrappedRNComponentBuilder", content)
        self.assertNotIn("RNViewBase({ ctx:", content)
        self.assertIn("ViewDescriptorWrapperBase", content)

    def test_render_unknown_defaults_to_leaf(self):
        content = render_fabric_component_ets_stub("X", layout="unknown")
        self.assertIn("RNViewBase({ ctx:", content)
        self.assertIn("Fabric layout 未自动判定", content)


if __name__ == "__main__":
    unittest.main()
