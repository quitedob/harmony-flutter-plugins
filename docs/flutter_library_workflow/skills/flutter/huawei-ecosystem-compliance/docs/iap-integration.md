# 华为 IAP（In-App Purchase）集成指导

## 第一部分：华为 IAP API 映射

### 核心 API 概览

| 功能 | 华为 IAP API | 模块 | 说明 |
|------|-------------|------|------|
| 检查支付环境 | `iap.queryEnvironmentStatus(context)` | `@kit.IAPKit` | 检查当前账号所在服务地是否支持 IAP |
| 查询商品信息 | `iap.queryProducts(context, params)` | `@kit.IAPKit` | 查询 AppGallery Connect 中配置的商品 |
| 发起购买 | `iap.createPurchase(context, params)` | `@kit.IAPKit` | 拉起 IAP 收银台创建订单 |
| 查询已购记录 | `iap.queryPurchases(context, params)` | `@kit.IAPKit` | 查询已购/未完成购买记录 |
| 完成发货确认 | `iap.finishPurchase(context, params)` | `@kit.IAPKit` | 发放权益后通知 IAP 完成购买 |


### 与微信/支付宝支付的对比

| 功能 | 微信支付 | 支付宝支付 | 华为 IAP |
|------|---------|-----------|---------|
| 初始化/可用性检查 | `registerApp()` / 安装检测 | SDK 初始化 / App 可用性 | `queryEnvironmentStatus()` |
| 查询商品 | 商户侧自管 | 商户侧自管 | `queryProducts()` |
| 发起支付 | `sendReq()` | `payOrder()` | `createPurchase()` |
| 结果处理 | 回调 Activity | URL Scheme / 回调 | Promise 返回 `purchaseData` |
| 发货确认 | 商户侧处理 | 商户侧处理 | `finishPurchase()` |

---

## 第二部分：ETS 代码模板

### 2.1 导入和类型定义

```typescript
import { iap } from '@kit.IAPKit';
import { common } from '@kit.AbilityKit';
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

### 2.2 IAP 服务封装

以下是一个适合 Flutter 插件侧复用的最小 IAP 服务类：

```typescript
// ohos/src/main/ets/services/PayService.ets

import { iap } from '@kit.IAPKit';
import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

export class PayService {
  private static instance: PayService = new PayService();
  private context: common.UIAbilityContext | null = null;

  static getInstance(): PayService {
    return PayService.instance;
  }

  setContext(context: common.UIAbilityContext): void {
    this.context = context;
  }

  private requireContext(): common.UIAbilityContext {
    if (!this.context) {
      throw new Error('UIAbilityContext is not ready');
    }
    return this.context;
  }

  async queryEnvironmentStatus(): Promise<boolean> {
    try {
      await iap.queryEnvironmentStatus(this.requireContext());
      return true;
    } catch (error) {
      const err = error as BusinessError;
      console.error(`[IAP] queryEnvironmentStatus failed: ${err.code} ${err.message}`);
      return false;
    }
  }

  async queryProducts(productIds: string[], productType: iap.ProductType): Promise<Array<iap.Product>> {
    const parameter: iap.QueryProductsParameter = {
      productIds,
      productType,
    };
    return await iap.queryProducts(this.requireContext(), parameter);
  }

  async createPurchase(
    productId: string,
    productType: iap.ProductType,
    developerPayload?: string
  ): Promise<string> {
    const parameter: iap.PurchaseParameter = {
      productId,
      productType,
      developerPayload,
    };
    const result = await iap.createPurchase(this.requireContext(), parameter);
    return result.purchaseData;
  }

  async finishPurchase(
    purchaseToken: string,
    purchaseOrderId: string,
    productType: iap.ProductType
  ): Promise<void> {
    const parameter: iap.FinishPurchaseParameter = {
      purchaseToken,
      purchaseOrderId,
      productType,
    };
    await iap.finishPurchase(this.requireContext(), parameter);
  }

  async queryPurchases(productType: iap.ProductType): Promise<iap.QueryPurchaseResult> {
    return await iap.queryPurchases(this.requireContext(), {
      productType,
    });
  }
}
```

说明：
- `finishPurchase()` 需要 `purchaseToken + purchaseOrderId + productType`，通常来自购买结果上报服务端并确认发货后再执行。
- 商品类型必须显式传 `iap.ProductType`，不能只传商品 ID。

### 2.3 插件主入口集成

在 Flutter 插件中，推荐通过 `AbilityAware` 获取真实 `UIAbilityContext` 后再调用 IAP：

```typescript
// ohos/src/main/ets/components/plugin/PockytPayPlugin.ets

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
import { iap } from '@kit.IAPKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { PayService } from '../../services/PayService';

const CHANNEL_NAME: string = 'pockyt.io/flutter';

export class PockytPayPlugin implements FlutterPlugin, MethodCallHandler, AbilityAware {
  private channel: MethodChannel | null = null;
  private context: common.UIAbilityContext | null = null;
  private payService: PayService = PayService.getInstance();

  getUniqueClassName(): string {
    return 'PockytPayPlugin';
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
      this.payService.setContext(this.context);
    }
  }

  onDetachedFromAbility(): void {
    this.context = null;
  }

  async onMethodCall(call: MethodCall, result: MethodResult): Promise<void> {
    try {
      switch (call.method) {
        case 'isHuaweiIapAvailable': {
          result.success(await this.payService.queryEnvironmentStatus());
          return;
        }
        case 'queryHuaweiProducts': {
          const productIds = call.argument('productIds') as string[];
          const productTypeValue = call.argument('productType') as number;
          const products = await this.payService.queryProducts(
            productIds,
            productTypeValue as iap.ProductType
          );
          result.success(products.map((item) => ({
            id: item.id,
            type: item.type,
            name: item.name,
            description: item.description,
            localPrice: item.localPrice ?? item.price,
            microPrice: item.microPrice,
          })));
          return;
        }
        case 'requestHuaweiPay': {
          const productId = call.argument('productId') as string;
          const productTypeValue = call.argument('productType') as number;
          const developerPayload = call.argument('developerPayload') as string | null;
          const purchaseData = await this.payService.createPurchase(
            productId,
            productTypeValue as iap.ProductType,
            developerPayload ?? undefined
          );
          result.success(purchaseData);
          return;
        }
        case 'finishHuaweiPurchase': {
          const purchaseToken = call.argument('purchaseToken') as string;
          const purchaseOrderId = call.argument('purchaseOrderId') as string;
          const productTypeValue = call.argument('productType') as number;
          await this.payService.finishPurchase(
            purchaseToken,
            purchaseOrderId,
            productTypeValue as iap.ProductType
          );
          result.success(true);
          return;
        }
        default:
          result.notImplemented();
          return;
      }
    } catch (error) {
      const err = error as BusinessError;
      result.error(String(err.code ?? -1), err.message ?? 'IAP error', null);
    }
  }
}
```

### 2.4 Dart 层接口扩展

在 Dart 层，推荐把 IAP 结果保持为原始购买数据或业务方自己的解析结果，不要臆造平台字段：

```dart
import 'dart:io' show Platform;
import 'package:flutter/services.dart';

const MethodChannel _channel = MethodChannel('pockyt.io/flutter');

Future<bool> isHuaweiIapAvailable() async {
  if (!Platform.isOhos) return false;
  return await _channel.invokeMethod<bool>('isHuaweiIapAvailable') ?? false;
}

Future<List<Map<String, dynamic>>> queryHuaweiProducts({
  required List<String> productIds,
  required int productType,
}) async {
  if (!Platform.isOhos) return const [];
  final result = await _channel.invokeMethod<List<dynamic>>('queryHuaweiProducts', {
        'productIds': productIds,
        'productType': productType,
      }) ??
      const [];
  return result.cast<Map>().map((e) => Map<String, dynamic>.from(e)).toList();
}

Future<String?> requestHuaweiPay({
  required String productId,
  required int productType,
  String? developerPayload,
}) async {
  if (!Platform.isOhos) return null;
  return await _channel.invokeMethod<String>('requestHuaweiPay', {
    'productId': productId,
    'productType': productType,
    'developerPayload': developerPayload,
  });
}

Future<bool> finishHuaweiPurchase({
  required String purchaseToken,
  required String purchaseOrderId,
  required int productType,
}) async {
  if (!Platform.isOhos) return false;
  return await _channel.invokeMethod<bool>('finishHuaweiPurchase', {
        'purchaseToken': purchaseToken,
        'purchaseOrderId': purchaseOrderId,
        'productType': productType,
      }) ??
      false;
}
```

说明：

- HarmonyOS 侧 IAP 更适合映射为“查询商品 / 发起购买 / 完成发货”三类明确方法。
- 如果原 Flutter 插件本身已有统一购买抽象，应只在 OHOS 分支里接入 IAP，不要额外新造一套公开 Dart API。
- 购买结果里的 `purchaseData` 建议继续上报业务服务端验签与发货，不要在插件层伪造“支付成功即发货”。

---

## 第三部分：配置文件修改

### 3.1 module.json5 权限声明

IAP 本身没有单独的运行时权限；如插件需要访问自有服务端，通常只需要网络权限：

```json5
{
  "module": {
    "name": "entry",
    "type": "har",
    "requestPermissions": [
      {
        "name": "ohos.permission.INTERNET"
      }
    ]
  }
}
```

---

## 第四部分：平台判断代码处理

### 4.1 Dart 层平台判断

```dart
import 'dart:io' show Platform;

Future<void> pay({
  required String channel,
  required Map<String, dynamic> params,
}) async {
  if (Platform.isOhos) {
    if (channel != 'huawei') {
      throw UnsupportedError('Only Huawei IAP is supported on OHOS.');
    }
    await requestHuaweiPay(
      productId: params['productId'] as String,
      productType: params['productType'] as int,
      developerPayload: params['developerPayload'] as String?,
    );
    return;
  }

  if (channel == 'wechat' && (Platform.isAndroid || Platform.isIOS)) {
    await requestWechatPay(params);
    return;
  }

  if (channel == 'alipay' && (Platform.isAndroid || Platform.isIOS)) {
    await requestAlipay(params['payInfo'] as String);
    return;
  }

  throw UnsupportedError('Payment channel $channel not supported on current platform');
}
```

说明：

- OHOS 上不要把微信/支付宝支付“硬转译”为 IAP；只有原插件公开语义允许使用华为应用内支付时，才接入 IAP。
- 如果原插件是“统一支付渠道插件”，OHOS 分支应明确标注仅支持 `huawei` 渠道，而不是伪装成 `wechat/alipay` 等价实现。

## 补充说明

- 更多 API 用法需要查询官方文档。
