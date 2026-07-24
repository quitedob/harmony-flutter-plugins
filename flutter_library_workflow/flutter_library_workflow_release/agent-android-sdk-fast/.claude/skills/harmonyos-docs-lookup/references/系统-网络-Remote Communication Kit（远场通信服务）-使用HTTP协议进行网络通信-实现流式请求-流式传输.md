## 场景介绍

HTTP流式传输（Streaming）允许客户端与服务器之间以流的形式进行数据交互，而无需等待所有数据准备完毕，能显著提升用户体验。流式传输适用于大文件的上传下载、直播、实时数据更新等场景。

## 约束与限制

同步读写流能力支持Phone、2in1、Tablet、Wearable设备。并且从5.1.1(19)开始，新增支持TV设备。

## 基于缓冲区的流式传输

### 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section127952271692)。

展开

| 接口名 | 描述 |
| --- | --- |
| write(buffer: string | ArrayBuffer): void | 将一段数据写入队列当中，框架的IO线程会在合适的时候把该数据发送出去。 |
| read(buffer: ArrayBuffer): Promise<number> | 从文件中读取数据。 |

### 使用示例

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { rcp } from '@kit.RemoteCommunicationKit';
   ```
2. 利用rcp.NetworkInputQueue创建同步写队列对象实现同步写功能。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. export const testNetworkInputQueue = () => {
   2. // 创建同步写队列对象
   3. const networkInputQueue = new rcp.NetworkInputQueue();
   4. // 模拟文件通过同步读写流上传场景，将文件写入到同步写队列 networkInputQueue 中
   5. let counter = 0;
   6. const interval = setInterval(() => {
   7. // 添加数据到同步写队列
   8. networkInputQueue.write('a counter ' + counter++);
   9. console.info(`networkInputQueue write`);
   10. if (counter === 10) {
   11. clearInterval(interval);
   12. // 关闭同步写队列
   13. networkInputQueue.close();
   14. }
   15. }, 1000);
   16. try {
   17. // 创建session
   18. const session = rcp.createSession();
   19. console.info(`Post start.`);
   20. // 发起请求，相关数据在写入队列 networkInputQueue 的同时会同步进行上传
   21. session.post('https://httpbin.org/anything', networkInputQueue).then((response) => {
   22. // 结果状态码
   23. console.info(`Response status code is: ${response.statusCode}`);
   24. if (response && response.statusCode === 200) {
   25. console.info(`Post succeeded! response: ${response.toString()}`);
   26. } else {
   27. console.error(`Post failed.`);
   28. }
   29. session.close();
   30. }).catch((error: Error) => {
   31. console.error(`Post error: ${JSON.stringify(error)}`);
   32. session.close();
   33. });
   34. } catch (error) {
   35. console.error(`create session error: ${JSON.stringify(error)}`);
   36. }
   37. }
   ```
3. 利用rcp.NetworkOutputQueue创建同步读队列对象实现同步读功能。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. export const testNetworkOutputQueue = () => {
   2. // 创建同步读队列对象
   3. const networkOutputQueue = new rcp.NetworkOutputQueue();
   4. // 创建session
   5. try {
   6. const session = rcp.createSession();
   7. // 配置请求流数据size
   8. const numOfChunks = 10;
   9. const chunkLength = 1000;
   10. const totalBytes = numOfChunks * chunkLength;
   11. // 发起请求，响应数据会暂存在同步读队列networkOutputQueue中
   12. session.get('https://httpbin.org/bytes/' + totalBytes.toString(), networkOutputQueue).then((response) => {
   13. if (response && response.statusCode === 200) {
   14. console.info(`get byts succeeded.`);
   15. } else {
   16. console.error(`get byts failed.`);
   17. }
   18. session.close();
   19. }).catch((err: Error) => {
   20. console.error(`get byts error: ${err.message}`);
   21. session.close();
   22. });
   23. // 在需要使用响应数据时，可按需从 `networkOutputQueue` 队列中循环读取，例如每隔 1000 毫秒读取一次，每次读取 1000 个字节的数据
   24. let totalGetLength = 0;
   25. const intervalId = setInterval(() => {
   26. // 读取数据后，开发者需根据具体业务场景进行后续处理
   27. const chunk = networkOutputQueue.read(chunkLength);
   28. totalGetLength += chunk.byteLength;
   29. console.info(`get byts totalGetLength: ${totalGetLength}`);
   30. // 数据读取完成后，清除计时器
   31. if (totalGetLength === totalBytes) {
   32. clearInterval(intervalId);
   33. console.info(`get byts finished.`);
   34. }
   35. }, 1000);
   36. } catch (error) {
   37. console.error(`create session error: ${JSON.stringify(error)}`);
   38. }
   39. }
   ```

## 基于回调函数的流式传输

### 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section187981940151318)。

展开

| 接口名 | 描述 |
| --- | --- |
| uploadFromStream(url: [URLOrString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section320653742718), uploadFrom: [UploadFromStream](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section187981940151318)): Promise<[Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section156381815599)> | 从流中上传。 |
| downloadToStream(url: [URLOrString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section320653742718), downloadTo: [DownloadToStream](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section1790033215431)): Promise<[Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section156381815599)> | 下载到流中。 |

### 使用示例

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { rcp } from '@kit.RemoteCommunicationKit';
   2. import fs from '@ohos.file.fs';
   ```
2. 定义FdReadStream实现rcp.ReadStream接口，从流中读取数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. class FdReadStream implements rcp.ReadStream {
   2. readonly fd: number;

   4. constructor(fd: number) {
   5. this.fd = fd;
   6. }

   8. async read(buffer: ArrayBuffer): Promise<number> {
   9. return fs.read(this.fd, buffer);
   10. }
   11. }
   ```
3. 调用uploadFromStream接口以流的形式上传数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. export function testUploadFromStream(uploadFilePath: string) {
   2. try {
   3. // 创建session
   4. const session = rcp.createSession();
   5. // 根据传入的上传文件的路径打开文件
   6. const file = fs.openSync(uploadFilePath, fs.OpenMode.READ_ONLY);
   7. // 文件读取流
   8. const fileStream = new rcp.UploadFromStream(new FdReadStream(file.fd));
   9. // 以流的形式上传数据
   10. session.uploadFromStream('https://httpbin.org/anything', fileStream).then((resp) => {
   11. console.info(`testUploadFromStream response: ${JSON.stringify(resp)}`);
   12. if (resp && resp.statusCode === 200) {
   13. console.info(`testUploadFromStream succeeded.`);
   14. } else {
   15. console.error(`testUploadFromStream failed.`);
   16. }
   17. // 完成后关闭文件和session
   18. fs.closeSync(file.fd);
   19. session.close();
   20. }).catch((error: Error) => {
   21. console.error(`testUploadFromStream error: ${JSON.stringify(error)}`);
   22. fs.closeSync(file.fd);
   23. session.close();
   24. });
   25. } catch (error) {
   26. console.error(`testUploadFromStream error: ${JSON.stringify(error)}`);
   27. }
   28. }
   ```
4. 定义FdWriteStream实现WriteStream接口，将数据写入流中。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. class FdWriteStream implements rcp.WriteStream {
   2. readonly fd: number;

   4. constructor(fd: number) {
   5. this.fd = fd;
   6. }

   8. async write(buffer: ArrayBuffer): Promise<number | void> {
   9. return fs.write(this.fd, buffer);
   10. }
   11. }
   ```
5. 调用downloadToStream接口，以流的形式下载数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. export function testDownloadToStream(downloadToPath: string) {
   2. try {
   3. // 创建session
   4. const session = rcp.createSession();
   5. // 根据传入的下载文件保存路径打开文件
   6. const file = fs.openSync(downloadToPath, fs.OpenMode.CREATE | fs.OpenMode.WRITE_ONLY);
   7. // 文件写入流
   8. const fileStream = { kind: 'stream', stream: new FdWriteStream(file.fd) } as rcp.DownloadToStream
   9. // 以流的形式下载数据
   10. session.downloadToStream('https://httpbin.org/bytes/', fileStream)
   11. .then((resp) => {
   12. console.info(`testDownloadToStream response: ${JSON.stringify(resp)}`);
   13. if (resp && resp.statusCode === 200) {
   14. console.info(`testDownloadToStream succeeded.`);
   15. } else {
   16. console.error(`testDownloadToStream failed.`);
   17. }
   18. // 完成后关闭文件和session
   19. fs.close(file.fd);
   20. session.close();
   21. })
   22. .catch((error: Error) => {
   23. console.error(`testDownloadToStream error: ${JSON.stringify(error)}`);
   24. fs.close(file.fd);
   25. session.close();
   26. })
   27. } catch (err) {
   28. console.error(`testDownloadToStream error: ${JSON.stringify(err)}`);
   29. }
   30. }
   ```