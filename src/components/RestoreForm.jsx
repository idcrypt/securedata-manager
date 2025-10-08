import React, { useState } from "react";

const RestoreForm = ({ text, onRestore }) => {
  const [file, setFile] = useState(null);
  const [master, setMaster] = useState("");

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded && uploaded.name.endsWith(".json")) {
      setFile(uploaded);
    } else {
      alert(text.invalid_file || "Please upload a valid JSON file.");
    }
  };

  const handleRestore = () => {
    if (!file) {
      alert(text.no_file_selected || "No file selected.");
      return;
    }
    if (!master.trim()) {
      alert(text.no_password || "Please enter your master password.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        if (!backup.entries) throw new Error("Invalid format");
        onRestore(backup, master.trim());
      } catch (err) {
        console.error(err);
        alert(text.restore_error || "Invalid backup file format.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="restore-form">
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
      />
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
