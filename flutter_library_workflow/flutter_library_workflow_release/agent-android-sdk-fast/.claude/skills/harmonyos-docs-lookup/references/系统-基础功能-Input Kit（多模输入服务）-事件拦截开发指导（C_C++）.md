## 功能介绍

从API version 12开始，多模为应用提供了创建和删除按键、输入事件（鼠标、触摸和轴事件）拦截的能力。使用场景例如：云桌面应用需要拦截按键、鼠标、触摸和轴事件。

## 接口说明

创建和删除事件拦截相关接口如下表所示，接口详细介绍请参考[Input文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-input)。

展开

| 接口名称 | 描述 |
| --- | --- |
| Input\_Result OH\_Input\_AddKeyEventInterceptor(Input\_KeyEventCallback callback, Input\_InterceptorOptions \*option) | 创建按键事件拦截。 |
| Input\_Result OH\_Input\_AddInputEventInterceptor(Input\_InterceptorEventCallback \*callback, Input\_InterceptorOptions \*option) | 创建输入事件拦截，包含鼠标、触摸和轴事件。 |
| Input\_Result OH\_Input\_RemoveKeyEventInterceptor() | 删除按键事件拦截。 |
| Input\_Result OH\_Input\_RemoveInputEventInterceptor() | 删除输入事件拦截，包含鼠标、触摸和轴事件。 |

## 开发步骤

### 链接动态库

调用创建和删除事件拦截前，需链接相关动态库。链接动态库的方法是，在CMakeList.txt文件中做下面例子所示的配置：

收起

自动换行

深色代码主题

复制

```
1. target_link_libraries(entry PUBLIC libohinput.so)
```

### 申请所需权限

应用需要在module.json5中添加下面权限的配置，详细的配置方法参考[声明权限文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)。

收起

自动换行

深色代码主题

复制

```
1. "requestPermissions": [
2. {
3. "name": "ohos.permission.INTERCEPT_INPUT_EVENT"
4. }
5. ]
```

### 创建事件拦截

* **按键事件**

收起

自动换行

深色代码主题

复制

```
1. struct KeyEvent {
2. int32_t action;
3. int32_t keyCode;
4. int64_t actionTime { -1 };
5. };

7. // 定义按键事件回调函数
8. void OnKeyEventCallback(const Input_KeyEvent* keyEvent)
9. {
10. KeyEvent event;
11. // Input_KeyEvent的生命周期仅限于回调函数内，回调函数执行完毕后会被自动销毁
12. event.action = OH_Input_GetKeyEventAction(keyEvent);
13. event.keyCode = OH_Input_GetKeyEventKeyCode(keyEvent);
14. event.actionTime = OH_Input_GetKeyEventActionTime(keyEvent);
15. // ...
16. }

18. static napi_value AddKeyEventInterceptor(napi_env env, napi_callback_info info)
19. {
20. Input_Result ret = OH_Input_AddKeyEventInterceptor(OnKeyEventCallback, nullptr);
21. // ...
22. }

24. static napi_value RemoveKeyEventInterceptor(napi_env env, napi_callback_info info)
25. {
26. Input_Result ret = OH_Input_RemoveKeyEventInterceptor();
27. // ...
28. }
```

[napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/InputKit/NDKInputEventInterceptor/entry/src/main/cpp/napi_init.cpp#L58-L114)

* **输入拦截（鼠标、触摸和轴事件）**

收起

自动换行

深色代码主题

复制

```
1. struct MouseEvent {
2. int32_t action;
3. int32_t displayX;
4. int32_t displayY;
5. int32_t button { -1 };
6. int32_t axisType { -1 };
7. float axisValue { 0.0f };
8. int64_t actionTime { -1 };
9. };

11. struct TouchEvent {
12. int32_t action;
13. int32_t id;
14. int32_t displayX;
15. int32_t displayY;
16. int64_t actionTime { -1 };
17. };

19. struct AxisEvent {
20. int32_t axisAction;
21. float displayX;
22. float displayY;
23. std::map<int32_t, double> axisValues;
24. int64_t actionTime { -1 };
25. int32_t sourceType;
26. int32_t axisEventType { -1 };
27. };

29. // 定义鼠标事件回调函数
30. void OnMouseEventCallback(const Input_MouseEvent* mouseEvent)
31. {
32. MouseEvent event;
33. // Input_MouseEvent的生命周期仅在回调函数内，出了回调函数会被销毁
34. event.action = OH_Input_GetMouseEventAction(mouseEvent);
35. event.displayX = OH_Input_GetMouseEventDisplayX(mouseEvent);
36. event.displayY = OH_Input_GetMouseEventDisplayY(mouseEvent);
37. event.button = OH_Input_GetMouseEventButton(mouseEvent);
38. event.axisType = OH_Input_GetMouseEventAxisType(mouseEvent);
39. event.axisValue = OH_Input_GetMouseEventAxisValue(mouseEvent);
40. event.actionTime = OH_Input_GetMouseEventActionTime(mouseEvent);
41. // ···
42. }

44. // 定义触摸事件回调函数
45. void OnTouchEventCallback(const Input_TouchEvent* touchEvent)
46. {
47. TouchEvent event;
48. // Input_TouchEvent的生命周期仅在回调函数内，出了回调函数会被销毁
49. event.action = OH_Input_GetTouchEventAction(touchEvent);
50. event.id = OH_Input_GetTouchEventFingerId(touchEvent);
51. event.displayX = OH_Input_GetTouchEventDisplayX(touchEvent);
52. event.displayY = OH_Input_GetTouchEventDisplayY(touchEvent);
53. event.actionTime = OH_Input_GetTouchEventActionTime(touchEvent);
54. // ···
55. }

57. // 定义轴事件回调函数
58. void OnAxisEventCallback(const Input_AxisEvent* axisEvent)
59. {
60. AxisEvent event;

62. // Input_AxisEvent的生命周期仅在回调函数内，出了回调函数会被销毁
63. InputEvent_AxisAction action;
64. Input_Result ret = OH_Input_GetAxisEventAction(axisEvent, &action);
65. event.axisAction = action;
66. ret = OH_Input_GetAxisEventDisplayX(axisEvent, &event.displayX);
67. ret = OH_Input_GetAxisEventDisplayY(axisEvent, &event.displayY);
68. ret = OH_Input_GetAxisEventActionTime(axisEvent, &event.actionTime);
69. InputEvent_SourceType sourceType;
70. ret = OH_Input_GetAxisEventSourceType(axisEvent, &sourceType);
71. event.sourceType = sourceType;
72. InputEvent_AxisEventType axisEventType;
73. ret = OH_Input_GetAxisEventType(axisEvent, &axisEventType);
74. event.axisEventType = axisEventType;
75. if (event.axisEventType == AXIS_EVENT_TYPE_PINCH) {
76. double value = 0;
77. ret = OH_Input_GetAxisEventAxisValue(axisEvent, AXIS_TYPE_PINCH, &value);
78. event.axisValues.insert(std::make_pair(AXIS_TYPE_PINCH, value));
79. ret = OH_Input_GetAxisEventAxisValue(axisEvent, AXIS_TYPE_ROTATE, &value);
80. event.axisValues.insert(std::make_pair(AXIS_TYPE_ROTATE, value));
81. } else if (event.axisEventType == AXIS_EVENT_TYPE_SCROLL) {
82. double value = 0;
83. ret = OH_Input_GetAxisEventAxisValue(axisEvent, AXIS_TYPE_SCROLL_VERTICAL, &value);
84. event.axisValues.insert(std::make_pair(AXIS_TYPE_SCROLL_VERTICAL, value));
85. ret = OH_Input_GetAxisEventAxisValue(axisEvent, AXIS_TYPE_SCROLL_HORIZONTAL, &value);
86. event.axisValues.insert(std::make_pair(AXIS_TYPE_SCROLL_HORIZONTAL, value));
87. }
88. // ···
89. }

91. // 输入事件回调函数结构体
92. Input_InterceptorEventCallback g_eventCallback;

94. static napi_value AddEventInterceptor(napi_env env, napi_callback_info info)
95. {
96. // 设置鼠标事件回调函数
97. g_eventCallback.mouseCallback = OnMouseEventCallback;
98. // 设置触摸事件回调函数
99. g_eventCallback.touchCallback = OnTouchEventCallback;
100. // 设置轴事件回调函数
101. g_eventCallback.axisCallback = OnAxisEventCallback;
102. Input_Result ret = OH_Input_AddInputEventInterceptor(&g_eventCallback, nullptr);
103. // ···
104. }

106. static napi_value RemoveEventInterceptor(napi_env env, napi_callback_info info)
107. {
108. Input_Result ret = OH_Input_RemoveInputEventInterceptor();
109. // ···
110. }
```

[napi\_init.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/InputKit/NDKInputEventInterceptor/entry/src/main/cpp/napi_init.cpp#L116-L281)

## 完整示例

* [输入事件拦截（C/C++）](https://gitcode.com/openharmony/applications_app_samples/tree/master/code/DocsSample/InputKit/NDKInputEventInterceptor)