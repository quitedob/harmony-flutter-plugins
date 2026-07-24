# Flutter OHOS 在 Windows 上构建 HAP 包

## 环境要求

- Windows 11
- Flutter OHOS SDK (3.32.4-ohos-0.0.1)
- DevEco Studio
- OpenHarmony SDK
- Node.js
- 鸿蒙真机设备（用于签名）

## 重要前提：真机签名

⚠️ **关键步骤**：HAP 打包**必须先连接鸿蒙真机**进行签名配置，否则无法成功打包。

### 签名配置流程

1. **连接鸿蒙设备**
   ```bash
   hdc list targets
   ```

2. **DevEco 自动生成签名文件**
   - 首次连接设备时，DevEco Studio 会自动生成调试签名
   - 签名文件位置：`C:\Users\<username>\.ohos\config\`
   - 包含文件：
     - `*.cer` - 证书文件
     - `*.p12` - 密钥库文件
     - `*.p7b` - 配置文件

3. **验证签名配置**
   检查 `ohos/build-profile.json5` 中的 signingConfigs 部分是否已自动配置

## PATH 环境变量配置

### 方法一：系统环境变量（推荐）

在 Windows 系统环境变量中添加：
```
D:\deveco\DevEco Studio\sdk\default\openharmony\toolchains
D:\deveco\DevEco Studio\tools\ohpm\bin
D:\deveco\DevEco Studio\tools\hvigor\bin
D:\deveco\DevEco Studio\tools\node
```

### 方法二：临时 export（土办法）

如果 PATH 配置有问题，每次构建前手动 export：

```bash
export PATH="D:/deveco/DevEco Studio/sdk/default/openharmony/toolchains:$PATH"
export PATH="D:/deveco/DevEco Studio/tools/ohpm/bin:$PATH"
export PATH="D:/deveco/DevEco Studio/tools/hvigor/bin:$PATH"
export PATH="D:/deveco/DevEco Studio/tools/node:$PATH"
export NODE_HOME="D:/deveco/DevEco Studio/tools/node"
```

⚠️ **注意**：在 Git Bash 中使用正斜杠 `/`，不要使用 Windows 的反斜杠 `\`

## 创建项目

```bash
cd D:/flutter/output
flutter create --platforms ohos flutter_ohos_test
cd flutter_ohos_test
```

## 配置 Impeller 渲染

配置文件位置：`ohos/entry/src/main/resources/base/profile/buildinfo.json5`

```json5
{
  "string": [
    {
      "name": "enable_impeller",
      "value": "true"
    }
  ]
}
```

首次 `flutter run` 或 `flutter build` 后，配置文件会自动从 `base/profile` 目录迁移到 `rawfile` 目录。

## 构建 HAP 包

### 前提条件检查

1. **确认签名文件存在**
   ```bash
   ls -la C:/Users/$USERNAME/.ohos/config/
   ```
   应该看到 `.cer`、`.p12`、`.p7b` 文件

2. **确认工具链可访问**
   ```bash
   ohpm --version
   node --version
   ```

### 执行构建

```bash
# 设置环境变量（如果需要）
export NODE_HOME="D:/deveco/DevEco Studio/tools/node"

# 构建 Release HAP
flutter build hap --release
```

### 构建输出

成功后会生成：
```
✓ Built build/ohos/hap/entry-default-signed.hap (45MB)
```

HAP 文件位置：
- **主输出**：`build/ohos/hap/entry-default-signed.hap` (已签名，可安装)
- **副本**：`ohos/entry/build/default/outputs/default/entry-default-signed.hap`
- **未签名**：`ohos/entry/build/default/outputs/default/entry-default-unsigned.hap`

## 常见问题及解决方案

### 1. Hvigor 工作空间初始化失败

**错误信息**：
```
ENOENT: no such file C:\Users\...\project_caches\...\workspace\node_modules\@ohos\hvigor\bin\hvigor.js
```

**解决方案**：
创建符号链接到 DevEco 的 hvigor 包：

```bash
cd <project_root>
ln -s "D:/deveco/DevEco Studio/tools/hvigor/hvigor" hvigor
ln -s "D:/deveco/DevEco Studio/tools/hvigor/hvigor-ohos-plugin" hvigor-ohos-plugin
```

### 2. 批处理递归错误

**错误信息**：
```
BATCH RECURSION exceeds STACK limits
```

**原因**：PATH 中 hvigor 和 ohpm 路径重复或顺序问题

**解决方案**：
- 清理 PATH 中重复的路径
- 确保 ohpm 在 hvigor 之后
- 使用 `export` 临时设置正确的 PATH

### 3. @ohos/flutter_ohos 模块找不到

**错误信息**：
```
Cannot find module '@ohos/flutter_ohos'
```

**解决方案**：
手动安装依赖：
```bash
cd ohos
ohpm install
cd entry
ohpm install
```

### 4. 没有签名配置导致构建失败

**现象**：构建卡在 ArkTS 编译阶段失败

**根本原因**：未连接真机，没有生成签名文件

**解决方案**：
1. 连接鸿蒙真机到电脑
2. 使用 DevEco Studio 打开项目
3. 让 DevEco 自动生成签名配置
4. 然后再使用命令行构建

### 5. Git Bash 批处理递归（BATCH RECURSION）

**错误信息**：
```
******  B A T C H   R E C U R S I O N  exceeds STACK limits ******
> hvigor ERROR: 00306053 Specification Limit Violation
Error Message: ohpm install failed.
```

**原因**：Git Bash 下 `flutter build hap` 内部 ohpm install 触发 cmd 批处理递归。

**解决方案**：**推荐直接在 DevEco Studio 内构建**（`Build > Build Hap(s)`），或使用 DevEco 内置 Terminal。避免在 Git Bash 中执行 `flutter build hap`。

### 6. 新版 Flutter OHOS 插件结构（module 格式）

新版插件 `ohos/` 目录直接作为 HAR module（扁平结构，非旧版嵌套 project）：
- `hvigorfile.ts` → 仅一行：`export { harTasks } from '@ohos/hvigor-ohos-plugin';`
- 源码在 `ohos/src/main/ets/...`
- 参考：`agent-flutter/.claude/skills/flutter-docs-lookup/flutter-docs/09_specifications/update-flutter-plugin-structure.md`

### 7. @ohos/flutter_ohos 新版接口变更

| 变更 | 旧 | 新 |
|------|-----|-----|
| FlutterPlugin | 无 `getUniqueClassName` | 必须实现 |
| MethodCallHandler | `MethodChannel.MethodCallHandler` | 独立 import |
| applyChanges | `applyChanges(uri: string)` | `applyChanges(request: MediaChangeRequest)` |
| 创建媒体 | `createAsset()` + `fileIo` 手动复制 | `MediaAssetChangeRequest.createImageAssetRequest(ctx, sandboxPath)` |

### 8. user_grant 权限配置

`ohos.permission.WRITE_IMAGEVIDEO` 等 user_grant 权限**必须**含 `reason` 和 `usedScene`：
```json5
{
  "name": "ohos.permission.WRITE_IMAGEVIDEO",
  "reason": "$string:write_media_permission_reason",
  "usedScene": { "abilities": ["EntryAbility"], "when": "inuse" }
}
```

## 安装到设备

```bash
# 查看连接的设备
hdc list targets

# 安装 HAP
hdc install build/ohos/hap/entry-default-signed.hap

# 卸载应用（如果需要）
hdc uninstall com.example.flutter_ohos_test
```

## 工具版本信息

- Flutter: 3.32.4-ohos-0.0.1
- Dart: 3.8.1
- OpenHarmony SDK: API 24 (6.1.1)
- Node.js: v24.11.0
- Ohpm: 6.1.2.285
- Hvigor: 6.24.3

## 参考链接

- Flutter OHOS 官方仓库：https://gitcode.com/CPF-Flutter/flutter_flutter
- OpenHarmony 文档：https://docs.openharmony.cn
- DevEco Studio 下载：https://developer.harmonyos.com/deveco-studio

---

**最后更新**：2026-07-22
**测试环境**：Windows 11 Home China 10.0.26200, MateBook Pro
