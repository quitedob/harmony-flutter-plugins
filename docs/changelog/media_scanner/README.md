# media_scanner 变更与调试文档

> 文档目录：`docs/changelog/media_scanner/`  
> 插件：`media_scanner` v2.2.1  
> 最近更新：2026-08-04

## 文档索引

| 文件 | 用途 |
|------|------|
| [changelog.md](changelog.md) | 功能适配、Demo 与交付物变更记录 |
| [devlog.md](devlog.md) | 真机、构建、调试和证据边界 |
| [operation-log-2026-08-03.md](operation-log-2026-08-03.md) | 本轮完整操作时间线、命令、错误与修复 |
| [project-standards.md](project-standards.md) | 后续 media_scanner OHOS Demo 必须遵循的项目规范 |

## 当前交付

| 项 | 状态 |
|----|:--:|
| 隔离 Demo | PASS |
| Demo 路径 | `repos-flutter-fast/media_scanner/example_auto/` |
| 三级页面结构 | PASS（源码 + widget test） |
| XLSX 18/18 ID/标题/级别 | PASS |
| Flutter analyze | PASS |
| Flutter test | PASS |
| HAP build / SignHap | PASS |
| HDC install / launch | PASS |
| 模块索引页真机截图 | PASS |
| 二/三级页面真机截图 | NOT_RUN（本轮截图未完成有效跳转） |
| 18 条真机逐条执行 | NOT_RUN |
| 真机一键测试全部 | NOT_RUN |

## HAP

```text
flutter_library_workflow/flutter_library_workflow_release/repos-flutter-fast/
media_scanner/example_auto/build/ohos/hap/media_scanner-ohos-demo.hap
```

- 大小：141,453,205 bytes
- SHA-256：`22d9b39c320dfbfe6ec020ff8bb6d6ea00960c071a7eda3487f098b9b6a4a726`
- 手机显示名：`MediaScanner 测试`

## 阅读顺序

1. 新参与者先读 [project-standards.md](project-standards.md)。
2. 需要复现构建时读 [operation-log-2026-08-03.md](operation-log-2026-08-03.md)。
3. 需要了解历史演进时读 [changelog.md](changelog.md)。
4. 需要核对真机证据和限制时读 [devlog.md](devlog.md)。
