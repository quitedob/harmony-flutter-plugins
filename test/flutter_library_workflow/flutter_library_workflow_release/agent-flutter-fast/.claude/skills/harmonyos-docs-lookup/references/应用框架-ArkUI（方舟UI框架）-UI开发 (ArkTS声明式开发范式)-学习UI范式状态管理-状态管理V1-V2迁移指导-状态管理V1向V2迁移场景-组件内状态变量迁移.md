本文档主要介绍组件内的状态变量的迁移场景，包含以下场景：

展开

| V1装饰器名 | V2装饰器名 |
| --- | --- |
| [@State](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-state) | 无外部初始化：[@Local](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-local)  外部初始化一次：[@Param](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-param)/[@Once](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-once) |
| [@Prop](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-prop) | [@Param](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-param) |
| [@Link](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-link) | [@Param](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-param)/[@Event](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-event) |
| [@ObjectLink](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-observed-and-objectlink) | [@Param](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-param)/[@Event](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-event) |
| [@Provide](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-provide-and-consume) | [@Provider](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-provider-and-consumer) |
| [@Consume](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-provide-and-consume) | [@Consumer](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-provider-and-consumer) |
| [@Watch](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-watch) | [@Monitor](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-monitor) |
| 无计算属性相关能力，需要重复计算 | [@Computed](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-computed) |

## 各装饰器迁移示例

### @State -> @Local

**迁移规则**

在V1中，@State装饰器用于装饰组件内部的状态变量，在V2中提供了@Local作为其替代能力，但两者在观察能力和初始化规则上存在明显差异。针对不同的使用场景，迁移策略如下：

* 简单类型：对于简单类型的变量，可以直接将@State替换为@Local。
* 复杂类型：V1中的@State可以观察复杂对象的第一层属性变化，而V2中的@Local只能观察对象自身的变化。如果需要追踪对象内部的属性变化，可以结合使用@ObservedV2和@Trace。
* 外部初始化：V1中，@State支持从外部传递初始值；但在V2中，@Local禁止外部初始化。若需要从外部传递初始值，可以使用@Param和@Once装饰器来实现类似的效果。

**示例**

**简单类型**

对于简单类型变量，V1的@State可以直接替换为V2的@Local。

V1：

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct Child {
4. @State val: number = 10;

6. build() {
7. Text(this.val.toString())
8. }
9. }
```

[StateEasyV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/StateEasyV1.ets#L15-L27)

V2迁移策略：直接替换。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @ComponentV2
3. struct Child {
4. @Local val: number = 10;

6. build() {
7. Text(this.val.toString())
8. }
9. }
```

[StateEasyV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/StateEasyV2.ets#L16-L28)

**复杂类型**

V1的@State能够观察复杂对象的第一层属性变化，但V2的@Local无法观察对象内部变化。为了解决这个问题，需要在类上添加@ObservedV2，并在需要观察的属性上添加@Trace。这样，框架就能追踪对象内部的属性变化。

V1：

收起

自动换行

深色代码主题

复制

```
1. class Child {
2. public value: number = 10;
3. }

5. @Component
6. @Entry
7. struct Example {
8. @State child: Child = new Child();

10. build() {
11. Column() {
12. Text(this.child.value.toString())
13. // @State可以观察第一层变化
14. Button('value+1')
15. .onClick(() => {
16. this.child.value++;
17. })
18. }
19. }
20. }
```

[StateComplexV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/StateComplexV1.ets#L15-L38)

V2迁移策略：使用@ObservedV2和@Trace。

收起

自动换行

深色代码主题

复制

```
1. @ObservedV2
2. class Child {
3. @Trace public value: number = 10;
4. }

6. @ComponentV2
7. @Entry
8. struct Example {
9. // @Local只能观察自身，需要给Child加上@ObservedV2和@Trace
10. @Local child: Child = new Child();

12. build() {
13. Column() {
14. Text(this.child.value.toString())
15. Button('value+1')
16. .onClick(() => {
17. this.child.value++;
18. })
19. }
20. }
21. }
```

[StateComplexV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/StateComplexV2.ets#L15-L39)

**外部初始化状态变量**

V1的@State变量可以从外部初始化，V2的@Local禁止外部初始化。为实现类似功能，需要用@Param和@Once代替@State，允许外部传入初始值，并确保该值只初始化时同步一次。

V1实现：

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct Child {
3. @State value: number = 0;

5. build() {
6. Text(this.value.toString())
7. }
8. }

10. @Entry
11. @Component
12. struct Parent {
13. build() {
14. Column() {
15. // @State可以从外部初始化
16. Child({ value: 30 })
17. }
18. }
19. }
```

[StateExternalInitializationV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/StateExternalInitializationV1.ets#L15-L35)

V2迁移策略：使用@Param和@Once。

收起

自动换行

深色代码主题

复制

```
1. @ComponentV2
2. struct Child {
3. @Param @Once value: number = 0;

5. build() {
6. Text(this.value.toString())
7. }
8. }

10. @Entry
11. @ComponentV2
12. struct Parent {
13. build() {
14. Column() {
15. // @Local禁止从外部初始化，可以用@Param和@Once替代实现
16. Child({ value: 30 })
17. }
18. }
19. }
```

[StateExternalInitializationV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/StateExternalInitializationV2.ets#L15-L35)

### @Link -> @Param/@Event

**迁移规则**

在V1中，@Link允许父组件和子组件之间进行双向数据绑定。迁移到V2时，可以用@Param和@Event模拟双向同步。@Param实现父到子的单向传递，子组件再通过@Event回调函数触发父组件的状态更新。

**示例**

V1实现：

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct Child {
3. // @Link可以双向同步数据
4. @Link val: number;

6. build() {
7. Column() {
8. Text('child: ' + this.val.toString())
9. Button('+1')
10. .onClick(() => {
11. this.val++;
12. })
13. }
14. }
15. }

17. @Entry
18. @Component
19. struct Parent {
20. @State myVal: number = 10;

22. build() {
23. Column() {
24. Text('parent: ' + this.myVal.toString())
25. Child({ val: this.myVal })
26. }
27. }
28. }
```

[LinkMiigrationV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/LinkMiigrationV1.ets#L15-L46)

V2迁移策略：使用@Param和@Event。

收起

自动换行

深色代码主题

复制

```
1. @ComponentV2
2. struct Child {
3. // @Param搭配@Event回调实现数据双向同步
4. @Param val: number = 0;
5. @Event addOne: () => void;

7. build() {
8. Column() {
9. Text('child: ' + this.val.toString())
10. Button('+1')
11. .onClick(() => {
12. this.addOne();
13. })
14. }
15. }
16. }

18. @Entry
19. @ComponentV2
20. struct Parent {
21. @Local myVal: number = 10;

23. build() {
24. Column() {
25. Text('parent: ' + this.myVal.toString())
26. Child({ val: this.myVal, addOne: () => this.myVal++ })
27. }
28. }
29. }
```

[LinkMiigrationV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/LinkMiigrationV2.ets#L15-L47)

### @Prop -> @Param

**迁移规则**

在V1中，@Prop装饰器用于从父组件传递参数给子组件，这些参数在子组件中可以被直接修改。在V2中，@Param取代了@Prop的作用，但@Param是只读的，子组件不能直接修改参数的值。因此，根据场景的不同，有3种迁移策略：

* 简单类型：对于简单类型的参数，将@Prop替换为@Param。
* 复杂类型：如果传递的是复杂对象且需要严格的单向数据绑定，需要深拷贝对象，防止子组件修改父组件的数据。
* 子组件修改变量：如果子组件需要修改传入的参数，使用@Once允许子组件在本地修改该变量。但需要注意，使用@Once修饰符后，当前子组件只会被初始化一次，后续无父组件到子组件的同步能力。

**示例**

**简单类型**

对于简单类型变量，V1的@Prop可以直接替换为V2的@Param。

V1实现：

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct Child {
3. @Prop value: number;

5. build() {
6. Text(this.value.toString())
7. }
8. }

10. @Entry
11. @Component
12. struct Parent {
13. build() {
14. Column() {
15. Child({ value: 30 })
16. }
17. }
18. }
```

[PropEasyV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/PropEasyV1.ets#L15-L34)

V2迁移策略：直接替换。

收起

自动换行

深色代码主题

复制

```
1. @ComponentV2
2. struct Child {
3. @Param value: number = 0;

5. build() {
6. Text(this.value.toString())
7. }
8. }

10. @Entry
11. @ComponentV2
12. struct Parent {
13. build() {
14. Column() {
15. Child({ value: 30 })
16. }
17. }
18. }
```

[PropEasyV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/PropEasyV2.ets#L15-L34)

**复杂类型的单向数据传递**

在V2中，传递复杂类型时，如果希望实现严格的单向数据绑定，防止子组件修改父组件的数据，需要在使用@Param传递复杂对象时进行深拷贝以避免传递对象的引用。

V1实现：

收起

自动换行

深色代码主题

复制

```
1. class Fruit {
2. public apple: number = 5;
3. public orange: number = 10;
4. }

6. @Component
7. struct Child {
8. // @Prop传递Fruit类，当子类修改属性，父类不受影响
9. @Prop fruit: Fruit;

11. build() {
12. Column() {
13. Text('child apple: ' + this.fruit.apple.toString())
14. Text('child orange: ' + this.fruit.orange.toString())
15. Button('apple+1')
16. .onClick(() => {
17. this.fruit.apple++;
18. })
19. Button('orange+1')
20. .onClick(() => {
21. this.fruit.orange++;
22. })
23. }
24. }
25. }

27. @Entry
28. @Component
29. struct Parent {
30. @State parentFruit: Fruit = new Fruit();

32. build() {
33. Column() {
34. Text('parent apple: ' + this.parentFruit.apple.toString())
35. Text('parent orange: ' + this.parentFruit.orange.toString())
36. Child({ fruit: this.parentFruit })
37. }
38. }
39. }
```

[PropComplexV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/PropComplexV1.ets#L15-L58)

V2迁移策略：使用深拷贝。

收起

自动换行

深色代码主题

复制

```
1. @ObservedV2
2. class Fruit {
3. @Trace public  apple: number = 5;
4. @Trace public orange: number = 10;

6. // 实现深拷贝，子组件不会修改父组件的数据
7. clone(): Fruit {
8. let newFruit: Fruit = new Fruit();
9. newFruit.apple = this.apple;
10. newFruit.orange = this.orange;
11. return newFruit;
12. }
13. }

15. @ComponentV2
16. struct Child {
17. @Param fruit: Fruit = new Fruit();

19. build() {
20. Column() {
21. Text('child')
22. Text(this.fruit.apple.toString())
23. Text(this.fruit.orange.toString())
24. Button('apple+1')
25. .onClick(() => {
26. this.fruit.apple++;
27. })
28. Button('orange+1')
29. .onClick(() => {
30. this.fruit.orange++;
31. })
32. }
33. }
34. }

36. @Entry
37. @ComponentV2
38. struct Parent {
39. @Local parentFruit: Fruit = new Fruit();

41. build() {
42. Column() {
43. Text('parent')
44. Text(this.parentFruit.apple.toString())
45. Text(this.parentFruit.orange.toString())
46. Child({ fruit: this.parentFruit.clone() })
47. }
48. }
49. }
```

[PropComplexV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/PropComplexV2.ets#L15-L68)

**子组件修改变量**

在V1中，子组件可以修改@Prop的变量，然而在V2中，@Param是只读的。如果子组件需要修改传入的值，可以使用@Param和@Once允许子组件在本地修改。

V1实现：

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct Child {
3. // @Prop可以直接修改变量值
4. @Prop value: number;

6. build() {
7. Column() {
8. Text(this.value.toString())
9. Button('+1')
10. .onClick(() => {
11. this.value++;
12. })
13. }
14. }
15. }

17. @Entry
18. @Component
19. struct Parent {
20. build() {
21. Column() {
22. Child({ value: 30 })
23. }
24. }
25. }
```

[PropSubComponentUpdateVarV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/PropSubComponentUpdateVarV1.ets#L15-L41)

V2迁移策略：使用@Param和@Once。

收起

自动换行

深色代码主题

复制

```
1. @ComponentV2
2. struct Child {
3. // @Param搭配@Once使用，可以在本地修改@Param变量
4. @Param @Once value: number = 0;

6. build() {
7. Column() {
8. Text(this.value.toString())
9. Button('+1')
10. .onClick(() => {
11. this.value++;
12. })
13. }
14. }
15. }

17. @Entry
18. @ComponentV2
19. struct Parent {
20. build() {
21. Column() {
22. Child({ value: 30 })
23. }
24. }
25. }
```

[PropSubComponentUpdateVarV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/PropSubComponentUpdateVarV2.ets#L15-L41)

在V1中，子组件可以修改@Prop的变量，且只会在本地更新，不会同步回父组件。父组件数据源更新时，会通知子组件更新，并覆写子组件本地@Prop的值。

V1：

* 改变子组件Child的localValue，不会同步回父组件Parent。
* 父组件更新value，通知子组件Child更新，并覆写本地子组件localValue的值。

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct Child {
3. @Prop localValue: number = 0;

5. build() {
6. Column() {
7. Text(`${this.localValue}`).fontSize(25)
8. Button('Child +100')
9. .onClick(() => {
10. // 改变localValue不会传递给父组件Parent
11. this.localValue += 100;
12. })
13. }
14. }
15. }

17. @Entry
18. @Component
19. struct Parent {
20. @State value: number = 10;

22. build() {
23. Column() {
24. Button('Parent +1')
25. .onClick(() => {
26. // 改变value的值，通知子组件Child value更新
27. this.value += 1;
28. })
29. Child({ localValue: this.value })
30. }
31. }
32. }
```

[PropSubComponentUpdateVarLocalV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/PropSubComponentUpdateVarLocalV1.ets#L15-L50)

V2中，@Param本地不可写，与@Once搭配使用时只同步一次。若要实现子组件本地可写，且父组件后续更新仍能通知子组件，可借助@Monitor实现。

V2实现：

* 父组件Parent更新通知子组件value的刷新，并回调@Monitor修饰的onValueChange回调方法，onValueChange将更新后的值赋值给localValue。
* 子组件Child改变localValue的值，不会同步给父组件Parent。
* 父组件Parent中再次改变value，将会继续通知给子组件，并覆写子组件本地localValue的值。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. const DOMAIN = 0xFF00;
3. const TAG = '[Sample_StateMigration_App]';

5. @ComponentV2
6. struct Child {
7. @Local localValue: number = 0;
8. @Param value: number = 0;

10. @Monitor('value')
11. onValueChange(mon: IMonitor) {
12. hilog.info(DOMAIN, TAG, `value has been changed from ${mon.value()?.before} to ${mon.value()?.now}`);
13. // 父组件value变化时，通知子组件value更新，回调Monitor函数，将更新的值覆写给本地的localValue
14. this.localValue = this.value;
15. }

17. build() {
18. Column() {
19. Text(`${this.localValue}`).fontSize(25)
20. Button('Child +100')
21. .onClick(() => {
22. // 改变localValue不会传递给父组件Parent
23. this.localValue += 100;
24. })
25. }
26. }
27. }

29. @Entry
30. @ComponentV2
31. struct Parent {
32. @Local value: number = 10;

34. build() {
35. Column() {
36. Button('Parent +1')
37. .onClick(() => {
38. // 改变value的值，通知子组件Child value更新
39. this.value += 1;
40. })
41. Child({ value: this.value })
42. }
43. }
44. }
```

[PropSubComponentUpdateVarLocalV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/PropSubComponentUpdateVarLocalV2.ets#L15-L61)

### @Provide/@Consume -> @Provider/@Consumer

**迁移规则**

V1的@Provide和@Consume与V2的@Provider和@Consumer定位和作用类似，基本可以实现丝滑替换，但存在以下细微差异，开发者可根据自己代码实现情况参考是否需要调整：

在V1中，@Provide和@Consume用于父子组件之间的数据共享，可以通过alias（别名）或属性名匹配，同时@Consume依赖父组件的@Provide，API version 20以前不允许本地初始化。V2中，@Provider和@Consumer增强了这些特性，使数据共享更加灵活。根据不同的场景，有以下迁移策略：

* V1中@Provide和@Consume在没有指定alias的情况下，可以直接使用。V2中@Provider和@Consumer是标准装饰器，且参数可选，所以不管有无指定alias后面需要必须跟随“()”。
* alias和属性名匹配规则：V1中，@Provide和@Consume可以通过alias或属性名匹配；V2中，alias是唯一的匹配key，指定alias后只能通过alias匹配。
* 本地初始化支持：API version 20以前，@Consume不允许本地初始化，必须依赖父组件；从API version 20开始，@Consume支持本地初始化，当找不到对应的@Provide时使用本地默认值，详见[@Consume装饰的变量支持设置默认值](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-provide-and-consume#consume装饰的变量支持设置默认值)；V2中，@Consumer支持本地初始化，当找不到对应的@Provider时使用本地默认值。
* 从父组件初始化：V1中，@Provide可以直接从父组件初始化；V2中，@Provider不支持外部初始化，需用@Param和@Once接受初始值并赋给@Provider。
* 重载支持：V1中，@Provide默认不支持重载，需设置 allowOverride；V2中，@Provider默认支持重载，@Consumer会向上查找最近的@Provider。

**示例**

**alias和属性名匹配规则**

在V1中，@Provide和@Consume的匹配既可以通过alias，也可以通过属性名。在V2中，alias成为唯一的key，如果在@Consumer中制定了alias，只能通过alias而非属性名进行匹配。

V1实现：

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct Child {
3. // alias和属性名都为key，alias和属性名都可以匹配
4. @Consume('text') childMessage: string;
5. @Consume message: string;

7. build() {
8. Column() {
9. Text(this.childMessage)
10. Text(this.message) // Text是Hello World
11. }
12. }
13. }

15. @Entry
16. @Component
17. struct Parent {
18. @Provide('text') message: string = 'Hello World';

20. build() {
21. Column() {
22. Child()
23. }
24. }
25. }
```

[ProvideAliasV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/ProvideAliasV1.ets#L15-L41)

V2迁移策略：确保alias一致，没有指定alias的情况下，依赖属性名进行匹配。

收起

自动换行

深色代码主题

复制

```
1. @ComponentV2
2. struct Child {
3. // alias是唯一匹配的key，有alias情况下无法通过属性名匹配
4. @Consumer('text') childMessage: string = 'default';
5. @Consumer() message: string = 'default';

7. build() {
8. Column() {
9. Text(this.childMessage)
10. Text(this.message) // Text是default
11. }
12. }
13. }

15. @Entry
16. @ComponentV2
17. struct Parent {
18. @Provider('text') message: string = 'Hello World';

20. build() {
21. Column() {
22. Child()
23. }
24. }
25. }
```

[ProvideAliasV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/ProvideAliasV2.ets#L15-L41)

**V1的@Consume不支持本地初始化，V2支持**

V1中，API version 20之前，@Consume不允许本地初始化变量，必须依赖父组件的@Provide，否则会抛出异常。迁移到V2后，@Consumer允许本地初始化，当找不到对应的@Provider，会使用本地默认值。

V1实现：

收起

自动换行

深色代码主题

复制

```
1. @Component
2. struct Child {
3. // @Consume禁止本地初始化，当找不到对应的@Provide时抛出异常
4. @Consume message: string;

6. build() {
7. Text(this.message)
8. }
9. }

11. @Entry
12. @Component
13. struct Parent {
14. @Provide message: string = 'Hello World';

16. build() {
17. Column() {
18. Child()
19. }
20. }
21. }
```

[ProvideConsumeNoInitV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/ProvideConsumeNoInitV1.ets#L15-L37)

V2迁移策略：@Consumer可以本地初始化。

收起

自动换行

深色代码主题

复制

```
1. @ComponentV2
2. struct Child {
3. // @Consumer允许本地初始化，当找不到@Provider的时候使用本地默认值
4. @Consumer() message: string = 'Hello World';

6. build() {
7. Text(this.message)
8. }
9. }

11. @Entry
12. @ComponentV2
13. struct Parent {
14. build() {
15. Column() {
16. Child()
17. }
18. }
19. }
```

[ProvideConsumeInitV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/ProvideConsumeInitV2.ets#L15-L35)

**V1的@Provide可以从父组件初始化，V2不支持**

在V1中，@Provide允许从父组件初始化，可以直接通过组件参数传递初始值。在V2中，@Provider禁止从外部初始化。为实现相同功能，可以在子组件中使用@Param @Once接受初始值，然后将其赋值给@Provider变量。

V1实现：

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct Parent {
4. @State parentValue: number = 42;

6. build() {
7. Column() {
8. // @Provide可以从父组件初始化
9. Child({ childValue: this.parentValue })
10. }
11. }
12. }

14. @Component
15. struct Child {
16. @Provide childValue: number = 0;

18. build() {
19. Column() {
20. Text(this.childValue.toString())
21. }
22. }
23. }
```

[ProvideParentInitV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/ProvideParentInitV1.ets#L15-L41)

V2迁移策略：使用@Param接受初始值，再赋值给@Provider。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @ComponentV2
3. struct Parent {
4. @Local parentValue: number = 42;

6. build() {
7. Column() {
8. // @Provider禁止从父组件初始化，替代方案为先用@Param接受，再赋值给@Provider
9. Child({ initialValue: this.parentValue })
10. }
11. }
12. }

14. @ComponentV2
15. struct Child {
16. @Param @Once initialValue: number = 0;
17. @Provider() childValue: number = this.initialValue;

19. build() {
20. Column() {
21. Text(this.childValue.toString())
22. }
23. }
24. }
```

[ProvideParentNoInitV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/ProvideParentNoInitV2.ets#L15-L42)

**V1的@Provide默认不支持重载，V2默认支持**

在V1中，@Provide默认不支持重载，无法覆盖上层组件的同名@Provide。若需支持重载，必须设置allowOverride。在V2中，@Provider默认支持重载，@Consumer会向上查找最近的@Provider，无需额外设置。

V1实现：

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct GrandParent {
4. @Provide('reviewVotes') reviewVotes: number = 40;

6. build() {
7. Column() {
8. Parent()
9. }
10. }
11. }

13. @Component
14. struct Parent {
15. // @Provide默认不支持重载，支持重载需设置allowOverride函数
16. @Provide({ allowOverride: 'reviewVotes' }) reviewVotes: number = 20;

18. build() {
19. Child()
20. }
21. }

23. @Component
24. struct Child {
25. @Consume('reviewVotes') reviewVotes: number;

27. build() {
28. Text(this.reviewVotes.toString()) // Text显示20
29. }
30. }
```

[ProvideNoAllowOverrideV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/ProvideNoAllowOverrideV1.ets#L15-L49)

V2迁移策略：取消allowOverride设置。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @ComponentV2
3. struct GrandParent {
4. @Provider('reviewVotes') reviewVotes: number = 40;

6. build() {
7. Column() {
8. Parent()
9. }
10. }
11. }

13. @ComponentV2
14. struct Parent {
15. // @Provider默认支持重载，@Consumer向上查找最近的@Provider
16. @Provider() reviewVotes: number = 20;

18. build() {
19. Child()
20. }
21. }

23. @ComponentV2
24. struct Child {
25. @Consumer() reviewVotes: number = 0;

27. build() {
28. Text(this.reviewVotes.toString()) // Text显示20
29. }
30. }
```

[ProvideAllowOverrideV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/ProvideAllowOverrideV2.ets#L15-L49)

### @Watch -> @Monitor

**迁移规则**

在V1中，@Watch用于监听状态变量的变化，并在变量变化时触发指定回调函数。在V2中，@Monitor替代了@Watch，可以更灵活地监听变量的变化，并获取变量变化前后的值。具体的迁移策略如下：

* 单变量监听：对于简单的场景，可以直接用@Monitor替换@Watch，效果一致。
* 多变量监听：V1的@Watch无法获取变化前的值。在V2中，@Monitor支持同时监听多个变量，并可以访问变量变化前后的状态。

**示例**

**单变量监听**

对于简单案例，V1的@Watch可以直接替换为V2的@Monitor。

V1实现：

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const DOMAIN = 0xFF00;
4. const TAG = '[Sample_StateMigration_App]';

6. @Entry
7. @Component
8. struct WatchExample {
9. @State @Watch('onAppleChange') apple: number = 0;

11. onAppleChange(): void {
12. hilog.info(DOMAIN, TAG, 'apple count changed to ' + this.apple);
13. }

15. build() {
16. Column() {
17. Text(`apple count: ${this.apple}`)
18. Button('add apple')
19. .onClick(() => {
20. this.apple++;
21. })
22. }
23. }
24. }
```

[WatchSingleVarV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/WatchSingleVarV1.ets#L15-L40)

V2迁移策略：直接替换。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const DOMAIN = 0xFF00;
4. const TAG = '[Sample_StateMigration_App]';

6. @Entry
7. @ComponentV2
8. struct MonitorExample {
9. @Local apple: number = 0;

11. @Monitor('apple')
12. onFruitChange(monitor: IMonitor) {
13. hilog.info(DOMAIN, TAG, `apple changed from ${monitor.value()?.before} to ${monitor.value()?.now}`);
14. }

16. build() {
17. Column() {
18. Text(`apple count: ${this.apple}`)
19. Button('add apple')
20. .onClick(() => {
21. this.apple++;
22. })
23. }
24. }
25. }
```

[WatchSingleVarV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/WatchSingleVarV2.ets#L15-L41)

**多变量监听**

在V1中，每个@Watch回调函数只能监听一个变量，且无法获取变化前的值。迁移到V2后，可以使用一个@Monitor同时监听多个变量，并获取监听变量变化前后的值。

V1实现：

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const DOMAIN = 0xFF00;
4. const TAG = '[Sample_StateMigration_App]';

6. @Entry
7. @Component
8. struct WatchExample {
9. @State @Watch('onAppleChange') apple: number = 0;
10. @State @Watch('onOrangeChange') orange: number = 0;

12. // @Watch 回调，只能监听单个变量，不能获取变化前的值
13. onAppleChange(): void {
14. hilog.info(DOMAIN, TAG, 'apple count changed to ' + this.apple);
15. }

17. onOrangeChange(): void {
18. hilog.info(DOMAIN, TAG, 'orange count changed to ' + this.orange);
19. }

21. build() {
22. Column() {
23. Text(`apple count: ${this.apple}`)
24. Text(`orange count: ${this.orange}`)
25. Button('add apple')
26. .onClick(() => {
27. this.apple++;
28. })
29. Button('add orange')
30. .onClick(() => {
31. this.orange++;
32. })
33. }
34. }
35. }
```

[WatchMoreVarV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/WatchMoreVarV1.ets#L15-L52)

V2迁移策略：同时监听多个变量，以及获取变化前的值。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const DOMAIN = 0xFF00;
4. const TAG = '[Sample_StateMigration_App]';

6. @Entry
7. @ComponentV2
8. struct MonitorExample {
9. @Local apple: number = 0;
10. @Local orange: number = 0;

12. // @Monitor回调，支持监听多个变量，可以获取变化前的值
13. @Monitor('apple','orange')
14. onFruitChange(monitor: IMonitor) {
15. monitor.dirty.forEach((name: string) => {
16. hilog.info(DOMAIN, TAG, `${name} changed from ${monitor.value(name)?.before} to ${monitor.value(name)?.now}`);
17. });
18. }

20. build() {
21. Column() {
22. Text(`apple count: ${this.apple}`)
23. Text(`orange count: ${this.orange}`)
24. Button('add apple')
25. .onClick(() => {
26. this.apple++;
27. })
28. Button('add orange')
29. .onClick(() => {
30. this.orange++;
31. })
32. }
33. }
34. }
```

[WatchMoreVarV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/WatchMoreVarV2.ets#L15-L50)

### 重复计算 -> @Computed计算属性

**迁移规则**

V1中并没有提供计算属性的概念，所以对于UI中的冗余计算，并没有办法可以减少重复计算。V2针对该场景，提供了@Computed装饰器，可以帮助开发者减少重复计算。

V1：

在下面的示例中，每次改变lastName都会触发Text组件的刷新，每次Text组件的刷新，都需要重复计算this.lastName + ' ' + this.firstName。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct Index {
4. @State firstName: string = 'Li';
5. @State lastName: string = 'Hua';

7. build() {
8. Column() {
9. Text(this.lastName + ' ' + this.firstName)
10. Text(this.lastName + ' ' + this.firstName)
11. Button('changed lastName').onClick(() => {
12. this.lastName += 'a';
13. })

15. }
16. }
17. }
```

[ComputedV1.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/ComputedV1.ets#L15-L33)

V2:

使用V2中的@Computed，每次改变lastName仅会触发一次计算。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @ComponentV2
3. struct Index {
4. @Local firstName: string = 'Li';
5. @Local lastName: string = 'Hua';

7. @Computed
8. get fullName() {
9. return this.firstName + ' ' + this.lastName;
10. }

12. build() {
13. Column() {
14. Text(this.fullName)
15. Text(this.fullName)
16. Button('changed lastName').onClick(() => {
17. this.lastName += 'a';
18. })
19. }
20. }
21. }
```

[ComputedV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/StateMigrationProject/entry/src/main/ets/pages/componentstatemigration/ComputedV2.ets#L15-L37)

### 双向绑定由$$迁移!!

状态管理V1中，推荐使用[$$](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-two-way-sync)实现系统组件的双向绑定；在状态管理V2中，推荐使用[!!](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-new-binding)语法糖统一处理双向绑定。

说明

!!语法从API version 12开始支持。

**迁移策略**

对于系统组件参数，V1的$$直接替换为V2的!!。

V1实现：

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct TextInputExample {
4. @State text: string = '';
5. controller: TextInputController = new TextInputController();

7. build() {
8. Column({ space: 20 }) {
9. Text(this.text)
10. TextInput({ text: $$this.text, placeholder: 'input your word...', controller: this.controller })
11. .placeholderColor(Color.Grey)
12. .placeholderFont({ size: 14, weight: 400 })
13. .caretColor(Color.Blue)
14. .width(300)
15. }
16. .width('100%')
17. .height('100%')
18. .justifyContent(FlexAlign.Center)
19. }
20. }
```

[SyncUsageExample.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateManagement/entry/src/main/ets/pages/syncStateManager/SyncUsageExample.ets#L30-L52)

V2迁移策略：装饰器修改为V1的同时，$$直接替换为!!。

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @ComponentV2
3. struct TextInputExampleV2 {
4. @Local text: string = '';
5. controller: TextInputController = new TextInputController();

7. build() {
8. Column({ space: 20 }) {
9. Text(this.text)
10. // V2中直接用!!替换$$
11. TextInput({ text: this.text!!, placeholder: 'input your word...', controller: this.controller })
12. .placeholderColor(Color.Grey)
13. .placeholderFont({ size: 14, weight: 400 })
14. .caretColor(Color.Blue)
15. .width(300)
16. }
17. .width('100%')
18. .height('100%')
19. .justifyContent(FlexAlign.Center)
20. }
21. }
```

[SyncUsageExampleV2.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/ParadigmStateManagement/entry/src/main/ets/pages/syncStateManager/SyncUsageExampleV2.ets#L30-L52)