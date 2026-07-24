#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
# Test cases-driven HAR Demo skeleton generator for Android SDK.
# Parse 04-test-cases-revised.json (fallback to 04-test-cases.json) to get modules and test cases, then generate:
#   - entry/src/main/ets/pages/Index.ets (module list)
#   - entry/src/main/ets/pages/ModuleF##_Page.ets (test case list for module)
#   - entry/src/main/ets/pages/TestCaseF##_##Page.ets (test case detail page)
#   - entry/src/main/ets/widgets/ResultPanel.ets
#   - entry/src/main/resources/base/profile/main_pages.json (page routes)
#
# The generator ONLY produces skeleton structure with TODO markers.
# Filling in Actions/Result logic is done by the LLM in a subsequent step.
#

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
    
    # Step 1: Copy hardemo scaffold to ohos-hardemo-auto
    scaffold_dir = Path(args.scaffold)
    demo_output_dir = Path(args.out)
    
    if scaffold_dir.exists():
        if demo_output_dir.exists():
            print('INFO: Removing existing ohos-hardemo-auto directory...')
            try:
                shutil.rmtree(demo_output_dir)
            except PermissionError as e:
                print(f'WARN: Failed to remove directory due to file lock: {e}')
                print('INFO: Attempting to clean directory contents instead...')
                # Try to remove files individually
                for entity in demo_output_dir.rglob('*'):
                    if entity.is_file():
                        try:
                            entity.unlink()
                        except:
                            pass
        print('INFO: Copying hardemo scaffold to ohos-hardemo-auto...')
        copy_directory(scaffold_dir, demo_output_dir)
        
        # Step 2: Delete all files in entry/src/main/ets directory (except Ability files)
        entry_ets_dir = demo_output_dir / 'entry' / 'src' / 'main' / 'ets'
        if entry_ets_dir.exists():
            print('INFO: Removing existing files in entry/src/main/ets directory...')
            for entity in entry_ets_dir.rglob('*'):
                if entity.is_file():
                    entity.unlink()
            
            # Restore EntryAbility and EntryBackupAbility from scaffold
            ability_files = [
                ('entryability/EntryAbility.ets', 'EntryAbility.ets'),
                ('entrybackupability/EntryBackupAbility.ets', 'EntryBackupAbility.ets'),
            ]
            for rel_path, name in ability_files:
                src_file = scaffold_dir / 'entry' / 'src' / 'main' / 'ets' / rel_path
                dst_file = entry_ets_dir / rel_path
                if src_file.exists():
                    dst_file.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(src_file, dst_file)
                    print(f'INFO: Restored {name} from scaffold')
                else:
                    print(f'WARN: Scaffold missing {name} at {src_file}')
        
        # Step 2.5: Smart copy library content from ohos-hardemo if exists
        sdk_library_dir = Path.cwd() / 'ohos-hardemo' / 'library'
        target_library_dir = demo_output_dir / 'library'
        
        if sdk_library_dir.exists():
            print(f'INFO: Found ohos-hardemo/library, copying complete HAR implementation...')
            # Remove existing library directory content
            if target_library_dir.exists():
                for entity in target_library_dir.rglob('*'):
                    if entity.is_file():
                        try:
                            entity.unlink()
                        except:
                            pass
            
            # Copy complete library content
            copy_directory(sdk_library_dir, target_library_dir)
            print(f'INFO: Copied complete HAR implementation from {sdk_library_dir}')
        else:
            print('WARN: ohos-hardemo/library not found, using scaffold library template')
        
        # Step 2.6: Infer library module name and inject dependency
        library_module_name = infer_library_module_name(target_library_dir)
        entry_oh_package = demo_output_dir / 'entry' / 'oh-package.json5'
        if entry_oh_package.exists():
            print(f'INFO: Injecting library dependency ({library_module_name}) into entry/oh-package.json5...')
            inject_library_dependency(entry_oh_package, library_module_name)
        
        # Step 3: Delete non-essential directories
        non_essential_dirs = [
            demo_output_dir / 'entry' / 'build',
            demo_output_dir / 'entry' / '.hvigor',
            demo_output_dir / 'entry' / 'oh_modules',
            demo_output_dir / 'library' / 'build',
            demo_output_dir / 'library' / '.hvigor',
            demo_output_dir / 'library' / 'oh_modules',
            demo_output_dir / '.hvigor',
            demo_output_dir / 'oh_modules',
            demo_output_dir / 'node_modules',
        ]
        
        for dir_path in non_essential_dirs:
            if dir_path.exists():
                print(f'INFO: Removing non-essential directory: {dir_path}')
                shutil.rmtree(dir_path)
    else:
        print(f'ERROR: Scaffold directory not found: {scaffold_dir.absolute()}')
        sys.exit(1)
    
    test_cases_file = Path(args.test_cases)
    if not test_cases_file.exists():
        print(f'ERROR: Test cases file not found: {test_cases_file.absolute()}')
        sys.exit(1)
    
    test_cases_text = test_cases_file.read_text(encoding='utf-8-sig')
    test_cases_data = json.loads(test_cases_text)
    modules = parse_modules_from_test_cases(test_cases_data)
    
    if not modules:
        print('ERROR: No modules parsed. Check 04-test-cases-revised.json or 04-test-cases.json structure.')
        sys.exit(1)
    
    if args.dry_run:
        print(f'DRY-RUN: would generate {len(modules)} module page(s)')
        print(f'INFO: 生成级别过滤: {", ".join(GENERATE_LEVELS)}')
        for m in modules:
            print(f'  - {m.id} -> pages/{m.file_name}')
            for tc in m.test_cases:
                print(f'    - {tc.case_id} [{tc.level}] -> pages/{tc.file_name}')
        print('  + Index.ets, ResultPanel.ets, main_pages.json')
        print('(no files written)')
        sys.exit(0)
    
    entry_ets_pages_dir = demo_output_dir / 'entry' / 'src' / 'main' / 'ets' / 'pages'
    entry_ets_widgets_dir = demo_output_dir / 'entry' / 'src' / 'main' / 'ets' / 'widgets'
    entry_resources_profile_dir = demo_output_dir / 'entry' / 'src' / 'main' / 'resources' / 'base' / 'profile'
    
    entry_ets_pages_dir.mkdir(parents=True, exist_ok=True)
    entry_ets_widgets_dir.mkdir(parents=True, exist_ok=True)
    entry_resources_profile_dir.mkdir(parents=True, exist_ok=True)
    
    sdk_name = args.sdk_name
    library_module_name = infer_library_module_name(demo_output_dir / 'library')
    
    # Get the directory where the script is located
    script_dir = Path(__file__).parent
    
    # Copy skeleton files
    copy_skeleton_file(
        source=script_dir / 'ets_skeleton' / 'widgets' / 'ResultPanel.ets',
        target=entry_ets_widgets_dir / 'ResultPanel.ets',
        replace={},
    )
    
    copy_skeleton_file(
        source=script_dir / 'ets_skeleton' / 'widgets' / 'TestInfoPanel.ets',
        target=entry_ets_widgets_dir / 'TestInfoPanel.ets',
        replace={},
    )
    
    # Generate Index.ets (module list page)
    write_module_index(entry_ets_pages_dir / 'Index.ets', modules, sdk_name)
    
    # Generate main_pages.json
    write_main_pages_json(entry_resources_profile_dir / 'main_pages.json', modules)
    
    # Generate module pages and test case pages
    for m in modules:
        write_module_page(
            path=entry_ets_pages_dir / m.file_name,
            module=m,
            sdk_name=sdk_name,
        )
        
        for tc in m.test_cases:
            write_test_case_page(
                path=entry_ets_pages_dir / tc.file_name,
                module=m,
                test_case=tc,
                sdk_name=sdk_name,
                library_module_name=library_module_name,
            )
    
    total_test_cases = sum(len(m.test_cases) for m in modules)
    print(f'OK: generated {len(modules)} module page(s) and {total_test_cases} test case page(s)')
    print(f'INFO: 生成级别过滤: {", ".join(GENERATE_LEVELS)}')
    print(f'INFO: Output directory: {demo_output_dir.absolute()}')
    print('Next: fill TODO markers in each Module*.ets and TestCase*.ets (see SKILL.md Step 2).')


# ---------------------------------------------------------------------------
# Args
# ---------------------------------------------------------------------------

def parse_args():
    parser = argparse.ArgumentParser(
        description='Parse test-cases JSON and generate HAR Demo ETS skeleton with TODO markers.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  python generate_hardemo_ets.py --sdk-name header-decor
  python generate_hardemo_ets.py --test-cases .ohos-adaptation/04-test-cases-revised.json
  python generate_hardemo_ets.py --dry-run
        '''
    )
    parser.add_argument('--test-cases', default=None,
                        help='Path to test-cases JSON file (default: auto-detect 04-test-cases-revised.json or 04-test-cases.json in .ohos-adaptation)')
    parser.add_argument('--scaffold', default=None,
                        help='Path to hardemo scaffold directory (default: agent-android-sdk/scaffold/hardemo)')
    parser.add_argument('--out', default=None,
                        help='Output demo root (default: ohos-hardemo-auto)')
    parser.add_argument('--sdk-name', default=None,
                        help='SDK name for display (default: extracted from 01-analysis.json)')
    parser.add_argument('--dry-run', action='store_true',
                        help='Print modules/paths; do not create or overwrite files')
    
    args = parser.parse_args()
    
    # Auto-detect 04-test-cases-revised.json (fallback to 04-test-cases.json)
    if args.test_cases is None:
        args.test_cases = find_test_cases_file()
    
    # Auto-detect scaffold directory
    if args.scaffold is None:
        args.scaffold = find_scaffold_directory()
    
    # Auto-detect output directory
    if args.out is None:
        args.out = 'ohos-hardemo-auto'
    
    # Auto-detect SDK name
    if args.sdk_name is None:
        args.sdk_name = read_sdk_name_from_analysis() or 'sdk-demo'
    
    return args


def find_test_cases_file() -> str:
    """Return path to test cases file, preferring 04-test-cases-revised.json over 04-test-cases.json"""
    revised = Path('.ohos-adaptation/04-test-cases-revised.json')
    original = Path('.ohos-adaptation/04-test-cases.json')
    if revised.exists():
        return str(revised)
    return str(original)


def find_scaffold_directory() -> str:
    """Find scaffold directory from workspace root."""
    cwd = Path.cwd()
    # Look for agent-android-sdk in parent directories
    for parent in cwd.parents:
        scaffold = parent / 'agent-android-sdk' / 'scaffold' / 'hardemo'
        if scaffold.exists():
            return str(scaffold)
    # Fallback to relative path
    return 'scaffold/hardemo'


def read_sdk_name_from_analysis() -> Optional[str]:
    """Read SDK name from 01-analysis.json."""
    f = Path('.ohos-adaptation/01-analysis.json')
    if not f.exists():
        return None
    try:
        content = f.read_text(encoding='utf-8')
        data = json.loads(content)
        return data.get('sdk_name', None)
    except:
        return None


def infer_library_module_name(library_dir: Path) -> str:
    """Infer library module name from oh-package.json5.
    
    Args:
        library_dir: Path to library directory
        
    Returns:
        Module name from oh-package.json5, or 'library' as default
    """
    oh_pkg_path = library_dir / 'oh-package.json5'
    if oh_pkg_path.exists():
        try:
            content = oh_pkg_path.read_text(encoding='utf-8')
            # Remove comments (JSON5 support)
            content = re.sub(r'//.*$', '', content, flags=re.MULTILINE)
            content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
            pkg_data = json.loads(content)
            module_name = pkg_data.get('name', 'library')
            print(f'INFO: Inferred library module name: {module_name}')
            return module_name
        except Exception as e:
            print(f'WARN: Failed to parse library/oh-package.json5: {e}, using default "library"')
            return 'library'
    else:
        print('WARN: library/oh-package.json5 not found, using default module name "library"')
        return 'library'


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
        return f'TestCase{self.case_id.replace("-", "")}Page.ets'
    
    @property
    def page_route(self) -> str:
        return f'pages/TestCase{self.case_id.replace("-", "")}Page'


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
        return f'Module{self.id.replace("-", "")}Page.ets'
    
    @property
    def page_route(self) -> str:
        return f'pages/Module{self.id.replace("-", "")}Page'


def id_to_suffix(id_str: str) -> str:
    return id_str.replace('-', '')


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
            test_cases_data_list = module_data.get('test_cases') or module_data.get('testCases') or []
            
            if id_ and title:
                test_cases: List[TestCase] = []
                
                for test_case_data in test_cases_data_list:
                    if isinstance(test_case_data, dict):
                        case_id = str(test_case_data.get('id', '') or test_case_data.get('caseId', '') or '')
                        case_title = str(test_case_data.get('title', '') or '')
                        level = str(test_case_data.get('level', '') or '')
                        preconditions = str(test_case_data.get('preconditions', '') or '')
                        expected_result = str(test_case_data.get('expected_result', '') or test_case_data.get('expected', '') or '')
                        postconditions = str(test_case_data.get('postconditions', '') or '')
                        
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
    """Format test_steps array into a readable string."""
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
    
    return str(test_case_data.get('steps', '') or '')


# ---------------------------------------------------------------------------
# oh-package.json5 helpers
# ---------------------------------------------------------------------------

def inject_library_dependency(oh_package_path: Path, library_module_name: str = 'library'):
    """Inject library dependency into entry/oh-package.json5 dependencies.
    
    Args:
        oh_package_path: Path to entry/oh-package.json5
        library_module_name: Module name to use (e.g., 'library' or '@stickyheader/library')
    """
    content = oh_package_path.read_text(encoding='utf-8')
    
    # Check if dependency already exists with any name
    dep_pattern = r'"dependencies"\s*:\s*\{[^}]*"(?:library|@[\w/-]+/library)"'
    if re.search(dep_pattern, content):
        print('INFO: library dependency already exists in oh-package.json5, skipping')
        return
    
    # oh-package.json5 is JSON5 (supports comments/trailing commas), but we do
    # a targeted string replacement to preserve formatting and comments.
    # Replace "dependencies": {} with "dependencies": { "module_name": "file:../library" }
    if '"dependencies"' in content:
        # Match "dependencies": {} (possibly with whitespace)
        pattern = r'"dependencies"\s*:\s*\{\s*\}'
        replacement = f'"dependencies": {{\n    "{library_module_name}": "file:../library"\n  }}'
        new_content, count = re.subn(pattern, replacement, content)
        if count > 0:
            oh_package_path.write_text(new_content, encoding='utf-8')
            print(f'INFO: Injected library dependency ({library_module_name}) into entry/oh-package.json5')
        else:
            # dependencies has existing entries, inject before closing brace
            pattern2 = r'"dependencies"\s*:\s*\{'
            match2 = re.search(pattern2, content)
            if match2:
                insert_pos = match2.end()
                new_content = content[:insert_pos] + f'\n    "{library_module_name}": "file:../library",' + content[insert_pos:]
                oh_package_path.write_text(new_content, encoding='utf-8')
                print(f'INFO: Injected library dependency ({library_module_name}) into existing dependencies')
    else:
        print('WARN: No "dependencies" key found in entry/oh-package.json5')


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


def write_main_pages_json(path: Path, modules: List[Module]):
    """Generate main_pages.json with all page routes."""
    pages = ['pages/Index']
    for m in modules:
        pages.append(m.page_route)
        for tc in m.test_cases:
            pages.append(tc.page_route)
    
    content = {
        "src": pages
    }
    
    path.write_text(json.dumps(content, indent=2), encoding='utf-8')


def write_module_index(path: Path, modules: List[Module], sdk_name: str):
    """Generate Index.ets - module list page (first level)."""
    
    module_entries = []
    for m in modules:
        subtitle = f'{m.description} · {m.priority} · {len(m.test_cases)}个测试用例'
        module_entries.append(f'''  {{
    moduleId: '{m.id}',
    title: '{m.id} {m.title}',
    subtitle: '{escape_ets_string(subtitle)}',
    pageRoute: '{m.page_route}'
  }}''')
    
    module_entries_text = ',\n'.join(module_entries)
    
    content = f'''import {{ router }} from '@kit.ArkUI';

interface ModuleEntry {{
  moduleId: string;
  title: string;
  subtitle: string;
  pageRoute: string;
}}

@Entry
@Component
struct Index {{
  private modules: ModuleEntry[] = [
{module_entries_text}
  ];

  build() {{
    Column() {{
      // 标题栏
      Row() {{
        Text('{sdk_name} Demo')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .margin({{ left: 16, right: 16, top: 12, bottom: 12 }})
      }}
      .width('100%')
      .backgroundColor('#F1F3F5')
      
      // 功能模块列表
      List() {{
        ForEach(this.modules, (item: ModuleEntry) => {{
          ListItem() {{
            Row() {{
              Column() {{
                Text(item.title)
                  .fontSize(16)
                  .fontWeight(FontWeight.Medium)
                  .margin({{ bottom: 4 }})
                Text(item.subtitle)
                  .fontSize(12)
                  .fontColor('#666666')
              }}
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              
              Image($r('sys.media.ohos_ic_public_arrow_right'))
                .width(24)
                .height(24)
                .fillColor('#999999')
            }}
            .width('100%')
            .padding(16)
            .backgroundColor(Color.White)
            .borderRadius(8)
            .margin({{ top: 8, bottom: 8, left: 12, right: 12 }})
            .onClick(() => {{
              router.pushUrl({{ url: item.pageRoute }});
            }})
          }}
        }})
      }}
      .width('100%')
      .layoutWeight(1)
      .backgroundColor('#F1F3F5')
    }}
    .width('100%')
    .height('100%')
  }}
}}
'''
    
    path.write_text(content, encoding='utf-8')


def write_module_page(path: Path, module: Module, sdk_name: str):
    """Generate Module page - test case list page (second level)."""
    
    test_case_entries = []
    for tc in module.test_cases:
        test_case_entries.append(f'''  {{
    caseId: '{tc.case_id}',
    title: '{tc.case_id} {escape_ets_string(tc.title)}',
    level: '{tc.level}',
    pageRoute: '{tc.page_route}'
  }}''')
    
    test_case_entries_text = ',\n'.join(test_case_entries)
    
    content = f'''import {{ router }} from '@kit.ArkUI';

interface TestCaseEntry {{
  caseId: string;
  title: string;
  level: string;
  pageRoute: string;
}}

@Entry
@Component
struct {module.class_name} {{
  private testCases: TestCaseEntry[] = [
{test_case_entries_text}
  ];

  build() {{
    Column() {{
      // 标题栏
      Row() {{
        Image($r('sys.media.ohos_ic_public_arrow_left'))
          .width(24)
          .height(24)
          .fillColor('#333333')
          .onClick(() => {{
            router.back();
          }})
          .margin({{ left: 16 }})
        
        Text('{module.id} {escape_ets_string(module.title)}')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .margin({{ left: 12, right: 16, top: 12, bottom: 12 }})
          .layoutWeight(1)
      }}
      .width('100%')
      .backgroundColor('#F1F3F5')
      
      // 测试用例列表
      List() {{
        ForEach(this.testCases, (item: TestCaseEntry) => {{
          ListItem() {{
            Row() {{
              Column() {{
                Text(item.title)
                  .fontSize(15)
                  .fontWeight(FontWeight.Medium)
                  .margin({{ bottom: 4 }})
                Text('优先级: ' + item.level)
                  .fontSize(12)
                  .fontColor('#666666')
              }}
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              
              Image($r('sys.media.ohos_ic_public_arrow_right'))
                .width(24)
                .height(24)
                .fillColor('#999999')
            }}
            .width('100%')
            .padding(16)
            .backgroundColor(Color.White)
            .borderRadius(8)
            .margin({{ top: 8, bottom: 8, left: 12, right: 12 }})
            .onClick(() => {{
              router.pushUrl({{ url: item.pageRoute }});
            }})
          }}
        }})
      }}
      .width('100%')
      .layoutWeight(1)
      .backgroundColor('#F1F3F5')
    }}
    .width('100%')
    .height('100%')
  }}
}}
'''
    
    path.write_text(content, encoding='utf-8')


def write_test_case_page(path: Path, module: Module, test_case: TestCase, sdk_name: str, library_module_name: str = 'library'):
    """Generate Test Case page - detail page (third level).
    
    Args:
        path: Output file path
        module: Module data
        test_case: Test case data
        sdk_name: SDK name for display
        library_module_name: Library module name for import (e.g., 'library' or '@stickyheader/library')
    """
    
    content = f'''import {{ router }} from '@kit.ArkUI';
import {{ ResultPanel }} from '../widgets/ResultPanel';
import {{ TestInfoPanel }} from '../widgets/TestInfoPanel';
// TODO(import-{test_case.case_id}): 根据测试需要，从library导入必要的组件/类型
// 示例: import {{ SomeComponent, SomeType }} from '{library_module_name}';

@Entry
@Component
struct {test_case.class_name} {{
  @State result: string = '等待操作 {test_case.case_id}...';

  build() {{
    Column() {{
      // 标题栏（固定）
      Row() {{
        Image($r('sys.media.ohos_ic_public_arrow_left'))
          .width(24)
          .height(24)
          .fillColor('#333333')
          .onClick(() => {{
            router.back();
          }})
          .margin({{ left: 16 }})
        
        Text('{test_case.case_id} {escape_ets_string(test_case.title)}')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .margin({{ left: 12, right: 16, top: 12, bottom: 12 }})
          .layoutWeight(1)
      }}
      .width('100%')
      .backgroundColor('#F1F3F5')
      
      // 可滚动区域（测试信息 + Actions）
      Scroll() {{
        Column() {{
          // ╔─ FIXED SECTION: 测试信息区（使用 TestInfoPanel 组件）─ 禁止修改 ─╗
          TestInfoPanel({{
            level: '{escape_ets_string(test_case.level)}',
            preconditions: '{escape_ets_string(test_case.preconditions)}',
            test_steps: '{escape_ets_string(test_case.test_steps)}',
            expected_result: '{escape_ets_string(test_case.expected_result)}',
            postconditions: '{escape_ets_string(test_case.postconditions)}'
          }})
          // ╚─ FIXED SECTION END ─╝
          
          // Actions 区
          Column() {{
            Text('Actions')
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .margin({{ bottom: 8 }})
            
            // TODO(actions-{test_case.case_id}): 根据测试用例的步骤，填充相应的操作按钮或UI组件：
            // 每类操作触发后都必须更新 this.result（写入规则见下方 TODO(result-{test_case.case_id})）
            //
            // ■ API 类操作 → 用 Button 包装，按钮文字要表明测试点，
            //   点击后调用对应 HAR API，并更新 result 状态。
            //
            // ■ 触发型 UI（Toast/Dialog/弹窗等）→ 用 Button 触发，
            //   在回调中设置 result = 'Toast显示成功' 或 'Dialog已弹出'。
            //
  
            // ■ 展示型 UI（动画类）→ 坐标必须匹配预览区尺寸：
            //   预览区高度建议 300-400px，确保动画轨迹完整可见
            //   动画起点/终点坐标必须在预览区范围内（Y < 预览区高度 - 组件半径）
            //   【禁止】硬编码超出预览区的坐标（如 startY=800, height=180）
            //   示例：Stack().height(350) 内，起点 (50, 150)，终点 (250, 150)
            
            // ■ 展示型 UI（装饰器/列表效果等）→ 固定高度避免嵌套滚动：
            //   预览组件设置固定高度（如 .height(300)）
            //   示例：List().height(300).decoration(this.decoration)
            //
            // ■ 展示型 UI（吸顶头部/分组列表）→ onScroll 回调中必须用 offset 估算当前可见位置，
            //   再用业务函数计算当前头部ID，禁止遍历固定数组取第一个有效元素。
            //
            // ■ 多层吸顶/组合行为场景（如双层粘性头部 F-02）：
            //   - 必须分别追踪每个头部/元素的理论状态（如 headerId + subHeaderId）
            //   - 必须验证组合条件是否满足（如"两者同时吸顶"）
            //   - 当组合条件不满足时，result 必须追加 ⚠️ 缺陷提示
            //   - 示例：若主头部吸顶但子头部未吸顶 → result 包含"⚠️ 双层吸顶未同时生效"
            //
            // ■ ArkTS @State 更新时机：async 回调（onClick、onAppear、Promise.then）中
            //   更新 @State 是安全的；禁止在 build() 中同步触发 @State 变更导致无限重渲染。
            //
            // 示例（API 类 - 同步调用）:
            //   Button('执行测试')
            //     .id('btn_execute_test')
            //     .onClick(() => {{
            //       try {{
            //         const res = SomeSdkApi.someMethod(arg);
            //         this.result = res.toString();
            //       }} catch (e) {{
            //         this.result = 'error: ' + e.message;
            //       }}
            //     }})
            //     .width('100%')
            //     .margin({{ bottom: 8 }})
            //
            // 示例（API 类 - 异步调用，更常见）:
            //   Button('执行测试')
            //     .id('btn_execute_test')
            //     .onClick(async () => {{
            //       try {{
            //         const res = await SomeSdkApi.someMethod(arg);
            //         this.result = `成功: ${{JSON.stringify(res)}}`;
            //       }} catch (e) {{
            //         this.result = 'error: ' + e.message;
            //       }}
            //     }})
            //     .width('100%')
            //     .margin({{ bottom: 8 }})
            //
            // 示例（触发型 UI - Toast/Dialog）:
            //   Button('显示Toast')
            //     .id('btn_show_toast')
            //     .onClick(() => {{
            //       SomeSdk.showToast({{ message: 'Hello' }});
            //       this.result = 'Toast显示成功';
            //     }})
            //     .width('100%')
            //     .margin({{ bottom: 8 }})
            //
            // 示例（展示型 UI - 动画类）:
            //   Stack() {{
            //     Circle().width(50).height(50).fill('#F44336')
            //       .position({{ x: this.targetX - 25, y: this.targetY - 25 }})
            //   }}
            //   .width('100%')
            //   .height(350)  // 预览区高度
            //   .clip(true)
            // 注意：动画坐标 Y 必须小于 350-25=325
            //
            // 示例（展示型 UI - 列表装饰器）:
            //   List({{ space: 0 }}) {{
            //     ... // 分组数据列表项
            //   }}
            //   .width('100%')
            //   .height(200)  // 固定高度，避免嵌套滚动
            //   .decoration(this.decoration)
            //
            // 注意：每个操作按钮和输入控件必须有明确的 .id() 标识
            
            // ⚠️ 以下为占位内容，必须删除后替换为实际测试操作（{test_case.case_id}）
            Column() {{
              Text('待实现 {test_case.case_id}：请根据测试用例类型填充内容')
                .fontSize(12)
                .fontColor('#999999')
                .textAlign(TextAlign.Center)
                .width('100%')
                .padding(16)
            }}
            .width('100%')
            .height(100)
            .justifyContent(FlexAlign.Center)
          }}
          .padding({{ left: 12, right: 12, top: 12, bottom: 12 }})
          .width('100%')
        }}
      }}
      .width('100%')
      .layoutWeight(1)
      .backgroundColor('#F1F3F5')
      .scrollBar(BarState.Auto)
      .scrollBarWidth(4)
      .scrollBarColor('#CCCCCC')
      
      // TODO(result-{test_case.case_id}): Result 区写入规则 —— 操作触发后 this.result 替换初始占位 '等待操作 {test_case.case_id}...'，让 ResultPanel 可读：
      //
      // ■ API 类操作 → 成功时写入返回值，失败时写入错误信息：
      //   this.result = `成功: ${{res}}`
      //   this.result = 'error: ' + e.message
      //
      // ■ 触发型 UI（Toast/Dialog/弹窗等）→ 回调中写入操作结果：
      //   this.result = 'Toast显示成功'
      //   this.result = 'Dialog已弹出'
      //
      // ■ 展示型 UI（装饰器/动画/列表效果等）→ 量化状态追踪，格式为"状态名: 值"：
      //   this.result = `滚动偏移: ${{this.scrollOffset}}px | 头部位置: ${{this.headerPosition}}px`
      //
      // ■ 禁止虚假结果：状态必须随操作变化，禁止写死假状态或"验证通过"等虚假文案
      //
      // 空状态占位：初始值已设为 '等待操作 {test_case.case_id}...'，操作触发后应替换为实际结果
      ResultPanel({{ result: this.result }})
        .height(120)
    }}
    .width('100%')
    .height('100%')
  }}
}}
'''
    
    path.write_text(content, encoding='utf-8')


def escape_ets_string(s: str) -> str:
    """Escape special characters for ETS string literals."""
    return s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n')


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