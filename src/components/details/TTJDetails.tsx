import { Progress } from "@/components/ui/progress";
import { ttjOccupancy } from "@/data/dashboardData";

const TTJDetails = () => {
  const { total, occupied } = ttjOccupancy;
  const pct = Math.round((occupied / total) * 100);
  const free = total - occupied;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Yotoqxona bandligi</h4>
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>Band: {occupied.toLocaleString()}</span>
          <span>Jami: {total.toLocaleString()}</span>
        </div>
        <Progress value={pct} className="h-4" />
        <p className="text-xs text-muted-foreground mt-1">{pct}% band — {free.toLocaleString()} bo'sh joy</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{occupied.toLocaleString()}</p>
          <p className="text-xs text-green-600">Band joylar</p>
        </div>
        <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-700">{free.toLocaleString()}</p>
          <p className="text-xs text-gray-600">Bo'sh joylar</p>
        </div>
      </div>
    </div>
  );
};

export default TTJDetails;
