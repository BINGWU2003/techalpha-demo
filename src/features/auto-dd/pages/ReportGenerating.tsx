import { useState, useEffect } from 'react';
import { Check, Edit2, Download, Copy, Database, ArrowRight, AlertTriangle, MessageSquare, Play, FastForward, CheckCircle2, ChevronRight, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ReportGenerating({ 
  onBack,
  onViewReport 
}: { 
  onBack?: () => void;
  onViewReport?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'generating' | 'ready' | 'failed' | 'archived'>('generating');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (activeTab === 'generating' && progress < 68) {
      const t = setTimeout(() => {
        setProgress(p => Math.min(p + 4, 68));
      }, 50);
      return () => clearTimeout(t);
    }
  }, [activeTab, progress]);

  const getStatusPill = () => {
    switch (activeTab) {
      case 'generating':
        return (
          <div className="inline-flex items-center gap-[8px] px-[13px] py-[9px] rounded-full text-[13px] font-bold whitespace-nowrap bg-[#fff6e8] text-[#c56c00]">
            <span className="w-[8px] h-[8px] rounded-full bg-current shadow-[0_0_0_0_rgba(255,159,26,0.55)] animate-[pulse_1.6s_infinite]"></span>
            报告生成中
          </div>
        );
      case 'ready':
        return (
          <div className="inline-flex items-center gap-[8px] px-[13px] py-[9px] rounded-full text-[13px] font-bold whitespace-nowrap bg-[#eaf8f0] text-[#18a957]">
            <CheckCircle size={14} />
            报告已生成
          </div>
        );
      case 'failed':
        return (
          <div className="inline-flex items-center gap-[8px] px-[13px] py-[9px] rounded-full text-[13px] font-bold whitespace-nowrap bg-[#fff0f0] text-[#e84d4d]">
            <AlertTriangle size={14} />
            生成失败
          </div>
        );
      case 'archived':
        return (
          <div className="inline-flex items-center gap-[8px] px-[13px] py-[9px] rounded-full text-[13px] font-bold whitespace-nowrap bg-[#edf4ff] text-[#2f6df6]">
            <CheckCircle size={14} />
            报告已入库
          </div>
        );
    }
  };

  return (
    <div className="p-[22px_28px_40px] max-md:p-[16px_16px_36px]">
      <div className="flex justify-between items-center gap-[16px] mb-[18px] max-md:flex-col max-md:items-start">
        <div className="text-[#718096] text-[13px]">
          工作台 / 出报告 / <b className="text-[#14213d]">浙江钠创新能源企业初筛报告</b>
        </div>
        <div className="flex gap-[10px] items-center">
          <button onClick={onBack} className="border border-[#d7e5ff] bg-white rounded-[12px] px-[16px] py-[10px] text-[14px] text-[#2f6df6] font-semibold hover:bg-gray-50 transition-colors">
            返回任务列表
          </button>
          <button className="border border-[#e4ebf5] bg-white rounded-[12px] px-[16px] py-[10px] text-[14px] text-[#14213d] font-semibold hover:bg-gray-50 transition-colors">
            查看任务配置
          </button>
          <button className="border border-[#2f6df6] bg-[#2f6df6] text-white rounded-[12px] px-[16px] py-[10px] text-[14px] font-semibold shadow-[0_10px_20px_rgba(47,109,246,0.18)] hover:bg-[#1d4ed8] transition-colors">
            打开报告库
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-[22px] items-start">
        <section className="flex flex-col gap-[18px]">
          <div className="bg-white border border-[#e4ebf5] rounded-[20px] shadow-[0_8px_28px_rgba(20,38,80,0.04)] p-[22px]">
            <div className="flex justify-between gap-[20px] items-start max-md:flex-col">
              <div>
                <div className="flex items-center gap-3 mb-[12px]">
                  {onBack && (
                    <button 
                      onClick={onBack}
                      className="p-[6px] rounded-[8px] bg-white border border-[#dbe4f1] text-[#334155] cursor-pointer hover:bg-gray-50 flex items-center justify-center hover:border-[#2563eb] hover:text-[#2563eb] transition-all"
                      title="返回"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  )}
                  <span className="inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-full bg-[#edf4ff] text-[#2f6df6] text-[12px] font-bold">
                    Auto Report · 报告生成任务
                  </span>
                </div>
                <h1 className="m-0 mb-[10px] text-[32px] max-md:text-[24px] leading-[1.25] tracking-[-0.015em] font-bold text-[#14213d]">
                  浙江钠创新能源企业初筛报告
                </h1>
                <p className="m-0 text-[#718096] leading-[1.75] text-[14px] max-w-[850px]">
                  本页是点击“开始生成报告”后的统一任务页面。报告生成中、生成完成、生成失败、已入库等状态都在这里承接。用户从历史任务进入时，也根据任务状态默认展示对应内容。
                </p>
              </div>

              {getStatusPill()}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] mt-[20px]">
              <div className="bg-[#fbfcff] border border-[#e4ebf5] rounded-[14px] p-[13px_14px]">
                <div className="text-[#718096] text-[12px] mb-[6px]">报告对象</div>
                <div className="font-bold text-[14px] text-[#14213d]">浙江钠创新能源</div>
              </div>
              <div className="bg-[#fbfcff] border border-[#e4ebf5] rounded-[14px] p-[13px_14px]">
                <div className="text-[#718096] text-[12px] mb-[6px]">报告类型</div>
                <div className="font-bold text-[14px] text-[#14213d]">企业初筛报告</div>
              </div>
              <div className="bg-[#fbfcff] border border-[#e4ebf5] rounded-[14px] p-[13px_14px]">
                <div className="text-[#718096] text-[12px] mb-[6px]">报告深度</div>
                <div className="font-bold text-[14px] text-[#14213d]">初筛版</div>
              </div>
              <div className="bg-[#fbfcff] border border-[#e4ebf5] rounded-[14px] p-[13px_14px]">
                <div className="text-[#718096] text-[12px] mb-[6px]">入库状态</div>
                <div className="font-bold text-[14px] text-[#14213d]">未入库</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#e4ebf5] rounded-[20px] shadow-[0_8px_28px_rgba(20,38,80,0.04)] p-[22px]">
            <div className="flex gap-[8px] p-[8px] bg-[#eef3fa] rounded-[16px] w-fit mb-[16px] overflow-x-auto">
              {[
                { id: 'generating', label: '生成中' },
                { id: 'ready', label: '已生成' },
                { id: 'failed', label: '生成失败' },
                { id: 'archived', label: '已入库' }
              ].map(tab => (
                <div 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'generating' | 'ready' | 'failed' | 'archived')}
                  className={`p-[9px_14px] rounded-[12px] font-bold text-[13px] cursor-pointer whitespace-nowrap transition-all ${activeTab === tab.id ? 'text-[#2f6df6] bg-white shadow-[0_4px_12px_rgba(20,38,80,0.05)]' : 'text-[#5f6d85] hover:text-[#2f6df6]'}`}
                >
                  {tab.label}
                </div>
              ))}
            </div>

            {activeTab === 'generating' && (
              <div className="animate-in fade-in duration-300">
                <div className="flex justify-between items-center gap-[14px] mb-[18px]">
                  <div>
                    <h2 className="m-0 text-[22px] font-bold text-[#14213d]">正在生成报告初稿</h2>
                    <p className="m-0 mt-[6px] text-[#718096] text-[14px] leading-[1.6]">
                      系统正在读取企业画像、专利、产业链、融资、竞品和风险信息，并生成结构化报告。你可以留在当前页面等待，也可以离开，任务完成后会保留在历史任务和报告草稿区。
                    </p>
                  </div>
                  <div className="text-[42px] font-extrabold text-[#2f6df6] tracking-[-1px]">
                    {progress}%
                  </div>
                </div>

                <div className="h-[12px] rounded-full bg-[#edf2f9] overflow-hidden m-[12px_0_20px]">
                  <div 
                    className="h-full bg-gradient-to-r from-[#2f6df6] to-[#7a9dff] rounded-full relative transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[flow_1.4s_infinite]" style={{ transform: 'translateX(-100%)' }}></div>
                  </div>
                </div>

                <div className="grid gap-[12px]">
                  {[
                    { dot: '✓', title: '读取企业基础画像', desc: '企业主体、工商信息、行业标签、已有标的池信息已完成读取。', status: '已完成', done: true },
                    { dot: '✓', title: '整理专利与技术数据', desc: '已完成正极材料相关专利、技术关键词、重点指标信息聚合。', status: '已完成', done: true },
                    { dot: '3', title: '生成技术能力与产业化分析', desc: '正在结合压实密度、材料路线、量产进展和专利布局生成分析段落。', status: '生成中', current: true },
                    { dot: '4', title: '生成竞争格局与风险点', desc: '将对同方向企业、替代路线、商业化风险和客户验证风险进行归纳。', status: '等待中' },
                    { dot: '5', title: '生成摘要、目录与结论', desc: '生成管理层摘要、核心判断、后续跟踪建议和报告目录。', status: '等待中' },
                  ].map((step, i) => (
                    <div key={i} className={`grid grid-cols-[32px_1fr_auto] gap-[12px] items-start p-[14px] border rounded-[15px] ${step.current ? 'border-[#b8ccff] bg-[#fbfdff]' : 'border-[#e4ebf5] bg-white'}`}>
                      <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] font-extrabold shrink-0 ${step.done ? 'bg-[#eaf8f0] text-[#18a957]' : step.current ? 'bg-[#2f6df6] text-white' : 'bg-[#edf2fa] text-[#8a99b0]'}`}>
                        {step.dot}
                      </div>
                      <div>
                        <div className="text-[15px] font-bold text-[#14213d] mb-[4px]">{step.title}</div>
                        <div className="text-[13px] text-[#718096] leading-[1.55]">{step.desc}</div>
                      </div>
                      <div className={`text-[12px] font-bold px-[10px] py-[6px] rounded-full whitespace-nowrap ${step.done ? 'bg-[#eaf8f0] text-[#18a957]' : step.current ? 'bg-[#edf4ff] text-[#2f6df6]' : 'bg-[#f2f5fa] text-[#7b8798]'}`}>
                        {step.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'ready' && (
              <div className="animate-in fade-in duration-300">
                <div className="flex justify-between items-center gap-[14px] mb-[18px]">
                  <div>
                    <h2 className="m-0 text-[22px] font-bold text-[#14213d]">报告初稿已生成，等待确认</h2>
                    <p className="m-0 mt-[6px] text-[#718096] text-[14px] leading-[1.6]">
                      当前报告为 AI 生成初稿，尚未保存为正式版本。你可以直接查看、进入编辑模式、重新生成部分章节，或保存到报告库。
                    </p>
                  </div>
                  <button onClick={onViewReport} className="border border-[#18a957] bg-[#18a957] text-white rounded-[12px] px-[16px] py-[10px] text-[14px] font-semibold hover:bg-[#15803d] transition-colors whitespace-nowrap cursor-pointer">
                    查看完整报告
                  </button>
                </div>

                <div className="bg-white border border-[#e4ebf5] rounded-[18px] p-[34px] min-h-[680px]">
                  <div className="border-b border-[#e4ebf5] pb-[24px] mb-[26px]">
                    <h2 className="m-0 mb-[12px] text-[34px] font-bold leading-[1.25] text-[#14213d]">浙江钠创新能源企业初筛报告</h2>
                    <p className="m-0 text-[#718096] text-[14px] leading-[1.7]">
                      报告类型：企业初筛报告 ｜ 生成时间：2026-04-29 15:42 ｜ 状态：AI 初稿
                    </p>
                  </div>

                  <div className="mb-[28px]">
                    <h3 className="text-[22px] font-bold text-[#14213d] m-0 mb-[12px]">一、企业画像</h3>
                    <p className="m-0 mb-[12px] text-[#2e3a50] leading-[1.85] text-[15px]">
                      浙江钠创新能源是一家围绕钠离子电池材料方向布局的新能源企业，业务重点与钠电池正极材料、产业化验证和技术路线优化相关。企业在钠电池正极材料方向具备一定技术积累，适合作为早期投资初筛对象。
                    </p>

                    <table className="w-full border-collapse mt-[12px] text-[14px]">
                      <tbody>
                        <tr>
                          <th className="border border-[#e4ebf5] bg-[#f6f8fc] text-[#4a5870] font-bold p-[12px_14px] text-left w-1/4">企业名称</th>
                          <td className="border border-[#e4ebf5] p-[12px_14px] text-left text-[#2e3a50] w-1/4">浙江钠创新能源</td>
                          <th className="border border-[#e4ebf5] bg-[#f6f8fc] text-[#4a5870] font-bold p-[12px_14px] text-left w-1/4">所属方向</th>
                          <td className="border border-[#e4ebf5] p-[12px_14px] text-left text-[#2e3a50] w-1/4">钠电池正极材料</td>
                        </tr>
                        <tr>
                          <th className="border border-[#e4ebf5] bg-[#f6f8fc] text-[#4a5870] font-bold p-[12px_14px] text-left">重点标签</th>
                          <td className="border border-[#e4ebf5] p-[12px_14px] text-left text-[#2e3a50]">钠离子电池、正极材料、产业化验证</td>
                          <th className="border border-[#e4ebf5] bg-[#f6f8fc] text-[#4a5870] font-bold p-[12px_14px] text-left">报告结论</th>
                          <td className="border border-[#e4ebf5] p-[12px_14px] text-left text-[#2e3a50]">建议进入持续跟踪池</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mb-[28px]">
                    <h3 className="text-[22px] font-bold text-[#14213d] m-0 mb-[12px]">二、AI 多维评分</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-[12px] mt-[14px]">
                      <div className="bg-[#f8fbff] border border-[#e4ebf5] rounded-[14px] p-[14px] text-center w-full">
                        <div className="text-[#718096] text-[12px] mb-[8px]">技术能力</div>
                        <div className="text-[24px] font-extrabold text-[#2f6df6]">7.2</div>
                      </div>
                      <div className="bg-[#f8fbff] border border-[#e4ebf5] rounded-[14px] p-[14px] text-center w-full">
                        <div className="text-[#718096] text-[12px] mb-[8px]">产业化潜力</div>
                        <div className="text-[24px] font-extrabold text-[#2f6df6]">8.0</div>
                      </div>
                      <div className="bg-[#f8fbff] border border-[#e4ebf5] rounded-[14px] p-[14px] text-center w-full">
                        <div className="text-[#718096] text-[12px] mb-[8px]">竞争力</div>
                        <div className="text-[24px] font-extrabold text-[#2f6df6]">7.8</div>
                      </div>
                      <div className="bg-[#f8fbff] border border-[#e4ebf5] rounded-[14px] p-[14px] text-center w-full">
                        <div className="text-[#718096] text-[12px] mb-[8px]">经营基础</div>
                        <div className="text-[24px] font-extrabold text-[#2f6df6]">7.6</div>
                      </div>
                      <div className="bg-[#f8fbff] border border-[#e4ebf5] rounded-[14px] p-[14px] text-center w-full">
                        <div className="text-[#718096] text-[12px] mb-[8px]">跟踪价值</div>
                        <div className="text-[24px] font-extrabold text-[#2f6df6]">8.4</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-[28px]">
                    <h3 className="text-[22px] font-bold text-[#14213d] m-0 mb-[12px]">三、初步判断</h3>
                    <p className="m-0 mb-[12px] text-[#2e3a50] leading-[1.85] text-[15px]">
                      从当前信息看，该企业适合纳入钠电池正极材料方向的持续跟踪对象。后续应重点关注其材料体系、压实密度等关键指标、客户验证情况、量产节奏和融资动态。
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'failed' && (
              <div className="animate-in fade-in duration-300">
                <div className="border border-[#ffd5d5] bg-[#fff8f8] rounded-[18px] p-[22px]">
                  <h2 className="m-0 mb-[8px] text-[#e84d4d] text-[22px] font-bold">报告生成失败</h2>
                  <p className="m-0 text-[#805252] leading-[1.7] text-[14px]">
                    当前任务未能完整生成报告。失败原因可能来自数据源超时、部分字段缺失、模型生成中断或章节依赖数据不足。你可以重试生成，也可以跳过异常数据源继续生成。
                  </p>

                  <div className="grid gap-[10px] mt-[18px]">
                    <div className="p-[14px] rounded-[14px] bg-white border border-[#ffdada] flex justify-between gap-[12px]">
                      <div>
                        <strong className="text-[#703333] font-bold">专利数据源请求超时</strong><br />
                        <span className="text-[#718096] text-[13px]">部分专利引用、权利要求和技术关键词字段未能按时返回。</span>
                      </div>
                      <button className="border border-[#e4ebf5] bg-white rounded-[10px] px-[11px] py-[7px] text-[12px] font-bold text-[#14213d] hover:bg-gray-50 shrink-0">重试该步骤</button>
                    </div>

                    <div className="p-[14px] rounded-[14px] bg-white border border-[#ffdada] flex justify-between gap-[12px]">
                      <div>
                        <strong className="text-[#703333] font-bold">产业化进展数据不足</strong><br />
                        <span className="text-[#718096] text-[13px]">缺少可验证的产能、客户和商业化落地信息。</span>
                      </div>
                      <button className="border border-[#e4ebf5] bg-white rounded-[10px] px-[11px] py-[7px] text-[12px] font-bold text-[#14213d] hover:bg-gray-50 shrink-0">跳过继续</button>
                    </div>
                  </div>

                  <div className="flex gap-[10px] mt-[18px] flex-wrap">
                    <button className="border border-[#2f6df6] bg-[#2f6df6] text-white rounded-[12px] px-[16px] py-[10px] text-[14px] font-semibold hover:bg-[#1d4ed8]">重新生成报告</button>
                    <button className="border border-[#d7e5ff] bg-white text-[#2f6df6] rounded-[12px] px-[16px] py-[10px] text-[14px] font-semibold hover:bg-gray-50">跳过异常数据继续生成</button>
                    <button className="border border-[#ffd4d4] bg-white text-[#e84d4d] rounded-[12px] px-[16px] py-[10px] text-[14px] font-semibold hover:bg-[#fff0f0]">取消任务</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'archived' && (
              <div className="animate-in fade-in duration-300">
                <div className="flex justify-between items-center gap-[14px] mb-[18px]">
                  <div>
                    <h2 className="m-0 text-[22px] font-bold text-[#14213d]">报告已保存到报告库</h2>
                    <p className="m-0 mt-[6px] text-[#718096] text-[14px] leading-[1.6]">
                      当前任务已经完成，报告已作为正式版本保存。你仍可以从历史任务进入该页面查看任务结果，也可以从报告库打开同一份报告。
                    </p>
                  </div>
                  <button className="border border-[#2f6df6] bg-[#2f6df6] text-white rounded-[12px] px-[16px] py-[10px] text-[14px] font-semibold shadow-[0_10px_20px_rgba(47,109,246,0.18)] hover:bg-[#1d4ed8] transition-colors whitespace-nowrap cursor-pointer">
                    在报告库中查看
                  </button>
                </div>

                <div className="bg-white border border-[#e4ebf5] rounded-[18px] p-[34px] min-h-[680px]">
                  <div className="border-b border-[#e4ebf5] pb-[24px] mb-[26px]">
                    <h2 className="m-0 mb-[12px] text-[34px] font-bold leading-[1.25] text-[#14213d]">浙江钠创新能源企业初筛报告</h2>
                    <p className="m-0 text-[#718096] text-[14px] leading-[1.7]">
                      正式版本：V1.0 ｜ 入库时间：2026-04-29 15:58 ｜ 同步状态：已同步至报告库
                    </p>
                  </div>

                  <div className="mb-[28px]">
                    <h3 className="text-[22px] font-bold text-[#14213d] m-0 mb-[12px]">任务完成记录</h3>
                    <table className="w-full border-collapse mt-[12px] text-[14px]">
                      <tbody>
                        <tr>
                          <th className="border border-[#e4ebf5] bg-[#f6f8fc] text-[#4a5870] font-bold p-[12px_14px] text-left w-1/4">报告对象</th>
                          <td className="border border-[#e4ebf5] p-[12px_14px] text-left text-[#2e3a50]">浙江钠创新能源</td>
                        </tr>
                        <tr>
                          <th className="border border-[#e4ebf5] bg-[#f6f8fc] text-[#4a5870] font-bold p-[12px_14px] text-left w-1/4">生成任务</th>
                          <td className="border border-[#e4ebf5] p-[12px_14px] text-left text-[#2e3a50]">Auto Report：企业初筛报告</td>
                        </tr>
                        <tr>
                          <th className="border border-[#e4ebf5] bg-[#f6f8fc] text-[#4a5870] font-bold p-[12px_14px] text-left">已完成动作</th>
                          <td className="border border-[#e4ebf5] p-[12px_14px] text-left text-[#2e3a50]">对象确认、报告配置、报告生成、版本保存、报告入库</td>
                        </tr>
                        <tr>
                          <th className="border border-[#e4ebf5] bg-[#f6f8fc] text-[#4a5870] font-bold p-[12px_14px] text-left">后续建议</th>
                          <td className="border border-[#e4ebf5] p-[12px_14px] text-left text-[#2e3a50]">同步到标的池，并开启融资、客户、专利和产能动态跟踪。</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mb-[28px]">
                    <h3 className="text-[22px] font-bold text-[#14213d] m-0 mb-[12px]">核心结论摘要</h3>
                    <p className="m-0 mb-[12px] text-[#2e3a50] leading-[1.85] text-[15px]">
                      浙江钠创新能源具备一定技术积累和产业化跟踪价值，建议作为钠电池正极材料方向的候选标的继续观察。后续重点跟踪其客户验证、量产落地、核心材料指标提升和资本动态。
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <aside className="flex flex-col gap-[18px] xl:sticky xl:top-[18px]">
          <div className="bg-white border border-[#e4ebf5] rounded-[20px] shadow-[0_8px_28px_rgba(20,38,80,0.04)] p-[22px]">
            <h3 className="m-0 mb-[14px] text-[19px] font-bold text-[#14213d]">报告阶段</h3>
            <div className="flex flex-col gap-[14px]">
              {[
                { name: '确认对象', desc: '已确认浙江钠创新能源为报告主体', done: true },
                { name: '配置报告', desc: '已选择企业初筛报告和重点章节', done: true },
                { name: '生成报告', desc: '正在生成报告正文、摘要和结论', current: true },
                { name: '确认入库', desc: '保存正式版本、导出或同步标的池' },
              ].map((stage, i) => (
                <div key={i} className={`grid grid-cols-[26px_1fr] gap-[12px] items-start ${stage.done ? 'text-[#14213d]' : stage.current ? 'text-[#14213d]' : 'text-[#718096]'}`}>
                  <div className={`w-[22px] h-[22px] mt-[2px] rounded-full border-2 relative flex items-center justify-center ${stage.done ? 'border-[#18a957] bg-[#18a957]' : stage.current ? 'border-[#2f6df6] bg-white' : 'border-[#d6e0f0] bg-white'}`}>
                    {stage.done && <Check size={12} className="text-white" strokeWidth={4} />}
                    {stage.current && <div className="absolute inset-[3px] bg-[#2f6df6] rounded-full"></div>}
                  </div>
                  <div>
                    <div className="font-extrabold text-[14px] mb-[4px] leading-none">{stage.name}</div>
                    <div className="text-[12px] text-[#718096] leading-[1.55]">{stage.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#e4ebf5] rounded-[20px] shadow-[0_8px_28px_rgba(20,38,80,0.04)] p-[22px]">
            <h3 className="m-0 mb-[14px] text-[19px] font-bold text-[#14213d]">报告操作</h3>
            <div className="grid gap-[10px]">
              <button onClick={onViewReport} className="w-full border border-[#2f6df6] bg-[#2f6df6] text-white rounded-[12px] px-[16px] py-[10px] text-[14px] font-semibold hover:bg-[#1d4ed8] transition-colors cursor-pointer text-center">查看当前生成结果</button>
              <button className="w-full border border-[#e4ebf5] bg-white rounded-[12px] px-[16px] py-[10px] text-[14px] text-[#14213d] font-semibold hover:bg-gray-50 transition-colors text-center">进入编辑模式</button>
              <button className="w-full border border-[#e4ebf5] bg-white rounded-[12px] px-[16px] py-[10px] text-[14px] text-[#14213d] font-semibold hover:bg-gray-50 transition-colors text-center">重新生成部分章节</button>
              <button className="w-full border border-[#e4ebf5] bg-white rounded-[12px] px-[16px] py-[10px] text-[14px] text-[#14213d] font-semibold hover:bg-gray-50 transition-colors text-center">导出 PDF</button>
              <button className="w-full border border-[#e4ebf5] bg-white rounded-[12px] px-[16px] py-[10px] text-[14px] text-[#14213d] font-semibold hover:bg-gray-50 transition-colors text-center">导出 Word</button>
              <button className="w-full border border-[#18a957] bg-[#18a957] text-white rounded-[12px] px-[16px] py-[10px] text-[14px] font-semibold hover:bg-[#15803d] transition-colors text-center">保存到报告库</button>
            </div>
          </div>

          <div className="bg-[#f7faff] border border-[#d7e5ff] rounded-[20px] p-[18px] text-[13px] leading-[1.7] text-[#4a5870]">
            <div className="font-bold text-[#14213d] mb-[6px]">生成提示</div>
            <div>报告生成期间可以离开页面，任务完成后会保留在历史任务中，并进入报告预览状态。</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
