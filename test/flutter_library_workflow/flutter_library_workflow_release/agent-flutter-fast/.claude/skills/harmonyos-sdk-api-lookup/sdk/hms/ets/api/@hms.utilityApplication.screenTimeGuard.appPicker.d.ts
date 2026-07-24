/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Defines the application picker for ScreenTimeGuard kit.
 * @kit ScreenTimeGuardKit
 */
import common from '@ohos.app.ability.common';
import guardService from '@hms.utilityApplication.screenTimeGuard.guardService';
/**
 * Defines the application list picker.
 * @namespace appPicker
 * @syscap SystemCapability.ScreenTimeGuard.GuardService
 * @stagemodelonly
 * @since 6.0.0(20)
 */
declare namespace appPicker {
    /**
     * Starts an application list picker.
     * @permission ohos.permission.MANAGE_SCREEN_TIME_GUARD
     * @param { common.Context } context - UIAbility context.
     * @param { guardService.AppInfo } appSelection - Application selection information.
     * @returns { Promise<string[]> } - Promise used to return an array of application tokens.
     * @throws { BusinessError } 201 - Permission verification failed.
     * The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * function startAppPicker can not work correctly due to limited device capabilities.
     * @throws { BusinessError } 1019000001 - Internal error.
     * @throws { BusinessError } 1019000002 - The user has not authorized the application to access this interface.
     * @throws { BusinessError } 1019000003 - The user canceled the operation.
     * @syscap SystemCapability.ScreenTimeGuard.GuardService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function startAppPicker(context: common.Context, appSelection: guardService.AppInfo): Promise<string[]>;
}
export default appPicker;
