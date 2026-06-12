import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, PencilLine, RotateCcw } from "lucide-react";
import { message } from "antd";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

type Direction = {
  id: number;
  title: string;
  description: string;
};

const INITIAL_DIRECTIONS: Direction[] = [
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
  const [directions, setDirections] = useState<Direction[]>(INITIAL_DIRECTIONS);
  const [selectedDirectionIds, setSelectedDirectionIds] = useState<number[]>([
    1, 2, 3,
  ]);
  const [preference, setPreference] = useState(
    "更关注压实密度、循环寿命、低成本和储能场景。",
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [blockedDirectionId, setBlockedDirectionId] = useState<number | null>(
    null,
  );

  const selectedCount = selectedDirectionIds.length;
  const taskName = state.taskInput?.trim() || "钠电池正极材料方向企业挖掘";

  const selectedDirections = useMemo(
    () =>
      directions.filter((direction) =>
        selectedDirectionIds.includes(direction.id),
      ),
    [directions, selectedDirectionIds],
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

  const handleToggleDirection = (
    id: number,
    checked: boolean | "indeterminate",
  ) => {
    const shouldSelect = checked === true;

    if (shouldSelect) {
      if (selectedDirectionIds.includes(id)) {
        return;
      }

      if (selectedDirectionIds.length >= MAX_SELECTED_DIRECTIONS) {
        message.warning({
          content: DIRECTION_LIMIT_WARNING,
          key: "direction-limit-warning",
        });
        setStatusMessage(DIRECTION_LIMIT_WARNING);
        setBlockedDirectionId(id);
        return;
      }

      setStatusMessage("");
      setBlockedDirectionId(null);
      setSelectedDirectionIds([...selectedDirectionIds, id]);
      return;
    }

    if (!selectedDirectionIds.includes(id)) {
      return;
    }

    if (selectedDirectionIds.length <= 1) {
      setStatusMessage("至少选择 1 个技术方向");
      setBlockedDirectionId(id);
      return;
    }

    setStatusMessage("");
    setBlockedDirectionId(null);
    setSelectedDirectionIds(
      selectedDirectionIds.filter((directionId) => directionId !== id),
    );
  };

  const handleUpdateDirection = (
    id: number,
    field: keyof Pick<Direction, "title" | "description">,
    value: string,
  ) => {
    setDirections((items) =>
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleRedecompose = () => {
    setDirections(INITIAL_DIRECTIONS);
    setSelectedDirectionIds([1, 2, 3]);
    setBlockedDirectionId(null);
    setStatusMessage("已按当前偏好重新拆解为默认方向");
  };

  const handleAnalyze = () => {
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
            <div className="border-b border-[#e5eaf3] bg-linear-to-br from-[#f8fbff] to-white p-[22px]">
              <h1 className="text-[30px] leading-[1.2] m-0 tracking-[-0.04em] font-black text-[#102039]">
                目标拆解
              </h1>
              <p className="mt-1.5 text-[#64748b] text-[14px] leading-[1.65]">
                {taskName}
              </p>
            </div>

            <div className="p-[22px]">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h2 className="text-[22px] font-black m-0 text-[#102039]">
                  选择技术方向
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
              {directions.map((direction) => {
                const isSelected = selectedDirectionIds.includes(direction.id);

                return (
                  <article
                    key={direction.id}
                    onClick={() =>
                      handleToggleDirection(direction.id, !isSelected)
                    }
                    className={`relative min-h-[172px] cursor-pointer rounded-[18px] border bg-white p-[18px_18px_54px_52px] transition-all ${
                      blockedDirectionId === direction.id
                        ? "border-[#f59e0b] bg-[#fffaf0] shadow-[inset_0_0_0_3px_#fff1cf]"
                        : isSelected
                          ? "border-[#2563eb] shadow-[inset_0_0_0_3px_#edf4ff]"
                          : "border-[#dfe7f2] hover:border-[#bfdbfe]"
                    }`}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        handleToggleDirection(direction.id, checked)
                      }
                      onClick={(event) => event.stopPropagation()}
                      aria-label={`选择${direction.title}`}
                      className="absolute left-[18px] top-[20px] size-5 rounded-[6px]"
                    />
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
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) =>
                        handleUpdateDirection(
                          direction.id,
                          "title",
                          event.target.value,
                        )
                      }
                      className="min-h-[50px] resize-none rounded-[12px] border border-transparent bg-[#f8fbff] px-3 py-2 text-[18px] font-black leading-[1.35] text-[#102039] shadow-none transition-colors placeholder:text-[#b7c3d5] hover:border-[#d7e4ff] focus-visible:border-[#2563eb] focus-visible:bg-white focus-visible:ring-0"
                    />
                    <div className="mb-2 mt-3 text-[12px] font-extrabold text-[#94a3b8]">
                      分析说明
                    </div>
                    <Textarea
                      aria-label="技术方向说明"
                      value={direction.description}
                      placeholder="输入分析说明"
                      onClick={(event) => event.stopPropagation()}
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
                );
              })}
            </div>
            </div>
          </section>

          <section className="bg-white border border-[#e5eaf3] rounded-[24px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-[22px] font-black m-0 text-[#102039]">
                偏好调整
              </h2>
              <div className="text-[13px] font-bold text-[#64748b]">可选</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">
              <Textarea
                value={preference}
                onChange={(event) => setPreference(event.target.value)}
                placeholder="例如：更关注压实密度和循环寿命，暂不关注负极材料和电解液方向。"
                className="min-h-[86px] resize-y rounded-[16px] border-[#dfe7f2] bg-[#fbfcff] px-4 py-3 text-[14px] leading-[1.6] text-[#102039] focus-visible:border-[#adc5ff] focus-visible:ring-0"
              />
              <Button
                variant="outline"
                onClick={handleRedecompose}
                className="h-[44px] rounded-[14px] border-[#d7e4ff] px-[18px] font-extrabold text-[#2563eb]"
              >
                <RotateCcw data-icon="inline-start" />
                重新拆解
              </Button>
            </div>
          </section>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-1">
            <div className="text-[13px] text-[#64748b]">
              已选择 <b className="text-[#2563eb]">{selectedCount}</b>{" "}
              个技术方向
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
        </main>
      </div>
    </div>
  );
}
