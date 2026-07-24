富文本控件已经集成跨设备互通能力，通过使用富文本控件[RichEditor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor)的右键菜单即可使用跨设备互通能力。跨设备互通提供跨设备的相机、扫描、通过图库访问图片的能力，平板或2in1设备可以调用手机的相机、扫描、图库等功能。

## 场景介绍

您通过此能力实现跨设备交互，可以使用其他设备的相机、扫描和图库功能。

## 约束与限制

需同时满足以下条件，才能使用该功能：

* **设备限制**
  + 本端设备：HarmonyOS版本为HarmonyOS NEXT及以上的平板或2in1设备。
  + 远端设备：HarmonyOS版本为HarmonyOS NEXT及以上、具有相机能力的手机或平板设备。
* **使用限制**
  + 双端设备需要登录同一华为账号。
  + 跨设备互通API支持根据特定调用策略调用设备。调用策略：2in1设备可以调用平板和手机，平板可以调用手机，同类型设备不可调用。
  + 双端设备需要打开WLAN和蓝牙开关。

    条件允许时，建议双端设备接入同一个局域网，可提升唤醒相机的速度。

## 开发步骤

* 添加[RichEditor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor)富文本组件，即可在富文本组件中右键中选择其他设备进行导入，通过onWillChange属性对回传的照片进行处理。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. @Entry
  2. @Component
  3. struct Index {
  4. controller: RichEditorController = new RichEditorController()
  5. options: RichEditorOptions = { controller: this.controller }

  7. build() {
  8. Column() {
  9. Column() {
  10. RichEditor(this.options)
  11. .onWillChange((value: RichEditorChangeValue) => {
  12. if (value?.replacedImageSpans[0]?.imageStyle?.objectFit != 0) {
  13. return true;
  14. }
  15. for(let item of value.replacedImageSpans) {
  16. this.controller.addImageSpan(item.valuePixelMap, {
  17. imageStyle: {
  18. size: ["500px", "500px"],
  19. layoutStyle: {
  20. borderRadius: '10px',
  21. }
  22. }
  23. })
  24. }
  25. return false;
  26. })
  27. .borderWidth(1)
  28. .borderColor(Color.Green)
  29. .width("100%")
  30. .height("100%")
  31. }
  32. .borderWidth(1)
  33. .borderColor(Color.Red)
  34. .width("100%")
  35. .height("70%")
  36. }
  37. }
  38. }
  ```

使用流程如下：

1.在富文本区域右键。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c1/v3/vuOGdoaSRzeUFSbyvH8QAg/zh-cn_image_0000002453064537.png?HW-CC-KV=V1&HW-CC-Date=20260414T045124Z&HW-CC-Expire=86400&HW-CC-Sign=D558753D32290A9F18BA8C5ED2A8A754C24181A07220558CFFFA5ED5F0DA9355)

2.选择想要使用的能力。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d7/v3/qiq3Rlr5TUesOM9tRHHOfA/zh-cn_image_0000002419505708.png?HW-CC-KV=V1&HW-CC-Date=20260414T045124Z&HW-CC-Expire=86400&HW-CC-Sign=C176D33059F98978A9BBB31D2F2658A31CDF62D8F86C3FE5E1DB8FEA6A5BEFA2)

3.等待对端设备拍照回传。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e8/v3/dPI1gviYQxmg101sWOFttA/zh-cn_image_0000002453064721.png?HW-CC-KV=V1&HW-CC-Date=20260414T045124Z&HW-CC-Expire=86400&HW-CC-Sign=6CD3A454C9A1A68E6F941A9B8240C3DC6847BD10878B67F48F5904710A482378)

4.图片回传后

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7f/v3/GAEhaTUESVKOiFmYUt9U-A/zh-cn_image_0000002361551566.png?HW-CC-KV=V1&HW-CC-Date=20260414T045124Z&HW-CC-Expire=86400&HW-CC-Sign=CA790F7218005FFD155EA732E1BA83E2C17A0D190C62DCEC716063F021E7BC54)

## 关闭富文本跨设备互通能力

如果需要关闭富文本右键菜单跨设备互通能力，可通过editMenuOptions属性自定义菜单内容去除跨设备互通菜单项即可规避，示例如下：

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct Index {
4. controller: RichEditorController = new RichEditorController()
5. options: RichEditorOptions = { controller: this.controller }

7. build() {
8. Column() {
9. Column() {
10. RichEditor(this.options)
11. .editMenuOptions({
12. onCreateMenu: (menuItems: Array<TextMenuItem>) => {
13. if (menuItems.length === 0) {
14. return menuItems;
15. }
16. let newMenuItems: TextMenuItem[] = [];
17. menuItems.forEach((item, index) => {
18. if(!item.id.equals(TextMenuItemId.COLLABORATION_SERVICE)) {
19. newMenuItems.push(item);
20. }
21. })
22. return newMenuItems;
23. },
24. onMenuItemClick: (menuItem: TextMenuItem, textRange: TextRange) => {
25. return false;
26. }
27. })
28. .borderWidth(1)
29. .borderColor(Color.Green)
30. .width("100%")
31. .height("100%")
32. }
33. .borderWidth(1)
34. .borderColor(Color.Red)
35. .width("100%")
36. .height("70%")
37. }
38. }
39. }
```