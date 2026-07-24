查看[对称密钥加解密算法规格：AES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-encrypt-decrypt-spec#aes)。

**加密**

1. 调用[cryptoFramework.createSymKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesymkeygenerator)、[SymKeyGenerator.generateSymKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatesymkey-1)，生成密钥算法为AES、密钥长度为128位的对称密钥（SymKey）。

   如何生成AES对称密钥，开发者可参考下文示例，并结合[对称密钥生成和转换规格：AES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#aes)和[随机生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-sym-key-randomly)进行理解，参考文档与当前示例可能存在入参差异，请注意区分。
2. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'AES128|CCM'，创建对称密钥为AES128、分组模式为CCM的Cipher实例，用于执行加密操作。
3. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为加密（CryptoMode.ENCRYPT\_MODE），指定密钥（SymKey）和CCM模式对应的加密参数（CcmParamsSpec），初始化加密Cipher实例。
4. 调用[Cipher.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-1)，更新数据（明文）。

   当前单次update没有长度限制，开发者可以根据数据量决定如何调用update。

   说明

   CCM模式不支持分段加解密。
5. 调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)获取加密后的数据。

   * 由于已通过update传入数据，此处传入null。
   * doFinal输出结果可能为null，访问具体数据前，需先判断结果是否为null，以避免异常。
6. 读取[CcmParamsSpec.authTag](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#ccmparamsspec)作为解密的认证信息。

   在CCM模式下，算法库目前仅支持12字节的authTag，用于解密时的初始化认证信息。示例中的authTag为12字节。

**解密**

1. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'AES128|CCM'，创建对称密钥为AES128、分组模式为CCM的Cipher实例，用于完成解密操作。
2. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为解密（CryptoMode.DECRYPT\_MODE），指定密钥（SymKey）和CCM模式对应的解密参数（CcmParamsSpec），初始化解密Cipher实例。
3. 调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，获取解密后的数据。

* 异步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. function genCcmParamsSpec() {
  5. let rand: cryptoFramework.Random = cryptoFramework.createRandom();
  6. let ivBlob: cryptoFramework.DataBlob = rand.generateRandomSync(7);
  7. let aadBlob: cryptoFramework.DataBlob = rand.generateRandomSync(8);
  8. let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 12 bytes
  9. let dataTag = new Uint8Array(arr);
  10. let tagBlob: cryptoFramework.DataBlob = {
  11. data: dataTag
  12. };
  13. // CCM的authTag在加密时从doFinal结果中获取，在解密时填入init函数的params参数中。
  14. let ccmParamsSpec: cryptoFramework.CcmParamsSpec = {
  15. iv: ivBlob,
  16. aad: aadBlob,
  17. authTag: tagBlob,
  18. algName: "CcmParamsSpec"
  19. };
  20. return ccmParamsSpec;
  21. }
  22. let ccmParams = genCcmParamsSpec();

  24. // 加密消息。
  25. async function encryptMessagePromise(symKey: cryptoFramework.SymKey, plainText: cryptoFramework.DataBlob) {
  26. let cipher = cryptoFramework.createCipher('AES128|CCM');
  27. await cipher.init(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, ccmParams);
  28. let encryptUpdate = await cipher.update(plainText);
  29. // ccm模式加密doFinal时传入空，获得tag数据，并更新至ccmParams对象中。
  30. ccmParams.authTag = await cipher.doFinal(null);
  31. return encryptUpdate;
  32. }
  33. // 解密消息。
  34. async function decryptMessagePromise(symKey: cryptoFramework.SymKey, cipherText: cryptoFramework.DataBlob) {
  35. let decoder = cryptoFramework.createCipher('AES128|CCM');
  36. await decoder.init(cryptoFramework.CryptoMode.DECRYPT_MODE, symKey, ccmParams);
  37. let decryptUpdate = await decoder.doFinal(cipherText);
  38. return decryptUpdate;
  39. }
  40. async function genSymKeyByData(symKeyData: Uint8Array) {
  41. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  42. let aesGenerator = cryptoFramework.createSymKeyGenerator('AES128');
  43. let symKey = await aesGenerator.convertKey(symKeyBlob);
  44. console.info('convertKey success');
  45. return symKey;
  46. }
  47. async function main() {
  48. let keyData = new Uint8Array([83, 217, 231, 76, 28, 113, 23, 219, 250, 71, 209, 210, 205, 97, 32, 159]);
  49. let symKey = await genSymKeyByData(keyData);
  50. let message = "This is a test";
  51. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  52. let encryptText = await encryptMessagePromise(symKey, plainText);
  53. let decryptText = await decryptMessagePromise(symKey, encryptText);
  54. if (plainText.data.toString() === decryptText.data.toString()) {
  55. console.info('decrypt ok');
  56. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  57. } else {
  58. console.error('decrypt failed');
  59. }
  60. }
  ```
* 同步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';


  5. function genCcmParamsSpec() {
  6. let rand: cryptoFramework.Random = cryptoFramework.createRandom();
  7. let ivBlob: cryptoFramework.DataBlob = rand.generateRandomSync(7);
  8. let aadBlob: cryptoFramework.DataBlob = rand.generateRandomSync(8);
  9. let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 12 bytes
  10. let dataTag = new Uint8Array(arr);
  11. let tagBlob: cryptoFramework.DataBlob = {
  12. data: dataTag
  13. };
  14. // CCM的authTag在加密时从doFinal结果中获取，在解密时填入init函数的params参数中。
  15. let ccmParamsSpec: cryptoFramework.CcmParamsSpec = {
  16. iv: ivBlob,
  17. aad: aadBlob,
  18. authTag: tagBlob,
  19. algName: "CcmParamsSpec"
  20. };
  21. return ccmParamsSpec;
  22. }

  24. let ccmParams = genCcmParamsSpec();

  26. // 加密消息。
  27. function encryptMessage(symKey: cryptoFramework.SymKey, plainText: cryptoFramework.DataBlob) {
  28. let cipher = cryptoFramework.createCipher('AES128|CCM');
  29. cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, ccmParams);
  30. let encryptUpdate = cipher.updateSync(plainText);
  31. // ccm模式加密doFinal时传入空，获得tag数据，并更新至ccmParams对象中。
  32. ccmParams.authTag = cipher.doFinalSync(null);
  33. return encryptUpdate;
  34. }
  35. // 解密消息。
  36. function decryptMessage(symKey: cryptoFramework.SymKey, cipherText: cryptoFramework.DataBlob) {
  37. let decoder = cryptoFramework.createCipher('AES128|CCM');
  38. decoder.initSync(cryptoFramework.CryptoMode.DECRYPT_MODE, symKey, ccmParams);
  39. let decryptUpdate = decoder.doFinalSync(cipherText);
  40. return decryptUpdate;
  41. }
  42. function genSymKeyByData(symKeyData: Uint8Array) {
  43. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  44. let aesGenerator = cryptoFramework.createSymKeyGenerator('AES128');
  45. let symKey = aesGenerator.convertKeySync(symKeyBlob);
  46. console.info('convertKeySync success');
  47. return symKey;
  48. }
  49. function main() {
  50. let keyData = new Uint8Array([83, 217, 231, 76, 28, 113, 23, 219, 250, 71, 209, 210, 205, 97, 32, 159]);
  51. let symKey = genSymKeyByData(keyData);
  52. let message = "This is a test";
  53. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  54. let encryptText = encryptMessage(symKey, plainText);
  55. let decryptText = decryptMessage(symKey, encryptText);
  56. if (plainText.data.toString() === decryptText.data.toString()) {
  57. console.info('decrypt ok');
  58. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  59. } else {
  60. console.error('decrypt failed');
  61. }
  62. }
  ```