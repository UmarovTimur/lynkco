import type { LucideIcon } from "lucide-react";
import {
  Grid2x2,
  Layers,
  PenTool,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillBadge {
  label: string;
  icon: LucideIcon;
  chipClassName: string;
  iconClassName?: string;
  positionClassName: string;
  rotationClassName: string;
}

const skillBadges: SkillBadge[] = [
  {
    label: "Strategy",
    icon: Target,
    chipClassName: "bg-orange-500",
    positionClassName: "top-0 left-0 md:left-4",
    rotationClassName: "-rotate-[4deg]",
  },
  {
    label: "UI/UX",
    icon: PenTool,
    chipClassName: "bg-neutral-800",
    positionClassName: "top-0 right-0 md:right-4",
    rotationClassName: "rotate-[4deg]",
  },
  {
    label: "Prototyping",
    icon: Layers,
    chipClassName: "bg-teal-500",
    positionClassName: "top-1/2 left-0 -translate-y-1/2 md:-left-6",
    rotationClassName: "-rotate-[5deg]",
  },
  {
    label: "Animation",
    icon: Sparkles,
    chipClassName: "bg-pink-500",
    positionClassName: "top-1/2 right-0 -translate-y-1/2 md:-right-6",
    rotationClassName: "rotate-[5deg]",
  },
  {
    label: "Research",
    icon: Search,
    chipClassName: "bg-blue-500",
    positionClassName: "bottom-0 left-4 md:left-10",
    rotationClassName: "-rotate-[4deg]",
  },
  {
    label: "Design systems",
    icon: Grid2x2,
    chipClassName: "bg-yellow-400",
    positionClassName: "bottom-0 right-4 md:right-10",
    rotationClassName: "rotate-[4deg]",
  },
];

function SkillBadgePill({ badge }: { badge: SkillBadge }) {
  const Icon = badge.icon;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full bg-white py-1 pr-5 pl-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
        badge.rotationClassName,
      )}
    >
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white",
          badge.chipClassName,
        )}
      >
        <Icon className="h-4.5 w-4.5" strokeWidth={2} />
      </span>
      <span className="text-base whitespace-nowrap text-black">
        {badge.label}
      </span>
    </div>
  );
}

export function Intro() {
  return (
    <section id="intro" className="px-6 py-24 md:px-[120px] md:py-32">
      <div className="mx-auto flex flex-col items-center">
        <div className="flex items-center justify-center gap-6">
          <span className="h-px w-10 shrink-0 border-t border-black/15 sm:w-24 md:w-[140px]" />
          <span className="font-serif text-2xl leading-[28.8px] text-black/50 italic">
            Hello!
          </span>
          <span className="h-px w-10 shrink-0 border-t border-black/15 sm:w-24 md:w-[140px]" />
        </div>

        <div className="relative mt-10 w-full max-w-[1160px] md:mt-16">
          <p className="mx-auto max-w-[700px] text-center text-3xl leading-[1.4] font-sans tracking-[-0.04em] text-black md:text-4xl lg:text-[44px]">
            We help startups and enterprise to establish an emotional connection
            between their products and happy engaged{" "}
            <span className="text-black/30">customers</span>
          </p>

          <div className="hidden md:contents">
            {skillBadges.map((badge) => (
              <div
                key={badge.label}
                className={cn("absolute", badge.positionClassName)}
              >
                <SkillBadgePill badge={badge} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex max-w-[560px] flex-wrap items-center justify-center gap-3 md:hidden">
          {skillBadges.map((badge) => (
            <SkillBadgePill key={badge.label} badge={badge} />
          ))}
        </div>
      </div>
    </section>
  );
}
