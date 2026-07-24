构建模式：DevEco Studio默认提供debug和release两种构建模式，同时支持开发者自定义构建模式。

产物格式：构建出的HAR包产物分为包含源码的HAR、包含js中间码的HAR以及包含字节码的HAR三种产物格式。

从DevEco Studio NEXT Beta1（5.0.3.800）版本开始，默认构建字节码HAR，用于提升发布产物的安全性。

## 使用约束

HAR自身的构建不建议引用本地模块，可能导致其他模块依赖该HAR包时安装失败，如果安装失败，需要在工程级oh-package.json5中配置[overrides](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-oh-package-json5#zh-cn_topic_0000001792256137_overrides)。

## 创建模块

1. 新建工程时选择API 10及以上的Stage模型，工程创建完成后，新建“Static Library”模块。模块创建方法可参考[在工程中添加Module](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-add-new-module)。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ff/v3/XE5QmutpQd2WT0QgJCfTVw/zh-cn_image_0000002532750173.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=619FC2BD99A27D1E76C4C5243A64388A65F5A90D5302C8A2D5D1B72A2ABC52A3)
2. 编写代码。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. library  // HAR根目录
   2. ├─libs  // 存放用户自定义引用的Native库，一般为.so文件
   3. └─src
   4. │   └─main
   5. │     ├─cpp
   6. │     │  ├─types  // 定义Native API对外暴露的接口
   7. │     │  │  └─liblibrary
   8. │     │  │      ├─index.d.ts
   9. │     │  │      └─oh-package.json5
   10. │     │  ├─CMakeLists.txt  // CMake配置文件
   11. │     │  └─napi_init.cpp  // C++源码文件
   12. │     └─ets  // ArkTS源码目录
   13. │     │  └─components
   14. │     │     └─MainPage.ets
   15. │     ├─resources  // 资源目录，用于存放资源文件，如图片、多媒体、字符串等
   16. │     └─module.json5  // 模块配置文件，包含当前HAR的配置信息
   17. ├─build-profile.json5  // Hvigor编译构建所需的配置文件，包含编译选项
   18. ├─hvigorfile.ts  // Hvigor构建脚本文件，包含构建当前模块的插件、自定义任务等
   19. ├─Index.ets  // HAR的入口文件，一般作为出口定义HAR对外提供的函数、组件等
   20. └─oh-package.json5  // HAR的描述文件，定义HAR的基本信息、依赖项等
   ```
3. 在oh-package.json5中“main”字段定义导出文件入口。若不设置“main”字段，默认以当前目录下Index.ets为入口文件，依据.ets>.ts>.js的顺序依次检索。以将ets/components/MainPage.ets文件设置为入口文件为例：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. ...
   3. "main": "./src/main/ets/components/MainPage.ets",
   4. ...
   5. }
   ```

## 字节码HAR

默认产物是包含字节码的HAR包，其中包含abc字节码、资源文件、配置文件、readme、changelog声明文件、license证书文件，提升发布到ohpm中心仓产物的安全性。

字节码HAR包中包含的是编译后的abc字节码，当字节码HAR被其他应用模块(HAP/HSP)依赖时，执行应用模块的编译构建，不需要再对依赖的HAR进行语法检查和编译等操作，相比源码HAR，可以有效提升应用模块的编译构建效率，提高安全性，降低代码泄漏的风险。

说明

由于构建字节码HAR需要生成二进制的格式，所以单独构建字节码HAR会比构建非字节码HAR耗时更多。

### 收益

* 字节码HAR可以降低代码泄漏的风险，增加反编译获取代码逻辑的难度。

* 采用ArkTS/TS语言开发的字节码HAR，被HAP/HSP集成时，可以减少语法检查、转换的耗时，提高构建性能。
* 字节码HAR可以减少编译时node的进程占用，有效降低内存占用。
* 通过其他代码生成工具生成的js语言HAR包，编译构建成字节码HAR后，被HAP/HSP集成时，可以减少编译阶段处理的文件和代码数量，降低内存，提高构建性能。

### 使用场景

从功能上来说所有的源码HAR包都可以按照任意顺序切换成字节码HAR。但是由于字节码HAR编译和集成的特点，按照推荐场景或顺序来逐步切换字节码HAR可能会获得比较好的性能、内存收益。以下场景中推荐切换使用字节码HAR：

* 适用于SDK厂商对外提供SDK，以及高安全的场景，字节码HAR可以降低源码泄漏的风险。
* 采用muti-repo的开发模式，在被主工程合并集成时，所有依赖的HAR均可以发布成字节码HAR，从而提高主HAP的构建效率。
* 采用mono-repo的开发模式，工程中含有单个代码文件较大，或通过代码生成工具生成的代码量较大的ArkTS/TS/JS 的二方、三方SDK(HAR包)时，可考虑将这些HAR包构建成字节码HAR。
* 对内存要求较高的场景，可以通过切换字节码HAR，降低内存的占用。
* 通过ArkTS/TS/JS编写的HAR，且在依赖链条中处于较为底层的叶子节点，含有较少的源码依赖时，切换为字节码HAR会有较好的收益。

### 约束条件

* 字节码HAR使用的依赖需要配置在本模块的oh-package.json5的dependencies或dynamicDependencies中，如果不配置，后续字节码HAR被集成时可能会出现运行时异常。如果出现异常，部分场景可通过在hvigor-config.json5中配置ohos.byteCodeHar.integratedOptimization后重新编译，具体请参考[编译行为差异说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-hvigor-dependencies#section957371853712)。
* 字节码HAR的oh-package.json5中配置的依赖名和依赖包的包名（即包内oh-package.json5中的name）需要保持一致。
* 依赖字节码HAR包时，该工程的build-profile.json5中的[useNormalizedOHMUrl](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-hvigor-build-profile-app#section13181758123312)必须设置为true。
* HAP/HSP/HAR依赖字节码HAR包时，HAP/HSP/HAR的oh-package.json5中配置的依赖名和字节码HAR包的oh-package.json5中的name需要保持一致。
* HAP/HSP/HAR代码中import使用字节码HAR包时，`import xxx from 'yyy'`的依赖名yyy要和本模块oh-package.json5中配置的依赖名保持一致（包括大小写）。
* 依赖字节码HAR包时，字节码HAR的compatibleSdkVersion不能大于工程的compatibleSdkVersion。

### 操作步骤

1. 将工程级build-profile.json5的useNormalizedOHMUrl设置为true。

   说明

   从DevEco Studio NEXT Beta1（5.0.3.800）版本开始，工程级build-profile.json5中useNormalizedOHMUrl字段默认为true，byteCodeHar缺省默认值为true，无需执行步骤1和2。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "app": {
   3. "products": [
   4. {
   5. "buildOption": {
   6. "strictMode": {
   7. "useNormalizedOHMUrl": true
   8. }
   9. }
   10. }
   11. ]
   12. }
   13. }
   ```
2. 在HAR模块的build-profile.json5中，将byteCodeHar设置为true。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "buildOption": {
   3. "arkOptions": {
   4. "byteCodeHar": true
   5. }
   6. }
   7. }
   ```
3. 点击DevEco Studio右上角图标![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d9/v3/bIhc1U8eSRy8coFEdxvCeA/zh-cn_image_0000002501070134.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=A60E7B697EFC16C14D7CB2C18CCDE019A4CFFD0D2344093DBEA2A28F79F02039)，选择**Build Mode，**默认为**<Default>**模式：在编译App时使用release模式，编译HAP/HSP/HAR时使用debug模式。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e5/v3/7UguVoRmRvuHMbZdfMr3pw/zh-cn_image_0000002501070126.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=B188CB09A3E43187FEF93098A460C0AF2C6E7A1684FEB8A256313D315E962F32)
4. （可选）在编译模式为release时，为保护代码资产，建议开启混淆，在模块级build-profile.json5文件的release的buildOptionSet配置中，将obfuscation/ruleOptions下的enable字段设置为true。混淆相关能力和具体规则请参考[代码混淆](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-build-obfuscation)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "apiType": "stageMode",
   3. "buildOption": {
   4. },
   5. "buildOptionSet": [
   6. {
   7. "name": "release",
   8. "arkOptions": {
   9. // 混淆相关参数
   10. "obfuscation": {
   11. "ruleOptions": {
   12. // true表示进行混淆，false表示不进行混淆。5.0.3.600及以上版本默认为false
   13. "enable": true,
   14. // 混淆规则文件
   15. "files": [
   16. "./obfuscation-rules.txt"
   17. ]
   18. },
   19. // consumerFiles中指定的混淆配置文件会在构建依赖这个library的工程或library时被应用
   20. "consumerFiles": [
   21. "./consumer-rules.txt"
   22. ]
   23. }
   24. },
   25. },
   26. ],
   27. "targets": [
   28. {
   29. "name": "default"
   30. }
   31. ]
   32. }
   ```
5. （可选）如果开发者希望自定义打包到HAR产物中的文件，可在HAR模块的build-profile.json5文件中，配置include或exclude字段，支持glob语法。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. "buildOption": {
   2. "packingOptions": {
   3. "asset": {
   4. "include": ["./src/router.json5","router.json5"],    // 配置打包到HAR产物中的文件
   5. "exclude": ["./config/*"]     // 配置不打包到HAR产物中的文件
   6. }
   7. }
   8. }
   ```

   说明

   * 配置include字段时，以下目录不生效，即不会被打包到产物中：node\_modules、oh\_modules、.preview、build、.cxx、.test。
   * 配置exclude字段时，以下文件不生效，默认会打包：oh-package.json5。
6. 选中HAR模块的根目录，点击**Build > Make Module '<module-name>'**启动构建。

   说明

   若修改了HAR模块级oh-package.json5文件的version字段，请先执行**Build > Clean Project**操作，再重新进行Build全量构建。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9b/v3/Xsm-ApGLRw2_yuILj7pTmw/zh-cn_image_0000002500910290.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=A9F4887BA52A7EACEBB81DBE5F00EC480A7CE4C354748BCF531BC54B5B61A14F)

   构建完成后，build目录下生成HAR包产物。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9c/v3/59Hp6ixaQSe0nyYwmNfK_w/zh-cn_image_0000002532670203.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=11D1A9DFDB2C067A5BEA4342764C07BA335FC67BA63854E5E5711C9CAF8CA35E)

   HAR包产物解压后，结构如下：

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4c/v3/td7j1TtQTBCDpEF6XSGCsQ/zh-cn_image_0000002532750167.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=936B5F11458B53FC633E0ABA2A4DE648D4E1ED0B26443A723DA84315C0A1ACF2)

## 源码HAR

### 以debug模式构建

产物是包含源码的HAR包，其中包含源码、资源文件以及配置文件等，方便开发者进行本地调测，不包含build、node\_modules、oh\_modules、.cxx、.preview、.hvigor、.gitignore、.ohpmignore、.gitignore/.ohpmignore中配置的文件、cpp工程的CMakeLists.txt。

说明

* 源码HAR包中包含源代码，请谨慎分发，避免造成源代码泄露。
* 如果是native工程，以debug模式构建的native产物中不包含调试信息和符号表，如需调试，请参考[三方源码调试](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-source-code-debugging)。
* 从5.0.3.403版本开始，不再建议使用相对路径跨模块引用代码文件，若历史工程存在此场景的跨模块引用，会出现warning告警，请尝试将该文件移至本模块内，再重新进行编译。
* 从5.0.3.403版本开始，以debug/release模式构建HAR的流程使用相同的语法校验规则，若历史工程出现ArkTS语法报错，请按照报错信息修改代码，以符合ArkTS语言规范。

1. 在HAR模块的build-profile.json5中，将byteCodeHar设置为false。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "buildOption": {
   3. "arkOptions": {
   4. "byteCodeHar": false
   5. }
   6. }
   7. }
   ```

   说明

   使用DevEco Studio NEXT Beta1（5.0.3.800）之前的版本，模块级build-profile.json5的byteCodeHar字段的缺省默认值为false，无需执行本步骤。
2. 点击DevEco Studio右上角图标![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f/v3/HFQoCGxDQsWH7_WTYLRQ8Q/zh-cn_image_0000002501070130.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=9466BCE389781FA09B870EFB7A4C33CDF3B85A888C536554E344F2C70FCA7FD6)，**Build Mode**选择**debug。**默认为**<Default>**模式：在编译App时使用release模式，编译HAP/HSP/HAR时使用debug模式。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1d/v3/3rua6cPJQ9uSq1CKCbBzkQ/zh-cn_image_0000002501070136.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=699AE0D5E993AD99CD5DBB65EB24BC2DB0A49F79548496D90EDA74453F3FA28C)
3. （可选）若部分工程源文件无需构建到HAR包中，可在模块目录下新建.ohpmignore文件，或者在模块目录下的.gitignore文件中，配置打包时要忽略的文件，.ohpmignore文件中支持正则表达式写法，.gitignore文件中支持glob语法。DevEco Studio构建时将过滤掉.ohpmignore或.gitignore文件中所包含的文件/文件夹。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8e/v3/oSuRuesMSYuwvyF2OhT-wQ/zh-cn_image_0000002500910304.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=CF1B572CAEF6A30F6A6333365DCBB238B7F8E7BA4B1C003507BDA25D99178A07)
4. （可选）如果开发者希望自定义打包到HAR产物中的文件，可在HAR模块的build-profile.json5文件中，配置include或exclude字段，支持glob语法。配置include或exclude字段后，.gitignore和.ohpmignore文件将不再生效。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. "buildOption": {
   2. "packingOptions": {
   3. "asset": {
   4. "include": ["./src/router.json5","router.json5"],    // 配置打包到HAR产物中的文件
   5. "exclude": ["./config/*"]     // 配置不打包到HAR产物中的文件
   6. }
   7. }
   8. }
   ```

   说明

   * 配置include字段时，以下目录不生效，即不会被打包到产物中：node\_modules、oh\_modules、.preview、build、.cxx、.test。
   * 配置exclude字段时，以下文件不生效，默认会打包：oh-package.json5。
5. 选中HAR模块的根目录，点击**Build > Make Module '<module-name>'**启动构建。

   说明

   若修改了HAR模块级oh-package.json5文件的version字段，请先执行**Build > Clean Project**操作，再重新进行Build全量构建。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/89/v3/tX_2ZiYhSr64SyrHvuyZfA/zh-cn_image_0000002532750171.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=61F3FC9A4E2B76AB29EA8C547AF915C65800612F7B92F4CE7DEC87B231A41AD6)

   构建完成后，build目录下生成HAR包产物。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c3/v3/-JcpKKyPQrSwDjRx6OLXeQ/zh-cn_image_0000002532750157.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=8A2DC322E4A3BEF2A88742EC5F6B73B16E6497650C7953F5937323D8FEE786F4)

   HAR包产物解压后，结构如下：

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/89/v3/CkXJ9FGBSIyDFaetJumiBw/zh-cn_image_0000002532750169.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=C4269DF22D365B58A898DB61C405E2B37A4E7969112E8DE5E21BE6738682DAEF)

### 以release模式构建

从DevEco Studio NEXT Developer Beta3（5.0.3.600）版本开始，默认不开启混淆，构建产物和debug模式相同，请参考[以debug模式构建](/consumer/cn/doc/harmonyos-guides/ide-hvigor-build-har#section197792874110)。

为保护代码资产，建议开启混淆，开启后，构建产物是包含js中间码的HAR包，其中包含源码混淆后生成的js中间码文件、资源文件、配置文件、readme、changelog声明文件、license证书文件，用于发布到ohpm中心仓。

1. 在HAR模块的build-profile.json5中，将byteCodeHar设置为false。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "buildOption": {
   3. "arkOptions": {
   4. "byteCodeHar": false
   5. }
   6. }
   7. }
   ```

   说明

   使用DevEco Studio NEXT Beta1（5.0.3.800）之前的版本，模块级build-profile.json5的byteCodeHar字段的缺省默认值为false，无需执行本步骤。
2. 点击DevEco Studio右上角图标![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/83/v3/elMu8UkmQWy-XRkCJij-0w/zh-cn_image_0000002532750175.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=0F068263CF977CECCB8BBD0CAB5F488F9688BE4CDE222693339B0937BB9C5714)，**Build Mode**中选择**release。**默认为**<Default>**模式：在编译App时使用release模式，编译HAP/HSP/HAR时使用debug模式。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8b/v3/kI_86izCQiCtQoAsYzCVvA/zh-cn_image_0000002501070138.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=77AA9CDE9B665140E7DBBD5362B2C6DB9FD6F844EDE89262A9E3F294A4850987)
3. 在[编译模式](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-hvigor-compilation-options-customizing-guide#section192461528194916)为release时，为保护代码资产，建议开启混淆，在模块级build-profile.json5文件的release的buildOptionSet配置中，将obfuscation/ruleOptions下的enable字段设置为true。混淆相关能力和具体规则请参考[代码混淆](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-build-obfuscation)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "apiType": "stageMode",
   3. "buildOption": {
   4. },
   5. "buildOptionSet": [
   6. {
   7. "name": "release",
   8. "arkOptions": {
   9. // 混淆相关参数
   10. "obfuscation": {
   11. "ruleOptions": {
   12. // true表示进行混淆，false表示不进行混淆。5.0.3.600及以上版本默认为false
   13. "enable": true,
   14. // 混淆规则文件
   15. "files": [
   16. "./obfuscation-rules.txt"
   17. ]
   18. },
   19. // consumerFiles中指定的混淆配置文件会在构建依赖这个library的工程或library时被应用
   20. "consumerFiles": [
   21. "./consumer-rules.txt"
   22. ]
   23. }
   24. },
   25. },
   26. ],
   27. "targets": [
   28. {
   29. "name": "default"
   30. }
   31. ]
   32. }
   ```
4. （可选）如果开发者希望自定义打包到HAR产物中的文件，可在HAR模块的build-profile.json5文件中，配置include或exclude字段，支持glob语法。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. "buildOption": {
   2. "packingOptions": {
   3. "asset": {
   4. "include": ["./src/router.json5","router.json5"],    // 配置打包到HAR产物中的文件
   5. "exclude": ["./config/*"]     // 配置不打包到HAR产物中的文件
   6. }
   7. }
   8. }
   ```

   说明

   * 配置include字段时，以下目录不生效，即不会被打包到产物中：node\_modules、oh\_modules、.preview、build、.cxx、.test。
   * 配置exclude字段时，以下文件不生效，默认会打包：oh-package.json5。
5. 选中HAR模块的根目录，点击**Build > Make Module '<module-name>'**启动构建。

   说明

   若修改了HAR模块级oh-package.json5文件的version字段，请先执行**Build > Clean Project**操作，再重新进行Build全量构建。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/80/v3/R_FIuRwWTDyQNv65BxQRtA/zh-cn_image_0000002501070128.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=9779CD87BA15F3BF164B01B95D3354EF2C878FA826C83AA94EE58759E59B86B3)

   构建完成后，build目录下生成HAR包产物。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/94/v3/pCdDtdA4R5Gptkm59oQEXA/zh-cn_image_0000002500910302.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=1FA7FBF9BCC4671A9EA19973DDA0E81C53C6612227C4BB16FC65111BC66BF409)

   HAR包产物解压后，结构如下：

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5/v3/5o7wVEO4RdCLN8Du1nYCGA/zh-cn_image_0000002500910308.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=EA212549BF22B0B92AD71913DB5F797C3DEF71F9524AD062F93A0D8205982E08)

## 对HAR进行签名

DevEco Studio在构建HAR流程的基础上，支持对HAR进行签名。签名后的HAR包后续可用于接入生态市场，接入流程请参考[SDK类商品接入说明](https://developer.huawei.com/consumer/cn/doc/start/dev-mall-marketplace-sp-sdkservice-access-explain-0000001866499490)。

说明

1. 该能力只在Compatible SDK 5.0.0(12)及以上版本的SDK中支持。

2. 该能力需开启Hvigor的Daemon能力，请确保当前工程开启了Daemon，打开**File > Settings**（macOS为**DevEco Studio > Preferences/Settings） > Build, Execution, Deployment > Build Tools > Hvigor**，勾选字段**Enable the Daemon for tasks**。

1. 在hvigor-config.json5中，开启构建签名HAR开关：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "properties": {
   3. "ohos.sign.har": true
   4. }
   5. }
   ```
2. 配置工程签名信息，配置流程请参考[配置签名信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-publish-app#section793484619307)。
3. 选中HAR模块的根目录，点击**Build > Make Module '<module-name>'**启动构建。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/56/v3/EfF44a2dSt28id-cC9N43g/zh-cn_image_0000002532750165.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=DB316E1D29CBB8CCDC8DDF975C0931FDCA53950AC5CBA0DACFB35996C1EE6C45)

   构建完成后，build目录下生成签名HAR包产物。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c/v3/fcjp_UeOT3iDJTYHX3fmMA/zh-cn_image_0000002532670209.png?HW-CC-KV=V1&HW-CC-Date=20260414T054854Z&HW-CC-Expire=86400&HW-CC-Sign=BFEE58F1844F1123006CC55C6EC1183A8DFB42A56F43E0DDE5EF2246DF8AF037)