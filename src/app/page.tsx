import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { Geography } from "@/components/sections/Geography";
import { Equipment } from "@/components/sections/Equipment";
import { ModelOverview } from "@/components/sections/ModelOverview";
import { Stock } from "@/components/sections/Stock";
import { Process } from "@/components/sections/Process";
import { Terms } from "@/components/sections/Terms";
import { WholesalePricing } from "@/components/sections/WholesalePricing";
import { Faq } from "@/components/sections/Faq";
import { LeadForm } from "@/components/sections/LeadForm";
import { Intro } from "@/components/sections/Intro";
import { AboutBento } from "@/components/sections/AboutBento";
import { Work } from "@/components/sections/Work";
import { FounderBio } from "@/components/sections/FounderBio";
import { Pricing } from "@/components/sections/Pricing";
import { CtaFooter } from "@/components/sections/CtaFooter";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Nav />

      {/* Lynk & Co 06 content — sales-funnel order: show the car (emotion) →
          features → specs (rational) → trim choice → price → availability
          (scarcity + booking CTA) → logistics/deal (risk removal) → FAQ. */}
      <Hero />
      {/* <ValueProps /> */}
      <AboutBento />
      <Work />
      <Equipment />
      <ModelOverview />
      <Pricing />
      <Stock />
      <Geography />
      <Process />
      <Terms />
      {/* <WholesalePricing /> */}
      <Faq />
      <LeadForm />

      {/*
        Leftover template demo content (Hanzo portfolio placeholders) — kept
        per request, has no Lynk & Co equivalent yet. Grouped here rather
        than interspersed with real business content above.
        */}
      {/* <Intro /> */}
      {/* <FounderBio /> */}

      <CtaFooter />
    </main>
  );
}
