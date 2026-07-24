/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024. All rights reserved.
 */
/**
 * @file The module provides the capability to manager nearlink devices.
 * @kit NearLinkKit
 */
import type { Callback } from '@ohos.base';
import constant from '@hms.nearlink.constant';
/**
 * Provides methods to manage NearLink devices.
 *
 * @namespace manager
 * @syscap SystemCapability.Communication.NearLink.Core
 * @since 5.0.1(13)
 */
declare namespace manager {
    /**
     * Indicate the pairing state.
     *
     * @typedef { constant.PairingState }
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    type PairingState = constant.PairingState;
    /**
     * Indicate the connection state.
     *
     * @typedef { constant.ConnectionState }
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    type ConnectionState = constant.ConnectionState;
    /**
     * ACB connection status.
     * @typedef { constant.AcbState }
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    type AcbState = constant.AcbState;
    /**
     * Get the Nearlink state.
     *
     * @returns { NearlinkState } Returns the Nearlink state.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    function getState(): NearlinkState;
    /**
     * Get local device's name.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @returns { string } Returns the device's name.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700003 - Nearlink is off.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    function getLocalName(): string;
    
    /**
     * Get the list of devices that have been paired with the current device.
     * If the user has the ohos.permission.GET_NEARLINK_PEER_MAC permission, the real device address is returned.
     * Otherwise, a random device address is returned.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @returns { Array<string> } Returns a list of paired devices's address.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700003 - Nearlink is off.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 6.0.1(21)
     */
    function getPairedDevices(): Array<string>;
    /**
     * Subscribe the state change event.
     *
     * @param { 'stateChange' } type - Type of the state change event to listen for.
     * @param { Callback<NearlinkState> } callback - Callback used to listen for the state change event.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    function on(type: 'stateChange', callback: Callback<NearlinkState>): void;
    /**
     * Unsubscribe the state change event.
     *
     * @param { 'stateChange' } type - Type of the state change event to listen for.
     * @param { Callback<NearlinkState> } callback - Callback used to listen for the state change event.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    function off(type: 'stateChange', callback?: Callback<NearlinkState>): void;
    /**
     * Subscribe the Nearlink pairing state change event.
     * If the user has the ohos.permission.GET_NEARLINK_PEER_MAC permission, the real device address is returned.
     * Otherwise, a random device address is returned.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { 'pairingStateChange' } type - Indicate the NearLink pairing state change event.
     * @param { Callback<PairingStateParam> } callback - Callback function used to listen for the pair state event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    function on(type: 'pairingStateChange', callback: Callback<PairingStateParam>): void;
    /**
     * Unsubscribe the Nearlink pairing state change event.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { 'pairingStateChange' } type - Indicate the NearLink pairing state change event.
     * @param { Callback<PairingStateParam> } callback - Callback function used to listen for the pair state event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    function off(type: 'pairingStateChange', callback?: Callback<PairingStateParam>): void;
    /**
     * Subscribe the Nearlink connection state change event.
     * If the user has the ohos.permission.GET_NEARLINK_PEER_MAC permission, the real device address is returned.
     * Otherwise, a random device address is returned.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { 'connectionStateChange' } type - Type of the connection state changes event to listen for.
     * @param { Callback<ConnectionStateParam> } callback - Callback used to listen for event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    function on(type: 'connectionStateChange', callback: Callback<ConnectionStateParam>): void;
    /**
     * Unsubscribe the Nearlink connection state change event.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { 'connectionStateChange' } type - Type of the connection state changes event to listen for.
     * @param { Callback<ConnectionStateParam> } callback - Callback used to listen for event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    function off(type: 'connectionStateChange', callback?: Callback<ConnectionStateParam>): void;
    /**
     * Subscribes to the NearLink ACB connection status change event. ACB uses an asynchronous bidirectional link.
     * If the user has the ohos.permission.GET_NEARLINK_PEER_MAC permission, the real device address will be returned.
     * Otherwise, a random device address will be returned.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { 'acbStateChange' } type - Type of the ACB connection status change event to be listened to.
     * @param { Callback<AcbStateParam> } callback - Callback of the event to be listened to.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    function on(type: 'acbStateChange', callback: Callback<AcbStateParam>): void;
    /**
     * Unsubscribes from the NearLink ACB connection status change event.
     *
     * @permission ohos.permission.ACCESS_NEARLINK
     * @param { 'acbStateChange' } type - Type of the ACB connection status change event to be listened to.
     * @param { Callback<AcbStateParam> } callback - Callback of the event to be listened to.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009700099 - Operation failed.
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    function off(type: 'acbStateChange', callback?: Callback<AcbStateParam>): void;
    /**
     * The enum of nearlink state.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    enum NearlinkState {
        /**
         * Indicates the Nearlink is turning on.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        STATE_TURNING_ON = 0,
        /**
         * Indicates the Nearlink is on, and ready for use.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        STATE_ON = 1,
        /**
         * Indicates the Nearlink is turning off.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        STATE_TURNING_OFF = 2,
        /**
         * Indicates the Nearlink already turn off.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        STATE_OFF = 3
    }
    /**
     * Describes the pairing state parameters.
     *
     * @typedef PairingStateParam
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    interface PairingStateParam {
        /**
         * Indicates the device address.
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        address: string;
        /**
         * Indicates the previous pair state.
         *
         * @type { PairingState }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        preState: PairingState;
        /**
         * Indicates the current pair state.
         *
         * @type { PairingState }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        state: PairingState;
        /**
         * Indicates the pair state reason.
         *
         * @type { PairingReason }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        reason: PairingReason;
    }
    /**
     * Enum for the pairing reason.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    enum PairingReason {
        /**
         * The pairing is successful.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        PAIRING_REASON_SUCCESS = 0,
        /**
         * Pairing failed.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        PAIRING_REASON_FAILURE = 1,
        /**
         * Pairing failed due to profile is unsupported.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        PAIRING_REASON_PROFILE_UNSUPPORTED = 2,
        /**
         * Pairing failed due to max connection is exceed.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        PAIRING_REASON_EXCEED_ACB_MAX = 3,
        /**
         * Pairing failed due to remote canceled.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        PAIRING_REASON_REMOTE_CANCELED = 4,
        /**
         * Pairing failed due to local canceled.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        PAIRING_REASON_LOCAL_CANCELED = 5
    }
    /**
     * Describes pairing request parameters.
     *
     * @typedef PairingRequestParam
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    interface PairingRequestParam {
        /**
         * Indicates the device address.
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        address: string;
        /**
         * Key for the device pairing.
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        passkey: string;
        /**
         * Indicates the paring type.
         *
         * @type { PairingType }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        pairingType: PairingType;
    }
    /**
     * Enum for the pairing type.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    enum PairingType {
        /**
         * Without PASSKEY, the user needs to accept or reject the pairing request.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        NO_PASSKEY_CONFIRMATION = 0,
        /**
         * The user needs to enter the passcode displayed on the peer device.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        PAIRING_TYPE_PASSCODE = 1,
        /**
         * The user needs to compare the number displayed on both devices.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        PAIRING_TYPE_NUMBER_COMPARE = 2
    }
    /**
     * Describes the connection state parameters.
     *
     * @typedef ConnectionStateParam
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    interface ConnectionStateParam {
        /**
         * Indicates the device address.
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        address: string;
        /**
         * Indicates the previous connection state.
         *
         * @type { ConnectionState }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        preState: ConnectionState;
        /**
         * Indicates the current connection state.
         *
         * @type { ConnectionState }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        state: ConnectionState;
        /**
         * Connection reason.
         *
         * @type { ConnectionReason }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        connectionReason: ConnectionReason;
    }
    /**
     * Enum for the connection reason.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.0.1(13)
     */
    enum ConnectionReason {
        /**
         * Connection succeeded.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        CONNECTION_SUCCESS = 0,
        /**
         * Connection failed.
         *
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.0.1(13)
         */
        CONNECTION_FAILURE = 1
    }
    /**
     * Parameter representing ACB connection status.
     * @typedef AcbStateParam
     * @syscap SystemCapability.Communication.NearLink.Core
     * @since 5.1.0(18)
     */
    interface AcbStateParam {
        /**
         * Indicates the device address.
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        address: string;
        /**
         * ACB connection status.
         * @type { AcbState }
         * @syscap SystemCapability.Communication.NearLink.Core
         * @since 5.1.0(18)
         */
        state: AcbState;
    }
}
export default manager;
