import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { kreditPieData } from "@/data/dashboardData";

const KreditDetails = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">To'lov holati taqsimoti</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={kreditPieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            {kreditPieData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KreditDetails;
