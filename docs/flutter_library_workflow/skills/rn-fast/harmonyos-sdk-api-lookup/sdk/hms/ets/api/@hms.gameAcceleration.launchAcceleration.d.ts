/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file
 * @kit GraphicsAccelerateKit
 */
/**
 * The module provider launch acceleration capability.
 *
 * @namespace launchAcceleration
 * @syscap SystemCapability.GraphicsGame.LaunchAcceleration
 * @stagemodelonly
 * @since 6.0.0(20)
 */
declare namespace launchAcceleration {
    /**
     * Checks whether the launch mirror feature is enabled.
     *
     * @returns { boolean } Returns `true` if the launch mirror is enabled; otherwise, returns `false`.
     * @syscap SystemCapability.GraphicsGame.LaunchAcceleration
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function isLaunchMirrorEnabled(): boolean;
}
export default launchAcceleration;
