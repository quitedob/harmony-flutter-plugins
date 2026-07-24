对应的算法规格请查看[密钥派生算法规格：PBKDF2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-key-derivation-overview#pbkdf2算法)。

## 开发步骤

1. 构造[PBKDF2Spec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#pbkdf2spec11)对象，作为密钥派生参数进行密钥派生。

   PBKDF2Spec是[KdfSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#kdfspec11)的子类，需要指定：

   * algName：指定算法'PBKDF2'。
   * password：用于生成派生密钥的原始密码。

     如果使用string类型，需要直接传入用于密钥派生的数据，而不是HexString、base64等字符串类型。同时需要确保该字符串为utf-8编码，否则派生结果会有差异。
   * salt：盐值。
   * iterations：重复运算的次数，需要为正整数。
   * keySize：目标密钥的字节长度，需要为正整数。
2. 调用[cryptoFramework.createKdf](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatekdf11)，指定字符串参数'PBKDF2|SHA256'，创建密钥派生算法为PBKDF2、HMAC函数摘要算法为SHA256的密钥派生函数对象（Kdf）。
3. 输入PBKDF2Spec对象，调用[Kdf.generateSecret](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatesecret11)进行密钥派生。

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

  3. async function kdfAwait() {
  4. let spec: cryptoFramework.PBKDF2Spec = {
  5. algName: 'PBKDF2',
  6. password: '123456',
  7. salt: new Uint8Array(16),
  8. iterations: 10000,
  9. keySize: 32
  10. };
  11. let kdf = cryptoFramework.createKdf('PBKDF2|SHA256');
  12. let secret = await kdf.generateSecret(spec);
  13. console.info("key derivation output is " + secret.data);
  14. }
  ```
* 通过Promise返回结果：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { BusinessError } from '@kit.BasicServicesKit';

  4. function kdfPromise() {
  5. let spec: cryptoFramework.PBKDF2Spec = {
  6. algName: 'PBKDF2',
  7. password: '123456',
  8. salt: new Uint8Array(16),
  9. iterations: 10000,
  10. keySize: 32
  11. };
  12. let kdf = cryptoFramework.createKdf('PBKDF2|SHA256');
  13. let kdfPromise = kdf.generateSecret(spec);
  14. kdfPromise.then((secret) => {
  15. console.info("key derivation output is " + secret.data);
  16. }).catch((error: BusinessError) => {
  17. console.error("key derivation error.");
  18. });
  19. }
  ```
* 通过同步方式返回结果：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. function kdfSync() {
  4. let spec: cryptoFramework.PBKDF2Spec = {
  5. algName: 'PBKDF2',
  6. password: '123456',
  7. salt: new Uint8Array(16),
  8. iterations: 10000,
  9. keySize: 32
  10. };
  11. let kdf = cryptoFramework.createKdf('PBKDF2|SHA256');
  12. let secret = kdf.generateSecretSync(spec);
  13. console.info("[Sync]key derivation output is " + secret.data);
  14. }
  ```