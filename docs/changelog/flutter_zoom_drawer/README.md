# flutter_zoom_drawer 文档索引

> 插件：`flutter_zoom_drawer` 3.2.0  
> 类型：pure Dart Flutter UI 组件  
> 文档归档目录：`docs/changelog/flutter_zoom_drawer/`

## 文档分类

| 文档 | 用途 |
|---|---|
| [changelog.md](changelog.md) | 面向交付的变更摘要、状态和版本记录 |
| [devlog.md](devlog.md) | 按日期记录开发、排障、测试与交付过程 |
| [operation-log-2026-08-04.md](operation-log-2026-08-04.md) | 独立 OHOS Demo、XLSX、生成器、HAP 与真机验证的完整操作日志 |
| [project-standards.md](project-standards.md) | 后续维护必须遵守的项目规范、生成顺序、动画门禁和构建规则 |

## 当前基线

| 检查项 | 结果 |
|---|---|
| 测试用例 | 24 条，F-01/F-02/F-03/F-04 分布为 8/6/6/4 |
| XLSX | 12 列、24 行 |
| 官方生成器页面 | 1 个模块索引页、4 个模块页、24 个详情页 |
| Action 实现 | 24/24 页面调用真实插件 API（controller/手势/返回键/Builder 回调） |
| Result 实现 | 24/24 真实观测（stateNotifier 序列、isOpen、动画峰值），判定统一为符合预期 |
| 新增能力 | `btn_copy_log` 复制日志；模块页「一键测试全部」；中文 UI（操作/结果） |
| 插件测试 | 30/30 PASS |
| Demo 测试 | 5/5 PASS |
| Demo Analyze | No issues found |
| HAP | 短工作区 `D:\zd\flutter_zoom_drawer\` 重建签名 HAP，`hdc install` 成功并运行 |
| 真机验证 | 安装、启动、三级页面、代表性动画与修复版 Demo 运行 PASS |

## 维护入口

涉及用例、Demo 或 HAP 的后续变更，先阅读 [project-standards.md](project-standards.md)，并在完成后更新 [devlog.md](devlog.md) 和对应日期的操作日志。
