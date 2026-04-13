import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { academicYears, faculties } from "@/data/dashboardData";

interface DashboardFiltersProps {
  year: string;
  faculty: string;
  onYearChange: (v: string) => void;
  onFacultyChange: (v: string) => void;
}

const DashboardFilters = ({ year, faculty, onYearChange, onFacultyChange }: DashboardFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Select value={year} onValueChange={onYearChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="O'quv yili" />
        </SelectTrigger>
        <SelectContent>
          {academicYears.map((y) => (
            <SelectItem key={y} value={y}>{y} o'quv yili</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={faculty} onValueChange={onFacultyChange}>
        <SelectTrigger className="w-full sm:w-[220px]">
          <SelectValue placeholder="Fakultet" />
        </SelectTrigger>
        <SelectContent>
          {faculties.map((f) => (
            <SelectItem key={f} value={f}>{f}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DashboardFilters;
