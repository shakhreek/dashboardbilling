import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import KontraktDetails from "@/components/details/KontraktDetails";
import KreditDetails from "@/components/details/KreditDetails";
import TTJDetails from "@/components/details/TTJDetails";
import StipendiyaDetails from "@/components/details/StipendiyaDetails";
import IjaraDetails from "@/components/details/IjaraDetails";
import TTJSubsidiyaDetails from "@/components/details/TTJSubsidiyaDetails";

const detailsMap: Record<string, { component: React.ComponentType; title: string; description: string }> = {
  "To'lov kontrakt": { component: KontraktDetails, title: "Kontrakt", description: "Shartnomalar va to'lovlar statistikasi" },
  "Kredit modul": { component: KreditDetails, title: "Kredit modul", description: "Kredit to'lovlari holati" },
  "TTJ": { component: TTJDetails, title: "TTJ — Talabalar turar joyi", description: "Yotoqxona bandligi va statistikasi" },
  "Stipendiya": { component: StipendiyaDetails, title: "Stipendiya", description: "Stipendiya oluvchilar taqsimoti" },
  "Ijara": { component: IjaraDetails, title: "Ijara subsidiyasi", description: "Ijara subsidiya to'lovlari tahlili" },
  "TTJ Subsidiya": { component: TTJSubsidiyaDetails, title: "TTJ Subsidiya", description: "Subsidiya arizalari holati" },
};

interface Props {
  moduleName: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModuleDetailSheet = ({ moduleName, open, onOpenChange }: Props) => {
  const info = moduleName ? detailsMap[moduleName] : null;
  const Details = info?.component;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{info?.title ?? ""}</SheetTitle>
          <SheetDescription>{info?.description ?? ""}</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          {Details && <Details />}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ModuleDetailSheet;
