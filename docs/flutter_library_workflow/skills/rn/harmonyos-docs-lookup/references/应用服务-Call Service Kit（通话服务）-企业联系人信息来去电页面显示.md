本功能仅供企业应用开发者接入。

## 场景介绍

来去电时，页面显示已安装企业应用的联系人信息，方便用户识别来去电人信息，快速回应，增强企业内部沟通效率。

说明

来去电页面或横幅仅展示一个联系人信息，对于多个应用里存在相同联系人的情况，按照应用包名的字典序排序，展示首个查询结果。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/callservicekit-callerinfoquery-extension-ability#section1220554318191)。

展开

| 接口名 | 描述 |
| --- | --- |
| onQueryCallerInfo(phoneNumber: string)：Promise<CallerInfo> | 查询联系人信息接口 |

## 申请接入

企业来电显示能力使用受限，如需接入，需要在AGC网站申请对应权限。

1.登录[AGC网站](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/)，选择“开发与服务”。

2.在项目列表选择项目，并在应用列表下选择需要申请企业来电显示的应用。

3.进入“项目设置 > 开放能力管理”页面，点击“企业来电显示”对应的“申请”。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fc/v3/aJuiGPE4QnSFcHwzXrru_Q/zh-cn_image_0000002565984161.png?HW-CC-KV=V1&HW-CC-Date=20260414T025616Z&HW-CC-Expire=86400&HW-CC-Sign=9A7BC59BD4A3A4880E30FDB62FF033269249772FC0CAE1D531306EDEF3F4D077 "点击放大")

4.请根据实际业务需求在弹框中填写对应信息，完成后，点击右上角“提交”，提交后将在3个工作日内回复。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2c/v3/zjGhU-W3SPulVN5PKkjGNQ/zh-cn_image_0000002566064189.png?HW-CC-KV=V1&HW-CC-Date=20260414T025616Z&HW-CC-Expire=86400&HW-CC-Sign=37BA1CE661BCFDD771C7525E809CC09824E3F71B27A3BB4C31733963145EC49B "点击放大")

## 替换调试Profile

当企业联系人信息来去电页面显示能力申请成功后，需要重新[申请调试Profile](https://developer.huawei.com/consumer/cn/doc/app/agc-help-add-debugprofile-0000001914423102)。并且在DevEco Studio中替换新申请的调试Profile。

## 开发步骤

1. 在工程内创建一个ExtensionAbility类型的自定义组件并继承[CallerInfoQueryExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/callservicekit-callerinfoquery-extension-ability#section534615186553)，完成onQueryCallerInfo方法的复写。

   说明：

   由于调用onQueryCallerInfo方法时，系统先创建应用的AbilityStage实例，请勿在AbilityStage中添加过于复杂耗时的逻辑，避免调用超时。

   代码示例：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { CallerInfoQueryExtensionAbility, CallerInfo } from '@kit.CallServiceKit';

   3. export default class EntryCallerInfoQueryExtAbility extends CallerInfoQueryExtensionAbility {
   4. // 来去电时由系统通话应用主动调用该接口查询企业联系人信息
   5. onQueryCallerInfo(phoneNumber: string): Promise<CallerInfo> {
   6. return new Promise<CallerInfo>((resolve, reject) => {
   7. let isSuccess = true;
   8. // 在此处实现根据号码查询企业联系人的业务逻辑
   9. if (isSuccess) {
   10. // 查询成功，返回结果
   11. resolve({
   12. contactName:"xxxx",
   13. employeeId:"xxxx",
   14. department:"xxxx",
   15. position:"xxxx"
   16. });
   17. } else {
   18. // 查询失败，返回错误原因
   19. reject("error reason");
   20. }
   21. });
   22. }
   23. }
   ```
2. 在应用配置文件module.json5中注册extensionAbilities，具体详见[module.json5配置](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file)。

   配置文件示例：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "extensionAbilities": [
   3. {
   4. "name": "EntryCallerInfoQueryExtAbility",
   5. "srcEntry": "./ets/callerinfoquery/EntryCallerInfoQueryExtAbility.ets",
   6. "type": "callerInfoQuery"
   7. }
   8. ]
   9. }
   ```

   * type标签需设为"callerInfoQuery"，表示该拓展类型为CallerInfoQueryExtensionAbility。
   * srcEntry标签表示上述ExtensionAbility组件所对应的代码路径。
3. 在调试设备上，前往“电话”，点击右上角的“更多”图标，前往“设置”>“陌生号码和信息识别”，打开对应企业应用的号码识别功能开关，进行调试。