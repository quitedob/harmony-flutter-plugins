从API version 21开始，可以选择使用硬件熵源生成安全随机数。

随机数主要用于临时会话密钥生成和非对称加密算法密钥生成等场景。在加解密场景中，安全随机数生成器需要具备随机性、不可预测性和不可重现性。

使用更安全的熵源，对随机数而言，就意味着 “结果难以被猜测或复现”，是 “真随机性” 的量化体现。

当前硬件熵源通过调用[HUKS](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-overview)接口实现。

开发者可以调用接口，完成以下具体功能：

* 生成指定长度的安全随机数，并将其用于生成对应的密钥。
* 开启硬件熵源。
* 指定随机种子，生成一系列的随机序列。

在开发前，开发者应该先对加解密基础知识有一定了解，并熟知以下随机数相关的基本概念：

* **内部状态**

  代表随机数生成器内存中的数值，当内部状态相同时，随机数生成器会生成固定的随机数序列。
* **随机种子**

  一个用来对伪随机数的内部状态进行初始化的数据，随机数生成器通过种子来生成一系列的随机序列。

  当前OpenSSL实现方式，随机数生成器内部状态是不断变化的，即使设置相同的种子，生成的随机数序列也不会相同。

## 支持的算法与规格

安全随机数生成，设置硬件熵源之后，使用OpenSSL的RAND\_priv\_bytes接口生成。

展开

| 算法 | 长度（Byte） |
| --- | --- |
| CTR\_DRBG | [1, INT\_MAX] |

## 开发步骤

1. 调用[cryptoFramework.createRandom](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreaterandom)，生成随机数实例。
2. 调用[cryptoFramework.enableHardwareEntropy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#enablehardwareentropy21)，开启硬件熵源。
3. （可选）设置DataBlob数据，调用[Random.setSeed](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#setseed)，为随机数生成器设置种子。
4. 设置指定字节长度，调用[Random.generateRandom](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generaterandom)或[Random.generateRandomSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generaterandomsync10)，生成安全随机数。

   指定字节长度范围为1~INT\_MAX。

* 通过await返回异步结果：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. async function doRand() {
  4. let rand = cryptoFramework.createRandom();
  5. rand.enableHardwareEntropy();
  6. let seed = new Uint8Array([1, 2, 3]);
  7. rand.setSeed({ data: seed });
  8. let len = 12;
  9. let randOutput = await rand.generateRandom(len);
  10. console.info('rand output:' + randOutput.data);
  11. }
  ```
* 同步返回结果：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { BusinessError } from '@kit.BasicServicesKit';

  4. function doRandBySync() {
  5. let rand = cryptoFramework.createRandom();
  6. rand.enableHardwareEntropy();
  7. let len = 24; // Generate a 24-byte random number.
  8. try {
  9. let randData = rand.generateRandomSync(len);
  10. if (randData.data.length !== 0) {
  11. console.info("[Sync]: rand result: " + randData.data);
  12. } else {
  13. console.error("[Sync]: get rand result fail!");
  14. }
  15. } catch (error) {
  16. let e: BusinessError = error as BusinessError;
  17. console.error(`do rand failed, ${e.code}, ${e.message}`);
  18. }
  19. }
  ```