import UnreviewedApplications from "@/components/UnreviewedApplications";
import AnimatedStatsGrid from "@/components/AnimatedStatsGrid";
import AnimatedProgressCard from "@/components/AnimatedProgressCard";
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
  { label: "Kontraktda o'qiyotgan talabalar soni", value: "787 674", icon: TrendingUp, color: "hsl(217, 91%, 55%)" },
];

const KontraktDetails = () => {
  const totalSum = 14440;
  const paidSum = 7253;
  

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <AnimatedStatsGrid stats={stats} />

      <AnimatedProgressCard totalSum={totalSum} paidSum={paidSum} formatValue={(v) => v.toLocaleString()} />

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
