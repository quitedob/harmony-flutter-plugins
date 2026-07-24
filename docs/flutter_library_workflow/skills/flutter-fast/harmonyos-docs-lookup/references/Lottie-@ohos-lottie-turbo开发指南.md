# <center>lottie-turbo</center>

本项目基于 [lottie-turbo](https://github.com/airbnb/lottie-ios) 开发。

## 简介

lottie-turbo 是一个适用于 OpenHarmony 的动画库，它可以解析 Adobe After Effects 软件通过 Bodymovin 插件导出的 json 格式的动画，并在移动设备上进行本地渲染，使用声明式语法创建和使用，具备并行化能力，适用于应用加载 lottie 动画的场景。

## 效果展示

![lottie Gif](image/lottie.gif)

## 下载安装

```bash
ohpm install @ohos/lottie-turbo
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitcode.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)。

> **版本兼容说明**
>
> 1.0.2-rc.1 版本及以下仅支持 API16 及以上的设备，1.0.2 版本兼容 API12 及以上设备。

## 约束与限制

### 兼容性

在下述版本验证通过：

- DevEco Studio: 5.0.4 Release (5.0.11.100), SDK: API16 (5.0.0.150), ROM: 5.1.0.120。

### 权限要求

无。

## 使用示例

### 简易示例

```ts
import { LottieController, LottieView } from '@ohos/lottie-turbo';

@Entry
@Component
struct Load {
    private controller: LottieController = new LottieController();

    build() {
        Column() {
            LottieView({
                lottieId: "lottie1", //动画id，需要保证唯一性
                loop: true, //是否循环播放，非必须，默认为true
                autoplay: true, //是否自动播放，非必须，默认为true
                autoSkip: true, //不可见时是否自动跳过渲染，非必须，默认为true
                path: $rawfile('common/lottie/grunt.json'), //通过rawfie文件播放
                // path: "https://cdn.lottielab.com/l/7Zgk9iuQxmZ3tD.json", //通过uri播放
                // 通过动画json的字符串播放(string类型)，该属性优先级 > path
                // animationData: '{"v":"5.5.2","fr":60,"ip":0,"op":60,"w":512,"h":512,"ddd":0,"assets":[{"id":"Aa19853e5c3b98a7b8dde147916d26f78","h":114,"w":114,"u":"","p":"https://raw.gitcode.com/openharmony-sig/lottie_turbo/blobs/205ad8b5a8a42e8762fbe4899b8e5e31ce822b8b/startIcon.png","e":1}],"layers":[{"ddd":0,"ty":2,"sr":1,"ks":{"a":{"k":[0,0],"a":0},"p":{"k":[{"t":0,"s":[0,0,0],"i":{"x":[0.75],"y":[0.75]},"o":{"x":[0.25],"y":[0.25]}},{"t":60,"s":[400,400],"i":{"x":[0.75],"y":[0.75]},"o":{"x":[0.25],"y":[0.25]}}],"a":1},"s":{"k":[100,100],"a":0},"r":{"k":0,"a":0},"o":{"k":100,"a":0},"sk":{"k":0,"a":0},"sa":{"k":0,"a":0}},"ao":0,"ip":0,"op":60,"st":0,"bm":0,"ind":0,"refId":"Aa19853e5c3b98a7b8dde147916d26f78"}]}',
                controller: this.controller, //lottie动画控制器
            })
                .width('50%')
                .height(160)
                .backgroundColor(Color.Gray)
                .onClick(() => {
                    this.controller.togglePause(); //控制动画播放暂停
                })
        }
        .height('100%')
            .width('100%')
    }
}
```

### 补充示例

```ts
import { LottieView, LottieController, LottieListener, lottie } from '@ohos/lottie-turbo';

@Entry
@Component
struct Index {
  private controller: LottieController = new LottieController(); //动画控制器
  // 事件监听器
  private listener: LottieListener = new LottieListener({
    onEnterFrame: () => { //开始渲染帧回调
      this.updateAllStates()
    },
    onLoopComplete: () => { //动画循环播放一轮完成时
      console.info("lottie complete");
      this.playCount = this.controller?.playCount;
      this.totalPlayedCount += 1;
    },
    onComplete: () => { //动画播放结束时调用
      this.log += "lottie1 event complete\r\n"
    },
    onDestroy: () => {  //动画删除后回调
      console.info("lottie destroy");
    },
    onDOMLoaded: () => { //动画加载完成，播放之前触发回调
      console.info("lottie DOMLoaded");
    },
    onDataReady: () => { //动画数据初始化完成时调用
      this.log += "lottie1 event data_ready\r\n"
    },
  })

  build() {
  ...
      LottieView({
            loop: true, //是否循环
            autoplay: true, //自动播放
            autoSkip: true, //不可见时是否自动跳过渲染
            lottieId: "lottie1" + this.getUniqueId(), //设置唯一id
            contentMode: 'Contain', //填充模式
            path: $rawfile('common/lottie/animation.json'), //动画路径
            frameRate: 30, //播放帧率,1-120Hz
            controller: this.controller,  //动画控制器
            initialSegment: [30, 150], //初始化动画资源播放时的整体帧范围
            listener: this.listener, //监听事件容器
            useCache: true, //是否使用缓存
            setImageAssetDelegate: [["refid", "uri" ]]//替换图片资源文件，支持Base64\uri\沙箱路径
          })
      Button("全局控制")
        .onClick(() => {
           lottie.play(); //全局播放
           lottie.pause(); //全局暂停
           lottie.stop(); //全局停止
           lottie.destroy(); //全局暂停
           lottie.togglePause();//全局切换暂停/播放
           lottie.setSpeed(1); //设置全局播放速度
           lottie.setDirection(1); //设置全局播放方向  1代表正向 -1代表方向
           lottie.setFrameRate(30);//全局设置播放帧率
           lottie.clearFileCache("");//清除单个文件缓存  不传参数为清除所有文件缓存
           lottie.clearCache();//清除内存缓存
           lottie.resizeCache(10, 10 * 1024 * 1024);//重置内存缓存大小
           lottie.resizeFileCache(10, 1024*1024);//重置文件缓存大小
           lottie.removeCache("path")//通过key删除内存缓存
        })
      Button("单个控制")
        .onClick(() => {
           this.controller.play(); //播放
           this.controller.stop(); //停止
           this.controller.pause(); //暂停
           this.controller.destroy(); //销毁
           this.controller.setSpeed(1); //设置播放速度
           this.controller.goToAndPlay(250,true); //跳转到250帧并播放,false单位为ms
           this.controller.goToAndStop(250,true); //跳转到250帧并停止,false单位为ms
           this.controller.setDirection(1); //设置播放方向  1代表正向 -1代表方向
           this.controller.setSegment(350, 0); //限定动画资源播放时的整体帧范围
           this.controller.setSubframe(true); //设置是否插帧播放，默认为true
           this.controller.playSegments([[5,15],[20,30]],false);//下次播放按照片段设置播放，tru立即生效
           this.controller.changeColor("**", [255, 0, 0, 1]); //按照图层名称，修改RGBA动画颜色
           this.controller.togglePause() //切换暂停/播放
           this.controller.setFrameRate(30) //设置播放帧率
           this.controller1.setContentMode("Contain"); //设置填充模式，支持Fill,Cover,Top,Bottom,Contain,AdaptiveHeight,AdaptiveWidth
           this.controller.reload({
                path: "https://kjstorage.360buyimg.com/cms-file/1_eec97231.zip"
           })
           //添加监听事件
           this.controller.addEventListener('drawFrame', (): void => {
               this.log += "add lottie event " + eventName + "\r\n"
           });
           this.controller.removeEventListener(‘drawFrame’); //移除监听事件
           this.controller.triggerEvent("drawFrame"); //强制触发回调
           //
        })                
   ...      
  }   
  
  // 默认在LottieView组件销毁时自动触发销毁
  aboutToDisappear(): void {
    
  } 
}

```

### 注意事项

- 1.当前默认在页面aboutToDisappear时自动触发destroy进行销毁。
- 2.需要注意lottieId的唯一性，不配置时将自动随机生成。

## 使用说明

前提：数据准备

lottie动画文件是由设计人员使用Adobe After Effects软件通过bodymovin插件导出json格式的文件。

AE软件创建动画时需要设置动画的宽(w)、高(h)、bodymovin插件的版本号(v)、帧率(fr)、开始帧(ip)、结束帧(op)、静态资源信息(assets)
、图层信息(layers)等重要信息。

如果仅是用于demo测试，可以使用[工程示例中的json文件]。

### 1.引入组件：

```ts
import lottie from '@ohos/lottie-turbo'
```

### 2.动画资源导入

#### (1)通过本地文件加载动画

```ts   
LottieView({
      path: $rawfile('common/lottie/animation.json'), //动画路径
    })
```

> 路径资源在工程entry/src/main/resources/rawfile下

#### (2)通过网络资源加载动画

```ts   
LottieView({
      path: "https://cdn.lottielab.com/l/7Zgk9iuQxmZ3tD.json", //网络路径
    })
```

#### (3)通过json字符串加载动画

```ts
LottieView({
  animationData: '{"v":"5.5.2","fr":60,"ip":0,"op":60,"w":512,"h":512,"ddd":0,"assets":[{"id":"Aa19853e5c3b98a7b8dde147916d26f78","h":114,"w":114,"u":"","p":"https://raw.gitcode.com/openharmony-sig/lottie_turbo/blobs/205ad8b5a8a42e8762fbe4899b8e5e31ce822b8b/startIcon.png","e":1}],"layers":[{"ddd":0,"ty":2,"sr":1,"ks":{"a":{"k":[0,0],"a":0},"p":{"k":[{"t":0,"s":[0,0,0],"i":{"x":[0.75],"y":[0.75]},"o":{"x":[0.25],"y":[0.25]}},{"t":60,"s":[400,400],"i":{"x":[0.75],"y":[0.75]},"o":{"x":[0.25],"y":[0.25]}}],"a":1},"s":{"k":[100,100],"a":0},"r":{"k":0,"a":0},"o":{"k":100,"a":0},"sk":{"k":0,"a":0},"sa":{"k":0,"a":0}},"ao":0,"ip":0,"op":60,"st":0,"bm":0,"ind":0,"refId":"Aa19853e5c3b98a7b8dde147916d26f78"}]}',
  // animationData优先级 > path 优先级
})
```

#### (4)通过沙箱路径加载动画

```ts
LottieView({
    path: '/data/storage/el2/base/haps/entry/files/xxxx.json', //沙箱路径
}
```

### 3.LottieView组件设置

LottieView支持常规ArkUI通用设置

```ts
LottieView({
  path: $rawfile('common/lottie/grunt.json'), //通过rawfie文件播放
})
  .width('50%') //设置宽度
  .height(160) //设置高度
  .backgroundColor(Color.Gray) // 设置背景颜色
  // 设置点击事件
  .onClick(() => {
    
  })
```

### 4.LottieView组件使用

> 可参考快速上手中简易示例

### 5.动画播放暂停

```ts
lottie.play() //所有动画播放
lottie.play('animation1') //animation1动画播放
this.controller.play() //this.controller绑定的动画播放

lottie.stop() //所有动画停止
lottie.stop('animation1') //animation1动画停止
this.controller.stop() //this.controller绑定的动画停止

lottie.pause() //所有动画暂停
lottie.pause('animation1') //animation1动画暂停
this.controller.pause() //this.controller绑定的动画暂停

lottie.togglePause() //所有动画切换暂停/播放
lottie.togglePause('animation1') //animation1动画切换暂停/播放
this.controller.togglePause() //this.controller绑定的动画切换暂停/播放
```

### 6.设置播放速度

> 注意：speed>0正向播放, speed<0反向播放, speed=0暂停播放, speed=1.0/-1.0正常速度播放

```ts
lottie.setSpeed(1) //所有动画设置播放速度
lottie.setSpeed(1,'animation1') //animation1动画设置播放速度
this.controller.setSpeed(1) //this.controller绑定的动画设置播放速度
```
### 7.设置播放方向

> 注意：direction 1为正向，-1为反向

```ts
lottie.setDirection(1) //所有动画设置播放方向
lottie.setDirection(1,'animation1') //animation1动画设置播放方向
this.controller.setDirection(1) ///this.controller绑定的动画设置播放方向
```
### 8.销毁动画

> 注意：页面不显示或退出页面时，需要销毁动画

> 默认已在LottieView的aboutToDisappear()中调用了this.controller.destroy

```ts
lottie.destroy() //销毁所有动画
lottie.destroy('animation1') //销毁animation1动画
this.controller.destroy('animation1') //销毁指定name动画
```

### 9.动画跳转

> 注意：根据第二个参数判断按帧还是按毫秒控制，true 按帧控制，false 按时间控制，缺省默认为false

```ts
this.controller.goToAndPlay(250,true) //跳转到250帧并播放
this.controller.goToAndPlay(12000,false) //跳转到5000ms并播放

this.controller.goToAndStop(250,true) //跳转到250帧并停止
this.controller.goToAndStop(5000,false) //跳转到5000ms并停止
```

### 10.动画片段播放

```ts
// 限定动画资源播放时的整体帧范围，即设置动画片段
this.controller.setSegment(5,15);

// 播放动画片段,第二参数值为true立刻生效, 值为false循环下次播放的时候生效
this.controller.playSegments([[5,15],[20,30]],true)

// 重置动画播放片段，使动画从起始帧开始播放完整动画
// 参数值为true立刻生效, 值为false循环下次播放的时候生效
this.controller.resetSegments(true);
```

### 11.动画事件监听

> 可监听事件说明

| 序号 | 事件名称          | 说明              |
|----|---------------|-----------------|
| 1  | enterFrame    | 渲染一帧开始          |
| 2  | drawFrame     | 渲染一帧完成          |
| 3  | loopComplete  | 循环一次            |
| 4  | complete      | 播放完成            |
| 5  | segmentStart  | 片段开始播放          |
| 6  | destroy       | 销毁              |
| 7  | config_ready  | 数据准备            |
| 8  | data_ready    | 数据解析            |
| 9  | DOMLoaded     | 组件添加完成回调        |
| 10 | data_failed   | 数据加载失败，json文件异常 |
| 11 | loaded_images | 图片数据获取完成        |

#### （1）创建 LottieView时设置

```ts

// 设置监听器
private listener: LottieListener = new LottieListener({
  onDrawFrame: () => {
    onsole.info("onDrawFrame");
  }
})

//绑定监听器
LottieView({
  listener: this.listener
})
```

#### （2）动态添加

```ts
// 添加监听
this.controller.addEventListener('loopComplete', (): void => {
                    console.info("loopComplete");
                  })
```

#### （3）动态移除

```ts
// 移除事件监听，可选择设置执行完成后的回调函数
this.controller.removeEventListener('loopComplete', (): void => {
                    //执行移除后，调用此处函数
                    console.info("loopComplete");
                  })
```
#### （4）注意事项

1、DOMLoaded事件

* 采用并行化加载方案后，DOMLoaded事件触发时动画数据的解析未完成，此时对动画的控制会失效。

* 如果动画开始播放之前需要触发事件，可使用loaded_images事件。


### 12.更改动画渲染颜色

> 当前只支持填充图层与形状图层

#### （1）非关键帧

```ts
// 注意：第一个参数代码图层名称，第二个参数是颜色的RGB或者RGBA值
// 颜色取值0-255,透明度取值0-1.0
// 当需要修改所有图层颜色时，可使用 "**."
this.controller.changeColor("**.Layer 1 Outlines.**",[255,150,203])  //修改某一个元素的颜色,不带透明度
this.controller.changeColor("**.Layer 1 Outlines.**",[255,150,203,1.0]) //修改某一个元素的颜色,带透明度
```
#### （2）关键帧，渐变色修改

```ts
// 注意：第一个参数代码图层名称，第二和第三个参数是关键帧的起始和结束RGB或者RGBA值
// 颜色取值0-255,透明度取值0-1.0
// 当需要修改所有图层颜色时，可使用 "**."
this.controller.changeColor("**.Layer 1.**",[255,0,0],[0,0,255])  //修改某一个关键帧的颜色,不带透明度
this.controller.changeColor("**.Layer 1.**",[255,0,0,0],[0,0,255,1]) //修改某一个关键帧的颜色,带透明度
```

### 13.设置资源文件替换

> 针对需要在加载前修改json动画中图片资源的场景，提供接口进行修改

```ts
"assets": [
  {
    "id": "blep",
    "h": 114,
    "w": 114,
    "u": "",
    "p": "data:image/png;",
    "e": 1
  }
]
// 在 lottieView中setImageAssetDelegate参数使用，可替换带有image资源的动画，支持base64、uri和沙箱路径替换
// refId为json动画中"assets"字段下的"id"属性，如上例

LottieView({
  path: $rawfile('common/lottie/data_url.json'),
  setImageAssetDelegate: [
      ["refid", "base64"],
      ["refid", "uri"],
      ["refid", "/data/storage/el2/base/haps/entry/files/xxxx.png"],

  ]
})
```

### 14.加载跨module动画

> 针对多个module，资源调用需要跨包的场景，提供跨module读取资源的能力

（1）加载module

在oh-package.json下dependencies中添加对指定module

（2）LottieView加载

在path属性中设置$rawfile，中括号内为moduleName，该资源文件可被系统索引
```ts
LottieView({
    loop: true,
    autoplay: true,
    path: $rawfile('[entry].robotYoga.json') // 此处entry换成对应的moduleName
})
```

### 15.更改动画

> 针对相同组件需要播放不同动画的场景，提供更改显示动画的接口

* path?: string | Resource
* animationData?: string;
* loop?: boolean | number
* autoplay?: boolean
* initialSegment?: AnimationSegment
* contentMode?: string
* frameRate?: number
* setImageAssetDelegate?: ImageAssetDelegate[];
* resManager?: resmgr.ResourceManager;

其余参数可参考LottieView介绍，新增参数resManager

resManager：资源管理器，可选参数，当与初始动画不在同一个module时使用，使用方式如下：

（1）更改的动画与原本动画在同一个module
```ts
this.controller.reload({
  loop: true,
  autoplay: true,
  path: $rawfile('common/lottie/animation.json')
})
```

（2）更改的动画与原本动画在不同的module

```ts
this.controller.reload({
  loop: true,
  autoplay: true,
  path: $rawfile('[lalhan].robotYoga.json'),
  resManager: (await application.createModuleContext(getContext(this),'lalhan')).resourceManager // 此处entry换成对应的moduleName
})
```

### 16.动画复杂度判断

> lottie动画播放时的功耗和复杂度与绘制指令数量强相关，lottie-turbo提供demo可计算单个动画单帧的绘制指令个数

使用debug模式编译，在RenderInfo页面中切换动画，手动点击单帧渲染，可在 log日志中使用RenderInfo关键词进行检索，可得到以下信息：

本工程默认为release模式，如果需要调整为debug，需要在library/build-profile.json5路径下将"arguments": "-DCMAKE_BUILD_TYPE=Release"注释

```c
Lottie RenderInfo::Number of Render Path:75         // 路径绘制
Lottie RenderInfo::Number of Render Text:0          // 字符文本绘制
Lottie RenderInfo::Number of Render Image:0         // 图片绘制
Lottie RenderInfo::Number of Render SaveLayer:1     // 图层保存
Lottie RenderInfo::Number of Render Mask:0          // 蒙版绘制
Lottie RenderInfo::Number of Render StrokeEff:0     // 描边绘制
Lottie RenderInfo::Number of Render TritoneEff:0    // 三色调绘制
Lottie RenderInfo::Number of Render TintEff:0       // 色调绘制
Lottie RenderInfo::Number of Render FillEff:0       // 填充绘制
Lottie RenderInfo::Number of Render BlurEff:0       // 模糊绘制
```

注意：BlurEff指令为高斯模糊，对性能影响极大，对效果影响不大，可参考对应效果进行优化。


### 17.离屏渲染为图像数据

> lottie-turbo提供离屏渲染接口将lottie动画渲染为图像数据，可查看Page RenderToImage

lottie离屏渲染为bitmap, 返回值为ArrayBuffer，包括以下参数：

* lottie：要渲染的lottie动画，支持Rawfile\Url\Stirng
* frameNum：帧号，支持小数
* width：宽度
* height：高度
* resManager?：当使用Rawfile时设置ResourceManager

#### （1）Rawfile类型

使用资源路径时，resManager属性必须设置，entry设置为资源所在的moduleName，使用如下：

```ts
lottie.renderToImage($rawfile('common/lottie/float Test.json'), 1, 200, 200,
    (await application.createModuleContext(getContext(this), 'entry')).resourceManager)
```

#### （2）url类型

```ts
lottie.renderToImage('https://cdn.lottielab.com/l/7Zgk9iuQxmZ3tD.json', 1, 300, 300)
```

#### （3）String类型

```ts
lottie.renderToImage('{"v":"5.5.2","fr":60,"ip":0,"op":60,"w":512,"h":512,"ddd":0,"assets":[{"id":"Aa19853e5c3b98a7b8dde147916d26f78","h":114,"w":114,"u":"","p":"https://raw.gitcode.com/openharmony-sig/lottie_turbo/blobs/205ad8b5a8a42e8762fbe4899b8e5e31ce822b8b/startIcon.png","e":1}],"layers":[{"ddd":0,"ty":2,"sr":1,"ks":{"a":{"k":[0,0],"a":0},"p":{"k":[{"t":0,"s":[0,0,0],"i":{"x":[0.75],"y":[0.75]},"o":{"x":[0.25],"y":[0.25]}},{"t":60,"s":[400,400],"i":{"x":[0.75],"y":[0.75]},"o":{"x":[0.25],"y":[0.25]}}],"a":1},"s":{"k":[100,100],"a":0},"r":{"k":0,"a":0},"o":{"k":100,"a":0},"sk":{"k":0,"a":0},"sa":{"k":0,"a":0}},"ao":0,"ip":0,"op":60,"st":0,"bm":0,"ind":0,"refId":"Aa19853e5c3b98a7b8dde147916d26f78"}]}',
    1, 300, 300)
```

### 18.useImageCache图像缓存说明

该属性仅适用于展示动画面积小，数量多的场景（1vp 约等于 3.5px）

以100px x 100px 共 180帧的图片为例，一个动画需要消耗100x100x4x180=7,200,000B≈7MB

即100vp*100vp的图会占350x350x4x180≈84MB内存,具体展示可查看demo:UseImageCache.ets

### 19.上树与动画解析分离

使用lottie.createLottieNode接口支持将上树与加载动画分离，可实现预渲染，注意事项：
* 1、需要主动调用controller.destroy，否则会内存泄露；
* 2、autoSkip功能失效，无法在不可见时停止渲染，如果需要该能力则需要自行实现；
* 3、若使用rawfile目录下的文件，resManager为必填属性；

```ts
struct Load {
  private rootSlot = new NodeContent();
  private controller: LottieController = new LottieController();
  @State isShow: boolean = false;
  
  aboutToAppear(): void {
    lottie.createLottieNode({
      loop: true,
      autoplay: true,
      path: $rawfile('common/lottie/grunt.json'),
      contentMode: 'Contain',
      controller: this.controller,
      resManager: this.getUIContext().getHostContext()?.resourceManager
      //如果动画在相同的module，resManager: this.getUIContext().getHostContext()?.resourceManager
      //如果动画在不同的module，resManager: (await application.createModuleContext(getContext(this),'lalhan')).resourceManager
    },this.rootSlot)
  }

  aboutToDisappear(): void {
    //一定要记得销毁！！！
    this.controller?.destroy()
  }

  build() {
    Column() {
      Column() {
        if (this.isShow) {
          ContentSlot(this.rootSlot)
        } else {
          Text("null")
        }
      }.width(200)
      .height(200)

      Button("load")
        .width("35%")
        .onClick(() => {
          this.isShow = !this.isShow;
        })
    }
    .height('100%')
    .width('100%')
  }
}
```

### 20.设置图层属性

> 当前只支持动态设置文本图层的文字和颜色

```ts
export interface LayerProperties {
  // 文本图层属性
  textLayerProperties?: TextLayerProperties[];
}

export interface TextLayerProperties {
  // 文本内容
  text?: string;
  // 填充颜色
  fillColor?: TextColorConfig;
  // 填充透明度, 范围[0 - 100]
  fillOpacity?: number;
  // 描边颜色
  strokeColor?: TextColorConfig;
  // 描边透明度, 范围[0 - 100]
  strokeOpacity?: number;
}

export interface TextColorConfig {
  // 红色分量, 范围[0 - 1]
  r: number;
  // 绿色分量, 范围[0 - 1]
  g: number;
  // 蓝色分量, 范围[0 - 1]
  b: number;
}
```

#### （1）非关键帧

```ts
// 注意：第一个参数代表图层名称，第二个参数是动态设置的图形属性，目前有文本图层的文字、颜色和透明度
// 颜色取值0-1,透明度取值0-100
// 返回值：0-成功, 1-参数错误, 2-动画未加载, 3-属性解析失败, 4-图层未找到

// 修改文本图层的文字
let properties: LayerProperties = { textLayerProperties: [{ text: 'New Text' }] };
let result: number = this.controller.setLayerProperties("LayerName", properties);

// 修改文本图层文字的填充颜色（不带透明度）
let fillColor: TextColorConfig = { r: 0.38, g: 0.59, b: 0.0 };
let properties: LayerProperties = { textLayerProperties: [{ fillColor: fillColor }] };
let result: number = this.controller.setLayerProperties("LayerName", properties);

// 修改文本图层文字的填充颜色（带透明度）
let fillColor: TextColorConfig = { r: 0.38, g: 0.59, b: 0.0 };
let properties: LayerProperties = { textLayerProperties: [{ fillColor: fillColor, fillOpacity: 50 }] };
let result: number = this.controller.setLayerProperties("LayerName", properties);

// 修改文本图层的文字、文字的填充颜色（带透明度）、文字的描边颜色（带透明度）
let fillColor: TextColorConfig = { r: 0.38, g: 0.59, b: 0.0 };
let strokeColor: TextColorConfig = { r: 0.93, g: 0.17, b: 0.55 };
let properties: LayerProperties = {
textLayerProperties: [{
	  text: 'New Text',
	  fillColor: fillColor,
	  fillOpacity: 100,
	  strokeColor: strokeColor,
	  strokeOpacity: 80
  }]
};
let result: number = this.controller.setLayerProperties("LayerName", properties);
```

#### （2）关键帧

```ts
// 注意：第一个参数代表图层名称，第二个参数是动态设置的图形属性，图层属性里目前只有文本图层属性，文本图层属性是数组，每个元素是包含一个关键帧可以动态设置的属性，目前只有文本图层的文字、颜色和透明度
// 颜色取值0-1,透明度取值0-100
// 返回值：0-成功, 1-参数错误, 2-动画未加载, 3-属性解析失败, 4-图层未找到

// 修改文本图层第一个关键帧的文字，第三个关键帧的文字和填充颜色（不带透明度）
let frame1: TextLayerProperties = { text: 'Frame 1' };
let frame3: TextLayerProperties = { text: 'Frame 3', fillColor: { r: 1.0, g: 0.0, b: 0.0 } };
let properties: LayerProperties = { textLayerProperties: [frame1, {}, frame3] };
let result: number = this.controller.setLayerProperties("LayerName", properties);

// 修改文本图层第一个关键帧的文字，第三个关键帧的文字和填充颜色（带透明度）
let frame1: TextLayerProperties = { text: 'Frame 1' };
let frame3: TextLayerProperties = { text: 'Frame 3', fillColor: { r: 1.0, g: 0.0, b: 0.0 }, fillOpacity: 100 };
let properties: LayerProperties = { textLayerProperties: [frame1, {}, frame3] };
let result: number = this.controller.setLayerProperties("LayerName", properties);
```

### 21.支持解码GIF取首帧静态图

> 在加载前修改json动画中图片资源，可以将图片替换成GIF格式文件

```ts
LottieView({
    path: $rawfile('common/lottie/animation.json'),
    renderMode: "Texture" // 设置为Texture渲染模式
})
```

### 22.RenderMode渲染模式

> lottie-turbo支持两种渲染模式，通过renderMode参数设置

#### （1）Surface模式（默认）

使用XComponent的Surface渲染方式，为默认渲染模式。当未设置renderMode参数或参数值不为"Texture"时，自动使用Surface模式渲染。

**特点：**
- 渲染内容在独立的图层上显示

#### （2）Texture模式

使用XComponent的Texture渲染方式。

**特点：**
- 渲染内容作为纹理与其他UI元素在同一图层渲染

**注意：** Texture模式仅在API版本 ≥ 18且renderMode参数设置为"Texture"时生效，否则将自动降级为Surface模式。

```ts
LottieView({
    path: $rawfile('common/lottie/animation.json'),
    renderMode: "Texture" // 设置为Texture渲染模式
})
```

### 23.动画填充模式支持AdaptiveWidth和AdaptiveHeight

> LottieView支持常规ArkUI通用设置

```ts
LottieView({
  lottieId: "lottie1", // 动画id，需要保证唯一性
  contentMode: 'AdaptiveWidth', // 根据组件高度和动画比例自适应宽度
  path: $rawfile('common/lottie/grunt.json'), // 通过rawfile文件播放
})
  .height('40%') // 设置高度
  .backgroundColor(Color.Gray) // 设置背景颜色
  // 设置点击事件
  .onClick(() => {
  })
```

```ts
LottieView({
  lottieId: "lottie2", // 动画id，需要保证唯一性
  contentMode: 'AdaptiveHeight', // 根据组件宽度和动画比例自适应高度
  path: $rawfile('common/lottie/grunt.json'), // 通过rawfile文件播放
})
  .width('50%') // 设置宽度
  .backgroundColor(Color.Gray) // 设置背景颜色
  // 设置点击事件
  .onClick(() => {
  })
```

## 接口说明

### 组件

| 名称 | 描述 | 类型 | 必填 | OpenHarmony 平台支持 |
|-----|-----|------|------|-----------------|
| LottieView | Lottie 动画视图组件 | struct | 是 | 是 |

### 属性

| 名称                    | 描述                                    | 类型                      | 必填 | OpenHarmony 平台支持 |
|-----------------------|---------------------------------------|-------------------------|----|------------------|
| lottieId              | 应用内的唯一 ID                             | string                  | 否  | 是                |
| path                  | 动画数据文件路径，支持 json 文件和 zip 文件           | string \| Resource      | 否  | 是                |
| animationData         | json 格式的动画数据，优先级高于 path               | string                  | 否  | 是                |
| loop                  | 是否循环播放 / 循环次数                         | boolean \| number       | 否  | 是                |
| autoplay              | 是否自动播放                                | boolean                 | 否  | 是                |
| autoSkip              | 动画不可见时是否跳过绘制，默认为 true                 | boolean                 | 否  | 是                |
| initialSegment        | 初始化动画资源播放时的整体帧范围                      | [number, number]        | 否  | 是                |
| contentMode           | 动画填充模式                                | string                  | 否  | 是                |
| renderMode            | 动画渲染模式                                | string                  | 否  | 是                |
| frameRate             | 设置刷帧率，范围 1~120                        | number                  | 否  | 是                |
| useCache              | 是否使用缓存，默认为 true                       | boolean                 | 否  | 是                |
| useImageCache         | 是否使用图像缓存，仅适用于显示面积小的动画                 | boolean                 | 否  | 是                |
| controller            | 动画控制器                                 | LottieController        | 否  | 是                |
| listener              | 事件监听器                                 | LottieListener          | 否  | 是                |
| setImageAssetDelegate | 资源替换功能，格式为 [图片资源 ID, Base64/URI/沙箱路径] | Array<[string, string]> | 否  | 是                |
| imagePath             | 资源目录路径                                | string                  | 否  | 是                |
| radius                | 边框圆角                                  | number                  | 否  | 是                |
| bgColor               | 背景颜色，默认为 0                            | number                  | 否  | 是                |

### API

#### LottieController 方法

| 名称 | 描述 | 类型 | 参数 | 返回值 | 必填 | OpenHarmony 平台支持 |
|-----|-----|------|------|--------|------|-----------------|
| play | 播放动画 | 方法 | 无 | void | 否 | 是 |
| pause | 暂停动画 | 方法 | 无 | void | 否 | 是 |
| stop | 停止动画 | 方法 | 无 | void | 否 | 是 |
| togglePause | 切换暂停/播放状态 | 方法 | 无 | void | 否 | 是 |
| destroy | 销毁动画 | 方法 | 无 | void | 否 | 是 |
| goToAndPlay | 跳转到指定帧或时刻并播放 | 方法 | value: number, isFrame?: boolean | void | 否 | 是 |
| goToAndStop | 跳转到指定帧或时刻并停止 | 方法 | value: number, isFrame?: boolean | void | 否 | 是 |
| setSegment | 设置动画片段 | 方法 | init: number, end: number | void | 否 | 是 |
| playSegments | 播放指定片段 | 方法 | segments: AnimationSegment \| AnimationSegment[], forceFlag?: boolean | void | 否 | 是 |
| resetSegments | 重置动画片段 | 方法 | forceFlag: boolean | void | 否 | 是 |
| setSpeed | 设置播放速度 | 方法 | speed: number | void | 否 | 是 |
| setDirection | 设置播放方向 | 方法 | direction: number | void | 否 | 是 |
| setSubframe | 设置是否插帧播放 | 方法 | useSubFrames: boolean | boolean | 否 | 是 |
| getDuration | 获取动画时长 | 方法 | inFrames?: boolean | number | 否 | 是 |
| triggerEvent | 强制触发指定事件 | 方法 | name: string | void | 否 | 是 |
| addEventListener | 添加事件监听器 | 方法 | name: string, callback: Function | void | 否 | 是 |
| removeEventListener | 移除事件监听器 | 方法 | name: string, callback?: Function | void | 否 | 是 |
| changeColor | 更改动画颜色 | 方法 | layer: string, startColor: number[], endColor?: number[] | void | 否 | 是 |
| setContentMode | 设置填充模式 | 方法 | contentMode: string | void | 否 | 是 |
| setFrameRate | 设置动画帧率 | 方法 | frameRate: number | void | 否 | 是 |
| reload | 重载动画 | 方法 | config: ConfigType | void | 否 | 是 |
| setLayerProperties | 设置图层属性 | 方法 | layerName: string, properties: LayerProperties | number | 否 | 是 |

#### LottieController 属性

| 名称 | 描述 | 类型 | 必填 | OpenHarmony 平台支持 |
|-----|-----|------|------|-----------------|
| lottieId | 唯一 ID | string | 是 | 是 |
| isLoaded | 是否加载 | boolean | 否 | 是 |
| currentFrame | 当前帧号，默认为浮点数 | number | 否 | 是 |
| currentRawFrame | 当前帧数，浮点数 | number | 否 | 是 |
| firstFrame | 当前播放片段的第一帧帧号 | number | 否 | 是 |
| totalFrames | 当前播放片段的总帧数 | number | 否 | 是 |
| frameRate | 帧率 frame/s | number | 否 | 是 |
| frameMult | 帧率 frame/ms | number | 否 | 是 |
| playSpeed | 播放速度 | number | 否 | 是 |
| playDirection | 播放方向 | number | 否 | 是 |
| playCount | 动画完成播放的次数 | number | 否 | 是 |
| isPaused | 是否已暂停 | boolean | 否 | 是 |
| autoplay | 是否自动播放 | boolean | 否 | 是 |
| loop | 是否自动循环 | boolean \| number | 否 | 是 |
| timeCompleted | 当前动画片段完成单次播放的帧数 | number | 否 | 是 |
| segmentPos | 当前动画片段序号 | number | 否 | 是 |
| isSubframeEnabled | 是否尽可能更新动画帧率 | boolean | 否 | 是 |
| segments | 当前动画播放片段 | AnimationSegment \| AnimationSegment[] | 否 | 是 |

#### 全局 lottie 方法

| 名称 | 描述 | 类型 | 参数 | 返回值 | 必填 | OpenHarmony 平台支持 |
|-----|-----|------|------|--------|------|-----------------|
| play | 播放动画 | 方法 | lottieId?:?: string | void | 否 | 是 |
| pause | 暂停动画 | 方法 | lottieId?:?: string | void | 否 | 是 |
| stop | 停止动画 | 方法 | lottieId?:?: string | void | 否 | 是 |
| togglePause | 切换暂停/播放状态 | 方法 | lottieId?:?: string | void | 否 | 是 |
| destroy | 销毁动画 | 方法 | lottieId?:?: string | void | 否 | 是 |
| setSpeed | 设置播放速度 | 方法 | speed: number, lottieId?:?: string | void | 否 | 是 |
| setDirection | 设置播放方向 | 方法 | direction: 1 \| -1, lottieId?:?: string | void | 否 | 是 |
| setFrameRate | 设置播放帧率 | 方法 | frameRate: number | void | 否 | 是 |
| clearFileCache | 清除文件缓存 | 方法 | url?: string | void | 否 | 是 |
| resizeCache | 设置内存缓存容器大小 | 方法 | size: number, capacity: number | void | 否 | 是 |
| resizeFileCache | 设置文件缓存容器大小 | 方法 | size: number, capacity: number | void | 否 | 是 |
| clearCache | 清空缓存容器 | 方法 | 无 | void | 否 | 是 |
| removeCache | 通过缓存键移除缓存 | 方法 | path: string | void | 否 | 是 |
| renderToImage | 将动画的某帧离屏渲染为图像数据 | 方法 | lottie: string \| Resource, frameNum: number, width: number, height: number, resManager?: ResourceManager | ArrayBuffer | 否 | 是 |
| createLottieNode | 绑定 ContentSlot 和 LottieController | 方法 | config: AnimationConfig, content: Object | void | 否 | 是 |


## 与LottieArkts特性对比

### 更换说明

> LottieArkts的使用流程是先创建canvas,再手动调用播放，Lottie-turbo使用LottieView组件可直接实现加载播放

![](image/image.png)

> 最小替换部分可参考上图

### 配置对比


### 方法对比

| 接口                                | 描述                                                        | **lottieArkTS** | lottieC                                                  |
|-----------------------------------|-----------------------------------------------------------|-----------------|----------------------------------------------------------|
| play()                            | 播放                                                        | 是               | 是                                                        |
| stop()                            | 停止                                                        | 是               | 是                                                        |
| pause()                           | 暂停                                                        | 是               | 是                                                        |
| togglePause()                     | 切换暂停                                                      | 是               | 是                                                        |
| destroy()                         | 销毁动画                                                      | 是               | 是                                                        |
| goToAndStop()                     | 跳到某一时刻并停止                                                 | 是               | 是                                                        |
| goToAndPlay()                     | 跳到某一时刻并播放                                                 | 是               | 是                                                        |
| setSegment()                      | 设置动画片段                                                    | 是               | 是                                                        |
| playSegments()                    | 播放指定片段                                                    | 是               | 是                                                        |
| resetSegments()                   | 重置动画                                                      | 是               | 是                                                        |
| setSpeed()                        | 设置播放速度                                                    | 是               | 是                                                        |
| setDirection()                    | 设置播放方向                                                    | 是               | 是                                                        |
| getDuration()                     | 获取动画时长                                                    | 是               | 是                                                        |
| addEventListener()                | 添加监听状态                                                    | 是               | 是                                                        |
| removeEventListener()             | 移除监听状态                                                    | 是               | 是                                                        |
| changeColor()                     | 更改动画颜色                                                    | 是               | 否 (layer?: string, Color: number[]) layer表示图层，Color 代表颜色 |
| setContentMode()                  | 设置填充模式                                                    | 是               | 是                                                        |
| setFrameRate()                    | 设置动画刷帧率                                                   | 是               | 是                                                        |
| cacheFileClear()                  | 清除文件缓存                                                    | 是               | 是                                                        |
| bindContext2dToCoordinator()      | 跟踪 lottie动画, CanvasRenderingContext2D, Canvas 三者之间的动态关联关系 | 是               | 废弃                                                       |
| unbindContext2dFromCoordinator()  | 解除追踪关系                                                    | 是               | 废弃                                                       |
| setAttachedCanvasHasVisibleArea() | 支持强制修正context2d所关联的canvas节点状态                             | 是               | 废弃                                                       |

### 属性对比

| 属性                | 描述                        | lottieArkts | lottieC     |
|-------------------|---------------------------|-------------|-------------|
| animationID       | 动画名称                      | 是           | 否  lottieId |
| isLoaded          | 动画是否已加载                   | 是           | 是           |
| currentFrame      | 当前帧                       | 是           | 是           |
| currentRawFrame   | 当前帧数（浮点）                  | 是           | 是           |
| firstFrame        | 第一帧索引                     | 是           | 是           |
| totalFrames       | 总帧数                       | 是           | 是           |
| frameRate         | 帧率 frame/s                | 是           | 是           |
| frameMult         | 帧率 frame/ms               | 是           | 是           |
| playSpeed         | 播放速度                      | 是           | 是           |
| playDirection     | 播放方向                      | 是           | 是           |
| playCount         | 完成播放的次数                   | 是           | 是           |
| isPaused          | 是否暂停                      | 是           | 是           |
| isNetLoad         | 是否网络加载                    | 是           | 废弃          |
| autoplay          | 自动播放                      | 是           | 是           |
| loop              | 是否循环                      | 是           | 是           |
| timeCompleted     | 当前动画片段完成单次播放的帧数           | 是           | 是           |
| segmentPos        | 当前动画片段序号                  | 是           | 是           |
| isSubframeEnabled | 是否尽可能更新动画帧率               | 是           | 是           |
| segments          | 当前动画播放片段                  | 是           | 是           |
| packageName       | 包名                        | 废弃          | 废弃          |
| autoSkip          | 当动画不可见时，是否跳过绘制：设为true则跳过绘 | 是           | 是           |
| uri               | 网络资源加载路径                  | 是           | 否 （合并到path） |
| initialSegment    | 初始化动画资源播放时的整体帧范围          | 是           | 是           |
| animationData     | json格式的动画数据               | 是           | 是           |
| contentMode       | 动画填充模式。<br>Fill：拉伸动画以填充整个容器，不保持宽高比<br>Cover：保持动画的宽高比，将动画缩放到覆盖整个容器，可能会裁剪动画<br>Top：保持动画的宽高比，将动画顶部对齐容器顶部<br>Bottom：保持动画的宽高比，将动画底部对齐容器底部<br>Contain：保持动画的宽高比，将动画缩放到适合容器的最大尺寸(默认)<br>AdaptiveHeight：保持动画的宽高比，根据组件宽度和动画比例自适应组件高度<br>AdaptiveWidth：保持动画的宽高比，根据组件高度和动画比例自适应组件宽度                    | 是           | 是           |

## 关于混淆

代码混淆，请查看[代码混淆简介](https://docs.openharmony.cn/pages/v6.0/zh-cn/application-dev/arkts-utils/source-obfuscation-overview.md)。

如果希望在代码混淆过程中不被混淆，需要在混淆规则配置文件 obfuscation-rules.txt 中添加相应的排除规则：

```
-keep
./oh_modules/@ohos/lottie-turbo
```

## 遗留问题

- 不支持含有表达式的动画

## 目录结构

````
/lottie_turbo              # 项目根目录
├── entry                 # 示例代码
├── library               # lottie-turbo 库
│   └─ src/main
│       └─ cpp           # C++ 代码
│       └─ ets           # ETS 代码
│   └─ index.d.ts        # 类型声明
├── README.md             # 英文文档
├── README_zh.md          # 中文文档                  
````

## 贡献代码

使用过程中发现任何问题都可以提交 [Issue](https://gitcode.com/openharmony-sig/lottie_turbo/issues)，当然，也非常欢迎提交 [PR](https://gitcode.com/openharmony-sig/lottie_turbo/pulls) 。

## 开源协议

本项目遵循 [Apache-2.0 License](https://gitee.com/openharmony-tpc-incubate/lottie-c/blob/master/LICENSE)。
