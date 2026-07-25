import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { AboutBento } from "@/components/sections/AboutBento";
import { Intro } from "@/components/sections/Intro";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { FounderBio } from "@/components/sections/FounderBio";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { CtaFooter } from "@/components/sections/CtaFooter";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Nav />
      <Hero />
      <AboutBento />
      <Intro />
      <Process />
      <Work />
      <FounderBio />
      <Pricing />
      <Faq />
      <CtaFooter />
    </main>
  );
}
