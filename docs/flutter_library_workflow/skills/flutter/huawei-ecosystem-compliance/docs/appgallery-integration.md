# AppGallery Kit（应用市场服务）集成指导

> 重要：应用更新类插件必须使用本生态规则。HarmonyOS 不支持插件自行下载 APK/HAP、静默安装、下载并安装自身包或其他应用包。凡涉及自身更新、安装包下载、应用安装、应用下载其他应用，都必须使用“应用市场检查更新 API”或“跳转应用市场 API”。

## 1. 能力选择

| 场景 | 使用能力 | 关键 API |
|------|----------|----------|
| 检查本应用是否有新版本 | AppGallery 更新功能 | `updateManager.checkAppUpdate(context)` |
| 展示系统更新弹窗 | AppGallery 更新功能 | `updateManager.showUpdateDialog(context)` |
| 打开其他应用详情 / 引导安装 | AppGallery 应用详情 | `productViewManager.loadProduct(context, want, callback)` |
| Deep Linking 打开应用详情 | 应用市场 Deep Linking | `startAbility({ action: 'ohos.want.action.appdetail', uri: 'store://appgallery.huawei.com/app/detail?id=<bundleName>' })` |
| 应用内评论当前应用 | AppGallery 评论服务 | `commentManager.showCommentDialog(context)` |
| 未安装应用的下载承接 | App Linking 直达应用市场 | `UIAbilityContext.openLink(link, { appLinkingOnly: false })` |

禁止使用伪造的 `appgallery` 命名空间、非官方应用市场 URI、Android Intent action。

## 2. 自身应用更新

```typescript
import { updateManager } from '@kit.AppGalleryKit';
import type { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

async function checkAppUpdate(context: common.UIAbilityContext): Promise<boolean> {
  try {
    const result = await updateManager.checkAppUpdate(context);
    return result.updateAvailable === updateManager.UpdateAvailableCode.LATER_VERSION_EXIST;
  } catch (error) {
    const err = error as BusinessError;
    throw new Error(`checkAppUpdate failed: ${err.code} ${err.message}`);
  }
}

async function showUpdateDialog(context: common.UIAbilityContext): Promise<number> {
  try {
    return await updateManager.showUpdateDialog(context);
  } catch (error) {
    const err = error as BusinessError;
    throw new Error(`showUpdateDialog failed: ${err.code} ${err.message}`);
  }
}
```

## 补充说明

- 更多 API 用法需要查询官方文档。

约束：
- 必须使用真实 `UIAbilityContext`，在 Flutter 插件中通过 `AbilityAware` 获取。
- 不支持模拟器，需真机调试。
- 应用必须已在应用市场上架。
- 本地安装版本低于应用市场在架版本，且签名信息一致，才能检查到更新。
- `checkAppUpdate` / `showUpdateDialog` 需在应用前台调用。

## 3. 打开应用详情 / 引导安装

应用内打开应用市场详情页，优先使用 `productViewManager.loadProduct()`。

```typescript
import { productViewManager } from '@kit.AppGalleryKit';
import type { common, Want } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

function openAppDetail(context: common.UIAbilityContext, bundleName: string): void {
  const want: Want = {
    parameters: {
      bundleName: bundleName
    }
  };
  const callback: productViewManager.ProductViewCallback = {
    onError: (error: BusinessError) => {
      throw new Error(`loadProduct failed: ${error.code} ${error.message}`);
    }
  };
  productViewManager.loadProduct(context, want, callback);
}
```

若业务更适合 Deep Linking，可使用官方应用详情链接：

```typescript
import type { common, Want } from '@kit.AbilityKit';

async function openAppDetailByLink(context: common.UIAbilityContext, bundleName: string): Promise<void> {
  const want: Want = {
    action: 'ohos.want.action.appdetail',
    uri: `store://appgallery.huawei.com/app/detail?id=${bundleName}`
  };
  await context.startAbility(want);
}
```

## 4. 应用评论

应用内评论当前应用使用 `commentManager.showCommentDialog()`。

```typescript
import { commentManager } from '@kit.AppGalleryKit';
import type { common } from '@kit.AbilityKit';

async function showCommentDialog(context: common.UIAbilityContext): Promise<void> {
  await commentManager.showCommentDialog(context);
}
```

约束：
- 从 6.0.0(20) 开始支持。
- 不支持模拟器，需真机调试。
- 若业务要求“写评论页跳转”，使用官方 Deep Linking / App Linking 路径，不要拼接 `comment=true` 这类非官方参数。

## 5. Planning / Coding 注意事项

- `app_update` 需求不要规划为“下载安装包 + 安装应用”；HarmonyOS 端不支持下载安装任何软件包，只需要规划更新检查、系统更新弹窗，并跳转应用市场详情页。
- 没有在本指南中确认的 API，不要编造。
- 所有 API 签名以 `@kit.AppGalleryKit` 和当前 SDK `.d.ts` 为准；如需新增 AppGallery 场景，先查官方文档和 SDK 声明。

## 7 module.json5 权限声明

```json5
{
  "module": {
    "requestPermissions": [
      {
        "name": "ohos.permission.INTERNET"
      }
    ]
  }
}
```

## 补充说明

- 更多 API 用法需要查询官方文档。
