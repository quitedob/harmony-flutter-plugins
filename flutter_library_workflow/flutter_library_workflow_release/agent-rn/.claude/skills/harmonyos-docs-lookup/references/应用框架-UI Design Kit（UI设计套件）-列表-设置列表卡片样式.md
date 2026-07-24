## 场景介绍

从6.0.0(20) Beta1版本开始，新增支持设置列表卡片样式。

应用使用[HdsListItemCard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdslistitemcard)组件实现多设备上的系统列表样式。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/39/v3/1OJ4m2lqQ-yU4K5wCoj3Fg/zh-cn_image_0000002532144147.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T041637Z&HW-CC-Expire=86400&HW-CC-Sign=1C540DCFED4FB3F9C54FA7D7BBD535CF7FCB7307000E9727F5FEC8EBC0C1834B "点击放大")

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { HdsListItemCard, PrefixImage, SuffixSwitch} from '@kit.UIDesignKit';
   2. import { promptAction } from '@kit.ArkUI';
   ```
2. 创建HdsListItemCard组件，设置左边为Image，中间为Text，右边为Switch的场景。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Test {
   4. private scroller: ListScroller = new ListScroller();

   6. build() {
   7. Column() {
   8. List({ space: 10, scroller: this.scroller }) {
   9. ListItem() {
   10. HdsListItemCard({
   11. // A区图片
   12. prefixItem: new PrefixImage({
   13. image: $r('app.media.background'),
   14. onClick: () => {
   15. promptAction.openToast({ message: 'left image' });
   16. }
   17. }),
   18. // B区文本
   19. textItem: {
   20. primaryText: {
   21. text: 'Primary Text'
   22. },
   23. secondaryText: {
   24. text: 'Secondary Text'
   25. },
   26. description: {
   27. text: 'Description Text'
   28. }
   29. },
   30. // C区Switch
   31. suffixItem: new SuffixSwitch({
   32. isCheck: false,
   33. onChange: (num: boolean) => {
   34. if (num) {
   35. promptAction.openToast({ message: 'switch is true' });
   36. } else {
   37. promptAction.openToast({ message: 'switch is false' });
   38. }
   39. }
   40. }),
   41. onClick: () => {
   42. promptAction.openToast({ message: 'hdslistitem' });
   43. }
   44. })
   45. }
   46. }
   47. .width('100%')
   48. .height('100%')
   49. .margin(10)
   50. }.backgroundColor(0x1a0a59f7).height('100%')
   51. }
   52. }
   ```