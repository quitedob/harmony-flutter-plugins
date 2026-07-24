未配置网络权限将出现如下异常日志：

收起

自动换行

深色代码主题

复制

```
1. ohos.permission.INTERNET check failed
```

请开发者在“src/main/module.json5”的requestPermissions层级中添加网络权限。

收起

自动换行

深色代码主题

复制

```
1. {
2. "module": {
3. // ...
4. "requestPermissions": [
5. {
6. "name": "ohos.permission.INTERNET"
7. }
8. ]
9. }
10. }
```