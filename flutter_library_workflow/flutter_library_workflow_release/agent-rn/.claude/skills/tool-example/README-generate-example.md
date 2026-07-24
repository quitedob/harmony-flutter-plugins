# generate-example.py

用于为 **React Native 鸿蒙适配库**生成/更新 `example_auto`（RN 工程 + OHOS 套壳）骨架，便于在本地验证插件功能。

## 用途

在插件仓库根目录（CWD）运行，自动完成 Example 工程骨架搭建与关键文件增量更新，减少手工改动导致的编译问题。

## 前置条件

- CWD 存在 `package.json`
- CWD 存在 `harmony/library`
- CWD 可访问 `.claude/skills/tool-example/example_auto` 模板工程

**Fabric 自定义组件**：库侧需已用 Fabric 脚手架生成 `GeneratedPackage` 与各 `components/*.ets`（`ts.ts` **只** export `GeneratedPackage`，**不能** re-export `.ets`）。脚本第 8 步根据 `components/*.ets`（及旧版 `ts.ts` 中可能残留的 components 路径）填写 `entry/.../pages/Index.ets`：组件 **import** 使用 **`包名/src/main/ets/components/组件名`**，以及 `arkTsComponentNames` 与 `buildCustomRNComponent`（见模板内 `// GEN:FABRIC_*` 占位注释）。

## 运行方式

在插件仓库根目录执行：

```bash
python .claude/skills/tool-example/generate-example.py
```

## 只执行指定步骤

脚本支持传入步骤号（1-10），不传参数默认执行全部步骤：

```bash
# 仅第 7 步：更新 PackageProvider.cpp（增量追加）
python .claude/skills/tool-example/generate-example.py 7

# 仅第 8 步：更新 RNPackagesFactory.ets（增量追加）+ Index.ets Fabric 注册（若库侧有 Fabric 组件）
python .claude/skills/tool-example/generate-example.py 8

# 仅第 9 步：检查/补全库根 scripts.prepare（无需已有 example_auto）
python .claude/skills/tool-example/generate-example.py 9

# 仅第 10 步：tsconfig exclude + tsconfig.build.json include（bob）
python .claude/skills/tool-example/generate-example.py 10

# 多步骤
python .claude/skills/tool-example/generate-example.py 5 6 7 8
```

> 若只跑 7/8，但本地还没有 `./example_auto`，需先跑步骤 1（或无参全流程）。

## 生成/更新内容（脚本产物）

脚本会在仓库根生成/更新：

- `./example_auto/`：从模板拷贝
- `example_auto/package.json`：添加对本地 `*.tgz` 的依赖（来自 npm `package.json` 的 name + version）
- `example_auto/harmony/library`：拷贝本仓库 `harmony/library`（会忽略 `oh_modules`）
- `example_auto/harmony/build-profile.json5`：注册 `library` 模块
- `example_auto/harmony/entry/oh-package.json5`：依赖 `library`（依赖 key 取自 `harmony/library/oh-package.json5` 的 `name`）
- `example_auto/harmony/entry/src/main/cpp/CMakeLists.txt`：追加目标库 `add_subdirectory` / `target_compile_options` / `target_link_libraries`
- `example_auto/harmony/entry/src/main/cpp/PackageProvider.cpp`：**增量更新**（保留模板已有包，只追加缺失的 `Package`）
- `example_auto/harmony/entry/src/main/ets/RNPackagesFactory.ets`：**增量更新**（保留模板已有包，只追加缺失的 `RNPackage`）
- `example_auto/harmony/entry/src/main/ets/pages/Index.ets`：若 `harmony/library` 中存在 Fabric 组件（见 `components/*.ets`），在 `// GEN:FABRIC_*` 占位处写入从 **`包名/src/main/ets/components/<Name>`** 的 `import`、`arkTsComponentNames` 与 `buildCustomRNComponent`；纯 Turbo 库则保持占位为空
- （可选）库根 `package.json`：步骤 9 在不存在 `scripts.prepare` 时写入 `"prepare": "bob build"`（已存在则不覆盖）
- 库根 `tsconfig.json`：步骤 10 合并 exclude（example_auto、harmony、lib 等）
- 库根 `tsconfig.build.json`：步骤 10 若文件存在且尚无 `include`，则写入源码目录 glob（来自 `package.json` 的 `react-native-builder-bob.source`，默认 `src/**/*`），避免 `bob build` 的 typescript 目标因子配置 `exclude` 覆盖继承项而仍扫描 `example_auto` 等目录

## 后续手工步骤（脚本不会自动执行）

脚本生成完成后，在 **库根目录**先打包库，再安装 example：

```bash
# 库根：构建并打 tgz（example_auto 依赖 file:../<name>-<version>.tgz）
npm run prepare
npm pack --ignore-scripts

cd example_auto
npm install --legacy-peer-deps

# 按需修改 example_auto/App.tsx 生成测试页面
npm run dev
```

