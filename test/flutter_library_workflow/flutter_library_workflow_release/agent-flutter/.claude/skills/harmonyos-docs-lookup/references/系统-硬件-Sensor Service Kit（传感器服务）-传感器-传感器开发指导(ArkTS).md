## 场景介绍

当设备需要获取传感器数据时，可以使用sensor模块，例如：通过订阅方向传感器数据感知用户设备当前的朝向，通过订阅计步传感器数据统计用户的步数等。

详细的接口介绍请参考[@ohos.sensor (传感器)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-sensor)。

## 接口说明

展开

| 名称 | 描述 |
| --- | --- |
| sensor.on(sensorId, callback: AsyncCallback<Response>, options?: Options): void | 持续监听传感器数据变化。 |
| sensor.on(type: 'sensorStatusChange', callback: Callback<SensorStatusEvent>): void | 监听传感器动态上下线的状态变化，callback返回传感器状态事件数据。 |
| sensor.once(sensorId, callback: AsyncCallback<Response>): void | 获取一次传感器数据变化。 |
| sensor.off(sensorId, callback?: AsyncCallback<void>): void | 注销传感器数据的监听。 |
| sensor.off(sensorId, sensorInfoParam?: SensorInfoParam, callback?:AsyncCallback<void>): void | 注销传感器数据的监听，可传入设置参数。 |
| sensor.off(type: 'sensorStatusChange', callback?: Callback<SensorStatusEvent>): void | 注销传感器动态上下线的状态变化的监听。 |
| sensor.getSensorList(callback: AsyncCallback<Array<Sensor>>): void | 获取设备上的所有传感器信息。 |

## 开发步骤

开发步骤以加速度传感器ACCELEROMETER为例。

1. 新建一个工程。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4d/v3/2brs3omCQqSjKBQKhMhu1A/zh-cn_image_0000002540611980.png?HW-CC-KV=V1&HW-CC-Date=20260414T050019Z&HW-CC-Expire=86400&HW-CC-Sign=E068A0B8ED1B83A6EAEE94B0828DE0272090A30B7A62F06FBD322AEE23366102)
2. 配置加速度传感器权限，具体配置方式请参考[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. "requestPermissions": [
   2. {
   3. "name":"ohos.permission.ACCELEROMETER"
   4. }
   5. ],
   ```

   [module.json5](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/module.json5#L25-L31)
3. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { sensor } from '@kit.SensorServiceKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   3. import hilog from '@ohos.hilog';
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L18-L22)
4. 定义常量。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let TAG = 'sensor: ';
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L24-L26)
5. 查询设备支持的所有传感器的参数，如果获取不到某个传感器则代表该传感器在此设备上不存在或不可用，如果订阅没查到的传感器时需要处理异常。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. sensor.getSensorList((error: BusinessError, data: Array<sensor.Sensor>) => {
   3. if (error) {
   4. console.error(TAG + 'getSensorList failed');
   5. } else {
   6. console.info('getSensorList success');
   7. for (let i = 0; i < data.length; i++) {
   8. console.info(TAG + JSON.stringify(data[i]));
   9. // ...
   10. }
   11. }
   12. });
   13. } catch (error) {
   14. console.error(TAG + 'get list exception, code:' + error.code + 'msg:' + error.message);
   15. console.error(TAG + 'get list exception, msg:' + JSON.stringify(error));
   16. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L126-L146)

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/45/v3/qn6fZ_RqQpSsE2g0QijaWg/zh-cn_image_0000002571171975.png?HW-CC-KV=V1&HW-CC-Date=20260414T050019Z&HW-CC-Expire=86400&HW-CC-Sign=F0E303B2978631859B4450D30665B91A81B7C47D3AA58F277E998E207E717033)

   该传感器支持的最小采样周期为5000000纳秒，最大采样周期是200000000纳秒。不同传感器支持的采样周期范围也不同，interval应该设置在传感器支持范围内，大于最大值时以最大值上报数据，小于最小值时以最小值上报数据。设置数值越小数据上报越频繁，其功耗越大。

   根据设备Id查询传感器。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. this.deviceId = -1;
   3. // 第一个参数deviceId 非必填，缺省默认查询的为本地设备。
   4. const sensorList: sensor.Sensor[] = sensor.getSensorListByDeviceSync(this.deviceId);
   5. console.info(`sensorList length: ${sensorList.length}`);
   6. console.info(`sensorList: ${JSON.stringify(sensorList)}`);
   7. // ···
   8. } catch (error) {
   9. let e: BusinessError = error as BusinessError;
   10. console.error(`Failed to get sensorList. Code: ${e.code}, message: ${e.message}`);
   11. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1132-L1147)

   根据设备Id和传感器类型查询传感器。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. this.deviceId = -1;
   3. // 第二个参数deviceId 非必填
   4. const sensorList: sensor.Sensor[] = sensor.getSingleSensorByDeviceSync(sensor.SensorId.ACCELEROMETER, this.deviceId);
   5. console.info(`sensorList length: ${sensorList.length}`);
   6. console.info(`sensorList Json: ${JSON.stringify(sensorList)}`);
   7. // ...
   8. } catch (error) {
   9. let e: BusinessError = error as BusinessError;
   10. console.error(`Failed to get sensorList. Code: ${e.code}, message: ${e.message}`);
   11. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1153-L1167)
6. 注册监听。可以通过on()和once()两种接口监听传感器的调用结果。

   通过on()接口，实现对传感器的持续监听，传感器上报周期interval设置为100000000纳秒。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. sensor.on(sensor.SensorId.ACCELEROMETER, (data: sensor.AccelerometerResponse) => {
   3. console.info("Succeeded in obtaining data. x: " + data.x + " y: " + data.y + " z: " + data.z);
   4. // ...
   5. }, { interval: 100000000 });
   6. } catch (error) {
   7. let e: BusinessError = error as BusinessError;
   8. console.error(`Failed to invoke on. Code: ${e.code}, message: ${e.message}`);
   9. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L279-L291)

   第三个参数还可以传入SensorInfoParam，传递deviceId、sensorIndex。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. sensor.on(sensor.SensorId.ACCELEROMETER, (data: sensor.AccelerometerResponse) => {
   3. console.info("Succeeded in obtaining data. x: " + data.x + " y: " + data.y + " z: " + data.z);
   4. // ...
   5. }, { interval: 100000000, sensorInfoParam: { deviceId: -1 } });
   6. } catch (error) {
   7. let e: BusinessError = error as BusinessError;
   8. console.error(`Failed to invoke on. Code: ${e.code}, message: ${e.message}`);
   9. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L561-L573)

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/84/v3/w7U82UFbRTi8XRBjwebYgQ/zh-cn_image_0000002540771634.png?HW-CC-KV=V1&HW-CC-Date=20260414T050019Z&HW-CC-Expire=86400&HW-CC-Sign=212D6B1C8B3E85955930895BAB7543E6FE85617AEE25A6F09CFF3138AEF8778E)

   通过once()接口，实现对传感器的一次监听。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. sensor.once(sensor.SensorId.ACCELEROMETER, (data: sensor.AccelerometerResponse) => {
   3. console.info("Succeeded in obtaining data. x: " + data.x + " y: " + data.y + " z: " + data.z);
   4. // ...
   5. });
   6. } catch (error) {
   7. let e: BusinessError = error as BusinessError;
   8. console.error(`Failed to invoke once. Code: ${e.code}, message: ${e.message}`);
   9. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L843-L855)

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/58/v3/3Mfql7R4S1K1Kmv1N3D6yg/zh-cn_image_0000002571291929.png?HW-CC-KV=V1&HW-CC-Date=20260414T050019Z&HW-CC-Expire=86400&HW-CC-Sign=23EF97BF877A183D78FB4E9F7106AB981A416A09DB314A02644AA93E344ECE40)
7. 取消持续监听。

   取消持续监听，此场景下未订阅而取消监听为异常行为，需处理异常。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. sensor.off(sensor.SensorId.ACCELEROMETER);
   3. } catch (error) {
   4. let e: BusinessError = error as BusinessError;
   5. console.error(`Failed to invoke off. Code: ${e.code}, message: ${e.message}`);
   6. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1086-L1093)

   根据SensorInfoParam取消监听。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. sensor.off(sensor.SensorId.ACCELEROMETER, { deviceId: -1 });
   3. } catch (error) {
   4. let e: BusinessError = error as BusinessError;
   5. console.error(`Failed to invoke off. Code: ${e.code}, message: ${e.message}`);
   6. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1109-L1116)
8. 动态传感器状态的监听，在收到设备下线事件通知时，用户应主动调用off关闭该设备上的传感器。

   注册监听, SensorStatusEvent 会返回事件时间戳、传感器ID、传感器索引、上线或下线、设备id、设备名称等值。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. sensor.on('sensorStatusChange', (data: sensor.SensorStatusEvent) => {
   3. console.info(`timestamp: ${data.timestamp},
   4. deviceId: ${data.deviceId} deviceName: ${data.deviceName}
   5. sensorId: ${data.sensorId} sensorIndex:${data.sensorIndex} isSensorOnline: ${data.isSensorOnline}`);
   6. });
   7. // ···
   8. } catch (error) {
   9. let e: BusinessError = error as BusinessError;
   10. console.error(`Failed to invoke on. Code: ${e.code}, message: ${e.message}`);
   11. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1177-L1191)

   取消监听。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. sensor.off('sensorStatusChange');
   3. // ···
   4. } catch (error) {
   5. let e: BusinessError = error as BusinessError;
   6. console.error(`Failed to invoke on. Code: ${e.code}, message: ${e.message}`);
   7. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1200-L1210)
9. 获取某时刻地球上特定位置的地磁场信息

   使用callback方式。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. sensor.getGeomagneticInfo({ latitude: 80, longitude: 0, altitude: 0 }, 1580486400000,
   3. (err: BusinessError, data: sensor.GeomagneticResponse) => {
   4. if (err) {
   5. console.error(`Failed to get geomagneticInfo. Code: ${err.code}, message: ${err.message}`);
   6. return;
   7. }
   8. console.info("Succeeded in getting geomagneticInfo x" + data.x);
   9. console.info("Succeeded in getting geomagneticInfo y" + data.y);
   10. console.info("Succeeded in getting geomagneticInfo z" + data.z);
   11. console.info("Succeeded in getting geomagneticInfo geomagneticDip" + data.geomagneticDip);
   12. console.info("Succeeded in getting geomagneticInfo deflectionAngle" + data.deflectionAngle);
   13. console.info("Succeeded in getting geomagneticInfo levelIntensity" + data.levelIntensity);
   14. console.info("Succeeded in getting geomagneticInfo totalIntensity" + data.totalIntensity);
   15. });
   16. } catch (error) {
   17. let e: BusinessError = error as BusinessError;
   18. console.error(`Failed to get geomagneticInfo. Code: ${e.code}, message: ${e.message}`);
   19. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1219-L1239)

   使用promise方式。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. const promise = sensor.getGeomagneticInfo({ latitude: 80, longitude: 0, altitude: 0 }, 1580486400000);
   3. promise.then((data: sensor.GeomagneticResponse) => {
   4. console.info("Succeeded in getting geomagneticInfo x" + data.x);
   5. console.info("Succeeded in getting geomagneticInfo y" + data.y);
   6. console.info("Succeeded in getting geomagneticInfo z" + data.z);
   7. console.info("Succeeded in getting geomagneticInfo geomagneticDip" + data.geomagneticDip);
   8. console.info("Succeeded in getting geomagneticInfo deflectionAngle" + data.deflectionAngle);
   9. console.info("Succeeded in getting geomagneticInfo levelIntensity" + data.levelIntensity);
   10. console.info("Succeeded in getting geomagneticInfo totalIntensity" + data.totalIntensity);
   11. }, (err: BusinessError) => {
   12. console.error(`Failed to get geomagneticInfo. Code: ${err.code}, message: ${err.message}`);
   13. });
   14. } catch (error) {
   15. let e: BusinessError = error as BusinessError;
   16. console.error(`Failed to get geomagneticInfo. Code: ${e.code}, message: ${e.message}`);
   17. }
   ```

   [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1240-L1258)
10. 根据气压值获取海拔高度

    使用callback方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. let seaPressure = 1013.2;
    3. let currentPressure = 1500.0;
    4. sensor.getDeviceAltitude(seaPressure, currentPressure, (err: BusinessError, data: number) => {
    5. if (err) {
    6. console.error(`Failed to get altitude. Code: ${err.code}, message: ${err.message}`);
    7. return;
    8. }
    9. console.info('Succeeded in getting altitude: ' + data);
    10. });
    11. } catch (error) {
    12. let e: BusinessError = error as BusinessError;
    13. console.error(`Failed to get altitude. Code: ${e.code}, message: ${e.message}`);
    14. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1268-L1283)

    使用promise方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. let seaPressure = 1013.2;
    3. let currentPressure = 1500.0;
    4. const promise = sensor.getDeviceAltitude(seaPressure, currentPressure);
    5. promise.then((data: number) => {
    6. console.info('Succeeded in getting device altitude: ', data);
    7. }, (err: BusinessError) => {
    8. console.error(`Failed to get altitude. Code: ${err.code}, message: ${err.message}`);
    9. });
    10. } catch (error) {
    11. let e: BusinessError = error as BusinessError;
    12. console.error(`Failed to get altitude. Code: ${e.code}, message: ${e.message}`);
    13. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1284-L1298)
11. 根据倾斜矩阵计算地磁倾角

    使用callback方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. // inclinationMatrix可以为3*3，或者4*4
    3. let inclinationMatrix = [
    4. 1, 0, 0,
    5. 0, 1, 0,
    6. 0, 0, 1
    7. ]
    8. sensor.getInclination(inclinationMatrix, (err: BusinessError, data: number) => {
    9. if (err) {
    10. console.error(`Failed to get inclination. Code: ${err.code}, message: ${err.message}`);
    11. return;
    12. }
    13. console.info('Succeeded in getting inclination: ' + data);
    14. })
    15. } catch (error) {
    16. let e: BusinessError = error as BusinessError;
    17. console.error(`Failed to get inclination. Code: ${e.code}, message: ${e.message}`);
    18. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1308-L1327)

    使用promise方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. // inclinationMatrix可以为3*3，或者4*4
    3. let inclinationMatrix = [
    4. 1, 0, 0,
    5. 0, 1, 0,
    6. 0, 0, 1
    7. ]
    8. const promise = sensor.getInclination(inclinationMatrix);
    9. promise.then((data: number) => {
    10. console.info('Succeeded in getting inclination: ' + data);
    11. }, (err: BusinessError) => {
    12. console.error(`Failed to get inclination. Code: ${err.code}, message: ${err.message}`);
    13. });
    14. } catch (error) {
    15. let e: BusinessError = error as BusinessError;
    16. console.error(`Failed to get inclination. Code: ${e.code}, message: ${e.message}`);
    17. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1328-L1346)
12. 计算两个旋转矩阵之间的角度变化

    使用callback方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. // 旋转矩阵可以为3*3，或者4*4
    3. let currentRotationMatrix = [
    4. 1, 0, 0,
    5. 0, 1, 0,
    6. 0, 0, 1
    7. ];
    8. let preRotationMatrix = [
    9. 1, 0, 0,
    10. 0, 0.87, -0.50,
    11. 0, 0.50, 0.87
    12. ];
    13. sensor.getAngleVariation(currentRotationMatrix, preRotationMatrix, (err: BusinessError, data: Array<number>) => {
    14. if (err) {
    15. console.error(`Failed to get angle variation. Code: ${err.code}, message: ${err.message}`);
    16. return;
    17. }
    18. if (data.length < 3) {
    19. console.error("Failed to get angle variation, length" + data.length);
    20. return;
    21. }
    22. console.info("Z: " + data[0]);
    23. console.info("X: " + data[1]);
    24. console.info("Y: " + data[2]);
    25. })
    26. } catch (error) {
    27. let e: BusinessError = error as BusinessError;
    28. console.error(`Failed to get angle variation. Code: ${e.code}, message: ${e.message}`);
    29. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1356-L1386)

    使用promise方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. // 旋转矩阵可以为3*3，或者4*4
    3. let currentRotationMatrix = [
    4. 1, 0, 0,
    5. 0, 1, 0,
    6. 0, 0, 1
    7. ];
    8. let preRotationMatrix = [
    9. 1, 0, 0,
    10. 0, 0.87, -0.50,
    11. 0, 0.50, 0.87
    12. ];
    13. const promise = sensor.getAngleVariation(currentRotationMatrix, preRotationMatrix);
    14. promise.then((data: Array<number>) => {
    15. if (data.length < 3) {
    16. console.error("Failed to get angle variation, length" + data.length);
    17. return;
    18. }
    19. console.info("Z: " + data[0]);
    20. console.info("X: " + data[1]);
    21. console.info("Y: " + data[2]);
    22. }, (err: BusinessError) => {
    23. console.error(`Failed to get angle variation. Code: ${err.code}, message: ${err.message}`);
    24. });
    25. } catch (error) {
    26. let e: BusinessError = error as BusinessError;
    27. console.error(`Failed to get angle variation. Code: ${e.code}, message: ${e.message}`);
    28. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1387-L1416)
13. 根据旋转矢量获取旋转矩阵

    使用callback方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. let rotationVector = [0.20046076, 0.21907, 0.73978853, 0.60376877];
    3. sensor.getRotationMatrix(rotationVector, (err: BusinessError, data: Array<number>) => {
    4. if (err) {
    5. console.error(`Failed to get rotationMatrix. Code: ${err.code}, message: ${err.message}`);
    6. return;
    7. }
    8. for (let i = 0; i < data.length; i++) {
    9. console.info('Succeeded in getting data[' + i + ']: ' + data[i]);
    10. }
    11. })
    12. } catch (error) {
    13. let e: BusinessError = error as BusinessError;
    14. console.error(`Failed to get rotationMatrix. Code: ${e.code}, message: ${e.message}`);
    15. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1426-L1442)

    使用promise方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. let rotationVector = [0.20046076, 0.21907, 0.73978853, 0.60376877];
    3. const promise = sensor.getRotationMatrix(rotationVector);
    4. promise.then((data: Array<number>) => {
    5. for (let i = 0; i < data.length; i++) {
    6. console.info('Succeeded in getting data[' + i + ']: ' + data[i]);
    7. }
    8. }, (err: BusinessError) => {
    9. console.error(`Failed to get rotationMatrix. Code: ${err.code}, message: ${err.message}`);
    10. });
    11. } catch (error) {
    12. let e: BusinessError = error as BusinessError;
    13. console.error(`Failed to get rotationMatrix. Code: ${e.code}, message: ${e.message}`);
    14. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1443-L1458)
14. 根据指定坐标系映射旋转矩阵

    使用callback方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. let rotationMatrix = [
    3. 1, 0, 0,
    4. 0, 0.87, -0.50,
    5. 0, 0.50, 0.87
    6. ];
    7. sensor.transformRotationMatrix(rotationMatrix, { x: 1, y: 3 }, (err: BusinessError, data: Array<number>) => {
    8. if (err) {
    9. console.error(`Failed to transform rotationMatrix. Code: ${err.code}, message: ${err.message}`);
    10. return;
    11. }
    12. for (let i = 0; i < data.length; i++) {
    13. console.info('Succeeded in getting data[' + i + '] = ' + data[i]);
    14. }
    15. })
    16. } catch (error) {
    17. let e: BusinessError = error as BusinessError;
    18. console.error(`Failed to transform rotationMatrix. Code: ${e.code}, message: ${e.message}`);
    19. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1468-L1488)

    使用promise方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. let rotationMatrix = [
    3. 1, 0, 0,
    4. 0, 0.87, -0.50,
    5. 0, 0.50, 0.87
    6. ];
    7. const promise = sensor.transformRotationMatrix(rotationMatrix, { x: 1, y: 3 });
    8. promise.then((data: Array<number>) => {
    9. for (let i = 0; i < data.length; i++) {
    10. console.info('Succeeded in getting data[' + i + ']: ' + data[i]);
    11. }
    12. }, (err: BusinessError) => {
    13. console.error(`Failed to transform rotationMatrix. Code: ${err.code}, message: ${err.message}`);
    14. });
    15. } catch (error) {
    16. let e: BusinessError = error as BusinessError;
    17. console.error(`Failed to transform rotationMatrix. Code: ${e.code}, message: ${e.message}`);
    18. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1489-L1508)
15. 根据旋转向量计算归一化四元数

    使用callback方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. let rotationVector = [0.20046076, 0.21907, 0.73978853, 0.60376877];
    3. sensor.getQuaternion(rotationVector, (err: BusinessError, data: Array<number>) => {
    4. if (err) {
    5. console.error(`Failed to get quaternion. Code: ${err.code}, message: ${err.message}`);
    6. return;
    7. }
    8. for (let i = 0; i < data.length; i++) {
    9. console.info('Succeeded in getting data[' + i + ']: ' + data[i]);
    10. }
    11. })
    12. } catch (error) {
    13. let e: BusinessError = error as BusinessError;
    14. console.error(`Failed to get quaternion. Code: ${e.code}, message: ${e.message}`);
    15. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1518-L1534)

    使用promise方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. let rotationVector = [0.20046076, 0.21907, 0.73978853, 0.60376877];
    3. const promise = sensor.getQuaternion(rotationVector);
    4. promise.then((data: Array<number>) => {
    5. for (let i = 0; i < data.length; i++) {
    6. console.info('Succeeded in getting data[' + i + ']: ' + data[i]);
    7. }
    8. }, (err: BusinessError) => {
    9. console.error(`Failed to get quaternion. Code: ${err.code}, message: ${err.message}`);
    10. });
    11. } catch (error) {
    12. let e: BusinessError = error as BusinessError;
    13. console.error(`Failed to get quaternion. Code: ${e.code}, message: ${e.message}`);
    14. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1535-L1550)
16. 根据旋转矩阵计算设备方向

    使用callback方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. let preRotationMatrix = [
    3. 1, 0, 0,
    4. 0, 0.87, -0.50,
    5. 0, 0.50, 0.87
    6. ];
    7. sensor.getOrientation(preRotationMatrix, (err: BusinessError, data: Array<number>) => {
    8. if (err) {
    9. console.error(`Failed to get orientation. Code: ${err.code}, message: ${err.message}`);
    10. return;
    11. }
    12. if (data.length < 3) {
    13. console.error("Failed to get orientation, length" + data.length);
    14. }
    15. console.info("Succeeded in getting data. Z: " + data[0]);
    16. console.info("Succeeded in getting data. X: " + data[1]);
    17. console.info("Succeeded in getting data. Y: " + data[2]);
    18. })
    19. } catch (error) {
    20. let e: BusinessError = error as BusinessError;
    21. console.error(`Failed to get orientation. Code: ${e.code}, message: ${e.message}`);
    22. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1560-L1583)

    使用promise方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. let preRotationMatrix = [
    3. 1, 0, 0,
    4. 0, 0.87, -0.50,
    5. 0, 0.50, 0.87
    6. ];
    7. const promise = sensor.getOrientation(preRotationMatrix);
    8. promise.then((data: Array<number>) => {
    9. for (let i = 0; i < data.length; i++) {
    10. console.info('Succeeded in getting data[' + i + ']: ' + data[i]);
    11. }
    12. }, (err: BusinessError) => {
    13. console.error(`Failed to get orientation. Code: ${err.code}, message: ${err.message}`);
    14. });
    15. } catch (error) {
    16. let e: BusinessError = error as BusinessError;
    17. console.error(`Failed to get orientation. Code: ${e.code}, message: ${e.message}`);
    18. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1584-L1603)
17. 根据重力矢量和地磁矢量计算旋转矩阵

    使用callback方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. let gravity = [-0.27775216, 0.5351276, 9.788099];
    3. let geomagnetic = [210.87253, -78.6096, -111.44444];
    4. sensor.getRotationMatrix(gravity, geomagnetic, (err: BusinessError, data: sensor.RotationMatrixResponse) => {
    5. if (err) {
    6. console.error(`Failed to get rotationMatrix. Code: ${err.code}, message: ${err.message}`);
    7. return;
    8. }
    9. console.info('Succeeded in getting rotationMatrix' + JSON.stringify(data));
    10. })
    11. } catch (error) {
    12. let e: BusinessError = error as BusinessError;
    13. console.error(`Failed to get rotationMatrix. Code: ${e.code}, message: ${e.message}`);
    14. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1613-L1628)

    使用promise方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. let gravity = [-0.27775216, 0.5351276, 9.788099];
    3. let geomagnetic = [210.87253, -78.6096, -111.44444];
    4. const promise = sensor.getRotationMatrix(gravity, geomagnetic);
    5. promise.then((data: sensor.RotationMatrixResponse) => {
    6. console.info('Succeeded in getting rotationMatrix' + JSON.stringify(data));
    7. }, (err: BusinessError) => {
    8. console.error(`Failed to get rotationMatrix. Code: ${err.code}, message: ${err.message}`);
    9. });
    10. } catch (error) {
    11. let e: BusinessError = error as BusinessError;
    12. console.error(`Failed to get rotationMatrix. Code: ${e.code}, message: ${e.message}`);
    13. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1629-L1643)
18. 获取指定传感器类型的属性信息

    使用callback方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. sensor.getSingleSensor(sensor.SensorId.ACCELEROMETER, (err: BusinessError, data: sensor.Sensor) => {
    3. if (err) {
    4. console.error(`Failed to get singleSensor. Code: ${err.code}, message: ${err.message}`);
    5. return;
    6. }
    7. console.info('Succeeded in getting sensor: ' + JSON.stringify(data));
    8. });
    9. } catch (error) {
    10. let e: BusinessError = error as BusinessError;
    11. console.error(`Failed to get singleSensor. Code: ${e.code}, message: ${e.message}`);
    12. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1653-L1666)

    使用promise方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. sensor.getSingleSensor(sensor.SensorId.ACCELEROMETER).then((data: sensor.Sensor) => {
    3. console.info('Succeeded in getting sensor: ' + JSON.stringify(data));
    4. }, (err: BusinessError) => {
    5. console.error(`Failed to get singleSensor. Code: ${err.code}, message: ${err.message}`);
    6. });
    7. } catch (error) {
    8. let e: BusinessError = error as BusinessError;
    9. console.error(`Failed to get singleSensor . Code: ${e.code}, message: ${e.message}`);
    10. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1667-L1678)

    使用sync方式。

    收起

    自动换行

    深色代码主题

    复制

    ```
    1. try {
    2. let ret = sensor.getSingleSensorSync(sensor.SensorId.ACCELEROMETER);
    3. console.info('Succeeded in getting sensor: ' + JSON.stringify(ret));
    4. } catch (error) {
    5. let e: BusinessError = error as BusinessError;
    6. console.error(`Failed to get singleSensor . Code: ${e.code}, message: ${e.message}`);
    7. }
    ```

    [Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/Sensor/SensorJsSamples/entry/src/main/ets/pages/Index.ets#L1679-L1687)