import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import UnreviewedApplications from "@/components/UnreviewedApplications";
import AnimatedStatsGrid from "@/components/AnimatedStatsGrid";
import { FileText, CheckCircle, Users, Banknote } from "lucide-react";
import { applyOtmToStr, scaleChartData } from "@/data/otmData";

const baseStats = [
  { label: "Arizalar soni", value: "27 800", icon: FileText, color: "hsl(239, 84%, 60%)", trend: "up" as const, trendValue: "+7.1%" },
  { label: "Tasdiqlangan", value: "23 400", icon: CheckCircle, color: "hsl(142, 71%, 45%)", trend: "up" as const, trendValue: "+5.4%" },
  { label: "Jami summa", value: "4 500 mlrd", icon: Banknote, color: "hsl(217, 91%, 55%)", trend: "up" as const, trendValue: "+11.2%" },
  { label: "Oluvchilar", value: "23 400", icon: Users, color: "hsl(270, 70%, 55%)", trend: "up" as const, trendValue: "+7.1%" },
];

const baseMonthlyData = [
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

const TTJSubsidiyaDetails = ({ selectedOtm = "all" }: { selectedOtm?: string }) => {
  const stats = useMemo(() => baseStats.map(s => ({ ...s, value: applyOtmToStr(s.value, selectedOtm) })), [selectedOtm]);
  const monthlyData = useMemo(() => scaleChartData(baseMonthlyData, selectedOtm, ["tolangan"]), [selectedOtm]);

  return (
    <div className="space-y-6">
      <AnimatedStatsGrid stats={stats} key={selectedOtm} />
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
