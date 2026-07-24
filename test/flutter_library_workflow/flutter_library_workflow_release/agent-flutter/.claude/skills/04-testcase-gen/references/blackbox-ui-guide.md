# 黑盒 UI 测试用例编写指南

## 核心视角

**写的是 UI 自动化测试，不是 API 调用文档**。每一步都是用户能在界面上做的操作；API 名称只在 `(API: xxx)` 括号里备注。

```
✅  点击【显示 Toast】按钮 (API: showToast, msg: "测试")
❌  调用 showToast 方法，传入 msg="测试"
```

`checkpoint` 同理，必须是可观察的 UI 状态变化（文本、颜色、页面跳转、元素出现/消失），不能写 "返回 true"、"回调被触发"、"无崩溃" 这类 API 层断言。

## UI 元素标注

所有 UI 元素用 `【XX】` 标注，括号内是**用户看到的文本**或约定的语义名，如：`【确定】按钮`、`【消息】输入框`、`【结果】面板`、`【设置】页面`、`【启用】开关`。

## 不同插件类型的写法示例

**UI 组件类**
```
点击【WebView 演示】模块卡片
点击【加载百度】用例卡片
点击【加载 URL】按钮 (API: loadUrl, url: "https://www.baidu.com")
  checkpoint: WebView 区域渲染出百度首页内容
```

**后台服务/事件监听类** —— 把监听/订阅转成 UI 动作：
```
点击【开始监听】按钮 (API: PhoneState.phoneStateStream.listen)
  checkpoint: 【状态】文本显示 "监听中"
等待 3 秒
  checkpoint: 【结果】面板显示来电号码
```

**权限/系统交互类** —— 把授权转成 UI 动作：
```
点击【请求权限】按钮 (API: requestPermission)
  checkpoint: 系统弹出授权对话框
点击系统对话框中的【允许】按钮
  checkpoint: 【权限状态】文本显示 "已授权"
```

**数据处理类** —— 输入 → 触发 → 观察输出：
```
在【明文】输入框中输入 "hello"
点击【加密】按钮 (API: aesEncrypt)
  checkpoint: 【结果】面板显示非空 base64 字符串
```

## 平台无关

目标平台是鸿蒙，不写 Android/iOS 特定内容。插件技术背景里可以提"原 Android/iOS 实现"，但步骤和 checkpoint 必须平台无关。

## 自检

写完一条用例问自己：
1. 每一步都是用户能在界面上做的操作吗？
2. UI 元素有 `【】` 标注吗？
3. checkpoint 是肉眼能看到的变化吗？
4. API 名放在 `(API: xxx)` 括号里了吗？
