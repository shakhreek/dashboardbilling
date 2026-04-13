import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { stipendiyaDonutData } from "@/data/dashboardData";

const StipendiyaDetails = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">Stipendiya turi bo'yicha taqsimot</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={stipendiyaDonutData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
            {stipendiyaDonutData.map((entry, i) => (
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

export default StipendiyaDetails;
