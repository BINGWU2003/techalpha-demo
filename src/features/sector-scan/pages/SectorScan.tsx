import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SectorScan({ onBack, onNext }: { onBack?: () => void; onNext?: () => void }) {
  return (
    <div className="max-w-[1160px] mx-auto p-[28px_28px_64px] max-md:p-[22px_16px_56px]">
      <div className="text-[13px] text-[#64748b] mb-[16px]">
        工作台 / 看赛道 / <b className="text-[#334155]">阶段一：明确范围</b>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_236px] gap-[18px] items-start">
        <main>
          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px]">
            <div className="flex items-center gap-3 mb-[12px]">
              {onBack && (
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={onBack}
                  className="w-8 h-8 rounded-[8px] text-[#334155] hover:text-[#2563eb] hover:border-[#2563eb] transition-all"
                  title="返回"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <span className="text-[12px] font-black text-[#2563eb] bg-[#eaf1ff] rounded-full px-[10px] py-[7px] inline-flex">Track Scan · 阶段一</span>
            </div>
            <h1 className="text-[26px] leading-[1.25] m-0 tracking-[-0.04em] font-bold">明确赛道分析范围</h1>
            <p className="mt-[8px] text-[#64748b] text-[14px] leading-[1.65]">看赛道的目标不是做大而全行业报告，而是回答：这个方向是否值得继续看，应该看哪些细分方向，下一步从哪里挖企业。</p>
            <div className="flex flex-col md:flex-row gap-[10px] mt-[18px]">
              <Input 
                className="flex-1 rounded-[13px] h-[42px] bg-[#f8fafc]"
                defaultValue="钠电池正极材料"
              />
              <Button onClick={onNext} className="h-[42px] px-[16px] rounded-[13px] font-extrabold shadow-[0_10px_18px_rgba(37,99,235,0.18)] text-white bg-[#2563eb] hover:bg-[#1d4ed8]">AI 拆解赛道</Button>
            </div>
          </section>

          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px] mt-[18px]">
            <div className="flex justify-between items-end mb-[12px]">
              <h2 className="text-[17px] font-black m-0">分析偏好</h2>
              <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f1f5f9] text-[#64748b]">可编辑，不计费</span>
            </div>
            <div className="flex flex-col md:flex-row gap-[10px] mt-[18px]">
              <Select defaultValue="投资阶段：早中期">
                <SelectTrigger className="flex-1 h-[42px] rounded-[13px] bg-[#f8fafc]">
                  <SelectValue placeholder="投资阶段" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="投资阶段：早中期">投资阶段：早中期</SelectItem>
                  <SelectItem value="投资阶段：成长期">投资阶段：成长期</SelectItem>
                  <SelectItem value="投资阶段：全阶段">投资阶段：全阶段</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="地域：中国">
                <SelectTrigger className="flex-1 h-[42px] rounded-[13px] bg-[#f8fafc]">
                  <SelectValue placeholder="地域" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="地域：中国">地域：中国</SelectItem>
                  <SelectItem value="地域：全球">地域：全球</SelectItem>
                  <SelectItem value="地域：华东">地域：华东</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="时间窗口：近三年">
                <SelectTrigger className="flex-1 h-[42px] rounded-[13px] bg-[#f8fafc]">
                  <SelectValue placeholder="时间窗口" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="时间窗口：近三年">时间窗口：近三年</SelectItem>
                  <SelectItem value="时间窗口：近五年">时间窗口：近五年</SelectItem>
                  <SelectItem value="时间窗口：近一年">时间窗口：近一年</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex mt-[18px]">
              <Textarea 
                className="w-full min-h-[82px] rounded-[13px] bg-[#f8fafc] resize-y"
                defaultValue="重点关注技术壁垒、产业化进展、优质企业密度和潜在投资机会。"
              />
            </div>
          </section>

          <section className="mt-[18px]">
            <div className="flex justify-between items-end mb-[12px]">
              <h2 className="text-[17px] font-black m-0">AI 拆解出的观察维度</h2>
              <span className="text-[13px] text-[#2563eb] font-extrabold cursor-pointer">重新拆解</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px]">
              <div className="border border-[#2563eb] bg-[#f8fbff] rounded-[16px] p-[15px] cursor-pointer">
                <strong className="text-[14px] font-bold text-[#172033]">技术路线</strong>
                <p className="text-[12px] mt-[7px] text-[#64748b]">层状氧化物、聚阴离子、普鲁士蓝等路线的技术成熟度与壁垒。</p>
                <div className="flex flex-wrap gap-[8px] mt-[12px]">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eaf1ff] text-[#2563eb]">核心</span>
                </div>
              </div>
              <div className="border border-[#2563eb] bg-[#f8fbff] rounded-[16px] p-[15px] cursor-pointer">
                <strong className="text-[14px] font-bold text-[#172033]">产业化进展</strong>
                <p className="text-[12px] mt-[7px] text-[#64748b]">材料量产、客户验证、储能场景和电芯企业导入进度。</p>
                <div className="flex flex-wrap gap-[8px] mt-[12px]">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#eafaf1] text-[#16a34a]">核心</span>
                </div>
              </div>
              <div className="border border-[#e5eaf3] bg-white rounded-[16px] p-[15px] cursor-pointer">
                <strong className="text-[14px] font-bold text-[#172033]">资本与企业密度</strong>
                <p className="text-[12px] mt-[7px] text-[#64748b]">融资动态、企业分布、优质标的数量和投资时点。</p>
                <div className="flex flex-wrap gap-[8px] mt-[12px]">
                  <span className="inline-flex items-center rounded-full px-[9px] py-[6px] text-[12px] font-extrabold whitespace-nowrap bg-[#f3ecff] text-[#8b5cf6]">建议</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[22px] mt-[18px]">
            <h2 className="text-[17px] font-black m-0 mb-[12px]">执行方式</h2>
            <p className="text-[13px] text-[#64748b] leading-[1.65] m-0">点击“开始产业扫描”后，系统会消耗一次赛道扫描额度，生成产业线索和机会判断。</p>
            <div className="flex flex-col md:flex-row gap-[10px] mt-[18px] justify-end">
              <Button variant="outline" className="h-[42px] px-[16px] rounded-[13px] font-extrabold text-[#334155]">保存范围</Button>
              <Button onClick={onNext} className="h-[42px] px-[16px] rounded-[13px] font-extrabold shadow-[0_10px_18px_rgba(37,99,235,0.18)] text-white bg-[#2563eb] hover:bg-[#1d4ed8]">开始产业扫描</Button>
            </div>
          </section>
        </main>

        <aside className="bg-white border border-[#e5eaf3] rounded-[20px] shadow-[0_14px_32px_rgba(15,23,42,0.06)] p-[18px] lg:sticky lg:top-[74px]">
          <h3 className="m-0 mb-[14px] text-[15px] font-bold">看赛道阶段</h3>
          
          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px] before:content-[''] before:absolute before:left-[10px] before:top-[24px] before:w-[2px] before:h-[calc(100%-18px)] before:bg-[#dbe4f1]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#2563eb] border-[4px] border-white shadow-[0_0_0_4px_#eaf1ff] z-10"></div>
            <div>
              <strong className="block text-[13px] text-[#172033]">明确范围</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">定义赛道、区域、时间和投资偏好</span>
            </div>
          </div>

          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px] before:content-[''] before:absolute before:left-[10px] before:top-[24px] before:w-[2px] before:h-[calc(100%-18px)] before:bg-[#dbe4f1]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#e2e8f0] border-[4px] border-white shadow-[0_0_0_1px_#dbe4f1] z-10"></div>
            <div>
              <strong className="block text-[13px] text-[#172033]">产业扫描</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">扫描技术、政策、资本和企业线索</span>
            </div>
          </div>

          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px] before:content-[''] before:absolute before:left-[10px] before:top-[24px] before:w-[2px] before:h-[calc(100%-18px)] before:bg-[#dbe4f1]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#e2e8f0] border-[4px] border-white shadow-[0_0_0_1px_#dbe4f1] z-10"></div>
            <div>
              <strong className="block text-[13px] text-[#172033]">机会判断</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">形成细分方向优先级和投资假设</span>
            </div>
          </div>

          <div className="grid grid-cols-[24px_1fr] gap-[10px] relative pb-[18px]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#e2e8f0] border-[4px] border-white shadow-[0_0_0_1px_#dbe4f1] z-10"></div>
            <div>
              <strong className="block text-[13px] text-[#172033]">任务衔接</strong>
              <span className="block text-[#64748b] text-[12px] leading-[1.45] mt-[3px]">进入挖企业、出报告或持续跟踪</span>
            </div>
          </div>

          <div className="bg-[#f8fafc] border border-[#e5eaf3] rounded-[14px] p-[13px] mt-[14px]">
            <strong className="text-[13px] text-[#172033]">任务定位</strong>
            <p className="text-[12px] mt-[5px] text-[#64748b] leading-[1.65] m-0">看赛道不是完整行业报告，而是为后续挖企业和出报告提供方向判断。</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
