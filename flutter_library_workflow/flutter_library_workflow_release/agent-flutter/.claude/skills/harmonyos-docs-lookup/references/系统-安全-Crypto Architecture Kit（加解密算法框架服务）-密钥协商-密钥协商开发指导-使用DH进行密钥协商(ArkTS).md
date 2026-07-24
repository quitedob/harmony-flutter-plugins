对应的算法规格请查看[密钥协商算法规格：DH](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-key-agreement-overview#dh)。

## 开发步骤

1. 调用[cryptoFramework.createAsyKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygenerator)、[AsyKeyGenerator.generateKeyPair](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatekeypair-1)生成密钥算法为DH、采用知名安全素数群modp1536的非对称密钥（KeyPair）。

   如何生成DH非对称密钥，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：DH](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#dh)和[随机生成非对称密钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-randomly)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[cryptoFramework.createKeyAgreement](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatekeyagreement)，指定字符串参数'DH\_modp1536'，创建密钥算法为DH、采用知名安全素数群modp1536的密钥协议生成器（KeyAgreement）。
3. 调用[KeyAgreement.generateSecret](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatesecret-1)，基于传入的私钥（KeyPair.priKey）与公钥（KeyPair.pubKey）进行密钥协商，返回共享秘密。

* 异步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. async function dhAwait() {
  4. let keyGen = cryptoFramework.createAsyKeyGenerator('DH_modp1536');
  5. // 随机生成公私钥对A。
  6. let keyPairA = await keyGen.generateKeyPair();
  7. // 随机生成规格一致的公私钥对B。
  8. let keyPairB = await keyGen.generateKeyPair();
  9. let keyAgreement = cryptoFramework.createKeyAgreement('DH_modp1536');
  10. // 使用A的公钥和B的私钥进行密钥协商。
  11. let secret1 = await keyAgreement.generateSecret(keyPairB.priKey, keyPairA.pubKey);
  12. // 使用A的私钥和B的公钥进行密钥协商。
  13. let secret2 = await keyAgreement.generateSecret(keyPairA.priKey, keyPairB.pubKey);
  14. // 两种协商的结果应当一致。
  15. if (secret1.data.toString() === secret2.data.toString()) {
  16. console.info('DH success');
  17. console.info('DH output is ' + secret1.data);
  18. } else {
  19. console.error('DH result is not equal');
  20. }
  21. }
  ```
* 同步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. function dhAgreementSync() {
  4. let keyGen = cryptoFramework.createAsyKeyGenerator('DH_modp1536');
  5. // 随机生成公私钥对A。
  6. let keyPairA = keyGen.generateKeyPairSync();
  7. // 随机生成规格一致的公私钥对B。
  8. let keyPairB = keyGen.generateKeyPairSync();
  9. let keyAgreement = cryptoFramework.createKeyAgreement('DH_modp1536');
  10. // 使用A的公钥和B的私钥进行密钥协商。
  11. let secret1 = keyAgreement.generateSecretSync(keyPairB.priKey, keyPairA.pubKey);
  12. // 使用A的私钥和B的公钥进行密钥协商。
  13. let secret2 = keyAgreement.generateSecretSync(keyPairA.priKey, keyPairB.pubKey);
  14. // 两种协商的结果应当一致。
  15. if (secret1.data.toString() === secret2.data.toString()) {
  16. console.info('DH success');
  17. console.info('DH output is ' + secret1.data);
  18. } else {
  19. console.error('DH result is not equal');
  20. }
  21. }
  ```