import Image from "next/image";
import { Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProcessStep, Testimonial } from "@/types/content";

const PROCESS_STEPS: ProcessStep[] = [
  {
    index: 1,
    title: "Subscribe",
    description: "Choose a plan and request as many designs as you need.",
  },
  {
    index: 2,
    title: "Request",
    description: "Choose a plan and request as many designs as you need.",
  },
  {
    index: 3,
    title: "Get Your Designs",
    description: "Choose a plan and request as many designs as you need.",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Working with Joris was a game-changer. He instantly understood our vision and translated it into a sleek, intuitive product. The process felt effortless, and the results exceeded our expectations.",
    name: "Sophie Lemaire",
    role: "Product Lead at Loomi",
    avatarSrc: "/images/GQYbkjoIOqJZo9gC9bpE4YLn18.png",
  },
  {
    quote:
      "Joris brings clarity to chaos. His design work is not only beautiful but deeply strategic. He helped us rebrand from the ground up, and our audience response has been incredible.",
    name: "Milan Bakker",
    role: "Founder of Drifted Studio",
    avatarSrc: "/images/TjQr3Mj8oNK6Ndfogb5IMNxXGg.png",
  },
];

const CARD_LAYOUT = [
  "left-0 top-16 z-10 -rotate-[4deg]",
  "left-1/2 top-4 z-20 -translate-x-1/2 rotate-[1deg]",
  "right-0 top-16 z-10 rotate-[3deg]",
];

interface ProcessCardProps {
  step: ProcessStep;
  className?: string;
}

function ProcessCard({ step, className }: ProcessCardProps) {
  return (
    <div
      className={cn(
        "flex h-[493px] w-full max-w-[502px] flex-col justify-between rounded-2xl bg-white p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]",
        className,
      )}
    >
      <span className="text-7xl font-medium text-black">{step.index}</span>
      <div>
        <h3 className="text-2xl font-bold text-black">{step.title}</h3>
        <p className="mt-2 text-base text-black/60">{step.description}</p>
      </div>
    </div>
  );
}

export function Process() {
  return (
    <section
      id="process"
      className="mx-auto max-w-[1440px] px-[120px] py-24 max-lg:px-8 max-sm:px-4 md:py-32"
    >
      <div className="mx-auto flex w-fit items-center gap-4">
        <span className="h-px w-12 bg-black/10" aria-hidden="true" />
        <span className="font-serif text-2xl italic text-black/50">
          Our Process, Explained
        </span>
        <span className="h-px w-12 bg-black/10" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-center text-5xl font-normal text-black">
        Here&apos;s how it works
      </h2>

      {/* Mobile / tablet: stacked, no overlap or rotation */}
      <div className="mt-16 flex flex-col gap-6 md:hidden">
        {PROCESS_STEPS.map((step) => (
          <ProcessCard key={step.index} step={step} />
        ))}
      </div>

      {/* Desktop: fanned overlapping card stack with squiggle connectors */}
      <div className="relative mt-16 hidden h-[600px] w-full max-w-[1200px] mx-auto md:block">
        {PROCESS_STEPS.map((step, i) => (
          <ProcessCard
            key={step.index}
            step={step}
            className={cn("absolute", CARD_LAYOUT[i])}
          />
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:divide-x md:divide-black/10">
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.name}
            className="relative pr-0 md:first:pr-12 md:last:pl-12"
          >
            <button
              type="button"
              aria-label="Pause"
              tabIndex={-1}
              className="absolute right-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-black/5"
            >
              <Pause className="h-3.5 w-3.5 text-black" fill="currentColor" />
            </button>
            <p className="max-w-md pr-12 text-xl text-black">
              {testimonial.quote}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {testimonial.avatarSrc ? (
                <Image
                  src={testimonial.avatarSrc}
                  alt={testimonial.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : null}
              <div>
                <p className="text-sm font-bold text-black">
                  {testimonial.name}
                </p>
                <p className="text-xs text-black/60">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
