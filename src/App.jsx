import React, { useState, useEffect } from "react";
import EntryForm from "./components/EntryForm.jsx";
import EntryList from "./components/EntryList.jsx";
import BackupDownloader from "./components/BackupDownloader.jsx";
import RestoreForm from "./components/RestoreForm.jsx";
import EntryViewer from "./components/EntryViewer.jsx";
import { encryptData, decryptData } from "./utils/crypto.js";
import { loadLanguage } from "./utils/lang.js";

const LOCAL_KEY = "securedata_entries";

function App() {
  const [lang, setLang] = useState("en");
  const [text, setText] = useState({});
  const [entries, setEntries] = useState([]);
  const [viewIdx, setViewIdx] = useState(null);
  const [decryptedData, setDecryptedData] = useState(null);

  // 🔄 Load bahasa dari localStorage atau default "en"
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    setLang(savedLang);
  }, []);

  // 🌍 Fetch teks bahasa
  useEffect(() => {
    loadLanguage(lang)
      .then((t) => setText(t || {}))
      .catch(() => setText({ app_title: "Secure Data Manager" }));
    localStorage.setItem("lang", lang);
  }, [lang]);

  // 💾 Load dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch {
        console.warn("Failed to parse localStorage data.");
      }
    }
  }, []);

  // 🧠 Save ke localStorage setiap update
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleAdd = ({ type, label, data, master }) => {
    const encrypted = encryptData(data, master);
    setEntries((prev) => [
      ...prev,
      { type, label, encrypted, created_at: new Date().toISOString() },
    ]);
  };

  const handleView = (idx) => {
    setViewIdx(idx);
    setDecryptedData(null); // reset sebelumnya
  };

  const handleDecryptView = (idx, master) => {
    const entry = entries[idx];
    const decrypted = decryptData(entry.encrypted, master);
    if (!decrypted) {
      alert(text.decrypt_failed || "Incorrect master password.");
      return;
    }
    setDecryptedData(decrypted);
  };

  const handleRestore = (backup, master) => {
    if (!backup || !backup.entries) return;
    if (!window.confirm(text.restore_confirm || "Replace existing data with backup?"))
      return;

    const restored = backup.entries.map((entry) => {
      const decrypted = decryptData(entry.encrypted, master);
      return {
        ...entry,
        decrypted: decrypted || null,
      };
    });

    const successCount = restored.filter((e) => e.decrypted).length;
    if (successCount === 0) {
      alert(text.restore_error || "Invalid password or backup file.");
      return;
    }

    setEntries(restored);
    setViewIdx(null);
    alert(text.restore_success || "Backup restored successfully!");
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
        <EntryList
          entries={entries}
          text={text}
          onView={handleView}
        />
        <BackupDownloader entries={entries} text={text} />
      </section>

      <section>
        <h2>{text.restore_title}</h2>
        <RestoreForm text={text} onRestore={handleRestore} />
      </section>

      <section>
        {viewIdx !== null && (
          <EntryViewer
            entry={entries[viewIdx]}
            text={text}
            onDecrypt={(master) => handleDecryptView(viewIdx, master)}
            decrypted={decryptedData}
          />
        )}
      </section>

      <footer>
        <p>{text.footer_text || "All data stays safely on your device."}</p>
      </footer>
    </div>
  );
}

export default App;
