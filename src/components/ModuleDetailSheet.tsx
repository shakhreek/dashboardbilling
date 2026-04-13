import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import KontraktDetails from "@/components/details/KontraktDetails";
import KreditDetails from "@/components/details/KreditDetails";
import TTJDetails from "@/components/details/TTJDetails";
import StipendiyaDetails from "@/components/details/StipendiyaDetails";
import IjaraDetails from "@/components/details/IjaraDetails";
import TTJSubsidiyaDetails from "@/components/details/TTJSubsidiyaDetails";

const detailsMap: Record<string, React.ComponentType> = {
  kontrakt: KontraktDetails,
  kredit: KreditDetails,
  ttj: TTJDetails,
  stipendiya: StipendiyaDetails,
  ijara: IjaraDetails,
  "ttj-subsidiya": TTJSubsidiyaDetails,
};

const titlesMap: Record<string, string> = {
  kontrakt: "Kontrakt — Batafsil ma'lumot",
  kredit: "Kredit modul — Batafsil ma'lumot",
  ttj: "TTJ — Batafsil ma'lumot",
  stipendiya: "Stipendiya — Batafsil ma'lumot",
  ijara: "Ijara — Batafsil ma'lumot",
  "ttj-subsidiya": "TTJ Subsidiya — Batafsil ma'lumot",
};

interface Props {
  moduleId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModuleDetailSheet = ({ moduleId, open, onOpenChange }: Props) => {
  const Details = moduleId ? detailsMap[moduleId] : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{moduleId ? titlesMap[moduleId] : ""}</SheetTitle>
          <SheetDescription>Statistik ma'lumotlar va tahlil</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          {Details && <Details />}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ModuleDetailSheet;
