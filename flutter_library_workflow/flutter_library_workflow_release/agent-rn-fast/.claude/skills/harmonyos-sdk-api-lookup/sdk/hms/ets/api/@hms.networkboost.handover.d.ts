/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024. All rights reserved.
 */
/**
 * @file This module provides the capability of netHandover.
 * @kit NetworkBoostKit
 */
import type { Callback } from '@ohos.base';
import connection from '@ohos.net.connection';
import netQuality from '@hms.networkboost.netquality';
/**
 * Provides Network handover APIs.
 * @namespace netHandover
 * @syscap SystemCapability.Communication.NetworkBoost.Core
 * @since 5.0.0(12)
 */
declare namespace netHandover {
    /**
     * Subscribe to the handover state change event.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { 'handoverChange' } type - Type of the handover change state to listen for.
     * @param { Callback<HandoverInfo> } callback - Callback used to listen for the handover change.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    function on(type: 'handoverChange', callback: Callback<HandoverInfo>): void;
    /**
     * Unsubscribe to the handover state change event.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { 'handoverChange' } type - Type of the handover change state to listen for.
     * @param { Callback<HandoverInfo> } callback - Callback used to listen for the handover change.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    function off(type: 'handoverChange', callback?: Callback<HandoverInfo>): void;
    /**
     * Set net handover mode.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { HandoverMode } mode - Mode of the net handover.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    function setHandoverMode(mode: HandoverMode): void;
    /**
     * Get the multi-path quota for the current application.
     *
     * @permission ohos.permission.LINKTURBO
     * @returns { MultiPathQuota } App quota information.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1013600001 - Internal error.
     * @throws { BusinessError } 1013600002 - System service error.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    function getMultiPathQuotaStats(): MultiPathQuota;
    /**
     * Request multi-path.
     *
     * @permission ohos.permission.LINKTURBO
     * @param { Callback<MultiPathRequestResult> } callback - Request result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1013600001 - Internal error.
     * @throws { BusinessError } 1013600002 - System service error.
     * @throws { BusinessError } 1013620000 - Multi-path capability is disabled.
     * @throws { BusinessError } 1013620001 - Multi-path links are already active or in the process of being established.
     * @throws { BusinessError } 1013620002 - App request limit reached.
     * @throws { BusinessError } 1013620003 - Request denied due to power consumption restrictions.
     * @throws { BusinessError } 1013620004 - No quota.
     * @throws { BusinessError } 1013620005 - Conflict.
     * @throws { BusinessError } 1013620006 - Requests are too frequent.
     * @throws { BusinessError } 1013620007 - No suitable path.
     * @throws { BusinessError } 1013620008 - Insufficient traffic.
     * @throws { BusinessError } 1013620009 - Concurrency is not allowed.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    function requestMultiPath(callback: Callback<MultiPathRequestResult>): void;
    /**
     * Release multi path.
     *
     * @permission ohos.permission.LINKTURBO
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1013600001 - Internal error.
     * @throws { BusinessError } 1013600002 - System service error.
     * @throws { BusinessError } 1013620100 - Release request mismatch.
     * @throws { BusinessError } 1013620101 - Multi-path not activated.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    function releaseMultiPath(): void;
    /**
     * Subscribe to the multi-path state change event.
     *
     * @permission ohos.permission.LINKTURBO
     * @param { 'multiPathStateChange' } type - Type of the multi path change to listen for.
     * @param { Callback<MultiPathStateInfo> } callback - Callback used to listen for the multi path change.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1013600001 - Internal error.
     * @throws { BusinessError } 1013600002 - System service error.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    function on(type: 'multiPathStateChange', callback: Callback<MultiPathStateInfo>): void;
    /**
     * Unsubscribe to the multi-path state change event.
     *
     * @permission ohos.permission.LINKTURBO
     * @param { 'multiPathStateChange' } type - Type of the multi path change to listen for.
     * @param { Callback<MultiPathStateInfo> } [callback] - Callback used to listen for the multi path change.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1013600001 - Internal error.
     * @throws { BusinessError } 1013600002 - System service error.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    function off(type: 'multiPathStateChange', callback?: Callback<MultiPathStateInfo>): void;
    /**
     * Subscribe to the multi-path recommendation event.
     *
     * @permission ohos.permission.LINKTURBO
     * @param { 'multiPathRecommendation' } type - Type of the multi path recommendation to listen for.
     * @param { Callback<MultiPathRecommendationInfo> } callback - Callback used to listen
     *     for the multi path recommendation.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1013600001 - Internal error.
     * @throws { BusinessError } 1013600002 - System service error.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    function on(type: 'multiPathRecommendation', callback: Callback<MultiPathRecommendationInfo>): void;
    /**
     * Unsubscribe to the multi-path recommendation event.
     *
     * @permission ohos.permission.LINKTURBO
     * @param { 'multiPathRecommendation' } type - Type of the multi path recommendation to listen for.
     * @param { Callback<MultiPathRecommendationInfo> } [callback] - Callback used to listen
     *     for the multi path recommendation.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1013600001 - Internal error.
     * @throws { BusinessError } 1013600002 - System service error.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    function off(type: 'multiPathRecommendation', callback?: Callback<MultiPathRecommendationInfo>): void;
    /**
     * Callbacks to device on various events during handover.
     * @typedef HandoverInfo
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    interface HandoverInfo {
        /**
         * HandoverStart info.
         * @type { ?HandoverStart }
         * @readonly
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        readonly handoverStart?: HandoverStart;
        /**
         * HandoverComplete info.
         * @type { ?HandoverComplete }
         * @readonly
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        readonly handoverComplete?: HandoverComplete;
    }
    /**
     * Handover start info.
     * @typedef HandoverStart
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    interface HandoverStart {
        /**
         * Timeout of handover, in seconds.
         * @type { number }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        expires: number;
        /**
         * Data speed action on old path.
         * @type { DataSpeedAction }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        dataSpeedAction: DataSpeedAction;
    }
    /**
     * Data speed action info.
     * @typedef DataSpeedAction
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    interface DataSpeedAction {
        /**
         * Data speed simple action.
         * @type { netQuality.DataSpeedSimpleAction }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        dataSpeedSimpleAction: netQuality.DataSpeedSimpleAction;
        /**
         * Uplink bandwidth.
         * @type { netQuality.RateBps }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        linkUpBandwidth: netQuality.RateBps;
        /**
         * Downlink bandwidth.
         * @type { netQuality.RateBps }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        linkDownBandwidth: netQuality.RateBps;
    }
    /**
     * Handover complete info.
     * @typedef HandoverComplete
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    interface HandoverComplete {
        /**
         * Handover result.
         * @type { ErrorResult }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        result: ErrorResult;
        /**
         * Whether is still new path to be activated, if value set to false, means the last new path.
         * @type { boolean }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        handoverContinue: boolean;
        /**
         * Old path lifetime in seconds.
         * @type { number }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        oldPathLifetime: number;
        /**
         * Data speed action on old path.
         * @type { DataSpeedAction }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        oldDataSpeedAction: DataSpeedAction;
        /**
         * Whether pathType changed.
         * @type { boolean }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        pathTypeChanged: boolean;
        /**
         * New path netHandle.
         * @type { ?connection.NetHandle }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        newNetHandle?: connection.NetHandle;
        /**
         * ReEst action.
         * @type { ReEstAction }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        reEstAction: ReEstAction;
        /**
         * Data speed action on new path.
         * @type { DataSpeedAction }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        newDataSpeedAction: DataSpeedAction;
    }
    /**
     * Multi-path quota info.
     * @typedef MultiPathQuotaInfo
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    interface MultiPathQuotaInfo {
        /**
         * Count.
         * @type { number }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        count: number;
        /**
         * Duration.
         * @type { number }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        duration: number;
    }
    /**
     * Multi-path quota.
     * @typedef MultiPathQuota
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    interface MultiPathQuota {
        /**
         * Used quota.
         * @type { MultiPathQuotaInfo }
         * @readonly
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        readonly used: MultiPathQuotaInfo;
        /**
         * Remaining quota.
         * @type { MultiPathQuotaInfo }
         * @readonly
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        readonly remaining: MultiPathQuotaInfo;
    }
    /**
     * Multi-path recommendation info.
     * @typedef MultiPathRecommendationInfo
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    interface MultiPathRecommendationInfo {
        /**
         * Recommendation action.
         * @type { MultiPathAction }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        action: MultiPathAction;
    }
    /**
     * Multi-path request result.
     * @typedef MultiPathRequestResult
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    interface MultiPathRequestResult {
        /**
         * Request result.
         * @type { MultiPathErrorResult }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        result: MultiPathErrorResult;
    }
    /**
     * Multi-path state change.
     * @typedef MultiPathStateInfo
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    interface MultiPathStateInfo {
        /**
         * Multi path state.
         * @type { MultiPathState }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        multiPathState: MultiPathState;
        /**
         * Multi-path state change cause.
         * @type { MultiPathChangeCause }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        cause: MultiPathChangeCause;
        /**
         * NetHandle of the changed path.
         * @type { connection.NetHandle }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        netHandle: connection.NetHandle;
        /**
         * Path state.
         * @type { PathState }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        pathState: PathState;
        /**
         * Path type.
         * @type { netQuality.PathType }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        pathType: netQuality.PathType;
    }
    /**
     * Enum of Handover mode.
     * @enum { number }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    enum HandoverMode {
        /**
         * Handover is triggered by the OS, and the OS activates the new path. This is the default value.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        DELEGATION = 0,
        /**
         * Handover is not triggered by the OS, app activates the new path itself,
         * however, when the app is in the background, handover may triggered by the OS.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        DISCRETION = 1
    }
    /**
     * Enum of the re-establish action.
     * @enum { number }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    enum ReEstAction {
        /**
         * The App needs to re-establish the connection through the same remote IP address.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        DEFAULT = 0,
        /**
         * Data path type changed, e.g. wifi -> cell, or operator changed.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        QUERY_DNS = 1,
        /**
         * The remote IP needs to be changed, and the App needs to re-establish the connection using the new remote IP.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        CHANGE_REMOTE_IP = 2,
        /**
         * The IP version needs to be changed, e.g. ipv4 <-> ipv6.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        CHANGE_IP_VERSION = 3,
        /**
         * The data path and IP do not change. The App needs to retry to fetch the resource from the remote in the current connection.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        NO_EST = 4
    }
    /**
     * Enum of handover error result.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 5.0.0(12)
     */
    enum ErrorResult {
        /**
         * Indicates no error, handover is success.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        ERROR_NONE = 0,
        /**
         * Indicates handover timeout.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        ERROR_HANDOVER_TIMEOUT = 1,
        /**
         * Indicates that the activation of the new path has failed.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        ERROR_NEW_PATH_ACTIVATION_FAILED = 2,
        /**
         * Indicates handover abort.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 5.0.0(12)
         */
        ERROR_ABORT = 3
    }
    /**
     * Enum of Path state.
     * @enum { number }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    enum PathState {
        /**
         * Path state is idle, it can be activited.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        PATH_IDLE = 0,
        /**
         * Path has been activited.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        PATH_CONNECTED = 1,
        /**
         * Path has been suspended, indicate link normal, but can not transfer data.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        PATH_SUSPENDED = 2
    }
    /**
     * Enum of Multi-path state.
     * @enum { number }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    enum MultiPathState {
        /**
         * Multi-path state is idle.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_IDLE = 0,
        /**
         * Indicates multi-path creation is in progress.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CREATING = 1,
        /**
         * Indicates multi-path has been created and is available.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CREATED = 2,
        /**
         * Indicates multi-path is releasing.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_RELEASING = 3
    }
    /**
     * Enum of Multi-Path error result.
     * @enum { number }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    enum MultiPathErrorResult {
        /**
         * No error.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_ERROR_NONE = 0,
        /**
         * Refused by network.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_ERROR_NETWORK_REFUSED = 1,
        /**
         * Active timeout.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_ERROR_TIMEOUT = 2,
        /**
         * Active failed because user disable mobile data switch or other local abnormal occurred during activing process.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_ERROR_LOCAL = 3
    }
    /**
     * Enum of Multi-Path change cause.
     * @enum { number }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    enum MultiPathChangeCause {
        /**
         * Normal request.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CHANGE_CAUSE_REQUEST_NORMAL = 0,
        /**
         * App release normally.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CHANGE_CAUSE_RELEASE_NORMAL = 50,
        /**
         * Released by network.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CHANGE_CAUSE_RELEASE_NETWORK = 51,
        /**
         * Released by ueser, for example, user turns off mobile data switch, WiFi switch, etc.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CHANGE_CAUSE_RELEASE_USER_REFUSED = 52,
        /**
         * Released cause application quota has been exhausted.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CHANGE_CAUSE_RELEASE_NO_QUOTA = 53,
        /**
         * Released cause power consumption restrictions.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CHANGE_CAUSE_RELEASE_POWER_CONSUMPTION = 54,
        /**
         * Released cause insufficient traffic control.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CHANGE_CAUSE_RELEASE_INSUFFICIENT_TRAFFIC = 55,
        /**
         * Released cause multi-path conflict.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CHANGE_CAUSE_RELEASE_CONFLICT = 56,
        /**
         * Released cause system fuse, such as malicious use of multi-path by applications.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CHANGE_CAUSE_RELEASE_SYS_FUSING = 57,
        /**
         * Released cause system network state change.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CHANGE_CAUSE_RELEASE_SYS_DEFAULT = 99,
        /**
         * Suspended cause can not concurrency.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CHANGE_CAUSE_SUSPEND_ENTER = 100,
        /**
         * Cancel suspended cause can concurrency.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CHANGE_CAUSE_SUSPEND_LEAVE = 101,
        /**
         * Multi-path connect properties change, such as IP change etc.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_CHANGE_CAUSE_CONN_PROPERTIES_UPDATE = 102
    }
    /**
     * Enum of multi-path action.
     * @enum { number }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    enum MultiPathAction {
        /**
         * Request multi-path.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_ACTION_REQUEST = 0,
        /**
         * Release multi-path.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        MULTIPATH_ACTION_RELEASE = 1
    }
}
export default netHandover;
