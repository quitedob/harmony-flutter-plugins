从API version 20开始，ArkWeb提供了H5页面内的文本分词识别功能，支持文本分词高亮、分词长按预览及文本选择菜单扩展等。这些功能需将[enableDataDetector](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-attributes#enabledatadetector20)设置为true，默认为false。

此功能主要用于单页H5页面内容的实体识别，能够自动识别页面中的电话号码、网址等信息，并提供便捷的交互操作。启用此功能后，用户可以直接在页面中与识别的实体交互，如点击电话号码进行呼叫，点击地址在地图中查看，从而提升用户体验。

可识别的实体类型包括电话、链接、邮箱、地址和时间，详见[TextDataDetectorType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textdatadetectortype11枚举说明)。

## 文本分词高亮

Web组件内的H5页面加载完成后，自动识别并高亮标注页面内的特殊实体。页面变化后新出现的实体不会被高亮标注。

特殊实体的高亮过滤规则如下：

* 不处理输入框内、可编辑区域内的文本实体。
* 不处理<a></a>标签内的文本实体。
* 不处理跨域iframe内、两层及以上嵌套iframe内的文本实体。
* 跨节点的实体不会被高亮，如<p>星<span>期六</span></p>。

页面中文本实体高亮后，将转变为超链接形式。触摸点击或鼠标左键点击实体，会根据实体类型弹出操作菜单。

收起

自动换行

深色代码主题

复制

```
1. import { webview } from '@kit.ArkWeb';

3. @Entry
4. @Component
5. struct Index {
6. @State message: string = 'Hello World';
7. webController: webview.WebviewController = new webview.WebviewController();

9. build() {
10. Column() {
11. Row() {
12. Button('Refresh')
13. .onClick(() => {
14. this.webController.refresh();
15. })
16. }

18. Web({
19. src: $rawfile('index.html'),
20. controller: this.webController
21. })
22. .enableDataDetector(true)
23. .dataDetectorConfig({
24. types: []  // 实体识别类型，为空则识别所有类型
25. })
26. }
27. .height('100%')
28. .width('100%')
29. }
30. }
```

[WebDataDetectorHighlighting.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ArkWebDataDetector/entry/src/main/ets/pages/WebDataDetectorHighlighting.ets#L15-L46)

加载的html文件。

收起

自动换行

深色代码主题

复制

```
1. <!-- index.html -->
2. <!DOCTYPE html>
3. <html>
4. <head>
5. <title>Test</title>
6. <meta name="viewport" content="width=device-width, initial-scale=1.0">
7. </head>
8. <body>
9. <p>电话：400-123-4567</p>
10. <p>邮箱：test@example.com</p>
11. <p>网址：https://www.example.com/</p>
12. <p>日期：2025.06.01</p>
13. <p>地址：北京市海淀区中关村</p>
14. <p>不会高亮的星<span>期六</span>与会高亮的星期六</p>
15. </body>
16. </html>
```

点击实体文本，弹出对应的操作菜单，如下图。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/83/v3/6o8H679NSMS37iPzLDwVpg/zh-cn_image_0000002540771522.gif?HW-CC-KV=V1&HW-CC-Date=20260414T041013Z&HW-CC-Expire=86400&HW-CC-Sign=34B9BF0DD4C1189E1052A017BFC5D16FE2D182A7AB63D55B089873CBA362BFE9)

鼠标右键点击、鼠标拖拽将触发超链接的默认行为。

接口[dataDetectorConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-attributes#datadetectorconfig20)未被使用，或其参数[TextDataDetectorConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textdatadetectorconfig11对象说明)的enablePreviewMenu设置为false时，长按、拖拽将触发超链接的默认行为，如下图。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5b/v3/BDY1Qn12QYmuQi9euX3ZBg/zh-cn_image_0000002571291817.gif?HW-CC-KV=V1&HW-CC-Date=20260414T041013Z&HW-CC-Expire=86400&HW-CC-Sign=796D7EAE35BCE92F92A569A1387AF5A633C015657D10F8A0677A52B5E463FB59)

页面文本元素的计算样式存在user-select:none时，实体菜单中“选择文本”的选项无效，但在[copyOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-attributes#copyoptions11)不为CopyOptions.None时，仍可以复制实体文本。

## 分词长按预览

使用分词长按预览功能时，需要额外配置[dataDetectorConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-attributes#datadetectorconfig20)：

收起

自动换行

深色代码主题

复制

```
1. Web({
2. src: $rawfile('index.html'),
3. controller: this.webController
4. })
5. .enableDataDetector(true)
6. .dataDetectorConfig({
7. enablePreviewMenu: true,  // 配置分词长按预览功能
8. types: []
9. })
```

[WebDataDetectorLongPress.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkWeb/ArkWebDataDetector/entry/src/main/ets/pages/WebDataDetectorLongPress.ets#L31-L41)

在[copyOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-attributes#copyoptions11)不为CopyOptions.None时，长按被高亮的实体文本，会弹出预览菜单，如下图。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ba/v3/6sNvjBkySCap14ploCXwSQ/zh-cn_image_0000002540611870.gif?HW-CC-KV=V1&HW-CC-Date=20260414T041013Z&HW-CC-Expire=86400&HW-CC-Sign=8383EE5CE7788A7C86FF28BC5AA8BCB4489FE1D6162FFE75EAF43D5A381B76DC)

通过[bindSelectionMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-attributes#bindselectionmenu13)绑定的[自定义菜单](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/web-menu#自定义菜单)与分词长按预览菜单互不影响。长按被高亮的分词超链接不会弹出自定义超链接菜单，长按普通超链接也不会弹出分词预览菜单。

## 文本选择菜单扩展

从API version 22开始，支持通过[enableSelectedDataDetector](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-attributes#enableselecteddatadetector22)单独配置文本选择AI菜单的启用情况。

在非编辑区域中，选中的文本满足以下条件时，文本选择菜单将显示相应的AI菜单项：

* 选中文本经过UTF-8编码转换后，其字节长度不超过255字节。
* 选中文本中仅包含一个匹配识别类型的实体（可通过[dataDetectorConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-attributes#datadetectorconfig20)配置支持的识别类型）。
* 不处于“全选”操作状态下的文本。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6b/v3/uuwy-0wLS226Urad0G_JeQ/zh-cn_image_0000002571171865.gif?HW-CC-KV=V1&HW-CC-Date=20260414T041013Z&HW-CC-Expire=86400&HW-CC-Sign=E67D2C626BA8D045DCB81B2121A33370D180E382D246C934BBD6230A5DC3BECD)

AI菜单项的出现与是否选中高亮的实体文本无关，只要满足上述条件，AI菜单项就会显示。