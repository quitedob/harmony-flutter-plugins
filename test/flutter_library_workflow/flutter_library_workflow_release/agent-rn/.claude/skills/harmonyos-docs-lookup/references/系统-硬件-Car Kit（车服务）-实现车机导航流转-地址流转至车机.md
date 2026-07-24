将手机应用的地址文本流转至车机指定地图应用的能力。

## 场景介绍

碰一碰地址流转：用户在手机地址文本页面与车机中控屏指定区域碰一碰后，将手机上的地址数据流转至车机的地图应用，发起地址搜索。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5/v3/hTKckebjSeSPNXwWLUaO2A/zh-cn_image_0000002513696327.png?HW-CC-KV=V1&HW-CC-Date=20260414T045715Z&HW-CC-Expire=86400&HW-CC-Sign=98AEC7A019AA691BE871CC75DD64E6EE22C6D7BBE65F90CE32E7C6FF897AF55D "点击放大")

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [accessibilityTextHint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-accessibility#accessibilitytexthint12)(value: string): T | 设置辅助功能文本提示。 |

### 参数value说明

value是一个Json格式的字符串，具体属性说明如下：

展开

| 属性 | 描述 |
| --- | --- |
| type | 文本类型，必须是“**location**”。 |
| groupId | 地址编组ID，用于多个Text文本分组，同一组的地址文本流转到车机后会自动拼接到一起。 |
| index | 地址索引，用来标识同一组地址文本的顺序。同一组的地址文本流转到车机后会按照index由小到大拼接成一个完整地址。  例如：'XXX街道' + 'XXX商场' = 'XXX街道XXX商场' |

给手机地址文本（Text）设置accessibilityTextHint属性后即可使用地址流转能力。

## 开发步骤

1. 能力配置。

   碰一碰地址流转场景下，metadata的name取值为carHopCapability，value取值应为**carHopAddress**，具体配置请参考[配置能力](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/car-preparations#section239110365269)。示例代码如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. "metadata": [
   2. {
   3. "name": "carHopCapability",
   4. "value": "carHopAddress"
   5. }
   6. ]
   ```
2. 定义accessibilityTextHint的value值。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const hintContentValue = JSON.stringify({
   2. type: 'location', // 类型，必须是 'location'
   3. groupId: 1, // 分组id
   4. index: 2, // 索引
   5. });
   ```
3. 给地址文本设置accessibilityTextHint属性。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. Text('xxx一路')
   2. .fontSize(20)
   3. .fontWeight(FontWeight.Bold)
   4. .accessibilityTextHint(hintContentValue)

   6. // 单地址场景
   7. Text('xxx二路')
   8. .accessibilityTextHint(JSON.stringify({ type: 'location' }))

   10. // 多地址场景
   11. Text('xxx商场')
   12. .accessibilityTextHint(JSON.stringify({ type: 'location', groupId: 1, index: 1, }))
   13. Text('xxx街')
   14. .accessibilityTextHint(JSON.stringify({ type: 'location', groupId: 1, index: 0, }))
   ```