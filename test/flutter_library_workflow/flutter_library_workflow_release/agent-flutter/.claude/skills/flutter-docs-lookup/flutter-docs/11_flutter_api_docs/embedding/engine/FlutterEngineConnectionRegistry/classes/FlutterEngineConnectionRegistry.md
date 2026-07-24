[**Flutter ETS API Documentation v1.0.0**](../../../../README.md)

***

# Class: FlutterEngineConnectionRegistry

Registry for managing Flutter plugins and their connections to the engine and ability.
This class implements both PluginRegistry and AbilityControlSurface interfaces,
providing a unified way to manage plugin lifecycle and ability-related operations.

## Implements

- [`FlutterComponent`](../../../../component/FlutterComponent/variables/FlutterComponent.md)
- [`FlutterComponent`](../../../../component/FlutterComponent/variables/FlutterComponent.md)

## Constructors

### Constructor

> **new FlutterEngineConnectionRegistry**(`appContext`, `flutterEngine`, `flutterLoader`): `FlutterEngineConnectionRegistry`

Constructs a new FlutterEngineConnectionRegistry instance.

#### Parameters

##### appContext

`Context`

The application context

##### flutterEngine

`FlutterEngine`

The FlutterEngine instance this registry is associated with

##### flutterLoader

`FlutterLoader`

The FlutterLoader instance for asset management

#### Returns

`FlutterEngineConnectionRegistry`

## Methods

### add()

> **add**(`plugin`): `void`

Adds a plugin to this registry.

#### Parameters

##### plugin

[`FlutterPlugin`](../../plugins/FlutterPlugin/interfaces/FlutterPlugin.md)

The FlutterPlugin instance to add

#### Returns

`void`

***

### addList()

> **addList**(`plugins`): `void`

Adds multiple plugins to this registry.

#### Parameters

##### plugins

`Set`\<[`FlutterPlugin`](../../plugins/FlutterPlugin/interfaces/FlutterPlugin.md)\>

Set of FlutterPlugin instances to add

#### Returns

`void`

***

### attachToAbility()

> **attachToAbility**(`exclusiveAbility`): `void`

Attaches this registry to an ability.

#### Parameters

##### exclusiveAbility

`ExclusiveAppComponent`\<`UIAbility`\>

The exclusive app component (UIAbility) to attach to

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Destroys this registry and removes all plugins.

#### Returns

`void`

***

### detachFromAbility()

> **detachFromAbility**(): `void`

Detaches this registry from the current ability.

#### Returns

`void`

***

### get()

> **get**(`pluginClassName`): [`FlutterPlugin`](../../plugins/FlutterPlugin/interfaces/FlutterPlugin.md)

Gets a plugin by its class name.

#### Parameters

##### pluginClassName

`string`

The class name of the plugin to retrieve

#### Returns

[`FlutterPlugin`](../../plugins/FlutterPlugin/interfaces/FlutterPlugin.md)

The FlutterPlugin instance, or a default empty plugin if not found

***

### has()

> **has**(`pluginClassName`): `boolean`

Checks if a plugin with the given class name is registered.

#### Parameters

##### pluginClassName

`string`

The class name of the plugin to check

#### Returns

`boolean`

true if the plugin is registered, false otherwise

***

### onNewWant()

> **onNewWant**(`want`, `launchParams`): `void`

Handles a new Want event from the ability.

#### Parameters

##### want

`Want`

The Want object containing the intent

##### launchParams

`LaunchParam`

The launch parameters

#### Returns

`void`

***

### onSaveState()

> **onSaveState**(`reason`, `wantParam`): `OnSaveResult`

Handles save state requests from the ability.

#### Parameters

##### reason

`StateType`

The reason for saving state

##### wantParam

`Record`\<`string`, `Object`\>

Parameters to save

#### Returns

`OnSaveResult`

The result of the save state operation

***

### onWindowFocusChanged()

> **onWindowFocusChanged**(`hasFocus`): `void`

Handles window focus change events from the ability.

#### Parameters

##### hasFocus

`boolean`

Whether the window has focus

#### Returns

`void`

***

### remove()

> **remove**(`pluginClassName`): `void`

Removes a plugin from this registry.

#### Parameters

##### pluginClassName

`string`

The class name of the plugin to remove

#### Returns

`void`

***

### removeAll()

> **removeAll**(): `void`

Removes all plugins from this registry.

#### Returns

`void`

***

### removeList()

> **removeList**(`pluginClassNames`): `void`

Removes multiple plugins from this registry.

#### Parameters

##### pluginClassNames

`Set`\<`string`\>

Set of plugin class names to remove

#### Returns

`void`
