import { BarChart3, FileText, HandCoins, CircleDollarSign, CheckCircle } from "lucide-react";
import type { StatCard as StatCardType } from "@/data/dashboardData";

const iconMap: Record<string, React.ElementType> = {
  BarChart3, FileText, HandCoins, CircleDollarSign, CheckCircle,
};

const colorMap: Record<string, string> = {
  purple: "hsl(270, 70%, 55%)",
  blue: "hsl(217, 91%, 60%)",
  rose: "hsl(350, 70%, 55%)",
  cyan: "hsl(190, 80%, 45%)",
  green: "hsl(142, 71%, 45%)",
};

interface Props {
  cards: StatCardType[];
}

const HeroBanner = ({ cards }: Props) => {
  return (
    <div
      className="rounded-xl p-6 mb-6"
      style={{
        background: "linear-gradient(135deg, hsl(217, 91%, 55%), hsl(230, 80%, 45%))",
      }}
    >
      <h2 className="text-xl font-bold mb-1" style={{ color: "white" }}>
        Moliyaviy ko'rsatkichlar bo'yicha statistika
      </h2>
      <p className="text-sm mb-5" style={{ color: "hsla(0, 0%, 100%, 0.7)" }}>billing.edu.uz</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {cards.map((card) => {
          const Icon = iconMap[card.icon] || FileText;
          return (
            <div
              key={card.label}
              className="bg-card rounded-xl p-4 flex items-center gap-3 shadow-sm"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${colorMap[card.color]}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: colorMap[card.color] }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground truncate">{card.label}</p>
                <p className="text-lg font-bold text-foreground leading-tight">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroBanner;
