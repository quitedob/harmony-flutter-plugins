## 导入模块

PhonePC/2in1TabletWearable



```
1. import { map } from '@kit.MapKit';
```

## Animation

PhonePC/2in1TabletWearable

动画抽象类。

说明

动画持续时间默认值为250ms；动画执行完成后的状态，默认值为默认值为[AnimationFillMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-animationfillmode).FORWARDS；动画插值器，默认值为[Curve](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-curve#curve).Linear；动画重复执行的次数，默认值为0；重复执行的模式，默认值为[AnimationRepeatMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-animationrepeatmode).RESTART。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**示例：**



```
1. let animation = new map.RotateAnimation(0, 270);
2. // 动画执行时间
3. animation.setDuration(2000);

5. // 动画结束状态
6. animation.setFillMode(map.AnimationFillMode.BACKWARDS);

8. // 动画重复模式
9. animation.setRepeatMode(map.AnimationRepeatMode.REVERSE);

11. // 动画重复次数
12. animation.setRepeatCount(100);

14. // 根据开发需要设置动画监听
15. let callbackStart = () => {
16. console.info("animationStart", `callback`);
17. };
18. let callbackEnd = () => {
19. console.info("animationEnd", `callback`);
20. };
21. animation.on("animationStart", callbackStart);
22. animation.on("animationEnd", callbackEnd);
```

### setDuration

PhonePC/2in1TabletWearable

setDuration(duration: number): void

设置动画持续时间。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| duration | number | 是 | 动画持续时间，单位：ms，取值范围：大于等于0，异常值不处理。 |

**示例：**



```
1. animation.setDuration(3000);
```

### setFillMode

PhonePC/2in1TabletWearable

setFillMode(fillMode: AnimationFillMode): void

设置动画执行完成后的状态。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| fillMode | [AnimationFillMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-animationfillmode) | 是 | 动画执行完成后的状态。 |

**示例：**



```
1. animation.setFillMode(map.AnimationFillMode.BACKWARDS);
```

### setInterpolator

PhonePC/2in1TabletWearable

setInterpolator(curve: Curves.Curve): void

设置动画插值器。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| curve | [Curves.Curve](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-curve#curve) | 是 | 动画插值器。 |

**示例：**



```
1. animation.setInterpolator(Curve.Linear);
```

### setRepeatCount

PhonePC/2in1TabletWearable

setRepeatCount(repeatCount: number): void

设置动画重复执行的次数。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| repeatCount | number | 是 | 动画重复执行的次数。  正数：根据值重复执行  0：动画不重复执行  -1：执行次数是无限  小于-1或其他异常值，取值默认为0 |

**示例：**



```
1. animation.setRepeatCount(100);
```

### setRepeatMode

PhonePC/2in1TabletWearable

setRepeatMode(repeatMode: AnimationRepeatMode): void

设置重复执行的模式，默认从前往后执行。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| repeatMode | [AnimationRepeatMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-animationrepeatmode) | 是 | 重复执行的模式。 |

**示例：**



```
1. animation.setRepeatMode(map.AnimationRepeatMode.RESTART);
```

### on('start')

PhonePC/2in1TabletWearable

on(type: 'start', callback: Callback<void>): void

监听动画开始事件。使用callback异步回调。

建议使用[animation.on(type: 'animationStart')](/consumer/cn/doc/harmonyos-references/map-map-animation#onanimationstart)。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| type | string | 是 | 'start'：动画开始事件。 |
| callback | Callback<void> | 是 | 回调函数，无返回结果。 |

**示例：**



```
1. animation.on("start", () => {
2. console.info(`start alphaAnimation`);
3. });
```

### off('start')

PhonePC/2in1TabletWearable

off(type: 'start', callback: Callback<void>): void

取消监听动画开始事件。使用callback异步回调。

建议使用[animation.off(type: 'animationStart')](/consumer/cn/doc/harmonyos-references/map-map-animation#offanimationstart)。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| type | string | 是 | 'start'：动画开始事件。 |
| callback | Callback<void> | 是 | 回调函数，无返回结果。 |

**示例：**



```
1. animation.off("start", () => {
2. console.info(`start alphaAnimation`);
3. });
```

### on('end')

PhonePC/2in1TabletWearable

on(type: 'end', callback: Callback<void>): void

监听动画结束事件。使用callback异步回调。

建议使用[animation.on(type: 'animationEnd')](/consumer/cn/doc/harmonyos-references/map-map-animation#onanimationend)。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| type | string | 是 | 'end'：动画结束事件。 |
| callback | Callback<void> | 是 | 回调函数，无返回结果。 |

**示例：**



```
1. animation.on("end", () => {
2. console.info(`end alphaAnimation`);
3. });
```

### off('end')

PhonePC/2in1TabletWearable

off(type: 'end', callback: Callback<void>): void

取消监听动画结束事件。使用callback异步回调。

建议使用[animation.off(type: 'animationEnd')](/consumer/cn/doc/harmonyos-references/map-map-animation#offanimationend)。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| type | string | 是 | 'end'：动画结束事件。 |
| callback | Callback<void> | 是 | 回调函数，无返回结果。 |

**示例：**



```
1. animation.off("end", () => {
2. console.info(`end alphaAnimation`);
3. });
```

### on('animationStart')

PhonePC/2in1TabletWearable

on(type: 'animationStart', callback: Callback<void>): void

监听动画开始事件。支持传递多个callback异步回调。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 5.0.0(12)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| type | string | 是 | 'animationStart'：监听动画开始事件。 |
| callback | Callback<void> | 是 | 回调函数，无返回结果。监听动画开始事件。 |

**示例：**



```
1. let callback1 = () => {
2. console.info("animationStart", `callback1`);
3. };
4. let callback2 = () => {
5. console.info("animationStart", `callback2`);
6. };
7. let callback3 = () => {
8. console.info("animationStart", `callback3`);
9. };
10. animation.on("animationStart", callback1);
11. animation.on("animationStart", callback2);
12. animation.on("animationStart", callback3);
```

### off('animationStart')

PhonePC/2in1TabletWearable

off(type: 'animationStart', callback?: Callback<void>): void

取消监听动画开始事件。支持传递多个callback异步回调。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 5.0.0(12)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| type | string | 是 | 'animationStart'：监听动画开始事件。 |
| callback | Callback<void> | 否 | 回调函数，无返回结果。取消监听动画开始事件。  - callback为空：取消所有callback回调。  - callback非空：取消指定的callback回调。 |

**示例：**



```
1. let callback1 = () => {
2. console.info("animationStart", `callback1`);
3. };
4. let callback2 = () => {
5. console.info("animationStart", `callback2`);
6. };
7. let callback3 = () => {
8. console.info("animationStart", `callback3`);
9. };
10. animation.on("animationStart", callback1);
11. animation.on("animationStart", callback2);
12. animation.on("animationStart", callback3);

14. // 只取消callback1对象的事件响应，当animationStart事件发生时，callback2和callback3会正常被调用
15. animation.off('animationStart', callback1);
16. // 取消全部animationStart事件响应
17. animation.off('animationStart');
```

### on('animationEnd')

PhonePC/2in1TabletWearable

on(type: 'animationEnd', callback: Callback<void>): void

监听动画结束事件。支持传递多个callback异步回调。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 5.0.0(12)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| type | string | 是 | 'animationEnd'：动画结束事件。 |
| callback | Callback<void> | 是 | 回调函数，无返回结果。监听动画结束事件。 |

**示例：**



```
1. let callback1 = () => {
2. console.info("animationEnd", `callback1`);
3. };
4. let callback2 = () => {
5. console.info("animationEnd", `callback2`);
6. };
7. let callback3 = () => {
8. console.info("animationEnd", `callback3`);
9. };
10. animation.on("animationEnd", callback1);
11. animation.on("animationEnd", callback2);
12. animation.on("animationEnd", callback3);
```

### off('animationEnd')

PhonePC/2in1TabletWearable

off(type: 'animationEnd', callback?: Callback<void>): void

取消监听动画结束事件。支持传递多个callback异步回调。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 5.0.0(12)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| type | string | 是 | 'animationEnd'：监听动画结束事件。 |
| callback | Callback<void> | 否 | 回调函数，无返回结果。取消监听动画结束事件。  - callback为空：取消所有callback回调。  - callback非空：取消指定的callback回调。 |

**示例：**



```
1. let callback1 = () => {
2. console.info("animationEnd", `callback1`);
3. };
4. let callback2 = () => {
5. console.info("animationEnd", `callback2`);
6. };
7. let callback3 = () => {
8. console.info("animationEnd", `callback3`);
9. };
10. animation.on("animationEnd", callback1);
11. animation.on("animationEnd", callback2);
12. animation.on("animationEnd", callback3);

14. // 只取消callback1对象的事件响应，当animationEnd事件发生时，callback2和callback3会正常被调用
15. animation.off('animationEnd', callback1);
16. // 取消全部animationEnd事件响应
17. animation.off('animationEnd');
```