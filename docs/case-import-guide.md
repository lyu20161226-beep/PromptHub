# PromptHub 真实案例导入指南

目标不是批量制造案例，而是持续沉淀少量、来源清楚、能够复用的 AI Workflow 案例。

## 人工导入流程

1. 保存公开来源链接，并确认页面允许正常访问。
2. 只记录来源明确表达的事实，不推测作者身份、收益或效果。
3. 将长文、帖子或视频整理为摘要，不复制全文。
4. 提取问题、输入、步骤、输出和结果边界。
5. 所有数字必须能在来源中找到，否则填写 `null`。
6. 由人工复核标题、摘要、来源链接和验证状态后再发布。

## 验证状态

- `source-linked`：有可访问的明确来源链接，但证据不足以验证完整执行结果。
- `verified`：有来源链接，并能核对完整 Prompt、输入、输出和结果证据。
- `unverified`：信息不足、只有二手描述，或仅用于演示页面结构。

有来源不等于已经验证。无法核对结果时，应使用 `source-linked`，不能使用 `verified`。

## 发布前检查

- 来源 URL、作者和日期是否准确。
- 是否删除了来源未提供的效果数字。
- 是否避免全文搬运，只保留必要摘要和结构化分析。
- `resultClaim` 是否清楚说明证据边界。
- `curatorNote` 是否记录编辑判断和仍需核验的信息。
- 关联的 Prompt 与 Pack 是否真的匹配。

## JSON 模板

```json
{
  "id": "case-001",
  "slug": "descriptive-case-slug",
  "title": "",
  "sourcePlatform": "",
  "sourceUrl": "",
  "sourceAuthor": null,
  "sourceDate": null,
  "category": "",
  "useCase": "",
  "problem": "",
  "originalPrompt": "",
  "workflowSteps": [],
  "inputSummary": "",
  "outputSummary": "",
  "resultClaim": "",
  "metrics": {
    "likes": null,
    "comments": null,
    "views": null,
    "bookmarks": null
  },
  "reusableTemplate": "",
  "tags": [],
  "verificationStatus": "source-linked",
  "curatorNote": "",
  "promptSlug": "",
  "relatedPackSlugs": []
}
```

## 内容边界

PromptHub 只展示必要摘要、结构化分析、可复用方法和来源链接。不要复制付费内容、完整文章、完整帖子或其他平台的商品内容。
