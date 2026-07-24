# 功耗检查（后台资源释放与传感器/定位/扫描生命周期）

适用阶段：HAR 编码、Demo 编码与审查。确保应用在退至后台后不会因传感器、定位、动画、扫描等资源未释放导致功耗异常，对应官方 DFX 功耗检测（CPU_USAGE_HIGH / BATTERY_USAGE）。

---

## 1. 传感器注册/注销不配对

`sensor.on(sensor.SensorId.XXX, callback)` 注册的传感器数据订阅必须有对应的 `sensor.off(sensor.SensorId.XXX, callback)` 取消订阅。传感器类型覆盖 **21 种**：ACCELEROMETER、ACCELEROMETER_UNCALIBRATED、LINEAR_ACCELEROMETER、GRAVITY、GYROSCOPE、GYROSCOPE_UNCALIBRATED、SIGNIFICANT_MOTION、PEDOMETER_DETECTION、PEDOMETER、AMBIENT_TEMPERATURE、MAGNETIC_FIELD、MAGNETIC_FIELD_UNCALIBRATED、HUMIDITY、BAROMETER、ORIENTATION、ROTATION_VECTOR、PROXIMITY、AMBIENT_LIGHT、HEART_RATE、WEAR_DETECTION、HALL。

**注意**：`sensor.once(sensorId, callback)` 是一次性获取，**不需要** `sensor.off()` 配对。

官方文档明确要求：**"传感器数据订阅和取消订阅接口成对调用，当不再需要订阅传感器数据时，开发者需要调用取消订阅接口停止数据上报。"**

```typescript
// ✗ 错误：注册了传感器但未注销
aboutToAppear() {
  sensor.on(sensor.SensorId.ACCELEROMETER, this.onData);
}

// ✓ 正确：aboutToDisappear 中反注册
aboutToAppear() {
  sensor.on(sensor.SensorId.ACCELEROMETER, this.onData);
}
aboutToDisappear() {
  sensor.off(sensor.SensorId.ACCELEROMETER, this.onData);
}

// ✓ 正确：onPageHide/onPageShow 生命周期控制
onPageHide() {
  sensor.off(sensor.SensorId.ACCELEROMETER, this.onData);
}
onPageShow() {
  sensor.on(sensor.SensorId.ACCELEROMETER, this.onData);
}
```

**官方 DFX 依据**：BATTERY_USAGE(sensor)

**结果处理**：在 aboutToDisappear/onPageHide 中补充 sensor.off()。

---

## 2. 动画后台未停止

### 2.1 requestAnimationFrame（JS/Web 范式）

`requestAnimationFrame(callback)` 必须在页面或组件销毁时通过 `cancelAnimationFrame(id)` 终止，否则动画帧会在后台持续运行消耗 GPU 资源。

```typescript
// ✗ 错误：动画帧未在销毁时取消
onPageShow() {
  this.requestId = requestAnimationFrame(this.step);
}

// ✓ 正确：onPageHide 停止
onPageHide() {
  cancelAnimationFrame(this.requestId);
}
```

### 2.2 ohos.animator（ArkTS 声明式范式）

`createAnimator(options)` 返回的 AnimatorResult 对象必须在 `onPageHide` 或 `aboutToDisappear` 中调用 `cancel()` 或设置为 `undefined` 释放。

```typescript
// ✗ 错误：AnimatorResult 未在页面隐藏时清理
onPageShow() {
  this.animator = this.getUIContext().createAnimator(options);
  this.animator.onFrame = (v) => { /* ... */ };
  this.animator.play();
}

// ✓ 正确：onPageHide 中清理
onPageHide() {
  if (this.animator) { this.animator.cancel(); this.animator = undefined; }
}
```

**官方 DFX 依据**：CPU_USAGE_HIGH(GPU 后台持续渲染)

**结果处理**：onPageHide 中 cancelAnimationFrame 或 animator.cancel()/= undefined。

---

## 3. 定位 on('locationChange') 无 off

`geoLocationManager.on('locationChange', request, callback)` 必须有对应的 `geoLocationManager.off('locationChange', callback)` 注销。官方文档明确：**"如果不主动结束定位可能导致设备功耗高，耗电快；建议在不需要获取定位信息时及时结束定位。"**

```typescript
// ✗ 错误：持续定位无注销
geoLocationManager.on('locationChange', request, this.locationCallback);

// ✓ 正确：aboutToDisappear 中注销
aboutToDisappear() {
  geoLocationManager.off('locationChange', this.locationCallback);
}
```

**官方 DFX 依据**：BATTERY_USAGE(gps)

**结果处理**：在 aboutToDisappear 中调用 geoLocationManager.off()。

---

## 4. WiFi/BLE 扫描监听未注销

### 4.1 WiFi 扫描

`wifiManager.on("wifiScanStateChange", func)` 必须有对应的 `wifiManager.off("wifiScanStateChange", func)` 注销。

```typescript
// ✗ 错误：扫描监听未注销
wifiManager.on("wifiScanStateChange", this.onScanState);

// ✓ 正确
wifiManager.off("wifiScanStateChange", this.onScanState);
```

### 4.2 BLE 扫描

`ble.on('BLEDeviceFind', callback)` 或 `bleScanner.on('BLEDeviceFind', callback)` 必须有对应的 `off` 注销。

```typescript
// ✗ 错误：BLE 扫描监听未注销
ble.on('BLEDeviceFind', this.onDeviceFound);

// ✓ 正确
ble.off('BLEDeviceFind', this.onDeviceFound);
```

**官方 DFX 依据**：BATTERY_USAGE(wifi/rom)

**结果处理**：在 aboutToDisappear/onPageHide 中补充 wifiManager.off()/ble.off()。

---

## 5. 后台资源管理

页面不可见时（`onPageHide`/`aboutToDisappear`）应及时释放网络请求、定时器、RunningLock 等后台资源，避免功耗异常。

```typescript
// ✗ 错误：页面隐藏后定时器仍在运行
onPageShow() { this.timer = setInterval(this.refreshData, 1000); }
// ✓ 正确：onPageHide 清理
onPageHide() { clearInterval(this.timer); }
```

**官方 DFX 依据**：CPU_USAGE_HIGH（前台 > 30%/后台 > 10%/单线程 > 70%）

---

## 6. 音频资源与后台 CPU 占用

### 6.1 音频资源后台释放

`AudioRenderer` 或 `AudioCapturer` 实例在页面不可见时须调用 `.release()` 释放，否则音频流在后台持续占用音频输出资源。

```typescript
// ✗ 错误：音频资源未在页面隐藏时释放
aboutToAppear() {
  this.audioRenderer = await audio.createAudioRenderer(options);
  this.audioRenderer.start();
}

// ✓ 正确：onPageHide 中释放
onPageHide() {
  if (this.audioRenderer) {
    this.audioRenderer.stop();
    this.audioRenderer.release();
    this.audioRenderer = undefined;
  }
}
```

检测说明：fix_power.py 做模式配对检测（`createAudioRenderer`/`AudioRenderer` 构造函数 + 无 `.release()` 调用标记告警），配对不完整时 Agent 按此处指引逐文件核对。

**官方 DFX 依据**：BATTERY_USAGE(audio)

**结果处理**：在 onPageHide 中调用 stop() + release()。

### 6.2 后台 CPU 持续占用

页面不可见时，长时间运行的计算循环（`while(true)`、`for(;;)`）或高频轮询（`setInterval`/`setTimeout` 未配对 `clearInterval`/`clearTimeout`）应在 `onPageHide`/`aboutToDisappear` 中暂停。

```typescript
// ✗ 错误：后台轮询未暂停
onPageShow() { this.timer = setInterval(this.pollData, 500); }

// ✓ 正确：onPageHide 暂停
onPageHide() { clearInterval(this.timer); }

// ✗ 错误：无限循环占用后台 CPU
aboutToAppear() {
  while (true) { this.processData(); }
}
```

检测说明：fix_power.py 做模式配对检测（`setInterval`/`setTimeout` 计数 vs `clearInterval`/`clearTimeout` 计数；无限循环 `while(true)`/`for(;;)` 在生命周期函数中标记告警），其余由 Agent 按此处指引逐文件核对。

**官方 DFX 依据**：CPU_USAGE_HIGH(后台 > 10%)

**结果处理**：在 onPageHide 中 clearInterval/clearTimeout；无限循环用 flag 控制停止。

---

## 检查清单与结果处理

### 自动化检测项（fix_power.py）

| # | 检查项 | 检测方式 | 结果处理 |
|---|--------|---------|---------|
| 1-1 | 传感器注册/注销不配对 | 计数 `sensor.on(sensor.SensorId.XXX)` vs `sensor.off(sensor.SensorId.XXX)`，排除 `sensor.once()` | 补充 `aboutToDisappear`/`onPageHide` 中的 `sensor.off()` |
| 2-1 | `requestAnimationFrame` 未取消 | 扫描 `requestAnimationFrame` 出现且无 `cancelAnimationFrame` | 补充 `cancelAnimationFrame` 到 `onPageHide`/`onDestroy` |
| 2-2 | `ohos.animator` 未清理 | 扫描 `createAnimator` 出现且无 `.cancel()`/`= undefined` | 补充 `onPageHide` 中的清理逻辑 |
| 3-1 | 定位 `on('locationChange')` 无 `off` | 计数 `geoLocationManager.on(.*locationChange` vs `off(.*locationChange` | 补充 `geoLocationManager.off()` |
| 4-1 | WiFi 扫描监听未注销 | 计数 `wifiManager.on(` vs `wifiManager.off(` | 补充 `wifiManager.off()` |
| 4-2 | BLE 扫描监听未注销 | 计数 `ble.on(` / `bleScanner.on(` vs 对应 `off` | 补充 `ble.off()` / `bleScanner.off()` |
| 6-1 | 音频资源后台释放 | 扫描 `createAudioRenderer`/`new AudioRenderer` + 检查同文件是否有 `.release()` | 补充 `onPageHide` 中的 stop() + release() |
| 6-2 | 后台 CPU 持续占用 | 扫描 `setInterval`/`setTimeout` vs `clearInterval`/`clearTimeout` 配对；扫描生命周期函数中 `while(true)`/`for(;;)` | 暂停或取消后台轮询 |

### Agent 核对项

| # | 检查项 | 检测方法 | 结果处理 |
|---|--------|---------|---------|
| 5-1 | 后台网络请求未取消 | 扫描 `httpRequest.request`/`ws.connect` 等网络 API，确认 `onPageHide`/`aboutToDisappear` 中有对应 `destroy()`/`close()` | 页面不可见时调用 `httpRequest.destroy()` / `ws.close()` |
| 5-2 | 后台定时器未清除 | 扫描 `setInterval`/`setTimeout`，确认 `onPageHide`/`aboutToDisappear` 中有对应 `clearInterval`/`clearTimeout` | `onPageHide` 中调用 `clearInterval`/`clearTimeout` |
| 5-3 | RunningLock 后台未释放 | 扫描 `@ohos.runningLock` + `hold(`，确认 `aboutToDisappear` 中有 `unhold()` | `@ohos.runningLock`（`hold(timeout)`/`unhold()`）在 `aboutToDisappear` 中释放 |
| 5-4 | 后台任务无规范管理 | 扫描 `setInterval`/`setTimeout` 高频调用，确认使用了 `backgroundTaskManager` | 使用 `backgroundTaskManager.requestSuspendDelay()`（短时延迟）或 `startBackgroundRunning()`（长时后台任务）|
