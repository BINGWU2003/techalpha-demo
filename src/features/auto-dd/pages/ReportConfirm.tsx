import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ReportConfirm({ onNext, onCancel }: { onNext?: () => void; onCancel?: () => void }) {
  const [selectedResult, setSelectedResult] = useState<'main' | 'other'>('main');

  return (
    <div className="max-w-[1160px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
      <div className="text-[13px] text-[#64748b] mb-4">
        工作台 / 出报告 / <b className="text-[#334155] font-bold">阶段一：确认对象</b>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_236px] gap-[18px] items-start">
        <main className="flex flex-col gap-[18px]">
          {/* Panel 1 */}
          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex items-center gap-3 mb-3">
              {onCancel && (
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={onCancel}
                  className="w-8 h-8 rounded-[8px] bg-white border-[#dbe4f1] text-[#334155] hover:bg-gray-50 hover:border-[#2563eb] hover:text-[#2563eb] transition-all"
                  title="返回"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <span className="text-[12px] font-black text-[#2563eb] bg-[#eaf1ff] rounded-full px-[10px] py-[7px] inline-flex">Auto Report · 阶段一</span>
            </div>
            <h1 className="text-[26px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">确认报告对象</h1>
            <p className="mt-2 text-[#64748b] text-[14px] leading-[1.65]">先确认企业主体。对象来源由系统自动识别，用户只需要选择正确企业并进入下一步。</p>
            <div className="flex flex-col md:flex-row gap-[10px] mt-[18px]">
              <Input className="flex-1 h-[42px] px-[12px] bg-[#f8fafc]" defaultValue="浙江钠创新能源" />
              <Button className="h-[42px] px-[16px] rounded-[13px] font-extrabold text-[#ffffff] bg-[#2563eb] shadow-[0_10px_18px_rgba(37,99,235,0.18)] hover:bg-[#1d4ed8] flex-none">
                搜索
              </Button>
            </div>
          </section>

          {/* Panel 2 */}
          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex justify-between items-end mb-3">
              <h2 className="text-[17px] font-black m-0">系统识别结果</h2>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">已自动识别</span>
            </div>

            <div className="grid gap-[10px]">
              <div 
                onClick={() => setSelectedResult('main')}
                className={`grid grid-cols-[26px_1fr] md:grid-cols-[26px_1fr_auto] gap-[12px] items-center border rounded-[16px] p-[14px] cursor-pointer transition-all duration-180 ${selectedResult === 'main' ? 'border-[#2563eb] bg-[#f8fbff] shadow-[0_10px_24px_rgba(37,99,235,0.08)]' : 'border-[#e5eaf3] bg-white hover:border-[#bfdbfe] hover:bg-[#f8fbff]'}`}
              >
                <div className={`w-[18px] h-[18px] rounded-full border-[2px] flex items-center justify-center ${selectedResult === 'main' ? 'border-[#2563eb]' : 'border-[#cbd5e1]'}`}>
                  {selectedResult === 'main' && <div className="w-[8px] h-[8px] rounded-full bg-[#2563eb]"></div>}
                </div>
                <div>
                  <div className="font-black text-[#172033] text-[14px]">浙江钠创新能源</div>
                  <div className="text-[12px] text-[#64748b] mt-[4px] leading-[1.5]">钠电池正极材料 / 层状氧化物方向</div>
                  <div className="flex flex-wrap gap-[8px] mt-[8px]">
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">来自企业发现任务 + 企业库</span>
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">已关注</span>
                  </div>
                </div>
                <div className="text-left md:text-right text-[12px] text-[#64748b] whitespace-nowrap col-start-2 md:col-auto mt-2 md:mt-0">
                  <strong className="block text-[#172033] text-[18px] mb-[2px] font-bold">96%</strong>
                  匹配置信度
                </div>
              </div>

              <div 
                onClick={() => setSelectedResult('other')}
                className={`grid grid-cols-[26px_1fr] md:grid-cols-[26px_1fr_auto] gap-[12px] items-center border rounded-[16px] p-[14px] cursor-pointer transition-all duration-180 ${selectedResult === 'other' ? 'border-[#2563eb] bg-[#f8fbff] shadow-[0_10px_24px_rgba(37,99,235,0.08)]' : 'border-[#e5eaf3] bg-white hover:border-[#bfdbfe] hover:bg-[#f8fbff]'}`}
              >
                <div className={`w-[18px] h-[18px] rounded-full border-[2px] flex items-center justify-center ${selectedResult === 'other' ? 'border-[#2563eb]' : 'border-[#cbd5e1]'}`}>
                  {selectedResult === 'other' && <div className="w-[8px] h-[8px] rounded-full bg-[#2563eb]"></div>}
                </div>
                <div>
                  <div className="font-black text-[#172033] text-[14px]">浙江某新能源材料有限公司</div>
                  <div className="text-[12px] text-[#64748b] mt-[4px] leading-[1.5]">名称相近，业务方向部分相关</div>
                  <div className="flex flex-wrap gap-[8px] mt-[8px]">
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">外部识别</span>
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">未关注</span>
                  </div>
                </div>
                <div className="text-left md:text-right text-[12px] text-[#64748b] whitespace-nowrap col-start-2 md:col-auto mt-2 md:mt-0">
                  <strong className="block text-[#172033] text-[18px] mb-[2px] font-bold">71%</strong>
                  匹配置信度
                </div>
              </div>
            </div>

            <div className="flex items-start gap-[10px] bg-[#f8fafc] border border-[#e5eaf3] rounded-[14px] p-[13px_14px] text-[#64748b] text-[12px] leading-[1.65] mt-[14px]">
              <span className="w-[7px] h-[7px] rounded-full bg-[#2563eb] shadow-[0_0_0_4px_rgba(37,99,235,0.12)] mt-[6px] shrink-0"></span>
              <span>请选择正确企业主体。若企业尚未进入企业库，生成报告时可选择同步关注。</span>
            </div>

            <div className="flex flex-col md:flex-row justify-end gap-[10px] mt-[18px]">
              <Button variant="outline" onClick={onCancel} className="h-[42px] px-[16px] rounded-[13px] font-extrabold flex-none">取消</Button>
              <Button onClick={onNext} className="h-[42px] px-[16px] rounded-[13px] font-extrabold text-[#ffffff] bg-[#2563eb] shadow-[0_10px_18px_rgba(37,99,235,0.18)] hover:bg-[#1d4ed8] flex-none">确认对象，配置报告</Button>
            </div>
          </section>
        </main>

        <aside className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[18px] xl:sticky xl:top-[74px]">
          <h3 className="m-0 mb-[14px] text-[15px] font-bold">报告阶段</h3>
          
          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px] before:content-[''] before:absolute before:left-[10px] before:top-[24px] before:w-[2px] before:h-[calc(100%-18px)] before:bg-[#dbe4f1]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#2563eb] border-[4px] border-white shadow-[0_0_0_4px_#eaf1ff] z-[1]"></div>
            <div>
              <strong className="block text-[13px] font-bold text-[#172033]">确认对象</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">选择企业，避免错误主体</span>
            </div>
          </div>
          
          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px] before:content-[''] before:absolute before:left-[10px] before:top-[24px] before:w-[2px] before:h-[calc(100%-18px)] before:bg-[#dbe4f1]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#e2e8f0] border-[4px] border-white shadow-[0_0_0_1px_#dbe4f1] z-[1]"></div>
            <div>
              <strong className="block text-[13px] font-bold text-[#172033]">配置报告</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">选择模板、章节和深度</span>
            </div>
          </div>
          
          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px] before:content-[''] before:absolute before:left-[10px] before:top-[24px] before:w-[2px] before:h-[calc(100%-18px)] before:bg-[#dbe4f1]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#e2e8f0] border-[4px] border-white shadow-[0_0_0_1px_#dbe4f1] z-[1]"></div>
            <div>
              <strong className="block text-[13px] font-bold text-[#172033]">生成编辑</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">生成初稿并编辑正文/图表</span>
            </div>
          </div>
          
          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#e2e8f0] border-[4px] border-white shadow-[0_0_0_1px_#dbe4f1] z-[1]"></div>
            <div>
              <strong className="block text-[13px] font-bold text-[#172033]">入库复核</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">保存版本、导出与同步结论</span>
            </div>
          </div>

          <div className="bg-[#f8fafc] border border-[#e5eaf3] rounded-[14px] p-[13px] mt-[14px]">
            <strong className="text-[13px] font-bold text-[#172033]">保存规则</strong>
            <p className="text-[12px] mt-[5px] text-[#64748b] leading-[1.6]">报告生成后进入报告库；报告结论可同步到企业库或标的池。</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
