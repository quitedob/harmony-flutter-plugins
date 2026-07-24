/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
* @file AppInfo Manager Interface Description file
* @kit AppGalleryKit
*/
/**
 * Class that is used to declare the functions provided by AppGallery
 *
 * @namespace appInfoManager
 * @syscap SystemCapability.AppGalleryService.AppInfoManager
 * @since 5.0.3(15)
 */
declare namespace appInfoManager {
    /**
     * Dynamic icon information.
     *
     * @typedef DynamicIconInfo
     * @syscap SystemCapability.AppGalleryService.AppInfoManager
     * @since 5.0.3(15)
     */
    export interface DynamicIconInfo {
        /**
         * icon url.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.AppInfoManager
         * @since 5.0.3(15)
         */
        readonly iconUrl: string;
        /**
       * icon id.
       *
       * @type { string }
       * @readonly
       * @syscap SystemCapability.AppGalleryService.AppInfoManager
       * @since 5.0.3(15)
       */
        readonly iconId: string;
        /**
         * true: icon is enabled; false: icon is not enabled.
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.AppInfoManager
         * @since 5.0.3(15)
         */
        readonly enabled: boolean;
    }
    /**
     * Query dynamic icons.
     *
     * @returns { Promise<DynamicIconInfo[]> } the result.
     * @throws { BusinessError } 1006800001 - The specified service extension connect failed.
     * @throws { BusinessError } 1006800009 - System internal error.
     * @throws { BusinessError } 1006800010 - No dynamic icon data.
     * @syscap SystemCapability.AppGalleryService.AppInfoManager
     * @since 5.0.3(15)
     */
    function queryDynamicIcons(): Promise<DynamicIconInfo[]>;
    /**
     * Select the dynamic icon of iconId
     *
     * @param { string } iconId - icon id.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1006800009 - System internal error.
     * @throws { BusinessError } 1006800011 - Select dynamic icon failed.
     * @syscap SystemCapability.AppGalleryService.AppInfoManager
     * @since 5.0.3(15)
     */
    /**
     * Select the dynamic icon of iconId
     *
     * @param { string } iconId - icon id.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1006800009 - System internal error.
     * @throws { BusinessError } 1006800011 - Select dynamic icon failed.
     * @throws { BusinessError } 1006800013 - Failed to switch to the custom
     *     icon because a custom theme icon is currently in use.
     * @syscap SystemCapability.AppGalleryService.AppInfoManager
     * @since 6.0.0(20)
     */
    function selectDynamicIcon(iconId: string): Promise<void>;
    /**
     * Disbale the dynamic icon.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 1006800009 - System internal error.
     * @throws { BusinessError } 1006800012 - Disable dynamic icon failed.
     * @syscap SystemCapability.AppGalleryService.AppInfoManager
     * @since 5.0.3(15)
     */
    function disableDynamicIcon(): Promise<void>;
}
export default appInfoManager;
