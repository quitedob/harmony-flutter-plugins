## 场景介绍

应用接收到来自网络的音/视频通话，称为来电场景。

来电场景的效果图展示如下：

|  |  |  |
| --- | --- | --- |
| **语音来电** | **视频来电** | **视频来电（不支持语音接听**） |
|  |  |  |
| **通话中** | **锁屏语音来电** | **锁屏视频来电** |
|  |  |  |

## 约束与限制

来电场景支持Phone、Tablet设备，并从6.0(20)版本开始支持Wearable设备。

## 业务流程

### 来电场景：接听流程图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/31/v3/JHUwLPGcQFqvZzg8bDPtQQ/zh-cn_image_0000002556457279.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T025609Z&HW-CC-Expire=86400&HW-CC-Sign=A0A676018D1495A75E3CB5F245B9466EF944311F76A412CC8E2756B6831BEFB0 "点击放大")

### 来电场景：拒接流程图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/69/v3/R5bNwimDSqCLCIi8UMmcPw/zh-cn_image_0000002525257432.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T025609Z&HW-CC-Expire=86400&HW-CC-Sign=CB9793D2E32C3A28EA1797B6521955C10BABE55EBC4086B5456E5AC0EFC8835A "点击放大")

## 接口说明

来电场景的接口，由[voipCall](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall)提供。更多接口信息详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall)。

展开

| 接口名 | 描述 |
| --- | --- |
| on(type: 'voipCallUiEvent', callback: Callback<VoipCallUiEventInfo>): void | 订阅voipCallUiEvent事件。 |
| off(type: 'voipCallUiEvent', callback?: Callback<VoipCallUiEventInfo>): void | 取消订阅voipCallUiEvent事件。 |
| reportIncomingCall(voipCallAttribute: VoipCallAttribute): Promise<ErrorReason> | 上报来电。 |
| reportCallAudioEventChange(callId: string, callAudioEvent: CallAudioEvent): Promise<void> | 上报音频事件。 |
| reportCallStateChange(callId: string, callState: VoipCallState): Promise<void> | 上报通话状态改变。 |
| reportCallStateChange(callId: string, callState: VoipCallState, callType: VoipCallType): Promise<void> | 上报通话状态改变，并指定通话类型。 |

#### 开发步骤

1. 导入相关依赖。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { voipCall } from '@kit.CallServiceKit';
   2. import { image } from '@kit.ImageKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 为了感知到用户在横幅通知上做的接听、挂断、静音与解除静音等操作，应用需要注册voipCallUiEvent事件。建议在上报来电之前注册。

   示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 注册voipCallUiEvent事件
   2. voipCall.on('voipCallUiEvent', callback => {
   3. hilog.info(0x0000, 'CallDemo', 'Succeeded in registering voipCallUiEvent');
   4. });
   ```
3. 应用内部建立通话连接之后，需要向Call Service Kit上报来电，并携带通话信息，详见[VoipCallAttribute](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall#section4221135015444)。

   如果当时应用在后台，系统会展示来电横幅。

   示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 构造上报来电的参数
   2. let voipCallAttribute: voipCall.VoipCallAttribute = {
   3. callId: '1234567890',
   4. voipCallType: voipCall.VoipCallType.VOIP_CALL_VOICE,
   5. userName: 'Callman',
   6. userProfile: image.createPixelMapSync(new ArrayBuffer(100), { size: { width: 90, height: 90 } }),
   7. abilityName: 'VoipCallAbility',
   8. voipCallState: voipCall.VoipCallState.VOIP_CALL_STATE_RINGING,
   9. showBannerForIncomingCall: true
   10. };

   12. // 上报来电
   13. voipCall.reportIncomingCall(voipCallAttribute).then(errorReason => {
   14. if (errorReason == voipCall.ErrorReason.ERROR_NONE) {
   15. hilog.info(0x0000, 'CallDemo', 'Succeeded in reporting the incoming call');
   16. } else {
   17. hilog.error(0x0000, 'CallDemo', 'Failed to report the incoming call: %{public}d', errorReason);
   18. }
   19. });
   ```

   对于视频通话，可以通过参数[isVoiceAnswerSupported](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall#section4221135015444)指定是否允许语音接听，示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 构造上报来电的参数
   2. let voipCallAttribute: voipCall.VoipCallAttribute = {
   3. callId: '1234567890',
   4. voipCallType: voipCall.VoipCallType.VOIP_CALL_VIDEO,
   5. userName: 'Jack',
   6. userProfile: image.createPixelMapSync(new ArrayBuffer(100), { size: { width: 90, height: 90 } }),
   7. abilityName: 'VoipCallAbility',
   8. voipCallState: voipCall.VoipCallState.VOIP_CALL_STATE_RINGING,
   9. showBannerForIncomingCall: true,
   10. isVoiceAnswerSupported: false  // 视频通话不支持语音接听
   11. };
   ```
4. 接收到来电之后，用户可以选择接听或拒接。

   接听有两种开发方式：上报两次状态、只上报一次状态。
   * 上报两次状态（推荐）。

     以语音通话为例，应用在接收到[VOIP\_CALL\_EVENT\_VOICE\_ANSWER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall#section26961727970)事件回调之后，立即向Call Service Kit上报[VOIP\_CALL\_STATE\_ANSWERED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall#section24523814719)状态，并同时执行应用内接听。

     在完成应用内接听之后，再向Call Service Kit上报[VOIP\_CALL\_STATE\_ACTIVE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall#section24523814719)状态，系统会更新通话横幅。

     示例代码如下：

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. voipCall.on('voipCallUiEvent', callback => {
     2. if (callback?.voipCallUiEvent == voipCall.VoipCallUiEvent.VOIP_CALL_EVENT_VOICE_ANSWER) {
     3. // 立即向Call Service Kit上报answered状态
     4. voipCall.reportCallStateChange(callback.callId, voipCall.VoipCallState.VOIP_CALL_STATE_ANSWERED);

     6. //...在应用内完成接听

     8. // 应用内接听后，向Call Service Kit上报active状态
     9. voipCall.reportCallStateChange(callback.callId, voipCall.VoipCallState.VOIP_CALL_STATE_ACTIVE);
     10. }
     11. });
     ```

     接听过程的效果图展示如下：

     |  |  |
     | --- | --- |
     | **正在接通** | **接通后** |
     |  |  |

     说明

     通话接听时，上报两次状态的好处是：

     因为网络等原因，从用户点击接听，到通话真正被接通的时间间隔可能比较长（比如，1s左右）。这段时间，如果横幅通知的样式不变，一直停留在来电状态，用户可能认为点击接听无响应，体验不好。

     上报两次状态，可以在接听的过程中，在界面上给用户以反馈。
   * 只上报一次状态。

   以语音通话为例，应用在接收到[VOIP\_CALL\_EVENT\_VOICE\_ANSWER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall)事件回调之后，执行应用内接听。

   一直到完成应用内接听后，再向Call Service Kit上报[VOIP\_CALL\_STATE\_ACTIVE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall)状态。

   示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. voipCall.on('voipCallUiEvent', callback => {
   2. if (callback?.voipCallUiEvent == voipCall.VoipCallUiEvent.VOIP_CALL_EVENT_VOICE_ANSWER) {
   3. //...在应用内完成接听

   5. // 应用内接听后，向Call Service Kit上报通话状态
   6. voipCall.reportCallStateChange(callback.callId, voipCall.VoipCallState.VOIP_CALL_STATE_ACTIVE);
   7. }
   8. });
   ```

   如果用户在横幅通知上点击拒接，则应用在接收到[VOIP\_CALL\_EVENT\_REJECT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall#section26961727970)事件回调之后，在应用内完成拒接，然后向Call Service Kit 上报[VOIP\_CALL\_STATE\_DISCONNECTED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall#section24523814719)状态，系统会取消横幅通知。

   拒接之后，应用可跳过5、6步，直接看第7步。

   拒接的示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. voipCall.on('voipCallUiEvent', callback => {
   2. if (callback?.voipCallUiEvent == voipCall.VoipCallUiEvent.VOIP_CALL_EVENT_REJECT) {
   3. // ...应用内完成拒接

   5. // 向Call Service Kit上报通话状态
   6. voipCall.reportCallStateChange(callback.callId, voipCall.VoipCallState.VOIP_CALL_STATE_DISCONNECTED);
   7. }
   8. });
   ```
5. 在通话过程中，用户可以根据需要，可以静音或解除静音。

   以静音为例，用户在横幅上点击静音，Call Service Kit会给应用回调[VOIP\_CALL\_EVENT\_MUTED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall#section26961727970)事件。

   应用在完成静音后，应向Call Service Kit上报[AUDIO\_EVENT\_MUTED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall#section312217120409)音频状态。

   示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. voipCall.on('voipCallUiEvent', callback => {
   2. if (callback?.voipCallUiEvent == voipCall.VoipCallUiEvent.VOIP_CALL_EVENT_MUTED) {
   3. // 向Call Service Kit上报静音
   4. voipCall.reportCallAudioEventChange(callback.callId, voipCall.CallAudioEvent.AUDIO_EVENT_MUTED);
   5. } else if (callback?.voipCallUiEvent == voipCall.VoipCallUiEvent.VOIP_CALL_EVENT_UNMUTED) {
   6. // 向Call Service Kit上报解除静音
   7. voipCall.reportCallAudioEventChange(callback.callId, voipCall.CallAudioEvent.AUDIO_EVENT_UNMUTED);
   8. }
   9. });
   ```

   静音、解除静音的横幅通知效果图展示如下：

   |  |  |
   | --- | --- |
   | **静音** | **解除静音** |
   |  |  |
6. 用户在横幅点击挂断，Call Service Kit会给应用回调[VOIP\_CALL\_EVENT\_HANGUP](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall#section26961727970)事件。

   应用收到该事件后，应在应用内完成挂断，然后，向Call Service Kit上报[VOIP\_CALL\_STATE\_DISCONNECTED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/call-voipcall#section24523814719)状态，系统会取消横幅通知。

   示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. voipCall.on('voipCallUiEvent', callback => {
   2. if (callback?.voipCallUiEvent == voipCall.VoipCallUiEvent.VOIP_CALL_EVENT_HANGUP) {
   3. // ...应用内完成挂断

   5. // 向Call Service Kit上报通话状态
   6. voipCall.reportCallStateChange(callback.callId, voipCall.VoipCallState.VOIP_CALL_STATE_DISCONNECTED);
   7. }
   8. });
   ```
7. 通话结束后，应用不再需要感知到用户在通话横幅上的操作，可以解除voipCallUiEvent事件。

   示例代码如下：

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 解除voipCallUiEvent事件
   2. voipCall.off('voipCallUiEvent', callback => {
   3. hilog.info(0x0000, 'CallDemo', `Succeeded in unRegistering voipCallUiEvent, callId: ${callback.callId}`);
   4. });
   ```