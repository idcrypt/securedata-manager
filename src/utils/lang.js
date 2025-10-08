export const LANGS = {
  en: "/lang/en.json",
  id: "/lang/id.json",
};

export async function loadLanguage(lang) {
  try {
    const res = await fetch(LANGS[lang]);
    if (!res.ok) throw new Error("Language file not found");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Language load error:", err);
    return {};
  }
}
