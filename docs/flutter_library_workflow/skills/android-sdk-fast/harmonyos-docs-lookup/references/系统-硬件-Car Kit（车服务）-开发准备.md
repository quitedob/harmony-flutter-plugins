应用在使用Car Kit能力前，开发者需要完成的配置：配置编译模式、配置权限、配置能力。

## 配置编译模式

在打包应用时，请在DevEco Studio中，点击右上角![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8a/v3/g7vtmu68R0K01YsQzxEVWQ/zh-cn_image_0000002418163981.png?HW-CC-KV=V1&HW-CC-Date=20260414T045704Z&HW-CC-Expire=86400&HW-CC-Sign=672D512B851EA78F1954FED2B42E7BD089DFC066B91D78D27F2D32CBC614E593)图标，将编译模式修改为“release”，然后点击右下角的“Apply”即可。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/26/v3/P1RA6V0ET4GsVeXMqm4GUw/zh-cn_image_0000002384524882.png?HW-CC-KV=V1&HW-CC-Date=20260414T045704Z&HW-CC-Expire=86400&HW-CC-Sign=E6C2860A73C8A3A9CE2C2BC75B6797B7B5B7A25B59057B046469D1FA4A9C540D)

## 配置权限

Car Kit为开发者提供了两类接口：导航类接口和出行互联类接口，使用对应接口需要分别配置相应的权限。

* 使用导航类接口需要配置ohos.permission.ACCESS\_SERVICE\_NAVIGATION\_INFO权限。
* 使用出行互联类接口需要配置ohos.permission.ACCESS\_CAR\_DISTRIBUTED\_ENGINE权限。

开发者需要在entry/src/main路径下的应用配置文件module.json5中配置所需权限。示例代码如下所示：

收起

自动换行

深色代码主题

复制

```
1. {
2. "module": {
3. "requestPermissions": [
4. {
5. "name": "ohos.permission.ACCESS_CAR_DISTRIBUTED_ENGINE"
6. },
7. {
8. "name": "ohos.permission.ACCESS_SERVICE_NAVIGATION_INFO"
9. }
10. ]
11. }
12. }
```

## 配置能力

开发者需要在entry/src/main路径下的应用配置文件module.json5的abilities数组中配置导航流转能力或HiCar能力，具体步骤如下：

1. 在[skills](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file#skills标签)中配置导航信息服务的actions。

   说明

   生态应用如有其它skills配置，请避免直接修改现有的配置，需在skills数组内追加。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. "skills": [
   2. {
   3. "entities": [
   4. "entity.system.default"
   5. ],
   6. "actions": [
   7. "action.navigation.infoservice"
   8. ]
   9. },
   10. // 其它 skills 配置
   11. {
   12. // ...
   13. }
   14. ]
   ```
2. 在元数据信息metadata中配置导航流转能力或HiCar能力。具体示例代码如下所示：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "module": {
   3. "abilities": [
   4. {
   5. "name": "xxxx",
   6. "srcEntry": "xxxx",
   7. "description": "xxxx",
   8. "skills": [
   9. {
   10. "entities": [
   11. "entity.system.home"
   12. ],
   13. "actions": [
   14. "action.system.home"
   15. ]
   16. },
   17. {
   18. "entities": [
   19. "entity.system.default"
   20. ],
   21. "actions": [
   22. "action.navigation.infoservice"
   23. ]
   24. }
   25. ],
   26. "metadata": [
   27. {
   28. "name" : "carHopCapability",
   29. "value" : "carHopNavi,getOnCarNavi,insideCarNavi,getOffCarNavi"
   30. },
   31. {
   32. "name" : "hiCarCapability",
   33. "value" :"basicNavi,shortcutOper,multiScreenUI,mapUIOper,updateNaviStatus,searchPOI"
   34. }
   35. ]
   36. }
   37. ]
   38. }
   39. }
   ```

metadata的name可选值：carHopCapability、hiCarCapability。

* name取值为carHopCapability时，代表适配了导航流转的能力。对应的value值根据不同的业务场景取值如下：

  展开

  | value | 场景 |
  | --- | --- |
  | carHopNavi | 碰一碰导航流转，不可与碰一碰地址流转并存。 |
  | carHopAddress | 碰一碰地址流转，不可与碰一碰导航流转并存。 |
  | getOnCarNavi | 上车导航自动流转。 |
  | insideCarNavi | 车内导航自动流转。 |
  | getOffCarNavi | 下车步行导航流转。 |
* name取值为hiCarCapability时，代表适配了HiCar的能力。对应的value值根据不同的业务场景取值如下：

  展开

  | value | 场景 |
  | --- | --- |
  | basicNavi | 适配基础导航功能，对应指令：  1. START\_NAVIGATION 2. STOP\_NAVIGATION |
  | shortcutOper | 适配快捷操作功能，对应指令：  1. GO\_HOME 2. GO\_TO\_COMPANY |
  | multiScreenUI | 多屏显示适配功能，对应指令：  1. START\_MAP\_LAYER 2. STOP\_MAP\_LAYER |
  | mapUIOper | 地图UI控制功能，对应指令：  1. ZOOM\_IN\_MAP 2. ZOOM\_OUT\_MAP 3. CHANGE\_THEME |
  | updateNaviStatus | 适配地图状态和地图元数据，对应指令：  1. START\_UPDATE\_NAVIGATION\_STATUS 2. STOP\_UPDATE\_NAVIGATION\_STATUS |
  | searchPOI | 适配地址搜索功能，对应指令：  SEARCH\_POI |

  关于指令的更多详情请查阅[CommandType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/car-navigationinfomgr#section1255014591510)。