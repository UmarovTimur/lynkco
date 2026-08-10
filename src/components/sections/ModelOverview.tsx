import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { nbsp, SECTION_HEADING_CLASS } from "@/lib/typography";

/**
 * Specs and trim levels as one wide board rather than two stacked tables.
 *
 * The two used to be separate sections, which made the reader scroll away from
 * the numbers to find out which trim they came with. Side by side, the figure
 * and the trim it belongs to are one answer to one question.
 *
 * Both old anchors are kept alive — `#specs` on the section and
 * `#complectations` on the right-hand column — because the nav still links to
 * each separately and each still lands somewhere that answers its label.
 *
 * CONTENT IS TRANSCRIBED FROM THE PRESENTATION SLIDE, ROW FOR ROW, and is not
 * to be "corrected" here without checking the slide first. Three of the figures
 * read as though the deck shifted a column when it was typeset — 51 under a
 * wheelbase in millimetres, 2640 under power, 114/156 under tank capacity — but
 * that is what the source says, and quietly reordering a supplier's numbers on
 * a page that quotes them is a worse failure than repeating theirs. Fix the
 * slide, then fix this.
 */

interface SpecRow {
  label: string;
  value: string;
}

const SPECS: SpecRow[] = [
  { label: "Размеры Д х Ш × В (мм)", value: "4350x1820x1625" },
  { label: "Колесная база (мм)", value: "51" },
  {
    label: "Двигатель и трансмиссия",
    value: "1.5 Turbo + 7-ступенчатая роботизированная коробка передач DCT",
  },
  { label: "Мощность (кВт/л.с.)", value: "2640" },
  { label: "Привод", value: "Передний (FWD)" },
  { label: "Бензобак (л)", value: "114 / 156" },
];

interface TrimValue {
  text: string;
  /** Paint / upholstery chips shown under the text, as CSS colours. */
  swatches?: string[];
}

interface TrimRow {
  label: string;
  max: TrimValue;
  ultra: TrimValue;
}

const WHITE = "oklch(0.97 0 0)";
const GREY = "oklch(0.72 0 0)";
const BEIGE = "oklch(0.75 0.06 70)";
const VIOLET = "oklch(0.68 0.17 320)";
const BLACK = "oklch(0.22 0 0)";
const ROSE_WHITE =
  "linear-gradient(135deg, oklch(0.97 0 0) 50%, oklch(0.78 0.13 350) 50%)";

const TRIM_ROWS: TrimRow[] = [
  {
    label: "Колеса",
    max: { text: '18"' },
    ultra: { text: '19"' },
  },
  {
    label: "Цвет кузова (с черной крышей)",
    max: { text: "Белый, серый, бежевый", swatches: [WHITE, GREY, BEIGE] },
    ultra: {
      text: "Белый, серый, бежевый, фиолетовый",
      swatches: [WHITE, GREY, BEIGE, VIOLET],
    },
  },
  {
    label: "Цвет салона",
    max: { text: "Черный, серый", swatches: [BLACK, GREY] },
    ultra: {
      text: "Черный, серый (+ розово-белый с фиолетовым кузовом)",
      swatches: [BLACK, GREY, ROSE_WHITE],
    },
  },
];

function Swatches({ colors }: { colors: string[] }) {
  return (
    <span className="mt-2 flex items-center justify-center gap-1">
      {colors.map((c) => (
        <span
          key={c}
          aria-hidden="true"
          className="size-3.5 rounded-full ring-1 ring-black/10"
          // Arbitrary per-item colours: these are paint samples, not theme
          // tokens, so no utility class could carry them.
          style={
            c.startsWith("linear-gradient")
              ? { backgroundImage: c }
              : { background: c }
          }
        />
      ))}
    </span>
  );
}

/**
 * Black and at heading scale, matching the slide: these two titles tell the
 * reader which half of the board they are in, so they should read as headings
 * rather than as the tables' own quiet column labels.
 */
function GroupHeading({ children, id }: { children: string; id?: string }) {
  return (
    <h3
      id={id}
      className="scroll-mt-28 pb-5 text-2xl font-semibold tracking-[-0.01em] text-black uppercase sm:text-3xl"
    >
      {children}
    </h3>
  );
}

/** One hairline under every row, and nothing else. */
const ROW = "border-b border-black/[0.07]";

export function ModelOverview() {
  return (
    <section id="specs" className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]">
      <Reveal rotate={-3} className="mx-auto flex w-fit items-center gap-4">
        <span
          className="hidden h-px w-12 bg-black/10 sm:block"
          aria-hidden="true"
        />
        <span className="font-serif text-2xl italic text-black/50 sm:text-3xl">
          Характеристики
        </span>
        <span
          className="hidden h-px w-12 bg-black/10 sm:block"
          aria-hidden="true"
        />
      </Reveal>

      <AnimatedHeading
        text="Главные преимущества модели (B-SUV)"
        className={SECTION_HEADING_CLASS}
        delay={0.08}
      />

      {/* One board, two columns — but not equal ones. The left table holds
          short values ("51", "Передний (FWD)"); the right one has to fit paint
          lists four colours long inside a centred cell, so it gets the extra
          room rather than splitting the width down the middle out of symmetry.

          `items-start` so the shorter column stops at its own last row instead
          of stretching to match the other — the two halves have no reason to
          align row for row. */}
      <div className="mt-14 grid items-start gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* ── Основные параметры ─────────────────────────────────────────── */}
        <Reveal delay={0.14} rotate={-2}>
          <GroupHeading>Основные параметры</GroupHeading>

          <table className="w-full border-collapse text-sm sm:text-base">
            <tbody>
              {SPECS.map((row) => (
                <tr key={row.label} className={ROW}>
                  <th
                    scope="row"
                    className="w-[45%] py-4 pr-4 text-left font-normal text-black/45"
                  >
                    {nbsp(row.label)}
                  </th>
                  <td className="py-4 text-left font-medium text-black">
                    {nbsp(row.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* ── Комплектации ───────────────────────────────────────────────── */}
        <Reveal delay={0.22} rotate={2}>
          <GroupHeading id="complectations">Комплектации</GroupHeading>

          {/* A safety net rather than the normal case: on a phone the table is
              sized to fit (see the width floor below), so there is nothing to
              scroll. It stays for the awkward middle widths and for very long
              words. Note that setting `overflow-x` makes `overflow-y` compute
              to `auto` too, so nothing inside may overhang vertically or it
              earns a stray scrollbar down the side of the table. */}
          <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
            {/* `table-fixed` is what makes the widths below mean anything. Under
                the default auto layout the browser sizes columns from their
                content, and "Цвет кузова (с черной крышей)" is longer than any
                colour list — so the parameter column helped itself to the room
                and squeezed the paint lists into four lines regardless of the
                widths declared on them.

                The 520px floor is deliberately `md:` only. Applied on a phone it
                would push the table wider than the screen and hand the reader a
                sideways scroll — and the equal thirds below would then be thirds
                of 520px rather than thirds of what they can actually see. */}
            <table className="w-full table-fixed border-collapse text-sm sm:text-base md:min-w-[520px]">
              <caption className="sr-only">
                Отличия комплектаций Max и Ultra
              </caption>
              <thead>
                {/* Percentages rather than pixels, so the split survives every
                    width between a phone and the desktop board.

                    Phone: even thirds. Nothing is wide enough there to be worth
                    favouring, and equal columns keep the two trims visually
                    comparable, which is the whole job of this table.

                    From `md` up: 40/30/30. With real room on the page the
                    parameter column stops needing a third — it holds three short
                    labels — while the value columns hold "Белый, серый, бежевый,
                    фиолетовый" centred, the longest string here and the one that
                    decides every row's height. */}
                <tr className={ROW}>
                  <th className="w-1/3 py-3 text-left font-normal text-black/35 md:w-[40%]">
                    Параметр
                  </th>
                  <th className="w-1/3 py-3 text-center font-medium text-black md:w-[30%]">
                    Max
                  </th>
                  <th className="w-1/3 py-3 text-center font-medium text-black md:w-[30%]">
                    Ultra
                  </th>
                </tr>
              </thead>
              <tbody>
                {TRIM_ROWS.map((row) => (
                  <tr key={row.label} className={ROW}>
                    <th
                      scope="row"
                      className="py-4 pr-4 text-left font-normal text-black"
                    >
                      {nbsp(row.label)}
                    </th>
                    <td className="px-2 py-4 text-center align-middle text-black/70">
                      {nbsp(row.max.text)}
                      {row.max.swatches ? (
                        <Swatches colors={row.max.swatches} />
                      ) : null}
                    </td>
                    <td className="px-2 py-4 text-center align-middle text-black/70">
                      {nbsp(row.ultra.text)}
                      {row.ultra.swatches ? (
                        <Swatches colors={row.ultra.swatches} />
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.3} rotate={2} className="mt-14 flex justify-center">
        <a
          href="#lead-form"
          className="glass-edge-button inline-flex items-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:pr-7 sm:pl-8 sm:text-base"
        >
          Запросить условия
          <ArrowRight size={16} />
        </a>
      </Reveal>
    </section>
  );
}
