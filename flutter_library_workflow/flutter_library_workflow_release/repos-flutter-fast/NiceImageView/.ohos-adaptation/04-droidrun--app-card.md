# NiceImageView App Card

## 基本信息

| 属性 | 值 |
|------|-----|
| 应用名 | NiceImageView Demo |
| 包名 | nice_image_view_example |
| 语言 | Dart (Flutter) |
| 入口 | example/lib/main.dart |

## UI 元素清单

| 元素名 | 类型 | 说明 |
|--------|------|------|
| **圆形模式开关** | SwitchListTile | 切换 isCircle |
| **isCoverSrc 开关** | SwitchListTile | 切换边框覆盖模式 |
| **圆角半径滑块** | Slider | 0-80，调整统一圆角 |
| **边框宽度滑块** | Slider | 0-20，调整边框宽度 |
| **内边框宽度滑块** | Slider | 0-15，调整内边框（仅圆形模式显示） |
| NiceImageView 组件 | Widget | 图片预览区域 |

## 页面结构

```
AppBar "NiceImageView Demo"
├─ NiceImageView 预览 (200x200, 居中)
├─ 圆形模式开关
├─ 圆角半径滑块 (非圆形模式显示)
├─ isCoverSrc 开关
├─ 边框宽度滑块
└─ 内边框宽度滑块 (圆形模式显示)
```
