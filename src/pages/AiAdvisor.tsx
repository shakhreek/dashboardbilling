import { useEffect, useState } from "react";
import { ArrowLeft, X, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import dashboardBg from "@/assets/dashboard-bg.jpg";
import { Button } from "@/components/ui/button";
import SmartInsights from "@/components/ai/SmartInsights";
import RiskPrediction from "@/components/ai/RiskPrediction";
import AiChat from "@/components/ai/AiChat";

const AiAdvisor = () => {
  const [year, setYear] = useState("2025-2026");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      <div className="hidden lg:block relative z-10">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <HeaderBar year={year} onYearChange={setYear} onMenuToggle={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="mb-6 animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="mb-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Bosh sahifa
            </Button>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-blue-500 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI Moliyaviy Maslahatchi</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Sun'iy intellekt asosida talabalarning to'lov intizomi tahlili,
                  qarzdorlik bashorati va OTM rahbariyati uchun aqlli tavsiyalar
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <SmartInsights />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
              <RiskPrediction />
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <AiChat />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AiAdvisor;
