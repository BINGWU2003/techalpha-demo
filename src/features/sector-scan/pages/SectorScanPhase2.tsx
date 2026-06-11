import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function SectorScanPhase2({ onBack, onNext }: { onBack?: () => void; onNext?: () => void }) {
  return (
    <div className="max-w-[1160px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
      <div className="text-[13px] text-[#64748b] mb-[16px]">
        工作台 / 看赛道 / <b className="text-[#334155] font-bold">阶段二：产业扫描</b>
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
              <span className="text-[12px] font-black text-[#2563eb] bg-[#eaf1ff] rounded-full px-[10px] py-[7px] inline-flex">Track Scan · 阶段二</span>
            </div>
            <h1 className="text-[26px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">产业线索扫描</h1>
            <p className="mt-[8px] text-[#64748b] text-[14px] leading-[1.65]">围绕钠电池正极材料方向，系统扫描技术、专利、政策、资本和企业线索，形成下一步机会判断的证据基础。</p>
            <div className="flex flex-wrap gap-[8px] mt-[12px]">
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">技术路线 3 条</span>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">企业线索 436 家</span>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff7e8] text-[#d97706]">政策/新闻 86 条</span>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">融资动态 18 条</span>
            </div>
          </section>

          <section className="mt-[18px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px]">
              <div className="border border-[#e5eaf3] bg-[#f8fafc] rounded-[14px] p-[12px]">
                <span className="block text-[12px] text-[#64748b] mb-[4px]">相关专利</span>
                <strong className="text-[20px] font-bold text-[#172033]">850</strong>
              </div>
              <div className="border border-[#e5eaf3] bg-[#f8fafc] rounded-[14px] p-[12px]">
                <span className="block text-[12px] text-[#64748b] mb-[4px]">近三年新增</span>
                <strong className="text-[20px] font-bold text-[#16a34a]">424</strong>
              </div>
              <div className="border border-[#e5eaf3] bg-[#f8fafc] rounded-[14px] p-[12px]">
                <span className="block text-[12px] text-[#64748b] mb-[4px]">高相关企业</span>
                <strong className="text-[20px] font-bold text-[#2563eb]">42</strong>
              </div>
              <div className="border border-[#e5eaf3] bg-[#f8fafc] rounded-[14px] p-[12px]">
                <span className="block text-[12px] text-[#64748b] mb-[4px]">资本事件</span>
                <strong className="text-[20px] font-bold text-[#8b5cf6]">18</strong>
              </div>
            </div>
          </section>

          <section className="mt-[18px] grid grid-cols-1 md:grid-cols-2 gap-[14px]">
            <div className="border border-[#e5eaf3] rounded-[16px] bg-white p-[15px]">
              <div className="text-[14px] font-black text-[#172033]">专利与企业线索趋势</div>
              <div className="text-[12px] text-[#64748b] mt-[4px]">用于判断技术和企业供给是否足够活跃</div>
              <div className="h-[170px] pt-[10px] px-[6px] pb-0 border-b border-dashed border-[#dbe4f1] flex items-end gap-[12px] mt-[12px]">
                <div className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full max-w-[38px] bg-[#93c5fd] rounded-t-[8px] relative h-[38%]"><span className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[11px] text-[#334155] font-extrabold">62</span></div>
                  <div className="mt-[9px] text-[11px] text-[#64748b] text-center">2021</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full max-w-[38px] bg-[#3b82f6] rounded-t-[8px] relative h-[52%]"><span className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[11px] text-[#334155] font-extrabold">91</span></div>
                  <div className="mt-[9px] text-[11px] text-[#64748b] text-center">2022</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full max-w-[38px] bg-[#86efac] rounded-t-[8px] relative h-[74%]"><span className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[11px] text-[#334155] font-extrabold">142</span></div>
                  <div className="mt-[9px] text-[11px] text-[#64748b] text-center">2023</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full max-w-[38px] bg-[#fdba74] rounded-t-[8px] relative h-[92%]"><span className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[11px] text-[#334155] font-extrabold">188</span></div>
                  <div className="mt-[9px] text-[11px] text-[#64748b] text-center">2024</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full max-w-[38px] bg-[#3b82f6] rounded-t-[8px] relative h-[86%]"><span className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[11px] text-[#334155] font-extrabold">171</span></div>
                  <div className="mt-[9px] text-[11px] text-[#64748b] text-center">2025</div>
                </div>
              </div>
            </div>

            <div className="border border-[#e5eaf3] rounded-[16px] bg-white p-[15px]">
              <div className="text-[14px] font-black text-[#172033]">技术路线热度分布</div>
              <div className="text-[12px] text-[#64748b] mt-[4px]">不同路线的技术成熟度和商业化进展不同</div>
              <div className="h-[170px] pt-[10px] px-[6px] pb-0 border-b border-dashed border-[#dbe4f1] flex items-end gap-[12px] mt-[12px]">
                <div className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full max-w-[38px] bg-[#3b82f6] rounded-t-[8px] relative h-[88%]"><span className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[11px] text-[#334155] font-extrabold">高</span></div>
                  <div className="mt-[9px] text-[11px] text-[#64748b] text-center">层状氧化物</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full max-w-[38px] bg-[#86efac] rounded-t-[8px] relative h-[68%]"><span className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[11px] text-[#334155] font-extrabold">中</span></div>
                  <div className="mt-[9px] text-[11px] text-[#64748b] text-center">聚阴离子</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full max-w-[38px] bg-[#fdba74] rounded-t-[8px] relative h-[46%]"><span className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[11px] text-[#334155] font-extrabold">低</span></div>
                  <div className="mt-[9px] text-[11px] text-[#64748b] text-center">普鲁士蓝</div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px] mt-[18px]">
            <div className="flex justify-between items-end mb-[12px]">
              <h2 className="text-[17px] font-black m-0 mb-[12px]">核心线索</h2>
              <span className="text-[13px] text-[#2563eb] font-extrabold cursor-pointer">查看全部线索</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">线索类型</th>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">发现</th>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">系统判断</th>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">后续价值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">技术</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">层状氧化物路线专利与企业线索最密集</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle"><span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">优先关注</span></td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">适合进入挖企业任务</td>
                  </tr>
                  <tr>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">产业化</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">储能场景对低成本材料需求增强</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle"><span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">需求驱动</span></td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">需要验证客户导入</td>
                  </tr>
                  <tr>
                    <td className="py-[14px] border-0 align-middle">资本</td>
                    <td className="py-[14px] border-0 align-middle">早期企业融资活跃，但分化明显</td>
                    <td className="py-[14px] border-0 align-middle"><span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff7e8] text-[#d97706]">谨慎筛选</span></td>
                    <td className="py-[14px] border-0 align-middle">适合寻找技术壁垒标的</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex flex-col md:flex-row gap-[10px] mt-[18px] justify-end">
              <button className="h-[42px] px-[16px] rounded-[13px] font-extrabold border border-[#dbe4f1] bg-white text-[#334155] cursor-pointer hover:bg-gray-50">补充扫描</button>
              <button onClick={onNext} className="h-[42px] px-[16px] rounded-[13px] font-extrabold text-[#ffffff] bg-[#2563eb] border-0 cursor-pointer shadow-[0_10px_18px_rgba(37,99,235,0.18)] hover:bg-[#1d4ed8]">生成机会判断</button>
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
            <div className="w-[22px] h-[22px] rounded-full bg-[#2563eb] border-[4px] border-white shadow-[0_0_0_4px_#eaf1ff] z-10"></div>
            <div>
              <strong className="block text-[13px] text-[#172033]">产业扫描</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">扫描技术、政策、资本和企业线索</span>
            </div>
          </div>

          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px] before:content-[''] before:absolute before:left-[10px] before:top-[24px] before:w-[2px] before:h-[calc(100%-18px)] before:bg-[#dbe4f1]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#e2e8f0] border-[4px] border-white shadow-[0_0_0_1px_#dbe4f1] z-10"></div>
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
