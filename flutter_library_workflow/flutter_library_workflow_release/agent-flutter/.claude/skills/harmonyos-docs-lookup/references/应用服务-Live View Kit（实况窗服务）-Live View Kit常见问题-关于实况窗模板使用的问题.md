## 采用进度可视化模板并且indicatorType为INDICATOR\_TYPE\_OVERLAY时，图片较宽，无法完全覆盖进度条

当indicatorType=INDICATOR\_TYPE\_OVERLAY时，图标区域为64\*56vp，图片较宽时会按比例进行缩放。应用需要自己修改图片大小和样式来达到想要的效果。

理想效果图 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8f/v3/mvrhOJHvR1qEUVE8Z_bJDw/zh-cn_image_0000002488515542.png?HW-CC-KV=V1&HW-CC-Date=20260414T031351Z&HW-CC-Expire=86400&HW-CC-Sign=C834F42E2BDC944A8CAD4D4B9D2A236A3C61C512CC63ACA280F1B8B3E77A8929)

## 如何修改 "实况窗左上角图标"

除导航模板通过[currentNavigationIcon](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section19117745094)设置左上角图标外，其他模板不支持修改实况窗左上角图标，默认展示为应用Logo图标。