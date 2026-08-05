import { Shield, Radar, Volume2, Sun, BadgePercent, Ruler } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { SECTION_HEADING_CLASS } from "@/lib/typography";

interface EquipmentCategory {
  title: string;
  description: string;
  icon: LucideIcon;
  /**
   * Resting tilt. Kept under 2deg and alternating in sign so the row reads as
   * hand-pinned notes rather than a broken grid — the gap absorbs the corners.
   */
  tilt: string;
}

const CATEGORIES: EquipmentCategory[] = [
  {
    title: "Прочный кузов",
    description:
      "Доля высокопрочной стали и алюминиевых сплавов — 63%. 6 подушек безопасности, включая боковые шторки.",
    icon: Shield,
    tilt: "-rotate-[1.4deg]",
  },
  {
    title: "L2 ADAS",
    description:
      "Адаптивный круиз-контроль, удержание в полосе, экстренное автоторможение, контроль слепых зон.",
    icon: Radar,
    tilt: "rotate-[1.1deg]",
  },
  {
    title: "Мультимедиа на русском",
    description:
      "Система на русском языке. Аудио 7.1 с 14 динамиками. Беспроводная зарядка в комплектации Ultra.",
    icon: Volume2,
    tilt: "-rotate-[0.8deg]",
  },
  {
    title: "Панорамная крыша",
    description:
      "Чёрная крыша включена в цену. Электропривод двери багажника. Полностью светодиодная оптика.",
    icon: Sun,
    tilt: "rotate-[1.6deg]",
  },
  {
    title: "Льготный утильсбор",
    description:
      "Мощность 114 кВт (156 л.с.) — подпадает под льготный утилизационный сбор.",
    icon: BadgePercent,
    tilt: "-rotate-[1.2deg]",
  },
  {
    title: "Просторный салон",
    description:
      "Колёсная база 2640 мм — на 20–40 мм больше конкурентов. Объём багажника 353 л.",
    icon: Ruler,
    tilt: "rotate-[0.9deg]",
  },
];

export function Equipment() {
  return (
    <section
      id="equipment"
      className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]"
    >
      <Reveal rotate={-3} className="mx-auto flex w-fit items-center gap-4">
        <span
          className="hidden h-px w-12 bg-black/10 sm:block"
          aria-hidden="true"
        />
        <span className="font-serif text-2xl italic sm:text-3xl text-black/50">
          Оснащение
        </span>
        <span
          className="hidden h-px w-12 bg-black/10 sm:block"
          aria-hidden="true"
        />
      </Reveal>

      <AnimatedHeading
        text="Ключевые преимущества"
        className={SECTION_HEADING_CLASS}
        delay={0.08}
      />

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map(({ title, description, icon: Icon, tilt }, i) => (
          <Reveal
            key={title}
            delay={0.16 + i * 0.06}
            rotate={i % 2 === 0 ? 3 : -3}
          >
            {/* The tilt sits on an inner box because Reveal animates the
                wrapper's rotation back to 0 on entry. */}
            <div
              className={`glass-edge h-full rounded-2xl bg-neutral-100 p-7 md:p-8 ${tilt}`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-black">{title}</h3>
              <p className="mt-3 text-base leading-relaxed text-black/60">
                {description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
