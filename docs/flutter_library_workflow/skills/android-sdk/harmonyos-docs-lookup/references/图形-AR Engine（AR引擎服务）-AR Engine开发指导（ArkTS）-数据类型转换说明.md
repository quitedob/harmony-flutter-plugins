在开发AR应用时，部分数据类型需要转换才能使用，以下进行汇总及示例。

## ArrayBuffer

在一些不支持接收ArrayBuffer数据类型的方法中，需要将其反序列化为int32或者float32类型，涉及转换的接口列表如下：

展开

| 接口名 | 描述 |
| --- | --- |
| [ImageComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section175993235012) | 参数buffer为ArrayBuffer类型，可转换为int32。 |
| [ARPlane.getPolygonXZ](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section12949442354) | 返回值为ArrayBuffer类型，可转换为float32。 |
| [ARSceneMesh.getVertices](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section15211205153115) | 返回值为ArrayBuffer类型，可转换为float32。 |
| [ARSceneMesh.getVertexNormals](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section4793111183211) | 返回值为ArrayBuffer类型，可转换为float32。 |
| [ARSceneMesh.getTriangleIndices](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section19221187183218) | 返回值为ArrayBuffer类型，可转换为int32。 |
| [ARSemanticDensePointData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section1031071863714) | 参数id为ArrayBuffer类型，可转换为int32。 |
| [ARSemanticDensePointData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section1031071863714) | 参数position为ArrayBuffer类型，可转换为float32。 |
| [ARSemanticDensePointData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section1031071863714) | 参数color为ArrayBuffer类型，可转换为int32。 |

转换的示例如下：

收起

自动换行

深色代码主题

复制

```
1. // ArrayBuffer转float32
2. function arrayBufferFloat32ToNumber(buffer: ArrayBuffer): number[] {
3. let view: Float32Array = new Float32Array(buffer);
4. let numberArray: number[] = Array.from(view);
5. return numberArray;
6. }

8. // ArrayBuffer转int32
9. function arrayBufferInt32ToNumber(buffer: ArrayBuffer): number[] {
10. let view: Int32Array = new Int32Array(buffer);
11. let numberArray: number[] = Array.from(view);
12. return numberArray;
13. }
```