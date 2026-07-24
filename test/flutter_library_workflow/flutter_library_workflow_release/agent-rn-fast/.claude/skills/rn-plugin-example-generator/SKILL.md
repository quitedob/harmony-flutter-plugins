---
name: rn-plugin-example-generator
description: "基于 04-test-cases.json 生成完整的 RN 模块 example_auto 代码（三级页面 + ResultPanel），包括骨架生成和根据 PRD 公开 API 规格及测试信息填充完整的功能实现。"
---

# RN 插件 Example 生成 Skill

## 执行前：Todo 清单（MANDATORY - 必须完成）

**重要：Todo 清单是强制性的，必须严格按照顺序完成每个步骤。**

- [ ] Step 1：调用代码生成器，从 04-test-cases.json 生成 example_auto 完整代码结构
- [ ] Step 2：根据 PRD 公开 API 规格和测试信息实现完整的功能逻辑
- [ ] Step 3：编译 HAP（bundle + assembleHap）
- [ ] Step 4：生成 Demo 生成结果文件

## Step 1：调用代码生成器（生成完整代码结构）

```bash
python "$GEN_PY" \
  --plugin-root "$PLUGIN_ROOT" \
  --adaptation-dir "$REPO_ROOT/.ohos-adaptation"
```

> `$GEN_PY` / `$PLUGIN_ROOT` / `$REPO_ROOT` 由 `primary-05-demo-gen.md` 的 3.0 路径准备定义。
> 扁平仓库下 pluginRoot == repoRoot，传双路径也兼容。
> monorepo 仓库下 `ohos/` 在 `packages/<pkg>/`、`.ohos-adaptation/` 在仓库根，二者必须分别传。

生成器会：
1. **拷贝 `pluginRoot/ohos/example` 目录到 `pluginRoot/ohos/example_auto`**（如果 example 目录存在）
2. **清理不需要的文件**（包括 node_modules、.harmony 等自动生成的文件）
3. 读取 `$REPO_ROOT/.ohos-adaptation/04-test-cases.json`
4. 输出完整的代码结构到 `pluginRoot/ohos/example_auto`：
   - `data/testCases.ts`（测试用例数据）
   - `components/ResultPanel.tsx`（结果展示组件）
   - `pages/ModuleList.tsx`（模块列表页）
   - `pages/TestCaseList.tsx`（用例列表页）
   - `pages/TestCaseDetail.tsx`（用例详情页，含测试信息和功能实现占位）
   - `App.tsx`（路由入口）

## Step 2：根据 PRD 公开 API 规格和测试信息实现完整功能逻辑

### ⚠️ 硬约束（违反会导致下游黑盒验证全部失败）

**每个 `TestCase_F_XX_YY.tsx` 都必须实现真实的功能按钮，禁止保留任何占位代码**。

❌ 禁止保留以下占位代码：
```tsx
{/* TODO: 根据测试用例生成操作按钮 */}
<TouchableOpacity testID="btn_placeholder" ...>
  <Text>执行测试 (占位)</Text>
</TouchableOpacity>
```

✅ 必须替换为真实按钮：
```tsx
<TouchableOpacity testID="btn_<apiName>" ...>
  <Text>实际描述（如"调用 setStatusBarStyle('light') 验证状态栏变亮"）</Text>
</TouchableOpacity>
```

**历史教训**：react_native_edge_to_edge demo-gen agent 偷懒只实现 1/41 个用例，
40 个用例保留 `btn_placeholder` 占位按钮，导致黑盒验证 40 个用例点击无效果，
DroidRun 无法验证任何 API 行为。

**Step 2 完成的强制判定**（写完所有用例后必须执行）：
```bash
grep -l "btn_placeholder\|执行测试 (占位)" ohos/example_auto/pages/TestCase_*.tsx | wc -l
```
输出必须为 **0**。否则**禁止进入 Step 3**，必须补完所有占位按钮。

### ⚠️ 硬约束二：信息区只读，只准改 Actions 区

`generate_example.py` 生成的 `TestCase_*.tsx` 骨架已经把用例信息**内联成中文**：页面标题 `[ID] 标题`、`级别:`、`测试信息`、`前置条件:`、`测试步骤:`、`预期结果:`、`后置条件:`，内容均取自 `04-test-cases.json` 原文。

实现 Step 2 时**只允许替换 `Actions` 区里的 `btn_placeholder` 占位按钮**，其余部分原样保留：

- ❌ **禁止整页重写** `TestCase_*.tsx`
- ❌ **禁止改写、翻译、删除信息区**（标题/级别/测试信息/前置条件/测试步骤/预期结果/后置条件）
- ❌ **禁止把中文标签译成英文**（如 `测试信息`→`Test Info`、`前置条件:`→`Preconditions:`、`预期结果:`→`Expected:`、`级别:`→`Level:`）
- ✅ 只在 `<Text style={styles.actionTitle}>Actions</Text>` 下方，把 `btn_placeholder` 占位按钮替换为真实 API 调用按钮；如需输入框/组件，也只加在 Actions 区
- ✅ 信息区文案必须与 `04-test-cases.json` 中该用例的中文原文一致

**历史教训**：gif_player、navigation_bar_color 的 demo-gen agent 把整个 `TestCase_*.tsx` 重写成英文，丢失了测试步骤区，且页面文案与中文测试步骤对不上，导致黑盒验证 DroidRun 按中文步骤找不到英文 UI 元素。

**Step 2 语言/结构强制判定**（与占位按钮判定一起执行）：
```bash
# ① 英文信息区标签命中数必须为 0
grep -lE ">Test Info<|>Preconditions:<|>Expected:<|>Level: |>Test Steps:<|>Postconditions:<" ohos/example_auto/pages/TestCase_*.tsx | wc -l
# ② 每页必须保留中文信息区与测试步骤区（命中数应等于页面总数）
grep -lE ">测试信息<" ohos/example_auto/pages/TestCase_*.tsx | wc -l
grep -lE ">测试步骤:<" ohos/example_auto/pages/TestCase_*.tsx | wc -l
```
① 必须为 **0**；② 两个命中数都必须等于 `TestCase_*.tsx` 总数。任一不满足 → **禁止进入 Step 3**，必须把信息区改回骨架的中文原文（只保留你对 Actions 区的改动）。

---

1. **参考资料**：
   - 打开 `.ohos-adaptation/01-analysis-prd.md` 的公开 API 规格
   - 参考 `.ohos-adaptation/04-test-cases.json` 中的测试用例信息
   - 查看 `pages/TestCaseDetail.tsx` 中的测试信息

2. **实现策略**：
   - 对每个测试用例，在 `pages/TestCaseDetail.tsx` 中实现完整的 API 调用逻辑
   - 根据测试步骤中的 API 调用信息，创建对应的操作按钮
   - 确保每个操作都能满足测试用例的预期结果

3. **实现要求**：

### API 类条目（TurboModule 方法调用）

用 TouchableOpacity 或 Button 包装：
- **按钮文字**：参考测试信息中的描述
- **语义 Key**：添加 testID，如 `testID="btn_getTimeZone"`
- **实现逻辑**：onPress 中调用对应 API，更新 result 状态
- **聚焦当前场景**：只实现满足当前测试用例场景的功能

### UI 类条目（Fabric 组件）

直接在 Actions 区域放置该组件：
- 不需要按钮包装
- 实现组件的交互回调，将可验证状态写入 result

### 通用要求

- 实现 TODO 处的插件 import
- 每次功能触发都要更新 result，让 ResultPanel 可读
- 按钮文字要能看出"点这个按钮是在验证什么功能"

### 可运行 example 硬规则（来源：docs/0604_rn_faq 调试记录）

生成 example 代码时**必须**遵守，否则装上却跑不通 / 看不出功能。`check_example_static.py` 会对 ① ② 做硬门禁、③ ④ 告警：

1. **禁用 iOS-only / 平台不兼容 API**（硬错误）
   - `Alert.prompt` 鸿蒙/Android 为 `undefined`（崩溃）。鸿蒙仅 `Alert.alert`；需输入用 `Modal`+`TextInput`。
   - 平台分支用精确匹配 `Platform.OS === 'harmony'`，禁排除法。
2. **示例 URL 必须鸿蒙 WebView 可达**（硬错误）
   - ✅ 图片 `https://picsum.photos/{w}/{h}`；视频 MDN `rabbit320.mp4`；优先复制原始仓库 `examples/` 已验证 URL。
   - ❌ `via.placeholder.com` / `placeholder.com` / 不存在的 `example.com` / 需特殊网络的资源。
3. **真实可渲染输入，禁空/占位 source**（告警）
   - PDF/图片/视频/文件/地图等"需外部输入才体现功能"的组件，不能把 `source`/`uri` 写成 `useState('')`。
   - 标准套路：样本放 `entry/src/main/resources/rawfile/` → `EntryAbility.onCreate` 用 `resourceManager.getRawFileContentSync` + `fileIo` 拷到 `context.filesDir` → 用真实绝对路径作 source。
   - 沙箱路径形如 `/data/storage/el2/base/haps/entry/files/<name>`；EntryAbility 里 hilog 打印实际 `filesDir` 便于核对。
4. **example 不带 lint 脚本**（告警）：避免 monorepo 根 eslint flat config 干扰中止 build。
5. **测试意图对齐鸿蒙原生实现**：基于已生成的原生分支反推预期（如空 source 在鸿蒙不会 emit `onError`，别照搬 Android 假设）。

> 详细条目见 `failure-lessons`：`testing-api-003`、`testing-api-004`、`testing-example-001`、`testing-config-008`。

### check_example_static.py 使用说明

> **注意**：脚本结果仅供参考。只能分析静态结构（对象字面量、class），无法识别函数调用返回值等复杂导出模式。
> 
> 若发现脚本误报或遗漏，记录到 `.ohos-adaptation/check-script-issues.md` 供后续优化。

## Step 3：编译 HAP（bundle + assembleHap）

**编译前最后确认**：再次执行 Step 2 末尾的 grep 命令：
```bash
grep -l "btn_placeholder\|执行测试 (占位)" ohos/example_auto/pages/TestCase_*.tsx | wc -l
```
如果输出 > 0，**回去补完占位按钮再来**。带着占位按钮编译出的 HAP 黑盒验证跑不通。

页面骨架和功能实现完成后，编译 HAP 供黑盒验证阶段直接使用。

**编译命令**（在插件仓库根目录执行）：

```bash
# 生成 JS bundle（将新的 App.tsx + 测试页面打包）
cd ohos/example_auto
npm run dev
cd ../..

# 编译 HAP（bundle + assembleHap；自动清 hvigor caches、保留 junction 短路径）
# 先定位 rnohos.py（不要写死 .claude/skills/...；两种部署形态见 rn-ohos-template SKILL.md）
RNOHOS=$(ls .claude/skills/rn-ohos-template/rnohos.py 2>/dev/null \
      || ls ~/.vscode/extensions/*/resources/opencode/plugin/hmos-library-adapter-fast/shared/skills/rn-ohos-template/rnohos.py 2>/dev/null | head -1)
python "$RNOHOS" build hap --example-dir example_auto
```

> 禁止裸调 `hvigorw assembleHap`：会绕开 rnohos.py 的 Windows 长路径保护
> （abspath 不展开 junction、_clean_hvigor_caches 防 pnpm 索引超长），
> 在长仓库根路径下必撞 ninja boost 头文件 260 字符或 pnpm 索引 ENOENT。

**产物检查**：
- JS bundle：`ohos/example_auto/harmony/entry/src/main/resources/rawfile/bundle.harmony.js`
- HAP：`ohos/example_auto/harmony/entry/build/default/outputs/default/entry-default-unsigned.hap`

**注意**：
- node_modules 和 oh_modules 已从 example 阶段保留，无需重新 npm install / ohpm install
- C++ 注册 / autolink 三件套已从 example 保留，无需重新 register_dep_plugins
- 只需 bundle + assembleHap 两步

**HAP 签名状态**：本阶段产出的 `entry-default-unsigned.hap`（未签名）不算失败。HAP 编译通过即可继续，
在 `05-demo-gen.json` 中如实记录 `signed: false`。**不要为了"对齐"而手工修改 build-profile.json5 的
signingConfigs 字段**——签名对齐与重签由 06 黑盒验证阶段（`rn-check-hap-signing.js`）统一接管，
它会强制 `signingConfigs[].name=default` + `products[].signingConfig=default`、清缓存、调 hvigorw 重 build
产出 `entry-default-signed.hap` 再 install。

## Step 4：生成 Demo 生成结果文件

1. **生成 05-demo-gen.json**：
   ```json
   {
     "status": "success",
     "message": "Demo App 生成成功",
     "generatedAt": "2026-03-28T10:00:00+08:00",
     "statistics": {
       "modules": 2,
       "testCases": 10,
       "p0TestCases": 5,
       "generatedFiles": 6
     },
     "generatedFiles": [
       "ohos/example_auto/App.tsx",
       "ohos/example_auto/data/testCases.ts",
       "ohos/example_auto/pages/ModuleList.tsx",
       "ohos/example_auto/pages/TestCaseList.tsx",
       "ohos/example_auto/pages/TestCaseDetail.tsx",
       "ohos/example_auto/components/ResultPanel.tsx"
     ]
   }
   ```

2. **生成 05-demo-gen-report.md**：
   包含 Demo 生成的详细报告。

## 额外参考

- 骨架生成器：`.claude/skills/rn-plugin-example-generator/tool/generate_example.py`
- 测试用例文件：`.ohos-adaptation/04-test-cases.json`