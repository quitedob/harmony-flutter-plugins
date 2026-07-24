**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Stylus.Handwrite

**起始版本：** 5.0.0(12)

## 导入模块

PhonePC/2in1Tablet



```
1. import { PointPredictor } from '@kit.Penkit';
```

本模块提供以下方法。

展开

| 方法名称 | 说明 |
| --- | --- |
| [getPredictionPoint](/consumer/cn/doc/harmonyos-references/pen-pointpredictor#getpredictionpoint) | 获取预测点信息。 |

## getPredictionPoint

PhonePC/2in1Tablet

getPredictionPoint(event: TouchEvent): TouchPoint

获取预测点信息。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Stylus.Handwrite

**起始版本：** 5.0.0(12)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| event | [TouchEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-touch#touchevent对象说明) | 是 | 当前点信息。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [TouchPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#touchpoint11) | 预测点信息。 |

**示例：**



```
1. import { PointPredictor } from '@kit.Penkit';

3. @Entry
4. @Component
5. struct PointPredictorDemo {
6. @State actualXCoordinate: number = 0
7. @State actualYCoordinate: number = 0
8. @State predictorXCoordinate: Dimension = 0
9. @State predictorYCoordinate: Dimension = 0
10. pointPredictor: PointPredictor = new PointPredictor();

12. aboutToAppear() {
13. console.info('getPredictionPoint aboutToAppear')
14. }

16. aboutToDisappear() {
17. console.info('getPredictionPoint aboutToDisappear')
18. }

20. build() {
21. Stack({ alignContent: Alignment.TopEnd }) {
22. this.Canvas() // 画布。
23. }.height('100%').width('100%')
24. }

26. // 画布
27. @Builder
28. Canvas() {
29. Column() {
30. Text("实际点坐标： X: " + this.actualXCoordinate + " Y: " + this.actualYCoordinate).textAlign(TextAlign.Start)
31. Text("预测点坐标： X: " + this.predictorXCoordinate + " Y: " + this.predictorYCoordinate)
32. .textAlign(TextAlign.Start)
33. }.position({ x: 0, y: 0 })
34. .alignItems(HorizontalAlign.Start)

36. Stack()
37. .width('100%')
38. .height('100%')
39. .onTouch((event: TouchEvent) => {
40. switch (event.type) {
41. case TouchType.Down: // 按下时，新建一条画图路径。
42. break;
43. case TouchType.Move: // 使用预测算法进行预测，获得预测点。
44. let point = this.pointPredictor?.getPredictionPoint(event)
45. this.actualXCoordinate = event.touches[0]?.x
46. this.actualYCoordinate = event.touches[0]?.y
47. this.predictorXCoordinate = point?.x
48. this.predictorYCoordinate = point?.y
49. console.info("pointPredictor 实际点坐标 x:" + event.touches[0]?.x + " y:" + event.touches[0]?.y)
50. console.info("pointPredictor 预测点坐标 x:" + point?.x + "  y:" + point?.y)
51. break;
52. case TouchType.Up:
53. break;
54. }
55. })
56. }
57. }
```