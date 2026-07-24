/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2025. All rights reserved.
 */
/**
 * @file Defines huaweishare capability.
 * @kit ShareKit
 */
import systemShare from '@hms.collaboration.systemShare';
import type { Callback } from '@ohos.base';
/**
 * Provide methods make the host (data owner) application can conveniently wrap shared data,
 * do the device to device huaweiShare.
 *
 * @namespace harmonyShare
 * @syscap SystemCapability.Collaboration.HarmonyShare
 * @stagemodelonly
 * @since 5.0.0(12)
 */
declare namespace harmonyShare {
    /**
     * HuaweiShare error code.
     *
     * @enum { number }
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    enum SharableErrorCode {
        /**
         * No content error
         *
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        NO_CONTENT_ERROR = 1,
        /**
         * no internet error.
         *
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        NO_INTERNET_ERROR = 2,
        /**
         * download error.
         *
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        DOWNLOAD_ERROR = 3
    }
    /**
     * Sharing result code.
     *
     * @enum { number }
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    enum ShareResultCode {
        /**
         * Shared successfully.
         *
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        SHARE_SUCCESS = 0,
        /**
         * Failed to send data.
         *
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        SEND_FAILED = 1,
        /**
         * Data sending is canceled by the sender.
         *
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        CANCEL_BY_SENDER = 2,
        /**
         * Data sending is canceled by the receiver.
         *
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        CANCEL_BY_RECEIVER = 3
    }
    /**
     * The transmit result base interface.
     *
     * @typedef TransferBaseResults
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface TransferBaseResults {
        /**
         * Called when the sharing ends.
         *
         * @type { ?Callback<ShareResultCode> }
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        onResult?: Callback<ShareResultCode>;
    }
    /**
     * Callback API for data receiving.
     *
     * @extends TransferBaseResults
     * @typedef ReceiveCallback
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface ReceiveCallback extends TransferBaseResults {
        /**
         * Process when the data received.
         *
         * @type { Callback<systemShare.SharedData> }
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        onDataReceived: Callback<systemShare.SharedData>;
    }
    /**
     * The updated share data interface.
     *
     * @typedef UpdatedData
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface UpdatedData {
        /**
         * URI used for preview.
         *
         * @type { ?string }
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        thumbnailUri?: string;
    }
    /**
     * Describe the huaweiShare method.
     * @typedef SharableTarget
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface SharableTarget {
        /**
         * Start the huaweiShare with shared data
         *
         * @param { systemShare.SharedData } data - host application's shared data
         * @returns { Promise<void> } - returns promise void.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        share(data: systemShare.SharedData): Promise<void>;
        /**
         * Reject huaweiShare with shared error
         *
         * @param { SharableErrorCode } error - reject error message
         * @returns { Promise<void> } - returns promise void.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        reject(error: SharableErrorCode): Promise<void>;
        /**
         * Updates the sharedata for this sharing.
         *
         * @param { UpdatedData } data - The updated share data.
         * @returns { Promise<void> } - returns promise void.
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        updateShareData(data: UpdatedData): Promise<void>;
    }
    /**
     * the receive capability.
     *
     * @typedef RecvCapability
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface RecvCapability {
        /**
         * utd type.
         *
         * @type { string }
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        utd: string;
        /**
         * max support number.
         *
         * @type { number }
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        maxSupportedCount: number;
    }
    /**
     * General registration options.
     *
     * @typedef BaseCapabilityRegistry
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface BaseCapabilityRegistry {
        /**
         * The windows id shoud used when registry for multiWindows
         *
         * @type { number }
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        windowId: number;
    }
    /**
     * The receive function registration options.
     *
     * @extends BaseCapabilityRegistry
     * @typedef RecvCapabilityRegistry
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface RecvCapabilityRegistry extends BaseCapabilityRegistry {
        /**
         * receive capability.
         *
         * @type { RecvCapability[] }
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        capabilities: RecvCapability[];
    }
    /**
     * The send function registration options.
     *
     * @extends BaseCapabilityRegistry
     * @typedef SendCapabilityRegistry
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface SendCapabilityRegistry extends BaseCapabilityRegistry {
        /**
         * Whether an app can both send and receive data.
         * If APP does not support both data sending and receiving, the value of sendOnly is true, otherwise no need to set.
         *
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        sendOnly?: boolean;
    }
    /**
     * HuaweiShare receive error code.
     *
     * @enum { number }
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    enum ReceivableErrorCode {
        /**
         * The app cannot receive data currently.
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        NO_RECEIVABLE_ERROR = 1
    }
    /**
     * The ReceivableTarget interface.
     *
     * @typedef ReceivableTarget
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface ReceivableTarget {
        /**
         * Starts data receiving.
         *
         * @param { string } receiveUri - the receive path Uri.
         * @param { ReceiveCallback } callback - Called when sharing has a result.
         * @returns { Promise<void> } - returns promise void.
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        receive(receiveUri: string, callback: ReceiveCallback): Promise<void>;
        /**
         * Reject huaweiShare receive with shared error
         *
         * @param { ReceivableErrorCode } error - reject error code.
         * @returns { Promise<void> } - returns promise void.
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        reject(error: ReceivableErrorCode): Promise<void>;
    }
    /**
     * Register the knockShare event callback.
     *
     * @param { 'knockShare' } event - knockShare event.
     * @param { Callback<SharableTarget> } callback - Called when resource can be shared.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function on(event: 'knockShare', callback: Callback<SharableTarget>): void;
    /**
     * Cancel the knockShare event registered through { @link on }.
     *
     * @param { 'knockShare' } event - canceled event.
     * @param { Callback<SharableTarget> } [callback] - Called when callback unregister.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function off(event: 'knockShare', callback?: Callback<SharableTarget>): void;
    /**
     * Register the knockShare multiWindows Share event callback.
     *
     * @param { 'knockShare' } event - knockShare Share event.
     * @param { Callback<SharableTarget> } callback - Called when resource can be shared.
     * @param { SendCapabilityRegistry } capability - register options.
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function on(event: 'knockShare', capability: SendCapabilityRegistry, callback: Callback<SharableTarget>): void;
    /**
     * Cancel the knockShare multiWindows share event registered through { @link on }.
     *
     * @param { 'knockShare' } event - canceled event.
     * @param { Callback<SharableTarget> } [callback] - Called when callback unregister.
     * @param { SendCapabilityRegistry } capability - register options.
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function off(event: 'knockShare', capability: SendCapabilityRegistry, callback?: Callback<SharableTarget>): void;
    /**
     * Register the gesturesShare Share event callback.
     *
     * @param { 'gesturesShare' } event - gesturesShare Share event.
     * @param { Callback<SharableTarget> } callback - Called when resource can be shared.
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function on(event: 'gesturesShare', callback: Callback<SharableTarget>): void;
    /**
     * Cancels the registration of the grab & drop event.
     * @param { 'gesturesShare' } event  Event to be canceled.
     * @param { Callback<SharableTarget> } [callback]  Cancellation callback.
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function off(event: 'gesturesShare', callback?: Callback<SharableTarget>): void;
    /**
     * Register the gesturesShare multiWindows Share event callback.
     *
     * @param { 'gesturesShare' } event - gesturesShare Share event.
     * @param { Callback<SharableTarget> } callback - Called when resource can be shared.
     * @param { SendCapabilityRegistry } capability - register options.
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function on(event: 'gesturesShare', capability: SendCapabilityRegistry, callback: Callback<SharableTarget>): void;
    /**
     * Cancel the gesturesShare multiWindows share event registered through { @link on }.
     *
     * @param { 'gesturesShare' } event - canceled event.
     * @param { Callback<SharableTarget> } [callback] - Called when callback unregister.
     * @param { SendCapabilityRegistry } capability - register options.
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function off(event: 'gesturesShare', capability: SendCapabilityRegistry, callback?: Callback<SharableTarget>): void;
    /**
     * Registers a callback for data receiving.
     *
     * @param { 'dataReceive' } event  Data receiving event.
     * @param { Callback<ReceivableTarget> } callback  Called when the data can be received.
     * @param { RecvCapabilityRegistry } capability  Registration options.
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function on(event: 'dataReceive', capability: RecvCapabilityRegistry, callback: Callback<ReceivableTarget>): void;
    /**
     * Cancel register the date receive event callback.
     *
     * @param { 'dataReceive' } event - the receive event.
     * @param { Callback<ReceivableTarget> } [callback] - Called when resource can be shared.
     * @param { RecvCapabilityRegistry } capability - register options.
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function off(event: 'dataReceive', capability: RecvCapabilityRegistry, callback?: Callback<ReceivableTarget>): void;
}
export default harmonyShare;
