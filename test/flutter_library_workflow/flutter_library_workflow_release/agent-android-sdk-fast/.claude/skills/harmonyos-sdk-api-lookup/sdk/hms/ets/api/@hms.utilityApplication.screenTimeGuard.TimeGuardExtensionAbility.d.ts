/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Defines the time guard extension ability for ScreenTimeGuard kit.
 * @kit ScreenTimeGuardKit
 */
import ExtensionAbility from '@ohos.app.ability.ExtensionAbility';
import TimeGuardExtensionContext from '@hms.utilityApplication.screenTimeGuard.TimeGuardExtensionContext';
/**
 * Defines the ExtensionAbility used as a time guard.
 * @extends ExtensionAbility
 * @syscap SystemCapability.ScreenTimeGuard.GuardService
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export default class TimeGuardExtensionAbility extends ExtensionAbility {
    /**
     * Indicates time guard extension ability context.
     * @type { TimeGuardExtensionContext }
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    context: TimeGuardExtensionContext;
    /**
     * Called when the guard strategy starts.
     * @param { string } strategyName - The strategy name.
     * @returns { Promise<void> } Promise of void.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    onStart(strategyName: string): Promise<void>;
    /**
     * Called when the guard strategy stops.
     * @param { string } strategyName - The strategy name.
     * @returns { Promise<void> } Promise of void.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    onStop(strategyName: string): Promise<void>;
    /**
     * Called when user gtanted the authorization.
     * @returns { Promise<void> } Promise of void.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    onUserAuthSwitchOn(): Promise<void>;
    /**
     * Called when user revoked the authorization.
     * @returns { Promise<void> } Promise of void.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    onUserAuthSwitchOff(): Promise<void>;
}
