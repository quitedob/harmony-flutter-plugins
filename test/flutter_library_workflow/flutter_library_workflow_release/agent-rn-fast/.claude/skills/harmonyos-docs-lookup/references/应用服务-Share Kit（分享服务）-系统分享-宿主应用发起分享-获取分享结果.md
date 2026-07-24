## 场景介绍

从5.1.0(18)版本开始，支持宿主应用获取用户分享结果。

基于业务实现需要，开发者可统计用户使用分享功能时，将内容分享到了哪些渠道。渠道信息规则如下：

* 系统操作有固定名称。请参见：[ShareAbilityName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-system-share#section16531512163920)。
* 非系统操作采用'[bundleName]#[moduleName]#[abilityName]'格式拼接。

## 开发步骤

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
2. 构造分享数据。

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
3. 注册分享结果监听事件，并启动分享面板。

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
   6. // 注册分享结果事件监听
   7. controller.on('shareCompleted', (result: systemShare.ShareOperationResult) => {
   8. console.info('shareCompleted name:', result.targetAbilityInfo.name);
   9. // 可根据分享渠道进行数据统计等操作
   10. });

   12. // 进行分享面板显示
   13. controller.show(context, {
   14. previewMode: systemShare.SharePreviewMode.DEFAULT,
   15. selectionMode: systemShare.SelectionMode.SINGLE
   16. });
   ```