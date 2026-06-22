export type WeeklyIssue = {
  issue: number;
  title: string;
  date: string;
  introduction: string;
  workflowIds: readonly string[];
  reasons: Readonly<Record<string, string>>;
};

export const latestWeeklyIssue: WeeklyIssue = {
  issue: 1,
  title: "先解决最值钱的三个问题",
  date: "2026-06-22",
  introduction: "第一期不追求数量，只选择结果容易判断、使用频率高、能明显节省时间的三个工作流。",
  workflowIds: ["coding-002", "chatgpt-003", "marketing-002"],
  reasons: {
    "coding-002": "报错是否定位、修复是否通过回归测试，结果能够直接验证。",
    "chatgpt-003": "把写文章前最耗时的搜索意图与内容结构工作变成清晰交付物。",
    "marketing-002": "围绕单一转化目标组织页面，避免只堆功能和空泛形容词。"
  }
};
