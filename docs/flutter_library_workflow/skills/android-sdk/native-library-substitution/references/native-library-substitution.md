# Native Library Substitution 单一映射表

**数据版本**: 3.0.0
**更新日期**: 2026-04-22

## 数据概览

| 统计项 | 数量 |
|--------|------|
| 总映射数 | 2678 |
| 有安卓库的映射 | 1005 |
| 鸿蒙原生库（无安卓库） | 1673 |
| 唯一安卓库数 | 852 |
| 唯一ohpm包数 | 2537 |

## source_availability 分布

| 状态 | 数量 | 说明 |
|------|------|------|
| COMMERCIAL_PUBLIC | 175 | 闭源商业SDK（来自工作簿） |
| open_source | 2503 | 开源库 |
| not_set | 0 | 未设置 |

## source_type 分布

| 来源类型 | 数量 | 说明 |
|----------|------|------|
| 鸿蒙原生库 | 1321 | 鸿蒙原生开发，无对应安卓库 |
| TS/JS迁移库 | 790 | 从npm生态迁移 |
| 安卓鸿蒙化库 | 432 | 直接从安卓库移植 |
| C++/C鸿蒙化库 | 133 | 从C++生态迁移 |

## category 分布

| Category | 数量 | 说明 |
|----------|------|------|
| other | 1527 | 其他 |
| ui | 370 | UI组件 |
| utils | 213 | 工具类 |
| network | 209 | 网络请求 |
| media | 89 | 音视频 |
| auth | 61 | 登录认证 |
| notification | 60 | 推送通知 |
| storage | 60 | 存储文件 |
| location | 50 | 地图定位 |
| analytics | 17 | 统计分析 |
| payment | 16 | 支付 |
| security | 4 | 安全加密 |
| im | 1 | 即时通讯 |
| social | 1 | 社交分享 |

## 闭源库示例（COMMERCIAL_PUBLIC）

| 安卓库 | 鸿蒙包 | install_command |
|--------|--------|-----------------|
| com.tencent.mm.opensdk:wechat-sdk-androi | @tencent/wechat_open_sdk | `ohpm install @tencent/wechat_open_sdk` |
| com.sensorsdata.analytics.abtesting:Sens | @sensorsdata/analytics | `ohpm install @sensorsdata/analytics` |
| cn.admobiletop.adsuyi.ad.adapter:tianmu | @admobile/tianmu | `ohpm install @admobile/tianmu` |
| cn.admobiletop.adsuyi.ad:core | @admobile/tianmu | `ohpm install @admobile/tianmu` |
| io.hyphenate:hyphenate-chat | @easemob/chatsdk | `ohpm install @easemob/chatsdk` |
| com.aliyun.auikits.android:ARTCAICallKit | @aliyun_video_cloud/alivcsdk_artc | `ohpm install @aliyun_video_cloud/alivcsdk_artc` |
| com.aliyun.iot.aep.sdk:push | @aliyun/push | `ohpm install @aliyun/push` |
| com.aliyun.rum:alibabacloud-android-rum- | @alibabacloud_rum/harmony_sdk | `ohpm install @alibabacloud_rum/harmony_sdk` |
| com.alibaba.mtl:app-monitor-sdk | @alibabacloud_rum/harmony_sdk | `ohpm install @alibabacloud_rum/harmony_sdk` |
| com.aliyun.ams:alicloud-apm-crash-analys | @aliyun/apm | `ohpm install @aliyun/apm` |
| com.aliyun.dpa:oss-android-sdk | @aliyun/oss | `ohpm install @aliyun/oss` |
| afservicesdk | @cashier_alipay/cashiersdk | `ohpm install @cashier_alipay/cashiersdk` |
| com.alipay.sdk:alipaysdk-android | @cashier_alipay/cashiersdk | `ohpm install @cashier_alipay/cashiersdk` |
| io.github.yidun:livedetect | @yidun/alive | `ohpm install @yidun/alive` |
| io.github.aliyun-sls:aliyun-log-android- | @aliyun/logger | `ohpm install @aliyun/logger` |
| com.aliyun.ams:alicloud-android-push | @aliyun/push | `ohpm install @aliyun/push` |
| com.aliyun.ams:alicloud-android-third-pu | @aliyun/push | `ohpm install @aliyun/push` |
| com.aliyun.ams:alicloud-android-third-pu | @aliyun/push | `ohpm install @aliyun/push` |
| com.amap.api:3dmap | @amap/amap_lbs_map3d | `ohpm install @amap/amap_lbs_map3d` |
| com.amap.api:location | @amap/amap_lbs_location | `ohpm install @amap/amap_lbs_location` |
| com.amap.api:search | @amap/amap_lbs_search | `ohpm install @amap/amap_lbs_search` |
| com.amap.api:3dmap-location-search | @amap/amap_lbs_map3d | `ohpm install @amap/amap_lbs_map3d` |
| com.amap.api:navi-3dmap | @amap/amap_lbs_map3d | `ohpm install @amap/amap_lbs_map3d` |
| com.umeng.umsdk:analytics | @umeng/analytics | `ohpm install @umeng/analytics` |
| com.umeng.umsdk:common | @umeng/common | `ohpm install @umeng/common` |
| BaiduLBS_Android | @bdmap/navi_map | `ohpm install @bdmap/navi_map` |
| com.baidubce.mediasdk:brtc | @baiduplayer/baidurtcsdk | `ohpm install @baiduplayer/baidurtcsdk` |
| com.getui:gtsdk | @getui/push | `ohpm install @getui/push` |
| com.bonree.sdk.jar | @bonree/agent | `ohpm install @bonree/agent` |
| com.tencent.bugly:crashreport | bugly | `ohpm install bugly` |

*共 175 条闭源库映射*

## 高置信度映射示例（安卓鸿蒙化库）

| 安卓库 | 鸿蒙包 | category | install_command |
|--------|--------|----------|-----------------|
| AJCaptcha 安卓实现版本 | @scca/verification | other | `ohpm install @scca/verification` |
| ARouter | @ohos/arouteronactivityresult | other | `ohpm install @ohos/arouteronactivityresult` |
| ARouter | hrouter | other | `ohpm install hrouter` |
| Android Beacon Library (AltBea | @ohos/beacon-library | other | `ohpm install @ohos/beacon-library` |
| Android BottomSheet | @hld/bottomsheet | other | `ohpm install @hld/bottomsheet` |
| Android Jetpack Paging3 | @jackiehou/experimental-paging | other | `ohpm install @jackiehou/experimental-paging` |
| Android Room | @hzzmkjyxgs/zmwlthmosdb | other | `ohpm install @hzzmkjyxgs/zmwlthmosdb` |
| Android TabLayout（com.google.a | @zyc/tablayout | other | `ohpm install @zyc/tablayout` |
| Android XLog | @ohos-port/xlog-ts | other | `ohpm install @ohos-port/xlog-ts` |
| Android-Debug-Database | @hadss/debug-db | other | `ohpm install @hadss/debug-db` |
| AndroidImageEditor | @zhongjh/image_edit | other | `ohpm install @zhongjh/image_edit` |
| AndroidUtilCode | @android_x/utilcode | other | `ohpm install @android_x/utilcode` |
| AndroidUtilCode | @ilye/utilcode | other | `ohpm install @ilye/utilcode` |
| AndroidUtilCode | @ranran/utilcode | other | `ohpm install @ranran/utilcode` |
| AndroidVideoCache | @changjing/drm | media | `ohpm install @changjing/drm` |
| AndroidVideoCache (com.danikul | @ohos/video-cache | media | `ohpm install @ohos/video-cache` |
| Apache Batik | @ohos/xmlgraphicsbatik | other | `ohpm install @ohos/xmlgraphicsbatik` |
| Apache Cordova Android | @boc/cordova | other | `ohpm install @boc/cordova` |
| AppCan Android Engine | @appcan/engine | other | `ohpm install @appcan/engine` |
| DBFlow | @ohos/dataorm | other | `ohpm install @ohos/dataorm` |

*共 340 条高置信度安卓鸿蒙化库映射*

## 鸿蒙原生库示例（无安卓库）

| 鸿蒙包 | 组织 | category | install_command |
|--------|------|----------|-----------------|
| @pura/harmony-utils | pura | notification | `ohpm install @pura/harmony-utils` |
| @pura/harmony-dialog | pura | ui | `ohpm install @pura/harmony-dialog` |
| @ibestservices/ibest-ui | ibestservices | ui | `ohpm install @ibestservices/ibest-ui` |
| @abner/refresh | abner | ui | `ohpm install @abner/refresh` |
| @hzw/zrouter | hzw | other | `ohpm install @hzw/zrouter` |
| cjcalendar |  | ui | `ohpm install cjcalendar` |
| @hadss/hmrouter | hadss | other | `ohpm install @hadss/hmrouter` |
| @esky/barrage | esky | media | `ohpm install @esky/barrage` |
| @ibestservices/ibest-ui-v2 | ibestservices | ui | `ohpm install @ibestservices/ibest-ui-v2` |
| @ohos/pulltorefresh | ohos | ui | `ohpm install @ohos/pulltorefresh` |
| @mcui/mccharts | mcui | utils | `ohpm install @mcui/mccharts` |
| @maple/navigationbarview | maple | location | `ohpm install @maple/navigationbarview` |
| @abner/dialog | abner | ui | `ohpm install @abner/dialog` |
| @zyl/wxcommonlibhar | zyl | payment | `ohpm install @zyl/wxcommonlibhar` |
| @ibestservices/ibest-orm | ibestservices | storage | `ohpm install @ibestservices/ibest-orm` |
| @ohasasugar/hp-richtext | ohasasugar | ui | `ohpm install @ohasasugar/hp-richtext` |
| @zyl/commonlibhar | zyl | media | `ohpm install @zyl/commonlibhar` |
| @abner/datastore | abner | storage | `ohpm install @abner/datastore` |
| @visactor/harmony-vchart | visactor | other | `ohpm install @visactor/harmony-vchart` |
| @liushengyi/smartdb | liushengyi | storage | `ohpm install @liushengyi/smartdb` |

*共 1673 条鸿蒙原生库*

## 数据结构

每条映射记录包含15个字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| android_lib | string/null | 安卓库标识符（鸿蒙原生库为null） |
| android_platform | string | android / ios / ohos_native |
| android_description | string/null | 安卓库功能描述 |
| ohpm_package | string | 鸿蒙包名 |
| ohpm_org | string | ohpm组织名 |
| ohpm_description | string | 鸿蒙包功能描述 |
| ohpm_keywords | array | 鸿蒙包关键词 |
| ohpm_repo_url | string | 鸿蒙包源码仓库 |
| ohpm_homepage | string | 鸿蒙包文档主页 |
| source_type | string | 安卓鸿蒙化库/TS迁移库/鸿蒙原生库 |
| source_availability | string | COMMERCIAL_PUBLIC/open_source |
| confidence | string | high/medium/low |
| install_command | string | ohpm install命令 |
| category | string | media/network/notification等 |
| inference_reason | string | 映射关系说明 |
