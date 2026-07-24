---
name: code-stats
description: 统计 React Native 模块仓库各部分代码行数（JavaScript/TypeScript、harmony ETS、C/C++、Example）。当需要对模块代码量进行量化分析、填写 code_metrics 字段时使用。触发关键词：代码统计、代码行数、code lines、line count、代码量。
---

# Code-Stats — 代码量统计

统计当前 React Native 模块仓库（CWD）中各部分代码的物理行数。

## 统计范围

| 分类 | 目录 | 文件扩展名 |
|------|------|------------|
| `javascript` | `src/`, `lib/`, `index.ts`, `index.js` | `.js`, `.jsx`, `.ts`, `.tsx` |
| `harmony_ets` | `harmony/` | `.ets`, `.ts` |
| `cpp` | `harmony/**/cpp/`, `src/` | `.c`, `.cpp`, `.cc`, `.h`, `.hpp` |
| `android` | `android/` | `.java`, `.kt` |
| `ios` | `ios/` | `.swift`, `.m`, `.mm`, `.h` |
| `example` | `example/`, `SampleApp/`, `SampleProject/` | `.js`, `.jsx`, `.ts`, `.tsx`, `.ets` |

## 执行方法

在 CWD（`repos-rn/{module_name}/`）下执行以下**单条**命令，一次性获取全部统计结果：

```bash
echo "{\"javascript\":$(find src lib -not -path '*/node_modules/*' -not -path '*/build/*' -type f \( -name '*.js' -o -name '*.jsx' -o -name '*.ts' -o -name '*.tsx' \) -exec cat {} + 2>/dev/null | wc -l | tr -d ' '),\"harmony_ets\":$(find harmony -not -path '*/node_modules/*' -not -path '*/build/*' -not -path '*/oh_modules/*' -type f \( -name '*.ets' -o -name '*.ts' \) -exec cat {} + 2>/dev/null | wc -l | tr -d ' '),\"cpp\":$(find harmony -not -path '*/build/*' -type f \( -name '*.c' -o -name '*.cpp' -o -name '*.cc' -o -name '*.h' -o -name '*.hpp' \) -exec cat {} + 2>/dev/null | wc -l | tr -d ' '),\"android\":$(find android -not -path '*/build/*' -type f \( -name '*.java' -o -name '*.kt' \) -exec cat {} + 2>/dev/null | wc -l | tr -d ' '),\"ios\":$(find ios -not -path '*/build/*' -type f \( -name '*.swift' -o -name '*.m' -o -name '*.mm' -o -name '*.h' \) -exec cat {} + 2>/dev/null | wc -l | tr -d ' '),\"example\":$(find example SampleApp SampleProject -not -path '*/node_modules/*' -not -path '*/build/*' -not -path '*/oh_modules/*' -type f \( -name '*.js' -o -name '*.jsx' -o -name '*.ts' -o -name '*.tsx' -o -name '*.ets' \) -exec cat {} + 2>/dev/null | wc -l | tr -d ' ')}"
```

命令直接输出 JSON，无需额外解析。目录不存在时对应值为 0。

## 结果格式

命令输出的 JSON 对象：

```json
{
  "javascript": 1234,
  "harmony_ets": 567,
  "cpp": 890,
  "android": 456,
  "ios": 234,
  "example": 123
}
```

- 各字段为整数，无匹配文件时为 0
- 必须包含 `javascript`、`harmony_ets`、`cpp`、`android`、`ios`、`example` 六个键

## 注意事项

- 对于 monorepo，统计范围包含当前包及其子包（按实际目录结构）
- 命令已内置排除 `node_modules/`、`build/`、`oh_modules/` 等构建产物目录
- `harmony/` 目录下既有 `.ets` 也有 `.ts` 文件，均计入 `harmony_ets`
- `cpp` 统计 `harmony/` 下的 C++ 代码（用于 C++ TurboModule 或 Fabric 组件）
