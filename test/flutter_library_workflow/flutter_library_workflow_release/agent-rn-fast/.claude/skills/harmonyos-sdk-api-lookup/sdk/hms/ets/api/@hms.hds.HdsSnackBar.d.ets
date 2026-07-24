/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Defines the HdsSnackBar
 * @bundle com.huawei.hmos.hdscomponent/HdsComponent/ets/pages/HdsSnackBar 6.0.0(20)
 * @kit UIDesignKit
 */
import { LengthMetrics, ColorMetrics } from '@ohos.arkui.node';
import { SymbolGlyphModifier } from '@ohos.arkui.modifier';
import { BlurStrategy } from '@hms.hds.hdsBaseComponent';
/**
 * Defines the HdsSnackBar class.
 *
 * @interface { HdsSnackBar }
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export class HdsSnackBar {
    /**
     * The constructor of HdsSnackBar.
     *
     * @param { UIContext } uiContext - the uiContext of Application
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    constructor(uiContext: UIContext);
    /**
     * Show HdsSnackBar.
     *
     * @param { SnackBarIconOptions } icon - the start icon of the SnackBar
     * @param { SnackBarMessageOptions } message - the middle message of the SnackBar
     * @param { SnackBarOperationOptions } operation - the operation of the SnackBar
     * @param { SnackBarStyleOptions } [style] - the style of the SnackBar
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    show(icon: SnackBarIconOptions, message: SnackBarMessageOptions, operation: SnackBarOperationOptions, style?: SnackBarStyleOptions): void;
    /**
     * Dismiss HdsSnackBar.
     *
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    dismiss(): void;
}
/**
 * Defines the options of the SnackBarIcon.
 *
 * @interface SnackBarIconOptions
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export interface SnackBarIconOptions {
    /**
     * Sets the icon of the SnackBarIconOptions, support SymbolGlyph and Image.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    icon?: ResourceStr;
    /**
     * Sets the icon type of the SnackBarIconOptions.
     *
     * @type { ?SnackBarIconType }
     * @default SnackBarIconType.SMALL
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    iconType?: SnackBarIconType;
    /**
     * Sets the icon modifier of the SnackBarIconOptions.
     *
     * @type { ?ImageModifier }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    iconModifier?: ImageModifier;
    /**
     * Sets the icon modifier for the SnackBar.
     * @type { ?SymbolGlyphModifier }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    iconSymbolModifier?: SymbolGlyphModifier;
}
/**
 * Defines the options of the SnackBarMessage.
 *
 * @interface SnackBarMessageOptions
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export interface SnackBarMessageOptions {
    /**
     * Sets the title of the SnackBarMessage.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    title?: ResourceStr;
    /**
     * Sets the title color of the SnackBarMessage.
     *
     * @type { ?ColorMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    titleColor?: ColorMetrics;
    /**
     * Sets the content of the SnackBarMessage.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    content?: ResourceStr;
    /**
     * Sets the content color of the SnackBarMessage.
     *
     * @type { ?ColorMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    contentColor?: ColorMetrics;
}
/**
 * Defines the options of the SnackBarOperation.
 *
 * @interface SnackBarOperationOptions
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export interface SnackBarOperationOptions {
    /**
     * Sets the operationType of the SnackBarOperation.
     *
     * @type { ?SnackBarOperationType }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    operationType?: SnackBarOperationType;
    /**
     * Sets the content of the SnackBarOperation.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    content?: ResourceStr;
    /**
     * Sets the content color of the SnackBarOperation.
     *
     * @type { ?ColorMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    contentColor?: ColorMetrics;
    /**
     * Sets the content onclick callback event of the SnackBarOperation.
     *
     * @type { ?Callback<void> }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    onContentClick?: Callback<void>;
    /**
     * Sets the contentAccessibilityText of the SnackBarOperation.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    contentAccessibilityText?: ResourceStr;
    /**
     * Sets the contentAccessibilityDescription of the SnackBarOperation.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    contentAccessibilityDescription?: ResourceStr;
    /**
     * Sets the button onclick callback event of the SnackBarOperation.
     *
     * @type { ?Callback<void> }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    onCloseButtonClick?: Callback<void>;
    /**
     * Sets the closeButtonAccessibilityText of the SnackBarOperation.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    closeButtonAccessibilityText?: ResourceStr;
    /**
     * Sets the closeButtonAccessibilityDescription of the SnackBarOperation.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    closeButtonAccessibilityDescription?: ResourceStr;
    /**
     * Sets the arrow onclick callback event of the SnackBarOperation.
     *
     * @type { ?Callback<void> }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    onArrowClick?: Callback<void>;
    /**
     * Sets the color of the right arrow in the right area of the HdsSnackBar
     * @type { ?ColorMetrics[] }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    arrowColor?: ColorMetrics[];
    /**
     * Sets the background color of the highlighted text button in the right area of the HdsSnackBar.
     * @type { ?ColorMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    highlightBackBoardColor?: ColorMetrics;
    /**
     * Component ID of textButton.
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    textButtonId?: string;
    /**
     * Component ID of cacelButton.
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    cancelButtonId?: string;
    /**
     * Component ID of arrowButton.
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    arrowButtonId?: string;
}
/**
 * Defines the options of the SnackBarStyle.
 *
 * @interface SnackBarStyleOptions
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export interface SnackBarStyleOptions {
    /**
     * Sets the width of the SnackBarStyleOptions.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    width?: LengthMetrics;
    /**
     * Sets the backgroundColor of the SnackBarStyleOptions.
     *
     * @type { ?ColorMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    backgroundColor?: ColorMetrics;
    /**
     * Sets the backgroundBlurStyle of the SnackBarStyleOptions.
     *
     * @type { ?BlurStyle }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    backgroundBlurStyle?: BlurStyle;
    /**
     * Sets the duration of the SnackBarStyleOptions.
     * If the duration is set to less than or equal to 0, snackBar doesn't disappear.
     *
     * @type { ?number }
     * @default 5000
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    duration?: number;
    /**
     * Sets the keyboardDownAvoidHeight of the SnackBarStyleOptions.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    keyboardDownAvoidHeight?: LengthMetrics;
    /**
     * Sets the keyboardUpAvoidHeight of the SnackBarStyleOptions.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    keyboardUpAvoidHeight?: LengthMetrics;
    /**
     * Sets the focusId of the next component.
     *
     * @type { ?string }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    nextFocusId?: string;
    /**
     * Sets the theme.
     * @type { ?(Theme | CustomTheme) }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    theme?: Theme | CustomTheme;
    /**
     * Sets the theme color.
     * @type { ?ThemeColorMode }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    themeColorMode?: ThemeColorMode;
    /**
     * Sets the pressBackCallback function of the SnackBar.
     *
     * @type { ?Callback<void> }
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    pressBackCallback?: Callback<void>;
    /**
     * Sets the blur effective strategy for SnackBar.
     * @type { ?BlurStrategy }
     * @default BlurStrategy.ADAPTIVE
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    blurStrategy?: BlurStrategy;
}
/**
 * Indicates the operation type of SnackBarOperationType.
 *
 * @enum { number }
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export declare enum SnackBarOperationType {
    /**
     * Indicates the text in SnackBarOperation.
     *
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    TEXT_ONLY = 0,
    /**
     * Indicates the close button in SnackBarOperation.
     *
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    CLOSE_BUTTON_ONLY = 1,
    /**
     * Indicates the text and arrow button in SnackBarOperation.
     *
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    TEXT_WITH_ARROW = 2,
    /**
     * Indicates the text and close button in SnackBarOperation.
     *
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    TEXT_WITH_CLOSE = 3,
    /**
     * Indicates the highlight text and close button in SnackBarOperation.
     *
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    HIGHLIGHT_TEXT_WITH_CLOSE = 4
}
/**
 * Indicates the icon type of SnackBarIconType.
 *
 * @enum { number }
 * @syscap SystemCapability.UIDesign.HDSPattern.Standard
 * @stagemodelonly
 * @since 6.0.0(20)
 */
export declare enum SnackBarIconType {
    /**
     * Indicates the small icon in SnackBarIconType.
     *
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    SMALL = 0,
    /**
     * Indicates the system icon in SnackBarIconType.
     *
     * @syscap SystemCapability.UIDesign.HDSPattern.Standard
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    NORMAL = 1
}
