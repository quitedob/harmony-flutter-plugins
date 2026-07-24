当应用需要根据设备的深、浅色模式变化动态切换主题时，开发者可通过UIAbility的onConfigurationUpdate回调判断模式的变化，然后设置模式对应的字体颜色及背景色。

## 接口说明

适配深、浅色主题主要涉及1个接口，具体介绍如下表所示。

展开

| 接口名 | 描述 |
| --- | --- |
| [setPageConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/reader-read-core#section6297758718)(pageConfig: ReaderSetting): void | 设置或者修改页面排版属性。 |

## 开发准备

在适配深、浅色主题之前，请先确保已经“[构建阅读器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/reader-read-page)”。

## 开发步骤

1. 监听UIAbility的onConfigurationUpdate回调，并通过应用级变量的状态管理[AppStorage](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-appstorage)保存当前colorMode值。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { Configuration, UIAbility } from '@kit.AbilityKit';

   3. export default class EntryAbility extends UIAbility {

   5. onConfigurationUpdate(newConfig: Configuration): void {
   6. AppStorage.setOrCreate('colorMode', newConfig.colorMode);
   7. }
   8. }
   ```
2. 阅读页通过[@StorageLink](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-appstorage#storagelink)装饰器监听colorMode字段的变化。如果颜色变化，则触发对应主题色的变更。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { ConfigurationConstant } from '@kit.AbilityKit';

   3. @StorageLink('colorMode') @Watch('colorModeChange') colorMode: ConfigurationConstant.ColorMode =
   4. ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET;

   6. /**
   7. * 系统深色模式变化，可以重新设置主题
   8. */
   9. colorModeChange() {
   10. if (this.colorMode === ConfigurationConstant.ColorMode.COLOR_MODE_DARK) {
   11. this.readerSetting.nightMode = true;
   12. this.readerSetting.fontColor = '#ffffff';
   13. this.readerSetting.themeColor = '#202224';
   14. } else {
   15. this.readerSetting.nightMode = false;
   16. this.readerSetting.fontColor = '#000000';
   17. this.readerSetting.themeColor = '#FFFFFF';
   18. }
   19. this.readerComponentController.setPageConfig(this.readerSetting);
   20. }
   ```