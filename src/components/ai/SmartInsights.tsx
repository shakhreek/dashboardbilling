import { useEffect, useState } from "react";
import { Sparkles, AlertTriangle, TrendingUp, Info, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { callAiInsights } from "@/lib/aiAdvisor";
import { financialSnapshot } from "@/data/aiAdvisorData";
import { toast } from "sonner";

interface Insight {
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  category: string;
}

const severityStyles: Record<string, { bg: string; text: string; icon: typeof AlertTriangle }> = {
  high: { bg: "bg-rose-500/10 border-rose-500/30", text: "text-rose-500", icon: AlertTriangle },
  medium: { bg: "bg-amber-500/10 border-amber-500/30", text: "text-amber-500", icon: TrendingUp },
  low: { bg: "bg-blue-500/10 border-blue-500/30", text: "text-blue-500", icon: Info },
};

const SmartInsights = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await callAiInsights(financialSnapshot);
      if (data.error) {
        setError(data.error);
        toast.error(data.error);
      } else {
        setInsights(data.insights ?? []);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Tahlil yuklashda xatolik";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Smart Tavsiyalar</h3>
            <p className="text-xs text-muted-foreground">Joriy ma'lumotlar asosida real vaqtda</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-sm text-rose-500 bg-rose-500/10 p-3 rounded-md">{error}</div>
      )}

      {!loading && !error && insights.length === 0 && (
        <div className="text-sm text-muted-foreground">Tavsiyalar topilmadi</div>
      )}

      {!loading && insights.length > 0 && (
        <div className="space-y-3">
          {insights.map((ins, i) => {
            const style = severityStyles[ins.severity] ?? severityStyles.low;
            const Icon = style.icon;
            return (
              <div
                key={i}
                className={`p-3 rounded-lg border ${style.bg} animate-fade-in`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${style.text}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-semibold text-sm text-foreground">{ins.title}</h4>
                      <Badge variant="outline" className="text-[10px] capitalize">
                        {ins.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {ins.description}
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

export default SmartInsights;
