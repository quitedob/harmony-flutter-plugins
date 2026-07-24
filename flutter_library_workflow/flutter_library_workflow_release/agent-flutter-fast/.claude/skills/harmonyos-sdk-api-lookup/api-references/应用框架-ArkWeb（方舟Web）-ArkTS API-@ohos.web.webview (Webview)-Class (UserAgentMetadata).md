可以通过该类提供的接口配置UserAgentMetadata。

说明

* 本模块首批接口从API version 24开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。
* 本Class首批接口从API version 24开始支持。
* 示例效果请以真机运行为准。

## setBrandVersionList

PhonePC/2in1TabletTVWearable

setBrandVersionList(brandVersionList: Array<UserAgentBrandVersion>): void

设置品牌和版本信息。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| brandVersionList | Array<[UserAgentBrandVersion](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-useragentbrandversion)> | 是 | 对应请求标头的Sec-CH-UA-Full-Version-List。空代表使用ArkWeb默认值。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## getBrandVersionList

PhonePC/2in1TabletTVWearable

getBrandVersionList(): Array<UserAgentBrandVersion>

获取品牌和版本信息列表。不调用对应的[setBrandVersionList](/consumer/cn/doc/harmonyos-references/arkts-apis-webview-useragentmetadata#setbrandversionlist)进行设置时，列表默认值：[{"brand":"Chromium","version":[ChromeCompatibleVersion](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/web-default-useragent#默认user-agent结构)}, {"brand":"ArkWeb","version":[OSVersion](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/web-default-useragent#默认user-agent结构)}]。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Array<[UserAgentBrandVersion](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-useragentbrandversion)> | 品牌和版本信息列表。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## setArchitecture

PhonePC/2in1TabletTVWearable

setArchitecture(arch: string): void

设置平台的架构类型。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| arch | string | 是 | 对应请求标头的Sec-CH-UA-Arch。空代表使用ArkWeb默认值。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## getArchitecture

PhonePC/2in1TabletTVWearable

getArchitecture(): string

获取平台的架构类型。不调用对应的[setArchitecture](/consumer/cn/doc/harmonyos-references/arkts-apis-webview-useragentmetadata#setarchitecture)设置时，架构类型默认值：""。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 平台架构类型。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## setBitness

PhonePC/2in1TabletTVWearable

setBitness(bitness: string): void

设置平台的位数类型。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| bitness | string | 是 | 对应请求标头的Sec-CH-UA-Bitness。空代表使用ArkWeb默认值。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## getBitness

PhonePC/2in1TabletTVWearable

getBitness(): string

获取平台的位数类型。不调用对应的[setBitness](/consumer/cn/doc/harmonyos-references/arkts-apis-webview-useragentmetadata#setbitness)设置时，位数类型默认值：Desktop: "64"，其他设备: ""。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 平台位数。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## setFormFactors

PhonePC/2in1TabletTVWearable

setFormFactors(formFactors: Array<UserAgentFormFactor>): void

设置设备形态信息，如手机、平板等。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| formFactors | Array<[UserAgentFormFactor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-e#useragentformfactor24)> | 是 | 对应请求标头的Sec-CH-UA-Form-Factor。空代表使用ArkWeb默认值。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## getFormFactors

PhonePC/2in1TabletTVWearable

getFormFactors(): Array<UserAgentFormFactor>

获取设备形态信息，如手机、平板等。不调用对应的[setFormFactors](/consumer/cn/doc/harmonyos-references/arkts-apis-webview-useragentmetadata#setformfactors)进行设置时，形态信息默认值：手机："Mobile"，手表: "Watch"，车机: "Automotive"，PC: "Desktop"，平板："Tablet"。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Array<[UserAgentFormFactor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-e#useragentformfactor24)> | 设备形态信息。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## setFullVersion

PhonePC/2in1TabletTVWearable

setFullVersion(fullVersion: string): void

设置完整版本号。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| fullVersion | string | 是 | 对应请求标头的Sec-CH-UA-Full-Version。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## getFullVersion

PhonePC/2in1TabletTVWearable

getFullVersion(): string

获取完整版本号。不调用对应的[setFullVersion](/consumer/cn/doc/harmonyos-references/arkts-apis-webview-useragentmetadata#setfullversion)设置时，版本号默认值：""。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 完整版本号。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## setMobile

PhonePC/2in1TabletTVWearable

setMobile(isMobile: boolean): void

设置是否为移动设备。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| isMobile | boolean | 是 | 对应请求标头的Sec-CH-UA-Mobile。表示设备是否为移动设备。true为是移动设备，false为不是移动设备。默认值为true。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## getMobile

PhonePC/2in1TabletTVWearable

getMobile(): boolean

获取是否为移动设备。不调用对应的[setMobile](/consumer/cn/doc/harmonyos-references/arkts-apis-webview-useragentmetadata#setmobile)设置时，默认值：手机: true，手表、车机、平板、大屏: false。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| boolean | 是否为移动设备，true为移动设备，false为不是移动设备。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## setModel

PhonePC/2in1TabletTVWearable

setModel(model: string): void

设置设备型号。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| model | string | 是 | 对应请求标头的Sec-CH-UA-Model。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## getModel

PhonePC/2in1TabletTVWearable

getModel(): string

获取设备型号。不调用对应的[setModel](/consumer/cn/doc/harmonyos-references/arkts-apis-webview-useragentmetadata#setmodel)设置时，型号默认值：手机根据const.product.model取设备型号，手表、大屏、车机、PC、平板：""。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 设备型号。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## setPlatform

PhonePC/2in1TabletTVWearable

setPlatform(platform: string): void

设置操作系统名称。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| platform | string | 是 | 对应请求标头的Sec-CH-UA-Platform。空代表使用ArkWeb默认值。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## getPlatform

PhonePC/2in1TabletTVWearable

getPlatform(): string

获取操作系统名称。不调用对应的[setPlatform](/consumer/cn/doc/harmonyos-references/arkts-apis-webview-useragentmetadata#setplatform)设置时，名称默认值："HarmonyOS" 。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 操作系统名称。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## setPlatformVersion

PhonePC/2in1TabletTVWearable

setPlatformVersion(platformVersion: string): void

设置操作系统版本号。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| platformVersion | string | 是 | 对应请求标头的Sec-CH-UA-Platform-Version。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## getPlatformVersion

PhonePC/2in1TabletTVWearable

getPlatformVersion(): string

获取操作系统版本号。不调用对应的[setPlatformVersion](/consumer/cn/doc/harmonyos-references/arkts-apis-webview-useragentmetadata#setplatformversion)设置时，版本号默认值：按HarmonyOS平台版本号规则，同const.product.os.dist.version。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 操作系统版本号。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## setWow64

PhonePC/2in1TabletTVWearable

setWow64(isWow64: boolean): void

设置二进制文件是否在64位Windows上以32位模式运行。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| isWow64 | boolean | 是 | 对应请求标头的Sec-CH-UA-WoW64。表示二进制文件是否在64位Windows上以32位模式运行。true为是，false为不是。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。

## getWow64

PhonePC/2in1TabletTVWearable

getWow64(): boolean

获取二进制文件是否是在64位Windows上以32位模式运行。不调用对应的[setWow64](/consumer/cn/doc/harmonyos-references/arkts-apis-webview-useragentmetadata#setwow64)设置时，默认值为false。

**系统能力：** SystemCapability.Web.Webview.Core

**模型约束：** 此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| boolean | 表示二进制文件是否在64位Windows上以32位模式运行。true为是，false为不是。 |

**示例：**

完整示例代码参考[setUserAgentClientHintsEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#setuseragentclienthintsenabled24)。