/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024. All rights reserved.
 */
/**
 * @file The module provides the capability to manager nearlink data transfer.
 * @kit NearLinkKit
 */
import type { Callback } from '@ohos.base';
import constant from '@hms.nearlink.constant';
/**
 * Provides methods to operate or manage data transfer of Nearlink.
 *
 * @namespace dataTransfer
 * @syscap SystemCapability.Communication.NearLink.Core
 * @since 5.1.0(18)
 */
declare namespace dataTransfer {
    /**
     * Indicate the connection state.
     *
     * @typedef { constant.ConnectionState }
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    type ConnectionState = constant.ConnectionState;
    /**
     * Creates a Nearlink listen port can receive data by the uuid.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { string } uuid - Indicates application service uuid. For example, 1.Nearlink standard uuid is 2 bytes like "060D",
     * <br>2.app custom uuid is 16 bytes like "FFFFFFFF-FC70-11EA-B720-000078951234".
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700003 - Nearlink is off.
     * @throws { BusinessError } 1009700020 - The UUID is already registered.
     * @throws { BusinessError } 1009700021 - Port is exceeds the upper limit.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    function createPort(uuid: string): void;
    /**
     * Destroy a port listen and releases related resources by uuid.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { string } uuid - Indicates application service uuid. For example, 1.Nearlink standard uuid is 2 bytes like "060D",
     * <br>2.app custom uuid is 16 bytes like "FFFFFFFF-FC70-11EA-B720-000078951234".
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700003 - Nearlink is off.
     * @throws { BusinessError } 1009700022 - The UUID is not registered.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    function destroyPort(uuid: string): void;
    /**
     * Connect to a server, if connect success, can send data to server.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { ConnectionParams} params - Indicates the connection params.
     * @returns { Promise<void> } Returns the promise object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700003 - Nearlink is off.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    function connect(params: ConnectionParams): Promise<void>;
    /**
     * Disconnect or stop an ongoing connection to a server.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { ConnectionParams} params - Indicates the connection params.
     * @returns { Promise<void> } Returns the promise object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700003 - Nearlink is off.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    function disconnect(params: ConnectionParams): Promise<void>;
    /**
     * Subscribe the connection state changed event.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { 'connectionStateChanged' } type - Type of the state change event to listen for.
     * @param { Callback<ConnectionResult> } callback - Callback used to listen for the state change event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    function on(type: 'connectionStateChanged', callback: Callback<ConnectionResult>): void;
    /**
     * Unsubscribe the connection state changed event.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { 'connectionStateChanged' } type - Type of the state change event to listen for.
     * @param { Callback<ConnectionResult> } callback - Callback used to listen for the state change event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    function off(type: 'connectionStateChanged', callback?: Callback<ConnectionResult>): void;
    /**
     * Obtains the connection status for data transfer.
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { ConnectionStateParams } params Parameters used to obtain the connection status.
     * @returns { ConnectionState } Returns the connection status for data transfer.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700003 - NearLink is off.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    function getConnectionState(params: ConnectionStateParams): ConnectionState;
    /**
     * Write data by address and uuid.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { DataParams} params - Indicates the send data params.
     * @returns { Promise<void> } Returns the promise object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700003 - Nearlink is off.
     * @throws { BusinessError } 1009700023 - Write data congest.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    function writeData(params: DataParams): Promise<void>;
    /**
     * Subscribe the event reported when data is read from the port.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { 'readData' } type - Type of the readdata event to listen for.
     * @param { Callback<DataParams> } callback - Callback used to listen for the port read event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    function on(type: 'readData', callback: Callback<DataParams>): void;
    /**
     * Unsubscribe the event reported when data is read from the port.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { 'readData' } type - Type of the readdata event to listen for.
     * @param { Callback<DataParams> } callback - Callback used to listen for the port read event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    function off(type: 'readData', callback?: Callback<DataParams>): void;
    /**
     * Describes the parameters for connection.
     *
     * @typedef ConnectionParams
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    interface ConnectionParams {
        /**
         * Indicates the connect device address.
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        address: string;
        /**
         * Indicates the app connect service id.
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        uuid: string;
        /**
         * Indicates the channel send and receive max data length.
         *
         * @type { ?number }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        mtu?: number;
        /**
         * Data transfer mode. The reliable transfer mode is used by default.
         * @type { ?TransferMode }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        transferMode?: TransferMode;
    }
    /**
     * Describes the parameters for Data.
     *
     * @typedef DataParams
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    interface DataParams {
        /**
         * Indicates the connect device address.
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        address: string;
        /**
         * Indicates the app service id.
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        uuid: string;
        /**
         * Indicates the data buffer.
         *
         * @type { ArrayBuffer }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        data: ArrayBuffer;
    }
    /**
     * Describes the parameters for connection result.
     *
     * @typedef ConnectionResult
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    interface ConnectionResult {
        /**
         * Indicates the connect device address.
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        address: string;
        /**
         * Indicates the app service id.
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        uuid: string;
        /**
         * Indicates the channel send and receive max data length.
         *
         * @type { number }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        mtu: number;
        /**
         * Connection state.
         *
         * @type { ConnectionState }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        state: ConnectionState;
    }
    /**
     * Describe the parameters required to get the connection state.
     *
     * @typedef ConnectionStateParams
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    interface ConnectionStateParams {
        /**
         * Indicates the connect device address.
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        address: string;
        /**
         * Indicates the service uuid.
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        uuid: string;
    }
    /**
     * Data transfer mode enumeration.
     * @enum { number }
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    enum TransferMode {
        /**
         * Basic data transfer mode.
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        BASIC = 0,
        /**
         * Reliable data transfer mode.
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        RELIABLE = 1
    }
}
export default dataTransfer;
