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

// Accurate SVG paths for Uzbekistan regions based on geographic boundaries
const regionPaths: Record<string, string> = {
  karakalpakstan:
    "M 45 195 L 50 175 L 42 155 L 38 130 L 42 105 L 55 82 L 72 65 L 95 50 L 120 42 L 148 38 L 170 42 L 188 52 L 195 65 L 190 78 L 178 88 L 172 100 L 175 115 L 185 125 L 198 130 L 215 128 L 230 125 L 248 128 L 260 135 L 270 145 L 275 158 L 272 170 L 262 178 L 248 182 L 235 190 L 225 200 L 218 212 L 210 220 L 198 225 L 182 222 L 168 215 L 155 212 L 142 218 L 130 228 L 118 232 L 105 228 L 92 220 L 80 215 L 68 218 L 58 225 L 48 222 L 42 212 L 42 200 Z",
  xorazm:
    "M 118 232 L 130 228 L 142 218 L 155 212 L 168 215 L 182 222 L 178 235 L 170 248 L 158 255 L 145 258 L 132 255 L 122 248 L 118 238 Z",
  navoiy:
    "M 198 130 L 215 128 L 230 125 L 248 128 L 260 135 L 270 145 L 275 158 L 272 170 L 262 178 L 248 182 L 235 190 L 225 200 L 218 212 L 210 220 L 198 225 L 182 222 L 178 235 L 170 248 L 158 255 L 155 268 L 165 278 L 178 285 L 195 288 L 212 285 L 228 278 L 245 275 L 262 278 L 278 282 L 295 278 L 308 270 L 322 265 L 335 268 L 345 275 L 352 265 L 348 252 L 340 240 L 335 225 L 338 210 L 345 198 L 340 185 L 328 178 L 315 175 L 302 178 L 290 172 L 278 162 L 268 155 L 255 148 L 242 142 L 228 138 L 215 135 L 205 132 Z",
  buxoro:
    "M 155 268 L 165 278 L 178 285 L 195 288 L 212 285 L 228 278 L 245 275 L 262 278 L 278 282 L 295 278 L 308 270 L 322 265 L 335 268 L 345 275 L 350 288 L 342 302 L 330 312 L 318 318 L 305 322 L 290 328 L 278 335 L 268 342 L 255 345 L 242 342 L 228 338 L 215 342 L 205 350 L 195 355 L 182 352 L 170 345 L 160 335 L 152 322 L 148 308 L 150 292 L 152 278 Z",
  samarqand:
    "M 335 268 L 345 275 L 350 288 L 342 302 L 330 312 L 348 315 L 362 308 L 378 302 L 392 298 L 402 305 L 398 318 L 388 328 L 375 332 L 365 325 L 355 318 L 345 325 L 340 338 L 348 348 L 358 342 L 368 338 L 378 342 L 382 352 L 375 362 L 362 365 L 348 360 L 338 352 L 328 345 L 318 340 L 305 338 L 295 342 L 285 348 L 275 345 L 268 342 L 255 345 L 242 342 L 228 338 L 215 342 L 225 335 L 238 330 L 252 325 L 268 318 L 280 310 L 295 305 L 310 298 L 322 288 L 330 278 Z",
  jizzax:
    "M 335 225 L 338 210 L 345 198 L 358 195 L 372 198 L 385 205 L 395 215 L 400 228 L 405 242 L 402 255 L 395 265 L 385 272 L 375 278 L 365 282 L 358 288 L 350 295 L 342 302 L 330 312 L 322 298 L 325 285 L 330 278 L 335 268 L 345 275 L 352 265 L 348 252 L 340 240 Z",
  qashqadaryo:
    "M 330 312 L 348 315 L 362 308 L 378 302 L 392 298 L 402 305 L 398 318 L 388 328 L 375 332 L 365 325 L 355 318 L 345 325 L 340 338 L 328 345 L 318 340 L 305 338 L 295 342 L 285 348 L 275 345 L 268 342 L 278 335 L 290 328 L 305 322 L 318 318 Z",
  surxondaryo:
    "M 340 338 L 348 348 L 358 342 L 368 338 L 378 342 L 382 352 L 375 362 L 362 365 L 348 360 L 338 352 L 328 345 L 340 338 Z",
  toshkent:
    "M 385 205 L 395 195 L 408 188 L 420 182 L 432 178 L 445 175 L 455 178 L 462 185 L 458 195 L 450 205 L 442 212 L 435 218 L 425 225 L 418 232 L 410 238 L 402 242 L 400 228 L 395 215 Z",
  toshkent_sh:
    "M 445 175 L 455 178 L 462 185 L 458 195 L 450 205 L 455 195 L 458 188 L 455 182 L 448 178 Z",
  sirdaryo:
    "M 400 228 L 402 242 L 405 255 L 402 255 L 395 265 L 385 272 L 375 278 L 365 282 L 358 288 L 350 295 L 342 302 L 348 315 L 362 308 L 378 302 L 392 298 L 402 305 L 410 295 L 418 285 L 425 275 L 430 262 L 432 248 L 425 238 L 418 232 L 410 238 Z",
  namangan:
    "M 462 185 L 472 178 L 485 172 L 498 170 L 512 172 L 525 178 L 535 185 L 542 195 L 535 205 L 522 210 L 510 208 L 498 205 L 488 210 L 478 218 L 468 222 L 458 218 L 450 210 L 450 205 L 458 195 Z",
  fergana:
    "M 468 222 L 478 218 L 488 210 L 498 205 L 510 208 L 522 210 L 528 218 L 525 228 L 518 238 L 508 245 L 498 248 L 488 245 L 478 240 L 470 232 Z",
  andijon:
    "M 522 210 L 535 205 L 542 195 L 550 198 L 555 208 L 552 218 L 545 228 L 535 232 L 525 228 L 528 218 Z",
};

const regionLabels: Record<string, { x: number; y: number; fontSize?: number }> = {
  karakalpakstan: { x: 150, y: 130, fontSize: 9 },
  xorazm: { x: 152, y: 238, fontSize: 8 },
  navoiy: { x: 275, y: 215, fontSize: 9 },
  buxoro: { x: 245, y: 318, fontSize: 9 },
  samarqand: { x: 345, y: 340, fontSize: 8 },
  jizzax: { x: 370, y: 252, fontSize: 8 },
  qashqadaryo: { x: 330, y: 328, fontSize: 7 },
  surxondaryo: { x: 358, y: 352, fontSize: 7 },
  toshkent: { x: 430, y: 208, fontSize: 7 },
  toshkent_sh: { x: 455, y: 185, fontSize: 6 },
  sirdaryo: { x: 400, y: 278, fontSize: 7 },
  namangan: { x: 505, y: 195, fontSize: 8 },
  fergana: { x: 498, y: 230, fontSize: 8 },
  andijon: { x: 540, y: 215, fontSize: 7 },
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
  if (ratio > 0.7) return "hsl(217, 80%, 50%)";
  if (ratio > 0.4) return "hsl(217, 65%, 62%)";
  if (ratio > 0.2) return "hsl(217, 50%, 74%)";
  return "hsl(217, 40%, 84%)";
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
          <svg viewBox="20 25 560 360" className="w-full h-auto" style={{ maxHeight: 420 }}>
            {Object.entries(regionPaths).map(([id, path]) => {
              const rd = dataMap.get(id);
              const value = rd?.value ?? 0;
              const isHovered = hoveredRegion === id;
              const label = regionLabels[id];

              return (
                <g key={id}>
                  <path
                    d={path}
                    fill={getColor(value, maxValue)}
                    stroke="hsl(var(--background))"
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    className="cursor-pointer transition-all duration-200"
                    style={{
                      filter: isHovered ? "brightness(0.85) drop-shadow(0 2px 6px rgba(0,0,0,0.2))" : "none",
                    }}
                    onMouseMove={(e) => handleMouseMove(e, id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  />
                  {label && (
                    <text
                      x={label.x}
                      y={label.y}
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                      fill="hsl(var(--foreground))"
                      fontSize={label.fontSize || 8}
                      fontWeight={600}
                      opacity={isHovered ? 1 : 0.65}
                    >
                      {regionDisplayNames[id]}
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
              <p className="text-xs font-semibold text-foreground whitespace-nowrap">
                {regionDisplayNames[hoveredRegion] || hoveredRegion}
              </p>
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                {valueLabel}: <span className="font-bold text-foreground">{hoveredData?.value?.toLocaleString() ?? 0}</span>
              </p>
              {hoveredData?.extra && (
                <p className="text-xs text-muted-foreground mt-0.5">{hoveredData.extra}</p>
              )}
            </div>
          )}
        </div>

        {/* Legend / Data list */}
        <div className="lg:w-52 flex-shrink-0">
          <p className="text-xs font-medium text-muted-foreground mb-3">Hududlar reytingi</p>
          <div className="space-y-1.5 max-h-[340px] overflow-y-auto">
            {[...data]
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
                      className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
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
            <div className="flex gap-0.5 rounded overflow-hidden">
              {["hsl(217, 40%, 84%)", "hsl(217, 50%, 74%)", "hsl(217, 65%, 62%)", "hsl(217, 80%, 50%)"].map((c, i) => (
                <div key={i} className="flex-1 h-2.5" style={{ backgroundColor: c }} />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
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
