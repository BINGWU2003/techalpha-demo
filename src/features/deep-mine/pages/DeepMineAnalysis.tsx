import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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

const ENTERPRISE_TYPE_DATA = [
  { name: "非上市企业", value: 162, percentage: "46.29%", color: "#10b981" },
  {
    name: "上市企业 / 集团主体",
    value: 109,
    percentage: "31.14%",
    color: "#3b82f6",
  },
  {
    name: "高校 / 科研院所",
    value: 79,
    percentage: "22.57%",
    color: "#f59e0b",
  },
];

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

const ANALYSIS_PROGRESS_LINES = [
  "正在获取深圳时识科技有限公司的相关专利…",
  "正在分析 SNN 异步事件驱动方向的潜在企业…",
  "正在识别忆阻器交叉阵列路线下的高校转化主体…",
  "正在归并 Chiplet 相关企业主体…",
  "正在更新近三年新增专利的企业主体…",
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
  onNextStep,
  onExplore,
  onBack,
}: DeepMineAnalysisProps) {
  const [progressIndex, setProgressIndex] = useState(0);
  const progressPercent =
    ((progressIndex + 1) / ANALYSIS_PROGRESS_LINES.length) * 100;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgressIndex(
        (current) => (current + 1) % ANALYSIS_PROGRESS_LINES.length,
      );
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="max-w-[1120px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
      <div className="grid grid-cols-1 gap-[18px] items-start">
        <main>
          <section className="mt-[18px] bg-white border border-[#e5eaf3] rounded-[24px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex items-start gap-3 mb-5">
              <div className="min-w-0 flex-1">
                <h2 className="text-[24px] font-black m-0">产业线索分析</h2>
              </div>
            </div>

            <div className="mb-5 rounded-[18px] border border-[#dbe8ff] bg-[#f8fbff] p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2563eb] opacity-30"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-[#2563eb]"></span>
                  </span>
                  <span className="text-[13px] font-semibold text-[#334155] truncate">
                    {ANALYSIS_PROGRESS_LINES[progressIndex]}
                  </span>
                </div>
                <span className="text-[12px] font-black text-[#2563eb]">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e5edf8]">
                <div
                  className="h-full rounded-full bg-[#2563eb] transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Enterprise Statistics Section */}
            <div className="space-y-5 mt-4 mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-4">
                <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-7 shadow-sm flex flex-col justify-center min-h-[220px]">
                  <span className="text-[#64748b] text-[15px] mb-3">
                    产业企业总数
                  </span>
                  <div className="flex items-baseline gap-2">
                    <strong className="text-[64px] leading-none font-black text-[#0f1f3d] tracking-tight">
                      350
                    </strong>
                    <span className="text-xl font-bold text-[#64748b]">家</span>
                  </div>
                  <p className="mt-5 text-[13px] leading-[1.7] text-[#64748b]">
                    基于当前专利线索识别出的产业相关主体，后续将随创赛、展会、融资等数据补充持续更新。
                  </p>
                </div>

                <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-7 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-center">
                    <div className="relative w-[206px] h-[206px] mx-auto">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={ENTERPRISE_TYPE_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={58}
                            outerRadius={100}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                          >
                            {ENTERPRISE_TYPE_DATA.map((entry, index) => (
                              <Cell
                                key={`enterprise-type-${index}`}
                                fill={entry.color}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[12px] text-[#64748b]">
                          主体总数
                        </span>
                        <strong className="text-[28px] text-[#0f1f3d]">
                          350
                        </strong>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[24px] font-black text-[#0f1f3d] mb-5">
                        企业类型分布
                      </h3>
                      <div className="space-y-4">
                        {ENTERPRISE_TYPE_DATA.map((item) => (
                          <div
                            key={item.name}
                            className="grid grid-cols-[12px_1fr_auto] gap-3 items-center text-[14px]"
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></span>
                            <span className="text-[#172033]">{item.name}</span>
                            <b className="text-[#0f1f3d]">{item.value} 家</b>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm">
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
                <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm">
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
                            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
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

                <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm">
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm">
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

                <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm">
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
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white border border-[#e5eaf3] rounded-[16px] p-5 shadow-sm">
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
              <div className="bg-white border border-[#e5eaf3] rounded-[16px] p-5 shadow-sm">
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
              <div className="bg-white border border-[#e5eaf3] rounded-[16px] p-5 shadow-sm">
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
              <div className="bg-white border border-[#e5eaf3] rounded-[16px] p-5 shadow-sm">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 text-[#172033]">
              {/* All Patents Line Chart */}
              <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm">
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
                          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
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

              {/* Tech Patents Multi-Line Chart */}
              <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#10b981] rounded-full"></div>
                  <h3 className="text-[15px] font-bold">
                    产业投资重点技术相关专利统计
                  </h3>
                </div>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={TECH_PATENT_DATA}
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
                          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Line
                        name="层状氧化物"
                        type="monotone"
                        dataKey="layered"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line
                        name="聚阴离子"
                        type="monotone"
                        dataKey="polyAnion"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line
                        name="普鲁士蓝"
                        type="monotone"
                        dataKey="prussian"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={false}
                      />
                      <Legend
                        iconType="circle"
                        wrapperStyle={{ paddingTop: "10px" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Pie Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 text-[#172033]">
              {/* Patent Type Pie Chart */}
              <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm">
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
                      <strong className="text-[16px] font-black">850件</strong>
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
              <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm">
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
                      <strong className="text-[16px] font-black">850件</strong>
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
            <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm mt-4">
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

            {/* Action Buttons Row */}
            <div className="flex flex-col md:flex-row gap-[12px] md:items-center md:justify-between mt-[22px]">
              {onBack && (
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="h-[44px] px-[20px] rounded-[13px] font-extrabold shadow-sm"
                >
                  返回拆解目标
                </Button>
              )}
              <div className="flex flex-col md:flex-row gap-[12px] md:justify-end">
                {onExplore && (
                  <Button
                    onClick={onExplore}
                    className="h-[44px] px-[20px] rounded-[13px] bg-[#0f766e] text-white font-extrabold hover:bg-[#0f5f59] shadow-[0_10px_18px_rgba(15,118,110,0.18)]"
                  >
                    进入企业探索
                  </Button>
                )}
                <Button
                  onClick={onNextStep}
                  className="h-[44px] px-[24px] rounded-[13px] font-extrabold text-white bg-[#2563eb] shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:bg-[#1d4ed8] transform hover:translate-y-[-1px]"
                >
                  确认目标，发现企业
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
