import { useState, type FormEvent } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HomeProps {
  onStartTask: (taskType: string, input: string) => void;
}

export default function Home({ onStartTask }: HomeProps) {
  const [inputValue, setInputValue] = useState('');
  const trimmedInputValue = inputValue.trim();

  const handleStartTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!trimmedInputValue) {
      return;
    }

    onStartTask('DeepMine', trimmedInputValue);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-[820px] items-center justify-center p-[42px_20px_72px]">
      <section className="flex w-full flex-col items-center text-center">
        <h1 className="m-0 text-[34px] font-bold leading-[1.22] tracking-[-0.035em] max-md:text-[28px]">
          挖掘值得关注的企业
        </h1>
        <p className="mx-auto mt-3 max-w-[640px] text-[15px] leading-[1.7] text-muted-foreground">
          输入赛道、技术方向或企业线索，系统将创建挖企业任务，并进入工作台生成候选企业。
        </p>

        <form
          onSubmit={handleStartTask}
          className="mt-7 flex w-full max-w-[700px] flex-col gap-3 rounded-[18px] border border-border bg-background p-2 shadow-xs md:flex-row md:items-center"
        >
          <div className="flex min-w-0 flex-1 items-center gap-2.5 px-2 text-muted-foreground">
            <Search />
            <Input
              id="mainInput"
              aria-label="挖企业研究方向"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="例如：钠电池正极材料、AI 芯片、固态电池电解质"
              className="h-11 border-0 px-0 shadow-none focus-visible:ring-0"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={!trimmedInputValue}
            className="h-11 w-full rounded-[13px] font-semibold md:w-[148px]"
          >
            开始挖企业
            <ArrowRight data-icon="inline-end" />
          </Button>
        </form>

        <p className="mt-3 text-[12px] leading-[1.6] text-muted-foreground">
          进入工作台后可继续补充筛选条件，企业线索会沉淀到候选池。
        </p>
      </section>
    </div>
  );
}
