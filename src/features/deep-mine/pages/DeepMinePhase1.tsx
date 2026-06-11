import { useState } from 'react';
import { ArrowLeft, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Bar
} from 'recharts';

const ALL_PATENT_DATA = [
  { year: '2010', count: 45 },
  { year: '2011', count: 78 },
  { year: '2012', count: 102 },
  { year: '2013', count: 145 },
  { year: '2014', count: 112 },
  { year: '2015', count: 168 },
  { year: '2016', count: 182 },
  { year: '2017', count: 195 },
  { year: '2018', count: 245 },
  { year: '2019', count: 188 },
  { year: '2020', count: 250 },
  { year: '2021', count: 272 },
  { year: '2022', count: 290 },
  { year: '2023', count: 325 },
  { year: '2024', count: 295 },
  { year: '2025', count: 318 },
];

const TECH_PATENT_DATA = [
  { year: '2010', layered: 40, polyAnion: 12, prussian: 20 },
  { year: '2011', layered: 52, polyAnion: 28, prussian: 32 },
  { year: '2012', layered: 72, polyAnion: 45, prussian: 60 },
  { year: '2013', layered: 95, polyAnion: 32, prussian: 72 },
  { year: '2014', layered: 82, polyAnion: 50, prussian: 52 },
  { year: '2015', layered: 105, polyAnion: 68, prussian: 80 },
  { year: '2016', layered: 112, polyAnion: 82, prussian: 102 },
  { year: '2017', layered: 124, polyAnion: 95, prussian: 108 },
  { year: '2018', layered: 142, polyAnion: 102, prussian: 82 },
  { year: '2019', layered: 132, polyAnion: 98, prussian: 55 },
  { year: '2020', layered: 110, polyAnion: 105, prussian: 65 },
  { year: '2021', layered: 125, polyAnion: 120, prussian: 72 },
  { year: '2022', layered: 142, polyAnion: 112, prussian: 80 },
  { year: '2023', layered: 162, polyAnion: 115, prussian: 75 },
  { year: '2024', layered: 152, polyAnion: 122, prussian: 76 },
  { year: '2025', layered: 165, polyAnion: 118, prussian: 78 },
];

const PATENT_TYPE_DATA = [
  { name: '发明', value: 330, percentage: '38.82%', color: '#3b82f6' },
  { name: '实用新型', value: 260, percentage: '30.59%', color: '#f59e0b' },
  { name: '外观设计', value: 260, percentage: '30.59%', color: '#10b981' },
];

const PATENT_VALIDITY_DATA = [
  { name: '有效', value: 510, percentage: '60.00%', color: '#10b981' },
  { name: '审中', value: 297, percentage: '34.94%', color: '#3b82f6' },
  { name: '失效', value: 43, percentage: '5.06%', color: '#f43f5e' },
];

const WORDS = [
  { text: '钠离子电池', size: '32px', color: '#2563eb', bold: true },
  { text: '正极材料', size: '20px', color: '#60a5fa' },
  { text: '硬碳负极', size: '18px', color: '#3b82f6', bold: true },
  { text: '电解液', size: '16px', color: '#93c5fd' },
  { text: '层状氧化物', size: '15px', color: '#60a5fa' },
  { text: '普鲁士蓝', size: '15px', color: '#93c5fd' },
  { text: '聚阴离子', size: '15px', color: '#60a5fa' },
  { text: '能量密度', size: '14px', color: '#bfdbfe' },
  { text: '循环寿命', size: '14px', color: '#93c5fd' },
  { text: '低成本', size: '14px', color: '#bfdbfe' },
  { text: '规模化', size: '14px', color: '#93c5fd' },
  { text: '储能应用', size: '14px', color: '#bfdbfe' },
  { text: '动力电池', size: '13px', color: '#93c5fd' },
  { text: '快充技术', size: '13px', color: '#bfdbfe' },
  { text: '安全性能', size: '13px', color: '#93c5fd' },
  { text: '前驱体', size: '12px', color: '#bfdbfe' },
  { text: '包覆改性', size: '11px', color: '#d1d5db' },
  { text: '补钠技术', size: '11px', color: '#d1d5db' },
  { text: '固态电解质', size: '10px', color: '#d1d5db' },
  { text: '隔膜材料', size: '10px', color: '#d1d5db' },
];

const ENTERPRISE_TYPE_DATA = [
  { name: '高校/科研院所', value: 19, percentage: '5.43%', color: '#8b5cf6' },
  { name: '上市企业', value: 53, percentage: '15.14%', color: '#3b82f6' },
  { name: '非上市企业', value: 278, percentage: '79.43%', color: '#10b981' },
];

const PATENT_SCALE_DATA = [
  { name: '>100件 (超大)', value: 8 },
  { name: '50-100件 (大型)', value: 25 },
  { name: '10-50件 (中型)', value: 72 },
  { name: '3-10件 (小型)', value: 135 },
  { name: '1-3件 (微型)', value: 110 }
];

const RELEVANCE_DATA = [
  { name: '4-5', value: 45 },
  { name: '3-4', value: 125 },
  { name: '2-3', value: 110 },
  { name: '1-2', value: 50 },
  { name: '0-1', value: 20 }
];

const COVERAGE_DATA = [
  { name: '1', value: 150 },
  { name: '2', value: 85 },
  { name: '3', value: 45 },
  { name: '4', value: 20 },
  { name: '5', value: 8 },
  { name: '6', value: 2 }
];

const RELEVANT_PATENT_RATIO_DATA = [
  { name: '80-100%', value: 35 },
  { name: '60-80%', value: 85 },
  { name: '40-60%', value: 110 },
  { name: '20-40%', value: 75 },
  { name: '0-20%', value: 45 }
];

const FUNDING_DATA = [
  { name: '深圳珈钠能源科技有限公司', round: 'A轮', amount: '数亿元人民币', date: '2024-05', investor: '光速光合、春华资本' },
  { name: '江苏众钠能源科技有限公司', round: 'Pre-A轮', amount: '超亿元人民币', date: '2024-03', investor: '同创伟业、国投招商' },
  { name: '中科海钠科技有限责任公司', round: 'B轮', amount: '数亿元人民币', date: '2023-12', investor: '海松资本、哈勃投资' },
  { name: '北京中科海钠科技有限责任公司', round: 'A+轮', amount: '数亿元人民币', date: '2023-08', investor: '华为哈勃' },
  { name: '浙江钠创新能源有限公司', round: 'A轮', amount: '数亿元人民币', date: '2023-05', investor: '淮海控股集团' }
];

const AWARDS_DATA = [
  { name: '深圳珈钠能源科技有限公司', award: '第十届“创客中国”深圳市中小企业创新创业大赛 一等奖', date: '2024-09' },
  { name: '江苏众钠能源科技有限公司', award: '2024年全国新能源创新创业大赛 金奖', date: '2024-08' },
  { name: '中科海钠科技有限责任公司', award: '第三届“创青春”中国青年碳中和创新创业大赛 特等奖', date: '2024-06' },
  { name: '浙江钠创新能源有限公司', award: '2023年“创客中国”浙江省中小企业创新创业大赛 二等奖', date: '2023-11' },
  { name: '深圳珈钠能源科技有限公司', award: '2025（第四届）起点钠电金鼎奖', date: '2024-01' }
];

export default function DeepMinePhase1({ 
  onNextStep, 
  onAdjustTarget,
  onBack,
  state,
  onUpdateState
}: { 
  onNextStep: () => void, 
  onAdjustTarget: () => void,
  onBack?: () => void,
  state: { isDeconstructed: boolean, isAnalyzing: boolean, showAnalysis: boolean },
  onUpdateState: (state: Partial<{ isDeconstructed: boolean, isAnalyzing: boolean, showAnalysis: boolean }>) => void
}) {
  const { isDeconstructed, isAnalyzing, showAnalysis } = state;

  const handleAnalyze = () => {
    onUpdateState({ isAnalyzing: true });
    setTimeout(() => {
      onUpdateState({ showAnalysis: true });
    }, 600);
  };

  return (
    <div className="max-w-[1120px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
      <div className="flex items-center gap-[12px] mb-4">
        <div className="text-[13px] text-[#64748b]">
          工作台 / 挖企业 / <b className="text-[#334155] font-bold">阶段一：明确目标与产业线索分析</b>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_232px] gap-[18px] items-start">
        <main>
          {/* Panel 1: 明确挖掘目标 */}
          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex items-center gap-[12px] mb-3">
              {onBack && (
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={onBack}
                  className="w-8 h-8 rounded-[8px] bg-white border-[#dbe4f1] text-[#334155] hover:bg-gray-50 hover:border-[#2563eb] hover:text-[#2563eb] transition-all"
                  title="返回"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <span className="text-[12px] font-black text-[#2563eb] bg-[#eaf1ff] rounded-full px-[10px] py-[7px] inline-flex">Deep Mine · 阶段一</span>
            </div>
            <div>
              <h1 className="text-[26px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">明确挖掘目标</h1>
              <p className="mt-2 text-[#64748b] text-[14px] leading-[1.65]">从首页点击“挖企业”后，系统先把用户输入转成可执行的企业挖掘目标，再通过产业线索分析判断这个方向是否值得继续挖。</p>
              <div className="flex flex-col md:flex-row gap-[10px] mt-[18px]">
                <Input 
                  className="flex-1 h-[44px] px-[12px] bg-[#f8fafc]" 
                  defaultValue="钠电池正极材料" 
                />
                <Button 
                  onClick={() => onUpdateState({ isDeconstructed: true })}
                  className={`h-[42px] px-[16px] rounded-[13px] font-extrabold ${isDeconstructed ? 'bg-[#f1f5f9] text-[#2563eb] hover:bg-[#e2e8f0]' : 'bg-[#2563eb] text-white shadow-[0_10px_18px_rgba(37,99,235,0.18)] hover:bg-[#1d4ed8]'}`}
                >
                  {isDeconstructed ? '重新拆解' : 'AI 拆解目标'}
                </Button>
              </div>
            </div>
          </section>

          {/* Section 2: AI 拆解出的挖掘目标 */}
          {isDeconstructed && (
            <section className="mt-[18px] bg-white border border-[#e5eaf3] rounded-[24px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
              <div className="flex justify-between items-center mb-[20px]">
                <h2 className="text-[17px] font-black m-0">AI 拆解目标</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Information Card 1 */}
                <div className="border border-[#e5eaf3] bg-white rounded-[20px] p-[20px]">
                  <strong className="text-[16px] block text-[#172033]">层状氧化物正极材料企业</strong>
                  <p className="text-[13px] mt-[8px] text-[#64748b] leading-[1.5]">优先挖掘，产业化路径较清晰。</p>
                </div>

                {/* Information Card 2 */}
                <div className="border border-[#e5eaf3] bg-white rounded-[20px] p-[20px]">
                  <strong className="text-[16px] block text-[#172033]">聚阴离子正极材料企业</strong>
                  <p className="text-[13px] mt-[8px] text-[#64748b] leading-[1.5]">适合寻找技术壁垒型企业。</p>
                </div>

                {/* Information Card 3 */}
                <div className="border border-[#e5eaf3] bg-white rounded-[20px] p-[20px]">
                  <strong className="text-[16px] block text-[#172033]">普鲁士蓝类材料企业</strong>
                  <p className="text-[13px] mt-[8px] text-[#64748b] leading-[1.5]">成本优势明显，商业化需验证。</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-[10px] justify-end mt-[22px]">
                <Button 
                  variant="outline"
                  onClick={onAdjustTarget}
                  className="h-[42px] px-[16px] rounded-[13px] font-extrabold"
                >
                  调整目标
                </Button>
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className={`h-[42px] px-[16px] rounded-[13px] font-extrabold ${isAnalyzing ? 'bg-[#f1f5f9] text-[#94a3b8] shadow-none' : 'bg-[#2563eb] text-white shadow-[0_10px_18px_rgba(37,99,235,0.18)] hover:bg-[#1d4ed8]'}`}
                >
                  {isAnalyzing ? (showAnalysis ? '已分析' : '正在分析线索...') : '线索分析'}
                </Button>
              </div>
            </section>
          )}

          {/* Section 3: 产业线索分析 */}
          {showAnalysis && (
            <section className="mt-[18px] bg-white border border-[#e5eaf3] rounded-[24px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
              <div className="flex justify-between items-end mb-5">
                <div>
                  <h2 className="text-[17px] font-black m-0">产业线索分析</h2>
                  <div className="text-[#64748b] text-[13px] leading-[1.65] mt-1">这不是独立“看赛道”，而是为企业发现提供支撑：有没有足够的技术、专利和企业线索。</div>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-[#e5eaf3] rounded-[16px] p-5 shadow-sm">
                  <span className="block text-[#64748b] text-[13px] mb-2">检索专利总数</span>
                  <div className="flex items-baseline gap-1">
                    <strong className="text-[28px] font-bold text-[#172033]">850</strong>
                    <span className="text-[#64748b] text-[13px]">件</span>
                  </div>
                </div>
                <div className="bg-white border border-[#e5eaf3] rounded-[16px] p-5 shadow-sm">
                  <span className="block text-[#64748b] text-[13px] mb-2">高价值专利 (发明)</span>
                  <div className="flex items-baseline gap-1">
                    <strong className="text-[28px] font-bold text-[#2563eb]">330</strong>
                    <span className="text-[#64748b] text-[13px]">件</span>
                  </div>
                </div>
                <div className="bg-white border border-[#e5eaf3] rounded-[16px] p-5 shadow-sm">
                  <span className="block text-[#64748b] text-[13px] mb-2">高相关性专利</span>
                  <div className="flex items-baseline gap-1">
                    <strong className="text-[28px] font-bold text-[#16a34a]">297</strong>
                    <span className="text-[#64748b] text-[13px]">件</span>
                  </div>
                </div>
                <div className="bg-white border border-[#e5eaf3] rounded-[16px] p-5 shadow-sm">
                  <span className="block text-[#64748b] text-[13px] mb-2">近三年新增专利</span>
                  <div className="flex items-baseline gap-1">
                    <strong className="text-[28px] font-bold text-[#f59e0b]">429</strong>
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
                    <h3 className="text-[15px] font-bold">钠电池正极材料相关全部专利统计</h3>
                  </div>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ALL_PATENT_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="year" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: '#94a3b8', fontSize: 11}}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: '#94a3b8', fontSize: 11}}
                        />
                        <Tooltip 
                          contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="count" 
                          stroke="#3b82f6" 
                          strokeWidth={3} 
                          dot={{fill: '#3b82f6', strokeWidth: 2, r: 4, stroke: '#fff'}}
                          activeDot={{r: 6}}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Tech Patents Multi-Line Chart */}
                <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-4 bg-[#10b981] rounded-full"></div>
                    <h3 className="text-[15px] font-bold">产业投资重点技术相关专利统计</h3>
                  </div>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={TECH_PATENT_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="year" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: '#94a3b8', fontSize: 11}}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: '#94a3b8', fontSize: 11}}
                        />
                        <Tooltip 
                          contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                        />
                        <Line name="层状氧化物" type="monotone" dataKey="layered" stroke="#f59e0b" strokeWidth={3} dot={false} />
                        <Line name="聚阴离子" type="monotone" dataKey="polyAnion" stroke="#ef4444" strokeWidth={3} dot={false} />
                        <Line name="普鲁士蓝" type="monotone" dataKey="prussian" stroke="#10b981" strokeWidth={3} dot={false} />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
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
                        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
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
                            <div className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor: item.color}}></div>
                            <span>{item.name}</span>
                          </div>
                          <span className="flex-1 text-right font-bold">{item.value}</span>
                          <span className="w-16 text-right text-[#64748b]">{item.percentage}</span>
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
                        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
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
                            <div className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor: item.color}}></div>
                            <span>{item.name}</span>
                          </div>
                          <span className="flex-1 text-right font-bold">{item.value}</span>
                          <span className="w-16 text-right text-[#64748b]">{item.percentage}</span>
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
                        fontWeight: word.bold ? 'bold' : 'normal'
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

              {/* Enterprise Statistics Section */}
              <div className="space-y-4 mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm flex flex-col items-center justify-center lg:col-span-1">
                    <div className="text-[#64748b] text-[15px] font-medium mb-4">产业企业总数</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-bold text-[#172033] tracking-tight">350</span>
                      <span className="text-xl font-normal text-[#94a3b8]">家</span>
                    </div>
                  </div>
                  <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm lg:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-4 bg-[#6366f1] rounded-full"></div>
                      <h4 className="font-bold text-[#172033] text-[15px]">企业类型分布</h4>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="relative w-[160px] h-[160px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                            <Pie
                              data={ENTERPRISE_TYPE_DATA}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {ENTERPRISE_TYPE_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-[10px] text-[#64748b] mb-0.5">主体总数</span>
                          <span className="text-[14px] font-bold text-[#172033]">350家</span>
                        </div>
                      </div>
                      <div className="flex-1 w-full flex flex-col gap-3">
                        <div className="flex text-[#64748b] text-[12px] pb-2 border-b border-[#f1f5f9]">
                          <span className="flex-1 text-left">类别</span>
                          <span className="w-16 text-right">数量</span>
                          <span className="w-16 text-right">占比</span>
                        </div>
                        {ENTERPRISE_TYPE_DATA.map((item, i) => (
                          <div key={i} className="flex items-center text-[13px] hover:bg-[#f8fafc] p-[4px_0] rounded transition-colors">
                            <div className="flex-1 flex items-center gap-2">
                              <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{backgroundColor: item.color}}></div>
                              <span className="text-[#334155] truncate max-w-[100px]">{item.name}</span>
                            </div>
                            <span className="w-16 text-right font-medium text-[#172033]">{item.value}</span>
                            <span className="w-16 text-right text-[#64748b]">{item.percentage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-4 bg-[#3b82f6] rounded-full"></div>
                      <h4 className="font-bold text-[#172033] text-[15px]">企业专利规模分布</h4>
                    </div>
                    <div className="h-64 w-full mt-auto text-[#172033]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={PATENT_SCALE_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} angle={-30} textAnchor="end" />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                          <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                          <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={32} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-4 bg-[#10b981] rounded-full"></div>
                      <h4 className="font-bold text-[#172033] text-[15px]">企业相关性等级分布</h4>
                    </div>
                    <div className="h-64 w-full mt-auto text-[#172033]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={RELEVANCE_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                          <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                          <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-4 bg-[#f59e0b] rounded-full"></div>
                      <h4 className="font-bold text-[#172033] text-[15px]">企业技术方向覆盖度</h4>
                    </div>
                    <div className="h-64 w-full mt-auto text-[#172033]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={COVERAGE_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                          <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                          <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={32} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-4 bg-[#ec4899] rounded-full"></div>
                      <h4 className="font-bold text-[#172033] text-[15px]">相关专利占比</h4>
                    </div>
                    <div className="h-64 w-full mt-auto text-[#172033]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={RELEVANT_PATENT_RATIO_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} angle={-30} textAnchor="end" />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                          <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                          <Bar dataKey="value" fill="#ec4899" radius={[4, 4, 0, 0]} maxBarSize={32} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-4 bg-[#6366f1] rounded-full"></div>
                      <h4 className="font-bold text-[#172033] text-[15px]">融资情况 (最新融资企业)</h4>
                    </div>
                    <div className="overflow-y-auto pr-2 h-[256px]">
                      <div className="space-y-3">
                        {FUNDING_DATA.map((item, index) => (
                          <div key={index} className="p-3 bg-[#f8fafc] rounded-lg border border-[#f1f5f9] hover:border-[#bfdbfe] transition-colors">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-[14px] text-[#172033]">{item.name}</span>
                              <span className="text-[11px] font-medium px-2 py-0.5 bg-[#eaf1ff] text-[#2563eb] rounded">{item.round}</span>
                            </div>
                            <div className="flex justify-between items-center text-[12px] text-[#64748b] mt-2">
                              <span>金额: <span className="text-[#334155] font-medium">{item.amount}</span></span>
                              <span>{item.date}</span>
                            </div>
                            <div className="text-[12px] text-[#64748b] mt-1">
                              投资方: <span className="text-[#334155]">{item.investor}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-[#e5eaf3] rounded-[24px] p-6 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-4 bg-[#f59e0b] rounded-full"></div>
                      <h4 className="font-bold text-[#172033] text-[15px]">创赛获奖 (近一年)</h4>
                    </div>
                    <div className="overflow-y-auto pr-2 h-[256px]">
                      <div className="space-y-3">
                        {AWARDS_DATA.map((item, index) => (
                          <div key={index} className="p-3 bg-[#f8fafc] rounded-lg border border-[#f1f5f9] hover:border-[#fde68a] transition-colors flex gap-3">
                            <div className="mt-0.5 text-[#f59e0b]">
                              <Award size={16} />
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-[14px] text-[#172033] mb-1">{item.name}</div>
                              <div className="text-[12px] text-[#334155] leading-relaxed">{item.award}</div>
                              <div className="text-[11px] text-[#94a3b8] mt-1">{item.date}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Cards Row - Restore original boxes */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-6">
                <div className="border border-[#e5eaf3] bg-[#f8fafc] rounded-[20px] p-[18px]">
                  <strong className="text-[14px] block font-bold mb-1 text-[#172033]">任务结果池</strong>
                  <p className="text-[12px] text-[#64748b] leading-[1.6]">下一步生成的企业先进入任务结果池，不直接污染企业库。</p>
                </div>
                <div className="border border-[#e5eaf3] bg-[#f8fafc] rounded-[20px] p-[18px]">
                  <strong className="text-[14px] block font-bold mb-1 text-[#172033]">企业库</strong>
                  <p className="text-[12px] text-[#64748b] leading-[1.6]">只有用户保存、入池、出报告或跟踪的企业才进入企业库。</p>
                </div>
                <div className="border border-[#e5eaf3] bg-[#f8fafc] rounded-[20px] p-[18px]">
                  <strong className="text-[14px] block font-bold mb-1 text-[#172033]">标的池</strong>
                  <p className="text-[12px] text-[#64748b] leading-[1.6]">标的池是企业库中的重点跟进视图。</p>
                </div>
                <div className="border border-[#e5eaf3] bg-[#f8fafc] rounded-[20px] p-[18px]">
                  <strong className="text-[14px] block font-bold mb-1 text-[#172033]">报告库</strong>
                  <p className="text-[12px] text-[#64748b] leading-[1.6]">所有生成的报告都会进入报告库，并关联企业。</p>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col md:flex-row gap-[12px] justify-end mt-[22px]">
                <Button 
                  variant="outline"
                  onClick={onAdjustTarget}
                  className="h-[44px] px-[20px] rounded-[13px] font-extrabold shadow-sm"
                >
                  调整目标
                </Button>
                <Button 
                  variant="outline"
                  className="h-[44px] px-[20px] rounded-[13px] font-extrabold shadow-sm"
                >
                  重新分析线索
                </Button>
                <Button 
                  onClick={onNextStep}
                  className="h-[44px] px-[24px] rounded-[13px] font-extrabold text-white bg-[#2563eb] shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:bg-[#1d4ed8] transform hover:translate-y-[-1px]"
                >
                  确认目标，发现企业
                </Button>
              </div>
            </section>
          )}
        </main>

        {/* 侧边进度栏 */}
        <aside className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[18px] xl:sticky xl:top-[74px]">
          <h3 className="m-0 mb-[14px] text-[15px]">任务阶段</h3>
          
          <div className="relative grid grid-cols-[24px_1fr] gap-[10px] pb-[18px]">
            <div className="absolute left-[10px] top-[24px] w-[2px] h-[calc(100%-18px)] bg-[#dbe4f1]"></div>
            <div className="w-[22px] h-[22px] rounded-full bg-[#2563eb] border-4 border-white shadow-[0_0_0_4px_#eaf1ff] relative z-10 box-border"></div>
            <div>
              <strong className="block text-[13px] font-bold text-[#172033]">明确目标</strong>
              <span className="block text-[12px] text-[#64748b] mt-[3px] leading-[1.45]">把输入转成企业挖掘目标</span>
            </div>
          </div>

          <div className="relative grid grid-cols-[24px_1fr] gap-[10px] pb-[18px]">
            <div className="absolute left-[10px] top-[24px] w-[2px] h-[calc(100%-18px)] bg-[#dbe4f1]"></div>
            <div className="w-[22px] h-[22px] rounded-full bg-[#2563eb] border-4 border-white shadow-[0_0_0_4px_#eaf1ff] relative z-10 box-border"></div>
            <div>
              <strong className="block text-[13px] font-bold text-[#172033]">产业线索分析</strong>
              <span className="block text-[12px] text-[#64748b] mt-[3px] leading-[1.45]">用专利、技术和企业线索判断方向</span>
            </div>
          </div>

          <div className="relative grid grid-cols-[24px_1fr] gap-[10px] pb-[18px]">
            <div className="absolute left-[10px] top-[24px] w-[2px] h-[calc(100%-18px)] bg-[#dbe4f1]"></div>
            <div className="w-[22px] h-[22px] rounded-full bg-[#e2e8f0] border-4 border-white shadow-[0_0_0_1px_#dbe4f1] relative z-10 box-border"></div>
            <div>
              <strong className="block text-[13px] font-bold text-[#172033]">企业发现</strong>
              <span className="block text-[12px] text-[#64748b] mt-[3px] leading-[1.45]">生成任务结果池</span>
            </div>
          </div>

          <div className="relative grid grid-cols-[24px_1fr] gap-[10px] pb-[18px]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#e2e8f0] border-4 border-white shadow-[0_0_0_1px_#dbe4f1] relative z-10 box-border"></div>
            <div>
              <strong className="block text-[13px] font-bold text-[#172033]">标的跟进</strong>
              <span className="block text-[12px] text-[#64748b] mt-[3px] leading-[1.45]">保存企业、入池、出报告或跟踪</span>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
