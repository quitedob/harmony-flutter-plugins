---
name: ohos-hypium-uitest
description: 编写 RN 鸿蒙 onDeviceTest Hypium UI 自动化用例。覆盖 @kit.TestKit（Driver/Component/ON）完整 API、滚动查找、双指缩放、系统弹窗、输入与坐标手势、脚手架路径与校验门禁。在编写或修改 ModuleTest.test.ets、生成 integration-test 用例、调试 findComponent/click 失败时使用。触发词：Hypium、TestKit、onDeviceTest、ModuleTest、uitest、scrollSearch、pinch、弹窗、自动化测试。
---

# Hypium UI 自动化测试用例编写

RN 模块真机 UI 测试统一使用 **Instrument Test**（`hvigorw onDeviceTest` + Hypium），**不再**使用 Jest Local Test（`hvigorw test`）。

**原始文件路径索引**（官方 API、模板、参考实现、行号速查）→ [references.md](references.md)

**场景详解**（滚动/捏合/弹窗/多指/Observer）→ [scenarios.md](scenarios.md)

**门禁、设备验证、失败归因** → `.claude/skills/tool-testing/SKILL.md` §3–§4

---

## 1. 架构概览

```
TestAbility (Hypium 入口)
  └─ List.test.ets
       └─ ModuleTest.test.ets   ← Agent 主要编辑
            beforeAll: startAbility + Driver.create + 等 RN 加载
            it('detectWhiteScreen')
            it('methodName') × N
```

### 1.1 @kit.TestKit 与 @ohos.UiTest

`@kit.TestKit` 是 Kit 封装，**重导出** `@ohos.UiTest` 全部符号：

- Kit 入口：`harmonyos-sdk-api-lookup/sdk/openharmony/ets/kits/@kit.TestKit.d.ts`
- 完整类型：`harmonyos-sdk-api-lookup/sdk/openharmony/ets/api/@ohos.UiTest.d.ts`
- 中文文档：`harmonyos-sdk-api-lookup/api-references/系统-调测调优-Test Kit（应用测试服务）-ArkTS API-@ohos.UiTest.md`

| 类 | 职责 | d.ts 约行 |
|----|------|-----------|
| `Driver` | 入口：查找、坐标手势、按键、截图 | L3283+ |
| `Component` | 单控件：点击、滚动查找、捏合、输入 | L2355+ |
| `ON` | 选择器构建器（链式） | L1778+ |
| `UiDirection` | 滑动方向枚举 LEFT/RIGHT/UP/DOWN | L162+ |
| `PointerMatrix` | 多指轨迹矩阵 | L5070+ |
| `MatchPattern` | EQUALS/CONTAINS/STARTS_WITH/ENDS_WITH/REG_EXP | L39+ |
| `abilityDelegatorRegistry` | 启动被测 Ability | TestKit.d.ts L19 |

### 1.2 标准导入

```typescript
import { abilityDelegatorRegistry, Component, Driver, ON, UiDirection } from '@kit.TestKit';
import { Want } from '@kit.AbilityKit';
import { describe, it, expect, beforeAll } from '@ohos/hypium';
```

**禁止**（RN 流水线已验证会出问题）：

| 禁止项 | 原因 | 出处 |
|--------|------|------|
| `import ... from '@ohos.UiTest'` | 须统一 `@kit.TestKit` | `tool-testing/SKILL.md` §3.1 |
| `import ... from '@ohos.app.ability.abilityDelegatorRegistry'` | 同上 | 同上 |
| `waitForIdle()` | RN 环境不可靠 | `sub-integration-test.md` L77 |
| 每 `it` 重复 `startAbility` | 浪费 15s 预算、状态污染 | `tool-testing/SKILL.md` §3.1 |
| 依赖 `getText()` 做断言 | 推荐轮询 `waitForText` | `tool-testing/SKILL.md` §3.1 |

---

## 2. 项目内固定路径

相对 CWD（`repos-rn/{module_name}/`）：

| 用途 | 路径 |
|------|------|
| **Hypium 用例** | `ohos/example/harmony/entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets` |
| Example 页面 | `ohos/example/App.tsx` |
| bundleName | `ohos/example/harmony/AppScope/app.json5` |
| EntryAbility | `ohos/example/harmony/entry/src/main/module.json5` |
| RN bundle | `ohos/example/harmony/entry/src/main/resources/rawfile/bundle.harmony.js` |
| Hypium 依赖 | `ohos/example/harmony/entry/oh-package.json5` |

脚手架模板：`.claude/skills/tool-ohos-plugin-repo/templates/example/harmony/entry/src/ohosTest/`（见 [references.md §3](references.md)）

校验脚本：`.claude/skills/tool-ohos-plugin-repo/tool/validate_module_test.py`

---

## 3. 硬性约束（真机已验证）

来源：`tool-testing/SKILL.md` §3.1；参考工程 `react_native_get_device_locale` 的 ohosTest。

| 约束 | 说明 |
|------|------|
| 共享会话 | `beforeAll` 一次 `startAbility` + `Driver.create()`；各 `it` 复用 `appDriver` |
| 单用例超时 | Hypium 默认 **15s**/`it`；`beforeAll` RN 加载（≤12s）+ 各 `it` 轮询须控制总量 |
| RN testID | RNOH 下 `ON.id(testID)` **可能无效**；必须 `ON.text(buttonText)` 兜底 |
| 按钮文案 | 按钮 Text **勿与页面标题相同**（避免 `ON.text` 误点标题） |
| 断言模式 | `waitForText` / `waitForId` 轮询 + `expect(...).assertTrue()` |
| 目录名 | `ets/testrunner/` 必须**全小写** |
| 前置 bundle | 跑测前须 `npm run dev` 生成 `bundle.harmony.js` |
| 锁屏/息屏 | 禁止 `power-shell wakeup` / `uitest swipe` 解锁；跳过 onDeviceTest（`sub-device-verify.md` §4.5） |

---

## 4. ON 选择器完整参考

`ON` 通过静态构造器链式创建，所有方法同步返回 `On` 对象。官方文档 § On9+。

### 4.1 属性匹配

```typescript
ON.text('Get State (Async)')                    // 精确文本（默认 EQUALS）
ON.text('State', MatchPattern.CONTAINS)        // 包含匹配
ON.id('test-get-state-btn')                    // testID / 无障碍 id
ON.type('Button')                              // 控件类型名
ON.type('Scroll', MatchPattern.EQUALS)
ON.description('test-get-state-btn')           // accessibilityLabel（RN 常用）
ON.hint('请输入')                               // 输入框 placeholder
ON.originalText('hidden text')                 // accessibilityLevel=no 时的原文
```

### 4.2 状态过滤

```typescript
ON.clickable(true)
ON.longClickable(true)
ON.scrollable(true)      // 找 ScrollView / List 等
ON.enabled(true)
ON.focused(true)
ON.selected(true)
ON.checked(true)
ON.checkable(true)
```

### 4.3 组合与相对定位

```typescript
// 多属性 AND
ON.text('Run getState').type('Button').clickable(true)

// 在 Scroll 容器内找 text
ON.text('java').within(ON.type('Scroll'))

// 相对顺序
ON.type('Button').isBefore(ON.text('Footer'))
ON.type('Text').isAfter(ON.text('Header'))

// 限定窗口（多窗口场景）
ON.text('OK').inWindow('com.example.application')
```

d.ts 行号见 [references.md §6](references.md)。

---

## 5. Component API 参考

对 `findComponent` 返回的 `Component` 实例操作。

### 5.1 点击类

```typescript
await button.click();
await button.doubleClick();
await button.longClick();
```

### 5.2 文本输入

```typescript
await textField.inputText('hello');
await textField.inputText('123', { paste: true, addition: false });  // API 20+
await textField.clearText();
```

### 5.3 滚动（在可滚动 Component 上）

```typescript
// 滑动查找目标（核心 API）
await scrollBar.scrollSearch(ON.text('next page'));
await scrollBar.scrollSearch(ON.text('target'), true, 80);  // API 18+: vertical, offset(px)

await scrollBar.scrollToTop(600);     // speed 200~40000 px/s，默认 600
await scrollBar.scrollToBottom(600);
```

官方示例（文档 scrollSearch9+）：

```typescript
let scrollBar = await driver.findComponent(ON.type('Scroll'));
let button = await scrollBar.scrollSearch(ON.text('next page'));
```

### 5.4 双指缩放

```typescript
let image = await driver.findComponent(ON.type('Image'));
await image.pinchOut(1.5);   // 放大，scale > 1
await image.pinchIn(0.5);    // 缩小，scale 0~1
```

### 5.5 拖拽

```typescript
await source.dragTo(targetComponent);
```

### 5.6 属性读取（调试 / 复杂断言）

RN 流水线默认用 `waitForText` 代替 `getText()`，但 API 可用：

```typescript
await comp.getText();
await comp.getId();
await comp.getType();           // 调试 RN 无障碍树类型名
await comp.getDescription();    // accessibilityLabel
await comp.getBounds();         // Rect { left, top, right, bottom }
await comp.getBoundsCenter();   // Point { x, y }
await comp.isScrollable();
```

---

## 6. Driver API 参考

### 6.1 查找

```typescript
let driver = Driver.create();

// 单个 / 多个
let btn = await driver.findComponent(ON.text('OK'));
let btns = await driver.findComponents(ON.type('Button'));

// 带超时等待（API 内置）
let comp = await driver.waitForComponent(ON.text('Result:'), 5000);

// 断言存在（不存在则抛错）
await driver.assertComponentExist(ON.text('next page'));
```

`findComponent` **只能找到当前可见**控件；屏幕外须 `scrollSearch` 或 `fling`（见 §7）。

### 6.2 坐标手势

```typescript
await driver.click(100, 100);
await driver.doubleClick(100, 100);
await driver.longClick(100, 100);
await driver.swipe(100, 100, 200, 200, 600);  // startX,Y → endX,Y, speed

// API 20+ Point 对象
await driver.clickAt({ x: 100, y: 100, displayId: 0 });
await driver.swipeBetween(
  { x: 500, y: 1500, displayId: 0 },
  { x: 500, y: 500, displayId: 0 },
  600
);
await driver.longClickAt({ x: 100, y: 100, displayId: 0 }, 1500);
```

### 6.3 惯性滑动（整屏）

```typescript
import { UiDirection } from '@kit.TestKit';

// 手指向上滑 → 内容向下滚
await driver.fling(UiDirection.UP, 8000);

// 两点间 fling
await driver.fling({ x: 500, y: 480 }, { x: 450, y: 480 }, 5, 600);
```

`UiDirection`：`LEFT=0, RIGHT=1, UP=2, DOWN=3`。

### 6.4 多指轨迹（高级缩放/手势）

```typescript
import { PointerMatrix } from '@kit.TestKit';

let pointers = PointerMatrix.create(2, 5);
pointers.setPoint(0, 0, { x: 250, y: 480 });
pointers.setPoint(1, 0, { x: 350, y: 480 });
// ... 各指各步坐标
await driver.injectMultiPointerAction(pointers, 600);
```

### 6.5 按键与系统

```typescript
await driver.pressBack();
await driver.pressBack(0);          // 指定 displayId
await driver.pressHome();
await driver.triggerKey(keyCode);
await driver.delayMs(1000);
```

### 6.6 坐标处输入

```typescript
await driver.inputText({ x: 200, y: 400, displayId: 0 }, 'hello');
```

### 6.7 事件监听（API 22+，可选）

```typescript
let observer = driver.createUIEventObserver();
// 订阅 dialogShow / toastShow / 窗口变化 / 控件点击等
```

多数 RN 用例用轮询即可，见 [scenarios.md](scenarios.md)。

---

## 7. 场景写法

### 7.1 页面滚动 — 找屏幕外按钮

**决策**：可见 → `findComponent`；不可见 → `scrollSearch` → 兜底 `fling` + 轮询。

```typescript
async function findScrollable(driver: Driver): Promise<Component> {
  try {
    return await driver.findComponent(ON.scrollable(true));
  } catch (_e) {
    return await driver.findComponent(ON.type('Scroll'));
  }
}

async function scrollFindText(driver: Driver, text: string, timeoutMs: number = 8000): Promise<Component> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      return await driver.findComponent(ON.text(text));
    } catch (_e) {
      const scroll = await findScrollable(driver);
      try {
        return await scroll.scrollSearch(ON.text(text), true, 80);
      } catch (_e2) {
        await driver.fling(UiDirection.UP, 6000);
        await sleep(500);
      }
    }
  }
  throw new Error(`Not found after scroll: ${text}`);
}
```

**RN 注意**：ScrollView 在无障碍树中类型名不一定是 `'Scroll'`，优先 `ON.scrollable(true)`。用 `getType()` 或 `hdc shell uitest dumpLayout -p` 确认。

### 7.2 双指缩放

```typescript
const target = await driver.findComponent(ON.type('Image'));
await target.pinchOut(1.5);
await target.pinchIn(0.5);
```

### 7.3 系统 / 应用弹窗

**无专用 Dialog API**。弹窗按钮与普通控件一样用 `ON.text()` 查找。

```typescript
const CONFIRM = ['允许', 'Allow', '确定', 'OK', '确认', 'Agree'];
const CANCEL  = ['取消', 'Cancel', '拒绝', 'Deny'];

async function clickDialogButton(driver: Driver, labels: string[], timeoutMs: number = 5000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    for (const label of labels) {
      try {
        await (await driver.findComponent(ON.text(label))).click();
        return true;
      } catch (_e) { /* next label */ }
    }
    await sleep(500);
  }
  return false;
}

await button.click();
await clickDialogButton(driver, CONFIRM);  // 如蓝牙 requestToEnable 系统授权框
// 或关闭：await driver.pressBack();
```

RN `Alert.alert(..., [{ text: 'OK' }])` → `ON.text('OK')`。

限定范围：`ON.text('确定').within(ON.type('Scroll'))`。

### 7.4 完整场景示例（滚动 + 弹窗 + 断言）

```typescript
it('requestToEnable', 0, async () => {
  const driver = appDriver!;
  const button = await scrollFindText(driver, 'Request Enable');
  await button.click();
  await clickDialogButton(driver, CONFIRM, 3000);
  expect((await waitForText(driver, 'Error:', 1500)) === null).assertTrue();
  expect((await waitForText(driver, 'Enable request sent', RESULT_TIMEOUT_MS)) !== null).assertTrue();
});
```

更多场景见 [scenarios.md](scenarios.md)。

---

## 8. 标准辅助函数与用例模板

来源：`.claude/skills/tool-ohos-plugin-repo/templates/example/harmony/entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets` 与 `tool-testing/SKILL.md` §3.2–§3.3。

生成前**必读** `ohos/example/App.tsx`，提取真实 `testID`、按钮文案、页面标题。

```typescript
const BUNDLE_NAME = 'com.example.application';   // ← AppScope/app.json5
const ENTRY_ABILITY = 'EntryAbility';            // ← entry/.../module.json5
const PAGE_TITLE_TEXT = '{App.tsx 主标题}';
const POLL_INTERVAL_MS = 500;
const RN_LOAD_TIMEOUT_MS = 12000;
const RESULT_TIMEOUT_MS = 6000;

let appDriver: Driver | null = null;

const METHOD_BUTTON_IDS: Record<string, string> = {
  'get-state': 'test-get-state-btn',  // slug → App.tsx 实际 testID
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startEntryAbility(): Promise<void> {
  const delegator = abilityDelegatorRegistry.getAbilityDelegator();
  const want: Want = { bundleName: BUNDLE_NAME, abilityName: ENTRY_ABILITY };
  await delegator.startAbility(want);
}

async function waitForText(driver: Driver, text: string, timeoutMs: number): Promise<Component | null> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try { return await driver.findComponent(ON.text(text)); }
    catch (_e) { await sleep(POLL_INTERVAL_MS); }
  }
  return null;
}

async function waitForId(driver: Driver, id: string, timeoutMs: number): Promise<Component | null> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try { return await driver.findComponent(ON.id(id)); }
    catch (_e) { await sleep(POLL_INTERVAL_MS); }
  }
  return null;
}

async function findMethodButton(driver: Driver, method: string, buttonText: string): Promise<Component> {
  const candidates: string[] = [];
  if (METHOD_BUTTON_IDS[method]) candidates.push(METHOD_BUTTON_IDS[method]);
  candidates.push(`btn-${method}`, `test-${method}-btn`);
  for (const id of candidates) {
    const byId = await waitForId(driver, id, 2000);
    if (byId !== null) return byId;
  }
  const byText = await waitForText(driver, buttonText, 2000);
  if (byText !== null) return byText;
  throw new Error(`Button not found for ${method}`);
}
```

### 8.1 测试套结构

```typescript
export default function moduleTest(): void {
  describe('{ModuleName}DeviceTest', () => {
    beforeAll(async () => {
      await startEntryAbility();
      appDriver = Driver.create();
      const title = await waitForText(appDriver, PAGE_TITLE_TEXT, RN_LOAD_TIMEOUT_MS);
      if (title === null) throw new Error('RN app did not load: title not found');
    });

    it('detectWhiteScreen', 0, async () => {
      expect(appDriver !== null).assertTrue();
      expect((await waitForText(appDriver!, PAGE_TITLE_TEXT, 2000)) !== null).assertTrue();
    });

    it('{methodSlug}', 0, async () => {
      const driver = appDriver!;
      const button = await findMethodButton(driver, '{methodSlug}', '{buttonText}');
      await button.click();
      expect((await waitForText(driver, 'Error:', 1500)) === null).assertTrue();
      let hasResult = (await waitForText(driver, 'Result:', RESULT_TIMEOUT_MS)) !== null
        || (await waitForId(driver, 'result-{methodSlug}', 1500)) !== null;
      expect(hasResult).assertTrue();
    });
  });
}
```

- 每个可设备测试的 `implemented_method` 一个 `it()`；`not_implemented` 不生成；**`getConstants` 不生成**（`validate_module_test.py` 自动排除）
- `it()` 第三参数 filter 固定 `0`
- 单 `it` 内轮询总时长建议 ≤ 10s

### 8.2 参考实现

| 模块 | 路径 |
|------|------|
| 首个通过工程 | `repos-rn/react_native_get_device_locale/ohos/example/harmony/entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets` |
| METHOD_BUTTON_IDS 示例 | `repos-rn/react_native_bluetooth_state_manager/packages/react-native-bluetooth-state-manager/ohos/example/harmony/entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets` |
| 多方法长列表 | `repos-rn/react_native_system_navigation_bar/ohos/example/harmony/entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets` |

---

## 9. App.tsx 与 testID 对齐

来源：`tool-testing/SKILL.md` §3.4；校验逻辑：`validate_module_test.py` `validate_testid_alignment()`。

生成前读取：

1. `ohos/example/App.tsx` — 实际 `testID=`、按钮文案、页面标题
2. `.rn-ohos-adaptation/04-testing.json` — `method_coverage.*.test_id`

```tsx
<TouchableOpacity
  testID="test-{methodSlug}-btn"
  accessibilityLabel="test-{methodSlug}-btn"
  onPress={handleXxx}>
  <Text>Run {methodName}</Text>   {/* 勿与 PAGE_TITLE_TEXT 相同 */}
</TouchableOpacity>

{result && !error && (
  <View testID="result-{methodSlug}-box">
    <Text>Result:</Text>
    <Text testID="result-{methodSlug}">{result}</Text>
  </View>
)}
{error && (
  <View testID="error-{methodSlug}-box">
    <Text>Error:</Text>
    <Text testID="error-{methodSlug}">{error}</Text>
  </View>
)}
```

testID 命名风格（全项目统一）：

| 风格 | 按钮 testID | 说明 |
|------|-------------|------|
| A（推荐） | `test-{methodSlug}-btn` | 历史模板默认 |
| B | `btn-{methodSlug}` | 部分 Example 已采用；须写入 `METHOD_BUTTON_IDS` |

---

## 10. 生成流程与校验

来源：`.claude/prompts/sub-integration-test.md`

### 10.1 步骤 0：检查现有文件

1. 读取 `ModuleTest.test.ets`
2. **必跑**校验脚本；exit 0 → **禁止整文件重写**（`regenerated: false`）
3. exit 1 → 最小 `edit` 修复

### 10.2 校验命令（write/edit 后必跑）

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/validate_module_test.py \
  --methods {implemented_methods 逗号分隔，不含 detectWhiteScreen}
```

脚本检查（`validate_module_test.py`）：

- 结构完整（`moduleTest`、`beforeAll`、`it()`、辅助函数）
- `METHOD_BUTTON_IDS` ↔ `ohos/example/App.tsx` testID
- `BUNDLE_NAME` / `ENTRY_ABILITY` ↔ `AppScope/app.json5` / `entry/.../module.json5`
- 各 `implemented_method` 有对应 `it()`

exit 0 才能报 `validation_ok: true`。

### 10.3 脚手架缺失时

```bash
python .claude/skills/tool-ohos-plugin-repo/tool/rn.py create ohos-test
```

TestAbility 模板：`.claude/skills/tool-ohos-plugin-repo/templates/example/harmony/entry/src/ohosTest/ets/testability/TestAbility.ets`

---

## 11. 执行 onDeviceTest

来源：`sub-device-verify.md` + `tool-testing/SKILL.md` §4

```bash
cd ohos/example/harmony
hvigorw onDeviceTest -p ohos-test-coverage=false
```

前置：`hdc list targets` 有设备；屏幕 `AWAKE` 且已解锁；`bundle.harmony.js` 存在；`@ohos/hypium` 在 entry `oh-package.json5`。

### 11.1 常见失败

| 现象 | 原因 | 处理 | 出处 |
|------|------|------|------|
| `execute timeout 15000ms` | 单 it 轮询过长 | 缩短 timeout / 用 beforeAll | `tool-testing` §3.8 |
| `OpenHarmonyTestRunner` ReferenceError | testrunner 目录大小写 | 改为 `ets/testrunner/` | 同上 |
| findComponent 超时 | 控件不可见 / testID 无效 | scrollSearch + ON.text 兜底 | 本 Skill §7 |
| onDeviceTest 卡死 | 锁屏/息屏 | skip，禁止 wakeup | `sub-device-verify` §4.5 |
| 误点标题 | 按钮与标题同文案 | 改按钮 Text | `tool-testing` §3.1 |

### 11.2 调试无障碍树

```bash
hdc shell uitest dumpLayout -p
```

RN 常见映射：`testID` → `id` 或 `description`；按钮文案 → `text`。

---

## 12. 错误码速查

| 错误码 | 含义 | 处理 |
|--------|------|------|
| 17000002 | 异步 API 未 await | 所有 TestKit 调用加 await |
| 17000004 | 控件不可见或已销毁 | scrollSearch / 延长轮询 / 检查 RN 是否加载完 |
| 401 | 参数非法 | pinch scale 范围、坐标为正整数 |

完整列表：`harmonyos-sdk-api-lookup/api-references/系统-调测调优-Test Kit（应用测试服务）-错误码-uitest错误码.md`

---

## 13. 文档分工

| 文档 | 职责 |
|------|------|
| **本 Skill** | TestKit API、场景写法、路径索引 |
| [references.md](references.md) | 全部原始文件路径与 d.ts 行号 |
| [scenarios.md](scenarios.md) | 场景决策树、完整示例、Observer |
| `tool-testing` §3 | 门禁、模板占位符、App.tsx 约定 |
| `tool-testing` §4 | 设备验证、失败归因 |
| `sub-integration-test.md` | Subagent 生成流程 |
| `sub-device-verify.md` | Subagent 真机执行流程 |
