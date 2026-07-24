#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Shared helpers for sdk-hardemo-generator tool scripts.

Centralizes string escaping, test-step formatting, library module name
inference, case-id <-> file-name mapping, level filtering and BOM-tolerant
JSON reading so that generator/validator/checker stay consistent.
"""

import json
import re
from pathlib import Path
from typing import Any, Dict, List


# Default levels to generate/check. Override via CLI --levels on each script.
DEFAULT_GENERATE_LEVELS: List[str] = ['L0', 'L1', 'L2']


def escape_ets_string(s: str) -> str:
    """Escape special characters for ETS single-quoted string literals."""
    if not isinstance(s, str):
        s = str(s) if s is not None else ''
    return s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n')


def normalize_covered_apis(raw: Any) -> List[str]:
    """Normalize coveredApis.android / .harmony entries to a list of names.

    Accepts a list of strings, a list of dicts (with `name`/`api`/`methodName`),
    a single string, or None.
    """
    if raw is None:
        return []
    if isinstance(raw, str):
        return [raw] if raw.strip() else []
    if isinstance(raw, list):
        out: List[str] = []
        for item in raw:
            if isinstance(item, str):
                if item.strip():
                    out.append(item.strip())
            elif isinstance(item, dict):
                name = item.get('name') or item.get('api') or item.get('methodName') or item.get('method')
                if name:
                    out.append(str(name))
        return out
    return []


def parse_covered_apis(test_case_data: Dict[str, Any]) -> Dict[str, List[str]]:
    """Parse coveredApis.android (harmony is left to the LLM to backfill)."""
    covered = test_case_data.get('coveredApis')
    if isinstance(covered, dict):
        return {
            'android': normalize_covered_apis(covered.get('android')),
            'harmony': normalize_covered_apis(covered.get('harmony')),
        }
    # Legacy flat keys
    return {
        'android': normalize_covered_apis(test_case_data.get('coveredApis_android')),
        'harmony': normalize_covered_apis(test_case_data.get('coveredApis_harmony')),
    }


def format_test_steps(test_case_data: Dict[str, Any]) -> str:
    """Format test_steps into a readable string.

    Each step becomes `i. action [验证点: checkpoint]` (checkpoint omitted when
    empty). Steps are separated by `\\n` (a newline) so that the widget can
    split reliably without colliding with `;` inside action text. Falls back to
    the legacy `steps` field when `test_steps` is absent.
    """
    test_steps_data = test_case_data.get('test_steps')
    if isinstance(test_steps_data, list):
        parts: List[str] = []
        for i, step in enumerate(test_steps_data):
            if isinstance(step, dict):
                action = str(step.get('action', '') or '')
                checkpoint = str(step.get('checkpoint', '') or '')
                part = f'{i + 1}. {action}'
                if checkpoint:
                    part += f' [验证点: {checkpoint}]'
                parts.append(part)
            elif step is not None:
                parts.append(f'{i + 1}. {step}')
        if parts:
            return '\n'.join(parts)
    raw = test_case_data.get('steps', '')
    if isinstance(raw, list):
        return '\n'.join(str(s) for s in raw)
    return str(raw or '')


def infer_library_module_name(library_dir: Path, *, log: bool = False) -> str:
    """Infer the library module name from oh-package.json5 (default 'library')."""
    oh_pkg_path = library_dir / 'oh-package.json5'
    if oh_pkg_path.exists():
        try:
            pkg_data = load_json5(oh_pkg_path)
            name = str(pkg_data.get('name') or 'library')
            if log:
                print(f'INFO: Inferred library module name: {name}')
            return name
        except Exception as e:
            if log:
                print(f'WARN: Failed to parse library/oh-package.json5: {e}, using default "library"')
            return 'library'
    if log:
        print('WARN: library/oh-package.json5 not found, using default module name "library"')
    return 'library'


def load_json5(path: Path) -> Dict[str, Any]:
    """Read a JSON5 file: strip // and /* */ comments, then json.loads."""
    content = path.read_text(encoding='utf-8-sig')
    content = re.sub(r'//.*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    return json.loads(content)


def read_json(path: Path) -> Any:
    """Read a JSON file tolerating a leading UTF-8 BOM."""
    return json.loads(path.read_text(encoding='utf-8-sig'))


def case_id_to_file_name(case_id: str) -> str:
    """Map a test case id (e.g. 'F-01-01') to its page file name."""
    return f'TestCase{case_id.replace("-", "")}Page.ets'


def case_id_to_class_name(case_id: str) -> str:
    return f'TestCase{case_id.replace("-", "")}Page'


def case_id_to_route(case_id: str) -> str:
    return f'pages/TestCase{case_id.replace("-", "")}Page'


def parse_levels(arg: str) -> List[str]:
    """Parse a comma-separated --levels argument into a list."""
    return [x.strip() for x in arg.split(',') if x.strip()]


def should_generate(level: str, levels: List[str]) -> bool:
    """Mirror the generator's level filter: empty level is always kept."""
    if level and level not in levels:
        return False
    return True
