/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Defines the capabilities of status bar manager module.
 * @kit DesktopExtensionKit
 */
import image from '@ohos.multimedia.image';
import common from '@ohos.app.ability.common';
import emitter from '@ohos.events.emitter';
import type { Callback, AsyncCallback } from '@ohos.base';
/**
 * This module provides api to access to the status bar.
 * @namespace statusBarManager
 *
 * @syscap SystemCapability.PCService.StatusBarManager
 * @since 5.0.0(12)
 */
declare namespace statusBarManager {
    /**
     * The details of the StatusBar item.
     *
     * @typedef StatusBarItem
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    interface StatusBarItem {
        /**
         * The icon information.
         *
         * @type { StatusBarIcon }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        icons: StatusBarIcon;
        /**
         * Quick operation information in the left-click pop-up window.
         *
         * @type { QuickOperation }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        quickOperation: QuickOperation;
        /**
         * Information about the right-click menu of the icon in the status bar.
         *
         * @type { ?StatusBarGroupMenu[] }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        statusBarGroupMenu?: StatusBarGroupMenu[];
    }
    /**
     *  The app icon in status bar.
     *
     * @typedef StatusBarIcon
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    interface StatusBarIcon {
        /**
         * The icon on the dark background
         *
         * @type { image.PixelMap }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        white: image.PixelMap;
        /**
         * The icon on the light background.
         *
         * @type { image.PixelMap }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        black: image.PixelMap;
    }
    /**
     * The menu group information of the icon of status bar.
     *
     * @typedef { StatusBarMenuItem[] }
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    type StatusBarGroupMenu = StatusBarMenuItem[];
    /**
     * The information of single menu item in the status bar.
     *
     * @typedef StatusBarMenuItem
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    interface StatusBarMenuItem {
        /**
         * The title of the menu item.
         *
         * @type { string }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        title: string;
        /**
         * The action information of the menu item.
         *
         * @type { ?StatusBarMenuAction }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        menuAction?: StatusBarMenuAction;
        /**
         * Submenu information.
         *
         * @type { ?StatusBarSubMenuItem[] }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        subMenu?: StatusBarSubMenuItem[];
    }
    /**
     * Menu Item Action.
     * The function of starting ability of the current application is supported currently.
     *
     * @typedef StatusBarMenuAction
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    interface StatusBarMenuAction {
        /**
         * ability name of application.
         *
         * @type { string }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        abilityName: string;
        /**
         * The description of an module name in an want.
         *
         * @type { ?string }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        moduleName?: string;
        /**
         * right menu click event enable.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.2(14)
         */
        notifyOnly?: boolean;
        /**
         * Menu code used for identification.
         *
         * @type { ?string }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.2(14)
         */
        menuCode?: string;
    }
    /**
     * The information of submenu item in the statusbar.
     *
     * @typedef StatusBarSubMenuItem
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    interface StatusBarSubMenuItem {
        /**
         * The title of the submenu item.
         *
         * @type { string }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        subTitle: string;
        /**
         * The action information of the submenu item.
         *
         * @type { StatusBarMenuAction }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        menuAction: StatusBarMenuAction;
    }
    /**
     * Quick operation information in the left-click pop-up window corresponding to the icon in the status bar.
     *
     * @typedef QuickOperation
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    interface QuickOperation {
        /**
         * The title of QuickOperation window.
         *
         * @type { string }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        title: string;
        /**
         * The height of QuickOperation window.
         *
         * @type { number }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        height: number;
        /**
         * The name of the custom StatusBarViewExtensionAbility
         *
         * @type { string }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        abilityName: string;
        /**
         * The description of an module name in an want.
         *
         * @type { ?string }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        moduleName?: string;
        /**
         * Enable quickOperation window loading animation.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 6.0.0(20)
         */
        loadingStatus?: boolean;
    }
    /**
     * Add the app icon to the status bar.
     *
     * @param { common.Context } context - context.
     * @param { StatusBarItem } statusBarItem - The details of the icon in status bar.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010710001 - The size of the pixelmap exceeds the limit.
     * @throws { BusinessError } 1010710002 - The number of menu items or submenu items exceeds the limit.
     * @throws { BusinessError } 1010710003 - The API is being called too frequently.
     * @throws { BusinessError } 1010720001 - A menu item contains neither submenu nor menuAction.
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    function addToStatusBar(context: common.Context, statusBarItem: StatusBarItem): void;
    /**
     * Add the app icon to the status bar.
     *
     * @param { common.Context } context - context.
     * @param { StatusBarItem } statusBarItem - The details of the icon in status bar.
     * @param { AsyncCallback<void> } callback - {void}: The result of adding the app icon to the status bar.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010710001 - The size of the pixelmap exceeds the limit.
     * @throws { BusinessError } 1010710002 - The number of menu items or submenu items exceeds the limit.
     * @throws { BusinessError } 1010710003 - The API is being called too frequently.
     * @throws { BusinessError } 1010720001 - A menu item contains neither submenu nor menuAction.
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.2(14)
     */
    function addToStatusBar(context: common.Context, statusBarItem: StatusBarItem, callback: AsyncCallback<void>): void;
    /**
     * Remove the app icon from the status bar.
     *
     * @param { common.Context } context - context.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010710003 - The API is being called too frequently.
     * @throws { BusinessError } 1010710004 - there are no foreground-windows, not allow to delete icon
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    function removeFromStatusBar(context: common.Context): void;
    /**
     * Remove the app icon from the status bar.
     *
     * @param { common.Context } context - context.
     * @param { AsyncCallback<void> } callback - {void}: The result of removing app icon from status bar.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010710003 - The API is being called too frequently.
     * @throws { BusinessError } 1010710004 - there are no foreground-windows, not allow to delete icon
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.2(14)
     */
    function removeFromStatusBar(context: common.Context, callback: AsyncCallback<void>): void;
    /**
     * Updated the right-click menu information of the app icon in the status bar.
     *
     * @param { common.Context } context - context.
     * @param { StatusBarGroupMenu[] } statusBarGroupMenus - The menu information of the icon of status bar.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010710002 - The number of menu items or submenu items exceeds the limit.
     * @throws { BusinessError } 1010710003 - The API is being called too frequently.
     * @throws { BusinessError } 1010720001 - A menu item contains neither submenu nor menuAction.
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    function updateStatusBarMenu(context: common.Context, statusBarGroupMenus: StatusBarGroupMenu[]): void;
    /**
     * Updated the right-click menu information of the app icon in the status bar.
     *
     * @param { common.Context } context - context.
     * @param { StatusBarGroupMenu[] } statusBarGroupMenus - The menu information of the icon of status bar.
     * @param { AsyncCallback<void> } callback - {void}: The result of updating the right-click menu information
     *     of the app icon in the status bar.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010710002 - The number of menu items or submenu items exceeds the limit.
     * @throws { BusinessError } 1010710003 - The API is being called too frequently.
     * @throws { BusinessError } 1010720001 - A menu item contains neither submenu nor menuAction.
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.2(14)
     */
    function updateStatusBarMenu(context: common.Context, statusBarGroupMenus: StatusBarGroupMenu[], callback: AsyncCallback<void>): void;
    /**
     * Updated the left-click menu height of the app icon in the status bar.
     *
     * @param { common.Context } context - context.
     * @param { number } height - The height of the custom area in the left-click pop-up window.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010710003 - The API is being called too frequently.
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    function updateQuickOperationHeight(context: common.Context, height: number): void;
    /**
     * Updated the left-click menu height of the app icon in the status bar.
     *
     * @param { common.Context } context - context.
     * @param { number } height - The height of the custom area in the left-click pop-up window.
     * @param { AsyncCallback<void> } callback - {void}: The result of updating the left-click menu height of
     *     the app icon in the status bar.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010710003 - The API is being called too frequently.
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.2(14)
     */
    function updateQuickOperationHeight(context: common.Context, height: number, callback: AsyncCallback<void>): void;
    /**
     * Update the app icon in the status bar.
     *
     * @param { common.Context } context - context.
     * @param { StatusBarIcon } statusBarIcon - The information of the app icon in status bar.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010710001 - The size of the pixelmap exceeds the limit.
     * @throws { BusinessError } 1010710003 - The API is being called too frequently.
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    function updateStatusBarIcon(context: common.Context, statusBarIcon: StatusBarIcon): void;
    /**
     * Update the app icon in the status bar.
     *
     * @param { common.Context } context - context.
     * @param { StatusBarIcon } statusBarIcon - The information of the app icon in status bar.
     * @param { AsyncCallback<void> } callback - {void}: The result of updating the app icon in the status bar.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010710001 - The size of the pixelmap exceeds the limit.
     * @throws { BusinessError } 1010710003 - The API is being called too frequently.
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.2(14)
     */
    function updateStatusBarIcon(context: common.Context, statusBarIcon: StatusBarIcon, callback: AsyncCallback<void>): void;
    /**
     * register status bar icon click event listener.
     *
     * @param { 'statusBarIconClick' } type - status bar icon click event
     * @param { Callback<emitter.EventData> } callback - callback
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.2(14)
     */
    function on(type: 'statusBarIconClick', callback: Callback<emitter.EventData>): void;
    /**
     * unregister status bar icon click event listener.
     *
     * @param { 'statusBarIconClick' } type - status bar icon click event
     * @param { Callback<emitter.EventData> } [callback] - callback
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.2(14)
     */
    function off(type: 'statusBarIconClick', callback?: Callback<emitter.EventData>): void;
    /**
     * register status bar right menu click event listener.
     *
     * @param { 'rightMenuClick' } type - status bar right menu click event
     * @param { Callback<emitter.EventData> } callback - callback
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.2(14)
     */
    function on(type: 'rightMenuClick', callback: Callback<emitter.EventData>): void;
    /**
     * unregister status bar right menu click event listener.
     *
     * @param { 'rightMenuClick' } type - status bar right menu click event
     * @param { Callback<emitter.EventData> } [callback] - callback
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.2(14)
     */
    function off(type: 'rightMenuClick', callback?: Callback<emitter.EventData>): void;
}
export default statusBarManager;
