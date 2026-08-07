import { FAQ_ITEMS } from "@/lib/faq";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

/**
 * JSON-LD for the landing page.
 *
 * WHAT IS DELIBERATELY ABSENT
 *
 * No `offers`, no `price`, no `aggregateRating`, no `availability` count. The
 * page states that pricing is quoted per order and per region, and there are no
 * reviews on it at all — so any of those would be structured data describing
 * something a visitor cannot find on the page. That is the specific thing
 * Google issues manual actions for, and the rich result it buys would be a lie
 * about a car whose price genuinely varies by destination.
 *
 * Everything below is asserted by the visible page: the FAQ block, the spec
 * figures in the FAQ answers, the stated import model and delivery region.
 *
 * WHY A `<script>` AND NOT next/script
 *
 * `type="application/ld+json"` is data, not code. React renders it inertly via
 * dangerouslySetInnerHTML — nothing executes, and crawlers read it out of the
 * static HTML, which is the whole point of putting it in a prerendered page.
 */

function jsonLd(data: unknown) {
  // `<` is the only character that can break out of a script element in HTML.
  // Escaping it keeps a stray angle bracket in future FAQ copy from closing the
  // tag early — the standard, cheap defence for inline JSON-LD.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Прямые поставки Lynk & Co 06 по параллельному импорту со склада в Хоргосе в страны СНГ.",
  areaServed: {
    "@type": "Place",
    name: "СНГ",
  },
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "ru",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// Modelled as a Car (a subtype of Product) — the specifics come from the FAQ
// answers and the specs section, so each one is visible on the page.
const car = {
  "@type": "Car",
  "@id": `${SITE_URL}/#product`,
  name: "Lynk & Co 06",
  brand: { "@type": "Brand", name: "Lynk & Co" },
  model: "06",
  bodyType: "SUV",
  image: absoluteUrl("/seo/og.jpg"),
  url: SITE_URL,
  description:
    "Lynk & Co 06 по параллельному импорту из Китая: 1.5T, 156 л.с., 7-ступенчатый преселектив, комплектации Max и Ultra.",
  vehicleEngine: {
    "@type": "EngineSpecification",
    engineType: "1.5 л турбо, 4 цилиндра",
    engineDisplacement: {
      "@type": "QuantitativeValue",
      value: 1499,
      unitCode: "CMQ",
    },
    enginePower: {
      "@type": "QuantitativeValue",
      value: 114,
      unitCode: "KWT",
    },
  },
  vehicleTransmission: "7-ступенчатая преселективная (7DCT)",
  driveWheelConfiguration: "FrontWheelDriveConfiguration",
};

const faq = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/**
 * One graph rather than four separate script tags, so the nodes can reference
 * each other by @id (the WebSite points at its publisher, and so on) instead of
 * repeating the organization inline three times.
 */
export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLd({
          "@context": "https://schema.org",
          "@graph": [organization, website, car, faq],
        }),
      }}
    />
  );
}
