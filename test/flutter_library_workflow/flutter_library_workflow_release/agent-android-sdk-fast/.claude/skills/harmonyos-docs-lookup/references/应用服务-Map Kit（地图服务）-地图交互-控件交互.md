## 场景介绍

本章节将向您介绍如何使用地图的控件。

控件是指浮在地图组件上的一系列用于操作地图的组件，例如缩放按钮![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/32/v3/clEoG8p9SyWysyZwqtVrLg/zh-cn_image_0000002517280067.png?HW-CC-KV=V1&HW-CC-Date=20260414T031529Z&HW-CC-Expire=86400&HW-CC-Sign=DB013CB8A03681F44113BB883E5B703C80886FA3F09ECFD68014A0BAC18E7CD0)、定位按钮![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d0/v3/PPSAkKOAQ9SF8SES_bclqQ/zh-cn_image_0000002485000160.png?HW-CC-KV=V1&HW-CC-Date=20260414T031529Z&HW-CC-Expire=86400&HW-CC-Sign=E8BAA8F8FDC2AFFFFA48A8816EBF0A078467B3F72E13B8AB357847E673EEEE2C)、比例尺![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/aa/v3/I_NqFomdThiQ9uqbCR0RZQ/zh-cn_image_0000002485160130.png?HW-CC-KV=V1&HW-CC-Date=20260414T031529Z&HW-CC-Expire=86400&HW-CC-Sign=33E2F3A4900A6B4BBF8BF5EC467B2874DC550B8B1784BA0FCC21BC71ADFD012D)等。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a1/v3/7F9UWIAgRkCO5NBMkdWy7Q/zh-cn_image_0000002542438251.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031529Z&HW-CC-Expire=86400&HW-CC-Sign=B7DD385BFC0DC8265156341F5C6A5ECF01026DD3B1792DA57729FDB55DC92604 "点击放大")

## 接口说明

以下是地图的控件相关接口，该功能有2种实现方式：

* 地图初始化时，可在初始化参数[MapOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section816451553012)中设置是否启用控件功能，详细讲解见[显示地图](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/map-presenting)章节。
* 通过调用[MapComponentController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section816451553012)提供的set方法实现相关控件的开启或关闭。

展开

| 接口名 | 描述 |
| --- | --- |
| [setZoomControlsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section4116897186)(enabled: boolean): void | 设置是否启用缩放控制器。 |
| [setMyLocationEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section201759451313)(myLocationEnabled: boolean): void | 设置是否启用我的位置图层。 |
| [setMyLocationControlsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section3464719101814)(enabled: boolean): void | 设置是否启用我的位置按钮。 |
| [setScaleControlsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section1845222318187)(enabled: boolean): void | 设置是否启用比例尺。 |
| [setScalePosition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section8413193042817)(point: [mapCommon.MapPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section123881566186)): void | 设置比例尺控件的位置。 |
| [setAlwaysShowScaleEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section3541416552)(enabled: boolean): void | 设置是否始终显示比例尺。 |
| [setCompassControlsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section1964925785515)(enabled: boolean): void | 设置是否启用指南针。 |
| [setLogoAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section2538830161810)(alignment: [mapCommon.LogoAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section892653673414)): void | 设置地图Logo的对齐方式。 |

## 开发步骤

mapController对象在初始化地图时获取，初始化地图功能在[显示地图](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/map-presenting)章节中有详细讲解。

### 缩放控件

Map Kit提供了内置的缩放控件，默认情况下是开启的。

收起

自动换行

深色代码主题

复制

```
1. // 开启缩放控件
2. this.mapController.setZoomControlsEnabled(true);
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a5/v3/AZNK3smUQHqV_CPQowCiiA/zh-cn_image_0000002542358293.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031529Z&HW-CC-Expire=86400&HW-CC-Sign=344BCC20304C3DCCB9A755324430A9BF634D3190816D7775379C96FEB3B63002 "点击放大")

### 比例尺

Map Kit提供了内置的比例尺控件，默认情况下是关闭的。

收起

自动换行

深色代码主题

复制

```
1. // 开启比例尺控件
2. this.mapController.setScaleControlsEnabled(true);
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6d/v3/hE9l_ckCRwGBgPqGkQtnOQ/zh-cn_image_0000002510998392.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031529Z&HW-CC-Expire=86400&HW-CC-Sign=91E76F331E79F42645F440D23941D2C287924EABC6760F777437E93AF5B7A026 "点击放大")

**调整比例尺位置：**

可通过[setScalePosition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section8413193042817)方法设置比例尺控件的位置。

收起

自动换行

深色代码主题

复制

```
1. let point: mapCommon.MapPoint = {
2. // 以当前地图组件左上角为原点，向右移动1000px
3. positionX: 1000,
4. // 以当前地图组件左上角为原点，向下移动1000px
5. positionY: 1000
6. };
7. this.mapController.setScalePosition(point);
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c9/v3/OUPf-xncTmyk637m3cp8Pg/zh-cn_image_0000002542438651.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031529Z&HW-CC-Expire=86400&HW-CC-Sign=12EBC796BA186B8D38ACBDF8B1C6ACA6FDD3549EE71B6334EC8C0DEEFE1B9601 "点击放大")

**获取当前层级的比例尺大小：**

可通过[getScaleLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section19511102142917)方法获取当前层级比例尺大小。

收起

自动换行

深色代码主题

复制

```
1. let level = this.mapController.getScaleLevel();
```

**获取比例尺控件宽高：**

可通过[getScaleControlsHeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section155328471187)和[getScaleControlsWidth](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section192221515111317)方法获取当前比例尺控件宽高。

收起

自动换行

深色代码主题

复制

```
1. // 获取比例尺控件的高度
2. let height = this.mapController.getScaleControlsHeight();
3. // 获取比例尺控件的宽度
4. let width = this.mapController.getScaleControlsWidth();
```

**设置比例尺控件常显：**

可通过[setAlwaysShowScaleEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section3541416552)方法设置比例尺控件常显，通过[isAlwaysShowScaleEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section197705711554)方法查询比例尺控件是否常显。

收起

自动换行

深色代码主题

复制

```
1. // 设置比例尺控件常显
2. this.mapController.setAlwaysShowScaleEnabled(true);
3. // 查询比例尺控件是否常显
4. let scaleEnabled: boolean = this.mapController.isAlwaysShowScaleEnabled();
```

### 指南针

Map Kit提供了内置的指南针控件，默认情况下是开启的，控件位置默认显示在地图的右上角。如果是启用状态，当地图不是指向正北方向或者发生倾斜时，地图右上角会显示一个指南针图标，点击指南针可使地图旋转为正北方向并且取消倾斜；当地图为正北方向且未发生倾斜时，指南针图标隐藏。如果是禁用状态，将不会显示指南针图标。

收起

自动换行

深色代码主题

复制

```
1. // 开启指南针控件
2. this.mapController.setCompassControlsEnabled(true);
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cc/v3/gPvAzIO1Tu6gw_mo81VHqQ/zh-cn_image_0000002542359115.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031529Z&HW-CC-Expire=86400&HW-CC-Sign=131BBC30B0702E3C93FBD31203C6320F3097F8E4578337743D6C10955C376088 "点击放大")

**调整指南针位置：**

可通过[setCompassPosition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section285112882417)方法设置指南针控件的位置。

收起

自动换行

深色代码主题

复制

```
1. let point: mapCommon.MapPoint = {
2. // 以当前地图组件左上角为原点，向右移动1000px
3. positionX: 1000,
4. // 以当前地图组件左上角为原点，向下移动1000px
5. positionY: 1000
6. };
7. this.mapController.setCompassPosition(point);
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c/v3/5SbCip8VQ2qvb02qPkgIYQ/zh-cn_image_0000002542439225.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031529Z&HW-CC-Expire=86400&HW-CC-Sign=820530651C3463E433EF89071841B41B2E48CFB55E56EE7DE9EA19B558098FA5 "点击放大")

### 地图Logo

Map Kit提供了调整地图Logo对齐方式的方法[setLogoAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section2538830161810)和调整地图边界与Logo之间的间距的方法[setLogoPadding](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section115618542213)。需注意，地图Logo不允许被遮挡，可通过[setLogoPadding](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section115618542213)方法设置地图边界区域，来避免logo被遮挡。

收起

自动换行

深色代码主题

复制

```
1. // 将Logo放置在右下角位置
2. this.mapController.setLogoAlignment(mapCommon.LogoAlignment.BOTTOM_END);
3. // 设置地图边界与Logo之间的间距，单位：px
4. let padding: mapCommon.Padding = {
5. right: 50,
6. bottom: 50
7. };
8. this.mapController.setLogoPadding(padding);
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b0/v3/LTaS4xqzQXeh3cEl7QoHlA/zh-cn_image_0000002510999316.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031529Z&HW-CC-Expire=86400&HW-CC-Sign=B4937A66BEEF20C318FCA4135D2EAF268085858127E6375625B95ACD6F9465F6 "点击放大")