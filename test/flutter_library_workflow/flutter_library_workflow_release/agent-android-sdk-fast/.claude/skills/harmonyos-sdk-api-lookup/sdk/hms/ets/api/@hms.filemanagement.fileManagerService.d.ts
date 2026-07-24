/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Defines the capabilities of FileManagerServiceKit.
 * @kit FileManagerServiceKit
 */
/**
 * This module provides the capability of FileManagerService.
 * @namespace fileManagerService
 * @syscap SystemCapability.FileManagement.FileManagerService.Core
 * @since 5.0.5(17)
 */
declare namespace fileManagerService {
    /**
     * Delete file or directory to trash.
     *
     * @param { string } uri - File or directory to delete.
     * @returns { Promise<string> } - Uri of file or directory in trash.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1014000001 - Operation not permitted.
     * @throws { BusinessError } 1014000002 - No such file or directory.
     * @throws { BusinessError } 1014000003 - No space left on device.
     * @throws { BusinessError } 1014000004 - System inner fail.
     * @syscap SystemCapability.FileManagement.FileManagerService.Core
     * @since 5.0.5(17)
     */
    function deleteToTrash(uri: string): Promise<string>;
    /**
     * Get file icon based on specified file type.
     *
     * @permission ohos.permission.GET_FILE_ICON
     * @param { string } fileType - File type.
     * @returns { string | Resource } - The base64 encoding of the icon or the Resource object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified.
     * 2.Incorrect parameter types.
     * 3.Parameter verification failed.
     * @throws { BusinessError } 1014000004 - System inner fail.
     * @syscap SystemCapability.FileManagement.FileManagerService.Core
     * @since 5.0.5(17)
     */
    function getFileIconSync(fileType: string): string | Resource;
    /**
     * Get file icon based on specified file type.
     *
     * @permission ohos.permission.GET_FILE_ICON
     * @param { string } fileType - File type.
     * @returns { Promise<string | Resource> } - The base64 encoding of the icon or the Resource object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified.
     * 2.Incorrect parameter types.
     * 3.Parameter verification failed.
     * @throws { BusinessError } 1014000004 - System inner fail.
     * @syscap SystemCapability.FileManagement.FileManagerService.Core
     * @since 5.0.5(17)
     */
    function getFileIcon(fileType: string): Promise<string | Resource>;
}
export default fileManagerService;
