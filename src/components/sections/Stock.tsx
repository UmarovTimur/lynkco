import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { SECTION_HEADING_CLASS } from "@/lib/typography";

interface ColorRow {
  name: string;
  swatch: string;
  availability: string;
  status: string;
}

const BODY_COLORS: ColorRow[] = [
  {
    name: "Белый",
    swatch: "#f2f2f2",
    availability: "Max, Ultra",
    status: "Базовый",
  },
  {
    name: "Серый",
    swatch: "#8a8a8a",
    availability: "Max, Ultra",
    status: "Базовый",
  },
  {
    name: "Бежевый",
    swatch: "#d8c9a8",
    availability: "Max, Ultra",
    status: "Базовый",
  },
  {
    name: "Фиолетовый (Twilight Purple)",
    swatch: "#5b3a72",
    availability: "Только Ultra",
    status: "+1 200 ¥",
  },
  {
    name: "Зелёный (Forest Green)",
    swatch: "#2f4a3c",
    availability: "Только Ultra",
    status: "+1 500 ¥",
  },
];

const INTERIOR_COLORS: ColorRow[] = [
  {
    name: "Чёрный",
    swatch: "#1e1e1e",
    availability: "Max, Ultra",
    status: "Базовый",
  },
  {
    name: "Серый",
    swatch: "#9b9b9b",
    availability: "Max, Ultra",
    status: "Базовый",
  },
  {
    name: "Розово-белый",
    swatch: "#efdada",
    availability: "Только Ultra",
    status: "С фиолетовым кузовом",
  },
];

function ColorTable({
  colors,
  heading,
}: {
  colors: ColorRow[];
  heading: string;
}) {
  return (
    <table className="w-full min-w-[420px] border-collapse text-sm sm:text-base md:text-lg">
      <thead>
        <tr className="border-b border-black/10">
          <th className="py-3 text-left font-normal text-black/50">
            {heading}
          </th>
          <th className="py-3 text-left font-normal text-black/50">
            Доступность
          </th>
          <th className="py-3 text-right font-normal text-black/50">Статус</th>
        </tr>
      </thead>
      <tbody>
        {colors.map((c) => (
          <tr key={c.name} className="border-b border-black/10">
            <th
              scope="row"
              className="flex items-center gap-2 py-4 pr-4 text-left font-normal text-black"
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full border border-black/10"
                style={{ backgroundColor: c.swatch }}
                aria-hidden="true"
              />
              {c.name}
            </th>
            <td className="py-4 pr-4 text-left text-black/70">
              {c.availability}
            </td>
            <td className="py-4 text-right">
              <span
                className={
                  c.status === "Базовый"
                    ? "text-black/50"
                    : "text-accent-orange"
                }
              >
                {c.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Stock() {
  return (
    <section id="stock" className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]">
      <div className="flex flex-col items-center">
        <Reveal rotate={-3} className="mx-auto flex w-fit items-center gap-4">
          <span
            className="hidden h-px w-12 bg-black/10 sm:block"
            aria-hidden="true"
          />
          <span className="font-serif text-2xl italic sm:text-3xl text-black/50">
            Наличие на складе
          </span>
          <span
            className="hidden h-px w-12 bg-black/10 sm:block"
            aria-hidden="true"
          />
        </Reveal>

        <AnimatedHeading
          text="Наличие на складе в Хоргосе"
          className={SECTION_HEADING_CLASS}
          delay={0.08}
        />

        <Reveal delay={0.16} rotate={-2}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base font-medium text-black/70">
            Наличие меняется ежедневно — уточняйте актуальный остаток перед
            бронированием.
          </p>
        </Reveal>

        <Reveal
          delay={0.24}
          rotate={2}
          className="mx-auto mt-10 w-full max-w-2xl overflow-x-auto"
        >
          <ColorTable colors={BODY_COLORS} heading="Цвет кузова" />
        </Reveal>

        <Reveal
          delay={0.32}
          rotate={-2}
          className="mx-auto mt-10 w-full max-w-2xl overflow-x-auto"
        >
          <ColorTable colors={INTERIOR_COLORS} heading="Цвет салона" />
        </Reveal>

        <Reveal delay={0.4} rotate={3} className="mt-8 flex justify-center">
          <a
            href="#lead-form"
            className="glass-edge-button flex h-14 items-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-medium sm:pr-7 sm:pl-8 sm:text-base text-white transition-opacity hover:opacity-90"
          >
            Забронировать автомобили
            <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
