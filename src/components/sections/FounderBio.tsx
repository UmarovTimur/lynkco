import Image from "next/image";
import { X } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/icons";

const TIMELINE = [
  { role: "Freelance Practice", company: "Hanzo Co.", period: "2011 → Now" },
  { role: "Design Lead", company: "Google", period: "2024 → Now" },
  { role: "Senior Designer", company: "PayPal", period: "2019 → 2024" },
  { role: "Product Designer", company: "Meta", period: "2016 → 2019" },
] as const;

const SOCIAL_LINKS = [
  { label: "Instagram", Icon: InstagramIcon },
  { label: "LinkedIn", Icon: LinkedinIcon },
  { label: "X", Icon: X },
] as const;

export function FounderBio() {
  return (
    <section
      id="about-1"
      className="mx-auto max-w-[1440px] px-6 py-24 md:px-16 md:py-32 lg:px-[120px]"
    >
      <p className="font-serif text-2xl italic text-black/50">Our Projects</p>
      <h2 className="mt-4 text-4xl md:text-5xl">
        <span className="text-black">Pushing boundaries</span>{" "}
        <span className="text-black/40">since 2011</span>
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-16 md:grid-cols-2">
        <div>
          <div className="relative aspect-[708/541] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/zRVCa2eOgJIf1mJK5PYcBLrYI.png"
              alt="Joris van Dijk, Founder of Hanzo Studio"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            {SOCIAL_LINKS.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-black/70 transition-colors hover:bg-black/5"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <p className="mt-4 text-base font-bold text-black">Joris van Dijk</p>
          <p className="text-sm text-black/50">Hanzo Studio, Founder</p>
        </div>

        <div>
          <p className="max-w-md text-base leading-relaxed text-black/70 md:text-lg">
            Joris van Dijk is a Dutch designer known for his minimalist,
            expressive digital work. He helps startups and studios create
            clean interfaces and strong branding. Based in Utrecht, he blends
            function with emotion — and often spends his free time cycling or
            exploring generative art.
          </p>

          <div className="mt-8">
            {TIMELINE.map((item) => (
              <div
                key={item.role}
                className="flex items-center justify-between border-t border-black/10 py-4 text-sm"
              >
                <span className="text-black">{item.role}</span>
                <span className="text-center text-black/50">{item.company}</span>
                <span className="text-right text-black/50">{item.period}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
