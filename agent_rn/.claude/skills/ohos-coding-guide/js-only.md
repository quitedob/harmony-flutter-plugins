# 纯 JS/TS 模块鸿蒙适配

## 适用条件

- `target_module_types = ["js-only"]`
- 模块为纯 JavaScript/TypeScript 实现，无原生代码
- 无 TurboModule/Fabric Spec 文件

## 前置准备

请先阅读并执行通用步骤：`read_file` → `.claude/skills/ohos-coding-guide/common-setup-steps.md`。

**js-only 模式差异说明**：

| 步骤 | 原生模块 | js-only 模块 |
|------|----------|--------------|
| 1) create | 拷贝 ohos_skeleton 模板 | 拷贝 ohos_skeleton_js 模板 + 自动从原仓库拷贝源码到 ohos/src/ |
| 2) 清理 src | 需手动删除 android/ios/web 目录 | **自动完成**（拷贝时保留代码文件 + 静态资源） |
| 3) init | 并行执行（ohos install + example install + codegen） | **顺序执行**：ohos install → npm pack → example install tgz |
| example 依赖 | `file:../harmony/library.har` | `file:../{tgz}`（使用 tgz 可自动处理 peerDependencies） |

**脚本拷贝范围**：
- 代码文件：`.ts` / `.tsx` / `.js` / `.jsx`
- 静态资源：`.png` / `.jpg` / `.gif` / `.svg` / `.webp` / `.json`
- **根目录入口**：如 `index.js` 在根目录而非 `src/` 下，脚本会自动拷贝到 `ohos/src/`

> ⚠️ **注意**：若编译时报静态资源缺失，请检查脚本是否正确拷贝，必要时手动补充。

核心原则：**先用脚本生成脚手架并安装依赖**，然后你只需要做两件事：**处理平台判断代码**、**按需处理 npm 依赖**。其余由脚本负责。

---

## 1) 平台判断兼容（按需）

检查代码中的平台判断逻辑，添加 `harmony` 支持。

**检测方式**：读取 `01-analysis.json` 的 `platform_checks` 字段，定位需要修改的文件。

**修改模式**：

```tsx
import { Platform } from 'react-native';

// 修改前：缺少 harmony 分支
if (Platform.OS === 'android') {
  // Android 逻辑
} else if (Platform.OS === 'ios') {
  // iOS 逻辑
}

// 修改后：添加 harmony 分支
if (Platform.OS === 'android') {
  // Android 逻辑
} else if (Platform.OS === 'ios') {
  // iOS 逻辑
} else if (Platform.OS === 'harmony') {
  // Harmony 逻辑（通常与 Android 逻辑相近）
}

// 或使用 Platform.select
const config = Platform.select({
  android: { /* ... */ },
  ios: { /* ... */ },
  harmony: { /* ... */ },
  default: { /* ... */ },
});
```

**禁止使用排除法判断 harmony**：
```tsx
// ❌ 错误
if (Platform.OS !== 'android' && Platform.OS !== 'ios') {
  // 这里可能是 harmony，也可能是 web/windows...
}

// ✅ 正确
if (Platform.OS === 'harmony') {
  // 明确判断 harmony
}
```

---

## 2) 处理 npm 依赖（按需）

根据 `02-planning.json` 的 `rn_dependency_mapping` 处理 npm 依赖：

| 依赖状态 | 处理方式 | 修改位置 |
|----------|----------|----------|
| `adapted` | 替换为鸿蒙版本 | `ohos/package.json` 或 `ohos/example/package.json` |
| `not_needed` | 保持原 npm 包 | 无需修改 |
| `not_adapted` + 阻塞 | 按风险方案处理（try-catch / 平台跳过） | JS/TS 代码 |

**替换已适配依赖**：

```json
// ohos/package.json 或 ohos/example/package.json
{
  "dependencies": {
    "@react-native-community/async-storage": "@react-native-oh-tpl/async-storage@1.12.0-0.1.0"
  }
}
```

**处理未适配依赖**：

| 方案 | 适用场景 | 示例 |
|------|----------|------|
| try-catch 包裹 | 需保留功能但有回退 | 调用返回默认值 |
| 平台判断跳过 | 功能可选 | `if (Platform.OS !== 'harmony') await call()` |
| 条件导入 | 模块整体不可用 | `if (Platform.OS !== 'harmony') require('xxx')` |

**依赖检查命令**：

```bash
npm ls --all 2>/dev/null | head -50
```

---

## 3) 测试验证

直接执行 HAP 构建验证：

```bash
python ./.claude/skills/tool-ohos-plugin-repo/tool/rn.py build hap
```

**js-only 模式的 build hap 流程**：
1. `npm pack` 生成 tgz
2. 安装 tgz 到 example
3. `npm run dev` 生成 bundle
4. `ohpm install` 安装 ohos 依赖
5. `hvigorw assembleHap` 构建 HAP

**编译失败时**：
- 根据错误日志修改 JS/TS 代码
- 重新执行 `rn.py build hap`

**⚠️ 重要强调**：
- **js-only 模块无 HAR 构建**，不需要执行 `rn.py build har`
- **无原生代码注入**，不会修改 CMakeLists.txt/PackageProvider.cpp/RNPackagesFactory.ets
- 直接使用 `rn.py build hap` 进行验证

---

## 4) 注意事项

- **无原生工程**：js-only 模块没有 `ohos/harmony/library/` 目录
- **无 HAR 构建**：不需要执行 `rn.py build har`
- **源码目录**：`ohos/src/` 包含从原仓库拷贝的 JS/TS 源码（保持原有目录结构）
- **harmony.alias 配置**：js-only 模块必须在 `ohos/package.json` 中添加 `"harmony": { "alias": "original-package-name" }`，否则 Metro bundler 无法将原始包名的 import 重定向到鸿蒙化包名
- **产物输出**：`03-coding-library.json` 中：
  - `build_status: "pass"`（npm prepare 成功即通过）
  - `engineering_setup.harmony_directory: null`
  - `files_created`: 记录创建的文件
  - `files_modified`: 记录修改的平台判断文件
- **package.json 入口**：
  - 有 TS：入口指向 `./dist/commonjs/{entry}.js`（bob 编译产物）
  - 纯 JS：入口指向 `./src/{entry}.js`（源码直出）

---

## 5) 常见问题

### 5.1 Metro bundler 无法找到模块

**错误**：`Unable to resolve module react-native-xxx`

**原因**：`ohos/package.json` 缺少 `harmony.alias` 配置

**解决**：添加 `"harmony": { "alias": "react-native-xxx" }`（使用原始包名）

### 5.2 入口文件不存在

**错误**：`main module field that could not be resolved`

**原因**：根目录入口文件（如 `index.js`）未拷贝到 `ohos/src/`

**解决**：手动创建入口文件，或检查脚本是否正确执行

### 5.3 静态资源缺失

**错误**：`Unable to resolve module ./image.png`

**原因**：图片等静态资源未拷贝到 `ohos/src/`

**解决**：手动拷贝静态资源文件，保持原有相对路径