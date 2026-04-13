import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import HeroBanner from "@/components/HeroBanner";
import ContractChart from "@/components/ContractChart";
import DonutGauge from "@/components/DonutGauge";
import ModulesTable from "@/components/ModulesTable";
import { statCards } from "@/data/dashboardData";

const Index = () => {
  const [year, setYear] = useState("2025-2026");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <HeaderBar year={year} onYearChange={setYear} />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <HeroBanner cards={statCards} />

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 mb-6">
            <ContractChart />
            <DonutGauge />
          </div>

          <ModulesTable />
        </main>
      </div>
    </div>
  );
};

export default Index;
