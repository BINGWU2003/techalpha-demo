import { useMemo, useState } from "react";
import { Select as AntSelect } from "antd";
import { ArrowLeft, ChevronRight, Search, X } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CompanyAsset = {
  id: number;
  name: string;
  type: string;
  direction: string;
  domain: string;
  source: string;
  status: string[];
  signals: string[];
  lastAction: string;
  pooled: boolean;
  tracking: boolean;
  report: boolean;
  advice: string;
};

const initialCompanies: CompanyAsset[] = [
  {
    id: 1,
    name: "浙江钠创新能源",
    type: "非上市企业",
    direction: "钠电池正极材料",
    domain: "钠电池正极材料",
    source: "钠电池正极材料企业发现任务",
    status: ["已关注", "待入池"],
    signals: ["专利活跃", "融资动态"],
    lastAction: "生成企业初筛报告",
    pooled: false,
    tracking: false,
    report: true,
    advice:
      "该企业已生成初筛报告，建议根据报告结论决定是否加入标的池，并单独开启跟踪。",
  },
  {
    id: 2,
    name: "中科海钠",
    type: "非上市企业",
    direction: "钠电体系化布局",
    domain: "钠电池正极材料",
    source: "企业库历史关注",
    status: ["标的池", "跟踪中"],
    signals: ["产业协同", "技术领先"],
    lastAction: "更新企业动态",
    pooled: true,
    tracking: true,
    report: true,
    advice: "该企业已在标的池且开启跟踪，可持续观察融资、产品与客户进展。",
  },
  {
    id: 3,
    name: "某新材料科技公司",
    type: "非上市企业",
    direction: "聚阴离子",
    domain: "钠电池正极材料",
    source: "钠电池正极材料企业发现任务",
    status: ["已关注"],
    signals: ["客户线索", "需复核"],
    lastAction: "关注企业",
    pooled: false,
    tracking: false,
    report: false,
    advice: "当前为已关注企业，可先生成初筛报告，再决定是否加入标的池。",
  },
  {
    id: 4,
    name: "某储能材料企业",
    type: "非上市企业",
    direction: "普鲁士蓝",
    domain: "钠电池正极材料",
    source: "人工录入企业",
    status: ["已关注", "低优先级"],
    signals: ["专利增长", "商业化不确定"],
    lastAction: "补充企业标签",
    pooled: false,
    tracking: false,
    report: false,
    advice: "该企业信息仍偏弱，建议补充线索后再考虑初筛。",
  },
  {
    id: 5,
    name: "深圳时识科技有限公司",
    type: "非上市企业",
    direction: "存算一体神经形态芯片",
    domain: "存算一体",
    source: "存算一体企业探索任务",
    status: ["已关注", "已初筛"],
    signals: ["专利信号", "展会线索"],
    lastAction: "查看初筛报告",
    pooled: false,
    tracking: false,
    report: true,
    advice: "已生成初筛报告，建议查看报告后决定是否加入标的池。",
  },
];

const quickFilters = [
  { label: "全部企业", value: "全部企业", count: 68 },
  { label: "已关注", value: "已关注", count: 68 },
  { label: "标的池", value: "标的池", count: 12 },
  { label: "已初筛", value: "已初筛", count: 24 },
  { label: "跟踪中", value: "跟踪中", count: 9 },
];

const toneClass = (label: string) => {
  if (
    ["标的池", "跟踪中", "已初筛", "专利活跃", "产业协同", "专利增长"].includes(
      label,
    )
  ) {
    return "bg-[#eaf8f0] text-[#18a957]";
  }
  if (["待入池", "融资动态", "客户线索", "商业化不确定"].includes(label)) {
    return "bg-[#fff7e8] text-[#bd6b00]";
  }
  if (["低优先级", "需复核"].includes(label)) {
    return "bg-[#f2f5fa] text-[#5d687b]";
  }
  if (["已关注", "钠电体系化布局"].includes(label)) {
    return "bg-[#f2eeff] text-[#7c5cff]";
  }
  return "bg-[#edf4ff] text-[#2f6df6]";
};

const tagClass = (label: string) =>
  `inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-black whitespace-nowrap ${toneClass(label)}`;

export default function CompanyLibrary({
  onBack,
  onGenerateReport,
  onOpenReport,
}: {
  onBack?: () => void;
  onGenerateReport?: () => void;
  onOpenReport?: () => void;
}) {
  const [companies, setCompanies] = useState<CompanyAsset[]>(initialCompanies);
  const [activeFilter, setActiveFilter] = useState("全部企业");
  const [query, setQuery] = useState("");
  const [direction, setDirection] = useState("全部方向");
  const [status, setStatus] = useState("全部状态");
  const [sortBy, setSortBy] = useState("最近更新");
  const [selectedId, setSelectedId] = useState(initialCompanies[0].id);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedCompany =
    companies.find((company) => company.id === selectedId) ?? companies[0];

  const filteredCompanies = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    const data = companies.filter((company) => {
      const matchesQuickFilter =
        activeFilter === "全部企业" ||
        (activeFilter === "已关注"
          ? company.status.includes("已关注") ||
            company.status.includes("标的池")
          : company.status.includes(activeFilter));
      const matchesDirection =
        direction === "全部方向" || company.domain === direction;
      const matchesStatus =
        status === "全部状态" || company.status.includes(status);
      const matchesKeyword =
        !keyword ||
        [
          company.name,
          company.direction,
          company.source,
          company.signals.join(""),
          company.status.join(""),
        ]
          .join("")
          .toLowerCase()
          .includes(keyword);

      return (
        matchesQuickFilter &&
        matchesDirection &&
        matchesStatus &&
        matchesKeyword
      );
    });

    if (sortBy === "已初筛优先") {
      return [...data].sort((a, b) => Number(b.report) - Number(a.report));
    }
    if (sortBy === "最近关注") {
      return [...data].sort((a, b) => b.id - a.id);
    }

    return data;
  }, [activeFilter, companies, direction, query, sortBy, status]);

  const openDrawer = (id: number) => {
    setSelectedId(id);
    setDrawerOpen(true);
  };

  const updateCompany = (
    id: number,
    updater: (company: CompanyAsset) => CompanyAsset,
  ) => {
    setCompanies((current) =>
      current.map((company) =>
        company.id === id ? updater(company) : company,
      ),
    );
  };

  const togglePool = () => {
    updateCompany(selectedCompany.id, (company) => {
      const nextPooled = !company.pooled;
      const statusWithoutPool = company.status.filter(
        (item) => item !== "标的池" && item !== "待入池",
      );
      return {
        ...company,
        pooled: nextPooled,
        status: nextPooled
          ? ["标的池", ...statusWithoutPool.filter((item) => item !== "已关注")]
          : ["已关注", ...statusWithoutPool],
        lastAction: nextPooled ? "加入标的池" : "移出标的池",
      };
    });
  };

  const toggleTracking = () => {
    updateCompany(selectedCompany.id, (company) => {
      const nextTracking = !company.tracking;
      const statusWithoutTracking = company.status.filter(
        (item) => item !== "跟踪中",
      );
      return {
        ...company,
        tracking: nextTracking,
        status: nextTracking
          ? [...statusWithoutTracking, "跟踪中"]
          : statusWithoutTracking,
        lastAction: nextTracking ? "开启企业跟踪" : "关闭企业跟踪",
      };
    });
  };

  const handleReportAction = () => {
    if (selectedCompany.report) {
      onOpenReport?.();
      return;
    }

    updateCompany(selectedCompany.id, (company) => ({
      ...company,
      report: true,
      status: company.status.includes("已初筛")
        ? company.status
        : [...company.status, "已初筛"],
      lastAction: "生成初筛报告",
    }));
    onGenerateReport?.();
  };

  const cancelFollow = () => {
    updateCompany(selectedCompany.id, (company) => ({
      ...company,
      pooled: false,
      tracking: false,
      status: ["已取消关注"],
      lastAction: "取消关注",
    }));
    setDrawerOpen(false);
  };

  return (
    <PageShell>
        <section className="overflow-hidden rounded-[24px] border border-[#e3ebf6] bg-white shadow-[0_12px_34px_rgba(18,39,80,0.06)]">
          <header className="border-b border-[#e3ebf6] bg-linear-to-b from-white to-[#fbfdff] px-[28px] py-[28px]">
            <div className="flex items-center justify-between gap-3 max-md:flex-col max-md:items-start">
              <h1 className="m-0 shrink-0 text-[24px] font-black leading-[1.2] text-[#102039]">
                企业库
              </h1>
              <p className="m-0 max-w-[760px] text-right text-[13px] font-bold leading-[1.65] text-[#8a96a8] max-md:text-left">
                管理已关注企业，沉淀企业资产并推进初筛、入池和跟踪。
              </p>
            </div>
          </header>

          <div className="border-b border-[#e3ebf6] bg-white px-[24px] py-[20px]">
            <div className="mb-[16px] flex flex-wrap gap-[10px]">
              {quickFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant="outline"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`h-auto rounded-full px-[13px] py-[9px] text-[13px] font-black transition-all ${
                    activeFilter === filter.value
                      ? "border-[#bdd1ff] bg-[#edf4ff] text-[#2f6df6] hover:bg-[#e2edff] hover:text-[#2f6df6]"
                      : "border-[#dce6f6] bg-white text-[#4d5b73] hover:border-[#bdd1ff] hover:text-[#2f6df6]"
                  }`}
                >
                  {filter.label}
                  <span className="ml-[4px] text-[#8a96aa]">
                    {filter.count}
                  </span>
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-[minmax(260px,1.5fr)_repeat(3,minmax(150px,1fr))] gap-[10px] max-lg:grid-cols-2 max-sm:grid-cols-1">
              <div className="relative">
                <Search className="pointer-events-none absolute left-[13px] top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a96aa]" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-[42px] rounded-[12px] border-[#e3ebf6] bg-white pl-[38px] text-[13px] text-[#3f4d65] focus-visible:ring-[#2f6df6]/15"
                  placeholder="搜索企业名称或技术标签"
                />
              </div>
              <AntSelect
                value={direction}
                onChange={setDirection}
                size="large"
                className="w-full [&_.ant-select-selector]:rounded-[12px]! [&_.ant-select-selector]:border-[#e3ebf6]!"
                options={[
                  { value: "全部方向", label: "全部方向" },
                  { value: "钠电池正极材料", label: "钠电池正极材料" },
                  { value: "存算一体", label: "存算一体" },
                  { value: "机器人灵巧手", label: "机器人灵巧手" },
                ]}
              />
              <AntSelect
                value={status}
                onChange={setStatus}
                size="large"
                className="w-full [&_.ant-select-selector]:rounded-[12px]! [&_.ant-select-selector]:border-[#e3ebf6]!"
                options={[
                  { value: "全部状态", label: "全部状态" },
                  { value: "已关注", label: "已关注" },
                  { value: "标的池", label: "标的池" },
                  { value: "已初筛", label: "已初筛" },
                  { value: "跟踪中", label: "跟踪中" },
                ]}
              />
              <AntSelect
                value={sortBy}
                onChange={setSortBy}
                size="large"
                className="w-full [&_.ant-select-selector]:rounded-[12px]! [&_.ant-select-selector]:border-[#e3ebf6]!"
                options={[
                  { value: "最近更新", label: "最近更新" },
                  { value: "最近关注", label: "最近关注" },
                  { value: "已初筛优先", label: "已初筛优先" },
                ]}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-[18px] border-b border-[#e3ebf6] bg-[#fbfdff] px-[24px] py-[13px] text-[13px] text-[#536177] max-sm:flex-col max-sm:items-start">
            <div>
              <strong className="text-[#102039]">
                当前结果：{filteredCompanies.length}家
              </strong>
              ｜点击企业行查看详情与资产操作
            </div>
            <div className="text-[#8b96a8]">
              已沉淀企业资产，支持独立入池、跟踪和出报告
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] table-fixed border-collapse bg-white text-[14px]">
              <thead>
                <tr className="bg-[#fbfcff]">
                  <th className="w-[25%] border-b border-[#e3ebf6] px-[18px] py-[14px] text-left text-[12px] font-black text-[#7a8699]">
                    企业
                  </th>
                  <th className="w-[18%] border-b border-[#e3ebf6] px-[18px] py-[14px] text-left text-[12px] font-black text-[#7a8699]">
                    关注方向
                  </th>
                  <th className="w-[22%] border-b border-[#e3ebf6] px-[18px] py-[14px] text-left text-[12px] font-black text-[#7a8699]">
                    资产状态
                  </th>
                  <th className="w-[22%] border-b border-[#e3ebf6] px-[18px] py-[14px] text-left text-[12px] font-black text-[#7a8699]">
                    核心信号
                  </th>
                  <th className="border-b border-[#e3ebf6] px-[18px] py-[14px] text-left text-[12px] font-black text-[#7a8699]">
                    最近动作
                  </th>
                  <th className="w-[54px] border-b border-[#e3ebf6] px-[18px] py-[14px]" />
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <tr
                      key={company.id}
                      onClick={() => openDrawer(company.id)}
                      className={`cursor-pointer transition-colors hover:bg-[#f7faff] ${
                        selectedId === company.id ? "bg-[#f3f7ff]" : ""
                      }`}
                    >
                      <td className="border-b border-[#eef3fa] px-[18px] py-[18px] align-middle">
                        <div className="text-[15px] font-black leading-[1.45] text-[#102039]">
                          {company.name}
                        </div>
                        <div className="mt-[5px] text-[12px] text-[#8a96a8]">
                          来源：{company.source}
                        </div>
                      </td>
                      <td className="border-b border-[#eef3fa] px-[18px] py-[18px] align-middle">
                        <span className={tagClass(company.direction)}>
                          {company.direction}
                        </span>
                      </td>
                      <td className="border-b border-[#eef3fa] px-[18px] py-[18px] align-middle">
                        <div className="flex flex-wrap gap-[7px]">
                          {company.status.map((item) => (
                            <span key={item} className={tagClass(item)}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="border-b border-[#eef3fa] px-[18px] py-[18px] align-middle">
                        <div className="flex flex-wrap gap-[7px]">
                          {company.signals.map((item) => (
                            <span key={item} className={tagClass(item)}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="border-b border-[#eef3fa] px-[18px] py-[18px] align-middle text-[13px] leading-[1.6] text-[#43506a]">
                        {company.lastAction}
                      </td>
                      <td className="border-b border-[#eef3fa] px-[18px] py-[18px] align-middle text-right text-[#a0aabc]">
                        <ChevronRight className="ml-auto h-5 w-5" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-[18px] py-[42px] text-center text-[13px] text-[#8792a6]"
                    >
                      当前条件下暂无企业
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div
          className={`fixed inset-0 z-40 bg-[rgba(12,25,48,0.42)] transition-opacity ${
            drawerOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={() => setDrawerOpen(false)}
        />
        <aside
          className={`fixed right-0 top-0 z-50 flex h-screen w-[460px] max-w-[92vw] flex-col bg-white shadow-[-18px_0_44px_rgba(15,30,60,0.18)] transition-transform duration-200 ${
            drawerOpen ? "translate-x-0" : "translate-x-[104%]"
          }`}
        >
          <div className="h-full overflow-auto p-[22px]">
            <div className="mb-[14px] flex items-start justify-between gap-[14px]">
              <div>
                <h2 className="m-0 text-[24px] font-black leading-[1.35] text-[#102039]">
                  {selectedCompany.name}
                </h2>
                <div className="mt-[8px] text-[13px] text-[#7b879b]">
                  {selectedCompany.direction}｜{selectedCompany.type}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[12px] border border-[#e3ebf6] bg-[#f7f9fd] text-[#6d7890] transition-colors hover:border-[#cbd8eb] hover:text-[#102039]"
                aria-label="关闭详情"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-[7px]">
              <span className={tagClass(selectedCompany.direction)}>
                {selectedCompany.direction}
              </span>
              {selectedCompany.status.map((item) => (
                <span key={item} className={tagClass(item)}>
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-[14px] rounded-[18px] border border-[#e3ebf6] bg-white p-[16px]">
              <h3 className="m-0 mb-[12px] text-[15px] font-black text-[#102039]">
                企业资产信息
              </h3>
              {[
                ["关注方向", selectedCompany.direction],
                ["来源", selectedCompany.source],
                ["资产状态", selectedCompany.status.join("、")],
                ["最近动作", selectedCompany.lastAction],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[94px_1fr] gap-[10px] border-b border-dashed border-[#edf1f7] py-[7px] text-[13px] leading-[1.6] last:border-b-0"
                >
                  <div className="text-[#7b879b]">{label}</div>
                  <div className="font-black text-[#243149]">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-[14px] rounded-[18px] border border-[#e3ebf6] bg-white p-[16px]">
              <h3 className="m-0 mb-[12px] text-[15px] font-black text-[#102039]">
                核心信号
              </h3>
              <p className="m-0 text-[13px] leading-[1.75] text-[#43506a]">
                {selectedCompany.signals.join("、")}
              </p>
            </div>

            <div className="mt-[14px] rounded-[18px] border border-[#e3ebf6] bg-white p-[16px]">
              <h3 className="m-0 mb-[12px] text-[15px] font-black text-[#102039]">
                建议动作
              </h3>
              <p className="m-0 text-[13px] leading-[1.75] text-[#43506a]">
                {selectedCompany.advice}
              </p>
            </div>

            <div className="mt-[16px] grid gap-[10px]">
              <Button
                variant={selectedCompany.pooled ? "default" : "outline"}
                onClick={togglePool}
                className={`h-[42px] rounded-[12px] font-black ${
                  selectedCompany.pooled
                    ? "border-[#18a957] bg-[#18a957] text-white hover:bg-[#15964d]"
                    : "border-[#e3ebf6] bg-white text-[#102039] hover:border-[#cbd8eb]"
                }`}
              >
                {selectedCompany.pooled ? "已在标的池" : "加入标的池"}
              </Button>
              <Button
                onClick={toggleTracking}
                className={`h-[42px] rounded-[12px] font-black ${
                  selectedCompany.tracking
                    ? "border-[#18a957] bg-[#18a957] text-white hover:bg-[#15964d]"
                    : "border-[#2f6df6] bg-[#2f6df6] text-white shadow-[0_10px_20px_rgba(47,109,246,0.16)] hover:bg-[#255ed7]"
                }`}
              >
                {selectedCompany.tracking ? "已开启跟踪" : "开启跟踪"}
              </Button>
              <Button
                variant="outline"
                onClick={handleReportAction}
                className="h-[42px] rounded-[12px] border-[#e3ebf6] bg-white font-black text-[#102039] hover:border-[#cbd8eb]"
              >
                {selectedCompany.report ? "查看初筛报告" : "生成初筛报告"}
              </Button>
              <Button
                variant="outline"
                onClick={cancelFollow}
                className="h-[42px] rounded-[12px] border-[#ffd6d6] bg-white font-black text-[#ef4444] hover:border-[#ffc1c1] hover:text-[#dc2626]"
              >
                取消关注
              </Button>
            </div>
          </div>
        </aside>
    </PageShell>
  );
}
