本文档介绍动态属性设置的常见问题并提供参考。

## 使用AttributeModifier设置组件动态属性，出现jscrash

**问题现象**

使用AttributeModifier对组件进行[动态属性设置](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier)，设置某些属性后出现[JS Crash](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/jscrash-guidelines)。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d1/v3/N88xiAyYQPW0M9UUb3k9uA/zh-cn_image_0000002540771480.png?HW-CC-KV=V1&HW-CC-Date=20260414T040421Z&HW-CC-Expire=86400&HW-CC-Sign=051D90136744304E8D31D01E817859CEC536A798E0A4EDAA7AEC2E0D132991AC)

**解决措施**

根据提示跳转至报错日志，查看具体的报错原因，进行相应的修改，具体的跳转方法请参考下方示例代码。

**示例代码**

该示例通过Button绑定AttributeModifier，展示了AttributeModifier在设置不支持的属性时会抛出异常的场景，运行示例代码后会出现jscrash报错，参考下方的动图，跳转至具体的报错场景。在本示例中，删除reuseId相关代码即可正常运行。

收起

自动换行

深色代码主题

复制

```
1. // xxx.ets
2. // 设置Button组件属性的自定义AttributeModifier
3. class MyButtonModifier implements AttributeModifier<ButtonAttribute> {

5. applyNormalAttribute(instance: ButtonAttribute): void {
6. instance.reuseId('String') // 删除本行可以让程序正常运行
7. instance.backgroundColor(Color.Red)
8. }
9. }

11. @Entry
12. @Component
13. struct attributeDemo {
14. @State modifier: MyButtonModifier = new MyButtonModifier();

16. build() {
17. Row() {
18. Column() {
19. Button('Button')
20. .attributeModifier(this.modifier)
21. }
22. .width('100%')
23. }
24. .height('100%')
25. }
26. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ec/v3/apWJLzZsRja_FH1QlAt7Tg/zh-cn_image_0000002571291775.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040421Z&HW-CC-Expire=86400&HW-CC-Sign=DFC11361A9D88B03550809FFA7BE7CE17244EDC3EB055BCC8CB570D076419C3B)