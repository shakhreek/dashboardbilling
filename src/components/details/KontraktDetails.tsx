import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FileText, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";

const monthlyData = [
  { month: "Sen", shartnoma: 2800, tolangan: 1200 },
  { month: "Okt", shartnoma: 3100, tolangan: 2400 },
  { month: "Noy", shartnoma: 2600, tolangan: 2100 },
  { month: "Dek", shartnoma: 1900, tolangan: 1700 },
  { month: "Yan", shartnoma: 3400, tolangan: 2900 },
  { month: "Fev", shartnoma: 3800, tolangan: 3200 },
  { month: "Mar", shartnoma: 2700, tolangan: 2300 },
  { month: "Apr", shartnoma: 2200, tolangan: 1800 },
  { month: "May", shartnoma: 1500, tolangan: 1100 },
  { month: "Iyun", shartnoma: 900, tolangan: 700 },
];

const topDaromad = [
  { name: "Toshkent davlat iqtisodiyot universiteti", value: 480 },
  { name: "Toshkent tibbiyot universiteti", value: 420 },
  { name: "Samarqand davlat tibbiyot universiteti", value: 310 },
  { name: "Toshkent davlat yuridik universiteti", value: 250 },
  { name: "Mirzo Ulug'bek nomidagi O'zbekiston milliy universiteti", value: 220 },
];

const topQarzdorlik = [
  { name: "Toshkent davlat iqtisodiyot universiteti", value: 195 },
  { name: "Toshkent tibbiyot universiteti", value: 160 },
  { name: "Andijon davlat tibbiyot instituti", value: 130 },
  { name: "Mirzo Ulug'bek nomidagi O'zbekiston milliy universiteti", value: 115 },
  { name: "Farg'ona davlat universiteti", value: 105 },
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
          <BarChart data={monthlyData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid hsl(214, 32%, 91%)",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="shartnoma" name="Shartnoma summasi" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="tolangan" name="To'langan" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KontraktDetails;
