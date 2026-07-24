为了应对实际业务中，任务执行顺序固定、灵活优先级调度以及复杂的任务依赖关系等场景，FFRT支持串行队列、并发队列和图依赖三种不同的并发范式。

## 串行队列（Serial Queue）

串行队列并发范式常用于解决以下场景中的问题：

1. **顺序执行**: 某些任务需要按特定顺序执行，串行队列可以确保任务按添加的顺序逐一执行，避免了乱序执行带来的数据不一致性和错误。
2. **数据安全**: 在并发环境中访问和修改共享资源时，容易出现竞争条件。使用串行队列可以避免多个线程同时访问共享资源，确保数据的一致性和安全性。
3. **任务协调**: 串行队列可以用来协调复杂任务的执行顺序，例如在进行多个依赖关系的任务时，确保前一个任务完成后再开始下一个任务。
4. **简化开发**: 相较于手动管理锁和同步机制，串行队列的使用更加简洁明了。开发者只需将任务添加到队列中，系统会自动处理任务的调度和执行顺序，减少了开发和调试的复杂性。
5. **资源管理**: 在某些情况下，限制并发任务的数量可以避免资源争用和过载。串行队列可以控制并发任务的数量，优化系统资源的使用。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ae/v3/HKHSf4IWQVue4C5xVXghGA/zh-cn_image_0000002540611970.png?HW-CC-KV=V1&HW-CC-Date=20260414T045522Z&HW-CC-Expire=86400&HW-CC-Sign=BE4F0ACCBE0567A07820BD1B8B832EFAD81DE4BBEA90DFE9112FE0105590B3F9)

串行队列并发范式开发样例可以参考[串行队列(C)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ffrt-concurrency-serial-queue-c)/[串行队列(C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ffrt-concurrency-serial-queue-cpp)

## 并发队列（Concurrent Queue）

并发队列并发范式常用于解决以下场景中的问题：

1. **提高并发度**: 并发队列允许多个任务同时执行，充分利用多核处理器的计算能力，显著提高系统的并发度和整体性能。
2. **资源高效利用**: 并发队列能将任务分配到可用的CPU核心上，优化资源的使用，减少任务的等待时间和资源争用。
3. **任务调度灵活**: 并发队列允许任务按照不同的优先级（Priority）和QoS进行调度，确保关键任务能够及时执行，提高系统的响应速度。
4. **避免资源冲击**: 并发队列允许设置最大并发度，避免任务并发过多对系统资源造成的冲击，从而保证系统的稳定性和性能。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/21/v3/At-eCL2SS9msKtSseZB36g/zh-cn_image_0000002571171965.png?HW-CC-KV=V1&HW-CC-Date=20260414T045522Z&HW-CC-Expire=86400&HW-CC-Sign=DC33A150BB85AF3F0C91D2FB726F2DC9D83A8CDB4061B97D1A475FDF80BAEBFD)

并发队列并发范式开发样例可以参考[并发队列(C)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ffrt-concurrency-concurrent-queue-c)/[并发队列(C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ffrt-concurrency-concurrent-queue-cpp)

## 图依赖并发（Task Graph）

图依赖并发范式常用于解决以下场景中的问题：

1. **复杂任务依赖关系**: 在许多实际应用中，任务之间存在复杂的依赖关系。图依赖并发范式通过使用有向图来表示任务及其依赖关系，能够清晰地管理和调度这些任务。
2. **动态任务调度**: 当任务的依赖关系和执行顺序需要根据运行时的条件动态决定时，图依赖并发范式可以灵活地调整任务的调度，确保任务按正确的顺序执行。
3. **并行任务执行**: 图依赖并发范式允许多个不相互依赖的任务并行执行，从而最大化利用系统的计算资源，提高并发度和执行效率。
4. **结构化并发**：图依赖并发范式中可以通过明确的任务生命周期和依赖关系，确保并发任务的创建和完成在代码结构中清晰可见，减少并发编程的复杂性和错误。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/21/v3/OqKeHpnbTF--dbwnx9gedg/zh-cn_image_0000002540771624.png?HW-CC-KV=V1&HW-CC-Date=20260414T045522Z&HW-CC-Expire=86400&HW-CC-Sign=1FA27186E4535863A490043F37AB039817239ABA253CEA9970C3C772C04B3C44)

图依赖并发范式开发样例可以参考[图依赖并发(C)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ffrt-concurrency-graph-c)/[图依赖并发(C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ffrt-concurrency-graph-cpp)

## 任务伙伴（Job Partner）

从API version 20开始，FFRT支持Job\_Partner(任务伙伴)功能。任务伙伴任务并发范式常用于解决以下场景中的问题：

1. **多线程协作**: 在许多实际应用中，某些功能需要在特定环境进行运行，而其他功能可以在任何环境运行，这个时候需要多线程协作，部分功能在A线程运行，然后回到B线程，最后再回到A线程。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/15/v3/idzWA93wQUybuHWXJHRrUw/zh-cn_image_0000002571291919.png?HW-CC-KV=V1&HW-CC-Date=20260414T045522Z&HW-CC-Expire=86400&HW-CC-Sign=E6BAF9426FE629B846391FFFBDD1C00DBEB1483C2167B85A7051DFCDE14BA08A)
2. **动态并发调度**: 有些场景并发任务数量动态变化，时多时少，所以可以通过动态调整worker数量来最大提升性能，降低调度开销。

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/81/v3/XtCHrBZJShCZtlko-0KX9A/zh-cn_image_0000002540611972.png?HW-CC-KV=V1&HW-CC-Date=20260414T045522Z&HW-CC-Expire=86400&HW-CC-Sign=1DE1587B71F5D3BE893FEB7E783A10880CD488DEC404F03D4E832D87F16AC79F)

   图中的参数如下所示：

   * job\_num 提交的任务数。
   * partner\_num worker数量。
   * threshold 表示任务堆积到指定数量后才会启动worker。
   * ratio 表示任务数和worker数的比例。
   * max 表示最大worker数。

协作并发范式开发样例可以参考[任务伙伴(C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ffrt-concurrency-job-partner-cpp)