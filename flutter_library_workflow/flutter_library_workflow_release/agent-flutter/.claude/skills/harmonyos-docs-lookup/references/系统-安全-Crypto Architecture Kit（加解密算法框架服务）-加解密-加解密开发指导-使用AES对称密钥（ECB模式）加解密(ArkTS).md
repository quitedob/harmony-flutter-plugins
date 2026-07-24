请查看[对称密钥加解密算法规格：AES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-encrypt-decrypt-spec#aes)。

**加密**

1. 调用[cryptoFramework.createSymKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesymkeygenerator)、[SymKeyGenerator.generateSymKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatesymkey-1)，生成密钥算法为AES、密钥长度为128位的对称密钥（SymKey）。

   如何生成AES对称密钥，开发者可以参考以下示例，并结合[对称密钥生成和转换规格：AES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#aes)和[随机生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-sym-key-randomly)进行理解。参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'AES128|ECB|PKCS7'，创建对称密钥类型为AES128、分组模式为ECB、填充模式为PKCS7的Cipher实例，用于完成加密操作。
3. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为加密（CryptoMode.ENCRYPT\_MODE），指定加密密钥（SymKey），ECB模式Params为空，初始化加密Cipher实例。
4. 加密内容较短时，可以不调用update，直接调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，获取加密后的数据。

**解密**

1. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'AES128|ECB|PKCS7'，创建对称密钥类型为AES128、分组模式为ECB、填充模式为PKCS7的Cipher实例，用于完成解密操作。
2. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为解密（CryptoMode.DECRYPT\_MODE），指定解密密钥（SymKey），ECB模式Params为空，初始化解密Cipher实例。
3. 解密内容较短时，可以不调用update，直接调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，获取解密后的数据。

* 异步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. // 加密消息。
  5. async function encryptMessagePromise(symKey: cryptoFramework.SymKey, plainText: cryptoFramework.DataBlob) {
  6. let cipher = cryptoFramework.createCipher('AES128|ECB|PKCS7');
  7. await cipher.init(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, null); // ECB模式params为null。
  8. let cipherData = await cipher.doFinal(plainText);
  9. return cipherData;
  10. }
  11. // 解密消息。
  12. async function decryptMessagePromise(symKey: cryptoFramework.SymKey, cipherText: cryptoFramework.DataBlob) {
  13. let decoder = cryptoFramework.createCipher('AES128|ECB|PKCS7');
  14. await decoder.init(cryptoFramework.CryptoMode.DECRYPT_MODE, symKey, null); // ECB模式params为null。
  15. let decryptData = await decoder.doFinal(cipherText);
  16. return decryptData;
  17. }

  19. async function genSymKeyByData(symKeyData: Uint8Array) {
  20. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  21. let aesGenerator = cryptoFramework.createSymKeyGenerator('AES128');
  22. let symKey = await aesGenerator.convertKey(symKeyBlob);
  23. console.info('convertKey success');
  24. return symKey;
  25. }

  27. async function aesECB() {
  28. try {
  29. let keyData = new Uint8Array([83, 217, 231, 76, 28, 113, 23, 219, 250, 71, 209, 210, 205, 97, 32, 159]);
  30. let symKey = await genSymKeyByData(keyData);
  31. let message = "This is a test";
  32. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  33. let encryptText = await encryptMessagePromise(symKey, plainText);
  34. let decryptText = await decryptMessagePromise(symKey, encryptText);
  35. if (plainText.data.toString() === decryptText.data.toString()) {
  36. console.info('decrypt ok');
  37. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  38. } else {
  39. console.error('decrypt failed');
  40. }
  41. } catch (error) {
  42. console.error(`AES ECB "${error}", error code: ${error.code}`);
  43. }
  44. }
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
  5. function encryptMessage(symKey: cryptoFramework.SymKey, plainText: cryptoFramework.DataBlob) {
  6. let cipher = cryptoFramework.createCipher('AES128|ECB|PKCS7');
  7. cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, null); // ECB模式params为null。
  8. let cipherData = cipher.doFinalSync(plainText);
  9. return cipherData;
  10. }
  11. // 解密消息。
  12. function decryptMessage(symKey: cryptoFramework.SymKey, cipherText: cryptoFramework.DataBlob) {
  13. let decoder = cryptoFramework.createCipher('AES128|ECB|PKCS7');
  14. decoder.initSync(cryptoFramework.CryptoMode.DECRYPT_MODE, symKey, null); // ECB模式params为null。
  15. let decryptData = decoder.doFinalSync(cipherText);
  16. return decryptData;
  17. }

  19. function genSymKeyByData(symKeyData: Uint8Array) {
  20. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  21. let aesGenerator = cryptoFramework.createSymKeyGenerator('AES128');
  22. let symKey = aesGenerator.convertKeySync(symKeyBlob);
  23. console.info('convertKeySync success');
  24. return symKey;
  25. }

  27. function main() {
  28. try {
  29. let keyData = new Uint8Array([83, 217, 231, 76, 28, 113, 23, 219, 250, 71, 209, 210, 205, 97, 32, 159]);
  30. let symKey = genSymKeyByData(keyData);
  31. let message = "This is a test";
  32. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  33. let encryptText = encryptMessage(symKey, plainText);
  34. let decryptText = decryptMessage(symKey, encryptText);
  35. if (plainText.data.toString() === decryptText.data.toString()) {
  36. console.info('decrypt ok');
  37. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  38. } else {
  39. console.error('decrypt failed');
  40. }
  41. } catch (error) {
  42. console.error(`AES ECB "${error}", error code: ${error.code}`);
  43. }
  44. }
  ```