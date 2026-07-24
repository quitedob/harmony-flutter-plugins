![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/82/v3/bdE_dUiBSKuLyT1rxZEDWg/zh-cn_image_0000002540611590.png?HW-CC-KV=V1&HW-CC-Date=20260414T035257Z&HW-CC-Expire=86400&HW-CC-Sign=E6E14673533EBC9E766D4CEDDF7DA6648C2FFA8D0AC49FDD625D7FA565862518)

当用户使用触控板时，会根据不同的操作方式生成相应的事件。单指点触会产生鼠标左键点击事件，单指轻触移动会产生不按键的鼠标移动事件；双指点触会产生鼠标右键点击事件，双指轻触移动会产生轴事件。

说明

需要注意的是，与触屏不同，触控板上的多指操作并不会体现在上报的事件中，应用无法获取手指信息。

## 单指操作

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a2/v3/U_79M23kQZWBmNsX4-VOjw/zh-cn_image_0000002571171585.png?HW-CC-KV=V1&HW-CC-Date=20260414T035257Z&HW-CC-Expire=86400&HW-CC-Sign=39B6A53D1E855605149AF1E3FBAE5649E0FD6A288BC783049FB266FD6AB7091F)

单指操作触控板与操作鼠标的方式相同。例如，轻触后滑动会产生鼠标移动事件，而重按则会产生鼠标左键按下事件。若需判断鼠标事件是来自触控板还是鼠标设备，可以通过[sourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-gesture-settings#sourcetype枚举说明8)和[sourceTool](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-gesture-settings#sourcetool枚举说明9)信息进行区分。

对该种操作产生的事件的处理，请参考[处理鼠标移动](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-interaction-development-guide-mouse#处理鼠标移动)章节。

## 双指滑动

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fb/v3/jWyJtRQCSamHPhUCwJOJQA/zh-cn_image_0000002540771244.png?HW-CC-KV=V1&HW-CC-Date=20260414T035257Z&HW-CC-Expire=86400&HW-CC-Sign=873ED44E3FC000252BEA08943CBA09D97E570C808D2E54E5DF40994B20F5C835)

与鼠标滚轮不同，触控板上双指滑动产生的轴事件上报的数值单位并非角度，而是位移像素，为了区分该点，在处理轴值之前，可以通过sourceType及sourceTool来区分。

当用户使用双指横滑时，可从[axisHorizontal](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-gesture-customize-judge#属性)中获取横向轴值（位移像素），向右滑动时，上报数值为负，向左滑动时，上报数值为正。使用双指竖滑时，可从[axisVertical](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-gesture-customize-judge#属性)获取到纵向轴值（位移像素），向上滑动时，上报数值为正，向下滑动时，上报数值为负。

同滚轮一样，产生的轴事件可以驱动滑动手势的触发。向右滑动时，上报offsetX数值为正，向左滑动时，上报offsetX数值为负。向上滑动时，上报offsetY数值为负，向下滑动时，上报offsetY数值为正。

说明

只有在开始滚动操作的那一刻光标所在位置下的组件上的手势会被收集。

## 双指捏合

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/90/v3/eYZq2MiCQKOOvMO61cDifg/zh-cn_image_0000002571291541.png?HW-CC-KV=V1&HW-CC-Date=20260414T035257Z&HW-CC-Expire=86400&HW-CC-Sign=033ED5360DE024DA0F954C39C5CFACFBDD6BF698DEBDCC9E3F0ACCDDBF8C8E55)

在触控板上通过双指捏合，可以产生捏合缩放值上报。该值表示一个相对缩放比例，可用于实现UI缩放效果。系统上报的数值为一个scale比例，其以双指开始捏合的那一刻（此时为1.0）为基准参考。当双指往外扩张时，scale逐渐从1.0增大；当双指往内合并时，scale逐渐减小。