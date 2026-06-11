import { useState, useEffect } from 'react';
import { PencilLine, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function DirectionTuning({ 
  onBack,
  keywords,
  onUpdateKeywords
}: { 
  onBack: () => void,
  keywords: { type: 'include' | 'exclude', text: string }[],
  onUpdateKeywords: (keywords: { type: 'include' | 'exclude', text: string }[]) => void
}) {
  const [goals, setGoals] = useState([
    { 
      id: 1, 
      title: '层状氧化物正极材料企业', 
      subtitle: '优先挖掘，产业化路径较清晰。', 
      selected: true,
      keywords: [
        { type: 'include' as const, text: '层状氧化物' },
        { type: 'include' as const, text: '循环寿命' },
        { type: 'include' as const, text: '低成本' },
        { type: 'include' as const, text: '储能场景' },
        { type: 'exclude' as const, text: '负极材料' },
        { type: 'exclude' as const, text: '电解液' },
      ]
    },
    { 
      id: 2, 
      title: '聚阴离子正极材料企业', 
      subtitle: '适合寻找技术壁垒型企业。', 
      selected: false,
      keywords: [
        { type: 'include' as const, text: '聚阴离子' },
        { type: 'include' as const, text: '高安全性' },
        { type: 'include' as const, text: '长循环' }
      ]
    },
    { 
      id: 3, 
      title: '普鲁士蓝类材料企业', 
      subtitle: '成本优势明显，商业化需验证。', 
      selected: false,
      keywords: [
        { type: 'include' as const, text: '普鲁士蓝' },
        { type: 'include' as const, text: '低成本' },
        { type: 'exclude' as const, text: '杂质高' }
      ]
    },
  ]);

  const activeGoal = goals.find(g => g.selected) || goals[0];

  useEffect(() => {
    // Sync the active goal's keywords with the parent state if needed,
    // though we manage it locally per goal now.
    onUpdateKeywords(activeGoal.keywords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGoal.id, activeGoal.keywords]);

  const handleSelectGoal = (id: number) => {
    setGoals(goals.map(g => ({ ...g, selected: g.id === id })));
  };

  const handleUpdateGoal = (id: number, field: 'title' | 'subtitle', value: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  return (
    <div className="max-w-[1120px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
      <div className="text-[13px] text-[#64748b] mb-4">
        工作台 / 挖企业 / <b className="text-[#334155] font-bold">方向调整逻辑</b>
      </div>

      <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px] mb-[18px]">
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
          <span className="text-[12px] font-black text-[#2563eb] bg-[#eaf1ff] rounded-full px-[10px] py-[7px] inline-flex">Direction Tuning · 单独逻辑页</span>
        </div>
        <h1 className="text-[26px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">调整挖掘目标</h1>
        <p className="mt-2 text-[#64748b] text-[14px] leading-[1.65]">用户可以修改输入、选择 AI 拆解目标、增删关键词。编辑本身不计费；只有重新做产业线索分析时才消耗额度。</p>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-[18px] items-start">
        <main className="flex flex-col gap-[18px]">
          {/* Panel 1 */}
          <div className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex justify-between items-end mb-3">
              <h2 className="text-[17px] font-black m-0">原始需求</h2>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">编辑不计费</span>
            </div>
            <Textarea 
              className="w-full min-h-[80px] rounded-[14px] bg-[#f8fafc] text-[#334155]"
              defaultValue="钠电池正极材料方向，挖掘值得关注的优质企业"
            />
          </div>

          {/* Panel 2 */}
          <div className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex justify-between items-end mb-3">
              <h2 className="text-[17px] font-black m-0">AI 拆解目标</h2>
              <span className="text-[13px] text-[#2563eb] font-extrabold cursor-pointer">重新拆解</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-col md:flex-row">
              {goals.map(goal => (
                <div 
                  key={goal.id}
                  onClick={() => handleSelectGoal(goal.id)}
                  className={`relative border rounded-[16px] p-[16px] cursor-pointer transition-all flex flex-col ${goal.selected ? 'border-[#2563eb] bg-[#f8fbff] shadow-[0_4px_12px_rgba(37,99,235,0.08)]' : 'border-[#e5eaf3] bg-white hover:border-[#cbd5e1]'}`}
                >
                  {goal.selected ? (
                    <div className="flex-1 flex flex-col gap-[8px]">
                      <Input 
                        className="text-[14px] font-bold rounded-[8px]"
                        value={goal.title}
                        onChange={(e) => handleUpdateGoal(goal.id, 'title', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="目标标题"
                      />
                      <Textarea 
                        className="text-[12px] text-[#64748b] leading-[1.5] resize-none rounded-[8px] min-h-[54px]"
                        value={goal.subtitle}
                        onChange={(e) => handleUpdateGoal(goal.id, 'subtitle', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="目标描述"
                      />
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col">
                      <strong className="text-[14px] text-[#172033] block mb-[6px] leading-[1.4]">{goal.title}</strong>
                      <p className="text-[12px] text-[#64748b] leading-[1.6] line-clamp-2">{goal.subtitle}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Panel 3 */}
          <div className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex justify-between items-end mb-3">
              <h2 className="text-[17px] font-black m-0">执行方式</h2>
            </div>
            <p className="text-[#64748b] text-[13px] leading-[1.65] m-0 mb-4">保存调整只更新当前任务配置，不重新计算；重新做产业线索分析会刷新专利、技术路线和企业线索数据。</p>
            <div className="flex flex-col md:flex-row gap-[10px]">
              <Button 
                variant="outline"
                onClick={onBack}
                className="h-[42px] px-[16px] rounded-[13px] font-extrabold flex-1 md:flex-none"
              >
                保存调整
              </Button>
              <Button 
                onClick={onBack}
                className="h-[42px] px-[16px] rounded-[13px] font-extrabold text-white bg-[#2563eb] shadow-[0_10px_18px_rgba(37,99,235,0.18)] flex-1 md:flex-none hover:bg-[#1d4ed8]"
              >
                重新做产业线索分析
              </Button>
            </div>
          </div>
        </main>

        <aside className="flex flex-col gap-[18px]">
          <div className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <h2 className="text-[17px] font-black m-0 mb-3">计费提示</h2>
            <div>
              <div className="flex justify-between items-center gap-3 py-[12px] border-b border-[#edf1f7]">
                <span className="text-[12px] text-[#64748b]">修改输入 / 勾选方向 / 增删关键词</span>
                <strong className="text-[12px] text-right font-bold">不计费</strong>
              </div>
              <div className="flex justify-between items-center gap-3 py-[12px] border-b border-[#edf1f7]">
                <span className="text-[12px] text-[#64748b]">保存调整</span>
                <strong className="text-[12px] text-right font-bold">不计费</strong>
              </div>
              <div className="flex justify-between items-center gap-3 py-[12px] border-b border-[#edf1f7]">
                <span className="text-[12px] text-[#64748b]">AI 拆解目标</span>
                <strong className="text-[12px] text-right font-bold">包内免费或少量额度</strong>
              </div>
              <div className="flex justify-between items-center gap-3 py-[12px]">
                <span className="text-[12px] text-[#64748b]">重新做产业线索分析</span>
                <strong className="text-[12px] text-right font-bold tracking-tight">消耗 1 次线索分析额度</strong>
              </div>
            </div>
          </div>

          <div className="border border-[#fde68a] bg-[#fffbeb] rounded-[14px] p-[14px] text-[#92400e] text-[12px] leading-[1.7]">
            当前修改尚未重新计算。点击“保存调整”只保存配置；点击“重新做产业线索分析”后，系统会提示预计消耗额度。
          </div>

          <div className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <h2 className="text-[17px] font-black m-0 mb-2">下一步在哪里发生？</h2>
            <p className="text-[#64748b] text-[13px] leading-[1.65] m-0">重新完成产业线索分析后，用户回到阶段一确认目标，再进入阶段二“企业发现”。企业发现在本调整页执行。</p>
          </div>

          <div className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <h2 className="text-[17px] font-black m-0 mb-2">结果保存规则</h2>
            <p className="text-[#64748b] text-[13px] leading-[1.65] m-0">重新发现的企业先进入任务结果池；关注、入池、出报告或开启跟踪后，才进入企业库。未关注企业只保留在任务记录中。</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
