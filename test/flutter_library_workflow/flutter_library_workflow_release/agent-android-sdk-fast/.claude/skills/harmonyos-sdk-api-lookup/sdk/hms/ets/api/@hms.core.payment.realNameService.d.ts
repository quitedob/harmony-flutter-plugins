/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file This module provides the capabilities to use real name service.
 * @kit PaymentKit
 */
import type common from '@ohos.app.ability.common';
/**
 * This module provides the capabilities to use real name service.
 *
 * @namespace realNameService
 * @syscap SystemCapability.Payment.RealNameService
 * @stagemodelonly
 * @atomicservice
 * @since 5.1.1(19)
 */
declare namespace realNameService {
    /**
     * start the real name verification
     *
     * @param { common.UIAbilityContext | common.UIExtensionContext } context - The context of an ability.
     * @param { string } preVerifyId - the ID obtained from the pre-verification response.
     * @returns { Promise<string> } - Promise used to return the result ID of the real name verification.
     * @throws { BusinessError } 1020100000 - The application does not have the required capability.
     * @throws { BusinessError } 1020100001 - The user did not accept the agreement.
     * @throws { BusinessError } 1020100002 - The user canceled the operation.
     * @throws { BusinessError } 1020100003 - The pre-verify ID is invalid.
     * @throws { BusinessError } 1020100004 - The network is unavailable.
     * @throws { BusinessError } 1020100005 - System internal error.
     * @throws { BusinessError } 1020100008 - The app ID does not match.
     * @throws { BusinessError } 1020100009 - The user ID does not match.
     * @syscap SystemCapability.Payment.RealNameService
     * @stagemodelonly
     * @atomicservice
     * @since 5.1.1(19)
     */
    function startRealNameVerification(context: common.UIAbilityContext | common.UIExtensionContext, preVerifyId: string): Promise<string>;
    /**
     * start the real name authorization
     *
     * @param { common.UIAbilityContext | common.UIExtensionContext } context - The context of an ability.
     * @returns { Promise<string> } - Promise used to return the result ID of the real name authorization.
     * @throws { BusinessError } 1020100000 - The application does not have the required capability.
     * @throws { BusinessError } 1020100001 - The user did not accept the agreement.
     * @throws { BusinessError } 1020100002 - The user canceled the operation.
     * @throws { BusinessError } 1020100004 - The network is unavailable.
     * @throws { BusinessError } 1020100005 - System internal error.
     * @syscap SystemCapability.Payment.RealNameService
     * @stagemodelonly
     * @atomicservice
     * @since 5.1.1(19)
     */
    function startRealNameAuth(context: common.UIAbilityContext | common.UIExtensionContext): Promise<string>;
    /**
     * start the face verification
     *
     * @param { common.UIAbilityContext | common.UIExtensionContext } context - The context of an ability.
     * @param { string } preVerifyId - the ID obtained from the pre-verification response.
     * @returns { Promise<string> } - Promise used to return the result ID of the face verification
     * @throws { BusinessError } 1020100000 - The application does not have the required capability.
     * @throws { BusinessError } 1020100001 - The user did not accept the agreement.
     * @throws { BusinessError } 1020100002 - The user canceled the operation.
     * @throws { BusinessError } 1020100003 - The pre-verify ID is invalid.
     * @throws { BusinessError } 1020100004 - The network is unavailable.
     * @throws { BusinessError } 1020100005 - System internal error.
     * @throws { BusinessError } 1020100006 - The camera permission is not granted.
     * @throws { BusinessError } 1020100007 - The liveness detection failed.
     * @throws { BusinessError } 1020100008 - The app ID does not match.
     * @throws { BusinessError } 1020100009 - The user ID does not match.
     * @syscap SystemCapability.Payment.RealNameService
     * @stagemodelonly
     * @atomicservice
     * @since 5.1.1(19)
     */
    function startFaceVerification(context: common.UIAbilityContext | common.UIExtensionContext, preVerifyId: string): Promise<string>;
}
export default realNameService;
