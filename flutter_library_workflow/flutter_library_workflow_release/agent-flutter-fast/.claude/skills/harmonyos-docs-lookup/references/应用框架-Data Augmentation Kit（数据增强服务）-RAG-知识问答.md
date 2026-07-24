## 约束限制

1. 知识问答需要先对数据源库进行知识加工生成知识库，否则无法问答。
2. [createRagSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section14201103320529)以及[streamRun](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section178721756950)不支持多线程调用。
3. 提问长度限制在1000个字符内（UTF-8下一个汉字占3个字符）。
4. 用户问答时，RAG可使用的历史记录范围为最近1次问答内容。
5. RAG在检索召回时最多返回600个chunk。
6. RAG不提供敏感词风控检测能力，开发者需要自行对用户输入内容和RAG返回内容进行敏感词风控检测。
7. 开发者选择的LLM支持的上下文长度至少应该为30k Tokens，如Qwen2.5-7B-32K、Mistral-7B-Instruct-v0.2、Llama-3.1-8B等。否则可能会因大模型上下文长度超限而导致知识问答失败。
8. LLM由开发者自行选择，问答支持的语言受选择的LLM影响。

## 接口说明

知识问答关键接口如下表所示，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| abstract [streamChat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section157381918121212)(query: string, callback: Callback<[LLMStreamAnswer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section178144421252)>): Promise<[LLMRequestInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section1816505018227)> | 继承ChatLLM类实现大模型客户端时需要实现的函数。RAG在检索前的问题预处理、检索后的回答生成时，会调用这个函数与大语言模型交互。 |
| [createRagSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section14201103320529)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), config: [Config](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section1033315317182)): Promise<[RagSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section1312212528516)> | 获得一个会话用于进行知识问答。 |
| [streamRun](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section178721756950)(question: string, config: [RunConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section126313912116), callback: AsyncCallback<[Stream](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section158611717585)>): Promise<number> | 知识问答接口，传入问题以及问答配置项。当RAG生成问题结果时，触发callback回调函数来流式传递数据。 |

注意

上述接口需在页面或自定义组件生命周期内调用。

## 开发准备

1. 申请网络权限。[streamChat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section157381918121212)中需要开发者实现与LLM交互的功能，因此需要为应用申请网络权限。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // module.json5中配置"requestPermissions"字段
   2. // src/main/module.json5
   3. "requestPermissions": [
   4. {
   5. "name": "ohos.permission.INTERNET"
   6. }
   7. ],
   ```
2. 完成知识加工配置。请参考[知识加工](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/data-augmentation-knowledge-processing)。

## 开发步骤

下面仅对关键步骤关键代码进行片段式说明，省略了很多非核心代码，如果需要查看完整功能示例代码，请参考[示例代码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/data-augmentation-rag-demo)。应用的一次流式问答过程，和RagSession、ChatLLM、知识库的交互流程，可参考[流式问答调用流程图](/consumer/cn/doc/harmonyos-guides/data-augmentation-rag-development#section1350294615400)。

1. kit导入。本模块主要依赖如下，其余依赖需要开发者按需添加。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { rag } from '@kit.DataAugmentationKit';
   ```
2. 创建http工具类，用以和大模型交互，用户也可选择webSocket（可参考[Network Kit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-api-arkts)）或者其他方式与大模型交互。本示例选用了[ModelArts平台](https://console.huaweicloud.com/modelarts)的qwen3-235b-a22b模型作为示例，开发者使用时需根据实际情况选择合适大模型。示例代码包括如下三个环节：
   * 拼装和大模型交互的请求报文，推荐为流式交互，以获得更好用户体验。
   * 注册大模型的数据接收及输出结束的回调函数，以达到流式访问大模型的效果。
   * 初始化大模型以及向大模型发送请求。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';
   2. import { http } from '@kit.NetworkKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';

   5. const TAG = 'HttpUtils';

   7. class HttpUtils {
   8. httpRequest?: http.HttpRequest;
   9. url: string = 'https://api.modelarts-maas.com/v1/chat/completions'; // 开发者需要根据选择的大模型对应修改url以及下面的model
   10. isFinished: boolean = false;

   12. initOption(question: string) {
   13. let option: http.HttpRequestOptions = {
   14. // 请求方式
   15. method: http.RequestMethod.POST,
   16. // 请求头
   17. header: {
   18. 'Content-Type': 'application/json',
   19. // API-KEY from Model
   20. 'Authorization': `Bearer ****replace your API key in here****`
   21. },
   22. // 请求体
   23. extraData: {
   24. 'stream': true,
   25. 'temperature': 0.1,
   26. 'max_tokens': 1000,
   27. 'frequency_penalty': 1,
   28. 'model': 'qwen3-235b-a22b',
   29. 'top_p': 0.1,
   30. 'presence_penalty': -1,
   31. 'messages': JSON.parse(question),
   32. "chat_template_kwargs": {
   33. // 关闭思考中数据
   34. "enable_thinking": false
   35. }
   36. }
   37. };
   38. return option;
   39. }

   41. async requestInStream(question: string) { // 拼装流式请求的option并发起流式请求
   42. if (!this.httpRequest) {
   43. this.httpRequest = http.createHttp();
   44. }
   45. this.httpRequest?.requestInStream(this.url, this.initOption(question)).catch((err: BusinessError) => {
   46. hilog.error(0, TAG, 'Failed to request. Cause: %{public}s', JSON.stringify(err));
   47. });
   48. this.isFinished = false;
   49. }

   51. on(callback: Callback<ArrayBuffer>) { // 注册数据接受、数据结束的监听
   52. if (!this.httpRequest) {
   53. this.httpRequest = http.createHttp();
   54. }
   55. this.httpRequest.on('dataReceive', callback);
   56. }

   58. cancel() {
   59. this.httpRequest?.off('dataReceive');
   60. this.httpRequest?.destroy();
   61. this.httpRequest = undefined;
   62. }
   63. }

   65. export default new HttpUtils;
   ```
3. 继承实现[ChatLLM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section1400115191116)类，在此函数中与大模型进行交互，并将大模型返回结果通过callback函数返回给RagSession。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { rag } from '@kit.DataAugmentationKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   3. import { JSON, util } from '@kit.ArkTS';
   4. import HttpUtils from './HttpUtils'; // HttpUtils为上一步骤中，在文件HttpUtils.ets文件中实现的HTTP访问工具类

   6. const TAG = "MyChatLLM";

   8. export default class MyChatLLM extends rag.ChatLLM {
   9. async streamChat(query: string, callback: Callback<rag.LLMStreamAnswer>): Promise<rag.LLMRequestInfo> {
   10. let ret: rag.LLMRequestStatus = rag.LLMRequestStatus.LLM_SUCCESS;
   11. try {
   12. let dataCallback = async (data: ArrayBuffer) => { // 收到数据时的回调函数，解析数据并组装LLMStreamAnswer，通过callback回调
   13. hilog.debug(0, TAG, 'on callback enter. data length: %{public}d', data.byteLength);
   14. // 解析大模型返回报文，逻辑因选择模型而异，此处省略具体解析代码，示例参见完整示例代码
   15. const answer = parseLLMResponse(data);
   16. if (!answer) {
   17. return;
   18. }
   19. HttpUtils.isFinished = answer.isFinished;
   20. callback(answer);
   21. hilog.debug(0, 'MyChatLLM', 'Request LLM success. isFinished: %{public}s, data: %{public}s',
   22. Number(answer.isFinished).toString(), answer.chunk);
   23. };

   25. HttpUtils.on(dataCallback);
   26. HttpUtils.requestInStream(query);
   27. } catch (err) {
   28. hilog.error(0, TAG, `Request LLM failed, error code: ${err.code}, error message: ${err.message}`);
   29. ret = rag.LLMRequestStatus.LLM_REQUEST_ERROR; // 开发者可判断错误码从而返回其他LLM错误码
   30. }
   31. return {
   32. chatId: 0,
   33. status: ret,
   34. };
   35. }
   36. cancel(chatId: number): void {
   37. hilog.info(0, TAG, `The request for the large model has been canceled. chatId: ${chatId}`);
   38. HttpUtils.cancel();
   39. }
   40. }
   41. function parseLLMResponse(data: ArrayBuffer): rag.LLMStreamAnswer {
   42. throw new Error('Function not implemented.'); // 待实现大模型报文解析流程
   43. }
   ```
4. 创建[Config](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section1033315317182)配置中的属性。下面简要介绍几个主要参数，全量配置字段的含义见[智慧化数据检索](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/dataaugmentation-retrieval)中的说明。
   * [RetrievalConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-retrieval-api#section95236010016)主要配置知识库的数据库配置。[知识加工](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/data-augmentation-knowledge-processing#section13189205451011)将会生成向量及倒排两种知识库表。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. import { common, UIAbility } from '@kit.AbilityKit';
     2. import { rag, retrieval } from '@kit.DataAugmentationKit';
     3. import { relationalStore } from '@kit.ArkData';

     5. let storeConfigVector: relationalStore.StoreConfig = {
     6. name: 'testmail_store_vector.db', // 知识加工后向量数据库文件名，在原数据库名基础上加_vector后缀
     7. securityLevel: relationalStore.SecurityLevel.S3,
     8. vector: true  // 向量数据库应设置该项为true
     9. };
     10. let storeConfigInvIdx: relationalStore.StoreConfig = {
     11. name: 'testmail_store.db', // 知识加工后，倒排数据库即原数据库
     12. securityLevel: relationalStore.SecurityLevel.S3,
     13. tokenizer: relationalStore.Tokenizer.CUSTOM_TOKENIZER
     14. };
     15. let context = AppStorage.get<common.UIAbilityContext>('Context') as common.UIAbilityContext;
     16. let channelConfigVector: retrieval.ChannelConfig = {
     17. channelType: retrieval.ChannelType.VECTOR_DATABASE,
     18. context: context,
     19. dbConfig: storeConfigVector
     20. };
     21. let channelConfigInvIdx: retrieval.ChannelConfig = {
     22. channelType: retrieval.ChannelType.INVERTED_INDEX_DATABASE,
     23. context: context,
     24. dbConfig: storeConfigInvIdx
     25. };
     26. // 最终创建成功的RetrievalConfig数据
     27. let retrievalConfig: retrieval.RetrievalConfig = {
     28. channelConfigs: [channelConfigInvIdx, channelConfigVector]
     29. };
     ```
   * [RetrievalCondition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-retrieval-api#section4881955192413)主要配置检索条件及多路召回之后的排序配置。其中fromClause为查询目标索引名，可按照如下示例代码配置为业务数据库表及知识加工产生的数据库表联合形成的虚拟表；responseColumns为召回的字段集合，范围为fromClause配置的数据库表中的列。关于知识库的数据库表结构可参见：[表1](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/data-augmentation-knowledge-processing#table1186182016388)、[表2](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/data-augmentation-knowledge-processing#table57920393405)。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. import { retrieval } from '@kit.DataAugmentationKit';

     3. let recallConditionInvIdx: retrieval.InvertedIndexRecallCondition = {
     4. ftsTableName: 'email_inverted',
     5. // 使用id（原始数据库表主键，配置在知识加工schema中）和reference_id（知识库表中的字段）关联原始数据库表及知识库的表，增加检索及召回数据范围
     6. fromClause: 'select email_inverted.reference_id as rowid, * from email INNER JOIN email_inverted ON email.id = email_inverted.reference_id',
     7. primaryKey: ['chunk_id'],
     8. // 配置范围为fromClause配置的数据库表中的列，超出范围会导致检索失败。
     9. responseColumns: ['reference_id', 'chunk_id', 'chunk_source', 'chunk_text', 'subject', 'image_text',
     10. 'attachment_names'],
     11. deepSize: 500,
     12. recallName: 'invertedvectorRecall',
     13. };
     14. let floatArray = new Float32Array(128).fill(0.1);
     15. let vectorQuery: retrieval.VectorQuery = {
     16. column: 'repr',
     17. value: floatArray,
     18. similarityThreshold: 0.1
     19. };
     20. let recallConditionVector: retrieval.VectorRecallCondition = {
     21. vectorQuery: vectorQuery,
     22. // 只配置知识库的向量表作为查询目标
     23. fromClause: 'email_vector',
     24. primaryKey: ['id'],
     25. // 配置知识库的向量表中的列作为召回列
     26. responseColumns: ['reference_id', 'chunk_id', 'chunk_source', 'repr'],
     27. recallName: 'vectorRecall',
     28. deepSize: 500
     29. };
     30. let rerankMethod: retrieval.RerankMethod = {
     31. rerankType: retrieval.RerankType.RRF,
     32. isSoftmaxNormalized: true,
     33. };
     34. // 最终创建成功的RetrievalCondition数据
     35. let retrievalCondition: retrieval.RetrievalCondition = {
     36. rerankMethod: rerankMethod,
     37. recallConditions: [recallConditionInvIdx, recallConditionVector],
     38. resultCount: 5
     39. };
     ```
   * 完成Config数据的构造。[ChatLLM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section1400115191116)参数则使用步骤3继承实现的ChatLLM的自定义的类的实例。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. import { rag } from "@kit.DataAugmentationKit";
     2. import MyChatLLM from "./MyChatLlm"; // 来源参考步骤3示例代码

     4. let config: rag.Config = {
     5. llm: new MyChatLLM(), // 来源参考步骤3示例代码
     6. retrievalConfig: retrievalConfig, // 来源参考当前步骤RetrievalConfig代码示例
     7. retrievalCondition: retrievalCondition  // 来源参考当前步骤RetrievalCondition代码示例
     8. }
     ```
5. 创建RagSession。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { UIAbility } from '@kit.AbilityKit';
   2. import { rag } from '@kit.DataAugmentationKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';
   4. import { BusinessError } from '@kit.BasicServicesKit';

   6. // 创建RagSession并存入APP上下文中
   7. rag.createRagSession(this.context, config).then((data) => {  // config来源参考步骤4代码示例
   8. AppStorage.setOrCreate<rag.RagSession>('RagSessionObject', data);
   9. }).catch((err: BusinessError) => {
   10. hilog.error(DOMAIN, 'testTag', `createRagSession failed, code is ${err.code},message is ${err.message}.`);
   11. });
   ```
6. 使用步骤5创建的RagSession的streamRun()函数进行问答。
   * answerTypes属性用来指定流式输出的数据类型（[StreamType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api#section172106569558)），当前示例代码配置了三种数据类型，所以最终streamRun()函数的callback回调函数将会输出这三种类型的数据。
   * streamRun()函数以增量流式的方式输出数据，所以需要开发者自行对结果进行拼接。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { BusinessError } from '@kit.BasicServicesKit';
   2. import { rag } from '@kit.DataAugmentationKit';
   3. import hilog from '@ohos.hilog';

   5. // 获取创建的RagSession
   6. let session: rag.RagSession = AppStorage.get<rag.RagSession>('RagSessionObject') as rag.RagSession;
   7. let config: rag.RunConfig = {
   8. // 指定流式输出的输出类型
   9. answerTypes: [rag.StreamType.THOUGHT, rag.StreamType.ANSWER]
   10. };
   11. let thoughtStr = '';
   12. let answerStr = '';
   13. let inputStr = '';
   14. // 发起提问
   15. session.streamRun(inputStr, config, ((err: BusinessError, stream: rag.Stream) => {
   16. // 接收答案的callback回调，处理答案信息
   17. if (err) {
   18. answerStr = `streamRun inner failed. code is ${err.code}, message is ${err.message}`;
   19. } else {
   20. // 根据不同的数据类型，选择不同的处理方式
   21. switch (stream.type) {
   22. case rag.StreamType.THOUGHT:
   23. thoughtStr += stream.answer.chunk;
   24. break;
   25. case rag.StreamType.ANSWER:
   26. answerStr += stream.answer.chunk;
   27. break;
   28. case rag.StreamType.REFERENCE:
   29. default:
   30. hilog.info(0, 'Index', `streamRun msg: ${JSON.stringify(stream)}`);
   31. }
   32. }
   33. })).catch((e: BusinessError) => {
   34. answerStr = `streamRun failed. code is ${e.code}, message is ${e.message}`;
   35. });
   ```

## 流式问答调用流程图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f2/v3/C_IjWmZ_SqebfZWY_stYgw/zh-cn_image_0000002402299685.png?HW-CC-KV=V1&HW-CC-Date=20260414T041407Z&HW-CC-Expire=86400&HW-CC-Sign=3B48E91B34642747F8A75ADBAE193878EA1767C7C558CCCE6C6E33C777AC7284)