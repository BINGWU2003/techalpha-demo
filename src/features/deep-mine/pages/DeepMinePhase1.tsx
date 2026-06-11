import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DeepMinePhase1({ 
  onAnalyze, 
  onAdjustTarget,
  onBack,
  state,
  onUpdateState
}: { 
  onAnalyze: () => void, 
  onAdjustTarget: () => void,
  onBack?: () => void,
  state: { isDeconstructed: boolean, isAnalyzing: boolean, showAnalysis: boolean },
  onUpdateState: (state: Partial<{ isDeconstructed: boolean, isAnalyzing: boolean, showAnalysis: boolean }>) => void
}) {
  const { isDeconstructed, isAnalyzing, showAnalysis } = state;

  const handleAnalyze = () => {
    if (showAnalysis) {
      onAnalyze();
      return;
    }

    onUpdateState({ isAnalyzing: true });
    setTimeout(() => {
      onUpdateState({ isAnalyzing: false, showAnalysis: true });
      onAnalyze();
    }, 600);
  };

  return (
    <div className="max-w-[1120px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
      <div className="flex items-center gap-[12px] mb-4">
        <div className="text-[13px] text-[#64748b]">
          工作台 / 挖企业 / <b className="text-[#334155] font-bold">明确挖掘目标</b>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_232px] gap-[18px] items-start">
        <main>
          {/* Panel 1: 明确挖掘目标 */}
          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex items-start gap-[12px]">
              {onBack && (
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={onBack}
                  className="w-8 h-8 rounded-[8px] bg-white border-[#dbe4f1] text-[#334155] hover:bg-gray-50 hover:border-[#2563eb] hover:text-[#2563eb] transition-all shrink-0"
                  title="返回"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <div className="min-w-0 flex-1">
                <h1 className="text-[26px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">明确挖掘目标</h1>
              <p className="mt-2 text-[#64748b] text-[14px] leading-[1.65]">从首页点击“挖企业”后，系统先把用户输入转成可执行的企业挖掘目标，拆解完成后进入产业线索分析。</p>
              <div className="flex flex-col md:flex-row gap-[10px] mt-[18px]">
                <Input 
                  className="flex-1 h-[44px] px-[12px] bg-[#f8fafc]" 
                  defaultValue="钠电池正极材料" 
                />
                <Button 
                  onClick={() => onUpdateState({ isDeconstructed: true, isAnalyzing: false, showAnalysis: false })}
                  className={`h-[42px] px-[16px] rounded-[13px] font-extrabold ${isDeconstructed ? 'bg-[#f1f5f9] text-[#2563eb] hover:bg-[#e2e8f0]' : 'bg-[#2563eb] text-white shadow-[0_10px_18px_rgba(37,99,235,0.18)] hover:bg-[#1d4ed8]'}`}
                >
                  {isDeconstructed ? '重新拆解' : 'AI 拆解目标'}
                </Button>
              </div>
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
                  {isAnalyzing ? '正在分析线索...' : (showAnalysis ? '查看分析结果' : '线索分析')}
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
