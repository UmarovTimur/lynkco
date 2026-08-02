import Image from "next/image";
import { Reveal } from "@/components/Reveal";

interface GalleryItem {
  title: string;
  caption: string;
  image: string;
  /** Renders on a light plate instead of cropping — for studio shots on a plain/transparent background. */
  contain?: boolean;
  /** Spans both columns on desktop. */
  wide?: boolean;
}

/** Photography extracted from the official HMR presentation deck (20.07.2026). */
const GALLERY: GalleryItem[] = [
  {
    title: "Lynk & Co 06",
    caption: "Белый — базовый цвет для Max и Ultra",
    image: "/images/gallery/06-white-coast.webp",
    wide: true,
  },
  {
    title: "В движении",
    caption: "1.5T, 156 л.с., 7DCT",
    image: "/images/gallery/06-white-mountain-road.webp",
  },
  {
    title: "Интерьер",
    caption: "Мультимедиа на русском, аудио 7.1 с 14 динамиками",
    image: "/images/gallery/06-interior-dashboard.webp",
  },
  {
    title: "Twilight Purple",
    caption: "Только Ultra, +1 200 ¥",
    image: "/images/gallery/06-purple-profile.webp",
    contain: true,
  },
  {
    title: "Forest Green",
    caption: "Только Ultra, +1 500 ¥",
    image: "/images/gallery/06-green-studio.webp",
    contain: true,
  },
  {
    title: "Экстерьер",
    caption: "Полностью светодиодная оптика, чёрная крыша в базе",
    image: "/images/gallery/06-mint-architecture.webp",
  },
  {
    title: "Городской формат",
    caption: "Габариты 4350 × 1820 × 1625 мм, база 2640 мм",
    image: "/images/gallery/06-mint-street.webp",
  },
];

export function Work() {
  return (
    <section id="work" className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]">
      <Reveal rotate={-3} className="mx-auto flex w-fit items-center gap-4">
        <span className="h-px w-12 bg-black/15" aria-hidden="true" />
        <span className="font-serif text-2xl italic text-black/50">
          Галерея
        </span>
        <span className="h-px w-12 bg-black/15" aria-hidden="true" />
      </Reveal>

      <Reveal delay={0.08} rotate={3}>
        <h2 className="mt-4 text-center text-3xl font-normal text-black md:text-4xl">
          Как выглядит Lynk &amp; Co 06
        </h2>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {GALLERY.map((item, i) => (
          <Reveal
            key={item.title}
            delay={0.16 + i * 0.05}
            rotate={i % 2 === 0 ? 2 : -2}
            className={item.wide ? "md:col-span-2" : undefined}
          >
            <figure className="group">
              <div
                className={`relative overflow-hidden rounded-2xl bg-neutral-100 ${
                  item.wide ? "aspect-[16/9]" : "aspect-[3/2]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={
                    item.wide
                      ? "(min-width: 1024px) 1024px, 100vw"
                      : "(min-width: 768px) 50vw, 100vw"
                  }
                  className={`transition-transform duration-500 group-hover:scale-105 ${
                    item.contain ? "object-contain p-4" : "object-cover"
                  }`}
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="text-base text-black">{item.title}</span>
                <span className="text-right text-sm text-black/40">
                  {item.caption}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
