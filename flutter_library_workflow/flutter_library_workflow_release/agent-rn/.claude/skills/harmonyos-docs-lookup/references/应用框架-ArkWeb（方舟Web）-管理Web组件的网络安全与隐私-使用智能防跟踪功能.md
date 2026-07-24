Web组件支持智能防跟踪功能，即当跟踪型网站作为第三方插入到其他网页时，其发送的网络请求将禁止携带cookie。

* 通过调用[enableIntelligentTrackingPrevention](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#enableintelligenttrackingprevention12)接口启用或关闭Web组件的智能防跟踪功能。默认情况下，该功能未启用。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { webview } from '@kit.ArkWeb';
  2. import { BusinessError } from '@kit.BasicServicesKit';

  4. @Entry
  5. @Component
  6. struct WebComponent {
  7. controller: webview.WebviewController = new webview.WebviewController();

  9. build() {
  10. Column() {
  11. Button('enableIntelligentTrackingPrevention')
  12. .onClick(() => {
  13. try {
  14. this.controller.enableIntelligentTrackingPrevention(true);
  15. console.info('enableIntelligentTrackingPrevention: true');
  16. } catch (error) {
  17. console.error(
  18. `ErrorCode: ${(error as BusinessError).code},  Message: ${(error as BusinessError).message}`);
  19. }
  20. })
  21. Web({ src: 'www.example.com', controller: this.controller });
  22. }
  23. }
  24. }
  ```

  [EnableIntTrackPrevent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ManageWebCompSecPriv/entry/src/main/ets/pages/EnableIntTrackPrevent.ets#L16-L41)
* 调用[isIntelligentTrackingPreventionEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#isintelligenttrackingpreventionenabled12)接口，判断Web组件是否开启了智能防跟踪功能。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { webview } from '@kit.ArkWeb';
  2. import { BusinessError } from '@kit.BasicServicesKit';

  4. @Entry
  5. @Component
  6. struct WebComponent {
  7. controller: webview.WebviewController = new webview.WebviewController();

  9. build() {
  10. Column() {
  11. Button('isIntelligentTrackingPreventionEnabled')
  12. .onClick(() => {
  13. try {
  14. let result = this.controller.isIntelligentTrackingPreventionEnabled();
  15. console.info('result: ' + result);
  16. } catch (error) {
  17. console.error(
  18. `ErrorCode: ${(error as BusinessError).code},  Message: ${(error as BusinessError).message}`);
  19. }
  20. })
  21. Web({ src: 'www.example.com', controller: this.controller });
  22. }
  23. }
  24. }
  ```

  [IsIntTrackPreventEnabled.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ManageWebCompSecPriv/entry/src/main/ets/pages/IsIntTrackPreventEnabled.ets#L16-L41)
* 通过[onIntelligentTrackingPreventionResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-events#onintelligenttrackingpreventionresult12)接口将被拦截的跟踪型域名及其触发网站的域名回调给应用。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { webview } from '@kit.ArkWeb';
  2. import { BusinessError } from '@kit.BasicServicesKit';

  4. @Entry
  5. @Component
  6. struct WebComponent {
  7. controller: webview.WebviewController = new webview.WebviewController();

  9. build() {
  10. Column() {
  11. // 需要打开智能防跟踪功能，才会触发onIntelligentTrackingPreventionResult回调
  12. Button('enableIntelligentTrackingPrevention')
  13. .onClick(() => {
  14. try {
  15. this.controller.enableIntelligentTrackingPrevention(true);
  16. } catch (error) {
  17. console.error(
  18. `ErrorCode: ${(error as BusinessError).code}, Message: ${(error as BusinessError).message}`);
  19. }
  20. })
  21. Web({ src: 'www.example.com', controller: this.controller })
  22. .onIntelligentTrackingPreventionResult((details) => {
  23. console.info('onIntelligentTrackingPreventionResult: [websiteHost]= ' + details.host +
  24. ', [trackerHost]=' + details.trackerHost);
  25. })
  26. }
  27. }
  28. }
  ```

  [OnIntTrackPreventResult.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ManageWebCompSecPriv/entry/src/main/ets/pages/OnIntTrackPreventResult.ets#L16-L45)

智能防跟踪功能提供了一组接口，用于设置绕过该功能的域名列表。这些接口设置的域名列表适用于整个应用，而非特定的Web组件。

* 调用[addIntelligentTrackingPreventionBypassingList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#addintelligenttrackingpreventionbypassinglist12)接口设置绕过域名列表。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { webview } from '@kit.ArkWeb';
  2. import { BusinessError } from '@kit.BasicServicesKit';

  4. @Entry
  5. @Component
  6. struct WebComponent {
  7. controller: webview.WebviewController = new webview.WebviewController();

  9. build() {
  10. Column() {
  11. Button('addIntelligentTrackingPreventionBypassingList')
  12. .onClick(() => {
  13. try {
  14. let hostList = ['www.test1.com', 'www.test2.com', 'www.test3.com'];
  15. webview.WebviewController.addIntelligentTrackingPreventionBypassingList(hostList);
  16. } catch (error) {
  17. console.error(
  18. `ErrorCode: ${(error as BusinessError).code},  Message: ${(error as BusinessError).message}`);
  19. }
  20. })
  21. Web({ src: 'www.example.com', controller: this.controller });
  22. }
  23. }
  24. }
  ```

  [AddIntTrackPreventByPassList.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ManageWebCompSecPriv/entry/src/main/ets/pages/AddIntTrackPreventByPassList.ets#L15-L40)
* 调用[removeIntelligentTrackingPreventionBypassingList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#removeintelligenttrackingpreventionbypassinglist12)接口删除部分绕过域名列表。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { webview } from '@kit.ArkWeb';
  2. import { BusinessError } from '@kit.BasicServicesKit';

  4. @Entry
  5. @Component
  6. struct WebComponent {
  7. controller: webview.WebviewController = new webview.WebviewController();

  9. build() {
  10. Column() {
  11. Button('removeIntelligentTrackingPreventionBypassingList')
  12. .onClick(() => {
  13. try {
  14. let hostList = [ 'www.test1.com', 'www.test2.com' ];
  15. webview.WebviewController.removeIntelligentTrackingPreventionBypassingList(hostList);
  16. } catch (error) {
  17. console.error(
  18. `ErrorCode: ${(error as BusinessError).code},  Message: ${(error as BusinessError).message}`);
  19. }
  20. })
  21. Web({ src: 'www.example.com', controller: this.controller })
  22. }
  23. }
  24. }
  ```

  [RemoveIntTrackPreventByPassList.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ManageWebCompSecPriv/entry/src/main/ets/pages/RemoveIntTrackPreventByPassList.ets#L15-L40)
* 调用[clearIntelligentTrackingPreventionBypassingList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#clearintelligenttrackingpreventionbypassinglist12)接口清除所有绕过域名列表。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { webview } from '@kit.ArkWeb';

  3. @Entry
  4. @Component
  5. struct WebComponent {
  6. controller: webview.WebviewController = new webview.WebviewController();

  8. build() {
  9. Column() {
  10. Button('clearIntelligentTrackingPreventionBypassingList')
  11. .onClick(() => {
  12. webview.WebviewController.clearIntelligentTrackingPreventionBypassingList();
  13. })
  14. Web({ src: 'www.example.com', controller: this.controller })
  15. }
  16. }
  17. }
  ```

  [ClearIntTrackPreventByPassList.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ManageWebCompSecPriv/entry/src/main/ets/pages/ClearIntTrackPreventByPassList.ets#L15-L33)