import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  LoaderCircle,
  PanelRightOpen,
  X,
} from "lucide-react";
import { Resizable } from "re-resizable";

const ALL_PATENT_DATA = [
  { year: "2010", count: 45 },
  { year: "2011", count: 78 },
  { year: "2012", count: 102 },
  { year: "2013", count: 145 },
  { year: "2014", count: 112 },
  { year: "2015", count: 168 },
  { year: "2016", count: 182 },
  { year: "2017", count: 195 },
  { year: "2018", count: 245 },
  { year: "2019", count: 188 },
  { year: "2020", count: 250 },
  { year: "2021", count: 272 },
  { year: "2022", count: 290 },
  { year: "2023", count: 325 },
  { year: "2024", count: 295 },
  { year: "2025", count: 318 },
];

const TECH_PATENT_DATA = [
  { year: "2010", layered: 40, polyAnion: 12, prussian: 20 },
  { year: "2011", layered: 52, polyAnion: 28, prussian: 32 },
  { year: "2012", layered: 72, polyAnion: 45, prussian: 60 },
  { year: "2013", layered: 95, polyAnion: 32, prussian: 72 },
  { year: "2014", layered: 82, polyAnion: 50, prussian: 52 },
  { year: "2015", layered: 105, polyAnion: 68, prussian: 80 },
  { year: "2016", layered: 112, polyAnion: 82, prussian: 102 },
  { year: "2017", layered: 124, polyAnion: 95, prussian: 108 },
  { year: "2018", layered: 142, polyAnion: 102, prussian: 82 },
  { year: "2019", layered: 132, polyAnion: 98, prussian: 55 },
  { year: "2020", layered: 110, polyAnion: 105, prussian: 65 },
  { year: "2021", layered: 125, polyAnion: 120, prussian: 72 },
  { year: "2022", layered: 142, polyAnion: 112, prussian: 80 },
  { year: "2023", layered: 162, polyAnion: 115, prussian: 75 },
  { year: "2024", layered: 152, polyAnion: 122, prussian: 76 },
  { year: "2025", layered: 165, polyAnion: 118, prussian: 78 },
];

const PATENT_TYPE_DATA = [
  { name: "发明公开", value: 214, percentage: "61.14%", color: "#3b82f6" },
  { name: "发明授权", value: 89, percentage: "25.43%", color: "#f59e0b" },
  { name: "其他", value: 47, percentage: "13.43%", color: "#10b981" },
];

const PATENT_VALIDITY_DATA = [
  { name: "审中 / 有效", value: 251, percentage: "71.71%", color: "#10b981" },
  { name: "公开 / 其他", value: 78, percentage: "22.29%", color: "#3b82f6" },
  { name: "无效", value: 21, percentage: "6.00%", color: "#f43f5e" },
];

const WORDS = [
  { text: "钠离子电池", size: "32px", color: "#2563eb", bold: true },
  { text: "正极材料", size: "20px", color: "#60a5fa" },
  { text: "硬碳负极", size: "18px", color: "#3b82f6", bold: true },
  { text: "电解液", size: "16px", color: "#93c5fd" },
  { text: "层状氧化物", size: "15px", color: "#60a5fa" },
  { text: "普鲁士蓝", size: "15px", color: "#93c5fd" },
  { text: "聚阴离子", size: "15px", color: "#60a5fa" },
  { text: "能量密度", size: "14px", color: "#bfdbfe" },
  { text: "循环寿命", size: "14px", color: "#93c5fd" },
  { text: "低成本", size: "14px", color: "#bfdbfe" },
  { text: "规模化", size: "14px", color: "#93c5fd" },
  { text: "储能应用", size: "14px", color: "#bfdbfe" },
  { text: "动力电池", size: "13px", color: "#93c5fd" },
  { text: "快充技术", size: "13px", color: "#bfdbfe" },
  { text: "安全性能", size: "13px", color: "#93c5fd" },
  { text: "前驱体", size: "12px", color: "#bfdbfe" },
  { text: "包覆改性", size: "11px", color: "#d1d5db" },
  { text: "补钠技术", size: "11px", color: "#d1d5db" },
  { text: "固态电解质", size: "10px", color: "#d1d5db" },
  { text: "隔膜材料", size: "10px", color: "#d1d5db" },
];

const INDUSTRY_ENTERPRISE_COUNT = 350;

const SCAN_DRAWER_WIDTH_STORAGE_KEY = "deep-mine-scan-drawer-width-v1";
const COMPACT_SCAN_DRAWER_WIDTH = 460;
const MIN_SCAN_DRAWER_WIDTH = 360;

function getInitialScanDrawerWidth() {
  const storedWidth = Number(
    window.localStorage.getItem(SCAN_DRAWER_WIDTH_STORAGE_KEY),
  );
  const maxWidth = window.innerWidth * 0.75;

  if (!Number.isFinite(storedWidth) || storedWidth <= 0) {
    return window.innerWidth < 1024
      ? Math.min(COMPACT_SCAN_DRAWER_WIDTH, window.innerWidth * 0.92)
      : "36%";
  }

  return Math.min(
    Math.max(storedWidth, Math.min(MIN_SCAN_DRAWER_WIDTH, maxWidth)),
    maxWidth,
  );
}

const TECH_ROUTE_DATA = [
  {
    name: "SNN 异步事件驱动",
    subjectCount: 92,
    activeCount: 31,
    patentCount: 186,
  },
  {
    name: "忆阻器交叉阵列",
    subjectCount: 76,
    activeCount: 22,
    patentCount: 143,
  },
  { name: "3D 混合集成", subjectCount: 54, activeCount: 18, patentCount: 99 },
  {
    name: "存算一体架构",
    subjectCount: 128,
    activeCount: 43,
    patentCount: 238,
  },
];

const ROUTE_PATENT_SHARE_DATA = [
  { name: "存算一体架构", value: 38, color: "#3b82f6" },
  { name: "SNN 异步事件驱动", value: 27, color: "#10b981" },
  { name: "忆阻器交叉阵列", value: 21, color: "#f59e0b" },
  { name: "3D 混合集成", value: 14, color: "#8b5cf6" },
];

const ROUTE_PATENT_TREND_DATA = [
  { year: "2014", compute: 36, snn: 24, memristor: 14 },
  { year: "2015", compute: 42, snn: 30, memristor: 22 },
  { year: "2016", compute: 58, snn: 39, memristor: 26 },
  { year: "2017", compute: 86, snn: 52, memristor: 35 },
  { year: "2018", compute: 108, snn: 70, memristor: 50 },
  { year: "2019", compute: 120, snn: 98, memristor: 64 },
  { year: "2020", compute: 158, snn: 116, memristor: 82 },
  { year: "2021", compute: 140, snn: 110, memristor: 102 },
  { year: "2022", compute: 164, snn: 132, memristor: 128 },
  { year: "2023", compute: 196, snn: 154, memristor: 148 },
  { year: "2024", compute: 224, snn: 180, memristor: 154 },
  { year: "2025", compute: 188, snn: 174, memristor: 166 },
];

const PATENT_SCALE_DATA = [
  { name: ">100件 (超大)", value: 8 },
  { name: "50-100件 (大型)", value: 25 },
  { name: "10-50件 (中型)", value: 72 },
  { name: "3-10件 (小型)", value: 135 },
  { name: "1-3件 (微型)", value: 110 },
];

const RELEVANCE_DATA = [
  { name: "4-5", value: 45 },
  { name: "3-4", value: 125 },
  { name: "2-3", value: 110 },
  { name: "1-2", value: 50 },
  { name: "0-1", value: 20 },
];

const COVERAGE_DATA = [
  { name: "1", value: 150 },
  { name: "2", value: 85 },
  { name: "3", value: 45 },
  { name: "4", value: 20 },
  { name: "5", value: 8 },
  { name: "6", value: 2 },
];

const RELEVANT_PATENT_RATIO_DATA = [
  { name: "80-100%", value: 35 },
  { name: "60-80%", value: 85 },
  { name: "40-60%", value: 110 },
  { name: "20-40%", value: 75 },
  { name: "0-20%", value: 45 },
];

const FUNDING_DATA = [
  {
    name: "深圳珈钠能源科技有限公司",
    round: "A轮",
    amount: "数亿元人民币",
    date: "2024-05",
    investor: "光速光合、春华资本",
  },
  {
    name: "江苏众钠能源科技有限公司",
    round: "Pre-A轮",
    amount: "超亿元人民币",
    date: "2024-03",
    investor: "同创伟业、国投招商",
  },
  {
    name: "中科海钠科技有限责任公司",
    round: "B轮",
    amount: "数亿元人民币",
    date: "2023-12",
    investor: "海松资本、哈勃投资",
  },
  {
    name: "北京中科海钠科技有限责任公司",
    round: "A+轮",
    amount: "数亿元人民币",
    date: "2023-08",
    investor: "华为哈勃",
  },
  {
    name: "浙江钠创新能源有限公司",
    round: "A轮",
    amount: "数亿元人民币",
    date: "2023-05",
    investor: "淮海控股集团",
  },
];

const AWARDS_DATA = [
  {
    name: "深圳珈钠能源科技有限公司",
    award: "第十届“创客中国”深圳市中小企业创新创业大赛 一等奖",
    date: "2024-09",
  },
  {
    name: "江苏众钠能源科技有限公司",
    award: "2024年全国新能源创新创业大赛 金奖",
    date: "2024-08",
  },
  {
    name: "中科海钠科技有限责任公司",
    award: "第三届“创青春”中国青年碳中和创新创业大赛 特等奖",
    date: "2024-06",
  },
  {
    name: "浙江钠创新能源有限公司",
    award: "2023年“创客中国”浙江省中小企业创新创业大赛 二等奖",
    date: "2023-11",
  },
  {
    name: "深圳珈钠能源科技有限公司",
    award: "2025（第四届）起点钠电金鼎奖",
    date: "2024-01",
  },
];

type DeepMineAnalysisProps = {
  onNextStep: () => void;
  onExplore?: () => void;
  onBack?: () => void;
};

export default function DeepMineAnalysis({
  onExplore,
  onBack,
}: DeepMineAnalysisProps) {
  const [scanDrawerOpen, setScanDrawerOpen] = useState(true);
  const [scanDrawerWidth, setScanDrawerWidth] = useState(
    getInitialScanDrawerWidth,
  );
  const [isCompactLayout, setIsCompactLayout] = useState(
    () => window.innerWidth < 1024,
  );
  const [previousRoundExpanded, setPreviousRoundExpanded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const handleChange = (event: MediaQueryListEvent) =>
      setIsCompactLayout(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <PageShell className="h-screen max-w-none overflow-hidden p-4 max-md:p-3">
      <div className="flex h-full items-stretch gap-4">
        <main className="min-w-0 flex-1 overflow-y-auto pr-1">
          <section className="overflow-hidden bg-white border border-[#e5eaf3] rounded-[24px] shadow-[0_14px_32px_rgba(15,23,42,0.06)]">
            <div className="border-b border-[#e5eaf3] bg-linear-to-br from-[#f8fbff] to-white p-[22px]">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-[24px] font-black m-0 text-[#102039]">
                  线索分析
                </h2>
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e4ff] bg-white/80 px-3 py-1.5 text-[13px] font-extrabold text-[#2563eb] shadow-sm">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2563eb] opacity-30"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-[#2563eb]"></span>
                    </span>
                    <span>正在分析中...</span>
                  </div>
                  {!scanDrawerOpen && (
                    <button
                      type="button"
                      onClick={() => setScanDrawerOpen(true)}
                      className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[11px] border border-[#cbdcff] bg-[#f3f7ff] px-3.5 text-[13px] font-black text-[#2f6df6] transition-colors hover:border-[#a9c2ff] hover:bg-[#eaf1ff]"
                    >
                      <PanelRightOpen className="size-4" />
                      线索扫描记录
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-[22px]">
              {/* Enterprise Statistics Section */}
              <div className="space-y-5 mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white border border-[#e5eaf3] rounded-[20px] p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-[18px] font-black text-[#0f1f3d] mb-1">
                        候选企业线索已形成
                      </h3>
                      <p className="text-[13px] leading-[1.7] text-[#64748b]">
                        已基于已选技术方向完成企业主体识别、线索归并和去重。下一步可进入企业探索，查看候选企业、筛选条件和轻量证据。
                      </p>
                    </div>
                    <div className="flex items-baseline gap-2 md:shrink-0">
                      <strong className="text-[42px] leading-none font-black text-[#0f1f3d] tracking-tight">
                        {INDUSTRY_ENTERPRISE_COUNT}
                      </strong>
                      <span className="text-lg font-bold text-[#64748b]">
                        家
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6">
                  <h3 className="text-[22px] font-black text-[#0f1f3d] mb-1">
                    技术路线线索统计
                  </h3>
                  <p className="text-[13px] leading-[1.7] text-[#64748b] mb-5">
                    注：同一企业可能覆盖多个技术路线，因此各路线企业数为非去重统计。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {TECH_ROUTE_DATA.map((route) => (
                      <div
                        key={route.name}
                        className="border border-[#e5eaf3] rounded-[18px] p-5 bg-white hover:border-[#bfdbfe] transition-colors"
                      >
                        <h4 className="text-[17px] font-black text-[#0f1f3d] mb-5">
                          {route.name}
                        </h4>
                        <div className="grid gap-2.5">
                          <div className="flex items-center justify-between rounded-[12px] bg-[#f8fafc] px-3 py-2">
                            <span className="text-[12px] text-[#64748b] whitespace-nowrap">
                              主体数
                            </span>
                            <strong className="text-[20px] leading-none text-[#2563eb]">
                              {route.subjectCount}
                            </strong>
                          </div>
                          <div className="flex items-center justify-between rounded-[12px] bg-[#f8fafc] px-3 py-2">
                            <span className="text-[12px] text-[#64748b] whitespace-nowrap">
                              近三年活跃
                            </span>
                            <strong className="text-[20px] leading-none text-[#10b981]">
                              {route.activeCount}
                            </strong>
                          </div>
                          <div className="flex items-center justify-between rounded-[12px] bg-[#f8fafc] px-3 py-2">
                            <span className="text-[12px] text-[#64748b] whitespace-nowrap">
                              相关专利
                            </span>
                            <strong className="text-[20px] leading-none text-[#f59e0b]">
                              {route.patentCount}
                            </strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4">
                  <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-1.5 h-5 bg-[#2563eb] rounded-full"></div>
                      <h3 className="text-[18px] font-black text-[#0f1f3d]">
                        专利趋势统计
                      </h3>
                    </div>
                    <div className="h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={ROUTE_PATENT_TREND_DATA}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#eef2f7"
                          />
                          <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94a3b8", fontSize: 11 }}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94a3b8", fontSize: 11 }}
                          />
                          <Tooltip
                            contentStyle={{
                              borderRadius: "12px",
                              border: "none",
                              boxShadow: "none",
                            }}
                          />
                          <Line
                            name="存算一体架构"
                            type="monotone"
                            dataKey="compute"
                            stroke="#2563eb"
                            strokeWidth={4}
                            dot={false}
                          />
                          <Line
                            name="SNN 异步事件驱动"
                            type="monotone"
                            dataKey="snn"
                            stroke="#10b981"
                            strokeWidth={4}
                            dot={false}
                          />
                          <Line
                            name="忆阻器交叉阵列"
                            type="monotone"
                            dataKey="memristor"
                            stroke="#f59e0b"
                            strokeWidth={4}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6">
                    <div className="flex items-center gap-2 mb-7">
                      <div className="w-1.5 h-5 bg-[#10b981] rounded-full"></div>
                      <h3 className="text-[18px] font-black text-[#0f1f3d]">
                        技术路线专利占比
                      </h3>
                    </div>
                    <div className="space-y-5">
                      {ROUTE_PATENT_SHARE_DATA.map((item) => (
                        <div key={item.name}>
                          <div className="grid grid-cols-[12px_1fr_auto] items-center gap-3 text-[14px] mb-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></span>
                            <span className="text-[#172033]">{item.name}</span>
                            <b className="text-[#0f1f3d]">{item.value}%</b>
                          </div>
                          <div className="h-2 rounded-full bg-[#eef2f7] overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${item.value}%`,
                                backgroundColor: item.color,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6">
                    <h3 className="text-[20px] font-black text-[#0f1f3d] mb-1">
                      专利类型分布
                    </h3>
                    <p className="text-[13px] text-[#64748b] mb-5">
                      展示当前方向下的专利类型结构。
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-5 items-center">
                      <div className="relative w-[140px] h-[140px] mx-auto">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={PATENT_TYPE_DATA}
                              cx="50%"
                              cy="50%"
                              innerRadius={44}
                              outerRadius={70}
                              dataKey="value"
                            >
                              {PATENT_TYPE_DATA.map((entry, index) => (
                                <Cell
                                  key={`patent-type-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-4">
                        {PATENT_TYPE_DATA.map((item) => (
                          <div
                            key={item.name}
                            className="grid grid-cols-[12px_1fr_auto] gap-3 items-center text-[14px]"
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></span>
                            <span className="text-[#172033]">{item.name}</span>
                            <b className="text-[#0f1f3d]">{item.value}</b>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6">
                    <h3 className="text-[20px] font-black text-[#0f1f3d] mb-1">
                      专利有效性分布
                    </h3>
                    <p className="text-[13px] text-[#64748b] mb-5">
                      展示当前专利权处于受法律保护状态的比例。
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-5 items-center">
                      <div className="relative w-[140px] h-[140px] mx-auto">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={PATENT_VALIDITY_DATA}
                              cx="50%"
                              cy="50%"
                              innerRadius={44}
                              outerRadius={70}
                              dataKey="value"
                            >
                              {PATENT_VALIDITY_DATA.map((entry, index) => (
                                <Cell
                                  key={`patent-validity-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-4">
                        {PATENT_VALIDITY_DATA.map((item) => (
                          <div
                            key={item.name}
                            className="grid grid-cols-[12px_1fr_auto] gap-3 items-center text-[14px]"
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></span>
                            <span className="text-[#172033]">{item.name}</span>
                            <b className="text-[#0f1f3d]">{item.value}</b>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-[#e5eaf3] rounded-[16px] p-5">
                  <span className="block text-[#64748b] text-[13px] mb-2">
                    检索专利总数
                  </span>
                  <div className="flex items-baseline gap-1">
                    <strong className="text-[28px] font-bold text-[#172033]">
                      850
                    </strong>
                    <span className="text-[#64748b] text-[13px]">件</span>
                  </div>
                </div>
                <div className="bg-white border border-[#e5eaf3] rounded-[16px] p-5">
                  <span className="block text-[#64748b] text-[13px] mb-2">
                    高价值专利 (发明)
                  </span>
                  <div className="flex items-baseline gap-1">
                    <strong className="text-[28px] font-bold text-[#2563eb]">
                      330
                    </strong>
                    <span className="text-[#64748b] text-[13px]">件</span>
                  </div>
                </div>
                <div className="bg-white border border-[#e5eaf3] rounded-[16px] p-5">
                  <span className="block text-[#64748b] text-[13px] mb-2">
                    高相关性专利
                  </span>
                  <div className="flex items-baseline gap-1">
                    <strong className="text-[28px] font-bold text-[#16a34a]">
                      297
                    </strong>
                    <span className="text-[#64748b] text-[13px]">件</span>
                  </div>
                </div>
                <div className="bg-white border border-[#e5eaf3] rounded-[16px] p-5">
                  <span className="block text-[#64748b] text-[13px] mb-2">
                    近三年新增专利
                  </span>
                  <div className="flex items-baseline gap-1">
                    <strong className="text-[28px] font-bold text-[#f59e0b]">
                      429
                    </strong>
                    <span className="text-[#64748b] text-[13px]">件</span>
                  </div>
                </div>
              </div>

              {/* Line Charts Row */}
              <div className="grid grid-cols-1 gap-4 mt-4 text-[#172033]">
                {/* All Patents Line Chart */}
                <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-4 bg-[#2563eb] rounded-full"></div>
                    <h3 className="text-[15px] font-bold">
                      钠电池正极材料相关全部专利统计
                    </h3>
                  </div>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={ALL_PATENT_DATA}
                        margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#f1f5f9"
                        />
                        <XAxis
                          dataKey="year"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#94a3b8", fontSize: 11 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#94a3b8", fontSize: 11 }}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "none",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{
                            fill: "#3b82f6",
                            strokeWidth: 2,
                            r: 4,
                            stroke: "#fff",
                          }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Pie Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 text-[#172033]">
                {/* Patent Type Pie Chart */}
                <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-4 bg-[#f59e0b] rounded-full"></div>
                    <h3 className="text-[15px] font-bold">专利类型分布</h3>
                  </div>
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-[180px] h-[180px] relative shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart
                          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        >
                          <Pie
                            data={PATENT_TYPE_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={75}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {PATENT_TYPE_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[10px] text-[#64748b]">总量</span>
                        <strong className="text-[16px] font-black">
                          850件
                        </strong>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-3">
                      <div className="flex text-[#64748b] text-[12px] pb-2 border-b border-[#f1f5f9]">
                        <span className="w-20">类别</span>
                        <span className="flex-1 text-right">数量</span>
                        <span className="w-16 text-right">占比</span>
                      </div>
                      {PATENT_TYPE_DATA.map((item, i) => (
                        <div key={i} className="flex items-center text-[13px]">
                          <div className="w-20 flex items-center gap-2">
                            <div
                              className="w-2.5 h-2.5 rounded-sm"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span>{item.name}</span>
                          </div>
                          <span className="flex-1 text-right font-bold">
                            {item.value}
                          </span>
                          <span className="w-16 text-right text-[#64748b]">
                            {item.percentage}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Patent Validity Pie Chart */}
                <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-4 bg-[#8b5cf6] rounded-full"></div>
                    <h3 className="text-[15px] font-bold">专利有效性分布</h3>
                  </div>
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-[180px] h-[180px] relative shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart
                          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        >
                          <Pie
                            data={PATENT_VALIDITY_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={75}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {PATENT_VALIDITY_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[10px] text-[#64748b]">总量</span>
                        <strong className="text-[16px] font-black">
                          850件
                        </strong>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-3">
                      <div className="flex text-[#64748b] text-[12px] pb-2 border-b border-[#f1f5f9]">
                        <span className="w-20">类别</span>
                        <span className="flex-1 text-right">数量</span>
                        <span className="w-16 text-right">占比</span>
                      </div>
                      {PATENT_VALIDITY_DATA.map((item, i) => (
                        <div key={i} className="flex items-center text-[13px]">
                          <div className="w-20 flex items-center gap-2">
                            <div
                              className="w-2.5 h-2.5 rounded-sm"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span>{item.name}</span>
                          </div>
                          <span className="flex-1 text-right font-bold">
                            {item.value}
                          </span>
                          <span className="w-16 text-right text-[#64748b]">
                            {item.percentage}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Word Cloud Row */}
              <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 mt-4">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#f43f5e] rounded-full"></div>
                  <h3 className="text-[15px] font-bold">技术创新词云</h3>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 p-4">
                  {WORDS.map((word, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: word.size,
                        color: word.color,
                        fontWeight: word.bold ? "bold" : "normal",
                      }}
                      className="cursor-default hover:opacity-80 transition-opacity"
                    >
                      {word.text}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mt-4 text-[11px] text-[#94a3b8]">
                  <span>固态电解质</span>
                  <span>隔膜材料</span>
                </div>
              </div>

            </div>
          </section>
          <div className="sticky bottom-4 z-20 mt-[18px] flex items-center justify-between gap-4 rounded-[18px] border border-[#e5eaf3] bg-white/90 px-4 py-3 text-[13px] text-[#647087] backdrop-blur-[10px] max-md:bottom-3 max-md:flex-col max-md:items-stretch">
            <div className="text-[14px] font-bold text-[#102039]">
              可返回调整技术方向,或进入企业探索查看候选企业。
            </div>
            <div className="flex flex-col gap-[10px] md:flex-row md:justify-end">
              {onBack && (
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="h-10 rounded-[12px] px-[14px] font-extrabold shadow-sm max-md:w-full"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  返回目标拆解
                </Button>
              )}
              {onExplore && (
                <Button
                  onClick={onExplore}
                  className="h-10 rounded-[12px] bg-[#2f6df6] px-[14px] font-extrabold text-white shadow-[0_10px_20px_rgba(47,109,246,0.16)] hover:bg-[#2f6df6] max-md:w-full"
                >
                  进入企业探索
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </main>

        {scanDrawerOpen && (
          <Resizable
            size={{
              width: scanDrawerWidth,
              height: isCompactLayout ? "calc(100vh - 24px)" : "100%",
            }}
            style={{ position: isCompactLayout ? "fixed" : "relative" }}
            minWidth={Math.min(
              MIN_SCAN_DRAWER_WIDTH,
              window.innerWidth * 0.75,
            )}
            maxWidth={isCompactLayout ? "92vw" : "60vw"}
            enable={{ left: true }}
            onResizeStop={(_event, _direction, element) => {
              const nextWidth = element.offsetWidth;
              setScanDrawerWidth(nextWidth);
              window.localStorage.setItem(
                SCAN_DRAWER_WIDTH_STORAGE_KEY,
                String(nextWidth),
              );
            }}
            handleComponent={{
              left: (
                <div
                  className="group flex h-full w-3 -translate-x-1/2 cursor-col-resize items-center justify-center"
                  title="拖动调整线索扫描记录面板宽度"
                >
                  <span className="h-12 w-1 rounded-full bg-[#cbd8eb] opacity-0 shadow-sm transition-opacity group-hover:opacity-100" />
                </div>
              ),
            }}
            className={`z-30 flex max-w-[92vw] flex-col overflow-hidden rounded-[18px] border border-[#e3ebf6] bg-white shadow-[0_14px_32px_rgba(15,23,42,0.08)] ${
              isCompactLayout ? "right-3 top-3 z-40" : "shrink-0"
            }`}
          >
            <header className="flex shrink-0 items-start justify-between gap-3 border-b border-[#e3ebf6] bg-linear-to-b from-white to-[#fbfdff] px-[18px] py-4">
              <div className="min-w-0">
                <h2 className="m-0 text-[20px] font-black leading-[1.35] text-[#102039]">
                  线索扫描记录
                </h2>
                <p className="m-0 mt-1.5 text-[12px] leading-[1.5] text-[#7b879b]">
                  保留历次技术方向、运行过程与扫描结果
                </p>
              </div>
              <button
                type="button"
                onClick={() => setScanDrawerOpen(false)}
                className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-[12px] border border-[#e3ebf6] bg-[#f7f9fd] text-[#6d7890] transition hover:border-[#cbd8eb] hover:text-[#102039]"
                aria-label="收起线索扫描记录"
              >
                <X className="size-4" />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto bg-[#fbfdff] p-[14px]">
              <section className="overflow-hidden rounded-[14px] border border-[#e3ebf6] bg-white">
                <button
                  type="button"
                  onClick={() => setPreviousRoundExpanded((value) => !value)}
                  className="flex w-full items-center justify-between gap-3 bg-white px-3.5 py-3 text-left"
                  aria-expanded={previousRoundExpanded}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <strong className="text-[13px] font-black text-[#13213a]">
                      扫描1
                    </strong>
                    <span className="text-[10px] text-[#99a4b4]">上一轮</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full bg-[#eaf8f0] px-2 py-1 text-[10px] font-black text-[#18a957]">
                      已完成
                    </span>
                    <ChevronDown
                      className={`size-4 text-[#8996a8] transition-transform ${
                        previousRoundExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>
                <div className="grid grid-cols-2 gap-2 px-3.5 pb-3">
                  <div className="rounded-[10px] bg-[#f6f8fb] px-3 py-2.5">
                    <span className="block text-[10px] text-[#7e8b9e]">
                      专利线索
                    </span>
                    <b className="mt-1 block text-[14px] text-[#13213a]">
                      413件
                    </b>
                  </div>
                  <div className="rounded-[10px] bg-[#f6f8fb] px-3 py-2.5">
                    <span className="block text-[10px] text-[#7e8b9e]">
                      候选企业
                    </span>
                    <b className="mt-1 block text-[14px] text-[#13213a]">
                      91家
                    </b>
                  </div>
                  <div className="rounded-[10px] bg-[#f6f8fb] px-3 py-2.5">
                    <span className="block text-[10px] text-[#7e8b9e]">
                      高价值专利
                    </span>
                    <b className="mt-1 block text-[14px] text-[#13213a]">
                      128件
                    </b>
                  </div>
                  <div className="rounded-[10px] bg-[#f6f8fb] px-3 py-2.5">
                    <span className="block text-[10px] text-[#7e8b9e]">
                      数据来源
                    </span>
                    <b className="mt-1 block text-[14px] text-[#13213a]">
                      6个
                    </b>
                  </div>
                </div>
                {previousRoundExpanded && (
                  <div className="border-t border-[#e3ebf6] bg-[#fbfcfe] px-3.5 py-3">
                    <div className="mb-2 text-[10px] font-bold text-[#7a879a]">
                      技术方向
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "层状氧化物正极材料",
                        "聚阴离子正极材料",
                      ].map((direction) => (
                        <span
                          key={direction}
                          className="rounded-full border border-[#d8e4f7] bg-[#f3f7ff] px-2 py-1 text-[10px] text-[#4f6c98]"
                        >
                          {direction}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2.5 divide-y divide-dashed divide-[#e5ebf3]">
                      {[
                        "生成6组检索式，覆盖标题、摘要与权利要求",
                        "从6个专利与工商数据源获取原始线索1,286条",
                        "完成两个技术方向的专利检索与主体识别",
                        "排除低相关、失效及重复专利873件",
                        "合并17组企业简称、曾用名及关联主体",
                        "去重后形成91家候选企业",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex gap-2 py-2 text-[10px] leading-[1.5] text-[#6e7d91]"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#18a957]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              <div className="my-3 flex items-center gap-2 text-[10px] font-extrabold text-[#8a96a7] before:h-px before:flex-1 before:bg-[#e6ebf2] after:h-px after:flex-1 after:bg-[#e6ebf2]">
                技术方向更新后重新扫描
              </div>

              <section className="overflow-hidden rounded-[14px] border border-[#b9ceff] bg-white shadow-[0_8px_22px_rgba(47,109,246,0.06)]">
                <div className="flex items-center justify-between gap-3 px-3.5 py-3">
                  <span className="flex min-w-0 items-center gap-2">
                    <strong className="text-[13px] font-black text-[#13213a]">
                      扫描2
                    </strong>
                    <span className="text-[10px] text-[#99a4b4]">
                      当前轮次
                    </span>
                  </span>
                  <span className="rounded-full bg-[#edf4ff] px-2 py-1 text-[10px] font-black text-[#2f6df6]">
                    进行中
                  </span>
                </div>
                <div className="mx-3.5 mb-3 rounded-[9px] bg-[#f3f7ff] px-2.5 py-2 text-[10px] leading-[1.5] text-[#58709a]">
                  技术方向已更新：保留原有方向，并新增“普鲁士蓝类材料”。
                </div>
                <div className="border-y border-[#e3ebf6] bg-[#fbfcfe] px-3.5 py-3">
                  <div className="mb-2 text-[10px] font-bold text-[#7a879a]">
                    本轮技术方向
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["层状氧化物正极材料", "聚阴离子正极材料"].map(
                      (direction) => (
                        <span
                          key={direction}
                          className="rounded-full border border-[#d8e4f7] bg-[#f3f7ff] px-2 py-1 text-[10px] text-[#4f6c98]"
                        >
                          {direction}
                        </span>
                      ),
                    )}
                    <span className="rounded-full border border-[#b9ceff] bg-[#edf4ff] px-2 py-1 text-[10px] font-bold text-[#2f6df6]">
                      普鲁士蓝类材料 · 新增
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] text-[#69788d]">
                      <span>本轮扫描进度</span>
                      <b className="text-[#2f6df6]">84%</b>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e9eef6]">
                      <div className="h-full w-[84%] rounded-full bg-linear-to-r from-[#2f6df6] to-[#6d90ff]" />
                    </div>
                  </div>
                </div>
                <div className="m-3.5 flex items-start gap-2 rounded-[11px] border border-[#cfe0ff] bg-[#f2f7ff] p-3">
                  <LoaderCircle className="mt-0.5 size-4 shrink-0 animate-spin text-[#2f6df6]" />
                  <div>
                    <b className="block text-[11px] text-[#13213a]">
                      正在归并企业主体与专利线索
                    </b>
                    <p className="m-0 mt-1 text-[10px] leading-[1.5] text-[#6d7d94]">
                      识别企业简称、曾用名和关联主体，并持续去重。
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 px-3.5 pb-3">
                  <div className="rounded-[9px] bg-[#f7f9fc] px-2.5 py-2">
                    <span className="block text-[9px] text-[#8490a2]">
                      本轮专利线索
                    </span>
                    <b className="mt-1 block text-[13px] text-[#13213a]">
                      617件
                    </b>
                  </div>
                  <div className="rounded-[9px] bg-[#f7f9fc] px-2.5 py-2">
                    <span className="block text-[9px] text-[#8490a2]">
                      本轮候选企业
                    </span>
                    <b className="mt-1 block text-[13px] text-[#13213a]">
                      132家
                    </b>
                  </div>
                  <div className="rounded-[9px] bg-[#f7f9fc] px-2.5 py-2">
                    <span className="block text-[9px] text-[#8490a2]">
                      高相关性专利
                    </span>
                    <b className="mt-1 block text-[13px] text-[#13213a]">
                      297件
                    </b>
                  </div>
                  <div className="rounded-[9px] bg-[#f7f9fc] px-2.5 py-2">
                    <span className="block text-[9px] text-[#8490a2]">
                      近三年活跃企业
                    </span>
                    <b className="mt-1 block text-[13px] text-[#13213a]">
                      43家
                    </b>
                  </div>
                </div>
                <div className="border-t border-[#e3ebf6] px-3.5 pb-1 pt-3">
                  <div className="mb-3 text-[10px] font-extrabold text-[#8c98aa]">
                    本轮运行记录
                  </div>
                  <div className="relative ml-2 border-l border-[#e1e8f1] pl-5">
                    {[
                      [
                        "完成",
                        "16:21",
                        "加载检索范围",
                        "读取三条技术路线及12个核心技术关键词",
                        "方向配置",
                      ],
                      [
                        "完成",
                        "16:22",
                        "生成检索策略",
                        "生成9组中英文检索式和4组主体识别规则",
                        "AI 检索式",
                      ],
                      [
                        "完成",
                        "16:24",
                        "检索专利线索",
                        "从标题、摘要与权利要求中召回1,764条原始线索",
                        "专利数据库",
                      ],
                      [
                        "完成",
                        "16:25",
                        "筛选高相关专利",
                        "排除低相关与重复记录，保留617件有效专利",
                        "相关性模型",
                      ],
                      [
                        "完成",
                        "16:27",
                        "补充工商主体信息",
                        "已匹配企业全称、曾用名、统一社会信用代码与存续状态",
                        "工商数据",
                      ],
                      [
                        "进行中",
                        "16:29",
                        "识别候选企业",
                        "正在合并关联主体、排除重复企业并计算技术路线覆盖度",
                        "主体归并",
                      ],
                    ].map(([status, time, title, detail, source]) => (
                      <div key={title} className="relative pb-4">
                        <span
                          className={`absolute -left-[29px] top-0 flex size-[17px] items-center justify-center rounded-md border ${
                            status === "完成"
                              ? "border-[#ccebdc] bg-[#eaf8f0] text-[#18a957]"
                              : "border-[#cfe0ff] bg-[#edf4ff] text-[#2f6df6]"
                          }`}
                        >
                          {status === "完成" ? (
                            <Check className="size-2.5" />
                          ) : (
                            <LoaderCircle className="size-2.5 animate-spin" />
                          )}
                        </span>
                        <div className="flex items-center gap-2">
                          <b className="text-[11px] text-[#13213a]">{title}</b>
                          <span className="text-[9px] text-[#9aa5b4]">
                            {time} · {status}
                          </span>
                        </div>
                        <p className="m-0 mt-1 text-[10px] leading-[1.5] text-[#758398]">
                          {detail}
                        </p>
                        <span className="mt-1.5 inline-flex rounded-md bg-[#f4f6f9] px-1.5 py-1 text-[9px] font-bold text-[#7b8899]">
                          {source}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </Resizable>
        )}
      </div>
    </PageShell>
  );
}
