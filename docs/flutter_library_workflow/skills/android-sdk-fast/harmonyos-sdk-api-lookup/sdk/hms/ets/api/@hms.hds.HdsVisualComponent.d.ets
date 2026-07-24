/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Defines the capabilities of HDS Visual Component
 * @kit UIDesignKit
 */
import { hdsEffect } from '@hms.hds.hdsBaseComponent';
/**
 * Declare scene types for harmony OS visual effect
 *
 * @enum { number }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare enum HdsSceneType {
    /**
     * The scenario for dual edge flow light with background mask
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    DUAL_EDGE_FLOW_LIGHT_WITH_BACKGROUND_MASK = 0
}
/**
 * function for scene animation finish call back;
 *
 * @typedef { function } HdsSceneFinishCallback
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
declare type HdsSceneFinishCallback = () => void;
/**
 * rovides the definition of DualEdgeFlowLightWithMaskParam.
 *
 * @typedef DualEdgeFlowLightWithMaskParam
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare interface DualEdgeFlowLightWithMaskParam {
    /**
     * Indicates backgroundMask Colors.
     *
     * @type { Array<ResourceColor> }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    backgroundMaskColors: Array<ResourceColor>;
    /**
     * Indicates firstEdgeFlowLight Param.
     *
     * @type { hdsEffect.EdgeFlowLightParam }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    firstEdgeFlowLight: hdsEffect.EdgeFlowLightParam;
    /**
     * Indicates secondEdgeFlowLight Param.
     *
     * @type { hdsEffect.EdgeFlowLightParam }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    secondEdgeFlowLight: hdsEffect.EdgeFlowLightParam;
}
/**
 * Scene Params for SceneType
 *
 * @typedef { DualEdgeFlowLightWithMaskParam } SceneParams
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
declare type SceneParams = DualEdgeFlowLightWithMaskParam;
/**
 * Defines the scene controller
 *
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export class HdsSceneController {
    /**
     * constructor
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    constructor();
    /**
     * start the scene animation
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    start(): void;
    /**
     * pause the scene animation
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    pause(): void;
    /**
     * resume the scene animation
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    resume(): void;
    /**
     * stop the scene animation
     *
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    stop(): void;
    /**
     * set the scene Parameters
     *
     * @param { SceneParams } params - the input parameter for this scene
     * @returns { HdsSceneController } The HdsSceneController
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    setSceneParams(params: SceneParams): HdsSceneController;
}
/**
 * Defines the hds visual component attribute functions
 *
 * @extends CommonMethod<HdsVisualComponentAttribute>
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare class HdsVisualComponentAttribute extends CommonMethod<HdsVisualComponentAttribute> {
    /**
     * Called to set the scenes with related parameters, all effect will run parallel in this mode
     *
     * @param { HdsSceneType } sceneType - set the scene type
     * @param { HdsSceneController } controller - scene controller
     * @param { HdsSceneFinishCallback} [callback] - callback when scene finished
     * @param { hdsEffect.ExpectedFrameRateRange} [frameRateRange] - expected FrameRateRange
     * @returns { HdsVisualComponentAttribute }
     * @syscap SystemCapability.UIDesign.HDSComponent.Core
     * @since 6.0.0(20)
     */
    scene(sceneType: HdsSceneType, controller: HdsSceneController, callback?: HdsSceneFinishCallback, frameRateRange?: hdsEffect.ExpectedFrameRateRange): HdsVisualComponentAttribute;
}
/**
 * Defines the Hds Visual Component interface
 *
 * @typedef { function } HdsVisualComponentInterface
 * @returns { HdsVisualComponentAttribute } Returns the instance of the HdsVisualComponentAttribute.
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
declare type HdsVisualComponentInterface = () => HdsVisualComponentAttribute;
/**
 * Defines hds visual component
 *
 * @type { HdsVisualComponentInterface }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @uicomponent
 * @since 6.0.0(20)
 */
export declare const HdsVisualComponent: HdsVisualComponentInterface;
/**
 * Defines hds visual component instance
 *
 * @type { HdsVisualComponentAttribute }
 * @syscap SystemCapability.UIDesign.HDSComponent.Core
 * @since 6.0.0(20)
 */
export declare const HdsVisualComponentInstance: HdsVisualComponentAttribute;
