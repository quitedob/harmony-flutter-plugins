## 实现原理

在设置的“语言和地区”中可以添加多种语言，多种语言形成的列表称为语言列表，列表中的第一个语言称为系统语言。系统区域是依据区域ID划分的特定地区。

设置/切换系统语言时，系统会检查[扩展参数](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/i18n-locale-culture)与系统语言是否匹配，若不匹配，则删除扩展参数。例如，当前系统语言设置为阿拉伯语“ar”时，使用本地数字为“arab”。当系统语言切换为马来西亚语“my”时，本地数字参数更改为马来西亚的本地数字“mymr”。当切换为中文时，因中文不支持设置本地数字，采用阿拉伯数字，因此本地数字的扩展参数会被移除。

从API version 21开始，开发者可以在开发者模式下通过[param工具](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/param-tool#获取系统参数的值)的“param get persist.global.language”命令获取系统语言。

## 开发步骤

接口具体使用方法和说明请参考[System](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-i18n#system9)的API接口文档。

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { i18n } from '@kit.LocalizationKit';
   2. import { BusinessError, commonEventManager } from '@kit.BasicServicesKit';
   ```

   [LanguagePreferenceSetting.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/International/Internationalization/entry/src/main/ets/i18napplication/LanguagePreferenceSetting.ets#L18-L21)
2. 使用场景。

* 获取系统语言、系统地区、系统区域。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 获取系统语言
  2. let systemLanguage = i18n.System.getSystemLanguage();  // systemLanguage为当前系统语言

  4. // 获取系统地区
  5. let systemRegion = i18n.System.getSystemRegion();  // systemRegion为当前系统地区

  7. // 获取系统区域
  8. let systemLocale: Intl.Locale = i18n.System.getSystemLocaleInstance();  // systemLocale为当前系统区域

  10. // 通过监听公共事件COMMON_EVENT_LOCALE_CHANGED可以感知系统语言、系统地区或系统区域变化
  11. let subscriber: commonEventManager.CommonEventSubscriber; // 用于保存创建成功的订阅者对象，后续使用其完成订阅及退订的动作
  12. let subscribeInfo: commonEventManager.CommonEventSubscribeInfo = {
  13. events: [commonEventManager.Support.COMMON_EVENT_LOCALE_CHANGED]
  14. };
  15. // 创建订阅者
  16. commonEventManager.createSubscriber(subscribeInfo)
  17. .then((commonEventSubscriber: commonEventManager.CommonEventSubscriber) => {
  18. console.info('CreateSubscriber');
  19. subscriber = commonEventSubscriber;
  20. commonEventManager.subscribe(subscriber, (err, data) => {
  21. if (err) {
  22. console.error(`Failed to subscribe common event. error code: ${err.code}, message: ${err.message}.`);
  23. return;
  24. }
  25. console.info('The subscribed event has occurred.'); // 系统语言、系统地区或系统区域变化时执行
  26. })
  27. })
  28. .catch((err: BusinessError) => {
  29. console.error(`CreateSubscriber failed, code is ${err.code}, message is ${err.message}`);
  30. });
  ```

  [LanguagePreferenceSetting.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/International/Internationalization/entry/src/main/ets/i18napplication/LanguagePreferenceSetting.ets#L23-L54)