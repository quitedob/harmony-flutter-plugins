## 通过 ArkTS 接口获取并访问公共目录

目录环境能力接口（[ohos.file.environment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-file-environment)）提供获取公共目录路径的能力，支持三方应用在公共文件用户目录下进行文件访问操作。

**约束限制**

* 使用此方式，需确认设备具有以下系统能力：SystemCapability.FileManagement.File.Environment.FolderObtain，当前仅支持2in1设备。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. if (!canIUse('SystemCapability.FileManagement.File.Environment.FolderObtain')) {
  2. console.error('this api is not supported on this device');
  3. return;
  4. }
  ```
* 公共目录获取接口仅用于获取公共目录路径，不对公共目录访问权限进行校验。若需访问公共目录需申请对应的公共目录访问权限。三方应用需要访问公共目录时，需通过弹窗授权向用户申请授予 Download 目录权限、Documents 目录权限或 Desktop 目录权限，具体参考[访问控制-向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。

收起

自动换行

深色代码主题

复制

```
1. "requestPermissions" : [
2. "ohos.permission.READ_WRITE_DOWNLOAD_DIRECTORY",
3. "ohos.permission.READ_WRITE_DOCUMENTS_DIRECTORY",
4. ]
```

### 示例

1. 获取公共目录路径。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';
   2. import { Environment } from '@kit.CoreFileKit';
   ```

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function getUserDirExample() {
   2. try {
   3. const downloadPath = Environment.getUserDownloadDir();
   4. console.info(`success to getUserDownloadDir: ${downloadPath}`);
   5. const documentsPath = Environment.getUserDocumentDir();
   6. console.info(`success to getUserDocumentDir: ${documentsPath}`);
   7. } catch (error) {
   8. const err: BusinessError = error as BusinessError;
   9. console.error(`failed to get user dir, Error code: ${err.code}, message: ${err.message}`);
   10. }
   11. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/CoreFile/EnvironmentSample/entry/src/main/ets/pages/Index.ets#L24-L36)
2. 以Download目录为例，访问Download目录下的文件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';
   2. import { Environment } from '@kit.CoreFileKit';
   3. import { fileIo as fs } from '@kit.CoreFileKit';
   4. import { common } from '@kit.AbilityKit';

   6. // 请在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext
   7. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
   ```

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function readUserDownloadDirExample(context: common.UIAbilityContext) {
   2. try {
   3. // 获取 Download 目录
   4. const downloadPath = Environment.getUserDownloadDir();
   5. console.info(`success to getUserDownloadDir: ${downloadPath}`);
   6. const dirPath = context.filesDir;
   7. console.info(`success to get filesDir: ${dirPath}`);
   8. // 查看 Download 目录下的文件并拷贝到沙箱目录中
   9. let fileList: string[] = fs.listFileSync(downloadPath);
   10. fileList.forEach((file, index) => {
   11. console.info(`${downloadPath} ${index}: ${file}`);
   12. if (fs.statSync(`${downloadPath}/${file}`).isFile()) {
   13. fs.copyFileSync(`${downloadPath}/${file}`, `${dirPath}/${file}`);
   14. }
   15. });
   16. // 查看沙箱目录下对应的文件
   17. fileList = fs.listFileSync(dirPath);
   18. fileList.forEach((file, index) => {
   19. console.info(`${dirPath} ${index}: ${file}`);
   20. });
   21. } catch (error) {
   22. const err: BusinessError = error as BusinessError;
   23. console.error(`Error code: ${err.code}, message: ${err.message}`);
   24. }
   25. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/CoreFile/EnvironmentSample/entry/src/main/ets/pages/Index.ets#L38-L64)
3. 以Download目录为例，保存文件到Download目录。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';
   2. import { Environment } from '@kit.CoreFileKit';
   3. import { fileIo as fs } from '@kit.CoreFileKit';
   ```

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function writeUserDownloadDirExample() {
   2. // 检查是否具有 READ_WRITE_DOWNLOAD_DIRECTORY 权限，无权限则需要向用户申请授予权限。
   3. try {
   4. // 获取 Download 目录
   5. const downloadPath = Environment.getUserDownloadDir();
   6. console.info(`success to getUserDownloadDir: ${downloadPath}`);
   7. // 保存 temp.txt 到 Download 目录下
   8. const file = fs.openSync(`${downloadPath}/temp.txt`, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
   9. fs.writeSync(file.fd, 'write a message');
   10. fs.closeSync(file);
   11. } catch (error) {
   12. const err: BusinessError = error as BusinessError;
   13. console.error(`Error code: ${err.code}, message: ${err.message}`);
   14. }
   15. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/CoreFile/EnvironmentSample/entry/src/main/ets/pages/Index.ets#L66-L82)

## 通过 C/C++ 接口获取并使用公共目录

除了通过ArkTS访问公共目录的方式，也可通过C/C++接口进行目录访问，具体可以参考 [oh\_environment.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-environment-h)。

**约束限制**

* 使用此接口，需确认设备具有以下系统能力：SystemCapability.FileManagement.File.Environment.FolderObtain。
* 三方应用需要访问公共目录时，需通过弹窗授权向用户申请授予Download目录权限、Documents目录权限或Desktop目录权限，具体参考[访问控制-向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。

### 接口说明

接口的详细说明，请参考[oh\_environment.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-environment-h)。

展开

| 接口名称 | 描述 |
| --- | --- |
| FileManagement\_ErrCode OH\_Environment\_GetUserDownloadDir (char \*\*result) | 获取用户Download目录沙箱路径。只支持2in1设备 |
| FileManagement\_ErrCode OH\_Environment\_GetUserDesktopDir (char \*\*result) | 获取用户Desktop目录沙箱路径。只支持2in1设备 |
| FileManagement\_ErrCode OH\_Environment\_GetUserDocumentDir (char \*\*result) | 获取用户Document目录沙箱路径。只支持2in1设备 |

### 开发步骤

**在CMake脚本中链接动态库**

CMakeLists.txt中添加以下lib。

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(sample PUBLIC libohenvironment.so libhilog_ndk.z.so)
```

**添加头文件**

收起

自动换行

深色代码主题

复制

```
1. #include <filemanagement/environment/oh_environment.h>
2. #include <filemanagement/fileio/oh_fileio.h>
3. #include <hilog/log.h>
```

1. 调用OH\_Environment\_GetUserDownloadDir接口获取用户Download目录沙箱路径，在接口中使用malloc申请的内存需要在使用完后释放因此需要free对应的内存。示例代码如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include <cstdlib>
   ```

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. void GetUserDownloadDirExample()
   2. {
   3. char *downloadPath = nullptr;
   4. FileManagement_ErrCode ret = OH_Environment_GetUserDownloadDir(&downloadPath);
   5. if (ret == 0) {
   6. OH_LOG_INFO(LOG_APP, "Download Path=%{public}s", downloadPath);
   7. free(downloadPath);
   8. } else {
   9. OH_LOG_ERROR(LOG_APP, "GetDownloadPath fail, error code is %{public}d", ret);
   10. }
   11. }
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/CoreFile/NDKEnvironmentSample/entry/src/main/cpp/napi_init.cpp#L32-L44)
2. 调用OH\_Environment\_GetUserDownloadDir接口获取用户Download目录沙箱路径，并查看Download目录下的文件。示例代码如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include <cstdlib>
   2. #include <dirent.h>
   ```

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. void ScanUserDownloadDirPathExample()
   2. {
   3. // 获取 download 路径
   4. char *downloadPath = nullptr;
   5. FileManagement_ErrCode ret = OH_Environment_GetUserDownloadDir(&downloadPath);
   6. if (ret == 0) {
   7. OH_LOG_INFO(LOG_APP, "Download Path=%{public}s", downloadPath);
   8. } else {
   9. OH_LOG_ERROR(LOG_APP, "GetDownloadPath fail, error code is %{public}d", ret);
   10. return;
   11. }
   12. // 查看文件夹下的文件
   13. struct dirent **namelist = nullptr;
   14. int num = scandir(downloadPath, &namelist, nullptr, nullptr);
   15. if (num < 0) {
   16. free(downloadPath);
   17. OH_LOG_ERROR(LOG_APP, "Failed to scan dir");
   18. return;
   19. }

   21. for (int i = 0; i < num; i++) {
   22. OH_LOG_INFO(LOG_APP, "%{public}s", namelist[i]->d_name);
   23. }
   24. free(downloadPath);
   25. for (int i = 0; i < num; i++) {
   26. free(namelist[i]);
   27. }
   28. free(namelist);
   29. }
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/CoreFile/NDKEnvironmentSample/entry/src/main/cpp/napi_init.cpp#L52-L82)
3. 调用OH\_Environment\_GetUserDownloadDir接口获取用户Download目录沙箱路径，并保存temp.txt到Download目录下。示例代码如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include <fstream>
   ```

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. void WriteUserDownloadDirPathExample()
   2. {
   3. // 获取 download 路径
   4. char *downloadPath = nullptr;
   5. FileManagement_ErrCode ret = OH_Environment_GetUserDownloadDir(&downloadPath);
   6. if (ret == 0) {
   7. OH_LOG_INFO(LOG_APP, "Download Path=%{public}s", downloadPath);
   8. } else {
   9. OH_LOG_ERROR(LOG_APP, "GetDownloadPath fail, error code is %{public}d", ret);
   10. return;
   11. }
   12. // 保存文件到 download 目录下
   13. std::string filePath = std::string(downloadPath) + "/temp.txt";
   14. free(downloadPath);

   16. std::ofstream outfile;
   17. outfile.open(filePath.c_str());
   18. if (!outfile) {
   19. OH_LOG_ERROR(LOG_APP, "Failed to open file");
   20. return;
   21. }
   22. std::string msg = "Write a message";
   23. outfile.write(msg.c_str(), msg.size());
   24. outfile.close();
   25. }
   ```

   [napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/CoreFile/NDKEnvironmentSample/entry/src/main/cpp/napi_init.cpp#L90-L116)