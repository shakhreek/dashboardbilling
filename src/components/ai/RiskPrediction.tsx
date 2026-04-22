import { useEffect, useState } from "react";
import { Brain, RefreshCw, ShieldAlert, ShieldCheck, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { callAiRisk } from "@/lib/aiAdvisor";
import { demoRiskStudents } from "@/data/aiAdvisorData";
import { toast } from "sonner";

interface RiskScore {
  id: string;
  name: string;
  score: number;
  level: "high" | "medium" | "low";
  reason: string;
}

const levelMeta: Record<string, { color: string; label: string; icon: typeof ShieldAlert }> = {
  high: { color: "text-rose-500", label: "Yuqori xavf", icon: ShieldAlert },
  medium: { color: "text-amber-500", label: "O'rta xavf", icon: Shield },
  low: { color: "text-emerald-500", label: "Past xavf", icon: ShieldCheck },
};

const RiskPrediction = () => {
  const [risks, setRisks] = useState<RiskScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await callAiRisk(demoRiskStudents);
      if (data.error) {
        setError(data.error);
        toast.error(data.error);
      } else {
        const sorted = (data.risks ?? []).sort((a, b) => b.score - a.score);
        setRisks(sorted);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Bashorat yuklashda xatolik";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const enriched = risks.map((r) => {
    const student = demoRiskStudents.find((s) => s.id === r.id);
    return { ...r, student };
  });

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Qarzdorlik Bashorati</h3>
            <p className="text-xs text-muted-foreground">AI har talaba uchun xavf ballini hisoblaydi</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-sm text-rose-500 bg-rose-500/10 p-3 rounded-md">{error}</div>
      )}

      {!loading && !error && enriched.length === 0 && (
        <div className="text-sm text-muted-foreground">Ma'lumot topilmadi</div>
      )}

      {!loading && enriched.length > 0 && (
        <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
          {enriched.map((r, i) => {
            const meta = levelMeta[r.level] ?? levelMeta.medium;
            const Icon = meta.icon;
            return (
              <div
                key={r.id ?? i}
                className="p-3 rounded-lg border border-border bg-card hover:bg-accent/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${meta.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-sm text-foreground truncate">
                          {r.name}
                        </h4>
                        {r.student && (
                          <span className="text-[11px] text-muted-foreground">
                            {r.student.faculty} · {r.student.course}-kurs
                          </span>
                        )}
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${meta.color} border-current`}
                      >
                        {meta.label} · {r.score}%
                      </Badge>
                    </div>
                    <Progress value={r.score} className="h-1.5 mb-2" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {r.reason}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default RiskPrediction;
