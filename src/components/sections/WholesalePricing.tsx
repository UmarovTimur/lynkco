import { LynkCoLogo } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

interface PriceRow {
  model: string;
  purpose: string;
  max: string;
  ultra: string;
}

const ROWS: PriceRow[] = [
  { model: "Lynk & Co", purpose: "Товарный а/м", max: "103 000 CNY", ultra: "113 000 CNY" },
  {
    model: "06 (версия для экспорта)",
    purpose: "Демонстрационный образец (1 ед.)",
    max: "96 000 CNY",
    ultra: "103 000 CNY",
  },
];

export function WholesalePricing() {
  return (
    <section
      id="wholesale-pricing"
      className="bg-[#131313] px-6 py-16 text-white md:px-16 md:py-24 lg:px-[120px]"
    >
      <Reveal className="mx-auto flex justify-center">
        <LynkCoLogo className="h-8 w-auto text-white md:h-9" />
      </Reveal>

      <Reveal
        delay={0.1}
        className="mx-auto mt-14 w-full max-w-4xl overflow-x-auto"
      >
        <table className="w-full min-w-[640px] border-collapse border border-[#c09348]/60 text-sm md:text-base">
          <thead>
            <tr>
              <th
                rowSpan={2}
                className="border border-[#c09348]/60 px-4 py-4 text-center font-semibold"
              >
                Модель
              </th>
              <th
                rowSpan={2}
                className="border border-[#c09348]/60 px-4 py-4 text-center font-semibold"
              >
                Назначение
              </th>
              <th
                colSpan={2}
                className="border border-[#c09348]/60 px-4 py-4 text-center font-semibold"
              >
                Цена со склада в Хоргосе (Китай), юань
              </th>
            </tr>
            <tr>
              <th className="border border-[#c09348]/60 px-4 py-4 text-center font-semibold">
                Комплектация Max
              </th>
              <th className="border border-[#c09348]/60 px-4 py-4 text-center font-semibold">
                Комплектация Ultra
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.model}>
                <td className="border border-[#c09348]/60 px-4 py-5 text-center">
                  {row.model}
                </td>
                <td className="border border-[#c09348]/60 px-4 py-5 text-center text-white/90">
                  {row.purpose}
                </td>
                <td className="border border-[#c09348]/60 px-4 py-5 text-center">
                  {row.max}
                </td>
                <td className="border border-[#c09348]/60 px-4 py-5 text-center">
                  {row.ultra}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </section>
  );
}
