/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */

/**
 * @file This module provides the capability of fileTransfer.
 * @kit EnterpriseSpaceKit
 */

/**
 * This module provides the capability of fileTransfer.
 *
 * @namespace fileTransfer
 * @syscap SystemCapability.EnterpriseSpace.SpaceDataTransfer
 * @since 6.0.0(20)
 */
declare namespace fileTransfer {
    /**
     * The parameters of audit information.
     *
     * @interface AuditInfo
     * @syscap SystemCapability.EnterpriseSpace.SpaceDataTransfer
     * @since 6.0.0(20)
     */
    interface AuditInfo {
        /**
         * The unique ID of an audit record.
         *
         * @type { string }
         * @syscap SystemCapability.EnterpriseSpace.SpaceDataTransfer
         * @since 6.0.0(20)
         */
        auditId: string;
        /**
         * Indicates the user identification.
         *
         * @type { string }
         * @syscap SystemCapability.EnterpriseSpace.SpaceDataTransfer
         * @since 6.0.0(20)
         */
        userId: string;
        /**
         * Indicates the user name.
         *
         * @type { string }
         * @syscap SystemCapability.EnterpriseSpace.SpaceDataTransfer
         * @since 6.0.0(20)
         */
        userName: string;
        /**
         * Indicates the time when the audit record was created.
         *
         * @type { number }
         * @syscap SystemCapability.EnterpriseSpace.SpaceDataTransfer
         * @since 6.0.0(20)
         */
        time: number;
        /**
         * Indicates the comments related to the audit record.
         *
         * @type { string }
         * @syscap SystemCapability.EnterpriseSpace.SpaceDataTransfer
         * @since 6.0.0(20)
         */
        comments: string;
        /**
         * Indicates the status of the audit record.
         *
         * @type { string }
         * @syscap SystemCapability.EnterpriseSpace.SpaceDataTransfer
         * @since 6.0.0(20)
         */
        status: string;
    }
    /**
     * Get audit information for a specified transfer task based on the transaction number.
     *
     * @permission ohos.permission.ENTERPRISE_FILE_TRANSFER_AUDIT_POLICY_MANAGEMENT
     * @param { string } transactionNum - Indicates a transaction number corresponding to the transfer tasks.
     * @returns { AuditInfo } - Returns the audit information.
     * @throws { BusinessError } 201 - the application does not have permission to call this function.
     * @throws { BusinessError } 1020300001 - System service exception.
     * @throws { BusinessError } 1020300002 - Parameter error.
     * @syscap SystemCapability.EnterpriseSpace.SpaceDataTransfer
     * @since 6.0.0(20)
     */
    function getAuditInfo(transactionNum: string): AuditInfo;
    /**
     * Sets audit information.
     *
     * @permission ohos.permission.ENTERPRISE_FILE_TRANSFER_AUDIT_POLICY_MANAGEMENT
     * @param { string } transactionNum - Indicates a transaction number corresponding to the transfer tasks.
     * @param { AuditInfo } info - Indicates the audit information to set for the transfer task.
     * @returns { number } - Returns the result.
     * @throws { BusinessError } 201 - the application does not have permission to call this function.
     * @throws { BusinessError } 1020300001 - System service exception.
     * @throws { BusinessError } 1020300002 - Parameter error.
     * @syscap SystemCapability.EnterpriseSpace.SpaceDataTransfer
     * @since 6.0.0(20)
     */
    function setAuditInfo(transactionNum: string, info: AuditInfo): number;
    /**
     * Push inter-space data transfer policy.
     *
     * @permission ohos.permission.ENTERPRISE_FILE_TRANSFER_AUDIT_POLICY_MANAGEMENT
     *     or ohos.permission.FILE_TRANSFER_OPERATION
     * @param { string } policyContext - Indicates a content of the policy that is pushed.
     * @throws { BusinessError } 201 - the application does not have permission to call this function.
     * @throws { BusinessError } 1020300001 - System service exception.
     * @throws { BusinessError } 1020300002 - Parameter error.
     * @syscap SystemCapability.EnterpriseSpace.SpaceDataTransfer
     * @since 6.0.0(20)
     */
    function policyPush(policyContext: string): void;
}
export default fileTransfer;
