"use client";

import { Fragment, useEffect, useState } from "react";
import { MediaImage } from "@/components/MediaImage";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";

const SPECS = ["B-SUV", "1.5T 156 л.с.", "7DCT", "L2 ADAS", "FWD"];

const CHIP_IMAGES = [asset("/images/hero/car-4.webp"), asset("/images/hero/car-5.webp")];

const STRIP_IMAGES = [
  asset("/images/hero/car-1.webp"),
  asset("/images/hero/car-2.webp"),
  asset("/images/hero/car-3.webp"),
];

const CHIP_CLASS =
  "relative inline-block shrink-0 overflow-hidden rounded-2xl bg-white align-middle shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)]";

// Shared by both hero chips so they always render at the same size.
const CHIP_SIZE_CLASS =
  "h-13 w-[84px] sm:h-20 sm:w-[124px] md:h-24 md:w-[152px] lg:h-26 lg:w-[168px]";

function HeroPhotoChip({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CHIP_IMAGES.length);
    }, 2200);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  return (
    <span className={cn(CHIP_CLASS, CHIP_SIZE_CLASS, className)}>
      <AnimatePresence initial={false}>
        <motion.span
          key={CHIP_IMAGES[index]}
          className="absolute inset-0"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          <MediaImage
            src={CHIP_IMAGES[index]}
            alt="Lynk & Co 06"
            fill
            sizes="(min-width: 1024px) 160px, 96px"
            className="object-cover"
            // First frame only — it is the one in the server HTML, so it is
            // above the fold by definition and must not wait behind the
            // lazy queue. Later frames are swapped in mid-session, where the
            // default lazy behaviour is correct.
            loading={index === 0 ? "eager" : undefined}
            fetchPriority={index === 0 ? "high" : undefined}
          />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const LETTER_STAGGER = 0.03;

// Renders `text` as one motion.span per character, each rising up from
// below into place. `startIndex` lets a text fragment continue the stagger
// sequence of an earlier fragment on the same line (e.g. the words after an
// inline chip), so the whole line still reads as one continuous left-to-
// right reveal.
function AnimatedLetters({
  text,
  baseDelay,
  startIndex = 0,
  className,
}: {
  text: string;
  baseDelay: number;
  startIndex?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");
  // Character offset each word starts at (+1 for the space), so the stagger
  // keeps running left-to-right across word boundaries.
  const offsets = words.map((_, i) =>
    words.slice(0, i).reduce((n, word) => n + word.length + 1, 0),
  );

  return (
    <span className={className}>
      {words.map((word, w) => (
        // Characters are grouped into a nowrap span per word, with the space
        // left outside it as the only wrap opportunity. Bare inline-block
        // characters turn every letter into a wrap point, which shattered
        // "\u0434\u043b\u044f \u0430\u0432\u0442\u043e\u0441\u0430\u043b\u043e\u043d\u043e\u0432" mid-word at mobile widths.
        <Fragment key={w}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, i) => (
              <motion.span
                key={i}
                data-reveal
                className="inline-block"
                initial={{ opacity: 0, y: "70%" }}
                animate={{ opacity: 1, y: "0%" }}
                transition={{
                  duration: 0.45,
                  delay:
                    baseDelay + (startIndex + offsets[w] + i) * LETTER_STAGGER,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {w < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

function AnimatedChip({
  delay,
  className,
  children,
}: {
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      data-reveal
      className={cn("inline-block", className)}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: "70%" }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: "0%" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  );
}

// Doubled so the strip can scroll one full set and loop back to a
// pixel-identical frame — the reset is invisible, giving an uninterrupted
// flat scroll instead of a discrete slide-per-photo transition.
const LOOP_IMAGES = [...STRIP_IMAGES, ...STRIP_IMAGES];

function HeroPhotoCarousel({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span
      className={cn(
        CHIP_CLASS,
        CHIP_SIZE_CLASS,
        "border-2 border-black bg-neutral-900",
        className,
      )}
    >
      <motion.span
        className="flex h-full"
        style={{ width: `${LOOP_IMAGES.length * 100}%` }}
        animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
              duration: STRIP_IMAGES.length * 3,
              ease: "linear",
              repeat: Infinity,
            }
        }
      >
        {LOOP_IMAGES.map((src, i) => (
          <span
            key={i}
            className="relative h-full shrink-0"
            style={{ width: `${100 / LOOP_IMAGES.length}%` }}
          >
            <MediaImage
              src={src}
              alt="Lynk & Co 06"
              fill
              sizes="(min-width: 1024px) 160px, 96px"
              className="object-contain p-1"
              // Only the first pass of the loop: the second half repeats the
              // same URLs, so marking it too would add nothing but three more
              // entries to the eager queue.
              loading={i < STRIP_IMAGES.length ? "eager" : undefined}
              fetchPriority={i < STRIP_IMAGES.length ? "high" : undefined}
            />
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    // Deliberately short of a full screen: the next section should crest the
    // fold so the page reads as scrollable. Height is viewport-relative rather
    // than a stack of fixed paddings (which made the hero 113% of the screen on
    // a laptop and pushed everything below it out of sight), and `svh` keeps
    // mobile browser chrome from stretching it back past the fold.
    <section
      id="hero"
      className="-mb-10 flex min-h-[92svh] w-full flex-col items-center justify-center px-30 pt-24 sm:-mb-20 sm:pt-0 max-lg:px-8 max-sm:px-4"
    >
      <div className="flex w-full max-w-360 flex-col items-center gap-8 py-8 max-sm:gap-6 max-sm:pt-6 max-sm:pb-20">
        <Reveal rotate={-2}>
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-sm">
            {/* Live-status dot: a steady core with a ring pinging out of it,
                so "прямые поставки" reads as something currently running. */}
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-ping rounded-full bg-[rgb(12,179,0)] opacity-75 motion-reduce:animate-none"
              />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[rgb(12,179,0)]" />
            </span>
            <span className="text-base text-black">Прямые поставки</span>
          </div>
        </Reveal>

        <h1 className="max-w-6xl text-center font-sans text-[2.75rem] leading-[0.92] font-bold text-black sm:text-6xl md:text-8xl lg:text-[110px]">
          <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4">
            <AnimatedLetters text="Lynk & Co 06" baseDelay={0.1} />
            <AnimatedChip delay={0.1 + "Lynk & Co 06".length * LETTER_STAGGER}>
              <HeroPhotoChip className="rotate-3" />
            </AnimatedChip>
            {/* Phones keep both chips together on the first line; from sm up
                the carousel leads the second line instead. The two rows are
                separate flex containers, so `order` can't move one element
                between them — it's rendered in both slots and each is hidden
                at the breakpoint where it doesn't belong. `display: none` keeps
                the inactive one out of the accessibility tree too, so only one
                is ever present as far as a screen reader is concerned. */}
            <AnimatedChip
              delay={0.5}
              className="sm:hidden"
            >
              <HeroPhotoCarousel className="-rotate-3" />
            </AnimatedChip>
          </span>
          <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4">
            <AnimatedChip
              delay={0.5}
              className="hidden sm:inline-block"
            >
              <HeroPhotoCarousel className="-rotate-3" />
            </AnimatedChip>
            <AnimatedLetters text="из Китая для" baseDelay={0.65} />
            <AnimatedLetters text="автосалонов" baseDelay={0.65} />
          </span>
        </h1>

        <Reveal delay={0.35} rotate={-2}>
          <div className="max-w-xl text-center text-base leading-[1.7] text-black/50 sm:text-lg">
            Поставка новых автомобилей по схеме параллельного импорта
            <p>Склад в Хоргосе | Июль 2026</p>
          </div>
        </Reveal>
        {/* 
        <Reveal delay={0.45} rotate={2}>
          <div className="flex flex-wrap items-center justify-center gap-4 text-base text-black/60">
            {SPECS.map((spec, i) => (
              <span key={spec} className="flex items-center gap-3">
                <span className="font-medium text-black">{spec}</span>
                {i < SPECS.length - 1 && (
                  <span aria-hidden="true" className="text-black/20">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </Reveal>
 */}
        <Reveal delay={0.55} rotate={-2}>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#lead-form"
              className="glass-edge-button flex h-14 items-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-medium sm:pr-7 sm:pl-8 sm:text-base text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              Получить коммерческое предложение
              <ArrowRight size={16} />
            </a>
            <a
              href="#stock"
              className="flex h-14 items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-4 text-sm font-medium sm:pr-7 sm:pl-8 sm:text-base text-black transition-colors hover:bg-black/5"
            >
              Смотреть наличие на складе
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.65} rotate={2}>
          <p className="max-w-lg text-center text-sm text-black/40">
            Цены и условия поставки предоставляем индивидуально по запросу от
            юридического лица.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
