import { ArrowRight } from "lucide-react";

const SPECIAL_COLORS = [
  { name: "Twilight Purple", swatch: "#5b3a72" },
  { name: "Forest Green", swatch: "#2f4a3c" },
];

export function Stock() {
  return (
    <section id="stock" className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]">
      <div className="mx-auto flex w-fit items-center gap-4">
        <span className="h-px w-12 bg-black/10" aria-hidden="true" />
        <span className="font-serif text-2xl italic text-black/50">
          Наличие на складе
        </span>
        <span className="h-px w-12 bg-black/10" aria-hidden="true" />
      </div>

      <h2 className="mt-4 text-center text-3xl font-normal text-black md:text-5xl">
        Наличие на складе в Хоргосе
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-center text-sm font-medium text-black/70">
        Наличие меняется ежедневно — уточняйте актуальный остаток перед
        бронированием.
      </p>

      <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-black/60">
        Доступны все заявленные цветовые варианты. Отдельные цвета кузова —{" "}
        {SPECIAL_COLORS.map((c, i) => (
          <span key={c.name} className="font-medium text-black">
            {c.name}
            {i < SPECIAL_COLORS.length - 1 ? " и " : ""}
          </span>
        ))}{" "}
        — поставляются на особых условиях, детали указываются в коммерческом
        предложении.
      </p>

      <div className="mt-6 flex items-center justify-center gap-4">
        {SPECIAL_COLORS.map((c) => (
          <span
            key={c.name}
            className="flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 text-xs text-black/60"
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: c.swatch }}
              aria-hidden="true"
            />
            {c.name}
          </span>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href="#lead-form"
          className="flex h-[51px] items-center gap-2 rounded-full bg-black py-3 pl-6 pr-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Забронировать автомобили
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
