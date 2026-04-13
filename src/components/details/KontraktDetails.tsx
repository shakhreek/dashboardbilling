import { Progress } from "@/components/ui/progress";
import UnreviewedApplications from "@/components/UnreviewedApplications";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";

const monthlyData = [
  { month: "Sen", tolangan: 1200 },
  { month: "Okt", tolangan: 2400 },
  { month: "Noy", tolangan: 2100 },
  { month: "Dek", tolangan: 1700 },
  { month: "Yan", tolangan: 2900 },
  { month: "Fev", tolangan: 3200 },
  { month: "Mar", tolangan: 2300 },
  { month: "Apr", tolangan: 1800 },
  { month: "May", tolangan: 1100 },
  { month: "Iyun", tolangan: 700 },
];


const stats = [
  { label: "Jami shartnomalar", value: "787 674", icon: FileText, color: "hsl(217, 91%, 55%)" },
  { label: "Tasdiqlangan", value: "724 510", icon: CheckCircle, color: "hsl(142, 71%, 45%)" },
  { label: "Qarzdorlik", value: "7 187 mlrd", icon: AlertTriangle, color: "hsl(350, 70%, 55%)" },
  { label: "O'sish", value: "+12%", icon: TrendingUp, color: "hsl(217, 91%, 55%)" },
];

const KontraktDetails = () => {
  const totalSum = 14440;
  const paidSum = 7253;
  const pct = Math.round((paidSum / totalSum) * 100);

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

      {/* Progress bar */}
      <div className="rounded-xl p-5 border border-border bg-card">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-foreground">To'lov holati</span>
          <span className="font-semibold text-foreground">{pct}%</span>
        </div>
        <Progress value={pct} className="h-3" />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>To'langan: {paidSum.toLocaleString()} mlrd so'm</span>
          <span>Jami: {totalSum.toLocaleString()} mlrd so'm</span>
        </div>
      </div>

      {/* Monthly chart */}
      <div className="rounded-xl p-5 border border-border bg-card">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Oy kesimida to'lovlar</h4>
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
            <Line type="monotone" dataKey="tolangan" name="To'langan" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <UnreviewedApplications />
    </div>
  );
};

export default KontraktDetails;
