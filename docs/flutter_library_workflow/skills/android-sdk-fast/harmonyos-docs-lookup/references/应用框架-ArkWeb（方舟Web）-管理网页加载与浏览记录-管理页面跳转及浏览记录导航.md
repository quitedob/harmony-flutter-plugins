为了提高页面访问速度，浏览记录导航允许用户通过“前进”和“后退”按钮在历史记录的页面之间切换。Web组件支持用户跳转到应用内其他页面或者进行跨应用跳转。

## 历史记录导航

在前端页面点击网页中的链接时，Web组件默认会自动打开并加载目标网址。当前端页面替换为新的加载链接时，会自动记录已经访问的网页地址。可以通过[forward()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#forward)和[backward()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#backward)接口向前/向后浏览上一个/下一个历史记录。

页面加载涉及网络资源时，需在module.json5中配置网络访问权限，添加方法请参考[在配置文件中声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions#在配置文件中声明权限)。

收起

自动换行

深色代码主题

复制

```
1. "requestPermissions":[
2. {
3. "name" : "ohos.permission.INTERNET"
4. }
5. ]
```

在以下示例中，通过点击应用按钮来触发前端页面的后退操作。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct WebComponent {
4. webviewController: webview.WebviewController = new webview.WebviewController();

6. build() {
7. Column() {
8. Button('loadData')
9. .onClick(() => {
10. if (this.webviewController.accessBackward()) {
11. this.webviewController.backward();
12. }
13. })
14. Web({ src: 'https://www.example.com/cn/', controller: this.webviewController });
15. }
16. }
17. }
```

[HistoryNavigati.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ManageWebPageLoadBrowse/ManagePageRedirectNav/entry/src/main/ets/pages/HistoryNavigati.ets#L18-L36)

如果存在历史记录，[accessBackward()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#accessbackward)接口将返回true。同样，开发者可以使用[accessForward()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#accessforward)接口检查是否存在前进的历史记录。如果未执行检查，当用户浏览到历史记录的末尾时，调用[forward()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#forward)和[backward()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#backward)接口将不会执行任何操作。

## 页面跳转

当点击页面中的链接需要跳转到应用内其他页面时，可以通过使用Web组件的[onLoadIntercept()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-events#onloadintercept10)接口来实现。

在下面的示例中，应用首页Index.ets加载前端页面route.html，在route.html页面点击“个人中心”超链接，可跳转到应用的ProfilePage.ets页面。

* 应用首页Index.ets页面代码。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { webview } from '@kit.ArkWeb';
  2. import { router } from '@kit.ArkUI';

  4. @Entry
  5. @Component
  6. struct WebComponent {
  7. webviewController: webview.WebviewController = new webview.WebviewController();

  9. build() {
  10. Column() {
  11. // 资源文件route.html存放路径src/main/resources/rawfile
  12. Web({ src: $rawfile('route.html'), controller: this.webviewController })
  13. .onLoadIntercept((event) => {
  14. if (event) {
  15. let url: string = event.data.getRequestUrl();
  16. if (url.indexOf('native://') === 0) {
  17. // 跳转其他界面
  18. this.getUIContext().getRouter().pushUrl({ url: url.substring(9) });
  19. return true;
  20. }
  21. }
  22. return false;
  23. })
  24. }
  25. }
  26. }
  ```

  [PageRedirection.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ManageWebPageLoadBrowse/ManagePageRedirectNav/entry/src/main/ets/pages/PageRedirection.ets#L16-L43)
* route.html前端页面代码。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. <!-- route.html -->
  2. <!DOCTYPE html>
  3. <html>
  4. <body>
  5. <div>
  6. <a href="native://pages/ProfilePage">个人中心</a>
  7. </div>
  8. </body>
  9. </html>
  ```
* 跳转页面ProfilePage.ets代码。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. struct ProfilePage {
  4. @State message: string = 'Hello World';

  6. build() {
  7. Column() {
  8. Text(this.message)
  9. .fontSize(20)
  10. }
  11. }
  12. }
  ```

  [ProfilePage.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ManageWebPageLoadBrowse/ManagePageRedirectNav/entry/src/main/ets/pages/ProfilePage.ets#L15-L28)

## 跨应用跳转

Web组件可以实现点击前端页面超链接跳转到其他应用。

在下面的示例代码中，点击call.html前端页面中的超链接，可以跳转到电话应用的拨号界面。

* 应用侧代码。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { webview } from '@kit.ArkWeb';
  2. import { call } from '@kit.TelephonyKit';

  4. @Entry
  5. @Component
  6. struct WebComponent {
  7. webviewController: webview.WebviewController = new webview.WebviewController();

  9. build() {
  10. Column() {
  11. Web({ src: $rawfile('call.html'), controller: this.webviewController })
  12. .onLoadIntercept((event) => {
  13. if (event) {
  14. let url: string = event.data.getRequestUrl();
  15. // 判断链接是否为拨号链接
  16. if (url.indexOf('tel://') === 0) {
  17. // 跳转拨号界面
  18. call.makeCall(url.substring(6), (err) => {
  19. if (!err) {
  20. console.info('make call succeeded.');
  21. } else {
  22. console.info('make call fail, err is:' + JSON.stringify(err));
  23. }
  24. });
  25. return true;
  26. }
  27. }
  28. return false;
  29. })
  30. }
  31. }
  32. }
  ```

  [CrossApplicationRedirection.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ManageWebPageLoadBrowse/ManagePageRedirectNav/entry/src/main/ets/pages/CrossApplicationRedirection.ets#L16-L49)
* 前端页面call.html代码。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. <!-- call.html -->
  2. <!DOCTYPE html>
  3. <html>
  4. <body>
  5. <div>
  6. <a href="tel://***********">拨打电话</a>
  7. </div>
  8. </body>
  9. </html>
  ```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/66/v3/EkRg2wFtQNKxRpVSoTz43g/zh-cn_image_0000002540771508.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040855Z&HW-CC-Expire=86400&HW-CC-Sign=5D362B12426B55BCD8D19B8F1D5A900F18DA6995AB8C4EBFD2BBEE54FCA21679)