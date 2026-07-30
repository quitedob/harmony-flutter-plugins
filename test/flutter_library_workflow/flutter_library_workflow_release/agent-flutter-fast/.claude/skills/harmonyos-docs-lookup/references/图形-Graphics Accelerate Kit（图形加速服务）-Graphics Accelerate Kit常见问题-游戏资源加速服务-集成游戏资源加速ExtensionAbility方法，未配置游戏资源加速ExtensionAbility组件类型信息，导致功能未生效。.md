未配置游戏资源加速ExtensionAbility组件类型信息将出现如下异常日志：

收起

自动换行

深色代码主题

复制

```
1. bundle[xxx] do not have Asset Acceleration Extension Ability.
```

请开发者在“src/main/module.json5”的extensionAbilities层级中添加资源加速ExtensionAbility信息。

收起

自动换行

深色代码主题

复制

```
1. "extensionAbilities": [
2. {
3. "name": "AssetAccelExtAbility", // 游戏资源加速ExtensionAbility组件的名称。
4. "srcEntry": "./ets/extensionability/AssetAccelExtAbility.ets", // 游戏资源加速ExtensionAbility组件所对应的代码路径。
5. "type": "assetAcceleration"
6. }
7. ]
```