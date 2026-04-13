import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Beshlik", value: 980 },
  { name: "To'rtlik", value: 870 },
  { name: "Prezident stipendiyasi", value: 490 },
];

const COLORS = ["hsl(45, 90%, 50%)", "hsl(35, 80%, 55%)", "hsl(15, 85%, 50%)"];

const StipendiyaDetails = () => {
  const totalStudents = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl p-4 border border-border bg-amber-50">
          <p className="text-xs text-muted-foreground">Stipendiya oluvchilar</p>
          <p className="text-2xl font-bold" style={{ color: "hsl(35, 80%, 50%)" }}>{totalStudents.toLocaleString()}</p>
        </div>
        <div className="rounded-xl p-4 border border-border bg-amber-50">
          <p className="text-xs text-muted-foreground">Jami summa</p>
          <p className="text-xl font-bold" style={{ color: "hsl(35, 80%, 50%)" }}>3 600 mlrd</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 text-foreground">Turi bo'yicha taqsimot</h4>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[i] }} />
              <span className="text-foreground">{d.name}</span>
            </div>
            <span className="font-semibold text-foreground">{d.value.toLocaleString()} ta</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StipendiyaDetails;
