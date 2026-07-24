实现标题和文本区域最常用的是基础组件text。text组件用于展示文本，可以设置不同的属性和样式，文本内容需要写在标签内容区，完整属性和样式信息请参考[text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-text)。在页面中插入标题和文本区域的示例如下：

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <text class="title-text">{{headTitle}}</text>
4. <text class="paragraph-text">{{paragraphFirst}}</text>
5. <text class="paragraph-text">{{paragraphSecond}}</text>
6. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .container {
3. flex-direction: column;
4. margin-top: 20px;
5. margin-left: 30px;
6. }
7. .title-text {
8. color: #1a1a1a;
9. font-size: 50px;
10. margin-top: 40px;
11. margin-bottom: 20px;
12. font-weight: 700;
13. }
14. .paragraph-text {
15. width: 95%;
16. color: #000000;
17. font-size: 35px;
18. line-height: 60px;
19. }
```

收起

自动换行

深色代码主题

复制

```
1. // xxx.js
2. export default {
3. data: {
4. headTitle: 'Capture the Beauty in Moment',
5. paragraphFirst: 'Capture the beauty of light during the transition and fusion of ice and water. At the instant of movement and stillness, softness and rigidity, force and beauty, condensing moving moments.',
6. paragraphSecond: 'Reflecting the purity of nature, the innovative design upgrades your visual entertainment and ergonomic comfort. Effortlessly capture what you see and let it speak for what you feel.',
7. },
8. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/97/v3/XzicogXGT0GnasK-sO8meQ/zh-cn_image_0000002540611740.png?HW-CC-KV=V1&HW-CC-Date=20260414T035956Z&HW-CC-Expire=86400&HW-CC-Sign=48B4C27004E1FF9DC18153AC61ADD271B02464A9DAA0314D5182FAE726DD8B0E)