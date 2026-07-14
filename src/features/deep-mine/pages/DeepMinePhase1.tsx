import { useEffect, useMemo, useRef, useState } from "react";
import {
  LoaderCircle,
  PanelRightOpen,
  PencilLine,
  Plus,
  X,
} from "lucide-react";
import { message } from "antd";
import { Resizable } from "re-resizable";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AnalysisProcessTimeline,
  type ProcessEvent,
} from "../components/AnalysisProcessTimeline";

type Direction = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  query: string;
  source: string;
};

type AnalysisRound = {
  id: number;
  name: string;
  status: "running" | "done";
  instruction: string;
  messages: ProcessEvent[];
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
    source: "AI 生成",
  },
  {
    id: 2,
    title: "聚阴离子正极材料企业",
    description: "适合寻找技术壁垒型企业。",
    tags: ["安全性", "技术壁垒"],
    query: '("聚阴离子" OR "磷酸盐正极") AND (钠离子电池 OR 钠电池)',
    source: "AI 生成",
  },
  {
    id: 3,
    title: "普鲁士蓝类材料企业",
    description: "成本优势明显，商业化需验证。",
    tags: ["低成本", "商业化验证"],
    query: '("普鲁士蓝" OR "普鲁士白") AND (钠电池 OR 正极材料 OR 储能)',
    source: "AI 生成",
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
    source: "AI 生成",
  },
  {
    id: 5,
    title: "低成本前驱体企业",
    description: "关注规模化制备和成本控制。",
    tags: ["低成本", "规模制备"],
    query:
      '("钠电正极前驱体" OR "正极前驱体") AND (低成本 OR 规模化 OR 合成工艺)',
    source: "AI 生成",
  },
  {
    id: 6,
    title: "储能场景材料企业",
    description: "关注长循环、低温性能和工程化应用。",
    tags: ["储能场景", "长循环"],
    query: '("钠离子电池" AND 储能) AND (长循环 OR 低温性能 OR 工程化)',
    source: "AI 生成",
  },
  {
    id: 7,
    title: "钠电材料回收企业",
    description: "关注回收体系和闭环产业链潜力。",
    tags: ["闭环供应链", "回收"],
    query: '("钠电池" AND (回收 OR 再生 OR 闭环供应链)) AND 正极材料',
    source: "AI 生成",
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
const DRAWER_WIDTH_STORAGE_KEY = "deep-mine-analysis-drawer-width";
const DEFAULT_DRAWER_WIDTH = 460;
const MIN_DRAWER_WIDTH = 360;

function getInitialDrawerWidth() {
  const storedWidth = Number(
    window.localStorage.getItem(DRAWER_WIDTH_STORAGE_KEY),
  );
  const maxWidth = window.innerWidth * 0.75;
  if (!Number.isFinite(storedWidth) || storedWidth <= 0) {
    return Math.min(DEFAULT_DRAWER_WIDTH, maxWidth);
  }
  return Math.min(
    Math.max(storedWidth, Math.min(MIN_DRAWER_WIDTH, maxWidth)),
    maxWidth,
  );
}

function createTargetAnalysis(taskName: string): AnalysisRound {
  return {
    id: 1,
    name: "目标拆解过程",
    status: "done",
    instruction: TASK_INSTRUCTION,
    messages: [
      {
        kind: "reasoning",
        text: `需要围绕“${taskName}”形成一组可用于企业挖掘的技术方向。分析将面向整体赛道，不逐个解释单个候选方向。`,
      },
      {
        kind: "web-search",
        round: 1,
        text: "先建立赛道技术路线全景，确认主流材料体系及近期产业进展。",
        resultCount: 8,
      },
      {
        kind: "reasoning",
        text: "首轮结果覆盖了主要材料路线，但对用户关注的压实密度、循环寿命、成本和储能验证仍不够具体，需要补充工程化指标。",
      },
      {
        kind: "web-search",
        round: 2,
        text: "围绕关键性能指标和量产约束补充检索，比较不同技术路线的产业化条件。",
        resultCount: 6,
      },
      {
        kind: "reasoning",
        text: "性能信息已经足够，但还需确认哪些方向已有企业、专利和商业化信号，避免生成过于学术化或无法落地检索的方向。",
      },
      {
        kind: "web-search",
        round: 3,
        text: "补充企业布局、专利活跃度及示范应用信息，验证方向是否适合后续企业线索发现。",
        resultCount: 7,
      },
      {
        kind: "answer",
        text: `综合三轮检索结果，建议从主流材料体系、性能改性、上游前驱体和储能应用四个层面拆解目标，共形成 ${INITIAL_SELECTED_DIRECTIONS.length + CANDIDATE_DIRECTIONS_A.length} 个可用于企业挖掘的技术方向。`,
      },
      {
        kind: "final-summary",
        text: "分析完成，已生成新的目标 JSON 数据。",
        targetJson: {
          target_name: taskName,
          focus: ["压实密度", "循环寿命", "低成本", "储能场景"],
          directions: [
            ...INITIAL_SELECTED_DIRECTIONS,
            ...CANDIDATE_DIRECTIONS_A,
          ].map((direction) => ({
            name: direction.title,
            description: direction.description,
            tags: direction.tags,
          })),
        },
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
    createTargetAnalysis(taskName),
  ]);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [drawerWidth, setDrawerWidth] = useState(getInitialDrawerWidth);
  const [isCompactLayout, setIsCompactLayout] = useState(
    () => window.innerWidth < 1024,
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
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const handleChange = (event: MediaQueryListEvent) =>
      setIsCompactLayout(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

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
    if (!drawerOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (processLogRef.current) {
        processLogRef.current.scrollTop = processLogRef.current.scrollHeight;
      }
    }, 50);

    return () => window.clearTimeout(timer);
  }, [analysisRounds, drawerOpen]);

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
    const steps: ProcessEvent[] = [
      {
        kind: "reasoning",
        text: "正在把新的偏好应用到候选方向集合，已选方向保持不变。本轮不会逐个分析单个候选。",
      },
      {
        kind: "web-search",
        round: 1,
        text: "检索与新偏好相关的产业化进展、成本变化和商业验证信息。",
        resultCount: 8,
      },
      {
        kind: "reasoning",
        text: "首轮信息可以判断市场进展，但还需补充关键性能、专利和企业布局，避免只依据宏观信息调整方向。",
      },
      {
        kind: "web-search",
        round: 2,
        text: "补充关键性能指标、专利活跃度和企业量产信号，并交叉验证候选方向。",
        resultCount: 6,
      },
      {
        kind: "answer",
        text: `根据多轮检索与当前偏好，已重新组织技术方向，保留已选方向并生成 ${source.length} 个新的候选方向。`,
      },
      {
        kind: "final-summary",
        text: "更新分析完成，已返回新的目标 JSON 数据。",
        targetJson: {
          target_name: taskName,
          preference: instruction,
          directions: source.map((direction) => ({
            name: direction.title,
            description: direction.description,
            tags: direction.tags,
          })),
        },
      },
    ];

    if (updateTimerRef.current) {
      window.clearInterval(updateTimerRef.current);
    }

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

  const handleOpenProcessDrawer = () => {
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
    <PageShell className="h-screen max-w-none overflow-hidden p-4 max-md:p-3">
      <div className="flex h-full items-stretch gap-4">
        <main className="deep-mine-result-pane flex h-full min-w-0 flex-1 flex-col gap-[18px] overflow-hidden pr-1">
          <section className="max-h-[48%] shrink-0 overflow-y-auto bg-white border border-[#e5eaf3] rounded-[24px] shadow-[0_14px_32px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-3 border-b border-[#e5eaf3] p-[20px_24px] max-md:flex-col max-md:items-start max-md:p-[18px_20px]">
              <h1 className="text-[24px] font-black m-0 text-[#102039]">
                目标拆解
              </h1>
              <p className="m-0 text-right text-[13px] font-bold text-[#8a96a8] leading-[1.65] max-md:text-left">
                任务指令：
                <strong className="font-black text-[#526078]">
                  {TASK_INSTRUCTION}
                </strong>
              </p>
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

          <section className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white border border-[#e5eaf3] rounded-[24px] shadow-[0_14px_32px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-3 px-6 pt-[18px] max-md:px-[18px]">
              <h2 className="text-[20px] font-black m-0 text-[#102039]">
                候选技术方向
              </h2>
              {!drawerOpen && (
                <button
                  type="button"
                  onClick={handleOpenProcessDrawer}
                  className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[11px] border border-[#cbdcff] bg-[#f3f7ff] px-3.5 text-[13px] font-black text-[#2f6df6] transition-colors hover:border-[#a9c2ff] hover:bg-[#eaf1ff]"
                >
                  <PanelRightOpen className="size-4" />
                  任务助手
                </button>
              )}
            </div>
            <div className="min-h-0 flex-1 overflow-hidden px-6 pb-6 pt-4 max-md:px-[18px] max-md:pb-6">
              <div
                className={`grid h-full content-start grid-cols-1 gap-3.5 overflow-y-auto pr-1 md:grid-cols-2 2xl:grid-cols-3 ${
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
                  ))
                )}
              </div>
            </div>
          </section>

          <div className="z-20 flex shrink-0 items-center justify-between gap-4 rounded-[18px] border border-[#e5eaf3] bg-white/90 px-4 py-3 text-[13px] text-[#647087] shadow-[0_14px_34px_rgba(18,39,80,0.12)] backdrop-blur-[10px] max-md:flex-col max-md:items-stretch">
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

        {drawerOpen && (
          <Resizable
            size={{
              width: drawerWidth,
              height: isCompactLayout ? "calc(100vh - 24px)" : "100%",
            }}
            style={{ position: isCompactLayout ? "fixed" : "relative" }}
            minWidth={Math.min(MIN_DRAWER_WIDTH, window.innerWidth * 0.75)}
            maxWidth={isCompactLayout ? "92vw" : "60vw"}
            enable={{ left: true }}
            onResizeStop={(_event, _direction, element) => {
              const nextWidth = element.offsetWidth;
              setDrawerWidth(nextWidth);
              window.localStorage.setItem(
                DRAWER_WIDTH_STORAGE_KEY,
                String(nextWidth),
              );
            }}
            handleComponent={{
              left: (
                <div
                  className="group flex h-full w-3 -translate-x-1/2 cursor-col-resize items-center justify-center"
                  title="拖动调整分析过程面板宽度"
                >
                  <span className="h-12 w-1 rounded-full bg-[#cbd8eb] opacity-0 shadow-sm transition-opacity group-hover:opacity-100" />
                </div>
              ),
            }}
            className={`deep-mine-assistant-panel z-30 flex max-w-[92vw] flex-col overflow-hidden rounded-[18px] border border-[#e3ebf6] bg-white shadow-[0_14px_32px_rgba(15,23,42,0.08)] ${
              isCompactLayout ? "right-3 top-3 z-40" : "shrink-0"
            }`}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#e3ebf6] bg-linear-to-b from-white to-[#fbfdff] px-[18px] py-[16px]">
              <div className="min-w-0">
                <h2 className="m-0 text-[20px] font-black leading-[1.35] text-[#102039]">
                  任务助手
                </h2>
                <p className="m-0 mt-1.5 text-[13px] leading-[1.5] text-[#7b879b]">
                  {isUpdatingCandidates
                    ? "正在通过多轮 Web Search 更新整体候选方向。"
                    : "任务要求、分析过程与历次调整。"}
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
              {analysisRounds.map((round) => (
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
                  <AnalysisProcessTimeline
                    events={round.messages}
                    isStreaming={round.status === "running"}
                  />
                </section>
              ))}
            </div>
            <div className="shrink-0 border-t border-[#e3ebf6] bg-white p-3.5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="text-[13px] font-black text-[#13213a]">
                  继续调整
                </div>
                <div className="text-right text-[11px] text-[#8793a7]">
                  当前结果会保留至新结果生成
                </div>
              </div>
              <div className="rounded-[14px] border border-[#dfe7f2] bg-[#fbfdff] p-2 focus-within:border-[#a9c2ff] focus-within:bg-white">
                <Textarea
                  value={preference}
                  onChange={(event) => setPreference(event.target.value)}
                  placeholder="补充筛选偏好，例如：优先关注已有中试验证、成本下降路径清晰的方向"
                  className="min-h-[72px] resize-none border-0 bg-transparent px-2 py-1.5 text-[13px] leading-[1.6] shadow-none focus-visible:ring-0"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleRefreshCandidates}
                    disabled={isUpdatingCandidates}
                    className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-[11px] px-3.5 text-[13px] font-black transition ${
                      isUpdatingCandidates
                        ? "cursor-not-allowed bg-[#e8eef9] text-[#8a96a8]"
                        : "bg-[#2f6df6] text-white hover:bg-[#275de0]"
                    }`}
                  >
                    {isUpdatingCandidates ? (
                      <>
                        <LoaderCircle className="size-3.5 animate-spin" />
                        分析中
                      </>
                    ) : (
                      "调整分析"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Resizable>
        )}
      </div>
    </PageShell>
  );
}
