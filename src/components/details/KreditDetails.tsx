import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const paymentData = [
  { name: "To'langan", value: 65 },
  { name: "Jarayonda", value: 20 },
  { name: "Kechikkan", value: 15 },
];

const COLORS = ["hsl(142, 71%, 45%)", "hsl(217, 91%, 60%)", "hsl(0, 70%, 55%)"];

const KreditDetails = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl p-4 border border-border bg-purple-50">
          <p className="text-xs text-muted-foreground">Arizalar soni</p>
          <p className="text-2xl font-bold" style={{ color: "hsl(270, 70%, 55%)" }}>142 850</p>
        </div>
        <div className="rounded-xl p-4 border border-border bg-purple-50">
          <p className="text-xs text-muted-foreground">Shartnomalar</p>
          <p className="text-2xl font-bold" style={{ color: "hsl(270, 70%, 55%)" }}>128 740</p>
        </div>
        <div className="rounded-xl p-4 border border-border bg-green-50">
          <p className="text-xs text-muted-foreground">To'langan summa</p>
          <p className="text-xl font-bold" style={{ color: "hsl(142, 71%, 45%)" }}>3 210 mlrd</p>
        </div>
        <div className="rounded-xl p-4 border border-border bg-red-50">
          <p className="text-xs text-muted-foreground">Qarzdorlik</p>
          <p className="text-xl font-bold" style={{ color: "hsl(0, 70%, 55%)" }}>1 540 mlrd</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 text-foreground">To'lov holati taqsimoti</h4>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={paymentData} cx="50%" cy="50%" outerRadius={100} dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {paymentData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KreditDetails;
