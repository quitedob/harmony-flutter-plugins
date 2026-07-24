手势表示由单个或多个事件识别的语义动作（例如：触摸、点击和长按）。一个完整的手势也可能由多个事件组成，对应手势的生命周期。支持的事件有：

**触摸**

* touchstart：手指触摸动作开始。
* touchmove：手指触摸后移动。
* touchcancel：手指触摸动作被打断，如来电提醒、弹窗。
* touchend：手指触摸动作结束。

**点击**

click：用户快速轻敲屏幕。

**长按**

longpress：用户在相同位置长时间保持与屏幕接触。

具体的使用示例如下：

收起

自动换行

深色代码主题

复制

```
1. <!-- xxx.hml -->
2. <div class="container">
3. <div class="text-container" onclick="click">
4. <text class="text-style">{{onClick}}</text>
5. </div>
6. <div class="text-container" ontouchstart="touchStart">
7. <text class="text-style">{{touchstart}}</text>
8. </div>
9. <div class="text-container" ontouchmove="touchMove">
10. <text class="text-style">{{touchmove}}</text>
11. </div>
12. <div class="text-container" ontouchend="touchEnd">
13. <text class="text-style">{{touchend}}</text>
14. </div>
15. <div class="text-container" ontouchcancel="touchCancel">
16. <text class="text-style">{{touchcancel}}</text>
17. </div>
18. <div class="text-container" onlongpress="longPress">
19. <text class="text-style">{{onLongPress}}</text>
20. </div>
21. </div>
```

收起

自动换行

深色代码主题

复制

```
1. /* xxx.css */
2. .container {
3. width: 100%;
4. height: 100%;
5. flex-direction: column;
6. justify-content: center;
7. align-items: center;
8. }
9. .text-container {
10. margin-top: 30px;
11. flex-direction: column;
12. width: 600px;
13. height: 70px;
14. background-color: #0000FF;
15. }
16. .text-style {
17. width: 100%;
18. line-height: 50px;
19. text-align: center;
20. font-size: 24px;
21. color: #ffffff;
22. }
```

收起

自动换行

深色代码主题

复制

```
1. // xxx.js
2. export default {
3. data: {
4. touchstart: 'touchstart',
5. touchmove: 'touchmove',
6. touchend: 'touchend',
7. touchcancel: 'touchcancel',
8. onClick: 'onclick',
9. onLongPress: 'onLongPress',
10. },
11. touchCancel: function (event) {
12. console.info('event is', JSON.stringify(event));
13. this.touchcancel = 'canceled';
14. },
15. touchEnd: function(event) {
16. console.info('event is', JSON.stringify(event));
17. this.touchend = 'ended';
18. },
19. touchMove: function(event) {
20. console.info('event is', JSON.stringify(event));
21. this.touchmove = 'moved';
22. },
23. touchStart: function(event) {
24. console.info('event is', JSON.stringify(event));
25. this.touchstart = 'touched';
26. },
27. longPress: function() {
28. this.onLongPress = 'longPressed';
29. },
30. click: function() {
31. this.onClick = 'clicked';
32. },
33. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/35/v3/eIKQ8JBnRoqTgKcmqf8_dg/zh-cn_image_0000002540611742.gif?HW-CC-KV=V1&HW-CC-Date=20260414T040019Z&HW-CC-Expire=86400&HW-CC-Sign=19288BD22BE9CCA714DC9C250E1F8DCE47F9172A073B0AEB5575077300CC1105)