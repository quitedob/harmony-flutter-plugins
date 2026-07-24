## 场景介绍

本章节将介绍如何集成区划选择控件。该控件不支持在智能表设备中调用。

区划选择控件可加载全球或指定国家的区划信息，支持以树状结构化选择，支持功能：

* 支持查看选中区划的下级区划。
* 支持推荐热门区划。
* 支持子窗拉起区划控件，适合宽屏设备使用。

|  |  |
| --- | --- |
| **图1** 选择国家 | **图2** 选择省市 |
| **图3** 子窗拉起区划控件 |  |

## 约束与限制

使用该功能需满足以下条件：

* 仅支持手机、平板和2in1设备。

## 接口说明

区划选择控件功能主要由[sceneMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap)命名空间下的[selectDistrict](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section1567213912302)方法提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap)。

展开

| 接口名 | 描述 |
| --- | --- |
| [DistrictSelectOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section17211958161110) | 区划选择页面初始选项。 |
| [selectDistrict](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section1567213912302)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), options: [DistrictSelectOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section17211958161110)): Promise<[DistrictSelectResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section3745121172118)> | 调出区划选择页面。 |
| [DistrictSelectResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section3745121172118) | 区划选择结果。 |

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { sceneMap } from '@kit.MapKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 创建区划选择请求参数，调用[selectDistrict](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-scenemap#section1567213912302)方法拉起区划选择页。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let districtSelectOptions: sceneMap.DistrictSelectOptions = {
   2. countryCode: "CN",
   3. // 使用子窗拉起方式
   4. subWindowEnabled: true
   5. };
   6. // 拉起区划选择页
   7. sceneMap.selectDistrict(this.getUIContext().getHostContext(), districtSelectOptions).then((data) => {
   8. console.info("SelectDistrict", "Succeeded in selecting district.");
   9. }).catch((err: BusinessError) => {
   10. console.error("SelectDistrict", `Failed to select district, code: ${err.code}, message: ${err.message}`);
   11. });
   ```