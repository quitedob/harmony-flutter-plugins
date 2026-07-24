Web组件支持在应用拦截到页面请求后自定义响应请求能力。开发者通过[onInterceptRequest()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-events#oninterceptrequest9)接口来实现自定义资源请求响应。自定义请求能力可以用于开发者自定义Web页面响应、自定义文件资源响应等场景。

Web网页上发起资源加载请求，应用层收到资源请求信息。应用层构造本地资源响应信息发送给Web内核。Web内核解析应用层响应信息，根据此响应信息进行页面资源加载。

在下面的示例中，Web组件通过拦截页面请求“https://www.example.com/test.html”，在应用侧代码构建响应资源，实现自定义页面响应场景。

* 前端页面index1.html代码。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. <!DOCTYPE html>
  2. <html>
  3. <head>
  4. <meta charset="utf-8">
  5. </head>
  6. <body>
  7. <!-- 页面资源请求 -->
  8. <a href="https://www.example.com/test.html">intercept test!</a>
  9. </body>
  10. </html>
  ```
* 应用侧代码。

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
  7. responseResource: WebResourceResponse = new WebResourceResponse();
  8. // 开发者自定义响应数据
  9. @State webData: string = '<!DOCTYPE html>\n' +
  10. '<html>\n' +
  11. '<head>\n' +
  12. '<title>intercept test</title>\n' +
  13. '</head>\n' +
  14. '<body>\n' +
  15. '<h1>intercept ok</h1>\n' +
  16. '</body>\n' +
  17. '</html>'

  19. build() {
  20. Column() {
  21. Web({ src: $rawfile('index1.html'), controller: this.controller })
  22. .onInterceptRequest((event) => {
  23. if (event) {
  24. console.info('url:' + event.request.getRequestUrl());
  25. // 拦截页面请求
  26. if (event.request.getRequestUrl() !== 'https://www.example.com/test.html') {
  27. return null;
  28. }
  29. }
  30. // 构造响应数据
  31. this.responseResource.setResponseData(this.webData);
  32. this.responseResource.setResponseEncoding('utf-8');
  33. this.responseResource.setResponseMimeType('text/html');
  34. this.responseResource.setResponseCode(200);
  35. this.responseResource.setReasonMessage('OK');
  36. return this.responseResource;
  37. })
  38. }
  39. }
  40. }
  ```

  [OnInterceptRequest\_one.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ManageWebPageLoadBrowse/CustomizePageResp/entry/src/main/ets/pages/OnInterceptRequest_one.ets#L15-L56)
* 被拦截后的页面

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7/v3/N6C3na4YR6GmkSDRxOUikw/zh-cn_image_0000002571291803.png?HW-CC-KV=V1&HW-CC-Date=20260414T040902Z&HW-CC-Expire=86400&HW-CC-Sign=DC1723F2118E04BAB36E832C43D053FB4C219FA34CEADEDF0D768A1AFDC1C8FD)

为自定义的JavaScript请求响应生成CodeCache：自定义请求响应的资源类型如果是JavaScript脚本，可以在响应头中添加“ResponseDataID”字段，Web内核读取到该字段后会为该JS资源生成CodeCache，加速JS执行，并且ResponseData如果有更新时必须更新该字段。不添加“ResponseDataID”字段的情况下默认不生成CodeCache。

在下面的示例中，Web组件通过拦截页面请求“https://www.example.com/test.js”，应用侧代码构建响应资源，在响应头中添加“ResponseDataID”字段，开启生成CodeCache的功能。

* 前端页面index2.html代码。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. <!DOCTYPE html>
  2. <html>
  3. <head>
  4. <meta charset="utf-8">
  5. </head>
  6. <body>

  8. <div id="div-1">this is a test div</div>
  9. <div id="div-2">this is a test div</div>
  10. <div id="div-3">this is a test div</div>
  11. <div id="div-4">this is a test div</div>
  12. <div id="div-5">this is a test div</div>
  13. <div id="div-6">this is a test div</div>
  14. <div id="div-7">this is a test div</div>
  15. <div id="div-8">this is a test div</div>
  16. <div id="div-9">this is a test div</div>
  17. <div id="div-10">this is a test div</div>
  18. <div id="div-11">this is a test div</div>

  20. <script src="https://www.example.com/test.js"></script>
  21. </body>
  22. </html>
  ```
* 应用侧代码。

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
  7. responseResource: WebResourceResponse = new WebResourceResponse();
  8. // 开发者自定义响应数据（响应数据长度需大于等于1024才会生成codecache）
  9. @State jsData: string = 'let text_msg = "the modified content:version 0000000000001";\n' +
  10. 'let element1 = window.document.getElementById("div-1");\n' +
  11. 'let element2 = window.document.getElementById("div-2");\n' +
  12. 'let element3 = window.document.getElementById("div-3");\n' +
  13. 'let element4 = window.document.getElementById("div-4");\n' +
  14. 'let element5 = window.document.getElementById("div-5");\n' +
  15. 'let element6 = window.document.getElementById("div-6");\n' +
  16. 'let element7 = window.document.getElementById("div-7");\n' +
  17. 'let element8 = window.document.getElementById("div-8");\n' +
  18. 'let element9 = window.document.getElementById("div-9");\n' +
  19. 'let element10 = window.document.getElementById("div-10");\n' +
  20. 'let element11 = window.document.getElementById("div-11");\n' +
  21. 'element1.innerHTML = text_msg;\n' +
  22. 'element2.innerHTML = text_msg;\n' +
  23. 'element3.innerHTML = text_msg;\n' +
  24. 'element4.innerHTML = text_msg;\n' +
  25. 'element5.innerHTML = text_msg;\n' +
  26. 'element6.innerHTML = text_msg;\n' +
  27. 'element7.innerHTML = text_msg;\n' +
  28. 'element8.innerHTML = text_msg;\n' +
  29. 'element9.innerHTML = text_msg;\n' +
  30. 'element10.innerHTML = text_msg;\n' +
  31. 'element11.innerHTML = text_msg;\n';
  32. build() {
  33. Column() {
  34. Web({ src: $rawfile('index2.html'), controller: this.controller })
  35. .onInterceptRequest((event) => {
  36. // 拦截页面请求
  37. if (event?.request.getRequestUrl() == 'https://www.example.com/test.js') {
  38. // 构造响应数据
  39. this.responseResource.setResponseHeader([
  40. {
  41. // 格式：不超过13位纯数字。js识别码，Js有更新时必须更新该字段
  42. headerKey: 'ResponseDataID',
  43. headerValue: '0000000000001'
  44. }]);
  45. this.responseResource.setResponseData(this.jsData);
  46. this.responseResource.setResponseEncoding('utf-8');
  47. this.responseResource.setResponseMimeType('application/javascript');
  48. this.responseResource.setResponseCode(200);
  49. this.responseResource.setReasonMessage('OK');
  50. return this.responseResource;
  51. }
  52. return null;
  53. })
  54. }
  55. }
  56. }
  ```

  [OnInterceptRequest\_two.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ManageWebPageLoadBrowse/CustomizePageResp/entry/src/main/ets/pages/OnInterceptRequest_two.ets#L16-L73)
* 被拦截后的页面

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c4/v3/7Gm5C_wGQQK7FZlSvty-JQ/zh-cn_image_0000002540611856.png?HW-CC-KV=V1&HW-CC-Date=20260414T040902Z&HW-CC-Expire=86400&HW-CC-Sign=829F624686ACBE126621B644D2BB30ECE2EDE9033C1C19485429410BD2D0619B)