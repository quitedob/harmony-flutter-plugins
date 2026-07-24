/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file New path conversion interface in Fusion Scenario Service
 * @kit ScenarioFusionKit
 */
/**
 * File uri service API
 *
 * @namespace fileUriService
 * @syscap SystemCapability.ScenarioFusionComponent.FileUriService
 * @stagemodelonly
 * @since 5.0.2(14)
 */
declare namespace fileUriService {
    /**
     * convert file uris.
     *
     * @param { Array<string> } sourceFileUris - Indicates the list of file uri to be converted.
     * @returns { Promise<Array<FileUriResult>> } Promise used to return the file convert result.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.ScenarioFusionComponent.FileUriService
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    function convertFileUris(sourceFileUris: Array<string>): Promise<Array<FileUriResult>>;
    /**
     * File uri result
     *
     * @typedef FileUriResult
     * @syscap SystemCapability.ScenarioFusionComponent.FileUriService
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    interface FileUriResult {
        /**
         * source uri
         *
         * @type { string }
         * @syscap SystemCapability.ScenarioFusionComponent.FileUriService
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        sourceUri: string;
        /**
         * target uri
         *
         * @type { string }
         * @syscap SystemCapability.ScenarioFusionComponent.FileUriService
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        targetUri: string;
        /**
         * type of target uri
         *
         * @type { TargetType }
         * @syscap SystemCapability.ScenarioFusionComponent.FileUriService
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        targetType: TargetType;
    }
    /**
     * Type of target uri
     *
     * @interface TargetType
     * @enum { number }
     * @syscap SystemCapability.ScenarioFusionComponent.FileUriService
     * @stagemodelonly
     * @since 5.0.2(14)
     */
    export enum TargetType {
        /**
         * Unknown type
         *
         * @syscap SystemCapability.ScenarioFusionComponent.FileUriService
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        UNKNOWN = 0,
        /**
         * Media type
         *
         * @syscap SystemCapability.ScenarioFusionComponent.FileUriService
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        MEDIA = 1,
        /**
         * File type
         *
         * @syscap SystemCapability.ScenarioFusionComponent.FileUriService
         * @stagemodelonly
         * @since 5.0.2(14)
         */
        FILE = 2
    }
}
export default fileUriService;
