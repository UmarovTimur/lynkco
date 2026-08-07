"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { SECTION_HEADING_CLASS } from "@/lib/typography";
import { FAQ_ITEMS } from "@/lib/faq";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="px-6 py-24 md:px-[120px]">
      <Reveal rotate={-3}>
        <p className="text-center font-serif text-2xl italic sm:text-3xl text-black/50">
          FAQ
        </p>
      </Reveal>
      <AnimatedHeading
        text="Ответы на частые вопросы"
        className={SECTION_HEADING_CLASS}
        delay={0.08}
      />

      <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-[35fr_65fr] md:gap-16">
        {/* self-start keeps this card at its content height — as a grid item it
            would otherwise stretch to match the full height of the FAQ list. */}
        <Reveal
          delay={0.1}
          rotate={-2}
          className="glass-edge self-start rounded-3xl bg-neutral-100 p-6 md:p-8"
        >
          <p className="text-lg leading-snug text-black">
            <span className="font-bold">Остались вопросы?</span>
            <br />
            <span className="font-normal text-black/70">
              Оставьте заявку от юридического лица
            </span>
          </p>
          <a
            href="#lead-form"
            className="glass-edge-button mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-center text-sm font-medium text-white transition-opacity hover:opacity-90 sm:pr-7 sm:pl-8 sm:text-base"
          >
            Получить коммерческое предложение
            {/* This label can't fit one line inside the sidebar card at phone
                widths; hiding the arrow lets the two wrapped lines sit centred
                instead of being shoved left by an icon pinned to the edge. */}
            <ArrowRight className="hidden size-4 sm:block" />
          </a>
          <p className="mt-4 text-center text-base text-black/40">
            Отвечаем в рабочие дни
          </p>
        </Reveal>

        <Reveal delay={0.2} rotate={2}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="cursor-pointer border-b border-black/10 py-7"
                onClick={() => toggleIndex(index)}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xl font-normal text-black md:text-2xl">
                    {item.question}
                  </span>
                  <Plus
                    className={cn(
                      "mt-1 size-5 shrink-0 text-accent-orange transition-transform duration-200",
                      isOpen && "rotate-45",
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
        </Reveal>
      </div>
    </section>
  );
}
