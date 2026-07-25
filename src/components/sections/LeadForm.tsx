"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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

interface TextFieldConfig {
  name: string;
  label: string;
  type: "text" | "tel" | "email";
  required?: boolean;
}

const TEXT_FIELDS: TextFieldConfig[] = [
  { name: "company", label: "Компания", type: "text", required: true },
  { name: "regNumber", label: "Рег. номер", type: "text", required: true },
  { name: "city", label: "Город", type: "text", required: true },
  { name: "contactName", label: "Контактное лицо", type: "text", required: true },
  { name: "phone", label: "Телефон", type: "tel", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "messenger", label: "Мессенджер (WhatsApp / Telegram)", type: "text" },
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
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-normal text-black md:text-5xl">
          Получить коммерческое предложение
        </h2>
        <p className="mt-4 text-base text-black/60 md:text-lg">
          Условия формируем под ваш объём и страну поставки. Отвечаем
          оперативно в рабочие дни.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl rounded-[32px] bg-neutral-100 p-6 md:p-12">
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
            {TEXT_FIELDS.map((field) => (
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

            <button
              type="submit"
              className="mt-2 flex h-[51px] items-center justify-center gap-2 rounded-full bg-black py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:col-span-2"
            >
              Отправить заявку
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
