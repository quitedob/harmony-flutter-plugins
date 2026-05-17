# Fabric ArkTS 自定义组件鸿蒙适配

## 适用条件

- 模块提供自定义 UI 组件（非 TurboModule）
- 使用 Fabric 架构的 ArkTS 组件实现
- 典型场景：自定义视图、原生地图、WebView、播放器组件

---

## 第一部分：工程配置

### 目录结构

```
{module_name}/
├── src/
│   └── specs/
│       └── v2/
│           ├── XxxNativeComponent.ts      # Fabric 组件 Spec
│           └── NativeXxxModule.ts         # 配套 TurboModule Spec（如有）
├── harmony/
│   └── library/
│       ├── src/main/
│       │   ├── ets/
│       │   │   ├── XxxView.ets            # ArkTS Fabric 组件实现
│       │   │   └── XxxPackage.ets         # Package 注册
│       │   ├── cpp/
│       │   │   ├── CMakeLists.txt
│       │   │   ├── XxxComponentInstance.cpp  # C++ Descriptor 层（可选）
│       │   │   └── XxxComponentInstance.h
│       │   └── module.json5
│       ├── oh-package.json5
│       └── build-profile.json5
├── index.ts
└── package.json
```

### JS Spec 声明（Fabric 组件）

```typescript
// src/specs/v2/XxxNativeComponent.ts
import type { ViewProps, HostComponent } from 'react-native';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type OnChangeEventData = Readonly<{
  value: string;
}>;

interface XxxViewProps extends ViewProps {
  src: string;
  enabled?: boolean;
  onChange?: DirectEventHandler<OnChangeEventData>;
}

export default codegenNativeComponent<XxxViewProps>(
  'XxxView'
) as HostComponent<XxxViewProps>;
```

---

## 第二部分：编码实现

### ArkTS Fabric 组件核心概念

ArkTS Fabric 组件由以下部分组成：

1. **Descriptor** — 封装 RN 侧传递到 ArkUI 的属性参数
2. **EventEmitter** — 从原生向 RN 侧发送事件
3. **CommandReceiver** — 接收 RN 侧的命令调用
4. **ArkUI @Component** — 实际渲染的 ArkUI 组件

### 完整 Fabric 组件实现

```ets
// harmony/library/src/main/ets/XxxView.ets
import {
  Descriptor,
  ViewBaseProps,
  RNComponentContext,
  RNViewBase,
  Tag
} from '@rnoh/react-native-openharmony';

// 1. 定义 Descriptor 类型
export interface XxxViewProps extends ViewBaseProps {
  src: string;
  enabled: boolean;
}

export type XxxViewDescriptor = Descriptor<"XxxView", XxxViewProps>;

// 2. 实现组件
@Component
export struct XxxView {
  public static readonly NAME = "XxxView";
  public ctx!: RNComponentContext;
  public tag: Tag = 0;

  @State private descriptor: XxxViewDescriptor = Object() as XxxViewDescriptor;
  private unregisterDescriptorChangesListener?: () => void;

  aboutToAppear() {
    // 获取 Descriptor
    this.descriptor = this.ctx.descriptorRegistry.getDescriptor<XxxViewDescriptor>(this.tag);

    // 监听属性变化
    this.unregisterDescriptorChangesListener =
      this.ctx.descriptorRegistry.subscribeToDescriptorChanges(this.tag, (newDescriptor) => {
        this.descriptor = newDescriptor as XxxViewDescriptor;
      });

    // 注册命令接收器
    this.ctx.componentCommandReceiver.registerCommandCallback(this.tag, (commandName, args) => {
      if (commandName === "focus") {
        // 处理命令
      }
    });
  }

  aboutToDisappear() {
    this.unregisterDescriptorChangesListener?.();
  }

  build() {
    RNViewBase({ ctx: this.ctx, tag: this.tag }) {
      // ArkUI 组件内容
      Column() {
        Text(this.descriptor.props.src)
          .fontSize(16)
      }
      .width('100%')
      .height('100%')
    }
  }
}
```

### 发送事件到 RN 侧

```ets
// 使用 emitComponentEvent 发送事件
this.ctx.rnInstance.emitComponentEvent(
  this.tag,
  "onChange",
  { value: "newValue", type: "custom" }
);
```

RN 侧接收：

```tsx
<XxxView
  src="content"
  onChange={(e) => {
    const value = e.nativeEvent.value;
    console.log('Changed:', value);
  }}
/>
```

### Package 注册

```ets
// harmony/library/src/main/ets/XxxPackage.ets
import {
  RNOHPackage,
  DescriptorWrapperFactoryByDescriptorTypeCtx,
  DescriptorWrapperFactoryByDescriptorType,
  RNComponentContext,
  Tag
} from '@rnoh/react-native-openharmony';

import { XxxView } from './XxxView';

export class XxxPackage extends RNOHPackage {
  override getArkTSComponents(): Map<string, (ctx: RNComponentContext, tag: Tag) => void> {
    return new Map([
      [XxxView.NAME, (ctx, tag) => {
        // 组件构建逻辑
      }]
    ]);
  }
}
```

### arkTsComponentNames 注册

在 Entry 工程创建 RNApp 或 RNInstance 时注册组件名：

```ets
const arkTsComponentNames = [XxxView.NAME];

RNApp({
  rnInstanceConfig: {
    arkTsComponentNames: arkTsComponentNames
  }
});
```

### buildCustomComponent

在 Entry 工程的 Page 中实现组件构建：

```ets
@Builder
public buildCustomComponent(ctx: ComponentBuilderContext) {
  if (ctx.componentName === XxxView.NAME) {
    XxxView({
      ctx: ctx.rnComponentContext,
      tag: ctx.tag
    })
  }
}

RNSurface({
  buildCustomComponent: this.buildCustomComponent
})
```

---

## 第三部分：常见编译错误与修复

### 1. 组件不渲染（白屏）

**原因**（编译通过但运行异常）：
- 组件名未注册到 `arkTsComponentNames`
- `buildCustomComponent` 中缺少对应组件的 if 分支
- Descriptor 类型名与 JS Spec 中的 `codegenNativeComponent('Name')` 不一致

**修复**：确保三处名称完全一致：
1. JS Spec: `codegenNativeComponent<XxxViewProps>('XxxView')`
2. ETS: `XxxView.NAME = "XxxView"` 和 `Descriptor<"XxxView", ...>`
3. Entry: `arkTsComponentNames` 包含该名称

### 2. `Cannot find name 'RNViewBase'`

**原因**：import 路径不正确。

**修复**：
```ets
import { RNViewBase } from '@rnoh/react-native-openharmony';
```

### 3. `Struct does not comply with the struct syntax`

**原因**：ArkUI 组件（struct）语法不正确。

**修复**：
- `struct` 必须用 `@Component` 装饰
- `struct` 中必须有 `build()` 方法
- `struct` 不能有构造函数，使用公开属性传参
- `struct` 中的方法不能使用 `private` 修饰符

### 4. Descriptor 属性不更新

**原因**：未订阅 Descriptor 变化。

**修复**：在 `aboutToAppear` 中调用 `subscribeToDescriptorChanges`，并在 `aboutToDisappear` 中取消订阅。

### 5. 事件未触发到 RN 侧

**原因**：事件名称不匹配或 `emitComponentEvent` 参数有误。

**修复**：
- 事件名必须与 JS Spec 中的 props 名称一致（如 `onChange` 对应 `onChange`）
- payload 中必须包含 `type` 字段（如 `{ value: ..., type: "custom" }`）

### 6. 命令接收器不工作

**原因**：RN 侧的 `UIManager.dispatchViewManagerCommand` 调用方式有误。

**修复**：
- 确认 `registerCommandCallback` 中的 commandName 与 RN 侧一致
- 确认在 `aboutToAppear` 中注册了命令回调
