# HarmonyOS Lottie 库选型与迁移指南

> 知识来源：[lottie_turbo](https://gitcode.com/CPF-ApplicationTPC/lottie_turbo)（`@ohos/lottie-turbo`）、[lottieArkTS](https://gitcode.com/CPF-ApplicationTPC/lottieArkTS)（`@ohos/lottie`）

## 快速选型

| 场景 | 推荐库 | 安装 |
|------|--------|------|
| 新项目、多动画、复杂动画、追求性能 | **lottie-turbo** | `ohpm install @ohos/lottie-turbo` |
| 已有 Canvas + loadAnimation 代码、需最小改动 | **lottieArkTS** | `ohpm install @ohos/lottie` |
| 从 Android/iOS Lottie（Canvas 模式）迁移 | 优先评估 **lottieArkTS**；长期建议迁到 **lottie-turbo** |

**官方倾向**：lottieArkTS 文档明确推荐新项目使用 [lottie-turbo](https://gitcode.com/CPF-ApplicationTPC/lottie_turbo)——声明式 `LottieView`、并行加载、内存/文件缓存、子线程渲染，复杂场景 UI 更流畅（文档称性能优化 30%+）。

## 架构差异

### @ohos/lottie-turbo（声明式）

- 使用 `LottieView` 组件 + `LottieController`，无需手动创建 `Canvas`
- 支持 `path`（rawfile / 网络 / 沙箱）、`animationData`（JSON 字符串）
- 内置 `autoSkip`、缓存（`useCache` / `useImageCache`）、`renderToImage` 离屏渲染
- 支持 `createLottieNode` 预渲染、`renderMode`（Surface / Texture）
- 版本：1.0.2+ 兼容 API12+（1.0.2-rc.1 及以下仅 API16+）

### @ohos/lottie（Canvas 命令式）

- 必须：`Canvas` + `CanvasRenderingContext2D` + `lottie.loadAnimation({ container, ... })`
- 动画操作在 `DOMLoaded` 回调之后执行（加载为异步）
- 网络动画需 `ohos.permission.INTERNET`、`ohos.permission.GET_NETWORK_INFO`
- HSP 场景需 `animationData` + `createModuleContext` + `context` 参数
- 不可见跳过绘制：`autoSkip` 或 `bindContext2dToCoordinator`（API 13+）

## 最小迁移对照（lottieArkTS → lottie-turbo）

| lottieArkTS | lottie-turbo |
|-------------|--------------|
| `Canvas` + `onReady` + `loadAnimation` | `LottieView({ path, controller })` |
| `animationItem.play()` | `controller.play()` 或 `lottie.play(lottieId)` |
| `lottie.destroy(name)` | `controller.destroy()` 或 `lottie.destroy(lottieId)` |
| `name` | `lottieId`（需唯一） |
| `uri` 网络地址 | 合并到 `path`（支持 URL） |
| `bindContext2dToCoordinator` | 废弃，使用组件 `autoSkip` |
| `changeColor(color, layer?, index?)` | `changeColor(layerName, [r,g,b] or [r,g,b,a])` |

## 混淆配置

```text
# lottie-turbo
-keep
./oh_modules/@ohos/lottie-turbo

# lottieArkTS
-keep
./oh_modules/@ohos/lottie
```

## 共同限制

- 不支持含表达式的动画
- 不支持卡片（Form）、智能穿戴等设备
- lottieArkTS 额外限制：不支持 HTML 渲染、部分 masks/mattes、动态修改文本（turbo 支持文本图层 `setLayerProperties`）

## 文档索引（本 skill references/）

| 文件 | 内容 |
|------|------|
| `Lottie-@ohos-lottie-turbo开发指南.md` | turbo 安装、示例、23 项使用说明、API 表 |
| `Lottie-@ohos-lottie-ArkTS开发指南.md` | ArkTS 版安装、Canvas 流程、HSP、coordinator |
| `Lottie-@ohos-lottie-turbo-API类型声明.d.ts` | LottieController、全局 lottie 方法类型 |
| `Lottie-@ohos-lottie-ArkTS-API类型声明.d.ts` | AnimationItem、loadAnimation 参数类型 |
