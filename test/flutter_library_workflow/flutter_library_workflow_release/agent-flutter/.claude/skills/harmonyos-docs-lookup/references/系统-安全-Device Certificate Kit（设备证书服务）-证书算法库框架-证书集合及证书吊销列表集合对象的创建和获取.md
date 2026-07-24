从输入的证书集合和证书吊销列表集合中选择满足条件的证书或者证书吊销列表。

## 开发步骤

1. 导入[证书算法库框架模块](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { cert } from '@kit.DeviceCertificateKit';
   ```
2. 基于已有的证书数据，调用[cert.createX509Cert](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certcreatex509cert-1)创建X509证书的对象。
3. 基于已有的CRL数据，调用[cert.createX509CRL](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certcreatex509crl11-1)创建X509证书吊销列表的对象。
4. 调用[cert.createCertCRLCollection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certcreatecertcrlcollection11)创建[CertCRLCollection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certcrlcollection11)的对象，并返回相应的结果。
5. 调用[CertCRLCollection.selectCerts](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#selectcerts11)查找所有与[X509CertMatchParameters](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#x509certmatchparameters11)匹配的证书对象数组，并返回结果。
6. 调用[CertCRLCollection.selectCRLs](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#selectcrls11)查找所有与[X509CRLMatchParameters](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#x509crlmatchparameters11)匹配的证书吊销列表数组，并返回结果。

收起

自动换行

深色代码主题

复制

```
1. import { cert } from '@kit.DeviceCertificateKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { util } from '@kit.ArkTS';

5. async function createX509CRL(): Promise<cert.X509CRL> {
6. let crlData = '-----BEGIN X509 CRL-----\n' +
7. 'MIHzMF4CAQMwDQYJKoZIhvcNAQEEBQAwFTETMBEGA1UEAxMKQ1JMIGlzc3VlchcN\n' +
8. 'MTcwODA3MTExOTU1WhcNMzIxMjE0MDA1MzIwWjAVMBMCAgPoFw0zMjEyMTQwMDUz\n' +
9. 'MjBaMA0GCSqGSIb3DQEBBAUAA4GBACEPHhlaCTWA42ykeaOyR0SGQIHIOUR3gcDH\n' +
10. 'J1LaNwiL+gDxI9rMQmlhsUGJmPIPdRs9uYyI+f854lsWYisD2PUEpn3DbEvzwYeQ\n' +
11. '5SqQoPDoM+YfZZa23hoTLsu52toXobP74sf/9K501p/+8hm4ROMLBoRT86GQKY6g\n' +
12. 'eavsH0Q3\n' +
13. '-----END X509 CRL-----\n';

15. // 证书吊销列表二进制数据，需业务自行赋值。
16. let textEncoder = new util.TextEncoder();
17. let encodingBlob: cert.EncodingBlob = {
18. data: textEncoder.encodeInto(crlData),
19. // 根据encodingData的格式进行赋值，支持FORMAT_PEM和FORMAT_DER。
20. encodingFormat: cert.EncodingFormat.FORMAT_PEM
21. };
22. let x509CRL: cert.X509CRL = {} as cert.X509CRL;
23. try {
24. x509CRL = await cert.createX509CRL(encodingBlob);
25. } catch (err) {
26. let e: BusinessError = err as BusinessError;
27. console.error(`createX509CRL failed, errCode: ${e.code}, errMsg: ${e.message}`);
28. }
29. return x509CRL;
30. }

32. async function createX509Cert(): Promise<cert.X509Cert> {
33. let certData = '-----BEGIN CERTIFICATE-----\n' +
34. 'MIIBHTCBwwICA+gwCgYIKoZIzj0EAwIwGjEYMBYGA1UEAwwPRXhhbXBsZSBSb290\n' +
35. 'IENBMB4XDTIzMDkwNTAyNDgyMloXDTI2MDUzMTAyNDgyMlowGjEYMBYGA1UEAwwP\n' +
36. 'RXhhbXBsZSBSb290IENBMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEHjG74yMI\n' +
37. 'ueO7z3T+dyuEIrhxTg2fqgeNB3SGfsIXlsiUfLTatUsU0i/sePnrKglj2H8Abbx9\n' +
38. 'PK0tsW/VgqwDIDAKBggqhkjOPQQDAgNJADBGAiEApVZno/Z7WyDc/muRN1y57uaY\n' +
39. 'Mjrgnvp/AMdE8qmFiDwCIQCrIYdHVO1awaPgcdALZY+uLQi6mEs/oMJLUcmaag3E\n' +
40. 'Qw==\n' +
41. '-----END CERTIFICATE-----\n';

43. let textEncoder = new util.TextEncoder();
44. let encodingBlob: cert.EncodingBlob = {
45. data: textEncoder.encodeInto(certData),
46. // 根据encodingData的格式进行赋值，支持FORMAT_PEM和FORMAT_DER。
47. encodingFormat: cert.EncodingFormat.FORMAT_PEM
48. };

50. let x509Cert: cert.X509Cert = {} as cert.X509Cert;
51. try {
52. x509Cert = await cert.createX509Cert(encodingBlob);
53. } catch (err) {
54. let e: BusinessError = err as BusinessError;
55. console.error(`createX509Cert failed, errCode: ${e.code}, errMsg: ${e.message}`);
56. }
57. return x509Cert;
58. }

60. async function sample() {
61. const x509Cert = await createX509Cert();
62. const x509CRL = await createX509CRL();
63. let collection: cert.CertCRLCollection = {} as cert.CertCRLCollection;
64. try {
65. collection = cert.createCertCRLCollection([x509Cert], [x509CRL]);
66. console.info('createCertCRLCollection success');
67. } catch (err) {
68. console.error('createCertCRLCollection failed');
69. }

71. const certParam: cert.X509CertMatchParameters = {
72. validDate: '231128000000Z'
73. }
74. try {
75. let certs: cert.X509Cert[] = await collection.selectCerts(certParam);
76. } catch (err) {
77. console.error('selectCerts failed');
78. }

80. const crlParam: cert.X509CRLMatchParameters = {
81. x509Cert: x509Cert
82. }
83. try {
84. let crls: cert.X509CRL[] = await collection.selectCRLs(crlParam);
85. console.info('selectCRLs success');
86. } catch (err) {
87. console.error('selectCRLs failed');
88. }
89. }
```