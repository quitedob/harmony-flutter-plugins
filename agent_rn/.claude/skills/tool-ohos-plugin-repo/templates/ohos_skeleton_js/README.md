# @react-native-oh-tpl/xxx for HarmonyOS (JS-Only)

本项目基于 [原始库名](原始库 GitHub 链接) 开发，为 React Native 鸿蒙（OpenHarmony）适配版本。

本模块为纯 JavaScript 实现，无需额外配置原生依赖。

## 版本对应关系

| 鸿蒙适配包版本 | 原始库版本 | 支持 RN 版本 |
| ------------ | ---------- | ------------ |
| 见发布记录 | 见发布记录 | 0.72+ |

> 详细版本发布记录见 [Releases](发布仓库链接/releases)

## 安装

```bash
npm install @react-native-oh-tpl/xxx
```

## 使用

> 使用时 import 的库名与原库保持一致。

```tsx
import { OriginalComponent } from 'original-package-name';

// 使用方式与原库一致
```

> **说明**：`package.json` 中配置了 `harmony.alias` 字段，脚本会自动从原库 `name` 字段填充该值。Metro bundler 会据此将原始包名的 import 重定向到鸿蒙化包名。

## 属性 / API

| Name | Description | Type | Required | HarmonyOS 支持 |
|------|-------------|------|----------|---------------|
| 见原库文档 | 与原库一致 | 一致 | 一致 | 是 |

> 详细属性列表请参考原库文档。

## 约束与限制

### 兼容性

- RNOH: 0.72+
- HarmonyOS SDK: API 12+
- DevEco Studio: 5.0+

## 遗留问题

无（或列出已知问题）

## 开源协议

本项目基于 [原始库协议](原始库 LICENSE 链接)，详见 [LICENSE](./LICENSE) 文件。