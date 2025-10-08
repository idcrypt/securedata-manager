// src/index.js
const { useState, useEffect } = React;
const { createRoot } = ReactDOM;

// Komponen utama
function App() {
  const [lang, setLang] = useState("en");
  const [strings, setStrings] = useState({});

  useEffect(() => {
    loadLanguage(lang).then(setStrings);
  }, [lang]);

  return (
    <div className="container">
      <header>
        <img src="assets/logo.png" alt="Logo" />
        <h1>{strings.app_title || "Secure Data Manager"}</h1>
        <div id="lang-switch">
          <button
            onClick={() => setLang("en")}
            className={`lang-btn ${lang === "en" ? "active" : ""}`}
          >
            English
          </button>
          <button
            onClick={() => setLang("id")}
            className={`lang-btn ${lang === "id" ? "active" : ""}`}
          >
            Indonesia
          </button>
        </div>
      </header>

      <p id="app-desc">
        {strings.app_desc ||
          "Store your seed phrase, password, key, and secret notes securely with encryption & backup as a file."}
      </p>

      <section id="input-section">
        <h2>{strings.add_data || "Add Secret Data"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Encrypted & Saved locally!");
          }}
        >
          <label>{strings.data_type || "Data Type:"}</label>
          <select>
            <option>{strings.seed || "Seed Phrase"}</option>
            <option>{strings.pass || "Password"}</option>
            <option>{strings.key || "Key Phrase"}</option>
            <option>{strings.note || "Note"}</option>
          </select>

          <label>{strings.label || "Label/Name:"}</label>
          <input placeholder="Example: Ethereum Wallet / Gmail / API Key" />

          <label>{strings.secret_data || "Secret Data Content:"}</label>
          <textarea placeholder="Enter your secret data here"></textarea>

          <label>{strings.master || "Master Password (for backup):"}</label>
          <input
            type="password"
            placeholder="Create a backup password"
            required
          />
          <button type="submit">{strings.add_btn || "Add & Encrypt"}</button>
        </form>
      </section>

      <section id="list-section">
        <h2>{strings.saved || "Saved Data (Local)"}</h2>
        <ul id="data-list"></ul>
        <button id="download-btn">
          {strings.download || "Download Backup"}
        </button>
      </section>

      <section id="restore-section">
        <h2>{strings.restore || "Restore Backup"}</h2>
        <input type="file" accept=".json" />
        <input
          type="password"
          placeholder="Enter Master Password"
        />
        <button id="restore-btn">
          {strings.restore_btn || "Restore & Show"}
        </button>
        <ul id="restore-list"></ul>
      </section>

      <footer>
        <p>
          © 2025 Secure Data Manager | Your encrypted data never leaves your
          device.
        </p>
      </footer>
    </div>
  );
}

// Fungsi load bahasa manual (tanpa import)
async function loadLanguage(lang) {
  try {
    const res = await fetch(`lang/${lang}.json`);
    if (!res.ok) throw new Error(`Failed to load ${lang}`);
    return await res.json();
  } catch (err) {
    console.error("Language load error:", err);
    return {};
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
