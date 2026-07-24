使用mutableBuilder封装全局@Builder，实现全局@Builder的动态切换。开发指南见[mutableBuilder：实现全局@Builder动态更新](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-mutablebuilder)。

说明

本模块首批接口从API version 22开始支持。

后续版本的新增接口，采用上角标单独标记接口的起始版本。

## mutableBuilder

PhonePC/2in1TabletTVWearable

mutableBuilder<Args extends Object[]>(builder: BuilderCallback): MutableBuilder<Args>

mutableBuilder是一个模板函数，它返回一个MutableBuilder对象，只接受一个全局的@Builder函数作为其参数。

该函数返回的[MutableBuilder](/consumer/cn/doc/harmonyos-references/ts-universal-mutablebuilder#mutablebuilder-1)对象中，builder属性方法只能在自定义组件内部使用。

**元服务API：** 从API version 22开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| builder | [BuilderCallback](/consumer/cn/doc/harmonyos-references/ts-universal-mutablebuilder#buildercallback) | 是 | @Builder装饰的全局函数。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [MutableBuilder<Args>](/consumer/cn/doc/harmonyos-references/ts-universal-mutablebuilder#mutablebuilder-1) | MutableBuilder<Args>的实例，用于[全局@Builder](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-builder#全局自定义构建函数)进行赋值和传递的类，实现全局@Builder的动态更新。 |

**示例：**



```
1. class TextContent {
2. text: string = '';
3. }

5. @Builder
6. function textBuilder(p: TextContent) {
7. Text(p.text).margin(20)
8. }

10. @Builder
11. function buttonBuilder(p: TextContent) {
12. Button(p.text).margin(20)
13. }

15. let counter: number = 1;
16. @Entry
17. @ComponentV2
18. struct MyApp {
19. @Local message: string = 'init';
20. @Local switchingBuilder: MutableBuilder<[TextContent]> = mutableBuilder(textBuilder);
21. build() {
22. Column() {
23. this.switchingBuilder.builder({ text: this.message })
24. Button('Click to change')
25. .onClick(() => {
26. counter++; // 每次点击按钮修改counter来动态改变全局@Builder
27. if(counter % 2 === 0) {
28. this.message += 'B';
29. this.switchingBuilder = mutableBuilder(buttonBuilder); // textBuilder--->buttonBuilder
30. } else {
31. this.message += 'T';
32. this.switchingBuilder = mutableBuilder(textBuilder); // buttonBuilder--->textBuilder
33. }
34. })
35. }.position({x: 120, y: 60})
36. }
37. }
```

## MutableBuilder

PhonePC/2in1TabletTVWearable

class MutableBuilder<Args extends Object[]> extends WrappedBuilder<Args> { }

用于实现包装[全局@Builder](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-builder#全局自定义构建函数)的动态切换的类，MutableBuilder继承自[WrappedBuilder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-wrapbuilder#wrappedbuilder)，其模板参数Args extends Object[]应传入@Builder函数的参数类型列表。[mutableBuilder](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-mutablebuilder)函数返回MutableBuilder对象。

**元服务API：** 从API version 22开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

## BuilderCallback

PhonePC/2in1TabletTVWearable

type BuilderCallback = (...args: Args) => void

mutableBuilder函数入参为全局@Builder函数。

**元服务API：** 从API version 22开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| ...args | Args | 否 | 全局@Builder函数的入参。Args用于表示一个参数可以接收任意数量的参数。 |

**示例：**



```
1. @Builder
2. function MyBuilder(value: string, size: number) {
3. Text(value)
4. .fontSize(size)
5. }
6. let builderVar: MutableBuilder<[string, number]> = mutableBuilder(MyBuilder); // 声明builderVar的类型为MutableBuilder
```