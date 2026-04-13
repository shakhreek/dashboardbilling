import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { moduleRows } from "@/data/dashboardData";

const ModulesTable = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-base font-semibold text-foreground mb-4">Modullar statistikasi</h3>
      <Table>
        <TableHeader>
          <TableRow style={{ background: "hsl(217, 91%, 55%)" }}>
            <TableHead className="text-xs font-semibold" style={{ color: "white" }}>Modullar nomi</TableHead>
            <TableHead className="text-xs font-semibold" style={{ color: "white" }}>Shartnomalar soni</TableHead>
            <TableHead className="text-xs font-semibold" style={{ color: "white" }}>To'langan summa</TableHead>
            <TableHead className="text-xs font-semibold" style={{ color: "white" }}>Qarzdorlik</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moduleRows.map((row) => (
            <TableRow key={row.name} className="hover:bg-accent/50">
              <TableCell className="text-sm font-medium">
                <span className="mr-2">{row.icon}</span>
                {row.name}
              </TableCell>
              <TableCell className="text-sm">{row.contracts.toLocaleString("uz-UZ")}</TableCell>
              <TableCell className="text-sm" style={{ color: "hsl(142, 71%, 45%)" }}>{row.paidSum}</TableCell>
              <TableCell className="text-sm" style={{ color: "hsl(0, 70%, 55%)" }}>{row.debt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ModulesTable;
