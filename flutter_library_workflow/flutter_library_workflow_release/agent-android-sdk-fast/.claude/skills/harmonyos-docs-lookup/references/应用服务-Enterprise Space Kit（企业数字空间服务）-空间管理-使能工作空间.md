## 场景介绍

Enterprise Space Kit为应用提供使能双空间的能力。需要先使能工作空间才可以创建个人空间。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section85743218296)。

展开

| 接口名 | 描述 |
| --- | --- |
| [enableWorkspace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section85743218296)(enable: boolean): Promise<void> | 使能工作空间。使用Promise异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用[enableWorkspace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section85743218296)接口，使能工作空间，并且查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const enable: boolean = true;
   2. try {
   3. await spaceManager.enableWorkspace(enable);
   4. console.info('Succeeded in enabling workspace');
   5. } catch (err) {
   6. console.error(`Failed to enable workspace. Code: ${err.code}, message: ${err.message}`);
   7. }
   ```