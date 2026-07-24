## 概述

PhonePC/2in1TabletTVWearable

响应Cookie。

**起始版本：** 5.0.0(12)

**相关模块：** [RemoteCommunication](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview)

**所在头文件：** [rcp.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/rcp_8h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| char \* [name](/consumer/cn/doc/harmonyos-references/_rcp___response_cookies#name) | 响应Cookie名称。 |
| char \* [value](/consumer/cn/doc/harmonyos-references/_rcp___response_cookies#value) | 响应Cookie值。 |
| char \* [domain](/consumer/cn/doc/harmonyos-references/_rcp___response_cookies#domain) | 响应Cookie域属性。 |
| char \* [path](/consumer/cn/doc/harmonyos-references/_rcp___response_cookies#path) | 响应Cookie路径属性。 |
| char \* [expires](/consumer/cn/doc/harmonyos-references/_rcp___response_cookies#expires) | 响应Cookie过期属性。 |
| uint64\_t [maxAge](/consumer/cn/doc/harmonyos-references/_rcp___response_cookies#maxage) | 响应Cookie maxAge属性。 |
| bool [secure](/consumer/cn/doc/harmonyos-references/_rcp___response_cookies#secure) | 响应Cookie安全属性。 |
| bool [httpOnly](/consumer/cn/doc/harmonyos-references/_rcp___response_cookies#httponly) | 响应Cookie httpOnly属性。 |
| char \* [sameSite](/consumer/cn/doc/harmonyos-references/_rcp___response_cookies#samesite) | 响应Cookie sameSite属性。 |
| uint64\_t [rawSize](/consumer/cn/doc/harmonyos-references/_rcp___response_cookies#rawsize) | 此响应Cookie的原始大小。 |
| char \* [originString](/consumer/cn/doc/harmonyos-references/_rcp___response_cookies#originstring) | 原始字符串。 |
| [Rcp\_CookieAttributes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-overview#rcp_cookieattributes) \* [cookieAttributes](/consumer/cn/doc/harmonyos-references/_rcp___response_cookies#cookieattributes) | 响应Cookie中的所有属性。 |
| struct [Rcp\_ResponseCookies](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___response_cookies) \* [next](/consumer/cn/doc/harmonyos-references/_rcp___response_cookies#next) | 链式存储。指向下一个[Rcp\_ResponseCookies](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___response_cookies)的指针。 |

## 结构体成员变量说明

PhonePC/2in1TabletTVWearable

### cookieAttributes

PhonePC/2in1TabletTVWearable



```
1. Rcp_CookieAttributes* Rcp_ResponseCookies::cookieAttributes
```

**描述**

响应Cookie中的所有属性。

### domain

PhonePC/2in1TabletTVWearable



```
1. char* Rcp_ResponseCookies::domain
```

**描述**

响应Cookie域属性。

### expires

PhonePC/2in1TabletTVWearable



```
1. char* Rcp_ResponseCookies::expires
```

**描述**

响应Cookie过期属性。

### httpOnly

PhonePC/2in1TabletTVWearable



```
1. bool Rcp_ResponseCookies::httpOnly
```

**描述**

响应Cookie httpOnly属性。

### maxAge

PhonePC/2in1TabletTVWearable



```
1. uint64_t Rcp_ResponseCookies::maxAge
```

**描述**

响应Cookie maxAge属性。

### name

PhonePC/2in1TabletTVWearable



```
1. char* Rcp_ResponseCookies::name
```

**描述**

响应Cookie名称。

### next

PhonePC/2in1TabletTVWearable



```
1. struct Rcp_ResponseCookies* Rcp_ResponseCookies::next
```

**描述**

链式存储。指向下一个[Rcp\_ResponseCookies](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_rcp___response_cookies)的指针。

### originString

PhonePC/2in1TabletTVWearable



```
1. char* Rcp_ResponseCookies::originString
```

**描述**

原始字符串。

### path

PhonePC/2in1TabletTVWearable



```
1. char* Rcp_ResponseCookies::path
```

**描述**

响应Cookie路径属性。

### rawSize

PhonePC/2in1TabletTVWearable



```
1. uint64_t Rcp_ResponseCookies::rawSize
```

**描述**

此响应Cookie的原始大小。

### sameSite

PhonePC/2in1TabletTVWearable



```
1. char* Rcp_ResponseCookies::sameSite
```

**描述**

响应Cookie sameSite属性。

### secure

PhonePC/2in1TabletTVWearable



```
1. bool Rcp_ResponseCookies::secure
```

**描述**

响应Cookie安全属性。

### value

PhonePC/2in1TabletTVWearable



```
1. char* Rcp_ResponseCookies::value
```

**描述**

响应Cookie值。