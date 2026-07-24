**现象描述**

以团结引擎为例，游戏应用集成ABR，在游戏引擎中通过GetNativeTexturePtr获取Buffer关联的纹理，获取到的纹理内容为空。

**原因分析**

由于ABR对Buffer进行了自适应分辨率调整，并对ABR自适应缩放后的GLES纹理进行绘制，因而原始分辨率的GLES纹理中没有内容。

**处理步骤**

为解决此问题，需要通过[HMS\_ABR\_GetScaledTexture\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#section791920394423)接口获取到ABR自适应缩放后的GLES纹理索引。

收起

自动换行

深色代码主题

复制

```
1. // 在Buffer渲染后调用
2. GLuint originTexture;
3. GLuint scaledTexture;
4. errorCode = HMS_ABR_GetScaledTexture_GLES(context_, originTexture, &scaledTexture);
5. if (errorCode != ABR_SUCCESS) {
6. GOLOGE("HMS_ABR_GetScaledTexture_GLES execution failed, error code: %d.", errorCode);
7. }
```