/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2025. All rights reserved.
 */
/**
 * @file This module is used to convert text to speech.
 * @kit CoreSpeechKit
 */
import type { AsyncCallback, BusinessError, Callback, ErrorCallback } from '@ohos.base';
/**
 * This module is used to convert text to speech.
 *
 * @namespace textToSpeech
 * @syscap SystemCapability.AI.TextToSpeech
 * @since 4.1.0(11)
 */
declare namespace textToSpeech {
    /**
     * Initialize TextToSpeech engine and returns an instance.
     * If the engine is initialized, an engine instance will be returned by callback. Otherwise, an error code and description will be returned by callback.
     *
     * @param { CreateEngineParams } createEngineParams - The parameters of initializing engine.
     * @param { AsyncCallback<TextToSpeechEngine> } callback - The callback of creating instance.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 1002300002 - The language is not supported.
     * @throws { BusinessError } 1002300003 - The person is not supported.
     * @throws { BusinessError } 1002300005 - Create engine failed.
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    function createEngine(createEngineParams: CreateEngineParams, callback: AsyncCallback<TextToSpeechEngine>): void;
    /**
     * Initialize TextToSpeech engine and returns an instance.
     * If the engine is initialized, an engine instance will be returned by callback. Otherwise, an error code and description will be returned by callback.
     *
     * @param { CreateEngineParams } createEngineParams - The parameters of initializing engine.
     * @returns { Promise<TextToSpeechEngine> } The result of instance.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 1002300002 - The language is not supported.
     * @throws { BusinessError } 1002300003 - The person is not supported.
     * @throws { BusinessError } 1002300005 - Create engine failed.
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    function createEngine(createEngineParams: CreateEngineParams): Promise<TextToSpeechEngine>;
    /**
     * The definition of Text-to-Speech Engine.
     *
     * @interface TextToSpeechEngine
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface TextToSpeechEngine {
        /**
         * Set the callback of Text-To-Speech that will receive all information about the Text-To-Speech.
         *
         * @param { SpeakListener } listener - The callback function of recognition.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        setListener(listener: SpeakListener): void;
        /**
         * Convert text to speech.
         * Note that the setListener method must be invoked first. Otherwise,
         * the callbacks of the speech cannot be received.
         *
         * @param { string } text - Text to be synthesized.
         * @param { SpeakParams } speakParams - The parameters of speech.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 1002300001 - The length of text is out of range or empty.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        speak(text: string, speakParams: SpeakParams): void;
        /**
         * Get the language and person types supported by the Text-to-Speech engine.
         *
         * @param { VoiceQuery } params - The Parameters of querying.
         * @param { AsyncCallback<Array<VoiceInfo>> } callback - The callback of querying.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        listVoices(params: VoiceQuery, callback: AsyncCallback<Array<VoiceInfo>>): void;
        /**
         * Get the language and person types supported by the Text-to-Speech engine.
         *
         * @param { VoiceQuery } params - The Parameters of querying.
         * @returns { Promise<Array<VoiceInfo>> } The result of querying.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        listVoices(params: VoiceQuery): Promise<Array<VoiceInfo>>;
        /**
         * Stop speaking.
         * Note that the setListener method must be invoked first. Otherwise, the callbacks of stop cannot be received.
         *
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        stop(): void;
        /**
         * Check whether the Text-to-Speech engine is busy.
         * Note that the setListener method must be invoked first. Otherwise, the callbacks of error cannot be received.
         *
         * @returns { boolean } True is returned if the Text-To-Speech engine is busy. Otherwise, false is returned.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        isBusy(): boolean;
        /**
         * Release the resources of Text-to-Speech engine.
         *
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        shutdown(): void;
    }
    /**
     * The callback function of speech.
     *
     * @interface SpeakListener
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface SpeakListener {
        /**
         * Indicates the callback for starting speech.
         *
         * @param { string } requestId - The request ID of speech.
         * @param { StartResponse } response - The parameters of speech.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        onStart(requestId: string, response: StartResponse): void;
        /**
         * Indicates the callback for completing speech or completing synthesis.
         *
         * @param { string } requestId - The request ID of speech.
         * @param { CompleteResponse } response - The related parameters of completing speech.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        onComplete(requestId: string, response: CompleteResponse): void;
        /**
         * Indicates the callback for success of stopping speech.
         *
         * @param { string } requestId - The request ID of speech.
         * @param { StopResponse } response - The related parameters of stopping speech.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        onStop(requestId: string, response: StopResponse): void;
        /**
         * Indicates the callback of error.
         *
         * @param { string } requestId - The request ID of speech.
         * @param { number } errorCode - The error code of speech.
         * @param { string } errorMessage - The detailed description of the error.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        onError(requestId: string, errorCode: number, errorMessage: string): void;
        /**
         * Indicates the callback for Synthesis, and the audio data is returned through parameter of audio.
         * Note that when you need to receive a synthesized audio stream, the onData method needs to be called.
         *
         * @type { ?function }
         * @param { string } requestId - The request ID of speech.
         * @param { ArrayBuffer } audio - Audio stream.
         * @param { SynthesisResponse } response - The related parameters of the returned audio stream information.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        /**
         * Indicates the callback for Synthesis, and the audio data is returned through parameter of audio.
         * Note that when you need to receive a synthesized audio stream, the onData method needs to be called.
         *
         * @type { ?OnDataCallback }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        onData?: OnDataCallback;
    }
    /**
     * The parameters of initializing engine.
     *
     * @interface CreateEngineParams
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface CreateEngineParams {
        /**
         * Indicates language info of the speech.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        language: string;
        /**
         * Indicates person info of the speech.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        person: number;
        /**
         * Indicates module type of the speech.
         * The value 0 indicates online, value 1 indicates offline.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        online: number;
        /**
         * Indicates entity info of the speech.
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        extraParams?: Record<string, Object>;
    }
    /**
     * The parameters of speech.
     *
     * @interface SpeakParams
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface SpeakParams {
        /**
         * Indicates request ID of the speech.
         * Note that the request ID must be unique.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        requestId: string;
        /**
         * Indicates entity info of the speech.
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        extraParams?: Record<string, Object>;
    }
    /**
     * The Parameters of querying language and person supported by Text-to-Speech.
     *
     * @interface VoiceQuery
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface VoiceQuery {
        /**
         * Indicates request ID of the speech.
         * Note that the request ID must be unique.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        requestId: string;
        /**
         * Indicates module type of the speech.
         * The value 0 indicates online, value 1 indicates offline.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        online: number;
        /**
         * Indicates entity info of the speech.
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        extraParams?: Record<string, Object>;
    }
    /**
     * The information of language and person supported by Text-to-Speech.
     *
     * @interface VoiceInfo
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface VoiceInfo {
        /**
         * Indicates language info of the speech.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        language: string;
        /**
         * Indicates person info of the speech.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        person: number;
        /**
         * Indicates style info of the voice.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        style: string;
        /**
         * Indicates gender info of the voice.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        gender: string;
        /**
         * Indicates description of the voice.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        description: string;
        /**
         * Indicates status of the voice.
         * @type { ?string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        status?: string;
    }
    /**
     * The parameters of speech.
     *
     * @interface StartResponse
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface StartResponse {
        /**
         * Indicates audio type of the speech.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        audioType: string;
        /**
         * Indicates sample rate of the speech.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        sampleRate: number;
        /**
         * Indicates sample bit of the speech.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        sampleBit: number;
        /**
         * Indicates audio channel of the speech.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        audioChannel: number;
        /**
         * Indicates compress rate of the speech.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        compressRate: number;
    }
    /**
     * The related parameters of stopping speech.
     *
     * @interface StopResponse
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface StopResponse {
        /**
         * The type of stopping speech.
         * The value 0 indicates that synthesis and speech are stopped at the same time.
         * The value 1 indicates that only the speech is stopped.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        type: number;
        /**
         * Indicates message of stopping.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        message: string;
    }
    /**
     * The related parameters of completing speech.
     *
     * @interface CompleteResponse
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface CompleteResponse {
        /**
         * Indicates the end of synthesis or speech.
         * The value 0 indicates the completion of synthesis, the value 1 indicates the completion of speech.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        type: number;
        /**
         * Indicates message of completing.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        message: string;
    }
    /**
     * The related parameters of Synthesis.
     *
     * @interface SynthesisResponse
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 4.1.0(11)
     */
    export interface SynthesisResponse {
        /**
         * Indicates the sequence of the audio data.
         * The value starts from 1 and increases by 1 each time.
         * @type { number }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        sequence: number;
        /**
         * Indicates type of the audio data.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 4.1.0(11)
         */
        audioType: string;
    }
    /**
     * Get the language and person types supported by the Text-to-Speech engine.
     *
     * @param { VoiceQuery } queryParams - The Parameters of querying.
     * @returns { Promise<VoiceInfo[]> } The result of querying.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3.Parameter verification failed.
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 5.1.1(19)
     */
    function listVoices(queryParams: VoiceQuery): Promise<VoiceInfo[]>;
    /**
     * Download voice supported by the Text-to-Speech engine.
     *
     * @param { VoiceDownload } downloadParams - The Parameters of download.
     * @param { AsyncCallback<DownloadResponse> } callback - The callback of download.
     * @throws { BusinessError } 1002300008 - Failed to download voice.
     * @throws { BusinessError } 1002300009 - Parameter error. Possible causes:
     * <br>1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 1002300010 - Voice has already been downloaded.
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 5.1.1(19)
     */
    function downloadVoice(downloadParams: VoiceDownload, callback: AsyncCallback<DownloadResponse>): void;
    /**
     * Indicates the callback for Synthesis, and the audio data is returned through parameter of audio.
     *
     * @typedef { function } OnDataCallback
     * @param { string } requestId - The request ID of speech.
     * @param { ArrayBuffer } audio - Audio stream.
     * @param { SynthesisResponse } response - The related parameters of the returned audio stream information.
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 5.1.1(19)
     */
    type OnDataCallback = (requestId: string, audio: ArrayBuffer, response: SynthesisResponse) => void;
    /**
     * The Parameters of download voices supported by Text-to-Speech.
     *
     * @interface VoiceDownload
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 5.1.1(19)
     */
    export interface VoiceDownload {
        /**
         * Indicates request ID of the speech.
         * Note that the request ID must be unique.
         * @type {string}
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        requestId: string;
        /**
         * Indicates language info of the speech.
         * @type {string}
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        language: string;
        /**
         * Indicates person info of the speech.
         * @type {number}
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        person: number;
        /**
         * Indicates style info of the voice.
         * @type {string}
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        style: string;
    }
    /**
     * The Parameters of download voices callback supported by Text-to-Speech.
     *
     * @interface DownloadResponse
     * @syscap SystemCapability.AI.TextToSpeech
     * @since 5.1.1(19)
     */
    export interface DownloadResponse {
        /**
         * Indicates requestId of download voice.
         * @type { string }
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        requestId: string;
        /**
         * Subscribes start event of download voice.
         * @param { 'start' } type - Type of the event to listen for. Only the start event is supported.
         * @param { Callback<string> } callback - Callback invoked when start download voice.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        on(type: 'start', callback: Callback<string>): void;
        /**
         * Unsubscribes from start events.
         * @param { 'start' } type - Type of the event to listen for. Only the start event is supported.
         * @param { Callback<string> } [callback] - Callback invoked when start download voice.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        off(type: 'start', callback?: Callback<string>): void;
        /**
         * Subscribes progress event of download voice.
         * @param { 'progress' } type - Type of the event to listen for. Only the progress event is supported.
         * @param { Callback<string> } callback - Callback invoked when progress change.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        on(type: 'progress', callback: Callback<string>): void;
        /**
         * Unsubscribes from progress events.
         * @param { 'progress' } type - Type of the event to listen for. Only the progress event is supported.
         * @param { Callback<string>} [callback] - Callback invoked when progress change.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        off(type: 'progress', callback?: Callback<string>): void;
        /**
         * Subscribes complete event of download voice.
         * @param { 'complete' } type - Type of the event to listen for. Only the complete event is supported.
         * @param { Callback<VoiceInfo> } callback - Callback invoked when complete download voice.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        on(type: 'complete', callback: Callback<VoiceInfo>): void;
        /**
         * Unsubscribes from complete events.
         * @param { 'complete' } type - Type of the event to listen for. Only the complete event is supported.
         * @param { Callback<VoiceInfo>} [callback] - Callback invoked when complete download voice.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        off(type: 'complete', callback?: Callback<VoiceInfo>): void;
        /**
         * Subscribes cancel event of download voice.
         * @param { 'cancel' } type - Type of the event to listen for. Only the cancel event is supported.
         * @param { Callback<string> } callback - Callback invoked when user cancel download voice.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        on(type: 'cancel', callback: Callback<string>): void;
        /**
         * Unsubscribes from cancel events.
         * @param { 'cancel' } type - Type of the event to listen for. Only the cancel event is supported.
         * @param { Callback<string>} [callback] - Callback invoked when user cancel download voice.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        off(type: 'cancel', callback?: Callback<string>): void;
        /**
         * Subscribes error event of download voice.
         * @param { 'error' } type - Type of the event to listen for. Only the error event is supported.
         * @param { ErrorCallback<BusinessError> } callback - Callback invoked when download voice occur error.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        on(type: 'error', callback: ErrorCallback<BusinessError>): void;
        /**
         * Unsubscribes from error events.
         * @param { 'error' } type - Type of the event to listen for. Only the error event is supported.
         * @param { ErrorCallback<BusinessError>} [callback] - Callback invoked when download voice occur error.
         * @syscap SystemCapability.AI.TextToSpeech
         * @since 5.1.1(19)
         */
        off(type: 'error', callback?: ErrorCallback<BusinessError>): void;
    }
}
export default textToSpeech;
