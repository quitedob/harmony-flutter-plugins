/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
* @file ProductView Manager Interface Description file
* @kit AppGalleryKit
*/
import type common from '@ohos.app.ability.common';
import type Want from '@ohos.app.ability.Want';
import type { Callback, ErrorCallback } from '@ohos.base';
/**
 * Class that is used to declare methods of open view provide by AppGallery.
 *
 * @namespace productViewManager
 * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
 * @stagemodelonly
 * @since 4.1.0(11)
 */
declare namespace productViewManager {
    /**
     * The result from received data.
     *
     * @enum { number }
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    export enum ReceiveDataResult {
        /**
         * Indicates that operation is success.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        SUCCESS = 1000,
        /**
         * Indicates that operation is fail.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        FAILURE = 1001,
        /**
         * Exception occurrence.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        EXCEPTION = 1002
    }
    /**
     * Result of opening the harmony service detail page.
     *
     * @typedef ServiceViewReceiveData
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    export interface ServiceViewReceiveData {
        /**
         * Indicates result of opening the harmony service detail page.
         *
         * @type { ReceiveDataResult }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        readonly result: ReceiveDataResult;
        /**
         * Indicates description of opening harmony service detail page result.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        readonly msg: string;
        /**
         * Indicates information of the harmony service detail page.
         *
         * @type { object }
         * @readonly
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        readonly formInfo: {
            [key: string]: Object;
        };
    }
    /**
     * Callback of opening the harmony service detail page which is for adding card to desktop.
     *
     * @typedef ServiceViewCallback
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    export interface ServiceViewCallback {
        /**
         * Indicates callback function when receive the page information.
         *
         * @type { ?Callback<ServiceViewReceiveData> }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        onReceive?: Callback<ServiceViewReceiveData>;
        /**
         * Indicates callback function when receive an error.
         *
         * @type { ?ErrorCallback }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        onError?: ErrorCallback;
        /**
         * Indicates callback function when the service view is visible to the user.
         *
         * @type { ?Callback<void> }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        onAppear?: Callback<void>;
        /**
         * Indicates callback function when the user dismisses the service view.
         *
         * @type { ?Callback<void> }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        onDisappear?: Callback<void>;
    }
    /**
     * Callback of opening the detail page.
     *
     * @typedef ProductViewCallback
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    export interface ProductViewCallback {
        /**
         * Indicates callback function when receive an error.
         *
         * @type { ?ErrorCallback }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 4.1.0(11)
         */
        onError?: ErrorCallback;
        /**
         * Indicates callback function when the product view is visible to the user.
         *
         * @type { ?Callback<void> }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        onAppear?: Callback<void>;
        /**
         * Indicates callback function when the user dismisses the product view.
         *
         * @type { ?Callback<void> }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        onDisappear?: Callback<void>;
    }
    /**
     * The result from checking add shortcut.
     *
     * @typedef CheckShortcutResult
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    export interface CheckShortcutResult {
        /**
         * Indicates transaction ID for requesting new shortcut.
         *
         * @type { ?string }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        tid?: string;
        /**
         * Indicates expiration time of a transaction ID.
         *
         * @type { ?number }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        expired?: number;
        /**
         * Indicates result code of checking add shortcut.
         *
         * @type { number }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        code: number;
        /**
         * Indicates shortcut upper limit.
         *
         * @type { ?number }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        limit?: number;
    }
    /**
     * Ad exposure data for register attribution source.
     *
     * @typedef SKExposure
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    export interface SKExposure {
        /**
         * Identifier of the advertisement platform to which the advertisement task belongs.
         *
         * @type { string }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        adTechId: string;
        /**
         * Identifier of the advertisement task.
         *
         * @type { string }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        campaignId: string;
        /**
         * Identifier of the advertiser app published on AppGallery.
         *
         * @type { string }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        destinationId: string;
        /**
         * Identifier of the monitoring platform used for the advertising.
         *
         * @type { ?string[] }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        mmpIds?: string[];
        /**
         * Business information concerned by the ad platform, such as creative ideas or materials.
         *
         * @type { ?string }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        serviceTag?: string;
        /**
         * UUID used for computing signature.
         *
         * @type { string }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        nonce: string;
        /**
         * Timestamp of requesting advertisement.
         *
         * @type { number }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        timestamp: number;
        /**
         * Signature of advertisement info.
         *
         * @type { string }
         * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        signature: string;
    }
    /**
     * Request to open the harmony service detail page which is for adding card to desktop.
     *
     * @param { common.UIAbilityContext } context - Indicates the ui ability context of the media application.
     * @param { Want } want - Indicates the ability to start.
     * @param { ServiceViewCallback } [callback] - callback for opening the harmony service detail page.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    function loadService(context: common.UIAbilityContext, want: Want, callback?: ServiceViewCallback): void;
    /**
     * Request to open the application detail page.
     *
     * @param { common.UIAbilityContext } context - Indicates the ui ability context of the media application.
     * @param { Want } want - Indicates the ability to start.
     * @param { ProductViewCallback } [callback] - callback for opening the application detail page.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    function loadProduct(context: common.UIAbilityContext, want: Want, callback?: ProductViewCallback): void;
    /**
     * Determine whether shortcut application is allowed.
     *
     * @param { common.UIAbilityContext } context - Indicates the ui ability context of the media application.
     * @param { string } shortcutId - Indicates shortcut id.
     * @param { Want } want - Indicates the ability to start when shortcut is clicked.
     * @param { string } labelResName - Indicates the resource key for shortcut label.
     * @param { string } iconResName - Indicates the resource key for shortcut icon.
     * @returns { Promise<CheckShortcutResult> } Returns the result of checking add shortcut.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1006620001 - System internal error.
     * @throws { BusinessError } 1006620002 - Request to service error.
     * @throws { BusinessError } 1006620003 - Shortcut id already exists.
     * @throws { BusinessError } 1006620004 - The number of shortcuts has reached the maximum.
     * @throws { BusinessError } 1006620005 - Shortcut verification failed.
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    function checkPinShortcutPermitted(context: common.UIAbilityContext, shortcutId: string, want: Want, labelResName: string, iconResName: string): Promise<CheckShortcutResult>;
    /**
     * Determine whether shortcut application is allowed.
     *
     * @param { common.UIAbilityContext } context - Indicates the ui ability context of the media application.
     * @param { string } shortcutId - Indicates shortcut id.
     * @param { Want } want - Indicates the ability to start when shortcut is clicked.
     * @param { string } label - Indicates the shortcut label content.
     * @param { string } foregroundIcon - Indicates the sandbox path for shortcut foreground icon.
     * @param { string } backgroundIcon - Indicates the sandbox path for shortcut background icon.
     * @returns { Promise<CheckShortcutResult> } Returns the result of checking add shortcut.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1006620001 - System internal error.
     * @throws { BusinessError } 1006620002 - Request to service error.
     * @throws { BusinessError } 1006620003 - Shortcut id already exists.
     * @throws { BusinessError } 1006620004 - The number of shortcuts has reached the maximum.
     * @throws { BusinessError } 1006620005 - Shortcut verification failed.
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    function checkPinShortcutPermitted(context: common.UIAbilityContext, shortcutId: string, want: Want, label: string, foregroundIcon: string, backgroundIcon: string): Promise<CheckShortcutResult>;
    /**
     * Request new shortcut.
     *
     * @param { common.UIAbilityContext } context - Indicates the ui ability context of the media application.
     * @param { string } tid - Indicates transaction ID for requesting new shortcut.
     * @returns { Promise<void> } Returns the promise of requesting add shortcut.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1006620001 - System internal error.
     * @throws { BusinessError } 1006620003 - Shortcut id already exists.
     * @throws { BusinessError } 1006620004 - The number of shortcuts has reached the maximum.
     * @throws { BusinessError } 1006620005 - Shortcut verification failed.
     * @throws { BusinessError } 1006620006 - The shortcut is not verified or has expired.
     * @throws { BusinessError } 1006620007 - User refused to add shortcut.
     * @syscap SystemCapability.AppGalleryService.Distribution.Recommendations
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    function requestNewPinShortcut(context: common.UIAbilityContext, tid: string): Promise<void>;
}
export default productViewManager;
