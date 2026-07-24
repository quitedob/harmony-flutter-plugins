/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2025. All rights reserved.
 */
/**
 * @file This module provides the capability to manage navigation info.
 * @kit CarKit
 */
/**
 * This module provides the capability to manage navigation info.
 * @namespace navigationInfoMgr
 * @syscap SystemCapability.CarService.NavigationInfo
 * @since 4.1.0(11)
 */
declare namespace navigationInfoMgr {
    /**
     * Get single instance of NavigationController.
     *
     * @permission ohos.permission.ACCESS_SERVICE_NAVIGATION_INFO
     * @returns { NavigationController } - NavigationController instance.
     * @throws { BusinessError } 201 - Permission denied.
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 4.1.0(11)
     */
    /**
     * Get single instance of NavigationController.
     *
     * @permission ohos.permission.ACCESS_SERVICE_NAVIGATION_INFO
     * @returns { NavigationController } - NavigationController instance.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 6.0.0(20)
     */
    function getNavigationController(): NavigationController;
    /**
     * The map application uses this interface to inject navigation information into the system and register for system navigation event listening.
     * @typedef NavigationController
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 4.1.0(11)
     */
    interface NavigationController {
        /**
         * Set navigation status, including the navigation type, navigation destination, navigation passpoint, and route.
         *
         * @permission ohos.permission.ACCESS_SERVICE_NAVIGATION_INFO
         * @param { NavigationStatus } navigationStatus - Navigation status, including the navigation type,
         *     navigation destination, navigation passpoint, route, and map theme.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        /**
         * Set navigation status, including the navigation type, navigation destination, navigation passpoint, and route.
         *
         * @permission ohos.permission.ACCESS_SERVICE_NAVIGATION_INFO
         * @param { NavigationStatus } navigationStatus - Navigation status, including the navigation type,
         *     navigation destination, navigation passpoint, route, and map theme.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 1003810001 - Invalid parameter value.
         * @throws { BusinessError } 1003810002 - The total size of all parameters exceeds the limit.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 6.0.0(20)
         */
        updateNavigationStatus(navigationStatus: NavigationStatus): void;
        /**
         * Set navigation metadata, including TBT information, roads, and electronic eyes.
         *
         * @permission ohos.permission.ACCESS_SERVICE_NAVIGATION_INFO
         * @param { NavigationMetadata } navigationMetadata - Navigation metadata,
         *     including TBT information, roads, and electronic eyes.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        /**
         * Set navigation metadata, including TBT information, roads, and electronic eyes.
         *
         * @permission ohos.permission.ACCESS_SERVICE_NAVIGATION_INFO
         * @param { NavigationMetadata } navigationMetadata - Navigation metadata,
         *     including TBT information, roads, and electronic eyes.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 1003810001 - Invalid parameter value.
         * @throws { BusinessError } 1003810002 - The total size of all parameters exceeds the limit.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 6.0.0(20)
         */
        updateNavigationMetadata(navigationMetadata: NavigationMetadata): void;
        /**
         * Registers and listens to system navigation information and instructions.
         *     This method is invoked when the map application is started.
         *
         * @permission ohos.permission.ACCESS_SERVICE_NAVIGATION_INFO
         * @param { SystemNavigationListener } listener - System navigation listener.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        /**
         * Registers and listens to system navigation information and instructions.
         *     This method is invoked when the map application is started.
         *
         * @permission ohos.permission.ACCESS_SERVICE_NAVIGATION_INFO
         * @param { SystemNavigationListener } listener - System navigation listener.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 1003810001 - Invalid parameter value.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 6.0.0(20)
         */
        registerSystemNavigationListener(listener: SystemNavigationListener): void;
        /**
         * Unregister the monitoring system navigation information and instructions.
         *
         * @permission ohos.permission.ACCESS_SERVICE_NAVIGATION_INFO
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        /**
         * Unregister the monitoring system navigation information and instructions.
         *
         * @permission ohos.permission.ACCESS_SERVICE_NAVIGATION_INFO
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 6.0.0(20)
         */
        unregisterSystemNavigationListener(): void;
    }
    /**
     * System navigation event listener.
     * @typedef SystemNavigationListener
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 4.1.0(11)
     */
    interface SystemNavigationListener {
        /**
         * Listening to system query events.
         * @param { QueryType } query - Query Command.
         * @param { Record<string, Object> } args - Additional parameters of query command.
         * @returns { Promise<ResultData> } - The promise returned by the function.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        onQueryNavigationInfo(query: QueryType, args: Record<string, Object>): Promise<ResultData>;
        /**
         * Listening to system command events.
         * @param { CommandType } command - Commands that need to be executed by the map application for system services.
         * @param { Record<string, Object> } args - Additional parameters of commands.
         * @returns { Promise<ResultData> } - The promise returned by the function.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        onReceiveNavigationCmd(command: CommandType, args: Record<string, Object>): Promise<ResultData>;
    }
    /**
     * Navigation query or command result data.
     * @typedef ResultData
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 4.1.0(11)
     */
    interface ResultData {
        /**
         * Result data code.
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        code: number;
        /**
         * Result data message.
         * @type { string }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        message: string;
        /**
         * Result additional Data.
         * @type { object }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        data: {
            [key: string]: object;
        };
    }
    /**
     * Navigation status.
     * @typedef NavigationStatus
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 4.1.0(11)
     */
    interface NavigationStatus {
        /**
         * Map status.
         * @type { MapStatus }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        status: MapStatus;
        /**
         * Navigation type.
         * @type { NaviType }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        naviType: NaviType;
        /**
         * When status is MapStatus.NAVIGATION, this field indicates the destination address. When status is MapStatus.POI, this field indicates POI information.
         * @type { Location }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        destLocation: Location;
        /**
         * Pass point.
         * @type { Location[] }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        passPoint: Location[];
        /**
         * Route index.
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        routeIndex: number;
        /**
         * Route preference.
         * @type { RoutePreference[] }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        routePreference: RoutePreference[];
        /**
         * Map theme color.
         * @type { ThemeType }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        theme: ThemeType;
        /**
         * Custom data.
         * @type { String }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        customData: String;
    }
    /**
     * Navigation metadata.
     * @typedef NavigationMetadata
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 4.1.0(11)
     */
    interface NavigationMetadata {
        /**
         * Navigation TBT turn mode.
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        naviTurnMode: number;
        /**
         * Remaining distance of the next action, that is, the guide distance.
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        segmentLeftDis: number;
        /**
         * Current road name.
         * @type { string }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        currentRoadName: string;
        /**
         * Next road name.
         * @type { string }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        nextRoadName: string;
        /**
         * Intersection view.
         * @type { string }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        intersectionView: string;
        /**
         * Width of Intersection view. Unit: pixel.
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        viewWidth: number;
        /**
         * Height of Intersection view. Unit: pixel.
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        viewHeight: number;
        /**
         * Lane lines, in order from the far left to the last side. Each element corresponds to a direction.
         * @type { string }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        trafficLane: string;
        /**
         * Electronic eye speed limit valid flag.
         * @type { boolean }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        cameraSpeedLimitValid: boolean;
        /**
         * Electronic eye speed limit value.
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        cameraSpeedLimit: number;
        /**
         * Navigation speed limit valid flag.
         * @type { boolean }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        naviSpeedLimitValid: boolean;
        /**
         * Navigation speed limit value.
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        naviSpeedLimit: number;
        /**
         * Current vehicle speed. Unit: m/s.
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        currentSpeed: number;
        /**
         * Navigation direction angle, relative to due north.
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        naviBearing: number;
        /**
         * Remaining distance of the whole journey.Unit: m
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        totalLeftDis: number;
        /**
         * Remaining time of the journey. Unit: min.
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        remainingTime: number;
        /**
         * Custom Data.
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 5.0.0(12)
         */
        customData?: Record<string, Object>;
    }
    /**
     * Map status.
     * @enum { number }
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 4.1.0(11)
     */
    enum MapStatus {
        /**
         * The map is in idle state. Note: This parameter is used by default when the map application is not started.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        IDLE = 0,
        /**
         * The map is in navigation.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        NAVIGATION = 1,
        /**
         * The map is on cruise.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        CRUISE = 2,
        /**
         * The map is in the map point selection state.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        POI = 3,
        /**
         * The map is in route selection state.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        ROUTE = 4,
        /**
         * The map service is not available. Note: This parameter is set when the map application cannot provide services due to an internal error.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        UNAVAILABLE = 5
    }
    /**
     * Navigation type.
     * @enum { number }
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 4.1.0(11)
     */
    enum NaviType {
        /**
         * DRIVING.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        DRIVING = 0,
        /**
         * MOTORCYCLE.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        MOTORCYCLE = 1,
        /**
         * CYCLING.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        CYCLING = 2,
        /**
         * WALKING.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        WALKING = 3
    }
    /**
     * Location coordinate coding type.
     * @enum { number }
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 4.1.0(11)
     */
    enum LocationCoordType {
        /**
         * GCJ02.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        GCJ02 = 0,
        /**
         * WGS84.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        WGS84 = 1
    }
    /**
     * Location information.
     * @typedef Location
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 4.1.0(11)
     */
    interface Location {
        /**
         * Address Name.
         * @type { string }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        name: string;
        /**
         * Location coordinate coding type.
         * @type { LocationCoordType }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        coordType: LocationCoordType;
        /**
         * Longitude.
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        longitude: number;
        /**
         * Latitude.
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        latitude: number;
        /**
         * Altitude. Default value: 0. Unit: m.
         * @type { number }
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        altitude: number;
    }
    /**
     * Map theme type.
     * @enum { number }
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 4.1.0(11)
     */
    enum ThemeType {
        /**
         * LIGHT.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        LIGHT = 0,
        /**
         * DARK.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        DARK = 1
    }
    /**
     * Route preference type
     * @enum { number }
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 4.1.0(11)
     */
    enum RoutePreference {
        /**
         * Intelligent recommendation.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        INTELLIGENT_RECOMMENDATION = 0,
        /**
         * Highway first.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        HIGHWAY_FIRST = 1,
        /**
         * Avoid highway.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        AVOID_HIGHWAY = 2,
        /**
         * Avoid congestion.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        AVOID_CONGESTION = 3,
        /**
         * Less charge.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        LESS_CHARGE = 4,
        /**
         * Main road first.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        MAIN_ROAD_FIRST = 5,
        /**
         * Time first.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        TIME_FIRST = 6
    }
    /**
     * Query command type.
     * @enum { string }
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 4.1.0(11)
     */
    enum QueryType {
        /**
         * Querying navigation status.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        NAVIGATION_STATUS = 'navigationStatus',
        /**
         * Querying information such as navigation TBT.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        NAVIGATION_METADATA = 'navigationMetadata'
    }
    /**
     * Command type.
     * @enum { string }
     * @syscap SystemCapability.CarService.NavigationInfo
     * @since 4.1.0(11)
     */
    enum CommandType {
        /**
         * Start navigation.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        START_NAVIGATION = 'startNavigation',
        /**
         * Stop navigation.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        STOP_NAVIGATION = 'stopNavigation',
        /**
         * Go home.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        GO_HOME = 'goHome',
        /**
         * Go to company.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        GO_TO_COMPANY = 'goToCompany',
        /**
         * Launch map layers to other screens.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        START_MAP_LAYER = 'startMapLayer',
        /**
         * Destroy map layers on other screens.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        STOP_MAP_LAYER = 'stopMapLayer',
        /**
         * Zoom in on the map.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        ZOOM_IN_MAP = 'zoomInMap',
        /**
         * Zoom out on the map.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        ZOOM_OUT_MAP = 'zoomOutMap',
        /**
         * Change map theme.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 4.1.0(11)
         */
        CHANGE_THEME = 'changeTheme',
        /**
         * Start update navigation status.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 5.0.0(12)
         */
        START_UPDATE_NAVIGATION_STATUS = 'startUpdateNavigationStatus',
        /**
         * Stop update navigation status.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 5.0.0(12)
         */
        STOP_UPDATE_NAVIGATION_STATUS = 'stopUpdateNavigationStatus',
        /**
         * Search POI.
         * @syscap SystemCapability.CarService.NavigationInfo
         * @since 5.1.0(18)
         */
        SEARCH_POI = 'searchPOI'
    }
}
export default navigationInfoMgr;
