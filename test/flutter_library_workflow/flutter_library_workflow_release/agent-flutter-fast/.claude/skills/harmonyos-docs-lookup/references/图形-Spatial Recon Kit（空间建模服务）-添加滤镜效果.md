给3DGS模型渲染出的画面加上不同的效果。

## 接口说明

以下仅列出demo中调用的部分主要接口，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/spatial-recon-arkts)。

展开

| 接口名 | 描述 |
| --- | --- |
| RETRO\_EFFECT\_ID | 表示复古效果对应的ID。 |
| COMIC\_EFFECT\_ID | 表示漫画效果对应的ID。 |
| OBRA\_DINN\_EFFECT\_ID | 表示黑白bit效果对应的ID。 |
| COLOR\_EDITING\_EFFECT\_ID | 表示颜色编辑效果对应的ID。 |

## 开发步骤

1. 首先从项目根目录进入/src/main/ets/entryability/EntryAbility.ets文件，导入空间建模模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { Scene, RenderContext } from '@kit.ArkGraphics3D';
   2. import { spatialRender } from '@kit.SpatialReconKit';
   3. import { RenderingPipelineType } from '@ohos.graphics.scene'
   ```
2. 加载当前场景的上下文。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let renderContext: RenderContext | null = Scene.getDefaultRenderContext();
   ```
3. 调用滤镜接口。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. if (renderContext != null) {
   2. renderContext.loadPlugin(spatialRender.GSPlugin.PLUGIN_ID);
   3. Scene.load().then(async (scene: Scene) => {
   4. let rf = scene.getResourceFactory();
   5. let effect : spatialRender.RetroEffect =
   6. await rf.createEffect({ effectId: spatialRender.GSPlugin.RETRO_EFFECT_ID }) as spatialRender.RetroEffect;
   7. let camera = await rf.createCamera({ name: "gsCam", path: "//gsCam" }, { renderingPipeline: RenderingPipelineType.FORWARD });
   8. camera.effects.append(effect)
   9. });
   10. }
   ```