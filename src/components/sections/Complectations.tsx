import { ArrowRight, Check, Minus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { SECTION_HEADING_CLASS } from "@/lib/typography";

type CellValue = string | boolean;

interface ComparisonRow {
  label: string;
  max: CellValue;
  ultra: CellValue;
}

const ROWS: ComparisonRow[] = [
  { label: "Колёса", max: "18″", ultra: "19″" },
  { label: "Шины", max: "215/55 R18", ultra: "225/45 R19" },
  { label: "Обогрев руля", max: false, ultra: true },
  { label: "Вентиляция передних сидений", max: false, ultra: true },
  { label: "Память настроек водителя", max: false, ultra: true },
  { label: "Беспроводная зарядка", max: false, ultra: true },
  { label: "Автопарковочный ассистент", max: false, ultra: true },
  { label: "ADAS уровня L2", max: true, ultra: true },
  { label: "Панорамная крыша", max: true, ultra: true },
  { label: "Электропривод багажника", max: true, ultra: true },
  { label: "Светодиодная оптика", max: true, ultra: true },
  { label: "6 подушек безопасности", max: true, ultra: true },
  { label: "Круговой обзор", max: true, ultra: true },
  { label: "Аудио 7.1, 14 динамиков", max: true, ultra: true },
];

function Cell({ value }: { value: CellValue }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check size={18} className="mx-auto text-black" />
    ) : (
      <Minus size={18} className="mx-auto text-black/25" />
    );
  }
  return (
    <span className="text-sm text-black/70 sm:text-base md:text-lg">
      {value}
    </span>
  );
}

export function Complectations() {
  return (
    <section
      id="complectations"
      className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]"
    >
      <Reveal rotate={-3} className="mx-auto flex w-fit items-center gap-4">
        <span
          className="hidden h-px w-12 bg-black/10 sm:block"
          aria-hidden="true"
        />
        <span className="font-serif text-2xl italic sm:text-3xl text-black/50">
          Комплектации
        </span>
        <span
          className="hidden h-px w-12 bg-black/10 sm:block"
          aria-hidden="true"
        />
      </Reveal>

      <AnimatedHeading
        text="Max vs Ultra"
        className={SECTION_HEADING_CLASS}
        delay={0.08}
      />

      <Reveal
        delay={0.16}
        rotate={-2}
        className="mx-auto mt-12 max-w-3xl overflow-x-auto"
      >
        <table className="w-full min-w-[480px] border-collapse text-sm sm:text-base md:text-lg">
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
                <th
                  scope="row"
                  className="py-4 pr-4 text-left font-normal text-black"
                >
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
          className="glass-edge-button inline-flex items-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-medium sm:pr-7 sm:pl-8 sm:text-base text-white transition-opacity hover:opacity-90"
        >
          Запросить условия
          <ArrowRight size={16} />
        </a>
      </Reveal>
    </section>
  );
}
