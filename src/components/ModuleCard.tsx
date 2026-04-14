import { useState } from "react";
import { FileText, CreditCard, Building2, Award, Home, Landmark, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/useCountUp";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

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
  sparkline?: number[];
}

export const moduleCards: ModuleCardData[] = [
  {
    id: "To'lov kontrakt",
    slug: "tolov-kontrakt",
    title: "Kontrakt to'lovlari",
    icon: FileText,
    color: "hsl(217, 91%, 60%)",
    lightColor: "hsl(217, 91%, 95%)",
    mainValue: "787 674",
    mainLabel: "shartnomalar",
    sparkline: [4200, 5800, 7100, 8900, 11200, 14440],
    metrics: [
      { label: "Umumiy summa", value: "14 440 mlrd" },
      { label: "To'langan summa", value: "7 253 mlrd", trend: "up", trendValue: "+12%" },
      { label: "To'lanmagan summa", value: "7 187 mlrd", trend: "down", trendValue: "-1.5%" },
    ],
  },
  {
    id: "Kredit modul",
    slug: "kredit-modul",
    title: "Kredit moduli",
    icon: CreditCard,
    color: "hsl(270, 70%, 55%)",
    lightColor: "hsl(270, 70%, 95%)",
    mainValue: "142 850",
    mainLabel: "shartnomalar",
    sparkline: [1200, 1800, 2100, 2500, 2900, 3210],
    metrics: [
      { label: "Umumiy summa", value: "3 210 mlrd" },
      { label: "To'langan summa", value: "1 670 mlrd", trend: "up", trendValue: "+5.1%" },
      { label: "To'lanmagan summa", value: "1 540 mlrd", trend: "down", trendValue: "-2.4%" },
    ],
  },
  {
    id: "TTJ",
    slug: "ttj",
    title: "Talabalar turar joyi",
    icon: Building2,
    color: "hsl(142, 71%, 45%)",
    lightColor: "hsl(142, 71%, 95%)",
    mainValue: "48 920",
    mainLabel: "shartnomalar",
    sparkline: [2100, 2800, 3200, 3700, 4100, 4520],
    metrics: [
      { label: "Umumiy summa", value: "890 mlrd" },
      { label: "To'langan summa", value: "570 mlrd", trend: "up", trendValue: "+8%" },
      { label: "To'lanmagan summa", value: "320 mlrd", trend: "down", trendValue: "-4.1%" },
    ],
  },
  {
    id: "Stipendiya",
    slug: "stipendiya",
    title: "Stipendiya",
    icon: Award,
    color: "hsl(45, 90%, 50%)",
    lightColor: "hsl(45, 90%, 95%)",
    mainValue: "23 400",
    mainLabel: "talaba",
    sparkline: [900, 1200, 1500, 1800, 2100, 2340],
    metrics: [
      { label: "Jami to'lanadigan summa", value: "3 600 mlrd" },
      { label: "Bazaviy stipendiya oluvchilar", value: "18 200", trend: "up", trendValue: "+4.5%" },
      { label: "Boshqa turdagi stipendiya oluvchilar", value: "5 200", trend: "up", trendValue: "+3.1%" },
    ],
  },
  {
    id: "Ijara",
    slug: "ijara",
    title: "Ijara subsidiyasi",
    icon: Home,
    color: "hsl(350, 70%, 55%)",
    lightColor: "hsl(350, 70%, 95%)",
    mainValue: "18 900",
    mainLabel: "ijara oluvchilar",
    sparkline: [8000, 10500, 13000, 15200, 17100, 18900],
    metrics: [
      { label: "Jami to'lanadigan summa", value: "2 100 mlrd" },
      { label: "Arizalar soni", value: "21 450", trend: "up", trendValue: "+6.3%" },
      { label: "To'langan summa", value: "1 650 mlrd", trend: "up", trendValue: "+5.8%" },
    ],
  },
  {
    id: "TTJ Subsidiya",
    slug: "ttj-subsidiya",
    title: "TTJ Subsidiya",
    icon: Landmark,
    color: "hsl(239, 84%, 60%)",
    lightColor: "hsl(239, 84%, 95%)",
    mainValue: "27 800",
    mainLabel: "shartnomalar",
    sparkline: [12000, 16000, 19500, 22800, 25400, 27800],
    metrics: [
      { label: "Jami summa", value: "4 500 mlrd" },
      { label: "Oluvchilar", value: "23 400", trend: "up", trendValue: "+7.1%" },
    ],
  },
];

const AnimatedMetric = ({ value, delay }: { value: string; delay: number }) => {
  const animated = useCountUp(value, 1200, delay);
  return <>{animated}</>;
};

interface Props {
  data: ModuleCardData;
  onViewDetails: () => void;
}

const ModuleCard = ({ data, onViewDetails }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = data.icon;

  const sparkData = (data.sparkline || []).map((v, i) => ({ v, i }));

  return (
    <div
      className="relative group cursor-pointer"
      onClick={onViewDetails}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-1.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl"
        style={{ background: data.color, opacity: isHovered ? 0.12 : 0 }}
      />

      <div className="relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:border-transparent">
        {/* Background sparkline chart */}
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none">
          {sparkData.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`grad-${data.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={data.color} stopOpacity={1} />
                    <stop offset="100%" stopColor={data.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke={data.color} fill={`url(#grad-${data.id})`} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top accent bar */}
        <div
          className="h-1 transition-all duration-300 group-hover:h-1.5"
          style={{ background: `linear-gradient(90deg, ${data.color}, ${data.color}60)` }}
        />

        <div className="relative p-5">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${data.color}18, ${data.color}08)`,
                  border: `1.5px solid ${data.color}30`,
                }}
              >
                <Icon className="w-5.5 h-5.5" style={{ color: data.color }} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm tracking-tight">{data.title}</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Joriy o'quv yili</p>
              </div>
            </div>

            <div
              className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
              style={{
                background: `${data.color}15`,
                border: `1px solid ${data.color}30`,
              }}
            >
              <ArrowUpRight className="w-3.5 h-3.5" style={{ color: data.color }} />
            </div>
          </div>

          {/* Main value */}
          <div className="mb-5 pl-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground tracking-tight">
                <AnimatedMetric value={data.mainValue} delay={200} />
              </span>
              <span className="text-sm text-muted-foreground font-medium">{data.mainLabel}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/60 mb-4" />

          {/* Metrics list */}
          <div className="space-y-2">
            {data.metrics.map((m, idx) => (
              <div
                key={m.label}
                className="flex items-center justify-between py-2 px-3 rounded-xl transition-all duration-200 hover:bg-accent/60"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: data.color, opacity: 0.6 }}
                  />
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-sm font-semibold tabular-nums",
                    (m.value === "0" || m.value === "0mlrd" || m.value === "0 mlrd")
                      ? "text-muted-foreground/50"
                      : "text-foreground"
                  )}>
                    {(m.value === "0" || m.value === "0mlrd" || m.value === "0 mlrd") ? (
                      <span className="text-muted-foreground/40">—</span>
                    ) : (
                      <AnimatedMetric value={m.value} delay={300 + idx * 100} />
                    )}
                  </span>
                  {m.trend && (
                    <span
                      className={cn(
                        "flex items-center gap-0.5 text-[11px] font-medium px-2 py-0.5 rounded-full",
                        m.trend === "up"
                          ? "bg-emerald-500/10 text-emerald-500"
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

          {/* Footer */}
          <button
            className="w-full mt-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 border text-muted-foreground hover:text-primary-foreground hover:border-transparent"
            style={{
              borderColor: `${data.color}25`,
              background: isHovered ? undefined : 'transparent',
              ...(isHovered ? { background: data.color, color: 'white', borderColor: 'transparent' } : {}),
            }}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
          >
            <span>Batafsil ko'rish</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
