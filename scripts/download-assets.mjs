import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ASSETS = [
  "0Y1cjcOdQp68PBw6G3HHfHz6TYo.jpg",
  "11KSGbIZoRSg4pjdnUoif6MKHI.svg",
  "670uUrkwoRnzhCl9b3kEMwUmgE4.jpg",
  "6mcf62RlDfRfU61Yg5vb2pefpi4.png",
  "6tTbkXggWgQCAJ4DO2QEdXXmgM.svg",
  "75ILrhKQhUkwU1dH15BUDezAQ.png",
  "9nNEv94U4EwW3ZkcswuOBMt2jk.jpg",
  "aLickQcDkn7JlTftxkq33tHE.jpg",
  "cpbJvQoTTkomFOd8RSNsHF3b8.jpg",
  "Cy4Y373j3W6Y5YXe0SRDbsV760.svg",
  "EgbF2rgcHm4Q19cR6VXfj7f5awk.png",
  "etglVFVv5e7VnmUVyHsNK3oyIbI.png",
  "GQYbkjoIOqJZo9gC9bpE4YLn18.png",
  "ISAjHKBwJV6BJzD55lhE8XAFBM.jpg",
  "J4Ox47KYv4g8Lb2C0PXNkjDaA.jpg",
  "jptbxVDKOL3y2K3dyTNK9na73uA.svg",
  "jSslhcqo8HKNjUvPEceq7bhbY.jpg",
  "kpYj3BEOGRfBZXfMd4dgKyI0.png",
  "lPA9qme8lYplEkSYmjwSkHlECQ.svg",
  "nnOxF9f7GUGR4LMHU2YTvSRLsI.svg",
  "nT9mTBoP2h9YdschdGP72ovRHk.jpg",
  "TjQr3Mj8oNK6Ndfogb5IMNxXGg.png",
  "TWgBR6dpy8VfcVcGIy2oyBYzyY.jpg",
  "vzQsCEYy7zN2RmDQcgrizz0O0MI.jpg",
  "wo0P2ApHuac8yCSOoIU4GYSCkOc.png",
  "Y3PGv0d0lyAiS8gk3emx3d41fvU.png",
  "zRVCa2eOgJIf1mJK5PYcBLrYI.png",
].map((name) => ({
  url: `https://framerusercontent.com/images/${name}`,
  dest: `public/images/${name}`,
}));

const FAVICONS = [
  {
    url: "https://framerusercontent.com/sites/icons/default-favicon-light.v1.png",
    dest: "public/seo/favicon-light.png",
  },
  {
    url: "https://framerusercontent.com/sites/icons/default-favicon-dark.v1.png",
    dest: "public/seo/favicon-dark.png",
  },
  {
    url: "https://framerusercontent.com/sites/icons/default-touch-icon.v3.png",
    dest: "public/seo/apple-touch-icon.png",
  },
];

const ALL = [...ASSETS, ...FAVICONS];

async function downloadOne({ url, dest }) {
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAILED ${res.status} ${url}`);
    return;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  console.log(`OK ${dest} (${buf.length} bytes)`);
}

async function run() {
  const batchSize = 4;
  for (let i = 0; i < ALL.length; i += batchSize) {
    const batch = ALL.slice(i, i + batchSize);
    await Promise.all(batch.map(downloadOne));
  }
}

run();
