// src/utils/lang.js

// Tentukan BASE_URL secara otomatis tergantung lokasi deploy
const BASE =
  window.location.hostname.includes("github.io")
    ? "/securedata-manager/docs/"
    : "/docs/";

export const LANGS = {
  en: `${BASE}lang/en.json`,
  id: `${BASE}lang/id.json`,
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
