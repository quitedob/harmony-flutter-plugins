## 场景介绍

通过WebSocket模块可以建立服务器与客户端的双向连接。

## 接口说明

WebSocket常用接口如下表所示，详细的接口说明请参考[net\_websocket.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-h)。

展开

| 接口名 | 描述 |
| --- | --- |
| OH\_WebSocketClient\_Constructor(WebSocket\_OnOpenCallback onOpen, WebSocket\_OnMessageCallback onMessage, WebSocket\_OnErrorCallback onError, WebSocket\_OnCloseCallback onclose) | WebSocket客户端的构造函数。 |
| OH\_WebSocketClient\_AddHeader(struct WebSocket \*client, struct WebSocket\_Header header) | 将header头信息添加到client客户端request中。 |
| OH\_WebSocketClient\_Connect(struct WebSocket \*client, const char \*url, struct WebSocket\_RequestOptions options) | 客户端连接服务端。 |
| OH\_WebSocketClient\_Send(struct WebSocket \*client, char \*data, size\_t length) | 客户端向服务端发送数据。 |
| OH\_WebSocketClient\_Close(struct WebSocket \*client, struct WebSocket\_CloseOption options) | 客户端主动关闭websocket连接。 |
| OH\_WebSocketClient\_Destroy(struct WebSocket \*client) | 释放websocket连接上下文和资源。 |

## WebSocket接口开发示例

### 开发步骤

使用本文档涉及接口创建并连接到WebSocket服务器时，需先创建Native C++工程，在源文件中封装相关接口，然后在ArkTS层调用封装好的接口，使用hilog或console.info等方法将日志打印到控制台或生成设备日志。

本文以建立与WebSocket服务器的连接、向WebSocket服务器发送消息、关闭WebSocket连接为例，提供具体的开发指导。

### 添加开发依赖

**添加动态链接库**

CMakeLists.txt中添加以下lib:

收起

自动换行

深色代码主题

复制

```
1. libace_napi.z.so
2. libnet_websocket.so
```

**头文件**

收起

自动换行

深色代码主题

复制

```
1. #include "napi/native_api.h"
2. #include "network/netstack/net_websocket.h"
3. #include "network/netstack/net_websocket_type.h"
```

### 构建工程

1、在源文件中编写调用该API的代码，接受ArkTS传递过来的url字符串参数，创建WebSocket对象指针后，检查连接到服务器是否成功。

收起

自动换行

深色代码主题

复制

```
1. #include "napi/native_api.h"
2. #include "network/netstack/net_websocket.h"
3. #include "network/netstack/net_websocket_type.h"
4. #include "hilog/log.h"

6. #include <cstring>

8. #undef LOG_DOMAIN
9. #undef LOG_TAG
10. #define LOG_DOMAIN 0x3200 // 全局domain宏，标识业务领域
11. #define LOG_TAG "WSDEMO"  // 全局tag宏，标识模块日志tag


14. // WebSocket客户端全局变量
15. static struct WebSocket *g_client = nullptr;

17. static void onOpen(struct WebSocket *wsClient, WebSocket_OpenResult openResult)
18. {
19. (void)wsClient;
20. OH_LOG_INFO(LOG_APP, "onOpen: code: %{public}u, reason: %{public}s", openResult.code, openResult.reason);
21. }

23. static void onMessage(struct WebSocket *wsClient, char *data, uint32_t length)
24. {
25. (void)wsClient;
26. char *tmp = new char[length + 1];
27. for (uint32_t i = 0; i < length; i++) {
28. tmp[i] = data[i];
29. }
30. tmp[length] = '\0';
31. OH_LOG_INFO(LOG_APP, "onMessage: len: %{public}u, data: %{public}s", length, tmp);
32. }

34. static void onError(struct WebSocket *wsClient, WebSocket_ErrorResult errorResult)
35. {
36. (void)wsClient;
37. OH_LOG_INFO(LOG_APP, "onError: code: %{public}u, message: %{public}s", errorResult.errorCode,
38. errorResult.errorMessage);
39. }

41. static void onClose(struct WebSocket *wsClient, WebSocket_CloseResult closeResult)
42. {
43. (void)wsClient;
44. OH_LOG_INFO(LOG_APP, "onClose: code: %{public}u, reason: %{public}s", closeResult.code, closeResult.reason);
45. }

47. static napi_value ConnectWebsocket(napi_env env, napi_callback_info info)
48. {
49. size_t argc = 2;
50. napi_value args[2] = {nullptr};
51. napi_value result;

53. napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

55. size_t length = 0;
56. napi_status status = napi_get_value_string_utf8(env, args[0], nullptr, 0, &length);
57. if (status != napi_ok) {
58. napi_get_boolean(env, false, &result);
59. return result;
60. }

62. if (g_client != nullptr) {
63. OH_LOG_INFO(LOG_APP, "there is already one websocket client running.");
64. napi_get_boolean(env, false, &result);
65. return result;
66. }
67. char *buf = new char[length + 1];
68. std::memset(buf, 0, length + 1);
69. napi_get_value_string_utf8(env, args[0], buf, length + 1, &length);
70. // 创建WebSocket Client对象指针
71. g_client = OH_WebSocketClient_Constructor(onOpen, onMessage, onError, onClose);
72. if (g_client == nullptr) {
73. delete[] buf;
74. napi_get_boolean(env, false, &result);
75. return result;
76. }
77. // 连接buf存放的URL对应的WebSocket服务器
78. int connectRet = OH_WebSocketClient_Connect(g_client, buf, {});

80. delete[] buf;
81. napi_get_boolean(env, connectRet == 0, &result);
82. return result;
83. }


86. static napi_value SendMessage(napi_env env, napi_callback_info info)
87. {
88. size_t argc = 1;
89. napi_value args[1] = {nullptr};
90. napi_value result;

92. napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

94. size_t length = 0;
95. napi_status status = napi_get_value_string_utf8(env, args[0], nullptr, 0, &length);
96. if (status != napi_ok) {
97. napi_create_int32(env, -1, &result);
98. return result;
99. }

101. if (g_client == nullptr) {
102. OH_LOG_INFO(LOG_APP, "websocket client not connected.");
103. napi_create_int32(env, WebSocket_ErrCode::WEBSOCKET_CLIENT_NULL, &result);
104. return result;
105. }
106. char *buf = new char[length + 1];
107. std::memset(buf, 0, length + 1);
108. napi_get_value_string_utf8(env, args[0], buf, length + 1, &length);
109. // 发送buf中的消息给服务器
110. int ret = OH_WebSocketClient_Send(g_client, buf, length);

112. delete[] buf;
113. napi_create_int32(env, ret, &result);
114. return result;
115. }

117. static napi_value CloseWebsocket(napi_env env, napi_callback_info info)
118. {
119. napi_value result;
120. if (g_client == nullptr) {
121. OH_LOG_INFO(LOG_APP, "websocket client not connected.");
122. napi_create_int32(env, -1, &result);
123. return result;
124. }
125. // 关闭WebSocket连接
126. int ret = OH_WebSocketClient_Close(g_client, {
127. .code = 0,
128. .reason = "Actively Close",
129. });
130. // 释放WebSocket资源并置空
131. OH_WebSocketClient_Destroy(g_client);
132. g_client = nullptr;
133. napi_create_int32(env, ret, &result);
134. return result;
135. }
```

[napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/NetWork_Kit/NetWorkKit_Datatransmission/WebSocket_C/entry/src/main/cpp/napi_init.cpp#L16-L152)

ConnectWebsocket函数接收一个WebSocket URL并尝试连接，连接成功返回true，否则返回false。在创建代表WebSocket客户端的WebSocket结构体指针前，需要定义以下回调函数：连接开启时的onOpen回调、接收普通消息的onMessage回调、接收错误消息的onError回调、接收关闭消息的onClose回调。在示例代码中，还调用了[OH\_WebSocketClient\_Send](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-h#oh_websocketclient_send)、[OH\_WebSocketClient\_Close](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-net-websocket-h#oh_websocketclient_close)等函数向服务器发送消息，主动关闭WebSocket连接。

2、将通过napi封装好的napi\_value类型对象初始化导出，通过外部函数接口，将函数暴露给JavaScript使用。示例代码中，ConnectWebsocket函数就会作为外部函数Connect暴露出去；SendMessage函数作为外部函数Send暴露出去；CloseWebsocket函数作为外部函数Close暴露出去。

收起

自动换行

深色代码主题

复制

```
1. EXTERN_C_START
2. static napi_value Init(napi_env env, napi_value exports)
3. {
4. napi_property_descriptor desc[] = {
5. {"Connect", nullptr, ConnectWebsocket, nullptr, nullptr, nullptr, napi_default, nullptr},
6. {"Send", nullptr, SendMessage, nullptr, nullptr, nullptr, napi_default, nullptr},
7. {"Close", nullptr, CloseWebsocket, nullptr, nullptr, nullptr, napi_default, nullptr},
8. };
9. napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
10. return exports;
11. }
12. EXTERN_C_END
```

[napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/NetWork_Kit/NetWorkKit_Datatransmission/WebSocket_C/entry/src/main/cpp/napi_init.cpp#L154-L167)

3、将上一步中初始化成功的对象通过RegisterEntryModule函数，使用napi\_module\_register函数将模块注册到 Node.js 中。

收起

自动换行

深色代码主题

复制

```
1. static napi_module demoModule = {
2. .nm_version = 1,
3. .nm_flags = 0,
4. .nm_filename = nullptr,
5. .nm_register_func = Init,
6. .nm_modname = "entry",
7. .nm_priv = ((void *)0),
8. .reserved = {0},
9. };

11. extern "C" __attribute__((constructor)) void RegisterEntryModule(void) { napi_module_register(&demoModule); }
```

[napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/NetWork_Kit/NetWorkKit_Datatransmission/WebSocket_C/entry/src/main/cpp/napi_init.cpp#L169-L181)

4、在工程的index.d.ts文件中定义函数的类型。比如，Connect函数接受一个string参数作为入参，并返回boolean值指示WebSocket连接是否能成功建立。

收起

自动换行

深色代码主题

复制

```
1. export const Connect: (url: string) => boolean;
2. export const Send: (data: string) => number;
3. export const Close: () => number;
```

[Index.d.ts](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/NetWork_Kit/NetWorkKit_Datatransmission/WebSocket_C/entry/src/main/cpp/types/libentry/Index.d.ts#L15-L19)

5、在index.ets文件中对上述封装好的接口进行调用。

收起

自动换行

深色代码主题

复制

```
1. import testWebsocket from 'libentry.so';

3. @Entry
4. @Component
5. struct Index {
6. @State wsUrl: string = '';
7. @State content: string = '';
8. @State connecting: boolean = false;

10. build() {
11. Navigation() {
12. Column() {
13. Column() {
14. Text($r('app.string.WebSocket_address'))
15. .fontColor(Color.Gray)
16. .textAlign(TextAlign.Start)
17. .width('100%')
18. TextInput()
19. .width('100%')
20. .id('textInput_address')
21. .onChange((value) => {
22. this.wsUrl = value;
23. })
24. }
25. .margin({
26. bottom: 16 // 与底间隔
27. })
28. .padding({
29. left: 16, // 与左间隔
30. right: 16 // 与右间隔
31. })

33. Column() {
34. Text($r('app.string.Content'))
35. .fontColor(Color.Gray)
36. .textAlign(TextAlign.Start)
37. .width('100%')
38. TextInput()
39. .width('100%')
40. .id('textInput_content')
41. .enabled(this.connecting)
42. .onChange((value) => {
43. this.content = value;
44. })
45. }
46. .margin({
47. bottom: 16 // 与底间隔
48. })
49. .padding({
50. left: 16, // 与左间隔
51. right: 16 // 与右间隔
52. })

54. Blank()

56. Column({
57. space: 12 // 占位空间
58. }) {
59. Button($r('app.string.Connect'))
60. .id('Connect')
61. .enabled(!this.connecting)
62. .onClick(() => {
63. let connRet = testWebsocket.Connect(this.wsUrl);
64. if (connRet) {
65. this.connecting = true;
66. // ···
67. }
68. // ···
69. })
70. Button($r('app.string.Send'))
71. .id('Send')
72. .enabled(this.connecting)
73. .onClick(() => {
74. testWebsocket.Send(this.content);
75. // ···
76. })
77. Button($r('app.string.Close'))
78. .id('Close')
79. .enabled(this.connecting)
80. .onClick(() => {
81. let closeResult = testWebsocket.Close();
82. if (closeResult != -1) {
83. this.connecting = false;
84. // ···
85. }
86. // ···
87. })
88. }
89. }
90. }
91. }
92. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/NetWork_Kit/NetWorkKit_Datatransmission/WebSocket_C/entry/src/main/ets/pages/Index.ets#L17-L147)

6、配置CMakeLists.txt，本模块需要用到的共享库是libnet\_websocket.so，在工程自动生成的CMakeLists.txt中的target\_link\_libraries中添加此共享库。

注意：如图所示，在add\_library中的entry是工程自动生成的modename，若要做修改，需和步骤3中.nm\_modname保持一致。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3/v3/w88FMYGpS76LyKDo4SR7sw/zh-cn_image_0000002571291911.png?HW-CC-KV=V1&HW-CC-Date=20260414T044613Z&HW-CC-Expire=86400&HW-CC-Sign=9BA84F1D40BA252A3D427A39D5E83C89457CB5D6F9E06AC615E795A010A924E4)

7、调用WebSocket C API接口要求应用拥有ohos.permission.INTERNET权限，在module.json5中的requestPermissions项添加该权限。

经过以上步骤，整个工程的搭建已经完成，接下来就可以连接设备运行工程进行日志查看了。

## 测试步骤

1、连接设备，使用DevEco Studio打开搭建好的工程。

2、运行工程，设备上会弹出以下图片所示界面：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8f/v3/mgic9GgLS_6TYsC--qJl3g/zh-cn_image_0000002540611964.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T044613Z&HW-CC-Expire=86400&HW-CC-Sign=0309BA229FFB8169EC93962915305B1A8A26EB64B02FFA9A6C113858E020C3AE)

简要说明：

* 在第一行的输入框中，输入ws://或wss://开头的WebSocket URL。
* 在输入完WebSocket URL，点击Connect按钮后，如果访问成功，会触发onOpen的回调，打印日志。
* 在Content输入框里输入要发送给服务器的内容，点击Send按钮发送。如果服务器返回消息，会触发onMessage回调，打印日志。
* 点击Close按钮，WebSocket连接释放，可以重新输入新的WebSocket URL。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ae/v3/Z73oD_aQROWA5Umkxp5X-w/zh-cn_image_0000002571171959.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T044613Z&HW-CC-Expire=86400&HW-CC-Sign=911CF81C8A67B816A48CEF488FA2F50A16B67FFA8C0883DBA51B2405002707B0)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4d/v3/Sk5cN7XZTw2gFCIZ6LXhqA/zh-cn_image_0000002540771618.png?HW-CC-KV=V1&HW-CC-Date=20260414T044613Z&HW-CC-Expire=86400&HW-CC-Sign=01763D383448205C856AD169A4ED9E695B27AEBFEB03C99EAC10FBA31C617394)