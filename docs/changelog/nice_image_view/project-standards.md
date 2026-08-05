# nice_image_view OHOS 适配项目规范

> 适用范围：插件目录、`example_auto/`、`.ohos-adaptation/`。
> 目标：保证渲染契约、测试用例、XLSX、独立 Demo、OHOS HAP 和设备证据可追踪、可复现且互不污染。

---

## 1. 项目分类与架构

1. `nice_image_view` 是 **pure_dart** 库（CustomPainter + Canvas，零原生代码、零权限）。
2. 渲染契约：`NiceImageView` 16 个构造参数与 Android 12 属性一一对应，默认值一致。
3. 裁剪语义：`canvas.clipPath()`（替代 PorterDuff）；矩形模式 `isCoverSrc` 时裁剪内缩 `borderWidth/2`（对齐 Android `srcRectF = borderRectF`）。
4. 生命周期：图片在 `didChangeDependencies` 解析（禁止 `initState` 中依赖 MediaQuery）；`dispose` 仅移除 ImageStream 监听（禁止 `setState`）。
5. 不得为纯 Dart 库添加原生插件模块或权限。

---

## 2. 源文件与生成文件所有权

### 2.1 权威源

优先级：

```text
插件当前源码 + 可复现测试/构建证据
> .ohos-adaptation/04-test-cases.json
> .ohos-adaptation/05-test-cases.xlsx
> 最新 dated changelog
```

### 2.2 Demo 结构

- `<demo-root>` = `example_auto/`（独立 Flutter OHOS 工程，own `pubspec.yaml`/`lib/`/`ohos/`）。
- 用例页：`lib/cases/F-XX-XX.dart`（20 个，自包含，语义 Key `btn_F_XX_XX`/`before_F_XX_XX`/`actual_F_XX_XX`/`expected_F_XX_XX`）。
- 共享运行器：`lib/case_runner.dart` `runCase`；一键测试全部 `main.dart` `btn_test_all`。
- 三级导航严格由评审 XLSX 派生：模块索引 → 模块用例列表 → 用例详情页。

---

## 3. 渲染契约（不改动）

| 参数 | 默认值 | 语义 |
|---|---|---|
| isCircle / isCoverSrc | false / false | 圆形模式 / 边框覆盖 |
| cornerRadius 与四角 | 0 | 统一圆角优先于单角 |
| borderWidth / borderColor | 0 / white | 外边框（矩形/圆形） |
| innerBorderWidth / innerBorderColor | 0 / white | 内边框（仅圆形） |
| maskColor | transparent | 遮罩 |
| fit | null（默认 cover） | 图片适配 |

---

## 4. 签名与 Windows 构建规则

1. 构建须在**物理短工作区**（原路径超 259 字符）；插件 + `example_auto` 一起暂存，保留 `path: ../` 依赖。
2. 使用 DevEco `node.exe hvigorw.js assembleHap --no-daemon` 直连（绕过 `.bat` 递归）。
3. 签名复用 DevEco auto-sign profile（bundle `com.example.flutter_ohos_test`）；更换设备必须重新签名并重建。
4. 新 HAP 安装前先 `hdc uninstall`，禁止增量 `-r` 安装。
5. `module.json5` 声明 `phone,tablet,2in1`。

---

## 5. 验证与证据

- 插件测试：`flutter test`（24/24）。
- Demo：`flutter analyze` + `flutter test`（3/3）。
- 真机：`hdc install` + `aa start` + 逐用例 `uitest uiInput` + `snapshot_display`，NATIVE_VLM 核对「符合预期」。
- 变更后必须同步更新 `docs/changelog/nice_image_view/` 下 README/changelog/devlog/操作日志。
