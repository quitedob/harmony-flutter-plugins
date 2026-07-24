如不涉及身份验证服务接入，可跳过该章节。

## 开启用户身份验证服务权限开关

开发者可登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，在“项目设置 > 开放能力管理”的“鸿蒙支付服务”中开启身份验证服务相关权限开关。

说明

开启身份验证服务相关权限开关时，开发者需签署一份“开发者协议”，开发者同意协议并提交申请资料后需要等待审核（审核周期一般在1-3个工作日）通过后才能使用相关服务。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/22/v3/DUSBPSvZS4m8nCX1by6TeQ/zh-cn_image_0000002453009317.png?HW-CC-KV=V1&HW-CC-Date=20260414T032035Z&HW-CC-Expire=86400&HW-CC-Sign=8A2A50CA78E1D4A4134407B4EB7712744CFCBC38452447650975E44AEE9085E3 "点击放大")

## 上传开发者公钥及下载华为公钥

开发者可登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，在“鸿蒙支付服务 > 身份验证服务”菜单中的“公钥管理”页签下完成开发者证书的上传以及华为公钥证书下载。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c1/v3/e-Ynjv-bSou9jEPlKuOIiQ/zh-cn_image_0000002453169201.png?HW-CC-KV=V1&HW-CC-Date=20260414T032035Z&HW-CC-Expire=86400&HW-CC-Sign=708BE437F7754E4681C4CABC7B0C16A5AD0020AFA2FEDEFBCC33FBA77F1870B2 "点击放大")

证书使用如图所示：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/85/v3/-hD17sAdTO-kW7HqCTeZqg/zh-cn_image_0000002489353805.png?HW-CC-KV=V1&HW-CC-Date=20260414T032035Z&HW-CC-Expire=86400&HW-CC-Sign=BBCC6472C7CCE1D81F938FA075863590566A6CF8F5888860C3CC182905C084EB "点击放大")

证书说明如下：

展开

| 证书 | 获取方式 | 内容说明及使用场景 |
| --- | --- | --- |
| **华为加密公钥** | [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)的“鸿蒙支付服务>身份验证服务>公钥管理”下载 | 华为支付服务器使用SM2加密算法生成的证书公钥。  **使用场景：**开发者可用对应的公钥证书对请求开放API接口的隐私字段进行加密，华为支付服务器使用配对的私钥证书对隐私字段进行解密。 |
| **华为签名公钥** | [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)的“鸿蒙支付服务>身份验证服务>公钥管理”下载 | 华为支付服务器使用SM2加密算法生成的证书公钥。  **使用场景：**华为支付服务器使用配对的私钥证书对响应报文进行加签， 开发者用于对开放API接口响应报文验签使用，具体验签方式请参见[验签规则](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-rest-overview#section17670192215175)。 |
| **开发者公钥**（**加密**） | 开发者生成 | 开发者使用SM2加密算法生成的证书公钥。需登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，在“鸿蒙支付服务>身份验证服务>公钥管理”上传（公钥类型为加密）。  **使用场景：**开发者上传后生成证书Id（developerEncKeyId），开发者请求开放API接口时可通过[PayDevAuth](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-model#section1552810310615)请求头传递，指定给华为支付服务器用于对开放API接口响应的隐私字段加密。 |
| **开发者公钥****（签名）** | 开发者生成 | 开发者使用SM2加密算法生成的证书公钥。需登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，在“鸿蒙支付服务>身份验证服务>公钥管理”上传（公钥类型为签名）。  **使用场景：**开发者上传后生成证书Id（developerSignKeyId），开发者请求开放API接口时可通过[PayDevAuth](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-model#section1552810310615)请求头传递，指定给华为支付服务器用于对开放API接口请求报文进行验签。 |

* SM2公私钥对生成示例代码参考如下：

注意

* 只支持ASN.1格式的SM2公私钥对（以下示例代码为服务端生成示例）。如需在应用端生成ASN.1格式SM2公私钥对（公钥91字节，私钥51字节）可参考：
  1. [随机生成非对称密钥对(ArkTS)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-generate-asym-key-pair-randomly)（应用端生成的公私钥对可能无法在服务端使用）。
  2. 参考[数据编码格式差异](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-cross-platform-compatibility#section1152116421582)将生成的秘钥对转成16进制hex格式。
* 生成的SM2公私钥对，还请先自测验证加解密是否正常，正常后再正式对外使用，避免生成错误的公私钥对，阻塞后续业务进度。

收起

自动换行

深色代码主题

复制

```
1. import org.bouncycastle.jce.provider.BouncyCastleProvider;
2. import org.bouncycastle.util.encoders.Hex;
3. import org.junit.Test;
4. import java.security.KeyPair;
5. import java.security.KeyPairGenerator;
6. import java.security.SecureRandom;
7. import java.security.spec.ECGenParameterSpec;
8. import java.util.HashMap;
9. public class GenerateSm2KeyPairTest2 {
10. public static void main(String[] args) {
11. try {
12. // 获取sm2公私钥
13. String jsonObject = getSm2SecretKey();
14. // 可打印生成公私钥信息，例如：log.info(jsonObject);
15. } catch (Exception e) {
16. e.printStackTrace();
17. }
18. }
19. /**
20. * 生成SM2的ASN.1格式的公私钥
21. *
22. * @return SM2的ASN.1格式的公私钥
23. */
24. public static String getSm2SecretKey() {
25. try {
26. KeyPair keyPair = generateSm2KeyPair();
27. String privateKeyStr = Hex.toHexString(keyPair.getPrivate().getEncoded());
28. String publicKeyStr = Hex.toHexString(keyPair.getPublic().getEncoded());
29. HashMap<String, String> result = new HashMap<>();
30. result.put("Sm2PrivateKey", privateKeyStr);
31. result.put("Sm2PublicKey", publicKeyStr);
32. return result.toString();
33. } catch (Exception e) {
34. return null;
35. }
36. }
37. /**
38. * SM2算法生成ASN.1格式的公私钥对
39. *
40. * @return 密钥对信息
41. */
42. public static KeyPair generateSm2KeyPair() throws Exception {
43. try {
44. final ECGenParameterSpec sm2Spec = new ECGenParameterSpec("sm2p256v1");
45. // 获取一个椭圆曲线类型的密钥对生成器
46. final KeyPairGenerator kpg = KeyPairGenerator.getInstance("EC", new BouncyCastleProvider());
47. SecureRandom random = new SecureRandom();
48. // 使用SM2的算法区域初始化密钥生成器
49. kpg.initialize(sm2Spec, random);
50. // 获取密钥对
51. KeyPair keyPair = kpg.generateKeyPair();
52. return keyPair;
53. } catch (Exception e) {
54. throw new SecurityException("generateSm2KeyPair failed.");
55. }
56. }
57. }
```

* SM2加密示例代码参考如下：

收起

自动换行

深色代码主题

复制

```
1. // 加密
2. import org.bouncycastle.asn1.ASN1ObjectIdentifier;
3. import org.bouncycastle.asn1.gm.GMNamedCurves;
4. import org.bouncycastle.asn1.x509.AlgorithmIdentifier;
5. import org.bouncycastle.asn1.x509.SubjectPublicKeyInfo;
6. import org.bouncycastle.asn1.x9.X9ECParameters;
7. import org.bouncycastle.asn1.x9.X9ObjectIdentifiers;
8. import org.bouncycastle.crypto.engines.SM2Engine;
9. import org.bouncycastle.crypto.params.ECDomainParameters;
10. import org.bouncycastle.crypto.params.ECPublicKeyParameters;
11. import org.bouncycastle.crypto.params.ParametersWithRandom;
12. import org.bouncycastle.math.ec.ECPoint;
13. import org.bouncycastle.util.encoders.Hex;
14. import java.nio.charset.StandardCharsets;
15. import java.security.SecureRandom;

17. public class SM2EncTest {
18. public static void main(String[] args) {
19. encrypt("16进制编码的SM2公钥", "待加密数据");
20. }
21. public static String encrypt(String pubKey, String data) {
22. SM2Engine sm2Engine = new SM2Engine(SM2Engine.Mode.C1C3C2);
23. if (data == null || data.isEmpty()) {
24. return data;
25. }
26. byte[] in = data.getBytes(StandardCharsets.UTF_8);
27. return Hex.toHexString(encrypt(pubKey, in, sm2Engine));
28. }
29. private static byte[] encrypt(String pubKey, byte[] in, SM2Engine sm2Engine) {
30. try {
31. byte[] bPubKey = Hex.decode(pubKey);
32. byte[] coding = getCoding(bPubKey);
33. X9ECParameters x9ECParameters = GMNamedCurves.getByName("sm2p256v1");
34. ECDomainParameters ecDomainParameters = new ECDomainParameters(x9ECParameters.getCurve(),
35. x9ECParameters.getG(), x9ECParameters.getN());
36. ECPoint pukPoint = x9ECParameters.getCurve().decodePoint(coding);
37. ECPublicKeyParameters publicKeyParameters = new ECPublicKeyParameters(pukPoint, ecDomainParameters);
38. sm2Engine.init(true, new ParametersWithRandom(publicKeyParameters, new SecureRandom()));
39. return sm2Engine.processBlock(in, 0, in.length);
40. } catch (Exception var7) {
41. throw new SecurityException(var7);
42. }
43. }
44. private static byte[] getCoding(byte[] publicKey) {
45. if (publicKey.length != 64 && publicKey.length != 65) {
46. AlgorithmIdentifier aid = new AlgorithmIdentifier(
47. X9ObjectIdentifiers.id_ecPublicKey, new ASN1ObjectIdentifier("1.2.156.10197.1.301"));
48. SubjectPublicKeyInfo info = SubjectPublicKeyInfo.getInstance(publicKey);
49. if (!aid.equals(info.getAlgorithm())) {
50. throw new SecurityException("encoded not valid");
51. } else {
52. byte[] coding = info.getPublicKeyData().getBytes();
53. if (coding.length != 65) {
54. throw new SecurityException("encoded not valid");
55. } else {
56. return coding;
57. }
58. }
59. } else {
60. if (publicKey.length == 64) {
61. byte[] bytes = new byte[65];
62. bytes[0] = 4;
63. System.arraycopy(publicKey, 0, bytes, 1, 64);
64. publicKey = bytes;
65. }
66. return (byte[])publicKey.clone();
67. }
68. }
69. }
```

* SM2解密示例代码参考如下：

收起

自动换行

深色代码主题

复制

```
1. // 解密
2. import org.bouncycastle.asn1.ASN1Integer;
3. import org.bouncycastle.asn1.ASN1OctetString;
4. import org.bouncycastle.asn1.ASN1Primitive;
5. import org.bouncycastle.asn1.ASN1Sequence;
6. import org.bouncycastle.asn1.ASN1Set;
7. import org.bouncycastle.asn1.ASN1TaggedObject;
8. import org.bouncycastle.asn1.gm.GMNamedCurves;
9. import org.bouncycastle.asn1.sec.ECPrivateKey;
10. import org.bouncycastle.asn1.x509.AlgorithmIdentifier;
11. import org.bouncycastle.asn1.x9.X9ECParameters;
12. import org.bouncycastle.crypto.engines.SM2Engine;
13. import org.bouncycastle.crypto.params.ECDomainParameters;
14. import org.bouncycastle.crypto.params.ECPrivateKeyParameters;
15. import org.bouncycastle.util.encoders.Hex;

17. import java.io.IOException;
18. import java.math.BigInteger;
19. import java.nio.charset.StandardCharsets;
20. import java.util.Enumeration;

22. public class SM2DecTest {
23. public static void main(String[] args) {
24. String data = decrypt("16进制编码解密私钥", "密文");
25. System.out.println(data);
26. }

28. private static String decrypt(String priKey, String cipherData) {
29. SM2Engine sm2Engine = new SM2Engine(SM2Engine.Mode.C1C3C2);
30. if (cipherData == null || cipherData.isEmpty()) {
31. throw new SecurityException("cipher data is empty when decrypt data");
32. }
33. if (priKey == null || priKey.isEmpty()) {
34. throw new SecurityException("pri key is empty when decrypt data");
35. }
36. try {
37. X9ECParameters x9ECParameters = GMNamedCurves.getByName("sm2p256v1");
38. ECDomainParameters ecDomainParameters = new ECDomainParameters(x9ECParameters.getCurve(),
39. x9ECParameters.getG(), x9ECParameters.getN());
40. byte[] bPriKey = Hex.decode(priKey);
41. byte[] enContent = Hex.decode(cipherData);
42. BigInteger privateKeyD;
43. if (bPriKey.length != 32 && bPriKey.length != 33) {
44. privateKeyD = getDInt(bPriKey);
45. } else {
46. privateKeyD = new BigInteger(bPriKey);
47. }
48. ECPrivateKeyParameters privateKeyParameters = new ECPrivateKeyParameters(privateKeyD, ecDomainParameters);
49. sm2Engine.init(false, privateKeyParameters);
50. return new String(sm2Engine.processBlock(enContent, 0, enContent.length), StandardCharsets.UTF_8);
51. } catch (Exception var7) {
52. throw new SecurityException(var7);
53. }
54. }

56. private static BigInteger getDInt(byte[] bytesKey) throws IOException {
57. ASN1Sequence sequence = ASN1Sequence.getInstance(bytesKey);
58. Enumeration e = sequence.getObjects();
59. BigInteger version = ((ASN1Integer)e.nextElement()).getValue();
60. if (version.intValue() != 0) {
61. throw new IllegalArgumentException("wrong version for private key info");
62. }
63. AlgorithmIdentifier algId = AlgorithmIdentifier.getInstance(e.nextElement());
64. ASN1OctetString privKey = ASN1OctetString.getInstance(e.nextElement());
65. ASN1Set attributes;
66. if (e.hasMoreElements()) {
67. attributes= ASN1Set.getInstance((ASN1TaggedObject) e.nextElement(), false);
68. }
69. ASN1Primitive primitive = ASN1Primitive.fromByteArray(privKey.getOctets());
70. ECPrivateKey privateKey = ECPrivateKey.getInstance(primitive);
71. return privateKey.getKey();
72. }
73. }
```