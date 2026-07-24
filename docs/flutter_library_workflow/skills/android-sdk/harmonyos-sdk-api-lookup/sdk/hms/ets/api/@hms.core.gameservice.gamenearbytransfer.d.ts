/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Defines the capabilities of GameServiceKit.
 * @kit GameServiceKit
 */
import type { Callback } from '@ohos.base';
import type common from '@ohos.app.ability.common';
/**
 * This module provides the nearby transfer capability for game apps.
 *
 * @namespace gameNearbyTransfer
 * @syscap SystemCapability.GameService.GameNearby
 * @since 5.1.0(18)
 */
declare namespace gameNearbyTransfer {
    /**
     * Creation parameters.
     *
     * @typedef CreateParameters
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    interface CreateParameters {
        /**
         * Module name.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        moduleName: string;
        /**
         * Ability name.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        abilityName: string;
        /**
         * If need show UI of system.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        needShowSystemUI?: boolean;
        /**
         * Context of the ability. When needShowSystemUI is set to true, the context is mandatory.
         *
         * @type { ?common.UIAbilityContext }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        context?: common.UIAbilityContext;
        /**
         * Connection mode.
         *
         * @type { ?Mode }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 6.0.0(20)
         */
        mode?: Mode;
    }
    /**
     * Connection-related notification.
     *
     * @typedef ConnectNotification
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    interface ConnectNotification {
        /**
         * Connection status.
         *
         * @type { ConnectState }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        connectState: ConnectState;
        /**
         * Connection result.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        message?: string;
        /**
         * Name of the remote device.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        remoteDeviceName?: string;
    }
    /**
     * Parameters for binding to the nearby transfer service.
     *
     * @typedef BindParameters
     * @syscap SystemCapability.GameService.GameNearby
     * @since 6.0.0(20)
     */
    interface BindParameters {
        /**
         * Device ID.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 6.0.0(20)
         */
        deviceId: string;
        /**
         * Network ID of the device.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 6.0.0(20)
         */
        networkId: string;
    }
    /**
     * Information about discovered devices.
     *
     * @typedef NearbyGameDevice
     * @syscap SystemCapability.GameService.GameNearby
     * @since 6.0.0(20)
     */
    interface NearbyGameDevice {
        /**
         * Device name.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 6.0.0(20)
         */
        deviceName: string;
        /**
         * Device ID.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 6.0.0(20)
         */
        deviceId: string;
        /**
         * Network ID of the device.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 6.0.0(20)
         */
        networkId: string;
    }
    /**
     * Discovery result.
     *
     * @typedef DiscoveryResult
     * @syscap SystemCapability.GameService.GameNearby
     * @since 6.0.0(20)
     */
    interface DiscoveryResult {
        /**
         * devices list of nearbyGame.
         *
         * @type { Array<NearbyGameDevice> }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 6.0.0(20)
         */
        nearbyGameDevices: Array<NearbyGameDevice>;
    }
    /**
     * Enumerates connection modes for the nearby transfer service.
     *
     * @enum { number }
     * @syscap SystemCapability.GameService.GameNearby
     * @since 6.0.0(20)
     */
    enum Mode {
        /**
         * API mode.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 6.0.0(20)
         */
        API = 1,
        /**
         * Knock mode.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 6.0.0(20)
         */
        KNOCK = 2
    }
    /**
     * Creation result.
     *
     * @typedef CreateResult
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    interface CreateResult {
        /**
         * Name of the local device.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        localDeviceName: string;
    }
    /**
     * Connection status.
     *
     * @enum { number }
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    enum ConnectState {
        /**
         * A connection has been established.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        CONNECTED = 0,
        /**
         * Disconnected.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        DISCONNECTED = 1
    }
    /**
     * Transfer-related notification.
     *
     * @typedef TransferNotification
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    interface TransferNotification {
        /**
         * Package transfer status.
         *
         * @type { TransferState }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        transferState: TransferState;
        /**
         * Package transfer information.
         *
         * @type { TransferInfo }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        transferInfo: TransferInfo;
        /**
         * File storage path.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        fileStoragePath?: string;
    }
    /**
     * Package transfer status.
     *
     * @enum { number }
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    enum TransferState {
        /**
         * About to start sending.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        SEND_START = 0,
        /**
         * Sending.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        SEND_PROCESS = 1,
        /**
         * Sending is complete.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        SEND_FINISH = 2,
        /**
         * Sending error.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        SEND_ERROR = 3,
        /**
         * Receiving has started.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        RECEIVE_START = 4,
        /**
         * Receiving.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        RECEIVE_PROCESS = 5,
        /**
         * Receive finished.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        RECEIVE_FINISH = 6,
        /**
         * Receiving error.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        RECEIVE_ERROR = 7
    }
    /**
     * File information.
     *
     * @typedef FileInfo
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    interface FileInfo {
        /**
         * File path.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        path: string;
        /**
         * File hash value.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        hash?: string;
    }
    /**
     * Package information.
     *
     * @typedef PackageInfo
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    interface PackageInfo {
        /**
         * Package name.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        name?: string;
        /**
         * Version.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        version?: string;
        /**
         * File list.
         *
         * @type { ?Array<FileInfo> }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        files?: Array<FileInfo>;
        /**
         * Extra data of package.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        extraData?: string;
    }
    /**
     * Package file information.
     *
     * @typedef PackageFile
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    interface PackageFile {
        /**
         * Source file path.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        srcPath: string;
        /**
         * Target file path.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        destPath: string;
    }
    /**
     * Package data.
     *
     * @typedef PackageData
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    interface PackageData {
        /**
         * Package name.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        name?: string;
        /**
         * Version.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        version?: string;
        /**
         * Package file list.
         *
         * @type { Array<PackageFile> }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        files: Array<PackageFile>;
    }
    /**
     * Returned result.
     *
     * @typedef ReturnResult
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    interface ReturnResult {
        /**
         * Return code.
         *
         * @type { number }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        code: number;
        /**
         * Returned message.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        message?: string;
    }
    /**
     * Result code.
     *
     * @enum { number }
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    enum PackageInfoResultCode {
        /**
         * Error.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        ERROR = -1,
        /**
         * The package is found available after comparison.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        PACKAGE_AVAILABLE_COMPARED = 0,
        /**
         * The package is found unavailable after comparison.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        PACKAGE_UNAVAILABLE_COMPARED = 1
    }
    /**
     * Package comparison result.
     *
     * @typedef PackageInfoResult
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    interface PackageInfoResult {
        /**
         * Result code.
         *
         * @type { PackageInfoResultCode }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        packageInfoResultCode: PackageInfoResultCode;
        /**
         * Returned message.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        message?: string;
    }
    /**
     * Transfer-related information.
     *
     * @typedef TransferInfo
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    interface TransferInfo {
        /**
         * Expected transfer duration, in seconds.
         *
         * @type { number }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        expectedTime: number;
        /**
         * Size of the already transferred portion of the package, in bytes.
         *
         * @type { number }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        transferredPackageSize: number;
        /**
         * Total size of package to be transferred, in bytes.
         *
         * @type { number }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        totalPackageSize: number;
        /**
         * Transfer speed, in bytes/second.
         *
         * @type { number }
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        rate: number;
    }
    /**
     * Enumerated nearby transfer error codes.
     *
     * @enum { number }
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    enum NearbyTransferErrorCode {
        /**
         * System internal error.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        INTERNAL_ERROR = 1018300001,
        /**
         * Authentication failed.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        AUTH_FAILED = 1018300002,
        /**
         * Invalid request.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        INVALID_REQUEST = 1018300003,
        /**
         * No service available.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        NO_SERVICE_AVAILABLE = 1018300004,
        /**
         * The wireless network and Bluetooth should be enabled at the same time.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        WLAN_BLUETOOTH_MUST_BE_ON = 1018300005,
        /**
         * Publish failed.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        PUBLISH_FAILED = 1018300006,
        /**
         * Discovery failed.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 5.1.0(18)
         */
        DISCOVERY_FAILED = 1018300007,
        /**
         * Invalid parameter.
         *
         * @syscap SystemCapability.GameService.GameNearby
         * @since 6.0.0(20)
         */
        INVALID_PARAMETER = 1018300008
    }
    /**
     * Subscribes to the connection notification event. The callback function will be executed when the trigger conditions
     * are met.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'connectNotify' } type - Type of the monitored event.
     * @param { Callback<ConnectNotification> } callback - The callback function will be executed when the event is
     *     triggered.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 3. Parameter verification failed.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function on(type: 'connectNotify', callback: Callback<ConnectNotification>): void;
    /**
     * Unsubscribes from the connection notification event.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'connectNotify' } type - Type of the monitored event.
     * @param { Callback<ConnectNotification> } [callback] - If this parameter is specified, only the specified subscriber
     *     will be canceled. Otherwise, all subscribers will be canceled.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 3. Parameter verification failed.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function off(type: 'connectNotify', callback?: Callback<ConnectNotification>): void;
    /**
     * Subscribes to the device discovery event. The callback function will be executed when the trigger conditions are
     * met.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'discovery' } type - Type of the monitored event.
     * @param { Callback<DiscoveryResult> } callback - The callback function will be executed when the event is triggered.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1018300008 - Invalid parameter.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 6.0.0(20)
     */
    function on(type: 'discovery', callback: Callback<DiscoveryResult>): void;
    /**
     * Unsubscribes from the discovery result event.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'discovery' } type - Type of the monitored event.
     * @param { Callback<DiscoveryResult> } [callback] - If this parameter is specified, only the specified subscriber
     *     will be canceled. Otherwise, all subscribers will be canceled.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1018300008 - Invalid parameter.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 6.0.0(20)
     */
    function off(type: 'discovery', callback?: Callback<DiscoveryResult>): void;
    /**
     * Subscribes to the event that receives package information. The callback function will be executed when the trigger
     * conditions are met.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'receivePackageInfo' } type - Type of the monitored event.
     * @param { Callback<PackageInfo> } callback - The callback function will be executed when the event is triggered.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 3. Parameter verification failed.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function on(type: 'receivePackageInfo', callback: Callback<PackageInfo>): void;
    /**
     * Unsubscribes from the event that receives package information.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'receivePackageInfo' } type - Type of the monitored event.
     * @param { Callback<PackageInfo> } [callback] - If this parameter is specified, only the specified subscriber will be
     *     canceled. Otherwise, all subscribers will be canceled.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 3. Parameter verification failed.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function off(type: 'receivePackageInfo', callback?: Callback<PackageInfo>): void;
    /**
     * Subscribes to the transfer notification event. The callback function will be executed when the trigger conditions
     * are met.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'transferNotify' } type - Type of the monitored event.
     * @param { Callback<TransferNotification> } callback - The callback function will be executed when the event is
     *     triggered.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 3. Parameter verification failed.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function on(type: 'transferNotify', callback: Callback<TransferNotification>): void;
    /**
     * Unsubscribes from the transfer notification event.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'transferNotify' } type - Type of the monitored event.
     * @param { Callback<TransferNotification> } [callback] - If this parameter is specified, only the specified
     *     subscriber will be canceled. Otherwise, all subscribers will be canceled.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 3. Parameter verification failed.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function off(type: 'transferNotify', callback?: Callback<TransferNotification>): void;
    /**
     * Subscribes to the error event. The callback function will be executed when the trigger conditions are met.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'error' } type - Type of the monitored event.
     * @param { Callback<ReturnResult> } callback - The callback function will be executed when the event is triggered.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 3. Parameter verification failed.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function on(type: 'error', callback: Callback<ReturnResult>): void;
    /**
     * Unsubscribes from the error event.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'error' } type - Type of the monitored event.
     * @param { Callback<ReturnResult> } [callback] - If this parameter is specified, only the specified subscriber will
     *     be canceled. Otherwise, all subscribers will be canceled.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 3. Parameter verification failed.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function off(type: 'error', callback?: Callback<ReturnResult>): void;
    /**
     * Creates a nearby transfer service for games.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { CreateParameters } createParameters - Set create parameters.
     * @returns { Promise<CreateResult> } Return the creation result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 3. Parameter verification failed.
     * @throws { BusinessError } 1018300001 - System internal error.
     * @throws { BusinessError } 1018300002 - Authentication failed.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function create(createParameters: CreateParameters): Promise<CreateResult>;
    /**
     * Publishes the nearby transfer service.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1018300001 - System internal error.
     * @throws { BusinessError } 1018300003 - Invalid request.
     * @throws { BusinessError } 1018300005 - The wireless network and Bluetooth should be enabled at the same time.
     * @throws { BusinessError } 1018300006 - Publishing failed.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function publishNearbyGame(): Promise<void>;
    /**
     * Discovers the nearby transfer service.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1018300001 - System internal error.
     * @throws { BusinessError } 1018300003 - Invalid request.
     * @throws { BusinessError } 1018300005 - The wireless network and Bluetooth should be enabled at the same time.
     * @throws { BusinessError } 1018300007 - Discovery failed.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 6.0.0(20)
     */
    function discoveryNearbyGame(): Promise<void>;
    /**
     * Binds to the nearby transfer service.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { BindParameters } bindParameters - Parameters for binding to the nearby transfer service.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1018300001 - System internal error.
     * @throws { BusinessError } 1018300003 - Invalid request.
     * @throws { BusinessError } 1018300005 - The wireless network and Bluetooth should be enabled at the same time.
     * @throws { BusinessError } 1018300008 - Invalid parameter.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 6.0.0(20)
     */
    function bindNearbyGame(bindParameters: BindParameters): Promise<void>;
    /**
     * Automatically binds to the nearby transfer service.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1018300001 - System internal error.
     * @throws { BusinessError } 1018300003 - Invalid request.
     * @throws { BusinessError } 1018300007 - Discovery failed.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function autoBindNearbyGame(): Promise<void>;
    /**
     * Receives collaboration requests.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { Record<string, object> } acceptParameters - Set the parameters for receiving requests.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 3. Parameter verification failed.
     * @throws { BusinessError } 1018300001 - System internal error.
     * @throws { BusinessError } 1018300003 - Invalid request.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function acceptCollaboration(acceptParameters: Record<string, object>): Promise<void>;
    /**
     * Sends package information.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { PackageInfo } packageInfo - Package information.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 3. Parameter verification failed.
     * @throws { BusinessError } 1018300001 - System internal error.
     * @throws { BusinessError } 1018300003 - Invalid request.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function sendPackageInfo(packageInfo: PackageInfo): Promise<void>;
    /**
     * Reply package info compare result.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { PackageInfoResult } packageInfoResult - Package info compare result.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 3. Parameter verification failed.
     * @throws { BusinessError } 1018300001 - System internal error.
     * @throws { BusinessError } 1018300003 - Invalid request.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function replyPackageInfoResult(packageInfoResult: PackageInfoResult): Promise<void>;
    /**
     * Transfer package data.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { PackageData } packageData - Package data.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 3. Parameter verification failed.
     * @throws { BusinessError } 1018300001 - System internal error.
     * @throws { BusinessError } 1018300003 - Invalid request.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function transferPackageData(packageData: PackageData): Promise<void>;
    /**
     * Destroys the nearby transfer service.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - Permission denied.
     * @syscap SystemCapability.GameService.GameNearby
     * @since 5.1.0(18)
     */
    function destroy(): Promise<void>;
}
export default gameNearbyTransfer;
