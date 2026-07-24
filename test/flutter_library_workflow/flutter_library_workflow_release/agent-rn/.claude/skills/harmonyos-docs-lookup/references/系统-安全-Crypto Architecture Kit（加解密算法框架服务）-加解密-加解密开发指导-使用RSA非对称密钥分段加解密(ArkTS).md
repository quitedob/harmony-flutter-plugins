对应的算法规格请查看[非对称密钥加解密算法规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-encrypt-decrypt-spec#rsa)。

**加密**

1. 调用[cryptoFramework.createAsyKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygenerator)、[AsyKeyGenerator.generateKeyPair](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatekeypair-1)，生成RSA密钥类型为RSA1024、素数个数为2（不填默认）的非对称密钥对（KeyPair）。KeyPair对象中包括公钥PubKey、私钥PriKey。

   如何生成RSA非对称密钥对，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#rsa)和[随机生成非对称密钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-randomly)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'RSA1024|PKCS1'，创建非对称密钥类型为RSA1024、填充模式为PKCS1的Cipher实例，用于完成加解密操作。
3. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为加密（CryptoMode.ENCRYPT\_MODE），指定加密密钥（KeyPair.PubKey），初始化加密Cipher实例。
4. 多次调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，传入明文，获取加密后的数据。

   doFinal输出结果可能为null，在访问具体数据前，需要先判断结果是否为null，避免产生异常。

   此处将明文按64个字节一组拆分，多次加密。使用1024位密钥，每次将生成128字节密文。

   说明

   非对称密钥的分段加解密是指当明文大于单次加解密支持的数据长度时，需要将待加解密数据分为合适长度的数据段，并对每个数据段执行加解密操作。详细介绍可见[非对称分段加解密介绍](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-encrypt-decrypt-by-segment#非对称加解密)。

**解密**

1. 由于RSA算法的Cipher实例不支持重复init操作，需要调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，重新生成Cipher实例。
2. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为解密（CryptoMode.DECRYPT\_MODE），指定解密密钥（KeyPair.PriKey）初始化解密Cipher实例。PKCS1模式无加密参数，直接传入null。
3. 多次调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，传入密文，获取解密后的数据。

* 异步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. // 分段加密消息。
  5. async function rsaEncryptBySegment(pubKey: cryptoFramework.PubKey, plainText: cryptoFramework.DataBlob) {
  6. let cipher = cryptoFramework.createCipher('RSA1024|PKCS1');
  7. await cipher.init(cryptoFramework.CryptoMode.ENCRYPT_MODE, pubKey, null);
  8. let plainTextSplitLen = 64;
  9. let cipherText = new Uint8Array();
  10. for (let i = 0; i < plainText.data.length; i += plainTextSplitLen) {
  11. let updateMessage = plainText.data.subarray(i, i + plainTextSplitLen);
  12. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  13. // 将原文按64字符进行拆分，循环调用doFinal进行加密，使用1024bit密钥时，每次加密生成128字节长度的密文。
  14. let updateOutput = await cipher.doFinal(updateMessageBlob);
  15. let mergeText = new Uint8Array(cipherText.length + updateOutput.data.length);
  16. mergeText.set(cipherText);
  17. mergeText.set(updateOutput.data, cipherText.length);
  18. cipherText = mergeText;
  19. }
  20. let cipherBlob: cryptoFramework.DataBlob = { data: cipherText };
  21. return cipherBlob;
  22. }

  24. // 分段解密消息。
  25. async function rsaDecryptBySegment(priKey: cryptoFramework.PriKey, cipherText: cryptoFramework.DataBlob) {
  26. let decoder = cryptoFramework.createCipher('RSA1024|PKCS1');
  27. await decoder.init(cryptoFramework.CryptoMode.DECRYPT_MODE, priKey, null);
  28. let cipherTextSplitLen = 128; // RSA密钥每次加密生成的密文字节长度计算方式：密钥位数/8。
  29. let decryptText = new Uint8Array();
  30. for (let i = 0; i < cipherText.data.length; i += cipherTextSplitLen) {
  31. let updateMessage = cipherText.data.subarray(i, i + cipherTextSplitLen);
  32. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  33. // 将密文按128字节进行拆分解密，得到原文后进行拼接。
  34. let updateOutput = await decoder.doFinal(updateMessageBlob);
  35. let mergeText = new Uint8Array(decryptText.length + updateOutput.data.length);
  36. mergeText.set(decryptText);
  37. mergeText.set(updateOutput.data, decryptText.length);
  38. decryptText = mergeText;
  39. }
  40. let decryptBlob: cryptoFramework.DataBlob = { data: decryptText };
  41. return decryptBlob;
  42. }

  44. async function rsaEncryptLongMessage() {
  45. let message = "This is a long plainTest! This is a long plainTest! This is a long plainTest!" +
  46. "This is a long plainTest! This is a long plainTest! This is a long plainTest! This is a long plainTest!" +
  47. "This is a long plainTest! This is a long plainTest! This is a long plainTest! This is a long plainTest!" +
  48. "This is a long plainTest! This is a long plainTest! This is a long plainTest! This is a long plainTest!" +
  49. "This is a long plainTest! This is a long plainTest! This is a long plainTest! This is a long plainTest!" +
  50. "This is a long plainTest! This is a long plainTest! This is a long plainTest! This is a long plainTest!" +
  51. "This is a long plainTest! This is a long plainTest! This is a long plainTest! This is a long plainTest!" +
  52. "This is a long plainTest! This is a long plainTest! This is a long plainTest! This is a long plainTest!";
  53. let asyKeyGenerator = cryptoFramework.createAsyKeyGenerator("RSA1024"); // 创建非对称密钥生成器对象。
  54. let keyPair = await asyKeyGenerator.generateKeyPair(); // 随机生成RSA密钥。
  55. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  56. let encryptText = await rsaEncryptBySegment(keyPair.pubKey, plainText);
  57. let decryptText = await rsaDecryptBySegment(keyPair.priKey, encryptText);
  58. if (plainText.data.toString() === decryptText.data.toString()) {
  59. console.info('decrypt ok');
  60. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  61. } else {
  62. console.error('decrypt failed');
  63. }
  64. }
  ```
* 同步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. // 分段加密消息。
  5. function rsaEncryptBySegment(pubKey: cryptoFramework.PubKey, plainText: cryptoFramework.DataBlob) {
  6. let cipher = cryptoFramework.createCipher('RSA1024|PKCS1');
  7. cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, pubKey, null);
  8. let plainTextSplitLen = 64;
  9. let cipherText = new Uint8Array();
  10. for (let i = 0; i < plainText.data.length; i += plainTextSplitLen) {
  11. let updateMessage = plainText.data.subarray(i, i + plainTextSplitLen);
  12. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  13. // 将原文按64字符进行拆分，循环调用doFinal进行加密，使用1024bit密钥时，每次加密生成128字节长度的密文。
  14. let updateOutput = cipher.doFinalSync(updateMessageBlob);
  15. let mergeText = new Uint8Array(cipherText.length + updateOutput.data.length);
  16. mergeText.set(cipherText);
  17. mergeText.set(updateOutput.data, cipherText.length);
  18. cipherText = mergeText;
  19. }
  20. let cipherBlob: cryptoFramework.DataBlob = { data: cipherText };
  21. return cipherBlob;
  22. }

  24. // 分段解密消息。
  25. function rsaDecryptBySegment(priKey: cryptoFramework.PriKey, cipherText: cryptoFramework.DataBlob) {
  26. let decoder = cryptoFramework.createCipher('RSA1024|PKCS1');
  27. decoder.initSync(cryptoFramework.CryptoMode.DECRYPT_MODE, priKey, null);
  28. let cipherTextSplitLen = 128; // RSA密钥每次加密生成的密文字节长度计算方式：密钥位数/8。
  29. let decryptText = new Uint8Array();
  30. for (let i = 0; i < cipherText.data.length; i += cipherTextSplitLen) {
  31. let updateMessage = cipherText.data.subarray(i, i + cipherTextSplitLen);
  32. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  33. // 将密文按128字节进行拆分解密，得到原文后进行拼接。
  34. let updateOutput = decoder.doFinalSync(updateMessageBlob);
  35. let mergeText = new Uint8Array(decryptText.length + updateOutput.data.length);
  36. mergeText.set(decryptText);
  37. mergeText.set(updateOutput.data, decryptText.length);
  38. decryptText = mergeText;
  39. }
  40. let decryptBlob: cryptoFramework.DataBlob = { data: decryptText };
  41. return decryptBlob;
  42. }

  44. function main() {
  45. let message = "This is a long plainTest! This is a long plainTest! This is a long plainTest!" +
  46. "This is a long plainTest! This is a long plainTest! This is a long plainTest! This is a long plainTest!" +
  47. "This is a long plainTest! This is a long plainTest! This is a long plainTest! This is a long plainTest!" +
  48. "This is a long plainTest! This is a long plainTest! This is a long plainTest! This is a long plainTest!" +
  49. "This is a long plainTest! This is a long plainTest! This is a long plainTest! This is a long plainTest!" +
  50. "This is a long plainTest! This is a long plainTest! This is a long plainTest! This is a long plainTest!" +
  51. "This is a long plainTest! This is a long plainTest! This is a long plainTest! This is a long plainTest!" +
  52. "This is a long plainTest! This is a long plainTest! This is a long plainTest! This is a long plainTest!";
  53. let asyKeyGenerator = cryptoFramework.createAsyKeyGenerator("RSA1024"); // 创建非对称密钥生成器对象。
  54. let keyPair = asyKeyGenerator.generateKeyPairSync(); // 随机生成RSA密钥。
  55. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  56. let encryptText = rsaEncryptBySegment(keyPair.pubKey, plainText);
  57. let decryptText = rsaDecryptBySegment(keyPair.priKey, encryptText);
  58. if (plainText.data.toString() === decryptText.data.toString()) {
  59. console.info('decrypt ok');
  60. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  61. } else {
  62. console.error('decrypt failed');
  63. }
  64. }
  ```