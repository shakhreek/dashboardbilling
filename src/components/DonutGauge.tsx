import { useMemo } from "react";

const GaugeChart = () => {
  const percentage = 79;
  const remaining = 100 - percentage;

  const size = 240;
  const cx = size / 2;
  const cy = size / 2 + 5;
  const radius = 85;
  const tickCount = 40;

  const ticks = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= tickCount; i++) {
      const frac = i / tickCount;
      const angle = Math.PI + frac * Math.PI; // from left (π) to right (2π)
      const filled = frac * 100 <= percentage;
      const innerR = radius - 12;
      const outerR = radius + 12;
      arr.push({
        x1: cx + innerR * Math.cos(angle),
        y1: cy + innerR * Math.sin(angle),
        x2: cx + outerR * Math.cos(angle),
        y2: cy + outerR * Math.sin(angle),
        filled,
      });
    }
    return arr;
  }, []);

  return (
    <div className="bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-between h-full">
      {/* Gauge */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
          <svg
            width={size}
            height={size / 2 + 30}
            viewBox={`0 0 ${size} ${size / 2 + 30}`}
          >
            {ticks.map((tick, i) => (
              <line
                key={i}
                x1={tick.x1}
                y1={tick.y1}
                x2={tick.x2}
                y2={tick.y2}
                stroke={tick.filled ? "hsl(270, 70%, 55%)" : "hsl(var(--muted))"}
                strokeWidth={4}
                strokeLinecap="round"
                opacity={tick.filled ? 1 : 0.3}
              />
            ))}
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">
            <span className="text-5xl font-bold text-foreground leading-none">{percentage}%</span>
            <span className="text-sm text-muted-foreground mt-2">Shartnoma olganlar</span>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="w-full mt-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-sm text-muted-foreground">Shartnoma olmaganlar</span>
          <span className="text-sm font-semibold text-muted-foreground">{remaining}%</span>
        </div>
        <div className="w-full h-2.5 bg-muted/40 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
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
