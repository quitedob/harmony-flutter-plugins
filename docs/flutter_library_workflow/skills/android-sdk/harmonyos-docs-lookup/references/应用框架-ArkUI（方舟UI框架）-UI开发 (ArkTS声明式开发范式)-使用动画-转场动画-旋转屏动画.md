旋转屏动画主要分为两类：[布局切换的旋转屏动画](/consumer/cn/doc/harmonyos-guides/arkts-rotation-transition-animation#布局切换的旋转屏动画)和[透明度变化的旋转屏动画](/consumer/cn/doc/harmonyos-guides/arkts-rotation-transition-animation#透明度变化的旋转屏动画)，旨在实现屏幕显示方向变化时的自然过渡。布局切换的旋转屏动画实现较为简便，例如在module.json5中配置自动旋转（或设置窗口显示方向）即可实现。而透明度变化的旋转屏动画则需在module.json5配置的基础上，预备两套视图，在屏幕旋转时，通过视图切换，使消失的视图呈现渐隐效果，新出现的视图则渐显，从而营造流畅的视觉体验。

## 布局切换的旋转屏动画

布局切换时的旋转屏动画，是在屏幕显示方向改变时，为窗口与应用视图同步旋转而设计的大小和位置过渡动画。这种布局切换的旋转屏动画是系统默认的，便于开发者实现。当屏幕显示方向变化时，系统会生成窗口旋转动画，并自动调整窗口大小以匹配旋转后的尺寸。在此过程中，窗口会通知对应的应用，要求其根据新的窗口大小重新布局，产生与窗口旋转动画参数相同的布局动画。

切换屏幕方向即可实现布局切换的旋转屏动画效果。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct rotation {
4. build() {
5. Stack() {
6. // 请将$r('app.media.tree')替换为实际资源文件
7. Image($r('app.media.tree'))
8. .position({ x: 0, y: 0 })
9. .size({ width: 100, height: 100 })
10. .id('image1')
11. }
12. .backgroundColor(Color.White)
13. .size({ width: '100%', height: '100%' })
14. }
15. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/Animation/entry/src/main/ets/pages/rotation/template1/Index.ets#L17-L33)

需要在项目的module.json5文件中的abilities列表里添加"orientation"，指定为"auto\_rotation"。

收起

自动换行

深色代码主题

复制

```
1. "orientation": "auto_rotation",
```

布局切换的旋转屏动画，会对同步旋转的窗口与应用视图做大小和位置的过渡。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9d/v3/_JeJzXZJTcSnXMNIC43E_A/zh-cn_image_0000002571291593.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035420Z&HW-CC-Expire=86400&HW-CC-Sign=6369F28CB4C42385F692ED73EC076A84DF9A2F8D896CA9078E343412DDA56C3B)

## 透明度变化的旋转屏动画

透明度变化的旋转屏动画在屏幕显示方向变化时启用，当窗口进行旋转动画时，为旋转过程中新增或删除的组件添加默认透明度转场，以实现组件的优雅出现和消失。此功能通过监听窗口旋转事件，在事件中切换组件的视图效果，如果消失视图的根节点和新出现视图的根节点未设置转场效果，会为其自动添加默认透明度转场（即[TransitionEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-transition-animation-component#transitioneffect10对象说明).OPACITY），展现出透明度的渐隐和渐显效果。

收起

自动换行

深色代码主题

复制

```
1. import { display } from '@kit.ArkUI';

3. @Entry
4. @Component
5. struct rotation {

7. // 获取通过监听窗口的windowsSizeChange事件得到的屏幕显示方向
8. @StorageLink('orientation') myOrientation: display.Orientation = display.Orientation.PORTRAIT;

10. build() {
11. Stack() {

13. // 当屏幕显示方向变化时，切换组件的视图效果
14. if (this.myOrientation == display.Orientation.PORTRAIT || this.myOrientation == display.Orientation.PORTRAIT_INVERTED) {
15. // 请将$r('app.media.sky')替换为实际资源文件
16. Image($r('app.media.sky'))
17. .size({ width: 100, height: 100 })
18. .id('image1')

20. // 开发者也可以通过自行设置transition的TransitionEffect.OPACITY转场效果来实现旋转屏动画的透明度变化
21. // .transition(TransitionEffect.OPACITY)
22. } else {
23. // 请将$r('app.media.tree')替换为实际资源文件
24. Image($r('app.media.tree'))
25. .position({ x: 0, y: 0 })
26. .size({ width: 200, height: 200 })
27. .id('image2')

29. // 开发者也可以通过自行设置transition的TransitionEffect.OPACITY来实现旋转屏动画的透明度变化
30. // .transition(TransitionEffect.OPACITY)
31. }
32. }
33. .backgroundColor(Color.White)
34. .size({ width: '100%', height: '100%' })
35. }
36. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/Animation/entry/src/main/ets/pages/rotation/template2/Index.ets#L15-L51)

监听窗口旋转的同步事件windowSizeChange来实现视图的切换。例如可在EntryAbility.ets文件的[onWindowStageCreate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#onwindowstagecreate)方法中添加处理逻辑以获取屏幕的显示方向。

收起

自动换行

深色代码主题

复制

```
1. import { display, window } from '@kit.ArkUI';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { display, window } from '@kit.ArkUI';

5. const DOMAIN = 0x0000;
6. const TAG: string = 'EntryAbility';
7. // ...
8. onWindowStageCreate(windowStage: window.WindowStage): void {
9. // ...
10. hilog.info(DOMAIN, TAG, '%{public}s', 'Ability onWindowStageCreate');
11. let mainWindow: window.Window;
12. try {
13. mainWindow = windowStage.getMainWindowSync();
14. let displayClass: display.Display = display.getDefaultDisplaySync();
15. AppStorage.setOrCreate('orientation', displayClass.orientation);
16. // 监听窗口的windowsSizeChange事件，旋转屏时会触发该事件
17. mainWindow.on('windowSizeChange', (data) => {
18. hilog.info(DOMAIN, TAG, 'Succeeded in enabling the listener for window size changes. Data: ' + data);
19. let displayClass: display.Display | null = null;
20. try {
21. displayClass = display.getDefaultDisplaySync();
22. hilog.info(DOMAIN, TAG, 'display orientation is ' + displayClass.orientation);
23. // 获取屏幕的显示方向
24. AppStorage.set('orientation', displayClass.orientation);
25. } catch {
26. return;
27. }
28. })
29. } catch {
30. hilog.error(DOMAIN, TAG, '%{public}s', 'error');
31. return;
32. }
33. // ...

35. windowStage.loadContent('pages/Index', (err) => {
36. if (err.code) {
37. hilog.error(DOMAIN, TAG, 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
38. return;
39. }
40. hilog.info(DOMAIN, TAG, 'Succeeded in loading the content.');
41. });
42. }

44. // ...
```

[EntryAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/Animation/entry/src/main/ets/entryability/EntryAbility.ets#L22-L144)

需要在项目的module.json5文件中的abilities列表里添加"orientation"，指定为"auto\_rotation"。

收起

自动换行

深色代码主题

复制

```
1. "orientation": "auto_rotation",
```

透明度变化的旋转屏动画，会对窗口做大小和位置的过渡，并同时对应用视图做切换过渡，且为消失隐藏的应用视图做渐隐效果，对新出现的视图做渐显的效果。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/19/v3/Q_11ceF5Qx-lk7cRhswn0g/zh-cn_image_0000002540611644.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035420Z&HW-CC-Expire=86400&HW-CC-Sign=93AAB4915D47200765A31018EA62ADC22101C4D89639068728411C7E970DCB13)