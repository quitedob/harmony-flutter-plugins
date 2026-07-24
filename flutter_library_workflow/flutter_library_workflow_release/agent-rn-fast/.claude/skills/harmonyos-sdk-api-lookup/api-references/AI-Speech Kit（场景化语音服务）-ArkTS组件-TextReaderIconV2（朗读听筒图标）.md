朗读听筒图标，可以作为动态组件加载，并配置成为播放面板的主入口。

在应用使用ArkTS的[状态管理V1装饰器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-state-management-v1)时，需要通过[TextReaderIcon](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/speech-textreadericon)组件接口拉起朗读听筒图标；在应用使用[状态管理V2装饰器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-state-management-v2)时，需要通过TextReaderIconV2组件接口拉起朗读听筒图标。

**起始版本：** 6.1.1(24)

## 导入模块

PhonePC/2in1Tablet



```
1. import { TextReaderIconV2 } from '@kit.SpeechKit';
```

## UpReadState

PhonePC/2in1Tablet

type UpReadState = (readState:ReadStateCode)=>void

用于听筒图标组件触发父组件状态更新的回调函数。

**元服务API：** 从版本6.1.1(24)开始，该接口支持在元服务中使用。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.AI.Component.TextReader

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| readState | [ReadStateCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/speech-readstatecode) | 是 | 播报状态。 |

## TextReaderIconV2

PhonePC/2in1Tablet

朗读听筒图标，可以作为动态组件加载。设置onClick回调，在用户点击听筒图标时启动朗读控件。

**装饰器类型：** @ComponentV2

**元服务API：** 从版本6.1.1(24)开始，该接口支持在元服务中使用。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.AI.Component.TextReader

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 类型 | 必填 | 装饰器类型 | 说明 |
| --- | --- | --- | --- | --- |
| readState | [ReadStateCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/speech-readstatecode) | 是 | @Param | 播报状态。  **说明：**  readState使用[@Param装饰器：父子单向同步](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-param)。 |
| upReadState | [UpReadState](/consumer/cn/doc/harmonyos-references/speech-textreadericonv2#upreadstate) | 是 | @Event | 回调函数，更新播报状态。  **说明：**  upReadState使用[@Event装饰器：子组件通过回调函数触发父组件状态更新](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-event)。 |

### build

PhonePC/2in1Tablet

build(): void

用于创建[TextReaderIconV2](/consumer/cn/doc/harmonyos-references/speech-textreadericonv2#textreadericonv2)对象的构造函数。

**元服务API：** 从版本6.1.1(24)开始，该接口支持在元服务中使用。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.AI.Component.TextReader

**起始版本：** 6.1.1(24)

**示例：**



```
1. import  {TextReader,ReadStateCode,TextReaderIconV2, UpReadState} from '@kit.SpeechKit'

3. @Entry
4. @ComponentV2
5. struct Index {

7. /**
8. * 待加载的文章
9. */
10. @Local readInfoList: TextReader.ReadInfo[] = [];
11. @Local selectedReadInfo: TextReader.ReadInfo = this.readInfoList[0];

13. /**
14. * 播放状态
15. */
16. @Local readState: ReadStateCode = ReadStateCode.WAITING;

18. /**
19. * 用于显示当前页的按钮状态
20. */
21. @Local isInit: boolean = false;

23. async aboutToAppear(){
24. /**
25. * 加载数据
26. */
27. let readInfoList: TextReader.ReadInfo[] = [{
28. id: '001',
29. title: {
30. text:'水调歌头.明月几时有',
31. isClickable:true
32. },
33. author:{
34. text:'宋.苏轼',
35. isClickable:true
36. },
37. date: {
38. text:'2024/01/01',
39. isClickable:false
40. },
41. bodyInfo: '明月几时有？把酒问青天。'
42. }];
43. this.readInfoList = readInfoList;
44. this.selectedReadInfo = this.readInfoList[0];
45. this.init();
46. }

48. /**
49. * 初始化
50. */
51. async init() {
52. const readerParam: TextReader.ReaderParam = {
53. isVoiceBrandVisible: true,
54. businessBrandInfo: {
55. panelName: '小艺朗读',
56. panelIcon: $r('app.media.startIcon')
57. }
58. }
59. try {
60. let context: Context | undefined = this.getUIContext().getHostContext()
61. if (context) {
62. await TextReader.init(context, readerParam);
63. this.isInit = true;
64. }
65. } catch (err) {
66. console.error(`TextReader failed to init. Code: ${err.code}, message: ${err.message}`);
67. }
68. }

70. // 设置操作监听
71. setActionListener() {
72. TextReader.on('stateChange', (state: TextReader.ReadState) => {
73. this.onStateChanged(state)
74. });
75. TextReader.on('requestMore', () => this.onStateChanged);
76. }

78. onStateChanged = (state: TextReader.ReadState) => {
79. if (this.selectedReadInfo?.id === state.id) {
80. this.readState = state.state;
81. } else {
82. this.readState = ReadStateCode.WAITING;
83. }
84. }

86. updateReadState: UpReadState = (readState: ReadStateCode) => {
87. this.readState = readState
88. console.info(`TextReader new readState:${readState}`)
89. }

91. build() {
92. Column() {
93. TextReaderIconV2({ readState: this.readState,upReadState:this.updateReadState})
94. .margin({ right: 20 })
95. .width(32)
96. .height(32)
97. .onClick(async () => {
98. try {
99. this.setActionListener();
100. await TextReader.start(this.readInfoList, this.selectedReadInfo?.id);
101. } catch (err) {
102. console.error(`TextReader failed to start. Code: ${err.code}, message: ${err.message}`);
103. }
104. })
105. }
106. .height('100%')
107. }
108. }
```