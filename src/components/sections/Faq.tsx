"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question:
      "What's the difference between a subscription and a custom project?",
    answer:
      "The subscription is ongoing and flexible — ideal for continuous design needs. Custom projects are one-time, fixed-scope engagements for larger goals like a rebrand or product launch.",
  },
  {
    question: "How fast is the turnaround?",
    answer:
      "Most requests are delivered within 1–2 business days. Larger tasks may take longer, but you'll always be kept in the loop.",
  },
  {
    question: "How many requests can I make?",
    answer:
      "As many as you like — with a subscription, you can queue unlimited requests, and they'll be handled one at a time in priority order.",
  },
  {
    question: "What types of design do you handle?",
    answer:
      "Websites, product UI, landing pages, brand assets, decks, social media visuals — anything digital that needs to look and feel sharp.",
  },
  {
    question: "What tools do you use?",
    answer:
      "Figma for design, Notion for task management, and Slack or email for async communication.",
  },
  {
    question: "Can I pause the subscription?",
    answer:
      "Yes — you can pause anytime and resume when you're ready. Unused days roll over.",
  },
  {
    question: "Do you offer development too?",
    answer:
      "Joris focuses on design only, but all deliverables are dev-ready. He can also recommend trusted no-code or Webflow/Framer developers if needed.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="px-6 py-24 md:px-[120px]">
      <p className="text-center font-serif text-2xl italic text-black/50">
        FAQ
      </p>
      <h2 className="mt-4 text-center font-sans text-[32px] font-medium text-black md:text-[48px]">
        Your Questions, Answered
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div className="rounded-3xl bg-neutral-100 p-10">
          <Image
            src="/images/zRVCa2eOgJIf1mJK5PYcBLrYI.png"
            alt="Joris"
            width={48}
            height={48}
            className="rounded-full"
          />
          <p className="mt-6 text-lg text-black">
            <span className="font-bold">Have more questions?</span>{" "}
            <span className="font-normal">
              Book a free discovery call
            </span>
          </p>
          <a
            href="#"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-black py-3 pl-6 pr-5 text-white"
          >
            Book a Discovery Call
            <ArrowRight className="size-4" />
          </a>
          <p className="mt-6 text-sm text-black/60">
            Or, email me at{" "}
            <a href="mailto:joris@hanzo.com" className="text-accent-orange">
              joris@hanzo.com
            </a>
          </p>
        </div>

        <div>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="cursor-pointer border-b border-black/10 py-7"
                onClick={() => toggleIndex(index)}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-2xl font-normal text-black">
                    {item.question}
                  </span>
                  <Plus
                    className={cn(
                      "mt-1 size-5 shrink-0 text-accent-orange transition-transform duration-200",
                      isOpen && "rotate-45"
                    )}
                  />
                </div>
                {isOpen && (
                  <p className="mt-3 max-w-[90%] text-base text-black/60 transition-all duration-200">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
