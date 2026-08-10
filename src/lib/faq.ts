/**
 * The FAQ copy, shared by the accordion that renders it and the FAQPage
 * JSON-LD that describes it.
 *
 * It lives here rather than in Faq.tsx for one specific reason: Google requires
 * the question and answer text in FAQ structured data to match what a visitor
 * actually sees on the page, and treats a mismatch as spam. Two hand-kept
 * copies of this array would drift the first time somebody reworded an answer.
 * One array, imported by both, cannot.
 *
 * Faq.tsx is a client component and this file is imported by a server one, so
 * it deliberately holds data only — no "use client", no React.
 */

import { nbsp } from "@/lib/typography";

export interface FaqItem {
  question: string;
  answer: string;
}

const ITEMS: FaqItem[] = [
  {
    question: "Двигатель четырёхцилиндровый?",
    answer:
      "Да, 1.5-литровый турбированный четырёхцилиндровый агрегат объёмом 1499 см³ в паре с 7-ступенчатым преселективом. Это современное решение, обеспечивающее отличную динамику при низком расходе топлива.",
  },
  {
    question: "Почему мощность 156 л.с.?",
    answer:
      "Мощность 114 кВт выбрана для экспортной спецификации — в странах ЕАЭС она попадает в льготную категорию по налогообложению и сборам.",
  },
  {
    question: "В какие страны поставляете?",
    answer:
      "Работаем по всем странам СНГ. Маршрут и сроки подбираем индивидуально под каждый регион.",
  },
  {
    question: "Сколько стоит доставка?",
    answer:
      "Стоимость зависит от удалённости и способа перевозки. Она рассчитывается при подготовке коммерческого предложения.",
  },
  {
    question: "Можно взять один автомобиль?",
    answer:
      "Да, минимальной партии нет. Вы можете заказать от одной единицы для теста спроса.",
  },
  {
    question: "Какие документы нужны для регистрации?",
    answer:
      "Состав документов зависит от страны ввоза. Для России и стран ЕАЭС основными являются СБКТС и ЭПТС. Их получение клиент организует самостоятельно — мы консультируем и рекомендуем проверенного партнёра «под ключ».",
  },
  {
    question: "Что с гарантией и запчастями?",
    answer:
      "Заводская гарантия не распространяется, что стандартно для параллельного импорта. Мы организуем поставку любых необходимых запчастей по вашему запросу.",
  },
  {
    question: "Как получить актуальный прайс?",
    answer:
      "Оставьте заявку от юридического лица. Условия формируются индивидуально под ваш объём и регион поставки.",
  },
];

/**
 * Typographed once, here, rather than at either render site.
 *
 * Both consumers must see byte-identical strings: Google compares the FAQ
 * structured data against the visible copy and treats a mismatch as spam, and a
 * non-breaking space is a different character from a space. Applying `nbsp()` in
 * Faq.tsx alone would have introduced exactly the drift this file exists to
 * prevent — invisibly, and only in the eyes of a crawler.
 */
export const FAQ_ITEMS: FaqItem[] = ITEMS.map((item) => ({
  question: nbsp(item.question),
  answer: nbsp(item.answer),
}));
