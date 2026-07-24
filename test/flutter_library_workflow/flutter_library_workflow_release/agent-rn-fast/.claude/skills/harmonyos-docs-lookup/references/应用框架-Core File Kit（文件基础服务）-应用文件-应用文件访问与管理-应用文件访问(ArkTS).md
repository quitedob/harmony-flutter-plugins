应用需要对应用文件目录下的应用文件进行查看、创建、读写、删除、移动、复制、获取属性等访问操作，下文介绍具体方法。

## 接口说明

开发者通过基础文件操作接口（[ohos.file.fs](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-file-fs)）实现应用文件访问能力，主要功能如下表所示。

**表1** 基础文件操作接口功能，其中“√”表示支持，“-”表示不区分同步和异步。

展开

| 接口名 | 功能 | 接口类型 | 支持同步 | 支持异步 |
| --- | --- | --- | --- | --- |
| access | 检查文件是否存在 | 方法 | √ | √ |
| close | 关闭文件 | 方法 | √ | √ |
| copyFile | 复制文件 | 方法 | √ | √ |
| createStream | 基于文件路径打开文件流 | 方法 | √ | √ |
| listFile | 列出文件夹下所有文件名 | 方法 | √ | √ |
| mkdir | 创建目录 | 方法 | √ | √ |
| moveFile | 移动文件 | 方法 | √ | √ |
| open | 打开文件 | 方法 | √ | √ |
| read | 从文件读取数据 | 方法 | √ | √ |
| rename | 重命名文件或文件夹 | 方法 | √ | √ |
| rmdir | 删除整个目录 | 方法 | √ | √ |
| stat | 获取文件详细属性信息 | 方法 | √ | √ |
| unlink | 删除单个文件 | 方法 | √ | √ |
| write | 将数据写入文件 | 方法 | √ | √ |
| Stream.close | 关闭文件流 | 方法 | √ | √ |
| Stream.flush | 刷新文件流 | 方法 | √ | √ |
| Stream.write | 将数据写入流文件 | 方法 | √ | √ |
| Stream.read | 从流文件读取数据 | 方法 | √ | √ |
| File.fd | 获取文件描述符 | 属性 | - | - |
| OpenMode | 设置文件打开标签 | 属性 | - | - |
| Filter | 设置文件过滤配置项 | 类型 | - | - |

注意

使用基础文件操作接口时，耗时较长的操作，例如：read、write等，建议使用异步接口，避免应用崩溃。

## 开发示例

在对应用文件开始访问前，开发者需要[获取应用文件路径](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-context-stage#获取应用文件路径)。以从UIAbilityContext获取HAP级别的文件路径为例进行说明，UIAbilityContext的获取方式请参见[获取UIAbility的上下文信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uiability-usage#获取uiability的上下文信息)。

下面介绍几种常用操作示例。

### 新建并读写一个文件

以下示例代码演示了如何新建一个文件并对其读写。

收起

自动换行

深色代码主题

复制

```
1. // pages/xxx.ets
2. import { fileIo as fs, ReadOptions } from '@kit.CoreFileKit';
3. import { common } from '@kit.AbilityKit';
4. import { buffer } from '@kit.ArkTS';

6. // 请在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext
7. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
```

收起

自动换行

深色代码主题

复制

```
1. function createFile(context: common.UIAbilityContext): void {
2. let filesDir = context.filesDir;
3. // 文件不存在时创建并打开文件，文件存在时打开文件
4. let file = fs.openSync(filesDir + '/test.txt', fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
5. // 写入一段内容至文件
6. let writeLen = fs.writeSync(file.fd, 'Try to write str.');
7. console.info('The length of str is: ' + writeLen);
8. // 创建一个大小为1024字节的ArrayBuffer对象，用于存储从文件中读取的数据
9. let arrayBuffer = new ArrayBuffer(1024);
10. // 设置读取的偏移量和长度
11. let readOptions: ReadOptions = {
12. offset: 0,
13. length: arrayBuffer.byteLength
14. };
15. // 读取文件内容到ArrayBuffer对象中，并返回实际读取的字节数
16. let readLen = fs.readSync(file.fd, arrayBuffer, readOptions);
17. // 将ArrayBuffer对象转换为Buffer对象，并转换为字符串输出
18. let buf = buffer.from(arrayBuffer, 0, readLen);
19. console.info('the content of file: ' + buf.toString());
20. // 关闭文件
21. fs.closeSync(file);
22. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/CoreFile/FileApiFileSample/entry/src/main/ets/pages/Index.ets#L21-L55)

### 读取文件内容并写入到另一个文件

以下示例代码演示了如何从一个文件读写内容到另一个文件。

收起

自动换行

深色代码主题

复制

```
1. // pages/xxx.ets
2. import { fileIo as fs, ReadOptions, WriteOptions } from '@kit.CoreFileKit';
3. import { common } from '@kit.AbilityKit';

5. // 请在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext
6. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
```

收起

自动换行

深色代码主题

复制

```
1. function readWriteFile(context: common.UIAbilityContext): void {
2. let filesDir = context.filesDir;
3. // 打开文件
4. let srcFile = fs.openSync(filesDir + '/test.txt', fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
5. let destFile = fs.openSync(filesDir + '/destFile.txt', fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
6. // 读取源文件内容并写入至目的文件
7. let bufSize = 4096;
8. let readSize = 0;
9. let buf = new ArrayBuffer(bufSize);
10. let readOptions: ReadOptions = {
11. offset: readSize,
12. length: bufSize
13. };
14. let readLen = fs.readSync(srcFile.fd, buf, readOptions);
15. while (readLen > 0) {
16. readSize += readLen;
17. let writeOptions: WriteOptions = {
18. length: readLen
19. };
20. fs.writeSync(destFile.fd, buf, writeOptions);
21. readOptions.offset = readSize;
22. readLen = fs.readSync(srcFile.fd, buf, readOptions);
23. }
24. // 关闭文件
25. fs.closeSync(srcFile);
26. fs.closeSync(destFile);
27. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/CoreFile/FileApiFileSample/entry/src/main/ets/pages/Index.ets#L57-L105)

说明

使用读写接口时，需注意可选项参数offset的设置。对于已存在且读写过的文件，文件偏移指针默认在上次读写操作的终止位置。

### 以流的形式读写文件

以下示例代码演示了如何使用流接口读取test.txt的文件内容并写入到destFile.txt文件中。

收起

自动换行

深色代码主题

复制

```
1. // pages/xxx.ets
2. import { fileIo as fs, ReadOptions } from '@kit.CoreFileKit';
3. import { common } from '@kit.AbilityKit';

5. // 请在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext
6. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
```

收起

自动换行

深色代码主题

复制

```
1. async function readWriteFileWithStream(context: common.UIAbilityContext): Promise<void> {
2. let filesDir = context.filesDir;
3. // 创建并打开输入文件流
4. let inputStream = fs.createStreamSync(filesDir + '/test.txt', 'r+');
5. // 创建并打开输出文件流
6. let outputStream = fs.createStreamSync(filesDir + '/destFile.txt', 'w+');

8. let bufSize = 4096;
9. let readSize = 0;
10. let buf = new ArrayBuffer(bufSize);
11. let readOptions: ReadOptions = {
12. offset: readSize,
13. length: bufSize
14. };
15. // 以流的形式读取源文件内容并写入到目标文件
16. let readLen = await inputStream.read(buf, readOptions);
17. readSize += readLen;
18. while (readLen > 0) {
19. const writeBuf = readLen < bufSize ? buf.slice(0, readLen) : buf;
20. await outputStream.write(writeBuf);
21. readOptions.offset = readSize;
22. readLen = await inputStream.read(buf, readOptions);
23. readSize += readLen;
24. }
25. // 关闭文件流
26. inputStream.closeSync();
27. outputStream.closeSync();
28. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/CoreFile/FileApiFileSample/entry/src/main/ets/pages/Index.ets#L107-L152)

说明

使用流接口时，需注意流的及时关闭。同时流的异步接口应严格遵循异步接口使用规范，避免同步、异步接口混用。流接口不支持并发读写。

### 查看文件列表

以下示例代码演示了如何查看文件列表。

收起

自动换行

深色代码主题

复制

```
1. import { fileIo as fs, Filter, ListFileOptions } from '@kit.CoreFileKit';
2. import { common } from '@kit.AbilityKit';

4. // 请在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext
5. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
```

收起

自动换行

深色代码主题

复制

```
1. function getListFile(context: common.UIAbilityContext): void {
2. let listFileOption: ListFileOptions = {
3. recursion: false,
4. listNum: 0,
5. filter: {
6. suffix: ['.png', '.jpg', '.txt'],
7. displayName: ['test*'],
8. fileSizeOver: 0,
9. lastModifiedAfter: new Date(0).getTime()
10. }
11. };
12. let filesDir = context.filesDir;
13. let files = fs.listFileSync(filesDir, listFileOption);
14. for (let i = 0; i < files.length; i++) {
15. console.info(`The name of file: ${files[i]}`);
16. }
17. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/CoreFile/FileApiFileSample/entry/src/main/ets/pages/Index.ets#L155-L178)

### 使用文件流

以下示例代码演示了如何使用文件可读流，文件可写流。

收起

自动换行

深色代码主题

复制

```
1. // pages/xxx.ets
2. import { fileIo as fs } from '@kit.CoreFileKit';
3. import { common } from '@kit.AbilityKit';

5. // 请在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext
6. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
```

收起

自动换行

深色代码主题

复制

```
1. function copyFileWithReadable(context: common.UIAbilityContext): void {
2. let filesDir = context.filesDir;
3. // 创建文件可读流
4. const rs = fs.createReadStream(`${filesDir}/test.txt`);
5. // 创建文件可写流
6. const ws = fs.createWriteStream(`${filesDir}/destFile.txt`);
7. // 暂停模式拷贝文件。在拷贝数据时，将原始数据暂停，然后将数据复制到另一个位置，适用于对数据完整性和一致性要求较高的场景
8. rs.on('readable', () => {
9. const data = rs.read();
10. if (!data) {
11. return;
12. }
13. ws.write(data);
14. });
15. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/CoreFile/FileApiFileSample/entry/src/main/ets/pages/Index.ets#L180-L211)

收起

自动换行

深色代码主题

复制

```
1. function copyFileWithData(context: common.UIAbilityContext): void {
2. let filesDir = context.filesDir;
3. // 创建文件可读流
4. const rs = fs.createReadStream(`${filesDir}/test.txt`);
5. // 创建文件可写流
6. const ws = fs.createWriteStream(`${filesDir}/destFile.txt`);
7. // 流动模式拷贝文件。数据的读取和写入是同时进行的，不需要暂停原始数据的访问，适用于对数据实时性要求较高的场景
8. rs.on('data', (emitData) => {
9. const data = emitData?.data;
10. if (!data) {
11. return;
12. }
13. ws.write(data as Uint8Array);
14. });
15. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/CoreFile/FileApiFileSample/entry/src/main/ets/pages/Index.ets#L213-L247)

### 使用文件哈希流

哈希流是一种数据传输和存储技术，可以将任意长度的数据转换为固定长度的哈希值来验证数据的完整性和一致性。以下代码演示了如何使用文件哈希处理接口（[ohos.file.hash](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-file-hash)）来处理文件哈希流。

收起

自动换行

深色代码主题

复制

```
1. // pages/xxx.ets
2. import { fileIo as fs } from '@kit.CoreFileKit';
3. import { hash } from '@kit.CoreFileKit';
4. import { common } from '@kit.AbilityKit';

6. // 获取应用文件路径，请在组件内获取context
7. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
```

收起

自动换行

深色代码主题

复制

```
1. function hashFileWithStream(context: common.UIAbilityContext) {
2. let filesDir = context.filesDir;
3. const filePath = `${filesDir}/test.txt`;
4. // 创建文件可读流
5. const rs = fs.createReadStream(filePath);
6. // 创建哈希流
7. const hs = hash.createHash('sha256');
8. rs.on('data', (emitData) => {
9. const data = emitData?.data;
10. hs.update(new Uint8Array(data?.split('').map((x: string) => x.charCodeAt(0))).buffer);
11. });
12. rs.on('close', async () => {
13. const hashResult = hs.digest();
14. const fileHash = await hash.hash(filePath, 'sha256');
15. console.info(`hashResult: ${hashResult}, fileHash: ${fileHash}`);
16. });
17. }
```

[Index.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/CoreFile/FileApiFileSample/entry/src/main/ets/pages/Index.ets#L249-L271)