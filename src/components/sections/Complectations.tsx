import { ArrowRight, Check, Minus } from "lucide-react";
import { Reveal } from "@/components/Reveal";

type CellValue = string | boolean;

interface ComparisonRow {
  label: string;
  max: CellValue;
  ultra: CellValue;
}

const ROWS: ComparisonRow[] = [
  { label: "Колёса", max: "18″", ultra: "19″" },
  { label: "Шины", max: "215/55 R18", ultra: "225/45 R19" },
  {
    label: "Цвета кузова (с чёрной крышей)",
    max: "Белый, серый, бежевый",
    ultra: "Белый, серый, бежевый, фиолетовый",
  },
  {
    label: "Цвет салона",
    max: "Чёрный, серый",
    ultra: "Чёрный, серый (+ розово-белый с фиолетовым кузовом)",
  },
  { label: "Обогрев руля", max: false, ultra: true },
  {
    label: "Обогрев передних сидений с вентиляцией",
    max: true,
    ultra: true,
  },
  { label: "Память настроек водителя", max: false, ultra: true },
  { label: "Беспроводная зарядка", max: false, ultra: true },
  { label: "Автопарковочный ассистент", max: false, ultra: true },
];

function Cell({ value }: { value: CellValue }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check size={18} className="mx-auto text-black" />
    ) : (
      <Minus size={18} className="mx-auto text-black/25" />
    );
  }
  return <span className="text-sm text-black/70 md:text-base">{value}</span>;
}

export function Complectations() {
  return (
    <section
      id="complectations"
      className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]"
    >
      <Reveal rotate={-3} className="mx-auto flex w-fit items-center gap-4">
        <span className="h-px w-12 bg-black/10" aria-hidden="true" />
        <span className="font-serif text-2xl italic text-black/50">
          Комплектации
        </span>
        <span className="h-px w-12 bg-black/10" aria-hidden="true" />
      </Reveal>

      <Reveal delay={0.08} rotate={3}>
        <h2 className="mt-4 text-center text-3xl font-normal text-black md:text-4xl">
          Max vs Ultra
        </h2>
      </Reveal>

      <Reveal
        delay={0.16}
        rotate={-2}
        className="mx-auto mt-12 max-w-3xl overflow-x-auto"
      >
        <table className="w-full min-w-[480px] border-collapse text-sm md:text-base">
          <thead>
            <tr className="border-b border-black/10">
              <th className="py-3 text-left font-normal text-black/50">
                Параметр
              </th>
              <th className="w-28 py-3 text-center font-bold text-black">
                Max
              </th>
              <th className="w-28 py-3 text-center font-bold text-black">
                Ultra
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label} className="border-b border-black/10">
                <th scope="row" className="py-4 pr-4 text-left font-normal text-black">
                  {row.label}
                </th>
                <td className="py-4 text-center">
                  <Cell value={row.max} />
                </td>
                <td className="py-4 text-center">
                  <Cell value={row.ultra} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <Reveal delay={0.24} rotate={2} className="mt-10 flex justify-center">
        <a
          href="#lead-form"
          className="inline-flex items-center gap-2 rounded-full bg-black py-3 pl-6 pr-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Запросить условия
          <ArrowRight size={16} />
        </a>
      </Reveal>
    </section>
  );
}
