/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2024. All rights reserved.
 */
/**
 * @file Defines the capabilities of HealthServiceKit.
 * @kit HealthServiceKit
 * @bundle com.huawei.hmos.health.kit/HealthService/ets/Index 5.0.0(12)
 */
import type healthStore from './@hms.health.store';
import { Callback } from "@ohos.base";
/**
 * This module provides api to comunicates with the health service.
 *
 * @namespace healthService
 * @syscap SystemCapability.Health.HealthService
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace healthService {
    /**
     * Represents a sample event
     * SampleEvent defines a model of command or status change.
     * eventData need to be in the form of a key-value pair
     *
     * @typedef SampleEvent
     * @syscap SystemCapability.Health.HealthService
     * @since 5.1.0(18)
     */
    interface SampleEvent {
        /**
         * Event id
         *
         * @type { number }
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        eventId: number;
        /**
         * Event level
         *
         * @type { number }
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        eventLevel: number;
        /**
         * Event data
         *
         * @type { string }
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        eventData: string;
        /**
         * Source package name of the event
         *
         * @type { ?string }
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        srcPkgName?: string;
        /**
         * Destination package name of the event
         *
         * @type { ?string }
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        destPkgName?: string;
    }
    /**
     * Represents a structure of real data, typically for sensor data.
     *
     * @typedef {SampleReal<K extends Record<string, healthStore.HealthValueType> = Record<string, healthStore.HealthValueType>>}
     * @syscap SystemCapability.Health.HealthService
     * @since 5.1.0(18)
     */
    interface SampleReal<K extends Record<string, healthStore.HealthValueType> = Record<string, healthStore.HealthValueType>> {
        /**
         * Data type of the data.
         *
         * @type { healthStore.DataType }
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        dataType: healthStore.DataType;
        /**
         * time of the data, Unix epoch in millisecond.
         *
         * @type { number }
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        time: number;
        /**
         * Fields of the data.
         *
         * @type { Pick<K, keyof K> }
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        fields: Pick<K, keyof K>;
        /**
         * A unique device id to associate a device.
         *
         * @type { ?string }
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        deviceUniqueId?: string;
    }
    /**
     * Namespace for daily activity data and api.
     *
     * @namespace workout
     * @syscap SystemCapability.Health.HealthService
     * @atomicservice
     * @since 5.0.0(12)
     */
    namespace workout {
        /**
         * Represent the configType of workout.
         *
         * @typedef { number | string | boolean }
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        type ConfigType = number | string | boolean;
        /**
         * Workout Configuration like sport type, target, course info.
         *
         * @typedef WorkoutConfig
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        interface WorkoutConfig {
            /**
             * Workout type like COURSE_LINK, ACTIVITY_LINK.
             *
             * @type { LinkageType }
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            linkageType: LinkageType;
            /**
             * Sport type of workout.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            sportType: number;
            /**
             * Goals of workout.
             *
             * @type { ?Goal[] }
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            activityGoals?: Goal[];
            /**
             * ExtensionConfig of workout.
             *
             * @type { ?Record<string, ConfigType> }
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            extensionConfig?: Record<string, ConfigType>;
        }
        /**
         * workout target, like start a activity with a goal of 1km.
         *
         * @typedef Goal
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        interface Goal {
            /**
             * Goal type
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            type: number;
            /**
             * Goal value
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            value: number;
        }
        /**
         * Provides the data of today's total sport record and goals.
         *
         * @typedef ActivityReport
         * @syscap SystemCapability.Health.HealthService
         * @atomicservice
         * @since 5.0.0(12)
         */
        interface ActivityReport {
            /**
             * Indicates the value of today's total steps.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            steps: number;
            /**
             * Indicates the value of today's total step goals.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            stepsGoal?: number;
            /**
             * Indicates the value of today's total active calories.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            activeCalories: number;
            /**
             * Indicates the value of today's total active calories goals.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            activeCaloriesGoal?: number;
            /**
             * Indicates the value of today's total exercise duration.
             * Intensity is the cumulative amount of moderate to high-intensity exercise in a day.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            exercise: number;
            /**
             * Indicates the value of today's total exercise duration goals.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            exerciseGoal?: number;
            /**
             * Indicates the value of today's total active hours.
             * Active hours are the number of hours when standing up for at least 1 minute.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            activeHours: number;
            /**
             * Indicates the value of today's total active hours goals.
             * Active hours are the number of hours when standing up for at least 1 minute.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            activeHoursGoal?: number;
        }
        /**
         * Set activity configuration.
         *
         * @param { WorkoutConfig } workoutConfig Configuration of workout
         * @returns { Promise<void> } Returned promise.
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * @throws { BusinessError } 1009104003 - Illegal command. Called when workout not in stoped or idle state.
         * @throws { BusinessError } 1009104999 - System internal error.
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        function config(workoutConfig: WorkoutConfig): Promise<void>;
        /**
         * Start a activity.
         *
         * @returns { Promise<StartResult> } Result of function call, contains the return code and reason.
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 1009104001 - Sport service busy. Workout is already started by other application.
         * @throws { BusinessError } 1009104002 - Unsupported sport type.
         * @throws { BusinessError } 1009104003 - Illegal command. Called when workout in sporting, paused or stoped state.
         * @throws { BusinessError } 1009104004 - Permission verification error. Application has no permission, such as Motion Permission.
         * @throws { BusinessError } 1009104999 - System internal error.
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        function start(): Promise<StartResult>;
        /**
         * Pause a activity.
         *
         * @returns { Promise<void> } Returned promise.
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 1009104003 - Illegal command. Called when workout in ready, paused or stoped state.
         * @throws { BusinessError } 1009104999 - System internal error.
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        function pause(): Promise<void>;
        /**
         * Resume a activity.
         *
         * @returns { Promise<void> } Returned promise.
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 1009104003 - Illegal command. Called when workout in ready, sporting or stoped state.
         * @throws { BusinessError } 1009104999 - System internal error.
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        function resume(): Promise<void>;
        /**
         * Stop a activity.
         *
         * @returns { Promise<void> } Returned promise.
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 1009104003 - Illegal command. Called when workout is not started.
         * @throws { BusinessError } 1009104999 - System internal error.
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        function stop(): Promise<void>;
        /**
         * Subscribe all types of data.
         *
         * @param { undefined } dataType DataType is undefined means every type data that can be obtained.
         * @param { Callback<SampleReal[]> } listener Callback for data subscription.
         * @returns { Promise<void> } Returned promise.
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        function onData(dataType: undefined, listener: Callback<SampleReal[]>): Promise<void>;
        /**
         * Supports subscription by major type, and subscribe to one type at a time.
         * It is recommended that a maximum of three types of data be subscribed.
         *
         * @param { healthStore.DataType } dataType Defined type of data.
         * @param { Callback<SampleReal[]> } listener Callback for data subscription.
         * @returns { Promise<void> } Returned promise.
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *     2. Incorrect parameter types.
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        function onData(dataType: healthStore.DataType, listener: Callback<SampleReal[]>): Promise<void>;
        /**
         * Unsubscribe subscription of all types of data.
         *
         * @param { undefined } dataType DataType is undefined means every type data that can be obtained.
         * @param { Callback<SampleReal[]> } listener Callback for data subscription.
         * @returns { Promise<void> } Returned promise.
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *     2. Parameter verification failed
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        function offData(dataType: undefined, listener: Callback<SampleReal[]>): Promise<void>;
        /**
         * Unsubscribe subscription of a specified data type.
         *
         * @param { healthStore.DataType } dataType Defined type of data.
         * @param { Callback<SampleReal[]> } listener Callback for data subscription.
         * @returns { Promise<void> } Returned promise.
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *     2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        function offData(dataType: healthStore.DataType, listener: Callback<SampleReal[]>): Promise<void>;
        /**
         * Send data to linkages.
         *
         * @param { SampleReal[] } sampleReal Realtime data.
         * @returns { Promise<void> } Returned promise.
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *     2. Incorrect parameter types.
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        function sendData(sampleReal: SampleReal[]): Promise<void>;
        /**
         * Subscribe event.
         *
         * @param { "*" } event event key
         * @param { Callback<SampleEvent> } listener Callback for event subscription.
         * @returns { Promise<void> } Returned promise.
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        function onEvent(event: "*", listener: Callback<SampleEvent>): Promise<void>;
        /**
         * Unsubscribe event.
         *
         * @param { "*" } event event key.
         * @param { Callback<SampleEvent> } listener Callback for event subscription.
         * @returns { Promise<void> } Returned promise.
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *     2. Parameter verification failed
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        function offEvent(event: "*", listener: Callback<SampleEvent>): Promise<void>;
        /**
         * Send event to linkages.
         *
         * @param { SampleEvent } event Device control event.
         * @returns { Promise<void> } Returned promise.
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        function sendEvent(event: SampleEvent): Promise<void>;
        /**
         * Reads today's total activity sport.
         * Requires read permission for DAILY_ACTIVITIES data type.
         *
         * @returns { Promise<ActivityReport> } Result of today's total sport record and goals.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 14500101 - Service exception.
         * @syscap SystemCapability.Health.HealthService
         * @atomicservice
         * @since 5.0.0(12)
         */
        function readActivityReport(): Promise<ActivityReport>;
        /**
         * Result code of start a activity.
         *
         * @enum { number }
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        enum StartCode {
            /**
             * Start success.
             *
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            SUCCESS = 0,
            /**
             * Workout is started.
             *
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            WORKOUT_WORKING = 1,
            /**
             * No connected device.
             *
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            NO_SUPPORTED_DEVICE = 2,
            /**
             * Device busy.
             *
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            DEVICE_BUSY = 3
        }
        /**
         * Start result of workout
         *
         * @typedef StartResult
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        interface StartResult {
            /**
             * Start code
             *
             * @type { StartCode }
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            startCode: StartCode;
            /**
             * Device states of connected devices
             *
             * @type { DeviceState[] }
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            deviceState: DeviceState[];
        }
        /**
         * Device state of connected device
         *
         * @typedef DeviceState
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        interface DeviceState {
            /**
             * Device id
             *
             * @type { string }
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            deviceId: string;
            /**
             * Device name
             *
             * @type { ?string }
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            deviceName?: string;
            /**
             * Device state
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            state: number;
        }
        /**
         * Linkage type of workout
         *
         * @enum { number }
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        enum LinkageType {
            /**
             * Fitness course
             *
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            COURSE_LINK = 0,
            /**
             * Activity like running, walking or biking
             *
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            ACTIVITY_LINK = 1
        }
        /**
         * Target type of workout
         *
         * @enum { number }
         * @syscap SystemCapability.Health.HealthService
         * @since 5.1.0(18)
         */
        enum TargetType {
            /**
             * No target
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            NONE = 0,
            /**
             * Distance target type
             *
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            DISTANCE = 1,
            /**
             * Calorie target type
             *
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            CALORIE = 2,
            /**
             * Time target type
             *
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            TIME = 3,
            /**
             * Skipping times target type
             *
             * @syscap SystemCapability.Health.HealthService
             * @since 5.1.0(18)
             */
            SKIPPING_TIMES = 4
        }
    }
}
export default healthService;
