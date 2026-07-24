# TestKit 场景详解

本文档是 `ohos-hypium-uitest` Skill 的补充。原始 API 签名见：

- `@ohos.UiTest.d.ts`：`harmonyos-sdk-api-lookup/sdk/openharmony/ets/api/@ohos.UiTest.d.ts`
- 中文文档：`harmonyos-sdk-api-lookup/api-references/系统-调测调优-Test Kit（应用测试服务）-ArkTS API-@ohos.UiTest.md`

---

## 1. 场景决策树

```
需要操作控件？
├─ 控件当前可见
│   └─ driver.findComponent(ON.xxx) → component.click()
├─ 控件在滚动区域外
│   ├─ 知道滚动容器
│   │   └─ scrollBar.scrollSearch(ON.text('目标'), vertical?, offset?)
│   └─ 不知道容器
│       └─ driver.fling(UiDirection.UP, speed) + 轮询 findComponent
├─ 需要滚到顶/底（不关心具体控件）
│   └─ scrollBar.scrollToTop(speed) / scrollToBottom(speed)
├─ 需要捏合缩放
│   └─ findComponent 目标区域 → pinchOut(scale>1) / pinchIn(0~1)
│   └─ 复杂轨迹 → PointerMatrix + injectMultiPointerAction
├─ 出现系统/应用弹窗
│   ├─ findComponent(ON.text('允许|OK|确定')) → click
│   ├─ ON.text('确定').within(ON.type('Scroll'))
│   └─ driver.pressBack() 关闭
├─ 需要输入文字
│   └─ findComponent 输入框 → inputText / clearText
├─ 需要长按/双击
│   └─ component.longClick() / doubleClick()
└─ 需要坐标级操作（控件找不到时）
    └─ getBoundsCenter() 取中心 → driver.click(x,y) 或 clickAt(Point)
```

---

## 2. 滚动详解

### 2.1 原理

`Driver.findComponent()` 仅匹配**当前屏幕可见**的无障碍节点。RN `ScrollView` / `FlatList` 中屏幕外的按钮必须先滚动进入视口。

官方文档：`scrollSearch9+`（`@ohos.UiTest.md` 约 L2337）、`scrollSearch18+`（约 L2392）。

### 2.2 scrollSearch 参数

```typescript
await scrollBar.scrollSearch(
  ON.text('Request Disable'),  // 目标 On 选择器
  true,                         // vertical: true=纵向（默认），false=横向
  80                            // offset: 滑动起止点到组件边框偏移(px)，默认 80
);
```

d.ts：`Component.scrollSearch` @ L3053（两参数版）、L3207（三参数版 API 18+）。

### 2.3 查找滚动容器

ArkUI 原生：

```typescript
let scrollBar = await driver.findComponent(ON.type('Scroll'));
```

RN / 通用兜底：

```typescript
let scrollBar = await driver.findComponent(ON.scrollable(true));
```

参考：`@ohos.UiTest.md` scrollable9+（约 L703）、示例 scrollSearch（约 L2387）。

### 2.4 整屏手势

```typescript
import { Driver, UiDirection } from '@kit.TestKit';

// UiDirection: LEFT=0, RIGHT=1, UP=2, DOWN=3
// 手指向上滑 → 内容向下滚
await driver.fling(UiDirection.UP, 8000);

// 精确滑动：startX,Y → endX,Y，speed 200~40000 px/s
await driver.swipe(500, 1500, 500, 500, 600);

// API 20+ Point
await driver.swipeBetween(
  { x: 500, y: 1500, displayId: 0 },
  { x: 500, y: 500, displayId: 0 },
  600
);
```

d.ts：`Driver.fling` @ L4194–4276；`Driver.swipe` @ L3781。

官方示例：`fling10+`（`@ohos.UiTest.md` 约 L5028）、`swipe9+`（约 L3974）。

### 2.5 滚到顶/底

```typescript
const scroll = await driver.findComponent(ON.scrollable(true));
await scroll.scrollToTop(600);
await scroll.scrollToBottom(600);
```

d.ts：L2939–2979。文档：`scrollToTop9+` / `scrollToBottom9+`（约 L2449–2555）。

### 2.6 完整 helper（可复制）

来源：本 Skill 设计；模式参考 `repos-rn/react_native_system_navigation_bar/.../ModuleTest.test.ets`（底部按钮需更长 timeout）。

```typescript
async function findScrollable(driver: Driver): Promise<Component> {
  try {
    return await driver.findComponent(ON.scrollable(true));
  } catch (_e) {
    try {
      return await driver.findComponent(ON.type('Scroll'));
    } catch (_e2) {
      return await driver.findComponent(ON.type('List'));
    }
  }
}

async function scrollFindText(
  driver: Driver,
  text: string,
  timeoutMs: number = 8000
): Promise<Component> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      return await driver.findComponent(ON.text(text));
    } catch (_e) {
      try {
        const scroll = await findScrollable(driver);
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

### 2.7 RN ScrollView 注意

RNOH 的 ScrollView 在无障碍树中的 `type` 名**不保证**为 `'Scroll'`。调试：

```bash
hdc shell uitest dumpLayout -p
```

或在测试中临时：

```typescript
const scroll = await findScrollable(driver);
console.info('scroll type: ' + await scroll.getType());
```

---

## 3. 双指缩放

### 3.1 简单 API

官方示例 `pinchOut9+` / `pinchIn9+`（`@ohos.UiTest.md` 约 L2617–2723）：

```typescript
let image = await driver.findComponent(ON.type('Image'));
await image.pinchOut(1.5);   // scale > 1，放大
await image.pinchIn(0.5);    // scale 0~1，缩小
```

d.ts：`pinchOut` L3140、`pinchIn` L3167。

参数错误（scale 越界）→ 错误码 401。

### 3.2 自定义多指轨迹

官方示例 `injectMultiPointerAction`（`@ohos.UiTest.md` 约 L4960）：

```typescript
import { Driver, PointerMatrix } from '@kit.TestKit';

let pointers = PointerMatrix.create(2, 5);  // 2 指，5 步
pointers.setPoint(0, 0, { x: 250, y: 480 });  // 指 0，步 0
pointers.setPoint(0, 1, { x: 250, y: 440 });
pointers.setPoint(1, 0, { x: 350, y: 480 });  // 指 1，步 0（两指间距变大 = 放大）
pointers.setPoint(1, 1, { x: 400, y: 440 });
await driver.injectMultiPointerAction(pointers, 600);
```

d.ts：`PointerMatrix.create` L5070；`Driver.injectMultiPointerAction` L4221。

适用：地图、图片预览器等需要精确轨迹的场景；一般 RN 组件用 `pinchOut`/`pinchIn` 即可。

---

## 4. 弹窗处理

### 4.1 原则

TestKit **没有** `clickDialog()` / `AlertDialog.show()` 等专用接口。系统 AlertDialog、权限框、RN `Alert.alert` 的按钮都作为普通无障碍节点暴露。

`UIEventObserver` 可订阅 `dialogShow`（d.ts L1470），但 RN 插件测试通常用 **text 轮询** 更简单可靠。

### 4.2 系统权限 / 蓝牙 / 确认框

典型场景：`requestToEnable` 触发蓝牙系统授权（参考 `repos-rn/react_native_bluetooth_state_manager/.../ModuleTest.test.ets`）。

```typescript
const CONFIRM_LABELS = ['允许', 'Allow', '确定', 'OK', '确认', 'Agree', '始终允许'];
const CANCEL_LABELS  = ['取消', 'Cancel', '拒绝', 'Deny', '不允许'];

async function clickDialogButton(
  driver: Driver,
  labels: string[],
  timeoutMs: number = 5000
): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    for (const label of labels) {
      try {
        const btn = await driver.findComponent(ON.text(label));
        await btn.click();
        return true;
      } catch (_e) { /* try next label */ }
    }
    await sleep(500);
  }
  return false;
}

async function handleSystemDialog(
  driver: Driver,
  action: 'confirm' | 'cancel' | 'dismiss'
): Promise<void> {
  if (action === 'dismiss') {
    await driver.pressBack();
    return;
  }
  const labels = action === 'confirm' ? CONFIRM_LABELS : CANCEL_LABELS;
  const ok = await clickDialogButton(driver, labels, 5000);
  if (!ok) {
    throw new Error(`System dialog button not found for action: ${action}`);
  }
}
```

`pressBack` 文档：`pressBack9+`（`@ohos.UiTest.md` 约 L3282）。

### 4.3 RN Alert

```javascript
// App.tsx
Alert.alert('Title', 'Message', [{ text: 'OK', onPress: () => ... }]);
```

测试中：

```typescript
await triggerButton.click();
await clickDialogButton(driver, ['OK', '确定'], 3000);
```

### 4.4 限定弹窗内查找

官方示例 `within9+`（`@ohos.UiTest.md` 约 L1144）：

```typescript
const okBtn = await driver.findComponent(
  ON.text('确定').within(ON.type('Scroll'))
);
```

d.ts：`ON.within` L2193。

### 4.5 完整用例示例

```typescript
it('requestToEnable', 0, async () => {
  const driver = appDriver!;
  const button = await scrollFindText(driver, 'Request Enable');
  await button.click();

  // 系统框可能出现也可能不出现（已授权）— 不阻塞
  await clickDialogButton(driver, CONFIRM_LABELS, 3000);

  expect((await waitForText(driver, 'Error:', 1500)) === null).assertTrue();
  expect((await waitForText(driver, 'Enable request sent', RESULT_TIMEOUT_MS)) !== null).assertTrue();
});
```

---

## 5. 文本输入

### 5.1 在 Component 上输入

```typescript
let textField = await driver.findComponent(ON.type('TextInput'));
await textField.clearText();
await textField.inputText('hello world');
```

API 20+ 模式：

```typescript
await textField.inputText('123', { paste: true, addition: false });
```

- `paste: true` — 复制粘贴方式（中文/特殊字符/超长文本强制 paste）
- `addition: true` — 追加而非覆盖

文档：`inputText9+`（约 L2179）、`inputText20+`（约 L2234）。d.ts L2849–2865。

### 5.2 在坐标上输入

```typescript
await driver.inputText({ x: 200, y: 400, displayId: 0 }, 'hello');
```

d.ts L4535–4551。

---

## 6. 长按 / 双击 / 拖拽

```typescript
await button.longClick();
await button.doubleClick();
await button.dragTo(targetComponent);
```

坐标版（Driver）：

```typescript
await driver.longClick(100, 100);
await driver.longClickAt({ x: 100, y: 100, displayId: 0 }, 1500);
await driver.dragBetween(fromPoint, toPoint, speed?, duration?);
```

文档：`longClick9+`（约 L1499）、`dragTo`（约 L2611）。d.ts L2423、L3113、L3813。

---

## 7. 等待与断言策略

### 7.1 推荐：轮询 helper（RN 流水线标准）

来源：`tool-testing/SKILL.md` §3.2；模板：`.claude/skills/tool-ohos-plugin-repo/templates/example/harmony/entry/src/ohosTest/ets/test/ui/ModuleTest.test.ets`

```typescript
async function waitForText(driver: Driver, text: string, timeoutMs: number): Promise<Component | null> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try { return await driver.findComponent(ON.text(text)); }
    catch (_e) { await sleep(POLL_INTERVAL_MS); }
  }
  return null;
}
```

断言：

```typescript
expect((await waitForText(driver, 'Error:', 1500)) === null).assertTrue();
expect((await waitForText(driver, 'Result:', RESULT_TIMEOUT_MS)) !== null).assertTrue();
```

### 7.2 Driver 内置等待

```typescript
await driver.waitForComponent(ON.text('Result:'), 5000);
await driver.assertComponentExist(ON.text('next page'));
await driver.delayMs(1000);
```

文档：`assertComponentExist9+`（约 L3228）。**注意**：RN 流水线仍优先自定义 `waitForText` 以便返回 `null` 做 negative 断言。

### 7.3 不推荐

- `driver.waitForIdle()` — RN 环境不可靠（`sub-integration-test.md` 禁止）
- 裸 `getText()` 断言 — 无时序保障；若必须用，先确保控件已 `waitForText` 找到

---

## 8. UIEventObserver（API 22+，高级）

文档：`createUIEventObserver10+`（`@ohos.UiTest.md` 约 L5312）、`UIEventObserver10+`（约 L7528）。

```typescript
import {
  Driver, UIEventObserver, UIElementInfo,
  WindowChangeType, ComponentEventType, ON
} from '@kit.TestKit';

let driver = Driver.create();
let observer = driver.createUIEventObserver();

// 监听窗口出现（系统弹窗可能是新窗口）
observer.once('windowChange', (info: UIElementInfo) => {
  // info.windowChangeType === WindowChangeType.WINDOW_ADDED
});

// 监听控件点击
observer.once('componentEvent', (info: UIElementInfo) => {
  // info.componentEventType === ComponentEventType.COMPONENT_CLICKED
});
```

**RN 插件测试建议**：默认用 §4 的 text 轮询；仅当弹窗时序极不稳定且 Observer 在目标 API 级别可用时再引入。

---

## 9. 多方法顺序依赖

参考：`repos-rn/react_native_bluetooth_state_manager/.../ModuleTest.test.ets` L146–158

```typescript
it('removeListener', 0, async () => {
  const driver = appDriver!;
  // 先 add
  const addBtn = await findMethodButton(driver, 'add-listener', 'Add Listener');
  await addBtn.click();
  await sleep(1000);
  // 再 remove
  const rmBtn = await findMethodButton(driver, 'remove-listener', 'Remove Listener');
  await rmBtn.click();
  expect((await waitForText(driver, 'Listener removed', RESULT_TIMEOUT_MS)) !== null).assertTrue();
});
```

同一 `describe` 内 `it` 执行顺序不保证；有依赖时应在一个 `it` 内完成前置步骤，或确保操作幂等。

---

## 10. Fabric 组件可见性测试

来源：`tool-testing/SKILL.md` §3.5

```typescript
it('renderMyComponent', 0, async () => {
  const driver = appDriver!;
  let found = await waitForId(driver, 'test-my-component', 3000);
  if (found === null) {
    found = await waitForText(driver, 'Visible Label', 2000);
  }
  expect(found !== null).assertTrue();
});
```

---

## 11. 错误码与排查

| 错误码 | 错误信息 | 常见原因 | 处理 |
|--------|----------|----------|------|
| 17000002 | async function is not called with await | 漏写 await | 全部 TestKit 调用加 await |
| 17000004 | component is invisible or destroyed | 控件不可见、RN 未加载完、在 ScrollView 外 | scrollSearch / 延长 RN_LOAD_TIMEOUT |
| 401 | Parameter error | pinch scale 越界、坐标非正整数 | 查 d.ts 参数范围 |

完整文档：`harmonyos-sdk-api-lookup/api-references/系统-调测调优-Test Kit（应用测试服务）-错误码-uitest错误码.md`

### 排查清单

1. `hdc shell uitest dumpLayout -p` — 确认 text/id/type
2. 检查 `bundle.harmony.js` 是否存在
3. 检查 `BUNDLE_NAME` / `ENTRY_ABILITY` 与 app.json5 一致（跑 validate 脚本）
4. 检查按钮文案是否与标题重复
5. 检查 Hypium 15s 单用例超时是否耗尽

---

## 12. MatchPattern 匹配模式

| 枚举 | 值 | 说明 |
|------|-----|------|
| EQUALS | 0 | 等于（默认） |
| CONTAINS | 1 | 包含 |
| STARTS_WITH | 2 | 前缀 |
| ENDS_WITH | 3 | 后缀 |
| REG_EXP | 4 | 正则（API 18+） |
| REG_EXP_ICASE | 5 | 正则忽略大小写（API 18+） |

```typescript
import { ON, MatchPattern } from '@kit.TestKit';
ON.text('State:', MatchPattern.STARTS_WITH)
ON.type('Button', MatchPattern.EQUALS)
```

d.ts L39+；文档 `MatchPattern`（`@ohos.UiTest.md` 约 L29）。
