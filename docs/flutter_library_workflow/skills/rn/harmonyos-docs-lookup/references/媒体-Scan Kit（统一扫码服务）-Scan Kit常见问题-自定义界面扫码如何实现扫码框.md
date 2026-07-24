**问题现象**

扫码界面没有类似扫码框呈现。

**解决措施**

1. 使用ArkTS在实时扫码界面画出需要的扫码框。
2. 根据获得的码图位置信息确定码图是否在扫码框内（注意：需要将码图位置单位和扫码框位置单位保持一致，根据实际情况使用px或vp）。
3. 当码图位置不在扫码框范围内时，在[customScan.start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section747366165913)的callback回调中执行[customScan.rescan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section19244173211169)接口，即可继续扫码。

示例代码（仅供参考）：

收起

自动换行

深色代码主题

复制

```
1. import { customScan, scanBarcode } from '@kit.ScanKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { BusinessError } from '@kit.BasicServicesKit';

5. // 例如XComponent设置的宽高为cameraWidth = 1080px, cameraHeight = 1920px
6. let cameraWidth = 1080;
7. let cameraHeight = 1920;
8. // 自定义扫码框在屏幕中间 scanBox 为800px*800px，则扫码框相对XComponent的坐标left: 140px, top: 560px, right: 940px, bottom: 1360px
9. let scanBoxWidth = 800;
10. let scanBoxHeight = 800;
11. let scanBox: scanBarcode.ScanCodeRect = {
12. left: (cameraWidth - scanBoxWidth) / 2,
13. top: (cameraHeight - scanBoxHeight) / 2,
14. right: (cameraWidth + scanBoxWidth) / 2,
15. bottom: (cameraHeight + scanBoxHeight) / 2
16. }

18. // 设置ViewControl参数
19. let viewControl: customScan.ViewControl = {
20. width: cameraWidth,
21. height: cameraHeight,
22. surfaceId: '123' // mock数据，实际需要从组件生成获取
23. };
24. try {
25. customScan.start(viewControl, (error: BusinessError, result: Array<scanBarcode.ScanResult>) => {
26. if (error) {
27. // 扫码识别失败
28. return;
29. }
30. if (result && result.length > 0) {
31. for (let i = 0; i < result.length; i++) {
32. // 例如：scanCodeRect是{ left: 150px, top: 400px, right: 450px, bottom: 700px }
33. const scanCodeRect: scanBarcode.ScanCodeRect | undefined = result[i].scanCodeRect;
34. if (scanCodeRect) {
35. // 判断码图位置是否位于扫码框范围内
36. if (scanCodeRect.left >= scanBox.left && scanCodeRect.top >= scanBox.top &&
37. scanCodeRect.right <= scanBox.right &&
38. scanCodeRect.bottom <= scanBox.bottom) {
39. // 扫码成功，码图位置位于扫码框范围，根据业务需求处理扫码结果
40. } else {
41. // 码图位置不在扫码框范围，继续扫码
42. try {
43. customScan.rescan();
44. break;
45. } catch (error) {
46. hilog.error(0x0001, '[Scan Sample]', `Failed to rescan. Code: ${error.code}, message: ${error.message}`);
47. }
48. }
49. }
50. }
51. }
52. });
53. } catch (error) {
54. hilog.error(0x0001, '[Scan Sample]', `Failed to start customScan. Code: ${error.code}, message: ${error.message}`);
55. }
```