# JSON Schema 详解

**适用范围**：阶段 1 - 需求解析

```json
{
  "$schema": "https://raw.githubusercontent.com/huawei-test-design-agent/schema/main/requirement.schema.json",
  "pluginInfo": {
    "name": "flu_wake_lock",
    "version": "0.0.2",
    "repository": "https://github.com/dualskana/flu_wake_lock",
    "license": "MIT",
    "supportedPlatforms": ["android", "ios"],
    "pluginType": "platform_interaction"
  },
  "modules": [
    {
      "moduleCode": "F-01",
      "moduleName": "屏幕常亮控制",
      "description": "开启/关闭屏幕常亮功能",
      "priority": "P0"
    },
    {
      "moduleCode": "F-02",
      "moduleName": "平台信息查询",
      "description": "获取运行平台版本信息",
      "priority": "P2"
    }
  ],
  "apis": [
    {
      "name": "getPlatformVersion",
      "signature": "Future<String?> getPlatformVersion()",
      "module": "F-02",
      "parameters": [],
      "returnType": "Future<String?>"
    },
    {
      "name": "enable",
      "signature": "Future<bool?> enable()",
      "module": "F-01",
      "parameters": [],
      "returnType": "Future<bool?>"
    },
    {
      "name": "disable",
      "signature": "Future<bool?> disable()",
      "module": "F-01",
      "parameters": [],
      "returnType": "Future<bool?>"
    }
  ],
  "permissions": [],
  "usageScenarios": {
    "targetUsers": ["Flutter 移动应用开发者"],
    "scenarios": [
      "视频播放应用：播放视频时保持屏幕常亮",
      "地图导航应用：导航过程中持续显示路线",
      "实时监控应用：展示实时数据或监控画面",
      "演示/教育应用：演示内容或教学时需要持续显示",
      "游戏应用：某些游戏需要保持屏幕常亮"
    ]
  }
}
```

## 字段定义

### 1. pluginInfo（插件基本信息）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 插件名称 |
| version | string | 是 | 版本号 |
| repository | string | 是 | 仓库地址 |
| license | string | 是 | 许可证 |
| supportedPlatforms | array | 是 | 已支持平台 |
| pluginType | string | 是 | 插件类型 |

### 2. modules（功能模块数组）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| moduleCode | string | 是 | 模块编号（F-XX 格式） |
| moduleName | string | 是 | 模块名称 |
| description | string | 是 | 功能描述 |
| priority | string | 是 | 优先级（P0/P1/P2） |

### 3. apis（API 接口数组）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | API 名称 |
| signature | string | 是 | 方法签名 |
| module | string | 是 | 所属模块编号 |
| parameters | array | 是 | 参数列表 |
| returnType | string | 是 | 返回值类型 |

### 4. permissions（权限需求数组）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 权限名称 |
| androidDeclaration | string | 否 | Android 声明 |
| iosDeclaration | string | 否 | iOS 声明 |
| purpose | string | 是 | 用途说明 |

### 5. usageScenarios（使用场景）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| targetUsers | array | 是 | 目标用户群体列表 |
| scenarios | array | 是 | 使用场景列表 |

## 插件类型枚举

`pluginType` 字段可选值：

| 值 | 说明 | 特征 |
|------|------|------|
| `platform_interaction` | 平台交互类 | 调用系统 API（相机、蓝牙、传感器等） |
| `business_feature` | 业务功能类 | 支付、地图、推送、OCR 等 |
| `ui_component` | UI 组件类 | 提供可视化组件 |
| `architecture_tool` | 架构工具类 | 工具库、封装库 |
| `ffi` | FFI 插件类 | 调用动态库 |

## 优先级枚举

`priority` 字段可选值：

| 值 | 说明 |
|------|------|
| `P0` | 核心功能，缺失则插件不可用 |
| `P1` | 重要功能，影响主要使用场景 |
| `P2` | 辅助功能，可降级或延后实现 |
