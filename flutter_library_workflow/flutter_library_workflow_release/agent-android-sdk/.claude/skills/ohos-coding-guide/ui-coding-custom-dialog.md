> 前置依赖：阅读本文前请先读 [`ui-coding-reactive-dataflow.md`](./ui-coding-reactive-dataflow.md)
> API 签名和官方用法请从 `harmonyos-docs-lookup` 核实。

# 弹窗 — 官方 CustomDialog / openCustomDialog / 响应式 Host 规则

弹窗、Snackbar、Loading、Toast、启动屏、下拉浮层等都属于“必须渲染到 ArkUI 组件树里”的 UI 能力。不要把纯 class controller 当成视觉组件，也不要 `new` 一个 dialog/component 对象后期待它显示。

## 1. 官方能力选择

| 场景 | 推荐能力 | 关键约束 |
|---|---|---|
| 页面内局部自定义弹窗 | `@CustomDialog` + `CustomDialogController` | controller 由页面/组件持有，`open()` 在事件或生命周期中调用，内容通过 controller 的 builder 创建 |
| 不依赖某个 UI 组件、需要封装或动态更新 | `UIContext.getPromptAction().openCustomDialog` | 必须拿到真实 `UIContext`；`ComponentContent` 方式更解耦且支持 `update` |
| 需要关闭/控制 `openCustomDialog` / `presentCustomDialog` 弹窗 | API 18+ `promptAction.DialogController` | 一个 controller 只能绑定一个弹窗；`getDialogController()` 仅在组件位于弹窗中时可取到 |
| 路由切换时希望弹窗跟随页面 | 页面级弹出框 `levelMode: LevelMode.EMBEDDED` | 仅非子窗模式生效，`showInSubWindow` 不设置或为 `false` |
| HAR 对外提供全局弹窗/Toast/Snackbar/Loading 能力 | Host/Portal + 状态/service，或 host_proxy 提供 `UIContext` | HAR 不能凭空显示 UI；Demo/宿主必须挂载 Host 或提供真实 `UIContext` |

## 2. HAR 迁移默认：Host/Portal 响应式承载

对跨页面、跨 service、库级 `show()` / `dismiss()` 这类能力，优先使用响应式 Host/Portal：库导出可挂载的 Host 组件和状态/service，公开 `show()` / `dismiss()` 只更新状态；宿主页面把 Host 放在根布局或合适容器中。

```typescript
@Observed
export class DialogState {
  visible: boolean = false;
  message: string = '';
}

export class DialogService {
  public state: DialogState = new DialogState();

  show(message: string): void {
    this.state.message = message;
    this.state.visible = true;
  }

  dismiss(): void {
    this.state.visible = false;
  }
}

@Component
export struct DialogHost {
  @ObjectLink state: DialogState;

  build() {
    Stack() {
      if (this.state.visible) {
        Column() {
          Text(this.state.message)
          Button('Close').onClick(() => {
            this.state.visible = false;
          })
        }
      }
    }
  }
}
```

使用方：页面持有同一个 service/state，按钮调用 HAR API，页面根部挂载 HAR Host。这样 `show()` 改的是响应式状态，真正显示由 Host 完成。

## 3. 官方页面局部用法：@CustomDialog + CustomDialogController

`CustomDialogController` 可以用于页面内局部弹窗，但它不是默认的跨库全局 UI 架构。使用时必须满足：

- controller 由实际页面/组件持有，不在无宿主的全局 class 中创建后直接 `open()`。
- dialog 内容通过 `CustomDialogController({ builder: XxxDialog(...) })` 创建。
- 数据来自页面 `@State` / `@Prop` / service state，不依赖临时闭包对象。
- `open` / `close` 路径处理系统 API throw / reject；重复 close 按幂等处理。

```typescript
@CustomDialog
struct ConfirmDialog {
  controller?: CustomDialogController;
  message: string = '';
  onConfirm?: () => void;

  build() {
    Column() {
      Text(this.message)
      Row() {
        Button('Cancel').onClick(() => {
          this.controller?.close();
        })
        Button('OK').onClick(() => {
          this.onConfirm?.();
          this.controller?.close();
        })
      }
    }
  }
}

@Component
struct Page {
  @State private result: string = '';
  private dialogController: CustomDialogController = new CustomDialogController({
    builder: ConfirmDialog({
      message: 'Confirm action?',
      onConfirm: (): void => {
        this.result = 'confirmed';
      }
    })
  });

  build() {
    Column() {
      Button('Open').onClick(() => {
        this.dialogController.open();
      })
      Text(this.result)
    }
  }
}
```

动态数据注意：如果每次打开弹窗的文案、列表、回调都不同，不要依赖已创建 controller 中的旧 builder 快照；可以在打开前重建 controller，或优先使用 Host/Portal / `openCustomDialog(ComponentContent)` 的 `update` 能力。

## 4. 官方全局/解耦用法：openCustomDialog

官方文档推荐通过 `UIContext.getPromptAction()` 获取当前 UI 上下文关联的 `PromptAction`。`openCustomDialog` 有两类常用入参：

- `ComponentContent`：更适合封装，和页面 UI 解耦，打开后可通过 `ComponentContent.update()` / `updateCustomDialog` 更新内容。
- `builder`：必须与上下文绑定，和 UI 有一定耦合，适合保持系统弹窗默认风格或简单自定义。

```typescript
// builder 方式：适合页面内直接打开，需保存 dialogId 用于关闭
this.getUIContext().getPromptAction().openCustomDialog({
  builder: (): void => {
    this.customDialogContent();
  }
}).then((dialogId: number) => {
  this.customDialogId = dialogId;
}).catch((error: BusinessError) => {
  hilog.error(0x0000, 'dialog', `openCustomDialog failed: ${error.code} ${error.message}`);
});

// 关闭 builder 方式打开的弹窗
this.getUIContext().getPromptAction().closeCustomDialog(this.customDialogId);
```

```typescript
// ComponentContent 方式：适合 service 封装，但仍必须持有真实 UIContext
this.contentNode = new ComponentContent(this.getUIContext(), wrapBuilder(buildDialog), params);
this.getUIContext().getPromptAction().openCustomDialog(this.contentNode, options)
  .catch((error: BusinessError) => {
    hilog.error(0x0000, 'dialog', `openCustomDialog failed: ${error.code} ${error.message}`);
  });

// 关闭后释放 ComponentContent
this.getUIContext().getPromptAction().closeCustomDialog(this.contentNode);
this.contentNode.dispose();
```

ComponentContent 限制：它不能用 `@Link` / `@Provide` / `@Consume` 等装饰器同步弹窗页面与内容组件状态；需要动态更新内容时用 `ComponentContent.update()` 或重新创建内容节点。对 HAR 来说，`UIContext` 必须由宿主提供或由 Demo 页面注入，不能伪造。

## 5. API 18+ DialogController / getDialogController

```typescript
// openCustomDialogWithController / presentCustomDialog 可绑定 DialogController
let dialogController: promptAction.CommonController = new promptAction.DialogController();

this.getUIContext().getPromptAction()
  .presentCustomDialog(() => {
    this.customDialogContent(dialogController);
  }, dialogController, options)
  .catch((error: BusinessError) => {
    hilog.error(0x0000, 'dialog', `presentCustomDialog failed: ${error.code} ${error.message}`);
  });
```

规则：

- 一个 `DialogController` 只能绑定一个弹窗，操作只对该弹窗生效。
- `getDialogController()` 只能在当前自定义组件确实显示在弹窗中时获取；如果组件不在弹窗里，结果为 `undefined`。
- controller 当前主要用于关闭/操作已绑定弹窗，不是视觉内容本身。

## 6. 常见错误：对象创建成功但 UI 不显示

以下模式通常只创建了 class/controller 或临时对象，没有把视觉内容挂进组件树：

```typescript
// 错误：把 @CustomDialog / @Component 当普通对象 new
let dialog = new LoadingDialog();
dialog.message = 'Loading';
dialog.show();

// 错误：全局 service 内创建 controller，但页面没有挂载 Host，也没有真实 UIContext
DialogService.show('Saved');
```

是让 HAR 导出 `DialogHost` / `SnackbarHost` / `LoadingHost` 或明确的 `@Component`，由 Demo 挂载并通过 HAR 公开 API 驱动；或者明确要求宿主传入真实 `UIContext`，由 HAR 使用官方 `openCustomDialog` 打开。

## 7. @BuilderParam 与 this 边界

弹窗内容如果通过 `@BuilderParam` 传入，不能依赖父组件 `this` 或父页面易变 `@State` 闭包捕获。复杂可交互内容优先封装为 `@Component + @Prop` / 回调；简单 builder 才用箭头函数包装保留 `this`。

## 8. 编码自检

- [ ] 选择了正确弹窗能力：局部 `CustomDialogController`、全局 `openCustomDialog`、页面级 `levelMode`，或 HAR Host/Portal。
- [ ] 没有把 `@CustomDialog` / `@Component` 当普通对象 `new` 后调用。
- [ ] 没有在无页面/无 Host/无真实 `UIContext` 的全局 service 中直接 `open()`。
- [ ] `open()` / `close()` / `closeCustomDialog()` / `dispose()` 均有异常边界，重复关闭按幂等处理。
- [ ] `ComponentContent` 关闭后释放；动态更新用 `update`，不依赖 `@Link` / `@Provide` / `@Consume`。
- [ ] Demo 验证的是 HAR 公开契约，不是绕过 HAR 自己手写系统弹窗。
