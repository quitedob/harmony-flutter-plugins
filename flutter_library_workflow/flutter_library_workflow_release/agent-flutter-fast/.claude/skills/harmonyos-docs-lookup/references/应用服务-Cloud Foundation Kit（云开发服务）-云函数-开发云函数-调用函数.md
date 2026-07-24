## 约束与限制

支持Phone、Tablet设备。并且从5.1.0(18)版本开始，新增支持Wearable设备；从5.1.1(19)版本开始，新增支持TV设备。

## 设置云函数配置项

在“entry/src/main/module.json5”文件中添加网络权限。

收起

自动换行

深色代码主题

复制

```
1. "requestPermissions": [
2. {
3. "name": "ohos.permission.INTERNET"
4. }
5. ]
```

## 查询函数名和版本

在函数的触发器页面点击“HTTP触发器”，查看“触发URL”的后缀，获取触发器的标识，格式为“函数名-版本号”。如下图所示，“myhandlerxxxx-$latest”即为HTTP触发器标识，其中“myhandlerxxxx”为函数名，“$latest”为版本号。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7b/v3/wR26eTCbQ2yFRFrWEZSkwQ/zh-cn_image_0000002474174473.png?HW-CC-KV=V1&HW-CC-Date=20260414T025722Z&HW-CC-Expire=86400&HW-CC-Sign=6F57AE70AB9DC550EB1C796DEFFB8D1564C8100016D7ABDD709C98B7DBCB482C)

## 在应用中调用函数

1. 在项目中导入cloudFunction组件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { cloudFunction } from '@kit.CloudFoundationKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```

2. 调用[call()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cloudfoundation-cloudfunction#section251833512544)方法设置函数，在方法中传入函数名称，返回调用结果。
   * （可选）通过设置timeout属性对云函数设置超时时长，单位为毫秒。
   * （可选）通过设置version属性对云函数设置函数版本号，默认为最新版本'$latest'。
   * （可选）如果函数有入参，可以将data参数转化为JSON对象或JSON字符串传入，如果没有参数则不传。

   使用Promise异步回调：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { hilog } from '@kit.PerformanceAnalysisKit';
   2. import { cloudFunction } from '@kit.CloudFoundationKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. function callFunction() {
   6. cloudFunction.call({
   7. name: 'functionName', // functionName需替换为实际的函数名
   8. version: '$latest',   // 如果不传入版本号，默认为“$latest”。
   9. timeout: 10 * 1000,   // 单位为毫秒，默认为70*1000毫秒。
   10. data: {               // data为函数请求体
   11. param1: 'val1',
   12. param2: 'val2'
   13. }
   14. }).then((value: cloudFunction.FunctionResult) => {
   15. hilog.info(0x0000, 'testTag', `Succeeded in calling the function, result: ${JSON.stringify(value.result)}`);
   16. }).catch((err: BusinessError) => {
   17. hilog.error(0x0000, 'testTag', `Failed to call the function, code: ${err.code}, message: ${err.message}`);
   18. })
   19. }
   ```

   或者，使用callback异步回调：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { hilog } from '@kit.PerformanceAnalysisKit';
   2. import { cloudFunction } from '@kit.CloudFoundationKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';

   5. function callFunction() {
   6. cloudFunction.call({
   7. name: 'functionName', // functionName需替换成实际的函数名
   8. version: '$latest',  // 如果不传入版本号，默认为“$latest”。
   9. timeout: 10 * 1000,  // 单位为毫秒，默认为70*1000毫秒。
   10. data: {              // data为函数请求体
   11. param1: 'val1',
   12. param2: 'val2'
   13. }
   14. }, (err: BusinessError, value: cloudFunction.FunctionResult) => {
   15. if (err) {
   16. hilog.error(0x0000, 'testTag', `Failed to call the function, code: ${err.code}, message: ${err.message}`);
   17. return;
   18. }
   19. hilog.info(0x0000, 'testTag', `Succeeded in calling the function, result: ${JSON.stringify(value.result)}`);
   20. })
   21. }
   ```

3. 如果需要关注函数的返回值，可调用result属性获取。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let returnValue = value.result;
   ```

   value为步骤2中调用call()方法返回的cloudFunction.FunctionResult对象，返回值为云函数body返回的值，以[测试函数](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-test-function)时返回的结果为例，value.result = {"simple":"example"}。