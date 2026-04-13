import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const funnelData = [
  { stage: "Yangi arizalar", count: 2780, fill: "hsl(239, 84%, 67%)" },
  { stage: "Ko'rib chiqilmoqda", count: 2540, fill: "hsl(217, 91%, 60%)" },
  { stage: "Tasdiqlangan", count: 2340, fill: "hsl(142, 71%, 45%)" },
  { stage: "To'langan", count: 2100, fill: "hsl(45, 90%, 50%)" },
];

const TTJSubsidiyaDetails = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl p-4 border border-border bg-indigo-50">
          <p className="text-xs text-muted-foreground">Arizalar</p>
          <p className="text-xl font-bold" style={{ color: "hsl(239, 84%, 60%)" }}>27 800</p>
        </div>
        <div className="rounded-xl p-4 border border-border bg-indigo-50">
          <p className="text-xs text-muted-foreground">Summa</p>
          <p className="text-xl font-bold" style={{ color: "hsl(239, 84%, 60%)" }}>4 500 mlrd</p>
        </div>
        <div className="rounded-xl p-4 border border-border bg-indigo-50">
          <p className="text-xs text-muted-foreground">Oluvchilar</p>
          <p className="text-xl font-bold" style={{ color: "hsl(239, 84%, 60%)" }}>23 400</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 text-foreground">Ariza holati (Funnel)</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={funnelData} layout="vertical" barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis dataKey="stage" type="category" tick={{ fontSize: 11 }} width={130} />
            <Tooltip />
            <Bar dataKey="count" radius={[0, 6, 6, 0]}>
              {funnelData.map((entry, i) => (
                <rect key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Funnel visual */}
      <div className="space-y-2">
        {funnelData.map((item, i) => {
          const widthPct = Math.round((item.count / funnelData[0].count) * 100);
          return (
            <div key={item.stage} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-28 text-right flex-shrink-0">{item.stage}</span>
              <div className="flex-1 h-8 rounded-md flex items-center px-3"
                style={{ width: `${widthPct}%`, backgroundColor: item.fill, minWidth: "60px" }}>
                <span className="text-xs font-semibold" style={{ color: "white" }}>{item.count.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TTJSubsidiyaDetails;
