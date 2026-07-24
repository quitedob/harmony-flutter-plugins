说明

本模块首批接口从API version 7开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

展开

| 名称 | 类型 | 只读 | 说明 |
| --- | --- | --- | --- |
| DEFAULT\_VOLUME\_GROUP\_ID9+ | number | 是 | 默认音量组id。  **系统能力：** SystemCapability.Multimedia.Audio.Volume |
| DEFAULT\_INTERRUPT\_GROUP\_ID9+ | number | 是 | 默认音频中断组id。  **系统能力：** SystemCapability.Multimedia.Audio.Interrupt |

**示例：**



```
1. import { audio } from '@kit.AudioKit';

3. const defaultVolumeGroupId = audio.DEFAULT_VOLUME_GROUP_ID;
4. const defaultInterruptGroupId = audio.DEFAULT_INTERRUPT_GROUP_ID;
```