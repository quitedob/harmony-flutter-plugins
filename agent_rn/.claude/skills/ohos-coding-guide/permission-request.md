# user_grant 权限动态请求指南

## 背景

鸿蒙权限分为两种授权方式：

| 授权方式 | 说明 | 处理方式 |
|----------|------|----------|
| `system_grant` | 安装时自动授予 | 只需在 `module.json5` 声明 |
| `user_grant` | 需用户运行时授权 | `module.json5` 声明 + ETS 代码动态请求 |

**user_grant 权限必须在调用相关 API 前动态请求用户授权**，否则会报权限错误（错误码 201）。

## 判断权限类型

查看 `02-planning.json` 的 `permission_mapping`：

```json
{
  "permission_mapping": [
    {
      "ohos_permission": "ohos.permission.APPROXIMATELY_LOCATION",
      "permission_level": "normal",
      "grant_type": "user_grant",
      "needs_user_grant": true
    },
    {
      "ohos_permission": "ohos.permission.INTERNET",
      "permission_level": "normal",
      "grant_type": "system_grant",
      "needs_user_grant": false
    }
  ]
}
```

- `grant_type: "user_grant"` → 需要动态请求
- `grant_type: "system_grant"` → 无需动态请求

## ETS 动态请求权限代码

### 1. 导入必要模块

```typescript
import abilityAccessCtrl, { Permissions } from '@ohos.abilityAccessCtrl';
import common from '@ohos.app.ability.common';
```

### 2. 定义权限常量

```typescript
const LOCATION_PERMISSIONS: Permissions[] = [
  'ohos.permission.APPROXIMATELY_LOCATION',
  'ohos.permission.LOCATION',
];
```

### 3. 实现权限请求方法

```typescript
/**
 * 检查并请求权限
 * @param permissions 需要请求的权限列表
 * @returns Promise<boolean> 是否已获得权限
 */
private async requestPermission(permissions: Permissions[]): Promise<boolean> {
  const context = this.ctx.uiAbilityContext as common.UIAbilityContext;
  const atManager = abilityAccessCtrl.createAtManager();

  try {
    // 先检查第一个权限是否已授权
    const grantStatus = await atManager.checkAccessToken(
      context.applicationInfo.accessTokenId,
      permissions[0],
    );

    if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
      // 如果有多个权限，检查其余权限
      if (permissions.length > 1) {
        for (const perm of permissions.slice(1)) {
          const status = await atManager.checkAccessToken(
            context.applicationInfo.accessTokenId,
            perm,
          );
          if (status !== abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
            // 有权限未授予，请求全部权限
            const result = await atManager.requestPermissionsFromUser(
              context,
              permissions,
            );
            return result.authResults.every(r => r === 0);
          }
        }
      }
      return true;
    }

    // 权限未授予，请求用户授权
    const result = await atManager.requestPermissionsFromUser(
      context,
      permissions,
    );
    return result.authResults.every(r => r === 0);
  } catch (err) {
    hilog.error(LOG_DOMAIN, LOG_TAG, 'Permission request failed: %{public}s', JSON.stringify(err));
    return false;
  }
}
```

### 4. 在 TurboModule 方法中调用

调用需要权限的 API 前，先请求权限：

```typescript
async getCurrentPosition(options: TM.RNGetLocation.NativeOptions): Promise<TM.RNGetLocation.Location> {
  // 根据是否需要精确定位选择权限
  const permissions: Permissions[] = options.enableHighAccuracy
    ? ['ohos.permission.APPROXIMATELY_LOCATION', 'ohos.permission.LOCATION']
    : ['ohos.permission.APPROXIMATELY_LOCATION'];

  // 动态请求权限
  const hasPermission = await this.requestPermission(permissions);
  if (!hasPermission) {
    // 用户拒绝授权，抛出权限错误
    throw {
      code: 'UNAUTHORIZED',
      message: 'Location permission not granted',
    };
  }

  // 权限已授予，调用 API
  const location = await geoLocationManager.getCurrentLocation(request);
  return location;
}
```

## module.json5 配置

无论 `system_grant` 还是 `user_grant`，都需要在 `module.json5` 中声明：

```json5
{
  "module": {
    "requestPermissions": [
      {
        "name": "ohos.permission.APPROXIMATELY_LOCATION",
        "reason": "$string:location_reason",
        "usedScene": {
          "abilities": ["EntryAbility"],
          "when": "inuse"
        }
      },
      {
        "name": "ohos.permission.LOCATION",
        "reason": "$string:location_reason",
        "usedScene": {
          "abilities": ["EntryAbility"],
          "when": "inuse"
        }
      }
    ]
  }
}
```

**user_grant 权限必须添加 `reason` 字段**，用于向用户展示权限用途说明。

## 常见 user_grant 权限

| 权限 | 说明 |
|------|------|
| `ohos.permission.CAMERA` | 相机 |
| `ohos.permission.MICROPHONE` | 麦克风 |
| `ohos.permission.APPROXIMATELY_LOCATION` | 大概位置 |
| `ohos.permission.LOCATION` | 精确位置 |
| `ohos.permission.READ_MEDIA` | 读取媒体文件 |
| `ohos.permission.WRITE_MEDIA` | 写入媒体文件 |
| `ohos.permission.READ_CALENDAR` | 读取日历 |
| `ohos.permission.WRITE_CALENDAR` | 写入日历 |

## 注意事项

- **必须先请求权限再调用 API**：未授权调用会报错 201
- **用户可能拒绝**：拒绝时应抛出错误，不要继续执行
- **权限可能被收回**：每次调用 API 前都应检查权限状态
- **多个权限同时请求**：使用数组一次性请求，避免多次弹窗