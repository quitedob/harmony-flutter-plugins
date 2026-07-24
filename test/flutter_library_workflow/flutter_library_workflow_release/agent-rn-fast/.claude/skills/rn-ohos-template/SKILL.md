---
name: rn-ohos-template
description: React Native → HarmonyOS 适配的静态工程模板 + 确定性 CLI（rnohos.py）。脚手架/codegen/构建/自检这些确定性机械动作由 rnohos.py 一键完成；Spec/ETS/C++/App.tsx 等实现代码由你（agent）编写。当需要搭 ohos/ 脚手架、跑 codegen、构建 HAR/HAP 时使用。触发：ohos 脚手架、rnohos、scaffold、codegen、build har、build hap、占位符、HAR 构建。
---

# rn-ohos-template

RN → HarmonyOS 适配的**静态模板 + 确定性 CLI**。职责切分清楚：

| 谁 | 负责 | 为什么 |
|----|------|--------|
| **`rnohos.py`（确定性脚本）** | 派生名字、拷模板、替占位符、注 autolinking、codegen、HAR/HAP 构建序列、构建前自检 | 这些是给定(包名+类型)**只有唯一正确答案**的机械动作——脚本保证一致性、可复现、零 token、不会替漏占位符导致白屏 |
| **你（agent）** | 写 Spec（旧架构先转新）、ETS/C++ TurboModule/Fabric 实现、`Index.ets` 导出、`App.tsx`、修编译错 | 这些要读源码 + 判断，是强模型该发挥的地方 |

> 脚手架**不要手动 cp+替占位符**——交给 `rnohos.py scaffold`，它一次算好名字并全工程一致替换。你专注写实现。

## 四个命令（在插件仓库根 / CWD 执行）

**先定位 `rnohos.py` 再调用，不要写死路径**（本节是定位与 junction 的唯一权威说明，02/03 prompt 引用这里）：两种部署形态位置不同——Claude Code 经 `inject-skills` 注入后在本库 `.claude/skills/rn-ohos-template/`；harmonybot/opencode 不注入，在其自带扩展 skill 目录。`rnohos.py` 靠 `__file__` 自定位模板，从任意绝对路径调用均可。每个子 agent 各自先跑定位段（子 agent 间不共享 shell，都要跑一次），之后一律 `python "$RNOHOS" …`：

```bash
RNOHOS=$(ls .claude/skills/rn-ohos-template/rnohos.py 2>/dev/null \
      || ls ~/.vscode/extensions/*/resources/opencode/plugin/hmos-library-adapter-fast/shared/skills/rn-ohos-template/rnohos.py 2>/dev/null | head -1)
[ -z "$RNOHOS" ] && { echo "未找到 rnohos.py（既无 .claude/skills/ 注入，也无 harmonybot 扩展），停止并报告环境"; exit 1; }
python "$RNOHOS" scaffold --type <turbo|fabric|cpp|js-only> [--force]
python "$RNOHOS" codegen          # 官方 codegen-harmony → generated/
python "$RNOHOS" check            # 构建前只读自检
python "$RNOHOS" build har        # 唯一允许的 HAR 构建
python "$RNOHOS" build hap        # pack+install+bundle+assembleHap（前置 check）
python "$RNOHOS" clean            # 删 ohos 全部内容（含 junction 真实短目录 + har_wrapper），项目重置/迁移时用
python "$RNOHOS" check-readme     # 校验 ohos/README.md 占位符已填完（validation 填 README 后收尾用，不进 build）
```

> **`build hap` 耗时长，调用务必给足超时**：整条 pack+install+bundle+assembleHap 约 **3-5 分钟**。用 bash 工具调用时 **`timeout` 参数至少 `600000`（ms）**——默认 120s 会在 npm/ohpm install 阶段把整条 python 进程 kill 掉，留下半截日志、无 assembleHap 输出，极易被误判成"环境/SDK 问题"。`rnohos.py` 内部对单步已设 1200s 挂死保护（超时会明确报"命令超时"而非静默），但**外层 bash 工具超时是另一层、必须由调用方给够**。`codegen` / `build har` 同理偏长，也建议给 ≥300s。

> **（仅 Windows）短路径 junction 是自动的、别去"修"**：scaffold 时 `rnohos.py` 把 `ohos/` 真实内容物理放到短目录 `<drive>:\rn\<N>`，项目 `ohos/` 作 junction 指过去（`ohos/ -> <drive>:\rn\<N>`）；har_wrapper 另放 `<drive>:\rnb\<short>\`。构建 cwd 用 `realpath(ohos/...)`（解析过 junction 的真实短路径），既短（解 ninja MAX_PATH 260）又让 hvigor `realpath(p)===p` 通过（不报 PATH_NOT_FOUND 00303149）。日志里 `<drive>:\rn\<N>` / `<drive>:\rnb\...` 是真实短目录、不是 bug（见仓库根 `.rnohos-junction.json`）；HAR/HAP 产物仍回写 `ohos/`。不要删 junction / 改 cwd / 当环境问题中断。重置用 `rnohos.py clean`。

| 命令 | 做什么 | 产物 |
|------|--------|------|
| `scaffold` | 从 `package.json` 派生 `short`/`camel`/`ohos_name`；按 type 拷模板进 `ohos/`（`harmony/{short}`、`example`、`.rn-build/har_wrapper`）；替 `{{SHORT_NAME}}/{{CAMEL_NAME}}/{{NPM_NAME}}`；填 `ohos/package.json`(name/alias/version/autolinking/codegen-lib)；填 `ohos/README.md` 基础信息(包名/原库名/链接/版本，语义占位符留给 validation)；写 `{Camel}Package.h`；拷 `src/`；幂等追加 `oh_modules/`/`.ohpm/`/`.hvigor/` 进仓库根 `.gitignore`（赶在首次 build 生成缓存前）。打印算好的名字——**请在实现和报告里复用**。 | `ohos/` 全套骨架 |
| `codegen` | 装 harmony-cli + 跑官方 `react-native codegen-harmony` | `harmony/{short}/src/main/{cpp,ets}/generated/` |
| `check` | 只读自检：`file:` 依赖真实存在 / `RNOHPackagesFactory` 非空注册 / autolinking 非空 | 退出码 0/1 |
| `check-readme` | 校验 `ohos/README.md`：无残留 `{{...}}` 占位符、无 `huawei` 字样（validation 阶段填完 README 后收尾自检，**不进 build**，避免"填之前构建就失败"死循环） | 退出码 0/1 |
| `build har` | 拷库进 har_wrapper → `ohpm install` → `hvigorw assembleHar` → 拷出 `.har` | `ohos/harmony/{short}.har` |
| `build hap` | `npm pack` → example 加 `file:` tgz → `npm install` → `ohpm install` → `check` → `npm run dev`(bundle) → `hvigorw assembleHap` | Example HAP |

`--type cpp` 走 turbo 骨架；C/C++/NAPI 实现由你在 `harmony/{short}/` 下补全。`build hap` 的 RNPackage 注册靠 `ohos/package.json` 的 `harmony.autolinking`（scaffold 已注入）+ hvigor 编译时 autolink；若走手动注册路线，确保 `RNOHPackagesFactory` 返回非空。

## 你的活：scaffold 之后

1. **Spec**：新架构用 `src/*Spec.ts(x)`；旧架构（`NativeModules`/`requireNativeComponent`）先手写转成 TurboModule/Fabric Spec。`ohos/src/` 的导入按 RNOH 改写（查 `rn-docs-lookup`）。
2. **`rnohos.py codegen`** → 在 `harmony/{short}/src/main/ets/`（必要时 `cpp/`）实现 Spec 声明的方法，接 `@ohos.*`/`@kit.*`，`Index.ets` 只导出必要公开面。
3. **`App.tsx`** 覆盖核心 API，展示真实返回/状态/副作用。
4. **`rnohos.py check` → `build har`（原生）→ `build hap`**，失败读日志修真实问题后重跑。

退出码 0 即成功（stdout 空也别判失败）。**禁止裸跑 hvigorw**（绕过 pack/bundle/autolink 会版本不一致→白屏）。

## failure-lessons：开工/校验前查 `lessons/`（瘦索引 + 按需分片）

失败经验卡（问题→解决方案）已拆成**瘦索引 + 按 category 分片**，按需加载、不必整库常驻：

1. **02 编码 / 03 校验开工前**，只读索引 `.claude/skills/rn-ohos-template/lessons/index.json`（每个 category 一行：`title` / `stage` / `plugin_type` / `count` / `load_when`）。
2. 用本库 `plugin_type`（js-only/turbo/fabric/cpp）+ 当前 `stage`（coding/validation）筛 category：`stage` 命中、且（`plugin_type` 含本类型或含 `all`）的才需要；再用 `load_when` 判断是否真的相关（如本库未涉权限/加密，可不读 `review` 的相应卡）。
3. 对命中的 category，`read` 它的 `file`（如 `lessons/registration.json`）；分片内**再按每张卡的 `plugin_type`+`stage` 过滤**，逐条对照代码是否命中 `wrong`，命中就照 `fix` 改；`why` 解释根因。多为白屏/装不上/编译失败类。
4. 修完一个**索引里没有、且有代表性**的新失败 → 追加一张同结构卡到**最贴切的分片**（无合适分片才新建文件、在 `index.json` 加一行、并更新该分片 `count`）。保持精简，别堆特例。

> 分片 schema 见 `lessons/shard.schema.json`、索引 schema 见 `lessons/index.schema.json`。卡只是预防参考，不替代文档/API 查证：RNOH/版本基线、TurboModule/Fabric/Codegen/Autolinking 查 `rn-docs-lookup`；鸿蒙 API 查 `harmonyos-sdk-api-lookup`/`harmonyos-docs-lookup`，不要猜。
