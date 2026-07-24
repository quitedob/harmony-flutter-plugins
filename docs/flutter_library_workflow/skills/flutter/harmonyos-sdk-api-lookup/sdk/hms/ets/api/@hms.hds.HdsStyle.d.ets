/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025. All rights reserved.
 */
/**
 * @file Defines the HDS styles
 * @bundle com.huawei.hmos.hdscomponent/HdsComponent/ets/pages/HdsStyle 6.0.0(20)
 * @kit UIDesignKit
 */
import { HdsListItemCardOptions, ImageOptions } from '@hms.hds.hdsBaseComponent';
import { ListItemModifier } from '@ohos.arkui.modifier';
/**
 * Defines the type of CustomTabBuilder.
 *
 * @typedef { function } CustomTabBuilder
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export declare type CustomTabBuilder = () => void;
/**
 * Sets the bleeding style.
 *
 * @param { CustomTabBuilder } builder - customized builder
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
@Builder
export declare function bleedIconStyle(builder: CustomTabBuilder): void;
/**
 * Defines the SwipeIconType property with SymbolGlyphModifier and ImageOptions.
 *
 * @typedef { SymbolGlyphModifier | ImageOptions} SwipeIconType
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @since 6.0.0(20)
 */
export declare type SwipeIconType = SymbolGlyphModifier | ImageOptions;
/**
 * Defines the HdsListItem SwipeAction options.
 *
 * @interface HdsSwipeActionOptions
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @since 6.0.0(20)
 */
export interface HdsSwipeActionOptions {
    /**
     * Options for icon swiping.
     * @type { ?Array<SwipeIconConfigurations> }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    icons?: Array<SwipeIconConfigurations>;
    /**
     * The deleteIconOptions of the swipeActionOptions.
     *
     * @type { ?DeleteIconOptions }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    deleteIconOptions?: DeleteIconOptions;
    /**
     * The fullDeleteOptions of the swipeActionOptions.
     *
     * @type { ?FullDeleteOptions }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    fullDeleteOptions?: FullDeleteOptions;
}
/**
 * Defines options for icon.
 * @interface IconOptions
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @since 6.0.0(20)
 */
export interface IconOptions {
    /**
     * Set the enable status of icon.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    enable?: boolean;
    /**
     * Set the accessibility text.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    accessibilityText?: ResourceStr;
    /**
     * Set the accessibility description.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    accessibilityDescription?: ResourceStr;
    /**
     * Set the accessibility level.
     *
     * @type { ?string }
     * @default "auto"
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    accessibilityLevel?: string;
}
/**
 * Defines options for icon swiping.
 * @interface SwipeIconConfigurations
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @since 6.0.0(20)
 */
export interface SwipeIconConfigurations {
    /**
     * The icontype of the icon.
     *
     * @type { SwipeIconType }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    icon: SwipeIconType;
    /**
     * The backgroundColor of the icon.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    backgroundColor?: ResourceColor;
    /**
     * The options of the icon.
     *
     * @type { ?IconOptions }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    iconOptions?: IconOptions;
    /**
     * The callback of the icon.
     *
     * @type { ?SwipeActionCallback }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    onAction?: SwipeActionCallback;
}
/**
 * Defines the HdsListItem DeleteIcon options.
 *
 * @interface DeleteIconOptions
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @since 6.0.0(20)
 */
export interface DeleteIconOptions {
    /**
     * The backgroundColor of the icon.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    backgroundColor?: ResourceColor;
    /**
     * The iconColor of the icon.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    iconColor?: ResourceColor;
    /**
     * The options of the icon.
     *
     * @type { ?IconOptions }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    iconOptions?: IconOptions;
    /**
     * The callback of the icon.
     *
     * @type { ?SwipeActionCallback }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    onAction?: SwipeActionCallback;
}
/**
 * Defines the HdsListItem FullDelete options.
 *
 * @interface FullDeleteOptions
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @since 6.0.0(20)
 */
export interface FullDeleteOptions {
    /**
     * Whether the icon is full deleted.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    isFullDelete?: boolean;
    /**
     * The callback of the icon.
     *
     * @type { ?SwipeActionCallback }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    onFullDeleteAction?: SwipeActionCallback;
}
/**
 * Function that swipe on action callback.
 *
 * @typedef {function} SwipeActionCallback
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @since 6.0.0(20)
 */
declare type SwipeActionCallback = () => void;
/**
 * Defines the HdsListItem Component.
 *
 * @struct { HdsListItem }
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @since 6.0.0(20)
 */
@Component
export declare struct HdsListItem {
    /**
     * The customBuilder card of HdsListItem.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    @BuilderParam
    customItemBuilder?: CustomBuilder;
    /**
     * HdsListItemCard options.
     *
     * @type { ?HdsListItemCardOptions }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    hdsListItemCard?: HdsListItemCardOptions;
    /**
     * SwipeAction options.
     *
     * @type { ?(HdsSwipeActionOptions | SwipeActionOptions) }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.0(20)
     */
    swipeActionOptions?: HdsSwipeActionOptions | SwipeActionOptions;
    /**
     * The modifier of ListItem.
     *
     * @type { ?ListItemModifier }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @since 6.0.1(21)
     */
    listItemModifier?: ListItemModifier;
}
