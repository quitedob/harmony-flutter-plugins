组件的Z序，设置同一容器中兄弟组件的堆叠顺序。

说明

从API version 7开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## zIndex

PhonePC/2in1TabletTVWearable

zIndex(value: number): T

设置组件的堆叠顺序。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | 是 | 同一容器中兄弟组件显示层级关系。zIndex值越大，显示层级越高，即zIndex值大的组件会覆盖在zIndex值小的组件上方。当不涉及新增或减少兄弟节点，动态改变zIndex时会在zIndex改变前层级顺序的基础上进行稳定排序。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（设置组件堆叠顺序）

该示例通过zIndex设置组件堆叠顺序。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct ZIndexExample {
5. build() {
6. Column() {
7. Stack() {
8. // Stack会重叠组件，默认后定义的在最上面，具有较高zIndex值的元素在zIndex较小的元素前面
9. // Text1设置zIndex值为2
10. Text('1, zIndex(2)')
11. .size({ width: '40%', height: '30%' }).backgroundColor(0xbbb2cb)
12. .zIndex(2)
13. // Text2设置zIndex值为1
14. Text('2, default zIndex(1)')
15. .size({ width: '70%', height: '50%' }).backgroundColor(0xd2cab3).align(Alignment.TopStart)
16. .zIndex(1)
17. // Text3设置zIndex值为0
18. Text('3, zIndex(0)')
19. .size({ width: '90%', height: '80%' }).backgroundColor(0xc1cbac).align(Alignment.TopStart)
20. .zIndex(0)
21. }.width('100%').height(200)
22. }.width('100%').height(200)
23. }
24. }
```

Stack容器内子组件不设置zIndex的效果。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9c/v3/i97toyBKTRq0rILvhWCiHQ/zh-cn_image_0000002599478321.png?HW-CC-KV=V1&HW-CC-Date=20260511T034425Z&HW-CC-Expire=86400&HW-CC-Sign=961B6FE20EA91EACC68002511F551AA07F1D85B815891D084EBD944DCC8A3B02)

Stack容器子组件设置zIndex后的效果。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a9/v3/MmV-U0sfTPyxQ18kABE4kQ/zh-cn_image_0000002568759132.png?HW-CC-KV=V1&HW-CC-Date=20260511T034425Z&HW-CC-Expire=86400&HW-CC-Sign=127C21B12EAEED252889EE7AA0B2B6FBC1AC42BA6A37B63C7FD0A38F5AFD5B41)

### 示例2（动态修改zIndex属性）

该示例使用Button组件动态修改zIndex属性。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct ZIndexExample {
5. @State zIndex_: number = 0

7. build() {
8. Column() {
9. // 点击Button改变zIndex后，在点击Button前的层级顺序上根据zIndex进行稳定排序。
10. Button("change Text2 zIndex")
11. .onClick(() => {
12. this.zIndex_ = (this.zIndex_ + 1) % 3;
13. })
14. Stack() {
15. // Text1设置zIndex值为1
16. Text('1, zIndex(1)')
17. .size({ width: '70%', height: '50%' }).backgroundColor(0xd2cab3).align(Alignment.TopStart)
18. .zIndex(1)
19. // Text2设置zIndex默认值为0
20. Text('2, default zIndex(0), now zIndex:' + this.zIndex_)
21. .size({ width: '90%', height: '80%' }).backgroundColor(0xc1cbac).align(Alignment.TopStart)
22. .zIndex(this.zIndex_)
23. }.width('100%').height(200)
24. }.width('100%').height(200)
25. }
26. }
```

不点击Button修改zIndex值的效果。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/10/v3/ZGXVQM7HSVWRgJCpyLEOTA/zh-cn_image_0000002599358375.png?HW-CC-KV=V1&HW-CC-Date=20260511T034425Z&HW-CC-Expire=86400&HW-CC-Sign=E86DEBD78F8EBBC6CDD186C8965B9B66F7BCCA8A2C071323DCE12A7098693D43)

点击Button动态修改zIndex，使Text1和Text2的zIndex相等，因为在点击Button前的层级顺序上根据zIndex进行稳定排序，层级顺序不发生改变。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/39/v3/FNNDdeVnRWyjeP4GUY2dog/zh-cn_image_0000002568918780.png?HW-CC-KV=V1&HW-CC-Date=20260511T034425Z&HW-CC-Expire=86400&HW-CC-Sign=D16368EAD0417EF6FAED2DD82A53C9C6B81E7AFE8B6F22A5153C677C37B11BE7)

点击Button动态修改zIndex，使Text2的zIndex大于Text1，层级顺序发生改变。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ee/v3/eFAlJKQ0QGKVn9ZQNCg3Ig/zh-cn_image_0000002599478323.png?HW-CC-KV=V1&HW-CC-Date=20260511T034425Z&HW-CC-Expire=86400&HW-CC-Sign=A811EA4C8A412821CDF09B98ABF77C7512548F9EB748BF09C070EB62BC24DC72)

### 示例3（设置不同容器内组件的zIndex属性）

该示例在不同容器内设置zIndex属性。其中，Text1、Text2和Text3在不同的Stack容器内。虽然Text3的zIndex值最小，但Text1、Text2仍无法按照预期显示在Text3的上方。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct ZIndexExample {
5. build() {
6. Stack() {
7. Stack() {
8. // Text1设置zIndex值为2
9. Text('1, zIndex(2)')
10. .size({ width: '40%', height: '30%' }).backgroundColor(0xbbb2cb)
11. .zIndex(2)
12. // Text2设置zIndex值为1
13. Text('2, default zIndex(1)')
14. .size({ width: '70%', height: '50%' }).backgroundColor(0xd2cab3).align(Alignment.TopStart)
15. .zIndex(1)
16. }.width('100%').height(200)

18. Stack() {
19. // zIndex在不同容器的组件中无法生效，Text3会显示在最上方
20. // Text3设置zIndex值为0
21. Text('3, zIndex(0)')
22. .size({ width: '90%', height: '80%' }).backgroundColor(0xc1cbac).align(Alignment.TopStart)
23. .zIndex(0)
24. }.width('100%').height(200)
25. }.width('100%').height(200)
26. }
27. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e2/v3/-GftzPXvReC8F0b2QvafGA/zh-cn_image_0000002568759134.png?HW-CC-KV=V1&HW-CC-Date=20260511T034425Z&HW-CC-Expire=86400&HW-CC-Sign=EAFB0CE61D8218F9260664F6ADE2E417B2977C5B54F9D03AE59237936C1CF370)