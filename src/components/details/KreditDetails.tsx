import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import UnreviewedApplications from "@/components/UnreviewedApplications";
import { FileText, CheckCircle, AlertTriangle, CreditCard } from "lucide-react";

const monthlyData = [
  { month: "Sen", tolangan: 280 },
  { month: "Okt", tolangan: 410 },
  { month: "Noy", tolangan: 370 },
  { month: "Dek", tolangan: 320 },
  { month: "Yan", tolangan: 450 },
  { month: "Fev", tolangan: 520 },
  { month: "Mar", tolangan: 390 },
  { month: "Apr", tolangan: 340 },
  { month: "May", tolangan: 210 },
  { month: "Iyun", tolangan: 120 },
];

const stats = [
  { label: "Arizalar soni", value: "142 850", icon: FileText, color: "hsl(270, 70%, 55%)" },
  { label: "Shartnomalar", value: "128 740", icon: CreditCard, color: "hsl(270, 70%, 55%)" },
  { label: "To'langan summa", value: "3 210 mlrd", icon: CheckCircle, color: "hsl(142, 71%, 45%)" },
  { label: "Qarzdorlik", value: "1 540 mlrd", icon: AlertTriangle, color: "hsl(350, 70%, 55%)" },
];

const KreditDetails = () => {
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

      {/* Line chart */}
      <div className="rounded-xl p-5 border border-border bg-card">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Oy kesimida to'langan summa</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid hsl(214, 32%, 91%)",
                fontSize: "12px",
              }}
              formatter={(v: number) => [`${v} mlrd`, "To'langan"]}
            />
            <Line type="monotone" dataKey="tolangan" name="To'langan" stroke="hsl(270, 70%, 55%)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <UnreviewedApplications />
    </div>
  );
};

export default KreditDetails;
