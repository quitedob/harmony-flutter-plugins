目前端侧仅支持构建圆形围栏，并且依赖GNSS芯片的地理围栏功能，仅在室外开阔区域才能准确识别用户进出围栏事件。

应用场景举例：开发者可以使用地理围栏技术，在企业周围创建一个区域围栏，当用户进入这个区域，在移动设备上进行有针对性的提醒。

## 接口说明

地理围栏所使用的接口如下，详细说明参见：[Location Kit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-geolocationmanager)。

## 开发步骤

1. 使用地理围栏功能，需要有ohos.permission.LOCATION 和 ohos.permission.APPROXIMATELY\_LOCATION权限，位置权限申请的方法和步骤见[申请位置权限开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/location-permission-guidelines)。
2. 导入geoLocationManager模块、wantAgent模块和BusinessError模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { geoLocationManager } from '@kit.LocationKit';
   2. import { wantAgent } from '@kit.AbilityKit';
   3. import { BusinessError } from '@kit.BasicServicesKit'
   ```
3. 创建WantAgentInfo信息。

   场景一：创建拉起Ability的WantAgentInfo信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 通过WantAgentInfo的operationType设置动作类型
   2. let wantAgentInfo:wantAgent.WantAgentInfo = {
   3. wants: [
   4. {
   5. deviceId: '',
   6. bundleName: 'com.example.myapplication',
   7. abilityName: 'EntryAbility',
   8. action: '',
   9. entities: [],
   10. uri: '',
   11. parameters: {}
   12. }
   13. ],
   14. operationType: wantAgent.OperationType.START_ABILITY,
   15. requestCode: 0,
   16. wantAgentFlags:[wantAgent.WantAgentFlags.CONSTANT_FLAG]
   17. };
   ```

   场景二：创建发布公共事件的WantAgentInfo信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 通过WantAgentInfo的operationType设置动作类型
   2. let wantAgentInfo:wantAgent.WantAgentInfo = {
   3. wants: [
   4. {
   5. action: 'event_name', // 设置事件名
   6. parameters: {},
   7. }
   8. ],
   9. operationType: wantAgent.OperationType.SEND_COMMON_EVENT,
   10. requestCode: 0,
   11. wantAgentFlags: [wantAgent.WantAgentFlags.CONSTANT_FLAG],
   12. }
   ```
4. 调用getWantAgent()方法进行创建WantAgent。

   并且在获取到WantAgent对象之后调用地理围栏接口添加围栏，当设备进入或者退出该围栏时，系统会自动触发WantAgent的动作。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let wantAgentObj : object | undefined = undefined;
   2. // 创建WantAgent
   3. wantAgent.getWantAgent(wantAgentInfo, (err, data) => {
   4. if (err) {
   5. console.error('getWantAgent err=' + JSON.stringify(err));
   6. return;
   7. }
   8. console.info('getWantAgent success');
   9. wantAgentObj = data;
   10. let requestInfo:geoLocationManager.GeofenceRequest = {'scenario': 0x301, "geofence": {"latitude": 31.12, "longitude": 121.11, "radius": 100, "expiration": 10000}};
   11. try {
   12. geoLocationManager.on('gnssFenceStatusChange', requestInfo, wantAgentObj);
   13. } catch (err) {
   14. console.error("errCode:" + JSON.stringify(err));
   15. }
   16. });
   ```