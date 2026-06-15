import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  BookmarkPlus,
  Building2,
  CheckCircle2,
  Download,
  FileText,
  Lightbulb,
  Link2,
  Save,
  ShieldQuestion,
  Sparkles,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type SectionId =
  | "summary"
  | "profile"
  | "match"
  | "patent"
  | "external"
  | "risk"
  | "conclusion"
  | "appendix";

type Tone = "blue" | "green" | "orange" | "purple" | "red" | "slate";

type ReportTag = {
  label: string;
  tone?: Tone;
};

const toneClasses: Record<Tone, string> = {
  blue: "bg-[#edf4ff] text-[#2f6df6]",
  green: "bg-[#ecfbf4] text-[#18a957]",
  orange: "bg-[#fff7e8] text-[#b96800]",
  purple: "bg-[#f1edff] text-[#7c5cff]",
  red: "bg-[#fff1f1] text-[#ef4444]",
  slate: "bg-[#f2f5fa] text-[#64748b]",
};

const sections: Array<{ id: SectionId; label: string }> = [
  { id: "summary", label: "一、初筛摘要" },
  { id: "profile", label: "二、企业基础画像" },
  { id: "match", label: "三、方向匹配" },
  { id: "patent", label: "四、技术与专利" },
  { id: "external", label: "五、产业化信号" },
  { id: "risk", label: "六、风险与问题" },
  { id: "conclusion", label: "七、结论与动作" },
  { id: "appendix", label: "附录：代表证据" },
];

const report = {
  companyName: "深圳时识科技有限公司",
  title: "深圳时识科技有限公司初筛报告",
  subtitle:
    "基于“存算一体神经形态芯片”企业探索任务生成，用于判断该企业是否值得进一步关注与跟踪。",
  verdict: "建议关注",
  summary:
    "深圳时识科技有限公司在 SNN 异步事件驱动、存算一体和低功耗类脑计算方向存在较明确的公开技术线索。当前可验证证据主要来自相关专利，近三年仍有新增布局，适合先纳入关注，并继续补充产品、客户、融资和产业化进展信息。",
  tags: [
    { label: "SNN" },
    { label: "存算一体" },
    { label: "非上市企业", tone: "green" },
    { label: "专利信号", tone: "orange" },
    { label: "近三年活跃", tone: "purple" },
  ] satisfies ReportTag[],
  profileRows: [
    ["企业名称", "深圳时识科技有限公司", "企业类型", "非上市企业"],
    [
      "所属方向",
      "神经形态芯片、类脑计算",
      "线索来源",
      "专利检索与技术路线识别",
    ],
    [
      "技术标签",
      "SNN 异步事件驱动、存算一体、低功耗类脑计算、事件驱动计算架构",
    ],
    [
      "AI 摘要",
      "该企业与本次任务目标具有较高技术相关性，当前主要证据来自公开专利线索，尚需补充产业化、客户合作和融资信息。",
    ],
  ],
  metrics: [
    { label: "相关专利", value: "12", unit: "件" },
    { label: "近三年新增", value: "3", unit: "件" },
    { label: "核心技术路线", value: "2", unit: "条" },
    { label: "代表证据", value: "3", unit: "条" },
  ],
  routeMatches: [
    { label: "SNN", value: 88, level: "高", tone: "blue" },
    { label: "存算一体", value: 76, level: "高", tone: "green" },
    { label: "类脑芯片", value: 62, level: "中", tone: "orange" },
  ] satisfies Array<{
    label: string;
    value: number;
    level: string;
    tone: Tone;
  }>,
  risks: [
    {
      title: "产业化证据不足",
      desc: "当前公开线索主要集中在专利层面，尚缺少明确客户、产品、产能或收入信息。",
      tone: "orange",
    },
    {
      title: "技术落地路径待验证",
      desc: "SNN 和存算一体方向技术壁垒较高，需确认其方案是否具备工程化、量产化和成本优势。",
      tone: "slate",
    },
    {
      title: "竞争格局待补充",
      desc: "需要与同方向芯片企业、高校转化主体和平台型企业进行任务内对比。",
      tone: "slate",
    },
  ] satisfies Array<{ title: string; desc: string; tone: Tone }>,
  actions: [
    {
      title: "建议关注",
      desc: "加入企业库关注，持续跟踪专利、融资、产品和客户动态。",
      icon: BookmarkPlus,
      tone: "green",
    },
    {
      title: "补充验证",
      desc: "优先补充官网产品、团队背景、客户合作和融资信息。",
      icon: ShieldQuestion,
      tone: "blue",
    },
    {
      title: "暂不入池",
      desc: "当前证据仍以技术线索为主，入池前建议完成产业化信息核验。",
      icon: AlertTriangle,
      tone: "orange",
    },
  ] satisfies Array<{
    title: string;
    desc: string;
    icon: typeof BookmarkPlus;
    tone: Tone;
  }>,
  evidence: [
    {
      title: "代表专利 1",
      desc: "一种面向事件驱动计算的神经形态芯片结构。",
    },
    {
      title: "代表专利 2",
      desc: "一种低功耗脉冲神经网络计算架构。",
    },
    {
      title: "代表专利 3",
      desc: "一种面向边缘智能的异步事件驱动处理方法。",
    },
  ],
  sideInfo: [
    ["生成时间", "2026-04-29", "slate"],
    ["企业类型", "非上市企业", "slate"],
    ["发现来源", "专利线索", "slate"],
    ["初筛结论", "建议关注", "green"],
    ["企业状态", "未关注", "orange"],
    ["入库状态", "未保存", "orange"],
  ] satisfies Array<[string, string, Tone]>,
};

function SectionHeader({
  eyebrow,
  title,
  note,
}: {
  eyebrow?: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-5">
      {eyebrow && (
        <div className="mb-2 text-[12px] font-black uppercase tracking-[0.16em] text-[#2f6df6]">
          {eyebrow}
        </div>
      )}
      <h2 className="m-0 text-[22px] font-black leading-tight text-[#10203f] md:text-[24px]">
        {title}
      </h2>
      {note && (
        <p className="mt-2 text-[14px] leading-[1.7] text-[#6b7890]">{note}</p>
      )}
    </div>
  );
}

function InfoTable() {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[#e2eaf5] bg-white">
      {report.profileRows.map((row) => (
        <div
          key={row[0]}
          className="grid border-b border-[#e2eaf5] last:border-b-0 md:grid-cols-[128px_1fr_128px_1fr]"
        >
          <div className="bg-[#f7f9fd] px-4 py-3 text-[13px] font-bold text-[#6b7890]">
            {row[0]}
          </div>
          <div
            className={`px-4 py-3 text-[14px] leading-[1.7] text-[#23314f] ${
              row.length === 2 ? "md:col-span-3" : ""
            }`}
          >
            {row[1]}
          </div>
          {row.length > 2 && (
            <>
              <div className="bg-[#f7f9fd] px-4 py-3 text-[13px] font-bold text-[#6b7890]">
                {row[2]}
              </div>
              <div className="px-4 py-3 text-[14px] leading-[1.7] text-[#23314f]">
                {row[3]}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function TextCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Lightbulb;
  title: string;
  children: string;
}) {
  return (
    <div className="rounded-[18px] border border-[#e2eaf5] bg-white p-[18px]">
      <h3 className="mb-3 flex items-center gap-2 text-[16px] font-black text-[#10203f]">
        <Icon className="h-4 w-4 text-[#2f6df6]" />
        {title}
      </h3>
      <p className="m-0 text-[14px] leading-[1.8] text-[#33425b]">{children}</p>
    </div>
  );
}

export default function ReportView({ onBack }: { onBack?: () => void }) {
  const [activeSection, setActiveSection] = useState<SectionId>("summary");

  const sectionIds = useMemo(() => sections.map((section) => section.id), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      {
        rootMargin: "-110px 0px -68% 0px",
        threshold: 0,
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#0f1f3d]">
      <div className="mx-auto grid max-w-[1540px] grid-cols-1 gap-[22px] px-4 py-5 md:px-7 md:py-7 xl:grid-cols-[240px_minmax(720px,1fr)_300px]">
        <aside className="hidden xl:block">
          <div className="sticky top-6 rounded-[20px] border border-[#e2eaf5] bg-white p-[18px] shadow-[0_12px_32px_rgba(16,32,64,0.06)]">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="m-0 text-[18px] font-black">报告目录</h2>
              {onBack && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onBack}
                  className="h-8 w-8 rounded-[10px] border-[#dbe4f1]"
                  title="返回"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
            </div>
            <nav className="grid gap-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`rounded-[12px] px-[10px] py-[9px] text-[14px] font-extrabold no-underline transition-colors ${
                    activeSection === section.id
                      ? "bg-[#edf4ff] text-[#2f6df6]"
                      : "text-[#51627c] hover:bg-[#edf4ff] hover:text-[#2f6df6]"
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <article className="min-h-[1200px] rounded-[26px] border border-[#e2eaf5] bg-white px-5 py-7 shadow-[0_12px_32px_rgba(16,32,64,0.06)] md:px-10 md:py-10 xl:px-[46px] xl:py-10">
          <header>
            <div className="mb-[14px] inline-flex h-[30px] items-center rounded-full bg-[#edf4ff] px-3 text-[13px] font-black text-[#2f6df6]">
              初筛报告
            </div>
            <h1 className="m-0 text-[30px] font-black leading-tight tracking-[-0.04em] text-[#0f1f3d] md:text-[38px]">
              {report.title}
            </h1>
            <p className="mt-3 max-w-[880px] text-[15px] leading-[1.8] text-[#6b7890]">
              {report.subtitle}
            </p>
          </header>

          <section
            id="summary"
            className="mt-7 scroll-mt-24 rounded-[20px] border border-[#cfe0ff] bg-[linear-gradient(135deg,#f7faff_0%,#fff_70%)] p-[22px]"
          >
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="m-0 text-[24px] font-black text-[#10203f]">
                一、初筛摘要
              </h2>
              <span className="inline-flex w-fit rounded-full bg-[#ecfbf4] px-3 py-2 text-[13px] font-black text-[#18a957]">
                {report.verdict}
              </span>
            </div>
            <p className="m-0 text-[15px] leading-[1.8] text-[#2e3b55]">
              {report.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {report.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`rounded-full px-[10px] py-[6px] text-[12px] font-extrabold ${toneClasses[tag.tone ?? "blue"]}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </section>

          <section
            id="profile"
            className="mt-8 scroll-mt-24 border-t border-[#e2eaf5] pt-7"
          >
            <SectionHeader
              title="二、企业基础画像"
              note="只保留初筛必要字段，避免将报告做成冗长工商信息页。"
            />
            <InfoTable />
          </section>

          <section
            id="match"
            className="mt-8 scroll-mt-24 border-t border-[#e2eaf5] pt-7"
          >
            <SectionHeader
              title="三、方向匹配与发现原因"
              note="回答“为什么这家公司出现在本次企业探索结果中”。"
            />
            <div className="grid gap-4 lg:grid-cols-2">
              <TextCard icon={Target} title="匹配方向">
                本次任务目标为“存算一体神经形态芯片”，系统识别该企业在
                SNN、事件驱动计算、脉冲神经网络和低功耗类脑计算方向存在相关线索。
              </TextCard>
              <TextCard icon={Sparkles} title="发现原因">
                企业命中多项相关专利，且部分专利为近三年新增，说明其在目标技术路线下仍有持续布局，适合进入关注名单。
              </TextCard>
            </div>
          </section>

          <section
            id="patent"
            className="mt-8 scroll-mt-24 border-t border-[#e2eaf5] pt-7"
          >
            <SectionHeader
              title="四、技术与专利线索"
              note="本章节复用当前已打通的专利统计、相关性识别和代表证据抽取能力。"
            />
            <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {report.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[16px] border border-[#e2eaf5] bg-[#fbfcff] p-[15px]"
                >
                  <div className="mb-2 text-[13px] text-[#6b7890]">
                    {metric.label}
                  </div>
                  <div className="text-[28px] font-black leading-none text-[#2f6df6]">
                    {metric.value}
                    <span className="ml-1 text-[13px] font-bold text-[#6b7890]">
                      {metric.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[18px] border border-[#e2eaf5] bg-white p-[18px]">
                <h3 className="mb-4 flex items-center gap-2 text-[16px] font-black text-[#10203f]">
                  <Link2 className="h-4 w-4 text-[#2f6df6]" />
                  技术路线相关性
                </h3>
                <div className="grid gap-3">
                  {report.routeMatches.map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-[96px_1fr_38px] items-center gap-3 text-[13px] text-[#33425b]"
                    >
                      <span className="font-bold">{item.label}</span>
                      <div className="h-[9px] overflow-hidden rounded-full bg-[#eef3fa]">
                        <div
                          className={`h-full rounded-full ${
                            item.tone === "green"
                              ? "bg-[#18b979]"
                              : item.tone === "orange"
                                ? "bg-[#f59e0b]"
                                : "bg-[#2f6df6]"
                          }`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                      <b>{item.level}</b>
                    </div>
                  ))}
                </div>
              </div>
              <TextCard icon={Lightbulb} title="AI 技术摘要">
                相关专利集中在事件驱动计算、脉冲神经网络和低功耗架构方向，与本次任务中的“神经形态芯片”和“存算一体”目标具有较强关联。
              </TextCard>
            </div>
          </section>

          <section
            id="external"
            className="mt-8 scroll-mt-24 border-t border-[#e2eaf5] pt-7"
          >
            <SectionHeader
              title="五、产业化与外部信号"
              note="当前仅展示可观察到的公开线索，不强行生成产业化结论。"
            />
            <div className="grid gap-4 lg:grid-cols-2">
              <TextCard icon={CheckCircle2} title="已观察到的信号">
                当前主要外部信号来自专利布局。暂未在本样例中展示明确融资、客户、产能或产品交付信号。
              </TextCard>
              <TextCard icon={Building2} title="产业化判断">
                该企业具备技术线索，但商业化状态仍需进一步验证。建议后续补充官网、融资、客户合作、产品发布和团队背景等信息。
              </TextCard>
            </div>
          </section>

          <section
            id="risk"
            className="mt-8 scroll-mt-24 border-t border-[#e2eaf5] pt-7"
          >
            <SectionHeader title="六、风险点与待验证问题" />
            <div className="grid gap-3">
              {report.risks.map((risk) => (
                <div
                  key={risk.title}
                  className={`rounded-[16px] border p-[15px] ${
                    risk.tone === "orange"
                      ? "border-[#ffe2ac] bg-[#fff7e8]"
                      : "border-[#e2eaf5] bg-[#fbfcff]"
                  }`}
                >
                  <strong className="mb-1 block text-[15px] text-[#10203f]">
                    {risk.title}
                  </strong>
                  <p className="m-0 text-[14px] leading-[1.75] text-[#6b7890]">
                    {risk.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="conclusion"
            className="mt-8 scroll-mt-24 border-t border-[#e2eaf5] pt-7"
          >
            <SectionHeader
              title="七、初筛结论与建议动作"
              note="本报告不直接给出投资建议，只判断是否值得进入下一层关注与验证。"
            />
            <div className="grid gap-3 lg:grid-cols-3">
              {report.actions.map((action) => {
                const Icon = action.icon;
                return (
                  <div
                    key={action.title}
                    className="rounded-[16px] border border-[#e2eaf5] bg-[#fbfcff] p-[15px]"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={`rounded-[10px] p-2 ${toneClasses[action.tone]}`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <strong className="text-[15px] text-[#10203f]">
                        {action.title}
                      </strong>
                    </div>
                    <p className="m-0 text-[14px] leading-[1.75] text-[#6b7890]">
                      {action.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section
            id="appendix"
            className="mt-8 scroll-mt-24 border-t border-[#e2eaf5] pt-7"
          >
            <SectionHeader title="附录：代表性证据" />
            <div className="grid gap-3">
              {report.evidence.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[16px] border border-[#e2eaf5] bg-[#fbfcff] p-[15px]"
                >
                  <strong className="mb-1 block text-[15px] text-[#10203f]">
                    {item.title}
                  </strong>
                  <p className="m-0 text-[14px] leading-[1.75] text-[#6b7890]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="grid gap-4 xl:sticky xl:top-6 xl:self-start">
          <section className="rounded-[20px] border border-[#e2eaf5] bg-white p-[18px] shadow-[0_12px_32px_rgba(16,32,64,0.06)] xl:hidden">
            <h2 className="mb-3 text-[18px] font-black">报告目录</h2>
            <nav className="grid gap-1 sm:grid-cols-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`rounded-[12px] px-[10px] py-[9px] text-[14px] font-extrabold no-underline transition-colors ${
                    activeSection === section.id
                      ? "bg-[#edf4ff] text-[#2f6df6]"
                      : "text-[#51627c] hover:bg-[#edf4ff] hover:text-[#2f6df6]"
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </section>

          <section className="rounded-[20px] border border-[#e2eaf5] bg-white p-[18px] shadow-[0_12px_32px_rgba(16,32,64,0.06)]">
            <h2 className="mb-3 text-[18px] font-black">报告信息</h2>
            <div className="grid gap-0">
              {report.sideInfo.map(([label, value, tone]) => (
                <div
                  key={label}
                  className="grid grid-cols-[88px_1fr] gap-3 border-b border-[#e2eaf5] py-[10px] text-[13px] last:border-b-0"
                >
                  <div className="text-[#6b7890]">{label}</div>
                  <div
                    className={`font-black ${toneClasses[tone]} w-fit rounded-full px-2 py-0.5`}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[20px] border border-[#e2eaf5] bg-white p-[18px] shadow-[0_12px_32px_rgba(16,32,64,0.06)]">
            <h2 className="mb-3 text-[18px] font-black">报告操作</h2>
            <div className="grid gap-[10px]">
              <Button className="h-[42px] rounded-[13px] bg-[#18a957] font-extrabold text-white shadow-[0_10px_18px_rgba(24,169,87,0.16)] hover:bg-[#15934c]">
                <BookmarkPlus className="mr-2 h-4 w-4" />
                关注企业
              </Button>
              <Button
                variant="outline"
                className="h-[42px] rounded-[13px] border-[#cfe0ff] font-extrabold text-[#2f6df6] hover:bg-[#edf4ff]"
              >
                <Save className="mr-2 h-4 w-4" />
                保存到报告库
              </Button>
              <Button
                onClick={() => window.print()}
                className="h-[42px] rounded-[13px] bg-[#2f6df6] font-extrabold text-white shadow-[0_10px_18px_rgba(47,109,246,0.18)] hover:bg-[#1d4ed8]"
              >
                <Download className="mr-2 h-4 w-4" />
                导出 PDF
              </Button>
            </div>
          </section>

          <section className="rounded-[20px] border border-[#e2eaf5] bg-[#fbfcff] p-[18px]">
            <div className="mb-2 flex items-center gap-2 text-[14px] font-black text-[#10203f]">
              <FileText className="h-4 w-4 text-[#2f6df6]" />
              报告口径
            </div>
            <p className="m-0 text-[12px] leading-[1.65] text-[#6b7890]">
              初筛报告用于企业发现后的快速判断，只呈现可验证线索、关键风险和下一步动作建议。
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
