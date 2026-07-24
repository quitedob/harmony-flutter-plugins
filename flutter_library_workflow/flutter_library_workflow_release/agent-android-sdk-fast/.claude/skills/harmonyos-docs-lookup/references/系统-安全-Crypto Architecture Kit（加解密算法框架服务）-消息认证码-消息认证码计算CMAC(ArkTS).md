CMAC通过使用分组密码（如AES）和一个密钥生成认证码，确保消息在传输过程中未被篡改。

## 开发步骤

在调用update接口传入数据时，可以[一次性传入所有数据](/consumer/cn/doc/harmonyos-guides/crypto-compute-cmac#cmac一次性传入数据)，也可以把数据人工分段，然后[分段update](/consumer/cn/doc/harmonyos-guides/crypto-compute-cmac#分段cmac)。对于同一段数据而言，是否分段，计算结果没有差异。对于数据量较大的数据，开发者可以根据实际需求选择是否分段传入。

下面分别提供两种方式的示例代码。

### CMAC（一次性传入数据）

1. 调用[cryptoFramework.createMac](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatemac18)，指定消息认证码算法为CMAC，指定对称算法为AES128，生成消息认证码实例（Mac）。
2. 调用[cryptoFramework.createSymKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesymkeygenerator)和[SymKeyGenerator.convertKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkey-1)，生成密钥算法为AES256的对称密钥（SymKey）。

   生成对称密钥的详细开发指导，请参考[指定二进制数据生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-convert-binary-data-to-sym-key)。
3. 调用[Mac.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-6)，指定共享对称密钥（SymKey），初始化Mac对象。
4. 调用[Mac.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-8)，传入自定义消息，进行消息认证码计算。单次update的长度没有限制。
5. 调用[Mac.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-2)，获取Mac计算结果。
6. 调用[Mac.getMacLength](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getmaclength)，获取Mac长度，单位为字节。

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
  6. let aesGenerator = cryptoFramework.createSymKeyGenerator('AES128');
  7. let symKey = await aesGenerator.convertKey(symKeyBlob);
  8. console.info('convertKey success');
  9. return symKey;
  10. }
  11. async function doCmac() {
  12. // 把字符串按utf-8解码为Uint8Array，使用固定的128位的密钥，即16字节。
  13. let keyData = new Uint8Array(buffer.from("12345678abcdefgh", 'utf-8').buffer);
  14. let key = await genSymKeyByData(keyData);
  15. let spec: cryptoFramework.CmacSpec = {
  16. algName: "CMAC",
  17. cipherName: "AES128",
  18. };
  19. let message = 'cmacTestMessage'; // 待进行CMAC的数据。
  20. let mac = cryptoFramework.createMac(spec);
  21. await mac.init(key);
  22. // 数据量不多时，可以一次性更新，将所有数据传入，接口没有入参长度限制。
  23. await mac.update({ data: new Uint8Array(buffer.from(message, 'utf-8').buffer) });
  24. let macResult = await mac.doFinal();
  25. console.info('CMAC result:' + macResult.data);
  26. let macLen = mac.getMacLength();
  27. console.info('CMAC len:' + macLen);
  28. }
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
  6. let aesGenerator = cryptoFramework.createSymKeyGenerator('AES128');
  7. let symKey =  aesGenerator.convertKeySync(symKeyBlob);
  8. console.info('[Sync]convertKey success');
  9. return symKey;
  10. }
  11. function doCmacBySync() {
  12. // 把字符串按utf-8解码为Uint8Array，使用固定的128位的密钥，即16字节。
  13. let keyData = new Uint8Array(buffer.from("12345678abcdefgh", 'utf-8').buffer);
  14. let key = genSymKeyByData(keyData);
  15. let spec: cryptoFramework.CmacSpec = {
  16. algName: "CMAC",
  17. cipherName: "AES128",
  18. };
  19. let message = 'cmacTestMessage'; // 待进行CMAC的数据。
  20. let mac = cryptoFramework.createMac(spec);
  21. mac.initSync(key);
  22. // 数据量不大时，可以一次性更新，将所有数据传入，接口没有入参长度限制。
  23. mac.updateSync({ data: new Uint8Array(buffer.from(message, 'utf-8').buffer) });
  24. let macResult = mac.doFinalSync();
  25. console.info('[Sync]CMAC result:' + macResult.data);
  26. let macLen = mac.getMacLength();
  27. console.info('CMAC len:' + macLen);
  28. }
  ```

### 分段CMAC

1. 调用[cryptoFramework.createMac](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatemac18)，指定消息认证码算法CMAC，对称算法AES256，生成消息认证码实例（Mac）。
2. 调用[cryptoFramework.createSymKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesymkeygenerator)、[SymKeyGenerator.convertKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkey-1)，生成密钥算法为AES256的对称密钥（SymKey）。

   生成对称密钥的详细开发指导，请参考[指定二进制数据生成对称密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-convert-binary-data-to-sym-key)。
3. 调用[Mac.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-7)，指定共享对称密钥（SymKey），初始化Mac对象。
4. 传入自定义消息，设置每次传入数据量为20字节，多次调用[Mac.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-9)，计算消息认证码。
5. 调用[Mac.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-3)，获取Mac计算结果。
6. 调用[Mac.getMacLength](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getmaclength)，获取Mac消息认证码的长度，单位为字节。

* 以使用await方式分段传入数据，获取消息认证码计算结果为例。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. async function genSymKeyByData(symKeyData: Uint8Array) {
  5. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  6. let aesGenerator = cryptoFramework.createSymKeyGenerator('AES128');
  7. let symKey = await aesGenerator.convertKey(symKeyBlob);
  8. console.info('convertKey success');
  9. return symKey;
  10. }
  11. async function doLoopCmac() {
  12. // 把字符串按utf-8解码为Uint8Array，使用固定的128位的密钥，即16字节。
  13. let keyData = new Uint8Array(buffer.from("12345678abcdefgh", 'utf-8').buffer);
  14. let key = await genSymKeyByData(keyData);
  15. let spec: cryptoFramework.CmacSpec = {
  16. algName: "CMAC",
  17. cipherName: "AES128",
  18. };
  19. let mac = cryptoFramework.createMac(spec);
  20. // 假设消息共43字节，根据UTF-8解码后，仍是43字节。
  21. let messageText = "aaaaa......bbbbb......ccccc......ddddd......eee";
  22. let messageData = new Uint8Array(buffer.from(messageText, 'utf-8').buffer);
  23. let updateLength = 20; // 假设以20字节为单位进行分段update，实际并无具体要求。
  24. await mac.init(key);
  25. for (let i = 0; i < messageData.length; i += updateLength) {
  26. let updateMessage = messageData.subarray(i, i + updateLength);
  27. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  28. await mac.update(updateMessageBlob);
  29. }
  30. let macOutput = await mac.doFinal();
  31. console.info("CMAC result: " + macOutput.data);
  32. let macLen = mac.getMacLength();
  33. console.info('CMAC len:' + macLen);
  34. }
  ```
* 以使用同步方式分段传入数据，获取消息认证码计算结果为例。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. function genSymKeyByData(symKeyData: Uint8Array) {
  5. let symKeyBlob: cryptoFramework.DataBlob = { data: symKeyData };
  6. let aesGenerator = cryptoFramework.createSymKeyGenerator('AES128');
  7. let symKey = aesGenerator.convertKeySync(symKeyBlob);
  8. console.info('[Sync]convertKey success');
  9. return symKey;
  10. }
  11. function doLoopCmacBySync() {
  12. // 把字符串按utf-8解码为Uint8Array，使用固定的128位的密钥，即16字节。
  13. let keyData = new Uint8Array(buffer.from("12345678abcdefgh", 'utf-8').buffer);
  14. let key = genSymKeyByData(keyData);
  15. let spec: cryptoFramework.CmacSpec = {
  16. algName: "CMAC",
  17. cipherName: "AES128",
  18. };
  19. let mac = cryptoFramework.createMac(spec);
  20. // 假设信息共43字节，utf-8解码后仍为43字节。
  21. let messageText = "aaaaa.....bbbbb.....ccccc.....ddddd.....eee";
  22. let messageData = new Uint8Array(buffer.from(messageText, 'utf-8').buffer);
  23. let updateLength = 20; // 假设以20字节为单位进行分段update，实际没有具体要求。
  24. mac.initSync(key);
  25. for (let i = 0; i < messageData.length; i += updateLength) {
  26. let updateMessage = messageData.subarray(i, i + updateLength);
  27. let updateMessageBlob: cryptoFramework.DataBlob = { data: updateMessage };
  28. mac.updateSync(updateMessageBlob);
  29. }
  30. let macOutput = mac.doFinalSync();
  31. console.info("[Sync]CMAC result: " + macOutput.data);
  32. let macLen = mac.getMacLength();
  33. console.info('CMAC len:' + macLen);
  34. }
  ```