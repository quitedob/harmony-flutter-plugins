# Monorepo 模块鸿蒙适配

## 适用条件

- 仓库中包含多个 npm 包/模块
- 包之间存在 workspace 依赖关系
- 使用 Yarn workspaces、Lerna 或其他 monorepo 工具管理

---

## 第一部分：工程配置

### 拓扑分析

1. 扫描仓库中所有 `package.json` 文件
2. 构建依赖关系图（特别是 workspace 依赖）
3. 确定适配顺序（被依赖的包先适配）

**常见 Monorepo 结构**：

```
{repo_root}/
├── packages/
│   ├── {module_name}/                     # 主包
│   ├── {module_name}-utils/               # 工具包
│   └── {module_name}-native/              # 原生实现包
├── example/                                # 示例工程
├── lerna.json                              # Lerna 配置（如有）
├── package.json                            # 根 package.json
└── yarn.lock / package-lock.json
```

### 逐包分析

按拓扑顺序，对每个包判断类型：
- **纯 JS 包**：无需 harmony 目录，参考 `js-only.md`
- **TurboModule 包**：创建 `ohos/harmony/library`，参考 `turbo-module.md`
- **Fabric 组件包**：创建 `ohos/harmony/library`，参考 `fabric-component.md`
- **C++ 模块包**：创建 `ohos/harmony/library` + cpp，参考 `cpp-turbo-module.md`

### 依赖协调

所有包之间的依赖必须正确：

```json
{
  "dependencies": {
    "{module_name}-utils": "workspace:*",
    "{module_name}-native": "workspace:*"
  }
}
```

**注意**：修改任一包的 `package.json` 后，需要重新 `npm install` 或 `yarn` 刷新依赖。

---

## 第二部分：编码实现

### 适配顺序

严格按照依赖拓扑排序：

1. **底层工具包**（纯 JS）— 通常只需添加平台判断
2. **原生实现包**（TurboModule/Fabric）— 核心编码工作
3. **主包** — 确认导出和平台兼容

### 编译顺序

逐包处理，确保每一级依赖编译通过后再处理上层：

```bash
# 1. 底层纯 JS 包
cd packages/utils && npm install

# 2. 原生实现包（核心编译目标）
cd ../native
# 统一使用 tool-ohos-plugin-repo 生成/更新 ohos 子包与 library 脚手架
python .claude/skills/tool-ohos-plugin-repo/tool/apply_ohos_skeleton.py --force
python .claude/skills/tool-ohos-plugin-repo/tool/generate_library_turbo.py   # 或 generate_library_fabric.py
# 编译验证在 testing 阶段执行（Example：ohos/example）

# 3. 主包
cd ../../packages/main && npm install
```

### 多模块中的 TurboModule 名称

Monorepo 中可能有多个 TurboModule，**每个模块名都必须与 JS Spec 声明一致**。

查找所有模块定义的方法：
- 在 Spec 文件中搜索 `TurboModuleRegistry.get('NAME')`
- 在现有的 Android/iOS 实现中搜索模块注册名
- 确保 harmony 实现中 Package 注册的名称完全相同

### 处理共享代码包

部分 Monorepo 有共享的工具包：
- 纯 JS → 按 `js-only.md` 处理
- 含平台判断 → 添加 `Platform.OS === 'harmony'` 分支
- 含原生代码 → 需要创建 harmony 目录

---

## 第三部分：常见编译错误与修复

### 1. `Cannot resolve module 'xxx'`（依赖解析失败）

**原因**：workspace 依赖路径不正确。

**修复**：
- 检查 `package.json` 中的 workspace 依赖配置
- 运行 `npm install` 或 `yarn` 重新链接依赖

### 2. 上游包修改后下游包编译失败

**原因**：修改了共享包的接口但依赖包未同步更新。

**修复**：
- 从被修改的包开始，按拓扑顺序重新安装依赖
- 确保所有包的接口类型匹配

### 3. Codegen 生成不完整

**原因**：多个包的 Spec 文件未全部被 Codegen 扫描。

**修复**：
- 确认 `package.json` 的 `harmony.codegenConfig.specPaths` 包含所有 Spec 目录
- 或在主工程中统一运行 Codegen

### 4. 多包中 TurboModule 名称冲突

**原因**：不同包注册了相同的 TurboModule 名称。

**修复**：
- 检查所有包的 `TurboModuleRegistry.get('NAME')` 确保名称唯一
- 或使用包名作为前缀区分

### 5. yarn/npm workspace 依赖 harmony 包失败

**原因**：workspace 工具不识别 harmony 相关的依赖。

**修复**：
- 在 harmony 包目录手动 `npm install`
- 或将 harmony 包排除出 workspace 管理
