"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

// Order-details fields (комплектация, страна, объём, тип доставки, рег.
// номер, город) are hidden for now — form only asks for client contacts.
// Set to true to bring the order-info fields back.
const SHOW_ORDER_INFO = false;

const COUNTRIES = [
  "Россия",
  "Казахстан",
  "Узбекистан",
  "Кыргызстан",
  "Беларусь",
  "Таджикистан",
  "Другое",
];

const DELIVERY_TYPES = ["Автовозом", "Железной дорогой", "Морем", "Уточню позже"];

const VOLUMES = ["1 автомобиль", "2–5", "6–10", "10+"];

const MESSENGERS = ["WhatsApp", "Telegram", "Другое"];

interface TextFieldConfig {
  name: string;
  label: string;
  type: "text" | "tel" | "email";
  required?: boolean;
}

const ORDER_TEXT_FIELDS: TextFieldConfig[] = [
  { name: "regNumber", label: "Рег. номер", type: "text", required: true },
  { name: "city", label: "Город", type: "text", required: true },
  { name: "complectation", label: "Комплектация", type: "text" },
];

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="lead-form"
      className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]"
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-normal text-black md:text-5xl">
          Получить коммерческое предложение
        </h2>
        <p className="mt-4 text-base text-black/60 md:text-lg">
          Оставьте контакты — уточним детали и подготовим коммерческое
          предложение. Отвечаем оперативно в рабочие дни.
        </p>
      </Reveal>

      <Reveal
        delay={0.15}
        className="mx-auto mt-12 max-w-3xl rounded-[32px] bg-neutral-100 p-6 md:p-12"
      >
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <CheckCircle2 className="size-10 text-black" />
            <p className="text-lg font-bold text-black">Заявка отправлена</p>
            <p className="max-w-sm text-sm text-black/60">
              Спасибо! Мы свяжемся с вами в ближайшее рабочее время для
              уточнения деталей и подготовки коммерческого предложения.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm sm:col-span-2">
              <span className="font-medium text-black">
                Телефон <span className="text-accent-orange">*</span>
              </span>
              <input
                type="tel"
                name="phone"
                required
                className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none focus:border-black/30"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-black">
                Никнейм <span className="text-accent-orange">*</span>
              </span>
              <input
                type="text"
                name="nickname"
                required
                placeholder="@username"
                className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none focus:border-black/30"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-black">
                Мессенджер <span className="text-accent-orange">*</span>
              </span>
              <select
                name="messenger"
                required
                defaultValue=""
                className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none focus:border-black/30"
              >
                <option value="" disabled>
                  Выберите мессенджер
                </option>
                {MESSENGERS.map((messenger) => (
                  <option key={messenger} value={messenger}>
                    {messenger}
                  </option>
                ))}
              </select>
            </label>

            {SHOW_ORDER_INFO && (
              <>
                {ORDER_TEXT_FIELDS.map((field) => (
                  <label key={field.name} className="flex flex-col gap-2 text-sm">
                    <span className="font-medium text-black">
                      {field.label}
                      {field.required && (
                        <span className="text-accent-orange"> *</span>
                      )}
                    </span>
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none focus:border-black/30"
                    />
                  </label>
                ))}

                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-black">
                    Страна <span className="text-accent-orange">*</span>
                  </span>
                  <select
                    name="country"
                    required
                    defaultValue=""
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none focus:border-black/30"
                  >
                    <option value="" disabled>
                      Выберите страну
                    </option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-black">Объём</span>
                  <select
                    name="volume"
                    defaultValue=""
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none focus:border-black/30"
                  >
                    <option value="" disabled>
                      Выберите объём
                    </option>
                    {VOLUMES.map((volume) => (
                      <option key={volume} value={volume}>
                        {volume}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-sm sm:col-span-2">
                  <span className="font-medium text-black">Тип доставки</span>
                  <select
                    name="deliveryType"
                    defaultValue=""
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none focus:border-black/30"
                  >
                    <option value="" disabled>
                      Выберите тип доставки
                    </option>
                    {DELIVERY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}

            <button
              type="submit"
              className="mt-2 flex h-[51px] items-center justify-center gap-2 rounded-full bg-black py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:col-span-2"
            >
              Отправить заявку
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
