## 接口说明

**表1** 宿主应用发起分享接口功能介绍

展开

| 类名 | 接口名 | 描述 |
| --- | --- | --- |
| SharedData | [constructor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section12493192913448)(record: [SharedRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section20696483813)) | SharedData构造函数 |
| [addRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section11132201919101)(record: [SharedRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section20696483813)): void | 添加分享记录 |
| [getRecords](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section14943101911111)(): Array<[SharedRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section20696483813)> | 获取分享记录 |
| ShareController | [constructor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section1834181561418)(data: [SharedData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section816451553012)) | ShareController构造函数 |
| [show](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section3392161117158)(context: [common.UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext), options: [ShareControllerOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section107934816010)): Promise<void> | 显示分享面板 |
| [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section107214125161)(event: 'dismiss', callback: () => void): void | 注册分享面板关闭事件监听 |
| [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section774510361177)(event: 'dismiss', callback: () => void): void | 取消分享面板关闭事件监听 |

## 开发步骤

根据不同的分享场景，参考下表：

展开

| 分享场景 | 参考链接 |
| --- | --- |
| 分享App Linking直达应用 | [分享App Linking直达应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-utd-link#section195231314185618) |
| 分享图片 | [分享图片](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-utd-image) |
| 分享视频 | [分享视频](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-utd-video) |
| 分享普通链接直达浏览器 | [分享普通链接直达浏览器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-utd-link#section10921210165819) |
| 分享文本 | [分享文本](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-utd-text) |

**2in1设备可通过配置的方式决定分享面板的显示位置。**参考如下：

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { systemShare } from '@kit.ShareKit';
   3. import { uniformTypeDescriptor as utd } from '@kit.ArkData';
   ```
2. 构造分享数据，可添加多条分享记录。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 构造ShareData，需配置一条有效数据信息
   2. let data: systemShare.SharedData = new systemShare.SharedData({
   3. utd: utd.UniformDataType.PLAIN_TEXT,
   4. content: 'Hello HarmonyOS'
   5. });
   ```
3. 启动分享面板时，配置分享面板显示的位置信息或关联的组件ID，面板将以Popup形式展示。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 构建ShareController
   2. let controller: systemShare.ShareController = new systemShare.ShareController(data);
   3. // 获取UIAbility上下文对象
   4. let uiContext: UIContext = this.getUIContext();
   5. let context: common.UIAbilityContext = uiContext.getHostContext() as common.UIAbilityContext;
   6. // 注册分享面板关闭监听
   7. controller.on('dismiss', () => {
   8. console.info('Share panel closed');
   9. // 分享结束，可处理其他业务。
   10. });

   12. // 进行分享面板显示
   13. // 方法一：配置分享面板关联的控件ID
   14. controller.show(context, {
   15. anchor: 'shareButtonId'
   16. });
   17. // 方法二：配置分享面板显示的坐标
   18. controller.show(context, {
   19. anchor: {
   20. // 必选 相对锚点的窗体偏移值
   21. windowOffset: { x: 100, y: 100 },
   22. // 可选 组件的宽高 配置后会综合计算组件的大小
   23. size: { width: 0, height: 0 }
   24. }
   25. });
   ```