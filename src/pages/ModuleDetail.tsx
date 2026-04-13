import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import KontraktDetails from "@/components/details/KontraktDetails";
import KreditDetails from "@/components/details/KreditDetails";
import TTJDetails from "@/components/details/TTJDetails";
import StipendiyaDetails from "@/components/details/StipendiyaDetails";
import IjaraDetails from "@/components/details/IjaraDetails";
import TTJSubsidiyaDetails from "@/components/details/TTJSubsidiyaDetails";
import dashboardBg from "@/assets/dashboard-bg.jpg";
import { useState } from "react";

const modulesMap: Record<string, { component: React.ComponentType; title: string; description: string; color: string }> = {
  "tolov-kontrakt": { component: KontraktDetails, title: "Kontrakt", description: "Shartnomalar va to'lovlar statistikasi", color: "hsl(217, 91%, 60%)" },
  "kredit-modul": { component: KreditDetails, title: "Kredit modul", description: "Kredit to'lovlari holati", color: "hsl(270, 70%, 55%)" },
  "ttj": { component: TTJDetails, title: "TTJ — Talabalar turar joyi", description: "Yotoqxona bandligi va statistikasi", color: "hsl(142, 71%, 45%)" },
  "stipendiya": { component: StipendiyaDetails, title: "Stipendiya", description: "Stipendiya oluvchilar taqsimoti", color: "hsl(45, 90%, 50%)" },
  "ijara": { component: IjaraDetails, title: "Ijara subsidiyasi", description: "Ijara subsidiya to'lovlari tahlili", color: "hsl(350, 70%, 55%)" },
  "ttj-subsidiya": { component: TTJSubsidiyaDetails, title: "TTJ Subsidiya", description: "Subsidiya arizalari holati", color: "hsl(239, 84%, 60%)" },
};

const ModuleDetail = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [year, setYear] = useState("2025-2026");

  const moduleInfo = moduleId ? modulesMap[moduleId] : null;
  const Details = moduleInfo?.component;

  if (!moduleInfo || !Details) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Modul topilmadi</h2>
          <button onClick={() => navigate("/")} className="text-primary hover:underline">
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

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
        <HeaderBar year={year} onYearChange={setYear} />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {/* Back button & Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Bosh sahifaga qaytish
            </button>

            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${moduleInfo.color}20` }}
              >
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: moduleInfo.color }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{moduleInfo.title}</h1>
                <p className="text-sm text-muted-foreground">{moduleInfo.description}</p>
              </div>
            </div>
          </div>

          {/* Module content */}
          <div className="w-full">
            <Details />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModuleDetail;
