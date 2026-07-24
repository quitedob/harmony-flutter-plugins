/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Comment Manager Interface Description file
 * @kit AppGalleryKit
 */
import type common from '@ohos.app.ability.common';
/**
 * In-app reviews.
 *
 * @namespace commentManager
 * @syscap SystemCapability.AppGalleryService.Distribution.Comment
 * @stagemodelonly
 * @since 6.0.0(20)
 */
declare namespace commentManager {
    /**
     * Show comment dialog.
     *
     * @param { common.UIExtensionContext | common.UIAbilityContext } context - Indicates the ui extension ability context or ui ability context of the media application.
     * @returns { Promise<void> } - The result of show comment dialog.
     * @throws { BusinessError } 1021500001 - Internal system error.
     * @throws { BusinessError } 1021500002 - Service request failed.
     * @throws { BusinessError } 1021500003 - Failed to connect to AppGallery.
     * @throws { BusinessError } 1021500004 - Failed to write parameters.
     * @throws { BusinessError } 1021500005 - The app context is invalid.
     * @throws { BusinessError } 1021500006 - The user has not signed in to their HUAWEI ID.
     * @throws { BusinessError } 1021500007 - The user has already commented on the current version.
     * @throws { BusinessError } 1021500008 - The number of comments has reached the maximum limit.
     * @throws { BusinessError } 1021500009 - The user has already left a comment, and less than a year has elapsed since then.
     * @syscap SystemCapability.AppGalleryService.Distribution.Comment
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function showCommentDialog(context: common.UIExtensionContext | common.UIAbilityContext): Promise<void>;
}
export default commentManager;
