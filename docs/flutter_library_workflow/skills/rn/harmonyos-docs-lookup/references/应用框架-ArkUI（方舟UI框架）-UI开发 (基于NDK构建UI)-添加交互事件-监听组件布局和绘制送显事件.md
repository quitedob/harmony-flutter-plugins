从API version 16开始，NDK接口针对UI组件的布局或绘制送显完成，提供了注册与取消监听函数的方式。开发者可使用如下接口监听指定节点布局完成或者绘制送显完成的时机，并注册相应的回调函数。可使用[OH\_ArkUI\_RegisterLayoutCallbackOnNodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#oh_arkui_registerlayoutcallbackonnodehandle)注册组件布局完成的回调方法。可使用[OH\_ArkUI\_RegisterDrawCallbackOnNodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#oh_arkui_registerdrawcallbackonnodehandle)注册绘制送显完成的回调方法。可使用[OH\_ArkUI\_UnregisterLayoutCallbackOnNodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#oh_arkui_unregisterlayoutcallbackonnodehandle)取消组件布局完成的回调方法注册。可使用[OH\_ArkUI\_UnregisterDrawCallbackOnNodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#oh_arkui_unregisterdrawcallbackonnodehandle)取消绘制送显完成的回调方法注册。

说明

[OH\_ArkUI\_RegisterLayoutCallbackOnNodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#oh_arkui_registerlayoutcallbackonnodehandle)和[OH\_ArkUI\_RegisterDrawCallbackOnNodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#oh_arkui_registerdrawcallbackonnodehandle)能够监听组件的布局完成或者绘制送显完成事件触发，但只能传递一个函数指针，多次调用使用最后一次的函数指针进行回调。

以下示例基于[接入ArkTS页面](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ndk-access-the-arkts-page)章节，补充相关事件监听。

在ArkUITextNode对象中实现布局或者绘制送显完成事件注册逻辑。

收起

自动换行

深色代码主题

复制

```
1. // ArkUITextNode.h
2. // 实现文本组件的封装类。
3. #ifndef MYAPPLICATION_ARKUITEXTNODE_H
4. #define MYAPPLICATION_ARKUITEXTNODE_H

6. #include <arkui/native_type.h>
7. #include <arkui/native_node.h>
8. #include <hilog/log.h>
9. #include "ArkUINode.h"
10. #include <string>

12. // ···
13. namespace NativeModule {
14. const unsigned int LOG_PRINT_DOMAIN = 0xFF00;
15. // 布局完成的回调方法
16. void OnLayoutCompleted(void *userData)
17. {
18. ArkUI_NodeHandle node = (ArkUI_NodeHandle)userData;
19. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, "Callback", "the text_node is layout completed");
20. ArkUI_NativeNodeAPI_1 *nativeModule = NativeModuleInstance::GetInstance()->GetNativeNodeAPI();
21. ArkUI_AttributeItem item = {nullptr, 0, "layout callback"};
22. nativeModule->setAttribute(node, NODE_TEXT_CONTENT, &item);
23. }
24. // 绘制送显完成的回调方法
25. void OnDrawCompleted(void *userData)
26. {
27. ArkUI_NodeHandle node = (ArkUI_NodeHandle)userData;
28. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, "Callback", "the text_node is draw completed");
29. ArkUI_NativeNodeAPI_1 *nativeModule = NativeModuleInstance::GetInstance()->GetNativeNodeAPI();
30. ArkUI_AttributeItem item = {nullptr, 0, "draw callback"};
31. nativeModule->setAttribute(node, NODE_TEXT_CONTENT, &item);
32. }
33. // ···
34. class ArkUITextNode : public ArkUINode {
35. public:
36. ArkUITextNode()
37. : ArkUINode((NativeModuleInstance::GetInstance()->GetNativeNodeAPI())->createNode(ARKUI_NODE_TEXT)) {}
38. void SetFontSize(float fontSize)
39. {
40. ArkUI_NumberValue value[] = {{.f32 = fontSize}};
41. ArkUI_AttributeItem item = {value, 1};
42. nativeModule_->setAttribute(handle_, NODE_FONT_SIZE, &item);
43. }
44. void SetFontColor(uint32_t color)
45. {
46. ArkUI_NumberValue value[] = {{.u32 = color}};
47. ArkUI_AttributeItem item = {value, 1};
48. nativeModule_->setAttribute(handle_, NODE_FONT_COLOR, &item);
49. }
50. void SetTextContent(const std::string &content)
51. {
52. ArkUI_AttributeItem item = {nullptr, 0, content.c_str()};
53. nativeModule_->setAttribute(handle_, NODE_TEXT_CONTENT, &item);
54. }
55. void SetTextAlign(ArkUI_TextAlignment align)
56. {
57. ArkUI_NumberValue value[] = {{.i32 = align}};
58. ArkUI_AttributeItem item = {value, 1};
59. nativeModule_->setAttribute(handle_, NODE_TEXT_ALIGN, &item);
60. }
61. void SetLayoutCallBack(int32_t nodeId)
62. {
63. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, "Callback", "set layout callback");
64. // 注册布局完成的回调方法
65. OH_ArkUI_RegisterLayoutCallbackOnNodeHandle(handle_, this, OnLayoutCompleted);
66. }
67. void ResetLayoutCallBack()
68. {
69. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, "Callback", "reset layout callback");
70. // 取消注册布局完成的回调方法
71. OH_ArkUI_UnregisterLayoutCallbackOnNodeHandle(handle_);
72. }
73. void SetDrawCallBack(int32_t nodeId)
74. {
75. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, "Callback", "set draw callback");
76. // 注册绘制送显完成的回调方法
77. OH_ArkUI_RegisterDrawCallbackOnNodeHandle(handle_, this, OnDrawCompleted);
78. }
79. void ResetDrawCallBack()
80. {
81. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, "Callback", "reset draw callback");
82. // 取消注册绘制送显完成的回调方法
83. OH_ArkUI_UnregisterDrawCallbackOnNodeHandle(handle_);
84. }
85. void SetInspectorId(std::string inspectorId)
86. {
87. ArkUI_AttributeItem item = {nullptr, 0, inspectorId.c_str()};
88. nativeModule_->setAttribute(handle_, NODE_ID, &item);
89. }
90. // ···
91. };
92. } // namespace NativeModule

94. #endif // MYAPPLICATION_ARKUITEXTNODE_H
```

[ArkUITextNode.h](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NativeType/NativeNodeUtilsSample/entry/src/main/cpp/ArkUITextNode.h#L15-L130)

收起

自动换行

深色代码主题

复制

```
1. // NormalTextListExample.h
2. // 自定义接入入口函数

4. #ifndef MYAPPLICATION_NORMALTEXTLISTEXAMPLE_H
5. #define MYAPPLICATION_NORMALTEXTLISTEXAMPLE_H

7. #include "ArkUIBaseNode.h"
8. #include "ArkUIListItemNode.h"
9. #include "ArkUIListNode.h"
10. #include "ArkUITextNode.h"
11. #include <hilog/log.h>
12. #define SIZE_16 16
13. #define SIZE_100 100
14. #define COLOR_BACKGROUND 0xFFfffacd

16. namespace NativeModule {

18. std::shared_ptr<ArkUIBaseNode> CreateTextListExample()
19. {
20. // 创建组件并挂载
21. // 1：使用智能指针创建List组件。
22. auto list = std::make_shared<ArkUIListNode>();
23. list->SetPercentWidth(1);
24. list->SetPercentHeight(1);
25. // 2：创建ListItem子组件并挂载到List上。
26. for (int32_t i = 0; i < 1; ++i) {
27. auto listItem = std::make_shared<ArkUIListItemNode>();
28. auto textNode = std::make_shared<ArkUITextNode>();
29. textNode->SetTextContent(std::to_string(i));
30. textNode->SetFontSize(SIZE_16);
31. textNode->SetPercentWidth(1);
32. textNode->SetHeight(SIZE_100);
33. textNode->SetBackgroundColor(COLOR_BACKGROUND);
34. textNode->SetTextAlign(ARKUI_TEXT_ALIGNMENT_CENTER);
35. // 在当前节点注册布局回调
36. textNode->SetLayoutCallBack(i);
37. // 在当前节点注册绘制送显回调
38. textNode->SetDrawCallBack(i);
39. listItem->AddChild(textNode);
40. list->AddChild(listItem);
41. }
42. return list;
43. }
44. } // namespace NativeModule

46. #endif // MYAPPLICATION_NORMALTEXTLISTEXAMPLE_H
```

[NormalTextListExample.h](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/NativeType/NativeNodeUtilsSample/entry/src/main/cpp/NormalTextListExample.h#L15-L62)