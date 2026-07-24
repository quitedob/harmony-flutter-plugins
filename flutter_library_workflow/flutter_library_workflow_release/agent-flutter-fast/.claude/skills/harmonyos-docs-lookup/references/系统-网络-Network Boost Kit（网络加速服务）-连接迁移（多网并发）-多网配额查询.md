## 场景介绍

由于多网络加速受到配额的管控，应用可以获取当前剩余的多网并发配额信息，合理分配使用多网络加速的次数和时长。应用配额以24小时的周期进行刷新。配额（次数或时长）耗尽会限制使用，此时请求多网会抛出错误码，24小时后会重新分配。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/networkboost-nethandover#section47829529513)。

展开

| 接口名 | 描述 |
| --- | --- |
| getMultiPathQuotaStats(): MultiPathQuota | 获取多网配额。 |

## 开发步骤

1. 导入Network Boost Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { netHandover } from '@kit.NetworkBoostKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 获取多网配额。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. let multiquota : netHandover.MultiPathQuota = netHandover.getMultiPathQuotaStats();
   3. // 已使用配额次数
   4. console.info('getMultiPathQuotaStats multiPathQuota.used.count is:' + multiquota.used.count)
   5. // 已使用配额时间，单位为秒
   6. console.info('getMultiPathQuotaStats multiPathQuota.used.duration is:' + multiquota.used.duration)
   7. // 剩余配额次数
   8. console.info('getMultiPathQuotaStats multiPathQuota.remaining.count is:' + multiquota.remaining.count)
   9. // 剩余配额时间，单位为秒
   10. console.info('getMultiPathQuotaStats multiPathQuota.remaining.durationis:' + multiquota.remaining.duration)
   11. } catch (err) {
   12. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
   13. }
   ```