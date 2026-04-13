import { useCountUp } from "@/hooks/useCountUp";
import type { LucideIcon } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

interface Props {
  stats: StatItem[];
}

const AnimatedStatCard = ({ stat, index }: { stat: StatItem; index: number }) => {
  const Icon = stat.icon;
  const animatedValue = useCountUp(stat.value, 1400, index * 150);

  return (
    <div className="rounded-xl p-4 border border-border bg-card animate-fade-in opacity-0" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
          <Icon className="w-4 h-4" style={{ color: stat.color }} />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground">{animatedValue}</p>
      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
    </div>
  );
};

const AnimatedStatsGrid = ({ stats }: Props) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <AnimatedStatCard key={s.label} stat={s} index={i} />
      ))}
    </div>
  );
};

export default AnimatedStatsGrid;
