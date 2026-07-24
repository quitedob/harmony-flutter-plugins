对应的算法规格请查看[密钥派生算法规格：SCRYPT](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-key-derivation-overview#scrypt算法)。

## 开发步骤

1. 构造[ScryptSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#scryptspec18)对象，作为密钥派生参数进行密钥派生。

   ScryptSpec是[KdfSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#kdfspec11)的子类，需要指定：

   * algName：指定算法名为'SCRYPT'。
   * passphrase：用于生成派生密钥的原始密码。

     如果使用string类型，需要直接传入用于密钥派生的数据，而不是HexString、base64等字符串类型。同时需要确保该字符串为utf-8编码，否则派生结果会有差异。
   * salt：盐值。
   * n：迭代次数，需要为正整数。
   * p：并行化参数，需要为正整数。
   * r：块大小参数，需要为正整数。
   * maxMemory：最大内存限制参数，需要为正整数。
   * keySize：目标密钥的字节长度，需要为正整数。
2. 调用[cryptoFramework.createKdf](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatekdf11)，指定字符串参数'SCRYPT'，创建密钥派生算法为SCRYPT的密钥派生函数对象（Kdf）。
3. 输入SCRYPT对象，调用[Kdf.generateSecret](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatesecret11)进行密钥派生。

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
  2. import { BusinessError } from '@kit.BasicServicesKit';

  4. async function ScryptAwait() {
  5. try {
  6. let spec: cryptoFramework.ScryptSpec = {
  7. algName: 'SCRYPT',
  8. salt: new Uint8Array(16),
  9. passphrase: "password",
  10. n:1024,
  11. p:16,
  12. r:8,
  13. maxMemory:1024 * 16 * 8 * 10, //n * p * r * 10
  14. keySize: 64
  15. };
  16. let kdf = cryptoFramework.createKdf('SCRYPT');
  17. let secret = await kdf.generateSecret(spec);
  18. console.info("key derivation output is " + secret.data);
  19. } catch(error) {
  20. let e: BusinessError = error as BusinessError;
  21. console.error('key derivation failed, errCode: ' + e.code + ', errMsg: ' + e.message);
  22. }
  23. }
  ```
* 通过Promise返回结果：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { BusinessError } from '@kit.BasicServicesKit';

  4. function ScryptPromise() {
  5. let spec: cryptoFramework.ScryptSpec = {
  6. algName: 'SCRYPT',
  7. passphrase: '123456',
  8. salt: new Uint8Array(16),
  9. n:1024,
  10. p:16,
  11. r:8,
  12. maxMemory:1024 * 16 * 8 * 10, //n * p * r * 10
  13. keySize: 64
  14. };
  15. let kdf = cryptoFramework.createKdf('SCRYPT');
  16. let kdfPromise = kdf.generateSecret(spec);
  17. kdfPromise.then((secret) => {
  18. console.info("key derivation output is " + secret.data);
  19. }).catch((error: BusinessError) => {
  20. console.error("key derivation error.");
  21. });
  22. }
  ```
* 通过同步方式返回结果：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { BusinessError } from '@kit.BasicServicesKit';

  4. function kdfSync() {
  5. try {
  6. let spec: cryptoFramework.ScryptSpec = {
  7. algName: 'SCRYPT',
  8. passphrase: '123456',
  9. salt: new Uint8Array(16),
  10. n:1024,
  11. p:16,
  12. r:8,
  13. maxMemory:1024 * 16 * 8 * 10, //n * p * r * 10
  14. keySize: 64
  15. };
  16. let kdf = cryptoFramework.createKdf('SCRYPT');
  17. let secret = kdf.generateSecretSync(spec);
  18. console.info("[Sync]key derivation output is " + secret.data);
  19. } catch(error) {
  20. let e: BusinessError = error as BusinessError;
  21. console.error('key derivation failed, errCode: ' + e.code + ', errMsg: ' + e.message);
  22. }
  23. }
  ```