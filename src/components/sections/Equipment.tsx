import {
  ShieldCheck,
  ShieldHalf,
  Armchair,
  Volume2,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface EquipmentCategory {
  title: string;
  description: string;
  icon: LucideIcon;
}

const CATEGORIES: EquipmentCategory[] = [
  {
    title: "Безопасность и помощь водителю",
    description:
      "Контроль слепых зон, ассистент спуска с горы, удержание в полосе, экстренное автоторможение, парковка, круговой обзор, адаптивный круиз-контроль, ADAS уровня L2.",
    icon: ShieldCheck,
  },
  {
    title: "Пассивная безопасность",
    description:
      "6 подушек безопасности, включая боковые шторки; каркас кузова — 63% высокопрочной стали и алюминиевых сплавов.",
    icon: ShieldHalf,
  },
  {
    title: "Комфорт",
    description:
      "Обогрев боковых зеркал, обогрев заднего стекла, панорамная крыша, электропривод двери багажника.",
    icon: Armchair,
  },
  {
    title: "Мультимедиа",
    description: "Система на русском языке, 14 динамиков, аудиосистема 7.1.",
    icon: Volume2,
  },
  {
    title: "Экстерьер",
    description: "Полностью светодиодная оптика, чёрная крыша.",
    icon: Sparkles,
  },
];

export function Equipment() {
  return (
    <section
      id="equipment"
      className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]"
    >
      <Reveal rotate={-3} className="mx-auto flex w-fit items-center gap-4">
        <span className="h-px w-12 bg-black/10" aria-hidden="true" />
        <span className="font-serif text-2xl italic text-black/50">
          Оснащение
        </span>
        <span className="h-px w-12 bg-black/10" aria-hidden="true" />
      </Reveal>

      <Reveal delay={0.08} rotate={3}>
        <h2 className="mt-4 text-center text-3xl font-normal text-black md:text-4xl">
          Общее для обеих комплектаций
        </h2>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map(({ title, description, icon: Icon }, i) => (
          <Reveal
            key={title}
            delay={0.16 + i * 0.06}
            rotate={i % 2 === 0 ? 3 : -3}
            className="rounded-2xl bg-neutral-100 p-6"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
              <Icon size={18} />
            </span>
            <h3 className="mt-4 text-base font-bold text-black">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-black/60">
              {description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
