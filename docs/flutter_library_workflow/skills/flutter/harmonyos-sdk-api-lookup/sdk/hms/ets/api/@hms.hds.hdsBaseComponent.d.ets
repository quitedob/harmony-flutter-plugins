/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */

/**
 * @file Defines the HDS base components and visual effects.
 * @kit UIDesignKit
 */

import { TextModifier } from '@ohos.arkui.modifier';
import image from '@ohos.multimedia.image';
import Want from '@ohos.app.ability.Want';

/**
 * Provides HDS VisualEffect Component.
 *
 * @namespace hdsEffect
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
declare namespace hdsEffect {
    
    /**
     * Predefined press shadow visual effect category.
     *
     * @enum { number }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    enum PressShadowType {
        
        /**
         * Represent no effect
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        NONE = 0,
        
        /**
         * Represent the original background color is changed to a radial gradient of white with 85% alpha in the center
         *   and 100% alpha in the border.
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        BLEND_GRADIENT = 1,
        
        /**
         * Represent blend 15% alpha white with background color
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        BLEND_WHITE = 2
    }
    /**
     * Enum of point light source type.
     *
     * @enum { number }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    enum PointLightSourceType {
        /**
         * Indicates no light source effect.
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        NONE = 0,
        /**
         * Indicates soft point light source
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        SOFT = 1,
        /**
         * Indicates bright point light source
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        BRIGHT = 2
    }
    /**
     * Enum of Illuminated type.
     *
     * @enum { number }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    enum PointLightIlluminatedType {
        /**
         * Component is not illuminated.
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        NONE = 0,
        /**
         * Border is illuminated.
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        BORDER = 1,
        /**
         * Content is illuminated.
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        CONTENT = 2,
        /**
         * Border and Content is illuminated.
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        BORDER_CONTENT = 3,
        /**
         * Border is illuminated with default feathering style.
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        DEFAULT_FEATHERING_BORDER = 20
    }
    /**
     * Options of PointLight
     * @typedef PointLightOptions
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    interface PointLightOptions {
        /**
         * Indicates the color for PointLightSource.
         * @type { ?ResourceColor }
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        color?: ResourceColor;
        /**
         * Indicates PointLightSource intensity.
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        intensity?: number;
        /**
         * Indicates light source height, the higher the height, the greater the illumination range of the light source.
         * @type { ?Dimension }
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        height?: Dimension;
        /**
         * Indicates PointLightSource bloom.
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        bloom?: number;
    }
    /**
     * Point light effect.
     *
     * @interface PointLightEffect
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    interface PointLightEffect {
        /**
         * Defines the point light source type.
         *
         * @type { ?PointLightSourceType }
         * @default PointLightSourceType.NONE
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        sourceType?: PointLightSourceType;
        /**
         * Defines the point light illuminated type.
         *
         * @type { ?PointLightIlluminatedType }
         * @default PointLightIlluminatedType.NONE
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        illuminatedType?: PointLightIlluminatedType;
        /**
         * Defines the point light source options.
         *
         * @type { ?PointLightOptions }
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        options?: PointLightOptions;
    }
    /**
     * Declare effect type
     *
     * @enum { number }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    enum EffectType {
        /**
         * Indicates the dual edge flow light.
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        DUAL_EDGE_FLOW_LIGHT = 0,
        /**
         * Indicates the uv background flow light.
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        UV_BACKGROUND_FLOW_LIGHT = 1
    }
    /**
     * Declare animation framerate type.
     *
     * @enum { number }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    enum FrameRateType {
        /**
         * Indicate 15 frame per second.
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        FRAME_RATE_15 = 15,
        /**
         * Indicate 30 frame per second
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        FRAME_RATE_30 = 30,
        /**
         * Indicate 60 frame per second.
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        FRAME_RATE_60 = 60
    }
    /**
     * Defines expected frame rate for animation
     *
     * @interface ExpectedFrameRateRange
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    interface ExpectedFrameRateRange {
        /**
         * The expected frame rate
         *
         * @type { FrameRateType }
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        expected: FrameRateType;
        /**
         * The minimum frame rate
         *
         * @type { FrameRateType }
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        min: FrameRateType;
        /**
         * The maximum frame rate
         *
         * @type { FrameRateType }
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        max: FrameRateType;
    }
    /**
     * provides the definition of EdgeFlowLightParam.
     *
     * @typedef EdgeFlowLightParam
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    interface EdgeFlowLightParam {
        /**
         * Indicate the start position of edge flow light, which is the portion of component perimeter.
         *
         * @type { number } startPos
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        startPos: number;
        /**
         * Indicate the end position of edge flow light, which is the portion of component perimeter.
         *
         * @type { number } endPos
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        endPos: number;
        /**
         * Indicates the color of edge flow light.
         *
         * @type { ResourceColor } color
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        color: ResourceColor;
    }
    /**
     * provides the definition of DualEdgeFlowLightParam.
     *
     * @typedef DualEdgeFlowLightParam
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    interface DualEdgeFlowLightParam {
        /**
         * Indicates the parameter of first edge flow light.
         *
         * @type { EdgeFlowLightParam } firstEdgeFlowLight
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        firstEdgeFlowLight: EdgeFlowLightParam;
        /**
         * Indicates the parameters of second edge flow light.
         *
         * @type { EdgeFlowLightParam } secondEdgeFlowLight
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        secondEdgeFlowLight: EdgeFlowLightParam;
    }
    /**
     * provides the definition of UVFlowLightColorParam.
     *
     * @typedef UVFlowLightColorParam
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    interface UVFlowLightColorParam {
        /**
         * Indicates the source colors.
         *
         * @type { Array<ResourceColor> } colorSource
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        colorSource: Array<ResourceColor>;
        /**
         * Indicates the target colors.
         *
         * @type { ?Array<ResourceColor> } colorTarget
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        colorTarget?: Array<ResourceColor>;
    }
    /**
     * Effect Params for ShaderType
     *
     * @typedef { DualEdgeFlowLightParam | UVFlowLightColorParam } EffectParams
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    type EffectParams = DualEdgeFlowLightParam | UVFlowLightColorParam;
    /**
     * Defines the hds shader effect controller
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    class ShaderEffectController {
        /**
         * constructor
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        constructor();
        /**
         * Play shader effect animation
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        play(): void;
        /**
         * Pause shader effect animation
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        pause(): void;
        /**
         * Resume shader effect animation
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        resume(): void;
        /**
         * Reverse shader effect animation
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        reverse(): void;
        /**
         * Stop shader effect animation
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        stop(): void;
        /**
         * Set shader effect params
         * @param { EffectParams } params - shader uniform parameters
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        setEffectParams(params: EffectParams): void;
    }
    /**
     * effect animation finish callback
     *
     * @typedef { function } OnFinishCallback
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    type OnFinishCallback = () => void;
    /**
     * Defines the animate function params.
     *
     * @interface AnimationParams
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    interface AnimationParams {
        /**
         * The duration of effect animation, in ms.
         *
         * @type { ?number }
         * @default 1000
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        duration?: number;
        /**
         * The iterations of animation. When set to -1, the animation playing it repeatedly.
         *
         * @type { ?number }
         * @default 1
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        iterations?: number;
        /**
         * The curve of effect animation
         *
         * @type { ?Curve }
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        curve?: Curve;
        /**
         * Animation delay time, in ms.
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        delay?: number;
        /**
         * Indicate whether start play animation automatically when components created.
         *
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        autoPlay?: boolean;
        /**
         * Indicates callback function when animation finished.
         *
         * @type { ?OnFinishCallback }
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        onFinish?: OnFinishCallback;
        /**
         * Indicates frame rate range for animation
         *
         * @type { ?ExpectedFrameRateRange }
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        expectedFrameRateRange?: ExpectedFrameRateRange;
    }
    /**
     * Defines shader effect param
     *
     * @interface ShaderEffectParams
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    interface ShaderEffectParams {
        /**
         * The effect type
         *
         * @type { EffectType }
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        effectType: EffectType;
        /**
         * The animation params.
         *
         * @type { ?AnimationParams }
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        animation?: AnimationParams;
        /**
         * Indicates shader params
         *
         * @type { ?EffectParams }
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        params?: EffectParams;
        /**
         * Indicates controller of shader animation and shader params
         *
         * @type { ?ShaderEffectController }
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        controller?: ShaderEffectController;
    }
    
    /**
     * Declare the HDS effect builder class, provide visual effect builder for each effect
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    class HdsEffectBuilder {
        
        /**
         * constructor of HdsEffectBuilder
         *
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        constructor();
        
        /**
         * Set shadow effect on the component.
         *
         * @param { PressShadowType } type - Indicates the pressShadow type for the component.
         * @returns { HdsEffectBuilder } Return HdsEffectBuilder.
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        pressShadow(type: PressShadowType): HdsEffectBuilder;
        /**
         * Set the point light effect of the component.
         *
         * @param { PointLightEffect } value - Indicates the point light style.
         * @returns { HdsEffectBuilder } Return HdsEffectBuilder.
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        pointLight(value: PointLightEffect): HdsEffectBuilder;
        /**
         *  shader effect interface.
         *
         * @param { ShaderEffectParams } params - shader effect params.
         * @returns { HdsEffectBuilder } Return HdsEffectBuilder.
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        shaderEffect(params: ShaderEffectParams): HdsEffectBuilder;
        
        /**
         * return the VisualEffect struct for visualEffect interface.
         *
         * @returns { VisualEffect } Returns the head node of visualEffect.
         * @syscap SystemCapability.UIDesign.HDSComponent.Core
         * @since 6.0.0(20)
         */
        buildEffect(): VisualEffect;
    }
}
/**
 * Defines the HdsNavigation component interface.
 *
 * @typedef { function } HdsNavigationInterface
 * @param { NavPathStack } [pathInfos] - The stack of the route table.
 * @returns { HdsNavigationAttribute } Returns the instance of the NavigationAttribute.
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare type HdsNavigationInterface = (pathInfos?: NavPathStack) => HdsNavigationAttribute;
/**
 * function of the navDestination builder callback.
 *
 * @typedef { function } NavDestinationBuilder
 * @param { name } navDestination page name
 * @param { pageInfos } navDestination page detail parameters
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare type NavDestinationBuilder = (name: string, pageInfos: Object) => void;
/**
 * function of the customNavContentTransition callback.
 *
 * @typedef { function } CustomTransitionDelegate
 * @param { from } Destination page to exit.
 * @param { to } Destination page to enter.
 * @param { operation } Transition type.
 * @returns { NavigationAnimatedTransition | undefined } Custom transition animation agreement.
 *   undefined: The default transition effect is executed.
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare type CustomTransitionDelegate = (from: NavContentInfo, to: NavContentInfo, operation: NavigationOperation) => NavigationAnimatedTransition | undefined;
/**
 * Defines the type of scroll effect and it is used in the ScrollEffectOptions interface.
 *
 * @enum { number }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare enum ScrollEffectType {
    /**
     * Common blur style of scroll effect.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    COMMON_BLUR = 0,
    /**
     * Gradual blur style of scroll effect.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    GRADUAL_BLUR = 1,
    /**
     * Gradient blur style of scroll effect.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    GRADIENT_BLUR = 2
}
/**
 * Defines the HdsNavigation title mode.
 *
 * @enum { number }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare enum HdsNavigationTitleMode {
    /**
     * the HdsNavigation title is free mode.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    FREE = 0,
    /**
     * the HdsNavigation title is full mode.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    FULL = 1,
    /**
     * the HdsNavigation title is mini mode.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    MINI = 2,
    /**
     * the HdsNavigation title is modal mode.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    MODAL = 3
}
/**
 * Defines the divider show type of title bar.
 *
 * @enum { number }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare enum DividerShowType {
    /**
     * Do not display the divider.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    OFF = 0,
    /**
     * Always dispaly the divider.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    ON = 1,
    /**
     * Display the divider as content scrolls.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    AUTO = 2
}
/**
 * Defines the text style mode of title bar.
 *
 * @enum { number }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare enum TextStyleMode {
    /**
     * Normal button style, with capsule shape.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    NORMAL = 200,
    /**
     * Single character button style, with circle shape.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    SINGLE_CHARACTER = 201
}
/**
 * Defines the HdsNavDestination title mode.
 *
 * @enum { number }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare enum HdsNavDestinationTitleMode {
    /**
     * the HdsNavDestination title is mini mode.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    MINI = 100,
    /**
     * the HdsNavDestination title is modal mode.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    MODAL = 101
}
/**
 * Defines the show type of bottom builder, it is used in the BottomBuilderParams interface.
 *
 * @enum { number }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare enum BottomBuilderShowType {
    /**
     * Directly show type of the bottom builder.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    DIRECTLY_SHOW = 0,
    /**
     * Overdrag show type of the bottom builder.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    OVERDRAG_SHOW = 1
}
/**
 * Defines the hide mode of title bar, it is used in the DynamicHideParams interface.
 *
 * @enum { number }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare enum HideMode {
    /**
     * Scroll up to hide at a certain position.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    SCROLL_UP_TO = 0,
    /**
     * Scroll up to hide at any position.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    SCROLL_UP = 1,
    /**
     * Scroll down to hide at any position.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    SCROLL_DOWN = 2,
    /**
     * Mixed hide mode, bottom builder hide mode is SCROLL_UP_TO, title hide mode is SCROLL_UP.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    SCROLL_UP_TO_BLEND_SCROLL_UP = 3
}
/**
 * Defines the icon style mode of title bar.
 *
 * @enum { number }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare enum IconStyleMode {
    /**
     * Small icon mode.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    SMALL = 100,
    /**
     * Normal icon mode.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    NORMAL = 101,
    /**
     * Large icon mode.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    LARGE = 102
}
/**
 * Sets the blur strategy for HDS Component.
 * @enum { number }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare enum BlurStrategy {
    /**
     * Enables the blur effect.
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    ENABLE = 0,
    /**
     * Disable the blur effect.
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    DISABLE = 1,
    /**
     * Dynamically adjusts the blur effect based on the system policy.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    ADAPTIVE = 2
}
/**
 * Defines the IconType property with ResourceStr and SymbolGlyphModifier unit.
 *
 * @typedef { ResourceStr | SymbolGlyphModifier } IconType
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
/**
 * Defines icon types.
 * @typedef { ResourceStr | SymbolGlyphModifier | PixelMap } IconType
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare type IconType = ResourceStr | SymbolGlyphModifier | PixelMap;
/**
 * Defines the HdsNavigationMenuItemOptions property unit.
 *
 * @typedef { HdsNavigationBadgeIconOptions } HdsNavigationMenuItemOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare type HdsNavigationMenuItemOptions = HdsNavigationBadgeIconOptions;
/**
 * Defines the HdsNavigationBackButtonItemOptions property unit.
 *
 * @typedef { HdsNavigationIconOptions } HdsNavigationBackButtonItemOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare type HdsNavigationBackButtonItemOptions = HdsNavigationIconOptions;
/**
 * Defines the HdsNavigation background Style.
 *
 * @interface HdsNavigationBackgroundStyle
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface HdsNavigationBackgroundStyle {
    /**
     * HdsNavigation title bar backgroundColor
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    backgroundColor?: ResourceColor;
    /**
     * HdsNavigation title bar mask extra height, default unit is vp.
     * Actual mask height equals title bar height add maskExtraHeight.
     *
     * @type { ?number }
     * @default 32
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    maskExtraHeight?: number;
}
/**
 * Defines the HdsNavigation title style.
 *
 * @interface HdsNavigationTitleStyle
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface HdsNavigationTitleStyle {
    /**
     * HdsNavigation title bar main title color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    mainTitleColor?: ResourceColor;
    /**
     * HdsNavigation title bar sub title color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    subTitleColor?: ResourceColor;
}
/**
 * Defines the HdsNavigation icon item style.
 *
 * @interface HdsNavigationIconItemStyle
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface HdsNavigationIconItemStyle {
    /**
     * HdsNavigation icon item backgroundColor.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    backgroundColor?: ResourceColor;
    /**
     * HdsNavigation icon color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    iconColor?: ResourceColor;
    /**
     * HdsNavigation text icon color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    textColor?: ResourceColor;
}
/**
 * Defines the HdsNavigation divider style.
 *
 * @interface HdsNavigationDividerStyle
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare interface HdsNavigationDividerStyle {
    /**
     * HdsNavigation divider color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    dividerColor?: ResourceColor;
}
/**
 * Defines the HdsNavigation titleBar content style.
 *
 * @interface HdsTitleBarContentStyle
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface HdsTitleBarContentStyle {
    /**
     * HdsNavigation title style.
     *
     * @type { ?HdsNavigationTitleStyle }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    titleStyle?: HdsNavigationTitleStyle;
    /**
     * HdsNavigation menu style.
     *
     * @type { ?HdsNavigationIconItemStyle }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    menuStyle?: HdsNavigationIconItemStyle;
    /**
     * HdsNavigation back icon style.
     *
     * @type { ?HdsNavigationIconItemStyle }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    backIconStyle?: HdsNavigationIconItemStyle;
    /**
     * HdsNavigation sub icon style.
     *
     * @type { ?HdsNavigationIconItemStyle }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    subIconStyle?: HdsNavigationIconItemStyle;
    /**
     * HdsNavigation divider style.
     *
     * @type { ?HdsNavigationDividerStyle }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    dividerStyle?: HdsNavigationDividerStyle;
}
/**
 * Defines the HdsNavigation title bar style.
 *
 * @interface HdsNavigationTitleBarStyle
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface HdsNavigationTitleBarStyle {
    /**
     * HdsNavigation title bar background style.
     *
     * @type { ?HdsNavigationBackgroundStyle }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    backgroundStyle?: HdsNavigationBackgroundStyle;
    /**
     * HdsNavigation title bar content style.
     *
     * @type { ?HdsTitleBarContentStyle }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    contentStyle?: HdsTitleBarContentStyle;
}
/**
 * Defines the HdsNavigation scroll effect options.
 *
 * @interface ScrollEffectOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface ScrollEffectOptions {
    /**
     * whether to enable HdsNavigation scroll effect.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    enableScrollEffect?: boolean;
    /**
     * HdsNavigation scroll effect type.
     *
     * @type { ?ScrollEffectType }
     * @default ScrollEffectType.COMMON_BLUR
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    scrollEffectType?: ScrollEffectType;
    /**
     * HdsNavigation scroll effect lower Threshold, default is LengthMetrics.vp(0).
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    blurEffectiveStartOffset?: LengthMetrics;
    /**
     * HdsNavigation scroll effect upper Threshold, default is LengthMetrics.vp(8) for COMMON_BLUR Mode.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    /**
     * HdsNavigation scroll effect upper Threshold, default is LengthMetrics.vp(8) for COMMON_BLUR Mode and
     * GRADIENT_BLUR mode, LengthMetrics.vp(56) for GRADUAL_BLUR mode.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    blurEffectiveEndOffset?: LengthMetrics;
}
/**
 * Defines the HdsNavigation title bar style options.
 *
 * @interface TitleBarStyleOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface TitleBarStyleOptions {
    /**
     * HdsNavigation scroll effect parameter options.
     *
     * @type { ?ScrollEffectOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    scrollEffectOpts?: ScrollEffectOptions;
    /**
     * HdsNavigation titleBar oringinal style before scroll effect take effect.
     *
     * @type { ?HdsNavigationTitleBarStyle }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    originalStyle?: HdsNavigationTitleBarStyle;
    /**
     * HdsNavigation titleBar final style after scroll effect take effect.
     *
     * @type { ?HdsNavigationTitleBarStyle }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    scrollEffectStyle?: HdsNavigationTitleBarStyle;
    /**
     * Sets the blur effective strategy for HdsNavigation.
     *
     * @type { ?BlurStrategy }
     * @default BlurStrategy.ADAPTIVE
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    blurStrategy?: BlurStrategy;
}
/**
 * Defines the HdsNavigation menu badge options.
 *
 * @interface HdsNavigationBadgeOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface HdsNavigationBadgeOptions {
    /**
     * Set the number of reminder messages.
     *
     * @type { ?number }
     * @default -1
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    count?: number;
    /**
     * Text string of the prompt content.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    value?: string;
    /**
     * Custom accessibility text.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    accessibilityText?: ResourceStr;
}
/**
 * Defines the HdsNavigation icon options.
 *
 * @interface HdsNavigationIconOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface HdsNavigationIconOptions {
    /**
     * HdsNavigation iconOptions icon resource.
     *
     * @type { ?IconType }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    icon?: IconType;
    /**
     * HdsNavigation iconOptions icon label.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    label?: ResourceStr;
    /**
     * whether to enable HdsNavigation icon custom action.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    isEnabled?: boolean;
    /**
     * HdsNavigation iconOptions icon custom action.
     *
     * @type { ?Callback<void> }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    action?: Callback<void>;
    /**
     * Defines the component id.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    componentId?: string;
    /**
     * HdsNavigation icon type.
     *
     * @type { ?(IconStyleMode | TextStyleMode) }
     * @default IconStyleMode.NORMAL
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    type?: IconStyleMode | TextStyleMode;
}
/**
 * Defines the HdsNavigation iconmenu options.
 *
 * @interface HdsNavigationBadgeIconOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface HdsNavigationBadgeIconOptions {
    /**
     * HdsNavigation badge icon content.
     *
     * @type { ?HdsNavigationIconOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    content?: HdsNavigationIconOptions;
    /**
     * HdsNavigation badge icon container.
     *
     * @type { ?HdsNavigationBadgeOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    badge?: HdsNavigationBadgeOptions;
}
/**
 * Defines the MultiWindowEntryInAPP menu params.
 *
 * @interface MultiWindowEntryInAPPMenuParams
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare interface MultiWindowEntryInAPPMenuParams {
    /**
     * Configure the Want for multi-window ability display with the following requirements:
     *  1. Mandatory fields: abilityName, moduleName, and bundleName must all be specified
     *  2. Application restriction: All specified names (abilityName/moduleName/bundleName) must belong to
     *     the current application
     *  3. Cross-application limitation: Multi-window does not support abilities from other applications
     *
     * @type { Want }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    want: Want;
}
/**
 * Defines the HdsNavigation menu content options.
 *
 * @interface HdsNavigationMenuContentOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface HdsNavigationMenuContentOptions {
    /**
     * MultiWindowEntryInAPPMenu params.
     *
     * @type { ?MultiWindowEntryInAPPMenuParams }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    multiWindowEntryInAPPMenu?: MultiWindowEntryInAPPMenuParams;
    /**
     * HdsNavigation menu icon resource.
     *
     * @type { ?Array<HdsNavigationMenuItemOptions> }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    value?: Array<HdsNavigationMenuItemOptions>;
    /**
     * HdsNavigation max menu icon to display.
     *
     * @type { ?number }
     * @default 3
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    maxCount?: number;
}
/**
 * Defines the HdsNavigation title options.
 *
 * @interface HdsNavigationTitle
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface HdsNavigationTitle {
    /**
     * HdsNavigation title bar main title resource.
     *
     * @type { ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    mainTitle: ResourceStr;
    /**
     * HdsNavigation title bar sub title resource.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    subTitle?: ResourceStr;
    /**
     * HdsNavigation subTitle builder.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    subTitleBuilder?: CustomBuilder;
    /**
     * HdsNavigation subTitle builder.
     * When the subTitleBuilder and subTitleComponent attributes are both configured,
     * the subTitleComponent attribute takes effect.
     *
     * @type { ?ComponentContent }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.1(21)
     */
    subTitleComponent?: ComponentContent;
    /**
     * Component ID of the main title.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    mainTitleId?: string;
    /**
     * Component ID of the subtitle.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    subTitleId?: string;
}
/**
 * Defines the HdsNavigation title bar bottom builder params.
 *
 * @interface BottomBuilderParams
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare interface BottomBuilderParams {
    /**
     * HdsNavigation title bar bottom custom builder.
     *
     * @type { CustomBuilder }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    builder: CustomBuilder;
    /**
     * HdsNavigation title bar bottom custom builder.
     * When the builder and builderComponent attributes are both configured, the builderComponent attribute takes effect.
     *
     * @type { ?ComponentContent }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.1(21)
     */
    builderComponent?: ComponentContent;
    /**
     * HdsNavigation title bar bottom custom builder height.
     *
     * @type { ?Length }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    height?: Length;
    /**
     * HdsNavigation title bar bottom custom builder show type.
     *
     * @type { ?BottomBuilderShowType }
     * @default BottomBuilderShowType.DIRECTLY_SHOW
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    showType?: BottomBuilderShowType;
}
/**
 * Defines the HdsNavigation title bar divider params.
 *
 * @interface HdsNavigationDividerParams
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare interface HdsNavigationDividerParams {
    /**
     * HdsNavigation title bar divider show type.
     *
     * @type { ?DividerShowType }
     * @default DividerShowType.AUTO
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    showType?: DividerShowType;
}
/**
 * Defines the HdsNavigation title bar content options.
 *
 * @interface TitleBarContentOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface TitleBarContentOptions {
    /**
     * HdsNavigation title bar title resource.
     *
     * @type { ?HdsNavigationTitle }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    title?: HdsNavigationTitle;
    /**
     * HdsNavigation title bar menu content.
     *
     * @type { ?HdsNavigationMenuContentOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    menu?: HdsNavigationMenuContentOptions;
    /**
     * HdsNavigation title bar back icon content.
     *
     * @type { ?HdsNavigationBackButtonItemOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    backIcon?: HdsNavigationBackButtonItemOptions;
    /**
     * HdsNavigation title bar stack builder.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    stackBuilder?: CustomBuilder;
    /**
     * HdsNavigation title bar stack builder.
     * When stackBuilder and builderComponent attributes are both configured,
     * the stackBuilderComponent attribute takes effect.
     *
     * @type { ?ComponentContent }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.1(21)
     */
    stackBuilderComponent?: ComponentContent;
    /**
     * HdsNavigation title bar bottom builder params.
     *
     * @type { ?BottomBuilderParams }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    bottomBuilder?: BottomBuilderParams;
    /**
     * HdsNavigation title bar divider params.
     *
     * @type { ?HdsNavigationDividerParams }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    divider?: HdsNavigationDividerParams;
    /**
     * HdsNavigation title bar sub icon options.
     *
     * @type { ?HdsNavigationBadgeIconOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    subIcon?: HdsNavigationBadgeIconOptions;
}
/**
 * Defines the HdsNavigation padding options.
 *
 * @interface PaddingOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface PaddingOptions {
    /**
     * Set title bar start padding.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    start?: LengthMetrics;
    /**
     * Set title bar end padding.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    end?: LengthMetrics;
}
/**
 * Defines the HdsNavigation titleBar options.
 *
 * @interface HdsNavigationTitleBarOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface HdsNavigationTitleBarOptions {
    /**
     * HdsNavigation title bar padding options.
     *
     * @type { ?PaddingOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    padding?: PaddingOptions;
    /**
     * HdsNavigation title bar style options.
     *
     * @type { ?TitleBarStyleOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    style?: TitleBarStyleOptions;
    /**
     * HdsNavigation title bar content options.
     *
     * @type { ?TitleBarContentOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    content?: TitleBarContentOptions;
    /**
     * Defines whether to respond to the hover mode.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    enableHoverMode?: boolean;
    /**
     * Defines whether to avoid the safe area.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    avoidLayoutSafeArea?: boolean;
    /**
     * Defines whether to enable the titlebar component safe area.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    enableComponentSafeArea?: boolean;
}
/**
 * Defines the HdsNavigation nav bar width range options.
 *
 * @interface NavBarWidthRangeOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare interface NavBarWidthRangeOptions {
    /**
     * Sets the minimum width of navigation bar.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    minWidth?: Dimension;
    /**
     * Sets the maximum width of navigation bar.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    maxWidth?: Dimension;
}
/**
 * Defines the HdsNavigation title bar dynamic hide params.
 *
 * @interface DynamicHideParams
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare interface DynamicHideParams {
    /**
     * Defines whether to hide title area dynamically.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    hideTitleArea?: boolean;
    /**
     * Defines whether to hide bottom builder dynamically.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    hideBottomBuilder?: boolean;
    /**
     * Defines whether to hide status bar dynamically.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    hideStatusBar?: boolean;
    /**
     * Dynamically hide title bar mode.
     *
     * @type { ?HideMode }
     * @default HideMode.SCROLL_UP_TO
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    mode?: HideMode;
    /**
     * Scroll Offset of start to hide tilte bar, default unit is vp.
     *
     * @type { ?number }
     * @default 0
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    hideOffset?: number;
    /**
     * Ratio of the hiding length of the title bar to the scrolling distance. The value range is [1.0,3.0].
     * That is, when the content area scrolls for every 1 vp, the title bar hiding length would be 1/hideRatio, in vp.
     * Abnormal values are handled according to the default values.
     *
     * @type { ?number }
     * @default 2.0
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    hideRatio?: number;
}
/**
 * Indicates the nested scrollable container components.
 *
 * @interface NestedScrollInfo
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare interface NestedScrollInfo {
    /**
     * The controller of parent scrollable container component.
     *
     * @type { Scroller }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    parent: Scroller;
    /**
     * The controller of child scrollable container component.
     *
     * @type { Scroller }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    child: Scroller;
}
/**
 * Declare HdsNavigation attribute functions.
 *
 * @extends CommonMethod<HdsNavigationAttribute>
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
declare class HdsNavigationAttribute extends CommonMethod<HdsNavigationAttribute> {
    /**
     * HdsNavigation title bar.
     *
     * @param { HdsNavigationTitleBarOptions } [options] - Indicates the options of titleBar
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    titleBar(options?: HdsNavigationTitleBarOptions): HdsNavigationAttribute;
    /**
     * HdsNavigation title mode, default is HdsNavigationTitleMode.FREE.
     *
     * @param { HdsNavigationTitleMode } value
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    titleMode(value: HdsNavigationTitleMode): HdsNavigationAttribute;
    /**
     * Configure toolbar with default style parameter or custom parameter.
     *
     * @param { Array<ToolbarItem> | CustomBuilder } value
     * @param { NavigationToolbarOptions } [options] - Indicates the options of toolbar.
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    toolbarConfiguration(value: Array<ToolbarItem> | CustomBuilder, options?: NavigationToolbarOptions): HdsNavigationAttribute;
    /**
     * Hide HdsNavigation tool bar.
     *
     * @param { boolean } hide
     * @param { boolean } [animated]
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    hideToolBar(hide: boolean, animated?: boolean): HdsNavigationAttribute;
    /**
     * Hide HdsNavigation title bar.
     *
     * @param { boolean } hide
     * @param { boolean } [animated]
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    hideTitleBar(hide: boolean, animated?: boolean): HdsNavigationAttribute;
    /**
     * Hide HdsNavigation back button.
     *
     * @param { boolean } value
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    hideBackButton(value: boolean): HdsNavigationAttribute;
    /**
     * Sets the width of HdsNavigation bar.
     *
     * @param { Length } value
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    navBarWidth(value: Length): HdsNavigationAttribute;
    /**
     * Sets the position of HdsNavigation bar.
     *
     * @param { NavBarPosition } value
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    navBarPosition(value: NavBarPosition): HdsNavigationAttribute;
    /**
     * Sets the mode of HdsNavigation.
     *
     * @param { NavigationMode } value
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    mode(value: NavigationMode): HdsNavigationAttribute;
    /**
     * Hide the NavBar, which includes title bar, the child of HdsNavigation and tool bar. Supported in all mode.
     * It will show top page in the NavPathStack directly or empty if there is no page in the NavPathStack.
     *
     * @param { boolean } value
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    hideNavBar(value: boolean): HdsNavigationAttribute;
    /**
     * Set builder for user-defined NavDestination component or HdsNavDestination component.
     *
     * @param { NavDestinationBuilder } builder - The builder function of NavDestination component or
     *   HdsNavDestination component.
     * @returns { HdsNavigationAttribute } Returns the instance of the HdsNavigationAttribute.
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    navDestination(builder: NavDestinationBuilder): HdsNavigationAttribute;
    /**
     * Sets the minimum width and the maximum width of HdsNavigation bar.
     *
     * @param { NavBarWidthRangeOptions } value - The minimum and the maximum width of HdsNavigation bar.
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    navBarWidthRange(value: NavBarWidthRangeOptions): HdsNavigationAttribute;
    /**
     * Sets the minimum width of content.
     *
     * @param { Dimension } value - The minimum width of content.
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    minContentWidth(value: Dimension): HdsNavigationAttribute;
    /**
     * Set HdsNavigation content expand types and edges.
     *
     * @param { Array<LayoutSafeAreaType> } [types] - Indicates the types of the safe area.
     * @param { Array<LayoutSafeAreaEdge> } [edges] - Indicates the edges of the safe area.
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    ignoreLayoutSafeArea(types?: Array<LayoutSafeAreaType>, edges?: Array<LayoutSafeAreaEdge>): HdsNavigationAttribute;
    /**
     * Set the style of system bar
     *
     * @param { Optional<SystemBarStyle> } originalStyle - The oringinal properties of system bar
     * @param { Optional<SystemBarStyle> } scrollEffectStyle - The properties of system bar after scrolling
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    systemBarStyle(originalStyle: Optional<SystemBarStyle>, scrollEffectStyle: Optional<SystemBarStyle>): HdsNavigationAttribute;
    /**
     * Set the HdsNavigation can be restored after the application is terminated.
     * To enable this attribute, a HdsNavigation id must be set.
     *
     * @param { Optional<boolean> } recoverable - HdsNavigation can be recovered.
     * @returns { HdsNavigationAttribute } Returns the instance of the HdsNavigationAttribute.
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    recoverable(recoverable: Optional<boolean>): HdsNavigationAttribute;
    /**
     * Trigger callback when the visibility of HdsNavigation bar change.
     *
     * @param { Callback<boolean> } callback
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    onNavBarStateChange(callback: Callback<boolean>): HdsNavigationAttribute;
    /**
     * Trigger callback when HdsNavigation mode changes.
     *
     * @param { Callback<NavigationMode> } callback
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    onNavigationModeChange(callback: Callback<NavigationMode>): HdsNavigationAttribute;
    /**
     * Hide HdsNavigation title bar with scroll.
     *
     * @param { DynamicHideParams } value
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    dynamicHideTitleBar(value: DynamicHideParams): HdsNavigationAttribute;
    /**
     * Bind HdsNavigation to scrollable container components.
     *
     * @param { Array<Scroller> } scrollers - The controllers of the scrollable container components.
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    bindToScrollable(scrollers: Array<Scroller>): HdsNavigationAttribute;
    /**
     * Bind HdsNavigation to nested scrollable container components.
     *
     * @param { Array<NestedScrollInfo> } scrollers - The controllers of the nested scrollable container components.
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    bindToNestedScrollable(scrollers: Array<NestedScrollInfo>): HdsNavigationAttribute;
    /**
     * Enable dragbar.
     *
     * @param { Optional<boolean> } isEnabled
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    enableDragBar(isEnabled: Optional<boolean>): HdsNavigationAttribute;
    /**
     * Whether to enable modeChangeAnimation.
     *
     * @param { Optional<boolean> } isEnabled
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    enableModeChangeAnimation(isEnabled: Optional<boolean>): HdsNavigationAttribute;
    /**
     * Trigger callback when title mode change finished at free mode.
     *
     * @param { Callback<HdsNavigationTitleMode> } callback
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    onTitleModeChange(callback: Callback<HdsNavigationTitleMode>): HdsNavigationAttribute;
    /**
     * Set custom navigation content transition animation.
     *
     * @param { CustomTransitionDelegate } delegate - Custom transition delegate.
     * @returns { HdsNavigationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    customNavContentTransition(delegate: CustomTransitionDelegate): HdsNavigationAttribute;
}
/**
 * Defines HdsNavigation Component.
 *
 * @type { HdsNavigationInterface }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @uicomponent
 * @since 5.1.0(18)
 */
export declare const HdsNavigation: HdsNavigationInterface;
/**
 * Defines HdsNavigation Component instance.
 *
 * @type { HdsNavigationAttribute }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare const HdsNavigationInstance: HdsNavigationAttribute;
/**
 * Defines the HdsNavDestination component interface.
 *
 * @typedef { function } HdsNavDestinationInterface
 * @returns { HdsNavDestinationAttribute } Returns the instance of the HdsNavDestinationAttribute.
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare type HdsNavDestinationInterface = () => HdsNavDestinationAttribute;
/**
 * Declare HdsNavDestination attribute functions.
 *
 * @extends CommonMethod<HdsNavDestinationAttribute>
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
declare class HdsNavDestinationAttribute extends CommonMethod<HdsNavDestinationAttribute> {
    /**
     * HdsNavDestination title bar.
     *
     * @param { HdsNavigationTitleBarOptions } [options] - Indicates the options of titleBar
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    titleBar(options?: HdsNavigationTitleBarOptions): HdsNavDestinationAttribute;
    /**
     * Hide HdsNavDestination title bar.
     *
     * @param { boolean } hide
     * @param { boolean } [animated]
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    hideTitleBar(hide: boolean, animated?: boolean): HdsNavDestinationAttribute;
    /**
     * Hide HdsNavDestination back button.
     *
     * @param { boolean } value
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    hideBackButton(value: boolean): HdsNavDestinationAttribute;
    /**
     * Sets the mode of HdsNavDestination.
     *
     * @param { NavDestinationMode } value
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    mode(value: NavDestinationMode): HdsNavDestinationAttribute;
    /**
     * Configure toolbar with default style parameter or custom parameter.
     *
     * @param { Array<ToolbarItem> | CustomBuilder } toolbarParam - Toolbar configuration parameters.
     * @param { NavigationToolbarOptions } [options] - Indicates the options of toolbar.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    toolbarConfiguration(toolbarParam: Array<ToolbarItem> | CustomBuilder, options?: NavigationToolbarOptions): HdsNavDestinationAttribute;
    /**
     * Hide tool bar
     *
     * @param { boolean } hide
     * @param { boolean } [animated]
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    hideToolBar(hide: boolean, animated?: boolean): HdsNavDestinationAttribute;
    /**
     * Invoked when the HdsNavDestination page is displayed.
     *
     * @param { Callback<void> } callback - Indicates callback when the HdsNavDestination page is displayed.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    onShown(callback: Callback<void>): HdsNavDestinationAttribute;
    /**
     * Invoked when the HdsNavDestination is hidden.
     *
     * @param { Callback<void> } callback - Indicates callback when the HdsNavDestination is hidden.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    onHidden(callback: Callback<void>): HdsNavDestinationAttribute;
    /**
     * Invoked before sub-components of HdsNavDestination are created.
     *
     * @param { Callback<NavDestinationContext> } callback
     * - Indicates callback that invoked before sub-components of HdsNavDestination are created.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    onReady(callback: Callback<NavDestinationContext>): HdsNavDestinationAttribute;
    /**
     * Invoked before the HdsNavDestination is appeared.
     *
     * @param { Callback<void> } callback - Indicates callback before the HdsNavDestination is appeared.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    onWillAppear(callback: Callback<void>): HdsNavDestinationAttribute;
    /**
     * Invoked before the HdsNavDestination is disappeared.
     *
     * @param { Callback<void> } callback - Indicates callback before the HdsNavDestination is disappeared.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    onWillDisappear(callback: Callback<void>): HdsNavDestinationAttribute;
    /**
     * Invoked before the HdsNavDestination is displayed.
     *
     * @param { Callback<void> } callback - Indicates callback before the HdsNavDestination is displayed.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    onWillShow(callback: Callback<void>): HdsNavDestinationAttribute;
    /**
     * Invoked before the HdsNavDestination is hidden.
     *
     * @param { Callback<void> } callback - Indicates callback before the HdsNavDestination is hidden.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    onWillHide(callback: Callback<void>): HdsNavDestinationAttribute;
    /**
     * Set HdsNavDestination content expand types and edges.
     *
     * @param { Array<LayoutSafeAreaType> } [types] - Indicates the types of the safe area.
     * @param { Array<LayoutSafeAreaEdge> } [edges] - Indicates the edges of the safe area.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    ignoreLayoutSafeArea(types?: Array<LayoutSafeAreaType>, edges?: Array<LayoutSafeAreaEdge>): HdsNavDestinationAttribute;
    /**
     * Set the style of system bar
     *
     * @param { Optional<SystemBarStyle> } originalStyle - The oringinal properties of system bar
     * @param { Optional<SystemBarStyle> } scrollEffectStyle - The properties of system bar after scrolling
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    systemBarStyle(originalStyle: Optional<SystemBarStyle>, scrollEffectStyle: Optional<SystemBarStyle>): HdsNavDestinationAttribute;
    /**
     * Set the HdsNavDestination can be restored after the application is terminated.
     * To enable this attribute, recoverable and id of HdsNavigation must be set.
     *
     * @param { Optional<boolean> } recoverable - set HdsNavDestination can be recovered.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 5.1.0(18)
     */
    recoverable(recoverable: Optional<boolean>): HdsNavDestinationAttribute;
    /**
     * Hide HdsNavDestination title bar with scroll.
     *
     * @param { DynamicHideParams } value
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    dynamicHideTitleBar(value: DynamicHideParams): HdsNavDestinationAttribute;
    /**
     * Bind HdsNavDestination to scrollable container components.
     *
     * @param { Array<Scroller> } scrollers - The controllers of the scrollable container components.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    bindToScrollable(scrollers: Array<Scroller>): HdsNavDestinationAttribute;
    /**
     * Bind HdsNavDestination to nested scrollable container components.
     *
     * @param { Array<NestedScrollInfo> } scrollers - The controllers of the nested scrollable container components.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    bindToNestedScrollable(scrollers: Array<NestedScrollInfo>): HdsNavDestinationAttribute;
    /**
     * Configuration of system transition
     *
     * @param { NavigationSystemTransitionType } type - Types of system Transition.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    systemTransition(type: NavigationSystemTransitionType): HdsNavDestinationAttribute;
    /**
     * Set HdsNavDestination custom animation.
     *
     * @param { NavDestinationTransitionDelegate } delegate - The delegate of HdsNavDestination custom animation.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    customTransition(delegate: NavDestinationTransitionDelegate): HdsNavDestinationAttribute;
    /**
     * Invoked when the backButton is pressed.
     *
     * @param { Callback<void, boolean> } callback - Indicates callback when the backButton is pressed.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    onBackPressed(callback: Callback<void, boolean>): HdsNavDestinationAttribute;
    /**
     * HdsNavDestination title mode.
     *
     * @param { HdsNavDestinationTitleMode } value
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    titleMode(value: HdsNavDestinationTitleMode): HdsNavDestinationAttribute;
    /**
     * Triggered when the **HdsNavDestination* component becomes active (on top of the stack and operable,
     * with no special components blocking it).
     *
     * @param { Optional<Callback<NavDestinationActiveReason>> } callback - Reason why
     * the **HdsNavDestination** component switches from inactive to active.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.1(21)
     */
    onActive(callback: Optional<Callback<NavDestinationActiveReason>>): HdsNavDestinationAttribute;
    /**
     * Triggered when **HdsNavDestination** component becomes inactive
     * (not on top of the stack and inoperable, or on top but blocked by special components).
     *
     * @param { Optional<Callback<NavDestinationActiveReason>> } callback - Reason why
     * the **HdsNavDestination** component switches from active to inactive.
     * @returns { HdsNavDestinationAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.1(21)
     */
    onInactive(callback: Optional<Callback<NavDestinationActiveReason>>): HdsNavDestinationAttribute;
}
/**
 * Defines HdsNavDestination Component.
 *
 * @type { HdsNavDestinationInterface }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @uicomponent
 * @since 5.1.0(18)
 */
export declare const HdsNavDestination: HdsNavDestinationInterface;
/**
 * Defines HdsNavDestination Component instance.
 *
 * @type { HdsNavDestinationAttribute }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 5.1.0(18)
 */
export declare const HdsNavDestinationInstance: HdsNavDestinationAttribute;
/**
 * Defines the SymbolType property with ResourceStr and SymbolGlyphModifier unit.
 *
 * @typedef { ResourceStr | SymbolGlyphModifier } SymbolType
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare type SymbolType = ResourceStr | SymbolGlyphModifier;
/**
 * Defines the PrefixIconType property with ImageOptions and SymbolGlyphOptions.
 *
 * @typedef { ImageOptions | SymbolGlyphOptions} PrefixIconType
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare type PrefixIconType = ImageOptions | SymbolGlyphOptions;
/**
 * Defines the ImageType property with ResourceStr and PixelMap.
 *
 * @typedef { ResourceStr | image.PixelMap} ImageType
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare type ImageType = ResourceStr | image.PixelMap;
/**
 * function of the hdsListItemCard onclick callback.
 *
 * @typedef { function } OnClickCallback
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare type OnClickCallback = () => void;
/**
 * function of the hdsListItemCard onchange callback.
 *
 * @typedef { function } OnChangeCallback
 * @param { isOn } toggle isSelected status
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare type OnChangeCallback = (isOn: boolean) => void;
/**
 * function of the hdsListItemCard onselect callback.
 *
 * @typedef { function } OnSelectCallback
 * @param { index } select option index
 * @param { text } select option content
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare type OnSelectCallback = (index: number, text: string) => void;
/**
 * Defines accessibility options.
 * @interface AccessibilityOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface AccessibilityOptions {
    /**
     * Sets the accessibility text.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    accessibilityText?: ResourceStr;
    /**
     * Accessibility description.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    accessibilityDescription?: ResourceStr;
    /**
     * The accessibilityLevel of the AccessibilityOptions.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    accessibilityLevel?: ResourceStr;
}
/**
 * Defines the Image options.
 *
 * @interface ImageOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface ImageOptions {
    /**
     * Set the image resource type.
     *
     * @type { ?ImageType }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    image?: ImageType;
    /**
     * Set the image modifier, the modifier can only change fillColor and border of image.
     *
     * @type { ?ImageModifier }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    modifier?: ImageModifier;
}
/**
 * Defines the Image click options.
 *
 * @interface ImageClickOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface ImageClickOptions {
    /**
     * Set the image resource type.
     *
     * @type { ?ImageType }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    image?: ImageType;
    /**
     * Set the image modifier, the modifier can only change fillColor and border of image.
     *
     * @type { ?ImageModifier }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    modifier?: ImageModifier;
    /**
     * Set the onClick callback of image.
     *
     * @type { ?OnClickCallback }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    onClick?: OnClickCallback;
    /**
     * Set the enable status of image.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    enable?: boolean;
    /**
     * Defines accessibility options.
     * @type { ?AccessibilityOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    accessibilityOptions?: AccessibilityOptions;
}
/**
 * Defines the Symbol options.
 *
 * @interface SymbolGlyphOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface SymbolGlyphOptions {
    /**
     * Set the symbol resource type, the modifier can only change color of symbol.
     *
     * @type { ?SymbolType }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    symbol?: SymbolType;
}
/**
 * Defines the TextSymbolGlyph options.
 *
 * @interface TextSymbolGlyphOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface TextSymbolGlyphOptions {
    /**
     * Set the symbol resource type.
     *
     * @type { ?SymbolType }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    symbol?: SymbolType;
    /**
     * Set the onClick callback of symbolGlyph .
     *
     * @type { ?OnClickCallback }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    onClick?: OnClickCallback;
    /**
     * Sets the enabling status.
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    enable?: boolean;
    /**
     * Defines accessibility options.
     * @type { ?AccessibilityOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    accessibilityOptions?: AccessibilityOptions;
}
/**
 * Defines the prefixIcon options.
 *
 * @interface PrefixIconOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface PrefixIconOptions {
    /**
     * Set the scenario for IconSize.
     *
     * @type { ?IconSize }
     * @default IconSize.SYSTEM_ICON
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    iconSize?: IconSize;
    /**
     * Set the prefixIcon resource type.
     *
     * @type { ?PrefixIconType }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    iconValue?: PrefixIconType;
}
/**
 * Defines the Badge options.
 *
 * @interface BadgeOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface BadgeOptions {
    /**
     * Set the number of badge.
     *
     * @type { ?number }
     * @default -1
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    badgeValue?: number;
    /**
     * Set the color of badge.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    badgeColor?: ResourceColor;
    /**
     * Set the color of badgetext.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    textColor?: ResourceColor;
    /**
     * Set the id of badge.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    badgeId?: string;
}
/**
 * Defines the Check options.
 *
 * @interface CheckOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface CheckOptions {
    /**
     * Set the isCheck status of check component.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    isCheck?: boolean;
    /**
     * Set the color of check component.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    selectColor?: ResourceColor;
    /**
     * Set the onChange callback of check component.
     *
     * @type { ?OnChangeCallback }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    onChange?: OnChangeCallback;
    /**
     * Set the onClick callback of check component.
     *
     * @type { ?OnClickCallback }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    onClick?: OnClickCallback;
    /**
     * Set the enable status of check component.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    enable?: boolean;
    /**
     * Set the id of check component.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    checkId?: string;
    /**
     * Defines accessibility options.
     * @type { ?AccessibilityOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    accessibilityOptions?: AccessibilityOptions;
}
/**
 * Defines the ToggleButton options.
 *
 * @interface ToggleButtonOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface ToggleButtonOptions {
    /**
     * Set the isCheck status of toggle button.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    isCheck?: boolean;
    /**
     * Set the symbol resource of toggle button.
     *
     * @type { ?SymbolType }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    iconValue?: SymbolType;
    /**
     * Set the selectColor of toggle button.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    selectColor?: ResourceColor;
    /**
     * Set the onChange callback of toggle button.
     *
     * @type { ?OnChangeCallback }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    onChange?: OnChangeCallback;
    /**
     * Set the enable status of toggle button.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    enable?: boolean;
    /**
     * Set the id of toggle button.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    toggleButtonId?: string;
    /**
     * Defines accessibility options.
     * @type { ?AccessibilityOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    accessibilityOptions?: AccessibilityOptions;
}
/**
 * Predefined IconSize category.
 *
 * @enum { number }
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare enum IconSize {
    /**
     * Represent small icon size.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    SMALL_ICON = 1,
    /**
     * Represent system icon size.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    SYSTEM_ICON = 2
}
/**
 * Defines the Text options.
 *
 * @interface TextOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface TextOptions {
    /**
     * Set the text resource type.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    text?: ResourceStr;
    /**
     * Set the text modifier, the modifier can only change color and alignment of text.
     *
     * @type { ?TextModifier }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    modifier?: TextModifier;
}
/**
 * Defines the Color options.
 *
 * @interface ColorOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface ColorOptions {
    /**
     * Set the color resource.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    color?: ResourceColor;
    /**
     * Set the id of component.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    componentId?: string;
}
/**
 * Defines the Button options.
 *
 * @interface ButtonOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface ButtonOptions {
    /**
     * Set the text of button.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    text?: ResourceStr;
    /**
     * Set the textColor of button.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    textColor?: ResourceColor;
    /**
     * Set the onClick callback of button.
     *
     * @type { ?OnClickCallback }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    onClick?: OnClickCallback;
    /**
     * Set the enable status of button.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    enable?: boolean;
    /**
     * Set the id of button.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    buttonId?: string;
    /**
     * Defines accessibility options.
     * @type { ?AccessibilityOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    accessibilityOptions?: AccessibilityOptions;
}
/**
 * Defines the Suffix Icon options.
 *
 * @interface SuffixIconOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface SuffixIconOptions {
    /**
     * Set the resource value of icon.
     *
     * @type { ?PrefixIconType }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    iconValue?: PrefixIconType;
    /**
     * Set the onClick callback of icon.
     *
     * @type { ?OnClickCallback }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    onClick?: OnClickCallback;
    /**
     * Set the enable status of icon.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    enable?: boolean;
    /**
     * Defines accessibility options.
     * @type { ?AccessibilityOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    accessibilityOptions?: AccessibilityOptions;
}
/**
 * Defines the Select style.
 *
 * @interface SelectStyle
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface SelectStyle {
    /**
     * Set the value resource of select.
     *
     * @type { ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    value: ResourceStr;
    /**
     * Set the value resource color of select.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    valueColor?: ResourceColor;
    /**
     * Set the arrow color of select.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    arrowColor?: ResourceColor;
    /**
     * Set the optionValues of select.
     *
     * @type { Array<ResourceStr> }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    optionValues: Array<ResourceStr>;
    /**
     * Set the optionSymbol of select.
     *
     * @type { Array<SymbolGlyphModifier> }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    optionSymbol: Array<SymbolGlyphModifier>;
    /**
     * Set the onselect callback of select.
     *
     * @type { ?OnSelectCallback}
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    onSelect?: OnSelectCallback;
    /**
     * Whether to set default selected icon.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    showDefaultSelectedIcon?: boolean;
    /**
     * Set the enable status of select.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    enable?: boolean;
    /**
     * Set the id of select.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    selectId?: string;
    /**
     * Defines accessibility options.
     * @type { ?AccessibilityOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    accessibilityOptions?: AccessibilityOptions;
}
/**
 * Defines the Suffix ArrowIcon options.
 *
 * @interface SuffixArrowIconOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface SuffixArrowIconOptions {
    /**
     * Set the color of arrow.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    arrowColor?: ResourceColor;
    /**
     * Set the onClick callback of arrow.
     *
     * @type { ?OnClickCallback }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    onClick?: OnClickCallback;
    /**
     * Set the id of arrow.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    arrowId?: string;
    /**
     * Set the enable status of arrow.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    enable?: boolean;
    /**
     * Defines accessibility options.
     * @type { ?AccessibilityOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    accessibilityOptions?: AccessibilityOptions;
}
/**
 * Defines the Suffix ArrowIconText options.
 *
 * @interface SuffixArrowIconTextOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface SuffixArrowIconTextOptions {
    /**
     * Set the options of start arrow.
     *
     * @type { ?SuffixArrowIconOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    startArrow?: SuffixArrowIconOptions;
    /**
     * Set the text.
     *
     * @type { ?TextOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    text?: TextOptions;
    /**
     * Set the options of end arrow.
     *
     * @type { ?SuffixArrowIconOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    endArrow?: SuffixArrowIconOptions;
}
/**
 * Defines PrefixItem class.
 *
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class PrefixItem {
}
/**
 * Defines PrefixImage class.
 *
 * @extends PrefixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class PrefixImage extends PrefixItem {
    /**
     * constructor.
     *
     * @param { ImageClickOptions } [options] - The options of prefixImage.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: ImageClickOptions);
    /**
     * The options
     *
     * @type { ?ImageClickOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: ImageClickOptions;
}
/**
 * Defines PrefixIcon class.
 *
 * @extends PrefixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class PrefixIcon extends PrefixItem {
    /**
     * constructor.
     *
     * @param { PrefixIconOptions } [options] - The options of prefixIcon.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: PrefixIconOptions);
    /**
     * The options
     *
     * @type { ?PrefixIconOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: PrefixIconOptions;
}
/**
 * Defines PrefixBadge class.
 *
 * @extends PrefixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class PrefixBadge extends PrefixItem {
    /**
     * constructor.
     *
     * @param { BadgeOptions } [options] - The options of prefixBadge.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: BadgeOptions);
    /**
     * The options
     *
     * @type { ?BadgeOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: BadgeOptions;
}
/**
 * Defines PrefixSwitch class.
 *
 * @extends PrefixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class PrefixSwitch extends PrefixItem {
    /**
     * constructor.
     *
     * @param { CheckOptions } [options] - The options of prefixSwitch.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: CheckOptions);
    /**
     * The options
     *
     * @type { ?CheckOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: CheckOptions;
}
/**
 * Defines PrefixToggleButton class, only support in car device.
 *
 * @extends PrefixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class PrefixToggleButton extends PrefixItem {
    /**
     * constructor.
     *
     * @param { ToggleButtonOptions } [options] - The options of prefixToggleButton.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: ToggleButtonOptions);
    /**
     * The options
     *
     * @type { ?ToggleButtonOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: ToggleButtonOptions;
}
/**
 * Defines PrefixButton class, only support in car device.
 *
 * @extends PrefixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class PrefixButton extends PrefixItem {
    /**
     * constructor.
     *
     * @param { ButtonOptions } [options] - The options of prefixButton.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: ButtonOptions);
    /**
     * The options
     *
     * @type { ?ButtonOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: ButtonOptions;
}
/**
 * Defines PrefixCustomBuilder class.
 *
 * @extends PrefixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class PrefixCustomBuilder extends PrefixItem {
    /**
     * constructor.
     *
     * @param { CustomBuilder } [customBuilder] - The customBuilder option of prefixCustomBuilder.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(customBuilder?: CustomBuilder);
    /**
     * The customBuilder
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    customBuilder?: CustomBuilder;
}
/**
 * Defines the TextItemOptions.
 *
 * @interface TextItemOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface TextItemOptions {
    /**
     * Set the primaryText.
     *
     * @type { ?TextOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    primaryText?: TextOptions;
    /**
     * Set the primaryPrefixSymbol.
     *
     * @type { ?TextSymbolGlyphOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    primaryPrefixSymbol?: TextSymbolGlyphOptions;
    /**
     * Set the primarySuffixSymbol.
     *
     * @type { ?TextSymbolGlyphOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    primarySuffixSymbol?: TextSymbolGlyphOptions;
    /**
     * Set the primaryPrefixSubSymbol, it can be called only after primaryPrefixSymbol is called.
     *
     * @type { ?TextSymbolGlyphOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    primaryPrefixSubSymbol?: TextSymbolGlyphOptions;
    /**
     * Set the primarySuffixSubSymbol, it can be called only after primarySuffixSymbol is called.
     *
     * @type { ?TextSymbolGlyphOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    primarySuffixSubSymbol?: TextSymbolGlyphOptions;
    /**
     * Set the secondaryText.
     *
     * @type { ?TextOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    secondaryText?: TextOptions;
    /**
     * Set the secondaryPrefixSymbol.
     *
     * @type { ?TextSymbolGlyphOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    secondaryPrefixSymbol?: TextSymbolGlyphOptions;
    /**
     * Set the secondarySuffixSymbol.
     *
     * @type { ?TextSymbolGlyphOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    secondarySuffixSymbol?: TextSymbolGlyphOptions;
    /**
     * Set the secondaryPrefixSubSymbol, it can be called only after secondaryPrefixSymbol is called.
     *
     * @type { ?TextSymbolGlyphOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    secondaryPrefixSubSymbol?: TextSymbolGlyphOptions;
    /**
     * Set the secondarySuffixSubSymbol, it can be called only after secondarySuffixSymbol is called.
     *
     * @type { ?TextSymbolGlyphOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    secondarySuffixSubSymbol?: TextSymbolGlyphOptions;
    /**
     * Set the description.
     *
     * @type { ?TextOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    description?: TextOptions;
    /**
     * Set the descriptionPrefixSymbol.
     *
     * @type { ?TextSymbolGlyphOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    descriptionPrefixSymbol?: TextSymbolGlyphOptions;
    /**
     * Set the descriptionSuffixSymbol.
     *
     * @type { ?TextSymbolGlyphOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    descriptionSuffixSymbol?: TextSymbolGlyphOptions;
    /**
     * Set the descriptionPrefixSubSymbol, it can be called only after descriptionPrefixSymbol is called.
     *
     * @type { ?TextSymbolGlyphOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    descriptionPrefixSubSymbol?: TextSymbolGlyphOptions;
    /**
     * Set the descriptionSuffixSubSymbol, it can be called only after descriptionSuffixSymbol is called.
     *
     * @type { ?TextSymbolGlyphOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    descriptionSuffixSubSymbol?: TextSymbolGlyphOptions;
    /**
     * Set the customBuilder.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    customBuilder?: CustomBuilder;
}
/**
 * Defines SuffixItem class.
 *
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixItem {
}
/**
 * Defines SuffixText class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixText extends SuffixItem {
    /**
     * constructor.
     *
     * @param { TextOptions } [options] - The options of suffixText.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: TextOptions);
    /**
     * The options
     *
     * @type { ?TextOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: TextOptions;
}
/**
 * Defines SuffixImage class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixImage extends SuffixItem {
    /**
     * constructor.
     *
     * @param { ImageClickOptions } [options] - The options of suffixImage.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: ImageClickOptions);
    /**
     * The options
     *
     * @type { ?ImageClickOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: ImageClickOptions;
}
/**
 * Defines SuffixLoadingProgress class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixLoadingProgress extends SuffixItem {
    /**
     * constructor.
     *
     * @param { ColorOptions } [options] - The options of suffixLoadingProgress.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: ColorOptions);
    /**
     * The options
     *
     * @type { ?ColorOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: ColorOptions;
}
/**
 * Defines SuffixRadio class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixRadio extends SuffixItem {
    /**
     * constructor.
     *
     * @param { CheckOptions } [options] - The options of suffixRadio.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: CheckOptions);
    /**
     * The options
     *
     * @type { ?CheckOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: CheckOptions;
}
/**
 * Defines SuffixCheckbox class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixCheckbox extends SuffixItem {
    /**
     * constructor.
     *
     * @param { CheckOptions } [options] - The options of suffixCheckbox.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: CheckOptions);
    /**
     * The options
     *
     * @type { ?CheckOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: CheckOptions;
}
/**
 * Defines SuffixSwitch class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixSwitch extends SuffixItem {
    /**
     * constructor.
     *
     * @param { CheckOptions } [options] - The options of suffixSwitch.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: CheckOptions);
    /**
     * The options
     *
     * @type { ?CheckOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: CheckOptions;
}
/**
 * Defines SuffixArrow class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixArrow extends SuffixItem {
    /**
     * constructor.
     *
     * @param { ColorOptions } [options] - The options of suffixArrow.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: ColorOptions);
    /**
     * The options
     *
     * @type { ?ColorOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: ColorOptions;
}
/**
 * Defines SuffixBadge class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixBadge extends SuffixItem {
    /**
     * constructor.
     *
     * @param { BadgeOptions } [options] - The options of suffixBadge.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: BadgeOptions);
    /**
     * The options
     *
     * @type { ?BadgeOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: BadgeOptions;
}
/**
 * Defines SuffixButton class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixButton extends SuffixItem {
    /**
     * constructor.
     *
     * @param { ButtonOptions } [options] - The options of suffixButton.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: ButtonOptions);
    /**
     * The options
     *
     * @type { ?ButtonOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: ButtonOptions;
}
/**
 * Defines SuffixIcon class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixIcon extends SuffixItem {
    /**
     * constructor.
     *
     * @param { SuffixIconOptions } [options] - The options of suffixIcon.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: SuffixIconOptions);
    /**
     * The options
     *
     * @type { ?SuffixIconOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: SuffixIconOptions;
}
/**
 * Defines SuffixSubIcon class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixSubIcon extends SuffixItem {
    /**
     * constructor.
     *
     * @param { SuffixIconOptions } [options] - The options of suffixSubIcon.
     * @param { SuffixIconOptions } [subOptions] - The subOptions of suffixSubIcon.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: SuffixIconOptions, subOptions?: SuffixIconOptions);
    /**
     * The options
     *
     * @type { ?SuffixIconOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: SuffixIconOptions;
    /**
     * The subOptions
     *
     * @type { ?SuffixIconOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    subOptions?: SuffixIconOptions;
}
/**
 * Defines SuffixSelect class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixSelect extends SuffixItem {
    /**
     * constructor.
     *
     * @param { SelectStyle } [options] - The options of suffixSelect.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: SelectStyle);
    /**
     * The options
     *
     * @type { ?SelectStyle }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: SelectStyle;
}
/**
 * Defines SuffixToggleButton class, only support in car device.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixToggleButton extends SuffixItem {
    /**
     * constructor.
     *
     * @param { ToggleButtonOptions } [options] - The options of suffixToggleButton.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: ToggleButtonOptions);
    /**
     * The options
     *
     * @type { ?ToggleButtonOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: ToggleButtonOptions;
}
/**
 * Defines SuffixBadgeAndArrow class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixBadgeAndArrow extends SuffixItem {
    /**
     * constructor.
     *
     * @param { BadgeOptions } [badgeOptions] - The badgeOptions of suffixBadgeAndArrow.
     * @param { ColorOptions } [arrowOptions] - The arrowOptions of suffixBadgeAndArrow.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(badgeOptions?: BadgeOptions, arrowOptions?: ColorOptions);
    /**
     * The badgeOptions
     *
     * @type { ?BadgeOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    badgeOptions?: BadgeOptions;
    /**
     * The arrowOptions
     *
     * @type { ?ColorOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    arrowOptions?: ColorOptions;
}
/**
 * Defines SuffixTextAndArrow class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixTextAndArrow extends SuffixItem {
    /**
     * constructor.
     *
     * @param { TextOptions } [textOptions] - The textOptions of suffixTextAndArrow.
     * @param { ColorOptions } [arrowOptions] - The arrowOptions of suffixTextAndArrow.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(textOptions?: TextOptions, arrowOptions?: ColorOptions);
    /**
     * The textOptions
     *
     * @type { ?TextOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    textOptions?: TextOptions;
    /**
     * The arrowOptions
     *
     * @type { ?ColorOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    arrowOptions?: ColorOptions;
}
/**
 * Defines SuffixArrowIconText class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixArrowIconText extends SuffixItem {
    /**
     * constructor.
     *
     * @param { SuffixArrowIconTextOptions } [options] - The options of suffixArrowIconText.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(options?: SuffixArrowIconTextOptions);
    /**
     * The options
     *
     * @type { ?SuffixArrowIconTextOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    options?: SuffixArrowIconTextOptions;
}
/**
 * Defines SuffixCustomBuilder class.
 *
 * @extends SuffixItem
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare class SuffixCustomBuilder extends SuffixItem {
    /**
     * constructor.
     *
     * @param { CustomBuilder } [customBuilder] - The customBuilder option of suffixCustomBuilder.
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    constructor(customBuilder?: CustomBuilder);
    /**
     * The customBuilder
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    customBuilder?: CustomBuilder;
}
/**
 * Defines the HdsListItemCard options.
 *
 * @interface HdsListItemCardOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare interface HdsListItemCardOptions {
    /**
     * Set the prefixItem.
     *
     * @type { ?PrefixItem }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    prefixItem?: PrefixItem;
    /**
     * Set the textItem.
     *
     * @type { ?TextItemOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    textItem?: TextItemOptions;
    /**
     * Set the suffixItem.
     *
     * @type { ?SuffixItem }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    suffixItem?: SuffixItem;
    /**
     * Set the onClick callback of HdsListItemCard.
     *
     * @type { ?OnClickCallback }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    onClick?: OnClickCallback;
    /**
     * Set the height of HdsListItemCard.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    cardHeight?: Dimension;
    /**
     * Set the width of HdsListItemCard.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    cardWidth?: Dimension;
    /**
     * Set the background color of HdsListItemCard.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    cardBackgroundColor?: ResourceColor;
    /**
     * Set the border radius of HdsListItemCard.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    cardBorderRadius?: Dimension;
    /**
     * Set the prefix margin of HdsListItemCard.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    cardPrefixMargin?: Dimension;
    /**
     * Set the suffix margin of HdsListItemCard.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    cardSuffixMargin?: Dimension;
    /**
     * Set the hover border radius of HdsListItemCard.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    hoverBorderRadius?: Dimension;
    /**
     * Set the enable status of HdsListItemCard.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    enable?: boolean;
    /**
     * Set the id of HdsListItemCard.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    cardId?: string;
    /**
     * Defines accessibility options.
     * @type { ?AccessibilityOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Full
     * @since 6.0.0(20)
     */
    accessibilityOptions?: AccessibilityOptions;
}
/**
 * Defines the HdsListItemCard component interface
 *
 * @typedef { function } HdsListItemCardInterface
 * @param { HdsListItemCardOptions } options - The options of HdsListItemCard.
 * @returns { HdsListItemCardAttribute }
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
declare type HdsListItemCardInterface = (options: HdsListItemCardOptions) => HdsListItemCardAttribute;
/**
 * Declare HdsListItemCard attribute functions.
 *
 * @extends CommonMethod<HdsListItemCardAttribute>
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
declare class HdsListItemCardAttribute extends CommonMethod<HdsListItemCardAttribute> {
}
/**
 * Defines HdsListItemCard Component.
 *
 * @type { HdsListItemCardInterface }
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @uicomponent
 * @since 6.0.0(20)
 */
export declare const HdsListItemCard: HdsListItemCardInterface;
/**
 * Defines HdsListItemCard Component instance.
 *
 * @type { HdsListItemCardAttribute }
 * @syscap SystemCapability.UIDesign.HDSComponent.Full
 * @since 6.0.0(20)
 */
export declare const HdsListItemCardInstance: HdsListItemCardAttribute;
export { hdsEffect, HdsNavigationAttribute, HdsNavDestinationAttribute, HdsListItemCardAttribute };
/**
 * Defines the HdsTabs background Style.
 *
 * @interface HdsTabsBackgroundStyle
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare interface HdsTabsBackgroundStyle {
    /**
     * Sets the color of the tab bar mask.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    maskColor?: ResourceColor;
    /**
     * Sets the height of the tab bar mask.
     * If this parameter is not set, the maskHeight value is
     * the component height (including the bottom TabBar height) plus 32 vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    maskHeight?: number;
}
/**
 * Defines HDS Tabs Component.
 *
 * @type { HdsTabsInterface }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @uicomponent
 * @since 6.0.0(20)
 */
export declare const HdsTabs: HdsTabsInterface;
/**
 * Provides an interface for the style of a divider including stroke width, color, start margin
 * and end margin
 *
 * @interface HdsDividerStyle
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare interface HdsDividerStyle {
    /**
     * Define the DividerStyle
     *
     * @type { ?DividerStyle }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    style?: DividerStyle;
    /**
     * Sets the mode of the divider.
     *
     * @type { DividerMode }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    mode: DividerMode;
}
/**
 * Defines the HDS tabs attribute functions.
 *
 * @extends CommonMethod<HdsTabsAttribute>
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
declare class HdsTabsAttribute extends CommonMethod<HdsTabsAttribute> {
    /**
     * Called when determining whether the tab is vertical.
     *
     * @param { boolean } value - Whether to use vertical tabs. Default value is false.
     * @returns { HdsTabsAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    vertical(value: boolean): HdsTabsAttribute;
    /**
     * Called when determining the location of the bar chart.
     *
     * @param { BarPosition } value - Position of the Tabs component. Default value is BarPosition.Start.
     * @returns { HdsTabsAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    barPosition(value: BarPosition): HdsTabsAttribute;
    /**
     * Called when judging whether page switching can be performed by sliding left and right.
     *
     * @param { boolean } value - Whether the tabs are scrollable. Default value is true.
     * @returns { HdsTabsAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    scrollable(value: boolean): HdsTabsAttribute;
    /**
     * Called when the graphic format of the bar chart is selected.
     *
     * @param { HdsBarMode } value - Layout mode.
     * @param { ScrollableBarModeOptions } [options] - options indicate the options for the scrollable bar mode
     * @returns { HdsTabsAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    barMode(value: HdsBarMode, options?: ScrollableBarModeOptions): HdsTabsAttribute;
    /**
     * Called when the width of the bar graph is set.
     *
     * @param { Length } value - Width of the tab bar.
     * @returns { HdsTabsAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    barWidth(value: Length): HdsTabsAttribute;
    /**
     * Called when the height of the bar graph is set.
     *
     * @param { Length } value - Height of the tab bar.
     * @returns { HdsTabsAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    barHeight(value: Length): HdsTabsAttribute;
    /**
     * Called when the animation duration of the bar graph is set.
     *
     * @param { number } value - The length of time required to complete the tab switching animation.
     * @returns { HdsTabsAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    animationDuration(value: number): HdsTabsAttribute;
    /**
     * Called when the tab is switched.
     *
     * @param { Callback<number> } event - Indicates the index that is displayed. The index starts from 0.
     * @returns { HdsTabsAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    onChange(event: Callback<number>): HdsTabsAttribute;
    /**
     * Called when the tab content flip animation start.
     *
     * @param { OnTabsAnimationStartCallback } handler - Callback triggered at the start of the switchover animation.
     * @returns { HdsTabsAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    onAnimationStart(handler: OnTabsAnimationStartCallback): HdsTabsAttribute;
    /**
     * Set the divider between tab bar and tab content.
     *
     * @param { Optional<HdsDividerStyle> } value - indicates the style of the indicator.
     * @returns { HdsTabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    divider(value: Optional<HdsDividerStyle>): HdsTabsAttribute;
    /**
     * Set whether the tab bar overlaps with the tab content.
     *
     * @param { boolean } value - indicates whether the tab bar overlaps with the tab content.
     * @returns { HdsTabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    barOverlap(value: boolean): HdsTabsAttribute;
    /**
     * Set the background color of the tab bar.
     *
     * @param { ResourceColor } value - indicates the background color of the tab bar.
     * @returns { HdsTabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    barBackgroundColor(value: ResourceColor): HdsTabsAttribute;
    /**
     * Set the BackgroundEffect of the tab bar.
     *
     * @param { BackgroundEffectOptions } options - options indicate the options for the tab bar
     * @returns { HdsTabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    barBackgroundEffect(options: BackgroundEffectOptions): HdsTabsAttribute;
    /**
     * Sets the blur style of the tab bar.
     *
     * @param { BlurStyle } style - Blur style of the tab bar.
     * @param { BackgroundBlurStyleOptions } [options] - Tab bar attributes.
     * @returns { HdsTabsAttribute } Attributes of the tabs.
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    barBackgroundBlurStyle(style: BlurStyle, options?: BackgroundBlurStyleOptions): HdsTabsAttribute;
    /**
     * Defines the background style of HdsTabs.
     *
     * @param { Optional<HdsTabsBackgroundStyle> } backgroundStyle - The background style of HdsTabs
     * @returns { HdsTabsAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    barBackgroundStyle(backgroundStyle: Optional<HdsTabsBackgroundStyle>): HdsTabsAttribute;
    /**
     * Triggered when a new page is about to be displayed.
     *
     * @param { OnTabsContentWillChangeCallback } handler - "currentIndex": the index value of the current tab.
     *     "comingIndex": the index value of the tab that will change.
     *     Tabs can change from currentIndex to comingIndex if function return true.
     *     Tabs can not change from currentIndex to comingIndex if function return false.
     * @returns { HdsTabsAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    onContentWillChange(handler: OnTabsContentWillChangeCallback): HdsTabsAttribute;
    /**
     * Triggered when a tab is clicked.
     *
     * @param { Callback<number> } event - Indicates the index that is clicked. The index starts from 0.
     * @returns { HdsTabsAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    onTabBarClick(event: Callback<number>): HdsTabsAttribute;
    /**
     * Sets the blur effective strategy for HdsTabs.
     *
     * @param { BlurStrategy } value - The blur effective strategy for HdsTabs.
     * @returns { HdsTabsAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    blurStrategy(value: BlurStrategy): HdsTabsAttribute;
}
export { HdsTabsAttribute };
/**
 * Defines the Divider mode.
 *
 * @enum { number } DividerMode
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare enum DividerMode {
    /**
     * The divider is always visible.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    VISIBLE = 0,
    /**
     * The divider is NONE.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    NONE = 1,
    /**
     * The opacity of the divider follows the scroll.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    FOLLOW_SCROLL = 2
}
/**
 * Provides methods for switching tabs.
 *
 * @extends TabsController
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare class HdsTabsController extends TabsController {
    /**
     * Called to bind the scroller with the tab.
     *
     * @param { number } value - The index of the TabBar.
     * @param { Scroller } scroller - The scroller want to bind to the index tabBar.
     * @param { Scroller } [parentScroller] - The parent scroller want to bind to the index tabBar.
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    bindScroller(value: number, scroller: Scroller, parentScroller?: Scroller): void;
    /**
     * Called to unbind the scroller with the tab.
     *
     * @param { Scroller } scroller - The scroller which you want to unbind from a tab.
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    unbindScroller(scroller: Scroller): void;
}
/**
 * Options used to create HdsTabs.
 *
 * @extends TabsOptions
 * @typedef HdsTabsOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
declare interface HdsTabsOptions extends TabsOptions {
    /**
     * Set the Tabs controller.
     *
     * @type { ?HdsTabsController }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    controller?: HdsTabsController;
}
/**
 * Declare the graphic format of the bar chart.
 *
 * @typedef { ExtendBarMode | BarMode }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare type HdsBarMode = ExtendBarMode | BarMode;
/**
 * Declare the extend graphic format of the bar chart.
 *
 * @enum { number }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare enum ExtendBarMode {
    /**
     * TabBar items half screen center alignment layout.
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    HALF_SCREEN_FIXED = 100
}
/**
 * Defines HDS Tabs Component instance.
 *
 * @type { HdsTabsAttribute }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare const HdsTabsInstance: HdsTabsAttribute;
/**
 * Provides an interface for HDS Tabs component.
 *
 * @typedef { function } HdsTabsInterface
 * @param { HdsTabsOptions } [options] - Hds Tabs options.
 * @returns { HdsTabsAttribute }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
declare type HdsTabsInterface = (options?: HdsTabsOptions) => HdsTabsAttribute;
/**
 * Defines the MultiWindowEntryInAPP icon options.
 *
 * @interface MultiWindowEntryInAPPIconOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare interface MultiWindowEntryInAPPIconOptions {
    /**
     * Set MultiWindowEntryInAPP icon color, default is $r('sys.color.font_primary').
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    iconColor?: ResourceColor;
    /**
     * Set MultiWindowEntryInAPP icon weight, default is 400.
     *
     * @type { ?(number | FontWeight | string) }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    iconWeight?: number | FontWeight | string;
    /**
     * Set MultiWindowEntryInAPP icon size, default is 24*24 vp.
     *
     * @type { ?(number | string | Resource) }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    iconSize?: number | string | Resource;
    /**
     * Set MultiWindowEntryInAPP background color, default is $r('sys.color.comp_background_tertiary').
     * @type { ?ResourceColor }
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    backgroundColor?: ResourceColor;
}
/**
 * Defines the MultiWindowEntryInAPP subtitle options.
 *
 * @interface MultiWindowEntryInAPPSubtitleOptions
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare interface MultiWindowEntryInAPPSubtitleOptions {
    /**
     * Set the text modifier.
     *
     * @type { ?TextModifier }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    modifier?: TextModifier;
}
/**
 * Defines MultiWindowEntryInAPP style.
 *
 * @interface MultiWindowEntryInAPPStyle
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare interface MultiWindowEntryInAPPStyle {
    /**
     * Sets the icon attribute of the MultiWindowEntryInAPP component.
     *
     * @type { ?MultiWindowEntryInAPPIconOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    iconOptions?: MultiWindowEntryInAPPIconOptions;
    /**
     * Sets the subtitle attribute of the MultiWindowEntryInAPP component.
     *
     * @type { ?MultiWindowEntryInAPPSubtitleOptions }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    subtitleOptions?: MultiWindowEntryInAPPSubtitleOptions;
}
/**
 * Defines the MultiWindowEntryInAPP component attribute functions.
 *
 * @extends CommonMethod<MultiWindowEntryInAPPAttribute>
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare class MultiWindowEntryInAPPAttribute extends CommonMethod<MultiWindowEntryInAPPAttribute> {
}
/**
 * Defines MultiWindowEntryInAPP params.
 *
 * @interface MultiWindowEntryInAPPParams
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare interface MultiWindowEntryInAPPParams {
    /**
      * Configure the Want for multi-window ability display with the following requirements:
      *  1. Mandatory fields: abilityName, moduleName, and bundleName must all be specified
      *  2. Application restriction: All specified names (abilityName/moduleName/bundleName) must belong to
      *     the current application
      *  3. Cross-application limitation: Multi-window does not support abilities from other applications
      *
      * @type { Want }
      * @syscap SystemCapability.UIDesign.HDSComponent.Core
      * @since 6.0.0(20)
      */
    want: Want;
    /**
     * Indicates whether to show subtitle.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    isShowSubtitle?: boolean;
    /**
     * Sets the style of the MultiWindowEntryInAPP.
     *
     * @type { ?MultiWindowEntryInAPPStyle }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    multiWindowEntryInAPPStyle?: MultiWindowEntryInAPPStyle;
}
/**
 * Defines the MultiWindowEntryInAPP component interface
 * @typedef { function } MultiWindowEntryInAPPInterface
 * @param { params } MultiWindowEntryInAPP params.
 * @returns { MultiWindowEntryInAPPAttribute }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @uicomponent
 * @since 6.0.0(20)
 */
export declare type MultiWindowEntryInAPPInterface = (params: MultiWindowEntryInAPPParams) => MultiWindowEntryInAPPAttribute;
/**
 * Defines MultiWindowEntryInAPP Component.
 *
 * @type { MultiWindowEntryInAPPInterface }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @uicomponent
 * @since 6.0.0(20)
 */
export declare const MultiWindowEntryInAPP: MultiWindowEntryInAPPInterface;
/**
 * Defines MultiWindowEntryInAPP Component instance.
 *
 * @type { MultiWindowEntryInAPPAttribute}
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @uicomponent
 * @since 6.0.0(20)
 */
declare const MultiWindowEntryInAPPInstance: MultiWindowEntryInAPPAttribute;
