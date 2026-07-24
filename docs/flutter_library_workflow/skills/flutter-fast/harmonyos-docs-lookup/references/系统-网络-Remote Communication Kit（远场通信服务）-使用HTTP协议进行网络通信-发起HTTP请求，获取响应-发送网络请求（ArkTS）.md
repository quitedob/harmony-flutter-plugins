## 约束与限制

发送网络请求能力支持Phone、2in1、Tablet、Wearable设备。并且从5.1.1(19)开始，新增支持TV设备。

## 如何使用FETCH发起网络请求

发送一个HTTP请求，也可以设置请求头和请求体等参数，并返回来自服务器的HTTP响应。使用Promise异步回调。常用于获取资源，支持流处理和通过拦截器来处理请求和响应。

### 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section20139131372817)。

展开

| 接口名 | 描述 |
| --- | --- |
| fetch(request: [Request](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section10768169134510)): Promise<[Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section156381815599)> | 发送一个HTTP请求，并返回来自服务器的HTTP响应。使用Promise异步回调。 |

### 使用示例

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { rcp } from '@kit.RemoteCommunicationKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 创建Request对象。"https://www.example.com"请根据实际情况替换为想要请求的URL地址。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const kHttpServerAddress = "https://www.example.com/fetch";
   2. const request = new rcp.Request(kHttpServerAddress, 'GET');
   ```
3. 创建会话。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const session = rcp.createSession();
   ```
4. 发起请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. session.fetch(request).then((rep: rcp.Response) => {
   2. console.info(`Response succeeded: ${rep}`);
   3. }).catch((err: BusinessError) => {
   4. // 错误处理，通过catch块，捕获error，并对error进行处理，本示例中会将错误信息展现到打印台上。
   5. console.error(`Response err: Code is ${JSON.stringify(err.code)}, message is ${JSON.stringify(err)}`);
   6. });
   ```

## 如何发起GET网络请求

HTTP GET请求是常用的通信方式之一。为了有效地实现这一目标，RemoteCommunicationKit采用了Promise和异步回调的组合策略，不仅可以高效地从服务器获取数据，还可以提高代码的可读性和可维护性。

### 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section176881642192516)。

展开

| 接口名 | 描述 |
| --- | --- |
| get(url: [URLOrString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section320653742718), destination?: [ResponseBodyDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section9250173916506)): Promise<[Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section156381815599)> | 发送一个带有默认HTTP参数的HTTP GET请求，参数为开发者需要请求的地址及响应的目标，并返回来自服务器的HTTP响应。使用Promise异步回调。 |

### 使用示例

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { rcp } from '@kit.RemoteCommunicationKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 创建会话，会话发起get请求。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 1、定义请求URL，此处只给出示例，还请根据实际情况将其替换为需要请求的URL
   2. const getURL = "http://www.example.com/get";

   4. // 2、创建session
   5. const session = rcp.createSession();

   7. // 3、使用session.get发起请求，以getURL为入参，使用Promise进行异步回调。
   8. session.get(getURL).then((response) => {
   9. console.info(`Response succeeded: ${response}`);
   10. }).catch((err: BusinessError) => {
   11. // 4、错误处理，通过catch块，捕获error，并对error进行处理，本示例中会将错误信息展现到打印台上。
   12. console.error(`Response err: Code is ${JSON.stringify(err.code)}, message is ${JSON.stringify(err)}`);
   13. });
   ```

## 如何发起POST网络请求

发送一个带有默认HTTP参数的HTTP POST请求，并返回来自服务器的HTTP响应。使用Promise异步回调。常用于向服务器提交数据。与GET请求不同，POST请求将参数包含在请求主体中，适用于创建新资源、提交表单数据或执行某些操作。

### 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section12392443193017)。

展开

| 接口名 | 描述 |
| --- | --- |
| post(url: [URLOrString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section320653742718), content?: [RequestContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section18971142565016), destination?: [ResponseBodyDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section9250173916506)): Promise<[Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section156381815599)> | 发送一个带有默认HTTP参数的HTTP POST请求，并返回来自服务器的HTTP响应。使用Promise异步回调。 |

### 使用示例

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { rcp } from '@kit.RemoteCommunicationKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 创建会话，使用会话发起post请求。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 定义URL此处给出示例，请根据实际情况选择正确地址
   2. const postURL = "https://www.example.com";
   3. // 定义content，请根据实际情况选择
   4. const postContent: rcp.RequestContent = {
   5. fields: {
   6. 'key1': 'value1',
   7. 'key2': 'value2',
   8. 'key3': 'value3'
   9. }
   10. }
   11. // 创建session
   12. const session = rcp.createSession();
   13. // 使用post发起请求，使用Promise进行异步回调；其中content以及destination为可选参数，可根据实际情况选择
   14. session.post(postURL, postContent)
   15. .then((response) => {
   16. console.info(`Response succeeded: ${JSON.stringify(response.headers)}`);
   17. console.info(`Response succeeded: ${JSON.stringify(response.statusCode)}`);
   18. console.info(`Response succeeded: ${JSON.stringify(postContent)}`);
   19. })
   20. .catch((err: BusinessError) => {
   21. console.error(`Response err: Code is ${JSON.stringify(err.code)}, message is ${JSON.stringify(err)}`);
   22. })
   ```

## 如何发起PUT网络请求

在远场通信服务框架中，HTTP PUT请求用于更新服务器上的特定资源。作为幂等操作，它确保每次请求仅影响目标资源状态。通过Promise异步编程模型，可以有效地管理和控制请求执行流程，结构化处理异步操作和反馈。

### 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section20797124133110)。

展开

| 接口名 | 描述 |
| --- | --- |
| put(url: [URLOrString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section320653742718), content?: [RequestContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section18971142565016), destination?: [ResponseBodyDestination](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section9250173916506)): Promise<[Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section156381815599)> | 发送一个带有默认HTTP参数的HTTP PUT请求，并返回来自服务器的HTTP响应。使用Promise异步回调。 |

### 使用示例

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { rcp } from '@kit.RemoteCommunicationKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 创建会话，会话发起put请求。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 创建会话
   2. const session = rcp.createSession();

   4. // 定义content，请根据实际情况选择
   5. const postContent: rcp.RequestContent = {
   6. fields: {
   7. 'key1': 'value1',
   8. 'key2': 'value2',
   9. 'key3': 'value3'
   10. }
   11. }

   13. // 会话发起PUT请求，"http://www.example.com"请根据实际情况替换为想要请求的URL地址。
   14. session.put("http://www.example.com/put", postContent).then((response) => {
   15. // 对响应的处理，此处为示例，只做打印处理
   16. console.info(`Response succeeded: ${response}`);
   17. }).catch((err: BusinessError) => {
   18. // 请求错误处理
   19. console.error(`Response err: Code is ${JSON.stringify(err.code)}, message is ${JSON.stringify(err)}`);
   20. });
   ```

## 如何发起HEAD网络请求

HTTP HEAD请求可高效访问服务器资源头信息。它与GET请求类似，但主要的区别在于，HEAD请求只返回响应头，而不返回实体内容，这使得其在获取资源的元信息，如文件大小、修改日期等，以及检查资源是否已更改等方面更加有效。

### 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section102891334203115)。

展开

| 接口名 | 描述 |
| --- | --- |
| head(url: [URLOrString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section320653742718)): Promise<[Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section156381815599)> | 发送一个带有默认HTTP参数的HTTP HEAD请求，并返回来自服务器的HTTP响应。使用Promise异步回调。 |

### 使用示例

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { rcp } from '@kit.RemoteCommunicationKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 创建会话，会话发起head请求。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 1、创建会话
   2. const session = rcp.createSession();

   4. // 2、会话发起HEAD请求，"http://www.example.com"请根据实际情况替换为想要请求的URL地址。
   5. session.head("http://www.example.com/head").then((response) => {
   6. // 3、对响应的处理，此处为示例，只做打印处理
   7. console.info(`Response succeeded: ${response}`);
   8. }).catch((err: BusinessError) => {
   9. // 4、请求错误处理
   10. console.error(`Response err: Code is ${JSON.stringify(err.code)}, message is ${JSON.stringify(err)}`);
   11. });
   ```

## 如何发起DELETE网络请求

在远场通信服务的框架中，Remote Communication Kit采用了一种结合发起 HTTP DELETE 请求与 Promise 异步处理的方法。具体操作如下：通过向预定义的 URL 发送一个包含默认 HTTP 参数的 HTTP DELETE 请求，即可实现对目标 URL 上相关资源的有效删除。这种机制不仅简化了请求的发送过程，还增强了异步处理的效率，确保了资源管理的灵活性和响应速度。

### 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section01731783324)。

展开

| 接口名 | 描述 |
| --- | --- |
| delete(url: [URLOrString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section320653742718)): Promise<[Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section156381815599)> | 发送一个带有默认HTTP参数的HTTP DELETE请求，并返回来自服务器的HTTP响应。使用Promise异步回调。 |

### 使用示例

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { rcp } from '@kit.RemoteCommunicationKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 创建会话，会话发起delete请求。"http://www.example.com"请根据实际情况替换为想要请求的URL地址。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const session = rcp.createSession();
   2. session.delete("http://www.example.com/delete").then((response) => {
   3. console.info(`Response succeeded: ${response}`);
   4. }).catch((err: BusinessError) => {
   5. console.error(`Response err: Code is ${JSON.stringify(err.code)}, message is ${JSON.stringify(err)}`);
   6. });
   ```

## 如何使用Form发送HTTP简单的表格数据

在使用[RequestContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section18971142565016)指定HTTP请求中要发送的数据时，可以使用[Form](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section1188301010515)来发送简单的HTTP表单数据。

从6.0.1(21)开始，Form表单支持使用keys来指定表单中key的发送顺序。

### 使用示例

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { rcp } from '@kit.RemoteCommunicationKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 创建RequestContent。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 创建Form表单数据。
   2. const simpleForm = new rcp.Form({
   3. "key1": "value1",
   4. "key2": "value2",
   5. });
   6. // 指定表单中key的发送顺序。指定后，将按照keys列表中的顺序发送（不在列表中的key将不被发送）；若不指定，则默认按各个key的hash顺序发送。
   7. simpleForm.keys = ["key2", "key1"];
   8. // 创建request请求。请将URL地址替换为实际访问的地址。
   9. let req = new rcp.Request("http://example.com");
   10. req.content = simpleForm;
   ```
3. 创建会话，并发起fetch请求。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. // 创建会话。
   3. const session = rcp.createSession();
   4. // 会话发起请求。
   5. session.fetch(req).then((resp: rcp.Response) => {
   6. console.info(`Response succeeded: ${JSON.stringify(resp)}`);
   7. session.close();
   8. }).catch((err: BusinessError) => {
   9. // 请求错误处理。
   10. console.error(`Response err: Code is ${JSON.stringify(err.code)}, message is ${JSON.stringify(err)}`);
   11. session.close();
   12. })
   13. } catch (err) {
   14. // 创建会话错误处理。
   15. console.error(`createSession err: Code is ${JSON.stringify(err.code)}, message is ${JSON.stringify(err)}`);
   16. }
   ```

## 如何使用MultipartForm发送HTTP多部分表格数据

在使用[RequestContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section18971142565016)指定HTTP请求中要发送的数据时，可以使用[MultipartForm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/remote-communication-rcp#section1420174317517)来发送HTTP多部分表格数据。

从6.0.1(21)开始，MultipartForm表单支持使用keys来指定表单中key的发送顺序。

### 使用示例

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { rcp } from '@kit.RemoteCommunicationKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 创建RequestContent。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 创建MultipartForm多部分表单数据。
   2. const multiForm = new rcp.MultipartForm({
   3. "key1": "value1",
   4. "key2": "value2",
   5. "key3": "value3",
   6. });
   7. // 定义多部分表单中的键的顺序。指定后，将按keys列表中的顺序发送（不在列表中的key不会被发送）；如果不指定，则默认按照各个key的hash顺序发送。
   8. multiForm.keys = ["key3", "key1", "key2"];
   9. // 创建request请求。请将URL地址替换为实际访问的地址。
   10. let req = new rcp.Request("http://example.com");
   11. req.content = multiForm;
   ```
3. 创建会话，并发起fetch请求。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. // 创建会话。
   3. const session = rcp.createSession();
   4. // 会话发起请求。
   5. session.fetch(req).then((resp: rcp.Response) => {
   6. console.info(`Response succeeded: ${JSON.stringify(resp)}`);
   7. session.close();
   8. }).catch((err: BusinessError) => {
   9. // 请求错误处理。
   10. console.error(`Response err: Code is ${JSON.stringify(err.code)}, message is ${JSON.stringify(err)}`);
   11. session.close();
   12. })
   13. } catch (err) {
   14. // 创建会话错误处理。
   15. console.error(`createSession err: Code is ${JSON.stringify(err.code)}, message is ${JSON.stringify(err)}`);
   16. }
   ```