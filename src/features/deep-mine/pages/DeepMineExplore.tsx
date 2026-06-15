import { useMemo, useState } from "react";
import { ArrowLeft, Star, X } from "lucide-react";
import {
  Input as AntInput,
  Modal,
  Select as AntSelect,
  Table as AntTable,
} from "antd";
import { Button } from "@/components/ui/button";
import styles from "./DeepMineExplore.module.css";

type Company = {
  name: string;
  tags: Array<{ text: string; tone?: "blue" | "green" | "orange" | "purple" }>;
  summary: string;
  metrics: string[];
  type: string;
  route: string;
  source: string;
  detail: {
    techRoutes: string;
    patentCount: string;
    recentCount: string;
    signals: string[];
  };
};

type ReportStatus = "none" | "running" | "ready";

type FilterChip = {
  key: string;
  label: string;
  onClear: () => void;
};

const QUICK_FILTERS = [
  { name: "全部", count: 350 },
  { name: "强技术布局", count: 86 },
  { name: "近三年活跃", count: 128 },
  { name: "创赛/展会出现", count: 24 },
  { name: "高校院所转化", count: 79 },
];

const COMPANIES: Company[] = [
  {
    name: "深圳时识科技有限公司",
    tags: [
      { text: "SNN" },
      { text: "存算一体" },
      { text: "非上市企业", tone: "green" },
      { text: "专利", tone: "orange" },
    ],
    summary:
      "近三年新增 3 件相关专利，覆盖 SNN 异步事件驱动与低功耗类脑计算方向。",
    metrics: ["相关专利 12", "近三年新增 3", "展会 1"],
    type: "非上市企业",
    route: "SNN",
    source: "专利",
    detail: {
      techRoutes: "SNN / 存算一体",
      patentCount: "12 件",
      recentCount: "3 件",
      signals: [
        "识别到与事件驱动计算、脉冲神经网络、低功耗架构相关的专利线索。",
        "代表性证据包含基于脉冲神经网络的事件驱动计算芯片、低功耗类脑计算架构。",
        "当前建议先关注或入池，后续补充更多企业动态后再进入深评。",
      ],
    },
  },
  {
    name: "北京灵汐科技有限公司",
    tags: [
      { text: "类脑芯片" },
      { text: "SNN" },
      { text: "非上市企业", tone: "green" },
      { text: "专利", tone: "orange" },
    ],
    summary:
      "识别到多件类脑芯片相关专利，技术路线与神经形态计算方向存在较高关联。",
    metrics: ["相关专利 9", "近三年新增 2", "创赛/展会 0"],
    type: "非上市企业",
    route: "SNN",
    source: "专利",
    detail: {
      techRoutes: "类脑芯片 / SNN",
      patentCount: "9 件",
      recentCount: "2 件",
      signals: [
        "专利文本中多次出现脉冲神经网络、类脑处理器和低功耗推理相关描述。",
        "企业技术标签与存算一体神经形态芯片方向存在较强相邻性。",
        "适合继续观察产品化进展、融资动态和上下游合作信号。",
      ],
    },
  },
  {
    name: "北方集成电路技术创新中心（北京）有限公司",
    tags: [
      { text: "3D 混合" },
      { text: "异构集成" },
      { text: "非上市企业", tone: "green" },
      { text: "专利", tone: "orange" },
    ],
    summary:
      "相关专利集中在先进封装、异构集成与三维结构方向，适合从平台型能力继续查看。",
    metrics: ["相关专利 18", "近三年新增 5", "展会 1"],
    type: "非上市企业",
    route: "3D 混合",
    source: "专利",
    detail: {
      techRoutes: "3D 混合 / 异构集成",
      patentCount: "18 件",
      recentCount: "5 件",
      signals: [
        "专利布局集中在先进封装、异构集成和三维结构设计。",
        "具备平台型工艺与产业协同属性，适合作为路线参考主体。",
        "建议结合公开项目、展会和合作单位继续确认产业化程度。",
      ],
    },
  },
  {
    name: "中国科学院自动化研究所",
    tags: [
      { text: "神经形态计算" },
      { text: "高校/科研院所", tone: "purple" },
      { text: "专利", tone: "orange" },
    ],
    summary:
      "属于科研院所主体，识别到核心专利与潜在转化线索，适合继续寻找关联转化企业。",
    metrics: ["相关专利 21", "近三年新增 4", "转化线索 待确认"],
    type: "高校/科研院所",
    route: "其他路线",
    source: "专利",
    detail: {
      techRoutes: "神经形态计算 / 类脑智能",
      patentCount: "21 件",
      recentCount: "4 件",
      signals: [
        "科研主体具备核心技术积累，专利语义与类脑计算方向高度相关。",
        "需进一步识别关联孵化企业、合作公司和成果转化路径。",
        "适合进入线索池，用于补充高校院所转化图谱。",
      ],
    },
  },
  {
    name: "广东华芯振邦半导体有限公司",
    tags: [
      { text: "存算一体" },
      { text: "忆阻器" },
      { text: "非上市企业", tone: "green" },
      { text: "专利", tone: "orange" },
    ],
    summary: "专利信号覆盖存储计算融合架构，近三年仍有新增技术布局。",
    metrics: ["相关专利 7", "近三年新增 2", "融资信号 暂无"],
    type: "非上市企业",
    route: "忆阻器",
    source: "专利",
    detail: {
      techRoutes: "存算一体 / 忆阻器",
      patentCount: "7 件",
      recentCount: "2 件",
      signals: [
        "技术描述涉及存储计算融合、阵列结构和低功耗计算。",
        "近三年仍有新增布局，但商业化与融资信号需要继续补充。",
        "适合作为中早期技术线索纳入待跟踪列表。",
      ],
    },
  },
  {
    name: "西安紫光国芯半导体股份有限公司",
    tags: [
      { text: "存算一体" },
      { text: "上市/集团主体", tone: "green" },
      { text: "专利", tone: "orange" },
    ],
    summary:
      "集团/平台型主体，相关专利方向与存算一体架构有交集，适合做产业链参考企业。",
    metrics: ["相关专利 15", "近三年新增 1", "主体类型 平台型"],
    type: "上市企业",
    route: "存算一体",
    source: "专利",
    detail: {
      techRoutes: "存算一体 / 平台型半导体",
      patentCount: "15 件",
      recentCount: "1 件",
      signals: [
        "企业具备平台型半导体能力，专利方向与存算一体架构存在交集。",
        "更适合作为产业链参照或潜在合作主体，而非单一技术创业标的。",
        "建议结合集团业务线、客户结构和产能协同进一步判断价值。",
      ],
    },
  },
];

const tagClasses = {
  blue: "bg-[#eef3ff] text-[#2563eb]",
  green: "bg-[#eaf8f0] text-[#10b981]",
  orange: "bg-[#fff6e8] text-[#c56c00]",
  purple: "bg-[#f1edff] text-[#7c5cff]",
};

const reportStatusConfig: Record<
  ReportStatus,
  { label: string; desc: string; action: string; badgeClass: string }
> = {
  none: {
    label: "尚未生成",
    desc: "查看线索证据后，可生成企业初筛报告。",
    action: "生成初筛报告",
    badgeClass: "bg-[#f2f5fa] text-[#69758a]",
  },
  running: {
    label: "生成中",
    desc: "初筛报告正在生成中，完成后可进入独立报告页查看。",
    action: "初筛报告生成中",
    badgeClass: "bg-[#fff7e6] text-[#bd6b00]",
  },
  ready: {
    label: "已生成",
    desc: "初筛报告已生成，可进入独立报告页查看。",
    action: "查看初筛报告",
    badgeClass: "bg-[#eaf8f0] text-[#18a957]",
  },
};

const getMetricNumber = (metrics: string[], keyword: string) => {
  const value = metrics.find((metric) => metric.includes(keyword));
  return value ? Number(value.replace(/\D/g, "")) : 0;
};

const hasEventSignal = (company: Company) =>
  company.summary.includes("展会") ||
  company.metrics.some(
    (metric) => metric.includes("展会") || metric.includes("创赛"),
  );

const matchesQuickFilter = (company: Company, filter: string) =>
  filter === "全部" ||
  (filter === "强技术布局" &&
    getMetricNumber(company.metrics, "相关专利") >= 12) ||
  (filter === "近三年活跃" &&
    getMetricNumber(company.metrics, "近三年新增") >= 3) ||
  (filter === "创赛/展会出现" && hasEventSignal(company)) ||
  (filter === "高校院所转化" && company.type.includes("高校/科研院所"));

export default function DeepMineExplore({
  onBack,
  onGenerateReport,
  onOpenReport,
}: {
  onBack?: () => void;
  onGenerateReport?: () => void;
  onOpenReport?: () => void;
}) {
  const [quickFilter, setQuickFilter] = useState("全部");
  const [route, setRoute] = useState("全部路线");
  const [type, setType] = useState("全部类型");
  const [source, setSource] = useState("全部来源");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("默认排序");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [watchedCompanies, setWatchedCompanies] = useState<
    Record<string, boolean>
  >({
    深圳时识科技有限公司: true,
    "北方集成电路技术创新中心（北京）有限公司": true,
  });
  const [reportStatuses, setReportStatuses] = useState<Record<string, ReportStatus>>({
    "北京灵汐科技有限公司": "ready",
    "北方集成电路技术创新中心（北京）有限公司": "running",
  });

  const hasActiveFilters =
    quickFilter !== "全部" ||
    route !== "全部路线" ||
    type !== "全部类型" ||
    source !== "全部来源" ||
    keyword.trim() !== "" ||
    sort !== "默认排序";

  const resetFilters = () => {
    setQuickFilter("全部");
    setRoute("全部路线");
    setType("全部类型");
    setSource("全部来源");
    setKeyword("");
    setSort("默认排序");
  };

  const activeFilterChips: FilterChip[] = [
    quickFilter !== "全部"
      ? {
          key: "quickFilter",
          label: `快捷筛选：${quickFilter}`,
          onClear: () => setQuickFilter("全部"),
        }
      : null,
    route !== "全部路线"
      ? {
          key: "route",
          label: `路线：${route}`,
          onClear: () => setRoute("全部路线"),
        }
      : null,
    type !== "全部类型"
      ? {
          key: "type",
          label: `类型：${type}`,
          onClear: () => setType("全部类型"),
        }
      : null,
    source !== "全部来源"
      ? {
          key: "source",
          label: `来源：${source}`,
          onClear: () => setSource("全部来源"),
        }
      : null,
    keyword.trim() !== ""
      ? {
          key: "keyword",
          label: `关键词：${keyword.trim()}`,
          onClear: () => setKeyword(""),
        }
      : null,
    sort !== "默认排序"
      ? {
          key: "sort",
          label: `排序：${sort}`,
          onClear: () => setSort("默认排序"),
        }
      : null,
  ].filter((chip): chip is FilterChip => Boolean(chip));

  const visibleCompanies = useMemo(() => {
    const filteredCompanies = COMPANIES.filter((company) => {
      const matchesRoute =
        route === "全部路线" || company.route.includes(route);
      const matchesType = type === "全部类型" || company.type.includes(type);
      const matchesSource = source === "全部来源" || company.source === source;
      const matchesQuick = matchesQuickFilter(company, quickFilter);
      const matchesKeyword =
        keyword.trim() === "" ||
        company.name.includes(keyword.trim()) ||
        company.summary.includes(keyword.trim()) ||
        company.tags.some((tag) => tag.text.includes(keyword.trim()));

      return (
        matchesRoute &&
        matchesType &&
        matchesSource &&
        matchesQuick &&
        matchesKeyword
      );
    });

    return [...filteredCompanies].sort((first, second) => {
      if (sort === "最近活跃优先") {
        return (
          getMetricNumber(second.metrics, "近三年新增") -
          getMetricNumber(first.metrics, "近三年新增")
        );
      }

      if (sort === "相关专利数优先") {
        return (
          getMetricNumber(second.metrics, "相关专利") -
          getMetricNumber(first.metrics, "相关专利")
        );
      }

      if (sort === "创赛/展会命中优先") {
        return Number(hasEventSignal(second)) - Number(hasEventSignal(first));
      }

      return 0;
    });
  }, [keyword, quickFilter, route, sort, source, type]);

  const resultCount = visibleCompanies.length;

  const toggleWatch = (company: Company) => {
    setWatchedCompanies((prev) => ({
      ...prev,
      [company.name]: !prev[company.name],
    }));
  };

  const handleReportAction = (company: Company) => {
    const currentStatus = reportStatuses[company.name] ?? "none";

    if (currentStatus === "running") {
      return;
    }

    if (currentStatus === "ready") {
      onOpenReport?.();
      return;
    }

    Modal.confirm({
      title: "生成企业初筛报告？",
      content: `将为「${company.name}」生成初筛报告，消耗 1 个初筛额度。生成完成后可进入独立报告页查看。`,
      okText: "确认生成",
      cancelText: "暂不生成",
      centered: true,
      onOk: () => {
        onGenerateReport?.();
        setReportStatuses((prev) => ({
          ...prev,
          [company.name]: "running",
        }));

        window.setTimeout(() => {
          setReportStatuses((prev) => ({
            ...prev,
            [company.name]: "ready",
          }));
        }, 1200);
      },
    });
  };

  const clearKeywordOnly = () => {
    setKeyword("");
    setSort("默认排序");
  };

  const clearFiltersExceptKeyword = () => {
    setQuickFilter("全部");
    setRoute("全部路线");
    setType("全部类型");
    setSource("全部来源");
    setSort("默认排序");
  };

  const handleEmptyReset = () => {
    if (keyword.trim() !== "") {
      clearFiltersExceptKeyword();
      return;
    }

    resetFilters();
  };

  const closeSelectedCompany = () => {
    setSelectedCompany(null);
  };

  const selectedReportStatus: ReportStatus = selectedCompany
    ? (reportStatuses[selectedCompany.name] ?? "none")
    : "none";
  const selectedReportConfig = reportStatusConfig[selectedReportStatus];

  const companyColumns = [
    {
      title: "企业",
      dataIndex: "name",
      key: "name",
      render: (_: string, company: Company) => (
        <>
          <div className="font-black text-[#172033]">
            {company.name}
            <span className="ml-2 text-[#a0aabc]">›</span>
          </div>
          <div className="text-[12px] text-[#64748b] mt-1">{company.type}</div>
        </>
      ),
    },
    {
      title: "技术路线",
      dataIndex: "tags",
      key: "tags",
      render: (_: Company["tags"], company: Company) => (
        <div className="flex gap-2 flex-wrap">
          {company.tags.map((tag) => (
            <span
              key={`${company.name}-${tag.text}`}
              className={`inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap ${tagClasses[tag.tone ?? "blue"]}`}
            >
              {tag.text}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "线索摘要",
      dataIndex: "summary",
      key: "summary",
      render: (summary: string) => (
        <p className="m-0 max-w-[360px] text-[13px] leading-[1.6] text-[#41506a]">
          {summary}
        </p>
      ),
    },
    {
      title: "关键指标",
      dataIndex: "metrics",
      key: "metrics",
      render: (metrics: Company["metrics"]) => (
        <div className="flex gap-2 flex-wrap">
          {metrics.map((metric) => (
            <span
              key={metric}
              className="inline-flex items-center rounded-[10px] border border-[#edf1f7] bg-[#f6f8fc] px-[9px] py-[6px] text-[12px] text-[#66758d] whitespace-nowrap"
            >
              {metric}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "关注",
      key: "action",
      width: 82,
      align: "right" as const,
      render: (_: unknown, company: Company) => (
        <div className="flex items-center justify-end">
          <button
            type="button"
            title={watchedCompanies[company.name] ? "已关注" : "关注"}
            aria-label={watchedCompanies[company.name] ? "已关注" : "关注"}
            onClick={(event) => {
              event.stopPropagation();
              toggleWatch(company);
            }}
            className={`inline-flex h-[34px] w-[34px] items-center justify-center rounded-[12px] border transition-colors ${
              watchedCompanies[company.name]
                ? "border-[#bdd1ff] bg-[#edf4ff] text-[#2563eb]"
                : "border-[#dce6f6] bg-white text-[#9aa6ba] hover:border-[#a8bff5] hover:bg-[#f7faff] hover:text-[#2563eb]"
            }`}
          >
            <Star
              className="h-[18px] w-[18px]"
              fill={watchedCompanies[company.name] ? "currentColor" : "none"}
            />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-[1440px] p-[34px_36px_42px] max-xl:p-[24px_18px_36px] max-md:p-[22px_14px_34px]">
      <main>
        <section className="overflow-hidden rounded-[24px] border border-[#e3ebf6] bg-white shadow-[0_12px_34px_rgba(18,39,80,0.06)]">
          <header className="flex items-center justify-between gap-4 border-b border-[#e5eaf3] bg-linear-to-br from-[#f8fbff] to-white p-[22px_22px_14px] max-md:flex-wrap">
            <h1 className="m-0 shrink-0 text-[24px] font-black text-[#102039]">
              企业探索
            </h1>
            <p className="m-0 min-w-0 text-right text-[14px] leading-[1.65] text-[#64748b] max-md:text-left">
              目标：
              <strong className="text-[#102039]">存算一体神经形态芯片</strong>
              ，查看候选企业、筛选条件和轻量证据。
            </p>
          </header>

          <div className="border-b border-[#e3ebf6] bg-white px-6 py-[20px_16px] max-md:px-5">
            <div className="mb-4 flex flex-wrap gap-[10px]">
              {QUICK_FILTERS.map((filter) => (
                <button
                  key={filter.name}
                  type="button"
                  onClick={() => setQuickFilter(filter.name)}
                  className={`rounded-full border px-[13px] py-[9px] text-[13px] font-extrabold transition-colors ${
                    quickFilter === filter.name
                      ? "border-[#bdd1ff] bg-[#edf4ff] text-[#2f6df6]"
                      : "border-[#dce6f6] bg-white text-[#4d5b73] hover:border-[#b9cdf8] hover:text-[#2f6df6]"
                  }`}
                >
                  {filter.name}
                  <span className="ml-1 text-[#8a96aa]">{filter.count}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-[minmax(150px,1fr)_minmax(150px,1fr)_minmax(150px,1fr)_minmax(220px,1.35fr)_150px_auto]">
              <AntSelect
                value={route}
                onChange={setRoute}
                size="large"
                className="w-full"
                options={[
                  { value: "全部路线", label: "全部路线" },
                  { value: "SNN", label: "SNN" },
                  { value: "忆阻器", label: "忆阻器" },
                  { value: "3D 混合", label: "3D 混合" },
                  { value: "存算一体", label: "存算一体" },
                  { value: "其他路线", label: "其他路线" },
                ]}
              />
              <AntSelect
                value={type}
                onChange={setType}
                size="large"
                className="w-full"
                options={[
                  { value: "全部类型", label: "全部类型" },
                  { value: "上市企业", label: "上市企业" },
                  { value: "非上市企业", label: "非上市企业" },
                  { value: "高校/科研院所", label: "高校/科研院所" },
                ]}
              />
              <AntSelect
                value={source}
                onChange={setSource}
                size="large"
                className="w-full"
                options={[
                  { value: "全部来源", label: "全部来源" },
                  { value: "专利", label: "专利" },
                  { value: "创赛", label: "创赛" },
                  { value: "展会", label: "展会" },
                  { value: "融资", label: "融资" },
                  { value: "新闻", label: "新闻" },
                ]}
              />
              <AntInput
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="搜索企业名称或关键词"
                size="large"
                allowClear
                className="w-full"
              />
              <AntSelect
                value={sort}
                onChange={setSort}
                size="large"
                className="w-full"
                options={[
                  { value: "默认排序", label: "默认排序" },
                  { value: "最近活跃优先", label: "最近活跃优先" },
                  { value: "相关专利数优先", label: "相关专利数优先" },
                  { value: "创赛/展会命中优先", label: "创赛/展会命中优先" },
                ]}
              />
              <Button
                variant="outline"
                onClick={resetFilters}
                disabled={!hasActiveFilters}
                className="h-[40px] rounded-[12px] border-[#dce6f6] px-4 font-extrabold text-[#334155] disabled:cursor-not-allowed disabled:opacity-50"
              >
                重置
              </Button>
            </div>
          </div>

          <div className="flex items-start justify-between gap-[18px] border-b border-[#e3ebf6] bg-[#fbfdff] px-6 py-[13px] text-[13px] text-[#536177] max-md:flex-col max-md:items-start max-md:gap-2 max-md:px-5">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="text-[#13213a]">
                  当前结果：{resultCount}家
                </strong>
                {activeFilterChips.length === 0 && (
                  <span className="text-[#8b96a8]">全部候选企业</span>
                )}
                {activeFilterChips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={chip.onClear}
                    className="inline-flex items-center gap-1 rounded-full bg-[#eaf1ff] px-2.5 py-1 text-[12px] font-extrabold text-[#2563eb] transition-colors hover:bg-[#dbeafe]"
                  >
                    {chip.label}
                    <X className="h-3 w-3" />
                  </button>
                ))}
              </div>
              {keyword.trim() !== "" && activeFilterChips.length > 1 && (
                <button
                  type="button"
                  onClick={clearFiltersExceptKeyword}
                  className="mt-2 text-[12px] font-extrabold text-[#2563eb] hover:text-[#174ea6]"
                >
                  只保留关键词搜索
                </button>
              )}
            </div>
            <div className="text-[#8b96a8]">
              点击企业行查看线索详情，点击星标关注
            </div>
          </div>

          <div className="min-h-[610px] bg-white">
            <AntTable<Company>
              className={styles.table}
              columns={companyColumns}
              dataSource={visibleCompanies}
              rowKey="name"
              pagination={false}
              style={{ minHeight: 520 }}
              scroll={{ x: 820, y: 520 }}
              onRow={(company) => ({
                onClick: () => setSelectedCompany(company),
                className:
                  selectedCompany?.name === company.name
                    ? styles.selectedRow
                    : undefined,
              })}
              locale={{
                emptyText: (
                  <div className="py-8 text-center">
                    <div className="text-[14px] font-black text-[#172033]">
                      当前筛选条件下暂无结果
                    </div>
                    <p className="mx-auto mt-2 max-w-[320px] text-[13px] leading-[1.6] text-[#7b879b]">
                      可以清空筛选恢复全部候选；如果已输入关键词，也可以只保留关键词继续搜索。
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      <Button
                        variant="outline"
                        onClick={handleEmptyReset}
                        className="h-[36px] rounded-[10px] px-4 font-extrabold"
                      >
                        {keyword.trim() !== ""
                          ? "只保留关键词"
                          : "清空筛选"}
                      </Button>
                      {keyword.trim() !== "" && (
                        <Button
                          variant="outline"
                          onClick={clearKeywordOnly}
                          className="h-[36px] rounded-[10px] px-4 font-extrabold"
                        >
                          清除关键词
                        </Button>
                      )}
                    </div>
                  </div>
                ),
              }}
            />
            <div className="flex flex-col md:flex-row gap-[12px] md:items-center md:justify-between mt-[22px] px-[22px] pb-[22px]">
              {onBack && (
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="h-[44px] px-[20px] rounded-[13px] font-extrabold shadow-sm"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  返回线索分析
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>

      {selectedCompany && (
        <>
          <button
            aria-label="关闭企业详情"
            className="fixed inset-0 bg-[rgba(7,18,38,0.28)] z-40"
            onClick={closeSelectedCompany}
          ></button>
          <aside className="fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-[460px] flex-col bg-white shadow-[-18px_0_44px_rgba(15,30,60,0.18)]">
            <div className="p-[22px] flex justify-between gap-4">
              <div>
                <h2 className="text-[24px] font-black text-[#172033] m-0">
                  {selectedCompany.name}
                </h2>
                <p className="mt-2 mb-0 text-[13px] text-[#7b879b]">
                  {selectedCompany.detail.techRoutes}｜{selectedCompany.type}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedCompany.tags.slice(0, 3).map((tag) => (
                    <span
                      key={`${selectedCompany.name}-drawer-${tag.text}`}
                      className={`rounded-full px-2.5 py-1.5 text-[12px] font-extrabold ${tagClasses[tag.tone ?? "blue"]}`}
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={closeSelectedCompany}
                className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[12px] border border-[#e3ebf6] bg-[#f7f9fd] text-[#6d7890]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-auto px-[22px] pb-[22px] flex-1">
              <section className="mt-[14px] rounded-[18px] border border-[#e3ebf6] bg-white p-4">
                <h3 className="text-[15px] font-black mb-3">企业基础信息</h3>
                {[
                  ["企业类型", selectedCompany.type],
                  ["技术路线覆盖", selectedCompany.detail.techRoutes],
                  ["相关专利数", selectedCompany.detail.patentCount],
                  ["近三年新增", selectedCompany.detail.recentCount],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[94px_1fr] gap-[10px] border-b border-dashed border-[#edf1f7] py-[7px] text-[13px] last:border-b-0"
                  >
                    <div className="text-[#7b879b]">{label}</div>
                    <div className="font-bold text-[#243149]">{value}</div>
                  </div>
                ))}
              </section>

              <section className="mt-[14px] rounded-[18px] border border-[#e3ebf6] bg-white p-4">
                <h3 className="text-[15px] font-black mb-3">线索信号</h3>
                <div className="grid gap-[10px]">
                  {selectedCompany.detail.signals.map((signal, index) => (
                    <div
                      key={signal}
                      className="relative pl-4 text-[13px] leading-[1.65] text-[#43506a] before:absolute before:left-0 before:top-[0.75em] before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#2f6df6]"
                    >
                      <strong className="mb-1 block text-[#172033]">
                        {index === 0
                          ? "专利信号"
                          : index === 1
                            ? "代表性证据"
                            : "轻量判断"}
                      </strong>
                      <p className="m-0">{signal}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="mt-[14px] rounded-[18px] border border-[#e3ebf6] bg-white p-[15px]">
                <div className="mb-[10px] flex items-center justify-between gap-3">
                  <div className="text-[15px] font-black">初筛报告</div>
                  <span
                    className={`rounded-full px-2 py-1 text-[12px] font-extrabold ${selectedReportConfig.badgeClass}`}
                  >
                    {selectedReportConfig.label}
                  </span>
                </div>
                <p className="m-0 text-[13px] leading-[1.65] text-[#7b879b]">
                  {selectedReportConfig.desc}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_1.35fr] gap-[10px] p-[0_22px_22px] max-sm:grid-cols-1">
              <Button
                variant="outline"
                onClick={() => toggleWatch(selectedCompany)}
                className={`rounded-[12px] font-extrabold ${
                  watchedCompanies[selectedCompany.name]
                    ? "border-[#18a957] bg-[#18a957] text-white hover:border-[#18a957] hover:bg-[#18a957] hover:text-white"
                    : "border-[#d3e1ff] bg-white text-[#2f6df6] hover:border-[#d3e1ff] hover:bg-white hover:text-[#2f6df6]"
                }`}
              >
                {watchedCompanies[selectedCompany.name] ? "已关注" : "关注"}
              </Button>
              <Button
                onClick={() => handleReportAction(selectedCompany)}
                disabled={selectedReportStatus === "running"}
                className="rounded-[12px] border-[#2f6df6] bg-[#2f6df6] text-white font-extrabold shadow-[0_10px_20px_rgba(47,109,246,0.16)] hover:border-[#2f6df6] hover:bg-[#2f6df6] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {selectedReportConfig.action}
              </Button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
