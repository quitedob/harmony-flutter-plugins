# 华为 Account Kit（账号登录服务）集成指导

## 第一部分：华为 Account Kit API 映射

### 核心 API 概览

| 功能 | 华为 Account Kit API | 模块 | 说明 |
|------|---------------------|------|------|
| 华为账号登录 | `createLoginWithHuaweiIDRequest()` | `@kit.AccountKit` | 创建登录请求，主场景是获取 `authorizationCode`、`idToken`、`openID`、`unionID` |
| 执行登录/授权 | `AuthenticationController.executeRequest()` | `@kit.AccountKit` | 执行登录、授权、取消授权请求 |
| 获取更多用户信息 | `createAuthorizationWithHuaweiIDRequest()` | `@kit.AccountKit` | 申请额外 `scopes/permissions`，如 `profile`、`email` |
| 取消授权 | `createCancelAuthorizationRequest()` | `@kit.AccountKit` | 取消已授权的 `scopes` |
| 一键登录预取匿名手机号 | `createAuthorizationWithHuaweiIDRequest()` + `scopes: ['quickLoginAnonymousPhone']` | `@kit.AccountKit` | 不是独立 `createPhoneAuthorizationRequest()`；完整手机号需服务端用 `authorizationCode` 换取 |

### 关键适配结论

- **登录**应使用 `createLoginWithHuaweiIDRequest()`，不是 `createAuthorizationWithHuaweiIDRequest()`。
- **头像/昵称/邮箱**这类额外信息，应通过 `createAuthorizationWithHuaweiIDRequest()` 申请对应 `scopes`。
- **手机号一键登录**不是“直接返回手机号”的简单 MethodChannel 调用：
  - 端侧通常先申请 `quickLoginAnonymousPhone` 获取匿名手机号和 `authorizationCode`
  - 再结合官方登录按钮或页面交互完成登录
  - 服务端再通过 `authorizationCode` 换取完整手机号、`UnionID`、`OpenID`
- SDK 中**没有**通用的 `signOut()` 客户端 API。Flutter 插件里的“退出登录”通常只能表示：
  - 清除应用自己的本地登录态
  - 如需取消华为账号授权，使用 `createCancelAuthorizationRequest()`

### 常见 Scope / Permission

| 名称 | 用途 |
|------|------|
| `profile` | 获取头像、昵称等信息 |
| `email` | 获取邮箱 |
| `quickLoginAnonymousPhone` | 一键登录场景下预取匿名手机号 |

> `openid` / `unionID` 对应的是登录结果中的身份标识，不要把旧平台术语机械改写成 OHOS 端手填 scope 列表。

---

## 第二部分：ETS 代码模板

### 2.1 导入和类型定义

```typescript
import { authentication } from '@kit.AccountKit';
import { common } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { util } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import {
  FlutterPlugin,
  FlutterPluginBinding,
  MethodCall,
  MethodCallHandler,
  MethodChannel,
  MethodResult,
  AbilityAware,
  AbilityPluginBinding,
} from '@ohos/flutter_ohos';
```

### 2.2 账号登录服务类

```typescript
// ohos/src/main/ets/services/AccountService.ets

import { authentication } from '@kit.AccountKit';
import { common } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { util } from '@kit.ArkTS';

const TAG = 'account_flutter';
const DOMAIN = 0xFF00;

export class AccountService {
  private static instance: AccountService;
  private context: common.UIAbilityContext | null = null;
  private authController: authentication.AuthenticationController | null = null;

  static getInstance(): AccountService {
    if (!AccountService.instance) {
      AccountService.instance = new AccountService();
    }
    return AccountService.instance;
  }

  setContext(context: common.UIAbilityContext): void {
    this.context = context;
    this.authController = new authentication.AuthenticationController(context);
  }

  private ensureController(): authentication.AuthenticationController {
    if (this.authController == null) {
      throw new Error('UIAbilityContext not ready');
    }
    return this.authController;
  }

  async loginWithHuaweiID(): Promise<Record<string, string>> {
    const controller = this.ensureController();
    const request = new authentication.HuaweiIDProvider().createLoginWithHuaweiIDRequest();
    request.forceLogin = true;
    request.state = util.generateRandomUUID();

    const response = await controller.executeRequest(request) as authentication.LoginWithHuaweiIDResponse;
    const credential = response.data;

    return {
      authorizationCode: credential?.authorizationCode ?? '',
      idToken: credential?.idToken ?? '',
      openID: credential?.openID ?? '',
      unionID: credential?.unionID ?? '',
      state: response.state ?? '',
    };
  }

  async authorizeHuaweiID(scopes: string[]): Promise<Record<string, string>> {
    const controller = this.ensureController();
    const request = new authentication.HuaweiIDProvider().createAuthorizationWithHuaweiIDRequest();
    request.scopes = scopes;
    request.forceAuthorization = true;
    request.state = util.generateRandomUUID();

    const response = await controller.executeRequest(request) as authentication.AuthorizationWithHuaweiIDResponse;
    const credential = response.data;
    const result: Record<string, string> = {
      authorizationCode: credential?.authorizationCode ?? '',
      idToken: credential?.idToken ?? '',
      openID: credential?.openID ?? '',
      unionID: credential?.unionID ?? '',
      avatarUri: credential?.avatarUri ?? '',
      nickName: credential?.nickName ?? '',
      email: credential?.email ?? '',
      state: response.state ?? '',
    };

    // quickLoginAnonymousPhone 在官方文档中作为一键登录场景字段返回，
    // d.ts 未静态声明，不要假设它一定存在。
    const extraInfo = credential?.extraInfo;
    if (extraInfo !== undefined && extraInfo !== null) {
      const anonymousPhone = extraInfo['quickLoginAnonymousPhone'];
      if (typeof anonymousPhone === 'string') {
        result['quickLoginAnonymousPhone'] = anonymousPhone;
      }
    }

    return result;
  }

  async cancelAuthorization(scopes: string[]): Promise<boolean> {
    const controller = this.ensureController();
    const request = new authentication.HuaweiIDProvider().createCancelAuthorizationRequest();
    request.scopes = scopes;
    request.state = util.generateRandomUUID();
    await controller.executeRequest(request);
    return true;
  }
}
```

### 2.3 插件实现类

> **重要**：涉及 `AuthenticationController` 时，插件应通过 `AbilityAware` 获取真实 `UIAbilityContext`。  
> 不要把 `binding.getApplicationContext()` 强转为 `UIAbilityContext`。

```typescript
// ohos/src/main/ets/components/plugin/HuaweiAccountPlugin.ets

import {
  FlutterPlugin,
  FlutterPluginBinding,
  MethodCall,
  MethodCallHandler,
  MethodChannel,
  MethodResult,
  AbilityAware,
  AbilityPluginBinding,
} from '@ohos/flutter_ohos';
import { common } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { AccountService } from '../../services/AccountService';

const TAG = 'account_flutter';
const DOMAIN = 0xFF00;
const CHANNEL_NAME = 'huawei_account_flutter';

export class HuaweiAccountPlugin implements FlutterPlugin, MethodCallHandler, AbilityAware {
  private channel: MethodChannel | null = null;
  private context: common.UIAbilityContext | null = null;
  private accountService: AccountService = AccountService.getInstance();

  getUniqueClassName(): string {
    return 'HuaweiAccountPlugin';
  }

  onAttachedToEngine(binding: FlutterPluginBinding): void {
    this.channel = new MethodChannel(binding.getBinaryMessenger(), CHANNEL_NAME);
    this.channel.setMethodCallHandler(this);
  }

  onDetachedFromEngine(binding: FlutterPluginBinding): void {
    if (this.channel !== null) {
      this.channel.setMethodCallHandler(null);
    }
    this.channel = null;
  }

  onAttachedToAbility(binding: AbilityPluginBinding): void {
    const ability = binding.getAbility();
    if (ability !== null && ability !== undefined) {
      this.context = ability.context as common.UIAbilityContext;
      this.accountService.setContext(this.context);
    }
  }

  onDetachedFromAbility(): void {
    this.context = null;
  }

  async onMethodCall(call: MethodCall, result: MethodResult): Promise<void> {
    try {
      switch (call.method) {
        case 'loginWithHuaweiID':
          result.success(await this.accountService.loginWithHuaweiID());
          return;

        case 'authorizeHuaweiID': {
          const args = call.args as Record<string, Object> | null;
          const scopesValue = args?.['scopes'];
          const scopes: string[] = Array.isArray(scopesValue)
            ? scopesValue.filter((item): item is string => typeof item === 'string')
            : [];
          result.success(await this.accountService.authorizeHuaweiID(scopes));
          return;
        }

        case 'prefetchAnonymousPhone':
          result.success(await this.accountService.authorizeHuaweiID(['quickLoginAnonymousPhone']));
          return;

        case 'cancelHuaweiAuthorization': {
          const args = call.args as Record<string, Object> | null;
          const scopesValue = args?.['scopes'];
          const scopes: string[] = Array.isArray(scopesValue)
            ? scopesValue.filter((item): item is string => typeof item === 'string')
            : [];
          result.success(await this.accountService.cancelAuthorization(scopes));
          return;
        }

        default:
          result.notImplemented();
          return;
      }
    } catch (error) {
      const err = error as BusinessError;
      const code = err.code !== undefined ? `${err.code}` : 'ACCOUNT_ERROR';
      const message = err.message ?? 'Account call failed';
      hilog.error(DOMAIN, TAG, 'Account call failed: %{public}s', message);
      result.error(code, message, null);
    }
  }
}
```

### 2.4 Dart 层接口

```dart
// lib/src/huawei_account/huawei_account.dart

import 'package:flutter/services.dart';

class HuaweiAccount {
  static const MethodChannel _channel = MethodChannel('huawei_account_flutter');

  static Future<Map<String, dynamic>?> loginWithHuaweiID() async {
    final result = await _channel.invokeMethod<Map<dynamic, dynamic>>('loginWithHuaweiID');
    return result?.cast<String, dynamic>();
  }

  static Future<Map<String, dynamic>?> authorizeHuaweiID({
    required List<String> scopes,
  }) async {
    final result = await _channel.invokeMethod<Map<dynamic, dynamic>>(
      'authorizeHuaweiID',
      <String, dynamic>{'scopes': scopes},
    );
    return result?.cast<String, dynamic>();
  }

  static Future<Map<String, dynamic>?> prefetchAnonymousPhone() async {
    final result = await _channel.invokeMethod<Map<dynamic, dynamic>>('prefetchAnonymousPhone');
    return result?.cast<String, dynamic>();
  }

  static Future<bool> cancelHuaweiAuthorization({
    required List<String> scopes,
  }) async {
    return await _channel.invokeMethod<bool>(
          'cancelHuaweiAuthorization',
          <String, dynamic>{'scopes': scopes},
        ) ??
        false;
  }
}
```

### 2.5 Flutter 适配注意事项

- Flutter 插件不要凭空发明 OHOS 端不存在的接口。
- 若原插件只是“华为账号登录”，优先映射为 `loginWithHuaweiID()`。
- 若原插件公开暴露“获取头像/昵称/邮箱”等能力，再补 `authorizeHuaweiID(scopes: ...)`。
- 若原插件公开暴露“一键登录获取手机号”，且不依赖第三方 SDK 时，须同时规划：
  - 一键登录按钮或原生页面承载
  - `quickLoginAnonymousPhone` 预取逻辑
  - 服务端用 `authorizationCode` 换取完整手机号
- 不要把端侧拿到的匿名手机号当成最终手机号返回给 Flutter 业务层。

---

## 第三部分：配置文件修改

### 3.1 AppGallery Connect 配置

1. 登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)
2. 为目标应用开通 Account Kit
3. 完成签名和指纹配置
4. 获取**应用级** `Client ID`

### 3.2 entry 模块 `module.json5`

> **关键点**：`client_id` 要配在宿主应用的 **entry 模块**，不是插件 HAR 模块。  
> 若 `APP ID == Client ID`，可不配置；若不同，则必须配置。

```json5
{
  "module": {
    "name": "entry",
    "type": "entry",
    "metadata": [
      {
        "name": "client_id",
        "value": "YOUR_APP_CLIENT_ID"
      }
    ]
  }
}
```

### 3.3 权限与网络

- Account Kit 登录本身**没有**额外的账号运行时权限。
- 如果插件或应用需要把 `authorizationCode` 发送到自有服务端，再按需声明网络能力。

### 3.4 `oh-package.json5`

```json5
{
  "name": "huawei_account_flutter",
  "version": "1.0.0",
  "description": "Flutter plugin for Huawei Account Kit",
  "main": "index.ets",
  "dependencies": {
    "@ohos/flutter_ohos": "latest"
  }
}
```

---

## 第四部分：平台判断代码处理

### 4.1 Dart 层平台判断

```dart
import 'dart:io' show Platform;

Future<Map<String, dynamic>?> login({required String provider}) async {
  if (provider == 'huawei' && Platform.isOhos) {
    return await HuaweiAccount.loginWithHuaweiID();
  }

  throw UnsupportedError('Login provider $provider not supported on current platform');
}
```

### 4.2 Flutter 侧对外接口建议

- 如果原 Flutter 插件只有“登录”一个入口，不要在 OHOS 分支额外扩成一套新的公开 API 体系。
- 如果原插件原本区分“登录”和“申请更多资料权限”，OHOS 侧可分别映射到：
  - `loginWithHuaweiID()`
  - `authorizeHuaweiID(scopes: ...)`
- 如果原插件原本支持“退出登录”，OHOS 侧要明确区分：
  - **应用退出登录**：清理本地会话
  - **取消华为账号授权**：`cancelHuaweiAuthorization(scopes: ...)`

## 补充说明

- 更多 API 用法需要查询官方文档。
