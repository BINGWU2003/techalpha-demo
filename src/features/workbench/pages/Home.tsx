import { useEffect, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import {
  ArrowRight,
  PencilLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AnalysisProcessTimeline,
  type ProcessEvent,
} from "@/src/features/deep-mine/components/AnalysisProcessTimeline";

interface HomeProps {
  onStartTask: (taskType: string, input: string) => void;
}

type AnalysisStatus = "idle" | "streaming" | "completed";

const QUICK_PROMPTS = [
  "固态电解质材料",
  "机器人灵巧手",
  "Chiplet先进封装",
  "低空经济传感器",
];

function waitForWorkspaceTransitionTarget() {
  return new Promise<{
    targetPanel: HTMLElement;
    resultPane: HTMLElement | null;
  } | null>((resolve) => {
    let frameCount = 0;

    const findTarget = () => {
      const targetPanel = document.querySelector<HTMLElement>(
        ".deep-mine-assistant-panel",
      );

      if (targetPanel) {
        resolve({
          targetPanel,
          resultPane: document.querySelector<HTMLElement>(
            ".deep-mine-result-pane",
          ),
        });
        return;
      }

      frameCount += 1;
      if (frameCount >= 30) {
        resolve(null);
        return;
      }

      window.requestAnimationFrame(findTarget);
    };

    window.requestAnimationFrame(findTarget);
  });
}

function createMockEvents(task: string): ProcessEvent[] {
  return [
    {
      kind: "reasoning",
      text: `需要先理解“${task}”的技术边界，并识别适合企业线索挖掘的主要技术路线。`,
    },
    {
      kind: "web-search",
      round: 1,
      text: "检索赛道技术路线、产业链结构和近期产业化进展。",
      resultCount: 8,
    },
    {
      kind: "reasoning",
      text: "首轮结果已经覆盖主流路线，但还需要补充关键性能指标、量产约束和商业化验证信息。",
    },
    {
      kind: "web-search",
      round: 2,
      text: "补充检索关键性能、专利活跃度、企业布局和示范应用。",
      resultCount: 6,
    },
    {
      kind: "answer",
      text: "已综合技术成熟度、工程化难度、商业化信号和企业可检索性，形成可用于下一步分析的目标拆解方案。",
    },
    {
      kind: "final-summary",
      text: "首次分析完成，已生成目标 JSON 数据。",
      targetJson: {
        target_name: task,
        analysis_status: "completed",
        direction_count: 7,
        dimensions: ["技术路线", "关键性能", "产业化进展", "企业可检索性"],
      },
    },
  ];
}

export default function Home({ onStartTask }: HomeProps) {
  const [inputValue, setInputValue] = useState(
    "固态电解质材料，关注产业化、低成本、安全性和规模化应用。",
  );
  const [activeTask, setActiveTask] = useState("");
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>("idle");
  const [events, setEvents] = useState<ProcessEvent[]>([]);
  const timersRef = useRef<number[]>([]);
  const analysisCardRef = useRef<HTMLFormElement>(null);
  const trimmedInputValue = inputValue.trim();
  const isIdle = analysisStatus === "idle";

  const clearTimers = () => {
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];
  };

  useEffect(
    () => () => {
      timersRef.current.forEach(window.clearTimeout);
    },
    [],
  );

  const handleStartTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!trimmedInputValue || analysisStatus === "streaming") return;

    clearTimers();
    const nextEvents = createMockEvents(trimmedInputValue);
    setActiveTask(trimmedInputValue);
    setEvents([]);
    setAnalysisStatus("streaming");

    const enterWorkspace = async () => {
      const sourceCard = analysisCardRef.current;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!sourceCard) {
        onStartTask("DeepMine", trimmedInputValue);
        return;
      }

      const sourceRect = sourceCard.getBoundingClientRect();
      const cardClone = sourceCard.cloneNode(true) as HTMLFormElement;
      cardClone.classList.add("task-transition-clone");
      Object.assign(cardClone.style, {
        left: `${sourceRect.left}px`,
        top: `${sourceRect.top}px`,
        width: `${sourceRect.width}px`,
        height: `${sourceRect.height}px`,
      });
      document.body.appendChild(cardClone);
      document.body.classList.add("task-workspace-transitioning");

      flushSync(() => {
        onStartTask("DeepMine", trimmedInputValue);
      });

      const workspace = await waitForWorkspaceTransitionTarget();

      if (!workspace) {
        cardClone.remove();
        document.body.classList.remove("task-workspace-transitioning");
        return;
      }

      const { targetPanel } = workspace;
      const targetRect = targetPanel.getBoundingClientRect();
      const transition = cardClone.animate(
        [
          {
            transform: "translate(0, 0) scale(1)",
            opacity: 1,
            borderRadius: "22px",
          },
          {
            transform: `translate(${targetRect.left - sourceRect.left}px, ${targetRect.top - sourceRect.top}px) scale(${targetRect.width / sourceRect.width}, ${Math.min(targetRect.height / sourceRect.height, 1.12)})`,
            opacity: 0.18,
            borderRadius: "18px",
          },
        ],
        {
          duration: prefersReducedMotion ? 0 : 420,
          easing: "cubic-bezier(.2,.75,.25,1)",
          fill: "forwards",
        },
      );

      try {
        await transition.finished;
      } finally {
        cardClone.remove();
        document.body.classList.remove("task-workspace-transitioning");
      }
    };

    nextEvents.forEach((nextEvent, index) => {
      const timer = window.setTimeout(
        () => {
          setEvents((currentEvents) => [...currentEvents, nextEvent]);
          if (index === nextEvents.length - 1) {
            setAnalysisStatus("completed");
            const transitionTimer = window.setTimeout(enterWorkspace, 650);
            timersRef.current = [transitionTimer];
          }
        },
        500 + index * 850,
      );
      timersRef.current.push(timer);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_42%,#fff_0,#f5f8fd_42%,#f1f5fb_100%)] px-5 py-12 md:px-12">
      <section className="w-full max-w-[780px]">
        <div className="mb-7 text-center">
          <h1 className="m-0 text-[31px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#091a38] max-md:text-[25px]">
            {isIdle
              ? "开始发现值得关注的硬科技企业"
              : "正在理解你的投资方向"}
          </h1>
          <p className="mx-auto mt-2.5 max-w-[620px] text-[14px] leading-[1.7] text-[#6d7b91]">
            {isIdle
              ? "输入赛道、技术方向或投资关注点，系统将拆解方向并生成企业线索。"
              : "过程会从这里展开，首轮结果形成后进入任务工作台。"}
          </p>
        </div>

        <form
          ref={analysisCardRef}
          onSubmit={handleStartTask}
          className="home-analysis-card rounded-[22px] border border-[#dfe7f3] bg-white p-[18px] text-left shadow-[0_22px_56px_rgba(28,53,98,0.10)]"
        >
          <div className="mb-2 flex items-center gap-2 text-[12px] font-extrabold text-[#65748b]">
            <span className="flex size-[22px] items-center justify-center rounded-[7px] bg-[#edf4ff] text-[#2f6df6]">
              <PencilLine className="size-3.5" />
            </span>
            投资方向与关注重点
          </div>
          {isIdle && (
          <>
          <div className="flex items-end gap-3 rounded-[15px] border border-[#dbe5f2] bg-[#fbfdff] p-3 transition focus-within:border-[#9ab7ff] focus-within:shadow-[0_0_0_3px_rgba(47,109,246,0.08)] max-sm:flex-col max-sm:items-stretch">
            <Textarea
              id="mainInput"
              aria-label="挖企业研究方向"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="例如：钠电池正极材料方向，关注压实密度、循环寿命、低成本和储能场景"
              className="min-h-16 flex-1 resize-none border-0 bg-transparent px-0 py-0 text-[14px] leading-[1.65] text-[#22314a] shadow-none outline-none placeholder:text-[#9aa8bc] focus-visible:border-0 focus-visible:ring-0"
            />
            <Button
              type="submit"
              disabled={!trimmedInputValue}
              className="h-[38px] shrink-0 rounded-[10px] bg-[#2f6df6] px-[15px] text-[13px] font-extrabold text-white shadow-[0_8px_20px_rgba(47,109,246,0.22)] hover:bg-[#255fdf] disabled:bg-[#9eb6eb] max-sm:w-full"
            >
              开始分析
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-0.5 text-[11px] font-bold text-[#8a96a8]">
              快速填充
            </span>
            {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setInputValue(prompt)}
                  className={`rounded-full border px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
                    inputValue === prompt
                      ? "border-[#a9c2ff] bg-[#edf4ff] text-[#2f6df6]"
                      : "border-[#dce5f1] bg-white text-[#66758e] hover:border-[#c3d5f5] hover:bg-[#f7faff] hover:text-[#2f6df6]"
                  }`}
                >
                  {prompt}
                </button>
              ))}
          </div>
          </>
          )}

          {!isIdle && (
            <section className="mt-4 border-t border-[#e3ebf6] pt-1">
              <header className="flex items-center justify-between gap-3 px-0.5 py-3">
              <div>
                  <h2 className="text-[14px] font-black text-[#102039]">
                    正在建立技术方向
                  </h2>
                  <p className="mt-1 text-[11px] text-[#7b879b]">{activeTask}</p>
              </div>
                <span className="text-[12px] font-bold text-[#8793a7]">
                  {analysisStatus === "streaming"
                    ? `分析中 · ${events.length} / 6`
                    : "分析完成"}
                </span>
              </header>
              <div className="max-h-[390px] overflow-y-auto rounded-[14px] bg-[#fbfdff] px-3 py-3">
                <AnalysisProcessTimeline
                  events={events}
                  isStreaming={analysisStatus === "streaming"}
                />
              </div>
              {analysisStatus === "completed" && (
                <p className="mt-2.5 text-center text-[12px] font-extrabold text-[#15924c]">
                  首轮结果已生成，正在进入任务工作台
                </p>
              )}
            </section>
          )}
        </form>

      </section>
    </div>
  );
}
