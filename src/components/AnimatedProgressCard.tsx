import { useState, useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  totalSum: number;
  paidSum: number;
  formatValue?: (v: number) => string;
}

const AnimatedProgressCard = ({ totalSum, paidSum, formatValue }: Props) => {
  const targetPct = Math.round((paidSum / totalSum) * 100);
  const [animPct, setAnimPct] = useState(0);
  const [animPaid, setAnimPaid] = useState(0);
  const frameRef = useRef<number>();
  const remaining = totalSum - paidSum;

  const fmt = formatValue || ((v: number) => v.toLocaleString());

  useEffect(() => {
    const duration = 1600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setAnimPct(Math.round(eased * targetPct));
      setAnimPaid(Math.round(eased * paidSum));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate);
    }, 400);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [targetPct, paidSum]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="rounded-xl p-5 border border-border bg-card animate-fade-in opacity-0 cursor-pointer" style={{ animationDelay: "0.2s" }}>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-foreground">To'lov holati</span>
              <span className="font-semibold text-foreground">{animPct}%</span>
            </div>
            <Progress value={animPct} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>To'langan: {fmt(animPaid)} mlrd so'm</span>
              <span>Jami: {fmt(totalSum)} mlrd so'm</span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="p-3 space-y-1.5 text-sm">
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">Umumiy summa:</span>
            <span className="font-semibold">{fmt(totalSum)} mlrd so'm</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">To'langan summa:</span>
            <span className="font-semibold text-emerald-500">{fmt(paidSum)} mlrd so'm</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">Qoldiq summa:</span>
            <span className="font-semibold text-rose-500">{fmt(remaining)} mlrd so'm</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AnimatedProgressCard;
