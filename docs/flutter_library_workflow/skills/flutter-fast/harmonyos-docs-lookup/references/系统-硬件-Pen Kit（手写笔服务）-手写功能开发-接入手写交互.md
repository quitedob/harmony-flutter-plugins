接入手写交互功能，对于需要接入支持双击/轻捏功能的手写笔的第三方应用，可以通过调用下面相应接口来监听手写笔双击/轻捏事件，从而触发自身应用内部回调，来执行指定操作。

## 接口说明

展开

| 类名 | 接口名 | 说明 |
| --- | --- | --- |
| stylusInteraction | [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-stylusinteraction#section98913119599)(type: 'squeeze', receiver: Callback<[SqueezeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-stylusinteraction#section10272152161111)>): void | 监听手写笔轻捏事件。 |
| stylusInteraction | [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-stylusinteraction#section137391712323)(type: 'squeeze', receiver?: Callback<[SqueezeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-stylusinteraction#section10272152161111)>): void | 取消监听手写笔轻捏事件。 |
| stylusInteraction | [on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-stylusinteraction#section450110191857)(type: 'doubleTap', receiver: Callback<[DoubleTapEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-stylusinteraction#section4950173171415)>): void | 监听手写笔双击事件。 |
| stylusInteraction | [off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-stylusinteraction#section9865271579)(type: 'doubleTap', receiver?: Callback<[DoubleTapEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-stylusinteraction#section4950173171415)>): void | 取消监听手写笔双击事件。 |

## 手写笔轻捏事件

1.导入相关模块。

收起

自动换行

深色代码主题

复制

```
1. import { stylusInteraction } from '@kit.Penkit';
2. import { BusinessError } from '@kit.BasicServicesKit';
```

2.监听手写笔轻捏事件。

收起

自动换行

深色代码主题

复制

```
1. try {
2. stylusInteraction.on('squeeze', (event: stylusInteraction.SqueezeEvent) => {
3. console.info(`got squeeze event, time: ${event.timestamp}`);
4. });
5. } catch (err) {
6. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
7. }
```

3.取消监听手写笔轻捏事件。

收起

自动换行

深色代码主题

复制

```
1. try {
2. stylusInteraction.off('squeeze', (event: stylusInteraction.SqueezeEvent) => {
3. console.info(`off squeeze event, time: ${event.timestamp}`);
4. });
5. } catch (err) {
6. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
7. }
```

## 手写笔双击事件

1.导入相关模块。

收起

自动换行

深色代码主题

复制

```
1. import { stylusInteraction } from '@kit.Penkit';
2. import { BusinessError } from '@kit.BasicServicesKit';
```

2.监听手写笔双击事件。

收起

自动换行

深色代码主题

复制

```
1. try {
2. stylusInteraction.on('doubleTap', (event: stylusInteraction.DoubleTapEvent) => {
3. console.info(`got doubleTap event, time: ${event.timestamp}`);
4. });
5. } catch (err) {
6. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
7. }
```

3.取消监听手写笔双击事件。

收起

自动换行

深色代码主题

复制

```
1. try {
2. stylusInteraction.off('doubleTap', (event: stylusInteraction.DoubleTapEvent) => {
3. console.info(`off doubleTap event, time: ${event.timestamp}`);
4. });
5. } catch (err) {
6. console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
7. }
```