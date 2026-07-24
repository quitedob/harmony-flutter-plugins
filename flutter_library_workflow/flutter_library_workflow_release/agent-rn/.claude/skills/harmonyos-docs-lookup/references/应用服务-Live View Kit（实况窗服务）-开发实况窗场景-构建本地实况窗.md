## 简介

开发者可以通过[liveViewManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager)模块构建本地实况窗，完成实况窗的整个生命周期流程（包括创建、更新与结束）。请注意，只有应用在前台运行，即用户实际使用应用并且产生了服务合约的情况下，开发者才可以创建实况窗；与此同时，本地更新或结束实况窗依赖于开发者的应用进程，所以我们更推荐开发者在本地创建实况窗后使用Push Kit更新或结束实况窗。

说明

Live View Kit提供了“出行打车/即时配送/航班/高铁火车/排队叫号/取餐/赛事比分/共享租赁/计时/运动锻炼/导航”共11个场景的包含实况窗整个生命周期流程的示例代码，如开发者想在正式开发实况窗前先行体验效果，请参考[实况窗SampleCode](https://gitcode.com/HarmonyOS_Samples/live-view-kit_-sample-code_-clientdemo_-arkts)。

## 导入liveViewManager

在项目中导入[liveViewManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager)，并新建实况窗控制类（例如LiveViewController），构造isLiveViewEnabled()方法，用于校验实况窗开关（设置>应用和元服务>应用名>实况窗）是否打开。打开实况窗开关是创建实况窗的前提条件。示例代码如下：

收起

自动换行

深色代码主题

复制

```
1. import { liveViewManager } from '@kit.LiveViewKit';

3. export class LiveViewController {
4. private static async isLiveViewEnabled(): Promise<boolean> {
5. return await liveViewManager.isLiveViewEnabled();
6. }
7. }
```

## 创建实况窗

实况窗根据扩展区不同共有5种样式模板：进度可视化模板、强调文本模板、左右文本模板、赛事比分模板和导航模板。

调用[liveViewManager.startLiveView](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section195321751104612)创建实况窗，该API接口传入参数为实况窗实例（liveViewManager.[LiveView](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section411410371767)）。

### 进度可视化模板

进度可视化模板适用于打车、外卖等场景。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bc/v3/vo_X2Sb9S0Oy_QygIVyi9g/zh-cn_image_0000002488515554.png?HW-CC-KV=V1&HW-CC-Date=20260414T031329Z&HW-CC-Expire=86400&HW-CC-Sign=4AD8C854722AB79ADF9F190345203F0DB386044540D03AD8658071002237ACA0 "点击放大")

示例代码如下：

构建LiveViewController后，请在代码中初始化LiveViewController并调用LiveViewController.startLiveView()方法。

收起

自动换行

深色代码主题

复制

```
1. import { liveViewManager } from '@kit.LiveViewKit';
2. import { Want, wantAgent } from '@kit.AbilityKit';

4. export class LiveViewController {
5. public async startLiveView(): Promise<liveViewManager.LiveViewResult> {
6. // 校验实况窗开关是否打开
7. if (!await LiveViewController.isLiveViewEnabled()) {
8. throw new Error("Live view is disabled.");
9. }
10. // 创建实况窗
11. const defaultView = await LiveViewController.buildDefaultView();
12. return await liveViewManager.startLiveView(defaultView);
13. }

15. private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
16. return {
17. // 构造实况窗请求体
18. id: 0, // 实况窗ID，开发者生成。
19. event: "DELIVERY", // 实况窗的应用场景。DELIVERY：即时配送（外卖、生鲜）
20. liveViewData: {
21. primary: {
22. title: "骑手已接单",
23. content: [
24. { text: "距商家 " },
25. { text: "300 ", textColor: "#FF0A59F7" },
26. { text: "米 | " },
27. { text: "3 ", textColor: "#FF0A59F7" },
28. { text: "分钟到店" }
29. ], // 设置textColor字段时，所有拥有textColor字段的对象仅能设置同一种颜色，不设置textColor时，默认展示#FF000000
30. keepTime: 15,
31. clickAction: await LiveViewController.buildWantAgent(),
32. layoutData: {
33. layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
34. progress: 40,
35. color: "#FF317AF7",
36. backgroundColor: "#f7819ae0",
37. indicatorType: liveViewManager.IndicatorType.INDICATOR_TYPE_UP,
38. indicatorIcon: "indicator.png", // 进度条指示器图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
39. lineType: liveViewManager.LineType.LINE_TYPE_DOTTED_LINE,
40. nodeIcons: ["icon_1.png", "icon_2.png", "icon_3.png"] // 进度条每个节点图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
41. }
42. }
43. }
44. };
45. }

47. private static async isLiveViewEnabled(): Promise<boolean> {
48. return await liveViewManager.isLiveViewEnabled();
49. }

51. private static async buildWantAgent(): Promise<Want> {
52. const wantAgentInfo: wantAgent.WantAgentInfo = {
53. wants: [
54. {
55. bundleName: 'xxx.xxx.xxx', // 应用实际bundleName
56. abilityName: 'EntryAbility'
57. } as Want
58. ],
59. actionType: wantAgent.OperationType.START_ABILITIES,
60. requestCode: 0,
61. actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
62. };
63. const agent = await wantAgent.getWantAgent(wantAgentInfo);
64. return agent;
65. }
66. }
```

从6.0.2(22)开始，使用进度可视化模板，传入雨、雪类型天气参数，实况卡片支持显示雨、雪天气动效背景。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b5/v3/ua0qqk7ASYajsfkdMzYF2A/zh-cn_image_0000002500882498.png?HW-CC-KV=V1&HW-CC-Date=20260414T031329Z&HW-CC-Expire=86400&HW-CC-Sign=4B0DFF34895D0DEAABAB708D2B3CDDB0E309BC327166625D83F735A18118B880)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7e/v3/K--_F2KzQ_iOsWcRujSDEg/zh-cn_image_0000002532644131.png?HW-CC-KV=V1&HW-CC-Date=20260414T031329Z&HW-CC-Expire=86400&HW-CC-Sign=018C5F378B2D6CF3CF9E2724B2E5F5D93ADBDBBBE7E60074E4BEFCD7D3DBFC95)

代码示例如下：

构建LiveViewController后，请在代码中初始化LiveViewController并调用LiveViewController.startLiveView()方法。

收起

自动换行

深色代码主题

复制

```
1. import { liveViewManager } from '@kit.LiveViewKit';
2. import { Want, wantAgent } from '@kit.AbilityKit';

4. export class LiveViewController {
5. public async startLiveView(): Promise<liveViewManager.LiveViewResult> {
6. // 校验实况窗开关是否打开
7. if (!await LiveViewController.isLiveViewEnabled()) {
8. throw new Error("Live view is disabled.");
9. }
10. // 创建实况窗
11. const defaultView = await LiveViewController.buildDefaultView();
12. return await liveViewManager.startLiveView(defaultView);
13. }

15. private static async buildDefaultView() : Promise < liveViewManager.LiveView > {
16. return {
17. // 构造实况窗请求体
18. id: 0, // 实况窗ID，开发者生成。
19. event: "DELIVERY", // 实况窗的应用场景。DELIVERY：即时配送（外卖、生鲜）
20. liveViewData: {
21. primary: {
22. title: "骑手已接单",
23. content: [
24. { text: "距商家 " },
25. { text: "300 ", textColor: "#FF0A59F7" },
26. { text: "米 | " },
27. { text: "3 ", textColor: "#FF0A59F7" },
28. { text: "分钟到店" }
29. ], // 设置textColor字段时，所有拥有textColor字段的对象仅能设置同一种颜色，不设置textColor时，默认展示#FF000000
30. keepTime: 15,
31. clickAction: await LiveViewController.buildWantAgent(),
32. layoutData: {
33. layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
34. weatherInfo : {
35. weatherType : liveViewManager.WeatherType.WEATHER_TYPE_LIGHT_RAIN,
36. locationType : liveViewManager.WeatherLocationType.LOCATION_TYPE_LOCAL,
37. },
38. progress: 40,
39. color: "#FF317AF7",
40. backgroundColor: "#f7819ae0",
41. indicatorType: liveViewManager.IndicatorType.INDICATOR_TYPE_UP,
42. indicatorIcon: "indicator.png", // 进度条指示器图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
43. lineType: liveViewManager.LineType.LINE_TYPE_DOTTED_LINE,
44. nodeIcons: ["icon_1.png", "icon_2.png", "icon_3.png"] // 进度条每个节点图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
45. }
46. }
47. }
48. };
49. }

51. private static async isLiveViewEnabled(): Promise<boolean> {
52. return await liveViewManager.isLiveViewEnabled();
53. }

55. public static async buildWantAgent(): Promise<Want> {
56. const wantAgentInfo: wantAgent.WantAgentInfo = {
57. wants: [
58. {
59. bundleName: 'xxx.xxx.xxx', // 应用实际bundleName
60. abilityName: 'EntryAbility'
61. } as Want
62. ],
63. actionType: wantAgent.OperationType.START_ABILITIES,
64. requestCode: 0,
65. actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
66. };
67. const agent = await wantAgent.getWantAgent(wantAgentInfo);
68. return agent;
69. }
70. }
```

### 强调文本模板

强调文本模板适用于取餐、排队等场景。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/77/v3/qBQN64VbRMWY9DIB0agfsA/zh-cn_image_0000002520755359.png?HW-CC-KV=V1&HW-CC-Date=20260414T031329Z&HW-CC-Expire=86400&HW-CC-Sign=62ED72CA42E406E7AABFCF0BF29E79E6FB3EF22306E5AEF52E66C2826768FB73 "点击放大")

示例代码如下：

构建LiveViewController后，请在代码中初始化LiveViewController并调用LiveViewController.startLiveView()方法。

收起

自动换行

深色代码主题

复制

```
1. import { liveViewManager } from '@kit.LiveViewKit';
2. import { Want, wantAgent } from '@kit.AbilityKit';

4. export class LiveViewController {
5. public async startLiveView(): Promise<liveViewManager.LiveViewResult> {
6. // 校验实况窗开关是否打开
7. if (!await LiveViewController.isLiveViewEnabled()) {
8. throw new Error("Live view is disabled.");
9. }
10. // 创建实况窗
11. const defaultView = await LiveViewController.buildDefaultView();
12. return await liveViewManager.startLiveView(defaultView);
13. }

15. private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
16. return {
17. // 构造实况窗请求体
18. id: 0, // 实况窗ID，开发者生成。
19. event: "PICK_UP", // 实况窗的应用场景。PICK_UP：取餐。
20. liveViewData: {
21. primary: {
22. title: "餐品已备好",
23. content: [
24. { text: "请前往" },
25. { text: " XXX店 ", textColor: "#FF0A59F7" },
26. { text: "取餐" },
27. ],
28. keepTime: 15,
29. clickAction: await LiveViewController.buildWantAgent(),
30. layoutData: {
31. layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
32. title: "取餐码",
33. content: "72988",
34. underlineColor: "#FF0A59F7",
35. descPic: "coffee.png" // 扩展区右侧产品描述图，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
36. }
37. }
38. }
39. };
40. }

42. private static async isLiveViewEnabled(): Promise<boolean> {
43. return await liveViewManager.isLiveViewEnabled();
44. }

46. private static async buildWantAgent(): Promise<Want> {
47. const wantAgentInfo: wantAgent.WantAgentInfo = {
48. wants: [
49. {
50. bundleName: 'xxx.xxx.xxx', // 应用实际bundleName
51. abilityName: 'EntryAbility'
52. } as Want
53. ],
54. actionType: wantAgent.OperationType.START_ABILITIES,
55. requestCode: 0,
56. actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
57. };
58. const agent = await wantAgent.getWantAgent(wantAgentInfo);
59. return agent;
60. }
61. }
```

从6.0.2(22)开始，使用强调文本模板，传入雨、雪类型天气参数，实况卡片支持显示雨、雪天气动效背景。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8c/v3/TXg1cOzYTc6urZQ2JD2MZA/zh-cn_image_0000002532644249.png?HW-CC-KV=V1&HW-CC-Date=20260414T031329Z&HW-CC-Expire=86400&HW-CC-Sign=A3FACB5B90DE01DBA77D1261A444C21AEC240359507D7A7B4964DCEC3CE54D17)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/17/v3/9thz6sUVQSe2rWxL1Rz0Zg/zh-cn_image_0000002532724351.png?HW-CC-KV=V1&HW-CC-Date=20260414T031329Z&HW-CC-Expire=86400&HW-CC-Sign=9A872EB8D75BB83C04C8D9EA2CA49DD7ABC26119287720325B4EC8736FEFEB6B)

代码示例如下：

构建LiveViewController后，请在代码中初始化LiveViewController并调用LiveViewController.startLiveView()方法。

收起

自动换行

深色代码主题

复制

```
1. import { liveViewManager } from '@kit.LiveViewKit';
2. import { Want, wantAgent } from '@kit.AbilityKit';

4. export class LiveViewController {
5. public async startLiveView(): Promise<liveViewManager.LiveViewResult> {
6. // 校验实况窗开关是否打开
7. if (!await LiveViewController.isLiveViewEnabled()) {
8. throw new Error("Live view is disabled.");
9. }
10. // 创建实况窗
11. const defaultView = await LiveViewController.buildDefaultView();
12. return await liveViewManager.startLiveView(defaultView);
13. }

15. private static async buildDefaultView() : Promise < liveViewManager.LiveView > {
16. return {
17. // 构造实况窗请求体
18. id: 0, // 实况窗ID，开发者生成。
19. event: "PICK_UP", // 实况窗的应用场景。PICK_UP：取餐。
20. liveViewData: {
21. primary: {
22. title: "餐品已备好",
23. content: [
24. { text: "请前往" },
25. { text: " XXX店 ", textColor: "#FF0A59F7" },
26. { text: "取餐" },
27. ],
28. keepTime: 15,
29. clickAction: await LiveViewController.buildWantAgent(),
30. layoutData: {
31. layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
32. weatherInfo: {
33. weatherType:liveViewManager.WeatherType.WEATHER_TYPE_HAZY,
34. locationType:liveViewManager.WeatherLocationType.LOCATION_TYPE_LOCAL,
35. },
36. title: "取餐码",
37. content: "72988",
38. underlineColor: "#FF0A59F7",
39. descPic: "coffee.png" // 扩展区右侧产品描述图，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
40. }
41. }
42. }
43. };
44. }

46. private static async isLiveViewEnabled(): Promise<boolean> {
47. return await liveViewManager.isLiveViewEnabled();
48. }

50. public static async buildWantAgent(): Promise<Want> {
51. const wantAgentInfo: wantAgent.WantAgentInfo = {
52. wants: [
53. {
54. bundleName: 'xxx.xxx.xxx', // 应用实际bundleName
55. abilityName: 'EntryAbility'
56. } as Want
57. ],
58. actionType: wantAgent.OperationType.START_ABILITIES,
59. requestCode: 0,
60. actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
61. };
62. const agent = await wantAgent.getWantAgent(wantAgentInfo);
63. return agent;
64. }
65. }
```

### 左右文本模板

左右文本模板适用于高铁、航班等场景。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bc/v3/IzK7X9JGRemsTRNYVv3fKw/zh-cn_image_0000002520875351.png?HW-CC-KV=V1&HW-CC-Date=20260414T031329Z&HW-CC-Expire=86400&HW-CC-Sign=943300E92407E2D7197FE4FB47568A1C4BE0020B6C92EAF4A32916EEEB347FCF "点击放大")

示例代码如下：

构建LiveViewController后，请在代码中初始化LiveViewController并调用LiveViewController.startLiveView()方法。

收起

自动换行

深色代码主题

复制

```
1. import { liveViewManager } from '@kit.LiveViewKit';
2. import { Want, wantAgent } from '@kit.AbilityKit';

4. export class LiveViewController {
5. public async startLiveView(): Promise<liveViewManager.LiveViewResult> {
6. // 校验实况窗开关是否打开
7. if (!await LiveViewController.isLiveViewEnabled()) {
8. throw new Error("Live view is disabled.");
9. }
10. // 创建实况窗
11. const defaultView = await LiveViewController.buildDefaultView();
12. return await liveViewManager.startLiveView(defaultView);
13. }

15. private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
16. return {
17. // 构造实况窗请求体
18. id: 0, // 实况窗ID，开发者生成。
19. event: "TRAIN", // 实况窗的应用场景。TRAIN：高铁/火车。
20. liveViewData: {
21. primary: {
22. title: "列车检票提醒",
23. content: [
24. { text: "检票口 " },
25. { text: "6B ", textColor: "#FF0A59F7" },
26. { text: "| 座位 " },
27. { text: "03车 12F", textColor: "#FF0A59F7" }
28. ], // 设置textColor字段时，所有拥有textColor字段的对象仅能设置同一种颜色，不设置textColor时，默认展示#FF000000
29. keepTime: 15,
30. clickAction: await LiveViewController.buildWantAgent(), // 点击实况窗默认动作。
31. layoutData: {
32. layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_FLIGHT,
33. firstTitle: "09:00",
34. firstContent: "上海虹桥",
35. lastTitle: "14:20",
36. lastContent: "汉口",
37. spaceIcon: "icon.png", // 扩展区中间间隔图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
38. isHorizontalLineDisplayed: true,
39. additionalText: "以上信息仅供参考" // 扩展区底部内容，仅可用于左右文本模板。
40. }
41. }
42. }
43. };
44. }

46. private static async isLiveViewEnabled(): Promise<boolean> {
47. return await liveViewManager.isLiveViewEnabled();
48. }

50. private static async buildWantAgent(): Promise<Want> {
51. const wantAgentInfo: wantAgent.WantAgentInfo = {
52. wants: [
53. {
54. bundleName: 'xxx.xxx.xxx', // 应用实际bundleName
55. abilityName: 'EntryAbility'
56. } as Want
57. ],
58. actionType: wantAgent.OperationType.START_ABILITIES,
59. requestCode: 0,
60. actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
61. };
62. const agent = await wantAgent.getWantAgent(wantAgentInfo);
63. return agent;
64. }
65. }
```

从6.0.0(20)开始，使用左右文本模板，传入雨、雪天气信息或夕阳、赏月氛围背景参数，实况卡片支持显示雨、雪天气动效背景或夕阳、赏月氛围背景。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/57/v3/pHlxftkQSK-Y-0Gavuacjg/zh-cn_image_0000002520875337.gif?HW-CC-KV=V1&HW-CC-Date=20260414T031329Z&HW-CC-Expire=86400&HW-CC-Sign=2D4FA899DBD70A7A6F0132A649914BD3BB79A1391EA474E9075DCA5620C7D11F "点击放大")

代码示例如下：

构建LiveViewController后，请在代码中初始化LiveViewController并调用LiveViewController.startLiveView()方法。

收起

自动换行

深色代码主题

复制

```
1. import { liveViewManager } from '@kit.LiveViewKit';
2. import { Want, wantAgent } from '@kit.AbilityKit';

4. export class LiveViewController {
5. public async startLiveView(): Promise<liveViewManager.LiveViewResult> {
6. // 校验实况窗开关是否打开
7. if (!await LiveViewController.isLiveViewEnabled()) {
8. throw new Error("Live view is disabled.");
9. }
10. // 创建实况窗
11. const defaultView = await LiveViewController.buildDefaultView();
12. return await liveViewManager.startLiveView(defaultView);
13. }

15. private static async buildDefaultView() : Promise < liveViewManager.LiveView > {
16. return {
17. id : 6, //liveView ID, generated by the developer
18. event : "FLIGHT", // application scenarios of liveView：FLIGHT。
19. liveViewData : {
20. primary : {
21. title : "计划出发",
22. content : [
23. {text : "登机口"},
24. {text : "32", textColor: "#FF0A59F7" },
25. {text : "| 座位"},
26. {text : " 17H", textColor: "#FF0A59F7" }
27. ], // 设置textColor字段时，所有拥有textColor字段的对象仅能设置同一种颜色，不设置textColor时，默认展示#FF000000
28. keepTime : 15,
29. clickAction : await LiveViewController.buildWantAgent(),
30. backgroundType : liveViewManager.BackgroundType.SYS_BACKGROUND_FLIGHT_SUNSET,  //当传入实况窗卡片的背景氛围类型参数backgroundType值为赏月航班或夕阳航班时，且同时传入天气类型(WeatherInfo)为雨、雪特殊天气，卡片上优先展示天气背景，其余非特殊天气在卡片上展示赏月航班或夕阳航班背景氛围。
31. layoutData : {
32. layoutType : liveViewManager.LayoutType.LAYOUT_TYPE_FLIGHT,
33. weatherInfo : {
34. weatherType : liveViewManager.WeatherType.WEATHER_TYPE_LIGHT_RAIN,
35. locationType : liveViewManager.WeatherLocationType.LOCATION_TYPE_DESTINATION,
36. highTemperature : 30,
37. lowTemperature : -10
38. },
39. firstTitle: "09:00",
40. firstContent: "上海虹桥",
41. lastTitle: "14:20",
42. lastContent: "汉口",
43. spaceIcon : "icon_plane.png",// 扩展区中间间隔图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
44. isHorizontalLineDisplayed : false,
45. additionalText : "以上信息仅供参考" // 扩展区底部内容，仅可用于左右文本模板。
46. }
47. }
48. }
49. };
50. }

52. private static async isLiveViewEnabled(): Promise<boolean> {
53. return await liveViewManager.isLiveViewEnabled();
54. }

56. private static async buildWantAgent(): Promise<Want> {
57. const wantAgentInfo: wantAgent.WantAgentInfo = {
58. wants: [
59. {
60. bundleName: 'xxx.xxx.xxx', // 应用实际bundleName
61. abilityName: 'EntryAbility'
62. } as Want
63. ],
64. actionType: wantAgent.OperationType.START_ABILITIES,
65. requestCode: 0,
66. actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
67. };
68. const agent = await wantAgent.getWantAgent(wantAgentInfo);
69. return agent;
70. }
71. }
```

### 赛事比分模板

赛事比分模板适用于赛事场景。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1e/v3/zPmTF4OURi6rYPndW9F88Q/zh-cn_image_0000002520875335.png?HW-CC-KV=V1&HW-CC-Date=20260414T031329Z&HW-CC-Expire=86400&HW-CC-Sign=F487F04DB67F78359DF213E25ABC48B96426A4542EB50FFCEA9DC7839018D9CA "点击放大")

示例代码如下：

构建LiveViewController后，请在代码中初始化LiveViewController并调用LiveViewController.startLiveView()方法。

收起

自动换行

深色代码主题

复制

```
1. import { liveViewManager } from '@kit.LiveViewKit';
2. import { Want, wantAgent } from '@kit.AbilityKit';

4. export class LiveViewController {
5. public async startLiveView(): Promise<liveViewManager.LiveViewResult> {
6. // 校验实况窗开关是否打开
7. if (!await LiveViewController.isLiveViewEnabled()) {
8. throw new Error("Live view is disabled.");
9. }
10. // 创建实况窗
11. const defaultView = await LiveViewController.buildDefaultView();
12. return await liveViewManager.startLiveView(defaultView);
13. }

15. private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
16. return {
17. // 构造实况窗请求体
18. id: 0, // 实况窗ID，开发者生成。
19. event: "SCORE", // 实况窗的应用场景。SCORE：赛事比分。
20. liveViewData: {
21. primary: {
22. title: "第四节比赛中",
23. content: [
24. { text: "XX", textColor:"#FF0A59F7" },
25. { text: " VS " },
26. { text: "XX", textColor:"#FF0A59F7" },
27. { text: " | " },
28. { text: "小组赛 第五场", textColor:"#FF0A59F7" }
29. ],
30. keepTime: 1,
31. clickAction: await LiveViewController.buildWantAgent(),
32. layoutData: {
33. layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_SCORE,
34. hostName: "队名A",
35. hostIcon: "host.png", // 扩展区左侧图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
36. hostScore: "110",
37. guestName: "队名B",
38. guestIcon: "guest.png", // 扩展区右侧图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
39. guestScore: "102",
40. competitionDesc: [
41. { text: "●", textColor: "#FFFF0000" },
42. { text: "Q4" }
43. ],
44. competitionTime: "02:16",
45. isHorizontalLineDisplayed: true
46. }
47. }
48. }
49. };
50. }

52. private static async isLiveViewEnabled(): Promise<boolean> {
53. return await liveViewManager.isLiveViewEnabled();
54. }

56. private static async buildWantAgent(): Promise<Want> {
57. const wantAgentInfo: wantAgent.WantAgentInfo = {
58. wants: [
59. {
60. bundleName: 'xxx.xxx.xxx', // 应用实际bundleName
61. abilityName: 'EntryAbility'
62. } as Want
63. ],
64. actionType: wantAgent.OperationType.START_ABILITIES,
65. requestCode: 0,
66. actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
67. };
68. const agent = await wantAgent.getWantAgent(wantAgentInfo);
69. return agent;
70. }
71. }
```

### 导航模板

导航模板适用于出行导航场景。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2f/v3/vvCSD1C5RFyqZQ1S4_0NoA/zh-cn_image_0000002488515544.png?HW-CC-KV=V1&HW-CC-Date=20260414T031329Z&HW-CC-Expire=86400&HW-CC-Sign=BC9E19ABFAD78A5D2A1CF1F734FE942B127D417D2F03A77ACA438E7097705741 "点击放大")

示例代码如下：

构建LiveViewController后，请在代码中初始化LiveViewController并调用LiveViewController.startLiveView()方法。

收起

自动换行

深色代码主题

复制

```
1. import { liveViewManager } from '@kit.LiveViewKit';
2. import { Want, wantAgent } from '@kit.AbilityKit';

4. export class LiveViewController {
5. public async startLiveView(): Promise<liveViewManager.LiveViewResult> {
6. // 校验实况窗开关是否打开
7. if (!await LiveViewController.isLiveViewEnabled()) {
8. throw new Error("Live view is disabled.");
9. }
10. // 创建实况窗
11. const defaultView = await LiveViewController.buildDefaultView();
12. return await liveViewManager.startLiveView(defaultView);
13. }

15. private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
16. return {
17. // 构造实况窗请求体
18. id: 0, // 实况窗ID，开发者生成。
19. event: "NAVIGATION", // 实况窗的应用场景。NAVIGATION：导航。
20. liveViewData: {
21. primary: {
22. title: "178米后左转",
23. content: [
24. { text: "去往"},
25. { text: " 南京东路", textColor: "#FF0A59F7" }
26. ],
27. keepTime: 15,
28. clickAction: await LiveViewController.buildWantAgent(),
29. layoutData: {
30. layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_NAVIGATION,
31. currentNavigationIcon: "navigation.png", // 当前导航方向，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
32. navigationIcons: ["left.png","straight.png","straight.png","right.png"] // 导航方向的箭头集合图片，每个元素取值为“/resources/rawfile”路径下的文件名或image.PixelMap
33. }
34. }
35. }
36. };
37. }

39. private static async isLiveViewEnabled(): Promise<boolean> {
40. return await liveViewManager.isLiveViewEnabled();
41. }

43. private static async buildWantAgent(): Promise<Want> {
44. const wantAgentInfo: wantAgent.WantAgentInfo = {
45. wants: [
46. {
47. bundleName: 'xxx.xxx.xxx', // 应用实际bundleName
48. abilityName: 'EntryAbility'
49. } as Want
50. ],
51. actionType: wantAgent.OperationType.START_ABILITIES,
52. requestCode: 0,
53. actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
54. };
55. const agent = await wantAgent.getWantAgent(wantAgentInfo);
56. return agent;
57. }
58. }
```

### 实况胶囊

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8d/v3/aU9P1CCeTUaqVvQAw9cZSg/zh-cn_image_0000002520755365.png?HW-CC-KV=V1&HW-CC-Date=20260414T031329Z&HW-CC-Expire=86400&HW-CC-Sign=F69DECA96766D50D8B887838414F2D14A1FBA942040EBE7E38A830ABC21A6D58 "点击放大")

说明

胶囊形态各模板参数固定，与创建实况窗时的模板类型无关。可创建的胶囊类型有：文本胶囊、计时器胶囊、进度胶囊，详情请参见[CapsuleData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section1600824135815)。

除了实况窗卡片形态，开发者还需考虑实况窗胶囊形态的展示效果。若开发者创建实况窗时还想同步创建实况窗胶囊，则需在liveViewManager.[LiveView](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section411410371767)（结构体）中携带胶囊所需的参数liveViewData.[capsule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section980821010388)（不同胶囊类型携带不同的参数）。示例代码如下：

收起

自动换行

深色代码主题

复制

```
1. import { liveViewManager } from '@kit.LiveViewKit';
2. import { Want, wantAgent } from '@kit.AbilityKit';

4. export class LiveViewController {
5. public async startLiveView(): Promise<liveViewManager.LiveViewResult> {
6. // 校验实况窗开关是否打开
7. if (!await LiveViewController.isLiveViewEnabled()) {
8. throw new Error("Live view is disabled.");
9. }
10. // 创建实况窗
11. const defaultView = await LiveViewController.buildDefaultView();
12. return await liveViewManager.startLiveView(defaultView);
13. }

15. private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
16. return {
17. // 构造实况窗请求体
18. id: 0, // 实况窗ID，开发者生成。
19. event: "TAXI", // 实况窗的应用场景。TAXI：出行打车。
20. liveViewData: {
21. primary: {
22. title: "司机预计5分钟后到达",
23. content: [
24. { text: "白", textColor: "#FF0A59F7" },
25. { text: "●" },
26. { text: "沪AXXXXXX", textColor: "#FF0A59F7" }
27. ],
28. keepTime: 15,
29. clickAction: await LiveViewController.buildWantAgent(),
30. layoutData: {
31. layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
32. progress: 30,
33. color: "#ff0959F8",
34. backgroundColor: "#ffc9d7e4",
35. indicatorType: liveViewManager.IndicatorType.INDICATOR_TYPE_UP,
36. indicatorIcon: "indicator.png", // 进度条指示器图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
37. lineType: liveViewManager.LineType.LINE_TYPE_NORMAL_SOLID_LINE,
38. nodeIcons: ["icon_1.png", "icon_2.png", "icon_3.png"] // 进度条节点图标集合，每个元素取值为“/resources/rawfile”路径下的文件名或image.PixelMap
39. }
40. },
41. // 实况胶囊相关参数
42. capsule: {
43. type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
44. status: 1,
45. icon: "capsule_store.png", // 胶囊图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
46. backgroundColor: "#ff0959F8",
47. title: "5分钟"
48. }
49. }
50. };
51. }

53. private static async isLiveViewEnabled(): Promise<boolean> {
54. return await liveViewManager.isLiveViewEnabled();
55. }

57. private static async buildWantAgent(): Promise<Want> {
58. const wantAgentInfo: wantAgent.WantAgentInfo = {
59. wants: [
60. {
61. bundleName: 'xxx.xxx.xxx', // 应用实际bundleName
62. abilityName: 'EntryAbility'
63. } as Want
64. ],
65. actionType: wantAgent.OperationType.START_ABILITIES,
66. requestCode: 0,
67. actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
68. };
69. const agent = await wantAgent.getWantAgent(wantAgentInfo);
70. return agent;
71. }
72. }
```

### 小折叠外屏实况窗

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ec/v3/DDb6uVMuTBiwyhf0WAX81A/zh-cn_image_0000002520875341.png?HW-CC-KV=V1&HW-CC-Date=20260414T031329Z&HW-CC-Expire=86400&HW-CC-Sign=78C1382EA5DC563C757DBA5629CB5FEA10C9A34A5FC94973E571E52F5F1C0F3F "点击放大")

外屏实况窗适用于在小折叠屏的外屏显示实况窗的简要信息，方便用户可以在折叠状态便捷查看。

若开发者创建实况窗时需要同步创建，则需在liveViewManager.[LiveView](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section411410371767)（结构体）中携带外屏所需的参数liveViewData.[external](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section980821010388)。示例代码如下：

收起

自动换行

深色代码主题

复制

```
1. import { liveViewManager } from '@kit.LiveViewKit';
2. import { Want, wantAgent } from '@kit.AbilityKit';

4. export class LiveViewController {
5. public async startLiveView(): Promise<liveViewManager.LiveViewResult> {
6. // 校验实况窗开关是否打开
7. if (!await LiveViewController.isLiveViewEnabled()) {
8. throw new Error("Live view is disabled.");
9. }
10. // 创建实况窗
11. const defaultView = await LiveViewController.buildDefaultView();
12. return await liveViewManager.startLiveView(defaultView);
13. }

15. private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
16. return {
17. // 构造实况窗请求体
18. id: 0, // 实况窗ID，开发者生成。
19. event: "FLIGHT", // 实况窗的应用场景。FLIGHT：航班
20. liveViewData: {
21. primary: {
22. title: "航班XXX 已值机",
23. content: [
24. { text: '登机口', },
25. { text: '27 17:45', textColor: '#FFFF9C4F' },
26. { text: '开始登机' }
27. ], // 设置textColor字段时，所有拥有textColor字段的对象仅能设置同一种颜色，不设置textColor时，默认展示#FF000000
28. keepTime: 15,
29. clickAction: await LiveViewController.buildWantAgent(),
30. layoutData: {
31. layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_FLIGHT,
32. firstTitle: "18:15",
33. firstContent: "上海",
34. lastTitle: "20:30",
35. lastContent: "成都",
36. spaceIcon: "icon.png", // 扩展区中间间隔图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
37. isHorizontalLineDisplayed: true,
38. additionalText: "以上信息仅供参考" // 扩展区底部内容，仅可用于左右文本模板
39. }
40. },
41. external: {
42. title: "已值机",
43. content: [
44. { text: '登机口' },
45. { text: '27\n', textColor: '#FFFF9C4F' },
46. { text: '17:45', textColor: '#FFFF9C4F' },
47. { text: '开始登机' }
48. ],
49. type: liveViewManager.ExternalType.BACKGROUND_PICTURE, // 外屏实况的背景样式类型
50. backgroundPicture: 'airplane.png' // 外屏实况的背景图片，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
51. }
52. }
53. };
54. }

56. private static async isLiveViewEnabled(): Promise<boolean> {
57. return await liveViewManager.isLiveViewEnabled();
58. }

60. private static async buildWantAgent(): Promise<Want> {
61. const wantAgentInfo: wantAgent.WantAgentInfo = {
62. wants: [
63. {
64. bundleName: 'xxx.xxx.xxx', // 应用实际bundleName
65. abilityName: 'EntryAbility'
66. } as Want
67. ],
68. actionType: wantAgent.OperationType.START_ABILITIES,
69. requestCode: 0,
70. actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
71. };
72. const agent = await wantAgent.getWantAgent(wantAgentInfo);
73. return agent;
74. }
75. }
```

### 实况窗计时器

实况窗计时器适用于排队、抢票等场景。

开发者若需要使用实况窗计时器，则需在liveViewManager.[LiveView](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section411410371767)（结构体）中配置[timer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section411410371767)字段，并在当前支持的字段中使用占位符：**${placeholder.timer}**。

例如：固定区的文本内容中使用占位符，系统将替代占位符为实况窗计时器。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/80/v3/JMcvIBebR1uqx-coN4FIrA/zh-cn_image_0000002488515556.png?HW-CC-KV=V1&HW-CC-Date=20260414T031329Z&HW-CC-Expire=86400&HW-CC-Sign=D463F084A1EBB518685949FBBE49E0C8796004E047D2D52FC20A1C386A9E31F1 "点击放大")

示例代码如下：

构建LiveViewController后，请在代码中初始化LiveViewController并调用LiveViewController.startLiveView()方法。

收起

自动换行

深色代码主题

复制

```
1. import { liveViewManager } from '@kit.LiveViewKit';
2. import { Want, wantAgent } from '@kit.AbilityKit';

4. export class LiveViewController {
5. public async startLiveView(): Promise<liveViewManager.LiveViewResult> {
6. // 校验实况窗开关是否打开
7. if (!await LiveViewController.isLiveViewEnabled()) {
8. throw new Error("Live view is disabled.");
9. }
10. // 创建实况窗
11. const defaultView = await LiveViewController.buildDefaultView();
12. return await liveViewManager.startLiveView(defaultView);
13. }

15. private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
16. return {
17. // 构造实况窗请求体
18. id: 0, // 实况窗ID，开发者生成。
19. event: "QUEUE", // 实况窗的应用场景。QUEUE：排队
20. timer: {
21. time: 620000,
22. isCountdown: false,
23. isPaused: false
24. },
25. liveViewData: {
26. primary: {
27. title: "大桌4人等位  32桌",
28. content: [
29. { text: "已等待 " },
30. { text: "${placeholder.timer}", textColor:"#ff10c1f7" },
31. { text: " | 预计还需>30分钟" }
32. ], // 设置textColor字段时，所有拥有textColor字段的对象仅能设置同一种颜色，不设置textColor时，默认展示#FF000000
33. keepTime: 15,
34. clickAction: await LiveViewController.buildWantAgent(),
35. layoutData: {
36. layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
37. progress: 0,
38. color: "#FFFF0000",
39. backgroundColor: "#FF000000",
40. indicatorType: liveViewManager.IndicatorType.INDICATOR_TYPE_OVERLAY,
41. indicatorIcon: "indicator.png", // 进度条指示器图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
42. lineType: liveViewManager.LineType.LINE_TYPE_DOTTED_LINE,
43. nodeIcons: ["icon_1.png","icon_2.png"] // 进度条节点图标集合，每个元素取值为“/resources/rawfile”路径下的文件名或image.PixelMap
44. }
45. }
46. }
47. };
48. }

50. private static async isLiveViewEnabled(): Promise<boolean> {
51. return await liveViewManager.isLiveViewEnabled();
52. }

54. private static async buildWantAgent(): Promise<Want> {
55. const wantAgentInfo: wantAgent.WantAgentInfo = {
56. wants: [
57. {
58. bundleName: 'xxx.xxx.xxx', // 应用实际bundleName
59. abilityName: 'EntryAbility'
60. } as Want
61. ],
62. actionType: wantAgent.OperationType.START_ABILITIES,
63. requestCode: 0,
64. actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
65. };
66. const agent = await wantAgent.getWantAgent(wantAgentInfo);
67. return agent;
68. }
69. }
```

### 点击实况窗动作

请调用wantAgent.[getWantAgent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-wantagent#wantagentgetwantagent-1)()构造点击动作字段所需的参数值，当前实况窗支持的点击动作如下：

* 点击实况窗的默认动作：在liveViewManager.[LiveView](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section411410371767)（结构体）中携带胶囊所需的参数liveViewData.primary.[clickAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section452772611408)字段。
* 点击辅助区的跳转动作：在liveViewManager.[LiveView](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section411410371767)（结构体）中携带胶囊所需的参数liveViewData.primary.extensionData.[clickAction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section14934174734616)字段。

## 本地更新和结束实况窗

调用[liveViewManager.isLiveViewEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section19741144281410)()确认实况窗开关打开后，调用liveViewManager的[updateLiveView](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section1310319579406)更新实况窗，调用[stopLiveView](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-liveviewmanager#section929145112243)结束实况窗。更新时需要修改请求体中对应的参数。示例代码如下：

收起

自动换行

深色代码主题

复制

```
1. import { liveViewManager } from '@kit.LiveViewKit';
2. import { Want, wantAgent } from '@kit.AbilityKit';

4. export class LiveViewController {
5. private static contentColor: string = '#FF000000';
6. private static capsuleColor: string = '#FF308977';

8. public async startLiveView(): Promise<liveViewManager.LiveViewResult> {
9. // 校验实况窗开关是否打开
10. if (!await LiveViewController.isLiveViewEnabled()) {
11. throw new Error("Live view is disabled.");
12. }
13. // 创建实况窗
14. const defaultView = await LiveViewController.buildDefaultView();
15. return await liveViewManager.startLiveView(defaultView);
16. }

18. public async updateLiveView(): Promise<liveViewManager.LiveViewResult> {
19. // 校验实况窗开关是否打开
20. if (!await LiveViewController.isLiveViewEnabled()) {
21. throw new Error("Live view is disabled.");
22. }
23. // 修改实况窗内容
24. const defaultView = await LiveViewController.buildDefaultView();
25. defaultView.liveViewData.primary.title = "预计23:49送达";
26. defaultView.liveViewData.primary.content = [
27. { text: "等待商家接单， " },
28. { text: "03:20", textColor: "#FFFF9C4F" },
29. { text: " 未接单自动取消" },
30. ];
31. defaultView.liveViewData.primary.layoutData = {
32. layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
33. progress: 0,
34. lineType: 0,
35. nodeIcons: [
36. 'icon_store_white.png',
37. 'icon_finish.png'
38. ] // 进度条节点图标集合，每个元素取值为“/resources/rawfile”路径下的文件名或image.PixelMap
39. };
40. defaultView.liveViewData.capsule = {
41. type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
42. status: 1,
43. icon: 'capsule_store.png', // 实况胶囊的图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
44. backgroundColor: LiveViewController.capsuleColor,
45. title: "待接单"
46. };
47. // 更新实况窗
48. return await liveViewManager.updateLiveView(defaultView);
49. }

51. public async stopLiveView(): Promise<liveViewManager.LiveViewResult> {
52. // 校验实况窗开关是否打开
53. if (!await LiveViewController.isLiveViewEnabled()) {
54. throw new Error("Live view is disabled.");
55. }
56. // 修改实况窗内容
57. const defaultView = await LiveViewController.buildDefaultView();
58. defaultView.liveViewData.primary.title = '商品已送达';
59. defaultView.liveViewData.primary.content = [
60. { text: '感谢您的认可,' },
61. { text: '期待下一次光临' }
62. ];
63. defaultView.liveViewData.primary.layoutData = {
64. layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
65. progress: 100,
66. lineType: 0,
67. nodeIcons: [
68. 'icon_order.png',
69. 'icon_finish.png'
70. ] // 进度条节点图标集合，每个元素取值为“/resources/rawfile”路径下的文件名或image.PixelMap
71. };
72. defaultView.liveViewData.capsule = {
73. type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
74. status: 1,
75. icon: 'capsule_gps.png', // 实况胶囊的图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
76. backgroundColor: LiveViewController.capsuleColor,
77. title: '已送达'
78. };
79. // 结束实况窗
80. return await liveViewManager.stopLiveView(defaultView);
81. }

83. private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
84. return {
85. // 构造实况窗请求体
86. id: 0, // 实况窗ID，开发者生成。
87. event: "DELIVERY", // 实况窗的应用场景。DELIVERY：即时配送（外卖、生鲜）
88. liveViewData: {
89. primary: {
90. title: "餐品待支付",
91. content: [
92. { text: "咖啡 ", textColor: "#FF0A59F7" },
93. { text: "等2件商品" }
94. ],
95. keepTime: 15,
96. clickAction: await LiveViewController.buildWantAgent(),
97. layoutData: {
98. layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
99. title: "待支付金额",
100. content: "25.5元",
101. underlineColor: "#FF0A59F7",
102. descPic: "coffee.png" // 扩展区右侧产品描述图，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
103. }
104. },
105. // 实况胶囊相关参数
106. capsule: {
107. type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
108. status: 1,
109. icon: "capsule_store.png", // 实况胶囊的图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
110. backgroundColor: "#FF308977",
111. title: "待支付"
112. }
113. }
114. };
115. }

117. private static async isLiveViewEnabled(): Promise<boolean> {
118. return await liveViewManager.isLiveViewEnabled();
119. }

121. private static async buildWantAgent(): Promise<Want> {
122. const wantAgentInfo: wantAgent.WantAgentInfo = {
123. wants: [
124. {
125. bundleName: 'xxx.xxx.xxx', // 应用实际bundleName
126. abilityName: 'EntryAbility'
127. } as Want
128. ],
129. actionType: wantAgent.OperationType.START_ABILITIES,
130. requestCode: 0,
131. actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
132. };
133. const agent = await wantAgent.getWantAgent(wantAgentInfo);
134. return agent;
135. }
136. }
```

更详细的参数请参考[Live View Kit ArkTS API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/liveview-arkts)。

说明

以上是应用在本地创建、更新和结束实况窗通知的全部流程。此外，应用也可以通过Push Kit实现远程[创建、更新和结束实况窗消息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-update-liveview)。