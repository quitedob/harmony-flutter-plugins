## 应用生命周期

每个应用可以在app.js自定义应用级[生命周期](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/js-framework-lifecycle)的实现逻辑，以下示例仅在生命周期函数中打印对应日志：

收起

自动换行

深色代码主题

复制

```
1. // app.js
2. export default {
3. onCreate() {
4. console.info('Application onCreate');
5. },

7. onDestroy() {
8. console.info('Application onDestroy');
9. },
10. }
```

## 应用对象6+

展开

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| getApp | Function | 提供getApp()全局方法，可以在自定义js文件中获取app.js中暴露的对象。 |

示例如下：

收起

自动换行

深色代码主题

复制

```
1. // app.js
2. export default {
3. data: {
4. test: "by getApp"
5. },
6. onCreate() {
7. console.info('AceApplication onCreate');
8. },
9. onDestroy() {
10. console.info('AceApplication onDestroy');
11. },
12. }
```

收起

自动换行

深色代码主题

复制

```
1. // test.js 自定义逻辑代码
2. export var appData = getApp().data;
```