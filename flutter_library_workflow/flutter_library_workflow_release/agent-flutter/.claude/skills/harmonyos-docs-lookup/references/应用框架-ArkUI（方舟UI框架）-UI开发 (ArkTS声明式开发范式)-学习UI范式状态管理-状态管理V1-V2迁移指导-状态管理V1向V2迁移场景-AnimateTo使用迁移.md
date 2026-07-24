在状态管理从V1迁移至V2的过程中，[animateTo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#animateto)执行动画前如需修改状态变量，可参考本文档的适配方案。

## 执行动画前重新定义初始态场景

**V1实现代码如下：**

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct Index {
4. @State w: number = 50; // 宽度
5. @State h: number = 50; // 高度
6. @State message: string = 'Hello';

8. build() {
9. Column() {
10. Button('change size')
11. .margin(20)
12. .onClick(() => {
13. // 在执行动画前，存在额外的修改
14. this.w = 100;
15. this.h = 100;
16. this.message = 'Hello World';
17. this.getUIContext().animateTo({
18. duration: 1000
19. }, () => {
20. this.w = 200;
21. this.h = 200;
22. this.message = 'Hello ArkUI';
23. })
24. })
25. Column() {
26. Text(`${this.message}`)
27. }
28. .backgroundColor('#ff17a98d')
29. .width(this.w)
30. .height(this.h)
31. }
32. }
33. }
```

[LocalQuestionV1animateTo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateManagement/entry/src/main/ets/pages/local/LocalQuestionV1animateTo.ets#L29-L63)

预期动画效果：绿色矩形从长宽100变为200，字符串从Hello World变为Hello ArkUI。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/64/v3/5sZQ9jSZSli_dBW1T-FHbw/zh-cn_image_0000002540770918.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034612Z&HW-CC-Expire=86400&HW-CC-Sign=80FE988CD18EC0DB0A1453FB9B4601DBDF2135DE47572AE4E446093C52B7D7AC)

**V1迁移V2**

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @ComponentV2
3. struct Index {
4. @Local w: number = 50; // 宽度
5. @Local h: number = 50; // 高度
6. @Local message: string = 'Hello';

8. build() {
9. Column() {
10. Button('change size')
11. .margin(20)
12. .onClick(() => {
13. // 在执行动画前，存在额外的修改
14. this.w = 100;
15. this.h = 100;
16. this.message = 'Hello World';
17. this.getUIContext().animateTo({
18. duration: 1000
19. }, () => {
20. this.w = 200;
21. this.h = 200;
22. this.message = 'Hello ArkUI';
23. })
24. })
25. Column() {
26. Text(`${this.message}`)
27. }
28. .backgroundColor('#ff17a98d')
29. .width(this.w)
30. .height(this.h)
31. }
32. }
33. }
```

[LocalQuestionV2animateTo.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateManagement/entry/src/main/ets/pages/local/LocalQuestionV2animateTo.ets#L29-L63)

由于当前animateTo与V2的刷新机制不兼容，执行动画前的额外修改未生效，实际显示的动画效果如下图所示：绿色矩形从长宽50变为200，字符串从Hello变为Hello ArkUI。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6d/v3/0qQZkehWQxK8U9YbRAiwEA/zh-cn_image_0000002571171261.gif?HW-CC-KV=V1&HW-CC-Date=20260414T034612Z&HW-CC-Expire=86400&HW-CC-Sign=836B781E091AF38167F8CEF50C4CCE98625EAE4713EE9A07B9074FDC153B7C34)

## 迁移方案

### API version 22之前的迁移方案

从API version 22之前，可以使用一个duration为0的[animateToImmediately](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-explicit-animatetoimmediately#animatetoimmediately)将额外的修改先刷新，再执行原来的动画达成预期的效果。

完整代码如下：

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @ComponentV2
3. struct Index {
4. @Local w: number = 50; // 宽度
5. @Local h: number = 50; // 高度
6. @Local message: string = 'Hello';

8. build() {
9. Column() {
10. Button('change size')
11. .margin(20)
12. .onClick(() => {
13. // 在执行动画前，存在额外的修改
14. this.w = 100;
15. this.h = 100;
16. this.message = 'Hello World';
17. animateToImmediately({
18. duration: 0
19. }, () => {
20. })
21. this.getUIContext().animateTo({
22. duration: 1000
23. }, () => {
24. this.w = 200;
25. this.h = 200;
26. this.message = 'Hello ArkUI';
27. })
28. })
29. Column() {
30. Text(`${this.message}`)
31. }
32. .backgroundColor('#ff17a98d')
33. .width(this.w)
34. .height(this.h)
35. }
36. }
37. }
```

[LocalQuestionAnimateToImmediately.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateManagement/entry/src/main/ets/pages/local/LocalQuestionAnimateToImmediately.ets#L29-L67)

### API version 22及以后的迁移方案

从API version 22开始，可以使用[applySync接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-applysync-flushupdates-flushuiupdates)实现预期的显示效果。

原理为使用applySync接口同步刷新闭包函数内的状态变量变化，再执行原来的动画达成预期的效果。

收起

自动换行

深色代码主题

复制

```
1. import { UIUtils } from '@kit.ArkUI';

3. @Entry
4. @ComponentV2
5. struct Index {
6. @Local w: number = 50; // 宽度
7. @Local h: number = 50; // 高度
8. @Local message: string = 'Hello';

10. build() {
11. Column() {
12. Button('change size')
13. .margin(20)
14. .onClick(() => {
15. // 在执行动画前，存在额外的修改
16. UIUtils.applySync(() => {
17. this.w = 100;
18. this.h = 100;
19. this.message = 'Hello World';
20. })
21. this.getUIContext().animateTo({
22. duration: 1000
23. }, () => {
24. this.w = 200;
25. this.h = 200;
26. this.message = 'Hello ArkUI';
27. })
28. })
29. Column() {
30. Text(`${this.message}`)
31. }
32. .backgroundColor('#ff17a98d')
33. .width(this.w)
34. .height(this.h)
35. }
36. }
37. }
```

[LocalQuestionExpectedEffect.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateManagement/entry/src/main/ets/pages/local/LocalQuestionExpectedEffect.ets#L15-L53)