/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Defines the capabilities of business risk intelligent detection module.
 * @kit DeviceSecurityKit
 */
/**
 * This module provides the capabilities to detect business risk.
 *
 * @namespace businessRiskIntelligentDetection
 * @syscap SystemCapability.Security.BusinessRiskIntelligentDetection
 * @since 5.0.0(12)
 */
declare namespace businessRiskIntelligentDetection {
    /**
     * Enum for signing algorithm.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.BusinessRiskIntelligentDetection
     * @since 5.0.0(12)
     */
    enum SigningAlgorithm {
        /**
         * Indicates signing algorithm is ES256.
         *
         * @syscap SystemCapability.Security.BusinessRiskIntelligentDetection
         * @since 5.0.0(12)
         */
        ES256 = 0
    }
    /**
     * FraudDetectionRequest object represents fraud detection request parameter.
     *
     * @typedef FraudDetectionRequest
     * @syscap SystemCapability.Security.BusinessRiskIntelligentDetection
     * @since 5.0.0(12)
     */
    interface FraudDetectionRequest {
        /**
         * Cryptographic nonce value, 24 to 80 bytes, make sure that the nonce value is different in each risk detection transaction.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.BusinessRiskIntelligentDetection
         * @since 5.0.0(12)
         */
        nonce: Uint8Array;
        /**
         * Padding mode of the signing algorithm. ES256 are supported.
         *
         * @type { SigningAlgorithm }
         * @syscap SystemCapability.Security.BusinessRiskIntelligentDetection
         * @since 5.0.0(12)
         */
        algorithm: SigningAlgorithm;
        /**
         * Identity the format of the result. Default value is 1.
         *
         * @type { ?number }
         * @syscap SystemCapability.Security.BusinessRiskIntelligentDetection
         * @since 5.1.0(18)
         */
        version?: number;
    }
    /**
     * SimulatedClickDetectionRequest object represents simulated click detection request parameter.
     *
     * @typedef SimulatedClickDetectionRequest
     * @syscap SystemCapability.Security.BusinessRiskIntelligentDetection
     * @since 6.0.0(20)
     */
    interface SimulatedClickDetectionRequest {
        /**
         * Identity the format of the result. Default value is 1.
         *
         * @type { ?number }
         * @syscap SystemCapability.Security.BusinessRiskIntelligentDetection
         * @since 6.0.0(20)
         */
        version?: number;
    }
    /**
     * Provides to detect fraud risks.
     *
     * @param { FraudDetectionRequest } params - fraud detection params from caller.
     * @returns { Promise<string> } fraud detection results, JSON Web Signature, including riskScore and details.
     * @throws { BusinessError } 401 - Invalid parameters.
     * @throws { BusinessError } 1012500001 - Internal error.
     * @throws { BusinessError } 1012500002 - The network is unreachable.
     * @throws { BusinessError } 1012500003 - Access cloud server fail.
     * @throws { BusinessError } 1012500004 - Verify cloud capability fail.
     * @syscap SystemCapability.Security.BusinessRiskIntelligentDetection
     * @since 5.0.0(12)
     */
    function detectFraudRisk(params: FraudDetectionRequest): Promise<string>;
    /**
     * Provides to detect simulated click risks.
     *
     * @param { SimulatedClickDetectionRequest } params - simulated click detection params from caller.
     * @returns { Promise<string> } simulated click detection results, JSON format string, including riskDecision and details.
     * @throws { BusinessError } 1012500001 - Internal error.
     * @throws { BusinessError } 1012500002 - The network is unreachable.
     * @throws { BusinessError } 1012500003 - Access cloud server fail.
     * @throws { BusinessError } 1012500004 - Verify cloud capability fail.
     * @throws { BusinessError } 1012500005 - The interface access frequency exceeds the limit.
     * @throws { BusinessError } 1012500006 - Internal timeout.
     * @throws { BusinessError } 1012500007 - Invalid parameters.
     * @syscap SystemCapability.Security.BusinessRiskIntelligentDetection
     * @since 6.0.0(20)
     */
    function detectSimulatedClickRisk(params: SimulatedClickDetectionRequest): Promise<string>;
}
export default businessRiskIntelligentDetection;
