import { MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const COUNTRIES = [
  "Россия",
  "Казахстан",
  "Узбекистан",
  "Кыргызстан",
  "Беларусь",
  "Таджикистан",
];

export function Geography() {
  return (
    <section
      id="geography"
      className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]"
    >
      <Reveal rotate={-3} className="mx-auto flex w-fit items-center gap-4">
        <span className="h-px w-12 bg-black/10" aria-hidden="true" />
        <span className="font-serif text-2xl italic text-black/50">
          География поставок
        </span>
        <span className="h-px w-12 bg-black/10" aria-hidden="true" />
      </Reveal>

      <Reveal delay={0.1} rotate={3}>
        <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-black/60 md:text-lg">
          Работаем с партнёрами в странах СНГ. Автомобили отгружаются со
          склада в Хоргосе, маршрут и способ доставки подбираем под ваш
          регион. Логистика, сроки и стоимость доставки рассчитываются
          индивидуально и указываются в коммерческом предложении.
        </p>
      </Reveal>

      <Reveal
        delay={0.2}
        rotate={-2}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        {COUNTRIES.map((country) => (
          <span
            key={country}
            className="flex items-center gap-2 rounded-full border border-black/10 bg-neutral-100 px-4 py-2 text-sm text-black"
          >
            <MapPin size={14} className="text-black/40" />
            {country}
          </span>
        ))}
      </Reveal>

      <Reveal delay={0.3} rotate={2}>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-black/40">
          Требования к сертификации и таможенному оформлению различаются по
          странам. Условия для вашего региона уточняйте при запросе
          предложения.
        </p>
      </Reveal>
    </section>
  );
}
