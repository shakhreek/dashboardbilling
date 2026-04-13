import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { kontraktChartData } from "@/data/dashboardData";

const KontraktDetails = () => {
  const paid = 38.7;
  const total = 45.2;
  const pct = Math.round((paid / total) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">To'lov holati</h4>
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>To'langan: {paid} mlrd</span>
          <span>Jami: {total} mlrd</span>
        </div>
        <Progress value={pct} className="h-3" />
        <p className="text-xs text-muted-foreground mt-1">{pct}% to'langan</p>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Fakultetlar bo'yicha shartnomalar</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={kontraktChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="faculty" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="contracts" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KontraktDetails;
