# Lynk & Co 06 — лендинг

Одностраничный сайт о поставках Lynk & Co 06 по параллельному импорту: автомобили в наличии на складе в Хоргосе, отгрузка от одной единицы, доставка по странам СНГ. Плюс отдельная страница с галереей фото и видео по цветам кузова.

Сайт полностью статический (`output: "export"`): `npm run build` собирает готовую папку `out/`, которую можно отдать любому статическому хостингу. Сервер на Node не нужен.

**Демо:** https://umarovtimur.github.io/lynkco/

## Стек

- **Next.js 16** — App Router, React 19, TypeScript strict, статический экспорт
- **Tailwind CSS v4** и **shadcn/ui**
- **Motion** — анимации появления, переходы между страницами
- **Lenis** — плавный скролл
- **Lucide React** — иконки

## Быстрый старт

Нужен [Node.js](https://nodejs.org/) 24+.

```bash
npm install
npm run dev
```

Сайт откроется на http://localhost:3000.

## Команды

```bash
npm run dev              # дев-сервер
npm run build            # статическая сборка в out/
npm run lint             # ESLint
npm run typecheck        # проверка типов
npm run check            # lint + typecheck + build
npm run optimize:images  # ужать картинки в public/images/ и собрать OG-карточку
```

## Страницы и секции

- `/` — главная. Секции идут по воронке продаж: Hero → о машине (AboutBento, Work) → оснащение → характеристики и комплектации → наличие → география → схема поставки → условия сделки → цены → заявка → FAQ. Компоненты лежат в `src/components/sections/`.
- `/gallery` — галерея с фильтром по цветам и полноэкранным просмотром.

## Галерея

Фото и видео для галереи не редактируются руками. Исходники раскладываются по папкам с названиями цветов:

```
media-src/
  белый/      IMG_001.jpg  clip.mp4
  зелёный/    ...
  интерьер/   ...
```

Затем:

```bash
node scripts/process-gallery.mjs media-src
```

Скрипт сделает WebP (до 1920px) и превью для каждого фото, перекодирует видео в H.264 и вытащит постер. Потом пересоберёт `src/lib/gallery-manifest.json`, откуда страница берёт данные. Папка `media-src/` в git не попадает.

## Картинки

На статическом хостинге `next/image` ничего не ресайзит (`images.unoptimized`), так что браузер получает файл из `public/` как есть. Новую картинку нужно заранее уменьшить: добавьте её папку в `TARGETS` в `scripts/optimize-static-images.mjs` и запустите `npm run optimize:images`.

Пути к файлам из `public/` в коде оборачиваются в `asset()` из `src/lib/site.ts`. Так они работают и в корне домена, и в подпапке, как на GitHub Pages.

## Деплой

### GitHub Pages

Workflow `.github/workflows/pages.yml` собирает сайт и публикует его при каждом пуше в `main`. Его можно запустить и вручную во вкладке Actions.

Один раз нужно включить Pages: **Settings → Pages → Source: GitHub Actions**.

Адрес сайта и подпапку (`/lynkco`) workflow определяет сам. Если подключить свой домен, подпапка уберётся автоматически.

### Свой сервер (nginx)

```bash
NEXT_PUBLIC_SITE_URL=https://example.com npm run build
```

Содержимое `out/` отдаётся nginx с одним правилом:

```nginx
location / { try_files $uri $uri.html $uri/ =404; }
error_page 404 /404.html;
```

### Переменные окружения

| Переменная             | Зачем                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Публичный адрес сайта. Из него строятся sitemap, robots, canonical, OG-теги и JSON-LD.       |
| `PAGES_BASE_PATH`      | Подпапка, в которой лежит сайт (`/lynkco`). Пусто, если сайт в корне домена.                  |
| `GITHUB_PAGES`         | `true` — собирать страницы как `gallery/index.html`, потому что у GitHub Pages нет `try_files`. |

Все значения зашиваются в HTML при сборке, поэтому после их смены сайт нужно пересобрать. Пример для `NEXT_PUBLIC_SITE_URL` есть в `.env.example`.

## Структура

```
src/
  app/                  # маршруты: главная, /gallery, sitemap, robots
  components/
    sections/           # секции главной
    ui/                 # примитивы shadcn/ui
  lib/
    site.ts             # адрес сайта, asset(), absoluteUrl()
    gallery.ts          # группы и элементы галереи
    gallery-manifest.json  # генерируется scripts/process-gallery.mjs
public/
  images/  videos/  seo/
scripts/
  process-gallery.mjs         # исходники → ассеты галереи
  optimize-static-images.mjs  # ужатие картинок и OG-карточка
docs/research/          # заметки по дизайн-токенам и компонентам
```

## Происхождение

Проект начинался с шаблона [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template). Инструкции для AI-агентов (`AGENTS.md`, `CLAUDE.md` и прочие) остались от него.

## Лицензия

MIT
