/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file This module provides the capabilities to get information hiding status.
 * @kit DeviceSecurityKit

 */
import type { Callback } from '@ohos.base';
/**
 * This module provides information hiding status detection abilities.
 *
 * @namespace dlpAntiPeep
 * @syscap SystemCapability.Security.DlpAntiPeep
 * @since 6.0.0(20)
 */
declare namespace dlpAntiPeep {
    /**
     * Enumerates the response of dlp information hiding state change.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.DlpAntiPeep
     * @since 6.0.0(20)
     */
    enum DlpAntiPeepStatus {
        /**
         * Information hiding disabled.
         * @syscap SystemCapability.Security.DlpAntiPeep
         * @since 6.0.0(20)
         */
        PASS = 0,
        /**
         * Information hiding enabled.
         * @syscap SystemCapability.Security.DlpAntiPeep
         * @since 6.0.0(20)
         */
        HIDE = 1
    }
    /**
     * Checks whether the message hiding function is enabled.
     *
     * @permission ohos.permission.DLP_GET_HIDE_STATUS
     * @returns { Promise<boolean> } Result indicating whether the message hiding function is enabled.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.function on can not work correctly due to
     * limited
     *  device capabilities.
     * @throws { BusinessError } 1020600001 - Internal error.
     * @syscap SystemCapability.Security.DlpAntiPeep
     * @since 6.0.0(20)
     */
    function isDlpAntiPeepSwitchOn(): Promise<boolean>;
    /**
     * Registers the API for obtaining the message hiding status.
     *
     * @permission ohos.permission.DLP_GET_HIDE_STATUS
     * @param { 'dlpAntiPeep' } type - Indicates the multiple eye gaze event to be subscribed.
     * @param { Callback<DlpAntiPeepStatus> } callback - The callback object used to return information hiding
     * status.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1020600001 - Internal error.
     * @syscap SystemCapability.Security.DlpAntiPeep
     * @since 6.0.0(20)
     */
    function on(type: 'dlpAntiPeep', callback: Callback<DlpAntiPeepStatus>): void;
    /**
     * Unregisters the API for obtaining the message hiding status.
     *
     * @permission ohos.permission.DLP_GET_HIDE_STATUS
     * @param { 'dlpAntiPeep' } type - Indicates the multiple eye gaze event to be subscribed.
     * @param { Callback<DlpAntiPeepStatus> } [callback] - The callback object used to cancel subscription
     * relationship.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1020600001 - Internal error.
     * @syscap SystemCapability.Security.DlpAntiPeep
     * @since 6.0.0(20)
     */
    function off(type: 'dlpAntiPeep', callback?: Callback<DlpAntiPeepStatus>): void;
    /**
     * Obtains the current message hiding status.
     *
     * @permission ohos.permission.DLP_GET_HIDE_STATUS
     * @returns { DlpAntiPeepStatus } Obtained message hiding status.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.function getDlpHideInfo can not work correctly
     * due to
     *  limited device capabilities.
     * @throws { BusinessError } 1020600001 - Internal error.
     * @syscap SystemCapability.Security.DlpAntiPeep
     * @since 6.0.0(20)
     */
    function getDlpAntiPeepInfo(): DlpAntiPeepStatus;
    /**
     * Sets the message hiding status to the fixed value. The function of obtaining the message hiding status
     * will take effect again after the screen is unlocked.
     *
     * @permission ohos.permission.DLP_GET_HIDE_STATUS
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.function passDlpHideInfo can not work correctly
     * due to
     *  limited device capabilities.
     * @throws { BusinessError } 1020600001 - Internal error.
     * @syscap SystemCapability.Security.DlpAntiPeep
     * @since 6.0.0(20)
     */
    function passDlpAntiPeepInfo(): void;
    /**
     * Sets the antipeep mask layer.
     *
     * @permission ohos.permission.DLP_GET_HIDE_STATUS
     * @param { number } windowId - The protection application window id.
     * @returns { Promise<void> } Promise used to return the result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.function setAntiPeepMaskLayer can not work correctly
     *     due to limited device capabilities.
     * @throws { BusinessError } 1020600001 - Internal error.
     * @throws { BusinessError } 1020600002 - The antipeep function is not enabled.
     * @throws { BusinessError } 1020600003 - The protected application is not displayed on the screen.
     * @syscap SystemCapability.Security.DlpAntiPeep
     * @since 6.0.1(21)
     */
    function setAntiPeepMaskLayer(windowId: number): Promise<void>;
}
export default dlpAntiPeep;
