import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { TransitionLink } from "@/components/PageTransition";
import { Nav } from "@/components/Nav";
import { GalleryBrowser } from "@/components/GalleryBrowser";
import { LeadForm } from "@/components/sections/LeadForm";
import { CtaFooter } from "@/components/sections/CtaFooter";
import { PHOTO_COUNT, VIDEO_COUNT, plural } from "@/lib/gallery";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { SECTION_HEADING_CLASS } from "@/lib/typography";

const TITLE = "Галерея Lynk & Co 06 — фото и видео со склада в Хоргосе";
const DESCRIPTION =
  "Фотографии и видео Lynk & Co 06 со склада в Хоргосе: все доступные цвета кузова, интерьер, комплектации Max и Ultra.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Explicit, because the colour filter is a query parameter (?c=white). Every
  // filtered view is the same document with a different client-side filter
  // applied, so they must all point back here or they compete with each other
  // in the index as near-duplicates.
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/gallery",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Nav />

      <section className="px-6 pt-32 pb-16 md:px-16 md:pt-40 lg:px-30">
        <div className="mx-auto flex w-fit items-center gap-4">
          <span
            className="hidden h-px w-12 bg-black/15 sm:block"
            aria-hidden="true"
          />
          <span className="font-serif text-2xl italic sm:text-3xl text-black/50">
            Галерея
          </span>
          <span
            className="hidden h-px w-12 bg-black/15 sm:block"
            aria-hidden="true"
          />
        </div>

        <AnimatedHeading
          as="h1"
          text="Галерея Lynk & Co 06"
          className={SECTION_HEADING_CLASS}
        />

        <p className="mt-3 text-center text-lg text-black/60 md:text-xl">
          Фото и видео реальных автомобилей со склада в Хоргосе
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-black/50">
          {plural(PHOTO_COUNT, "фотография", "фотографии", "фотографий")}
          {VIDEO_COUNT > 0 &&
            ` и ${plural(VIDEO_COUNT, "видео", "видео", "видео")}`}{" "}
          по цветам кузова: комплектации Max и Ultra, экстерьер и интерьер.
          Наличие меняется ежедневно — уточняйте актуальный остаток перед
          бронированием.
        </p>

        <Suspense
          fallback={
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="img-shimmer relative aspect-[4/3] w-full rounded-2xl"
                />
              ))}
            </div>
          }
        >
          <GalleryBrowser />
        </Suspense>

        <div className="mt-16 flex justify-center">
          <TransitionLink
            href="/#about"
            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-4 text-sm font-medium sm:pr-8 sm:pl-7 sm:text-base text-black transition-colors hover:bg-black/5"
          >
            <ArrowLeft size={16} />
            Вернутся на главную
          </TransitionLink>
        </div>
      </section>

      <LeadForm />

      <CtaFooter />
    </main>
  );
}
