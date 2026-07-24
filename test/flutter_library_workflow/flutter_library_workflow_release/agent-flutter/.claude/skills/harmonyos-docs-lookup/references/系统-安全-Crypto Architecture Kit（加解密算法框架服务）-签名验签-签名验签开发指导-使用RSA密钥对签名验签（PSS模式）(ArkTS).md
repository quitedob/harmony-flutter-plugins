对应的算法规格请查看[签名验签算法规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-sign-sig-verify-overview#rsa)。

**签名**

1. 调用[cryptoFramework.createAsyKeyGeneratorBySpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygeneratorbyspec10)、[AsyKeyGeneratorBySpec.generateKeyPair](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#generatekeypair10)，指定密钥参数，生成RSA非对称密钥对（KeyPair）。

   如何生成RSA非对称密钥，开发者可参考下文示例，并结合[非对称密钥生成和转换规格：RSA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec#rsa)和[指定密钥参数生成非对称密钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-from-key-spec)理解，参考文档与当前示例可能存在入参差异，请在阅读时注意区分。
2. 调用[cryptoFramework.createSign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreatesign)，指定字符串参数'RSA|PSS|SHA256|MGF1\_SHA256'，创建非对称密钥类型为不带长度的RSA、填充模式为PSS、摘要算法为SHA256、掩码算法为MGF1\_SHA256的Sign实例，用于完成签名操作。
3. 调用[Sign.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-3)，使用私钥（PriKey）初始化Sign实例。
4. 调用[Sign.setSignSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#setsignspec10)，设置签名参数。此处设置盐值的长度（SignSpecItem.PSS\_SALT\_LEN\_NUM）为32字节。在验签时将校验此数据。
5. 调用[Sign.getSignSpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getsignspec10)，获取其他签名参数。
6. 调用[Sign.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-3)，传入待签名的数据。当前单次update长度没有限制，开发者可以根据数据量判断如何调用update。
7. 调用[Sign.sign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#sign-1)，生成数据签名。

**验签**

1. 调用[cryptoFramework.createVerify](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateverify)，指定字符串参数'RSA2048|PSS|SHA256|MGF1\_SHA256'，创建非对称密钥类型为RSA2048、填充模式为PSS、摘要算法为SHA256、掩码算法为MGF1\_SHA256的Verify实例，用于完成验签操作。
2. 调用[Verify.setVerifySpec](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#setverifyspec10)，设置签名参数。需要与签名时设置的保持一致。
3. 调用[Verify.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#init-5)，使用公钥（PubKey）初始化Verify实例。
4. 调用[Verify.update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#update-5)，传入待验证的数据。当前单次update长度没有限制，开发者可以根据数据量判断如何调用update。
5. 调用[Verify.verify](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#verify-1)，对数据进行验签。

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

  31. async function verifyMessagePSS() {
  32. // 完整的明文被拆分为input1和input2。
  33. let plan1 = "This is Sign test plan1";
  34. let plan2 = "This is Sign test plan2";
  35. let input1: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(plan1, 'utf-8').buffer) };
  36. let input2: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(plan2, 'utf-8').buffer) };
  37. // 获得RSA密钥对密钥参数对象。
  38. let rsaKeyPairSpec = genRsa2048KeyPairSpec();
  39. // 构造RSA密钥对生成器。
  40. let rsaGeneratorSpec = cryptoFramework.createAsyKeyGeneratorBySpec(rsaKeyPairSpec);
  41. // sign和verify均支持RSA密钥带长度/不带长度的写法。
  42. let signer = cryptoFramework.createSign("RSA|PSS|SHA256|MGF1_SHA256");
  43. let verifier = cryptoFramework.createVerify("RSA2048|PSS|SHA256|MGF1_SHA256");
  44. let keyPair = await rsaGeneratorSpec.generateKeyPair();
  45. await signer.init(keyPair.priKey);
  46. // 在签名初始化后，对PSS参数进行set和get操作。
  47. let setN = 32;
  48. signer.setSignSpec(cryptoFramework.SignSpecItem.PSS_SALT_LEN_NUM, setN);
  49. let saltLen = signer.getSignSpec(cryptoFramework.SignSpecItem.PSS_SALT_LEN_NUM);
  50. console.info("SaltLen == " + saltLen);
  51. let tf = signer.getSignSpec(cryptoFramework.SignSpecItem.PSS_TRAILER_FIELD_NUM);
  52. console.info("trailer field == " + tf);
  53. let md = signer.getSignSpec(cryptoFramework.SignSpecItem.PSS_MD_NAME_STR);
  54. console.info("md == " + md);
  55. let mgf = signer.getSignSpec(cryptoFramework.SignSpecItem.PSS_MGF_NAME_STR);
  56. console.info("mgf == " + mgf);
  57. let mgf1Md = signer.getSignSpec(cryptoFramework.SignSpecItem.PSS_MGF1_MD_STR);
  58. console.info("mgf1Md == " + mgf1Md);
  59. await signer.update(input1);
  60. let signMessageBlob = await signer.sign(input2);
  61. // 在验签初始化前，对PSS参数进行set和get操作。
  62. verifier.setVerifySpec(cryptoFramework.SignSpecItem.PSS_SALT_LEN_NUM, setN);
  63. saltLen = verifier.getVerifySpec(cryptoFramework.SignSpecItem.PSS_SALT_LEN_NUM);
  64. console.info("SaltLen == " + saltLen);
  65. tf = verifier.getVerifySpec(cryptoFramework.SignSpecItem.PSS_TRAILER_FIELD_NUM);
  66. console.info("trailer field == " + tf);
  67. md = verifier.getVerifySpec(cryptoFramework.SignSpecItem.PSS_MD_NAME_STR);
  68. console.info("md == " + md);
  69. mgf = verifier.getVerifySpec(cryptoFramework.SignSpecItem.PSS_MGF_NAME_STR);
  70. console.info("mgf == " + mgf);
  71. mgf1Md = verifier.getVerifySpec(cryptoFramework.SignSpecItem.PSS_MGF1_MD_STR);
  72. await verifier.init(keyPair.pubKey);
  73. await verifier.update(input1);
  74. let verifyResult = await verifier.verify(input2, signMessageBlob);
  75. if (verifyResult === true) {
  76. console.info('verify success');
  77. } else {
  78. console.error('verify failed');
  79. }
  80. }
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

  31. function verifyMessagePSS() {
  32. // 完整的明文被拆分为input1和input2。
  33. let plan1 = "This is Sign test plan1";
  34. let plan2 = "This is Sign test plan2";
  35. let input1: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(plan1, 'utf-8').buffer) };
  36. let input2: cryptoFramework.DataBlob = { data: new Uint8Array(buffer.from(plan2, 'utf-8').buffer) };
  37. // 获得RSA密钥对密钥参数对象。
  38. let rsaKeyPairSpec = genRsa2048KeyPairSpec();
  39. // 构造RSA密钥对生成器。
  40. let rsaGeneratorSpec = cryptoFramework.createAsyKeyGeneratorBySpec(rsaKeyPairSpec);
  41. // sign和verify均支持RSA密钥带长度/不带长度的写法。
  42. let signer = cryptoFramework.createSign("RSA|PSS|SHA256|MGF1_SHA256");
  43. let verifier = cryptoFramework.createVerify("RSA2048|PSS|SHA256|MGF1_SHA256");
  44. let keyPair = rsaGeneratorSpec.generateKeyPairSync();
  45. signer.initSync(keyPair.priKey);
  46. // 在签名初始化后，对PSS参数进行set和get操作。
  47. let setN = 32;
  48. signer.setSignSpec(cryptoFramework.SignSpecItem.PSS_SALT_LEN_NUM, setN);
  49. let saltLen = signer.getSignSpec(cryptoFramework.SignSpecItem.PSS_SALT_LEN_NUM);
  50. console.info("SaltLen == " + saltLen);
  51. let tf = signer.getSignSpec(cryptoFramework.SignSpecItem.PSS_TRAILER_FIELD_NUM);
  52. console.info("trailer field == " + tf);
  53. let md = signer.getSignSpec(cryptoFramework.SignSpecItem.PSS_MD_NAME_STR);
  54. console.info("md == " + md);
  55. let mgf = signer.getSignSpec(cryptoFramework.SignSpecItem.PSS_MGF_NAME_STR);
  56. console.info("mgf == " + mgf);
  57. let mgf1Md = signer.getSignSpec(cryptoFramework.SignSpecItem.PSS_MGF1_MD_STR);
  58. console.info("mgf1Md == " + mgf1Md);
  59. signer.updateSync(input1);
  60. let signMessageBlob = signer.signSync(input2);
  61. // 在验签初始化前，对PSS参数进行set和get操作。
  62. verifier.setVerifySpec(cryptoFramework.SignSpecItem.PSS_SALT_LEN_NUM, setN);
  63. saltLen = verifier.getVerifySpec(cryptoFramework.SignSpecItem.PSS_SALT_LEN_NUM);
  64. console.info("SaltLen == " + saltLen);
  65. tf = verifier.getVerifySpec(cryptoFramework.SignSpecItem.PSS_TRAILER_FIELD_NUM);
  66. console.info("trailer field == " + tf);
  67. md = verifier.getVerifySpec(cryptoFramework.SignSpecItem.PSS_MD_NAME_STR);
  68. console.info("md == " + md);
  69. mgf = verifier.getVerifySpec(cryptoFramework.SignSpecItem.PSS_MGF_NAME_STR);
  70. console.info("mgf == " + mgf);
  71. mgf1Md = verifier.getVerifySpec(cryptoFramework.SignSpecItem.PSS_MGF1_MD_STR);
  72. verifier.initSync(keyPair.pubKey);
  73. verifier.updateSync(input1);
  74. let verifyResult = verifier.verifySync(input2, signMessageBlob);
  75. if (verifyResult === true) {
  76. console.info('verify success');
  77. } else {
  78. console.error('verify failed');
  79. }
  80. }
  ```