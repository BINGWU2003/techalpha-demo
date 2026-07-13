import { useEffect, useMemo, useState } from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  ExternalLink,
  FileCode2,
  RefreshCw,
  Search,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

type DemoFile = {
  name: string;
  title: string;
  url: string;
};

export default function DemoPreview() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [demos, setDemos] = useState<DemoFile[]>([]);
  const [query, setQuery] = useState("");
  const [isListCollapsed, setIsListCollapsed] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewError, setPreviewError] = useState(false);

  const requestedFile = searchParams.get("file");
  const selectedDemo =
    demos.find((demo) => demo.name === requestedFile) ?? demos[0] ?? null;
  const filteredDemos = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return demos;
    return demos.filter((demo) =>
      `${demo.title} ${demo.name}`.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [demos, query]);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;
    fetch("/demos/manifest.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<DemoFile[]>;
      })
      .then((files) => {
        if (!isActive) return;
        setDemos(files);
        setError("");
      })
      .catch((reason: unknown) => {
        if (!isActive || (reason instanceof DOMException && reason.name === "AbortError")) return;
        setError("无法读取 Demo 文件清单，请检查开发服务或构建产物。 ");
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  const selectDemo = (demo: DemoFile) => {
    setSearchParams({ file: demo.name });
    setRefreshKey(0);
    setPreviewError(false);
  };

  return (
    <div className="flex h-screen min-h-[640px] flex-col overflow-hidden bg-[#f6f8fc]">
      <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#dfe7f2] bg-white px-5 md:px-7">
        <div>
          <h1 className="text-[20px] font-black tracking-[-0.02em] text-[#102039]">Demo 预览中心</h1>
          <p className="mt-1 text-xs text-[#74839a]">快速浏览 demos 目录中的独立 HTML 页面</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setPreviewError(false);
              setRefreshKey((key) => key + 1);
            }}
            disabled={!selectedDemo}
            className="flex h-9 items-center gap-2 rounded-lg border border-[#dce5f1] bg-white px-3 text-sm font-bold text-[#43536d] transition-colors hover:bg-[#f5f8fd] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RefreshCw size={15} />
            <span className="hidden sm:inline">刷新</span>
          </button>
          <a
            href={selectedDemo?.url}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!selectedDemo}
            onClick={(event) => !selectedDemo && event.preventDefault()}
            className={`flex h-9 items-center gap-2 rounded-lg bg-[#2f6df6] px-3 text-sm font-bold text-white transition-colors hover:bg-[#255fdf] ${!selectedDemo ? "pointer-events-none opacity-40" : ""}`}
          >
            <ExternalLink size={15} />
            <span className="hidden sm:inline">新窗口打开</span>
          </a>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 gap-3 p-3 md:gap-4 md:p-4">
        <aside
          className={`relative shrink-0 overflow-hidden rounded-2xl border border-[#dfe7f2] bg-white shadow-sm transition-[width] duration-200 ${isListCollapsed ? "w-14" : "w-[280px] max-md:w-[220px]"}`}
        >
          <button
            type="button"
            onClick={() => setIsListCollapsed((collapsed) => !collapsed)}
            className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-lg text-[#66758e] hover:bg-[#eef3fa]"
            title={isListCollapsed ? "展开列表" : "折叠列表"}
            aria-label={isListCollapsed ? "展开 Demo 列表" : "折叠 Demo 列表"}
          >
            {isListCollapsed ? <ChevronsRight size={17} /> : <ChevronsLeft size={17} />}
          </button>

          {isListCollapsed ? (
            <div className="flex h-full items-start justify-center pt-14 text-[#8b99ac]">
              <FileCode2 size={19} />
            </div>
          ) : (
            <div className="flex h-full flex-col p-3">
              <div className="pr-10 text-sm font-black text-[#24324a]">HTML 文件</div>
              <label className="mt-3 flex h-10 items-center gap-2 rounded-xl border border-[#dfe7f2] bg-[#f8faff] px-3 focus-within:border-[#8eb1ff]">
                <Search size={15} className="shrink-0 text-[#8b99ac]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="搜索 Demo"
                  className="min-w-0 flex-1 bg-transparent text-sm text-[#263650] outline-none placeholder:text-[#9aa8bc]"
                />
              </label>
              <nav className="mt-3 min-h-0 flex-1 space-y-1 overflow-y-auto" aria-label="Demo 文件列表">
                {filteredDemos.map((demo) => (
                  <button
                    key={demo.name}
                    type="button"
                    onClick={() => selectDemo(demo)}
                    title={demo.name}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${selectedDemo?.name === demo.name ? "bg-[#eaf1ff] font-bold text-[#225cd9]" : "text-[#526078] hover:bg-[#f3f6fb] hover:text-[#22324c]"}`}
                  >
                    <FileCode2 size={15} className="shrink-0" />
                    <span className="min-w-0 truncate">{demo.title}</span>
                  </button>
                ))}
                {!isLoading && !error && filteredDemos.length === 0 && (
                  <p className="px-3 py-8 text-center text-xs leading-5 text-[#8b99ac]">
                    {demos.length === 0 ? "demos 目录中暂无 HTML 文件" : "没有匹配的 Demo"}
                  </p>
                )}
              </nav>
            </div>
          )}
        </aside>

        <section className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-[#dfe7f2] bg-white shadow-sm">
          {isLoading ? (
            <div className="flex h-full items-center justify-center text-sm text-[#7c8ba1]">正在读取 Demo 列表…</div>
          ) : error ? (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-[#c2414d]">{error}</div>
          ) : selectedDemo ? (
            <div className="relative h-full w-full">
              <iframe
                key={`${selectedDemo.name}-${refreshKey}`}
                src={selectedDemo.url}
                title={`${selectedDemo.title} 预览`}
                onLoad={() => setPreviewError(false)}
                onError={() => setPreviewError(true)}
                className="h-full w-full border-0 bg-white"
              />
              {previewError && (
                <div className="absolute inset-0 flex items-center justify-center bg-white px-6 text-center text-sm text-[#c2414d]">
                  该 Demo 加载失败，请刷新或在新窗口中打开。
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-[#8b99ac]">
              <FileCode2 size={30} strokeWidth={1.5} />
              <p className="text-sm">暂无可预览的 HTML 文件</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
