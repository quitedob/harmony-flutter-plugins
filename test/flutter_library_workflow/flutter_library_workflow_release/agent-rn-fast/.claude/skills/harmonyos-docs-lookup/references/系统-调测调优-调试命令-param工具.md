param是为开发人员提供用于操作系统参数的工具，该工具只支持标准系统。

## 环境要求

* 获取hdc工具，执行hdc shell。
* 正常连接设备。

## param工具命令列表

展开

| 选项 | 说明 |
| --- | --- |
| -h | 获取param支持的命令。 |
| ls [-r] [name] | 显示匹配name的系统参数信息。带"-r"则根据参数权限获取信息，不带"-r"则直接获取参数信息。 |
| get [name] | 获取指定name系统参数的值；若不指定任何name，则返回所有系统参数。 |
| set name value | 设置指定name系统参数的值为value。 |
| wait name [value] [timeout] | 同步等待指定name系统参数与指定值value匹配。value支持模糊匹配，如"\*"表示任何值，"val\*"表示只匹配前三个val字符。timeout为等待时间（单位：s），不设置则默认为30s。 |
| save | 保存persist参数到工作空间。 |

## 获取param支持的命令

* 获取param支持的命令，命令格式如下：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. param -h
  ```

## 获取系统参数信息

* 显示匹配name的系统参数信息，命令格式如下：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. param ls [-r] [name]
  ```

  **示例**

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ac/v3/XIvI-LbmQxm0wLqCT8kVyw/zh-cn_image_0000002540612016.png?HW-CC-KV=V1&HW-CC-Date=20260414T050939Z&HW-CC-Expire=86400&HW-CC-Sign=CF4C355788830650B57C8BC558F8D08124FD3D951B51188639BDBFA28E679343)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/18/v3/Am6suZvrTCiHh1ff1gDqsg/zh-cn_image_0000002571172011.png?HW-CC-KV=V1&HW-CC-Date=20260414T050939Z&HW-CC-Expire=86400&HW-CC-Sign=DBBF23CF070926F4EA720182D58EDA79E036125ED0351D0F0D8A3A82598B68B7)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cf/v3/EsrlrTygSn-lu_uFUi_2Lg/zh-cn_image_0000002540771670.png?HW-CC-KV=V1&HW-CC-Date=20260414T050939Z&HW-CC-Expire=86400&HW-CC-Sign=9C5C07BDDB543D5F984E40F2E2BBF892B49F3D5E8D461736A8559D70A99049F0)

## 获取系统参数的值

* 获取指定name系统参数的值，命令格式如下：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. param get [name]
  ```

  **示例**

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fc/v3/anIgOlDBRQ6OfDabW3y27A/zh-cn_image_0000002571291965.png?HW-CC-KV=V1&HW-CC-Date=20260414T050939Z&HW-CC-Expire=86400&HW-CC-Sign=5E6B8DA67AABEC76DAEED9EF375607D91F8B8A3BD509523CFE715094B05EF9FA)

## 设置系统参数的值

* 设置指定name系统参数的值为value，命令格式如下：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. param set name value
  ```

  **示例**

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b2/v3/Hg40uXwWSXSqZrrHyxm4zw/zh-cn_image_0000002540612018.png?HW-CC-KV=V1&HW-CC-Date=20260414T050939Z&HW-CC-Expire=86400&HW-CC-Sign=D63BC6FD4BC221AA3114A70FA2412A2BF89C96B175869D08F900F43BD827983B)

## 等待系统参数值匹配

* 同步等待指定name系统参数与指定值value匹配，命令格式如下：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. param wait name [value] [timeout]
  ```

  **示例**

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bb/v3/I1nGmF8YQTOYuRZHaQF36A/zh-cn_image_0000002571172013.png?HW-CC-KV=V1&HW-CC-Date=20260414T050939Z&HW-CC-Expire=86400&HW-CC-Sign=FB4B0D16129248BC7204334BAE918A5AEB95366175540DE5A13BA5D7924742E2)

## 保存persist(可持久化)参数

* 保存persist(可持久化)参数到工作空间，命令格式如下：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. param save
  ```

  **示例**

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2c/v3/wf7_3y6STqK-86wtW8rh0Q/zh-cn_image_0000002540771672.png?HW-CC-KV=V1&HW-CC-Date=20260414T050939Z&HW-CC-Expire=86400&HW-CC-Sign=6757C44EEB183C134F579BD993E84E0F5EFBED8F489D200C4868D17F3A656B76)