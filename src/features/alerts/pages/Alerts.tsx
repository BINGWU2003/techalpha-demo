import { useMemo, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EventCategory =
  | "融资/资本"
  | "专利/技术"
  | "客户/订单"
  | "工商/股权"
  | "风险/舆情";

type TrackingEvent = {
  id: number;
  title: string;
  description: string;
  category: EventCategory;
  company: string;
  companyStatus: "已关注企业" | "标的池企业";
  priority: "高" | "中" | "低";
  time: string;
  icon: string;
  tone: "blue" | "green" | "orange" | "red" | "purple";
  summary: string;
  evidence: string;
  suggestedAction: string;
};

const categories = [
  "全部",
  "融资/资本",
  "专利/技术",
  "客户/订单",
  "工商/股权",
  "风险/舆情",
] as const;

const toneClasses = {
  blue: {
    icon: "bg-[#eef4ff] text-[#2f6df6]",
    tag: "bg-[#eef4ff] text-[#2f6df6]",
    border: "hover:border-[#9dbaff]",
  },
  green: {
    icon: "bg-[#eaf8f1] text-[#16b978]",
    tag: "bg-[#eaf8f1] text-[#0f9f66]",
    border: "hover:border-[#90e1bd]",
  },
  orange: {
    icon: "bg-[#fff6e6] text-[#d97706]",
    tag: "bg-[#fff6e6] text-[#b76a00]",
    border: "hover:border-[#f6c76f]",
  },
  red: {
    icon: "bg-[#fff1f1] text-[#ef4444]",
    tag: "bg-[#fff1f1] text-[#ef4444]",
    border: "hover:border-[#fca5a5]",
  },
  purple: {
    icon: "bg-[#f2efff] text-[#8057ff]",
    tag: "bg-[#f2efff] text-[#8057ff]",
    border: "hover:border-[#c4b5fd]",
  },
} as const;

const events: TrackingEvent[] = [
  {
    id: 1,
    title: "浙江钠创新能源出现融资相关动态",
    description:
      "系统发现融资相关公开线索，可能影响估值判断和进入时点，可补充到企业记录。",
    category: "融资/资本",
    company: "浙江钠创新能源",
    companyStatus: "已关注企业",
    priority: "高",
    time: "2小时前",
    icon: "¥",
    tone: "orange",
    summary:
      "系统发现该企业出现融资相关公开线索，可能影响估值判断和进入时点。建议补充资本背景信息，并关注后续融资金额、投资方和资金用途。",
    evidence:
      "公开信息中出现融资、投资方或资本动态相关表述，当前建议作为企业记录补充，不直接形成投资结论。",
    suggestedAction: "更新资本背景字段，并在下一版报告中复核估值与进入时点。",
  },
  {
    id: 2,
    title: "中科海钠发布产业合作动态",
    description:
      "新增动态与客户验证和产业协同相关，可同步到企业记录，并补充产业化观察线索。",
    category: "客户/订单",
    company: "中科海钠",
    companyStatus: "标的池企业",
    priority: "中",
    time: "今天",
    icon: "✓",
    tone: "green",
    summary:
      "新增动态与客户验证和产业协同相关，可同步到企业记录，并补充产业化观察线索。",
    evidence:
      "公开信息中出现客户合作、产业协同或项目进展相关内容，适合作为企业产业化信号补充。",
    suggestedAction: "同步到标的池记录，并更新产业链协同与客户验证章节。",
  },
  {
    id: 3,
    title: "某新材料科技公司新增相关专利",
    description:
      "系统发现聚阴离子方向相关专利新增，说明企业在目标方向仍有技术布局。",
    category: "专利/技术",
    company: "某新材料科技公司",
    companyStatus: "已关注企业",
    priority: "低",
    time: "昨天",
    icon: "P",
    tone: "blue",
    summary:
      "系统发现聚阴离子方向相关专利新增，说明企业在目标方向仍有技术布局。",
    evidence: "新增专利标题与聚阴离子正极材料、循环寿命或材料稳定性相关。",
    suggestedAction:
      "更新企业技术画像；若后续连续出现高相关专利，可考虑加入标的池。",
  },
  {
    id: 4,
    title: "浙江钠创新能源新增专利申请",
    description: "新增专利与层状氧化物材料制备工艺相关，可补充到企业技术线索。",
    category: "专利/技术",
    company: "浙江钠创新能源",
    companyStatus: "已关注企业",
    priority: "低",
    time: "昨天",
    icon: "P",
    tone: "blue",
    summary: "新增专利与层状氧化物材料制备工艺相关，可补充到企业技术线索。",
    evidence:
      "新增专利与层状氧化物正极材料制备工艺相关，可作为后续初筛报告更新依据。",
    suggestedAction: "补充技术画像，并在下次报告更新时同步到技术能力章节。",
  },
  {
    id: 5,
    title: "某企业出现经营异常相关信息",
    description:
      "系统识别到工商或经营异常相关公开信息，建议核对主体后更新企业风险记录。",
    category: "风险/舆情",
    company: "某材料企业",
    companyStatus: "已关注企业",
    priority: "高",
    time: "3天前",
    icon: "!",
    tone: "red",
    summary:
      "系统识别到工商或经营异常相关公开信息，建议核对主体后更新企业风险记录。",
    evidence:
      "公开工商信息中出现经营异常、行政处罚或司法风险相关字段，需人工核验主体后再更新记录。",
    suggestedAction: "先核验主体匹配度，再写入风险记录并标记为需人工复核。",
  },
  {
    id: 6,
    title: "华东钠电材料完成股权结构调整",
    description:
      "工商信息显示股权结构发生调整，可能影响控制权稳定性与后续融资节奏。",
    category: "工商/股权",
    company: "华东钠电材料",
    companyStatus: "标的池企业",
    priority: "中",
    time: "4天前",
    icon: "G",
    tone: "purple",
    summary:
      "工商信息显示股权结构发生调整，可能影响控制权稳定性与后续融资节奏。",
    evidence: "公开登记信息出现新增股东、持股比例变化或高管备案变化。",
    suggestedAction: "更新股权结构表，并提醒投研团队复核控制权与关联方信息。",
  },
];

export default function Alerts({
  onBack,
  onUpdateReport,
}: {
  onBack?: () => void;
  onUpdateReport?: () => void;
}) {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("全部");
  const [companyFilter, setCompanyFilter] = useState("全部企业");
  const [priorityFilter, setPriorityFilter] = useState("全部优先级");
  const [sortBy, setSortBy] = useState("按时间排序");
  const [query, setQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<TrackingEvent | null>(
    null,
  );

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return events
      .filter(
        (event) =>
          activeCategory === "全部" || event.category === activeCategory,
      )
      .filter(
        (event) =>
          companyFilter === "全部企业" || event.companyStatus === companyFilter,
      )
      .filter(
        (event) =>
          priorityFilter === "全部优先级" ||
          `${event.priority}优先级` === priorityFilter,
      )
      .filter((event) => {
        if (!normalizedQuery) return true;

        return [event.title, event.description, event.company, event.category]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .sort((first, second) => {
        if (sortBy === "按企业名称排序") {
          return first.company.localeCompare(second.company, "zh-CN");
        }

        return first.id - second.id;
      });
  }, [activeCategory, companyFilter, priorityFilter, query, sortBy]);

  const categoryCount = (category: (typeof categories)[number]) =>
    category === "全部"
      ? events.length
      : events.filter((event) => event.category === category).length;

  return (
    <PageShell>
        <section className="overflow-hidden rounded-[28px] border border-[#e3ebf6] bg-white shadow-[0_16px_40px_rgba(23,39,70,0.05)]">
          <header className="flex items-center justify-between gap-3 border-b border-[#e5eaf3] p-[20px_24px] max-md:flex-col max-md:items-start max-md:p-[18px_20px]">
            <h1 className="text-[24px] font-black m-0 text-[#102039]">
              事件跟踪
            </h1>
            <p className="m-0 text-right text-[13px] font-bold text-[#8a96a8] leading-[1.65] max-md:text-left">
              跟踪已关注企业与标的池企业的关键动态，辅助更新企业记录和报告。
            </p>
          </header>

          <div className="p-[20px_28px_0] max-md:p-[18px_20px_0]">
            <div className="mb-[16px] flex items-center justify-between gap-[14px] max-xl:flex-col max-xl:items-start">
              <div className="flex flex-wrap gap-[10px]">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-[18px] py-[10px] text-[14px] font-black transition-all ${
                      activeCategory === category
                        ? "border-[#2f6df6] bg-[#2f6df6] text-white shadow-[0_8px_18px_rgba(47,109,246,0.18)]"
                        : "border-[#d6e2f2] bg-white text-[#18345d] hover:border-[#2f6df6] hover:text-[#2f6df6]"
                    }`}
                  >
                    {category} {categoryCount(category)}
                  </button>
                ))}
              </div>
              <div className="flex shrink-0 flex-wrap justify-end gap-[8px] max-xl:justify-start">
                {[
                  { label: "今日新增", value: "4" },
                  { label: "本周新增", value: "18" },
                  { label: "跟踪企业", value: "26" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-full border border-[#e3ebf6] bg-[#f8fbff] px-[11px] py-[8px] text-[12px] font-black text-[#66758e]"
                  >
                    {item.label}
                    <strong className="ml-1 text-[14px] text-[#0b1f3a]">
                      {item.value}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-[14px] grid grid-cols-[1.5fr_1fr_1fr_1.1fr] gap-[12px] max-lg:grid-cols-2 max-sm:grid-cols-1">
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-[44px] rounded-[12px] border-[#d9e4f1] bg-white text-[14px]"
                placeholder="搜索企业或事件..."
              />
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="h-[44px] rounded-[12px] border-[#d9e4f1] bg-white">
                  <SelectValue placeholder="企业范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="全部企业">全部企业</SelectItem>
                  <SelectItem value="已关注企业">已关注企业</SelectItem>
                  <SelectItem value="标的池企业">标的池企业</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="h-[44px] rounded-[12px] border-[#d9e4f1] bg-white">
                  <SelectValue placeholder="优先级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="全部优先级">全部优先级</SelectItem>
                  <SelectItem value="高优先级">高优先级</SelectItem>
                  <SelectItem value="中优先级">中优先级</SelectItem>
                  <SelectItem value="低优先级">低优先级</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-[44px] rounded-[12px] border-[#d9e4f1] bg-white">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="按时间排序">按时间排序</SelectItem>
                  <SelectItem value="按企业名称排序">按企业名称排序</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-[14px] flex items-center justify-between gap-3 rounded-[16px] border border-[#e3ebf6] bg-[#f8fbff] px-[16px] py-[12px] text-[13px] text-[#4e5f78] max-md:flex-col max-md:items-start">
              <span>
                当前结果：
                <b className="text-[#2f6df6]">{filteredEvents.length}</b>{" "}
                条事件｜范围：已关注企业 + 标的池企业
              </span>
              <span>点击事件查看详情</span>
            </div>
          </div>

          <div className="border-t border-[#e3ebf6]">
            {filteredEvents.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedEvent(event)}
                className={`grid w-full grid-cols-[34px_minmax(0,1fr)_110px] gap-[14px] border-b border-[#e3ebf6] px-[28px] py-5 text-left transition-all hover:bg-[#f8fbff] max-md:px-[20px] max-lg:grid-cols-[34px_1fr] ${toneClasses[event.tone].border}`}
              >
                <div
                  className={`flex h-[28px] w-[28px] items-center justify-center rounded-[10px] text-[15px] font-black ${toneClasses[event.tone].icon}`}
                >
                  {event.icon}
                </div>
                <div>
                  <div className="mb-[6px] text-[16px] font-black text-[#0b1f3a]">
                    {event.title}
                  </div>
                  <div className="max-w-[780px] text-[13px] leading-[1.65] text-[#66758e]">
                    {event.description}
                  </div>
                  <div className="mt-[10px] flex flex-wrap gap-[8px]">
                    <span
                      className={`rounded-full px-[10px] py-[6px] text-[12px] font-black ${toneClasses[event.tone].tag}`}
                    >
                      {event.category}
                    </span>
                    <span className="rounded-full bg-[#eef4ff] px-[10px] py-[6px] text-[12px] font-black text-[#2f6df6]">
                      {event.companyStatus}
                    </span>
                    <span className="rounded-full bg-[#f2f5fa] px-[10px] py-[6px] text-[12px] font-black text-[#66758e]">
                      {event.company}
                    </span>
                    <span className="rounded-full bg-[#fff1f1] px-[10px] py-[6px] text-[12px] font-black text-[#ef4444]">
                      {event.priority}优先级
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end whitespace-nowrap text-[13px] text-[#66758e] max-lg:col-start-2 max-lg:justify-start">
                  {event.time}
                </div>
              </button>
            ))}

            {filteredEvents.length === 0 && (
              <div className="m-[28px] rounded-[16px] border border-dashed border-[#d6e2f2] bg-[#f8fbff] p-8 text-center text-[13px] text-[#66758e] max-md:m-[20px]">
                暂无匹配事件，请调整筛选条件。
              </div>
            )}
          </div>

          <div className="p-[18px_28px_28px] max-md:p-[18px_20px_20px]">
            <Button
              variant="outline"
              className="h-[42px] rounded-[12px] border-[#d6e2f2] px-[16px] font-black text-[#18345d]"
            >
              查看更多事件
            </Button>
          </div>
        </section>

      {selectedEvent && (
        <>
          <button
            type="button"
            aria-label="关闭事件详情"
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 z-20 bg-[rgba(11,23,42,0.32)] backdrop-blur-[2px]"
          />
          <aside className="fixed right-0 top-0 z-30 flex h-screen w-[420px] max-w-full flex-col bg-white shadow-[-20px_0_50px_rgba(11,23,42,0.18)]">
            <div className="border-b border-[#e3ebf6] px-[24px] pb-[14px] pt-[22px]">
              <div className="flex items-start justify-between gap-[12px]">
                <div>
                  <h2 className="m-0 text-[22px] font-black leading-[1.35] text-[#0b1f3a]">
                    {selectedEvent.title}
                  </h2>
                  <div className="mt-[10px] flex flex-wrap gap-[8px]">
                    <span
                      className={`rounded-full px-[10px] py-[6px] text-[12px] font-black ${toneClasses[selectedEvent.tone].tag}`}
                    >
                      {selectedEvent.category}
                    </span>
                    <span className="rounded-full bg-[#f2efff] px-[10px] py-[6px] text-[12px] font-black text-[#8057ff]">
                      {selectedEvent.companyStatus}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedEvent(null)}
                  className="h-8 w-8 shrink-0 rounded-[10px] bg-[#f3f6fb] text-[#66758e] hover:text-[#0b1f3a]"
                  title="关闭"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto px-[24px] py-[20px]">
              <div className="mb-[22px]">
                <div className="mb-[10px] text-[15px] font-black text-[#0b1f3a]">
                  事件信息
                </div>
                <div className="grid grid-cols-2 gap-[10px]">
                  {[
                    { label: "关联企业", value: selectedEvent.company },
                    { label: "企业状态", value: selectedEvent.companyStatus },
                    { label: "事件类型", value: selectedEvent.category },
                    { label: "更新时间", value: selectedEvent.time },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[14px] border border-[#e3ebf6] bg-[#f9fbfe] p-[12px]"
                    >
                      <div className="mb-[6px] text-[12px] text-[#66758e]">
                        {item.label}
                      </div>
                      <div className="text-[15px] font-black text-[#0b1f3a]">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {[
                { title: "事件摘要", body: selectedEvent.summary },
                { title: "代表证据", body: selectedEvent.evidence },
                { title: "建议动作", body: selectedEvent.suggestedAction },
              ].map((section) => (
                <div key={section.title} className="mb-[22px]">
                  <div className="mb-[10px] text-[15px] font-black text-[#0b1f3a]">
                    {section.title}
                  </div>
                  <div className="rounded-[14px] border border-[#e3ebf6] bg-white px-[14px] py-[13px] text-[13px] leading-[1.65] text-[#31415d]">
                    {section.body}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-[10px] border-t border-[#e3ebf6] p-[16px_24px]">
              <Button
                variant="outline"
                className="h-[42px] flex-1 rounded-[12px] border-[#d6e2f2] font-black text-[#18345d]"
              >
                同步到企业记录
              </Button>
              <Button
                onClick={onUpdateReport}
                className="h-[42px] flex-1 rounded-[12px] bg-[#2f6df6] font-black text-white hover:bg-[#245ee4]"
              >
                更新报告
              </Button>
            </div>
          </aside>
        </>
      )}
    </PageShell>
  );
}
