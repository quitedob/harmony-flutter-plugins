/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Provide common object definitions for maps.
 * @bundle com.huawei.hms.mapservice.kit/mapLibrary/ets/mapCommon 5.0.0(12)
 * @kit MapKit
 */
import type image from '@ohos.multimedia.image';
import type { Callback } from '@ohos.base';
/**
 * This module provides common object definitions for maps.
 *
 * @namespace mapCommon
 * @syscap SystemCapability.Map.Core
 * @stagemodelonly
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace mapCommon {
    /**
     * The information to initialize the map.
     *
     * @typedef MapOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface MapOptions {
        /**
         * Indicates the type of map.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?MapType }
         * @default MapType.STANDARD
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        mapType?: MapType;
        /**
         * Indicates the position of map camera.
         *
         * @type { CameraPosition }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        position: CameraPosition;
        /**
         * Indicates the move range of map camera.
         * Abnormal values are handled according to no bounds.
         *
         * @type { ?LatLngBounds }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        bounds?: LatLngBounds;
        /**
         * Indicates the max zoom of map. Value range is [2,20].
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 20
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        maxZoom?: number;
        /**
         * Indicates the min zoom of map. Value range is [2,20].
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 2
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        minZoom?: number;
        /**
         * Indicates the rotate gesture enable of map.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        rotateGesturesEnabled?: boolean;
        /**
         * Indicates the scroll gesture enable of map.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        scrollGesturesEnabled?: boolean;
        /**
         * Indicates the zoom gesture enable of map.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        zoomGesturesEnabled?: boolean;
        /**
         * Indicates the tilt gesture enable of map.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        tiltGesturesEnabled?: boolean;
        /**
         * Indicates the zoom controls enable of map.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        zoomControlsEnabled?: boolean;
        /**
         * Indicates the my location controls enable of map.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        myLocationControlsEnabled?: boolean;
        /**
         * Indicates the compass controls enable of map.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        compassControlsEnabled?: boolean;
        /**
         * Indicates the scale controls enable of map.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        scaleControlsEnabled?: boolean;
        /**
         * Indicates the boundary padding of the map.
         *
         * @type { ?Padding }
         * @default { left:0 , top:0 , right:0 , bottom:0 }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        padding?: Padding;
        /**
         * The custom style id
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        styleId?: string;
        /**
         * The day and night mode.
         *
         * @type { ?DayNightMode }
         * @default DayNightMode.DAY
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        dayNightMode?: DayNightMode;
        /**
         * Whether to always show the scale control. This parameter is valid only when the scale is enabled.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        alwaysShowScaleEnabled?: boolean;
        /**
         * Whether to enable the map sphere effect.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        sphereEnabled?: boolean;
        /**
         * The logo zoom scale, and the range is [0.8,1].
         *
         * @type { ?number }
         * @default 1
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        logoScale?: number;
        /**
         * Whether to enable the indoor map.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.1(19)
         */
        indoorMapEnabled?: boolean;
        /**
         * The Scale Unit
         *
         * @type { ?ScaleUnit }
         * @default ScaleUnit.METRIC_UNIT
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.1(19)
         */
        scaleUnit?: ScaleUnit;
        /**
         * Map language. The current system language is used by default.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        language?: string;
    }
    /**
     * The map type.
     *
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum MapType {
        /**
         * Indicate standard map with important natural features such as roads, buildings, green spaces and rivers.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        STANDARD = 0,
        /**
         * Indicates blank map.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        NONE = 1,
        /**
         * Indicate terrain map.Overlaying terrain data on a standard map
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        TERRAIN = 2,
        /**
         * Satellite map.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        SATELLITE = 3,
        /**
         * Displays a hybrid map. Roads, boundaries, POIs, and text are displayed based on the satellite map.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        HYBRID = 4
    }
    /**
     * Provide the longitude and latitude of the map.
     *
     * @typedef LatLng
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface LatLng {
        /**
         * Provide the longitude of the map.The value range is [-180, 180).
         *
         * @type { number }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        longitude: number;
        /**
         * Provide the latitude of the map.The value range is [-90, 90].
         *
         * @type { number }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        latitude: number;
    }
    /**
     * Provide the attributes of the map camera, include position, zoom level, tilt angle, and orientation.
     *
     * @typedef CameraPosition
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface CameraPosition {
        /**
         * Provide the camera position.
         *
         * @type { LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        target: LatLng;
        /**
         * Provide the camera zoom level. Value range is [2,20]
         *
         * @type { number }
         * @default 2
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        zoom: number;
        /**
         * Provide the camera tilt angle.The value range is [0,75]
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        tilt?: number;
        /**
         * Provide the camera orientation. The due north direction is 0 degrees and increases clockwise.The value range is [0, 360].
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        bearing?: number;
    }
    /**
     * Provide the rectangular region defined by a pair of latitudes and longitudes.
     *
     * @typedef LatLngBounds
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface LatLngBounds {
        /**
         * The position of the northeast corner.
         *
         * @type { LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        northeast: LatLng;
        /**
         * The position of the southwest corner.
         *
         * @type { LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        southwest: LatLng;
    }
    /**
     * The border style used to describe a circle, polygon or polyline.
     *
     * @typedef PatternItem
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface PatternItem {
        /**
         * The border style type
         *
         * @type { PatternItemType }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        type: PatternItemType;
        /**
         * The length of the border if the border style type is DASH or GAP.
         *
         * @type { ?number }
         * @default 1
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        length?: number;
    }
    /**
     * A border style type used to describe a circle, polygon, or polyline.
     *
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum PatternItemType {
        /**
         * A dash in the border of a polyline, polygon, or circle.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        DASH = 0,
        /**
         * A dot in the border of a polyline, polygon, or circle.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        DOT = 1,
        /**
         * A gap in the border of a polyline, polygon, or circle.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        GAP = 2
    }
    /**
     * The corner drawing style for polyline and polygon.
     *
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum JointType {
        /**
         * Use sharp corners to connect path segments.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        DEFAULT = 0,
        /**
         * Use bevels to connect path segments.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        BEVEL = 1,
        /**
         * Use fillets to join path segments.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        ROUND = 2
    }
    /**
     * Used to customize the my location style
     *
     * @typedef MyLocationStyle
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface MyLocationStyle {
        /**
         * The offset in the horizontal direction of the anchor point
         *
         * @type { ?number }
         * @default 0.5
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        anchorU?: number;
        /**
         * The offset in the vertical direction of the anchor point
         *
         * @type { ?number }
         * @default 0.5
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        anchorV?: number;
        /**
         * The my location icon which is the file URI format.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        /**
         * The my location icon which is the file URI format.
         *
         * @type { ?(string | image.PixelMap | Resource) }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        icon?: string | image.PixelMap | Resource;
        /**
         * The fill color of the precision circle.The color value is ARGB format.
         *
         * @type { ?number }
         * @default 0x8F7570FF
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        radiusFillColor?: number;
        /**
         * My location layer display type.
         *
         * @type { ?MyLocationDisplayType }
         * @default MyLocationDisplayType.DEFAULT
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        displayType?: MyLocationDisplayType;
    }
    /**
     * Indicates the POI object on the map.
     *
     * @typedef Poi
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Poi {
        /**
         * Poi id
         *
         * @type { string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        id: string;
        /**
         * Poi name
         *
         * @type { string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        name: string;
        /**
         * Poi location
         *
         * @type { LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        position: LatLng;
    }
    /**
     * The alignment mode of the map logo
     *
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum LogoAlignment {
        /**
         * Place the logo on the lower left position.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        BOTTOM_START = 0,
        /**
         * Place the logo on the lower right position.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        BOTTOM_END = 1,
        /**
         * Place the logo on the upper left position.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        TOP_START = 2,
        /**
         * Place the logo on the upper right position.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        TOP_END = 3,
        /**
         * Place the logo on the upper center position.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.1(19)
         */
        TOP_CENTER = 4,
        /**
         * Place the logo on the bottom center position.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.1(19)
         */
        BOTTOM_CENTER = 5
    }
    /**
     * This interface defines the overlay basic information.
     *
     * @typedef BaseOverlayOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface BaseOverlayOptions {
        /**
         * Indicates whether the BaseOverlay is visible.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        visible?: boolean;
        /**
         * Indicates the overlay level of the BaseOverlay.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        zIndex?: number;
    }
    /**
     * Provides the attributes of marker
     *
     * @typedef MarkerOptions
     * @extends BaseOverlayOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface MarkerOptions extends BaseOverlayOptions {
        /**
         * The position of the marker
         *
         * @type { LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        position: LatLng;
        /**
         * The rotation direction of the marker's icon
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        rotation?: number;
        /**
         * Indicates the icon of the marker which is the file URI format.
         * Abnormal values are handled according to the default icon.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        /**
         * Indicates the icon of the marker which is the file URI format.
         *
         * @type { ?(string | image.PixelMap | Resource) }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        icon?: string | image.PixelMap | Resource;
        /**
         * Indicates the alpha of the marker's icon. The value range is [0,1], 0 is completely transparent and 1 is completely opaque.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 1
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        alpha?: number;
        /**
         * Indicates the position of the anchor point of the marker's icon in the horizontal direction. Value range: [0, 1]
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 0.5
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        anchorU?: number;
        /**
         * Indicates the position of the anchor point of the marker's icon in the vertical direction. Value range: [0, 1]
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 1
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        anchorV?: number;
        /**
         * Indicates whether the marker is clickable.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        clickable?: boolean;
        /**
         * Indicates whether the marker is draggable.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        draggable?: boolean;
        /**
         * Indicates whether the marker's icon is shown on the ground.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        flat?: boolean;
        /**
         * Indicates the title of marker info window
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        title?: string;
        /**
         * Indicates the subTitle of marker info window
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        snippet?: string;
        /**
         * Indicates the position of the anchor point of the marker info window in the horizontal direction. Value range: [0, 1]
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 0.5
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        infoWindowAnchorU?: number;
        /**
         * Indicates the position of the anchor point of the marker info window  in the vertical direction. Value range: [0, 1]
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        infoWindowAnchorV?: number;
        /**
         * altitude, and the unit is meter.
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        altitude?: number;
        /**
         * Indicates the conflict handling rules between the marker and the map poi.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?CollisionRule }
         * @default CollisionRule.NONE
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        collisionRule?: CollisionRule;
        /**
         * Indicates the annotations of the marker.The min length is 1, and the max length is 3.
         *
         * @type { ?Text[] }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        annotations?: Text[];
        /**
         * Indicates whether to display the icon of the marker.
         * Abnormal values are handled according to the displayed icon.
         *
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        showIcon?: boolean;
        /**
         * Position of the annotation relative to the icon.
         *
         * @type { ?TextPosition }
         * @default TextPosition.DEFAULT
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        annotationPosition?: TextPosition;
        /**
         * Custom component for generating Marker icons. The priority of the custom component is higher than that
         * of the icon attributes.
         * @type { ?CustomBuilder }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        iconBuilder?: CustomBuilder;
    }
    /**
     * Provide the attributes of map circle
     *
     * @typedef MapCircleOptions
     * @extends BaseOverlayOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface MapCircleOptions extends BaseOverlayOptions {
        /**
         * The center position of the circle
         * Abnormal values are processed as no response.
         *
         * @type { LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        center: LatLng;
        /**
         * The radius of the circle
         * Abnormal values are handled according to the default values.
         *
         * @type { number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        radius: number;
        /**
         * Return whether the circle is clickable.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        clickable?: boolean;
        /**
         * The fill color of the circle.The color value is ARGB format.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 0x00000000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        fillColor?: number;
        /**
         * The stroke color of the circle.The color value is ARGB format.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 0xff000000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        strokeColor?: number;
        /**
         * The stroke pattern styles of the circle
         * Abnormal values are handled according to the default values.
         *
         * @type { ?Array<PatternItem> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        patterns?: Array<PatternItem>;
        /**
         * The stroke width of the circle
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 10
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        strokeWidth?: number;
    }
    /**
     * Provides the attributes of map polygon
     *
     * @typedef MapPolygonOptions
     * @extends BaseOverlayOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface MapPolygonOptions extends BaseOverlayOptions {
        /**
         * The coordinate point list of the polygon
         * Abnormal values are processed as no response.
         *
         * @type { Array<LatLng> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        points: Array<LatLng>;
        /**
         * The set of hollow holes in the polygon
         * Abnormal values are handled according to the default values.
         *
         * @type { ?Array<Array<LatLng>> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        holes?: Array<Array<LatLng>>;
        /**
         * Indicates whether the polygon is clickable.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        clickable?: boolean;
        /**
         * The fill color of the polygon.The color value is ARGB format.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 0x00000000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        fillColor?: number;
        /**
         * Indicates whether the polygon is drawn as a geodetic line.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        geodesic?: boolean;
        /**
         * The stroke color of the polygon.The color value is ARGB format.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 0xff000000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        strokeColor?: number;
        /**
         * the node type of polygon corner.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?JointType }
         * @default JointType.DEFAULT
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        jointType?: JointType;
        /**
         * The stroke pattern styles of the polygon
         * Abnormal values are handled according to the default values.
         *
         * @type { ?Array<PatternItem> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        patterns?: Array<PatternItem>;
        /**
         * Indicates the stroke width of the polygon.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 10
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        strokeWidth?: number;
    }
    /**
     * Provides the attributes of map polyline
     *
     * @typedef MapPolylineOptions
     * @extends BaseOverlayOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface MapPolylineOptions extends BaseOverlayOptions {
        /**
         * The coordinate point list of the polyline
         * Abnormal values are processed as no response.
         *
         * @type { Array<LatLng> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        points: Array<LatLng>;
        /**
         * Indicates whether the polyline is clickable.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        clickable?: boolean;
        /**
         * The color of the polyline.The color value is ARGB format.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 0xff000000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        color?: number;
        /**
         * The multiple colors of the polyline.The color value is ARGB format.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?Array<number> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        colors?: Array<number>;
        /**
         * The style of the start vertex of the polyline
         * Abnormal values are handled according to the default values.
         *
         * @type { ?CapStyle }
         * @default CapStyle.BUTT
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        startCap?: CapStyle;
        /**
         * The style of the end vertex of the polyline
         * Abnormal values are handled according to the default values.
         *
         * @type { ?CapStyle }
         * @default CapStyle.BUTT
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        endCap?: CapStyle;
        /**
         * Indicates whether the polyline is drawn as a geodetic line.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        geodesic?: boolean;
        /**
         * the node type of polyline corner.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?JointType }
         * @default JointType.DEFAULT
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        jointType?: JointType;
        /**
         * The stroke pattern styles of the polyline
         * Abnormal values are handled according to the default values.
         *
         * @type { ?Array<PatternItem> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        patterns?: Array<PatternItem>;
        /**
         * Indicates the width of the polyline.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 10
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        width?: number;
        /**
         * Indicates whether to enable the gradient color if there are multiple colors.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        gradient?: boolean;
        /**
         * Indicates the custom texture.Recommended that texture has no background color (use transparent color)
         *
         * @type { ?(ResourceStr | image.PixelMap) }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        customTexture?: ResourceStr | image.PixelMap;
        /**
         * Indicates multiple the custom textures.
         *
         * @type { ?Array<ResourceStr | image.PixelMap> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        customTextures?: Array<ResourceStr | image.PixelMap>;
        /**
         * Indicates the custom texture indexes corresponding to each point.
         *
         * @type { ?Array<number> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        customTextureIndexes?: Array<number>;
        /**
         * Whether to use the mapping mode for texture drawing. By default, the mapping mode is not used.
         * If use the mapping mode, the color of the polyline is ignored and recommended that the height of the texture image
         * should be close to the width of the polyline.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        isTextureMappingUsed?: boolean;
    }
    /**
     * This interface defines the priority overlay basic information.
     *
     * @typedef BasePriorityOverlayParams
     * @extends BaseOverlayOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface BasePriorityOverlayParams extends BaseOverlayOptions {
        /**
         * Indicates the position of the anchor point of the overlay icon in the horizontal direction. Value range: [0, 1]
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 0.5
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        anchorU?: number;
        /**
         * Indicates the position of the anchor point of the overlay icon in the vertical direction. Value range: [0, 1]
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default 1
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        anchorV?: number;
        /**
         * If this parameter is set to true, the overlay is still forcibly displayed after being collided.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        forceVisible?: boolean;
        /**
         * Indicates the collision priority. A larger value indicates a lower priority.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?number }
         * @default Number.MAX_VALUE
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        priority?: number;
        /**
         * Indicates the min display zoom.
         *
         * @type { ?number }
         * @default 2
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        minZoom?: number;
        /**
         * Indicates the max display zoom.
         *
         * @type { ?number }
         * @default 20
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        maxZoom?: number;
    }
    /**
     * Provides the attributes of point annotation.
     *
     * @typedef PointAnnotationParams
     * @extends BasePriorityOverlayParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface PointAnnotationParams extends BasePriorityOverlayParams {
        /**
         * The position of the point annotation.
         * Abnormal values are processed as no response.
         *
         * @type { LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        position: LatLng;
        /**
         * Indicates whether to support deduplication if the point annotation name is the same as the map poi name.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        repeatable?: boolean;
        /**
         * Indicates the conflict handling rules if the point annotation name is the same as the map poi name.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?CollisionRule }
         * @default CollisionRule.NAME
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        collisionRule?: CollisionRule;
        /**
         * Indicates the titles of the point annotation.The min length is 1, and the max length is 3.
         *
         * @type { Array<Text> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        titles: Array<Text>;
        /**
         * Indicates the icon of the point annotation. If not set, system will use the default icon.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        /**
         * Indicates the icon of the point annotation. If not set, system will use the default icon.
         *
         * @type { ?(string | image.PixelMap | Resource) }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        icon?: string | image.PixelMap | Resource;
        /**
         * Indicates whether to display the icon of the point annotation.
         * Abnormal values are handled according to the displayed icon.
         *
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        showIcon?: boolean;
        /**
         * Position of the text relative to the icon.
         *
         * @type { ?TextPosition }
         * @default TextPosition.DEFAULT
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        textPosition?: TextPosition;
    }
    /**
     * Provides the text of point annotation title.
     *
     * @typedef Text
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Text {
        /**
         * Indicates the title content.
         *
         * @type { string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        content: string;
        /**
         * Indicates the title color.The color value is ARGB format.
         *
         * @type { ?number }
         * @default 0xFF000000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        color?: number;
        /**
         * Indicates the name font size.
         *
         * @type { ?number }
         * @default 15
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        fontSize?: number;
        /**
         * Indicates the name stroke color.The color value is ARGB format.
         *
         * @type { ?number }
         * @default 0xFFFFFFFF
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        strokeColor?: number;
        /**
         * Indicates the name stroke width.
         *
         * @type { ?number }
         * @default 2
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        strokeWidth?: number;
        /**
         * Indicates the name font style.
         * Abnormal values are handled according to the default icon.
         *
         * @type { ?FontStyle }
         * @default FontStyle.REGULAR
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        fontStyle?: FontStyle;
    }
    /**
     * Provides the attributes of bubble for displaying congestion and speed measurement information.
     *
     * @typedef BubbleParams
     * @extends BasePriorityOverlayParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface BubbleParams extends BasePriorityOverlayParams {
        /**
         * Indicates the positions of the bubble.
         * The system calculates the proper positions of the icons based on the multiple position segments.
         * Abnormal values are processed as no response.
         *
         * @type { Array<Array<LatLng>> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        positions: Array<Array<LatLng>>;
        /**
         * Indicates the icons in the upper left and lower right positions which are the file URI format.
         * Abnormal values are processed as no response.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        /**
         * Indicates the icons in the upper left and lower right positions which are the file URI format.
         *
         * @type { Array<string | image.PixelMap | Resource> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        icons: Array<string | image.PixelMap | Resource>;
    }
    /**
     * Set the boundary padding for the map to define the visible area of the map.
     *
     * @typedef Padding
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Padding {
        /**
         * Indicates the added padding distance on the left of the map, in pixels.
         * Abnormal values are handled according to the default value.
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        left?: number;
        /**
         * Indicates the added padding distance on the top of the map, in pixels.
         * Abnormal values are handled according to the default value.
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        top?: number;
        /**
         * Indicates the added padding distance on the right of the map, in pixels.
         * Abnormal values are handled according to the default value.
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        right?: number;
        /**
         * Indicates the added padding distance on the bottom of the map, in pixels.
         * Abnormal values are handled according to the default value.
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        bottom?: number;
    }
    /**
     * Indicates the polygon formed by the longitude and latitude corresponding to the four vertices on the map.
     * The polygon is an irregular quadrilateral. If the map is not slanted, the visible area is rectangular.
     * If the map is slanted, the visible area is trapezoidal.
     *
     * @typedef VisibleRegion
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface VisibleRegion {
        /**
         * The upper left corner of the viewable area.
         *
         * @type  {LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        farLeft: LatLng;
        /**
         * The lower left corner of the viewable area.
         *
         * @type  {LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        nearLeft: LatLng;
        /**
         * The upper right corner of the visible area.
         *
         * @type  {LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        farRight: LatLng;
        /**
         * The lower right corner of the visible area.
         *
         * @type  {LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        nearRight: LatLng;
        /**
         * Longitude and latitude range formed by the four vertices of the visible area
         *
         * @type  {LatLngBounds}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        bounds: LatLngBounds;
    }
    /**
     * A point on a two-dimensional map projection.
     *
     * @typedef MapPoint
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface MapPoint {
        /**
         * Indicates the X coordinate of point.
         *
         * @type { number }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        positionX: number;
        /**
         * Indicates the Y coordinate of point.
         *
         * @type { number }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        positionY: number;
    }
    /**
     * The custom style options.
     *
     * @typedef CustomMapStyleOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface CustomMapStyleOptions {
        /**
         * The custom style id.The system queries the style content based on the style id.
         * If both styleId and styleContent are transferred, styleId will used.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        styleId?: string;
        /**
         * The custom style content, and the content format is json.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        styleContent?: string;
    }
    /**
     * The cluster item.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    abstract class ClusterItem {
        /**
         * The position of cluster item.
         *
         * @type { LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        position: LatLng;
    }
    /**
     * The cluster overlay parameters.
     *
     * @typedef ClusterOverlayParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface ClusterOverlayParams {
        /**
         * The cluster items.
         *
         * @type { Array<ClusterItem> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        clusterItems: Array<ClusterItem>;
        /**
         * The distance within which cluster items are aggregated, and the unit is vp.
         *
         * @type { number }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        distance: number;
        /**
         * Customizing icons based on aggregated items.
         *
         * @param { Array<ClusterItem> } clusterItems - Indicates the aggregated items.
         * @returns { Promise<image.PixelMap> } Return custom image.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getCustomIcon?(clusterItems: Array<ClusterItem>): Promise<image.PixelMap>;
    }
    /**
     * The image overlay parameters.
     *
     * @typedef ImageOverlayParams
     * @extends BaseOverlayOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface ImageOverlayParams extends BaseOverlayOptions {
        /**
         * Sets the position of the overlay based on a rectangular area.
         * position or bounds must be specified. If both are specified, bounds has a higher priority.
         *
         * @type { ?LatLngBounds }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        bounds?: LatLngBounds;
        /**
         * Set the position of the overlay according to the location.
         * position or bounds must be specified. If both are specified, bounds has a higher priority.
         *
         * @type { ?LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        position?: LatLng;
        /**
         * Indicates the icon width, and the unit is meter.This parameter is valid only when position is set.
         *
         * @type { ?number }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        width?: number;
        /**
         * Indicates the icon height, and the unit is meter.This parameter is valid only when position and width are set.
         *
         * @type { ?number }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        height?: number;
        /**
         * Indicates the position of the anchor point of the ImageOverlay's icon in the horizontal direction. Value range: [0, 1]
         *
         * @type { ?number }
         * @default 0.5
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        anchorU?: number;
        /**
         * Indicates the position of the anchor point of the ImageOverlay's icon in the vertical direction. Value range: [0, 1]
         *
         * @type { ?number }
         * @default 0.5
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        anchorV?: number;
        /**
         * Sets the angle clockwise from true north.True North is 0 degrees. If the value is a positive number, the image is rotated clockwise.
         * If the value is a negative number, the image is rotated counterclockwise.
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        bearing?: number;
        /**
         * Indicates whether is clickable.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        clickable?: boolean;
        /**
         * Indicates the image.
         *
         * @type { ResourceStr | image.PixelMap }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        image: ResourceStr | image.PixelMap;
        /**
         * Transparency of the overlay. The value range is [0, 1]. 0 indicates opaque, and 1 indicates fully transparent.
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        transparency?: number;
    }
    /**
     * The building overlay parameters.
     *
     * @typedef BuildingOverlayParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface BuildingOverlayParams {
        /**
         * The geometry coordinates of the base of the building.
         *
         * @type { Array<LatLng> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        points: Array<LatLng>;
        /**
         * Height of the building above the ground, and the unit is meter.
         *
         * @type { number }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        totalHeight: number;
        /**
         * Height from the bottom of the selected floor to the ground, and the unit is meter.
         *
         * @type { number }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        floorBottomHeight: number;
        /**
         * Color of the top of the building, and the color value is ARGB format.
         *
         * @type { ?number }
         * @default 0xffff0000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        topFaceColor?: number;
        /**
         * Color of the side of the building, and the color value is ARGB format.
         *
         * @type { ?number }
         * @default 0xffff0000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        sideFaceColor?: number;
        /**
         * Top color of selected floor, and the color value is ARGB format.
         *
         * @type { ?number }
         * @default 0xffff0000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        floorColor?: number;
        /**
         * Zoom at which the building starts to be displayed.
         *
         * @type { ?number }
         * @default 15
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        showLevel?: number;
        /**
         * Animation duration of the tower, and the unit is ms.
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        animationDuration?: number;
        /**
         * The side texture of the building.
         *
         * @type { ?BuildingTexture }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        sideTexture?: BuildingTexture;
        /**
         * Texture of the selected floor.
         *
         * @type { ?BuildingTexture }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        floorTexture?: BuildingTexture;
    }
    /**
     * The building texture.
     *
     * @typedef BuildingTexture
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface BuildingTexture {
        /**
         * Texture picture.
         *
         * @type { ResourceStr | image.PixelMap }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        image: ResourceStr | image.PixelMap;
        /**
         * Texture width, and the unit is meter.
         *
         * @type { ?number }
         * @default 3
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        width?: number;
        /**
         * Texture height, and the unit is meter.
         *
         * @type { ?number }
         * @default 3
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        height?: number;
    }
    /**
     * The trace overlay parameters.
     *
     * @typedef TraceOverlayParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface TraceOverlayParams {
        /**
         * The trace points.
         *
         * @type { Array<LatLng> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        points: Array<LatLng>;
        /**
         * The trace width.
         *
         * @type { ?number }
         * @default 10
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        width?: number;
        /**
         * The trace color.The color value is ARGB format.
         *
         * @type { ?number }
         * @default 0xaaff0000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        color?: number;
        /**
         * Sets whether the map and the trace moves together.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        isMapMoving?: boolean;
        /**
         * The trace animation duration, in ms.The minimum value is 100.
         *
         * @type { ?number }
         * @default 5000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        animationDuration?: number;
        /**
         * Current position of the listening trace.Return the index of the points.
         *
         * @type { ?Callback<number> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        animationCallback?: Callback<number>;
    }
    /**
     * The arc parameters.
     *
     * @typedef MapArcParams
     * @extends BaseOverlayOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface MapArcParams extends BaseOverlayOptions {
        /**
         * Indicates the start position.
         *
         * @type { LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        startPoint: LatLng;
        /**
         * Indicates the center position.
         *
         * @type { LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        centerPoint: LatLng;
        /**
         * Indicates the end position.
         *
         * @type { LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        endPoint: LatLng;
        /**
         * Indicates the arc color.The color value is ARGB format.
         *
         * @type { ?number }
         * @default 0xFFFFFFFF
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        color?: number;
        /**
         * Indicates the arc width.
         *
         * @type { ?number }
         * @default 10
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        width?: number;
    }
    /**
     * Specifying coordinates for a coordinate system.
     *
     * @typedef CoordinateLatLng
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface CoordinateLatLng {
        /**
         * Indicates the coordinate system type.
         *
         * @type { CoordinateType }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        coordinateType: CoordinateType;
        /**
         * Indicates the coordinate.
         *
         * @type { LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        location: LatLng;
    }
    /**
     * A border style type used to describe a circle, polygon, or polyline.
     *
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum CapStyle {
        /**
         * The two ends of the line are parallel lines.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        BUTT = 0,
        /**
         * Extend half a circle at both ends of the line.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        ROUND = 1,
        /**
         * Extend a rectangle at each end of the line.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        SQUARE = 2
    }
    /**
     * Indicates the conflict handling rules if the point annotation name is the same as the map poi name.
     *
     * @enum  {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum CollisionRule {
        /**
         * Both name and icon don't participate in collisions.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        NONE = 0,
        /**
         * Only name participate in collisions.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        NAME = 1,
        /**
         * Both name and icon can participate in collisions.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        ALL = 2
    }
    /**
     * Indicates the font style of point annotation title.
     *
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum FontStyle {
        /**
         * regular
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        REGULAR = 0,
        /**
         * bold
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        BOLD = 1,
        /**
         * italic
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        ITALIC = 2,
        /**
         * bold and italic
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        BOLD_ITALIC = 3,
        /**
         * medium
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        MEDIUM = 4,
        /**
         * medium and italic
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        MEDIUM_ITALIC = 5
    }
    /**
     * Coordinate System Type
     *
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum CoordinateType {
        /**
         * WGS84 Coordinate
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        WGS84 = 0,
        /**
         * GCJ02 Coordinate
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        GCJ02 = 1
    }
    /**
     * My location display type.
     *
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum MyLocationDisplayType {
        /**
         * Continuous location. The camera does not move to the center point of the map.
         * The positioning blue point moves with the device.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        DEFAULT = 0,
        /**
         * Location only once and move the view point to the center point of the map.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        LOCATE = 1,
        /**
         * Continuous location. The camera move to the center point of the map. The positioning blue point moves with the device.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        FOLLOW = 2,
        /**
         * Continuous location. The camera move to the center point of the map. The positioning blue point moves with the device
         * , and the location point rotates according to the device direction.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        FOLLOW_ROTATE = 3,
        /**
         * Continuous location. The location icon follows the device movement and rotates according to the device
         * direction, but will not move to the center of the map.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        TRACK_ROTATE = 4
    }
    /**
     * The map day or night mode.
     *
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum DayNightMode {
        /**
         * day mode
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        DAY = 0,
        /**
         * night mode
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        NIGHT = 1,
        /**
         * Auto mode. If the dark color switch is turned on, the night mode is displayed. Otherwise, the day mode is displayed.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        AUTO = 2
    }
    /**
     * Position of the text relative to the icon.
     *
     * @enum { number }
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum TextPosition {
        /**
         * default mode.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        DEFAULT = 0,
        /**
         * Text appears above the icon.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        TOP = 1,
        /**
         * Text appears below the icon.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        BOTTOM = 2,
        /**
         * Text appears to the left of the icon.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        LEFT = 3,
        /**
         * Text appears to the right of the icon.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        RIGHT = 4
    }
    /**
     * Map element type.
     *
     * @enum { number }
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum MapElementType {
        /**
         * Overlays, including MapCircle, MapPolygon, MapPolyline, MapArc, ImageOverlay, TraceOverly.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        OVERLAY = 1,
        /**
         * Base Map POI.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        POI = 2,
        /**
         * Include PointAnnotation, Bubble.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        CUSTOM_POI = 3,
        /**
         * Include Marker, ClusterOverlay.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        MARKER = 4
    }
    /**
     * Scale Unit
     *
     * @enum { number }
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.1.1(19)
     */
    enum ScaleUnit {
        /**
         * Metric Unit
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.1(19)
         */
        METRIC_UNIT = 0,
        /**
         * Imperial Unit
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.1(19)
         */
        IMPERIAL_UNIT = 1
    }
    /**
     * Tile overlay parameters.
     *
     * @typedef TileOverlayParams
     * @extends BaseOverlayOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface TileOverlayParams extends BaseOverlayOptions {
        /**
         * Tile download url template. The URL must contain placeholders {x}, {y}, and {z}.
         *
         * @type { string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        tileUrl: string;
        /**
         * Transparency of tile overlay. Value range is [0, 1], 0 is opaque and 1 is transparent.
         *
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        transparency?: number;
        /**
         * Whether the tile overlay is faded in.
         *
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        fadeIn?: boolean;
    }
    /**
     * TileOverlay options.
     * @extends BaseOverlayOptions
     * @typedef TileOverlayOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    interface TileOverlayOptions extends BaseOverlayOptions {
        /**
         * URL template for TileOverlay download. The URL must contain placeholders {x}, {y}, and {z}.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        tileUrl?: string;
        /**
         * Obtains a tile based on the tile coordinates.
         * @type { ?TileProvider }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        tileProvider?: TileProvider;
        /**
         * TileOverlay opacity. The value ranges from 0 to 1. The value <b class="+ topic/ph hi-d/b "
         * id="b164874369133">0</b> indicates opaque, and the value <b class="+ topic/ph hi-d/b "
         * id="b9480143615134">1</b> indicates transparent.
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        transparency?: number;
        /**
         * Indicates whether the TileOverlay supports fade-in.
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        fadeIn?: boolean;
        /**
         * Indicates whether to enable disk cache.
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        diskCacheEnabled?: boolean;
        /**
         * Disk cache size, in KB.
         * @type { ?number }
         * @default 20480
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        diskCacheSize?: number;
        /**
         * Disk cache path. It is mandatory if disk cache is enabled.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        diskCachePath?: string;
    }
    /**
     * Heatmap parameters.
     * @typedef HeatmapParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    interface HeatmapParams {
        /**
         * Heatmap ID.
         * @type { string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        id: string;
        /**
         * Heatmap data.
         * @type { WeightedLatLng[] }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        data: WeightedLatLng[];
        /**
         * Heatmap color, in ARGB format. The value ranges from 0 to 1. The key is the data density.
         *
         * @type { ?Record<number, number> }
         * @default { 0: 0x00026C39, 0.15: 0xAA138C4A, 0.3: 0xFF82CB67, 0.45: 0xFFE3F399,
         *            0.6: 0xFFFEDE89, 0.75: 0xFFF67C4A, 0.9: 0xFFBE1827, 1: 0xFFA90426 }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        color?: Record<number, number>;
        /**
         * The heatmap intensity can be configured at different zoom levels, or the same intensity can be used for
         * all zoom levels.
         * The intensity value must be greater than 0. The default value is 1.0.
         *
         *
         *
         *
         *
         * @type { ?(number | Record<number, number>) }
         * @default 1
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        intensity?: number | Record<number, number>;
        /**
         * The heatmap opacity can be configured at different zoom levels, or a single opacity can be used across
         * all zoom levels. The opacity value ranges from 0 to 1. <b class="+ topic/ph hi-d/b "
         * id="b196771537184911">0</b> indicates completely opaque, and <b class="+ topic/ph hi-d/b "
         * id="b165996476492">1</b> indicates completely transparent.
         *
         * @type { ?(number | Record<number, number>) }
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        opacity?: number | Record<number, number>;
        /**
         * The heatmap radius can be configured at different zoom levels, or a single radius can be used across
         * all zoom levels. The radius must be greater than or equal to 1. The default value is <b class="+ topic/ph
         * hi-d/b " id="b479519476489">10</b>.
         *
         * @type { ?(number | Record<number, number>) }
         * @default 10
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        radius?: number | Record<number, number>;
        /**
         * Radius unit.
         *
         * @type { ?RadiusUnit }
         * @default PIXEL_UNIT
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        radiusUnit?: RadiusUnit;
        /**
         * Indicates whether the heatmap is visible.
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        visible?: boolean;
    }
    /**
     * Radius unit.
     *
     * @enum { number }
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    enum RadiusUnit {
        /**
         * Pixel.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        PIXEL_UNIT = 0,
        /**
         * Meter.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        METER_UNIT = 1
    }
    /**
     * Weighted longitude and latitude.
     * @typedef WeightedLatLng
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    interface WeightedLatLng {
        /**
         * Longitude and latitude.
         * @type { LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        point: LatLng;
        /**
         * Weight of the intensity.
         * @type { ?number }
         * @default 1
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        intensity?: number;
    }
    /**
     * Tile provider.
     * @typedef { function } TileProvider
     * @param { number } x  - X coordinate.
     * @param { number } y  - Y coordinate.
     * @param { number } z  - Z coordinate.
     * @returns { Promise<ArrayBuffer> } Tile byte.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    type TileProvider = (x: number, y: number, z: number) => Promise<ArrayBuffer>;
    /**
     * Mvt overlay parameters.
     * @extends BaseOverlayOptions
     * @typedef MvtOverlayParams
     * @syscap SystemCapability.Map.Core.EnhancedOverlay
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    interface MvtOverlayParams extends BaseOverlayOptions {
        /**
         * mvt source.
         * @type { MvtSource }
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        source: MvtSource;
        /**
         * mvt layer array, used to config style.
         * @type { MvtLayer[] }
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        layers: MvtLayer[];
    }
    /**
     * Mvt Source
     * @typedef MvtSource
     * @syscap SystemCapability.Map.Core.EnhancedOverlay
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    interface MvtSource {
        /**
         * URL template for downloading the MvtOverlay. The URL must contain placeholders {x}, {y}, and {z}.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        tileUrl?: string;
        /**
         * Obtains tile data based on tile coordinates.
         * @type { ?TileProvider }
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        tileProvider?: TileProvider;
        /**
         * Indicates the min source zoom.
         * @type { ?number }
         * @default 2
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        minZoom?: number;
        /**
         * Indicates the max source zoom.
         * @type { ?number }
         * @default 20
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        maxZoom?: number;
    }
    /**
     * Mvt Layer
     * @typedef MvtLayer
     * @syscap SystemCapability.Map.Core.EnhancedOverlay
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    interface MvtLayer {
        /**
         * Unique layer id, used to add, update or remove layer.
         * @type { string }
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        id: string;
        /**
         * Layer type.
         * @type { MvtLayerType }
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        type: MvtLayerType;
        /**
         * Corresponds to the name field of the layer in the mvt data.
         * @type { string }
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        sourceLayer: string;
        /**
         * Used to configure rendering of geometry, such as fills, strokes, etc.
         * @type { ?MvtPaint }
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        paint?: MvtPaint;
    }
    /**
     * Used to configure rendering of geometry, such as fills, strokes, etc.
     * @typedef MvtPaint
     * @syscap SystemCapability.Map.Core.EnhancedOverlay
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    interface MvtPaint {
        /**
         * Fill color, support:
         * 1. Hexadecimal RGB format;
         * 2. Read from the property of the mvt data;
         * @type { ?(number | Expression) }
         * @default 0x000000
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        fillColor?: number | Expression;
        /**
         * Fill opacity, support:
         * 1. Number between 0 and 1 inclusive;
         * 2. Read from the property of the mvt data;
         * @type { ?(number | Expression) }
         * @default 0
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        fillOpacity?: number | Expression;
    }
    /**
     * Mvt Layer Type
     * @enum { string }
     * @syscap SystemCapability.Map.Core.EnhancedOverlay
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    enum MvtLayerType {
        /**
         * A filled polygon
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        FILL = 'fill'
    }
    /**
     * Mvt overlay expression.
     * @typedef Expression
     * @syscap SystemCapability.Map.Core.EnhancedOverlay
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    interface Expression {
        /**
         * Operator
         * @type { Operator }
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        operator: Operator;
        /**
         * Arguments
         * @type { string | string[] | Expression[] }
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        args: string | string[] | Expression[];
    }
    /**
     * Operator
     * @enum { string }
     * @syscap SystemCapability.Map.Core.EnhancedOverlay
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    enum Operator {
        /**
         * Get operator.
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        GET = 'get'
    }
    /**
     * FlowFieldOverlay parameters.
     * @extends BaseOverlayOptions
     * @typedef FlowFieldOverlayParams
     * @syscap SystemCapability.Map.Core.EnhancedOverlay
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    interface FlowFieldOverlayParams extends BaseOverlayOptions {
        /**
         * Flow field data.
         * @type { string }
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        data: string;
        /**
         * Particle style.
         * @type { ?ParticleStyle }
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        style?: ParticleStyle;
    }
    /**
     * Particle style.
     * @typedef ParticleStyle
     * @syscap SystemCapability.Map.Core.EnhancedOverlay
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    interface ParticleStyle {
        /**
         * Particle count.
         * @type { ?number }
         * @default 2000
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        count?: number;
        /**
         * Particle color, in ARGB format.
         * @type { ?number }
         * @default 0xffff69b4
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        color?: number;
        /**
         * Particle max speed.
         * @type { ?number }
         * @default 70
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        maxSpeed?: number;
        /**
         * Particle speed factor, and the range is [0,1].
         * @type { ?number }
         * @default 0.2
         * @syscap SystemCapability.Map.Core.EnhancedOverlay
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        speedFactor?: number;
    }
    /**
     * MassPointItem.
     * @typedef MassPointItem
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    interface MassPointItem {
        /**
         * Item ID.
         * @type { string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        itemId: string;
        /**
         * Longitude and latitude coordinates of an item.
         * @type { LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        position: LatLng;
        /**
         * Title.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        title?: string;
        /**
         * Snippet.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        snippet?: string;
    }
    /**
     * MassPointOverlay input parameters.
     * @typedef MassPointOverlayParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 6.0.0(20)
     */
    interface MassPointOverlayParams {
        /**
         * MassPointOverlay ID.
         * @type { string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        id: string;
        /**
         * MassPointItem list.
         * @type { MassPointItem[] }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        items: MassPointItem[];
        /**
         * MassPointOverlay icon.
         * @type { ResourceStr | image.PixelMap }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        icon: ResourceStr | image.PixelMap;
        /**
         * Position of an icon anchor in the horizontal direction. Value range: [0, 1]
         * @type { ?number }
         * @default 0.5
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        anchorU?: number;
        /**
         * Position of an icon anchor in the vertical direction. Value range: [0, 1]
         * @type { ?number }
         * @default 0.5
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 6.0.0(20)
         */
        anchorV?: number;
    }
}
export default mapCommon;
