# tool-example

本目录包含两个用于 **React Native 插件鸿蒙适配** 的辅助脚本：

- `generate-example.py`：基于 `example_auto` 模板生成/更新 Example 工程（用于测试本地鸿蒙化插件）
- `generate_library_turbo.py`：基于 codegen 生成的 TurboModule `Spec` 文件，生成 TurboModule 实现模板（方法体留空/抛错）
- `generate_library_fabric.py`：基于 codegen 生成的 Fabric 组件产物，生成 ArkTS 组件 stub + `GeneratedPackage.ts` + `ts.ts` 导出
- `generate_library_common.py`：`generate_library_turbo.py` / `generate_library_fabric.py` 的公共实现（步骤 2–6、9 与 codegen 辅助函数）

## Agent 执行约定（generate 脚本）

当 Agent 通过 Shell 等方式运行 **`generate_library_turbo.py`** 或 **`generate_library_fabric.py`**（含带 `npm install` / `npm run codegen` 的步骤）时：

- **必须等待子进程正常结束**（读到退出码），不要因「暂时无输出」或「看起来卡住」就中断。
- **最长可等待 20 分钟**；在未到该上限前，**不得提前放弃或终止**（除非进程已明确退出并报错）。
- 若环境对单次命令有默认超时，应将该次执行的超时设为 **≥ 1200 秒**，与上述 20 分钟一致。

## 文档索引

- `generate-example.py`：见 `README-generate-example.md`
- `generate_library_turbo.py`：见 `README-generate-turbo-library.md`

## 常见问题（通用）

### Windows 路径过长（MAX_PATH=259）

即使开启了 `LongPathsEnabled=1`，某些工具链仍可能报：

`hvigor ERROR: 00306001 ... path exceeds the maximum length: 259`

最稳妥的办法是缩短路径，例如使用 `subst`：

```bat
subst R: D:\code\flutter-library-workflow
cd /d R:\repos-rn\<module>\example_auto\harmony
hvigorw assembleHap --mode module -p product=default
```

