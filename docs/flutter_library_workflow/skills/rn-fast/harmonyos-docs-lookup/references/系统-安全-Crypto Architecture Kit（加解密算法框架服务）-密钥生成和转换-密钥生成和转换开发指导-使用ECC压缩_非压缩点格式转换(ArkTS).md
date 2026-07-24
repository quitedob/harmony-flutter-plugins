支持将压缩/非压缩的点数据转换为Point对象，用于密钥对象生成；也支持将Point对象转换为压缩/非压缩的点数据。

ECC的算法规格请查看[非对称密钥生成和转换规格：ECC](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#ecc)。

通过传入字符串参数format，可指定需要获取的点数据格式。如果需要获取压缩格式，则指定format为："COMPRESSED"；需要获取非压缩格式，则指定format为："UNCOMPRESSED"。

## 指定非压缩点数据转换为压缩点数据

1. 指定Uint8Array类型的ECC非压缩点数据，调用[ECCKeyUtil.convertPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertpoint12)，构造[Point](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#point10)对象，用于生成点数据。
2. 调用[ECCKeyUtil.getEncodedPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getencodedpoint12)，获取压缩点数据。

收起

自动换行

深色代码主题

复制

```
1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

3. function eccPointUncompressedToCompressed() {
4. let pkData = new Uint8Array([4, 143, 39, 57, 249, 145, 50, 63, 222, 35, 70, 178, 121, 202, 154, 21, 146, 129, 75, 76, 63, 8, 195, 157, 111, 40, 217, 215, 148, 120, 224, 205, 82, 83, 92, 185, 21, 211, 184, 5, 19, 114, 33, 86, 85, 228, 123, 242, 206, 200, 98, 178, 184, 130, 35, 232, 45, 5, 202, 189, 11, 46, 163, 156, 152]);
5. let returnPoint = cryptoFramework.ECCKeyUtil.convertPoint('NID_brainpoolP256r1', pkData);
6. console.info('convertPoint success');
7. let returnData = cryptoFramework.ECCKeyUtil.getEncodedPoint('NID_brainpoolP256r1', returnPoint, 'COMPRESSED');
8. console.info('returnData: ' + returnData); // (因为y为偶数，所以压缩点数据的前缀是02)returnData: 2,143,39,57,249,145,50,63,222,35,70,178,121,202,154,21,146,129,75,76,63,8,195,157,111,40,217,215,148,120,224,205,82
9. }
```

## 指定压缩点数据获取密钥对象

1. 指定Uint8Array类型的ECC压缩点数据，调用[ECCKeyUtil.convertPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertpoint12)，得到[Point](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#point10)对象，用于密钥对象生成。
2. 调用[ECCKeyUtil.genECCCommonParamsSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#genecccommonparamsspec11)，指定曲线名'NID\_brainpoolP256r1'，生成ECC的非对称公共密钥参数。
3. 构造[ECCPubKeySpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#eccpubkeyspec10)对象，用于指定ECC算法中公钥包含的参数。ECCPubKeySpec是AsyKeySpec的子类。需要通过参数algName指定算法'ECC'；指定密钥参数类型[AsyKeySpecType.PUBLIC\_KEY\_SPEC](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#asykeyspectype10)，参数pk指定为得到的point对象。
4. 通过得到的公钥参数，调用[createAsyKeyGeneratorBySpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygeneratorbyspec10)，创建非对称密钥生成器（AsyKeyGeneratorBySpec）。
5. 调用[AsyKeyGeneratorBySpec.generatePubKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatepubkey10)，得到指定的公钥。
6. 调用[ECCKeyUtil.getEncodedPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getencodedpoint12)，得到非压缩点数据。
7. 调用[PubKey.getAsyKeySpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getasykeyspec10)，获取ECC算法中公钥pk的x坐标。

收起

自动换行

深色代码主题

复制

```
1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

3. async function eccPointCompressedToPoint() {
4. let pkData = new Uint8Array([2, 143, 39, 57, 249, 145, 50, 63, 222, 35, 70, 178, 121, 202, 154, 21, 146, 129, 75, 76, 63, 8, 195, 157, 111, 40, 217, 215, 148, 120, 224, 205, 82]);
5. let returnPoint = cryptoFramework.ECCKeyUtil.convertPoint('NID_brainpoolP256r1', pkData);
6. console.info('convertPoint success');
7. let eccCommonParamsSpec = cryptoFramework.ECCKeyUtil.genECCCommonParamsSpec('NID_brainpoolP256r1');
8. let eccPubKeySpec: cryptoFramework.ECCPubKeySpec = {
9. algName: "ECC",
10. specType: cryptoFramework.AsyKeySpecType.PUBLIC_KEY_SPEC,
11. params: eccCommonParamsSpec,
12. pk: returnPoint
13. };
14. let generatorBySpec = cryptoFramework.createAsyKeyGeneratorBySpec(eccPubKeySpec);
15. let pubKey = await generatorBySpec.generatePubKey();
16. let returnData = cryptoFramework.ECCKeyUtil.getEncodedPoint('NID_brainpoolP256r1', returnPoint, 'UNCOMPRESSED');
17. console.info('returnData: ' + returnData); // 4,143,39,57,249,145,50,63,222,35,70,178,121,202,154,21,146,129,75,76,63,8,195,157,111,40,217,215,148,120,224,205,82,83,92,185,21,211,184,5,19,114,33,86,85,228,123,242,206,200,98,178,184,130,35,232,45,5,202,189,11,46,163,156,152
18. let eccPkX = pubKey.getAsyKeySpec(cryptoFramework.AsyKeySpecItem.ECC_PK_X_BN);
19. console.info('returnPoint x data: ' + returnPoint.x); // 64750044510792891439269945828433327517677381559622384455951527515863444933970
20. console.info('ECC_PK_X_BN: ' + eccPkX); // 64750044510792891439269945828433327517677381559622384455951527515863444933970
21. }
```