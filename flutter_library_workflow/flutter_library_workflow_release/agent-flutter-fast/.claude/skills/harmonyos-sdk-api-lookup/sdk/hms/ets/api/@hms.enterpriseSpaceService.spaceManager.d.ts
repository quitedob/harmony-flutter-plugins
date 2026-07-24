/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file This module provides the capability of spaceManager.
 * @kit EnterpriseSpaceKit
 */
import type { AsyncCallback } from '@ohos.base';
/**
 * This module provides the capability of spaceManager.
 *
 * @namespace spaceManager
 * @syscap SystemCapability.EnterpriseSpace.ServiceManage
 * @since 6.0.0(20)
 */
declare namespace spaceManager {
    /**
     * Params for creating an workspace.
     *
     * @interface CreateWorkspaceParams
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    interface CreateWorkspaceParams {
        /**
         * Indicates the short name of the workspace.
         *
         * @type { string }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        shortName: string;
    }
    /**
     * Provides information about domain workspaces.
     *
     * @interface WorkspaceDomainInfo
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    interface WorkspaceDomainInfo {
        /**
         * The domain name
         *
         * @type { string }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        domain: string;
        /**
         * The workspace name in the domain
         *
         * @type { string }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        workspaceName: string;
        /**
         * The workspace identifier in the domain.
         *
         * @type { ?string }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        accountId?: string;
        /**
         * Indicates whether the workspace is authenticated.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        isAuthenticated?: boolean;
        /**
         * Indicates the server config identifier for the domain to which the workspace belongs.
         *
         * @type { ?string }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        serverConfigId?: string;
    }
    /**
     * Provides information about workspaces, including the local ID, local name, and type of an workspace.
     *
     * @interface WorkspaceInfo
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    interface WorkspaceInfo {
        /**
         * The workspace ID.
         *
         * @type { number }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        workspaceId: number;
        /**
         * The local name of an workspace.
         *
         * @type { string }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        localName: string;
        /**
         * The short name of an workspace.
         *
         * @type { ?string }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        shortName?: string;
        /**
         *
         * The workspace is unlocked or not.
         *
         * @type { boolean }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        isUnlocked: boolean;
        /**
         * Workspace photo.
         *
         * @type { string }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        photo: string;
        /**
         * Workspace create time.
         *
         * @type { number }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        createTime: number;
        /**
         * The last time to log in.
         *
         * @type { number }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        lastLoginTime: number;
        /**
         * Workspace serial number.
         *
         * @type { number }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        serialNumber: number;
        /**
         * The workspace is activated or not.
         *
         * @type { boolean }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        isActivated: boolean;
        /**
         * Workspace create completed or not.
         *
         * @type { boolean }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        isCreateCompleted: boolean;
        /**
         * The workspace is allowed to be deleted or not.
         *
         * @type { boolean }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        isAllowedToBeDeleted: boolean;
        /**
         * Domain workspace info.
         *
         * @type { WorkspaceDomainInfo }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        domainInfo: WorkspaceDomainInfo;
    }
    /**
     * Represents workspace event data, including event type and related parameters.
     *
     * @interface EventData
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    interface EventData {
        /**
         * The type of event that occurred.
         *
         * @type { EventType }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        event: EventType;
        /**
         * Indicates the current workspace ID.
         *
         * @type { ?number }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        currentWorkspaceId?: number;
    }
    /**
     * Enumerates Workspace types.
     *
     * @enum { number } WorkspaceType
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    enum WorkspaceType {
        /**
         * Indicates the administrator workspace, which has the permission to manage other workspaces.
         *
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        ADMIN = 0
    }
    /**
     * Enumerates query types.
     *
     * @enum { number } QueryType
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    enum QueryType {
        /**
         * Indicates that all workspaces are queried.
         *
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        ALL = 0,
        /**
         * Indicates that non-deletable workspaces are queried.
         *
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        NON_DELETABLE = 1
    }
    /**
     * Enumerates event types.
     *
     * @enum { number } EventType
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    enum EventType {
        /**
         * Indicates that a workspace switch event has occurred.
         *
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.0(20)
         */
        EVENT_WORKSPACE_SWITCHED = 0
    }
    /**
     * Provides process inaccessible Paths info.
     *
     * @interface ProcessConfigInfo
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.1(21)
     */
    interface ProcessConfigInfo {
        /**
         * Indicates that the data access control process name.
         *
         * @type { string }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.1(21)
         */
        processName: string;
        /**
         * Indicates a list of paths that are inaccessible to the process.
         *
         * @type { string[] }
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.1(21)
         */
        disallowPaths: string[];
    }
    /**
     * Enumerates user data.
     *
     * @enum { string } UserDataEnum
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.1(21)
     */
    enum UserDataEnum {
        /**
         * Indicates enterprise workspace.
         *
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.1(21)
         */
        ENTERPRISE = 0,
        /**
         * Indicates personal workspace.
         *
         * @syscap SystemCapability.EnterpriseSpace.ServiceManage
         * @since 6.0.1(21)
         */
        PERSONAL = 1
    }
    /**
     * Create a workspace.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES or ohos.permission.MANAGE_LOCAL_WORKSPACES
     * @param { string } localName - Indicates the local name to set for the workspace.
     * @param { WorkspaceType } workspaceType - Indicates the type of the workspace.
     * @param { CreateWorkspaceParams } [params] - Indicates the options for creating an workspace.
     * @returns { Promise<WorkspaceInfo> } - Returns information about the created workspace;
     *     returns {@code null} if the creation fails.
     * @throws { BusinessError } 201 - The application does not have permission to call this function.
     * @throws { BusinessError } 1020400001 - System service exception.
     * @throws { BusinessError } 1020400002 - Parameter error.
     * @throws { BusinessError } 1020400003 - Invalid workspace.
     * @throws { BusinessError } 1020400007 - Enterprise workspace not enabled.
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    function createWorkspace(localName: string, workspaceType: WorkspaceType, params?: CreateWorkspaceParams): Promise<WorkspaceInfo>;
    /**
     * Enable workspace properties.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES or ohos.permission.MANAGE_LOCAL_WORKSPACES
     * @param { boolean } enable - Indicates whether to enable the workspace properties.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - The application does not have permission to call this function.
     * @throws { BusinessError } 1020400001 - System service exception.
     * @throws { BusinessError } 1020400002 - Parameter error.
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    function enableWorkspace(enable: boolean): Promise<void>;
    /**
     * Query workspace information based on the query flag.
     *
     * @permission ohos.permission.QUERY_LOCAL_WORKSPACES
     * @param { QueryType } queryFlag - Indicates the type of the workspace being queried.
     * @returns { Promise<WorkspaceInfo[]> } - Returns a list of workspaces based on the query type.
     * @throws { BusinessError } 201 - The application does not have permission to call this function.
     * @throws { BusinessError } 1020400001 - System service exception.
     * @throws { BusinessError } 1020400002 - Parameter error.
     * @throws { BusinessError } 1020400007 - Enterprise workspace not enabled.
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    function queryWorkspace(queryFlag: QueryType): Promise<WorkspaceInfo[]>;
    /**
     * Remove workspace based on the workspace ID.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES or ohos.permission.MANAGE_LOCAL_WORKSPACES
     * @param { number } workspaceId - Indicates the ID of the workspace.
     * @returns { Promise<void> } - The promise returned by the function.
     * @throws { BusinessError } 201 - The application does not have permission to call this function.
     * @throws { BusinessError } 1020400001 - System service exception.
     * @throws { BusinessError } 1020400002 - Parameter error.
     * @throws { BusinessError } 1020400003 - Invalid workspace.
     * @throws { BusinessError } 1020400007 - Enterprise workspace not enabled.
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    function removeWorkspace(workspaceId: number): Promise<void>;
    /**
     * Set workspace information.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES
     * @param { number } workspaceId - Indicates the ID of the workspace.
     * @param { WorkspaceDomainInfo } domainInfo - Indicates the domain info to set for the workspace.
     * @returns { Promise<void> } - The promise returned by the function.
     * @throws { BusinessError } 201 - The application does not have permission to call this function.
     * @throws { BusinessError } 1020400001 - System service exception.
     * @throws { BusinessError } 1020400002 - Parameter error.
     * @throws { BusinessError } 1020400003 - Invalid workspace.
     * @throws { BusinessError } 1020400007 - Enterprise workspace not enabled.
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    function setWorkspaceInfo(workspaceId: number, domainInfo: WorkspaceDomainInfo): Promise<void>;
    /**
     * Sets the profile photo for an workspace based on its workspace ID.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES
     * @param { number } workspaceId - Indicates the ID of the workspace.
     * @param { string } photo - Indicates the profile photo to set for the workspace.
     * @returns { Promise<void> } - The promise returned by the function.
     * @throws { BusinessError } 201 - The application does not have permission to call this function.
     * @throws { BusinessError } 1020400001 - System service exception.
     * @throws { BusinessError } 1020400002 - Parameter error.
     * @throws { BusinessError } 1020400003 - Invalid workspace.
     * @throws { BusinessError } 1020400007 - Enterprise workspace not enabled.
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    function setWorkspaceProfilePhoto(workspaceId: number, photo: string): Promise<void>;
    /**
     * Subscribe a workspace event.
     *
     * @permission ohos.permission.ENTERPRISE_WORKSPACES_EVENT_SUBSCRIBE
     * @param { EventType[] } eventId - Indicates the workspace events.
     * @param { AsyncCallback<EventData> } callback - The callback function to be executed when the event is triggered,
     *     receiving the event data as a parameter.
     * @returns { number } - Returns a subscription ID for use in unsubscribeEvent in the future.
     * @throws { BusinessError } 201 - The application does not have permission to call this function.
     * @throws { BusinessError } 1020400001 - System service exception.
     * @throws { BusinessError } 1020400002 - Parameter error.
     * @throws { BusinessError } 1020400006 - Session disconnected.
     * @throws { BusinessError } 1020400007 - Enterprise workspace not enabled.
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    function subscribeEvent(eventId: EventType[], callback: AsyncCallback<EventData>): number;
    /**
     * Unsubscribe a workspace event.
     *
     * @permission ohos.permission.ENTERPRISE_WORKSPACES_EVENT_SUBSCRIBE
     * @param { number } subscribeId - Indicates that the subscription ID obtained from subscribeEvent
     *     to unsubscribe from the event.
     * @throws { BusinessError } 201 - The application does not have permission to call this function.
     * @throws { BusinessError } 1020400001 - System service exception.
     * @throws { BusinessError } 1020400002 - Parameter error.
     * @throws { BusinessError } 1020400007 - Enterprise workspace not enabled.
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.0(20)
     */
    function unsubscribeEvent(subscribeId: number): void;
    /**
     * Set enable data inaccessibility functions.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES
     * @param { UserDataEnum } userData - Indicates user type with inaccessible public paths.
     * @param { boolean } enable - Indicates control status of public paths.
     * @returns { Promise<void> } - The promise returned by the function.
     * @throws { BusinessError } 201 - The application does not have permission to call this function.
     * @throws { BusinessError } 1020400001 - System service exception.
     * @throws { BusinessError } 1020400002 - Parameter error.
     * @throws { BusinessError } 1020400007 - Enterprise workspace not enabled.
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.1(21)
     */
    function setRestrictedAccessBackgroundUserdata(userData: UserDataEnum, enable: boolean): Promise<void>;
    /**
     * Get the status of inaccessible data functions.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES
     * @param { UserDataEnum } userData - Indicates user type with inaccessible public paths.
     * @returns { Promise<boolean> } - The promise returned by the function.
     * @throws { BusinessError } 201 - The application does not have permission to call this function.
     * @throws { BusinessError } 1020400001 - System service exception.
     * @throws { BusinessError } 1020400002 - Parameter error.
     * @throws { BusinessError } 1020400007 - Enterprise workspace not enabled.
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.1(21)
     */
    function getRestrictedAccessBackgroundUserdataStatus(userData: UserDataEnum): Promise<boolean>;
    /**
     * Get a list of system processes that cannot access data.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES
     * @param { UserDataEnum } userData - Indicates user type with inaccessible public paths.
     * @returns { Promise<ProcessConfigInfo[]> } - The promise returned by the function.
     * @throws { BusinessError } 201 - The application does not have permission to call this function.
     * @throws { BusinessError } 1020400001 - System service exception.
     * @throws { BusinessError } 1020400002 - Parameter error.
     * @throws { BusinessError } 1020400007 - Enterprise workspace not enabled.
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.1(21)
     */
    function getRestrictedAccessBackgroundUserdataProcessList(userData: UserDataEnum): Promise<ProcessConfigInfo[]>;
    /**
     * Add system process that cannot access data.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES
     * @param { UserDataEnum } userData - Indicates user type with inaccessible public paths.
     * @param { string } processName - Indicates process name.
     * @param { string[] } [disallowPaths] - Indicates a list of inaccessible Paths.
     * @returns { Promise<void> } - The promise returned by the function.
     * @throws { BusinessError } 201 - The application does not have permission to call this function.
     * @throws { BusinessError } 1020400001 - System service exception.
     * @throws { BusinessError } 1020400002 - Parameter error.
     * @throws { BusinessError } 1020400007 - Enterprise workspace not enabled.
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.1(21)
     */
    function addRestrictedAccessBackgroundUserdataProcessList(userData: UserDataEnum, processName: string, disallowPaths?: string[]): Promise<void>;
    /**
     * Delete the list of data that cannot be accessed by system processes.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_LOCAL_PUBLICSPACES
     * @param { UserDataEnum } userData - Indicates user type with inaccessible public paths.
     * @param { string } processName - Indicates process name.
     * @returns { Promise<void> } - The promise returned by the function.
     * @throws { BusinessError } 201 - The application does not have permission to call this function.
     * @throws { BusinessError } 1020400001 - System service exception.
     * @throws { BusinessError } 1020400002 - Parameter error.
     * @throws { BusinessError } 1020400007 - Enterprise workspace not enabled.
     * @syscap SystemCapability.EnterpriseSpace.ServiceManage
     * @since 6.0.1(21)
     */
    function deleteRestrictedAccessBackgroundUserdataProcessList(userData: UserDataEnum, processName: string): Promise<void>;
}
export default spaceManager;
