import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ReportLibrary({ onBack, onCreateReport, onOpenReport, onEditReport }: { onBack?: () => void; onCreateReport?: () => void; onOpenReport?: () => void; onEditReport?: () => void; }) {
  const [activeTab, setActiveTab] = useState('全部报告');
  
  const tabs = ['全部报告', '待复核', '已定稿', '已导出', '有更新'];

  return (
    <div className="max-w-[1180px] mx-auto p-[30px_28px_64px] max-md:p-[24px_16px_56px]">
      <div className="text-[13px] text-[#64748b] mb-[16px]">
        工作台 / <b className="text-[#334155] font-bold">报告库</b>
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
            <span className="text-[12px] font-black text-[#2563eb] bg-[#eaf1ff] rounded-full px-[10px] py-[7px] inline-flex">Report Library · 报告资产</span>
          </div>
          <h1 className="text-[28px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">报告库</h1>
          <p className="mt-2 text-[#64748b] text-[13px] leading-[1.65]">报告库管理所有已生成的报告资产，包括报告正文、版本、状态、导出文件和关联对象。报告可以来自首页出报告、企业库出报告或企业发现任务后的出报告。</p>
        </div>
        <Button onClick={onCreateReport} className="h-[40px] px-[16px] rounded-[13px] font-extrabold shadow-[0_10px_18px_rgba(37,99,235,0.18)] text-white bg-[#2563eb] hover:bg-[#1d4ed8] shrink-0 w-full md:w-auto">新建报告任务</Button>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[12px] mb-[18px]">
        <div className="border border-[#e5eaf3] bg-white rounded-[16px] p-[16px] shadow-[0_10px_24px_rgba(15,23,42,0.035)]">
          <span className="block text-[#64748b] text-[12px] mb-[5px]">全部报告</span>
          <strong className="text-[26px] tracking-[-0.04em] font-normal">38</strong><small className="text-[#64748b] text-[12px]"> 份</small>
        </div>
        <div className="border border-[#e5eaf3] bg-white rounded-[16px] p-[16px] shadow-[0_10px_24px_rgba(15,23,42,0.035)]">
          <span className="block text-[#64748b] text-[12px] mb-[5px]">待复核</span>
          <strong className="text-[26px] tracking-[-0.04em] font-normal text-[#f59e0b]">9</strong><small className="text-[#64748b] text-[12px]"> 份</small>
        </div>
        <div className="border border-[#e5eaf3] bg-white rounded-[16px] p-[16px] shadow-[0_10px_24px_rgba(15,23,42,0.035)]">
          <span className="block text-[#64748b] text-[12px] mb-[5px]">已定稿</span>
          <strong className="text-[26px] tracking-[-0.04em] font-normal text-[#16a34a]">17</strong><small className="text-[#64748b] text-[12px]"> 份</small>
        </div>
        <div className="border border-[#e5eaf3] bg-white rounded-[16px] p-[16px] shadow-[0_10px_24px_rgba(15,23,42,0.035)]">
          <span className="block text-[#64748b] text-[12px] mb-[5px]">已导出</span>
          <strong className="text-[26px] tracking-[-0.04em] font-normal text-[#2563eb]">21</strong><small className="text-[#64748b] text-[12px]"> 份</small>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-[18px] mb-[18px]">
        <div className="bg-[#f8fafc] border border-[#e5eaf3] rounded-[15px] p-[15px]">
          <h3 className="text-[15px] m-0 mb-[8px] font-bold">报告库口径</h3>
          <p className="text-[12px] text-[#64748b] leading-[1.7] m-0">只要报告生成，就进入报告库。报告可以关联企业、任务、标的池状态和导出文件，并支持版本管理。</p>
        </div>
        <div className="bg-[#f8fafc] border border-[#e5eaf3] rounded-[15px] p-[15px]">
          <h3 className="text-[15px] m-0 mb-[8px] font-bold">与企业库关系</h3>
          <p className="text-[12px] text-[#64748b] leading-[1.7] m-0">企业库管理“企业对象”，报告库管理“内容交付物”。一个企业可以关联多份报告，一份报告也可以反向同步结论到企业库或标的池。</p>
        </div>
      </section>

      <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[20px]">
        <div className="flex flex-col md:flex-row gap-[10px] items-stretch lg:items-center justify-between flex-wrap mb-[14px]">
          <div className="flex gap-[10px] flex-wrap items-center w-full lg:w-auto">
            <Input className="h-[40px] rounded-[12px] bg-[#f8fafc] w-full md:w-[260px]" placeholder="搜索报告名称、企业、方向..." />
            <Select defaultValue="全部类型">
              <SelectTrigger className="w-full md:w-[130px] h-[40px] rounded-[12px] bg-[#f8fafc]">
                <SelectValue placeholder="报告类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全部类型">全部类型</SelectItem>
                <SelectItem value="企业初筛报告">企业初筛报告</SelectItem>
                <SelectItem value="技术评估报告">技术评估报告</SelectItem>
                <SelectItem value="深度尽调报告">深度尽调报告</SelectItem>
                <SelectItem value="对比报告">对比报告</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="全部状态">
              <SelectTrigger className="w-full md:w-[130px] h-[40px] rounded-[12px] bg-[#f8fafc]">
                <SelectValue placeholder="状态过滤" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全部状态">全部状态</SelectItem>
                <SelectItem value="待复核">待复核</SelectItem>
                <SelectItem value="已定稿">已定稿</SelectItem>
                <SelectItem value="已导出">已导出</SelectItem>
              </SelectContent>
            </Select>
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
                <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">报告</th>
                <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">关联对象</th>
                <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">类型</th>
                <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">状态</th>
                <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">版本</th>
                <th className="text-left text-[#64748b] text-[12px] pb-[10px] border-b border-[#e5eaf3]">更新时间</th>
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
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">浙江钠创新能源</span>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">企业初筛报告</td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff7e8] text-[#d97706]">待复核</span>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">v1.0</td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">刚刚</td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle text-right">
                  <div className="flex gap-[8px] justify-end flex-wrap">
                    <Button size="sm" onClick={onOpenReport} className="rounded-[10px] font-extrabold text-[#ffffff] bg-[#2563eb] hover:bg-[#1d4ed8]">打开</Button>
                    <Button size="sm" variant="outline" onClick={onEditReport} className="rounded-[10px] font-extrabold text-[#334155] hover:bg-gray-50 border-[#dbe4f1]">编辑</Button>
                    <Button size="sm" variant="outline" className="rounded-[10px] font-extrabold text-[#334155] hover:bg-gray-50 border-[#dbe4f1]">导出</Button>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <div className="font-black text-[#172033]">中科海钠技术评估报告</div>
                  <div className="text-[12px] text-[#64748b] mt-[4px] leading-[1.45]">来源：企业库出报告任务</div>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">中科海钠</span>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">技术评估报告</td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">已定稿</span>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">v2.1</td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">今天</td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle text-right">
                  <div className="flex gap-[8px] justify-end flex-wrap">
                    <button onClick={onOpenReport} className="border border-[#2563eb] bg-[#2563eb] rounded-[10px] px-[10px] py-[8px] text-[12px] font-extrabold text-white cursor-pointer hover:bg-[#1d4ed8]">打开</button>
                    <button className="border border-[#dbe4f1] bg-white rounded-[10px] px-[10px] py-[8px] text-[12px] font-extrabold text-[#334155] cursor-pointer hover:bg-gray-50">下载</button>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <div className="font-black text-[#172033]">钠电正极材料企业对比摘要</div>
                  <div className="text-[12px] text-[#64748b] mt-[4px] leading-[1.45]">来源：标的池企业集合</div>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">4 家企业</span>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">对比报告</td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">已导出</span>
                </td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">v1.3</td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle">昨天</td>
                <td className="py-[15px] border-b border-[#edf1f7] align-middle text-right">
                  <div className="flex gap-[8px] justify-end flex-wrap">
                    <button onClick={onOpenReport} className="border border-[#2563eb] bg-[#2563eb] rounded-[10px] px-[10px] py-[8px] text-[12px] font-extrabold text-white cursor-pointer hover:bg-[#1d4ed8]">打开</button>
                    <button className="border border-[#dbe4f1] bg-white rounded-[10px] px-[10px] py-[8px] text-[12px] font-extrabold text-[#334155] cursor-pointer hover:bg-gray-50">下载</button>
                  </div>
                </td>
              </tr>
              {/* Row 4 */}
              <tr>
                <td className="py-[15px] border-0 align-middle">
                  <div className="font-black text-[#172033]">某新材料科技公司初筛报告</div>
                  <div className="text-[12px] text-[#64748b] mt-[4px] leading-[1.45]">来源：企业发现任务后出报告</div>
                </td>
                <td className="py-[15px] border-0 align-middle">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">某新材料科技公司</span>
                </td>
                <td className="py-[15px] border-0 align-middle">企业初筛报告</td>
                <td className="py-[15px] border-0 align-middle">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff7e8] text-[#d97706]">待复核</span>
                </td>
                <td className="py-[15px] border-0 align-middle">v0.9</td>
                <td className="py-[15px] border-0 align-middle">3 天前</td>
                <td className="py-[15px] border-0 align-middle text-right">
                  <div className="flex gap-[8px] justify-end flex-wrap">
                    <Button size="sm" onClick={onOpenReport} className="rounded-[10px] font-extrabold text-[#ffffff] bg-[#2563eb] hover:bg-[#1d4ed8]">打开</Button>
                    <Button size="sm" variant="outline" onClick={onEditReport} className="rounded-[10px] font-extrabold text-[#334155] hover:bg-gray-50 border-[#dbe4f1]">编辑</Button>
                    <Button size="sm" variant="outline" className="rounded-[10px] font-extrabold text-[#334155] hover:bg-gray-50 border-[#dbe4f1]">导出</Button>
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
