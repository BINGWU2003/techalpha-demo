import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface HomeProps {
  onStartTask: (taskType: string, input: string) => void;
}

export default function Home({ onStartTask }: HomeProps) {
  const [inputValue, setInputValue] = useState('');
  const trimmedInputValue = inputValue.trim();
  const examples = ['固态电解质材料', '机器人灵巧手', 'Chiplet先进封装', '低空经济传感器'];

  const handleStartTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!trimmedInputValue) {
      return;
    }

    onStartTask('DeepMine', trimmedInputValue);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-12 md:px-7">
      <section className="w-full max-w-[760px] -translate-y-8 text-center max-md:translate-y-0">
        <h1 className="m-0 text-[42px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#091a38] max-md:text-[32px]">
          开始发现值得关注的硬科技企业
        </h1>
        <p className="mx-auto mt-3 max-w-[620px] text-[16px] leading-[1.75] text-[#5f6f89]">
          输入赛道、技术方向或投资关注点，系统将拆解方向并生成企业线索。
        </p>

        <form
          onSubmit={handleStartTask}
          className="relative mt-[30px] rounded-[24px] border border-[#dfe7f2] bg-white p-[18px] text-left shadow-[0_16px_36px_rgba(16,32,57,0.08)]"
        >
          <Textarea
            id="mainInput"
            aria-label="挖企业研究方向"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="例如：钠电池正极材料方向，关注压实密度、循环寿命、低成本和储能场景"
            className="min-h-[116px] resize-y border-0 bg-white px-1.5 py-1 pb-[54px] text-[17px] leading-[1.75] text-[#102039] shadow-none outline-none placeholder:text-[#9aa8bc] focus-visible:border-0 focus-visible:ring-0 max-md:pb-2"
          />
          <Button
            type="submit"
            disabled={!trimmedInputValue}
            className="absolute bottom-[18px] right-[18px] h-11 rounded-[14px] bg-[#2f6df6] px-[18px] text-[14px] font-extrabold text-white shadow-[0_8px_18px_rgba(47,109,246,0.26)] hover:bg-[#255fdf] max-md:static max-md:mt-2 max-md:ml-auto max-md:flex"
          >
            新建任务
            <ArrowRight data-icon="inline-end" />
          </Button>
        </form>

        <div className="mt-[18px] flex flex-wrap justify-center gap-2.5">
          {examples.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setInputValue(example)}
              className="rounded-full border border-[#d7e4ff] bg-white px-3 py-2 text-[13px] font-bold text-[#2f6df6] transition-colors hover:bg-[#eef4ff]"
            >
              {example}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
