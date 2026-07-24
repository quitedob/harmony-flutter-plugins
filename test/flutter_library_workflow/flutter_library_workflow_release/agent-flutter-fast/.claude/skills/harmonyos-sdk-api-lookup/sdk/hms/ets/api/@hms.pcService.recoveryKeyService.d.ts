/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */

/**
 * @file
 * @kit EnterpriseDataGuardKit
 */

/**
 * This module is used for managing and utilizing the consumer user's recovery key, including generating and deleting
 * the recovery key, resetting the lockscreen PIN using the recovery key, decrypting the disk data using the
 * recovery key, and retrieving information about the recovery key.
 *
 * @namespace recoveryKey
 * @syscap SystemCapability.PCService.RecoveryKeyService
 * @since 5.0.3(15)
 */
declare namespace recoveryKey {
    /**
     * Enterprise recovery key info.
     *
     * @typedef EnterpriseRecoveryKeyInfo
     * @syscap SystemCapability.PCService.RecoveryKeyService
     * @since 5.0.3(15)
     */
    export interface EnterpriseRecoveryKeyInfo {
        /**
         * Enterprise recovery key encrypted using an enterprise private key.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.PCService.RecoveryKeyService
         * @since 5.0.3(15)
         */
        enterpriseRecoveryKey: Uint8Array;
        /**
         * Public key used for deriving the encryption key.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.PCService.RecoveryKeyService
         * @since 5.0.3(15)
         */
        exportPublicKey: Uint8Array;
        /**
         * Specifies the IV value for encryption.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.PCService.RecoveryKeyService
         * @since 5.0.3(15)
         */
        iv: Uint8Array;
        /**
         * Tag used for encryption.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.PCService.RecoveryKeyService
         * @since 5.0.3(15)
         */
        tag: Uint8Array;
    }
    /**
     * Obtains the challenge information for a single operation.
     *
     * @permission ohos.permission.ENTERPRISE_RECOVERY_KEY
     * @returns { Promise<Uint8Array> } Returns the challenge for authentication.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1014400001 - System service exception.
     * @throws { BusinessError } 1014400201 - Invalid device type, current device is not enterprise device.
     * @syscap SystemCapability.PCService.RecoveryKeyService
     * @since 5.0.3(15)
     */
    function getAuthChallenge(): Promise<Uint8Array>;
    /**
     * Updating Enterprise Certificate Information.
     *
     * @permission ohos.permission.ENTERPRISE_RECOVERY_KEY
     * @param { Uint8Array } signature - Signed challenge information.
     * @param { Uint8Array } cert - New enterprise certificate.
     * @returns { Promise<number> } The promis returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1014400001 - System service exception.
     * @throws { BusinessError } 1014400201 - Invalid device type, current device is not enterprise device.
     * @throws { BusinessError } 1014400204 - Invalid signature.
     * @throws { BusinessError } 1014400205 - Invalid cert.
     * @syscap SystemCapability.PCService.RecoveryKeyService
     * @since 5.0.3(15)
     */
    function updateEnterpriseCertificate(signature: Uint8Array, cert: Uint8Array): Promise<number>;
    /**
     * Export user enterprise recovery key.
     *
     * @permission ohos.permission.ENTERPRISE_RECOVERY_KEY
     * @param { number } userId - The user ID whose enterprise recovery key needs to be exported.
     * @returns { Promise<EnterpriseRecoveryKeyInfo> } Returns the encrypted enterprise recovery key and public
     *                                                 key for decryption.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1014400001 - System service exception.
     * @throws { BusinessError } 1014400201 - Invalid device type, current device is not enterprise device.
     * @throws { BusinessError } 1014400202 - Invalid userId.
     * @throws { BusinessError } 1014400203 - Enterprise recovery key is already existed.
     * @syscap SystemCapability.PCService.RecoveryKeyService
     * @since 5.0.3(15)
     */
    function getEnterpriseRecoveryKey(userId: number): Promise<EnterpriseRecoveryKeyInfo>;
    /**
     * Delete enterprise recovery key and create at next user logon.
     *
     * @permission ohos.permission.ENTERPRISE_RECOVERY_KEY
     * @param { number } userId - The user ID whose enterprise recovery key needs to be deleted.
     * @param { Uint8Array } signature - Signed challenge information.
     * @returns { Promise<number> } The promis returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1014400001 - System service exception.
     * @throws { BusinessError } 1014400201 - Invalid device type, current device is not enterprise device.
     * @throws { BusinessError } 1014400202 - Invalid userId.
     * @throws { BusinessError } 1014400204 - Invalid signature.
     * @syscap SystemCapability.PCService.RecoveryKeyService
     * @since 5.0.3(15)
     */
    function deleteEnterpriseRecoveryKey(userId: number, signature: Uint8Array): Promise<number>;
    /**
     * Verify user's identity before exporting enterprise recovery key for resetting PIN code.
     *
     * @permission ohos.permission.ENTERPRISE_RECOVERY_KEY
     * @param { number } userId - The user ID whose enterprise recovery key needs to be exported.
     * @param { number } userType - The type of the user
     * @param { string } pinCode - The PIN code of the user
     * @returns { Promise<void> } Returns nothing on success.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1014400001 - System service exception.
     * @throws { BusinessError } 1014400103 - Authentication is failed.
     * @throws { BusinessError } 1014400201 - Invalid device type, current device is not enterprise device.
     * @throws { BusinessError } 1014400202 - Invalid userId.
     * @syscap SystemCapability.PCService.RecoveryKeyService
     * @since 6.0.0(20)
     */
    function verifyUserIdentityEnterprise(userId: number, userType: number, pinCode: string): Promise<void>;
    /**
     * Export user enterprise recovery key for resetting PIN code.
     *
     * @permission ohos.permission.ENTERPRISE_RECOVERY_KEY
     * @param { number } userId - The user ID whose enterprise recovery key needs to be exported.
     * @param { number } userType - The type of the user
     * @returns { Promise<EnterpriseRecoveryKeyInfo> } Returns the encrypted enterprise recovery key and public
     *     key for decryption.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1014400001 - System service exception.
     * @throws { BusinessError } 1014400201 - Invalid device type, current device is not enterprise device.
     * @throws { BusinessError } 1014400202 - Invalid userId.
     * @syscap SystemCapability.PCService.RecoveryKeyService
     * @since 6.0.0(20)
     */
    function getEnterpriseRecoveryKeyForResettingPin(userId: number, userType: number): Promise<EnterpriseRecoveryKeyInfo>;
}
export default recoveryKey;
