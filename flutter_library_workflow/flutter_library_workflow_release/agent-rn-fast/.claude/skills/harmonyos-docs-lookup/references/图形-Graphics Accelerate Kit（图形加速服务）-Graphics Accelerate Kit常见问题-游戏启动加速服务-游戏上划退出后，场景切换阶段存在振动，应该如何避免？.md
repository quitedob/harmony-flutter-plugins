开发步骤如下：

1. 通过globalThis定义全局作用域的变量isCacheStatus，在onCreate生命周期函数中赋值false，[isLaunchMirrorEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/graphics-accelerate-launchacceleration#zh-cn_topic_0000002214513333_zh-cn_topic_0000002137922672_section81101219425)接口返回true时赋值true。
2. 在函数[startVibration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-vibrator#vibratorstartvibration9)前增加isCacheStatus校验，若当前处于缓存态，则不进行振动操作。

以团结工程为例，修改如下：

收起

自动换行

深色代码主题

复制

```
1. // TuanjiePlayerAbilityBase.ets
2. import { launchAcceleration } from '@kit.GraphicsAccelerateKit';
3. onCreate(): void {
4. globalThis.isCacheStatus = false;
5. // ......
6. }
7. onWindowStageWillDestroy(): void {
8. if (launchAcceleration.isLaunchMirrorEnabled()) {
9. globalThis.isCacheStatus = true;
10. // ......
11. }
12. }

14. // TuanjieVibrate.ets
15. static vibrate(vibrateMs: number) {
16. if (globalThis.isCacheStatus) {
17. console.info('globalThis.isCacheStatus true, vibration returned.');
18. return;
19. }
20. // ......
21. }
```