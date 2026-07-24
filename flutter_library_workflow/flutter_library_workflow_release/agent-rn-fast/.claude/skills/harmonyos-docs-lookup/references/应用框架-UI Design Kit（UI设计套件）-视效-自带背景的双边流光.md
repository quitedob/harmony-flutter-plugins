## 场景介绍

从6.0.0(20) Beta1版本开始，新增支持[自带背景的双边流光](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hds-visual-component#section92774418495)。

通过通用视效组件HdsVisualComponent提供的自带背景的双边流光效果场景接口，支持设置两条边缘流光的起始、终止位置、边缘颜色效果以及与流光相叠加的背景板颜色，用于胶囊组件、屏幕边缘发光等。

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 从6.0.2(22)版本开始，无需手动导入HdsVisualComponentAttribute。具体请参考HdsVisualComponent的导入模块说明。
   2. import {
   3. HdsVisualComponent,
   4. HdsVisualComponentAttribute,
   5. HdsSceneController,
   6. HdsSceneType
   7. } from '@kit.UIDesignKit';
   ```
2. 使用HdsVisualComponent组件，指定场景类型为DUAL\_EDGE\_FLOW\_LIGHT\_WITH\_BACKGROUND\_MASK，并且设置场景参数。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct EdgeFlowLightVisualComponent {
   4. @State sceneController: HdsSceneController = new HdsSceneController()
   5. .setSceneParams({
   6. backgroundMaskColors: [Color.Green, Color.Red],
   7. firstEdgeFlowLight: {
   8. startPos: 0,
   9. endPos: 0.5,
   10. color: Color.Red
   11. },
   12. secondEdgeFlowLight: {
   13. startPos: 0,
   14. endPos: -0.5,
   15. color: Color.Green
   16. }
   17. })

   19. build() {
   20. Stack() {
   21. HdsVisualComponent()
   22. .scene(HdsSceneType.DUAL_EDGE_FLOW_LIGHT_WITH_BACKGROUND_MASK, this.sceneController, () => {
   23. console.info('Succeeded in finishing');
   24. })
   25. .width('100%')
   26. .height('50%')
   27. }
   28. }
   29. }
   ```

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/eb/v3/BAfssYi0RxKUoLVRrVZASQ/zh-cn_image_0000002532304105.gif?HW-CC-KV=V1&HW-CC-Date=20260414T041706Z&HW-CC-Expire=86400&HW-CC-Sign=D73EE5FC26B3C0FDFD117268791783A08588606DAA44E7E082C5C8785B45E89F "点击放大")