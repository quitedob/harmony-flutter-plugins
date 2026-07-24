提供具有网页显示能力的Web组件，Web控制能力请参考[模块描述](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview)。

元服务中使用ArkWeb的说明，请参考[Web组件概述](https://developer.huawei.com/consumer/cn/doc/atomic-guides/atomicserviceweb-guidelines)。

说明

* 该组件首批接口从API version 8开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。
* 示例效果请以真机运行为准。
* 在移动设备上，当应用的Web实例数量超过10个时，系统会主动回收后台页面数据。

该模块提供以下Web组件网页显示相关的常用功能：

* [ClientAuthenticationHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/s-basic-components-web-clientauthenticationhandler)：客户端证书请求事件。
* [ConsoleMessage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-consolemessage)：控制台信息。
* [ControllerHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-controllerhandler)：新建Web组件的WebviewController对象。
* [DataResubmissionHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-dataresubmissionhandler)：表单数据操作对象。
* [EventResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-eventresult)：同层事件消费结果。
* [FileSelectorParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-fileselectorparam)：Web组件获取文件对象。
* [FileSelectorResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-fileselectorresult)：Web组件文件选择结果。
* [FullScreenExitHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-fullscreenexithandler)：Web组件退出全屏的操作对象。
* [HttpAuthHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-httpauthhandler)：HttpAuth认证请求相关操作功能对象。
* [JsGeolocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-jsgeolocation)：地理位置信息权限功能。
* [JsResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-jsresult)：弹窗操作。
* [PermissionRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-permissionrequest)：权限请求。
* [ScreenCaptureHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-screencapturehandler)：屏幕捕获相关权限操作。
* [SslErrorHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-sslerrorhandler)：SSL错误事件操作功能。
* [WebContextMenuParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-webcontextmenuparam)：长按或鼠标右键弹出菜单信息。
* [WebContextMenuResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-webcontextmenuresult)：控制长按或鼠标右键弹出菜单。
* [WebCookie](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-webcookie)：当前应用中Web组件的Cookie管理操作。
* [WebKeyboardController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-webkeyboardcontroller)：控制自定义键盘。
* [WebResourceError](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-webresourceerror)：资源管理错误。
* [WebResourceRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-webresourcerequest)：资源获取请求。
* [WebResourceResponse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-webresourceresponse)：资源获取响应。

## 需要权限

PhonePC/2in1TabletTVWearable

访问在线网页时需添加网络权限：ohos.permission.INTERNET，具体申请方式请参考[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)。

## 子组件

PhonePC/2in1TabletTVWearable

无

## 接口

PhonePC/2in1TabletTVWearable

Web(value: WebOptions)

说明

不支持转场动画。

为了保证各Web组件间的独立性和性能隔离，同一页面内的多个Web组件应分别绑定不同的WebviewController实例。

**系统能力：** SystemCapability.Web.Webview.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [WebOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-i#weboptions) | 是 | Web组件的初始化配置选项，用于设置加载的网页资源（src）、绑定的控制器（controller）以及渲染模式等行为参数。具体属性结构请参考WebOptions接口定义。 |

**示例：**

加载在线网页。



```
1. // xxx.ets
2. import { webview } from '@kit.ArkWeb';

4. @Entry
5. @Component
6. struct WebComponent {
7. controller: webview.WebviewController = new webview.WebviewController();

9. build() {
10. Column() {
11. Web({ src: 'www.example.com', controller: this.controller })
12. }
13. }
14. }
```

隐私模式WebView加载在线网页。



```
1. // xxx.ets
2. import { webview } from '@kit.ArkWeb';

4. @Entry
5. @Component
6. struct WebComponent {
7. controller: webview.WebviewController = new webview.WebviewController();

9. build() {
10. Column() {
11. Web({ src: 'www.example.com', controller: this.controller, incognitoMode: true })
12. }
13. }
14. }
```

Web组件同步渲染模式。



```
1. // xxx.ets
2. import { webview } from '@kit.ArkWeb';

4. @Entry
5. @Component
6. struct WebComponent {
7. controller: webview.WebviewController = new webview.WebviewController();

9. build() {
10. Column() {
11. Web({ src: 'www.example.com', controller: this.controller, renderMode: RenderMode.SYNC_RENDER })
12. }
13. }
14. }
```

Web组件指定共享渲染进程。



```
1. // xxx.ets
2. import { webview } from '@kit.ArkWeb';

4. @Entry
5. @Component
6. struct WebComponent {
7. controller1: webview.WebviewController = new webview.WebviewController();
8. controller2: webview.WebviewController = new webview.WebviewController();

10. build() {
11. Column() {
12. Web({ src: 'www.example.com', controller: this.controller1, sharedRenderProcessToken: "111" })
13. Web({ src: 'www.w3.org', controller: this.controller2, sharedRenderProcessToken: "111" })
14. }
15. }
16. }
```

指定Web组件是否将鼠标事件作为触摸事件处理。



```
1. // xxx.ets
2. import { webview } from '@kit.ArkWeb';

4. @Entry
5. @Component
6. struct WebComponent {
7. controller1: webview.WebviewController = new webview.WebviewController();
8. controller2: webview.WebviewController = new webview.WebviewController();

10. build() {
11. Column() {
12. Web({ src: 'www.example.com', controller: this.controller1, emulateTouchFromMouseEvent: false })
13. Web({ src: 'www.w3.org', controller: this.controller2, emulateTouchFromMouseEvent: true })
14. }
15. }
16. }
```

加载本地网页。

通过$rawfile方式加载。



```
1. // xxx.ets
2. import { webview } from '@kit.ArkWeb';

4. @Entry
5. @Component
6. struct WebComponent {
7. controller: webview.WebviewController = new webview.WebviewController();

9. build() {
10. Column() {
11. // 通过$rawfile加载本地资源文件。
12. Web({ src: $rawfile("index.html"), controller: this.controller })
13. }
14. }
15. }
```

通过resources协议加载。

使用 resource://rawfile/ 协议前缀可以避免常规 $rawfile 方式在处理带有“#”路由链接时的局限性。当URL中包含“#”号时，“#”后面的内容会被视为锚点（fragment）。



```
1. // xxx.ets
2. import { webview } from '@kit.ArkWeb';

4. @Entry
5. @Component
6. struct WebComponent {
7. controller: webview.WebviewController = new webview.WebviewController();

9. build() {
10. Column() {
11. // 通过resource协议加载本地资源文件。
12. Web({ src: "resource://rawfile/index.html#home", controller: this.controller })
13. }
14. }
15. }
```

在“src\main\resources\rawfile”文件夹下创建index.html：



```
1. <!-- index.html -->
2. <!DOCTYPE html>
3. <html>
4. <body>
5. <div id="content"></div>

7. <script>
8. function loadContent() {
9. var hash = window.location.hash;
10. var contentDiv = document.getElementById('content');

12. if (hash === '#home') {
13. contentDiv.innerHTML = '<h1>Home Page</h1><p>Welcome to the Home Page!</p>';
14. } else {
15. contentDiv.innerHTML = '<h1>Default Page</h1><p>This is the default content.</p>';
16. }
17. }

19. // 加载界面
20. window.addEventListener('load', loadContent);

22. // 当hash变化时，更新界面
23. window.addEventListener('hashchange', loadContent);
24. </script>
25. </body>
26. </html>
```

加载沙箱路径下的本地资源文件，需要开启应用中文件系统的访问[fileAccess](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-attributes#fileaccess)权限。

1. 通过构造的单例对象GlobalContext获取沙箱路径。

   

   ```
   1. // GlobalContext.ets
   2. export class GlobalContext {
   3. private constructor() {}
   4. private static instance: GlobalContext;
   5. private _objects = new Map<string, Object>();

   7. public static getContext(): GlobalContext {
   8. if (!GlobalContext.instance) {
   9. GlobalContext.instance = new GlobalContext();
   10. }
   11. return GlobalContext.instance;
   12. }

   14. getObject(value: string): Object | undefined {
   15. return this._objects.get(value);
   16. }

   18. setObject(key: string, objectClass: Object): void {
   19. this._objects.set(key, objectClass);
   20. }
   21. }
   ```

   

   ```
   1. // xxx.ets
   2. import { webview } from '@kit.ArkWeb';
   3. import { GlobalContext } from '../GlobalContext';

   5. let url = 'file://' + GlobalContext.getContext().getObject("filesDir") + '/index.html';

   7. @Entry
   8. @Component
   9. struct WebComponent {
   10. controller: webview.WebviewController = new webview.WebviewController();

   12. build() {
   13. Column() {
   14. // 加载沙箱路径文件。
   15. Web({ src: url, controller: this.controller })
   16. .fileAccess(true)
   17. }
   18. }
   19. }
   ```
2. 修改EntryAbility.ets。

   以filesDir为例，获取沙箱路径。若想获取其他路径，请参考[应用文件路径](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-context-stage#获取应用文件路径)。

   

   ```
   1. // xxx.ets
   2. import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
   3. import { webview } from '@kit.ArkWeb';
   4. import { GlobalContext } from '../GlobalContext';

   6. export default class EntryAbility extends UIAbility {
   7. onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
   8. // 通过在GlobalContext对象上绑定filesDir，可以实现UIAbility组件与UI之间的数据同步。
   9. GlobalContext.getContext().setObject("filesDir", this.context.filesDir);
   10. console.info("Sandbox path is " + GlobalContext.getContext().getObject("filesDir"));
   11. }
   12. }
   ```

   加载的html文件。

   

   ```
   1. <!-- index.html -->
   2. <!DOCTYPE html>
   3. <html>
   4. <body>
   5. <p>Hello World</p>
   6. </body>
   7. </html>
   ```