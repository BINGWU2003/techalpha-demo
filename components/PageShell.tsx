import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-[1280px] p-[22px_28px_72px] max-md:p-[18px_16px_64px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
