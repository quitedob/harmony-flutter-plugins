/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Defines the capabilities of ReaderKit.
 * @kit ReaderKit
 * @since 5.0.4(16)
 */
/**
 * This module provides local ebook parse capabilities for Reader Book Parser.
 *
 * @namespace bookParser
 * @syscap SystemCapability.Reader.ReaderService.BookParser
 * @atomicservice
 * @since 5.0.4(16)
 */
export declare namespace bookParser {
    /**
     * This module provides local ebook parse capabilities for Reader Book Parser.
     *
     * @class bookParserHandler
     * @syscap SystemCapability.Reader.ReaderService.BookParser
     * @atomicservice
     * @since 5.0.4(16)
     */
    class BookParserHandler {
        /**
         * get book basic info.
         *
         * @returns { BookInfo } return BookInfo
         * @throws { BusinessError } 1017000001 - Book parser is not initialized.
         * @throws { BusinessError } 1017000999 - Other error.
         * @throws { BusinessError } 1017010002 - Invalid request.
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        public getBookInfo(): BookInfo;
        /**
         * get book catalog list
         *
         * @returns { CatalogItem[] } return CatalogItem[]
         * @throws { BusinessError } 1017000001 - Book parser is not initialized.
         * @throws { BusinessError } 1017000999 - Other error.
         * @throws { BusinessError } 1017010002 - Invalid request.
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        public getCatalogList(): CatalogItem[];
        /**
         * get book spine list
         *
         * @returns { SpineItem[] } return SpineItem[]
         * @throws { BusinessError } 1017000001 - Book parser is not initialized.
         * @throws { BusinessError } 1017000999 - Other error.
         * @throws { BusinessError } 1017010002 - Invalid request.
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        public getSpineList(): SpineItem[];
        /**
         * get single spine item content
         *
         * @param { number } spineIndex - The index of spine item in book spine list.
         * @returns { Promise<string> } return string
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1. Incorrect parameter types; 2. Parameter out of range.
         * @throws { BusinessError } 1017000001 - Book parser is not initialized.
         * @throws { BusinessError } 1017000999 - Other error.
         * @throws { BusinessError } 1017010001 - Invalid spine item.
         * @throws { BusinessError } 1017010002 - Invalid request.
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        public getSpineItemContent(spineIndex: number): Promise<string>;
        /**
         * get resource data
         *
         * @param { number } spineIndex - The index of spine item in book spine list.
         * @param { string } filePath - The path of resource in spine item.
         * @returns { ArrayBuffer } return ArrayBuffer
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1. Incorrect parameter types; 2. Parameter out of range.
         * @throws { BusinessError } 1017000001 - Book parser is not initialized.
         * @throws { BusinessError } 1017000999 - Other error.
         * @throws { BusinessError } 1017010001 - Invalid spine item.
         * @throws { BusinessError } 1017010002 - Invalid request.
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        public getResourceContent(spineIndex: number, filePath: string): ArrayBuffer;
        /**
         * get dom position from catalog mapped content resource via href
         *
         * @param { string } href - The href of catalog item.
         * @returns { string } return string
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1. Incorrect parameter types; 2. Parameter out of range.
         * @throws { BusinessError } 1017000001 - Book parser is not initialized.
         * @throws { BusinessError } 1017000999 - Other error.
         * @throws { BusinessError } 1017010002 - Invalid request.
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        public getDomPosByCatalogHref(href: string): string;
        /**
         * get content resource absolute file path for spineItem with index.
         *
         * @param { number } spineIndex - The index of spine item in book spine list.
         * @returns { string } return string
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1. Incorrect parameter types; 2. Parameter out of range.
         * @throws { BusinessError } 1017000001 - Book parser is not initialized.
         * @throws { BusinessError } 1017000999 - Other error.
         * @throws { BusinessError } 1017010002 - Invalid request.
         * @throws { BusinessError } 1017010004 - File is not exist.
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        public getAbsoluteResourcePath(spineIndex: number): string;
    }
    /**
     * Book Spine Item Info
     *
     * @interface SpineItem
     * @syscap SystemCapability.Reader.ReaderService.BookParser
     * @atomicservice
     * @since 5.0.4(16)
     */
    interface SpineItem {
        /**
         * book spine item idef.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        idRef: string;
        /**
         * spine item index.
         *
         * @type { number }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        index: number;
        /**
         * spine item file path.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        href: string;
        /**
         * spine item properties.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        properties: string;
    }
    /**
     * Book Catalog Item Info
     *
     * @interface CatalogItem
     * @syscap SystemCapability.Reader.ReaderService.BookParser
     * @atomicservice
     * @since 5.0.4(16)
     */
    interface CatalogItem {
        /**
         * book catalog item id.
         *
         * @type { number }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        catalogId: number;
        /**
         * book catalog item name.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        catalogName: string;
        /**
         * book catalog item level.
         *
         * @type { ?number }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        catalogLevel?: number;
        /**
         * book catalog item playorder.
         *
         * @type { ?number }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        playOrder?: number;
        /**
         * this catalog item orresponding spine item idRef.
         *
         * @type { ?string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        idRef?: string;
        /**
         * the href of catalog.
         *
         * @type { ?string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        href?: string;
        /**
         * this catalog item orresponding spine item resource href.
         *
         * @type { ?string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        resourceFile?: string;
    }
    /**
     * Book Basic Info
     *
     * @interface BookInfo
     * @syscap SystemCapability.Reader.ReaderService.BookParser
     * @atomicservice
     * @since 5.0.4(16)
     */
    interface BookInfo {
        /**
         * book title.
         *
         * @type { string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        bookTitle: string;
        /**
         * book author or creator.
         *
         * @type { ?string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        bookCreator?: string;
        /**
         * book publish date.
         *
         * @type { ?string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        bookPublishDate?: string;
        /**
         * book language.
         *
         * @type { ?string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        bookLanguage?: string;
        /**
         * book cover image path.
         *
         * @type { ?string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        bookCoverImage?: string;
        /**
         * book content charset.
         *
         * @type { ?string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        bookCharset?: string;
        /**
         * book type.
         *
         * @type { ?string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        bookType?: string;
        /**
         * book layout direction.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        isRtl?: boolean;
        /**
         * book layout rendition desc.
         *
         * @type { ?string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        renditionLayout?: string;
        /**
         * book orientation of rendition desc.
         *
         * @type { ?string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        renditionOrientation?: string;
        /**
         * book orientation spread desc.
         *
         * @type { ?string }
         * @syscap SystemCapability.Reader.ReaderService.BookParser
         * @atomicservice
         * @since 5.0.4(16)
         */
        renditionSpread?: string;
    }
    /**
     * get default book parser instance.
     *
     * @param { string } path - Provide the local book path for ebook parser.
     * e.g: ./download/ebook/abc.epub
     * only support current hap sandbox path
     * @returns { Promise<BookParserHandler> } return BookParserHandler
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1017000999 - Other error.
     * @throws { BusinessError } 1017010003 - Book file format is unexpected.
     * @throws { BusinessError } 1017010004 - File is not exist.
     * @syscap SystemCapability.Reader.ReaderService.BookParser
     * @atomicservice
     * @since 5.0.4(16)
     */
    function getDefaultHandler(path: string): Promise<BookParserHandler>;
    /**
     * Defines the callback when resource request intercept.
     *
     * @typedef { function }
     * @param { T } data - The data will be used in the callback.
     * @returns { V } - Returns result of the callback.
     * @syscap SystemCapability.Reader.ReaderService.BookParser
     * @atomicservice
     * @since 5.0.4(16)
     */
    type CallbackRes<T, V> = (data: T) => V;
}
