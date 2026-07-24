推荐使用[@ifbear/fast-xml-parser](https://ohpm.openharmony.cn/#/cn/detail/@ifbear%2Ffast-xml-parser)。

执行如下命令行，安装依赖。

收起

自动换行

深色代码主题

复制

```
1. To use as package dependency $ ohpm install @ifbear/fast-xml-parser
```

示例代码：

收起

自动换行

深色代码主题

复制

```
1. const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");

3. const parser = new XMLParser();
4. let jObj = parser.parse(XMLdata);
```