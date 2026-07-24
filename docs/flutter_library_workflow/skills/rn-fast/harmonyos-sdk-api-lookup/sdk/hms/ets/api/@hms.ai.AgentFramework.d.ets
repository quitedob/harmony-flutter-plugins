/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file This module is used for agent framework kit component.
 * @kit AgentFrameworkKit
 * @bundle com.huawei.hmsapp.hiai.hsp/agentKitHsp/Index 6.0.0(20)
 */
import type { ErrorCallback } from '@ohos.base';
import common from '@ohos.app.ability.common';
/**
 * The definition of AI Agent controller.
 *
 * @syscap SystemCapability.AI.Agent.AgentKit
 * @since 6.0.0(20)
 */
/**
 * The definition of AI Agent controller.
 *
 * @syscap SystemCapability.AI.Agent.AgentKit
 * @atomicservice
 * @since 6.0.1(21)
 */
export declare class AgentController {
    /**
     * If agent kit is supported for the application
     * @param { common.UIAbilityContext } context - the context of application.
     * @param { string } agentId - the agent ID.
     * @returns { Promise<boolean> }.
     * @throws { BusinessError } 1022400010 - Parameter error.
     * @throws { BusinessError } 1022400011 - Privacy agreement not accepted.
     * @throws { BusinessError } 1022400012 - HUAWEI ID not signed in.
     * @throws { BusinessError } 1022400013 - Internet error.
     * @throws { BusinessError } 1022400014 - Internal error.
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     */
    /**
     * If agent kit is supported for the application
     * @param { common.UIAbilityContext } context - the context of application.
     * @param { string } agentId - the agent ID.
     * @returns { Promise<boolean> }.
     * @throws { BusinessError } 1022400010 - Parameter error.
     * @throws { BusinessError } 1022400011 - Privacy agreement not accepted.
     * @throws { BusinessError } 1022400012 - HUAWEI ID not signed in.
     * @throws { BusinessError } 1022400013 - Internet error.
     * @throws { BusinessError } 1022400014 - Internal error.
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     */
    isAgentSupport(context: common.UIAbilityContext, agentId: string): Promise<boolean>;
    /**
     * Register agent dialog opened callback
     * @param { 'agentDialogOpened' } type - Registration Type
     * @param { Callback<void> } callback - Callback is invoked when the agent dialog opened event is triggered.
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     */
    /**
     * Register agent dialog opened callback
     * @param { 'agentDialogOpened' } type - Registration Type
     * @param { Callback<void> } callback - Callback is invoked when the agent dialog opened event is triggered.
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     */
    on(type: 'agentDialogOpened', callback: Callback<void>): void;
    /**
     * Unregister agent dialog opened callback
     * @param { 'agentDialogOpened' } type - Registration Type
     * @param { Callback<void> } [callback] - Callback is invoked when the agent dialog opened event is triggered.
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     */
    /**
     * Unregister agent dialog opened callback
     * @param { 'agentDialogOpened' } type - Registration Type
     * @param { Callback<void> } [callback] - Callback is invoked when the agent dialog opened event is triggered.
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     */
    off(type: 'agentDialogOpened', callback?: Callback<void>): void;
    /**
     * Register agent dialog closed callback
     * @param { 'agentDialogClosed' } type - Registration Type
     * @param { Callback<void> } callback - Callback is invoked when the agent dialog closed event is triggered.
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     */
    /**
     * Register agent dialog closed callback
     * @param { 'agentDialogClosed' } type - Registration Type
     * @param { Callback<void> } callback - Callback is invoked when the agent dialog closed event is triggered.
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     */
    on(type: 'agentDialogClosed', callback: Callback<void>): void;
    /**
     * Unregister agent dialog closed callback
     * @param { 'agentDialogClosed' } type - Registration Type
     * @param { Callback<void> } [callback] - Callback is invoked when the agent dialog closed event is triggered.
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     */
    /**
     * Unregister agent dialog closed callback
     * @param { 'agentDialogClosed' } type - Registration Type
     * @param { Callback<void> } [callback] - Callback is invoked when the agent dialog closed event is triggered.
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     */
    off(type: 'agentDialogClosed', callback?: Callback<void>): void;
}
/**
 * The definition of AI Agent Reply controller.
 *
 * @extends AgentController
 * @syscap SystemCapability.AI.Agent.AgentKit
 * @since 6.0.0(20)
 */
/**
 * The definition of AI Agent Reply controller.
 *
 * @extends AgentController
 * @syscap SystemCapability.AI.Agent.AgentKit
 * @atomicservice
 * @since 6.0.1(21)
 */
export declare class FunctionController extends AgentController {
}
/**
 * The definition of base options for agent components.
 *
 * @typedef BaseOptions
 * @syscap SystemCapability.AI.Agent.AgentKit
 * @since 6.0.0(20)
 */
/**
 * The definition of base options for agent components.
 *
 * @typedef BaseOptions
 * @syscap SystemCapability.AI.Agent.AgentKit
 * @atomicservice
 * @since 6.0.1(21)
 */
export declare interface BaseOptions {
    /**
     * Indicates the title of agent kit reply component.
     *
     * @type { ?string }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     */
    /**
     * Indicates the title of agent kit reply component.
     *
     * @type { ?string }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     */
    title?: string;
    /**
     * Indicates the fontSize of agent kit title.
     * The value range is [14, 16]
     * @type { ?number }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     */
    /**
     * Indicates the fontSize of agent kit title.
     * The value range is [14, 16]
     * @type { ?number }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     */
    titleFontSize?: number;
    /**
     * Indicates the size of agent kit icon.
     * The value range is [16, 24]
     * @type { ?number }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     * */
    /**
     * Indicates the size of agent kit icon.
     * The value range is [16, 24]
     * @type { ?number }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     * */
    iconSize?: number;
    /**
     * Indicates the brand color, apply in the icon, the icon color only could be one color.
     *
     * @type { ?ResourceColor[] }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     * */
    /**
     * Indicates the brand color, apply in the icon, the icon color only could be one color.
     *
     * @type { ?ResourceColor[] }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     * */
    iconColors?: ResourceColor[];
}
/**
 * The definition of Function component options.
 *
 * @extends BaseOptions
 * @typedef FunctionOptions
 * @syscap SystemCapability.AI.Agent.AgentKit
 * @since 6.0.0(20)
 */
/**
 * The definition of Function component options.
 *
 * @extends BaseOptions
 * @typedef FunctionOptions
 * @syscap SystemCapability.AI.Agent.AgentKit
 * @atomicservice
 * @since 6.0.1(21)
 */
export declare interface FunctionOptions extends BaseOptions {
    /**
     * Initial query text when using the agent kit.
     *
     * @type { ?string }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     * */
    /**
     * Initial query text when using the agent kit.
     *
     * @type { ?string }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     * */
    queryText?: string;
    /**
     * The size of agent kit button.
     *
     * @type { ?ControlSize }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     * */
    /**
     * The size of agent kit button.
     *
     * @type { ?ControlSize }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     * */
    controlSize?: ControlSize;
    /**
     * The button mode the agent kit.
     *
     * @type { ?ButtonType }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     * */
    /**
     * The button mode the agent kit.
     *
     * @type { ?ButtonType }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     * */
    buttonType?: ButtonType;
    /**
     * If show shadow of the button, only work in Capsule type.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     * */
    /**
     * If show shadow of the button, only work in Capsule type.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     * */
    isShowShadow?: boolean;
    /**
     * The background color of component.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     * */
    /**
     * The background color of component.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     * */
    backgroundColor?: ResourceColor;
    /**
     * Indicates the brand color, apply in the title, the title color could be one color or two colors.
     *
     * @type { ?ResourceColor[] }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     * */
    /**
     * Indicates the brand color, apply in the title, the title color could be one color or two colors.
     *
     * @type { ?ResourceColor[] }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     * */
    titleColors?: ResourceColor[];
}
/**
 * Button type of function component.
 * @enum { number }
 * @syscap SystemCapability.AI.Agent.AgentKit
 * @since 6.0.0(20)
 */
/**
 * Button type of function component.
 * @enum { number }
 * @syscap SystemCapability.AI.Agent.AgentKit
 * @atomicservice
 * @since 6.0.1(21)
 */
export enum ButtonType {
    /**
     * Round button.
     *
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     */
    /**
     * Round button.
     *
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     */
    CIRCLE = 0,
    /**
     * Capsule button (rounded corners default to half the height).
     *
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     */
    /**
     * Capsule button (rounded corners default to half the height).
     *
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     */
    CAPSULE = 1,
    /**
     * Button with the icon above the title.
     *
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     */
    ICON_ABOVE_TITLE = 2
}
/**
 * Function component of agent kit.
 *
 * @struct { FunctionComponent }
 * @syscap SystemCapability.AI.Agent.AgentKit
 * @since 6.0.0(20)
 */
/**
 * Function component of agent kit.
 *
 * @struct { FunctionComponent }
 * @syscap SystemCapability.AI.Agent.AgentKit
 * @atomicservice
 * @since 6.0.1(21)
 */
@Component
export declare struct FunctionComponent {
    /**
     * ID of the agent.
     *
     * @type { string }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     * */
    /**
     * ID of the agent.
     *
     * @type { string }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     * */
    agentId: string;
    /**
     * Error callback for agent kit component .
     * @type { ErrorCallback }
     * @throws { BusinessError } 1022400010 - Parameter error.
     * @throws { BusinessError } 1022400014 - Internal error.
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     */
    /**
     * Error callback for agent kit component .
     * @type { ErrorCallback }
     * @throws { BusinessError } 1022400010 - Parameter error.
     * @throws { BusinessError } 1022400014 - Internal error.
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     */
    onError: ErrorCallback;
    /**
     * Indicates the options of function component.
     *
     * @type { ?FunctionOptions }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     */
    /**
     * Indicates the options of function component.
     *
     * @type { ?FunctionOptions }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     */
    options?: FunctionOptions;
    /**
     * Indicates the controller of function component.
     *
     * @type { ?FunctionController }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     */
    /**
     * Indicates the controller of function component.
     *
     * @type { ?FunctionController }
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     */
    controller?: FunctionController;
    /**
     * The default builder function for struct, You should not need to invoke this method directly.
     *
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @since 6.0.0(20)
     */
    /**
     * The default builder function for struct, You should not need to invoke this method directly.
     *
     * @syscap SystemCapability.AI.Agent.AgentKit
     * @atomicservice
     * @since 6.0.1(21)
     */
    build(): void;
}
