import { ReactNode } from 'react';
import { LayoutGrid, Search, FileText, Flag, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../services/auth';

interface LayoutProps {
  children: ReactNode;
  onLogout?: () => void;
  currentUser?: User | null;
}

export function Layout({ children, onLogout, currentUser }: LayoutProps) {
  const location = useLocation();
  const path = location.pathname;

  let activeNav = 'workbench';
  if (path.startsWith('/companies')) activeNav = 'companies';
  if (path.startsWith('/reports')) activeNav = 'reports';
  if (path.startsWith('/alerts')) activeNav = 'alerts';
  if (path.startsWith('/account')) activeNav = 'account';

  let activeHistory = '';
  if (path.startsWith('/sector-scan')) activeHistory = 'sector-scan';
  else if (path.startsWith('/deep-mine') || path === '/direction-tuning') activeHistory = 'deep-mine';
  else if (path.startsWith('/auto-report') || path.startsWith('/report')) activeHistory = 'auto-report';
  else if (path.startsWith('/alerts')) activeHistory = 'alerts-1';

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[236px_1fr] bg-[#f6f8fc] text-[#172033] font-sans">
      <aside className="hidden lg:flex flex-col bg-[#0f172a] text-[#cbd5e1] h-screen sticky top-0">
        <div className="h-[78px] px-[18px] flex items-center gap-[10px] border-b border-[rgba(148,163,184,0.14)] shrink-0">
          <div className="brand-text">
            <strong className="block text-[20px] leading-none tracking-[-0.045em] bg-gradient-to-br from-[#5fb4ff] via-[#d7ecff] to-white bg-clip-text text-transparent mb-[5px]">TechAlpha</strong>
            <span className="block text-[11px] text-[#7ea6d8] tracking-[0.08em] uppercase">AI Investment OS</span>
          </div>
        </div>

        <nav className="p-[18px_12px_8px] grid gap-[7px]">
          <Link to="/" className={`h-[42px] rounded-xl px-[13px] flex items-center gap-[11px] text-[14px] cursor-pointer transition-colors ${activeNav === 'workbench' ? 'bg-[#2563eb] text-white' : 'text-[#cbd5e1] hover:bg-white/5 hover:text-white'}`}>
            <LayoutGrid size={16} /> 新建任务
          </Link>
          <Link to="/companies" className={`h-[42px] rounded-xl px-[13px] flex items-center gap-[11px] text-[14px] cursor-pointer transition-colors ${activeNav === 'companies' ? 'bg-[#2563eb] text-white' : 'text-[#cbd5e1] hover:bg-white/5 hover:text-white'}`}>
            <Search size={16} /> 企业库
          </Link>
          <Link to="/reports" className={`h-[42px] rounded-xl px-[13px] flex items-center gap-[11px] text-[14px] cursor-pointer transition-colors ${activeNav === 'reports' ? 'bg-[#2563eb] text-white' : 'text-[#cbd5e1] hover:bg-white/5 hover:text-white'}`}>
            <FileText size={16} /> 报告库
          </Link>
          <Link to="/alerts" className={`h-[42px] rounded-xl px-[13px] flex items-center gap-[11px] text-[14px] cursor-pointer transition-colors ${activeNav === 'alerts' ? 'bg-[#2563eb] text-white' : 'text-[#cbd5e1] hover:bg-white/5 hover:text-white'}`}>
            <Flag size={16} /> 跟踪预警
          </Link>
        </nav>

        <div className="px-3 flex-1 overflow-auto">
          <div className="text-xs text-[#64748b] font-extrabold p-[16px_12px_6px] tracking-wider">最近任务记录</div>
          <Link to="/sector-scan" className={`block text-xs leading-relaxed p-[10px_11px] rounded-[11px] flex items-center gap-2 cursor-pointer transition-colors ${activeHistory === 'sector-scan' ? 'text-[#e2e8f0] bg-white/5' : 'text-[#94a3b8] hover:bg-white/5 hover:text-[#e2e8f0]'}`}>
            <span className="text-[10px]">&#9649;</span> 分析钠电池正极材料赛道机会
          </Link>
          <Link to="/deep-mine" className={`block text-xs leading-relaxed p-[10px_11px] rounded-[11px] flex items-center gap-2 cursor-pointer transition-colors ${activeHistory === 'deep-mine' ? 'text-[#e2e8f0] bg-white/5' : 'text-[#94a3b8] hover:bg-white/5 hover:text-[#e2e8f0]'}`}>
            <span className="text-[10px]">&#9649;</span> 挖掘钠电正极材料核心企业
          </Link>
          <Link to="/auto-report/generating" className={`block text-xs leading-relaxed p-[10px_11px] rounded-[11px] flex items-center gap-2 cursor-pointer transition-colors ${activeHistory === 'auto-report' ? 'text-[#e2e8f0] bg-white/5' : 'text-[#94a3b8] hover:bg-white/5 hover:text-[#e2e8f0]'}`}>
            <span className="text-[10px]">&#9649;</span> 生成浙江钠创新能源报告
          </Link>
          <Link to="/" className={`block text-xs leading-relaxed p-[10px_11px] rounded-[11px] flex items-center gap-2 cursor-pointer transition-colors ${activeHistory === 'deep-mine-2' ? 'text-[#e2e8f0] bg-white/5' : 'text-[#94a3b8] hover:bg-white/5 hover:text-[#e2e8f0]'}`}>
            <span className="text-[10px]">&#9649;</span> 挖掘 Chiplet 方向潜力企业
          </Link>
          <Link to="/alerts" className={`block text-xs leading-relaxed p-[10px_11px] rounded-[11px] flex items-center gap-2 cursor-pointer transition-colors ${activeHistory === 'alerts-1' ? 'text-[#e2e8f0] bg-white/5' : 'text-[#94a3b8] hover:bg-white/5 hover:text-[#e2e8f0]'}`}>
            <span className="text-[10px]">&#9649;</span> 跟踪机器人灵巧手企业动态
          </Link>
        </div>

        <div className={`p-[16px_18px] border-t border-[#94a3b823] text-xs flex items-center justify-between transition-colors ${activeNav === 'account' ? 'bg-white/5 text-white' : 'text-[#cbd5e1] hover:bg-white/5 hover:text-white'}`}>
          <Link to="/account" className="min-w-0 flex flex-1 items-center rounded-lg cursor-pointer">
            {currentUser && currentUser.username ? (
              <span className="min-w-0 font-bold flex items-center gap-2">
                <div className="w-[20px] h-[20px] rounded-full bg-[#1e293b] flex items-center justify-center text-[10px]">
                  {currentUser.username[0].toUpperCase()}
                </div>
                <span className="truncate">{currentUser.username}</span>
              </span>
            ) : (
              <>
                <span className="inline-block w-[7px] h-[7px] bg-[#22c55e] rounded-full mr-2 shadow-[0_0_0_5px_rgba(34,197,94,0.12)]"></span>
                AI 引擎已就绪
              </>
            )}
          </Link>
          {onLogout && (
            <button
              onClick={onLogout}
              className="text-[#94a3b8] hover:text-white cursor-pointer transition-colors flex items-center"
              title="退出登录"
            >
              <LogOut size={14} />
            </button>
          )}
        </div>
      </aside>

      <main className="min-w-0 flex flex-col">
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
