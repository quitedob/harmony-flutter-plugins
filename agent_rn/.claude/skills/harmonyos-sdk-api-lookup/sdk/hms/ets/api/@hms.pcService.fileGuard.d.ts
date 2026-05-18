/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file This module providers the capability to mark and control documents.
 * @kit EnterpriseDataGuardKit
 */
import type { AsyncCallback, Callback } from '@ohos.base';
/**
 * The module providers the capability to mark and control documents.
 *
 * @namespace fileGuard
 * @syscap SystemCapability.PCService.FileGuard
 * @since 4.0.0(10)
 */
declare namespace fileGuard {
    /**
     * Provides common directory scan type definition.
     *
     * @enum { number } CommonDirScanType
     * @syscap SystemCapability.PCService.FileGuard
     * @since 4.0.0(10)
     */
    enum CommonDirScanType {
        /**
         * Indicates a scan file task type for the media directory.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        MEDIA_ONLY = 0,
        /**
         * Indicates a scan file task type for the media and sandbox directory.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        MEDIA_AND_SANDBOX = 1
    }
    /**
     * Provides file security level.
     *
     * @enum { number } SecurityLevel
     * @syscap SystemCapability.PCService.FileGuard
     * @since 4.0.0(10)
     */
    enum SecurityLevel {
        /**
         * Indicates that the security level is public.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        EXTERNAL = 0,
        /**
         * Indicates that the security level is internal.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        INTERNAL = 1,
        /**
         * Indicates that the security level is secret.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        SECRET = 2,
        /**
         * Indicates that the security level is confidential.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        CONFIDENTIAL = 3,
        /**
         * Indicates that the security level is top secret.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        TOP_SECRET = 4,
        /**
         * Indicates that the security level is not set.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 5.1.1(19)
         */
        DEFAULT = -1
    }
    /**
     * Provides path information of a file, including the absolute path and uri.
     *
     * @interface FilePathInfo
     * @syscap SystemCapability.PCService.FileGuard
     * @since 4.0.0(10)
     */
    interface FilePathInfo {
        /**
         * The absolute path of a file.
         *
         * @type { string }
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        absolutePath: string;
        /**
         * The uri of a file.
         *
         * @type { string }
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        uri: string;
    }
    /**
     * Provides tag information of a file, including the security level and tag.
     *
     * @interface FileTagInfo
     * @syscap SystemCapability.PCService.FileGuard
     * @since 4.0.0(10)
     */
    interface FileTagInfo {
        /**
         * The security level of a file, including external, internal, secret, confidential and top_secret.
         *
         * @type { number }
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        securityLevel: number;
        /**
         * The tag information of a file.
         *
         * @type { string }
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        tag: string;
    }
    /**
     * Provides methods for file scanning callback.
     *
     * @interface ScanFileCallback
     * @syscap SystemCapability.PCService.FileGuard
     * @since 4.0.0(10)
     */
    interface ScanFileCallback {
        /**
         * Notifies the client of the scan result.
         *
         * @param { Array<string> } files - List of scanned files.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        onReceiveFileList(files: Array<string>): void;
        /**
         * Notifies the client that the scan task is completed.
         *
         * @param { number } count - Total number of scanned files.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        onTaskCompleted(count: number): void;
    }
    /**
     * Provides methods for file management and control.
     *
     * @syscap SystemCapability.PCService.FileGuard
     * @since 4.0.0(10)
     */
    class FileGuard {
        /**
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        constructor();
        /**
         * start to get file list from common directory.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { CommonDirScanType } type - Public directory scan scope.
         * @param { ScanFileCallback } callback - The callback of scan result.
         * @param { number } [batchNum] - The number of file lists returned each time.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        startFileScanTask(type: CommonDirScanType, callback: ScanFileCallback, batchNum?: number): void;
        /**
         * start to get file list from customized directory.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - The customized directory.
         * @param { ScanFileCallback } callback - The callback of scan result.
         * @param { number } [batchNum] - The number of file lists returned each time.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        startFileScanTask(path: string, callback: ScanFileCallback, batchNum?: number): void;
        /**
         * Open a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the file.
         * @param { AsyncCallback<number> } callback - The callback is used to return the file descriptor.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        openFile(path: string, callback: AsyncCallback<number>): void;
        /**
         * Open a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the file.
         * @returns { Promise<number> } Returns the file descriptor.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        openFile(path: string): Promise<number>;
        /**
         * Set file tag for a KIA File.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @param { SecurityLevel } level - File security level.
         * @param { string } tag - File attribute tag.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        setFileTag(path: string, level: SecurityLevel, tag: string, callback: AsyncCallback<void>): void;
        /**
         * Set file tag for a KIA File.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @param { SecurityLevel } level - File security level.
         * @param { string } tag - File attribute tag.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        setFileTag(path: string, level: SecurityLevel, tag: string): Promise<void>;
        /**
         * Query file tag.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @param { AsyncCallback<FileTagInfo> } callback - The callback is used to return the security level and tag.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        queryFileTag(path: string, callback: AsyncCallback<FileTagInfo>): void;
        /**
         * Query file tag.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @returns { Promise<FileTagInfo> } Returns the security level and tag.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        queryFileTag(path: string): Promise<FileTagInfo>;
        /**
         * get the URI of a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @param { AsyncCallback<FilePathInfo> } callback - The callback is used to return the absolute file path and uri
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        getFileUri(path: string, callback: AsyncCallback<FilePathInfo>): void;
        /**
         * get the URI of a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @returns { Promise<FilePathInfo> } Returns the absolute file path and uri
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        getFileUri(path: string): Promise<FilePathInfo>;
        /**
         * Delete a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        deleteFile(path: string, callback: AsyncCallback<void>): void;
        /**
         * Delete a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        deleteFile(path: string): Promise<void>;
        /**
         * Update the security control policy.
         * @permission ohos.permission.SET_FILE_GUARD_POLICY
         * @param { string } policy - The security control policy.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        updatePolicy(policy: string, callback: AsyncCallback<void>): void;
        /**
         * Update the security control policy.
         * @permission ohos.permission.SET_FILE_GUARD_POLICY
         * @param { string } policy - The security control policy.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        updatePolicy(policy: string): Promise<void>;
        /**
         * Set the KIA file list.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } filelist - KIA file list.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        setKiaFilelist(filelist: string, callback: AsyncCallback<void>): void;
        /**
         * Set the KIA file list.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } filelist - KIA file list.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        setKiaFilelist(filelist: string): Promise<void>;
        /**
         * listening the kia file copy event.
         *
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { 'kiaCopy' } type - Type of the kia file copy event to listen for.
         * @param { Callback<string> } callback - Callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 5.0.3(15)
         */
        on(type: 'kiaCopy', callback: Callback<string>): void;
        /**
         * Cancel listening the kia file copy event.
         *
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { 'kiaCopy' } type - Type of the kia file copy event to listen for.
         * @param { Callback<string> } [callback] - Callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 5.0.3(15)
         */
        off(type: 'kiaCopy', callback?: Callback<string>): void;
        /**
         * listening the kia file rename event.
         *
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { 'kiaRename' } type - Type of the kia file rename event to listen for.
         * @param { Callback<string> } callback - Callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 5.0.3(15)
         */
        on(type: 'kiaRename', callback: Callback<string>): void;
        /**
         * Cancel listening the kia file rename event.
         *
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { 'kiaRename' } type - Type of the kia file rename event to listen for.
         * @param { Callback<string> } [callback] - Callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 5.0.3(15)
         */
        off(type: 'kiaRename', callback?: Callback<string>): void;
        /**
         * listening the kia file compress event.
         *
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { 'kiaCompress' } type - Type of the kia file compress event to listen for.
         * @param { Callback<string> } callback - Callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 5.0.3(15)
         */
        on(type: 'kiaCompress', callback: Callback<string>): void;
        /**
         * Cancel listening the kia file compress event.
         *
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { 'kiaCompress' } type - Type of the kia file compress event to listen for.
         * @param { Callback<string> } [callback] - Callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 5.0.3(15)
         */
        off(type: 'kiaCompress', callback?: Callback<string>): void;
        /**
         * Set the watermark image for Kia file
         * @permission ohos.permission.SET_FILE_GUARD_POLICY
         * @param { Uint8Array } image - Watermark image data.
         * @param { string } info - Watermark Additional Information.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 5.0.3(15)
         */
        setKiaWatermarkImage(image: Uint8Array, info: string): Promise<void>;
        /**
         * Open a file with write permission.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the file.
         * @returns { Promise<number> } Returns the file descriptor.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1. Mandatory parameters are left unspecified.
         * 2. Incorrect parameter types.
         * 3. Parameter verification failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 5.1.1(19)
         */
        openFileWrite(path: string): Promise<number>;
        /**
         * Open a file with write permission.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the file.
         * @param { AsyncCallback<number> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1. Mandatory parameters are left unspecified.
         * 2. Incorrect parameter types.
         * 3. Parameter verification failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 5.1.1(19)
         */
        openFileWrite(path: string, callback: AsyncCallback<number>): void;
        /**
         * Sets a custom tag for a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @param { Array<string> } tagList - File attribute tag list.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1001700103 - The path is not exist.
         * @throws { BusinessError } 1001700104 - The tag list check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 5.1.1(19)
         */
        setFileCustomTag(path: string, tagList: Array<string>, callback: AsyncCallback<void>): void;
        /**
         * Sets a custom tag for a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @param { Array<string> } tagList - File attribute tag list.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1001700103 - The path is not exist.
         * @throws { BusinessError } 1001700104 - The tag list check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 5.1.1(19)
         */
        setFileCustomTag(path: string, tagList: Array<string>): Promise<void>;
        /**
         * Cancels the custom tag set for a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @param { Array<string> } tagList - File attribute tag list.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1001700103 - The path is not exist.
         * @throws { BusinessError } 1001700104 - The tag list check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 5.1.1(19)
         */
        unsetFileCustomTag(path: string, tagList: Array<string>, callback: AsyncCallback<void>): void;
        /**
         * Cancels the custom tag set for a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @param { Array<string> } tagList - File attribute tag list.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 1001700103 - The path is not exist.
         * @throws { BusinessError } 1001700104 - The tag list check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 5.1.1(19)
         */
        unsetFileCustomTag(path: string, tagList: Array<string>): Promise<void>;
    }
}
export default fileGuard;
