import { useEffect, useMemo, useState } from "react";
import { PencilLine, Plus, RotateCcw, X } from "lucide-react";
import { message } from "antd";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Direction = {
  id: number;
  title: string;
  description: string;
};

const INITIAL_SELECTED_DIRECTIONS: Direction[] = [
  {
    id: 1,
    title: "层状氧化物正极材料企业",
    description: "优先挖掘，产业化路径较清晰。",
  },
  {
    id: 2,
    title: "聚阴离子正极材料企业",
    description: "适合寻找技术壁垒型企业。",
  },
  {
    id: 3,
    title: "普鲁士蓝类材料企业",
    description: "成本优势明显，商业化需验证。",
  },
];

const CANDIDATE_DIRECTIONS_A: Direction[] = [
  {
    id: 4,
    title: "正极材料包覆改性企业",
    description: "关注循环寿命、安全性和稳定性提升。",
  },
  {
    id: 5,
    title: "低成本前驱体企业",
    description: "关注规模化制备和成本控制。",
  },
  {
    id: 6,
    title: "储能场景材料企业",
    description: "关注长循环、低温性能和工程化应用。",
  },
  {
    id: 7,
    title: "钠电材料回收企业",
    description: "关注回收体系和闭环产业链潜力。",
  },
];

const CANDIDATE_DIRECTIONS_B: Direction[] = [
  {
    id: 8,
    title: "层状氧化物高压实企业",
    description: "聚焦压实密度、倍率性能和量产指标。",
  },
  {
    id: 9,
    title: "聚阴离子安全型企业",
    description: "关注安全性、长循环和储能验证。",
  },
  {
    id: 10,
    title: "低温性能材料企业",
    description: "关注低温容量保持率和北方储能应用。",
  },
  {
    id: 11,
    title: "钠电正极添加剂企业",
    description: "关注改善循环、倍率和界面稳定性。",
  },
];

const MAX_SELECTED_DIRECTIONS = 3;
const DIRECTION_LIMIT_WARNING = "最多选择 3 个技术方向，请先取消一个已选方向";

export default function DeepMinePhase1({
  onAnalyze,
  onBack,
  state,
  onUpdateState,
}: {
  onAnalyze: () => void;
  onAdjustTarget: () => void;
  onBack?: () => void;
  state: {
    taskInput?: string;
    isDeconstructed: boolean;
    isAnalyzing: boolean;
    showAnalysis: boolean;
  };
  onUpdateState: (
    state: Partial<{
      taskInput: string;
      isDeconstructed: boolean;
      isAnalyzing: boolean;
      showAnalysis: boolean;
    }>,
  ) => void;
}) {
  const { isAnalyzing, showAnalysis } = state;
  const [selectedDirections, setSelectedDirections] = useState<Direction[]>(
    INITIAL_SELECTED_DIRECTIONS,
  );
  const [candidateDirections, setCandidateDirections] = useState<Direction[]>(
    CANDIDATE_DIRECTIONS_A,
  );
  const [usesCandidateSetB, setUsesCandidateSetB] = useState(false);
  const [preference, setPreference] = useState(
    "更关注产业路径清晰、成本下降空间明显、已有商业化验证的技术方向。",
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [blockedDirectionId, setBlockedDirectionId] = useState<number | null>(
    null,
  );

  const selectedCount = selectedDirections.length;
  const taskName = state.taskInput?.trim() || "钠电池正极材料方向企业挖掘";

  const selectedDirectionIds = useMemo(
    () => new Set(selectedDirections.map((direction) => direction.id)),
    [selectedDirections],
  );

  useEffect(() => {
    if (!blockedDirectionId) {
      return;
    }

    const timer = window.setTimeout(() => {
      setBlockedDirectionId(null);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [blockedDirectionId]);

  const handleUpdateDirection = (
    id: number,
    field: keyof Pick<Direction, "title" | "description">,
    value: string,
  ) => {
    setSelectedDirections((items) =>
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleAddCandidate = (id: number) => {
    if (selectedDirections.length >= MAX_SELECTED_DIRECTIONS) {
      message.warning({
        content: DIRECTION_LIMIT_WARNING,
        key: "direction-limit-warning",
      });
      setStatusMessage(DIRECTION_LIMIT_WARNING);
      setBlockedDirectionId(id);
      return;
    }

    const candidate = candidateDirections.find((item) => item.id === id);
    if (!candidate) {
      return;
    }

    setSelectedDirections((items) => [...items, candidate]);
    setCandidateDirections((items) => items.filter((item) => item.id !== id));
    setBlockedDirectionId(null);
    setStatusMessage("");
  };

  const handleRemoveSelected = (id: number) => {
    const direction = selectedDirections.find((item) => item.id === id);
    if (!direction) {
      return;
    }

    setSelectedDirections((items) => items.filter((item) => item.id !== id));
    setCandidateDirections((items) => {
      if (items.some((item) => item.id === id)) {
        return items;
      }

      return [direction, ...items];
    });
    setBlockedDirectionId(null);
    setStatusMessage("");
  };

  const handleRefreshCandidates = () => {
    const source = usesCandidateSetB
      ? CANDIDATE_DIRECTIONS_A
      : CANDIDATE_DIRECTIONS_B;

    setCandidateDirections(
      source.filter((direction) => !selectedDirectionIds.has(direction.id)),
    );
    setUsesCandidateSetB(!usesCandidateSetB);
    setBlockedDirectionId(null);
    setStatusMessage("已更新候选技术方向");
    message.success({
      content: "已更新候选技术方向",
      key: "refresh-candidates",
    });
  };

  const handleAnalyze = () => {
    if (selectedDirections.length === 0) {
      const warning = "请至少选择 1 个技术方向";
      message.warning({ content: warning, key: "direction-empty-warning" });
      setStatusMessage(warning);
      return;
    }

    onUpdateState({ isAnalyzing: true });
    setTimeout(() => {
      onUpdateState({ isAnalyzing: false, showAnalysis: true });
      onAnalyze();
    }, 600);
  };

  return (
    <div className="max-w-[1280px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
      <div className="mx-auto w-full">
        <main className="space-y-[18px]">
          <section className="overflow-hidden bg-white border border-[#e5eaf3] rounded-[24px] shadow-[0_14px_32px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-3 border-b border-[#e5eaf3] bg-linear-to-br from-[#f8fbff] to-white p-[22px_22px_14px]">
              <h1 className="text-[24px] font-black m-0 text-[#102039]">
                目标拆解
              </h1>
              <p className="m-0 text-right text-[#64748b] text-[14px] leading-[1.65]">
                {taskName}
              </p>
            </div>

            <div className="p-[14px_22px_22px]">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h2 className="text-[22px] font-black m-0 text-[#102039]">
                    已选技术方向
                  </h2>
                  {statusMessage && (
                    <p className="mt-1.5 m-0 text-[13px] font-bold text-[#2563eb]">
                      {statusMessage}
                    </p>
                  )}
                </div>
                <div className="inline-flex h-8 items-center rounded-full border border-[#d7e4ff] bg-[#f8fbff] px-3 text-[13px] font-extrabold text-[#2563eb]">
                  已选 {selectedCount}/3
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3.5">
                {selectedDirections.map((direction) => (
                  <article
                    key={direction.id}
                    className="min-h-[188px] rounded-[18px] border border-[#7aa2ff] bg-linear-to-b from-white to-[#fbfdff] p-[14px] shadow-[0_8px_18px_rgba(47,109,246,0.08)]"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <span className="text-[12px] font-extrabold text-[#94a3b8]">
                            方向名称
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full border border-[#d7e4ff] bg-[#f8fbff] px-2 py-1 text-[11px] font-extrabold text-[#2563eb]">
                            <PencilLine className="size-3" />
                            可编辑
                          </span>
                        </div>
                        <Textarea
                          aria-label="技术方向标题"
                          value={direction.title}
                          placeholder="输入方向名称"
                          onChange={(event) =>
                            handleUpdateDirection(
                              direction.id,
                              "title",
                              event.target.value,
                            )
                          }
                          className="min-h-[48px] resize-none rounded-[12px] border border-transparent bg-[#f8fbff] px-3 py-2 text-[16px] font-black leading-[1.35] text-[#102039] shadow-none transition-colors placeholder:text-[#b7c3d5] hover:border-[#d7e4ff] focus-visible:border-[#2563eb] focus-visible:bg-white focus-visible:ring-0"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSelected(direction.id)}
                        aria-label={`移除${direction.title}`}
                        className="inline-flex size-[30px] shrink-0 items-center justify-center rounded-[10px] border border-[#dce6f6] bg-white text-[#6d7890] transition hover:-translate-y-0.5 hover:border-[#ffd5d5] hover:bg-[#fff1f1] hover:text-[#ef4444]"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="mb-2 mt-3 text-[12px] font-extrabold text-[#94a3b8]">
                      分析说明
                    </div>
                    <Textarea
                      aria-label="技术方向说明"
                      value={direction.description}
                      placeholder="输入分析说明"
                      onChange={(event) =>
                        handleUpdateDirection(
                          direction.id,
                          "description",
                          event.target.value,
                        )
                      }
                      className="min-h-[68px] resize-none rounded-[12px] border border-transparent bg-[#f8fbff] px-3 py-2 text-[14px] leading-[1.65] text-[#5d6f8a] shadow-none transition-colors placeholder:text-[#b7c3d5] hover:border-[#d7e4ff] focus-visible:border-[#2563eb] focus-visible:bg-white focus-visible:ring-0"
                    />
                  </article>
                ))}
                {selectedCount < MAX_SELECTED_DIRECTIONS && (
                  <div className="min-h-[188px] rounded-[18px] border border-dashed border-[#cfdbea] bg-[#fafcff] p-5 text-[13px] font-bold text-[#9aa6ba] flex items-center justify-center text-center">
                    可继续选择
                    {MAX_SELECTED_DIRECTIONS - selectedCount}
                    个候选方向
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="bg-white border border-[#e5eaf3] rounded-[24px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-[22px] font-black m-0 text-[#102039]">
                候选技术方向
              </h2>
              <div className="text-[13px] font-bold text-[#64748b]">
                更新候选不会影响已选方向
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">
              <Textarea
                value={preference}
                onChange={(event) => setPreference(event.target.value)}
                placeholder="例如：更关注压实密度和循环寿命，暂不关注负极材料和电解液方向。"
                className="min-h-[86px] resize-y rounded-[16px] border-[#dfe7f2] bg-[#fbfcff] px-4 py-3 text-[14px] leading-[1.6] text-[#102039] focus-visible:border-[#adc5ff] focus-visible:ring-0"
              />
              <Button
                onClick={handleRefreshCandidates}
                className="h-[44px] rounded-[14px] bg-[#2563eb] px-[18px] font-extrabold text-white shadow-[0_10px_20px_rgba(37,99,235,0.18)] hover:bg-[#1d4ed8]"
              >
                <RotateCcw data-icon="inline-start" />
                更新候选
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3.5 pt-5">
              {candidateDirections.map((direction) => (
                <article
                  key={direction.id}
                  className={`min-h-[150px] rounded-[18px] border bg-white p-[14px] transition-all hover:border-[#bdd1ff] hover:shadow-[0_8px_18px_rgba(47,109,246,0.06)] ${
                    blockedDirectionId === direction.id
                      ? "border-[#f59e0b] bg-[#fffaf0] shadow-[inset_0_0_0_3px_#fff1cf]"
                      : "border-[#dfe7f2]"
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="rounded-[12px] bg-[#f8fbff] px-3 py-2 text-[15px] font-black leading-[1.35] text-[#102039]">
                        {direction.title}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddCandidate(direction.id)}
                      className="inline-flex h-[30px] shrink-0 items-center justify-center gap-1 rounded-full border border-[#dce6f6] bg-white px-3 text-[12px] font-black text-[#3f6cf6] transition hover:-translate-y-0.5 hover:border-[#b8cdf8] hover:bg-[#f7faff]"
                    >
                      <Plus className="size-3.5" />
                      加入
                    </button>
                  </div>
                  <div className="mt-3 min-h-[58px] rounded-[12px] bg-[#f8fbff] px-3 py-2 text-[13px] leading-[1.6] text-[#5a667c]">
                    {direction.description}
                  </div>
                </article>
              ))}
            </div>
            <div className="flex flex-col gap-3 pt-5 md:flex-row md:items-center md:justify-between">
              <div className="text-[13px] text-[#64748b]">
                {selectedCount > 0
                  ? `已选择 ${selectedCount} 个技术方向`
                  : "请至少选择 1 个技术方向"}
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || selectedDirections.length === 0}
                className={`h-[46px] px-[22px] rounded-[14px] font-extrabold ${
                  isAnalyzing
                    ? "bg-[#f1f5f9] text-[#94a3b8] shadow-none"
                    : "bg-[#2563eb] text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:bg-[#1d4ed8]"
                }`}
              >
                {isAnalyzing
                  ? "正在分析线索..."
                  : showAnalysis
                    ? "查看线索分析 →"
                    : "进入线索分析 →"}
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
