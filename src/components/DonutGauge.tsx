import { useMemo, useState, useEffect, useRef } from "react";

const GaugeChart = () => {
  const targetPercentage = 79;
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const [animatedTicks, setAnimatedTicks] = useState(0);
  const frameRef = useRef<number>();

  const size = 240;
  const cx = size / 2;
  const cy = size / 2 + 5;
  const radius = 85;
  const tickCount = 40;

  useEffect(() => {
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setAnimatedPercent(Math.round(eased * targetPercentage));
      setAnimatedTicks(eased * targetPercentage);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate);
    }, 300);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const remaining = 100 - animatedPercent;

  const ticks = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= tickCount; i++) {
      const frac = i / tickCount;
      const angle = Math.PI + frac * Math.PI;
      const innerR = radius - 12;
      const outerR = radius + 12;
      arr.push({
        x1: cx + innerR * Math.cos(angle),
        y1: cy + innerR * Math.sin(angle),
        x2: cx + outerR * Math.cos(angle),
        y2: cy + outerR * Math.sin(angle),
        frac,
      });
    }
    return arr;
  }, []);

  return (
    <div className="bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-between h-full">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
          <svg
            width={size}
            height={size / 2 + 30}
            viewBox={`0 0 ${size} ${size / 2 + 30}`}
          >
            {ticks.map((tick, i) => {
              const filled = tick.frac * 100 <= animatedTicks;
              return (
                <line
                  key={i}
                  x1={tick.x1}
                  y1={tick.y1}
                  x2={tick.x2}
                  y2={tick.y2}
                  stroke={filled ? "hsl(270, 70%, 55%)" : "hsl(var(--muted))"}
                  strokeWidth={4}
                  strokeLinecap="round"
                  opacity={filled ? 1 : 0.3}
                  style={{ transition: "stroke 0.05s, opacity 0.05s" }}
                />
              );
            })}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">
            <span className="text-3xl font-bold text-foreground leading-none">{animatedPercent}%</span>
            <span className="text-sm text-muted-foreground mt-2">Shartnoma olganlar</span>
          </div>
        </div>
      </div>

      <div className="w-full mt-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-sm text-muted-foreground">Shartnoma olmaganlar</span>
          <span className="text-sm font-semibold text-muted-foreground">{remaining}%</span>
        </div>
        <div className="w-full h-2.5 bg-muted/40 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${remaining}%`,
              background: "linear-gradient(90deg, hsl(350, 75%, 60%), hsl(350, 65%, 50%))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
