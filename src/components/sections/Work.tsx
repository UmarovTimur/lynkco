import Image from "next/image";

interface CaseStudy {
  title: string;
  image: string;
  tags: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Strida",
    image: "/images/aLickQcDkn7JlTftxkq33tHE.jpg",
    tags: ["portfolio", "sidebar"],
  },
  {
    title: "Bravo",
    image: "/images/ISAjHKBwJV6BJzD55lhE8XAFBM.jpg",
    tags: ["UI/UX", "App"],
  },
  {
    title: "Nitro",
    image: "/images/nT9mTBoP2h9YdschdGP72ovRHk.jpg",
    tags: ["Design System", "Web"],
  },
  {
    title: "Fargo",
    image: "/images/vzQsCEYy7zN2RmDQcgrizz0O0MI.jpg",
    tags: ["SaaS", "Web"],
  },
];

export function Work() {
  return (
    <section
      id="work"
      className="px-4 py-24 sm:px-8 lg:px-[120px]"
    >
      <div className="mb-6 flex items-center justify-center gap-4">
        <span className="h-px w-12 bg-black/15" aria-hidden="true" />
        <span className="font-serif text-2xl italic text-black/50">
          Our Projects
        </span>
        <span className="h-px w-12 bg-black/15" aria-hidden="true" />
      </div>

      <h2 className="text-center font-sans text-5xl font-normal text-black">
        Recent Case Studies
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        {CASE_STUDIES.map((study) => (
          <article key={study.title} className="group">
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src={study.image}
                alt={study.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <h3 className="text-xl font-normal text-black">{study.title}</h3>
              <div className="flex items-center gap-2">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
