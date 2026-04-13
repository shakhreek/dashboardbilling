import { useState } from "react";
import { GraduationCap } from "lucide-react";
import DashboardFilters from "@/components/DashboardFilters";
import ModuleCard from "@/components/ModuleCard";
import ModuleDetailSheet from "@/components/ModuleDetailSheet";
import { modules } from "@/data/dashboardData";

const Index = () => {
  const [year, setYear] = useState("2024-2025");
  const [faculty, setFaculty] = useState("Barcha fakultetlar");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleViewDetails = (moduleId: string) => {
    setSelectedModule(moduleId);
    setSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Moliya boshqaruv paneli</h1>
              <p className="text-sm text-muted-foreground">Universitet hisob-kitob tizimi</p>
            </div>
          </div>
          <DashboardFilters year={year} faculty={faculty} onYearChange={setYear} onFacultyChange={setFaculty} />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <ModuleCard key={m.id} module={m} onViewDetails={() => handleViewDetails(m.id)} />
          ))}
        </div>
      </div>

      <ModuleDetailSheet moduleId={selectedModule} open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
};

export default Index;
