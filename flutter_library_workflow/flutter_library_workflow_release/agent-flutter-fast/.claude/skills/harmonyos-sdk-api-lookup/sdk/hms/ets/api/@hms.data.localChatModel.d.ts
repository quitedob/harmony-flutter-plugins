/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file
 * @kit DataAugmentationKit
 */
import type { AsyncCallback } from '@ohos.base';
/**
 * Provides methods for the local chat model.
 *
 * @namespace localChatModel
 * @syscap SystemCapability.DataAugmentation.LocalChatModel
 * @stagemodelonly
 * @since 6.0.0(20)
 */
declare namespace localChatModel {
    /**
     * Chat configuration.
     *
     * @interface Config
     * @syscap SystemCapability.DataAugmentation.LocalChatModel
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface Config {
        /**
         * Indicates whether streaming chat is supported.
         *
         * @type { boolean }
         * @syscap SystemCapability.DataAugmentation.LocalChatModel
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        isStream: boolean;
    }
    /**
     * Question information.
     *
     * @interface QuestionInfo
     * @syscap SystemCapability.DataAugmentation.LocalChatModel
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface QuestionInfo {
        /**
         * Question ID.
         *
         * @type { number }
         * @syscap SystemCapability.DataAugmentation.LocalChatModel
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        questionId: number;
        /**
         * Content of a question.
         *
         * @type { string }
         * @syscap SystemCapability.DataAugmentation.LocalChatModel
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        content: string;
    }
    /**
     * Answer information.
     *
     * @interface Answer
     * @syscap SystemCapability.DataAugmentation.LocalChatModel
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface Answer {
        /**
         * Question ID.
         *
         * @type { number }
         * @syscap SystemCapability.DataAugmentation.LocalChatModel
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        questionId: number;
        /**
         * Content of the answer to a question.
         *
         * @type { string }
         * @syscap SystemCapability.DataAugmentation.LocalChatModel
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        content: string;
        /**
         * Indicates whether the output is complete.
         *
         * @type { boolean }
         * @syscap SystemCapability.DataAugmentation.LocalChatModel
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        isFinished: boolean;
    }
    /**
     * Initializes the local chat model.
     *
     * @returns { Promise<boolean> } Promise returned by the function.
     * @syscap SystemCapability.DataAugmentation.LocalChatModel
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function init(): Promise<boolean>;
    /**
     * Chats with the local chat model.
     *
     * @param { QuestionInfo } info - Question information {@link QuestionInfo}.
     * @param { Config } config - {@link Config} configuration of a question.
     * @param { AsyncCallback<Answer> } callback - The {@link Answer} object is returned if the operation is successful.
     * @returns { Promise<void> } Promise returned by the function.
     * @throws { BusinessError } 1021900001 - A timeout occurs when the local chat model is called.
     * @throws { BusinessError } 1021900002 - A loading failure occurs when the local chat model is called.
     * @throws { BusinessError } 1021900003 - A request failure occurs when the local chat model is called.
     * @throws { BusinessError } 1021900004 - The local chat model is busy.
     * @throws { BusinessError } 1021900005 - Some parameters do not meet the specified constraints.
     * @syscap SystemCapability.DataAugmentation.LocalChatModel
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function chat(info: QuestionInfo, config: Config, callback: AsyncCallback<Answer>): Promise<void>;
}
export default localChatModel;
