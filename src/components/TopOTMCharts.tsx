import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const topDaromad = [
  { name: "Toshkent davlat iqtisodiyot universiteti", value: 480 },
  { name: "Toshkent tibbiyot universiteti", value: 420 },
  { name: "Samarqand davlat tibbiyot universiteti", value: 310 },
  { name: "Toshkent davlat yuridik universiteti", value: 250 },
  { name: "Mirzo Ulug'bek nomidagi O'zMU", value: 220 },
];

const topQarzdorlik = [
  { name: "Toshkent davlat iqtisodiyot universiteti", value: 195 },
  { name: "Toshkent tibbiyot universiteti", value: 160 },
  { name: "Andijon davlat tibbiyot instituti", value: 130 },
  { name: "Mirzo Ulug'bek nomidagi O'zMU", value: 115 },
  { name: "Farg'ona davlat universiteti", value: 105 },
];

const TopOTMCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-xl p-5 border border-border bg-card">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Eng yaxshi to'lov undirayotgan top 5 ta OTM</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={topDaromad} layout="vertical" margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v} mld`} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={200} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "12px" }} formatter={(v: number) => [`${v} mld`, "Daromad"]} />
            <Bar dataKey="value" fill="hsl(217, 91%, 65%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl p-5 border border-border bg-card">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Eng ko'p qarzdorlikka ega top 5 ta OTM</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={topQarzdorlik} layout="vertical" margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v} mld`} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={200} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "12px" }} formatter={(v: number) => [`${v} mld`, "Qarzdorlik"]} />
            <Bar dataKey="value" fill="hsl(350, 70%, 65%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopOTMCharts;
