# PromptHub 永久工作流标准

本文件是 PromptHub Workflow 内容的长期发布与质量审核标准。

任何新增、修改、删除 Workflow 的任务，都必须先读取：

1. `PRODUCT_BIBLE.md`
2. `PROMPTHUB_WORKFLOW_STANDARD.md`
3. `PROMPTHUB_ITERATION_SYSTEM.md`

如两份规范存在冲突，以证据要求更严格、对用户更诚实的一项为准。

## 一、产品定位

PromptHub 不是只追求数量的 Prompt 收集站。

PromptHub 是 AI Best Practices Platform：免费 Prompt Library 提供入口，Workflow 提供方法，Playbook 提供完整方案，Toolkit 提供可执行资产。

用户可以从复制一段 Prompt 开始，但最终价值是解决一个真实工作问题。所有 Workflow 内容必须围绕：

问题 → 工作流 → Prompt → 示例 → 输出 → 验证 → 改进

## 二、每个 Workflow 必须包含

### 1. Workflow Overview

用一句话说明它能解决什么问题。

### 2. 解决的问题

清楚列出用户痛点，不使用无法证明的结果承诺。

### 3. 适合人群

例如：开发者、运营、求职者、客服、独立开发者。

### 4. 推荐模型

至少评估：

- GPT-5
- Claude
- DeepSeek

模型必须同时标注 `Tested`、`Compatible` 或 `Not Tested`。未经同一协议测试，不得使用星级、排名或“最佳模型”结论。

### 5. Workflow Diagram

必须有清晰、可执行的步骤，例如：

输入

↓

分析

↓

Prompt

↓

输出

↓

验证

### 6. Prompt

必须可以直接复制，并明确需要替换的变量。

### 7. 示例输入

必须具体。演示数据应标记为 Demo，不得让用户误认为真实客户资料。

### 8. 示例输出

必须展示预期结构。未经测试留档的输出必须标记为示例，而不是测试结果。

### 9. Expected Output

说明用户最终会得到什么。

### 10. Time Saved

只有具备基线、样本量与测试方法时才能给出具体时间。没有真实数据时可以写“预期节省的步骤”，不得编造时长或百分比。

### 11. Common Mistakes

列出常见错误及其影响。

### 12. Best Practices

列出可执行的最佳使用方法。

### 13. Boundary

说明什么时候不适合使用、何时必须升级给人工处理。

### 14. Verification Record

必须标注：

- Workflow 状态
- 最后审核日期
- 测试模型
- 固定输入
- 运行次数
- 输出留档位置
- 人工审核人或待审核状态
- 测试结论
- 结果边界

### 15. Related Workflows

使用稳定 ID 关联相关 Workflow，不依赖显示标题作为外键。

## 三、Workflow 状态标准

公开内容只能使用以下状态：

- `Verified`：已有真实用户或真实业务结果验证，并完成人工审核。
- `Community Testing`：已开放给社区测试，仍在收集反馈。
- `Internal Tested`：使用固定输入完成内部重复测试、保存输出、完成失败分析与人工审核。
- `Demo Only`：仅用于展示方法或页面结构，不代表真实结果。
- `Archived`：已过时、失效或不再推荐。

现有技术字段映射：

- `verified` → `Verified`
- `source-linked` 不等于已测试；根据证据映射为 `Demo Only` 或 `Internal Tested`
- `unverified` → `Demo Only`

禁止把未经真实用户验证的内容写成 `Verified`。

## 四、禁止事项

禁止：

- 继续堆数量
- 生成低质量泛 Prompt
- 编造真实客户案例
- 编造转化率、收入、SEO 增长、节省时间或成功率
- 把 Demo 写成真实案例
- 把未验证内容标记为精品、最佳、实测或付费
- 把“来源存在”误写成“Workflow 已验证”
- 为了好看牺牲真实性

## 五、首页规则

首页只应突出：

- Top 5 Editor Picks
- 核心 Workflow Packs
- Workflow Weekly
- Case Library 入口

不要在首页直接展示大量 Prompt。未达到对应状态的内容不得使用“Verified”“最佳”或“实测”标签。

## 六、内容优先级

优先级：

1. 真实案例
2. 可复用工作流
3. 示例输入输出
4. 使用边界
5. Prompt 文本

Prompt 文本不是最重要的，结果、证据和工作流才重要。

## 七、每次更新必须执行

每次修改后必须：

1. 检查所有受影响 Workflow 是否符合本标准。
2. 运行 production build。
3. 检查 sitemap。
4. 确认 `noindex` 页面没有被 sitemap 收录。
5. 输出修改报告。

报告必须包含：

- 修改了哪些 Workflow
- 是否符合标准
- 哪些仍是 `Demo Only`
- 哪些可以进入 `Internal Tested`
- 哪些需要真实用户验证
- build 是否通过

## 八、当前重点 Workflow

优先维护以下 6 个：

1. 客服工单结构化分流
2. Next.js 水合错误排查
3. SEO 主题集群
4. 简历成果量化
5. 小红书内容工作流
6. SaaS Landing Page

不要新增第 7 个 Workflow，除非这 6 个已经全部达到 `Internal Tested` 或更高状态。

## 九、发布门槛

### Demo Only

- 方法和边界清晰
- 示例明确标记
- 不含未经证实的结果

### Internal Tested

- 固定输入
- 至少三次重复运行
- 原始输出留档
- 明确通过标准
- 失败分析
- 人工审核完成
- 最后审核日期与结果边界

### Verified

在 `Internal Tested` 基础上，还必须具备：

- 可追溯真实用户或真实业务场景
- 用户或业务结果证据
- 隐私与授权检查
- 人工最终批准

## 十、最终原则

宁可 6 个 Workflow 做深，也不要 600 个 Prompt 做浅。

PromptHub 的长期价值来自：

- 真实问题
- 真实流程
- 真实案例
- 真实边界
- 真实反馈

## 十一、Workflow Continuous Improvement（永久迭代规则）

PromptHub 所有 Workflow 必须持续维护。

禁止：

- 发布后长期不复查
- 用新增 Workflow 代替维护已有 Workflow
- 修改用户可见内容但不记录版本
- 为了显得活跃而制造没有实际变化的版本
- 用更新频率掩盖证据不足

### 1. 每个 Workflow 必须维护

- `version`
- `lastUpdated`
- `lastReviewed`
- `nextReview`
- `changeLog`
- `qualityScore`
- `verificationStatus`
- `editorialTier`

`verificationStatus` 与 `editorialTier` 必须分开：

- Verification Status：`Demo Only`、`Internal Tested`、`Community Testing`、`Verified`、`Archived`
- Editorial Tier：`Standard`、`Recommended`、`Gold Standard`

`Recommended` 和 `Gold Standard` 不是验证状态，不能替代证据。

### 2. 版本规则

使用语义化内容版本：

- `v1.0`：第一次达到可公开维护的完整结构
- `v1.1`：新增 FAQ、边界、案例、模型记录或实质性说明
- `v1.2`：修正 Prompt、步骤、示例或错误分析
- `v2.0`：任务定义、验证协议或核心 Workflow 发生重大变化

仅更新审核日期、修复错别字或检查后无内容变化，不提升版本号。

### 3. Change Log

每条变更必须包含：

- Version
- Date
- Change Type：Added / Changed / Fixed / Deprecated
- 修改内容
- 修改原因
- 证据或来源
- 审核人

不得使用“持续优化”“体验升级”等无法审计的空泛描述。

### 4. Review Cadence

当前 6 个重点 Workflow：

- 每周深度 Review 1 个
- 每 30 天至少完成一次证据复查

全站：

- 每月执行一次质量审计
- 每季度评估降级、合并或归档
- 每半年复核本标准

超过 30 天未复查的重点 Workflow 进入 `Needs Review`。复查后即使内容无需修改，也要更新 `lastReviewed` 并记录“Reviewed, no content change”；不得伪造新版本。

### 5. 每次 Review 检查

- Prompt 是否仍然可执行
- 示例输入是否具体且可复现
- 示例输出是否与状态一致
- 模型记录是否仍然有效
- Workflow Diagram 是否准确
- FAQ 是否回答真实问题
- Common Mistakes 是否覆盖已知失败
- Boundary 是否明确
- SEO 标题、描述与 canonical 是否准确
- Related Workflow 是否使用稳定 ID
- Verification Record 是否完整
- Source 是否仍然可访问
- 是否出现新的失败模式
- 是否有证据支持状态升级

### 6. Quality Score

Quality Score 是内部维护指标，不是用户结果评分，也不是模型效果评分。

总分 100：

- 结构完整度：25
- 证据与真实性：25
- 可复现性：20
- 案例质量：15
- 维护状态：15

每项必须由明确字段和证据计算。不得凭编辑感觉打分，不得把分数渲染成星级暗示用户效果。

最低约束：

- 缺少 Verification Record：证据与真实性不高于 5/25
- 没有固定输入与输出留档：可复现性不高于 5/20
- 仅 Demo 案例：案例质量不高于 5/15
- 超过 Review Date：维护状态不高于 5/15
- `Demo Only` 最高总分为 84

队列规则：

- `< 70`：进入 `Archive Review`
- `70–84`：进入 `Improvement Queue`
- `85–95`：可进入 `Recommended` 候选
- `> 95`：可进入 `Gold Standard` 候选

自动进入队列不等于自动改变公开状态。所有升级、推荐与归档必须经过人工审核。

### 7. Editorial Tier 门槛

`Recommended` 必须：

- 至少达到 `Internal Tested`
- Quality Score ≥ 85
- Review 未过期
- 没有未说明的高风险边界

`Gold Standard` 必须：

- 达到 `Verified`
- Quality Score > 95
- 有真实案例与结果边界
- 有当前有效的来源与维护人
- 经过人工编辑批准

首页只能展示人工批准的 `Recommended` 与 `Gold Standard`。当前没有达到门槛的内容时，应诚实展示 Editor Picks 或测试中状态，不得降低标准。

### 8. Workflow Dashboard

Dashboard 首先作为构建期或审计报告生成，不优先开发新的公开页面。

至少统计：

- Workflow 总数
- 各 Verification Status 数量
- 各 Editorial Tier 数量
- Needs Review 数量
- Improvement Queue 数量
- 缺少 Source、Case、FAQ、Boundary、Verification Record 的数量
- 30 天内即将到期的 Review

Dashboard 只能读取 canonical Workflow 数据，不得维护第二份手工状态。

### 9. Review 完成条件

完成一次 Workflow Review 后：

1. 更新 `lastReviewed` 与 `nextReview`。
2. 有实质变化时更新 Version 与 Change Log。
3. 重新计算 Quality Score。
4. 保留 Verification Status 的证据边界。
5. 运行 production build。
6. 检查 sitemap、canonical 与 noindex。
7. 输出本次修改、未解决证据缺口和下一次验证任务。

PromptHub 永远优先维护已有 Workflow，而不是增加数量。
