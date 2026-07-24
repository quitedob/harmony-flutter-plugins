以获取证书指定OID域段，并判断是否为CA证书为例，完成证书扩展信息对象的创建、解析和校验。

## 开发步骤

1. 导入[证书算法库框架模块](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { cert } from '@kit.DeviceCertificateKit';
   ```
2. 解析证书扩展域段数据，调用[cert.createCertExtension](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certcreatecertextension10)创建证书扩展域段对象。
3. 调用[CertExtension.getEntry](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#getentry10)获取指定OID证书扩展域段信息。比如，证书扩展域段对象标识符列表，根据对象标识符获取具体数据等。
4. 调用[CertExtension.checkCA](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#checkca10)判断证书是否为CA证书。

收起

自动换行

深色代码主题

复制

```
1. import { cert } from '@kit.DeviceCertificateKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { util } from '@kit.ArkTS';

5. // 证书扩展数据，以下只是一个示例。需要根据具体业务来赋值。
6. let extData = new Uint8Array([
7. 0x30, 0x40, 0x30, 0x0F, 0x06, 0x03, 0x55, 0x1D,
8. 0x13, 0x01, 0x01, 0xFF, 0x04, 0x05, 0x30, 0x03,
9. 0x01, 0x01, 0xFF, 0x30, 0x0E, 0x06, 0x03, 0x55,
10. 0x1D, 0x0F, 0x01, 0x01, 0xFF, 0x04, 0x04, 0x03,
11. 0x02, 0x01, 0xC6, 0x30, 0x1D, 0x06, 0x03, 0x55,
12. 0x1D, 0x0E, 0x04, 0x16, 0x04, 0x14, 0xE0, 0x8C,
13. 0x9B, 0xDB, 0x25, 0x49, 0xB3, 0xF1, 0x7C, 0x86,
14. 0xD6, 0xB2, 0x42, 0x87, 0x0B, 0xD0, 0x6B, 0xA0,
15. 0xD9, 0xE4
16. ]);

18. // 证书扩展示例
19. function certExtensionSample(): void {
20. let textEncoder = new util.TextEncoder();
21. let encodingBlob: cert.EncodingBlob = {
22. data: extData,
23. // 证书扩展格式，目前仅支持DER格式。
24. encodingFormat: cert.EncodingFormat.FORMAT_DER
25. };

27. // 创建一个证书扩展实例。
28. cert.createCertExtension(encodingBlob, (err, certExtension) => {
29. if (err != null) {
30. // 证书扩展实例创建失败。
31. console.error(`createCertExtension failed, errCode:${err.code}, errMsg:${err.message} `);
32. return;
33. }
34. // 证书扩展实例创建成功。
35. console.info('createCertExtension success');

37. try {
38. // 根据OID获取证书扩展信息。
39. let oidData = '2.5.29.14';
40. let oid: cert.DataBlob = {
41. data: textEncoder.encodeInto(oidData),
42. }
43. let entry = certExtension.getEntry(cert.ExtensionEntryType.EXTENSION_ENTRY_TYPE_ENTRY, oid);

45. // 检查证书是否为CA证书。
46. let pathLen = certExtension.checkCA();
47. console.info('test cert extension success');
48. } catch (err) {
49. let e: BusinessError = err as BusinessError;
50. console.error(`operation failed, message:${e.message} ,code:${e.code} `);
51. }
52. });
53. }
```