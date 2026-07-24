import os
from get_ndk_apis_from_excel import get_ndk_apis_from_excel
from get_libs_from_dir import get_target_files

EXCEL_FILTER = ['.xlsx']


class BlackList(object):
    def __init__(self, path):
        """
        param: path type: str -- BlackList/GreyList root path
        """
        self.load_path = path
        self.excel_files = get_target_files(self.load_path, EXCEL_FILTER)
        self.apis_dict = _get_apis_from_excelList(self.excel_files)
        self.apis_list = _get_whole_apis_list(self.apis_dict)


def _get_apis_from_excelList(blacklists):
    """
        param: blacklists type: list -- include all black_list/grey_list excel files
        return: apis type: dict -- include api info from black_list/grey_list
    """
    apis = {}
    for blacklist in blacklists:
        api_dict = get_ndk_apis_from_excel(excel_file=blacklist)
        apis.update(api_dict)
    return apis

def _get_whole_apis_list(dict):
    """
        description: for check_apis function, take all apis in one list here
        param: dict type: dict -- include api info from black_list/grey_list
        return: apis_list type: list -- include whole api name from black_list/grey_list
    """
    apis_list = []
    for keys, value in dict.items():
        api_list = value.keys()
        for api in api_list:
            if api not in apis_list:
                apis_list.append(api)
    return apis_list


if __name__ == '__main__':
    blacklist = BlackList('./black_list')
    # print(blacklist.load_path)
    # print(blacklist.excel_files)
    print(blacklist.apis_dict)
    print('_____________________________')
    print(blacklist.apis_list)