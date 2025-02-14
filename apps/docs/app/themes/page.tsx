import {ThemeBuilder} from "@/components/themes";

export default function ThemesPage() {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full p-6 py-3 md:pr-[45vw] lg:pr-[30vw] justify-start mt-12 scrollbar-hide">
      <ThemeBuilder />
    </div>
  );
}
