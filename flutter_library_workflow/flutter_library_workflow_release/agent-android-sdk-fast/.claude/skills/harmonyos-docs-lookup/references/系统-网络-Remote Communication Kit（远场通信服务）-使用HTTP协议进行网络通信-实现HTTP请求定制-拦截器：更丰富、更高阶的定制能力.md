使用拦截器可以便捷地对HTTP的请求与响应进行修改，您可以创建拦截器链，按需定制一组拦截器对网络请求/响应进行修改。Remote Communication Kit模块提供了拦截器能力，在[SessionConfiguration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section18613443123412)中添加interceptors参数，传入自定义的拦截器，即可在HTTP请求和响应的过程中添加拦截器功能。

## 约束与限制

拦截器：更丰富、更高阶的定制能力支持Phone、2in1、Tablet、Wearable设备。并且从5.1.1(19)开始，新增支持TV设备。

## 拦截器工作原理

在客户端发送HTTP请求到达目标服务器之前，可以使用拦截器对请求进行修改。如下图，定义了链式拦截器，RequestUrlChangeInterceptor拦截器（下文以拦截器1代替）和ResponseHeaderRemoveInterceptor拦截器（下文以拦截器2代替）。拦截器1会将请求先拦截，该拦截器可以实现当网络质量差时，通过修改HTTP请求中的URL，来调整请求资源的大小。然后经过拦截器2，最后到达Internet。当请求到达目标服务器，服务器返回请求响应的结果给客户端之前，可以使用拦截器对HTTP的响应进行修改。响应先被拦截器2拦截，在响应返回给应用前检查和修改服务器的请求头。然后经过拦截器1，最后客户端接收响应结果。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3c/v3/wuFsD3zpTiK2Muuf1P_9SQ/zh-cn_image_0000002317038953.png?HW-CC-KV=V1&HW-CC-Date=20260414T044959Z&HW-CC-Expire=86400&HW-CC-Sign=6EEB713D375DA73002C93A61CB6B7ED5D8A6813F9A3BD9B852E047D235533DD7 "点击放大")

说明

RequestUrlChangeInterceptor拦截器和ResponseHeaderRemoveInterceptor拦截器都是自定义拦截器，需要开发者通过代码去实现内部逻辑。

## 拦截器的定义和使用

本节介绍如何自定义拦截器，定义RequestUrlChangeInterceptor拦截器和ResponseHeaderRemoveInterceptor拦截器实现[Interceptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section1385412349596)，可在[intercept()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section527252111410)方法中根据业务需求自定义处理逻辑，实现对请求/响应的修改。以下示例模拟网络质量不佳的情况。

1. 导入需要的模块，示例中包含了利用远场通信框架发起网络请求以及请求后的响应和错误处理，所以需导入以下模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { rcp } from '@kit.RemoteCommunicationKit';
   2. import { url } from '@kit.ArkTS';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 定义两种拦截器，RequestUrlChangeInterceptor拦截器中，当网络质量较差的时候，修改请求中的URL路径，请求获取分辨率较小的图片，可提升用户体验；NetworkQualityProvider中的isNetWorkFast用于在示例代码中模拟网络质量的好坏，这里仅作为场景模拟，需要开发者自行评估实现。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 模拟网络质量不佳的情况
   2. export class NetworkQualityProvider {
   3. isNetworkFast: boolean = true

   5. public constructor(isNetworkFast: boolean) {
   6. this.isNetworkFast = isNetworkFast
   7. }
   8. }

   10. // 定义RequestUrlChangeInterceptor拦截器
   11. export class RequestUrlChangeInterceptor implements rcp.Interceptor {
   12. private readonly networkQualityProvider: NetworkQualityProvider;

   14. constructor(networkQualityProvider: NetworkQualityProvider) {
   15. this.networkQualityProvider = networkQualityProvider;
   16. }

   18. // 自定义请求处理逻辑
   19. async intercept(context: rcp.RequestContext, next: rcp.RequestHandler): Promise<rcp.Response> {
   20. if (context.request.method === 'GET' && !this.networkQualityProvider.isNetworkFast) {
   21. console.info('[RequestUrlChangeInterceptor]: Slow network is detected');
   22. const parts = context.request.url.pathname.split('.');
   23. if (parts.length === 2) {
   24. const changed = url.URL.parseURL(context.request.url.href);
   25. changed.pathname = parts[0] + '_small.' + parts[1];
   26. console.info(`[RequestUrlChangeInterceptor]: Replace URL from "${context.request.url.href}" to "${changed}"`);
   27. AppStorage.setOrCreate('ReplacedInfo',
   28. `[RequestUrlChangeInterceptor]: Replace URL from "${context.request.url.href}" to "${changed}"`);
   29. context.request.url = changed;
   30. }
   31. } else {
   32. console.info('[RequestUrlChangeInterceptor]: Network is fast');
   33. }
   34. return next.handle(context);
   35. }
   36. }

   38. // 定义ResponseHeaderRemoveInterceptor拦截器
   39. export class ResponseHeaderRemoveInterceptor implements rcp.Interceptor {
   40. // 自定义响应处理逻辑
   41. async intercept(context: rcp.RequestContext, next: rcp.RequestHandler): Promise<rcp.Response> {
   42. const response = await next.handle(context);
   43. const toReturn: rcp.Response = {
   44. request: response.request,
   45. statusCode: response.statusCode,
   46. httpVersion: response.httpVersion,
   47. headers: {
   48. 'content-range': response.headers['content-range']
   49. },
   50. effectiveUrl: response.effectiveUrl,
   51. timeInfo: response.timeInfo,
   52. toJSON: () => null
   53. };
   54. console.info('[ResponseHeaderRemoveInterceptor]: Response was modified');
   55. return toReturn;
   56. }
   57. }
   ```
3. 使用拦截器，通过Remote Communication Kit模块中的[SessionConfiguration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section18613443123412)对象来设置interceptors，即可在请求/响应中添加拦截器。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. function httpRequest(networkStateSimulator: NetworkQualityProvider) {
   2. const sessionConfig: rcp.SessionConfiguration = {
   3. interceptors: [
   4. new RequestUrlChangeInterceptor(networkStateSimulator),
   5. new ResponseHeaderRemoveInterceptor()
   6. ],
   7. requestConfiguration: {
   8. security: {
   9. tlsOptions: {
   10. tlsVersion: 'TlsV1.3'
   11. }
   12. }
   13. }
   14. };
   15. const session = rcp.createSession(sessionConfig);
   16. }
   ```