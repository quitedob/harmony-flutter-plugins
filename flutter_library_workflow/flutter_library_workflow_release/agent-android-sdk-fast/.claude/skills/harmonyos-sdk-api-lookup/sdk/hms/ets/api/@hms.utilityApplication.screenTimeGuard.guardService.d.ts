/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Defines the guard service for ScreenTimeGuard kit.
 * @kit ScreenTimeGuardKit
 */
import common from '@ohos.app.ability.common';
/**
 * The guard service of ScreenTimeGuard kit.
 * @namespace guardService
 * @syscap SystemCapability.ScreenTimeGuard.GuardService
 * @stagemodelonly
 * @since 6.0.0(20)
 */
declare namespace guardService {
    /**
     * Enumerates the error codes of the extendService.
     * @enum { number }
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    enum GuardServiceErrorCode {
        /**
         * Internal error.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        INTERNAL_ERROR = 1019000001,
        /**
         * The user has not allowed the application to access this API.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        USER_NOT_AUTHORIZED = 1019000002,
        /**
         * The operation is canceled by the user.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        USER_CANCELED = 1019000003,
        /**
         * The number of strategies exceeds the upper limit.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        STRATEGIES_EXCEED_LIMIT = 1019000004,
        /**
         * The strategy name is already existed.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        STRATEGY_NAME_ALREADY_EXIST = 1019000005,
        /**
         * Nonexistent strategy.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        NONEXISTENT_STRATEGY = 1019000006,
        /**
         * The strategy is already being executed.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        STRATEGY_ALREADY_EXECUTED = 1019000007,
        /**
         * The strategy is not started.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        STRATEGY_NOT_STARTED = 1019000008
    }
    /**
     * Enumerates the restriction type.
     * @enum { number }
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    enum RestrictionType {
        /**
         * Trustlist-based restriction.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        TRUSTLIST_TYPE = 1,
        /**
         * Blocklist-based restriction.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        BLOCKLIST_TYPE = 2
    }
    /**
     * Enumerates the type of time strategy.
     * @enum { number }
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    enum TimeStrategyType {
        /**
         * the type of start-end time.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        START_END_TIME_TYPE = 1,
        /**
         * the type of total duration.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        TOTAL_DURATION_TYPE = 2
    }
    /**
     * Enumerates the status of user authorization.
     * @enum { number }
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    enum AuthStatus {
        /**
         * The status of initialization.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        AUTH_INIT = -1,
        /**
         * The granted status.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        AUTH_GRANTED = 0,
        /**
         * The denied status.
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        AUTH_DENIED = 1
    }
    /**
     * Defines the application tokens information.
     * @typedef AppInfo
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface AppInfo {
        /**
         * The token list of applications.
         * @type { string[] }
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        appTokens: string[];
    }
    /**
     * Defines the time strategy.
     * @typedef TimeStrategy
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface TimeStrategy {
        /**
         * Defines the type of a time strategy.
         * @type { TimeStrategyType }
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        type: TimeStrategyType;
        /**
         * Start time, in HH:mm format.
         * @type { ?string }
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        startTime?: string;
        /**
         * End time, in HH:mm format.
         * @type { ?string }
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        endTime?: string;
        /**
         * The duration of restriction in minute unit.
         * @type { ?number }
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        totalDuration?: number;
        /**
         * Describes the days of the week when the strategy applies.
         * @type { ?number[] }
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        repeat?: number[];
    }
    /**
     * Defines the guard strategy.
     * @typedef GuardStrategy
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface GuardStrategy {
        /**
         * Describes the name of the strategy.
         * @type { string }
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        name: string;
        /**
         * The time strategy.
         * @type { TimeStrategy }
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        timeStrategy: TimeStrategy;
        /**
         * The appcation information.
         * @type { AppInfo }
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        appInfo: AppInfo;
        /**
         * Application restriction type.
         * @type { RestrictionType }
         * @syscap SystemCapability.ScreenTimeGuard.GuardService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        appRestrictionType: RestrictionType;
    }
    /**
     * Requests user authorization to call the APIs of ScreenTimeGuard Kit.
     * @permission ohos.permission.MANAGE_SCREEN_TIME_GUARD
     * @param { common.UIAbilityContext } context - Context of the UIAbility.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - Permission verification failed.
     * The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification
     * failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * function requestUserAuth can not work correctly due to limited device capabilities.
     * @throws { BusinessError } 1019000001 - Internal error.
     * @throws { BusinessError } 1019000002 - The user has not authorized the application to access this
     * interface.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function requestUserAuth(context: common.UIAbilityContext): Promise<void>;
    /**
     * Revokes user authorization.
     * @permission ohos.permission.MANAGE_SCREEN_TIME_GUARD
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - Permission verification failed.
     * The application does not have the permission required to call the API.
     * @throws { BusinessError } 801 - Capability not supported.
     * function revokeUserAuth can not work correctly due to limited device capabilities.
     * @throws { BusinessError } 1019000001 - Internal error.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function revokeUserAuth(): Promise<void>;
    /**
     * Obtains the user authorization status.
     * @permission ohos.permission.MANAGE_SCREEN_TIME_GUARD
     * @returns { Promise<AuthStatus> } Promise that returns the user authorization status.
     * @throws { BusinessError } 201 - Permission verification failed.
     * The application does not have the permission required to call the API.
     * @throws { BusinessError } 801 - Capability not supported.
     * function getUserAuthStatus can not work correctly due to limited device capabilities.
     * @throws { BusinessError } 1019000001 - Internal error.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function getUserAuthStatus(): Promise<AuthStatus>;
    /**
     * Adds a screen time guard strategy.
     * @permission ohos.permission.MANAGE_SCREEN_TIME_GUARD
     * @param { GuardStrategy } guardStrategy - The guard strategy.
     * @returns { Promise<void> } Promise of void.
     * @throws { BusinessError } 201 - Permission verification failed.
     * The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * function addGuardStrategy can not work correctly due to limited device capabilities.
     * @throws { BusinessError } 1019000001 - Internal error.
     * @throws { BusinessError } 1019000002 - The user has not authorized the application to access this interface.
     * @throws { BusinessError } 1019000004 - The number of strategies exceeds the upper limit.
     * @throws { BusinessError } 1019000005 - The strategy name is already existed.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function addGuardStrategy(guardStrategy: GuardStrategy): Promise<void>;
    /**
     * Updates a screen time guard strategy.
     * @permission ohos.permission.MANAGE_SCREEN_TIME_GUARD
     * @param { string } strategyName - The name of strategy.
     * @param { GuardStrategy } guardStrategy - The guard strategy.
     * @returns { Promise<void> } Promise of void.
     * @throws { BusinessError } 201 - Permission verification failed.
     * The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * function updateGuardStrategy can not work correctly due to limited device capabilities.
     * @throws { BusinessError } 1019000001 - Internal error.
     * @throws { BusinessError } 1019000002 - The user has not authorized the application to access this interface.
     * @throws { BusinessError } 1019000006 - Nonexistent strategy.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function updateGuardStrategy(strategyName: string, guardStrategy: GuardStrategy): Promise<void>;
    /**
     * Queries all guard strategies of the application.
     * @permission ohos.permission.MANAGE_SCREEN_TIME_GUARD
     * @returns { Promise<GuardStrategy[]> } promise of guard strategy list.
     * @throws { BusinessError } 201 - Permission verification failed.
     * The application does not have the permission required to call the API.
     * @throws { BusinessError } 801 - Capability not supported.
     * function queryGuardStrategies can not work correctly due to limited device capabilities.
     * @throws { BusinessError } 1019000001 - Internal error.
     * @throws { BusinessError } 1019000002 - The user has not authorized the application to access this interface.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function queryGuardStrategies(): Promise<GuardStrategy[]>;
    /**
     * Removes a screen time guard strategy.
     * @permission ohos.permission.MANAGE_SCREEN_TIME_GUARD
     * @param { string } strategyName - The name of strategy.
     * @returns { Promise<void> } Promise of void.
     * @throws { BusinessError } 201 - Permission verification failed.
     * The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * function removeGuardStrategy can not work correctly due to limited device capabilities.
     * @throws { BusinessError } 1019000001 - Internal error.
     * @throws { BusinessError } 1019000002 - The user has not authorized the application to access this interface.
     * @throws { BusinessError } 1019000006 - Nonexistent strategy.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function removeGuardStrategy(strategyName: string): Promise<void>;
    /**
     * Starts a screen time guard strategy.
     * @permission ohos.permission.MANAGE_SCREEN_TIME_GUARD
     * @param { string } strategyName - The name of strategy.
     * @returns { Promise<void> } Promise of void.
     * @throws { BusinessError } 201 - Permission verification failed.
     * The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * function startGuardStrategy can not work correctly due to limited device capabilities.
     * @throws { BusinessError } 1019000001 - Internal error.
     * @throws { BusinessError } 1019000002 - The user has not authorized the application to access this interface.
     * @throws { BusinessError } 1019000006 - Nonexistent strategy.
     * @throws { BusinessError } 1019000007 - The strategy is already being executed.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function startGuardStrategy(strategyName: string): Promise<void>;
    /**
     * Stops a screen time guard strategy.
     * @permission ohos.permission.MANAGE_SCREEN_TIME_GUARD
     * @param { string } strategyName - The name of strategy.
     * @returns { Promise<void> } Promise of void.
     * @throws { BusinessError } 201 - Permission verification failed.
     * The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * function stopGuardStrategy can not work correctly due to limited device capabilities.
     * @throws { BusinessError } 1019000001 - Internal error.
     * @throws { BusinessError } 1019000002 - The user has not authorized the application to access this interface.
     * @throws { BusinessError } 1019000006 - Nonexistent strategy.
     * @throws { BusinessError } 1019000008 - This strategy has not been started yet.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function stopGuardStrategy(strategyName: string): Promise<void>;
    /**
     * Sets restrictions for the specified applications.
     * @permission ohos.permission.MANAGE_SCREEN_TIME_GUARD
     * @param { AppInfo } appInfo - Application information.
     * @param { RestrictionType } restrictionType - Restriction type.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - Permission verification failed.
     * The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification
     * failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * function setAppsRestriction can not work correctly due to limited device capabilities.
     * @throws { BusinessError } 1019000001 - Internal error.
     * @throws { BusinessError } 1019000002 - The user has not authorized the application to access this
     * interface.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function setAppsRestriction(appInfo: AppInfo, restrictionType: RestrictionType): Promise<void>;
    /**
     * Removes the restrictions placed on the specified applications.
     * @permission ohos.permission.MANAGE_SCREEN_TIME_GUARD
     * @param { AppInfo } appInfo - Application information.
     * @param { RestrictionType } restrictionType - Restriction type.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - Permission verification failed.
     * The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification
     * failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * function releaseAppsRestriction can not work correctly due to limited device capabilities.
     * @throws { BusinessError } 1019000001 - Internal error.
     * @throws { BusinessError } 1019000002 - The user has not authorized the application to access this
     * interface.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function releaseAppsRestriction(appInfo: AppInfo, restrictionType: RestrictionType): Promise<void>;
}
export default guardService;
