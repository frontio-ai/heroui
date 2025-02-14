import {Spacer} from "@heroui/spacer";
import {Suspense} from "react";

import {Hero} from "@/components/marketing/hero";
import {FeaturesGrid} from "@/components/marketing/features-grid";
import {CustomThemes} from "@/components/marketing/custom-themes";
import {A11yOtb} from "@/components/marketing/a11y-otb";
import {DarkMode} from "@/components/marketing/dark-mode";
import {Customization} from "@/components/marketing/customization";
import {LastButNotLeast} from "@/components/marketing/last-but-not-least";
import {InstallBanner} from "@/components/marketing/install-banner";
import {Community} from "@/components/marketing/community";
import Support from "@/components/marketing/support";
import landingContent from "@/content/landing";
import {Sponsors} from "@/components/marketing/sponsors";
import {HeroUIProSection} from "@/components/marketing/heroui-pro-section";

export default async function Home() {
  return (
    <main className="container mx-auto max-w-7xl px-6 grow">
      <section className="flex flex-col items-center justify-center">
        <Hero />
        <FeaturesGrid features={landingContent.topFeatures} />
        <Sponsors />
        <CustomThemes />
        <A11yOtb />
        <DarkMode />
        <Customization />
        <HeroUIProSection />
        <LastButNotLeast />
        <Suspense fallback={<div>Loading...</div>}>
          <Support />
        </Suspense>
        <Spacer y={24} />
        <InstallBanner />
        <Community />
        <Spacer y={24} />
      </section>
    </main>
  );
}
