普通对象跨线程时通过拷贝（序列化）形式传递，两个线程的对象内容一致，但指向各自线程的隔离内存区间，被分配在各自线程的虚拟机本地堆（LocalHeap）。序列化支持类型包括：除Symbol之外的基础类型、Date、String、RegExp、Array、Map、Set、Object（仅限简单对象，比如通过"{}"或者"new Object"创建，普通对象仅支持传递属性，不支持传递其原型及方法）、ArrayBuffer、TypedArray。通信过程如图所示：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/34/v3/n72xWF3uRJ2fsMfTAbqNeg/zh-cn_image_0000002566176750.png?HW-CC-KV=V1&HW-CC-Date=20260507T114139Z&HW-CC-Expire=86400&HW-CC-Sign=8A0411C25A5555B73FDE93CC66C259BA1CEAF81007EDA450433B9E9227D12BAD)

说明

普通类实例对象跨线程通过拷贝形式传递，只能传递数据，类方法会丢失。使用[@Sendable装饰器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-sendable#sendable装饰器)标识为Sendable类后，类实例对象跨线程传递后，可携带类方法。

## 使用示例

此处提供了一个传递普通对象的示例，具体实现如下：

收起

自动换行

深色代码主题

复制

```
1. // 自定义class TestA
2. export class TestA {
3. constructor(name: string) {
4. this.name = name;
5. }
6. name: string = 'ClassA';
7. }
```

[Test.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ConcurrentThreadCommunication/InterThreadCommunicationObjects/CommunicationObjects/entry/src/main/ets/managers/Test.ets#L16-L24)

收起

自动换行

深色代码主题

复制

```
1. import { taskpool } from '@kit.ArkTS';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { TestA } from './Test';

5. @Concurrent
6. async function test1(arg: TestA) {
7. console.info('TestA name is: ' + arg.name);
8. }

10. @Entry
11. @Component
12. struct Index {
13. @State message: string = 'Hello World';

15. build() {
16. RelativeContainer() {
17. Text(this.message)
18. .id('HelloWorld')
19. .fontSize(50)
20. .fontWeight(FontWeight.Bold)
21. .alignRules({
22. center: { anchor: '__container__', align: VerticalAlign.Center },
23. middle: { anchor: '__container__', align: HorizontalAlign.Center }
24. })
25. .onClick(() => {
26. // 1. 创建Test实例objA
27. let objA = new TestA('TestA');
28. // 2. 创建任务task，将objA传递给该任务，objA非sendable对象，通过序列化传递给子线程
29. let task = new taskpool.Task(test1, objA);
30. // 3. 执行任务
31. taskpool.execute(task).then(() => {
32. console.info('taskpool: execute task success!');
33. }).catch((e:BusinessError) => {
34. console.error(`taskpool: execute task: Code: ${e.code}, message: ${e.message}`);
35. })
36. this.message = 'success';
37. })
38. }
39. .height('100%')
40. .width('100%')
41. }
42. }
```

[NormalObject.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ConcurrentThreadCommunication/InterThreadCommunicationObjects/CommunicationObjects/entry/src/main/ets/managers/NormalObject.ets#L16-L59)