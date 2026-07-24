在项目的EntryAbility.ets文件中导入预加载实现类[PrefetchWrapper](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-prefetch-implementation-class#section1192871813236)，并在onCreate中调用PrefetchWrapper的doInstallPrefetch方法。方法内部会调用[getPrefetchResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cloudfoundation-cloudresprefetch#zh-cn_topic_0000002167124658_zh-cn_topic_0000002131904084_section181501852703)获取安装预加载缓存数据。

说明

* 安装预加载缓存数据，仅允许调用一次，被调用后将被销毁。
* 应用安装开始时，系统会拉取安装预加载云侧数据并缓存到本地。

收起

自动换行

深色代码主题

复制

```
1. import { GlobalContext } from '../common/GlobalContext';
2. import { PrefetchWrapper } from '../prefetchUtil/PrefetchWrapper';

4. onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
5. GlobalContext.initContext(this.context); // 初始化全局上下文
6. PrefetchWrapper.getInstance().doInstallPrefetch();
7. }
```

说明

调用安装预加载过程中，可参考[FAQ](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-faq-prefetch)定位预加载问题。