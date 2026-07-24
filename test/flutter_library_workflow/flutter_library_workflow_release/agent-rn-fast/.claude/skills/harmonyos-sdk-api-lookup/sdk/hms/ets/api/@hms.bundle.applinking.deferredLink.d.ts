/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Define capabilities to access app deferred link info.
 * @kit AppLinkingKit
 */
/**
 * This module provides deferred link capbility.
 *
 * @namespace deferredLink
 * @syscap SystemCapability.BundleManager.AppLinking.DeferredLink
 * @stagemodelonly
 * @since 5.0.3(15)
 */
declare namespace deferredLink {
    /**
     * Retrieves the deferred app link that was triggered by the user.
     *
     * This function is typically used in scenarios where a user clicks
     * on an app link before installing the app. After the app is installed,
     * this API pops the app link from cache and returns it to the developer,
     * allowing them to provide a seamless user experience by navigating
     * the user to the intended content.
     *
     * @returns { Promise<string> } the deferred link.
     * @syscap SystemCapability.BundleManager.AppLinking.DeferredLink
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    function popDeferredLink(): Promise<string>;
}
export default deferredLink;
