以3DES和HMAC为例，根据指定的对称密钥二进制数据，生成对称密钥对象（SymKey），即将外部或存储的二进制数据转换为算法库的密钥对象，该对象可用于后续的加解密等操作。

## 指定二进制数据转换3DES密钥

对应的算法规格请查看[对称密钥生成和转换规格：3DES](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#section3des)。

1. 获取3DES二进制密钥数据，封装成[DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#datablob)对象。
2. 调用[cryptoFramework.createSymKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesymkeygenerator)，指定字符串参数'3DES192'，创建密钥算法为3DES、密钥长度为192位的对称密钥生成器（SymKeyGenerator）。
3. 调用[SymKeyGenerator.convertKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkey-1)，根据指定的对称密钥二进制数据生成对称密钥对象（SymKey）。
4. 调用[SymKey.getEncoded](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getencoded)，获取密钥对象的二进制数据。

* 以使用callback方式生成3DES密钥为例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { BusinessError } from '@kit.BasicServicesKit';

  4. function genKeyMaterialBlob(): cryptoFramework.DataBlob {
  5. let arr = [
  6. 0xba, 0x3d, 0xc2, 0x71, 0x21, 0x1e, 0x30, 0x56,
  7. 0xad, 0x47, 0xfc, 0x5a, 0x46, 0x39, 0xee, 0x7c,
  8. 0xba, 0x3b, 0xc2, 0x71, 0xab, 0xa0, 0x30, 0x72]; // 密钥长度为192位，即24字节。
  9. let keyMaterial = new Uint8Array(arr);
  10. return { data: keyMaterial };
  11. }

  13. function testConvertSymKey() {
  14. // 创建SymKeyGenerator实例。
  15. let symKeyGenerator = cryptoFramework.createSymKeyGenerator('3DES192');
  16. // 根据指定的数据生成对称密钥。
  17. let keyMaterialBlob = genKeyMaterialBlob();
  18. try {
  19. symKeyGenerator.convertKey(keyMaterialBlob, (error, key) => {
  20. if (error) { // 如果业务逻辑执行失败，则callback的第一个参数返回错误信息，即异步抛出异常。
  21. let e: BusinessError = error as BusinessError;
  22. console.error(`convertKey error, ${e.code}, ${e.message}`);
  23. return;
  24. }
  25. console.info('key algName:' + key.algName);
  26. console.info('key format:' + key.format);
  27. let encodedKey = key.getEncoded(); // 获取对称密钥对象的二进制数据，并以字节数组形式输出。长度为24字节。
  28. console.info('key getEncoded hex: ' + encodedKey.data);
  29. })
  30. } catch (error) { // 参数检查发现错误立即抛出异常。
  31. let e: BusinessError = error as BusinessError;
  32. console.error(`convertKey failed, ${e.code}, ${e.message}`);
  33. }
  34. }
  ```
* 同步方法（调用方法[convertKeySync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkeysync12)）：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. function genKeyMaterialBlob(): cryptoFramework.DataBlob {
  4. let arr = [
  5. 0xba, 0x3d, 0xc2, 0x71, 0x21, 0x1e, 0x30, 0x56,
  6. 0xad, 0x47, 0xfc, 0x5a, 0x46, 0x39, 0xee, 0x7c,
  7. 0xba, 0x3b, 0xc2, 0x71, 0xab, 0xa0, 0x30, 0x72]; // 密钥长度为192位，即24字节。
  8. let keyMaterial = new Uint8Array(arr);
  9. return { data: keyMaterial };
  10. }

  12. function testConvertSymKey() {
  13. // 创建SymKeyGenerator实例。
  14. let symKeyGenerator = cryptoFramework.createSymKeyGenerator('3DES192');
  15. // 根据指定的数据生成对称密钥。
  16. let keyMaterialBlob = genKeyMaterialBlob();
  17. let key = symKeyGenerator.convertKeySync(keyMaterialBlob);
  18. let encodedKey = key.getEncoded(); // 获取对称密钥对象的二进制数据，并以字节数组形式输出。长度为24字节。
  19. console.info('key getEncoded hex' + encodedKey.data);
  20. }
  ```

## 指定二进制数据转换HMAC密钥

请查看[对称密钥生成和转换规格：HMAC](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sym-key-generation-conversion-spec#hmac)。

1. 获取HMAC二进制密钥并封装成[DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#datablob)对象。
2. 调用[cryptoFramework.createSymKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesymkeygenerator)，指定字符串参数'HMAC'，创建密钥算法为HMAC、密钥长度为[1, 32768]位的对称密钥生成器（SymKeyGenerator）。
3. 调用[SymKeyGenerator.convertKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkey-1)，根据指定的对称密钥二进制数据，生成对称密钥对象（SymKey）。
4. 调用[SymKey.getEncoded](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getencoded)，获取密钥的二进制数据。

* 以生成HMAC密钥为例，使用await方式：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. async function testConvertHmacKey() {
  5. // 对称密钥长度64字节，512比特。
  6. let keyMessage = '12345678abcdefgh12345678abcdefgh12345678abcdefgh12345678abcdefgh';
  7. let keyBlob: cryptoFramework.DataBlob = {
  8. data : new Uint8Array(buffer.from(keyMessage, 'utf-8').buffer)
  9. }
  10. let symKeyGenerator = cryptoFramework.createSymKeyGenerator('HMAC');
  11. let key = await symKeyGenerator.convertKey(keyBlob);
  12. let encodedKey = key.getEncoded();
  13. console.info('key encoded data:' + encodedKey.data);
  14. }
  ```
* 同步方法（调用方法[convertKeySync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkeysync12)）：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. function testConvertKeySync() {
  5. // 对称密钥长度64字节，512比特。
  6. let keyMessage = '12345678abcdefgh12345678abcdefgh12345678abcdefgh12345678abcdefgh';
  7. let keyBlob: cryptoFramework.DataBlob = {
  8. data : new Uint8Array(buffer.from(keyMessage, 'utf-8').buffer)
  9. }
  10. let symKeyGenerator = cryptoFramework.createSymKeyGenerator('HMAC');
  11. let key = symKeyGenerator.convertKeySync(keyBlob);
  12. let encodedKey = key.getEncoded();
  13. console.info('key encoded data:' + encodedKey.data);
  14. }
  ```