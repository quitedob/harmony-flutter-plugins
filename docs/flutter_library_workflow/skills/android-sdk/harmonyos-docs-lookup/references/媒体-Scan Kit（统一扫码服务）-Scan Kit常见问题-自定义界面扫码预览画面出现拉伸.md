**问题现象**

[XComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)的宽高比与自定义界面扫码接口中[ViewControl](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section8604949165313)的宽高比不一致，导致自定义界面扫码预览画面出现拉伸。

**解决措施**

ViewControl的宽高比需要与XComponent的宽高比保持一致，会消除画面拉伸现象。当前支持的分辨率比例为16:9、4:3、1:1。

例如：XComponent中width为1080(px)，height为1920(px)，则ViewControl宽度设置为1080，高度设置为1920。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { scanBarcode, customScan } from '@kit.ScanKit';

5. @Entry
6. @Component
7. struct CustomScanPage {
8. // 设置预览流高度，默认单位：px
9. @State cameraHeight: number = 1920;
10. // 设置预览流宽度，默认单位：px
11. @State cameraWidth: number = 1080;
12. private mXComponentController: XComponentController = new XComponentController();

14. build() {
15. Stack() {
16. XComponent({
17. id: 'componentId',
18. type: XComponentType.SURFACE,
19. controller: this.mXComponentController
20. })
21. .onLoad(() => {
22. hilog.info(0x0001, '[Scan Sample]', 'onLoad is called')
23. // 获取XComponent的surfaceId
24. let surfaceId: string = this.mXComponentController.getXComponentSurfaceId();
25. hilog.info(0x0001, 'viewControl', `onLoad surfaceId: ${surfaceId}`);
26. // 设置viewControl相应字段
27. let viewControl: customScan.ViewControl = {
28. width: this.cameraWidth,
29. height: this.cameraHeight,
30. surfaceId: surfaceId
31. };
32. try {
33. customScan.start(viewControl).then((scanResult: Array<scanBarcode.ScanResult>) => {
34. hilog.info(0x0001, '[Scan Sample]',
35. `Succeeded in getting ScanResult by promise, scanResult is ${JSON.stringify(scanResult)}`);
36. }).catch((error: BusinessError) => {
37. hilog.error(0x0001, '[Scan Sample]',
38. `Failed to get ScanResult by promise. Code: ${error.code}, message: ${error.message}`);
39. })
40. } catch (error) {
41. hilog.error(0x0001, '[Scan Sample]',
42. `Failed to start customScan. Code: ${error.code}, message: ${error.message}`);
43. }
44. })
45. .height(this.cameraHeight + 'px')
46. .width(this.cameraWidth + 'px')
47. .position({ x: 0, y: 0 })
48. }
49. .alignContent(Alignment.Bottom)
50. .height('100%')
51. .width('100%')
52. .position({ x: 0, y: 0 })
53. }
54. }
```