import {
  ArrowDown,
  Bot,
  Braces,
  CheckCircle2,
  FileOutput,
  GitBranch,
  Layers3,
  MessageSquareText,
  PackageCheck,
  Workflow,
} from "lucide-react";

const workflowSteps = [
  { label: "输入业务信息", detail: "产品、用户与目标", icon: MessageSquareText },
  { label: "套用工作流", detail: "角色、约束与步骤", icon: Workflow },
  { label: "AI 执行", detail: "支持主流模型", icon: Bot },
  { label: "质量自检", detail: "按标准检查结果", icon: CheckCircle2 },
  { label: "交付成果", detail: "模板化输出", icon: FileOutput },
];

const anatomy = [
  { name: "Role", value: "定义专业身份与判断视角" },
  { name: "Goal", value: "明确最终要交付的结果" },
  { name: "Context", value: "补充业务背景与已知信息" },
  { name: "Constraints", value: "规定边界、标准与禁区" },
  { name: "Workflow", value: "把任务拆成可执行步骤" },
  { name: "Output", value: "固定输出格式，方便直接使用" },
  { name: "Examples", value: "通过样例对齐预期质量" },
  { name: "Evaluation", value: "检查事实、逻辑与完整性" },
];

const stack = [
  { label: "Prompt", status: "现在", icon: Braces },
  { label: "Workflow", status: "现在", icon: Workflow },
  { label: "Knowledge", status: "下一阶段", icon: Layers3 },
  { label: "Agent", status: "未来", icon: Bot },
  { label: "Automation", status: "未来", icon: GitBranch },
  { label: "Digital Asset", status: "长期", icon: PackageCheck },
];

export function HomepageValueSections() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-emerald-700">工作流如何产生结果</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">
              从一次聊天，变成可以重复运行的系统
            </h2>
            <p className="mt-4 leading-7 text-zinc-600">
              用户不需要研究 Prompt Engineering，只需提供业务信息。工作流负责组织上下文、执行步骤和质量标准。
            </p>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
            {workflowSteps.map(({ label, detail, icon: Icon }, index) => (
              <div className="contents" key={label}>
                <div className="min-h-32 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <Icon className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                  <h3 className="mt-4 font-bold text-zinc-950">{label}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">{detail}</p>
                </div>
                {index < workflowSteps.length - 1 ? (
                  <ArrowDown
                    className="mx-auto h-5 w-5 text-zinc-400 lg:-rotate-90"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-8">
          <div>
            <p className="text-sm font-bold text-emerald-700">Prompt Anatomy</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">不只让你复制，也让你理解</h2>
            <p className="mt-4 leading-7 text-zinc-600">
              每个精选 Prompt 都按照统一结构拆解。你能看见它为什么有效、什么时候使用，以及如何根据自己的场景修改。
            </p>
            <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm font-bold text-emerald-800">价值不在文字长度</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                真正的质量来自清晰目标、充分背景、合理约束、稳定流程和可验证的输出标准。
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {anatomy.map((item, index) => (
              <div className="rounded-lg border border-zinc-200 bg-white p-4" key={item.name}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-mono text-sm font-bold text-emerald-700">{item.name}</h3>
                  <span className="text-xs font-bold text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-emerald-700">产品演进路线</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">Prompt 是入口，数字工作资产才是终点</h2>
            <p className="mt-4 leading-7 text-zinc-600">
              PromptHub 当前专注 Prompt 与 Workflow。知识库、Agent 和自动化是后续方向，不把尚未完成的能力包装成现有产品。
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {stack.map(({ label, status, icon: Icon }) => (
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4" key={label}>
                <Icon className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                <h3 className="mt-4 font-bold text-zinc-950">{label}</h3>
                <p className="mt-2 text-xs font-bold text-zinc-500">{status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
