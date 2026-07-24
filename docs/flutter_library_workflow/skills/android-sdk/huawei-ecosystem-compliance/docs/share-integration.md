# 华为 Share Kit（分享服务）集成指导

## 第一部分：华为 Share Kit API 映射

### 核心 API 概览

| 功能 | 华为 Share Kit API | 模块 | 说明 |
|------|-------------------|------|------|
| 构造分享数据 | `new systemShare.SharedData(record)` | `@kit.ShareKit` | 创建一组分享数据 |
| 追加分享记录 | `shareData.addRecord(record)` | `@kit.ShareKit` | 增加多条分享内容 |
| 拉起系统分享面板 | `new systemShare.ShareController(data).show(context, options)` | `@kit.ShareKit` | 显示系统分享面板 |
| 监听分享完成 | `controller.on('shareCompleted', ...)` | `@kit.ShareKit` | 可选，监听分享完成 |
| 监听面板关闭 | `controller.on('dismiss', ...)` | `@kit.ShareKit` | 可选，监听面板关闭 |

### 常见内容类型映射

| 分享内容 | UTD 类型 | 记录字段 |
|---------|---------|---------|
| 文本 | `utd.UniformDataType.TEXT` | `content` |
| 链接 | `utd.UniformDataType.HYPERLINK` | `content` |
| 图片 | `utd.getUniformDataTypeByFilenameExtension(..., utd.UniformDataType.IMAGE)` | `uri` |
| 视频 | `utd.getUniformDataTypeByFilenameExtension(..., utd.UniformDataType.VIDEO)` | `uri` |
| 普通文件 | 按扩展名推导 UTD | `uri` |

### 关键实现说明

- 文本、链接通常使用 `content`；图片、视频、文件通常使用 `uri`，且应传 `fileUri.getUriFromPath(...)` 转换后的 URI。
- 多条分享数据通过 `SharedData.addRecord(...)` 追加。批量/多选模式只适合文件类记录，不要把文本/链接当成批量文件分享处理。

---

## 第二部分：ETS 代码模板

### 2.1 导入和类型定义

```typescript
import { systemShare } from '@kit.ShareKit';
import { uniformTypeDescriptor as utd } from '@kit.ArkData';
import { fileUri } from '@kit.CoreFileKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { common } from '@kit.AbilityKit';
```

### 2.2 分享服务类

```typescript
// ohos/src/main/ets/services/ShareService.ets

import { systemShare } from '@kit.ShareKit';
import { uniformTypeDescriptor as utd } from '@kit.ArkData';
import { fileUri } from '@kit.CoreFileKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { common } from '@kit.AbilityKit';

const TAG = '[ShareService]';
const DOMAIN = 0xFF00;

export class HuaweiShareService {
  private static instance: HuaweiShareService;
  private context: common.UIAbilityContext | null = null;

  static getInstance(): HuaweiShareService {
    if (!HuaweiShareService.instance) {
      HuaweiShareService.instance = new HuaweiShareService();
    }
    return HuaweiShareService.instance;
  }

  setContext(context: common.UIAbilityContext): void {
    this.context = context;
  }

  async shareText(text: string, title: string = '', description: string = ''): Promise<boolean> {
    if (!this.context) {
      return false;
    }

    try {
      const shareData: systemShare.SharedData = new systemShare.SharedData({
        utd: utd.UniformDataType.TEXT,
        content: text,
        title: title,
        description: description,
      });
      const controller: systemShare.ShareController = new systemShare.ShareController(shareData);
      await controller.show(this.context, {
        selectionMode: systemShare.SelectionMode.SINGLE,
        previewMode: systemShare.SharePreviewMode.DETAIL,
      });
      hilog.info(DOMAIN, TAG, 'Text shared successfully');
      return true;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Failed to share text: %{public}s', err.message);
      return false;
    }
  }

  async shareLink(url: string, title: string = '', description: string = ''): Promise<boolean> {
    if (!this.context) {
      return false;
    }

    try {
      const shareData: systemShare.SharedData = new systemShare.SharedData({
        utd: utd.UniformDataType.HYPERLINK,
        content: url,
        title: title,
        description: description,
      });
      const controller: systemShare.ShareController = new systemShare.ShareController(shareData);
      await controller.show(this.context, {
        selectionMode: systemShare.SelectionMode.SINGLE,
        previewMode: systemShare.SharePreviewMode.DEFAULT,
      });
      hilog.info(DOMAIN, TAG, 'Link shared successfully');
      return true;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Failed to share link: %{public}s', err.message);
      return false;
    }
  }

  async shareFiles(filePaths: string[], fallbackUtd: string = utd.UniformDataType.FILE): Promise<boolean> {
    if (!this.context || filePaths.length === 0) {
      return false;
    }

    try {
      const firstPath: string = filePaths[0];
      const firstRecord: systemShare.SharedRecord = {
        utd: fallbackUtd,
        uri: fileUri.getUriFromPath(firstPath),
      };
      const shareData: systemShare.SharedData = new systemShare.SharedData(firstRecord);

      for (let index: number = 1; index < filePaths.length; index++) {
        shareData.addRecord({
          utd: fallbackUtd,
          uri: fileUri.getUriFromPath(filePaths[index]),
        });
      }

      const controller: systemShare.ShareController = new systemShare.ShareController(shareData);
      await controller.show(this.context, {
        selectionMode: filePaths.length > 1 ? systemShare.SelectionMode.BATCH : systemShare.SelectionMode.SINGLE,
        previewMode: systemShare.SharePreviewMode.DETAIL,
      });
      hilog.info(DOMAIN, TAG, 'Files shared successfully');
      return true;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      hilog.error(DOMAIN, TAG, 'Failed to share files: %{public}s', err.message);
      return false;
    }
  }
}
```

说明：

- 分享面板必须基于真实 `UIAbilityContext` 拉起。
- 文件类分享优先传应用可访问路径
- 实际插件入口、`MethodChannel` 名称、Dart API 和返回结构，必须以原插件源码为准，不要照着这里新造固定通道或固定 facade。

---

## 第三部分：配置文件修改

### 3.1 权限与数据准备注意事项

- Share Kit 本身通常不需要专门的权限。不需要额外运行时权限。
- 图片、视频、文件分享的关键在于传入的文件 URI 必须真实可访问，且路径处理符合 HarmonyOS 沙箱规则。
- 如果分享内容来自用户选取的媒体库、文档或其他系统数据源，所需权限和 URI 授权应按该数据来源对应的官方文档处理限。

---

## 第四部分：场景补充

### 4.1 普通链接 vs 应用直达链接

- 普通网页链接分享，使用 `utd.UniformDataType.HYPERLINK` 即可。
- 如果插件语义是“分享后对端点击可直达应用”，应优先规划 App Linking，并分享 App Linking 链接，而不是把普通网页链接当成等价方案。

### 4.2 多内容分享

- Share Kit 支持在一个 `SharedData` 中追加多条记录。
- 但批量/多选模式主要面向文件类记录；如果原插件公开行为是“文本 + 图片 + 链接混合分享”，要先核对官方支持范围。

## 补充说明

- 更多 API 用法需要查询官方文档。
