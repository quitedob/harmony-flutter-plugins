本文档介绍命令式节点的常见问题并提供参考。

## FrameNode节点运行时出现jscrash

**问题现象**

不规范地使用[FrameNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode)后出现[JS Crash](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/jscrash-guidelines)。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/76/v3/gAgV6zfUQlCf3K-35wZnyA/zh-cn_image_0000002540771480.png?HW-CC-KV=V1&HW-CC-Date=20260414T040424Z&HW-CC-Expire=86400&HW-CC-Sign=159C9CD3D9FC541EB88664B016015D3E538815539CFBA526F4C6251C7B99EAA5)

**解决措施**

根据提示跳转至报错日志，查看具体的报错原因，进行相应的修改，具体的跳转方法请参考下方示例代码。

**示例代码**

该示例演示了FrameNode抛出[dispose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#dispose12)相关异常的场景。运行示例代码后会出现jscrash报错，参考下方的动图，跳转至具体的报错场景，发现报错的原因是调用dispose后不能调用[getMeasuredSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#getmeasuredsize12)，在本示例中，删除dispose相关代码即可正常运行。

收起

自动换行

深色代码主题

复制

```
1. import { NodeController, FrameNode, typeNode } from '@kit.ArkUI';

3. // 继承NodeController实现自定义UI控制器
4. class MyNodeController extends NodeController {
5. makeNode(uiContext: UIContext): FrameNode | null {
6. let node = new FrameNode(uiContext);
7. node.dispose(); // 删除本行可以让程序正常运行
8. node.getMeasuredSize();
9. return node;
10. }
11. }

13. @Entry
14. @Component
15. struct FrameNodeTypeTest {
16. private myNodeController: MyNodeController = new MyNodeController();

18. build() {
19. Row() {
20. Text('Hello')
21. NodeContainer(this.myNodeController);
22. }
23. }
24. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/71/v3/YQoq9MDZQbWp0LZOOXbHTw/zh-cn_image_0000002540611828.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040424Z&HW-CC-Expire=86400&HW-CC-Sign=15CAD137DA2D1D512719E86F0265223E63A27DC3A5B59CB7BEE3DD3751F69E6F)