/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Defines the capabilities of ReaderKit.
 * @kit ReaderKit
 * @since 5.0.4(16)
 */
import common from '@ohos.app.ability.common';
import { AsyncCallback, Callback } from '@ohos.base';
import { bookParser } from '@hms.core.readerservice.bookParser';
/**
 * Defines a UI component used to show the read page panel.
 * @struct { ReadPageComponent }
 * @syscap SystemCapability.Reader.ReaderService.ReaderCore
 * @atomicservice
 * @since 5.0.4(16)
 */
@Component
declare struct ReadPageComponent {
    /**
     * Defines the controller to interact with the read page.
     * @type { readerCore.ReaderComponentController }
     * @syscap SystemCapability.Reader.ReaderService.ReaderCore
     * @atomicservice
     * @since 5.0.4(16)
     */
    controller: readerCore.ReaderComponentController;
    /**
     * Indicates the callback function when the Read Page Panel is initialized.
     *
     * @type { AsyncCallback<readerCore.ReaderComponentController> }
     * @syscap SystemCapability.Reader.ReaderService.ReaderCore
     * @atomicservice
     * @since 5.0.4(16)
     */
    readerCallback: AsyncCallback<readerCore.ReaderComponentController>;
    /**
     * Constructor used to create a <b>ReadPageComponent</b> object.
     * @syscap SystemCapability.Reader.ReaderService.ReaderCore
     * @atomicservice
     * @since 5.0.4(16)
     */
    build(): void;
}
/**
 * The namespace for Read page Component.
 *
 * @namespace readerCore
 * @syscap SystemCapability.Reader.ReaderService.ReaderCore
 * @atomicservice
 * @since 5.0.4(16)
 */
declare namespace readerCore {
    /**
     * The layout setting for Read page Component.
     *
     * @interface ReaderSetting
     * @syscap SystemCapability.Reader.ReaderService.ReaderCore
     * @atomicservice
     * @since 5.0.4(16)
     */
    interface ReaderSetting {
        /**
         * font name.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        fontName: string;
        /**
         * font size.
         *
         * @type { number }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        fontSize: number;
        /**
         * font weight.
         *
         * @type { number }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        fontWeight: number;
        /**
         * font color.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        fontColor: string;
        /**
         * font resource path.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        fontPath: string;
        /**
         * line height.
         *
         * @type { number }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        lineHeight: number;
        /**
         * night mode.
         *
         * @type { boolean }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        nightMode: boolean;
        /**
         * theme background color.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        themeColor: string;
        /**
         * theme background image path.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        themeBgImg: string;
        /**
         * flip mode.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        flipMode: string;
        /**
         * viewport scaled density.
         *
         * @type { number }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        scaledDensity: number;
        /**
         * viewport width.
         *
         * @type { number }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        viewPortWidth: number;
        /**
         * viewport height.
         *
         * @type { number }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        viewPortHeight: number;
    }
    /**
     * The controler for Read page Component.
     *
     * @class ReaderComponentController
     * @syscap SystemCapability.Reader.ReaderService.ReaderCore
     * @atomicservice
     * @since 5.0.4(16)
     */
    class ReaderComponentController {
        /**
         * init read page component
         *
         * @param { common.UIAbilityContext } context - The context of an ability.
         * @returns { Promise<void> } Returns void.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1016910004 - Invalid caller.
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public init(context: common.UIAbilityContext): Promise<void>;
        /**
         * start read a book, load spine item by spineIdex and layout page with start position.
         *
         * @param { number } spineIndex - the index of spine item resource.
         * @param { string } domPos - the start position of page.
         * @returns { Promise<void> } Returns void.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1016900002 - Read Page Component is not initialized
         * @throws { BusinessError } 1016900003 - Invalid request.
         * @throws { BusinessError } 1016900999 - Other error.
         * @throws { BusinessError } 1016910001 - Invalid spine item.
         * @throws { BusinessError } 1016910002 - Unexpected spine item resource data.
         * @throws { BusinessError } 1016910003 - Spine item resource data out of range.
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public startPlay(spineIndex: number, domPos: string): Promise<void>;
        /**
         * flipping page based on user behavior.
         *
         * @param { boolean } isNext - flipping direction.
         * true: next page, false: prev page.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1016900002 - Read Page Component is not initialized
         * @throws { BusinessError } 1016900003 - Invalid request.
         * @throws { BusinessError } 1016900999 - Other error.
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public flipPage(isNext: boolean): void;
        /**
         * set or change read page layout setting.
         *
         * @param { ReaderSetting } pageConfig - page layout setting.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1016900002 - Read Page Component is not initialized
         * @throws { BusinessError } 1016900003 - Invalid request.
         * @throws { BusinessError } 1016900999 - Other error.
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public setPageConfig(pageConfig: ReaderSetting): void;
        /**
         * release current book.
         *
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public releaseBook(): void;
        /**
         * register book parser for read page component.
         *
         * @param { bookParser.BookParserHandler } bookParserHandler - ebook parser.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1016900002 - Read Page Component is not initialized
         * @throws { BusinessError } 1016900003 - Invalid request.
         * @throws { BusinessError } 1016900999 - Other error.
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public registerBookParser(bookParserHandler: bookParser.BookParserHandler): void;
        /**
         * Registers a callback with the corresponding query condition by using the handle.
         * This callback is triggered when the read page layout successed.
         *
         * @param { 'pageShow' } type
         * @param { Callback<PageDataInfo> } callback
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public on(type: 'pageShow', callback: Callback<PageDataInfo>): void;
        /**
         * Deregisters a callback with the corresponding query condition by using the handle.
         * This callback is triggered when the read page layout successed.
         *
         * @param { 'pageShow' } type
         * @param { Callback<PageDataInfo> } callback
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public off(type: 'pageShow', callback?: Callback<PageDataInfo>): void;
        /**
         * Registers a callback with the corresponding query condition by using the handle.
         * This callback is triggered when read page layout request resource, e.g fonts, images, css files.
         *
         * @param { 'resourceRequest' } type
         * @param { bookParser.CallbackRes<string, ArrayBuffer> } callback
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public on(type: 'resourceRequest', callback: bookParser.CallbackRes<string, ArrayBuffer>): void;
        /**
         * Deregisters a callback with the corresponding query condition by using the handle.
         * This callback is triggered when read page layout request resource, e.g fonts, images, css files.
         *
         * @param { 'resourceRequest' } type
         * @param { bookParser.CallbackRes<string, ArrayBuffer> } callback
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public off(type: 'resourceRequest', callback?: bookParser.CallbackRes<string, ArrayBuffer>): void;
    }
    /**
     * data desc for each read page on panel.
     *
     * @class PageDatabaseBean
     * @syscap SystemCapability.Reader.ReaderService.ReaderCore
     * @atomicservice
     * @since 5.0.4(16)
     */
    class PageDatabaseBean {
        /**
         * Type of a node layout on read page.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public nodeType: string;
        /**
         * id of node's data layout on read page.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public dataId: string;
        /**
         * Constructs the page data.
         *
         * @param { string } nodeType - Type of a node layout on read page.
         * @param { string } nodeDataId - id of node's data layout on read page.
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public constructor(nodeType: string, nodeDataId: string);
    }
    /**
     * data desc for each read page on panel.
     *
     * @class PageDataInfo
     * @extends PageDatabaseBean
     * @syscap SystemCapability.Reader.ReaderService.ReaderCore
     * @atomicservice
     * @since 5.0.4(16)
     */
    class PageDataInfo extends PageDatabaseBean {
        /**
         * header content on read page.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public pageHeaderContent: string;
        /**
         * page num displayed at footer of current read page.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public pageFooterContent: string;
        /**
         * begin position of current read page.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public startDomPos: string;
        /**
         * end position of current read page.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public endDomPos: string;
        /**
         * page data state of current read page.
         *
         * @type { PageState }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public state: PageState;
        /**
         * index of spine item resource of current read page.
         *
         * @type { number }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public resourceIndex: number;
        /**
         * page offset of current read page to whole resource
         *
         * @type { number }
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public pageOffset: number;
        /**
         * Constructs the page data.
         *
         * @param { string } nodeType - Type of a node layout on read page.
         * @param { string } nodeId - id of node's data layout on read page.
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        public constructor(nodeType: string, nodeId: string);
    }
    /**
     * The state for page layout.
     *
     * @enum { number }
     * @syscap SystemCapability.Reader.ReaderService.ReaderCore
     * @atomicservice
     * @since 5.0.4(16)
     */
    enum PageState {
        /**
         * init success and waiting layout notfication.
         *
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        PAGE_WAITING = 1,
        /**
         * init success and render processing.
         *
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        PAGE_LOADING = 2,
        /**
         * layout success and show the read page.
         *
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        PAGE_ON_SHOW = 3,
        /**
         * layout failed and no read page is displayed.
         *
         * @syscap SystemCapability.Reader.ReaderService.ReaderCore
         * @atomicservice
         * @since 5.0.4(16)
         */
        OPEN_BOOK_FAIL = 4
    }
}
export { ReadPageComponent, readerCore };
