# 搜索指南

## oh_modules 目录结构

### 插件级依赖

```
ohos/oh_modules/@{org}/{package}/
├── Index.d.ets          # 包入口（类型声明）
├── index.ets            # 包入口（实现）
└── src/main/            # 类型定义文件
```

### Example 级依赖（ohpm 缓存）

```
example/ohos/oh_modules/.ohpm/@{org}+{package}@{version}/oh_modules/@{org}/{package}/
```

### 符号链接关系

插件级 `ohos/oh_modules/@{org}/{package}` 通常指向 Example 级缓存：

```
ohos/oh_modules/@org/package 
  → example/ohos/oh_modules/.ohpm/@org+package@version/oh_modules/@org/package
```

**搜索时优先使用插件级路径**（Read/Grep 工具会自动解析符号链接）。

## 文件类型说明

| 文件类型 | 用途 | 解析方式 |
|---------|------|---------|
| `.d.ts` | TypeScript 类型声明 | 提取 function/interface/enum 定义 |
| `.d.ets` | ArkTS 类型声明 | 同 .d.ts（ArkTS 是 TypeScript 子集） |
| `index.ets` | 包入口实现 | 提取 export 语句，确定 API 导出方式 |

## Grep 搜索模板（通用化）

### 方法签名搜索

```
Grep: pattern="{methodName}\s*\("
      path="ohos/oh_modules/@{org}/{package}/"
      include="*.d.ts,*.d.ets"
```

### Interface 定义搜索

```
Grep: pattern="interface\s+{TypeName}"
      path="ohos/oh_modules/@{org}/{package}/"
      include="*.d.ts"
```

### Enum 定义搜索

```
Grep: pattern="enum\s+{EnumName}"
      path="ohos/oh_modules/@{org}/{package}/"
      include="*.d.ts"
```

### 扫描所有公开 API

```
Grep: pattern="(public|export)\s+(function|class|interface|enum)"
      path="ohos/oh_modules/@{org}/{package}/"
      include="*.d.ts,*.d.ets"
```

## 包入口文件读取流程

### 步骤 1：检查 Index.d.ets 是否存在

```
Glob: pattern="Index.d.ets"
      path="ohos/oh_modules/@{org}/{package}/"
```

### 步骤 2：读取入口文件内容

```
Read: ohos/oh_modules/@{org}/{package}/Index.d.ets
```

### 步骤 3：解析 export 语句

常见的 export 形式：

```typescript
// Default export
export * from 'libModule.so';
export * from "./src/main/ets/module";

// Named export
export { ClassA, ClassB } from "./module";
export declare class ClassC { ... }
```

根据 export 形式确定导入方式：
- `export *` → 使用 `import Module from '@{org}/{package}'`
- `export { ... }` → 使用 `import { ClassA, ClassB } from '@{org}/{package}'`

## 实际搜索示例

### 示例 1：查找单个方法

查询 `@vendor/rtc-sdk login` 方法：

```
Grep: pattern="login\s*\("
      path="ohos/oh_modules/@vendor/rtc-sdk/"
      include="*.d.ts,*.d.ets"
```

返回：
```
login(a8: LoginDat, cookie?: string): void
```

### 示例 2：查找类型定义

查询 `@vendor/rtc-sdk LoginDat` 类型：

```
Grep: pattern="interface\s+LoginDat"
      path="ohos/oh_modules/@vendor/rtc-sdk/"
      include="*.d.ts"
```

返回：
```
interface LoginDat {
  token: string;
  userID: string;
  nickName?: string;
}
```

### 示例 3：扫描包所有 API

查询 `@vendor/rtc-sdk` 所有方法：

```
Grep: pattern="(public|export)\s+(function|class|interface|enum)"
      path="ohos/oh_modules/@vendor/rtc-sdk/"
      include="*.d.ts,*.d.ets"
```

## 常见问题处理

### Q1：找不到 oh_modules 目录

**原因**：依赖尚未安装

**解决**：
1. 确认 `oh-package.json5` 中已声明依赖
2. 执行 `ohpm install`
3. 重新搜索

### Q2：目录存在但无 .d.ts 文件

**原因**：闭源 SDK 或未提供类型定义

**处理**：
- 返回 `{ available: false, reason: "no_type_definitions" }`
- 在 risk_items 中标记风险
- 提示查阅官方文档

### Q3：找到多个匹配的方法名

**原因**：同名方法在不同文件中定义

**处理**：
- 检查方法签名是否一致
- 若一致，任意返回一个即可
- 若不一致，返回所有匹配供 Agent 选择

### Q4：符号链接路径解析失败

**原因**：路径拼接错误

**解决**：
- 优先使用 `ohos/oh_modules/@{org}/{package}/`（Read/Grep 自动解析）
- 若失败，尝试完整路径：`example/ohos/oh_modules/.ohpm/@{org}+{package}@{version}/oh_modules/@{org}/{package}/`