可利用[clipShape](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-sharp-clipping#clipshape12)接口将组件裁剪为所需的形状。调用该接口后，可以保留该形状覆盖的组件部分，同时移除组件的其余部分。裁剪形状本身是不可见的。

说明

不同的形状支持的属性范围不同，路径是一种形状，除此之外还有椭圆、矩形等形状。

路径的形状不支持设置宽度和高度，具体形状支持的属性参考具体[形状](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-shape)的文档。

形状中的[fill](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-shape#fill)属性对clipShape接口不生效。

## 裁剪圆形

通过设置CircleShape，将图片裁剪为圆形。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. import { CircleShape } from '@kit.ArkUI';

4. @Entry
5. @Component
6. struct ClipShapeExample {
7. build() {
8. Column({ space: 15 }) {
9. // 用一个280px直径的圆对图片进行裁剪
10. // 请将$r('app.media.background')替换为实际资源文件
11. Image($r('app.media.background'))
12. .clipShape(new CircleShape({ width: '280px', height: '280px' }))
13. .width('500px').height('280px')

15. // 用一个350px直径的圆对图片进行裁剪
16. // 请将$r('app.media.background')替换为实际资源文件
17. Image($r('app.media.background'))
18. .clipShape(new CircleShape({ width: '350px', height: '350px' }))
19. .width('500px').height('370px')
20. }
21. .width('100%')
22. .margin({ top: 15 })
23. }
24. }
```

[ClipShapeExample1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ClipShape/entry/src/main/ets/View/ClipShapeExample1.ets#L15-L38)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2e/v3/p98-sWglQCKP08PI5vwGYw/zh-cn_image_0000002540611576.png?HW-CC-KV=V1&HW-CC-Date=20260414T035232Z&HW-CC-Expire=86400&HW-CC-Sign=7E3C04D4940FE01638AE2A1DA32460706BC3C9BD67E9AD29DF2EBD55125D7B49)

## 裁剪椭圆形

通过设置EllipseShape，将图片裁剪为椭圆形。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. import { EllipseShape } from '@kit.ArkUI';

4. @Entry
5. @Component
6. struct ClipShapeExample {
7. build() {
8. Column({ space: 15 }) {
9. // 请将$r('app.media.background')替换为实际资源文件
10. Image($r('app.media.background'))
11. .clipShape(new EllipseShape({ width: '280px', height: '200px' }))
12. .width('500px').height('400px')

14. // 请将$r('app.media.background')替换为实际资源文件
15. Image($r('app.media.background'))
16. .clipShape(new EllipseShape({ width: '380px', height: '280px' }))
17. .width('500px').height('400px')
18. }
19. .width('100%')
20. .margin({ top: 15 })
21. }
22. }
```

[ClipShapeExample2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ClipShape/entry/src/main/ets/View/ClipShapeExample2.ets#L15-L36)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6a/v3/E6YSauBdSr6vil0JMgio4A/zh-cn_image_0000002571171571.png?HW-CC-KV=V1&HW-CC-Date=20260414T035232Z&HW-CC-Expire=86400&HW-CC-Sign=BCC066DDEAE68B2C6224CBB41A7670256D98075C4545BBBD6C417EC941C88646)

## 裁剪矩形

通过设置RectShape，将图片裁剪为矩形。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. import { RectShape } from '@kit.ArkUI';

4. @Entry
5. @Component
6. struct ClipShapeExample {
7. build() {
8. Column({ space: 15 }) {
9. // 请将$r('app.media.background')替换为实际资源文件
10. Image($r('app.media.background'))
11. .clipShape(new RectShape({ width: '200px', height: '200px' }))
12. .width('500px').height('400px')

14. // 请将$r('app.media.background')替换为实际资源文件
15. Image($r('app.media.background'))
16. .clipShape(new RectShape({ width: '380px', height: '280px' }))
17. .width('500px').height('400px')
18. }
19. .width('100%')
20. .margin({ top: 15 })
21. }
22. }
```

[ClipShapeExample3.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ClipShape/entry/src/main/ets/View/ClipShapeExample3.ets#L15-L36)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/05/v3/k7SxCCYqTseB0nQICM7rLQ/zh-cn_image_0000002540771232.png?HW-CC-KV=V1&HW-CC-Date=20260414T035232Z&HW-CC-Expire=86400&HW-CC-Sign=B122D68F515CA34939CB0FF92136B0358DCAAE4DC802A3EF2E9D7073A96CEF62)

## 裁剪不规则形状

通过设置PathShape，将图片裁剪为不规则形状。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. import { PathShape } from '@kit.ArkUI';

4. @Entry
5. @Component
6. struct ClipShapeExample {
7. build() {
8. Column({ space: 15 }) {
9. Row() {
10. // 请将$r('app.media.background')替换为实际资源文件
11. Image($r('app.media.background'))
12. .clipShape(new PathShape({ commands: 'M0 0 H400 V200 H0 Z' }))
13. .width('500px').height('300px')
14. }
15. .clip(true)
16. .borderRadius(20)
17. }
18. .width('100%')
19. .margin({ top: 15 })
20. }
21. }
```

[ClipShapeExample4.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ClipShape/entry/src/main/ets/View/ClipShapeExample4.ets#L15-L36)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b1/v3/dgt_fmMpTmCMvdogdVSd4A/zh-cn_image_0000002571291529.png?HW-CC-KV=V1&HW-CC-Date=20260414T035232Z&HW-CC-Expire=86400&HW-CC-Sign=5DF01F681935EA41E2A2F4543EE0073BA99482E7C71BE0A93F87F89E3A76BA60)