/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file
 * @kit ScenarioFusionKit
 */
import window from '@ohos.window';
import type { AsyncCallback } from '@ohos.base';
/**
 * Scenario API
 *
 * @namespace atomicService
 * @syscap SystemCapability.AtomicserviceComponent.atomicservice
 * @StageModelOnly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace atomicService {
    /**
     * System Settings Properties
     *
     * @typedef SystemSettingInfo
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface SystemSettingInfo {
        /**
         * Bluetooth switch
         *
         * @type { ?boolean }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        bluetoothEnabled?: boolean;
        /**
         * Location switch
         *
         * @type { ?boolean }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        locationEnabled?: boolean;
        /**
         * Wi-Fi switch
         *
         * @type { ?boolean }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        wifiEnabled?: boolean;
        /**
         * Device orientation
         *
         * @type { ?string }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        deviceOrientation?: string;
    }
    /**
     * System Information Properties
     *
     * @typedef SystemInfo
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface SystemInfo {
        /**
         * Device Brand
         *
         * @type { ?string }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        brand?: string;
        /**
         * Device Model
         *
         * @type { ?string }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        deviceModel?: string;
        /**
         * Screen Width
         *
         * @type { ?number }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        screenWidth?: number;
        /**
         * Screen Height
         *
         * @type { ?number }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        screenHeight?: number;
        /**
         * Status bar height
         *
         * @type { ?number }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        statusBarHeight?: number;
        /**
         * Screen security zone
         *
         * @type { ?window.AvoidArea }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        screenSafeArea?: window.AvoidArea;
        /**
         * Current system language
         *
         * @type { ?string }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        language?: string;
        /**
         * Operating system version
         *
         * @type { ?string }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        osFullName?: string;
        /**
         * System Font Size
         *
         * @type { ?number }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        fontSizeSetting?: number;
        /**
         * SDK Api Version
         *
         * @type { ?number }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        sdkApiVersion?: number;
        /**
         * Bluetooth switch
         *
         * @type { ?boolean }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        bluetoothEnabled?: boolean;
        /**
         * Location switch
         *
         * @type { ?boolean }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        locationEnabled?: boolean;
        /**
         * Wi-Fi switch
         *
         * @type { ?boolean }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        wifiEnabled?: boolean;
        /**
         * Device orientation
         *
         * @type { ?string }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        deviceOrientation?: string;
        /**
         * System current theme
         *
         * @type { ?ColorMode }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        theme?: ColorMode;
        /**
         * Usable Window Width
         *
         * @type { ?number }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        windowWidth?: number;
        /**
         * Usable Window Height
         *
         * @type { ?number }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        windowHeight?: number;
    }
    /**
     * Enum for follow result.
     *
     * @enum { number }
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.1(21)
     */
    enum FollowResult {
        /**
         * Follow success.
         *
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.1(21)
         */
        SUCCESS = 0,
        /**
         * Follow failed.
         *
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.1(21)
         */
        FAILED = 1
    }
    /**
     * The params for FollowComponent.
     *
     * @typedef FollowComponentParams
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.1(21)
     */
    interface FollowComponentParams {
        /**
         * The service account id.
         *
         * @type { string }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.1(21)
         */
        pubId: string;
        /**
         * The channel id.
         *
         * @type { ?string }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.1(21)
         */
        channelId?: string;
        /**
         * The param for component offset.
         *
         * @type { ?(Position | Edges | LocalizedEdges) }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.1(21)
         */
        offset?: Position | Edges | LocalizedEdges;
    }
    /**
     * The follow complete result.
     *
     * @typedef FollowCompleteResult
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.1(21)
     */
    interface FollowCompleteResult {
        /**
         * The follow result code.
         *
         * @type { FollowResult }
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.1(21)
         */
        code: FollowResult;
    }
    /**
     * The callback for the followComponent.
     *
     * @typedef FollowComponentCallback
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.1(21)
     */
    interface FollowComponentCallback {
        /**
         * The callback function for follow complete.
         *
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @type { AsyncCallback<FollowCompleteResult> }
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.1(21)
         */
        onFollowComplete: AsyncCallback<FollowCompleteResult>;
    }
    /**
     * Types of SystemInfo.
     *
     * @typedef { string }
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export type SystemInfoType = 'brand' | 'deviceModel' | 'screenWidth' | 'screenHeight' | 'statusBarHeight' | 'screenSafeArea' | 'language' | 'osFullName' | 'fontSizeSetting' | 'sdkApiVersion' | 'bluetoothEnabled' | 'locationEnabled' | 'wifiEnabled' | 'deviceOrientation' | 'theme' | 'windowWidth' | 'windowHeight';
    /**
     * Type of SystemSetting.
     *
     * @typedef { string }
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export type SystemSettingType = 'bluetoothEnabled' | 'locationEnabled' | 'wifiEnabled' | 'deviceOrientation';
    /**
     * Obtains system information such as the device, network status, screen, language, and theme.
     *
     * @param { Array<SystemInfoType> } [properties] - Indicates the list of parameters to be obtained. This parameter
     *     can be null or empty.
     * @returns { SystemInfo }
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getSystemInfoSync(properties?: Array<SystemInfoType>): SystemInfo;
    /**
     * Obtains system information such as the device, network status, screen, language, and theme.
     *
     * @param { Array<SystemInfoType> } [properties] - Indicates the list of parameters to be obtained. This parameter can
     *     be null or empty.
     * @returns { Promise<SystemInfo> }
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getSystemInfo(properties?: Array<SystemInfoType>): Promise<SystemInfo>;
    /**
     * Obtains system information, including Bluetooth, location, Wi-Fi status, and device direction information.
     *
     * @param { Array<SystemSettingType> } [properties] - Indicates the list of parameters to be obtained. This parameter
     *     can be null or empty.
     * @returns { SystemSettingInfo }
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getSystemSetting(properties?: Array<SystemSettingType>): SystemSettingInfo;
    /**
     * Show followComponent.
     *
     * @param { UIContext } ctx - The UIContext of UIAbility.
     * @param { FollowComponentParams } params - The params for the followComponent.
     * @param { FollowComponentCallback } callback - The callback for the followComponent.
     * @returns { Promise<void> }
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1009601001 - Invalid service account id.
     * @throws { BusinessError } 1009601002 - The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1009601003 - Request server failed.
     * @throws { BusinessError } 1009601004 - Network connection error.
     * @throws { BusinessError } 1009601005 - Other error.
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.1(21)
     */
    function showFollowComponent(ctx: UIContext, params: FollowComponentParams, callback: FollowComponentCallback): Promise<void>;
}
export default atomicService;
