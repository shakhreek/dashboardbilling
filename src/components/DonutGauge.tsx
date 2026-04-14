import { useMemo, useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  title: string;
  percentage: number;
  label: string;
  remainLabel: string;
  color: string;
  remainColor: string;
}

const slides: SlideData[] = [
  {
    title: "Kontrakt",
    percentage: 79,
    label: "Shartnoma olganlar",
    remainLabel: "Shartnoma olmaganlar",
    color: "hsl(270, 70%, 55%)",
    remainColor: "hsl(350, 75%, 60%)",
  },
  {
    title: "Kredit",
    percentage: 65,
    label: "To'langan summa",
    remainLabel: "Qoldiq summa",
    color: "hsl(217, 91%, 60%)",
    remainColor: "hsl(45, 90%, 50%)",
  },
  {
    title: "TTJ",
    percentage: 87,
    label: "Band joylar",
    remainLabel: "Bo'sh joylar",
    color: "hsl(142, 71%, 45%)",
    remainColor: "hsl(215, 16%, 70%)",
  },
  {
    title: "Ijara",
    percentage: 54,
    label: "To'langan ijara",
    remainLabel: "Qarzdorlik",
    color: "hsl(350, 70%, 55%)",
    remainColor: "hsl(215, 16%, 70%)",
  },
];

const INTERVAL = 4000;

const GaugeChart = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedValue, setAnimatedValue] = useState(0);
  const frameRef = useRef<number>();
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const slide = slides[currentSlide];

  const size = 240;
  const cx = size / 2;
  const cy = size / 2 + 5;
  const radius = 85;
  const tickCount = 40;

  // Animate on slide change
  useEffect(() => {
    setAnimatedValue(0);
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setAnimatedValue(eased * slide.percentage);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate);
    }, 150);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [currentSlide, slide.percentage]);

  const isPaused = useRef(false);

  // Auto-rotate
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!isPaused.current) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, INTERVAL);
  };

  const goTo = (idx: number) => {
    setCurrentSlide(idx);
    resetTimer();
  };

  const remaining = 100 - Math.round(animatedValue);

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
    <div
      className="bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-between h-full"
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
    >
      {/* Header with nav */}
      <div className="w-full flex items-center justify-between mb-1">
        <button
          onClick={() => goTo((currentSlide - 1 + slides.length) % slides.length)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-semibold text-foreground">{slide.title}</span>
        <button
          onClick={() => goTo((currentSlide + 1) % slides.length)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
          <svg
            width={size}
            height={size / 2 + 30}
            viewBox={`0 0 ${size} ${size / 2 + 30}`}
          >
            {ticks.map((tick, i) => {
              const filled = tick.frac * 100 <= animatedValue;
              return (
                <line
                  key={i}
                  x1={tick.x1}
                  y1={tick.y1}
                  x2={tick.x2}
                  y2={tick.y2}
                  stroke={filled ? slide.color : "hsl(var(--muted))"}
                  strokeWidth={4}
                  strokeLinecap="round"
                  opacity={filled ? 1 : 0.3}
                  style={{ transition: "stroke 0.15s, opacity 0.15s" }}
                />
              );
            })}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">
            <span className="text-4xl font-bold text-foreground leading-none">{Math.round(animatedValue)}%</span>
            <span className="text-sm text-muted-foreground mt-2">{slide.label}</span>
          </div>
        </div>
      </div>

      <div className="w-full mt-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-sm text-muted-foreground">{slide.remainLabel}</span>
          <span className="text-sm font-semibold text-muted-foreground">{remaining}%</span>
        </div>
        <div className="w-full h-2.5 bg-muted/40 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${remaining}%`,
              background: `linear-gradient(90deg, ${slide.remainColor}, ${slide.remainColor})`,
            }}
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentSlide ? "w-5 bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default GaugeChart;
