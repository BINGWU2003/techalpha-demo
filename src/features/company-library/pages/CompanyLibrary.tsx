import { useState } from 'react';
import { Select as AntSelect } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CompanyLibrary({ onBack, onGenerateReport, onOpenReport }: { onBack?: () => void; onGenerateReport?: () => void; onOpenReport?: () => void; }) {
  const [activeTab, setActiveTab] = useState('全部企业');
  
  const tabs = ['全部企业', '已关注', '标的池', '已生成报告'];

  return (
    <div className="max-w-[1180px] mx-auto p-[30px_28px_64px] max-md:p-[24px_16px_56px]">
      <div className="text-[13px] text-[#64748b] mb-[16px]">
        工作台 / <b className="text-[#334155] font-bold">企业库</b>
      </div>

      <section className="flex flex-col md:flex-row md:items-end justify-between gap-[16px] mb-[18px]">
        <div>
          <div className="flex items-center gap-3 mb-3">
            {onBack && (
              <Button 
                variant="outline"
                size="icon"
                onClick={onBack}
                className="w-8 h-8 rounded-[8px] text-[#334155] border-[#dbe4f1] hover:text-[#2563eb] hover:border-[#2563eb] transition-all"
                title="返回"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <span className="text-[12px] font-black text-[#2563eb] bg-[#eaf1ff] rounded-full px-[10px] py-[7px] inline-flex">Company Library · 企业资产</span>
          </div>
          <h1 className="text-[28px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">企业库</h1>
          <p className="mt-2 text-[#64748b] text-[13px] leading-[1.65]">企业库只管理用户确认过的企业。任务结果池中的临时企业不会自动进入企业库，只有经过确认或出报告后才沉淀为企业资产。</p>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px] mb-[18px]">
        <div className="border border-[#e5eaf3] bg-white rounded-[16px] p-[16px] shadow-[0_10px_24px_rgba(15,23,42,0.035)]">
          <span className="block text-[#64748b] text-[12px] mb-[5px]">已关注企业</span>
          <strong className="text-[26px] tracking-[-0.04em] font-normal">68</strong><small className="text-[#64748b] text-[12px]"> 家</small>
        </div>
        <div className="border border-[#e5eaf3] bg-white rounded-[16px] p-[16px] shadow-[0_10px_24px_rgba(15,23,42,0.035)]">
          <span className="block text-[#64748b] text-[12px] mb-[5px]">标的池</span>
          <strong className="text-[26px] tracking-[-0.04em] font-normal text-[#16a34a]">12</strong><small className="text-[#64748b] text-[12px]"> 家</small>
        </div>
        <div className="border border-[#e5eaf3] bg-white rounded-[16px] p-[16px] shadow-[0_10px_24px_rgba(15,23,42,0.035)]">
          <span className="block text-[#64748b] text-[12px] mb-[5px]">已生成报告</span>
          <strong className="text-[26px] tracking-[-0.04em] font-normal text-[#8b5cf6]">24</strong><small className="text-[#64748b] text-[12px]"> 家</small>
        </div>
      </section>

      <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[20px]">
        <div className="flex flex-col md:flex-row gap-[10px] items-stretch lg:items-center justify-between flex-wrap mb-[14px]">
          <div className="flex gap-[10px] flex-wrap items-center w-full lg:w-auto">
            <Input className="h-[40px] rounded-[12px] bg-[#f8fafc] w-full md:w-[260px]" placeholder="搜索企业名称、技术标签..." />
            <AntSelect
              defaultValue="全部方向"
              size="large"
              className="w-full md:!w-[130px]"
              options={[
                { value: '全部方向', label: '全部方向' },
                { value: '钠电池正极材料', label: '钠电池正极材料' },
                { value: 'AI芯片', label: 'AI芯片' },
                { value: '人形机器人', label: '人形机器人' },
              ]}
            />
            <AntSelect
              defaultValue="全部状态"
              size="large"
              className="w-full md:!w-[130px]"
              options={[
                { value: '全部状态', label: '全部状态' },
                { value: '已关注', label: '已关注' },
                { value: '标的池', label: '标的池' },
              ]}
            />
          </div>
          <div className="flex gap-[8px] flex-wrap mt-[10px] lg:mt-0">
            {tabs.map(tab => (
              <Button 
                key={tab}
                variant="outline"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-[12px] py-[8px] h-auto text-[12px] font-extrabold cursor-pointer transition-colors ${activeTab === tab ? 'bg-[#2563eb] text-white border-[#2563eb] hover:bg-[#1d4ed8] hover:text-white' : 'bg-white border-[#dbe4f1] text-[#64748b] hover:border-[#bfdbfe]'}`}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px] min-w-[800px]">
            <thead>
              <tr>
                <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">企业</th>
                <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">关注方向</th>
                <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">状态</th>
                <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">核心信号</th>
                <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">最近动作</th>
                <th className="text-right text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">操作</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <div className="font-black text-[#172033]">浙江钠创新能源</div>
                  <div className="text-[12px] text-[#64748b] mt-[4px] leading-[1.45]">来源：钠电正极材料企业发现任务</div>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">层状氧化物</span>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <div className="flex gap-[7px] items-center flex-wrap">
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">已关注</span>
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff7e8] text-[#d97706]">待入池</span>
                  </div>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <div className="flex gap-[4px] flex-wrap">
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">专利活跃</span>
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff7e8] text-[#d97706]">融资动态</span>
                  </div>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">生成企业初筛报告</td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle text-right">
                  <div className="flex gap-[8px] justify-end flex-wrap">
                    <Button variant="outline" size="sm" className="rounded-[10px] font-extrabold text-[#334155] border-[#dbe4f1] hover:bg-gray-50">企业画像</Button>
                    <Button variant="outline" size="sm" className="rounded-[10px] font-extrabold text-[#334155] border-[#dbe4f1] hover:bg-gray-50">加入标的池</Button>
                    <Button size="sm" onClick={onGenerateReport} className="rounded-[10px] font-extrabold text-[#ffffff] bg-[#2563eb] hover:bg-[#1d4ed8]">出报告</Button>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <div className="font-black text-[#172033]">中科海钠</div>
                  <div className="text-[12px] text-[#64748b] mt-[4px] leading-[1.45]">来源：企业库历史关注</div>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">钠电体系化布局</span>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <div className="flex gap-[7px] items-center flex-wrap">
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">标的池</span>
                  </div>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <div className="flex gap-[4px] flex-wrap">
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">产业协同</span>
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">技术领先</span>
                  </div>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">更新企业动态</td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle text-right">
                  <div className="flex gap-[8px] justify-end flex-wrap">
                    <Button size="sm" onClick={onOpenReport} className="rounded-[10px] font-extrabold text-[#ffffff] bg-[#2563eb] hover:bg-[#1d4ed8]">打开报告</Button>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <div className="font-black text-[#172033]">某新材料科技公司</div>
                  <div className="text-[12px] text-[#64748b] mt-[4px] leading-[1.45]">来源：钠电正极材料企业发现任务</div>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">聚阴离子</span>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <div className="flex gap-[7px] items-center flex-wrap">
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">已关注</span>
                  </div>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <div className="flex gap-[4px] flex-wrap">
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff7e8] text-[#d97706]">客户线索</span>
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">需复核</span>
                  </div>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">关注企业</td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle text-right">
                  <div className="flex gap-[8px] justify-end flex-wrap">
                    <Button variant="outline" size="sm" className="rounded-[10px] font-extrabold text-[#334155] border-[#dbe4f1] hover:bg-gray-50">企业画像</Button>
                    <Button variant="outline" size="sm" className="rounded-[10px] font-extrabold text-[#334155] border-[#dbe4f1] hover:bg-gray-50">加入标的池</Button>
                    <Button size="sm" onClick={onGenerateReport} className="rounded-[10px] font-extrabold text-[#ffffff] bg-[#2563eb] hover:bg-[#1d4ed8]">出报告</Button>
                  </div>
                </td>
              </tr>
              {/* Row 4 */}
              <tr>
                <td className="py-[15px] border-0 align-middle">
                  <div className="font-black text-[#172033]">某储能材料企业</div>
                  <div className="text-[12px] text-[#64748b] mt-[4px] leading-[1.45]">来源：人工录入企业</div>
                </td>
                <td className="py-[15px] border-0 align-middle">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">普鲁士蓝</span>
                </td>
                <td className="py-[15px] border-0 align-middle">
                  <div className="flex gap-[7px] items-center flex-wrap">
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">已关注</span>
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">低优先级</span>
                  </div>
                </td>
                <td className="py-[15px] border-0 align-middle">
                  <div className="flex gap-[4px] flex-wrap">
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">专利增长</span>
                    <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff1f2] text-[#ef4444]">商业化不确定</span>
                  </div>
                </td>
                <td className="py-[15px] border-0 align-middle">补充企业标签</td>
                <td className="py-[15px] border-0 align-middle text-right">
                  <div className="flex gap-[8px] justify-end flex-wrap">
                    <Button variant="outline" size="sm" className="rounded-[10px] font-extrabold text-[#334155] border-[#dbe4f1] hover:bg-gray-50">企业画像</Button>
                    <Button size="sm" onClick={onGenerateReport} className="rounded-[10px] font-extrabold text-[#ffffff] bg-[#2563eb] hover:bg-[#1d4ed8]">出报告</Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
