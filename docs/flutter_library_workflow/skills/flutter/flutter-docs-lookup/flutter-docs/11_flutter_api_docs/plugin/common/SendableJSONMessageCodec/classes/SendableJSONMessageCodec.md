[**Flutter ETS API Documentation v1.0.0**](../../../../README.md)

***

# Class: SendableJSONMessageCodec

A sendable MessageCodec using UTF-8 encoded JSON messages.
This codec can be used in background threads and worker contexts.

## Implements

- [`FlutterComponent`](../../../../component/FlutterComponent/variables/FlutterComponent.md)\<`Object`\>

## Constructors

### Constructor

> **new SendableJSONMessageCodec**(): `SendableJSONMessageCodec`

#### Returns

`SendableJSONMessageCodec`

## Properties

### INSTANCE

> `static` **INSTANCE**: `SendableJSONMessageCodec`

Singleton instance of SendableJSONMessageCodec.

## Methods

### decodeMessage()

> **decodeMessage**(`message`): `Any`

Decodes a binary message from JSON format.

#### Parameters

##### message

`ArrayBuffer`

The binary message to decode, possibly null

#### Returns

`Any`

The decoded message object

#### Throws

Error if the JSON is invalid

***

### encodeMessage()

> **encodeMessage**(`message`): `ArrayBuffer`

Encodes a message into JSON binary format.

#### Parameters

##### message

`Any`

The message to encode, possibly null

#### Returns

`ArrayBuffer`

The encoded message as an ArrayBuffer

***

### toBaseData()

> **toBaseData**(`message`): `Any`

Converts a message to base data types suitable for JSON serialization.

#### Parameters

##### message

`Any`

The message to convert

#### Returns

`Any`

The converted message with base data types
