/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file This module is used for retrieval capabilities.
 * @kit DataAugmentationKit
 */
import type common from '@ohos.app.ability.common';
import type relationalStore from '@ohos.data.relationalStore';
/**
 * Provide methods for retrieval.
 *
 * @namespace retrieval
 * @syscap SystemCapability.DataAugmentation.Retrieval
 * @since 6.0.0(20)
 */
declare namespace retrieval {
    /**
     * Obtains a retriever.
     *
     * @param { RetrievalConfig } config - Indicates the {@link RetrievalConfig} configuration of the retriever.
     * @returns { Promise<Retriever> } The retriever object {@link Retriever}.
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    function getRetriever(config: RetrievalConfig): Promise<Retriever>;
    /**
     * Manages retrieval configurations.
     *
     * @interface RetrievalConfig
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface RetrievalConfig {
        /**
         * An array of configurations for different retrieval channels.
         *
         * @type { Array<ChannelConfig> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        channelConfigs: Array<ChannelConfig>;
    }
    /**
     * Manages the configuration for each retrieval channel.
     *
     * @interface ChannelConfig
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface ChannelConfig {
        /**
         * The type of database for this retrieval channel.
         *
         * @type { ChannelType }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        channelType: ChannelType;
        /**
         * Indicates the context of an application or ability.
         *
         * @type { common.BaseContext }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        context: common.BaseContext;
        /**
         * The configuration of database for this retrieval channel.
         *
         * @type { DbConfig }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        dbConfig: DbConfig;
    }
    /**
     * Type of database.
     *
     * @enum { number }
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    enum ChannelType {
        /**
         * Represents a vector database.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        VECTOR_DATABASE = 0,
        /**
         * Represents an inverted index database.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        INVERTED_INDEX_DATABASE = 1
    }
    /**
     * Describes the configuration of the database.
     *
     * @typedef { relationalStore.StoreConfig } DbConfig
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    type DbConfig = relationalStore.StoreConfig;
    /**
     * Describes the retriever.
     *
     * @interface Retriever
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface Retriever {
        /**
         * Given the retrieval condition that includes query terms, recall conditions, and re-ranking strategies,
         * retrieve a collection of records that meet the specified conditions from a relational store (RDB).
         *
         * @param { string } query - The query to the retrieval.
         * @param { RetrievalCondition } condition - The condition {@link RetrievalCondition} of the retrieve method.
         * @returns { Promise<RdbRecords> } The promise used to return the retrieved records {@link RdbRecords}.
         * @throws { BusinessError } 1021200001 - The database is corrupted.
         * @throws { BusinessError } 1021200002 - The database is closed.
         * @throws { BusinessError } 1021200003 - The database is busy.
         * @throws { BusinessError } 1021200004 - The database is out of memory.
         * @throws { BusinessError } 1021200012 - Unable to generate embeddings.
         * @throws { BusinessError } 1021200100 - SQLite: Generic error.
         * @throws { BusinessError } 1021200101 - SQLite: Access permission denied.
         * @throws { BusinessError } 1021200102 - SQLite: The database file is locked.
         * @throws { BusinessError } 1021200103 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 1021200104 - SQLite: The WAL file size exceeds the default limit.
         * @throws { BusinessError } 1021200105 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 1021201000 - Retrieval: An error occurred during the recall phase.
         * @throws { BusinessError } 1021201001 - Retrieval: An error occurred during the re-ranking phase.
         * @throws { BusinessError } 1021201002 - Retrieval: The value of the numerical parameter is outside
         *     the constrained range.
         * @throws { BusinessError } 1021201003 - Retrieval: There are invalid primary keys.
         * @throws { BusinessError } 1021201004 - Retrieval: A re-ranking algorithm that does not support
         *     composite primary keys was used.
         * @throws { BusinessError } 1021201005 - Retrieval: There are fields with empty strings.
         * @throws { BusinessError } 1021201006 - Retrieval: The filter input is invalid.
         * @throws { BusinessError } 1021201007 - Retrieval: There are invalid recall names in RecallCondition.
         * @throws { BusinessError } 1021201008 - Retrieval: The vector similarity threshold in VectorQuery is higher than
         *     the tiered threshold in VectorRerankParameter.
         * @throws { BusinessError } 1021201009 - Retrieval: RerankMethod parameters do not match the channel type.
         * @throws { BusinessError } 1021201010 - Retrieval: There exists a parameter value that should not be empty
         *     but is actually empty.
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        retrieveRdb(query: string, condition: RetrievalCondition): Promise<RdbRecords>;
    }
    /**
     * Describes the retrieval conditions.
     *
     * @interface RetrievalCondition
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface RetrievalCondition {
        /**
         * The conditions {@link RecallCondition} for recall, where each item in the array corresponds to a recall operation.
         *
         * @type { Array<RecallCondition> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        recallConditions: Array<RecallCondition>;
        /**
         * The parameters of the re-ranking method {@link RerankMethod}.
         *
         * @type { ?RerankMethod }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        rerankMethod?: RerankMethod;
        /**
         * The maximum number of results allowed to be returned after re-ranking.
         *
         * @type { ?number }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        resultCount?: number;
        /**
         * The configuration for explaining the results of the retrieval process.
         *
         * @type { ?ExplanationConfig }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        explanation?: ExplanationConfig;
    }
    /**
     * Describes the configuration for explaining the results of the retrieval process.
     *
     * @interface ExplanationConfig
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface ExplanationConfig {
        /**
         * A list of the ground truth document IDs that need to be explained.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        groundTruths: Array<string>;
    }
    /**
     * Describes the conditions for a recall operation.
     *
     * @typedef { InvertedIndexRecallCondition | VectorRecallCondition } RecallCondition
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    type RecallCondition = InvertedIndexRecallCondition | VectorRecallCondition;
    /**
     * Describes the recall conditions for the inverted index retrieval.
     *
     * @interface InvertedIndexRecallCondition
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface InvertedIndexRecallCondition {
        /**
         * The table name of the fts5 data table used for the inverted index recall.
         *
         * @type { string }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        ftsTableName: string;
        /**
         * Represents the table name in the database, supporting JOIN operations.
         *
         * @type { string }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        fromClause: string;
        /**
         * Represents the column name(s) of the primary key, and this parameter supports composite primary keys.
         *
         * @type { Array<ColumnName> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        primaryKey: Array<ColumnName>;
        /**
         * The names of the columns included in the recall results.
         *
         * @type { Array<ColumnName> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        responseColumns: Array<ColumnName>;
        /**
         * The recall strategy {@link InvertedIndexStrategy} used for the inverted index database.
         *
         * @type { ?Array<InvertedIndexStrategy> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        invertedIndexStrategies?: Array<InvertedIndexStrategy>;
        /**
         * The name of the recall operation corresponding to this recall condition, used to identify this recall process.
         *
         * @type { ?RecallName }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        recallName?: RecallName;
        /**
         * Additional filtering conditions.
         *
         * @type { ?Array<FilterInfo> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        filters?: Array<FilterInfo>;
        /**
         * The maximum number of recalls for this recall process.
         *
         * @type { ?number }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        deepSize?: number;
    }
    /**
     * The type of the column name.
     *
     * @typedef { string } ColumnName
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    type ColumnName = string;
    /**
     * The type of the identifier name for a recall operation.
     *
     * @typedef { string } RecallName
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    type RecallName = string;
    /**
     * Describes the filter information.
     *
     * @interface FilterInfo
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface FilterInfo {
        /**
         * The column names of the filtered columns.
         * Any record in the database that satisfies the filter condition for any of its columns will be filtered out.
         *
         * @type { Array<ColumnName> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        columns: Array<ColumnName>;
        /**
         * The operator in the filter conditions.
         *
         * @type { ?Operator }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        operator?: Operator;
        /**
         * The filtering value in the filter conditions.
         *
         * @type { ?FilterValue}
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        filterValue?: FilterValue;
        /**
         * The filtering range in the filter conditions.
         *
         * @type { ?FilterRange }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        filterRange?: FilterRange;
    }
    /**
     * Describes the filtering value in the filter conditions.
     *
     * @typedef { string | number | bigint } FilterValue
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    type FilterValue = string | number | bigint;
    /**
     * Describes the filtering range in the filter conditions.
     *
     * @interface FilterRange
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface FilterRange {
        /**
         * The range of the filter: maximum.
         *
         * @type { number }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        max: number;
        /**
         * The range of the filter: minimum.
         *
         * @type { number }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        min: number;
    }
    /**
     * Types of the operator in the filter conditions.
     *
     * @enum { string }
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    enum Operator {
        /**
         * Means <column> = <value>.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        OP_EQ = '=',
        /**
         * Means <column> != <value>.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        OP_NE = '!=',
        /**
         * Means <column> < <value>, while <value> should be number.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        OP_LT = '<',
        /**
         * Means <column> <= <value>, while <value> should be number.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        OP_LE = '<=',
        /**
         * Means <column> > <value>, while <value> should be number.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        OP_GT = '>',
        /**
         * Means <column> >= <value>, while <value> should be number.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        OP_GE = '>=',
        /**
         * Means <column> IN <value>, while <value> should be string and be concatenated by ','.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        OP_IN = 'IN',
        /**
         * Means <column> NOT IN <value>, while <value> should be string and be concatenated by ','.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        OP_NOT_IN = 'NOT_IN',
        /**
         * Means <column> BETWEEN <range[0]> AND <range[1]>, while <value> should be array of numbers.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        OP_BETWEEN = 'BETWEEN',
        /**
         * Means <column> LIKE <value>, while <value> should be string.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        OP_LIKE = 'LIKE',
        /**
         * Means <column> NOT LIKE <value>, while <value> should be string.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        OP_NOT_LIKE = 'NOT_LIKE'
    }
    /**
     * Describes the inverted index recall strategy.
     *
     * @typedef { Bm25Strategy | ExactMatchingStrategy | ProximityStrategy } InvertedIndexStrategy
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    type InvertedIndexStrategy = Bm25Strategy | ExactMatchingStrategy | ProximityStrategy;
    /**
     * Describes the BM25 strategy used for inverted index recall.
     *
     * @interface Bm25Strategy
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface Bm25Strategy {
        /**
         * Represents the weights of multiple strategies. The weight must be non-negative number.
         *
         * @type { number }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        bm25Weight: number;
        /**
         * Represents the weights of multiple columns. The weight must be non-negative number.
         *
         * @type { ?Record<ColumnName, number> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        columnWeight?: Record<ColumnName, number>;
    }
    /**
     * Describes the exact phrase matching stratey used for inverted index recall.
     *
     * @interface ExactMatchingStrategy
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface ExactMatchingStrategy {
        /**
         * Represents the weights of multiple strategies. The weight must be non-negative number.
         *
         * @type { number }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        exactMatchingWeight: number;
        /**
         * Represents the weights of multiple columns. The weight must be non-negative number.
         *
         * @type { ?Record<ColumnName, number> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        columnWeight?: Record<ColumnName, number>;
    }
    /**
     * Describes the proximity and out-of-order matching stratey for inverted index recall.
     *
     * @interface ProximityStrategy
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface ProximityStrategy {
        /**
         * Represents the weights of multiple strategies. The weight must be non-negative number.
         *
         * @type { number }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        proximityWeight: number;
        /**
         * Represents the weights of multiple columns. The weight must be non-negative number.
         *
         * @type { ?Record<ColumnName, number> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        columnWeight?: Record<ColumnName, number>;
        /**
         * The offset configuration used for each out-of-order matching column. Must be positive integer.
         *
         * @type { ?Record<ColumnName, number> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        columnSlops?: Record<ColumnName, number>;
    }
    /**
     * Describes the recall conditions for vector retrieval.
     *
     * @interface VectorRecallCondition
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface VectorRecallCondition {
        /**
         * The query vector used for vector data retrieval {@link VectorQuery}.
         * Typically, the query vector is generated from the query term in Retriever {@link Retriever}
         * using an embedding model{@link TextEmbedding}.
         *
         * @type { VectorQuery }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        vectorQuery: VectorQuery;
        /**
         * Represents the table name in the database, supporting JOIN operations.
         *
         * @type { string }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        fromClause: string;
        /**
         * Represents the column name(s) of the primary key, and this parameter supports composite primary keys.
         *
         * @type { Array<ColumnName> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        primaryKey: Array<ColumnName>;
        /**
         * The names of the columns included in the recall results.
         *
         * @type { Array<ColumnName> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        responseColumns: Array<ColumnName>;
        /**
         * The name of the recall operation corresponding to this recall condition, used to identify this recall process.
         *
         * @type { ?RecallName }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        recallName?: RecallName;
        /**
         * Additional filtering conditions.
         *
         * @type { ?Array<FilterInfo> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        filters?: Array<FilterInfo>;
        /**
         * The maximum number of recalls for this recall process.
         *
         * @type { ?number }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        deepSize?: number;
    }
    /**
     * Describes the query vector.
     *
     * @interface VectorQuery
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface VectorQuery {
        /**
         * The column name of the vector column.
         *
         * @type { ColumnName }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        column: ColumnName;
        /**
         * The vector value of the vector column.
         * The system will verify whether an embedding model is available on the device and,
         * if so, automatically compute embeddings for the query terms.
         *
         * @type { ?Float32Array }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        value?: Float32Array;
        /**
         * The threshold used to filter out dissimilar vectors based on similarity.
         *
         * @type { ?number }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        similarityThreshold?: number;
    }
    /**
     * Describes the parameters of the re-ranking strategy.
     *
     * @interface RerankMethod
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface RerankMethod {
        /**
         * Represents the type of re-ranking algorithms.
         *
         * @type { RerankType }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        rerankType: RerankType;
        /**
         * Represents the mapping relationship between each retrieval channel and the re-ranking algorithm parameters.
         *
         * @type { ?Record<ChannelType, RerankParameter> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        parameters?: Record<ChannelType, RerankParameter>;
        /**
         * Indicates whether to use the softmax function to normalize the results from multiple recalls.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        isSoftmaxNormalized?: boolean;
    }
    /**
     * Represents type of re-ranking algorithms.
     *
     * @enum { number }
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    enum RerankType {
        /**
         * Represents Reciprocal Rank Fusion (RRF) method.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        RRF = 0,
        /**
         * Represents score-based recall fusion method.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        FUSION_SCORE = 1
    }
    /**
     * Describes the re-ranking algorithm parameter configuration.
     *
     * @typedef { InvertedIndexRerankParameter | VectorRerankParameter } RerankParameter
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    type RerankParameter = InvertedIndexRerankParameter | VectorRerankParameter;
    /**
     * Describes the parameters of the re-ranking algorithm used for inverted index.
     *
     * @interface InvertedIndexRerankParameter
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface InvertedIndexRerankParameter {
        /**
         * Represents the weight corresponding to each recall process. The weight must be non-negative number.
         *
         * @type { Record<RecallName, number> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        invertedIndexWeights: Record<RecallName, number>;
    }
    /**
     * Describes the parameters of the re-ranking algorithm used for vector data.
     *
     * @interface VectorRerankParameter
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface VectorRerankParameter {
        /**
         * Represents the weight corresponding to each recall process. The weight must be non-negative number.
         *
         * @type { Record<RecallName, number> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        vectorWeights: Record<RecallName, number>;
        /**
         * The tiered thresholds for vector recall,
         * which will affect the division of similarityLevel {@link SimilarityLevel} in the retrieval results.
         * Currently, the results can be divided into three tiers (high, medium, low) using two thresholds.
         *
         * @type { ?Array<number> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        thresholds?: Array<number>;
        /**
         * An optimization measure for query terms containing numbers.
         * Since embedding models cannot accurately represent numerical magnitudes,
         * and numerical values are often critical retrieval criteria,
         * this measure ensures that if a column in the vector recall results contains numbers that differ from those in the query terms,
         * the final similarity level {@link SimilarityLevel} will not exceed a medium level.
         *
         * @type { ?Record<RecallName, ColumnName> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        numberInspector?: Record<RecallName, ColumnName>;
    }
    /**
     * Describes the retrieval results.
     *
     * @interface RdbRecords
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface RdbRecords {
        /**
         * Describes the collection of retrieved records {@link ItemInfo}.
         *
         * @type { Array<ItemInfo> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        records: Array<ItemInfo>;
        /**
         * Represents the ground truth item information missed during the retrieval process.
         * This parameter is filled only when the explanation in {@link RetrievalCondition} is enabled.
         *
         * @type { ?Array<ItemInfo> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        missedGroundTruths?: Array<ItemInfo>;
    }
    /**
     * Describes the specific content of each record in the retrieval results.
     *
     * @interface ItemInfo
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface ItemInfo {
        /**
         * Represents the primary key of the retrieval results.
         *
         * @type { string }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        primaryKey: string;
        /**
         * Represents the recall columns and their contents.
         *
         * @type { Record<string, relationalStore.ValueType> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        columns: Record<string, relationalStore.ValueType>;
        /**
         * Represents the final score after retrieval re-ranking,
         * which qualitatively reflects the similarity between the re-ranked records and the query terms.
         *
         * @type { number }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        score: number;
        /**
         * Represents the scores from each recall process,
         * which qualitatively reflects the similarity between the records after each recall and the query terms.
         *
         * @type { Record<ChannelType, Record<string, RecallScore>> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        recallScores: Record<ChannelType, Record<string, RecallScore>>;
        /**
         * Represents the scores from different inverted index strategies.
         *
         * @type { Record<string, number> }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        features: Record<string, number>;
        /**
         * Represents the similarity of the retrieval results to the query vectors.
         * Influenced by vectorRerankThresholds in the re-ranking algorithm configuration {@link VectorRerankParameter}.
         * Currently, supporting three tiers (high, medium, low).
         *
         * @type { SimilarityLevel }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        similarityLevel: SimilarityLevel;
    }
    /**
     * Describes the score of the recall process.
     *
     * @interface RecallScore
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    interface RecallScore {
        /**
         * Represents the recall score.
         *
         * @type { number }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        score: number;
        /**
         * Indicates whether the score is obtained from the original recall process or from a reverse query process.
         *
         * @type { boolean }
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        isReverseQuery: boolean;
    }
    /**
     * Represents the similarity of the retrieval result to the query vector.
     *
     * @enum { number }
     * @syscap SystemCapability.DataAugmentation.Retrieval
     * @since 6.0.0(20)
     */
    enum SimilarityLevel {
        /**
         * There is no query vector in the recall conditions {@link VectorRecallCondition}.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        NONE = 0,
        /**
         * Indicates a low similarity between the query vector and the retrieval result.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        LOW = 1,
        /**
         * Indicates a medium similarity between the query vector and the retrieval result.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        MEDIUM = 2,
        /**
         * Indicates a high similarity between the query vector and the retrieval result.
         *
         * @syscap SystemCapability.DataAugmentation.Retrieval
         * @since 6.0.0(20)
         */
        HIGH = 3
    }
}
export default retrieval;
