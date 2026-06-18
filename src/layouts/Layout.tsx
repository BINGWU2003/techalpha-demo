import { ReactNode, MouseEvent, useState } from "react";
import {
  SquarePen,
  Search,
  FileText,
  Flag,
  LogOut,
  PanelLeft,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { User } from "../services/auth";

interface LayoutProps {
  children: ReactNode;
  onLogout?: () => void;
  currentUser?: User | null;
  recentTasks?: RecentTask[];
  activeTaskId?: string;
  onSelectTask?: (taskId: string) => void;
}

interface RecentTask {
  id: string;
  title: string;
  to: string;
}

export function Layout({
  children,
  onLogout,
  currentUser,
  recentTasks = [],
  activeTaskId,
  onSelectTask,
}: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const historyTask = new URLSearchParams(location.search).get("task");

  let activeNav = "";
  if (path === "/") activeNav = "workbench";
  if (path.startsWith("/companies")) activeNav = "companies";
  if (path.startsWith("/reports")) activeNav = "reports";
  if (path.startsWith("/alerts")) activeNav = "alerts";
  if (path.startsWith("/account")) activeNav = "account";

  let activeHistory = historyTask || "";
  if (!activeHistory) {
    if (path.startsWith("/sector-scan")) activeHistory = "sector-scan";
    else if (path.startsWith("/deep-mine") || path === "/direction-tuning")
      activeHistory = activeTaskId || "deep-mine";
    else if (path.startsWith("/auto-report") || path.startsWith("/report"))
      activeHistory = "auto-report";
    else if (path.startsWith("/alerts")) activeHistory = "alerts-1";
  }

  const displayName = currentUser?.username || "AI 引擎";
  const displayEmail = currentUser?.email || "系统服务已就绪";
  const avatarText = displayName.slice(0, 1).toUpperCase();
  const toggleSidebar = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsSidebarCollapsed((collapsed) => !collapsed);
  };

  return (
    <div
      className={`min-h-screen grid grid-cols-1 bg-[#f6f8fc] text-[#172033] font-sans transition-[grid-template-columns] duration-200 ${
        isSidebarCollapsed
          ? "lg:grid-cols-[72px_1fr]"
          : "lg:grid-cols-[236px_1fr]"
      }`}
    >
      <aside
        className={`hidden lg:flex flex-col bg-[#0f172a] text-[#cbd5e1] h-screen sticky top-0 z-10 transition-all duration-200 ${
          isSidebarCollapsed ? "overflow-visible px-3" : "px-0"
        }`}
      >
        <div
          className={`group/logo relative flex h-[78px] shrink-0 items-center border-b border-[rgba(148,163,184,0.14)] ${
            isSidebarCollapsed ? "justify-center px-0" : "gap-[10px] px-[18px]"
          }`}
        >
          <div className={`${isSidebarCollapsed ? "hidden" : "brand-text"}`}>
            <strong className="block text-[20px] leading-none tracking-[-0.045em] bg-linear-to-br from-[#5fb4ff] via-[#d7ecff] to-white bg-clip-text text-transparent mb-[5px]">
              TechAlpha
            </strong>
            <span className="block text-[11px] text-[#7ea6d8] tracking-[0.08em] uppercase">
              AI Investment OS
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(false)}
            className={`h-10 w-10 cursor-pointer items-center justify-center rounded-[13px] bg-linear-to-br from-[#2f6df6] to-[#8057ff] text-[14px] font-black text-white shadow-[0_10px_24px_rgba(47,109,246,0.24)] transition-transform hover:scale-105 ${
              isSidebarCollapsed ? "flex" : "hidden"
            }`}
            title="展开侧边栏"
          >
            TA
          </button>
          {!isSidebarCollapsed && (
            <button
              onClick={toggleSidebar}
              className="absolute right-[14px] top-[22px] flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-white/6 text-[#cdd6e7] transition-colors hover:bg-white/12 hover:text-white"
              title="收起侧边栏"
            >
              <PanelLeft size={18} strokeWidth={1.8} />
            </button>
          )}
        </div>

        <nav
          className={`grid gap-[7px] ${isSidebarCollapsed ? "p-[18px_0_8px]" : "p-[18px_12px_8px]"}`}
        >
          <Link
            to="/"
            title="新建任务"
            className={`h-[42px] rounded-xl flex items-center text-[14px] cursor-pointer transition-colors ${
              isSidebarCollapsed
                ? "justify-center px-0"
                : "gap-[11px] px-[13px]"
            } ${activeNav === "workbench" ? "bg-[#2563eb] text-white" : "text-[#cbd5e1] hover:bg-white/5 hover:text-white"}`}
          >
            <SquarePen size={16} />
            <span className={isSidebarCollapsed ? "hidden" : ""}>新建任务</span>
          </Link>
          <Link
            to="/companies"
            title="企业库"
            className={`h-[42px] rounded-xl flex items-center text-[14px] cursor-pointer transition-colors ${
              isSidebarCollapsed
                ? "justify-center px-0"
                : "gap-[11px] px-[13px]"
            } ${activeNav === "companies" ? "bg-[#2563eb] text-white" : "text-[#cbd5e1] hover:bg-white/5 hover:text-white"}`}
          >
            <Search size={16} />
            <span className={isSidebarCollapsed ? "hidden" : ""}>企业库</span>
          </Link>
          <Link
            to="/reports"
            title="报告库"
            className={`h-[42px] rounded-xl flex items-center text-[14px] cursor-pointer transition-colors ${
              isSidebarCollapsed
                ? "justify-center px-0"
                : "gap-[11px] px-[13px]"
            } ${activeNav === "reports" ? "bg-[#2563eb] text-white" : "text-[#cbd5e1] hover:bg-white/5 hover:text-white"}`}
          >
            <FileText size={16} />
            <span className={isSidebarCollapsed ? "hidden" : ""}>报告库</span>
          </Link>
          <Link
            to="/alerts"
            title="事件跟踪"
            className={`h-[42px] rounded-xl flex items-center text-[14px] cursor-pointer transition-colors ${
              isSidebarCollapsed
                ? "justify-center px-0"
                : "gap-[11px] px-[13px]"
            } ${activeNav === "alerts" ? "bg-[#2563eb] text-white" : "text-[#cbd5e1] hover:bg-white/5 hover:text-white"}`}
          >
            <Flag size={16} />
            <span className={isSidebarCollapsed ? "hidden" : ""}>事件跟踪</span>
          </Link>
        </nav>

        {isSidebarCollapsed ? (
          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(false)}
            className="min-h-0 flex-1 cursor-pointer"
            title="展开侧边栏"
            aria-label="展开侧边栏"
          />
        ) : (
          <div className="flex-1 overflow-auto px-3">
            <div className="text-xs text-[#64748b] font-extrabold p-[16px_12px_6px] tracking-wider">
              最近任务记录
            </div>
            {recentTasks.map((task) => {
              const isActive = activeHistory === task.id;

              return (
                <Link
                  key={task.id}
                  to={task.to}
                  onClick={() => onSelectTask?.(task.id)}
                  className={`text-xs leading-relaxed p-[10px_11px] rounded-[11px] flex items-center gap-2 cursor-pointer transition-colors ${isActive ? "bg-white/[0.06] text-[#e0f2fe] font-extrabold shadow-[inset_2px_0_0_rgba(147,197,253,0.45)]" : "text-[#94a3b8] hover:bg-white/5 hover:text-[#e2e8f0]"}`}
                >
                  <span className="min-w-0 truncate">{task.title}</span>
                </Link>
              );
            })}
          </div>
        )}

        <div
          className={`group relative mt-auto border-t border-[#94a3b823] transition-colors ${
            isSidebarCollapsed ? "p-[14px_0_16px]" : "p-[14px_12px_16px]"
          } ${activeNav === "account" ? "bg-white/5" : ""}`}
        >
          <div
            className={`pointer-events-none absolute z-20 translate-y-2 rounded-2xl bg-white p-3 text-[#102039] opacity-0 shadow-[0_18px_44px_rgba(0,0,0,0.28)] transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 ${
              isSidebarCollapsed
                ? "bottom-4 left-[56px] w-[216px]"
                : "bottom-[82px] left-3 right-3"
            }`}
          >
            <div className="text-[14px] font-black">{displayName}</div>
            <div className="mt-1 break-all text-[12px] leading-relaxed text-[#66758e]">
              {displayEmail}
            </div>
            <div className="mt-3 rounded-xl border border-[#e3ebf6] bg-[#f5f8ff] p-3 text-[12px] leading-[1.75] text-[#31415d]">
              <div>当前套餐：试用版</div>
              <div>有效期至：2026-07-15</div>
              <div>初筛报告：7 / 10</div>
            </div>
            <div className="mt-3 flex flex-col gap-2 border-t border-[#e3ebf6] pt-3 text-[13px] font-extrabold text-[#18345d]">
              <Link
                to="/account"
                className="cursor-pointer rounded-lg px-1 py-0.5 hover:text-[#2f6df6]"
              >
                账户与权益
              </Link>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="cursor-pointer rounded-lg px-1 py-0.5 text-left font-extrabold text-[#18345d] transition-colors hover:text-[#2f6df6]"
                >
                  退出登录
                </button>
              )}
            </div>
          </div>

          <div
            className={`flex min-w-0 items-center rounded-[14px] transition-colors ${
              isSidebarCollapsed ? "justify-center p-2" : "gap-[10px] p-[10px]"
            } ${
              activeNav === "account"
                ? "text-white"
                : "text-[#cbd5e1] hover:text-white"
            }`}
          >
            <Link
              to="/account"
              title="账户与权益"
              className={`flex min-w-0 items-center ${
                isSidebarCollapsed ? "justify-center" : "flex-1 gap-[10px]"
              }`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#2f6df6] to-[#8057ff] text-[13px] font-black text-white shadow-[0_10px_24px_rgba(47,109,246,0.24)]">
                {avatarText}
              </div>
              <div
                className={`${isSidebarCollapsed ? "hidden" : "min-w-0 flex-1"}`}
              >
                <div className="truncate text-[13px] font-black text-white">
                  {displayName} · 试用版
                </div>
                <div className="mt-1 flex items-center gap-2 text-[12px] text-[#a9b9d4]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16b978] shadow-[0_0_0_4px_rgba(22,185,120,0.12)]" />
                  <span className="truncate">初筛 7/10</span>
                </div>
              </div>
            </Link>
            {onLogout && !isSidebarCollapsed && (
              <button
                onClick={onLogout}
                className="shrink-0 rounded-lg p-1.5 text-[#94a3b8] transition-colors hover:bg-white/10 hover:text-white"
                title="退出登录"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex flex-col">
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
