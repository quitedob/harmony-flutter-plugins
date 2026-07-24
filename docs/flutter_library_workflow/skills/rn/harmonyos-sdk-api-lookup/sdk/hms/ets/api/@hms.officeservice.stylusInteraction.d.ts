/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Defines the subcription capabilities of stylus interactions.
 * @kit Penkit
 */
import { Callback } from '@ohos.base';
/**
 * Stylus interaction event subscriber.
 *
 * @namespace stylusInteraction
 * @syscap SystemCapability.Stylus.StylusService
 * @since 5.1.1(19)
 */
declare namespace stylusInteraction {
    /**
     * Subcribe stylus squeeze interaction.
     *
     * @param { 'squeeze' } type - Interaction type for stylus squeeze.
     * @param { Callback<SqueezeEvent> } receiver - Callback to be triggered when squeezing stylus.
     * @syscap SystemCapability.Stylus.StylusService
     * @since 5.1.1(19)
     */
    function on(type: 'squeeze', receiver: Callback<SqueezeEvent>): void;
    /**
     * Cancel subcribing for stylus squeeze interaction.
     *
     * @param { 'squeeze' } type - Interaction type for stylus squeeze.
     * @param { Callback<SqueezeEvent> } [receiver] - Callback to be cancelled.
     * @syscap SystemCapability.Stylus.StylusService
     * @since 5.1.1(19)
     */
    function off(type: 'squeeze', receiver?: Callback<SqueezeEvent>): void;
    /**
     * Stylus squeeze event.
     *
     * @interface SqueezeEvent
     * @syscap SystemCapability.Stylus.StylusService
     * @since 5.1.1(19)
     */
    export interface SqueezeEvent {
        /**
         * Timestamp of squeeze interaction.
         *
         * @type { number }
         * @syscap SystemCapability.Stylus.StylusService
         * @since 5.1.1(19)
         */
        timestamp: number;
    }
    /**
     * Subcribe stylus double tap interaction.
     *
     * @param { 'doubleTap' } type - Interaction type for stylus double tap.
     * @param { Callback<DoubleTapEvent> } receiver - Callback to be triggered when double tapping stylus.
     * @syscap SystemCapability.Stylus.StylusService
     * @since 5.1.1(19)
     */
    function on(type: 'doubleTap', receiver: Callback<DoubleTapEvent>): void;
    /**
     * Cancel subcribing for stylus double tap interaction.
     *
     * @param { 'doubleTap' } type - Interaction type for stylus double tap.
     * @param { Callback<DoubleTapEvent> } [receiver] - Callback to be cancelled.
     * @syscap SystemCapability.Stylus.StylusService
     * @since 5.1.1(19)
     */
    function off(type: 'doubleTap', receiver?: Callback<DoubleTapEvent>): void;
    /**
     * Stylus double tap event.
     *
     * @interface DoubleTapEvent
     * @syscap SystemCapability.Stylus.StylusService
     * @since 5.1.1(19)
     */
    export interface DoubleTapEvent {
        /**
         * Timestamp of double tap interaction.
         *
         * @type { number }
         * @syscap SystemCapability.Stylus.StylusService
         * @since 5.1.1(19)
         */
        timestamp: number;
    }
}
export default stylusInteraction;
