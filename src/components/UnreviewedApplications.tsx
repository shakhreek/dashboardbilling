import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

const filters = ["Jami", "Ijara", "Kredit-modul", "Shartnoma"] as const;

const applicationData = [
  { name: "MIRZO ULUG'BEK NOMIDAGI O'ZBEKISTON MILLIY UNIVERSITETI", count: 1964 },
  { name: "QO'QON DAVLAT UNIVERSITETI", count: 1087 },
  { name: "TOSHKENT DAVLAT TRANSPORT UNIVERSITETI", count: 853 },
  { name: "NIZOMIY NOMIDAGI O'ZBEKISTON MILLIY PEDAGOGIKA UNIVERSITETI", count: 684 },
  { name: "O'ZBEKISTON DAVLAT JAHON TILLARI UNIVERSITETI", count: 631 },
  { name: "TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI", count: 578 },
  { name: "SAMARQAND DAVLAT UNIVERSITETI", count: 512 },
  { name: "BUXORO DAVLAT UNIVERSITETI", count: 467 },
  { name: "FARG'ONA DAVLAT UNIVERSITETI", count: 423 },
  { name: "ANDIJON DAVLAT UNIVERSITETI", count: 389 },
  { name: "NAMANGAN DAVLAT UNIVERSITETI", count: 345 },
  { name: "NAVOIY DAVLAT KONCHILIK VA TEXNOLOGIYALAR UNIVERSITETI", count: 298 },
  { name: "URGANCH DAVLAT UNIVERSITETI", count: 267 },
  { name: "GULISTON DAVLAT UNIVERSITETI", count: 234 },
  { name: "TERMIZ DAVLAT UNIVERSITETI", count: 198 },
];

const INITIAL_COUNT = 5;

const UnreviewedApplications = () => {
  const [activeFilter, setActiveFilter] = useState<string>("Jami");
  const [showAll, setShowAll] = useState(false);

  const visibleData = showAll ? applicationData : applicationData.slice(0, INITIAL_COUNT);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-foreground">
          Arizalarni ko'rib chiqmagan OTMlar
        </h3>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow style={{ background: "hsl(245, 75%, 65%)" }}>
            <TableHead className="text-xs font-semibold" style={{ color: "white" }}>
              OTM nomi
            </TableHead>
            <TableHead className="text-xs font-semibold text-right" style={{ color: "white" }}>
              Arizalar soni
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleData.map((row, i) => (
            <TableRow
              key={row.name}
              className={`hover:bg-accent/50 transition-colors ${i % 2 === 0 ? "bg-muted/30" : ""}`}
            >
              <TableCell className="text-sm font-medium text-primary">
                {row.name}
              </TableCell>
              <TableCell className="text-sm font-semibold text-right">
                {row.count.toLocaleString("uz-UZ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {applicationData.length > INITIAL_COUNT && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-3 py-2 flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:bg-accent/50 rounded-lg transition-colors"
        >
          {showAll ? (
            <>Yopish <ChevronUp className="w-4 h-4" /></>
          ) : (
            <>Barchasini ko'rish ({applicationData.length}) <ChevronDown className="w-4 h-4" /></>
          )}
        </button>
      )}
    </div>
  );
};

export default UnreviewedApplications;
