import { useState, useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";

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
    <div className="rounded-xl p-5 border border-border bg-card animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
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
  );
};

export default AnimatedProgressCard;
