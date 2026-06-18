import { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Report = {
  id: number;
  title: string;
  company: string;
  direction: string;
  source: string;
  time: string;
  weekly: boolean;
};

const reports: Report[] = [
  { id: 1, title: '深圳时识科技有限公司初筛报告', company: '深圳时识科技有限公司', direction: '存算一体', source: '企业探索生成', time: '今天', weekly: true },
  { id: 2, title: '浙江钠创新能源初筛报告', company: '浙江钠创新能源', direction: '钠电池正极材料', source: '企业探索生成', time: '今天', weekly: true },
  { id: 3, title: '中科海钠初筛报告', company: '中科海钠', direction: '钠电池正极材料', source: '企业库生成', time: '昨天', weekly: true },
  { id: 4, title: '某新材料科技公司初筛报告', company: '某新材料科技公司', direction: '钠电池正极材料', source: '企业库生成', time: '3 天前', weekly: true },
  { id: 5, title: '机器人灵巧手企业初筛报告', company: '灵巧手科技', direction: '机器人灵巧手', source: '企业探索生成', time: '上周', weekly: false },
];

const quickFilters = [
  { label: '全部报告', value: '全部', count: 38 },
  { label: '本周生成', value: '本周生成', count: 9 },
  { label: '钠电池', value: '钠电池', count: 12 },
  { label: '存算一体', value: '存算一体', count: 8 },
];

export default function ReportLibrary({ onCreateReport, onOpenReport }: { onBack?: () => void; onCreateReport?: () => void; onOpenReport?: () => void; onEditReport?: () => void; }) {
  const [activeFilter, setActiveFilter] = useState('全部');
  const [query, setQuery] = useState('');
  const [direction, setDirection] = useState('全部方向');
  const [source, setSource] = useState('全部来源');
  const [sort, setSort] = useState('最近生成');

  const filteredReports = useMemo(() => {
    const normalizedQuery = query.trim();
    const rows = reports.filter((report) => {
      const matchesQuickFilter =
        activeFilter === '全部' ||
        (activeFilter === '本周生成' && report.weekly) ||
        (activeFilter === '钠电池' && report.direction.includes('钠电池')) ||
        (activeFilter === '存算一体' && report.direction.includes('存算一体'));

      const matchesDirection = direction === '全部方向' || report.direction === direction;
      const matchesSource = source === '全部来源' || report.source === source;
      const matchesQuery =
        !normalizedQuery ||
        report.title.includes(normalizedQuery) ||
        report.company.includes(normalizedQuery) ||
        report.direction.includes(normalizedQuery);

      return matchesQuickFilter && matchesDirection && matchesSource && matchesQuery;
    });

    if (sort === '企业名称') {
      return [...rows].sort((a, b) => a.company.localeCompare(b.company, 'zh-Hans-CN'));
    }

    return rows;
  }, [activeFilter, direction, query, sort, source]);

  const openReport = () => {
    onOpenReport?.();
  };

  return (
    <PageShell>
      <section className="overflow-hidden rounded-[24px] border border-[#e3ebf6] bg-white shadow-[0_12px_34px_rgba(18,39,80,0.06)]">
        <header className="border-b border-[#e3ebf6] bg-linear-to-b from-white to-[#fbfdff] p-[30px_28px_22px]">
          <div className="flex items-center justify-between gap-3 max-md:flex-col max-md:items-start">
            <h1 className="m-0 shrink-0 text-[24px] font-bold leading-[1.2] text-[#102039]">报告库</h1>
            <p className="m-0 max-w-[760px] text-right text-[13px] font-bold leading-[1.65] text-[#8a96a8] max-md:text-left">管理已生成的企业初筛报告，快速查看、筛选和打开报告。</p>
          </div>
        </header>

        <div className="border-b border-[#e3ebf6] bg-white p-[20px_24px_16px]">
          <div className="mb-4 flex flex-wrap gap-[10px]">
            {quickFilters.map((filter) => (
              <Button
                key={filter.value}
                variant="outline"
                onClick={() => setActiveFilter(filter.value)}
                className={`h-auto rounded-full px-[13px] py-[9px] text-[13px] font-extrabold transition-colors ${
                  activeFilter === filter.value
                    ? 'border-[#bdd1ff] bg-[#edf4ff] text-[#2f6df6] hover:bg-[#edf4ff] hover:text-[#2f6df6]'
                    : 'border-[#dce6f6] bg-white text-[#4d5b73] hover:border-[#bdd1ff] hover:bg-[#f7faff]'
                }`}
              >
                {filter.label}
                <span className="ml-1 text-[#8a96aa]">{filter.count}</span>
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-[minmax(260px,1.6fr)_repeat(2,minmax(150px,1fr))_150px] gap-[10px] max-lg:grid-cols-2 max-sm:grid-cols-1">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-[42px] rounded-[12px] border-[#e3ebf6] bg-white px-[14px] text-[13px] focus-visible:ring-[#2f6df6]/10"
              placeholder="搜索报告名称、企业或方向"
            />
            <Select value={direction} onValueChange={setDirection}>
              <SelectTrigger className="h-[42px] rounded-[12px] border-[#e3ebf6] bg-white text-[13px]">
                <SelectValue placeholder="全部方向" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全部方向">全部方向</SelectItem>
                <SelectItem value="钠电池正极材料">钠电池正极材料</SelectItem>
                <SelectItem value="存算一体">存算一体</SelectItem>
                <SelectItem value="机器人灵巧手">机器人灵巧手</SelectItem>
              </SelectContent>
            </Select>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger className="h-[42px] rounded-[12px] border-[#e3ebf6] bg-white text-[13px]">
                <SelectValue placeholder="全部来源" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全部来源">全部来源</SelectItem>
                <SelectItem value="企业探索生成">企业探索生成</SelectItem>
                <SelectItem value="企业库生成">企业库生成</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-[42px] rounded-[12px] border-[#e3ebf6] bg-white text-[13px]">
                <SelectValue placeholder="排序" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="最近生成">最近生成</SelectItem>
                <SelectItem value="企业名称">企业名称</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-[18px] border-b border-[#e3ebf6] bg-[#fbfdff] px-[24px] py-[13px] text-[13px] text-[#536177] max-sm:flex-col max-sm:items-start">
          <div><strong className="text-[#102039]">当前结果：{filteredReports.length} 份</strong>｜点击整行打开报告</div>
          <div>当前仅展示初筛报告</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] table-fixed border-collapse bg-white">
            <thead>
              <tr>
                <th className="w-[31%] border-b border-[#e3ebf6] bg-[#fbfcff] px-[18px] py-[14px] text-left text-[12px] font-black text-[#7a8699]">报告名称</th>
                <th className="w-[20%] border-b border-[#e3ebf6] bg-[#fbfcff] px-[18px] py-[14px] text-left text-[12px] font-black text-[#7a8699]">关联企业</th>
                <th className="w-[18%] border-b border-[#e3ebf6] bg-[#fbfcff] px-[18px] py-[14px] text-left text-[12px] font-black text-[#7a8699]">关注方向</th>
                <th className="w-[17%] border-b border-[#e3ebf6] bg-[#fbfcff] px-[18px] py-[14px] text-left text-[12px] font-black text-[#7a8699]">生成来源</th>
                <th className="w-[10%] border-b border-[#e3ebf6] bg-[#fbfcff] px-[18px] py-[14px] text-left text-[12px] font-black text-[#7a8699]">生成时间</th>
                <th className="w-[54px] border-b border-[#e3ebf6] bg-[#fbfcff] px-[18px] py-[14px]" />
              </tr>
            </thead>
            <tbody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr key={report.id} onClick={openReport} className="group cursor-pointer transition-colors hover:bg-[#f7faff]">
                    <td className="border-b border-[#eef3fa] px-[18px] py-[18px] align-middle">
                      <div className="text-[15px] font-black leading-[1.45] text-[#102039]">{report.title}</div>
                      <div className="mt-[5px] text-[12px] text-[#8a96a8]">独立报告页支持导出 PDF</div>
                    </td>
                    <td className="border-b border-[#eef3fa] px-[18px] py-[18px] align-middle">
                      <span className="inline-flex items-center rounded-full bg-[#edf4ff] px-[9px] py-[6px] text-[12px] font-black text-[#2f6df6]">{report.company}</span>
                    </td>
                    <td className="border-b border-[#eef3fa] px-[18px] py-[18px] align-middle">
                      <span className="inline-flex items-center rounded-full bg-[#eaf8f0] px-[9px] py-[6px] text-[12px] font-black text-[#18a957]">{report.direction}</span>
                    </td>
                    <td className="border-b border-[#eef3fa] px-[18px] py-[18px] align-middle text-[13px] leading-[1.6] text-[#43506a]">{report.source}</td>
                    <td className="border-b border-[#eef3fa] px-[18px] py-[18px] align-middle text-[13px] leading-[1.6] text-[#43506a]">{report.time}</td>
                    <td className="border-b border-[#eef3fa] px-[18px] py-[18px] text-right align-middle text-[#7e8aa0]">
                      <span className="inline-flex h-[30px] w-[30px] translate-x-[-3px] items-center justify-center rounded-[10px] bg-[#edf4ff] text-[#2f6df6] opacity-60 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-[18px] py-[42px] text-center text-[14px] text-[#8792a6]">当前条件下暂无报告</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <Button onClick={onCreateReport} className="mt-4 hidden h-[40px] w-full rounded-[13px] bg-[#2563eb] font-extrabold text-white shadow-[0_10px_18px_rgba(37,99,235,0.18)] hover:bg-[#1d4ed8] max-sm:inline-flex">
        新建报告任务
      </Button>
    </PageShell>
  );
}
