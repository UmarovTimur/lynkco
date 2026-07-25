import { Reveal } from "@/components/Reveal";

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
      "рассчитывается отдельно, исходя из региона поставки. Транспортная страховка включена.",
  },
  {
    label: "Таможня",
    description:
      "мы берем на себя полное таможенное оформление и подготовку всех необходимых документов.",
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
      <Reveal rotate={-2}>
        <h2 className="text-center text-3xl font-normal text-black md:text-4xl">
          Условия и ответственность
        </h2>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
        {TERMS.map((term, i) => (
          <Reveal
            key={term.label}
            delay={(i % 2) * 0.1}
            rotate={i % 2 === 0 ? 2 : -2}
            className="border-t border-black/10 pt-4"
          >
            <p className="text-base text-black">
              <span className="font-bold">{term.label}</span>{" "}
              <span className="text-black/60">— {term.description}</span>
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
