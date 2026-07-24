# 非迁移场景验证（init 前）

**时机**：`rn.py create` 完成之后、**未**执行 migrate 时；`rn.py init` 之前。

用于新架构库或无需 JS 侧迁移的插件。发现问题**直接修复**后再 init。

**信息来源**：读 `ohos/src/` 与 `ohos/package.json` + create 命令输出（当前上下文）。

## 职责边界（仅此两项）

| 检查对象 | 内容 |
|----------|------|
| **`ohos/src/`** | 目录存在；create 后入口与模板/分析预期一致（无 migrate 时通常无 Spec 或仅有占位） |
| **`ohos/package.json`** | 存在、合法 JSON；`harmony.alias` 等 create 应写入的字段齐全 |

**不检查**：`ohos/example/`、`ohos/harmony/`、`generated/`、Spec/JS 细节（迁移场景用 `verify-migration.md`）、ETS 实现、任何 `ohos/` 下除 `src/` 与根级 `package.json` 以外的路径。

## init 曾失败时

若**刚执行** `rn.py init` 失败，**以该次终端输出**为准，但**只根据输出修 `ohos/src/` 或 `ohos/package.json`**（例如依赖名、alias、入口路径），修完后**完整重跑** init。

| 输出关键词 | 在两项范围内的排查 |
|------------|-------------------|
| `npm install failed` | `ohos/package.json` 依赖与 scripts |
| `codegen failed` | `ohos/package.json` 的 `codegen-lib` 与 `ohos/src/specs/` 是否一致（有 Spec 时） |
| `ohpm ERROR` | 一般属 `harmony/` 脚手架，**本步不查**；若 init 日志明确指向 `package.json` 字段再改 |

## 检查清单

### `ohos/src/`

- `ohos/src/` 存在
- 入口文件存在且可被 `ohos/package.json` 的 `main` / 模块字段引用（以仓库实际字段为准）
- **双入口**（根 `index.js` + `src/index.js`）：若 Example 使用 `import X from 'pkg'; X.method()`，确认 `ohos/src/index.js` 的 `export default` 为**对象**（聚合 `./src`），不是单个函数；见 `library-fill-implementation.md` §0.1.1

### `ohos/package.json`

- 文件存在且为合法 JSON
- `harmony.alias` 存在（create 应已写入）
- 字段与 01/02 分析一致（包名、版本等明显错误时直接改）
- **依赖鸿蒙化检查**：读取 `.rn-ohos-adaptation/02-planning.json`，根据其中依赖映射信息，确认 `ohos/package.json` 中依赖名是否正确
  - create 脚本可能写入原始依赖名（如 `react-native-reanimated`），需替换为鸿蒙化包名（如 `@react-native-oh-tpl/react-native-reanimated`）
  - **直接使用鸿蒙化包名**，不要用 npm alias 语法（如 `"react-native-reanimated": "npm:@react-native-oh-tpl/..."`）
  - 包自身的 `harmony.alias` 字段会自动处理 import 重定向
  - 常见需鸿蒙化的依赖：`react-native-reanimated`、`react-native-gesture-handler`、`react-native-svg`、`react-native-fast-image` 等

## 验证命令（示例）

```bash
ls ohos/src/
cat ohos/package.json
```

## 修复原则

- 仅改 `ohos/src/` 或 `ohos/package.json`
- **依赖鸿蒙化修复**：若 `ohos/package.json` 中依赖名未替换为鸿蒙化版本，直接 edit 修改
- 无法仅凭这两项推断的缺失（如 `harmony/{short_name}/` 目录损坏）→ 记入报告或回到 create，**勿在本步展开检查其他目录**

## 不要检查

- `ohos/harmony/*`、`ohos/example/*`、`generated/` 及 init 产物
