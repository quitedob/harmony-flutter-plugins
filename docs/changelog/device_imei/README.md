# device_imei 文档索引

> 插件：`device_imei` 0.0.4+1  
> 类型：MethodChannel standalone 插件（Dart façade + 扁平 OHOS HAR）  
> 文档归档目录：`docs/changelog/device_imei/`

## 文档分类

| 文档 | 用途 |
|---|---|
| [changelog.md](changelog.md) | 面向交付的变更摘要、状态和版本记录 |
| [devlog.md](devlog.md) | 按日期记录开发、排障、测试与交付过程 |
| [operation-log-2026-08-04.md](operation-log-2026-08-04.md) | 2026-08-04 最终阶段收尾、记录对齐、flutter create + HAP 构建与门禁复盘的完整操作日志 |
| [project-standards.md](project-standards.md) | 后续维护必须遵守的项目规范、Channel 契约、页面结构、签名与 Windows 构建规则 |

## 当前基线

| 检查项 | 结果 |
|---|---|
| 测试用例 | 26 条，F-01/F-02/F-03 分布为 4/7/15（L0 4 / L1 15 / L2 5 / L3 2） |
| XLSX | 12 列、26 行，覆盖设备 `phone,tablet,2in1` |
| 三级导航 | 1 模块索引页 + 3 模块页 + 26 详情页 |
| Action 实现 | 26/26 调用真实 public API（getPlatformVersion/getDeviceImei/getDeviceInfo / DeviceInfo 模型方法）或真实错误路径；含 `一键测试全部` 控件 |
| 方法覆盖率 | 3/3 = 100% |
| 插件 `flutter test` | ✅ PASS（插件 7/7 + demo 3/3） |
| DroidRun / Hypium 执行 | 🔴 NOT_RUN（仅生成套件；demo 一键测试全部已真机 26/26） |
| AJV Schema | 01–05 全部 PASS；8 项跨阶段一致性 PASS |
| 质量评分 | B（status success，静态全绿，运行态待真机） |
| HAP | 签名 HAP（宿主工程，SHA `7f07…dca1`）+ 独立签名 HAP final（SHA `c586…44009`，真机 26/26）+ unsigned 独立 HAP 若干 |
| 真机验证 | 独立 example_auto 签名 HAP 安装/启动于 `192.168.3.85:41665`（API 24），`一键测试全部` **26/26 PASS**（通过 26 / 失败 0） |

## 维护入口

涉及 Channel 契约、用例、Demo 或 HAP 的后续变更，先阅读 [project-standards.md](project-standards.md)，并在完成后更新 [changelog.md](changelog.md)、[devlog.md](devlog.md) 和对应日期的操作日志。
