## 概述

PhonePC/2in1TabletTVWearable

定义音视频元数据键。

**引用文件：** <multimedia/player\_framework/avmetakeys.h>

**库：** libavmedia\_base.so

**系统能力：** SystemCapability.Multimedia.Media.Core

**起始版本：** 23

**相关模块：** [AVMediaBase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-avmediabase)

## 汇总

PhonePC/2in1TabletTVWearable

### 变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| const char \* OH\_AVMETA\_KEY\_TRACK\_INDEX | 轨道索引，值类型为int32\_t。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_TRACK\_TYPE | 轨道类型，值类型为int32\_t。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_MIME\_TYPE | 编解码器MIME类型，值类型为字符串（string）。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_DURATION | 媒体时长（单位：微秒），值类型为int64\_t。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_BITRATE | 比特率（单位：bps），值类型为int64\_t。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_FRAME\_RATE | 视频帧率（每100秒的帧数），值类型为double。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_WIDTH | 视频宽度，值类型为int32\_t。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_HEIGHT | 视频高度，值类型为int32\_t。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_CHANNEL\_COUNT | 音频声道数，值类型为int32\_t。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_SAMPLE\_RATE | 音频采样率（Hz），值类型为int32\_t。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_SAMPLE\_DEPTH | 音频采样位深（bit depth），值类型为int32\_t。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_LANGUAGE | 语言标识，值类型为字符串（string）。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_TRACK\_NAME | 轨道名称，值类型为字符串（string）。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_HDR\_TYPE | HDR类型，值类型为int32\_t。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_ORIGINAL\_WIDTH | 原始视频宽度，值类型为int32\_t。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_ORIGINAL\_HEIGHT | 原始视频高度，值类型为int32\_t。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_REF\_TRACK\_IDS | 被引用的轨道ID列表，仅用于元数据提取器。  **起始版本：** 23 |
| const char \* OH\_AVMETA\_KEY\_TRACK\_REF\_TYPE | 轨道引用类型，仅用于元数据提取器。  **起始版本：** 23 |