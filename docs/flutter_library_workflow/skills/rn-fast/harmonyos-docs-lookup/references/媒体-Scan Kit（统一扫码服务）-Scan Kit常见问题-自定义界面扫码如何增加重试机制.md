**问题现象**

调用customScan.[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section447114223245)成功后，调用customScan.[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section747366165913)启动相机流时抛出1000500001内部错误。

**解决措施**

可以尝试增加扫码相机流重试机制。

先暂停并释放相机流（customScan.[stop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section6949611114915)、customScan.[release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section1109456134917)），再重启相机流（customScan.[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section447114223245)、customScan.[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section747366165913)）。

示例代码（仅供参考）：

收起

自动换行

深色代码主题

复制

```
1. import { customScan, scanBarcode, scanCore } from '@kit.ScanKit';
2. import { AsyncCallback, BusinessError } from '@kit.BasicServicesKit';
3. import { hilog } from '@kit.PerformanceAnalysisKit';

5. @Entry
6. @Component
7. struct Index {
8. @State viewControl: customScan.ViewControl = {
9. width: 1080,
10. height: 1080,
11. surfaceId: ''
12. };
13. private retryScanTimes = 0;
14. private options: scanBarcode.ScanOptions = {
15. scanTypes: [scanCore.ScanType.ALL],
16. enableMultiMode: true,
17. enableAlbum: true
18. };
19. private customScanCallbackScan: AsyncCallback<scanBarcode.ScanResult[]> =
20. (error: BusinessError, result: scanBarcode.ScanResult[]) => {
21. if (error && error.code !== 0) {
22. hilog.error(0x0001, '[Scan Sample]',
23. `An error is returned by customScan.start->CallbackScan. Code: ${error.code}`);
24. // start回调，出现1000500001内部错误时触发重启相机流
25. if (error.code === scanCore.ScanErrorCode.INTERNAL_ERROR) {
26. this.retryCamera(error);
27. }
28. } else {
29. hilog.info(0x0001, '[Scan Sample]', `customScan start callbackScan result size: ${result.length}`)
30. }
31. // 识码处理逻辑
32. // ...
33. }

35. // 重启相机流
36. retryCamera(error: BusinessError) {
37. if (this.retryScanTimes < 3 && error.code === scanCore.ScanErrorCode.INTERNAL_ERROR) {
38. this.retryScanTimes++;
39. let timeId = setTimeout(async () => {
40. hilog.info(0x0001, '[Scan Sample]',
41. `Retry camera start. Times: ${this.retryScanTimes}.`);
42. // 先暂停并释放相机流
43. await this.releaseCamera();
44. // 重启相机流
45. this.startCamera();
46. hilog.info(0x0001, '[Scan Sample]', 'Retry camera end.');
47. clearTimeout(timeId);
48. }, 100)
49. }
50. }

52. // 启动相机流
53. startCamera() {
54. try {
55. customScan.init(this.options);
56. hilog.info(0x0001, '[Scan Sample]', 'customScan->init end');
57. try {
58. customScan.start(this.viewControl, this.customScanCallbackScan);
59. hilog.info(0x0001, '[Scan Sample]', 'customScan->start end');
60. } catch (error) {
61. hilog.error(0x0001, '[Scan Sample]',
62. `Failed to customScan->start. Code: ${error.code}, message: ${error.message}`);
63. }
64. } catch (error) {
65. hilog.error(0x0001, '[Scan Sample]',
66. `Failed to customScan->init. Code: ${error.code}, message: ${error.message}`);
67. }
68. }

70. // 暂停并释放相机流
71. async releaseCamera() {
72. try {
73. await customScan.stop();
74. hilog.info(0x0001, '[Scan Sample]', 'customScan->stop end');
75. try {
76. await customScan.release();
77. hilog.info(0x0001, '[Scan Sample]', 'customScan->release end');
78. } catch (error) {
79. hilog.error(0x0001, '[Scan Sample]',
80. `Failed to customScan->release. Code: ${error.code}, message: ${error.message}`);
81. }
82. } catch (error) {
83. hilog.error(0x0001, '[Scan Sample]',
84. `Failed to customScan->stop. Code: ${error.code}, message: ${error.message}`);
85. }
86. }

88. build() {
89. }
90. }
```