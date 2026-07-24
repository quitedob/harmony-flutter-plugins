在ES6(ECMAScript 6.0)模块设计中，使用import语法加载其他文件导出的内容是ECMA规范所定义的语法规则。为支持开发者使用该功能导入Native模块（so）导出的内容，ArkTS进行了相关适配，并提供了以下几种支持写法。

## 直接导入

在Native模块的index.d.ts文件中导出，并在文件内直接导入。

### 具名导入

收起

自动换行

深色代码主题

复制

```
1. // libentry.so对应的index.d.ts
2. export const add: (a: number, b: number) => number;
```

收起

自动换行

深色代码主题

复制

```
1. // NameImport.ets
2. import { add } from 'libentry.so'
3. add(2, 3);
```

### 默认导入

收起

自动换行

深色代码主题

复制

```
1. // libentry.so对应的index.d.ts
2. export const add: (a: number, b: number) => number;
```

收起

自动换行

深色代码主题

复制

```
1. // DefaultImport.ets
2. import entry from 'libentry.so'
3. entry.add(2, 3);
```

### 命名空间导入

收起

自动换行

深色代码主题

复制

```
1. // libentry.so对应的index.d.ts
2. export const add: (a: number, b: number) => number;
```

收起

自动换行

深色代码主题

复制

```
1. // NamespaceImport.ets
2. import * as entry from 'libentry.so'
3. entry.add(2, 3);
```

## 间接导入

### 转为具名变量导出再导入

收起

自动换行

深色代码主题

复制

```
1. // libentry.so对应的index.d.ts
2. export const add: (a: number, b: number) => number;
```

收起

自动换行

深色代码主题

复制

```
1. // NameExport.ets
2. // 将libentry.so的API封装后导出
3. import { add } from 'libentry.so';
4. export { add };
```

收起

自动换行

深色代码主题

复制

```
1. // NameImportFromExport.ets
2. // 从中间模块导入API
3. import { add } from './NameExport';
4. const result = add(2, 3);
```

### 转为命名空间导出再导入

收起

自动换行

深色代码主题

复制

```
1. // libentry.so对应的index.d.ts
2. export const add: (a: number, b: number) => number;
```

收起

自动换行

深色代码主题

复制

```
1. // NamespaceExport.ets
2. export * from 'libentry.so'
```

收起

自动换行

深色代码主题

复制

```
1. // NamespaceImportFromExport.ets
2. import { add } from './NamespaceExport'
3. add(2, 3);
```

注意

不支持Native模块导出和导入同时使用命名空间。

**反例：**

收起

自动换行

深色代码主题

复制

```
1. // test1.ets
2. export * from 'libentry.so'
```

收起

自动换行

深色代码主题

复制

```
1. // test2.ets
2. import * as add from './test1'
3. // 无法获取add对象
```

## 动态导入

### 直接导入

收起

自动换行

深色代码主题

复制

```
1. // libentry.so对应的index.d.ts
2. export const add: (a: number, b: number) => number;
```

收起

自动换行

深色代码主题

复制

```
1. // DynamicImport.ets
2. import('libentry.so').then((entry:ESObject) => {
3. entry.default.add(2, 3);
4. })
```

### 间接导入

收起

自动换行

深色代码主题

复制

```
1. // DynamicExport.ets
2. import entry from 'libentry.so'
3. export { entry }
```

收起

自动换行

深色代码主题

复制

```
1. // DynamicImportFromExport.ets
2. import('./DynamicExport').then((ns:ESObject) => {
3. ns.entry.add(2, 3);
4. })
```

注意

不支持动态加载时，导出文件使用命名空间。

**反例：**

收起

自动换行

深色代码主题

复制

```
1. // test1.ets
2. export * from 'libentry.so'
```

收起

自动换行

深色代码主题

复制

```
1. // test2.ets
2. import('./test1').then((ns:ESObject) => {
3. // 无法获取ns对象
4. })
```