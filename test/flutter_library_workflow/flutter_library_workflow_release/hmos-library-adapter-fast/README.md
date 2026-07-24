# @hmos-library-adapter/fast

**HarmonyOS 三方库适配统一入口（高效流程版）**。一个 npm 包同时带 Flutter / React Native / 原生 Android
三套适配 agent，安装进 **OpenCode / Claude Code**。发起适配时，入口先**确定性检测**当前仓库属于哪个平台，
再路由到对应平台的编排器完成适配。

## 对外只有一个入口

`hmos-library-adapter-fast`（路由器，用户唯一调用）。它：
1. **范围门**：只处理三方库鸿蒙适配相关问题，无关问题按固定话术拒答。
2. **检测**：`hmos-library-adapter-fast detect --json` 判定 flutter / rn / sdk / unknown。
3. **路由**：用 `Task` 唤起对应平台编排器（`flutter-fast` / `rn-fast` / `sdk-fast`，均隐藏/内部）。

```
hmos-library-adapter-fast        ← 唯一可见入口（检测 + 路由）
├─ flutter-fast (hidden) → flutter-fast-01-analysis / -02-coding-library / -03-validation
├─ rn-fast      (hidden) → rn-fast-01-analysis / -02-coding-library / -03-validation
└─ sdk-fast     (hidden) → sdk-fast-01-analysis / -02-implementation / -03-validation
公共能力（只装一份）: harmonyos-docs-lookup + harmonyos-sdk-api-lookup
```

## 检测规则（`src/detect.js`，工程根，优先级固定）

| 优先级 | 平台 | 触发 |
|---|---|---|
| 1 | flutter | `pubspec.yaml` |
| 2 | rn | `package.json` 含 `react-native`/`codegenConfig`，或 `react-native.config.js`（podspec 仅辅助） |
| 3 | sdk | 工程根 `settings.gradle`/`gradlew`/`build.gradle`(.kts) |
| — | unknown | 都不命中 → 入口报告证据、问用户 |

多平台同时命中 → `confidence:low`，入口**强制让用户确认**，不静默选。

## 单一事实源 + 公共抽取

- 源不在本包：`../agent-flutter-fast`、`../agent-rn-fast`、`../agent-android-sdk-fast`（各平台）+ `../agent-core`（公共 doc skill）。
- `prepack` 把它们快照进 `shared/`（`shared/<id>/` + 去重的 `shared/skills/`），`postpack` 删除——git 仓不留快照。
- **公共 doc skill（128M）整个包只装一份**，比 3 个独立包各背一份省一大截。
- 顶层路由 prompt（`agent/orchestrator.md`）是本包自有，直接随包发布。
- dev 无 `shared/` 时直读 sibling 源，改 prompt 立即生效。

## 安装（推荐全局）

入口路由器在宿主里会以**裸命令名** `hmos-library-adapter-fast detect` 调子命令，且 OpenCode 插件 symlink 需要稳定位置——**务必全局安装**，别用一次性 `npx`：

```bash
npm install -g @hmos-library-adapter/fast     # 或 bun add -g
hmos-library-adapter-fast install             # 装入口 + 3 平台 + skill（默认 both）
hmos-library-adapter-fast doctor              # 体检（含 PATH / 插件 / 当前目录检测）
hmos-library-adapter-fast detect --json       # 单独看检测结果
```

装完 / 升级后**重启 OpenCode**：插件有冷缓存，不重启看不到注入的 agent。

> `npx` 一次性运行装完即不在 PATH，路由器第 1 步会失败；doctor 会就此告警。

可选参数：`install --target opencode|claudecode|both`（默认 both）、`--force`（覆盖同名）、`--dry-run`（预演不落盘）。

## 卸载

```bash
hmos-library-adapter-fast uninstall           # 从两个宿主移除（plugin + Claude agents + skill 链接）
npm rm -g @hmos-library-adapter/fast           # 移除全局包与裸命令
```

然后**重启 OpenCode**。卸载是 **Do No Harm** 的：只清本工具建的东西（带 `managed-by` 标记的 agent、指向本包的 plugin symlink / skill 链接、`opencode.json` 里的 plugin 引用），不动你自己的 agent / skill / 配置。`uninstall` 也支持 `--target`。

## Windows 安装 / 卸载

npm 命令跨平台，**安装/卸载命令与上面完全一致**（在 PowerShell 或 cmd 里跑）。安装产物路径变为 `%USERPROFILE%\.config\opencode\plugins\`、`%USERPROFILE%\.claude\agents\`。

差异只在**符号链接权限**——Windows 普通用户默认不能建 symlink。本工具已内置两层兜底，开箱即用：

| 资源 | Windows 行为 |
|---|---|
| OpenCode 插件 | 先试 symlink；无权限（`EPERM`）→ **自动回退**写 `opencode.json` 的 `plugin:["@hmos-library-adapter/fast"]`，OpenCode 启动时自行拉取**已发布**的包加载 |
| Claude skill | 改用 **junction**（目录联接，普通用户即可创建，无需提权） |

**想直接用 symlink（免回退、体验最顺）**：打开 Windows 开发者模式——`设置 → 隐私和安全性 → 开发者选项 → 开发者模式`，之后 symlink 不再需要管理员权限。

> ⚠️ npm-array 回退依赖包**已发布到 npm**（OpenCode 要能拉取）；未发布的本地/dev 包在没开发者模式的 Windows 上仍需手动开启开发者模式才能建 symlink。

## 安装产物

| 宿主 | 产物 |
| --- | --- |
| OpenCode | `~/.config/opencode/plugins/hmos-library-adapter-fast.js`（symlink → 包内 `src/plugin.js`）。插件在**运行时**注入「入口 primary + 3 编排器 + 9 阶段（subagent+hidden）」并把包内 skill 目录写进 `config.skills.paths`；**不再往 `opencode.json` 写 agent**，临时安装位置则回退为 `plugin` 数组项 |
| Claude Code | `~/.claude/agents/hmos-library-adapter-fast.md`（入口）+ 12 内部 stub（标 INTERNAL）+ `~/.claude/skills/<name>` 软链（Do No Harm，已存在则跳过） |

**权限模型（OpenCode）**：每个 agent 带 per-agent `permission`——平台间 skill 用白名单隔离（`skill:{<本平台+公共>:allow, '*':deny}` + `skillSearch:deny`），`external_directory:{'*':deny}` 拒绝越界读兄弟仓（避免默认 "ask" 挂起）；skill 经 `skills.paths` 注册、不算 external 读，故不受影响。

## 与单平台包的关系

`@hmos-library-adapter/{rn,sdk,flutter}-fast` 是单平台版；本包是三合一统一版。源目录 `agent-*-fast` 共用，互不冲突。
