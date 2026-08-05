import { ArrowRight, Mail, X } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/icons";
import { Parallax } from "@/components/Parallax";

const SOCIALS = [
  { label: "Email", href: "#lead-form", Icon: Mail },
  { label: "X", href: "#", Icon: X },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

export function CtaFooter() {
  return (
    // The section is only the frame: padding here is what lets the grey page
    // show as a border around the panel on every side.
    <section id="cta" className="p-3 sm:p-5">
      {/* The panel's height has to subtract the frame padding around it,
          otherwise section = panel + padding overshoots the viewport and the
          top edge sits lower than the gap on the sides. */}
      <div className="relative flex min-h-[calc(100svh_-_1rem)] w-full flex-col items-center justify-center overflow-hidden rounded-[28px] bg-black px-[120px] py-24 text-center max-lg:px-8 max-sm:px-4 sm:min-h-[calc(100svh_-_2.5rem)] sm:rounded-[36px]">
        <div aria-hidden className="footer-rays">
          <span className="footer-ray ray-band-1" />
          <span className="footer-ray ray-band-2" />
          <span className="footer-ray ray-band-3" />
          <span className="footer-ray ray-band-4" />
          <span className="footer-ray ray-band-5" />
        </div>

        {/* Every block drops in from above on scroll. The distances step down
            the stack so the pieces don't arrive locked together — the headline
            travels furthest, the footer bar barely moves. */}
        <div className="relative flex w-full max-w-[1440px] flex-col items-center">
          <Parallax distance={110} blur={10}>
            <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-xs text-white">
              Прямые поставки по параллельному импорту
            </span>
          </Parallax>

          <Parallax distance={140} blur={18} className="w-full">
            <h2 className="mt-6 max-w-full text-center font-sans text-7xl leading-[1.05] font-bold tracking-[-0.03em] text-white sm:text-7xl md:text-8xl lg:text-[7rem]">
              Остались <span className="text-white/40">вопросы?</span>
            </h2>
          </Parallax>

          <Parallax distance={140} blur={18}>
            <p className="mt-4 max-w-md text-center text-sm max-w-80vw leading-[1.7] text-white/60">
              Свяжитесь с нами — ответим оперативно в рабочие дни и подготовим
              коммерческое предложение под ваш объём и регион.
            </p>
          </Parallax>

          <Parallax distance={60} blur={8}>
            <a
              href="#lead-form"
              className="glass-edge-button mt-8 flex h-14 items-center gap-2 rounded-full border border-white/20 bg-black px-6 py-4 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98] sm:pr-7 sm:pl-8 sm:text-base"
            >
              Получить коммерческое предложение
              <ArrowRight size={16} />
            </a>
          </Parallax>

          <Parallax distance={36} blur={6} className="w-full">
            <div className="mt-24 flex w-full flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
              <span className="text-base text-white">
                © Lynk & Co 06 Import, 2025
              </span>

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
          </Parallax>
        </div>
      </div>
    </section>
  );
}
