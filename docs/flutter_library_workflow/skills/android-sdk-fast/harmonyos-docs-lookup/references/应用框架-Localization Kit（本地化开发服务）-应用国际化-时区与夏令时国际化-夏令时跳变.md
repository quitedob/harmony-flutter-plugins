## 功能介绍

夏令时是一种为节约能源而规定的地方时间制度，即在天亮早的夏季人为将时间调快一段时间，使人们早起早睡，减少照明时间，从而节约照明用电。

## 实现原理

系统会配置夏令时跳变规则，当系统时间到达跳变点时，会自动实现跳变。如果应用通过标准的TS接口（例如 Date()）获取和显示时间，则到夏令时跳变时间点时，应用会同步显示夏令时时间。

### 夏令时跳变计算

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { i18n } from '@kit.LocalizationKit';
   ```

   [TimezoneDstSetting.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/International/Internationalization/entry/src/main/ets/i18napplication/TimezoneDstSetting.ets#L19-L21)
2. 使用场景。

* 计算一天的小时数：一整天的小时数在夏令时跳变的当天会发生变化，并非24小时。例如，在大多数国家，夏令时开始的当天，一整天时间为23小时；夏令时结束的当天，一整天时间为25小时。计算夏令时跳变前后挂钟时间之间相差的小时数。示例代码如下：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. let calendar: i18n.Calendar = i18n.getCalendar('zh-Hans');
  2. calendar.setTimeZone('Europe/London');
  3. calendar.set(2021, 2, 27, 16, 0, 0); // 夏令时开始前的时间
  4. let startTime = calendar.getTimeInMillis();
  5. calendar.set(2021, 2, 28, 16, 0, 0); // 处于夏令时期间的时间
  6. let finishTime = calendar.getTimeInMillis();
  7. let hours = (finishTime - startTime) / (3600 * 1000); // hours = 23
  ```

  [TimezoneDstSetting.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/International/Internationalization/entry/src/main/ets/i18napplication/TimezoneDstSetting.ets#L135-L143)

### 存储和显示数据

按当地夏令时计时规则，存储和显示数据，需要处理夏令时跳变带来的时间空缺和重复。

夏令时跳入将导致一段时间空缺，例如1:59:59跳转到3:00:00；夏令时跳出将导致一段时间重复，例如3:59:59回退到3:00:00。

在夏令时内，本地时间显示建议添加夏令时标识。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7/v3/hCg6ZX0PRy2VboQiojK7_g/zh-cn_image_0000002540771582.png?HW-CC-KV=V1&HW-CC-Date=20260414T055251Z&HW-CC-Expire=86400&HW-CC-Sign=0A63D48F6A4D0F357791A760BC825D72230F2C7CE3E9BAE96DF1476209DB8516)

### 存储和传输时间数据

建议使用零时区标准时间（UTC或者GMT）存储和传输时间数据，避免夏令时跳变导致的信息丢失或异常。