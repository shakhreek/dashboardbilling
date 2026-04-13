import { useState } from "react";

interface RegionData {
  id: string;
  name: string;
  value: number;
  extra?: string;
}

interface UzbekistanMapProps {
  data: RegionData[];
  title?: string;
  valueLabel?: string;
}

// Simplified SVG paths for Uzbekistan regions
const regionPaths: Record<string, string> = {
  toshkent_sh: "M 320 145 L 335 135 L 350 140 L 348 155 L 335 160 L 320 155 Z",
  toshkent: "M 290 120 L 320 105 L 355 110 L 365 130 L 355 140 L 335 135 L 320 145 L 305 155 L 285 145 L 280 130 Z",
  sirdaryo: "M 305 155 L 320 155 L 335 160 L 350 165 L 360 175 L 345 190 L 320 185 L 300 175 L 295 165 Z",
  jizzax: "M 295 165 L 300 175 L 320 185 L 345 190 L 355 200 L 340 220 L 310 225 L 280 215 L 270 195 L 275 175 Z",
  samarqand: "M 230 200 L 270 195 L 280 215 L 310 225 L 300 250 L 270 260 L 240 255 L 220 235 L 215 215 Z",
  navoiy: "M 130 130 L 190 110 L 240 120 L 280 130 L 275 175 L 270 195 L 230 200 L 215 215 L 195 220 L 160 230 L 130 220 L 100 195 L 90 160 L 100 140 Z",
  buxoro: "M 90 160 L 100 195 L 130 220 L 160 230 L 195 220 L 215 215 L 220 235 L 200 260 L 175 275 L 140 280 L 105 270 L 80 250 L 65 220 L 60 190 L 70 170 Z",
  qashqadaryo: "M 220 235 L 240 255 L 270 260 L 285 275 L 270 295 L 240 305 L 215 295 L 200 275 L 200 260 Z",
  surxondaryo: "M 270 295 L 285 275 L 300 280 L 315 300 L 310 325 L 290 340 L 270 330 L 260 310 Z",
  fergana: "M 390 170 L 420 160 L 445 170 L 450 190 L 435 205 L 410 210 L 390 200 L 385 185 Z",
  andijon: "M 445 170 L 470 165 L 485 180 L 480 195 L 460 205 L 445 200 L 450 190 Z",
  namangan: "M 365 130 L 390 120 L 420 125 L 440 140 L 445 170 L 420 160 L 390 170 L 375 160 L 360 150 Z",
  xorazm: "M 60 100 L 85 85 L 105 95 L 110 115 L 100 130 L 80 135 L 65 125 L 55 110 Z",
  karakalpakstan: "M 20 30 L 80 20 L 130 40 L 160 80 L 130 130 L 100 140 L 90 160 L 70 170 L 60 190 L 40 170 L 25 140 L 15 100 L 10 60 Z",
};

const regionLabels: Record<string, { x: number; y: number }> = {
  toshkent_sh: { x: 335, y: 148 },
  toshkent: { x: 320, y: 125 },
  sirdaryo: { x: 325, y: 175 },
  jizzax: { x: 310, y: 200 },
  samarqand: { x: 255, y: 230 },
  navoiy: { x: 185, y: 170 },
  buxoro: { x: 140, y: 235 },
  qashqadaryo: { x: 240, y: 270 },
  surxondaryo: { x: 285, y: 310 },
  fergana: { x: 415, y: 188 },
  andijon: { x: 462, y: 185 },
  namangan: { x: 405, y: 145 },
  xorazm: { x: 82, y: 112 },
  karakalpakstan: { x: 75, y: 95 },
};

const regionDisplayNames: Record<string, string> = {
  toshkent_sh: "Toshkent sh.",
  toshkent: "Toshkent vil.",
  sirdaryo: "Sirdaryo",
  jizzax: "Jizzax",
  samarqand: "Samarqand",
  navoiy: "Navoiy",
  buxoro: "Buxoro",
  qashqadaryo: "Qashqadaryo",
  surxondaryo: "Surxondaryo",
  fergana: "Farg'ona",
  andijon: "Andijon",
  namangan: "Namangan",
  xorazm: "Xorazm",
  karakalpakstan: "Qoraqalpog'iston",
};

const getColor = (value: number, max: number): string => {
  if (value === 0) return "hsl(var(--muted))";
  const ratio = value / max;
  if (ratio > 0.7) return "hsl(350, 70%, 50%)";
  if (ratio > 0.4) return "hsl(350, 60%, 60%)";
  if (ratio > 0.2) return "hsl(350, 50%, 70%)";
  return "hsl(350, 40%, 80%)";
};

const UzbekistanMap = ({ data, title = "Hududlar bo'yicha taqsimot", valueLabel = "Oluvchilar" }: UzbekistanMapProps) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const dataMap = new Map(data.map((d) => [d.id, d]));
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const handleMouseMove = (e: React.MouseEvent, regionId: string) => {
    const rect = e.currentTarget.closest("svg")?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 10,
      });
    }
    setHoveredRegion(regionId);
  };

  const hoveredData = hoveredRegion ? dataMap.get(hoveredRegion) : null;

  return (
    <div className="relative">
      <h4 className="text-sm font-semibold mb-4 text-foreground">{title}</h4>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map */}
        <div className="flex-1 relative">
          <svg viewBox="0 0 500 360" className="w-full h-auto" style={{ maxHeight: 380 }}>
            {Object.entries(regionPaths).map(([id, path]) => {
              const regionData = dataMap.get(id);
              const value = regionData?.value ?? 0;
              const isHovered = hoveredRegion === id;

              return (
                <g key={id}>
                  <path
                    d={path}
                    fill={getColor(value, maxValue)}
                    stroke="hsl(var(--background))"
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    className="cursor-pointer transition-all duration-200"
                    style={{
                      filter: isHovered ? "brightness(0.85)" : "none",
                      transform: isHovered ? "scale(1.02)" : "scale(1)",
                      transformOrigin: `${regionLabels[id]?.x}px ${regionLabels[id]?.y}px`,
                    }}
                    onMouseMove={(e) => handleMouseMove(e, id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  />
                  {/* Region label - only show for larger regions */}
                  {regionLabels[id] && !["toshkent_sh", "sirdaryo"].includes(id) && (
                    <text
                      x={regionLabels[id].x}
                      y={regionLabels[id].y}
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                      fill="hsl(var(--foreground))"
                      fontSize={id === "karakalpakstan" || id === "navoiy" ? 8 : 7}
                      fontWeight={500}
                      opacity={0.7}
                    >
                      {regionDisplayNames[id]?.split(" ")[0]}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hoveredRegion && (
            <div
              className="absolute pointer-events-none z-20 bg-card border border-border rounded-lg shadow-lg px-3 py-2 transition-all duration-100"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y,
                transform: "translate(-50%, -100%)",
              }}
            >
              <p className="text-xs font-semibold text-foreground">
                {regionDisplayNames[hoveredRegion] || hoveredRegion}
              </p>
              <p className="text-xs text-muted-foreground">
                {valueLabel}: <span className="font-bold text-foreground">{hoveredData?.value?.toLocaleString() ?? 0}</span>
              </p>
              {hoveredData?.extra && (
                <p className="text-xs text-muted-foreground mt-0.5">{hoveredData.extra}</p>
              )}
            </div>
          )}
        </div>

        {/* Legend / Data list */}
        <div className="lg:w-48 flex-shrink-0">
          <p className="text-xs font-medium text-muted-foreground mb-3">Hududlar reytingi</p>
          <div className="space-y-2">
            {data
              .sort((a, b) => b.value - a.value)
              .map((d) => (
                <div
                  key={d.id}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    hoveredRegion === d.id ? "bg-muted" : "hover:bg-muted/50"
                  }`}
                  onMouseEnter={() => setHoveredRegion(d.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getColor(d.value, maxValue) }}
                    />
                    <span className="text-foreground font-medium">{d.name}</span>
                  </div>
                  <span className="font-bold text-foreground tabular-nums">{d.value.toLocaleString()}</span>
                </div>
              ))}
          </div>

          {/* Color scale */}
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-[10px] text-muted-foreground mb-1.5">Intensivlik</p>
            <div className="flex gap-1">
              {["hsl(350, 40%, 80%)", "hsl(350, 50%, 70%)", "hsl(350, 60%, 60%)", "hsl(350, 70%, 50%)"].map((c, i) => (
                <div key={i} className="flex-1 h-2 rounded-sm" style={{ backgroundColor: c }} />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5">
              <span>Kam</span>
              <span>Ko'p</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UzbekistanMap;
