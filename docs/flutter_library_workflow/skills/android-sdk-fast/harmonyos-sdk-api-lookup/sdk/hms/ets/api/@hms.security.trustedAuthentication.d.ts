/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file This module provides the capabilities to trusted authentication.
 * @kit DeviceSecurityKit
 */
/**
 * This module provides the capability of password authentication and content authentication based on TUI.
 *
 * @namespace trustedAuthentication
 * @syscap SystemCapability.Security.TrustedAuthentication
 * @since 6.0.0(20)
 */
declare namespace trustedAuthentication {
    /**
     * Enum for authentication type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    export enum AuthType {
        /**
         * The authentication type by face.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        AUTH_TYPE_FACE = 2,
        /**
         * The authentication type by fingerprint.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        AUTH_TYPE_FINGERPRINT = 4,
        /**
         * The authentication type by TUI PIN.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        AUTH_TYPE_TUI_PIN = 32
    }
    /**
     * Enum for password type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    export enum PasswordType {
        /**
         * The password type consists of numeric digits only.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        PASSWORD_TYPE_DIGITAL = 0,
        /**
         * The password type consists of a mix of numeric characters.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        PASSWORD_TYPE_MIXED = 1
    }
    /**
     * Enum for biometric authentication operation type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    export enum OperateType {
        /**
         * Biometric binding authentication.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        OPERATE_TYPE_BIOMETRIC_AUTH = 1,
        /**
         * Use biometric for TUI confirm content authentication.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        OPERATE_TYPE_CONTENT_AUTH = 2
    }
    /**
     * Enum for trusted authentication exception error code.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    export enum TrustedAuthErrorCode {
        /**
         * No operation permission on the API.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_NO_PERMISSION = 1019100001,
        /**
         * The input argument is invalid.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_ILLEGAL_ARGUMENT = 1019100002,
        /**
         * The maximum number of consecutive authentication failures is reached.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_PWD_LIMIT_REACHED = 1019100003,
        /**
         * Failed to delete the password.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_PWD_DELETE_FAILED = 1019100004,
        /**
         * Face/Fingerprint/Password authentication failed.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_VERIFY_FAILED = 1019100005,
        /**
         * Check input confirm text failed.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_CHECK_CONFIRM_TEXT_FAILED = 1019100006,
        /**
         * Unsupported custom image.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_NOT_SUPPORT_IMAGE = 1019100007,
        /**
         * Operation canceled by the user.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_USER_REQ_CANCEL = 1019100008,
        /**
         * Failed to export data.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_EXPORT_DATA_FAILED = 1019100009,
        /**
         * Failed to import data.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_IMPORT_DATA_FAILED = 1019100010,
        /**
         * The text content cannot be displayed.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_INVALID_CONTENT = 1019100011,
        /**
         * Invalid authentication ID.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_INVALID_AUTH_ID = 1019100012,
        /**
         * Failed to set the password.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_SET_PWD_FAILED = 1019100013,
        /**
         * Failed to change the password.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_MODIFY_PWD_FAILED = 1019100014,
        /**
         * Failed to obtain the biometric authentication authToken.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_BIO_RESIGN_FAILED = 1019100015,
        /**
         * The trusted authentication feature is not enabled.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_FEATURE_INITIALIZATION_FAILED = 1019100016,
        /**
         * Failed to get the remaining number of authentication attempts.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_GET_REMAIN_TIME = 1019100017,
        /**
         * Failed to unbind the  corresponding biometric data.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_DISABLE_BIO_AUTH = 1019100018,
        /**
         * The biometric data for authentication does not match the bound biometric feature.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_BIO_MISMATCH = 1019100019,
        /**
         * The biometric data has already been bound.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_BIO_REPEATED_BIND = 1019100020,
        /**
         * The corresponding biometric data has not been bound.
         *
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        TRUSTED_AUTH_ERROR_NOT_BIND_BIO = 1019100021
    }
    /**
     * Interface of password info.
     *
     * @typedef PasswordInfo
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    export interface PasswordInfo {
        /**
         * Password type.
         *
         * @type { PasswordType }
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        pwdType: PasswordType;
        /**
         * Maximum password length.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        pwdMaxLength: number;
        /**
         * Minimum password length.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        pwdMinLength: number;
        /**
         * Maximum number of consecutive incorrect password attempts.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        maxAuthFailCount: number;
    }
    /**
     * Interface of authentication request param.
     *
     * @typedef AuthReqParams
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    export interface AuthReqParams {
        /**
         * Authentication type.
         *
         * @type { AuthType }
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        reqType: AuthType;
        /**
         * Information content to be authenticated.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        authContent: Array<string>;
    }
    /**
     * Interface of customizes TUI image and title text.
     *
     * @typedef TUILable
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    export interface TUILable {
        /**
         * Authentication application image information.
         *
         * @type { ArrayBuffer }
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        image: ArrayBuffer;
        /**
         * Title information of the TUI page.
         *
         * @type { string }
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        title: string;
    }
    /**
     * Interface of authToken.
     *
     * @typedef AuthToken
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    export interface AuthToken {
        /**
         * authToken.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        authToken: Uint8Array;
    }
    /**
     * Interface of about trusted authentication.
     *
     * @typedef AuthInfo
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    export interface AuthInfo {
        /**
         * authToken.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        authToken: Uint8Array;
        /**
         * authID.
         *
         * @type { bigint }
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        authID: bigint;
    }
    /**
     * Interface of the check result whether can be displayed on the TUI.
     *
     * @typedef TextCheckResult
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    export interface TextCheckResult {
        /**
         * The check result.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        result: number;
        /**
         * Index of the corresponding characters that cannot be normally displayed on the TUI.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAuthentication
         * @since 6.0.0(20)
         */
        lastIndex: number;
    }
    /**
     * Enables digital shield password authentication.
     *
     * @param { Uint8Array } challenge  Challenge ID obtained through HUKS before a request is initiated.
     * @param { PasswordInfo } pwdInfo  Password information.
     * @param { TUILable } label - Customizes TUI image and title text.
     * @returns { Promise<AuthInfo> } Authentication information returned after the password is set.
     * @throws { BusinessError } 1019100001 - The interface invoker does not have the corresponding permission.
     * @throws { BusinessError } 1019100002 - Parameter error. Possible causes:
     * <br>1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3. Parameter verification
     * failed.
     * @throws { BusinessError } 1019100007 - Unsupported custom image.
     * @throws { BusinessError } 1019100008 - The user canceled the operation.
     * @throws { BusinessError } 1019100011 - The title text cannot be displayed.
     * @throws { BusinessError } 1019100013 - Failed to set the password.
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    function enableTrustedAuthentication(challenge: Uint8Array, pwdInfo: PasswordInfo, label: TUILable): Promise<AuthInfo>;
    /**
     * Changes the digital shield password.
     *
     * @param { Uint8Array } challenge  Challenge ID obtained through HUKS before a request is initiated.
     * @param { PasswordInfo } pwdInfo  Password information.
     * @param { bigint } authID  Current authID.
     * @param { TUILable } label - Customizes TUI image and title text.
     * @returns { Promise<AuthToken> } AuthToken information generated based on the new password.
     * @throws { BusinessError } 1019100001 - The interface invoker does not have the corresponding permission.
     * @throws { BusinessError } 1019100002 - Parameter error. Possible causes:
     * <br>1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3. Parameter verification
     * failed.
     * @throws { BusinessError } 1019100003 - The maximum number of password authentication attempts has been
     * reached.
     * @throws { BusinessError } 1019100005 - Face/Fingerprint/Password authentication failed.
     * @throws { BusinessError } 1019100007 - Unsupported custom image.
     * @throws { BusinessError } 1019100008 - The user canceled the operation.
     * @throws { BusinessError } 1019100011 - The title text cannot be displayed.
     * @throws { BusinessError } 1019100012 - Invalid authentication ID.
     * @throws { BusinessError } 1019100014 - Failed to change the password.
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    function modifyTrustedAuthenticationPwd(challenge: Uint8Array, pwdInfo: PasswordInfo, authID: bigint, label: TUILable): Promise<AuthToken>;
    /**
     * Delete the trusted authentication password.
     *
     * @param { Uint8Array } challenge - Challenge applied before a request is initiated.
     * @param { boolean } needAuth  - Indicates whether password authentication is required before password deletion.
     * @param { bigint } authID - The authentication ID of the password to be deleted.
     * @param { TUILable} label - Customizes TUI image and title text.
     * @returns { Promise<AuthToken> } - The authToken including the deleted password authentication ID.
     * <br>In the scenario where password authentication is not performed, the returned value of authToken is all 0s, which is invalid.
     * @throws { BusinessError } 1019100001 - The interface invoker does not have the corresponding permission.
     * @throws { BusinessError } 1019100002 - Parameter error. Possible causes:
     * <br>1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 1019100003 - The maximum number of password authentication attempts has been reached.
     * @throws { BusinessError } 1019100004 - Failed to delete the password.
     * @throws { BusinessError } 1019100005 - Face/Fingerprint/Password authentication failed.
     * @throws { BusinessError } 1019100007 - Unsupported custom image.
     * @throws { BusinessError } 1019100008 - The user canceled the operation.
     * @throws { BusinessError } 1019100011 - The title text cannot be displayed.
     * @throws { BusinessError } 1019100012 - Invalid authentication ID.
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    function disableTrustedAuthentication(challenge: Uint8Array, needAuth: boolean, authID: bigint, label: TUILable): Promise<AuthToken>;
    /**
     * Password trusted authentication.
     *
     * @param { Uint8Array } challenge - Challenge applied before a request is initiated.
     * @param { bigint } authID - The authentication ID to be authenticated.
     * @param { TUILable} label - Customizes TUI image and title text.
     * @returns { Promise<AuthToken> } -The authToken including the credention ID.
     * @throws { BusinessError } 1019100001 - The interface invoker does not have the corresponding permission.
     * @throws { BusinessError } 1019100002 - Parameter error. Possible causes:
     * <br>1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 1019100003 - The maximum number of password authentication attempts has been reached.
     * @throws { BusinessError } 1019100005 - Face/Fingerprint/Password authentication failed.
     * @throws { BusinessError } 1019100007 - Unsupported custom image.
     * @throws { BusinessError } 1019100008 - The user canceled the operation.
     * @throws { BusinessError } 1019100012 - Invalid authentication ID.
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    function trustedAuthentication(challenge: Uint8Array, authID: bigint, label: TUILable): Promise<AuthToken>;
    /**
     * The confirm content authentication.
     *
     * @param { Uint8Array } challenge - Challenge applied before a request is initiated.
     * @param { bigint } authID - Password authentication ID.
     * @param { AuthReqParams } authMsg - Authentication message.
     * @param { TUILable} label - Customizes TUI image and title text.
     * @returns { Promise<AuthToken> } - AuthToken including confirm content information.
     * @throws { BusinessError } 1019100001 - The interface invoker does not have the corresponding permission.
     * @throws { BusinessError } 1019100002 - Parameter error. Possible causes:
     * <br>1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 1019100005 - Face/Fingerprint/Password authentication failed.
     * @throws { BusinessError } 1019100008 - The user canceled the operation.
     * @throws { BusinessError } 1019100011 - The text content cannot be displayed.
     * @throws { BusinessError } 1019100012 - Invalid authentication ID.
     * @throws { BusinessError } 1019100021 - The corresponding biometric data has not been bound.
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    function procContentAuthentication(challenge: Uint8Array, authID: bigint, authMsg: AuthReqParams, label: TUILable): Promise<AuthToken>;
    /**
     * Obtaining biometric binding/authentication results.
     *
     * @param { OperateType } operType - The type of current operation.
     * @param { Uint8Array } tuiAuthToken - Temporary authToken authenticated by the TUI.
     * @param { Uint8Array } bioAuthToken - AuthToken generated after fingerprint/face authentication.
     * @returns { Promise<AuthToken> } - AuthToken including confirm content information or biometric binding result.
     * @throws { BusinessError } 1019100001 - The interface invoker does not have the corresponding permission.
     * @throws { BusinessError } 1019100002 - Parameter error. Possible causes:
     * <br>1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 1019100005 - Face/Fingerprint/Password authentication failed.
     * @throws { BusinessError } 1019100015 - Failed to get the biometric authToken.
     * @throws { BusinessError } 1019100019 - The biometric data for authentication does not match the bound
     *     biometric feature.
     * @throws { BusinessError } 1019100020 - The biometric data has already been bound.
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    function getBiometricAuthToken(operType: OperateType, tuiAuthToken: Uint8Array, bioAuthToken: Uint8Array): Promise<AuthToken>;
    /**
     * Import the storage data.
     *
     * @param { ArrayBuffer } data - Data to import.
     * @param { bigint } authID - Authentication ID of the imported data.
     * @returns { Promise<void> } promise of void.
     * @throws { BusinessError } 1019100001 - The interface invoker does not have the corresponding permission.
     * @throws { BusinessError } 1019100002 - Parameter error. Possible causes:
     * <br>1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 1019100010 - Failed to import data.
     * @throws { BusinessError } 1019100012 -Invalid authentication ID.
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    function importData(data: ArrayBuffer, authID: bigint): Promise<void>;
    /**
     * Exporting the storage data.
     *
     * @param { bigint } authID - Authentication ID of the exported data.
     * @param { TUILable} label - Customizes TUI image and title text.
     * @returns { Promise<ArrayBuffer> } Exported data.
     * @throws { BusinessError } 1019100001 - The interface invoker does not have the corresponding permission.
     * @throws { BusinessError } 1019100002 - Parameter error. Possible causes:
     * <br>1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 1019100009 - Failed to export data.
     * @throws { BusinessError } 1019100012 -Invalid authentication ID.
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    function exportData(authID: bigint, label: TUILable): Promise<ArrayBuffer>;
    /**
     * Check whether the confirmation text can be displayed on the TUI.
     *
     * @param { string } text - The confirm text.
     * @returns { Promise<TextCheckResult> } The check result whether can be displayed on the TUI.
     * @throws { BusinessError } 1019100001 - The interface invoker does not have the corresponding permission.
     * @throws { BusinessError } 1019100002 - Parameter error. Possible causes:
     * <br>1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 1019100006 - Check input confirm text failed
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    function checkConfirmUITextFormat(text: string): Promise<TextCheckResult>;
    /**
     * Obtains the remaining authentication times.
     *
     * @param { bigint } authID - Password authentication ID.
     * @returns { Promise<number> } The remaining number of consecutive authentication failures.
     * @throws { BusinessError } 1019100001 - The interface invoker does not have the corresponding permission.
     * @throws { BusinessError } 1019100002 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 1019100012 - Invalid authentication ID.
     * @throws { BusinessError } 1019100017 - Failed to get the remaining number of authentication attempts.
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    function getRemainAuthTimes(authID: bigint): Promise<number>;
    /**
     * Unbinds the associated biometric authentication capability for trusted authentication.
     *
     * @param { bigint } authID - Password authentication ID.
     * @param { AuthType } authType - Biometric authentication type to be unbound, AUTH_TYPE_TUI_PIN is invalid input.
     * @returns { Promise<void> } - Promise of void.
     * @throws { BusinessError } 1019100001 - The interface invoker does not have the corresponding permission.
     * @throws { BusinessError } 1019100002 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 1019100012 - Invalid authentication ID.
     * @throws { BusinessError } 1019100018 - Failed to unbind the  corresponding biometric data.
     * @throws { BusinessError } 1019100021 - The corresponding biometric data has not been bound.
     * @syscap SystemCapability.Security.TrustedAuthentication
     * @since 6.0.0(20)
     */
    function disableTrustedBioAuthentication(authID: bigint, authType: AuthType): Promise<void>;
}
export default trustedAuthentication;
