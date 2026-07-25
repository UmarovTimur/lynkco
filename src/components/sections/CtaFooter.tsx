import { ArrowRight, Mail, X } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/icons";

const SOCIALS = [
  { label: "Email", href: "mailto:hello@hanzo.studio", Icon: Mail },
  { label: "X", href: "https://x.com", Icon: X },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedinIcon },
  { label: "Instagram", href: "https://instagram.com/stfnco", Icon: InstagramIcon },
];

export function CtaFooter() {
  return (
    <section
      id="cta"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black px-[120px] py-24 text-center max-lg:px-8 max-sm:px-4"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent"
      />

      <div className="relative flex w-full max-w-[1440px] flex-col items-center">
        <span className="rounded-full bg-white/10 px-4 py-2 text-xs text-white">
          2 spots available
        </span>

        <h2 className="mt-6 max-w-full text-center font-sans text-5xl font-normal leading-[1.15] tracking-[-0.03em] text-white">
          Let&apos;s Connect
        </h2>

        <p className="mt-4 max-w-md text-center text-base leading-[1.7] text-white/60">
          Feel free to contact me if having any questions. I&apos;m available
          for new projects or just for chatting.
        </p>

        <a
          href="#"
          className="mt-8 flex h-[51px] items-center gap-2 rounded-full border border-white/20 bg-black py-3 pl-6 pr-5 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          Book a free intro call
          <ArrowRight size={16} />
        </a>

        <div className="mt-24 flex w-full flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <span className="text-base text-white">© Hanzo Studio, 2025</span>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
