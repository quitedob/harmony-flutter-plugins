---
name: tool-example
description: Example 应用构建与依赖回退指导。包含 RN 示例工程创建/适配、依赖审计与回退、编译修复三大模块。静态分析、库修复、测试生成、设备验证已迁移至 tool-testing Skill。
---

# Example 应用构建与依赖回退

## 1. Example 创建与适配

### 1.1 参考示例目录

**示例目录**：`example_auto` 是一个完整的 React Native 示例应用，包含了鸿蒙原生工程结构，可作为参考：
- **位置**：`agent-rn\.claude\skills\tool-example\example_auto`
- **内容**：包含完整的 React Native 应用结构和鸿蒙原生工程配置
- **用途**：可直接参考该目录的结构和配置，快速搭建测试工程

### 1.2 从零创建 Example

当模块没有 example 目录时，基于 `03-coding-library.json` 的 `implemented_methods` 创建测试工程。

**创建步骤**：

```bash
npx react-native init ExampleApp --version 0.72.5
cd ExampleApp
npm install file:../  # 安装待测试的模块
```

**鸿蒙原生工程**需要按 RN OHOS 标准创建（参考 `rn-docs-lookup` → `zh-cn/环境搭建.md`）。

**App.tsx 关键模式** — 为每个方法生成测试卡片：

```tsx
import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import ModuleClass from '{module_name}';

const App = () => {
  const [results, setResults] = useState<Record<string, string>>({});

  const testMethod = async (name: string, fn: () => Promise<any>) => {
    try {
      const result = await fn();
      setResults(prev => ({ ...prev, [name]: `Success: ${JSON.stringify(result)}` }));
    } catch (e: any) {
      setResults(prev => ({ ...prev, [name]: `Error: ${e.message}` }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Module Test</Text>
      {/* 为每个方法生成一个测试按钮 */}
      <View style={styles.card}>
        <Text>methodName</Text>
        <Button title="Test" onPress={() => testMethod('methodName', () => ModuleClass.methodName())} />
        {results['methodName'] && <Text>{results['methodName']}</Text>}
      </View>
    </ScrollView>
  );
};
```

**生成规则**：
- 按 `implemented_methods` 逐一生成测试按钮，参数用合理测试值
- 每个调用必须在 try-catch 中
- `not_implemented` 的方法生成禁用按钮 + "Not implemented on OHOS" 提示
- DeviceEventEmitter 事件用 `useEffect` + `addListener` 展示
- Fabric 自定义组件直接嵌入到 View 中

### 1.2 适配已有 Example

1. 检查 `example/` 或 `SampleApp/` 目录
2. 确认 `package.json` 中已添加模块依赖
3. 对未被调用的 `implemented_methods` 补充调用入口
4. 对缺少 OHOS 支持的依赖进行回退处理
5. 创建或更新鸿蒙原生工程目录

---

## 2. 依赖审计与回退

### 2.1 审计流程

```bash
cd example
npm ls --all 2>/dev/null
cat package.json | grep -A 50 '"dependencies"'
```

检查所有依赖中是否有含原生代码但不支持 harmony 平台的模块。

### 2.2 回退代码模式

**模式 A：try-catch 包裹**（推荐默认模式）

```tsx
const safeCall = async () => {
  try {
    return await NativeModule.someMethod();
  } catch (e) {
    console.warn('Not available on OHOS:', e);
    return fallbackValue;
  }
};
```

**模式 B：平台判断**

```tsx
import { Platform } from 'react-native';

if (Platform.OS !== 'harmony') {
  await someUnsupportedCall();
} else {
  console.log('Feature not supported on OHOS');
}
```

### 2.3 常见依赖回退表

| 模块 | 失败场景 | 回退方案 |
|------|----------|----------|
| `@react-native-async-storage/async-storage` | 无 harmony 实现 | try-catch 包裹或内存 Map |
| `react-native-screens` | 无 harmony 实现 | 禁用原生屏幕管理 |
| `react-native-gesture-handler` | 无 harmony 实现 | 使用 RN 内置手势 |
| `react-native-reanimated` | 无 harmony 实现 | 使用 RN Animated API |
| `react-native-vector-icons` | 无 harmony 实现 | 使用文本或图片替代 |

---

## 3. 编译修复

### 3.1 鸿蒙工程编译

```bash
cd example/harmony
hvigorw assembleHap --mode module -p product=default -p debuggable=true --no-daemon
```

### 3.2 JS Bundle 构建

```bash
cd example
npx react-native bundle --platform harmony --dev false --entry-file index.js --bundle-output harmony/entry/src/main/resources/rawfile/bundle.harmony.js --assets-dest harmony/entry/src/main/resources/rawfile/assets
```

**递进修复策略**：

1. **自查**：读错误信息，检查 import、语法、类型
2. **查 Skill**：对照下方常见错误表
3. **查依赖**：`npm ls` 检查版本冲突
4. **搜索**：通过 `sub-doc-search` 搜索解决方案
5. **查 SDK**：读 `.d.ts` 确认 API 签名
6. **绕过**：移除或 mock 不可控依赖，记入 `fallback_applied`

**常见编译错误**：

| 错误模式 | 修复 |
|----------|------|
| `Cannot find module` | 检查 package.json 依赖和 oh-package.json5 |
| `hvigor ERROR: xxx` | 检查 harmony 工程配置 |
| `type 'X' is not assignable to 'Y'` | ArkTS 类型检查，修正类型声明 |
| `Codegen Error` | 检查 spec 文件和 codegenConfig 配置 |
| `TurboModule not found` | 检查 Package 注册和 Autolinking 配置 |
| Fabric 组件不渲染 | 检查 arkTsComponentNames 和 buildCustomComponent |
