如不接入数字人民币支付能力或已完成运营机构或受理服务机构商户入网并获取了商户号和APPID，可跳过该步骤。

数字人民币支付仅支持通过运营机构或受理服务机构申请的商户接入，在开发前需要先完成商户入网（可拨打数字人民币客服热线956196根据指引完成商户入网）。

商户入网后，数字人民币的运营机构会分配对应的商户号和APPID，商户号和APPID是[开放API接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-digitalcnyservice)请求的必要入参。

## 应用配置

在构建的开发者应用/元服务“entry/src/main/module.json5”文件中添加钱包schemes配置信息，配置内容示例如下：

收起

自动换行

深色代码主题

复制

```
1. {
2. "module": {
3. // ...
4. "querySchemes": [
5. "wallet"
6. ]
7. }
8. }
```