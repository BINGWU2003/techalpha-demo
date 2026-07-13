import { Search } from "lucide-react";

export type ProcessEvent = {
  kind: "reasoning" | "web-search" | "answer" | "final-summary";
  text: string;
  round?: number;
  resultCount?: number;
  targetJson?: Record<string, unknown>;
};

type AnalysisProcessTimelineProps = {
  events: ProcessEvent[];
  isStreaming?: boolean;
};

export function AnalysisProcessTimeline({
  events,
  isStreaming = false,
}: AnalysisProcessTimelineProps) {
  return (
    <div className="grid gap-2.5" aria-live="polite">
      {events.map((event, eventIndex) => (
        <div
          key={`${event.kind}-${event.round ?? eventIndex}-${eventIndex}`}
          className="grid grid-cols-[28px_1fr] items-start gap-2.5"
        >
          <div
            className={`flex size-7 items-center justify-center rounded-[10px] text-[12px] font-black ${
              event.kind === "web-search"
                ? "bg-[#fff4dc] text-[#b66a00]"
                : event.kind === "final-summary"
                  ? "bg-[#eaf8f0] text-[#15924c]"
                  : "bg-[#edf4ff] text-[#2f6df6]"
            }`}
          >
            {event.kind === "web-search" ? (
              <Search className="size-3.5" />
            ) : event.kind === "final-summary" ? (
              "✓"
            ) : (
              "AI"
            )}
          </div>
          <div
            className={`rounded-[16px] border bg-white px-3 py-2.5 text-[13px] leading-[1.75] text-[#43506a] ${
              event.kind === "web-search"
                ? "border-[#f3dfb5]"
                : event.kind === "final-summary"
                  ? "border-[#cdebd9]"
                  : "border-[#e3ebf6]"
            }`}
          >
            <div className="mb-1 flex items-center justify-between gap-2 text-[13px] font-black text-[#13213a]">
              <span>
                {event.kind === "reasoning"
                  ? "思考过程"
                  : event.kind === "web-search"
                    ? `第 ${event.round ?? eventIndex + 1} 轮 Web Search`
                    : event.kind === "answer"
                      ? "回答"
                      : "最终总结"}
              </span>
              {event.kind === "web-search" && (
                <span className="shrink-0 rounded-full bg-[#eaf8f0] px-2 py-0.5 text-[10px] text-[#15924c]">
                  已完成 · {event.resultCount ?? 0} 条
                </span>
              )}
            </div>
            <div>{event.text}</div>
            {event.targetJson && (
              <pre className="mt-2 max-h-[220px] overflow-auto rounded-[10px] bg-[#f0f8f3] px-2.5 py-2 font-mono text-[11px] leading-[1.6] text-[#24543a]">
                {JSON.stringify(event.targetJson, null, 2)}
              </pre>
            )}
          </div>
        </div>
      ))}
      {isStreaming && (
        <div className="grid grid-cols-[28px_1fr] items-start gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-[10px] bg-[#edf4ff] text-[12px] font-black text-[#2f6df6]">
            AI
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-[16px] border border-[#cfe0ff] bg-white px-3 py-2 text-[12px] font-black text-[#2f6df6]">
            <span className="size-2 animate-pulse rounded-full bg-[#2f6df6]" />
            正在分析...
          </div>
        </div>
      )}
    </div>
  );
}
