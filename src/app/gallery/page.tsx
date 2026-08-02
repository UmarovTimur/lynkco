import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { GalleryBrowser } from "@/components/GalleryBrowser";
import { LeadForm } from "@/components/sections/LeadForm";
import { CtaFooter } from "@/components/sections/CtaFooter";
import { PHOTO_COUNT, VIDEO_COUNT, plural } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Галерея Lynk & Co 06 — фото и видео со склада в Хоргосе",
  description:
    "Фотографии и видео Lynk & Co 06 со склада в Хоргосе: все доступные цвета кузова, интерьер, комплектации Max и Ultra.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Nav />

      <section className="px-6 pt-32 pb-16 md:px-16 md:pt-40 lg:px-[120px]">
        <div className="mx-auto flex w-fit items-center gap-4">
          <span className="h-px w-12 bg-black/15" aria-hidden="true" />
          <span className="font-serif text-2xl italic text-black/50">
            Галерея
          </span>
          <span className="h-px w-12 bg-black/15" aria-hidden="true" />
        </div>

        <h1 className="mt-4 text-center text-3xl font-normal text-black md:text-5xl">
          Галерея Lynk &amp; Co 06
        </h1>

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
                  className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-neutral-200"
                />
              ))}
            </div>
          }
        >
          <GalleryBrowser />
        </Suspense>

        <div className="mt-16 flex justify-center">
          <Link
            href="/#about"
            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white py-3 pr-6 pl-5 text-sm font-medium text-black transition-colors hover:bg-black/5"
          >
            <ArrowLeft size={16} />
            Вернуться к предложению
          </Link>
        </div>
      </section>

      <LeadForm />

      <CtaFooter />
    </main>
  );
}
