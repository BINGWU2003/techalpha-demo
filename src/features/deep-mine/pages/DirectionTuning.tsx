import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArrowLeft, PencilLine, Plus, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

type Keyword = { type: 'include' | 'exclude'; text: string };

type Goal = {
  id: number;
  title: string;
  subtitle: string;
  keywords: Keyword[];
};

interface DirectionTuningProps {
  onBack: () => void;
  keywords: Keyword[];
  onUpdateKeywords: (keywords: Keyword[]) => void;
}

const FALLBACK_KEYWORDS: Keyword[] = [
  { type: 'include', text: '层状氧化物' },
  { type: 'include', text: '循环寿命' },
  { type: 'include', text: '低成本' },
  { type: 'include', text: '储能场景' },
  { type: 'exclude', text: '负极材料' },
  { type: 'exclude', text: '电解液' },
];

const createInitialGoals = (keywords: Keyword[]): Goal[] => [
  {
    id: 1,
    title: '层状氧化物正极材料企业',
    subtitle: '优先挖掘，产业化路径较清晰。重点关注循环寿命、低成本和储能场景落地能力。',
    keywords: keywords.length > 0 ? keywords : FALLBACK_KEYWORDS,
  },
  {
    id: 2,
    title: '聚阴离子正极材料企业',
    subtitle: '适合寻找技术壁垒型企业。关注高安全性、长循环与规模化制备能力。',
    keywords: [
      { type: 'include', text: '聚阴离子' },
      { type: 'include', text: '高安全性' },
      { type: 'include', text: '长循环' },
    ],
  },
  {
    id: 3,
    title: '普鲁士蓝类材料企业',
    subtitle: '成本优势明显，商业化需验证。需要排除杂质控制不足或量产稳定性差的线索。',
    keywords: [
      { type: 'include', text: '普鲁士蓝' },
      { type: 'include', text: '低成本' },
      { type: 'exclude', text: '杂质高' },
    ],
  },
];

export default function DirectionTuning({ onBack, keywords, onUpdateKeywords }: DirectionTuningProps) {
  const [originalRequest, setOriginalRequest] = useState('钠电池正极材料方向，挖掘值得关注的优质企业');
  const [goals, setGoals] = useState<Goal[]>(() => createInitialGoals(keywords));
  const [selectedGoalId, setSelectedGoalId] = useState(1);
  const [excludedGoalIds, setExcludedGoalIds] = useState<number[]>([]);
  const [newKeywordType, setNewKeywordType] = useState<Keyword['type']>('include');
  const [newKeywordText, setNewKeywordText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [confirmAnalyzeOpen, setConfirmAnalyzeOpen] = useState(false);

  const selectedGoals = useMemo(
    () => goals.filter((goal) => !excludedGoalIds.includes(goal.id)),
    [excludedGoalIds, goals],
  );
  const activeGoal = goals.find((goal) => goal.id === selectedGoalId) ?? goals[0];

  useEffect(() => {
    if (activeGoal) {
      onUpdateKeywords(activeGoal.keywords);
    }
  }, [activeGoal, onUpdateKeywords]);

  const showStatus = (message: string) => {
    setStatusMessage(message);
  };

  const handleSelectGoal = (id: number) => {
    setSelectedGoalId(id);
    setStatusMessage('');
  };

  const handleToggleGoal = (id: number, checked: boolean | 'indeterminate') => {
    const shouldSelect = checked === true;
    const isLastSelected = !shouldSelect && selectedGoals.length <= 1 && !excludedGoalIds.includes(id);

    if (isLastSelected) {
      showStatus('至少保留 1 个分析目标');
      return;
    }

    setExcludedGoalIds((ids) => {
      if (shouldSelect) {
        return ids.filter((goalId) => goalId !== id);
      }

      return [...new Set([...ids, id])];
    });
    setStatusMessage('');
  };

  const handleSelectAllGoals = () => {
    setExcludedGoalIds([]);
    showStatus('已选择全部拆解目标');
  };

  const handleUpdateGoal = (id: number, field: 'title' | 'subtitle', value: string) => {
    setGoals((items) => items.map((goal) => (goal.id === id ? { ...goal, [field]: value } : goal)));
    setStatusMessage('');
  };

  const handleAddKeyword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = newKeywordText.trim();
    if (!activeGoal || !text) {
      showStatus('请输入关键词');
      return;
    }

    const exists = activeGoal.keywords.some(
      (keyword) => keyword.type === newKeywordType && keyword.text === text,
    );

    if (exists) {
      showStatus('该关键词已存在');
      return;
    }

    setGoals((items) =>
      items.map((goal) =>
        goal.id === activeGoal.id
          ? { ...goal, keywords: [...goal.keywords, { type: newKeywordType, text }] }
          : goal,
      ),
    );
    setNewKeywordText('');
    showStatus('关键词已添加');
  };

  const handleRemoveKeyword = (goalId: number, index: number) => {
    setGoals((items) =>
      items.map((goal) =>
        goal.id === goalId
          ? { ...goal, keywords: goal.keywords.filter((_, keywordIndex) => keywordIndex !== index) }
          : goal,
      ),
    );
    showStatus('关键词已移除');
  };

  const handleToggleKeywordType = (goalId: number, index: number) => {
    setGoals((items) =>
      items.map((goal) => {
        if (goal.id !== goalId) {
          return goal;
        }

        return {
          ...goal,
          keywords: goal.keywords.map((keyword, keywordIndex) =>
            keywordIndex === index
              ? { ...keyword, type: keyword.type === 'include' ? 'exclude' : 'include' }
              : keyword,
          ),
        };
      }),
    );
    showStatus('关键词类型已切换');
  };

  const handleSave = () => {
    if (activeGoal) {
      onUpdateKeywords(activeGoal.keywords);
    }

    onBack();
  };

  const handleConfirmAnalyze = () => {
    if (activeGoal) {
      onUpdateKeywords(activeGoal.keywords);
    }

    setConfirmAnalyzeOpen(false);
    onBack();
  };

  return (
    <div className="max-w-[1120px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
      <div className="text-[13px] text-[#64748b] mb-4">
        工作台 / 挖企业 / <b className="text-[#334155] font-bold">方向调整逻辑</b>
      </div>

      <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px] mb-[18px]">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="w-8 h-8 rounded-[8px] bg-white border-[#dbe4f1] text-[#334155] hover:bg-gray-50 hover:border-[#2563eb] hover:text-[#2563eb] transition-all"
            title="返回"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <span className="text-[12px] font-black text-[#2563eb] bg-[#eaf1ff] rounded-full px-[10px] py-[7px] inline-flex">
            Direction Tuning · 单独逻辑页
          </span>
        </div>
        <h1 className="text-[26px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">调整挖掘目标</h1>
        <p className="mt-2 text-[#64748b] text-[14px] leading-[1.65]">
          用户可以修改输入、选择 AI 拆解目标、增删关键词。编辑本身不计费；只有重新做产业线索分析时才消耗额度。
        </p>
      </section>

      <section className="flex flex-col gap-[18px]">
        <div className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-[17px] font-black m-0">原始需求</h2>
            <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">
              编辑不计费
            </span>
          </div>
          <Textarea
            className="w-full min-h-[80px] rounded-[14px] bg-[#f8fafc] text-[#334155]"
            value={originalRequest}
            onChange={(event) => setOriginalRequest(event.target.value)}
          />
        </div>

        <div className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-[17px] font-black m-0">AI 拆解目标</h2>
              <p className="text-[#64748b] text-[13px] leading-[1.55] m-0">
                勾选进入本次分析的目标，右侧可直接编辑当前目标和关键词。至少保留 1 个分析目标。
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] text-[#64748b] font-bold">
                已选 {selectedGoals.length} / {goals.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAllGoals}
                disabled={selectedGoals.length === goals.length}
              >
                全选
              </Button>
              <Button variant="ghost" size="sm" onClick={() => showStatus('已重新拆解为默认目标')}>
                <RotateCcw data-icon="inline-start" />
                重新拆解
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(320px,0.9fr)_minmax(360px,1.1fr)] gap-4">
            <ScrollArea className="max-h-[520px] rounded-[16px] border border-[#e5eaf3] bg-[#f8fafc]">
              <div className="flex flex-col gap-2 p-2">
                {goals.map((goal) => {
                  const selectedForAnalysis = !excludedGoalIds.includes(goal.id);
                  const isLastSelected = selectedForAnalysis && selectedGoals.length <= 1;

                  return (
                    <div
                      key={goal.id}
                      className={`group flex cursor-pointer gap-3 rounded-[14px] border bg-white p-3 transition-all ${
                        goal.id === selectedGoalId
                          ? 'border-[#2563eb] shadow-[0_8px_18px_rgba(37,99,235,0.1)]'
                          : 'border-[#e5eaf3] hover:border-[#cbd5e1]'
                      } ${!selectedForAnalysis ? 'opacity-70' : ''}`}
                      onClick={() => handleSelectGoal(goal.id)}
                    >
                      <Checkbox
                        checked={selectedForAnalysis}
                        disabled={isLastSelected}
                        onCheckedChange={(checked) => handleToggleGoal(goal.id, checked)}
                        onClick={(event) => event.stopPropagation()}
                        aria-label={`选择分析目标 ${goal.id}`}
                        className="mt-1"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <strong className="text-[15px] leading-[1.45] text-[#172033]">
                            {goal.title || '未命名目标'}
                          </strong>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleSelectGoal(goal.id);
                            }}
                            title="编辑目标"
                          >
                            <PencilLine />
                          </Button>
                        </div>
                        <p className="m-0 mt-1 line-clamp-2 text-[13px] leading-[1.5] text-[#64748b]">
                          {goal.subtitle || '暂无描述'}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {goal.keywords.slice(0, 4).map((keyword) => (
                            <span
                              key={`${keyword.type}-${keyword.text}`}
                              className={`rounded-full px-2 py-1 text-[11px] font-bold ${
                                keyword.type === 'include'
                                  ? 'bg-[#eaf1ff] text-[#2563eb]'
                                  : 'bg-[#fff1f2] text-[#e11d48]'
                              }`}
                            >
                              {keyword.type === 'include' ? '+' : '-'} {keyword.text}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div className="rounded-[16px] border border-[#e5eaf3] bg-white p-4">
              {activeGoal ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <h3 className="m-0 text-[15px] font-black text-[#172033]">编辑目标 {activeGoal.id}</h3>
                      <p className="m-0 text-[12px] leading-[1.5] text-[#64748b]">
                        当前目标{excludedGoalIds.includes(activeGoal.id) ? '不会参与' : '会参与'}本次产业线索分析。
                      </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-[#f8fafc] px-3 py-2">
                      <Checkbox
                        checked={!excludedGoalIds.includes(activeGoal.id)}
                        disabled={!excludedGoalIds.includes(activeGoal.id) && selectedGoals.length <= 1}
                        onCheckedChange={(checked) => handleToggleGoal(activeGoal.id, checked)}
                        aria-label="当前目标是否参与分析"
                      />
                      <span className="text-[12px] font-bold text-[#334155]">纳入分析</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-bold text-[#334155]">目标标题</label>
                    <Textarea
                      className="min-h-[52px] resize-none rounded-[12px] bg-[#f8fafc] text-[15px] font-bold leading-[1.45]"
                      value={activeGoal.title}
                      onChange={(event) => handleUpdateGoal(activeGoal.id, 'title', event.target.value)}
                      placeholder="目标标题"
                      rows={2}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-bold text-[#334155]">分析说明</label>
                    <Textarea
                      className="min-h-[118px] resize-none rounded-[12px] bg-[#f8fafc] text-[13px] leading-[1.6]"
                      value={activeGoal.subtitle}
                      onChange={(event) => handleUpdateGoal(activeGoal.id, 'subtitle', event.target.value)}
                      placeholder="补充这个目标的分析边界、筛选标准或排除项"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <label className="text-[12px] font-bold text-[#334155]">关键词</label>
                      <span className="text-[12px] text-[#64748b]">点击标签可切换包含/排除</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeGoal.keywords.map((keyword, index) => (
                        <span
                          key={`${keyword.type}-${keyword.text}-${index}`}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[12px] font-bold ${
                            keyword.type === 'include'
                              ? 'bg-[#eaf1ff] text-[#2563eb]'
                              : 'bg-[#fff1f2] text-[#e11d48]'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => handleToggleKeywordType(activeGoal.id, index)}
                            className="border-0 bg-transparent p-0 text-inherit font-black cursor-pointer"
                          >
                            {keyword.type === 'include' ? '+' : '-'} {keyword.text}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveKeyword(activeGoal.id, index)}
                            className="border-0 bg-transparent p-0 text-inherit cursor-pointer opacity-70 hover:opacity-100"
                            aria-label={`删除关键词 ${keyword.text}`}
                          >
                            <X className="size-3" />
                          </button>
                        </span>
                      ))}
                    </div>

                    <form onSubmit={handleAddKeyword} className="flex flex-col gap-2 rounded-[14px] bg-[#f8fafc] p-3 md:flex-row md:items-center">
                      <div className="flex rounded-[11px] bg-white p-1 text-[12px] font-bold">
                        <button
                          type="button"
                          onClick={() => setNewKeywordType('include')}
                          className={`rounded-[8px] border-0 px-3 py-1.5 cursor-pointer ${
                            newKeywordType === 'include' ? 'bg-[#eaf1ff] text-[#2563eb]' : 'bg-transparent text-[#64748b]'
                          }`}
                        >
                          包含
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewKeywordType('exclude')}
                          className={`rounded-[8px] border-0 px-3 py-1.5 cursor-pointer ${
                            newKeywordType === 'exclude' ? 'bg-[#fff1f2] text-[#e11d48]' : 'bg-transparent text-[#64748b]'
                          }`}
                        >
                          排除
                        </button>
                      </div>
                      <Input
                        value={newKeywordText}
                        onChange={(event) => setNewKeywordText(event.target.value)}
                        placeholder="新增关键词"
                        className="h-10 flex-1 bg-white"
                      />
                      <Button type="submit" size="sm" className="h-10 rounded-[11px]">
                        <Plus data-icon="inline-start" />
                        添加
                      </Button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[260px] items-center justify-center text-[13px] text-[#64748b]">
                  选择一个目标后编辑。
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-[17px] font-black m-0">执行方式</h2>
              <p className="text-[#64748b] text-[13px] leading-[1.65] m-0">
                保存调整只更新当前任务配置，不重新计算。重新做产业线索分析会使用已勾选的 {selectedGoals.length} 个目标刷新专利、技术路线和企业线索数据。
              </p>
              <p className="m-0 text-[12px] leading-[1.6] text-[#92400e]">
                重新分析将消耗 1 次线索分析额度，提交前会再次确认。
              </p>
              {statusMessage && <p className="m-0 text-[12px] font-bold text-[#2563eb]">{statusMessage}</p>}
            </div>
            <div className="flex flex-col md:flex-row gap-[10px]">
              <Button
                variant="outline"
                onClick={handleSave}
                className="h-[42px] px-[16px] rounded-[13px] font-extrabold flex-1 md:flex-none"
              >
                保存调整
              </Button>
              <Button
                onClick={() => setConfirmAnalyzeOpen(true)}
                disabled={selectedGoals.length === 0}
                className="h-[42px] px-[16px] rounded-[13px] font-extrabold text-white bg-[#2563eb] shadow-[0_10px_18px_rgba(37,99,235,0.18)] flex-1 md:flex-none hover:bg-[#1d4ed8]"
              >
                重新做产业线索分析
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={confirmAnalyzeOpen} onOpenChange={setConfirmAnalyzeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认重新做产业线索分析？</DialogTitle>
            <DialogDescription>
              系统将基于已选择的 {selectedGoals.length} 个目标重新分析，并消耗 1 次线索分析额度。
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-[12px] bg-[#f8fafc] p-3">
            <div className="flex flex-col gap-2">
              {selectedGoals.map((goal) => (
                <div key={goal.id} className="text-[13px] font-bold leading-[1.5] text-[#334155]">
                  {goal.id}. {goal.title || '未命名目标'}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmAnalyzeOpen(false)}>
              取消
            </Button>
            <Button onClick={handleConfirmAnalyze}>确认重新分析</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
