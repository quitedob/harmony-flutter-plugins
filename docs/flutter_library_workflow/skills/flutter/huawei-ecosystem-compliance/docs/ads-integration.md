# 华为 Ads Kit（广告服务）集成指导

## 第一部分：华为 Ads Kit API 映射

### 核心 API 概览

| 功能 | 华为 Ads Kit API | 模块 | 说明 |
|------|------------------|------|------|
| 请求单广告位广告 | `new advertising.AdLoader(context).loadAd(adParam, adOptions, listener)` | `@kit.AdsKit` | 激励、插屏、开屏等广告先请求再展示 |
| 展示全屏类广告 | `advertising.showAd(ad, displayOptions, context)` | `@kit.AdsKit` | 与 `loadAd` 配套使用 |
| 展示横幅广告 | `AutoAdComponent({...})` | `@kit.AdsKit` | Banner 广告组件 |
| 展示开屏广告 | `AdComponent({...})` | `@kit.AdsKit` | 开屏/半屏开屏等组件式展示 |
| 广告状态回调 | `advertising.AdLoadListener` / `advertising.AdInteractionListener` | `@kit.AdsKit` | 监听加载结果和展示状态 |
| 获取 OAID | `identifier.getOAID()` | `@kit.AdsKit` | 仅在需要个性化广告时使用 |

### 与穿山甲/优量汇的对比

| 功能 | 穿山甲(Pangle) | 优量汇(GDT) | 华为 Ads Kit |
|------|---------------|-------------|--------------|
| 初始化 | `TTAdSdk.init()` | `GDTAdSdk.init()` | 无统一 `init()`；按广告类型直接接入 `AdLoader` / `AdComponent` |
| Banner广告 | `TTBannerAd` | `GDTBannerAd` | `AutoAdComponent` |
| 插屏广告 | `TTInterstitialAd` | `GDTInterstitialAd` | `AdLoader.loadAd(...)` + `showAd(...)` |
| 激励视频 | `TTRewardVideoAd` | `GDTRewardVideoAd` | `AdLoader.loadAd(...)` + `showAd(...)` |
| 开屏广告 | `TTSplashAd` | `GDTSplashAd` | `AdLoader.loadAd(...)` + `AdComponent` |

### Flutter 适配注意事项

- 对于原插件的全屏广告接口，应在插件内部保持原有 Dart API 语义，再映射到 `AdLoader + showAd`。
- 对于原插件公开暴露的 Banner / Splash / Native 广告组件，应保持其“可嵌入 UI 组件”语义，不能降级成单次 `MethodChannel` 调用。

---

## 第二部分：ETS 代码模板

### 2.1 导入和基础能力

```typescript
import { abilityAccessCtrl, common, PermissionRequestResult } from '@kit.AbilityKit';
import { advertising, identifier, AdComponent, AutoAdComponent } from '@kit.AdsKit';
import { BusinessError, commonEventManager } from '@kit.BasicServicesKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
```

### 2.2 请求 OAID（可选）

说明：

- `ohos.permission.APP_TRACKING_CONSENT` 在需要读取 OAID 时申请。
- 不需要个性化广告时，可完全不读取 OAID，也不必申请该权限。
- Flutter 适配时，运行时权限申请要放在插件库内部，不要丢给 Example。

```typescript
async function requestOAID(context: common.UIAbilityContext): Promise<string | undefined> {
  try {
    const atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
    const result: PermissionRequestResult =
      await atManager.requestPermissionsFromUser(context, ['ohos.permission.APP_TRACKING_CONSENT']);
    const granted = result.authResults[0] === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED;
    if (!granted) {
      return undefined;
    }
    return await identifier.getOAID();
  } catch (error) {
    const err = error as BusinessError;
    hilog.error(0xFF00, 'AdsKit', 'Failed to get OAID: %{public}s', err.message);
    return undefined;
  }
}
```

### 2.3 激励/插屏等全屏广告

说明：

- 激励、插屏、贴片等广告的关键流程是“先请求 `Advertisement`，再展示”。
- 插件内部缓存的应是 `advertising.Advertisement`，而不是虚构的 `RewardedAd` / `InterstitialAd` 对象。

```typescript
async function loadFullscreenAd(
  context: common.UIAbilityContext,
  adId: string,
  adType: number,
  onSuccess: (ad: advertising.Advertisement) => void,
  onFailure: (code: number, message: string) => void
): Promise<void> {
  const adRequestParams: advertising.AdRequestParams = {
    adId,
    adType,
    oaid: await requestOAID(context),
  };
  const adOptions: advertising.AdOptions = {};
  const adLoadListener: advertising.AdLoadListener = {
    onAdLoadFailure: (errorCode: number, errorMsg: string) => {
      onFailure(errorCode, errorMsg);
    },
    onAdLoadSuccess: (ads: Array<advertising.Advertisement>) => {
      if (ads.length > 0) {
        onSuccess(ads[0]);
      } else {
        onFailure(-1, 'No ad returned');
      }
    }
  };

  const adLoader: advertising.AdLoader = new advertising.AdLoader(context);
  adLoader.loadAd(adRequestParams, adOptions, adLoadListener);
}

function showFullscreenAd(
  ad: advertising.Advertisement,
  context: common.UIAbilityContext,
  customData?: string,
  userId?: string
): void {
  const displayOptions: advertising.AdDisplayOptions = {
    mute: true,
    customData,
    userId,
  };
  advertising.showAd(ad, displayOptions, context);
}
```

说明：

- 激励广告奖励状态通常通过公共事件订阅 `com.huawei.hms.pps.action.PPS_REWARD_STATUS_CHANGED` 处理。
- 插屏广告状态通常通过公共事件订阅 `com.huawei.hms.pps.action.PPS_INTERSTITIAL_STATUS_CHANGED` 处理。
- 如原 Flutter 插件对外暴露了奖励回调/关闭回调，需在插件内部把这些状态桥接回 Dart，而不是简化成只返回 `bool`。

### 2.4 Banner / Splash 等组件式广告

说明：

- Banner 真实入口是 `AutoAdComponent`。
- Splash 真实入口是 `AdComponent`。
- 如果原 Flutter 插件公开的是 Widget / View 语义，OHOS 侧通常需要通过 PlatformView 或等价容器承载这些 ArkUI 组件，不能退化成普通 `MethodChannel`。

```typescript
@Entry
@Component
struct BannerDemo {
  @State visibilityState: Visibility = Visibility.None;
  private adRequestParams: advertising.AdRequestParams = {
    adId: 'TEST_AD_ID',
    adType: 8,
    adWidth: 360,
    adHeight: 57,
  };
  private adOptions: advertising.AdOptions = {};
  private adDisplayOptions: advertising.AdDisplayOptions = {
    refreshTime: 30000,
  };

  build() {
    AutoAdComponent({
      adParam: this.adRequestParams,
      adOptions: this.adOptions,
      displayOptions: this.adDisplayOptions,
      interactionListener: {
        onStatusChanged: (status: string, ad: advertising.Advertisement, data: string) => {
          if (status === 'onAdLoad') {
            this.visibilityState = Visibility.Visible;
          } else if (status === 'onAdFail' || status === 'onAdClose') {
            this.visibilityState = Visibility.None;
          }
        }
      }
    })
    .visibility(this.visibilityState)
  }
}
```

---

## 第三部分：配置文件修改

### 3.1 module.json5 权限声明

```json5
{
  "module": {
    "requestPermissions": [
      {
        "name": "ohos.permission.APP_TRACKING_CONSENT",
        "reason": "$string:ads_tracking_reason",
        "usedScene": {
          "abilities": [
            "EntryAbility"
          ],
          "when": "inuse"
        }
      },
      {
        "name": "ohos.permission.INTERNET"
      }
    ]
  }
}
```

说明：

- `ohos.permission.INTERNET` 用于请求和展示广告。
- `ohos.permission.APP_TRACKING_CONSENT` 仅在需要 OAID 时声明和动态申请。
- `GET_NETWORK_INFO` 不是 Ads Kit 接入的必需权限，不要默认添加。

### 3.2 AppGallery Connect / 鲸鸿动能配置

1. 在 AppGallery Connect 中完成应用创建、签名配置和上架准备。
2. 在“增长”或对应的广告/流量变现平台中开通 Ads Kit / 鲸鸿动能流量变现能力。
3. 为不同广告形态申请对应广告位 ID。
4. Flutter 适配时，正式广告位 ID、奖励校验地址等应由宿主应用或插件配置传入，不要硬编码在插件库里。

---

## 第四部分：Flutter 适配规则

### 4.1 全屏广告

- 原 Flutter 插件若对外是 `load/show` 风格，OHOS 侧应保持这一公开接口与行为。
- 插件内部实现可映射为：
  - `load` -> `AdLoader.loadAd(...)`
  - `show` -> `advertising.showAd(...)`
  - 回调 -> `AdLoadListener` / 公共事件 / `AdInteractionListener`
- 不要为了图省事把激励、插屏广告改成仅返回固定成功值或仅返回 `bool`。

### 4.2 组件广告

- 原 Flutter 插件若对外暴露 Banner / Native / Splash Widget，OHOS 侧应保持组件语义。
- 这类场景需要承载 `AutoAdComponent` / `AdComponent`，必要时使用 PlatformView 或等价容器。
- 不能因为组件承载更复杂，就把 Banner / Splash 降级成“只支持全屏弹广告”。

### 4.3 服务端奖励校验

- 激励广告如原插件或业务依赖奖励校验，应保留 `customData`、`userId` 等展示参数的传递能力。
- 服务端验证逻辑属于服务端，不应在 Flutter 插件里伪造“本地验证通过”。

## 补充说明

- 更多 API 用法需要查询官方文档。
