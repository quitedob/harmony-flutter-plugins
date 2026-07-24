## 本地证书链吊销状态校验时仅校验终端实体证书

API 22开始支持本地证书链吊销状态校验时仅校验终端实体证书。

### 开发步骤

1. 导入[证书算法库框架模块](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { cert } from '@kit.DeviceCertificateKit';
   ```
2. 调用[cert.createX509CertChain](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certcreatex509certchain11)创建证书链对象。
3. 调用[cert.createX509Cert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certcreatex509cert)创建X509证书对象。
4. 调用[cert.createX509CRL](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certcreatex509crl11)创建X509证书吊销列表对象。
5. 构造[cert.CertChainValidationParameters](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certchainvalidationparameters11)证书链校验参数对象。
6. 调用[cert.validate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#validate11)，传入证书链校验参数，进行证书链校验。

本地仅校验终端实体证书的吊销状态示例：

收起

自动换行

深色代码主题

复制

```
1. import { cert } from '@kit.DeviceCertificateKit';

3. // string转Uint8Array。
4. function stringToUint8Array(str: string): Uint8Array {
5. let arr: number[] = [];
6. for (let i = 0, j = str.length; i < j; i++) {
7. arr.push(str.charCodeAt(i));
8. }
9. return new Uint8Array(arr);
10. }

12. async function createCertChain(certData: string): Promise<cert.X509CertChain> {
13. // 证书二进制数据，需业务自行赋值。
14. let encodingBlob: cert.EncodingBlob = {
15. data: stringToUint8Array(certData),
16. // 根据encodingData的格式进行赋值，支持FORMAT_PEM和FORMAT_DER。
17. encodingFormat: cert.EncodingFormat.FORMAT_PEM
18. };

20. let X509CertChain: cert.X509CertChain = {} as cert.X509CertChain;
21. try {
22. X509CertChain = await cert.createX509CertChain(encodingBlob);
23. } catch (err) {
24. console.error(`createCertChain failed: errCode: ${err.code}, message: ${err.message}`);
25. }
26. return X509CertChain;
27. }
28. async function createCert(certData: string): Promise<cert.X509Cert> {
29. // 证书二进制数据，需业务自行赋值。
30. let encodingBlob: cert.EncodingBlob = {
31. data: stringToUint8Array(certData),
32. // 根据encodingData的格式进行赋值，支持FORMAT_PEM和FORMAT_DER。
33. encodingFormat: cert.EncodingFormat.FORMAT_PEM
34. };

36. let x509Cert: cert.X509Cert = {} as cert.X509Cert;
37. try {
38. x509Cert = await cert.createX509Cert(encodingBlob);
39. } catch (err) {
40. console.error(`createCert failed: errCode: ${err.code}, message: ${err.message}`);
41. }
42. return x509Cert;
43. }
44. export async function createCRL(crmPem: string): Promise<cert.CertCRLCollection> {
45. try {
46. let crlEncodingBlob: cert.EncodingBlob = {
47. data: stringToUint8Array(crmPem),
48. encodingFormat: cert.EncodingFormat.FORMAT_PEM
49. }
50. let crl: cert.X509CRL = await cert.createX509CRL(crlEncodingBlob);
51. let collection: cert.CertCRLCollection = cert.createCertCRLCollection([], [crl]);
52. return collection;
53. } catch (error) {
54. throw error as Error;
55. }
56. }

58. let certChainData =
59. "-----BEGIN CERTIFICATE-----\n"                                      +
60. "MIIC8TCCAlqgAwIBAgIUIUvzWX3AOgQ/QjNel1SBhBtTPBAwDQYJKoZIhvcNAQEL\n" +
61. "BQAwdDELMAkGA1UEBhMCQ04xEDAOBgNVBAgMB0JlaWppbmcxEDAOBgNVBAcMB0Jl\n" +
62. "aWppbmcxGTAXBgNVBAoMEEludGVybWVkaWF0ZTIgQ0ExCzAJBgNVBAsMAklUMRkw\n" +
63. "FwYDVQQDDBBJbnRlcm1lZGlhdGUyIENBMB4XDTI1MDkyNDEwMDIzNVoXDTMwMTAx\n" +
64. "ODEwMDIzNVowbzELMAkGA1UEBhMCQ04xEDAOBgNVBAgMB0JlaWppbmcxEDAOBgNV\n" +
65. "BAcMB0JlaWppbmcxFTATBgNVBAoMDEV4YW1wbGUgQ29ycDELMAkGA1UECwwCSVQx\n" +
66. "GDAWBgNVBAMMD3d3dy5leGFtcGxlLmNvbTCBnzANBgkqhkiG9w0BAQEFAAOBjQAw\n" +
67. "gYkCgYEA4vc1u69q13LMHCvChJDgIpdhXA+ctn9khXD4/lpsaYS5CAnKZzAK74Ip\n" +
68. "/i0WcIwYwuVEpggko0DDplioCnYjU/OEtn0Opxt1f4mn17HvUfeNZDN0X3neF43J\n" +
69. "F5axTNvIJDuHdiLWoWUMK0JtffSUMQ7Fx3MWyAWahDB9NsltkpMCAwEAAaOBhDCB\n" +
70. "gTAJBgNVHRMEAjAAMAsGA1UdDwQEAwIEMDAnBgNVHREEIDAegg93d3cuZXhhbXBs\n" +
71. "ZS5jb22CC2V4YW1wbGUuY29tMB0GA1UdDgQWBBSmwesDcCVKq1s+rzKxsCW08As0\n" +
72. "rzAfBgNVHSMEGDAWgBRI56SWC90zDEsVlYS5LPemujOebzANBgkqhkiG9w0BAQsF\n" +
73. "AAOBgQAhHhPjX5P1PEexyez0eW7DCAo03fxRBhcNjSBBCmiFWeOXvsvZgnDXv/Ky\n" +
74. "5tR88MQ0HX2FAl9n0jo3qdvrMfo1EaT+fp1/PKmoE7y0WJD5JkMsKrKvR/5Gaspm\n" +
75. "KwlxMhYyu7ET8A022NYLx885eBnWI6OOcnqYXnGeCnWWgNiXug==\n"             +
76. "-----END CERTIFICATE-----\n"                                        +
77. "-----BEGIN CERTIFICATE-----\n"                                      +
78. "MIICvDCCAiWgAwIBAgIUECXHZotH6yK5LTTdPFMkY9kZka0wDQYJKoZIhvcNAQEL\n" +
79. "BQAwYjELMAkGA1UEBhMCQ04xEDAOBgNVBAgMB0JlaWppbmcxEDAOBgNVBAcMB0Jl\n" +
80. "aWppbmcxEDAOBgNVBAoMB1Jvb3QgQ0ExCzAJBgNVBAsMAklUMRAwDgYDVQQDDAdS\n" +
81. "b290IENBMB4XDTI1MDkyNDEwMDA0NFoXDTMwMDkyMzEwMDA0NFowdDELMAkGA1UE\n" +
82. "BhMCQ04xEDAOBgNVBAgMB0JlaWppbmcxEDAOBgNVBAcMB0JlaWppbmcxGTAXBgNV\n" +
83. "BAoMEEludGVybWVkaWF0ZTIgQ0ExCzAJBgNVBAsMAklUMRkwFwYDVQQDDBBJbnRl\n" +
84. "cm1lZGlhdGUyIENBMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC94fbVrcDy\n" +
85. "59VyR7/s3D27BPgnod1JzhzDF1QbOQ2N3ZMGBjpxbPtJ7wICK/bRFBNvUwXqJZba\n" +
86. "zBER7y1VGZssrDpAW1CcVlAteyVb0ia2kr7sYRmTpUv5sl3nrZIVCy5SqeBVt19L\n" +
87. "3UYz/ppHOfFoLLyoXYA/Ix3AlzPJWnCmnwIDAQABo10wWzAMBgNVHRMEBTADAQH/\n" +
88. "MAsGA1UdDwQEAwIBBjAdBgNVHQ4EFgQUSOeklgvdMwxLFZWEuSz3proznm8wHwYD\n" +
89. "VR0jBBgwFoAUB1FwqNTM5mqxu5ZbsbayDFf57OAwDQYJKoZIhvcNAQELBQADgYEA\n" +
90. "dQJjyNHJkf7LlucyWJigmE24BasJDm0Il9pfsvNF7ZzlbUNjrEFnXLXG/ZwRavp/\n" +
91. "j5M54cBLOQL02DU0f+YqcPaUmhNqrFq7EVa5VVKZgdQ8f7rOdJVrDhGugfg8zkQo\n" +
92. "lbRUUGJ4JVlIR7ntr0WmG0frmZ+/V/t57sxRKNvGq8M=\n"                     +
93. "-----END CERTIFICATE-----\n"                                        +
94. "-----BEGIN CERTIFICATE-----\n"                                      +
95. "MIICwzCCAiygAwIBAgIUFHmiDZ6lR+Z3+u80U1r9f1CViV0wDQYJKoZIhvcNAQEL\n" +
96. "BQAwYjELMAkGA1UEBhMCQ04xEDAOBgNVBAgMB0JlaWppbmcxEDAOBgNVBAcMB0Jl\n" +
97. "aWppbmcxEDAOBgNVBAoMB1Jvb3QgQ0ExCzAJBgNVBAsMAklUMRAwDgYDVQQDDAdS\n" +
98. "b290IENBMB4XDTI1MDkyNDA5NDgyN1oXDTM1MDkyMjA5NDgyN1owYjELMAkGA1UE\n" +
99. "BhMCQ04xEDAOBgNVBAgMB0JlaWppbmcxEDAOBgNVBAcMB0JlaWppbmcxEDAOBgNV\n" +
100. "BAoMB1Jvb3QgQ0ExCzAJBgNVBAsMAklUMRAwDgYDVQQDDAdSb290IENBMIGfMA0G\n" +
101. "CSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIKZ7fGE1Z+SqdfywoEl9NqQLOiLiHumzD\n" +
102. "JDY1ZWApQpX9098Z2PmvPV6oh84UFEc2nv+yKG1kid2qh9jcm0zNaV2q0AA3t0d8\n" +
103. "WTzjbs4HG4kdcUk5FtLhMVEBTUR0/ii38Y4tJXNmaarGyNbyB85GNqXTpxn9mkBp\n" +
104. "cAEGa4A7BwIDAQABo3YwdDAdBgNVHQ4EFgQUB1FwqNTM5mqxu5ZbsbayDFf57OAw\n" +
105. "HwYDVR0jBBgwFoAUB1FwqNTM5mqxu5ZbsbayDFf57OAwCwYDVR0PBAQDAgEGMAkG\n" +
106. "A1UdEQQCMAAwCQYDVR0SBAIwADAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEB\n" +
107. "CwUAA4GBAEwSMp+Zo4hMxmPp9VmKuvC5ElJCisdghrJxhb6KWVza9temcnAEkshZ\n" +
108. "IRqW4mnstsY5YSuIhPF/oinVCVB7ViRPEb8ZnzxE3Bbka0/ShhE5wjBn75NcCbtD\n" +
109. "WZvp+1vl8LlmRwRe2kr5JvcPw5IpGRq1tunznRpg+/3eEpI+KT3E\n"             +
110. "-----END CERTIFICATE-----";
111. let trustRootCertPem =
112. "-----BEGIN CERTIFICATE-----\n"                                      +
113. "MIICwzCCAiygAwIBAgIUFHmiDZ6lR+Z3+u80U1r9f1CViV0wDQYJKoZIhvcNAQEL\n" +
114. "BQAwYjELMAkGA1UEBhMCQ04xEDAOBgNVBAgMB0JlaWppbmcxEDAOBgNVBAcMB0Jl\n" +
115. "aWppbmcxEDAOBgNVBAoMB1Jvb3QgQ0ExCzAJBgNVBAsMAklUMRAwDgYDVQQDDAdS\n" +
116. "b290IENBMB4XDTI1MDkyNDA5NDgyN1oXDTM1MDkyMjA5NDgyN1owYjELMAkGA1UE\n" +
117. "BhMCQ04xEDAOBgNVBAgMB0JlaWppbmcxEDAOBgNVBAcMB0JlaWppbmcxEDAOBgNV\n" +
118. "BAoMB1Jvb3QgQ0ExCzAJBgNVBAsMAklUMRAwDgYDVQQDDAdSb290IENBMIGfMA0G\n" +
119. "CSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIKZ7fGE1Z+SqdfywoEl9NqQLOiLiHumzD\n" +
120. "JDY1ZWApQpX9098Z2PmvPV6oh84UFEc2nv+yKG1kid2qh9jcm0zNaV2q0AA3t0d8\n" +
121. "WTzjbs4HG4kdcUk5FtLhMVEBTUR0/ii38Y4tJXNmaarGyNbyB85GNqXTpxn9mkBp\n" +
122. "cAEGa4A7BwIDAQABo3YwdDAdBgNVHQ4EFgQUB1FwqNTM5mqxu5ZbsbayDFf57OAw\n" +
123. "HwYDVR0jBBgwFoAUB1FwqNTM5mqxu5ZbsbayDFf57OAwCwYDVR0PBAQDAgEGMAkG\n" +
124. "A1UdEQQCMAAwCQYDVR0SBAIwADAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEB\n" +
125. "CwUAA4GBAEwSMp+Zo4hMxmPp9VmKuvC5ElJCisdghrJxhb6KWVza9temcnAEkshZ\n" +
126. "IRqW4mnstsY5YSuIhPF/oinVCVB7ViRPEb8ZnzxE3Bbka0/ShhE5wjBn75NcCbtD\n" +
127. "WZvp+1vl8LlmRwRe2kr5JvcPw5IpGRq1tunznRpg+/3eEpI+KT3E\n"             +
128. "-----END CERTIFICATE-----";
129. let crl =
130. "-----BEGIN X509 CRL-----\n"                                         +
131. "MIIBYzCBzQIBATANBgkqhkiG9w0BAQsFADBiMQswCQYDVQQGEwJDTjEQMA4GA1UE\n" +
132. "CAwHQmVpamluZzEQMA4GA1UEBwwHQmVpamluZzEQMA4GA1UECgwHUm9vdCBDQTEL\n" +
133. "MAkGA1UECwwCSVQxEDAOBgNVBAMMB1Jvb3QgQ0EXDTI1MDkyNDEwMjYxMVoXDTM1\n" +
134. "MDkyMjEwMjYxMVowJzAlAhQQJcdmi0frIrktNN08UyRj2RmRrRcNMjUwOTI0MTAy\n" +
135. "NTUxWqAOMAwwCgYDVR0UBAMCAQUwDQYJKoZIhvcNAQELBQADgYEAEGLDAa7xHu6U\n" +
136. "SEUa7vDI9ZjxeQLJedqo3+j/ihMu1YBSP9yPXTUJ6MZcT8oMLLvYnjjV7Lp4jIq5\n" +
137. "yBX3iW9+nrXfJKoHRkP9NMqUdk1jRBVNIG8xT+EYssa+lurN+wDjytI+BEA+kCJQ\n" +
138. "4S4wrhhI4mBOBr53GbbsgZfEUhCrMoE=\n"                                 +
139. "-----END X509 CRL-----";

141. async function doTestLeafCertCrlCheck() {
142. try {
143. let x509CertChain: cert.X509CertChain = await createCertChain(certChainData);
144. let x509Cert: cert.X509Cert = await createCert(trustRootCertPem);
145. let caCollection: cert.CertCRLCollection = await createCRL(crl);
146. const param: cert.CertChainValidationParameters = {
147. date: '20250926080000Z',
148. trustAnchors: [{
149. CACert: x509Cert
150. }],
151. certCRLs: [caCollection],
152. revocationCheckParam: {
153. options: [
154. cert.RevocationCheckOptions.REVOCATION_CHECK_OPTION_LOCAL_CRL_ONLY_CHECK_END_ENTITY_CERT
155. ],
156. }
157. };
158. await x509CertChain.validate(param);
159. console.info("validate result is success.");
160. } catch (error) {
161. console.error("x509CertChain validate failed error code is: " + error.code);
162. }
163. }
```

## 在线校验证书链中的中间CA证书的吊销状态

从API 22开始，支持在线校验证书链中的中间CA证书的吊销状态。

### 开发步骤

1. 导入[证书算法库框架模块](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { cert } from '@kit.DeviceCertificateKit';
   ```
2. 调用[cert.createX509CertChain](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certcreatex509certchain11)创建证书链对象。
3. 调用[cert.createX509Cert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certcreatex509cert)创建X509证书对象。
4. 构造[cert.CertChainValidationParameters](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certchainvalidationparameters11)证书链校验参数。
5. 调用[cert.validate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#validate11)，传入证书链校验参数，进行证书链校验。

说明

本开发指导中提供的示例代码需要在配置网络的前提下执行。

在线校验中间证书的吊销状态示例：

收起

自动换行

深色代码主题

复制

```
1. import { cert } from '@kit.DeviceCertificateKit';

3. // string转Uint8Array。
4. function stringToUint8Array(str: string): Uint8Array {
5. let arr: number[] = [];
6. for (let i = 0, j = str.length; i < j; i++) {
7. arr.push(str.charCodeAt(i));
8. }
9. return new Uint8Array(arr);
10. }

12. async function createCertChain(certData: string): Promise<cert.X509CertChain> {
13. // 证书二进制数据，需业务自行赋值。
14. let encodingBlob: cert.EncodingBlob = {
15. data: stringToUint8Array(certData),
16. // 根据encodingData的格式进行赋值，支持FORMAT_PEM和FORMAT_DER。
17. encodingFormat: cert.EncodingFormat.FORMAT_PEM
18. };

20. let X509CertChain: cert.X509CertChain = {} as cert.X509CertChain;
21. try {
22. X509CertChain = await cert.createX509CertChain(encodingBlob);
23. } catch (err) {
24. console.error(`createCertChain failed: errCode: ${err.code}, message: ${err.message}`);
25. }
26. return X509CertChain;
27. }
28. async function createCert(certData: string): Promise<cert.X509Cert> {
29. // 证书二进制数据，需业务自行赋值。
30. let encodingBlob: cert.EncodingBlob = {
31. data: stringToUint8Array(certData),
32. // 根据encodingData的格式进行赋值，支持FORMAT_PEM和FORMAT_DER。
33. encodingFormat: cert.EncodingFormat.FORMAT_PEM
34. };

36. let x509Cert: cert.X509Cert = {} as cert.X509Cert;
37. try {
38. x509Cert = await cert.createX509Cert(encodingBlob);
39. } catch (err) {
40. console.error(`createCert failed: errCode: ${err.code}, message: ${err.message}`);
41. }
42. return x509Cert;
43. }

45. let caChain =
46. "-----BEGIN CERTIFICATE-----\n" +
47. "MIICezCCAiCgAwIBAgIUDczOyWG59LZLx2kP97vi5y0oL+QwCgYIKoZIzj0EAwIw\n" +
48. "fjELMAkGA1UEBhMCQ04xEDAOBgNVBAgMB0JlaWppbmcxEDAOBgNVBAcMB0JlaWpp\n" +
49. "bmcxHjAcBgNVBAoMFUVDRFNBIEludGVybWVkaWF0ZSBDQTELMAkGA1UECwwCSVQx\n" +
50. "HjAcBgNVBAMMFUVDRFNBIEludGVybWVkaWF0ZSBDQTAeFw0yNTEwMTUwNjI3MzVa\n" +
51. "Fw0zMDExMDgwNjI3MzVaMHUxCzAJBgNVBAYTAkNOMRAwDgYDVQQIDAdCZWlqaW5n\n" +
52. "MRAwDgYDVQQHDAdCZWlqaW5nMRswGQYDVQQKDBJFQ0RTQSBFeGFtcGxlIENvcnAx\n" +
53. "CzAJBgNVBAsMAklUMRgwFgYDVQQDDA93d3cuZXhhbXBsZS5jb20wWTATBgcqhkjO\n" +
54. "PQIBBggqhkjOPQMBBwNCAASLR4TL7GQxOngZONYxay8vb5QQ2pDdaFobU2YSUC4m\n" +
55. "dYxTsTyujMkTgK9sv/Me3Nf1lDXUz8mUCwVLHJ33hx3Jo4GEMIGBMAkGA1UdEwQC\n" +
56. "MAAwCwYDVR0PBAQDAgK0MCcGA1UdEQQgMB6CD3d3dy5leGFtcGxlLmNvbYILZXhh\n" +
57. "bXBsZS5jb20wHQYDVR0OBBYEFOp+v71yBI53o1mcrxqLOcZi0BrUMB8GA1UdIwQY\n" +
58. "MBaAFDhFnzDg8Ap9glv7qyl8ajigm0OsMAoGCCqGSM49BAMCA0kAMEYCIQDIK8lp\n" +
59. "z7+PNk6MxW45Lht9pUj/eAZfHW/692ZeJW1dfAIhAI1f3GEzkTihWd6h139gPXcS\n" +
60. "y+Sf6/kfJnN0I3v/O2vI\n" +
61. "-----END CERTIFICATE-----\n"                                        +
62. "-----BEGIN CERTIFICATE-----\n" +
63. "MIIEZjCCBAygAwIBAgIMTT/sw52uhI5Hi8tcMAoGCCqGSM49BAMCMFAxCzAJBgNV\n" +
64. "BAYTAkJFMRkwFwYDVQQKDBBHbG9iYWxTaWduIG52LXNhMSYwJAYDVQQDDB1HbG9i\n" +
65. "YWxTaWduIEVDQyBPViBTU0wgQ0EgMjAxODAeFw0yNTEwMTUwNjIwMzhaFw0yNTEx\n" +
66. "MTQwNjIwMzhaMH4xCzAJBgNVBAYTAkNOMRAwDgYDVQQIDAdCZWlqaW5nMRAwDgYD\n" +
67. "VQQHDAdCZWlqaW5nMR4wHAYDVQQKDBVFQ0RTQSBJbnRlcm1lZGlhdGUgQ0ExCzAJ\n" +
68. "BgNVBAsMAklUMR4wHAYDVQQDDBVFQ0RTQSBJbnRlcm1lZGlhdGUgQ0EwWTATBgcq\n" +
69. "hkjOPQIBBggqhkjOPQMBBwNCAARsa530tupy2vzI0ljPlGdO/QRMnXOv0R7cuQ8P\n" +
70. "sTnaaqCBXrHZxrwoISe1c3+eq4CnJZBImvZSTSUUW9DfV31Co4ICnDCCApgwDAYD\n" +
71. "VR0TBAUwAwEB/zAOBgNVHQ8BAf8EBAMCAe4wNQYDVR0lAQH/BCswKQYIKwYBBQUH\n" +
72. "AwIGCCsGAQUFBwMBBggrBgEFBQcDAwYJKoZIhvcNAQkQMD8GA1UdHwQ4MDYwNKAy\n" +
73. "oDCGLmh0dHA6Ly9jcmwuZ2xvYmFsc2lnbi5jb20vZ3NlY2NvdnNzbGNhMjAxOC5j\n" +
74. "cmwwggGIBggrBgEFBQcBAQSCAXowggF2MIG4BggrBgEFBQcwAoaBq2h0dHBzOi8v\n" +
75. "Z2l0Y29kZS5jb20vbTBfNzI2MTA3NzUvY29tcGF0aWJpbGl0eS9ibG9iL21hc3Rl\n" +
76. "ci90ZXN0X3N1aXRlL3Jlc291cmNlL21hc3Rlci9zdGFuZGFyZCUyMHN5c3RlbS9h\n" +
77. "Y3RzL3Jlc291cmNlL3NlY3VyaXR5L2NlcnRpZmljYXRlX2ZyYW1ld29yay8yMDI1\n" +
78. "MDgxODE3ODgzNC9yb290LmNydDCBuAYIKwYBBQUHMAGGgatodHRwczovL2dpdGNv\n" +
79. "ZGUuY29tL20wXzcyNjEwNzc1L2NvbXBhdGliaWxpdHkvYmxvYi9tYXN0ZXIvdGVz\n" +
80. "dF9zdWl0ZS9yZXNvdXJjZS9tYXN0ZXIvc3RhbmRhcmQlMjBzeXN0ZW0vYWN0cy9y\n" +
81. "ZXNvdXJjZS9zZWN1cml0eS9jZXJ0aWZpY2F0ZV9mcmFtZXdvcmsvMjAyNTA4MTgx\n" +
82. "Nzg4MzQvcm9vdE9jc3AwNAYDVR0RBC0wK4IJbG9jYWxob3N0hwR/AAABhwTAqAEB\n" +
83. "hhJodHRwOi8vMTkyLjE2OC4wLjIwHQYDVR0OBBYEFDhFnzDg8Ap9glv7qyl8ajig\n" +
84. "m0OsMB8GA1UdIwQYMBaAFEYc/aft0QonL8U0/qNsvq3lrA9bMAoGCCqGSM49BAMC\n" +
85. "A0gAMEUCIFsgnFqsgzPfzRtxLLqsh1tEQeW6xqp875XqpICR6FO7AiEAnJTGezte\n" +
86. "A3uK46isQ2HwlmgwmXTNwgSP1JyWr5t6cVA=\n" +
87. "-----END CERTIFICATE-----\n"                                        +
88. "-----BEGIN CERTIFICATE-----\n" +
89. "MIICGTCCAb6gAwIBAgIULcoKoYK2AQviXl1rlu+m7TH/J5UwCgYIKoZIzj0EAwMw\n" +
90. "UDELMAkGA1UEBhMCQkUxGTAXBgNVBAoMEEdsb2JhbFNpZ24gbnYtc2ExJjAkBgNV\n" +
91. "BAMMHUdsb2JhbFNpZ24gRUNDIE9WIFNTTCBDQSAyMDE4MB4XDTI1MTAxNTAzNTMw\n" +
92. "OFoXDTM1MTAxMzAzNTMwOFowUDELMAkGA1UEBhMCQkUxGTAXBgNVBAoMEEdsb2Jh\n" +
93. "bFNpZ24gbnYtc2ExJjAkBgNVBAMMHUdsb2JhbFNpZ24gRUNDIE9WIFNTTCBDQSAy\n" +
94. "MDE4MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEJgdrEUKaVA8ZPzYD/kLwsn4c\n" +
95. "UgkrCkTtMZEtG6l5iGTvpZT4qPTh8h5ILrui9bC+DLPRkEo3YsfHb62EanXqe6N2\n" +
96. "MHQwHQYDVR0OBBYEFEYc/aft0QonL8U0/qNsvq3lrA9bMB8GA1UdIwQYMBaAFEYc\n" +
97. "/aft0QonL8U0/qNsvq3lrA9bMAsGA1UdDwQEAwIBBjAJBgNVHREEAjAAMAkGA1Ud\n" +
98. "EgQCMAAwDwYDVR0TAQH/BAUwAwEB/zAKBggqhkjOPQQDAwNJADBGAiEAz82HL4V2\n" +
99. "3zTMVfJVMhHvSf2j+z7mUrRKCc0f21635DkCIQDqxlpMbRjs1bCL4pipCvD+w8v8\n" +
100. "i4aEhDebPmxT8WuR7A==\n" +
101. "-----END CERTIFICATE-----";
102. let caTrustCert =
103. "-----BEGIN CERTIFICATE-----\n" +
104. "MIICGTCCAb6gAwIBAgIULcoKoYK2AQviXl1rlu+m7TH/J5UwCgYIKoZIzj0EAwMw\n" +
105. "UDELMAkGA1UEBhMCQkUxGTAXBgNVBAoMEEdsb2JhbFNpZ24gbnYtc2ExJjAkBgNV\n" +
106. "BAMMHUdsb2JhbFNpZ24gRUNDIE9WIFNTTCBDQSAyMDE4MB4XDTI1MTAxNTAzNTMw\n" +
107. "OFoXDTM1MTAxMzAzNTMwOFowUDELMAkGA1UEBhMCQkUxGTAXBgNVBAoMEEdsb2Jh\n" +
108. "bFNpZ24gbnYtc2ExJjAkBgNVBAMMHUdsb2JhbFNpZ24gRUNDIE9WIFNTTCBDQSAy\n" +
109. "MDE4MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEJgdrEUKaVA8ZPzYD/kLwsn4c\n" +
110. "UgkrCkTtMZEtG6l5iGTvpZT4qPTh8h5ILrui9bC+DLPRkEo3YsfHb62EanXqe6N2\n" +
111. "MHQwHQYDVR0OBBYEFEYc/aft0QonL8U0/qNsvq3lrA9bMB8GA1UdIwQYMBaAFEYc\n" +
112. "/aft0QonL8U0/qNsvq3lrA9bMAsGA1UdDwQEAwIBBjAJBgNVHREEAjAAMAkGA1Ud\n" +
113. "EgQCMAAwDwYDVR0TAQH/BAUwAwEB/zAKBggqhkjOPQQDAwNJADBGAiEAz82HL4V2\n" +
114. "3zTMVfJVMhHvSf2j+z7mUrRKCc0f21635DkCIQDqxlpMbRjs1bCL4pipCvD+w8v8\n" +
115. "i4aEhDebPmxT8WuR7A==\n" +
116. "-----END CERTIFICATE-----";

118. async function doTestCaCheck() {
119. try {
120. let x509CertChain: cert.X509CertChain = await createCertChain(caChain);
121. let x509Cert: cert.X509Cert = await createCert(caTrustCert);
122. const param: cert.CertChainValidationParameters = {
123. trustAnchors: [{
124. CACert: x509Cert
125. }],
126. revocationCheckParam: {
127. options: [
128. cert.RevocationCheckOptions.REVOCATION_CHECK_OPTION_ACCESS_NETWORK,
129. cert.RevocationCheckOptions.REVOCATION_CHECK_OPTION_CHECK_INTERMEDIATE_CA_ONLINE
130. ],
131. }
132. };
133. await x509CertChain.validate(param);
134. console.info("validate result is success.");
135. } catch (error) {
136. console.error("x509CertChain validate failed error code is: " + error.code);
137. }
138. }
```