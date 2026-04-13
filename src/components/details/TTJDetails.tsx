import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Building2, Users, Clock, Banknote } from "lucide-react";

const stats = [
  { label: "Umumiy TTJ lar soni", value: "248", icon: Building2, color: "hsl(217, 91%, 55%)" },
  { label: "TTJ da turgan talabalar", value: "48 920", icon: Users, color: "hsl(142, 71%, 45%)" },
  { label: "Navbatda turganlar", value: "12 340", icon: Clock, color: "hsl(35, 80%, 50%)" },
  { label: "Jami joylar", value: "52 000", icon: Building2, color: "hsl(270, 70%, 55%)" },
];

const monthlyPayments = [
  { month: "Sen", tolangan: 120, qarzdorlik: 30 },
  { month: "Okt", tolangan: 135, qarzdorlik: 25 },
  { month: "Noy", tolangan: 110, qarzdorlik: 40 },
  { month: "Dek", tolangan: 95, qarzdorlik: 55 },
  { month: "Yan", tolangan: 140, qarzdorlik: 20 },
  { month: "Fev", tolangan: 150, qarzdorlik: 18 },
  { month: "Mar", tolangan: 130, qarzdorlik: 35 },
  { month: "Apr", tolangan: 125, qarzdorlik: 28 },
  { month: "May", tolangan: 115, qarzdorlik: 32 },
  { month: "Iyun", tolangan: 100, qarzdorlik: 45 },
];

const monthlyOccupancy = [
  { month: "Sen", bandlik: 4580, bosh: 620 },
  { month: "Okt", bandlik: 4730, bosh: 470 },
  { month: "Noy", bandlik: 4830, bosh: 370 },
  { month: "Dek", bandlik: 4680, bosh: 520 },
  { month: "Yan", bandlik: 4890, bosh: 310 },
  { month: "Fev", bandlik: 4940, bosh: 260 },
  { month: "Mar", bandlik: 4780, bosh: 420 },
  { month: "Apr", bandlik: 4630, bosh: 570 },
  { month: "May", bandlik: 4420, bosh: 780 },
  { month: "Iyun", bandlik: 3740, bosh: 1460 },
];

const TTJDetails = () => {
  const totalSum = 890;
  const paidSum = 570;
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

      {/* Payment progress */}
      <div className="rounded-xl p-5 border border-border bg-card">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-foreground">To'lov holati</span>
          <span className="font-semibold text-foreground">{pct}%</span>
        </div>
        <Progress value={pct} className="h-3" />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>To'langan: {paidSum} mlrd so'm</span>
          <span>Jami: {totalSum} mlrd so'm</span>
        </div>
      </div>


      {/* Monthly payments chart */}
      <div className="rounded-xl p-5 border border-border bg-card">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Oy kesimida to'lovlar</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyPayments} barGap={4}>
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
            <Bar dataKey="tolangan" name="To'langan" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="qarzdorlik" name="Qarzdorlik" fill="hsl(350, 70%, 55%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly occupancy bar chart */}
      <div className="rounded-xl p-5 border border-border bg-card">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Oyma-oy bandlik va bo'sh joylar</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyOccupancy} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid hsl(214, 32%, 91%)", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="bandlik" name="Band joylar" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="bosh" name="Bo'sh joylar" fill="hsl(35, 80%, 50%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TTJDetails;
