import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Alerts({ onBack, onUpdateReport }: { onBack?: () => void; onUpdateReport?: () => void; }) {
  const [activeTab, setActiveTab] = useState('全部');

  const tabs = ['全部', '高优先级', '待处理', '已处理'];

  return (
    <div className="max-w-[1120px] mx-auto p-[30px_28px_64px] max-md:p-[24px_16px_56px]">
      <div className="text-[13px] text-[#64748b] mb-[16px]">
        工作台 / <b className="text-[#334155] font-bold">跟踪预警</b>
      </div>

      <section className="flex items-end justify-between gap-[16px] mb-[18px] flex-col md:flex-row md:items-start max-md:items-start max-md:flex-col">
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
            <span className="text-[12px] font-black text-[#2563eb] bg-[#eaf1ff] rounded-full px-[10px] py-[7px] inline-flex">Monitoring · 重点事件</span>
          </div>
          <h1 className="text-[28px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">跟踪预警</h1>
          <p className="mt-2 text-[#64748b] text-[13px] leading-[1.65]">系统自动跟踪已关注企业和标的池企业，页面只呈现重点事件。用户关注事件本身，并决定是否更新画像、更新报告或调整标的池。</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-5 gap-[12px] mb-[18px]">
        <div className="bg-[#f8fbff] border border-[#bfdbfe] rounded-[18px] p-[16px] cursor-pointer shadow-[0_10px_24px_rgba(15,23,42,0.035)]">
          <strong className="text-[14px] font-bold text-[#172033]">融资 / 资本</strong>
          <p className="text-[12px] text-[#64748b] mt-[6px] leading-[1.5]">融资、投资方、估值、股权变化</p>
          <div className="mt-[10px] text-[26px] font-black tracking-[-0.04em] text-[#ef4444]">2</div>
        </div>
        <div className="bg-white border border-[#e5eaf3] rounded-[18px] p-[16px] cursor-pointer shadow-[0_10px_24px_rgba(15,23,42,0.035)] hover:border-[#bfdbfe] hover:bg-[#f8fbff]">
          <strong className="text-[14px] font-bold text-[#172033]">专利 / 技术</strong>
          <p className="text-[12px] text-[#64748b] mt-[6px] leading-[1.5]">新专利、技术路线、研发进展</p>
          <div className="mt-[10px] text-[26px] font-black tracking-[-0.04em] text-[#2563eb]">3</div>
        </div>
        <div className="bg-white border border-[#e5eaf3] rounded-[18px] p-[16px] cursor-pointer shadow-[0_10px_24px_rgba(15,23,42,0.035)] hover:border-[#bfdbfe] hover:bg-[#f8fbff]">
          <strong className="text-[14px] font-bold text-[#172033]">客户 / 订单</strong>
          <p className="text-[12px] text-[#64748b] mt-[6px] leading-[1.5]">客户合作、订单、招投标、验证进展</p>
          <div className="mt-[10px] text-[26px] font-black tracking-[-0.04em] text-[#16a34a]">1</div>
        </div>
        <div className="bg-white border border-[#e5eaf3] rounded-[18px] p-[16px] cursor-pointer shadow-[0_10px_24px_rgba(15,23,42,0.035)] hover:border-[#bfdbfe] hover:bg-[#f8fbff]">
          <strong className="text-[14px] font-bold text-[#172033]">工商 / 股权</strong>
          <p className="text-[12px] text-[#64748b] mt-[6px] leading-[1.5]">股东变动、法务、经营异常</p>
          <div className="mt-[10px] text-[26px] font-black tracking-[-0.04em] text-[#f59e0b]">0</div>
        </div>
        <div className="bg-white border border-[#e5eaf3] rounded-[18px] p-[16px] cursor-pointer shadow-[0_10px_24px_rgba(15,23,42,0.035)] hover:border-[#bfdbfe] hover:bg-[#f8fbff]">
          <strong className="text-[14px] font-bold text-[#172033]">风险 / 舆情</strong>
          <p className="text-[12px] text-[#64748b] mt-[6px] leading-[1.5]">负面新闻、诉讼、产能延期</p>
          <div className="mt-[10px] text-[26px] font-black tracking-[-0.04em] text-[#8b5cf6]">0</div>
        </div>
      </section>

      <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[20px] mt-[18px]">
        <div className="flex flex-col md:flex-row gap-[10px] items-stretch lg:items-center justify-between flex-wrap mb-[14px]">
          <div className="flex gap-[10px] flex-wrap items-center w-full lg:w-auto">
            <Input className="h-[40px] rounded-[12px] bg-[#f8fafc] w-full md:w-[260px]" placeholder="搜索企业或事件..." />
            <Select defaultValue="全部企业">
              <SelectTrigger className="w-full md:w-[130px] h-[40px] rounded-[12px] bg-[#f8fafc]">
                <SelectValue placeholder="企业过滤" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全部企业">全部企业</SelectItem>
                <SelectItem value="标的池企业">标的池企业</SelectItem>
                <SelectItem value="已关注企业">已关注企业</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="全部事件">
              <SelectTrigger className="w-full md:w-[130px] h-[40px] rounded-[12px] bg-[#f8fafc]">
                <SelectValue placeholder="事件过滤" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全部事件">全部事件</SelectItem>
                <SelectItem value="融资/资本">融资/资本</SelectItem>
                <SelectItem value="专利/技术">专利/技术</SelectItem>
                <SelectItem value="客户/订单">客户/订单</SelectItem>
                <SelectItem value="工商/股权">工商/股权</SelectItem>
                <SelectItem value="风险/舆情">风险/舆情</SelectItem>
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

        <div className="grid gap-[12px]">
          <div className="border border-[#e5eaf3] bg-white rounded-[16px] p-[15px] grid grid-cols-[34px_1fr] md:grid-cols-[34px_1fr_auto] gap-[12px] items-start">
            <div className="w-[34px] h-[34px] rounded-[12px] flex items-center justify-center font-black bg-[#fff1f2] text-[#ef4444]">!</div>
            <div>
              <div className="font-black text-[14px] text-[#172033]">浙江钠创新能源出现新融资动态</div>
              <div className="text-[12px] text-[#64748b] leading-[1.65] mt-[4px]">系统发现融资相关公开线索，可能影响估值判断和进入时点。建议更新企业画像，并复核报告中的资本背景和投资结论。</div>
              <div className="flex gap-[8px] flex-wrap mt-[9px]">
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff1f2] text-[#ef4444]">高优先级</span>
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">融资/资本</span>
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">已关注企业</span>
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">2 小时前</span>
              </div>
            </div>
            <div className="flex gap-[8px] justify-start md:justify-end flex-wrap col-start-2 md:col-start-auto mt-2 md:mt-0">
              <Button size="sm" className="rounded-[10px] font-extrabold text-[#ffffff] bg-[#2563eb] hover:bg-[#1d4ed8]">查看事件</Button>
              <Button variant="outline" size="sm" onClick={onUpdateReport} className="rounded-[10px] font-extrabold text-[#334155] hover:bg-gray-50 border-[#dbe4f1]">更新报告</Button>
            </div>
          </div>

          <div className="border border-[#e5eaf3] bg-white rounded-[16px] p-[15px] grid grid-cols-[34px_1fr] md:grid-cols-[34px_1fr_auto] gap-[12px] items-start">
            <div className="w-[34px] h-[34px] rounded-[12px] flex items-center justify-center font-black bg-[#fff7e8] text-[#d97706]">△</div>
            <div>
              <div className="font-black text-[14px] text-[#172033]">中科海钠发布产业合作动态</div>
              <div className="text-[12px] text-[#64748b] leading-[1.65] mt-[4px]">新增动态与“客户验证”和“产业协同”相关。该企业已在标的池，建议同步到标的池记录，并更新已有技术评估报告的产业链章节。</div>
              <div className="flex gap-[8px] flex-wrap mt-[9px]">
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#fff7e8] text-[#d97706]">中优先级</span>
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">客户/订单</span>
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">标的池企业</span>
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">今天</span>
              </div>
            </div>
            <div className="flex gap-[8px] justify-start md:justify-end flex-wrap col-start-2 md:col-start-auto mt-2 md:mt-0">
              <Button size="sm" className="rounded-[10px] font-extrabold text-[#ffffff] bg-[#2563eb] hover:bg-[#1d4ed8]">同步记录</Button>
              <Button variant="outline" size="sm" onClick={onUpdateReport} className="rounded-[10px] font-extrabold text-[#334155] hover:bg-gray-50 border-[#dbe4f1]">更新报告</Button>
            </div>
          </div>

          <div className="border border-[#e5eaf3] bg-white rounded-[16px] p-[15px] grid grid-cols-[34px_1fr] md:grid-cols-[34px_1fr_auto] gap-[12px] items-start">
            <div className="w-[34px] h-[34px] rounded-[12px] flex items-center justify-center font-black bg-[#eaf1ff] text-[#2563eb]">i</div>
            <div>
              <div className="font-black text-[14px] text-[#172033]">某新材料科技公司新增相关专利</div>
              <div className="text-[12px] text-[#64748b] leading-[1.65] mt-[4px]">系统发现聚阴离子方向相关专利新增。建议更新企业画像；如果后续连续出现高相关专利，可考虑加入标的池。</div>
              <div className="flex gap-[8px] flex-wrap mt-[9px]">
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">低优先级</span>
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">专利/技术</span>
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">已关注企业</span>
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">昨天</span>
              </div>
            </div>
            <div className="flex gap-[8px] justify-start md:justify-end flex-wrap col-start-2 md:col-start-auto mt-2 md:mt-0">
              <Button size="sm" className="rounded-[10px] font-extrabold text-[#ffffff] bg-[#2563eb] hover:bg-[#1d4ed8]">更新画像</Button>
              <Button variant="outline" size="sm" className="rounded-[10px] font-extrabold text-[#334155] hover:bg-gray-50 border-[#dbe4f1]">加入标的池</Button>
            </div>
          </div>

          <div className="border border-[#e5eaf3] bg-white rounded-[16px] p-[15px] grid grid-cols-[34px_1fr] md:grid-cols-[34px_1fr_auto] gap-[12px] items-start">
            <div className="w-[34px] h-[34px] rounded-[12px] flex items-center justify-center font-black bg-[#eaf1ff] text-[#2563eb]">i</div>
            <div>
              <div className="font-black text-[14px] text-[#172033]">浙江钠创新能源新增专利申请</div>
              <div className="text-[12px] text-[#64748b] leading-[1.65] mt-[4px]">新增专利与层状氧化物材料制备工艺相关。建议补充到企业技术画像，并在下次报告更新时同步到技术能力章节。</div>
              <div className="flex gap-[8px] flex-wrap mt-[9px]">
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">低优先级</span>
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">专利/技术</span>
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">已关注企业</span>
                <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">昨天</span>
              </div>
            </div>
            <div className="flex gap-[8px] justify-start md:justify-end flex-wrap col-start-2 md:col-start-auto mt-2 md:mt-0">
              <Button size="sm" className="rounded-[10px] font-extrabold text-[#ffffff] bg-[#2563eb] hover:bg-[#1d4ed8]">更新画像</Button>
              <Button variant="outline" size="sm" onClick={onUpdateReport} className="rounded-[10px] font-extrabold text-[#334155] hover:bg-gray-50 border-[#dbe4f1]">更新报告</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] border border-[#e5eaf3] rounded-[15px] p-[14px] text-[#64748b] text-[12px] leading-[1.7] mt-[18px]">
        当前页面只展示重点事件。跟踪范围由企业库状态自动决定：已关注企业进入基础跟踪，标的池企业进入高优先级跟踪；临时任务结果不进入跟踪。
      </section>
    </div>
  );
}
