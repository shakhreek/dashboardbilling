import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ttjSubsidiyaFunnelData } from "@/data/dashboardData";

const TTJSubsidiyaDetails = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">Ariza holati (Funnel)</h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={ttjSubsidiyaFunnelData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis dataKey="stage" type="category" tick={{ fontSize: 11 }} width={120} />
          <Tooltip />
          <Bar dataKey="count" fill="hsl(239, 84%, 67%)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TTJSubsidiyaDetails;
