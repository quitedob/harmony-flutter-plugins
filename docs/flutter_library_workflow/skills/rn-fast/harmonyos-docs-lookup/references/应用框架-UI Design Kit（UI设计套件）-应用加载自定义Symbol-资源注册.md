## 场景介绍

从5.1.1 (19)版本开始，新增支持资源注册。

适用于需要快速定制应用内[Symbol图标](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-symbolregister)，不想强依赖于系统版本中预制的系统Symbol图标资源。

## 约束条件

资源注册支持Phone、Tablet、PC/2in1设备，并且从5.1.1(19)版本开始，新增支持TV设备。

## 开发步骤

1. 将UX设计师提供的Symbol图标资源（TTF文件）与动效参数资源（JSON文件）放入entry/src/main/resources/rawfile下，可新建目录。

   说明：[Symbol资源设计规范](https://developer.huawei.com/consumer/cn/doc/design-guides/system-icons-0000001929854962)

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f6/v3/59G7s-4ySeyERGlu3Ib6TQ/zh-cn_image_0000002532144131.png?HW-CC-KV=V1&HW-CC-Date=20260414T041644Z&HW-CC-Expire=86400&HW-CC-Sign=1D7D39CC5E0F264726EFD4BA208B4A353E493DA856D40D2FF9D6EBD83F72D384 "点击放大")
2. 多语言场景，在entry/src/main/resources目录中对应语言目录下的string.json文件中配置对应的Symbol图标Unicode值。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/51/v3/DTYJq5gPRVuUobWFx7uFJw/zh-cn_image_0000002500424060.png?HW-CC-KV=V1&HW-CC-Date=20260414T041644Z&HW-CC-Expire=86400&HW-CC-Sign=744F94DFED8F65A6765F901DBC05454C8B32E015A9FA85492951D971A6F7F054)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "string": [
   3. {
   4. "name": "symbol_custom_phone_fill_1",
   5. "value": "0x100016"
   6. }
   7. ]
   8. }
   ```
3. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { symbolRegister } from '@kit.UIDesignKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
4. 在通过SymbolGlyph/SymbolSpan组件展示自定义Symbol图标前，需要注册加载图标资源与动效参数资源。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. let result = symbolRegister.registerSymbol($rawfile("symbol/symbol_register.ttf"), $rawfile("symbol/symbol_register.json"));
   3. } catch (error) {
   4. let err = error as BusinessError;
   5. console.error("errCode: " + err.code)
   6. console.error("error: " + err.message);
   7. }
   ```
5. 在需要展示自定义Symbol图标的页面通过SymbolGlyph/SymbolSpan组件展示该图标。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. struct test {
   2. build() {
   3. Column(){
   4. SymbolGlyph($r('app.string.symbol_custom_phone_fill_1'))
   5. }
   6. }
   7. }
   ```

## 开发实例

收起

自动换行

深色代码主题

复制

```
1. import { symbolRegister } from '@kit.UIDesignKit';
2. import { BusinessError } from '@ohos.base';

4. @Entry
5. @Component
6. struct test {
7. aboutToAppear(): void {
8. try {
9. let result = symbolRegister.registerSymbol($rawfile("symbol/symbol_register.ttf"), $rawfile("symbol/symbol_register.json"));
10. } catch (error) {
11. let err = error as BusinessError;
12. console.error("errCode: " + err.code)
13. console.error("error: " + err.message);
14. }
15. }
16. build() {
17. Column(){
18. SymbolGlyph($r('app.string.symbol_custom_phone_fill_1'))
19. }
20. }
21. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b0/v3/cM3Ja4STQcC-E7ktcL71vw/zh-cn_image_0000002500304210.png?HW-CC-KV=V1&HW-CC-Date=20260414T041644Z&HW-CC-Expire=86400&HW-CC-Sign=D93199F7A87E9D82C2558E17CCC90A6AA54EDD7C646CFF545AAB4F78507C3F52)