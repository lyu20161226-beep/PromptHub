# PromptHub V2.5 验证事件

验证层不使用数据库。浏览器将匿名事件发送到 `/api/events`，生产环境可在 Vercel 项目的 **Logs** 中搜索：

```text
[prompthub-validation]
```

## 事件

- `workflow_view`：打开 Top10 工作流详情页
- `workflow_click`：从卡片点击进入详情页
- `workflow_copy`：成功复制 Top10 Prompt
- `search`：搜索词停止输入 700ms 后记录
- `feedback`：有帮助/没帮助及选填原因
- `survey`：访问至少三个不同页面后的需求选择

事件只包含匿名会话 ID、时间、页面路径和必要的产品属性，不记录姓名、邮箱、IP 或完整外部来源 URL。若网络请求失败，最近 50 条事件暂存在浏览器 `prompthub:validation-fallback` 中，不会自动伪装成全站统计。
