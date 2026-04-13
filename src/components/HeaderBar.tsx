import { User, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface HeaderBarProps {
  year: string;
  onYearChange: (v: string) => void;
}

const HeaderBar = ({ year, onYearChange }: HeaderBarProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-card border-b border-border">
      <div>
        <p className="text-sm font-semibold text-foreground">
          Tashkilot : TOSHKENT DAVLAT YURIDIK UNIVERSITETI
        </p>
        <p className="text-xs text-muted-foreground">Foydalanuvchi : SH.HA.GULMUXAMMEDOV</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="default" size="sm" className="text-xs gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          OTMni tanlash
        </Button>
        <span className="text-sm text-muted-foreground">O'zbek tili</span>
        <Select value={year} onValueChange={onYearChange}>
          <SelectTrigger className="w-[160px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025-2026">2025-2026 o'quv yili</SelectItem>
            <SelectItem value="2024-2025">2024-2025 o'quv yili</SelectItem>
            <SelectItem value="2023-2024">2023-2024 o'quv yili</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <User className="w-4 h-4" />
          <span className="text-xs font-medium">SH.HA.GULMUXAMMEDOV</span>
          <span className="text-xs text-muted-foreground">Administrator</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
