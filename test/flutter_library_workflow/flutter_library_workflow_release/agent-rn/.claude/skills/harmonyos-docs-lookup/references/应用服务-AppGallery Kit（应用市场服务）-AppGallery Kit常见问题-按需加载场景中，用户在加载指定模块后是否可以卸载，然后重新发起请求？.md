可以卸载指定模块后重新调用[fetchModules](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/store-moduleinstallmanager#section1375123411137)接口发起按需加载请求。

使用hdc指令卸载指定应用的指定模块后重新发起请求，卸载命令请参考：hdc shell bm uninstall -n com.xxxx.instantdownloaddemo -m modulelibName。