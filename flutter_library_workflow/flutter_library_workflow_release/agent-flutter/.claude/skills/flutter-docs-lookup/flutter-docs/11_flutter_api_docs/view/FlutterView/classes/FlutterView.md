[**Flutter ETS API Documentation v1.0.0**](../../../README.md)

***

# Class: FlutterView

Main view class for rendering Flutter content in OpenHarmony applications.
This class manages the Flutter engine, viewport metrics, keyboard handling,
and all interactions between Flutter and the native platform.

## Constructors

### Constructor

> **new FlutterView**(`viewId`, `context`): `FlutterView`

Constructs a new FlutterView instance.

#### Parameters

##### viewId

`string`

The unique identifier for this view

##### context

`Context`

The application context

#### Returns

`FlutterView`

## Methods

### addFirstFrameListener()

> **addFirstFrameListener**(`listener`): `void`

Adds a listener for the first frame event.

#### Parameters

##### listener

[`FirstFrameListener`](../interfaces/FirstFrameListener.md)

The listener to add

#### Returns

`void`

***

### addFirstPreloadFrameListener()

> **addFirstPreloadFrameListener**(`listener`): `void`

Adds a listener for the first preload frame event.

#### Parameters

##### listener

[`FirstPreloadFrameListener`](../interfaces/FirstPreloadFrameListener.md)

The listener to add

#### Returns

`void`

***

### attachToFlutterEngine()

> **attachToFlutterEngine**(`flutterEngine`): `void`

Attaches this view to a Flutter engine.

#### Parameters

##### flutterEngine

`FlutterEngine`

The FlutterEngine to attach to

#### Returns

`void`

***

### detachFromFlutterEngine()

> **detachFromFlutterEngine**(): `void`

Detaches this view from the Flutter engine.
Cleans up all engine-related resources.

#### Returns

`void`

***

### enableFrameCache()

> **enableFrameCache**(`cacheEnable`): `void`

Enables or disables frame caching.

#### Parameters

##### cacheEnable

`boolean`

True to enable frame cache, false to disable

#### Returns

`void`

***

### getActive()

> **getActive**(): `boolean`

Gets the active state of the view.

#### Returns

`boolean`

True if active, false otherwise

***

### getDVModel()

> **getDVModel**(): [`DVModel`](../../DynamicView/dynamicView/classes/DVModel.md)

Gets the DynamicView model.

#### Returns

[`DVModel`](../../DynamicView/dynamicView/classes/DVModel.md)

The DVModel instance

***

### ~~getEmbeddingNodeController()~~

> **getEmbeddingNodeController**(): [`EmbeddingNodeController`](../../../embedding/ohos/EmbeddingNodeController/classes/EmbeddingNodeController.md)

Gets the embedding node controller.

#### Returns

[`EmbeddingNodeController`](../../../embedding/ohos/EmbeddingNodeController/classes/EmbeddingNodeController.md)

The EmbeddingNodeController instance

#### Deprecated

since 3.7

***

### getId()

> **getId**(): `string`

Gets the view ID.

#### Returns

`string`

The view ID

***

### getKeyboardHeight()

> **getKeyboardHeight**(): `any`

Gets the current keyboard height.

#### Returns

`any`

The keyboard height in pixels, or 0 if keyboard is not visible

***

### getPlatformView()

> **getPlatformView**(): `any`

Gets the platform view.

#### Returns

`any`

The PlatformView instance, or undefined if not set

***

### ~~getPlatformViewSize()~~

> **getPlatformViewSize**(): [`PlatformViewParas`](PlatformViewParas.md)

Gets the platform view size.

#### Returns

[`PlatformViewParas`](PlatformViewParas.md)

The PlatformViewParas instance

#### Deprecated

since 3.7

***

### getSurfaceId()

> **getSurfaceId**(): `string`

Gets the surface ID.

#### Returns

`string`

The surface ID

***

### getWrappedBuilder()

> **getWrappedBuilder**(): `any`

Gets the wrapped builder.

#### Returns

`any`

The WrappedBuilder instance, or undefined if not set

***

### hasRenderedFirstFrame()

> **hasRenderedFirstFrame**(): `boolean`

Checks if the first frame has been rendered.

#### Returns

`boolean`

True if the first frame has been rendered, false otherwise

***

### isAttachedToFlutterEngine()

> **isAttachedToFlutterEngine**(): `boolean`

Checks if this view is attached to a Flutter engine.

#### Returns

`boolean`

True if attached, false otherwise

***

### isSameEngineShellHolderId()

> **isSameEngineShellHolderId**(`id`): `boolean`

Checks if this view is attached to an engine with the specified shell holder ID.

#### Parameters

##### id

`number`

The shell holder ID to check

#### Returns

`boolean`

True if attached to an engine with the specified ID, false otherwise

***

### onAreaChange()

> **onAreaChange**(`newArea`, `setFullScreen`): `void`

Called when the view area changes.
Updates viewport metrics based on the new area and avoid areas.

#### Parameters

##### newArea

`any`

The new area, or null to use current display dimensions

##### setFullScreen

`boolean` = `false`

Whether to set fullscreen mode

#### Returns

`void`

***

### onDestroy()

> **onDestroy**(): `void`

Called when the view is being destroyed.
Cleans up all event listeners and resources.

#### Returns

`void`

***

### onFirstFrame()

> **onFirstFrame**(`isPreload`): `void`

Called when the first frame is rendered.
Notifies all registered listeners.

#### Parameters

##### isPreload

`number` = `0`

1 for preload frame, 0 for normal first frame

#### Returns

`void`

***

### onKeyEvent()

> **onKeyEvent**(`event`): `boolean`

Handles key events.

#### Parameters

##### event

`KeyEvent`

The key event

#### Returns

`boolean`

True if the event was handled, false otherwise

***

### onKeyPreIme()

> **onKeyPreIme**(`event`): `boolean`

Handles key events before they reach the input method editor.

#### Parameters

##### event

`KeyEvent`

The key event

#### Returns

`boolean`

True if the event was handled, false otherwise

***

### onMouseWheel()

> **onMouseWheel**(`eventType`, `event`): `void`

Handles mouse wheel events.

#### Parameters

##### eventType

`string`

The event type

##### event

`PanGestureEvent`

The pan gesture event

#### Returns

`void`

***

### onSurfaceCreated()

> **onSurfaceCreated**(): `void`

Called when the rendering surface is created.
Marks the surface as available and processes pending messages.

#### Returns

`void`

***

### onSurfaceDestroyed()

> **onSurfaceDestroyed**(): `void`

Called when the rendering surface is destroyed.
Marks the surface as unavailable and detaches from the engine.

#### Returns

`void`

***

### onWindowCreated()

> **onWindowCreated**(): `void`

Called when the window is created.
Initializes the UIContext and sends settings to Flutter.

#### Returns

`void`

***

### preDraw()

> **preDraw**(`width`, `height`): `void`

Called before drawing a frame.

#### Parameters

##### width

`number` = `0`

The width of the drawing area, defaults to display width

##### height

`number` = `0`

The height of the drawing area, defaults to display height

#### Returns

`void`

***

### removeFirstFrameListener()

> **removeFirstFrameListener**(`listener`): `void`

Removes a first frame listener.

#### Parameters

##### listener

[`FirstFrameListener`](../interfaces/FirstFrameListener.md)

The listener to remove

#### Returns

`void`

***

### removeFirstPreloadFrameListener()

> **removeFirstPreloadFrameListener**(`listener`): `void`

Removes a first preload frame listener.

#### Parameters

##### listener

[`FirstPreloadFrameListener`](../interfaces/FirstPreloadFrameListener.md)

The listener to remove

#### Returns

`void`

***

### sendSettings()

> **sendSettings**(): `void`

Sends system settings to Flutter.

#### Returns

`void`

***

### setActive()

> **setActive**(`value`): `void`

Sets the active state of the view.

#### Parameters

##### value

`boolean`

True to activate, false to deactivate

#### Returns

`void`

***

### setCheckAiBar()

> **setCheckAiBar**(`check`): `void`

Sets whether to check AI bar area.

#### Parameters

##### check

`boolean`

True to check AI bar area, false otherwise

#### Returns

`void`

***

### setCheckFullScreen()

> **setCheckFullScreen**(`check`): `void`

Sets whether to check fullscreen mode.

#### Parameters

##### check

`boolean`

True to check fullscreen, false otherwise

#### Returns

`void`

***

### setCheckGesture()

> **setCheckGesture**(`check`): `void`

Sets whether to check gesture area.

#### Parameters

##### check

`boolean`

True to check gesture area, false otherwise

#### Returns

`void`

***

### setCheckKeyboard()

> **setCheckKeyboard**(`check`): `void`

Sets whether to check keyboard area.

#### Parameters

##### check

`boolean`

True to check keyboard area, false otherwise

#### Returns

`void`

***

### setPaddingTop()

> **setPaddingTop**(`paddingTop?`): `void`

Sets the top padding value.

#### Parameters

##### paddingTop?

`number`

The top padding value, or undefined to use default

#### Returns

`void`

***

### setPlatformView()

> **setPlatformView**(`platformView`): `void`

Sets the platform view.

#### Parameters

##### platformView

`PlatformView`

The PlatformView instance

#### Returns

`void`

***

### setSurfaceId()

> **setSurfaceId**(`surfaceId`): `void`

Sets the surface ID for rendering.

#### Parameters

##### surfaceId

`string`

The surface ID

#### Returns

`void`

***

### setTouchSlopCallbackValue()

> **setTouchSlopCallbackValue**(`callback`): `void`

Sets the callback for getting touch slop value.

#### Parameters

##### callback

`callbackNumber`

The callback function that returns the touch slop value

#### Returns

`void`

***

### setWrappedBuilder()

> **setWrappedBuilder**(`wrappedBuilder`): `void`

Sets the wrapped builder for platform views.

#### Parameters

##### wrappedBuilder

`WrappedBuilder`\<\[[`Params`](../../../plugin/platform/PlatformView/classes/Params.md)\]\>

The WrappedBuilder instance

#### Returns

`void`
