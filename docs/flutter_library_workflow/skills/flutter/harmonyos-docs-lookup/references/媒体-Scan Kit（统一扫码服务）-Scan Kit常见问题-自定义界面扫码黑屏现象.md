**问题现象**

自定义启动相机却显示黑屏现象。

**解决措施**

* 权限校验错误码：201，没有申请相机权限，[向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。
* 参考ArkTS API错误码[1000500001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-error-code#section13010304159)：
  1. 没有初始化customScan.[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section447114223245)。
  2. 前后台相互切换逻辑错误：切换至后台时，在页面生命周期onPageHide中先暂停并释放相机流（customScan.[stop](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section6949611114915)、customScan.[release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section1109456134917)）。重新切换到前台后，在页面生命周期onPageShow中再重启相机流（customScan.[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-customscan-api#section747366165913)）。