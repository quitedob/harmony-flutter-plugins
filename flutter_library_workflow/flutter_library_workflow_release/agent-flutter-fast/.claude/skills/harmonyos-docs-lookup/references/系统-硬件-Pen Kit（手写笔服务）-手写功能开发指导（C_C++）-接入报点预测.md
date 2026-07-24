从6.0.0(20)开始，报点预测新增C API接口。

接入报点预测功能，可以优化应用中手写效果的绘制跟手性，提升应用中手写笔书写场景的跟手体验。

## 场景介绍

在应用的自定义界面中，获取到界面的触摸事件，通过调用报点预测的接口，可以得到预测的下一个报点的位置信息。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/20/v3/ZCfCI8L2R0iOmAoZWhKVKQ/zh-cn_image_0000002503702340.png?HW-CC-KV=V1&HW-CC-Date=20260414T045928Z&HW-CC-Expire=86400&HW-CC-Sign=210779F0DB4DB069EFB36F8191606BA2786FE57BCE342A84DE58C2E5FB4EF378 "点击放大")

## 接口说明

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t [HMS\_HandWrite\_GetPredictPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-handwrite-c#section3513132112183)(const [HandWrite\_HistoricalPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-handwrite-struct-historicalpoint) \*event, int32\_t size, float \*predictPointX, float \*predictPointY) | 获取预测点。 |

## 接入步骤

报点预测功能的历史点，通常需要在自定义渲染（XComponent）上注册触摸事件回调获得，请参考[自定义渲染开发指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/napi-xcomponent-guidelines)，获得历史触摸点。

### 在CMake脚本中链接动态库

收起

自动换行

深色代码主题

复制

```
1. target_include_directories(entry PUBLIC ${HMOS_SDK_NATIVE}/sysroot/usr/include) # 当编译过程中报点预测头文件缺失时尝试加入此命令
2. target_link_directories(entry PUBLIC ${HMOS_SDK_NATIVE}/sysroot/usr/lib/aarch64-linux-ohos) # 当编译过程中报点预测API链接异常时尝试加入此命令
3. target_link_libraries(entry PUBLIC libace_napi.z.so libhilog_ndk.z.so libhandwrite_ndk.z.so)
```

### 导入模块

收起

自动换行

深色代码主题

复制

```
1. #include <ace/xcomponent/native_interface_xcomponent.h>
2. #include <handwrite/native_handwrite_api.h>
3. #include <hilog/log.h>
```

### 示例代码

[native\_handwrite\_api.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-handwrite-headerfile-declare)提供HMS\_HandWrite\_GetPredictPoint()接口获取预测点。

收起

自动换行

深色代码主题

复制

```
1. #include <ace/xcomponent/native_interface_xcomponent.h>
2. #include <handwrite/native_handwrite_api.h>
3. #include <hilog/log.h>

5. void DispatchTouchEvent(OH_NativeXComponent *xcomponent, void *window)
6. {
7. int32_t historicalPointSize = 0;
8. OH_NativeXComponent_HistoricalPoint *historicalPoints = nullptr;
9. if (OH_NativeXComponent_GetHistoricalPoints(xcomponent, window, &historicalPointSize, &historicalPoints) !=
10. OH_NATIVEXCOMPONENT_RESULT_SUCCESS) {
11. OH_LOG_Print(LOG_APP, LOG_ERROR, 0x0000, "PenKit", "failed to get historical points");
12. return;
13. }

15. std::vector<HandWrite_HistoricalPoint> handWriteHisPoints(historicalPointSize);
16. for (int32_t i = 0; i < historicalPointSize; ++i) {
17. handWriteHisPoints[i].x = historicalPoints[i].x;
18. handWriteHisPoints[i].y = historicalPoints[i].y;
19. handWriteHisPoints[i].timeStamp = historicalPoints[i].timeStamp;
20. handWriteHisPoints[i].force = historicalPoints[i].force;
21. }

23. float predictPointX = 0.0f;
24. float predictPointY = 0.0f;
25. int32_t errcode = HMS_HandWrite_GetPredictPoint(handWriteHisPoints.data(), historicalPointSize, &predictPointX, &predictPointY);

27. OH_LOG_Print(LOG_APP, LOG_INFO, 0x0000, "PenKit", "error code is %{public}d", errcode);
28. OH_LOG_Print(LOG_APP, LOG_INFO, 0x0000, "PenKit", "predict point is (%{public}f, %{public}f)", predictPointX, predictPointY);
29. }
```