RAG（Retrieval-Augmented Generation，检索增强生成）结合了智慧检索和知识库技术，通过知识库来生成答案或者内容，具有较强的可解释性和定制能力。应用可通过接入Data Augmentation Kit提供的[RAG](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-rag-api)能力快速实现知识问答、智慧助手等业务场景。下文以流式的知识问答场景为例，详细说明RAG的使用。

RAG通过请求大语言模型（streamChat）对用户问题进行解析，检索相关知识库内容后，再通过大语言模型对检索结果进行融合和人性化生成输出。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cd/v3/2ZRHAeIaR82S8YyOQJCvNw/zh-cn_image_0000002342660670.png?HW-CC-KV=V1&HW-CC-Date=20260414T041404Z&HW-CC-Expire=86400&HW-CC-Sign=EF52F02FDE7FB615D0D1687DBBE56E20E96C898AD1EB201506B655E954B8B449 "点击放大")