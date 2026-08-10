/**
 * Shared look for section headings: large, tight and heavy.
 *
 * Deliberately kept out of AnimatedHeading.tsx. That module is `"use client"`,
 * and a server component importing a plain value from a client module gets a
 * client reference rather than the string — which still works when handed
 * straight to a prop, but silently contributes nothing inside `cn()`, leaving
 * the heading unstyled with no error anywhere.
 */
export const SECTION_HEADING_CLASS =
  "mt-4 text-center text-4xl font-bold tracking-[-0.03em] text-black md:text-5xl lg:text-6xl";

const NBSP = " ";

/**
 * Prepositions of three letters and up. The 1–2 letter rule below cannot reach
 * them, and the phone audit kept catching them at the end of a line:
 * "поставляются без ⏎ заводской гарантии", "нужны для ⏎ регистрации",
 * "уточняйте при ⏎ запросе".
 *
 * A list rather than a length rule, because "без" and "год" are both three
 * letters and only one of them governs the word after it. Prepositions only:
 * conjunctions ("что", "как", "или") may end a line without it reading as an
 * error, so they are left to fall where they fall.
 */
const LONG_PREPOSITIONS =
  "без|для|при|под|над|про|изо|ото|обо|близ|вне|через|между|перед|после|около|среди|кроме|вдоль|вокруг|против|сквозь|ради";
const LONG_PREP_RE = new RegExp(
  String.raw`(?<=^|[\s(«„"'—–-])(` + LONG_PREPOSITIONS + String.raw`)\s+`,
  "giu",
);

/**
 * Russian typesetting rules for line breaks, applied to a string.
 *
 * On a 390px screen a line holds about six words, so every rule below fires
 * several times per paragraph — an audit of the phone layout found 44 breaks
 * that a Russian typesetter would mark as errors, almost all of them a
 * preposition stranded at the end of a line.
 *
 * Four rules, in the order a typesetter would apply them:
 *
 *  1. A one- or two-letter word — most Russian prepositions and conjunctions
 *     are — belongs to the word it governs and may not end a line. "в юанях на
 *     ⏎ банковский счёт" is the error this fixes, and it was the most common
 *     one on the page by a wide margin.
 *  2. A number may not be torn from its unit: "20–40 ⏎ мм" reads as two
 *     separate facts for as long as it takes the eye to reach the next line.
 *  3. The longer prepositions, by name — see LONG_PREPOSITIONS above.
 *  4. An em dash may not start a line. Russian keeps it with the clause it
 *     closes, so the space *before* it is the one that has to hold.
 *
 * Widows are deliberately NOT handled here. They are a ragging problem, not a
 * meaning problem, and `text-wrap: pretty` in globals.css already deals with
 * them across the whole site without any string having to be touched.
 *
 * Idempotent: a second pass finds NBSP already sitting where it would put one
 * and rewrites it to itself.
 */
export function nbsp(text: string): string {
  return (
    text
      // Lookbehind rather than a captured delimiter, because the delimiter must
      // NOT be consumed: "Д х Ш × В (мм)" has short words back to back, and a
      // pattern that eats the space before "х" leaves nothing for "Ш" to match
      // against. Matching starts at the word itself and only peeks backwards.
      .replace(/(?<=^|[\s(«„"'—–-])([A-Za-zА-Яа-яЁё]{1,2})\s+/gu, `$1${NBSP}`)
      // No `\b` after the unit: JavaScript word boundaries are defined over
      // [A-Za-z0-9_], so Cyrillic is "non-word" to them and `мм,` has no
      // boundary between the "м" and the comma. A negative lookahead for a
      // letter is the check that actually holds for Russian.
      .replace(
        /(\d)\s+(мм|см|км|кг|тыс|млн|л\.с\.|кВт|шт\.?|мин|дн|ч|₽|¥|\$|%|[млт])(?![A-Za-zА-Яа-яЁё])/gu,
        `$1${NBSP}$2`,
      )
      .replace(LONG_PREP_RE, `$1${NBSP}`)
      .replace(/\s+([—–])\s/g, `${NBSP}$1 `)
  );
}
