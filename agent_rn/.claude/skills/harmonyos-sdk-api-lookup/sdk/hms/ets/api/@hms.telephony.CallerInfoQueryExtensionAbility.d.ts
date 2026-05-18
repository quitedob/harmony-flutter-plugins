/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file This module provides the capabilities to query caller info.
 * @kit CallServiceKit
 */
import type CallerInfoQueryExtensionContext from '@hms.telephony.CallerInfoQueryExtensionContext';
/**
 * Indicates the caller information of the phone number.
 *
 * @interface CallerInfo
 * @syscap SystemCapability.Telephony.NumberIdentifyService
 * @stagemodelonly
 * @since 5.0.2(14)
 */
export interface CallerInfo {
    /**
     * Indicates the contact name of the caller.
     *
     * @type { string }
     * @syscap SystemCapability.Telephony.NumberIdentifyService
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    contactName: string;
    /**
     * Indicates the employeeId of the caller.
     *
     * @type { ?string }
     * @syscap SystemCapability.Telephony.NumberIdentifyService
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    employeeId?: string;
    /**
     * Indicates the department of the caller.
     *
     * @type { ?string }
     * @syscap SystemCapability.Telephony.NumberIdentifyService
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    department?: string;
    /**
     * Indicates the position of the caller.
     *
     * @type { ?string }
     * @syscap SystemCapability.Telephony.NumberIdentifyService
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    position?: string;
}
/**
 * Class of caller info query extension ability.
 * @syscap SystemCapability.Telephony.NumberIdentifyService
 * @stagemodelonly
 * @since 5.0.2(14)
 */
export default class CallerInfoQueryExtensionAbility {
    /**
     * Indicates caller info query extension ability context.
     *
     * @type { CallerInfoQueryExtensionContext }
     * @syscap SystemCapability.Telephony.NumberIdentifyService
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    context: CallerInfoQueryExtensionContext;
    /**
     * Called back when querying the caller information of the phone number.
     *
     * @param { string } phoneNumber - Indicates the called number.
     * @returns { Promise<CallerInfo> } Returns the callback for querying the caller information of the phone number.
     * @syscap SystemCapability.Telephony.NumberIdentifyService
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    onQueryCallerInfo(phoneNumber: string): Promise<CallerInfo>;
}
