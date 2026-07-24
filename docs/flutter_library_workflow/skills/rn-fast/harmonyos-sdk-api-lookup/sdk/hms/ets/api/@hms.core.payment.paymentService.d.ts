/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file This module provides the capabilities to use payment service.
 * @kit PaymentKit
 */
import type { AsyncCallback } from '@ohos.base';
import type common from '@ohos.app.ability.common';
/**
 * This module provides the capabilities to use payment service.
 *
 * @namespace paymentService
 * @syscap SystemCapability.Payment.PaymentService
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace paymentService {
    /**
     * Pull up the corresponding checkout
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { string } orderStr - order information
     * @param { string } payload - reserved information
     * @returns { Promise<PayResult> } - PayResult.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1001930000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001930001 - Pay failed.
     * @throws { BusinessError } 1001930002 - The transaction has been processed.
     * @throws { BusinessError } 1001930010 - Duplicate request.
     * @throws { BusinessError } 1001930011 - Network connection error.
     * @syscap SystemCapability.Payment.PaymentService
     * @atomicservice
     * @since 5.0.2(14)
     */
    function requestPayment(context: common.UIAbilityContext, orderStr: string, payload: string): Promise<PayResult>;
    /**
     * Pull up Harmony Cashier Picker
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { PaymentInfo } paymentInfo - payment information
     * @returns { Promise<PickerResult> } - PickerResult.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1001930000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001930001 - Pay failed.
     * @throws { BusinessError } 1001930002 - The transaction has been processed.
     * @throws { BusinessError } 1001930010 - Duplicate request.
     * @throws { BusinessError } 1001930011 - Network connection error.
     * @syscap SystemCapability.Payment.PaymentService
     * @atomicservice
     * @since 5.0.2(14)
     */
    function cashierPicker(context: common.UIAbilityContext, paymentInfo: PaymentInfo): Promise<PickerResult>;
    /**
     * Pull up PaymentService checkout
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { string } orderStr - order information
     * @returns { Promise<void> } - void.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1001930000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001930001 - Pay failed.
     * @throws { BusinessError } 1001930002 - The transaction has been processed.
     * @throws { BusinessError } 1001930010 - Duplicate request.
     * @throws { BusinessError } 1001930011 - Network connection error.
     * @syscap SystemCapability.Payment.PaymentService
     * @atomicservice
     * @since 4.1.0(11)
     */
    function requestPayment(context: common.UIAbilityContext, orderStr: string): Promise<void>;
    /**
     * Pull up PaymentService checkout
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { string } orderStr - order information
     * @param { AsyncCallback<void> } callback - void.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1001930000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001930001 - Pay failed.
     * @throws { BusinessError } 1001930002 - The transaction has been processed.
     * @throws { BusinessError } 1001930010 - Duplicate request.
     * @throws { BusinessError } 1001930011 - Network connection error.
     * @syscap SystemCapability.Payment.PaymentService
     * @atomicservice
     * @since 4.1.0(11)
     */
    function requestPayment(context: common.UIAbilityContext, orderStr: string, callback: AsyncCallback<void>): void;
    /**
     * Pull up PaymentService withhold checkout
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { string } contractStr - contract information
     * @returns { Promise<void> } - void.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1001930000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001930002 - The transaction has been processed.
     * @throws { BusinessError } 1001930003 - Withhold failed.
     * @throws { BusinessError } 1001930010 - Duplicate request.
     * @throws { BusinessError } 1001930011 - Network connection error.
     * @syscap SystemCapability.Payment.PaymentService
     * @atomicservice
     * @since 5.0.0(12)
     */
    function requestContract(context: common.UIAbilityContext, contractStr: string): Promise<void>;
    /**
     * Pull up PaymentService withhold checkout
     *
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { string } contractStr - contract information
     * @param { AsyncCallback<void> } callback - void.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1001930000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001930002 - The transaction has been processed.
     * @throws { BusinessError } 1001930003 - Withhold failed.
     * @throws { BusinessError } 1001930010 - Duplicate request.
     * @throws { BusinessError } 1001930011 - Network connection error.
     * @syscap SystemCapability.Payment.PaymentService
     * @atomicservice
     * @since 5.0.0(12)
     */
    function requestContract(context: common.UIAbilityContext, contractStr: string, callback: AsyncCallback<void>): void;
    /**
     * Request parameter of cashier picker.
     *
     * @typedef PaymentInfo
     * @syscap SystemCapability.Payment.PaymentService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.2(14)
     */
    interface PaymentInfo {
        /**
         * summary of the payment.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.PaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.2(14)
         */
        tradeSummary?: string;
        /**
         * amount of the order.
         *
         * @type { ?number }
         * @syscap SystemCapability.Payment.PaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.2(14)
         */
        amount?: number;
        /**
         * currency of the order amount.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.PaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.2(14)
         */
        currency?: string;
        /**
         * extra info.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.PaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.2(14)
         */
        extraInfo?: string;
    }
    /**
     * result of cashier picker.
     *
     * @typedef PickerResult
     * @syscap SystemCapability.Payment.PaymentService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.2(14)
     */
    interface PickerResult {
        /**
         * the seleced payment type for the order.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.PaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.2(14)
         */
        selectedPaymentType?: string;
        /**
         * client token from the cashier.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.PaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.2(14)
         */
        clientToken?: string;
    }
    /**
     * Request parameter of payment.
     *
     * @typedef PayResult
     * @syscap SystemCapability.Payment.PaymentService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.2(14)
     */
    interface PayResult {
        /**
         * the seleced payment type for the order.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.PaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.2(14)
         */
        selectedPaymentType?: string;
        /**
         * client token from the cashier.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.PaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.2(14)
         */
        clientToken?: string;
        /**
         * next step to complete the payment flow.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.PaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.2(14)
         */
        nextStep?: string;
        /**
         * extra info.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.PaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.2(14)
         */
        extraInfo?: string;
        /**
         * payload from the request
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.PaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.2(14)
         */
        payload?: string;
    }
    /**
     * Result of the card binding.
     *
     * @typedef BindCardResult
     * @syscap SystemCapability.Payment.PaymentService
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.5(17)
     */
    interface BindCardResult {
        /**
         * Indicates whether the user has a bank card
         *
         * @type { boolean }
         * @syscap SystemCapability.Payment.PaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.5(17)
         */
        hasBankCard: boolean;
        /**
         * Indicates whether the user has just bound a bank card
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Payment.PaymentService
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.5(17)
         */
        hasJustBoundCard?: boolean;
    }
    /**
     * Pull up the bank card management entry
     *
     * @param { common.UIAbilityContext | common.UIExtensionContext } context - The context of an ability.
     * @returns { Promise<BindCardResult> } - The result of the bank card binding.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1001930000 - The operation was canceled by the user.
     * @throws { BusinessError } 1001930011 - Network connection error.
     * @syscap SystemCapability.Payment.PaymentService
     * @atomicservice
     * @since 5.0.5(17)
     */
    function requestBindCard(context: common.UIAbilityContext | common.UIExtensionContext): Promise<BindCardResult>;
}
export default paymentService;
