/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023. All rights reserved.
 */
/**
 * @file Defines module of push service.
 * @kit PushKit
 */
import type { AsyncCallback, Callback } from '@ohos.base';
import type Ability from '@ohos.app.ability.Ability';
import type { Callee } from '@ohos.app.ability.UIAbility';
import type pushCommon from '@hms.core.push.pushCommon';
/**
 * This module of push service.
 * @namespace pushService
 * @syscap SystemCapability.Push.PushService
 * @stagemodelonly
 * @since 4.0.0(10)
 */
/**
 * This module of push service.
 * @namespace pushService
 * @syscap SystemCapability.Push.PushService
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace pushService {
    /**
     * Obtains a token from push service.
     * @param { AsyncCallback<string> } callback - Indicates the callback to get token.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @throws { BusinessError } 1000900012 - Push rights are not activated.
     * @throws { BusinessError } 1000900013 - Cross-location application is not allowed to obtain the token.
     * @throws { BusinessError } 1000900014 - The device does not support getting token.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Obtains a token from push service.
     * @param { AsyncCallback<string> } callback - Indicates the callback to get token.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @throws { BusinessError } 1000900012 - Push rights are not activated.
     * @throws { BusinessError } 1000900013 - Cross-location application is not allowed to obtain the token.
     * @throws { BusinessError } 1000900014 - The device does not support getting token.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export function getToken(callback: AsyncCallback<string>): void;
    /**
     * Obtains a token from push service.
     * @returns { Promise<string> } The promise returned by the function.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @throws { BusinessError } 1000900012 - Push rights are not activated.
     * @throws { BusinessError } 1000900013 - Cross-location application is not allowed to obtain the token.
     * @throws { BusinessError } 1000900014 - The device does not support getting token.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Obtains a token from push service.
     * @returns { Promise<string> } The promise returned by the function.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @throws { BusinessError } 1000900012 - Push rights are not activated.
     * @throws { BusinessError } 1000900013 - Cross-location application is not allowed to obtain the token.
     * @throws { BusinessError } 1000900014 - The device does not support getting token.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export function getToken(): Promise<string>;
    /**
     * Delete a token from push service.
     * @param { AsyncCallback<void> } callback - Indicates the callback to delete token.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Delete a token from push service.
     * @param { AsyncCallback<void> } callback - Indicates the callback to delete token.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export function deleteToken(callback: AsyncCallback<void>): void;
    /**
     * Delete a token from push service.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Delete a token from push service.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900011 - The network is unavailable.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export function deleteToken(): Promise<void>;
    /**
     * Receive push message.
     * @param { 'IM' | 'VoIP' | 'BACKGROUND' } pushType - The push type of message to receive.
     * @param { Ability } ability - Application ability information.
     * @param { Callback<pushCommon.PushPayload>} onMessage - Callback after receiving the message.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900005 - Messages of the same push type cannot be received repeatedly.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Receive push message.
     * @param { 'IM' | 'VoIP' | 'BACKGROUND' | 'EMERGENCY' } pushType - The push type of message to receive.
     * @param { Ability } ability - Application ability information.
     * @param { Callback<pushCommon.PushPayload>} onMessage - Callback after receiving the message.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900005 - Messages of the same push type cannot be received repeatedly.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    /**
     * Receive push message.
     * @param { PushType } pushType - The push type of message to receive.
     * @param { Ability } ability - Application ability information.
     * @param { Callback<pushCommon.PushPayload>} onMessage - Callback after receiving the message.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900005 - Messages of the same push type cannot be received repeatedly.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    export function receiveMessage(pushType: PushType, ability: Ability, onMessage: Callback<pushCommon.PushPayload>): void;
    /**
     * Bind the relationship between the profile and application on the device.
     * @param { pushCommon.AppProfileType } appProfileType - The profile type of the application.
     * @param { string } appProfileId - The profile id of the application.
     * @param { AsyncCallback<void> } callback - Indicates the callback to bindAppProfileId.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900015 - The number of bound profile-app relationships exceeds the maximum.
     * @throws { BusinessError } 1000900016 - The os distributed account is not logged in.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    export function bindAppProfileId(appProfileType: pushCommon.AppProfileType, appProfileId: string, callback: AsyncCallback<void>): void;
    /**
     * Bind the relationship between the profile and application on the device.
     * @param { pushCommon.AppProfileType } appProfileType - The profile type of the application.
     * @param { string } appProfileId - The profile id of the application.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @throws { BusinessError } 1000900015 - The number of bound profile-app relationships exceeds the maximum.
     * @throws { BusinessError } 1000900016 - The os distributed account is not logged in.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    export function bindAppProfileId(appProfileType: pushCommon.AppProfileType, appProfileId: string): Promise<void>;
    /**
     * Unbind the relationship between the profile and application on the device.
     * @param { string } appProfileId - The profile id of the application.
     * @param { AsyncCallback<void> } callback - Indicates the callback to bindAppProfileId.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    export function unbindAppProfileId(appProfileId: string, callback: AsyncCallback<void>): void;
    /**
     * Unbind the relationship between the profile and application on the device.
     * @param { string } appProfileId - The profile id of the application.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900008 - Failed to connect to the push service.
     * @throws { BusinessError } 1000900009 - Internal error of the push service.
     * @throws { BusinessError } 1000900010 - Illegal application identity.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    export function unbindAppProfileId(appProfileId: string): Promise<void>;
    /**
     * The push type of message to receive.
     * @typedef PushType
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    export type PushType = 'DEFAULT' | 'IM' | 'VoIP' | 'BACKGROUND' | 'EMERGENCY';
    /**
     * Subscribe the token update event.
     * @param { 'tokenUpdate' } type - Type of the token update event to listen for.
     * @param { Ability } ability - Application ability information.
     * @param { Callback<string> } callback - Callback used to listen for the token update event.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function on(type: 'tokenUpdate', ability: Ability, callback: Callback<string>): void;
    /**
     * Unsubscribe the token update event.
     * @param { 'tokenUpdate' } type - Type of the token update event to listen for.
     * @param { Callback<string> } [callback] - Callback used to listen for the token update event.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function off(type: 'tokenUpdate', callback?: Callback<string>): void;
    /**
     * Subscribe the distributed message event.
     * @param { 'distributedMessageReceive' } type - Type of receive distributed message event to listen for.
     * @param { Callee } callee - Callee information of application ability.
     * @param { DistributedMessageCallback  } callback - Callback after receiving the distributed message.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @throws { BusinessError } 1000900031 - The same type of callback can be registered only once.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function on(type: 'distributedMessageReceive', callee: Callee, callback: DistributedMessageCallback): void;
    /**
     * Unsubscribe the distributed message event.
     * @param { 'distributedMessageReceive' } type - Type of receive distributed message event to listen for.
     * @param { DistributedMessageCallback } [callback] - Callback used to listen for the distributed message event.
     * @throws { BusinessError } 1000900001 - System internal error.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function off(type: 'distributedMessageReceive', callback?: DistributedMessageCallback): void;
    /**
     * Defines the callback type used in the distributed message event.
     * @typedef { function } DistributedMessageCallback
     * @param { pushCommon.PushPayload } PushPayload - The push payload sent to the distributed message.
     * @returns { Promise<DistributedMessageResult> } The promise returned by the function.
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    type DistributedMessageCallback = (PushPayload: pushCommon.PushPayload) => Promise<DistributedMessageResult>;
    /**
     * Distributed message processing result.
     * @typedef DistributedMessageResult
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface DistributedMessageResult {
        /**
         * Result code.
         *
         *
         * @type { ResultCode }
         * @syscap SystemCapability.Push.PushService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        resultCode: ResultCode;
    }
    /**
     * Result code.
     * @enum { number }
     * @syscap SystemCapability.Push.PushService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    enum ResultCode {
        /**
         * Distributed message processed successfully.
         * @syscap SystemCapability.Push.PushService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        SUCCESS = 0,
        /**
         * Failed to process the distributed message.
         * @syscap SystemCapability.Push.PushService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        FAILED = 1
    }
}
export default pushService;
