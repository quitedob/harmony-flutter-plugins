## 适用场景

支持的3DGS模块格式包括：MP4、PLY、GLB三种格式。

效果如下图所示：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/93/v3/0glHDbDiRZy0xQ9Kap5DBw/zh-cn_image_0000002485417565.png?HW-CC-KV=V1&HW-CC-Date=20260414T054640Z&HW-CC-Expire=86400&HW-CC-Sign=62E9789AAF0235158A7DDD478079F93BC115ACDEEBF3E3A92F79FFD544DD6494 "点击放大")

## 接口说明

以下仅列出demo中调用的部分主要接口，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/spatial-recon-arkts)。

展开

| 接口名 | 描述 |
| --- | --- |
| static loadGSNode(scene: [Scene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-scene), params: [GSImportSettings](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/spatial-recon-gsimport), parent?: [Node](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-scene-nodes#node)): Promise<GSNode> | 加载3DGS模型。 |

## 开发步骤

1. 从entry目录进入/src/main/ets/entryability/EntryAbility.ets文件，导入空间建模模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spatialRender } from '@kit.SpatialReconKit';
   2. import { Scene, RenderContext } from '@kit.ArkGraphics3D'
   ```
2. 加载当前场景的上下文。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let renderContext: RenderContext | null = Scene.getDefaultRenderContext();
   ```
3. 调用加载3DGS模型接口。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. if (renderContext != null) {
   2. renderContext.loadPlugin(spatialRender.GSPlugin.PLUGIN_ID);
   3. let scene = Scene.load().then(async (scene: Scene) => {
   4. let uri = "OhosRawFile://assets/gltf/model.glb"; //3DGS模型的uri，根据实际情况修改
   5. let offset = 0;
   6. let gsNodeext: spatialRender.GSNode = await spatialRender.GSPlugin.loadGSNode(scene, {uri, offset}, scene.root);
   7. });
   8. }
   ```