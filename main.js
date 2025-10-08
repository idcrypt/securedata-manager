const { useState, useEffect } = React;

// ===== Utils =====
function encryptData(data, master) {
  return CryptoJS.AES.encrypt(data, master).toString();
}
function decryptData(ciphertext, master) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, master);
    return bytes.toString(CryptoJS.enc.Utf8) || "[wrong password]";
  } catch {
    return "[wrong password]";
  }
}

// Simulasi lang
const LANGS = {
  en: {
    app_title: "Secure Data Manager",
    app_desc: "Store your secrets securely locally with encryption & backup.",
    input_title: "Add Secret Data",
    label_type: "Data Type:",
    opt_seed: "Seed Phrase",
    opt_pass: "Password",
    opt_key: "Key Phrase",
    opt_note: "Note",
    label_label: "Label/Name:",
    label_label_placeholder: "Example: Ethereum Wallet / Gmail / API Key",
    label_data: "Secret Data Content:",
    label_data_placeholder: "Enter your secret data here",
    label_master: "Master Password:",
    label_master_placeholder: "Enter master password",
    btn_add: "Add & Encrypt",
    list_title: "Saved Data (Local)",
    download_btn: "Download Backup",
    list_empty: "No secret data saved yet.",
    restore_title: "Restore Backup",
    restore_btn: "Restore & Show",
    restore_password_placeholder: "Enter master password",
    no_file_selected: "No file selected",
    no_password: "Please enter your master password",
    restore_error: "Invalid backup file",
    view_title: "Secret Data Detail",
    footer_text: "© 2025 Secure Data Manager | Your encrypted data never leaves your device."
  },
  id: {
    app_title: "Pengelola Data Aman",
    app_desc: "Simpan data rahasia Anda secara lokal dengan enkripsi & backup.",
    input_title: "Tambah Data Rahasia",
    label_type: "Jenis Data:",
    opt_seed: "Seed Phrase",
    opt_pass: "Password",
    opt_key: "Key Phrase",
    opt_note: "Catatan",
    label_label: "Label/Nama:",
    label_label_placeholder: "Contoh: Wallet Ethereum / Gmail / API Key",
    label_data: "Konten Data Rahasia:",
    label_data_placeholder: "Masukkan data rahasia Anda di sini",
    label_master: "Master Password:",
    label_master_placeholder: "Masukkan master password",
    btn_add: "Tambah & Enkripsi",
    list_title: "Data Tersimpan (Lokal)",
    download_btn: "Unduh Backup",
    list_empty: "Belum ada data rahasia tersimpan.",
    restore_title: "Pulihkan Backup",
    restore_btn: "Pulihkan & Tampilkan",
    restore_password_placeholder: "Masukkan master password",
    no_file_selected: "Belum ada file dipilih",
    no_password: "Masukkan master password",
    restore_error: "File backup tidak valid",
    view_title: "Detail Data Rahasia",
    footer_text: "© 2025 Pengelola Data Aman | Data terenkripsi Anda tetap di perangkat."
  }
};

// ===== Components =====
const EntryForm = ({ text, onAdd }) => {
  const [type, setType] = useState("seed_phrase");
  const [label, setLabel] = useState("");
  const [data, setData] = useState("");
  const [master, setMaster] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label || !data || !master) return;
    onAdd({ type, label, data, master });
    setLabel(""); setData(""); setMaster("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>{text.label_type}</label>
      <select value={type} onChange={e=>setType(e.target.value)}>
        <option value="seed_phrase">{text.opt_seed}</option>
        <option value="password">{text.opt_pass}</option>
        <option value="key_phrase">{text.opt_key}</option>
        <option value="note">{text.opt_note}</option>
      </select>

      <label>{text.label_label}</label>
      <input type="text" value={label} placeholder={text.label_label_placeholder}
        onChange={e=>setLabel(e.target.value)} required/>

      <label>{text.label_data}</label>
      <textarea value={data} placeholder={text.label_data_placeholder}
        onChange={e=>setData(e.target.value)} required/>

      <label>{text.label_master}</label>
      <input type="password" value={master} placeholder={text.label_master_placeholder}
        onChange={e=>setMaster(e.target.value)} required/>

      <button type="submit">{text.btn_add}</button>
    </form>
  );
};

const EntryList = ({ entries, text, onView }) => {
  if (!entries || entries.length === 0) return <p>{text.list_empty}</p>;
  return (
    <ul>
      {entries.map((e,i)=>(
        <li key={i}>
          <b>{e.label}</b> ({text[`opt_${e.type}`]})
          <button onClick={()=>onView(i)}>View</button>
        </li>
      ))}
    </ul>
  );
};

const BackupDownloader = ({ entries, text }) => {
  const handleDownload = () => {
    if (!entries.length) return alert(text.list_empty);
    const blob = new Blob([JSON.stringify({entries}, null, 2)], {type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "backup_securedata.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(a.href),100);
  };
  return <button onClick={handleDownload}>{text.download_btn}</button>;
};

const RestoreForm = ({ text, onRestore }) => {
  const [file,setFile]=useState(null);
  const [master,setMaster]=useState("");
  const handleRestore=()=>{
    if(!file)return alert(text.no_file_selected);
    if(!master)return alert(text.no_password);
    const reader=new FileReader();
    reader.onload=e=>{
      try{
        const backup=JSON.parse(e.target.result);
        onRestore(backup,master);
      }catch{
        alert(text.restore_error);
      }
    };
    reader.readAsText(file);
  };
  return (
    <div>
      <input type="file" onChange={e=>setFile(e.target.files[0])}/>
      <input type="password" placeholder={text.restore_password_placeholder} value={master} onChange={e=>setMaster(e.target.value)}/>
      <button onClick={handleRestore}>{text.restore_btn}</button>
    </div>
  );
};

const EntryViewer = ({ entry, text }) => {
  if(!entry) return null;
  return (
    <div className="entry-viewer">
      <h3>{text.view_title}</h3>
      <p><b>{text.label_type}</b>: {text[`opt_${entry.type}`]}</p>
      <p><b>{text.label_label}</b>: {entry.label}</p>
      <p><b>{text.label_data}</b>: {entry.decrypted || "[wrong password]"}</p>
    </div>
  );
};

// ===== App =====
function App() {
  const [lang,setLang]=useState("en");
  const [entries,setEntries]=useState([]);
  const [viewIdx,setViewIdx]=useState(null);
  const text=LANGS[lang];

  useEffect(()=>{
    const saved=localStorage.getItem("securedata_entries");
    if(saved)setEntries(JSON.parse(saved));
    const savedLang=localStorage.getItem("lang");
    if(savedLang)setLang(savedLang);
  },[]);

  useEffect(()=>{
    localStorage.setItem("securedata_entries",JSON.stringify(entries));
    localStorage.setItem("lang",lang);
  },[entries,lang]);

  const handleAdd=({type,label,data,master})=>{
    const encrypted=encryptData(data,master);
    setEntries([...entries,{type,label,encrypted,created_at:new Date().toISOString()}]);
  };

  const handleView=i=>setViewIdx(i);
  const handleRestore=(backup,master)=>{
    if(!backup.entries)return;
    const restored=backup.entries.map(e=>({...e,decrypted:decryptData(e.encrypted,master)}));
    setEntries(restored);
    setViewIdx(null);
  };

  return (
    <div className="container">
      <header>
        <img src="assets/logo.png" alt="Logo"/>
        <h1>{text.app_title}</h1>
        <div id="lang-switch">
          <button className={lang==="en"?"lang-btn active":"lang-btn"} onClick={()=>setLang("en")}>English</button>
          <button className={lang==="id"?"lang-btn active":"lang-btn"} onClick={()=>setLang("id")}>Indonesia</button>
        </div>
      </header>

      <p>{text.app_desc}</p>
      <section><h2>{text.input_title}</h2><EntryForm text={text} onAdd={handleAdd}/></section>
      <section><h2>{text.list_title}</h2><EntryList entries={entries} text={text} onView={handleView}/><BackupDownloader entries={entries} text={text}/></section>
      <section><h2>{text.restore_title}</h2><RestoreForm text={text} onRestore={handleRestore}/></section>
      <section><EntryViewer entry={viewIdx!==null?entries[viewIdx]:null} text={text}/></section>
      <footer><p>{text.footer_text}</p></footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
