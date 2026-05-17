# generate_library_turbo.py

用于从 JS/TS TurboModule `Spec` 扫描 → 生成/更新鸿蒙侧 `harmony/library` 脚手架与实现模板（ETS/C++ generated 目录等），减少手工搭建成本。

## 用途

端到端辅助：从 JS/TS Spec（`TurboModuleRegistry.get(Enforcing)`）扫描 → 写 `package.json` 补齐 codegen 配置 → 拷贝 `harmony` 模板 →（可选）npm / codegen → 生成 ETS 侧 `*TurboModule.ts`、`TurboModulesFactory`、`ts.ts` 等。

## 前置条件

- CWD 为插件仓库根目录（存在 `package.json`）
- 已具备 TurboModule Spec（通常在 `src/`）

## Agent 执行约定

由 Agent 调用本脚本时（尤其执行步骤 4–6 涉及 `npm install`、`npm run codegen`）：

- **须等待脚本整次执行结束**并获取退出码；**最长等待 20 分钟**。
- **在未满 20 分钟且进程未退出前，不得提前终止等待**（不因长时间无日志输出而假定卡死并中断）。
- Shell/任务超时建议配置为 **≥ 1200 秒**。

`generate_library_fabric.py` 同样适用上述约定。

## 运行方式

不传参数 = 执行全部 1–10 步：

```bash
python .claude/skills/tool-example/generate_library_turbo.py
```

只执行若干步（例：仅 7、8）：

```bash
python .claude/skills/tool-example/generate_library_turbo.py 7 8
```

仅第 7 步时会自动先跑第 1 步以得到 `plan`（注册名与 specPaths）。预览：

```bash
python .claude/skills/tool-example/generate_library_turbo.py --dry-run 7
```

可选参数：

```bash
python .claude/skills/tool-example/generate_library_turbo.py --root .
python .claude/skills/tool-example/generate_library_turbo.py --ets-dir harmony/library/src/main/ets 7
```

## 步骤说明（位置参数）

| 步 | 说明 |
|----|------|
| 1 | 扫描 `<root>` 下 `.ts/.tsx`（递归；不进入以 `.` 开头的目录，且跳过 `android/harmony/ios/windows/macos/linux/node_modules/pods/build/dist/out/oh_modules`），收集 Turbo 注册名与 `specPaths` |
| 2 | 覆盖写入 `package.json.harmony`：固定 `alias=RNSpec`，并写入 `codegenConfig[0].version=1` + `specPaths`（来自第 1 步扫描结果） |
| 3 | 写入/覆盖 `package.json.scripts.codegen`：`react-native codegen-harmony --cpp-output-path ./harmony/library/src/main/cpp/generated --ets-output-path ./harmony/library/src/main/ets/generated` |
| 4 | `npm install` + 安装 `@react-native-oh/react-native-harmony@0.77.50` 与 `@react-native-oh/react-native-harmony-cli@0.77.50`（`-D` 写入 devDependencies；默认 `--legacy-peer-deps`） |
| 5 | 拷贝脚本同级的 `harmony/` 到项目根 |
| 6 | `npm run codegen`；若 `harmony/library/src/main/cpp/CMakeLists.txt` 被 codegen 删掉则自动从脚本模板恢复（已存在则不覆盖） |
| 7 | 生成/覆盖各 `*TurboModule.ts` 实现模板（方法体 `Not implemented`），写入到 `--ets-dir`（默认 `harmony/library/src/main/ets`） |
| 8 | 生成/覆盖 `{Base}TurboModulesFactory.ts`（包含 `{Base}Package`），写入到 `--ets-dir`（默认 `harmony/library/src/main/ets`） |
| 9 | 同步 `harmony/library/oh-package.json5` 的 `name` |
| 10 | 重写 `harmony/library/ts.ts` 导出 |

