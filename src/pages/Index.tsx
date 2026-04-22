import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import dashboardBg from "@/assets/dashboard-bg.jpg";
import HeaderBar from "@/components/HeaderBar";
import HeroBanner from "@/components/HeroBanner";
import ContractChart from "@/components/ContractChart";
import DonutGauge from "@/components/DonutGauge";
import ModuleCard, { moduleCards } from "@/components/ModuleCard";
import TopOTMCharts from "@/components/TopOTMCharts";
import { statCards } from "@/data/dashboardData";
import RiskAnalysisCard from "@/components/RiskAnalysisCard";
import PartnersSection from "@/components/PartnersSection";
import DashboardSkeleton from "@/components/DashboardSkeleton";

import { useEffect } from "react";

const Index = () => {
  const [year, setYear] = useState("2025-2026");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background relative">
        <div
          className="fixed inset-0 z-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url(${dashboardBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="hidden lg:block relative z-10">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col min-w-0 relative z-10">
          <HeaderBar year={year} onYearChange={setYear} onMenuToggle={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <DashboardSkeleton />
          </main>
        </div>
      </div>
    );
  }

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
          <div className="animate-fade-in">
            <HeroBanner cards={statCards} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 mb-6 animate-fade-in stagger-2" style={{ animationDelay: "0.1s" }}>
            <ContractChart />
            <DonutGauge />
          </div>

          {/* Module Cards */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-foreground mb-4 animate-fade-in" style={{ animationDelay: "0.15s" }}>Modullar statistikasi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {moduleCards.map((mod, i) => (
                <div key={mod.id} className="animate-fade-in opacity-0" style={{ animationDelay: `${0.2 + i * 0.05}s`, animationFillMode: "forwards" }}>
                  <ModuleCard
                    data={mod}
                    onViewDetails={() => navigate(`/module/${mod.slug}`)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.45s" }}>
            <RiskAnalysisCard />
          </div>

          <div className="mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
            <TopOTMCharts />
          </div>

          <div className="mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}>
            <PartnersSection />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
