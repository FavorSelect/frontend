import CosyEveningsProductGrid from "@/components/organisms/home/CosyEveningsProductGrid";
import HeroWrapper from "@/components/organisms/home/HeroWrapper";

export default function Home() {
  return (
    <div className="space-y-4">
      <HeroWrapper />
      <CosyEveningsProductGrid />
    </div>
  );
}
