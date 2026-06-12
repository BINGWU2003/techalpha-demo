import { useMemo, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import {
  Input as AntInput,
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

export default function DeepMineExplore({ onBack }: { onBack?: () => void }) {
  const [quickFilter, setQuickFilter] = useState("全部");
  const [route, setRoute] = useState("全部路线");
  const [type, setType] = useState("全部类型");
  const [source, setSource] = useState("全部来源");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("默认排序");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

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

  const visibleCompanies = useMemo(() => {
    return COMPANIES.filter((company) => {
      const matchesRoute =
        route === "全部路线" || company.route.includes(route);
      const matchesType = type === "全部类型" || company.type.includes(type);
      const matchesSource = source === "全部来源" || company.source === source;
      const matchesKeyword =
        keyword.trim() === "" ||
        company.name.includes(keyword.trim()) ||
        company.summary.includes(keyword.trim()) ||
        company.tags.some((tag) => tag.text.includes(keyword.trim()));

      return matchesRoute && matchesType && matchesSource && matchesKeyword;
    });
  }, [keyword, route, source, type]);

  const resultCount =
    quickFilter === "全部"
      ? visibleCompanies.length
      : (QUICK_FILTERS.find((filter) => filter.name === quickFilter)?.count ??
        visibleCompanies.length);

  const companyColumns = [
    {
      title: "企业",
      dataIndex: "name",
      key: "name",
      render: (_: string, company: Company) => (
        <>
          <div className="font-black text-[#172033]">{company.name}</div>
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
      title: "操作",
      key: "action",
      align: "right" as const,
      render: (_: unknown, company: Company) => (
        <Button
          onClick={() => setSelectedCompany(company)}
          className="h-[32px] px-[10px] rounded-[10px] text-[12px] font-extrabold bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
        >
          查看
        </Button>
      ),
    },
  ];

  return (
    <div className="max-w-[1280px] mx-auto p-[28px] max-md:p-[22px_16px]">
      <div className="grid grid-cols-1 gap-[18px] items-start">
        <main className="space-y-4">
          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <h1 className="text-[26px] leading-tight m-0 font-bold">
                    企业探索
                  </h1>
                  <p className="mt-2 text-[#64748b] text-[14px] leading-[1.65]">
                    当前目标：存算一体神经形态芯片。这里用于查看线索分析后的候选企业、筛选条件和轻量证据。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <h2 className="text-[18px] font-black mb-4">快速筛选</h2>
            <div className="flex flex-wrap gap-2">
              {QUICK_FILTERS.map((filter) => (
                <button
                  key={filter.name}
                  onClick={() => setQuickFilter(filter.name)}
                  className={`rounded-full px-4 h-[38px] text-[13px] font-extrabold border transition-colors ${
                    quickFilter === filter.name
                      ? "bg-[#2563eb] border-[#2563eb] text-white shadow-[0_8px_18px_rgba(37,99,235,0.2)]"
                      : "bg-white border-[#dbe4f1] text-[#40506d] hover:border-[#bfdbfe]"
                  }`}
                >
                  {filter.name} {filter.count}
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-[18px] font-black m-0">属性筛选</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                disabled={!hasActiveFilters}
                className="rounded-[10px] font-extrabold text-[#334155] border-[#dbe4f1] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                重置筛选
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              <label className="grid gap-1.5 text-[12px] text-[#64748b]">
                技术路线
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
              </label>
              <label className="grid gap-1.5 text-[12px] text-[#64748b]">
                企业类型
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
              </label>
              <label className="grid gap-1.5 text-[12px] text-[#64748b]">
                信号来源
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
              </label>
              <label className="grid gap-1.5 text-[12px] text-[#64748b]">
                关键词搜索
                <AntInput
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="企业名称 / 关键词"
                  size="large"
                  allowClear
                  className="w-full"
                />
              </label>
            </div>

            <div className="mt-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 rounded-[16px] border border-[#e5eaf3] bg-[#f9fbff] px-4 py-3">
              <div className="text-[14px] text-[#334155]">
                当前结果：
                <strong className="text-[#2563eb]">{resultCount}</strong> 家
              </div>
              <div className="flex flex-wrap gap-2 flex-1">
                {!hasActiveFilters && (
                  <span className="rounded-full bg-[#eef2f7] px-3 py-1.5 text-[12px] font-extrabold text-[#94a3b8]">
                    未选择额外条件
                  </span>
                )}
                {quickFilter !== "全部" && (
                  <button
                    type="button"
                    onClick={() => setQuickFilter("全部")}
                    className="inline-flex items-center gap-1 rounded-full bg-[#eaf1ff] px-3 py-1.5 text-[12px] font-extrabold text-[#2563eb] hover:bg-[#dbeafe] transition-colors"
                  >
                    {quickFilter}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {route !== "全部路线" && (
                  <button
                    type="button"
                    onClick={() => setRoute("全部路线")}
                    className="inline-flex items-center gap-1 rounded-full bg-[#eef2f7] px-3 py-1.5 text-[12px] font-extrabold text-[#64748b] hover:bg-[#e2e8f0] transition-colors"
                  >
                    {route}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {type !== "全部类型" && (
                  <button
                    type="button"
                    onClick={() => setType("全部类型")}
                    className="inline-flex items-center gap-1 rounded-full bg-[#eef2f7] px-3 py-1.5 text-[12px] font-extrabold text-[#64748b] hover:bg-[#e2e8f0] transition-colors"
                  >
                    {type}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {source !== "全部来源" && (
                  <button
                    type="button"
                    onClick={() => setSource("全部来源")}
                    className="inline-flex items-center gap-1 rounded-full bg-[#eef2f7] px-3 py-1.5 text-[12px] font-extrabold text-[#64748b] hover:bg-[#e2e8f0] transition-colors"
                  >
                    {source}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {keyword && (
                  <button
                    type="button"
                    onClick={() => setKeyword("")}
                    className="inline-flex items-center gap-1 rounded-full bg-[#eef2f7] px-3 py-1.5 text-[12px] font-extrabold text-[#64748b] hover:bg-[#e2e8f0] transition-colors"
                  >
                    关键词：{keyword}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {sort !== "默认排序" && (
                  <button
                    type="button"
                    onClick={() => setSort("默认排序")}
                    className="inline-flex items-center gap-1 rounded-full bg-[#eef2f7] px-3 py-1.5 text-[12px] font-extrabold text-[#64748b] hover:bg-[#e2e8f0] transition-colors"
                  >
                    {sort}
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <AntSelect
                value={sort}
                onChange={setSort}
                className="w-full lg:w-[168px]!"
                options={[
                  { value: "默认排序", label: "默认排序" },
                  { value: "最近活跃优先", label: "最近活跃优先" },
                  { value: "相关专利数优先", label: "相关专利数优先" },
                  { value: "创赛/展会命中优先", label: "创赛/展会命中优先" },
                ]}
              />
            </div>
          </section>

          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <AntTable<Company>
              className={styles.table}
              columns={companyColumns}
              dataSource={visibleCompanies}
              rowKey="name"
              pagination={false}
              scroll={{ x: 820 }}
              locale={{
                emptyText: "当前筛选条件下暂无结果，请调整筛选条件。",
              }}
            />
            <div className="flex flex-col md:flex-row gap-[12px] md:items-center md:justify-between mt-[22px]">
              <div className="text-[13px] text-[#64748b]">
                当前展示
                <strong className="mx-1 text-[#2563eb]">{resultCount}</strong>
                家候选主体
              </div>
              <Button
                type="button"
                onClick={() => onBack?.()}
                variant="outline"
                className="h-[44px] px-[20px] rounded-[13px] font-extrabold shadow-sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回线索分析
              </Button>
            </div>
          </section>
        </main>
      </div>

      {selectedCompany && (
        <>
          <button
            aria-label="关闭企业详情"
            className="fixed inset-0 bg-[rgba(7,18,38,0.28)] z-40"
            onClick={() => setSelectedCompany(null)}
          ></button>
          <aside className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[520px] bg-white shadow-[-18px_0_40px_rgba(10,30,70,0.16)] flex flex-col">
            <div className="p-6 border-b border-[#e5eaf3] flex justify-between gap-4">
              <div>
                <h2 className="text-[24px] font-black text-[#172033] m-0">
                  {selectedCompany.name}
                </h2>
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
                onClick={() => setSelectedCompany(null)}
                className="w-9 h-9 rounded-[10px] bg-[#f1f4f9] inline-flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 overflow-auto flex-1">
              <h3 className="text-[16px] font-black mb-3">企业基础信息</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {[
                  ["企业类型", selectedCompany.type],
                  ["技术路线覆盖", selectedCompany.detail.techRoutes],
                  ["相关专利数", selectedCompany.detail.patentCount],
                  ["近三年新增", selectedCompany.detail.recentCount],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[14px] border border-[#e5eaf3] bg-[#fbfcff] p-3"
                  >
                    <div className="text-[12px] text-[#64748b] mb-1">
                      {label}
                    </div>
                    <div className="font-black text-[#172033]">{value}</div>
                  </div>
                ))}
              </div>
              <h3 className="text-[16px] font-black mb-3">线索信号</h3>
              <div className="grid gap-3">
                {selectedCompany.detail.signals.map((signal, index) => (
                  <div
                    key={signal}
                    className="rounded-[14px] border border-[#e5eaf3] bg-white p-3"
                  >
                    <strong className="block mb-1 text-[#172033]">
                      {index === 0
                        ? "专利信号"
                        : index === 1
                          ? "代表性证据"
                          : "轻量判断"}
                    </strong>
                    <p className="m-0 text-[13px] leading-[1.6] text-[#64748b]">
                      {signal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 border-t border-[#e5eaf3] flex flex-wrap gap-2">
              <Button className="rounded-[12px] bg-[#2563eb] text-white font-extrabold hover:bg-[#1d4ed8]">
                关注
              </Button>
              <Button
                variant="outline"
                className="rounded-[12px] font-extrabold"
              >
                入池
              </Button>
              <Button
                variant="outline"
                className="rounded-[12px] font-extrabold"
              >
                初筛分析
              </Button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
