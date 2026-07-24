/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Update Manager Interface Description file
 * @kit AppGalleryKit
 */
import type common from '@ohos.app.ability.common';
import type { Callback } from '@ohos.base';
/**
 * The functions of app update manager.
 *
 * @namespace updateManager
 * @syscap SystemCapability.AppGalleryService.Distribution.Update
 * @stagemodelonly
 * @since 5.0.0(12)
 */
/**
 * The functions of app update manager.
 *
 * @namespace updateManager
 * @syscap SystemCapability.AppGalleryService.Distribution.Update
 * @stagemodelonly
 * @atomicservice
 * @since 6.0.0(20)
 */
declare namespace updateManager {
    /**
     * Enum for Detect New Version
     *
     * @enum { number }
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    /**
     * Enum for Detect New Version
     *
     * @enum { number }
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    export enum UpdateAvailableCode {
        /**
         * A new version is available.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        /**
         * A new version is available.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        LATER_VERSION_EXIST = 1,
        /**
         * No new version
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        /**
         * No new version
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        LATER_VERSION_NOT_EXIST = 0
    }
    /**
     * Enum for show update dialog result
     *
     * @enum {number}
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    export enum ShowUpdateResultCode {
        /**
         * Show update dialog success
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        SHOW_DIALOG_SUCCESS = 0,
        /**
         * Show update dialog fail
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        SHOW_DIALOG_FAILURE = 1
    }
    /**
     * Return check update reuslt
     *
     * @typedef CheckUpdateResult
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    /**
     * Return check update reuslt
     *
     * @typedef CheckUpdateResult
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    export interface CheckUpdateResult {
        /**
         * Whether can update or not.
         * 0:do not update; 1:has new version to update
         * @type { UpdateAvailableCode }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        /**
         * Whether can update or not.
         * 0:do not update; 1:has new version to update
         * @type { UpdateAvailableCode }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        readonly updateAvailable: UpdateAvailableCode;
        /**
         * versionName
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        readonly versionName?: string;
        /**
         * versionCode
         *
         * @type { ?number }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        readonly versionCode?: number;
    }
    /**
     * UpdateSessionState
     *
     * @typedef UpdateSessionState
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    interface UpdateSessionState {
        /**
         * code
         *
         * @type { RequestErrorCode }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        readonly code: RequestErrorCode;
        /**
         * checkUpdateResult is not empty only when errorCode is NEED_UPGRADE or NO_UPGRADE
         *
         * @type { ?CheckUpdateResult }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        readonly checkUpdateResult?: CheckUpdateResult;
    }
    /**
     * Enum for RequestErrorCode
     *
     * @enum { number }
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    export enum RequestErrorCode {
        /**
         * Indicates request is successful and no need update.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        NO_UPGRADE = 0,
        /**
         * Indicates request is successful and need update.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        NEED_UPGRADE = 1,
        /**
         * Indicates update is downloaded.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Update
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        DOWNLOADED = 2
    }
    /**
     * Check for Update.
     *
     * @param { common.UIAbilityContext } context - the context of an ability
     * @returns { Promise<CheckUpdateResult> } The promise of CheckUpdateResult returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1009400001 - SA connect error.
     * @throws { BusinessError } 1009400002 - Request to service error.
     * @throws { BusinessError } 1009400003 - Network error.
     * @throws { BusinessError } 1009400004 - The application is not in the foreground.
     * @throws { BusinessError } 1009400005 - Not agreeing to the privacy agreement.
     * @throws { BusinessError } 1009400006 - Time limited.
     * @throws { BusinessError } 1009400007 - Other error.
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function checkAppUpdate(context: common.UIAbilityContext): Promise<CheckUpdateResult>;
    /**
     * Displaying the update dialog.
     *
     * @param { common.UIAbilityContext} context - the context of an ability
     * @returns { Promise<ShowUpdateResultCode> } The promise of ShowUpdateResultCode returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1009400001 - SA connection error.
     * @throws { BusinessError } 1009400002 - Request to service error.
     * @throws { BusinessError } 1009400004 - The application is not in the foreground.
     * @throws { BusinessError } 1009400005 - Not agreeing to the privacy agreement.
     * @throws { BusinessError } 1009400007 - Other error.
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function showUpdateDialog(context: common.UIAbilityContext): Promise<ShowUpdateResultCode>;
    /**
     * Register the on-demand update change listener.
     * When the update change, the callback function is used to notify the caller.
     *
     * @param { 'updateChange' } type - Type of the event to listen for. Only the updateChange event is support.
     * @param { Callback<UpdateSessionState> } callback - Callback is invoked when the event is triggered.
     * @param { number } [timeout] - Monitoring duration.
     * @throws { BusinessError } 1009400001 - SA connection error.
     * @throws { BusinessError } 1009400002 - Request to service error.
     * @throws { BusinessError } 1009400007 - Other error.
     * @throws { BusinessError } 1009400008 - The number of parameters for the on API is incorrect.
     * @throws { BusinessError } 1009400009 - The type parameter for the on API is invalid.
     * @throws { BusinessError } 1009400010 - The callback parameter for the on API is invalid.
     * @throws { BusinessError } 1009400011 - The timeout parameter for the on API is invalid.
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    function on(type: 'updateChange', callback: Callback<UpdateSessionState>, timeout?: number): void;
    /**
     * Unregisters update change events.
     *
     * @param { 'updateChange' } type - Type of the event to listen for. Only the updateChange event is support.
     * @param { Callback<UpdateSessionState> } [callback] - Callback is invoked when the event is triggered.
     * @throws { BusinessError } 1009400001 - SA connection error.
     * @throws { BusinessError } 1009400002 - Request to service error.
     * @throws { BusinessError } 1009400007 - Other error.
     * @throws { BusinessError } 1009400012 - The number of parameters for the off API is incorrect.
     * @throws { BusinessError } 1009400013 - The type parameter for the off API is invalid.
     * @throws { BusinessError } 1009400014 - The callback parameter for the off API is invalid.
     * @syscap SystemCapability.AppGalleryService.Distribution.Update
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    function off(type: 'updateChange', callback?: Callback<UpdateSessionState>): void;
}
export default updateManager;
