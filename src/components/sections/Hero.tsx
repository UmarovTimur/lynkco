"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const SPECS = ["B-SUV", "1.5T 156 л.с.", "7DCT", "L2 ADAS", "FWD"];

const CHIP_IMAGES = ["/images/hero/car-4.png", "/images/hero/car-5.png"];

const STRIP_IMAGES = [
  "/images/hero/car-1.png",
  "/images/hero/car-2.png",
  "/images/hero/car-3.png",
];

const CHIP_CLASS =
  "relative inline-block shrink-0 overflow-hidden rounded-2xl bg-white align-middle shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)]";

// Shared by both hero chips so they always render at the same size.
const CHIP_SIZE_CLASS =
  "h-11 w-[72px] sm:h-16 sm:w-[100px] md:h-20 md:w-[126px] lg:h-24 lg:w-[152px]";

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
          <Image
            src={CHIP_IMAGES[index]}
            alt="Lynk & Co 06"
            fill
            sizes="(min-width: 1024px) 160px, 96px"
            className="object-cover"
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

  return (
    <span className={className}>
      {Array.from(text).map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: "70%" }}
          animate={{ opacity: 1, y: "0%" }}
          transition={{
            duration: 0.45,
            delay: baseDelay + (startIndex + i) * LETTER_STAGGER,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
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
            <Image
              src={src}
              alt="Lynk & Co 06"
              fill
              sizes="(min-width: 1024px) 160px, 96px"
              className="object-contain p-1"
            />
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="flex -mb-20 w-full flex-col items-center justify-center px-30 max-lg:px-8 max-sm:px-4"
    >
      <div className="flex w-full max-w-360 flex-col items-center gap-8 py-24 pt-45 pb-29.5 max-lg:pt-36 max-lg:pb-20 max-sm:pt-28 max-sm:pb-16">
        <Reveal rotate={-2}>
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-sm">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(12,179,0)]" />
            <span className="text-sm text-black">
              Прямые поставки
            </span>
          </div>
        </Reveal>

        <h1 className="max-w-5xl text-center font-sans text-5xl font-bold text-black md:text-7xl lg:text-[100px]">
          <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4">
            <AnimatedLetters text="Lynk & Co 06" baseDelay={0.1} />
            <AnimatedChip delay={0.1 + "Lynk & Co 06".length * LETTER_STAGGER}>
              <HeroPhotoChip className="rotate-3" />
            </AnimatedChip>
          </span>
          <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4">
            <AnimatedLetters text="из Китая" baseDelay={0.65} />
            <AnimatedChip delay={0.65 + "из Китая".length * LETTER_STAGGER}>
              <HeroPhotoCarousel className="-rotate-3" />
            </AnimatedChip>
            <AnimatedLetters
              text="для вас"
              baseDelay={0.65}
              startIndex={"из Китая".length}
            />
          </span>
        </h1>

        <Reveal delay={0.35} rotate={-2}>
          <div className="max-w-xl text-center text-base leading-[1.7] text-black/50">
            Эксклюзивное предложение для новых партнеров
            <p>
              Склад Хоргос | Июль 2026
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.45} rotate={2}>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-black/60">
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

        <Reveal delay={0.55} rotate={-2}>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#lead-form"
              className="flex h-[51px] items-center gap-2 rounded-full bg-black py-3 pl-6 pr-5 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              Получить коммерческое предложение
              <ArrowRight size={16} />
            </a>
            <a
              href="#stock"
              className="flex h-[51px] items-center gap-2 rounded-full border border-black/15 bg-white py-3 pl-6 pr-5 text-sm font-medium text-black transition-colors hover:bg-black/5"
            >
              Смотреть наличие на складе
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.65} rotate={2}>
          <p className="max-w-lg text-center text-xs text-black/40">
            Цены и условия поставки предоставляем индивидуально по запросу от
            юридического лица.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
