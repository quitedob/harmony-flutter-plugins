# 库画像与定性分类指南（阶段0）

> 用 Read 读小配置文件（模型直接读懂 JSON5，比正则解析器更稳）、用 Glob/Grep 判库型、用一两条 `find | wc` 统计规模。产出"库画像"填入报告模板顶部。

## 目录
- [A. 读取元信息（Read）](#a-读取元信息read)
- [B. 判定库型（Glob / Grep）](#b-判定库型glob--grep)
- [C. 判定产物类型 HAR/HSP](#c-判定产物类型-harhsp)
- [D. 统计规模（Bash 一行）](#d-统计规模bash-一行)
- [E. 循环依赖线索（可选）](#e-循环依赖线索可选)
- [产出：库画像](#产出库画像)
- [评估清单](#评估清单)

---

## A. 读取元信息（Read）

直接 **Read** 以下小文件并提取字段——无需任何解析脚本：

| 文件 | 提取 |
|------|------|
| `oh-package.json5` | `name` / `version` / `main`；`dependencies` / `devDependencies` / `dynamicDependencies`（计数 + 依赖名） |
| `module.json5` | `module.type`（`shared`=HSP / `har`=HAR）、`deviceTypes` |
| `build-profile.json5` | `byteCodeHar`（true=字节码 HAR）、`compatibleSdkVersion`、`runtimeOS` |
| 入口 `Index.ets`（或 `main` 指定文件） | 导出条目列表；**是否存在 `export *`**（封装风险） |

> 这些文件都很小，Read 后由模型理解即可，含注释/尾逗号/单引号的 JSON5 也能正确读懂。

## B. 判定库型（Glob / Grep）

判定顺序 **NAPI > UI > 逻辑**：

| 库型 | 判据（Glob/Grep 命中） |
|------|------|
| **NAPI/Native 库** | Glob 命中 `**/src/main/cpp/**` 或 `**/*.so` 或 `**/*.d.ts` |
| **UI 库** | Grep 在任一 `*.ets` 命中 `@Component`/`@ComponentV2`/`@Builder`/`@Entry`/`@Reusable`/`struct ` |
| **逻辑库** | 以上都不命中（纯 .ts/.ets，工具/网络/数据/算法） |

```bash
LIB=/path/to/lib   # ← 改成库根目录

# 库型线索（UI / NAPI）；用装饰器作信号，可移植于 BSD/GNU grep
grep -rqE '@Component|@ComponentV2|@Builder|@Entry|@Reusable' "$LIB" --include='*.ets' 2>/dev/null \
  && echo "UI: 是（发现 ArkUI 装饰器/组件）" || echo "UI: 否"
{ find "$LIB" -path '*/src/main/cpp' -type d 2>/dev/null | grep -q . \
  || find "$LIB" \( -name '*.so' -o -name '*.d.ts' \) 2>/dev/null | grep -q . ; } \
  && echo "NAPI: 是（发现 cpp/.so/.d.ts）" || echo "NAPI: 否"
```

## C. 判定产物类型 HAR/HSP

综合 A 的读取结果判定：

- `module.json5` 的 `type: "shared"` → **HSP（动态共享包）**
- `module.json5` 的 `type: "har"`，或 `build-profile.json5` 含 `byteCodeHar` → **HAR**（`byteCodeHar: true`=字节码，`false`=源码/js 中间码）
- 两者都无法判定 → 标注 "HAR（推测）/ 需人工确认"

```bash
# 产物类型线索（[[:space:]] 可移植于 BSD/GNU grep）
grep -rhE '"?type"?[[:space:]]*:[[:space:]]*"(har|shared)"' "$LIB" --include='module.json5' 2>/dev/null | head -1
grep -rhE 'byteCodeHar' "$LIB" --include='build-profile.json5' 2>/dev/null | head -1
# Index.ets 导出（含 export * 检测）
[ -f "$LIB/Index.ets" ] && grep -nE '^[[:space:]]*export' "$LIB/Index.ets"
```

## D. 统计规模（Bash 一行）

机械统计交给 shell（macOS/Linux 通用，已排除依赖与构建产物）：

```bash
# 文件数（.ets/.ts）
find "$LIB" -type f \( -name '*.ets' -o -name '*.ts' \) \
  -not -path '*/oh_modules/*' -not -path '*/build/*' \
  -not -path '*/node_modules/*' -not -path '*/.preview/*' | wc -l

# 代码行数 LOC
find "$LIB" -type f \( -name '*.ets' -o -name '*.ts' \) \
  -not -path '*/oh_modules/*' -not -path '*/build/*' \
  -not -path '*/node_modules/*' -not -path '*/.preview/*' -exec cat {} + | wc -l
```

## E. 循环依赖线索（可选）

阶段0 **不做**权威循环依赖检测——以阶段1 CodeLinter 扫描（独立报告节）为准。如需在阶段0 粗看，可 Grep 库内相对 import 供人工判断（💡 提示，非结论）：

```bash
grep -rnE "import .* from ['\"]\.\.?/" "$LIB/src" --include='*.ets' --include='*.ts'
```

## 产出：库画像

把上述结果填入报告模板「一、库画像」表：

| 项 | 来源 |
|----|------|
| 库名 / 版本 / 入口 | A（oh-package.json5） |
| 产物类型 HAR/HSP | C |
| 库型 UI/逻辑/NAPI | B |
| 导出数量 / 是否 export * | A（Index.ets） |
| 依赖计数 | A（oh-package.json5） |
| compatibleSdkVersion / runtimeOS / deviceTypes | A |
| 规模（文件数 / LOC） | D |
| CodeLinter 状态 | 阶段1 探测结果 |

---

## 评估清单

- [ ] 已 Read `oh-package.json5` / `module.json5` / `build-profile.json5` / `Index.ets` 并提取字段
- [ ] 已用 Glob/Grep 判定库型（UI / 逻辑 / NAPI）
- [ ] 已判定产物类型（HAR / HSP）并记录是否字节码
- [ ] 已用 `find | wc` 统计文件数与 LOC
- [ ] 已识别 `Index.ets` 导出数与是否 `export *`
- [ ] 库画像表填写完整，进入阶段1
