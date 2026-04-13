import { useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import {
  BarChart3, FileText, HandCoins, CircleDollarSign, CheckCircle,
  TrendingUp, TrendingDown, ArrowUpRight, Users, Zap, GraduationCap
} from "lucide-react";
import type { StatCard as StatCardType } from "@/data/dashboardData";

const iconMap: Record<string, React.ElementType> = {
  BarChart3, FileText, HandCoins, CircleDollarSign, CheckCircle, GraduationCap,
};

const sparklineMap: Record<string, number[]> = {
  "OTM lar": [150, 155, 160, 165, 168, 171],
  "Shartnomalar": [650000, 780000, 890000, 950000, 1000000, 1022696],
  "To'lovlar soni": [1800000, 1950000, 2100000, 2250000, 2350000, 2413174],
  "To'lanmagan summa": [3200, 3100, 3050, 3000, 2960, 2924],
  "Talabalar soni": [42000, 43500, 45000, 46200, 47500, 48920],
};

const colorConfig: Record<string, { gradient: string; text: string; sparkFrom: string; sparkTo: string }> = {
  purple: {
    gradient: "from-purple-500/10 to-purple-500/5",
    text: "hsl(270, 70%, 55%)",
    sparkFrom: "hsl(270, 70%, 55%)",
    sparkTo: "hsla(270, 70%, 55%, 0.1)",
  },
  blue: {
    gradient: "from-blue-500/10 to-blue-500/5",
    text: "hsl(217, 91%, 60%)",
    sparkFrom: "hsl(217, 91%, 60%)",
    sparkTo: "hsla(217, 91%, 60%, 0.1)",
  },
  rose: {
    gradient: "from-rose-500/10 to-rose-500/5",
    text: "hsl(350, 70%, 55%)",
    sparkFrom: "hsl(350, 70%, 55%)",
    sparkTo: "hsla(350, 70%, 55%, 0.1)",
  },
  cyan: {
    gradient: "from-cyan-500/10 to-cyan-500/5",
    text: "hsl(190, 80%, 45%)",
    sparkFrom: "hsl(190, 80%, 45%)",
    sparkTo: "hsla(190, 80%, 45%, 0.1)",
  },
  green: {
    gradient: "from-emerald-500/10 to-emerald-500/5",
    text: "hsl(142, 71%, 45%)",
    sparkFrom: "hsl(142, 71%, 45%)",
    sparkTo: "hsla(142, 71%, 45%, 0.1)",
  },
};

const trendData: Record<string, { value: string; up: boolean }> = {
  "OTM lar": { value: "+6.8%", up: true },
  "Shartnomalar": { value: "+12.3%", up: true },
  "To'lovlar soni": { value: "+8.5%", up: true },
  "To'lanmagan summa": { value: "-4.2%", up: false },
  "Talabalar soni": { value: "+3.2%", up: true },
};

interface Props {
  cards: StatCardType[];
  showTitle?: boolean;
  singleCard?: boolean;
}

const AnimatedValue = ({ value, delay }: { value: string; delay: number }) => {
  const animated = useCountUp(value, 1500, delay);
  return <p className="text-xl font-bold text-foreground leading-tight">{animated}</p>;
};

const HeroBanner = ({ cards, showTitle = true, singleCard = false }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const gridClass = singleCard 
    ? "" 
    : "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3";

  return (
    <div className={`space-y-4 ${singleCard ? '' : ''}`}>
      {/* Title row - only show if showTitle is true */}
      {showTitle && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Zap className="w-4 h-4" style={{ color: "white" }} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Asosiy ko'rsatkichlar</h2>
              <p className="text-xs text-muted-foreground">Real vaqtda yangilanadi</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium" style={{ color: "hsl(142, 71%, 45%)" }}>Jonli</span>
          </div>
        </div>
      )}

      {/* Cards grid */}
      <div className={singleCard ? "" : "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3"}>
        {cards.map((card, index) => {
          const Icon = iconMap[card.icon] || FileText;
          const config = colorConfig[card.color] || colorConfig.blue;
          const trend = trendData[card.label];
          const sparkData = (sparklineMap[card.label] || [0, 0, 0, 0, 0, 0]).map((v, i) => ({ v }));
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={card.label}
              className={`relative bg-card rounded-xl border border-border p-4 cursor-pointer transition-all duration-300 overflow-hidden ${
                isHovered ? "shadow-lg scale-[1.03] border-primary/30" : "hover:shadow-md"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient background only */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 opacity-40"
                style={{ background: `linear-gradient(to right, ${config.sparkFrom}, ${config.sparkTo})` }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${config.text}15` }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: config.text }} />
                  </div>
                  {trend && (
                    <span
                      className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                        trend.up ? "bg-emerald-500/10" : "bg-rose-500/10"
                      }`}
                      style={{ color: trend.up ? "hsl(142, 71%, 45%)" : "hsl(350, 70%, 55%)" }}
                    >
                      {trend.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {trend.value}
                    </span>
                  )}
                </div>
                <AnimatedValue value={card.value} delay={index * 100} />
                <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroBanner;
