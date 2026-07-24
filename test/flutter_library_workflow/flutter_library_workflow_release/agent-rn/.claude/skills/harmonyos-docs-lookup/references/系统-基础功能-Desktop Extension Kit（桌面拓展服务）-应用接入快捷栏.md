从6.0.2(22)开始，支持应用接入快捷栏。

## 场景介绍

快捷栏指的是PC/2in1设备的屏幕底部的图标区域，具体如下图。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a7/v3/sJ_0pJoERzmSZ6ZNL1yX4A/zh-cn_image_0000002502219756.png?HW-CC-KV=V1&HW-CC-Date=20260414T045457Z&HW-CC-Expire=86400&HW-CC-Sign=83512615932D68BFD19F1F3C420F0624C1B3C8D3F2039C3CE5BD4473C516DB06 "点击放大")

应用接入快捷栏之后，快捷栏的应用图标菜单会显示应用自定义的菜单项，应用可以添加、删除、更新、查询菜单项，具体效果如下图。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e5/v3/yR8HYTclRseuCs9FH7GXGQ/zh-cn_image_0000002502220322.png?HW-CC-KV=V1&HW-CC-Date=20260414T045457Z&HW-CC-Expire=86400&HW-CC-Sign=FBFE80CF8D06185608599D3DA431E648D1FC0344DE008FE00C9B82775B22B48F)

## 接口说明

以下列出应用接入快捷栏菜单的相关API，具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager)。

说明

DeskTop Extension Kit相关API仅在2in1设备上生效。

**表1** 应用接入快捷栏菜单相关功能接口介绍

展开

| 接口名 | 描述 |
| --- | --- |
| [getCustomCategories](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section161446211272)(context: common.Context): Promise<CustomCategory[]> | 获取所有在快捷栏菜单定义的分组。 |
| [addCustomCategory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section665018220561)(context: common.Context, categoryName: string): Promise<CustomCategory> | 添加快捷栏菜单分组。 |
| [updateCustomCategory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section1623472312366)(context: common.Context, category: CustomCategory): Promise<void> | 更新快捷栏菜单分组。 |
| [deleteCustomCategory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section11581123516468)(context: common.Context, categoryId: number): Promise<void> | 删除快捷栏菜单分组。 |
| [getTasksFromCategory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section103873266327)(context: common.Context, categoryId: number): Promise<QuickTask[]> | 获取某个快捷栏菜单的分组下的所有任务。 |
| [addQuickTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section13991750101114)(context: common.Context, categoryId: number, taskInfo: QuickTaskInfo): Promise<QuickTask> | 添加快捷栏菜单任务。 |
| [updateQuickTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section1427319917408)(context: common.Context, task: QuickTask): Promise<void> | 更新快捷栏菜单任务。 |
| [deleteQuickTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section1259314566431)(context: common.Context, taskId: number): Promise<void> | 删除快捷栏菜单任务。 |

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { quickBarManager }  from '@kit.DeskTopExtensionKit';
   2. import { UIExtensionContentSession, Want, UIAbility } from '@kit.AbilityKit';
   3. import { image } from '@kit.ImageKit';
   4. import { resourceManager } from '@kit.LocalizationKit';
   ```
2. 新建一个TestAbility.ets文件（例如在entry/src/main/ets/entryability文件夹下），同时新建一个TestIndex的页面（例如在entry/src/main/ets/pages目录下），点击图标菜单任务后可跳转到该页面。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let TAG = 'TestAbility';
   2. export default class TestAbility extends UIAbility {
   3. onCreate() {
   4. console.info(TAG, `onCreate`);
   5. }

   7. onSessionCreate(want: Want, session: UIExtensionContentSession) {
   8. console.info(TAG, `onSessionCreate, want: ${want.abilityName}`);
   9. // pages/TestIndex为点击菜单任务拉起的页面
   10. session.loadContent('pages/TestIndex');
   11. }

   13. onForeground() {
   14. console.info(TAG, `onForeground`);
   15. }

   17. onBackground() {
   18. console.info(TAG, `onBackground`);
   19. }

   21. onSessionDestroy(session: UIExtensionContentSession) {
   22. console.info(TAG, `onSessionDestroy`);
   23. }

   25. onDestroy() {
   26. console.info(TAG, `onDestroy`);
   27. }
   28. }
   ```
3. 在TestAbility所在模块下的module.json5文件中配置的Ability的信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "name": "TestAbility",
   3. "srcEntry": "./ets/entryability/TestAbility.ets",
   4. "description": "$string:EntryAbility_desc",
   5. "icon": "$media:layered_image",
   6. "label": "$string:EntryAbility_label",
   7. "startWindowIcon": "$media:startIcon",
   8. "startWindowBackground": "$color:start_window_background",
   9. "exported": true,
   10. "skills": [
   11. {
   12. "entities": [
   13. "entity.system.home"
   14. ],
   15. "actions": [
   16. "action.system.home"
   17. ]
   18. }
   19. ],
   20. }
   ```
4. 在页面组件内(如：TestIndex.ets)中调用接口完成如下步骤。调用[addCustomCategory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section665018220561)接口添加一个快捷栏菜单分组，添加分组后才可以往分组里添加任务。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let context: Context | undefined = this.getUIContext().getHostContext();
   2. if (context === undefined) {
   3. return;
   4. }
   5. try {
   6. const res = await quickBarManager.addCustomCategory(context, '最近任务');
   7. console.info(`customCategory info: ${JSON.stringify(res)}`);
   8. } catch (error) {
   9. console.error(`addCustomCategory failed. error code: ${error.code}, error message: ${error.message}`);
   10. }
   ```
5. 添加分组后可以调用[addQuickTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section13991750101114)接口在分组中添加快捷栏菜单任务。打开应用图标在快捷栏的右键菜单，即可看到添加后对应的菜单项。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let context: Context | undefined = this.getUIContext().getHostContext();
   2. if (context === undefined) {
   3. return;
   4. }
   5. // 获取resourceManager资源管理器
   6. const resourceMgr: resourceManager.ResourceManager = context.resourceManager;
   7. // 创建任务的pixelMap，需在资源rawfile文件夹中预置testImage.png图片
   8. const fileData = resourceMgr.getRawFileContentSync('testImage.png');
   9. const imageSource = image.createImageSource(fileData.buffer);
   10. const imagePixelMap = await imageSource.createPixelMap();
   11. let parameters: quickBarManager.ParameterItem = {
   12. key: 'testKey',
   13. value: 'testValue'
   14. }
   15. // 构建task任务信息
   16. const task: quickBarManager.QuickTaskInfo = {
   17. taskName: '测试任务名称',
   18. abilityName: 'TestAbility',
   19. // 参数可选
   20. moduleName: 'entry',
   21. // 参数可选
   22. taskIcon: imagePixelMap,
   23. // 参数可选
   24. taskDetail: '任务的描述',
   25. // 参数可选
   26. parameters: [parameters]
   27. }

   29. try {
   30. // 获取所有的分组信息，将任务添加到想要的分组中
   31. const categoryList = await quickBarManager.getCustomCategories(context);
   32. // 选择添加任务到第一个分组中
   33. const res = await quickBarManager.addQuickTask(context, categoryList[0].categoryId, task);
   34. console.info(`quickTask info: ${JSON.stringify(res)}`);
   35. } catch (error) {
   36. console.error(`addQuickTask failed. error code: ${error.code}, error message: ${error.message}`);
   37. }
   ```
6. 调用[getCustomCategories](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section161446211272)接口获取定义所有分组信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let context: Context | undefined = this.getUIContext().getHostContext();
   2. if (context === undefined) {
   3. return;
   4. }
   5. try {
   6. const res = await quickBarManager.getCustomCategories(context);
   7. console.info(`customCategoryList info: ${JSON.stringify(res)}`);
   8. } catch (error) {
   9. console.error(`getCustomCategories failed. error code: ${error.code}, error message: ${error.message}`);
   10. }
   ```
7. 调用[getTasksFromCategory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section103873266327)接口获取分组下的所有任务信息，此处获取了第一个分组下的所有任务。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let context: Context | undefined = this.getUIContext().getHostContext();
   2. if (context === undefined) {
   3. return;
   4. }
   5. try {
   6. // 获取所有的分组信息，用于获取分组下所有的任务
   7. const category = await quickBarManager.getCustomCategories(context);
   8. // 选择获取第一个分组下的所有任务
   9. const res = await quickBarManager.getTasksFromCategory(context, category[0].categoryId);
   10. console.info(`quickTaskList info: ${JSON.stringify(res)}`);
   11. } catch (error) {
   12. console.error(`getTasksFromCategory failed. error code: ${error.code}, error message: ${error.message}`);
   13. }
   ```
8. 调用[updateCustomCategory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section1623472312366)接口更新快捷栏菜单分组信息，此处更新了分组的名称。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let context: Context | undefined = this.getUIContext().getHostContext();
   2. if (context === undefined) {
   3. return;
   4. }
   5. const category: quickBarManager.CustomCategory = {
   6. categoryId: 1,
   7. categoryName: 'demo'
   8. }
   9. try {
   10. await quickBarManager.updateCustomCategory(context, category);
   11. } catch (error) {
   12. console.error(`updateCustomCategory failed. error code: ${error.code}, error message: ${error.message}`);
   13. }
   ```
9. 调用[updateQuickTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section1427319917408)接口更新快捷栏菜单任务信息，此处更新了任务的图标信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let context: Context | undefined = this.getUIContext().getHostContext();
   2. if (context === undefined) {
   3. return;
   4. }
   5. // 获取resourceManager资源管理器
   6. const resourceMgr: resourceManager.ResourceManager = context.resourceManager;
   7. // 创建任务的pixelMap，需在资源rawfile文件夹中预置testUpdateImage.png图片
   8. const fileData = resourceMgr.getRawFileContentSync('testUpdateImage.png');
   9. const imageSource = image.createImageSource(fileData.buffer);
   10. const imagePixelMap = await imageSource.createPixelMap();
   11. let parameters: quickBarManager.ParameterItem = {
   12. key: 'testKey',
   13. value: 'testValue'
   14. }
   15. // 构建task任务信息
   16. const taskInfo: quickBarManager.QuickTaskInfo = {
   17. taskName: '测试任务名称',
   18. abilityName: 'TestAbility',
   19. // 参数可选
   20. moduleName: 'entry',
   21. // 参数可选
   22. taskIcon: imagePixelMap,
   23. // 参数可选
   24. taskDetail: '任务的描述',
   25. // 参数可选
   26. parameters: [parameters]
   27. }

   29. const task: quickBarManager.QuickTask = {
   30. taskId: 1,
   31. categoryId: 1,
   32. taskInfo: taskInfo
   33. }

   35. try {
   36. await quickBarManager.updateQuickTask(context,task);
   37. } catch (error) {
   38. console.error(`updateQuickTask failed. error code: ${error.code}, error message: ${error.message}`);
   39. }
   ```
10. 调用[deleteQuickTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section1259314566431)接口删除不需要的快捷栏菜单任务，此处删除了taskId为1的任务。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. let context: Context | undefined = this.getUIContext().getHostContext();
    2. if (context === undefined) {
    3. return;
    4. }
    5. try {
    6. // 删除taskId为1的任务
    7. await quickBarManager.deleteQuickTask(context, 1);
    8. } catch (error) {
    9. console.error(`deleteQuickTask failed. error code: ${error.code}, error message: ${error.message}`);
    10. }
    ```
11. 调用[deleteCustomCategory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/desktop-quickbar-extension-manager#section11581123516468)接口删除不需要的快捷栏菜单分组，此处删除了categoryId为1的分组，它的所有任务也会被一起删除。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. let context: Context | undefined = this.getUIContext().getHostContext();
    2. if (context === undefined) {
    3. return;
    4. }
    5. try {
    6. // 删除categoryId为1的分组
    7. await quickBarManager.deleteCustomCategory(context, 1);
    8. } catch (error) {
    9. console.error(`deleteCustomCategory failed. error code: ${error.code}, error message: ${error.message}`);
    10. }
    ```