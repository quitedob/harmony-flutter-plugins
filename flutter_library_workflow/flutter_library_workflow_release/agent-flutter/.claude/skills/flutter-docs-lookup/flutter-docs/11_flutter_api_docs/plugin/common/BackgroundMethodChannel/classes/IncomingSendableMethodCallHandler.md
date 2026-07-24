[**Flutter ETS API Documentation v1.0.0**](../../../../README.md)

***

# Class: IncomingSendableMethodCallHandler

Internal handler for incoming method calls from Flutter in background threads.

## Implements

- [`FlutterComponent`](../../../../component/FlutterComponent/variables/FlutterComponent.md)

## Constructors

### Constructor

> **new IncomingSendableMethodCallHandler**(`handler`, `codec`): `IncomingSendableMethodCallHandler`

Constructs a new IncomingSendableMethodCallHandler instance.

#### Parameters

##### handler

`SendableMethodCallHandler`

The SendableMethodCallHandler to delegate to

##### codec

`SendableMethodCodec`

The SendableMethodCodec to use for encoding/decoding

#### Returns

`IncomingSendableMethodCallHandler`

## Methods

### onMessage()

> **onMessage**(`message`, `reply`, ...`args`): `void`

Handles a binary method call from Flutter.

#### Parameters

##### message

`ArrayBuffer`

The binary message containing the method call

##### reply

[`BinaryReply`](../../BinaryMessenger/interfaces/BinaryReply.md)

The BinaryReply callback to send a response

##### args

...`Object`[]

Additional arguments passed to the handler

#### Returns

`void`
