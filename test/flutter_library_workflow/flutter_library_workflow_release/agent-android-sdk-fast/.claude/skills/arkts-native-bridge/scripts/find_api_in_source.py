
from collections import defaultdict
import re

def remove_CCpp_Comment(text):
    """
    description: remove comments in source file for detection
    param： text, type: str
    """

    def blotOutNonNewlines(strIn):
        return "" + ("\n" * strIn.count('\n'))

    def replacer(match):
        s = match.group(0)
        if s.startswith('/'):
            return blotOutNonNewlines(s)
        else:
            return s

    pattern = re.compile(
        r'//.*?$|/\*.*?\*/|\'(?:\\.|[^\\\'])*\'|"(?:\\.|[^\\"])*"',
        re.DOTALL | re.MULTILINE
    )

    return re.sub(pattern, replacer, text)

def remove_comment(text):
    """
        description: remove comments in single line for detection
        param： text, type: str
    """
    pattern = re.compile(r'.*?(/\*.*?\*/)')
    return re.sub(pattern, '', text)

def find_api_in_source(source_file, target_apis, target_apis_dict):
    """
        description: find warning apis used in source file,
        params: text, type: str
        params: target_apis, type: list
        params: target_apis_dict, type: dict
        return: ret, types: dict -- keys: line detected warning in source file, values: apis info
    """
    ret = defaultdict(list)
    check_apis = []
    check_exist = 0
    print(f'Start risk scanf in source file {source_file}')
    with open(source_file, 'r+', encoding='UTF-8', errors='ignore') as f:
        content = f.read()
        new_content = remove_CCpp_Comment(content)
        totalLines = 0
        # 字符串按行分割
        lines = new_content.split('\n')
        totalLines += len(lines)
        line_count = 1
        for line in lines:
            if line == '': # 跳过空行
                line_count += 1
                continue
            line = remove_comment(line)
            for api in target_apis:
                if api not in check_apis and api_filter(api, line, target_apis_dict): # TODO 修复同一个api在文件里只被发现第一次
                    for key, values in target_apis_dict.items():
                        # print("key:", key)
                        # print("values:", values)
                        for m, n in values.items():
                            if api == m:
                                data_list = [(key, n)]
                                ret[line_count].append(data_list)
                                check_apis.append(api)
            line_count += 1
            pcent = line_count * 100/totalLines
            print('\r', f'Risk scanf {source_file} : {pcent}%.', end='\r', flush=True)
    if ret:
        print(f'Risk scan file {source_file} 100%!')
        # print(ret)
    return ret, totalLines


def api_filter(api, line_content, apiDescriptions = None):

    for modul, apiInfo in apiDescriptions.items():
        apiDesc = apiInfo.get(api)
        if apiDesc != None:
            break
    if apiDesc != None:
        if apiDesc['type'].lower() == 'function' or apiDesc['type'].lower() == 'struct' or apiDesc['type'].lower() == 'class':
            if ' ' + api + '(' in line_content or '=' + api + '(' in line_content or '\t' + api + '(' in line_content:
                return True
            elif ' ' + api + ' (' in line_content or '=' + api + ' (' in line_content or '\t' + api + ' (' in line_content:
                return True
            elif ' ' + api + '  (' in line_content or '=' + api + '  (' in line_content or '\t' + api + '  (' in line_content:
                return True
            elif ' ' + api + '\t(' in line_content or '=' + api + '\t(' in line_content or '\t' + api + '\t(' in line_content:
                return True
            elif line_content.startswith(api + '(') or line_content.startswith(api + ' (') or line_content.startswith(api + '\t('):
                return True
            else:
                return False

        else:
            if ' ' + api + ' ' in line_content or '=' + api + ' ' in line_content or '\t' + api + ' ' in line_content:
                return True
            elif ' ' + api + '(' in line_content or '=' + api + '(' in line_content or '\t' + api + '(' in line_content:
                return True
            elif ' ' + api + ';' in line_content or '=' + api + ';' in line_content or '\t' + api + ';' in line_content:
                return True
            elif ' ' + api + '\t' in line_content or '=' + api + '\t' in line_content or '\t' + api + '\t' in line_content:
                return True
            elif  line_content.startswith(api + ' ') or line_content.startswith(api + '(') or line_content.startswith(api + ';') or line_content.startswith(api + '\t'):
                return True
            else:
                return False
    else:
        return False