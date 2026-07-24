/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2025. All rights reserved.
 */
/**
 * @file declarations of ARView ArkUI component and related API.
 * @kit AREngine
 */
import { Scene, Node } from '@ohos.graphics.scene';
import arEngine from '@hms.core.ar.arengine';
/**
 * API declarations of ARView Component.
 * @namespace arViewController
 * @syscap SystemCapability.AREngine.Core
 * @since 5.1.0(18)
 */
export declare namespace arViewController {
    /**
     * ARView context for state management.
     *
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    class ARViewContext {
        /**
         * Initialize the ARView context, setup AR session for camera tracking and scene for rendering.
         *
         * @permission ohos.permission.CAMERA and ohos.permission.GYROSCOPE and ohos.permission.ACCELEROMETER
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permissions not granted, such as the camera permission.
         * @throws { BusinessError } 801 - Device not compatible.
         * @throws { BusinessError } 1009200001 - Failure.
         * @throws { BusinessError } 1009200007 - Configuration not supported.
         * @throws { BusinessError } 1009200008 - Resource exhausted.
         * @throws { BusinessError } 1009200009 - Service unavailable.
         * @throws { BusinessError } 1009200010 - Camera unavailable.
         * @throws { BusinessError } 1009200201 - ARView invalid operation.
         * @throws { BusinessError } 1009200202 - Graphics3D AR scene required.
         * @throws { BusinessError } 1009200203 - AREngine config required.
         * @throws { BusinessError } 1009200204 - AR session setup failed.
         * @throws { BusinessError } 1009200205 - AR scene camera setup failed.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        init(): Promise<void>;
        /**
         * Pause camera tracking and scene rendering.
         *
         * @throws { BusinessError } 1009200001 - Failure.
         * @throws { BusinessError } 1009200201 - ARView invalid operation.
         * @throws { BusinessError } 1009200204 - AR session setup failed.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        pause(): void;
        /**
         * Destroy ARView context, this operation will destroy AR session and scene.
         *
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @throws { BusinessError } 1009200201 - ARView invalid operation.
         * @throws { BusinessError } 1009200204 - AR session setup failed.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        destroy(): Promise<void>;
        /**
         * Resume ARView context from pause state.
         *
         * @throws { BusinessError } 1009200001 - Failure.
         * @throws { BusinessError } 1009200010 - Camera unavailable.
         * @throws { BusinessError } 1009200201 - ARView invalid operation.
         * @throws { BusinessError } 1009200204 - AR session setup failed.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        resume(): void;
        /**
         * Get the current AR session.
         *
         * @returns { arEngine.ARSession | undefined } ARSession instance if AR session setup successfully,
         * otherwise return undefined.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        get session(): arEngine.ARSession | undefined;
        /**
         * Indicating AR session configuration before setup AR session.
         *
         * @param { arEngine.ARConfig } conf - Config object is used to configure the AR session.
         * @throws { BusinessError } 1009200201 - ARView invalid operation.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        set config(conf: arEngine.ARConfig);
        /**
         * Register ARView callbacks.
         *
         * @param { ARViewCallback } callback - Callback object is used to rewrite the callback method class.
         * @throws { BusinessError } 1009200201 - ARView invalid operation.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        set callback(callback: ARViewCallback);
        /**
         * Set AR scene for ARView.
         *
         * @param { Scene } scene - Scene object is used to manage AR scene.
         * @throws { BusinessError } 1009200201 - ARView invalid operation.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        set scene(scene: Scene);
        /**
         * Get the current AR scene for operating the AR content.
         *
         * @returns { Scene } Scene object for manage AR scene.
         * @throws { BusinessError } 1009200201 - ARView invalid operation.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        get scene(): Scene;
    }
    /**
     * Abstract class of ARView Callback, declare callback interfaces of ARView.
     *
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    abstract class ARViewCallback {
        /**
         * trigger the callback before AR scene frame updating.
         *
         * @param { ARViewContext } ctx - The current AR context.
         * @param { number } sysBootTs - The current system timestamp, in nanosecond.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        abstract onFrameUpdate(ctx: ARViewContext, sysBootTs: number): void;
        /**
         * According the AR session configuration, trigger the callback when plane was detected automatically.
         *
         * @param { ARViewContext } ctx - The current AR context.
         * @param { Node } node - AR scene node for rendering, based on AR anchor created by ARView.
         * @param { arEngine.ARAnchor } anchor - The anchor created by ARView for the newly detected plane.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        abstract onAnchorAdd(ctx: ARViewContext, node: Node, anchor: arEngine.ARAnchor): void;
        /**
         * Trigger the callback after an anchor attribute updated.
         *
         * @param { ARViewContext } ctx - The current AR context.
         * @param { Node } node - AR scene node for rendering, based on AR anchor created by ARView.
         * @param { arEngine.ARAnchor } anchor - The anchor which attribute updated.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        abstract onAnchorUpdate(ctx: ARViewContext, node: Node, anchor: arEngine.ARAnchor): void;
    }
}
/**
 * Declaration of ARView ArkUI Component.
 *
 * @struct { ARView }
 * @syscap SystemCapability.AREngine.Core
 * @since 5.1.0(18)
 */
@Component
export declare struct ARView {
    /**
     * ARView context, state management of AR session and scene.
     *
     * @type { arViewController.ARViewContext }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    @Require
    @State
    context: arViewController.ARViewContext;
    /**
     * Build ARView UI.
     *
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    build(): void;
}
