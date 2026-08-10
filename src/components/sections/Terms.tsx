import { Reveal } from "@/components/Reveal";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { nbsp, SECTION_HEADING_CLASS  } from "@/lib/typography";
import { cn } from "@/lib/utils";

interface TermItem {
  label: string;
  description: string;
}

const TERMS: TermItem[] = [
  {
    label: "Оплата",
    description:
      "100% предоплата в юанях на счёт в Китае до готовности к отгрузке.",
  },
  {
    label: "Гарантия",
    description:
      "автомобили поставляются без заводской гарантии. Поставку запчастей организуем на коммерческой основе.",
  },
  {
    label: "Доставка",
    description:
      "до СВХ Москвы с транспортной страховкой — за доплату. Для других регионов рассчитывается отдельно.",
  },
  {
    label: "Таможня",
    description:
      "клиент самостоятельно организует таможенное оформление и получение документов (СБКТС, ЭПТС). Рекомендуем проверенного партнёра «под ключ»: растаможка, лаборатория, документы.",
  },
  {
    label: "Актуальность",
    description: "коммерческое предложение действует в рамках текущего месяца.",
  },
  {
    label: "Демонстрационный автомобиль",
    description: "специальные условия при закупке от двух единиц.",
  },
];

export function Terms() {
  return (
    <section id="terms" className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]">
      <AnimatedHeading
        text="Условия и ответственность"
        className={cn(SECTION_HEADING_CLASS, "mt-0")}
      />

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
        {TERMS.map((term, i) => (
          <Reveal
            key={term.label}
            delay={(i % 2) * 0.1}
            rotate={i % 2 === 0 ? 2 : -2}
            className="border-t border-black/10 pt-4"
          >
            <p className="text-base text-black sm:text-lg">
              <span className="font-bold">{term.label}</span>{" "}
              <span className="text-black/60">— {nbsp(term.description)}</span>
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
