import React, { useState } from "react";

const RestoreForm = ({ text, onRestore }) => {
  const [file, setFile] = useState(null);
  const [master, setMaster] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRestore = () => {
    if (!file) {
      alert(text.no_file_selected || "No file selected.");
      return;
    }
    if (!master) {
      alert(text.no_password || "Please enter your master password.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        onRestore(backup, master);
      } catch (err) {
        alert(text.restore_error || "Invalid backup file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <input
        type="password"
        placeholder={text.restore_password_placeholder || "Enter Master Password"}
        value={master}
        onChange={(e) => setMaster(e.target.value)}
      />
      <button id="restore-btn" type="button" onClick={handleRestore}>
        {text.restore_btn || "Restore & Show"}
      </button>
    </div>
  );
};

export default RestoreForm;
