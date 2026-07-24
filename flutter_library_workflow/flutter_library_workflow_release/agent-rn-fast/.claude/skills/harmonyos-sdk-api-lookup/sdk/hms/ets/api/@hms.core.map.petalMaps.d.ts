/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Provide the ability to open petal maps app.
 * @kit MapKit
 */
import type common from '@ohos.app.ability.common';
import type mapCommon from '@hms.core.map.mapCommon';
/**
 * Provide the ability to open petal maps app.
 *
 * @namespace petalMaps
 * @syscap SystemCapability.Map.Core
 * @stagemodelonly
 * @since 5.0.3(15)
 */
declare namespace petalMaps {
    /**
     * Open the home page of map app.
     * @param { common.Context } context - The context of an ability.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    /**
     * Open the home page of map app.
     * @param { common.Context } context - The context of an ability.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @throws { BusinessError } 801 - Capability not supported. Failed to call the API due to limited device capabilities.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function openMapHomePage(context: common.Context): Promise<void>;
    /**
     * Open the poi detail page of map app.
     * @param { common.Context } context - The context of an ability.
     * @param { PoiDetailParams } poiDetailParams - The poi detail parameters.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    /**
     * Open the poi detail page of map app.
     * @param { common.Context } context - The context of an ability.
     * @param { PoiDetailParams } poiDetailParams - The poi detail parameters.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @throws { BusinessError } 801 - Capability not supported. Failed to call the API due to limited device capabilities.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function openMapPoiDetail(context: common.Context, poiDetailParams: PoiDetailParams): Promise<void>;
    /**
     * Open the text search page of map app.
     * @param { common.Context } context - The context of an ability.
     * @param { TextSearchParams } textSearchParams - The text search parameters.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    /**
     * Open the text search page of map app.
     * @param { common.Context } context - The context of an ability.
     * @param { TextSearchParams } textSearchParams - The text search parameters.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @throws { BusinessError } 801 - Capability not supported. Failed to call the API due to limited device capabilities.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function openMapTextSearch(context: common.Context, textSearchParams: TextSearchParams): Promise<void>;
    /**
     * Open the route plan page of map app.
     * @param { common.Context } context - The context of an ability.
     * @param { RoutePlanParams } routePlanParams - The route plan parameters.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    /**
     * Open the route plan page of map app.
     * @param { common.Context } context - The context of an ability.
     * @param { RoutePlanParams } routePlanParams - The route plan parameters.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @throws { BusinessError } 801 - Capability not supported. Failed to call the API due to limited device capabilities.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function openMapRoutePlan(context: common.Context, routePlanParams: RoutePlanParams): Promise<void>;
    /**
     * Open the navigation page of map app.
     * @param { common.Context } context - The context of an ability.
     * @param { NaviParams } naviParams - The navigation parameters.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    /**
     * Open the navigation page of map app.
     * @param { common.Context } context - The context of an ability.
     * @param { NaviParams } naviParams - The navigation parameters.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @throws { BusinessError } 801 - Capability not supported. Failed to call the API due to limited device capabilities.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.1.0(18)
     */
    function openMapNavi(context: common.Context, naviParams: NaviParams): Promise<void>;
    /**
     * Opens the ride-hailing page of the map app.
     * @param { common.Context } context  - Ability context.
     * @param { TaxiParams } taxiParams  - Ride hailing parameters.
     * @returns { Promise<void> }
     * @throws { BusinessError } 1002600014 - Failed to start the map app.
     * @throws { BusinessError } 801 - Capability not supported. Failed to call the API due to limited device
     * capabilities.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 6.0.1(21)
     */
    function openMapTaxi(context: common.Context, taxiParams: TaxiParams): Promise<void>;
    /**
     * Poi detail params.
     * @typedef PoiDetailParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    interface PoiDetailParams {
        /**
         * destination position.
         * @type { mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationPosition: mapCommon.LatLng;
        /**
         * destination name.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationName?: string;
        /**
         * destination poi id.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationPoiId?: string;
        /**
         * Map zoom level.
         * @type { ?number }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        zoom?: number;
        /**
         * Map coordinate system type.
         * @type { ?mapCommon.CoordinateType }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        coordinateType?: mapCommon.CoordinateType;
    }
    /**
     * Text search params.
     * @typedef TextSearchParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    interface TextSearchParams {
        /**
         * destination name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationName?: string;
    }
    /**
     * Route params.
     * @typedef RoutePlanParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    interface RoutePlanParams {
        /**
         * origin position.
         * @type { ?mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        originPosition?: mapCommon.LatLng;
        /**
         * origin name.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        originName?: string;
        /**
         * origin poi id.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        originPoiId?: string;
        /**
         * destination position.
         * @type { mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationPosition: mapCommon.LatLng;
        /**
         * destination name.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationName?: string;
        /**
         * destination poi id.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationPoiId?: string;
        /**
         * vehicle type.
         * @type { ?VehicleType }
         * @default DRIVING
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        vehicleType?: VehicleType;
        /**
         * Map coordinate system type.
         * @type { ?mapCommon.CoordinateType }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        coordinateType?: mapCommon.CoordinateType;
    }
    /**
     * Navigation params.
     * @typedef NaviParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    interface NaviParams {
        /**
         * destination position.
         * @type { mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationPosition: mapCommon.LatLng;
        /**
         * destination name.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationName?: string;
        /**
         * destination poi id.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        destinationPoiId?: string;
        /**
         * vehicle type.
         * @type { ?VehicleType }
         * @default DRIVING
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        vehicleType?: VehicleType;
        /**
         * Coordinates of the origin.
         * @type { ?mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        originPosition?: mapCommon.LatLng;
        /**
         * Origin name.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        originName?: string;
        /**
         * Origin POI ID.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        originPoiId?: string;
        /**
         * Map coordinate system type.
         * @type { ?mapCommon.CoordinateType }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        coordinateType?: mapCommon.CoordinateType;
    }
    /**
     * Vehicle type.
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    enum VehicleType {
        /**
         * Driving type.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        DRIVING = 0,
        /**
         * Walking type.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        WALKING = 1,
        /**
         * Cycling type.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        CYCLING = 2,
        /**
         * Transit type.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        TRANSIT = 3
    }
    /**
     * Ride-hailing parameters.
     * @typedef TaxiParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @since 6.0.1(21)
     */
    interface TaxiParams {
        /**
         * Location of the departure place.
         * @type { ?mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        originPosition?: mapCommon.LatLng;
        /**
         * Name of the departure place.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        originName?: string;
        /**
         * POI ID of the departure place.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        originPoiId?: string;
        /**
         * Location of the destination.
         * @type { mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        destinationPosition: mapCommon.LatLng;
        /**
         * Name of the destination.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        destinationName?: string;
        /**
         * POI ID of the destination.
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        destinationPoiId?: string;
        /**
         * Coordinate system type.
         * @type { ?mapCommon.CoordinateType }
         * @default CoordinateType.GCJ02
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @since 6.0.1(21)
         */
        coordinateType?: mapCommon.CoordinateType;
    }
}
export default petalMaps;
