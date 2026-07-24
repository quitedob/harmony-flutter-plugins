## 申请权限

应用在使用Ads Kit能力前，需要检查是否已经获取对应权限。如未获得授权，需要声明对应权限。

Ads Kit所需的权限有：

* ohos.permission.INTERNET：用于请求和展示广告、回传竞价结果。
* ohos.permission.APP\_TRACKING\_CONSENT：用于获取开放匿名设备标识符。

在模块的module.json5中配置所需申请的权限，其中跨应用关联权限[ohos.permission.APP\_TRACKING\_CONSENT](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/permissions-for-all-user#ohospermissionapp_tracking_consent)为user\_grant权限，reason和abilities标签必填，配置方式参见[requestPermissions标签说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions#在配置文件中声明权限)。

示例代码如下所示：

收起

自动换行

深色代码主题

复制

```
1. {
2. "module": {
3. "requestPermissions": [
4. {
5. "name": "ohos.permission.APP_TRACKING_CONSENT",
6. "reason": "$string:reason",
7. "usedScene": {
8. "abilities": [
9. "EntryAbility"
10. ],
11. "when": "inuse"
12. }
13. },
14. {
15. "name": "ohos.permission.INTERNET"
16. }
17. ]
18. }
19. }
```