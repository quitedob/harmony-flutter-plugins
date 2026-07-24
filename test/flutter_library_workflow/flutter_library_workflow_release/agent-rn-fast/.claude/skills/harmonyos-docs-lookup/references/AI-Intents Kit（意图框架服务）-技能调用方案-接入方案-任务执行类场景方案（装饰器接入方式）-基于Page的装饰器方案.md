开发者使用@InsightIntentPage装饰器进行基于Page的意图声明，可快速将已有的Page页面接入意图框架，以购买电影票的意图为例，详细说明如下：

1. 装饰器添加位置：基于Page的装饰器需要添加在Entry页面组件上，建议在目标页面中进行声明。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { InsightIntentPage } from '@kit.AbilityKit';

   3. @Builder
   4. export function PurchaseMovieTicketsIntentPageBuilder(pageName: string, param: object) {
   5. PurchaseMovieTicketsIntentPage({ param: param });
   6. }

   8. @InsightIntentPage({
   9. intentName: 'PurchaseMovieTickets',
   10. domain: 'PurchaseTickets',
   11. intentVersion: '1.0.1',
   12. displayName: '购买电影票',
   13. llmDescription: '用于在线购买电影票，允许用户选择指定影院、电影和场次时间进行购票。在用户明确表达购票需求，且已提供所有必要信息（cinema, film, time）时使用。如果信息不全或者用户只是查询电影信息、放映时间或票价，不应调用此工具。',
   14. uiAbility: 'EntryAbility',
   15. pagePath: './ets/pages/MainPage',
   16. navDestinationName: 'PurchaseMovieTicketsIntentPage',
   17. parameters: {
   18. "type": "object",
   19. "properties": {
   20. "cinema": {
   21. "type": "string",
   22. "description": "目标影院名称，仅支持平台合作的影院"
   23. },
   24. "film": {
   25. "type": "string",
   26. "description": "目标电影名称，需为当前上映或即将上映且在影院排片列表中的电影"
   27. },
   28. "time": {
   29. "type": "string",
   30. "description": "放映时间，必须为未来的场次，且需为影院当天有效排片时间；时间格式应为'YYYY-MM-DD HH:MM'（例如'2025-07-01 19:30'）"
   31. }
   32. },
   33. "required": ["cinema", "film", "time"]
   34. }
   35. })
   36. @Entry
   37. @Component
   38. struct PurchaseMovieTicketsIntentPage {
   39. param: object = new Object();
   40. cinema: string = '';
   41. film: string = '';
   42. time: string = '';
   43. aboutToAppear(): void {
   44. this.cinema= this.param?.['cinema'];
   45. this.film = this.param?.['film'];
   46. this.time = this.param?.['time'];
   47. }
   48. build() {
   49. NavDestination(){
   50. Text(`${this.cinema} ${this.film} ${this.time}`)
   51. .fontSize(30)
   52. .fontWeight(FontWeight.Bolder)
   53. }
   54. .title('IntentPage')
   55. .width('100%')
   56. }
   57. }
   ```
2. 装饰器的字段说明以及示例：@InsightIntentPage字段以及具体说明如下。

   展开

   | 字段名称 | 类型 | 必选 | 说明 |
   | --- | --- | --- | --- |
   | intentName | string | 是 | 意图名称，最大长度：64。 |
   | domain | string | 是 | 意图所属的功能垂域。 |
   | intentVersion | string | 是 | 意图的版本号，用于兼容性管理。 |
   | displayName | string | 是 | 意图的展示名称，用于界面显示，最大长度：64。 |
   | llmDescription | string | 否 | 意图的描述，详细描述该意图可实现的能力，便于大模型理解并调用。 |
   | parameters | Record<string, object> | 否 | 意图参数定义，描述参数类型以及含义。 |
   | uiAbility | string | 否 | 页面依赖的UiAbility名，如果不传递默认使用EntryAbility。 |
   | pagePath | string | 是 | Navigation组件所在页面的路径，路径基于Module的根目录的相对路径。 |
   | navDestinationName | string | 否 | Navigation子页面名称，如果不填写，则跳转到pagePath指定的页面。 |

   为便于大模型理解和调用，相关参数定义需要遵照[自定义意图相关信息定义规范](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/intents-skill-all-rec-specification)。
3. 装饰器的添加方式：装饰器可以直接手动添加，同时也支持一键生成装饰器，建议使用后者，此方式需要安装相应插件，详细步骤如下。
   1. 打开CodeGenie插件：在DevEco Studio右侧边栏点击CodeGenie或输入快捷键Alt/Option+U，可以进入DevEco CodeGenie。若使用非最新版本的DevEco Studio，可通过[下载中心](https://developer.huawei.com/consumer/cn/download/deveco-codegenie)获取并使用相关功能，具体请参考[插件获取及安装](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-codegenie#section18337533718)。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4e/v3/LWP6bJTYSGiUSNmeHt1Mrg/zh-cn_image_0000002402202277.png?HW-CC-KV=V1&HW-CC-Date=20260414T051346Z&HW-CC-Expire=86400&HW-CC-Sign=4CA1ABD47EE8A25D086757B666CE1EC32EAF2C8D18AD3858B052BB2FD66421A6 "点击放大")
   2. 框选想要接入意图框架功能的代码。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e3/v3/mC1ZHDLPSDamx0hIiQLcRA/zh-cn_image_0000002402283005.png?HW-CC-KV=V1&HW-CC-Date=20260414T051346Z&HW-CC-Expire=86400&HW-CC-Sign=87A8F2858254FE7110E4EB9E258F9EB5ACF5B8027C0EE3E6F99E26BD1146A383 "点击放大")
   3. 在选中的代码块上右键CodeGenie > Insight Intent > 选择适合的装饰器。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/35/v3/ZS8RVTCLSNGIIpRpcSXhng/zh-cn_image_0000002368683178.png?HW-CC-KV=V1&HW-CC-Date=20260414T051346Z&HW-CC-Expire=86400&HW-CC-Sign=2EE3FE0CE5FECF24151B55093DEC030689A41743324429F583E83115E5E63391 "点击放大")
   4. 在DevEco CodeGenie对话框中对意图定义，功能，参数等进行描述。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/54/v3/u0Kw0dUJS4auZrLjQ3nQMA/zh-cn_image_0000002402202953.png?HW-CC-KV=V1&HW-CC-Date=20260414T051346Z&HW-CC-Expire=86400&HW-CC-Sign=6B8DE07C9B67F957577447A7CF4BBAD837B305BA2C3C93C52E8E42CBD08D4AA3 "点击放大")
   5. 回车或者点击发送按钮，即可生成对应的装饰器内容。

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/55/v3/3RiD9PHcTtq7Bl4MIqPLeA/zh-cn_image_0000002368523474.png?HW-CC-KV=V1&HW-CC-Date=20260414T051346Z&HW-CC-Expire=86400&HW-CC-Sign=140CDE5BCC41820FF8DCEFCB1066AE4EDD44C80576A8B53F323961481C39ED73 "点击放大")
   6. 将光标放置于要插入装饰器的位置，点击插入图标，即可在对应位置插入装饰器。

      插入前：

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/90/v3/OVxGxL5lQaa0AKX7A7MwZA/zh-cn_image_0000002407408805.png?HW-CC-KV=V1&HW-CC-Date=20260414T051346Z&HW-CC-Expire=86400&HW-CC-Sign=658733474D8D321654A3ECEDE882989A47542346CBC8183B9F474789F1AD01E4 "点击放大")

      插入后：

      ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d8/v3/QhVEYzbASw6IXtFtH08Y9A/zh-cn_image_0000002407528689.png?HW-CC-KV=V1&HW-CC-Date=20260414T051346Z&HW-CC-Expire=86400&HW-CC-Sign=E489809A18F604E96798719216633C875BDF0396A9EB74FD0D8F015D29071C10 "点击放大")
4. 装饰器的使用约束和说明：
   * 仅支持Navigation页面架构跳转。
   * 该跳转不能有自定义上下文依赖，比如必须打开前置页面才能跳转，开发者需要进行验证，确认兜底策略。
   * 跳转页面时，默认使用Navigation页面栈进行push，如果开发者需要实现其他跳转逻辑，则需要自行适配。