/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file This module provides the capabilities to security audit.
 * @kit DeviceSecurityKit
 */
import type { Callback } from '@ohos.base';
/**
 * The module providers the capability for security audit events.
 *
 * @namespace securityAudit
 * @syscap SystemCapability.Security.SecurityAudit
 * @since 5.0.0(12)
 */
declare namespace securityAudit {
    /**
     * Provides the audit event information, including the eventId, version, timestamp, content, userId and deviceId.
     *
     * @interface AuditEvent
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 5.0.0(12)
     */
    interface AuditEvent {
        /**
         * The event id.
         *
         * @type { number }
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 5.0.0(12)
         */
        eventId: number;
        /**
         * The event version.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 5.0.0(12)
         */
        version?: string;
        /**
         * The event timestamp, format is YYYYMMDDHHMMSS.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 5.0.0(12)
         */
        timestamp?: string;
        /**
         * The event content.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 5.0.0(12)
         */
        content?: string;
        /**
         * The event user id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 5.0.0(12)
         */
        userId?: number;
        /**
         * The event device id.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 5.0.0(12)
         */
        deviceId?: string;
        /**
         * Event metadata.
         * @type { ?string }
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        metadata?: string;
    }
    /**
     * Provides the conditions of on/off.
     *
     * @interface AuditEventInfo
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 5.0.0(12)
     */
    interface AuditEventInfo {
        /**
         * The security event id.
         *
         * @type { number }
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 5.0.0(12)
         */
        eventId: number;
    }
    /**
     * Subscribe the audit event.
     *
     * @permission ohos.permission.QUERY_AUDIT_EVENT
     * @param { 'auditEventOccur' } type
     * @param { AuditEventInfo } auditEventInfo - Indicates the subscribed event information.
     * @param { Callback<AuditEvent> } callback - Indicates the listener when the audit event occurs.
     * @throws { BusinessError } 201 - check permission fail.
     * @throws { BusinessError } 401 - invalid parameters.
     * Possible causes:
     *   1. Mandatory parameters are left unspecified.
     *   2. Incorrect parameter types.
     *   3. Parameter verification failed.
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 5.0.0(12)
     */
    function on(type: 'auditEventOccur', auditEventInfo: AuditEventInfo, callback: Callback<AuditEvent>): void;
    /**
     * Unsubscribe the audit event.
     *
     * @permission ohos.permission.QUERY_AUDIT_EVENT
     * @param { 'auditEventOccur' } type
     * @param { AuditEventInfo } auditEventInfo - Indicates the subscribed event information.
     * @param { Callback<AuditEvent> } [ callback ] - Indicates the listener when the audit event occurs.
     * @throws { BusinessError } 201 - check permission fail.
     * @throws { BusinessError } 401 - invalid parameters.
     * Possible causes:
     *   1. Mandatory parameters are left unspecified.
     *   2. Incorrect parameter types.
     *   3. Parameter verification failed.
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 5.0.0(12)
     */
    function off(type: 'auditEventOccur', auditEventInfo: AuditEventInfo, callback?: Callback<AuditEvent>): void;
    /**
     * Provides event IDs for notification events.
     * @enum { number }
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 6.0.0(20)
     */
    enum NotifyEvent {
        /**
         * Clipboard copy or paste event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        PASTEBOARD = 0x27000000,
        /**
         * File event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        FILE = 0x1C000007,
        /**
         * File access rule violation event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        FILE_INTERCEPTED = 0x1C001100,
        /**
         * Account sign-in or sign-out event.
         *
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        ACCOUNT = 0x10000100,
        /**
         * Screenshot, screen recording, or screen projection event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        WINDOW = 0x07000000,
        /**
         * Removable storage insertion or removal event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        VOLUME = 0x0F000000,
        /**
         * Printer event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        PRINTER = 0x2E000000,
        /**
         * Process creation or exit event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        PROCESS = 0x1C000008,
        /**
         * Network traffic event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        NETWORK_TRAFFIC = 0x1C00000E,
        /**
         * Network connection event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        NETWORK_CONN = 0x1C00000F,
        /**
         * Camera event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        CAMERA = 0x2D000000,
        /**
         * App event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        APP = 0x10000000,
        /**
         * Enterprise device management event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        EDM = 0x11000000,
        /**
         * Certificate operation event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        CERT = 0x12003000,
        /**
         * KIA file creation event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        KIA_CREATE = 0x1C00000B,
        /**
         * KIA file read event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        KIA_READ = 0x1C000012,
        /**
         * Key information asset (KIA) file variation event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        KIA_VARIANT = 0x1C00000C,
        /**
         * KIA file interception event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        KIA_INTERCEPT = 0x1C00000A,
        /**
         * App permission change event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        PERMISSION = 0x0B000000,
        /**
         * DNS audit event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        DNS = 0x03000001,
        /**
         * App installation interception event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        APP_INSTALL_INTERCEPTED = 0x18000100,
        /**
         * Application uninstallation intercepts event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        APP_UNINSTALL_INTERCEPTED = 0x18000101,
        /**
         * App update interception event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        APP_UPDATE_INTERCEPTED = 0x18000102,
        /**
         * App recovery interception event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        APP_RECOVER_INTERCEPTED = 0x18000103,
        /**
         * App startup interception event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        APP_START_INTERCEPTED = 0x18000104,
        /**
         * USB access interception event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        USB_ACCESS_INTERCEPTED = 0x30000000
    }
    /**
     * Provides event IDs for authorization events.
     * @enum { number }
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 6.0.0(20)
     */
    enum AuthEvent {
        /**
         * File creation authorization event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        FILE_CREATE = 0x1C801100,
        /**
         * File opening authorization event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        FILE_OPEN = 0x1C801101,
        /**
         * File renaming authorization event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        FILE_RENAME = 0x1C801102,
        /**
         * File deletion authorization event.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        FILE_DELETE = 0x1C801103,
        /**
         * Authorization event for setting extended attributes of a file.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        FILE_SETEXTATTR = 0x1C801104,
        /**
         * Authorization event for deleting extended attributes of a file.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        FILE_DELETEEXTATTR = 0x1C801105
    }
    /**
     * Provides information about filter types.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 6.0.0(20)
     */
    enum FilterType {
        /**
         * Filter type of the event type.
         *
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        EVENT_TYPE_EQUAL = 0x00000100,
        /**
         * Filter type of the event subtype.
         *
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        EVENT_SUBTYPE_EQUAL = 0x00000200,
        /**
         * Filter type of the file path type.
         *
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        FILE_PATH_EQUAL = 0x00010000,
        /**
         * Filter type of the file path prefix type.
         *
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        FILE_PATH_PREFIX = 0x00010001,
        /**
         * Filter type of the file path suffix type.
         *
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        FILE_PATH_SUFFIX = 0x00010002,
        /**
         * Filter type of process uid.
         *
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        PROCESS_UID_EQUAL = 0x00020000,
        /**
         * Filter type of process ID.
         *
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        PROCESS_PID_EQUAL = 0x00020100,
        /**
         * Filter type of process name.
         *
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        PROCESS_NAME_EQUAL = 0x00020200,
        /**
         * Filter type of the process name prefix.
         *
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        PROCESS_NAME_PREFIX = 0x00020201,
        /**
         * Filter type of the process name suffix.
         *
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        PROCESS_NAME_SUFFIX = 0x00020202
    }
    /**
     * Provides the filter conditions.
     * @interface Filter
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 6.0.0(20)
     */
    interface Filter {
        /**
         * TRUE: The event that meets the criteria is returned to the client.
         * FALSE: The event is not returned.
         * @type { boolean }
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        isInclude: boolean;
        /**
         * Filter type.
         * @type { FilterType }
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        type: FilterType;
        /**
         * Vector of filter values.
         * @type { string[] }
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        values: string[];
    }
    /**
     * Authorization result information.
     * @enum { number }
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 6.0.0(20)
     */
    enum AuthResult {
        /**
         * Allows authorization.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        ALLOW = 0,
        /**
         * Rejects authorization.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        DENY = 1
    }
    /**
     * Provides conditions for a notification client.
     * @interface Client
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 6.0.0(20)
     */
    interface Client {
        /**
         * Subscribes to notification events.
         * @permission ohos.permission.QUERY_AUDIT_EVENT
         * @param { NotifyEvent[] } events - Notification events to be subscribed to.
         * @throws { BusinessError } 201 - check permission fail.
         * @throws { BusinessError } 1012000001 - Internal error.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        subscribe(events: NotifyEvent[]): void;
        /**
         * Unsubscribes from notification events.
         * @permission ohos.permission.QUERY_AUDIT_EVENT
         * @param { NotifyEvent[] } events - Subscribed notification events.
         * @throws { BusinessError } 201 - check permission fail.
         * @throws { BusinessError } 1012000001 - Internal error.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        unsubscribe(events: NotifyEvent[]): void;
        /**
         * Adds a filter condition to a notification event.
         * @permission ohos.permission.QUERY_AUDIT_EVENT
         * @param { NotifyEvent } event - Notification event ID.
         * @param { Filter } filter - Filter description of a notification event.
         * @throws { BusinessError } 201 - check permission fail.
         * @throws { BusinessError } 1012000001 - Internal error.
         * @throws { BusinessError } 1012000004 - The number of filters exceeds the upper limit.
         * @throws { BusinessError } 1012000005 - The event does not support the filter condition.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        addFilter(event: NotifyEvent, filter: Filter): void;
        /**
         * Deletes the filter condition of a notification event.
         * @permission ohos.permission.QUERY_AUDIT_EVENT
         * @param { NotifyEvent } event - Notification event ID.
         * @param { Filter } filter - Filter description of a notification event.
         * @throws { BusinessError } 201 - check permission fail.
         * @throws { BusinessError } 1012000001 - Internal error.
         * @throws { BusinessError } 1012000005 - The event does not support the filter condition.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        removeFilter(event: NotifyEvent, filter: Filter): void;
    }
    /**
     * Creates a new notification client.
     * @permission ohos.permission.QUERY_AUDIT_EVENT
     * @param { Callback<AuditEvent> } callback - Audit event listener.
     * @returns { Client } Client used to return a client instance.
     * @throws { BusinessError } 201 - check permission fail.
     * @throws { BusinessError } 1012000001 - Internal error.
     * @throws { BusinessError } 1012000002 - The number of clients exceeds the global upper limit.
     * @throws { BusinessError } 1012000003 - The number of clients exceeds the current process upper limit.
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 6.0.0(20)
     */
    function newClient(callback: Callback<AuditEvent>): Client;
    /**
     * Deletes a notification client.
     * @permission ohos.permission.QUERY_AUDIT_EVENT
     * @param { Client } client - Notification client information.
     * @throws { BusinessError } 201 - check permission fail.
     * @throws { BusinessError } 1012000001 - Internal error.
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 6.0.0(20)
     */
    function deleteClient(client: Client): void;
    /**
     * Provides conditions for an authorization client.
     * @interface AuthClient
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 6.0.0(20)
     */
    interface AuthClient {
        /**
         * Subscribes to auth events.
         *
         * @permission ohos.permission.kernel.AUTH_AUDIT_EVENT
         * @param { AuthEvent[] } events - Indicates the subscribed auth eventIds.
         * @throws { BusinessError } 201 - check permission fail.
         * @throws { BusinessError } 1012000001 - Internal error.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        subscribe(events: AuthEvent[]): void;
        /**
         * Unsubscribes from auth events.
         *
         * @permission ohos.permission.kernel.AUTH_AUDIT_EVENT
         * @param { AuthEvent[] } events - Indicates the subscribed auth eventIds.
         * @throws { BusinessError } 201 - check permission fail.
         * @throws { BusinessError } 1012000001 - Internal error.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        unsubscribe(events: AuthEvent[]): void;
        /**
         * Adds a filter condition to an auth event.
         *
         * @permission ohos.permission.kernel.AUTH_AUDIT_EVENT
         * @param { AuthEvent } event - The auth event id.
         * @param { Filter } filter - Indicates the filter description of auth event.
         * @throws { BusinessError } 201 - check permission fail.
         * @throws { BusinessError } 1012000001 - Internal error.
         * @throws { BusinessError } 1012000004 - The number of filters exceeds the upper limit.
         * @throws { BusinessError } 1012000005 - The event does not support the filter condition.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        addFilter(event: AuthEvent, filter: Filter): void;
        /**
         * Deletes the filter condition of an authorization event.
         * @permission ohos.permission.kernel.AUTH_AUDIT_EVENT
         * @param { AuthEvent } event - Authorization event ID.
         * @param { Filter } filter - Filter description of an authorization event.
         * @throws { BusinessError } 201 - check permission fail.
         * @throws { BusinessError } 1012000001 - Internal error.
         * @throws { BusinessError } 1012000005 - The event does not support the filter condition.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        removeFilter(event: AuthEvent, filter: Filter): void;
        /**
         * Sets the authorization result for an authorization event.
         * @permission ohos.permission.kernel.AUTH_AUDIT_EVENT
         * @param { AuditEvent } auditEvent - Authorization event information.
         * @param { AuthResult } authResult - Authorization result information.
         * @throws { BusinessError } 201 - check permission fail.
         * @throws { BusinessError } 1012000001 - Internal error.
         * @throws { BusinessError } 1012000007 - The auth event cannot be found.
         * @syscap SystemCapability.Security.SecurityAudit
         * @since 6.0.0(20)
         */
        auth(auditEvent: AuditEvent, authResult: AuthResult): void;
    }
    /**
     * Creates a new authorization client.
     * @permission ohos.permission.kernel.AUTH_AUDIT_EVENT
     * @param { Callback<AuditEvent> } callback - Audit event listener.
     * @returns { AuthClient } AuthClient used to return an auth client instance.
     * @throws { BusinessError } 201 - check permission fail.
     * @throws { BusinessError } 1012000001 - Internal error.
     * @throws { BusinessError } 1012000002 - The number of clients exceeds the global upper limit.
     * @throws { BusinessError } 1012000003 - The number of clients exceeds the current process upper limit.
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 6.0.0(20)
     */
    function newAuthClient(callback: Callback<AuditEvent>): AuthClient;
    /**
     * Deletes an authorization client.
     * @permission ohos.permission.kernel.AUTH_AUDIT_EVENT
     * @param { AuthClient } client - Authorization client information.
     * @throws { BusinessError } 201 - check permission fail.
     * @throws { BusinessError } 1012000001 - Internal error.
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 6.0.0(20)
     */
    function deleteAuthClient(client: AuthClient): void;
    /**
     * Queries all processes.
     * @permission ohos.permission.QUERY_AUDIT_EVENT
     * @returns { string } String used to return the query result.
     * @throws { BusinessError } 201 - check permission fail.
     * @throws { BusinessError } 1012000001 - Internal error.
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 6.0.0(20)
     */
    function queryAllProcesses(): string;
    /**
     * Queries process information.
     * @permission ohos.permission.QUERY_AUDIT_EVENT
     * @param { number[] } pids - List of processes to be queried.
     * @returns { string } String used to return the query result.
     * @throws { BusinessError } 201 - check permission fail.
     * @throws { BusinessError } 1012000001 - Internal error.
     * @throws { BusinessError } 1012000006 - The number of queried processes exceeds the threshold.
     * @syscap SystemCapability.Security.SecurityAudit
     * @since 6.0.0(20)
     */
    function queryProcesses(pids: number[]): string;
}
export default securityAudit;
