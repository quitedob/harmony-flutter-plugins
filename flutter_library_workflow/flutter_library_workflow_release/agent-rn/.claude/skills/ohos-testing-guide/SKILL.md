---
name: ohos-testing-guide
description: 鸿蒙 testing 阶段指导。Example 测试页、build hap、README 占位符填充规则。
---

# 鸿蒙 Testing 阶段指导（统一入口）

本 Skill 由 `testing` 阶段（`primary-04-testing`）在 **步骤 5 填充 README** 时加载；步骤 3–4 的 HAP 编译与修错见 `primary-04-testing.md` 与 `failure-lessons`。

## 步骤 5：填充 README（必读）

```
read_file: .claude/skills/ohos-testing-guide/readme-fill.md
```

按 `readme-fill.md` **严格**执行：

| 要点 | 说明 |
|------|------|
| 只填占位符 | `{{API_ROWS}}`、`{{API_NOTES}}`、`{{USAGE_EXAMPLE}}`、`{{USAGE_NOTES}}` |
| 支持列 | 须 SDK 调研，禁止「有代码即 ✅」 |
| 路径 | 读者在 **ohos 包根**；禁止 `cd ohos`、`ohos/example/...` |
| 快速验证 | 填完占位符后按 `readme-fill.md`「快速验证（准确性）」核对表 |

数据来源：`.rn-ohos-adaptation/02-planning.json`、`.rn-ohos-adaptation/03-coding-library.json`、原库 README 或 `ohos/example/App.tsx`。

可选：调研鸿蒙 API 时加载 `harmonyos-sdk-api-lookup` Skill。

## ohpm 缓存同步规则（HAP 构建前必读）

`ohpm install` 后，如果本地 HAR 版本号未变（开发阶段常见），ohpm 不会更新 `oh_modules/.ohpm/` 下的缓存文件。**修改源码后重新 build HAR 并安装，运行时仍可能使用旧代码**。

### 处理方法

在 `ohpm install` **之前**，清理目标库的缓存目录：

```bash
# 1. 查找缓存路径
find oh_modules/.ohpm -type d -name "*包名*"

# 2. 清理缓存（ohpm install 前执行）
rm -rf oh_modules/.ohpm/@react-native-oh-tpl+包名*
rm -rf entry/oh_modules/@react-native-oh-tpl/包名

# 3. 重新安装
ohpm install
```

### 何时需要执行

- HAR 重新 build 后准备 build HAP 时
- 修复了库源码并重新编译 HAR 后
- 调试时发现代码更新不生效

### 与 rn.py build hap 的关系

如果使用 `rn.py build hap` 命令，该命令内部已处理依赖安装。但在**手动调试流程**中（直接执行 `ohpm install` + `hvigorw assembleHap`），必须手动处理缓存清理。

---

## 相关文件

| 文件 | 用途 |
|------|------|
| `readme-fill.md` | README 占位符填充完整规则 |
| `../tool-ohos-plugin-repo/templates/ohos/README.md` | 快速验证章节结构参考 |

## 与 primary-04-testing 的分工

| 内容 | 位置 |
|------|------|
| prepare / 测试页 / build hap / 04 产物 | `primary-04-testing.md` |
| README 填充细则 | 本 Skill → `readme-fill.md` |
