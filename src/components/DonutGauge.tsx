import { useMemo } from "react";

const GaugeChart = () => {
  const percentage = 79;
  const remaining = 100 - percentage;

  // Gauge parameters
  const size = 220;
  const strokeWidth = 18;
  const cx = size / 2;
  const cy = size / 2 + 10;
  const radius = (size - strokeWidth * 2) / 2 - 10;

  // Half circle arc (180 degrees)
  const startAngle = Math.PI;
  const endAngle = 0;
  const totalArc = Math.PI;

  // Generate tick marks
  const ticks = useMemo(() => {
    const tickCount = 30;
    const ticksArr = [];
    for (let i = 0; i <= tickCount; i++) {
      const angle = startAngle - (i / tickCount) * totalArc;
      const filled = (i / tickCount) * 100 <= percentage;
      const innerR = radius - 8;
      const outerR = radius + 8;
      ticksArr.push({
        x1: cx + innerR * Math.cos(angle),
        y1: cy + innerR * Math.sin(angle),
        x2: cx + outerR * Math.cos(angle),
        y2: cy + outerR * Math.sin(angle),
        filled,
      });
    }
    return ticksArr;
  }, [percentage]);

  // Arc path for background
  const describeArc = (startA: number, endA: number) => {
    const x1 = cx + radius * Math.cos(startA);
    const y1 = cy + radius * Math.sin(startA);
    const x2 = cx + radius * Math.cos(endA);
    const y2 = cy + radius * Math.sin(endA);
    return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-center h-full">
      {/* Gauge */}
      <div className="relative" style={{ width: size, height: size / 2 + 30 }}>
        <svg width={size} height={size / 2 + 40} viewBox={`0 0 ${size} ${size / 2 + 40}`}>
          {/* Background arc */}
          <path
            d={describeArc(startAngle, endAngle)}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={3}
            strokeLinecap="round"
          />

          {/* Tick marks */}
          {ticks.map((tick, i) => (
            <line
              key={i}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke={tick.filled ? "hsl(270, 70%, 55%)" : "hsl(var(--muted))"}
              strokeWidth={3}
              strokeLinecap="round"
              className="transition-all duration-500"
              style={{ opacity: tick.filled ? 1 : 0.4 }}
            />
          ))}
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className="text-4xl font-bold text-foreground">{percentage}%</span>
          <span className="text-sm text-muted-foreground mt-1">Shartnoma olganlar</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full mt-6 px-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Shartnoma olmaganlar</span>
          <span className="text-sm font-semibold text-muted-foreground">{remaining}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${remaining}%`,
              background: "hsl(350, 70%, 60%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
