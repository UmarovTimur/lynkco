import manifest from "./gallery-manifest.json";
import { asset } from "./site";

export type GalleryItemType = "photo" | "video";

export interface GalleryItem {
  type: GalleryItemType;
  src: string;
  thumb: string;
  /** Videos only — poster frame shown before playback. */
  poster?: string;
  width: number;
  height: number;
}

export interface GalleryGroup {
  slug: string;
  label: string;
  /** Hex swatch shown in the filter chip. `null` for non-colour groups. */
  swatch: string | null;
  /** Availability note from the HMR deck, e.g. "Только Ultra · +1 500 ¥". */
  note: string | null;
  items: GalleryItem[];
}

/**
 * Display metadata per group. Ordered the way the filter chips should read —
 * base colours first (as listed in the deck), then paid options, then
 * interior. Slugs match the folder names produced by
 * `scripts/process-gallery.mjs`.
 */
const GROUP_META: Omit<GalleryGroup, "items">[] = [
  { slug: "white", label: "Белый", swatch: "#f2f2f2", note: "Max / Ultra" },
  { slug: "gray", label: "Серый", swatch: "#8a8a8a", note: "Max / Ultra" },
  { slug: "beige", label: "Бежевый", swatch: "#d8c9a8", note: "Max / Ultra" },
  {
    slug: "purple",
    label: "Фиолетовый",
    swatch: "#5b3a72",
    note: "Только Ultra · +1 200 ¥",
  },
  {
    slug: "green",
    label: "Зелёный",
    swatch: "#2f4a3c",
    note: "Только Ultra · +1 500 ¥",
  },
  { slug: "interior", label: "Интерьер", swatch: null, note: null },
];

const ITEMS_BY_SLUG = Object.fromEntries(
  Object.entries(manifest as Record<string, GalleryItem[]>).map(
    ([slug, items]) => [
      slug,
      items.map((item) => ({
        ...item,
        src: asset(item.src),
        thumb: asset(item.thumb),
        ...(item.poster && { poster: asset(item.poster) }),
      })),
    ],
  ),
);

/** Groups that actually have assets, in display order. */
export const GALLERY_GROUPS: GalleryGroup[] = GROUP_META.filter(
  (meta) => (ITEMS_BY_SLUG[meta.slug]?.length ?? 0) > 0,
).map((meta) => ({ ...meta, items: ITEMS_BY_SLUG[meta.slug] }));

/** Every item, flattened in group order — backs the "Все" filter. */
export const ALL_ITEMS: GalleryItem[] = GALLERY_GROUPS.flatMap(
  (group) => group.items,
);

export const PHOTO_COUNT = ALL_ITEMS.filter((i) => i.type === "photo").length;
export const VIDEO_COUNT = ALL_ITEMS.filter((i) => i.type === "video").length;

/** Russian plural for a count, e.g. 42 → "42 фотографии". */
export function plural(
  count: number,
  one: string,
  few: string,
  many: string,
): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} ${one}`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
    return `${count} ${few}`;
  return `${count} ${many}`;
}
