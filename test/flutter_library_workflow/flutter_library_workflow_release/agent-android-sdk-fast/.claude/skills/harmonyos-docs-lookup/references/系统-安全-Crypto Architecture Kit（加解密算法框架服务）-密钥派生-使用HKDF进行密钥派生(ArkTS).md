对应算法规格请查看[密钥派生算法规格：HKDF](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-key-derivation-overview#hkdf算法)。

## 开发步骤

1. 构造[HKDFSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#hkdfspec12)对象，作为密钥派生参数进行密钥派生。

   HKDFSpec是[KdfSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#kdfspec11)的子类，需要指定：

   * algName：指定算法'HKDF'。
   * key：原始密钥材料。

     如果使用string类型，需要直接传入用于密钥派生的数据，而不是HexString、base64等字符串类型。同时需要确保该字符串为utf-8编码，否则派生结果会有差异。
   * salt：盐值。
   * info：可选的上下文与应用相关信息， 可为空，用于拓展短密钥。
   * keySize：目标密钥的字节长度，需要为正整数。
2. 调用[cryptoFramework.createKdf](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatekdf11)，指定字符串参数'HKDF|SHA256|EXTRACT\_AND\_EXPAND'，创建密钥派生算法为HKDF、HMAC函数摘要算法为SHA256、模式为提取和拓展的密钥派生函数对象（Kdf）。
3. 输入HKDFSpec对象，调用[Kdf.generateSecret](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatesecret11)进行密钥派生。

   Kdf.generateSecret的多种调用形式如表所示。

   展开

   | 接口名 | 返回方式 |
   | --- | --- |
   | generateSecret(params: KdfSpec, callback: AsyncCallback<DataBlob>): void | callback异步生成。 |
   | generateSecret(params: KdfSpec): Promise<DataBlob> | Promise异步生成。 |
   | generateSecretSync(params: KdfSpec): DataBlob | 同步生成。 |

* 通过await返回结果：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. async function kdfAwait() {
  5. let keyData = new Uint8Array(buffer.from("012345678901234567890123456789", "utf-8").buffer);
  6. let saltData = new Uint8Array(buffer.from("0123456789", "utf-8").buffer);
  7. let infoData = new Uint8Array(buffer.from("infostring", "utf-8").buffer);
  8. let spec: cryptoFramework.HKDFSpec = {
  9. algName: 'HKDF',
  10. key: keyData,
  11. salt: saltData,
  12. info: infoData,
  13. keySize: 32
  14. };
  15. let kdf = cryptoFramework.createKdf('HKDF|SHA256|EXTRACT_AND_EXPAND');
  16. let secret = await kdf.generateSecret(spec);
  17. console.info("key derivation output is " + secret.data);
  18. }
  ```
* 通过Promise返回结果：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { BusinessError } from '@kit.BasicServicesKit';
  3. import { buffer } from '@kit.ArkTS';

  5. function kdfPromise() {
  6. let keyData = new Uint8Array(buffer.from("012345678901234567890123456789", "utf-8").buffer);
  7. let saltData = new Uint8Array(buffer.from("0123456789", "utf-8").buffer);
  8. let infoData = new Uint8Array(buffer.from("infostring", "utf-8").buffer);
  9. let spec: cryptoFramework.HKDFSpec = {
  10. algName: 'HKDF',
  11. key: keyData,
  12. salt: saltData,
  13. info: infoData,
  14. keySize: 32
  15. };
  16. let kdf = cryptoFramework.createKdf('HKDF|SHA256|EXTRACT_AND_EXPAND');
  17. let kdfPromise = kdf.generateSecret(spec);
  18. kdfPromise.then((secret) => {
  19. console.info("key derivation output is " + secret.data);
  20. }).catch((error: BusinessError) => {
  21. console.error("key derivation error.");
  22. });
  23. }
  ```
* 通过同步方式返回结果：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. function kdfSync() {
  5. let keyData = new Uint8Array(buffer.from("012345678901234567890123456789", "utf-8").buffer);
  6. let saltData = new Uint8Array(buffer.from("0123456789", "utf-8").buffer);
  7. let infoData = new Uint8Array(buffer.from("infostring", "utf-8").buffer);
  8. let spec: cryptoFramework.HKDFSpec = {
  9. algName: 'HKDF',
  10. key: keyData,
  11. salt: saltData,
  12. info: infoData,
  13. keySize: 32
  14. };
  15. let kdf = cryptoFramework.createKdf('HKDF|SHA256|EXTRACT_AND_EXPAND');
  16. let secret = kdf.generateSecretSync(spec);
  17. console.info("[Sync]key derivation output is " + secret.data);
  18. }
  ```