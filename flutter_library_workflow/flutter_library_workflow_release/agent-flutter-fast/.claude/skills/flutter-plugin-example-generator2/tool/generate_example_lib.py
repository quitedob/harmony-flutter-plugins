#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
# Test cases-driven example skeleton generator.
# Parse test-cases.json to get modules and test cases, then generate:
#   - main.dart, app_keys.dart, routes.dart
#   - pages/module_index_page.dart (module list)
#   - pages/module_f##_page.dart  (test case list for module)
#   - pages/testcase_f##_##_page.dart (test case detail page)
#   - widgets/result_panel.dart
#
# The generator ONLY produces skeleton structure with TODO markers.
# Filling in Actions/Result logic is done by the LLM in a subsequent step.

import argparse
import json
import os
import re
import shutil
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Optional, Dict, Any


# ============================================================================
# 生成配置：控制生成哪些级别的测试用例
# 修改此列表来过滤用例级别，例如：['L0'] 只生成 L0，['L0', 'L1'] 生成 L0 和 L1
# 注意：本 schema 的用例级别为 L0/L1/L2/L3（不同于另一个 skill 的 P0/P1/P2）
# ============================================================================
GENERATE_LEVELS = ['L0', 'L1', 'L2']


def main():
    args = parse_args()
    
    # Step 1: Copy example directory to example_auto
    example_dir = Path('example')
    example_auto_dir = Path('example_auto')
    
    if example_dir.exists():
        if example_auto_dir.exists():
            print('INFO: Removing existing example_auto directory...')
            shutil.rmtree(example_auto_dir)
        print('INFO: Copying example directory to example_auto...')
        copy_directory(example_dir, example_auto_dir)
        
        # Step 2: Delete all files in example_auto/lib directory
        example_auto_lib_dir = Path('example_auto/lib')
        if example_auto_lib_dir.exists():
            print('INFO: Removing existing files in example_auto/lib directory...')
            for entity in example_auto_lib_dir.rglob('*'):
                if entity.is_file():
                    entity.unlink()
        
        # Step 3: Delete non-essential directories that might cause compilation issues
        non_essential_dirs = [
            'example_auto/integration_test',
            'example_auto/test',
            'example_auto/.git',
            'example_auto/.gitignore',
            'example_auto/build',
            'example_auto/.dart_tool/flutter_build',
            'example_auto/.flutter-plugins',  # Flutter 插件配置文件，需重新生成
            'example_auto/.flutter-plugins-dependencies',  # Flutter 插件依赖文件，需重新生成
            'example_auto/ios',
            'example_auto/android',
            'example_auto/ohos/package-lock.json',  # 清理 package-lock.json，避免依赖锁定
            'example_auto/ohos/.hvigor',
            'example_auto/ohos/oh_modules',
            'example_auto/ohos/node_modules',
            'example_auto/ohos/entry/oh_modules',
            'example_auto/ohos/entry/build',
            'example_auto/ohos/build',
        ]
        
        for dir_path in non_essential_dirs:
            entity = Path(dir_path)
            if entity.exists():
                entity_type = 'directory' if entity.is_dir() else 'file'
                print(f'INFO: Removing non-essential {entity_type}: {dir_path}')
                if entity.is_dir():
                    shutil.rmtree(entity)
                else:
                    entity.unlink()
    else:
        print('INFO: example directory not found, creating example_auto from scratch...')
        example_auto_dir.mkdir(parents=True, exist_ok=True)
    
    test_cases_file = Path(args.test_cases)
    if not test_cases_file.exists():
        print(f'ERROR: Test cases file not found: {test_cases_file.absolute()}')
        sys.exit(1)
    
    test_cases_text = test_cases_file.read_text(encoding='utf-8')
    test_cases_data = json.loads(test_cases_text)
    modules = parse_modules_from_test_cases(test_cases_data)
    
    if not modules:
        print('ERROR: No modules parsed. Check test-cases.json structure.')
        sys.exit(1)
    
    if args.dry_run:
        print(f'DRY-RUN: would generate {len(modules)} module page(s) under {Path(args.out).absolute()}')
        print(f'INFO: 生成级别过滤: {", ".join(GENERATE_LEVELS)}')
        for m in modules:
            print(f'  - {m.id} -> pages/{m.file_name} ({m.class_name})')
            for tc in m.test_cases:
                print(f'    - {tc.case_id} [{tc.level}] -> pages/{tc.file_name} ({tc.class_name})')
        print('  + main.dart, app_keys.dart, routes.dart, pages/module_index_page.dart, widgets/result_panel.dart')
        print('(no files written)')
        sys.exit(0)
    
    out_root = Path(args.out)
    out_root.mkdir(parents=True, exist_ok=True)
    pages_dir = out_root / 'pages'
    widgets_dir = out_root / 'widgets'
    pages_dir.mkdir(parents=True, exist_ok=True)
    widgets_dir.mkdir(parents=True, exist_ok=True)
    
    pkg = args.package
    
    # Get the directory where the script is located
    script_dir = Path(__file__).parent
    
    copy_skeleton_file(
        source=script_dir / 'example_skeleton' / 'main.dart',
        target=out_root / 'main.dart',
        replace={'{{PACKAGE_NAME}}': pkg},
    )
    copy_skeleton_file(
        source=script_dir / 'example_skeleton' / 'app_keys.dart',
        target=out_root / 'app_keys.dart',
        replace={},
    )
    copy_skeleton_file(
        source=script_dir / 'example_skeleton' / 'widgets' / 'result_panel.dart',
        target=widgets_dir / 'result_panel.dart',
        replace={},
    )
    
    write_routes(out_root / 'routes.dart', pkg, modules)
    write_module_index(
        pages_dir / 'module_index_page.dart',
        modules,
        index_app_bar_title=args.index_title,
    )
    
    for m in modules:
        write_module_page(
            path=pages_dir / m.file_name,
            package=pkg,
            module=m,
        )
        
        for tc in m.test_cases:
            write_test_case_page(
                path=pages_dir / tc.file_name,
                package=pkg,
                module=m,
                test_case=tc,
            )
    
    total_test_cases = sum(len(m.test_cases) for m in modules)
    print(f'OK: generated {len(modules)} module page(s) and {total_test_cases} test case page(s) under {out_root.absolute()}')
    print(f'INFO: 生成级别过滤: {", ".join(GENERATE_LEVELS)}')
    print('Next: fill TODO markers in each module_*.dart and testcase_*.dart (see SKILL.md Step 2).')


# ---------------------------------------------------------------------------
# Args
# ---------------------------------------------------------------------------

def parse_args():
    parser = argparse.ArgumentParser(
        description='Parse test-cases JSON and generate example/lib skeleton with TODO markers.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  python generate_example_lib.py
  python generate_example_lib.py --test-cases .ohos-adaptation/test-cases.json
  python generate_example_lib.py --dry-run
        '''
    )
    parser.add_argument('--test-cases', default=None,
                        help='Path to test-cases JSON file (default: auto-detect *test-cases*.json in .ohos-adaptation)')
    parser.add_argument('--out', default='example_auto/lib',
                        help='Output lib root (default: example_auto/lib)')
    parser.add_argument('--package', default='',
                        help='Dart package name for imports (default: read from example/pubspec.yaml name:)')
    parser.add_argument('--index-title', default='功能模块',
                        help='AppBar title of module index page (default: 功能模块)')
    parser.add_argument('--dry-run', action='store_true',
                        help='Print modules/paths; do not create or overwrite files')
    
    args = parser.parse_args()
    
    # If test-cases path not specified, search for *test-cases*.json in .ohos-adaptation
    if args.test_cases is None:
        args.test_cases = find_test_cases_file()
    
    if not args.package:
        args.package = read_package_name_from_example_pubspec() or 'plugin_example'
    
    return args


def find_test_cases_file() -> str:
    """Return fixed path: .ohos-adaptation/04-test-cases.json"""
    return '.ohos-adaptation/04-test-cases.json'


def read_package_name_from_example_pubspec() -> Optional[str]:
    """Read package name from example/pubspec.yaml or example_auto/pubspec.yaml."""
    # First try example_auto/pubspec.yaml
    f = Path('example_auto/pubspec.yaml')
    if f.exists():
        content = f.read_text(encoding='utf-8')
        match = re.search(r'^name:\s*(\S+)', content, re.MULTILINE)
        if match:
            return match.group(1)
    
    # Fallback to example/pubspec.yaml
    example_f = Path('example/pubspec.yaml')
    if not example_f.exists():
        return None
    content = example_f.read_text(encoding='utf-8')
    match = re.search(r'^name:\s*(\S+)', content, re.MULTILINE)
    return match.group(1) if match else None


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

@dataclass
class TestCase:
    case_id: str
    title: str
    level: str
    preconditions: str
    test_steps: str
    expected_result: str
    postconditions: str
    
    @property
    def class_name(self) -> str:
        return f'TestCase{self.case_id.replace("-", "")}Page'
    
    @property
    def file_name(self) -> str:
        return f'testcase_{self.case_id.replace("-", "_").lower()}_page.dart'


@dataclass
class Module:
    id: str
    title: str
    description: str
    priority: str
    test_cases: List[TestCase] = field(default_factory=list)
    
    @property
    def class_name(self) -> str:
        return f'Module{self.id.replace("-", "")}Page'
    
    @property
    def file_name(self) -> str:
        return f'module_{self.id.replace("-", "_").lower()}_page.dart'


def id_to_suffix(id_str: str) -> str:
    return id_str.replace('-', '')


def id_to_file_stem(id_str: str) -> str:
    return id_str.replace('-', '_').lower()


# ---------------------------------------------------------------------------
# Test cases parsing
# ---------------------------------------------------------------------------

def parse_modules_from_test_cases(test_cases_data: Dict[str, Any]) -> List[Module]:
    modules_data = test_cases_data.get('modules', [])
    modules: List[Module] = []
    
    for module_data in modules_data:
        if isinstance(module_data, dict):
            id_ = str(module_data.get('moduleCode', '') or '')
            title = str(module_data.get('moduleName', '') or '')
            description = str(module_data.get('moduleDescription', '') or '')
            priority = str(module_data.get('priority', '') or '')
            # Note: new schema uses 'test_cases' (snake_case)
            test_cases_data_list = module_data.get('test_cases') or module_data.get('testCases') or []
            
            if id_ and title:
                test_cases: List[TestCase] = []
                
                for test_case_data in test_cases_data_list:
                    if isinstance(test_case_data, dict):
                        # Note: new schema uses 'id' instead of 'caseId'
                        case_id = str(test_case_data.get('id', '') or test_case_data.get('caseId', '') or '')
                        case_title = str(test_case_data.get('title', '') or '')
                        level = str(test_case_data.get('level', '') or '')
                        preconditions = str(test_case_data.get('preconditions', '') or '')
                        # Note: new schema uses 'expected_result' instead of 'expected'
                        expected_result = str(test_case_data.get('expected_result', '') or test_case_data.get('expected', '') or '')
                        postconditions = str(test_case_data.get('postconditions', '') or '')
                        
                        # Note: new schema uses 'test_steps' (array) instead of 'steps' (string)
                        test_steps = format_test_steps(test_case_data)
                        
                        # 只生成配置中指定级别的测试用例
                        if level and level not in GENERATE_LEVELS:
                            continue
                        
                        if case_id and case_title:
                            test_cases.append(TestCase(
                                case_id=case_id,
                                title=case_title,
                                level=level,
                                preconditions=preconditions,
                                test_steps=test_steps,
                                expected_result=expected_result,
                                postconditions=postconditions,
                            ))
                
                # 只有当模块有测试用例时才添加到列表
                if test_cases:
                    modules.append(Module(
                        id=id_,
                        title=title,
                        description=description,
                        priority=priority,
                        test_cases=test_cases,
                    ))
    
    return modules


def format_test_steps(test_case_data: Dict[str, Any]) -> str:
    """Format test_steps array into a readable string.
    Supports both new schema (test_steps array) and legacy (steps string)."""
    # Try new schema first: test_steps is an array of {action, checkpoint}
    test_steps_data = test_case_data.get('test_steps')
    if isinstance(test_steps_data, list):
        parts = []
        for i, step in enumerate(test_steps_data):
            if isinstance(step, dict):
                action = str(step.get('action', '') or '')
                checkpoint = str(step.get('checkpoint', '') or '')
                part = f'{i + 1}. {action}'
                if checkpoint:
                    part += f' [验证点: {checkpoint}]'
                parts.append(part)
        return '; '.join(parts)
    
    # Fallback to legacy schema: steps is a string
    return str(test_case_data.get('steps', '') or '')


# ---------------------------------------------------------------------------
# File writers
# ---------------------------------------------------------------------------

def copy_skeleton_file(source: Path, target: Path, replace: Dict[str, str]):
    if not source.exists():
        print(f'ERROR: skeleton missing: {source}')
        sys.exit(1)
    
    text = source.read_text(encoding='utf-8')
    for k, v in replace.items():
        text = text.replace(k, v)
    target.write_text(text, encoding='utf-8')


def write_routes(path: Path, package: str, modules: List[Module]):
    imports_lines: List[str] = []
    module_cases_lines: List[str] = []
    test_case_cases_lines: List[str] = []
    
    imports_lines.append("import 'package:flutter/material.dart';")
    imports_lines.append(f"import 'package:{package}/pages/module_index_page.dart';")
    
    for m in modules:
        imports_lines.append(f"import 'package:{package}/pages/{m.file_name}';")
        module_cases_lines.append(f"        case '{m.id}':")
        module_cases_lines.append('          return MaterialPageRoute<void>(')
        module_cases_lines.append('            settings: settings,')
        module_cases_lines.append(f'            builder: (_) => const {m.class_name}(),')
        module_cases_lines.append('          );')
        
        for tc in m.test_cases:
            imports_lines.append(f"import 'package:{package}/pages/{tc.file_name}';")
            test_case_cases_lines.append(f"        case '{tc.case_id}':")
            test_case_cases_lines.append('          return MaterialPageRoute<void>(')
            test_case_cases_lines.append('            settings: settings,')
            test_case_cases_lines.append(f'            builder: (_) => const {tc.class_name}(),')
            test_case_cases_lines.append('          );')
    
    imports_text = '\n'.join(imports_lines)
    module_cases_text = '\n'.join(module_cases_lines)
    test_case_cases_text = '\n'.join(test_case_cases_lines)
    
    content = imports_text + '''
class AppRoutes {
  // Use '/' as the entry route. If initialRoute is not '/',
  // Flutter will still create '/' then push initialRoute, which makes the
  // back button return to an unintended "unknown route" page.
  static const String moduleIndex = '/';

  static Route<dynamic> onGenerateRoute(RouteSettings settings) {
    final String name = settings.name ?? moduleIndex;

    if (name == moduleIndex || name == '/') {
      return MaterialPageRoute<void>(
        settings: settings,
        builder: (_) => const ModuleIndexPage(),
      );
    }

    const String modulePrefix = '/module/';
    const String testCasePrefix = '/testcase/';
    
    if (name.startsWith(modulePrefix)) {
      final String moduleId = name.substring(modulePrefix.length);
      switch (moduleId) {
''' + module_cases_text + '''      }
    }
    
    if (name.startsWith(testCasePrefix)) {
      final String testCaseId = name.substring(testCasePrefix.length);
      switch (testCaseId) {
''' + test_case_cases_text + '''      }
    }

    return MaterialPageRoute<void>(
      settings: settings,
      builder: (_) => const Scaffold(
        body: Center(child: Text('Unknown route')),
      ),
    );
  }
}
'''
    
    path.write_text(content, encoding='utf-8')


def write_module_index(path: Path, modules: List[Module], index_app_bar_title: str):
    content = build_module_index_content(modules, index_app_bar_title)
    path.write_text(content, encoding='utf-8')


def build_module_index_content(modules: List[Module], index_app_bar_title: str) -> str:
    lines: List[str] = []
    lines.append("import 'package:flutter/material.dart';")
    lines.append('')
    lines.append('/// 功能模块列表（一级页）。由 tool/generate_example_lib.py 生成。')
    lines.append('class ModuleIndexPage extends StatelessWidget {')
    lines.append('  const ModuleIndexPage({Key? key}) : super(key: key);')
    lines.append('')
    lines.append('  static const List<_ModuleEntry> _modules = <_ModuleEntry>[')
    for m in modules:
        lines.append('    _ModuleEntry(')
        lines.append(f"      id: '{m.id}',")
        lines.append(f"      title: '{escape_dart_string(m.title)}',")
        subtitle = f'{m.description} · {m.priority} · {len(m.test_cases)}个测试用例'
        lines.append(f"      subtitle: '{escape_dart_string(subtitle)}',")
        lines.append('    ),')
    lines.append('  ];')
    lines.append('')
    lines.append('  @override')
    lines.append('  Widget build(BuildContext context) {')
    lines.append('    return Scaffold(')
    lines.append(f"      appBar: AppBar(title: const Text('{escape_dart_string(index_app_bar_title)}')),")
    lines.append('      body: ListView.separated(')
    lines.append('        padding: const EdgeInsets.all(8),')
    lines.append('        itemCount: _modules.length,')
    lines.append('        separatorBuilder: (_, __) => const Divider(height: 1),')
    lines.append('        itemBuilder: (BuildContext context, int index) {')
    lines.append('          final _ModuleEntry e = _modules[index];')
    lines.append('          return ListTile(')
    lines.append("            key: Key('item_module_' + e.id),")
    lines.append("            title: Text(e.id + ' ' + e.title),")
    lines.append('            subtitle: Text(e.subtitle),')
    lines.append('            trailing: const Icon(Icons.chevron_right),')
    lines.append("            onTap: () => Navigator.pushNamed(context, '/module/' + e.id),")
    lines.append('          );')
    lines.append('        },')
    lines.append('      ),')
    lines.append('    );')
    lines.append('  }')
    lines.append('}')
    lines.append('')
    lines.append('class _ModuleEntry {')
    lines.append('  const _ModuleEntry({')
    lines.append('    required this.id,')
    lines.append('    required this.title,')
    lines.append('    required this.subtitle,')
    lines.append('  });')
    lines.append('')
    lines.append('  final String id;')
    lines.append('  final String title;')
    lines.append('  final String subtitle;')
    lines.append('}')
    return '\n'.join(lines)


def write_module_page(path: Path, package: str, module: Module):
    title = module.id + ' ' + module.title
    escaped_title = escape_dart_string(title)
    
    test_cases_entries = []
    for tc in module.test_cases:
        tc_entry = '''    _TestCaseEntry(
      caseId: ''' + "'" + tc.case_id + "'" + ''',
      title: ''' + "'" + escape_dart_string(tc.title) + "'" + ''',
      level: ''' + "'" + tc.level + "'" + ''',
    ),'''
        test_cases_entries.append(tc_entry)
    test_cases_entries_text = '\n'.join(test_cases_entries)
    
    # Build content using string concatenation to avoid f-string issues with Dart code
    content = '''
import 'package:flutter/material.dart';

/// 测试用例列表（二级页）- ''' + module.id + '''：''' + module.title + '''
class ''' + module.class_name + ''' extends StatelessWidget {
  const ''' + module.class_name + '''({Key? key}) : super(key: key);

  static const List<_TestCaseEntry> _testCases = <_TestCaseEntry>[
''' + test_cases_entries_text + '''
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text(\'''' + escaped_title + '''\')),
      body: ListView.separated(
        padding: const EdgeInsets.all(8),
        itemCount: _testCases.length,
        separatorBuilder: (_, __) => const Divider(height: 1),
        itemBuilder: (BuildContext context, int index) {
          final _TestCaseEntry e = _testCases[index];
          return ListTile(
            key: Key('item_testcase_' + e.caseId),
            title: Text(e.caseId + ' ' + e.title),
            subtitle: Text('优先级: ' + e.level),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => Navigator.pushNamed(context, '/testcase/' + e.caseId),
          );
        },
      ),
    );
  }
}

class _TestCaseEntry {
  const _TestCaseEntry({
    required this.caseId,
    required this.title,
    required this.level,
  });

  final String caseId;
  final String title;
  final String level;
}
'''
    
    path.write_text(content, encoding='utf-8')


def write_test_case_page(path: Path, package: str, module: Module, test_case: TestCase):
    title = test_case.case_id + ' ' + test_case.title
    escaped_title = escape_dart_string(title)
    escaped_level = escape_dart_string(test_case.level)
    escaped_preconditions = escape_dart_string(test_case.preconditions)
    escaped_test_steps = escape_dart_string(test_case.test_steps)
    escaped_expected_result = escape_dart_string(test_case.expected_result)
    escaped_postconditions = escape_dart_string(test_case.postconditions)
    
    # Build content using string concatenation to avoid f-string issues with Dart code
    content = '''
import 'package:flutter/material.dart';
import 'package:''' + package + '''/widgets/result_panel.dart';

/// 测试用例详情（三级页）- ''' + test_case.case_id + '''：''' + test_case.title + '''
class ''' + test_case.class_name + ''' extends StatefulWidget {
  const ''' + test_case.class_name + '''({Key? key}) : super(key: key);

  @override
  State<''' + test_case.class_name + '''> createState() => _''' + test_case.class_name + '''State();
}

class _''' + test_case.class_name + '''State extends State<''' + test_case.class_name + '''> {
  String _result = '';

  // TODO(import): 添加插件 import，例如 import 'package:xxx/xxx.dart';

  // TODO(init): 如果本模块需要初始化实例（如 FToast().init(context)），在此声明并初始化。

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text(\'''' + escaped_title + '''\')),
      body: Column(
        children: <Widget>[
          Expanded(
            flex: 3,
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  const Text(
                    '测试信息',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 8),
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text('优先级: ''' + escaped_level + ''''),
                          const SizedBox(height: 4),
                          Text('前置条件: ''' + escaped_preconditions + ''''),
                          const SizedBox(height: 4),
                          Text('测试步骤: ''' + escaped_test_steps + ''''),
                          const SizedBox(height: 4),
                          Text('预期结果: ''' + escaped_expected_result + ''''),
                          const SizedBox(height: 4),
                          Text('后置条件: ''' + escaped_postconditions + ''''),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Actions',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 8),
                  // TODO(actions): 根据测试用例的步骤，填充相应的操作按钮：
                  //
                  // ■ API 类操作 → 用 ElevatedButton 包装，按钮文字要表明测试点，
                  //   点击后调用对应 API，并 setState 更新 _result。
                  //
                  // ■ UI 类操作 → 直接在此处放置该 Widget，
                  //   必要时把交互回调/可验证状态写入 _result。
                  //
                  // ■ build 期间的回调中的 setState() 调用时机（重要）：
                  //   如 loadStateChanged、builder 等在 widget build 阶段同步执行的回调，
                  //   若需更新状态，必须使用 WidgetsBinding.instance.addPostFrameCallback
                  //   延迟到帧渲染完成后执行，否则会触发 "setState() called during build" 异常。
                  //
                  // 示例（API 类）:
                  //   ElevatedButton(
                  //     key: const Key('btn_show_toast'),
                  //     onPressed: () async {
                  //       try {
                  //         final res = await SomePlugin.someApi(arg: value);
                  //         setState(() { _result = res.toString(); });
                  //       } catch (e) {
                  //         setState(() { _result = 'error: ' + e.toString(); });
                  //       }
                  //     },
                  //     child: const Text('执行测试'),
                  //   ),
                  //
                  // 示例（UI 类 - build 期间回调）:
                  //   ExtendedImage.network(
                  //     url,
                  //     loadStateChanged: (state) {
                  //       if (state.extendedImageLoadState == LoadState.completed) {
                  //         // ❌ 错误：build 期间直接调用 setState
                  //         // setState(() { _result = '成功'; });
                  //         // ✅ 正确：延迟到帧渲染完成后执行
                  //         WidgetsBinding.instance.addPostFrameCallback((_) {
                  //           setState(() { _result = '成功'; });
                  //         });
                  //       }
                  //     },
                  //   ),
                ],
              ),
            ),
          ),
          Expanded(
            flex: 2,
            child: ResultPanel(result: _result),
          ),
        ],
      ),
    );
  }
}
'''
    
    path.write_text(content, encoding='utf-8')


def escape_dart_string(s: str) -> str:
    """Escape special characters for Dart string literals."""
    return s.replace('\\', '\\\\').replace("'", "\\'").replace('$', '\\$').replace('\n', '\\n')


def copy_directory(source: Path, destination: Path):
    """Copy a directory recursively."""
    destination.mkdir(parents=True, exist_ok=True)
    for entity in source.iterdir():
        try:
            if entity.is_dir():
                new_path = destination / entity.name
                copy_directory(entity, new_path)
            elif entity.is_file():
                new_path = destination / entity.name
                shutil.copy2(entity, new_path)
        except Exception as e:
            print(f'INFO: Skipping problematic entity: {entity}, error: {e}')


if __name__ == '__main__':
    main()