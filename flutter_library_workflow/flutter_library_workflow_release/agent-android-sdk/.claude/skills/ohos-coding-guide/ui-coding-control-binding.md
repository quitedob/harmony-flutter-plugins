> 前置依赖：阅读本文前请先读 [`ui-coding-reactive-dataflow.md`](./ui-coding-reactive-dataflow.md)
> API 签名和官方用法请从 `harmonyos-docs-lookup` 核实。

# 交互控件绑定 — onChange 回写 @State 模式

核心问题：Demo 侧交互控件（Toggle/TextInput/Select/Radio/Rating/DatePicker/TimePicker/TextPicker/Slider 等）的 onChange 回调没有更新 @State，或者 @State 没有传给 HAR 组件的 @Prop，导致 HAR 组件不响应 Demo 交互。

## 1. Demo 控件 onChange 必须回写 @State

Demo 中每一个交互控件的 `onChange` / `onSelect` / `onDateChange` 等回调，**必须**将新值写回对应的 `@State`。否则 `@State` 保持旧值，传给 HAR `@Prop` 的也是旧值，HAR 组件不会响应交互。

```typescript
// ✅ 通用模式：控件 onChange → 回写 @State → 传给 HAR @Prop
@Component
struct DemoPage {
  @State currentValue: number = 0;

  build() {
    Column() {
      Slider({ value: this.currentValue })
        .onChange((value: number) => {
          this.currentValue = value;   // ① 回写 @State
        })

      HarSliderView({
        sliderValue: this.currentValue  // ② @State → @Prop
      })
    }
  }
}
```

## 2. 各控件类型绑定速查表

每种 ArkUI 交互控件都需要将 onChange 回调的新值回写到 @State，再传给 HAR @Prop。

### Slider
```typescript
@State sliderValue: number = 50;
Slider({ value: this.sliderValue, min: 0, max: 100 })
  .onChange((value: number) => { this.sliderValue = value; })
HarComponent({ value: this.sliderValue })
```

### Toggle（Switch / Checkbox）
```typescript
@State isOn: boolean = false;
Toggle({ type: ToggleType.Switch, isOn: this.isOn })
  .onChange((isOn: boolean) => { this.isOn = isOn; })
HarComponent({ enabled: this.isOn })
```

### TextInput / TextArea
```typescript
@State inputText: string = '';
TextInput({ text: this.inputText })
  .onChange((value: string) => { this.inputText = value; })
HarComponent({ text: this.inputText })
```

### Select
```typescript
@State selectedIndex: number = 0;
Select([{ value: 'A' }, { value: 'B' }, { value: 'C' }])
  .selected(this.selectedIndex)
  .onSelect((index: number) => { this.selectedIndex = index; })
HarComponent({ mode: this.selectedIndex })
```

### Radio
```typescript
@State radioValue: string = 'A';
Radio({ value: 'A', group: 'group1' }).checked(this.radioValue === 'A')
  .onChange((isChecked: boolean) => { if (isChecked) { this.radioValue = 'A'; } })
Radio({ value: 'B', group: 'group1' }).checked(this.radioValue === 'B')
  .onChange((isChecked: boolean) => { if (isChecked) { this.radioValue = 'B'; } })
HarComponent({ selectedOption: this.radioValue })
```

### Rating
```typescript
@State ratingValue: number = 3;
Rating({ rating: this.ratingValue })
  .onChange((value: number) => { this.ratingValue = value; })
HarComponent({ score: this.ratingValue })
```

### DatePicker
```typescript
@State selectedDate: Date = new Date();
DatePicker({ selected: this.selectedDate })
  .onChange((value: DatePickerResult) => {
    this.selectedDate = new Date(value.year!, value.month!, value.day!);
  })
HarComponent({ date: this.selectedDate })
```

### TimePicker
```typescript
@State selectedTime: Date = new Date();
TimePicker({ selected: this.selectedTime })
  .onChange((value: TimePickerResult) => {
    const d = new Date(); d.setHours(value.hour!, value.minute!);
    this.selectedTime = d;
  })
HarComponent({ time: this.selectedTime })
```

### TextPicker
```typescript
@State pickedText: string = '';
@State pickedIndex: number = 0;
TextPicker({ range: ['A', 'B', 'C'] })
  .onChange((value: string | string[], index: number | number[]) => {
    if (typeof value === 'string') { this.pickedText = value; }
    if (typeof index === 'number') { this.pickedIndex = index; }
  })
HarComponent({ text: this.pickedText, index: this.pickedIndex })
```

## 3. Demo 发现 HAR 接口缺陷时必须先修 HAR

若发现 HAR 组件的外部可配置属性以 `@State private` 实现（宿主无法传入），**必须先修改 HAR 将其改为 `@Prop`**，再编写 Demo。**禁止**用包装或临时变量绕过 HAR 接口缺陷。

常见需要修复的 HAR 接口缺陷：
- `@State private` 声明的外部配置项 → 改为 `@Prop`
- 回调属性用 `@Prop` 声明 → 改为无装饰器属性
- 缺少必要的事件回调属性 → 添加无装饰器回调属性

## 4. 回调中的状态完整替换

当 onChange 返回的是增量信息（如滑块位置 → 饱和度值），而 @State 是聚合对象（如完整 ARGB 颜色）时，回调必须根据旧值构造完整新值再整体赋值 @State。

```
// ❌ 仅更新局部变量，父 @State 和其他子组件感知不到
onSaturationChange: (sat) => { this.satVal = sat; }

// ✅ 回调中构造完整新值，整体替换 @State
onSaturationChange: (sat) => {
  this.currentColor = hsvToArgb(oldHue, sat, oldValue);
}
```

适用场景：任何通过系统控件（Slider/Toggle/Select 等）只修改了父 @State 对象中某几个字段的场景。核心原则：@State 永远是整体替换，不是增量修改。

---
### 参考
- `harmonyos-docs-lookup`：Slider/Toggle/TextInput/Select/Radio/Rating/DatePicker/TimePicker/TextPicker 组件文档
