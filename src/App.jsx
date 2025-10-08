import React, { useState, useEffect } from "react";
import EntryForm from "./components/EntryForm.jsx";
import EntryList from "./components/EntryList.jsx";
import BackupDownloader from "./components/BackupDownloader.jsx";
import RestoreForm from "./components/RestoreForm.jsx";
import EntryViewer from "./components/EntryViewer.jsx";
import { encryptData, decryptData } from "./utils/crypto.js";
import { exportBackup, importBackup } from "./utils/fileHandler.js";
import { loadLanguage } from "./utils/lang.js"; // ✅ import modul bahasa

const LOCAL_KEY = "securedata_entries";

function App() {
  const [lang, setLang] = useState("en");
  const [text, setText] = useState({});
  const [entries, setEntries] = useState([]);
  const [viewIdx, setViewIdx] = useState(null);

  // 🔄 Load bahasa dari localStorage atau default "en"
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    setLang(savedLang);
  }, []);

  // 🌍 Fetch teks bahasa saat ganti
  useEffect(() => {
    loadLanguage(lang).then(setText);
    localStorage.setItem("lang", lang);
  }, [lang]);

  // 💾 Load dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  // 🧠 Save ke localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleAdd = ({ type, label, data, master }) => {
    const encrypted = encryptData(data, master);
    setEntries([
      ...entries,
      { type, label, encrypted, created_at: new Date().toISOString() },
    ]);
  };

  const handleView = (idx) => setViewIdx(idx);

  const handleRestore = (backup, master) => {
    if (!backup || !backup.entries) return;
    const restored = backup.entries.map((entry) => ({
      ...entry,
      decrypted: decryptData(entry.encrypted, master),
    }));
    setEntries(restored);
    setViewIdx(null);
  };

  return (
    <div className="App">
      <header>
        <h1>{text.app_title || "Secure Data Manager"}</h1>
        <div id="lang-switch">
          <button
            className={lang === "en" ? "lang-btn active" : "lang-btn"}
            onClick={() => setLang("en")}
          >
            English
          </button>
          <button
            className={lang === "id" ? "lang-btn active" : "lang-btn"}
            onClick={() => setLang("id")}
          >
            Indonesia
          </button>
        </div>
      </header>

      <p>{text.app_desc}</p>

      <section>
        <h2>{text.input_title}</h2>
        <EntryForm lang={lang} text={text} onAdd={handleAdd} />
      </section>

      <section>
        <h2>{text.list_title}</h2>
        <EntryList entries={entries} text={text} onView={handleView} />
        <BackupDownloader entries={entries} text={text} />
      </section>

      <section>
        <h2>{text.restore_title}</h2>
        <RestoreForm text={text} onRestore={handleRestore} />
      </section>

      <section>
        <EntryViewer
          entry={viewIdx !== null ? entries[viewIdx] : null}
          text={text}
        />
      </section>

      <footer>
        <p>{text.footer_text}</p>
      </footer>
    </div>
  );
}

export default App;
