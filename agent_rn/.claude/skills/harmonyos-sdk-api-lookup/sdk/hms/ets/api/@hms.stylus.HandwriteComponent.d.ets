/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Provide the common handwrite view and the ability to control handwrite view behavior.
 * @bundle com.huawei.hmos.hwstylusfeature/Penkit/ets/hsp/HandwritePaint 5.0.0(12)
 * @kit Penkit
 */
import type { AsyncCallback } from '@ohos.base';
/**
 * Callback function when the handwrite component has finished initializing
 *
 * @typedef { function } InitCallback
 * @syscap SystemCapability.Stylus.Handwrite
 * @stagemodelonly
 * @since 5.1.0(18)
 */
declare type InitCallback = () => void;
/**
 * Callback function when the handwrite component is scaling.
 *
 * @typedef { function } ScaleCallback
 * @param { number } scale - the scale
 * @syscap SystemCapability.Stylus.Handwrite
 * @stagemodelonly
 * @since 5.1.0(18)
 */
declare type ScaleCallback = (scale: number) => void;
/**
 * Provides handwrite component, the caller needs to provide handwrite controller and callback
 *
 * @struct {HandwriteComponent}
 * @syscap SystemCapability.Stylus.Handwrite
 * @stagemodelonly
 * @since 5.0.0(12)
 */
@Component
export struct HandwriteComponent {
    /**
     * This is the main function entry of the handwrite component.
     *
     * @type { HandwriteController }
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    handwriteController: HandwriteController;
    /**
     * Callback function when the handwrite component has finished initializing.
     *
     * @type { function } () => void
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    /**
     * Callback function when the handwrite component has finished initializing.
     *
     * @type { ?InitCallback }
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    onInit?: InitCallback;
    /**
     * Callback function when the handwrite component is scaling.
     *
     * @type { function } (scale: number) => void
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    /**
     * Callback function when the handwrite component is scaling.
     *
     * @type { ?ScaleCallback }
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    onScale?: ScaleCallback;
    /**
     * The default builder function for struct, You should not need to invoke this method directly.
     *
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    build(): void;
    /**
     * Default pen type.
     *
     * @type { ?PenType }
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    defaultPenType?: PenType;
    /**
     * Default width of each pen.
     *
     * @type { ?PenHspInfo[] }
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    defaultPenInfo?: PenHspInfo[];
    /**
     * Width ratio of the handwriting page.
     * @type { ?number }
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    widthRatio?: number;
    /**
     * Height ratio of the handwriting page.
     * @type { ?number }
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    heightRatio?: number;
}
/**
 * This is the main function entry of the handwrite component.
 * All map-related methods can be accessed from this interface.
 *
 * @syscap SystemCapability.Stylus.Handwrite
 * @stagemodelonly
 * @since 5.0.0(12)
 */
export class HandwriteController {
    /**
     * Save handwrite content.
     *
     * @param { string } path - File path for saving the handwrite content.
     * @returns { Promise<void> }
     * @throws { BusinessError } 1010400002 - save filed
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    save(path: string): Promise<void>;
    /**
     * Load handwrite content.
     *
     * @param { string } path - File path for loading the handwrite content.
     * @throws { BusinessError } 1010400001 - load filed
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    load(path: string): void;
    /**
     * Registers a callback to be invoked when finishing loading.
     *
     * @param { AsyncCallback<string> } callback - Callback invoked to return the id of the handwrite content page.
     * @throws { BusinessError } 1010400001 - load filed
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    onLoad(callback: AsyncCallback<string>): void;
    /**
     * Get the rectangle of the handwriting content range.
     * @returns { Rect } The rectangle of the queried handwriting content range.
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    getContentRange(): Rect;
    /**
     * Get the thumbnail of the handwriting content range.
     * @param { Rect } rect The Rect parameter defining the thumbnail of the handwriting content range.
     * @returns { Promise<PixelMap> } The thumbnail of the handwrite content range.
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    getThumbnail(rect: Rect): Promise<PixelMap>;
}
/**
 * Definition of the rectangle.
 * @typedef Rect
 * @syscap SystemCapability.Stylus.Handwrite
 * @since 6.0.0(20)
 */
interface Rect {
    /**
     * Left side position of the rectangle.
     * @type { number }
     * @syscap SystemCapability.Stylus.Handwrite
     * @since 6.0.0(20)
     */
    left: number;
    /**
     * Top side position of the rectangle.
     * @type { number }
     * @syscap SystemCapability.Stylus.Handwrite
     * @since 6.0.0(20)
     */
    top: number;
    /**
     * Right side position of the rectangle.
     * @type { number }
     * @syscap SystemCapability.Stylus.Handwrite
     * @since 6.0.0(20)
     */
    right: number;
    /**
     * Bottom side position of the rectangle.
     * @type { number }
     * @syscap SystemCapability.Stylus.Handwrite
     * @since 6.0.0(20)
     */
    bottom: number;
}
/**
 * The type and width of the pen.
 *
 * @interface PenHspInfo
 * @syscap SystemCapability.Stylus.Handwrite
 * @stagemodelonly
 * @since 5.1.0(18)
 */
export interface PenHspInfo {
    /**
     * Pen type.
     *
     * @type { PenType }
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    penType: PenType;
    /**
     * Pen width
     *
     * @type { number }
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    penWidth: number;
}
/**
 * Type of each pen.
 *
 * @enum { number }
 * @syscap SystemCapability.Stylus.Handwrite
 * @stagemodelonly
 * @since 5.1.0(18)
 */
export enum PenType {
    /**
     * Fountain pen.
     *
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    PEN = 1,
    /**
     * Ball pen.
     *
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    BALLPOINT_PEN = 2,
    /**
     * Pencil.
     *
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    PENCIL = 3,
    /**
     * Marker pen.
     *
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    MARKER = 4,
    /**
     * Highlighter.
     *
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    HIGHLIGHTER_BRUSH = 5,
    /**
     * Pixelate.
     *
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    MOSAIC = 7,
    /**
     * Eraser.
     *
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    RUBBER = 8,
    /**
     * Lasso.
     *
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    LASSO = 9,
    /**
     * Laser
     *
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    LASER = 10
}
