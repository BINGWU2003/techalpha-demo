import { useEffect, useState, type RefObject } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type QuickScrollDirection = "down" | "up";

type QuickScrollButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
  minScrollableDistance?: number;
  switchThreshold?: number;
  positionClassName?: string;
  className?: string;
};

const DEFAULT_POSITION_CLASS_NAME =
  "bottom-24 right-4 md:bottom-32 md:right-6 lg:bottom-40 lg:right-8";

export function QuickScrollButton({
  targetRef,
  minScrollableDistance = 360,
  switchThreshold,
  positionClassName = DEFAULT_POSITION_CLASS_NAME,
  className,
}: QuickScrollButtonProps) {
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState<QuickScrollDirection>("down");

  useEffect(() => {
    const handleScroll = () => {
      const maxScrollY =
        document.documentElement.scrollHeight - window.innerHeight;
      const resolvedSwitchThreshold =
        switchThreshold ?? Math.min(720, window.innerHeight * 0.7);

      setVisible(maxScrollY > minScrollableDistance);
      setDirection(window.scrollY > resolvedSwitchThreshold ? "up" : "down");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [minScrollableDistance, switchThreshold]);

  const handleClick = () => {
    if (direction === "up") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    targetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const label = direction === "up" ? "回到顶部" : "滚动到底部操作区";
  const Icon = direction === "up" ? ChevronUp : ChevronDown;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "fixed z-50 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#2563eb] text-white shadow-[0_12px_24px_rgba(37,99,235,0.28)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-[#1d4ed8] hover:shadow-[0_16px_30px_rgba(37,99,235,0.34)] active:translate-y-0 active:scale-95",
        positionClassName,
        visible
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-2 scale-90 opacity-0",
        className,
      )}
      aria-label={label}
      title={label}
      tabIndex={visible ? 0 : -1}
    >
      <Icon
        key={direction}
        className="h-5 w-5 animate-in fade-in slide-in-from-bottom-1 duration-200"
      />
    </button>
  );
}
