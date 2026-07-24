svg组件还可以绘制文本。

## 文本

说明

* 文本的展示内容需要写在元素标签text内，可嵌套tspan子元素标签分段。
* 只支持被父元素标签svg嵌套。
* 只支持默认字体sans-serif。

通过设置x（x轴坐标）、y（y轴坐标）、dx（文本x轴偏移）、dy（文本y轴偏移）、fill（字体填充颜色）、stroke（文本边框颜色）、stroke-width（文本边框宽度）等属性实现文本的不同展示样式。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <svg>
4. <text x="200" y="300" font-size="80px" fill="blue" >Hello World</text>    <text x="200" y="300" dx="20" dy="80" font-size="80px" fill="blue" fill-opacity="0.5" stroke="red" stroke-width="2">Hello World</text>
5. <text x="20" y="550" fill="#D2691E">
6. <tspan dx="40" fill="red" font-size="80" fill-opacity="0.4">Hello World </tspan>
7. </text>
8. </svg>
9. </div>
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9e/v3/GN8nfdrGTUKccY1wRTFRVA/zh-cn_image_0000002540771452.png?HW-CC-KV=V1&HW-CC-Date=20260414T040230Z&HW-CC-Expire=86400&HW-CC-Sign=025EE1C78B04225A4C523575F000046274CC24E76D09872260410DADCBCFC93A)

## 沿路径绘制文本

textpath文本内容沿着属性path中的路径绘制文本。

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <svg fill="#00FF00" x="100" y="400">
4. <path d="M40,360 Q360,360 360,180 Q360,20 200,20 Q40,40 40,160 Q40,280 180,180 Q180,180 200,100" stroke="red" fill="none"></path>
5. <text>
6. <textpath fill="blue" startOffset="20%" path="M40,360 Q360,360 360,180 Q360,20 200,20 Q40,40 40,160 Q40,280 180,180 Q180,180 200,100" font-size="30px">
7. This is textpath test.
8. </textpath>
9. </text>
10. </svg>
11. </div>
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0b/v3/RmaiYpfYRN-AIZnTD_uEeQ/zh-cn_image_0000002571291747.png?HW-CC-KV=V1&HW-CC-Date=20260414T040230Z&HW-CC-Expire=86400&HW-CC-Sign=99BE73E0D241C7321AFEE8B5B7A37F8D5E3B05D709B6F6549FEB904A9CF33338)