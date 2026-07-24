对应的算法规格请查看[对称密钥加解密算法规格：SM4](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-encrypt-decrypt-spec#sm4)。

**加密**

1. 调用[cryptoFramework.createSymKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesymkeygenerator)、[SymKeyGenerator.generateSymKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatesymkey-1)，生成密钥算法为SM4、密钥长度为128位的对称密钥（SymKey）。

   如何生成SM4对称密钥，开发者可参考下文示例，并结合[对称密钥生成和转换规格：SM4](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#sm4)和[随机生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-sym-key-randomly)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'SM4\_128|ECB|PKCS7'，创建对称密钥类型为SM4\_128、分组模式为ECB、填充模式为PKCS7的Cipher实例，用于完成加密操作。
3. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为加密（CryptoMode.ENCRYPT\_MODE），指定加密密钥（SymKey），初始化加密Cipher实例。

   ECB模式无加密参数，直接传入null。
4. 调用[Cipher.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-1)，更新数据（明文）。

   * 当数据量较小时，可以在init完成后直接调用doFinal。
   * 当数据量较大时，可以多次调用update，即分段加解密。
5. 调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，获取加密后的数据。

   * 由于已使用update传入数据，此处data传入null。
   * doFinal输出结果可能为null，在访问具体数据前，需要先判断结果是否为null，避免产生异常。

**解密**

1. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'SM4\_128|ECB|PKCS7'，创建对称密钥类型为SM4\_128、分组模式为ECB、填充模式为PKCS7的Cipher实例，用于完成解密操作。
2. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为解密（CryptoMode.DECRYPT\_MODE），指定解密密钥（SymKey）初始化解密Cipher实例。ECB模式无加密参数，直接传入null。
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

  4. // 加密消息。
  5. async function encryptMessagePromise(symKey: cryptoFramework.SymKey, plainText: cryptoFramework.DataBlob) {
  6. let cipher = cryptoFramework.createCipher('SM4_128|ECB|PKCS7');
  7. await cipher.init(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, null);
  8. let encryptData = await cipher.doFinal(plainText);
  9. return encryptData;
  10. }
  11. // 解密消息。
  12. async function decryptMessagePromise(symKey: cryptoFramework.SymKey, cipherText: cryptoFramework.DataBlob) {
  13. let decoder = cryptoFramework.createCipher('SM4_128|ECB|PKCS7');
  14. await decoder.init(cryptoFramework.CryptoMode.DECRYPT_MODE, symKey, null);
  15. let decryptData = await decoder.doFinal(cipherText);
  16. return decryptData;
  17. }
  18. async function genSymKeyByData(symKeyData: Uint8Array) {
  19. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  20. let symGenerator = cryptoFramework.createSymKeyGenerator('SM4_128');
  21. let symKey = await symGenerator.convertKey(symKeyBlob);
  22. console.info('convertKey success');
  23. return symKey;
  24. }
  25. async function main() {
  26. let keyData = new Uint8Array([7, 154, 52, 176, 4, 236, 150, 43, 237, 9, 145, 166, 141, 174, 224, 131]);
  27. let symKey = await genSymKeyByData(keyData);
  28. let message = "This is a test";
  29. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  30. let encryptText = await encryptMessagePromise(symKey, plainText);
  31. let decryptText = await decryptMessagePromise(symKey, encryptText);
  32. if (plainText.data.toString() === decryptText.data.toString()) {
  33. console.info('decrypt ok');
  34. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  35. } else {
  36. console.error('decrypt failed');
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

  4. // 加密消息。
  5. function encryptMessage(symKey: cryptoFramework.SymKey, plainText: cryptoFramework.DataBlob) {
  6. let cipher = cryptoFramework.createCipher('SM4_128|ECB|PKCS7');
  7. cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, null);
  8. let encryptData = cipher.doFinalSync(plainText);
  9. return encryptData;
  10. }
  11. // 解密消息。
  12. function decryptMessage(symKey: cryptoFramework.SymKey, cipherText: cryptoFramework.DataBlob) {
  13. let decoder = cryptoFramework.createCipher('SM4_128|ECB|PKCS7');
  14. decoder.initSync(cryptoFramework.CryptoMode.DECRYPT_MODE, symKey, null);
  15. let decryptData = decoder.doFinalSync(cipherText);
  16. return decryptData;
  17. }
  18. function genSymKeyByData(symKeyData: Uint8Array) {
  19. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  20. let symGenerator = cryptoFramework.createSymKeyGenerator('SM4_128');
  21. let symKey = symGenerator.convertKeySync(symKeyBlob);
  22. console.info('convertKeySync success');
  23. return symKey;
  24. }
  25. function main() {
  26. let keyData = new Uint8Array([7, 154, 52, 176, 4, 236, 150, 43, 237, 9, 145, 166, 141, 174, 224, 131]);
  27. let symKey = genSymKeyByData(keyData);
  28. let message = "This is a test";
  29. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  30. let encryptText = encryptMessage(symKey, plainText);
  31. let decryptText = decryptMessage(symKey, encryptText);
  32. if (plainText.data.toString() === decryptText.data.toString()) {
  33. console.info('decrypt ok');
  34. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  35. } else {
  36. console.error('decrypt failed');
  37. }
  38. }
  ```