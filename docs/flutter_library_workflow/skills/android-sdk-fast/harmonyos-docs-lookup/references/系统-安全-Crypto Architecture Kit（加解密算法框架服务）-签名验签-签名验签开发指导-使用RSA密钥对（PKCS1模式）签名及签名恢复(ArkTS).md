对应的算法规格请查看[签名验签算法规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sign-sig-verify-overview#rsa)。

**签名**

1. 调用[cryptoFramework.createAsyKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygenerator)、[AsyKeyGenerator.generateKeyPair](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatekeypair-1)，生成密钥算法为RSA、密钥长度为1024位、素数个数为2的非对称密钥对象（KeyPair），包括公钥（PubKey）和私钥（PriKey）。

   如何生成RSA非对称密钥，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#rsa)和[随机生成非对称密钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-randomly)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[cryptoFramework.createSign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesign)，指定字符串参数'RSA1024|PKCS1|SHA256|SignOnly'，创建非对称密钥类型为RSA1024、填充模式为PKCS1、摘要算法为SHA256的Sign实例，用于完成仅签名操作。
3. 调用[Sign.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-3)，使用私钥（PriKey）初始化Sign实例。
4. 调用[Sign.sign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#sign-1)，生成数据签名。

**验签**

1. 调用[cryptoFramework.createVerify](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateverify)，指定字符串参数'RSA1024|PKCS1|SHA256|Recover'，与签名的Sign实例保持一致。创建Verify实例，用于完成验签操作。
2. 调用[Verify.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-5)，使用公钥（PubKey）初始化Verify实例。
3. 调用[Verify.recover](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#recover12)，对数据进行签名恢复。

* 异步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. let input1: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from("This is Sign test plan1", 'utf-8').buffer) };

  6. async function signMessagePromise(priKey: cryptoFramework.PriKey) {
  7. let signAlg = "RSA1024|PKCS1|NoHash|OnlySign";
  8. let signer = cryptoFramework.createSign(signAlg);
  9. await signer.init(priKey);
  10. let signData = await signer.sign(input1);
  11. return signData;
  12. }

  14. async function verifyMessagePromise(signMessageBlob: cryptoFramework.DataBlob, pubKey: cryptoFramework.PubKey) {
  15. let verifyAlg = "RSA1024|PKCS1|NoHash|Recover";
  16. let verifier = cryptoFramework.createVerify(verifyAlg);
  17. await verifier.init(pubKey);
  18. let rawSignData = await verifier.recover(signMessageBlob);
  19. return rawSignData;
  20. }

  22. async function main() {
  23. let keyGenAlg = "RSA1024";
  24. let generator = cryptoFramework.createAsyKeyGenerator(keyGenAlg);
  25. let keyPair = await generator.generateKeyPair();
  26. let signData = await signMessagePromise(keyPair.priKey);
  27. let rawSignData = await verifyMessagePromise(signData, keyPair.pubKey);
  28. if (rawSignData !== null) {
  29. console.info('recover result: ' + rawSignData.data);
  30. } else {
  31. console.error("get verify recover result fail!");
  32. }
  33. }
  ```
* 同步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. let input1: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from("This is Sign test plan1", 'utf-8').buffer) };

  6. function signMessagePromise(priKey: cryptoFramework.PriKey) {
  7. let signAlg = "RSA1024|PKCS1|NoHash|OnlySign";
  8. let signer = cryptoFramework.createSign(signAlg);
  9. signer.initSync(priKey);
  10. let signData = signer.signSync(input1);
  11. return signData;
  12. }

  14. function verifyMessagePromise(signMessageBlob: cryptoFramework.DataBlob, pubKey: cryptoFramework.PubKey) {
  15. let verifyAlg = "RSA1024|PKCS1|NoHash|Recover";
  16. let verifier = cryptoFramework.createVerify(verifyAlg);
  17. verifier.initSync(pubKey);
  18. let rawSignData = verifier.recoverSync(signMessageBlob);
  19. return rawSignData;
  20. }

  22. function main() {
  23. let keyGenAlg = "RSA1024";
  24. let generator = cryptoFramework.createAsyKeyGenerator(keyGenAlg);
  25. let keyPair = generator.generateKeyPairSync();
  26. let signData = signMessagePromise(keyPair.priKey);
  27. let rawSignData = verifyMessagePromise(signData, keyPair.pubKey);
  28. if (rawSignData !== null) {
  29. console.info('recover result: ' + rawSignData.data);
  30. } else {
  31. console.error("get verify recover result fail!");
  32. }
  33. }
  ```