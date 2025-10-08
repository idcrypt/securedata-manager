export const LANGS = {
  en: "/lang/en.json",
  id: "/lang/id.json",
};

export async function loadLanguage(lang) {
  const res = await fetch(LANGS[lang]);
  const data = await res.json();
  return data;
}
