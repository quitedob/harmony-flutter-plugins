## 概述

PhonePC/2in1TabletTV

声明按需分发能力的API。

**引用文件：** <AppGalleryKit/module\_install.h>

**库：** libhmsmoduleinstall.so

**系统能力：** SystemCapability.AppGalleryService.Distribution.OnDemandInstall

**起始版本：** 5.0.2(14)

**相关模块：** [ModuleInstall](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall)

## 汇总

PhonePC/2in1TabletTV

### 类型

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| typedef struct [ModuleInstall\_InstalledModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#moduleinstall_installedmodule) [ModuleInstall\_InstalledModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#moduleinstall_installedmodule) | 安装模块信息。 |
| typedef struct [ModuleInstall\_FetchModulesResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#moduleinstall_fetchmodulesresult) [ModuleInstall\_FetchModulesResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#moduleinstall_fetchmodulesresult) | 安装模块结果。 |
| typedef struct [ModuleInstall\_StatusCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#moduleinstall_statuscallback) [ModuleInstall\_StatusCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#moduleinstall_statuscallback) | 模块安装状态回调。 |
| [ModuleInstall\_OnStatusCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#moduleinstall_onstatuscallback) | 监听回调函数 |

### 枚举

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| typedef enum [ModuleInstall\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#moduleinstall_errcode) {  E\_NO\_ERROR = 0,  E\_PARAMS = 401,  E\_QUERY\_MODULE = 1006500001,  E\_REPEATED\_CALL = 1006500002,  E\_CONNECT\_SA = 1006500004,  E\_OFF\_WITHOUT\_ON = 1006500006,  E\_CONNECT\_SERVICE\_EXTENSION = 1006500007,  E\_WRITE\_PARAM = 1006500008,  E\_REQUEST\_SERVER = 1006500009,  E\_RESPONSE\_INVALID = 1006500010,  E\_INNER\_ERROR = 1006500011  } | 枚举错误码。 |
| typedef enum [ModuleInstall\_InstallStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#moduleinstall_installstatus) {  INSTALLED = 0,  NOT\_INSTALLED = 1  } | 枚举安装状态。 |
| typedef enum [ModuleInstall\_RequestCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#moduleinstall_requestcode) {  MODULE\_ALREADY\_EXISTS = -8,  MODULE\_UNAVAILABLE = -7,  INVALID\_REQUEST = -6,  NETWORK\_ERROR = -5,  INVOKER\_VERIFICATION\_FAILED = -4,  FOREGROUND\_REQUIRED = -3,  ACTIVE\_SESSION\_LIMIT\_EXCEEDED = -2,  FAILURE = -1,  SUCCESS = 0,  DOWNLOAD\_WAIT\_WIFI = 1  } | 枚举请求码。 |
| typedef enum [ModuleInstall\_TaskStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#moduleinstall_taskstatus) {  CREATE\_TASK\_FAILED = -4,  HIGHER\_VERSION\_INSTALLED = -3,  TASK\_ALREADY\_EXISTS = -2,  TASK\_UNFOUND = -1,  TASK\_CREATED = 0,  DOWNLOADING = 1,  DOWNLOAD\_PAUSED = 2,  DOWNLOAD\_WAITING = 3,  DOWNLOAD\_SUCCESSFUL = 4,  DOWNLOAD\_FAILED = 5,  DOWNLOAD\_WAIT\_FOR\_WIFI = 6,  INSTALL\_WAITING = 20,  INSTALLING = 21,  INSTALL\_SUCCESSFUL = 22,  INSTALL\_FAILED = 23  } | 枚举任务状态。 |

### 函数

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [HMS\_ModuleInstall\_GetInstalledModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_getinstalledmodule) | 查询模块是否安装。 |
| [HMS\_ModuleInstall\_GetInstalledModuleName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_getinstalledmodulename) | 获取模块名。 |
| [HMS\_ModuleInstall\_GetInstalledModuleType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_getinstalledmoduletype) | 获取模块类型。 |
| [HMS\_ModuleInstall\_GetModuleInstallStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_getmoduleinstallstatus) | 获取模块安装状态。 |
| [HMS\_ModuleInstall\_FetchModules](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_fetchmodules) | 请求下载模块。 |
| [HMS\_ModuleInstall\_GetFetchModulesRequestCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_getfetchmodulesrequestcode) | 获取模块下载请求码。 |
| [HMS\_ModuleInstall\_GetFetchModulesTaskStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_getfetchmodulestaskstatus) | 获取模块下载任务状态。 |
| [HMS\_ModuleInstall\_GetFetchModulesTaskId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_getfetchmodulestaskid) | 获取模块下载任务id。 |
| [HMS\_ModuleInstall\_GetFetchModulesDesc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_getfetchmodulesdesc) | 获取模块下载描述。 |
| [HMS\_ModuleInstall\_GetFetchModules](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_getfetchmodules) | 获取模块下载模块名。 |
| [HMS\_ModuleInstall\_GetFetchModulesTotalSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_getfetchmodulestotalsize) | 获取模块下载总大小。 |
| [HMS\_ModuleInstall\_GetFetchModulesDownloadedSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_getfetchmodulesdownloadedsize) | 获取模块下载已下载大小。 |
| [HMS\_ModuleInstall\_CancelTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_canceltask) | 取消下载任务。 |
| [HMS\_ModuleInstall\_ShowCellularDataConfirmation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_showcellulardataconfirmation) | 展示流量弹窗。 |
| [HMS\_ModuleInstall\_CreateStatusCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_createstatuscallback) | 创建下载进度监听回调。 |
| [HMS\_ModuleInstall\_On](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_on) | 下载进度监听。 |
| [HMS\_ModuleInstall\_ReleaseStatusCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_releasestatuscallback) | 释放下载进度监听回调。 |
| [HMS\_ModuleInstall\_Off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-c-moduleinstall#hms_moduleinstall_off) | 取消下载进度监听。 |