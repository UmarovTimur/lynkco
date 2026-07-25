import Image from "next/image";
import { Folder } from "lucide-react";
import type { BentoImage } from "@/types/content";

const COLUMN_ONE: BentoImage[] = [
  {
    src: "/images/670uUrkwoRnzhCl9b3kEMwUmgE4.jpg",
    alt: "Recent work preview 1",
    width: 648,
    height: 486,
  },
  {
    src: "/images/J4Ox47KYv4g8Lb2C0PXNkjDaA.jpg",
    alt: "Recent work preview 2",
    width: 648,
    height: 486,
  },
  {
    src: "/images/wo0P2ApHuac8yCSOoIU4GYSCkOc.png",
    alt: "Recent work preview 3",
    width: 648,
    height: 486,
  },
];

const COLUMN_TWO: BentoImage[] = [
  {
    src: "/images/9nNEv94U4EwW3ZkcswuOBMt2jk.jpg",
    alt: "Recent work preview 4",
    width: 648,
    height: 486,
  },
  {
    src: "/images/cpbJvQoTTkomFOd8RSNsHF3b8.jpg",
    alt: "Recent work preview 5",
    width: 648,
    height: 486,
  },
  {
    src: "/images/TWgBR6dpy8VfcVcGIy2oyBYzyY.jpg",
    alt: "Recent work preview 6",
    width: 648,
    height: 486,
  },
];

function BentoTile({ image }: { image: BentoImage }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 600px, 100vw"
        className="object-cover"
      />
    </div>
  );
}

export function AboutBento() {
  return (
    <section id="about" className="px-[120px] py-24 max-lg:px-8 max-sm:px-4">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-3xl bg-[#262626]">
        <div className="grid grid-cols-1 gap-12 p-12 md:grid-cols-2">
          <div className="flex flex-col gap-12">
            {COLUMN_ONE.map((image) => (
              <BentoTile key={image.src} image={image} />
            ))}
          </div>
          <div className="flex flex-col gap-12">
            {COLUMN_TWO.map((image) => (
              <BentoTile key={image.src} image={image} />
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/40 backdrop-blur">
            <Folder size={24} className="text-white" />
          </span>
          <span className="text-base font-bold text-white">
            See Recent Work
          </span>
        </div>
      </div>
    </section>
  );
}
