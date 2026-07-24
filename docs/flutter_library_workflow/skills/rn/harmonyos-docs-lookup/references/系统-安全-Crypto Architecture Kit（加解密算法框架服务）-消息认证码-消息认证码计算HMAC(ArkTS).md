HMAC使用指定的摘要算法，以共享密钥和消息作为输入，生成固定长度的消息认证码，用于检验报文的完整性。HMAC在消息摘要算法基础上增加密钥输入，确保信息正确性。

## 开发步骤

在调用update接口传入数据时，可以[一次性传入所有数据](/consumer/cn/doc/harmonyos-guides/crypto-compute-hmac#hmac一次性传入)，也可以把数据人工分段，然后[分段update](/consumer/cn/doc/harmonyos-guides/crypto-compute-hmac#分段hmac)。对于同一段数据而言，是否分段，计算结果没有差异。对于数据量较大的数据，开发者可以根据实际需求选择是否分段传入。

下面分别提供两种方式的示例代码。

### HMAC（一次性传入）

1. 调用[cryptoFramework.createMac](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatemac)，指定摘要算法SHA256，生成消息认证码实例（Mac）。
2. 调用[cryptoFramework.createSymKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesymkeygenerator)、[SymKeyGenerator.convertKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkey-1)，生成密钥算法为HMAC的对称密钥（SymKey）。

   详细开发指导请参考[指定二进制数据生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-convert-binary-data-to-sym-key)。
3. 调用[Mac.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-6)，指定共享对称密钥（SymKey），初始化Mac对象。
4. 调用[Mac.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-8)，传入自定义消息，进行消息认证码计算。单次update长度没有限制。
5. 调用[Mac.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-2)，获取Mac计算结果。
6. 调用[Mac.getMacLength](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getmaclength)，获取Mac消息认证码的长度，单位为字节。

* 以使用await方式一次性传入数据，获取消息认证码计算结果为例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. async function genSymKeyByData(symKeyData: Uint8Array) {
  5. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  6. let aesGenerator = cryptoFramework.createSymKeyGenerator('HMAC');
  7. let symKey = await aesGenerator.convertKey(symKeyBlob);
  8. console.info('convertKey success');
  9. return symKey;
  10. }
  11. async function doHmac() {
  12. // 把字符串按utf-8解码为Uint8Array，使用固定的128位的密钥，即16字节。
  13. let keyData = new Uint8Array(buffer.from("12345678abcdefgh", 'utf-8').buffer);
  14. let key = await genSymKeyByData(keyData);
  15. let macAlgName = 'SHA256'; // 摘要算法名。
  16. let message = 'hmacTestMessage'; // 待进行HMAC的数据。
  17. let mac = cryptoFramework.createMac(macAlgName);
  18. await mac.init(key);
  19. // 数据量较少时，可以一次性执行update操作，将所有数据传入。该接口不对入参长度进行限制。
  20. await mac.update({ data: new Uint8Array(buffer.from(message, 'utf-8').buffer) });
  21. let macResult = await mac.doFinal();
  22. console.info('HMAC result:' + macResult.data);
  23. let macLen = mac.getMacLength();
  24. console.info('HMAC len:' + macLen);
  25. }
  ```
* 以使用同步方式一次性传入数据，获取消息认证码计算结果为例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. function genSymKeyByData(symKeyData: Uint8Array) {
  5. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  6. let aesGenerator = cryptoFramework.createSymKeyGenerator('HMAC');
  7. let symKey =  aesGenerator.convertKeySync(symKeyBlob);
  8. console.info('[Sync]convertKey success');
  9. return symKey;
  10. }
  11. function doHmacBySync() {
  12. // 把字符串按utf-8解码为Uint8Array，使用固定的128位的密钥，即16字节。
  13. let keyData = new Uint8Array(buffer.from("12345678abcdefgh", 'utf-8').buffer);
  14. let key = genSymKeyByData(keyData);
  15. let macAlgName = 'SHA256'; // 摘要算法名。
  16. let message = 'hmacTestMessage'; // 待进行HMAC的数据。
  17. let mac = cryptoFramework.createMac(macAlgName);
  18. mac.initSync(key);
  19. // 数据量较少时，可以一次性执行update操作，将所有数据传入。接口不对入参长度进行限制。
  20. mac.updateSync({ data: new Uint8Array(buffer.from(message, 'utf-8').buffer) });
  21. let macResult = mac.doFinalSync();
  22. console.info('[Sync]HMAC result:' + macResult.data);
  23. let macLen = mac.getMacLength();
  24. console.info('HMAC len:' + macLen);
  25. }
  ```

### 分段HMAC

1. 调用[cryptoFramework.createMac](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatemac)，指定摘要算法SHA256，生成消息认证码实例（Mac）。
2. 调用[cryptoFramework.createSymKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesymkeygenerator)和[SymKeyGenerator.convertKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkey-1)，生成密钥算法为HMAC的对称密钥（SymKey）。

   生成对称密钥的开发指导，请参考[指定二进制数据生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-convert-binary-data-to-sym-key)。
3. 调用[Mac.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-7)，指定共享对称密钥（SymKey），初始化Mac对象。
4. 传入自定义消息，将一次传入数据量设置为20字节，多次调用[Mac.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-9)，进行消息认证码计算。
5. 调用[Mac.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-3)，获取Mac计算结果。
6. 调用[Mac.getMacLength](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getmaclength)，获取Mac消息认证码的长度，单位为字节。

* 使用await方式分段传入数据，获取消息认证码计算结果。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. async function genSymKeyByData(symKeyData: Uint8Array) {
  5. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  6. let aesGenerator = cryptoFramework.createSymKeyGenerator('HMAC');
  7. let symKey = await aesGenerator.convertKey(symKeyBlob);
  8. console.info('convertKey success');
  9. return symKey;
  10. }
  11. async function doLoopHmac() {
  12. // 把字符串按utf-8解码为Uint8Array，使用固定的128位的密钥，即16字节。
  13. let keyData = new Uint8Array(buffer.from("12345678abcdefgh", 'utf-8').buffer);
  14. let key = await genSymKeyByData(keyData);
  15. let macAlgName = "SHA256"; // 摘要算法名。
  16. let mac = cryptoFramework.createMac(macAlgName);
  17. // 消息共43字节，utf-8解码后仍为43字节。
  18. let messageText = "aaaaa......bbbbb......ccccc......ddddd......eee";
  19. let messageData = new Uint8Array(buffer.from(messageText, 'utf-8').buffer);
  20. let updateLength = 20; // 以20字节为单位进行分段更新。
  21. await mac.init(key);
  22. for (let i = 0; i < messageData.length; i += updateLength) {
  23. let updateMessage = messageData.subarray(i, i + updateLength);
  24. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  25. await mac.update(updateMessageBlob);
  26. }
  27. let macOutput = await mac.doFinal();
  28. console.info("HMAC result: " + macOutput.data);
  29. let macLen = mac.getMacLength();
  30. console.info('HMAC len:' + macLen);
  31. }
  ```
* 使用同步方式分段传入数据，获取消息认证码计算结果。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. function genSymKeyByData(symKeyData: Uint8Array) {
  5. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  6. let aesGenerator = cryptoFramework.createSymKeyGenerator('HMAC');
  7. let symKey = aesGenerator.convertKeySync(symKeyBlob);
  8. console.info('[Sync]convertKey success');
  9. return symKey;
  10. }
  11. function doLoopHmacBySync() {
  12. // 字符串按utf-8解码为Uint8Array，使用固定的128位的密钥，即16字节。
  13. let keyData = new Uint8Array(buffer.from("12345678abcdefgh", 'utf-8').buffer);
  14. let key = genSymKeyByData(keyData);
  15. let macAlgName = "SHA256"; // 摘要算法名。
  16. let mac = cryptoFramework.createMac(macAlgName);
  17. // 消息总计43字节，按utf-8解码。
  18. let messageText = "aaaaa.....bbbbb.....ccccc.....ddddd.....eee";
  19. let messageData = new Uint8Array(buffer.from(messageText, 'utf-8').buffer);
  20. let updateLength = 20; // 假设以20字节为单位进行分段update，实际并无要求。
  21. mac.initSync(key);
  22. for (let i = 0; i < messageData.length; i += updateLength) {
  23. let updateMessage = messageData.subarray(i, i + updateLength);
  24. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  25. mac.updateSync(updateMessageBlob);
  26. }
  27. let macOutput = mac.doFinalSync();
  28. console.info("[Sync]HMAC result: " + macOutput.data);
  29. let macLen = mac.getMacLength();
  30. console.info('HMAC len:' + macLen);
  31. }
  ```

### HMAC(HmacSpec作为参数传入)

1. 调用[cryptoFramework.createMac](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatemac)，指定消息认证码算法HMAC，指定摘要算法SHA256，生成消息认证码实例（Mac）。
2. 调用[cryptoFramework.createSymKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesymkeygenerator)和[SymKeyGenerator.convertKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkey-1)，生成密钥算法为HMAC的对称密钥（SymKey）。

   参考[指定二进制数据生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-convert-binary-data-to-sym-key)。
3. 调用[Mac.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-6)，指定共享对称密钥（SymKey），初始化Mac对象。
4. 调用[Mac.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-8)，传入自定义消息，进行消息认证码计算。单次update长度没有限制。
5. 调用[Mac.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-2)，获取Mac计算结果。
6. 调用[Mac.getMacLength](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getmaclength)，获取Mac消息认证码的长度，单位为字节。

* 以使用await方式一次性传入数据，获取消息认证码计算结果为例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. async function genSymKeyByData(symKeyData: Uint8Array) {
  5. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  6. let aesGenerator = cryptoFramework.createSymKeyGenerator('HMAC');
  7. let symKey = await aesGenerator.convertKey(symKeyBlob);
  8. console.info('convertKey success');
  9. return symKey;
  10. }
  11. async function doHmac() {
  12. // 把字符串按utf-8解码为Uint8Array，使用固定的128位的密钥，即16字节。
  13. let keyData = new Uint8Array(buffer.from("12345678abcdefgh", 'utf-8').buffer);
  14. let key = await genSymKeyByData(keyData);
  15. let spec: cryptoFramework.HmacSpec = {
  16. algName: "HMAC",
  17. mdName: "SHA256",
  18. };
  19. let message = 'hmacTestMessage'; // 待进行HMAC的数据。
  20. let mac = cryptoFramework.createMac(spec);
  21. await mac.init(key);
  22. // 数据量较少时，可以只做一次update，将所有数据传入，接口不对参数长度设限。
  23. await mac.update({ data: new Uint8Array(buffer.from(message, 'utf-8').buffer) });
  24. let macResult = await mac.doFinal();
  25. console.info('HMAC result:' + macResult.data);
  26. let macLen = mac.getMacLength();
  27. console.info('HMAC len:' + macLen);
  28. }
  ```