## 概述

PhonePC/2in1TabletTV

[HMS\_HiAISingleOpExecutor\_CreateConvolution](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaisingleopexecutor_createconvolution)输入参数。

**起始版本：** 5.0.0(12)

**相关模块：** [CANN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit)

**所在头文件：** [hiai\_single\_op.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit-hiai-single-op-8h)

## 汇总

PhonePC/2in1TabletTV

### 成员变量

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [HiAI\_SingleOpOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_singleopoptions) \* [options](/consumer/cn/doc/harmonyos-references/cannkit-sopexec-convparam#options) | 指向[HiAI\_SingleOpOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_singleopoptions)对象的指针。该值不能为空指针，否则接口调用失败。 |
| [HiAI\_SingleOpDescriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_singleopdescriptor) \* [opDesc](/consumer/cn/doc/harmonyos-references/cannkit-sopexec-convparam#opdesc) | 指向卷积算子对应的[HiAI\_SingleOpDescriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_singleopdescriptor)对象的指针。该值不能为空指针，否则接口调用失败。 |
| [HiAI\_SingleOpTensorDesc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_singleoptensordesc) \* [input](/consumer/cn/doc/harmonyos-references/cannkit-sopexec-convparam#input) | 指向输入Tensor描述的指针。该值不能为空指针，否则接口调用失败。 |
| [HiAI\_SingleOpTensorDesc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_singleoptensordesc) \* [output](/consumer/cn/doc/harmonyos-references/cannkit-sopexec-convparam#output) | 指向输出Tensor描述的指针。该值不能为空指针，否则接口调用失败。 |
| [HiAI\_SingleOpTensor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_singleoptensor) \* [filter](/consumer/cn/doc/harmonyos-references/cannkit-sopexec-convparam#filter) | 指向卷积核Tensor的指针。该值不能为空指针，否则接口调用失败。 |
| [HiAI\_SingleOpTensor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_singleoptensor) \* [bias](/consumer/cn/doc/harmonyos-references/cannkit-sopexec-convparam#bias) | 指向偏置Tensor的指针。如果卷积没有偏置，则该值可以是空指针。 |

## 结构体成员变量说明

PhonePC/2in1TabletTV

### bias

PhonePC/2in1TabletTV



```
1. HiAI_SingleOpTensor* HiAI_SingleOpExecutorConvolutionParam::bias
```

**描述**

指向偏置Tensor的指针。如果卷积没有偏置，则该值可以是空指针。

### filter

PhonePC/2in1TabletTV



```
1. HiAI_SingleOpTensor* HiAI_SingleOpExecutorConvolutionParam::filter
```

**描述**

指向卷积核Tensor的指针。该值不能为空指针，否则接口调用失败。

### input

PhonePC/2in1TabletTV



```
1. HiAI_SingleOpTensorDesc* HiAI_SingleOpExecutorConvolutionParam::input
```

**描述**

指向输入Tensor描述的指针。该值不能为空指针，否则接口调用失败。

### opDesc

PhonePC/2in1TabletTV



```
1. HiAI_SingleOpDescriptor* HiAI_SingleOpExecutorConvolutionParam::opDesc
```

**描述**

指向卷积算子对应的[HiAI\_SingleOpDescriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_singleopdescriptor)对象的指针。该值不能为空指针，否则接口调用失败。

### options

PhonePC/2in1TabletTV



```
1. HiAI_SingleOpOptions* HiAI_SingleOpExecutorConvolutionParam::options
```

**描述**

指向[HiAI\_SingleOpOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_singleopoptions)对象的指针。该值不能为空指针，否则接口调用失败。

### output

PhonePC/2in1TabletTV



```
1. HiAI_SingleOpTensorDesc* HiAI_SingleOpExecutorConvolutionParam::output
```

**描述**

指向输出Tensor描述的指针。该值不能为空指针，否则接口调用失败。