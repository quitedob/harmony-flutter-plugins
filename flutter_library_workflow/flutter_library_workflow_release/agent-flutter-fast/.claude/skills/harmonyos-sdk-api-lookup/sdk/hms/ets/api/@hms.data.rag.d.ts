/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Provide RAG capabilities.
 * @kit DataAugmentationKit
 */
import type { AsyncCallback, BusinessError, Callback } from '@ohos.base';
import type common from '@ohos.app.ability.common';
import type retrieval from '@hms.data.retrieval';
/**
 * Provide methods for RAG.
 *
 * @namespace rag
 * @syscap SystemCapability.DataAugmentation.RAG
 * @stagemodelonly
 * @since 6.0.0(20)
 */
declare namespace rag {
    /**
     * The answer for streamChat.
     *
     * @interface LLMStreamAnswer
     * @syscap SystemCapability.DataAugmentation.RAG
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface LLMStreamAnswer {
        /**
         * Describe whether the output of the answer has ended.
         *
         * @type { boolean }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        isFinished: boolean;
        /**
         * The chunk of answer.
         *
         * @type { string }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        chunk: string;
        /**
         * The error info of LLM.
         *
         * @type { ?BusinessError<string> }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        err?: BusinessError<string>;
    }
    /**
     * The status of streamChat request.
     *
     * @enum { number }
     * @syscap SystemCapability.DataAugmentation.RAG
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    enum LLMRequestStatus {
        /**
         * LLM_SUCCESS: request LLM success.
         *
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        LLM_SUCCESS = 0,
        /**
         * LLM_REQUEST_ERROR: request error.
         * There are some inner error when streamChat.
         *
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        LLM_REQUEST_ERROR = 1,
        /**
         * LLM_LOAD_FAILED: LLM load failed.
         *
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        LLM_LOAD_FAILED = 2,
        /**
         * LLM_TIMEOUT: LLM request timeout.
         *
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        LLM_TIMEOUT = 3,
        /**
         * LLM_BUSY: LLM busy.
         *
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        LLM_BUSY = 4
    }
    /**
     * The result requested by streamChat.
     *
     * @interface LLMRequestInfo
     * @syscap SystemCapability.DataAugmentation.RAG
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface LLMRequestInfo {
        /**
         * The chat ID for the large model.
         *
         * @type { number }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        chatId: number;
        /**
         * The status of streamChat request.
         *
         * @type { LLMRequestStatus }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        status: LLMRequestStatus;
    }
    /**
     * The class for requesting large models that needs to be implemented by the developer.
     *
     * @syscap SystemCapability.DataAugmentation.RAG
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    abstract class ChatLLM {
        /**
         * Implement the logic for large model requests here.
         *
         * @param { string } query - Indicates the query.
         * @param { Callback<LLMStreamAnswer> } callback - Indicates the answer of the query.
         * @returns { Promise<LLMRequestInfo> } The LLM request info {@link LLMRequestInfo}.
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        abstract streamChat(query: string, callback: Callback<LLMStreamAnswer>): Promise<LLMRequestInfo>;
        /**
         * Implement the logic for cancel large model stream here.
         *
         * @param { number } chatId - The ID of the large model request that is to be canceled.
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        abstract cancel(chatId: number): void;
    }
    /**
     * The config for RagSession
     *
     * @interface Config
     * @syscap SystemCapability.DataAugmentation.RAG
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface Config {
        /**
         * The provider of ChatLLM.
         *
         * @type { ChatLLM }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        llm: ChatLLM;
        /**
         * The config of retrieval.
         *
         * @type { retrieval.RetrievalConfig }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        retrievalConfig: retrieval.RetrievalConfig;
        /**
         * The condition of retrieval.
         *
         * @type { retrieval.RetrievalCondition }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        retrievalCondition: retrieval.RetrievalCondition;
    }
    /**
     * The data of stream.
     *
     * @interface Answer
     * @syscap SystemCapability.DataAugmentation.RAG
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface Answer {
        /**
         * The answer to the summary of the question.
         *
         * @type { string }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        chunk: string;
        /**
         * The matched result for retrieval.
         *
         * @type { ?Array<retrieval.ItemInfo> }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        data?: Array<retrieval.ItemInfo>;
    }
    /**
     * The type of stream answer.
     *
     * @enum { number }
     * @syscap SystemCapability.DataAugmentation.RAG
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    enum StreamType {
        /**
         * THOUGHT: The Thinking process data.
         *
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        THOUGHT = 0,
        /**
         * REFERENCE: The source of the retrieved documents or knowledge
         *
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        REFERENCE = 1,
        /**
         * ANSWER: The final result of the generated content.
         *
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        ANSWER = 2
    }
    /**
     * The answer for streamRun.
     *
     * @interface Stream
     * @syscap SystemCapability.DataAugmentation.RAG
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface Stream {
        /**
         * Describe the data type of answer.
         *
         * @type { StreamType }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        type: StreamType;
        /**
         * Describe the data of answer.
         *
         * @type { Answer }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        answer: Answer;
        /**
         * Describe whether the stream output has ended.
         *
         * @type { boolean }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        isFinished: boolean;
    }
    /**
     * The config for streamRun.
     *
     * @interface RunConfig
     * @syscap SystemCapability.DataAugmentation.RAG
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface RunConfig {
        /**
         * Used to specify the data type for streaming output.
         *
         * @type { Array<StreamType> }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        answerTypes: Array<StreamType>;
    }
    /**
     * User feedback information.
     *
     * @interface FeedbackInfo
     * @syscap SystemCapability.DataAugmentation.RAG
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface FeedbackInfo {
        /**
         * Unique identifier for a specific run within a session.
         *
         * @type { number }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        runId: number;
        /**
         * Used to specify the user's score of the answer.
         *
         * @type { number }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        score: number;
        /**
         * Used to specify the information of the answers adopted by the user.
         *
         * @type { ?Record<StreamType, Answer> }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        source?: Record<StreamType, Answer>;
        /**
         * Text information of user reviews.
         *
         * @type { ?string }
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        comment?: string;
    }
    /**
     * RAG Session.
     *
     * @interface RagSession
     * @syscap SystemCapability.DataAugmentation.RAG
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    interface RagSession {
        /**
         * The function to ask a question. Answers are streamed.
         *
         * @param { string } question - Indicates the question.
         * @param { RunConfig } config - Indicates the {@link RunConfig} config of the question.
         * @param { AsyncCallback<Stream> } callback - The {@link Stream} object if the operation is successful.
         * @returns { Promise<number> } - The run ID of this call.
         * @throws { BusinessError } 1021000000 - Insufficient system resources or memory access exception.
         * @throws { BusinessError } 1021000001 - A timeout occurred when calling the LLM.
         * @throws { BusinessError } 1021000002 - A loading failure occurred when calling the LLM.
         * @throws { BusinessError } 1021000003 - A request failure occurred when calling the LLM.
         * @throws { BusinessError } 1021000004 - The LLM chat is busy.
         * @throws { BusinessError } 1021000005 - The output of LLM chat does not comply with the constraints.
         * @throws { BusinessError } 1021000007 - The RAG session is busy.
         * @throws { BusinessError } 1021000008 - The RAG session is Already closed.
         * @throws { BusinessError } 1021000009 - User has canceled the stream run.
         * @throws { BusinessError } 1021000010 - A timeout occurred in the session.
         * @throws { BusinessError } 1021000011 - Some parameter does not meet the constraints. Possible causes:
         * <br> 1. The length of the string parameter or the length of the numeric parameter does not comply with the constraints.
         * <br> 2. The string parameter contains invalid characters.
         * @throws { BusinessError } 1021000012 - The knowledge base is not available.
         * @throws { BusinessError } 1021000013 - Retrieval: An error occurred during the Retrieval.
         * @throws { BusinessError } 1021000014 - Retrieval: There are invalid primary keys.
         * @throws { BusinessError } 1021000015 - Retrieval: A re-ranking algorithm that does not support composite primary keys was used.
         * @throws { BusinessError } 1021000016 - Retrieval: The filter input is invalid.
         * @throws { BusinessError } 1021000017 - Retrieval: There are invalid recall names in RecallCondition.
         * @throws { BusinessError } 1021000018 - Retrieval: The vector similarity threshold in VectorQuery is higher than the tiered threshold in VectorRerankParameter.
         * @throws { BusinessError } 1021000019 - Retrieval: RerankMethod parameters do not match the channel type.
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        streamRun(question: string, config: RunConfig, callback: AsyncCallback<Stream>): Promise<number>;
        /**
         * Cancels a Q&A task.
         *
         * @param { number } runId  ID of the Q&A request to be canceled.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 1021000000  Internal execution error.
         * @throws { BusinessError } 1021000008  The RAG session is closed.
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        cancel(runId: number): Promise<void>;
        /**
         * Close the RagSession.
         *
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 1021000000 - Insufficient system resources or memory access exception.
         * @syscap SystemCapability.DataAugmentation.RAG
         * @stagemodelonly
         * @since 6.0.0(20)
         */
        close(): Promise<void>;
    }
    /**
     * Obtains a RagSession.
     *
     * @param { common.Context } context - Indicates the context of an application or ability.
     * @param { Config } config - Indicates the {@link Config} configuration of the session.
     * @returns { Promise<RagSession> } The RagSession object {@link RagSession}.
     * @throws { BusinessError } 1021000000 - Insufficient system resources or memory access exception.
     * @throws { BusinessError } 1021000006 - The RAG session already exists.
     * @syscap SystemCapability.DataAugmentation.RAG
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function createRagSession(context: common.Context, config: Config): Promise<RagSession>;
    /**
     * Receive user feedback information.
     *
     * @param { common.Context } context - Indicates the context of an application or ability.
     * @param { FeedbackInfo } feedbackInfo - Indicates the {@link FeedbackInfo} user feedback information.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 1021000000 - Insufficient system resources or memory access exception.
     * @throws { BusinessError } 1021000011 - Some parameter does not meet the constraints. Possible causes:
     * <br> 1. The length of the string parameter or the length of the numeric parameter does not comply with the constraints.
     * <br> 2. The string parameter contains invalid characters.
     * @syscap SystemCapability.DataAugmentation.RAG
     * @stagemodelonly
     * @since 6.0.0(20)
     */
    function feedback(context: common.Context, feedbackInfo: FeedbackInfo): Promise<void>;
}
export default rag;
