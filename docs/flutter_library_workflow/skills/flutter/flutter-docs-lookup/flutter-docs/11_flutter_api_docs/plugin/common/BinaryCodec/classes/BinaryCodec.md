[**Flutter ETS API Documentation v1.0.0**](../../../../README.md)

***

# Class: BinaryCodec

A [MessageCodec](../../../../component/FlutterComponent/variables/FlutterComponent.md) using unencoded binary messages, represented as ArrayBuffers.

This codec is guaranteed to be compatible with the corresponding `BinaryCodec` on the Dart side.
These parts of the Flutter SDK are evolved synchronously.

On the Dart side, messages are represented using ByteData.

## Implements

- [`FlutterComponent`](../../../../component/FlutterComponent/variables/FlutterComponent.md)\<`ArrayBuffer`\>

## Constructors

### Constructor

> **new BinaryCodec**(`returnsDirectByteBufferFromDecoding`): `BinaryCodec`

Constructs a new BinaryCodec instance.

#### Parameters

##### returnsDirectByteBufferFromDecoding

`boolean`

Whether to return the direct buffer from decoding

#### Returns

`BinaryCodec`

## Properties

### INSTANCE\_DIRECT

> `readonly` `static` **INSTANCE\_DIRECT**: `BinaryCodec`

Direct instance that returns the direct buffer from decoding.

## Methods

### decodeMessage()

> **decodeMessage**(`message`): `ArrayBuffer`

Decodes a binary message.

#### Parameters

##### message

`ArrayBuffer`

The ArrayBuffer message to decode, possibly null

#### Returns

`ArrayBuffer`

The decoded ArrayBuffer, or a copy depending on configuration

***

### encodeMessage()

> **encodeMessage**(`message`): `ArrayBuffer`

Encodes a binary message (no-op for binary codec).

#### Parameters

##### message

`ArrayBuffer`

The ArrayBuffer message to encode

#### Returns

`ArrayBuffer`

The same ArrayBuffer
