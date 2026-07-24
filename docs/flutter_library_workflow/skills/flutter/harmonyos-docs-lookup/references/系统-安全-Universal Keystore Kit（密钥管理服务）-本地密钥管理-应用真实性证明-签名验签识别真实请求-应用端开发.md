## 接口说明

接口能力由[Universal Keystore Kit](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-overview)提供，涉及的功能指导请参考：

* [Universal Keystore Kit概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-overview)
* [查询密钥是否存在(ArkTS)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-check-key-arkts)
* [查询密钥是否存在(C/C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-check-key-ndk)
* [生成密钥(ArkTS)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-key-generation-arkts)
* [生成密钥(C/C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-key-generation-ndk)
* [匿名密钥证明(ArkTS)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-key-anon-attestation-arkts)
* [匿名密钥证明(C/C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-key-anon-attestation-ndk)
* [签名/验签(ArkTS)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-signing-signature-verification-arkts)
* [签名/验签(C/C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-signing-signature-verification-ndk)

## 使用前提

使用应用的私钥对业务请求进行签名的前提是已经创建应用公私钥和在服务器保存了应用公钥，相关开发指南请参考：

* [查询应用公私钥对是否存在](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/device-attestation-apps#section16550423152920)
* [创建应用公私钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/device-attestation-apps#section9498174318455)
* [对应用公钥和应用ID进行证明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/device-attestation-apps#section0457204074616)

## 使用应用私钥对业务请求进行签名

在密钥证明流程处理成功后，应用在进行一些安全敏感的端云业务时，可以使用已验证的密钥对业务请求进行安全保护。

应用可以调用Universal Keystore Kit的签名接口，使用应用私钥对业务请求数据（如HTTP请求的Body）进行签名，然后把签名结果数据添加到请求消息中（如HTTP的Header字段）。为了方便应用服务器查找应用公钥用于验签，应用应该在业务请求中携带应用公钥ID。

说明

安全建议：为了在发送业务请求时能够防重放攻击，建议应用先从应用服务器获取一次性的挑战值Challenge。应用服务器采用安全随机数生成挑战值Challenge，并缓存到服务器中。

**示例：**

收起

自动换行

深色代码主题

复制

```
1. import { huks } from '@kit.UniversalKeystoreKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { util } from '@kit.ArkTS';

5. let keyAlias = 'serviceKey_user01'; //业务密钥别名
6. let handle: number;
7. let plaintext = '123456'; //待签名的明文数据，建议包含服务器端返回的Challenge
8. let signature: Uint8Array; //存储签名结果数据的变量

10. function StringToUint8Array(str: String) {
11. let arr: number[] = new Array();
12. for (let i = 0, j = str.length; i < j; ++i) {
13. arr.push(str.charCodeAt(i));
14. }
15. return new Uint8Array(arr);
16. }

18. function GetSignProperties() {
19. let properties: Array<huks.HuksParam> = new Array();
20. let index = 0;
21. properties[index++] = {
22. tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
23. value: huks.HuksKeyAlg.HUKS_ALG_ECC
24. };
25. properties[index++] = {
26. tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
27. value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_256
28. };
29. properties[index++] = {
30. tag: huks.HuksTag.HUKS_TAG_PURPOSE,
31. value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_SIGN
32. };
33. properties[index++] = {
34. tag: huks.HuksTag.HUKS_TAG_DIGEST,
35. value: huks.HuksKeyDigest.HUKS_DIGEST_SHA256
36. }
37. return properties;
38. }

40. async function Sign(keyAlias: string, plaintext: string) {
41. let signProperties = GetSignProperties();
42. let options: huks.HuksOptions = {
43. properties: signProperties,
44. inData: StringToUint8Array(plaintext)
45. }
46. await huks.initSession(keyAlias, options)
47. .then((data) => {
48. handle = data.handle;
49. }).catch((err: BusinessError) => {
50. console.error(`promise: init sign failed, error: ` + err.message);
51. })
52. await huks.finishSession(handle, options)
53. .then((data) => {
54. signature = data.outData as Uint8Array;

56. let base64 = new util.Base64Helper();
57. let signatureBase64 = base64.encodeToStringSync(signature);
58. //todo：把签名结果的Base64编码（signatureBase64变量）发送到云侧的服务器。如下示例代码把签名结果打印到日志中，供调测使用，商用代码不需要打印。
59. console.info(`sign success, result:` + signatureBase64);

61. }).catch((err: BusinessError) => {
62. console.error(`promise: sign failed, error: ` + err.message);
63. })
64. }
```