import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { Specs } from "@/components/sections/Specs";
import { Geography } from "@/components/sections/Geography";
import { Complectations } from "@/components/sections/Complectations";
import { Equipment } from "@/components/sections/Equipment";
import { Stock } from "@/components/sections/Stock";
import { Process } from "@/components/sections/Process";
import { Terms } from "@/components/sections/Terms";
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
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Nav />

      {/* Lynk & Co 06 content */}
      <Hero />
      <ValueProps />
      <Specs />
      <Geography />
      <Complectations />
      <Equipment />
      <Stock />
      <Process />
      <Terms />
      <Faq />
      <LeadForm />

      {/*
        Leftover template demo content (Hanzo portfolio placeholders) — kept
        per request, has no Lynk & Co equivalent yet. Grouped here rather
        than interspersed with real business content above.
      */}
      <Intro />
      <AboutBento />
      <Work />
      <FounderBio />
      <Pricing />

      <CtaFooter />
    </main>
  );
}
