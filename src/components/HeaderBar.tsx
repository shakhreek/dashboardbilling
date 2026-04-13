import { useState } from "react";
import { Menu, X, User, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface HeaderBarProps {
  year: string;
  onYearChange: (v: string) => void;
  onMenuToggle?: () => void;
}

const HeaderBar = ({ year, onYearChange, onMenuToggle }: HeaderBarProps) => {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        )}
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-foreground">
            Tashkilot : TOSHKENT DAVLAT YURIDIK UNIVERSITETI
          </p>
          <p className="text-xs text-muted-foreground">Foydalanuvchi : SH.HA.GULMUXAMMEDOV</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Button variant="default" size="sm" className="text-xs gap-1.5 hidden sm:flex">
          <Calendar className="w-3.5 h-3.5" />
          OTMni tanlash
        </Button>
        <span className="text-sm text-muted-foreground hidden md:inline">O'zbek tili</span>
        <Select value={year} onValueChange={onYearChange}>
          <SelectTrigger className="w-[130px] sm:w-[160px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025-2026">2025-2026 o'quv yili</SelectItem>
            <SelectItem value="2024-2025">2024-2025 o'quv yili</SelectItem>
            <SelectItem value="2023-2024">2023-2024 o'quv yili</SelectItem>
          </SelectContent>
        </Select>
        <div className="hidden md:flex items-center gap-2 text-sm text-foreground">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="hidden lg:block">
            <span className="text-xs font-medium block">SH.HA.GULMUXAMMEDOV</span>
            <span className="text-[10px] text-muted-foreground">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
