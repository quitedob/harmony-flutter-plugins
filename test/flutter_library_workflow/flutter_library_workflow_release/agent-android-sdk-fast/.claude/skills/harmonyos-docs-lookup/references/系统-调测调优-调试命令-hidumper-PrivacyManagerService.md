PrivacyManagerService是访问控制基于[hidumper](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hidumper)增强开发的命令行能力，可显示访问控制基础信息，获取敏感权限使用记录。

## 环境准备

根据hidumper工具指导，完成[环境准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hidumper#环境要求)。

## 获取帮助信息

如果需要查看帮助信息，可以通过下列命令实现。

收起

自动换行

深色代码主题

复制

```
1. hidumper -s PrivacyManagerService -a '-h'
```

**使用样例：**

收起

自动换行

深色代码主题

复制

```
1. -------------------------------[ability]-------------------------------


4. ----------------------------------PrivacyManagerService----------------------------------
5. Privacy Dump:
6. Usage:
7. -h: command help
8. -t <TOKEN_ID>: according to specific token id dump permission used records
```

## 获取敏感权限使用记录信息

支持通过应用进程的tokenid，查看敏感权限使用记录的信息，可以通过下列命令实现。

收起

自动换行

深色代码主题

复制

```
1. hidumper -s PrivacyManagerService -a '-t <tokenId>'
```

命令所需的tokenId可以通过[atm-tool](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/atm-tool#查询命令)进行查询。

**使用样例：**

收起

自动换行

深色代码主题

复制

```
1. hidumper -s PrivacyManagerService -a '-t 536992218'

3. -------------------------------[ability]-------------------------------


6. ----------------------------------PrivacyManagerService----------------------------------
7. Privacy Dump:
8. {
9. "permissionRecord": [
10. {
11. "bundleName": "com.ohos.camera",
12. "isRemote": false,
13. "permissionName": "ohos.permission.READ_IMAGEVIDEO",
14. "lastAccessTime": 1508577149393,
15. "lastAccessDuration": 0,
16. "accessCount": 2
17. }
18. ]
19. }
```