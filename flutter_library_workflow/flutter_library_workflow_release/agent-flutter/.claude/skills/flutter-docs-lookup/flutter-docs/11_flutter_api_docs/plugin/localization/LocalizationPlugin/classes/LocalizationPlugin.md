[**Flutter ETS API Documentation v1.0.0**](../../../../README.md)

***

# Class: LocalizationPlugin

Plugin for handling localization in Flutter applications.
This class manages the interaction between Flutter's localization system
and the OpenHarmony resource management system.

## Constructors

### Constructor

> **new LocalizationPlugin**(`context`, `localizationChannel`): `LocalizationPlugin`

Constructs a new LocalizationPlugin instance.

#### Parameters

##### context

`Context`

The application context

##### localizationChannel

`LocalizationChannel`

The LocalizationChannel for communication with Flutter

#### Returns

`LocalizationPlugin`

## Methods

### localeFromString()

> **localeFromString**(`localeString`): `Locale`

Converts a locale string to an intl.Locale object.

#### Parameters

##### localeString

`string`

The locale string (e.g., "en_US" or "zh-CN")

#### Returns

`Locale`

The corresponding intl.Locale object

***

### sendLocaleToFlutter()

> **sendLocaleToFlutter**(): `void`

Sends the system locale to Flutter.

#### Returns

`void`
