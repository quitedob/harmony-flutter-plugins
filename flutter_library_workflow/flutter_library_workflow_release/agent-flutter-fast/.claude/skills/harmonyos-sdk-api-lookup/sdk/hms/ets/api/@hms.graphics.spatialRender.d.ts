/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file This module provides the capability related to spatial rendering.
 * @kit SpatialReconKit
 */
import { Effect, Scene, Color, Node } from '@ohos.graphics.scene';
/**
 * Provides methods to rendering 3DGS(3D Gaussian Splatting) resources.
 *
 * @namespace spatialRender
 * @syscap SystemCapability.Graphics.SpatialRender
 * @since 6.0.1(21)
 */
declare namespace spatialRender {
    /**
     * 3D gaussian model import paramters.
     *
     * @interface GSImportSettings
     * @syscap SystemCapability.Graphics.SpatialRender
     * @since 6.0.1(21)
     */
    export interface GSImportSettings {
        /**
         * File uri to import the model from.
         *
         * @type { string }
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        uri: string;
        /**
         * Optional byte offset for data in the file.
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        offset?: number;
    }
    /**
     * A Scene node containing gaussian 3D model.
     * The type of the node shall be NodeType.CUSTOM.
     *
     * @extends Node
     * @interface GSNode
     * @syscap SystemCapability.Graphics.SpatialRender
     * @since 6.0.1(21)
     */
    export interface GSNode extends Node {
    }
    /**
     * Gaussian splatting plugin definition.
     *
     * @interface GSPlugin
     * @syscap SystemCapability.Graphics.SpatialRender
     * @since 6.0.1(21)
     */
    export class GSPlugin {
        /**
         * Id of the 3D gaussian plugin.
         * Call scene3d.Scene.loadPlugin(GSPlugin.PLUGIN_ID) to load the plugin before use.
         *
         * @type { string }
         * @readonly
         * @static
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        static readonly PLUGIN_ID: string;
        /**
         * Id of the retro effect. GSPlugin.PLUGIN_ID must be loaded before use.
         *
         * The id should be given as the id property of EffectParameters
         * given to SceneResourceFactory.createEffect() to create a new effect instance.
         *
         * @type { string }
         * @readonly
         * @static
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        static readonly RETRO_EFFECT_ID: string;
        /**
         * Id of the comic effect. GSPlugin.PLUGIN_ID must be loaded before use.
         *
         * The id should be given as the id property of EffectParameters
         * given to SceneResourceFactory.createEffect() to create a new effect instance.
         *
         * @type { string }
         * @readonly
         * @static
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        static readonly COMIC_EFFECT_ID: string;
        /**
         * Id of the obra-dinn effect. GSPlugin.PLUGIN_ID must be loaded before use.
         *
         * The id should be given as the id property of EffectParameters
         * given to SceneResourceFactory.createEffect() to create a new effect instance.
         *
         * @type { string }
         * @readonly
         * @static
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        static readonly OBRA_DINN_EFFECT_ID: string;
        /**
         * Id of the color editing effect. GSPlugin.PLUGIN_ID must be loaded before use.
         *
         * The id should be given as the id property of EffectParameters
         * given to SceneResourceFactory.createEffect() to create a new effect instance.
         *
         * @type { string }
         * @readonly
         * @static
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        static readonly COLOR_EDITING_EFFECT_ID: string;
        /**
         * Load a gaussian 3D model from a file.
         * The returned node can be imported into an existing scene.
         *
         * @param { Scene } scene - The Scene to load the gaussian 3D model into.
         * @param { GSImportSettings } params - The the gaussian information (e.g., uri).
         * @param { Node } [parent] - Optional parent node for the imported node.
         *     If null or undefined, place the new node under scene root.
         * @returns { Promise<GSNode> } promise a node.
         * @static
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        static loadGSNode(scene: Scene, params: GSImportSettings, parent?: Node): Promise<GSNode>;
    }
    /**
     * Retro effect settings. Effects created using GSPlugin.RETRO_EFFECT_ID implement this interface.
     *
     * @extends Effect
     * @interface RetroEffect
     * @syscap SystemCapability.Graphics.SpatialRender
     * @since 6.0.1(21)
     */
    export interface RetroEffect extends Effect {
        /**
         * color number parameters for RetroEffect
         *
         * @type { number }
         * @default 8
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        colorNum: number;
        /**
         * pixel size  parameters for RetroEffect
         *
         * @type { number }
         * @default 4
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        pixelSize: number;
        /**
         * blending parameters for RetroEffect
         *
         * @type { boolean }
         * @default true
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        blendEnabled: boolean;
        /**
         * curve parameters for RetroEffect
         *
         * @type { number }
         * @default 0.25
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        curve: number;
    }
    /**
     * Comic effect settings. Effects created using GSPlugin.COMIC_EFFECT_ID implement this interface.
     *
     * @extends Effect
     * @interface ComicEffect
     * @syscap SystemCapability.Graphics.SpatialRender
     * @since 6.0.1(21)
     */
    export interface ComicEffect extends Effect {
        /**
         * line threshold parameters for ComicEffect
         *
         * @type { number }
         * @default 0.2
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        lineThreshold: number;
        /**
         * line color parameters for ComicEffect
         *
         * @type { Color }
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        lineColor: Color;
    }
    /**
     * Obra-Dinn effect settings. Effects created using GSPlugin.OBRA_DINN_EFFECT_ID implement this interface.
     *
     * @extends Effect
     * @interface ObraDinnEffect
     * @syscap SystemCapability.Graphics.SpatialRender
     * @since 6.0.1(21)
     */
    export interface ObraDinnEffect extends Effect {
        /**
         * noise strength parameters for ObraDinnEffect
         *
         * @type { number }
         * @default 0.3
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        noiseStrength: number;
        /**
         * threshold parameters for ObraDinnEffect
         *
         * @type { number }
         * @default 0.4
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        threshold: number;
        /**
         * foreground color parameters for ObraDinnEffect
         *
         * @type { Color }
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        foregroundColor: Color;
        /**
         * background color parameters for ObraDinnEffect
         *
         * @type { Color }
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        backgroundColor: Color;
    }
    /**
     * Color editing effect settings. Effects created using GSPlugin.COLOR_EDITING_EFFECT_ID implement this interface.
     *
     * @extends Effect
     * @interface ColorEditingEffect
     * @syscap SystemCapability.Graphics.SpatialRender
     * @since 6.0.1(21)
     */
    export interface ColorEditingEffect extends Effect {
        /**
         * exposure parameters for ColorEditingEffect
         *
         * @type { number }
         * @default 0.0
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        exposure: number;
        /**
         * contrast parameters for ColorEditingEffect
         *
         * @type { number }
         * @default 1.0
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        contrast: number;
        /**
         * temperature parameters for ColorEditingEffect
         *
         * @type { number }
         * @default 0.0
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        temperature: number;
        /**
         * tint parameters for ColorEditingEffect
         *
         * @type { number }
         * @default 0.0
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        tint: number;
        /**
         * saturation parameters for ColorEditingEffect
         *
         * @type { number }
         * @default 1.0
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        saturation: number;
        /**
         * vibrance parameters for ColorEditingEffect
         *
         * @type { number }
         * @default 0.0
         * @syscap SystemCapability.Graphics.SpatialRender
         * @since 6.0.1(21)
         */
        vibrance: number;
    }
}
export default spatialRender;
