/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2024. All rights reserved.
 */
/**
 * @file Defines liveView capability.
 * @kit LiveViewKit
 */
import type { WantAgent } from '@ohos.wantAgent';
import type image from '@ohos.multimedia.image';
/**
 * Manages liveView.
 *
 * @namespace liveViewManager
 * @syscap SystemCapability.LiveView.LiveViewService
 * @StageModelOnly
 * @since 4.1.0(11)
 */
declare namespace liveViewManager {
    /**
     * Checks whether this application allows to create liveView.
     *
     * @returns { Promise<boolean> } Returns the result of obtaining liveView enable status in the form of Promise.
     * @throws { BusinessError } 1003500001 - Internal error.
     * @throws { BusinessError } 1003500002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1003500003 - Failed to connect service.
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function isLiveViewEnabled(): Promise<boolean>;
    /**
     * start a liveView.
     *
     * @param { LiveView } liveView - a liveView.
     * @returns { Promise<LiveViewResult> } Returns the result of starting the liveView in the form of Promise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1003500001 - Internal error.
     * @throws { BusinessError } 1003500002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1003500003 - Failed to connect service.
     * @throws { BusinessError } 1003500004 - LiveView is not enabled.
     * @throws { BusinessError } 1003500005 - The right of liveView is not enabled.
     * @throws { BusinessError } 1003500006 - The liveView already exists.
     * @throws { BusinessError } 1003500007 - Couldn't connect to server.
     * @throws { BusinessError } 1003500008 - Over max number liveViews per second.
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function startLiveView(liveView: LiveView): Promise<LiveViewResult>;
    /**
     * update the liveView.
     *
     * @param { LiveView } liveView - a liveView.
     * @returns { Promise<LiveViewResult> } Returns the result of updating the liveView in the form of Promise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1003500001 - Internal error.
     * @throws { BusinessError } 1003500002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1003500003 - Failed to connect service.
     * @throws { BusinessError } 1003500004 - LiveView is not enabled.
     * @throws { BusinessError } 1003500008 - Over max number liveViews per second.
     * @throws { BusinessError } 1003500009 - The liveView does not exist.
     * @throws { BusinessError } 1003500010 - The liveView has ended.
     * @throws { BusinessError } 1003500011 - The liveView sequence is incorrect.
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function updateLiveView(liveView: LiveView): Promise<LiveViewResult>;
    /**
     * stop the liveView.
     *
     * @param { LiveView } liveView - a liveView.
     * @returns { Promise<LiveViewResult> } Returns the result of stopping the liveView in the form of Promise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1003500001 - Internal error.
     * @throws { BusinessError } 1003500002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1003500003 - Failed to connect service.
     * @throws { BusinessError } 1003500004 - LiveView is not enabled.
     * @throws { BusinessError } 1003500008 - Over max number liveViews per second.
     * @throws { BusinessError } 1003500009 - The liveView does not exist.
     * @throws { BusinessError } 1003500010 - The liveView has ended.
     * @throws { BusinessError } 1003500011 - The liveView sequence is incorrect.
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function stopLiveView(liveView: LiveView): Promise<LiveViewResult>;
    /**
     * Obtains the active liveView by id.
     *
     * @param { number } id - the liveView id
     * @returns { Promise<LiveView> } Returns the liveView.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1003500001 - Internal error.
     * @throws { BusinessError } 1003500002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1003500003 - Failed to connect service.
     * @throws { BusinessError } 1003500009 - The liveView does not exist.
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function getActiveLiveView(id: number): Promise<LiveView>;
    /**
     * Defines a LiveView instance.
     *
     * @typedef LiveView
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface LiveView {
        /**
         *  liveView id.
         *
         * @type { number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        id: number;
        /**
         * liveView scenario.
         *
         * @type { string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        event: string;
        /**
         * liveView sequence.
         *
         * @type { ?number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        sequence?: number;
        /**
         * Obtains the remind mode of the liveView. The default value is false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        isMute?: boolean;
        /**
         * The Timer of liveView.
         *
         * @type { ?LiveViewTimer }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        timer?: LiveViewTimer;
        /**
         * the liveView data.
         *
         * @type { LiveViewData }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        liveViewData: LiveViewData;
    }
    /**
     * liveView data.
     *
     * @typedef LiveViewData
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface LiveViewData {
        /**
         * primary content of liveView.
         *
         * @type { PrimaryData }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        primary: PrimaryData;
        /**
         * capsule content of liveView.
         *
         * @type { ?(TextCapsule | TimerCapsule | ProgressCapsule) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        capsule?: TextCapsule | TimerCapsule | ProgressCapsule;
        /**
         * external screen content of liveView.
         *
         * @type { ?ExternalData }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        external?: ExternalData;
    }
    /**
     * Defines a primary data of liveView instance.
     *
     * @typedef PrimaryData
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface PrimaryData {
        /**
         * the title of primary data of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        title?: string;
        /**
         * the content of primary data of liveView.
         *
         * @type { ?Array<RichText> }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        content?: Array<RichText>;
        /**
         * keep time when the liveView end.
         *
         * @type { ?number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        keepTime?: number;
        /**
         * The statics picture of liveView in lock screen.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        liveViewLockScreenPicture?: string | image.PixelMap;
        /**
         * The ability name of the liveview lock screen extension.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        liveViewLockScreenAbilityName?: string;
        /**
         * The paramters to create the liveview lock screen extension.
         *
         * @type { ?Record<string, string> }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        liveViewLockScreenAbilityParameters?: Record<string, string>;
        /**
         * WantAgent instance to which the liveView will be clicked.
         *
         * @type { ?WantAgent }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        clickAction?: WantAgent;
        /**
         * extension Content of liveView.
         *
         * @type { ?ExtensionData }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        extensionData?: ExtensionData;
        /**
         * flexible layout content of liveView.
         * ProgressLayout is used when the templateType is 3.
         * PickupLayout is used when the templateType is 4.
         * FlightLayout is used when the templateType is 5.
         * ScoreLayout is used when the templateType is 7.
         *
         * @type { ?(ProgressLayout | PickupLayout | FlightLayout | ScoreLayout) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        /**
         * flexible layout content of liveView.
         * ProgressLayout is used when the templateType is 3.
         * PickupLayout is used when the templateType is 4.
         * FlightLayout is used when the templateType is 5.
         * ScoreLayout is used when the templateType is 7.
         * NavigationLayout is used when the templateType is 8.
         *
         * @type { ?(ProgressLayout | PickupLayout | FlightLayout | ScoreLayout | NavigationLayout) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        layoutData?: ProgressLayout | PickupLayout | FlightLayout | ScoreLayout | NavigationLayout;
        /**
         * The background type of liveView.
         *
         * @type { ?BackgroundType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        backgroundType?: BackgroundType;
    }
    /**
     * Obtains the type of a liveView layout.
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum LayoutType {
        /**
         * Default layout that won't show the expansion area below.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LAYOUT_TYPE_DEFAULT = -1,
        /**
         * Layout for displaying progress.
         * Suitable for activities involving the display of progress nodes, such as delivery and drive progress.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LAYOUT_TYPE_PROGRESS = 3,
        /**
         * Layout of text highlighted with underlining in the expansion area.
         * Suitable for displaying key information such as pickup codes, license plate numbers.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LAYOUT_TYPE_PICKUP = 4,
        /**
         * Layout for displaying travel information, including departure and arrival points and times.
         * Suitable for displaying the start and end points such as trains and flights.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LAYOUT_TYPE_FLIGHT = 5,
        /**
         * Layout used to show score comparisons.
         * Suitable for displaying the scores of sports and game events.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LAYOUT_TYPE_SCORE = 7,
        /**
         * Layout for displaying navigation information.
         * Suitable for navigation applications.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        LAYOUT_TYPE_NAVIGATION = 8
    }
    /**
     * Defines a extension area content of liveView instance.
     *
     * @typedef ExtensionData
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface ExtensionData {
        /**
         * the text of extension area content of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        text?: string;
        /**
         * the type of extension area content.
         *
         * @type { ?ExtensionType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        type?: ExtensionType;
        /**
         * the picture of extension area content.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        pic?: string | image.PixelMap;
        /**
         * WantAgent instance to which the extension area will be clicked.
         *
         * @type { ?WantAgent }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        clickAction?: WantAgent;
    }
    /**
     * Define a basic capsule content of liveView instance.
     *
     * @typedef CapsuleData
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface CapsuleData {
        /**
         * the type of capsule content of liveView.
         *
         * @type { CapsuleType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        type: CapsuleType;
        /**
         * the status of capsule content of liveView.
         *
         * @type { number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        status: number;
        /**
         * the icon of capsule content of liveView.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        icon?: string | image.PixelMap;
        /**
         * the backgroundColor of capsule content of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        backgroundColor?: string;
        /**
         * Indicates whether to display the content area on the Capsule, The default value is true.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @since 5.0.3(15)
         */
        isContentDisplayed?: boolean;
        /**
         * the tail icon of capsule content of liveView.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        tailIcon?: string | image.PixelMap;
        /**
         * Indicates whether to display the tail icon area on the capsule, The default value is true.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        isTailIconDisplayed?: boolean;
    }
    /**
     * Define a text capsule content of liveView instance, when the type is 1.
     *
     * @extends CapsuleData
     * @typedef TextCapsule
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface TextCapsule extends CapsuleData {
        /**
         * the title of capsule content of liveView..
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        title?: string;
        /**
         * the content of capsule content of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        content?: string;
    }
    /**
     * Define a timer capsule content of liveView instance, when the type is 2.
     *
     * @extends CapsuleData
     * @typedef TimerCapsule
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface TimerCapsule extends CapsuleData {
        /**
         * the content of capsule content of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        content?: string;
        /**
         * the time of capsule content of liveView.
         *
         * @type { ?number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        time?: number;
        /**
         * Indicates whether the capsule of the timer type is countdown，The default value is false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        isCountdown?: boolean;
        /**
         * Indicates whether the capsule of the timer type pauses timing. The default value is false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        isPaused?: boolean;
    }
    /**
     * Define a progress capsule content of liveView instance, when the type is 2.
     *
     * @extends CapsuleData
     * @typedef ProgressCapsule
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface ProgressCapsule extends CapsuleData {
        /**
         * Maximum progress value of the progress bar.
         *
         * @type { ?number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        max?: number;
        /**
         * current progress value of the progress bar.
         *
         * @type { ?number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        progress?: number;
        /**
         * Specifies whether the progress is displayed as a percentage or in other forms. The default value is false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        indeterminate?: boolean;
        /**
         * The content of the liveView capsule.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        content?: string;
    }
    /**
     * Define a external screen content of liveView instance.
     *
     * @typedef ExternalData
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface ExternalData {
        /**
         * the title of external screen content of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        title?: string;
        /**
         * the content of external screen content of liveView.
         *
         * @type { ?Array<RichText> }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        content?: Array<RichText>;
        /**
         * the background type of external screen.
         *
         * @type { ?ExternalType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        type?: ExternalType;
        /**
         * the backgroundColor of external screen content of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        backgroundColor?: string;
        /**
         * the backgroundPicture of external screen content of liveView.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        backgroundPicture?: string | image.PixelMap;
    }
    /**
     * Define a basic layout data of liveView instance.
     *
     * @typedef LayoutData
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface LayoutData {
        /**
         * liveView template type.
         *
         * @type { LayoutType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        layoutType: LayoutType;
        /**
         * the weather infomation of liveView.
         *
         * @type { ?WeatherInfo }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        weatherInfo?: WeatherInfo;
        /**
         * the service buttons of liveView.
         *
         * @type { ?Array<ServiceButton> }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 5.1.1(19)
         */
        serviceButtons?: Array<ServiceButton>;
        /**
         * Obtains the display mode of the service buttons. The default value is false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 5.1.1(19)
         */
        isServiceButtonsDisplayed?: boolean;
    }
    /**
     * Define a progress layout instance.
     *
     * @extends LayoutData
     * @typedef ProgressLayout
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface ProgressLayout extends LayoutData {
        /**
         * the current value of progress layout.
         *
         * @type { number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        progress: number;
        /**
         * the color value of progress layout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        color?: string;
        /**
         * the backgroundColor value of progress layout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        backgroundColor?: string;
        /**
         * display type of indicator small icon, The default value is 0.
         * 0: The indicator icon is not displayed.
         * 1: displayed above the progress line.
         * 2: indicates that the display is overwritten on the progress line.
         *
         * @type { ?IndicatorType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        indicatorType?: IndicatorType;
        /**
         * indicator small icon.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        indicatorIcon?: string | image.PixelMap;
        /**
         * the lineType value of progress information, The default value is 0.
         * 0: display progress using dashed lines.
         * 1: display progress using solid lines.
         * 2: display progress using thick solid lines.
         *
         * @type { ?LineType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        lineType?: LineType;
        /**
         * Node icon on the progress bar of the extend area
         *
         * @type { ?Array<string|image.PixelMap> }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        nodeIcons?: Array<string | image.PixelMap>;
    }
    /**
     * Define the pickup layout data instance when the layoutType is 3.
     *
     * @extends LayoutData
     * @typedef PickupLayout
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface PickupLayout extends LayoutData {
        /**
         * The title of PickupLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        title?: string;
        /**
         * The content of PickupLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        content?: string;
        /**
         * underlineColor of the content.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        underlineColor?: string;
        /**
         * the desc picture of extend area content of liveView.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        descPic?: string | image.PixelMap;
    }
    /**
     * Define the flight layout data instance when the layoutType is 4.
     *
     * @extends LayoutData
     * @typedef FlightLayout
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface FlightLayout extends LayoutData {
        /**
         * The title on the left in FlightLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        firstTitle?: string;
        /**
         * The content on the left in FlightLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        firstContent?: string;
        /**
         * The title on the right in FlightLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        lastTitle?: string;
        /**
         * The content on the right in FlightLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        lastContent?: string;
        /**
         * Interval icon display in the middle of the FlightLayout
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        spaceIcon?: string | image.PixelMap;
        /**
         * Indicates whether to display the split line above the FlightLayout, The default value is true.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        isHorizontalLineDisplayed?: boolean;
        /**
         * Additional information in FlightLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        additionalText?: string;
        /**
         * Style classification in FlightLayout.
         *
         * @type { ?FlightLayoutStyle }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.2(14)
         */
        style?: FlightLayoutStyle;
        /**
         * Interval type display in the middle of the FlightLayout.
         *
         * @type { ?SpaceType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.2(14)
         */
        spaceType?: SpaceType;
        /**
         * Interval text display in the middle of the FlightLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.2(14)
         */
        spaceText?: string;
        /**
         * Superscript for the title on the right in FlightLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.2(14)
         */
        lastTitleSuperscript?: string;
        /**
         * Superscript for the content on the right in FlightLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.2(14)
         */
        lastContentSuperscript?: string;
    }
    /**
     * Define the score data instance when the layoutType is 7.
     *
     * @extends LayoutData
     * @typedef ScoreLayout
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface ScoreLayout extends LayoutData {
        /**
         * The name on the left in ScoreLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        hostName?: string;
        /**
         * The icon on the left in ScoreLayout.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        hostIcon?: string | image.PixelMap;
        /**
         * The score on the left in ScoreLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        hostScore?: string;
        /**
         * The name on the right in ScoreLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        guestName?: string;
        /**
         * The icon on the right in ScoreLayout.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        guestIcon?: string | image.PixelMap;
        /**
         * The score on the right in ScoreLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        guestScore?: string;
        /**
         * the score of Live activity, which is the description text at the top of the middle of the ScoreLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        /**
         * the score of Live activity, which is the description text at the top of the middle of the ScoreLayout.
         *
         * @type { ?(string | Array<RichText>) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        competitionDesc?: string | Array<RichText>;
        /**
         * the score of Live activity, which is the competition time of the ScoreLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        competitionTime?: string;
        /**
         * Indicates whether to display the split line above the ScoreLayout, The default value is true.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        isHorizontalLineDisplayed?: boolean;
    }
    /**
     * Define the navigation data instance when the layoutType is 8.
     *
     * @extends LayoutData
     * @typedef NavigationLayout
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 5.0.0(12)
     */
    export interface NavigationLayout extends LayoutData {
        /**
         * Icons for all navigation directions.
         *
         * @type { ?Array<string|image.PixelMap> }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        navigationIcons?: Array<string | image.PixelMap>;
        /**
         * Cunrrent Navigation icon.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        currentNavigationIcon?: string | image.PixelMap;
        /**
         * Indicates whether to display the navigationIcons on the NavigationLayout, The default value is true.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @since 5.0.3(15)
         */
        isNavigationIconsDisplayed?: boolean;
    }
    /**
     * Define a richText instance to display different text color.
     *
     * @typedef RichText
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface RichText {
        /**
         * text.
         *
         * @type { string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        text: string;
        /**
         * text color, the value is in the hexadecimal format of #ARGB.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        textColor?: string;
    }
    /**
     * Display type of extension data. Default value is 0;
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum ExtensionType {
        /**
         * default display type.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        EXTENSION_TYPE_DEFAULT = 0,
        /**
         * display type is common text.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        EXTENSION_TYPE_COMMON_TEXT = 1,
        /**
         * display type is capsule text.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        EXTENSION_TYPE_CAPSULE_TEXT = 2,
        /**
         * display type is the picture.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        EXTENSION_TYPE_PIC = 3,
        /**
         * display type is the icon of app.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        EXTENSION_TYPE_ICON = 4
    }
    /**
     * Display type of indicator. Default value is 0;
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum IndicatorType {
        /**
         * The indicator icon is not displayed.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        INDICATOR_TYPE_UNDISPLAYED = 0,
        /**
         * displayed above the progress line.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        INDICATOR_TYPE_UP = 1,
        /**
         * indicates that the display is overwritten on the progress line.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        INDICATOR_TYPE_OVERLAY = 2
    }
    /**
     * Display type of the progress bar in the layout. Default value is 0;
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum LineType {
        /**
         * dotted lines progress.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LINE_TYPE_DOTTED_LINE = 0,
        /**
         * solid line progress.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LINE_TYPE_NORMAL_SOLID_LINE = 1,
        /**
         * thick solid line progress.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LINE_TYPE_THICK_SOLID_LINE = 2
    }
    /**
     * Display type of capsule.
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum CapsuleType {
        /**
         * Text capsule.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        CAPSULE_TYPE_TEXT = 1,
        /**
         * Timer capsule.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        CAPSULE_TYPE_TIMER = 2,
        /**
         * progress capsule.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        CAPSULE_TYPE_PROGRESS = 3
    }
    /**
     * Indicates the return result of the data to operate liveView.
     *
     * @typedef LiveViewResult
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface LiveViewResult {
        /**
         * Indicates the result code returned after to start, update or end liveView.
         *
         * @type { number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        resultCode: number;
        /**
         * Indicates the message returned after to start, update or end liveView.
         *
         * @type { String }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        message: String;
    }
    /**
     * Define a timer instance to be used in liveView.
     *
     * @typedef LiveViewTimer
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 5.0.0(12)
     */
    export interface LiveViewTimer {
        /**
         * the time of liveView timer.
         *
         * @type { ?number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        time?: number;
        /**
         * Indicates whether the timer type is countdown，The default value is false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        isCountdown?: boolean;
        /**
         * Indicates whether the timer type pauses timing. The default value is false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        isPaused?: boolean;
        /**
         * the countdown preset value of extend area of liveView.
         *
         * @type { ?CountdownPreset }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        countdownPreset?: CountdownPreset;
        /**
         * the countdown preset value of time capsule.
         *
         * @type { ?CountdownPreset }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        capsuleCountdownPreset?: CountdownPreset;
    }
    /**
     * Background type of the external screen. Default value is background color;
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 5.0.0(12)
     */
    export enum ExternalType {
        /**
         * The background type is background color.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        BACKGROUND_COLOR = 0,
        /**
         * The background type is background picture.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        BACKGROUND_PICTURE = 1
    }
    /**
     * Style classification in FlightLayout. Default value is 0(STYLE_FLIGHT_EMPHASIS);
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 5.0.2(14)
     */
    export enum FlightLayoutStyle {
        /**
         * The style classification is emphasis.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.2(14)
         */
        STYLE_FLIGHT_EMPHASIS = 0,
        /**
         * The style classification is balance.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.2(14)
         */
        STYLE_FLIGHT_BALANCE = 1
    }
    /**
     * Interval type display in the middle of the FlightLayout. Default value is 0(SPACE_TYPE_ICON);
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 5.0.2(14)
     */
    export enum SpaceType {
        /**
         * The interval type is icon.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.2(14)
         */
        SPACE_TYPE_ICON = 0,
        /**
         * The interval type is text.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.2(14)
         */
        SPACE_TYPE_TEXT = 1
    }
    /**
     * Define a countdown preset object to be used in liveView.
     *
     * @typedef CountdownPreset
     * @syscap SystemCapability.LiveView.LiveViewService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    export interface CountdownPreset {
        /**
         * the title of liveView countdownPreset.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        presetTitle?: string;
        /**
         * the content of liveView countdownPreset.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        presetContent?: string;
    }
    /**
     * weather type. Default value is 0(WEATHER_TYPE_UNDEFINED);
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    export enum WeatherType {
        /**
         * The default weather type.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_UNDEFINED = 0,
        /**
         * The weather type is sunny.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_SUNNY = 1,
        /**
         * The weather type is hazy.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_HAZY = 5,
        /**
         * The weather type is cloudy.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_CLOUDY = 7,
        /**
         * The weather type is overcast.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_OVERCAST = 8,
        /**
         * The weather type is fog.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_FOG = 11,
        /**
         * The weather type is showers.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_SHOWERS = 12,
        /**
         * The weather type is thunder showers.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_T_STORMS = 15,
        /**
         * The weather type is rain.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_RAIN = 18,
        /**
         * The weather type is snow.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_SNOW = 22,
        /**
         * The weather type is rain and snow.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_RAIN_AND_SNOW = 29,
        /**
         * The weather type is hot.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_HOT = 30,
        /**
         * The weather type is cold.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_COLD = 31,
        /**
         * The weather type is windy.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_WINDY = 32,
        /**
         * The weather type is thundershower with hail.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_THUNDERSHOWER_WITH_HAIL = 45,
        /**
         * The weather type is light rain.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_LIGHT_RAIN = 46,
        /**
         * The weather type is moderate rain.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_MODERATE_RAIN = 47,
        /**
         * The weather type is heavy rain.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_HEAVY_RAIN = 48,
        /**
         * The weather type is rain storm.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_STORM = 49,
        /**
         * The weather type is severe rainstorm.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_SEVERE_STORM = 51,
        /**
         * The weather type is light snow.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_LIGHT_SNOW = 52,
        /**
         * The weather type is moderate snow.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_MODERATE_SNOW = 53,
        /**
         * The weather type is heavy snow.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_HEAVY_SNOW = 54,
        /**
         * The weather type is snow storm.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_SNOW_STORM = 55,
        /**
         * The weather type is dust storm.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_DUST_STORM = 56,
        /**
         * The weather type is dust.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_DUST = 65,
        /**
         * The weather type is sand.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_SAND = 66,
        /**
         * The weather type is sand storm.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        WEATHER_TYPE_SAND_STORM = 67
    }
    /**
     * weather location type.
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    export enum WeatherLocationType {
        /**
         * The weather locationtype is local.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        LOCATION_TYPE_LOCAL = 1,
        /**
         * The weather locationtype is destination.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        LOCATION_TYPE_DESTINATION = 2
    }
    /**
     * Define weather infomation to be used in liveView.
     *
     * @typedef WeatherInfo
     * @syscap SystemCapability.LiveView.LiveViewService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    export interface WeatherInfo {
        /**
         * the weathertype of liveView.
         *
         * @type { ?WeatherType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        weatherType?: WeatherType;
        /**
         * the locationType of weather.
         *
         * @type { ?WeatherLocationType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        locationType?: WeatherLocationType;
        /**
         * the high temperature of weather.
         *
         * @type { ?number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        highTemperature?: number;
        /**
         * the low temperature of weather.
         *
         * @type { ?number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        lowTemperature?: number;
    }
    /**
     * Define service button to be used in liveView.
     *
     * @typedef ServiceButton
     * @syscap SystemCapability.LiveView.LiveViewService
     * @stagemodelonly
     * @since 5.1.1(19)
     */
    export interface ServiceButton {
        /**
         * the name of service button.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 5.1.1(19)
         */
        name?: string;
        /**
         * the clickaction of service button.
         *
         * @type { ?WantAgent }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 5.1.1(19)
         */
        clickAction?: WantAgent;
    }
    /**
     * The enumeration values of background type of liveView.
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    export enum BackgroundType {
        /**
         * The undefined background type.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        SYS_BACKGROUND_UNDEFINED = 0,
        /**
         * The background type of moon viewing flight.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        SYS_BACKGROUND_FLIGHT_MOON = 100,
        /**
         * The background type of sunset flight.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        SYS_BACKGROUND_FLIGHT_SUNSET = 101
    }
}
export default liveViewManager;
