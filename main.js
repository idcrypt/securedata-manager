import { encryptData, decryptData } from "./src/utils/crypto.js";
import { exportBackup, importBackup } from "./src/utils/fileHandler.js";
import { sendBackupToEmail } from "./src/utils/email.js";

// ============ GLOBAL STATE ============
const STORAGE_KEY = "securedata_entries";
let entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
let currentLang = localStorage.getItem("lang") || "en";
let text = {};

// ============ LANGUAGE HANDLER ============
async function loadLanguage(lang) {
  try {
    const res = await fetch(`./lang/${lang}.json`);
    text = await res.json();
    applyLanguage();
    localStorage.setItem("lang", lang);
  } catch (err) {
    console.error("Failed to load language file:", err);
  }
}

function applyLanguage() {
  document.getElementById("app-title").innerText = text.app_title;
  document.getElementById("app-desc").innerText = text.app_desc;
  document.getElementById("input-title").innerText = text.input_title;
  document.getElementById("label-type").innerText = text.label_type;
  document.getElementById("label-label").innerText = text.label_label;
  document.getElementById("label-data").innerText = text.label_data;
  document.getElementById("label-master").innerText = text.label_master;
  document.getElementById("btn-add").innerText = text.btn_add;
  document.getElementById("list-title").innerText = text.list_title;
  document.getElementById("download-btn").innerText = text.download_btn;
  document.getElementById("restore-title").innerText = text.restore_title;
  document.getElementById("restore-btn").innerText = text.restore_btn;
  document.getElementById("footer-text").innerText = text.footer_text;
}

// ============ FORM HANDLER ============
document.getElementById("secret-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const type = document.getElementById("type").value;
  const label = document.getElementById("label").value;
  const data = document.getElementById("data").value;
  const master = document.getElementById("master").value;

  const encrypted = encryptData(data, master);
  entries.push({ type, label, encrypted, created_at: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));

  renderList();
  e.target.reset();
});

// ============ RENDER LOCAL DATA ============
function renderList() {
  const list = document.getElementById("data-list");
  list.innerHTML = "";
  if (entries.length === 0) {
    list.innerHTML = `<small>${text.list_empty}</small>`;
    return;
  }
  entries.forEach((entry, i) => {
    const li = document.createElement("li");
    li.textContent = `${entry.label} (${entry.type})`;
    list.appendChild(li);
  });
}

// ============ BACKUP / RESTORE ============
document.getElementById("download-btn").addEventListener("click", () => {
  exportBackup(entries);
});

document.getElementById("restore-btn").addEventListener("click", () => {
  const file = document.getElementById("restore-file").files[0];
  const pass = document.getElementById("restore-password").value;
  if (!file || !pass) return alert(text.no_password || "Please enter your master password.");

  importBackup(file, (backup) => {
    if (!backup || !backup.entries) return alert(text.restore_error);
    const ul = document.getElementById("restore-list");
    ul.innerHTML = "";
    backup.entries.forEach((entry) => {
      const decrypted = decryptData(entry.encrypted, pass);
      const li = document.createElement("li");
      li.textContent = `${entry.label}: ${decrypted || "[wrong password]"}`;
      ul.appendChild(li);
    });
  });
});

// ============ LANGUAGE SWITCH ============
document.getElementById("en-btn").onclick = () => {
  currentLang = "en";
  loadLanguage("en");
  document.getElementById("en-btn").classList.add("active");
  document.getElementById("id-btn").classList.remove("active");
};

document.getElementById("id-btn").onclick = () => {
  currentLang = "id";
  loadLanguage("id");
  document.getElementById("id-btn").classList.add("active");
  document.getElementById("en-btn").classList.remove("active");
};

// ============ INIT ============
loadLanguage(currentLang);
renderList();
