建议游戏上划退出后进行场景切换操作，若场景切换失败或场景切换超时（5s）则设置游戏不支持缓存后快速启动。

以团结工程为例，修改如下：

收起

自动换行

深色代码主题

复制

```
1. import { launchAcceleration } from '@kit.GraphicsAccelerateKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
3. import { preferences } from '@kit.ArkData';
4. import Tuanjie from 'libtuanjie.so';
5. import sleepNapi from 'libentry.so'; // 通过napi封装的std::this_thread::sleep_for
6. let dataPreferences: preferences.Preferences | null = null;

8. onWindowStageWillDestroy(): void {
9. let enable = launchAcceleration.isLaunchMirrorEnabled();
10. if (enable) {
11. this.onResume(); // 团结工程中恢复引擎方法
12. Tuanjie.TuanjieSendMessage("GlobalObjectForArkTSCall", "OnMessageCall", "SwitchToLoginPage");
13. let waitTime = 0; // 等待时长，单位ms
14. while(true) {
15. let sceneChangeResult = dataPreferences?.getSync('sceneChangeResult', undefined);
16. if (sceneChangeResult != undefined) {
17. if (sceneChangeResult) {
18. break; // 场景切换成功，跳出while循环
19. }
20. this.setSupportedProcessCache(false); // 场景切换失败，设置游戏不支持缓存后快速启动
21. break;
22. }
23. if (waitTime >= 5000) {
24. this.setSupportedProcessCache(false); // 场景切换超时,设置游戏不支持缓存后快速启动
25. break;
26. }
27. sleepNapi.sleep(500);
28. waitTime += 500;
29. }
30. sleepNapi.sleep(500);
31. this.onPause(); // 团结工程中暂停引擎方法
32. }
33. }

35. setSupportedProcessCache(isSupported : boolean): void {
36. try {
37. this.context.getApplicationContext().setSupportedProcessCache(isSupported);
38. } catch (error) {
39. let code = (error as BusinessError).code;
40. let message = (error as BusinessError).message;
41. console.error(`setSupportedProcessCache fail, code: ${code}, msg: ${message}`);
42. }
43. }
```