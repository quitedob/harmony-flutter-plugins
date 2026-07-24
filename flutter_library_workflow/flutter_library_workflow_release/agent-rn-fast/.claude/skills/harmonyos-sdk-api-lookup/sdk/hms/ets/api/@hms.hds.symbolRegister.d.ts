/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file Defines the capabilities of HDS symbol register
 * @kit UIDesignKit
 */
import resourceManager from '@ohos.resourceManager';
/**
 * Provides HDS symbol register capabilities and methods.
 *
 * @namespace symbolRegister
 * @syscap SystemCapability.UIDesign.Core
 * @since 5.1.1(19)
 */
declare namespace symbolRegister {
    /**
     * Returns result of registering symbol resource.
     *
     * @param { resourceManager.Resource } ttfSrc - TTF resource.
     * @param { resourceManager.Resource } jsonSrc - JSON resource.
     * @returns { boolean } The result of registering symbol resource by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Device Type error.
     * @throws { BusinessError } 1012600002 - TTF or JSON resource out of size.
     * @throws { BusinessError } 1012600003 - TTF or JSON resource content error.
     * @syscap SystemCapability.UIDesign.Core
     * @since 5.1.1(19)
     */
    function registerSymbol(ttfSrc: resourceManager.Resource, jsonSrc: resourceManager.Resource): boolean;
}
export default symbolRegister;
