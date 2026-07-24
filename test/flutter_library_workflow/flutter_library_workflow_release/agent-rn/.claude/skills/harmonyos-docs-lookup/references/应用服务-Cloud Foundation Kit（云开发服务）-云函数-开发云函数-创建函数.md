## 创建函数

开通云函数服务后，首先需要在AGC中创建函数，并添加函数执行的代码。

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，点击“开发与服务”。
2. 在项目列表中点击需要创建云函数的项目。
3. 在左侧导航栏选择“云开发（Serverless） > 云函数”，进入云函数主界面。
4. 选择“函数”页签，点击“创建函数”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/94/v3/lbAhrwgTQYSRsrVROegeXg/zh-cn_image_0000002440934452.png?HW-CC-KV=V1&HW-CC-Date=20260414T025714Z&HW-CC-Expire=86400&HW-CC-Sign=2856CE8EE33E78312D7B9599B74B11A78203A428937D543AD22868B2C830D34F)
5. 页面右侧抽屉式滑出“创建函数”窗口，按照“函数配置 -> 触发器 -> 函数代码 -> 层配置”引导顺序配置函数。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/66/v3/gFx0JGK5RyiZ5olLDlq5-w/zh-cn_image_0000002440934464.png?HW-CC-KV=V1&HW-CC-Date=20260414T025714Z&HW-CC-Expire=86400&HW-CC-Sign=CAF7B6A1A59578171BC8AACE1D52EB5E77763A4BE51595D9FFE9388975B4D3BB)

## 函数配置

1. 在“函数配置”页面，配置“函数名称”、“触发方式”、“超时时长”等函数信息。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e1/v3/CofAFZ2ZRz26UfLiHy5W0A/zh-cn_image_0000002474174573.png?HW-CC-KV=V1&HW-CC-Date=20260414T025714Z&HW-CC-Expire=86400&HW-CC-Sign=6E4561E7EBC19EA20D8EF1DF5E0D6F9DEDF0047ABD1980E357505C6DFF2C6559)

   展开

   | 配置项 | **说明** |
   | --- | --- |
   | 函数名称 | 函数的名称。 |
   | 描述 | 函数的描述信息。 |
   | 触发方式 | **请配置为“事件调用”。**  “事件调用”表示通过触发器方式调用函数。 |
   | 超时时长 | 函数最大运行时长，超过该时长，则默认函数执行失败，单位为秒，取值范围为1~1800。不同调用方式下，函数最大运行时长不同：  * “同步”调用方式时，函数最大运行时长为55秒。 * “异步”调用方式时，函数最大运行时长为1800秒。 |
   | 实例并发 | 函数请求并发量上限，单位为个，取值范围为1~10000。 |
   | 环境变量 | key-value形式，可以将需要的变量配置信息传入函数执行环境中，用于函数在运行时读取和使用。 |
2. （可选）可根据需要添加环境变量，支持**表单格式**和**JSON格式**两种编辑方式。添加完成后，还可以点击“JSON格式导出”，导出以“函数名称.json”格式命名的环境变量文件，以备后续使用。

   说明

   * 环境变量的key值具有唯一性，且“PROJECT\_CREDENTIAL”和“AGC\_”为系统级环境变量标识，不允许添加以其命名或以其为前缀的环境变量。
   * 环境变量总数不超过1000个。

   * 表单格式编辑

     点击“新增变量”，输入key和value值，如下图中所示，env1为环境变量的key值，test为value值。点击![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a0/v3/r145mF5_SNurrYh3F65Srw/zh-cn_image_0000002474214433.png?HW-CC-KV=V1&HW-CC-Date=20260414T025714Z&HW-CC-Expire=86400&HW-CC-Sign=AECC0085C60F456DAFB733BCA9945DCA88E57E2403AA526D69B9AECC440F00F8)可将变量删除。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b4/v3/zB-EQnEoThGzIFd0tvWFUA/zh-cn_image_0000002440774584.png?HW-CC-KV=V1&HW-CC-Date=20260414T025714Z&HW-CC-Expire=86400&HW-CC-Sign=FCF1C7B4F25E8976186124FD05000E0A8E1AE48B0F73D4A117319CB8F0BCB1D8)
   * JSON格式编辑

     选中“JSON格式编辑”，在文本框中以key-value键值对JSON格式添加环境变量。当添加的环境变量比较多时，为了方便核对，可点击“format”对变量进行格式化排列。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e5/v3/9O283N2tR5yPFYyjEUgIKg/zh-cn_image_0000002474174617.png?HW-CC-KV=V1&HW-CC-Date=20260414T025714Z&HW-CC-Expire=86400&HW-CC-Sign=FAB331082CE9C7328D55A4284D8B8BA27500269A0E7DE1E187450D13B9173021)
3. “函数配置”页面配置完成后点击“下一步”。

## 触发器

进入“触发器”页面，可基于函数触发场景配置需要的触发器，本场景下添加HTTP触发器。“触发器类型”和“请求方式”保持默认选择，并配置“认证类型”，配置完成后点击“下一步”。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ac/v3/5Rr8gOhAROGI4RtjrFvhhw/zh-cn_image_0000002440934460.png?HW-CC-KV=V1&HW-CC-Date=20260414T025714Z&HW-CC-Expire=86400&HW-CC-Sign=99F2225A60A10239611A8CAF1FD164008B4FC0A8FC2B68A137763869C0B11604)

展开

| 参数 | 说明 |
| --- | --- |
| 触发器类型 | HTTP触发器。 |
| 请求方式 | HTTP触发器目前仅支持POST请求方式。 |
| 认证类型 | HTTP触发器的认证类型。   * API客户端鉴权（Client适用）：端侧网关认证，适用于来自APP客户端侧（即本地应用或者项目）的函数调用。 * API客户端鉴权（Server适用）：云侧网关认证，适用于来自APP服务器侧（即云函数）的函数调用。 |
| 启用decode | 通过HTTP触发器触发函数时，对于contentType为“application/x-www-form-urlencoded”的触发请求，是否使用URLDecoder对请求body进行解码再传入到函数中。 |

## 函数代码

进入“函数代码”页面，配置“运行环境”、“内存配置”、“代码输入类型”等信息，配置完成后点击“下一步”。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4d/v3/7EuGlAEPRsKOjovoN0CRNg/zh-cn_image_0000002440774596.png?HW-CC-KV=V1&HW-CC-Date=20260414T025714Z&HW-CC-Expire=86400&HW-CC-Sign=F21028205294B70D5947F80F2702A15D5F41DFAD568C2FB94BDE93410D7C4FC2)

展开

| 配置项 | **说明** |
| --- | --- |
| 运行环境 | 函数容器的运行环境。请选择nodejs 20.x/latest，其中latest表示使用最新版本。 |
| 内存配置 | 函数容器所占有的内存大小，单位为MB，取值范围：500，1000，2000，4000。 |
| 代码输入类型 | 包括“在线编辑”与“\*.zip文件”两种方式，默认值为“在线编辑”。  选择“\*.zip文件”方式部署云函数时，入口方法文件的编写方法请参见[入口方法](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-develop-function-nodejs#zh-cn_topic_0000001658990474_section69815160394)。 |
| 函数入口 | 包括入口文件名称和入口方法名称，通过“.”连接。例如handler.myHandler，其中handler为入口文件名称，myHandler为入口方法名称。  nodejs运行环境下入口文件必须放置在函数部署包的根目录下，具体请参见[准备函数部署包](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-develop-function-nodejs#zh-cn_topic_0000001658990474_section527564201715)。 |
| 代码文件 | 用于在线编辑函数代码或上传函数部署包。   * “代码输入类型”配置项选择“在线编辑”时，可在创建函数界面集成的WebIDE区域在线编辑函数代码。WebIDE的详细使用方法见下文。 * “代码输入类型”配置项选择“\*.zip文件”时，点击即可上传函数部署包，也可直接拖曳zip文件至虚线框内。 |

**WebIDE**

当“代码输入类型”配置项选择“在线编辑”时，创建函数界面中集成了WebIDE功能，支持在线编辑函数代码。

注意

如果在函数实例已经运行的情况下进行函数代码或配置更新，AGC后台会滚动更新函数实例，请耐心等待10-20秒。

WebIDE从左至右分两个部分：目录树、代码编辑器和最大化，如下图所示。编辑完成后平台会生成部署包并上传。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/15/v3/PWuSOgyPQJCu6e03ht7tvQ/zh-cn_image_0000002474174585.png?HW-CC-KV=V1&HW-CC-Date=20260414T025714Z&HW-CC-Expire=86400&HW-CC-Sign=E7AE18977A61EAAC2612EB6CA7732BF281EF8F3E28CE8D1DD511F005633B4DEE)

展开

| 组成 | 说明 |
| --- | --- |
| 目录树 | 目录树支持如下能力：   * 新增文件夹：选中一个文件或文件夹，点击右上角新增文件夹按钮“”。若选中的是文件夹，则新增一个子文件夹。若选中的是文件，则新增一个同级文件夹。 * 新增文件：选中一个文件或文件夹，点击右上角新增文件按钮“”。若选中的是文件夹，则新增一个子文件。若选中的是文件，则新增一个同级文件。 * 删除文件：选中一个文件或文件夹，点击右侧删除按钮“”，删除文件或文件夹。不允许删除根目录。 * 重命名：双击文件或文件夹，输入新名称（仅支持字母、数字、下划线和中划线），完毕后按Enter键完成重命名。 |
| 编辑器 | 编辑器具有如下能力：   * 语法高亮：按照node.js语法高亮显示代码。 * 语法校验：语法有错误时会给出错误提示。 * 代码提示：输出代码自动给出相关代码提示。 * 代码填充：选择后系统代码可自动填充。 * 格式化：快捷键Ctrl+Shift+B。 * 支持快捷键操作：Ctrl+v, Ctrl+c, Ctrl+z, Ctrl+x, Ctrl+f, Ctrl+/等。 |
| 最大化 | 点击最大化按钮，可以最大化在线编辑区，再次点击按钮或按ESC键退出最大化。 |

## 层配置

层可以提供公共依赖库的发布与部署能力。开发者可以将函数依赖的公共库和相关依赖项提炼到层，通过为函数绑定层，便可以在函数中使用库，而不必将库包含在函数的代码包中，从而达到缩小函数代码包体积与缩短函数部署时间的效果，也避免了使用函数代码安装和打包依赖项时可能出现的错误。详细的层管理功能，请参见[层管理](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/agc-cloud-function-layer-0000001517762624)。

如果尚未创建层，可跳过下述步骤，直接点击页面底部的“创建”完成函数定义，后续创建层之后可在函数详情页再进行层配置，为函数绑定层。如果在创建函数之前已创建层，可按照下述步骤进行操作。

1. 进入“层配置”页面，点击“绑定层”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/70/v3/vwJXgbNUQ-SFhYCmWN8sTw/zh-cn_image_0000002474174613.png?HW-CC-KV=V1&HW-CC-Date=20260414T025714Z&HW-CC-Expire=86400&HW-CC-Sign=56DED590AB0235EE4283B606D78A318962C38622CEB5AEC8BF2E24165188325E)
2. 在右侧弹出的“绑定层”界面中，下拉框选择“层名称”和“版本”，“层范围”等信息根据层的配置将被自动填充，完成层绑定后点击“确定”。一个函数最多可以绑定5个层。

   说明

   选择层时，层的兼容运行时需与函数运行环境相符，系统会自动完成过滤。如果无匹配的层，请参考[创建层](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/agc-cloud-function-layer-0000001517762624#section11358162018572)创建相同运行环境的层后再进行绑定。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2b/v3/QMLDqrOJSaeR81Q0hr5AUg/zh-cn_image_0000002440774620.png?HW-CC-KV=V1&HW-CC-Date=20260414T025714Z&HW-CC-Expire=86400&HW-CC-Sign=D03E9F65D5C252911B78B0F9EA560AECB74FEC87AD7D0BE4DD05D1CD105B6067)

   展开

   | 参数 | 说明 |
   | --- | --- |
   | 层名称 | 层的名称。重复时自动在同名的层中创建一个新版本。 |
   | 版本 | 存在多个层版本时，选择函数绑定的层版本。 |
   | 层范围 | 层的共享范围。  * 项目内共享 * 团队内共享 |
   | 兼容运行时 | 层使用的语言环境。请选择“nodejs”。 |
   | 层描述 | 层的附加说明，长度不超过1024位。 |
3. 返回到“层配置”界面，绑定成功的层将展示在层列表中。如果需要解除层与函数的绑定关系，点击“解绑”即可。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a5/v3/bw_aYbw0Sa-z52__J8Bd-Q/zh-cn_image_0000002474214457.png?HW-CC-KV=V1&HW-CC-Date=20260414T025714Z&HW-CC-Expire=86400&HW-CC-Sign=5460D08B93432B9D629A772498711D66BF11AEE02B1D53BF595DE4545BCD3485)
4. 按照“函数配置 -> 触发器 -> 函数代码 -> 层配置”顺序配置过程中，如果需要修改前面步骤中的配置，可点击“上一步”进行回退，配置完成后点击“创建”提交函数定义。

## 更多信息

函数配置完成后，可以[修改函数高级配置](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/modify-function-advanced-config-0000001734287937)。