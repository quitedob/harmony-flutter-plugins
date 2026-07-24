绘制组件用于在页面绘制图形，Shape组件是绘制组件的父组件，包含所有绘制组件的通用属性。具体用法请参考[Shape](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-shape)。

## 创建绘制组件

绘制组件可以由以下两种形式创建：

* 绘制组件使用Shape作为父组件，实现类似SVG的效果。接口调用为以下形式：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Shape(value?: PixelMap)
  ```

  该接口用于创建带有父组件的绘制组件，其中value用于设置绘制目标，可将图形绘制在指定的PixelMap对象中，若未设置，则在当前绘制目标中进行绘制。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Shape() {
  2. Rect().width(300).height(50)
  3. }
  ```

  [Shape.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ShapeDrawing/entry/src/main/ets/pages/Shape.ets#L22-L26)
* 绘制组件单独使用，用于在页面上绘制指定的图形。有7种绘制类型，分别为[Circle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-circle)（圆形）、[Ellipse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-ellipse)（椭圆形）、[Line](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-line)（直线）、[Polyline](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-polyline)（折线）、[Polygon](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-polygon)（多边形）、[Path](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-path)（路径）、[Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-rect)（矩形）。以Circle的接口调用为例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Circle(value?: { width?: string | number, height?: string | number })
  ```

  该接口用于在页面绘制圆形，其中width用于设置圆形的宽度，height用于设置圆形的高度，圆形直径由宽高最小值确定。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Circle({ width: 150, height: 150 })
  ```

  [Shape.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ShapeDrawing/entry/src/main/ets/pages/Shape.ets#L27-L29)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/60/v3/gsKxGx1kRYyWwRh69plyWA/zh-cn_image_0000002571171563.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=4847F00E9E5F249165F379BBAC51D522556C59706299539DF7223A6A1A97925F)

## 形状视口viewPort

收起

自动换行

深色代码主题

复制

```
1. viewPort(value: { x?: number | string, y?: number | string, width?: number | string, height?: number | string })
```

形状视口viewPort指定用户空间中的一个矩形，该矩形映射到为关联的SVG元素建立的视区边界。viewPort属性的值包含x、y、width和height四个可选参数，x和y表示视区的左上角坐标，width和height表示其尺寸。

以下三个示例说明如何使用viewPort：

* 通过形状视口对图形进行放大与缩小。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. class Tmp {
  2. public x: number = 0;
  3. public y: number = 0;
  4. public width: number = 75;
  5. public height: number = 75;
  6. }

  8. class TmpOne {
  9. public x: number = 0;
  10. public y: number = 0;
  11. public width: number = 300;
  12. public height: number = 300;
  13. }

  15. @Entry
  16. @Component
  17. struct ViewPort1 {
  18. viep: Tmp = new Tmp();
  19. viep1: TmpOne = new TmpOne();

  21. build() {
  22. Column() {
  23. // 画一个宽高都为75的圆
  24. // 请将$r('app.string.OriginalSizeCircle')替换为实际资源文件，在本示例中该资源文件的value值为"原始尺寸Circle组件"
  25. Text($r('app.string.OriginalSizeCircle')).margin({ top: 20 })
  26. Circle({ width: 75, height: 75 }).fill('rgb(39, 135, 217)')

  28. Row({ space: 10 }) {
  29. Column() {
  30. // 创建一个宽高都为150的shape组件，背景色为黄色，一个宽高都为75的viewPort。
  31. // 用一个蓝色的矩形来填充viewPort，在viewPort中绘制一个直径为75的圆。
  32. // 绘制结束，viewPort会根据组件宽高放大两倍。
  33. // 请将$r('app.string.EnlargedCircle')替换为实际资源文件，在本示例中该资源文件的value值为"shape内放大的Circle组件"
  34. Text($r('app.string.EnlargedCircle'))
  35. Shape() {
  36. Rect().width('100%').height('100%').fill('rgb(39, 135, 217)')
  37. Circle({ width: 75, height: 75 }).fill('rgb(213, 213, 213)')
  38. }
  39. .viewPort(this.viep)
  40. .width(150)
  41. .height(150)
  42. .backgroundColor('rgb(23, 169, 141)')
  43. }

  45. Column() {
  46. // 创建一个宽高都为150的shape组件，背景色为黄色，一个宽高都为300的viewPort。
  47. // 用一个绿色的矩形来填充viewPort，在viewPort中绘制一个直径为75的圆。
  48. // 绘制结束，viewPort会根据组件宽高缩小两倍。
  49. // 请将$r('app.string.ShrunkCircle')替换为实际资源文件，在本示例中该资源文件的value值为"Shape内缩小的Circle组件"
  50. Text($r('app.string.ShrunkCircle'))
  51. Shape() {
  52. Rect().width('100%').height('100%').fill('rgb(213, 213, 213)')
  53. Circle({ width: 75, height: 75 }).fill('rgb(39, 135, 217)')
  54. }
  55. .viewPort(this.viep1)
  56. .width(150)
  57. .height(150)
  58. .backgroundColor('rgb(23, 169, 141)')
  59. }
  60. }
  61. }
  62. }
  63. }
  ```

  [ViewPort1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ShapeDrawing/entry/src/main/ets/pages/ViewPort1.ets#L16-L80)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2d/v3/Igmr7JrDReKKEXc6CdZaMQ/zh-cn_image_0000002540771220.png?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=A255D20C0D48FDFA1CAE3E5A2D5E7FFBE5833555EFAEDDD565790F46BCE00D1F)
* 创建一个宽高都为300的shape组件，背景色为黄色，创建一个宽高都为300的viewPort。用一个蓝色的矩形来填充viewPort，在viewPort中绘制一个半径为75的圆。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. class TmpTwo {
  2. public x: number = 0;
  3. public y: number = 0;
  4. public width: number = 300;
  5. public height: number = 300;
  6. }

  8. @Entry
  9. @Component
  10. struct ViewPort2 {
  11. viep: TmpTwo = new TmpTwo();

  13. build() {
  14. Column() {
  15. Shape() {
  16. Rect().width('100%').height('100%').fill('#0097D4')
  17. Circle({ width: 150, height: 150 }).fill('#E87361')
  18. }
  19. .viewPort(this.viep)
  20. .width(300)
  21. .height(300)
  22. .backgroundColor('#F5DC62')
  23. }
  24. }
  25. }
  ```

  [ViewPort2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ShapeDrawing/entry/src/main/ets/pages/ViewPort2.ets#L16-L42)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2a/v3/TGwVcGJARyu2GtNCQc0NPw/zh-cn_image_0000002571291519.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=7B27FC499EBCD6A864AE9BA98CEE50E35B3FCDD2A6D38EBC7EC1E8ED6AED543F)
* 创建一个宽高都为300的shape组件，背景色为黄色，创建一个宽高都为300的viewPort。用一个蓝色的矩形来填充viewPort，在viewPort中绘制一个半径为75的圆，将viewPort向右方和下方各平移150。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. class TmpThree {
  2. public x: number = -150;
  3. public y: number = -150;
  4. public width: number = 300;
  5. public height: number = 300;
  6. }

  8. @Entry
  9. @Component
  10. struct ViewPort3 {
  11. viep: TmpThree = new TmpThree();

  13. build() {
  14. Column() {
  15. Shape() {
  16. Rect().width('100%').height('100%').fill('#0097D4')
  17. Circle({ width: 150, height: 150 }).fill('#E87361')
  18. }
  19. .viewPort(this.viep)
  20. .width(300)
  21. .height(300)
  22. .backgroundColor('#F5DC62')
  23. }
  24. }
  25. }
  ```

  [ViewPort3.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ShapeDrawing/entry/src/main/ets/pages/ViewPort3.ets#L16-L42)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b0/v3/lL51LdMLSQC4ZefIOzgi4g/zh-cn_image_0000002540611570.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=134C266A36823715BC7623C9ED658931C98AF12969C6B17FBD407429C77497A2)

## 自定义样式

说明

示例通过commands来绘制路径，commands参数说明请参考[SVG路径描述规范](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-path#svg路径描述规范)。

绘制组件支持通过各种属性更改组件样式。

* 通过[fill](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-path#fill)可以设置组件填充区域颜色。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Path()
  2. .width(100)
  3. .height(100)
  4. .commands('M150 0 L300 300 L0 300 Z')
  5. .fill('#E87361')
  6. .strokeWidth(0)
  ```

  [Fill.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ShapeDrawing/entry/src/main/ets/pages/Fill.ets#L21-L28)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6b/v3/SbxPg-qXTjGjAj5j9mdFWA/zh-cn_image_0000002571171565.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=1DAE004CCEA313BCB1275E379A6EEA57801EA3CDAB23402AF75236C1DB4BAC11)
* 通过[stroke](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-path#stroke)可以设置组件边框颜色。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Path()
  2. .width(100)
  3. .height(100)
  4. .fillOpacity(0)
  5. .commands('M150 0 L300 300 L0 300 Z')
  6. .stroke(Color.Red)
  ```

  [Stroke.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ShapeDrawing/entry/src/main/ets/pages/Stroke.ets#L21-L28)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/aa/v3/4HAdCtZQRpueVAqbU_NkGA/zh-cn_image_0000002540771222.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=2AE5F60D6A313EC1C4531A7598C1B19B535AA47681DB736DCED3C27E17694AD3)
* 通过[strokeOpacity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-path#strokeopacity)可以设置边框透明度。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Path()
  2. .width(100)
  3. .height(100)
  4. .fillOpacity(0)
  5. .commands('M150 0 L300 300 L0 300 Z')
  6. .stroke(Color.Red)
  7. .strokeWidth(10)
  8. .strokeOpacity(0.2)
  ```

  [StrokeOpacity.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ShapeDrawing/entry/src/main/ets/pages/StrokeOpacity.ets#L21-L30)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/66/v3/VJT28JFNQb22E0gjWReMiA/zh-cn_image_0000002571291521.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=8589C291F9FA91825D6BF3CF2894248E2D0F150432533D5FCE8E3A09CC42EB9D)
* 通过[strokeLineJoin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-polyline#strokelinejoin)可以设置线条拐角绘制样式。拐角绘制样式分为Bevel(使用斜角连接路径段)、Miter(使用尖角连接路径段)、Round(使用圆角连接路径段)。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Polyline()
  2. .width(100)
  3. .height(100)
  4. .fillOpacity(0)
  5. .stroke(Color.Red)
  6. .strokeWidth(8)
  7. .points([[20, 0], [0, 100], [100, 90]])
  8. // 设置折线拐角处为圆弧
  9. .strokeLineJoin(LineJoinStyle.Round)
  ```

  [StrokeLineJoin.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ShapeDrawing/entry/src/main/ets/pages/StrokeLineJoin.ets#L21-L31)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/69/v3/N_7FfngzRj6MroG_QQtOrA/zh-cn_image_0000002540611572.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=FAB20341825E08A3AC60226470966E380E87E8A66C4A67C83C11C3A0E29C7E23)
* 通过[strokeMiterLimit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-polyline#strokemiterlimit)设置斜接长度与边框宽度比值的极限值。

  斜接长度表示外边框外边交点到内边交点的距离，边框宽度即[strokeWidth](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-polyline#strokewidth)属性的值。

  strokeMiterLimit取值需大于等于1，且在[strokeLineJoin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-polyline#strokelinejoin)属性取值LineJoinStyle.Miter时生效。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. Polyline()
  2. .width(100)
  3. .height(100)
  4. .fillOpacity(0)
  5. .stroke(Color.Red)
  6. .strokeWidth(10)
  7. .points([[20, 0], [20, 100], [100, 100]])
  8. // 设置折线拐角处为尖角
  9. .strokeLineJoin(LineJoinStyle.Miter)
  10. // 设置斜接长度与线宽的比值
  11. .strokeMiterLimit(1/Math.sin(45))
  12. Polyline()
  13. .width(100)
  14. .height(100)
  15. .fillOpacity(0)
  16. .stroke(Color.Red)
  17. .strokeWidth(10)
  18. .points([[20, 0], [20, 100], [100, 100]])
  19. .strokeLineJoin(LineJoinStyle.Miter)
  20. .strokeMiterLimit(1.42)
  ```

  [StrokeMiterLimit.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ShapeDrawing/entry/src/main/ets/pages/StrokeMiterLimit.ets#L21-L42)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2b/v3/mIG3PO2DR12UQ-ACZVFhCw/zh-cn_image_0000002571171567.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=C1702C7762A703633E1D427ABBDE3EA4FDEA05CA43C6BB679BF8FA566BEC1D1E)
* 通过[antiAlias](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-circle#antialias)设置是否开启抗锯齿，默认值为true（开启抗锯齿）。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 开启抗锯齿
  2. Circle()
  3. .width(150)
  4. .height(200)
  5. .fillOpacity(0)
  6. .strokeWidth(5)
  7. .stroke(Color.Black)
  ```

  [AntiAlias.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ShapeDrawing/entry/src/main/ets/pages/AntiAlias.ets#L22-L30)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d2/v3/8g52c0h8ReGixobTr8w9Dg/zh-cn_image_0000002540771228.png?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=0BC2DC4FE43EC09BCB8C648B6A8E83223C33EA5934ED193B975D9266F1933994)

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 关闭抗锯齿
  2. Circle()
  3. .width(150)
  4. .height(200)
  5. .fillOpacity(0)
  6. .strokeWidth(5)
  7. .stroke(Color.Black)
  8. .antiAlias(false)
  ```

  [AntiAlias.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ShapeDrawing/entry/src/main/ets/pages/AntiAlias.ets#L32-L41)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c3/v3/4sXKiyKBS4CJAX0kWYKSag/zh-cn_image_0000002571291525.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=9D6979EC680D934C6753C39512D33241296FE50DBB7D3D4DBDD66681C3C6258A)
* 通过[mesh](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-shape#mesh8)设置网格效果，实现图像局部扭曲。

  说明

  示例通过commands来绘制路径，commands参数说明请参考[SVG路径描述规范](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-path#svg路径描述规范)。

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import { FrameNode, NodeController, RenderNode } from '@kit.ArkUI';
  2. import { image } from '@kit.ImageKit';
  3. import { drawing } from '@kit.ArkGraphics2D';

  5. let offCanvas: OffscreenCanvas = new OffscreenCanvas(150, 150);
  6. let ctx = offCanvas.getContext('2d');

  8. class DrawingRenderNode extends RenderNode {
  9. private verts_: Array<number> = [0, 0, 50, 0, 410, 0, 0, 180, 50, 180, 410, 180, 0, 360, 50, 360, 410, 360];

  11. setVerts(verts: Array<number>): void {
  12. this.verts_ = verts
  13. }

  15. async draw(context: DrawContext) {
  16. const canvas = context.canvas;
  17. let pixelMap = ctx.getPixelMap(0, 0, 150, 150);
  18. const brush = new drawing.Brush(); // 只支持brush，使用pen没有绘制效果。
  19. canvas.attachBrush(brush);
  20. let verts: number[] = [0, 0, 410, 0, 50, 0, 0, 180, 50, 180, 410, 180, 0, 360, 410, 360, 50, 360];
  21. ; // 18
  22. canvas.drawPixelMapMesh(pixelMap, 2, 2, verts, 0, null, 0);
  23. canvas.detachBrush();
  24. }
  25. }

  27. const renderNode = new DrawingRenderNode();
  28. renderNode.frame = {
  29. x: 0,
  30. y: 0,
  31. width: 150,
  32. height: 150
  33. };

  35. class MyNodeController extends NodeController {
  36. private rootNode: FrameNode | null = null;

  38. makeNode(uiContext: UIContext): FrameNode | null {
  39. this.rootNode = new FrameNode(uiContext);

  41. const rootRenderNode = this.rootNode.getRenderNode();
  42. if (rootRenderNode !== null) {
  43. rootRenderNode.appendChild(renderNode);
  44. }
  45. return this.rootNode;
  46. }
  47. }

  49. @Entry
  50. @Component
  51. struct Mesh {
  52. private myNodeController: MyNodeController = new MyNodeController();
  53. @State showShape: boolean = false;
  54. @State pixelMap: image.PixelMap | undefined = undefined;
  55. @State shapeWidth: number = 150;
  56. @State strokeWidth: number = 1;
  57. @State meshArray: Array<number> = [0, 0, 50, 0, 410, 0, 0, 180, 50, 180, 410, 180, 0, 360, 50, 360, 410, 360];

  59. aboutToAppear(): void {
  60. // 'resources/base/media/image.png'需要替换为开发者所需的图像资源文件
  61. let img: ImageBitmap = new ImageBitmap('resources/base/media/image.png');
  62. ctx.drawImage(img, 0, 0, 100, 100);
  63. this.pixelMap = ctx.getPixelMap(0, 0, 150, 150);
  64. }

  66. build() {
  67. Column() {
  68. Image(this.pixelMap)
  69. .backgroundColor(Color.Blue)
  70. .width(150)
  71. .height(150)
  72. .onClick(() => {
  73. // 'resources/base/media/image.png'需要替换为开发者所需的图像资源文件
  74. let img: ImageBitmap = new ImageBitmap('resources/base/media/image.png');
  75. ctx.drawImage(img, 0, 0, 100, 100);
  76. this.pixelMap = ctx.getPixelMap(1, 1, 150, 150);
  77. this.myNodeController.rebuild();
  78. this.strokeWidth += 1;
  79. })

  81. NodeContainer(this.myNodeController)
  82. .width(150)
  83. .height(150)
  84. .backgroundColor(Color.Grey)
  85. .onClick(() => {
  86. this.meshArray = [0, 0, 50, 0, 410, 0, 0, 180, 50, 180, 410, 180, 0, 360, 50, 360, 410, 360, 0];
  87. })
  88. Button('change mesh')
  89. .margin(5)
  90. .onClick(() => {
  91. this.meshArray = [0, 0, 410, 0, 50, 0, 0, 180, 50, 180, 410, 180, 0, 360, 410, 360, 50, 360];
  92. })
  93. Button('Show Shape')
  94. .margin(5)
  95. .onClick(() => {
  96. this.showShape = !this.showShape;
  97. })

  99. if (this.showShape) {
  100. Shape(this.pixelMap) {
  101. Path().width(150).height(60).commands('M0 0 L400 0 L400 150 Z')
  102. }
  103. .fillOpacity(0.2)
  104. .backgroundColor(Color.Grey)
  105. .width(this.shapeWidth)
  106. .height(150)
  107. .mesh(this.meshArray, 2, 2)
  108. .fill(0x317AF7)
  109. .stroke(0xEE8443)
  110. .strokeWidth(this.strokeWidth)
  111. .strokeLineJoin(LineJoinStyle.Miter)
  112. .strokeMiterLimit(5)

  114. Shape(this.pixelMap) {
  115. Path().width(150).height(60).commands('M0 0 L400 0 L400 150 Z')
  116. }
  117. .fillOpacity(0.2)
  118. .backgroundColor(Color.Grey)
  119. .width(this.shapeWidth)
  120. .height(150)
  121. .fill(0x317AF7)
  122. .stroke(0xEE8443)
  123. .strokeWidth(this.strokeWidth)
  124. .strokeLineJoin(LineJoinStyle.Miter)
  125. .strokeMiterLimit(5)
  126. .onDragStart(() => {
  127. })

  129. // mesh只对shape传入pixelMap时生效，此处不生效
  130. Shape() {
  131. Path().width(150).height(60).commands('M0 0 L400 0 L400 150 Z')
  132. }
  133. .fillOpacity(0.2)
  134. .backgroundColor(Color.Grey)
  135. .width(this.shapeWidth)
  136. .height(150)
  137. .mesh(this.meshArray, 2, 2)
  138. .fill(0x317AF7)
  139. .stroke(0xEE8443)
  140. .strokeWidth(this.strokeWidth)
  141. .strokeLineJoin(LineJoinStyle.Miter)
  142. .strokeMiterLimit(5)
  143. .onClick(() => {
  144. this.pixelMap = undefined;
  145. })
  146. }
  147. }
  148. }
  149. }
  ```

  [Mesh.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ShapeDrawing/entry/src/main/ets/pages/Mesh.ets#L16-L166)

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8e/v3/uPwWmn0dTVGZ3UhXsNXSpQ/zh-cn_image_0000002540611574.png?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=2E9E705D7B84A5922BC86335AA65C2B79C5B8B34B98079843FB55AB9745A7F53)

## 场景示例

### 绘制封闭路径

在Shape的(-80, -5)点绘制一个封闭路径，填充颜色0x317AF7，线条宽度3，边框颜色红色，拐角样式锐角（默认值）。

说明

示例通过commands来绘制路径，commands参数说明请参考[SVG路径描述规范](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-path#svg路径描述规范)。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct ShapeExample {
4. build() {
5. Column({ space: 10 }) {
6. Shape() {
7. Path().width(200).height(60).commands('M0 0 L400 0 L400 150 Z')
8. }
9. .viewPort({
10. x: -80,
11. y: -5,
12. width: 500,
13. height: 300
14. })
15. .fill('rgb(213, 213, 213)')
16. .stroke('rgb(39, 135, 217)')
17. .strokeWidth(3)
18. .strokeLineJoin(LineJoinStyle.Miter)
19. .strokeMiterLimit(5)
20. }.width('100%').margin({ top: 15 })
21. }
22. }
```

[ShapeExample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ShapeDrawing/entry/src/main/ets/pages/ShapeExample.ets#L16-L34)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/78/v3/zO7cq0NpTcukdDGCLq5BDg/zh-cn_image_0000002571171569.png?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=1111EB555CAF5680DF8E5A2B02E57369603F3C24CA28BD4104D62070F8664F95)

### 绘制圆和圆环

绘制一个直径为150的圆，和一个直径为150、线条为红色虚线的圆环（宽高设置不一致时以短边为直径）。

说明

本示例通过strokeDashArray属性设置边框间隙来实现红色虚线的圆环，strokeDashArray属性参考[strokeDashArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-drawing-components-shape#strokedasharray)。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct CircleExample {
4. build() {
5. Column({ space: 10 }) {
6. // 绘制一个直径为150的圆
7. Circle({ width: 150, height: 150 })
8. // 绘制一个直径为150、线条为红色虚线的圆环
9. Circle()
10. .width(150)
11. .height(200)
12. .fillOpacity(0)
13. .strokeWidth(3)
14. .stroke(Color.Red)
15. .strokeDashArray([1, 2])
16. // ···
17. }.width('100%')
18. }
19. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2a/v3/GXKTnF0tTkCgP5JM7Xg00w/zh-cn_image_0000002540771230.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=DA1C718246E3554AEA87FB5FFCD6CDBF94B3B04A7EB0A544DF562B33529DFE25)

### UI视觉属性作用效果

说明

[backgroundColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-background#backgroundcolor)、[linearGradient](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-gradient-color#lineargradient)等通用属性作用于组件的背景区域，而不会在组件具体的内容区域生效。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct CircleExample {
4. build() {
5. Column({ space: 10 }) {
6. // ···
7. // 绘制一个直径为150的圆
8. Circle()
9. .width(150)
10. .height(200)
11. .backgroundColor(Color.Pink) // 会生效在一个150*200大小的矩形区域，而非仅在绘制的一个直径为150的圆形区域
12. }.width('100%')
13. }
14. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/73/v3/iF3TF1W6TvCGZ27al8E6Ag/zh-cn_image_0000002571291527.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T035228Z&HW-CC-Expire=86400&HW-CC-Sign=27A338488BAB97152CE759EA8A975B67BFCF50E0AC1CFDE15901DD12785185E5)