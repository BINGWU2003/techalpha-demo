import { useMemo, useState } from "react";
import type { TableProps } from "antd";
import { Table as AntTable } from "antd";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./DeepMinePhase2.module.css";

type Enterprise = {
  id: number;
  name: string;
  statusText: string;
  techDirection: Array<{ text: string; type: string }>;
  coreSignals: Array<{ text: string; type: string }>;
  score: number;
  followed: boolean;
  pooled: boolean;
  selected: boolean;
};

export default function DeepMinePhase2({
  onBack,
  onGenerateReport,
}: {
  onBack?: () => void;
  onGenerateReport?: () => void;
}) {
  const [activeFilter, setActiveFilter] = useState("推荐");
  const [notice, setNotice] = useState("");
  const [enterprises, setEnterprises] = useState<Enterprise[]>([
    {
      id: 1,
      name: "浙江钠创新能源有限公司",
      statusText: "推荐结果",
      techDirection: [{ text: "钠离子电池", type: "blue" }],
      coreSignals: [{ text: "专利布局", type: "green" }],
      score: 99,
      followed: false,
      pooled: false,
      selected: true,
    },
    {
      id: 2,
      name: "溧阳中科海钠科技有限责任公司",
      statusText: "推荐结果 · 已关注",
      techDirection: [{ text: "层状氧化物", type: "blue" }],
      coreSignals: [
        { text: "专利活跃", type: "green" },
        { text: "核心技术", type: "orange" },
      ],
      score: 94,
      followed: true,
      pooled: false,
      selected: true,
    },
    {
      id: 3,
      name: "格林美股份有限公司",
      statusText: "推荐结果 · 循环经济领军",
      techDirection: [{ text: "回收体系", type: "purple" }],
      coreSignals: [
        { text: "供应链协同", type: "orange" },
        { text: "回收技术", type: "blue" },
      ],
      score: 91,
      followed: false,
      pooled: false,
      selected: true,
    },
    {
      id: 4,
      name: "宁德时代新能源科技股份有限公司",
      statusText: "推荐结果 · 技术风向标",
      techDirection: [{ text: "全体系布局", type: "blue" }],
      coreSignals: [
        { text: "研发爆发", type: "green" },
        { text: "极高壁垒", type: "blue" },
      ],
      score: 98,
      followed: false,
      pooled: false,
      selected: true,
    },
    {
      id: 5,
      name: "深圳珈钠能源科技有限公司",
      statusText: "推荐结果 · 高潜力初创",
      techDirection: [{ text: "聚阴离子", type: "purple" }],
      coreSignals: [
        { text: "融资密集", type: "orange" },
        { text: "中试线启动", type: "green" },
      ],
      score: 88,
      followed: false,
      pooled: false,
      selected: true,
    },
    {
      id: 6,
      name: "荆门市格林美新材料有限公司",
      statusText: "推荐结果 · 核心生产基地",
      techDirection: [{ text: "三元前驱体", type: "blue" }],
      coreSignals: [
        { text: "产能扩张", type: "green" },
        { text: "品质优势", type: "orange" },
      ],
      score: 86,
      followed: false,
      pooled: false,
      selected: true,
    },
    {
      id: 7,
      name: "湖南邦普循环科技有限公司",
      statusText: "推荐结果 · 循环龙头",
      techDirection: [{ text: "退役电池回收", type: "purple" }],
      coreSignals: [
        { text: "战略布局", type: "orange" },
        { text: "技术熟度高", type: "green" },
      ],
      score: 89,
      followed: false,
      pooled: false,
      selected: true,
    },
    {
      id: 8,
      name: "广东邦普循环科技有限公司",
      statusText: "推荐结果 · 系统集成优势",
      techDirection: [{ text: "全产业链", type: "blue" }],
      coreSignals: [
        { text: "生态协同", type: "green" },
        { text: "行业标准", type: "orange" },
      ],
      score: 90,
      followed: false,
      pooled: false,
      selected: true,
    },
  ]);

  const visibleEnterprises = useMemo(() => {
    switch (activeFilter) {
      case "已关注":
        return enterprises.filter((ent) => ent.followed);
      case "已入池":
        return enterprises.filter((ent) => ent.pooled);
      case "推荐":
      case "全部结果":
      default:
        return enterprises;
    }
  }, [activeFilter, enterprises]);

  const visibleIds = useMemo(
    () => new Set(visibleEnterprises.map((ent) => ent.id)),
    [visibleEnterprises],
  );
  const selectedVisibleCount = visibleEnterprises.filter(
    (ent) => ent.selected,
  ).length;
  const allSelected =
    visibleEnterprises.length > 0 &&
    visibleEnterprises.every((ent) => ent.selected);
  const someSelected = selectedVisibleCount > 0;
  const selectedRowKeys = visibleEnterprises
    .filter((ent) => ent.selected)
    .map((ent) => ent.id);

  const setFilter = (filter: string) => {
    setActiveFilter(filter);
    setNotice("");
  };

  const toggleAll = () => {
    setNotice("");
    setEnterprises((prev) =>
      prev.map((ent) =>
        visibleIds.has(ent.id) ? { ...ent, selected: !allSelected } : ent,
      ),
    );
  };

  const toggleSelection = (id: number) => {
    setNotice("");
    setEnterprises((prev) =>
      prev.map((ent) =>
        ent.id === id ? { ...ent, selected: !ent.selected } : ent,
      ),
    );
  };

  const handleBatchFollow = () => {
    const selectedIds = new Set(
      visibleEnterprises
        .filter((ent) => ent.selected && !ent.followed)
        .map((ent) => ent.id),
    );
    const skippedCount = selectedVisibleCount - selectedIds.size;

    setEnterprises((prev) =>
      prev.map((ent) => {
        if (selectedIds.has(ent.id)) {
          let newStatus = ent.statusText;
          if (!newStatus.includes("已关注")) {
            newStatus += " · 已关注";
          }
          return { ...ent, followed: true, statusText: newStatus };
        }
        return ent;
      }),
    );

    setNotice(
      selectedIds.size > 0
        ? `已新增关注 ${selectedIds.size} 家${skippedCount > 0 ? `，${skippedCount} 家已关注` : ""}`
        : "选中企业均已关注，无需重复操作",
    );
  };

  const handleBatchPool = () => {
    const selectedIds = new Set(
      visibleEnterprises
        .filter((ent) => ent.selected && !ent.pooled)
        .map((ent) => ent.id),
    );
    const skippedCount = selectedVisibleCount - selectedIds.size;

    setEnterprises((prev) =>
      prev.map((ent) => {
        if (selectedIds.has(ent.id)) {
          let newStatus = ent.statusText;
          if (!newStatus.includes("已入池")) {
            newStatus += " · 已入池";
          }
          return { ...ent, pooled: true, statusText: newStatus };
        }
        return ent;
      }),
    );

    setNotice(
      selectedIds.size > 0
        ? `已新增入池 ${selectedIds.size} 家${skippedCount > 0 ? `，${skippedCount} 家已入池` : ""}`
        : "选中企业均已入池，无需重复操作",
    );
  };

  const handleFollow = (id: number) => {
    setNotice("");
    setEnterprises((prev) =>
      prev.map((ent) => {
        if (ent.id === id) {
          const isNowFollowed = !ent.followed;
          let newStatus = ent.statusText;
          if (isNowFollowed && !newStatus.includes("已关注")) {
            newStatus += " · 已关注";
          } else if (!isNowFollowed && newStatus.includes(" · 已关注")) {
            newStatus = newStatus.replace(" · 已关注", "");
          }
          return { ...ent, followed: isNowFollowed, statusText: newStatus };
        }
        return ent;
      }),
    );
  };

  const handlePool = (id: number) => {
    setNotice("");
    setEnterprises((prev) =>
      prev.map((ent) => {
        if (ent.id === id) {
          const isNowPooled = !ent.pooled;
          let newStatus = ent.statusText;
          if (isNowPooled && !newStatus.includes("已入池")) {
            newStatus += " · 已入池";
          } else if (!isNowPooled && newStatus.includes(" · 已入池")) {
            newStatus = newStatus.replace(" · 已入池", "");
          }
          return { ...ent, pooled: isNowPooled, statusText: newStatus };
        }
        return ent;
      }),
    );
  };

  const getTagClasses = (type: string) => {
    switch (type) {
      case "blue":
        return "bg-[#eaf1ff] text-[#2563eb]";
      case "green":
        return "bg-[#eafaf1] text-[#16a34a]";
      case "orange":
        return "bg-[#fff7e8] text-[#d97706]";
      case "purple":
        return "bg-[#f3ecff] text-[#8b5cf6]";
      default:
        return "bg-[#f8fafc] text-[#64748b]";
    }
  };

  const enterpriseColumns: TableProps<Enterprise>["columns"] = [
    {
      title: "企业",
      dataIndex: "name",
      key: "name",
      render: (_, ent) => (
        <>
          <div className="font-black text-[#172033]">{ent.name}</div>
          <div className="text-[12px] text-[#64748b] mt-1">
            {ent.statusText}
          </div>
        </>
      ),
    },
    {
      title: "技术方向",
      dataIndex: "techDirection",
      key: "techDirection",
      render: (_, ent) => (
        <div className="flex gap-2 flex-wrap">
          {ent.techDirection.map((tag) => (
            <span
              key={`${ent.id}-direction-${tag.text}`}
              className={`inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap ${getTagClasses(tag.type)}`}
            >
              {tag.text}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "核心信号",
      dataIndex: "coreSignals",
      key: "coreSignals",
      render: (_, ent) => (
        <div className="flex gap-2 flex-wrap">
          {ent.coreSignals.map((tag) => (
            <span
              key={`${ent.id}-signal-${tag.text}`}
              className={`inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap ${getTagClasses(tag.type)}`}
            >
              {tag.text}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "评分",
      dataIndex: "score",
      key: "score",
      render: (score) => <span className="font-black">{score}</span>,
    },
    {
      title: "操作",
      key: "action",
      align: "right",
      render: (_, ent) => (
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={() => handleFollow(ent.id)}
            className={`h-[32px] px-[10px] rounded-[10px] text-[12px] font-extrabold ${ent.followed ? "border-[#eafaf1] bg-[#eafaf1] text-[#16a34a] hover:bg-[#dcfce7]" : ""}`}
          >
            {ent.followed ? "已关注" : "关注"}
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePool(ent.id)}
            className={`h-[32px] px-[10px] rounded-[10px] text-[12px] font-extrabold ${ent.pooled ? "border-[#fff7e8] bg-[#fff7e8] text-[#d97706] hover:bg-[#fef3c7]" : ""}`}
          >
            {ent.pooled ? "已入池" : "入池"}
          </Button>
          <Button
            onClick={onGenerateReport}
            className="h-[32px] px-[10px] rounded-[10px] text-[12px] font-extrabold bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
          >
            出报告
          </Button>
        </div>
      ),
    },
  ];

  const rowSelection: TableProps<Enterprise>["rowSelection"] = {
    selectedRowKeys,
    onSelect: (record) => toggleSelection(record.id),
    onSelectAll: () => toggleAll(),
    columnWidth: 36,
  };

  return (
    <div className="max-w-[1280px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
      <div className="grid grid-cols-1 gap-[18px] items-start">
        <main>
          {/* Panel 1 */}
          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <h1 className="text-[26px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">
                  企业发现结果
                </h1>
                <p className="mt-2 text-[#64748b] text-[14px] leading-[1.65]">
                  这里展示的是本次任务的“任务结果池”。推荐企业不直接进入企业库，只有用户关注、入池、出报告或开启跟踪后，才沉淀为企业资产。
                </p>
              </div>
            </div>
          </section>

          {/* Panel 2 */}
          <section className="mt-[18px] bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="mb-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
              <div className="rounded-[14px] border border-[#dbeafe] bg-[#eff6ff] px-3 py-2">
                <div className="mb-1 flex items-center gap-2 text-[12px] font-bold text-[#2563eb]">
                  <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
                  任务结果
                </div>
                <div className="text-[18px] font-black text-[#172033]">
                  {enterprises.length}
                  <span className="ml-1 text-[12px] font-bold text-[#64748b]">
                    家
                  </span>
                </div>
              </div>
              <div className="rounded-[14px] border border-[#e9d5ff] bg-[#faf5ff] px-3 py-2">
                <div className="mb-1 flex items-center gap-2 text-[12px] font-bold text-[#8b5cf6]">
                  <span className="h-2 w-2 rounded-full bg-[#8b5cf6]" />
                  推荐
                </div>
                <div className="text-[18px] font-black text-[#172033]">
                  {enterprises.length}
                  <span className="ml-1 text-[12px] font-bold text-[#64748b]">
                    家
                  </span>
                </div>
              </div>
              <div className="rounded-[14px] border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-2">
                <div className="mb-1 flex items-center gap-2 text-[12px] font-bold text-[#16a34a]">
                  <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
                  已关注
                </div>
                <div className="text-[18px] font-black text-[#172033]">
                  {enterprises.filter((e) => e.followed).length}
                  <span className="ml-1 text-[12px] font-bold text-[#64748b]">
                    家
                  </span>
                </div>
              </div>
              <div className="rounded-[14px] border border-[#fed7aa] bg-[#fff7ed] px-3 py-2">
                <div className="mb-1 flex items-center gap-2 text-[12px] font-bold text-[#d97706]">
                  <span className="h-2 w-2 rounded-full bg-[#d97706]" />
                  已入池
                </div>
                <div className="text-[18px] font-black text-[#172033]">
                  {enterprises.filter((e) => e.pooled).length}
                  <span className="ml-1 text-[12px] font-bold text-[#64748b]">
                    家
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-[10px] items-start md:items-center justify-between mb-4">
              <div className="flex flex-wrap gap-2">
                {["推荐", "全部结果", "已关注", "已入池"].map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    onClick={() => setFilter(filter)}
                    className={`rounded-full px-[12px] h-[34px] text-[12px] font-extrabold ${activeFilter === filter ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]" : "text-[#64748b]"}`}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto mt-2 md:mt-0">
                <Button
                  variant="outline"
                  onClick={handleBatchFollow}
                  disabled={!someSelected}
                  className="h-[42px] px-[16px] rounded-[13px] font-extrabold flex-1 md:flex-none"
                >
                  批量关注（{selectedVisibleCount}）
                </Button>
                <Button
                  variant="outline"
                  onClick={handleBatchPool}
                  disabled={!someSelected}
                  className="h-[42px] px-[16px] rounded-[13px] font-extrabold flex-1 md:flex-none"
                >
                  批量入池（{selectedVisibleCount}）
                </Button>
              </div>
            </div>

            <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-[14px] border border-[#e5eaf3] bg-[#f8fafc] px-3 py-2 text-[12px] text-[#64748b]">
              <span>
                当前视图 {visibleEnterprises.length} 家，已选{" "}
                {selectedVisibleCount} 家
              </span>
              {notice && (
                <span className="font-bold text-[#2563eb]">{notice}</span>
              )}
            </div>

            <AntTable<Enterprise>
              className={styles.table}
              columns={enterpriseColumns}
              dataSource={visibleEnterprises}
              rowKey="id"
              rowSelection={rowSelection}
              pagination={false}
              scroll={{ x: 700 }}
              locale={{
                emptyText: "当前视图暂无企业，请切换上方筛选。",
              }}
            />
            <div className="mt-5 flex justify-start border-t border-[#edf2f8] pt-5">
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
    </div>
  );
}
