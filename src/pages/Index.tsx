import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import dashboardBg from "@/assets/dashboard-bg.jpg";
import HeaderBar from "@/components/HeaderBar";
import HeroBanner from "@/components/HeroBanner";
import ContractChart from "@/components/ContractChart";
import ModuleCard, { moduleCards } from "@/components/ModuleCard";
import TopOTMCharts from "@/components/TopOTMCharts";
import { statCards } from "@/data/dashboardData";
import RiskAnalysisCard from "@/components/RiskAnalysisCard";

const Index = () => {
  const [year, setYear] = useState("2025-2026");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background relative">
      {/* Background image */}
      <div
        className="fixed inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url(${dashboardBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative w-[260px] h-full animate-slide-in-left" onClick={(e) => e.stopPropagation()}>
            <Sidebar />
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-[-40px] w-8 h-8 rounded-full bg-card flex items-center justify-center shadow-lg"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block relative z-10">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <HeaderBar year={year} onYearChange={setYear} onMenuToggle={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {/* Top Section: 4 stat cards + (5th card with modules) */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 mb-6">
            {/* Left: 4 stat cards */}
            <div className="animate-fade-in">
              <HeroBanner cards={statCards.slice(0, 4)} showTitle={true} />
            </div>

            {/* Right: 5th stat card + Module Cards */}
            <div className="space-y-4">
              <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <HeroBanner cards={statCards.slice(4, 5)} showTitle={false} singleCard={true} />
              </div>

              {/* Module Cards */}
              <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-sm font-semibold text-foreground mb-3">Modullar tahlili</h3>
                <div className="space-y-2">
                  {moduleCards.map((mod, i) => (
                    <div key={mod.id} className="animate-fade-in opacity-0" style={{ animationDelay: `${0.25 + i * 0.05}s` }}>
                      <ModuleCard
                        data={mod}
                        compact={true}
                        onViewDetails={() => navigate(`/module/${mod.slug}`)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contract Chart */}
          <div className="mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
            <ContractChart />
          </div>

          <div className="mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.45s" }}>
            <RiskAnalysisCard />
          </div>

          <div className="mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
            <TopOTMCharts />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
