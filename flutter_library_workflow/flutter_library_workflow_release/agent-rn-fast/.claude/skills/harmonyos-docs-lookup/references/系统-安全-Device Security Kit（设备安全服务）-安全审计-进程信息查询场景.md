## 场景介绍

从API version 20 开始，新增提供应用进程信息查询接口，可以获取设备上已启动的应用进程信息。进程信息包括进程ID、指令命令行、父进程PID、用户ID、用户组ID、进程启动时间、进程所有者ID类型、进程所有者ID等相关信息。

## 约束和限制

1. 当前能力仅支持2in1设备。
2. 支持单次输入要查询的进程数最大限制为16个。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/52/v3/M35Qykj_QWi5eLsvn9b36g/zh-cn_image_0000002482788482.png?HW-CC-KV=V1&HW-CC-Date=20260414T043310Z&HW-CC-Expire=86400&HW-CC-Sign=573754FBDB248066EB22C5551F8A1AECF9879CB5C7777795E1D3C0020360EF4D)

**流程说明：**

1. 用户在hap应用上调用查询接口获取应用进程信息。
2. Device Security Kit接口同步返回应用进程信息给hap应用，hap应用根据返回的应用进程信息进行业务处理。

## 接口说明

接口如下表，更多接口及使用方法请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-securityaudit-api#section764412911237)。

展开

| 接口名 | 描述 |
| --- | --- |
| queryAllProcesses(): string | 获取所有的应用进程信息。 |
| queryProcesses(pids: number[]): string | 获取输入的pid的应用进程信息。 |

## 开发步骤

说明

* 在开发准备过程中，需要申请权限：ohos.permission.QUERY\_AUDIT\_EVENT。
* 只允许清单内的企业类应用申请该权限，申请方式请参考：[申请使用企业类应用可用权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/permissions-for-enterprise-apps)。

1. 导入Device Security Kit模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { securityAudit } from '@kit.DeviceSecurityKit';
   2. import { BusinessError} from '@kit.BasicServicesKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 开发者根据实际场景，获取单个或所有应用进程信息。
   * 获取单个应用进程信息。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. const TAG = "SecurityAuditJsTest";
     2. let pids: number[] = [3622];
     3. try {
     4. hilog.info(0x0000, TAG, 'queryProcesses begin.');
     5. const result = securityAudit.queryProcesses(pids);
     6. hilog.info(0x0000, TAG, 'Succeeded in queryProcesses.');
     7. } catch (err) {
     8. let e: BusinessError = err as BusinessError;
     9. hilog.error(0x0000, TAG, 'queryProcesses failed: %{public}d %{public}s', e.code, e.message);
     10. }
     ```

   * 获取所有的应用进程信息。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. const TAG = "SecurityAuditJsTest";
     2. try {
     3. hilog.info(0x0000, TAG, 'queryAllProcesses begin.');
     4. const result = securityAudit.queryAllProcesses();
     5. hilog.info(0x0000, TAG, 'Succeeded in queryAllProcesses.');
     6. } catch (err) {
     7. let e: BusinessError = err as BusinessError;
     8. hilog.error(0x0000, TAG, 'queryAllProcesses failed: %{public}d %{public}s', e.code, e.message);
     9. }
     ```