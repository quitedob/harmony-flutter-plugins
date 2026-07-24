## 使用场景

本地化的关键操作是资源文件的翻译，为提升翻译可行性在开发过程中应避免硬编码与拼接。

与从外部获取数据或在运行时动态生成数据不同，硬编码是将数据、参数或常量直接写入程序代码中，从而实现特定功能。在界面中显示的文字，包括图片中的文字、音频、字幕等，不能采用硬编码，避免难以本地化或增加本地化的工作量。同时，界面上的一句完整文本，不应由多个片段直接前后拼接而成，这可能导致翻译时无法获取句子完整信息，从而导致翻译错误或语义表达顺序问题。例如，下图中将“Rain tomorrow”和“Bring an umbrella”两句直接拼接在一起，造成语句大小写问题。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1c/v3/lVICPKMzTDyBIV8kngnrWQ/zh-cn_image_0000002571291877.png?HW-CC-KV=V1&HW-CC-Date=20260414T055335Z&HW-CC-Expire=86400&HW-CC-Sign=2336595BF253DBFB2C0DFDAD6BB5CBD92F6FDEE109CF5F732B57EC396BA76494)

## 约束与限制

1. 避免使用硬编码，将需要翻译的字符串提取到资源文件中，与代码分离，然后使用相关的接口加载，具体请参考[提供多语言资源](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/l10n-multilingual-resources)。
2. 避免字符串直接拼接，若语句存在变化部分（如“打开视频”和“打开浏览器”，变化部分是“视频”和“浏览器”），对应变量应使用占位标识，呈现完整的语句表达。

   资源占位符示例：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "name": "string1",
   3. "value": "打开%s"
   4. }
   ```