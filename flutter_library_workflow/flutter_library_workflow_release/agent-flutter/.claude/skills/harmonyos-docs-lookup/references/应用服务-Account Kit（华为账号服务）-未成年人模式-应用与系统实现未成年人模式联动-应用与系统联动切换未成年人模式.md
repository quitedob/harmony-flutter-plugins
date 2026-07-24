## 场景介绍

在未成年人模式下，应用可通过以下两种方式获取系统未成年人模式状态，与系统未成年人模式进行联动：

说明

以下两种方式都需要应用实现，如开发者不实现订阅系统未成年人模式公共事件，则应用无法实时感知系统未成年人模式的变化。

示例：当应用处于前台，如开发者不实现订阅系统未成年人模式公共事件，当用户从控制中心开启未成年人模式后，当前应用无法实时感知系统未成年人模式的变化。

1. 查询系统的未成年人模式是否开启：应用启动时，可调用[getMinorsProtectionInfoSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section11505356101217)接口，主动查询系统的未成年人模式状态；如系统未成年人模式为开启状态，则应自动开启应用的未成年人模式；如系统未成年人模式为关闭状态，则应自动关闭应用的未成年人模式。
2. 订阅[系统未成年人模式公共事件](/consumer/cn/doc/harmonyos-guides/account-system-minorsprotection#section1636450112718)感知系统的未成年人模式状态：应用进程存在时，可订阅系统的未成年人模式公共事件，当订阅到系统未成年人模式开启或关闭时，应用可自动进行未成年人模式状态切换。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/18/v3/TGf0wRaxSSyxDlG6C7fLHA/zh-cn_image_0000002528823273.png?HW-CC-KV=V1&HW-CC-Date=20260414T024755Z&HW-CC-Expire=86400&HW-CC-Sign=B0DD603BFD14EB9A68D28909198567DD914B1F18EF70C9B86A6713489971B876)

流程说明：

1. 用户打开应用时，应用通过订阅[系统未成年人模式公共事件](/consumer/cn/doc/harmonyos-guides/account-system-minorsprotection#section1636450112718)感知系统未成年人模式的状态变化。如果订阅到系统未成年人模式开启事件，则开启应用的未成年人模式，如果订阅到系统未成年人模式关闭事件，则展示内容不做限制，而且需关闭应用的未成年人模式。
2. 调用[getMinorsProtectionInfoSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section11505356101217)或[getMinorsProtectionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section82313184131)获取系统未成年人模式的开启状态和年龄段信息，如果系统未成年人模式未开启，则展示内容不做限制。如果系统未成年人模式已开启，则需要根据返回的年龄段做内容分级，而且需开启应用的未成年人模式。

## 接口说明

以下是应用与系统联动切换未成年人模式的相关接口说明，更多接口及使用方法请参见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getMinorsProtectionInfoSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section11505356101217)(): [MinorsProtectionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section3551104714566) | 同步接口，获取系统未成年人模式的开启状态，以及年龄段信息。 |
| [getMinorsProtectionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section82313184131)(): Promise<[MinorsProtectionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section3551104714566)> | 异步接口，获取系统未成年人模式的开启状态，以及年龄段信息。 |

注意

1. 当未成年人模式开启时，当前设备的开发者调试模式会被禁用，开发者可以进入设置-系统-开发者选项，点击USB调试开关，会校验健康使用设备密码，校验成功后可解除开发者调试模式限制。
2. 如开发者重新开启USB调试开关后，发现DevEco Studio工具上hilog日志未恢复到断连之前，请执行“hdc shell hilog -G 16M”来扩大hilog日志缓存区，若hilog日志仍无法完全展示，可取出hilog日志本地查看。更多命令请参见[hilog](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hilog)。
3. 如开发者有频繁使用到未成年人模式开启状态或者年龄段的场景，建议开发者在获取到该结果后做缓存，可通过订阅[系统未成年人模式公共事件](/consumer/cn/doc/harmonyos-guides/account-system-minorsprotection#section1636450112718)来刷新未成年人模式开启状态或者年龄段，避免重复调用接口，增加应用处理时延。
4. 当设备处于开机未解锁状态下，开发者调用[getMinorsProtectionInfoSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section11505356101217)接口会返回false。

## 事件说明

以下是系统未成年人模式开启或关闭发送的广播事件。

展开

| 事件名称 | 值 | 描述 |
| --- | --- | --- |
| [COMMON\_EVENT\_MINORSMODE\_ON](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/commoneventmanager-definitions#common_event_minorsmode_on12) | usual.event.MINORSMODE\_ON | 表示系统未成年人模式开启事件。 |
| [COMMON\_EVENT\_MINORSMODE\_OFF](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/commoneventmanager-definitions#common_event_minorsmode_off12) | usual.event.MINORSMODE\_OFF | 表示系统未成年人模式关闭事件。 |

说明

未成年人模式开启事件触发时机：

主动开启系统未成年人模式（PC/2in1设备暂不支持从控制中心开启未成年人模式），当前设备会发送未成年人模式开启事件。

## 开发前提

请先参考“开发准备”的[配置签名和指纹](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-sign-fingerprints)章节，通过自动签名方式完成签名信息的配置。请注意，该接口无需配置公钥指纹、Client ID，也无需申请账号权限。

## 开发步骤

1. 导入[minorsProtection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection)模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { minorsProtection } from '@kit.AccountKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import { BusinessError, commonEventManager } from '@kit.BasicServicesKit';
   ```
2. 创建订阅者，订阅系统未成年人模式开启或关闭事件。推荐在应用Ability的[onCreate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#oncreate)生命周期中调用。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 订阅者信息
   2. const subscribeInfo: commonEventManager.CommonEventSubscribeInfo = {
   3. events: [commonEventManager.Support.COMMON_EVENT_MINORSMODE_ON,
   4. commonEventManager.Support.COMMON_EVENT_MINORSMODE_OFF]
   5. };

   7. // 如开发者使用await改写createSubscriber方法，需要把此变量定义到全局(struct外层)
   8. let subscriber: commonEventManager.CommonEventSubscriber;
   9. // 创建订阅者
   10. commonEventManager.createSubscriber(subscribeInfo)
   11. .then((commonEventSubscriber: commonEventManager.CommonEventSubscriber) => {
   12. // 这里获取到commonEventSubscriber对象需要暂存，用于后续事件回调。不可直接使用，否则会出现事件回调不生效的情况
   13. subscriber = commonEventSubscriber;
   14. // 订阅公共事件
   15. commonEventManager.subscribe(subscriber,
   16. (error: BusinessError, data: commonEventManager.CommonEventData) => {
   17. if (error) {
   18. dealCommonEventAllError(error);
   19. return;
   20. }
   21. if (data.event === commonEventManager.Support.COMMON_EVENT_MINORSMODE_ON) {
   22. // 订阅到开启事件，可以调用获取年龄段的接口，根据年龄段刷新内容展示，同时如开发者有缓存年龄段或未成年人模式开启状态，则需要刷新缓存
   23. return;
   24. }
   25. if (data.event === commonEventManager.Support.COMMON_EVENT_MINORSMODE_OFF) {
   26. // 订阅到关闭事件，关闭当前应用的未成年人模式，刷新应用内容展示，取消年龄限制，如开发者有缓存未成年人模式开启状态，则需要刷新缓存
   27. }
   28. });
   29. })
   30. .catch((error: BusinessError) => {
   31. dealCommonEventAllError(error);
   32. });
   ```

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function dealCommonEventAllError(error: BusinessError): void {
   2. hilog.error(0x0000, 'testTag', `Failed to subscribe. Code: ${error.code}, message: ${error.message}`);
   3. }
   ```
3. 选择以下一种方式获取未成年人模式的开启状态，以及年龄段信息。当应用期望立即获取结果，推荐使用同步方式，当应用期望使用非阻塞的方式调用接口，推荐使用Promise异步回调方式。推荐在自定义组件的[aboutToAppear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-lifecycle#abouttoappear)生命周期或者应用Ability的[onCreate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#oncreate)生命周期中调用，如开发者有频繁使用到未成年人模式开启状态或年龄段信息，开发者则需把获取到的系统未成年人模式开启状态或年龄段缓存下来，通过订阅[未成年人模式公共事件](/consumer/cn/doc/harmonyos-guides/account-system-minorsprotection#section1636450112718)来刷新未成年人模式开启状态或年龄段。
   * 通过同步方式，调用[getMinorsProtectionInfoSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section11505356101217)获取系统未成年人模式的开启状态，以及年龄段信息。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. if (canIUse('SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection')) {
     2. try {
     3. if (minorsProtection.supportMinorsMode()) {
     4. const minorsProtectionInfo: minorsProtection.MinorsProtectionInfo =
     5. minorsProtection.getMinorsProtectionInfoSync();
     6. // 获取未成年人模式开启状态
     7. const minorsProtectionMode: boolean = minorsProtectionInfo.minorsProtectionMode;
     8. // 如开发者有频繁使用到未成年人模式开启状态，这里则需缓存未成年人模式开启状态
     9. hilog.info(0x0000, 'testTag',
     10. `Succeeded in getting minorsProtectionMode is: ${minorsProtectionMode.valueOf()}`);
     11. // 未成年人模式已开启，获取年龄段信息
     12. if (minorsProtectionMode) {
     13. const ageGroup: minorsProtection.AgeGroup | undefined = minorsProtectionInfo.ageGroup;
     14. if (ageGroup) {
     15. hilog.info(0x0000, 'testTag', `Succeeded in getting lowerAge is: ${ageGroup.lowerAge}`);
     16. hilog.info(0x0000, 'testTag', `Succeeded in getting upperAge is: ${ageGroup.upperAge}`);
     17. // 根据年龄段刷新内容展示。如开发者有频繁使用到年龄段信息，这里则需缓存年龄段信息
     18. }
     19. } else {
     20. // 未成年人模式未开启，应用需跟随系统未成年人模式，展示内容不做限制
     21. }
     22. } else {
     23. hilog.info(0x0000, 'testTag',
     24. 'The current device environment does not support the youth mode, please check the current device environment.');
     25. }
     26. } catch (error) {
     27. hilog.error(0x0000, 'testTag',
     28. `Failed to invoke supportMinorsMode or getMinorsProtectionInfoSync. errCode: ${error.code},
     29. errMessage: ${error.message}`);
     30. }
     31. } else {
     32. hilog.info(0x0000, 'testTag',
     33. 'The current device does not support the invoking of the getMinorsProtectionInfoSync interface.');
     34. }
     ```
   * 通过Promise异步回调方式，调用[getMinorsProtectionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-minorsprotection#section82313184131)获取系统未成年人模式的开启状态，以及年龄段信息。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. if (canIUse('SystemCapability.AuthenticationServices.HuaweiID.MinorsProtection')) {
     2. try {
     3. if (minorsProtection.supportMinorsMode()) {
     4. minorsProtection.getMinorsProtectionInfo()
     5. .then((minorsProtectionInfo: minorsProtection.MinorsProtectionInfo) => {
     6. // 获取未成年人模式开启状态
     7. const minorsProtectionMode: boolean = minorsProtectionInfo.minorsProtectionMode;
     8. // 如开发者有频繁使用到未成年人模式开启状态，这里则需缓存未成年人模式开启状态
     9. hilog.info(0x0000, 'testTag',
     10. `Succeeded in getting minorsProtectionMode is: ${minorsProtectionMode.valueOf()}`);
     11. // 未成年人模式已开启，获取年龄段信息
     12. if (minorsProtectionMode) {
     13. const ageGroup: minorsProtection.AgeGroup | undefined = minorsProtectionInfo.ageGroup;
     14. if (ageGroup) {
     15. hilog.info(0x0000, 'testTag', `Succeeded in getting lowerAge is: ${ageGroup.lowerAge}`);
     16. hilog.info(0x0000, 'testTag', `Succeeded in getting upperAge is: ${ageGroup.upperAge}`);
     17. // 根据年龄段刷新内容展示。如开发者有频繁使用到年龄段信息，这里则需缓存年龄段信息
     18. }
     19. } else {
     20. // 未成年人模式未开启，应用需跟随系统未成年人模式，展示内容不做限制
     21. }
     22. })
     23. .catch((error: BusinessError<Object>) => {
     24. dealGetMinorsInfoAllError(error);
     25. });
     26. } else {
     27. hilog.info(0x0000, 'testTag',
     28. 'The current device environment does not support the youth mode, please check the current device environment.');
     29. }
     30. } catch (error) {
     31. hilog.error(0x0000, 'testTag',
     32. `Failed to invoke supportMinorsMode. errCode: ${error.code}, errMessage: ${error.message}`);
     33. }
     34. } else {
     35. hilog.info(0x0000, 'testTag',
     36. 'The current device does not support the invoking of the getMinorsProtectionInfo interface.');
     37. }
     ```

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. function dealGetMinorsInfoAllError(error: BusinessError<Object>): void {
     2. hilog.error(0x0000, 'testTag', `Failed to getMinorsProtectionInfo. Code: ${error.code}, message: ${error.message}`);
     3. }
     ```