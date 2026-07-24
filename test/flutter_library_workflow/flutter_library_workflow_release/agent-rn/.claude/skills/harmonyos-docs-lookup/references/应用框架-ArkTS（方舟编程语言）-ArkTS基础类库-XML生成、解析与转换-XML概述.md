XML（可扩展标记语言）是一种用于描述数据的标记语言，提供通用的数据传输和存储方式。XML不预定义标记，因此更加灵活，适用于广泛的应用领域。

XML文档由元素（element）、属性（attribute）和内容（content）组成。

* 元素指的是标记对，包含文本、属性或其他元素。
* 属性提供了有关元素的其他信息。
* 内容则是元素包含的数据或子元素。

XML使用XML Schema或DTD（文档类型定义）定义文档结构，开发人员可以利用这些机制创建自定义规则，以验证XML文档的格式是否符合预期规范。

XML支持命名空间、实体引用、注释和处理指令，灵活适应各种数据需求。

语言基础类库提供了XML相关的基础能力，包括：[XML的生成](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/xml-generation)、[XML的解析](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/xml-parsing)和[XML的转换](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/xml-conversion)。

以下是一个简单的XML样例及对应说明，更多XML的接口和具体使用，请见[@ohos.xml](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-xml)。

收起

自动换行

深色代码主题

复制

```
1. <!-- 声明 -->
2. <?xml version="1.0" encoding="utf-8"?>
3. <!-- 处理指令 -->
4. <?xml-stylesheet type="text/css" href="style.css"?>
5. <!-- 元素、属性及属性值 -->
6. <note importance="high">
7. <title>Happy</title>
8. <!-- 实体引用 -->
9. <todo>&amp;</todo>
10. <!-- 命名空间的声明及统一资源标识符 -->
11. <h:table xmlns:h="http://www.w3.org/TR/html4/">
12. <h:tr>
13. <h:td>Apples</h:td>
14. <h:td>Bananas</h:td>
15. </h:tr>
16. </h:table>
17. </note>
```