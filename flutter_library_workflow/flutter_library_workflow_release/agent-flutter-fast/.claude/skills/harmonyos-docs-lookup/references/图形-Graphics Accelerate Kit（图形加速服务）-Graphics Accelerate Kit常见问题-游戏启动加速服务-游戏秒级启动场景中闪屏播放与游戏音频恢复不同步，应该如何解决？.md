在游戏秒级启动场景中，进入前台后，系统会立即恢复引擎（resume），游戏内部音频也会被同时恢复，若此时ArkTS层仍在播放闪屏动画，则导致“画面仍在闪屏，声音提前播放”的不同步问题。

为解决上述问题，我们提供两种可选方案：

* **方案一**：基于闪屏播放完成标识控制引擎恢复

  在游戏启动初期设置splashScreenFinishFlag = false，表示闪屏未结束，引擎不应恢复。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // TuanjiePlayerAbility.ets
  2. onCreate(): void {
  3. globalThis.splashScreenFinishFlag = false;
  4. }
  5. private onResume(): void {
  6. if (globalThis.splashScreenFinishFlag) {
  7. unity.nativeOnResume();
  8. }
  9. }
  ```

  闪屏动画播放完毕后：

  1. 将splashScreenFinishFlag设置为true。
  2. 主动调用引擎的resume()方法。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // Splash.ets
  2. private splashScreenFinish() {
  3. globalThis.splashScreenFinishFlag = true;
  4. unity.nativeOnResume();
  5. }
  ```
* **方案二**：引擎侧支持音频静音/取消静音能力

  在进入秒级启动恢复流程时，开发者在ArkTS层主动调用引擎静音接口，阻断闪屏阶段所有游戏内的音频输出。

  闪屏播放结束后，开发者再调用取消静音接口恢复引擎音频。