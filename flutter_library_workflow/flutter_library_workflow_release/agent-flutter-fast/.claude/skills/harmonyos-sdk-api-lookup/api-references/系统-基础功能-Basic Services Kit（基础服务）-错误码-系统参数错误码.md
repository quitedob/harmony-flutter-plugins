说明

以下仅介绍本模块特有错误码，通用错误码请参考[通用错误码说明文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

## 14700103 操作权限被拒绝

PhonePC/2in1TabletTVWearable

**错误信息**

The operation on the system permission is denied.

**错误描述**

应用没有对应字段的权限时，系统会报此错误码。比如ohos.permission.sec.ACCESS\_UDID权限。

**可能原因**

应用没有配置需要的权限，比如ohos.permission.sec.ACCESS\_UDID。

**处理步骤**

添加相应的权限。