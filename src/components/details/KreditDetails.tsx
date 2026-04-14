import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import UnreviewedApplications from "@/components/UnreviewedApplications";
import AnimatedStatsGrid from "@/components/AnimatedStatsGrid";
import AnimatedProgressCard from "@/components/AnimatedProgressCard";
import { FileText, CreditCard } from "lucide-react";
import { applyOtmToStr, applyOtmFactor, scaleChartData } from "@/data/otmData";

const baseMonthlyData = [
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

const baseStats = [
  { label: "Arizalar soni", value: "142 850", icon: FileText, color: "hsl(270, 70%, 55%)", trend: "up" as const, trendValue: "+5.1%" },
  { label: "Shartnomalar", value: "128 740", icon: CreditCard, color: "hsl(270, 70%, 55%)", trend: "up" as const, trendValue: "+3.7%" },
  { label: "Umumiy shartnoma summasi", value: "4 750 mlrd", icon: CreditCard, color: "hsl(217, 91%, 60%)", trend: "up" as const, trendValue: "+6.3%" },
];

const KreditDetails = ({ selectedOtm = "all" }: { selectedOtm?: string }) => {
  const stats = useMemo(() => baseStats.map(s => ({ ...s, value: applyOtmToStr(s.value, selectedOtm) })), [selectedOtm]);
  const monthlyData = useMemo(() => scaleChartData(baseMonthlyData, selectedOtm, ["tolangan"]), [selectedOtm]);
  const totalSum = applyOtmFactor(4750, selectedOtm);
  const paidSum = applyOtmFactor(3210, selectedOtm);

  return (
    <div className="space-y-6">
      <AnimatedStatsGrid stats={stats} key={selectedOtm} />
      <AnimatedProgressCard totalSum={totalSum} paidSum={paidSum} formatValue={(v) => `${v.toLocaleString()} mlrd`} key={`prog-${selectedOtm}`} />
      <div className="rounded-xl p-5 border border-border bg-card">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Oy kesimida to'langan summa</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(214, 32%, 91%)", fontSize: "12px" }} formatter={(v: number) => [`${v} mlrd`, "To'langan"]} />
            <Line type="monotone" dataKey="tolangan" name="To'langan" stroke="hsl(270, 70%, 55%)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <UnreviewedApplications />
    </div>
  );
};

export default KreditDetails;
