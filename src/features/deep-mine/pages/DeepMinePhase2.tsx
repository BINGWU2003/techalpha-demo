import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function DeepMinePhase2({ onBack, onGenerateReport }: { onBack?: () => void; onGenerateReport?: () => void }) {
  const [activeFilter, setActiveFilter] = useState('推荐');
  const [notice, setNotice] = useState('');
  const [enterprises, setEnterprises] = useState([
    {
      id: 1,
      name: '浙江钠创新能源有限公司',
      statusText: '推荐结果',
      techDirection: [{ text: '钠离子电池', type: 'blue' }],
      coreSignals: [{ text: '专利布局', type: 'green' }],
      score: 99,
      followed: false,
      pooled: false,
      selected: true,
    },
    {
      id: 2,
      name: '溧阳中科海钠科技有限责任公司',
      statusText: '推荐结果 · 已关注',
      techDirection: [{ text: '层状氧化物', type: 'blue' }],
      coreSignals: [{ text: '专利活跃', type: 'green' }, { text: '核心技术', type: 'orange' }],
      score: 94,
      followed: true,
      pooled: false,
      selected: true,
    },
    {
      id: 3,
      name: '格林美股份有限公司',
      statusText: '推荐结果 · 循环经济领军',
      techDirection: [{ text: '回收体系', type: 'purple' }],
      coreSignals: [{ text: '供应链协同', type: 'orange' }, { text: '回收技术', type: 'blue' }],
      score: 91,
      followed: false,
      pooled: false,
      selected: true,
    },
    {
      id: 4,
      name: '宁德时代新能源科技股份有限公司',
      statusText: '推荐结果 · 技术风向标',
      techDirection: [{ text: '全体系布局', type: 'blue' }],
      coreSignals: [{ text: '研发爆发', type: 'green' }, { text: '极高壁垒', type: 'blue' }],
      score: 98,
      followed: false,
      pooled: false,
      selected: true,
    },
    {
      id: 5,
      name: '深圳珈钠能源科技有限公司',
      statusText: '推荐结果 · 高潜力初创',
      techDirection: [{ text: '聚阴离子', type: 'purple' }],
      coreSignals: [{ text: '融资密集', type: 'orange' }, { text: '中试线启动', type: 'green' }],
      score: 88,
      followed: false,
      pooled: false,
      selected: true,
    },
    {
      id: 6,
      name: '荆门市格林美新材料有限公司',
      statusText: '推荐结果 · 核心生产基地',
      techDirection: [{ text: '三元前驱体', type: 'blue' }],
      coreSignals: [{ text: '产能扩张', type: 'green' }, { text: '品质优势', type: 'orange' }],
      score: 86,
      followed: false,
      pooled: false,
      selected: true,
    },
    {
      id: 7,
      name: '湖南邦普循环科技有限公司',
      statusText: '推荐结果 · 循环龙头',
      techDirection: [{ text: '退役电池回收', type: 'purple' }],
      coreSignals: [{ text: '战略布局', type: 'orange' }, { text: '技术熟度高', type: 'green' }],
      score: 89,
      followed: false,
      pooled: false,
      selected: true,
    },
    {
      id: 8,
      name: '广东邦普循环科技有限公司',
      statusText: '推荐结果 · 系统集成优势',
      techDirection: [{ text: '全产业链', type: 'blue' }],
      coreSignals: [{ text: '生态协同', type: 'green' }, { text: '行业标准', type: 'orange' }],
      score: 90,
      followed: false,
      pooled: false,
      selected: true,
    }
  ]);

  const visibleEnterprises = useMemo(() => {
    switch (activeFilter) {
      case '已关注':
        return enterprises.filter(ent => ent.followed);
      case '已入池':
        return enterprises.filter(ent => ent.pooled);
      case '推荐':
      case '全部结果':
      default:
        return enterprises;
    }
  }, [activeFilter, enterprises]);

  const visibleIds = useMemo(() => new Set(visibleEnterprises.map(ent => ent.id)), [visibleEnterprises]);
  const selectedVisibleCount = visibleEnterprises.filter(ent => ent.selected).length;
  const allSelected = visibleEnterprises.length > 0 && visibleEnterprises.every(ent => ent.selected);
  const someSelected = selectedVisibleCount > 0;

  const setFilter = (filter: string) => {
    setActiveFilter(filter);
    setNotice('');
  };

  const toggleAll = () => {
    setNotice('');
    setEnterprises(prev => prev.map(ent => (
      visibleIds.has(ent.id) ? { ...ent, selected: !allSelected } : ent
    )));
  };

  const toggleSelection = (id: number) => {
    setNotice('');
    setEnterprises(prev => prev.map(ent => 
      ent.id === id ? { ...ent, selected: !ent.selected } : ent
    ));
  };

  const handleBatchFollow = () => {
    const selectedIds = new Set(visibleEnterprises.filter(ent => ent.selected && !ent.followed).map(ent => ent.id));
    const skippedCount = selectedVisibleCount - selectedIds.size;

    setEnterprises(prev => prev.map(ent => {
      if (selectedIds.has(ent.id)) {
        let newStatus = ent.statusText;
        if (!newStatus.includes('已关注')) {
          newStatus += ' · 已关注';
        }
        return { ...ent, followed: true, statusText: newStatus };
      }
      return ent;
    }));

    setNotice(selectedIds.size > 0
      ? `已新增关注 ${selectedIds.size} 家${skippedCount > 0 ? `，${skippedCount} 家已关注` : ''}`
      : '选中企业均已关注，无需重复操作');
  };

  const handleBatchPool = () => {
    const selectedIds = new Set(visibleEnterprises.filter(ent => ent.selected && !ent.pooled).map(ent => ent.id));
    const skippedCount = selectedVisibleCount - selectedIds.size;

    setEnterprises(prev => prev.map(ent => {
      if (selectedIds.has(ent.id)) {
        let newStatus = ent.statusText;
        if (!newStatus.includes('已入池')) {
          newStatus += ' · 已入池';
        }
        return { ...ent, pooled: true, statusText: newStatus };
      }
      return ent;
    }));

    setNotice(selectedIds.size > 0
      ? `已新增入池 ${selectedIds.size} 家${skippedCount > 0 ? `，${skippedCount} 家已入池` : ''}`
      : '选中企业均已入池，无需重复操作');
  };

  const handleFollow = (id: number) => {
    setNotice('');
    setEnterprises(prev => prev.map(ent => {
      if (ent.id === id) {
        const isNowFollowed = !ent.followed;
        let newStatus = ent.statusText;
        if (isNowFollowed && !newStatus.includes('已关注')) {
          newStatus += ' · 已关注';
        } else if (!isNowFollowed && newStatus.includes(' · 已关注')) {
          newStatus = newStatus.replace(' · 已关注', '');
        }
        return { ...ent, followed: isNowFollowed, statusText: newStatus };
      }
      return ent;
    }));
  };

  const handlePool = (id: number) => {
    setNotice('');
    setEnterprises(prev => prev.map(ent => {
      if (ent.id === id) {
        const isNowPooled = !ent.pooled;
        let newStatus = ent.statusText;
        if (isNowPooled && !newStatus.includes('已入池')) {
          newStatus += ' · 已入池';
        } else if (!isNowPooled && newStatus.includes(' · 已入池')) {
          newStatus = newStatus.replace(' · 已入池', '');
        }
        return { ...ent, pooled: isNowPooled, statusText: newStatus };
      }
      return ent;
    }));
  };

  const getTagClasses = (type: string) => {
    switch (type) {
      case 'blue': return 'bg-[#eaf1ff] text-[#2563eb]';
      case 'green': return 'bg-[#eafaf1] text-[#16a34a]';
      case 'orange': return 'bg-[#fff7e8] text-[#d97706]';
      case 'purple': return 'bg-[#f3ecff] text-[#8b5cf6]';
      default: return 'bg-[#f8fafc] text-[#64748b]';
    }
  };

  return (
    <div className="max-w-[1120px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
      <div className="text-[13px] text-[#64748b] mb-4">
        工作台 / 挖企业 / <b className="text-[#334155] font-bold">企业发现结果</b>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_232px] gap-[18px] items-start">
        <main>
          {/* Panel 1 */}
          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex items-start gap-3">
              {onBack && (
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={onBack}
                  className="w-8 h-8 rounded-[8px] bg-white border-[#dbe4f1] text-[#334155] hover:bg-gray-50 hover:border-[#2563eb] hover:text-[#2563eb] transition-all shrink-0"
                  title="返回"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <div className="min-w-0 flex-1">
                <h1 className="text-[26px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">企业发现结果</h1>
                <p className="mt-2 text-[#64748b] text-[14px] leading-[1.65]">这里展示的是本次任务的“任务结果池”。推荐企业不直接进入企业库，只有用户关注、入池、出报告或开启跟踪后，才沉淀为企业资产。</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">任务结果 {enterprises.length} 家</span>
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">推荐 {enterprises.length} 家</span>
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">已关注 {enterprises.filter(e => e.followed).length} 家</span>
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff7e8] text-[#d97706]">已入池 {enterprises.filter(e => e.pooled).length} 家</span>
                </div>
              </div>
            </div>
          </section>

          {/* Panel 2 */}
          <section className="mt-[18px] bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex flex-col md:flex-row gap-[10px] items-start md:items-center justify-between mb-4">
              <div className="flex flex-wrap gap-2">
                {['推荐', '全部结果', '已关注', '已入池'].map(filter => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? 'default' : 'outline'}
                    onClick={() => setFilter(filter)}
                    className={`rounded-full px-[12px] h-[34px] text-[12px] font-extrabold ${activeFilter === filter ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]' : 'text-[#64748b]'}`}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto mt-2 md:mt-0">
                <Button variant="outline" onClick={handleBatchFollow} disabled={!someSelected} className="h-[42px] px-[16px] rounded-[13px] font-extrabold flex-1 md:flex-none">批量关注（{selectedVisibleCount}）</Button>
                <Button variant="outline" onClick={handleBatchPool} disabled={!someSelected} className="h-[42px] px-[16px] rounded-[13px] font-extrabold flex-1 md:flex-none">批量入池（{selectedVisibleCount}）</Button>
              </div>
            </div>

            <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-[14px] border border-[#e5eaf3] bg-[#f8fafc] px-3 py-2 text-[12px] text-[#64748b]">
              <span>当前视图 {visibleEnterprises.length} 家，已选 {selectedVisibleCount} 家</span>
              {notice && <span className="font-bold text-[#2563eb]">{notice}</span>}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px] min-w-[700px]">
                <thead>
                  <tr>
                    <th className="text-left text-[#64748b] text-[12px] font-normal pb-[10px] border-b border-[#e5eaf3] w-[36px]">
                      <Checkbox 
                        checked={(allSelected ? true : someSelected ? "indeterminate" : false) as any} 
                        onCheckedChange={toggleAll}
                        className="cursor-pointer" 
                      />
                    </th>
                    <th className="text-left text-[#64748b] text-[12px] font-normal pb-[10px] border-b border-[#e5eaf3]">企业</th>
                    <th className="text-left text-[#64748b] text-[12px] font-normal pb-[10px] border-b border-[#e5eaf3]">技术方向</th>
                    <th className="text-left text-[#64748b] text-[12px] font-normal pb-[10px] border-b border-[#e5eaf3]">核心信号</th>
                    <th className="text-left text-[#64748b] text-[12px] font-normal pb-[10px] border-b border-[#e5eaf3]">评分</th>
                    <th className="text-right text-[#64748b] text-[12px] font-normal pb-[10px] border-b border-[#e5eaf3]">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleEnterprises.length > 0 ? visibleEnterprises.map((ent, index) => (
                    <tr key={ent.id}>
                      <td className={`py-[14px] ${index !== visibleEnterprises.length - 1 ? 'border-b border-[#edf1f7]' : ''} align-middle`}>
                        <Checkbox 
                          checked={ent.selected}
                          onCheckedChange={() => toggleSelection(ent.id)}
                          className="cursor-pointer" 
                        />
                      </td>
                      <td className={`py-[14px] ${index !== visibleEnterprises.length - 1 ? 'border-b border-[#edf1f7]' : ''} align-middle`}>
                        <div className="font-black text-[#172033]">{ent.name}</div>
                        <div className="text-[12px] text-[#64748b] mt-1">{ent.statusText}</div>
                      </td>
                      <td className={`py-[14px] ${index !== visibleEnterprises.length - 1 ? 'border-b border-[#edf1f7]' : ''} align-middle`}>
                        <div className="flex gap-2 flex-wrap">
                          {ent.techDirection.map((tag, i) => (
                            <span key={i} className={`inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap ${getTagClasses(tag.type)}`}>{tag.text}</span>
                          ))}
                        </div>
                      </td>
                      <td className={`py-[14px] ${index !== visibleEnterprises.length - 1 ? 'border-b border-[#edf1f7]' : ''} align-middle`}>
                        <div className="flex gap-2 flex-wrap">
                          {ent.coreSignals.map((tag, i) => (
                            <span key={i} className={`inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap ${getTagClasses(tag.type)}`}>{tag.text}</span>
                          ))}
                        </div>
                      </td>
                      <td className={`py-[14px] ${index !== visibleEnterprises.length - 1 ? 'border-b border-[#edf1f7]' : ''} align-middle`}>
                        <span className="font-black">{ent.score}</span>
                      </td>
                      <td className={`py-[14px] ${index !== visibleEnterprises.length - 1 ? 'border-b border-[#edf1f7]' : ''} align-middle text-right`}>
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="outline"
                            onClick={() => handleFollow(ent.id)}
                            className={`h-[32px] px-[10px] rounded-[10px] text-[12px] font-extrabold ${ent.followed ? 'border-[#eafaf1] bg-[#eafaf1] text-[#16a34a] hover:bg-[#dcfce7]' : ''}`}
                          >
                            {ent.followed ? '已关注' : '关注'}
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handlePool(ent.id)}
                            className={`h-[32px] px-[10px] rounded-[10px] text-[12px] font-extrabold ${ent.pooled ? 'border-[#fff7e8] bg-[#fff7e8] text-[#d97706] hover:bg-[#fef3c7]' : ''}`}
                          >
                            {ent.pooled ? '已入池' : '入池'}
                          </Button>
                          <Button 
                            onClick={onGenerateReport} 
                            className="h-[32px] px-[10px] rounded-[10px] text-[12px] font-extrabold bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                          >
                            出报告
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-[#64748b]">
                        当前视图暂无企业，请切换上方筛选。
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Panel 3 */}
        </main>

        {/* Right Aside */}
        <aside className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[18px] xl:sticky xl:top-[74px]">
          <h3 className="m-0 mb-[14px] text-[15px]">任务阶段</h3>
          
          <div className="relative grid grid-cols-[24px_1fr] gap-[10px] pb-[18px]">
            <div className="absolute left-[10px] top-[24px] w-[2px] h-[calc(100%-18px)] bg-[#dbe4f1]"></div>
            <div className="w-[22px] h-[22px] rounded-full bg-[#16a34a] border-4 border-white shadow-[0_0_0_1px_#bbf7d0] relative z-10 box-border"></div>
            <div>
              <strong className="block text-[13px] font-bold text-[#172033]">明确目标</strong>
              <span className="block text-[12px] text-[#64748b] mt-[3px] leading-[1.45]">钠电池正极材料</span>
            </div>
          </div>

          <div className="relative grid grid-cols-[24px_1fr] gap-[10px] pb-[18px]">
            <div className="absolute left-[10px] top-[24px] w-[2px] h-[calc(100%-18px)] bg-[#dbe4f1]"></div>
            <div className="w-[22px] h-[22px] rounded-full bg-[#16a34a] border-4 border-white shadow-[0_0_0_1px_#bbf7d0] relative z-10 box-border"></div>
            <div>
              <strong className="block text-[13px] font-bold text-[#172033]">产业线索分析</strong>
              <span className="block text-[12px] text-[#64748b] mt-[3px] leading-[1.45]">已完成线索分析</span>
            </div>
          </div>

          <div className="relative grid grid-cols-[24px_1fr] gap-[10px] pb-[18px]">
            <div className="absolute left-[10px] top-[24px] w-[2px] h-[calc(100%-18px)] bg-[#dbe4f1]"></div>
            <div className="w-[22px] h-[22px] rounded-full bg-[#2563eb] border-4 border-white shadow-[0_0_0_4px_#eaf1ff] relative z-10 box-border"></div>
            <div>
              <strong className="block text-[13px] font-bold text-[#172033]">企业发现</strong>
              <span className="block text-[12px] text-[#64748b] mt-[3px] leading-[1.45]">当前为任务结果池</span>
            </div>
          </div>

          <div className="relative grid grid-cols-[24px_1fr] gap-[10px] pb-[18px]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#e2e8f0] border-4 border-white shadow-[0_0_0_1px_#dbe4f1] relative z-10 box-border"></div>
            <div>
              <strong className="block text-[13px] font-bold text-[#172033]">标的跟进</strong>
              <span className="block text-[12px] text-[#64748b] mt-[3px] leading-[1.45]">关注、入池、出报告或跟踪</span>
            </div>
          </div>

          <div className="bg-[#f8fafc] border border-[#e5eaf3] rounded-[14px] p-[13px] mt-[14px]">
            <strong className="text-[13px] font-black text-[#172033]">资产规则</strong>
            <p className="text-[12px] text-[#64748b] mt-[5px] mb-0 leading-[1.5]">推荐企业仍是任务结果；关注后进入企业库，入池后成为重点跟进企业。</p>
          </div>
        </aside>

      </div>
    </div>
  );
}
