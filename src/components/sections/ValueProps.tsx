import { PackageCheck, Truck, Car, ShieldCheck, Languages } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface ValueProp {
  title: string;
  description: string;
  icon: LucideIcon;
}

const VALUE_PROPS: ValueProp[] = [
  {
    title: "В наличии сейчас",
    description:
      "автомобили на складе партнёра в Хоргосе, готовы к отгрузке.",
    icon: PackageCheck,
  },
  {
    title: "Доставка по СНГ",
    description: "организуем логистику с транспортной страховкой.",
    icon: Truck,
  },
  {
    title: "Отгрузка от 1 автомобиля",
    description: "тестируйте спрос без обязательств по объёму.",
    icon: Car,
  },
  {
    title: "ADAS уровня L2 в базе",
    description: "полный пакет ассистентов в обеих комплектациях.",
    icon: ShieldCheck,
  },
  {
    title: "Мультимедиа на русском",
    description: "система локализована.",
    icon: Languages,
  },
];

export function ValueProps() {
  return (
    <section
      id="value-props"
      className="px-6 py-16 md:px-16 md:py-20 lg:px-[120px]"
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {VALUE_PROPS.map(({ title, description, icon: Icon }, i) => (
          <Reveal
            key={title}
            delay={i * 0.08}
            rotate={i % 2 === 0 ? 3 : -3}
            className="flex flex-col gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-black">
              <Icon size={18} />
            </span>
            <p className="text-base text-black">
              <span className="font-bold">{title}</span>{" "}
              <span className="text-black/60">{description}</span>
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
