## 场景介绍

从6.0.0(20) Beta1版本开始，新增支持[背景流光](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdseffect#section139655943218)。

通过背景流光接口可以设置组件的背景流动发光效果，并且可以设置背景色及渐变背景色，常用于全屏幕背景流光等。

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { hdsEffect } from '@kit.UIDesignKit';
   ```
2. 设置背景流光效果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct UVFlowLight {
   4. @State controller: hdsEffect.ShaderEffectController = new hdsEffect.ShaderEffectController();

   6. build() {
   7. Stack() {
   8. }
   9. .visualEffect(new hdsEffect.HdsEffectBuilder()
   10. .shaderEffect({
   11. effectType: hdsEffect.EffectType.UV_BACKGROUND_FLOW_LIGHT,
   12. animation: {
   13. duration: 10000,
   14. iterations: -1,
   15. autoPlay: true,
   16. onFinish: ()=> {
   17. console.info('Succeeded in finishing');
   18. }
   19. },
   20. controller: this.controller,
   21. })
   22. .buildEffect())
   23. .width('100%')
   24. .height('100%')
   25. }
   26. }
   ```

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/80/v3/3b369lHjSwGpG54u8jQT9A/zh-cn_image_0000002532144141.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T041702Z&HW-CC-Expire=86400&HW-CC-Sign=CD768886F17FA2A85B46C3D34138025E6FFCE4210084B5C01F8A33D3EDC60D0E "点击放大")