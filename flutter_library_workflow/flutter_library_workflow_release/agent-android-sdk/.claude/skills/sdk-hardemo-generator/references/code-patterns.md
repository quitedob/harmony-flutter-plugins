# 代码模式参考

## 回调类操作完整示例

```typescript
@State result: string = '等待操作...';
@State callbackReceived: boolean = false;
@State callbackCount: number = 0;

Button('切换状态')
  .id('btn_toggle')
  .onClick(() => {
    const oldState = this.checked;
    this.checked = !this.checked;
    this.callbackReceived = false;
    this.result = `toggle: ${oldState} → ${this.checked}`;
    setTimeout(() => {
      if (!this.callbackReceived) {
        this.result += '\n⚠️ 回调未触发（可能接口缺陷）';
      }
    }, 500);
  })

.setOnCheckedChangeListener((isChecked: boolean) => {
  this.callbackReceived = true;
  this.callbackCount++;
  this.result = `OnChangeListener #${this.callbackCount}: isChecked=${isChecked}`;
})
```

## 展示型UI完整示例

```typescript
@State scrollOffset: number = 0;
@State result: string = '等待滚动操作...';

List({ space: 0 }) { ... }
  .onScroll((offset: number) => {
    this.scrollOffset += offset;
    const pos = Math.max(1, Math.min(Math.floor(Math.max(0, this.scrollOffset) / 48), this.itemCount - 1));
    const headerId = this.getHeaderId(pos);
    this.result = `当前头部ID: ${headerId} | 滚动偏移: ${this.scrollOffset}vp`;
  })
```

## 组合行为验证示例

```typescript
.onScroll((offset: number) => {
  this.scrollOffset += offset;
  const headerId = this.getHeaderId(pos);
  const subHeaderId = this.getSubHeaderId(pos);
  const mainHeaderSticky = headerId !== NO_HEADER_ID;
  const subHeaderSticky = subHeaderId !== NO_HEADER_ID;
  const subHeaderBelowMain = mainHeaderSticky && subHeaderSticky;
  
  if (subHeaderBelowMain) {
    this.result = `主头部ID: ${headerId} | 子头部ID: ${subHeaderId}\n状态: 形成层级结构，主头部吸顶，子头部吸附在主头部下`;
  } else {
    this.result = `主头部ID: ${headerId} | 子头部ID: ${subHeaderId}\n状态: ⚠️ 未形成层级结构`;
  }
})
```

## 无法测试API的处理示例

```typescript
Button('setChecked(true)')
  .onClick(() => {
    this.result = 'setChecked(true): ⚠️ 无法测试 - ArkTS父组件无法调用子组件方法';
  })

// 替代方式
Button('点击组件触发toggle')
  .onClick(() => {
    this.result = 'setChecked: 通过替代方式(点击组件触发toggle)验证';
  })
```

## Action区示例代码

**示例代码一，输入框 + 按钮模式（正则表达式匹配）**
```typescript
// 步骤3: 【正则表达式】输入框 + 【匹配】按钮
Text('正则表达式')
  .fontSize(14)
  .fontWeight(FontWeight.Medium)
  .margin({ bottom: 4 })

TextInput({ placeholder: '输入正则表达式模式（如hello）' })
  .id('input_regex_pattern')
  .width('100%')
  .margin({ bottom: 8 })
  .onChange((value: string) => {
    this.inputValue = value;
  })

Text('测试文本')
  .fontSize(14)
  .fontWeight(FontWeight.Medium)
  .margin({ bottom: 4 })

TextInput({ placeholder: '输入待匹配的文本（如Hello World）' })
  .id('input_test_text')
  .width('100%')
  .margin({ bottom: 8 })
  .onChange((value: string) => {
    this.inputValue2 = value;
  })

Button('匹配')    // ⚠ 按钮文字必须与【匹配】一致，不得写"执行测试操作"
  .id('btn_match')
  .onClick(() => {
    // 调用 QuickJS 执行 /pattern/i 正则匹配
  })
```

**示例代码二，下拉菜单 + 按钮模式（类型选择创建值）**
```typescript
// 步骤3: 【类型选择】下拉菜单 + 【创建】按钮
Text('类型选择')
  .fontSize(14)
  .fontWeight(FontWeight.Medium)
  .margin({ bottom: 4 })

Select([{ value: 'String' }, { value: 'Number' }, { value: 'Boolean' },
        { value: 'Null' }, { value: 'Undefined' }])
  .id('select_type')
  .selected(0)
  .value('String')
  .width('100%')
  .margin({ bottom: 8 })
  .onSelect((index: number, value: string) => {
    this.selectedType = value;
  })

TextInput({ placeholder: '输入字符串（如hello）' })
  .id('input_string_value')
  .width('100%')
  .margin({ bottom: 8 })
  .onChange((value: string) => {
    this.inputValue = value;
  })

Button('创建')    // ⚠ 按钮文字必须与【创建】一致，不得写"创建String值"
  .id('btn_create')
  .onClick(() => {
    // 根据 selectedType 创建对应 JS 值
  })
```

**示例代码三，数据超出下边界，在逻辑侧校验而非UI侧**
```typescript
// 关键在于使用 InputType.Normal 而非 InputType.Number
@Entry
@Component
struct BoundaryTestPage {
  @State inputValue: string = '';      // UI 绑定值（字符串）
  @State clampedValue: number = 0;     // 实际使用值（数值）
  @State result: string = '';

  build() {
    Column() {
      // UI 侧：使用 Normal 类型，允许输入任意字符
      Text('透明度值 (可输入负数测试边界):')
        .fontSize(14)
      
      TextInput({ placeholder: '输入透明度值', text: this.inputValue })
        .type(InputType.Normal)  // 关键：使用 Normal 而非 Number
        .onChange((value: string) => {
          this.inputValue = value;  // 仅保存原始输入
        })
        .width('100%')
        .margin({ bottom: 8 })

      Button('设置透明度')
        .onClick(() => {
          // 逻辑侧：输入校验与转换
          let numValue = Number.parseInt(this.inputValue);
          
          // 处理非数字输入
          if (isNaN(numValue)) {
            this.result = '错误：请输入有效数字';
            return;
          }
          
          // 边界处理：负数钳位到最小值
          this.clampedValue = numValue < 0 ? 0 : numValue;
          
          // 更新结果
          this.result = `输入: ${this.inputValue}, 实际使用: ${this.clampedValue}`;
          
          // 调用组件 API
          // this.seekBarCompat.thumbAlpha = this.clampedValue;
        })
        .width('100%')
    }
  }
}
```
**示例代码四，组件触摸状态回调示例**
```typescript
// === 组件侧 ===
@Component
export struct LCardListItem {
  public onTouchStateChange?: (pressed: boolean) => void;  // 暴露回调

  private handleTouch(event: TouchEvent): void {
    if (event.type === TouchType.Down) {
      this.applyPressedState();
      this.onTouchStateChange?.(true);  // 通知外部
      return;
    }
    if (event.type === TouchType.Up || event.type === TouchType.Cancel) {
      this.restorePressedState();
      this.onTouchStateChange?.(false);  // 通知外部
    }
  }
}

// === 页面侧 ===
@State result: string = '等待操作...';

LCardListItem({
  onTouchStateChange: (pressed: boolean): void => {
    this.result = pressed ? '【按下状态】...' : '【松手恢复】...';
  }
})
```

**示例代码五，输入控件状态分离**
```typescript
// 场景：测试超范围进度值被正确处理（F-01-16）
@Entry
@Component
struct ProgressInputTestPage {
  @State progressText: string = '0';   // 输入显示状态
  @State progress: number = 0;          // 核心业务状态
  @State max: number = 100;
  @State result: string = '等待操作...';

  // ✓ 正确：onChange 只更新输入显示
  private onProgressTextChanged(value: string): void {
    this.progressText = value;
  }

  // ✓ 正确：onSubmit/onBlur 执行业务逻辑和边界检查
  private commitProgressText(): void {
    const next = Number.parseInt(this.progressText);
    
    // 非数字校验
    if (Number.isNaN(next)) {
      this.result = 'setProgress(' + this.progressText + ') → error: 请输入数字';
      return;
    }
    
    // 边界检查 + 超范围恢复
    if (next < 0 || next > this.max) {
      this.progressText = this.progress.toString();  // 恢复输入框显示
      this.result = 'setProgress(' + next.toString() + ') → ignored | 保持原状态';
      return;
    }
    
    // 业务逻辑
    this.progress = next;
    this.result = 'setProgress(' + next.toString() + ') → current=' + this.progress;
  }

  build() {
    Column() {
      Text('进度值')
        .fontSize(14)
      
      TextInput({ placeholder: '输入进度值，如 50', text: this.progressText })
        .id('input_progress')
        .width('100%')
        .onChange((value: string) => {
          this.onProgressTextChanged(value);  // 只更新显示
        })
        .onSubmit(() => {
          this.commitProgressText();  // 回车确认
        })
        .onBlur(() => {
          this.commitProgressText();  // 失焦确认
        })
      
      Button('重置')
        .onClick(() => {
          this.progress = 0;
          this.progressText = '0';
        })
    }
  }
}

// ✗ 错误：onChange 执行业务逻辑
private applyProgressText(value: string): void {
  this.progressText = value;
  const next = Number.parseInt(value);
  if (next < 0 || next > this.max) {
    return;  // 超范围时 return，但用户输入过程中的中间值已修改 progress
  }
  this.progress = next;  // 中间值 '1', '15' 会修改 progress
}

TextInput({ text: this.progressText })
  .onChange((value: string) => {
    this.applyProgressText(value);  // 每次文本变化都触发
  })

// 结果：用户输入 '150' 时，progress 会先变成 1，再变成 15，最终保持 15
// 无法恢复到原始值
```

**示例代码六，组件事件绑定**
```typescript
// === 组件侧：内部已定义 onClick ===
@Component
export struct LCardListItem {
  public onItemClick?: (index: number) => void;  // 暴露回调属性

  build() {
    Stack() {
      // ... 卡片内容
    }
    .onClick((): void => {
      this.playAnimation();      // 内部动画逻辑
      this.onItemClick?.(this.index);  // 通过回调通知外部
    })
  }

  private playAnimation(): void {
    // 点击动画实现
  }
}

// === 页面侧 ===
// ✗ 错误：使用 .onClick() 覆盖组件内部事件
LCardListItem({ index: 0, title: '卡片' })
  .onClick(() => {
    this.onCardClick(0);  // 动画不触发！组件内部 onClick 被覆盖
  })

// ✓ 正确：使用组件提供的回调属性
LCardListItem({
  index: 0,
  title: '卡片',
  onItemClick: (index: number): void => {
    this.onCardClick(index);  // 动画正常触发，状态正常更新
  }
})
```

**示例代码七，组件尺寸约束正确方式**
```typescript
// === 组件侧：内部已定义高度 ===
@Component
export struct LCardListItem {
  build() {
    Stack() {
      // 图片 height=200 + 文字 height=50 = 250
      Column() {
        Image(...)
          .height(200)
        Text(...)
          .height(50)
      }
    }
    .width('100%')
    .height(this.isInteractive ? 270 : 250)  // 内部固定高度 250~270
  }
}

// === 页面侧 ===
// ✗ 错误：设置比组件内部更小的高度
List({ space: 8 }) {
  ListItem() {
    LCardListItem({ ... })
      .width('100%')
      .height(80)  // 组件内部需要 250，外部只给 80
  }
  ListItem() {
    LCardListItem({ ... })
      .height(80)  // 内容溢出，与上一个卡片重叠
  }
}

// ✓ 正确：不设置高度，让组件使用内部尺寸
List({ space: 8 }) {
  ListItem() {
    LCardListItem({ ... })
      .width('100%')  // 不设置 height，组件内部 250 生效
  }
  ListItem() {
    LCardListItem({ ... })
      .width('100%')
  }
}
```

**示例代码八，点击按钮并观察**
```typescript
// 步骤 5: 点击【查看可筛选信号】按钮
// 步骤 6: 观察【信号列表】区域
@State signalListText: string = '待获取';
// 按钮操作
Button('查看可筛选信号')
  .onClick(async () => {
    const signals = await this.getSignals();
    this.signalListText = this.formatSignals(signals);  // 更新状态
  })

// 观察区域：信号列表展示
Text('信号列表')
  .fontSize(14)
  .fontWeight(FontWeight.Medium)
  .margin({ bottom: 4 })

Text(this.signalListText)
  .id('txt_signal_list')
  .fontSize(12)
  .width('100%')
  .margin({ bottom: 8 })
```

**示例代码九，TextInput 状态绑定正确实现**
```typescript
// 场景：用户输入两个字符串，计算 N-Gram 距离
// 典型错误：onChange 空回调 + distance 硬编码字符串

@Entry
@Component
struct NGramDistancePage {
  @State result: string = '等待操作...';
  @State input1: string = '';  // ✓ 必须声明 @State 变量
  @State input2: string = '';

  build() {
    Column() {
      // 字符串1 输入区
      Text('字符串1')
        .fontSize(14)
      
      // ✓ 正确：TextInput 绑定 @State，onChange 保存输入
      TextInput({ placeholder: '输入字符串1', text: this.input1 })
        .id('input_str1')
        .width('100%')
        .margin({ bottom: 8 })
        .onChange((v: string) => {
          this.input1 = v;  // ✓ 必须保存输入
        })

      // 字符串2 输入区
      Text('字符串2')
        .fontSize(14)
      
      TextInput({ placeholder: '输入字符串2', text: this.input2 })
        .id('input_str2')
        .width('100%')
        .margin({ bottom: 8 })
        .onChange((v: string) => {
          this.input2 = v;  // ✓ 必须保存输入
        })

      // 计算按钮
      Button('计算距离')
        .id('btn_calc')
        .onClick(() => {
          try {
            const ngram = new NGram();
            // ✓ 正确：使用 this.input1/input2 用户输入值
            const res = ngram.distance(this.input1, this.input2);
            this.result = `距离: ${res}`;
          } catch (e) {
            this.result = '错误: ' + (e as Error).message;
          }
        })
        .width('100%')
    }
  }
}

// ✗ 错误实现（本次修复的典型缺陷）
@Entry
@Component
struct WrongNGramPage {
  @State result: string = '等待操作...';
  // ✗ 未声明 input1/input2 状态变量

  build() {
    Column() {
      // ✗ onChange 空回调，用户输入被丢弃
      TextInput({ placeholder: '输入字符串1', text: '' })
        .onChange((v: string) => { })  // 空回调！

      TextInput({ placeholder: '输入字符串2', text: '' })
        .onChange((v: string) => { })  // 空回调！

      Button('计算距离')
        .onClick(() => {
          const ngram = new NGram();
          // ✗ 硬编码字符串，无论用户输入什么都返回相同结果
          const res = ngram.distance('night', 'day');
          this.result = `距离: ${res}`;  // 永远是 distance('night','day')
        })
    }
  }
}
```

**示例代码十，HAR 方法调用 vs 属性访问**
```typescript
// 需要先区分是方法还是属性，以下是方法调用的例子
// 场景：调用 HAR 库 Bytes.length() 方法
// 典型错误：将方法误用为属性，导致模板字符串输出 "Cannot get source code"

@Entry
@Component
struct BytesLengthPage {
  @State result: string = '等待操作...';

  build() {
    Column() {
      Button('获取长度')
        .onClick(() => {
          const bytes = Bytes.wrap([0x01, 0x02, 0x03]);
          
          // ✗ 错误：bytes.length 是函数对象，不是返回值
          // 模板字符串尝试将函数转为字符串，ArkTS 返回 "Cannot get source code"
          // this.result = `长度: ${bytes.length}`;  // 输出: "长度: Cannot get source code"
          
          // ✓ 正确：bytes.length() 调用方法获取返回值
          this.result = `长度: ${bytes.length()}`;  // 输出: "长度: 3"
        })
    }
  }
}
---

## 异步数据获取回调示例（图片加载）

**关键**：HAR 异步回调返回的是 `Resource<T>` 包装类，不是原始数据。必须从 `resource.data` 提取实际数据。

```typescript
import { image } from '@kit.ImageKit';
import {
  Glide,
  ContextProvider,
  RequestManager,
  RequestTarget,
  GlideException,
  DataSource,
  NoOpLifecycleObserver,
  Resource  // 必须导入 Resource
} from 'library';

class DemoContextProvider implements ContextProvider {
  private context: common.UIAbilityContext;
  constructor(context: common.UIAbilityContext) {
    this.context = context;
  }
  getCacheDir(): string { return this.context.cacheDir; }
  getFilesDir(): string { return this.context.filesDir; }
  getLifecycleObserver() { return new NoOpLifecycleObserver(); }
  getUIAbilityContext() { return this.context; }
}

// ✓ 正确实现：从 Resource.data 提取 PixelMap
class ImageLoadTarget implements RequestTarget {
  private onSuccess: (pixelMap: image.PixelMap) => void;
  private onFail: (error: GlideException) => void;

  constructor(
    onSuccess: (pixelMap: image.PixelMap) => void,
    onFail: (error: GlideException) => void
  ) {
    this.onSuccess = onSuccess;
    this.onFail = onFail;
  }

  onLoadStarted(placeholder: Object | null): void {}

  onResourceReady(resource: Object, dataSource: DataSource): void {
    // 必须检查 Resource 类型并提取 data
    if (resource !== null && resource instanceof Resource) {
      let wrapped: Resource<image.PixelMap> = resource as Resource<image.PixelMap>;
      this.onSuccess(wrapped.data);  // ✓ 从 Resource.data 获取 PixelMap
    }
  }

  onLoadFailed(error: GlideException): void {
    this.onFail(error);
  }

  onLoadCleared(placeholder: Object | null): void {}
}

// ✗ 错误实现：直接强转 Resource 为 PixelMap
class WrongImageLoadTarget implements RequestTarget {
  onResourceReady(resource: Object, dataSource: DataSource): void {
    // ✗ 错误：resource 是 Resource<PixelMap> 包装类，不是 PixelMap
    this.onSuccess(resource as image.PixelMap);  // 会导致图片无法显示
  }
}
```

**数据流追溯**：
1. `Engine.load()` 返回 `Promise<Resource<image.PixelMap>>`
2. `SingleRequest.onResourceReady()` 调用 `target.onResourceReady(resource, dataSource)`
3. `resource` 是 `Resource<Object>` 包装类，实际数据在 `resource.data` 字段

**参考 HAR 内部实现**：
- `library/src/main/ets/core/RequestBuilder.ets` → `SubmitTarget.onResourceReady()` (第 657-689 行)
- `library/src/main/ets/core/Resource.ets` → `Resource.data` 字段定义