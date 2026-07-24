svg组件可以用来绘制常见图形和线段，如矩形（<rect>）、圆形（<circle>）、线条(<line>）等，具体支持图形样式还请参考[svg](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-svg)组件。

在本场景中，绘制各种图形拼接成一个小房子。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <svg width="1000" height="1000">
4. <polygon points="100,400 300,200 500,400" fill="red"></polygon>     //屋顶
5. <polygon points="375,275 375,225 425,225 425,325" fill="orange"></polygon>   //烟囱
6. <rect width="300" height="300" x="150" y="400" fill="orange">      //房子
7. </rect>
8. <rect width="100" height="100" x="180" y="450" fill="white">    //窗户
9. </rect>
10. <line x1="180" x2="280" y1="500" y2="500" stroke-width="4" fill="white" stroke="black"></line>     //窗框
11. <line x1="230" x2="230" y1="450" y2="550" stroke-width="4" fill="white" stroke="black"></line>     //窗框
12. <polygon points="325,700 325,550 400,550 400,700" fill="red"></polygon>     //门
13. <circle cx="380" cy="625" r="20" fill="black"></circle>      //门把手
14. </svg>
15. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .container {
3. width: 100%;
4. height: 100%;
5. flex-direction: column;
6. justify-content: center;
7. align-items: center;
8. background-color: #F1F3F5;
9. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/98/v3/B-TdNZzWSPaGM4-pJ7DhKA/zh-cn_image_0000002540611798.png?HW-CC-KV=V1&HW-CC-Date=20260414T040223Z&HW-CC-Expire=86400&HW-CC-Sign=824434E159A40053F835E9DED92EDD6D267591EBF2C3685572901662F32AF06B)