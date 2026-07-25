"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  Cpu,
  Code2,
  ListChecks,
  Palette,
  Handshake,
  Zap,
  MessageCircle,
  PackageCheck,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type PlanKey = "monthly" | "custom";

interface PlanContent {
  price: string;
  priceSuffix: string | null;
  pricePrefix: string | null;
  checklist: string[];
  availability: string;
  ctaLabel: string;
  testimonial: string;
  testimonialAttribution: string | null;
}

const PLANS: Record<PlanKey, PlanContent> = {
  monthly: {
    price: "$7,500",
    priceSuffix: "/mo",
    pricePrefix: null,
    checklist: [
      "Unlimited design requests",
      "Fast turnaround",
      "Fixed monthly rate",
      "Async communication",
      "Flexible scope",
      "Pause anytime",
    ],
    availability: "Booking Open — only 2 Spots Left",
    ctaLabel: "Book Free Discovery Call",
    testimonial:
      "Astrid's minimalist design approach transformed our brand. The simplicity and clarity she brought to our identity made us stand out in a crowded market. Our customers immediately noticed the difference.",
    testimonialAttribution: "Helena Moreau, Creative Director at Studio Novo",
  },
  custom: {
    price: "$11,500",
    priceSuffix: null,
    pricePrefix: "from",
    checklist: [
      "Tailored scope & deliverables",
      "One-off fee or milestone billing",
      "End-to-end collaboration",
      "High-impact execution",
      "Workshops & reviews",
      "Full documentation & assets",
    ],
    availability: "Booking Open — only 2 Spots Left",
    ctaLabel: "Book Free Discovery Call",
    testimonial:
      "Effortless process. Exceptional results. Working with Joris felt like having an in-house designer on speed dial.",
    testimonialAttribution: null,
  },
};

const BADGES: { label: string; icon: LucideIcon }[] = [
  { label: "Senior-level quality", icon: Award },
  { label: "Systems thinking", icon: Cpu },
  { label: "Developer-friendly", icon: Code2 },
  { label: "Clear process", icon: ListChecks },
  { label: "On-brand, every time", icon: Palette },
  { label: "Reliable partner", icon: Handshake },
  { label: "Fast execution", icon: Zap },
  { label: "Thoughtful feedback", icon: MessageCircle },
  { label: "Smooth handoff", icon: PackageCheck },
];

interface PricingToggleProps {
  plan: PlanKey;
  onChange: (plan: PlanKey) => void;
}

function PricingToggle({ plan, onChange }: PricingToggleProps) {
  const isCustom = plan === "custom";

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={cn(
          "text-sm font-medium transition-colors",
          isCustom ? "text-black/25" : "text-black"
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        role="switch"
        aria-checked={isCustom}
        aria-label="Toggle between monthly and custom pricing"
        onClick={() => onChange(isCustom ? "monthly" : "custom")}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
          isCustom ? "bg-accent-orange" : "bg-black/10"
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 left-0.5 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-white transition-transform duration-200",
            isCustom ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
      <button
        type="button"
        onClick={() => onChange("custom")}
        className={cn(
          "text-sm font-medium transition-colors",
          isCustom ? "text-black" : "text-black/25"
        )}
      >
        Custom
      </button>
    </div>
  );
}

export function Pricing() {
  const [plan, setPlan] = useState<PlanKey>("monthly");
  const content = PLANS[plan];

  return (
    <section id="pricing" className="px-6 py-24 md:px-16 lg:px-[120px]">
      <p className="font-serif text-2xl italic text-black/50">Pricing</p>
      <h2 className="mt-3 text-center text-4xl font-medium text-black md:text-5xl">
        Fixed Price, Zero Limits
      </h2>

      <div className="relative mt-12 overflow-hidden rounded-[32px] bg-neutral-100 p-6 md:p-16">
        <Image
          src="/images/etglVFVv5e7VnmUVyHsNK3oyIbI.png"
          alt=""
          fill
          aria-hidden
          className="-z-10 object-cover opacity-20"
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col">
            <PricingToggle plan={plan} onChange={setPlan} />

            <div className="mt-6 flex items-baseline gap-2">
              {content.pricePrefix && (
                <span className="text-2xl text-black/40">{content.pricePrefix}</span>
              )}
              <span className="text-6xl font-medium text-black md:text-7xl">
                {content.price}
              </span>
              {content.priceSuffix && (
                <span className="text-2xl text-black/40">{content.priceSuffix}</span>
              )}
            </div>

            <p className="mt-8 flex items-center gap-2 text-sm text-black/60">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {content.availability}
            </p>

            <a
              href="#contact"
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-black py-3 pr-5 pl-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {content.ctaLabel}
              <ArrowRight className="size-4" />
            </a>
          </div>

          <div>
            <div className="rounded-2xl bg-white p-6 md:p-10">
              <h3 className="text-2xl font-medium text-black">What&apos;s included</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {content.checklist.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex shrink-0 items-center justify-center rounded-full border border-black/15 bg-white p-1">
                      <Plus className="size-4 text-black/60" />
                    </span>
                    <span className="text-base text-black/60">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="mt-8 text-lg text-black">
              &ldquo;{content.testimonial}&rdquo;
              {content.testimonialAttribution && (
                <footer className="mt-3 text-sm text-black/40">
                  {content.testimonialAttribution}
                </footer>
              )}
            </blockquote>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-nowrap items-center justify-center gap-6 overflow-hidden">
        {BADGES.map(({ label, icon: Icon }, index) => (
          <div
            key={label}
            className={cn(
              "flex shrink-0 items-center gap-2 whitespace-nowrap",
              index !== 0 && "border-l border-black/10 pl-6"
            )}
          >
            <Icon className="size-4 text-black/40" />
            <span className="text-sm text-black/40">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
