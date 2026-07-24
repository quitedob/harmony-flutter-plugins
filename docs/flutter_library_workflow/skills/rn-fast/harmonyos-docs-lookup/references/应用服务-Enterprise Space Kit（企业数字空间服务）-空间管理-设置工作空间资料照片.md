## 场景介绍

Enterprise Space Kit为应用提供设置工作空间资料照片的能力。所有工作空间都可以设置资料照片。

## 接口说明

详细接口说明可参考[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section6531192033412)。

展开

| 接口名 | 描述 |
| --- | --- |
| [setWorkspaceProfilePhoto](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section6531192033412)(workspaceId: number, photo: string): Promise<void> | 设置工作空间资料照片。使用Promise异步回调。 |

## 开发步骤

1. 导入Enterprise Space Kit模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { spaceManager } from '@kit.EnterpriseSpaceKit';
   ```
2. 调用[setWorkspaceProfilePhoto](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/enterprisespace-spacemanager#section6531192033412)接口，设置工作空间资料照片，并且查看打印信息。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const workspaceId: number = 100;
   2. const photo: string = '{"type":0,"defaultImg":"data:image/png;base64,iVBO******Jggg==}';
   3. try {
   4. await spaceManager.setWorkspaceProfilePhoto(workspaceId, photo);
   5. console.info('Succeeded in setting workspace profile photo');
   6. } catch (err) {
   7. console.error(`Failed to set workspace profile photo. Code: ${err.code}, message: ${err.message}`);
   8. }
   ```