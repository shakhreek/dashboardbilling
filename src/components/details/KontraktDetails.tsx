import { useMemo } from "react";
import UnreviewedApplications from "@/components/UnreviewedApplications";
import AnimatedStatsGrid from "@/components/AnimatedStatsGrid";
import AnimatedProgressCard from "@/components/AnimatedProgressCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { applyOtmToStr, applyOtmFactor, scaleChartData } from "@/data/otmData";

const baseMonthlyData = [
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

const baseStats = [
  { label: "Kontraktda o'qiydigan talabalar soni", value: "787 674", icon: TrendingUp, color: "hsl(217, 91%, 55%)", trend: "up" as const, trendValue: "+4.1%" },
  { label: "Jami shartnomalar", value: "1 022 696", icon: FileText, color: "hsl(217, 91%, 55%)", trend: "up" as const, trendValue: "+3.2%", subLabel: "Tasdiqlangan", subValue: "724 510" },
  { label: "Qarzdorlik", value: "7 187 mlrd", icon: AlertTriangle, color: "hsl(350, 70%, 55%)", trend: "down" as const, trendValue: "-1.5%" },
];

const KontraktDetails = ({ selectedOtm = "all" }: { selectedOtm?: string }) => {
  const stats = useMemo(() => baseStats.map(s => ({ ...s, value: applyOtmToStr(s.value, selectedOtm) })), [selectedOtm]);
  const monthlyData = useMemo(() => scaleChartData(baseMonthlyData, selectedOtm, ["tolangan"]), [selectedOtm]);
  const totalSum = applyOtmFactor(14440, selectedOtm);
  const paidSum = applyOtmFactor(7253, selectedOtm);

  return (
    <div className="space-y-6">
      <AnimatedStatsGrid stats={stats} key={selectedOtm} />
      <AnimatedProgressCard totalSum={totalSum} paidSum={paidSum} formatValue={(v) => v.toLocaleString()} key={`prog-${selectedOtm}`} />
      <div className="rounded-xl p-5 border border-border bg-card">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Oy kesimida to'lovlar</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(214, 32%, 91%)", fontSize: "12px" }} formatter={(v: number) => [`${v} mlrd`, "To'langan"]} />
            <Line type="monotone" dataKey="tolangan" name="To'langan" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <UnreviewedApplications />
    </div>
  );
};

export default KontraktDetails;
