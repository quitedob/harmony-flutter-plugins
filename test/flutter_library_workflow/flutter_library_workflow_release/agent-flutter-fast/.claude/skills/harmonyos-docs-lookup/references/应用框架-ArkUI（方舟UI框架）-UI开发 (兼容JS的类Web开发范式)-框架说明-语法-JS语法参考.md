JS文件用来定义HML页面的业务逻辑，支持ECMA规范的JavaScript语言。基于JavaScript语言的动态化能力，可以使应用更加富有表现力，具备更加灵活的设计能力。下面讲述JS文件的编译和运行的支持情况。

## 语法

支持ES6语法。

* 模块声明

  使用import方法引入功能模块：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import router from '@ohos.router';
  ```
* 代码引用

  使用import方法导入js代码：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. import utils from '../../common/utils.js';
  ```

## 对象

* 应用对象

  展开

  | 属性 | 类型 | 描述 |
  | --- | --- | --- |
  | $def | Object | 使用this.$app.$def获取在app.js中暴露的对象。  **说明：**  应用对象不支持数据绑定，需主动触发UI更新。 |

  示例代码

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // app.js
  2. export default {
  3. onCreate() {
  4. console.info('Application onCreate');
  5. },
  6. onDestroy() {
  7. console.info('Application onDestroy');
  8. },
  9. globalData: {
  10. appData: 'appData',
  11. appVersion: '2.0',
  12. },
  13. globalMethod() {
  14. console.info('This is a global method!');
  15. this.globalData.appVersion = '3.0';
  16. }
  17. };
  ```

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // index.js页面逻辑代码
  2. export default {
  3. data: {
  4. appData: 'localData',
  5. appVersion:'1.0',
  6. },
  7. onInit() {
  8. this.appData = this.$app.$def.globalData.appData;
  9. this.appVersion = this.$app.$def.globalData.appVersion;
  10. },
  11. invokeGlobalMethod() {
  12. this.$app.$def.globalMethod();
  13. },
  14. getAppVersion() {
  15. this.appVersion = this.$app.$def.globalData.appVersion;
  16. }
  17. }
  ```
* 页面对象

  展开

  | 属性 | 类型 | 描述 |
  | --- | --- | --- |
  | data | Object/Function | 页面的数据模型，类型是对象或者函数，如果类型是函数，返回值必须是对象。属性名不能以$或\_开头，不要使用保留字for, if, show, tid。  data字段不可与private/public字段同时使用。 |
  | $refs | Object | 持有注册过ref 属性的DOM元素或子组件实例的对象。示例见[获取DOM元素](/consumer/cn/doc/harmonyos-guides/js-framework-syntax-js#获取dom元素)。 |
  | private | Object | 页面的数据模型，private下的数据属性只能由当前页面修改。 |
  | public | Object | 页面的数据模型，public下的数据属性的行为与data保持一致。 |
  | props | Array/Object | props用于组件之间的通信，可以通过<tag xxxx='value'>方式传递给组件；props名称必须用小写，不能以$或\_开头，不要使用保留字for, if, show, tid。目前props的数据类型不支持Function。示例见[Props](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-custom-props#props)。 |
  | computed | Object | 用于在读取或设置进行预先处理，计算属性的结果会被缓存。计算属性名不能以$或\_开头，不要使用保留字。示例见[computed](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-custom-props#computed)。 |

## 方法

* 数据方法

  展开

  | 方法 | 参数 | 描述 |
  | --- | --- | --- |
  | $set | key: string, value: any | 添加新的数据属性或者修改已有数据属性。  用法：  this.$set('key',value)：添加数据属性。 |
  | $delete | key: string | 删除数据属性。  用法：  this.$delete('key')：删除数据属性。 |

  示例代码

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // index.js
  2. export default {
  3. data: {
  4. keyMap: {
  5. OS: 'OS',
  6. Version: '2.0',
  7. },
  8. },
  9. getAppVersion() {
  10. this.$set('keyMap.Version', '3.0');
  11. console.info("keyMap.Version = " + this.keyMap.Version); // keyMap.Version = 3.0

  13. this.$delete('keyMap');
  14. console.info("keyMap.Version = " + this.keyMap); // log print: keyMap.Version = undefined
  15. }
  16. }
  ```
* 公共方法

  展开

  | 方法 | 参数 | 描述 |
  | --- | --- | --- |
  | $element | id: string | 获得指定id的组件对象，如果无指定id，则返回根组件对象。示例见[获取DOM元素](/consumer/cn/doc/harmonyos-guides/js-framework-syntax-js#获取dom元素)。  用法：  <div id='xxx'></div>  - this.$element('xxx')：获得id为xxx的组件对象。  - this.$element()：获得根组件对象。 |
  | $rootElement | 无 | 获取根组件对象。  用法：  this.$rootElement().scrollTo({ duration: 500, position: 300 }), 页面在500ms内滚动300px。 |
  | $root | 无 | 获得顶级ViewModel实例。[获取ViewModel](/consumer/cn/doc/harmonyos-guides/js-framework-syntax-js#获取viewmodel)示例。 |
  | $parent | 无 | 获得父级ViewModel实例。[获取ViewModel](/consumer/cn/doc/harmonyos-guides/js-framework-syntax-js#获取viewmodel)示例。 |
  | $child | id: string | 获得指定id的子级自定义组件的ViewModel实例。[获取ViewModel](/consumer/cn/doc/harmonyos-guides/js-framework-syntax-js#获取viewmodel)示例。  用法：  this.$child('xxx') ：获取id为xxx的子级自定义组件的ViewModel实例。 |
* 事件方法

  展开

  | 方法 | 参数 | 描述 |
  | --- | --- | --- |
  | $watch | data: string, callback: string | Function | 观察data中的属性变化，如果属性值改变，触发绑定的事件。示例见[$watch感知数据改变](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-custom-props#watch感知数据改变)。  用法：  this.$watch('key', callback)：通过监听key属性值的变化，触发callback事件。 |
* 页面方法

  展开

  | 方法 | 参数 | 描述 |
  | --- | --- | --- |
  | scrollTo6+ | scrollPageParam: ScrollPageParam | 将页面滚动到目标位置，可以通过ID选择器指定或者滚动距离指定。 |

  **表1** ScrollPageParam6+

  展开

  | 名称 | 类型 | 默认值 | 描述 |
  | --- | --- | --- | --- |
  | position | number | - | 指定滚动位置。 |
  | id | string | - | 指定需要滚动到的元素id。 |
  | duration | number | 300 | 指定滚动时长，单位为毫秒。 |
  | timingFunction | string | ease | 指定滚动动画曲线，可选值参考  [动画样式animation-timing-function](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-common-animation)。 |
  | complete | () => void | - | 指定滚动完成后需要执行的回调函数。 |

  示例：

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. this.$rootElement().scrollTo({ position: 0 });
  2. this.$rootElement().scrollTo({ id: 'id', duration: 200, timingFunction: 'ease-in', complete: () => {
  3. console.info('滚动已完成');
  4. } });
  ```

## 获取DOM元素

1. 通过$refs获取DOM元素

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. <!-- index.hml -->
   2. <div class="container">
   3. <image-animator class="image-player" ref="animator" images="{{images}}" duration="1s" onclick="handleClick"></image-animator>
   4. </div>
   ```

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // index.js
   2. export default {
   3. data: {
   4. images: [
   5. { src: '/common/frame1.png' },
   6. { src: '/common/frame2.png' },
   7. { src: '/common/frame3.png' }
   8. ]
   9. },
   10. handleClick() {
   11. const animator = this.$refs.animator; // 获取ref属性为animator的DOM元素
   12. const state = animator.getState();
   13. if (state === 'Paused') {
   14. animator.resume();
   15. } else if (state === 'Stopped') {
   16. animator.start();
   17. } else {
   18. animator.pause();
   19. }
   20. },
   21. };
   ```
2. 通过$element获取DOM元素

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. <!-- index.hml -->
   2. <div class="container" style="width:500px;height: 700px; margin: 100px;">
   3. <image-animator class="image-player" id="animator" images="{{images}}" duration="1s" onclick="handleClick"></image-animator>
   4. </div>
   ```

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // index.js
   2. export default {
   3. data: {
   4. images: [
   5. { src: '/common/frame1.png' },
   6. { src: '/common/frame2.png' },
   7. { src: '/common/frame3.png' }
   8. ]
   9. },
   10. handleClick() {
   11. const animator = this.$element('animator'); // 获取id属性为animator的DOM元素
   12. const state = animator.getState();
   13. if (state === 'Paused') {
   14. animator.resume();
   15. } else if (state === 'Stopped') {
   16. animator.start();
   17. } else {
   18. animator.pause();
   19. }
   20. },
   21. };
   ```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b9/v3/12wQDgb6RTyQKSBx-fT0GA/zh-cn_image_0000002540771390.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035926Z&HW-CC-Expire=86400&HW-CC-Sign=54F175F150F4216B6D60CA644D011DB0C1DCB6493E101F14A3243A6C3DC77F56)

## 获取ViewModel

根节点所在页面：

收起

自动换行

深色代码主题

复制

```
1. <!-- root.hml -->
2. <element name='parentComp' src='../../common/component/parent/parent.hml'></element>
3. <div class="container">
4. <div class="container">
5. <text>{{text}}</text>
6. <parentComp></parentComp>
7. </div>
8. </div>
```

收起

自动换行

深色代码主题

复制

```
1. // root.js
2. export default {
3. data: {
4. text: 'I am root!',
5. },
6. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a1/v3/g-FM3DAEQViAvMQ1AjUDnA/zh-cn_image_0000002571291685.png?HW-CC-KV=V1&HW-CC-Date=20260414T035926Z&HW-CC-Expire=86400&HW-CC-Sign=2A53BE9127E484E487F6950165CD855FA9CFA52F19DB2804F35A06920320C764)

自定义parent组件：

收起

自动换行

深色代码主题

复制

```
1. <!-- parent.hml -->
2. <element name='childComp' src='../child/child.hml'></element>
3. <div class="item" onclick="textClicked">
4. <text class="text-style" onclick="parentClicked">parent component click</text>
5. <text class="text-style" if="{{showValue}}">hello parent component!</text>
6. <childComp id = "selfDefineChild"></childComp>
7. </div>
```

收起

自动换行

深色代码主题

复制

```
1. // parent.js
2. export default {
3. data: {
4. showValue: false,
5. text: 'I am parent component!',
6. },
7. parentClicked () {
8. this.showValue = !this.showValue;
9. console.info('parent component get parent text');
10. console.info(`${this.$parent().text}`);
11. console.info("parent component get child function");
12. console.info(`${this.$child('selfDefineChild').childClicked()}`);
13. },
14. }
```

自定义child组件：

收起

自动换行

深色代码主题

复制

```
1. <!-- child.hml -->
2. <div class="item" onclick="textClicked">
3. <text class="text-style" onclick="childClicked">child component clicked</text>
4. <text class="text-style" if="{{isShow}}">hello child component</text>
5. </div>
```

收起

自动换行

深色代码主题

复制

```
1. // child.js
2. export default {
3. data: {
4. isShow: false,
5. text: 'I am child component!',
6. },
7. childClicked () {
8. this.isShow = !this.isShow;
9. console.info('child component get parent text');
10. console.info('${this.$parent().text}');
11. console.info('child component get root text');
12. console.info('${this.$root().text}');
13. },
14. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5/v3/cgKIqujoT5qksYTKprf8yg/zh-cn_image_0000002540611738.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035926Z&HW-CC-Expire=86400&HW-CC-Sign=28A5E6CE029F946BD360CCF20F8DBD3D4179B8D6E029DF8C194C3F97DD123AA5)