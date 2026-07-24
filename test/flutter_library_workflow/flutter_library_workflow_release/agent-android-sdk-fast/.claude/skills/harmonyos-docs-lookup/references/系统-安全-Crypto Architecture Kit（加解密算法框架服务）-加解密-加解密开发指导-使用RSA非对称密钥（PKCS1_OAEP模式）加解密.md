对应的算法规格请查看[非对称密钥加解密算法规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-encrypt-decrypt-spec#rsa)。

**加密**

1. 调用[cryptoFramework.createAsyKeyGeneratorBySpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygeneratorbyspec10)、[AsyKeyGeneratorBySpec.generateKeyPair](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatekeypair10)，指定密钥参数，生成RSA非对称密钥对（KeyPair）。

   如何生成RSA非对称密钥对，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#rsa)和[指定密钥参数生成非对称密钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-from-key-spec)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，指定字符串参数'RSA2048|PKCS1\_OAEP|SHA256|MGF1\_SHA1'，创建非对称密钥类型为RSA2048、填充模式为PKCS1\_OAEP、摘要算法为SHA256、掩码摘要为MGF1\_SHA1的RSA密钥的Cipher实例，用于完成加解密操作。
3. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为加密（CryptoMode.ENCRYPT\_MODE），指定加密密钥（KeyPair.PubKey），初始化加密Cipher实例。

   非对称密钥无加密参数，直接传入null。
4. 在调用Cipher.doFinal前，调用[Cipher.setCipherSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#setcipherspec10)设置PKCS1\_OAEP填充参数pSource。调用[Cipher.getCipherSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getcipherspec10)可获得OAEP相关参数。
5. 调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，传入明文，获取加密后的数据。

**解密**

1. 由于RSA算法的Cipher实例不支持重复init操作，需要调用[cryptoFramework.createCipher](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatecipher)，重新生成Cipher实例。
2. 调用[Cipher.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-1)，设置模式为解密（CryptoMode.DECRYPT\_MODE），指定解密密钥（KeyPair.PriKey）初始化解密Cipher实例。PKCS1模式无加密参数，直接传入null。
3. 在调用Cipher.doFinal前，调用[Cipher.setCipherSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#setcipherspec10)设置PKCS1\_OAEP填充参数pSource，此处需要和加密时设置的保持一致。调用[Cipher.getCipherSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getcipherspec10)可获得OAEP相关参数。
4. 调用[Cipher.doFinal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#dofinal-1)，传入密文，获取解密后的数据。

* 异步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. // 根据密钥参数属性构造RSA非对称密钥对密钥参数。
  5. function genRsaKeyPairSpec(nIn: bigint, eIn: bigint, dIn: bigint) {
  6. let rsaCommSpec: cryptoFramework.RSACommonParamsSpec = {
  7. n: nIn,
  8. algName: "RSA",
  9. specType: cryptoFramework.AsyKeySpecType.COMMON_PARAMS_SPEC
  10. };
  11. let rsaKeyPairSpec: cryptoFramework.RSAKeyPairSpec = {
  12. params: rsaCommSpec,
  13. sk: dIn,
  14. pk: eIn,
  15. algName: "RSA",
  16. specType: cryptoFramework.AsyKeySpecType.KEY_PAIR_SPEC
  17. };
  18. return rsaKeyPairSpec;
  19. }

  21. // 生成RSA2048密钥对参数。
  22. function genRsa2048KeyPairSpec(): cryptoFramework.RSAKeyPairSpec {
  23. let nIn =
  24. BigInt("0x9260d0750ae117eee55c3f3deaba74917521a262ee76007cdf8a56755ad73a1598a1408410a01434c3f5bc54a88b57fa19fc4328daea0750a4c44e88cff3b2382621b80f670464433e4336e6d003e8cd65bff211da144b88291c2259a00a72b711c116ef7686e8fee34e4d933c868187bdc26f7be071493c86f7a5941c3510806ad67b0f94d88f5cf5c02a092821d8626e8932b65c5bd8c92049c210932b7afa7ac59c0e886ae5c1edb00d8ce2c57633db26bd6639bff73cee82be9275c402b4cf2a4388da8cf8c64eefe1c5a0f5ab8057c39fa5c0589c3e253f0960332300f94bea44877b588e1edbde97cf2360727a09b775262d7ee552b3319b9266f05a25");
  25. let eIn = BigInt("0x010001");
  26. let dIn =
  27. BigInt("0x6a7df2ca63ead4dda191d614b6b385e0d9056a3d6d5cfe07db1daabee022db08212d97613d3328e0267c9dd23d787abde2afcb306aeb7dfce69246cc73f5c87fdf06030179a2114b767db1f083ff841c025d7dc00cd82435b9a90f695369e94df23d2ce458bc3b3283ad8bba2b8fa1ba62e2dce9accff3799aae7c840016f3ba8e0048c0b6cc4339af7161003a5beb864a0164b2c1c9237b64bc87556994351b27506c33d4bcdfce0f9c491a7d6b0628c7c852be4f0a9c3132b2ed3a2c8881e9aab07e20e17deb074691be677776a78b5c502e05d9bdde72126b3738695e2dd1a0a98a14247c65d8a7ee79432a092cb0721a12df798e44f7cfce0c498147a9b1");
  28. return genRsaKeyPairSpec(nIn, eIn, dIn);
  29. }

  31. async function rsaUseSpecDecryptOAEPPromise() {
  32. let plan = "This is a test";
  33. // 获得RSA密钥对密钥参数对象。
  34. let rsaKeyPairSpec = genRsa2048KeyPairSpec();
  35. // 根据RSA密钥对参数生成RSA密钥对。
  36. let rsaGeneratorSpec = cryptoFramework.createAsyKeyGeneratorBySpec(rsaKeyPairSpec);
  37. let cipher = cryptoFramework.createCipher("RSA2048|PKCS1_OAEP|SHA256|MGF1_SHA1");
  38. let decoder = cryptoFramework.createCipher("RSA2048|PKCS1_OAEP|SHA256|MGF1_SHA1");
  39. // RSA加解密PKCS1-OAEP模式填充字节流P。
  40. let pSource = new Uint8Array([1, 2, 3, 4]); // 此处为示例，可以是任意值，由开发者自行决定。
  41. let input: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(plan, 'utf-8').buffer) };
  42. // 生成密钥对。
  43. let keyPair = await rsaGeneratorSpec.generateKeyPair();
  44. // 进行加密操作初始化。
  45. await cipher.init(cryptoFramework.CryptoMode.ENCRYPT_MODE, keyPair.pubKey, null);
  46. // get和set操作可以放在Cipher对象init之后，此处对cipher进行set和get操作。
  47. cipher.setCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF1_PSRC_UINT8ARR, pSource);
  48. let retP = cipher.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF1_PSRC_UINT8ARR);
  49. // 比较get出来的P字节流与set进去的P字节流是否一致。
  50. if (retP.toString() !== pSource.toString()) {
  51. console.error("error init pSource" + retP);
  52. } else {
  53. console.info("pSource changed ==" + retP);
  54. }
  55. // 进行OAEP其他参数的get操作。
  56. let md = cipher.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MD_NAME_STR);
  57. console.info("md == " + md);
  58. let mgf = cipher.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF_NAME_STR);
  59. console.info("mgf == " + mgf);
  60. let mgf1Md = cipher.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF1_MD_STR);
  61. console.info("mgf1Md == " + mgf1Md);
  62. let cipherDataBlob = await cipher.doFinal(input);
  63. // get和set操作可以放在Cipher对象init之前，且与init之后等价，此处对decoder进行set和get操作。
  64. decoder.setCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF1_PSRC_UINT8ARR, pSource);
  65. retP = decoder.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF1_PSRC_UINT8ARR);
  66. // 比较get出来的P字节流与set进去的P字节流是否一致。
  67. if (retP.toString() !== pSource.toString()) {
  68. console.error("error init pSource" + retP);
  69. } else {
  70. console.info("pSource changed ==" + retP);
  71. }
  72. // 进行OAEP其他参数的get操作。
  73. md = decoder.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MD_NAME_STR);
  74. console.info("md == " + md);
  75. mgf = decoder.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF_NAME_STR);
  76. console.info("mgf == " + mgf);
  77. mgf1Md = decoder.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF1_MD_STR);
  78. console.info("mgf1Md == " + mgf1Md);
  79. // 初始化解密操作。
  80. await decoder.init(cryptoFramework.CryptoMode.DECRYPT_MODE, keyPair.priKey, null);
  81. let decodeData = await decoder.doFinal(cipherDataBlob);
  82. // 解密成功。
  83. if (decodeData.data.toString() === input.data.toString()) {
  84. console.info("oaep decrypt success");
  85. } else {
  86. console.error("oaep decrypt fail");
  87. }
  88. }
  ```
* 同步方法示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
  2. import { buffer } from '@kit.ArkTS';

  4. // 根据密钥参数属性构造RSA非对称密钥对密钥参数。
  5. function genRsaKeyPairSpec(nIn: bigint, eIn: bigint, dIn: bigint) {
  6. let rsaCommSpec: cryptoFramework.RSACommonParamsSpec = {
  7. n: nIn,
  8. algName: "RSA",
  9. specType: cryptoFramework.AsyKeySpecType.COMMON_PARAMS_SPEC
  10. };
  11. let rsaKeyPairSpec: cryptoFramework.RSAKeyPairSpec = {
  12. params: rsaCommSpec,
  13. sk: dIn,
  14. pk: eIn,
  15. algName: "RSA",
  16. specType: cryptoFramework.AsyKeySpecType.KEY_PAIR_SPEC
  17. };
  18. return rsaKeyPairSpec;
  19. }

  21. // 生成RSA2048密钥对参数。
  22. function genRsa2048KeyPairSpec(): cryptoFramework.RSAKeyPairSpec {
  23. let nIn =
  24. BigInt("0x9260d0750ae117eee55c3f3deaba74917521a262ee76007cdf8a56755ad73a1598a1408410a01434c3f5bc54a88b57fa19fc4328daea0750a4c44e88cff3b2382621b80f670464433e4336e6d003e8cd65bff211da144b88291c2259a00a72b711c116ef7686e8fee34e4d933c868187bdc26f7be071493c86f7a5941c3510806ad67b0f94d88f5cf5c02a092821d8626e8932b65c5bd8c92049c210932b7afa7ac59c0e886ae5c1edb00d8ce2c57633db26bd6639bff73cee82be9275c402b4cf2a4388da8cf8c64eefe1c5a0f5ab8057c39fa5c0589c3e253f0960332300f94bea44877b588e1edbde97cf2360727a09b775262d7ee552b3319b9266f05a25");
  25. let eIn = BigInt("0x010001");
  26. let dIn =
  27. BigInt("0x6a7df2ca63ead4dda191d614b6b385e0d9056a3d6d5cfe07db1daabee022db08212d97613d3328e0267c9dd23d787abde2afcb306aeb7dfce69246cc73f5c87fdf06030179a2114b767db1f083ff841c025d7dc00cd82435b9a90f695369e94df23d2ce458bc3b3283ad8bba2b8fa1ba62e2dce9accff3799aae7c840016f3ba8e0048c0b6cc4339af7161003a5beb864a0164b2c1c9237b64bc87556994351b27506c33d4bcdfce0f9c491a7d6b0628c7c852be4f0a9c3132b2ed3a2c8881e9aab07e20e17deb074691be677776a78b5c502e05d9bdde72126b3738695e2dd1a0a98a14247c65d8a7ee79432a092cb0721a12df798e44f7cfce0c498147a9b1");
  28. return genRsaKeyPairSpec(nIn, eIn, dIn);
  29. }

  31. function main() {
  32. let plan = "This is a test";
  33. // 获得RSA密钥对密钥参数对象。
  34. let rsaKeyPairSpec = genRsa2048KeyPairSpec();
  35. // 根据RSA密钥对参数生成RSA密钥对。
  36. let rsaGeneratorSpec = cryptoFramework.createAsyKeyGeneratorBySpec(rsaKeyPairSpec);
  37. let cipher = cryptoFramework.createCipher("RSA2048|PKCS1_OAEP|SHA256|MGF1_SHA1");
  38. let decoder = cryptoFramework.createCipher("RSA2048|PKCS1_OAEP|SHA256|MGF1_SHA1");
  39. // RSA加解密PKCS1-OAEP模式填充字节流P。
  40. let pSource = new Uint8Array([1, 2, 3, 4]); // 此处为示例，可以是任意值，由开发者自行决定。
  41. let input: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(plan, 'utf-8').buffer) };
  42. // 生成密钥对。
  43. let keyPair = rsaGeneratorSpec.generateKeyPairSync();
  44. // 进行加密操作初始化。
  45. cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, keyPair.pubKey, null);
  46. // get和set操作可以放在Cipher对象init之后，此处对cipher进行set和get操作。
  47. cipher.setCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF1_PSRC_UINT8ARR, pSource);
  48. let retP = cipher.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF1_PSRC_UINT8ARR);
  49. // 比较get出来的P字节流与set进去的P字节流是否一致。
  50. if (retP.toString() !== pSource.toString()) {
  51. console.error("error init pSource" + retP);
  52. } else {
  53. console.info("pSource changed ==" + retP);
  54. }
  55. // 进行OAEP其他参数的get操作。
  56. let md = cipher.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MD_NAME_STR);
  57. console.info("md == " + md);
  58. let mgf = cipher.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF_NAME_STR);
  59. console.info("mgf == " + mgf);
  60. let mgf1Md = cipher.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF1_MD_STR);
  61. console.info("mgf1Md == " + mgf1Md);
  62. let cipherDataBlob = cipher.doFinalSync(input);
  63. // get和set操作可以放在Cipher对象init之前，且与init之后等价，此处对decoder进行set和get操作。
  64. decoder.setCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF1_PSRC_UINT8ARR, pSource);
  65. retP = decoder.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF1_PSRC_UINT8ARR);
  66. // 比较get出来的P字节流与set进去的P字节流是否一致。
  67. if (retP.toString() !== pSource.toString()) {
  68. console.error("error init pSource" + retP);
  69. } else {
  70. console.info("pSource changed ==" + retP);
  71. }
  72. // 进行OAEP其他参数的get操作。
  73. md = decoder.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MD_NAME_STR);
  74. console.info("md == " + md);
  75. mgf = decoder.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF_NAME_STR);
  76. console.info("mgf == " + mgf);
  77. mgf1Md = decoder.getCipherSpec(cryptoFramework.CipherSpecItem.OAEP_MGF1_MD_STR);
  78. console.info("mgf1Md == " + mgf1Md);
  79. // 初始化解密操作。
  80. decoder.initSync(cryptoFramework.CryptoMode.DECRYPT_MODE, keyPair.priKey, null);
  81. let decodeData = decoder.doFinalSync(cipherDataBlob);
  82. // 解密成功。
  83. if (decodeData.data.toString() === input.data.toString()) {
  84. console.info("oaep decrypt success");
  85. } else {
  86. console.error("oaep decrypt fail");
  87. }
  88. }
  ```