## 场景介绍

从6.0.0(20) Beta1版本开始，新增支持[双边边缘流光](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdseffect#section139655943218)。

通过双边边缘流光接口可以设置组件的边缘发光效果，并且可以设置两条边的起始、终止位置和边缘颜色效果，常用于胶囊组件、屏幕边缘发光等。

## 开发步骤

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { hdsEffect } from '@kit.UIDesignKit';
   ```
2. 设置双边边缘流光效果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index {
   4. @State controller: hdsEffect.ShaderEffectController = new hdsEffect.ShaderEffectController();

   6. build() {
   7. Column() {
   8. Stack() {
   9. }
   10. .visualEffect(new hdsEffect.HdsEffectBuilder()
   11. .shaderEffect({
   12. effectType: hdsEffect.EffectType.DUAL_EDGE_FLOW_LIGHT,
   13. animation: {
   14. duration: 4000,
   15. iterations: -1,
   16. autoPlay: true,
   17. onFinish: () => {
   18. console.info('Succeeded in finishing');
   19. }
   20. },
   21. controller: this.controller,
   22. params: {
   23. firstEdgeFlowLight: {
   24. startPos: 0,
   25. endPos: 1.0,
   26. color: '#1AD0F1',
   27. },
   28. secondEdgeFlowLight: {
   29. startPos: 0.5,
   30. endPos: 1.5,
   31. color: '#FFA4E5',
   32. }
   33. }
   34. })
   35. .buildEffect())
   36. .width(200)
   37. .borderRadius('50%')
   38. .clip(true)
   39. .height(200)
   40. .backgroundColor('#383838')
   41. }
   42. .justifyContent(FlexAlign.Center)
   43. .backgroundColor(Color.Black)
   44. .width('100%')
   45. .height('100%')
   46. }
   47. }
   ```

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c8/v3/nwOvSNECTluPW6ecCv1dNw/zh-cn_image_0000002500304226.gif?HW-CC-KV=V1&HW-CC-Date=20260414T041658Z&HW-CC-Expire=86400&HW-CC-Sign=CF3B6584EC995C883684C9D5FBA59B0E607B74FE04398ACFB29B37BADAA208F8)