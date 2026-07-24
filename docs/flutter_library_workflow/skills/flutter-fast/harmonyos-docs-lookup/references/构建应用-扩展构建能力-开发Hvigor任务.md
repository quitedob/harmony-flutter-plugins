## 了解任务

任务是Hvigor构建过程中的基本执行单元，通常包含一段可执行代码；一个任务可以依赖其他多个任务。Hvigor任务调度执行时通过解析依赖关系确定任务执行时序。

UP-TO-DATE

任务标识，表示任务未实际执行。Hvigor任务增量跳过机制，在二次执行任务时检测任务输入输出条件未发生变化，则任务跳过执行提高构建效率。

示例：

收起

自动换行

深色代码主题

复制

```
1. > hvigor UP-TO-DATE ::PackageApp...
```

Finished

任务执行完成标识，表示任务已执行完成。

示例：

收起

自动换行

深色代码主题

复制

```
1. > hvigor Finished ::PackageApp... after 310 ms
```

## 注册任务

使用HvigorNode节点对象注册任务。

1. 编辑工程下hvigorfile.ts文件。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 导入模块
   2. import { getNode, HvigorNode, HvigorTask } from '@ohos/hvigor';
   ```
2. 编写任务代码。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 获取当前hvigorNode节点对象
   2. const node: HvigorNode = getNode(__filename);

   4. // 注册Task
   5. node.registerTask({
   6. name: 'customTask',
   7. run() {
   8. console.log('this is Task');
   9. }
   10. });
   ```
3. 执行任务。

   使用hvigor命令行工具执行任务：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. hvigorw customTask
   ```
4. 查看任务执行结果。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ad/v3/oSmATBaWRA2ZFicDyOHhgg/zh-cn_image_0000002501070050.png?HW-CC-KV=V1&HW-CC-Date=20260414T055036Z&HW-CC-Expire=86400&HW-CC-Sign=D5DEAB1EC060445F632978F85299FBC5BF4ABD6821F6CA574455AD4F1BF99357 "点击放大")