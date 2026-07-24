/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Defines the HdsActionBar
 * @bundle com.huawei.hmos.hdscomponent/HdsComponent/ets/pages/HdsActionBar 6.0.0(20)
 * @kit UIDesignKit
 */
import { LengthMetrics, ColorMetrics } from '@ohos.arkui.node';
import { Callback } from '@ohos.base';
import { ButtonModifier } from '@ohos.arkui.modifier';
import { BlurStrategy } from '@hms.hds.hdsBaseComponent';
/**
 * Defines the HdsActionBar.
 *
 * @struct { HdsActionBar }
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
@ComponentV2
export declare struct HdsActionBar {
    /**
     * Sets the primary button of the HdsActionBar.
     *
     * @type { ?ActionBarButton }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    primaryButton?: ActionBarButton;
    /**
     * Customizes the primary button.
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @BuilderParam
    primaryButtonBuilder?: CustomBuilder;
    /**
     * When the primary button is a CustomBuilder, the width of the primary button must be passed in by the user.
     * If the primaryButtonBuilderWidth is not passed in, there will be problems about the back panel width.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    primaryButtonBuilderWidth?: LengthMetrics;
    /**
     * Sets the start buttons of the HdsActionBar.
     *
     * @type { ?Array<ActionBarButton> }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    startButtons?: Array<ActionBarButton>;
    /**
     * Sets the end buttons of the HdsActionBar.
     *
     * @type { ?Array<ActionBarButton> }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    endButtons?: Array<ActionBarButton>;
    /**
     * Sets the style of the HdsActionBar.
     *
     * @type { ?ActionBarStyle }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    actionBarStyle?: ActionBarStyle;
    /**
     * Sets the isExpand status of the HdsActionBar.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    isExpand?: boolean;
    /**
     * Sets the callBack function of the isExpand status of the HdsActionBar.
     *
     * @type { ?Callback<boolean> }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Event
    $isExpand?: Callback<boolean>;
    /**
     * Sets the blur effective strategy for HdsActionBar.
     *
     * @type { ?BlurStrategy }
     * @default BlurStrategy.ADAPTIVE
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Param
    blurStrategy?: BlurStrategy;
}
/**
 * Defines the options of the ActionBarButtonOptions.
 *
 * @interface ActionBarButtonOptions
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export interface ActionBarButtonOptions {
    /**
     * Sets the width of the ActionBarButton.
     * Unit supports px, vp, fp, lpx, but doesn't support percent
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    width?: LengthMetrics;
    /**
     * Sets the backgroundColor of the ActionBarButton.
     *
     * @type { ?ColorMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    backgroundColor?: ColorMetrics;
    /**
     * Sets the shadow options or the shadow style of the button.
     *
     * @type { ?(ShadowOptions | ShadowStyle) }
     * @default ShadowStyle.OUTER_DEFAULT_LG
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    shadowStyle?: ShadowOptions | ShadowStyle;
    /**
     * Sets the enabled status of the ActionBarButton.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    enabled?: boolean;
    /**
     * Sets the onclick event of the ActionBarButton.
     *
     * @type { ?Callback<void> }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    onClick?: Callback<void>;
    /**
     * Sets the baseIcon of the ActionBarButton.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    baseIcon?: ResourceStr;
    /**
     * Sets the altIcon of the ActionBarButton.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    altIcon?: ResourceStr;
    /**
     * Sets the icon color of the ActionBarButton.
     *
     * @type { ?ColorMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    iconFillColor?: ColorMetrics;
    /**
     * Sets the icon size of the ActionBarButton.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    iconSize?: LengthMetrics;
    /**
     * Sets the baseIconSymbolGlyphModifier of the ActionBarButton.
     *
     * @type { ?SymbolGlyphModifier }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    baseIconSymbolGlyphModifier?: SymbolGlyphModifier;
    /**
     * Sets the altIconSymbolGlyphModifier of the ActionBarButton.
     *
     * @type { ?SymbolGlyphModifier }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    altIconSymbolGlyphModifier?: SymbolGlyphModifier;
    /**
     * Sets the accessibilityText of the ActionBarButton.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    accessibilityText?: ResourceStr;
    /**
     * Sets the accessibilityDescription of the ActionBarButton.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    accessibilityDescription?: ResourceStr;
    /**
     * Sets the accessibilityLevel of the ActionBarButton.
     *
     * @type { ?string }
     * @default "auto"
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    accessibilityLevel?: string;
    /**
     * Sets the ActionBarButton ID.
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    id?: string;
    /**
     * Sets the tips for the hover status of the button.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    hoverTips?: ResourceStr;
    /**
     * Sets the modifier of the ActionBarButton.
     *
     * @type { ?ButtonModifier }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    buttonModifier?: ButtonModifier;
}
/**
 * Defines ActionBarButton.
 *
 * @interface ActionBarButton
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
@ObservedV2
export declare class ActionBarButton {
    /**
     * Sets the width of the ActionBarButton.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    width?: LengthMetrics;
    /**
     * Sets the backgroundColor of the ActionBarButton.
     *
     * @type { ?ColorMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    backgroundColor?: ColorMetrics;
    /**
     * Sets the shadow options or the shadow style of the button.
     *
     * @type { ?(ShadowOptions | ShadowStyle) }
     * @default ShadowStyle.OUTER_DEFAULT_LG
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    shadowStyle?: ShadowOptions | ShadowStyle;
    /**
     * Sets the enabled status of the ActionBarButton.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    enabled?: boolean;
    /**
     * Sets the baseIcon of the ActionBarButton.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    baseIcon?: ResourceStr;
    /**
     * Sets the altIcon of the ActionBarButton.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    altIcon?: ResourceStr;
    /**
     * Sets the iconFillColor of the ActionBarButton.
     *
     * @type { ?ColorMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    iconFillColor?: ColorMetrics;
    /**
     * Sets the iconSize of the ActionBarButton.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    iconSize?: LengthMetrics;
    /**
     * Sets the baseIconSymbolGlyphModifier of the ActionBarButton.
     *
     * @type { ?SymbolGlyphModifier }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    baseIconSymbolGlyphModifier?: SymbolGlyphModifier;
    /**
     * Sets the altIconSymbolGlyphModifier of the ActionBarButton.
     *
     * @type { ?SymbolGlyphModifier }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    altIconSymbolGlyphModifier?: SymbolGlyphModifier;
    /**
     * Sets the accessibilityText of the ActionBarButton.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    accessibilityText?: ResourceStr;
    /**
     * Sets the accessibilityDescription of the ActionBarButton.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    accessibilityDescription?: ResourceStr;
    /**
     * Sets the accessibilityLevel of the ActionBarButton.
     *
     * @type { ?string }
     * @default "auto"
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    accessibilityLevel?: string;
    /**
     * Sets the ActionBarButton ID.
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    id?: string;
    /**
     * Sets the tips for the hover status of the button.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    hoverTips?: ResourceStr;
    /**
     * Sets the modifier of the ActionBarButton.
     *
     * @type { ?ButtonModifier }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    buttonModifier?: ButtonModifier;
    /**
     * The constructor of ActionBarButton
     *
     * @param { ActionBarButtonOptions } options - the options of the ActionBarButton
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    constructor(options: ActionBarButtonOptions);
}
/**
 * Defines the options of the ActionBarStyleOptions.
 *
 * @interface ActionBarStyleOptions
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export interface ActionBarStyleOptions {
    /**
     * Sets the height of the ActionBar.
     * Unit supports px, vp, fp, lpx, but doesn't support percent
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    height?: LengthMetrics;
    /**
     * Sets the backgroundBlurStyle of the ActionBar.
     * Unit supports px, vp, fp, lpx, but doesn't support percent.
     *
     * @type { ?BlurStyle }
     * @default BlurStyle.COMPONENT_REGULAR
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    backgroundBlurStyle?: BlurStyle;
    /**
     * Sets the backgroundColor of the ActionBarButton.
     *
     * @type { ?ColorMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    backgroundColor?: ColorMetrics;
    /**
     * Specifies the distance between two adjacent buttons.
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    innerSpace?: LengthMetrics;
    /**
     * Sets the distance between the start button left side and the left border of the button panel.
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    startSpace?: LengthMetrics;
    /**
     * Sets the distance between the end button right side and the right border of the button panel.
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    endSpace?: LengthMetrics;
    /**
     * Sets the enabled status of the ActionBar.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    enabled?: boolean;
    /**
     * Sets the horizontal status or the vertical status of the ActionBar.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    isHorizontal?: boolean;
    /**
     * Sets the changed status of the primary button icon.
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    isPrimaryIconChanged?: boolean;
}
/**
 * Defines ActionBarStyle.
 *
 * @interface ActionBarStyle
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
@ObservedV2
export declare class ActionBarStyle {
    /**
     * Sets the height of the ActionBarButton.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    height?: LengthMetrics;
    /**
     * Sets the backgroundBlurStyle of the ActionBarButton.
     *
     * @type { ?BlurStyle }
     * @default BlurStyle.COMPONENT_REGULAR
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    backgroundBlurStyle?: BlurStyle;
    /**
     * Sets the backgroundColor of the ActionBarButton.
     *
     * @type { ?ColorMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    backgroundColor?: ColorMetrics;
    /**
     * Specifies the distance between two adjacent buttons.
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    innerSpace?: LengthMetrics;
    /**
     * Sets the distance between the start button left side and the left border of the button panel.
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    startSpace?: LengthMetrics;
    /**
     * Sets the distance between the end button right side and the right border of the button panel.
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    endSpace?: LengthMetrics;
    /**
     * Sets the enabled status of the ActionBarButton.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    enabled?: boolean;
    /**
     * Sets the horizontal status or the vertical status of the ActionBar.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    isHorizontal?: boolean;
    /**
     * Sets the changed status of the primary button icon.
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    @Trace
    isPrimaryIconChanged?: boolean;
    /**
     * The constructor of ActionBarStyle
     *
     * @param { ActionBarStyleOptions } options - the options of the ActionBar
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    constructor(options: ActionBarStyleOptions);
}
