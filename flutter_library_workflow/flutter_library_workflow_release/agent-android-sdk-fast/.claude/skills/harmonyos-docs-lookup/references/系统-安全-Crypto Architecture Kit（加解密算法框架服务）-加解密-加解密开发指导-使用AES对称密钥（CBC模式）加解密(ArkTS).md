对应的算法规格请参见[对称密钥加解密算法规格：AES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-encrypt-decrypt-spec#aes)。

**加密**

1. 调用[cryptoFramework.createSymKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesymkeygenerator)、[SymKeyGenerator.generateSymKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatesymkey-1)，生成密钥算法为AES、密钥长度为128位的对称密钥（SymKey）。

   如何生成AES对称密钥，开发者可参考下文示例，并结合[对称密钥生成和转换规格：AES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#aes)和[随机生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-sym-key-randomly)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'AES128|CBC|PKCS7'，创建对称密钥类型为AES128、分组模式为CBC、填充模式为PKCS7的Cipher实例，用于完成加密操作。
3. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为加密（CryptoMode.ENCRYPT\_MODE），指定加密密钥（SymKey）和CBC模式对应的加密参数（IvParamsSpec），初始化加密Cipher实例。
4. 当加密内容长度较短时，可以直接调用 [Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1) 而无需调用update，以获取加密后的数据。

**解密**

1. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'AES128|CBC|PKCS7'，创建对称密钥类型为AES128、分组模式为CBC、填充模式为PKCS7的Cipher实例，用于完成解密操作。
2. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为解密（CryptoMode.DECRYPT\_MODE），指定解密密钥（SymKey）和CBC模式对应的解密参数（IvParamsSpec），初始化解密Cipher实例。
3. 当解密内容长度较短时，可以省略调用update，直接调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，获取解密后的数据。

* 异步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. function generateRandom(len: number) {
  5. let rand = cryptoFramework.createRandom();
  6. let generateRandSync = rand.generateRandomSync(len);
  7. return generateRandSync;
  8. }

  10. function genIvParamsSpec() {
  11. let ivBlob = generateRandom(16);
  12. let ivParamsSpec: cryptoFramework.IvParamsSpec = {
  13. algName: "IvParamsSpec",
  14. iv: ivBlob
  15. };
  16. return ivParamsSpec;
  17. }
  18. let iv = genIvParamsSpec();
  19. // 加密消息。
  20. async function encryptMessagePromise(symKey: cryptoFramework.SymKey, plainText: cryptoFramework.DataBlob) {
  21. let cipher = cryptoFramework.createCipher('AES128|CBC|PKCS7');
  22. await cipher.init(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, iv);
  23. let cipherData = await cipher.doFinal(plainText);
  24. return cipherData;
  25. }
  26. // 解密消息。
  27. async function decryptMessagePromise(symKey: cryptoFramework.SymKey, cipherText: cryptoFramework.DataBlob) {
  28. let decoder = cryptoFramework.createCipher('AES128|CBC|PKCS7');
  29. await decoder.init(cryptoFramework.CryptoMode.DECRYPT_MODE, symKey, iv);
  30. let decryptData = await decoder.doFinal(cipherText);
  31. return decryptData;
  32. }

  34. async function genSymKeyByData(symKeyData: Uint8Array) {
  35. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  36. let aesGenerator = cryptoFramework.createSymKeyGenerator('AES128');
  37. let symKey = await aesGenerator.convertKey(symKeyBlob);
  38. console.info('convertKey success');
  39. return symKey;
  40. }

  42. async function aesCBC() {
  43. try {
  44. let keyData = new Uint8Array([83, 217, 231, 76, 28, 113, 23, 219, 250, 71, 209, 210, 205, 97, 32, 159]);
  45. let symKey = await genSymKeyByData(keyData);
  46. let message = "This is a test";
  47. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  48. let encryptText = await encryptMessagePromise(symKey, plainText);
  49. let decryptText = await decryptMessagePromise(symKey, encryptText);
  50. if (plainText.data.toString() === decryptText.data.toString()) {
  51. console.info('decrypt ok');
  52. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  53. } else {
  54. console.error('decrypt failed');
  55. }
  56. } catch (error) {
  57. console.error(`AES CBC "${error}", error code: ${error.code}`);
  58. }
  59. }
  ```
* 同步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. function generateRandom(len: number) {
  5. let rand = cryptoFramework.createRandom();
  6. let generateRandSync = rand.generateRandomSync(len);
  7. return generateRandSync;
  8. }

  10. function genIvParamsSpec() {
  11. let ivBlob = generateRandom(16);
  12. let ivParamsSpec: cryptoFramework.IvParamsSpec = {
  13. algName: "IvParamsSpec",
  14. iv: ivBlob
  15. };
  16. return ivParamsSpec;
  17. }
  18. let iv = genIvParamsSpec();
  19. // 加密消息。
  20. function encryptMessage(symKey: cryptoFramework.SymKey, plainText: cryptoFramework.DataBlob) {
  21. let cipher = cryptoFramework.createCipher('AES128|CBC|PKCS7');
  22. cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, iv);
  23. let cipherData = cipher.doFinalSync(plainText);
  24. return cipherData;
  25. }
  26. // 解密消息。
  27. function decryptMessage(symKey: cryptoFramework.SymKey, cipherText: cryptoFramework.DataBlob) {
  28. let decoder = cryptoFramework.createCipher('AES128|CBC|PKCS7');
  29. decoder.initSync(cryptoFramework.CryptoMode.DECRYPT_MODE, symKey, iv);
  30. let decryptData = decoder.doFinalSync(cipherText);
  31. return decryptData;
  32. }

  34. function genSymKeyByData(symKeyData: Uint8Array) {
  35. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  36. let aesGenerator = cryptoFramework.createSymKeyGenerator('AES128');
  37. let symKey = aesGenerator.convertKeySync(symKeyBlob);
  38. console.info('convertKeySync success');
  39. return symKey;
  40. }

  42. function main() {
  43. try {
  44. let keyData = new Uint8Array([83, 217, 231, 76, 28, 113, 23, 219, 250, 71, 209, 210, 205, 97, 32, 159]);
  45. let symKey = genSymKeyByData(keyData);
  46. let message = "This is a test";
  47. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  48. let encryptText = encryptMessage(symKey, plainText);
  49. let decryptText = decryptMessage(symKey, encryptText);
  50. if (plainText.data.toString() === decryptText.data.toString()) {
  51. console.info('decrypt ok');
  52. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  53. } else {
  54. console.error('decrypt failed');
  55. }
  56. } catch (error) {
  57. console.error(`AES CBC "${error}", error code: ${error.code}`);
  58. }
  59. }
  ```