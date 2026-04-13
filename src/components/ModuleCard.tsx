import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CreditCard, Building2, Award, Home, Landmark } from "lucide-react";
import type { ModuleData } from "@/data/dashboardData";

const iconMap: Record<string, React.ElementType> = {
  FileText, CreditCard, Building2, Award, Home, Landmark,
};

const themeMap: Record<string, { bg: string; border: string; icon: string; button: string; badge: string }> = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600", button: "bg-blue-600 hover:bg-blue-700 text-white", badge: "bg-blue-100 text-blue-700" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", icon: "text-purple-600", button: "bg-purple-600 hover:bg-purple-700 text-white", badge: "bg-purple-100 text-purple-700" },
  green: { bg: "bg-green-50", border: "border-green-200", icon: "text-green-600", button: "bg-green-600 hover:bg-green-700 text-white", badge: "bg-green-100 text-green-700" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-600", button: "bg-amber-600 hover:bg-amber-700 text-white", badge: "bg-amber-100 text-amber-700" },
  rose: { bg: "bg-rose-50", border: "border-rose-200", icon: "text-rose-600", button: "bg-rose-600 hover:bg-rose-700 text-white", badge: "bg-rose-100 text-rose-700" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", icon: "text-indigo-600", button: "bg-indigo-600 hover:bg-indigo-700 text-white", badge: "bg-indigo-100 text-indigo-700" },
};

interface ModuleCardProps {
  module: ModuleData;
  onViewDetails: () => void;
}

const ModuleCard = ({ module, onViewDetails }: ModuleCardProps) => {
  const Icon = iconMap[module.icon] || FileText;
  const t = themeMap[module.theme] || themeMap.blue;

  return (
    <Card className={`${t.border} border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}>
      <CardHeader className={`${t.bg} rounded-t-lg pb-3`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${t.badge}`}>
            <Icon className={`h-5 w-5 ${t.icon}`} />
          </div>
          <CardTitle className="text-lg">{module.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {module.metrics.map((m) => (
          <div key={m.label} className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{m.label}</span>
            <span className="font-semibold">{typeof m.value === "number" ? m.value.toLocaleString("uz-UZ") : m.value}</span>
          </div>
        ))}
        <Button className={`w-full mt-2 ${t.button}`} onClick={onViewDetails}>
          Batafsil
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;
