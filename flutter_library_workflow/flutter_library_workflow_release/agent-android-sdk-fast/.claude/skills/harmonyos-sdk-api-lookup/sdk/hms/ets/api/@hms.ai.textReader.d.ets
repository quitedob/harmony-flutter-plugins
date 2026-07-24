/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file This module is used for AI component textReader
 * @kit SpeechKit
 * @bundle com.huawei.hmsapp.hiai.hsp/textReaderHsp/Index 5.0.0(12)
 * */
import image from '@ohos.multimedia.image';
import common from '@ohos.app.ability.common';
import window from '@ohos.window';
/**
 * This module provides text-to-speech reader component
 * The application module is developed through the system-level hsp.
 *
 * @namespace TextReader
 * @syscap SystemCapability.AI.Component.TextReader
 * @since 5.0.0(12)
 */
/**
 * This module provides text-to-speech reader component
 * The application module is developed through the system-level hsp.
 *
 * @namespace TextReader
 * @syscap SystemCapability.AI.Component.TextReader
 * @atomicservice
 * @since 5.0.3(15)
 */
declare namespace TextReader {
    /**
     * Initialize textReader including player and model initialization.
     * @permission ohos.permission.KEEP_BACKGROUND_RUNNING.
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { ReaderParam } readParams - Indicates the params for text reader.
     * @returns { Promise<void> }
     * @throws { BusinessError } 201 - Permission denied. Interface caller does not
     * have permission ohos.permission.KEEP_BACKGROUND_RUNNING.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1010600011 - Initialize failed.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Initialize textReader including player and model initialization.
     * @permission ohos.permission.KEEP_BACKGROUND_RUNNING.
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { ReaderParam } readParams - Indicates the params for text reader.
     * @returns { Promise<void> }
     * @throws { BusinessError } 201 - Permission denied. Interface caller does not
     * have permission ohos.permission.KEEP_BACKGROUND_RUNNING.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1010600011 - Initialize failed.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function init(context: common.BaseContext, readParams: ReaderParam): Promise<void>;
    /**
     * release the resources of textReader.
     * @returns { Promise<void> }
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600020 - Release error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * release the resources of textReader.
     * @returns { Promise<void> }
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600020 - Release error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function release(): Promise<void>;
    /**
     * Pull up the textReader player panel and start playing audio streams from the indicated article Id.
     * @param { ReadInfo[] } readInfoList - Indicates the list of readInfo data.
     * @param { string } articleId - Indicates the article id.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600013 - Text-to-speech engine error.
     * @throws { BusinessError } 1010600014 - AudioRenderer play error.
     * @throws { BusinessError } 1010600015 - Audio decode error.
     * @throws { BusinessError } 1010600016 - AVSession error.
     * @throws { BusinessError } 1010600017 - Other error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Pull up the textReader player panel and start playing audio streams from the indicated article Id.
     * @param { ReadInfo[] } readInfoList - Indicates the list of readInfo data.
     * @param { string } [articleId] - Indicates the article id.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600013 - Text-to-speech engine error.
     * @throws { BusinessError } 1010600014 - AudioRenderer play error.
     * @throws { BusinessError } 1010600015 - Audio decode error.
     * @throws { BusinessError } 1010600016 - AVSession error.
     * @throws { BusinessError } 1010600017 - Other error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function start(readInfoList: ReadInfo[], articleId?: string): Promise<void>;
    /**
     * Pull up the textReader player panel and start playing audio streams from the indicated article Id.
     * @param { ReadInfo[] } readInfoList - Indicates the list of readInfo data.
     * @param { string | undefined } articleId - Indicates the article id.
     * @param { StartParams } startParams - Indicates the params for start.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600013 - Text-to-speech engine error.
     * @throws { BusinessError } 1010600014 - AudioRenderer play error.
     * @throws { BusinessError } 1010600015 - Audio decode error.
     * @throws { BusinessError } 1010600016 - AVSession error.
     * @throws { BusinessError } 1010600017 - Other error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Pull up the textReader player panel and start playing audio streams from the indicated article Id.
     * @param { ReadInfo[] } readInfoList - Indicates the list of readInfo data.
     * @param { string | undefined } articleId - Indicates the article id.
     * @param { StartParams } startParams - Indicates the params for start.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600013 - Text-to-speech engine error.
     * @throws { BusinessError } 1010600014 - AudioRenderer play error.
     * @throws { BusinessError } 1010600015 - Audio decode error.
     * @throws { BusinessError } 1010600016 - AVSession error.
     * @throws { BusinessError } 1010600017 - Other error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function start(readInfoList: ReadInfo[], articleId: string | undefined, startParams: StartParams): Promise<void>;
    /**
     * Close the textReader player panel and stop playing audio streams.
     * @returns { Promise<void> }
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Close the textReader player panel and stop playing audio streams.
     * @returns { Promise<void> }
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function stop(): Promise<void>;
    /**
     * Provides interfaces for resetting initialization parameters and clearing the broadcast list.
     * @param { ResetParamType } paramName - Indicates the param name.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Provides interfaces for resetting initialization parameters and clearing the broadcast list.
     * @param { ResetParamType } paramName - Indicates the param name.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function resetParam(paramName: ResetParamType): void;
    /**
     * Pause audio stream playback.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Pause audio stream playback.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function pause(): void;
    /**
     * Resume audio stream playback.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600013 - Text-to-speech engine error.
     * @throws { BusinessError } 1010600014 - AudioRenderer play error.
     * @throws { BusinessError } 1010600015 - Audio decode error.
     * @throws { BusinessError } 1010600016 - AvSession error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Resume audio stream playback.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600013 - Text-to-speech engine error.
     * @throws { BusinessError } 1010600014 - AudioRenderer play error.
     * @throws { BusinessError } 1010600015 - Audio decode error.
     * @throws { BusinessError } 1010600016 - AvSession error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function resume(): void;
    /**
     * Play previous article.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600018 - playPrev failed.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Play previous article.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600018 - playPrev failed.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function playPrev(): void;
    /**
     * Play next article.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600019 - playNext failed.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Play next article.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600019 - playNext failed.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function playNext(): void;
    /**
     * Hide the textReader player panel.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Hide the textReader player panel.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function hidePanel(): void;
    /**
     * Show the textReader player panel.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Show the textReader player panel.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function showPanel(): void;
    /**
     * Show the minibar.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Show the minibar.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function showMinibar(): void;
    /**
     * Hide the minibar.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Hide the minibar.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function hideMinibar(): void;
    /**
     * Query the reading state of the indicated article id.
     * @param { string } id - Indicates the article id.
     * @returns { ReadState } - ReadState is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Query the reading state of the indicated article id.
     * @param { string } [id] - Indicates the article id.
     * @returns { ReadState } - ReadState is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function queryReadState(id?: string): ReadState;
    /**
     * Set the content of the indicated article id.
     * @param { string } id - Indicates the article id.
     * @param { string } content - Indicates the article content.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Set the content of the indicated article id.
     * @param { string } id - Indicates the article id.
     * @param { string } [content] - Indicates the article content.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function setArticleContent(id: string, content?: string): void;
    /**
     * Set the article of the indicated article id.
     * @param { ReadInfo } readInfo - The article info include image and content.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Set the article of the indicated article id.
     * @param { ReadInfo } readInfo - The article info include image and content.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function setArticle(readInfo: ReadInfo): void;
    /**
     * Load more articles and set them to the playlist
     * @param { ReadInfo[] } readInfos - Indicates the list of articles to be loaded.
     * @param { boolean } isEnd - Indicates if no more content needed to be loaded.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Load more articles and set them to the playlist
     * @param { ReadInfo[] } readInfos - Indicates the list of articles to be loaded.
     * @param { boolean } isEnd - Indicates if no more content needed to be loaded.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function loadMore(readInfos: ReadInfo[], isEnd: boolean): void;
    /**
     * Query the article status based on the category id.
     * @param { string } categoryId - Indicates the article category id.
     * @returns { ReadState } - ReadState is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Query the article status based on the category id.
     * @param { string } categoryId - Indicates the article category id.
     * @returns { ReadState } - ReadState is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function queryReadStateByCategoryId(categoryId: string): ReadState;
    /**
     * Register player action callback
     * @param { 'setArticle' } type - Registration Type, 'setArticle'
     * @param { Callback<string> } callback - Callback is invoked when the setArticle event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Register player action callback
     * @param { 'setArticle' } type - Registration Type, 'setArticle'
     * @param { Callback<string> } callback - Callback is invoked when the setArticle event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'setArticle', callback: Callback<string>): void;
    /**
     * Unregister reader action callback
     * @param { 'setArticle' } type - Registration Type, 'setArticle'
     * @param { Callback<string> } [callback] - Callback is invoked when the setArticle event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Unregister reader action callback
     * @param { 'setArticle' } type - Registration Type, 'setArticle'
     * @param { Callback<string> } [callback] - Callback is invoked when the setArticle event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'setArticle', callback?: Callback<string>): void;
    /**
     * Register reader action callback
     * @param { 'clickArticle' } type - Registration Type, 'clickArticle'
     * @param { Callback<string> } callback - Callback is invoked when the clickArticle event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Register reader action callback
     * @param { 'clickArticle' } type - Registration Type, 'clickArticle'
     * @param { Callback<string> } callback - Callback is invoked when the clickArticle event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'clickArticle', callback: Callback<string>): void;
    /**
     * Unregister reader action callback
     * @param { 'clickArticle' } type - Registration Type, 'clickArticle'
     * @param { Callback<string> } [callback] - Callback is invoked when the clickArticle event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Unregister reader action callback
     * @param { 'clickArticle' } type - Registration Type, 'clickArticle'
     * @param { Callback<string> } [callback] - Callback is invoked when the clickArticle event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'clickArticle', callback?: Callback<string>): void;
    /**
     * Register reader action callback
     * @param { 'clickAuthor' } type - Registration Type, 'clickAuthor'
     * @param { Callback<string> } callback - Callback is invoked when the clickAuthor event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Register reader action callback
     * @param { 'clickAuthor' } type - Registration Type, 'clickAuthor'
     * @param { Callback<string> } callback - Callback is invoked when the clickAuthor event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'clickAuthor', callback: Callback<string>): void;
    /**
     * Unregister reader action callback
     * @param { 'clickAuthor' } type - Registration Type, 'clickAuthor'
     * @param { Callback<string> } [callback] - Callback is invoked when the clickAuthor event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Unregister reader action callback
     * @param { 'clickAuthor' } type - Registration Type, 'clickAuthor'
     * @param { Callback<string> } [callback] - Callback is invoked when the clickAuthor event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'clickAuthor', callback?: Callback<string>): void;
    /**
     * Register reader action callback
     * @param { 'clickNotification' } type - Registration Type, 'clickNotification'
     * @param { Callback<string> } callback - Callback is invoked when the clickNotification event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Register reader action callback
     * @param { 'clickNotification' } type - Registration Type, 'clickNotification'
     * @param { Callback<string> } callback - Callback is invoked when the clickNotification event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'clickNotification', callback: Callback<string>): void;
    /**
     * Unregister reader action callback
     * @param { 'clickNotification' } type - Registration Type, 'clickNotification'
     * @param { Callback<string> } [callback] - Callback is invoked when the clickNotification event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Unregister reader action callback
     * @param { 'clickNotification' } type - Registration Type, 'clickNotification'
     * @param { Callback<string> } [callback] - Callback is invoked when the clickNotification event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'clickNotification', callback?: Callback<string>): void;
    /**
     * Register reader action callback
     * @param { 'showPanel' } type - Registration Type, 'showPanel'
     * @param { Callback<void> } callback - Callback is invoked when the showPanel event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Register reader action callback
     * @param { 'showPanel' } type - Registration Type, 'showPanel'
     * @param { Callback<void> } callback - Callback is invoked when the showPanel event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'showPanel', callback: Callback<void>): void;
    /**
     * Unregister reader action callback
     * @param { 'showPanel' } type - Registration Type, 'showPanel'
     * @param { Callback<void> } [callback] - Callback is invoked when the showPanel event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Unregister reader action callback
     * @param { 'showPanel' } type - Registration Type, 'showPanel'
     * @param { Callback<void> } [callback] - Callback is invoked when the showPanel event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'showPanel', callback?: Callback<void>): void;
    /**
     * Register reader action callback
     * @param { 'hidePanel' } type - Registration Type, 'hidePanel'
     * @param { Callback<void> } callback - Callback is invoked when the hidePanel event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Register reader action callback
     * @param { 'hidePanel' } type - Registration Type, 'hidePanel'
     * @param { Callback<void> } callback - Callback is invoked when the hidePanel event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'hidePanel', callback: Callback<void>): void;
    /**
     * Unregister reader action callback
     * @param { 'hidePanel' } type - Registration Type, 'hidePanel'
     * @param { Callback<void> } [callback] - Callback is invoked when the hidePanel event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Unregister reader action callback
     * @param { 'hidePanel' } type - Registration Type, 'hidePanel'
     * @param { Callback<void> } [callback] - Callback is invoked when the hidePanel event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'hidePanel', callback?: Callback<void>): void;
    /**
     * Register reader action callback
     * @param { 'stop' } type - Registration Type, 'stop'
     * @param { Callback<void> } callback - Callback is invoked when the stop event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Register reader action callback
     * @param { 'stop' } type - Registration Type, 'stop'
     * @param { Callback<void> } callback - Callback is invoked when the stop event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'stop', callback: Callback<void>): void;
    /**
     * Unregister reader action callback
     * @param { 'stop' } type - Registration Type, 'stop'
     * @param { Callback<void> } [callback] - Callback is invoked when the stop event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Unregister reader action callback
     * @param { 'stop' } type - Registration Type, 'stop'
     * @param { Callback<void> } [callback] - Callback is invoked when the stop event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'stop', callback?: Callback<void>): void;
    /**
     * Register reader action callback
     * @param { 'release' } type - Registration Type, 'release'
     * @param { Callback<void> } callback - Callback is invoked when the release event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Register reader action callback
     * @param { 'release' } type - Registration Type, 'release'
     * @param { Callback<void> } callback - Callback is invoked when the release event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'release', callback: Callback<void>): void;
    /**
     * Unregister reader action callback
     * @param { 'release' } type - Registration Type, 'release'
     * @param { Callback<void> } [callback] - Callback is invoked when the release event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Unregister reader action callback
     * @param { 'release' } type - Registration Type, 'release'
     * @param { Callback<void> } [callback] - Callback is invoked when the release event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'release', callback?: Callback<void>): void;
    /**
     * Register reader action callback
     * @param { 'stateChange' } type - Registration Type, 'stateChange'
     * @param { Callback<ReadState> } callback - Callback is invoked when the stateChange event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Register reader action callback
     * @param { 'stateChange' } type - Registration Type, 'stateChange'
     * @param { Callback<ReadState> } callback - Callback is invoked when the stateChange event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'stateChange', callback: Callback<ReadState>): void;
    /**
     * Unregister reader action callback
     * @param { 'stateChange' } type - Registration Type, 'stateChange'
     * @param { Callback<ReadState> } [callback] - Callback is invoked when the stateChange event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Unregister reader action callback
     * @param { 'stateChange' } type - Registration Type, 'stateChange'
     * @param { Callback<ReadState> } [callback] - Callback is invoked when the stateChange event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'stateChange', callback?: Callback<ReadState>): void;
    /**
     * Register reader action callback
     * @param { 'requestMore' } type - Registration Type, 'requestMore'
     * @param { Callback<void> } callback - Callback is invoked when the requestMore event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Register reader action callback
     * @param { 'requestMore' } type - Registration Type, 'requestMore'
     * @param { Callback<void> } callback - Callback is invoked when the requestMore event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'requestMore', callback: Callback<void>): void;
    /**
     * Register reader action callback
     * @param { 'requestMore' } type - Registration Type, 'requestMore'
     * @param { Callback<string> } callback - Callback is invoked when the requestMore event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Register reader action callback
     * @param { 'requestMore' } type - Registration Type, 'requestMore'
     * @param { Callback<string> } callback - Callback is invoked when the requestMore event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'requestMore', callback: Callback<string>): void;
    /**
     * Unregister reader action callback
     * @param { 'requestMore' } type - Registration Type, 'requestMore'
     * @param { Callback<void> } [callback] - Callback is invoked when the requestMore event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Unregister reader action callback
     * @param { 'requestMore' } type - Registration Type, 'requestMore'
     * @param { Callback<void> } [callback] - Callback is invoked when the requestMore event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'requestMore', callback?: Callback<void>): void;
    /**
     * Unregister reader action callback
     * @param { 'requestMore' } type - Registration Type, 'requestMore'
     * @param { Callback<string> } callback - Callback is invoked when the requestMore event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'requestMore', callback: Callback<string>): void;
    /**
     * Register reader event callback
     * @param { 'eventNotification' } type - Registration Type, 'eventNotification'
     * @param { Callback<NotificationEvent> } callback - Callback is invoked when the eventNotification event
     * is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Register reader event callback
     * @param { 'eventNotification' } type - Registration Type, 'eventNotification'
     * @param { Callback<NotificationEvent> } callback - Callback is invoked when the eventNotification event
     * is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'eventNotification', callback: Callback<NotificationEvent>): void;
    /**
     * Unregister reader event callback
     * @param { 'eventNotification' } type - Registration Type, 'eventNotification'
     * @param { Callback<NotificationEvent> } [callback] - Callback is invoked when the eventNotification event
     * is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Unregister reader event callback
     * @param { 'eventNotification' } type - Registration Type, 'eventNotification'
     * @param { Callback<NotificationEvent> } [callback] - Callback is invoked when the eventNotification event
     * is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'eventNotification', callback?: Callback<NotificationEvent>): void;
    /**
     * Register reader event callback
     * @param { 'eventPanel' } type - Registration Type, 'eventPanel'
     * @param { Callback<PanelEvent> } callback - Callback is invoked when the eventPanel event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Register reader event callback
     * @param { 'eventPanel' } type - Registration Type, 'eventPanel'
     * @param { Callback<PanelEvent> } callback - Callback is invoked when the eventPanel event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'eventPanel', callback: Callback<PanelEvent>): void;
    /**
     * Unregister reader event callback
     * @param { 'eventPanel' } type - Registration Type, 'eventPanel'
     * @param { Callback<PanelEvent> } [callback] - Callback is invoked when the eventPanel event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Unregister reader event callback
     * @param { 'eventPanel' } type - Registration Type, 'eventPanel'
     * @param { Callback<PanelEvent> } [callback] - Callback is invoked when the eventPanel event is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'eventPanel', callback?: Callback<PanelEvent>): void;
    /**
     * Register reader event callback
     * @param { 'eventReadList' } type - Registration Type, 'eventReadList'
     * @param { Callback<Array<ListEventState>> } callback - Callback is invoked when the eventReadList event
     * is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Register reader event callback
     * @param { 'eventReadList' } type - Registration Type, 'eventReadList'
     * @param { Callback<Array<ListEventState>> } callback - Callback is invoked when the eventReadList event
     * is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'eventReadList', callback: Callback<Array<ListEventState>>): void;
    /**
     * Unregister reader event callback
     * @param { 'eventReadList' } type - Registration Type, 'eventReadList'
     * @param { Callback<Array<ListEventState>> } [callback] - Callback is invoked when the eventReadList event
     * is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Unregister reader event callback
     * @param { 'eventReadList' } type - Registration Type, 'eventReadList'
     * @param { Callback<Array<ListEventState>> } [callback] - Callback is invoked when the eventReadList event
     * is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'eventReadList', callback?: Callback<Array<ListEventState>>): void;
    /**
     * Register readProgress event callback
     * @param { 'readProgress' } type - Registration Type, 'readProgress'
     * @param { Callback<ReadProgress> } callback - Callback is invoked when the readProgress event
     * is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Register readProgress event callback
     * @param { 'readProgress' } type - Registration Type, 'readProgress'
     * @param { Callback<ReadProgress> } callback - Callback is invoked when the readProgress event
     * is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function on(type: 'readProgress', callback: Callback<ReadProgress>): void;
    /**
     * Unregister readProgress event callback
     * @param { 'readProgress' } type - Registration Type, 'readProgress'
     * @param { Callback<ReadProgress> } [callback] - Callback is invoked when the readProgress event
     * is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Unregister readProgress event callback
     * @param { 'readProgress' } type - Registration Type, 'readProgress'
     * @param { Callback<ReadProgress> } [callback] - Callback is invoked when the readProgress event
     * is triggered.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    function off(type: 'readProgress', callback?: Callback<ReadProgress>): void;
    /**
     * Enum used to determine the type of reset
     *
     * @enum { number }
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Enum used to determine the type of reset
     *
     * @enum { number }
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    enum ResetParamType {
        /**
         * Reset minibar parameters
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Reset minibar parameters
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        BAR_PARAM = 1,
        /**
         * Reset all initial configurations
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Reset all initial configurations
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        ALL = 2,
        /**
         * Reset article list
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Reset article list
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        READ_LIST = 3
    }
    /**
     * Person tone and style information.
     *
     * @interface Person
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Person tone and style information.
     *
     * @interface Person
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface Person {
        /**
         * Tone of voice
         * @type { number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Tone of voice
         * @type { number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        tone: number;
        /**
         * Style of voice
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Style of voice
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        style: string;
    }
    /**
     * The business brand information.
     *
     * @interface BusinessBrandInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * The business brand information.
     *
     * @interface BusinessBrandInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface BusinessBrandInfo {
        /**
         * Brand name displayed on the panel
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Brand name displayed on the panel
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        panelName?: string;
        /**
         * Icon displayed on the panel
         * @type { ?ResourceStr }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Icon displayed on the panel
         * @type { ?ResourceStr }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        panelIcon?: ResourceStr;
        /**
         * Icon displayed on the the notification bar
         * @type { ?ResourceStr }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Icon displayed on the the notification bar
         * @type { ?ResourceStr }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        notificationIcon?: ResourceStr;
        /**
         * Brand name displayed on the notification bar
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Brand name displayed on the notification bar
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        notificationName?: string;
    }
    /**
     * Reader parameters for initialzation.
     *
     * @interface ReaderParam
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Reader parameters for initialzation.
     *
     * @interface ReaderParam
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface ReaderParam {
        /**
         * Display brand name, default to no
         * @type { boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Display brand name, default to no
         * @type { boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        isVoiceBrandVisible: boolean;
        /**
         * Business branch information
         * @type { ?BusinessBrandInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Business branch information
         * @type { ?BusinessBrandInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        businessBrandInfo?: BusinessBrandInfo;
        /**
         * Whether to set the fast forward/backward function to fast forward/backward for 15 seconds,
         * default to no, that is, fast forward/backward the previous and next sentences
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Whether to set the fast forward/backward function to fast forward/backward for 15 seconds,
         * default to no, that is, fast forward/backward the previous and next sentences
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        isFastForward?: boolean;
        /**
         * Whether to use the feature of keeping back ground running.
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Whether to use the feature of keeping back ground running.
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        keepBackgroundRunning?: boolean;
        /**
         * Whether to support online audio stream synthesis, default to no
         * mode: 0, online audio stream synthesis
         * mode: 1, offline audio stream synthesis
         * @type { ?number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Whether to support online audio stream synthesis, default to no
         * mode: 0, online audio stream synthesis
         * mode: 1, offline audio stream synthesis
         * @type { ?number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        online?: number;
        /**
         * Person tone and style information
         * @type { ?Person }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Person tone and style information
         * @type { ?Person }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        person?: Person;
        /**
         * Is the minibar feature needed, if the value is false,
         * the minibar feature will not work
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Is the minibar feature needed, if the value is false,
         * the minibar feature will not work
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        isMinibarNeeded?: boolean;
        /**
         * The minibar position setting
         * @type { ?MinibarParams }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * The minibar position setting
         * @type { ?MinibarParams }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        minibarParams?: MinibarParams;
        /**
         * The custom features of textReader
         * @type { ?CustomFeature[] }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * The custom features of textReader
         * @type { ?CustomFeature[] }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        customFeatures?: CustomFeature[];
        /**
         * Controlling the Tabs and Tab Content Displayed on the Playback Control Panel
         * @type { ?DisplayTab }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Controlling the Tabs and Tab Content Displayed on the Playback Control Panel
         * @type { ?DisplayTab }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        displayTab?: DisplayTab;
        /**
         * The period of reporting play progress, unit is millisecond
         * @type { ?number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * The period of reporting play progress, unit is millisecond
         * @type { ?number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        reportProgressPeriod?: number;
    }
    /**
     * Start parameters for start.
     *
     * @interface StartParams
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Start parameters for start.
     *
     * @interface StartParams
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface StartParams {
        /**
         * Is the minibar feature hidden, if the value is true,
         * the minibar feature will be hidden
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Is the minibar feature hidden, if the value is true,
         * the minibar feature will be hidden
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        isMinibarHidden?: boolean;
        /**
         * Play from specified location.
         * @type { ?number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 6.0.1(21)
         */
        startPercent?: number;
        /**
         * The params will be callback in requestMore listener.
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * The params will be callback in requestMore listener.
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        callbackParam?: string;
    }
    /**
     * Controlling the Tabs and Tab Content Displayed on the Playback Control Panel
     *
     * @enum { number }
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Controlling the Tabs and Tab Content Displayed on the Playback Control Panel
     *
     * @enum { number }
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    enum DisplayTab {
        /**
         * Show cover and content page, and show toggle tab button.
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Show cover and content page, and show toggle tab button.
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        COVER_AND_CONTENT = 1,
        /**
         * Show content page only, and hide the toggle tab button
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Show content page only, and hide the toggle tab button
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        CONTENT = 2,
        /**
         * Show cover page only, and hide the toggle tab button.
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Show cover page only, and hide the toggle tab button.
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        COVER = 3
    }
    /**
     * Minibar-related parameter, which determines whether the minibar
     * can be fixed on the left and can be dragged up and down.
     *
     * @interface MinibarParams
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Minibar-related parameter, which determines whether the minibar
     * can be fixed on the left and can be dragged up and down.
     *
     * @interface MinibarParams
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface MinibarParams {
        /**
         * Default adsorption position of minibar
         * @type { BarAlignment }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Default adsorption position of minibar
         * @type { BarAlignment }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        defaultAlignment: BarAlignment;
        /**
         * The distance to the bottom edge of window.
         * @type { ?number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * The distance to the bottom edge of window.
         * @type { ?number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        bottom?: number;
        /**
         * The playback speed button is visible.
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 6.0.1(21)
         */
        isSpeedIconVisible?: boolean;
        /**
         * The playnext button is visible.
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 6.0.1(21)
         */
        isNextIconVisible?: boolean;
    }
    /**
     * Enum for determining the default adsorption position of minibar
     *
     * @enum { number }
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Enum for determining the default adsorption position of minibar
     *
     * @enum { number }
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    enum BarAlignment {
        /**
         * Left side
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Left side
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        LEFT = 1,
        /**
         * Right side
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Right side
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        RIGHT = 2
    }
    /**
     * Text information structure, representing the attributes of text content and click ability.
     *
     * @interface TextInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Text information structure, representing the attributes of text content and click ability.
     *
     * @interface TextInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface TextInfo {
        /**
         * Text content
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Text content
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        text: string;
        /**
         * The click ability of the text content
         * @type { boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * The click ability of the text content
         * @type { boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        isClickable: boolean;
    }
    /**
     * The content information to be read aloud
     *
     * @interface ReadInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * The content information to be read aloud
     *
     * @interface ReadInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface ReadInfo {
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        id: string;
        /**
         * Title of the article
         * @type { TextInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Title of the article
         * @type { TextInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        title: TextInfo;
        /**
         * Author of the article
         * @type { ?TextInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Author of the article
         * @type { ?TextInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        author?: TextInfo;
        /**
         * Date of the article
         * @type { ?TextInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Date of the article
         * @type { ?TextInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        date?: TextInfo;
        /**
         * Cover image of the article
         * Format：PixelMap
         * @type { ?image.PixelMap }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Cover image of the article
         * Format：PixelMap
         * @type { ?image.PixelMap }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        image?: image.PixelMap;
        /**
         * Cover image of the article
         * Format：string
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Cover image of the article
         * Format：string
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        imageUrl?: string;
        /**
         * Body information of the article
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Body information of the article
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        bodyInfo?: string;
        /**
         * Body information of the article
         * @type { ?BodyInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Body information of the article
         * @type { ?BodyInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        bodyInfoObject?: BodyInfo;
        /**
         * Information of the article category
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Information of the article category
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        category?: string;
        /**
         * Information of the article category
         * @type { ?CategoryInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Information of the article category
         * @type { ?CategoryInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        categoryObject?: CategoryInfo;
        /**
         * Provides the capability of playout recorded files on the cloud side.
         * @type { ?AudioInfo[] }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Provides the capability of playout recorded files on the cloud side.
         * @type { ?AudioInfo[] }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        audioInfo?: AudioInfo[];
        /**
         * Provides the favorite status of article.
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Provides the favorite status of article.
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        isFavorite?: boolean;
    }
    /**
     * Information of the article category
     *
     * @interface CategoryInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Information of the article category
     *
     * @interface CategoryInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface CategoryInfo {
        /**
         * ID of the article category
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * ID of the article category
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        id: string;
        /**
         * Name of the article category
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Name of the article category
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        name: string;
        /**
         * Image of the article category
         * @type { PixelMap | string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Image of the article category
         * @type { PixelMap | string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        image: PixelMap | string;
    }
    /**
     * Notification business events
     *
     * @interface NotificationEvent
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Notification business events
     *
     * @interface NotificationEvent
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface NotificationEvent {
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        id: string;
        /**
         * Type of the notification business events
         * 1: Notification，
         * 2: Broadcasting center
         * @type { number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Type of the notification business events
         * 1: Notification，
         * 2: Broadcasting center
         * @type { number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        type: number;
        /**
         * Notification bar or broadcast control center click event code
         * NBC_01：Play button click
         * NBC_02：Pause button click
         * NBC_03：Close button click
         * NBC_04：Prev button click
         * NBC_05：Next button click
         * NBC_06：Article cover click
         * NBC_07：Article title click
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Notification bar or broadcast control center click event code
         * NBC_01：Play button click
         * NBC_02：Pause button click
         * NBC_03：Close button click
         * NBC_04：Prev button click
         * NBC_05：Next button click
         * NBC_06：Article cover click
         * NBC_07：Article title click
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        click: string;
        /**
         * ID of the article category
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * ID of the article category
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        categoryId?: string;
    }
    /**
     * Play panel events.
     *
     * @interface PanelEvent
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Play panel events.
     *
     * @interface PanelEvent
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface PanelEvent {
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        id: string;
        /**
         * Panel click event code
         * BPC_01：Panel-Play button click
         * BPC_02：Panel-Pause button click
         * BPC_03：Panel-Play prev button click
         * BPC_04：Panel-Play next button click
         * BPC_05：Panel-Play speed button click
         * BPC_06：Panel-Person button click
         * BPC_07：Panel-Article list button click
         * BPC_08：Panel-Title click
         * BPC_09：Panel-Author click
         * BPC_10：Panel-close panel active (close button click of close slide)
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * Panel click event code
         * BPC_01：Panel-Play button click
         * BPC_02：Panel-Pause button click
         * BPC_03：Panel-Play prev button click
         * BPC_04：Panel-Play next button click
         * BPC_05：Panel-Play speed button click
         * BPC_06：Panel-Person button click
         * BPC_07：Panel-Article list button click
         * BPC_08：Panel-Title click
         * BPC_09：Panel-Author click
         * BPC_10：Panel-close panel active (close button click of close slide)
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        click: string;
        /**
         * ID of the article category
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * ID of the article category
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        categoryId?: string;
    }
    /**
     * Play list event.
     *
     * @interface ListEventState
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Play list event.
     *
     * @interface ListEventState
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface ListEventState {
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        id: string;
        /**
         * ID of the article category
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * ID of the article category
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        categoryId?: string;
    }
    /**
     * Reading state.
     *
     * @interface ReadState
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Reading state.
     *
     * @interface ReadState
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface ReadState {
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        id: string;
        /**
         * State code of indicated article
         * @type { ReadStateCode }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        /**
         * State code of indicated article
         * @type { ReadStateCode }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        state: ReadStateCode;
        /**
         * ID of the article category
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * ID of the article category
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        categoryId?: string;
        /**
         * Is this the last article in the list or category
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Is this the last article in the list or category
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        isLastArticle?: boolean;
    }
    /**
     * Custom features in TextReader panel
     *
     * @interface CustomFeature
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Custom features in TextReader panel
     *
     * @interface CustomFeature
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface CustomFeature {
        /**
         * Type of the custom feature
         *
         * @type { CustomFeatureType }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Type of the custom feature
         *
         * @type { CustomFeatureType }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        type: CustomFeatureType;
        /**
         * Name of the custom feature
         *
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Name of the custom feature
         *
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        name: string;
        /**
         * Icon of the custom feature
         *
         * @type { ?ResourceStr }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Icon of the custom feature
         *
         * @type { ?ResourceStr }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        icon?: ResourceStr;
        /**
         * Callback of the custom feature
         *
         * @type { ?Callback<string> }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Callback of the custom feature
         *
         * @type { ?Callback<string> }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        callback?: Callback<string>;
    }
    /**
     * Body content infomation of readInfo
     *
     * @interface BodyInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Body content infomation of readInfo
     *
     * @interface BodyInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface BodyInfo {
        /**
         * Type of bodyInfo
         *
         * @type { BodyInfoType }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Type of bodyInfo
         *
         * @type { BodyInfoType }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        type: BodyInfoType;
        /**
         * Body content of bodyInfo
         *
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Body content of bodyInfo
         *
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        body?: string;
    }
    /**
     * Type of body information
     *
     * @interface BodyInfoType
     * @enum { number }
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Type of body information
     *
     * @interface BodyInfoType
     * @enum { number }
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    export enum BodyInfoType {
        /**
         * Content type of body info.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Content type of body info.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        CONTENT = 1,
        /**
         * File path type of body info.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * File path type of body info.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        FILE_PATH = 2
    }
    /**
     * Read audio information in controls
     *
     * @interface ReadProgress
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Read audio information in controls
     *
     * @interface ReadProgress
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface ReadProgress {
        /**
         * ID of the article
         *
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * ID of the article
         *
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        id: string;
        /**
         * ID of the article category
         *
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * ID of the article category
         *
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        categoryId: string;
        /**
         * Report type of the broadcast duration.
         *
         * @type { ReadProgressType }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Report type of the broadcast duration.
         *
         * @type { ReadProgressType }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        readProgressType: ReadProgressType;
        /**
         * Person of ReadProgress
         *
         * @type { Person }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Person of ReadProgress
         *
         * @type { Person }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        person: Person;
        /**
         * Maximum percentage progress of playback
         *
         * @type { number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Maximum percentage progress of playback
         *
         * @type { number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        maxPercent: number;
        /**
         * Current percentage progress of playback
         *
         * @type { number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 6.0.1(21)
         */
        currentPercent: number;
    }
    /**
     * AudioInfo in TextReader
     *
     * @interface AudioInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * AudioInfo in TextReader
     *
     * @interface AudioInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface AudioInfo {
        /**
         * format of AudioInfo
         *
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * format of AudioInfo
         *
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        format: string;
        /**
         * duration of AudioInfo
         *
         * @type { number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * duration of AudioInfo
         *
         * @type { number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        duration: number;
        /**
         * size of AudioInfo
         *
         * @type { number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * size of AudioInfo
         *
         * @type { number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        size: number;
        /**
         * person of AudioInfo
         *
         * @type { Person }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * person of AudioInfo
         *
         * @type { Person }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        person?: Person;
        /**
         * url of AudioInfo
         *
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * url of AudioInfo
         *
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        url: string;
    }
    /**
     * Type of custom features
     *
     * @interface CustomFeatureType
     * @enum { number }
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Type of custom features
     *
     * @interface CustomFeatureType
     * @enum { number }
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    export enum CustomFeatureType {
        /**
         * System custom feature.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * System custom feature.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        SYSTEM = 1,
        /**
         * User custom feature.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * User custom feature.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        USER = 2
    }
    /**
     * Report type of the broadcast duration.
     *
     * @interface ReadProgressType
     * @enum { number }
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.2(14)
     */
    /**
     * Report type of the broadcast duration.
     *
     * @interface ReadProgressType
     * @enum { number }
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    export enum ReadProgressType {
        /**
         * Scheduled report during playback.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Scheduled report during playback.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        PROGRESS = 1,
        /**
         * Reported when paused.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Reported when paused.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        PAUSE = 2,
        /**
         * Reported when shut down.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Reported when shut down.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        STOP = 3,
        /**
         * Report at the end of the article reading.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.2(14)
         */
        /**
         * Report at the end of the article reading.
         *
         * @syscap SystemCapability.AI.Component.TextReader
         * @atomicservice
         * @since 5.0.3(15)
         */
        COMPLETED = 4
    }
}
/**
 * Reading State Enumeration.
 *
 * @enum { number }
 * @syscap  SystemCapability.AI.Component.TextReader
 * @since 5.0.0(12)
 */
/**
 * Reading State Enumeration.
 *
 * @enum { number }
 * @syscap  SystemCapability.AI.Component.TextReader
 * @atomicservice
 * @since 5.0.3(15)
 */
export enum ReadStateCode {
    /**
     * Playing state.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Playing state.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    PLAYING = 1,
    /**
     * Pause state.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Pause state.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    PAUSED = 2,
    /**
     * Play completed state.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Play completed state.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    COMPLETED = 3,
    /**
     * Not play yet / stop state.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Not play yet / stop state.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    WAITING = 4,
    /**
     * Not in read list.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Not in read list.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    NOT_IN_READ_LIST = 5
}
/**
 * Window manager used for setting window stage.
 *
 * @class WindowManager
 * @syscap SystemCapability.AI.Component.TextReader
 * @since 5.0.0(12)
 */
/**
 * Window manager used for setting window stage.
 *
 * @class WindowManager
 * @syscap SystemCapability.AI.Component.TextReader
 * @atomicservice
 * @since 5.0.3(15)
 */
export class WindowManager {
    /**
     * Set the window stage to window manager
     * @param { window.WindowStage } windowStage - Indicates the window stage of the ability.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Set the window stage to window manager
     * @param { window.WindowStage } windowStage - Indicates the window stage of the ability.
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    public static setWindowStage(windowStage: window.WindowStage): void;
    /**
     * Get the window stage from window manager
     * @returns { window.WindowStage }
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * Get the window stage from window manager
     * @returns { window.WindowStage }
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    public static getWindowStage(): window.WindowStage;
}
/**
 * Component of text reader icon.
 *
 * @struct { TextReaderIcon }
 * @syscap SystemCapability.AI.Component.TextReader
 * @since 5.0.0(12)
 */
/**
 * Component of text reader icon.
 *
 * @struct { TextReaderIcon }
 * @syscap SystemCapability.AI.Component.TextReader
 * @atomicservice
 * @since 5.0.3(15)
 */
@Component
export struct TextReaderIcon {
    /**
     * @type { ReadStateCode }
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * @type { ReadStateCode }
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    @Link
    readState: ReadStateCode;
    /**
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    /**
     * @syscap SystemCapability.AI.Component.TextReader
     * @atomicservice
     * @since 5.0.3(15)
     */
    build(): void;
}
export default TextReader;
