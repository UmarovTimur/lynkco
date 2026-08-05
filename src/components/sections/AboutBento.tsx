"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Folder } from "lucide-react";
import { MediaImage } from "@/components/MediaImage";
import { TransitionLink } from "@/components/PageTransition";
import type { BentoImage } from "@/types/content";
import { PHOTO_COUNT, VIDEO_COUNT, plural } from "@/lib/gallery";

const COLUMN_ONE: BentoImage[] = [
  {
    src: "/images/about/1/1.png",
    alt: "Lynk & Co 06 — экстерьер, фото со склада 1",
    width: 1706,
    height: 1279,
  },
  {
    src: "/images/about/1/2.png",
    alt: "Lynk & Co 06 — экстерьер, фото со склада 2",
    width: 1706,
    height: 1279,
  },
  {
    src: "/images/about/1/3.png",
    alt: "Lynk & Co 06 — экстерьер, фото со склада 3",
    width: 1706,
    height: 1279,
  },
  {
    src: "/images/about/1/4.png",
    alt: "Lynk & Co 06 — экстерьер, фото со склада 4",
    width: 4096,
    height: 3072,
  },
];

const COLUMN_TWO: BentoImage[] = [
  {
    src: "/images/about/2/1.png",
    alt: "Lynk & Co 06 — интерьер, фото 1",
    width: 4096,
    height: 3072,
  },
  {
    src: "/images/about/2/2.png",
    alt: "Lynk & Co 06 — интерьер, фото 2",
    width: 1279,
    height: 1706,
  },
  {
    src: "/images/about/2/3.png",
    alt: "Lynk & Co 06 — интерьер, фото 3",
    width: 1706,
    height: 1279,
  },
  {
    src: "/images/about/2/4.png",
    alt: "Lynk & Co 06 — интерьер, фото 4",
    width: 1706,
    height: 1279,
  },
];

function BentoTile({ image }: { image: BentoImage }) {
  return (
    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl">
      <MediaImage
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 600px, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function BentoCarouselColumn({
  images,
  secondsPerImage,
}: {
  images: BentoImage[];
  secondsPerImage: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  // Doubled so the column can scroll exactly one full set and loop back to
  // a pixel-identical frame — works for any number of images.
  const loopImages = [...images, ...images];
  // Duration scales with the image count, so px/s speed stays constant no
  // matter how many images are in the column.
  const duration = images.length * secondsPerImage;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="flex flex-col gap-12"
        animate={shouldReduceMotion ? undefined : { y: ["0%", "-50%"] }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration, ease: "linear", repeat: Infinity }
        }
      >
        {loopImages.map((image, i) => (
          <BentoTile key={`${image.src}-${i}`} image={image} />
        ))}
      </motion.div>
    </div>
  );
}

export function AboutBento() {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  // Inner layer drifts top-to-bottom relative to the (static) card frame as
  // the section scrolls through the viewport. It's sized taller than the
  // card (overscan on top+bottom) so it fully covers the card at both ends
  // of the travel range — only the card's own overflow-hidden clips it, no
  // card background ever shows through the gap.
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-8vh", "8vh"]);

  return (
    <section id="about" className="px-[120px] py-24 max-lg:px-8 max-sm:px-4">
      <div
        ref={cardRef}
        className="relative mx-auto h-[80vh] min-h-[520px] max-w-[1440px] overflow-hidden rounded-3xl bg-[#262626] md:h-[108vh]"
      >
        <motion.div
          style={shouldReduceMotion ? undefined : { y: parallaxY }}
          className="absolute inset-x-0 -top-[10vh] -bottom-[10vh] grid grid-cols-1 gap-12 p-12 md:grid-cols-2"
        >
          <BentoCarouselColumn images={COLUMN_ONE} secondsPerImage={9} />
          <div className="hidden h-full md:block">
            <BentoCarouselColumn images={COLUMN_TWO} secondsPerImage={6} />
          </div>
        </motion.div>

        <TransitionLink
          href="/gallery"
          className="group absolute inset-0 z-10 flex flex-col items-center justify-center gap-3"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/40 backdrop-blur transition-transform duration-300 group-hover:scale-110">
            <Folder size={24} className="text-white" />
          </span>
          <span className="text-base font-bold text-white">
            Смотреть галерею
          </span>
          <span className="text-sm text-white/60">
            {plural(PHOTO_COUNT, "фотография", "фотографии", "фотографий")}
            {VIDEO_COUNT > 0 &&
              ` · ${plural(VIDEO_COUNT, "видео", "видео", "видео")}`}
          </span>
        </TransitionLink>
      </div>
    </section>
  );
}
