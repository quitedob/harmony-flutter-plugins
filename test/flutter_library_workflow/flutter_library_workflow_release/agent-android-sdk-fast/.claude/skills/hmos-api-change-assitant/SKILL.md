---
name: hmos-api-change-assitant
description: 扫描 HarmonyOS 工程在两个 SDK 版本之间的 API 变更，输出受影响的接口签名、代码位置和官方指导文档链接
---

# hmos-api-change-assitant

## Skill 职责

调用 DevEco Studio 内置的 `ApiScanUtil` 接口，在命令行输出两个 HarmonyOS SDK 版本之间的 **API 变更清单** 以及 **受影响代码位置**。输出固定 6 列：ApiDefinition / Language / Changed in SDK Version / Affected Versions / CodeLocation / Guidance link。

## 触发场景

- 主 skill 评估插件在不同 HarmonyOS API Level 之间的兼容性时调用
- 需要快速了解某工程在 SDK 升级后哪些代码受影响
- 只生成变更清单（不扫代码）或同时扫描工程代码定位

## 输入参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `project` | 否 | HarmonyOS 工程路径。缺省时只输出变更清单，不扫描代码位置 |
| `start` | 是 | 起始版本，支持完整版本名或 API Level 数字（如 `14` 或 `HarmonyOS_5.1.0(18)_Release`） |
| `end` | 是 | 目标版本，支持完整版本名或 API Level 数字（如 `26` 或 `HarmonyOS_NEXT_6.0.0(20)_Beta3`） |
| `out` | 否 | 输出目录，默认 `api-change-out` |
| `no-scan` | 否 | 只输出变更清单，不执行代码扫描（即使指定了 project） |

## 环境要求

- **DevEco Studio** 已安装（默认路径检测，可通过环境变量覆盖）：
  - macOS: `DEVECO_HOME=/Applications/DevEco-Studio.app/Contents`
  - Windows: 自动检测 `D:\DevEcoStudio` 或 `C:\Program Files\Huawei\DevEco Studio` 或 `D:\Program Files\Huawei\DevEco Studio`，也可设 `DEV_DIR` 或 `TOOL_HOME`
- 脚本使用 DevEco 自带的 JBR 编译运行 Java，无需额外安装 JDK
- classpath 由 DevEco 的 `lib/*` + `plugins/*/lib/*` 组成

## 执行步骤

### 1. 检查 DevEco 环境

确认 DevEco Studio 安装目录存在且 JBR 可用：

```bash
# macOS / Linux
export DEVECO_HOME="${DEVECO_HOME:-/Applications/DevEco-Studio.app/Contents}"
[ -x "$DEVECO_HOME/jbr/Contents/Home/bin/java" ] && echo "OK"

# Windows (PowerShell)
$devDir = $env:DEV_DIR
if (-not $devDir) {
    foreach ($p in "D:\DevEcoStudio","C:\Program Files\Huawei\DevEco Studio") {
        if (Test-Path "$p\jbr\bin\java.exe") { $devDir = $p; break }
    }
}
```

### 2. 查看合法版本列表

```bash
# macOS
./script/api-change-scan.sh --list-versions

# Windows
.\script\api-change-scan_windows.bat --list-versions
```

版本串须完整匹配 `ApiScanUtil.VERSION_LIST`，如 `HarmonyOS_5.1.0(18)_Release` / `HarmonyOS_6.0.0(20)_Beta3`。Windows 版也支持直接传 API Level 数字（如 `--start 14 --end 26`）。

### 3. 扫描工程

```bash
# macOS
./script/api-change-scan.sh \
  --project /path/to/harmony_project \
  --start "HarmonyOS_5.1.0(18)_Release" \
  --end   "HarmonyOS_6.0.0(20)_Beta3" \
  --out   /tmp/acs

# Windows
.\script\api-change-scan_windows.bat ^
  --project D:\path\to\harmony_project ^
  --start 18 --end 20 ^
  --out D:\tmp\acs
```

### 4. 仅生成变更清单（不扫代码）

```bash
./script/api-change-scan.sh \
  --start "HarmonyOS_5.1.0(18)_Release" \
  --end   "HarmonyOS_6.0.0(20)_Beta3" \
  --no-scan --out /tmp/acs
```

### 5. 解读输出

输出目录包含：

| 文件 | 内容 |
|------|------|
| `changeList.json` | 完整变更清单（affectedApis + interfaceChanges），权威数据 |
| `result.csv` | 6 列结果（主交付物） |
| `result.json` | 同内容的 JSON 数组 |
| `scan/`、`scan.log` | Node 扫描器配置/日志（排查用） |

## 输出标准

### 固定 6 列 schema

| 列 | 说明 |
|----|------|
| `ApiDefinition` | 接口签名（如 `height?: string \| number`） |
| `Language` | `ArkTS` / `TypeScript` / `C` 等 |
| `Changed in SDK Version` | 发生变更的 SDK 版本（如 `6.0.0(20) Beta1`） |
| `Affected Versions` | `ALL`（非版本隔离）或具体 API level（如 `20`） |
| `CodeLocation` | 命中的 `文件绝对路径:行号` |
| `Guidance link` | 官方变更文档链接（锚点定位到该变更 ID） |

### 终端输出示例

```
[ArkTS] height?: string | number  (6.0.0(20) Beta1, affected: 20)
    -> /path/to/project/entry/src/main/ets/pages/Index.ets:42
    🔗 https://developer.huawei.com/consumer/cn/doc/harmonyos-releases/changelogs-for-all-apps-6001/#section383
```

## 扫描策略

1. **优先 Node 扫描器**：调用 DevEco 内置 `arkanalyzer-apiscan` 做 AST 级别扫描
2. **根目录优先**：先扫项目根（通常覆盖所有模块），失败再逐模块兜底
3. **grep 回退**：Node 扫描器不可用时（如 SDK 不全、未同步），自动回退到基于变更清单 API 名的 grep 近似定位
4. **自动去重**：按全部 6 列去重，保留顺序

### 关键注意事项

- Node 扫描器**必须**传 `--tmpPath=<可写目录>`，否则 `path.join(undefined)` 崩溃
- Node 扫描器 CWD 必须是 `index.js` 所在目录（工具目录），否则 worker 线程找不到 `ApiScan.worker.ts`
- 脚本已内置以上两点处理（给每个目标建独立 tmpPath、`ProcessBuilder.directory` 设为工具目录）

## 已知限制

- 扫描覆盖 ArkTS/TS（`.ets/.ts/.d.ets/.d.ts`），C++/Native 的扫描分支未覆盖
- `ApiScanUtil.scanData` 全量接口内部依赖 IDE 运行时，本工具拆成 `getAllApiChanges` + Node 扫描器 + `getApiChangeResult` 三段直调，效果等价
- 版本串须完整匹配 `VERSION_LIST`，先 `--list-versions` 查看合法取值

## 资源

### script/

| 文件 | 说明 |
|------|------|
| `ApiChangeCli.java` | 跨平台 (macOS/Linux/Windows) Java 入口：直调 `com.huawei.deveco.programanalysis.apiscan.ApiScanUtil`，支持 API Level 数字映射与括号修复 |
| `api-change-scan.sh` | macOS/Linux shell 包装：自编译 + 转发参数 |
| `api-change-scan_windows.bat` | Windows bat 包装：自动检测 DevEco、自编译 + 转发参数 |
| `README.md` | 详细用法文档 |
