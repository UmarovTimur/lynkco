"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/icons";
import type { NavLink } from "@/types/content";

const NAV_LINKS: NavLink[] = [
  { label: "Характеристики", href: "#specs" },
  { label: "Комплектации", href: "#complectations" },
  { label: "География", href: "#geography" },
  { label: "Наличие", href: "#stock" },
  { label: "Схема поставки", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Заявка", href: "#lead-form" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-[120px] max-lg:px-8 max-sm:px-4">
        <a
          href="#hero"
          className="flex h-11 items-center rounded-[22px] bg-white px-6 text-base font-bold text-black"
        >
          Lynk &amp; Co 06
        </a>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>

          {open && (
            <div className="absolute right-0 top-14 flex w-80 flex-col gap-3 rounded-tr-lg rounded-bl-3xl rounded-tl-3xl rounded-br-3xl bg-white p-[50px] shadow-xl">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-xl text-black"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#lead-form"
                onClick={() => setOpen(false)}
                className="font-heading text-xl text-accent-orange"
              >
                Получить КП
              </a>
              <div className="mt-2 flex items-center gap-3">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black"
                  aria-label="X"
                >
                  <X size={16} />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
