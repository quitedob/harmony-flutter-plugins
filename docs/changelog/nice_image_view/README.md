# nice_image_view 文档索引

> 插件：`nice_image_view` 1.0.5（Flutter pure_dart UI 组件，由 Android SheHuan/NiceImageView 移植）
> 类型：pure Dart CustomPainter Widget（零原生代码）
> 文档归档目录：`docs/changelog/nice_image_view/`

## 文档分类

| 文档 | 用途 |
|---|---|
| [changelog.md](changelog.md) | 面向交付的变更摘要、状态和版本记录 |
| [devlog.md](devlog.md) | 按日期记录开发、排障、测试与交付过程 |
| [operation-log-2026-08-04.md](operation-log-2026-08-04.md) | 2026-08-04 最终阶段完整运行日志（全新独立运行、真机验证、签名 HAP 构建） |
| [project-standards.md](project-standards.md) | 后续维护必须遵守的项目规范、渲染契约、Demo 结构与 Windows 构建规则 |

## 当前基线

| 检查项 | 结果 |
|---|---|
| 分类 | pure_dart（CustomPainter + canvas.clipPath，零原生/零权限） |
| 公开 API | 16 参数（与 Android 12 属性一一对应），默认值一致 |
| 插件测试 | 24/24 PASS（`flutter test`），`flutter analyze` 0 issue，DFX 0 warning |
| 测试用例 | 20 条（L0×5 / L1×11 / L2×4），覆盖 8 个模块 |
| XLSX | 12 列、20 行，覆盖设备 `phone,tablet,2in1` |
| 三级导航 | 模块索引（F-01..F-08）→ 模块用例列表 → 20 详情页 |
| Action 实现 | 20/20 调用真实 public API（NiceImageView 参数组合），含 `一键测试全部` 与 `复制日志` |
| 方法覆盖率 | 16/16 = 100% |
| AJV Schema | 01–05 全部 PASS；8 项跨阶段一致性 PASS |
| 质量评分 | A（success，静态全绿 + 真机运行态全绿） |
| HAP | 签名 HAP（`example_auto/ohos/entry/build/default/outputs/default/entry-default-signed.hap`，97.6MB，SHA `90b603…1073`） |
| 真机验证 | HUAWEI Mate 60（BRA-AL00 / API 24 / `192.168.3.85:41665`）：安装/启动 PASS，20/20 逐用例「符合预期」，一键测试全部 20/20（NATIVE_VLM 核对） |

## 维护入口

涉及渲染契约、用例、Demo 或 HAP 的后续变更，先阅读 [project-standards.md](project-standards.md)，并在完成后更新 [changelog.md](changelog.md)、[devlog.md](devlog.md) 和对应日期的操作日志。
