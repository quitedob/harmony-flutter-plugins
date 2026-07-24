/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Defines a UI component used to show the FunctionalInput.
 * @kit ScenarioFusionKit
 */
import type { AsyncCallback } from '@ohos.base';
import sceneMap from '@hms.core.map.sceneMap';
import { TextInputModifier } from '@ohos.arkui.modifier';
/**
 * Defines a UI component used to show the FunctionalInput.
 * @struct { FunctionalInput }
 * @syscap SystemCapability.AtomicserviceComponent.UIComponent
 * @stagemodelonly
 * @atomicservice
 * @since 5.1.0(18)
 */
@Component
export declare struct FunctionalInput {
    /**
     * Defines FunctionalInput Params.
     * @type { functionalInputComponentManager.FunctionalInputParams }
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.1.0(18)
     */
    @Prop
    params: functionalInputComponentManager.FunctionalInputParams;
    /**
     * Defines the controller to interact with FunctionalInput.
     * @type { functionalInputComponentManager.FunctionalInputController }
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.1.0(18)
     */
    controller: functionalInputComponentManager.FunctionalInputController;
    /**
     * Constructor used to create a <b>FunctionalInput</b> object.
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.1.0(18)
     */
    build(): void;
}
/**
 * Defines the business logic of the FunctionalInput component.
 * @namespace functionalInputComponentManager
 * @syscap SystemCapability.AtomicserviceComponent.UIComponent
 * @stagemodelonly
 * @atomicservice
 * @since 5.1.0(18)
 */
export declare namespace functionalInputComponentManager {
    /**
     * Enumerates the FunctionalInput types.
     * @enum { number }
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.1.0(18)
     */
    export enum InputType {
        /**
         * Default value, select district.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.0(18)
         */
        SELECT_DISTRICT = 0
    }
    /**
     * Defines params of input.
     * @typedef FunctionalInputParams
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.1.0(18)
     */
    export interface FunctionalInputParams {
        /**
         * Operation of input.
         * @type { InputType }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.0(18)
         */
        inputType: InputType;
        /**
         * placeHolder and text of input.
         * @type { TextInputOptions }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.0(18)
         */
        textInputValue: TextInputOptions;
        /**
         * The Attribute of FunctionalInput.
         * @type { ?TextInputModifier }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.0(18)
         */
        inputAttributeModifier?: TextInputModifier;
        /**
         * The icon of FunctionalInput.
         * @type { ?Resource}
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.0(18)
         */
        icon?: Resource;
        /**
         * The icon image modifier of FunctionalInput.
         * @type { ?ImageModifier }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.0(18)
         */
        iconImgModifier?: ImageModifier;
        /**
         * The icon symbol modifier of FunctionalInput.
         * @type { ?SymbolGlyphModifier }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.0(18)
         */
        iconSymbolModifier?: SymbolGlyphModifier;
    }
    /**
     * Defines the return body for selecting district.
     * @typedef DistrictSelectResult
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.1.0(18)
     */
    export interface DistrictSelectResult {
        /**
         * Returns the TextInput content
         *
         * @type { string }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.0(18)
         */
        inputContent: string;
        /**
         * Returns the level information of the selected administrative division.
         *
         * @type { sceneMap.DistrictSelectResult }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.0(18)
         */
        districtSelectResult: sceneMap.DistrictSelectResult;
    }
    /**
     * Defines the controller to interact with the input.
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.1.0(18)
     */
    export class FunctionalInputController {
        /**
         * Registers a callback to return the select district result.
         * @param { AsyncCallback<DistrictSelectResult> } callback - Callback invoked to return the select
         *     district response.
         * AsyncCallback param err { BusinessError } Error code returned when select district fails.
         * AsyncCallback param data { DistrictSelectResult } Response returned when the select district is successful.
         * @returns { FunctionalInputController } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.1.0(18)
         */
        onSelectDistrict(callback: AsyncCallback<DistrictSelectResult>): FunctionalInputController;
    }
}
