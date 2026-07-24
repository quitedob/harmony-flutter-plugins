

```
1. typedef struct AVPlayerCallback {...} AVPlayerCallback
```

## 概述

PhonePC/2in1TabletTVWearable

包含了OH\_AVPlayerOnInfo和OH\_AVPlayerOnError回调函数指针的集合。应用需注册此实例结构体到OH\_AVPlayer实例中，并对回调上报的信息进行处理，保证AVPlayer的正常运行。

**起始版本：** 11

**废弃版本：** 12

**替代接口：** [OH\_AVPlayerOnInfoCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avplayer-base-h#oh_avplayeroninfocallback) [OH\_AVPlayerOnErrorCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avplayer-base-h#oh_avplayeronerrorcallback)

**相关模块：** [AVPlayer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avplayer)

**所在头文件：** [avplayer\_base.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avplayer-base-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| OH\_AVPlayerOnInfo onInfo | 监控AVPlayer过程信息，参考[OH\_AVPlayerOnInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avplayer-base-h#oh_avplayeroninfo)。  **起始版本：** 11  **废弃版本：** 12  **替代接口：** [OH\_AVPlayerOnInfoCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avplayer-base-h#oh_avplayeroninfocallback) |
| OH\_AVPlayerOnError onError | 监控AVPlayer操作错误，参考[OH\_AVPlayerOnError](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avplayer-base-h#oh_avplayeronerror)。  **起始版本：** 11  **废弃版本：** 12  **替代接口：** [OH\_AVPlayerOnErrorCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avplayer-base-h#oh_avplayeronerrorcallback) |