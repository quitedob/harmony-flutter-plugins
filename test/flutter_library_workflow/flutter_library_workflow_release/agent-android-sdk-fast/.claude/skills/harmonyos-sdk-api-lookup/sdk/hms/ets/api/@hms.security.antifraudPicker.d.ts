/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file This module provides the capabilities of antifraud helper.
 * @kit DeviceSecurityKit
 */
import type common from '@ohos.app.ability.common';
/**
 * Antifraud picker.
 *
 * @namespace antifraudPicker
 * @syscap SystemCapability.Security.Antifraud
 * @since 5.0.3(15)
 */
declare namespace antifraudPicker {
    /**
     * Antifraud message options.
     *
     * @typedef AntifraudMessageOptions
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    interface AntifraudMessageOptions {
        /**
         * Indicates the maximum number of selected items.
         * If this parameter is not transferred, the default value 50 is used.
         * The value ranges from 0 to 50. The value 0 is not recommended.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        maxSelectNumber?: number;
    }
    /**
     * Single antifraud message Information.
     *
     * @typedef SingleAntifraudMessageInfo
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    interface SingleAntifraudMessageInfo {
        /**
         * Message sender number.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        senderNumber: string;
        /**
         * Message receiving time.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        receivingTime: number;
        /**
         * Message Content.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        messageContent: string;
        /**
         * Sender name.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        senderName: string;
        /**
         * Home area of the SMS sender number.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        senderPlace: string;
        /**
         * Message Type.
         * 1 -- MMS
         * 0 -- SMS
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        messageType: string;
        /**
         * MMS subject.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        mmsSubject?: string;
        /**
         * MMS attachment information.
         *
         * @type { MmsAttachmentInfo[] }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        mmsAttachments?: MmsAttachmentInfo[];
    }
    /**
     * MMS attachment information.
     *
     * @typedef MmsAttachmentInfo
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    interface MmsAttachmentInfo {
        /**
         * MMS attachment type.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        attachmentType: number;
        /**
         * attachment uri.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        uri: string;
    }
    /**
     * Antifraud Message Result.
     *
     * @typedef AntifraudMessageResult
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    interface AntifraudMessageResult {
        /**
         * Single antifraud message information.
         *
         * @type { SingleAntifraudMessageInfo[] }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        messageInfo: SingleAntifraudMessageInfo[];
    }
    /**
     * Single antifraud call log Information.
     *
     * @typedef SingleAntifraudCallLogInfo
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    interface SingleAntifraudCallLogInfo {
        /**
         * Call log caller number.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        callerNumber: string;
        /**
         * Call log receiving time.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        receivingTime: number;
        /**
         * Call log type.
         * 0 -- Incoming calls
         * 1 -- Talking out calls
         *
         * @type { number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        callLogType: number;
        /**
         * Caller name.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        callerName: string;
        /**
         * Call duration.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        callDuration: number;
    }
    /**
     * Antifraud call log result.
     *
     * @typedef AntifraudCallLogResult
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    interface AntifraudCallLogResult {
        /**
         * Single antifraud call log information.
         *
         * @type { SingleAntifraudCallLogInfo[] }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        callLogInfo: SingleAntifraudCallLogInfo[];
    }
    /**
     * Antifraud call log options.
     *
     * @typedef AntifraudCallLogOptions
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    interface AntifraudCallLogOptions {
        /**
         * Indicates the maximum number of selected items.
         * If this parameter is not transferred, the default value 50 is used.
         * The value ranges from 0 to 50. The value 0 is not recommended.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        maxSelectNumber?: number;
    }
    /**
     * Antifraud app options.
     *
     * @typedef AntifraudAppOptions
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.1.1(19)
     */
    interface AntifraudAppOptions {
        /**
         * Indicates the maximum number of selected items.
         * If this parameter is not transferred, the default value 50 is used.
         * The value ranges from 0 to 50. The value 0 is not recommended.
         *
         * @type { ?number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.1.1(19)
         */
        maxSelectNumber?: number;
    }
    /**
     * Antifraud App Result.
     *
     * @typedef AntifraudAppResult
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.1.1(19)
     */
    interface AntifraudAppResult {
        /**
         * Single antifraud app information.
         *
         * @type { SingleAntifraudAppInfo[] }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.1.1(19)
         */
        appInfo: SingleAntifraudAppInfo[];
    }
    /**
     * Single antifraud app Information.
     *
     * @typedef SingleAntifraudAppInfo
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.1.1(19)
     */
    interface SingleAntifraudAppInfo {
        /**
         * Application name.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.1.1(19)
         */
        applicationName: string;
        /**
         * Bundle name.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.1.1(19)
         */
        bundleName: string;
        /**
         * Version code.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.1.1(19)
         */
        versionCode: number;
        /**
         * Version name.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.1.1(19)
         */
        versionName: string;
        /**
         * Install time.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.1.1(19)
         */
        installTime: number;
        /**
         * App id.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.1.1(19)
         */
        appId: string;
        /**
         * Label.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.1.1(19)
         */
        label: string;
        /**
         * Install source.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.1.1(19)
         */
        installSource: string;
    }
    /**
     * Pull up the antifraudPicker based on the selection mode.
     *
     * @permission ohos.permission.USE_FRAUD_MESSAGES_PICKER
     * @param { common.Context } context - The context of an ability.
     * @param { AntifraudMessageOptions } [ options ] - represents the options provided in select mode.
     * @returns { Promise<AntifraudMessageResult> } Returns the information for the selected message.
     * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.USE_FRAUD_MESSAGES_PICKER".
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 1017100001 - Unknown error.
     * @throws { BusinessError } 1017100002 - The device type is not supported..
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    function selectFraudMessage(context: common.Context, options?: AntifraudMessageOptions): Promise<AntifraudMessageResult>;
    /**
     * Pull up the antifraudPicker based on the selection mode.
     *
     * @permission ohos.permission.USE_FRAUD_CALL_LOG_PICKER
     * @param { common.Context } context - The context of an ability.
     * @param { AntifraudCallLogOptions } [ options ] - represents the options provided in select mode.
     * @returns { Promise<AntifraudCallLogResult> } Returns the information for the selected call log.
     * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.USE_FRAUD_CALL_LOG_PICKER".
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 1017100001 - Unknown error.
     * @throws { BusinessError } 1017100002 - The device type is not supported.
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    function selectFraudCallLog(context: common.Context, options?: AntifraudCallLogOptions): Promise<AntifraudCallLogResult>;
    /**
     * Pull up the antifraudPicker based on the selection mode.
     *
     * @permission ohos.permission.USE_FRAUD_APP_PICKER
     * @param { common.Context } context - The context of an ability.
     * @param { AntifraudAppOptions } [ options ] - represents the options provided in select mode.
     * @returns { Promise<AntifraudAppResult> } Returns the information for the selected app.
     * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.USE_FRAUD_APP_PICKER".
     * @throws { BusinessError } 1017600001 - Unknown error.
     * @throws { BusinessError } 1017600002 - The device type is not supported.
     * @throws { BusinessError } 1017600003 - Parameter verification failed.
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.1.1(19)
     */
    function selectFraudApp(context: common.Context, options?: AntifraudAppOptions): Promise<AntifraudAppResult>;
}
export default antifraudPicker;
