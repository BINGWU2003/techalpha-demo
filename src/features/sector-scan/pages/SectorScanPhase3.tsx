import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function SectorScanPhase3({ onBack, onNext }: { onBack?: () => void; onNext?: () => void }) {
  return (
    <div className="max-w-[1160px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
      <div className="text-[13px] text-[#64748b] mb-[16px]">
        工作台 / 看赛道 / <b className="text-[#334155] font-bold">阶段三：机会判断</b>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_236px] gap-[18px] items-start">
        <main>
          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex items-center gap-3 mb-[12px]">
              {onBack && (
                <button 
                  onClick={onBack}
                  className="p-[6px] rounded-[8px] bg-white border border-[#dbe4f1] text-[#334155] cursor-pointer hover:bg-gray-50 flex items-center justify-center hover:border-[#2563eb] hover:text-[#2563eb] transition-all"
                  title="返回"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <span className="text-[12px] font-black text-[#2563eb] bg-[#eaf1ff] rounded-full px-[10px] py-[7px] inline-flex">Track Scan · 阶段三</span>
            </div>
            <h1 className="text-[26px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">赛道机会判断</h1>
            <p className="mt-[8px] text-[#64748b] text-[14px] leading-[1.65]">系统将产业扫描结果转化为可执行的机会地图：哪些细分方向优先看、为什么看、下一步应该挖哪些企业。</p>
            <div className="flex flex-wrap gap-[8px] mt-[12px]">
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">建议继续看</span>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">优先方向 2 个</span>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff7e8] text-[#d97706]">风险点 4 个</span>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">可衔接挖企业</span>
            </div>
          </section>

          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px] mt-[18px]">
            <div className="flex justify-between items-end mb-[12px]">
              <h2 className="text-[17px] font-black m-0">机会地图</h2>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">按优先级排序</span>
            </div>
            <div className="overflow-x-auto mt-[12px]">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">细分方向</th>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">机会判断</th>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">核心理由</th>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">风险</th>
                    <th className="text-right text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">下一步</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">
                      <div className="font-black text-[#172033]">层状氧化物正极材料</div>
                      <div className="text-[12px] text-[#64748b] mt-[4px]">产业化路径更清晰</div>
                    </td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle"><span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">优先看</span></td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">专利密集、企业线索多、储能需求驱动</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">成本和循环寿命仍需验证</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle text-right">
                      <button className="border border-[#2563eb] bg-[#2563eb] rounded-[10px] px-[10px] py-[8px] text-[12px] font-extrabold text-white cursor-pointer hover:bg-[#1d4ed8]">挖企业</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">
                      <div className="font-black text-[#172033]">聚阴离子正极材料</div>
                      <div className="text-[12px] text-[#64748b] mt-[4px]">安全性和循环寿命优势</div>
                    </td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle"><span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">重点跟踪</span></td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">技术壁垒较强，适合寻找研发型标的</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">产业化速度需验证</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle text-right">
                      <button className="border border-[#2563eb] bg-[#2563eb] rounded-[10px] px-[10px] py-[8px] text-[12px] font-extrabold text-white cursor-pointer hover:bg-[#1d4ed8]">挖企业</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-[14px] border-0 align-middle">
                      <div className="font-black text-[#172033]">普鲁士蓝类材料</div>
                      <div className="text-[12px] text-[#64748b] mt-[4px]">成本优势明显</div>
                    </td>
                    <td className="py-[14px] border-0 align-middle"><span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff7e8] text-[#d97706]">谨慎观察</span></td>
                    <td className="py-[14px] border-0 align-middle">低成本潜力，但商业化进展不稳定</td>
                    <td className="py-[14px] border-0 align-middle">一致性与量产问题</td>
                    <td className="py-[14px] border-0 align-middle text-right">
                      <button className="border border-[#dbe4f1] bg-white rounded-[10px] px-[10px] py-[8px] text-[12px] font-extrabold text-[#334155] cursor-pointer hover:bg-gray-50">持续跟踪</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-[18px] grid grid-cols-1 md:grid-cols-2 gap-[14px]">
            <div className="border border-[#e5eaf3] rounded-[16px] bg-white p-[15px]">
              <div className="text-[14px] font-black text-[#172033]">方向优先级矩阵</div>
              <div className="text-[12px] text-[#64748b] mt-[4px] mb-[12px]">横轴：产业化成熟度；纵轴：技术壁垒</div>
              <svg viewBox="0 0 420 250" width="100%" height="250">
                <line x1="56" y1="205" x2="390" y2="205" stroke="#cbd5e1" />
                <line x1="56" y1="205" x2="56" y2="30" stroke="#cbd5e1" />
                <line x1="56" y1="118" x2="390" y2="118" stroke="#e5e7eb" strokeDasharray="5 5" />
                <line x1="223" y1="205" x2="223" y2="30" stroke="#e5e7eb" strokeDasharray="5 5" />
                <circle cx="285" cy="78" r="18" fill="#3b82f6" opacity=".85" />
                <text x="285" y="54" textAnchor="middle" fontSize="12" fill="#334155">层状氧化物</text>
                <circle cx="205" cy="68" r="15" fill="#22c55e" opacity=".85" />
                <text x="205" y="44" textAnchor="middle" fontSize="12" fill="#334155">聚阴离子</text>
                <circle cx="170" cy="145" r="14" fill="#f59e0b" opacity=".85" />
                <text x="170" y="172" textAnchor="middle" fontSize="12" fill="#334155">普鲁士蓝</text>
                <text x="223" y="236" textAnchor="middle" fontSize="12" fill="#64748b">产业化成熟度</text>
                <text x="18" y="122" textAnchor="middle" fontSize="12" fill="#64748b" transform="rotate(-90 18 122)">技术壁垒</text>
              </svg>
            </div>

            <div className="border border-[#e5eaf3] rounded-[16px] bg-white p-[15px]">
              <div className="text-[14px] font-black text-[#172033]">建议动作分布</div>
              <div className="text-[12px] text-[#64748b] mt-[4px]">将赛道判断转化为后续任务</div>
              <div className="h-[170px] pt-[10px] px-[6px] pb-0 border-b border-dashed border-[#dbe4f1] flex items-end gap-[12px] mt-[12px]">
                <div className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full max-w-[38px] bg-[#3b82f6] rounded-t-[8px] relative h-[88%]"><span className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[11px] text-[#334155] font-extrabold">2</span></div>
                  <div className="mt-[9px] text-[11px] text-[#64748b] text-center">挖企业</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full max-w-[38px] bg-[#86efac] rounded-t-[8px] relative h-[58%]"><span className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[11px] text-[#334155] font-extrabold">1</span></div>
                  <div className="mt-[9px] text-[11px] text-[#64748b] text-center">跟踪</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full max-w-[38px] bg-[#fdba74] rounded-t-[8px] relative h-[35%]"><span className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[11px] text-[#334155] font-extrabold">1</span></div>
                  <div className="mt-[9px] text-[11px] text-[#64748b] text-center">补充验证</div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px] mt-[18px]">
            <h2 className="text-[17px] font-black m-0 mb-[12px]">AI 结论</h2>
            <p className="text-[14px] text-[#64748b] leading-[1.65] m-0">钠电池正极材料方向具备继续关注价值，但不同技术路线的投资逻辑差异明显。短期更适合围绕层状氧化物方向开展企业发现，同时对聚阴离子方向建立重点跟踪。普鲁士蓝方向可保留观察，但不建议作为当前主线。</p>
            <div className="flex flex-col md:flex-row gap-[10px] mt-[18px] justify-end">
              <button className="h-[42px] px-[16px] rounded-[13px] font-extrabold border border-[#dbe4f1] bg-white text-[#334155] cursor-pointer hover:bg-gray-50">保存赛道判断</button>
              <button onClick={onNext} className="h-[42px] px-[16px] rounded-[13px] font-extrabold text-[#ffffff] bg-[#2563eb] border-0 cursor-pointer shadow-[0_10px_18px_rgba(37,99,235,0.18)] hover:bg-[#1d4ed8]">进入任务衔接</button>
            </div>
          </section>
        </main>

        <aside className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[18px] lg:sticky lg:top-[74px]">
          <h3 className="m-0 mb-[14px] text-[15px] font-bold">看赛道阶段</h3>
          
          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px] before:content-[''] before:absolute before:left-[10px] before:top-[24px] before:w-[2px] before:h-[calc(100%-18px)] before:bg-[#dbe4f1]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#16a34a] border-[4px] border-white shadow-[0_0_0_1px_#bbf7d0] z-10"></div>
            <div>
              <strong className="block text-[13px] text-[#172033]">明确范围</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">定义赛道、区域、时间和投资偏好</span>
            </div>
          </div>

          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px] before:content-[''] before:absolute before:left-[10px] before:top-[24px] before:w-[2px] before:h-[calc(100%-18px)] before:bg-[#dbe4f1]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#16a34a] border-[4px] border-white shadow-[0_0_0_1px_#bbf7d0] z-10"></div>
            <div>
              <strong className="block text-[13px] text-[#172033]">产业扫描</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">扫描技术、政策、资本和企业线索</span>
            </div>
          </div>

          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px] before:content-[''] before:absolute before:left-[10px] before:top-[24px] before:w-[2px] before:h-[calc(100%-18px)] before:bg-[#dbe4f1]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#2563eb] border-[4px] border-white shadow-[0_0_0_4px_#eaf1ff] z-10"></div>
            <div>
              <strong className="block text-[13px] text-[#172033]">机会判断</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">形成细分方向优先级和投资假设</span>
            </div>
          </div>

          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#e2e8f0] border-[4px] border-white shadow-[0_0_0_1px_#dbe4f1] z-10"></div>
            <div>
              <strong className="block text-[13px] text-[#172033]">任务衔接</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">进入挖企业、出报告或持续跟踪</span>
            </div>
          </div>

          <div className="bg-[#f8fafc] border border-[#e5eaf3] rounded-[14px] p-[13px] mt-[14px]">
            <strong className="text-[13px] text-[#172033]">任务定位</strong>
            <p className="text-[12px] mt-[5px] text-[#64748b] leading-[1.65] m-0">看赛道不是完整行业报告，而是为后续挖企业和出报告提供方向判断。</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
