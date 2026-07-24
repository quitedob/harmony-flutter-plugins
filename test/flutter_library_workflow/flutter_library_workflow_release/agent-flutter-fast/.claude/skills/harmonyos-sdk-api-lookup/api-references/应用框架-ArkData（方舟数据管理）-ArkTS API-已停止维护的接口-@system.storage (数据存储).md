说明

* 模块维护策略：

  + 对于Lite Wearable设备类型，该模块长期维护，可正常使用。
  + 对于支持该模块的其他设备类型，该模块从API version 6开始不再维护，可以使用模块[@ohos.data.storage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-data-storage)。在API version 9后，推荐使用新模块[@ohos.data.preferences](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-data-preferences)。
* 本模块首批接口从API version 3开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本模块接口仅可在FA模型下使用。
* 在以下内容中，对于Lite Wearable设备类型，请参考“JS示例”；对于支持该模块的其他设备类型，请参考“ArkTS示例”。

## 导入模块

WearableLite Wearable



```
1. import storage from '@system.storage';
```

## storage.get

WearableLite Wearable

get(options: GetStorageOptions): void

通过索引读取缓存中存储的值。

**系统能力：** SystemCapability.DistributedDataManager.Preferences.Core.Lite

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [GetStorageOptions](/consumer/cn/doc/harmonyos-references/js-apis-system-storage#getstorageoptions) | 是 | 接口配置信息。 |

**示例：**

ArkTS示例：



```
1. export default {
2. storageGet() {
3. storage.get({
4. key: 'storage_key',
5. success: function(data) {
6. console.info('call storage.get success: ' + data);
7. },
8. fail: function(data, code) {
9. console.error('call storage.get fail, code: ' + code + ', data: ' + data);
10. },
11. complete: function() {
12. console.info('call complete');
13. },
14. });
15. }
16. }
```

JS示例：



```
1. <!-- xxx.hml -->
2. <div class="container">
3. <text class="title" style="font-size: {{fontSize}}; color: {{fontColor}};">
4. Get Data
5. </text>
6. <input type="button" value="Get Data" style="width: 240px; height: 50px; margin: 5px;" onclick="storageGet"></input>
7. </div>
```



```
1. /* xxx.css */
2. .container {
3. display: flex;
4. flex-direction: column;
5. align-items: center;
6. left: 0px;
7. top: 0px;
8. width: 454px;
9. height: 454px;
10. }
11. .title {
12. font-size: 100px;
13. text-align: center;
14. width: 200px;
15. height: 100px;
16. }
17. .button {
18. font-size: 30px;
19. text-align: center;
20. width: 200px;
21. height: 100px;
22. }
```



```
1. // xxx.js
2. import storage from '@system.storage';

4. export default {
5. data: {
6. fontSize: '30px',
7. fontColor: '#FF1AFF00',
8. },
9. storageGet() {
10. storage.get({
11. key: 'storage_key',
12. success: function(data) {
13. console.info('call storage.get success: ' + data);
14. },
15. fail: function(data, code) {
16. console.error('call storage.get fail, code: ' + code + ', data: ' + data);
17. }
18. });
19. },
20. }
```

## storage.set

WearableLite Wearable

set(options: SetStorageOptions): void

修改缓存中索引对应的值。

**系统能力：** SystemCapability.DistributedDataManager.Preferences.Core.Lite

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [SetStorageOptions](/consumer/cn/doc/harmonyos-references/js-apis-system-storage#setstorageoptions) | 是 | 接口配置信息。 |

**示例：**

ArkTS示例：



```
1. export default {
2. storageSet() {
3. storage.set({
4. key: 'storage_key',
5. value: 'storage value',
6. success: function() {
7. console.info('call storage.set success.');
8. },
9. fail: function(data, code) {
10. console.error('call storage.set fail, code: ' + code + ', data: ' + data);
11. },
12. });
13. }
14. }
```

JS示例：



```
1. <!-- xxx.hml -->
2. <div class="container">
3. <text class="title" style="font-size: {{fontSize}}; color: {{fontColor}};">
4. Set Data
5. </text>
6. <input type="button" value="Set Data" style="width: 240px; height: 50px; margin: 5px;" onclick="storageSet"></input>
7. </div>
```



```
1. /* xxx.css */
2. .container {
3. display: flex;
4. flex-direction: column;
5. align-items: center;
6. left: 0px;
7. top: 0px;
8. width: 454px;
9. height: 454px;
10. }
11. .title {
12. font-size: 100px;
13. text-align: center;
14. width: 200px;
15. height: 100px;
16. }
17. .button {
18. font-size: 30px;
19. text-align: center;
20. width: 200px;
21. height: 100px;
22. }
```



```
1. // xxx.js
2. import storage from '@system.storage';

4. export default {
5. data: {
6. fontSize: '30px',
7. fontColor: '#FF1AFF00',
8. },
9. storageSet() {
10. storage.set({
11. key: 'storage_key',
12. value: 'test_storage_value',
13. success: function() {
14. console.info('call storage.set success.');
15. },
16. fail: function(data, code) {
17. console.error('call storage.set fail, code: ' + code + ', data: ' + data);
18. },
19. });
20. }
21. }
```

## storage.clear

WearableLite Wearable

clear(options?: ClearStorageOptions): void

清空缓存中存储的键值对。

**系统能力：** SystemCapability.DistributedDataManager.Preferences.Core.Lite

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [ClearStorageOptions](/consumer/cn/doc/harmonyos-references/js-apis-system-storage#clearstorageoptions) | 否 | 接口配置信息。 |

**示例：**

ArkTS示例：



```
1. export default {
2. storageClear() {
3. storage.clear({
4. success: function() {
5. console.info('call storage.clear success.');
6. },
7. fail: function(data, code) {
8. console.error('call storage.clear fail, code: ' + code + ', data: ' + data);
9. },
10. });
11. }
12. }
```

JS示例：



```
1. <!-- xxx.hml -->
2. <div class="container">
3. <text class="title" style="font-size: {{fontSize}}; color: {{fontColor}};">
4. Clear Data
5. </text>
6. <input type="button" value="Clear Data" style="width: 240px; height: 50px; margin: 5px;" onclick="storageClear"></input>
7. </div>
```



```
1. /* xxx.css */
2. .container {
3. display: flex;
4. flex-direction: column;
5. align-items: center;
6. left: 0px;
7. top: 0px;
8. width: 454px;
9. height: 454px;
10. }
11. .title {
12. font-size: 100px;
13. text-align: center;
14. width: 200px;
15. height: 100px;
16. }
17. .button {
18. font-size: 30px;
19. text-align: center;
20. width: 200px;
21. height: 100px;
22. }
```



```
1. // xxx.js
2. import storage from '@system.storage';

4. export default {
5. data: {
6. fontSize: '30px',
7. fontColor: '#FF1AFF00',
8. },
9. storageClear() {
10. storage.clear({
11. success: function() {
12. console.info('call storage.clear success.');
13. },
14. fail: function(data, code) {
15. console.error('call storage.clear fail, code: ' + code + ', data: ' + data);
16. },
17. });
18. }
19. }
```

## storage.get

WearableLite Wearable

get(options: GetStorageOptions): void

## storage.delete

WearableLite Wearable

delete(options: DeleteStorageOptions): void

删除缓存中索引对应的键值对。

**系统能力：** SystemCapability.DistributedDataManager.Preferences.Core.Lite

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [DeleteStorageOptions](/consumer/cn/doc/harmonyos-references/js-apis-system-storage#deletestorageoptions) | 是 | 接口配置信息。 |

**示例：**

ArkTS示例：



```
1. export default {
2. storageDelete() {
3. storage.delete({
4. key: 'Storage1',
5. success: function() {
6. console.info('call storage.delete success.');
7. },
8. fail: function(data, code) {
9. console.error('call storage.delete fail, code: ' + code + ', data: ' + data);
10. },
11. });
12. }
13. }
```

JS示例：



```
1. <!-- xxx.hml -->
2. <div class="container">
3. <text class="title" style="font-size: {{fontSize}}; color: {{fontColor}};">
4. Delete Data
5. </text>
6. <input type="button" value="Delete Data" style="width: 240px; height: 50px; margin: 5px;" onclick="storageDelete"></input>
7. </div>
```



```
1. /* xxx.css */
2. .container {
3. display: flex;
4. flex-direction: column;
5. align-items: center;
6. left: 0px;
7. top: 0px;
8. width: 454px;
9. height: 454px;
10. }
11. .title {
12. font-size: 100px;
13. text-align: center;
14. width: 200px;
15. height: 100px;
16. }
17. .button {
18. font-size: 30px;
19. text-align: center;
20. width: 200px;
21. height: 100px;
22. }
```



```
1. // xxx.js
2. import storage from '@system.storage';

4. export default {
5. data: {
6. fontSize: '30px',
7. fontColor: '#FF1AFF00',
8. },
9. storageDelete() {
10. storage.delete({
11. key: 'storage_key',
12. success: function() {
13. console.info('call storage.delete success.');
14. },
15. fail: function(data, code) {
16. console.error('call storage.delete fail, code: ' + code + ', data: ' + data);
17. },
18. });
19. }
20. }
```

## GetStorageOptions

WearableLite Wearable

**系统能力：** SystemCapability.DistributedDataManager.Preferences.Core.Lite

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| key | string | 是 | 内容索引。 |
| default | string | 否 | key不存在则返回的默认值。 |
| success | (data: any) => void | 否 | 接口调用成功的回调函数，data为返回key对应的value。 |
| fail | (data: string, code: number) => void | 否 | 接口调用失败的回调函数，data为错误信息，code为错误码。 |
| complete | () => void | 否 | 接口调用结束的回调函数。 |

## SetStorageOptions

WearableLite Wearable

**系统能力：** SystemCapability.DistributedDataManager.Preferences.Core.Lite

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| key | string | 是 | 要修改的存储值的索引。 |
| value | string | 是 | 新值。长度需小于128字节。 |
| success | () => void | 否 | 接口调用成功的回调函数。 |
| fail | (data: string, code: number) => void | 否 | 接口调用失败的回调函数，data为错误信息，code为错误码。 |
| complete | () => void | 否 | 接口调用结束的回调函数。 |

## ClearStorageOptions

WearableLite Wearable

**系统能力：** SystemCapability.DistributedDataManager.Preferences.Core.Lite

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| success | () => void | 否 | 接口调用成功的回调函数。 |
| fail | (data: string, code: number) => void | 否 | 接口调用失败的回调函数，data为错误信息，code为错误码。 |
| complete | () => void | 否 | 接口调用结束的回调函数。 |

## DeleteStorageOptions

WearableLite Wearable

**系统能力：** SystemCapability.DistributedDataManager.Preferences.Core.Lite

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| key | string | 是 | 内容索引。 |
| success | () => void | 否 | 接口调用成功的回调函数。 |
| fail | (data: string, code: number) => void | 否 | 接口调用失败的回调函数，data为错误信息，code为错误码。 |
| complete | () => void | 否 | 接口调用结束的回调函数。 |