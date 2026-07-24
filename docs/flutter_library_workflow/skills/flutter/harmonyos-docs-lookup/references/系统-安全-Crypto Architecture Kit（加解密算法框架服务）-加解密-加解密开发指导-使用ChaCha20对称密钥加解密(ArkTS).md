从API22开始，算法库支持该算法。

对应的算法规格请查看[对称密钥加解密算法规格：ChaCha20](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-encrypt-decrypt-spec#chacha20)。

## 开发步骤

**创建对象**

调用[cryptoFramework.createSymKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesymkeygenerator)、[SymKeyGenerator.generateSymKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatesymkey-1)，生成密钥算法为ChaCha20的对称密钥（SymKey）。

如何生成ChaCha20对称密钥，开发者可参考下文示例，并结合[对称密钥生成和转换规格：ChaCha20](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#chacha20)和[随机生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-sym-key-randomly)理解。参考文档与示例可能存在入参差异，请注意区分。

**加密**

1. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'ChaCha20'，创建对称密钥的Cipher实例，用于完成加密操作。
2. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为加密（CryptoMode.ENCRYPT\_MODE），指定加密密钥（SymKey）和对应的加密参数（IvParamsSpec），初始化加密Cipher实例。
3. 调用[Cipher.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-1)，更新数据（明文）。
4. 调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，获取加密后的数据。

   说明

   由于已使用update传入数据，此处data传入null。

   doFinal输出结果可能为null，在访问具体数据前，需要先判断结果是否为null，避免产生异常。

**解密**

1. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'ChaCha20'，创建对称密钥的Cipher实例，用于完成解密操作。
2. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为解密（CryptoMode.DECRYPT\_MODE），指定解密密钥（SymKey）和对应的解密参数（IvParamsSpec），初始化解密Cipher实例。
3. 调用[Cipher.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-1)，更新数据（密文）。
4. 调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，获取解密后的数据。

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
  18. let ivSpec = genIvParamsSpec();

  20. // 加密消息。
  21. async function encryptMessagePromise(symKey: cryptoFramework.SymKey, plainText: cryptoFramework.DataBlob) {
  22. let cipher = cryptoFramework.createCipher('ChaCha20');
  23. await cipher.init(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, ivSpec);
  24. let encryptUpdata = await cipher.doFinal(plainText);
  25. return encryptUpdata;
  26. }
  27. // 解密消息。
  28. async function decryptMessagePromise(symKey: cryptoFramework.SymKey, cipherText: cryptoFramework.DataBlob) {
  29. let decoder = cryptoFramework.createCipher('ChaCha20');
  30. await decoder.init(cryptoFramework.CryptoMode.DECRYPT_MODE, symKey, ivSpec);
  31. let decryptUpdata = await decoder.doFinal(cipherText);
  32. return decryptUpdata;
  33. }
  34. async function genSymKeyByData(symKeyData: Uint8Array) {
  35. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  36. let chacha20Generator = cryptoFramework.createSymKeyGenerator('ChaCha20');
  37. let symKey = await chacha20Generator.convertKey(symKeyBlob);
  38. console.info('convertKey success');
  39. return symKey;
  40. }
  41. async function main() {
  42. try {
  43. let keyData = new Uint8Array([83, 217, 231, 76, 28, 113, 23, 219, 250, 71, 209, 210, 205, 97, 32, 159, 83,
  44. 217, 231, 76, 28, 113, 23, 219, 250, 71, 209, 210, 205, 97, 32, 159]);
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
  57. console.error(`decrypt failed, error info is ${error}, error code: ${error.code}`);
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
  18. let ivSpec = genIvParamsSpec();

  20. // 加密消息。
  21. function encryptMessage(symKey: cryptoFramework.SymKey, plainText: cryptoFramework.DataBlob) {
  22. let cipher = cryptoFramework.createCipher('ChaCha20');
  23. cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, ivSpec);
  24. let encryptUpdata = cipher.doFinalSync(plainText);
  25. return encryptUpdata;
  26. }
  27. // 解密消息。
  28. function decryptMessage(symKey: cryptoFramework.SymKey, cipherText: cryptoFramework.DataBlob) {
  29. let decoder = cryptoFramework.createCipher('ChaCha20');
  30. decoder.initSync(cryptoFramework.CryptoMode.DECRYPT_MODE, symKey, ivSpec);
  31. let decryptdata = decoder.updateSync(cipherText);
  32. return decryptdata;
  33. }
  34. function genSymKeyByData(symKeyData: Uint8Array) {
  35. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  36. let chacha20Generator = cryptoFramework.createSymKeyGenerator('ChaCha20');
  37. let symKey = chacha20Generator.convertKeySync(symKeyBlob);
  38. console.info('convertKeySync success');
  39. return symKey;
  40. }
  41. async function main() {
  42. try {
  43. let keyData = new Uint8Array([83, 217, 231, 76, 28, 113, 23, 219, 250, 71, 209, 210, 205, 97, 32, 159, 83,
  44. 217, 231, 76, 28, 113, 23, 219, 250, 71, 209, 210, 205, 97, 32, 159]);
  45. let symKey = genSymKeyByData(keyData);
  46. let message = "This is a test";
  47. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  48. let encryptText = encryptMessage(symKey, plainText);
  49. let decryptText = decryptMessage(symKey, encryptText);
  50. if (plainText.data.toString() === decryptText.data.toString()) {
  51. console.info('decrypt ok');
  52. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  53. } else {
  54. console.error('decrypt failed.');
  55. }
  56. } catch (error) {
  57. console.error(`decrypt failed, error info is ${error}, error code: ${error.code}`);
  58. }
  59. }
  ```