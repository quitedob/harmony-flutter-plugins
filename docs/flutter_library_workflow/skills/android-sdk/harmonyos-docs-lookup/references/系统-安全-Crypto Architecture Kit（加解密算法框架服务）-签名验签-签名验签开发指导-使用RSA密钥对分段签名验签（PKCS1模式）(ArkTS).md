对应的算法规格请查看[签名验签算法规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sign-sig-verify-overview#rsa)。

**签名**

1. 调用[cryptoFramework.createAsyKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygenerator)、[AsyKeyGenerator.generateKeyPair](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatekeypair-1)，生成密钥算法为RSA、密钥长度为1024位、素数个数为2的非对称密钥对象（KeyPair），包括公钥（PubKey）和私钥（PriKey）。

   如何生成RSA非对称密钥，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#rsa)和[随机生成非对称密钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-randomly)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[cryptoFramework.createSign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesign)，指定字符串参数'RSA1024|PKCS1|SHA256'，创建非对称密钥类型为RSA1024、填充模式为PKCS1、摘要算法为SHA256的Sign实例，用于完成签名操作。
3. 调用[Sign.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-3)，使用私钥（PriKey）初始化Sign实例。
4. 将一次传入数据量设置为64字节，多次调用[Sign.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-3)，传入待签名的数据。当前单次update长度没有限制，开发者可以根据数据量判断如何调用update。
5. 调用[Sign.sign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#sign-1)，生成数据签名。

**验签**

1. 调用[cryptoFramework.createVerify](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateverify)，指定字符串参数'RSA1024|PKCS1|SHA256'，与签名的Sign实例保持一致。创建Verify实例，用于完成验签操作。
2. 调用[Verify.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-5)，使用公钥（PubKey）初始化Verify实例。
3. 调用[Verify.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-5)，传入待验证的数据。当前单次update长度没有限制，开发者可以根据数据量判断如何调用update。
4. 调用[Verify.verify](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#verify-1)，对数据进行验签。

* 异步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. async function signMessageBySegment(priKey: cryptoFramework.PriKey, plainText: Uint8Array) {
  5. let signAlg = "RSA1024|PKCS1|SHA256";
  6. let signer = cryptoFramework.createSign(signAlg);
  7. await signer.init(priKey);
  8. let textSplitLen = 64; // 自定义的数据拆分长度，此处取64。
  9. for (let i = 0; i < plainText.length; i += textSplitLen) {
  10. let updateMessage = plainText.subarray(i, i + textSplitLen);
  11. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  12. // 分段update。
  13. await signer.update(updateMessageBlob);
  14. }
  15. // 已通过分段传入所有明文，故此处sign传入null。
  16. let signData = await signer.sign(null);
  17. return signData;
  18. }
  19. async function verifyMessageBySegment(pubKey: cryptoFramework.PubKey, plainText: Uint8Array, signMessageBlob: cryptoFramework.DataBlob) {
  20. let verifyAlg = "RSA1024|PKCS1|SHA256";
  21. let verifier = cryptoFramework.createVerify(verifyAlg);
  22. await verifier.init(pubKey);
  23. let textSplitLen = 64; // 自定义的数据拆分长度，此处取64。
  24. for (let i = 0; i < plainText.length; i += textSplitLen) {
  25. let updateMessage = plainText.subarray(i, i + textSplitLen);
  26. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  27. // 分段update。
  28. await verifier.update(updateMessageBlob);
  29. }
  30. // 已通过分段传入所有明文，故此处verify第一个参数传入null。
  31. let res = await verifier.verify(null, signMessageBlob);
  32. console.info("verify result is " + res);
  33. return res;
  34. }
  35. async function rsaSignatureBySegment() {
  36. let message = "This is a long plainText! This is a long plainText! This is a long plainText!" +
  37. "This is a long plainText! This is a long plainText! This is a long plainText! This is a long plainText!" +
  38. "This is a long plainText! This is a long plainText! This is a long plainText! This is a long plainText!" +
  39. "This is a long plainText! This is a long plainText! This is a long plainText! This is a long plainText!" +
  40. "This is a long plainText! This is a long plainText! This is a long plainText! This is a long plainText!" +
  41. "This is a long plainText! This is a long plainText! This is a long plainText! This is a long plainText!" +
  42. "This is a long plainText! This is a long plainText! This is a long plainText! This is a long plainText!" +
  43. "This is a long plainText! This is a long plainText! This is a long plainText! This is a long plainText!";
  44. let keyGenAlg = "RSA1024";
  45. let generator = cryptoFramework.createAsyKeyGenerator(keyGenAlg);
  46. let keyPair = await generator.generateKeyPair();
  47. let messageData = new Uint8Array(buffer.from(message, 'utf-8').buffer);
  48. let signData = await signMessageBySegment(keyPair.priKey, messageData);
  49. let verifyResult = await verifyMessageBySegment(keyPair.pubKey, messageData, signData);
  50. if (verifyResult === true) {
  51. console.info('verify success');
  52. } else {
  53. console.error('verify failed');
  54. }
  55. }
  ```
* 同步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. function signMessageBySegment(priKey: cryptoFramework.PriKey, plainText: Uint8Array) {
  5. let signAlg = "RSA1024|PKCS1|SHA256";
  6. let signer = cryptoFramework.createSign(signAlg);
  7. signer.initSync(priKey);
  8. let textSplitLen = 64; // 自定义的数据拆分长度，此处取64。
  9. for (let i = 0; i < plainText.length; i += textSplitLen) {
  10. let updateMessage = plainText.subarray(i, i + textSplitLen);
  11. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  12. // 分段update。
  13. signer.updateSync(updateMessageBlob);
  14. }
  15. // 已通过分段传入所有明文，故此处sign传入null。
  16. let signData = signer.signSync(null);
  17. return signData;
  18. }
  19. function verifyMessageBySegment(pubKey: cryptoFramework.PubKey, plainText: Uint8Array, signMessageBlob: cryptoFramework.DataBlob) {
  20. let verifyAlg = "RSA1024|PKCS1|SHA256";
  21. let verifier = cryptoFramework.createVerify(verifyAlg);
  22. verifier.initSync(pubKey);
  23. let textSplitLen = 64; // 自定义的数据拆分长度，此处取64。
  24. for (let i = 0; i < plainText.length; i += textSplitLen) {
  25. let updateMessage = plainText.subarray(i, i + textSplitLen);
  26. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  27. // 分段update。
  28. verifier.updateSync(updateMessageBlob);
  29. }
  30. // 已通过分段传入所有明文，故此处verify第一个参数传入null。
  31. let res = verifier.verifySync(null, signMessageBlob);
  32. console.info("verify result is " + res);
  33. return res;
  34. }
  35. function rsaSignatureBySegment() {
  36. let message = "This is a long plainText! This is a long plainText! This is a long plainText!" +
  37. "This is a long plainText! This is a long plainText! This is a long plainText! This is a long plainText!" +
  38. "This is a long plainText! This is a long plainText! This is a long plainText! This is a long plainText!" +
  39. "This is a long plainText! This is a long plainText! This is a long plainText! This is a long plainText!" +
  40. "This is a long plainText! This is a long plainText! This is a long plainText! This is a long plainText!" +
  41. "This is a long plainText! This is a long plainText! This is a long plainText! This is a long plainText!" +
  42. "This is a long plainText! This is a long plainText! This is a long plainText! This is a long plainText!" +
  43. "This is a long plainText! This is a long plainText! This is a long plainText! This is a long plainText!";
  44. let keyGenAlg = "RSA1024";
  45. let generator = cryptoFramework.createAsyKeyGenerator(keyGenAlg);
  46. let keyPair = generator.generateKeyPairSync();
  47. let messageData = new Uint8Array(buffer.from(message, 'utf-8').buffer);
  48. let signData = signMessageBySegment(keyPair.priKey, messageData);
  49. let verifyResult = verifyMessageBySegment(keyPair.pubKey, messageData, signData);
  50. if (verifyResult === true) {
  51. console.info('verify success');
  52. } else {
  53. console.error('verify failed');
  54. }
  55. }
  ```