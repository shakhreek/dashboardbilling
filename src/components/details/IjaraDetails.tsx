import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ijaraLineData } from "@/data/dashboardData";

const IjaraDetails = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">Oylik subsidiya to'lovlari (mln so'm)</h4>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={ijaraLineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="hsl(350, 70%, 55%)" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IjaraDetails;
