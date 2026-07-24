# 使用hvigor插件方式编译flutter项目

- 将原先通过直接更改项目配置文件（app.json5、build-profile.json5、oh-package.json5等）的方式优化为通过Hvigor插件方式动态更新配置，可避免由于配置文件被频繁更改而可能造成的提交冲突问题。
- 直接依赖插件源码来构建，这样编写插件时可直接对源码修改且会有代码提示，体验与Android和iOS统一。

使用hvigor插件方式编译flutter项目的注意点：

1. 构建出的APP、HAP以及HAR等产物均位于flutter项目的`build/ohos`目录下
2. 对于既有项目需要手动调整（工程调整完后需flutter pub get）

## 对于 flutter app 项目

### 1. ohos/.gitignore

- 添加 `/package.json`, `/package-lock.json`
- 移除 `*.har`
- 对应的项目里自动生成的har文件夹也可以直接删除了

### 2. ohos/oh-package.json5

- 移除dependencies的`@ohos/flutter_ohos`
- 移除overrides的`@ohos/flutter_ohos`，以及flutter插件

### 3. ohos/hvigorfile.ts

添加hvigor插件flutterHvigorPlugin

```ts
import path from 'path'
import { appTasks } from '@ohos/hvigor-ohos-plugin';
import { flutterHvigorPlugin } from 'flutter-hvigor-plugin';

export default {
    system: appTasks,
    plugins:[flutterHvigorPlugin(path.dirname(__dirname))]
}
```

### 4. 添加ohos/hvigorconfig.ts

```ts
import path from 'path'
import { injectNativeModules } from 'flutter-hvigor-plugin';

injectNativeModules(__dirname, path.dirname(__dirname))
```

### 5. 修改ohos/entry/hvigorfile.ts

```ts
import { hapTasks } from '@ohos/hvigor-ohos-plugin';
export default {
    system: hapTasks,
    plugins: []
}
```

### 6. ohos/entry/oh-package.json5

移除dependencies的`@ohos/flutter_ohos`以及flutter插件

## 对于 flutter module 项目

### 基于Har产物

1. host工程下oh-package.json5, 移除dependencies和overrides中flutter相关依赖（如不存在则无需处理）
2. host工程下oh-package.json5, overrides下添加所有flutter构建出的har（注意调整为实际路径）

```json
  "overrides": {
    "@ohos/flutter_ohos": "file:./path/flutter_project/build/ohos/har/release/flutter.har",
    "@ohos/flutter_module": "file:./path/flutter_project/build/ohos/har/release/flutter_module.har",
    "plugin_x": "file:./path/flutter_project/build/ohos/har/release/plugin_x.har",
  }
```

上述方式在项目中插件较多且有变动的情况下较为不便，可以在host工程的`hvigorfile.ts`中添加以下代码实现动态添加依赖的功能

```ts
import { appTasks } from '@ohos/hvigor-ohos-plugin';
import fs from 'fs'
import path from 'path'
import { OhosPluginId } from '@ohos/hvigor-ohos-plugin';
import { getNode, hvigor } from '@ohos/hvigor'

const directory = '需调整为实际路径'
const keyMap = {
  "flutter": "@ohos/flutter_ohos",
  "flutter_embedding_debug": "@ohos/flutter_ohos",
  "flutter_embedding_profile": "@ohos/flutter_ohos",
  "flutter_embedding_release": "@ohos/flutter_ohos",
  "arm64_v8a_debug": "flutter_native_arm64_v8a",
  "arm64_v8a_profile": "flutter_native_arm64_v8a",
  "arm64_v8a_release": "flutter_native_arm64_v8a",
  "x86_64_debug": "flutter_native_x86_64",
  "x86_64_profile": "flutter_native_x86_64",
  "x86_64_release": "flutter_native_x86_64",
  "flutter_module": "@ohos/flutter_module"
}
const rootNode: HvigorNode = getNode(__filename)
rootNode.afterNodeEvaluate(node => {
  const appContext = node.getContext(OhosPluginId.OHOS_APP_PLUGIN) as OhosAppContext
  if (!appContext) {
    return
  }
  const overrides = appContext.getOverrides() ?? {}
  const dependencies = appContext.getDependenciesOpt() ?? {}
  const files = fs.readdirSync(directory);
  const keys = Object.keys(keyMap)
  for (const file of files) {
    if (path.extname(file).toLowerCase() !== '.har') {
      continue
    }
    const fileName = path.parse(file).name
    const depName = keys.includes(fileName) ? keyMap[fileName] : fileName
    const filePath = `file:${path.join(directory, file)}`
    dependencies[depName] = filePath
    overrides[depName] = filePath
  }
  appContext.setDependenciesOpt(dependencies)
  appContext.setOverrides(overrides)
})

export default {
  system: appTasks,
  plugins: []
}
```

### 基于源码

1. host工程下hvigorconfig.ts（如果没有需新建）

```ts
// 该文件位于flutter module工程.ohos下，需调整为实际路径
import { injectNativeModules, getFlutterProjectPath } from './path/flutter_project/.ohos/include_flutter';

injectNativeModules(__dirname, getFlutterProjectPath(), 1)
```

2. host工程下的hvigorfile.ts, 添加flutterHvigorPlugin插件

```ts
import { appTasks } from '@ohos/hvigor-ohos-plugin';
// 该文件位于flutter module工程.ohos下，需调整为实际路径
import { flutterHvigorPlugin, getFlutterProjectPath } from './path/flutter_project/.ohos/include_flutter';

export default {
  system: appTasks,
  plugins:[flutterHvigorPlugin(getFlutterProjectPath(), 1)]
}
```

3. host工程下build-profile.json5, 移除flutter_module
4. host工程下oh-package.json5, 移除dependencies和overrides中flutter相关依赖（如不存在则无需处理）

## 对于 flutter plugin 项目

注意：对于既有的flutter plugin项目，如果不做任何修改仅会导致example无法正常编译，但不影响该plugin在flutter项目中的正常使用和编译。

### 可选修改

1. 插件项目下hvigorfile.ts改成

```ts
import { harTasks } from '@ohos/hvigor-ohos-plugin';
export default {
    system: harTasks,
    plugins: []
}
```

2. 插件项目下oh-package.json5, 移除dependencies的`@ohos/flutter_ohos` 。

### 必须修改

插件example的调整参考前述的flutter app项目。
