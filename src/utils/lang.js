// src/utils/lang.js
export const LANGS = {
  en: "./lang/en.json",
  id: "./lang/id.json",
};

export async function loadLanguage(lang) {
  try {
    const res = await fetch(LANGS[lang]);
    if (!res.ok) throw new Error(`Failed to load ${lang}`);
    return await res.json();
  } catch (err) {
    console.error("Language load error:", err);
    return {};
  }
}
