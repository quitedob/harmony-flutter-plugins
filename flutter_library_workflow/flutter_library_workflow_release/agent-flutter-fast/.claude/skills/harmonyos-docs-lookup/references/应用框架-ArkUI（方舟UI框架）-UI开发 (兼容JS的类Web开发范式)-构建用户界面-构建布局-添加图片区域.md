添加图片区域通常用[image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-image)组件来实现，使用的方法和[text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-text)组件类似。

图片资源建议放在js\default\common目录下，common目录需自行创建，详细的目录结构见[目录结构](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/js-framework-file#目录结构)。代码示例如下：

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <image class="img" src="{{middleImage}}"></image>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .img {
3. margin-top: 30px;
4. margin-bottom: 30px;
5. height: 385px;
6. }
```

收起

自动换行

深色代码主题

复制

```
1. // xxx.js
2. export default {
3. data: {
4. middleImage: '/common/ice.png',
5. },
6. }
```