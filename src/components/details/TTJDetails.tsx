import { Progress } from "@/components/ui/progress";

const TTJDetails = () => {
  const total = 5200;
  const occupied = 4520;
  const free = total - occupied;
  const pct = Math.round((occupied / total) * 100);

  const buildings = [
    { name: "1-bino", total: 1200, occupied: 1150 },
    { name: "2-bino", total: 1400, occupied: 1280 },
    { name: "3-bino", total: 1300, occupied: 1100 },
    { name: "4-bino", total: 1300, occupied: 990 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl p-4 border border-border bg-green-50 text-center">
          <p className="text-2xl font-bold" style={{ color: "hsl(142, 71%, 45%)" }}>{total.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Jami joylar</p>
        </div>
        <div className="rounded-xl p-4 border border-border bg-blue-50 text-center">
          <p className="text-2xl font-bold" style={{ color: "hsl(217, 91%, 55%)" }}>{occupied.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Band joylar</p>
        </div>
        <div className="rounded-xl p-4 border border-border bg-amber-50 text-center">
          <p className="text-2xl font-bold" style={{ color: "hsl(35, 80%, 50%)" }}>{free.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Bo'sh joylar</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Bandlik darajasi</span>
          <span className="font-semibold text-foreground">{pct}%</span>
        </div>
        <Progress value={pct} className="h-4" />
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 text-foreground">Binolar bo'yicha</h4>
        <div className="space-y-3">
          {buildings.map((b) => {
            const bPct = Math.round((b.occupied / b.total) * 100);
            return (
              <div key={b.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-foreground">{b.name}</span>
                  <span className="text-muted-foreground">{b.occupied}/{b.total} ({bPct}%)</span>
                </div>
                <Progress value={bPct} className="h-2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TTJDetails;
