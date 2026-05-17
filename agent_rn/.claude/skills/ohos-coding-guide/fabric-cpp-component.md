# Fabric C++ 自定义组件鸿蒙适配

## 适用条件

- 模块提供高性能自定义 UI 组件
- 使用 C++ 层实现 Props、EventEmitter、JSIBinder
- Android 端使用 C++ Fabric Component 实现
- 需要与 C++ 渲染层交互

---

## 第一部分：工程配置

### 目录结构

```
{module_name}/
├── src/
│   └── specs/
│       └── v2/
│           └── XxxNativeComponent.ts
├── ohos/
│   └── harmony/
│       └── library/
│       ├── src/main/
│       │   ├── cpp/
│       │   │   ├── CMakeLists.txt
│       │   │   ├── XxxComponentInstance.cpp
│       │   │   ├── XxxComponentInstance.h
│       │   │   ├── Props.h / Props.cpp        # C++ Props 定义
│       │   │   ├── EventEmitters.h / .cpp      # C++ EventEmitter
│       │   │   ├── JSIBinder.h                 # JSI 绑定
│       │   │   └── XxxPackage.cpp              # C++ Package
│       │   ├── ets/
│       │   │   └── XxxPackage.ets              # ETS Package 壳
│       │   └── module.json5
│       ├── oh-package.json5
│       └── build-profile.json5
├── index.ts
└── package.json
```

---

## 第二部分：编码实现

### C++ Props 定义

```cpp
// Props.h
#pragma once
#include <jsi/jsi.h>
#include <react/renderer/components/view/ViewProps.h>
#include <react/renderer/core/PropsParserContext.h>

namespace facebook { namespace react {

class JSI_EXPORT XxxViewProps final : public ViewProps {
public:
    XxxViewProps() = default;
    XxxViewProps(const PropsParserContext &context, const XxxViewProps &sourceProps, const RawProps &rawProps);

    std::string src{""};
    bool enabled{true};
};

}} // namespace
```

```cpp
// Props.cpp
#include "Props.h"
#include <react/renderer/core/propsConversions.h>

namespace facebook { namespace react {

XxxViewProps::XxxViewProps(
    const PropsParserContext &context,
    const XxxViewProps &sourceProps,
    const RawProps &rawProps)
    : ViewProps(context, sourceProps, rawProps),
      src(convertRawProp(context, rawProps, "src", sourceProps.src, {""})),
      enabled(convertRawProp(context, rawProps, "enabled", sourceProps.enabled, {true})) {}

}} // namespace
```

### C++ EventEmitter

```cpp
// EventEmitters.h
#pragma once
#include <react/renderer/components/view/ViewEventEmitter.h>

namespace facebook { namespace react {

class XxxViewEventEmitter : public ViewEventEmitter {
public:
    using ViewEventEmitter::ViewEventEmitter;

    struct OnChange {
        std::string value;
    };
    void onChange(OnChange event) const;
};

}} // namespace
```

### ComponentInstance 实现

```cpp
// XxxComponentInstance.h
#pragma once
#include "RNOH/CppComponentInstance.h"
#include "Props.h"
#include "EventEmitters.h"

namespace rnoh {

class XxxComponentInstance : public CppComponentInstance<facebook::react::XxxViewProps> {
public:
    XxxComponentInstance(Context context);

    void onPropsChanged(SharedConcreteProps const &props) override;
    void handleCommand(std::string const &commandName, folly::dynamic const &args) override;

private:
    void emitOnChange(const std::string &value);
};

} // namespace rnoh
```

```cpp
// XxxComponentInstance.cpp
#include "XxxComponentInstance.h"

namespace rnoh {

XxxComponentInstance::XxxComponentInstance(Context context)
    : CppComponentInstance(std::move(context)) {}

void XxxComponentInstance::onPropsChanged(SharedConcreteProps const &props) {
    CppComponentInstance::onPropsChanged(props);
    // 响应属性变化
    auto src = props->src;
    auto enabled = props->enabled;
}

void XxxComponentInstance::handleCommand(
    std::string const &commandName, folly::dynamic const &args) {
    if (commandName == "focus") {
        // 处理命令
    }
}

void XxxComponentInstance::emitOnChange(const std::string &value) {
    if (m_eventEmitter) {
        m_eventEmitter->dispatchEvent("change", [value](facebook::jsi::Runtime &runtime) {
            auto payload = facebook::jsi::Object(runtime);
            payload.setProperty(runtime, "value", value.c_str());
            return payload;
        });
    }
}

} // namespace rnoh
```

### C++ Package 注册

```cpp
// XxxPackage.cpp
#include "RNOH/Package.h"
#include "XxxComponentInstance.h"

using namespace rnoh;

class XxxPackage : public Package {
public:
    XxxPackage(Package::Context ctx) : Package(ctx) {}

    ComponentInstance::Shared createComponentInstance(const ComponentInstance::Context &ctx) const override {
        if (ctx.componentName == "XxxView") {
            return std::make_shared<XxxComponentInstance>(ctx);
        }
        return nullptr;
    }
};
```

---

## 第三部分：常见编译错误与修复

### 1. `undefined reference to 'facebook::react::XxxViewProps::XxxViewProps'`

**原因**：Props.cpp 未被 CMakeLists.txt 包含。

**修复**：在 `add_library` 中添加 Props.cpp 源文件。

### 2. `cannot find header 'react/renderer/components/xxx'`

**原因**：React Native 头文件路径不对。

**修复**：确认 include 路径包含 RNOH 和 React Native 头文件目录。

### 3. 属性不更新

**原因**：`onPropsChanged` 未正确处理新属性。

**修复**：在 `onPropsChanged` 中读取 `props->xxx` 并更新组件状态。

### 4. 事件未发送

**原因**：`m_eventEmitter` 为空或事件名不匹配。

**修复**：
- 确认 `m_eventEmitter` 在组件创建后非空
- 事件名需要去掉 `on` 前缀并首字母小写（如 `onChange` → `change`）

### 5. `dispatchViewManagerCommand` 不触发

**原因**：`handleCommand` 中的命令名不匹配。

**修复**：确认命令名与 RN 侧调用的完全一致（大小写敏感）。
