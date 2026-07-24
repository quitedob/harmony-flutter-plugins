当前支持DER格式与（r、s）格式互转的能力。

开发者可指定SM2签名数据，将其转换成DER格式密文。反之，也可以从DER格式密文中取出具体的SM2签名数据。

**指定密文参数，转换为DER格式**

1. 构造[EccSignatureSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#eccsignaturespec20)对象，用于指定SM2密文参数。
2. 调用[genEccSignature](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#geneccsignature20)，将EccSignatureSpec对象传入，转换为DER格式的SM2密文。

收起

自动换行

深色代码主题

复制

```
1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. function testGenEccSignature() {
5. try {
6. let spec: cryptoFramework.EccSignatureSpec = {
7. r: BigInt('97726608965854271693043443511967021777934035174185659091642456228829830775155'),
8. s: BigInt('23084224202834231287427338597254751764391338275617140205467537273296855150376'),
9. };

11. let data = cryptoFramework.SignatureUtils.genEccSignature(spec);
12. console.info('genEccSignature success');
13. console.info('data is ' + data);
14. } catch (err) {
15. let e: BusinessError = err as BusinessError;
16. console.error(`ecc error, ${e.code}, ${e.message}`);
17. }
18. }
```

**指定DER格式，转换为（r、s）格式**

1. 指定DER格式的SM2密文参数。
2. 调用[genEccSignatureSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#geneccsignaturespec20)，将DER格式数据传入，转换为(r、s)格式的SM2密文。

收起

自动换行

深色代码主题

复制

```
1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. function testGenEccSignatureSpec() {
5. try {
6. let data =
7. new Uint8Array([48, 69, 2, 33, 0, 216, 15, 76, 238, 158, 165, 108, 76, 72, 63, 115, 52, 255, 51, 149, 54, 224,
8. 179, 49, 225, 70, 36, 117, 88, 154, 154, 27, 194, 161, 3, 1, 115, 2, 32, 51, 9, 53, 55, 248, 82, 7, 159, 179,
9. 144, 57, 151, 195, 17, 31, 106, 123, 32, 139, 219, 6, 253, 62, 240, 181, 134, 214, 107, 27, 230, 175, 40]);
10. let spec: cryptoFramework.EccSignatureSpec = cryptoFramework.SignatureUtils.genEccSignatureSpec(data);
11. console.info('genEccSignatureSpec success');
12. } catch (err) {
13. let e: BusinessError = err as BusinessError;
14. console.error(`ecc error, ${e.code}, ${e.message}`);
15. }
16. }
```