import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import UnreviewedApplications from "@/components/UnreviewedApplications";
import dashboardBg from "@/assets/dashboard-bg.jpg";
import HeaderBar from "@/components/HeaderBar";
import HeroBanner from "@/components/HeroBanner";
import ContractChart from "@/components/ContractChart";
import DonutGauge from "@/components/DonutGauge";
import ModuleCard, { moduleCards } from "@/components/ModuleCard";
import TopOTMCharts from "@/components/TopOTMCharts";
import { statCards } from "@/data/dashboardData";

const Index = () => {
  const [year, setYear] = useState("2025-2026");
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
      <div className="hidden lg:block relative z-10">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <HeaderBar year={year} onYearChange={setYear} />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <HeroBanner cards={statCards} />

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 mb-6">
            <ContractChart />
            <DonutGauge />
          </div>

          <div className="mb-6">
            <TopOTMCharts />
          </div>

          {/* Module Cards */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-foreground mb-4">Modullar statistikasi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {moduleCards.map((mod) => (
                <ModuleCard
                  key={mod.id}
                  data={mod}
                  onViewDetails={() => navigate(`/module/${mod.slug}`)}
                />
              ))}
          </div>

          <UnreviewedApplications />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
