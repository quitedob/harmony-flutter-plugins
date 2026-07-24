import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from find_api_in_source import find_api_in_source
from black_list import BlackList
from get_libs_from_dir import get_target_files

SOURCE_FILTER = ['.c', '.cpp', '.h', '.hpp', '.cc', '.cxx']


def scan(source_dir, output_format='json'):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    blacklist_path = os.path.join(script_dir, 'black_list')
    blacklist = BlackList(blacklist_path)
    
    source_files = get_target_files(source_dir, SOURCE_FILTER)
    results = {}
    
    for filepath in source_files:
        ret, _ = find_api_in_source(filepath, blacklist.apis_list, blacklist.apis_dict)
        if ret:
            results[filepath] = ret
    
    return results


def format_output(results, source_root):
    output = []
    for filepath, apis in results.items():
        rel_path = os.path.relpath(filepath, source_root)
        for line_num, api_list in apis.items():
            for api_info in api_list:
                category = api_info[0]
                api_name = list(api_info[1].keys())[0]
                api_detail = api_info[1][api_name]
                output.append({
                    'file': rel_path,
                    'line': line_num,
                    'category': category,
                    'api': api_name,
                    'type': api_detail.get('type', ''),
                    'status': api_detail.get('status', '')
                })
    return output


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python scan_risk_apis.py <source_dir>")
        print("Output: JSON格式风险API列表")
        sys.exit(1)
    
    source_dir = os.path.abspath(sys.argv[1])
    results = scan(source_dir)
    formatted = format_output(results, source_dir)
    
    import json
    print(json.dumps(formatted, indent=2, ensure_ascii=False))