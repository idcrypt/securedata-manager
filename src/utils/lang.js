// src/utils/lang.js

export const LANGS = {
  en: "./lang/en.json",
  id: "./lang/id.json",
};

/**
 * Loads language data dynamically from /lang folder.
 * If loading fails, it falls back to English.
 * 
 * @param {string} lang - The language code ('en' or 'id')
 * @returns {Promise<Object>} - The JSON object of language strings
 */
export async function loadLanguage(lang = "en") {
  try {
    const path = LANGS[lang] || LANGS.en;
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP error loading ${path}`);

    const data = await res.json();

    // basic validation (prevent returning empty json)
    if (!data.app_title) {
      throw new Error(`Invalid language file: ${lang}`);
    }

    return data;
  } catch (err) {
    console.error(`[Lang] Error loading '${lang}':`, err);

    // fallback to English if not already en
    if (lang !== "en") {
      try {
        const fallbackRes = await fetch(LANGS.en);
        if (fallbackRes.ok) {
          return await fallbackRes.json();
        }
      } catch (fallbackErr) {
        console.error("[Lang] Fallback to English failed:", fallbackErr);
      }
    }

    // minimal fallback so UI tetap jalan
    return {
      app_title: "Secure Data Manager",
      app_desc: "Your encrypted data never leaves your device."
    };
  }
}
