以校验证书是否已吊销为例，完成证书吊销列表对象的创建、解析和校验。若证书已被吊销，将打印被吊销日期。

## 开发步骤

1. 导入[证书算法库框架模块](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert)和[加解密算法库模块](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { cert } from '@kit.DeviceCertificateKit';
   2. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
   ```
2. 基于已有的CRL数据，调用[cert.createX509CRL](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certcreatex509crl11)创建X509证书吊销列表的对象。
3. 解析证书吊销列表信息。

   此处以获取证书吊销列表版本、证书吊销列表类型、证书吊销列表颁发者名称、证书吊销列表对象的字符串类型数据为例，更多字段信息获取接口请查看[API参考文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#x509crl11)。
4. 基于已有公钥信息，创建PublicKey公钥对象。

   具体可参考[加解密算法库框架-指定二进制数据生成非对称密钥对](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertkey-3)。
5. 调用[X509CRL.verify](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#verify11)校验签名合法性。
6. 基于已有的X509证书数据，调用[cert.createX509Cert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certcreatex509cert)创建证书对象。
7. 调用[X509CRL.isRevoked](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#isrevoked11)判断X509证书是否已被吊销。
8. 调用[X509CRL.getRevokedCert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#getrevokedcert11)获取被吊销证书对象。
9. 调用[X509CRLEntry.getRevocationDate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#getrevocationdate11)获取被吊销日期。

收起

自动换行

深色代码主题

复制

```
1. import { cert } from '@kit.DeviceCertificateKit';
2. import { cryptoFramework } from '@kit.CryptoArchitectureKit';
3. import { BusinessError } from '@kit.BasicServicesKit';
4. import { util } from '@kit.ArkTS';

6. // CRL数据，以下只是一个示例，需要根据具体业务来赋值。
7. let crlData = '-----BEGIN X509 CRL-----\n' +
8. 'MIIByzCBtAIBATANBgkqhkiG9w0BAQsFADBXMQswCQYDVQQGEwJDTjEPMA0GA1UE\n' +
9. 'CAwG6ZmV6KW/MQ8wDQYDVQQHDAbopb/lrokxDzANBgNVBAoMBua1i+ivlTEVMBMG\n' +
10. 'A1UEAwwM5Lit5paH5rWL6K+VFw0yNTAyMjAwNjEzMTZaFw0yNTAzMjIwNjEzMTZa\n' +
11. 'MBkwFwIGAXKnJjrAFw0yNTAyMjAwNjEzMDNaoA4wDDAKBgNVHRQEAwIBADANBgkq\n' +
12. 'hkiG9w0BAQsFAAOCAQEAt9AZ/B5FQiXnKKBGocKmM5QKeky/3etcI+cAVyD0zfjI\n' +
13. 'r1UrL1aF+49LdZps3zQRqm4RQmo9CwL+KsMZiIMSeWF5Q6LW7BQa08hx5PtdjoOu\n' +
14. '1IWVKAwR5IigpaOwMKRTq1xJ372EiUkDD83AsxEkQoQW0bBvFklGrzglSACeKST+\n' +
15. 'Pn6ywwFyYj34cfRuz3ueqwHRmN/mGzQdet7Ns8JBGWutDzfJsAiPC/TIaafTOocO\n' +
16. 'CHo81Q2rMcqAJj5uXyc1Gq8KfOEqsxo/oDwReghjwrUedJ+9l/cQBr0F8HPV4H8W\n' +
17. '49sYMpseywjp9lxjWt/2nrx1z2yMaivGrVhoFasZvQ==\n' +
18. '-----END X509 CRL-----\n'

20. let certData = '-----BEGIN CERTIFICATE-----\n' +
21. 'MIIDgTCCAmmgAwIBAgIGAXKnJjrAMA0GCSqGSIb3DQEBCwUAMFcxCzAJBgNVBAYT\n' +
22. 'AkNOMQ8wDQYDVQQIDAbpmZXopb8xDzANBgNVBAcMBuilv+WuiTEPMA0GA1UECgwG\n' +
23. '5rWL6K+VMRUwEwYDVQQDDAzkuK3mlofmtYvor5UwHhcNMjUwMjIwMDYwOTUyWhcN\n' +
24. 'MzUwMjE4MDYwOTUyWjBXMQswCQYDVQQGEwJDTjEPMA0GA1UECAwG6ZmV6KW/MQ8w\n' +
25. 'DQYDVQQHDAbopb/lrokxDzANBgNVBAoMBua1i+ivlTEVMBMGA1UEAwwM5Lit5paH\n' +
26. '5rWL6K+VMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2DQpPYN7cJjQ\n' +
27. 'LWLlkP5dD8J/g1xx97t2bFciUOru14IBm9EeX6qkohDSl6kQHwfVSqTfcqdIn9We\n' +
28. '73FiitfDjHc9xxbvBKbCYicCzS/eNl0W9q14FiEB8M9vz4dpKK00KZBcGc1QK2m+\n' +
29. '/N6zw4Tw4wXZ97v6/M+bhY5X0b3qEJlgQNyz7dD0wF7SCuzLL9zbr403KktHMG5Y\n' +
30. 'MzyOBaGOaMuVQFlXMV/E5OWfqbM7n0Pu/cGj+AfkkziWxB+5WFCRP6Pw64LJGo+e\n' +
31. 'uZHgHp07kk6+a2YNnFMcdTsOIWBSpCvC3I612NjpBirn2bFRWqTD++YAuvJQagmM\n' +
32. '+VhIjXD48wIDAQABo1MwUTAdBgNVHQ4EFgQUIN7ulBn89L5HXh9m9JM7rpkvlXUw\n' +
33. 'HwYDVR0jBBgwFoAUIN7ulBn89L5HXh9m9JM7rpkvlXUwDwYDVR0TAQH/BAUwAwEB\n' +
34. '/zANBgkqhkiG9w0BAQsFAAOCAQEAxWNa3LSOR3QOJ+wE1Y/q5zzEPWmWR5OMrRJK\n' +
35. 'juBHhYbzsg3r74fBO3Hw8XggEpHr6SOI1rBpZhciA8D9E8RnM1aJLY53rpBDY5OV\n' +
36. 'wxTFzrjdwIknt13t6ILfGeLye5OAF0S8VPdfDqP9NddNNr/WFKpd3tKoBlG0ObMa\n' +
37. 'LaQvOqObz0MJrjKsyI680nJjFLjLZ6+lEDSg4rsGU+bxEkONerStAPNcN2x9z7O6\n' +
38. 'YJOvhiLjWvr8VRjlMZYVmT9gqCImoo+7JaHbu8jz9mjRxD6fo9I1OvCLNFyFw2sV\n' +
39. 'iYID9UEbT6IWv/kKBdr7Te9+SY6AWxUxO8Hd7HdPKDOCrGrU9A==\n' +
40. '-----END CERTIFICATE-----\n';

42. let pubKeyData = new Uint8Array([
43. 0x30, 0x82, 0x01, 0x22, 0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01,
44. 0x01, 0x05, 0x00, 0x03, 0x82, 0x01, 0x0f, 0x00, 0x30, 0x82, 0x01, 0x0a, 0x02, 0x82, 0x01, 0x01,
45. 0x00, 0xd8, 0x34, 0x29, 0x3d, 0x83, 0x7b, 0x70, 0x98, 0xd0, 0x2d, 0x62, 0xe5, 0x90, 0xfe, 0x5d,
46. 0x0f, 0xc2, 0x7f, 0x83, 0x5c, 0x71, 0xf7, 0xbb, 0x76, 0x6c, 0x57, 0x22, 0x50, 0xea, 0xee, 0xd7,
47. 0x82, 0x01, 0x9b, 0xd1, 0x1e, 0x5f, 0xaa, 0xa4, 0xa2, 0x10, 0xd2, 0x97, 0xa9, 0x10, 0x1f, 0x07,
48. 0xd5, 0x4a, 0xa4, 0xdf, 0x72, 0xa7, 0x48, 0x9f, 0xd5, 0x9e, 0xef, 0x71, 0x62, 0x8a, 0xd7, 0xc3,
49. 0x8c, 0x77, 0x3d, 0xc7, 0x16, 0xef, 0x04, 0xa6, 0xc2, 0x62, 0x27, 0x02, 0xcd, 0x2f, 0xde, 0x36,
50. 0x5d, 0x16, 0xf6, 0xad, 0x78, 0x16, 0x21, 0x01, 0xf0, 0xcf, 0x6f, 0xcf, 0x87, 0x69, 0x28, 0xad,
51. 0x34, 0x29, 0x90, 0x5c, 0x19, 0xcd, 0x50, 0x2b, 0x69, 0xbe, 0xfc, 0xde, 0xb3, 0xc3, 0x84, 0xf0,
52. 0xe3, 0x05, 0xd9, 0xf7, 0xbb, 0xfa, 0xfc, 0xcf, 0x9b, 0x85, 0x8e, 0x57, 0xd1, 0xbd, 0xea, 0x10,
53. 0x99, 0x60, 0x40, 0xdc, 0xb3, 0xed, 0xd0, 0xf4, 0xc0, 0x5e, 0xd2, 0x0a, 0xec, 0xcb, 0x2f, 0xdc,
54. 0xdb, 0xaf, 0x8d, 0x37, 0x2a, 0x4b, 0x47, 0x30, 0x6e, 0x58, 0x33, 0x3c, 0x8e, 0x05, 0xa1, 0x8e,
55. 0x68, 0xcb, 0x95, 0x40, 0x59, 0x57, 0x31, 0x5f, 0xc4, 0xe4, 0xe5, 0x9f, 0xa9, 0xb3, 0x3b, 0x9f,
56. 0x43, 0xee, 0xfd, 0xc1, 0xa3, 0xf8, 0x07, 0xe4, 0x93, 0x38, 0x96, 0xc4, 0x1f, 0xb9, 0x58, 0x50,
57. 0x91, 0x3f, 0xa3, 0xf0, 0xeb, 0x82, 0xc9, 0x1a, 0x8f, 0x9e, 0xb9, 0x91, 0xe0, 0x1e, 0x9d, 0x3b,
58. 0x92, 0x4e, 0xbe, 0x6b, 0x66, 0x0d, 0x9c, 0x53, 0x1c, 0x75, 0x3b, 0x0e, 0x21, 0x60, 0x52, 0xa4,
59. 0x2b, 0xc2, 0xdc, 0x8e, 0xb5, 0xd8, 0xd8, 0xe9, 0x06, 0x2a, 0xe7, 0xd9, 0xb1, 0x51, 0x5a, 0xa4,
60. 0xc3, 0xfb, 0xe6, 0x00, 0xba, 0xf2, 0x50, 0x6a, 0x09, 0x8c, 0xf9, 0x58, 0x48, 0x8d, 0x70, 0xf8,
61. 0xf3, 0x02, 0x03, 0x01, 0x00, 0x01
62. ]);

64. // CRL示例
65. function crlSample(): void {
66. let textEncoder = new util.TextEncoder();
67. let encodingBlob: cert.EncodingBlob = {
68. // 将CRL数据从string转为Uint8Array。
69. data: textEncoder.encodeInto(crlData),
70. // CRL格式，仅支持PEM和DER格式。在这个例子中，CRL用的是PEM格式。
71. encodingFormat: cert.EncodingFormat.FORMAT_PEM
72. };

74. // 创建X509CRL实例。
75. cert.createX509CRL(encodingBlob, (err, x509Crl) => {
76. if (err != null) {
77. // 创建X509CRL实例失败。
78. console.error(`createX509Crl failed, errCode: ${err.code}, errMsg:${err.message} `);
79. return;
80. }
81. // 创建X509CRL实例成功。
82. console.info('createX509CRL success');

84. // 获取CRL的版本。
85. let version = x509Crl.getVersion();
86. // 获取证书吊销列表类型。
87. let revokedType = x509Crl.getType();
88. console.info(`X509 CRL version: ${version}, type :${revokedType}`);

90. // 获取证书吊销列表颁发者名称。
91. let issuerName = x509Crl.getIssuerName(cert.EncodingType.ENCODING_UTF8);
92. console.info(`X509 CRL issuerName: ${issuerName}`);

94. // 获取证书吊销列表对象的字符串类型数据。
95. let crlString = x509Crl.toString(cert.EncodingType.ENCODING_UTF8);
96. console.info(`X509 CRL crlString: ${crlString}`);


99. // 公钥的二进制数据需要传入@ohos.security.cryptoFramework的convertKey()方法去获取公钥对象。
100. try {
101. let keyGenerator = cryptoFramework.createAsyKeyGenerator('RSA1024|PRIMES_3');
102. console.info('createAsyKeyGenerator success');
103. let pubEncodingBlob: cryptoFramework.DataBlob = {
104. data: pubKeyData,
105. };
106. keyGenerator.convertKey(pubEncodingBlob, null, (e, keyPair) => {
107. if (e == null) {
108. console.info('convert key success');
109. x509Crl.verify(keyPair.pubKey, (err, data) => {
110. if (err == null) {
111. // 签名验证成功。
112. console.info('verify success');
113. } else {
114. // 签名验证失败。
115. console.error(`verify failed, errCode: ${err.code}, errMsg: ${err.message}`);
116. }
117. });
118. } else {
119. console.error(`convert key failed, message: ${e.message}, code: ${e.code} `);
120. }
121. })
122. } catch (error) {
123. let e: BusinessError = error as BusinessError;
124. console.error(`get pubKey failed, errCode: ${e.code}, errMsg: ${e.message}` );
125. }

127. // 使用certFramework的createX509Cert()方法创建一个X509Cert实例。
128. let certBlob: cert.EncodingBlob = {
129. data: textEncoder.encodeInto(certData),
130. encodingFormat: cert.EncodingFormat.FORMAT_PEM
131. };
132. let revokedFlag = true;
133. let serial:bigint = BigInt('0');
134. cert.createX509Cert(certBlob, (err, cert) => {
135. serial = cert.getCertSerialNumber();
136. if (err == null) {
137. try {
138. // 检查证书是否被吊销。
139. revokedFlag = x509Crl.isRevoked(cert);
140. console.info(`revokedFlag is: ${revokedFlag}`);
141. if (!revokedFlag) {
142. console.info('the given cert is not revoked.');
143. return;
144. }
145. // 根据序列号来获取被吊销的证书。
146. try {
147. let crlEntry = x509Crl.getRevokedCert(serial);
148. console.info('get getRevokedCert success');
149. let serialNumber = crlEntry.getSerialNumber();
150. console.info(`crlEntry serialNumber is: ${serialNumber}`);

152. // 获取被吊销证书的吊销日期。
153. let date = crlEntry.getRevocationDate();
154. console.info(`revocation date is: ${date}`);
155. } catch (error) {
156. let e: BusinessError = error as BusinessError;
157. console.error(`getRevokedCert failed, errCode: ${e.code}, errMsg: ${e.message}`);
158. }
159. } catch (error) {
160. let e: BusinessError = error as BusinessError;
161. console.error(`isRevoked failed, errCode: ${e.code}, errMsg:${e.message}`);
162. }
163. } else {
164. console.error(`create x509 cert failed, errCode: ${err.code}, errMsg: ${err.message}`);
165. }
166. })

168. });
169. }
```