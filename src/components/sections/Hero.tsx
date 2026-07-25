import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { AvatarImage } from "@/types/content";

const AVATARS: AvatarImage[] = [
  { src: "/images/75ILrhKQhUkwU1dH15BUDezAQ.png", alt: "Client avatar" },
  { src: "/images/EgbF2rgcHm4Q19cR6VXfj7f5awk.png", alt: "Client avatar" },
  { src: "/images/etglVFVv5e7VnmUVyHsNK3oyIbI.png", alt: "Client avatar" },
  { src: "/images/Y3PGv0d0lyAiS8gk3emx3d41fvU.png", alt: "Client avatar" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="flex w-full flex-col items-center justify-center px-[120px] max-lg:px-8 max-sm:px-4"
    >
      <div className="flex w-full max-w-[1440px] flex-col items-center gap-12 py-24 pt-[180px] pb-[118px] max-lg:pt-36 max-lg:pb-20 max-sm:pt-28 max-sm:pb-16">
        <a
          href="#pricing"
          className="flex h-[43px] items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(12,179,0)]" />
          <span className="text-xs text-black">Booking Open — 2 Spots Left</span>
        </a>

        <h1 className="max-w-full text-center font-sans text-5xl font-normal leading-[1.15] tracking-[-0.03em] text-black md:text-7xl lg:text-[108px] lg:tracking-[-0.06em]">
          Unlimited{" "}
          <span className="relative inline-block h-[56px] w-[73px] translate-y-2 overflow-hidden rounded-xl align-middle md:h-[85px] md:w-[110px] md:rounded-2xl lg:h-[113px] lg:w-[148px]">
            <Image
              src="/images/0Y1cjcOdQp68PBw6G3HHfHz6TYo.jpg"
              alt="Colorful stacked app-card graphic"
              fill
              sizes="148px"
              className="object-cover"
            />
          </span>{" "}
          <span className="text-black/35">Design</span>
          <br className="hidden sm:block" />
          <span className="text-black/35">for</span>{" "}
          <span className="relative inline-block h-[56px] w-[73px] translate-y-2 overflow-hidden rounded-xl align-middle md:h-[85px] md:w-[110px] md:rounded-2xl lg:h-[113px] lg:w-[148px]">
            <Image
              src="/images/jSslhcqo8HKNjUvPEceq7bhbY.jpg"
              alt="Dark rounded rectangle with a faint logo mark"
              fill
              sizes="148px"
              className="object-cover"
            />
          </span>{" "}
          Solid Startups
        </h1>

        <p className="max-w-[434px] text-center text-base leading-[1.7] text-black/50">
          We help startups and brands create beautiful, functional products —
          fast and hassle-free.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#pricing"
            className="flex h-[51px] items-center gap-2 rounded-full bg-black py-3 pl-6 pr-5 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            Choose your plan
            <ArrowRight size={16} />
          </a>

          <div className="flex items-center gap-3">
            <div className="flex items-center -space-x-2.5">
              {AVATARS.map((avatar) => (
                <span
                  key={avatar.src}
                  className="relative block h-9 w-9 overflow-hidden rounded-full ring-2 ring-white"
                >
                  <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
              ))}
            </div>
            <span className="text-xs text-black/50">Trusted by Leaders</span>
          </div>
        </div>
      </div>
    </section>
  );
}
