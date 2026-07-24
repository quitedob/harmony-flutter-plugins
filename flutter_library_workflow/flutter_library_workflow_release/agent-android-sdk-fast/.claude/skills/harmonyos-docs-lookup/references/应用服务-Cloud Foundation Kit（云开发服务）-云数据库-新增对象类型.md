开发者需要基于AGC控制台创建对象类型。

## 前提条件

已[开通云数据库服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-enable-database)。

## 操作步骤

1. 登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，点击“开发与服务”。
2. 在项目列表中点击需要创建对象类型的项目。
3. 在左侧导航栏选择“云开发（Serverless）> 云数据库”，进入云数据库页面。
4. 点击“新增”，创建新的对象类型。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d5/v3/qb6RpnQHQSKIt3dpK5gLXQ/zh-cn_image_0000002440934420.png?HW-CC-KV=V1&HW-CC-Date=20260414T025740Z&HW-CC-Expire=86400&HW-CC-Sign=4F023B5C06448738EAEECA8410D29257CB6595AB372D8660BFB778032DCDA1F2)
5. 输入“对象类型名”为“BookInfo”后，点击“下一步”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ed/v3/kq6YhXMoT-Kxk-GZYk8cmg/zh-cn_image_0000002440774572.png?HW-CC-KV=V1&HW-CC-Date=20260414T025740Z&HW-CC-Expire=86400&HW-CC-Sign=9156BF20035BB3544C9584BB70795DDD52905B7F48875B81013F137499145B41)
6. 点击“+新增字段”，新增如下表字段后，点击“下一步”。

   展开

   | 字段名称 | 类型 | 主键 | 非空 | 加密 | 默认值 |
   | --- | --- | --- | --- | --- | --- |
   | id | Integer | ✓ | ✓ | – | – |
   | bookName | String | – | ✓ | – | – |
   | author | String | – | – | – | – |
   | price | Double | – | – | – | – |
   | borrowerId | Integer | – | – | – | – |
   | borrowerName | String | – | – | – | – |
   | borrowerTime | Date | – | – | – | – |
7. 点击“+”新增索引，设置“索引名”为“bookName”，点击“下一步”。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8c/v3/YOAsW_j7RuWmNjIFrriI4Q/zh-cn_image_0000002440934416.png?HW-CC-KV=V1&HW-CC-Date=20260414T025740Z&HW-CC-Expire=86400&HW-CC-Sign=8F08383F99A2FCD37B69A7199D495CB5DF6529872EE2110AD5DB78BDA2F4F0D6)
8. 按照如下要求设置各角色权限后，点击“确定”。

   展开

   | 角色 | query | upsert | delete | 说明 |
   | --- | --- | --- | --- | --- |
   | 所有人 | ✓ | ✓ | ✓ | 代表所有用户，包含认证和非认证用户。  该角色默认拥有query权限，可自定义配置upsert和delete权限。如：角色勾选了upsert权限，该角色可在本对象类型中写入数据。  但是，不建议将upsert和delete权限配置给所有人角色。  当对象类型中设置了加密字段之后，表示开启全程加密功能，此时**所有人**角色将不会拥有query、upsert和delete权限，且不允许修改。 |
   | 认证用户 | ✓ | ✓ | ✓ | 经过AGC登录认证的用户。  该角色默认拥有query权限，可自定义配置upsert和delete权限。如：角色勾选了upsert权限，该角色可在本对象类型中写入数据。  当对象类型中设置了加密字段之后，表示开启全程加密功能，此时**认证用户**角色将不会拥有query、upsert和delete权限，且不允许修改。 |
   | 数据创建者 | ✓ | ✓ | ✓ | 经过认证的数据创建用户。  该角色默认拥有所有权限，且可自定义配置所有权限。如：角色勾选了upsert权限，该角色可在本对象类型中写入数据。  每条数据都有其对应的数据创建人（即应用用户），每个数据创建者仅可以upsert或者delete自己创建的数据，不能upsert或者delete他人创建的数据。  数据创建者的信息保存在数据记录的系统表中。 |
   | 管理员 | ✓ | ✓ | ✓ | 应用开发者，主要是指通过AGC控制台或FaaS（Function as a Service，函数即服务）侧访问云数据库的角色。  该角色默认拥有所有权限，且可自定义配置所有权限。如：角色勾选了upsert权限，该角色可在本对象类型中写入数据。  管理员可以管理并配置其他角色的权限。 |
9. 创建完成后返回对象类型列表，可以查看已创建的对象类型。
10. 勾选创建的BookInfo对象类型，点击“导出”。若不勾选对象类型，默认导出所有对象类型。

    ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/23/v3/upIp494oQWye9VQr8GArPA/zh-cn_image_0000002474174549.png?HW-CC-KV=V1&HW-CC-Date=20260414T025740Z&HW-CC-Expire=86400&HW-CC-Sign=F8F435559D3521E1A70DE6569EBF98F15D5B4D042429A44F7E801540D2A73FE4)
11. 导出“json格式”文件，点击“确定”。后续[引入对象类型文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-database-add-file)时，需要使用此文件。

    ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e/v3/Yd2bI17PTeWp0AyEbYMukw/zh-cn_image_0000002440774564.png?HW-CC-KV=V1&HW-CC-Date=20260414T025740Z&HW-CC-Expire=86400&HW-CC-Sign=92793F1DA7C3555C47385FFD33B7377A125B93E98C7CD9FD4363B9A1C83DA99F)