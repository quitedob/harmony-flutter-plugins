/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2025. All rights reserved.
 */
/**
 * @file Provides the ability to integrate augmented reality and virtual reality.
 * @kit AREngine
 */
import { Matrix4 } from '@ohos.arkui.node';
import { Vec3, Quaternion } from '@ohos.graphics.scene';
import image from '@ohos.multimedia.image';
/**
 * Core data object of AREngine.
 *
 * @namespace arEngine
 * @syscap SystemCapability.AREngine.Core
 * @since 5.1.0(18)
 */
/**
 * Core data object of AREngine.
 *
 * @namespace arEngine
 * @syscap SystemCapability.AREngine.Core
 * @since 6.0.0(20)
 */
declare namespace arEngine {
    /**
     * Semantic Dense Mode.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 6.0.0(20)
     */
    enum ARSemanticDenseMode {
        /**
         * The semantic dense mode is disabled.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        DISABLED = 0,
        /**
         * The normal mode only contains the dense point cloud.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        NORMAL = 1,
        /**
         * A mode used to measure the volume of an object.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        CUBE_VOLUME = 2,
        /**
         * A mode used to measure the volume of space.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        CUBE_SPACE = 3
    }
    /**
     * Possible causes of adding image failures.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARAddAugmentedImageReason {
        /**
         * NONE type.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        NONE = 0,
        /**
         * Attempted to add an image with insufficient quality (size not match) to the image database.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        SIZE_NOT_MATCH = 1,
        /**
         * Attempted to add an image with insufficient quality (too bright or too dark) to the image database.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        LIGHT_ANOMALY = 2,
        /**
         * Attempted to add an image with insufficient quality (image color is relatively single) to the image database.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        FEATURE_LIMIT = 3,
        /**
         * Attempted to add an image with insufficient quality (other scenarios) to the image database.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        OTHER = 4
    }
    /**
     * It's represent by number[].
     *
     * @typedef { [
    number,
    number,
    number,
    number,
    number
] } Distortion
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    type Distortion = [
        number,
        number,
        number,
        number,
        number
    ];
    /**
     * Semantic type of the current plane.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARSemanticPlaneLabel {
        /**
         * Unknown type.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        UNKNOWN = 0,
        /**
         * Wall.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        WALL = 1,
        /**
         * Floor.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        FLOOR = 2,
        /**
         * Seat.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        SEAT = 3,
        /**
         * Table.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        TABLE = 4,
        /**
         * Ceiling.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        CEILING = 5,
        /**
         * Door.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        DOOR = 6,
        /**
         * Window.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        WINDOW = 7,
        /**
         * Bed.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        BED = 8,
        /**
         * PLANE_SPACE
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        PLANE_SPACE = 9,
        /**
         * CUBE_VOLUME
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        CUBE_VOLUME = 10,
        /**
         * CUBE_SPACE
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        CUBE_SPACE = 11
    }
    /**
     * AR capability type.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARType {
        /**
         * Environment tracking capability.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        WORLD = 0x01,
        /**
         * Image tracking capability.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        IMAGE = 0x80
    }
    /**
     * Plane finding mode.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARPlaneFindingMode {
        /**
         * Plane finding is disabled.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        DISABLED = 0,
        /**
         * Only horizontal planes are detected.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        HORIZONTAL = 1,
        /**
         * Only vertical planes are detected.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        VERTICAL = 2,
        /**
         * Both horizontal and vertical planes are detected.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        HORIZONTAL_AND_VERTICAL = 3
    }
    /**
     * Semantic mode.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARSemanticMode {
        /**
         * Semantics not used.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        NONE = 0,
        /**
         * Uses plane semantics.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        PLANE = 1
    }
    /**
     * Focus mode.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARFocusMode {
        /**
         * Focus fixed to infinity.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        FIXED = 0,
        /**
         * Auto focus.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        AUTO = 1
    }
    /**
     * Pose type.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARPoseType {
        /**
         * Default pose.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        IDENTITY = 0,
        /**
         * Pose that performs a 90-degree rotation.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        ROTATE_90 = 1,
        /**
         * Pose that performs a 180-degree rotation.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        ROTATE_180 = 2,
        /**
         * Pose that performs a 270-degree rotation.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        ROTATE_270 = 3
    }
    /**
     * Plane type.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARPlaneType {
        /**
         * A horizontal plane facing up (such as the ground and desk platform).
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        FACING_HORIZONTAL_UPWARD = 0,
        /**
         * A horizontal plane facing down (such as the ground and desk platform).
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        FACING_HORIZONTAL_DOWNWARD = 1,
        /**
         * A vertical plane.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        FACING_VERTICAL = 2,
        /**
         * Unsupported type.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        FACING_INVALID = 3
    }
    /**
     * Image format.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARImageFormat {
        /**
         * Unknown image format
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        UNKNOWN = 0,
        /**
         * <p>The <b>YUV_420_888</b> format consists of three data buffers, with the Y plane indexed as 0,
         * the U plane indexed as 1, and the V plane indexed as 2. The Y plane does not intersect with the U/V plane.
         * That is, the pixel stride of the Y plane is always 1. The U and V planes share the same row stride and
         * pixel stride.</p>
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        YUV_420_888 = 2,
        /**
         * <p>The <b>Y_8</b> format consists of one data buffer, with the plane indexed as 0.
         * The data buffer type is an 8-bit unsigned integer.</p>
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        Y_8 = 3,
        /**
         * <p>The <b>Y_16</b> format consists of one data buffer, with the plane indexed as 0.
         * The data buffer type is a 16-bit unsigned integer.</p>
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        Y_16 = 4
    }
    /**
     * Depth Mode.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARDepthMode {
        /**
         * Does not provide depth information.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        DISABLED = 0,
        /**
         * <p>There are two depth sources, one from the motion algorithm and one from the hardware depth sensor (TOF).
         * Currently, only the depth from the motion used by master RGB camera is supported.</p>
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        AUTOMATIC = 1
    }
    /**
     * Type of a trackable object, such as a plane or a point.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARTrackableType {
        /**
         * Basic trackable object type, which can be used as the default <b>ARTrackableType</b>.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        BASE = 0x41520100,
        /**
         * Trackable object of the plane type.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        PLANE = 0x41520101,
        /**
         * Trackable object of the point type.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        POINT = 0x41520102,
        /**
         * Trackable object of the augmented image type.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        AUGMENTED_IMAGE = 0x41520104,
        /**
         * Invalid trackable object type.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        INVALID = 0
    }
    /**
     * Enumerates options on how to add pictures.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARAddAugmentedImageMode {
        /**
         * An error is reported when the number of images exceeds the maximum.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        NORMAL = 0,
        /**
         * Add images in update mode. After the maximum number of images is reached, delete the original data.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        UPDATE = 1
    }
    /**
     * Mesh mode.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARMeshMode {
        /**
         * Mesh mode is closed.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        DISABLED = 0,
        /**
         * Mesh mode is open.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        ENABLE = 1
    }
    /**
     * Tracking status of the trackable object.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARTrackingState {
        /**
         * Tracking status: tracking.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        TRACKING = 0,
        /**
         * Tracking status: paused.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        PAUSED = 1,
        /**
         * Tracking status: stopped.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        STOPPED = 2
    }
    /**
     * Possible causes of tracking failures.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARTrackingStateReason {
        /**
         * Tracking failure cause: none.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        NONE = 0,
        /**
         * Tracking failure cause: targets moving fast.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        EXCESSIVE_MOTION = 1,
        /**
         * Tracking failure cause: insufficient visual features (such as weak texture).
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        INSUFFICIENT_FEATURES = 2
    }
    /**
     * Power consumption mode.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARPowerMode {
        /**
         * Normal mode.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        NORMAL = 0,
        /**
         * Power saving mode.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        POWER_SAVING = 1,
        /**
         * Performance-preferred mode.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        PERFORMANCE_FIRST = 2,
        /**
         * Outputs the device pose information only.
         * The power consumption in this mode is lower than that in <b>NORMAL</b> mode.
         * In this mode, plane-related settings, such as <b>planeFindingMode</b>, do not take
         * effect.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        BOOST = 3,
        /**
         * Ultra power saving mode.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        ULTRA_POWER_SAVING = 11
    }
    /**
     * Orientation mode.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARPointOrientationMode {
        /**
         * The orientation is consistent with that of the world coordinate system, but with minor adjustments.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        INITIALIZED_TO_IDENTITY = 0,
        /**
         * The orientation is determined by the estimated plane's normal vector.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        ESTIMATED_SURFACE_NORMAL = 1
    }
    /**
     * Enumerates options on how to create a world coordinate system.
     *
     * @enum { number }
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    enum ARPoseMode {
        /**
         * The Y axis of the world coordinate system is perpendicular to gravity, and the origin is at the original
         * position of the device.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        GRAVITY = 0,
        /**
         * The Y axis of the world coordinate system is perpendicular to gravity, the X and Z axes point to the compass,
         *  and the origin is the original position of the device.
         *
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        GRAVITY_AND_HEADING = 1
    }
    /**
     * Used for managing the system status of AREngine.
     *
     * @typedef ARSession
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    interface ARSession {
        /**
         * Obtains a frame of data processed by AREngine.
         *
         * @returns { ARFrame } Returns the ARFrame
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getFrame(): ARFrame;
        /**
         * Creates an anchor for continuous tracking.
         *
         * @param { ARPose } pose - Pose object used for creating an anchor.
         * @returns { ARAnchor } Created anchor object
         * @throws { BusinessError } 401 - Invalid parameters, for example, the input parameter is empty or invalid.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        createAnchor(pose: ARPose): ARAnchor;
        /**
         * <p>Instructs AREngine to stop tracking and unbinds an anchor. However, this function does not release the
         * anchor. You need to release the anchor by calling <b>release</b>.</p>
         *
         * @param { ARAnchor } anchor - Anchor object to be unbound.
         * @throws { BusinessError } 401 - Invalid parameters, for example, the input parameter is empty or invalid.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        detachAnchor(anchor: ARAnchor): void;
        /**
         * Obtains all anchors, including anchors in all states contained in <b>ARTrackingState</b>.
         *
         * @returns { Array<ARAnchor> } List of all anchor objects.
         * @throws { BusinessError } 1009200001 - Failure.
         * @throws { BusinessError } 1009200008 - Resource exhausted.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getAllAnchors(): Array<ARAnchor>;
        /**
         * Obtains the list of all trackable objects of the specified type.
         *
         * @param { ARTrackableType } type - Type of the current trackable object.
         * @returns { Array<ARTrackable> } A list of trackable objects of a specified type.
         * @throws { BusinessError } 401 - Invalid parameters, for example, the input parameter is empty or invalid.
         * @throws { BusinessError } 1009200001 - Failure.
         * @throws { BusinessError } 1009200008 - Resource exhausted.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getAllTrackables(type: ARTrackableType): Array<ARTrackable>;
        /**
         * Turn on the device flashlight.
         *
         * @returns { Promise<boolean> } The promise returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        openFlash(): Promise<boolean>;
        /**
         * Turn off the device flashlight.
         *
         * @returns { Promise<boolean> } The promise returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        closeFlash(): Promise<boolean>;
        /**
         * Releases the resources by the session.
         *
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        release(): Promise<void>;
    }
    /**
     * Indicates a frame of data processed by AREngine.
     *
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    class ARFrame {
        /**
         * Indicates the timestamp information (in nanoseconds) of the current frame.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly timestamp: number;
        /**
         * Indicates a collection of trackable 3D point clouds.
         *
         * @type { ARPointCloud }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly pointCloud: ARPointCloud;
        /**
         * Obtains the camera parameter object of the current frame.
         *
         * @returns { ARCamera } Indicates the camera information for the current frame.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getCamera(): ARCamera;
        /**
         * Obtains the updated trackable object of the specified type.
         *
         * @param { ARTrackableType } type - Type of the current trackable object.
         * @returns { Array<ARTrackable> } List of trackable objects.
         * @throws { BusinessError } 401 - Invalid parameters, for example, the input parameter is empty or invalid.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getUpdatedTrackables(type: ARTrackableType): Array<ARTrackable>;
        /**
         * <p>Casts a ray from the camera, with the direction of the ray determined by the points (pixelX, pixelY) in the
         * preview area.</p>
         * <p>The ray collides with the plane or the points in the point cloud tracked by the system (if the point cloud is
         * recognized), resulting in intersections and hit results. The intersections are sorted by their distance from the
         * device, from closest to farthest, and stored in a linked list. (pixelX, pixelY) indicate the coordinates of a pixel
         * in the preview area.</p>
         *
         * @param { number } x - X coordinate.
         * @param { number } y - Y coordinate.
         * @returns { Array<ARHitResult> } Hit result list.
         * @throws { BusinessError } 401 - Invalid parameters, for example, the input parameter is empty or invalid.
         * @throws { BusinessError } 1009200001 - Failure.
         * @throws { BusinessError } 1009200008 - Resource exhausted.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        hitTest(x: number, y: number): Array<ARHitResult>;
        /**
         * Obtains the scene mesh data of the current frame.
         *
         * @returns { ARSceneMesh } scene mesh data of the current frame.
         * @throws { BusinessError } 1009200001 - Failure.
         * @throws { BusinessError } 1009200008 - Resource exhausted.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        acquireSceneMesh(): ARSceneMesh;
        /**
         * Acquires a depth image object that corresponds to the current frame.
         * The depth image is a single 16-bit plane at index 0. Each pixel contains the distance in millimeters to the camera
         * plane, with the representable depth range between 0 millimeters and 65535 millimeters, or about 65 meters.
         *
         * @returns { ARImage } Indicates the camera video stream frame object
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        acquireDepthImage16Bits(): ARImage;
        /**
         * Obtains the depth confidence image of the current frame. The confidence value is between
         * 0 and 2, inclusive, with 0 representing the
         * lowest confidence and 2 representing the highest confidence in the measured depth value. The width and height of the
         * depth confidence image are consistent with the depth image.
         *
         * @returns { ARImage } Indicates the camera video stream frame object
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        acquireDepthConfidenceImage(): ARImage;
        /**
         * Obtains the semantic dense data of the current frame.
         * @returns { ARSemanticDenseData } Indicates the semantic dense data object
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        acquireSemanticDense(): ARSemanticDenseData;
        /**
         * Releases the resources by the frame.
         *
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        release(): Promise<void>;
    }
    /**
     * Basic structure of the semantic dense point data.
     *
     * @typedef ARSemanticDensePointData
     * @syscap SystemCapability.AREngine.Core
     * @since 6.0.0(20)
     */
    interface ARSemanticDensePointData {
        /**
         * The id array of all point.
         *
         * @type { ArrayBuffer }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        readonly id: ArrayBuffer;
        /**
         * Coordinates of all points of semantic dense point data, as well as their confidence array, in the format.
         * [x0, y0, z0, c0, x1, y1, z1, c1, x2,...].
         *
         * @type { ArrayBuffer }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        readonly position: ArrayBuffer;
        /**
         * Color of all points of semantic dense point data in rgba, in the format.
         * [r0, g0, b0, a0, r1, g1, b1, a1, r2,...].
         *
         * @type { ArrayBuffer }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        readonly color: ArrayBuffer;
    }
    /**
     * Basic structure of the semantic dense cube data.
     *
     * @typedef ARSemanticDenseCubeData
     * @syscap SystemCapability.AREngine.Core
     * @since 6.0.0(20)
     */
    interface ARSemanticDenseCubeData {
        /**
         * The id of current cube.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        readonly id: number;
        /**
         * the vertexSize of the current cube.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        readonly vertexSize: number;
        /**
         * Array of vertex coordinates of the current cube.
         *
         * @type { Array<number> }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        readonly vertexData: Array<number>;
        /**
         * the confidence of the current cube.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        readonly confidence: number;
        /**
         * the semantic label of the current cube.
         *
         * @type { ARSemanticPlaneLabel }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        readonly label: ARSemanticPlaneLabel;
    }
    /**
     * Indicates a object of semantic dense data.
     *
     * @syscap SystemCapability.AREngine.Core
     * @since 6.0.0(20)
     */
    class ARSemanticDenseData {
        /**
         * The timestamp of semantic dense data.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        readonly timestamp: number;
        /**
         * The size of point data of the semantic dense data.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        readonly pointDataSize: number;
        /**
         * The size of cube data of the semantic dense data.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        readonly cubeDataSize: number;
        /**
         * Obtaining all points data of the semantic dense data.
         *
         * @returns { ARSemanticDensePointData } The promise returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        acquirePointData(): ARSemanticDensePointData;
        /**
         * Obtaining Cube Data of the semantic dense data.
         *
         * @returns { Array<ARSemanticDenseCubeData> } Returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        acquireCubeData(): Array<ARSemanticDenseCubeData>;
        /**
         * Releases the semantic dense data of the current frame.
         *
         * @returns { Promise<void> } Returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        release(): Promise<void>;
    }
    /**
     * Indicates an anchor object, which describes the spatial location associated with a trackable object.
     *
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    class ARAnchor {
        /**
         * Index of the anchor.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly id: number;
        /**
         * Tracking status of the trackable object.
         *
         * @type { ARTrackingState }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly trackingState: ARTrackingState;
        /**
         * Obtains the pose of this anchor in the world coordinate system.
         *
         * @returns { ARPose } Indicates the pose (translation + rotation), representing an immutable rigid transformation from one
         * coordinate system to another.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getPose(): ARPose;
        /**
         * Instructs AREngine to stop tracking and unbinds an anchor. However, this function does not release the
         * anchor. You need to release the anchor by calling <b>release</b>.
         *
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        detach(): void;
        /**
         * Releases the memory used by a specific anchor object. Before releasing the memory,
         * instruct AREngine to stop tracking and unbind the anchor.
         *
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        release(): Promise<void>;
    }
    /**
     * Indicates an anchor of the plane type.
     *
     * @extends ARAnchor
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    class ARPlaneAnchor extends ARAnchor {
        /**
         * Obtains the plane of this anchor in the world coordinate system.
         *
         * @returns { ARPlane } Indicates a plane object, which describes the detected trackable plane information.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getPlane(): ARPlane;
    }
    /**
     * The camera offline intrinsics object, which can be used obtain the camera's focal length,
     * image size, principal point, and distortion parameters.
     *
     * @typedef ARCameraIntrinsics
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    interface ARCameraIntrinsics {
        /**
         * Indicates the focal length of the camera on the x axis.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly fx: number;
        /**
         * Indicates the focal length of the camera on the y axis.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly fy: number;
        /**
         * Indicates the principal point of a camera on the x axis.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly cx: number;
        /**
         * Indicates the principal point of a camera on the y axis.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly cy: number;
        /**
         * Indicates the distortion parameters of a camera.
         *
         * @type { Distortion }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly distortion: Distortion;
    }
    /**
     * Indicates the camera information for the current frame.
     *
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    class ARCamera {
        /**
         * Tracking status of the trackable object.
         *
         * @type { ARTrackingState }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly state: ARTrackingState;
        /**
         * Possible causes of tracking failures.
         *
         * @type { ARTrackingStateReason }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly stateReason: ARTrackingStateReason;
        /**
         * Obtains the view matrix of the camera in the latest frame.
         * This matrix performs the inverse transformation of the pose obtained through
         * <b>getDisplayOrientedPose</b>. That is, it transforms the world coordinate system to the camera
         * coordinate system.
         *
         * @type { Matrix4 }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly viewMatrix: Matrix4;
        /**
         * <p>Obtains the pose of the physical camera in the world space in the latest frame. The pose is that of
         * the OpenGL camera, where the positive direction of the x-axis is to the right, the positive direction of the y-axis
         * is upwards, and the negative direction of the z-axis is the look-at direction of the camera. The camera position
         * refers to the physical camera position, and the orientation of the camera's x-axis and y-axis is not affected by the
         * screen orientation (taking display rotation into account).</p>
         * The pose information can be used only when <b>TRACKING</b> is returned by <b>state</b>.
         *
         * @returns { ARPose } Pose of the physical camera in the world space.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getPose(): ARPose;
        /**
         * <p>Obtains the pose of the virtual camera (facing the display) in the world space, in order to render
         * AR content into the latest frame. The pose is that of the OpenGL camera, where the positive direction of the x-axis
         * is to the right, the positive direction of the y-axis is upwards, and the negative direction of the z-axis is the
         * look-at direction of the camera. The camera position refers to the physical camera position, and the orientation of
         * the camera's x-axis and y-axis is affected by the screen orientation (taking display rotation into account).</p>
         * The pose information can be used only when <b>TRACKING</b> is returned by <b>state</b>.
         *
         * @returns { ARPose } Pose of the virtual camera in the world space.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getDisplayOrientedPose(): ARPose;
        /**
         * Obtains the projection matrix used for rendering virtual content on top of the camera image. This matrix can
         * be used for converting from the camera coordinate system to the clip coordinate system.
         *
         * @param { number } near - Distance to the near clipping plane in OpenGL, in meters.
         * @param { number } far - Distance to the far clipping plane in OpenGL, in meters.
         * @returns { Matrix4 } Array consisting of 16 floating point numbers, indicating a column-major
         * uniform transformation matrix in OpenGL.
         * @throws { BusinessError } 401 - Invalid parameters, for example, the input parameter is empty or invalid.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getProjectionMatrix(near: number, far: number): Matrix4;
        /**
         * Obtains the object of the offline intrinsic camera parameters. This object can be used obtain the camera's
         * focal length, image size, principal point, and distortion parameters.
         *
         * @returns { ARCameraIntrinsics } Object of the intrinsic camera parameters. For details, please refer to
         * <b>ARCameraIntrinsics</b>.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getImageIntrinsics(): ARCameraIntrinsics;
    }
    /**
     * Indicates the camera video stream frame object.
     *
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    class ARImage {
        /**
         * Image format, For details, please refer to <b>ARImageFormat</b>.
         *
         * @type { ARImageFormat }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly format: ARImageFormat;
        /**
         * Image width (in pixels) of the current frame.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly width: number;
        /**
         * Image height (in pixels) of the current frame.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly height: number;
        /**
         * The timestamp of an image (in nanoseconds). Timestamps are usually monotonically increasing.
         * The specific meaning and time base of the timestamp depend on the image source. Timestamps of images from different
         * sources may have different time bases, so they should not be compared with each other.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly imageTimestamp: number;
        /**
         * List of all planes, For details, please refer to <b>ImageComponent</b>.
         *
         * @type { Array<ImageComponent> }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly planes: Array<ImageComponent>;
        /**
         * Releases the image object of the current frame.
         *
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        release(): Promise<void>;
    }
    /**
     * Basic structure of the image component.
     *
     * @typedef ImageComponent
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    interface ImageComponent {
        /**
         * The number of bytes between the start positions of two consecutive pixel lines in an image. The line
         * spacing is always greater than 0.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly rowStride: number;
        /**
         * The distance between the start points of two consecutive pixels in an image, in bytes. The pixel
         * stride is always greater than 0.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly pixelStride: number;
        /**
         * The plane data in the current frame. Convert ArrayBuffer to Int32Array to use.
         *
         * @type { ArrayBuffer }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly buffer: ArrayBuffer;
    }
    /**
     * Used for configuring <b>ARSession</b> capabilities (which capabilities and modes to use).
     *
     * @typedef ARConfig
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    interface ARConfig {
        /**
         * AR capability type. For details, please refer to <b>ARType</b>.
         *
         * @type { ARType }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        type: ARType;
        /**
         * Plane finding mode. For details, please refer to <b>ARPlaneFindingMode</b>.
         *
         * @type { ARPlaneFindingMode }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        planeFindingMode?: ARPlaneFindingMode;
        /**
         * Power mode. For details, please refer to <b>ARPowerMode</b>.
         *
         * @type { ARPowerMode }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        powerMode?: ARPowerMode;
        /**
         * Focus mode. For details, please refer to <b>ARFocusMode</b>.
         *
         * @type { ARFocusMode }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        focusMode?: ARFocusMode;
        /**
         * Semantic mode. For details, please refer to <b>ARSemanticMode</b>.
         *
         * @type { ARSemanticMode }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        semanticMode?: ARSemanticMode;
        /**
         * Maximum memory size for storing map data, in MB. The value ranges from 100 MB to 16 GB.
         * You are advised to set the memory size according to the device's memory capacity.
         * Exceeding the hardware limits may result in unexpected errors.
         *
         * @type { number }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        maxMapSize?: number;
        /**
         * Sets the alignment direction of the output pose coordinate system.
         * For details, please refer to <b>ARPoseMode</b>.
         *
         * @type { ARPoseMode }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        poseMode?: ARPoseMode;
        /**
         * Depth image mode. For details, please refer to <b>ARDepthMode</b>.
         *
         * @type { ARDepthMode }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        depthMode?: ARDepthMode;
        /**
         * Mesh mode. For details, please refer to <b>ARMeshMode</b>.
         *
         * @type { ARMeshMode }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        meshMode?: ARMeshMode;
        /**
         * Add augmented image mode. For details, please refer to <b>ARAddAugmentedImageMode</b>.
         *
         * @type { ARAddAugmentedImageMode }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        addAugmentedImageMode?: ARAddAugmentedImageMode;
        /**
         * Semantic Dense Mode. For details, please refer to <b>ARSemanticDenseMode</b>.
         *
         * @type { ?ARSemanticDenseMode }
         * @syscap SystemCapability.AREngine.Core
         * @since 6.0.0(20)
         */
        semanticDenseMode?: ARSemanticDenseMode;
    }
    /**
     * Indicates a trackable object, such as a point or a plane.
     *
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    class ARTrackable {
        /**
         * Type of a trackable object, such as a plane or point.
         *
         * @type { ARTrackableType }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly type: ARTrackableType;
        /**
         * Tracking status of the trackable object.
         *
         * @type { ARTrackingState }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly state: ARTrackingState;
        /**
         * Obtains the pose information of the trackable.
         *
         * @returns { ARPose } Pose information of the trackable.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getPose(): ARPose;
        /**
         * Obtains a list of anchor objects bound to the this trackable object.
         *
         * @returns { Array<ARAnchor> } List of anchor objects.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getAnchors(): Array<ARAnchor>;
        /**
         * Creates an anchor object using the pose information of the trackable object. This anchor will be bound to the
         * current trackable object.
         *
         * @param { ARPose } pose - Pose information of a trackable object.
         * @returns { ARAnchor } Newly created anchor object.
         * @throws { BusinessError } 401 - Invalid parameters, for example, the input parameter is empty or invalid.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        createAnchor(pose: ARPose): ARAnchor;
        /**
         * Releases a trackable object.
         *
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        release(): Promise<void>;
    }
    /**
     * Indicates a plane object, which describes the detected trackable plane information.
     *
     * @extends ARTrackable
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    class ARPlane extends ARTrackable {
        /**
         * Plane type. For details, please refer to <b>ARPlaneType</b>.
         *
         * @type { ARPlaneType }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        planeType: ARPlaneType;
        /**
         * Length of the plane's bounding rectangle along the x-axis of the plane's local coordinate system, in meters.
         *
         * @type { number }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        extendX: number;
        /**
         * Length of the plane's bounding rectangle along the z-axis of the plane's local coordinate system, in meters.
         *
         * @type { number }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        extendZ: number;
        /**
         * the semantic type of a plane, such as desktop and floor. you need to Set <b>SemanticMode</b> in <b>ARConfig</b>
         * to enable the semantic recognition mode. For details, please refer to <b>ARSemanticPlaneLabel</b>.
         *
         * @type { ARSemanticPlaneLabel }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        label: ARSemanticPlaneLabel;
        /**
         * The 2D vertex array of the detected plane, in the format of [x1, z1, x2, z2, ...].
         * These values are defined in the x-z plane of the plane's local coordinate system and must be converted to the world
         * coordinate system through <b>HMS_AREngine_ARPlane_GetCenterPose</b>.
         *
         * @returns { ArrayBuffer } The result returned by the function. Convert ArrayBuffer to Float32Array to use.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getPolygonXZ(): ArrayBuffer;
        /**
         * Obtains the parent plane of a plane (a parent plane is generated when a plane is merged with another one). If
         * there is no parent plane, undefine is returned.
         *
         * @returns { ARPlane } Parent plane object of a specific plane.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getSubsumedBy(): ARPlane;
        /**
         * Checks whether a pose is within the plane's bounding rectangle.
         *
         * @param { ARPose } pose -Pose information.
         * @returns { boolean } The result returned by the function.
         * @throws { BusinessError } 401 - Invalid parameters, for example, the input parameter is empty or invalid.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        isPoseInExtents(pose: ARPose): boolean;
        /**
         * Checks whether a pose is within the plane's bounding polygon.
         *
         * @param { ARPose } pose -Pose information.
         * @returns { boolean } The result returned by the function.
         * @throws { BusinessError } 401 - Invalid parameters, for example, the input parameter is empty or invalid.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        isPoseInPolygon(pose: ARPose): boolean;
    }
    /**
     * Indicates a collection of trackable 3D point clouds.
     *
     * @typedef ARPointCloud
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    interface ARPointCloud {
        /**
         * Obtains the timestamp when the current feature point cloud is detected, in nanoseconds.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly timestamp: number;
        /**
         * Coordinates of all points in a point cloud, as well as their confidence array, in the format
         * [x0, y0, z0, c0, x1, y1, z1, c1, x2,...].
         *
         * @type { Array<number> }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly points: Array<number>;
    }
    /**
     * Indicates a collection of environment mesh data.
     *
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    class ARSceneMesh {
        /**
         * The size of vertices in the scene mesh.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly verticesSize: number;
        /**
         * The size of triangle indices in the scene mesh.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly triangleIndicesSize: number;
        /**
         * The set of vertices in the scene mesh.
         *
         * @returns { ArrayBuffer } The result returned by the function. Convert ArrayBuffer to Float32Array to use.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getVertices(): ArrayBuffer;
        /**
         * The set of vertexnormals in the scene mesh.
         *
         * @returns { ArrayBuffer } The result returned by the function. Convert ArrayBuffer to Float32Array to use.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getVertexNormals(): ArrayBuffer;
        /**
         * The set of triangle indices in the scene mesh.
         *
         * @returns { ArrayBuffer } The result returned by the function. Convert ArrayBuffer to Int32Array to use.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getTriangleIndices(): ArrayBuffer;
        /**
         * Releases the scenemesh object of the current frame.
         *
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        release(): Promise<void>;
    }
    /**
     * Indicates the list of hit testing result.
     *
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    class ARHitResult {
        /**
         * The distance from the camera to the hit location, in meters.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly distance: number;
        /**
         * <p>Obtains the pose of an intersection. The pose's translation component corresponds to the intersection's
         * coordinates in the world coordinate system, while its rotation component varies according to the type of the
         * intersection (such as the intersection with a plane or a point cloud).</p>
         * 1. When a ray collides with the plane, in the local coordinate system: X+ is perpendicular to the ray and parallel to
         * the tracked plane; Y+ is the normal vector of the tracked plane; Z+ is parallel to the plane and roughly points to
         * the camera.
         * 2. When a ray collides with points in a point cloud, the system attempts to estimate a plane with the point cloud of
         * the hit area.
         * 2.1 If <b>ARPointOrientationMode</b> is
         * <b>ESTIMATED_SURFACE_NORMAL</b>, X+ is perpendicular to the ray and parallel to the
         * tracked plane, Y+ is the normal vector of the tracked plane, and Z+ is parallel to the plane and roughly points to
         * the camera.
         * 2.2 If <b>INITIALIZED_TO_IDENTITY</b> is returned, the orientation of the
         * coordinates won't change with the plane's angle. X+ is perpendicular to the ray and points to the right (from the
         * device's perspective), Y+ points upward, and Z+ roughly points to the camera. For details, please refer to the
         * orientation mode definition.
         *
         * @returns { ARPose } Intersection pose.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getHitPose(): ARPose;
        /**
         * Obtains the trackable object that is hit.
         *
         * @returns { ARTrackable } Trackable object that is hit.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getTrackable(): ARTrackable;
        /**
         * Creates an anchor at the intersection.
         *
         * @returns { ARAnchor } Newly created anchor object.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        createAnchor(): ARAnchor;
        /**
         * Releases the memory used by the hit testing result object.
         *
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        release(): Promise<void>;
    }
    /**
     * Indicates the pose (translation + rotation), representing an immutable rigid transformation from one
     * coordinate system to another.
     *
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    class ARPose {
        /**
         * The pose data from the pose object, including  rotation components.
         * The obtained rotation is an array with 4 elements: poseRaw[0] to poseRaw[3] are rotation quaternions.
         *
         * @type { Quaternion }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly rotation: Quaternion;
        /**
         * The pose data from the pose object, including translation components.
         * The obtained translation data is an array with 3 elements: translation components (x, y, z).
         *
         * @type { Vec3 }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly translation: Vec3;
        /**
         * Converts the pose data into a 4 x 4 matrix. Matrix4 is the array for storing the matrix, where
         * data is stored in column-major order. Coordinates in the local coordinate system can be converted into ones in the
         * world coordinate system by multiplying this matrix with the coordinates in the local coordinate system.
         *
         * @returns { Matrix4 } Array with 16 floating point numbers, which are stored in a column-major order.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getMatrix(): Matrix4;
        /**
         * Releases the memory used by the pose object.
         *
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        release(): Promise<void>;
    }
    /**
     * Allocates and initializes a new pose object.
     *
     * @param { Quaternion } rotation - The pose data from the pose object, including  rotation components.
     * The obtained rotation is an array with 4 elements: poseRaw[0] to poseRaw[3] are rotation quaternions.
     * @param { Vec3 } translation - The pose data from the pose object, including translation components.
     * The obtained translation data is an array with 3 elements: translation components (x, y, z).
     * @returns { ARPose } Newly created pose object.
     * @throws { BusinessError } 401 - Invalid parameters, for example, the input parameter is empty or invalid.
     * @throws { BusinessError } 1009200001 - Failure.
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    function createARPose(rotation: Quaternion, translation: Vec3): ARPose;
    /**
     * Indicates a collection of trackable point.
     *
     * @extends ARTrackable
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    class ARPoint extends ARTrackable {
        /**
         * Orientation mode. For details, please refer to <b>ARPointOrientationMode</b>.
         *
         * @type { ARPointOrientationMode }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly orientationMode: ARPointOrientationMode;
    }
    /**
     * Indicates an augmented image object.
     *
     * @extends ARTrackable
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    class ARAugmentedImage extends ARTrackable {
        /**
         * <p>The center point of the obtained image is the coordinate origin, and the width (in meters) of the physical
         * image estimated on the X axis is obtained. The AR Engine continuously updates the estimated physical image width based
         * on its understanding of the world. If the tracking status of an image is <b>PAUSED</b>
         * or <b>STOPPED</b>, the width information returned is the width of the last tracking.</p>
         * <p>Returns 0 if the image has never been tracked.</p>
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly extendX: number;
        /**
         * <p>The center point of the obtained image is the coordinate origin, and the width (in meters) of the physical
         * image estimated on the Z axis is obtained. The AR Engine continuously updates the estimated physical image width based
         * on its understanding of the world. If the tracking status of an image is <b>PAUSED</b>
         * or <b>STOPPED</b>, the width information returned is the width of the last tracking.</p>
         * <p>Returns 0 if the image has never been tracked.</p>
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly extendZ: number;
        /**
         * Gets the image index of the augmented image in the augmented image database.
         * The image index value is the unique identifier for the image in the database.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly index: number;
        /**
         * Returns the image name of the augmented image. The image name is specified when you call <b>addImage</b> to
         * add an image. The image name may not be unique.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        readonly name: string;
    }
    /**
     * Indicates an augmented image database object.
     *
     * @typedef ARAugmentedImageDatabase
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    interface ARAugmentedImageDatabase {
        /**
         * <p>Deserialize the augmented image database buffer returned through the
         * <b>serialize</b> interface to create a new augmented image database. The operations
         * performed by this function are time-consuming. You are advised to run this function in the background thread.</p>
         *
         * @param { ArrayBuffer } buffer - Augmented image database buffer.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Invalid parameters, for example, the input parameter is empty or invalid.
         * @throws { BusinessError } 1009200001 - Failure.
         * @throws { BusinessError } 1009200008 - Resource exhausted.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        deserialize(buffer: ArrayBuffer): Promise<void>;
        /**
         * <p>Serializing the augmented image database into a buffer, you can save the buffer for future use.
         * For details about how to use it, please refer to <b>deserialize</b>.</p>
         *
         * @returns { Promise<ArrayBuffer> } The promise returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        serialize(): Promise<ArrayBuffer>;
        /**
         * <p>Adds the image to the image database and outputs the index of the corresponding image.
         * The maximum number of images to be added can be obtained through:<b>getMaxImageNum</b>.
         * You can use the <b>HMS_AREngine_ARConfig_SetAddAugmentedImageMode</b> interface
         * to set the behavior after this interface is invoked.</p>
         *
         * @param { string } name - Image imageName, a maximum of 255 characters are allowed.
         * @param { image.PixelMap } pixelMap - image The image information.
         * @param { number } widthInMeters - Actual physical width of the object in an image.
         * The default value is A4 paper size.
         * @returns { Promise<ARAddAugmentedImageResult> } The result of add augmented image. For details, please refer to
         * <b>ARAddAugmentedImageResult</b>.
         * @throws { BusinessError } 401 - Invalid parameters, for example, the input parameter is empty or invalid.
         * @throws { BusinessError } 1009200001 - Failure.
         * @throws { BusinessError } 1009200008 - Resource exhausted.
         * @throws { BusinessError } 1009200011 - The number of images added exceeds the maximum.
         * @throws { BusinessError } 1009200012 - Attempted to add an image with insufficient quality to the image database.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        addImage(name: string, pixelMap: image.PixelMap, widthInMeters: number): Promise<ARAddAugmentedImageResult>;
        /**
         * Obtains the number of images.
         *
         * @returns { number } the number of images.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getImageCount(): number;
        /**
         * Obtains the maximum number of images that can be added by invoking the <b>addImage</b> interface.
         *
         * @returns { number } Max num of images.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getCapacity(): number;
        /**
         * Obtains the image adding mode..
         *
         * @returns { ARAddAugmentedImageMode } Image adding mode.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        getImageAddMode(): ARAddAugmentedImageMode;
        /**
         * Sets the image adding mode.
         *
         * @param { ARAddAugmentedImageMode } mode - Image adding mode.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        setImageAddMode(mode: ARAddAugmentedImageMode): void;
        /**
         * Releases a image database object.
         *
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 1009200001 - Failure.
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        release(): Promise<void>;
    }
    /**
     * Creating an Image Tracking Database
     *
     * @returns { Promise<ARAugmentedImageDatabase> } Indicates an augmented image database object.
     * @throws { BusinessError } 1009200001 - Failure.
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    function createARAugmentedImageDatabase(): Promise<ARAugmentedImageDatabase>;
    /**
     * The result of add augmented image.
     *
     * @typedef ARAddAugmentedImageResult
     * @syscap SystemCapability.AREngine.Core
     * @since 5.1.0(18)
     */
    interface ARAddAugmentedImageResult {
        /**
         * Image index.
         *
         * @type { number }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        index: number;
        /**
         * Add result.
         *
         * @type { number }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        state: number;
        /**
         * Add failed reason.
         *
         * @type { ARAddAugmentedImageReason }
         * @syscap SystemCapability.AREngine.Core
         * @since 5.1.0(18)
         */
        stateReason: ARAddAugmentedImageReason;
    }
}
export default arEngine;
