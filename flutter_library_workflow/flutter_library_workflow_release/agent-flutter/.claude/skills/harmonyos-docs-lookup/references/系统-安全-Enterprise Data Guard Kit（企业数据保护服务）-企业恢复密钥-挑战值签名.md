## 背景

挑战值是一个32字节的随机数，用于防止签名重放攻击。在企业恢复密钥提供[更新企业公钥证书](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/recoverykey-update)和[删除企业恢复密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/recoverykey-delete)场景下，均会使用挑战值来确保签名是企业对当前操作进行授权。签名使用ECC算法，是企业利用企业证书对应的私钥，对挑战值进行签名的。接口传入的挑战值签名必须是只包含原始ECDSA签名值的64字节内容，不能包含任何格式前缀。

## 自定义签名工具类SignUtil生成挑战值的签名

[updateEnterpriseCertificate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#zh-cn_topic_0000001983615174_section1483871653813)和[deleteEnterpriseRecoveryKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataguard-recoverykey#zh-cn_topic_0000001983615174_section1927015514386)在生成挑战值的签名时可使用自定义签名工具类。使用时，请将SignUtil里的privateKey、publicKey，替换为企业的公私钥对。

收起

自动换行

深色代码主题

复制

```
1. import { cryptoFramework } from "@kit.CryptoArchitectureKit";

3. export class SignUtil {
4. public static async signInner(data: Uint8Array) : Promise<Uint8Array> {
5. // 替换成企业的私钥
6. let privateKey: string = "-----BEGIN EC PARAMETERS-----\n" +
7. "************\n" +
8. "-----END EC PARAMETERS-----\n" +
9. "-----BEGIN EC PRIVATE KEY-----\n" +
10. "**********************************************************************"  +
11. "-----END EC PRIVATE KEY-----";
12. // 替换成企业的公钥
13. let publicKey: string = "-----BEGIN PUBLIC KEY-----\n" +
14. "****************************************************************\n" +
15. "************************************************************\n" +
16. "-----END PUBLIC KEY-----\n" +
17. "-----BEGIN CERTIFICATE-----\n" +
18. "****************************************************************\n" +
19. "*******\n" +
20. "-----END CERTIFICATE-----\n";
21. let input1: cryptoFramework.DataBlob = { data };
22. let signAlg = "ECC_BrainPoolP256r1|SHA256";
23. let signer = cryptoFramework.createSign(signAlg);
24. let asyKeyGenerator = cryptoFramework.createAsyKeyGenerator("ECC_BrainPoolP256r1");
25. let keyPair = await asyKeyGenerator.convertPemKey(publicKey, privateKey);
26. await signer.init(keyPair.priKey);
27. let signData = await signer.sign(input1);
28. let verifier = cryptoFramework.createVerify(signAlg);
29. verifier.initSync(keyPair.pubKey);
30. let res = verifier.verifySync(input1, signData);
31. return signData.data;
32. }

34. public static async sign(data: Uint8Array) : Promise<Uint8Array> {
35. let signInnerResult = await SignUtil.signInner(data);
36. let result: Uint8Array = new Uint8Array(64);

38. let index = 0;
39. let length = 0;
40. let offset = 0;
41. while (index < signInnerResult.length) {
42. if (signInnerResult[index] === 0x02) {
43. length = index + 1 < signInnerResult.length ? signInnerResult[index + 1] : 0;
44. let end = index + 2 + length;
45. if (end <= signInnerResult.length) {
46. let copyArr = signInnerResult.subarray(end - 32, end);
47. result.set(copyArr, offset);
48. offset += 32;
49. }
50. index += 34;
51. } else {
52. index++;
53. }
54. }
55. return result;
56. }
57. }
```

## 生成挑战值的签名（更新企业公钥）

在更新企业公钥证书场景下，先获取挑战值，将下面方法中的certificate和ecPubNewStrBase64替换为企业的新证书和新公钥，然后调用自定义工具类SignUtil的sign签名方法生成挑战值的签名。

收起

自动换行

深色代码主题

复制

```
1. import { util } from '@kit.ArkTS';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { recoveryKey } from '@kit.EnterpriseDataGuardKit';
4. import { SignUtil } from './SignUtil';

6. async function updateEnterpriseCertificate() {
7. // 替换成企业的新证书
8. const certificate =
9. "-----BEGIN CERTIFICATE-----\n" +
10. "****************************************************************\n" +
11. "*******\n" +
12. "-----END CERTIFICATE-----\n";

14. const challenge: Uint8Array = await recoveryKey.getAuthChallenge();
15. const buffer = new ArrayBuffer(4);
16. const view = new DataView(buffer);
17. view.setUint32(0, 0x98010000);
18. const command: Uint8Array = new Uint8Array(buffer);
19. // 替换成企业的新公钥
20. const ecPubNewStrBase64 =
21. "****************************************************************\n";
22. let publicKey: Uint8Array = base64ToStringUint8Array(ecPubNewStrBase64);
23. publicKey = publicKey.subarray(publicKey.length - 65, publicKey.length);
24. let signData: Uint8Array = new Uint8Array(challenge.length + command.length + publicKey.length);
25. signData.set(challenge, 0);
26. signData.set(command, challenge.length);
27. signData.set(publicKey, challenge.length + command.length);
28. let signature: Uint8Array = await SignUtil.sign(signData);

30. const cert: Uint8Array = stringToUint8(certificate!);
31. recoveryKey.updateEnterpriseCertificate(signature, cert).then((ret: number) => {
32. console.info(`Succeeded in updating certificate.`);
33. }).catch((error: BusinessError) => {
34. console.error(`Failed to update certificate. Code: ${error.code}, message: ${error.message}.`);
35. });
36. }

38. function stringToUint8(str: string): Uint8Array {
39. let result: Uint8Array = new Uint8Array([]);
40. try {
41. result = new util.TextEncoder('utf-8').encodeInto(str);
42. } catch (error) {
43. console.error(`Failed to encode to uint8. Code: ${error.code}, message: ${error.message}`);
44. }
45. return result;
46. }

48. function base64ToStringUint8Array(base64String: string): Uint8Array {
49. let base64 = new util.Base64Helper();
50. let uint8Array = base64.decodeSync(base64String, util.Type.BASIC);
51. return uint8Array;
52. }
```

## 生成挑战值的签名（删除企业恢复密钥）

在删除企业恢复密钥场景下，先获取挑战，然后调用自定义工具类SignUtil的sign签名方法生成挑战值的签名。

收起

自动换行

深色代码主题

复制

```
1. import { BusinessError, osAccount } from '@kit.BasicServicesKit';
2. import { recoveryKey } from '@kit.EnterpriseDataGuardKit';
3. import { SignUtil } from './SignUtil';

5. async function deleteEnterpriseRecoveryKey() {
6. const challenge: Uint8Array = await recoveryKey.getAuthChallenge();
7. let signResult = await SignUtil.sign(challenge);
8. let accountManager: osAccount.AccountManager = osAccount.getAccountManager();
9. let userId = await accountManager.getOsAccountLocalId();
10. recoveryKey.deleteEnterpriseRecoveryKey(userId, signResult).then((ret: number) => {
11. console.info(`Succeeded in deleting enterprise recovery key.`);
12. }).catch((err: BusinessError) => {
13. console.error(`Failed to delete enterprise recovery key. Code: ${err.code}, message: ${err.message}.`);
14. });
15. }
```