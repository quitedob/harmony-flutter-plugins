通过XComponent接入的第三方框架平台，NDK提供了对接无障碍服务的接口函数，使三方框架组件能够支持ArkUI中的基本无障碍功能，包括焦点获取、获取无障碍节点和操作响应。

如果需要支持单实例，使用XComponent的[OH\_NativeXComponent\_GetNativeAccessibilityProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h#oh_nativexcomponent_getnativeaccessibilityprovider)获得无障碍接入[ArkUI\_AccessibilityProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-accessibility-arkui-accessibilityprovider)。然后，通过[OH\_ArkUI\_AccessibilityProviderRegisterCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h#oh_arkui_accessibilityproviderregistercallback)注册接入无障碍所需的回调函数[ArkUI\_AccessibilityProviderCallbacks](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/accessibility-arkui-accessibilityprovidercallbacks)。

如果需要支持多实例，则通过[OH\_ArkUI\_AccessibilityProviderRegisterCallbackWithInstance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h#oh_arkui_accessibilityproviderregistercallbackwithinstance)注册接入无障碍所需的回调函数[ArkUI\_AccessibilityProviderCallbacksWithInstance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/y-arkui-accessibilityprovidercallbackswithinstance)。

在上述回调中，三方框架需要适配无障碍系统发出的操作[Action](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h#arkui_accessibility_actiontype)，并针对组件交互行为发送无障碍事件[Event](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h#arkui_accessibilityeventtype)到无障碍子系统，实现无障碍辅助应用的交互体验。

说明

* 无障碍能力：指开发者能够创建可访问的应用界面，满足视觉、听觉、运动和认知障碍等用户需求的能力。
* 实现[OH\_ArkUI\_AccessibilityProviderRegisterCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h#oh_arkui_accessibilityproviderregistercallback)或者[OH\_ArkUI\_AccessibilityProviderRegisterCallbackWithInstance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h#oh_arkui_accessibilityproviderregistercallbackwithinstance)回调查询接口时，查询到的每个无障碍节点信息通过[OH\_ArkUI\_AddAndGetAccessibilityElementInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h#oh_arkui_addandgetaccessibilityelementinfo)创建分配element内存，并将其加入到指定的elementList中。
* 使用[OH\_ArkUI\_SendAccessibilityAsyncEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h#oh_arkui_sendaccessibilityasyncevent)发送事件时，需要使用[OH\_ArkUI\_CreateAccessibilityEventInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h#oh_arkui_createaccessibilityeventinfo)创建[ArkUI\_AccessibilityEventInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-accessibility-arkui-accessibilityeventinfo)，使用[OH\_ArkUI\_CreateAccessibilityElementInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h#oh_arkui_createaccessibilityelementinfo)创建[ArkUI\_AccessibilityElementInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkui-accessibility-arkui-accessibilityelementinfo)，使用结束后，需要调用[OH\_ArkUI\_DestoryAccessibilityEventInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h#oh_arkui_destoryaccessibilityeventinfo)以及[OH\_ArkUI\_DestoryAccessibilityElementInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h#oh_arkui_destoryaccessibilityelementinfo)销毁函数释放内存。
* 回调函数打印日志时，携带输入的requestId，用于关联一次交互过程相关的日志，便于索引查询整个流程，协助问题定位。

以下示例提供了对接无障碍能力的实现方法，仅包含主要步骤，完整示例请参考[AccessibilityCapiSample](https://gitcode.com/openharmony/applications_app_samples/tree/master/code/DocsSample/ArkUISample/AccessibilityCapi)。对接完成后，在开启无障碍功能时，可使XComponent中的三方框架绘制组件接入，实现无障碍交互。

1. 按照自定义渲染（XComponent）的[使用OH\_ArkUI\_SurfaceHolder管理Surface生命周期](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/napi-xcomponent-guidelines#管理xcomponent持有surface的生命周期)场景创建前置工程。
2. 获得无障碍接入provider并注册回调函数（以多实例场景为例）。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. #include <arkui/native_interface_accessibility.h>
   2. #include <string>
   3. #include "common/common.h"
   4. // 完整实现请参考AccessibilityCapiSample。
   5. #include "fakenode/fake_node.h"
   6. // 完整实现请参考AccessibilityCapiSample。
   7. #include "AccessibilityManager.h"

   9. // ...
   10. AccessibilityManager::AccessibilityManager()
   11. {
   12. //    多实例场景
   13. accessibilityProviderCallbacksWithInstance_.findAccessibilityNodeInfosById = FindAccessibilityNodeInfosById;
   14. accessibilityProviderCallbacksWithInstance_.findAccessibilityNodeInfosByText = FindAccessibilityNodeInfosByText;
   15. accessibilityProviderCallbacksWithInstance_.findFocusedAccessibilityNode = FindFocusedAccessibilityNode;
   16. accessibilityProviderCallbacksWithInstance_.findNextFocusAccessibilityNode = FindNextFocusAccessibilityNode;
   17. accessibilityProviderCallbacksWithInstance_.executeAccessibilityAction = ExecuteAccessibilityAction;
   18. accessibilityProviderCallbacksWithInstance_.clearFocusedFocusAccessibilityNode = ClearFocusedFocusAccessibilityNode;
   19. accessibilityProviderCallbacksWithInstance_.getAccessibilityNodeCursorPosition = GetAccessibilityNodeCursorPosition;
   20. //    单实例场景
   21. accessibilityProviderCallbacks_.findAccessibilityNodeInfosById = FindAccessibilityNodeInfosById;
   22. accessibilityProviderCallbacks_.findAccessibilityNodeInfosByText = FindAccessibilityNodeInfosByText;
   23. accessibilityProviderCallbacks_.findFocusedAccessibilityNode = FindFocusedAccessibilityNode;
   24. accessibilityProviderCallbacks_.findNextFocusAccessibilityNode = FindNextFocusAccessibilityNode;
   25. accessibilityProviderCallbacks_.executeAccessibilityAction = ExecuteAccessibilityAction;
   26. accessibilityProviderCallbacks_.clearFocusedFocusAccessibilityNode = ClearFocusedFocusAccessibilityNode;
   27. accessibilityProviderCallbacks_.getAccessibilityNodeCursorPosition = GetAccessibilityNodeCursorPosition;
   28. }

   30. void AccessibilityManager::Initialize(const std::string &id, OH_NativeXComponent *nativeXComponent)
   31. {
   32. int32_t ret = OH_NativeXComponent_GetNativeAccessibilityProvider(nativeXComponent, &provider);
   33. if (provider == nullptr) {
   34. OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT, "get provider is null");
   35. return;
   36. }
   37. // 2.注册回调函数
   38. ret = OH_ArkUI_AccessibilityProviderRegisterCallbackWithInstance(id.c_str(), provider,
   39. &accessibilityProviderCallbacksWithInstance_);
   40. if (ret != 0) {
   41. OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT,
   42. "InterfaceDesignTest OH_ArkUI_AccessibilityProviderRegisterCallback failed");
   43. return;
   44. }
   45. g_provider = provider;
   46. }

   48. // ...
   ```

   [AccessibilityManager.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/AccessibilityCapi/entry/src/main/cpp/manager/AccessibilityManager.cpp#L16-L470)
3. 三方框架需要实现如下回调函数。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. int32_t AccessibilityManager::FindAccessibilityNodeInfosById(const char* instanceId, int64_t elementId,
   2. ArkUI_AccessibilitySearchMode mode, int32_t requestId, ArkUI_AccessibilityElementInfoList *elementList)
   3. {
   4. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT,
   5. "FindAccessibilityNodeInfosById start,instanceId %{public}s elementId: %{public}ld, "
   6. "requestId: %{public}d, mode: %{public}d", instanceId,
   7. elementId, requestId, static_cast<int32_t>(mode));
   8. if (elementList == nullptr) {
   9. OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT,
   10. "FindAccessibilityNodeInfosById elementList is null");
   11. return OH_NATIVEXCOMPONENT_RESULT_FAILED;
   12. }
   13. int ret = 0;
   14. const int parentOfRoot = -2100000;
   15. if (elementId == -1) {
   16. elementId = 0;
   17. }

   19. if (mode == ARKUI_ACCESSIBILITY_NATIVE_SEARCH_MODE_PREFETCH_RECURSIVE_CHILDREN) {
   20. // 三方框架需要在该方法中实现自己的查找策略，返回无障碍节点信息给无障碍服务，以下逻辑仅为示意过程。
   21. // ArkUI框架设计的特殊值，根节点必须设置parentId为这个值。
   22. auto rootNode = OH_ArkUI_AddAndGetAccessibilityElementInfo(elementList);
   23. if (!rootNode) {
   24. return OH_NATIVEXCOMPONENT_RESULT_FAILED;
   25. }
   26. // 设置根节点信息
   27. OH_ArkUI_AccessibilityElementInfoSetElementId(rootNode, 0);
   28. OH_ArkUI_AccessibilityElementInfoSetParentId(rootNode, parentOfRoot);
   29. FakeWidget::Instance().fillAccessibilityElement(rootNode);

   31. ArkUI_AccessibleRect rect;
   32. rect.leftTopX = NUMBER_ZERO;
   33. rect.leftTopY = NUMBER_ZERO;
   34. rect.rightBottomX = NUMBER_THIRD;
   35. rect.rightBottomY = NUMBER_THIRD;
   36. ret = OH_ArkUI_AccessibilityElementInfoSetScreenRect(rootNode, &rect);
   37. // 设置根节点不可被无障碍辅助服务所识别。
   38. OH_ArkUI_AccessibilityElementInfoSetAccessibilityLevel(rootNode, "no");
   39. auto objects = FakeWidget::Instance().GetAllObjects(instanceId);
   40. int64_t childNodes[1024];
   41. for (int i = 0; i < objects.size(); i++) {
   42. int elementId = i + 1;

   44. childNodes[i] = elementId;
   45. }
   46. for (int i = 0; i < objects.size(); i++) {
   47. int elementId = i + 1;
   48. childNodes[i] = elementId;
   49. auto child = OH_ArkUI_AddAndGetAccessibilityElementInfo(elementList);
   50. // 设置子节点信息。
   51. OH_ArkUI_AccessibilityElementInfoSetElementId(child, elementId);
   52. OH_ArkUI_AccessibilityElementInfoSetParentId(child, 0);
   53. // 设置当前组件可被无障碍辅助服务所识别。
   54. OH_ArkUI_AccessibilityElementInfoSetAccessibilityLevel(child, "yes");
   55. objects[i]->fillAccessibilityElement(child);

   57. ArkUI_AccessibleRect rect;
   58. rect.leftTopX = i * NUMBER_FIRST;
   59. rect.leftTopY = NUMBER_FIRST;
   60. rect.rightBottomX = i * NUMBER_FIRST + NUMBER_FIRST;
   61. rect.rightBottomY = NUMBER_SECOND;
   62. OH_ArkUI_AccessibilityElementInfoSetScreenRect(child, &rect);
   63. if (objects[i]->ObjectType() == "FakeSlider") {
   64. auto rangeInfo = objects[i]->GetRangeInfo();
   65. OH_ArkUI_AccessibilityElementInfoSetRangeInfo(child, &rangeInfo);
   66. }
   67. if (objects[i]->ObjectType() == "FakeList") {
   68. auto gridInfo = objects[i]->GetGridInfo();
   69. OH_ArkUI_AccessibilityElementInfoSetGridInfo(child, &gridInfo);
   70. }
   71. if (objects[i]->ObjectType() == "FakeSwiper") {
   72. auto gridItemInfo = objects[i]->GetGridItemInfo();
   73. OH_ArkUI_AccessibilityElementInfoSetGridItemInfo(child, &gridItemInfo);
   74. }
   75. }

   77. ret = OH_ArkUI_AccessibilityElementInfoSetChildNodeIds(rootNode, objects.size(), childNodes);
   78. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT,
   79. "FindAccessibilityNodeInfosById child count: %{public}ld %{public}d",
   80. objects.size(), ret);
   81. } else if (mode == ARKUI_ACCESSIBILITY_NATIVE_SEARCH_MODE_PREFETCH_CURRENT) {
   82. auto &widget = FakeWidget::Instance();
   83. AccessibleObject *obj = nullptr;
   84. if (elementId == 0) {
   85. obj = &widget;
   86. } else {
   87. obj = widget.GetChild(elementId);
   88. }
   89. if (!obj) {
   90. return OH_NATIVEXCOMPONENT_RESULT_FAILED;
   91. }
   92. auto node = OH_ArkUI_AddAndGetAccessibilityElementInfo(elementList);
   93. OH_ArkUI_AccessibilityElementInfoSetElementId(node, elementId);
   94. OH_ArkUI_AccessibilityElementInfoSetParentId(node, elementId == 0 ? parentOfRoot : 0);
   95. OH_ArkUI_AccessibilityElementInfoSetAccessibilityLevel(node, elementId == 0 ?  "no" : "yes");
   96. obj->fillAccessibilityElement(node);
   97. ArkUI_AccessibleRect rect;
   98. if (elementId == 0) {
   99. rect.leftTopX = NUMBER_ZERO;
   100. rect.leftTopY = NUMBER_ZERO;
   101. rect.rightBottomX = NUMBER_THIRD;
   102. rect.rightBottomY = NUMBER_THIRD;
   103. } else {
   104. int i = elementId - 1;
   105. rect.leftTopX = i * NUMBER_FIRST;
   106. rect.leftTopY = NUMBER_FIRST;
   107. rect.rightBottomX = i * NUMBER_FIRST + NUMBER_FIRST;
   108. rect.rightBottomY = NUMBER_SECOND;
   109. }

   111. OH_ArkUI_AccessibilityElementInfoSetScreenRect(node, &rect);
   112. if (elementId == 0) {
   113. auto objects = FakeWidget::Instance().GetAllObjects(instanceId);
   114. int64_t childNodes[1024];

   116. for (int i = 0; i < objects.size(); i++) {
   117. int elementId = i + 1;

   119. childNodes[i] = elementId;
   120. auto child = OH_ArkUI_AddAndGetAccessibilityElementInfo(elementList);
   121. OH_ArkUI_AccessibilityElementInfoSetElementId(child, elementId);
   122. OH_ArkUI_AccessibilityElementInfoSetParentId(child, 0);

   124. objects[i]->fillAccessibilityElement(child);

   126. ArkUI_AccessibleRect rect;
   127. rect.leftTopX = i * NUMBER_FIRST;
   128. rect.leftTopY = NUMBER_ZERO;
   129. rect.rightBottomX = i * NUMBER_FIRST + NUMBER_FIRST;
   130. rect.rightBottomY = NUMBER_SECOND;
   131. OH_ArkUI_AccessibilityElementInfoSetScreenRect(child, &rect);
   132. }
   133. ret = OH_ArkUI_AccessibilityElementInfoSetChildNodeIds(node, objects.size(), childNodes);
   134. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT,
   135. "FindAccessibilityNodeInfosById child2 count: %{public}ld", objects.size());
   136. }
   137. }
   138. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT, "FindAccessibilityNodeInfosById end");
   139. return OH_NATIVEXCOMPONENT_RESULT_SUCCESS;
   140. }
   ```

   [AccessibilityManager.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/AccessibilityCapi/entry/src/main/cpp/manager/AccessibilityManager.cpp#L114-L251)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. int32_t AccessibilityManager::FindNextFocusAccessibilityNode(const char* instanceId, int64_t elementId,
   2. ArkUI_AccessibilityFocusMoveDirection direction, int32_t requestId,
   3. ArkUI_AccessibilityElementInfo *elementInfo)
   4. {
   5. // 查找下一个可聚焦的无障碍节点，三方框架需要在该方法中实现自己的查找策略，以下逻辑仅为示意过程。
   6. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT,
   7. "FindNextFocusAccessibilityNode instanceId %{public}s "
   8. "elementId: %{public}ld, requestId: %{public}d, direction: %{public}d",
   9. instanceId, elementId, requestId, static_cast<int32_t>(direction));
   10. auto objects = FakeWidget::Instance().GetAllObjects(instanceId);
   11. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT, "objects.size() %{public}d", objects.size());
   12. // object.size 不包含 root节点
   13. if ((elementId < 0) || (elementId > objects.size())) {
   14. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT, "elementId invalid");
   15. return OH_NATIVEXCOMPONENT_RESULT_FAILED;
   16. }
   17. int64_t nextElementId = -1;
   18. if (direction == ARKUI_ACCESSIBILITY_NATIVE_DIRECTION_FORWARD) {
   19. nextElementId = elementId + 1;
   20. } else {
   21. nextElementId = elementId - 1;
   22. }

   24. // 屏幕朗读约束 如果是根节点 然后backward的话需要回到最后一个节点
   25. if ((nextElementId == -1) && (direction == ARKUI_ACCESSIBILITY_NATIVE_DIRECTION_BACKWARD)) {
   26. nextElementId = objects.size();
   27. }

   29. if (nextElementId >  objects.size()) {
   30. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT, "nextElementId invalid");
   31. return OH_NATIVEXCOMPONENT_RESULT_FAILED;
   32. }

   34. if (nextElementId <=  0) {
   35. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT, "nextElementId less than zero");
   36. return OH_NATIVEXCOMPONENT_RESULT_FAILED;
   37. }
   38. OH_ArkUI_AccessibilityElementInfoSetElementId(elementInfo, nextElementId);
   39. OH_ArkUI_AccessibilityElementInfoSetParentId(elementInfo, 0);
   40. // id 比object索引大1
   41. objects[nextElementId - 1]->fillAccessibilityElement(elementInfo);
   42. ArkUI_AccessibleRect rect;
   43. rect.leftTopX = nextElementId * NUMBER_FIRST;
   44. rect.leftTopY = NUMBER_ZERO;
   45. rect.rightBottomX = nextElementId * NUMBER_FIRST + NUMBER_FIRST;
   46. rect.rightBottomY = NUMBER_SECOND;
   47. OH_ArkUI_AccessibilityElementInfoSetScreenRect(elementInfo, &rect);
   48. auto eventInfo = OH_ArkUI_CreateAccessibilityEventInfo();
   49. OH_ArkUI_AccessibilityEventSetRequestFocusId(eventInfo, requestId);
   50. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT, "%{public}ld", nextElementId);
   51. return OH_NATIVEXCOMPONENT_RESULT_SUCCESS;
   52. }
   ```

   [AccessibilityManager.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/AccessibilityCapi/entry/src/main/cpp/manager/AccessibilityManager.cpp#L279-L331)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. int32_t AccessibilityManager::FindAccessibilityNodeInfosByText(const char* instanceId, int64_t elementId,
   2. const char *text, int32_t requestId, ArkUI_AccessibilityElementInfoList *elementList)
   3. {
   4. // 三方框架需实现根据文本内容查询无障碍节点的逻辑。
   5. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT,
   6. "FindAccessibilityNodeInfosByText start,instanceId %{public}s elementId: %{public}ld, "
   7. "requestId: %{public}d, text: %{public}s.", instanceId,
   8. elementId, requestId, text);
   9. return OH_NATIVEXCOMPONENT_RESULT_SUCCESS;
   10. }
   ```

   [AccessibilityManager.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/AccessibilityCapi/entry/src/main/cpp/manager/AccessibilityManager.cpp#L253-L264)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. int32_t AccessibilityManager::FindFocusedAccessibilityNode(const char* instanceId, int64_t elementId,
   2. ArkUI_AccessibilityFocusType focusType, int32_t requestId, ArkUI_AccessibilityElementInfo *elementInfo)
   3. {
   4. // 三方框架需实现基于指定节点获取焦点元素信息的逻辑。
   5. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT,
   6. "FindFocusedAccessibilityNode start instanceId %{public}s, "
   7. "elementId: %{public}ld, requestId: %{public}d, focusType: %{public}d",
   8. instanceId, elementId, requestId, static_cast<int32_t>(focusType));
   9. return OH_NATIVEXCOMPONENT_RESULT_SUCCESS;
   10. }
   ```

   [AccessibilityManager.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/AccessibilityCapi/entry/src/main/cpp/manager/AccessibilityManager.cpp#L266-L277)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. void FillEvent(ArkUI_AccessibilityEventInfo *eventInfo, ArkUI_AccessibilityElementInfo *elementInfo,
   2. ArkUI_AccessibilityEventType eventType, std::string announcedText)
   3. {
   4. if (eventInfo == nullptr) {
   5. return;
   6. }
   7. if (elementInfo == nullptr) {
   8. return;
   9. }
   10. // 设置事件类型
   11. OH_ArkUI_AccessibilityEventSetEventType(eventInfo, eventType);
   12. // 设置事件对应的元素信息
   13. OH_ArkUI_AccessibilityEventSetElementInfo(eventInfo, elementInfo);

   15. if (eventType == ARKUI_ACCESSIBILITY_NATIVE_EVENT_TYPE_ANNOUNCE_FOR_ACCESSIBILITY && announcedText.size() > 0) {
   16. // 给无障碍节点设置优先播报的无障碍文本
   17. OH_ArkUI_AccessibilityEventSetTextAnnouncedForAccessibility(eventInfo, announcedText.data());
   18. }
   19. }

   21. // ...

   23. void AccessibilityManager::SendAccessibilityAsyncEvent(ArkUI_AccessibilityElementInfo *elementInfo,
   24. ArkUI_AccessibilityEventType eventType,
   25. std::string announcedText)
   26. {
   27. auto eventInfo = OH_ArkUI_CreateAccessibilityEventInfo();
   28. // 1.填写event内容
   29. FillEvent(eventInfo, elementInfo, eventType, announcedText);
   30. // 2.callback
   31. auto callback = [](int32_t errorCode) {
   32. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT, "result: %{public}d", errorCode);
   33. };
   34. // 3. 调用接口发送事件给OH侧
   35. OH_ArkUI_SendAccessibilityAsyncEvent(g_provider, eventInfo, callback);
   36. }
   37. // ...

   39. int32_t AccessibilityManager::ExecuteAccessibilityAction(const char* instanceId, int64_t elementId,
   40. ArkUI_Accessibility_ActionType action, ArkUI_AccessibilityActionArguments *actionArguments, int32_t requestId)
   41. {
   42. // 三方框架需要实现执行无障碍节点行为的逻辑。
   43. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT,
   44. "ExecuteAccessibilityAction instanceId %{public}s elementId: %{public}ld, "
   45. "action: %{public}d, requestId: %{public}d",
   46. instanceId, elementId, action, requestId);
   47. auto object = FakeWidget::Instance().GetChild(elementId);
   48. // 传入的无障碍节点对象可能为空，需要做非空判断。
   49. if (!object) {
   50. return 0;
   51. }
   52. // 获取无障碍节点element。
   53. auto announcedText = object->GetAnnouncedForAccessibility();
   54. auto element = OH_ArkUI_CreateAccessibilityElementInfo();
   55. OH_ArkUI_AccessibilityElementInfoSetElementId(element, elementId);
   56. const char *actionKey = "some_key";
   57. char *actionValue = nullptr;
   58. OH_ArkUI_FindAccessibilityActionArgumentByKey(actionArguments, actionKey, &actionValue);
   59. // 根据action类型执行对应的行为。
   60. switch (action) {
   61. case ARKUI_ACCESSIBILITY_NATIVE_ACTION_TYPE_CLICK:
   62. if (object) {
   63. object->OnClick();
   64. object->fillAccessibilityElement(element);
   65. }
   66. // 向无障碍服务发送指定事件。
   67. AccessibilityManager::SendAccessibilityAsyncEvent(element,
   68. ARKUI_ACCESSIBILITY_NATIVE_EVENT_TYPE_CLICKED, announcedText);
   69. break;
   70. case ARKUI_ACCESSIBILITY_NATIVE_ACTION_TYPE_GAIN_ACCESSIBILITY_FOCUS:
   71. if (object) {
   72. object->SetFocus(true);

   74. object->fillAccessibilityElement(element);
   75. }
   76. // 向无障碍服务发送指定事件。
   77. AccessibilityManager::SendAccessibilityAsyncEvent(element,
   78. ARKUI_ACCESSIBILITY_NATIVE_EVENT_TYPE_ACCESSIBILITY_FOCUSED,
   79. announcedText);
   80. break;
   81. case ARKUI_ACCESSIBILITY_NATIVE_ACTION_TYPE_CLEAR_ACCESSIBILITY_FOCUS:
   82. if (object) {
   83. object->SetFocus(false);
   84. object->fillAccessibilityElement(element);
   85. }
   86. AccessibilityManager::SendAccessibilityAsyncEvent(
   87. element, ARKUI_ACCESSIBILITY_NATIVE_EVENT_TYPE_ACCESSIBILITY_FOCUS_CLEARED,
   88. announcedText);
   89. break;
   90. default:
   91. // 处理不支持的action行为。
   92. break;
   93. }
   94. OH_ArkUI_DestoryAccessibilityElementInfo(element);
   95. return OH_NATIVEXCOMPONENT_RESULT_SUCCESS;
   96. }
   ```

   [AccessibilityManager.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/AccessibilityCapi/entry/src/main/cpp/manager/AccessibilityManager.cpp#L36-L387)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. int32_t AccessibilityManager::ClearFocusedFocusAccessibilityNode(const char* instanceId)
   2. {
   3. // 三方框架需要实现清除当前获焦的节点的行为。
   4. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT,
   5. "ClearFocusedFocusAccessibilityNode, instanceId %{public}s", instanceId);
   6. return OH_NATIVEXCOMPONENT_RESULT_SUCCESS;
   7. }
   ```

   [AccessibilityManager.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/AccessibilityCapi/entry/src/main/cpp/manager/AccessibilityManager.cpp#L389-L397)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. int32_t AccessibilityManager::GetAccessibilityNodeCursorPosition(const char* instanceId, int64_t elementId,
   2. int32_t requestId, int32_t *index)
   3. {
   4. // 三方框架需要实现获取当前组件中（文本组件）光标位置。
   5. OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_PRINT_TEXT,
   6. "GetAccessibilityNodeCursorPosition, instanceId %{public}s "
   7. "elementId: %{public}ld, requestId: %{public}d, index: %{public}d",
   8. instanceId, elementId, requestId, index);
   9. return OH_NATIVEXCOMPONENT_RESULT_SUCCESS;
   10. }
   ```

   [AccessibilityManager.cpp](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/AccessibilityCapi/entry/src/main/cpp/manager/AccessibilityManager.cpp#L399-L410)
4. provider通过回调函数[OH\_ArkUI\_AccessibilityProviderRegisterCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h#oh_arkui_accessibilityproviderregistercallback)或者[OH\_ArkUI\_AccessibilityProviderRegisterCallbackWithInstance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h#oh_arkui_accessibilityproviderregistercallbackwithinstance)对接成功后，可开启无障碍功能。