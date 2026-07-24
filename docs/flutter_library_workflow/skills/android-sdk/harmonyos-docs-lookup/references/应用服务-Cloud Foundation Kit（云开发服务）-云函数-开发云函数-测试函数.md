说明

下文以函数latest版本为例介绍测试方法。如果需要测试函数的已发布版本，可在已发布版本详情页面选择“函数代码”页签，参考方式二进行测试。

函数创建后可以在AGC控制台测试函数的代码运行是否正常。进入测试界面有两种方式：

* 方式一：函数列表中点击函数名称右侧“操作”列的“测试”，在右侧弹出的“测试函数”界面进行测试。

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2e/v3/iHLOavIAQiSukek6gDgJgg/zh-cn_image_0000002474214321.png?HW-CC-KV=V1&HW-CC-Date=20260414T025718Z&HW-CC-Expire=86400&HW-CC-Sign=3FEA42346A8B2115B7A339601743214E89B908A60E713A334185D12D39384585)
* 方式二：
  1. 在函数列表中点击已创建的函数名称，进入函数详情页面。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/75/v3/eNWzQqUqRXa03QVgPOlzUQ/zh-cn_image_0000002474174529.png?HW-CC-KV=V1&HW-CC-Date=20260414T025718Z&HW-CC-Expire=86400&HW-CC-Sign=82CACD17362872BA6229392DC20B5B7A6C6E2A58A94595202B4FE627355C40E7)
  2. 选择“函数代码”页签，点击“测试函数”。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e6/v3/VGMyUab2SEGhttIVwp-aGg/zh-cn_image_0000002474214297.png?HW-CC-KV=V1&HW-CC-Date=20260414T025718Z&HW-CC-Expire=86400&HW-CC-Sign=D37963D638062FCC47824D4560936D4A9F9036A95CE229A746D78282C5CC4056)
  3. 在右侧弹出的“测试函数”界面，使用默认测试事件、创建新测试事件或者使用已保存测试事件进行测试。
     + 使用默认测试事件

       直接点击“测试”对函数进行测试。

       ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/49/v3/gP1FZclVR7mawWMpCHD5Qw/zh-cn_image_0000002440774524.png?HW-CC-KV=V1&HW-CC-Date=20260414T025718Z&HW-CC-Expire=86400&HW-CC-Sign=E7785C0C18A18710DD376C23469595A5E96167D41112B11ADC74CEE28FD1501D)
     + 创建新测试事件

       如果需要设置调用函数的请求消息体，可按照如下步骤配置测试参数，并可保存为测试事件方便后续继续使用。

       1. 在“事件”文本框中输入JSON格式的事件参数，点击“保存”。然后在“提示”弹出框中输入事件名称，配置完成后点击弹出框右下角的“确认”。

          说明

          “事件”文本框内输入的JSON对象，对应的是触发器的event事件格式，会透传给函数。

          ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/65/v3/3d0BDvyKSpCH6TIYpjDk4A/zh-cn_image_0000002440934320.png?HW-CC-KV=V1&HW-CC-Date=20260414T025718Z&HW-CC-Expire=86400&HW-CC-Sign=5F6C1917FD0770EC7FC9DC4234CAA24464A24377CA6C4C6062736159EF0D6921)
       2. 点击“测试”，函数处理事件并返回测试结果。
     + 使用已保存测试事件
       1. 在“测试函数”界面，点击![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/16/v3/mZ-ExQlRRvyXaBg9UyJmbw/zh-cn_image_0000002474174485.png?HW-CC-KV=V1&HW-CC-Date=20260414T025718Z&HW-CC-Expire=86400&HW-CC-Sign=B103B77FF39A1F8CE77E7ACFA3DBE49BCBFA4E434311806D3343189E73DF8AFF)展开已保存的测试事件列表，选择已配置的事件名称右侧的“加载”，然后点击“测试”，函数处理事件并返回测试结果。

          ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f9/v3/VaYsJprhSEmql2tUby8Kfw/zh-cn_image_0000002474174481.png?HW-CC-KV=V1&HW-CC-Date=20260414T025718Z&HW-CC-Expire=86400&HW-CC-Sign=9C549AA8139D7CF92E79828197A517AA30C5E3D4CF100F1732D9E3029AE9A95D)
       2. （可选）如果需要删除已添加的测试事件，可在测试事件列表中点击事件名称右侧的“删除”即可删除测试事件。

          ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a9/v3/sicLv1jMSO6zb-KpTag7hg/zh-cn_image_0000002440934348.png?HW-CC-KV=V1&HW-CC-Date=20260414T025718Z&HW-CC-Expire=86400&HW-CC-Sign=F3B6CE9EF61062C96D7AB5542EDDD44EE8AECA955AF7B9B08CF83A19BD4E930E)
  4. 查看测试结果。
     + 执行结果：展示测试后获得的响应结果。

       ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/68/v3/94d4DVuQTviTp8rQ932xVQ/zh-cn_image_0000002440774520.png?HW-CC-KV=V1&HW-CC-Date=20260414T025718Z&HW-CC-Expire=86400&HW-CC-Sign=9B0618071C366E9FE5FB88259A88049B6F3902871A0FA79203D6622446FAF84F)
     + 运行日志：展示函数运行过程中，通过logger API打印的日志，支持输出debug级别及以上日志（以下仅为日志输出示例）。

       ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1/v3/5Xj-XrUeRdOQZbv0MjzrAg/zh-cn_image_0000002474174461.png?HW-CC-KV=V1&HW-CC-Date=20260414T025718Z&HW-CC-Expire=86400&HW-CC-Sign=62DB071470EF252E13E5F07C403C3406DCF4AF5DCA8016E128C53A16EE1BE20E)
     + 执行摘要：展示该次测试请求相关信息。
       - 请求ID：该条测试请求的RequestID，在后台日志中体现为X-Trace-ID。
       - 持续时间：函数执行的端到端时间。
       - 执行版本：该次调用测试的具体函数版本。

       ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1b/v3/JU0KpnPvR7yKvvOIMqJF7w/zh-cn_image_0000002474214337.png?HW-CC-KV=V1&HW-CC-Date=20260414T025718Z&HW-CC-Expire=86400&HW-CC-Sign=6AEA0A5BC81CF154C882CB4FEB82F229C08865372BD32B6AC888D2D3A32E3FA0)
  5. “代码输入类型”为“在线编辑”的函数，测试过程中，如果需要修改函数入口文件代码，可直接在“函数代码”页签的代码编辑器中修改，然后点击页面底部的“提交”。当界面提示更新函数成功时，则可以点击“测试函数”对更改后的代码进行测试。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1d/v3/KsSLCCAWR5CpgUWdH3Q1aQ/zh-cn_image_0000002440774468.png?HW-CC-KV=V1&HW-CC-Date=20260414T025718Z&HW-CC-Expire=86400&HW-CC-Sign=A3094423A32F9E58AA5349020362076D370D1ADF5E7444C108BD34296BD13604)

     “代码输入类型”为“.zip文件”的函数，测试过程中，如果需要修改函数代码文件，可在本地修改且打包完成后，点击![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3a/v3/7I-YDYNaS3CWrkk9D8SG6g/zh-cn_image_0000002474214305.png?HW-CC-KV=V1&HW-CC-Date=20260414T025718Z&HW-CC-Expire=86400&HW-CC-Sign=26A9E8FAEE7EEF79C24F80624E494AF0789E2CBD4C3AEFEFFFC1CCF6D2D68DB3)重新上传函数部署包，然后点击页面底部的“提交”。当界面提示更新函数成功时，则可以点击“测试函数”对更改后的代码进行测试。

     说明

     如果代码更新量比较大，需要调整函数内存配置，可点击“内存配置”下拉框进行调整，然后再上传函数部署包。

     ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/57/v3/kxW_FUznSTu5Mz2j9C39Nw/zh-cn_image_0000002440934324.png?HW-CC-KV=V1&HW-CC-Date=20260414T025718Z&HW-CC-Expire=86400&HW-CC-Sign=647821C9C7E7F412AE7C6F2EA67C55A1C77C8914772DB3BF596B58B337BFB55D)
  6. 函数测试无误后，可在“函数代码”页签点击“导出函数”导出函数部署包。导出包以“函数名称+函数版本.zip”格式命名，可查看函数结构和文件内容。