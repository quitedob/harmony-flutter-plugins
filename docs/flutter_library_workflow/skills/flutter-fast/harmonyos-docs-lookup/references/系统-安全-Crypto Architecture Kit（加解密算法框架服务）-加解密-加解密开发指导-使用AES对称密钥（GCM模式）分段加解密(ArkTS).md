对应的算法规格请查看[对称密钥加解密算法规格：AES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-encrypt-decrypt-spec#aes)。

**加密**

1. 调用[cryptoFramework.createSymKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesymkeygenerator)、[SymKeyGenerator.generateSymKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatesymkey-1)，生成密钥算法为AES、密钥长度为128位的对称密钥（SymKey）。

   如何生成AES对称密钥，开发者可参考下文示例，并结合[对称密钥生成和转换规格：AES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#aes)和[随机生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-sym-key-randomly)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'AES128|GCM|PKCS7'，创建对称密钥类型为AES128、分组模式为GCM、填充模式为PKCS7的Cipher实例，用于完成加密操作。
3. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为加密（CryptoMode.ENCRYPT\_MODE），指定加密密钥（SymKey）和GCM模式对应的加密参数（GcmParamsSpec），初始化加密Cipher实例。
4. 将一次传入数据量设置为20字节，多次调用[Cipher.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-1)，更新数据（明文）。

   * 当前单次update长度没有限制，开发者可以根据数据量判断如何调用update。
   * 建议开发者对每次update的结果都判断是否为null，并在结果不为null时取出其中的数据进行拼接，形成完整的密文。因为在不同的规格下，update的结果可能会受到不同影响。

     1）例如ECB和CBC模式，始终以分组作为基本单位进行加密，并输出本次更新产生的加密分组结果。即当本次更新操作凑满一个分组时就输出密文，未凑满则本次更新输出null，将未加密的数据与下次输入的数据拼接后再凑分组输出。最后在doFinal时，将未加密的数据根据指定的填充模式进行填充，再输出剩余的加密结果。解密过程中的update操作同理。

     2）对于流加密模式，如CTR和OFB模式，密文长度等于明文长度。
5. 调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，获取加密后的数据。

   * 由于已通过update传入数据，此处传入null。
   * 在访问doFinal输出结果前，需先判断结果是否为null，避免产生异常。
6. 读取[GcmParamsSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#gcmparamsspec).authTag作为解密认证信息。

   在GCM模式下，算法库支持16字节的authTag，用于解密时的认证初始化。示例中的authTag为16字节。

**解密**

1. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'AES128|GCM|PKCS7'，创建对称密钥类型为AES128、分组模式为GCM、填充模式为PKCS7的Cipher实例，用于完成解密操作。
2. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为解密（CryptoMode.DECRYPT\_MODE），指定解密密钥（SymKey）和GCM模式对应的解密参数（GcmParamsSpec），初始化解密Cipher实例。
3. 将一次传入数据量设置为20字节，多次调用[Cipher.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-1)，更新数据（密文）。
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

  10. function genGcmParamsSpec() {
  11. let ivBlob = generateRandom(12);
  12. let arr = [1, 2, 3, 4, 5, 6, 7, 8]; // 8 bytes
  13. let dataAad = new Uint8Array(arr);
  14. let aadBlob: cryptoFramework.DataBlob = { data: dataAad };
  15. arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 16 bytes
  16. let dataTag = new Uint8Array(arr);
  17. let tagBlob: cryptoFramework.DataBlob = {
  18. data: dataTag
  19. }; // The GCM authTag is obtained by doFinal() in encryption and passed in params of init() in decryption.
  20. let gcmParamsSpec: cryptoFramework.GcmParamsSpec = {
  21. iv: ivBlob,
  22. aad: aadBlob,
  23. authTag: tagBlob,
  24. algName: "GcmParamsSpec"
  25. };
  26. return gcmParamsSpec;
  27. }
  28. let gcmParams = genGcmParamsSpec();
  29. // 分段加密消息。
  30. async function encryptMessageUpdateBySegment(symKey: cryptoFramework.SymKey, plainText: cryptoFramework.DataBlob) {
  31. let cipher = cryptoFramework.createCipher('AES128|GCM|PKCS7');
  32. await cipher.init(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, gcmParams);
  33. let updateLength = 20; // 假设以20字节为单位进行分段update，实际并无要求。
  34. let cipherText = new Uint8Array();
  35. for (let i = 0; i < plainText.data.length; i += updateLength) {
  36. let updateMessage = plainText.data.subarray(i, i + updateLength);
  37. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  38. // 分段update。
  39. let updateOutput = await cipher.update(updateMessageBlob);
  40. // 把update的结果拼接起来，以获得密文。在某些情况下，还需要拼接doFinal的结果，这取决于分组模式。
  41. // 和填充模式，本例中GCM模式的doFinal结果只包含authTag而不含密文，所以不需要拼接）。
  42. let mergeText = new Uint8Array(cipherText.length + updateOutput.data.length);
  43. mergeText.set(cipherText);
  44. mergeText.set(updateOutput.data, cipherText.length);
  45. cipherText = mergeText;
  46. }
  47. gcmParams.authTag = await cipher.doFinal(null);
  48. let cipherBlob: cryptoFramework.DataBlob = { data: cipherText };
  49. return cipherBlob;
  50. }
  51. // 分段解密消息。
  52. async function decryptMessagePromise(symKey: cryptoFramework.SymKey, cipherText: cryptoFramework.DataBlob) {
  53. let decoder = cryptoFramework.createCipher('AES128|GCM|PKCS7');
  54. await decoder.init(cryptoFramework.CryptoMode.DECRYPT_MODE, symKey, gcmParams);
  55. let updateLength = 20; // 假设以20字节为单位进行分段update，实际并无要求。
  56. let decryptText = new Uint8Array();
  57. for (let i = 0; i < cipherText.data.length; i += updateLength) {
  58. let updateMessage = cipherText.data.subarray(i, i + updateLength);
  59. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  60. // 分段update。
  61. let updateOutput = await decoder.update(updateMessageBlob);
  62. // 把update的结果拼接起来，得到明文。
  63. let mergeText = new Uint8Array(decryptText.length + updateOutput.data.length);
  64. mergeText.set(decryptText);
  65. mergeText.set(updateOutput.data, decryptText.length);
  66. decryptText = mergeText;
  67. }
  68. let decryptData = await decoder.doFinal(null);
  69. if (decryptData === null) {
  70. console.info('GCM decrypt success, decryptData is null');
  71. }
  72. let decryptBlob: cryptoFramework.DataBlob = { data: decryptText };
  73. return decryptBlob;
  74. }
  75. async function genSymKeyByData(symKeyData: Uint8Array) {
  76. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  77. let aesGenerator = cryptoFramework.createSymKeyGenerator('AES128');
  78. let symKey = await aesGenerator.convertKey(symKeyBlob);
  79. console.info('convertKey success');
  80. return symKey;
  81. }
  82. async function aes() {
  83. let keyData = new Uint8Array([83, 217, 231, 76, 28, 113, 23, 219, 250, 71, 209, 210, 205, 97, 32, 159]);
  84. let symKey = await genSymKeyByData(keyData);
  85. let message = "aaaaa.....bbbbb.....ccccc.....ddddd.....eee"; // 消息总共43字节，根据utf-8解码后，也是43字节。
  86. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  87. let encryptText = await encryptMessageUpdateBySegment(symKey, plainText);
  88. let decryptText = await decryptMessagePromise(symKey, encryptText);
  89. if (plainText.data.toString() === decryptText.data.toString()) {
  90. console.info('decrypt ok');
  91. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  92. } else {
  93. console.error('decrypt failed');
  94. }
  95. }
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

  10. function genGcmParamsSpec() {
  11. let ivBlob = generateRandom(12);
  12. let arr = [1, 2, 3, 4, 5, 6, 7, 8]; // 8 bytes
  13. let dataAad = new Uint8Array(arr);
  14. let aadBlob: cryptoFramework.DataBlob = { data: dataAad };
  15. arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 16 bytes
  16. let dataTag = new Uint8Array(arr);
  17. let tagBlob: cryptoFramework.DataBlob = {
  18. data: dataTag
  19. }; // The GCM authTag is obtained by doFinal() in encryption and passed in params of init() in decryption.
  20. let gcmParamsSpec: cryptoFramework.GcmParamsSpec = {
  21. iv: ivBlob,
  22. aad: aadBlob,
  23. authTag: tagBlob,
  24. algName: "GcmParamsSpec"
  25. };
  26. return gcmParamsSpec;
  27. }
  28. let gcmParams = genGcmParamsSpec();
  29. // 分段加密消息。
  30. function encryptMessageUpdateBySegment(symKey: cryptoFramework.SymKey, plainText: cryptoFramework.DataBlob) {
  31. let cipher = cryptoFramework.createCipher('AES128|GCM|PKCS7');
  32. cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, symKey, gcmParams);
  33. let updateLength = 20; // 假设以20字节为单位进行分段update，实际并无要求。
  34. let cipherText = new Uint8Array();
  35. for (let i = 0; i < plainText.data.length; i += updateLength) {
  36. let updateMessage = plainText.data.subarray(i, i + updateLength);
  37. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  38. // 分段update。
  39. let updateOutput = cipher.updateSync(updateMessageBlob);
  40. // 把update的结果拼接起来，得到密文（有些情况下还需拼接doFinal的结果，这取决于分组模式。
  41. // 和填充模式，本例中GCM模式的doFinal结果只包含authTag而不含密文，所以不需要拼接）。
  42. let mergeText = new Uint8Array(cipherText.length + updateOutput.data.length);
  43. mergeText.set(cipherText);
  44. mergeText.set(updateOutput.data, cipherText.length);
  45. cipherText = mergeText;
  46. }
  47. gcmParams.authTag = cipher.doFinalSync(null);
  48. let cipherBlob: cryptoFramework.DataBlob = { data: cipherText };
  49. return cipherBlob;
  50. }
  51. // 分段解密消息。
  52. function decryptMessage(symKey: cryptoFramework.SymKey, cipherText: cryptoFramework.DataBlob) {
  53. let decoder = cryptoFramework.createCipher('AES128|GCM|PKCS7');
  54. decoder.initSync(cryptoFramework.CryptoMode.DECRYPT_MODE, symKey, gcmParams);
  55. let updateLength = 20; // 假设以20字节为单位进行分段update，实际并无要求。
  56. let decryptText = new Uint8Array();
  57. for (let i = 0; i < cipherText.data.length; i += updateLength) {
  58. let updateMessage = cipherText.data.subarray(i, i + updateLength);
  59. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  60. // 分段update。
  61. let updateOutput = decoder.updateSync(updateMessageBlob);
  62. // 把update的结果拼接起来，得到明文。
  63. let mergeText = new Uint8Array(decryptText.length + updateOutput.data.length);
  64. mergeText.set(decryptText);
  65. mergeText.set(updateOutput.data, decryptText.length);
  66. decryptText = mergeText;
  67. }
  68. let decryptData = decoder.doFinalSync(null);
  69. if (decryptData === null) {
  70. console.info('GCM decrypt success, decryptData is null');
  71. }
  72. let decryptBlob: cryptoFramework.DataBlob = { data: decryptText };
  73. return decryptBlob;
  74. }
  75. function genSymKeyByData(symKeyData: Uint8Array) {
  76. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  77. let aesGenerator = cryptoFramework.createSymKeyGenerator('AES128');
  78. let symKey = aesGenerator.convertKeySync(symKeyBlob);
  79. console.info('convertKeySync success');
  80. return symKey;
  81. }
  82. function main() {
  83. let keyData = new Uint8Array([83, 217, 231, 76, 28, 113, 23, 219, 250, 71, 209, 210, 205, 97, 32, 159]);
  84. let symKey = genSymKeyByData(keyData);
  85. let message = "aaaaa.....bbbbb.....ccccc.....ddddd.....eee"; // 消息总共43字节，根据utf-8解码后，也是43字节。
  86. let plainText: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(message, 'utf-8').buffer) };
  87. let encryptText = encryptMessageUpdateBySegment(symKey, plainText);
  88. let decryptText = decryptMessage(symKey, encryptText);
  89. if (plainText.data.toString() === decryptText.data.toString()) {
  90. console.info('decrypt ok');
  91. console.info('decrypt plainText: ' + buffer.from(decryptText.data).toString('utf-8'));
  92. } else {
  93. console.error('decrypt failed');
  94. }
  95. }
  ```