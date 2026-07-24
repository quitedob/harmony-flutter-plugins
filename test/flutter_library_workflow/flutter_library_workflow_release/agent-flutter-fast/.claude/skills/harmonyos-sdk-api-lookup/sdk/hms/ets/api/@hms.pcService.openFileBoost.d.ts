/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Declares the capabilities of open file boost module.
 * @kit PreviewKit
 */
import type { Callback } from '@ohos.base';
/**
 * Defines the capability set of the Open File Boost service.
 * @namespace openFileBoost
 * @syscap SystemCapability.PCService.OpenFileBoost
 * @since 5.0.5(17)
 */
declare namespace openFileBoost {
    /**
     * File preloading status.
     * @enum { number }
     * @syscap SystemCapability.PCService.OpenFileBoost
     * @since 5.0.5(17)
     */
    export enum FilePreloadState {
        /**
         * The file is not preloaded.
         * @syscap SystemCapability.PCService.OpenFileBoost
         * @since 5.0.5(17)
         */
        NOT_PRELOADED = 0,
        /**
         * File is preloading.
         * @syscap SystemCapability.PCService.OpenFileBoost
         * @since 5.0.5(17)
         */
        PRELOADING = 1,
        /**
         * File preloading completed.
         * @syscap SystemCapability.PCService.OpenFileBoost
         * @since 5.0.5(17)
         */
        PRELOADED = 2
    }
    /**
     * Describes the file preloading status information.
     * @typedef FilePreloadStatusInfo
     * @syscap SystemCapability.PCService.OpenFileBoost
     * @since 5.0.5(17)
     */
    export interface FilePreloadStatusInfo {
        /**
         * Sandbox path of the file.
         * @type { string }
         * @syscap SystemCapability.PCService.OpenFileBoost
         * @since 5.0.5(17)
         */
        sandboxPath: string;
        /**
         * File preloading progress.
         * @type { number }
         * @syscap SystemCapability.PCService.OpenFileBoost
         * @since 5.0.5(17)
         */
        progress: number;
        /**
         * File preloading status.
         * @type { FilePreloadState }
         * @syscap SystemCapability.PCService.OpenFileBoost
         * @since 5.0.5(17)
         */
        state: FilePreloadState;
    }
    /**
     * Registers the callback for file preloading status events. This API uses an asynchronous callback to return the result.
     *
     * @param { 'filePreloadStateChanged' } type - Listening event. This event is triggered and the corresponding
     *	information is returned only when the file preloading status changes.
     * @param { Callback<FilePreloadStatusInfo>} callback - Callback used to return the file preloading status.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError} 1017220001 - Internal failure.
     * @throws { BusinessError} 1017220002 - Service unavailable.
     * @syscap SystemCapability.PCService.OpenFileBoost
     * @since 5.0.5(17)
     */
    function on(type: 'filePreloadStateChanged', callback: Callback<FilePreloadStatusInfo>): void;
    /**
     * Unregisters the callback for file preloading status events. This API uses an asynchronous callback to return the result.
     *
     * @param { 'filePreloadStateChanged' } type - Listening event. This event is triggered and the corresponding
     * information is returned only when the file preloading status changes.
     * @param { Callback<FilePreloadStatusInfo> } [ callback ] - Callback used to return the result. If this parameter is
     * specified, the subscription to the specified event with the specified callback is canceled. (The callback object
     * cannot be an anonymous function.) Otherwise, the subscriptions to the specified event with all the callbacks
     * are canceled.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError} 1017220001 - Internal failure.
     * @throws { BusinessError} 1017220002 - Service unavailable.
     * @syscap SystemCapability.PCService.OpenFileBoost
     * @since 5.0.5(17)
     */
    function off(type: 'filePreloadStateChanged', callback?: Callback<FilePreloadStatusInfo>): void;
    /**
     * Listens to the preloading status of a file.
     * @param { string } file - File sandbox path.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError} 1017220001 - Internal failure.
     * @throws { BusinessError} 1017220002 - Service unavailable.
     * @throws { BusinessError } 1017220003 - The number of files exceeds the upper limit.
     * @syscap SystemCapability.PCService.OpenFileBoost
     * @since 5.0.5(17)
     */
    function addFile(file: string): void;
    /**
     * Unregisters a listener for the preloading status of a file.
     * @param { string } file - File sandbox path.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError} 1017220001 - Internal failure.
     * @throws { BusinessError} 1017220002 - Service unavailable.
     * @syscap SystemCapability.PCService.OpenFileBoost
     * @since 5.0.5(17)
     */
    function removeFile(file: string): void;
    /**
     * Queries the file preloading status.
     * @param { string } file - File sandbox path.
     * @returns { FilePreloadStatusInfo } - File preloading status.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError} 1017220001 - Internal failure.
     * @throws { BusinessError} 1017220002 - Service unavailable.
     * @syscap SystemCapability.PCService.OpenFileBoost
     * @since 5.0.5(17)
     */
    function queryFilePreloadStatusInfo(file: string): FilePreloadStatusInfo;
}
export default openFileBoost;
