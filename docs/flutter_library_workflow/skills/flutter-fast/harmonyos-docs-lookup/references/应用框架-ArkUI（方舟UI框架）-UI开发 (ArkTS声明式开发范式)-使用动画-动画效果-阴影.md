阴影接口[shadow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#shadow)可以为当前组件添加阴影效果，该接口支持两种类型参数，开发者可配置[ShadowOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#shadowoptions对象说明)自定义阴影效果。ShadowOptions模式下，当radius = 0或者color的透明度为0时，无阴影效果。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct ShadowOptionDemo {
4. build() {
5. Row() {
6. Column() {
7. Column() {
8. Text('shadowOption').fontSize(12)
9. }
10. .width(100)
11. .aspectRatio(1)
12. .margin(10)
13. .justifyContent(FlexAlign.Center)
14. .backgroundColor(Color.White)
15. .borderRadius(20)
16. .shadow({ radius: 10, color: Color.Gray })

18. Column() {
19. Text('shadowOption').fontSize(12)
20. }
21. .width(100)
22. .aspectRatio(1)
23. .margin(10)
24. .justifyContent(FlexAlign.Center)
25. .backgroundColor('#a8a888')
26. .borderRadius(20)
27. .shadow({
28. radius: 10,
29. color: Color.Gray,
30. offsetX: 20,
31. offsetY: 20
32. })
33. }
34. .width('100%')
35. .height('100%')
36. .justifyContent(FlexAlign.Center)
37. }
38. .height('100%')
39. }
40. }
```

[Shadow.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/Shadow/entry/src/main/ets/pages/Shadow.ets#L16-L57)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5d/v3/DlOtq84UROeNW0T9ixKhog/zh-cn_image_0000002540611658.png?HW-CC-KV=V1&HW-CC-Date=20260414T035501Z&HW-CC-Expire=86400&HW-CC-Sign=BA585416F01AD72C2ADEC307E2229A5970AD1EDEB337109C3B09072D3EF3EA07)