为svg组件添加动画效果。

## 属性样式动画

在svg的子组件[animate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-svg-animate)中，通过attributeName设置需要进行动效的属性，from设置开始值，to设置结束值。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <svg>
4. <text x="300" y="300" fill="blue">
5. Hello
6. <animate attributeName="font-size" from="30" to="60" dur="3s" repeatCount="indefinite">
7. </animate>
8. <animate attributeName="fill" from="red" to="blue" dur="3s" repeatCount="indefinite">
9. </animate>
10. <animate attributeName="opacity" from="1" to="0.3" dur="3s" repeatCount="indefinite">
11. </animate>
12. </text>
13. <text x="300" y="600" fill="blue">
14. World
15. <animate attributeName="font-size" from="30" to="60" values="30;80" dur="3s" repeatCount="indefinite">
16. </animate>
17. <animate attributeName="fill" from="red" to="blue"  dur="3s" repeatCount="indefinite">
18. </animate>
19. <animate attributeName="opacity" from="0.3" to="1" dur="3s" repeatCount="indefinite">
20. </animate>
21. </text>
22. </svg>
23. </div>
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e1/v3/Pk9EKZgIQb6zfRF6iTi-hQ/zh-cn_image_0000002540611804.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040252Z&HW-CC-Expire=86400&HW-CC-Sign=FF041BE97D57C9CD236496107C90996D7AF013B1DAB9ABB1D8F4F6DED081F6BC)

说明

在设置动画变化值时，如果已经设置了values属性，则from和to都失效。

## 路径动画

在svg的子组件[animateMotion](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-svg-animatemotion)中，通过path设置动画变化的路径。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <svg fill="white" width="800" height="900">
4. <path d="M300,200 h-150 a150 150 0 1 0 150 -150 z" fill="white" stroke="blue" stroke-width="5" >
5. </path>
6. <path fill="red" d="M-5,-5 L10,0 L-5,5 L0,0 Z"  >
7. <animateMotion dur="2000" repeatCount="indefinite" rotate="auto-reverse"path="M300,200 h-150 a150 150 0 1 0 150 -150 z">
8. </animateMotion>
9. </path>
10. </svg>
11. </div>
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b4/v3/WxS6Y2ydRlCFmC7vyqbNAw/zh-cn_image_0000002571171799.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040252Z&HW-CC-Expire=86400&HW-CC-Sign=3A5A2D69F579CFB86FA8A0F8A56DF73E760E7453A2381E9A819BED86CDCEF20E)

## animateTransform动画

在svg的子组件[animateTransform](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-svg-animatetransform)中，通过attributeName绑定transform属性，type设置动画类型，from设置开始值，to设置结束值。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container" style="">
3. <svg>
4. <line x1="90" y1="300" x2="90" y2="730" stroke-width="10" stroke="black" stroke-linecap="round">
5. <animateTransform attributeName="transform" attributeType="XML" type="translate"  dur="3s" values="0;30;10;30;20;30;25;30" keyTimes="0;0.3;0.5;0.7;0.8;0.9;1.0;1.1"
6. fill="freeze">
7. </animateTransform>
8. </line>
9. <circle cx="500" cy="500" r="50" stroke-width="15" fill="red" stroke="#e70d0d">
10. <animateTransform attributeName="transform" attributeType="XML" type="rotate"  dur="3s" values="0;30;10;30;20;30;25;30" keyTimes="0;0.3;0.5;0.7;0.8;0.9;1.0;1.1" fill="freeze">
11. </animateTransform>
12. <animateTransform attributeName="transform" attributeType="XML" type="scale"  dur="6s" values="1;1;1.3" keyTimes="0;0.5;1" fill="freeze"></animateTransform>
13. <animateTransform attributeName="transform" attributeType="XML" type="translate"  dur="9s" values="0;0;300 7" keyTimes="0;0.6;0.9" fill="freeze"></animateTransform>
14. </circle>
15. <rect width="500" height="200" x="90" y="840">
16. <animateTransform attributeName="transform" attributeType="XML" type="skewY"  dur="6s" values="0;0;30" keyTimes="0;0.5;1" fill="freeze"></animateTransform>
17. </rect>
18. <line x1="650" y1="300" x2="650" y2="600" stroke-width="20" stroke="blue" stroke-linecap="round">
19. <animateTransform attributeName="transform" attributeType="XML" type="translate"  dur="9s" values="0;0;0 800" keyTimes="0;0.6;1" fill="freeze"></animateTransform>
20. </line>
21. </svg>
22. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .container {
3. flex-direction: column;
4. align-items: center;
5. width: 100%;
6. height: 100%;
7. background-color: #F1F3F5;
8. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d2/v3/4L77uYLfS6SegeYF9Rdm-g/zh-cn_image_0000002540771458.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040252Z&HW-CC-Expire=86400&HW-CC-Sign=147A0DFB0429F1B4B5873B8A6ADB62E3E2B4FB0CB5F233E96FD15F8D31C32721)