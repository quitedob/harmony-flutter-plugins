ArkTS引入了异步任务的等待和唤醒能力，以解决多线程任务时序控制问题。异步任务通过[ConditionVariable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-arkts-utils-locks#conditionvariable18)对象实现等待和唤醒机制，该对象支持跨线程引用传递。

ArkTS语言支持异步操作，现已增加异步任务的等待和唤醒功能。当异步任务收到唤醒通知或等待超时后，将继续执行。

说明

使用异步方法需标记为async，调用时需用await修饰，确保时序正确。

## 使用示例

[Sendable](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-sendable)共享对象在不同线程控制异步任务等待和唤醒的示例如下：

收起

自动换行

深色代码主题

复制

```
1. import { ArkTSUtils, taskpool } from '@kit.ArkTS';

3. @Concurrent
4. function notifyAll(conditionVariable: ArkTSUtils.locks.ConditionVariable) {
5. console.info(`TaskPool Thread notifyAll`);
6. conditionVariable.notifyAll();
7. }

9. @Concurrent
10. function notifyOne(conditionVariable: ArkTSUtils.locks.ConditionVariable) {
11. console.info(`TaskPool Thread notifyOne`);
12. conditionVariable.notifyOne();
13. }

15. @Concurrent
16. async function wait(conditionVariable: ArkTSUtils.locks.ConditionVariable) {
17. conditionVariable.wait().then(() => {
18. console.info(`TaskPool Thread Wait: success`);
19. });
20. }

22. @Concurrent
23. async function waitFor(conditionVariable: ArkTSUtils.locks.ConditionVariable) {
24. conditionVariable.waitFor(3000).then(() => {
25. console.info(`TaskPool Thread WaitFor: success`);
26. });
27. }

29. @Entry
30. @Component
31. struct Index {
32. @State message: string | ResourceStr = $r('app.string.AsyncButton');

34. build() {
35. Row() {
36. Column() {
37. Button(this.message)
38. .fontSize(25)
39. .fontWeight(FontWeight.Bold)
40. .onClick(async () => {
41. // 创建conditionVariable对象。
42. const conditionVariable: ArkTSUtils.locks.ConditionVariable = new ArkTSUtils.locks.ConditionVariable();
43. // 将实例conditionVariable传递给wait线程。
44. await taskpool.execute(wait, conditionVariable);
45. // 将实例conditionVariable传递给notifyAll线程，唤醒wait线程，日志输出"TaskPool Thread Wait: success"。
46. await taskpool.execute(notifyAll, conditionVariable);
47. // 将实例conditionVariable传递给waitFor线程。
48. await taskpool.execute(waitFor, conditionVariable);
49. // 将实例conditionVariable传递给notifyOne线程，唤醒waitFor线程，日志输出"TaskPool Thread WaitFor: success"。
50. await taskpool.execute(notifyOne, conditionVariable);

52. // 创建有name的conditionVariable对象。
53. const conditionVariableRequest: ArkTSUtils.locks.ConditionVariable =
54. ArkTSUtils.locks.ConditionVariable.request('Request1');
55. // 将实例conditionVariableRequest传递给wait线程。
56. await taskpool.execute(wait, conditionVariableRequest);
57. // 将实例conditionVariableRequest传递给notifyAll线程，唤醒wait线程，日志输出"TaskPool Thread Wait: success"。
58. await taskpool.execute(notifyAll, conditionVariableRequest);
59. // 将实例conditionVariableRequest传递给waitFor线程。
60. await taskpool.execute(waitFor, conditionVariableRequest);
61. // 将实例conditionVariableRequest传递给notifyOne线程，唤醒waitFor线程，日志输出"TaskPool Thread WaitFor: success"。
62. await taskpool.execute(notifyOne, conditionVariableRequest);
63. })
64. }
65. .width('100%')
66. }
67. .height('100%')
68. }
69. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ConcurrentThreadCommunication/InterThreadCommunicationObjects/SendableObject/AsynchronousWaiting/entry/src/main/ets/pages/Index.ets#L15-L85)