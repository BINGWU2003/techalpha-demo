import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function ReportConfig({ onBack, onGenerate }: { onBack?: () => void; onGenerate?: () => void }) {
  const [selectedTemplate, setSelectedTemplate] = useState('企业初筛报告');
  const [selectedModules, setSelectedModules] = useState([
    '企业画像', '技术分析', '潜力分析', '竞争力分析', '经营分析', '声誉分析'
  ]);

  const toggleModule = (module: string, required: boolean = false) => {
    if (required) return;
    if (selectedModules.includes(module)) {
      setSelectedModules(selectedModules.filter(m => m !== module));
    } else {
      setSelectedModules([...selectedModules, module]);
    }
  };

  return (
    <div className="max-w-[1160px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
      <div className="text-[13px] text-[#64748b] mb-4">
        工作台 / 出报告 / <b className="text-[#334155] font-bold">阶段二：配置报告</b>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_236px] gap-[18px] items-start">
        <main>
          {/* Panel 1 */}
          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex items-center gap-3 mb-3">
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
              <span className="text-[12px] font-black text-[#2563eb] bg-[#eaf1ff] rounded-full px-[10px] py-[7px] inline-flex">Auto Report · 阶段二</span>
            </div>
            <h1 className="text-[26px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">浙江钠创新能源</h1>
            <p className="mt-2 text-[#64748b] text-[14px] leading-[1.65]">选择报告模板、章节模块、报告深度和输出格式。数据准备不作为独立步骤，只在右侧轻量提示当前数据状态。</p>
            <div className="flex flex-wrap gap-[8px] mt-[12px]">
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">企业初筛报告</span>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">数据完整度 86%</span>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff7e8] text-[#d97706]">预计消耗 1 个报告额度</span>
            </div>
          </section>

          {/* Panel 2 */}
          <section className="mt-[18px]">
            <div className="flex justify-between items-end mb-[12px]">
              <h2 className="text-[17px] font-black m-0">选择报告模板</h2>
              <span className="text-[13px] text-[#2563eb] font-extrabold cursor-pointer hover:underline">模板管理</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px]">
              <div 
                onClick={() => setSelectedTemplate('企业初筛报告')}
                className={`border rounded-[16px] p-[15px] cursor-pointer transition-colors ${selectedTemplate === '企业初筛报告' ? 'border-[#2563eb] bg-[#f8fbff]' : 'border-[#e5eaf3] bg-white hover:border-[#2563eb]'}`}
              >
                <strong className="text-[14px] font-bold">企业初筛报告</strong>
                <p className="text-[12px] mt-[7px] text-[#64748b] leading-[1.5]">适合快速判断是否进入标的池或后续尽调。</p>
                <div className="flex flex-wrap gap-[8px] mt-[12px]">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">推荐</span>
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">约 6-8 页</span>
                </div>
              </div>

              <div 
                onClick={() => setSelectedTemplate('技术评估报告')}
                className={`border rounded-[16px] p-[15px] cursor-pointer transition-colors ${selectedTemplate === '技术评估报告' ? 'border-[#2563eb] bg-[#f8fbff]' : 'border-[#e5eaf3] bg-white hover:border-[#2563eb]'}`}
              >
                <strong className="text-[14px] font-bold">技术评估报告</strong>
                <p className="text-[12px] mt-[7px] text-[#64748b] leading-[1.5]">重点分析技术路线、专利、壁垒和产业链位置。</p>
                <div className="flex flex-wrap gap-[8px] mt-[12px]">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">偏技术</span>
                </div>
              </div>

              <div 
                onClick={() => setSelectedTemplate('深度尽调报告')}
                className={`border rounded-[16px] p-[15px] cursor-pointer transition-colors ${selectedTemplate === '深度尽调报告' ? 'border-[#2563eb] bg-[#f8fbff]' : 'border-[#e5eaf3] bg-white hover:border-[#2563eb]'}`}
              >
                <strong className="text-[14px] font-bold">深度尽调报告</strong>
                <p className="text-[12px] mt-[7px] text-[#64748b] leading-[1.5]">覆盖公司、技术、商业化、融资、风险和尽调问题。</p>
                <div className="flex flex-wrap gap-[8px] mt-[12px]">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff7e8] text-[#d97706]">消耗更多</span>
                </div>
              </div>
            </div>
          </section>

          {/* Panel 3 */}
          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px] mt-[18px]">
            <div className="flex justify-between items-end mb-[12px]">
              <h2 className="text-[17px] font-black m-0">选择报告章节</h2>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">当前选择 {selectedModules.length} 个章节</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3] w-[48px]">选择</th>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">章节</th>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">用途</th>
                    <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle"><Checkbox checked disabled className="cursor-not-allowed" /></td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">企业画像</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">企业主体、工商信息、行业标签</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle"><span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">必要</span></td>
                  </tr>
                  <tr>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle"><Checkbox checked disabled className="cursor-not-allowed" /></td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">技术分析</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">核心材料、工艺路线、专利线索</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle"><span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">必要</span></td>
                  </tr>
                  <tr>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle"><Checkbox checked={selectedModules.includes('潜力分析')} onCheckedChange={() => toggleModule('潜力分析')} className="cursor-pointer" /></td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">潜力分析</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">产能规划、技术迭代、商业化预期</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle"><span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">建议</span></td>
                  </tr>
                  <tr>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle"><Checkbox checked={selectedModules.includes('竞争力分析')} onCheckedChange={() => toggleModule('竞争力分析')} className="cursor-pointer" /></td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">竞争力分析</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">重点参数、成本优势、同类对标</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle"><span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">建议</span></td>
                  </tr>
                  <tr>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle"><Checkbox checked={selectedModules.includes('经营分析')} onCheckedChange={() => toggleModule('经营分析')} className="cursor-pointer" /></td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">经营分析</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle">股权结构、融资历程、投资事件</td>
                    <td className="py-[14px] border-b border-[#edf1f7] align-middle"><span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">可选</span></td>
                  </tr>
                  <tr>
                    <td className="py-[14px] align-middle border-0"><Checkbox checked={selectedModules.includes('声誉分析')} onCheckedChange={() => toggleModule('声誉分析')} className="cursor-pointer" /></td>
                    <td className="py-[14px] align-middle border-0">声誉分析</td>
                    <td className="py-[14px] align-middle border-0">舆情监控、高管背景风险</td>
                    <td className="py-[14px] align-middle border-0"><span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">可选</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row justify-end gap-[10px] mt-[18px]">
              <Button variant="outline" onClick={onBack} className="flex-none rounded-[13px] font-extrabold h-[42px]">上一步</Button>
              <Button variant="outline" className="flex-none rounded-[13px] font-extrabold h-[42px]">保存配置</Button>
              <Button 
                onClick={onGenerate}
                className="flex-none rounded-[13px] font-extrabold h-[42px] bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-[0_10px_18px_rgba(37,99,235,0.18)]"
              >
                生成报告初稿
              </Button>
            </div>
          </section>
        </main>

        <aside className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[18px] xl:sticky xl:top-[74px]">
          <h3 className="m-0 mb-[14px] text-[15px] font-bold">报告阶段</h3>
          
          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px] before:content-[''] before:absolute before:left-[10px] before:top-[24px] before:w-[2px] before:h-[calc(100%-18px)] before:bg-[#dbe4f1]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#16a34a] border-[4px] border-white shadow-[0_0_0_1px_#bbf7d0] z-[1]"></div>
            <div>
              <strong className="block text-[13px] font-bold text-[#172033]">确认对象</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">已确认浙江钠创新能源</span>
            </div>
          </div>
          
          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px] before:content-[''] before:absolute before:left-[10px] before:top-[24px] before:w-[2px] before:h-[calc(100%-18px)] before:bg-[#dbe4f1]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#2563eb] border-[4px] border-white shadow-[0_0_0_4px_#eaf1ff] z-[1]"></div>
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
            <strong className="text-[13px] font-bold text-[#172033]">数据状态</strong>
            <p className="text-[12px] mt-[5px] text-[#64748b] leading-[1.6]">企业基础数据可用；专利与技术线索可生成，但权利要求和引用数据需人工复核。当前配置适合生成企业初筛报告。</p>
          </div>

          <div className="bg-[#f8fafc] border border-[#e5eaf3] rounded-[14px] p-[13px] mt-[14px]">
            <strong className="text-[13px] font-bold text-[#172033]">预计消耗</strong>
            <p className="text-[12px] mt-[5px] text-[#64748b] leading-[1.6]">当前模板预计消耗 1 个报告额度。深度报告或补充专利全文会额外消耗额度。</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

