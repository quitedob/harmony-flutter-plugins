/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Defines the HdsSideBar
 * @bundle com.huawei.hmos.hdscomponent/HdsComponent/ets/pages/HdsSideBar 6.0.0(20)
 * @kit UIDesignKit
 */
import { Callback } from '@ohos.base';
/**
 * Declare struct HdsSideBar
 * @struct { HdsSideBar }
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
@ComponentV2
export declare struct HdsSideBar {
    /**
     * Indicates whether to set a mask in the overlay scenario.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    contentAreaMask?: boolean;
    /**
     * Sets the status of sidebar
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    isShowSideBar?: boolean;
    /**
     * Sets the callback that will be invoked when control button is clicked.
     *
     * @type { ?Callback<boolean> }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Event
    $isShowSideBar?: Callback<boolean>;
    /**
     * Sets the min length of sidebar.
     * default value is 200vp.
     *
     * @type { ?Length }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    minSideBarWidth?: Length;
    /**
     * Sets the max length of sidebar.
     * default value is 280vp.
     *
     * @type { ?Length }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    maxSideBarWidth?: Length;
    /**
     * Sets the min length of content.
     * default value is 360vp.
     *
     * @type { ?Length }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    minContentWidth?: Length;
    /**
     * Sets the background color of sideBar.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    sideBarColor?: ResourceColor;
    /**
     * Sets the background color of content.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    contentColor?: ResourceColor;
    /**
     * Sets the width of sidebar.
     * default value is 240vp.
     *
     * @type { ?Length }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    sideBarWidth?: Length;
    /**
     * Sets whether to automatically hide when drag sidebar width is less than the minimum width.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    autoHide?: boolean;
    /**
     * Sets whether the sidebar has a blur effect.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    isSideBarBlur?: boolean;
    /**
     * Sets the location of the sidebar.
     * default value is Start.
     *
     * @type { ?SideBarPosition }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    sideBarPosition?: SideBarPosition;
    /**
     * Sets the callback when HdsSideBar style of showing change finished.
     *
     * @type { ?Callback<boolean> }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    onChange?: Callback<boolean>;
    /**
     * Sets the SideBarPanel content.
     *
     * @type { CustomBuilder }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Require
    @BuilderParam
    sideBarPanelBuilder: CustomBuilder;
    /**
     * Sets the contentPanel content.
     *
     * @type { CustomBuilder }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Require
    @BuilderParam
    contentPanelBuilder: CustomBuilder;
    /**
     * The default builder function for struct, You should not need to invoke this method directly.
     *
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    build(): void;
    /**
     * Mode of the Sidebar Display.
     *
     * @type { ?SideBarContainerType }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    sideBarContainerType?: SideBarContainerType;
}
