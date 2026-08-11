import { Reveal } from "@/components/Reveal";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { nbsp, SECTION_HEADING_CLASS  } from "@/lib/typography";
import { cn } from "@/lib/utils";

interface ProcessStep {
  index: number;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    index: 1,
    title: "Заявка и подбор",
    description:
      "Вы сообщаете комплектации, цвета, количество и регион поставки. Проверяем наличие на складе и резервируем автомобили.",
  },
  {
    index: 2,
    title: "Коммерческое предложение и инвойс",
    description:
      "Направляем условия под ваш объём и регион, выставляем инвойс.",
  },
  {
    index: 3,
    title: "Оплата",
    description:
      "100% предоплата в юанях на банковский счёт в Китае до готовности к отгрузке.",
  },
  {
    index: 4,
    title: "Отгрузка со склада в Хоргосе",
    description: "Автомобили выходят со склада после подтверждения оплаты.",
  },
  {
    index: 5,
    title: "Доставка в вашу страну",
    description:
      "Доставка до СВХ Москвы с транспортной страховкой — за доплату. Для других направлений маршрут, сроки и стоимость рассчитываются индивидуально.",
  },
  {
    index: 6,
    title: "Таможенное оформление и документы",
    description:
      "Растаможку, лабораторию и получение СБКТС и ЭПТС клиент организует самостоятельно. Рекомендуем проверенного партнёра «под ключ».",
  },
  {
    index: 7,
    title: "Передача клиенту",
    description:
      "Забираете автомобили с полным комплектом документов на каждую единицу — можно ставить на учёт и выводить в продажу.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="mx-auto max-w-[1440px] px-6 py-24 max-lg:px-8 md:px-16 md:py-32 lg:px-[120px]"
    >
      <Reveal rotate={-3} className="mx-auto flex w-fit items-center gap-4">
        <span
          className="hidden h-px w-12 bg-black/10 sm:block"
          aria-hidden="true"
        />
        <span className="font-serif text-2xl italic sm:text-3xl text-black/50">
          Схема поставки
        </span>
        <span
          className="hidden h-px w-12 bg-black/10 sm:block"
          aria-hidden="true"
        />
      </Reveal>
      <AnimatedHeading
        text="Как проходит сделка"
        className={SECTION_HEADING_CLASS}
        delay={0.1}
      />

      <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        {PROCESS_STEPS.map((step, i) => (
          <Reveal
            key={step.index}
            delay={(i % 2) * 0.1}
            rotate={i % 2 === 0 ? 2 : -2}
            className={cn(
              "flex gap-5",
              // An odd number of steps leaves the last one alone in the final
              // row, hard against the left edge, where it reads as a layout
              // accident rather than a step. Spanning both columns and holding
              // it to one column's width — half the grid minus half the 3rem
              // gap-x — centres it without letting it grow wider than its
              // neighbours. Derived from the array length, so adding an eighth
              // step drops the treatment on its own.
              i === PROCESS_STEPS.length - 1 &&
                PROCESS_STEPS.length % 2 === 1 &&
                "md:col-span-2 md:mx-auto md:w-[calc(50%-1.5rem)]",
            )}
          >
            <span className="glass-edge-button flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-base font-medium text-white sm:h-14 sm:w-14 sm:text-lg">
              {step.index}
            </span>
            <div>
              <h3 className="text-lg font-bold text-black sm:text-xl">
                Шаг {step.index}. {nbsp(step.title)}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-black/60 sm:text-lg">
                {nbsp(step.description)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
