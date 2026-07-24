---
name: flutter-sdk-switch
description: Flutter OHOS SDK 环境适配 Skill。基于 sdk-paths.json 配置，在 Planning 阶段检测插件 Dart SDK 约束并选择兼容版本，结果写入阶段产物供后续流程直接引用。支持 macOS / Windows / Linux。
---

# Flutter SDK 环境适配

## 设计原则

- **sdk-paths.json 为唯一 SDK 来源**，不做全局目录扫描
- **Planning 阶段一次检测**，结果写入 `02-planning.json`，后续阶段直接读取

## 两阶段执行模型

| 阶段 | 执行内容 | 耗时 |
|------|---------|------|
| Planning | 完整检测流程（步骤 1-6），结果写入 `02-planning.json` | 约 2-3 秒 |
| Coding / Testing / Device-verify | 读取 `02-planning.json`，一行 PATH 切换 + 验证 | <1 秒 |

---

## A. Planning 阶段：完整检测流程

### 1. 加载 sdk-paths.json

读取 `.claude/skills/flutter-sdk-switch/sdk-paths.json`。

**若文件不存在或 `sdk_paths` 数组为空**：
- 输出日志：`"[SDK Switch] sdk-paths.json 未配置，跳过 SDK 版本适配。注意：当前 PATH 中的 Flutter/Dart 版本可能与插件 environment.sdk 约束不一致，如遇版本冲突请配置 sdk-paths.json"`
- 检测当前 PATH 中 `flutter --version` 提取主版本号
- 在 `02-planning.json` 中写入 `"sdk_environment": { "needs_switch": false, "flutter_version": "<当前主版本号>" }`
- **跳过后续所有步骤**，不阻断流程

配置文件格式（参考 `sdk-paths.example.json`）：

```json
{
  "sdk_paths": [
    "/path/to/flutter_ohos_highest_dart_version",
    "/path/to/flutter_ohos_middle_version",
    "/path/to/flutter_ohos_lowest_version"
  ]
}
```

### 2. 读取插件 SDK 约束

读取 `pubspec.yaml` 的 `environment.sdk` 字段，提取 Dart 版本的**下界**和**上界**。

示例：
- `>=3.5.0 <4.0.0` → 下界 `3.5.0`，上界 `4.0.0`（不含）
- `>=3.7.2` → 下界 `3.7.2`，无上界
- `^3.5.0` → 下界 `3.5.0`，上界 `4.0.0`（不含）

若无 `environment.sdk` 字段或无法解析，默认下界为 `2.12.0`，无上界。

### 3. 检测当前环境（优先使用）

```bash
# macOS / Linux
dart --version 2>&1 | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1

# Windows (PowerShell)
(dart --version 2>&1) -match '\d+\.\d+\.\d+' | Out-Null; $Matches[0]
```

若当前版本已满足约束（≥ 下界，且 < 上界（如有）），直接写入产物 `"needs_switch": false`，**跳过步骤 4-5**。当前环境能用就不切换，避免引入不必要的环境差异。

### 4. 检测候选 SDK 版本

对 `sdk_paths` 中的每个路径，检测其 Dart 版本：

```bash
# macOS / Linux
for dir in <sdk_paths 列表>; do
  dart_bin="$dir/bin/dart"
  if [ -f "$dart_bin" ]; then
    version=$("$dart_bin" --version 2>&1 | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)
    echo "$dir|$version"
  else
    echo "[SDK Switch] 警告：$dir/bin/dart 不存在，跳过"
  fi
done
```

```powershell
# Windows (PowerShell)
foreach ($dir in $sdkPaths) {
    $dartExe = Join-Path $dir "bin\dart.bat"
    if (Test-Path $dartExe) {
        $output = & $dartExe --version 2>&1 | Out-String
        if ($output -match '(\d+\.\d+\.\d+)') { Write-Output "$dir|$($Matches[1])" }
    } else {
        Write-Warning "[SDK Switch] $dartExe 不存在，跳过"
    }
}
```

### 5. 选择兼容 SDK

**版本比较方法**（macOS / Linux）：

```bash
# 判断 $v1 >= $v2
version_ge() { printf '%s\n%s' "$2" "$1" | sort -V | head -1 | grep -qx "$2"; }

# 判断 $v1 < $v2
version_lt() { [ "$1" != "$2" ] && version_ge "$2" "$1"; }
```

> Windows 下 Agent 直接按 major.minor.patch 数值逐段比较，无需 shell 函数。

**选择策略**（优先避免切换）：

1. 当前 PATH 环境的 Dart 版本已满足约束 → **不切换**，`needs_switch` 为 `false`
2. 当前不满足 → 从候选中筛选满足约束（≥ 下界 且 < 上界）的 SDK，取版本最低的，最大程度减少与插件预期环境的差异

### 6. 写入产物

将检测结果写入 `02-planning.json` 的 `sdk_environment` 字段：

```json
{
  "sdk_environment": {
    "needs_switch": false,
    "flutter_version": "3.22"
  }
}
```

需要切换时：

```json
{
  "sdk_environment": {
    "needs_switch": true,
    "switch_path": "/Users/xxx/flutter_ohos_3.35",
    "flutter_version": "3.35"
  }
}
```

`flutter_version` 为最终生效的 Flutter SDK 主版本号（无论是否切换都必须写入），供后续阶段依赖版本匹配使用。

**失败处理**：若所有候选 SDK 都不满足约束：
1. `needs_switch` 为 `true`，`switch_path` 不写入
2. 在 `risk_items` 中记录 blocker：`"sdk-paths.json 中所有 Flutter OHOS SDK 的 Dart 版本（列出版本号）均不满足插件要求（>=X.Y.Z <A.B.C），需要安装兼容版本"`
3. 终止当前阶段，输出明确错误信息

---

## B. 后续阶段：读取产物并切换

Coding、Testing、Device-verify 阶段在首步执行：

### 1. 读取 Planning 产物

读取 `.ohos-adaptation/02-planning.json` 的 `sdk_environment` 字段。

- 若 `needs_switch` 为 `false`：不做操作，使用当前 PATH 环境
- 若 `needs_switch` 为 `true` 且有 `switch_path`：执行步骤 2

**回退**：若 `02-planning.json` 不存在或无 `sdk_environment` 字段（独立运行场景），回退执行 A 部分完整检测流程。

### 2. 切换 PATH 并验证
```bash
# macOS / Linux
export PATH="<switch_path>/bin:$PATH"
```

```powershell
# Windows (PowerShell) - PATH 设置和验证命令须在同一条命令中执行。
$env:Path = "<switch_path>\bin;$env:Path"; dart --version; flutter --version 2>&1 | Select-Object -First 1
```

确认 Dart 版本满足插件 `environment.sdk` 约束。

---

## 首次使用配置

1. 复制 `.claude/skills/flutter-sdk-switch/sdk-paths.example.json` 为 `sdk-paths.json`
2. 填入本机 Flutter OHOS SDK 绝对路径
   - macOS / Linux：`/Users/xxx/flutter_ohos_3.22` 或 `/home/xxx/flutter_ohos`
   - Windows：`C:\\Users\\xxx\\flutter_ohos_3.22`（使用双反斜杠或正斜杠）
3. 排列顺序不影响选择结果（Skill 会自动选满足约束的最低版本）

## 硬性禁止

- **禁止**修改 `pubspec.yaml` 或 `example/pubspec.yaml` 的 `environment.sdk` 约束
- **禁止**降低任何依赖的版本约束（允许因 SDK 兼容性需要而提升至最小兼容版本，见 CLAUDE.md 规则 2）
- **禁止**将 git 依赖回退为 pub.dev 版本
- **禁止**删除或注释掉不兼容的依赖

这些修改会破坏插件功能完整性。正确做法是切换到兼容的 SDK 环境。
