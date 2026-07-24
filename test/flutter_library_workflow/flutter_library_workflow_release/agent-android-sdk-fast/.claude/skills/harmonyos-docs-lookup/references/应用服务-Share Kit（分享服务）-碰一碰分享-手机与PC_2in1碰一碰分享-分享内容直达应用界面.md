从6.0.0(20)版本开始，PC/2in1设备支持沙箱接收的能力。

PC/2in1设备创新交互方案：支持手机轻贴屏幕即可将单/多文件快速传输至PC/2in1设备应用沙箱，传输完成后通知目标应用接收文件列表，实现无缝预览与编辑。

沙箱接收仅支持文件类型的数据，应用需指定支持接收的文件类型和最大数量。

* 若类型不匹配，则跳过已注册的沙箱接口能力，采用华为分享默认逻辑接收文件数据。参考：[目标设备接收分享数据一步直达体验](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/share-access-one-step)。
* 若数量不匹配，则通过系统弹窗提示用户异常。

## 开发步骤

1. 导入相关模块。

收起

自动换行

深色代码主题

复制

```
1. import { uniformTypeDescriptor as utd } from '@kit.ArkData';
2. import { systemShare, harmonyShare } from '@kit.ShareKit';
3. import { common } from '@kit.AbilityKit';
```

2. 进入可接收数据的窗口，注册沙箱接收事件。

收起

自动换行

深色代码主题

复制

```
1. aboutToAppear(): void {
2. let capabilityRegistry: harmonyShare.RecvCapabilityRegistry = {
3. windowId: 999, // 此值仅为示例 实际使用时请替换正确的windowId
4. capabilities: [{ // 设置接收端支持的数据类型及数量
5. utd: utd.UniformDataType.IMAGE,
6. maxSupportedCount: 1,
7. }]
8. }
9. // 注册沙箱接收'dataReceive'监听事件
10. harmonyShare.on('dataReceive', capabilityRegistry, (receivableTarget: harmonyShare.ReceivableTarget) => {
11. let uiContext: UIContext = this.getUIContext();
12. let context = uiContext.getHostContext() as common.UIAbilityContext;
13. receivableTarget.receive(context.filesDir, { // 此路径仅为示例 使用时请替换实际路径
14. onDataReceived: (sharedData: systemShare.SharedData) => {
15. let sharedRecords = sharedData.getRecords();
16. sharedRecords.forEach((record: systemShare.SharedRecord) => {
17. // 处理分享数据
18. });
19. },
20. onResult(resultCode: harmonyShare.ShareResultCode) {
21. if (resultCode === harmonyShare.ShareResultCode.SHARE_SUCCESS) {
22. // To do things.
23. }
24. }
25. });
26. });
27. }
```

3. 关闭可接收数据的窗口，解除沙箱接收事件。

收起

自动换行

深色代码主题

复制

```
1. aboutToDisappear(): void {
2. let capabilityRegistry: harmonyShare.RecvCapabilityRegistry = {
3. windowId: 999, // 此值仅为示例 实际使用时请替换正确的windowId
4. capabilities: [{
5. utd: utd.UniformDataType.IMAGE,
6. maxSupportedCount: 1,
7. }]
8. }
9. // 解除沙箱接收'dataReceive'监听事件
10. harmonyShare.off('dataReceive', capabilityRegistry);
11. }
```

## 拒绝本次沙箱接收

当本次沙箱接收回调触发时，如果应用因为业务实现需要拒绝本次接收时，可使用[ReceivableTarget.reject()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/share-harmony-share#section193871531171019)方法拒绝本次接收。

收起

自动换行

深色代码主题

复制

```
1. import { uniformTypeDescriptor as utd } from '@kit.ArkData';
2. import { harmonyShare } from '@kit.ShareKit';

4. @Component
5. export default struct Index {
6. aboutToAppear(): void {
7. let capabilityRegistry: harmonyShare.RecvCapabilityRegistry = {
8. windowId: 999, // 此值仅为示例 实际使用时请替换正确的windowId
9. capabilities: [{
10. utd: utd.UniformDataType.IMAGE,
11. maxSupportedCount: 1,
12. }]
13. }
14. // 注册沙箱接收'dataReceive'监听事件
15. harmonyShare.on('dataReceive', capabilityRegistry, (receivableTarget: harmonyShare.ReceivableTarget) => {
16. receivableTarget.reject(harmonyShare.ReceivableErrorCode.NO_RECEIVABLE_ERROR);
17. });
18. }

20. aboutToDisappear(): void {
21. let capabilityRegistry: harmonyShare.RecvCapabilityRegistry = {
22. windowId: 999, // 此值仅为示例 实际使用时请替换正确的windowId
23. capabilities: [{
24. utd: utd.UniformDataType.IMAGE,
25. maxSupportedCount: 1,
26. }]
27. }
28. // 解除沙箱接收'dataReceive'监听事件
29. harmonyShare.off('dataReceive', capabilityRegistry);
30. }

32. build() {
33. }
34. }
```