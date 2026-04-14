import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import UzbekistanMap from "@/components/UzbekistanMap";
import UnreviewedApplications from "@/components/UnreviewedApplications";
import AnimatedStatsGrid from "@/components/AnimatedStatsGrid";
import { FileText, Banknote, Users, CheckCircle } from "lucide-react";
import { applyOtmToStr, scaleChartData } from "@/data/otmData";

const baseStats = [
  { label: "Shartnomalar soni", value: "18 900", icon: FileText, color: "hsl(350, 70%, 55%)", trend: "up" as const, trendValue: "+6.3%" },
  { label: "Tasdiqlangan", value: "14 500", icon: CheckCircle, color: "hsl(142, 71%, 45%)", trend: "up" as const, trendValue: "+5.8%" },
  { label: "Jami summa", value: "2 100 mlrd", icon: Banknote, color: "hsl(217, 91%, 55%)", trend: "up" as const, trendValue: "+9.4%" },
  { label: "Oluvchilar", value: "14 500", icon: Users, color: "hsl(270, 70%, 55%)", trend: "up" as const, trendValue: "+6.3%" },
];

const baseMonthlyData = [
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
  { id: "toshkent_sh", name: "Toshkent sh.", value: 3200 },
  { id: "samarqand", name: "Samarqand", value: 2100 },
  { id: "buxoro", name: "Buxoro", value: 1800 },
  { id: "fergana", name: "Farg'ona", value: 1650 },
  { id: "andijon", name: "Andijon", value: 1420 },
  { id: "namangan", name: "Namangan", value: 1280 },
  { id: "qashqadaryo", name: "Qashqadaryo", value: 1100 },
  { id: "surxondaryo", name: "Surxondaryo", value: 890 },
  { id: "toshkent", name: "Toshkent vil.", value: 960 },
  { id: "xorazm", name: "Xorazm", value: 750 },
  { id: "navoiy", name: "Navoiy", value: 620 },
  { id: "jizzax", name: "Jizzax", value: 540 },
  { id: "sirdaryo", name: "Sirdaryo", value: 430 },
  { id: "karakalpakstan", name: "Qoraqalpog'iston", value: 360 },
];

const IjaraDetails = ({ selectedOtm = "all" }: { selectedOtm?: string }) => {
  const stats = useMemo(() => baseStats.map(s => ({ ...s, value: applyOtmToStr(s.value, selectedOtm) })), [selectedOtm]);
  const monthlyData = useMemo(() => scaleChartData(baseMonthlyData, selectedOtm, ["tolangan"]), [selectedOtm]);

  return (
    <div className="space-y-6">
      <AnimatedStatsGrid stats={stats} key={selectedOtm} />
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
      <div className="rounded-xl p-5 border border-border bg-card">
        <UzbekistanMap data={regionData} title="Hududlar bo'yicha oluvchilar soni" valueLabel="Oluvchilar" />
      </div>
      <UnreviewedApplications />
    </div>
  );
};

export default IjaraDetails;
