**问题现象**

自定义界面扫码如何主动通过手势缩放相机流。

**解决措施**

通过[组合手势](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-gesture-events-combined-gestures)接口设置变焦比setZoom(zoomValue : number): void。

参考下面示例代码，在手势缩放过程和手势缩放结束的接口中都可以设置变焦比变化：

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. import { customScan } from '@kit.ScanKit';

4. const TAG: string = '[Scan Sample]';
5. const MIN_ZOOM_RATIO: number = 1; // 例如：变焦比最小限制为1
6. const MAX_ZOOM_RATIO: number = 4; // 例如：变焦比最大限制为4

8. @Entry
9. @Component
10. struct Index {
11. private baseZoom: number = 1; // 当前的变焦比
12. private zoomRatio: number = 1; // 操作后的变焦比

14. build() {
15. Column() {
16. // 绑定手势
17. }.gesture(PinchGesture({ fingers: 2 })
18. .onActionStart(() => {
19. // 捏合手势开始
20. hilog.info(0x0001, TAG, 'Pinch start');
21. this.pinchGestureStart();
22. })
23. .onActionUpdate((event: GestureEvent) => {
24. if (event && event.scale) {
25. // 捏合手势更新
26. this.pinchGestureUpdate(event.scale);
27. }
28. })
29. .onActionEnd(() => {
30. // 捏合手势结束
31. hilog.info(0x0001, TAG, 'Pinch end');
32. })
33. )
34. }

36. /**
37. * 获取当前的变焦比。
38. * @returns {number} 当前的变焦比。
39. */
40. getZoom(): number {
41. let zoom = 1;
42. try {
43. zoom = customScan.getZoom();
44. hilog.info(0x0001, TAG, `getZoom end, zoom: ${zoom}`);
45. } catch (error) {
46. hilog.error(0x0001, TAG, `Failed to getZoom. Code: ${error.code}, message: ${error?.message}`);
47. }
48. return zoom;
49. }

51. /**
52. * 设置变焦比。
53. * @param {number} zoomRatio - 要设置的变焦比。
54. */
55. setZoom(zoomRatio: number): void {
56. try {
57. customScan.setZoom(zoomRatio);
58. hilog.info(0x0001, TAG, `setZoom end, zoomRatio: ${zoomRatio}`);
59. } catch (error) {
60. hilog.error(0x0001, TAG, `Failed to setZoom. Code: ${error.code}, message: ${error?.message}`);
61. }
62. }

64. /**
65. * 处理捏合手势的开始事件，记录初始变焦比。
66. */
67. pinchGestureStart(): void {
68. this.baseZoom = this.getZoom();
69. this.zoomRatio = this.baseZoom;
70. hilog.info(0x0001, TAG, `pinchGestureStart. baseZoom: ${this.baseZoom}`);
71. }

73. /**
74. * 处理捏合手势的更新事件，根据手势缩放比例更新当前变焦比。
75. * @param {number} scale - 当前捏合手势的缩放比例。
76. */
77. public pinchGestureUpdate(scale: number): void {
78. hilog.info(0x0001, TAG, `pinchGestureUpdate. scale: ${scale}`);
79. let tmpZoom: number = scale * this.baseZoom;
80. if (scale > 1) {
81. if (tmpZoom <= MAX_ZOOM_RATIO) {
82. this.updateZoom(tmpZoom);
83. }
84. } else {
85. if (tmpZoom < MIN_ZOOM_RATIO) {
86. tmpZoom = MIN_ZOOM_RATIO;
87. }
88. this.updateZoom(tmpZoom);
89. }
90. }

92. /**
93. * 更新当前变焦比，如果变化大于阈值0.01则进行设置。
94. * @param {number} tmpZoom - 临时计算的变焦比。
95. */
96. public updateZoom(tmpZoom: number): void {
97. if (Math.abs(tmpZoom - this.zoomRatio) > 0.01) {
98. hilog.info(0x0001, TAG, `updateZoom. tmpZoom: ${tmpZoom}`);
99. this.zoomRatio = tmpZoom;
100. this.setZoom(this.zoomRatio);
101. }
102. }
103. }
```