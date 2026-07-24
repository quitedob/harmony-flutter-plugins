在项目的EntryAbility.ets文件中导入预加载实现类[PrefetchWrapper](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-prefetch-implementation-class#section1192871813236)，并在onCreate中调用PrefetchWrapper的doPrefetch方法。在应用安装后首次打开时调用安装预加载，非首次打开时调用周期性预加载。

收起

自动换行

深色代码主题

复制

```
1. import { GlobalContext } from '../common/GlobalContext';
2. import { PrefetchWrapper } from '../prefetchUtil/PrefetchWrapper';

4. onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
5. GlobalContext.initContext(this.context);  // 初始化全局上下文
6. PrefetchWrapper.getInstance().doPrefetch();
7. }
```