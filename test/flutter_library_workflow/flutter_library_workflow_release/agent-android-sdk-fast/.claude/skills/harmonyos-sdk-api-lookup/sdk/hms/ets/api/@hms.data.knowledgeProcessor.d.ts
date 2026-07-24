/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file
 * @kit DataAugmentationKit
 */
import type common from '@ohos.app.ability.common';
import type relationalStore from '@ohos.data.relationalStore';
/**
 * Provide methods for knowledge processor.
 *
 * @namespace knowledgeProcessor
 * @syscap SystemCapability.DataAugmentation.KnowledgeProcessor
 * @since 6.0.0(20)
 */
declare namespace knowledgeProcessor {
    /**
     * Obtains a knowledge processor.
     *
     * @param { common.BaseContext } context - Indicates the context of the knowledge processor.
     * @param { KnowledgeProcessorConfig } config - Indicates the {@link KnowledgeProcessorConfig}
     * configuration of the knowledge processor.
     * @returns { Promise<KnowledgeProcessor> } The knowledge processor object {@link KnowledgeProcessor}.
     * @throws { BusinessError } 1021400000 - Internal error.
     * @throws { BusinessError } 1021400001 - The knowledge source is not configured.
     * @throws { BusinessError } 1021400002 - The knowledge schema file is not found.
     * @throws { BusinessError } 1021400003 - The knowledge schema content is invalid.
     * @throws { BusinessError } 1021400004 - An error occurred during operations on the RDB source.
     * @syscap SystemCapability.DataAugmentation.KnowledgeProcessor
     * @since 6.0.0(20)
     */
    function getKnowledgeProcessor(context: common.BaseContext, config: KnowledgeProcessorConfig): Promise<KnowledgeProcessor>;
    /**
     * Manages the configuration for knowledge processor.
     *
     * @interface KnowledgeProcessorConfig
     * @syscap SystemCapability.DataAugmentation.KnowledgeProcessor
     * @since 6.0.0(20)
     */
    interface KnowledgeProcessorConfig {
        /**
         * The knowledge source configuration for this knowledge processor.
         *
         * @type { KnowledgeSourceConfig }
         * @syscap SystemCapability.DataAugmentation.KnowledgeProcessor
         * @since 6.0.0(20)
         */
        sourceConfig: KnowledgeSourceConfig;
    }
    /**
     * Manages the configuration for knowledge source.
     *
     * @interface KnowledgeSourceConfig
     * @syscap SystemCapability.DataAugmentation.KnowledgeProcessor
     * @since 6.0.0(20)
     */
    interface KnowledgeSourceConfig {
        /**
         * The rdb source for this knowledge processor.
         *
         * @type { ?relationalStore.StoreConfig }
         * @syscap SystemCapability.DataAugmentation.KnowledgeProcessor
         * @since 6.0.0(20)
         */
        rdbSource?: relationalStore.StoreConfig;
    }
    /**
     * Enumerates the status for knowledge processor.
     *
     * @enum { number }
     * @syscap SystemCapability.DataAugmentation.KnowledgeProcessor
     * @since 6.0.0(20)
     */
    enum ProcessorStatus {
        /**
         * Indicates that there is remaining data to be processed.
         *
         * @syscap SystemCapability.DataAugmentation.KnowledgeProcessor
         * @since 6.0.0(20)
         */
        DATA_REMAINING_TO_PROCESS = 0,
        /**
         * Indicates that data is processing in progress.
         *
         * @syscap SystemCapability.DataAugmentation.KnowledgeProcessor
         * @since 6.0.0(20)
         */
        DATA_PROCESSING_IN_PROGRESS = 1,
        /**
         * Indicates that all data processing is complete.
         *
         * @syscap SystemCapability.DataAugmentation.KnowledgeProcessor
         * @since 6.0.0(20)
         */
        DATA_PROCESSING_COMPLETE = 2
    }
    /**
     * Manages the interfaces for knowledge processor.
     *
     * @interface KnowledgeProcessor
     * @syscap SystemCapability.DataAugmentation.KnowledgeProcessor
     * @since 6.0.0(20)
     */
    interface KnowledgeProcessor {
        /**
         * Obtains the status for knowledge processor.
         * @returns { Promise<ProcessorStatus> } The knowledge processor status object {@link ProcessorStatus}.
         * @throws { BusinessError } 1021400000 - Internal error.
         * @throws { BusinessError } 1021400004 - An error occurred during operations on the RDB source.
         * @syscap SystemCapability.DataAugmentation.KnowledgeProcessor
         * @since 6.0.0(20)
         */
        getStatus(): Promise<ProcessorStatus>;
    }
}
export default knowledgeProcessor;
