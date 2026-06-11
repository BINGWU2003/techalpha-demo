import React, { useState, useEffect } from 'react';
import { Menu, Building2, Clock, Tag, Zap, TrendingUp, Award, Network, MessageSquare, User, Info, ArrowLeft, Briefcase, Edit2, CircleEllipsis, CircleCheck, CircleX, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell,
  LabelList
} from 'recharts';

// --- Helper Components ---
const SectionTitle = ({ icon: Icon, title, color }: { icon: any, title: string, color: string }) => (
  <div className={`flex items-center gap-3 mb-6 pb-4 border-b border-gray-100`}>
    <div className={`w-10 h-10 rounded-lg bg-gray-50 ${color} flex items-center justify-center shrink-0`}>
      <Icon size={20} />
    </div>
    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
  </div>
);

const RegistrationCard = ({ data }: { data: any[][] }) => (
  <div className="bg-white border border-[#edf2f7] rounded-lg overflow-hidden mb-8 shadow-sm">
    <table className="w-full text-[13px] border-collapse table-fixed">
      <colgroup>
        <col className="w-[14%]" />
        <col className="w-[19%]" />
        <col className="w-[14%]" />
        <col className="w-[19%]" />
        <col className="w-[14%]" />
        <col className="w-[20%]" />
      </colgroup>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b border-[#edf2f7] last:border-0 leading-relaxed">
            {row.map((item, colIndex) => (
              <React.Fragment key={colIndex}>
                <th className="bg-[#f7f9fc] p-[12px_15px] text-left text-[#64748b] border-r border-[#edf2f7] font-normal whitespace-normal">
                  {item.label}
                </th>
                <td 
                  colSpan={item.valueSpan || 1} 
                  className={`p-[12px_15px] text-[#334155] border-r border-[#edf2f7] last:border-r-0 leading-normal break-words ${item.isLink ? 'text-blue-500 hover:underline cursor-pointer' : 'font-normal'}`}
                >
                  {item.value || ''}
                </td>
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ScoreSummaryCard = ({ score, reason, icon: Icon, colorClass, title, references }: { score: number | string, reason: string, icon: any, colorClass: string, title: string, references?: {id: number, text: string, link: string, note: string}[] }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-start gap-6 relative overflow-hidden shadow-sm mb-6">
    <div className={`absolute top-0 right-0 p-4 opacity-5 pointer-events-none ${colorClass}`}>
      <Icon size={100} />
    </div>
    <div className="flex flex-col items-center justify-center shrink-0 min-w-[120px] bg-white rounded-lg p-4 border border-gray-100 shadow-sm z-10">
      <div className={`text-4xl font-bold ${colorClass}`}>{score}</div>
      <div className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-wider">{title}评分</div>
    </div>
    <div className="flex-1 z-10">
      <h4 className={`font-bold text-lg mb-3 flex items-center gap-2 ${colorClass}`}>
        <Info size={18} /> AI综合评价
      </h4>
      <p className="text-sm text-gray-700 leading-relaxed text-justify">{reason}</p>
      {references && references.length > 0 && (
        <div className="mt-3 space-y-1.5 animate-in slide-in-from-top-2 duration-200">
          {references.map((ref) => (
            <div key={ref.id} className="text-xs text-gray-600 flex gap-2">
              <span className="text-blue-500 font-mono w-5 text-right shrink-0">[{ref.id}]</span>
              <a href={ref.link} target="_blank" rel="noopener noreferrer" className="truncate text-blue-600 hover:underline">
                {ref.text}
              </a>
              <span className="text-xs text-gray-400">{ref.note}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const AnalysisRadarChart = ({ analysis }: { analysis: any }) => {
  const data = [
    { subject: '技术', score: analysis.techScore },
    { subject: '潜力', score: analysis.potentialScore },
    { subject: '竞争力', score: analysis.competitivenessScore },
    { subject: '经营', score: analysis.operationScore },
    { subject: '声誉', score: analysis.reputationScore },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} />
        <PolarRadiusAxis angle={30} domain={[0, 10]} axisLine={false} tick={false} />
        <Radar
          name="评分"
          dataKey="score"
          stroke="#6366f1"
          fill="#6366f1"
          fillOpacity={0.45}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

const CompanyReportView = ({ company, techData, embedded }: any) => {
  if (embedded && techData) {
    return (
      <div className="space-y-8 pt-4">
        {/* 2. 专利概况 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
           <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
             <div className="w-2 h-6 bg-indigo-600 rounded"></div>
             <h2 className="text-xl font-bold text-gray-900">2. 专利概况</h2>
           </div>
           
           <div className="mb-4">
             <div className="text-lg font-bold text-gray-800 flex items-center gap-3 mb-1">
               <div className="w-1 h-7 bg-indigo-600"></div>(1) 专利趋势
             </div>
             <p className="text-sm text-gray-500 mt-1 pl-4 leading-relaxed">展示该企业在特定产业节点的历年专利申请数量趋势。</p>
           </div>
           
           <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
             <div className="h-[288px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={techData.trends}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                    <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
                    <Line type="monotone" dataKey="total" name="总专利" stroke="#3B82F6" strokeWidth={2} dot={{fill: '#3B82F6', r: 3}} activeDot={{r: 5}} />
                    <Line type="monotone" dataKey="c1" name="磷酸焦磷酸铁钠合成工艺路线" stroke="#10B981" strokeWidth={2} dot={{fill: '#10B981', r: 3}} />
                    <Line type="monotone" dataKey="c2" name="钠电层状氧化物正极材料安全性提升" stroke="#06B6D4" strokeWidth={2} dot={{fill: '#06B6D4', r: 3}} />
                    <Line type="monotone" dataKey="c3" name="钠电正极材料容量提升" stroke="#F59E0B" strokeWidth={2} dot={{fill: '#F59E0B', r: 3}} />
                    <Line type="monotone" dataKey="c4" name="钠电正极材料工艺优化降低合成成本" stroke="#8B5CF6" strokeWidth={2} dot={{fill: '#8B5CF6', r: 3}} />
                    <Line type="monotone" dataKey="c5" name="钠电正极材料循环寿命提升" stroke="#EF4444" strokeWidth={2} dot={{fill: '#EF4444', r: 3}} />
                    <Line type="monotone" dataKey="c6" name="钠电池正极材料磷酸焦磷酸铁钠" stroke="#F97316" strokeWidth={2} dot={{fill: '#F97316', r: 3}} />
                  </LineChart>
                </ResponsiveContainer>
             </div>
           </div>

           <div className="mb-4">
             <div className="text-lg font-bold text-gray-800 flex items-center gap-3 mb-1">
               <div className="w-1 h-7 bg-indigo-600"></div>(2) 企业专利质量评分区间统计
             </div>
             <p className="text-sm text-gray-500 mt-1 pl-4 leading-relaxed">展示该主体专利在不同质量评分区间的分布情况。</p>
           </div>
           <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
             <div className="h-[288px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={techData.quality}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="score" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#4B5563', fontSize: 12}} />
                    <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="count" name="专利数量" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="count" position="top" fill="#666" fontSize={12} offset={5} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col h-full">
               <div className="mb-4">
                 <h4 className="font-bold text-gray-700">(3) 专利类型</h4>
                 <p className="text-xs text-gray-400 mt-1 leading-relaxed">展示该企业在特定产业节点的专利类型构成</p>
               </div>
               <div className="flex flex-row items-center gap-6 flex-1">
                 <div className="relative w-40 h-40 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={techData.types} innerRadius={50} outerRadius={70} strokeWidth={0} dataKey="value">
                        {techData.types.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs text-gray-400 mb-0.5">专利总量</span>
                    <span className="text-base font-bold text-gray-800">40</span>
                  </div>
                 </div>
                 <div className="flex-1 w-full overflow-auto">
                   <table className="w-full text-sm">
                     <thead>
                       <tr className="text-gray-400 text-xs border-b border-gray-100">
                         <th className="text-left py-2 font-normal">类别</th>
                         <th className="text-right py-2 font-normal">数量</th>
                         <th className="text-right py-2 font-normal">占比</th>
                       </tr>
                     </thead>
                     <tbody>
                       {techData.types.map((t: any, i: number) => (
                         <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                           <td className="py-2 flex items-center gap-2">
                             <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{backgroundColor: t.color}}></div>
                             <span className="text-gray-700 truncate max-w-[120px]">{t.name}</span>
                           </td>
                           <td className="text-right py-2 font-medium text-gray-900">{t.value}</td>
                           <td className="text-right py-2 text-gray-500">{(t.value / 40 * 100).toFixed(2)}%</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
             
             <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col h-full">
               <div className="mb-4">
                 <h4 className="font-bold text-gray-700">(4) 专利有效性</h4>
                 <p className="text-xs text-gray-400 mt-1 leading-relaxed">展示该企业在特定产业节点的专利有效性构成</p>
               </div>
               <div className="flex flex-row items-center gap-6 flex-1">
                 <div className="relative w-40 h-40 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={techData.validity} innerRadius={50} outerRadius={70} strokeWidth={0} dataKey="value">
                        {techData.validity.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs text-gray-400 mb-0.5">专利总量</span>
                    <span className="text-base font-bold text-gray-800">40</span>
                  </div>
                 </div>
                 <div className="flex-1 w-full overflow-auto">
                   <table className="w-full text-sm">
                     <thead>
                       <tr className="text-gray-400 text-xs border-b border-gray-100">
                         <th className="text-left py-2 font-normal">类别</th>
                         <th className="text-right py-2 font-normal">数量</th>
                         <th className="text-right py-2 font-normal">占比</th>
                       </tr>
                     </thead>
                     <tbody>
                       {techData.validity.map((t: any, i: number) => (
                         <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                           <td className="py-2 flex items-center gap-2">
                             <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{backgroundColor: t.color}}></div>
                             <span className="text-gray-700 truncate max-w-[120px]">{t.name}</span>
                           </td>
                           <td className="text-right py-2 font-medium text-gray-900">{t.value}</td>
                           <td className="text-right py-2 text-gray-500">{(t.value / 40 * 100).toFixed(2)}%</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* 3. 专利领域分析 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
           <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
             <div className="w-2 h-6 bg-indigo-600 rounded"></div>
             <h2 className="text-xl font-bold text-gray-900">3. 专利领域分析</h2>
           </div>
           
           <div className="mb-4">
             <div className="text-lg font-bold text-gray-800 flex items-center gap-3 mb-1">
               <div className="w-1 h-7 bg-indigo-600"></div>(1) 专利IPC领域技术趋势统计
             </div>
             <p className="text-sm text-gray-500 mt-1 pl-4 leading-relaxed">展示该主体在主要技术领域的专利申请变化情况。</p>
           </div>
           <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-4">
             <div className="overflow-x-auto flex-1">
               <table className="w-full text-sm border-collapse">
                 <thead>
                   <tr>
                     <th className="p-2 text-left text-gray-500 text-xs w-50">技术领域 / 年份</th>
                     {['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'].map(year => (
                       <th key={year} className="p-2 text-center text-gray-500 text-xs">{year}</th>
                     ))}
                   </tr>
                 </thead>
                 <tbody>
                   {techData.ipc.map((row: any, i: number) => (
                     <tr key={i} className="border-t border-gray-100">
                       <td><div className="line-clamp-1 truncate w-50">{row.node}</div></td>
                       {row.years.map((y: number, j: number) => (
                         <td key={j} className="p-1">
                           <div className={`w-full h-full flex items-center justify-center p-2 ${y > 3 ? 'bg-blue-600 font-bold' : ''}`} style={{ backgroundColor: y > 0 ? (y > 3 ? '#3B82F6' : `rgba(59, 130, 246, ${0.1 * y + 0.1})`) : 'transparent' }}>
                             <span className={`text-xs font-medium ${y > 3 ? 'text-white' : (y > 0 ? 'text-gray-800' : 'text-gray-300')}`}>{y}</span>
                           </div>
                         </td>
                       ))}
                     </tr>
                   ))}
                 </tbody>
               </table>
               <div className="text-right mt-2 text-xs text-gray-400">第 1-6 条/总共 6 条</div>
             </div>
           </div>

           <div className="mb-4">
             <div className="text-lg font-bold text-gray-800 flex items-center gap-3 mb-1">
               <div className="w-1 h-7 bg-indigo-600"></div>(2) 产品创新词云
             </div>
             <p className="text-sm text-gray-500 mt-1 pl-4 leading-relaxed">通过创新词云可以了解该主体最热门的技术主题。</p>
           </div>
           <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-4 h-[240px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 p-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <span className="absolute top-[30%] left-[20%] text-2xl text-blue-500 font-bold">钠离子电池正极材料</span>
                  <span className="absolute top-[50%] left-[45%] text-2xl text-orange-500 font-bold">去离子水</span>
                  <span className="absolute top-[20%] left-[60%] text-lg text-green-500 font-bold">稳定性</span>
                  <span className="absolute top-[70%] left-[30%] text-lg text-red-500 font-bold">高容量</span>
                  <span className="absolute top-[40%] left-[75%] text-base text-purple-500 font-bold">循环性能</span>
                  <span className="absolute top-[10%] left-[40%] text-sm text-gray-400 font-bold">合成工艺</span>
                </div>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="mb-4">
                  <div className="text-lg font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-1 h-7 bg-indigo-600"></div>(3) 被引用最多的专利
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-xs text-gray-500">
                      <tr><th className="p-3">公开号/标题</th><th className="p-3 w-20 text-right">引用</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {techData.topCited.map((p: any, idx: number) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="p-3">
                            <div className="font-mono text-xs text-gray-500 mb-1">{p.id}</div>
                            <div title={p.title} className="text-gray-800 font-medium line-clamp-1 hover:underline cursor-pointer">{p.title}</div>
                          </td>
                          <td className="p-3 text-right font-bold text-orange-600">{p.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="mb-4">
                  <div className="text-lg font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-1 h-7 bg-indigo-600"></div>(4) 权利要求最多的专利
                  </div>
                </div>
                <div className="overflow-x-auto h-full">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-xs text-gray-500">
                      <tr><th className="p-3">公开号/标题</th><th className="p-3 w-20 text-right">项数</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {techData.topClaims.map((p: any, idx: number) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="p-3">
                            <div className="font-mono text-xs text-gray-500 mb-1">{p.id}</div>
                            <div title={p.title} className="text-gray-800 font-medium line-clamp-1 hover:underline cursor-pointer">{p.title}</div>
                          </td>
                          <td className="p-3 text-right font-bold text-blue-600">{p.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
           </div>
        </div>

        {/* 4. 发明人排名 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
           <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
             <div className="w-2 h-6 bg-indigo-600 rounded"></div>
             <h2 className="text-xl font-bold text-gray-900">4. 发明人排名</h2>
           </div>
           <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
             <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500">
                  <tr><th className="p-3 text-left">发明人</th><th className="p-3 text-right">数量(件)</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {techData.inventors.map((inv: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-3 text-gray-700 font-medium">{inv.name}</td>
                      <td className="p-3 text-right font-bold text-gray-900">{inv.count}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>

        {/* 5. 合作企业排名 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
           <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
             <div className="w-2 h-6 bg-indigo-600 rounded"></div>
             <h2 className="text-xl font-bold text-gray-900">5. 合作企业排名</h2>
           </div>
           <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
             <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500">
                  <tr><th className="p-3 text-left">合作企业</th><th className="p-3 text-right">合作专利数量(件)</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td colSpan={2} className="p-8 text-center text-gray-400">暂无合作公司数据</td></tr>
                </tbody>
             </table>
           </div>
        </div>

        {/* 6. 专利转入 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
           <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
             <div className="w-2 h-6 bg-indigo-600 rounded"></div>
             <h2 className="text-xl font-bold text-gray-900">6. 专利转入</h2>
           </div>
           <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
             <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500">
                  <tr><th className="p-3 text-left">转入方</th><th className="p-3 text-right">转入数量(件)</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {techData.transfers.map((t: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-3 text-gray-700 font-medium">{t.from}</td>
                      <td className="p-3 text-right font-bold text-gray-900">{t.count}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>

        {/* 7. 重点专利评分 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
           <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
             <div className="w-2 h-6 bg-indigo-600 rounded"></div>
             <h2 className="text-xl font-bold text-gray-900">7. 重点专利评分列表</h2>
           </div>
           <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm overflow-x-auto">
             <table className="w-full text-[11px] text-left table-fixed">
               <thead className="bg-gray-50 text-gray-500 font-bold uppercase">
                 <tr>
                    <th className="p-3 border-r border-gray-100 w-[200px]">专利名称&摘要</th>
                    <th className="p-3 text-center border-r border-gray-100">技术创新性</th>
                    <th className="p-3 text-center border-r border-gray-100">技术稀缺性</th>
                    <th className="p-3 text-center border-r border-gray-100">应用价值</th>
                    <th className="p-3 text-center border-r border-gray-100">产业化可行</th>
                    <th className="p-3 text-center border-r border-gray-100">发展潜力</th>
                    <th className="p-3 text-center border-r border-gray-100">技术重要性</th>
                    <th className="p-3 text-center border-r border-gray-100">专利类型</th>
                    <th className="p-3 text-center border-r border-gray-100">专利状态</th>
                    <th className="p-3 text-center border-r border-gray-100">专利引证</th>
                    <th className="p-3 text-center">总分</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {techData.highlightPatents.map((p: any, idx: number) => (
                   <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                     <td className="p-3 border-r border-gray-100">
                       <div className="font-bold text-gray-800 line-clamp-1 truncate hover:underline cursor-pointer">{p.title}</div>
                       <div className="text-gray-400 mt-1 line-clamp-2">专利摘要概览...</div>
                     </td>
                     <td className="p-3 text-center font-bold text-green-600 border-r border-gray-100 text-[14px]">{p.innovation}</td>
                     <td className="p-3 text-center font-bold text-green-600 border-r border-gray-100 text-[14px]">{p.scarcity}</td>
                     <td className="p-3 text-center font-bold text-green-600 border-r border-gray-100 text-[14px]">{p.value}</td>
                     <td className="p-3 text-center font-bold text-gray-600 border-r border-gray-100 text-[14px]">{p.industrial}</td>
                     <td className="p-3 text-center font-bold text-green-600 border-r border-gray-100 text-[14px]">{p.potential}</td>
                     <td className="p-3 text-center font-bold text-green-600 border-r border-gray-100 text-[14px]">{p.importance}</td>
                     <td className="p-3 text-center font-bold text-green-600 border-r border-gray-100 text-[14px]">{p.typeScore}</td>
                     <td className="p-3 text-center font-bold text-green-600 border-r border-gray-100 text-[14px]">{p.status}</td>
                     <td className="p-3 text-center font-bold text-gray-600 border-r border-gray-100 text-[14px]">{p.citation}</td>
                     <td className="p-3 text-center font-bold text-gray-600 text-[14px]">{p.total}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    );
  }
  return null;
};

// --- Main Component ---
export default function ReportView({ onBack }: { onBack?: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('portrait');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const sections = ['portrait', 'tech', 'potential', 'competitiveness', 'operation', 'reputation'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const company = {
    name: "浙江钠创新能源有限公司",
    registrationData: [
      [
        { label: "法定代表人", value: "车海英" },
        { label: "登记状态", value: "存续" },
        { label: "成立日期", value: "2018-05-08" }
      ],
      [
        { label: "统一社会信用代码", value: "91330600MA2BEJ8XXJ" },
        { label: "注册资本", value: "1685.3875万人民币" },
        { label: "工商注册号", value: "330600000258675" }
      ],
      [
        { label: "纳税人识别号", value: "91330600MA2BEJ8XXJ" },
        { label: "组织机构代码", value: "MA2BEJ8X-X" },
        { label: "官网", value: "http://www.natrium-energy.cn", isLink: true }
      ],
      [
        { label: "企业类型", value: "其他有限责任公司" },
        { label: "行业", value: "计算机、通信和其他电子设备制造业" },
        { label: "参保人数", value: "207" }
      ],
      [
        { label: "英文名称", value: "Zhejiang Sodium Innovation Energy Co., Ltd.", valueSpan: 2 },
        { label: "曾用名", value: "", valueSpan: 2 }
      ],
      [
        { label: "注册地址", value: "浙江省绍兴市越城区沥海街道马欢路398号科创园B楼二层", valueSpan: 5 }
      ],
      [
        { label: "经营范围", value: "一般项目：电子专用材料制造；电子专用材料销售；电子专用材料研发；化工产品销售（不含许可类化工产品）；专用化学产品销售（不含危险化学品）；电池制造；电池销售；储能技术服务；技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；新材料技术研发(除依法须经批准的项目外，凭营业执照依法自主开展经营活动)。", valueSpan: 5 }
      ]
    ],
    tags: ["高新技术企业", "专精特新中小企业", "创新型中小企业", "A轮"],
    notes: "暂无备注",
    analysis: {
      techScore: 6.75,
      potentialScore: 8.00,
      competitivenessScore: 8.00,
      operationScore: 8.00,
      reputationScore: 9.00,
      totalScore: 7.74
    }
  };

  const techData = {
    score: 6.75,
    reason: "技术实力较强，聚焦钠离子电池正极材料（占绝对多数）及电解液、回收等配套环节，40件产业相关专利体现明确技术主线；但研发持续性存疑，2019–2020年连续零授权/公开，2021–2025年虽有波动回升，整体年均不足5件；专利质量中等，发明占比100%，但授权率仅37.5%，且全部高被引专利被引量为0，技术影响力待验证；高权利要求专利（如CN117049606B达25项）显示一定布局深度；无合作专利，自主研发封闭；2件专利存在转让迹象（5%），需关注权属稳定性风险。",
    trends: [
      { year: '2018', total: 5, c1: 0, c2: 1, c3: 2, c4: 0, c5: 0, c6: 0 },
      { year: '2019', total: 3, c1: 0, c2: 0, c3: 0, c4: 1, c5: 2, c6: 0 },
      { year: '2020', total: 3, c1: 0, c2: 0, c3: 0, c4: 0, c5: 2, c6: 0 },
      { year: '2021', total: 7, c1: 1, c2: 0, c3: 1, c4: 1, c5: 5, c6: 1 },
      { year: '2022', total: 5, c1: 1, c2: 0, c3: 1, c4: 3, c5: 1, c6: 1 },
      { year: '2023', total: 5, c1: 1, c2: 0, c3: 3, c4: 2, c5: 1, c6: 1 },
      { year: '2024', total: 5, c1: 0, c2: 0, c3: 1, c4: 1, c5: 1, c6: 0 },
      { year: '2025', total: 7, c1: 1, c2: 0, c3: 3, c4: 1, c5: 4, c6: 1 }
    ],
    quality: [
        { score: '0-1', count: 0 }, { score: '1-2', count: 0 }, { score: '2-3', count: 0 },
        { score: '3-4', count: 0 }, { score: '4-5', count: 0 }, { score: '5-6', count: 5 },
        { score: '6-7', count: 27 }, { score: '7-8', count: 8 }, { score: '8-9', count: 0 },
        { score: '9-10', count: 0 }
    ],
    types: [
        { name: '发明授权', value: 15, color: '#3B82F6' },
        { name: '发明公开', value: 25, color: '#F59E0B' }
    ],
    validity: [
        { name: '有效', value: 18, color: '#3B82F6' },
        { name: '无效', value: 3, color: '#F59E0B' },
        { name: '审中-实审', value: 16, color: '#10B981' },
        { name: '审中-公开', value: 3, color: '#8B5CF6' }
    ],
    ipc: [
        { node: '二次电池；及其制造', years: [2, 0, 0, 2, 0, 1, 0, 1] },
        { node: '氰；其化合物', years: [1, 0, 1, 0, 0, 1, 0, 0] },
        { node: '电极', years: [1, 3, 0, 5, 3, 2, 2, 4] },
        { node: '磷；其化合物', years: [1, 0, 0, 0, 1, 1, 0, 0] },
        { node: '铁的化合物', years: [0, 0, 0, 0, 0, 0, 0, 2] },
        { node: '镍的化合物', years: [0, 0, 2, 0, 1, 0, 3, 0] }
    ],
    topCited: [
        { id: 'CN111547742B', title: '一种钠离子电池正极材料及其制备方法和钠离子电池', count: 0 },
        { id: 'CN112216823B', title: '氟磷酸钒钠包覆正极材料、钠离子电池及其制备方法和应用', count: 0 },
        { id: 'CN113889603A', title: '一种钠离子电池正极材料及其制备方法', count: 0 },
        { id: 'CN116960281A', title: '一种复合聚阴离子型硫酸亚铁钠正极材料及其制备方法', count: 0 },
        { id: 'CN112886084B', title: '一种钠离子电池层状氧化物正极材料的修复方法', count: 0 },
        { id: 'CN112456567A', title: '一种包覆结构钠离子电池正极材料的制备方法', count: 0 },
        { id: 'CN120955124A', title: '一种钠离子电池正极材料的制备方法及应用', count: 0 },
        { id: 'CN120943301A', title: '一种氟化物钠离子电池正极材料的制备方法及应用', count: 0 },
        { id: 'CN116002650B', title: '一种复合磷酸焦磷酸铁钠聚阴离子型正极材料的制备方法及其在钠离子电池的应用', count: 0 },
        { id: 'CN120072923A', title: '一种高容量钠离子电池层状正极材料及其制备方法', count: 0 }
    ],
    topClaims: [
        { id: 'CN117049606B', title: '一种改性正极材料及其制备方法、应用和钠离子电池', count: 25 },
        { id: 'CN116262635B', title: '改性镍锰酸钠电极材料、钠离子电池及制备方法、应用', count: 22 },
        { id: 'CN113937262B', title: '一种用于钠离子电池的金属氧化物改性的正极材料及其制备方法和应用', count: 13 },
        { id: 'CN116002650B', title: '一种复合磷酸焦磷酸铁钠聚阴离子型正极材料的制备方法', count: 11 },
        { id: 'CN118771474A', title: '一种钠离子电池正极材料及其制备方法和应用', count: 10 },
        { id: 'CN120978061A', title: '一种钠离子正极材料及其制备方法', count: 10 },
        { id: 'CN120955124A', title: '一种钠离子电池正极材料的制备方法及应用', count: 10 },
        { id: 'CN120943301A', title: '一种氟化物钠离子电池正极材料的制备方法及应用', count: 10 },
        { id: 'CN120072923A', title: '一种高容量钠离子电池层状正极材料及其制备方法', count: 10 },
        { id: 'CN118324203A', title: '一种铁基钠离子电池正极材料及其制备方法与应用', count: 10 }
    ],
    highlightPatents: [
        { title: '一种含硼的塑晶聚合物及其制备方法和应用', innovation: 9, scarcity: 9, value: 8, industrial: 4, potential: 9, importance: 9, typeScore: 8, status: 9, citation: 4, total: 7.61 },
        { title: '一种普鲁士蓝类正极材料及其制备方法与应用', innovation: 9, scarcity: 8, value: 8, industrial: 5, potential: 9, importance: 8, typeScore: 8, status: 9, citation: 3, total: 7.39 },
        { title: '一种改性正极材料及其制备方法、应用和钠离子电池', innovation: 8, scarcity: 8, value: 8, industrial: 5, potential: 9, importance: 8, typeScore: 8, status: 9, citation: 3, total: 7.28 },
        { title: '一种过渡金属氧化物材料及其制备方法', innovation: 9, scarcity: 8, value: 7, industrial: 5, potential: 9, importance: 8, typeScore: 7, status: 9, citation: 4, total: 7.26 },
        { title: '普鲁士蓝类正极材料、钠离子电池及其制备方法和应用', innovation: 8, scarcity: 7, value: 8, industrial: 6, potential: 9, importance: 9, typeScore: 8, status: 9, citation: 1, total: 7.21 },
        { title: '一种钠离子电池层状氧化物正极材料的修复方法', innovation: 8, scarcity: 7, value: 8, industrial: 5, potential: 8, importance: 8, typeScore: 8, status: 9, citation: 4, total: 7.2 },
        { title: '钠离子电池用聚合物电解质基体及膜、其制备方法和应用', innovation: 8, scarcity: 8, value: 7, industrial: 4, potential: 9, importance: 8, typeScore: 8, status: 9, citation: 4, total: 7.18 },
        { title: '一种碳包覆磷酸钒钠复合正极材料的制备方法', innovation: 8, scarcity: 8, value: 8, industrial: 5, potential: 8, importance: 7, typeScore: 8, status: 9, citation: 4, total: 7.17 },
        { title: '一种复合磷酸焦磷酸聚阴离子型正极材料的制备方法及应用', innovation: 8, scarcity: 8, value: 8, industrial: 5, potential: 9, importance: 9, typeScore: 8, status: 7, citation: 1, total: 6.99 },
        { title: '钠离子电池层状氧化物正极材料及其制备方法和应用', innovation: 8, scarcity: 8, value: 8, industrial: 5, potential: 9, importance: 9, typeScore: 8, status: 7, citation: 1, total: 6.99 }
    ],
    inventors: [
      { name: "车海英", count: 34 }, { name: "马紫峰", count: 23 }, { name: "廖建平", count: 7 },
      { name: "陈航达", count: 6 }, { name: "陈苏莉", count: 4 }, { name: "廖小珍", count: 4 },
      { name: "张云龙", count: 4 }, { name: "王红", count: 4 }, { name: "袁涛", count: 4 },
      { name: "冯凡", count: 3 }
    ],
    transfers: [
      { from: "上海紫剑化工科技有限公司", count: 6 },
      { from: "上海交通大学", count: 3 }
    ]
  };

  const potentialData = {
    score: 8.00,
    reason: "团队方面，创始人兼首席科学家马紫峰为上海交大讲席教授、国家973计划首席科学家，在电化学储能领域有深厚积累，核心团队背景强。融资方面，公司已完成A+轮融资，由昆仑资本、国投招商等知名机构投资，融资质量中上。工商信息显示企业存续，无重大风险。综合判断为较高潜力。",
    references: [
      { id: 1, text: "上海交通大学化学化工学院", link: "https://scce.sjtu.edu.cn/index_news/4225.html", note: "(官方新闻稿确认马紫峰为钠创新能源创始人兼首席科学家)" },
      { id: 2, text: "昆仑资本", link: "https://www.kunlun-cap.com/wap/2023/news_wap_0203/134.html", note: "(投资方官方新闻稿披露了对钠创新能源的A+轮投资)" }
    ],
    team: [
      { id: 1, name: "丁璐", position: "董事", avatar: "丁" },
      { id: 2, name: "冯丹音", position: "董事", avatar: "冯" },
      { id: 3, name: "叶伟东", position: "董事", avatar: "叶" },
      { id: 4, name: "廖建平", position: "董事", avatar: "廖" },
      { id: 5, name: "李钢", position: "董事", avatar: "李" },
      { id: 6, name: "车海英", position: "董事长", avatar: "车" },
      { id: 7, name: "黄晓南", position: "监事", avatar: "黄" },
    ],
    shareholders: [
      { name: "上海紫剑化工科技有限公司", ratio: "46.8219%", paid: "-", paidTime: "-", paidType: "-", committed: "789.13万元人民币", committedTime: "2030-12-31", committedType: "货币", firstDate: "2018-05-08", type: "公司" },
      { name: "绍兴新篁能源科技合伙企业（有限合伙）", ratio: "14.8334%", paid: "-", paidTime: "-", paidType: "-", committed: "250万元人民币", committedTime: "2030-12-31", committedType: "货币", firstDate: "2021-09-29", type: "公司" },
      { name: "浙江医药股份有限公司", ratio: "11.8667%", paid: "-", paidTime: "-", paidType: "-", committed: "200万元人民币", committedTime: "2018-05-31", committedType: "货币", firstDate: "2018-05-08", type: "公司" },
      { name: "江苏淮海新能源车辆有限公司", ratio: "4.8286%", paid: "-", paidTime: "-", paidType: "-", committed: "81.38万元人民币", committedTime: "2021-10-29", committedType: "货币", firstDate: "2021-10-29", type: "公司" },
      { name: "先进制造产业投资基金二期（有限合伙）", ratio: "4.1935%", paid: "-", paidTime: "-", paidType: "-", committed: "70.6775万元人民币", committedTime: "2023-04-13", committedType: "货币", firstDate: "2023-03-13", type: "公司" },
      { name: "弘安新能源科技有限公司", ratio: "3.4906%", paid: "-", paidTime: "-", paidType: "-", committed: "58.83万元人民币", committedTime: "2022-10-31", committedType: "货币", firstDate: "2022-10-31", type: "公司" },
      { name: "青岛国合迭代创业投资基金合伙企业（有限合伙）", ratio: "3.2254%", paid: "-", paidTime: "-", paidType: "-", committed: "54.36万元人民币", committedTime: "2023-01-19", committedType: "货币", firstDate: "2023-01-19", type: "公司" },
      { name: "杭州安丰富盛创业投资合伙企业（有限合伙）", ratio: "3.0901%", paid: "-", paidTime: "-", paidType: "-", committed: "52.08万元人民币", committedTime: "2021-10-29", committedType: "货币", firstDate: "2021-10-29", type: "公司" },
      { name: "金晓铮", ratio: "1.6756%", paid: "0.0万元人民币", paidTime: "-", paidType: "-", committed: "28.24万元人民币", committedTime: "2022-01-30", committedType: "货币", firstDate: "2022-01-14", type: "人" },
      { name: "日照芯能皓原股权投资基金合伙企业（有限合伙）", ratio: "1.6133%", paid: "-", paidTime: "-", paidType: "-", committed: "27.19万元人民币", committedTime: "2023-01-19", committedType: "货币", firstDate: "2023-01-19", type: "公司" },
    ],
    funding: [
        { round: 'A+轮', date: '-', newsDate: '2023-02-03', investors: '昆仑资本，国合新力，芯能创投，国投招商', amount: '数亿人民币', title: '钠创新能源完成数亿元 A+轮融资', link: 'https://www.chinaventure.com.cn/news/112/20230203/373435.html' },
        { round: 'A轮', date: '-', newsDate: '2022-10-25', investors: '淮海控股，安丰创投，维科集团，广发基金', amount: '未披露', title: '钠创重磅丨A轮融资圆满完成', link: 'https://mp.weixin.qq.com/s/UoJy0NvhmgLBb2AhU-6DPA' },
        { round: 'Pre-A轮', date: '-', newsDate: '2021-10-29', investors: '安丰创投，淮海控股', amount: '亿级人民币', title: '-', link: '-' },
        { round: '战略融资', date: '-', newsDate: '2020-04-14', investors: '浙江医药', amount: '未披露', title: '-', link: '-' }
    ]
  };

  const competitivenessData = {
    score: 8.00,
    reason: "浙江钠创新能源在标准制定方面表现突出，作为参编单位参与了多项钠离子电池相关的团体/行业标准。公司拥有高新技术企业、专精特新等资质，并对外投资了3家产业链上下游企业，形成协同效应。联网信息显示其为行业头部玩家，但缺乏L1级来源证明其市占率全国前三或全球领先，故未达9分。",
    references: [
      { id: 1, text: "tide新闻", link: "https://tidenews.com.cn/news.html?id=3075048", note: "(地方官方媒体，报道了企业技术指标和行业地位)" },
      { id: 2, text: "中国新能源网", link: "https://www.inewenergy.com/newsn/bangdan/44181.html", note: "(行业垂直媒体，发布了2025年钠离子电池竞争力品牌榜单，提及该公司)" },
      { id: 3, text: "上海交通大学四川研究院", link: "https://scce.sjtu.edu.cn/index_news/4225.html", note: "(关联方（技术来源方）官网，提供了企业背景和产业园信息)" }
    ],
    tags: ["高新技术企业", "专精特新中小企业", "创新型中小企业", "A轮"],
    standards: [
      {
        id: 1,
        name: "钠离子起动电池",
        code: "T/CAEE 004—2025",
        type: "团体标准",
        status: "现行",
        publishDate: "2025-05-29",
        implementDate: "2025-06-30",
        abolishDate: "-",
        cnClass: "-",
        intlClass: "43.140",
        economyClass: "C384 电池制造",
        hasPatent: "否",
        draftUnit: "天津先众新能源科技股份有限公司、辽宁星空钠电电池有限公司、山西华钠芯能科技有限责任公司、孚能科技（赣州）股份有限公司、安徽青钠能源科技有限公司、湖南丰日电源电气股份有限公司、浙江钠伏新能源科技有限公司、山东奥冠新能源科技有限公司、国钠能源科技（河北）有限公司、浙江湖州先众新能源科技有限公司、浙江钠创新能源有限公司、智碳荟（北京）信息科技有限公司",
        content: "本标准适用于摩托车、汽车等起动用大倍率钠离子电池。技术要求包括：外观清洁无缺陷，极性标识清晰；12V/24V 电池组开路电压分别为 7.2~16.0V、14.4~32.0V，室温 / 高温 / 低温放电容量分别不低于标称容量的 90%、95%、80%，常温 / 低温大倍率放电性能达标，循环寿命≥1000 次（脉冲≥10000 次），需通过过充、短路等安全测试及湿热、盐雾等环境适应性测试。试验方法涵盖电性能、安全、环境测试流程，检验分为出厂、周期、型式检验，规定了抽样及判定规则，还明确了标志、包装、运输及贮存要求。"
      },
      {
        id: 2,
        name: "钠离子蓄电池通用规范",
        code: "T/CNESA 1006—2025",
        type: "团体标准",
        status: "现行",
        publishDate: "2025-04-10",
        implementDate: "2025-04-10",
        abolishDate: "-",
        cnClass: "-",
        intlClass: "29.220.01 电池和蓄电池综合",
        economyClass: "D441 电力生产",
        hasPatent: "否",
        draftUnit: "中国科学院物理研究所、上海交通大学、南方电网调峰调频发电有限公司、北京中科海钠科技有限责任公司、浙江钠创新能源有限公司、温州大学、温州大学碳中和技术创新研究院、宁德时代新能源科技股份有限公司、中国科学院大连化学物理研究所、河南省法恩莱特新能源科技有限公司、湖南立方新能源科技有限责任公司、成都佰思格科技有限公司、南方电网电力科技股份有限公司、中国长江三峡集团有限公司科学技术研究院、全球能源互联网研究院有限公司、华为技术有限公司、江苏爱玛车业科技有限公司、华能天成融资租赁有限公司",
        content: "本文件规定了钠离子蓄电池的型号命名、技术要求、试验方法、检验规则以及标识、包装、运输和贮存等通用要求。本文件适用于单体钠离子蓄电池。"
      },
      {
        id: 3,
        name: "钠离子电池用正极材料焦磷酸磷酸铁钠",
        code: "T/CNIA 0276—2025",
        type: "团体标准",
        status: "现行",
        publishDate: "2025-02-24",
        implementDate: "2025-07-01",
        abolishDate: "-",
        cnClass: "-",
        intlClass: "77.160",
        economyClass: "C324 有色金属合金制造",
        hasPatent: "否",
        draftUnit: "湖北万润新能源科技股份有限公司、厦门厦钨新能源材料股份有限公司、北京当升材料科技股份有限公司、深圳市贝特瑞新能源技术研究院有限公司、武汉大学、合肥国轩高科动力能源有限公司、浙江钠创新能源有限公司、格林美股份有限公司、中伟新材料股份有限公司、万华化学集团股份有限公司",
        content: "本文件规定了钠离子电池用正极材料焦磷酸磷酸铁钠的术语和定义、技术要求、试验方法、检验规则、标志、包装、运输、贮存及随行文件和订货单内容。本文件适用于钠离子电池用正极材料焦磷酸磷酸铁钠。"
      },
      {
        id: 4,
        name: "钠离子电池用正极材料镍铁锰酸钠",
        code: "T/CNIA 0277—2025",
        type: "团体标准",
        status: "现行",
        publishDate: "2025-02-24",
        implementDate: "2025-07-01",
        abolishDate: "-",
        cnClass: "-",
        intlClass: "77.160",
        economyClass: "C324 有色金属合金制造",
        hasPatent: "否",
        draftUnit: "广东邦普循环科技有限公司、北京当升材料科技股份有限公司、天津国安盟固利新材料科技股份有限公司、浙江钠创新能源有限公司、贝特瑞新材料集团股份有限公司、天津巴莫科技有限责任公司、万华化学集团股份有限公司、厦门厦钨新能源材料股份有限公司、格林美（无锡）能源材料有限公司、金川集团股份有限公司、湖南长远锂科新能源有限公司、江门科恒实业股份有限公司、广东佳纳能源科技有限公司、湖南力合厚浦科技有限公司",
        content: "本文件规定了镍铁锰酸钠的术语和定义、技术要求、试验方法、检验规则、标志、包装、运输、贮存及随行文件和订货单内容。本文件适用于钠离子电池用正极材料O3相晶体结构的镍铁锰酸钠。其他晶体结构的镍铁锰酸钠产品可参照执行。"
      },
      {
        id: 5,
        name: "钠离子电池用有机电解液",
        code: "T/CAAMTB 187—2024",
        type: "团体标准",
        status: "现行",
        publishDate: "2024-03-19",
        implementDate: "2024-04-01",
        abolishDate: "-",
        cnClass: "-",
        intlClass: "31-030",
        economyClass: "G544 道路运输辅助活动",
        hasPatent: "否",
        draftUnit: "张家港市国泰华荣化工新材料有限公司、浙江钠创新能源有限公司、深圳新宙邦科技股份有限公司、广州天赐高新材料股份有限公司、珠海市赛纬电子材料股份有限公司、珠海冠宇电池股份有限公司、山东海科新源材料科技股份有限公司、香河昆仑新能源材料股份有限公司、新乡华锐锂电新能源股份有限公司、ENCHEMCo. Ltd.、天能电池集团股份有限公司、抚顺东科新能源科技有限公司、合肥乾锐科技有限公司、江苏新泰材料科技有限公司、山东新蔚源新材料有限公司、湖州超钠新能源科技有限公司、深圳华驰新能源科技有限公司、温州大学碳中和技术创新研究院、深圳珈钠能源科技有限公司、中国科学院大连化学物理研究所、武汉大学、深圳博钠新能源科技有限公司、华兴中科标准技术（北京）有限公司、国联汽车动力电池研究院有限责任公司",
        content: "本文件规定了钠离子电池用有机电解液的技术要求、试验方法、检验规则以及标志、包装、运输和贮存等内容。"
      },
      {
        id: 6,
        name: "钠离子电池通用规范",
        code: "T/CIAPS 0031—2023",
        type: "团体标准",
        status: "现行",
        publishDate: "2023-11-02",
        implementDate: "2023-11-30",
        abolishDate: "-",
        cnClass: "K82",
        intlClass: "29.220.01 电池和蓄电池综合",
        economyClass: "C384 电池制造",
        hasPatent: "否",
        draftUnit: "浙江华宇钠电新能源科技有限公司、深圳市比亚迪锂电池有限公司、溧阳中科海钠科技有限责任公司、浙江钠创新能源有限公司、福建猛狮新能源科技有限公司、安徽吉厚智能科技有限公司、常州千沐新能源有限公司、多助科技（武汉）有限公司、佛山市金银河智能装备股份有限公司、合肥国轩高科动力能源有限公司、河南福森新能源科技有限公司、湖南丰日电源电气股份有限公司、湖南立方新能源科技有限责任公司、湖南钠能时代科技发展有限公司、江苏传艺钠电科技有限公司、江苏海四达电源有限公司、江苏众钠能源科技有限公司、江西明冠锂膜技术有限公司、钠坤碳源（天津）科技有限公司、欧赛新能源科技股份有限公司、陕西顷刻能源科技有限公司、山西华钠芯能科技有限责任公司、深圳华钠新材有限责任公司、深圳市贝特瑞新能源技术研究院有限公司、深圳中芯能科技有限公司、深圳华钠新材有限责任公司、双登集团股份有限公司、苏州新能量能源科技有限公司、维科技术股份有限公司、武汉正峰新能源科技有限公司、香河昆仑新能源材料股份有限公司、星恒电源股份有限公司、雅迪科技集团有限公司、钇威汽车科技有限公司、浙江昌意钠电储能有限公司、浙江南都电源动力股份有限公司、中比新能源、中科（马鞍山）新材料科创园有限公司",
        content: "钠离子电池通用规范》标准编制说明内容包括：范围、规范性引用文件、术语和定义、符合和型号编制、技术要求、试验方法、检验规则及标志、包装、运输和贮存"
      },
      {
        id: 7,
        name: "钠离子蓄电池通用规范",
        code: "T/CNESA 1006—2021",
        type: "团体标准",
        status: "现行",
        publishDate: "2021-12-30",
        implementDate: "2021-12-30",
        abolishDate: "-",
        cnClass: "K 82",
        intlClass: "29.220.01 电池和蓄电池综合",
        economyClass: "C384 电池制造",
        hasPatent: "否",
        draftUnit: "中国科学院物理研究所、上海交通大学、南方电网调峰调频发电有限公司、北京中科海钠科技有限责任公司、浙江钠创新能源有限公司、温州大学、温州大学碳中和技术创新研究院、宁德时代新能源科技股份有限公司、中国科学院大连化学物理研究所、河南省法恩莱特新能源科技有限公司、湖南立方新能源科技有限责任公司、成都佰思格科技有限公司、南方电网电力科技股份有限公司、中国长江三峡集团有限公司科学技术研究院、全球能源互联网研究院有限公司、华为技术有限公司、江苏爱玛车业科技有限公司、华能天成融资租赁有限公司",
        content: "本文件规定了钠离子蓄电池的型号命名、技术要求、试验方法、检验规则以及标识、包装、运输和贮存等通用要求。本文件适用于工作温度不高于150 ℃的圆柱形和方形单体钠离子蓄电池。"
      }
    ],
    certificates: [
      { id: "143728/A/0001/SM/ZH/0592608-LOC", name: "汽车行业质量管理体系认证", type: "质量管理体系认证", start: "2025-12-23", end: "2026-12-22" },
      { id: "84025IP21017R0M", name: "企业知识产权管理体系认证", type: "知识产权管理体系认证", start: "2025-12-04", end: "2028-12-03" },
      { id: "00224E30954R0M", name: "环境管理体系认证", type: "环境管理体系认证", start: "2024-03-18", end: "2027-03-17" },
      { id: "CQM24S20850R0M", name: "中国职业健康安全管理体系认证", type: "职业健康安全管理体系认证", start: "2024-03-18", end: "2027-03-17" },
      { id: "GR202333009012", name: "高新技术企业证书", type: "高新技术企业", start: "2023-12-08", end: "2026-12-08" },
      { id: "91330600MA2BEJ8XXJ001Y", name: "排污许可证", type: "排污许可证", start: "2023-08-21", end: "2028-08-20" },
      { id: "绍越安经（危）字[2023]060072", name: "危险化学品经营许可证", type: "危险化学品经营许可证", start: "2023-04-04", end: "2026-04-03" },
      { id: "00223Q21118R0M", name: "质量管理体系认证（ISO9001）", type: "质量管理体系认证", start: "2023-03-13", end: "2026-03-12" }
    ],
    investments: [
      { name: "上海钠创新能源技术有限公司", amount: "1000", ratio: "100%", date: "2021-11-09", scope: "一般项目：技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；新兴能源技术研发；电池销售；蓄电池租赁；合成材料销售；电池制造；电子元器件与机电组件设备销售；机械设备销售；会议及展览服务；信息咨询服务（不含许可类信息咨询服务）（除依法须经批准的项目外，凭营业执照依法自主开展经营活动）。", legal: "车海英" },
      { name: "钠创新能源（内蒙古）有限公司", amount: "540", ratio: "90%", date: "2025-07-02", scope: "一般项目：电子专用材料制造；电子专用材料销售；电子专用材料研发；化工产品销售（不含许可类化工产品）；专用化学产品销售（不含危险化学品）；电池销售；储能技术服务；技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；新材料技术研发；新兴能源技术研发；机械设备研发；电力行业高效节能技术研发；物联网技术研发；资源再生利用技术研发；电力电子元器件销售；先进电力电子装置销售；电池零配件销售；电子产品销售；电器辅件销售；站用加氢及储氢设施销售；机械电气设备销售；太阳能热利用产品销售；充电桩销售；智能输配电及控制设备销售；电子元器件与机电组件设备销售；新能源汽车换电设施销售；太阳能热利用装备销售；合同能源管理；物联网应用服务；物联网技术服务；节能管理服务；蓄电池租赁；光伏发电设备租赁；充电控制设备租赁；电动汽车充电基础设施运营；贸易经纪。（除依法须经批准的项目外，凭营业执照依法自主开展经营活动）", legal: "车海英" },
      { name: "浙江致远钠科能源科技有限公司", amount: "100", ratio: "9%", date: "2025-07-03", scope: "一般项目：新兴能源技术研发；新能源原动设备销售；储能技术服务；电池销售；新材料技术研发；技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；蓄电池租赁；新能源汽车废旧动力蓄电池回收及梯次利用（不含危险废物经营）；合成材料销售(除依法须经批准的项目外，凭营业执照依法自主开展经营活动)。（依法须经批准的项目，经相关部门批准后方可开展经营活动）", legal: "崔桂嘉" }
    ]
  };

  const operationData = {
    score: 8.00,
    reason: "企业拥有国家级高新技术企业和省级制造业单项冠军、专精特新等有效荣誉。招投标方面，中标了多个地方重大项目（如亿元级地块和研发项目），但未见国家级重大项目记录。网络信息显示其为行业先锋，无负面记录，符合8分标准。",
    references: [
      { id: 1, text: "浙江省经济和信息化厅", link: "https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web2925/site/attach/0/f53d388290474321bdb21e7118a7a5e5.xlsx", note: "(官方文件确认其省级专精特新中小企业资质)" },
      { id: 2, text: "碳合新材", link: "https://www.tanhexincai.com/zhuanjiaziyuan/472.html", note: "(权威行业媒体对其中标重大产业项目的报道)" }
    ],
    honors: [
      { name: "专精特新中小企业", status: "有效", type: "科技型企业", level: "省级", year: "2023", date: "2023-12-07", agency: "绍兴市经济和信息化局" },
      { name: "创新型中小企业", status: "有效", type: "科技型企业", level: "省级", year: "2022", date: "2022-12-19", agency: "绍兴市经济和信息化局" },
      { name: "制造业单项冠军示范企业", status: "有效", type: "制造业企业", level: "省级", year: "2023", date: "2023-12-07", agency: "绍兴市经济和信息化局" },
      { name: "潜在独角兽企业", status: "有效", type: "荣誉", level: "国家级", year: "2024", date: "2024-10-24", agency: "长城战略咨询" },
      { name: "科技型中小企业", status: "有效", type: "科技型企业", level: "省级", year: "2020", date: "2020-12-28", agency: "浙江省科学技术厅" },
      { name: "高新技术企业", status: "有效", type: "科技型企业", level: "国家级", year: "2023", date: "2023-12-28", agency: "全国高新技术企业认定管理工作领导小组办公室" },
    ],
    business: [
      { name: "浙江钠创新能源有限公司", round: "A+轮", industry: "生产制造", product: "钠创新能源", date: "2018-05-08", desc: "钠离子电池技术研发商" }
    ],
    bidding: [
      { name: "浙江求是招标代理有限公司关于上海交通大学绍兴新能源与分子工程研究院兆瓦时级NFPP储能系统关键技术研发的成交结果公告", date: "2024-08-02", type: "中标结果", region: "浙江省", unit: "上海交通大学绍兴新能源与分子工程研究院", winner: "浙江钠创新能源有限公司,深圳市比亚迪锂电池有限公司（联合体）", amount: "2400000.00" },
      { name: "绍兴市生态环境局（越城分局）2023年12月15日拟对建设项目环评文件作出审... ", date: "2023-12-15", type: "招标预告", region: "浙江省", unit: "绍兴市生态环境局（越城分局）", winner: "-", amount: "0.00" },
      { name: "滨海新区〔2022〕G19(JB-05-01-07)地块", date: "2022-09-26", type: "中标结果", region: "未知", unit: "-", winner: "浙江钠创新能源有限公司", amount: "16090000.00" },
      { name: "关于2025年度绍兴市高价值专利培育拟立项项目和平台的公示", date: "2025-10-15", type: "中标结果", region: "浙江省", unit: "绍兴市市场监督管理局", winner: "-", amount: "0.00" },
      { name: "浙江大唐国际绍兴江滨热电有限责任公司燃气锅炉更新项目环评公示", date: "2025-10-30", type: "其他", region: "浙江省", unit: "浙江大唐国际绍兴江滨热电有限责任公司", winner: "-", amount: "0.00" },
      { name: "中化六建-浙江纳创项目-钢结构加工-采购方案变更公告", date: "2024-05-07", type: "招标公告", region: "浙江省", unit: "中国化学工程第六建设有限公司", winner: "-", amount: "0.00" },
      { name: "中化六建第五分公司-浙江钠创项目-钢结构加工-采购方案项目公告", date: "2024-04-23", type: "招标公告", region: "浙江省", unit: "中国化学工程第六建设有限公司", winner: "-", amount: "0.00" },
      { name: "绍兴市生态环境局（越城分局）2023年12月13日受理建设项目环评文件的公告", date: "2023-12-13", type: "招标公告", region: "浙江省", unit: "绍兴市生态环境局（越城分局）", winner: "-", amount: "0.00" },
      { name: "滨海新区（2023）G7（JB-05-01-10）地块", date: "2023-07-25", type: "中标结果", region: "浙江省", unit: "-", winner: "浙江钠创新能源有限公司", amount: "21770000.00" },
      { name: "中化六建-浙江纳创项目-钢结构加工-采购方案成交结果公告", date: "2024-05-11", type: "中标结果", region: "浙江省", unit: "中国化学工程第六建设有限公司", winner: "无锡市久创金属材料有限公司", amount: "0.00" },
    ]
  };

  const reputationData = {
    score: 9.00,
    reason: "舆情统计显示负面新闻占比为0%，正面/中性新闻达100%；舆情摘要与正面舆情摘要均明确指出企业获得国家级科技奖项、建成全球首条吨级示范线、完成年产4万吨项目一期投产、入选浙江省‘科技新小龙’等。所有信息指向企业在核心技术、产业化落地、政策认可、资本背书和生态构建五个维度均处于行业引领地位。",
    comprehensiveEvaluation: "舆情统计显示负面新闻占比为0%，正面/中性新闻达100%；舆情摘要与正面舆情摘要均明确指出企业获得国家级科技奖项（2025年中国石油和化学工业联合会科技进步一等奖）、建成全球首条吨级示范线、完成年产4万吨项目一期投产、入选浙江省‘科技新小龙’、获批省级工程研究中心、创始人获行业权威奖项，并获得多方资本加持及产业链深度合作。所有信息指向企业在核心技术、产业化落地、政策认可、资本背书和生态构建五个维度均处于行业引领地位，符合9分‘极佳’定义中‘获得国家级/国际级奖项、重大技术突破获得媒体高度评价、主营产品获国家/国际奖项’等核心内容特征，且无任何近期负面干扰。虽未达到10分所需的‘多种媒体一致的高度赞誉’+‘无任何历史负面包袱’+‘舆论高度赞誉期’的极致标杆状态（如尚未见‘世界领军’‘全球唯一’等绝对化表述，亦无长期跨周期声誉积淀佐证），但已充分满足9分全部条件。",
    overallOverview: "浙江钠创新能源有限公司整体舆情向好，企业持续在技术创新、产业落地与资本运作方面取得突破性进展。公司在钠离子电池核心材料领域实现多项技术突破，其研发成果获国家级科技奖项认可，并拥有系列自主知识产权。随着年产4万吨正极材料项目顺利投产，公司正式进入规模化量产阶段，产能布局加速向全国扩展。与此同时，公司通过多轮融资获得资本加持，并与融和元储、维科技术等产业链上下游企业建立深度合作，构建起从材料到系统集成的垂直整合生态。作为上海交通大学科技成果转化典范，公司正以技术引领者身份推动钠电产业从实验室走向大规模商业化应用，展现出强劲的发展动能与市场前景。",
    positiveSummary: "浙江钠创新能源有限公司在钠离子电池核心技术研发与产业化方面取得多项突破，其自主研发的钠离子电池多功能电解质技术荣获2025年中国石油和化学工业联合会科技进步一等奖，彰显了公司在行业内的技术领先地位。公司已建成全球首条吨级铁酸钠基层状氧化物正极材料生产示范线，并于2026年1月完成年产4万吨钠离子正极材料项目一期投产，标志着其成为国内规模领先的钠离子电池正极材料生产基地。公司持续推动产业链布局，与维科技术、融和元储等企业达成战略合作，共同推进钠离子电池在小动力及储能领域的商业化应用。同时，公司获得淮海控股集团、安丰创投、维科技术等多方资本支持，融资进展顺利。此外，公司入选浙江省科技新小龙企业名单，被认定为省级工程研究中心，其创始人马紫峰教授亦获行业权威奖项认可，充分体现了企业在技术创新、产业落地与政策支持方面的综合优势。",
    negativeSummary: "本期无负面舆情",
    news: [
      { id: 1, title: "钠离子电池“抢跑”：2023元年量产倒计时", date: "2026-01-27", source: "有驾", polarity: "积极", link: "https://www.yoojia.com/article/9820960751168552826.html" },
      { id: 2, title: "国家发改委谋划高技术重大工程，重塑‘十五五’产业版图", date: "2026-01-21", source: "今日头条", polarity: "积极", link: "https://www.toutiao.com/article/7597597628657893938/" },
      { id: 3, title: "维科技术加码钠离子电池，进军小动力电池市场新领域", date: "2026-01-10", source: "百度百家", polarity: "积极", link: "https://mbd.baidu.com/newspage/data/landingshare?nid=news_8756990424234383688" },
      { id: 4, title: "这项新能源技术获大奖 相关产品成功应用于比亚迪等40余家上下游企业", date: "2026-01-09", source: "绍兴日报", polarity: "积极", link: "http://epaper.shaoxing.com.cn/sxrb/pc/content/202601/09/content_626697.html" },
      { id: 5, title: "中国式现代化启航‘十五五’：超大规模市场与创新驱动重塑全球机遇", date: "2026-01-08", source: "今日头条", polarity: "积极", link: "https://www.toutiao.com/article/7592679499209114162/" },
      { id: 6, title: "浙江省科技新小龙企业名单公布，6家校友企业上榜！", date: "2026-01-07", source: "微信", polarity: "积极", link: "http://mp.weixin.qq.com/s?__biz=Mzk3NTAxNTI4NA==&mid=2247484350&idx=1&sn=ff3925e9cb331356977a7440fa6a0e4a" },
      { id: 7, title: "企业风采 | 新宙邦荣获2025年度中国石油和化工联合会科技进步一等奖", date: "2025-12-29", source: "微信", polarity: "积极", link: "http://mp.weixin.qq.com/s?__biz=MzIyNzc4MzU3OA==&mid=2247520509&idx=3&sn=8dafaefbcedc3b66bb03c01d8e2da50c" },
      { id: 8, title: "马紫峰团队荣获2025年度中国石油和化学工业联合会科技进步一等奖", date: "2025-12-29", source: "微信", polarity: "积极", link: "http://mp.weixin.qq.com/s?__biz=MzkyODMxNTc2Ng==&mid=2247490623&idx=1&sn=d7eb485ec89e77776947a76b7cee2d6b" },
      { id: 9, title: "【ABMC副理事长】新宙邦荣获2025年度中国石油和化工联合会科技进步一等奖", date: "2025-12-26", source: "微信", polarity: "积极", link: "http://mp.weixin.qq.com/s?__biz=MzYyNTI5Njk0OQ==&mid=2247647012&idx=2&sn=ae40e435192f0ce09a2e8cfba8be5196#ocr" },
      { id: 10, title: "新宙邦荣获2025年度中国石油和化工联合会科技进步一等奖", date: "2025-12-26", source: "微信", polarity: "积极", link: "http://mp.weixin.qq.com/s?__biz=MzI5OTA0NzQ5NA==&mid=2650914269&idx=1&sn=04c14c9c4011548425bfc32dd58919cb#ocr" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="w-full max-w-[1480px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
        <section className="flex flex-col xl:flex-row gap-[18px] items-start transition-all duration-200 relative">
        {/* Left Aside (Table of Contents) */}
        <aside className={`bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] transition-all duration-300 xl:sticky xl:top-[74px] overflow-hidden shrink-0 hidden xl:flex flex-col ${isSidebarCollapsed ? 'w-[60px] p-[20px_10px]' : 'w-[220px] p-[20px]'}`}>
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} mb-4`}>
            {!isSidebarCollapsed && <h2 className="text-[17px] font-black m-0 whitespace-nowrap overflow-hidden">报告目录</h2>}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors shrink-0"
              title={isSidebarCollapsed ? '展开目录' : '收起目录'}
            >
              {isSidebarCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
          
          <div className={`grid gap-[8px] transition-all duration-300 ${isSidebarCollapsed ? 'opacity-0 h-0 invisible' : 'opacity-100 visible'}`}>
            {[
              { n: '1. 企业画像', id: 'portrait' },
              { n: '2. 技术分析', id: 'tech' },
              { n: '3. 潜力分析', id: 'potential' },
              { n: '4. 竞争力分析', id: 'competitiveness' },
              { n: '5. 经营分析', id: 'operation' },
              { n: '6. 声誉分析', id: 'reputation' },
            ].map((item, idx) => (
              <a 
                key={idx}
                href={`#${item.id}`}
                className={`p-[10px_11px] rounded-[12px] text-[13px] flex justify-between gap-[10px] cursor-pointer transition-colors border ${activeSection === item.id ? 'bg-[#eaf1ff] border-[#bfdbfe] text-[#2563eb] font-black' : 'text-[#334155] border-transparent hover:bg-[#eaf1ff] hover:border-[#bfdbfe] hover:text-[#2563eb] hover:font-black'}`}
              >
                {item.n}
              </a>
            ))}
          </div>
        </aside>

        {/* Center Content */}
        <article className={`flex-1 min-w-0 bg-white border text-[#334155] rounded-[20px] p-[20px] md:p-[30px] min-h-[920px] transition-all w-full ${isEditing ? 'border-[#2563eb] shadow-[0_0_0_3px_rgba(37,99,235,0.08),0_14px_32px_rgba(15,23,42,0.06)]' : 'border-[#e5eaf3] shadow-[0_14px_32px_rgba(15,23,42,0.06)]'}`}>
          {isEditing && (
            <div className="bg-[#eff6ff] border border-[#bfdbfe] text-[#1d4ed8] rounded-[14px] p-[12px_14px] mb-[18px] text-[13px] leading-[1.6]">
              已进入编辑模式。可以编辑文字内容，也可以点击图表右上角“编辑图表”修改图表类型、指标、时间范围和数据口径；保存后会生成新的报告版本。
            </div>
          )}

          <div className="flex-1 min-w-0 space-y-8 print:w-full">
            {/* Header Title */}
            <div className="text-center mb-10 border-b border-gray-50 pb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
              <div className="text-gray-500 font-medium tracking-wide">企业全维度深度分析报告</div>
            </div>

            {/* PART 1: ENTERPRISE PORTRAIT */}
            <div id="portrait" className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 scroll-mt-24">
                <SectionTitle icon={Building2} title="一、企业画像" color="text-blue-600" />
                
                {/* 1.1 Basic Info */}
                <RegistrationCard data={company.registrationData} />

                {/* 1.2 Tags & Radar */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {/* Tags & Note */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 text-[14px]">
                                <Tag size={18} className="text-indigo-600" /> 企业画像标签
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {company.tags.map((tag, idx) => (
                                    <span key={idx} className="px-3 py-1.5 bg-white text-indigo-700 text-[12px] font-bold rounded-lg border border-indigo-100 shadow-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-yellow-50/50 border border-yellow-100 rounded-lg p-6 flex-1">
                            <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 text-[14px]">
                                <Edit2 size={18} className="text-yellow-600" /> 投资备注
                            </h3>
                            <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                                {company.notes || "暂无备注"}
                            </p>
                        </div>
                    </div>

                    {/* Radar & Score Cards */}
                    <div className="bg-white border border-[#edf2f7] rounded-xl p-8 flex flex-col shadow-sm">
                        <h3 className="font-bold text-[#1a202c] mb-6 flex items-center gap-2 text-base">
                            <Network size={20} className="text-blue-600" /> AI 多维评分
                        </h3>
                        <div className="flex-1 flex flex-col items-center">
                            <div className="text-[22px] font-bold text-blue-600 mb-4">加权总分：{company.analysis.totalScore}</div>
                            <div className="w-full h-80 mb-6">
                                {company.analysis && <AnalysisRadarChart analysis={company.analysis} />}
                            </div>
                            <div className="w-full grid grid-cols-5 gap-3 text-center">
                                {[
                                    {k: '技术', s: company.analysis.techScore, color: 'text-[#6366f1]'},
                                    {k: '潜力', s: company.analysis.potentialScore, color: 'text-[#2563eb]'},
                                    {k: '竞争力', s: company.analysis.competitivenessScore, color: 'text-[#ea580c]'},
                                    {k: '经营', s: company.analysis.operationScore, color: 'text-[#059669]'},
                                    {k: '声誉', s: company.analysis.reputationScore, color: 'text-[#9333ea]'},
                                ].map(item => (
                                    <div key={item.k} className="bg-[#f8faff] rounded-lg p-3 py-4">
                                        <div className="text-xs text-gray-500 mb-2 font-medium">{item.k}</div>
                                        <div className={`font-black ${item.color} text-[18px]`}>{item.s.toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PART 2: TECH ANALYSIS */}
            <div id="tech" className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 scroll-mt-24">
                <SectionTitle icon={Zap} title="二、技术分析" color="text-indigo-600" />
                <ScoreSummaryCard 
                    score={techData.score} 
                    reason={techData.reason} 
                    icon={Zap} 
                    colorClass="text-indigo-600" 
                    title="技术" 
                />
                <div className="-mt-6"> 
                    <CompanyReportView company={company} techData={techData} embedded={true} />
                </div>
            </div>

            {/* PART 3: POTENTIAL */}
            <div id="potential" className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 scroll-mt-24">
                <SectionTitle icon={TrendingUp} title="三、潜力分析" color="text-blue-600" />
                <ScoreSummaryCard 
                    score={potentialData.score.toFixed(2)} 
                    reason={potentialData.reason} 
                    icon={TrendingUp} 
                    colorClass="text-blue-600" 
                    title="潜力" 
                    references={potentialData.references}
                />

                <div className="space-y-8">
                    {/* Core Team */}
                    <div>
                        <div className="mb-4">
                            <div className="text-lg font-bold text-gray-800 flex items-center gap-3">
                                <div className="w-1 h-7 bg-blue-600"></div>核心团队
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {potentialData.team.map(member => (
                                <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 transition-all hover:shadow-md">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0">
                                            {member.avatar}
                                        </div>
                                        <div className="flex-1 flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-lg text-gray-800">{member.name}</h4>
                                                <div className="text-sm text-blue-600 font-medium">{member.position}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shareholders */}
                    <div>
                        <div className="mb-4">
                            <div className="text-lg font-bold text-gray-800 flex items-center gap-3">
                                <div className="w-1 h-7 bg-blue-600"></div>主要股东
                            </div>
                        </div>
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="w-full text-sm text-left table-fixed">
                                <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase">
                                    <tr>
                                        <th className="p-4 w-[60px] text-center">序号</th>
                                        <th className="p-4 w-[250px]">持股企业名/人名</th>
                                        <th className="p-4 w-[100px] text-right">持股比例</th>
                                        <th className="p-4 w-[120px] text-right">实缴出资金额</th>
                                        <th className="p-4 w-[120px] text-right">实缴出资时间</th>
                                        <th className="p-4 w-[120px] text-right">实缴出资方式</th>
                                        <th className="p-4 w-[150px] text-right">认缴出资金额</th>
                                        <th className="p-4 w-[120px] text-right">认缴出资时间</th>
                                        <th className="p-4 w-[120px] text-right">认缴出资方式</th>
                                        <th className="p-4 w-[120px] text-right">首次持股日期</th>
                                        <th className="p-4 w-[100px] text-right">股东类型</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {potentialData.shareholders.map((sh, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4 text-center text-gray-400">{i+1}</td>
                                            <td className="p-4 font-bold text-gray-800 truncate" title={sh.name}>{sh.name}</td>
                                            <td className="p-4 text-right text-blue-600 font-bold">{sh.ratio}</td>
                                            <td className="p-4 text-right text-gray-600">{sh.paid}</td>
                                            <td className="p-4 text-right text-gray-500">{sh.paidTime}</td>
                                            <td className="p-4 text-right text-gray-500">{sh.paidType}</td>
                                            <td className="p-4 text-right text-gray-800 font-medium">{sh.committed}</td>
                                            <td className="p-4 text-right text-gray-500">{sh.committedTime}</td>
                                            <td className="p-4 text-right text-gray-500">{sh.committedType}</td>
                                            <td className="p-4 text-right text-gray-500">{sh.firstDate}</td>
                                            <td className="p-4 text-right">
                                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[11px] font-bold">{sh.type}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center mt-3 px-1">
                            <span className="text-xs text-gray-400">第 1-10 条/总共 14 条</span>
                            <div className="flex gap-1">
                                <button className="p-1 px-2 border rounded bg-white text-gray-400 cursor-not-allowed">上一页</button>
                                <button className="p-1 px-2 border rounded bg-blue-50 text-blue-600 border-blue-200">1</button>
                                <button className="p-1 px-2 border rounded bg-white text-gray-600 hover:bg-gray-50">2</button>
                                <button className="p-1 px-2 border rounded bg-white text-gray-600 hover:bg-gray-50">下一页</button>
                            </div>
                        </div>
                    </div>

                    {/* Funding */}
                    <div>
                        <div className="mb-4">
                            <div className="text-lg font-bold text-gray-800 flex items-center gap-3">
                                <div className="w-1 h-7 bg-blue-600"></div>融资历程
                            </div>
                        </div>
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="w-full text-sm text-left table-fixed">
                                <thead className="bg-gray-50 text-gray-500 font-bold text-xs">
                                    <tr>
                                        <th className="p-4 w-[60px] text-center">序号</th>
                                        <th className="p-4">公司名称</th>
                                        <th className="p-4 w-[120px]">融资日期</th>
                                        <th className="p-4 w-[120px]">发布时间</th>
                                        <th className="p-4 w-[200px]">投资方名称</th>
                                        <th className="p-4 w-[120px]">融资金额</th>
                                        <th className="p-4 w-[200px]">新闻标题</th>
                                        <th className="p-4 w-[200px]">新闻链接</th>
                                        <th className="p-4 w-[100px]">融资轮次</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {potentialData.funding.map((f, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4 text-center text-gray-400">{i+1}</td>
                                            <td className="p-4 text-gray-800 truncate">浙江钠创新能源有限公司</td>
                                            <td className="p-4 text-gray-500 font-mono text-xs">{f.date}</td>
                                            <td className="p-4 text-gray-500 font-mono text-xs">{f.newsDate}</td>
                                            <td className="p-4 text-gray-700 text-xs truncate" title={f.investors}>{f.investors}</td>
                                            <td className="p-4 text-gray-900 font-bold">{f.amount}</td>
                                            <td className="p-4 text-xs text-gray-700 truncate" title={f.title}>{f.title}</td>
                                            <td className="p-4 text-xs">
                                                {f.link !== '-' ? (
                                                    <a href={f.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate inline-block w-full">
                                                        {f.link}
                                                    </a>
                                                ) : '-'}
                                            </td>
                                            <td className="p-4">
                                                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[11px] font-bold">{f.round}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* PART 4: COMPETITIVENESS */}
            <div id="competitiveness" className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 scroll-mt-24">
                <SectionTitle icon={Award} title="四、竞争力分析" color="text-orange-600" />
                <ScoreSummaryCard 
                    score={competitivenessData.score.toFixed(2)} 
                    reason={competitivenessData.reason} 
                    icon={Award} 
                    colorClass="text-orange-600" 
                    title="竞争力"
                    references={competitivenessData.references}
                />

                <div className="space-y-8">
                    {/* Enterprise Portrait Tags */}
                    <div>
                        <div className="mb-4">
                            <div className="text-lg font-bold text-gray-800 flex items-center gap-3">
                                <div className="w-1 h-7 bg-orange-600"></div>企业画像标签
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-6">
                            {competitivenessData.tags.map((tag, idx) => (
                                <span key={idx} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Standards */}
                    <div>
                        <div className="mb-4">
                            <div className="text-lg font-bold text-gray-800 flex items-center gap-3">
                                <div className="w-1 h-7 bg-orange-600"></div>标准制订参与情况
                            </div>
                        </div>
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="w-full text-sm text-left table-fixed">
                                <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase">
                                    <tr>
                                        <th className="p-4 w-[60px] text-center">序号</th>
                                        <th className="p-4 w-[200px]">标准名称</th>
                                        <th className="p-4 w-[180px]">标准代码</th>
                                        <th className="p-4 w-[100px]">标准类别</th>
                                        <th className="p-4 w-[100px]">标准状态</th>
                                        <th className="p-4 w-[120px]">发布日期</th>
                                        <th className="p-4 w-[120px]">实施日期</th>
                                        <th className="p-4 w-[100px]">废除日期</th>
                                        <th className="p-4 w-[100px]">中国分类号</th>
                                        <th className="p-4 w-[180px]">国际分类号</th>
                                        <th className="p-4 w-[150px]">国民经济分类</th>
                                        <th className="p-4 w-[80px]">包含专利</th>
                                        <th className="p-4 w-[300px]">起草单位</th>
                                        <th className="p-4 w-[400px]">主要技术内容</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {competitivenessData.standards.map((s, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors text-gray-700">
                                            <td className="p-4 text-center text-gray-400">{i+1}</td>
                                            <td className="p-4 font-bold text-gray-900 truncate" title={s.name}>{s.name}</td>
                                            <td className="p-4 text-xs font-mono truncate" title={s.code}>{s.code}</td>
                                            <td className="p-4 text-xs text-gray-500">{s.type}</td>
                                            <td className="p-4"><span className="bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded text-[11px] font-bold">{s.status}</span></td>
                                            <td className="p-4 text-gray-500 text-xs font-mono">{s.publishDate}</td>
                                            <td className="p-4 text-gray-500 text-xs font-mono">{s.implementDate}</td>
                                            <td className="p-4 text-gray-400 text-center">{s.abolishDate}</td>
                                            <td className="p-4 text-gray-500 text-xs">{s.cnClass}</td>
                                            <td className="p-4 text-gray-500 text-xs truncate" title={s.intlClass}>{s.intlClass}</td>
                                            <td className="p-4 text-gray-500 text-xs truncate" title={s.economyClass}>{s.economyClass}</td>
                                            <td className="p-4 text-center"><span className={s.hasPatent === '是' ? 'text-blue-600 font-bold' : 'text-gray-400'}>{s.hasPatent}</span></td>
                                            <td className="p-4 text-xs text-gray-600 truncate" title={s.draftUnit}>{s.draftUnit}</td>
                                            <td className="p-4 text-xs text-gray-500 truncate" title={s.content}>{s.content}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center mt-3 px-1">
                            <span className="text-xs text-gray-400">第 1-8 条/总共 8 条</span>
                        </div>
                    </div>

                    {/* Investments */}
                    <div>
                        <div className="mb-4">
                            <div className="text-lg font-bold text-gray-800 flex items-center gap-3">
                                <div className="w-1 h-7 bg-orange-600"></div>对外投资情况
                            </div>
                        </div>
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="w-full text-sm text-left table-fixed">
                                <thead className="bg-gray-50 text-gray-500 font-bold text-xs">
                                    <tr>
                                        <th className="p-4 w-[60px] text-center">序号</th>
                                        <th className="p-4 w-[250px]">投资企业名称</th>
                                        <th className="p-4 w-[100px] text-right">投资金额</th>
                                        <th className="p-4 w-[100px] text-right">持股比例</th>
                                        <th className="p-4 w-[120px] text-center">成立时间</th>
                                        <th className="p-4 w-[400px]">经营范围</th>
                                        <th className="p-4 w-[120px]">法定代表人</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {competitivenessData.investments.map((inv, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors text-gray-700">
                                            <td className="p-4 text-center text-gray-400">{i+1}</td>
                                            <td className="p-4 font-bold text-gray-900 truncate" title={inv.name}>{inv.name}</td>
                                            <td className="p-4 text-right font-mono text-gray-800">{inv.amount}</td>
                                            <td className="p-4 text-right font-bold text-orange-600">{inv.ratio}</td>
                                            <td className="p-4 text-center text-gray-500 text-xs font-mono">{inv.date}</td>
                                            <td className="p-4 text-xs text-gray-500 line-clamp-3 overflow-hidden" title={inv.scope}>{inv.scope}</td>
                                            <td className="p-4 text-center text-gray-800">{inv.legal}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center mt-3 px-1">
                            <span className="text-xs text-gray-400">第 1-3 条/总共 3 条</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* PART 5: OPERATION */}
            <div id="operation" className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 scroll-mt-24">
                <SectionTitle icon={Briefcase} title="五、经营分析" color="text-emerald-600" />
                <ScoreSummaryCard 
                    score={operationData.score.toFixed(2)} 
                    reason={operationData.reason} 
                    icon={Briefcase} 
                    colorClass="text-emerald-600" 
                    title="经营" 
                    references={operationData.references}
                />

                <div className="space-y-8">
                    {/* Honors */}
                    <div>
                        <div className="mb-4">
                            <div className="text-lg font-bold text-gray-800 flex items-center gap-3">
                                <div className="w-1 h-7 bg-emerald-600"></div>企业荣誉
                            </div>
                        </div>
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="w-full text-sm text-left table-fixed">
                                <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase">
                                    <tr>
                                        <th className="p-4 w-[60px] text-center">序号</th>
                                        <th className="p-4 w-[200px]">荣誉名称</th>
                                        <th className="p-4 w-[100px]">荣誉状态</th>
                                        <th className="p-4 w-[120px]">荣誉类型</th>
                                        <th className="p-4 w-[100px]">荣誉等级</th>
                                        <th className="p-4 w-[100px]">发布年份</th>
                                        <th className="p-4 w-[120px]">发布日期</th>
                                        <th className="p-4 w-[200px]">发布机构</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {operationData.honors.map((h, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors text-gray-700">
                                            <td className="p-4 text-center text-gray-400">{i+1}</td>
                                            <td className="p-4 font-bold text-gray-900 truncate" title={h.name}>{h.name}</td>
                                            <td className="p-4 text-emerald-600 font-bold">{h.status}</td>
                                            <td className="p-4 text-gray-500">{h.type}</td>
                                            <td className="p-4"><span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded text-[11px] font-bold">{h.level}</span></td>
                                            <td className="p-4 text-gray-500">{h.year}</td>
                                            <td className="p-4 text-gray-500 font-mono text-xs">{h.date}</td>
                                            <td className="p-4 text-gray-500 truncate" title={h.agency}>{h.agency}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center mt-3 px-1">
                            <span className="text-xs text-gray-400">第 1-6 条/总共 6 条</span>
                        </div>
                    </div>

                    {/* Company Business */}
                    <div>
                        <div className="mb-4">
                            <div className="text-lg font-bold text-gray-800 flex items-center gap-3">
                                <div className="w-1 h-7 bg-emerald-600"></div>公司业务
                            </div>
                        </div>
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="w-full text-sm text-left table-fixed">
                                <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase">
                                    <tr>
                                        <th className="p-4 w-[60px] text-center">序号</th>
                                        <th className="p-4 w-[200px]">公司名称</th>
                                        <th className="p-4 w-[100px]">融资轮次</th>
                                        <th className="p-4 w-[120px]">行业</th>
                                        <th className="p-4 w-[150px]">产品名称</th>
                                        <th className="p-4 w-[120px]">成立日期</th>
                                        <th className="p-4">业务描述</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {operationData.business.map((b, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors text-gray-700">
                                            <td className="p-4 text-center text-gray-400">{i+1}</td>
                                            <td className="p-4 font-bold text-gray-900 truncate" title={b.name}>{b.name}</td>
                                            <td className="p-4 text-blue-600 font-bold">{b.round}</td>
                                            <td className="p-4 text-gray-500">{b.industry}</td>
                                            <td className="p-4 text-gray-800">{b.product}</td>
                                            <td className="p-4 text-gray-500 font-mono text-xs">{b.date}</td>
                                            <td className="p-4 text-gray-500 truncate" title={b.desc}>{b.desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Enterprise Bidding */}
                    <div>
                        <div className="mb-4">
                            <div className="text-lg font-bold text-gray-800 flex items-center gap-3">
                                <div className="w-1 h-7 bg-emerald-600"></div>企业招标
                            </div>
                        </div>
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="w-full text-sm text-left table-fixed">
                                <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase">
                                    <tr>
                                        <th className="p-4 w-[60px] text-center">序号</th>
                                        <th className="p-4 w-[400px]">项目名称</th>
                                        <th className="p-4 w-[120px]">发布时间</th>
                                        <th className="p-4 w-[100px]">信息类型</th>
                                        <th className="p-4 w-[100px]">省份地区</th>
                                        <th className="p-4 w-[250px]">采购单位</th>
                                        <th className="p-4 w-[250px]">中标单位</th>
                                        <th className="p-4 w-[120px] text-right">中标金额</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 font-medium">
                                    {operationData.bidding.map((t, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4 text-center text-gray-400">{i+1}</td>
                                            <td className="p-4 font-bold text-gray-800 truncate" title={t.name}>{t.name}</td>
                                            <td className="p-4 text-gray-500 font-mono text-xs">{t.date}</td>
                                            <td className="p-4 text-gray-600">{t.type}</td>
                                            <td className="p-4 text-gray-500">{t.region}</td>
                                            <td className="p-4 text-gray-600 truncate" title={t.unit}>{t.unit}</td>
                                            <td className="p-4 text-gray-600 truncate" title={t.winner}>{t.winner}</td>
                                            <td className="p-4 text-right font-black text-gray-900">{t.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center mt-3 px-1">
                            <span className="text-xs text-gray-400">第 1-10 条/总共 20 条</span>
                            <div className="flex gap-1">
                                <button className="p-1 px-2 border rounded bg-white text-gray-400 cursor-not-allowed text-xs">上一页</button>
                                <button className="p-1 px-2 border rounded bg-blue-50 text-blue-600 border-blue-200 text-xs">1</button>
                                <button className="p-1 px-2 border rounded bg-white text-gray-600 hover:bg-gray-50 text-xs">2</button>
                                <button className="p-1 px-2 border rounded bg-white text-gray-600 hover:bg-gray-50 text-xs">下一页</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PART 6: REPUTATION */}
            <div id="reputation" className="bg-white rounded-xl shadow-sm border border-gray-200 print:border-0 print:shadow-none p-8 scroll-mt-24">
                <SectionTitle icon={MessageSquare} title="六、声誉分析" color="text-purple-600" />

                <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-start gap-6 relative overflow-hidden shadow-sm mb-6">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-purple-600">
                        <MessageSquare size={100} />
                    </div>
                    <div className="flex flex-col items-center justify-center shrink-0 min-w-[120px] bg-white rounded-lg p-4 border border-gray-100 shadow-sm z-10">
                        <div className="text-4xl font-bold text-purple-600">{reputationData.score.toFixed(2)}</div>
                        <div className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-wider">声誉评分</div>
                    </div>
                    <div className="flex-1 z-10">
                        <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-purple-600">
                            <Info size={18} /> AI综合评价
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed text-justify">{reputationData.comprehensiveEvaluation}</p>
                        
                        <h4 className="font-bold text-lg my-3 flex items-center gap-2 text-purple-600">
                            <CircleEllipsis size={18} /> 总体概述
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed text-justify">{reputationData.overallOverview}</p>
                        
                        <h4 className="font-bold text-lg my-3 flex items-center gap-2 text-purple-600">
                            <CircleCheck size={18} /> 正面摘要
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed text-justify">{reputationData.positiveSummary}</p>
                        
                        <h4 className="font-bold text-lg my-3 flex items-center gap-2 text-purple-600">
                            <CircleX size={18} /> 负面摘要
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed text-justify">{reputationData.negativeSummary}</p>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="text-lg font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-1 h-7 bg-purple-600"></div>最新舆情
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {reputationData.news.map(item => (
                            <div key={item.id} className="p-5 hover:bg-gray-50 transition-colors">
                                <div className="flex items-end gap-3 mb-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold shrink-0 mt-0.5 ${
                                        item.polarity === '积极' ? 'bg-green-100 text-green-700' :
                                        item.polarity === '消极' ? 'bg-red-100 text-red-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {item.polarity}
                                    </span>
                                    <h4 className="print:hidden text-base font-bold text-gray-800 leading-snug hover:text-blue-600 cursor-pointer">{item.title}</h4>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hidden print:block text-base font-bold text-gray-800 leading-snug print:text-blue-600! cursor-pointer">{item.title}</a>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500 ml-14">
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} className="text-gray-400" />
                                        {item.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="text-gray-400">来源:</span> {item.source}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </article>

        {/* Right Aside */}
        <aside className="w-full xl:w-[290px] grid gap-[14px] xl:sticky xl:top-[74px] shrink-0">
          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[20px] xl:hidden">
            <h2 className="text-[17px] font-black m-0 mb-3">报告目录</h2>
            <div className="grid gap-[8px]">
              {[
                { n: '1. 企业画像', id: 'portrait' },
                { n: '2. 技术分析', id: 'tech' },
                { n: '3. 潜力分析', id: 'potential' },
                { n: '4. 竞争力分析', id: 'competitiveness' },
                { n: '5. 经营分析', id: 'operation' },
                { n: '6. 声誉分析', id: 'reputation' },
              ].map((item, idx) => (
                <a 
                  key={idx}
                  href={`#${item.id}`}
                  className={`p-[10px_11px] rounded-[12px] text-[13px] flex justify-between gap-[10px] cursor-pointer transition-colors border ${activeSection === item.id ? 'bg-[#eaf1ff] border-[#bfdbfe] text-[#2563eb] font-black' : 'text-[#334155] border-transparent hover:bg-[#eaf1ff] hover:border-[#bfdbfe] hover:text-[#2563eb] hover:font-black'}`}
                >
                  {item.n}
                </a>
              ))}
            </div>
          </section>

          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[20px]">
            <h2 className="text-[17px] font-black m-0 mb-3">报告操作</h2>
            <div className="grid gap-[10px]">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="h-[42px] px-[16px] rounded-[13px] font-extrabold text-white bg-[#2563eb] border-0 cursor-pointer shadow-[0_10px_18px_rgba(37,99,235,0.18)] hover:bg-[#1d4ed8] w-full"
              >
                {isEditing ? '退出编辑模式' : '进入编辑模式'}
              </button>
              <button className="h-[42px] px-[16px] rounded-[13px] font-extrabold text-[#334155] bg-white border border-[#dbe4f1] cursor-pointer hover:bg-gray-50 w-full">保存新版本</button>
              <button className="h-[42px] px-[16px] rounded-[13px] font-extrabold text-[#334155] bg-white border border-[#dbe4f1] cursor-pointer hover:bg-gray-50 w-full">导出 PDF</button>
              <button className="h-[42px] px-[16px] rounded-[13px] font-extrabold text-[#334155] bg-white border border-[#dbe4f1] cursor-pointer hover:bg-gray-50 w-full">导出 Word</button>
              <button className="h-[42px] px-[16px] rounded-[13px] font-extrabold text-white bg-[#16a34a] border-0 cursor-pointer shadow-[0_10px_18px_rgba(22,163,74,0.16)] hover:bg-green-700 w-full">同步到标的池</button>
            </div>
          </section>

        </aside>
      </section>
      </div>
    </div>
  );
}
