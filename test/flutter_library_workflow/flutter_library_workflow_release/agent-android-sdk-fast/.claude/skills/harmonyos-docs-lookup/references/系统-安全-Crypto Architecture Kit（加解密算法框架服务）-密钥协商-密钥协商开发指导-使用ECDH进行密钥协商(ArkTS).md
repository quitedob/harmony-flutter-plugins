对应的算法规格请查看[密钥协商算法规格：ECDH](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-key-agreement-overview#ecdh)。

## 开发步骤

1. 调用[cryptoFramework.createAsyKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygenerator)、[AsyKeyGenerator.generateKeyPair](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatekeypair-1)、[AsyKeyGenerator.convertKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkey-3)生成密钥算法为ECC、密钥长度为256位的非对称密钥（KeyPair）。

   如何生成ECC非对称密钥，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：ECC](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#ecc)和[随机生成非对称密钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-randomly)理解。参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[cryptoFramework.createKeyAgreement](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatekeyagreement)，指定字符串参数'ECC256'，创建密钥算法为ECC、密钥长度为256位的密钥协议生成器（KeyAgreement）。
3. 调用[KeyAgreement.generateSecret](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatesecret-1)，基于传入的私钥（KeyPair.priKey）与公钥（KeyPair.pubKey）进行密钥协商，返回共享密钥。

* 以使用await方式，完成密钥协商为例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. async function ecdhAwait() {
  4. // 假设此公私钥对数据为外部传入。
  5. let pubKeyArray = new Uint8Array([48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7, 3, 66, 0, 4, 83, 96, 142, 9, 86, 214, 126, 106, 247, 233, 92, 125, 4, 128, 138, 105, 246, 162, 215, 71, 81, 58, 202, 121, 26, 105, 211, 55, 130, 45, 236, 143, 55, 16, 248, 75, 167, 160, 167, 106, 2, 152, 243, 44, 68, 66, 0, 167, 99, 92, 235, 215, 159, 239, 28, 106, 124, 171, 34, 145, 124, 174, 57, 92]);
  6. let priKeyArray = new Uint8Array([48, 49, 2, 1, 1, 4, 32, 115, 56, 137, 35, 207, 0, 60, 191, 90, 61, 136, 105, 210, 16, 27, 4, 171, 57, 10, 61, 123, 40, 189, 28, 34, 207, 236, 22, 45, 223, 10, 189, 160, 10, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7]);
  7. let eccGen = cryptoFramework.createAsyKeyGenerator('ECC256');
  8. // 外部传入的公私钥对A。
  9. let keyPairA = await eccGen.convertKey({ data: pubKeyArray }, { data: priKeyArray });
  10. // 内部生成的公私钥对B。
  11. let keyPairB = await eccGen.generateKeyPair();
  12. let eccKeyAgreement = cryptoFramework.createKeyAgreement('ECC256');
  13. // 使用A的公钥和B的私钥进行密钥协商。
  14. let secret1 = await eccKeyAgreement.generateSecret(keyPairB.priKey, keyPairA.pubKey);
  15. // 使用A的私钥和B的公钥进行密钥协商。
  16. let secret2 = await eccKeyAgreement.generateSecret(keyPairA.priKey, keyPairB.pubKey);
  17. // 两种协商的结果应当一致。
  18. if (secret1.data.toString() === secret2.data.toString()) {
  19. console.info('ecdh success');
  20. console.info('ecdh output is ' + secret1.data);
  21. } else {
  22. console.error('ecdh result is not equal');
  23. }
  24. }
  ```
* 同步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. function ecdhSync() {
  4. // 假设此公私钥对数据为外部传入。
  5. let pubKeyArray = new Uint8Array([48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7, 3, 66, 0, 4, 83, 96, 142, 9, 86, 214, 126, 106, 247, 233, 92, 125, 4, 128, 138, 105, 246, 162, 215, 71, 81, 58, 202, 121, 26, 105, 211, 55, 130, 45, 236, 143, 55, 16, 248, 75, 167, 160, 167, 106, 2, 152, 243, 44, 68, 66, 0, 167, 99, 92, 235, 215, 159, 239, 28, 106, 124, 171, 34, 145, 124, 174, 57, 92]);
  6. let priKeyArray = new Uint8Array([48, 49, 2, 1, 1, 4, 32, 115, 56, 137, 35, 207, 0, 60, 191, 90, 61, 136, 105, 210, 16, 27, 4, 171, 57, 10, 61, 123, 40, 189, 28, 34, 207, 236, 22, 45, 223, 10, 189, 160, 10, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7]);
  7. let eccGen = cryptoFramework.createAsyKeyGenerator('ECC256');
  8. // 外部传入的公私钥对A。
  9. let keyPairA = eccGen.convertKeySync({ data: pubKeyArray }, { data: priKeyArray });
  10. // 内部生成的公私钥对B。
  11. let keyPairB = eccGen.generateKeyPairSync();
  12. let eccKeyAgreement = cryptoFramework.createKeyAgreement('ECC256');
  13. // 使用A的公钥和B的私钥进行密钥协商。
  14. let secret1 = eccKeyAgreement.generateSecretSync(keyPairB.priKey, keyPairA.pubKey);
  15. // 使用A的私钥和B的公钥进行密钥协商。
  16. let secret2 = eccKeyAgreement.generateSecretSync(keyPairA.priKey, keyPairB.pubKey);
  17. // 两种协商的结果应当一致。
  18. if (secret1.data.toString() === secret2.data.toString()) {
  19. console.info('ecdh success');
  20. console.info('ecdh output is ' + secret1.data);
  21. } else {
  22. console.error('ecdh result is not equal');
  23. }
  24. }
  ```