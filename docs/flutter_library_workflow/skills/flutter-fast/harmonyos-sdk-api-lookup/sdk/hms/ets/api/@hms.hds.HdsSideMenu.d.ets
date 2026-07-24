/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Defines the HdsSideMenu
 * @bundle com.huawei.hmos.hdscomponent/HdsComponent/ets/pages/HdsSideMenu 6.0.0(20)
 * @kit UIDesignKit
 */
import { Callback } from '@ohos.base';
/**
 * The callback function that will be invoked when the selectedIndex of the HdsSideMenu is changed.
 *
 * @typedef { function } OnSelectedIndexChange
 * @param { number } selectedIndex - the index of selected item
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export type OnSelectedIndexChange = (selectedIndex: number) => void;
/**
 * Defines the HdsSideMenu badge options.
 *
 * @interface BadgeParam
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export interface HdsSideMenuBadgeParam {
    /**
     * Set the number of reminder messages.
     * The default maximum badge count is 99.
     *
     * @type { ?number }
     * @default 0
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    count?: number;
    /**
     * Text string of the prompt content.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    value?: string;
}
/**
 * Defines the base HdsSideMenu param.
 *
 * @interface HdsSideMenuBaseItemParam
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export interface HdsSideMenuBaseItemParam {
    /**
     * Component ID of the HdsSideMenuItem.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    itemId?: string;
    /**
     * The label of the HdsSideMenu.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    label?: ResourceStr;
    /**
     * The callback of the HdsSideMenu.
     *
     * @type { ?Callback<void> }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    action?: Callback<void>;
}
/**
 * Defines the second-level HdsSideMenu param.
 *
 * @extends HdsSideMenuBaseItemParam
 * @interface HdsSideMenuSubItemParam
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export interface HdsSideMenuSubItemParam extends HdsSideMenuBaseItemParam {
    /**
     * HdsSideMenuItem badge icon container.
     *
     * @type { ?HdsSideMenuBadgeParam }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    badge?: HdsSideMenuBadgeParam;
}
/**
 * Defines the first-level HdsSideMenu param.
 *
 * @extends HdsSideMenuBaseItemParam
 * @interface HdsSideMenuMainItemParam
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export interface HdsSideMenuMainItemParam extends HdsSideMenuBaseItemParam {
    /**
     * The icon param of the first-level HdsSideMenu.
     * When both the icon and symbol values are assigned, the icon has a higher priority.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    icon?: ResourceStr;
    /**
     * The symbol param of the first-level HdsSideMenu.
     * When both the icon and symbol values are assigned, the icon has a higher priority.
     *
     * @type { ?SymbolGlyphModifier }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    symbol?: SymbolGlyphModifier;
    /**
     * Second-level HdsSideMenu item included
     *
     * @type { ?HdsSideMenuSubItem[] }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    hdsSideMenuSubItem?: HdsSideMenuSubItem[];
    /**
     * HdsSideMenuItem badge icon container.
     *
     * @type { ?HdsSideMenuBadgeParam }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    badge?: HdsSideMenuBadgeParam;
}
/**
 * Defines the first-level HdsSideMenuMainItem.
 *
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
@ObservedV2
export class HdsSideMenuMainItem {
    /**
     * The constructor of HdsSideMenuMainItem
     *
     * @param { HdsSideMenuMainItemParam } param - the param of the HdsSideMenuMainItem
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    constructor(param: HdsSideMenuMainItemParam);
    /**
     * Get the SideMenuSubItem
     *
     * @returns { HdsSideMenuSubItem[] } hdsSideMenuSubItem[] - The subitem of SideMenuMainItem.
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    getSideMenuSubItem(): HdsSideMenuSubItem[];
    /**
     * Set the Badge of HdsSideMenuMainItem
     *
     * @param { HdsSideMenuBadgeParam } [badge] - the badge of the HdsSideMenuMainItem
     * @returns { HdsSideMenuMainItem } hdsSideMenuMainItem - The string info of updated dabge.
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    updateBadge(badge?: HdsSideMenuBadgeParam): HdsSideMenuMainItem;
}
/**
 * Defines the Second-level HdsSideMenuSubItem.
 *
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
@ObservedV2
export class HdsSideMenuSubItem {
    /**
     * The constructor of HdsSideMenuSubItem
     *
     * @param { HdsSideMenuSubItemParam } param - the param of the HdsSideMenuSubItemParam
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    constructor(param: HdsSideMenuSubItemParam);
    /**
     * Set the Badge of HdsSideMenuSubItem
     *
     * @param { HdsSideMenuBadgeParam } [badge] - the badge of the HdsSideMenuSubItem
     * @returns { HdsSideMenuSubItem } hdsSideMenuSubItem - The string info of updated dabge.
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    updateBadge(badge?: HdsSideMenuBadgeParam): HdsSideMenuSubItem;
}
/**
 * Defines the HdsSideMenu Component.
 *
 * @struct { HdsSideMenu }
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
@ComponentV2
export declare struct HdsSideMenu {
    /**
     * The item of HdsSideMenu.
     *
     * @type { ?HdsSideMenuMainItem[] }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    items?: HdsSideMenuMainItem[];
    /**
     * Sets the selected index of the HdsSideMenu.
     *
     * @type { number }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    @Require
    selectedIndex: number;
    /**
     * Sets the callback function which will be invoked when the selected index of the HdsSideMenu is changed.
     *
     * @type { ?OnSelectedIndexChange }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Event
    $selectedIndex?: OnSelectedIndexChange;
    /**
     * Sets the maximum number of lines that can be displayed for a menu item.
     * @type { ?number }
     * @default 1
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    maxItemTextLines?: number;
    /**
     * The default builder function for struct, You should not need to invoke this method directly.
     *
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    build(): void;
}
