import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import AnimatedStatsGrid from "@/components/AnimatedStatsGrid";
import { GraduationCap, Award, Users, Banknote } from "lucide-react";

const stats = [
  { label: "Stipendiya oluvchilar", value: "2 340", icon: Users, color: "hsl(45, 90%, 50%)" },
  { label: "Jami summa", value: "3 600 mlrd", icon: Banknote, color: "hsl(142, 71%, 45%)" },
  { label: "Prezident stipendiyasi", value: "490", icon: Award, color: "hsl(15, 85%, 50%)" },
  { label: "O'rtacha stipendiya", value: "1.54 mln", icon: GraduationCap, color: "hsl(217, 91%, 55%)" },
];

const monthlyData = [
  { month: "Sen", beshlik: 110, tortlik: 95, prezident: 55 },
  { month: "Okt", beshlik: 115, tortlik: 100, prezident: 55 },
  { month: "Noy", beshlik: 108, tortlik: 92, prezident: 52 },
  { month: "Dek", beshlik: 120, tortlik: 105, prezident: 58 },
  { month: "Yan", beshlik: 125, tortlik: 110, prezident: 60 },
  { month: "Fev", beshlik: 118, tortlik: 102, prezident: 56 },
  { month: "Mar", beshlik: 112, tortlik: 98, prezident: 54 },
  { month: "Apr", beshlik: 105, tortlik: 90, prezident: 50 },
  { month: "May", beshlik: 100, tortlik: 85, prezident: 48 },
  { month: "Iyun", beshlik: 90, tortlik: 78, prezident: 45 },
];

const typeBreakdown = [
  { name: "Beshlik", value: 980, color: "hsl(45, 90%, 50%)" },
  { name: "To'rtlik", value: 870, color: "hsl(35, 80%, 55%)" },
  { name: "Prezident stipendiyasi", value: 490, color: "hsl(15, 85%, 50%)" },
];

const StipendiyaDetails = () => {
  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <AnimatedStatsGrid stats={stats} />

      {/* Type breakdown */}
      <div className="rounded-xl p-5 border border-border bg-card">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Turi bo'yicha taqsimot</h4>
        <div className="space-y-3">
          {typeBreakdown.map((d) => {
            const total = typeBreakdown.reduce((s, t) => s + t.value, 0);
            const pct = Math.round((d.value / total) * 100);
            return (
              <div key={d.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: d.color }} />
                    <span className="text-foreground">{d.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{d.value.toLocaleString()} ta ({pct}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: d.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly chart */}
      <div className="rounded-xl p-5 border border-border bg-card">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Oy kesimida stipendiya to'lovlari (mln)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid hsl(214, 32%, 91%)", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="beshlik" name="Beshlik" fill="hsl(45, 90%, 50%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="tortlik" name="To'rtlik" fill="hsl(35, 80%, 55%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="prezident" name="Prezident" fill="hsl(15, 85%, 50%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StipendiyaDetails;
