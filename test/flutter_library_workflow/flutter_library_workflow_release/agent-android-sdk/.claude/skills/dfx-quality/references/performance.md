# 性能检查（启动耗时、滑动流畅度、主线程响应）

适用阶段：HAR 编码、Demo 编码与审查。对应官方 DFX 性能检测（APP_LAUNCH / SCROLL_JANK）及故障检测中的主线程阻塞相关事件（MAIN_THREAD_JANK / APP_HICOLLIE / AppFreeze THREAD_BLOCK_6S）。

---

## 1. 启动耗时预防

对应官方性能检测的「启动耗时事件检测」。应用启动过程中（`aboutToAppear`/`onCreate`/`onWindowStageCreate`）应避免同步 I/O 和耗时计算，否则显著拖慢启动。

```typescript
import { fileIo } from '@kit.CoreFileKit';

// ✗ 错误：aboutToAppear 中执行同步 I/O
aboutToAppear() {
  const data = fileIo.readTextSync(this.context.filesDir + '/config.json');
  this.config = JSON.parse(data);
}

// ✓ 正确：异步读取，不阻塞启动
aboutToAppear() {
  fileIo.readText(this.context.filesDir + '/config.json').then(data => {
    this.config = JSON.parse(data);
  });
}

// ✗ 错误：@State 行内初始化耗时计算
@State largeList: number[] = new Array(10000).fill(0).map((_, i) => i * 2);

// ✓ 正确：延迟初始化
@State largeList: number[] = [];
aboutToAppear() {
  setTimeout(() => {
    this.largeList = new Array(10000).fill(0).map((_, i) => i * 2);
  }, 0);
}
```

**官方 DFX 依据**：APP_LAUNCH（从 icon 点击到首帧完成全链路）

**结果处理**：改为异步 API（readTextSync → readText 等），@State 行内初始化移入 aboutToAppear 延迟执行。

---

## 2. 滑动丢帧预防

对应官方性能检测的「滑动丢帧事件检测」：最大单帧耗时 > 50ms 触发上报。编码阶段应预防以下高风险模式：

### 2.1 列表数据项 > 20 时用 LazyForEach

列表（List/Grid/WaterFlow）数据项 > 20 时使用 `LazyForEach` + `IDataSource` 替代 `ForEach`，避免一次性渲染所有项导致丢帧。

```typescript
// ✗ 错误：ForEach 一次性渲染所有项
List() {
  ForEach(this.items, (item) => { ListItem() { /* ... */ } })
}

// ✓ 正确：LazyForEach 按需渲染
List() {
  LazyForEach(this.dataSource, (item) => { ListItem() { /* ... */ } })
}
```

**官方 DFX 依据**：SCROLL_JANK(max_app_frametime > 50ms / max_app_seq_frames > 3)

**结果处理**：改用 LazyForEach + IDataSource。

### 2.2 列表项高度一致

列表项高度一致（ListItem 使用固定 `.height()` 或 `.constraintSize`），避免动态高度导致列表重新布局和丢帧。

```typescript
// ✗ 错误：列表项高度依赖异步数据动态计算
ListItem() {
  Text(this.asyncData) // 高度变化 → 列表重新布局 → 丢帧
}

// ✓ 正确：固定高度
ListItem() {
  Text(this.asyncData).height(80) // 一致高度
}
```

**官方 DFX 依据**：SCROLL_JANK(布局重新计算导致帧耗时超 50ms)

---

## 3. 点击响应

对应官方 MAIN_THREAD_JANK / APP_HICOLLIE。`onClick` 回调中禁止执行同步耗时操作（>100ms），如网络请求、大数据解析。

```typescript
// ✗ 错误：onClick 中同步网络请求
onClick(() => {
  const httpRequest = http.createHttp();
  httpRequest.request('https://api.example.com/data', (err, data) => {
    // 阻塞主线程
  });
})

// ✓ 正确：异步处理
onClick(() => {
  this.loadData(); // async 函数
})
```

**检测方法**：grep `onClick\(` 检查回调体内是否含同步网络请求（`http.createHttp`/`request`）、大数据解析（`JSON.parse` 大对象）或 `fs.readFileSync` 等同步 I/O。

**官方 DFX 依据**：MAIN_THREAD_JANK / APP_HICOLLIE(任务超时 > 5s 触发 dump)

---

## 4. 主线程阻塞预防

对应官方故障检测中的「AppFreeze（应用冻屏）」和「任务超时检测」。主线程（aboutToAppear/onCreate/build/onClick/onPageShow）禁止执行同步 I/O 和 CPU 密集计算，否则会导致界面无响应（AppFreeze）或 ANR。

```typescript
import { taskpool } from '@kit.ArkTS';

// ✗ 错误：主线程同步 I/O 导致冻屏
build() {
  const data = fileIo.readTextSync(this.context.filesDir + '/config.json');
  // ...
}

// ✗ 错误：主线程 CPU 密集计算
onClick() {
  const sorted = this.hugeArray.sort((a, b) => a.value - b.value);
}

// ✓ 正确：TaskPool 异步处理（短时计算）
@Concurrent
function heavySort(data: number[]): number[] {
  return data.sort((a, b) => a - b);
}

onClick() {
  const task = new taskpool.Task(heavySort, this.hugeArray);
  taskpool.execute(task, taskpool.Priority.MEDIUM).then((result: Object) => {
    this.sortedResult = result as number[];
  });
}
```

| 编号 | 检查项 | 检测方法 | 结果处理 |
|------|--------|---------|---------|
| 4-1 | 主线程同步 I/O | 扫描 `aboutToAppear`/`onCreate`/`build`/`onClick`/`onPageShow`/`onPageHide`/`aboutToDisappear` 等主线程上下文中是否有 `fs.readFileSync`/`fs.statSync`/`preferences.getSync` 等同步 API | 改为异步 API（见下方映射表） |
| 4-2 | 主线程 CPU 密集计算 | grep `.sort\(\|JSON.parse(` 等模式，确认回调体内是否直接执行大数据排序/编解码，改用 TaskPool/Worker 卸载 | 卸载到 TaskPool/Worker（见下方完整示例） |

**官方 DFX 依据**：AppFreeze(THREAD_BLOCK_6S / APP_INPUT_BLOCK)

**结果处理**：主线程同步 I/O 改为异步 API；CPU 密集计算卸载到 TaskPool/Worker。

---

## 检查清单与结果处理

### 自动化检测项（fix_performance.py）

| # | 检查项 | 检测方式 | 结果处理 |
|---|--------|---------|---------|
| 1-1 | 启动阶段同步 I/O | 扫描 `aboutToAppear`/`onCreate`/`onWindowStageCreate` 回调体内是否有 `fs.readFileSync`/`fs.statSync`/`preferences.getSync` 等同步 API | 改为异步 API（见下方「同步→异步 API 映射表」） |
| 2-1 | 列表 ForEach → LazyForEach | 检测 List/Grid/WaterFlow 容器内使用了 ForEach | 改用 LazyForEach + IDataSource |
| 4-1 | 主线程同步 I/O | 扫描 `aboutToAppear`/`onCreate`/`build`/`onClick`/`onPageShow`/`onPageHide`/`aboutToDisappear` 回调体内是否有同步 API | 改为异步 API（见下方「同步→异步 API 映射表」） |
| 4-2 | 主线程 CPU 密集计算 | 扫描 `aboutToAppear`/`build`/`onClick`/`onPageShow`/`onPageHide`/`aboutToDisappear` 中是否有 `.sort()`、`JSON.parse()` 大数据操作 | 卸载到 TaskPool/Worker（见下方完整示例） |

### Agent 核对项

| # | 检查项 | 结果处理 |
|---|--------|---------|
| 1-2 | @State 行内初始化不执行耗时计算 | grep `@State.*=\s*(new\s+(Array\|Map\|Set)\(\d+\)\|JSON\.parse\(.+\)\)` 等模式，将耗时初始化移入 `aboutToAppear` 并延迟执行 |
| 2-2 | 列表项高度一致（ListItem 固定高度） | 使用固定高度或 `constraintSize` 设置最小/最大高度 |
| 3-1 | onClick 无耗时操作 | grep `onClick\(` 检查回调体内是否有同步网络请求、大数据解析，改为异步 |

---

### 同步→异步 API 映射表

以下同步 API 在主线程（`aboutToAppear`/`onCreate`/`build`/`onClick`/`onPageShow`）中禁止使用，必须替换为对应的异步 API：

#### 文件 I/O（`import { fileIo } from '@kit.CoreFileKit'`）

| 同步 API（禁用） | 异步 API（推荐） |
|-----------------|----------------|
| `fileIo.readTextSync(path)` | `fileIo.readText(path)` |
| `fileIo.writeTextSync(path, data)` | `fileIo.writeText(path, data)` |
| `fileIo.statSync(file)` | `fileIo.stat(file)` |
| `fileIo.openSync(path, mode)` | `fileIo.open(path, mode)` |
| `fileIo.closeSync(fd)` | `fileIo.close(fd)` |
| `fileIo.readSync(fd, buffer)` | `fileIo.read(fd, buffer)` |
| `fileIo.writeSync(fd, buffer)` | `fileIo.write(fd, buffer)` |
| `fileIo.mkdirSync(path)` | `fileIo.mkdir(path)` |
| `fileIo.rmdirSync(path)` | `fileIo.rmdir(path)` |
| `fileIo.renameSync(old, new)` | `fileIo.rename(old, new)` |
| `fileIo.copyFileSync(src, dst)` | `fileIo.copyFile(src, dst)` |
| `fileIo.accessSync(path)` | `fileIo.access(path)` |
| `fileIo.listFileSync(path)` | `fileIo.listFile(path)` |
| `fileIo.fsyncSync(fd)` | `fileIo.fsync(fd)` |

#### 用户首选项（`import { preferences } from '@kit.ArkData'`）

| 同步 API（禁用） | 异步 API（推荐） |
|-----------------|----------------|
| `preferences.getSync(key, def)` | `preferences.get(key, def)` |
| `preferences.putSync(key, val)` | `preferences.put(key, val)` |
| `preferences.deleteSync(key)` | `preferences.delete(key)` |
| `preferences.hasSync(key)` | `preferences.has(key)` |
| `preferences.clearSync()` | `preferences.clear()` |
| `preferences.flushSync()` | `preferences.flush()` |
| `preferences.sizeSync()` | `preferences.size()` |
| `preferences.reloadSync()` | `preferences.reload()` |

> **注意**：同步方法（`*Sync`）从 API 12 开始可用，但会导致主线程阻塞。仅在后台线程或 Worker 中使用同步方法。

---

### TaskPool 完整示例

适用于 CPU 密集计算（排序、编解码、大数据处理等），将耗时操作从主线程卸载到线程池。

```typescript
import { taskpool } from '@kit.ArkTS';

// 1. 定义 @Task 装饰的函数（API 12+）
//    函数必须为顶层函数或 export 函数，参数和返回值须为可序列化类型
@Concurrent
function heavySort(data: number[]): number[] {
  return data.sort((a, b) => a - b);
}

// 2. 在主线程中执行
@Component
struct MyPage {
  @State sortedResult: number[] = [];

  aboutToAppear() {
    const bigArray = new Array(10000).fill(0).map((_, i) => Math.random() * 10000);
    const task = new taskpool.Task(heavySort, bigArray);
    taskpool.execute(task, taskpool.Priority.MEDIUM).then((result: Object) => {
      this.sortedResult = result as number[];
    });
  }

  build() {
    List() {
      ForEach(this.sortedResult, (item: number) => {
        ListItem() { Text(`${item}`) }
      })
    }
  }
}
```

### Worker 完整示例

适用于长期运行的后台任务（持续监听、数据同步等），创建独立线程。

```typescript
// === 工作线程文件：entry/ets/workers/HeavyWorker.ets ===
import { workerPort } from '@kit.ArkTS';

// 监听主线程消息
workerPort.onmessage = (e: MessageEvents) => {
  const data = e.data as number[];
  const sorted = data.sort((a, b) => a - b);
  // 处理完成后回传结果
  workerPort.postMessage(sorted);
};

// === 主线程文件：entry/ets/pages/Index.ets ===
import { worker } from '@kit.ArkTS';

@Component
struct MyPage {
  private workerInstance: worker.ThreadWorker | null = null;
  @State sortedResult: number[] = [];

  aboutToAppear() {
    // 创建 Worker 实例
    this.workerInstance = new worker.ThreadWorker('entry/ets/workers/HeavyWorker.ets');
    // 监听 Worker 回传结果
    this.workerInstance.onmessage = (e: MessageEvents) => {
      this.sortedResult = e.data as number[];
    };
    // 发送数据到 Worker
    const bigArray = new Array(10000).fill(0).map((_, i) => Math.random() * 10000);
    this.workerInstance.postMessage(bigArray);
  }

  aboutToDisappear() {
    // 组件销毁时终止 Worker
    this.workerInstance?.terminate();
    this.workerInstance = null;
  }

  build() {
    List() {
      ForEach(this.sortedResult, (item: number) => {
        ListItem() { Text(`${item}`) }
      })
    }
  }
}
```

> **TaskPool vs Worker 选择**：短时一次性计算用 TaskPool（自动管理线程复用）；长期运行或需要频繁通信的后台任务用 Worker（独立线程，需手动管理生命周期）。
