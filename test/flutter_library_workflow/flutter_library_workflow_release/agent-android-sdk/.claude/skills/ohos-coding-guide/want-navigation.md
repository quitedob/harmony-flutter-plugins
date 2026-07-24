# OHOS Want 跳转通用规则

## 适用条件

- 插件需要把 Android `Intent + startActivity` 迁移为 HarmonyOS `Want + startAbility`
- 场景包括系统设置页、应用市场、浏览器、短信、邮件、分享面板、三方页面拉起

---

## 第一部分：核心规则

- Android 的 `action`、`uri`、`extras` 不能直接照搬到 HarmonyOS；必须改写为目标 Ability 实际识别的 `action`、`uri`、`parameters`。
- `startAbility` 成功只代表“有目标 Ability 可拉起”，不代表参数语义已经生效；系统页、设置子页、市场页、短信页等都要核对官方示例。
- 对浏览器、设置页、系统面板、应用市场、分享面板、三方页面跳转，优先使用已有专用 API；只有没有专用 API、且官方给出固定 Want 时，才写死 Want。
- 若插件语义有更直接的系统 API（如拨号、评论弹窗、系统分享），优先用专用 Kit，不要为了形式统一强行改成 Want。

---

## 第二部分：通用写法

```ets
import { common, Want } from '@kit.AbilityKit';

private context: common.UIAbilityContext | null = null;

private async startAbilityWithWant(want: Want): Promise<void> {
  if (this.context === null) {
    throw new Error('UIAbilityContext is null');
  }
  await this.context.startAbility(want);
}
```

说明：

- 需要 `UIAbilityContext` 时，插件应通过 `AbilityAware` 在 `onAttachedToAbility` 中获取。
- 纯后台能力不要默认持有 `ApplicationContext` 就去做界面跳转。

---

## 第三部分：高频映射参考

| 场景 | OHOS 推荐写法 | 说明 |
|------|---------------|------|
| 打开应用市场详情页 | 优先 `productViewManager.loadProduct(context, want)`；也可用 Deep Linking 或 App Linking | 三种官方方式都已确认，应用内打开应用市场推荐 `loadProduct` |
| 打开应用市场写评论页 | `action: 'ohos.want.action.appdetail'`, `uri: 'store://appgallery.huawei.com/app/detail?id=<bundleName>&action=write-review'` | 本地文档已确认；若只是应用内评论，优先 `commentManager.showCommentDialog()` |
| 打开浏览器 / 外部网页 | `action: 'ohos.want.action.viewData'`, `uri: 'https://...'`, 建议补 `entities: ['entity.system.browsable']` | 本地文档已确认 |
| 发送短信 | `bundleName: 'com.ohos.mms'`, `action: 'ohos.want.action.viewData'`, `uri: 'sms:<phone>?body=<encodedBody>'` | 本地文档已确认；正文需 URL encode |
| 撰写邮件 | `action: 'ohos.want.action.viewData'`, `uri: 'mailto:<email>'` | 保留 `mailto:` 用户意图；`subject/body/cc/bcc` 不要臆造参数承载 |
| 打开蓝牙设置 | `bundleName: 'com.huawei.hmos.settings'`, `abilityName: 'com.huawei.hmos.settings.MainAbility'`, `uri: 'bluetooth_entry'` | 本地文档已确认，禁止隐式 action |
| 打开通知设置 | 优先 `notificationManager.openNotificationSettings(context)` | 本地 SDK/文档已确认；这条不是 Want，优先专用 API |
| 打开 Wi‑Fi / 网络设置 | 优先 `settings.openNetworkManagerSettings(context)` | SDK 已提供专用 API |
| 打开定位服务开关 | 优先 `abilityAccessCtrl.requestGlobalSwitch(context, abilityAccessCtrl.SwitchType.LOCATION)` | 本地 SDK/文档已确认；优先拉系统全局开关弹窗 |
| 打开相机全局开关 | 优先 `abilityAccessCtrl.requestGlobalSwitch(context, abilityAccessCtrl.SwitchType.CAMERA)` | 本地 SDK 已确认 |
| 打开麦克风全局开关 | 优先 `abilityAccessCtrl.requestGlobalSwitch(context, abilityAccessCtrl.SwitchType.MICROPHONE)` | 本地 SDK 已确认 |
| 拨号 / 通话 | 优先 `call.makeCall(phoneNumber)` | 本地 SDK/文档已确认；不要为了统一强行改 Want |

补充规则：

- 电话场景默认不要写成 Want 映射，优先用 `@kit.TelephonyKit` 的 `call.makeCall(...)`。
- 邮件场景可以保留 `mailto:` 这一层用户意图，但不要在未核实前硬写 `subject/body/cc/bcc` 的 OHOS 承载方式。
- 系统设置类场景优先级固定为：专用 API > 官方已给出的固定 Want > 项目内单独核实；不要因为蓝牙设置已知，就类推生成 `wifi_entry`、`location_entry` 一类 URI。
- 三方 App 特定页不要套用表中模式，必须重新查官方文档或目标应用文档。
- 文本分享不要造 `ACTION_SEND + text/plain` 风格 Want，优先用 Share Kit / 系统分享面板（见第六部分）。

### 常用设置与系统页面补充

| 场景 | 推荐方式 | 说明 |
|------|----------|------|
| 通知授权/通知管理 | `notificationManager.requestEnableNotification(context)` / `notificationManager.openNotificationSettings(context)` | 已有专用 API 时，优先专用 API，不要强行改 Want |
| 蓝牙设置 | 已核实 Want：`bluetooth_entry` | 可直接复用 |
| Wi‑Fi / 网络管理设置 | `settings.openNetworkManagerSettings(context)` | SDK 已提供专用 API，优先它，不要猜 `wifi_entry` |
| 定位服务开关 | `abilityAccessCtrl.requestGlobalSwitch(context, abilityAccessCtrl.SwitchType.LOCATION)` | 需要的是“打开定位全局开关”时优先此 API，而不是跳设置页 |
| 相机 / 麦克风全局开关 | `abilityAccessCtrl.requestGlobalSwitch(context, SwitchType.CAMERA / MICROPHONE)` | 适合拍照、录音、扫码等插件 |
| 权限管理 / 应用详情设置 | 优先 `requestPermissionsFromUser(...)`、`openNotificationSettings(...)`、`requestGlobalSwitch(...)` | HarmonyOS 常见问题不是“跳到某个设置子页”，而是该用专用授权 API |

---

## 第四部分：已核实示例

示例只写核心参数和调用方式。实际插件中统一套自己的 `UIAbilityContext` 判空、`try/catch`、`result.error(...)` 和日志，不要把这里的片段当完整函数。

### 应用市场详情页

应用内打开应用市场详情页，官方提供三种方式：`loadProduct`、Deep Linking、App Linking。优先级建议：

- 应用内直接打开应用详情页：优先 `productViewManager.loadProduct(...)`
- 明确要用应用市场 DeepLink：使用 `store://appgallery.huawei.com/app/detail?id=<bundleName>` + `startAbility`
- Web 链接、跨应用链接或需要 App Linking 优先策略：使用 `https://appgallery.huawei.com/app/detail?id=<bundleName>` + `openLink`

#### 方式一：loadProduct

```ets
productViewManager.loadProduct(context, {
  parameters: {
    bundleName: bundleName
  }
});
```

#### 方式二：Deep Linking

```ets
await context.startAbility({
  action: 'ohos.want.action.appdetail',
  uri: `store://appgallery.huawei.com/app/detail?id=${bundleName}`
});
```

#### 方式三：App Linking

```ets
await context.openLink(
  `https://appgallery.huawei.com/app/detail?id=${bundleName}`,
  { appLinkingOnly: false }
);
```

### 应用市场写评论页

```ets
const want: Want = {
  action: 'ohos.want.action.appdetail',
  uri: `store://appgallery.huawei.com/app/detail?id=${bundleName}&action=write-review`,
};
await this.context!.startAbility(want);
```

### 浏览器 / 外部链接

```ets
const want: Want = {
  action: 'ohos.want.action.viewData',
  uri: url,
  entities: ['entity.system.browsable'],
};
await this.context!.startAbility(want);
```

### 短信

```ets
const want: Want = {
  bundleName: 'com.ohos.mms',
  action: 'ohos.want.action.viewData',
  uri: `sms:${phone}?body=${encodedBody}`,
};
await this.context!.startAbility(want);
```

### 蓝牙设置

```ets
const want: Want = {
  bundleName: 'com.huawei.hmos.settings',
  abilityName: 'com.huawei.hmos.settings.MainAbility',
  uri: 'bluetooth_entry',
};
await this.context!.startAbility(want);
```

### 通知设置

```ets
import { notificationManager } from '@kit.NotificationKit';

await notificationManager.openNotificationSettings(this.context!);
```

### Wi‑Fi / 网络管理设置

```ets
import settings from '@ohos.settings';

await settings.openNetworkManagerSettings(this.context!);
```

### 定位 / 相机 / 麦克风全局开关

```ets
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';

const atManager = abilityAccessCtrl.createAtManager();
await atManager.requestGlobalSwitch(
  this.context!,
  abilityAccessCtrl.SwitchType.LOCATION
);
```

```ets
await atManager.requestGlobalSwitch(
  this.context!,
  abilityAccessCtrl.SwitchType.CAMERA
);
```

```ets
await atManager.requestGlobalSwitch(
  this.context!,
  abilityAccessCtrl.SwitchType.MICROPHONE
);
```

### 邮件

```ets
const mailWant: Want = {
  action: 'ohos.want.action.viewData',
  uri: `mailto:${emailAddress}`,
};
await this.context!.startAbility(mailWant);
```

---

## 第五部分：常见误区

- 不要直接复用其他平台的市场、设置、分享、拨号等跳转 scheme 或隐式 action。
- 不要把 `mailto:`、`tel:`、分享、评论、支付、通知设置、网络设置、全局开关这类已有更直接能力的场景一律压成 Want。
- 不要只改 `action/uri`，却丢掉原插件真正依赖的参数语义。
- 不要看到蓝牙设置的 `bluetooth_entry`，就类推出 `wifi_entry`、`location_entry` 等 URI。

---

## 第六部分：Share Kit 系统分享

> 插件涉及 Android `ACTION_SEND` / `ShareCompat` / 系统分享面板场景时，OHOS 端**必须**使用 Share Kit，不要拼 Want。

### 导入

使用 `import { systemShare } from '@kit.ShareKit';`。文件分享需要把沙箱路径转 URI 时，再使用 `fileUri.getUriFromPath(filePath)`。

### 核心规则

1. **UTD 类型字符串使用 `'general.text'`**，不是 `'general.plain-text'`。图片按实际格式使用 `'general.jpeg'`、`'general.png'`、`'general.image'` 等。
2. **`SharedRecord` 必须用内联对象字面量构造**，禁止使用 `as systemShare.SharedRecord` 类型断言——断言跳过运行时类型检查，会导致 `Invalid record` / `WriteToWantParams failed` 错误。
3. **在 HAR 模块中不要 import `@kit.ArkData` 的 `uniformTypeDescriptor`**——HAR 模块可能无法正确解析该 Kit，直接使用字符串常量即可。
4. **ArkTS 对象字面量中不要给属性赋值 `undefined`**——对于可选属性，当值不存在时应省略该属性（通过条件分支构造不同的对象），不要写 `title: undefined`。

### 纯文本分享

```ets
import { systemShare } from '@kit.ShareKit';
import { common } from '@kit.AbilityKit';

async showSystemShareText(context: common.UIAbilityContext, message: string, title?: string): Promise<void> {
  let shareData: systemShare.SharedData;
  if (title !== undefined && title !== null && title !== '') {
    shareData = new systemShare.SharedData({
      utd: 'general.text',
      content: message,
      title: title,
    });
  } else {
    shareData = new systemShare.SharedData({
      utd: 'general.text',
      content: message,
    });
  }
  const controller = new systemShare.ShareController(shareData);
  await controller.show(context, {
    previewMode: systemShare.SharePreviewMode.DEFAULT,
    selectionMode: systemShare.SelectionMode.SINGLE,
  });
}
```

### 图片/文件分享

```ets
import { systemShare } from '@kit.ShareKit';
import { fileUri } from '@kit.CoreFileKit';

async showSystemShareFiles(context: common.UIAbilityContext, filePaths: string[], title?: string): Promise<void> {
  const shareData = new systemShare.SharedData();
  for (const filePath of filePaths) {
    const uri = fileUri.getUriFromPath(filePath);
    const utdType = this.getImageUtdType(filePath);
    if (title !== undefined && title !== null && title !== '') {
      shareData.addRecord({
        utd: utdType,
        uri: uri,
        title: title,
      });
    } else {
      shareData.addRecord({
        utd: utdType,
        uri: uri,
      });
    }
  }
  const controller = new systemShare.ShareController(shareData);
  await controller.show(context, {
    previewMode: systemShare.SharePreviewMode.DEFAULT,
    selectionMode: systemShare.SelectionMode.SINGLE,
  });
}

// 根据文件扩展名返回 UTD 类型
private getImageUtdType(filePath: string): string {
  const lower = filePath.toLowerCase();
  if (lower.endsWith('.png')) return 'general.png';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'general.jpeg';
  if (lower.endsWith('.gif')) return 'general.gif';
  if (lower.endsWith('.bmp')) return 'general.bmp';
  if (lower.endsWith('.webp')) return 'general.webp';
  if (lower.endsWith('.pdf')) return 'com.adobe.pdf';
  return 'general.image';
}
```

### 常见错误对照

| 错误表现 | 根因 | 修正 |
|---------|------|------|
| `Invalid record at 0` / `WriteToWantParams failed` | UTD 字符串错误（如 `'general.plain-text'`）或使用了 `as SharedRecord` 断言 | 改用 `'general.text'` + 内联对象字面量 |
| `Parameter error` / share 弹出后无内容 | `content`/`uri` 为 `undefined`（参数读取失败） | 检查 `call.args` 是否通过 `.get()` 安全读取，并在组装 `SharedData` 前过滤 `undefined` |
| `import @kit.ArkData` 编译或运行异常 | HAR 模块无法正确解析该 Kit | 直接使用 UTD 字符串常量，不要 import `uniformTypeDescriptor` |

### 短信发送

短信不使用 Share Kit，而是通过 Want 拉起系统短信应用：

```ets
const encodedBody = encodeURIComponent(message);
const want: Want = {
  bundleName: 'com.ohos.mms',
  action: 'ohos.want.action.viewData',
  uri: `sms:${phone}?body=${encodedBody}`,
};
await this.context!.startAbility(want);
```

**禁止**：
- 不要使用 `action: 'ohos.want.action.sendToData'`——该 action 无法匹配系统短信应用
- 不要省略 `bundleName: 'com.ohos.mms'`——隐式匹配可能失败
- 正文必须 `encodeURIComponent` 编码

---

## 第七部分：三方应用深链跳转

> 插件需要拉起 QQ、微信、微博、支付宝等第三方应用时，适用本部分规则。

### 7.1 禁止直接复用 Android URI Scheme

**同一应用在 HarmonyOS 上注册的 URI Scheme 可能与 Android 完全不同。** 例如：

| 应用 | Android 注册 | HarmonyOS 注册 | 说明 |
|------|-------------|---------------|------|
| QQ 好友聊天 | `mqqwpa://im/chat?...` | ❌ 未注册 | 须改用 `mqqapi://card/show_pslcard?...&card_type=peer` |
| QQ 群名片 | `mqqapi://card/show_pslcard?...` | `mqqapi` ✅ | 可直接用，但须配 `bundleName` |
| 微信 | `weixin://` | 可能不同 | 须验证 |

**验证方法**：在 HarmonyOS 设备上通过 `bm dump -n <bundleName>` 查看目标应用注册的 skills/uris/scheme。

```bash
# 示例：查看 QQ 注册了哪些 URI Scheme
hdc shell bm dump -n com.tencent.mqq | grep '"scheme"'
```

如果无法在设备上验证，必须在 `implementation_notes` 中标注为 `risk_items`（confidence: low），coding 阶段须实测确认。

### 7.2 优先使用 bundleName 精确匹配

对于已知目标应用的场景（如拉起 QQ、微信、微博），在 Want 中指定 `bundleName` 比纯隐式 URI 匹配更可靠：

```ets
// ❌ 不推荐：纯隐式匹配（依赖 URI scheme 注册）
const want: Want = {
    action: 'ohos.want.action.viewData',
    uri: 'mqqapi://...',
    entities: ['entity.system.browsable'],
};

// ✅ 推荐：指定 bundleName 精确匹配
const want: Want = {
    bundleName: 'com.tencent.mqq',
    action: 'ohos.want.action.viewData',
    uri: 'mqqapi://...',
    entities: ['entity.system.browsable'],
};
```

常用三方应用 bundleName 参考：

| 应用 | HarmonyOS bundleName |
|------|---------------------|
| QQ | `com.tencent.mqq` |
| 微信 | `com.tencent.wechat` |
| QQ音乐 | `com.tencent.hm.qqmusic` |
| 腾讯视频 | `com.tencent.videohm` |
| 微博 | 须验证 |

> 以上 bundleName 仅为已知参考，不同版本可能变化。coding 阶段应通过 `bm dump` 确认。

### 7.3 禁止用 canOpenLink() 做硬拦截

**`bundleManager.canOpenLink()` 在 HarmonyOS 上不可靠**：
- 即使目标应用已安装且注册了对应 URI Scheme，`canOpenLink()` 也可能返回 `false`
- 原因包括 skills 匹配规则、`querySchemes` 配置、系统版本差异等
- **将 `canOpenLink()` 用作硬拦截会导致已安装的应用被误判为未安装**

正确做法：

```ets
// ❌ 禁止：canOpenLink 硬拦截
if (!bundleManager.canOpenLink(qqLink)) {
    result.error('APPLICATION_NOT_INSTALLED', 'QQ is not installed', null);
    return;
}
await this.startAbility(want);

// ✅ 正确：直接 startAbility + catch 错误
try {
    const want: Want = {
        bundleName: 'com.tencent.mqq',
        action: 'ohos.want.action.viewData',
        uri: qqLink,
        entities: ['entity.system.browsable'],
    };
    await this.context.startAbility(want);
    result.success(true);
} catch (err) {
    const errMsg = (err as Error).message ?? '';
    if (errMsg.includes('17700056') || errMsg.includes('not in the querySchemes')) {
        result.error('APPLICATION_NOT_INSTALLED', 'Target app not installed or scheme not supported', null);
    } else {
        result.error('OPEN_FAILED', 'Failed to open target app', null);
    }
}
```

### 7.4 querySchemes 必须声明所有使用的 URI Scheme

HarmonyOS 要求应用在 `module.json5` 的 `querySchemes` 中声明所有要通过 URI 方式查询/打开的 scheme。**未声明的 scheme 会导致 `startAbility` 抛出错误 17700056**。

```json5
{
  "module": {
    "querySchemes": [
      "mqqapi",
      "mqqwpa",
      "qqopenapi",
      "sinaweibo",
      "weixin",
      "alipay"
    ]
  }
}
```

规则：
- 在 `primary-02-planning` 阶段，所有 `ohos_api_mapping` 中涉及的 URI Scheme 必须汇总到 `module_json5_config.querySchemes`
- 在 coding 阶段，须将 `querySchemes` 写入 **entry 模块** 的 `module.json5`（HAR 模块的 `module.json5` 不支持 `querySchemes`）
- 即使某些 scheme 在当前设备上目标应用未注册，也应提前声明（不影响运行）
