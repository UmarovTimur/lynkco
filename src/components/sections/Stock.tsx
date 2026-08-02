import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface ColorRow {
  name: string;
  swatch: string;
  availability: string;
  status: string;
}

const COLORS: ColorRow[] = [
  { name: "Белый", swatch: "#f2f2f2", availability: "Max, Ultra", status: "Базовый" },
  { name: "Серый", swatch: "#8a8a8a", availability: "Max, Ultra", status: "Базовый" },
  { name: "Бежевый", swatch: "#d8c9a8", availability: "Max, Ultra", status: "Базовый" },
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

export function Stock() {
  return (
    <section id="stock" className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]">
      <div className="flex flex-col items-center">
        <Reveal rotate={-3} className="mx-auto flex w-fit items-center gap-4">
          <span className="h-px w-12 bg-black/10" aria-hidden="true" />
          <span className="font-serif text-2xl italic text-black/50">
            Наличие на складе
          </span>
          <span className="h-px w-12 bg-black/10" aria-hidden="true" />
        </Reveal>

        <Reveal delay={0.08} rotate={3}>
          <h2 className="mt-4 text-center text-3xl font-normal text-black md:text-5xl">
            Наличие на складе в Хоргосе
          </h2>
        </Reveal>

        <Reveal delay={0.16} rotate={-2}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm font-medium text-black/70">
            Наличие меняется ежедневно — уточняйте актуальный остаток перед
            бронированием.
          </p>
        </Reveal>

        <Reveal
          delay={0.24}
          rotate={2}
          className="mx-auto mt-10 w-full max-w-2xl overflow-x-auto"
        >
          <table className="w-full min-w-[420px] border-collapse text-sm md:text-base">
            <thead>
              <tr className="border-b border-black/10">
                <th className="py-3 text-left font-normal text-black/50">
                  Цвет
                </th>
                <th className="py-3 text-left font-normal text-black/50">
                  Доступность
                </th>
                <th className="py-3 text-right font-normal text-black/50">
                  Статус
                </th>
              </tr>
            </thead>
            <tbody>
              {COLORS.map((c) => (
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
        </Reveal>

        <Reveal delay={0.32} rotate={3} className="mt-8 flex justify-center">
          <a
            href="#lead-form"
            className="flex h-[51px] items-center gap-2 rounded-full bg-black py-3 pl-6 pr-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Забронировать автомобили
            <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
