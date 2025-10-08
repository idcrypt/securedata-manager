import React, { useState } from "react";

const EntryViewer = ({ entry, text, decrypted, onDecrypt }) => {
  const [master, setMaster] = useState("");

  if (!entry) return null;

  const handleDecrypt = () => {
    if (!master.trim()) {
      alert(text.no_password || "Please enter your master password.");
      return;
    }
    onDecrypt(master);
    setMaster("");
  };

  return (
    <div className="entry-viewer">
      <h3>{text.view_title || "Secret Data Detail"}</h3>
      <div className="entry-info">
        <p>
          <b>{text.label_type || "Type"}:</b>{" "}
          {text[`opt_${entry.type}`] || entry.type}
        </p>
        <p>
          <b>{text.label_label || "Label"}:</b> {entry.label}
        </p>
        <p>
          <b>{text.label_created || "Created"}:</b>{" "}
          {new Date(entry.created_at).toLocaleString()}
        </p>
      </div>

      {decrypted ? (
        <div className="decrypted-box">
          <p>
            <b>{text.label_data || "Secret Data"}:</b>
          </p>
          <textarea
            readOnly
            value={decrypted}
            className="decrypted-field"
          />
        </div>
      ) : (
        <div className="decrypt-form">
          <input
            type="password"
            placeholder={text.enter_master || "Enter Master Password"}
            value={master}
            onChange={(e) => setMaster(e.target.value)}
          />
          <button onClick={handleDecrypt}>
            {text.btn_decrypt || "Decrypt & View"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EntryViewer;
