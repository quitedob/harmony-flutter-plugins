# Example 签名配置（signing.local → build-profile）

> 原先将 `signingConfigs` 与密码硬编码进仓库的做法**已废弃**。执行者只维护本机 `adapt-workflow/data/signing.local.json`（已入 `.gitignore`）。

## 新流程

1. 复制 `adapt-workflow/data/signing.example.json` 为 `signing.local.json`，填入证书路径、密码、`bundleName`（与 profile 一致）。
2. 在插件根执行：`node adapt-workflow/bin/ohos-sync-build-profile.js --mode=apply --cwd=<插件根>`，将材料同步到 `example/harmony/build-profile.json5`（或 `example/ohos/`），并同步 `AppScope/app.json5` 的 `bundleName`。
3. **testing 阶段** adapt-workflow 也会在启动 Agent 前自动执行上述 sync（Flutter 侧同逻辑）。
4. 构建与安装：`flutter build hap`（hvigor 直签）→ `hdc install` 指向产物目录下的已签名 `.hap`。

本仓库工具链**不再**使用 `hap-sign-tool` 对 `*-unsigned.hap` 做二次重签。

## 提交前

`node adapt-workflow/bin/ohos-sync-build-profile.js --mode=strip --cwd=<插件根>` 清空 `signingConfigs`，避免误提交密钥。

详见 [`adapt-workflow/docs/ohos-signing.md`](../../../adapt-workflow/docs/ohos-signing.md)。

## 严禁

- 向 Git 提交含 `signingConfigs.material` 的 `build-profile.json5`
- 在 Agent prompt 或产物中写入密码、证书路径
