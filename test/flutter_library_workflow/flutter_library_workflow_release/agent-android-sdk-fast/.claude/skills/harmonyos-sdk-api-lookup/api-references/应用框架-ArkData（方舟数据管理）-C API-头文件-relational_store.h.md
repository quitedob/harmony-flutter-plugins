## 概述

PhonePC/2in1TabletTVWearable

提供管理关系数据库（RDB）方法的接口，未标注支持向量数据库的接口仅支持关系型数据库。

**引用文件：** <database/rdb/relational\_store.h>

**库：** libnative\_rdb\_ndk.z.so

**系统能力：** SystemCapability.DistributedDataManager.RelationalStore.Core

**起始版本：** 10

**相关模块：** [RDB](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_Rdb\_Config](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-config) | OH\_Rdb\_Config | 管理关系数据库配置。 |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) | OH\_Rdb\_Store | 表示数据库类型。 |
| [Rdb\_DistributedConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-distributedconfig) | Rdb\_DistributedConfig | 记录表的分布式配置信息。 |
| [Rdb\_KeyInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-keyinfo) | Rdb\_KeyInfo | 描述发生变化的行的主键或者行号。 |
| [Rdb\_KeyData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-keydata) | - | 存放变化的具体数据。 |
| [Rdb\_ChangeInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-changeinfo) | Rdb\_ChangeInfo | 记录端云同步过程详情。 |
| [Rdb\_SubscribeCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-subscribecallback) | Rdb\_SubscribeCallback | 表示回调函数。 |
| [Rdb\_DataObserver](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-dataobserver) | Rdb\_DataObserver | 表示数据观察者。 |
| [Rdb\_Statistic](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-statistic) | Rdb\_Statistic | 描述数据库表的端云同步过程的统计信息。 |
| [Rdb\_TableDetails](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-tabledetails) | Rdb\_TableDetails | 描述数据库表执行端云同步任务上传和下载的统计信息。 |
| [Rdb\_ProgressDetails](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-progressdetails) | Rdb\_ProgressDetails | 描述数据库整体执行端云同步任务上传和下载的统计信息。 |
| [Rdb\_ProgressObserver](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-progressobserver) | Rdb\_ProgressObserver | 端云同步进度观察者。 |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) | OH\_Rdb\_ConfigV2 | 管理关系数据库配置，与[OH\_Rdb\_Config](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-config)的区别是该结构体成员变量不对外暴露，使用一系列方法配置该结构体的属性，支持向量数据库。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_Rdb\_SecurityLevel](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_securitylevel) | OH\_Rdb\_SecurityLevel | 数据库的安全级别枚举。 |
| [Rdb\_SecurityArea](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_securityarea) | Rdb\_SecurityArea | 描述数据库的安全区域等级。 |
| [Rdb\_DBType](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_dbtype) | Rdb\_DBType | 描述数据库的内核类型。 |
| [Rdb\_Tokenizer](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_tokenizer) | Rdb\_Tokenizer | 描述数据库的分词器类型。 |
| [Rdb\_DistributedType](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_distributedtype) | Rdb\_DistributedType | 描述表的分布式类型的枚举。 |
| [Rdb\_ChangeType](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_changetype) | Rdb\_ChangeType | 描述数据变更类型。 |
| [Rdb\_SubscribeType](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_subscribetype) | Rdb\_SubscribeType | 描述订阅类型。 |
| [Rdb\_SyncMode](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_syncmode) | Rdb\_SyncMode | 表示数据库的同步模式 |
| [Rdb\_Progress](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_progress) | Rdb\_Progress | 描述端云同步过程。 |
| [Rdb\_ProgressCode](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_progresscode) | Rdb\_ProgressCode | 表示端云同步过程的状态。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_Rdb\_ConfigV2 \*OH\_Rdb\_CreateConfig()](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_createconfig) | - | 创建一个[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)实例，并返回指向该实例的指针。 |
| [int OH\_Rdb\_DestroyConfig(OH\_Rdb\_ConfigV2 \*config)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_destroyconfig) | - | 销毁由[OH\_Rdb\_CreateConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_createconfig)创建的[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象。 |
| [int OH\_Rdb\_SetDatabaseDir(OH\_Rdb\_ConfigV2 \*config, const char \*databaseDir)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setdatabasedir) | - | 给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置数据库文件路径。 |
| [int OH\_Rdb\_SetStoreName(OH\_Rdb\_ConfigV2 \*config, const char \*storeName)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setstorename) | - | 给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置数据库名称。 |
| [int OH\_Rdb\_SetBundleName(OH\_Rdb\_ConfigV2 \*config, const char \*bundleName)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setbundlename) | - | 给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置应用包名。 |
| [int OH\_Rdb\_SetModuleName(OH\_Rdb\_ConfigV2 \*config, const char \*moduleName)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setmodulename) | - | 给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置应用模块名。 |
| [int OH\_Rdb\_SetEncrypted(OH\_Rdb\_ConfigV2 \*config, bool isEncrypted)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setencrypted) | - | 给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置数据库是否加密。 |
| [int OH\_Rdb\_SetSecurityLevel(OH\_Rdb\_ConfigV2 \*config, int securityLevel)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setsecuritylevel) | - | 给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置数据库安全级别[OH\_Rdb\_SecurityLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_securitylevel)。 |
| [int OH\_Rdb\_SetArea(OH\_Rdb\_ConfigV2 \*config, int area)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setarea) | - | 给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置数据库安全区域等级[Rdb\_SecurityArea](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_securityarea)。 |
| [int OH\_Rdb\_SetDbType(OH\_Rdb\_ConfigV2 \*config, int dbType)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setdbtype) | - | 给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置数据库类型[Rdb\_DBType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_dbtype)。 |
| [int OH\_Rdb\_SetCustomDir(OH\_Rdb\_ConfigV2 \*config, const char \*customDir)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setcustomdir) | - | 设置数据库的自定义目录。 |
| [int OH\_Rdb\_SetReadOnly(OH\_Rdb\_ConfigV2 \*config, bool readOnly)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setreadonly) | - | 设置关系型数据库是否为只读模式。 |
| [int OH\_Rdb\_SetPlugins(OH\_Rdb\_ConfigV2 \*config, const char \*\*plugins, int32\_t length)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setplugins) | - | 设置具有特定功能（如全文检索）的动态库。 |
| [int OH\_Rdb\_SetCryptoParam(OH\_Rdb\_ConfigV2 \*config, const OH\_Rdb\_CryptoParam \*cryptoParam)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setcryptoparam) | - | 设置自定义加密参数。 |
| [int OH\_Rdb\_IsTokenizerSupported(Rdb\_Tokenizer tokenizer, bool \*isSupported)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_istokenizersupported) | - | 判断当前平台是否支持传入的分词器。 |
| [int OH\_Rdb\_SetTokenizer(OH\_Rdb\_ConfigV2 \*config, Rdb\_Tokenizer tokenizer)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_settokenizer) | - | 给指定的数据库文件配置设置分词器类型。 |
| [int OH\_Rdb\_SetPersistent(OH\_Rdb\_ConfigV2 \*config, bool isPersistent)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setpersistent) | - | 指定数据库是否需要持久化。 |
| [const int \*OH\_Rdb\_GetSupportedDbType(int \*typeCount)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_getsupporteddbtype) | - | 获得支持的数据库类型[Rdb\_DBType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_dbtype)。 |
| [OH\_VObject \*OH\_Rdb\_CreateValueObject()](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_createvalueobject) | - | 创建[OH\_VObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vobject)实例。 |
| [OH\_VBucket \*OH\_Rdb\_CreateValuesBucket()](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_createvaluesbucket) | - | 创建[OH\_VBucket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vbucket)实例。 |
| [OH\_Predicates \*OH\_Rdb\_CreatePredicates(const char \*table)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_createpredicates) | - | 创建[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例。 |
| [OH\_Rdb\_Store \*OH\_Rdb\_GetOrOpen(const OH\_Rdb\_Config \*config, int \*errCode)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_getoropen) | - | 获得一个相关的[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例，操作关系型数据库。 |
| [OH\_Rdb\_Store \*OH\_Rdb\_CreateOrOpen(const OH\_Rdb\_ConfigV2 \*config, int \*errCode)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_createoropen) | - | 使用指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，获得一个对应的[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例，用来操作关系型数据库。 |
| [int OH\_Rdb\_CloseStore(OH\_Rdb\_Store \*store)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_closestore) | - | 销毁[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)对象，并回收该对象占用的内存。 |
| [int OH\_Rdb\_DeleteStore(const OH\_Rdb\_Config \*config)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_deletestore) | - | 使用指定的数据库文件配置删除数据库。 |
| [int OH\_Rdb\_DeleteStoreV2(const OH\_Rdb\_ConfigV2 \*config)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_deletestorev2) | - | 使用指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)删除数据库。  当使用向量数据库时，在调用接口前，应当确保向量数据库已经打开的OH\_Rdb\_Store和OH\_Cursor均已成功关闭。 |
| [int OH\_Rdb\_Insert(OH\_Rdb\_Store \*store, const char \*table, OH\_VBucket \*valuesBucket)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_insert) | - | 向目标表中插入一行数据。 |
| [int OH\_Rdb\_InsertWithConflictResolution(OH\_Rdb\_Store \*store, const char \*table, OH\_VBucket \*row,Rdb\_ConflictResolution resolution, int64\_t \*rowId)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_insertwithconflictresolution) | - | 向目标表中插入一行数据，并支持冲突解决。 |
| [int OH\_Rdb\_BatchInsert(OH\_Rdb\_Store \*store, const char \*table,const OH\_Data\_VBuckets \*rows, Rdb\_ConflictResolution resolution, int64\_t \*changes)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_batchinsert) | - | 将一批数据插入到目标表中。 |
| [int OH\_Rdb\_Update(OH\_Rdb\_Store \*store, OH\_VBucket \*valuesBucket, OH\_Predicates \*predicates)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_update) | - | 根据指定的条件更新数据库中的数据。 |
| [int OH\_Rdb\_UpdateWithConflictResolution(OH\_Rdb\_Store \*store, OH\_VBucket \*row, OH\_Predicates \*predicates,Rdb\_ConflictResolution resolution, int64\_t \*changes)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_updatewithconflictresolution) | - | 根据指定条件更新数据库中的数据，并支持冲突解决。 |
| [int OH\_Rdb\_Delete(OH\_Rdb\_Store \*store, OH\_Predicates \*predicates)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_delete) | - | 根据指定的条件删除数据库中的数据。 |
| [OH\_Cursor \*OH\_Rdb\_Query(OH\_Rdb\_Store \*store, OH\_Predicates \*predicates, const char \*const \*columnNames, int length)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_query) | - | 根据指定条件查询数据库中的数据 |
| [int OH\_Rdb\_Execute(OH\_Rdb\_Store \*store, const char \*sql)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_execute) | - | 执行无返回值的SQL语句。 |
| [int OH\_Rdb\_ExecuteV2(OH\_Rdb\_Store \*store, const char \*sql, const OH\_Data\_Values \*args, OH\_Data\_Value \*\*result)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_executev2) | - | 执行有返回值的SQL语句，支持向量数据库。 |
| [int OH\_Rdb\_ExecuteByTrxId(OH\_Rdb\_Store \*store, int64\_t trxId, const char \*sql)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_executebytrxid) | - | 使用指定的事务ID执行无返回值的SQL语句，仅支持向量数据库。 |
| [OH\_Cursor \*OH\_Rdb\_ExecuteQuery(OH\_Rdb\_Store \*store, const char \*sql)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_executequery) | - | 根据指定SQL语句查询数据库中的数据，支持向量数据库。 |
| [OH\_Cursor \*OH\_Rdb\_ExecuteQueryV2(OH\_Rdb\_Store \*store, const char \*sql, const OH\_Data\_Values \*args)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_executequeryv2) | - | 根据指定SQL语句查询数据库中的数据，支持向量数据库。 |
| [int OH\_Rdb\_BeginTransaction(OH\_Rdb\_Store \*store)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_begintransaction) | - | 在开始执行SQL语句之前，开始事务。 |
| [int OH\_Rdb\_RollBack(OH\_Rdb\_Store \*store)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_rollback) | - | 回滚已经执行的SQL语句。 |
| [int OH\_Rdb\_Commit(OH\_Rdb\_Store \*store)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_commit) | - | 提交已执行的SQL语句 |
| [int OH\_Rdb\_BeginTransWithTrxId(OH\_Rdb\_Store \*store, int64\_t \*trxId)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_begintranswithtrxid) | - | 在开始执行SQL语句之前，开始事务，并获得该事务的ID，仅支持向量数据库。 |
| [int OH\_Rdb\_RollBackByTrxId(OH\_Rdb\_Store \*store, int64\_t trxId)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_rollbackbytrxid) | - | 使用指定的事务ID, 回滚已经执行的SQL语句，仅支持向量数据库。 |
| [int OH\_Rdb\_CommitByTrxId(OH\_Rdb\_Store \*store, int64\_t trxId)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_commitbytrxid) | - | 使用指定的事务ID, 提交已经执行的SQL语句，仅支持向量数据库。 |
| [int OH\_Rdb\_Backup(OH\_Rdb\_Store \*store, const char \*databasePath)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_backup) | - | 以指定路径备份数据库，支持向量数据库。 |
| [int OH\_Rdb\_Restore(OH\_Rdb\_Store \*store, const char \*databasePath)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_restore) | - | 从指定的数据库备份文件恢复数据库，支持向量数据库。 |
| [int OH\_Rdb\_GetVersion(OH\_Rdb\_Store \*store, int \*version)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_getversion) | - | 获取数据库版本。 |
| [int OH\_Rdb\_SetVersion(OH\_Rdb\_Store \*store, int version)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setversion) | - | 设置数据库版本。 |
| [int OH\_Rdb\_SetDistributedTables(OH\_Rdb\_Store \*store, const char \*tables[], uint32\_t count, Rdb\_DistributedType type,const Rdb\_DistributedConfig \*config)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setdistributedtables) | - | 设置分布式数据库表。 |
| [OH\_Cursor \*OH\_Rdb\_FindModifyTime(OH\_Rdb\_Store \*store, const char \*tableName, const char \*columnName,OH\_VObject \*values)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_findmodifytime) | - | 获取数据库表中数据的最后修改时间。 |
| [typedef void (\*Rdb\_BriefObserver)(void \*context, const char \*values[], uint32\_t count)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_briefobserver) | Rdb\_BriefObserver | 端云数据更改事件的回调函数。 |
| [typedef void (\*Rdb\_DetailsObserver)(void \*context, const Rdb\_ChangeInfo \*\*changeInfo, uint32\_t count)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_detailsobserver) | Rdb\_DetailsObserver | 端云数据更改事件的细节的回调函数。 |
| [int OH\_Rdb\_Subscribe(OH\_Rdb\_Store \*store, Rdb\_SubscribeType type, const Rdb\_DataObserver \*observer)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_subscribe) | - | 为数据库注册观察者。当分布式数据库或本地数据库中的数据发生更改时，将调用回调。 |
| [int OH\_Rdb\_Unsubscribe(OH\_Rdb\_Store \*store, Rdb\_SubscribeType type, const Rdb\_DataObserver \*observer)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_unsubscribe) | - | 从数据库中删除指定类型的指定观察者。 |
| [Rdb\_TableDetails \*OH\_Rdb\_GetTableDetails(Rdb\_ProgressDetails \*progress, int32\_t version)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_gettabledetails) | - | 从端云同步任务的统计信息中获取数据库表的统计信息。 |
| [typedef void (\*Rdb\_ProgressCallback)(void \*context, Rdb\_ProgressDetails \*progressDetails)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_progresscallback) | Rdb\_ProgressCallback | 端云同步进度的回调函数。 |
| [typedef void (\*Rdb\_SyncCallback)(Rdb\_ProgressDetails \*progressDetails)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_synccallback) | Rdb\_SyncCallback | 数据库端云同步的回调函数。 |
| [int OH\_Rdb\_CloudSync(OH\_Rdb\_Store \*store, Rdb\_SyncMode mode, const char \*tables[], uint32\_t count,const Rdb\_ProgressObserver \*observer)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_cloudsync) | - | 进行端云同步。 |
| [int OH\_Rdb\_SubscribeAutoSyncProgress(OH\_Rdb\_Store \*store, const Rdb\_ProgressObserver \*observer)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_subscribeautosyncprogress) | - | 订阅RDB存储的自动同步进度。  当收到自动同步进度的通知时，将调用回调。 |
| [int OH\_Rdb\_UnsubscribeAutoSyncProgress(OH\_Rdb\_Store \*store, const Rdb\_ProgressObserver \*observer)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_unsubscribeautosyncprogress) | - | 取消订阅RDB存储的自动同步进程。 |
| [int OH\_Rdb\_LockRow(OH\_Rdb\_Store \*store, OH\_Predicates \*predicates)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_lockrow) | - | 根据指定的条件锁定数据库中的数据，锁定数据不执行端云同步。 |
| [int OH\_Rdb\_UnlockRow(OH\_Rdb\_Store \*store, OH\_Predicates \*predicates)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_unlockrow) | - | 根据指定的条件锁解锁数据库中的数据。 |
| [OH\_Cursor \*OH\_Rdb\_QueryLockedRow(OH\_Rdb\_Store \*store, OH\_Predicates \*predicates, const char \*const \*columnNames, int length)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_querylockedrow) | - | 根据指定条件查询数据库中锁定的数据。 |
| [int OH\_Rdb\_CreateTransaction(OH\_Rdb\_Store \*store, const OH\_RDB\_TransOptions \*options, OH\_Rdb\_Transaction \*\*trans)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_createtransaction) | - | 创建一个事务对象。 |
| [int OH\_Rdb\_Attach(OH\_Rdb\_Store \*store, const OH\_Rdb\_ConfigV2 \*config, const char \*attachName, int64\_t waitTime,size\_t \*attachedNumber)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_attach) | - | 将数据库文件附加到当前连接的数据库。 |
| [int OH\_Rdb\_Detach(OH\_Rdb\_Store \*store, const char \*attachName, int64\_t waitTime, size\_t \*attachedNumber)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_detach) | - | 从当前数据库中分离指定的数据库。 |
| [int OH\_Rdb\_SetLocale(OH\_Rdb\_Store \*store, const char \*locale)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setlocale) | - | 支持不同语言的排序规则。 |
| [int OH\_Rdb\_SetSemanticIndex(OH\_Rdb\_ConfigV2 \*config, bool enableSemanticIndex)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_setsemanticindex) | - | 开启或关闭基于语义索引的知识加工。 |
| [int OH\_Rdb\_RekeyEx(OH\_Rdb\_Store \*store, OH\_Rdb\_CryptoParam \*param)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_rekeyex) | - | 更改加密数据库密钥。  不支持对非WAL模式的数据库进行密钥更新。  手动更新时需要独占访问数据库，此时若存在任何未释放的结果集、事务或其他进程打开的数据库均会导致更新失败。  支持加密数据库的参数更新，以及加密数据库与非加密数据库之间的相互转换。  数据库越大，执行更新所需的时间越长。  加密参数变更需谨慎，调用OH\_Rdb\_CreateOrOpen时需要传入正确的加密参数，否则可能打开数据库失败。 |
| [typedef void (\*Rdb\_CorruptedHandler)(void \*context, OH\_Rdb\_ConfigV2 \*config, OH\_Rdb\_Store \*store)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_corruptedhandler) | Rdb\_CorruptedHandler | 数据库异常处理的回调函数。 |
| [int OH\_Rdb\_RegisterCorruptedHandler(const OH\_Rdb\_ConfigV2 \*config, void \*context, const Rdb\_CorruptedHandler handler)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_registercorruptedhandler) | - | 注册数据库异常处理。当数据库发生异常时，将调用异常处理的回调函数。  异常处理逻辑为用户自定义，回调时触发的业务需要用户自行保障。  每个路径只允许注册一次。 |
| [int OH\_Rdb\_UnregisterCorruptedHandler(const OH\_Rdb\_ConfigV2 \*config, void \*context, const Rdb\_CorruptedHandler handler)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_unregistercorruptedhandler) | - | 取消注册的数据库异常处理的回调函数。  handler和context必须要和订阅时保持一致，否则取消失败。 |
| [OH\_Cursor \*OH\_Rdb\_QueryWithoutRowCount(OH\_Rdb\_Store \*store, OH\_Predicates \*predicates, const char \* const columns[], int length)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_querywithoutrowcount) | - | 根据指定条件查询数据库中的数据，不计算行数。 |
| [OH\_Cursor \*OH\_Rdb\_QuerySqlWithoutRowCount(OH\_Rdb\_Store \*store, const char \*sql, const OH\_Data\_Values \*args)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_querysqlwithoutrowcount) | - | 执行有返回值的SQL语句，不计算行数，支持向量数据库。 |
| [int OH\_Rdb\_BatchInsertWithReturning(OH\_Rdb\_Store \*store, const char \*table, const OH\_Data\_VBuckets \*rows, Rdb\_ConflictResolution resolution, OH\_RDB\_ReturningContext \*context)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_batchinsertwithreturning) | - | 将批量数据插入目标表，并将变更信息输出到上下文中。 |
| [int OH\_Rdb\_UpdateWithReturning(OH\_Rdb\_Store \*store, OH\_VBucket \*row, OH\_Predicates \*predicates, Rdb\_ConflictResolution resolution, OH\_RDB\_ReturningContext \*context)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_updatewithreturning) | - | 根据指定条件更新数据库中的数据并输出更改信息到上下文。 |
| [int OH\_Rdb\_DeleteWithReturning(OH\_Rdb\_Store \*store, OH\_Predicates \*predicates, OH\_RDB\_ReturningContext \*context)](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_deletewithreturning) | - | 根据指定条件从数据库中删除数据并输出更改信息到上下文。 |

### 宏定义

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| DISTRIBUTED\_CONFIG\_VERSION 1 | 描述[Rdb\_DistributedConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-distributedconfig)的版本。  **起始版本：** 11 |
| DISTRIBUTED\_CHANGE\_INFO\_VERSION 1 | 描述[Rdb\_ChangeInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-changeinfo)的版本。  **起始版本：** 11 |
| DISTRIBUTED\_PROGRESS\_DETAIL\_VERSION 1 | 描述[Rdb\_ProgressDetails](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-progressdetails)的版本。  **起始版本：** 11 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### OH\_Rdb\_SecurityLevel

PhonePC/2in1TabletTVWearable



```
1. enum OH_Rdb_SecurityLevel
```

**描述**

数据库的安全级别枚举。

**起始版本：** 10

展开

| 枚举项 | 描述 |
| --- | --- |
| S1 = 1 | S1: 表示数据库的安全级别为低级别。当数据泄露时会产生较低影响。 |
| S2 | S2: 表示数据库的安全级别为中级别。当数据泄露时会产生较大影响。 |
| S3 | S3: 表示数据库的安全级别为高级别。当数据泄露时会产生重大影响。 |
| S4 | S4: 表示数据库的安全级别为关键级别。当数据泄露时会产生严重影响。 |

### Rdb\_SecurityArea

PhonePC/2in1TabletTVWearable



```
1. enum Rdb_SecurityArea
```

**描述**

描述数据库的安全区域等级。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| RDB\_SECURITY\_AREA\_EL1 = 1 | 安全区域等级为1。 |
| RDB\_SECURITY\_AREA\_EL2 | 安全区域等级为2。 |
| RDB\_SECURITY\_AREA\_EL3 | 安全区域等级为3。 |
| RDB\_SECURITY\_AREA\_EL4 | 安全区域等级为4。 |
| RDB\_SECURITY\_AREA\_EL5 | 安全区域等级为5。  **起始版本：** 12 |

### Rdb\_DBType

PhonePC/2in1TabletTVWearable



```
1. enum Rdb_DBType
```

**描述**

描述数据库的内核类型。

**起始版本：** 14

展开

| 枚举项 | 描述 |
| --- | --- |
| RDB\_SQLITE = 1 | 表示使用sqlite作为数据库内核。 |
| RDB\_CAYLEY = 2 | 表示使用凯莱数据库作为数据库内核。 |
| DBTYPE\_BUTT = 64 | 表示内核类型枚举值允许取值的最大值，这是一个非法值。 |

### Rdb\_Tokenizer

PhonePC/2in1TabletTVWearable



```
1. enum Rdb_Tokenizer
```

**描述**

描述数据库的分词器类型。

**起始版本：** 17

展开

| 枚举项 | 描述 |
| --- | --- |
| RDB\_NONE\_TOKENIZER = 1 | 表示不使用分词器。 |
| RDB\_ICU\_TOKENIZER = 2 | 表示使用ICU分词器。 |
| RDB\_CUSTOM\_TOKENIZER = 3 | 表示使用CUSTOM分词器。  **起始版本：** 18 |

### Rdb\_DistributedType

PhonePC/2in1TabletTVWearable



```
1. enum Rdb_DistributedType
```

**描述**

描述表的分布式类型的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| RDB\_DISTRIBUTED\_CLOUD | 表示在设备和云端之间分布式的数据库表。 |

### Rdb\_ChangeType

PhonePC/2in1TabletTVWearable



```
1. enum Rdb_ChangeType
```

**描述**

描述数据变更类型。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| RDB\_DATA\_CHANGE | 表示是数据发生变更。 |
| RDB\_ASSET\_CHANGE | 表示是资产附件发生了变更。 |

### Rdb\_SubscribeType

PhonePC/2in1TabletTVWearable



```
1. enum Rdb_SubscribeType
```

**描述**

描述订阅类型。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| RDB\_SUBSCRIBE\_TYPE\_CLOUD | 订阅云端数据更改。 |
| RDB\_SUBSCRIBE\_TYPE\_CLOUD\_DETAILS | 订阅云端数据更改详情。 |
| RDB\_SUBSCRIBE\_TYPE\_LOCAL\_DETAILS | 订阅本地数据更改详情。  **起始版本：** 12 |

### Rdb\_SyncMode

PhonePC/2in1TabletTVWearable



```
1. enum Rdb_SyncMode
```

**描述**

表示数据库的同步模式。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| RDB\_SYNC\_MODE\_TIME\_FIRST | 表示数据从修改时间较近的一端同步到修改时间较远的一端。 |
| RDB\_SYNC\_MODE\_NATIVE\_FIRST | 表示数据从本地设备同步到云端。 |
| RDB\_SYNC\_MODE\_CLOUD\_FIRST | 表示数据从云端同步到本地设备。 |

### Rdb\_Progress

PhonePC/2in1TabletTVWearable



```
1. enum Rdb_Progress
```

**描述**

描述端云同步过程。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| RDB\_SYNC\_BEGIN | 表示端云同步过程开始。 |
| RDB\_SYNC\_IN\_PROGRESS | 表示正在端云同步过程中。 |
| RDB\_SYNC\_FINISH | 表示端云同步过程已完成。 |

### Rdb\_ProgressCode

PhonePC/2in1TabletTVWearable



```
1. enum Rdb_ProgressCode
```

**描述**

表示端云同步过程的状态。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| RDB\_SUCCESS | 表示端云同步过程成功。 |
| RDB\_UNKNOWN\_ERROR | 表示端云同步过程遇到未知错误。 |
| RDB\_NETWORK\_ERROR | 表示端云同步过程遇到网络错误。 |
| RDB\_CLOUD\_DISABLED | 表示云端不可用。 |
| RDB\_LOCKED\_BY\_OTHERS | 表示有其他设备正在端云同步，本设备无法进行端云同步。 |
| RDB\_RECORD\_LIMIT\_EXCEEDED | 表示本次端云同步需要同步的条目或大小超出最大值。由云端配置最大值。 |
| RDB\_NO\_SPACE\_FOR\_ASSET | 表示云空间剩余空间小于待同步的资产大小。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_Rdb\_SetSemanticIndex()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetSemanticIndex(OH_Rdb_ConfigV2 *config, bool enableSemanticIndex)
```

**描述**

开启或关闭基于语义索引的知识加工。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)实例的指针。 |
| bool enableSemanticIndex | 开启或关闭基于语义索引的知识加工能力标志。  true表示开启。false表示关闭。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。错误码定义详见[OH\_Rdb\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-error-code-h#oh_rdb_errcode)。  若返回RDB\_OK，指向成功。  若返回RDB\_E\_INVALID\_ARGS，表示传入了无效参数。 |

### OH\_Rdb\_CreateConfig()

PhonePC/2in1TabletTVWearable



```
1. OH_Rdb_ConfigV2 *OH_Rdb_CreateConfig()
```

**描述**

创建一个[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)实例，并返回指向该实例的指针。

**起始版本：** 14

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) | 返回一个指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)实例的指针。  使用完成后，必须通过[OH\_Rdb\_DestroyConfig](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_destroyconfig)接口释放内存。 |

**参考：**

OH\_Rdb\_ConfigV2

### OH\_Rdb\_DestroyConfig()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_DestroyConfig(OH_Rdb_ConfigV2 *config)
```

**描述**

销毁由[OH\_Rdb\_CreateConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_createconfig)创建的[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象的指针，即与此RDB存储相关的数据库配置。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_SetDatabaseDir()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetDatabaseDir(OH_Rdb_ConfigV2 *config, const char *databaseDir)
```

**描述**

给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置数据库文件路径。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象的指针，即与此RDB存储相关的数据库配置。 |
| const char \*dataBaseDir | 表示数据库文件路径。包含数据库名称在内的全路径长度不超过1024个字符。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_SetStoreName()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetStoreName(OH_Rdb_ConfigV2 *config, const char *storeName)
```

**描述**

给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置数据库名称。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象的指针，即与此RDB存储相关的数据库配置。 |
| const char \*storeName | 表示数据库名称。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_SetBundleName()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetBundleName(OH_Rdb_ConfigV2 *config, const char *bundleName)
```

**描述**

给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置应用包名。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象的指针，即与此RDB存储相关的数据库配置。 |
| const char \*bundleName | 表示数据库应用包名。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_SetModuleName()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetModuleName(OH_Rdb_ConfigV2 *config, const char *moduleName)
```

**描述**

给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置应用模块名。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象的指针，即与此RDB存储相关的数据库配置。 |
| const char \*moduleName | 表示数据库应用模块名。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_SetEncrypted()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetEncrypted(OH_Rdb_ConfigV2 *config, bool isEncrypted)
```

**描述**

给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置数据库是否加密。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象的指针，即与此RDB存储相关的数据库配置。 |
| bool isEncrypted | 表示数据库是否加密。true表示加密，false表示不加密。数据库创建完成后，此参数不允许直接修改。如需变更数据库加密状态，请调用[OH\_Rdb\_RekeyEx](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_rekeyex)接口进行更新操作。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_SetSecurityLevel()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetSecurityLevel(OH_Rdb_ConfigV2 *config, int securityLevel)
```

**描述**

给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置数据库安全级别[OH\_Rdb\_SecurityLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_securitylevel)。

创建数据库时必须调用该方法，否则数据库文件无法创建成功，调用[OH\_Rdb\_CreateOrOpen](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_createoropen)接口时将返回错误码RDB\_E\_INVALID\_ARGS。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象的指针，即与此RDB存储相关的数据库配置。 |
| int securityLevel | 表示数据库安全级别[OH\_Rdb\_SecurityLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_securitylevel)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_SetArea()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetArea(OH_Rdb_ConfigV2 *config, int area)
```

**描述**

给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置数据库安全区域等级[Rdb\_SecurityArea](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_securityarea)。

创建数据库时必须调用该方法，否则数据库文件无法创建成功，调用[OH\_Rdb\_CreateOrOpen](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_createoropen)接口时将返回错误码RDB\_E\_INVALID\_ARGS。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象的指针，即与此RDB存储相关的数据库配置。 |
| int area | 表示数据库安全区域等级[Rdb\_SecurityArea](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_securityarea)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_SetDbType()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetDbType(OH_Rdb_ConfigV2 *config, int dbType)
```

**描述**

给指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，设置数据库类型[Rdb\_DBType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_dbtype)。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象的指针，即与此RDB存储相关的数据库配置。 |
| int dbType | 表示数据库的数据库类型[Rdb\_DBType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_dbtype)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。  RDB\_E\_NOT\_SUPPORTED表示不支持当前操作。 |

### OH\_Rdb\_SetCustomDir()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetCustomDir(OH_Rdb_ConfigV2 *config, const char *customDir)
```

**描述**

设置数据库的自定义目录。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 表示此关系型数据库相关的数据库配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)的指针。 |
| const char \*customDir | 表示数据库的自定义目录，目录长度不能超过128字节。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。 |

### OH\_Rdb\_SetReadOnly()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetReadOnly(OH_Rdb_ConfigV2 *config, bool readOnly)
```

**描述**

设置关系型数据库是否为只读模式。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 表示此关系型数据库相关的数据库配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)的指针。 |
| bool readOnly | 表示关系型数据库存储是否为只读模式，true表示设置为只读模式，false表示设置为读写模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。 |

### OH\_Rdb\_SetPlugins()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetPlugins(OH_Rdb_ConfigV2 *config, const char **plugins, int32_t length)
```

**描述**

设置具有特定功能（如全文检索）的动态库。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 表示此关系型数据库相关的数据库配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)的指针。 |
| const char \*\*plugins | 表示动态库的名称数组。 |
| int32\_t length | 表示插件数组的大小，最大值为16。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。 |

### OH\_Rdb\_SetCryptoParam()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetCryptoParam(OH_Rdb_ConfigV2 *config, const OH_Rdb_CryptoParam *cryptoParam)
```

**描述**

设置自定义加密参数。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 表示此关系型数据库相关的数据库配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)的指针。 |
| const [OH\_Rdb\_CryptoParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-cryptoparam) \*cryptoParam | 表示自定义加密参数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。 |

### OH\_Rdb\_IsTokenizerSupported()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_IsTokenizerSupported(Rdb_Tokenizer tokenizer, bool *isSupported)
```

**描述**

判断当前平台是否支持传入的分词器。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Rdb\_Tokenizer](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_tokenizer) tokenizer | 要校验是否支持的分词器。 |
| bool \*isSupported | 校验结果的指针，作为出参使用。true表示当前平台支持当前校验的分词器，false表示当前平台不支持当前校验的分词器。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回接口操作执行的状态码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_SetTokenizer()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetTokenizer(OH_Rdb_ConfigV2 *config, Rdb_Tokenizer tokenizer)
```

**描述**

给指定的数据库文件配置设置分词器类型。

**起始版本：** 17

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向此RDB存储相关的数据库配置的指针。 |
| [Rdb\_Tokenizer](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_tokenizer) tokenizer | 表示数据库的分词器类型。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回接口操作执行的状态码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。  RDB\_E\_NOT\_SUPPORTED表示不支持当前操作。 |

### OH\_Rdb\_SetPersistent()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetPersistent(OH_Rdb_ConfigV2 *config, bool isPersistent)
```

**描述**

指定数据库是否需要持久化。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)实例的指针。  指示与此RDB存储相关的数据库的配置。 |
| bool isPersistent | 指示数据库是否需要持久性。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的状态代码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_GetSupportedDbType()

PhonePC/2in1TabletTVWearable



```
1. const int *OH_Rdb_GetSupportedDbType(int *typeCount)
```

**描述**

获得支持的数据库类型[Rdb\_DBType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_dbtype)。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| int \*typeCount | 表示支持的数据库类型的数组的长度, 作为出参使用。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| const int \* | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_CreateValueObject()

PhonePC/2in1TabletTVWearable



```
1. OH_VObject *OH_Rdb_CreateValueObject()
```

**描述**

创建[OH\_VObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vobject)实例。

**起始版本：** 10

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_VObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vobject) | 创建成功则返回一个指向[OH\_VObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vobject)结构体实例的指针，否则返回NULL。 |

**参考：**

OH\_VObject

### OH\_Rdb\_CreateValuesBucket()

PhonePC/2in1TabletTVWearable



```
1. OH_VBucket *OH_Rdb_CreateValuesBucket()
```

**描述**

创建[OH\_VBucket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vbucket)实例。

**起始版本：** 10

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_VBucket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vbucket) | 创建成功则返回一个指向[OH\_VBucket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vbucket)结构体实例的指针，否则返回NULL。 |

**参考：**

OH\_VBucket

### OH\_Rdb\_CreatePredicates()

PhonePC/2in1TabletTVWearable



```
1. OH_Predicates *OH_Rdb_CreatePredicates(const char *table)
```

**描述**

创建[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*table | 表示数据库表名。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) | 创建成功则返回一个指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)结构体实例的指针，否则返回NULL。 |

**参考：**

OH\_Predicates

### OH\_Rdb\_GetOrOpen()

PhonePC/2in1TabletTVWearable



```
1. OH_Rdb_Store *OH_Rdb_GetOrOpen(const OH_Rdb_Config *config, int *errCode)
```

**描述**

获得一个相关的[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例，操作关系型数据库。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_Rdb\_Config](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-config) \*config | 指向[OH\_Rdb\_Config](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-config)实例的指针，与此RDB存储相关的数据库配置。 |
| int \*errCode | 表示函数执行状态, 作为出参使用。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) | 创建成功则返回一个指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)结构体实例的指针，否则返回NULL。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_CreateOrOpen()

PhonePC/2in1TabletTVWearable



```
1. OH_Rdb_Store *OH_Rdb_CreateOrOpen(const OH_Rdb_ConfigV2 *config, int *errCode)
```

**描述**

使用指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)，获得一个对应的[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例，用来操作关系型数据库。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象的指针，即与此RDB存储相关的数据库配置。 |
| int \*errCode | 表示函数执行状态，作为出参使用。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) | 创建成功则返回一个指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)结构体实例的指针，否则返回NULL。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_CloseStore()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_CloseStore(OH_Rdb_Store *store)
```

**描述**

销毁[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)对象，并回收该对象占用的内存。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_DeleteStore()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_DeleteStore(const OH_Rdb_Config *config)
```

**描述**

使用指定的数据库文件配置删除数据库。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_Rdb\_Config](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-config) \*config | 表示数据库的配置。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_DeleteStoreV2()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_DeleteStoreV2(const OH_Rdb_ConfigV2 *config)
```

**描述**

使用指定的数据库文件配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)删除数据库。

当使用向量数据库时，在调用接口前，应当确保向量数据库已经打开的OH\_Rdb\_Store和OH\_Cursor均已成功关闭。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 表示数据库的配置。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_Insert()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_Insert(OH_Rdb_Store *store, const char *table, OH_VBucket *valuesBucket)
```

**描述**

向目标表中插入一行数据。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*table | 表示指定的目标表名。 |
| [OH\_VBucket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vbucket) \*valuesBucket | 表示要插入到表中的数据行[OH\_VBucket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vbucket)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 如果插入成功，返回rowID，否则返回的结果小于0。  RDB\_ERR表示插入失败。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_InsertWithConflictResolution()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_InsertWithConflictResolution(OH_Rdb_Store *store, const char *table, OH_VBucket *row,Rdb_ConflictResolution resolution, int64_t *rowId)
```

**描述**

向目标表中插入一行数据，并支持冲突解决。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*table | 表示目标表的名称。 |
| [OH\_VBucket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vbucket) \*row | 表示要插入到表中的数据。 |
| [Rdb\_ConflictResolution](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-rdb-types-h#rdb_conflictresolution) resolution | 表示发生冲突时的解决策略。 |
| int64\_t \*rowId | 表示插入成功后返回的行号。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_E\_ERROR表示数据库常见错误。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。  返回RDB\_E\_ALREADY\_CLOSED表示数据库已关闭。  返回RDB\_E\_WAL\_SIZE\_OVER\_LIMIT表示WAL文件大小超过默认限制。  返回RDB\_E\_SQLITE\_FULL表示SQLite错误：数据库已满。  返回RDB\_E\_SQLITE\_CORRUPT表示数据库已损坏。  返回RDB\_E\_SQLITE\_PERM表示SQLite错误：访问权限被拒绝。  返回RDB\_E\_SQLITE\_BUSY表示SQLite错误：数据库文件被锁定。  返回RDB\_E\_SQLITE\_LOCKED表示SQLite错误：数据库中的表被锁定。  返回RDB\_E\_SQLITE\_NOMEM表示SQLite错误：数据库内存不足。  返回RDB\_E\_SQLITE\_READONLY表示SQLite错误：尝试写入只读数据库。  返回RDB\_E\_SQLITE\_IOERR表示SQLite错误：磁盘I/O错误。  返回RDB\_E\_SQLITE\_TOO\_BIG表示SQLite错误：TEXT或BLOB超出大小限制。  返回RDB\_E\_SQLITE\_MISMATCH表示SQLite错误：数据类型不匹配。  返回RDB\_E\_SQLITE\_CONSTRAINT表示SQLite错误：违反约束导致操作中止。 |

### OH\_Rdb\_BatchInsert()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_BatchInsert(OH_Rdb_Store *store, const char *table,const OH_Data_VBuckets *rows, Rdb_ConflictResolution resolution, int64_t *changes)
```

**描述**

将一批数据插入到目标表中。

单次插入参数的最大数量限制为32766，超出上限会返回RDB\_E\_INVALID\_ARGS错误码。参数数量计算方式为插入数据条数乘以插入数据的所有字段的并集大小。

例如：插入数据的所有字段的并集大小为10，则最多可以插入3276条数据（3276\*10=32760）。

请确保在调用接口时遵守此限制，以避免因参数数量过多而导致错误。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*tables | 要设置的分布式数据库表表名。 |
| const [OH\_Data\_VBuckets \*rows](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-data-vbuckets) | 表示要插入到表中的一组数据。 |
| [Rdb\_ConflictResolution](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-rdb-types-h#rdb_conflictresolution) resolution | 表示发生冲突时的解决策略。 |
| int64\_t \*changes | 输出参数，表示插入成功的次数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示成功。  返回RDB\_E\_ERROR表示数据库常见错误。  返回RDB\_E\_INVALID\_ARGS表示无效参数。  返回RDB\_E\_ALREADY\_CLOSED表示数据库已经关闭。  返回RDB\_E\_WAL\_SIZE\_OVER\_LIMIT表示WAL日志文件大小超过默认值。  返回RDB\_E\_SQLITE\_FULL表示SQLite错误码：数据库已满。  返回RDB\_E\_SQLITE\_CORRUPT表示数据库损坏。  返回RDB\_E\_SQLITE\_PERM表示SQLite错误码：访问权限被拒绝。  返回RDB\_E\_SQLITE\_BUSY表示SQLite错误码：数据库文件被锁定。  返回RDB\_E\_SQLITE\_LOCKED表示SQLite错误码：数据库中的表被锁定。  返回RDB\_E\_SQLITE\_NOMEM表示SQLite错误码：数据库内存不足。  返回RDB\_E\_SQLITE\_READONLY表示SQLite错误码：尝试写入只读数据库。  返回RDB\_E\_SQLITE\_IOERR表示SQLite错误码：磁盘I/O错误。  返回RDB\_E\_SQLITE\_TOO\_BIG表示SQLite错误码：TEXT或BLOB超出大小限制。  返回RDB\_E\_SQLITE\_MISMATCH表示SQLite错误码：数据类型不匹配。  返回RDB\_E\_SQLITE\_CONSTRAINT表示SQLite错误码：SQLite约束。 |

### OH\_Rdb\_Update()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_Update(OH_Rdb_Store *store, OH_VBucket *valuesBucket, OH_Predicates *predicates)
```

**描述**

根据指定的条件更新数据库中的数据。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| [OH\_VBucket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vbucket) \*valuesBucket | 表示要更新到表中的数据行[OH\_VBucket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vbucket)。 |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) \*predicates | 指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例的指针，指定更新条件。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 如果更新成功，返回更新的行数，否则返回的结果小于0。  RDB\_ERR表示更新失败。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_UpdateWithConflictResolution()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_UpdateWithConflictResolution(OH_Rdb_Store *store, OH_VBucket *row, OH_Predicates *predicates,Rdb_ConflictResolution resolution, int64_t *changes)
```

**描述**

根据指定条件更新数据库中的数据，并支持冲突解决。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| [OH\_VBucket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vbucket) \*row | 表示要更新到表中的数据行。 |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) \*predicates | 指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例的指针，指定更新条件。 |
| [Rdb\_ConflictResolution](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-rdb-types-h#rdb_conflictresolution) resolution | 表示发生冲突时的解决策略。 |
| int64\_t \*changes | 输出参数，表示成功更新的行数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_E\_ERROR 表示数据库常见错误。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。  返回RDB\_E\_ALREADY\_CLOSED表示数据库已关闭。  返回RDB\_E\_WAL\_SIZE\_OVER\_LIMIT表示WAL文件大小超过默认限制。  返回RDB\_E\_SQLITE\_FULL表示SQLite错误：数据库已满。  返回RDB\_E\_SQLITE\_CORRUPT表示数据库已损坏。  返回RDB\_E\_SQLITE\_PERM表示SQLite错误：访问权限被拒绝。  返回RDB\_E\_SQLITE\_BUSY表示SQLite错误：数据库文件被锁定。  返回RDB\_E\_SQLITE\_LOCKED表示SQLite错误：数据库中的表被锁定。  返回RDB\_E\_SQLITE\_NOMEM表示SQLite错误：数据库内存不足。  返回RDB\_E\_SQLITE\_READONLY表示SQLite错误：尝试写入只读数据库。  返回RDB\_E\_SQLITE\_IOERR表示SQLite错误：磁盘I/O错误。  返回RDB\_E\_SQLITE\_TOO\_BIG表示SQLite错误：TEXT或BLOB超出大小限制。  返回RDB\_E\_SQLITE\_MISMATCH表示SQLite错误：数据类型不匹配。  返回RDB\_E\_SQLITE\_CONSTRAINT表示SQLite错误：违反约束导致操作中止。 |

### OH\_Rdb\_Delete()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_Delete(OH_Rdb_Store *store, OH_Predicates *predicates)
```

**描述**

根据指定的条件删除数据库中的数据。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) \*predicates | 指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例的指针，指定删除条件。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 如果删除成功，返回删除的行数；如果失败，则返回的结果小于0。  RDB\_ERR表示删除失败。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_Query()

PhonePC/2in1TabletTVWearable



```
1. OH_Cursor *OH_Rdb_Query(OH_Rdb_Store *store, OH_Predicates *predicates, const char *const *columnNames, int length)
```

**描述**

根据指定条件查询数据库中的数据

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) \*predicates | 指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例的指针，指定查询条件。 |
| const char \*const \*columnNames | 表示要查询的列。如果值为空，则查询应用于所有列。 |
| int length | 该参数为输入参数，表示开发者传入的columnNames数组的长度。若length大于columnNames数组的实际长度，则会访问越界。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Cursor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor) \* | 如果查询成功则返回一个指向[OH\_Cursor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor)结构体实例的指针，否则返回NULL。 |

### OH\_Rdb\_Execute()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_Execute(OH_Rdb_Store *store, const char *sql)
```

**描述**

执行无返回值的SQL语句。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*sql | 指定要执行的SQL语句。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

**参考：**

OH\_Rdb\_Store

### OH\_Rdb\_ExecuteV2()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_ExecuteV2(OH_Rdb_Store *store, const char *sql, const OH_Data_Values *args, OH_Data_Value **result)
```

**描述**

执行有返回值的SQL语句，支持向量数据库。

不支持开头包含注释的语句。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*sql | 指定要执行的SQL语句。 |
| const [OH\_Data\_Values](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-data-values) \*args | 可选参数，指向[OH\_Data\_Values](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-data-values)实例的指针。 |
| [OH\_Data\_Value](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-data-value) \*\*result | 执行成功时指向[OH\_Data\_Value](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-data-value)实例的指针，作为出参使用。使用完成后，必须通过[OH\_Value\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-data-value-h#oh_value_destroy)接口释放内存。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示成功。  返回RDB\_E\_ERROR表示数据库常见错误。  返回RDB\_E\_INVALID\_ARGS表示无效参数。  返回RDB\_E\_ALREADY\_CLOSED表示数据库已经关闭。  返回RDB\_E\_WAL\_SIZE\_OVER\_LIMIT表示WAL日志文件大小超过默认值。  返回RDB\_E\_SQLITE\_FULL表示SQLite错误码：数据库已满。  返回RDB\_E\_SQLITE\_CORRUPT表示数据库损坏。  返回RDB\_E\_SQLITE\_PERM表示SQLite错误码：访问权限被拒绝。  返回RDB\_E\_SQLITE\_BUSY表示SQLite错误码：数据库文件被锁定。  返回RDB\_E\_SQLITE\_LOCKED表示SQLite错误码：数据库中的表被锁定。  返回RDB\_E\_SQLITE\_NOMEM表示SQLite错误码：数据库内存不足。  返回RDB\_E\_SQLITE\_READONLY表示SQLite错误码：尝试写入只读数据库。  返回RDB\_E\_SQLITE\_IOERR表示SQLite错误码：磁盘I/O错误。  返回RDB\_E\_SQLITE\_TOO\_BIG表示SQLite错误码：TEXT或BLOB超出大小限制。  返回RDB\_E\_SQLITE\_MISMATCH表示SQLite错误码：数据类型不匹配。 |

**参考：**

OH\_Value\_Destroy

### OH\_Rdb\_ExecuteByTrxId()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_ExecuteByTrxId(OH_Rdb_Store *store, int64_t trxId, const char *sql)
```

**描述**

使用指定的事务ID执行无返回值的SQL语句，仅支持向量数据库。

不支持开头包含注释的语句。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 表示一个指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) 实例的指针。 |
| int64\_t trxId | 调用[OH\_Rdb\_BeginTransWithTrxId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_begintranswithtrxid)获得的事务ID，当设置为0时，表示不启用事务。 |
| const char \*sql | 指定要执行的SQL语句。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数，可能情况如下：  传入参数为空指针。  当前事务ID不是调用[OH\_Rdb\_BeginTransWithTrxId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_begintranswithtrxid)获得的。  当前事务ID已经调用[OH\_Rdb\_CommitByTrxId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_commitbytrxid)提交。  当前事务ID已经调用[OH\_Rdb\_RollBackByTrxId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_rollbackbytrxid)回滚。  当store或者sql为NULL时。  RDB\_E\_NOT\_SUPPORTED表示不支持当前操作。 |

**参考：**

OH\_Rdb\_Store

### OH\_Rdb\_ExecuteQuery()

PhonePC/2in1TabletTVWearable



```
1. OH_Cursor *OH_Rdb_ExecuteQuery(OH_Rdb_Store *store, const char *sql)
```

**描述**

根据指定SQL语句查询数据库中的数据，支持向量数据库。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*sql | 指定要执行的SQL语句。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Cursor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor) | 如果查询成功则返回一个指向[OH\_Cursor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor)结构体实例的指针，否则返回NULL。 |

**参考：**

OH\_Rdb\_Store

### OH\_Rdb\_ExecuteQueryV2()

PhonePC/2in1TabletTVWearable



```
1. OH_Cursor *OH_Rdb_ExecuteQueryV2(OH_Rdb_Store *store, const char *sql, const OH_Data_Values *args)
```

**描述**

根据指定SQL语句查询数据库中的数据，支持向量数据库。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*sql | 指定要执行的SQL语句。 |
| const OH\_Data\_Values \*args | 可选参数，指向[OH\_Data\_Values](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-data-values)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Cursor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor) \* | 如果查询成功则返回一个指向[OH\_Cursor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor)结构体实例的指针，使用完成后及时释放[OH\_Cursor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor)。  如果SQL语句无效或内存分配失败，则返回NULL。 |

**参考：**

OH\_Rdb\_Store

### OH\_Rdb\_BeginTransaction()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_BeginTransaction(OH_Rdb_Store *store)
```

**描述**

在开始执行SQL语句之前，开始事务。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_RollBack()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_RollBack(OH_Rdb_Store *store)
```

**描述**

回滚已经执行的SQL语句。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_Commit()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_Commit(OH_Rdb_Store *store)
```

**描述**

提交已执行的SQL语句

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_BeginTransWithTrxId()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_BeginTransWithTrxId(OH_Rdb_Store *store, int64_t *trxId)
```

**描述**

在开始执行SQL语句之前，开始事务，并获得该事务的ID，仅支持向量数据库。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 表示一个指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| int64\_t \*trxId | 事务ID，作为出参使用。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。  RDB\_E\_NOT\_SUPPORTED表示不支持当前操作。 |

### OH\_Rdb\_RollBackByTrxId()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_RollBackByTrxId(OH_Rdb_Store *store, int64_t trxId)
```

**描述**

使用指定的事务ID, 回滚已经执行的SQL语句，仅支持向量数据库。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 表示一个指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| int64\_t trxId | 表示需要回滚的事务的ID。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数, 可能情况如下：  传入参数为空指针。  当前事务ID不是调用[OH\_Rdb\_BeginTransWithTrxId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_begintranswithtrxid)获得的。  当前事务ID已经调用[OH\_Rdb\_CommitByTrxId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_commitbytrxid)提交。  当前事务ID已经调用[OH\_Rdb\_RollBackByTrxId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_rollbackbytrxid)回滚。  RDB\_E\_NOT\_SUPPORTED表示不支持当前操作。 |

### OH\_Rdb\_CommitByTrxId()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_CommitByTrxId(OH_Rdb_Store *store, int64_t trxId)
```

**描述**

使用指定的事务ID, 提交已经执行的SQL语句，仅支持向量数据库。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 表示一个指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| int64\_t trxId | 表示需要提交的事务的ID。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK 表示成功.  RDB\_E\_INVALID\_ARGS表示无效参数，可能情况如下：  传入参数为空指针。  当前事务ID不是调用[OH\_Rdb\_BeginTransWithTrxId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_begintranswithtrxid)获得的。  当前事务ID已经调用[OH\_Rdb\_CommitByTrxId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_commitbytrxid)提交。  当前事务ID已经调用[OH\_Rdb\_RollBackByTrxId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#oh_rdb_rollbackbytrxid)回滚。  RDB\_E\_NOT\_SUPPORTED表示不支持当前操作。 |

**参考：**

OH\_Rdb\_Store

### OH\_Rdb\_Backup()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_Backup(OH_Rdb_Store *store, const char *databasePath)
```

**描述**

以指定路径备份数据库，支持向量数据库。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*databasePath | 指定数据库的备份文件路径。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

**参考：**

OH\_Rdb\_Store

### OH\_Rdb\_Restore()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_Restore(OH_Rdb_Store *store, const char *databasePath)
```

**描述**

从指定的数据库备份文件恢复数据库，支持向量数据库。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*databasePath | 指定数据库的备份文件路径。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_GetVersion()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_GetVersion(OH_Rdb_Store *store, int *version)
```

**描述**

获取数据库版本。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| int \*version | 表示版本号，作为出参使用。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_SetVersion()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetVersion(OH_Rdb_Store *store, int version)
```

**描述**

设置数据库版本。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| int version | 表示版本号。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

**参考：**

OH\_Rdb\_Store

### OH\_Rdb\_SetDistributedTables()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetDistributedTables(OH_Rdb_Store *store, const char *tables[], uint32_t count, Rdb_DistributedType type,const Rdb_DistributedConfig *config)
```

**描述**

设置分布式数据库表。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*tables[] | 要设置的分布式数据库表表名。 |
| uint32\_t count | 要设置的分布式数据库表的数量。 |
| [Rdb\_DistributedType](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_distributedtype) type | 表的分布式类型[Rdb\_DistributedType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_distributedtype)。 |
| const [Rdb\_DistributedConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-distributedconfig) \*config | 表的分布式配置信息[Rdb\_DistributedConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-distributedconfig)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

**参考：**

OH\_Rdb\_Store

### OH\_Rdb\_FindModifyTime()

PhonePC/2in1TabletTVWearable



```
1. OH_Cursor *OH_Rdb_FindModifyTime(OH_Rdb_Store *store, const char *tableName, const char *columnName,OH_VObject *values)
```

**描述**

获取数据库表中数据的最后修改时间。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*tableName | 要查找的分布式数据库表表名。 |
| const char \*columnName | 指定要查询的数据库表的列名。 |
| [OH\_VObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vobject) \*values | 指定要查询的行的主键。如果数据库表无主键，参数columnName需传入"rowid"，此时values为要查询的数据库表的行号。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Cursor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor) | 如果操作成功则返回一个指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)结构体实例的指针，否则返回NULL。 |

### Rdb\_BriefObserver()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*Rdb_BriefObserver)(void *context, const char *values[], uint32_t count)
```

**描述**

端云数据更改事件的回调函数。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| void \*context | 表示数据观察者的上下文。 |
| const char \*values[] | 表示更改的端云帐户。 |
| uint32\_t count | 表示更改的端云帐户数量。 |

### Rdb\_DetailsObserver()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*Rdb_DetailsObserver)(void *context, const Rdb_ChangeInfo **changeInfo, uint32_t count)
```

**描述**

端云数据更改事件的细节的回调函数。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| void \*context | 表示数据观察者的上下文。 |
| const [Rdb\_ChangeInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-changeinfo) \*\*changeInfo | 表示已更改表的信息[Rdb\_ChangeInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-changeinfo)。 |
| uint32\_t count | 表示更改的表的数量。 |

### OH\_Rdb\_Subscribe()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_Subscribe(OH_Rdb_Store *store, Rdb_SubscribeType type, const Rdb_DataObserver *observer)
```

**描述**

为数据库注册观察者。当分布式数据库或本地数据库中的数据发生更改时，将调用回调。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| [Rdb\_SubscribeType](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_subscribetype) type | 表示在[Rdb\_SubscribeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_subscribetype)中定义的订阅类型。如果其值为RDB\_SUBSCRIBE\_TYPE\_LOCAL\_DETAILS，则在本地数据库中的数据更改时调用回调。 |
| const [Rdb\_DataObserver](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-dataobserver) \*observer | 数据库中更改事件的观察者[Rdb\_DataObserver](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-dataobserver)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_Unsubscribe()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_Unsubscribe(OH_Rdb_Store *store, Rdb_SubscribeType type, const Rdb_DataObserver *observer)
```

**描述**

从数据库中删除指定类型的指定观察者。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针 |
| [Rdb\_SubscribeType](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_subscribetype) type | 表示在[Rdb\_SubscribeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_subscribetype)中定义的订阅类型。 |
| const [Rdb\_DataObserver](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-dataobserver) \*observer | 数据库中更改事件的观察者[Rdb\_DataObserver](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-dataobserver)。如果这是nullptr，表示删除该类型的所有观察者。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_GetTableDetails()

PhonePC/2in1TabletTVWearable



```
1. Rdb_TableDetails *OH_Rdb_GetTableDetails(Rdb_ProgressDetails *progress, int32_t version)
```

**描述**

从端云同步任务的统计信息中获取数据库表的统计信息。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Rdb\_ProgressDetails](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-progressdetails) \*progress | 指向[Rdb\_ProgressDetails](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-progressdetails)实例的指针。 |
| int32\_t version | 表示当前[Rdb\_ProgressDetails](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-progressdetails)的版本。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Rdb\_TableDetails](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-tabledetails) | 如果操作成功，会返回一个[Rdb\_TableDetails](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-tabledetails)结构体的指针，否则返回NULL。 |

**参考：**

Rdb\_TableDetails

### Rdb\_ProgressCallback()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*Rdb_ProgressCallback)(void *context, Rdb_ProgressDetails *progressDetails)
```

**描述**

端云同步进度的回调函数。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| void \*context | 回调数据的上下文。 |
| [Rdb\_ProgressDetails](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-progressdetails) \*progressDetails | 端云同步进度的详细信息。 |

### Rdb\_SyncCallback()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*Rdb_SyncCallback)(Rdb_ProgressDetails *progressDetails)
```

**描述**

数据库端云同步的回调函数。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Rdb\_ProgressDetails](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-progressdetails) \*progressDetails | 数据库端云同步的统计信息。 |

### OH\_Rdb\_CloudSync()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_CloudSync(OH_Rdb_Store *store, Rdb_SyncMode mode, const char *tables[], uint32_t count,const Rdb_ProgressObserver *observer)
```

**描述**

进行端云同步。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| [Rdb\_SyncMode](/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_syncmode) mode | 表示同步过程的类型[Rdb\_SyncMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_syncmode). |
| const char \*tables[] | 表示需要同步的表名。 |
| uint32\_t count | 同步的表的数量，如果传入的值为0，同步数据库的所有表。 |
| const [Rdb\_ProgressObserver](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-progressobserver) \*observer | 端云同步进度的观察者[Rdb\_ProgressObserver](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-progressobserver)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_SubscribeAutoSyncProgress()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SubscribeAutoSyncProgress(OH_Rdb_Store *store, const Rdb_ProgressObserver *observer)
```

**描述**

订阅RDB存储的自动同步进度。

当收到自动同步进度的通知时，将调用回调。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向目标[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const [Rdb\_ProgressObserver](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-progressobserver) \*observer | 用于自动同步进度的观察者[Rdb\_ProgressObserver](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-progressobserver)。表示调用返回自动同步进度的回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_UnsubscribeAutoSyncProgress()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_UnsubscribeAutoSyncProgress(OH_Rdb_Store *store, const Rdb_ProgressObserver *observer)
```

**描述**

取消订阅RDB存储的自动同步进程。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向目标[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const [Rdb\_ProgressObserver](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-progressobserver) \*observer | 表示自动同步进度的观察者[Rdb\_ProgressObserver](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-rdb-progressobserver)。如果是空指针，则自动同步进程的所有回调都将被取消注册。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回操作是否成功，出错时返回对应的错误码。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_LockRow()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_LockRow(OH_Rdb_Store *store, OH_Predicates *predicates)
```

**描述**

根据指定的条件锁定数据库中的数据，锁定数据不执行端云同步。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) \*predicates | 指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例的指针，指定锁定条件。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回锁定结果。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_UnlockRow()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_UnlockRow(OH_Rdb_Store *store, OH_Predicates *predicates)
```

**描述**

根据指定的条件锁解锁数据库中的数据。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) \*predicates | 指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例的指针，指定解锁条件。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回解锁结果。  RDB\_OK表示成功。  RDB\_E\_INVALID\_ARGS表示无效参数。 |

### OH\_Rdb\_QueryLockedRow()

PhonePC/2in1TabletTVWearable



```
1. OH_Cursor *OH_Rdb_QueryLockedRow(OH_Rdb_Store *store, OH_Predicates *predicates, const char *const *columnNames, int length)
```

**描述**

根据指定条件查询数据库中锁定的数据。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) \*predicates | 指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例的指针，指定查询条件。 |
| const char \*const \*columnNames | 表示要查询的列。如果值为空，则查询应用于所有列。 |
| int length | 该参数为输入参数，表示开发者传入的columnNames数组的长度。若length大于columnNames数组的实际长度，则会访问越界。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Cursor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor) | 如果查询成功则返回一个指向[OH\_Cursor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor)结构体实例的指针，否则返回NULL。 |

### OH\_Rdb\_CreateTransaction()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_CreateTransaction(OH_Rdb_Store *store, const OH_RDB_TransOptions *options, OH_Rdb_Transaction **trans)
```

**描述**

创建一个事务对象。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const [OH\_RDB\_TransOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-transoptions) \*options | 指向[OH\_RDB\_TransOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-transoptions)实例的指针。 |
| [OH\_Rdb\_Transaction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-transaction) \*\*trans | 输出参数，表示执行成功时指向[OH\_Rdb\_Transaction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-transaction)实例的指针。否则返回nullptr。  使用完成后，必须通过[OH\_RdbTrans\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-rdb-transaction-h#oh_rdbtrans_destroy)接口释放内存。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示成功。  返回RDB\_E\_ERROR表示数据库常见错误。  返回RDB\_E\_INVALID\_ARGS表示无效参数。  返回RDB\_E\_ALREADY\_CLOSED表示数据库已关闭。  返回RDB\_E\_DATABASE\_BUSY表示数据库无响应。  返回RDB\_E\_SQLITE\_FULL表示SQLite错误: 数据库已满。  返回RDB\_E\_SQLITE\_CORRUPT表示数据库已损坏。  返回RDB\_E\_SQLITE\_PERM表示SQLite错误: 访问权限被拒绝。  返回RDB\_E\_SQLITE\_BUSY表示SQLite错误: 数据库文件被锁定。  返回RDB\_E\_SQLITE\_NOMEM表示SQLite错误: 数据库内存不足。  返回RDB\_E\_SQLITE\_IOERR表示SQLite错误: 磁盘I/O错误。  返回RDB\_E\_SQLITE\_CANT\_OPEN表示SQLite错误: 无法打开数据库文件。 |

### OH\_Rdb\_Attach()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_Attach(OH_Rdb_Store *store, const OH_Rdb_ConfigV2 *config, const char *attachName, int64_t waitTime,size_t *attachedNumber)
```

**描述**

将数据库文件附加到当前连接的数据库。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向与此RDB存储相关的数据库配置[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)的指针。 |
| const char \*attachName | 表示数据库的别名。 |
| int64\_t waitTime | 表示附加数据库的最大允许时间，范围为1到300，单位为秒。 |
| size\_t \*attachedNumber | 表示已附加的数据库数量，作为输出参数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_E\_ERROR 表示数据库常见错误。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。  返回RDB\_E\_ALREADY\_CLOSED表示数据库已关闭。  返回RDB\_E\_NOT\_SUPPORTED表示不支持的操作。  返回RDB\_E\_DATABASE\_BUSY表示数据库无响应。  返回RDB\_E\_SQLITE\_FULL表示SQLite错误：数据库已满。  返回RDB\_E\_SQLITE\_CORRUPT表示数据库已损坏。  返回RDB\_E\_SQLITE\_PERM表示SQLite错误：访问权限被拒绝。  返回RDB\_E\_SQLITE\_BUSY表示SQLite错误：数据库文件被锁定。  返回RDB\_E\_SQLITE\_LOCKED表示SQLite错误：数据库中的表被锁定。  返回RDB\_E\_SQLITE\_NOMEM表示SQLite错误：数据库内存不足。  返回RDB\_E\_SQLITE\_READONLY表示SQLite错误：尝试写入只读数据库。  返回RDB\_E\_SQLITE\_IOERR表示SQLite错误：磁盘I/O错误。  返回RDB\_E\_SQLITE\_TOO\_BIG表示SQLite错误：TEXT或BLOB超出大小限制。  返回RDB\_E\_SQLITE\_MISMATCH表示SQLite错误：数据类型不匹配。  返回RDB\_E\_SQLITE\_CONSTRAINT表示SQLite错误：违反约束导致操作中止。 |

### OH\_Rdb\_Detach()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_Detach(OH_Rdb_Store *store, const char *attachName, int64_t waitTime, size_t *attachedNumber)
```

**描述**

从当前数据库中分离指定的数据库。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*attachName | 表示数据库的别名。 |
| int64\_t waitTime | 表示分离数据库的最大允许时间，范围为1到300，单位为秒。 |
| size\_t \*attachedNumber | 表示已附加的数据库数量，作为输出参数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_E\_ERROR 表示数据库常见错误。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。  返回RDB\_E\_ALREADY\_CLOSED表示数据库已关闭。  返回RDB\_E\_NOT\_SUPPORTED表示不支持的操作。  返回RDB\_E\_DATABASE\_BUSY表示数据库无响应。  返回RDB\_E\_SQLITE\_FULL表示SQLite错误：数据库已满。  返回RDB\_E\_SQLITE\_CORRUPT表示数据库已损坏。  返回RDB\_E\_SQLITE\_PERM表示SQLite错误：访问权限被拒绝。  返回RDB\_E\_SQLITE\_BUSY表示SQLite错误：数据库文件被锁定。  返回RDB\_E\_SQLITE\_LOCKED表示SQLite错误：数据库中的表被锁定。  返回RDB\_E\_SQLITE\_NOMEM表示SQLite错误：数据库内存不足。  返回RDB\_E\_SQLITE\_READONLY表示SQLite错误：尝试写入只读数据库。  返回RDB\_E\_SQLITE\_IOERR表示SQLite错误：磁盘I/O错误。  返回RDB\_E\_SQLITE\_TOO\_BIG表示SQLite错误：TEXT或BLOB超出大小限制。  返回RDB\_E\_SQLITE\_MISMATCH表示SQLite错误：数据类型不匹配。  返回RDB\_E\_SQLITE\_CONSTRAINT表示SQLite错误：违反约束导致操作中止。 |

### OH\_Rdb\_SetLocale()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_SetLocale(OH_Rdb_Store *store, const char *locale)
```

**描述**

支持不同语言的排序规则。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*locale | 与语言相关的区域设置，例如 zh。该值符合 ISO 639 标准。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_ERR表示函数执行异常。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。  返回RDB\_E\_ALREADY\_CLOSED表示数据库已关闭。  返回RDB\_E\_SQLITE\_BUSY表示SQLite错误：数据库文件被锁定。  返回RDB\_E\_SQLITE\_NOMEM表示SQLite错误：数据库内存不足。 |

### OH\_Rdb\_RekeyEx()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_RekeyEx(OH_Rdb_Store *store, OH_Rdb_CryptoParam *param)
```

**描述**

更改加密数据库密钥。

不支持对非WAL模式的数据库进行密钥更新。

手动更新时需要独占访问数据库，此时若存在任何未释放的结果集、事务或其他进程打开的数据库均会导致更新失败。

支持加密数据库的参数更新，以及加密数据库与非加密数据库之间的相互转换。

数据库越大，执行更新所需的时间越长。

加密参数变更需谨慎，调用OH\_Rdb\_CreateOrOpen时需要传入正确的加密参数，否则可能打开数据库失败。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| [OH\_Rdb\_CryptoParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-cryptoparam) \*param | 指向[OH\_Rdb\_CryptoParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-cryptoparam)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_E\_ERROR 表示数据库常见错误。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。  返回RDB\_E\_ALREADY\_CLOSED表示数据库已关闭。  返回RDB\_E\_SQLITE\_CORRUPT表示数据库已损坏。  返回RDB\_E\_SQLITE\_PERM表示SQLite错误：访问权限被拒绝。  返回RDB\_E\_SQLITE\_BUSY表示SQLite错误：数据库文件被锁定。  返回RDB\_E\_SQLITE\_NOMEM表示SQLite错误：数据库内存不足。  返回RDB\_E\_SQLITE\_READONLY表示SQLite错误：尝试写入只读数据库。  返回RDB\_E\_SQLITE\_IOERR表示SQLite错误：磁盘I/O错误。  返回RDB\_E\_SQLITE\_FULL表示SQLite错误：数据库已满。 |

### Rdb\_CorruptedHandler()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*Rdb_CorruptedHandler)(void *context, OH_Rdb_ConfigV2 *config, OH_Rdb_Store *store)
```

**描述**

数据库异常处理的回调函数。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| void \*context | 表示数据异常处理的上下文，生命周期由业务自身管理。 |
| [OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象的指针，即与此RDB存储相关的数据库配置，不可在回调函数外部使用。 |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针，该指针由系统产生，回调函数结束后即刻释放，不可在回调函数外部使用。 |

### OH\_Rdb\_RegisterCorruptedHandler()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_RegisterCorruptedHandler(const OH_Rdb_ConfigV2 *config, void *context, const Rdb_CorruptedHandler handler)
```

**描述**

注册数据库异常处理。当数据库发生异常时，将调用异常处理的回调函数。

异常处理逻辑为用户自定义，回调时触发的业务需要用户自行保障。

每个路径只允许注册一次。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象的指针，即与此RDB存储相关的数据库配置。 |
| void \*context | 表示数据异常处理的上下文。 |
| [const Rdb\_CorruptedHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_corruptedhandler) handler | 数据库异常处理的回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。  返回RDB\_E\_SUB\_LIMIT\_REACHED表示注册数量超过限制。 |

### OH\_Rdb\_UnregisterCorruptedHandler()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_UnregisterCorruptedHandler(const OH_Rdb_ConfigV2 *config, void *context, const Rdb_CorruptedHandler handler)
```

**描述**

取消注册的数据库异常处理的回调函数。

handler和context必须要和订阅时保持一致，否则取消失败。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2) \*config | 指向[OH\_Rdb\_ConfigV2](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-configv2)对象的指针，即与此RDB存储相关的数据库配置。 |
| void \*context | 表示数据异常处理的上下文。 |
| [const Rdb\_CorruptedHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-h#rdb_corruptedhandler) handler | 数据库异常处理的回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。 |

### OH\_Rdb\_QueryWithoutRowCount()

PhonePC/2in1TabletTVWearable



```
1. OH_Cursor *OH_Rdb_QueryWithoutRowCount(OH_Rdb_Store *store, OH_Predicates *predicates, const char * const columns[], int length)
```

**描述**

根据指定条件查询数据库中的数据，不计算行数。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) \*predicates | 指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例的指针，指定查询条件。 |
| const char \* const columns[] | 要查询的列。如果值为空，则查询所有列。 |
| int length | 该参数为输入参数，表示开发者传入的columns数组的长度。若length大于columns数组的实际长度，则会访问越界。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Cursor \*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor) | 如果查询成功则返回一个指向[OH\_Cursor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor)结构体实例的指针。如果获取store失败或结果集为空，则返回nullptr。 |

### OH\_Rdb\_QuerySqlWithoutRowCount()

PhonePC/2in1TabletTVWearable



```
1. OH_Cursor *OH_Rdb_QuerySqlWithoutRowCount(OH_Rdb_Store *store, const char *sql, const OH_Data_Values *args)
```

**描述**

执行有返回值的SQL语句，不计算行数，支持向量数据库。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*sql | 要执行的SQL语句。 |
| [const OH\_Data\_Values](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-data-values) \*args | 指向[OH\_Data\_Values](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-data-values)实例的指针。SQL语句完整时，args可填写为nullptr。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Cursor \*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor) | 如果查询成功则返回一个指向[OH\_Cursor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-cursor)结构体实例的指针。如果SQL语句无效或内存分配失败，则返回nullptr。 |

### OH\_Rdb\_BatchInsertWithReturning()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_BatchInsertWithReturning(OH_Rdb_Store *store, const char *table, const OH_Data_VBuckets *rows, Rdb_ConflictResolution resolution, OH_RDB_ReturningContext *context)
```

**描述**

将批量数据插入目标表，并将变更信息输出到上下文中。

一次最多可以插入32766个参数。如果参数数量超过上限，则返回错误代码RDB\_E\_INVALID\_ARGS。

参数数量计算方式为插入数据条数乘以插入数据时所有字段的并集大小。

例如：插入数据的所有字段的并集大小为10则最多可以插入3276条数据（3276\*10=32760）。

请确保在调用接口时遵守此限制，以避免因参数数量过多而导致错误。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| const char \*table | 要插入的目标表名。 |
| [const OH\_Data\_VBuckets](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-data-vbuckets) \*rows | 要插入到表中的行数据。 |
| [Rdb\_ConflictResolution](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-rdb-types-h#rdb_conflictresolution) resolution | 发生冲突时的解决策略Rdb\_ConflictResolution，不建议使用RDB\_CONFLICT\_FAIL，因为失败时会抛异常，  无法正常获取实际的变更数据。 |
| [OH\_RDB\_ReturningContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-returningcontext) \*context | 指向[OH\_RDB\_ReturningContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-returningcontext)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。  返回RDB\_E\_WAL\_SIZE\_OVER\_LIMIT表示WAL文件大小超过默认限制。  返回RDB\_E\_NOT\_SUPPORTED表示不支持的操作。  返回RDB\_E\_DATABASE\_BUSY表示数据库忙。  返回RDB\_E\_SQLITE\_FULL表示SQLite错误：数据库已满。  返回RDB\_E\_SQLITE\_CORRUPT表示数据库损坏。  返回RDB\_E\_SQLITE\_BUSY表示SQLite错误：数据库文件被锁定。  返回RDB\_E\_SQLITE\_LOCKED表示SQLite错误：数据库中的表被锁定。  返回RDB\_E\_SQLITE\_READONLY表示SQLite错误：尝试写入只读数据库。  返回RDB\_E\_SQLITE\_IOERR表示SQLite错误：发生某种磁盘I/O错误。  返回RDB\_E\_SQLITE\_TOO\_BIG表示SQLite错误：TEXT或BLOB超出大小限制。  返回RDB\_E\_SQLITE\_MISMATCH表示SQLite错误：数据类型不匹配。  返回RDB\_E\_SQLITE\_CONSTRAINT表示SQLite错误：由于违反约束而中止。  返回RDB\_E\_SQLITE\_ERROR表示SQLite错误。可能原因：语法错误，例如表或列不存在。  具体错误码可参考[OH\_Rdb\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-error-code-h#oh_rdb_errcode)。 |

### OH\_Rdb\_UpdateWithReturning()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_UpdateWithReturning(OH_Rdb_Store *store, OH_VBucket *row, OH_Predicates *predicates, Rdb_ConflictResolution resolution, OH_RDB_ReturningContext *context)
```

**描述**

根据指定条件更新数据库中的数据并输出更改信息到上下文。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| [OH\_VBucket](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-vbucket) \*row | 要更新到表中的行数据。 |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) \*predicates | 指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例的指针。 |
| [Rdb\_ConflictResolution](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-rdb-types-h#rdb_conflictresolution) resolution | 发生冲突时的解决策略Rdb\_ConflictResolution，不建议使用RDB\_CONFLICT\_FAIL，因为失败时会抛异常，  无法正常获取实际的变更数据。 |
| [OH\_RDB\_ReturningContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-returningcontext) \*context | 指向[OH\_RDB\_ReturningContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-returningcontext)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。  返回RDB\_E\_WAL\_SIZE\_OVER\_LIMIT表示WAL文件大小超过默认限制。  返回RDB\_E\_NOT\_SUPPORTED表示不支持的操作。  返回RDB\_E\_EMPTY\_VALUES\_BUCKET表示值桶为空。  返回RDB\_E\_DATABASE\_BUSY表示数据库忙。  返回RDB\_E\_SQLITE\_FULL表示SQLite错误：数据库已满。  返回RDB\_E\_SQLITE\_CORRUPT表示数据库损坏。  返回RDB\_E\_SQLITE\_BUSY表示SQLite错误：数据库文件被锁定。  返回RDB\_E\_SQLITE\_LOCKED表示SQLite错误：数据库中的表被锁定。  返回RDB\_E\_SQLITE\_READONLY表示SQLite错误：尝试写入只读数据库。  返回RDB\_E\_SQLITE\_IOERR表示SQLite错误：发生某种磁盘I/O错误。  返回RDB\_E\_SQLITE\_TOO\_BIG表示SQLite错误：TEXT或BLOB超出大小限制。  返回RDB\_E\_SQLITE\_MISMATCH表示SQLite错误：数据类型不匹配。  返回RDB\_E\_SQLITE\_CONSTRAINT表示SQLite错误：由于违反约束而中止。  返回RDB\_E\_SQLITE\_ERROR表示SQLite错误。可能原因：语法错误，例如表或列不存在。  具体错误码可参考[OH\_Rdb\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-error-code-h#oh_rdb_errcode)。 |

### OH\_Rdb\_DeleteWithReturning()

PhonePC/2in1TabletTVWearable



```
1. int OH_Rdb_DeleteWithReturning(OH_Rdb_Store *store, OH_Predicates *predicates, OH_RDB_ReturningContext *context)
```

**描述**

根据指定条件从数据库中删除数据并输出更改信息到上下文。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store) \*store | 指向[OH\_Rdb\_Store](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-store)实例的指针。 |
| [OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates) \*predicates | 指向[OH\_Predicates](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-predicates)实例的指针。 |
| [OH\_RDB\_ReturningContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-returningcontext) \*context | 指向[OH\_RDB\_ReturningContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rdb-oh-rdb-returningcontext)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。  返回RDB\_OK表示执行成功。  返回RDB\_E\_INVALID\_ARGS表示输入参数无效。  返回RDB\_E\_WAL\_SIZE\_OVER\_LIMIT表示WAL文件大小超过默认限制。  返回RDB\_E\_NOT\_SUPPORTED表示不支持的操作。  返回RDB\_E\_DATABASE\_BUSY表示数据库忙。  返回RDB\_E\_SQLITE\_FULL表示SQLite错误：数据库已满。  返回RDB\_E\_SQLITE\_CORRUPT表示数据库损坏。  返回RDB\_E\_SQLITE\_BUSY表示SQLite错误：数据库文件被锁定。  返回RDB\_E\_SQLITE\_LOCKED表示SQLite错误：数据库中的表被锁定。  返回RDB\_E\_SQLITE\_READONLY表示SQLite错误：尝试写入只读数据库。  返回RDB\_E\_SQLITE\_IOERR表示SQLite错误：发生某种磁盘I/O错误。  返回RDB\_E\_SQLITE\_TOO\_BIG表示SQLite错误：TEXT或BLOB超出大小限制。  返回RDB\_E\_SQLITE\_MISMATCH表示SQLite错误：数据类型不匹配。  返回RDB\_E\_SQLITE\_ERROR表示SQLite错误。可能原因：语法错误，例如表或列不存在。  具体错误码可参考[OH\_Rdb\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-relational-store-error-code-h#oh_rdb_errcode)。 |