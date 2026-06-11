import { useState } from 'react';
import { Search, Radar, Target, FileText, Bell } from 'lucide-react';

interface HomeProps {
  onStartTask: (taskType: string, input: string) => void;
}

export default function Home({ onStartTask }: HomeProps) {
  const [selectedTask, setSelectedTask] = useState('DeepMine');
  const [inputValue, setInputValue] = useState('钠电池正极材料');

  const selectTask = (task: string, defaultInput?: string) => {
    setSelectedTask(task);
    if (defaultInput) {
      setInputValue(defaultInput);
    }
  };

  const handleStartTask = () => {
    onStartTask(selectedTask, inputValue);
  };

  return (
    <div className="max-w-[940px] mx-auto p-[58px_28px_72px] max-md:p-[36px_16px_56px]">
      <section className="text-center pt-[12px]">
        <h1 className="m-0 text-[34px] max-md:text-[28px] leading-[1.22] tracking-[-0.055em] font-bold">创建一个 AI 投研任务</h1>
        <p className="mt-[12px] mx-auto color-[#667085] text-[15px] leading-[1.7] max-w-[660px]">
          输入你关注的赛道、技术方向、企业或投研问题，选择任务类型，系统将创建任务并进入对应工作台
        </p>

        <div className="max-w-[720px] mx-auto mt-[26px] flex flex-col md:flex-row gap-[10px] bg-white border border-[#dfe6f2] rounded-[18px] p-[8px] shadow-[0_10px_26px_rgba(15,23,42,0.07)]">
          <div className="flex-1 flex items-center gap-[10px] pl-[10px] text-[#94a3b8]">
            <Search size={20} />
            <input 
              id="mainInput"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="例如：钠电池正极材料、AI芯片、某某公司" 
              className="w-full border-0 outline-none h-[42px] text-[15px] text-[#0f172a]"
            />
          </div>
          <button 
            onClick={handleStartTask}
            className="w-full md:w-[138px] h-[44px] md:h-[42px] border-0 rounded-[13px] bg-[#2563eb] text-white font-extrabold cursor-pointer shadow-[0_10px_18px_rgba(37,99,235,0.24)] shrink-0"
          >
            创建任务 &rarr;
          </button>
        </div>

        <div className="mt-[10px] text-[#94a3b8] text-[12px]">
          这里是任务启动输入，不是资产搜索；进入任务页后会自动带入该内容，可继续修改。
        </div>
      </section>

      <section className="mt-[38px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[14px] max-w-[920px]">
        {/* Card 1 */}
        <div 
          onClick={() => selectTask('SectorScan')}
          className={`min-h-[200px] rounded-[20px] p-[22px] text-left cursor-pointer transition-all ${selectedTask === 'SectorScan' ? 'bg-[#f8fafc] border-[1.5px] border-[#2563eb] shadow-[0_16px_36px_rgba(37,99,235,0.12)] opacity-100' : 'bg-[rgba(255,255,255,0.6)] border border-dashed border-[#dfe6f2] opacity-60 hover:opacity-80'}`}
        >
          <div className={`w-[46px] h-[46px] rounded-[14px] flex items-center justify-center mb-[15px] ${selectedTask === 'SectorScan' ? 'bg-[#eaf1ff] text-[#2563eb]' : 'bg-[#e2e8f0] text-[#64748b]'}`}>
            <Radar size={22} strokeWidth={2.5} />
          </div>
          <h3 className={`m-0 text-[18px] tracking-[-0.025em] font-bold ${selectedTask === 'SectorScan' ? 'text-[#172033]' : 'text-[#64748b]'}`}>看赛道 <span className={`block mt-[3px] text-[12px] font-extrabold ${selectedTask === 'SectorScan' ? 'text-[#64748b]' : 'text-[#94a3b8]'}`}>Sector Scan</span></h3>
          <p className={`mt-[10px] mb-0 text-[12.5px] leading-[1.65] ${selectedTask === 'SectorScan' ? 'text-[#64748b]' : 'text-[#94a3b8]'}`}>扫描政策、技术、资本、专利和企业线索，判断哪些细分方向值得继续看。</p>
          <span className="inline-flex mt-[14px] rounded-full p-[5px_8px] text-[11px] font-black text-[#94a3b8] bg-[#f1f5f9]">定制开放</span>
        </div>

        {/* Card 2 */}
        <div 
          onClick={() => selectTask('DeepMine', '钠电池正极材料')}
          className={`min-h-[200px] bg-white rounded-[20px] p-[22px] text-left cursor-pointer transition-all ${selectedTask === 'DeepMine' ? 'border-[1.5px] border-[#2563eb] shadow-[0_16px_36px_rgba(37,99,235,0.12)]' : 'border border-[#dfe6f2] shadow-[0_10px_24px_rgba(15,23,42,0.035)] hover:-translate-y-[4px] hover:shadow-[0_16px_36px_rgba(15,23,42,0.07)] hover:border-[rgba(37,99,235,0.32)]'}`}
        >
          <div className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center mb-[15px] bg-[#f3ecff] text-[#8b5cf6]">
            <Target size={22} strokeWidth={2.5} />
          </div>
          <h3 className="m-0 text-[18px] tracking-[-0.025em] font-bold">挖企业 <span className="block mt-[3px] text-[#64748b] text-[12px] font-extrabold">Deep Mine</span></h3>
          <p className="mt-[10px] mb-0 text-[#64748b] text-[12.5px] leading-[1.65]">基于技术方向、专利、产业标签和公开动态，生成推荐企业并沉淀到企业库或标的池。</p>
          <span className="inline-flex mt-[14px] rounded-full p-[5px_8px] text-[11px] font-black text-[#8b5cf6] bg-[#f3ecff]">当前主线</span>
        </div>

        {/* Card 3 */}
        <div 
          onClick={() => selectTask('AutoReport', '浙江钠创新能源')}
          className={`min-h-[200px] bg-white rounded-[20px] p-[22px] text-left cursor-pointer transition-all ${selectedTask === 'AutoReport' ? 'border-[1.5px] border-[#2563eb] shadow-[0_16px_36px_rgba(37,99,235,0.12)]' : 'border border-[#dfe6f2] shadow-[0_10px_24px_rgba(15,23,42,0.035)] hover:-translate-y-[4px] hover:shadow-[0_16px_36px_rgba(15,23,42,0.07)] hover:border-[rgba(37,99,235,0.32)]'}`}
        >
          <div className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center mb-[15px] bg-[#eafaf1] text-[#16a34a]">
            <FileText size={22} strokeWidth={2.5} />
          </div>
          <h3 className="m-0 text-[18px] tracking-[-0.025em] font-bold">出报告 <span className="block mt-[3px] text-[#64748b] text-[12px] font-extrabold">Auto DD</span></h3>
          <p className="mt-[10px] mb-0 text-[#64748b] text-[12.5px] leading-[1.65]">对企业生成结构化评估/尽调报告，支持章节配置、图表编辑、版本保存和导出。</p>
          <span className="inline-flex mt-[14px] rounded-full p-[5px_8px] text-[11px] font-black text-[#16a34a] bg-[#eafaf1]">报告库</span>
        </div>

        {/* Card 4 */}
        <div 
          onClick={() => selectTask('SignalMonitor', '浙江钠创新能源')}
          className={`min-h-[200px] bg-white rounded-[20px] p-[22px] text-left cursor-pointer transition-all ${selectedTask === 'SignalMonitor' ? 'border-[1.5px] border-[#2563eb] shadow-[0_16px_36px_rgba(37,99,235,0.12)]' : 'border border-[#dfe6f2] shadow-[0_10px_24px_rgba(15,23,42,0.035)] hover:-translate-y-[4px] hover:shadow-[0_16px_36px_rgba(15,23,42,0.07)] hover:border-[rgba(37,99,235,0.32)]'}`}
        >
          <div className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center mb-[15px] bg-[#fff7e8] text-[#d97706]">
            <Bell size={22} strokeWidth={2.5} />
          </div>
          <h3 className="m-0 text-[18px] tracking-[-0.025em] font-bold">跟踪企业 <span className="block mt-[3px] text-[#64748b] text-[12px] font-extrabold">Signal Monitor</span></h3>
          <p className="mt-[10px] mb-0 text-[#64748b] text-[12.5px] leading-[1.65]">对已关注企业和标的池企业自动跟踪融资、专利、客户、工商和风险事件。</p>
          <span className="inline-flex mt-[14px] rounded-full p-[5px_8px] text-[11px] font-black text-[#d97706] bg-[#fff7e8]">重点事件</span>
        </div>
      </section>

      <section className="max-w-[920px] mx-auto mt-[24px] bg-[rgba(255,255,255,0.72)] border border-[#e5eaf3] rounded-[16px] p-[13px_16px] flex flex-col md:flex-row md:items-center justify-between gap-[16px] text-[#64748b] text-[13px]">
        <div className="flex items-start md:items-center gap-[10px] min-w-0">
          <span className="w-[8px] h-[8px] rounded-full bg-[#2563eb] shadow-[0_0_0_5px_rgba(37,99,235,0.12)] shrink-0 mt-1 md:mt-0"></span>
          <span className="whitespace-normal md:whitespace-nowrap">当前进行中：<strong className="text-[#334155] text-[13px]">钠电池正极材料企业挖掘</strong> · 阶段：产业线索分析</span>
        </div>
        <div className="text-[#2563eb] font-extrabold cursor-pointer whitespace-nowrap">继续 &rarr;</div>
      </section>
    </div>
  );
}
