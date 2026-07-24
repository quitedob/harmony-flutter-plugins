
SAVE_DIR = 'out/'
BLACKLIST_DEFAULT = 'black_list/'
GREYLIST_DEFAULT = 'grey_list/'
THIRD_LIB_ROOT = ''

# BUILD SCRIPT

# 根据各种构建脚本文件的特殊后缀，识别构建方式
BUILD_SCRIPT_SUFFIX = {'cmake' : ['.cmake'],
                       'make' : [],
                       'automake' : [],
                       'autoconf' : [],
                       'configure' : [],
                       'Android.mk' : ['.mk']}

# 根据各种构建脚本文件的典型文件名，识别构建方式
BUILD_SCRIPT_FILE = {'cmake' : ['CMakeLists.txt'],
                     'make' : ['Makefile', 'makefile'],
                     'automake' : ['Makefile.am', 'makefile.am'],
                     'autoconf' : ['configure.ac'],
                     'configure' : ['configure', 'Configure', 'config']}
