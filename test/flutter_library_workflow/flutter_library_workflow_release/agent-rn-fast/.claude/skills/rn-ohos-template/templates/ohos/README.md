# {{NPM_NAME}} for HarmonyOS

本项目基于 [{{ORIG_NAME}}]({{ORIG_REPO_URL}}) 开发，为 React Native 鸿蒙（OpenHarmony）适配版本。

## 版本对应关系

| 鸿蒙适配包版本 | 原始库版本 | 支持 RN 版本 | Autolink | 编译 API 版本 |
| ------------ | ---------- | ------------ | -------- | ------------- |
| 见发布记录 | {{ORIG_VERSION}} | 0.72+ | 是/否 | API12+ |

## 安装

```bash
npm install {{NPM_NAME}}
```

## 使用

```tsx
{{USAGE_EXAMPLE}}
```

{{USAGE_NOTES}}

## Link

| 版本 | 是否支持 Autolink |
|------|------------------|
| 当前版本 | 是/否 |

如使用版本支持 Autolink 且工程已接入，可跳过手动配置。

<details>
<summary>Manual Link 配置</summary>

> **说明**：本模块需要同时在 C++ 侧和 ETS 侧注册 Package。

### 1. Overrides RN SDK

在工程根目录 `oh-package.json5` 添加：

```json
{
  "overrides": {
    "@rnoh/react-native-openharmony": "./react_native_openharmony"
  }
}
```

### 2. 引入原生端依赖

打开 `entry/oh-package.json5`，添加：

```json
"dependencies": {
  "{{NPM_NAME}}": "file:../../node_modules/{{NPM_NAME}}/harmony/{{SHORT_NAME}}.har"
}
```

执行 `ohpm install`。

### 3. 配置 CMakeLists

打开 `entry/src/main/cpp/CMakeLists.txt`，添加：

```cmake
set(OH_MODULES "${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules")

add_subdirectory("${OH_MODULES}/{{NPM_NAME}}/src/main/cpp" ./{{SHORT_NAME}})

target_link_libraries(rnoh_app PUBLIC {{SHORT_NAME}})
```

### 4. 注册 Package（C++ 侧）

打开 `entry/src/main/cpp/PackageProvider.cpp`，添加：

```cpp
#include "{{CAMEL_NAME}}Package.h"

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
    return {
        std::make_shared<{{CAMEL_NAME}}Package>(ctx),
    };
}
```

### 5. 注册 Package（ETS 侧）

打开 `entry/src/main/ets/RNPackagesFactory.ets`，添加：

```typescript
import { {{CAMEL_NAME}}Package } from '{{NPM_NAME}}/ts';

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    new {{CAMEL_NAME}}Package(ctx),
  ];
}
```

</details>

## 属性 / API

| API | 描述 | 参数 | 返回值 | HarmonyOS 支持 |
|-----|------|------|--------|----------------|
{{API_ROWS}}

{{API_NOTES}}

## 快速验证（运行 Example）

### 前置条件

| 依赖 | 版本要求 |
|------|----------|
| Node.js | >= 18 |
| DevEco Studio | 5.0+ / 6.0+ |
| HarmonyOS SDK | API 12+ |

### 运行步骤

**1. 克隆仓库**

```bash
git clone <仓库地址>
cd <仓库目录>
```

**2. 安装依赖并构建**

```bash
npm install --legacy-peer-deps
npm pack           # 生成 tgz 包（会自动触发 prepare 构建 JS 产物）
```

**3. 进入 example 目录，安装依赖**

```bash
cd example
npm install --legacy-peer-deps
```

**4. 生成 JS Bundle**

```bash
npm run dev
```

产物：`harmony/entry/src/main/resources/rawfile/bundle.harmony.js`

**5. 用 DevEco Studio 打开鸿蒙工程**

- 打开 DevEco Studio
- 选择 `example/harmony` 目录
- 等待 Sync 完成

**6. 编译并运行 HAP**

在 DevEco Studio 中点击运行按钮，将 HAP 安装到设备/模拟器。

> **注意**：Example 中已预置插件依赖和 Package 注册，无需手动配置 Link。

## 约束与限制

### 兼容性

- RNOH: 0.72+
- HarmonyOS SDK: API 12+
- DevEco Studio: 5.0+

## 遗留问题

无（或列出已知问题）

## 开源协议

本项目基于 [原始库协议](原始库 LICENSE 链接)，详见 [LICENSE](./LICENSE) 文件。