# `repos/plugins.json` — React Native 模块仓库列表管理（精简）

此文件位于 `repos/` 目录下，**仅**管理模块仓库的克隆状态，不存储适配进度、模块类型分析结果等详细信息。

```json
{
  "plugins": [
    {
      "id": "unique-id",
      "name": "plugin-name",
      "repoUrl": "https://github.com/user/repo.git",
      "commitHash": "abc123def456...",
      "cloneTime": "2026-03-06T02:47:01.400Z",
      "status": "initialized | cloning | cloned | clone_failed"
    }
  ]
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 唯一标识符，由后端生成 |
| `name` | string | 模块名称，同时也是 `repos/` 下的目录名 |
| `repoUrl` | string | Git 仓库地址 |
| `commitHash` | string | 克隆/拉取时的 HEAD commit hash |
| `cloneTime` | string\|null | 克隆完成的 ISO 时间戳 |
| `status` | enum | 仅反映克隆状态，不涉及适配进度 |

**`status` 取值范围**（仅限克隆生命周期）：

| 值 | 含义 |
|----|------|
| `initialized` | 已添加记录，尚未克隆 |
| `cloning` | 正在克隆中 |
| `cloned` | 克隆完成，仓库可用 |
| `clone_failed` | 克隆失败 |
