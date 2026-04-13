import { Shield, AlertTriangle, CheckCircle, XCircle, ExternalLink, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    title: "HEMIS-TTJ Sync",
    metric: "O'chirilgan talabalar shartnomalari",
    value: 86,
    severity: "red",
    reportPath: "/reports/hemis-ttj-sync",
  },
  {
    title: "Super Kontrakt Check",
    metric: "Noto'g'ri summa mosliklari",
    value: 23,
    severity: "yellow",
    reportPath: "/reports/super-kontrakt",
  },
  {
    title: "OTM Debt Aging",
    metric: "Maksimal kechikish kunlari",
    value: "365+",
    severity: "red",
    reportPath: "/reports/otm-debt-aging",
  },
  {
    title: "Unpaid Contracts",
    metric: "0 to'lovli tasdiqlangan shartnomalar",
    value: "4 312",
    severity: "yellow",
    reportPath: "/reports/unpaid-contracts",
  },
];

const severityConfig: Record<Severity, { bg: string; ring: string; icon: React.ReactNode; label: string }> = {
  red: {
    bg: "bg-red-500",
    ring: "ring-red-500/30",
    icon: <XCircle className="w-4 h-4 text-red-500" />,
    label: "Yuqori xavf",
  },
  yellow: {
    bg: "bg-yellow-400",
    ring: "ring-yellow-400/30",
    icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
    label: "O'rtacha xavf",
  },
  green: {
    bg: "bg-emerald-500",
    ring: "ring-emerald-500/30",
    icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
    label: "Normal",
  },
};

const overallSeverity = (rows: RiskRow[]): Severity => {
  if (rows.some((r) => r.severity === "red")) return "red";
  if (rows.some((r) => r.severity === "yellow")) return "yellow";
  return "green";
};

const RiskAnalysisCard = () => {
  const overall = overallSeverity(riskData);
  const overallCfg = severityConfig[overall];
  const redCount = riskData.filter((r) => r.severity === "red").length;
  const yellowCount = riskData.filter((r) => r.severity === "yellow").length;

  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-base">Risk Analysis · Health Check</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Billing tizimi holati</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
              overall === "red" ? "bg-red-500/10 text-red-600 dark:text-red-400" :
              overall === "yellow" ? "bg-yellow-400/10 text-yellow-600 dark:text-yellow-400" :
              "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            }`}>
              <span className={`w-2 h-2 rounded-full ${overallCfg.bg} animate-pulse`} />
              {redCount > 0 ? `${redCount} xavfli` : yellowCount > 0 ? `${yellowCount} ogohlantirish` : "Hammasi yaxshi"}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-1">
        {riskData.map((row, i) => {
          const cfg = severityConfig[row.severity];
          return (
            <div
              key={row.title}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              {/* Signal light */}
              <div className="flex-shrink-0">
                <div className={`w-3 h-3 rounded-full ${cfg.bg} ring-4 ${cfg.ring}`} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{row.title}</span>
                  <span className="hidden sm:inline text-xs text-muted-foreground">·</span>
                  <span className="hidden sm:inline text-xs text-muted-foreground truncate">{row.metric}</span>
                </div>
              </div>

              {/* Value */}
              <div className="flex-shrink-0 text-right">
                <span className={`text-sm font-bold tabular-nums ${
                  row.severity === "red" ? "text-red-600 dark:text-red-400" :
                  row.severity === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                  "text-emerald-600 dark:text-emerald-400"
                }`}>
                  {row.value}
                </span>
              </div>

              {/* Action */}
              <Button
                variant="ghost"
                size="sm"
                className="flex-shrink-0 h-7 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => window.open(row.reportPath, "_self")}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Hisobot
              </Button>
            </div>
          );
        })}

        {/* Footer summary */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-border">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Activity className="w-3.5 h-3.5" />
            <span>Oxirgi yangilanish: bugun, 09:30</span>
          </div>
          <div className="flex gap-3">
            {(["red", "yellow", "green"] as Severity[]).map((s) => {
              const count = riskData.filter((r) => r.severity === s).length;
              return (
                <div key={s} className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className={`w-2 h-2 rounded-full ${severityConfig[s].bg}`} />
                  {count}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAnalysisCard;
