import { Reveal } from "@/components/Reveal";

interface SpecRow {
  label: string;
  value: string;
}

const SPECS: SpecRow[] = [
  { label: "Класс", value: "Компактный кроссовер (B-SUV)" },
  { label: "Габариты Д×Ш×В", value: "4350 × 1820 × 1625 мм" },
  { label: "Колёсная база", value: "2640 мм" },
  { label: "Двигатель", value: "1.5T бензин, 4-цилиндровый турбо" },
  { label: "Трансмиссия", value: "7DCT (роботизированная, 7 ступеней)" },
  { label: "Мощность", value: "114 кВт / 156 л.с." },
  { label: "Привод", value: "Передний (FWD)" },
  { label: "Топливный бак", value: "51 л" },
  { label: "Объём багажника", value: "353 л" },
  { label: "Подвеска передняя", value: "Независимая, МакФерсон" },
  {
    label: "Подвеска задняя",
    value:
      "Независимая многорычажная со стабилизатором поперечной устойчивости",
  },
  { label: "Количество мест", value: "5" },
  { label: "Снаряжённая масса", value: "1880 кг" },
  { label: "Диски Max", value: "18″ (215/55 R18)" },
  { label: "Диски Ultra", value: "19″ (225/45 R19)" },
  { label: "Безопасность", value: "6 подушек безопасности, ADAS L2" },
];

export function Specs() {
  return (
    <section id="specs" className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]">
      <Reveal rotate={-3} className="mx-auto flex w-fit items-center gap-4">
        <span className="h-px w-12 bg-black/10" aria-hidden="true" />
        <span className="font-serif text-2xl italic text-black/50">
          Технические характеристики
        </span>
        <span className="h-px w-12 bg-black/10" aria-hidden="true" />
      </Reveal>

      <Reveal delay={0.1} rotate={3} className="mx-auto mt-12 max-w-3xl">
        <table className="w-full border-collapse text-sm md:text-base">
          <tbody>
            {SPECS.map((row) => (
              <tr key={row.label} className="border-b border-black/10">
                <th
                  scope="row"
                  className="w-1/2 py-4 pr-4 text-left font-normal text-black/50"
                >
                  {row.label}
                </th>
                <td className="py-4 pl-4 text-left font-medium text-black">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <Reveal delay={0.2} rotate={-2}>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-black/40">
          База 2640 мм — на 20–40 мм больше, чем у большинства конкурентов в
          классе. Версия 114 кВт (156 л.с.) подпадает под льготный
          утилизационный сбор.
        </p>
      </Reveal>
    </section>
  );
}
