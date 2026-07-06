import {
  Activity,
  BadgeCheck,
  CalendarDays,
  FileText,
  Sparkles,
} from "lucide-react";

type InfoCard = {
  label: string;
  value: string;
};

type QuotaMetric = {
  label: string;
  value: string;
  percent: number;
};

type QuotaMetricGroup = {
  title: string;
  description: string;
  refreshCycle?: string;
  nextRefreshTime?: string;
  metrics: QuotaMetric[];
};

type QuotaCard = {
  title: string;
  description: string;
  tone: "blue";
  metricGroups: QuotaMetricGroup[];
};

type Plan = {
  name: string;
  note: string;
  current?: boolean;
  benefits: Array<[string, string]>;
};

const accountInfo: InfoCard[] = [
  { label: "用户", value: "王巍" },
  { label: "登录邮箱", value: "wangwei@suwen.ai" },
  { label: "有效期", value: "2026-06-15 至 2026-07-15" },
];

const quotas: QuotaCard[] = [
  {
    title: "额度使用情况",
    description:
      "展示 AI 分析次数的不同刷新频次，以及独立的企业初筛报告生成额度。",
    tone: "blue",
    metricGroups: [
      {
        title: "AI 分析次数",
        description: "目标拆解、线索分析、结果刷新等主动分析动作消耗。",
        refreshCycle: "30 天",
        nextRefreshTime: "2026-08-05 16:48",
        metrics: [
          { label: "每 5 小时额度", value: "68 / 100", percent: 68 },
          { label: "本周额度", value: "220 / 500", percent: 44 },
          { label: "本周期额度", value: "420 / 1000", percent: 42 },
        ],
      },
      {
        title: "初筛报告额度",
        description: "生成企业初筛报告时消耗，查看报告不消耗额度。",
        metrics: [
          { label: "本周期额度", value: "3 / 10", percent: 30 },
        ],
      },
    ],
  },
];

const plans: Plan[] = [
  {
    name: "试用版",
    current: true,
    note: "适合新客户试用完整流程，支持多次任务尝试和少量企业初筛。",
    benefits: [
      ["有效期", "30 天"],
      ["AI 分析次数", "每 5 小时 100 次"],
      ["AI 分析次数", "每周 500 次"],
      ["AI 分析次数", "本周期 1000 次"],
      ["初筛报告额度", "10 次"],
    ],
  },
  {
    name: "标准版",
    note: "适合正式投研团队持续使用，按月提供更高分析频次和初筛报告额度。",
    benefits: [
      ["服务周期", "按年开通"],
      ["AI 分析次数", "每 5 小时 200 次"],
      ["AI 分析次数", "每周 1000 次"],
      ["AI 分析次数", "每月 3000 次"],
      ["初筛报告额度", "30 次 / 月"],
    ],
  },
];

const usageRecords = [
  {
    time: "2026-06-15 14:20",
    action: "生成初筛报告：浙江钠创新能源",
    type: "初筛报告",
  },
  {
    time: "2026-06-15 11:10",
    action: "运行线索分析：钠电池正极材料",
    type: "AI 分析",
  },
  {
    time: "2026-06-14 17:42",
    action: "重新生成目标拆解：存算一体芯片",
    type: "AI 分析",
  },
  {
    time: "2026-06-14 10:15",
    action: "生成初筛报告：深圳时识科技",
    type: "初筛报告",
  },
];

const quotaTone = {
  blue: {
    text: "text-[#2f6df6]",
    bar: "from-[#2f6df6] to-[#8057ff]",
    bg: "bg-[#eef4ff]",
  },
};

export default function AccountEntitlements() {
  return (
    <div className="mx-auto max-w-[1280px] p-[34px_36px_54px] max-md:p-[24px_18px_46px]">
      <section className="overflow-hidden rounded-[28px] border border-[#e3ebf6] bg-white shadow-[0_16px_40px_rgba(23,39,70,0.06)]">
        <header className="relative overflow-hidden border-b border-[#e3ebf6] bg-linear-to-br from-white via-[#f8fbff] to-[#eef5ff] p-[32px_30px_26px]">
          <div className="absolute right-[-90px] top-[-110px] h-[260px] w-[260px] rounded-full bg-[#2f6df6]/10 blur-3xl" />
          <div className="relative flex items-start justify-between gap-6 max-md:flex-col">
            <div>
              <h1 className="m-0 text-[34px] font-bold leading-[1.18] tracking-[-0.04em] text-[#102039]">
                账户与权益
              </h1>
              <p className="mt-[10px] max-w-[720px] text-[14px] leading-[1.7] text-[#66758e]">
                管理当前账户、套餐和关键使用额度。基础功能默认开放，额度只在主动
                AI 分析和初筛报告生成时消耗。
              </p>
            </div>
            <div className="rounded-full border border-[#bdd1ff] bg-white px-4 py-2 text-[13px] font-black text-[#2f6df6] shadow-[0_10px_24px_rgba(47,109,246,0.12)]">
              当前套餐：试用版
            </div>
          </div>
        </header>

        <div className="space-y-6 p-[28px] max-md:p-[20px]">
          <section>
            <div className="mb-4 flex items-center gap-2 text-[18px] font-black text-[#102039]">
              <BadgeCheck size={20} className="text-[#2f6df6]" />
              账户信息
            </div>
            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
              {accountInfo.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[18px] border border-[#e3ebf6] bg-[#f9fbfe] p-[18px]"
                >
                  <div className="mb-2 text-[13px] text-[#66758e]">
                    {item.label}
                  </div>
                  <div className="wrap-break-word text-[18px] font-black leading-[1.35] text-[#102039]">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-[#e3ebf6] pt-6">
            <div className="mb-4 flex items-center gap-2 text-[18px] font-black text-[#102039]">
              <Activity size={20} className="text-[#2f6df6]" />
              当前额度
            </div>
            <div className="grid grid-cols-1 gap-4">
              {quotas.map((quota) => {
                const tone = quotaTone[quota.tone];

                return (
                  <div
                    key={quota.title}
                    className="rounded-[22px] border border-[#e3ebf6] bg-white p-5 shadow-[0_10px_28px_rgba(18,39,80,0.04)]"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <div className="mb-2 text-[18px] font-black text-[#102039]">
                          {quota.title}
                        </div>
                        <div className="text-[13px] leading-[1.65] text-[#66758e]">
                          {quota.description}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {quota.metricGroups.map((metricGroup) => (
                        <div
                          key={metricGroup.title}
                          className="rounded-[18px] border border-[#edf2f8] bg-[#f9fbfe] p-4"
                        >
                          <div className="mb-4 flex items-start justify-between gap-4 max-md:flex-col">
                            <div>
                              <div className="text-[14px] font-black text-[#102039]">
                                {metricGroup.title}
                              </div>
                              <div className="mt-1 text-[12px] leading-[1.6] text-[#66758e]">
                                {metricGroup.description}
                              </div>
                            </div>
                            {metricGroup.refreshCycle &&
                              metricGroup.nextRefreshTime && (
                                <div
                                  className={`shrink-0 rounded-2xl px-4 py-3 text-[13px] font-black leading-[1.6] ${tone.bg} ${tone.text}`}
                                >
                                  <div>刷新周期：{metricGroup.refreshCycle}</div>
                                  <div>
                                    下次刷新：{metricGroup.nextRefreshTime}
                                  </div>
                                </div>
                              )}
                          </div>
                          <div className="space-y-4">
                            {metricGroup.metrics.map((metric) => (
                              <div key={metric.label}>
                                <div className="mb-2 flex justify-between gap-3 text-[13px] text-[#31415d]">
                                  <span>{metric.label}</span>
                                  <b>{metric.value}</b>
                                </div>
                                <div className="h-[9px] overflow-hidden rounded-full bg-[#edf2f8]">
                                  <div
                                    className={`h-full rounded-full bg-linear-to-r ${tone.bar}`}
                                    style={{ width: `${metric.percent}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="border-t border-[#e3ebf6] pt-6">
            <div className="mb-4 flex items-center gap-2 text-[18px] font-black text-[#102039]">
              <Sparkles size={20} className="text-[#2f6df6]" />
              套餐规则
            </div>
            <div className="grid grid-cols-2 gap-4 max-xl:grid-cols-1">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-[22px] border bg-white p-5 ${
                    plan.current
                      ? "border-[#bdd1ff] shadow-[0_14px_32px_rgba(47,109,246,0.1)]"
                      : "border-[#e3ebf6]"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between gap-3 text-[20px] font-black text-[#102039]">
                    <span>{plan.name}</span>
                    {plan.current && (
                      <span className="rounded-full bg-[#2f6df6] px-3 py-1.5 text-[12px] font-black text-white">
                        当前套餐
                      </span>
                    )}
                  </div>
                  <p className="mb-4 text-[13px] leading-[1.7] text-[#66758e]">
                    {plan.note}
                  </p>
                  <div className="space-y-0">
                    {plan.benefits.map(([label, value]) => (
                      <div
                        key={`${label}-${value}`}
                        className="flex justify-between gap-4 border-t border-[#edf2f8] py-3 text-[14px] text-[#31415d]"
                      >
                        <span>{label}</span>
                        <b className="text-[#102039]">{value}</b>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 border-t border-[#e3ebf6] pt-6">
            <div className="rounded-[22px] border border-[#e3ebf6] bg-[#f9fbfe] p-5">
              <div className="mb-4 flex items-center gap-2 text-[18px] font-black text-[#102039]">
                <FileText size={20} className="text-[#2f6df6]" />
                权益说明
              </div>
              <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-1">
                <div className="rounded-[18px] border border-[#e3ebf6] bg-white p-4">
                  <div className="mb-2 text-[13px] font-black text-[#2f6df6]">
                    默认开放
                  </div>
                  <div className="text-[14px] leading-[1.75] text-[#31415d]">
                    企业挖掘、企业库、报告库、事件跟踪和报告查看等基础功能可直接使用。
                  </div>
                </div>
                <div className="rounded-[18px] border border-[#e3ebf6] bg-white p-4">
                  <div className="mb-2 text-[13px] font-black text-[#2f6df6]">
                    额度限制
                  </div>
                  <div className="text-[14px] leading-[1.75] text-[#31415d]">
                    当前主要限制为
                    <b className="text-[#102039]"> AI 分析次数</b> 与
                    <b className="text-[#102039]"> 初筛报告额度</b>。
                  </div>
                </div>
                <div className="rounded-[18px] border border-[#e3ebf6] bg-white p-4">
                  <div className="mb-2 text-[13px] font-black text-[#2f6df6]">
                    不消耗额度
                  </div>
                  <div className="text-[14px] leading-[1.75] text-[#31415d]">
                    查看企业、筛选企业、关注企业、打开报告和查看事件不计入额度消耗。
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[22px] border border-[#e3ebf6] bg-white p-5">
              <div className="mb-4 flex items-center gap-2 text-[18px] font-black text-[#102039]">
                <CalendarDays size={20} className="text-[#2f6df6]" />
                最近使用记录
              </div>
              <div className="overflow-hidden rounded-[18px] border border-[#e3ebf6] bg-white">
                {usageRecords.map((record) => (
                  <div
                    key={`${record.time}-${record.action}`}
                    className="grid grid-cols-[150px_minmax(0,1fr)_104px] items-center gap-4 border-b border-[#e3ebf6] px-4 py-3 text-[14px] last:border-b-0 max-md:grid-cols-1 max-md:gap-2"
                  >
                    <div className="text-[13px] text-[#66758e]">
                      {record.time}
                    </div>
                    <div className="font-extrabold text-[#18345d]">
                      {record.action}
                    </div>
                    <div className="justify-self-end rounded-full bg-[#eef4ff] px-3 py-1.5 text-[12px] font-black text-[#2f6df6] max-md:justify-self-start">
                      {record.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
