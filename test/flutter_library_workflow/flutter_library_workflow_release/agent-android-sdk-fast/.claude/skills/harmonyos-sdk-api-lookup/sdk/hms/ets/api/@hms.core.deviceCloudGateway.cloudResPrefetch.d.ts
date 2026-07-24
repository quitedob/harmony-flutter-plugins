/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024. All rights reserved.
 */
/**
 * @file Define cloud resources prefetch capabilities.
 * @kit CloudFoundationKit
 */
import type { AsyncCallback } from '@ohos.base';
/**
 * This module provides cloud resources prefetch capabilities.
 * Cloud resources are connected to AppGallery Connect. Before using the resources, you need to enable the corresponding services.
 *
 * @namespace cloudResPrefetch
 * @syscap SystemCapability.DeviceCloudGateway.CloudResPrefetch
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.3(15)
 */
declare namespace cloudResPrefetch {
    /**
     * the corresponding implementation of the prefetch options
     * @param { PrefetchOptions } options - Prefetch options related to the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1008240009 - Client internal error.
     * @syscap SystemCapability.DeviceCloudGateway.CloudResPrefetch
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.3(15)
     */
    function registerPrefetchTask(options: PrefetchOptions): void;
    /**
     * Prefetch response implementation.
     * @param { PrefetchMode } mode - Prefetch modes: Initial prefetch or Periodic prefetch.
     * @returns { Promise<PrefetchResult> } Result returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1008240009 - Client internal error.
     * @syscap SystemCapability.DeviceCloudGateway.CloudResPrefetch
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.3(15)
     */
    function getPrefetchResult(mode: PrefetchMode): Promise<PrefetchResult>;
    /**
     * Prefetch response implementation.
     * @param { PrefetchMode } mode - Prefetch modes: Initial prefetch or Periodic prefetch.
     * @param { AsyncCallback<PrefetchResult> } callback - Result callback returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1008240009 - Client internal error.
     * @syscap SystemCapability.DeviceCloudGateway.CloudResPrefetch
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.3(15)
     */
    function getPrefetchResult(mode: PrefetchMode, callback: AsyncCallback<PrefetchResult>): void;
    /**
     * Cloud periodic prefetch invoking options.
     * @typedef PrefetchOptions
     * @syscap SystemCapability.DeviceCloudGateway.CloudResPrefetch
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface PrefetchOptions {
        /**
         * User Token.
         * @type { ?string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudResPrefetch
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        token?: string;
        /**
         * User Parameters.
         * @type { ?(string | Object) }
         * @syscap SystemCapability.DeviceCloudGateway.CloudResPrefetch
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        params?: string | Object;
    }
    /**
     * The modes of prefetching resources.
     * @enum { number }
     * @syscap SystemCapability.DeviceCloudGateway.CloudResPrefetch
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.3(15)
     */
    enum PrefetchMode {
        /**
         * Install prefetch mode.
         * @syscap SystemCapability.DeviceCloudGateway.CloudResPrefetch
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        INSTALL_PREFETCH = 1,
        /**
         * Periodic prefetch mode.
         * @syscap SystemCapability.DeviceCloudGateway.CloudResPrefetch
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        PERIODIC_PREFETCH = 2
    }
    /**
     * Returned fetch result of invoking the cloud resources prefetch.
     * @typedef PrefetchResult
     * @syscap SystemCapability.DeviceCloudGateway.CloudResPrefetch
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.3(15)
     */
    interface PrefetchResult {
        /**
         * Returns the result of prefetch call.
         * @type { string | Object } Returns the result of a prefetch function call.
         * @syscap SystemCapability.DeviceCloudGateway.CloudResPrefetch
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        result: string | Object;
        /**
         * Returns the timestamp of getting fetched data.
         * @type { Date } Returns the time taken to retrieve the cache.
         * @syscap SystemCapability.DeviceCloudGateway.CloudResPrefetch
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        timestamp: Date;
        /**
         * Returns the token.
         * @type { string } Return the token for obtaining parameter resources.
         * @syscap SystemCapability.DeviceCloudGateway.CloudResPrefetch
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.3(15)
         */
        token: string;
    }
}
export default cloudResPrefetch;
