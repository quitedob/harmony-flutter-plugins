对应的算法规格请查看[签名验签算法规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sign-sig-verify-overview#rsa)。

**签名**

1. 调用[cryptoFramework.createAsyKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygenerator)、[AsyKeyGenerator.generateKeyPair](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatekeypair-1)，生成密钥算法为RSA、密钥长度为1024位、素数个数为2的非对称密钥对象（KeyPair），包括公钥（PubKey）和私钥（PriKey）。

   如何生成RSA非对称密钥，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#rsa)和[随机生成非对称密钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-randomly)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[cryptoFramework.createSign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesign)，指定字符串参数'RSA1024|PKCS1|SHA256'，创建非对称密钥类型为RSA1024、填充模式为PKCS1、摘要算法为SHA256的Sign实例，用于完成签名操作。
3. 调用[Sign.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-3)，使用私钥（PriKey）初始化Sign实例。
4. 调用[Sign.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-3)，传入待签名的数据。

   当前单次update长度没有限制，开发者可以根据数据量判断如何调用update。

   * 当待签名的数据较短时，可以在init完成后直接调用sign。
   * 当数据量较大时，可以多次调用update，即[分段签名验签](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-rsa-sign-sig-verify-pkcs1-by-segment)。
5. 调用[Sign.sign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#sign-1)，生成数据签名。

**验签**

1. 调用[cryptoFramework.createVerify](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateverify)，指定字符串参数'RSA1024|PKCS1|SHA256'，与签名的Sign实例保持一致。创建Verify实例，用于完成验签操作。
2. 调用[Verify.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-5)，使用公钥（PubKey）初始化Verify实例。
3. 调用[Verify.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-5)，传入待验证的数据。

   当前单次update长度没有限制，开发者可以根据数据量判断如何调用update。

   * 当待签名的数据较短时，可以在init完成后直接调用verify。
   * 当数据量较大时，可以多次调用update，即[分段签名验签](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-rsa-sign-sig-verify-pkcs1-by-segment)。
4. 调用[Verify.verify](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#verify-1)，对数据进行验签。

* 异步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. // 完整的明文被拆分为input1和input2。
  5. let input1: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from("This is Sign test plan1", 'utf-8').buffer) };
  6. let input2: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from("This is Sign test plan2", 'utf-8').buffer) };

  8. async function signMessagePromise(priKey: cryptoFramework.PriKey) {
  9. let signAlg = "RSA1024|PKCS1|SHA256";
  10. let signer = cryptoFramework.createSign(signAlg);
  11. await signer.init(priKey);
  12. await signer.update(input1); // 如果明文较短，可以直接调用sign接口一次性传入。
  13. let signData = await signer.sign(input2);
  14. return signData;
  15. }

  17. async function verifyMessagePromise(signMessageBlob: cryptoFramework.DataBlob, pubKey: cryptoFramework.PubKey) {
  18. let verifyAlg = "RSA1024|PKCS1|SHA256";
  19. let verifier = cryptoFramework.createVerify(verifyAlg);
  20. await verifier.init(pubKey);
  21. await verifier.update(input1); // 如果明文较短，可以直接调用verify接口一次性传入。
  22. let res = await verifier.verify(input2, signMessageBlob);
  23. console.info("verify result is " + res);
  24. return res;
  25. }

  27. async function main() {
  28. let keyGenAlg = "RSA1024";
  29. let generator = cryptoFramework.createAsyKeyGenerator(keyGenAlg);
  30. let keyPair = await generator.generateKeyPair();
  31. let signData = await signMessagePromise(keyPair.priKey);
  32. let verifyResult = await verifyMessagePromise(signData, keyPair.pubKey);
  33. if (verifyResult === true) {
  34. console.info('verify success');
  35. } else {
  36. console.error('verify failed');
  37. }
  38. }
  ```
* 同步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. // 完整的明文被拆分为input1和input2。
  5. let input1: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from("This is Sign test plan1", 'utf-8').buffer) };
  6. let input2: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from("This is Sign test plan2", 'utf-8').buffer) };

  8. function signMessagePromise(priKey: cryptoFramework.PriKey) {
  9. let signAlg = "RSA1024|PKCS1|SHA256";
  10. let signer = cryptoFramework.createSign(signAlg);
  11. signer.initSync(priKey);
  12. signer.updateSync(input1); // 如果明文较短，可以直接调用sign接口一次性传入。
  13. let signData = signer.signSync(input2);
  14. return signData;
  15. }

  17. function verifyMessagePromise(signMessageBlob: cryptoFramework.DataBlob, pubKey: cryptoFramework.PubKey) {
  18. let verifyAlg = "RSA1024|PKCS1|SHA256";
  19. let verifier = cryptoFramework.createVerify(verifyAlg);
  20. verifier.initSync(pubKey);
  21. verifier.updateSync(input1); // 如果明文较短，可以直接调用verify接口一次性传入。
  22. let res = verifier.verifySync(input2, signMessageBlob);
  23. console.info("verify result is " + res);
  24. return res;
  25. }

  27. function main() {
  28. let keyGenAlg = "RSA1024";
  29. let generator = cryptoFramework.createAsyKeyGenerator(keyGenAlg);
  30. let keyPair = generator.generateKeyPairSync();
  31. let signData = signMessagePromise(keyPair.priKey);
  32. let verifyResult = verifyMessagePromise(signData, keyPair.pubKey);
  33. if (verifyResult === true) {
  34. console.info('verify success');
  35. } else {
  36. console.error('verify failed');
  37. }
  38. }
  ```