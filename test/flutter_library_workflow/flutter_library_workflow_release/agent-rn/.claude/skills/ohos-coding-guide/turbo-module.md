# ArkTS TurboModule 鸿蒙适配

**前置**：本次会话已完成 `create`、验证（`verify-migration` 或 `verify-non-migration`）、`init`（见 `SKILL.md`）。本文件只覆盖**实现子步骤**；`rn.py build har` 由 `SKILL.md` 步骤 6 统一执行；`03` 产物由步骤 7 写入。

## 数据来源

从 `.rn-ohos-adaptation/02-planning.json` 读取：
- `ohos_api_mapping`、`permission_mapping`、`native_dependency_mapping`、`rn_dependency_mapping`、`target_module_types`

## 核心原则

脚手架、依赖安装、codegen 骨架**已完成**。

**你的任务**：
1. 实现 ETS TurboModule（替换 `Not implemented` / `throw new Error('Not implemented')`）
2. 按需添加 ohpm / npm 依赖
3. 按需添加权限

**禁止**：`rn.py create`、`rn.py init`；修改仓库根目录 `src/`；手工改 Example/Entry 集成。

## 编码前（必做）

1. `read_file` → `library-fill-implementation.md`
2. `skill({ name: "arkts-rules" })`
3. 若有 `user_grant` 权限 → `permission-request.md`

## 1) 实现 ETS TurboModule（必做）

路径：`ohos/harmony/{short_name}/src/main/ets/*TurboModule.ts`

**`{short_name}`**：来自 `ohos/package.json` 的 `harmony.autolinking.ohPackageName`，或 `ls ohos/harmony/` 下除 `entry` 外的目录名。**不要**写死 `library`。

步骤：
1. 打开 `*TurboModule.ts` 实现文件
2. 读 Spec：`ohos/harmony/{short_name}/src/main/ets/generated/turboModules/{Name}.ts`
3. 按 `ohos_api_mapping` 查鸿蒙 API（`sub-doc-search` → `harmonyos-sdk-api-lookup`）
4. **识别假实现模板**：若方法体为以下任一形式，视为空壳模板，必须全部替换为真实 API 调用：
   - 抛出未实现错误：`throw new Error('Not implemented')`、`throw new Error('未实现')`
   - 仅日志+占位返回：`console.log/hilog` 后 `return undefined / null / {}`
   - 空方法体或仅有注释 "TODO"
   - 方法体内无任何鸿蒙系统API、三方库API或RNOH框架API调用
5. 实现全部接口方法。若某方法暂时无法实现，必须在 `03-coding-library.json` 的 `not_implemented` 字段明确记录，代码中改为返回约定错误对象（如 `{ error: 'Feature not available on harmony' }`），而非抛异常。

## 2) 添加依赖（按需）

### 2.1 原生（ohpm）

修改 `ohos/harmony/{short_name}/oh-package.json5`，加入 `native_dependency_mapping` 中需要的包。

### 2.2 RN 插件（npm）

| 依赖状态 | 处理 | 位置 |
|----------|------|------|
| `adapted` | 换鸿蒙版本 | `ohos/package.json` 或 `ohos/example/package.json` |
| `not_needed` | 保持 | — |
| `not_adapted` + 阻塞 | try-catch / 平台跳过 | JS/ETS |

## 3) 添加权限（按需）

修改 `ohos/harmony/{short_name}/src/main/module.json5`，按 `permission_mapping` 补 `requestPermissions`；`user_grant` 须带 `reason`。实现规则与代码模板详见 `permission-request.md`。

## 4) 编译（由 SKILL 步骤 6 执行）

```bash
python ./.claude/skills/tool-ohos-plugin-repo/tool/rn.py build har
```

- **只能**用上述命令构建 HAR，禁止直接 `hvigorw`
- 失败：**以本次命令终端输出**定位错误，按 `compile-fix-har.md` 修错后重跑，直至 exit 0

## 注意事项

- `ohos/` 是鸿蒙化包，**不需要**在 `ohos/src/` 加 `Platform.OS === 'harmony'`
- 实现信息记入上下文，供步骤 7 写 `03-coding-library.json` 时汇总
- **ETS 方法参数使用 `Record<string, Object>`**：接收 JS 对象时，参数类型不要用自定义 class，否则 JSI 桥接无法识别，方法会被跳过为 `undefined`。
- **C++ Codegen 必须完成（否则运行时白屏）**：即使是纯 ETS 实现的 TurboModule，JS 端 `TurboModuleRegistry.getEnforcing()` 也会先经 C++ `TurboModuleProvider` 查找。若脚手架未走 codegen 流程（`generated/*.cpp` 不存在），**必须**按 `SKILL.md` 步骤 5.1.1 的模板手动创建 C++ 代理文件（`Base*Package.h` + `*Module.h/.cpp` + `dummy.cpp`）。C++ 的 `createTurboModuleFactoryDelegate()` 必须返回实际的 Module 子类（而非基类 `ArkTSTurboModule`），`methodMap_` 必须注册所有 ETS 端公开方法。
- **TurboModule → JS 事件通信**：ArkTS 侧通过 `this.ctx.rnInstance.emitDeviceEvent(name, payload)` 向 JS 层发送事件，JS 侧通过 `DeviceEventEmitter.addListener()` 监听。**不存在 `subscribeToDeviceEvent`**。若需在 ArkTS 层内不同对象间通信（如 TurboModule 与 Helper），使用 `@kit.BasicServicesKit` 的 `emitter.on()` / `emitter.emit()`。
> **TurboModule 特有陷阱**：`emitDeviceEvent` 的 payload 必须是对象或数组，禁止裸标量。若 JS 侧历史代码以数组语义消费（如 `.map()`），即使单条结果也必须包装为 `{ value: [result] }`。

---

## 实现后：返回主流程

实现完成后，**回到 `SKILL.md` 主流程**，完成所有质检步骤（跨边界合约自查、行为基线对照、Codegen 完整性检查）后再编译。
