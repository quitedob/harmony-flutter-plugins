在应用开发中，[属性动画](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-animatorproperty)和[显式动画](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-explicit-animation)能够使用可选参数[ExpectedFrameRateRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-explicit-animation#expectedframeraterange11)，为不同的动画配置不同的期望绘制帧率。

## 请求属性动画的绘制帧率

定义文本组件的属性动画，请求绘制帧率为60，范例如下：

收起

自动换行

深色代码主题

复制

```
1. Text('60')
2. // ...
3. .animation({
4. duration: 1200,
5. iterations: 10,
6. // ...
7. expectedFrameRateRange: {
8. expected: 60,
9. min: 0,
10. max: 120,
11. },
12. })
```

[PropertyAnimationDisplaySync.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkGraphics2D/DisplaySync/entry/src/main/ets/DispalySync/PropertyAnimationDisplaySync.ets#L66-L91)

## 请求显式动画的绘制帧率

定义按钮组件的显式动画，请求绘制帧率为30，范例如下：

收起

自动换行

深色代码主题

复制

```
1. Button('Start')
2. // ...
3. .onClick(() => {
4. // ...

6. this.uiContext?.animateTo({
7. duration: 1200,
8. iterations: 10,
9. // ...
10. expectedFrameRateRange: {
11. expected: 30,
12. min: 0,
13. max: 120,
14. },
15. }, () => {
16. // ...
17. })

19. // ...
20. })
```

[PropertyAnimationDisplaySync.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkGraphics2D/DisplaySync/entry/src/main/ets/DispalySync/PropertyAnimationDisplaySync.ets#L96-L143)