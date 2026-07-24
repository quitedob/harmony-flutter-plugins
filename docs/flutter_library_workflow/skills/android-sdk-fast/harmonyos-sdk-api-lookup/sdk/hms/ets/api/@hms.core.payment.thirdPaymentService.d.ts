/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file
 * @kit PaymentKit
 * @bundle com.huawei.hmos.paymentServiceHsp/paymentServiceHsp/ets/service/ThirdPaymentService 6.0.0(20)
 */
import type common from '@ohos.app.ability.common';
import Want from '@ohos.app.ability.Want';
/**
 * This module provides the capabilities to use third payment service.
 *
 * @namespace thirdPaymentService
 * @syscap SystemCapability.Payment.ThirdPaymentService
 * @stagemodelonly
 * @atomicservice
 * @since 6.0.0(20)
 */
declare namespace thirdPaymentService {
    /**
     * The ThirdPayClient class.
     * @syscap SystemCapability.Payment.ThirdPaymentService
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    class ThirdPayClient {
        /**
         * Creates a ThirdPayClient Object.
         *
         * @param { common.UIAbilityContext } context - Context of the caller.
         * @param { PayMethod } payMethod - payMethod type.
         * @param { string } thirdAppId - appId registered in ThirdPay.
         * @syscap SystemCapability.Payment.ThirdPaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        constructor(context: common.UIAbilityContext, payMethod: PayMethod, thirdAppId: string);
        /**
         * Handle pay callback.
         *
         * @param { Want } want - callback received want.
         * @returns { boolean } - want parse result.
         * @syscap SystemCapability.Payment.ThirdPaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        handlePayCallback(want: Want): boolean;
        /**
         * Pull up ThirdPay Checkout.
         *
         * @param { string } payInfo - pay information.
         * @returns { Promise<void> } - void.
         * @throws { BusinessError } 1022830000 - The operation was canceled by the user.
         * @throws { BusinessError } 1022830001 - Pay failed.
         * @throws { BusinessError } 1022830002 - The payInfo invalid.
         *     Possible causes: 1.Data format is not json string; 2.Mandatory parameters are left unspecified.
         * @syscap SystemCapability.Payment.ThirdPaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        pay(payInfo: string): Promise<void>;
    }
    /**
     * Enumerates support pay methods.
     *
     * @enum { string }
     * @syscap SystemCapability.Payment.ThirdPaymentService
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    enum PayMethod {
        /**
         * wechat_pay.
         *
         * @syscap SystemCapability.Payment.ThirdPaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        WECHAT_PAY = 'wechat_pay',
        /**
         * ali_pay.
         *
         * @syscap SystemCapability.Payment.ThirdPaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        ALI_PAY = 'ali_pay',
        /**
         * wechat_mini_program.
         *
         * @syscap SystemCapability.Payment.ThirdPaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        WECHAT_MINI_PROGRAM = 'wechat_mini_program'
    }
}
export default thirdPaymentService;
