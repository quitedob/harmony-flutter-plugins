import os
import time

from tasks_pool import Tasks

SOURCE_FILTER = ['.c', '.h', '.cpp', '.cxx', 'hpp', '.cppm', '.cc', '.hhc', '.CXX', '.CPP', '.cp', '.c++']

def get_target_files(path, source_type):
    """
    description: get filtered source file path list in target dir
    """
    ret = []
    if os.path.exists(path) and not os.path.isdir(path):
        dir_extend_name = os.path.splitext(path)[1]
        if dir_extend_name in source_type:
            ret.append(path)
    else:
        for root, dirs, files in os.walk(path):
            for file in files:
                file_extend_name = os.path.splitext(file)[1]
                if file_extend_name in source_type:
                    file_path = os.path.join(root, file)
                    ret.append(file_path)
    return ret

def __task_function(param):
    ret = get_target_files(param[1], param[2])
    return param[0], ret

def get_libs_from_dir(libs_root='../thirdparty', is_getapi=True):
    """
        description: get libs path dict include filtered source files in target dir
    """
    libs = {}
    dir_file = os.listdir(libs_root)
    for f in dir_file:
        path = os.path.join(libs_root, f)
        if os.path.isdir(path):
            name = f
            if name in libs:
                print(f'lib {name} overrides')
                continue
            lib_info = {}
            lib_info['path'] = path
            libs[name] = lib_info
        else:
            lib_info = {}
            lib_info['path'] = path
            libs[f] = lib_info
    if is_getapi:
        tasks = Tasks(target=__task_function)
        lib_names = libs.keys()
        for lib_name in lib_names:
            lib_info = libs[lib_name]
            lib_path = lib_info['path']
            tasks.dispatch_task((lib_name, lib_path, SOURCE_FILTER))
        tasks.wait_tasks_end()
        libs_files_info = tasks.get_result()
        for lib_files_info in libs_files_info:
            lib_name = lib_files_info[0]
            lib_files = lib_files_info[1]
            lib_info = libs[lib_name]
            lib_info['sources'] = lib_files
    return libs

if __name__ == '__main__':
    time_start = time.perf_counter()
    sources = []
    libs = get_libs_from_dir('./test')
    print(libs)
    time_end = time.perf_counter()
    print(f'Time takes {time_end - time_start}')

