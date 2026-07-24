可以通过设置组件的sharedTransition属性将该元素标记为共享元素并设置对应的共享元素转场动效。sharedTransition仅发生在[@ohos.router (页面路由)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-router)跳转时。

说明

从API version 7开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## sharedTransition

PhonePC/2in1TabletTVWearable

sharedTransition(id: string, options?: sharedTransitionOptions): T

设置共享元素转场动效。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | string | 是 | 两个页面中id值相同且不为空字符串的组件即为共享元素，在页面转场时可显示共享元素转场动效。 |
| options | [sharedTransitionOptions](/consumer/cn/doc/harmonyos-references/ts-transition-animation-shared-elements#sharedtransitionoptions) | 否 | 共享元素转场动画参数。不设置时使用默认转场动画参数。各参数具体默认值参考[sharedTransitionOptions](/consumer/cn/doc/harmonyos-references/ts-transition-animation-shared-elements#sharedtransitionoptions)。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## sharedTransitionOptions

PhonePC/2in1TabletTVWearable

共享元素转场动画参数。

说明

type为SharedTransitionEffectType.Exchange时motionPath才会生效。

type为SharedTransitionEffectType.Exchange时，效果为对匹配的共享元素产生位置、大小的过渡（可通过配置组件的border观察），不支持内容的过渡效果。例如，Text组件在两个页面上使用不同的fontSize属性值，即绘制内容有大小差异，在sharedTransition动画结束后的最后一帧，Text的fontSize效果会突变为跳转目标页fontSize的效果。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| duration | number | 否 | 是 | 描述共享元素转场动效播放时长。  默认值：1000  单位：毫秒  取值范围：[0, +∞) |
| curve | [Curve](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#curve) | string | [ICurve](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-curve#icurve9) | 否 | 是 | 动画曲线。  推荐以Curve或ICurve形式指定。  当类型为string时，为动画插值曲线，取值参考[AnimateParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-explicit-animation#animateparam对象说明)的curve参数。  默认值：Curve.Linear |
| delay | number | 否 | 是 | 延迟播放时间。  取值范围：[0, +∞)  默认值：0  单位：毫秒 |
| motionPath | [MotionPathOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-motion-path-animation#motionpathoptions) | 否 | 是 | 运动路径信息。 |
| zIndex | number | 否 | 是 | 设置Z轴。  取值范围：(-∞, +∞)  默认值：0 |
| type | [SharedTransitionEffectType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#sharedtransitioneffecttype) | 否 | 是 | 动画类型。  默认值：SharedTransitionEffectType.Exchange |

## 示例

PhonePC/2in1TabletTVWearable

示例代码为点击图片跳转页面时，显示共享元素图片的自定义转场动效。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct SharedTransitionExample {

6. build() {
7. Column() {
8. // $r('app.media.ic_health_heart')需要替换为开发者所需的图像资源文件。
9. Image($r('app.media.ic_health_heart')).width(50).height(50).margin({ left: 20, top: 20 })
10. .sharedTransition('sharedImage', { duration: 800, curve: Curve.Linear, delay: 100 })
11. }.width('100%').height('100%').alignItems(HorizontalAlign.Start)
12. .onClick(() => {
13. this.getUIContext().getRouter().pushUrl({ url: 'pages/PageB' })
14. })
15. }

17. pageTransition() {
18. PageTransitionEnter({ type: RouteType.None, duration: 0 })
19. PageTransitionExit({ type: RouteType.None, duration: 0 })
20. }
21. }
```



```
1. // PageB.ets
2. @Entry
3. @Component
4. struct PageBExample {
5. build() {
6. Stack() {
7. // $r('app.media.ic_health_heart')需要替换为开发者所需的图像资源文件。
8. Image($r('app.media.ic_health_heart')).width(150).height(150)
9. .sharedTransition('sharedImage', { duration: 800, curve: Curve.Linear, delay: 100 })
10. }.width('100%').height('100%')
11. }

13. pageTransition() {
14. PageTransitionEnter({ type: RouteType.None, duration: 0 })
15. PageTransitionExit({ type: RouteType.None, duration: 0 })
16. }
17. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/94/v3/msAlFKG6TBi1RCJmDJ9VOQ/zh-cn_image_0000002599358923.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035546Z&HW-CC-Expire=86400&HW-CC-Sign=6CDF74CA46A5F00B7482FD8095F2445BEBC9961093D09CB998487C8E763B9E68)