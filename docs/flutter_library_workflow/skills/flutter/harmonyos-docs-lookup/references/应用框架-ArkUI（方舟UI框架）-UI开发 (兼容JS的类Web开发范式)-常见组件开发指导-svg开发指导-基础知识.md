svg组件主要作为svg画布的根节点使用，也可以在svg中嵌套使用。具体用法请参考[svg](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-svg)。

说明

svg父组件或者svg组件需要定义宽高值，否则不进行绘制。

## 创建svg组件

在pages/index目录下的hml文件中创建一个svg组件。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <svg width="400" height="400">  </svg>
4. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .container{
3. width: 100%;
4. height: 100%;
5. flex-direction: column;
6. align-items: center;
7. justify-content: center;
8. background-color: #F1F3F5;
9. }
10. svg{
11. background-color: blue;
12. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d8/v3/7rk7yH6UTs6jSqjoc7P5MA/zh-cn_image_0000002540771450.png?HW-CC-KV=V1&HW-CC-Date=20260414T040220Z&HW-CC-Expire=86400&HW-CC-Sign=603A3ECB7C2E2AD54CD49102748A3BA5C4FCECA9B308EBCA35AD909E333E6939)

## 设置属性

通过设置width、height、x、y和viewBox属性为svg设置宽度、高度、x轴坐标、y轴坐标和svg视口。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <svg width="400" height="400" viewBox="0 0 100 100">
4. <svg class="rect" width="100" height="100" x="20" y="10">
5. </svg>
6. </svg>
7. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .container{
3. width: 100%;
4. height: 100%;
5. flex-direction: column;
6. align-items: center;
7. justify-content: center;
8. background-color: #F1F3F5;
9. }
10. svg{
11. background-color: yellow;
12. }
13. .rect{
14. background-color: red;
15. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9e/v3/DQ0aLuN4SP-T8rkfl4H5Dg/zh-cn_image_0000002571291745.png?HW-CC-KV=V1&HW-CC-Date=20260414T040220Z&HW-CC-Expire=86400&HW-CC-Sign=4088A11A45F066E452E73657CA577E228CCD159D81032DE1CA1050CDF8DEC750)

说明

* x和y设置的是当前svg的x轴和y轴坐标，如果当前svg为根节点，x轴和y轴属性无效。
* viewBox的宽高和svg的宽高不一致，会以中心对齐进行缩放。