/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file
 * @kit GraphicsAccelerateKit
 */
import type { Callback } from '@ohos.base';
import type common from '@ohos.app.ability.common';
/**
 * The module provider asset download management capability.
 *
 * @namespace assetDownloadManager
 * @syscap SystemCapability.GraphicsGame.AssetAcceleration
 * @stagemodelonly
 * @since 5.1.0(18)
 */
declare namespace assetDownloadManager {
    /**
     * Enumerates the reasons why a download task failed.
     *
     * @enum { number }
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    export enum DownloadFault {
        /**
         * The download file already exists.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        FAULT_FILE_ALREADY_EXISTS = 0,
        /**
         * File operation failed.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        FAULT_FILE_ERROR = 1,
        /**
         * Insufficient space.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        FAULT_INSUFFICIENT_SPACE = 2,
        /**
         * Connection was lost or disconnected during the download.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        FAULT_DISCONNECT = 3,
        /**
         * Download timed out (e.g., HTTP 408 Request Timeout, 504 Gateway Timeout).
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        FAULT_TIMEOUT = 4,
        /**
         * HTTP protocol error, such as server internal error (HTTP 500) or bad request (HTTP 400).
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        FAULT_PROTOCOL = 5,
        /**
         * Domain name resolution error (DNS error), unable to resolve the server address.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        FAULT_DNS = 6,
        /**
         * SSL/TLS certificate error.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        FAULT_SSL = 7,
        /**
         * Redirect error, such as exceeding maximum redirect limit or invalid redirect URL.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        FAULT_REDIRECT = 8,
        /**
         * Unknown error.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        FAULT_UNKNOWN = 9
    }
    /**
     * Indicate the current state of the task.
     *
     * @enum { number }
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    export enum State {
        /**
         * A state that indicates a created download.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        CREATED = 0,
        /**
         * A state that indicates a download is waiting to execute.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        WAITING = 1,
        /**
         * A state that indicates a download is in progress.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        DOWNLOADING = 2,
        /**
         * A state that indicates a download is in pause.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        PAUSED = 3,
        /**
         * A state that indicates a finished download.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        FINISHED = 4,
        /**
         * A state that indicates a failed download.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        FAILED = 5
    }
    /**
     * Represents the configuration of an asset download task.
     *
     * @interface AssetDownloadConfig
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    export interface AssetDownloadConfig {
        /**
         * A unique identifier for the downloadable asset within a group. This string is application-specific and helps to identify the asset.
         *
         * @type { string }
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        identifier: string;
        /**
         * The URL of the current download.
         *
         * @type { string }
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        url: string;
        /**
         * The download is isEssential resource. The download priority of necessary resources is higher than that of unnecessary resources.
         *
         * @type { boolean }
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        isEssential: boolean;
        /**
         * The groupId of the current download.
         *
         * @type { ?string }
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        groupId?: string;
        /**
         * The fileName of the download object. If filename is entered in the download task, the temporary file downloaded by the system is named after the
         * filename. Otherwise, the file is named after the taskID.
         *
         * @type { ?string }
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        fileName?: string;
        /**
         * The starting byte for HTTP range requests (bytes=begins-ends).
         *
         * @type { ?number }
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        begins?: number;
        /**
         * The ending byte for HTTP range requests (bytes=begins-ends).
         *
         * @type { ?number }
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        ends?: number;
        /**
         * Additional user data for the download task, up to 1KB.
         *
         * @type { ?string }
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        userData?: string;
    }
    /**
     * Represents the information of an asset download task.
     *
     * @interface AssetDownloadConfig
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    export interface AssetDownloadTask {
        /**
         * The configuration details for the asset download task. Contains parameters like URL, identifier, and download priority.
         *
         * @type { AssetDownloadConfig }
         * @readonly
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        readonly config: AssetDownloadConfig;
        /**
         * The system-generated task ID that uniquely identifies the download object. This task ID is read-only and automatically assigned by the system.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        readonly taskId: string;
        /**
         * The current state of the download. The state is managed and updated by the system.
         *
         * @type { State }
         * @readonly
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        readonly state: State;
    }
    /**
     * The info of download progress.
     *
     * @interface AssetDownloadTask
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    export interface DownloadProgressInfo {
        /**
         * The asset download task info.
         *
         * @type { AssetDownloadTask }
         * @readonly
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        readonly downloadTask: AssetDownloadTask;
        /**
         * The total number of bytes the system writes to disk for the asset download.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        readonly totalBytesWritten: number;
        /**
         * The total size, in bytes, that the framework expects to receive for the asset download.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        readonly totalExpectedBytes: number;
    }
    /**
     * The info of download Complete.
     *
     * @interface AssetDownloadTask
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    export interface DownloadCompletedInfo {
        /**
         * The asset download task info.
         *
         * @type { AssetDownloadTask }
         * @readonly
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        readonly downloadTask: AssetDownloadTask;
        /**
         * Local address for downloading file.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        readonly filePath: string;
    }
    /**
     * The info of download task failed.
     *
     * @interface AssetDownloadTask
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    export interface DownloadFailedInfo {
        /**
         * The asset download info.
         *
         * @type { AssetDownloadTask }
         * @readonly
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        readonly downloadTask: AssetDownloadTask;
        /**
         * Download failure error code.
         *
         * @type { DownloadFault }
         * @readonly
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        readonly fault: DownloadFault;
    }
    /**
     * Register download-progress callback.
     *
     * @param { 'progress' } type - Event types.
     * @param { Callback<DownloadProgressInfo[]> } callback - Callback function with a `Array<DownloadProgressInfo>` argument.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function on(type: 'progress', callback: Callback<DownloadProgressInfo[]>): void;
    /**
     * Unregister download-progress callback.
     *
     * @param { 'progress' } type - Event types.
     * @param { Callback<DownloadProgressInfo[]> } callback - Callback function with a `Array<DownloadProgressInfo>` argument.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function off(type: 'progress', callback?: Callback<DownloadProgressInfo[]>): void;
    /**
     * Register download-progress callback.
     *
     * @param { 'pause' } type - Event types.
     * @param { Callback<AssetDownloadTask> } callback - Callback function with a `AssetDownloadTask` argument.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function on(type: 'pause', callback: Callback<AssetDownloadTask>): void;
    /**
     * Register download-progress callback.
     *
     * @param { 'pause' } type - Event types.
     * @param { Callback<AssetDownloadTask> } callback - Callback function with a `AssetDownloadTask` argument.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function off(type: 'pause', callback?: Callback<AssetDownloadTask>): void;
    /**
     * Register download-completed callback.
     *
     * @param { 'complete' } type - Event types.
     * @param { Callback<DownloadCompletedInfo> } callback - Callback function with a `DownloadCompletedInfo` argument.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function on(type: 'complete', callback: Callback<DownloadCompletedInfo>): void;
    /**
     * Unregister download-completed callback.
     *
     * @param { 'complete' } type - Event types.
     * @param { Callback<DownloadCompletedInfo> } callback - Callback function with a `DownloadCompletedInfo` argument.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function off(type: 'complete', callback?: Callback<DownloadCompletedInfo>): void;
    /**
     * Register download-failed callback.
     *
     * @param { 'fail' } type - Event types.
     * @param { Callback<DownloadFailedInfo> } callback - Callback function with a `DownloadFailedInfo` argument.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function on(type: 'fail', callback: Callback<DownloadFailedInfo>): void;
    /**
     * Unregister download-failed callback.
     *
     * @param { 'fail' } type - Event types.
     * @param { Callback<DownloadFailedInfo> } callback - Callback function with a `DownloadFailedInfo` argument.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function off(type: 'fail', callback?: Callback<DownloadFailedInfo>): void;
    /**
     * Retrieves the manifest URL of the current application. This function is applicable only when using Huawei CDN hosting.
     * If a third-party CDN is used, it returns an empty string.
     *
     * @permission ohos.permission.INTERNET
     * @returns { Promise<string> } A Promise that resolves to the manifest URL of the current application. Returns an empty string if a third-party CDN is
     *                              used.
     * @throws { BusinessError } 201 - No Internet permission.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly Applicable only in Stage Model.
     * @since 5.1.0(18)
     */
    function fetchManifestUrl(): Promise<string>;
    /**
     * Add asset download task to system.
     *
     * @permission ohos.permission.INTERNET
     * @param { common.BaseContext } context - Application context.
     * @param { AssetDownloadConfig } downloadConfig - The configuration details for the asset download task.
     * @returns { Promise<string> } The promise taskID returned by the function.
     * @throws { BusinessError } 201 - No Internet permission.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600001 - The domain name of the download task is not in the domain name trustlist.
     * @throws { BusinessError } 1016600004 - The application task queue is full.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function addAssetDownloadTask(context: common.BaseContext, downloadConfig: AssetDownloadConfig): Promise<string>;
    /**
     * Pause asset download task.
     *
     * @permission ohos.permission.INTERNET
     * @param { string } taskId - The taskID of asset download.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - No Internet permission.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600002 - The task ID or group ID entered during operations such as pause, resume, and fetch does not exist.
     * @throws { BusinessError } 1016600003 - The current task status does not support the current operator.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function pauseAssetDownloadTask(taskId: string): Promise<void>;
    /**
     * Resume asset download task.
     *
     * @permission ohos.permission.INTERNET
     * @param { string } taskId - The taskID of asset download.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - No Internet permission.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600002 - The task ID or group ID entered during operations such as pause, resume, and fetch does not exist.
     * @throws { BusinessError } 1016600003 - The current task status does not support the current operator.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function resumeAssetDownloadTask(taskId: string): Promise<void>;
    /**
     * Remove asset download task.
     *
     * @param { string } taskId - The taskID of asset download.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600002 - The task ID or group ID entered during operations such as pause, resume, and fetch does not exist.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function removeAssetDownloadTask(taskId: string): Promise<void>;
    /**
     * Fetch asset download list.
     *
     * @returns { Promise<AssetDownloadTask[]> } The promise returned by the function.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function fetchAllAssetDownloadTasks(): Promise<AssetDownloadTask[]>;
    /**
     * Pause all asset download.
     *
     * @permission ohos.permission.INTERNET
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - No Internet permission.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function pauseAllAssetDownloadTasks(): Promise<void>;
    /**
     * Resume all asset download.
     *
     * @permission ohos.permission.INTERNET
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - No Internet permission.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function resumeAllAssetDownloadTasks(): Promise<void>;
    /**
     * Remove all asset download.
     *
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function removeAllAssetDownloadTasks(): Promise<void>;
    /**
     * Fetch asset download list by groupID.
     *
     * @param { string } groupId - The groupID in AssetDownloadTask.
     * @returns { Promise<AssetDownloadTask[]> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600002 - The task ID or group ID entered during operations such as pause, resume, and fetch does not exist.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function fetchGroupAssetDownloadTasks(groupId: string): Promise<AssetDownloadTask[]>;
    /**
     * Pause asset download list by groupID.
     *
     * @permission ohos.permission.INTERNET
     * @param { string } groupId - The groupID in AssetDownloadTask.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - No Internet permission.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600002 - The task ID or group ID entered during operations such as pause, resume, and fetch does not exist.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function pauseGroupAssetDownloadTasks(groupId: string): Promise<void>;
    /**
     * Resume asset download list by groupID.
     *
     * @permission ohos.permission.INTERNET
     * @param { string } groupId - The groupID in AssetDownloadTask.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - No Internet permission.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600000 - The API call from an ExtensionAbility is not allowed.
     * @throws { BusinessError } 1016600002 - The task ID or group ID entered during operations such as pause, resume, and fetch does not exist.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function resumeGroupAssetDownloadTasks(groupId: string): Promise<void>;
    /**
     * Remove asset download list by groupID.
     *
     * @param { string } groupId - The groupID in AssetDownloadTask.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600002 - The task ID or group ID entered during operations such as pause, resume, and fetch does not exist.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function removeGroupAssetDownloadTasks(groupId: string): Promise<void>;
    /**
     * Network speed limit levels.
     *
     * @enum { number } NetSpeedLevel.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    export enum NetSpeedLevel {
        /**
         * No speed limit.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        NO_LIMIT = 0,
        /**
         * Limited medium speed.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        LIMIT_MEDIUM = 1,
        /**
         * Limited low speed.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.0(18)
         */
        LIMIT_LOW = 2
    }
    /**
     * Applies a speed limit to the specified list of download tasks.
     *
     * @permission ohos.permission.INTERNET
     * @param { string[] } taskIds - An array of download task IDs to which the speed limit will be applied.
     * @param { NetSpeedLevel } speedLimit - The desired network speed limit level.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - No Internet permission.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function limitDownloadTaskSpeed(taskIds: string[], speedLimit: NetSpeedLevel): Promise<void>;
    /**
     * The current status of the download when managed by the app's own download manager.
     *
     * @enum { number } AppDownloadStatus.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.1(19)
     */
    export enum AppDownloadStatus {
        /**
         * The download is still ongoing.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.1(19)
         */
        IN_PROGRESS = 0,
        /**
         * The download has completed.
         *
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.1(19)
         */
        FINISH = 1
    }
    /**
     * The current download progress info of the download when managed by the app's own download manager.
     *
     * @interface AppDownloadProgress
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.1(19)
     */
    export interface AppDownloadProgress {
        /**
         * The number of bytes that have been successfully downloaded so far.
         * This represents the progress of the download.
         *
         * @type { number }
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.1(19)
         */
        totalBytesWritten: number;
        /**
         * The total number of bytes expected to be downloaded.
         * This is the target size for the download.
         *
         * @type { number }
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.1(19)
         */
        totalExpectedBytes: number;
        /**
         * The total number of files involved in the download.
         * This includes all resources to be downloaded as part of the operation.
         *
         * @type { number }
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.1(19)
         */
        totalFiles: number;
        /**
         * The number of files that have been successfully downloaded.
         * This helps in tracking the progress in terms of the files downloaded,
         * in addition to the bytes downloaded.
         *
         * @type { number }
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.1(19)
         */
        successCount: number;
        /**
         * The number of files that failed to download.
         * This is useful for error handling and understanding any issues that occurred during the download.
         *
         * @type { number }
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.1(19)
         */
        failureCount: number;
        /**
         * The current status of the download.
         * It indicates whether the download is still in progress or has finished.
         *
         * @type { AppDownloadStatus }
         * @syscap SystemCapability.GraphicsGame.AssetAcceleration
         * @stagemodelonly
         * @since 5.1.1(19)
         */
        status: AppDownloadStatus;
    }
    /**
     * Report the download progress information for app-managed pre-downloads
     *
     * @param { AppDownloadProgress } progressInfo - download details progress info
     * @throws { BusinessError } 1016600094 - Task service ability error.
     * @throws { BusinessError } 1016600401 - Parameter error.
     * @syscap SystemCapability.GraphicsGame.AssetAcceleration
     * @stagemodelonly
     * @since 5.1.1(19)
     */
    function reportDownloadProgress(progressInfo: AppDownloadProgress): void;
}
export default assetDownloadManager;
