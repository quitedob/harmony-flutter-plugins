对应的算法规格请查看[对称密钥加解密算法规格：SM4](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-encrypt-decrypt-spec#sm4)。

**加密**

1. 调用[cryptoFramework.createSymKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesymkeygenerator)、[SymKeyGenerator.generateSymKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatesymkey-1)，生成密钥算法为SM4、密钥长度为128位的对称密钥（SymKey）。

   如何生成SM4对称密钥，开发者可参考下文示例，并结合[对称密钥生成和转换规格：SM4](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#sm4)和[随机生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-sym-key-randomly)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'SM4\_128|CBC|PKCS7'，创建对称密钥类型为SM4\_128、分组模式为CBC、填充模式为PKCS7的Cipher实例，用于完成加密操作。
3. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为加密（CryptoMode.ENCRYPT\_MODE），指定加密密钥（SymKey）和CBC模式对应的加密参数（IvParamsSpec），初始化加密Cipher实例。
4. 调用[Cipher.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-1)，更新数据（明文）。

   * 当数据量较小时，可以在init完成后直接调用doFinal。
   * 当数据量较大时，可以多次调用update，即分段加解密。
5. 调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，获取加密后的数据。

   * 由于已使用update传入数据，此处data传入null。
   * doFinal输出结果可能为null，在访问具体数据前，需要先判断结果是否为null，避免产生异常。

**解密**

1. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'SM4\_128|CBC|PKCS7'，创建对称密钥类型为SM4\_128、分组模式为CBC、填充模式为PKCS7的Cipher实例，用于完成解密操作。
2. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为解密（CryptoMode.DECRYPT\_MODE），指定解密密钥（SymKey）和CBC模式对应的解密参数（IvParamsSpec），初始化解密Cipher实例。
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
  11. let ivBlob = generateRandom(16); // 16 bytes
  12. let ivParamsSpec: cryptoFramework.IvParamsSpec = {
  13. algName: "IvParamsSpec",
  14. iv: ivBlob
  15. };
  16. return ivParamsSpec;
  17. }
  18. let iv = genIvParamsSpec();
  19. // 加密消息。
  20. async function encryptMessagePromise(symKey: cryptoFramework.SymKey, plainText: cryptoFramework.DataBlob) {
  21. let cipher = cryptoFramework.createCipher('SM4_128|CBC|PKCS7');
  22. await cipher.init(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, iv);
  23. let encryptData = await cipher.doFinal(plainText);
  24. return encryptData;
  25. }
  26. // 解密消息。
  27. async function decryptMessagePromise(symKey: cryptoFramework.SymKey, cipherText: cryptoFramework.DataBlob) {
  28. let decoder = cryptoFramework.createCipher('SM4_128|CBC|PKCS7');
  29. await decoder.init(cryptoFramework.CryptoMode.DECRYPT_MODE, symKey, iv);
  30. let decryptData = await decoder.doFinal(cipherText);
  31. return decryptData;
  32. }
  33. async function genSymKeyByData(symKeyData: Uint8Array) {
  34. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  35. let symGenerator = cryptoFramework.createSymKeyGenerator('SM4_128');
  36. let symKey = await symGenerator.convertKey(symKeyBlob);
  37. console.info('convertKey success');
  38. return symKey;
  39. }
  40. async function main() {
  41. try {
  42. let keyData = new Uint8Array([7, 154, 52, 176, 4, 236, 150, 43, 237, 9, 145, 166, 141, 174, 224, 131]);
  43. let symKey = await genSymKeyByData(keyData);
  44. let message = "This is a test";
  45. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  46. let encryptText = await encryptMessagePromise(symKey, plainText);
  47. let decryptText = await decryptMessagePromise(symKey, encryptText);
  48. if (plainText.data.toString() === decryptText.data.toString()) {
  49. console.info('decrypt ok');
  50. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  51. } else {
  52. console.error('decrypt failed');
  53. }
  54. } catch (error) {
  55. console.error(`SM4 ${error}, error code: ${error.code}`);
  56. }
  57. }
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
  11. let ivBlob = generateRandom(16); // 16 bytes
  12. let ivParamsSpec: cryptoFramework.IvParamsSpec = {
  13. algName: "IvParamsSpec",
  14. iv: ivBlob
  15. };
  16. return ivParamsSpec;
  17. }
  18. let iv = genIvParamsSpec();
  19. // 加密消息。
  20. function encryptMessage(symKey: cryptoFramework.SymKey, plainText: cryptoFramework.DataBlob) {
  21. let cipher = cryptoFramework.createCipher('SM4_128|CBC|PKCS7');
  22. cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, iv);
  23. let encryptData = cipher.doFinalSync(plainText);
  24. return encryptData;
  25. }
  26. // 解密消息。
  27. function decryptMessage(symKey: cryptoFramework.SymKey, cipherText: cryptoFramework.DataBlob) {
  28. let decoder = cryptoFramework.createCipher('SM4_128|CBC|PKCS7');
  29. decoder.initSync(cryptoFramework.CryptoMode.DECRYPT_MODE, symKey, iv);
  30. let decryptData = decoder.doFinalSync(cipherText);
  31. return decryptData;
  32. }
  33. function genSymKeyByData(symKeyData: Uint8Array) {
  34. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  35. let symGenerator = cryptoFramework.createSymKeyGenerator('SM4_128');
  36. let symKey = symGenerator.convertKeySync(symKeyBlob);
  37. console.info('convertKeySync success');
  38. return symKey;
  39. }
  40. function main() {
  41. try {
  42. let keyData = new Uint8Array([7, 154, 52, 176, 4, 236, 150, 43, 237, 9, 145, 166, 141, 174, 224, 131]);
  43. let symKey = genSymKeyByData(keyData);
  44. let message = "This is a test";
  45. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  46. let encryptText = encryptMessage(symKey, plainText);
  47. let decryptText = decryptMessage(symKey, encryptText);
  48. if (plainText.data.toString() === decryptText.data.toString()) {
  49. console.info('decrypt ok');
  50. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  51. } else {
  52. console.error('decrypt failed');
  53. }
  54. } catch (error) {
  55. console.error(`SM4 ${error}, error code: ${error.code}`);
  56. }
  57. }
  ```