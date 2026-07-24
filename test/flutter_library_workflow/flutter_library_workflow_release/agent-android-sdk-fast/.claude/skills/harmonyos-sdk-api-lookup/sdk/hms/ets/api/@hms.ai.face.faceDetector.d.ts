/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file This module is used for face detection.
 * @kit CoreVisionKit
 * */
import type image from '@ohos.multimedia.image';
/**
 * This module is used for face detection. Specifically, it identifies multiple faces in a picture,
 * return the number of faces, direction of each face, rectangular box of the face, and coordinates of the facial features.
 * @namespace faceDetector
 * @syscap SystemCapability.AI.Face.Detector
 * @since 5.0.0(12)
 */
/**
 * This module is used for face detection. Specifically, it identifies multiple faces in a picture,
 * return the number of faces, direction of each face, rectangular box of the face, and coordinates of the facial features.
 * @namespace faceDetector
 * @syscap SystemCapability.AI.Face.Detector
 * @atomicservice
 * @since 5.0.2(14)
 */
declare namespace faceDetector {
    /**
     * Visual configuration information, including related pictures.
     * @interface VisionInfo
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.0(12)
     */
    /**
     * Visual configuration information, including related pictures.
     * @interface VisionInfo
     * @syscap SystemCapability.AI.Face.Detector
     * @atomicservice
     * @since 5.0.2(14)
     */
    export interface VisionInfo {
        /**
         * Image information to be identified.
         * @type { image.PixelMap }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        /**
         * Image information to be identified.
         * @type { image.PixelMap }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @atomicservice
         * @since 5.0.2(14)
         */
        readonly pixelMap: image.PixelMap;
    }
    /**
     * This is the face recognition configuration. If the configuration can be specified during initialization and detection,
     * Additional detection function will be enabled
     * @interface FaceRecognitionConfiguration
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.2(14)
     */
    export interface FaceRecognitionConfiguration {
        /**
         * The faceBlock default value is false, that is, face blocking detection is disabled by default.
         * @type { boolean }
         * @default false
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.2(14)
         */
        readonly faceBlock: boolean;
    }
    /**
     * Describes the result of face block detection.
     * @enum { number }
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.2(14)
     */
    export enum FaceBlock {
        /**
         * The result indicates that face blocking detection is disabled.
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.2(14)
         */
        UNINITIALIZED = -1,
        /**
         * The result indicates that the face is not blocked.
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.2(14)
         */
        UNBLOCKED = 0,
        /**
         * The result indicates that the face is blocked.
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.2(14)
         */
        BLOCKED = 1
    }
    /**
     * Indicates the position of the pixel point
     * @interface FacePoint
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.0(12)
     */
    /**
     * Indicates the position of the pixel point
     * @interface FacePoint
     * @syscap SystemCapability.AI.Face.Detector
     * @atomicservice
     * @since 5.0.2(14)
     */
    export interface FacePoint {
        /**
         * Horizontal coordinates of pixel point.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        /**
         * Horizontal coordinates of pixel point.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @atomicservice
         * @since 5.0.2(14)
         */
        readonly x: number;
        /**
         * The vertical coordinate of the pixel point
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        /**
         * The vertical coordinate of the pixel point
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @atomicservice
         * @since 5.0.2(14)
         */
        readonly y: number;
    }
    /**
     * Describe the orientation of a face in three-dimensional space.
     * @interface FacePose
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.0(12)
     */
    /**
     * Describe the orientation of a face in three-dimensional space.
     * @interface FacePose
     * @syscap SystemCapability.AI.Face.Detector
     * @atomicservice
     * @since 5.0.2(14)
     */
    export interface FacePose {
        /**
         * Head-shaped yaw, rotating the object around the Y axis (localRotationY)
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        /**
         * Head-shaped yaw, rotating the object around the Y axis (localRotationY)
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @atomicservice
         * @since 5.0.2(14)
         */
        readonly yaw: number;
        /**
         * Head-shaped pitch, rotating the object around the X axis (localRotationX)
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        /**
         * Head-shaped pitch, rotating the object around the X axis (localRotationX)
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @atomicservice
         * @since 5.0.2(14)
         */
        readonly pitch: number;
        /**
         * Head-shaped roll, rotating the object around the Z axis (localRotationZ)
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        /**
         * Head-shaped roll, rotating the object around the Z axis (localRotationZ)
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @atomicservice
         * @since 5.0.2(14)
         */
        readonly roll: number;
    }
    /**
     * Describe the position and size of the face rectangle
     * @interface FaceRectangle
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.0(12)
     */
    /**
     * Describe the position and size of the face rectangle
     * @interface FaceRectangle
     * @syscap SystemCapability.AI.Face.Detector
     * @atomicservice
     * @since 5.0.2(14)
     */
    export interface FaceRectangle {
        /**
         * Indicates the horizontal coordinate of the upper left corner of the face rectangle.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        /**
         * Indicates the horizontal coordinate of the upper left corner of the face rectangle.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @atomicservice
         * @since 5.0.2(14)
         */
        readonly left: number;
        /**
         * Indicates the vertical coordinate of the upper left corner of the face rectangle.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        /**
         * Indicates the vertical coordinate of the upper left corner of the face rectangle.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @atomicservice
         * @since 5.0.2(14)
         */
        readonly top: number;
        /**
         * width of the face rectangle.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        /**
         * width of the face rectangle.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @atomicservice
         * @since 5.0.2(14)
         */
        readonly width: number;
        /**
         * height of the face rectangle.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        /**
         * height of the face rectangle.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @atomicservice
         * @since 5.0.2(14)
         */
        readonly height: number;
    }
    /**
     * The result information of face recognition, including face number, coordinate information, and face
     * detection results.
     * @interface Face
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.0(12)
     */
    /**
     * The result information of face recognition, including face number, coordinate information, and face
     * detection results.
     * @interface Face
     * @syscap SystemCapability.AI.Face.Detector
     * @atomicservice
     * @since 5.0.2(14)
     */
    export interface Face {
        /**
         * An array of numbers that represents the face detection results. The value range of each element
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        /**
         * An array of numbers that represents the face detection results. The value range of each element
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @atomicservice
         * @since 5.0.2(14)
         */
        readonly probability: number;
        /**
         * detail for block.
         * @type { FaceBlock }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.2(14)
         */
        readonly block?: FaceBlock;
        /**
         *  detail for FacePose.
         * @type { FacePose }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        /**
         *  detail for FacePose.
         * @type { FacePose }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @atomicservice
         * @since 5.0.2(14)
         */
        readonly pose: FacePose;
        /**
         *  detail for FaceRectangle.
         * @type { FaceRectangle }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        /**
         *  detail for FaceRectangle.
         * @type { FaceRectangle }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @atomicservice
         * @since 5.0.2(14)
         */
        readonly rect: FaceRectangle;
        /**
         *  detail for FacePoint.
         * @type { Array<FacePoint> }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        /**
         *  detail for FacePoint.
         * @type { Array<FacePoint> }
         * @readonly
         * @syscap SystemCapability.AI.Face.Detector
         * @atomicservice
         * @since 5.0.2(14)
         */
        readonly points: Array<FacePoint>;
    }
    /**
     * Recognize face information contained in pictures.
     * @param { VisionInfo } visionInfo - The image information.
     * @returns { Promise<Array<Face>> } The result of face recognition.
     * @throws { BusinessError } 200 - Run timed out, please try again later.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1008800001 - Failed to run, please try again.
     * @throws { BusinessError } 1008800002 - The service is abnormal.
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.0(12)
     */
    /**
     * Recognize face information contained in pictures.
     * @param { VisionInfo } visionInfo - The image information.
     * @returns { Promise<Array<Face>> } The result of face recognition.
     * @throws { BusinessError } 200 - Run timed out, please try again later.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1008800001 - Failed to run, please try again.
     * @throws { BusinessError } 1008800002 - The service is abnormal.
     * @syscap SystemCapability.AI.Face.Detector
     * @atomicservice
     * @since 5.0.2(14)
     */
    function detect(visionInfo: VisionInfo): Promise<Array<Face>>;
    /**
     * Init the face detect analyzer service.
     * @returns { Promise<boolean> }
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.0(12)
     */
    /**
     * Init the face detect analyzer service.
     * @returns { Promise<boolean> }
     * @syscap SystemCapability.AI.Face.Detector
     * @atomicservice
     * @since 5.0.2(14)
     */
    function init(): Promise<boolean>;
    /**
     * Init the face detect analyzer service.
     * @param { FaceRecognitionConfiguration } faceRecognitionConfiguration - the configuration information for face recognition.
     * @returns { Promise<boolean> }
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.2(14)
     */
    function init(faceRecognitionConfiguration: FaceRecognitionConfiguration): Promise<boolean>;
    /**
     * Release the face detect analyzer service.
     * @returns { Promise<void> }
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.0(12)
     */
    /**
     * Release the face detect analyzer service.
     * @returns { Promise<void> }
     * @syscap SystemCapability.AI.Face.Detector
     * @atomicservice
     * @since 5.0.2(14)
     */
    function release(): Promise<void>;
}
export default faceDetector;
