import { useEffect, useMemo, useRef, useState } from "react";
import { LoaderCircle, PencilLine, Plus, X } from "lucide-react";
import { message } from "antd";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Direction = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  query: string;
  source: string;
};

type ProcessMessage = {
  title: string;
  text: string;
  sources?: string[];
};

type AnalysisRound = {
  id: number;
  name: string;
  status: "running" | "done";
  instruction: string;
  messages: ProcessMessage[];
};

const TASK_INSTRUCTION =
  "钠电池正极材料方向，关注压实密度、循环寿命、低成本和储能场景。";

const INITIAL_SELECTED_DIRECTIONS: Direction[] = [
  {
    id: 1,
    title: "层状氧化物正极材料企业",
    description: "优先挖掘，产业化路径较清晰。",
    tags: ["产业化路径", "高压实"],
    query: '("层状氧化物" OR "钠电正极") AND (压实密度 OR 循环寿命 OR 量产)',
    source: "初始分析",
  },
  {
    id: 2,
    title: "聚阴离子正极材料企业",
    description: "适合寻找技术壁垒型企业。",
    tags: ["安全性", "技术壁垒"],
    query: '("聚阴离子" OR "磷酸盐正极") AND (钠离子电池 OR 钠电池)',
    source: "初始分析",
  },
  {
    id: 3,
    title: "普鲁士蓝类材料企业",
    description: "成本优势明显，商业化需验证。",
    tags: ["低成本", "商业化验证"],
    query: '("普鲁士蓝" OR "普鲁士白") AND (钠电池 OR 正极材料 OR 储能)',
    source: "初始分析",
  },
];

const CANDIDATE_DIRECTIONS_A: Direction[] = [
  {
    id: 4,
    title: "正极材料包覆改性企业",
    description: "关注循环寿命、安全性和稳定性提升。",
    tags: ["循环寿命", "界面稳定"],
    query:
      '("钠电正极" AND (包覆 OR 改性 OR 界面稳定)) AND (循环寿命 OR 安全性)',
    source: "初始分析",
  },
  {
    id: 5,
    title: "低成本前驱体企业",
    description: "关注规模化制备和成本控制。",
    tags: ["低成本", "规模制备"],
    query:
      '("钠电正极前驱体" OR "正极前驱体") AND (低成本 OR 规模化 OR 合成工艺)',
    source: "初始分析",
  },
  {
    id: 6,
    title: "储能场景材料企业",
    description: "关注长循环、低温性能和工程化应用。",
    tags: ["储能场景", "长循环"],
    query: '("钠离子电池" AND 储能) AND (长循环 OR 低温性能 OR 工程化)',
    source: "初始分析",
  },
  {
    id: 7,
    title: "钠电材料回收企业",
    description: "关注回收体系和闭环产业链潜力。",
    tags: ["闭环供应链", "回收"],
    query: '("钠电池" AND (回收 OR 再生 OR 闭环供应链)) AND 正极材料',
    source: "初始分析",
  },
];

const CANDIDATE_DIRECTIONS_B: Direction[] = [
  {
    id: 8,
    title: "层状氧化物高压实企业",
    description: "聚焦压实密度、倍率性能和量产指标。",
    tags: ["高压实", "倍率性能"],
    query: '("层状氧化物" AND (高压实 OR 压实密度 OR 倍率性能)) AND 钠电',
    source: "更新分析",
  },
  {
    id: 9,
    title: "聚阴离子安全型企业",
    description: "关注安全性、长循环和储能验证。",
    tags: ["安全性", "储能验证"],
    query: '("聚阴离子" AND (安全性 OR 长循环 OR 储能验证)) AND 钠离子电池',
    source: "更新分析",
  },
  {
    id: 10,
    title: "低温性能材料企业",
    description: "关注低温容量保持率和北方储能应用。",
    tags: ["低温性能", "应用场景"],
    query: '("钠电池正极" AND (低温 OR 容量保持率 OR 北方储能))',
    source: "更新分析",
  },
  {
    id: 11,
    title: "钠电正极添加剂企业",
    description: "关注改善循环、倍率和界面稳定性。",
    tags: ["添加剂", "界面稳定"],
    query: '("钠电正极" AND (添加剂 OR 掺杂 OR 界面改性)) AND (循环 OR 倍率)',
    source: "更新分析",
  },
];

const MAX_SELECTED_DIRECTIONS = 3;
const DIRECTION_LIMIT_WARNING = "最多选择 3 个技术方向，请先取消一个已选方向";
const UPDATE_STEP_INTERVAL_MS = 1100;
const CANDIDATE_SKELETON_COUNT = 4;

function createInitialRound(taskName: string): AnalysisRound {
  return {
    id: 1,
    name: "初始分析",
    status: "done",
    instruction: TASK_INSTRUCTION,
    messages: [
      {
        title: "任务理解",
        text: `识别到用户希望围绕${taskName}，寻找产业化路径清晰、具备规模化潜力的技术方向，并用于后续企业线索挖掘。`,
      },
      {
        title: "技术路线识别",
        text: "围绕层状氧化物、聚阴离子、普鲁士蓝类、包覆改性、前驱体和储能应用等方向，整理技术成熟度、产业化进展和可检索专利关键词。",
      },
      {
        title: "方向推演",
        text: "综合材料壁垒、工程化难度、商业化验证和企业可挖掘性，形成当前候选技术方向。",
      },
      {
        title: "检索式构建",
        text: "已为每个候选方向生成专利检索式，可用于下一步从专利和企业主体中发现候选企业。",
      },
      {
        title: "本轮结果",
        text: `已生成 ${CANDIDATE_DIRECTIONS_A.length} 个候选技术方向。主页面仅展示当前轮次候选结果，历史过程可在这里回看。`,
        sources: [
          "钠电正极材料主要路线包括层状氧化物、聚阴离子和普鲁士蓝类材料。",
          "产业化关注点包括压实密度、循环寿命、成本控制和储能场景验证。",
          "后续企业挖掘将基于方向名称、关键材料、工艺和应用场景构建检索。",
        ],
      },
    ],
  };
}

function CandidateDirectionSkeletonCards() {
  return Array.from({ length: CANDIDATE_SKELETON_COUNT }).map(
    (_, skeletonIndex) => (
      <article
        key={`candidate-direction-skeleton-${skeletonIndex}`}
        className="min-h-[150px] rounded-[18px] border border-[#dfe7f2] bg-white p-[14px] shadow-[0_8px_18px_rgba(18,39,80,0.03)]"
      >
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="h-[38px] flex-1 animate-pulse rounded-[12px] bg-[#eef4ff]" />
          <div className="h-[30px] w-[66px] animate-pulse rounded-full bg-[#eef4ff]" />
        </div>
        <div className="mt-3 space-y-2 rounded-[12px] bg-[#f8fbff] px-3 py-3">
          <div className="h-3 animate-pulse rounded-full bg-[#e2ebfb]" />
          <div className="h-3 w-5/6 animate-pulse rounded-full bg-[#e2ebfb]" />
          <div className="h-3 w-2/3 animate-pulse rounded-full bg-[#e2ebfb]" />
        </div>
      </article>
    ),
  );
}

function DirectionTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-full bg-[#f2f5fa] px-2 py-1 text-[12px] font-extrabold leading-none text-[#5d687b]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

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
  const taskName = state.taskInput?.trim() || "钠电池正极材料方向企业挖掘";
  const [selectedDirections, setSelectedDirections] = useState<Direction[]>(
    INITIAL_SELECTED_DIRECTIONS,
  );
  const [candidateDirections, setCandidateDirections] = useState<Direction[]>(
    CANDIDATE_DIRECTIONS_A,
  );
  const [analysisRounds, setAnalysisRounds] = useState<AnalysisRound[]>(() => [
    createInitialRound(taskName),
  ]);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [detailDirection, setDetailDirection] = useState<Direction | null>(
    null,
  );
  const [usesCandidateSetB, setUsesCandidateSetB] = useState(false);
  const [updateRoundCount, setUpdateRoundCount] = useState(0);
  const [isUpdatingCandidates, setIsUpdatingCandidates] = useState(false);
  const [preference, setPreference] = useState(
    "更关注产业路径清晰、成本下降空间明显、已有商业化验证的技术方向。",
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [blockedDirectionId, setBlockedDirectionId] = useState<number | null>(
    null,
  );
  const updateTimerRef = useRef<number | null>(null);
  const processLogRef = useRef<HTMLDivElement | null>(null);

  const selectedCount = selectedDirections.length;

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

  useEffect(() => {
    return () => {
      if (updateTimerRef.current) {
        window.clearInterval(updateTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!drawerOpen || detailDirection) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (processLogRef.current) {
        processLogRef.current.scrollTop = processLogRef.current.scrollHeight;
      }
    }, 50);

    return () => window.clearTimeout(timer);
  }, [analysisRounds, detailDirection, drawerOpen]);

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
    if (isUpdatingCandidates) {
      setStatusMessage("分析中，请稍候");
      return;
    }

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
    setDetailDirection(null);
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
    if (isUpdatingCandidates) {
      return;
    }

    const nextRoundIndex = updateRoundCount + 1;
    const roundId = Date.now();
    const roundName = `更新分析 ${nextRoundIndex}`;
    const instruction = preference.trim() || "根据当前偏好重新生成候选方向。";
    const source = usesCandidateSetB
      ? CANDIDATE_DIRECTIONS_A
      : CANDIDATE_DIRECTIONS_B;
    const selectedIds = new Set(selectedDirections.map((item) => item.id));
    const steps: ProcessMessage[] = [
      {
        title: "理解调整指令",
        text: "正在识别新的偏好条件，并保留上方已选技术方向不变。",
      },
      {
        title: "重新筛选候选方向",
        text: "正在降低不符合偏好的方向权重，提高产业化、成本、安全性和可检索性权重。",
      },
      {
        title: "方向推演",
        text: "正在生成新的候选方向，并合并相近技术路线。",
      },
      {
        title: "检索式构建",
        text: "正在为新候选方向生成专利检索式和构建理由。",
      },
      {
        title: "本轮结果",
        text: `已根据更新指令生成 ${source.length} 个候选方向。主页面候选卡片已替换为本轮结果。`,
        sources: [
          "已选方向保持不变，仅更新候选方向集合。",
          "本轮分析过程已保存，可继续向上回看历史分析。",
          "候选卡片只展示当前轮次结果，避免历史候选混杂。",
        ],
      },
    ];

    if (updateTimerRef.current) {
      window.clearInterval(updateTimerRef.current);
    }

    setDetailDirection(null);
    setDrawerOpen(true);
    setUpdateRoundCount(nextRoundIndex);
    setIsUpdatingCandidates(true);
    setBlockedDirectionId(null);
    setStatusMessage("AI 正在生成候选技术方向");
    setAnalysisRounds((rounds) => [
      ...rounds,
      {
        id: roundId,
        name: roundName,
        status: "running",
        instruction,
        messages: [],
      },
    ]);

    let stepIndex = 0;
    updateTimerRef.current = window.setInterval(() => {
      const nextMessage = steps[stepIndex];

      setAnalysisRounds((rounds) =>
        rounds.map((round) =>
          round.id === roundId
            ? { ...round, messages: [...round.messages, nextMessage] }
            : round,
        ),
      );

      stepIndex += 1;

      if (stepIndex >= steps.length) {
        if (updateTimerRef.current) {
          window.clearInterval(updateTimerRef.current);
          updateTimerRef.current = null;
        }

        setAnalysisRounds((rounds) =>
          rounds.map((round) =>
            round.id === roundId ? { ...round, status: "done" } : round,
          ),
        );
        setCandidateDirections(
          source
            .filter((direction) => !selectedIds.has(direction.id))
            .map((direction) => ({ ...direction, source: roundName })),
        );
        setUsesCandidateSetB(!usesCandidateSetB);
        setIsUpdatingCandidates(false);
        setStatusMessage("已更新候选技术方向");
        message.success({
          content: "已更新候选技术方向",
          key: "refresh-candidates",
        });
      }
    }, UPDATE_STEP_INTERVAL_MS);
  };

  const handleShowCandidateDetail = (direction: Direction) => {
    setDetailDirection(direction);
    setDrawerOpen(true);
  };

  const handleOpenProcessDrawer = () => {
    setDetailDirection(null);
    setDrawerOpen(true);
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
    <PageShell>
      <div className="mx-auto w-full">
        <main className="space-y-[18px]">
          <section className="overflow-hidden bg-white border border-[#e5eaf3] rounded-[24px] shadow-[0_14px_32px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-3 border-b border-[#e5eaf3] p-[20px_24px] max-md:flex-col max-md:items-start max-md:p-[18px_20px]">
              <h1 className="text-[24px] font-black m-0 text-[#102039]">
                目标拆解
              </h1>
              <p className="m-0 text-right text-[13px] font-bold text-[#8a96a8] leading-[1.65] max-md:text-left">
                当前任务：
                <strong className="font-black text-[#526078]">
                  {taskName}
                </strong>
              </p>
            </div>

            <div className="mx-6 mt-[14px] flex items-center gap-2.5 rounded-[14px] border border-[#e5eaf3] bg-[#fbfdff] px-[14px] py-3 text-[13px] leading-[1.6] text-[#536177] max-md:mx-[18px] max-md:flex-col max-md:items-start">
              <span className="shrink-0 rounded-full bg-[#edf4ff] px-[9px] py-[5px] text-[12px] font-black text-[#2f6df6]">
                任务指令
              </span>
              <span>{TASK_INSTRUCTION}</span>
            </div>

            <div className="p-[18px_24px_24px] max-md:p-[18px]">
              <div className="mb-[18px] flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-[20px] font-black m-0 text-[#102039]">
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

              <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3.5">
                {selectedDirections.map((direction) => (
                  <article
                    key={direction.id}
                    className="rounded-[18px] border border-[#7aa2ff] bg-linear-to-b from-white to-[#fbfdff] p-[14px] shadow-[0_8px_18px_rgba(47,109,246,0.08)] transition"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
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
                          className="min-h-[42px] resize-none rounded-[12px] border border-transparent bg-[#f8fbff] px-3 py-2 text-[15px] font-black leading-[1.35] text-[#102039] shadow-none transition-colors placeholder:text-[#b7c3d5] hover:border-[#d7e4ff] focus-visible:border-[#2563eb] focus-visible:bg-white focus-visible:ring-0"
                        />
                      </div>
                      <span className="inline-flex size-[30px] shrink-0 items-center justify-center rounded-[10px] border border-[#dce6f6] bg-white text-[#6d7890]">
                        <PencilLine className="size-4" />
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSelected(direction.id)}
                        aria-label={`移除${direction.title}`}
                        className="inline-flex size-[30px] shrink-0 items-center justify-center rounded-[10px] border border-[#dce6f6] bg-white text-[#6d7890] transition hover:-translate-y-0.5 hover:border-[#ffd5d5] hover:bg-[#fff1f1] hover:text-[#ef4444]"
                      >
                        <X className="size-4" />
                      </button>
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
                      className="mt-3 min-h-[58px] resize-none rounded-[12px] border border-transparent bg-[#f8fbff] px-3 py-2 text-[13px] leading-[1.6] text-[#5d6f8a] shadow-none transition-colors placeholder:text-[#b7c3d5] hover:border-[#d7e4ff] focus-visible:border-[#2563eb] focus-visible:bg-white focus-visible:ring-0"
                    />
                    <DirectionTags tags={direction.tags} />
                    <div className="mt-3 text-[11px] font-extrabold text-[#8a96a8]">
                      来自：{direction.source}
                    </div>
                  </article>
                ))}
                {selectedCount < MAX_SELECTED_DIRECTIONS && (
                  <div className="min-h-[146px] rounded-[18px] border border-dashed border-[#cfdbea] bg-[#fafcff] p-5 text-[13px] font-bold text-[#9aa6ba] flex items-center justify-center text-center">
                    可继续选择
                    {MAX_SELECTED_DIRECTIONS - selectedCount}
                    个候选方向
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="overflow-hidden bg-white border border-[#e5eaf3] rounded-[24px] shadow-[0_14px_32px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col gap-2 p-[18px_24px_0] md:flex-row md:items-center md:justify-between max-md:px-[18px]">
              <h2 className="text-[20px] font-black m-0 text-[#102039]">
                候选技术方向
              </h2>
            </div>
            <div className="p-[16px_24px_24px] max-md:p-[16px_18px_24px]">
              <div className="relative mb-4 overflow-hidden rounded-[18px] border border-[#e5eaf3] bg-white shadow-[0_8px_18px_rgba(18,39,80,0.03)] focus-within:border-[#a9c2ff] focus-within:shadow-[0_0_0_4px_rgba(47,109,246,0.08),0_8px_18px_rgba(18,39,80,0.03)]">
                <Textarea
                  value={preference}
                  onChange={(event) => setPreference(event.target.value)}
                  placeholder="告诉 AI 你想如何调整候选方向，例如：更关注产业化落地，减少偏材料基础研究的方向"
                  className="min-h-[92px] resize-y rounded-none border-0 bg-white py-4 pl-4 pr-[126px] text-[13px] leading-[1.6] text-[#25324a] shadow-none focus-visible:ring-0 max-md:min-h-[128px] max-md:pb-[68px] max-md:pr-4"
                />
                <button
                  type="button"
                  onClick={handleRefreshCandidates}
                  disabled={isUpdatingCandidates}
                  className={`absolute right-[14px] top-1/2 inline-flex h-10 -translate-y-1/2 items-center justify-center gap-1.5 rounded-[13px] px-[14px] text-[14px] font-black transition max-md:bottom-[14px] max-md:top-auto max-md:translate-y-0 ${
                    isUpdatingCandidates
                      ? "cursor-not-allowed bg-[#e8eef9] text-[#8a96a8]"
                      : "bg-[#2f6df6] text-white hover:bg-[#275de0]"
                  }`}
                >
                  {isUpdatingCandidates ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      分析中
                    </>
                  ) : (
                    <>
                      <span className="text-[15px] leading-none">↻</span>
                      更新分析
                    </>
                  )}
                </button>
              </div>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3.5 ${
                  isUpdatingCandidates
                    ? "pointer-events-none opacity-80"
                    : "opacity-100"
                }`}
              >
                {isUpdatingCandidates ? (
                  <CandidateDirectionSkeletonCards />
                ) : (
                  candidateDirections.map((direction) => (
                    <article
                      key={direction.id}
                      onClick={() => handleShowCandidateDetail(direction)}
                      className={`min-h-[150px] cursor-pointer rounded-[18px] border bg-white p-[14px] transition-all hover:-translate-y-0.5 hover:border-[#bdd1ff] hover:shadow-[0_8px_18px_rgba(47,109,246,0.06)] ${
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
                          onClick={(event) => {
                            event.stopPropagation();
                            handleAddCandidate(direction.id);
                          }}
                          className="inline-flex h-[30px] shrink-0 items-center justify-center gap-1 rounded-full border border-[#dce6f6] bg-white px-3 text-[12px] font-black text-[#3f6cf6] transition hover:-translate-y-0.5 hover:border-[#b8cdf8] hover:bg-[#f7faff]"
                        >
                          <Plus className="size-3.5" />
                          加入
                        </button>
                      </div>
                      <div className="mt-3 min-h-[58px] rounded-[12px] bg-[#f8fbff] px-3 py-2 text-[13px] leading-[1.6] text-[#5a667c]">
                        {direction.description}
                      </div>
                      <DirectionTags tags={direction.tags} />
                    </article>
                  ))
                )}
              </div>
            </div>
          </section>

          <div className="sticky bottom-4 z-20 mt-[18px] flex items-center justify-between gap-4 rounded-[18px] border border-[#e5eaf3] bg-white/90 px-4 py-3 text-[13px] text-[#647087] shadow-[0_14px_34px_rgba(18,39,80,0.12)] backdrop-blur-[10px] max-md:bottom-3 max-md:flex-col max-md:items-stretch">
            <div>
              <div className="text-[14px] font-bold text-[#102039]">
                {isUpdatingCandidates
                  ? "AI 正在更新候选方向，请稍候"
                  : selectedDirections.length > 0
                    ? `已选择 ${selectedDirections.length} 个技术方向`
                    : "请至少选择 1 个技术方向"}
              </div>
              <div className="mt-1 text-[12px] font-bold text-[#8793a7]">
                已选方向将用于下一步线索分析。
              </div>
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={
                isAnalyzing ||
                isUpdatingCandidates ||
                selectedDirections.length === 0
              }
              className={`h-10 rounded-[12px] px-[14px] font-extrabold ${
                isAnalyzing || isUpdatingCandidates
                  ? "bg-[#f1f5f9] text-[#94a3b8] shadow-none"
                  : "bg-[#2f6df6] text-white shadow-[0_10px_20px_rgba(47,109,246,0.16)] hover:bg-[#2f6df6]"
              }`}
            >
              {isAnalyzing
                ? "正在分析线索..."
                : showAnalysis
                  ? "查看线索分析 →"
                  : "进入线索分析 →"}
            </Button>
          </div>
        </main>
      </div>

      {!drawerOpen && (
        <button
          type="button"
          onClick={handleOpenProcessDrawer}
          className="fixed bottom-[94px] right-7 z-30 inline-flex h-11 items-center gap-2 rounded-full border border-[#c7d8ff] bg-white px-4 text-[13px] font-black text-[#2f6df6] shadow-[0_14px_34px_rgba(18,39,80,0.16)] transition hover:-translate-y-0.5 hover:bg-[#f8fbff] max-md:right-4"
        >
          <span className="size-2 rounded-full bg-[#2f6df6] shadow-[0_0_0_4px_#edf4ff]" />
          查看分析过程
        </button>
      )}

      <aside
        className={`fixed right-0 top-0 z-40 flex h-screen w-[460px] max-w-[92vw] flex-col border-l border-[#e3ebf6] bg-white shadow-[-18px_0_44px_rgba(15,30,60,0.18)] transition-transform duration-200 ${
          drawerOpen ? "translate-x-0" : "translate-x-[104%]"
        }`}
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#e3ebf6] bg-linear-to-b from-white to-[#fbfdff] px-[18px] py-[16px]">
          <div className="min-w-0">
            <h2 className="m-0 text-[20px] font-black leading-[1.35] text-[#102039]">
              {detailDirection ? "候选方向详情" : "AI分析过程"}
            </h2>
            <p className="m-0 mt-1.5 text-[13px] leading-[1.5] text-[#7b879b]">
              {detailDirection
                ? "查看候选方向的分析说明和检索式。"
                : isUpdatingCandidates
                  ? "正在生成新的候选方向，已选方向保持不变。"
                  : "每次开始分析和更新分析的过程都会保留在这里。"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-[12px] border border-[#e3ebf6] bg-[#f7f9fd] text-[#6d7890] transition hover:border-[#cbd8eb] hover:text-[#102039]"
            aria-label="关闭分析过程"
          >
            <X className="size-4" />
          </button>
        </div>

        <div
          ref={processLogRef}
          className="min-h-0 flex-1 overflow-auto bg-[#fbfdff] px-[18px] py-4"
        >
          {detailDirection ? (
            <section>
              <div className="my-3 flex items-center gap-2 text-[12px] font-black text-[#7b879b] before:h-px before:flex-1 before:bg-[#e1e9f5] after:h-px after:flex-1 after:bg-[#e1e9f5]">
                候选方向详情
              </div>
              <div className="rounded-[16px] border border-[#e3ebf6] bg-white p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[14px] font-black text-[#13213a]">
                      {detailDirection.title}
                    </div>
                    <div className="mt-1.5 text-[12px] leading-[1.6] text-[#526078]">
                      来自：{detailDirection.source}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#eaf8f0] px-2 py-1 text-[11px] font-black text-[#18a957]">
                    方向详情
                  </span>
                </div>
                <DirectionTags tags={detailDirection.tags} />
              </div>

              <div className="mt-3 grid gap-2.5">
                {[
                  {
                    title: detailDirection.title,
                    text: detailDirection.description,
                  },
                  {
                    title: "专利检索式",
                    text: detailDirection.query,
                  },
                  {
                    title: "构建理由",
                    text: "该方向与当前任务的产业化、低成本、安全性和规模化偏好相关，适合进入后续企业线索发现流程。",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="grid grid-cols-[28px_1fr] items-start gap-2.5"
                  >
                    <div className="flex size-7 items-center justify-center rounded-[10px] bg-[#edf4ff] text-[12px] font-black text-[#2f6df6]">
                      AI
                    </div>
                    <div className="rounded-[16px] border border-[#e3ebf6] bg-white px-3 py-2.5 text-[13px] leading-[1.75] text-[#43506a]">
                      <div className="mb-1 text-[13px] font-black text-[#13213a]">
                        {item.title}
                      </div>
                      <div>{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  onClick={() => handleAddCandidate(detailDirection.id)}
                  disabled={
                    isUpdatingCandidates ||
                    selectedDirections.length >= MAX_SELECTED_DIRECTIONS
                  }
                  className="h-10 rounded-[12px] bg-[#2f6df6] px-4 font-black text-white hover:bg-[#275de0]"
                >
                  加入已选
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setDetailDirection(null)}
                  className="h-10 rounded-[12px] border-[#e3ebf6] bg-white px-4 font-black text-[#102039] hover:border-[#cbd8eb]"
                >
                  返回过程
                </Button>
              </div>
            </section>
          ) : (
            analysisRounds.map((round) => (
              <section key={round.id} className="mb-[18px]">
                <div className="my-3 flex items-center gap-2 text-[12px] font-black text-[#7b879b] before:h-px before:flex-1 before:bg-[#e1e9f5] after:h-px after:flex-1 after:bg-[#e1e9f5]">
                  {round.name}
                </div>
                <div className="mb-2.5 rounded-[16px] border border-[#e3ebf6] bg-white p-3">
                  <div className="mb-1.5 flex items-center justify-between gap-2 text-[14px] font-black text-[#13213a]">
                    <span>{round.name}</span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-black ${
                        round.status === "running"
                          ? "bg-[#edf4ff] text-[#2f6df6]"
                          : "bg-[#eaf8f0] text-[#18a957]"
                      }`}
                    >
                      {round.status === "running" ? "进行中" : "已完成"}
                    </span>
                  </div>
                  <div className="text-[12px] leading-[1.7] text-[#526078]">
                    指令：{round.instruction}
                  </div>
                </div>
                <div className="grid gap-2.5">
                  {round.messages.map((processMessage, messageIndex) => (
                    <div
                      key={`${round.id}-${processMessage.title}-${messageIndex}`}
                      className="grid grid-cols-[28px_1fr] items-start gap-2.5"
                    >
                      <div className="flex size-7 items-center justify-center rounded-[10px] bg-[#edf4ff] text-[12px] font-black text-[#2f6df6]">
                        AI
                      </div>
                      <div className="rounded-[16px] border border-[#e3ebf6] bg-white px-3 py-2.5 text-[13px] leading-[1.75] text-[#43506a]">
                        <div className="mb-1 text-[13px] font-black text-[#13213a]">
                          {processMessage.title}
                        </div>
                        <div>{processMessage.text}</div>
                        {processMessage.sources && (
                          <div className="mt-2 grid gap-1.5 border-t border-dashed border-[#e1e9f5] pt-2">
                            {processMessage.sources.map((source) => (
                              <div
                                key={source}
                                className="rounded-[10px] bg-[#f8fafd] px-2.5 py-2 text-[12px] leading-[1.55] text-[#607089]"
                              >
                                {source}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {round.status === "running" && (
                    <div className="grid grid-cols-[28px_1fr] items-start gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-[10px] bg-[#edf4ff] text-[12px] font-black text-[#2f6df6]">
                        AI
                      </div>
                      <div className="inline-flex w-fit items-center gap-2 rounded-[16px] border border-[#cfe0ff] bg-white px-3 py-2 text-[12px] font-black text-[#2f6df6]">
                        <LoaderCircle className="size-3.5 animate-spin" />
                        正在分析...
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ))
          )}
        </div>
      </aside>
    </PageShell>
  );
}
