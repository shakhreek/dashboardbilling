import { useNavigate } from "react-router-dom";
import { Shield, ExternalLink, Activity, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    metric: "O'chirilgan talabalar shartnomalari",
    value: 86,
    severity: "red",
    reportPath: "/reports/hemis-ttj-sync",
  },
  {
    title: "Shartnoma summasi tekshiruvi",
    metric: "Noto'g'ri summa mosliklari",
    value: 23,
    severity: "yellow",
    reportPath: "/reports/super-kontrakt",
  },
  {
    title: "OTM qarz eskirishi",
    metric: "Maksimal kechikish kunlari",
    value: "365+",
    severity: "red",
    reportPath: "/reports/otm-debt-aging",
  },
  {
    title: "To'lanmagan shartnomalar",
    metric: "0 to'lovli tasdiqlangan shartnomalar",
    value: "4 312",
    severity: "yellow",
    reportPath: "/reports/unpaid-contracts",
  },
];

const severityStyles: Record<Severity, { dot: string; ring: string; valueCls: string; borderCls: string }> = {
  red: {
    dot: "bg-red-500",
    ring: "ring-red-500/20",
    valueCls: "text-red-600 dark:text-red-400",
    borderCls: "border-l-red-500",
  },
  yellow: {
    dot: "bg-yellow-400",
    ring: "ring-yellow-400/20",
    valueCls: "text-yellow-600 dark:text-yellow-400",
    borderCls: "border-l-yellow-400",
  },
  green: {
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/20",
    valueCls: "text-emerald-600 dark:text-emerald-400",
    borderCls: "border-l-emerald-500",
  },
};

const RiskAnalysisCard = () => {
  const navigate = useNavigate();
  const redCount = riskData.filter((r) => r.severity === "red").length;
  const yellowCount = riskData.filter((r) => r.severity === "yellow").length;
  const greenCount = riskData.filter((r) => r.severity === "green").length;

  return (
    <Card className="card-hover overflow-hidden cursor-pointer" onClick={() => navigate("/risk-analysis")}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-base">Xavf tahlili · Salomatlik tekshiruvi</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Billing tizimi holati</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> {redCount} xavfli</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400" /> {yellowCount} ogohlantirish</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> {greenCount} normal</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Activity className="w-3.5 h-3.5" />
              <span className="hidden md:inline">bugun, 09:30</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {riskData.map((row) => {
            const style = severityStyles[row.severity];
            return (
              <div
                key={row.title}
                className={`relative rounded-lg border border-l-[3px] ${style.borderCls} bg-muted/30 p-4 flex flex-col justify-between gap-3 hover:bg-muted/60 transition-colors group`}
              >
                {/* Signal + Title */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2.5 h-2.5 rounded-full ${style.dot} ring-4 ${style.ring}`} />
                    <span className="text-sm font-semibold text-foreground leading-tight">{row.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">{row.metric}</p>
                </div>

                {/* Value */}
                <div className={`text-2xl font-bold tabular-nums ${style.valueCls}`}>
                  {row.value}
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAnalysisCard;
