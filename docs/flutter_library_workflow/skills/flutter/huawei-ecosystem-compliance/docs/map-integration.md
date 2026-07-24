# 华为 Map Kit + Location Kit（地图与定位服务）集成指导

> 本文主要用于实现原生定位与地图能力时，HarmonyOS 使用 Location Kit / Map Kit。地图 API 很多，涉及路线规划、POI、地图 Picker、导航、静态图、坐标转换等能力时，继续用 `harmonyos-docs-lookup` / `harmonyos-sdk-api-lookup` 查询官方文档和 SDK 声明后再写。
若原插件使用第三方地图，请优先选择第三方地图SDK。

## 第一部分：华为 Map Kit + Location Kit API 映射

### Map Kit 核心 API

| 功能 | 华为 Map Kit API | 模块 | 说明 |
|------|-----------------|------|------|
| 创建地图 | `MapComponent` | `@kit.MapKit` | 地图组件 |
| 添加标记 | `mapCommon.MarkerOptions` + `MapComponentController.addMarker()` | `@kit.MapKit` | 添加地图标记，返回 `map.Marker` |
| 定位到位置 | `map.newLatLng()` / `map.newCameraPosition()` + `MapComponentController.moveCamera()` | `@kit.MapKit` | `moveCamera` 需要 `CameraUpdate`，不要直接传 `CameraPosition` |
| 添加覆盖物 | `mapCommon.MapPolylineOptions` / `mapCommon.MapPolygonOptions` | `@kit.MapKit` | 绘制线条和区域 |

### Location Kit 核心 API

| 功能 | 华为 Location Kit API | 模块 | 说明 |
|------|---------------------|------|------|
| 获取当前位置 | `geoLocationManager.getCurrentLocation()` | `@kit.LocationKit` | 获取单次位置 |
| 持续定位 | `geoLocationManager.on('locationChange', request, callback)` | `@kit.LocationKit` | 持续监听位置变化；`on` 返回 `void` |
| 逆地理编码 | `geoLocationManager.getAddressesFromLocation()` | `@kit.LocationKit` | 坐标转地址 |
| 地理编码 | `geoLocationManager.getAddressesFromLocationName()` | `@kit.LocationKit` | 地址转坐标 |

### 与高德/百度地图的对比

| 功能 | 高德地图 | 百度地图 | 华为 Map Kit |
|------|---------|---------|--------------|
| 显示地图 | `AMapView` | `BaiduMapView` | `MapComponent` |
| 添加标记 | `MarkerOptions` | `MarkerOptions` | `MarkerOptions` |
| 定位 | `AMapLocationClient` | `LocationClient` | `geoLocationManager` |
| 路线规划 | `RouteSearch` | `RoutePlanSearch` | Map Kit 路径规划能力，具体 API 必须查官方文档 |

---

## 第二部分：ETS 代码模板

### 2.1 导入和类型定义

```typescript
import { MapComponent, map, mapCommon } from '@kit.MapKit';
import { geoLocationManager } from '@kit.LocationKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';
import {
  FlutterPlugin,
  FlutterPluginBinding,
  MethodCall,
  MethodCallHandler,
  MethodChannel,
  MethodResult,
} from '@ohos/flutter_ohos';
```

### 2.2 定位服务类

```typescript
// ohos/src/main/ets/services/LocationService.ets

import { geoLocationManager } from '@kit.LocationKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';

const TAG = '[LocationService]';
const DOMAIN = 0xFF00;

export class HuaweiLocationService {
  private static instance: HuaweiLocationService;
  private locationCallback: ((location: geoLocationManager.Location) => void) | null = null;

  static getInstance(): HuaweiLocationService {
    if (!HuaweiLocationService.instance) {
      HuaweiLocationService.instance = new HuaweiLocationService();
    }
    return HuaweiLocationService.instance;
  }

  // 获取当前位置（单次）
  async getCurrentLocation(): Promise<{ latitude: number; longitude: number; accuracy: number } | null> {
    try {
      const requestInfo: geoLocationManager.SingleLocationRequest = {
        locatingPriority: geoLocationManager.LocatingPriority.PRIORITY_LOCATING_SPEED,
        locatingTimeoutMs: 10000,
      };

      const location = await geoLocationManager.getCurrentLocation(requestInfo);

      return {
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
      };
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Failed to get current location: %{public}s', err.message);
      return null;
    }
  }

  // 开始持续定位
  async startLocationUpdates(callback: (location: geoLocationManager.Location) => void): Promise<boolean> {
    try {
      const requestInfo: geoLocationManager.ContinuousLocationRequest = {
        interval: 5,
        locationScenario: geoLocationManager.UserActivityScenario.NAVIGATION,
      };

      this.locationCallback = callback;
      geoLocationManager.on('locationChange', requestInfo, this.locationCallback);
      hilog.info(DOMAIN, TAG, 'Location updates started');
      return true;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Failed to start location updates: %{public}s', err.message);
      return false;
    }
  }

  // 停止持续定位
  stopLocationUpdates(): void {
    if (this.locationCallback !== null) {
      geoLocationManager.off('locationChange', this.locationCallback);
      this.locationCallback = null;
      hilog.info(DOMAIN, TAG, 'Location updates stopped');
    }
  }

  // 逆地理编码（坐标转地址）
  async getAddressFromLocation(latitude: number, longitude: number): Promise<string | null> {
    try {
      const reverseGeoRequest: geoLocationManager.ReverseGeoCodeRequest = {
        latitude: latitude,
        longitude: longitude,
        maxItems: 1,
      };

      const addresses = await geoLocationManager.getAddressesFromLocation(reverseGeoRequest);
      if (addresses && addresses.length > 0) {
        const address = addresses[0];
        return `${address.countryName ?? ''}${address.adminArea ?? ''}${address.locality ?? ''}${address.roadName ?? ''}`;
      }
      return null;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Reverse geocoding failed: %{public}s', err.message);
      return null;
    }
  }

  // 地理编码（地址转坐标）
  async getLocationFromAddress(address: string): Promise<{ latitude: number; longitude: number } | null> {
    try {
      const geoRequest: geoLocationManager.GeoCodeRequest = {
        description: address,
        maxItems: 1,
      };

      const locations = await geoLocationManager.getAddressesFromLocationName(geoRequest);
      if (locations && locations.length > 0) {
        const location = locations[0];
        return {
          latitude: location.latitude,
          longitude: location.longitude,
        };
      }
      return null;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Geocoding failed: %{public}s', err.message);
      return null;
    }
  }
}
```

### 2.3 地图服务类

```typescript
// ohos/src/main/ets/services/MapService.ets

import { map, mapCommon } from '@kit.MapKit';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = '[MapService]';
const DOMAIN = 0xFF00;

export class HuaweiMapService {
  private static instance: HuaweiMapService;
  private mapController: map.MapComponentController | null = null;
  private markers: Map<string, map.Marker> = new Map();
  private markerSeq: number = 0;

  static getInstance(): HuaweiMapService {
    if (!HuaweiMapService.instance) {
      HuaweiMapService.instance = new HuaweiMapService();
    }
    return HuaweiMapService.instance;
  }

  // 设置地图控制器
  setMapController(controller: map.MapComponentController): void {
    this.mapController = controller;
  }

  // 移动到指定位置
  moveToLocation(latitude: number, longitude: number, zoom: number = 15): void {
    if (!this.mapController) {
      hilog.error(DOMAIN, TAG, 'Map controller not initialized');
      return;
    }

    const cameraPosition: mapCommon.CameraPosition = {
      target: { latitude, longitude },
      zoom: zoom,
    };

    this.mapController.moveCamera(map.newCameraPosition(cameraPosition));
  }

  // 添加标记
  async addMarker(latitude: number, longitude: number, title: string, snippet: string): Promise<string | null> {
    if (!this.mapController) {
      hilog.error(DOMAIN, TAG, 'Map controller not initialized');
      return null;
    }

    try {
      const markerOptions: mapCommon.MarkerOptions = {
        position: { latitude, longitude },
        title: title,
        snippet: snippet,
      };

      const marker = await this.mapController.addMarker(markerOptions);
      const markerId = `marker_${++this.markerSeq}`;
      this.markers.set(markerId, marker);
      hilog.info(DOMAIN, TAG, 'Marker added: %{public}s', markerId);
      return markerId;
    } catch (error) {
      hilog.error(DOMAIN, TAG, 'Failed to add marker: %{public}s', JSON.stringify(error));
      return null;
    }
  }

  // 移除标记
  removeMarker(markerId: string): void {
    if (!this.mapController) return;
    const marker = this.markers.get(markerId);
    if (marker) {
      marker.remove();
      this.markers.delete(markerId);
    }
  }

  // 清除所有标记
  clearAllMarkers(): void {
    if (!this.mapController) return;
    this.mapController.clear();
    this.markers.clear();
  }
}
```

> Flutter 插件入口、MethodChannel 名称、Dart API 和返回数据结构必须以原插件源码为准。

---

## 第三部分：配置文件修改

### 3.1 module.json5 权限声明

```json5
{
  "module": {
    "name": "entry",
    "type": "har",
    "requestPermissions": [
      {
        "name": "ohos.permission.INTERNET"
      },
      {
        "name": "ohos.permission.GET_NETWORK_INFO"
      },
      {
        "name": "ohos.permission.LOCATION"
      },
      {
        "name": "ohos.permission.APPROXIMATELY_LOCATION"
      }
    ]
  }
}
```

> 运行时权限必须由插件库内部通过真实 `UIAbilityContext` 申请；仅在 `module.json5` 声明权限不等于已授权。前台模糊定位申请 `APPROXIMATELY_LOCATION`，精准定位需同时申请 `APPROXIMATELY_LOCATION` 和 `LOCATION`。

### 3.2 AppGallery Connect 配置

1. 登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)
2. 在「API 管理」中启用「地图服务」和「定位服务」
3. 配置应用签名

---

## 第四部分：平台判断代码处理

### 4.1 Dart 层平台判断

- 若原插件已有平台分支，按原 API 和原返回结构补 `Platform.isOhos` 分支。
- 若原插件是 federated plugin，优先新增/注册 OHOS platform implementation，不要绕过既有平台接口。

## 补充说明

- 更多 API 用法需要查询官方文档。
