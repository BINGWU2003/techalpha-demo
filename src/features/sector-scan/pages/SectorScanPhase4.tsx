import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function SectorScanPhase4({ onBack, onNext }: { onBack?: () => void; onNext?: () => void }) {
  return (
    <div className="max-w-[1160px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
      <div className="text-[13px] text-[#64748b] mb-[16px]">
        工作台 / 看赛道 / <b className="text-[#334155] font-bold">阶段四：任务衔接</b>
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
              <span className="text-[12px] font-black text-[#2563eb] bg-[#eaf1ff] rounded-full px-[10px] py-[7px] inline-flex">Track Scan · 阶段四</span>
            </div>
            <h1 className="text-[26px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">从赛道判断进入下一步任务</h1>
            <p className="mt-[8px] text-[#64748b] text-[14px] leading-[1.65]">看赛道的结果不是停留在报告里，而是衔接到后续动作：挖企业、生成赛道简报、持续跟踪，或保存为赛道主题。</p>
            <div className="flex flex-wrap gap-[8px] mt-[12px]">
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">已形成机会判断</span>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">可进入挖企业</span>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">可生成赛道简报</span>
            </div>
          </section>

          <section className="mt-[18px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px]">
              <div className="border border-[#2563eb] bg-[#f8fbff] rounded-[16px] p-[15px] cursor-pointer">
                <strong className="text-[14px] font-bold text-[#172033]">挖企业</strong>
                <p className="text-[12px] mt-[7px] text-[#64748b]">基于“层状氧化物正极材料”方向直接进入企业发现任务。</p>
                <div className="flex flex-wrap gap-[8px] mt-[12px]">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">推荐下一步</span>
                </div>
              </div>
              <div className="border border-[#e5eaf3] bg-white rounded-[16px] p-[15px] cursor-pointer">
                <strong className="text-[14px] font-bold text-[#172033]">生成赛道简报</strong>
                <p className="text-[12px] mt-[7px] text-[#64748b]">将本次赛道扫描结果沉淀为可导出的简报或内部汇报材料。</p>
                <div className="flex flex-wrap gap-[8px] mt-[12px]">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">报告库</span>
                </div>
              </div>
              <div className="border border-[#e5eaf3] bg-white rounded-[16px] p-[15px] cursor-pointer">
                <strong className="text-[14px] font-bold text-[#172033]">开启跟踪</strong>
                <p className="text-[12px] mt-[7px] text-[#64748b]">持续跟踪政策、融资、专利、新闻和优质企业动态。</p>
                <div className="flex flex-wrap gap-[8px] mt-[12px]">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">跟踪预警</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px] mt-[18px]">
            <div className="flex justify-between items-end mb-[12px]">
              <h2 className="text-[17px] font-black m-0">推荐后续任务</h2>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">按价值优先级</span>
            </div>
            
            <div className="overflow-x-auto mt-[12px]">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">任务</th>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">输入</th>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">输出资产</th>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">预计消耗</th>
                    <th className="text-right text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">
                      <div className="font-black text-[#172033]">挖掘层状氧化物正极材料企业</div>
                      <div className="text-[12px] text-[#64748b] mt-[4px]">来自机会地图第一优先级</div>
                    </td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">层状氧化物正极材料</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">任务结果池 / 企业库 / 标的池</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">1 次企业挖掘额度</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle text-right">
                      <button onClick={onNext} className="border border-[#2563eb] bg-[#2563eb] rounded-[10px] px-[10px] py-[8px] text-[12px] font-extrabold text-white cursor-pointer hover:bg-[#1d4ed8]">创建任务</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">
                      <div className="font-black text-[#172033]">生成钠电正极材料赛道简报</div>
                      <div className="text-[12px] text-[#64748b] mt-[4px]">适合内部汇报或客户沟通</div>
                    </td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">本次赛道扫描结果</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">报告库</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">1 个报告额度</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle text-right">
                      <button className="border border-[#dbe4f1] bg-white rounded-[10px] px-[10px] py-[8px] text-[12px] font-extrabold text-[#334155] cursor-pointer hover:bg-gray-50">生成简报</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-[14px] border-0 align-middle">
                      <div className="font-black text-[#172033]">跟踪聚阴离子正极材料方向</div>
                      <div className="text-[12px] text-[#64748b] mt-[4px]">作为重点观察路线</div>
                    </td>
                    <td className="py-[14px] border-0 align-middle">聚阴离子方向</td>
                    <td className="py-[14px] border-0 align-middle">跟踪预警</td>
                    <td className="py-[14px] border-0 align-middle">按跟踪主题计费</td>
                    <td className="py-[14px] border-0 align-middle text-right">
                      <button className="border border-[#dbe4f1] bg-white rounded-[10px] px-[10px] py-[8px] text-[12px] font-extrabold text-[#334155] cursor-pointer hover:bg-gray-50">开启跟踪</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px] mt-[18px]">
            <h2 className="text-[17px] font-black m-0 mb-[12px]">资产沉淀规则</h2>
            <p className="text-[13px] text-[#64748b] leading-[1.65] m-0">本次赛道任务进入任务记录；机会判断可保存为赛道主题；生成的简报进入报告库；后续挖企业结果仍先进入任务结果池，不直接进入企业库。</p>
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
            <div className="w-[22px] h-[22px] rounded-full bg-[#16a34a] border-[4px] border-white shadow-[0_0_0_1px_#bbf7d0] z-10"></div>
            <div>
              <strong className="block text-[13px] text-[#172033]">机会判断</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">形成细分方向优先级和投资假设</span>
            </div>
          </div>

          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#2563eb] border-[4px] border-white shadow-[0_0_0_4px_#eaf1ff] z-10"></div>
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
