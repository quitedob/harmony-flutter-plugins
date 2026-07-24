/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file This module provides the capabilities to trusted app service.
 * @kit DeviceSecurityKit
 */
/**
 * This module provides the capability of secure location attestation and secure camera attestation.
 *
 * @namespace trustedAppService
 * @syscap SystemCapability.Security.TrustedAppService.Core
 * @since 5.0.0(12)
 */
/**
 * This module provides the capability of secure location attestation and secure camera attestation.
 *
 * @namespace trustedAppService
 * @syscap SystemCapability.Security.TrustedAppService.Core
 * @atomicservice
 * @since 5.0.2(14)
 */
declare namespace trustedAppService {
    /**
     * Enum for attestation key algorithm.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.0.0(12)
     */
    /**
     * Enum for attestation key algorithm.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @atomicservice
     * @since 5.0.2(14)
     */
    export enum AttestKeyAlg {
        /**
         * The ECC (Elliptic Curve Cryptography) algorithm used for attestation.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * The ECC (Elliptic Curve Cryptography) algorithm used for attestation.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ALG_ECC = 1
    }
    /**
     * Enum for attestation key size.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.0.0(12)
     */
    /**
     * Enum for attestation key size.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @atomicservice
     * @since 5.0.2(14)
     */
    export enum AttestKeySize {
        /**
         * This specifies a key size of 256 bits.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * This specifies a key size of 256 bits.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ECC_KEY_SIZE_256 = 256,
        /**
         * This specifies a key size of 384 bits.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * This specifies a key size of 384 bits.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ECC_KEY_SIZE_384 = 384
    }
    /**
     * Enum for attestation type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.0.0(12)
     */
    /**
     * Enum for attestation type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @atomicservice
     * @since 5.0.2(14)
     */
    export enum AttestType {
        /**
         * The attestation type for location services.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * The attestation type for location services.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_TYPE_LOCATION = 1,
        /**
         * The attestation type for camera services.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        ATTEST_TYPE_CAMERA = 2,
        /**
         * The attestation type for secure image processing services.
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        ATTEST_TYPE_SECIMAGE_PROCESS = 3
    }
    /**
     * Enum for attestation base tag type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.0.0(12)
     */
    /**
     * Enum for attestation base tag type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @atomicservice
     * @since 5.0.2(14)
     */
    export enum AttestTagType {
        /**
         * Invalid tag type.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * Invalid tag type.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_TAG_TYPE_INVALID = 0 << 28,
        /**
         * Integer tag type.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * Integer tag type.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_TAG_TYPE_INT = 1 << 28,
        /**
         * Unsigned integer tag type.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * Unsigned integer tag type.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_TAG_TYPE_UINT = 2 << 28,
        /**
         * Unsigned long integer tag type.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * Unsigned long integer tag type.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_TAG_TYPE_ULONG = 3 << 28,
        /**
         * Boolean tag type.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * Boolean tag type.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_TAG_TYPE_BOOL = 4 << 28,
        /**
         * Byte array tag type.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * Byte array tag type.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_TAG_TYPE_BYTES = 5 << 28
    }
    /**
     * Enum for attestation tag.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.0.0(12)
     */
    /**
     * Enum for attestation tag.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @atomicservice
     * @since 5.0.2(14)
     */
    export enum AttestTag {
        /**
         * Invalid tag.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * Invalid tag.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_TAG_INVALID = AttestTagType.ATTEST_TAG_TYPE_INVALID | 0,
        /**
         * Algorithm tag.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * Algorithm tag.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_TAG_ALGORITHM = AttestTagType.ATTEST_TAG_TYPE_UINT | 1,
        /**
         * Key size tag.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * Key size tag.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_TAG_KEY_SIZE = AttestTagType.ATTEST_TAG_TYPE_UINT | 2,
        /**
         * Device type tag.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * Device type tag.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_TAG_DEVICE_TYPE = AttestTagType.ATTEST_TAG_TYPE_UINT | 3,
        /**
         * Device ID tag.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * Device ID tag.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_TAG_DEVICE_ID = AttestTagType.ATTEST_TAG_TYPE_UINT | 4
    }
    /**
     * Interface of attestation param.
     *
     * @typedef AttestParam
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.0.0(12)
     */
    /**
     * Interface of attestation param.
     *
     * @typedef AttestParam
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @atomicservice
     * @since 5.0.2(14)
     */
    export interface AttestParam {
        /**
         * The attestation parameter tag.
         *
         * @type { AttestTag }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * The attestation parameter tag.
         *
         * @type { AttestTag }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        tag: AttestTag;
        /**
         * The attestation parameter value.
         *
         * @type { boolean | number | bigint | Uint8Array }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * The attestation parameter value.
         *
         * @type { boolean | number | bigint | Uint8Array }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        value: boolean | number | bigint | Uint8Array;
    }
    /**
     * Interface of attestation option.
     *
     * @typedef AttestOptions
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.0.0(12)
     */
    /**
     * Interface of attestation option.
     *
     * @typedef AttestOptions
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @atomicservice
     * @since 5.0.2(14)
     */
    export interface AttestOptions {
        /**
         * The properties of attestation options.
         *
         * @type { Array<AttestParam> }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * The properties of attestation options.
         *
         * @type { Array<AttestParam> }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        properties: Array<AttestParam>;
    }
    /**
     * Interface of attestation result.
     *
     * @typedef AttestReturnResult
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.0.0(12)
     */
    /**
     * Interface of attestation result.
     *
     * @typedef AttestReturnResult
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @atomicservice
     * @since 5.0.2(14)
     */
    export interface AttestReturnResult {
        /**
         * The certchains of attestation.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * The certchains of attestation.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        certChains: Array<string>;
    }
    /**
     * Enum for attestation exception error code.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.0.0(12)
     */
    /**
     * Enum for attestation exception error code.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @atomicservice
     * @since 5.0.2(14)
     */
    export enum AttestExceptionErrCode {
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_NO_PERMISSION = 201,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_ILLEGAL_ARGUMENT = 401,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_INVALID_ALG_ARGUMENT = 1011500001,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_MISSING_ARGUMENT = 1011500002,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_KEY_GENERATOR_FAILED = 1011500003,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_CERTS_CREATION_FAILED = 1011500004,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_FILE_OPERATION_FAILED = 1011500005,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_COMMUNICATION_FAILED = 1011500006,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_ITEM_NOT_FOUND = 1011500007,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_CERTS_VERIFICATION_FAILED = 1011500008,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_CERTS_EXPIRED = 1011500009,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_KEY_NOT_MATCHED = 1011500010,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_SECURE_CAMERA_INITIALIZATION_FAILED = 1011500011,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_CONTEXT_BAD_STATE = 1011500012,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_KEY_EXPIRED = 1011500013,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_LOCATION_SERVICE_UNAVAILABLE = 1011500014,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_LOCATION_SWITCH_OFF = 1011500015,
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.0.0(12)
         */
        /**
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @atomicservice
         * @since 5.0.2(14)
         */
        ATTEST_ERROR_LOCATION_FAILED = 1011500016,
        /**
         * Signature verification failed.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        ATTEST_ERROR_SIGNATURE_VERIFICATION_FAILED = 1011500017,
        /**
         * Secure image process failed.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        ATTEST_ERROR_SECIMAGE_PROCESS_FAILED = 1011500018
    }
    /**
     * Create attestation key.
     *
     * @param { AttestOptions } options - Indicates the properties of the key.
     * @returns { Promise<void> } promise of void.
     * @throws { BusinessError } 401 - argument is invalid.
     * @throws { BusinessError } 1011500001 - algorithm param is invalid.
     * @throws { BusinessError } 1011500002 - algorithm param is missing.
     * @throws { BusinessError } 1011500003 - create attestation key failed.
     * @throws { BusinessError } 1011500004 - create anonymous certificate failed.
     * @throws { BusinessError } 1011500005 - operating file failed.
     * @throws { BusinessError } 1011500006 - IPC communication failed.
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.0.0(12)
     */
    /**
     * Create attestation key.
     *
     * @param { AttestOptions } options - Indicates the properties of the key.
     * @returns { Promise<void> } promise of void.
     * @throws { BusinessError } 401 - argument is invalid.
     * @throws { BusinessError } 1011500001 - algorithm param is invalid.
     * @throws { BusinessError } 1011500002 - algorithm param is missing.
     * @throws { BusinessError } 1011500003 - create attestation key failed.
     * @throws { BusinessError } 1011500004 - create anonymous certificate failed.
     * @throws { BusinessError } 1011500005 - operating file failed.
     * @throws { BusinessError } 1011500006 - IPC communication failed.
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @atomicservice
     * @since 5.0.2(14)
     */
    function createAttestKey(options: AttestOptions): Promise<void>;
    /**
     * Destroy attestation key.
     *
     * @returns { Promise<void> } promise of void.
     * @throws { BusinessError } 1011500005 - operating file failed.
     * @throws { BusinessError } 1011500006 - IPC communication failed.
     * @throws { BusinessError } 1011500007 - item not found.
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.0.0(12)
     */
    /**
     * Destroy attestation key.
     *
     * @returns { Promise<void> } promise of void.
     * @throws { BusinessError } 1011500005 - operating file failed.
     * @throws { BusinessError } 1011500006 - IPC communication failed.
     * @throws { BusinessError } 1011500007 - item not found.
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @atomicservice
     * @since 5.0.2(14)
     */
    function destroyAttestKey(): Promise<void>;
    /**
     * Initialize attestation context for secure location or secure camera.
     *
     * @param { string } userData - User-defined data as challenge value.
     * @param { AttestOptions } options - Indicates the properties of the key.
     * @returns { Promise<AttestReturnResult> } Return the certchains.
     * @throws { BusinessError } 401 - argument is invalid.
     * @throws { BusinessError } 1011500002 - param is missing.
     * @throws { BusinessError } 1011500005 - operating file failed.
     * @throws { BusinessError } 1011500006 - IPC communication failed.
     * @throws { BusinessError } 1011500007 - item not found.
     * @throws { BusinessError } 1011500008 - anonymous certificate verify failed.
     * @throws { BusinessError } 1011500009 - anonymous certificate has expired.
     * @throws { BusinessError } 1011500010 - get attestation key failed.
     * @throws { BusinessError } 1011500011 - initialize secure camera failed.
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.0.0(12)
     */
    /**
     * Initialize attestation context for secure location or secure camera.
     *
     * @param { string } userData - User-defined data as challenge value.
     * @param { AttestOptions } options - Indicates the properties of the key.
     * @returns { Promise<AttestReturnResult> } Return the certchains.
     * @throws { BusinessError } 401 - argument is invalid.
     * @throws { BusinessError } 1011500002 - param is missing.
     * @throws { BusinessError } 1011500005 - operating file failed.
     * @throws { BusinessError } 1011500006 - IPC communication failed.
     * @throws { BusinessError } 1011500007 - item not found.
     * @throws { BusinessError } 1011500008 - anonymous certificate verify failed.
     * @throws { BusinessError } 1011500009 - anonymous certificate has expired.
     * @throws { BusinessError } 1011500010 - get attestation key failed.
     * @throws { BusinessError } 1011500011 - initialize secure camera failed.
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @atomicservice
     * @since 5.0.2(14)
     */
    function initializeAttestContext(userData: string, options: AttestOptions): Promise<AttestReturnResult>;
    /**
     * Finalize attestation context.
     *
     * @param { AttestOptions } options - Indicates the properties of the key.
     * @returns { Promise<void> } promise of void.
     * @throws { BusinessError } 401 - argument is invalid.
     * @throws { BusinessError } 1011500002 - param is missing.
     * @throws { BusinessError } 1011500006 - IPC communication failed.
     * @throws { BusinessError } 1011500007 - item not found.
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.0.0(12)
     */
    /**
     * Finalize attestation context.
     *
     * @param { AttestOptions } options - Indicates the properties of the key.
     * @returns { Promise<void> } promise of void.
     * @throws { BusinessError } 401 - argument is invalid.
     * @throws { BusinessError } 1011500002 - param is missing.
     * @throws { BusinessError } 1011500006 - IPC communication failed.
     * @throws { BusinessError } 1011500007 - item not found.
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @atomicservice
     * @since 5.0.2(14)
     */
    function finalizeAttestContext(options: AttestOptions): Promise<void>;
    /**
     * Enum for locating priority.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Location
     * @since 5.0.0(12)
     */
    /**
     * Enum for locating priority.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Location
     * @atomicservice
     * @since 5.0.2(14)
     */
    export enum LocatingPriority {
        /**
         * Preferentially ensure the highest locating accuracy.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @since 5.0.0(12)
         */
        /**
         * Preferentially ensure the highest locating accuracy.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @atomicservice
         * @since 5.0.2(14)
         */
        PRIORITY_ACCURACY = 0,
        /**
         * Preferentially ensure the fastest locating speed.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @since 5.0.0(12)
         */
        /**
         * Preferentially ensure the fastest locating speed.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @atomicservice
         * @since 5.0.2(14)
         */
        PRIORITY_LOCATING_SPEED = 1
    }
    /**
     * Supported location infos.
     *
     * @interface Location
     * @syscap SystemCapability.Security.TrustedAppService.Location
     * @since 5.0.0(12)
     */
    /**
     * Supported location infos.
     *
     * @interface Location
     * @syscap SystemCapability.Security.TrustedAppService.Location
     * @atomicservice
     * @since 5.0.2(14)
     */
    export interface Location {
        /**
         * The latitude value.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @since 5.0.0(12)
         */
        /**
         * The latitude value.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @atomicservice
         * @since 5.0.2(14)
         */
        latitude: number;
        /**
         * The longitude value.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @since 5.0.0(12)
         */
        /**
         * The longitude value.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @atomicservice
         * @since 5.0.2(14)
         */
        longitude: number;
        /**
         * The altitude value.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @since 5.0.0(12)
         */
        /**
         * The altitude value.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @atomicservice
         * @since 5.0.2(14)
         */
        altitude: number;
        /**
         * The accuracy value.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @since 5.0.0(12)
         */
        /**
         * The accuracy value.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @atomicservice
         * @since 5.0.2(14)
         */
        accuracy: number;
        /**
         * The timestamp value.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @since 5.0.0(12)
         */
        /**
         * The timestamp value.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @atomicservice
         * @since 5.0.2(14)
         */
        timestamp: number;
    }
    /**
     * SecureLocation info.
     *
     * @interface Location
     * @syscap SystemCapability.Security.TrustedAppService.Location
     * @since 5.0.0(12)
     */
    /**
     * SecureLocation info.
     *
     * @interface Location
     * @syscap SystemCapability.Security.TrustedAppService.Location
     * @atomicservice
     * @since 5.0.2(14)
     */
    export interface SecureLocation {
        /**
         * The location value.
         *
         * @type { Location }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @since 5.0.0(12)
         */
        /**
         * The location value.
         *
         * @type { Location }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @atomicservice
         * @since 5.0.2(14)
         */
        originalLocation: Location;
        /**
         * The user data value.
         *
         * @type { String }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @since 5.0.0(12)
         */
        /**
         * The user data value.
         *
         * @type { String }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @atomicservice
         * @since 5.0.2(14)
         */
        userData: String;
        /**
         * The signture info.
         *
         * @type { String }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @since 5.0.0(12)
         */
        /**
         * The signture info.
         *
         * @type { String }
         * @syscap SystemCapability.Security.TrustedAppService.Location
         * @atomicservice
         * @since 5.0.2(14)
         */
        signature: String;
    }
    /**
     * Get current secure location.
     *
     * @permission ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @param { number } timeout - Timeout of a single location request, in milliseconds.
     * @param { LocatingPriority } priority - Priority of the location request.
     * @returns { Promise<SecureLocation> } The promise returned by the function.
     * @throws { BusinessError } 201 - has no permission.
     * @throws { BusinessError } 401 - argument is invalid.
     * @throws { BusinessError } 1011500012 - attestation context not initialized.
     * @throws { BusinessError } 1011500013 - attestation key has expired.
     * @throws { BusinessError } 1011500014 - location service is unavailable.
     * @throws { BusinessError } 1011500015 - The location switch is off.
     * @throws { BusinessError } 1011500016 - Failed to obtain the secure geographical location.
     * @syscap SystemCapability.Security.TrustedAppService.Location
     * @since 5.0.0(12)
     */
    /**
     * Get current secure location.
     *
     * @permission ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @param { number } timeout - Timeout of a single location request, in milliseconds.
     * @param { LocatingPriority } priority - Priority of the location request.
     * @returns { Promise<SecureLocation> } The promise returned by the function.
     * @throws { BusinessError } 201 - has no permission.
     * @throws { BusinessError } 401 - argument is invalid.
     * @throws { BusinessError } 1011500012 - attestation context not initialized.
     * @throws { BusinessError } 1011500013 - attestation key has expired.
     * @throws { BusinessError } 1011500014 - location service is unavailable.
     * @throws { BusinessError } 1011500015 - The location switch is off.
     * @throws { BusinessError } 1011500016 - Failed to obtain the secure geographical location.
     * @syscap SystemCapability.Security.TrustedAppService.Location
     * @atomicservice
     * @since 5.0.2(14)
     */
    function getCurrentSecureLocation(timeout: number, priority: LocatingPriority): Promise<SecureLocation>;
    /**
     * Enum for the format of secure image to be processed.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.1.0(18)
     */
    export enum SecImageProcFormat {
        /**
         * Invalid secure image format.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        SECIMAGE_FORMAT_INVALID = 0,
        /**
         * The format of secure image is yuv_nv21.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        SECIMAGE_FORMAT_YUV_NV21 = 1,
        /**
         * The format of secure image is jpeg.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        SECIMAGE_FORMAT_JPEG = 2
    }
    /**
     * Enum for the processing operations of secure image.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.1.0(18)
     */
    export enum SecImageProcOperation {
        /**
         * Secure image compression operation.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        SECIMAGE_COMPRESSION = 0,
        /**
         * Secure image cropping operation.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        SECIMAGE_CROPPING = 1,
        /**
         * Secure image compression and cropping operation.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        SECIMAGE_COMPRESSION_AND_CROPPING = 2
    }
    /**
     * Secure image buffer.
     *
     * @typedef { SecImageBuffer }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.1.0(18)
     */
    export interface SecImageBuffer {
        /**
         * Secure image buffer.
         *
         * @type { ArrayBuffer }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        secImage: ArrayBuffer;
    }
    /**
     * Crop region.
     *
     * @typedef { CropRegion }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.1.0(18)
     */
    export interface CropRegion {
        /**
         * The starting coordinate X of the cropping region.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        x: number;
        /**
         * The starting coordinate Y of the cropping region.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        y: number;
        /**
         * The width of the cropping region.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        width: number;
        /**
         * The height of the cropping region.
         *
         * @type { number }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        height: number;
    }
    /**
     * Enum for the tag of secure image processing.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.1.0(18)
     */
    export enum SecImageProcTag {
        /**
         * Invalid secure image process tag.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        SECIMAGE_TAG_INVALID = AttestTagType.ATTEST_TAG_TYPE_INVALID | 0,
        /**
         * The format of secure image to be processed.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        SECIMAGE_TAG_SRC_IMAGE_FORMAT = AttestTagType.ATTEST_TAG_TYPE_UINT | 1,
        /**
         * The format of processed secure image.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        SECIMAGE_TAG_DEST_IMAGE_FORMAT = AttestTagType.ATTEST_TAG_TYPE_UINT | 2,
        /**
         * Processing operations for secure image.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        SECIMAGE_TAG_PROC_OPERATION = AttestTagType.ATTEST_TAG_TYPE_UINT | 3,
        /**
         * The compression quality of secure image.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        SECIMAGE_TAG_COMPRESSION_QUALITY = AttestTagType.ATTEST_TAG_TYPE_UINT | 4,
        /**
         * The crop range of secure image.
         *
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        SECIMAGE_TAG_CROP_REGION = AttestTagType.ATTEST_TAG_TYPE_UINT | 5
    }
    /**
     * Interface of SecImageProcParams.
     *
     * @typedef { SecImageProcParams }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.1.0(18)
     */
    export interface SecImageProcParams {
        /**
         * The parameter tag of secure image processing.
         *
         * @type { SecImageProcTag }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        tag: SecImageProcTag;
        /**
         * The parameter value of secure image processing.
         *
         * @type { number | CropRegion }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        value: number | CropRegion;
    }
    /**
     * The properties of secure image processing parameters.
     *
     * @typedef { SecImageProcParamsArray }
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.1.0(18)
     */
    export interface SecImageProcParamsArray {
        /**
         * The properties of secure image processing parameters.
         *
         * @type { Array<SecImageProcParams> }
         * @syscap SystemCapability.Security.TrustedAppService.Core
         * @since 5.1.0(18)
         */
        properties: Array<SecImageProcParams>;
    }
    /**
     * Processing compression and cropping of secure image
     *
     * @param { ArrayBuffer } srcSecImage - secure image buffer to be processed by compression or cropping.
     * @param { SecImageProcParamsArray } procParams - Indicates the parameters of secure image processing.
     * @returns { Promise<SecImageBuffer> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified. 2. Incorrect parameter types.
     * 3.Parameter verification failed.
     * @throws { BusinessError } 1011500012 - attestation context not initialized.
     * @throws { BusinessError } 1011500013 - attestation key has expired.
     * @throws { BusinessError } 1011500017 - signature verification failed.
     * @throws { BusinessError } 1011500018 - secure image process failed.
     * @syscap SystemCapability.Security.TrustedAppService.Core
     * @since 5.1.0(18)
     */
    function procSecImageTransform(srcSecImage: ArrayBuffer, procParams: SecImageProcParamsArray): Promise<SecImageBuffer>;
}
export default trustedAppService;
