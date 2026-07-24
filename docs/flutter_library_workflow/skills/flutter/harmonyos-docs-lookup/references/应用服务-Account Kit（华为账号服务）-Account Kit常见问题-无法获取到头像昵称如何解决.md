1. 确认获取authorizationCode时，调用[AuthorizationWithHuaweiIDRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section12940173017165)接口是否传入正确的scope：'profile'。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { authentication } from '@kit.AccountKit';

   3. // 创建授权请求，并设置参数
   4. const authRequest = new authentication.HuaweiIDProvider().createAuthorizationWithHuaweiIDRequest();
   5. // 获取头像昵称需要传如下scope
   6. authRequest.scopes = ['profile'];
   7. // 若开发者需要进行服务端开发，则需传如下permission获取authorizationCode
   8. authRequest.permissions = ['serviceauthcode'];
   ```
2. 确保[AuthorizationWithHuaweiIDRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-authentication#section12940173017165)接口传入正确scope后获取到的authorizationCode/IdToken是否在有效期内。
3. 确认调用的是华为账号服务器[获取头像昵称](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-get-user-info-get-nickname-and-avatar)接口。