对应的算法规格请查看[非对称密钥加解密算法规格：SM2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-encrypt-decrypt-spec#sm2)。

**加密**

1. 调用[cryptoFramework.createAsyKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygenerator)、[AsyKeyGenerator.generateKeyPair](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatekeypair-1)，生成SM2密钥类型为SM2\_256的非对称密钥对（KeyPair）。KeyPair对象中包括公钥PubKey、私钥PriKey。

   如何生成SM2非对称密钥对，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：SM2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#sm2)和[随机生成非对称密钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-randomly)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'SM2\_256|SM3'，创建非对称密钥类型为SM2\_256、摘要算法为SM3的Cipher实例，用于完成加解密操作。
3. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为加密（CryptoMode.ENCRYPT\_MODE），指定加密密钥（KeyPair.PubKey），初始化加密Cipher实例。

   非对称密钥无加密参数，直接传入null。
4. 调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，传入明文，获取加密后的数据。

   doFinal输出结果可能为null，在访问具体数据前，需要先判断结果是否为null，避免产生异常。

**解密**

1. 由于SM2算法的Cipher实例不支持重复init操作，需要调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，重新生成Cipher实例。
2. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为解密（CryptoMode.DECRYPT\_MODE），指定解密密钥（KeyPair.PriKey）初始化解密Cipher实例。SM2无加密参数，直接传入null。
3. 调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，传入密文，获取解密后的数据。

* 异步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. // 加密消息。
  5. async function encryptMessagePromise(publicKey: cryptoFramework.PubKey, plainText: cryptoFramework.DataBlob) {
  6. let cipher = cryptoFramework.createCipher('SM2_256|SM3');
  7. await cipher.init(cryptoFramework.CryptoMode.ENCRYPT_MODE, publicKey, null);
  8. let encryptData = await cipher.doFinal(plainText);
  9. return encryptData;
  10. }
  11. // 解密消息。
  12. async function decryptMessagePromise(privateKey: cryptoFramework.PriKey, cipherText: cryptoFramework.DataBlob) {
  13. let decoder = cryptoFramework.createCipher('SM2_256|SM3');
  14. await decoder.init(cryptoFramework.CryptoMode.DECRYPT_MODE, privateKey, null);
  15. let decryptData = await decoder.doFinal(cipherText);
  16. return decryptData;
  17. }
  18. // 生成SM2密钥对。
  19. async function genKeyPairByData(pubKeyData: Uint8Array, priKeyData: Uint8Array) {
  20. let pubKeyBlob: cryptoFramework.DataBlob = { data: pubKeyData };
  21. let priKeyBlob: cryptoFramework.DataBlob = { data: priKeyData };
  22. let sm2Generator = cryptoFramework.createAsyKeyGenerator('SM2_256');
  23. let keyPair = await sm2Generator.convertKey(pubKeyBlob, priKeyBlob);
  24. console.info('convertKey success');
  25. return keyPair;
  26. }
  27. async function main() {
  28. let pkData = new Uint8Array([48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 129, 28, 207, 85, 1, 130, 45, 3, 66, 0, 4, 90, 3, 58, 157, 190, 248, 76, 7, 132, 200, 151, 208, 112, 230, 96, 140, 90, 238, 211, 155, 128, 109, 248, 40, 83, 214, 78, 42, 104, 106, 55, 148, 249, 35, 61, 32, 221, 135, 143, 100, 45, 97, 194, 176, 52, 73, 136, 174, 40, 70, 70, 34, 103, 103, 161, 99, 27, 187, 13, 187, 109, 244, 13, 7]);
  29. let skData = new Uint8Array([48, 49, 2, 1, 1, 4, 32, 54, 41, 239, 240, 63, 188, 134, 113, 31, 102, 149, 203, 245, 89, 15, 15, 47, 202, 170, 60, 38, 154, 28, 169, 189, 100, 251, 76, 112, 223, 156, 159, 160, 10, 6, 8, 42, 129, 28, 207, 85, 1, 130, 45]);
  30. let keyPair = await genKeyPairByData(pkData, skData);
  31. let pubKey = keyPair.pubKey;
  32. let priKey = keyPair.priKey;
  33. let message = 'This is a test';
  34. // 把字符串按utf-8解码为Uint8Array。
  35. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  36. let encryptText = await encryptMessagePromise(pubKey, plainText);
  37. let decryptText = await decryptMessagePromise(priKey, encryptText);
  38. if (plainText.data.toString() === decryptText.data.toString()) {
  39. console.info('decrypt ok');
  40. // 把Uint8Array按utf-8编码为字符串。
  41. let messageDecrypted = buffer.from(decryptText.data).toString('utf-8');
  42. console.info('decrypted result string:' + messageDecrypted);
  43. } else {
  44. console.error('decrypt failed');
  45. }
  46. }
  ```
* 同步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. // 加密消息。
  5. function encryptMessage(publicKey: cryptoFramework.PubKey, plainText: cryptoFramework.DataBlob) {
  6. let cipher = cryptoFramework.createCipher('SM2_256|SM3');
  7. cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, publicKey, null);
  8. let encryptData = cipher.doFinalSync(plainText);
  9. return encryptData;
  10. }
  11. // 解密消息。
  12. function decryptMessage(privateKey: cryptoFramework.PriKey, cipherText: cryptoFramework.DataBlob) {
  13. let decoder = cryptoFramework.createCipher('SM2_256|SM3');
  14. decoder.initSync(cryptoFramework.CryptoMode.DECRYPT_MODE, privateKey, null);
  15. let decryptData = decoder.doFinalSync(cipherText);
  16. return decryptData;
  17. }
  18. // 生成SM2密钥对。
  19. function genKeyPairByData(pubKeyData: Uint8Array, priKeyData: Uint8Array) {
  20. let pubKeyBlob: cryptoFramework.DataBlob = { data: pubKeyData };
  21. let priKeyBlob: cryptoFramework.DataBlob = { data: priKeyData };
  22. let sm2Generator = cryptoFramework.createAsyKeyGenerator('SM2_256');
  23. let keyPair = sm2Generator.convertKeySync(pubKeyBlob, priKeyBlob);
  24. console.info('convertKeySync success');
  25. return keyPair;
  26. }
  27. function main() {
  28. let pkData = new Uint8Array([48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 129, 28, 207, 85, 1, 130, 45, 3, 66, 0, 4, 90, 3, 58, 157, 190, 248, 76, 7, 132, 200, 151, 208, 112, 230, 96, 140, 90, 238, 211, 155, 128, 109, 248, 40, 83, 214, 78, 42, 104, 106, 55, 148, 249, 35, 61, 32, 221, 135, 143, 100, 45, 97, 194, 176, 52, 73, 136, 174, 40, 70, 70, 34, 103, 103, 161, 99, 27, 187, 13, 187, 109, 244, 13, 7]);
  29. let skData = new Uint8Array([48, 49, 2, 1, 1, 4, 32, 54, 41, 239, 240, 63, 188, 134, 113, 31, 102, 149, 203, 245, 89, 15, 15, 47, 202, 170, 60, 38, 154, 28, 169, 189, 100, 251, 76, 112, 223, 156, 159, 160, 10, 6, 8, 42, 129, 28, 207, 85, 1, 130, 45]);
  30. let keyPair = genKeyPairByData(pkData, skData);
  31. let pubKey = keyPair.pubKey;
  32. let priKey = keyPair.priKey;
  33. let message = 'This is a test';
  34. // 把字符串按utf-8解码为Uint8Array。
  35. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  36. let encryptText = encryptMessage(pubKey, plainText);
  37. let decryptText = decryptMessage(priKey, encryptText);
  38. if (plainText.data.toString() === decryptText.data.toString()) {
  39. console.info('decrypt ok');
  40. // 把Uint8Array按utf-8编码为字符串。
  41. let messageDecrypted = buffer.from(decryptText.data).toString('utf-8');
  42. console.info('decrypted result string:' + messageDecrypted);
  43. } else {
  44. console.error('decrypt failed');
  45. }
  46. }
  ```