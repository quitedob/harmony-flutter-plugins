/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file This module provides the vision base capabilities.
 * @kit CoreVisionKit
 */
import type image from '@ohos.multimedia.image';
import { Callback } from '@ohos.base';
/**
 * Vision base
 * @namespace visionBase
 * @syscap SystemCapability.AI.Vision.VisionBase
 * @since 5.0.0(12)
 */
declare namespace visionBase {
    /**
     * Scene mode, which is used to indicate the business scene mode corresponding to the request,
     * and the engine service side will set the task priority based on this mode.
     * @enum { number }
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    enum SceneMode {
        /**
         * Foreground entity(default).
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        FOREGROUND = 1,
        /**
         * Background entity.
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        BACKGROUND = 2
    }
    /**
     * Class representing the packaged visual data.
     * @typedef ImageData
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    interface ImageData {
        /**
         * PixelMap of the image data.
         * @type { image.PixelMap }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        pixelMap: image.PixelMap;
    }
    /**
     * Type of input data
     * @typedef { ImageData | ImageData[] }
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    type InputData = ImageData | ImageData[];
    /**
     * Describe the position and size of the rectangle
     * @interface BoundingBox
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    interface BoundingBox {
        /**
         * Indicates the horizontal coordinate of the upper left corner of the object.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        left: number;
        /**
         * Indicates the vertical coordinate of the upper left corner of the object.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        top: number;
        /**
         * Width of the object rectangle.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        width: number;
        /**
         * Height of the object rectangle.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        height: number;
    }
    /**
     * Indicates the position of the pixel point
     * @interface Point
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    interface Point {
        /**
         * Horizontal coordinates of pixel point.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        x: number;
        /**
         * Vertical coordinates of pixel point.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        y: number;
    }
    /**
     * Describe the orientation in three-dimensional space.
     * @interface Orientation
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    interface Orientation {
        /**
         * Head-shaped yaw, rotating the object around the Y axis (localRotationY)
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        yaw: number;
        /**
         * Head-shaped pitch, rotating the object around the X axis (localRotationX)
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        pitch: number;
        /**
         * Head-shaped roll, rotating the object around the Z axis (localRotationZ)
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        roll: number;
    }
    /**
     * Data structure for download start event
     * @interface DownloadStartData
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    interface DownloadStartData {
        /**
         * Resource identifier
         * @type { string }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        resId: string;
    }
    /**
     * Data structure for download complete event
     * @interface DownloadCompleteData
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    interface DownloadCompleteData {
        /**
         * Resource identifier
         * @type { string }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        resId: string;
        /**
         * Resource version
         * @type { string }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        resVersion: string;
    }
    /**
     * Data structure for download cancel event
     * @interface DownloadCancelData
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    interface DownloadCancelData {
        /**
         * Data structure for download cancel event
         * @type { string }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        resId: string;
    }
    /**
     * States encountered during downloading
     * @enum { number }
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    enum downloadStatusCode {
        /**
         * The parameter check failed.
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        PARAMETER_INVALID = 0,
        /**
         * No network.
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        NO_NETWORK_STATUS = 1,
        /**
         * The model resource does not exist.
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        NO_MODEL = 2,
        /**
         * Failed to copy the model file.
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        COPY_FILE_FAILED = 3,
        /**
         * The user rejects the download.
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        DOWNLOAD_NOT_ALLOWED = 4,
        /**
         * Downloading the model timed out.
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        DOWNLOAD_TIME_OUT = 5,
        /**
         * Download has somthing error.
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        DOWNLOAD_EXCEPTION = 6,
        /**
         * Back to background when downloading.
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        DOWNLOAD_BACK_TO_DESKTOP = 7,
        /**
         * The system is busy. Another task is being executed.
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 6.0.0(20)
         */
        TASK_BUSY = 8
    }
    /**
     * Data structure for download error event
     * @interface DownloadStatusData
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    interface DownloadStatusData {
        /**
         * Resource identifier
         * @type { string }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        resId: string;
        /**
         * Status code
         * @type { downloadStatusCode }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        statusCode: downloadStatusCode;
        /**
         * Status code message
         * @type { string }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        message: string;
    }
    /**
     * Data structure for download progress event
     * @interface DownloadProgressData
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    interface DownloadProgressData {
        /**
         * Resource identifier
         * @type { string }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        resId: string;
        /**
         * Progress information
         * @type { string }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.2(14)
         */
        progressInfo: string;
    }
    /**
     * Base class to request model ability.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    class Request {
        /**
         * Input image, supports one-time calculations, cannot be used to carry data for multiple tasks.
         * @type { InputData }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        inputData: InputData;
        /**
         * Request scene
         * @type { ?SceneMode }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        scene?: SceneMode;
        /**
         * Request Id defined by developers to track the request.
         * @type { ?string }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        requestId?: string;
    }
    /**
     * Response Base Class, serving as the return result for capability requests.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    class Response {
        /**
         * Request Id defined by developers to track the request. One-to-one correspondence with VisionBaseRequest.
         * @type { ?string }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        requestId?: string;
    }
    /**
     * Analyzer Base Class, serving as the ability engine.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    class Analyzer {
        /**
         * Release the vision base analyzer service.
         * @returns { Promise<void> }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        destroy(): Promise<void>;
    }
    /**
     * Register event listener for download start event
     * @param { 'downloadStart' } type - Event type to listen for downloadStart
     * @param { Callback<DownloadStartData> } callback - Callback function to handle the event
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    function on(type: 'downloadStart', callback: Callback<DownloadStartData>): void;
    /**
     * Unregister event listener for download start event
     * @param { 'downloadStart' } type - Event type to stop listening for downloadStart
     * @param { Callback<DownloadStartData> } [callback] - Optional callback function to remove specific listener
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    function off(type: 'downloadStart', callback?: Callback<DownloadStartData>): void;
    /**
     * Register event listener for download start event
     * @param { 'downloadComplete' } type - Event type to listen for downloadComplete
     * @param { Callback<DownloadCompleteData> } callback - Callback function to handle the event
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    function on(type: 'downloadComplete', callback: Callback<DownloadCompleteData>): void;
    /**
     * Unregister event listener for download complete event
     * @param { 'downloadComplete' } type - Event type to stop listening for downloadComplete
     * @param { Callback<DownloadCompleteData> } [callback] - Optional callback function to remove specific listener
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    function off(type: 'downloadComplete', callback?: Callback<DownloadCompleteData>): void;
    /**
     * Register event listener for download cancel event
     * @param { 'downloadCancel' } type - Event type to listen for downloadCancel
     * @param { Callback<DownloadCancelData> } callback - Callback function to handle the event
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    function on(type: 'downloadCancel', callback: Callback<DownloadCancelData>): void;
    /**
     * Unregister event listener for download cancel event
     * @param { 'downloadCancel' } type - Event type to stop listening for downloadCancel
     * @param { Callback<DownloadCancelData> } [callback] - Optional callback function to remove specific listener
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    function off(type: 'downloadCancel', callback?: Callback<DownloadCancelData>): void;
    /**
     * Register event listener for download status event
     * @param { 'downloadStatus' } type - Event type to listen for downloadStatus
     * @param { Callback<DownloadStatusData> } callback - Callback function to handle the event
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    function on(type: 'downloadStatus', callback: Callback<DownloadStatusData>): void;
    /**
     * Unregister event listener for download status event
     * @param { 'downloadStatus' } type - Event type to stop listening for downloadStatus
     * @param { Callback<DownloadStatusData> } [callback] - Optional callback function to remove specific listener
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    function off(type: 'downloadStatus', callback?: Callback<DownloadStatusData>): void;
    /**
     * Register event listener for download progress event
     * @param { 'downloadProgress' } type - Event type to listen for downloadProgress
     * @param { Callback<DownloadProgressData> } callback - Callback function to handle the event
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    function on(type: 'downloadProgress', callback: Callback<DownloadProgressData>): void;
    /**
     * Unregister event listener for download progress event
     * @param { 'downloadProgress' } type - Event type to stop listening for downloadProgress
     * @param { Callback<DownloadProgressData> } [callback] - Optional callback function to remove specific listener
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.2(14)
     */
    function off(type: 'downloadProgress', callback?: Callback<DownloadProgressData>): void;
}
export default visionBase;
