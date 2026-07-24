## 约束与限制

通过配置Configuration优化传输性能能力支持Phone、2in1、Tablet、Wearable设备。并且从5.1.1(19)开始，新增支持TV设备。

## 请求预处理阶段

* 基于Session抽象的高并发网络框架
* 支持创建多个Session
* 支持请求动态取消
* 支持关闭Session
* Session中的资源互相独立、互不影响
* 应用可以通过使用Session来获取最佳的网络性能体验

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. const session1 = rcp.createSession({
  2. requestConfiguration: {
  3. transfer: {
  4. timeout: {
  5. connectMs: 5000,
  6. transferMs: 5000
  7. }
  8. }
  9. }
  10. });

  12. const request1 = new rcp.Request('https://example.com');
  13. const request2 = new rcp.Request('https://example.com');
  14. session1.fetch(request1).then((response) => {
  15. console.info(`Request1 succeeded, message is ${JSON.stringify(response)}`);
  16. }).catch((err: BusinessError) => {
  17. console.error(`err1: err code is ${err.code}, err message is ${JSON.stringify(err)}`);
  18. });
  19. session1.fetch(request2).then((response) => {
  20. console.info(`Request2 succeeded, message is ${JSON.stringify(response)}`);
  21. session1.close();
  22. }).catch((err: BusinessError) => {
  23. console.error(`err2: err code is ${err.code}, err message is ${JSON.stringify(err)}`);
  24. session1.close();
  25. });
  26. session1.cancel(request1); // 取消request1请求
  ```

## DNS阶段

应用可[定制DNS](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/remote-communication-customdnsconfig#section5676104731714)请求规则，如定制DNS服务器、重写DNS解析函数，从而获取最佳的DNS性能体验。

收起

自动换行

深色代码主题

复制

```
1. // 定制DNS解析函数
2. const session = rcp.createSession();
3. const request = new rcp.Request('https://example.com');
4. request.configuration = {
5. dns: {
6. dnsRules: (host: string, port: number): rcp.IpAddress[] => {
7. if (host === 'example.com') {
8. return ['7.128.8.45', '7.128.8.46'];
9. }
10. return [];
11. }
12. }
13. };
14. session.fetch(request).then((response) => {
15. console.info(`Request succeeded, message is ${JSON.stringify(response)}`);
16. }).catch((err: BusinessError) => {
17. console.error(`err: err code is ${err.code}, err message is ${JSON.stringify(err)}`);
18. });
```

收起

自动换行

深色代码主题

复制

```
1. // 定制DNS服务器
2. const session = rcp.createSession();
3. const request = new rcp.Request('https://example.com');
4. request.configuration = {
5. dns: {
6. dnsRules: [
7. {
8. ip: '7.128.8.45',
9. port: 53,
10. },
11. ]
12. }
13. };
14. session.fetch(request).then((response) => {
15. console.info(`Request succeeded, message is ${JSON.stringify(response)}`);
16. }).catch((err: BusinessError) => {
17. console.error(`err: err code is ${err.code}, err message is ${JSON.stringify(err)}`);
18. });
```

## 连接阶段

根据资源特征动态调整连接池大小

收起

自动换行

深色代码主题

复制

```
1. const session = rcp.createSession({
2. connectionConfiguration: {
3. maxConnectionsPerHost: 16,
4. maxTotalConnections: 1024,
5. }
6. });
7. for (let i = 0; i < 1024; ++i) {
8. session.get('https://example' + i.toString() + '.com/image.png').then((response) => {
9. console.info(`Request succeeded, message is ${JSON.stringify(response)}`);
10. }).catch((err: BusinessError) => {
11. console.error(`err: err code is ${err.code}, err message is ${JSON.stringify(err)}`);
12. });
13. }
```

## HTTP请求阶段

* 支持响应体分段返回，以节省内存
* 支持直接将响应写入文件，以节省内存
* 支持请求体分段上传，以节省内存

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 使用响应体直接写入文件
  2. const session = rcp.createSession();
  3. try {
  4. const response = await session.get('https://example.com/video.mp4', {
  5. kind: 'file',
  6. file: './video.mp4',
  7. });
  8. console.info(`Request succeeded, message is ${JSON.stringify(response)}`);
  9. } catch (err) {
  10. console.error(`err: err code is ${err.code}, err message is ${JSON.stringify(err)}`);
  11. } finally {
  12. session.close();
  13. }
  ```

  收起

  自动换行

  深色代码主题

  复制

  ```
  1. // 分段上传数据
  2. const session = rcp.createSession();
  3. try {
  4. const response = await session.post('https://example.com/video.mp4', (maxSize: number) => {
  5. return new ArrayBuffer(maxSize);
  6. });
  7. console.info(`Request succeeded, message is ${JSON.stringify(response)}`);
  8. } catch (err) {
  9. console.error(`err: err code is ${err.code}, err message is ${JSON.stringify(err)}`);
  10. } finally {
  11. session.close();
  12. }
  ```

## HTTP响应阶段

获取响应各阶段耗时动态判断网络质量，动态调整请求（请求不同质量的资源、降低资源缓存数量）。更详细的示例请移步[HTTP请求过程中各时间点详解](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/remote-communication-tpms#section143821143125014)。

收起

自动换行

深色代码主题

复制

```
1. // 获取各个阶段的耗时信息
2. const session = rcp.createSession();
3. try {
4. const response = await session.get('https://example.com');
5. console.info(response.timeInfo?.nameLookupTimeMs.toString());
6. console.info(response.timeInfo?.connectTimeMs.toString());
7. console.info(response.timeInfo?.tlsHandshakeTimeMs.toString());
8. console.info(response.timeInfo?.preTransferTimeMs.toString());
9. console.info(response.timeInfo?.startTransferTimeMs.toString());
10. console.info(response.timeInfo?.totalTimeMs.toString());
11. console.info(response.timeInfo?.redirectTimeMs.toString());
12. } catch (err) {
13. console.error(`err: err code is ${err.code}, err message is ${JSON.stringify(err)}`);
14. } finally {
15. session.close();
16. }
```