在“entry/src/main/ets/prefetchUtil”目录下新增PrefetchUtil.ets和PrefetchWrapper.ets。

PrefetchUtil和PrefetchWrapper实现类功能如下：

* PrefetchUtil：预加载API的封装类，为PrefetchWrapper提供预加载API封装接口。
  + 提供安装预加载的数据获取接口
  + 提供周期性预加载的任务注册接口和数据获取接口
  + 提供周期性预加载是否已拉取数据的判断接口
* PrefetchWrapper：预加载包装类，为页面提供预加载封装接口。
  + 提供安装预加载数据获取和渲染接口
  + 提供周期性预加载数据获取和渲染接口
  + 提供安装预加载和周期性预加载数据获取和渲染接口

## PrefetchUtil

周期性预加载任务注册间隔需要大于12小时，建议按照如下示例取值为24小时。

收起

自动换行

深色代码主题

复制

```
1. import { cloudResPrefetch } from '@kit.CloudFoundationKit'
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { PreferenceUtil } from '../common/PreferenceUtil';
4. import { GlobalContext } from '../common/GlobalContext';

6. const PREFERENCES_PREFETCH_STORE_NAME = 'defaultStore';
7. const PREFERENCES_PREFETCH_FIRST_REGISTER_TIME = 'prefetchTaskFirstRegisterTime'; // 首次注册时间
8. const PREFERENCES_PREFETCH_TASK_EXPIRE_TIME = 'prefetchTaskExpireTime'; // 任务过期时间
9. const PREFETCH_TASK_REGISTER_INTERVAL = 24 * 60 * 60 * 1000; // 24h < 72h
10. const PREFETCH_DATA_UPDATE_INTERVAL = 12 * 60 * 60 * 1000; // 12h
11. const HILOG_DOMAIN = 0x0000;
12. const TAG = 'Prefetch';

14. export class PrefetchUtil {
15. private static timeoutId: number = (0 - Number.MAX_VALUE);
16. private static hasPrefetchedData: boolean = false;
17. private static isPrefetchTaskRegistered: boolean = false;
18. private static now: number = (0 - Number.MAX_VALUE);

20. private constructor() {
21. }

23. /**
24. * 预加载数据获取
25. * @param type 安装预加载/周期预加载数据
26. * @throws 预加载getPrefetchResult API异常
27. * @returns PrefetchResult
28. */
29. public static async getPrefetchResult(type: cloudResPrefetch.PrefetchMode) {
30. return cloudResPrefetch.getPrefetchResult(type);
31. }

33. /**
34. * 周期性预加载应用注册任务，间隔24小时
35. * @param token 应用/用户级token，可以为空
36. * @param params 自定义筛选参数，定义为JSON格式，可以为空
37. * @param forceRegister 是否强制注册
38. */
39. public static async registerPrefetchTask(token: string, params: string | object,
40. forceRegister: boolean = false) {
41. await PrefetchUtil.updatePrefetchTaskInfo();
42. if (!forceRegister) {
43. await PrefetchUtil.registerPrefetchTaskNotForced(token, params);
44. return;
45. }
46. await PrefetchUtil.registerPrefetchTaskForced(token, params);
47. }

49. /**
50. * 是否有周期性预加载数据：如果是首次注册，12小时后才有周期性预加载数据
51. * @returns boolean
52. */
53. public static hasPrefetchTaskData() : boolean {
54. return PrefetchUtil.hasPrefetchedData;
55. }

57. private static async updatePrefetchTaskInfo() {
58. PrefetchUtil.now = Date.now();
59. if (PrefetchUtil.timeoutId != 0 - Number.MAX_VALUE) {
60. clearTimeout(PrefetchUtil.timeoutId);
61. }
62. let firstRegisterTime = await PreferenceUtil.getValue(GlobalContext.getContext(), PREFERENCES_PREFETCH_STORE_NAME,
63. PREFERENCES_PREFETCH_FIRST_REGISTER_TIME) as number;
64. if (firstRegisterTime) {
65. PrefetchUtil.isPrefetchTaskRegistered = true;
66. // 判断任务是否已获取数据(首次注册后12小时，之后数据每隔12小时更新一次)
67. if (PrefetchUtil.now - firstRegisterTime >= PREFETCH_DATA_UPDATE_INTERVAL) {
68. PrefetchUtil.hasPrefetchedData = true;
69. }
70. }
71. if (!PrefetchUtil.isPrefetchTaskRegistered) {
72. hilog.info(HILOG_DOMAIN, TAG, `first register time: ${PrefetchUtil.now}`);
73. await PreferenceUtil.setValue(GlobalContext.getContext(), PREFERENCES_PREFETCH_STORE_NAME,
74. PREFERENCES_PREFETCH_FIRST_REGISTER_TIME, PrefetchUtil.now);
75. }
76. }

78. private static async registerPrefetchTaskForced(token: string, params: string | object) {
79. // 过期或强制更新任务注册
80. let expireTime = PrefetchUtil.now + PREFETCH_TASK_REGISTER_INTERVAL;
81. hilog.info(HILOG_DOMAIN, TAG, `new expireTime: ${expireTime}`);
82. await PreferenceUtil.setValue(GlobalContext.getContext(), PREFERENCES_PREFETCH_STORE_NAME,
83. PREFERENCES_PREFETCH_TASK_EXPIRE_TIME, expireTime);
84. // 更新任务注册和定时器
85. PrefetchUtil.registerPrefetchTaskWithApi(token, params);
86. PrefetchUtil.updateTaskTimer(PREFETCH_TASK_REGISTER_INTERVAL);
87. }

89. private static async registerPrefetchTaskNotForced(token: string, params: string | object) {
90. // 判断任务到期，重新注册
91. let expireTime = await PreferenceUtil.getValue(GlobalContext.getContext(), PREFERENCES_PREFETCH_STORE_NAME,
92. PREFERENCES_PREFETCH_TASK_EXPIRE_TIME) as number;
93. if (expireTime && (PrefetchUtil.now < expireTime)) {
94. // 任务没有过期：只更新定时器
95. let delay = expireTime - PrefetchUtil.now;
96. hilog.info(HILOG_DOMAIN, TAG, `not expire, delay:${delay}`);
97. PrefetchUtil.updateTaskTimer(delay);
98. return;
99. }
100. await PrefetchUtil.registerPrefetchTaskForced(token, params);
101. }

103. private static registerPrefetchTaskWithApi(token: string, params: string | object) {
104. try {
105. cloudResPrefetch.registerPrefetchTask({
106. token: token,
107. params: params
108. });
109. hilog.info(HILOG_DOMAIN, TAG, `register success`);
110. } catch (error) {
111. hilog.error(HILOG_DOMAIN, TAG, `register catch = ${error.message}`);
112. }
113. }

115. private static updateTaskTimer(delay: number) {
116. PrefetchUtil.timeoutId = setTimeout(() => {
117. if (PrefetchUtil.timeoutId != (0 - Number.MAX_VALUE)) {
118. clearInterval(PrefetchUtil.timeoutId)
119. PrefetchUtil.timeoutId = (0 - Number.MAX_VALUE);
120. }
121. }, delay);
122. }
123. }
```

## PrefetchWrapper

* 预加载数据获取成功时，需要增加页面的渲染逻辑。
* 预加载数据获取失败时，需要做数据降级处理。如下示例代码以cloudFunctionCall接口触发云函数为例获取数据，请根据实际业务实现进行修改。

  需要注意以下两点：

  1. 使用cloudFunctionCall接口之前，请先[设置云函数配置项](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-call-function#section197479161807)。
  2. 测试周期性预加载时，需要将下文示例代码periodicPrefetch方法中的如下代码块注释。若不注释，则需等待12小时才能获取周期性预加载数据。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. if (!PrefetchUtil.hasPrefetchTaskData()) { // 是否有周期性预加载数据：如果是首次注册，12小时后才有周期性预加载数据
     2. hilog.info(HILOG_DOMAIN, TAG, 'not has prefetch data');
     3. this.cloudFunctionCall(); // 使用普通方式获取应用数据
     4. return;
     5. }
     ```

     测试完成后，取消上述代码块注释即可。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. import { cloudFunction, cloudResPrefetch } from '@kit.CloudFoundationKit';
3. import { PrefetchUtil } from './PrefetchUtil';
4. import { PreferenceUtil } from '../common/PreferenceUtil';
5. import { BusinessError } from '@kit.BasicServicesKit';
6. import { GlobalContext } from '../common/GlobalContext';

8. const HILOG_DOMAIN = 0x0000;
9. const TAG = 'PrefetchWrapper';
10. const PREFETCH_MODE = "prefetchMode";
11. const PREFERENCES_PREFETCH_STORE_NAME = 'defaultStore';

13. export class PrefetchWrapper {
14. private static instance: PrefetchWrapper;

16. private constructor() {
17. }

19. public static getInstance(): PrefetchWrapper {
20. if (!PrefetchWrapper.instance) {
21. PrefetchWrapper.instance = new PrefetchWrapper();
22. }
23. return PrefetchWrapper.instance;
24. }

26. // 支持安装预加载和周期性预加载（推荐）
27. public doPrefetch() {
28. let context = GlobalContext.getContext();
29. let prefetchMode =
30. PreferenceUtil.getValueSync(context, PREFERENCES_PREFETCH_STORE_NAME, PREFETCH_MODE) as number;
31. if (!prefetchMode) {
32. // 应用安装后首次打开：使用安装预加载
33. hilog.info(HILOG_DOMAIN, TAG, 'installPrefetch');
34. this.installPrefetch();
35. PreferenceUtil.setValue(context, PREFERENCES_PREFETCH_STORE_NAME, PREFETCH_MODE,
36. cloudResPrefetch.PrefetchMode.PERIODIC_PREFETCH);
37. } else {
38. // 应用安装后非首次打开：使用周期性预加载
39. hilog.info(HILOG_DOMAIN, TAG, 'periodicPrefetch: %{public}d', prefetchMode);
40. this.periodicPrefetch();
41. }
42. }

44. // 仅支持安装预加载
45. public doInstallPrefetch() {
46. let context = GlobalContext.getContext();
47. let prefetchMode =
48. PreferenceUtil.getValueSync(context, PREFERENCES_PREFETCH_STORE_NAME, PREFETCH_MODE) as number;
49. if (!prefetchMode) {
50. // 应用安装后首次打开：使用安装预加载
51. hilog.info(HILOG_DOMAIN, TAG, 'installPrefetch');
52. this.installPrefetch();
53. PreferenceUtil.setValue(context, PREFERENCES_PREFETCH_STORE_NAME, PREFETCH_MODE,
54. cloudResPrefetch.PrefetchMode.PERIODIC_PREFETCH);
55. }
56. }

58. // 仅支持周期性预加载
59. public doPeriodicPrefetch() {
60. let context = GlobalContext.getContext();
61. let prefetchMode =
62. PreferenceUtil.getValueSync(context, PREFERENCES_PREFETCH_STORE_NAME, PREFETCH_MODE) as number;
63. if (!prefetchMode) {
64. PreferenceUtil.setValue(context, PREFERENCES_PREFETCH_STORE_NAME, PREFETCH_MODE,
65. cloudResPrefetch.PrefetchMode.PERIODIC_PREFETCH);
66. } else {
67. // 应用安装后非首次打开：使用周期性预加载
68. hilog.info(HILOG_DOMAIN, TAG, 'periodicPrefetch: %{public}d', prefetchMode);
69. this.periodicPrefetch();
70. }
71. }

73. private installPrefetch() {
74. PrefetchUtil.getPrefetchResult(cloudResPrefetch.PrefetchMode.INSTALL_PREFETCH)
75. .then((data: cloudResPrefetch.PrefetchResult) => { // 接口调用成功，处理缓存的应用数据
76. hilog.info(HILOG_DOMAIN, TAG, 'get install prefetch cache successfully');
77. let dataResult = data.result; // data.result即是缓存的应用数据
78. // todo 处理dataResult
79. hilog.info(HILOG_DOMAIN, TAG, 'get install prefetch dataResult: %{public}s', JSON.stringify(dataResult));
80. })
81. .catch((err: BusinessError) => {
82. hilog.error(HILOG_DOMAIN, TAG, `get install prefetch cache failed: ${err.message}, ${err.code}`);
83. this.cloudFunctionCall(); // 应用走原有逻辑获取数据，示例使用云函数获取
84. })
85. }

87. private initPeriodPrefetch() {
88. let token = ''; // 应用自定义token参数，通常是鉴权参数。在开发云侧云函数时，可以提取鉴权信息，也可以选择不进行鉴权。如果不需要鉴权，该参数可以为空
89. let params = ''; // 应用自定义params参数，通常是筛选参数，可以定义为JSON格式。在开发云侧云函数时，可以提取该参数进行筛选。如果不需要筛选，该参数可以为空
90. PrefetchUtil.registerPrefetchTask(token, params);
91. }

93. private periodicPrefetch() {
94. this.initPeriodPrefetch();
95. if (!PrefetchUtil.hasPrefetchTaskData()) { // 是否有周期性预加载数据：如果是首次注册，12小时后才有周期性预加载数据
96. hilog.info(HILOG_DOMAIN, TAG, 'not has prefetch data');
97. this.cloudFunctionCall(); // 使用普通方式获取应用数据
98. return;
99. }
100. PrefetchUtil.getPrefetchResult(cloudResPrefetch.PrefetchMode.PERIODIC_PREFETCH)
101. .then((data: cloudResPrefetch.PrefetchResult) => { // 接口调用成功，处理缓存的应用数据
102. hilog.info(HILOG_DOMAIN, TAG, 'get periodic prefetch cache successfully');
103. let dataResult = data.result; // data.result即是缓存的应用数据
104. let timestamp = data.timestamp; // data.timestamp即是缓存拉取时间
105. let token = data.token; // data.token即是注册任务token
106. // todo 处理dataResult
107. hilog.info(HILOG_DOMAIN, TAG, 'get periodic prefetch dataResult: %{public}s', JSON.stringify(dataResult));
108. hilog.info(HILOG_DOMAIN, TAG, 'get periodic prefetch timestamp: %{public}s', timestamp.toString());
109. hilog.info(HILOG_DOMAIN, TAG, 'get periodic prefetch token: %{public}s', token)
110. })
111. .catch((err: BusinessError) => {
112. hilog.error(HILOG_DOMAIN, TAG, `get periodic prefetch cache failed: ${err.message}, ${err.code}`);
113. this.cloudFunctionCall(); // 应用走原有逻辑获取数据，示例使用云函数获取
114. })
115. }

117. private cloudFunctionCall() {
118. hilog.info(HILOG_DOMAIN, TAG, 'cloudFunctionCall start');
119. cloudFunction.call({
120. name: "function_name",  // 需修改为实际的云函数名称
121. timeout: 5 * 1000
122. }).then((data: cloudFunction.FunctionResult) => {
123. hilog.info(HILOG_DOMAIN, TAG, 'call function successfully');
124. let dataResult = data.result; // data.result即是缓存的应用数据
125. // todo 处理dataResult
126. hilog.info(HILOG_DOMAIN, TAG, 'call function get: %{public}s', JSON.stringify(dataResult));
127. }).catch((err: BusinessError) => {
128. hilog.error(HILOG_DOMAIN, TAG, 'call function failed: %{public}s', err.message);
129. })
130. }
131. }
```