# 异步编程安全规则

> 本文件定义鸿蒙 ETS 异步编程的通用规则，适用于所有插件类型。这些问题通常不会导致编译失败，但会导致运行时功能异常（状态不一致、功能失效、竞态条件等）。

---

## 1. 核心规则

> 🚨 **存在时序要求时，同步方法调用异步方法必须 await，否则会产生竞态条件。**

**三条铁律**：
1. 方法内部调用 async 方法且需要等待完成 → 该方法本身必须是 async
2. 多个异步操作需顺序执行（如 `stop → play`）→ 必须使用 await 链
3. MethodChannel handler 调用内部 async → handler 本身改为 async 并 await

---

## 2. 错误模式与后果

```ets
// ❌ 同步方法调用 async 不 await — 竞态条件
setAudioFile(bytes: Uint8Array): void {
  this.mainSound = this.convertBytes(bytes);
  if (this.isPlayingFlag) {
    this.pause();   // async，不 await
    this.play();    // async，不 await — pause() 未完成，isPlayingFlag 仍为 true
    // play() 检查 isPlayingFlag=true 会直接 return → 播放不恢复
  }
}

// ❌ handler 过早返回 success
private handleSetAudioFile(call: MethodCall, result: MethodResult): void {
  this.engine.setAudioFile(bytes);  // async，不 await
  result.success(null);  // Dart 端收到成功，原生端异步可能未完成或失败
}
```

**后果**：
- 竞态条件：异步状态更新未完成，后续代码检查旧状态
- 状态不一致：async 中途失败，同步代码已返回 success
- 功能失效：播放/扫描/监听等状态恢复失败

---

## 3. 正确模式

```ets
// ✅ 方法改为 async，await 链执行
async setAudioFile(bytes: Uint8Array): Promise<void> {
  this.mainSound = this.convertBytes(bytes);
  if (this.isPlayingFlag) {
    await this.pause();  // 等待暂停完成
    await this.play();   // 等待重新播放
  }
}

// ✅ handler 改为 async，等待完成
private async handleSetAudioFile(call: MethodCall, result: MethodResult): Promise<void> {
  await this.engine.setAudioFile(bytes);
  result.success(null);
}
```

---

## 4. 典型场景（必须 async + await）

| 模式类型 | 方法名特征 | 时序要求 |
|---------|-----------|---------|
| 运行态切换配置 | `setXxx`、`setSource`、`setConfig` | `stop → change → start` |
| 重启/刷新操作 | `restart`、`refresh`、`reload` | `stop → start` |
| 模式切换 | `switchMode`、`changeMode` | `stop(old) → start(new)` |
| 多步状态转换 | 任何涉及"先停止再启动"的流程 | 需顺序 await |
| 资源热替换 | 正在使用时更换资源/数据源 | `pause → replace → resume` |

**判断标准**：方法名暗示"切换后继续运行"或代码中存在 `stop → start` / `pause → play` 模式 → 必须 async

---

## 5. 自检清单

编码完成后逐项检查：
- ❓ 方法内部是否调用了 async 方法？
- ❓ 如果是，当前方法是否也是 async？
- ❓ 调用 async 方法时是否使用了 await？
- ❓ 是否有多个 async 方法需要顺序执行？
- ❓ "热切换"方法（正在运行时切换配置）是否为 async？
- ❓ MethodChannel handler 是否等待了内部 async 完成？

**违反任一规则 → 必须修改**

---

## 6. 扩展：异步编程其他注意事项

### 6.1 interface 方法不能直接声明 async

`onMethodCall`、`onListen`、`onCancel` 等接口方法本身不能声明 async，异步逻辑需提取到独立方法：

```ets
// ✅ 正确：接口方法委托给 async 方法
onMethodCall(call: MethodCall, result: MethodResult): void {
  this.handleAsyncMethod(call, result);
}

private async handleAsyncMethod(call: MethodCall, result: MethodResult): Promise<void> {
  await this.doSomethingAsync();
  result.success(null);
}
```