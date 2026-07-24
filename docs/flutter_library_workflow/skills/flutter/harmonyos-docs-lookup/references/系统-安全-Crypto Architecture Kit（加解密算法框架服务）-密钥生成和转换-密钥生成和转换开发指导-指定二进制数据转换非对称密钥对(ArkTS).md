以RSA、ECC、SM2为例，根据指定的非对称密钥二进制数据，生成非对称密钥对（KeyPair），即将外部或存储的二进制数据转换为算法库的密钥对象，该对象可用于后续的加解密等操作。

说明

针对非对称密钥的convertKey操作：

* 公钥需满足：ASN.1语法、X.509规范、DER编码格式。
* 私钥需满足：ASN.1语法、PKCS#8规范、DER编码格式。

## 指定二进制数据转换RSA密钥对

对应的算法规格请查看[非对称密钥生成和转换规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#rsa)。

1. 获取RSA公钥或私钥二进制数据，封装成[DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#datablob)对象。

   公钥和私钥可单独传入，此处示例传入公钥。
2. 调用[cryptoFramework.createAsyKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygenerator)，指定字符串参数'RSA1024'，创建RSA密钥类型为RSA1024、素数个数为2的非对称密钥生成器（AsyKeyGenerator）。

   生成RSA非对称密钥时，默认素数为2，此处省略了参数PRIMES\_2。
3. 调用[AsyKeyGenerator.convertKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkey-3)，传入二进制密钥数据，生成非对称密钥对象（KeyPair）。即将外部或存储的二进制数据转换为算法库的密钥对象，该对象可用于后续的加解密等操作。

* 以使用callback方式生成RSA密钥对为例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. function convertAsyKey() {
  4. let rsaGenerator = cryptoFramework.createAsyKeyGenerator('RSA1024');
  5. let pkVal = new Uint8Array([48, 129, 159, 48, 13, 6, 9, 42, 134, 72, 134, 247, 13, 1, 1, 1, 5, 0, 3, 129, 141, 0, 48, 129, 137, 2, 129, 129, 0, 174, 203, 113, 83, 113, 3, 143, 213, 194, 79, 91, 9, 51, 142, 87, 45, 97, 65, 136, 24, 166, 35, 5, 179, 42, 47, 212, 79, 111, 74, 134, 120, 73, 67, 21, 19, 235, 80, 46, 152, 209, 133, 232, 87, 192, 140, 18, 206, 27, 106, 106, 169, 106, 46, 135, 111, 118, 32, 129, 27, 89, 255, 183, 116, 247, 38, 12, 7, 238, 77, 151, 167, 6, 102, 153, 126, 66, 28, 253, 253, 216, 64, 20, 138, 117, 72, 15, 216, 178, 37, 208, 179, 63, 204, 39, 94, 244, 170, 48, 190, 21, 11, 73, 169, 156, 104, 193, 3, 17, 100, 28, 60, 50, 92, 235, 218, 57, 73, 119, 19, 101, 164, 192, 161, 197, 106, 105, 73, 2, 3, 1, 0, 1]);
  6. let pkBlob: cryptoFramework.DataBlob = { data: pkVal };
  7. rsaGenerator.convertKey(pkBlob, null, (err, keyPair) => {
  8. if (err) {
  9. console.error(`convertKey failed, ${err.code}, ${err.message}`);
  10. return;
  11. }
  12. console.info('convertKey success');
  13. });
  14. }
  ```
* 同步返回结果（调用方法[convertKeySync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkeysync12)）：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. function convertAsyKeySync() {
  4. let rsaGenerator = cryptoFramework.createAsyKeyGenerator('RSA1024');
  5. let pkVal = new Uint8Array([48, 129, 159, 48, 13, 6, 9, 42, 134, 72, 134, 247, 13, 1, 1, 1, 5, 0, 3, 129, 141, 0, 48, 129, 137, 2, 129, 129, 0, 174, 203, 113, 83, 113, 3, 143, 213, 194, 79, 91, 9, 51, 142, 87, 45, 97, 65, 136, 24, 166, 35, 5, 179, 42, 47, 212, 79, 111, 74, 134, 120, 73, 67, 21, 19, 235, 80, 46, 152, 209, 133, 232, 87, 192, 140, 18, 206, 27, 106, 106, 169, 106, 46, 135, 111, 118, 32, 129, 27, 89, 255, 183, 116, 247, 38, 12, 7, 238, 77, 151, 167, 6, 102, 153, 126, 66, 28, 253, 253, 216, 64, 20, 138, 117, 72, 15, 216, 178, 37, 208, 179, 63, 204, 39, 94, 244, 170, 48, 190, 21, 11, 73, 169, 156, 104, 193, 3, 17, 100, 28, 60, 50, 92, 235, 218, 57, 73, 119, 19, 101, 164, 192, 161, 197, 106, 105, 73, 2, 3, 1, 0, 1]);
  6. let pkBlob: cryptoFramework.DataBlob = { data: pkVal };
  7. try {
  8. let keyPair = rsaGenerator.convertKeySync(pkBlob, null);
  9. if (keyPair !== null) {
  10. console.info('convertKeySync success');
  11. }
  12. } catch (e) {
  13. console.error(`get key pair failed, ${e.code}, ${e.message}`);
  14. }
  15. }
  ```

## 指定二进制数据转换ECC密钥对

查看[非对称密钥生成和转换规格：ECC](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#ecc)。

1. 获取ECC公钥或私钥二进制数据，封装成[DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#datablob)对象。

   公钥和私钥可以只传入其中一个，此处示例以传入公钥和私钥为例。
2. 调用[cryptoFramework.createAsyKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygenerator)，指定字符串参数'ECC256'，创建密钥算法为ECC、密钥长度为256位的非对称密钥生成器（AsyKeyGenerator）。
3. 调用[AsyKeyGenerator.convertKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkey-3)，传入公钥二进制和私钥二进制，生成非对称密钥对象（KeyPair）。

* 使用callback方式生成ECC密钥对：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. function convertEccAsyKey() {
  4. let pubKeyArray = new Uint8Array([48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7, 3, 66, 0, 4, 83, 96, 142, 9, 86, 214, 126, 106, 247, 233, 92, 125, 4, 128, 138, 105, 246, 162, 215, 71, 81, 58, 202, 121, 26, 105, 211, 55, 130, 45, 236, 143, 55, 16, 248, 75, 167, 160, 167, 106, 2, 152, 243, 44, 68, 66, 0, 167, 99, 92, 235, 215, 159, 239, 28, 106, 124, 171, 34, 145, 124, 174, 57, 92]);
  5. let priKeyArray = new Uint8Array([48, 49, 2, 1, 1, 4, 32, 115, 56, 137, 35, 207, 0, 60, 191, 90, 61, 136, 105, 210, 16, 27, 4, 171, 57, 10, 61, 123, 40, 189, 28, 34, 207, 236, 22, 45, 223, 10, 189, 160, 10, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7]);
  6. let pubKeyBlob: cryptoFramework.DataBlob = { data: pubKeyArray };
  7. let priKeyBlob: cryptoFramework.DataBlob = { data: priKeyArray };
  8. let generator = cryptoFramework.createAsyKeyGenerator('ECC256');
  9. generator.convertKey(pubKeyBlob, priKeyBlob, (error, data) => {
  10. if (error) {
  11. console.error(`convertKey failed, ${error.code}, ${error.message}`);
  12. return;
  13. }
  14. console.info('convertKey success');
  15. });
  16. }
  ```
* 同步返回结果（调用[convertKeySync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkeysync12)）：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. function convertECCAsyKeySync() {
  4. let pubKeyArray = new Uint8Array([48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7, 3, 66, 0, 4, 83, 96, 142, 9, 86, 214, 126, 106, 247, 233, 92, 125, 4, 128, 138, 105, 246, 162, 215, 71, 81, 58, 202, 121, 26, 105, 211, 55, 130, 45, 236, 143, 55, 16, 248, 75, 167, 160, 167, 106, 2, 152, 243, 44, 68, 66, 0, 167, 99, 92, 235, 215, 159, 239, 28, 106, 124, 171, 34, 145, 124, 174, 57, 92]);
  5. let priKeyArray = new Uint8Array([48, 49, 2, 1, 1, 4, 32, 115, 56, 137, 35, 207, 0, 60, 191, 90, 61, 136, 105, 210, 16, 27, 4, 171, 57, 10, 61, 123, 40, 189, 28, 34, 207, 236, 22, 45, 223, 10, 189, 160, 10, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7]);
  6. let pubKeyBlob: cryptoFramework.DataBlob = { data: pubKeyArray };
  7. let priKeyBlob: cryptoFramework.DataBlob = { data: priKeyArray };
  8. let generator = cryptoFramework.createAsyKeyGenerator('ECC256');
  9. try {
  10. let keyPair = generator.convertKeySync(pubKeyBlob, priKeyBlob);
  11. if (keyPair !== null) {
  12. console.info('convertKeySync success');
  13. }
  14. } catch (e) {
  15. console.error(`get key pair failed, ${e.code}, ${e.message}`);
  16. }
  17. }
  ```

## 指定PKCS8二进制数据转换ECC私钥

查看[非对称密钥生成和转换规格：ECC](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#ecc)。

获取ECC公钥或私钥二进制数据，封装成[DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#datablob)对象再转为ECC密钥格式。示例如下：

1. 调用[cryptoFramework.createAsyKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygenerator)，指定字符串参数'ECC256'，创建密钥算法为ECC、密钥长度为256位的非对称密钥生成器（AsyKeyGenerator）。
2. 调用[PubKey.getEncoded](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getencoded)获取公钥数据字节流，调用[PriKey.getEncodedDer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getencodedder12-1) 并设置参数为'PKCS8'，获取私钥数据的字节流。由此分别获取密钥对象的二进制数据。
3. 调用[AsyKeyGenerator.convertKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkey-3)，将生成的二进制密钥数据转为非对称密钥对象（KeyPair）。

收起

自动换行

深色代码主题

复制

```
1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

3. async function main() {
4. // 创建一个AsyKeyGenerator实例。
5. let eccGenerator = cryptoFramework.createAsyKeyGenerator('ECC256');
6. // 使用密钥生成器随机生成非对称密钥对。
7. let keyGenPromise = eccGenerator.generateKeyPair();
8. keyGenPromise.then(keyPair => {
9. let pubKey = keyPair.pubKey;
10. let priKey = keyPair.priKey;
11. // 获取非对称密钥对ECC的二进制数据。
12. let pubBlob = pubKey.getEncoded();
13. let skBlob = priKey.getEncodedDer('PKCS8');
14. let generator = cryptoFramework.createAsyKeyGenerator('ECC256');
15. generator.convertKey(pubBlob, skBlob, (error, data) => {
16. if (error) {
17. console.error(`convertKey failed, ${error.code}, ${error.message}`);
18. return;
19. }
20. console.info('convertKey success');
21. });
22. });
23. }
```

## 指定二进制数据转换SM2密钥对

查看[非对称密钥生成和转换规格：SM2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#sm2)。

1. 获取SM2公钥或私钥的二进制数据，封装成[DataBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#datablob)对象。

   公钥和私钥可以只传入其中一个，示例以传入公钥和私钥为例。
2. 调用[cryptoFramework.createAsyKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygenerator)，指定字符串参数'SM2\_256'，创建密钥算法为SM2、密钥长度为256位的非对称密钥生成器（AsyKeyGenerator）。
3. 调用[AsyKeyGenerator.convertKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkey-3)，传入公钥和私钥的二进制数据，生成非对称密钥对象（KeyPair）。

* 以使用callback方式生成SM2密钥对为例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. function convertSM2AsyKey() {
  4. let pubKeyArray = new Uint8Array([48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 129, 28, 207, 85, 1, 130, 45, 3, 66, 0, 4, 90, 3, 58, 157, 190, 248, 76, 7, 132, 200, 151, 208, 112, 230, 96, 140, 90, 238, 211, 155, 128, 109, 248, 40, 83, 214, 78, 42, 104, 106, 55, 148, 249, 35, 61, 32, 221, 135, 143, 100, 45, 97, 194, 176, 52, 73, 136, 174, 40, 70, 70, 34, 103, 103, 161, 99, 27, 187, 13, 187, 109, 244, 13, 7]);
  5. let priKeyArray = new Uint8Array([48, 49, 2, 1, 1, 4, 32, 54, 41, 239, 240, 63, 188, 134, 113, 31, 102, 149, 203, 245, 89, 15, 15, 47, 202, 170, 60, 38, 154, 28, 169, 189, 100, 251, 76, 112, 223, 156, 159, 160, 10, 6, 8, 42, 129, 28, 207, 85, 1, 130, 45]);
  6. let pubKeyBlob: cryptoFramework.DataBlob = { data: pubKeyArray };
  7. let priKeyBlob: cryptoFramework.DataBlob = { data: priKeyArray };
  8. let generator = cryptoFramework.createAsyKeyGenerator('SM2_256');
  9. generator.convertKey(pubKeyBlob, priKeyBlob, (error, data) => {
  10. if (error) {
  11. console.error(`convertKey failed, ${error.code}, ${error.message}`);
  12. return;
  13. }
  14. console.info('convertKey success');
  15. });
  16. }
  ```
* 同步返回结果（调用方法[convertKeySync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkeysync12)）：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. function convertSM2AsyKeySync() {
  4. let pubKeyArray = new Uint8Array([48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 129, 28, 207, 85, 1, 130, 45, 3, 66, 0, 4, 90, 3, 58, 157, 190, 248, 76, 7, 132, 200, 151, 208, 112, 230, 96, 140, 90, 238, 211, 155, 128, 109, 248, 40, 83, 214, 78, 42, 104, 106, 55, 148, 249, 35, 61, 32, 221, 135, 143, 100, 45, 97, 194, 176, 52, 73, 136, 174, 40, 70, 70, 34, 103, 103, 161, 99, 27, 187, 13, 187, 109, 244, 13, 7]);
  5. let priKeyArray = new Uint8Array([48, 49, 2, 1, 1, 4, 32, 54, 41, 239, 240, 63, 188, 134, 113, 31, 102, 149, 203, 245, 89, 15, 15, 47, 202, 170, 60, 38, 154, 28, 169, 189, 100, 251, 76, 112, 223, 156, 159, 160, 10, 6, 8, 42, 129, 28, 207, 85, 1, 130, 45]);
  6. let pubKeyBlob: cryptoFramework.DataBlob = { data: pubKeyArray };
  7. let priKeyBlob: cryptoFramework.DataBlob = { data: priKeyArray };
  8. let generator = cryptoFramework.createAsyKeyGenerator('SM2_256');
  9. try {
  10. let keyPair = generator.convertKeySync(pubKeyBlob, priKeyBlob);
  11. if (keyPair !== null) {
  12. console.info('convertKeySync success');
  13. }
  14. } catch (e) {
  15. console.error(`get key pair failed, ${e.code}, ${e.message}`);
  16. }
  17. }
  ```