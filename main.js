import { loadLanguage } from "./src/utils/lang.js";

let currentLang = localStorage.getItem("lang") || "en";

async function setLanguage(lang) {
  const data = await loadLanguage(lang);
  if (!data.app_title) return;
  localStorage.setItem("lang", lang);

  document.title = data.app_title;
  document.querySelector("#appTitle").textContent = data.app_title;
  document.querySelector("#appDesc").textContent = data.app_desc;
  document.querySelector("#inputTitle").textContent = data.input_title;
  document.querySelector("#labelType").textContent = data.label_type;
  document.querySelector("#optSeed").textContent = data.opt_seed;
  document.querySelector("#optPass").textContent = data.opt_pass;
  document.querySelector("#optKey").textContent = data.opt_key;
  document.querySelector("#optNote").textContent = data.opt_note;
  document.querySelector("#labelLabel").textContent = data.label_label;
  document.querySelector("#labelData").textContent = data.label_data;
  document.querySelector("#labelMaster").textContent = data.label_master;
  document.querySelector("#btnAdd").textContent = data.btn_add;
  document.querySelector("#listTitle").textContent = data.list_title;
  document.querySelector("#downloadBtn").textContent = data.download_btn;
  document.querySelector("#restoreTitle").textContent = data.restore_title;
  document.querySelector("#restoreBtn").textContent = data.restore_btn;
  document.querySelector("#viewTitle").textContent = data.view_title;
  document.querySelector("#footerText").textContent = data.footer_text;
}

document.addEventListener("DOMContentLoaded", async () => {
  await setLanguage(currentLang);

  const langSelect = document.querySelector("#langSelect");
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener("change", (e) => setLanguage(e.target.value));
  }
});
