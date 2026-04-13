import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import UnreviewedApplications from "@/components/UnreviewedApplications";
import { FileText, CheckCircle, Users, Banknote } from "lucide-react";

const stats = [
  { label: "Arizalar soni", value: "27 800", icon: FileText, color: "hsl(239, 84%, 60%)" },
  { label: "Tasdiqlangan", value: "23 400", icon: CheckCircle, color: "hsl(142, 71%, 45%)" },
  { label: "Jami summa", value: "4 500 mlrd", icon: Banknote, color: "hsl(217, 91%, 55%)" },
  { label: "Oluvchilar", value: "23 400", icon: Users, color: "hsl(270, 70%, 55%)" },
];

const funnelData = [
  { stage: "Yangi arizalar", count: 2780, fill: "hsl(239, 84%, 67%)" },
  { stage: "Ko'rib chiqilmoqda", count: 2540, fill: "hsl(217, 91%, 60%)" },
  { stage: "Tasdiqlangan", count: 2340, fill: "hsl(142, 71%, 45%)" },
  { stage: "To'langan", count: 2100, fill: "hsl(45, 90%, 50%)" },
];

const monthlyData = [
  { month: "Sen", tolangan: 420 },
  { month: "Okt", tolangan: 390 },
  { month: "Noy", tolangan: 450 },
  { month: "Dek", tolangan: 380 },
  { month: "Yan", tolangan: 470 },
  { month: "Fev", tolangan: 510 },
  { month: "Mar", tolangan: 440 },
  { month: "Apr", tolangan: 400 },
  { month: "May", tolangan: 360 },
  { month: "Iyun", tolangan: 310 },
];

const TTJSubsidiyaDetails = () => {
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

      {/* Funnel chart */}
      <div className="rounded-xl p-5 border border-border bg-card">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Ariza holati</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={funnelData} layout="vertical" barSize={28} margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis dataKey="stage" type="category" tick={{ fontSize: 11 }} width={140} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(214, 32%, 91%)", fontSize: "12px" }} />
            <Bar dataKey="count" name="Soni" radius={[0, 6, 6, 0]}>
              {funnelData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly line chart */}
      <div className="rounded-xl p-5 border border-border bg-card">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Oy kesimida to'langan summa (mln)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(214, 32%, 91%)", fontSize: "12px" }} formatter={(v: number) => [`${v} mln`, "To'langan"]} />
            <Line type="monotone" dataKey="tolangan" name="To'langan" stroke="hsl(239, 84%, 60%)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <UnreviewedApplications />
    </div>
  );
};

export default TTJSubsidiyaDetails;
