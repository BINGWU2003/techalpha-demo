import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle, RotateCcw } from "lucide-react";
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

const EXAMPLES = [
  "固态电解质材料",
  "机器人灵巧手",
  "Chiplet先进封装",
  "低空经济传感器",
];

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
  const [inputValue, setInputValue] = useState("");
  const [activeTask, setActiveTask] = useState("");
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>("idle");
  const [events, setEvents] = useState<ProcessEvent[]>([]);
  const timersRef = useRef<number[]>([]);
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

    nextEvents.forEach((nextEvent, index) => {
      const timer = window.setTimeout(
        () => {
          setEvents((currentEvents) => [...currentEvents, nextEvent]);
          if (index === nextEvents.length - 1) {
            setAnalysisStatus("completed");
            timersRef.current = [];
          }
        },
        500 + index * 850,
      );
      timersRef.current.push(timer);
    });
  };

  const resetAnalysis = () => {
    clearTimers();
    setAnalysisStatus("idle");
    setActiveTask("");
    setEvents([]);
    setInputValue("");
  };

  return (
    <div
      className={`min-h-screen px-5 py-12 md:px-7 ${
        isIdle ? "flex items-center justify-center" : ""
      }`}
    >
      <section
        className={`mx-auto w-full max-w-[760px] ${
          isIdle ? "-translate-y-8 text-center max-md:translate-y-0" : ""
        }`}
      >
        <div className={isIdle ? "" : "text-center"}>
          <h1 className="m-0 text-[42px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#091a38] max-md:text-[32px]">
            开始发现值得关注的硬科技企业
          </h1>
          <p className="mx-auto mt-3 max-w-[620px] text-[16px] leading-[1.75] text-[#5f6f89]">
            输入赛道、技术方向或投资关注点，系统将拆解方向并生成企业线索。
          </p>
        </div>

        <form
          onSubmit={handleStartTask}
          className={`relative rounded-[24px] border border-[#dfe7f2] bg-white text-left shadow-[0_16px_36px_rgba(16,32,57,0.08)] ${
            isIdle ? "mt-[30px] p-[18px]" : "mt-6 p-4"
          }`}
        >
          <Textarea
            id="mainInput"
            aria-label="挖企业研究方向"
            value={inputValue}
            readOnly={!isIdle}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="例如：钠电池正极材料方向，关注压实密度、循环寿命、低成本和储能场景"
            className={`resize-y border-0 bg-white px-1.5 py-1 text-[#102039] shadow-none outline-none placeholder:text-[#9aa8bc] focus-visible:border-0 focus-visible:ring-0 ${
              isIdle
                ? "min-h-[116px] pb-[54px] text-[17px] max-md:pb-2"
                : "min-h-[52px] resize-none pr-[132px] text-[15px] font-bold"
            }`}
          />
          {isIdle ? (
            <Button
              type="submit"
              disabled={!trimmedInputValue}
              className="absolute bottom-[18px] right-[18px] h-11 rounded-[14px] bg-[#2f6df6] px-[18px] text-[14px] font-extrabold text-white shadow-[0_8px_18px_rgba(47,109,246,0.26)] hover:bg-[#255fdf] max-md:static max-md:mt-2 max-md:ml-auto max-md:flex"
            >
              新建任务
              <ArrowRight data-icon="inline-end" />
            </Button>
          ) : (
            <span className="absolute right-4 top-1/2 inline-flex -translate-y-1/2 items-center gap-2 rounded-full bg-[#edf4ff] px-3 py-1.5 text-[12px] font-black text-[#2f6df6]">
              {analysisStatus === "streaming" && (
                <LoaderCircle className="size-3.5 animate-spin" />
              )}
              {analysisStatus === "streaming" ? "分析中" : "已完成"}
            </span>
          )}
        </form>

        {isIdle ? (
          <div className="mt-[18px] flex flex-wrap justify-center gap-2.5">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setInputValue(example)}
                className="rounded-full border border-[#d7e4ff] bg-white px-3 py-2 text-[13px] font-bold text-[#2f6df6] transition-colors hover:bg-[#eef4ff]"
              >
                {example}
              </button>
            ))}
          </div>
        ) : (
          <section className="mt-4 overflow-hidden rounded-[22px] border border-[#dfe7f2] bg-white text-left shadow-[0_14px_32px_rgba(15,23,42,0.06)]">
            <header className="flex items-center justify-between gap-3 border-b border-[#e3ebf6] bg-[#fbfdff] px-5 py-4">
              <div>
                <h2 className="text-[18px] font-black text-[#102039]">
                  AI 正在拆解目标
                </h2>
                <p className="mt-1 text-[12px] text-[#7b879b]">{activeTask}</p>
              </div>
              <span className="text-[12px] font-bold text-[#8793a7]">
                {events.length} / 6
              </span>
            </header>
            <div className="max-h-[480px] overflow-y-auto bg-[#fbfdff] px-5 py-4">
              <AnalysisProcessTimeline
                events={events}
                isStreaming={analysisStatus === "streaming"}
              />
            </div>
            {analysisStatus === "completed" && (
              <footer className="flex items-center justify-between gap-3 border-t border-[#e3ebf6] bg-white px-5 py-4 max-sm:flex-col max-sm:items-stretch">
                <button
                  type="button"
                  onClick={resetAnalysis}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-[12px] border border-[#dce5f1] px-4 text-[13px] font-black text-[#526078] hover:bg-[#f5f8fd]"
                >
                  <RotateCcw className="size-4" />
                  新建其他任务
                </button>
                <Button
                  type="button"
                  onClick={() => onStartTask("DeepMine", activeTask)}
                  className="h-10 rounded-[12px] bg-[#2f6df6] px-4 text-[13px] font-black text-white hover:bg-[#255fdf]"
                >
                  进入目标拆解
                  <ArrowRight className="size-4" />
                </Button>
              </footer>
            )}
          </section>
        )}
      </section>
    </div>
  );
}
