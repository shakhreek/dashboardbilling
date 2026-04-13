import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, FileText, CreditCard, Home, GraduationCap, Building2, Landmark, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleMetric {
  id: string;
  name: string;
  icon: React.ReactNode;
  value: number;
  total: number;
  percentage: number;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  color: string;
  bgGradient: string;
}

const modules: ModuleMetric[] = [
  {
    id: "kontrakt",
    name: "Kontrakt",
    icon: <FileText className="w-4 h-4" />,
    value: 787674,
    total: 850000,
    percentage: 92,
    trend: "up",
    trendValue: "+5.2%",
    color: "hsl(217, 91%, 60%)",
    bgGradient: "from-blue-500/10 to-blue-600/5",
  },
  {
    id: "kredit",
    name: "Kredit",
    icon: <CreditCard className="w-4 h-4" />,
    value: 142850,
    total: 180000,
    percentage: 79,
    trend: "down",
    trendValue: "-2.1%",
    color: "hsl(270, 70%, 55%)",
    bgGradient: "from-purple-500/10 to-purple-600/5",
  },
  {
    id: "ttj",
    name: "TTJ",
    icon: <Home className="w-4 h-4" />,
    value: 4520,
    total: 5200,
    percentage: 87,
    trend: "up",
    trendValue: "+3.8%",
    color: "hsl(142, 71%, 45%)",
    bgGradient: "from-emerald-500/10 to-emerald-600/5",
  },
  {
    id: "stipendiya",
    name: "Stipendiya",
    icon: <GraduationCap className="w-4 h-4" />,
    value: 2340,
    total: 2500,
    percentage: 94,
    trend: "up",
    trendValue: "+1.5%",
    color: "hsl(45, 90%, 50%)",
    bgGradient: "from-amber-500/10 to-amber-600/5",
  },
  {
    id: "ijara",
    name: "Ijara",
    icon: <Building2 className="w-4 h-4" />,
    value: 18900,
    total: 22000,
    percentage: 86,
    trend: "neutral",
    trendValue: "0.0%",
    color: "hsl(350, 70%, 55%)",
    bgGradient: "from-rose-500/10 to-rose-600/5",
  },
  {
    id: "subsidiya",
    name: "Subsidiya",
    icon: <Landmark className="w-4 h-4" />,
    value: 2340,
    total: 2780,
    percentage: 84,
    trend: "up",
    trendValue: "+8.2%",
    color: "hsl(239, 84%, 60%)",
    bgGradient: "from-indigo-500/10 to-indigo-600/5",
  },
];

const CircularGauge = ({
  percentage,
  color,
  size = 56,
  strokeWidth = 4,
}: {
  percentage: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 4px ${color}40)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-foreground">{percentage}%</span>
      </div>
    </div>
  );
};

const TrendIcon = ({ trend, value }: { trend: "up" | "down" | "neutral"; value: string }) => {
  const icons = {
    up: <TrendingUp className="w-3 h-3" />,
    down: <TrendingDown className="w-3 h-3" />,
    neutral: <Minus className="w-3 h-3" />,
  };

  const colors = {
    up: "text-emerald-500",
    down: "text-rose-500",
    neutral: "text-muted-foreground",
  };

  return (
    <div className={cn("flex items-center gap-1 text-xs font-medium", colors[trend])}>
      {icons[trend]}
      <span>{value}</span>
    </div>
  );
};

const ModulePerformancePanel = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const activeModules = selectedModule
    ? modules.filter((m) => m.id === selectedModule)
    : modules;

  return (
    <div className="bg-card rounded-xl border border-border p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Modullar samaradorligi</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Real vaqt statistikasi</p>
        </div>
        {selectedModule && (
          <button
            onClick={() => setSelectedModule(null)}
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Barchasi
          </button>
        )}
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {activeModules.map((module) => (
          <button
            key={module.id}
            onClick={() => setSelectedModule(module.id === selectedModule ? null : module.id)}
            onMouseEnter={() => setHoveredModule(module.id)}
            onMouseLeave={() => setHoveredModule(null)}
            className={cn(
              "relative p-3 rounded-xl border text-left transition-all duration-300 group",
              "bg-gradient-to-br",
              module.bgGradient,
              selectedModule === module.id
                ? "border-primary/50 ring-1 ring-primary/20"
                : "border-border hover:border-primary/30",
              hoveredModule === module.id && "scale-[1.02]"
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${module.color}20`, color: module.color }}
              >
                {module.icon}
              </div>
              <CircularGauge percentage={module.percentage} color={module.color} size={44} strokeWidth={3} />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">{module.name}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {module.value.toLocaleString()}
                </span>
                <TrendIcon trend={module.trend} value={module.trendValue} />
              </div>
            </div>

            {selectedModule === module.id && (
              <div className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
            )}
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-auto pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-secondary/50">
            <p className="text-lg font-bold text-foreground">
              {Math.round(modules.reduce((acc, m) => acc + m.percentage, 0) / modules.length)}%
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">O'rtacha</p>
          </div>
          <div className="p-2 rounded-lg bg-secondary/50">
            <p className="text-lg font-bold text-emerald-500">
              {modules.filter((m) => m.trend === "up").length}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">O'sish</p>
          </div>
          <div className="p-2 rounded-lg bg-secondary/50">
            <p className="text-lg font-bold text-foreground">
              {modules.reduce((acc, m) => acc + m.value, 0).toLocaleString()}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Jami</p>
          </div>
        </div>

        <button className="w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors group">
          <span>Batafsil hisobot</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ModulePerformancePanel;
