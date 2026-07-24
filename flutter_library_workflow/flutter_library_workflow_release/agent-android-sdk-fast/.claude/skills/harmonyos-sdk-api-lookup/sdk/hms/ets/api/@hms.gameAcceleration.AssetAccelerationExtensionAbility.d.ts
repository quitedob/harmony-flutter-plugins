/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Defines the class of the asset acceleration extension ability.
 * that enables apps to perform background downloads using an app extension.
 * @kit GraphicsAccelerateKit
 */
import type { BusinessError } from '@ohos.base';
import type assetDownloadManager from '@hms.gameAcceleration.assetDownloadManager';
import type AssetAccelerationExtensionContext from '@hms.gameAcceleration.AssetAccelerationExtensionContext';
/**
 * The info of app asset acceleration extension.
 *
 * @interface AssetAccelerationExtensionInfo
 * @syscap SystemCapability.GraphicsGame.AssetAcceleration
 * @stagemodelonly
 * @since 5.1.0(18)
 */
export interface AssetAccelerationExtensionInfo {
    /**
     * The maximum disk space capacity (in bytes) for background resource downloads as configured by the developer on the resource management platform.
     * The extension will be scheduled only when the system's overall remaining space is more than three times this `maxBackgroundDownloadSize`.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    readonly maxBackgroundDownloadSize: number;
    /**
     * A whitelist of domain names corresponding to the download URLs. Download tasks with domain names not included in this list will fail directly.
     *
     * @type { string[] }
     * @readonly
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    readonly domainList: string[];
}
/**
 * Indicates the type of content request.
 *
 * @typedef { 'INSTALL' | 'UPDATE' | 'IDLE' }
 * @syscap SystemCapability.GraphicsGame.AssetAcceleration
 * @stagemodelonly
 * @since 5.1.0(18)
 */
export type ContentRequestType = 'INSTALL' | 'UPDATE' | 'IDLE';
/**
 * Class of the asset acceleration extension ability.
 *
 * @syscap SystemCapability.GraphicsGame.AssetAcceleration
 * @stagemodelonly
 * @since 5.1.0(18)
 */
export default class AssetAccelerationExtensionAbility {
    /**
     * Indicates asset acceleration extension ability context.
     *
     * @type { AssetAccelerationExtensionContext }
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    context: AssetAccelerationExtensionContext;
    /**
     * Callback invoked when the app is installed, updated, or during system-scheduled idle time.
     *
     * @param { ContentRequestType } requestType - The type of content request, such as `INSTALL`, `UPDATE`, or `IDLE`.
     * @param { string } manifestUrl - The URL of the manifest file. If using Huawei CDN-hosted resources, this URL is provided by the system.
     *                                 if using other CDNs, this parameter will be empty.
     * @param { AssetAccelerationExtensionInfo } assetAccelerationExtensionInfo - Information about the asset acceleration extension.
     * @returns { Promise<assetDownloadManager.AssetDownloadConfig[]> } A promise that resolves to an array of `assetDownloadManager.AssetDownloadConfig`
     *                                                                  objects. The array size must not exceed 200 items.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    onDownloadContentRequest(requestType: ContentRequestType, manifestUrl: string, assetAccelerationExtensionInfo: AssetAccelerationExtensionInfo): Promise<assetDownloadManager.AssetDownloadConfig[]>;
    /**
     * Callback invoked when the app is installed, updated, or during system-scheduled idle time.
     *
     * @param { ContentRequestType } requestType - The type of content request, such as INSTALL, UPDATE, or IDLE.
     * @param { string } manifestUrl - The URL of the manifest file. If using Huawei CDN-hosted resources, this URL is provided by the system.
     *                                 If using other CDNs, this parameter will be empty.
     * @param { AssetAccelerationExtensionInfo } assetAccelerationExtensionInfo - Information about the asset acceleration extension.
     * @returns { Promise<boolean> }
     *          If the return value is `true`, it indicates that there is a resource package to download, and the extension process will continue.
     *          If the return value is `false`, it indicates that there are no resource packages to download, the extension process will be terminated.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.1(19)
     */
    onDownloadWithAppControl(requestType: ContentRequestType, manifestUrl: string, assetAccelerationExtensionInfo: AssetAccelerationExtensionInfo): Promise<boolean>;
    /**
     * Callback invoked when a download completes successfully.
     *
     * @param { assetDownloadManager.AssetDownloadTask } downloadTask - Information about the download task.
     * @param { string } filePath - The URL where the downloaded file is saved.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    onBackgroundDownloadSucceeded(downloadTask: assetDownloadManager.AssetDownloadTask, filePath: string): Promise<void>;
    /**
     * Callback invoked when a download fails.
     *
     * @param { assetDownloadManager.AssetDownloadTask } downloadTask - Information about the download task.
     * @param { assetDownloadManager.DownloadFault } fault - The reason for the download failure.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    onBackgroundDownloadFailed(downloadTask: assetDownloadManager.AssetDownloadTask, fault: assetDownloadManager.DownloadFault): Promise<void>;
    /**
     * Callback invoked when extension will terminate.
     *
     * @param { BusinessError<void> } error - 1. 401 - Parameter error.
     *                                        2. 1016600005 - Extension life cycle callback execution timed out.
     *                                        3. 1016600006 - An exception occurs in the callback extension js.
     *                                        4. 1016600094 - Task service ability error.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    onExtensionWillTerminate(error?: BusinessError<void>): Promise<void>;
}
