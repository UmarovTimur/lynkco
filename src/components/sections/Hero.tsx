import { ArrowRight } from "lucide-react";

const SPECS = ["1.5T", "156 л.с.", "7DCT", "Передний привод"];

export function Hero() {
  return (
    <section
      id="hero"
      className="flex w-full flex-col items-center justify-center px-[120px] max-lg:px-8 max-sm:px-4"
    >
      <div className="flex w-full max-w-[1440px] flex-col items-center gap-8 py-24 pt-[180px] pb-[118px] max-lg:pt-36 max-lg:pb-20 max-sm:pt-28 max-sm:pb-16">
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(12,179,0)]" />
          <span className="text-xs text-black">
            Прямые поставки по параллельному импорту
          </span>
        </div>

        <h1 className="max-w-4xl text-center font-sans text-5xl font-normal leading-[1.15] tracking-[-0.03em] text-black md:text-7xl lg:text-[88px] lg:tracking-[-0.04em]">
          Lynk &amp; Co 06 —{" "}
          <span className="text-black/35">компактный кроссовер</span> из
          Китая для вас
        </h1>

        <p className="max-w-xl text-center text-base leading-[1.7] text-black/50">
          Прямые поставки по параллельному импорту. Автомобили в наличии на
          складе в Хоргосе, отгрузка от одной единицы, доставка по странам
          СНГ.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-black/60">
          {SPECS.map((spec, i) => (
            <span key={spec} className="flex items-center gap-3">
              <span className="font-medium text-black">{spec}</span>
              {i < SPECS.length - 1 && (
                <span aria-hidden="true" className="text-black/20">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#lead-form"
            className="flex h-[51px] items-center gap-2 rounded-full bg-black py-3 pl-6 pr-5 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            Получить коммерческое предложение
            <ArrowRight size={16} />
          </a>
          <a
            href="#stock"
            className="flex h-[51px] items-center gap-2 rounded-full border border-black/15 bg-white py-3 pl-6 pr-5 text-sm font-medium text-black transition-colors hover:bg-black/5"
          >
            Смотреть наличие на складе
          </a>
        </div>

        <p className="max-w-lg text-center text-xs text-black/40">
          Цены и условия поставки предоставляем индивидуально по запросу от
          юридического лица.
        </p>
      </div>
    </section>
  );
}
