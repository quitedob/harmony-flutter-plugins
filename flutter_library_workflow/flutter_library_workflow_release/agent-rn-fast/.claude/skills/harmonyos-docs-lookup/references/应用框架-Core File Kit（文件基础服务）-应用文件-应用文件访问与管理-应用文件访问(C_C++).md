## 场景介绍

FileIO模块提供了部分文件基础操作能力，其他能力请参考[libc标准库](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/musl)/[c++标准库](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cpp)。

## 约束限制

进行文件操作之前，必须保证传入正确有效的URI或path。

## 接口说明

接口的详细说明，请参考[FileIO](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-fileio-h)。

展开

| 接口名称 | 描述 |
| --- | --- |
| FileManagement\_ErrCode OH\_FileIO\_GetFileLocation(char \*uri, int uriLength, FileIO\_FileLocation \*location) | 获取文件存储位置。 |
| enum FileIO\_FileLocation FileIO\_FileLocation | 文件存储位置枚举值。 |
| enum FileManagement\_ErrCode FileManagement\_ErrCode | 文件管理模块错误码。 |

## 开发步骤

**在CMake脚本中链接动态库**

CMakeLists.txt中添加以下lib。

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(sample PUBLIC libohfileio.so)
```

**添加头文件**

收起

自动换行

深色代码主题

复制

```
1. #include <cstdio>
2. #include <cstring>
3. #include <filemanagement/fileio/oh_fileio.h>
```

调用OH\_FileIO\_GetFileLocation接口获取文件存储位置。示例代码如下所示：

收起

自动换行

深色代码主题

复制

```
1. void GetFileLocationExample() {
2. char *uri = "file://com.example.demo/data/storage/el2/base/files/test.txt";
3. FileIO_FileLocation location;
4. FileManagement_ErrCode ret = OH_FileIO_GetFileLocation(uri, strlen(uri), &location);
5. if (ret == 0) {
6. if (location == FileIO_FileLocation::LOCAL) {
7. printf("This file is on local.");
8. } else if (location == FileIO_FileLocation::CLOUD) {
9. printf("This file is on cloud.");
10. } else if (location == FileIO_FileLocation::LOCAL_AND_CLOUD) {
11. printf("This file is both on local and cloud.");
12. }
13. } else {
14. printf("GetFileLocation failed, error code is %d", ret);
15. }
16. }
```