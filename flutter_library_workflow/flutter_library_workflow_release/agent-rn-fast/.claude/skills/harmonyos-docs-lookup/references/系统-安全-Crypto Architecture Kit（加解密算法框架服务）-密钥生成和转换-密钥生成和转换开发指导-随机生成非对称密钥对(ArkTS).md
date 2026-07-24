以RSA和SM2为例，随机生成非对称密钥对（KeyPair），并获得二进制数据。

非对称密钥对可用于后续加解密等操作，二进制数据可用于存储或传输。

## 随机生成RSA密钥对

对应的算法规格请查看[非对称密钥生成和转换规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#rsa)。

1. 调用[cryptoFramework.createAsyKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygenerator)，指定字符串参数'RSA1024|PRIMES\_2'，创建RSA密钥类型为RSA1024、素数个数为2的非对称密钥生成器（AsyKeyGenerator）。
2. 调用[AsyKeyGenerator.generateKeyPair](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatekeypair-1)，随机生成非对称密钥对象（KeyPair）。

   KeyPair对象中包括公钥PubKey、私钥PriKey。
3. 调用[PubKey.getEncoded](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getencoded)和[PriKey.getEncoded](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getencoded)，分别获取密钥对象的二进制数据。

* 以使用Promise方式随机生成RSA密钥对为例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. function generateAsyKey() {
  4. // 创建一个AsyKeyGenerator实例。
  5. let rsaGenerator = cryptoFramework.createAsyKeyGenerator('RSA1024|PRIMES_2');
  6. // 使用密钥生成器随机生成非对称密钥对。
  7. let keyGenPromise = rsaGenerator.generateKeyPair();
  8. keyGenPromise.then(keyPair => {
  9. let pubKey = keyPair.pubKey;
  10. let priKey = keyPair.priKey;
  11. // 获取非对称密钥对的二进制数据。
  12. let pkBlob = pubKey.getEncoded();
  13. let skBlob = priKey.getEncoded();
  14. console.info('pk bin data' + pkBlob.data);
  15. console.info('sk bin data' + skBlob.data);
  16. });
  17. }
  ```
* 同步返回结果（调用方法[generateKeyPairSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatekeypairsync12)）：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. function generateAsyKeySync() {
  4. // 创建一个AsyKeyGenerator实例。
  5. let rsaGenerator = cryptoFramework.createAsyKeyGenerator('RSA1024|PRIMES_2');
  6. // 使用密钥生成器随机生成非对称密钥对。
  7. try {
  8. let keyPair = rsaGenerator.generateKeyPairSync();
  9. if (keyPair !== null) {
  10. let pubKey = keyPair.pubKey;
  11. let priKey = keyPair.priKey;
  12. // 获取非对称密钥对的二进制数据。
  13. let pkBlob = pubKey.getEncoded();
  14. let skBlob = priKey.getEncoded();
  15. console.info('pk bin data' + pkBlob.data);
  16. console.info('sk bin data' + skBlob.data);
  17. } else {
  18. console.error("[Sync]: get key pair result fail!");
  19. }
  20. } catch (e) {
  21. console.error(`get key pair failed, ${e.code}, ${e.message}`);
  22. }
  23. }
  ```

## 随机生成SM2密钥对

对应的算法规格请查看[非对称密钥生成和转换规格：SM2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#sm2)。

1. 调用[cryptoFramework.createAsyKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygenerator)，指定字符串参数'SM2\_256'，创建密钥算法为SM2、密钥长度为256位的非对称密钥生成器（AsyKeyGenerator）。
2. 调用[AsyKeyGenerator.generateKeyPair](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatekeypair-1)，随机生成非对称密钥对象（KeyPair）。

   KeyPair对象中包括公钥PubKey、私钥PriKey。
3. 调用[PubKey.getEncoded](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getencoded)和[PriKey.getEncoded](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getencoded)，分别获取密钥对象的二进制数据。

* 以使用Promise方式随机生成SM2密钥对为例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. function generateSM2Key() {
  4. // 创建一个AsyKeyGenerator实例。
  5. let sm2Generator = cryptoFramework.createAsyKeyGenerator('SM2_256');
  6. // 使用密钥生成器随机生成非对称密钥对。
  7. let keyGenPromise = sm2Generator.generateKeyPair();
  8. keyGenPromise.then(keyPair => {
  9. let pubKey = keyPair.pubKey;
  10. let priKey = keyPair.priKey;
  11. // 获取非对称密钥对的二进制数据。
  12. let pkBlob = pubKey.getEncoded();
  13. let skBlob = priKey.getEncoded();
  14. console.info('pk bin data' + pkBlob.data);
  15. console.info('sk bin data' + skBlob.data);
  16. });
  17. }
  ```
* 同步返回结果（调用方法[generateKeyPairSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatekeypairsync12)）：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. function generateSM2KeySync() {
  4. // 创建一个AsyKeyGenerator实例。
  5. let rsaGenerator = cryptoFramework.createAsyKeyGenerator('SM2_256');
  6. // 使用密钥生成器随机生成非对称密钥对。
  7. try {
  8. let keyPair = rsaGenerator.generateKeyPairSync();
  9. if (keyPair !== null) {
  10. let pubKey = keyPair.pubKey;
  11. let priKey = keyPair.priKey;
  12. // 获取非对称密钥对的二进制数据。
  13. let pkBlob = pubKey.getEncoded();
  14. let skBlob = priKey.getEncoded();
  15. console.info('pk bin data' + pkBlob.data);
  16. console.info('sk bin data' + skBlob.data);
  17. } else {
  18. console.error("[Sync]: get key pair result fail!");
  19. }
  20. } catch (e) {
  21. console.error(`get key pair failed, ${e.code}, ${e.message}`);
  22. }
  23. }
  ```