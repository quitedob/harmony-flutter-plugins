以RSA为例，根据指定的非对称密钥字符串数据，生成非对称密钥对（KeyPair）。

说明

针对非对称密钥的convertPemKey操作：

* 公钥需满足X.509规范、PKCS#1规范、PEM编码格式。
* 私钥需满足PKCS#8规范、PKCS#1规范、PEM编码格式。

## 指定PEM格式字符串数据转换密钥对

对应的算法规格请查看[非对称密钥生成和转换规格](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/crypto-asym-key-generation-conversion-spec)。

1. 调用[cryptoFramework.createAsyKeyGenerator](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#cryptoframeworkcreateasykeygenerator)，指定字符串参数'RSA1024'，创建RSA密钥类型为RSA1024、素数个数为2的非对称密钥生成器（AsyKeyGenerator）。

   生成RSA非对称密钥时，默认素数为2，此处省略了参数PRIMES\_2。
2. 调用[AsyKeyGenerator.convertPemKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertpemkey12)，传入二进制密钥数据，生成非对称密钥对象（KeyPair）。
3. 调用[AsyKeyGenerator.getEncodedPem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#getencodedpem12)，将非对称密钥对象中的公钥转换成pkcs1或x509格式，私钥转换成pkcs1或pkcs8格式。

* 以Promise方式生成RSA密钥对为例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. let priKeyPkcs1Str1024: string  =
  4. "-----BEGIN RSA PRIVATE KEY-----\n"
  5. + "MIICXQIBAAKBgQCwIN3mr21+N96ToxnVnaS+xyK9cNRAHiHGgrbjHw6RAj3V+l+W\n"
  6. + "Y68IhIe3DudVlzE9oMjeOQwkMkq//HCxNlIlFR6O6pa0mrXSwPRE7YKG97CeKk2g\n"
  7. + "YOS8YEh8toAvm7xKbiLkXuuMlxrjP2j/mb5iI/UASFSPZiQ/IyxDr0AQaQIDAQAB\n"
  8. + "AoGAEvBFzBNa+7J4PXnRQlYEK/tvsd0bBZX33ceacMubHl6WVZbphltLq+fMTBPP\n"
  9. + "LjXmtpC+aJ7Lvmyl+wTi/TsxE9vxW5JnbuRT48rnZ/Xwq0eozDeEeIBRrpsr7Rvr\n"
  10. + "7ctrgzr4m4yMHq9aDgpxj8IR7oHkfwnmWr0wM3FuiVlj650CQQDineeNZ1hUTkj4\n"
  11. + "D3O+iCi3mxEVEeJrpqrmSFolRMb+iozrIRKuJlgcOs+Gqi2fHfOTTL7LkpYe8SVg\n"
  12. + "e3JxUdVLAkEAxvcZXk+byMFoetrnlcMR13VHUpoVeoV9qkv6CAWLlbMdgf7uKmgp\n"
  13. + "a1Yp3QPDNQQqkPvrqtfR19JWZ4uy1qREmwJALTU3BjyBoH/liqb6fh4HkWk75Som\n"
  14. + "MzeSjFIOubSYxhq5tgZpBZjcpvUMhV7Zrw54kwASZ+YcUJvmyvKViAm9NQJBAKF7\n"
  15. + "DyXSKrem8Ws0m1ybM7HQx5As6l3EVhePDmDQT1eyRbKp+xaD74nkJpnwYdB3jyyY\n"
  16. + "qc7A1tj5J5NmeEFolR0CQQCn76Xp8HCjGgLHw9vg7YyIL28y/XyfFyaZAzzK+Yia\n"
  17. + "akNwQ6NeGtXSsuGCcyyfpacHp9xy8qXQNKSkw03/5vDO\n"
  18. + "-----END RSA PRIVATE KEY-----\n";
  19. let publicPkcs1Str1024: string  =
  20. "-----BEGIN RSA PUBLIC KEY-----\n"
  21. + "MIGJAoGBALAg3eavbX433pOjGdWdpL7HIr1w1EAeIcaCtuMfDpECPdX6X5ZjrwiE\n"
  22. + "h7cO51WXMT2gyN45DCQySr/8cLE2UiUVHo7qlrSatdLA9ETtgob3sJ4qTaBg5Lxg\n"
  23. + "SHy2gC+bvEpuIuRe64yXGuM/aP+ZvmIj9QBIVI9mJD8jLEOvQBBpAgMBAAE=\n"
  24. + "-----END RSA PUBLIC KEY-----\n";
  25. async function TestPkcs1ToPkcs8ByPromise() {
  26. let asyKeyGenerator = cryptoFramework.createAsyKeyGenerator('RSA1024');
  27. let keyPair = await asyKeyGenerator.convertPemKey(publicPkcs1Str1024, priKeyPkcs1Str1024);
  28. let priPemKey = keyPair.priKey;
  29. let pubPemKey = keyPair.pubKey;
  30. let priString = priPemKey.getEncodedPem('PKCS8');
  31. let pubString = pubPemKey.getEncodedPem('X509');
  32. console.info("[promise]TestPkcs1ToPkcs8ByPromise priString output is " + priString);
  33. console.info("[promise]TestPkcs1ToPkcs8ByPromise pubString output is " + pubString);
  34. }
  ```
* 同步返回结果（调用方法[convertPemKeySync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-cryptoframework#convertpemkeysync12)）：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { cryptoFramework } from '@kit.CryptoArchitectureKit';

  3. let priKeyPkcs1Str1024: string  =
  4. "-----BEGIN RSA PRIVATE KEY-----\n"
  5. + "MIICXQIBAAKBgQCwIN3mr21+N96ToxnVnaS+xyK9cNRAHiHGgrbjHw6RAj3V+l+W\n"
  6. + "Y68IhIe3DudVlzE9oMjeOQwkMkq//HCxNlIlFR6O6pa0mrXSwPRE7YKG97CeKk2g\n"
  7. + "YOS8YEh8toAvm7xKbiLkXuuMlxrjP2j/mb5iI/UASFSPZiQ/IyxDr0AQaQIDAQAB\n"
  8. + "AoGAEvBFzBNa+7J4PXnRQlYEK/tvsd0bBZX33ceacMubHl6WVZbphltLq+fMTBPP\n"
  9. + "LjXmtpC+aJ7Lvmyl+wTi/TsxE9vxW5JnbuRT48rnZ/Xwq0eozDeEeIBRrpsr7Rvr\n"
  10. + "7ctrgzr4m4yMHq9aDgpxj8IR7oHkfwnmWr0wM3FuiVlj650CQQDineeNZ1hUTkj4\n"
  11. + "D3O+iCi3mxEVEeJrpqrmSFolRMb+iozrIRKuJlgcOs+Gqi2fHfOTTL7LkpYe8SVg\n"
  12. + "e3JxUdVLAkEAxvcZXk+byMFoetrnlcMR13VHUpoVeoV9qkv6CAWLlbMdgf7uKmgp\n"
  13. + "a1Yp3QPDNQQqkPvrqtfR19JWZ4uy1qREmwJALTU3BjyBoH/liqb6fh4HkWk75Som\n"
  14. + "MzeSjFIOubSYxhq5tgZpBZjcpvUMhV7Zrw54kwASZ+YcUJvmyvKViAm9NQJBAKF7\n"
  15. + "DyXSKrem8Ws0m1ybM7HQx5As6l3EVhePDmDQT1eyRbKp+xaD74nkJpnwYdB3jyyY\n"
  16. + "qc7A1tj5J5NmeEFolR0CQQCn76Xp8HCjGgLHw9vg7YyIL28y/XyfFyaZAzzK+Yia\n"
  17. + "akNwQ6NeGtXSsuGCcyyfpacHp9xy8qXQNKSkw03/5vDO\n"
  18. + "-----END RSA PRIVATE KEY-----\n";
  19. let publicPkcs1Str1024: string  =
  20. "-----BEGIN RSA PUBLIC KEY-----\n"
  21. + "MIGJAoGBALAg3eavbX433pOjGdWdpL7HIr1w1EAeIcaCtuMfDpECPdX6X5ZjrwiE\n"
  22. + "h7cO51WXMT2gyN45DCQySr/8cLE2UiUVHo7qlrSatdLA9ETtgob3sJ4qTaBg5Lxg\n"
  23. + "SHy2gC+bvEpuIuRe64yXGuM/aP+ZvmIj9QBIVI9mJD8jLEOvQBBpAgMBAAE=\n"
  24. + "-----END RSA PUBLIC KEY-----\n";
  25. function TestPkcs1ToPkcs8BySync() {
  26. let asyKeyGenerator = cryptoFramework.createAsyKeyGenerator('RSA1024');
  27. try {
  28. let keyPairData = asyKeyGenerator.convertPemKeySync(publicPkcs1Str1024, priKeyPkcs1Str1024);
  29. if (keyPairData !== null) {
  30. console.info('[Sync]: convert pem key pair success');
  31. } else {
  32. console.error("[Sync]: convert pem key pair result fail!");
  33. }
  34. let priPemKey = keyPairData.priKey;
  35. let pubPemKey = keyPairData.pubKey;
  36. let priString = priPemKey.getEncodedPem('PKCS8');
  37. let pubString = pubPemKey.getEncodedPem('X509');
  38. console.info("[Sync]TestPkcs1ToPkcs8BySync priString output is " + priString);
  39. console.info("[Sync]TestPkcs1ToPkcs8BySync pubString output is " + pubString);
  40. } catch (e) {
  41. console.error(`Sync error, ${e.code}, ${e.message}`);
  42. }
  43. }
  ```