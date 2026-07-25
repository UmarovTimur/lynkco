"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Двигатель трёхцилиндровый?",
    answer:
      "Да, 1.5-литровый турбированный трёхцилиндровый агрегат объёмом 1499 см³ в паре с 7-ступенчатым преселективом. Это современное решение, обеспечивающее отличную динамику при низком расходе топлива.",
  },
  {
    question: "Почему мощность 156 л.с.?",
    answer:
      "Мощность 114 кВт выбрана для экспортной спецификации — в странах ЕАЭС она попадает в льготную категорию по налогообложению и сборам.",
  },
  {
    question: "В какие страны поставляете?",
    answer:
      "Работаем по всем странам СНГ. Маршрут и сроки подбираем индивидуально под каждый регион.",
  },
  {
    question: "Сколько стоит доставка?",
    answer:
      "Стоимость зависит от удалённости и способа перевозки. Она рассчитывается при подготовке коммерческого предложения.",
  },
  {
    question: "Можно взять один автомобиль?",
    answer:
      "Да, минимальной партии нет. Вы можете заказать от одной единицы для теста спроса.",
  },
  {
    question: "Какие документы нужны для регистрации?",
    answer:
      "Состав документов зависит от страны ввоза. Для России и стран ЕАЭС основными являются СБКТС и ЭПТС. Мы консультируем по пакетам документов для каждой страны.",
  },
  {
    question: "Что с гарантией и запчастями?",
    answer:
      "Заводская гарантия не распространяется, что стандартно для параллельного импорта. Мы организуем поставку любых необходимых запчастей по вашему запросу.",
  },
  {
    question: "Как получить актуальный прайс?",
    answer:
      "Оставьте заявку от юридического лица. Условия формируются индивидуально под ваш объём и регион поставки.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="px-6 py-24 md:px-[120px]">
      <Reveal>
        <p className="text-center font-serif text-2xl italic text-black/50">
          FAQ
        </p>
        <h2 className="mt-4 text-center font-sans text-[32px] font-medium text-black md:text-[48px]">
          Ответы на частые вопросы
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <Reveal delay={0.1} className="rounded-3xl bg-neutral-100 p-10">
          <p className="text-lg text-black">
            <span className="font-bold">Остались вопросы?</span>{" "}
            <span className="font-normal">
              Оставьте заявку от юридического лица — ответим оперативно в
              рабочие дни.
            </span>
          </p>
          <a
            href="#lead-form"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-black py-3 pl-6 pr-5 text-white"
          >
            Получить коммерческое предложение
            <ArrowRight className="size-4" />
          </a>
        </Reveal>

        <Reveal delay={0.2}>
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
        </Reveal>
      </div>
    </section>
  );
}
