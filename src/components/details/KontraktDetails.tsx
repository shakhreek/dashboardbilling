import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const facultyData = [
  { faculty: "Iqtisodiyot", shartnoma: 142300, tolangan: 118200 },
  { faculty: "Huquq", shartnoma: 128900, tolangan: 102400 },
  { faculty: "Tibbiyot", shartnoma: 178400, tolangan: 156700 },
  { faculty: "Pedagogika", shartnoma: 96200, tolangan: 82100 },
  { faculty: "IT va dasturlash", shartnoma: 156800, tolangan: 139500 },
  { faculty: "Filologiya", shartnoma: 85100, tolangan: 71200 },
];

const KontraktDetails = () => {
  const totalSum = 14440;
  const paidSum = 7253;
  const pct = Math.round((paidSum / totalSum) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl p-4 border border-border bg-blue-50">
          <p className="text-xs text-muted-foreground">Jami shartnomalar</p>
          <p className="text-2xl font-bold" style={{ color: "hsl(217, 91%, 55%)" }}>787 674</p>
        </div>
        <div className="rounded-xl p-4 border border-border bg-green-50">
          <p className="text-xs text-muted-foreground">Tasdiqlangan</p>
          <p className="text-2xl font-bold" style={{ color: "hsl(142, 71%, 45%)" }}>724 510</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">To'langan: {paidSum.toLocaleString()} mlrd</span>
          <span className="font-semibold text-foreground">{pct}%</span>
        </div>
        <Progress value={pct} className="h-3" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Jami: {totalSum.toLocaleString()} mlrd so'm</span>
          <span>Qarzdorlik: {(totalSum - paidSum).toLocaleString()} mlrd</span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 text-foreground">Fakultetlar bo'yicha</h4>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={facultyData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="faculty" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={50} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="shartnoma" name="Shartnoma" fill="hsl(217, 91%, 60%)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="tolangan" name="To'langan" fill="hsl(142, 71%, 45%)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KontraktDetails;
