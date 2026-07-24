utd类型指分享数据的数据类型，精准的数据类型有助于帮助宿主应用匹配到精确的目标应用，让分享内容更好的传递。

当构造分享数据时，推荐宿主应用填写精准的utd类型，可通过以下两种方式获取：

* 根据给定的文件后缀名和所归属的标准化数据类型查询标准化数据类型的ID。参见：[uniformTypeDescriptor.getUniformDataTypeByFilenameExtension](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-data-uniformtypedescriptor#uniformtypedescriptorgetuniformdatatypebyfilenameextension11)。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { common } from '@kit.AbilityKit';
  2. import { BusinessError } from '@kit.BasicServicesKit';
  3. import { uniformTypeDescriptor as utd } from '@kit.ArkData';
  4. import { systemShare } from '@kit.ShareKit';

  6. try {
  7. let utdTypeId = utd.getUniformDataTypeByFilenameExtension('.jpg', utd.UniformDataType.IMAGE);
  8. if (utdTypeId) {
  9. // 构造ShareData，需配置一条有效数据信息
  10. let shareData: systemShare.SharedData = new systemShare.SharedData({
  11. utd: utdTypeId,
  12. uri: 'file://.../xxx.jpg'
  13. });
  14. // 构建ShareController
  15. let controller: systemShare.ShareController = new systemShare.ShareController(shareData);
  16. // 获取UIAbility上下文对象
  17. let uiContext: UIContext = this.getUIContext();
  18. let context: common.UIAbilityContext = uiContext.getHostContext() as common.UIAbilityContext;
  19. // 进行分享面板显示
  20. controller.show(context, {
  21. previewMode: systemShare.SharePreviewMode.DEFAULT,
  22. selectionMode: systemShare.SelectionMode.SINGLE
  23. });
  24. }
  25. } catch (e) {
  26. let error: BusinessError = e as BusinessError;
  27. console.error(`Failed to getUniformDataTypeByFilenameExtension. Code: ${error.code}, message: ${error.message} `);
  28. }
  ```
* 根据给定的MIME类型和所归属的标准化数据类型查询标准化数据类型的ID。参见：[uniformTypeDescriptor.getUniformDataTypeByMIMEType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-data-uniformtypedescriptor#uniformtypedescriptorgetuniformdatatypebymimetype11)。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { common } from '@kit.AbilityKit';
  2. import { BusinessError } from '@kit.BasicServicesKit';
  3. import { uniformTypeDescriptor as utd } from '@kit.ArkData';
  4. import { systemShare } from '@kit.ShareKit';

  6. try {
  7. let utdTypeId = utd.getUniformDataTypeByMIMEType('image/jpeg', utd.UniformDataType.IMAGE);
  8. if (utdTypeId) {
  9. // 构造ShareData，需配置一条有效数据信息
  10. let shareData: systemShare.SharedData = new systemShare.SharedData({
  11. utd: utdTypeId,
  12. uri: 'file://.../xxx.jpg'
  13. });
  14. // 构建ShareController
  15. let controller: systemShare.ShareController = new systemShare.ShareController(shareData);
  16. // 获取UIAbility上下文对象
  17. let uiContext: UIContext = this.getUIContext();
  18. let context: common.UIAbilityContext = uiContext.getHostContext() as common.UIAbilityContext;
  19. // 进行分享面板显示
  20. controller.show(context, {
  21. previewMode: systemShare.SharePreviewMode.DEFAULT,
  22. selectionMode: systemShare.SelectionMode.SINGLE
  23. });
  24. }
  25. } catch (e) {
  26. let error: BusinessError = e as BusinessError;
  27. console.error(`Failed to getUniformDataTypeByMIMEType. Code: ${error.code}, message: ${error.message} `);
  28. }
  ```