[**Flutter ETS API Documentation v1.0.0**](../../../../README.md)

***

# Interface: Host

Interface for FlutterAbility host.
This interface extends FlutterEngineProvider, FlutterEngineConfigurator, and PlatformPluginDelegate.

## Extends

- [`FlutterComponent`](../../../../component/FlutterComponent/variables/FlutterComponent.md).[`FlutterComponent`](../../../../component/FlutterComponent/variables/FlutterComponent.md).[`PlatformPluginDelegate`](../../../../plugin/PlatformPlugin/interfaces/PlatformPluginDelegate.md)

## Methods

### attachToEngineAutomatically()

> **attachToEngineAutomatically**(): `boolean`

Whether to automatically attach the [FlutterView](../../../../view/FlutterView/classes/FlutterView.md) to the engine.

In the add-to-app scenario where multiple [FlutterView](../../../../view/FlutterView/classes/FlutterView.md) share the same [FlutterEngine](../../../../component/FlutterComponent/variables/FlutterComponent.md),
the host application desires to determine the timing of attaching the [FlutterView](../../../../view/FlutterView/classes/FlutterView.md)
to the engine, for example, during the onResume instead of the onCreateView.

Defaults to true.

#### Returns

`boolean`

***

### detachFromFlutterEngine()

> **detachFromFlutterEngine**(): `void`

#### Returns

`void`

***

### getAbility()

> **getAbility**(): `UIAbility`

#### Returns

`UIAbility`

***

### getAppBundlePath()

> **getAppBundlePath**(): `string`

Returns the path to the app bundle where the Dart code exists.

#### Returns

`string`

***

### getCachedEngineGroupId()

> **getCachedEngineGroupId**(): `string`

#### Returns

`string`

***

### getCachedEngineId()

> **getCachedEngineId**(): `string`

#### Returns

`string`

***

### getDartEntrypointArgs()

> **getDartEntrypointArgs**(): `string`[]

Returns arguments that passed as a list of string to Dart's entrypoint function.

#### Returns

`string`[]

***

### getDartEntrypointFunctionName()

> **getDartEntrypointFunctionName**(): `string`

Returns the Dart entrypoint that should run when a new io.flutter.embedding.engine.FlutterEngine is created.

#### Returns

`string`

***

### getDartEntrypointLibraryUri()

> **getDartEntrypointLibraryUri**(): `string`

Returns the URI of the Dart library which contains the entrypoint method (example
"package:foo_package/main.dart"). If null, this will default to the same library as the
`main()` function in the Dart program.

#### Returns

`string`

***

### getExclusiveAppComponent()

> **getExclusiveAppComponent**(): `any`

#### Returns

`any`

***

### getFlutterShellArgs()

> **getFlutterShellArgs**(): `FlutterShellArgs`

Returns the [FlutterShellArgs](../../../../component/FlutterComponent/variables/FlutterComponent.md) that should be used when initializing Flutter.

#### Returns

`FlutterShellArgs`

***

### getInitialRoute()

> **getInitialRoute**(): `string`

Returns the initial route that Flutter renders.

#### Returns

`string`

***

### getWant()

> **getWant**(): `Want`

#### Returns

`Want`

***

### popSystemNavigator()

> **popSystemNavigator**(): `boolean`

Called when the system navigator should be popped.

#### Returns

`boolean`

True if the delegate handled the pop, false otherwise.

#### Inherited from

[`PlatformPluginDelegate`](../../../../plugin/PlatformPlugin/interfaces/PlatformPluginDelegate.md).[`popSystemNavigator`](../../../../plugin/PlatformPlugin/interfaces/PlatformPluginDelegate.md#popsystemnavigator)

***

### providePlatformPlugin()

> **providePlatformPlugin**(`flutterEngine`): `any`

#### Parameters

##### flutterEngine

`FlutterEngine`

#### Returns

`any`

***

### shouldAttachEngineToAbility()

> **shouldAttachEngineToAbility**(): `boolean`

#### Returns

`boolean`

***

### shouldDestroyEngineWithHost()

> **shouldDestroyEngineWithHost**(): `boolean`

Returns true if the io.flutter.embedding.engine.FlutterEngine used in this delegate
should be destroyed when the host/delegate are destroyed.

#### Returns

`boolean`

***

### shouldDispatchAppLifecycleState()

> **shouldDispatchAppLifecycleState**(): `boolean`

#### Returns

`boolean`

***

### shouldRestoreAndSaveState()

> **shouldRestoreAndSaveState**(): `boolean`

#### Returns

`boolean`
