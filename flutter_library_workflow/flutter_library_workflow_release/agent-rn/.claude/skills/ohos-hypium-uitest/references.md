# 原始文件引用索引

本文档列出编写 Hypium UI 自动化用例时所有权威来源的路径。Agent 在 CWD（`repos-rn/{module_name}/`）下运行时，`.claude/` 为符号链接，路径以 `./.claude/skills/...` 访问。

---

## 1. 官方 API 与类型定义

| 资源 | 路径 | 说明 |
|------|------|------|
| **@kit.TestKit Kit 入口** | `harmonyos-sdk-api-lookup/sdk/openharmony/ets/kits/@kit.TestKit.d.ts` | 重导出 `@ohos.UiTest` 全部符号；Skill 机器上位于 `~/.claude/skills/Harmony-Skills/harmonyos-sdk-api-lookup/sdk/openharmony/ets/kits/@kit.TestKit.d.ts` |
| **@ohos.UiTest 完整类型** | `harmonyos-sdk-api-lookup/sdk/openharmony/ets/api/@ohos.UiTest.d.ts` | `Driver` / `Component` / `ON` / `UiDirection` / `PointerMatrix` 等全部方法签名 |
| **UiTest 官方 API 文档（中文）** | `harmonyos-sdk-api-lookup/api-references/系统-调测调优-Test Kit（应用测试服务）-ArkTS API-@ohos.UiTest.md` | 含示例代码、参数说明、错误码链接；约 9300 行 |
| **uitest 错误码** | `harmonyos-sdk-api-lookup/api-references/系统-调测调优-Test Kit（应用测试服务）-错误码-uitest错误码.md` | 17000002 / 17000004 / 401 等 |
| **在线 API 参考** | https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-uitest | 与本地 markdown 同源 |
| **UI 测试开发指导** | https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uitest-guidelines | ArkTS 接口进行 UI 测试的官方指南 |
| **在线错误码** | https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-uitest | uitest 专项错误码 |

查找 SDK 文档时加载 Skill：`harmonyos-sdk-api-lookup`。

---

## 2. 本项目 Agent 资源（agent-rn）

| 资源 | 路径（相对 agent-rn 根） | 说明 |
|------|--------------------------|------|
| **本 Skill 主文档** | `.claude/skills/ohos-hypium-uitest/SKILL.md` | TestKit 写法与场景 |
| **场景详解** | `.claude/skills/ohos-hypium-uitest/scenarios.md` | 滚动/捏合/弹窗决策树 |
| **本索引** | `.claude/skills/ohos-hypium-uitest/references.md` | 原始文件路径汇总 |
| **测试门禁与校验** | `.claude/skills/tool-testing/SKILL.md` | §3 用例生成；§4 设备验证 |
| **Integration-Test Subagent** | `.claude/prompts/sub-integration-test.md` | 生成/修补 ModuleTest 流程 |
| **Device-Verify Subagent** | `.claude/prompts/sub-device-verify.md` | `hvigorw onDeviceTest` 真机执行 |
| **Testing 阶段主 Prompt** | `.claude/prompts/primary-04-testing.md` | 步骤 8–9 测试与设备验证 |
| **校验脚本** | `.claude/skills/tool-ohos-plugin-repo/tool/validate_module_test.py` | exit 0 门禁 |
| **脚手架生成** | `.claude/skills/tool-ohos-plugin-repo/tool/rn.py create ohos-test` | 增量补充 ohosTest 目录 |

---

## 3. ohosTest 脚手架模板（agent-rn）

| 文件 | 路径（相对 agent-rn） |
|------|------------------------|
| ModuleTest 模板 | `.claude/skills/tool-ohos-plugin-repo/templates/example/harmony/entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets` |
| 测试聚合 | `.claude/skills/tool-ohos-plugin-repo/templates/example/harmony/entry/src/ohosTest/ets/test/List.test.ets` |
| TestAbility 入口 | `.claude/skills/tool-ohos-plugin-repo/templates/example/harmony/entry/src/ohosTest/ets/testability/TestAbility.ets` |
| TestAbility 页面 | `.claude/skills/tool-ohos-plugin-repo/templates/example/harmony/entry/src/ohosTest/ets/testability/pages/Index.ets` |
| OpenHarmonyTestRunner | `.claude/skills/tool-ohos-plugin-repo/templates/example/harmony/entry/src/ohosTest/ets/testrunner/OpenHarmonyTestRunner.ts` |
| ohosTest module.json5 | `.claude/skills/tool-ohos-plugin-repo/templates/example/harmony/entry/src/ohosTest/module.json5` |

> **目录名**：`ets/testrunner/` 必须全小写（Windows 大小写错误 → `OpenHarmonyTestRunner` ReferenceError）。见 `tool-testing/SKILL.md` §3.8。

---

## 4. 插件仓库内固定路径（相对 CWD = repos-rn/{module}/）

| 用途 | 固定路径 |
|------|----------|
| **Hypium 用例（主编辑文件）** | `ohos/example/harmony/entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets` |
| **Example RN 页面** | `ohos/example/App.tsx` |
| **bundleName 来源** | `ohos/example/harmony/AppScope/app.json5` → `app.bundleName` |
| **EntryAbility 来源** | `ohos/example/harmony/entry/src/main/module.json5` → `module.mainElement` 或 `abilities[0].name` |
| **RN bundle** | `ohos/example/harmony/entry/src/main/resources/rawfile/bundle.harmony.js` |
| **Hypium 依赖** | `ohos/example/harmony/entry/oh-package.json5` → `devDependencies["@ohos/hypium"]` |
| **测试阶段产物** | `.rn-ohos-adaptation/04-testing.json`（含 `method_coverage.*.test_id`） |
| **设备验证产物** | `.rn-ohos-adaptation/04-device-verify.json` |

`validate_module_test.py` 默认读取上述固定路径（见脚本头部注释 L4–8）。

---

## 5. 已通过真机验证的参考实现（repos-rn）

| 模块 | ModuleTest 路径 | 特点 |
|------|-----------------|------|
| **get_device_locale** | `repos-rn/react_native_get_device_locale/ohos/example/harmony/entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets` | `tool-testing` §3.1 标注的首个通过工程 |
| **bluetooth_state_manager** | `repos-rn/react_native_bluetooth_state_manager/packages/react-native-bluetooth-state-manager/ohos/example/harmony/entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets` | 含 `METHOD_BUTTON_IDS` 映射、多方法顺序依赖（addListener → removeListener） |
| **system_navigation_bar** | `repos-rn/react_native_system_navigation_bar/ohos/example/harmony/entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets` | 多方法（13+ it）、底部按钮长超时 |
| **device_country** | `repos-rn/react_native_device_country/ohos/example/harmony/entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets` | 精简用例 |

对应 App.tsx 与 `04-testing.json` 在同模块 `ohos/example/` 与 `.rn-ohos-adaptation/` 下。

---

## 6. @ohos.UiTest.d.ts 关键 API 行号速查

文件：`harmonyos-sdk-api-lookup/sdk/openharmony/ets/api/@ohos.UiTest.d.ts`

### ON 选择器（约 L1778–2295）

| 方法 | 行号 | 说明 |
|------|------|------|
| `ON.text()` | L1778 | 文本匹配，支持 MatchPattern |
| `ON.id()` | L1812 | id 匹配（RN testID） |
| `ON.type()` | L1846 | 控件类型，如 `'Button'`、`'Scroll'` |
| `ON.clickable()` | L1880 | 可点击 |
| `ON.longClickable()` | L1914 | 可长按 |
| `ON.scrollable()` | L1948 | 可滚动 |
| `ON.enabled()` / `focused()` / `selected()` | L1982–2050 | 状态 |
| `ON.checked()` / `checkable()` | L2084–2118 | 勾选框 |
| `ON.isBefore()` / `isAfter()` | L2143–2168 | 相对位置 |
| `ON.within()` | L2193 | 限定父容器内查找 |
| `ON.description()` | L2240 | accessibilityLabel |
| `ON.hint()` | L2279 | 输入框 placeholder |
| `ON.originalText()` | L2295 | 无障碍 level=no 时的原文 |

### Component 操作（约 L2355–3222）

| 方法 | 行号 | 说明 |
|------|------|------|
| `click()` / `doubleClick()` / `longClick()` | L2355–2423 | 点击类 |
| `getText()` / `getId()` / `getType()` | L2457–2537 | 属性读取 |
| `isScrollable()` 等 | L2571–2809 | 状态查询 |
| `inputText()` / `clearText()` | L2849–2899 | 文本输入 |
| `scrollToTop()` / `scrollToBottom()` | L2939–2979 | 滚到顶/底 |
| `getBounds()` / `getBoundsCenter()` | L3013–3087 | 坐标 |
| `scrollSearch()` | L3053, L3207 | 滑动查找（L3207 为 API 18+ 带 vertical/offset） |
| `dragTo()` | L3113 | 拖拽到目标控件 |
| `pinchOut()` / `pinchIn()` | L3140–3167 | 双指缩放 |
| `getDescription()` / `getHint()` | L3179–3191 | 无障碍属性 |

### Driver 操作（约 L3283–4647）

| 方法 | 行号 | 说明 |
|------|------|------|
| `Driver.create()` | L3283 | 创建驱动 |
| `delayMs()` | L3320 | 延时 |
| `findComponent()` / `findComponents()` | L3357–3444 | 查找控件 |
| `waitForComponent()` | L3407 | 带超时等待 |
| `assertComponentExist()` | L3484 | 断言存在 |
| `pressBack()` | L3515–3528 | 返回键 |
| `triggerKey()` | L3553+ | 按键注入 |
| `click()` / `swipe()` 坐标版 | L3652–3781 | 屏幕坐标手势 |
| `clickAt()` / `swipeBetween()` | L3826–3868 | Point 对象版（API 20+） |
| `fling()` | L4194–4276 | 惯性滑动 |
| `injectMultiPointerAction()` | L4221 | 多指轨迹 |
| `pressHome()` | L4109 | Home 键 |
| `inputText(p, text)` | L4535 | 坐标处输入 |
| `createUIEventObserver()` | L4426 | 事件监听（API 22+） |

---

## 7. UIEventObserver 与弹窗

UiTest 文档中 `UIEventObserver` 支持 `dialogShow` 事件（`@ohos.UiTest.d.ts` 约 L1470）。多数 RN 插件测试用 `ON.text()` 轮询弹窗按钮即可，不必订阅 Observer。

系统弹窗无专用 API；控件以普通 Button/Text 出现在无障碍树中。DevEco Testing UiViewer 或 `hdc shell uitest dumpLayout -p` 查看实际 text/id。

---

## 8. 调试命令

```bash
# 设备列表
hdc list targets

# dump 当前页面无障碍树（调试 findComponent 失败）
hdc shell uitest dumpLayout -p

# 执行 Instrument Test（在 example/harmony 目录）
hvigorw onDeviceTest -p ohos-test-coverage=false

# 校验 ModuleTest（在插件 CWD）
python .claude/skills/tool-ohos-plugin-repo/tool/validate_module_test.py --methods method1,method2
```

设备可用性、锁屏跳过规则见 `sub-device-verify.md` §4.5 与 `tool-testing/SKILL.md` §4。
