/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025. All rights reserved.
 */

/**
* @file This module provides the capability of netBoost.
* @kit NetworkBoostKit
*/

import netQuality from '@hms.networkboost.netquality';
/**
 * Provides Network Boost APIs.
 * @namespace netBoost
 * @syscap SystemCapability.Communication.NetworkBoost.Core
 * @since 6.0.0(20)
 */
declare namespace netBoost {
    /**
     * Set service scene description.
     *
     * @permission ohos.permission.INTERNET
     * @param { SceneDesc } sceneDesc - SceneDesc to be set.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 1013600001 - Internal error.
     * @throws { BusinessError } 1013600002 - System service error.
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    function setSceneDesc(sceneDesc: SceneDesc): void;
    /**
     * Scene description.
     * @typedef SceneDesc
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    interface SceneDesc {
        /**
         * Scene.
         * @type { netQuality.ServiceType }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        scene: netQuality.ServiceType;
        /**
         * Scene event.
         * @type { SceneEvent }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        sceneEvent: SceneEvent;
        /**
         * StartTime is the time point at which the scene event begins, unit: ms.
         * When StartTime is zero, it indicates that it can happen immediately, and if it is greater than zero, it means
         * it will happen in the future.
         * @type { ?number }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        startTime?: number;
        /**
         * Duration is the duration of the scene, unit: ms.
         * If the duration of the scene is unknown, the duration can be set to zero.
         * @type { ?number }
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        duration?: number;
    }
    /**
     * Scene event.
     * @enum { number }
     * @syscap SystemCapability.Communication.NetworkBoost.Core
     * @since 6.0.0(20)
     */
    enum SceneEvent {
        /**
         * Enter scene event.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        SCENE_EVENT_ENTER = 0,
        /**
         * Update event after entering the scene.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        SCENE_EVENT_UPDATE = 1,
        /**
         * Leave scene event.
         * @syscap SystemCapability.Communication.NetworkBoost.Core
         * @since 6.0.0(20)
         */
        SCENE_EVENT_LEAVE = 2
    }
}
export default netBoost;
