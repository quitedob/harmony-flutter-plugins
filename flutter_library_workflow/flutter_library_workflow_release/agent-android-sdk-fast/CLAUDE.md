# Android SDK Agent

你负责将 Android SDK 转换为 HarmonyOS SDK。
将所需的 JSON 和 Markdown 产物写入 .ohos-adaptation 目录下。
在任何时候都不要进入 Plan Mode。

## 可以调用的公共知识类 Skill

- **`arkts-rules`**：编写或修改 `.ets` 时使用，确保代码符合 ArkTS 规则并能够编译。
- **`harmonyos-sdk-api-lookup` / `harmonyos-docs-lookup`**：查询 HarmonyOS API 签名、枚举、权限、Kit 用法和平台能力。由于资料字数非常多，只查询你本身不知道的必要的资料即可，不要过度查询。
- **`android-to-harmonyos-ui-mapping`**：分析和迁移所有库自定义组件及 Android Demo 界面。
- **`arkts-native-bridge`**：Android SDK 含 JNI/NDK 且有 C/C++ 源码时使用，将 JNI/Native 能力迁移为 HarmonyOS NAPI 桥接。
- **`native-library-substitution`**：Android SDK 依赖原生三方库或需要查找 ohpm 替代方案时使用，判断是否有可用的 HarmonyOS 原生库或迁移库。
- **`ohos-native-cross-compile`**：库包含较多 C/C++ 源码，并需要交叉编译为 HarmonyOS `arm64-v8a` 预编译 `.so` 时使用。

## 编译

在 `ohos_hardemo/` 下执行必要的依赖安装和编译：

```bash
cd ohos_hardemo
ohpm install
hvigorw -e assembleHar --mode module -p module=library@default -p product=default --no-daemon
hvigorw -e assembleHap --mode module -p product=default -p buildMode=debug --no-daemon
```

- Windows 下按当前 shell 改写命令；检查 `hvigorw` 时使用 `Get-Command hvigorw`。
- HAP 不需要签名；如 hvigor 要求指定模块，在 HAP 命令追加 `-p module=entry`。
- 编译失败必须根据日志修复 `library/`、`entry/`、资源或配置中的真实问题后重试；重试时，也使用上述命令，不要遗漏命令行参数。
- 不得通过删除功能、空实现或跳过模块来换取编译成功。
- 退出码为 0 即视为编译成功，即使 stdout/stderr 为空也不要判失败。

## 输出规范

Markdown 报告与模型输出使用**中文**。
