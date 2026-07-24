## 申请权限

应用在使用Remote Communication Kit能力前，需要检查是否已经获取对应权限。如未获得授权，需要声明对应权限。

除取消网络请求、关闭会话外，其余请求都需要权限。Remote Communication Kit所需权限有：

* ohos.permission.INTERNET：用于应用访问互联网。
* ohos.permission.GET\_NETWORK\_INFO：用于获取设备网络信息。

必须手动配置上述权限后才能使用，详细配置参见[申请权限步骤](/consumer/cn/doc/harmonyos-guides/remote-communication-preparations#section178884218124)。

### 申请权限步骤

需要在entry/src/main路径下的module.json5中配置所需申请的权限。示例代码如下所示：

收起

自动换行

深色代码主题

复制

```
1. {
2. "module": {
3. "requestPermissions": [
4. {
5. "name": "ohos.permission.INTERNET"
6. },
7. {
8. "name": "ohos.permission.GET_NETWORK_INFO" // 如果使用PathPreference的'cellular'模式，则需要额外申请此权限
9. }
10. ]
11. }
12. }
```

## C API开发准备

除上述权限配置外，C API使用时还需要在CMakeLists.txt中设置动态库路径及头文件路径，并进行链接。

如编译target为entry，则添加如下命令：

收起

自动换行

深色代码主题

复制

```
1. target_include_directories(entry PUBLIC ${HMOS_SDK_NATIVE}/sysroot/usr/include)
2. target_link_directories(entry PUBLIC ${HMOS_SDK_NATIVE}/sysroot/usr/lib/aarch64-linux-ohos)
3. target_link_libraries(entry PUBLIC librcp_c.so) # 链接librcp_c.so及其他依赖的so
```