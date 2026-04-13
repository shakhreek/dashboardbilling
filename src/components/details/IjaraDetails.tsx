import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, Banknote, Users, CheckCircle } from "lucide-react";

const stats = [
  { label: "Arizalar soni", value: "18 900", icon: FileText, color: "hsl(350, 70%, 55%)" },
  { label: "Tasdiqlangan", value: "14 500", icon: CheckCircle, color: "hsl(142, 71%, 45%)" },
  { label: "Jami summa", value: "2 100 mlrd", icon: Banknote, color: "hsl(217, 91%, 55%)" },
  { label: "Oluvchilar", value: "14 500", icon: Users, color: "hsl(270, 70%, 55%)" },
];

const monthlyData = [
  { month: "Sen", tolangan: 230 },
  { month: "Okt", tolangan: 215 },
  { month: "Noy", tolangan: 205 },
  { month: "Dek", tolangan: 225 },
  { month: "Yan", tolangan: 180 },
  { month: "Fev", tolangan: 195 },
  { month: "Mar", tolangan: 210 },
  { month: "Apr", tolangan: 175 },
  { month: "May", tolangan: 220 },
  { month: "Iyun", tolangan: 190 },
];

const regionData = [
  { name: "Toshkent sh.", value: 3200 },
  { name: "Samarqand", value: 2100 },
  { name: "Buxoro", value: 1800 },
  { name: "Farg'ona", value: 1650 },
  { name: "Andijon", value: 1420 },
];

const IjaraDetails = () => {
  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl p-4 border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                  <Icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Monthly payments */}
      <div className="rounded-xl p-5 border border-border bg-card">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Oy kesimida subsidiya to'lovlari (mln)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(214, 32%, 91%)", fontSize: "12px" }} formatter={(v: number) => [`${v} mln`, "To'langan"]} />
            <Line type="monotone" dataKey="tolangan" name="To'langan" stroke="hsl(350, 70%, 55%)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Region breakdown */}
      <div className="rounded-xl p-5 border border-border bg-card">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Hududlar bo'yicha oluvchilar soni</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={regionData} layout="vertical" margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(214, 32%, 91%)", fontSize: "12px" }} />
            <Bar dataKey="value" name="Oluvchilar" fill="hsl(350, 70%, 60%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IjaraDetails;
