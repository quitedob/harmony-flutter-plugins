# How to Import Self-Rendered Content into Flutter

## Background Introduction

It supports importing externally self-rendered content (whether drawn via OHOS CAPI such as `NativeDrawing` or via OpenGL-related interfaces) into Flutter's `Texture` component for display through external textures. The following is the specific implementation method.

## Prerequisites
Flutter version 3.22 or above is required
---

## Implementation Steps

### 1. Dart-Side Operations

#### 1.1 Create a Texture Widget

- Create a Texture widget and bind the `textureId`.

#### 1.2 Register the Texture

- Create a `MethodChannel`:

        final MethodChannel _channel = const MethodChannel('PictureChannel');

- Register the texture in the `initState` function:

        _textureId = await _channel.invokeMethod("registerStarTexture");

#### 1.3 Unregister the Texture

- Unregister the texture in the `dispose` function:

        _channel.invokeMethod('unregisterTexture', {'textureId': _textureId});

---

### 2. OHOS-Side Operations

#### 2.1 Import the Utility Class

You need to import the following utility class:

        import { TextureRegistry, SurfaceTextureEntry } from '@ohos/flutter_ohos/src/main/ets/view/TextureRegistry';

#### 2.2 Provided Implementation Methods

Two implementations are provided for importing self-rendered content into Flutter textures.

---

## Method 1: Draw to a Buffer via `getNativeWindowId`

Obtain the engine-level `OHNativeWindow` pointer corresponding to the `Texture` by using `getNativeWindowId`, and then draw self-rendered content to the buffer associated with the `window`.

### ArkTS-Side Implementation Steps

1. Obtain the relevant information when registering the texture:

```arkts
this.textureId = this.textureRegistry!.getTextureId();
this.surfaceTextureEntry = this.textureRegistry!.registerTexture(this.textureId);
this.windowId = this.surfaceTextureEntry.getNativeWindowId();
drawNapi.drawPatternWindow(this.windowId, 300, 300); // Needs to be implemented in the cpp layer, receiving the window pointer
```

2. Call the `cpp` layer function to draw self-rendered content to the `window`:

        drawNapi.drawPatternWindow(this.windowId, 300, 300); // Needs to be implemented in the cpp layer

### CPP-Side Implementation Steps

1. Use `OH_NativeWindow_NativeWindowHandleOpt` to set the `window`'s `USAGE`, width, height, and other information.
2. Call `OH_NativeWindow_NativeWindowRequestBuffer` to get the buffer of the `window`.
3. Use `OH_NativeWindow_GetBufferHandleFromNative` to get the `bufferHandle`.
4. Use `OH_NativeWindow_NativeWindowFlushBuffer` to put the produced buffer into the buffer queue for consumption.

---

## Method 2: Use `setExternalNativeImage`

Directly pass the `NativeImage` pointer used for content production to the Flutter engine layer. The engine layer uses the `NativeImage` and registers a frame-available callback using `OH_NativeImage_SetOnFrameAvailableListener` for content consumption.

### ArkTS-Side Implementation Steps

1. Obtain the relevant information when registering the texture:

```arkts
this.textureId = this.textureRegistry!.getTextureId();
this.surfaceTextureEntry = this.textureRegistry!.registerTexture(this.textureId);
drawNapi.drawPatternWindow(1000, 1000);
this.nativeImageId = drawNapi.getNativeImage(); // Get the NativeImage used for content production
this.textureRegistry!.setExternalNativeImage(this.textureId, this.nativeImageId); // Pass the NativeImage to the engine layer
```

### CPP-Side Implementation Steps

Here are the steps for a simple drawing implementation based on OpenGL:

1. Use `OH_NativeImage_Create` to create a `NativeImage`.
2. Use `OH_NativeImage_AcquireNativeWindow` to get the `window` associated with the `NativeImage`.
3. Use `OH_NativeWindow_NativeWindowHandleOpt` to set `USAGE` and width/height.
4. Convert `NativeWindow` to the type `EGLNativeWindowType`.
5. Call the following OpenGL-related commands to complete the rendering:
   - `eglCreateWindowSurface`
   - `eglCreateContext`
   - `eglMakeCurrent`
   - OpenGL drawing commands
   - `eglSwapBuffers`

---

## Texture Unregistration

No matter which method is used above, the following function needs to be called to unregister the texture:

        this.textureRegistry!.unregisterTexture(textureId);

---

## Reference Implementations

### Reference

[flutter_it_image](../../flutter_it_image)

---

## Code Location Description

1. **Dart-Side Code**  
   Method 1: The relevant code is located in `lib/PicturePage1.dart`. The texture component added at the bottom is used to import self-rendered content.  
   Method 2: The relevant code is located in `lib/PicturePage2.dart`.

2. **ArkTS-Side Code**  
   Method 1: The relevant code is located in `ohos/entry/src/main/ets/entryability/PicturePlugin1.ets`, which includes functions for registering and unregistering textures.  
   Method 2: The relevant code is located in `ohos/entry/src/main/ets/entryability/PicturePlugin2.ets`.

3. **Native Rendering Code**  
   The relevant code is located in `ohos/entry/src/main/cpp`.

---

## Notes

1. When using Method 2, developers need to manage the lifecycle of `NativeImage` by themselves and ensure that the object is not destroyed before `unregister`.