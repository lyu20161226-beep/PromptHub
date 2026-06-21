const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");

function loadTypeScriptExport(relativePath, exportName) {
  const filename = path.join(root, relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  const module = { exports: {} };
  new Function("module", "exports", "require", compiled)(module, module.exports, require);
  return module.exports[exportName];
}

const legacy = JSON.parse(fs.readFileSync(path.join(root, "src/data/prompts.json"), "utf8"));
const content = loadTypeScriptExport("src/data/content-prompts.ts", "contentPrompts");
const expanded = loadTypeScriptExport("src/data/expanded-prompts.ts", "expandedPrompts");

function inferCategory(prompt) {
  const text = [prompt.title, prompt.description, prompt.useCase, ...(prompt.tags || [])].join(" ");
  if (prompt.platform === "midjourney" || prompt.platform === "jimeng") return "绘图";
  if (/代码|编程|程序|开发|SQL|API|产品需求/.test(text)) return "编程";
  if (/营销|广告|销售|品牌|电商|用户|竞品/.test(text)) return "营销";
  if (/学习|课程|知识|教学|面试/.test(text)) return "学习";
  if (/会议|邮件|周报|办公|汇报|计划/.test(text)) return "办公";
  return "写作";
}

const prompts = [
  ...legacy.map((prompt) => ({ ...prompt, category: inferCategory(prompt), source: "原创基础库" })),
  ...content.map((prompt) => ({ ...prompt, source: "人工结构库" })),
  ...expanded.map((prompt) => ({ ...prompt, source: "批量工作流库" }))
];

function normalizedBigrams(text) {
  const clean = text
    .toLowerCase()
    .replace(/\[[^\]]*\]/g, "[变量]")
    .replace(/[a-z0-9_-]+/g, "x")
    .replace(/[^\p{Script=Han}a-z\[\]]/gu, "");
  const grams = new Set();
  for (let index = 0; index < clean.length - 1; index += 1) grams.add(clean.slice(index, index + 2));
  return grams;
}

function similarity(left, right) {
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  for (const gram of left) if (right.has(gram)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

const allGrams = prompts.map((prompt) => normalizedBigrams(prompt.content));
const contentSimilarity = new Map();

for (let index = 0; index < prompts.length; index += 1) {
  let max = 0;
  for (let other = 0; other < prompts.length; other += 1) {
    if (index === other) continue;
    max = Math.max(max, similarity(allGrams[index], allGrams[other]));
  }
  contentSimilarity.set(prompts[index].id, max);
}

const duplicateTitleIds = new Set();
const titleGroups = Map.groupBy(prompts, (prompt) => prompt.title.trim().toLowerCase());
for (const group of titleGroups.values()) {
  if (group.length < 2) continue;
  const [keeper, ...duplicates] = [...group].sort((a, b) => b.content.length - a.content.length);
  void keeper;
  for (const duplicate of duplicates) duplicateTitleIds.add(duplicate.id);
}

function hasConcreteExample(prompt) {
  const input = prompt.exampleInput || "";
  const output = prompt.exampleOutput || "";
  return (
    input.length >= 60 &&
    output.length >= 140 &&
    !/已生成|任务已拆解|视觉方向已明确|一份围绕/.test(output)
  );
}

function scorePrompt(prompt) {
  const text = prompt.content || "";
  const concreteExample = hasConcreteExample(prompt);
  const maxSimilarity = contentSimilarity.get(prompt.id) || 0;

  let practicality = 0;
  if ((prompt.useCase || "").length >= 8) practicality += 10;
  if (text.length >= 240) practicality += 8;
  else if (text.length >= 120) practicality += 6;
  if (/\[[^\]]+\]/.test(text)) practicality += 8;
  if (/输出|生成|交付|最终|结果|格式/.test(text)) practicality += 8;
  if (concreteExample) practicality += 6;

  let professionalism = 0;
  if (/1[.、个项封组道]|步骤|流程|阶段|结构|输出.{0,12}[：:]/.test(text)) professionalism += 7;
  if (/你是|请作为|资深|专家|顾问|工程师|总监|导师|编辑/.test(text)) professionalism += 4;
  if (/不要|避免|核对|风险|限制|约束|待确认/.test(text)) professionalism += 5;
  if (text.length >= 280) professionalism += 4;

  let reusability = 0;
  const variables = text.match(/\[[^\]]+\]/g) || [];
  if (variables.length >= 1) reusability += 8;
  if ((prompt.tags || []).length >= 3) reusability += 4;
  if (variables.length >= 3) reusability += 4;
  if (/、|，|,/.test(prompt.useCase || "")) reusability += 4;

  let resultQuality = 0;
  if (/输出|结构|表格|清单|标题|正文|代码|方案|矩阵/.test(text)) resultQuality += 6;
  if (/检查|验证|核对|测试|复盘|风险/.test(text)) resultQuality += 5;
  if (/第二轮|继续|迭代|版本|对比|调整/.test(text)) resultQuality += 4;
  if (concreteExample) resultQuality += 5;

  let penalty = 0;
  const issues = [];
  if (maxSimilarity >= 0.8) {
    penalty += 30;
    issues.push(`与同库内容相似度${Math.round(maxSimilarity * 100)}%`);
  } else if (maxSimilarity >= 0.65) {
    penalty += 20;
    issues.push(`与同库内容相似度${Math.round(maxSimilarity * 100)}%`);
  } else if (maxSimilarity >= 0.5) {
    penalty += 10;
    issues.push(`与同库内容相似度${Math.round(maxSimilarity * 100)}%`);
  }
  if (duplicateTitleIds.has(prompt.id)) {
    penalty += 25;
    issues.push("与另一条内容同名，建议合并后隐藏");
  }
  if (!concreteExample) issues.push("缺少经验证的完整案例输出");
  if (text.length < 120) issues.push("工作流深度不足");

  const rawScore = practicality + professionalism + reusability + resultQuality - penalty;
  const score = Math.max(0, Math.min(100, rawScore));
  const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "D";

  return {
    id: prompt.id,
    slug: prompt.slug,
    title: prompt.title,
    category: prompt.category,
    source: prompt.source,
    score,
    grade,
    dimensions: { practicality, professionalism, reusability, resultQuality, penalty },
    maxSimilarity: Number(maxSimilarity.toFixed(3)),
    hasConcreteExample: concreteExample,
    issues
  };
}

const categoryPriority = { 营销: 6, 编程: 5, 办公: 4, 学习: 3, 写作: 2, 绘图: 1 };
const sourcePriority = { 人工结构库: 3, 原创基础库: 2, 批量工作流库: 1 };
const audited = prompts
  .map(scorePrompt)
  .sort((a, b) => {
    const aDuplicate = a.maxSimilarity >= 0.8 ? 1 : 0;
    const bDuplicate = b.maxSimilarity >= 0.8 ? 1 : 0;
    return aDuplicate - bDuplicate || b.score - a.score || sourcePriority[b.source] - sourcePriority[a.source] || categoryPriority[b.category] - categoryPriority[a.category] || a.title.localeCompare(b.title, "zh-CN");
  })
  .map((item, index) => {
    const collection = item.grade === "A" && index < 20
      ? "featured"
      : ["A", "B"].includes(item.grade) && index < 50
        ? "premium"
        : ["A", "B", "C"].includes(item.grade) && index < 100
          ? "recommended"
          : "hidden";

    return {
      ...item,
      rank: index + 1,
      collection,
      status: collection === "hidden" ? "hidden" : "review-candidate"
    };
  });

const gradeCounts = audited.reduce((counts, item) => {
  counts[item.grade] += 1;
  return counts;
}, { A: 0, B: 0, C: 0, D: 0 });

const report = {
  generatedAt: new Date().toISOString(),
  methodology: {
    practicality: 40,
    professionalism: 20,
    reusability: 20,
    resultQuality: 20,
    note: "相似度惩罚从总分扣除；缺少真实完整案例不会获得案例分。"
  },
  summary: {
    total: audited.length,
    grades: gradeCounts,
    concreteExamples: audited.filter((item) => item.hasConcreteExample).length,
    similarityOver80: audited.filter((item) => item.maxSimilarity >= 0.8).length,
    featured: audited.filter((item) => item.collection === "featured").length,
    premium: audited.filter((item) => item.collection === "premium").length,
    recommended: audited.filter((item) => item.collection === "recommended").length,
    hidden: audited.filter((item) => item.collection === "hidden").length,
    reviewQueueTop20: 20
  },
  prompts: audited
};

fs.mkdirSync(path.join(root, "data"), { recursive: true });
fs.mkdirSync(path.join(root, "docs"), { recursive: true });
fs.writeFileSync(path.join(root, "data/prompt-audit.json"), `${JSON.stringify(report, null, 2)}\n`);

function tableRows(items, includeReason = false) {
  return items.map((item) => {
    const reason = item.hasConcreteExample
      ? "包含可核验案例"
      : item.issues.length
        ? item.issues.join("；")
        : "任务明确且流程完整";
    return includeReason
      ? `| ${item.rank} | ${item.title} | ${item.category} | ${item.score} | ${item.grade} | ${reason} |`
      : `| ${item.rank} | ${item.title} | ${item.category} | ${item.score} | ${item.grade} |`;
  }).join("\n");
}

const top20 = audited.slice(0, 20);
const top50 = audited.slice(0, 50);
const top100 = audited.slice(0, 100);
const hidden = audited.slice(100);

const markdown = `# PromptHub 内容质量审计

生成时间：${report.generatedAt}

## 审计结论

- 总数：${audited.length}
- A 级：${gradeCounts.A}
- B 级：${gradeCounts.B}
- C 级：${gradeCounts.C}
- D 级：${gradeCounts.D}
- 具有经验证完整案例：${report.summary.concreteExamples}
- 相似度超过 80%：${report.summary.similarityOver80}

> 重要：这是相对排名，不代表已经达到镇站标准。当前 featured 和 premium 的达标数量均为 0；没有真实完整案例的条目必须补测后再升级。

## Top 20 人工复测队列

| 排名 | 标题 | 分类 | 评分 | 等级 | 审计说明 |
| ---: | --- | --- | ---: | :---: | --- |
${tableRows(top20, true)}

## Top 50 相对排名

| 排名 | 标题 | 分类 | 评分 | 等级 |
| ---: | --- | --- | ---: | :---: |
${tableRows(top50)}

## Top 100 相对排名

| 排名 | 标题 | 分类 | 评分 | 等级 |
| ---: | --- | --- | ---: | :---: |
${tableRows(top100)}

## 建议隐藏名单

| 排名 | 标题 | 分类 | 评分 | 等级 |
| ---: | --- | --- | ---: | :---: |
${tableRows(hidden)}

## 最终内容策略

1. 当前不应把任何条目标记为“已验证精品”，因为完整真实案例数为 ${report.summary.concreteExamples}。
2. 首页只使用 Top20 作为人工复测队列；逐条用真实输入运行，并保存未经删改的输出。
3. Top50 在补齐案例和人工点评后进入精品集合。
4. 当前只有 ${report.summary.recommended} 条达到 C 级推荐门槛，其余候选不能为了凑数进入推荐集合。
5. ${report.summary.hidden} 条保留原始记录，默认隐藏并从 sitemap 移除，避免模板化内容稀释 SEO 质量。
6. 每周只审核 10 条，以真实结果、用户复制率和回访数据决定升降级。
`;

fs.writeFileSync(path.join(root, "docs/prompt-content-audit.md"), markdown);

console.log(JSON.stringify(report.summary, null, 2));
