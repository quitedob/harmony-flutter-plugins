接入全局取色功能，用户可以使用手指或者手写笔操作取色器在屏幕上移动，在目标位置抬起手指/抬起手写笔，会生成该位置色值对应的图像信息。

## 场景介绍

在应用中拉起全局取色，效果如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/85/v3/tiRTW1rLThGo0R5r1U3QZw/zh-cn_image_0000002535542347.png?HW-CC-KV=V1&HW-CC-Date=20260414T045924Z&HW-CC-Expire=86400&HW-CC-Sign=AC8995C0889559BF815383CD8A9E27619035820DBC60B11A6402F823F77A5ABF "点击放大")

支持获取当前屏幕上选中位置的色值和色域空间。

## 限制与约束

全局取色能力支持设备：Tablet、PC/2in1，并且从5.1.1(19)版本开始，新增支持设备：Phone（只支持部分机型）。

## 接口说明

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t [HMS\_GCP\_StartColorPicker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-c#ga4c202f3df255013b9920f26027065176) (int32\_t initialPosX, int32\_t initialPosY, [HMS\_GCP\_OnResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-c#gac06acd25757a5a72f4f8d0aec5821a52) onResultCallback, void \*userData) | 启动取色器。此API用于启动取色器，在取色器移动时不显示色值。 |
| int32\_t [HMS\_GCP\_StartColorPickerWithColorValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-c#ga8b044a1cfcd3b6eb8461e70c66d2c578) (int32\_t initialPosX, int32\_t initialPosY, [HMS\_GCP\_OnResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-imagefeaturepicker-c#gac06acd25757a5a72f4f8d0aec5821a52) onResultCallback, void \*userData) | 启动取色器。此API用于启动取色器，在取色器移动时显示色值。 |

## 接入步骤

### 在 CMake 脚本中链接动态库

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libace_napi.z.so libcolorpicker_ndk.z.so  libhilog_ndk.z.so)
```

### 导入模块

收起

自动换行

深色代码主题

复制

```
1. #include "color_picker/native_gcp_api.h"
2. #include "hilog/log.h"
```

### 示例代码

native\_gcp\_api.h提供HMS\_GCP\_StartColorPicker()和HMS\_GCP\_StartColorPickerWithColorValue()两种方式启动全局取色功能。

通过调用HMS\_GCP\_StartColorPicker()，实现启动取色器。

注意

该启动方法不支持实时显示色值。

收起

自动换行

深色代码主题

复制

```
1. void onSuccessCallback(void *userData, HMS_GCP_PickedColorInfo pickedColorInfo, const int32_t code) {
2. OH_LOG_Print(LOG_APP, LOG_INFO, 0x0000, "penkit", "picked code is: %{public}d", code);
3. OH_LOG_Print(LOG_APP, LOG_INFO, 0x0000, "penkit", "picked Red is: %{public}d", pickedColorInfo.color.red);
4. OH_LOG_Print(LOG_APP, LOG_INFO, 0x0000, "penkit", "picked Green is:%{public}d ", pickedColorInfo.color.green);
5. OH_LOG_Print(LOG_APP, LOG_INFO, 0x0000, "penkit", "picked Blue is: %{public}d", pickedColorInfo.color.blue);
6. OH_LOG_Print(LOG_APP, LOG_INFO, 0x0000, "penkit", "picked Alpha is:%{public}d ", pickedColorInfo.color.alpha);
7. delete userData;
8. }
9. void startPick() {
10. int32_t posX = 200;
11. int32_t posY = 200;
12. void *userData = nullptr;
13. HMS_GCP_StartColorPicker(posX, posY, onSuccessCallback, userData);
14. }
```

通过调用HMS\_GCP\_StartColorPickerWithColorValue()，实现启动取色器。

注意

该启动方法支持实时显示色值。

收起

自动换行

深色代码主题

复制

```
1. void onSuccessCallback(void *userData, HMS_GCP_PickedColorInfo pickedColorInfo, const int32_t code) {
2. OH_LOG_Print(LOG_APP, LOG_INFO, 0x0000, "penkit", "picked code is: %{public}d", code);
3. OH_LOG_Print(LOG_APP, LOG_INFO, 0x0000, "penkit", "picked Red is: %{public}d", pickedColorInfo.color.red);
4. OH_LOG_Print(LOG_APP, LOG_INFO, 0x0000, "penkit", "picked Green is:%{public}d ", pickedColorInfo.color.green);
5. OH_LOG_Print(LOG_APP, LOG_INFO, 0x0000, "penkit", "picked Blue is: %{public}d", pickedColorInfo.color.blue);
6. OH_LOG_Print(LOG_APP, LOG_INFO, 0x0000, "penkit", "picked Alpha is:%{public}d ", pickedColorInfo.color.alpha);
7. delete userData;
8. }
9. void startPickWithColorValue() {
10. int32_t posX = 200;
11. int32_t posY = 200;
12. void *userData = nullptr;
13. HMS_GCP_StartColorPickerWithColorValue(posX, posY, onSuccessCallback, userData);
14. }
```