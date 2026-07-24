通过开发者提供的经纬度数据，获取天气数据，比如：实况数据、预警数据。

## 约束与限制

本kit支持Phone、Tablet、PC/2in1设备，并且从5.1.0(18)版本开始，新增支持Wearable设备。

## （可选）获取当前位置经纬度

当开发者需要查询当前位置的天气数据时，需要先[申请权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-geolocationmanager#申请权限)，并且获取当前位置的经纬度信息。获取当前位置的经纬度信息方法如下：

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { geoLocationManager } from '@kit.LocationKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 调用[getCurrentLocation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-geolocationmanager#geolocationmanagergetcurrentlocation-2)，获取经纬度。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. geoLocationManager.getCurrentLocation().then((result) => {
   2. console.info('current location latitude: ' + result.latitude);
   3. console.info('current location longitude: ' + result.longitude);
   4. }).catch((err: BusinessError ) => {
   5. console.error(`getCurrentLocation failed. Code: ${err.code}, message: ${err.message}`);
   6. });
   ```

## 查询天气数据

Weather Service Kit依赖开发者提供的经纬度数据（精确到小数点后2位），返回格点天气数据。

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { weatherService } from '@kit.WeatherServiceKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 创建请求对象。
   * location：使用[当前位置](/consumer/cn/doc/harmonyos-guides/weather-service-getweather#section546501255)的数据，或者填入查询目的地的经纬度。
   * limitedDatasets：为可选字段，传入一个数组，表示请求有限的数据集，取值范围参考weatherService.[Dataset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/weather-service-weatherservice#section83091727192814)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let request: weatherService.WeatherRequest = {
   2. location: {
   3. latitude: 22.62,
   4. longitude: 114.07
   5. },
   6. limitedDatasets: [weatherService.Dataset.CURRENT, weatherService.Dataset.ALERTS]
   7. }
   ```

   说明

   如果limitedDatasets参数不传值，或者传入的数组为空，则默认返回Weather Service Kit支持的所有数据。根据实际需要的天气数据设置limitedDatasets，可以大幅降低接口请求时延。
3. 请求数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. let weather = await weatherService.getWeather(request);
   3. if (weather.current) {
   4. console.info('getWeather current temperature: ' + weather.current.temperature);
   5. }
   6. if (weather.alerts?.length) {
   7. console.info('getWeather alert: ' + weather.alerts[0].title);
   8. }
   9. } catch (err) {
   10. err = err as BusinessError;
   11. console.error(`getWeather failed. Code: ${err.code}, message: ${err.message}`);
   12. }
   ```

   说明

   getWeather接口的使用依赖当前Ability的Context，如果开发者在无法通过[getHostContext()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#gethostcontext12)接口获取到Context的环境中请求天气数据，例如使用worker或者taskpool的子线程场景，请使用[weatherService.getWeatherWithContext(context, request)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/weather-service-weatherservice#section25641843201511)方法并提供Ability的Context信息。