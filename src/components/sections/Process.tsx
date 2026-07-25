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
      "Организуем доставку по странам СНГ с транспортной страховкой. Маршрут, сроки и стоимость рассчитываются индивидуально.",
  },
  {
    index: 6,
    title: "Таможенное оформление и документы",
    description:
      "Мы полностью берем на себя организацию сертификации, таможенного оформления и подготовку всех необходимых документов.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="mx-auto max-w-[1440px] px-6 py-24 max-lg:px-8 md:px-16 md:py-32 lg:px-[120px]"
    >
      <div className="mx-auto flex w-fit items-center gap-4">
        <span className="h-px w-12 bg-black/10" aria-hidden="true" />
        <span className="font-serif text-2xl italic text-black/50">
          Схема поставки
        </span>
        <span className="h-px w-12 bg-black/10" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-center text-4xl font-normal text-black md:text-5xl">
        Как проходит сделка
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        {PROCESS_STEPS.map((step) => (
          <div key={step.index} className="flex gap-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-base font-medium text-white">
              {step.index}
            </span>
            <div>
              <h3 className="text-lg font-bold text-black">
                Шаг {step.index}. {step.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-black/60">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
