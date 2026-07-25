import { ArrowRight, Palette } from "lucide-react";

export function Complectations() {
  return (
    <section
      id="complectations"
      className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]"
    >
      <div className="mx-auto max-w-3xl rounded-[32px] bg-neutral-100 p-8 text-center md:p-16">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
          <Palette size={20} />
        </span>

        <h2 className="mt-6 text-3xl font-normal text-black md:text-4xl">
          Комплектации
        </h2>

        <p className="mt-4 text-base leading-relaxed text-black/60 md:text-lg">
          Обе комплектации доступны на складе в нескольких цветовых
          вариантах. Условия по каждой комплектации, включая специальные
          условия на демонстрационный автомобиль для вашего зала, направляем
          в коммерческом предложении.
        </p>

        <a
          href="#lead-form"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-black py-3 pl-6 pr-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Запросить условия
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
