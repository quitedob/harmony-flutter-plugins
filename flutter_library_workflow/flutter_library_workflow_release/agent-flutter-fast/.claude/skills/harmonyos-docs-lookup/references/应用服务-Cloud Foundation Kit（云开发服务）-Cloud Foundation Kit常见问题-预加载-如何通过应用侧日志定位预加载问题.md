预加载的日志进程为“clouddevelopproxy”，日志过滤选择“No filters”。

下文列举几种场景下的日志提示信息：

* 场景一：系统服务在应用安装期间预加载数据成功

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a3/v3/v7zp8IDEQ5yIiXVbQ8fanw/zh-cn_image_0000002440934316.png?HW-CC-KV=V1&HW-CC-Date=20260414T030009Z&HW-CC-Expire=86400&HW-CC-Sign=F88ABE9A00B610EAE09D6B869B7A9BFF01982BA3F5D8A7E19E53997F57EE5297)

  预加载数据成功时日志会提示：http onSuccess code: 200，并且提示预加载的数据大小：get rsp data, len 47（单位为字节）。
* 场景二：应用调用getPrefetchResult接口获取预加载数据成功

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/72/v3/T2nPpVz6RCuU_Ez8d_cIGA/zh-cn_image_0000002474174457.png?HW-CC-KV=V1&HW-CC-Date=20260414T030009Z&HW-CC-Expire=86400&HW-CC-Sign=AC181736F6CB876B6D1A960BF72364A0E45218C51CAB9E01F6D6870E14F2841C)

  数据获取成功时，无Error级别日志，会提示OnGetPreloadCache: end status:0。
* 场景三：应用调用getPrefetchResult接口获取预加载数据失败

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5f/v3/lb30XOz0TP2cH-QNrxP-DQ/zh-cn_image_0000002440774464.png?HW-CC-KV=V1&HW-CC-Date=20260414T030009Z&HW-CC-Expire=86400&HW-CC-Sign=7C223869051BA0F391D286E14BFFEE7EEFD672C8B80AB4D16A48908BE2D09600)

  **问题现象**

  数据获取失败时，存在Error级别日志，会提示GetPreloadData get cache fail。

  **解决措施**

  出现此问题，可按照如下步骤排查和解决：

  1. 检查系统服务在应用安装期间预加载数据的日志。如果打印日志与上文场景一提示的日志信息不一致，则继续执行后续步骤。
  2. 确认是否存在多次调用安装预加载接口问题。安装预加载接口不支持多次调用。
  3. 排除以上原因后，检查日志中是否出现“appid \*\*\*\* is not in white list, to skip”或者“XXX Read timed out”。如果出现，请参考[运行应用时提示“appid \*\*\*\* is not in white list, to skip”](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-faq-3)或者[运行应用时报“XXX Read timed out”异常](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-faq-4)解决。