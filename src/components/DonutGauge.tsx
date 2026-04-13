import { useState } from "react";
import { Clock, CheckCircle2, AlertTriangle, XCircle, ArrowUpRight } from "lucide-react";

interface ActivityItem {
  id: number;
  module: string;
  action: string;
  time: string;
  status: "success" | "warning" | "error" | "pending";
  amount?: string;
}

const activities: ActivityItem[] = [
  { id: 1, module: "Kontrakt", action: "Yangi shartnoma tasdiqlandi", time: "2 daqiqa oldin", status: "success", amount: "12.5 mln" },
  { id: 2, module: "Kredit", action: "To'lov kechiktirildi", time: "15 daqiqa oldin", status: "warning", amount: "3.2 mln" },
  { id: 3, module: "TTJ", action: "Joy ajratildi — 3-bino", time: "32 daqiqa oldin", status: "success" },
  { id: 4, module: "Stipendiya", action: "Beshlik stipendiya tayinlandi", time: "1 soat oldin", status: "success", amount: "1.8 mln" },
  { id: 5, module: "Ijara", action: "Ariza rad etildi", time: "2 soat oldin", status: "error" },
  { id: 6, module: "Subsidiya", action: "To'lov jarayonda", time: "3 soat oldin", status: "pending", amount: "8.4 mln" },
  { id: 7, module: "Kontrakt", action: "Fakultet hisoboti yuklandi", time: "4 soat oldin", status: "success" },
  { id: 8, module: "Kredit", action: "Yangi ariza keldi", time: "5 soat oldin", status: "pending", amount: "5.0 mln" },
];

const statusConfig = {
  success: { icon: CheckCircle2, color: "hsl(142, 71%, 45%)", bg: "bg-emerald-500/10", label: "Bajarildi" },
  warning: { icon: AlertTriangle, color: "hsl(45, 90%, 50%)", bg: "bg-amber-500/10", label: "Ogohlantirish" },
  error: { icon: XCircle, color: "hsl(350, 70%, 55%)", bg: "bg-rose-500/10", label: "Rad etildi" },
  pending: { icon: Clock, color: "hsl(217, 91%, 60%)", bg: "bg-blue-500/10", label: "Jarayonda" },
};

const moduleColors: Record<string, string> = {
  "Kontrakt": "hsl(217, 91%, 60%)",
  "Kredit": "hsl(270, 70%, 55%)",
  "TTJ": "hsl(142, 71%, 45%)",
  "Stipendiya": "hsl(45, 90%, 50%)",
  "Ijara": "hsl(350, 70%, 55%)",
  "Subsidiya": "hsl(239, 84%, 60%)",
};

const DonutGauge = () => {
  const [filter, setFilter] = useState<string>("all");
  const filters = ["all", "success", "warning", "error", "pending"];
  const filterLabels: Record<string, string> = {
    all: "Barchasi", success: "Bajarildi", warning: "Ogohlantirish", error: "Xatolik", pending: "Jarayonda"
  };

  const filtered = filter === "all" ? activities : activities.filter(a => a.status === filter);

  return (
    <div className="bg-card rounded-xl border border-border p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">So'nggi faoliyat</h3>
        </div>
        <span className="text-xs text-muted-foreground">{activities.length} ta</span>
      </div>

      {/* Filter pills */}
      <div className="flex gap-1 mb-4 flex-wrap">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              filter === f ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      {/* Activity list */}
      <div className="flex-1 space-y-1 overflow-y-auto max-h-[280px] pr-1">
        {filtered.map((item) => {
          const config = statusConfig[item.status];
          const StatusIcon = config.icon;
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group"
            >
              <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <StatusIcon className="w-4 h-4" style={{ color: config.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-xs font-semibold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: `${moduleColors[item.module]}15`, color: moduleColors[item.module] }}
                  >
                    {item.module}
                  </span>
                  {item.amount && (
                    <span className="text-xs font-medium text-foreground">{item.amount}</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.action}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">{item.time}</p>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonutGauge;
