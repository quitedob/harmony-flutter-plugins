---
name: code-stats
description: 统计 Flutter 插件仓库各平台代码行数（Dart、Android、iOS、C/C++、Example）。当需要对插件代码量进行量化分析、填写 code_metrics 字段时使用。触发关键词：代码统计、代码行数、code lines、line count、代码量。
---

# Code-Stats — 代码量统计

统计当前 Flutter 插件仓库（CWD）中各平台代码的物理行数。

## 统计范围

| 分类 | 目录 | 文件扩展名 |
|------|------|------------|
| `dart` | `lib/` | `.dart` |
| `android` | `android/` | `.java`, `.kt`, `.kts` |
| `ios` | `ios/` | `.swift`, `.m`, `.mm`, `.h` |
| `cpp` | `src/` | `.c`, `.cpp`, `.cc`, `.h`, `.hpp` |
| `example` | `example/` | `.dart` |

## 执行方法

在 CWD（`repos/{plugin_name}/`）下执行以下**单条**命令，一次性获取全部统计结果：

```bash
echo "{\"dart\":$(find lib -not -path '*/build/*' -not -path '*/.dart_tool/*' -not -path '*/generated/*' -type f -name '*.dart' -exec cat {} + 2>/dev/null | wc -l | tr -d ' '),\"android\":$(find android -not -path '*/build/*' -type f \( -name '*.java' -o -name '*.kt' -o -name '*.kts' \) -exec cat {} + 2>/dev/null | wc -l | tr -d ' '),\"ios\":$(find ios -not -path '*/build/*' -type f \( -name '*.swift' -o -name '*.m' -o -name '*.mm' -o -name '*.h' \) -exec cat {} + 2>/dev/null | wc -l | tr -d ' '),\"cpp\":$(find src -type f \( -name '*.c' -o -name '*.cpp' -o -name '*.cc' -o -name '*.h' -o -name '*.hpp' \) -exec cat {} + 2>/dev/null | wc -l | tr -d ' '),\"example\":$(find example -not -path '*/build/*' -not -path '*/.dart_tool/*' -type f -name '*.dart' -exec cat {} + 2>/dev/null | wc -l | tr -d ' ')}"
```

命令直接输出 JSON，无需额外解析。目录不存在时对应值为 0。

## 结果格式

命令输出的 JSON 对象：

```json
{
  "dart": 1234,
  "android": 567,
  "ios": 890,
  "cpp": 0,
  "example": 234
}
```

- 各字段为整数，无匹配文件时为 0
- 必须包含 `dart`、`android`、`ios`、`cpp`、`example` 五个键

## 注意事项

- 对于 monorepo，统计范围包含当前包及其子包（按实际目录结构）
- 命令已内置排除 `build/`、`.dart_tool/`、`generated/` 等构建产物目录
