import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Activity, ChevronRight, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

type Severity = "red" | "yellow" | "green";

interface RiskRow {
  title: string;
  metric: string;
  value: string | number;
  severity: Severity;
  reportPath: string;
}

const riskData: RiskRow[] = [
  {
    title: "Qayta taqsimot",
    metric: "Nomuvofiqliklar soni",
    value: "1 247",
    severity: "red",
    reportPath: "/reports/qayta-taqsimot",
  },
  {
    title: "HEMIS-TTJ sinxronizatsiya",
    metric: "Chetlashgan talabalar shartnomalari",
    value: 86,
    severity: "red",
    reportPath: "/reports/hemis-ttj-sync",
  },
  {
    title: "Tabaqalashtirilgan shartnomalar tahlili",
    metric: "Noto'g'ri summa mosliklari",
    value: 23,
    severity: "yellow",
    reportPath: "/reports/super-kontrakt",
  },
  {
    title: "Qarzdor talabalar tahlili",
    metric: "O'rtacha kechikish kunlari",
    value: "90+",
    severity: "red",
    reportPath: "/reports/otm-debt-aging",
  },
  {
    title: "To'lov qilinmagan shartnomalar",
    metric: "0 to'lovli tasdiqlangan shartnomalar",
    value: "4 312",
    severity: "yellow",
    reportPath: "/reports/unpaid-contracts",
  },
];

const severityConfig: Record<Severity, {
  dot: string;
  ring: string;
  valueCls: string;
  bg: string;
  hoverBg: string;
  borderColor: string;
  icon: React.ElementType;
  pulseColor: string;
}> = {
  red: {
    dot: "bg-red-500",
    ring: "ring-red-500/20",
    valueCls: "text-red-600 dark:text-red-400",
    bg: "bg-red-500/5",
    hoverBg: "hover:bg-red-500/10",
    borderColor: "border-red-500/30 hover:border-red-500/60",
    icon: XCircle,
    pulseColor: "bg-red-500",
  },
  yellow: {
    dot: "bg-yellow-400",
    ring: "ring-yellow-400/20",
    valueCls: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-400/5",
    hoverBg: "hover:bg-yellow-400/10",
    borderColor: "border-yellow-400/30 hover:border-yellow-400/60",
    icon: AlertTriangle,
    pulseColor: "bg-yellow-400",
  },
  green: {
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/20",
    valueCls: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/5",
    hoverBg: "hover:bg-emerald-500/10",
    borderColor: "border-emerald-500/30 hover:border-emerald-500/60",
    icon: CheckCircle2,
    pulseColor: "bg-emerald-500",
  },
};

const AnimatedValue = ({ value, delay }: { value: string | number; delay: number }) => {
  const animated = useCountUp(String(value), 1200, delay);
  return <>{animated}</>;
};

const RiskMiniCard = ({ row, index }: { row: RiskRow; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const style = severityConfig[row.severity];
  const SeverityIcon = style.icon;

  return (
    <div
      className={`relative rounded-2xl border ${style.borderColor} ${style.bg} ${style.hoverBg} p-4 flex flex-col justify-between gap-3 transition-all duration-300 group cursor-pointer animate-fade-in opacity-0`}
      style={{
        animationDelay: `${0.1 + index * 0.06}s`,
        animationFillMode: "forwards",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 24px -8px ${row.severity === 'red' ? 'rgba(239,68,68,0.15)' : row.severity === 'yellow' ? 'rgba(250,204,21,0.15)' : 'rgba(16,185,129,0.15)'}` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row: icon + title */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="relative">
            <SeverityIcon className={`w-4 h-4 ${style.valueCls}`} />
            {row.severity === "red" && (
              <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${style.pulseColor} animate-pulse`} />
            )}
          </div>
          <span className="text-sm font-semibold text-foreground leading-tight">{row.title}</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-snug pl-6">{row.metric}</p>
      </div>

      {/* Value */}
      <div className="pl-1">
        <span className={`text-2xl font-bold tabular-nums ${style.valueCls} transition-transform duration-300 inline-block`}
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        >
          <AnimatedValue value={row.value} delay={300 + index * 100} />
        </span>
      </div>

    </div>
  );
};

const RiskAnalysisCard = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const redCount = riskData.filter((r) => r.severity === "red").length;
  const yellowCount = riskData.filter((r) => r.severity === "yellow").length;
  const greenCount = riskData.filter((r) => r.severity === "green").length;

  // Overall health score
  const totalIssues = redCount + yellowCount;
  const healthLabel = redCount >= 3 ? "Jiddiy" : redCount >= 1 ? "O'rtacha" : "Barqaror";
  const healthColor = redCount >= 3 ? "text-red-500" : redCount >= 1 ? "text-yellow-500" : "text-emerald-500";

  return (
    <div
      className="relative group cursor-pointer"
      onClick={() => navigate("/risk-analysis")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow */}
      <div
        className="absolute -inset-1.5 rounded-2xl transition-all duration-500 blur-2xl"
        style={{ background: "hsl(0, 70%, 55%)", opacity: isHovered ? 0.06 : 0 }}
      />

      <div className="relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:border-transparent">
        {/* Gradient top bar */}
        <div className="h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-500" />

        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/15 to-orange-500/10 flex items-center justify-center border border-red-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Xavf tahlili</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs font-semibold ${healthColor}`}>● {healthLabel}</span>
                  <span className="text-[11px] text-muted-foreground">· {totalIssues} ta muammo aniqlandi</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Summary badges */}
              <div className="hidden sm:flex items-center gap-2">
                {[
                  { count: redCount, label: "xavfli", color: "bg-red-500/10 text-red-500 border-red-500/20" },
                  { count: yellowCount, label: "ogohlantirish", color: "bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border-yellow-400/20" },
                  { count: greenCount, label: "normal", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
                ].map((b) => (
                  <span key={b.label} className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full border ${b.color}`}>
                    {b.count} {b.label}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted/50 px-2.5 py-1.5 rounded-lg">
                <Activity className="w-3.5 h-3.5" />
                <span>bugun, 09:30</span>
              </div>
            </div>
          </div>

          {/* Risk cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {riskData.map((row, i) => (
              <RiskMiniCard key={row.title} row={row} index={i} />
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center mt-4 pt-4 border-t border-border/50">
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300 flex items-center gap-1.5">
              Batafsil tahlilni ko'rish
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysisCard;
