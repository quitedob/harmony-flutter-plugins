# 资源文件映射参考

## 常见引用方式与目标位置

| 引用方式 | 目标目录 | 说明 |
|---------|---------|------|
| `getRawFileContent('xxx')` | `entry/src/main/resources/rawfile/` | 原始文件，保持原名 |
| `$r('app.media.xxx')` | `entry/src/main/resources/base/media/` | 媒体资源，需转换为资源ID |
| `$r('app.string.xxx')` | `entry/src/main/resources/base/element/string.json` | 字符串资源 |

## 常见原项目资源位置

| Android 位置 | 说明 |
|-------------|------|
| `res/drawable/` | 图像资源（jpg/png） |
| `res/raw/` | 原始数据文件 |
| `assets/` | 资产文件 |
| `sample/` 或 `demo/` | 示例数据 |

## 典型场景示例

### 图像资源同步

```
原项目位置: res/drawable/wallace.jpg
鸿蒙位置:   entry/src/main/resources/rawfile/wallace.jpg
代码引用:   getRawFileContent('wallace.jpg')
```

### 配置文件同步

```
原项目位置: assets/config.json
鸿蒙位置:   entry/src/main/resources/rawfile/config.json
代码引用:   getRawFileContent('config.json')
```

### 多资源批量同步

当多个测试用例共用同一资源时，只需同步一次：
```
F-01-01, F-01-02, F-01-03 均引用 wallace.jpg
→ 同步到 rawfile/wallace.jpg，所有用例共享
```

## 缺失处理示例

```typescript
// 资源文件不存在时的处理
try {
  const imageData = await resourceMgr.getRawFileContent('sample.jpg');
} catch (e) {
  this.result = '⚠️ 缺少资源: sample.jpg\n请从原项目 res/drawable/ 同步到 rawfile/';
}
```

---

## 权限声明同步
**增量同步**权限声明与说明文本：
- **源文件**：
  - `ohos_hardemo/entry/src/main/module.json5` 中的 `requestPermissions` 字段
  - `ohos_hardemo/entry/src/main/resources/base/element/string.json` 中权限相关的说明文本（如 `media_read_reason`）
- **目标文件**：
  - `ohos-hardemo-auto/entry/src/main/module.json5`
  - `ohos-hardemo-auto/entry/src/main/resources/base/element/string.json`
- **合并策略**（非覆盖，需智能合并）：
  a. **module.json5 权限合并**：
    - 若 `ohos-hardemo-auto` 无 `requestPermissions` 字段，直接插入 `ohos-hardemo` 的完整字段
    - 若已有 `requestPermissions`，按权限 `name` 去重合并：ohos-hardemo 中有但 auto 中无的权限需追加
    - 禁止删除 auto 中已有的其他权限（如 `ohos.permission.INTERNET`）
  b. **string.json 说明文本合并**：
    - 若 auto 中无对应 `name`（如 `media_read_reason`），追加该条目
    - 若已存在同名条目，保留 auto 的原值（避免覆盖自定义文案）
- **验证**：合并后检查 `module.json5` 中 `user_grant` 类型权限必须配套 `reason` 引用（如 `$string:media_read_reason`），且该 string 条目在 `string.json` 中存在