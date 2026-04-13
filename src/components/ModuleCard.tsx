import { FileText, CreditCard, Building2, Award, Home, Landmark, TrendingUp, TrendingDown, Users, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ModuleCardData {
  id: string;
  title: string;
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
  metrics: { label: string; value: string; trend?: "up" | "down"; trendValue?: string }[];
}

export const moduleCards: ModuleCardData[] = [
  {
    id: "To'lov kontrakt",
    title: "Kontrakt",
    icon: FileText,
    gradient: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-100",
    metrics: [
      { label: "Arizalar soni", value: "12 450", trend: "up", trendValue: "+3.2%" },
      { label: "Tasdiqlangan shartnomalar", value: "11 230" },
      { label: "Jami shartnoma summasi", value: "14 440 mlrd" },
      { label: "To'langan summa", value: "7 253 mlrd", trend: "up", trendValue: "+12%" },
    ],
  },
  {
    id: "Kredit modul",
    title: "Kredit modul",
    icon: CreditCard,
    gradient: "from-purple-500 to-purple-600",
    iconBg: "bg-purple-100",
    metrics: [
      { label: "Arizalar soni", value: "142 850", trend: "up", trendValue: "+5.1%" },
      { label: "Shartnomalar soni", value: "128 740" },
      { label: "Shartnoma summasi", value: "3 210 mlrd" },
      { label: "To'lovlar", value: "1 670 mlrd", trend: "down", trendValue: "-2.4%" },
    ],
  },
  {
    id: "TTJ",
    title: "TTJ (Talabalar turar joyi)",
    icon: Building2,
    gradient: "from-emerald-500 to-emerald-600",
    iconBg: "bg-emerald-100",
    metrics: [
      { label: "Arizalar soni", value: "5 670" },
      { label: "Shartnomalar soni", value: "4 890" },
      { label: "Shartnoma summasi", value: "890 mlrd" },
      { label: "TTJda turgan talabalar", value: "4 520", trend: "up", trendValue: "+8%" },
    ],
  },
  {
    id: "Stipendiya",
    title: "Stipendiya",
    icon: Award,
    gradient: "from-amber-500 to-amber-600",
    iconBg: "bg-amber-100",
    metrics: [
      { label: "Stipendiya oluvchilar", value: "2 340", trend: "up", trendValue: "+4.5%" },
      { label: "Jami to'lanadigan summa", value: "3 600 mlrd" },
    ],
  },
  {
    id: "Ijara",
    title: "Ijara subsidiyasi",
    icon: Home,
    gradient: "from-rose-500 to-rose-600",
    iconBg: "bg-rose-100",
    metrics: [
      { label: "Arizalar soni", value: "18 900" },
      { label: "Jami to'lanadigan summa", value: "2 100 mlrd" },
      { label: "Subsidiya oluvchilar", value: "14 500", trend: "up", trendValue: "+6.3%" },
    ],
  },
  {
    id: "TTJ Subsidiya",
    title: "TTJ Subsidiya",
    icon: Landmark,
    gradient: "from-indigo-500 to-indigo-600",
    iconBg: "bg-indigo-100",
    metrics: [
      { label: "Arizalar soni", value: "27 800" },
      { label: "To'lanadigan summa", value: "4 500 mlrd" },
      { label: "Subsidiya oluvchilar", value: "23 400", trend: "up", trendValue: "+7.1%" },
    ],
  },
];

interface Props {
  data: ModuleCardData;
  onViewDetails: () => void;
}

const ModuleCard = ({ data, onViewDetails }: Props) => {
  const Icon = data.icon;

  return (
    <Card className="overflow-hidden border border-border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group cursor-pointer" onClick={onViewDetails}>
      {/* Colored top strip */}
      <div className={`h-1.5 bg-gradient-to-r ${data.gradient}`} />

      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${data.iconBg} flex items-center justify-center`}>
              <Icon className="w-5 h-5" style={{ color: `var(--module-icon)` }} />
            </div>
            <h3 className="font-semibold text-foreground text-sm">{data.title}</h3>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          {data.metrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{m.label}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-foreground">{m.value}</span>
                {m.trend && (
                  <span className={`flex items-center text-xs font-medium ${m.trend === "up" ? "text-emerald-600" : "text-rose-500"}`}>
                    {m.trend === "up" ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {m.trendValue}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <Button
          variant="outline"
          size="sm"
          className={`w-full mt-4 text-xs group-hover:bg-gradient-to-r group-hover:${data.gradient} group-hover:text-white group-hover:border-transparent transition-all`}
          onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
        >
          Batafsil ko'rish
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;
