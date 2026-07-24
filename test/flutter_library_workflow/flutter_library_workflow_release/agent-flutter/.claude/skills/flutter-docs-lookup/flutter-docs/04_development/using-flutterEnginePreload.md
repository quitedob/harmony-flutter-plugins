# FlutterEnginePreload User Guide

`FlutterEnginePreload` aims to accelerate the rendering of hybrid applications combining native and Flutter, optimizing user experience. The core idea is to move part of the execution logic to the moment of user interaction (e.g., button press) instead of executing it after the event is triggered (e.g., button release).

## Prerequisites

+ The application needs a mechanism to navigate from a native page to a Flutter page. For instance, when a user clicks a button to navigate, preloading can be used to speed up Flutter page rendering.
+ Flutter version 3.22 or above is required.

---

## Steps to Use

In the native `arkts` page, first import the following utility class:

    import { FlutterEnginePreload } from '@ohos/flutter_ohos';

### External Interfaces Provided

`FlutterEnginePreload` provides two core interfaces:

1. **`preloadEngine`**
2. **`predrawEngine`**

---

## Interface Description

### 1. `preloadEngine`

The parameters of `preloadEngine` are as follows:

- **`Context`**: Pass the current page's `context`.
- **`Params`**: Pass the corresponding NAPI parameters, which are mostly consistent with `FlutterEntry` and `FlutterAbility`. Detailed settings can refer to `FlutterAbilityLaunchConfigs`, including but not limited to:
    - **`dart_entrypoint`**: Sets the entry point function name (default is `main`).
    - **`route`**: Sets the default initial route (default is `/`).
    - **`cached_engine_id`**: Sets the unique ID of the cached `FlutterEngine` you want to reuse. If this parameter is passed, the pre-created engine can be reused (the engine must have been previously added to the `FlutterEngineCache` for management).
    - **`viewport_metrics`**: Developers can set `viewport_metrics` during preloading, especially when the Flutter page to be rendered is not fullscreen. You need to set `viewportMetrics.physicalWidth` and `viewportMetrics.physicalHeight` as the width and height for pre-rendering; otherwise, it defaults to fullscreen pre-rendering.
- **`nextViewId`**: Identifies the `FlutterView` ID to be pre-rendered. You can pass `null`, which will automatically retrieve the next ID by calling `FlutterManager.getInstance().getNextFlutterViewId()`.
    - **Note**: When pre-rendering multiple pages simultaneously, different `nextViewId` values must be passed. You can use `getNextFlutterViewId(offset)` to pass an offset and get the `(offset+1)`th `viewId`.

---

### 2. `predrawEngine`

The `predrawEngine` interface is similar to `preloadEngine`, except that its first parameter directly passes a `FlutterEngine` instance. Therefore, the pre-created engine does not need to be maintained by `FlutterEngineCache`.

The usage and configuration of the other parameters are the same as `preloadEngine`.

---

## Implementation Examples

### Example 1: Simple Case

Below is the typical implementation logic for preloading a Flutter page through a button:

```arkts
build() {
  Button(this.title)
    .onClick(() => {
      try {
        router.pushUrl({ url: 'pages/Flutter', params: { route: this.route } });
      } catch (err) {
        Log.d(TAG, `跳转页面${this.route} error === ${JSON.stringify(err)}`);
      }
    })
    .onTouch((touch: TouchEvent) => {
      if (touch.type == TouchType.Down) {
        let params: Record<string, Object> = {};
        params['route'] = this.route;
        FlutterEnginePreload.preloadEngine(getContext(this), params);
      }
    });
}
```

For a complete demo, refer to: [Flutter_it_preload](../../flutter_it_preload/)

**Preloading Logic Location**: `pages/index.ets`

---

### Example 2: Complex Case

Below is a more complex scenario where a cached `FlutterEngine` is used, the target page contains multiple Flutter pages, and dimensions and `FlutterViewId` offsets need to be set:

```arkts
.onTouch((touch: TouchEvent) => {
  if (touch.type == TouchType.Down) {
    let params: Record<string, Object> = {};
    let viewports: ViewportMetrics = new ViewportMetrics();
    // 多引擎时，对传入的 view ID 手动添加偏移
    let nextViewId = FlutterManager.getInstance().getNextFlutterViewId();
    let nextViewId2 = FlutterManager.getInstance().getNextFlutterViewId(1);
    viewports.physicalWidth = display.getDefaultDisplaySync().width;
    viewports.physicalHeight = display.getDefaultDisplaySync().height / 2;
    params[FlutterAbilityLaunchConfigs.PRELOAD_VIEWPORT_METRICS_KEY] = viewports;

    FlutterEnginePreload.predrawEngine(
      FlutterEngineCache.getInstance().get('DoubleFlutterTop'),
      params,
      nextViewId
    );

    FlutterEnginePreload.predrawEngine(
      FlutterEngineCache.getInstance().get('DoubleFlutterBottom'),
      params,
      nextViewId2
    );
  }
});
```

For a complete demo, refer to: [Multiple_flutters_predraw](../../multiple_flutters_predraw/)

**Preloading Logic Location**: `pages/MainPage.ets`

---

## Verification of Results

After correctly adding `preload` in the project, the rendering speed of page navigation can be significantly optimized. To verify the effect before and after optimization, you can:

1. **Slow-motion recording**: Observe the speed of Flutter page loading during navigation.
2. **Capture application traces**: Analyze the changes in page loading time.
3. **DevTools**: During mixed application development and debugging, the native application is opened by default, and DevTools will not establish a connection. When preload is triggered (e.g., touch event), even if no actual navigation occurs, the connection will be automatically established.

---

## Notes

1. When setting `viewport_metrics`, ensure that the passed width and height match the actual rendering area.
2. If multiple pages are to be pre-rendered simultaneously, ensure that `nextViewId` values are not repeated.