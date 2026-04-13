import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const monthlyData = [
  { month: "Yan", subsidiya: 180, talabalar: 1320 },
  { month: "Fev", subsidiya: 195, talabalar: 1350 },
  { month: "Mar", subsidiya: 210, talabalar: 1380 },
  { month: "Apr", subsidiya: 175, talabalar: 1310 },
  { month: "May", subsidiya: 220, talabalar: 1420 },
  { month: "Iyun", subsidiya: 190, talabalar: 1340 },
  { month: "Iyul", subsidiya: 160, talabalar: 1290 },
  { month: "Avg", subsidiya: 200, talabalar: 1360 },
  { month: "Sen", subsidiya: 230, talabalar: 1450 },
  { month: "Okt", subsidiya: 215, talabalar: 1410 },
  { month: "Noy", subsidiya: 205, talabalar: 1390 },
  { month: "Dek", subsidiya: 225, talabalar: 1440 },
];

const IjaraDetails = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl p-4 border border-border bg-rose-50">
          <p className="text-xs text-muted-foreground">Arizalar</p>
          <p className="text-xl font-bold" style={{ color: "hsl(350, 70%, 55%)" }}>18 900</p>
        </div>
        <div className="rounded-xl p-4 border border-border bg-rose-50">
          <p className="text-xs text-muted-foreground">Jami summa</p>
          <p className="text-xl font-bold" style={{ color: "hsl(350, 70%, 55%)" }}>2 100 mlrd</p>
        </div>
        <div className="rounded-xl p-4 border border-border bg-rose-50">
          <p className="text-xs text-muted-foreground">Oluvchilar</p>
          <p className="text-xl font-bold" style={{ color: "hsl(350, 70%, 55%)" }}>14 500</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 text-foreground">Oylik subsidiya to'lovlari (mln so'm)</h4>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="subsidiyaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(350, 70%, 55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(350, 70%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Area type="monotone" dataKey="subsidiya" stroke="hsl(350, 70%, 55%)" fill="url(#subsidiyaGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IjaraDetails;
