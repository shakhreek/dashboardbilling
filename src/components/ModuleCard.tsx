import { useState } from "react";
import { FileText, CreditCard, Building2, Award, Home, Landmark, TrendingUp, TrendingDown, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModuleCardData {
  id: string;
  slug: string;
  title: string;
  icon: React.ElementType;
  color: string;
  lightColor: string;
  metrics: { label: string; value: string; trend?: "up" | "down"; trendValue?: string }[];
  mainValue: string;
  mainLabel: string;
}

export const moduleCards: ModuleCardData[] = [
  {
    id: "To'lov kontrakt",
    title: "Kontrakt",
    icon: FileText,
    color: "hsl(217, 91%, 60%)",
    lightColor: "hsl(217, 91%, 95%)",
    mainValue: "14 440",
    mainLabel: "mlrd so'm",
    metrics: [
      { label: "Arizalar soni", value: "12 450", trend: "up", trendValue: "+3.2%" },
      { label: "Tasdiqlangan", value: "11 230" },
      { label: "To'langan", value: "7 253 mlrd", trend: "up", trendValue: "+12%" },
    ],
  },
  {
    id: "Kredit modul",
    title: "Kredit modul",
    icon: CreditCard,
    color: "hsl(270, 70%, 55%)",
    lightColor: "hsl(270, 70%, 95%)",
    mainValue: "3 210",
    mainLabel: "mlrd so'm",
    metrics: [
      { label: "Arizalar soni", value: "142 850", trend: "up", trendValue: "+5.1%" },
      { label: "Shartnomalar", value: "128 740" },
      { label: "To'lovlar", value: "1 670 mlrd", trend: "down", trendValue: "-2.4%" },
    ],
  },
  {
    id: "TTJ",
    title: "TTJ",
    icon: Building2,
    color: "hsl(142, 71%, 45%)",
    lightColor: "hsl(142, 71%, 95%)",
    mainValue: "4 520",
    mainLabel: "talaba",
    metrics: [
      { label: "Arizalar soni", value: "5 670" },
      { label: "Shartnomalar", value: "4 890" },
      { label: "Jami summa", value: "890 mlrd", trend: "up", trendValue: "+8%" },
    ],
  },
  {
    id: "Stipendiya",
    title: "Stipendiya",
    icon: Award,
    color: "hsl(45, 90%, 50%)",
    lightColor: "hsl(45, 90%, 95%)",
    mainValue: "2 340",
    mainLabel: "talaba",
    metrics: [
      { label: "Oluvchilar", value: "2 340", trend: "up", trendValue: "+4.5%" },
      { label: "Jami summa", value: "3 600 mlrd" },
    ],
  },
  {
    id: "Ijara",
    title: "Ijara subsidiyasi",
    icon: Home,
    color: "hsl(350, 70%, 55%)",
    lightColor: "hsl(350, 70%, 95%)",
    mainValue: "18 900",
    mainLabel: "ariza",
    metrics: [
      { label: "Jami summa", value: "2 100 mlrd" },
      { label: "Oluvchilar", value: "14 500", trend: "up", trendValue: "+6.3%" },
    ],
  },
  {
    id: "TTJ Subsidiya",
    title: "TTJ Subsidiya",
    icon: Landmark,
    color: "hsl(239, 84%, 60%)",
    lightColor: "hsl(239, 84%, 95%)",
    mainValue: "27 800",
    mainLabel: "ariza",
    metrics: [
      { label: "Jami summa", value: "4 500 mlrd" },
      { label: "Oluvchilar", value: "23 400", trend: "up", trendValue: "+7.1%" },
    ],
  },
];

interface Props {
  data: ModuleCardData;
  onViewDetails: () => void;
}

const ModuleCard = ({ data, onViewDetails }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = data.icon;

  return (
    <div
      className="relative group cursor-pointer"
      onClick={onViewDetails}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: data.color, opacity: isHovered ? 0.15 : 0 }}
      />

      <div className="relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:border-transparent">
        {/* Top gradient bar */}
        <div className="h-1" style={{ background: `linear-gradient(90deg, ${data.color}, ${data.color}80)` }} />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ backgroundColor: data.lightColor }}
              >
                <Icon className="w-5 h-5" style={{ color: data.color }} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{data.title}</h3>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xl font-bold text-foreground">{data.mainValue}</span>
                  <span className="text-xs text-muted-foreground">{data.mainLabel}</span>
                </div>
              </div>
            </div>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
              style={{ backgroundColor: data.lightColor }}
            >
              <ArrowUpRight className="w-4 h-4" style={{ color: data.color }} />
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-2.5">
            {data.metrics.map((m, idx) => (
              <div
                key={m.label}
                className="flex items-center justify-between py-1.5 px-3 rounded-lg transition-colors duration-200 hover:bg-accent/50"
                style={{
                  animationDelay: `${idx * 50}ms`,
                }}
              >
                <span className="text-xs text-muted-foreground">{m.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground tabular-nums">{m.value}</span>
                  {m.trend && (
                    <span
                      className={cn(
                        "flex items-center gap-0.5 text-[11px] font-medium px-1.5 py-0.5 rounded-full",
                        m.trend === "up"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-rose-500/10 text-rose-500"
                      )}
                    >
                      {m.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {m.trendValue}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer button */}
          <button
            className="w-full mt-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 flex items-center justify-center gap-2 border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
          >
            Batafsil ko'rish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
