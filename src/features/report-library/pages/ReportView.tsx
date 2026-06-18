import { type ReactNode, useEffect, useMemo, useState } from "react";
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
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type SectionId =
  | "summary"
  | "profile"
  | "match"
  | "tech"
  | "potential"
  | "industrial"
  | "risk"
  | "action"
  | "appendix";

type Tone = "blue" | "green" | "orange" | "purple" | "red" | "slate";

type InfoRow = {
  leftKey: string;
  leftValue: ReactNode;
  rightKey?: string;
  rightValue?: ReactNode;
};

const toneClasses: Record<Tone, string> = {
  blue: "bg-[#edf4ff] text-[#2f6df6]",
  green: "bg-[#eaf8f0] text-[#18ad62]",
  orange: "bg-[#fff3df] text-[#c87910]",
  purple: "bg-[#f1edff] text-[#7655d7]",
  red: "bg-[#fff0f0] text-[#dc4b4b]",
  slate: "bg-[#eef2f7] text-[#607089]",
};

const fillClasses: Record<Exclude<Tone, "purple" | "red" | "slate">, string> =
  {
    blue: "bg-[#2f6df6]",
    green: "bg-[#18ad62]",
    orange: "bg-[#f59e0b]",
  };

const sections: Array<{ id: SectionId; label: string }> = [
  { id: "summary", label: "初筛摘要" },
  { id: "profile", label: "企业基础画像" },
  { id: "match", label: "发现原因与方向匹配" },
  { id: "tech", label: "技术与专利信号" },
  { id: "potential", label: "成长潜力" },
  { id: "industrial", label: "产业化与竞争力" },
  { id: "risk", label: "声誉与风险" },
  { id: "action", label: "结论与建议动作" },
  { id: "appendix", label: "附录" },
];

const report = {
  companyName: "深圳珈钠能源科技有限公司",
  task: "钠离子电池正极材料",
  subtitle:
    "基于“钠离子电池正极材料”企业探索任务生成，用于判断该企业是否值得进入下一步关注、入池和持续跟踪。",
  summary:
    "该企业与“钠离子电池正极材料”方向高度相关，公开专利、融资和产业化布局均有可验证线索，适合纳入关注并继续补充客户、产线和核心专利授权进展。",
  sideInfo: [
    ["生成时间", "2026-04-29", "slate"],
    ["企业类型", "非上市企业", "slate"],
    ["发现来源", "专利线索", "slate"],
    ["初筛结论", "建议关注", "green"],
    ["企业状态", "未关注", "orange"],
    ["入库状态", "未保存", "orange"],
  ] satisfies Array<[string, string, Tone]>,
  taskRows: [
    ["发现任务", "钠离子电池正极材料"],
    ["主要来源", "专利线索、融资新闻、标准资质"],
    ["生成时间", "2026-04-29"],
  ],
  profileRows: [
    {
      leftKey: "企业名称",
      leftValue: "深圳珈钠能源科技有限公司",
      rightKey: "登记状态",
      rightValue: "存续",
    },
    {
      leftKey: "成立日期",
      leftValue: "2022-04-13",
      rightKey: "注册资本",
      rightValue: "555.7251万元人民币",
    },
    {
      leftKey: "注册地址",
      leftValue:
        "深圳市龙岗区宝龙街道同乐社区深汕路340-352号黄江实业B栋深汕路350号",
    },
    {
      leftKey: "主营方向",
      leftValue:
        "钠离子电池关键材料、正极材料、负极材料、储能技术服务、新材料研发制造",
    },
    {
      leftKey: "企业标签",
      leftValue: (
        <TagList
          tags={[
            ["高新技术企业", "green"],
            ["科技型中小企业", "blue"],
            ["创新型中小企业", "blue"],
            ["股权转让", "orange"],
            ["小微企业", "slate"],
          ]}
        />
      ),
    },
  ] satisfies InfoRow[],
  routeMatches: [
    { label: "聚阴离子正极", value: 92, level: "高", tone: "blue" },
    { label: "硫酸铁钠材料", value: 82, level: "高", tone: "green" },
    { label: "水系正极浆料", value: 66, level: "中", tone: "orange" },
  ] satisfies Array<{
    label: string;
    value: number;
    level: string;
    tone: "blue" | "green" | "orange";
  }>,
  metrics: [
    { label: "产业相关专利", value: "96件", desc: "集中于钠电材料" },
    { label: "发明类专利", value: "80件", desc: "授权、公开、申请合计" },
    { label: "有效专利", value: "45件", desc: "另有49件处于实审" },
    { label: "专利转入", value: "3件", desc: "转入方为武汉大学" },
  ],
  appendix: {
    business: [
      {
        leftKey: "法定代表人",
        leftValue: "范海满",
        rightKey: "统一社会信用代码",
        rightValue: "91440300MA5H9N9M0R",
      },
      {
        leftKey: "企业类型",
        leftValue: "有限责任公司",
        rightKey: "行业",
        rightValue: "其他制造业",
      },
      {
        leftKey: "参保人数",
        leftValue: "46",
        rightKey: "官网",
        rightValue: "http://www.janaenergy.com",
      },
      {
        leftKey: "经营范围",
        leftValue:
          "电子专用材料研发、制造、销售；储能技术服务；新材料技术研发；新兴能源技术研发；电池制造；电池销售；技术服务、技术开发、技术咨询等。",
      },
    ] satisfies InfoRow[],
    patents: [
      [
        "CN119100348B",
        "一种纳米态聚阴离子型钠离子电池正极材料及其制备方法",
        "聚阴离子正极材料",
        "代表性核心专利",
      ],
      [
        "CN118782744A",
        "钠离子电池水系正极浆料及其制备方法、正极片",
        "水系浆料工艺",
        "产业化工艺相关",
      ],
      [
        "CN119503750A",
        "聚阴离子型钠离子电池正极材料用前驱体及其制备方法",
        "前驱体制备",
        "材料制备链条",
      ],
      [
        "CN119176583A",
        "一种钠离子电池硫酸铁钠复合正极材料的制备方法",
        "硫酸铁钠材料",
        "任务高度相关",
      ],
      [
        "CN120261457A",
        "单晶颗粒状聚阴离子型钠离子电池正极材料的制备方法",
        "单晶颗粒正极",
        "正极结构优化",
      ],
    ],
    financing: [
      ["2024-03-05", "A轮", "数亿元人民币", "自贡高投、超威集团、相城金控等", "产业化扩张相关"],
      ["2023-08-23", "Pre-A+轮", "未披露", "春华资本、顺为资本", "一线机构参与"],
      ["2023-01-11", "Pre-A轮", "数千万元人民币", "光合创投、春华资本", "早期融资"],
      ["2022-08-10", "天使轮", "数千万元人民币", "顺为资本", "早期背书"],
    ],
    qualifications: [
      [
        "标准",
        "钠离子电池性能、储能用钠离子电池、动力用钠离子电池等团体标准",
        "2023-2024，现行",
        "行业规范参与度",
      ],
      ["证书", "高新技术企业证书", "2024-12-26至2027-12-26", "创新企业资质"],
      [
        "证书",
        "企业知识产权管理体系认证",
        "2025-03-20至2028-03-19",
        "知识产权管理能力",
      ],
      [
        "对外投资",
        "成都珈钠能源科技有限公司、自贡珈钠新材料科技有限公司、武汉珈钠能源科技有限公司等",
        "多为控股",
        "多地产业布局",
      ],
    ],
    publicSignals: [
      ["2026-01-26", "专利新闻", "申请高温电解液及其制备方法与钠离子电池专利", "技术持续更新"],
      ["2026-01-19", "合作新闻", "珈钠能源与好电科技达成战略合作", "客户/合作验证入口"],
      ["2024-10-29", "项目", "复合磷酸铁钠材料加工检测项目", "材料检测与项目线索"],
      ["2024-05-10", "招标公告", "钠离子电池聚阴离子正极材料开发与产业化项目", "产业化验证入口"],
    ],
  },
};

function TagList({ tags }: { tags: Array<[string, Tone]> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(([label, tone]) => (
        <span key={label}>
          <Badge tone={tone}>{label}</Badge>
        </span>
      ))}
    </div>
  );
}

function Badge({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-[11px] py-[7px] text-[12px] font-black leading-none ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

function Panel({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[22px] border border-[#dfe7f2] bg-white/95 p-5 shadow-[0_8px_20px_rgba(18,35,68,0.05)] ${className}`}
    >
      {title && (
        <h2 className="mb-[15px] text-[20px] font-black leading-tight text-[#0c1d3a]">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

function SectionHeader({
  title,
  note,
  badge,
  tone = "blue",
}: {
  title: string;
  note?: string;
  badge?: string;
  tone?: Tone;
}) {
  return (
    <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
      <div>
        <h2 className="m-0 text-[22px] font-black leading-[1.35] tracking-[-0.01em] text-[#0b1b35] md:text-[24px]">
          {title}
        </h2>
        {note && (
          <p className="mt-[5px] text-[13px] leading-[1.7] text-[#61708a]">
            {note}
          </p>
        )}
      </div>
      {badge && <Badge tone={tone}>{badge}</Badge>}
    </div>
  );
}

function ReportSection({
  id,
  first = false,
  children,
}: {
  id: SectionId;
  first?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 ${
        first ? "" : "mt-7 border-t border-[#dfe7f2] pt-7"
      }`}
    >
      {children}
    </section>
  );
}

function InfoTable({ rows }: { rows: InfoRow[] }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[#dfe7f2] bg-white text-[14px]">
      {rows.map((row) => (
        <div
          key={row.leftKey}
          className="grid border-b border-[#dfe7f2] last:border-b-0 md:grid-cols-[130px_1fr_130px_1fr]"
        >
          <div className="bg-[#f7f9fd] px-[14px] py-[13px] font-extrabold text-[#61708a]">
            {row.leftKey}
          </div>
          <div
            className={`px-[14px] py-[13px] font-semibold leading-[1.75] text-[#23324b] ${
              row.rightKey ? "" : "md:col-span-3"
            }`}
          >
            {row.leftValue}
          </div>
          {row.rightKey && (
            <>
              <div className="bg-[#f7f9fd] px-[14px] py-[13px] font-extrabold text-[#61708a]">
                {row.rightKey}
              </div>
              <div className="px-[14px] py-[13px] font-semibold leading-[1.75] text-[#23324b]">
                {row.rightValue}
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
  badge,
  tone = "blue",
}: {
  icon?: LucideIcon;
  title: string;
  children: ReactNode;
  badge?: string;
  tone?: Tone;
}) {
  return (
    <div className="rounded-[18px] border border-[#dfe7f2] bg-white p-4">
      <div className="mb-[10px] flex flex-wrap items-center gap-2">
        {badge && <Badge tone={tone}>{badge}</Badge>}
        {Icon && <Icon className="h-4 w-4 text-[#2f6df6]" />}
        <h3 className="m-0 text-[17px] font-black text-[#0b1b35]">{title}</h3>
      </div>
      <p className="m-0 text-[14px] leading-[1.75] text-[#43526b]">
        {children}
      </p>
    </div>
  );
}

function EvidenceCard({
  type,
  title,
  children,
  source,
}: {
  type: string;
  title: string;
  children: ReactNode;
  source?: string;
}) {
  return (
    <div className="grid gap-[14px] rounded-[18px] border border-[#dfe7f2] bg-[#fbfcff] p-4 md:grid-cols-[110px_1fr]">
      <div className="flex items-center gap-[7px] text-[13px] font-black text-[#2f6df6]">
        <span className="h-2 w-2 rounded-full bg-[#2f6df6]" />
        {type}
      </div>
      <div>
        <strong className="mb-1 block text-[#162744]">{title}</strong>
        <p className="m-0 text-[14px] leading-[1.75] text-[#43526b]">
          {children}
        </p>
        {source && (
          <small className="mt-[5px] block text-[12px] text-[#8793a8]">
            证据来源：{source}
          </small>
        )}
      </div>
    </div>
  );
}

function RouteBars() {
  return (
    <div className="grid gap-3">
      {report.routeMatches.map((item) => (
        <div
          key={item.label}
          className="grid grid-cols-[110px_1fr_42px] items-center gap-3 text-[13px] text-[#33435d] md:grid-cols-[150px_1fr_58px]"
        >
          <span>{item.label}</span>
          <div className="h-[10px] overflow-hidden rounded-full bg-[#edf2f8]">
            <div
              className={`h-full rounded-full ${fillClasses[item.tone]}`}
              style={{ width: `${item.value}%` }}
            />
          </div>
          <b>{item.level}</b>
        </div>
      ))}
    </div>
  );
}

function MetricCard({
  label,
  value,
  desc,
}: {
  label: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="rounded-[18px] border border-[#dfe7f2] bg-[#fbfcff] p-4">
      <div className="mb-[7px] text-[13px] font-extrabold text-[#8793a8]">
        {label}
      </div>
      <div className="text-[20px] font-black text-[#0f1f3d]">{value}</div>
      <div className="mt-1 text-[12px] text-[#61708a]">{desc}</div>
    </div>
  );
}

function RiskCard({
  level,
  tone,
  title,
  children,
  next,
}: {
  level: string;
  tone: "green" | "orange" | "red";
  title: string;
  children: ReactNode;
  next: string;
}) {
  return (
    <div className="grid gap-[14px] rounded-[18px] border border-[#dfe7f2] bg-white p-4 md:grid-cols-[110px_1fr_92px]">
      <div
        className={`text-[13px] font-black ${
          tone === "green"
            ? "text-[#18ad62]"
            : tone === "red"
              ? "text-[#dc4b4b]"
              : "text-[#c87910]"
        }`}
      >
        {level}
      </div>
      <div>
        <strong className="mb-1 block text-[#0b1b35]">{title}</strong>
        <p className="m-0 text-[14px] leading-[1.75] text-[#43526b]">
          {children}
        </p>
      </div>
      <small className="text-[12px] leading-[1.6] text-[#8793a8]">
        下一步：{next}
      </small>
    </div>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-auto rounded-[18px] border border-[#dfe7f2] bg-white">
      <table className="w-full min-w-[760px] border-collapse text-[13px]">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-[#dfe7f2] bg-[#f7f9fd] px-[13px] py-3 text-left font-black text-[#61708a]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, index) => (
                <td
                  key={`${cell}-${index}`}
                  className={`border-b border-[#dfe7f2] px-[13px] py-3 align-top text-[#263650] last:border-b-0 ${
                    index === 0 ? "font-black text-[#0b1b35]" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AppendixDetails({
  title,
  open = false,
  children,
}: {
  title: string;
  open?: boolean;
  children: ReactNode;
}) {
  return (
    <details
      open={open}
      className="overflow-hidden rounded-[18px] border border-[#dfe7f2] bg-white"
    >
      <summary className="cursor-pointer list-none bg-[#fbfcff] px-[18px] py-[15px] font-black text-[#0b1b35] marker:hidden">
        {title}
      </summary>
      <div className="px-[18px] pb-[18px]">{children}</div>
    </details>
  );
}

function Toc({
  activeSection,
  onBack,
}: {
  activeSection: SectionId;
  onBack?: () => void;
}) {
  return (
    <Panel>
      <div className="mb-[15px] flex items-center justify-between gap-2">
        <h2 className="m-0 text-[20px] font-black leading-tight text-[#0c1d3a]">
          报告目录
        </h2>
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
            className={`rounded-[12px] border px-[10px] py-[9px] text-[13px] font-extrabold no-underline transition-colors ${
              activeSection === section.id
                ? "border-[#dbe9ff] bg-[#edf4ff] text-[#2f6df6]"
                : "border-transparent text-[#50617c] hover:border-[#dbe9ff] hover:bg-[#edf4ff] hover:text-[#2f6df6]"
            }`}
          >
            {section.label}
          </a>
        ))}
      </nav>
    </Panel>
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
        rootMargin: "-120px 0px -68% 0px",
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
    <main
      className="min-h-screen text-[#0f1f3d]"
      style={{
        background:
          "radial-gradient(circle at 8% -6%, rgba(47,109,246,.10), transparent 30%), radial-gradient(circle at 90% 3%, rgba(24,173,98,.06), transparent 26%), #f4f7fb",
      }}
    >
      <div className="mx-auto grid max-w-[1540px] grid-cols-1 items-start gap-[22px] px-4 py-5 md:px-[26px] md:py-6 xl:grid-cols-[230px_minmax(760px,1fr)_326px]">
        <aside className="hidden xl:sticky xl:top-5 xl:block">
          <Toc activeSection={activeSection} onBack={onBack} />
        </aside>

        <article className="overflow-hidden rounded-[26px] border border-[#dfe7f2] bg-white/95 px-5 py-7 shadow-[0_14px_36px_rgba(18,35,68,0.07)] md:px-[46px] md:py-[38px]">
          <header className="mb-[26px] border-b border-[#dfe7f2] pb-6">
            <div className="mb-4 flex flex-col justify-between gap-3 text-[12px] font-extrabold tracking-[0.01em] text-[#61708a] sm:flex-row sm:items-center">
              <div className="flex items-center gap-[9px]">
                <span className="h-[9px] w-[9px] rounded-full bg-[#2f6df6] shadow-[0_0_0_6px_#edf4ff]" />
                <span>suwen.ai industrial Intelligence</span>
              </div>
              <span>企业发现 · 初筛报告</span>
            </div>

            <div className="grid gap-[22px] lg:grid-cols-[1fr_300px]">
              <div>
                <div className="mb-3 inline-flex h-[30px] items-center rounded-full bg-[#edf4ff] px-3 text-[13px] font-black text-[#2f6df6]">
                  企业初筛报告
                </div>
                <h1 className="m-0 text-[30px] font-black leading-[1.22] tracking-[-0.02em] text-[#0b1b35] md:text-[36px]">
                  {report.companyName}
                </h1>
                <p className="mt-[10px] max-w-[920px] text-[15px] leading-[1.75] text-[#61708a]">
                  {report.subtitle}
                </p>
              </div>

              <div className="grid min-w-0 gap-[10px] rounded-[18px] border border-[#dfe7f2] bg-[#f8fbff] p-4">
                {report.taskRows.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[86px_1fr] gap-[10px] border-b border-[#edf2f8] pb-[9px] text-[13px] last:border-b-0 last:pb-0"
                  >
                    <div className="text-[#8793a8]">{label}</div>
                    <div className="font-black text-[#0f1f3d]">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </header>

          <ReportSection id="summary" first>
            <div className="rounded-[24px] border border-[#cfe0ff] bg-[linear-gradient(135deg,#f7fbff_0%,#fff_70%)] p-[22px] shadow-[0_12px_28px_rgba(47,109,246,0.05)]">
              <div className="mb-[18px] grid gap-[18px] lg:grid-cols-[1fr_160px]">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-[10px]">
                    <strong className="text-[21px] text-[#0b1b35]">
                      初筛摘要
                    </strong>
                    <Badge tone="green">建议关注</Badge>
                    <Badge tone="orange">进入候选池</Badge>
                  </div>
                  <p className="mb-2 text-[16px] font-extrabold leading-[1.7] text-[#1e2f4f]">
                    {report.summary}
                  </p>
                  <p className="text-[14px] leading-[1.7] text-[#61708a]">
                    本报告不直接形成投资建议，只用于企业发现后的快速判断和下一步验证安排。
                  </p>
                </div>
                <div className="grid content-center gap-2 rounded-[18px] border border-[#d8e6ff] bg-white p-4 text-center">
                  <div className="text-[12px] font-extrabold text-[#8793a8]">
                    初筛结论
                  </div>
                  <div className="text-[26px] font-black tracking-[-0.02em] text-[#18ad62]">
                    关注
                  </div>
                  <div className="text-[12px] text-[#61708a]">
                    优先跟踪产业化进展
                  </div>
                </div>
              </div>

              <div className="grid gap-3 lg:grid-cols-3">
                <TextCard badge="亮点" tone="green" title="技术方向聚焦">
                  相关线索集中在聚阴离子型正极材料、硫酸铁钠、水系正极浆料、前驱体制备等方向，与任务目标高度一致。
                </TextCard>
                <TextCard badge="亮点" tone="green" title="融资与股东背书">
                  已披露多轮融资，投资方包括顺为资本、春华资本、超威集团、自贡高投等财务和产业资源。
                </TextCard>
                <TextCard badge="待验证" tone="orange" title="商业化仍需核验">
                  公开线索显示产线和合作进展，但真实产能利用率、客户订单、收入规模和核心专利授权仍需进一步确认。
                </TextCard>
              </div>
            </div>
          </ReportSection>

          <ReportSection id="profile">
            <SectionHeader
              title="企业基础画像"
              note="只展示初筛所需字段，完整工商数据放入附录。"
              badge="非上市企业"
              tone="blue"
            />
            <InfoTable rows={report.profileRows} />
            <div className="mt-[14px] grid gap-[10px]">
              <EvidenceCard type="主体确认" title="企业状态存续，主营业务与钠电材料相关">
                工商经营范围包含电子专用材料研发、制造、销售，储能技术服务，新材料技术研发，电池制造和销售等内容。
              </EvidenceCard>
              <EvidenceCard type="初筛备注" title="核心技术背景明确">
                已知备注显示公司董事长为武汉大学教授、钠电池领域专家，适合在后续验证中重点核查团队和高校技术转化关系。
              </EvidenceCard>
            </div>
          </ReportSection>

          <ReportSection id="match">
            <SectionHeader
              title="发现原因与方向匹配"
              note="把结论和证据放在同一章节，回答“为什么这家公司出现在本次企业探索结果中”。"
              badge="相关性高"
              tone="green"
            />
            <div className="grid gap-[14px] lg:grid-cols-2">
              <TextCard icon={Target} title="方向判断">
                公司公开专利和业务描述均集中在钠离子电池材料，尤其是聚阴离子型钠电正极、硫酸铁钠复合正极、水系正极浆料等与本次任务高度相关的子方向。
              </TextCard>
              <div className="rounded-[18px] border border-[#dfe7f2] bg-white p-4">
                <h3 className="mb-[10px] flex items-center gap-2 text-[17px] font-black text-[#0b1b35]">
                  <Link2 className="h-4 w-4 text-[#2f6df6]" />
                  路线覆盖
                </h3>
                <RouteBars />
              </div>
            </div>
            <div className="mt-[14px] grid gap-[10px]">
              <EvidenceCard
                type="专利证据"
                title="产业相关专利集中在钠电正极材料"
                source="专利检索与技术路线识别"
              >
                相关专利覆盖单晶制备、预钠化、高导电率改性、低孔隙率调控、水系浆料工艺等关键子方向。
              </EvidenceCard>
              <EvidenceCard
                type="业务证据"
                title="产品描述与任务方向一致"
                source="产品/业务信息与融资报道"
              >
                公开业务描述包括“钠离子电池关键材料生产商”“钠离子电池系统”等，能够支撑其进入本次企业探索列表。
              </EvidenceCard>
            </div>
          </ReportSection>

          <ReportSection id="tech">
            <SectionHeader
              title="技术与专利信号"
              note="正文只保留判断所需的技术证据，专利长表放入附录。"
              badge="技术信号强"
              tone="green"
            />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {report.metrics.map((metric) => (
                <div key={metric.label}>
                  <MetricCard {...metric} />
                </div>
              ))}
            </div>
            <div className="mt-[14px] grid gap-[14px] lg:grid-cols-2">
              <TextCard icon={Lightbulb} title="技术判断">
                企业技术布局呈现明显聚焦，近年专利主要围绕钠离子电池正极材料及其前驱体制备展开，具备较强研发连续性和工程转化指向。
              </TextCard>
              <TextCard icon={AlertTriangle} title="需要注意">
                多数产业相关专利仍处于公开或实审阶段，高被引专利较少，说明专利确权进展和行业影响力仍需持续跟踪。
              </TextCard>
            </div>
            <div className="mt-[14px] grid gap-[10px]">
              <EvidenceCard
                type="代表专利"
                title="纳米态聚阴离子型钠离子电池正极材料及其制备方法"
              >
                该类专利直接对应聚阴离子型正极材料，是当前任务下的重要技术证据。
              </EvidenceCard>
              <EvidenceCard
                type="代表专利"
                title="钠离子电池水系正极浆料及其制备方法、正极片"
              >
                该专利指向正极浆料工艺和正极片制备，体现材料体系向产业化工艺环节延伸。
              </EvidenceCard>
              <EvidenceCard
                type="技术标签"
                title="聚阴离子型正极材料、硫酸铁钠、预钠化、水系浆料、前驱体"
              >
                关键词显示技术布局并非泛化电池概念，而是较集中地命中钠电池材料核心环节。
              </EvidenceCard>
            </div>
          </ReportSection>

          <ReportSection id="potential">
            <SectionHeader
              title="成长潜力：团队、融资、股东"
              note="聚焦团队背景、融资质量和股东结构三类证据，用于判断企业成长潜力。"
              badge="成长信号较强"
              tone="green"
            />
            <div className="grid gap-[14px] lg:grid-cols-2">
              <TextCard icon={Sparkles} title="团队判断">
                创始人与核心技术团队具备钠电池材料领域背景，其中曹余良为武汉大学教授，在钠离子电池材料方向有长期积累。后续需要补充其他经营、量产和市场团队成员信息。
              </TextCard>
              <TextCard icon={CheckCircle2} title="融资判断">
                公司从天使轮、Pre-A、Pre-A+到A轮已有连续融资记录，投资方包含财务机构、产业方和地方基金，说明其在产业资本侧已有一定认可。
              </TextCard>
            </div>
            <div className="mt-[14px] grid gap-[10px]">
              <EvidenceCard type="团队证据" title="曹余良：武汉大学教授、钠离子电池材料专家">
                技术创始人背景与公司主营方向匹配，是该企业进入关注名单的重要依据。
              </EvidenceCard>
              <EvidenceCard type="融资证据" title="2024年完成数亿元A轮融资">
                投资方包括自贡高投、超威集团、相城金控等，能够支持材料企业后续中试、产线和客户验证。
              </EvidenceCard>
              <EvidenceCard type="股东证据" title="股东中包含顺为、春华、地方产业基金等机构">
                股东结构显示其同时获得早期财务投资和地方产业资源支持。
              </EvidenceCard>
            </div>
          </ReportSection>

          <ReportSection id="industrial">
            <SectionHeader
              title="产业化与竞争力信号"
              note="聚合标准、资质、对外投资、项目和经营线索，用于判断产业化基础与竞争力。"
              badge="继续验证"
              tone="orange"
            />
            <div className="grid gap-3 lg:grid-cols-3">
              <TextCard badge="标准资质" title="参与多项团体标准">
                公开数据中可见7项钠离子电池相关团体标准参与记录，并拥有高新技术企业、知识产权管理体系认证、ISO9001等资质。
              </TextCard>
              <TextCard badge="产业布局" title="多地子公司布局">
                对外投资企业包括成都、自贡、武汉、普洱、河南等主体，经营范围多与新材料、电池制造、储能技术相关。
              </TextCard>
              <TextCard badge="项目线索" title="有招投标和示范项目线索">
                公开项目中可见复合磷酸铁钠材料加工检测、钠离子电池聚阴离子正极材料开发与产业化等相关线索。
              </TextCard>
            </div>
            <div className="mt-[14px] grid gap-[10px]">
              <EvidenceCard type="标准证据" title="参与钠离子电池用材料、电性能、储能、动力等标准">
                标准线索能体现企业在行业规则和技术规范体系中的参与度，但仍需确认其在标准中的具体起草角色和贡献。
              </EvidenceCard>
              <EvidenceCard type="产线证据" title="公开舆情提到万吨级聚阴离子正极材料产线">
                如果属实，将是重要产业化信号；下一步应核验产线位置、投产时间、产能利用率和客户出货情况。
              </EvidenceCard>
              <EvidenceCard type="客户证据" title="新闻中出现维科技术、采日能源、好电科技等合作线索">
                合作新闻可作为客户验证入口，但需要区分战略合作、样品验证、批量供货和收入确认。
              </EvidenceCard>
            </div>
          </ReportSection>

          <ReportSection id="risk">
            <SectionHeader
              title="声誉与风险"
              note="将声誉判断与风险提示放在一起阅读，既看舆情，也看关键证据缺口。"
              badge="需补充验证"
              tone="orange"
            />
            <div className="grid gap-3 lg:grid-cols-3">
              <TextCard badge="声誉概况" title="公开舆情整体偏正面">
                近期可见新闻主要围绕专利申请、合作进展、奖项荣誉和产业化动态展开，未观察到明显负面舆情。
              </TextCard>
              <TextCard badge="正面信号" title="行业曝光与合作信息较多">
                公开传播中出现技术突破、战略合作、产线建设等正面信息，可作为持续跟踪企业声誉和行业认可度的入口。
              </TextCard>
              <TextCard badge="风险提醒" title="正面新闻不等于产业化兑现">
                声誉层面的积极信号较多，但仍需与专利、产线、客户和收入等硬证据交叉验证，避免仅依据宣传判断。
              </TextCard>
            </div>
            <div className="mt-[14px] grid gap-[10px]">
              <RiskCard
                level="中优先级"
                tone="orange"
                title="核心专利确权与保护范围"
                next="专利法律状态跟踪"
              >
                产业相关专利中有较多处于公开或实审阶段，需持续跟踪授权进度、权利要求稳定性和可绕开空间。
              </RiskCard>
              <RiskCard
                level="中优先级"
                tone="orange"
                title="产线与出货真实性"
                next="访谈/新闻/招投标复核"
              >
                公开报道提及产线和合作，但需要核验实际投产、产能利用、客户验证、订单和回款情况。
              </RiskCard>
              <RiskCard
                level="低优先级"
                tone="green"
                title="持续监控舆情变化"
                next="持续监控"
              >
                目前公开负面舆情暂未突出，但后续仍需持续跟踪行政处罚、经营异常、重大纠纷和舆情拐点。
              </RiskCard>
            </div>
          </ReportSection>

          <ReportSection id="action">
            <SectionHeader
              title="初筛结论与建议动作"
              note="结论服务产品动作，不替代投资尽调。"
              badge="建议关注"
              tone="green"
            />
            <div className="rounded-[18px] border border-[#dfe7f2] bg-[#f8fbff] p-4 text-[14px] leading-[1.75] text-[#33435d]">
              <strong className="text-[#0b1b35]">最终判断：</strong>
              该企业在钠离子电池正极材料方向具备明确技术线索和资本背书，建议先纳入关注并进入候选池；在确认产线、客户、收入和核心专利授权后，再决定是否进入重点企业池或生成深度报告。
            </div>
            <div className="mt-[14px] grid gap-3 lg:grid-cols-3">
              {[
                ["1", "关注企业", "跟踪专利授权、融资、合作、产线和招投标更新。"],
                ["2", "补充产业化验证", "核验产能、样品验证、批量供货、客户结构和回款信息。"],
                ["3", "暂不直接深度尽调", "待产业化证据补齐后，再生成深度报告或安排专家访谈。"],
              ].map(([no, title, desc]) => (
                <div
                  key={no}
                  className="rounded-[18px] border border-[#dfe7f2] bg-[#fbfcff] p-4"
                >
                  <div className="mb-[10px] flex h-[30px] w-[30px] items-center justify-center rounded-[10px] bg-[#edf4ff] font-black text-[#2f6df6]">
                    {no}
                  </div>
                  <strong className="mb-[5px] block text-[#0b1b35]">
                    {title}
                  </strong>
                  <p className="m-0 text-[14px] leading-[1.75] text-[#43526b]">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </ReportSection>

          <ReportSection id="appendix">
            <SectionHeader
              title="附录"
              note="正文只放关键判断和证据，附录承接全量数据表和明细信息。"
            />
            <div className="grid gap-3">
              <AppendixDetails title="附录A：工商与主体信息" open>
                <InfoTable rows={report.appendix.business} />
              </AppendixDetails>
              <AppendixDetails title="附录B：重点专利清单">
                <DataTable
                  headers={["公开号", "专利名称", "方向", "状态/备注"]}
                  rows={report.appendix.patents}
                />
              </AppendixDetails>
              <AppendixDetails title="附录C：融资历程">
                <DataTable
                  headers={["发布时间", "融资轮次", "融资金额", "投资方", "备注"]}
                  rows={report.appendix.financing}
                />
              </AppendixDetails>
              <AppendixDetails title="附录D：标准、资质与对外投资">
                <DataTable
                  headers={["类型", "名称", "时间/状态", "初筛意义"]}
                  rows={report.appendix.qualifications}
                />
              </AppendixDetails>
              <AppendixDetails title="附录E：公开舆情与项目信息">
                <DataTable
                  headers={["时间", "类型", "标题/事项", "初筛意义"]}
                  rows={report.appendix.publicSignals}
                />
              </AppendixDetails>
            </div>
          </ReportSection>
        </article>

        <aside className="grid gap-[18px] xl:sticky xl:top-5 xl:self-start">
          <div className="xl:hidden">
            <Toc activeSection={activeSection} onBack={onBack} />
          </div>

          <Panel title="报告信息">
            <div className="grid">
              {report.sideInfo.map(([label, value, tone]) => (
                <div
                  key={label}
                  className="grid grid-cols-[96px_1fr] items-center gap-3 border-b border-[#dfe7f2] py-3 last:border-b-0"
                >
                  <div className="text-[14px] font-bold text-[#73819a]">
                    {label}
                  </div>
                  <Badge tone={tone}>{value}</Badge>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="报告操作">
            <div className="grid gap-3">
              <Button className="h-[45px] rounded-[13px] bg-[#18ad62] text-[15px] font-black text-white hover:bg-[#159653]">
                <BookmarkPlus className="mr-2 h-4 w-4" />
                关注企业
              </Button>
              <Button
                variant="outline"
                className="h-[45px] rounded-[13px] border-[#cbd8ea] text-[15px] font-black text-[#2f6df6] hover:bg-[#edf4ff]"
              >
                <Save className="mr-2 h-4 w-4" />
                保存到报告库
              </Button>
              <Button
                onClick={() => window.print()}
                className="h-[45px] rounded-[13px] bg-[#2f6df6] text-[15px] font-black text-white hover:bg-[#2459d2]"
              >
                <Download className="mr-2 h-4 w-4" />
                导出PDF
              </Button>
            </div>
          </Panel>

          <section className="rounded-[22px] border border-[#dfe7f2] bg-white/75 p-[18px] text-[14px] leading-[1.7] text-[#5f6f88]">
            <div className="mb-2 flex items-center gap-2 text-[16px] font-black text-[#0b1b35]">
              <FileText className="h-4 w-4 text-[#2f6df6]" />
              报告口径
            </div>
            初筛报告用于企业发现后的快速判断，只呈现可验证线索、关键风险和下一步动作建议。
          </section>

          <section className="rounded-[22px] border border-[#dfe7f2] bg-white/75 p-[18px] text-[14px] leading-[1.7] text-[#5f6f88]">
            <div className="mb-2 flex items-center gap-2 text-[16px] font-black text-[#0b1b35]">
              <Building2 className="h-4 w-4 text-[#2f6df6]" />
              后续验证重点
            </div>
            产线位置、投产时间、客户验证、订单回款、核心专利授权和团队量产经验。
          </section>
        </aside>
      </div>
    </main>
  );
}
