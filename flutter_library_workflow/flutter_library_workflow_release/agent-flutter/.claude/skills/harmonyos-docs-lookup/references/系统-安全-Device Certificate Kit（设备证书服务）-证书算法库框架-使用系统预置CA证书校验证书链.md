从API 20开始，支持使用系统预置CA证书校验证书链。

以校验证书链为例，完成证书链对象的创建，使用系统预置CA证书对证书链进行校验。

## 开发步骤

1. 导入[证书算法库框架模块](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { cert } from '@kit.DeviceCertificateKit';
   ```
2. 基于已有的证书数据，调用[cert.createX509CertChain](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#certcreatex509certchain11)创建X509证书链对象，并返回结果。
3. 调用[x509CertChain.validate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cert#validate11)设置校验参数trustSystemCa为true，使用系统预置CA证书校验证书链并返回结果。

收起

自动换行

深色代码主题

复制

```
1. import { cert } from '@kit.DeviceCertificateKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { util } from '@kit.ArkTS';

5. let certChainData = "-----BEGIN CERTIFICATE-----\r\n" +
6. "MIIJ7DCCCNSgAwIBAgIMTkADpl62gfh/S9jrMA0GCSqGSIb3DQEBCwUAMFAxCzAJ\r\n" +
7. "BgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWduIG52LXNhMSYwJAYDVQQDEx1H\r\n" +
8. "bG9iYWxTaWduIFJTQSBPViBTU0wgQ0EgMjAxODAeFw0yNDA3MDgwMTQxMDJaFw0y\r\n" +
9. "NTA4MDkwMTQxMDFaMIGAMQswCQYDVQQGEwJDTjEQMA4GA1UECBMHYmVpamluZzEQ\r\n" +
10. "MA4GA1UEBxMHYmVpamluZzE5MDcGA1UEChMwQmVpamluZyBCYWlkdSBOZXRjb20g\r\n" +
11. "U2NpZW5jZSBUZWNobm9sb2d5IENvLiwgTHRkMRIwEAYDVQQDEwliYWlkdS5jb20w\r\n" +
12. "ggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1wFMskJ2dseOqoHptNwot\r\n" +
13. "FOhdBERsZ4VQnRNKXEEXMQEfgbNtScQ+C/Z+IpRAt1EObhYlifn74kt2nTsCQLng\r\n" +
14. "jfQkRVBuO/6PNGKdlCYGBeGqAL7xR+LOyHnpH9mwCBJc+WVt2zYM9I1clpXCJa+I\r\n" +
15. "tsq6qpb1AGoQxRDZ2n4K8Gd61wgNCPHDHc/Lk9NPJoUBMvYWvEe5lKhHsJtWtHe4\r\n" +
16. "QC3y58Vi+r5R0PWn2hyTBr9fCo58p/stDiRqp9Irtmi95YhwkNkmgwpMB8RhcGoN\r\n" +
17. "h+Uw5TkPZVj4AVaoPT1ED/GMKZev0+ypmp0+nmjVg2x7yUfLUfp3X7oBdI4TS2hv\r\n" +
18. "AgMBAAGjggaTMIIGjzAOBgNVHQ8BAf8EBAMCBaAwDAYDVR0TAQH/BAIwADCBjgYI\r\n" +
19. "KwYBBQUHAQEEgYEwfzBEBggrBgEFBQcwAoY4aHR0cDovL3NlY3VyZS5nbG9iYWxz\r\n" +
20. "aWduLmNvbS9jYWNlcnQvZ3Nyc2FvdnNzbGNhMjAxOC5jcnQwNwYIKwYBBQUHMAGG\r\n" +
21. "K2h0dHA6Ly9vY3NwLmdsb2JhbHNpZ24uY29tL2dzcnNhb3Zzc2xjYTIwMTgwVgYD\r\n" +
22. "VR0gBE8wTTBBBgkrBgEEAaAyARQwNDAyBggrBgEFBQcCARYmaHR0cHM6Ly93d3cu\r\n" +
23. "Z2xvYmFsc2lnbi5jb20vcmVwb3NpdG9yeS8wCAYGZ4EMAQICMD8GA1UdHwQ4MDYw\r\n" +
24. "NKAyoDCGLmh0dHA6Ly9jcmwuZ2xvYmFsc2lnbi5jb20vZ3Nyc2FvdnNzbGNhMjAx\r\n" +
25. "OC5jcmwwggNhBgNVHREEggNYMIIDVIIJYmFpZHUuY29tggxiYWlmdWJhby5jb22C\r\n" +
26. "DHd3dy5iYWlkdS5jboIQd3d3LmJhaWR1LmNvbS5jboIPbWN0LnkubnVvbWkuY29t\r\n" +
27. "ggthcG9sbG8uYXV0b4IGZHd6LmNuggsqLmJhaWR1LmNvbYIOKi5iYWlmdWJhby5j\r\n" +
28. "b22CESouYmFpZHVzdGF0aWMuY29tgg4qLmJkc3RhdGljLmNvbYILKi5iZGltZy5j\r\n" +
29. "b22CDCouaGFvMTIzLmNvbYILKi5udW9taS5jb22CDSouY2h1YW5rZS5jb22CDSou\r\n" +
30. "dHJ1c3Rnby5jb22CDyouYmNlLmJhaWR1LmNvbYIQKi5leXVuLmJhaWR1LmNvbYIP\r\n" +
31. "Ki5tYXAuYmFpZHUuY29tgg8qLm1iZC5iYWlkdS5jb22CESouZmFueWkuYmFpZHUu\r\n" +
32. "Y29tgg4qLmJhaWR1YmNlLmNvbYIMKi5taXBjZG4uY29tghAqLm5ld3MuYmFpZHUu\r\n" +
33. "Y29tgg4qLmJhaWR1cGNzLmNvbYIMKi5haXBhZ2UuY29tggsqLmFpcGFnZS5jboIN\r\n" +
34. "Ki5iY2Vob3N0LmNvbYIQKi5zYWZlLmJhaWR1LmNvbYIOKi5pbS5iYWlkdS5jb22C\r\n" +
35. "EiouYmFpZHVjb250ZW50LmNvbYILKi5kbG5lbC5jb22CCyouZGxuZWwub3JnghIq\r\n" +
36. "LmR1ZXJvcy5iYWlkdS5jb22CDiouc3UuYmFpZHUuY29tgggqLjkxLmNvbYISKi5o\r\n" +
37. "YW8xMjMuYmFpZHUuY29tgg0qLmFwb2xsby5hdXRvghIqLnh1ZXNodS5iYWlkdS5j\r\n" +
38. "b22CESouYmouYmFpZHViY2UuY29tghEqLmd6LmJhaWR1YmNlLmNvbYIOKi5zbWFy\r\n" +
39. "dGFwcHMuY26CDSouYmR0anJjdi5jb22CDCouaGFvMjIyLmNvbYIMKi5oYW9rYW4u\r\n" +
40. "Y29tgg8qLnBhZS5iYWlkdS5jb22CESoudmQuYmRzdGF0aWMuY29tghEqLmNsb3Vk\r\n" +
41. "LmJhaWR1LmNvbYISY2xpY2suaG0uYmFpZHUuY29tghBsb2cuaG0uYmFpZHUuY29t\r\n" +
42. "ghBjbS5wb3MuYmFpZHUuY29tghB3bi5wb3MuYmFpZHUuY29tghR1cGRhdGUucGFu\r\n" +
43. "LmJhaWR1LmNvbTAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwHwYDVR0j\r\n" +
44. "BBgwFoAU+O9/8s14Z6jeb48kjYjxhwMCs+swHQYDVR0OBBYEFK3KAFTK2OWUto+D\r\n" +
45. "2ieAKE5ZJDsYMIIBfwYKKwYBBAHWeQIEAgSCAW8EggFrAWkAdgCvGBoo1oyj4KmK\r\n" +
46. "TJxnqwn4u7wiuq68sTijoZ3T+bYDDQAAAZCQAGzzAAAEAwBHMEUCIFwF5Jc+zyIF\r\n" +
47. "Gnpxchz9fY1qzlqg/oVrs2nnuxcpBuuIAiEAu3scD6u51VOP/9aMSqR2yKHZLbHw\r\n" +
48. "Fos9U7AzSdLIZa8AdgAS8U40vVNyTIQGGcOPP3oT+Oe1YoeInG0wBYTr5YYmOgAA\r\n" +
49. "AZCQAG3iAAAEAwBHMEUCIBBYQ6NP7VUDgfktWRg5QxT23QAbTqYovtV2D9O8Qc0T\r\n" +
50. "AiEA2P7+44EvQ5adwL1y56oyxv/m+Gujeia7wpo7+Xbhv6MAdwAN4fIwK9MNwUBi\r\n" +
51. "EgnqVS78R3R8sdfpMO8OQh60fk6qNAAAAZCQAGy+AAAEAwBIMEYCIQDU7Hxtx4c9\r\n" +
52. "p9Jd+cr+DCMtyRYSc0b8cktCcbMmtDE9ygIhAIpJd4yb7jtxnaEC8oLWDushbK1v\r\n" +
53. "0BIuZu6YrQvsf1nQMA0GCSqGSIb3DQEBCwUAA4IBAQCh9DfewC012/+fHZpmSpCn\r\n" +
54. "y+h3/+ClAZ8cJVO+LCmYz9r6bkyhcFquJ5qUpyoW8AYtU0oUFlqH6zLIyujW+7lq\r\n" +
55. "wFxB6NsXKKdwBKmMbmnZr2Fca5f+TtwD/GDJgG/egr7fI1u8194j9KEl8cK8Fujm\r\n" +
56. "+UsoWklEzd1It9xkLazJR/6SwbhSR4k610pvj8rQrS4wAewuYFDaDOfqsHtDIsx1\r\n" +
57. "tZfIfoB/O1wGWZQJU2M9wC8uYq0jQ2Q0MQJXuyJz04MFiGrPAS1Uk8mWd8M+3p65\r\n" +
58. "Xy4iAf8uWzs1M+fcwBE8BNBghkQgE+FSUsldm+5ZBCazU0joJswzldWisXMLTagI\r\n" +
59. "-----END CERTIFICATE-----\r\n" +
60. "-----BEGIN CERTIFICATE-----\r\n" +
61. "MIIETjCCAzagAwIBAgINAe5fIh38YjvUMzqFVzANBgkqhkiG9w0BAQsFADBMMSAw\r\n" +
62. "HgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEGA1UEChMKR2xvYmFs\r\n" +
63. "U2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAeFw0xODExMjEwMDAwMDBaFw0yODEx\r\n" +
64. "MjEwMDAwMDBaMFAxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWduIG52\r\n" +
65. "LXNhMSYwJAYDVQQDEx1HbG9iYWxTaWduIFJTQSBPViBTU0wgQ0EgMjAxODCCASIw\r\n" +
66. "DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKdaydUMGCEAI9WXD+uu3Vxoa2uP\r\n" +
67. "UGATeoHLl+6OimGUSyZ59gSnKvuk2la77qCk8HuKf1UfR5NhDW5xUTolJAgvjOH3\r\n" +
68. "idaSz6+zpz8w7bXfIa7+9UQX/dhj2S/TgVprX9NHsKzyqzskeU8fxy7quRU6fBhM\r\n" +
69. "abO1IFkJXinDY+YuRluqlJBJDrnw9UqhCS98NE3QvADFBlV5Bs6i0BDxSEPouVq1\r\n" +
70. "lVW9MdIbPYa+oewNEtssmSStR8JvA+Z6cLVwzM0nLKWMjsIYPJLJLnNvBhBWk0Cq\r\n" +
71. "o8VS++XFBdZpaFwGue5RieGKDkFNm5KQConpFmvv73W+eka440eKHRwup08CAwEA\r\n" +
72. "AaOCASkwggElMA4GA1UdDwEB/wQEAwIBhjASBgNVHRMBAf8ECDAGAQH/AgEAMB0G\r\n" +
73. "A1UdDgQWBBT473/yzXhnqN5vjySNiPGHAwKz6zAfBgNVHSMEGDAWgBSP8Et/qC5F\r\n" +
74. "JK5NUPpjmove4t0bvDA+BggrBgEFBQcBAQQyMDAwLgYIKwYBBQUHMAGGImh0dHA6\r\n" +
75. "Ly9vY3NwMi5nbG9iYWxzaWduLmNvbS9yb290cjMwNgYDVR0fBC8wLTAroCmgJ4Yl\r\n" +
76. "aHR0cDovL2NybC5nbG9iYWxzaWduLmNvbS9yb290LXIzLmNybDBHBgNVHSAEQDA+\r\n" +
77. "MDwGBFUdIAAwNDAyBggrBgEFBQcCARYmaHR0cHM6Ly93d3cuZ2xvYmFsc2lnbi5j\r\n" +
78. "b20vcmVwb3NpdG9yeS8wDQYJKoZIhvcNAQELBQADggEBAJmQyC1fQorUC2bbmANz\r\n" +
79. "EdSIhlIoU4r7rd/9c446ZwTbw1MUcBQJfMPg+NccmBqixD7b6QDjynCy8SIwIVbb\r\n" +
80. "0615XoFYC20UgDX1b10d65pHBf9ZjQCxQNqQmJYaumxtf4z1s4DfjGRzNpZ5eWl0\r\n" +
81. "6r/4ngGPoJVpjemEuunl1Ig423g7mNA2eymw0lIYkN5SQwCuaifIFJ6GlazhgDEw\r\n" +
82. "fpolu4usBCOmmQDo8dIm7A9+O4orkjgTHY+GzYZSR+Y0fFukAj6KYXwidlNalFMz\r\n" +
83. "hriSqHKvoflShx8xpfywgVcvzfTO3PYkz6fiNJBonf6q8amaEsybwMbDqKWwIX7e\r\n" +
84. "SPY=\r\n" +
85. "-----END CERTIFICATE-----\r\n" +
86. "-----BEGIN CERTIFICATE-----\r\n" +
87. "MIIDXzCCAkegAwIBAgILBAAAAAABIVhTCKIwDQYJKoZIhvcNAQELBQAwTDEgMB4G\r\n" +
88. "A1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjMxEzARBgNVBAoTCkdsb2JhbFNp\r\n" +
89. "Z24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDkwMzE4MTAwMDAwWhcNMjkwMzE4\r\n" +
90. "MTAwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEG\r\n" +
91. "A1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI\r\n" +
92. "hvcNAQEBBQADggEPADCCAQoCggEBAMwldpB5BngiFvXAg7aEyiie/QV2EcWtiHL8\r\n" +
93. "RgJDx7KKnQRfJMsuS+FggkbhUqsMgUdwbN1k0ev1LKMPgj0MK66X17YUhhB5uzsT\r\n" +
94. "gHeMCOFJ0mpiLx9e+pZo34knlTifBtc+ycsmWQ1z3rDI6SYOgxXG71uL0gRgykmm\r\n" +
95. "KPZpO/bLyCiR5Z2KYVc3rHQU3HTgOu5yLy6c+9C7v/U9AOEGM+iCK65TpjoWc4zd\r\n" +
96. "QQ4gOsC0p6Hpsk+QLjJg6VfLuQSSaGjlOCZgdbKfd/+RFO+uIEn8rUAVSNECMWEZ\r\n" +
97. "XriX7613t2Saer9fwRPvm2L7DWzgVGkWqQPabumDk3F2xmmFghcCAwEAAaNCMEAw\r\n" +
98. "DgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFI/wS3+o\r\n" +
99. "LkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IBAQBLQNvAUKr+yAzv95ZU\r\n" +
100. "RUm7lgAJQayzE4aGKAczymvmdLm6AC2upArT9fHxD4q/c2dKg8dEe3jgr25sbwMp\r\n" +
101. "jjM5RcOO5LlXbKr8EpbsU8Yt5CRsuZRj+9xTaGdWPoO4zzUhw8lo/s7awlOqzJCK\r\n" +
102. "6fBdRoyV3XpYKBovHd7NADdBj+1EbddTKJd+82cEHhXXipa0095MJ6RMG3NzdvQX\r\n" +
103. "mcIfeg7jLQitChws/zyrVQ4PkX4268NXSb7hLi18YIvDQVETI53O9zJrlAGomecs\r\n" +
104. "Mx86OyXShkDOOyyGeMlhLxS67ttVb9+E7gUJTb0o2HLO02JQZR7rkpeDMdmztcpH\r\n" +
105. "WD9f\r\n" +
106. "-----END CERTIFICATE-----\r\n";

108. async function sample() {
109. let textEncoder = new util.TextEncoder();
110. // 证书链二进制数据，需业务自行赋值。
111. const encodingBlob: cert.EncodingBlob = {
112. data: textEncoder.encodeInto(certChainData),
113. // 根据encodingData的格式进行赋值，支持FORMAT_PEM、FORMAT_DER和FORMAT_PKCS7。
114. encodingFormat: cert.EncodingFormat.FORMAT_PEM
115. };
116. let x509CertChain: cert.X509CertChain = {} as cert.X509CertChain;
117. try {
118. x509CertChain = await cert.createX509CertChain(encodingBlob);
119. } catch (err) {
120. let e: BusinessError = err as BusinessError;
121. console.error(`createX509CertChain failed, errCode: ${e.code}, errMsg: ${e.message}`);
122. }

124. // 证书链校验数据，需业务自行赋值。
125. const param: cert.CertChainValidationParameters = {
126. date: '20250623163000Z',
127. trustAnchors: [{}],
128. trustSystemCa: true,
129. };
130. try {
131. const validationRes = await x509CertChain.validate(param);
132. console.info('X509CertChain validate success');
133. } catch (err) {
134. console.error('X509CertChain validate failed');
135. }
136. }
```