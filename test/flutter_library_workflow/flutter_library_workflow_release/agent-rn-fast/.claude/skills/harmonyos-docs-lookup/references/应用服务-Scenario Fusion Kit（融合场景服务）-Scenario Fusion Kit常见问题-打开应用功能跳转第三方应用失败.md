**现象描述**

日志报错示例：

收起

自动换行

深色代码主题

复制

```
1. startAbility failed, code is 16000018, message is The application is not allow jumping to other applications when api version is above 11.
```

**解决措施**

需要执行命令手动开启限制开关。

收起

自动换行

深色代码主题

复制

```
1. hdc shell param set persist.sys.abilityms.support.start_other_app true
```