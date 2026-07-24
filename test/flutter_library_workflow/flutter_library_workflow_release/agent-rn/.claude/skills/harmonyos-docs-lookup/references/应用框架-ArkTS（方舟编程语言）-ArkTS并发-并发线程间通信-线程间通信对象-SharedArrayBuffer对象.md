SharedArrayBuffer内部包含一块Native内存，其JS对象壳被分配在虚拟机本地堆（LocalHeap）。支持跨并发实例间共享Native内存，但是对共享Native内存的访问及修改需要采用Atomics类，防止数据竞争。SharedArrayBuffer可用于多个并发实例间的状态或数据共享。通信过程如下图所示：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8d/v3/klnjI57AQuySwuUL4JIQnw/zh-cn_image_0000002596936017.png?HW-CC-KV=V1&HW-CC-Date=20260507T114152Z&HW-CC-Expire=86400&HW-CC-Sign=21860C290EF9FC7EA49BD4FFE5D4DFD71BA049351A582AD86DFBB27D17472D9E)

## 使用示例

使用TaskPool传递Int32Array对象，实现如下：

收起

自动换行

深色代码主题

复制

```
1. import { taskpool } from '@kit.ArkTS';

3. @Concurrent
4. function transferAtomics(arg1: Int32Array) {
5. console.info('wait begin::');
6. // 使用Atomics进行操作
7. let res = Atomics.wait(arg1, 0, 0, 3000);
8. return res;
9. }

11. @Entry
12. @Component
13. struct sharedArrayBuffer {
14. @State message: string = 'Hello World';

16. build() {
17. RelativeContainer() {
18. Text(this.message)
19. .id('HelloWorld')
20. .fontSize(50)
21. .fontWeight(FontWeight.Bold)
22. .alignRules({
23. center: { anchor: '__container__', align: VerticalAlign.Center },
24. middle: { anchor: '__container__', align: HorizontalAlign.Center }
25. })
26. .onClick(() => {
27. // 定义可共享对象
28. let sab: SharedArrayBuffer = new SharedArrayBuffer(20);
29. let int32 = new Int32Array(sab);
30. let task: taskpool.Task = new taskpool.Task(transferAtomics, int32);
31. taskpool.execute(task).then((res) => {
32. console.info('this res is: ' + res);
33. });
34. setTimeout(() => {
35. Atomics.notify(int32, 0, 1);
36. }, 1000);
37. this.message = 'success';
38. })
39. }
40. .height('100%')
41. .width('100%')
42. }
43. }
```

[SharedArrayBufferObject.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ConcurrentThreadCommunication/InterThreadCommunicationObjects/CommunicationObjects/entry/src/main/ets/managers/SharedArrayBufferObject.ets#L16-L60)