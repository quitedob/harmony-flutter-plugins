Reader Kit的交互能力已经集成了手指点击和触摸滑动翻页，如果开发者需要增加其它翻页场景时（如：耳机播控翻页），可使用手动翻页接口实现自定义翻页场景。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/18/v3/Mye357KISFmzTJ_LEtIGsA/zh-cn_image_0000002224175598.png?HW-CC-KV=V1&HW-CC-Date=20260414T032916Z&HW-CC-Expire=86400&HW-CC-Sign=42AEA183EA3F88DFDD317D55413F981554A3274EDB9BAE2AB28AA00A701DA541 "点击放大")

## 接口说明

手动触发场景只涉及1个翻页接口，具体介绍如下表所示。

展开

| 接口名 | 描述 |
| --- | --- |
| [flipPage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/reader-read-core#section444911141952)(isNext: boolean): void | 触发ReadPageComponent组件进行翻页。 |

## 开发准备

在进行手动触发翻页之前，请先确保已经“[构建阅读器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/reader-read-page)”。

## 开发步骤

1. 在调用翻页接口之前，需要应用先构建需要手动触发翻页的场景，如耳机播控场景等。
2. 当自定义翻页场景调用触发翻页时，调用flipPage接口即可实现翻页能力。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let isNext: boolean = true; // true为下一页, false为上一页
   2. this.readerComponentController.flipPage(isNext);
   ```