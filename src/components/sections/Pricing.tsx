"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { nbsp, SECTION_HEADING_CLASS  } from "@/lib/typography";

type StockKey = "retail" | "demo";
type TrimKey = "max" | "ultra";

interface TrimOffer {
  name: string;
  price: string;
  note: string;
  highlights: string[];
  popular: boolean;
}

const OFFERS: Record<StockKey, Record<TrimKey, TrimOffer>> = {
  retail: {
    max: {
      name: "Max — товарный",
      price: "103 000 ¥",
      note: "от 1 автомобиля",
      highlights: [
        "Диски 18″ (215/55 R18)",
        "ADAS уровня L2",
        "Панорамная крыша",
        "Чёрная крыша в базе",
        "3 цвета кузова",
      ],
      popular: false,
    },
    ultra: {
      name: "Ultra — товарный",
      price: "113 000 ¥",
      note: "от 1 автомобиля",
      highlights: [
        "Диски 19″ (225/45 R19)",
        "Все опции Max",
        "Обогрев руля",
        "Вентиляция передних сидений",
        "Автопарковочный ассистент",
        "Беспроводная зарядка",
      ],
      popular: true,
    },
  },
  demo: {
    max: {
      name: "Max — демо",
      price: "96 000 ¥",
      note: "при покупке от 2 а/м, 1 для шоурума",
      highlights: [
        "Та же комплектация Max",
        "Специальная цена",
        "Для демонстрации в салоне",
      ],
      popular: false,
    },
    ultra: {
      name: "Ultra — демо",
      price: "103 000 ¥",
      note: "при покупке от 2 а/м, 1 для шоурума",
      highlights: [
        "Та же комплектация Ultra",
        "Специальная цена",
        "Для демонстрации в салоне",
      ],
      popular: false,
    },
  },
};

const TERMS: string[] = [
  "100% предоплата в юанях на банковский счёт в Китае до готовности к отгрузке",
  "Доставка до СВХ Москвы с транспортной страховкой — за доплату",
  "Доплата за фиолетовый (Twilight Purple) — +1 200 ¥, за зелёный (Forest Green) — +1 500 ¥",
  "Клиент самостоятельно организует таможенное оформление и получение документов (СБКТС, ЭПТС)",
  "Автомобили без гарантии, поставка запчастей на коммерческой основе",
];

interface StockToggleProps {
  stock: StockKey;
  onChange: (stock: StockKey) => void;
}

function StockToggle({ stock, onChange }: StockToggleProps) {
  const isDemo = stock === "demo";

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => onChange("retail")}
        className={cn(
          "text-lg font-medium transition-colors",
          isDemo ? "text-black/25" : "text-black",
        )}
      >
        Товарный
      </button>
      <button
        type="button"
        role="switch"
        aria-checked={isDemo}
        aria-label="Переключить между товарным автомобилем и демо-образцом"
        onClick={() => onChange(isDemo ? "retail" : "demo")}
        className={cn(
          "relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200",
          isDemo ? "bg-accent-orange" : "bg-black/10",
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 left-0.5 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-white transition-transform duration-200",
            isDemo ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
      <button
        type="button"
        onClick={() => onChange("demo")}
        className={cn(
          "text-lg font-medium transition-colors",
          isDemo ? "text-black" : "text-black/25",
        )}
      >
        Демо
      </button>
    </div>
  );
}

function OfferCard({ offer }: { offer: TrimOffer }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl p-6 md:p-8",
        offer.popular ? "bg-black text-white" : "bg-white text-black",
      )}
    >
      {offer.popular && (
        <span className="absolute -top-3 right-6 rounded-full bg-accent-orange px-4 py-1.5 text-sm font-medium text-white">
          популярный
        </span>
      )}

      <h3
        className={cn(
          "text-xl font-medium",
          offer.popular ? "text-white" : "text-black",
        )}
      >
        {offer.name}
      </h3>

      <p className="mt-4 text-4xl font-medium md:text-5xl">{offer.price}</p>
      <p
        className={cn(
          "mt-2 text-base",
          offer.popular ? "text-white/50" : "text-black/40",
        )}
      >
        {nbsp(offer.note)}
      </p>

      <ul className="mt-6 flex flex-col gap-3">
        {offer.highlights.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check
              size={18}
              className={cn(
                "mt-0.5 shrink-0",
                offer.popular ? "text-accent-orange" : "text-black/60",
              )}
            />
            <span
              className={cn(
                "text-base",
                offer.popular ? "text-white/80" : "text-black/60",
              )}
            >
              {nbsp(item)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Pricing() {
  const [stock, setStock] = useState<StockKey>("retail");
  const offers = OFFERS[stock];

  return (
    <section
      id="pricing"
      className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]"
    >
      <Reveal rotate={-3} className="mx-auto flex w-fit items-center gap-4">
        <span
          className="hidden h-px w-12 bg-black/10 sm:block"
          aria-hidden="true"
        />
        <span className="font-serif text-2xl italic sm:text-3xl text-black/50">
          Цены и условия
        </span>
        <span
          className="hidden h-px w-12 bg-black/10 sm:block"
          aria-hidden="true"
        />
      </Reveal>

      <AnimatedHeading
        text="Max или Ultra"
        className={SECTION_HEADING_CLASS}
        delay={0.08}
      />

      <Reveal
        delay={0.16}
        rotate={-2}
        className="glass-edge relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-[32px] bg-neutral-100 p-6 md:p-12"
      >
        <div className="flex justify-center">
          <StockToggle stock={stock} onChange={setStock} />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <OfferCard offer={offers.max} />
          <OfferCard offer={offers.ultra} />
        </div>

        <div className="mt-10 border-t border-black/10 pt-6">
          <p className="text-base font-bold text-black">Условия поставки</p>
          <ul className="mt-4 flex flex-col gap-2">
            {TERMS.map((term) => (
              <li key={term} className="flex items-start gap-3">
                <span
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-black/30"
                  aria-hidden="true"
                />
                <span className="text-base text-black/60">{nbsp(term)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.24} rotate={2} className="mt-10 flex justify-center">
        <a
          href="#lead-form"
          className="glass-edge-button inline-flex items-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-medium sm:pr-7 sm:pl-8 sm:text-base text-white transition-opacity hover:opacity-90"
        >
          Получить коммерческое предложение
          <ArrowRight size={16} />
        </a>
      </Reveal>
    </section>
  );
}
