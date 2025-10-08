// src/utils/lang.js

// ✅ Otomatis deteksi apakah dijalankan di GitHub Pages
const BASE_PATH = window.location.hostname.includes("github.io")
  ? "/securedata-manager/docs/"
  : "/docs/"; // kalau di lokal (npm run dev)

export const LANGS = {
  en: `${BASE_PATH}lang/en.json`,
  id: `${BASE_PATH}lang/id.json`,
};

export async function loadLanguage(lang) {
  try {
    const res = await fetch(LANGS[lang]);
    if (!res.ok) throw new Error(`Failed to load: ${LANGS[lang]}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Language load error:", err);
    return {};
  }
}
