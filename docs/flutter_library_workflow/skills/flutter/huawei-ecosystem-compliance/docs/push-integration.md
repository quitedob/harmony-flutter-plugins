# 华为 Push Kit（消息推送服务）集成指导

## 第一部分：华为 Push Kit API 映射

### 核心 API 概览

| 功能 | 华为 Push Kit API | 模块 | 说明 |
|------|------------------|------|------|
| 获取 Push Token | `pushService.getToken()` | `@kit.PushKit` | 获取推送 Token，建议应用启动时获取并上报服务端 |
| 删除 Push Token | `pushService.deleteToken()` | `@kit.PushKit` | 删除推送 Token，非必要不要主动调用 |
| 监听 Token 更新 | `pushService.on('tokenUpdate', ability, callback)` | `@kit.PushKit` | 仅部分设备/场景支持，按官方文档确认后使用 |
| 获取 AAID | `AAID.getAAID()` | `@kit.PushKit` | 获取匿名应用标识 |
| 删除 AAID | `AAID.deleteAAID()` | `@kit.PushKit` | 删除匿名应用标识，非必要不要主动调用 |
| 查询通知授权 | `notificationManager.isNotificationEnabled()` | `@kit.NotificationKit` | 查询是否允许发送通知 |
| 请求通知授权 | `notificationManager.requestEnableNotification(context)` | `@kit.NotificationKit` | 首次调用可弹窗请求通知授权 |
| 打开通知设置 | `notificationManager.openNotificationSettings(context)` | `@kit.NotificationKit` | 用户拒绝后，引导去设置页再次开启 |

---

## 第二部分：ETS 代码模板

### 2.1 导入和类型定义

```typescript
import { AAID, pushService } from '@kit.PushKit';
import { notificationManager } from '@kit.NotificationKit';
import { common } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';
```

### 2.2 Push 服务单例类

```typescript
// ohos/src/main/ets/services/PushService.ets

import { AAID, pushService } from '@kit.PushKit';
import { notificationManager } from '@kit.NotificationKit';
import { common } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';

const TAG = '[PushService]';
const DOMAIN = 0xFF00;

export class HuaweiPushService {
  private static instance: HuaweiPushService;
  private context: common.UIAbilityContext | null = null;
  private pushToken: string = '';

  static getInstance(): HuaweiPushService {
    if (!HuaweiPushService.instance) {
      HuaweiPushService.instance = new HuaweiPushService();
    }
    return HuaweiPushService.instance;
  }

  setContext(context: common.UIAbilityContext): void {
    this.context = context;
  }

  // 获取 Push Token
  async getPushToken(): Promise<string> {
    if (this.pushToken) {
      return this.pushToken;
    }

    try {
      const token = await pushService.getToken();
      this.pushToken = token;
      hilog.info(DOMAIN, TAG, 'Push token obtained');
      return token;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Failed to get push token: %{public}s', err.message);
      return '';
    }
  }

  // 删除 Push Token
  async deletePushToken(): Promise<boolean> {
    try {
      await pushService.deleteToken();
      this.pushToken = '';
      hilog.info(DOMAIN, TAG, 'Push token deleted');
      return true;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Failed to delete push token: %{public}s', err.message);
      return false;
    }
  }

  // 获取 AAID
  async getAAID(): Promise<string> {
    try {
      const aaid = await AAID.getAAID();
      hilog.info(DOMAIN, TAG, 'AAID obtained');
      return aaid;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Failed to get AAID: %{public}s', err.message);
      return '';
    }
  }

  async isNotificationEnabled(): Promise<boolean> {
    try {
      return await notificationManager.isNotificationEnabled();
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Failed to check notification permission: %{public}s', err.message);
      return false;
    }
  }

  async requestNotificationPermission(): Promise<boolean> {
    if (!this.context) {
      hilog.error(DOMAIN, TAG, 'UIAbilityContext is required for notification permission');
      return false;
    }

    try {
      const enabled = await notificationManager.isNotificationEnabled();
      if (enabled) {
        return true;
      }
      await notificationManager.requestEnableNotification(this.context);
      return await notificationManager.isNotificationEnabled();
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      if (err.code === 1600004) {
        hilog.error(DOMAIN, TAG, 'Notification permission denied by user');
      } else {
        hilog.error(DOMAIN, TAG, 'Failed to request notification permission: %{public}s', err.message);
      }
      return false;
    }
  }

  async openNotificationSettings(): Promise<boolean> {
    if (!this.context) {
      hilog.error(DOMAIN, TAG, 'UIAbilityContext is required to open notification settings');
      return false;
    }

    try {
      await notificationManager.openNotificationSettings(this.context);
      return true;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Failed to open notification settings: %{public}s', err.message);
      return false;
    }
  }
}
```

> Flutter 插件入口、MethodChannel 名称、Dart API、EventChannel 和返回数据结构必须以原插件源码为准，若原插件暴露主题/标签/别名等能力，需按 Push Kit 官方客户端/服务端能力重新规划；不得假设 API 存在。若插件需要展示通知或依赖用户打开通知授权，必须在插件库内部用真实 `UIAbilityContext` 检查/申请通知授权，不要把责任留给 Example。

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
      }
    ]
  }
}
```

> 需要动态处理“通知授权”：调用 `notificationManager.isNotificationEnabled()` 检查，未授权时调用 `requestEnableNotification(context)`；若用户已拒绝，改为 `openNotificationSettings(context)` 引导去设置页开启。

### 3.2 oh-package.json5 依赖声明

```json5
{
  "name": "<actual_plugin_ohos_package>",
  "version": "1.0.0",
  "description": "Flutter plugin with Huawei Push Kit integration",
  "main": "index.ets",
  "dependencies": {
    "@ohos/flutter_ohos": "latest"
  }
}
```

> **注意**：Push Kit 作为 HarmonyOS 系统 Kit，无需额外添加依赖，直接通过 `@kit.PushKit` 导入即可。

---

## 第四部分：平台判断代码处理

### 4.1 Dart 层平台判断

- 若原插件已有平台分支，按原 API 和原返回结构补 `Platform.isOhos` 分支。
- 若原插件是 federated plugin，优先新增/注册 OHOS platform implementation，不要绕过既有平台接口。
- 公开 API 必须保持兼容。

## 补充说明

- 更多 API 用法需要查询官方文档。
