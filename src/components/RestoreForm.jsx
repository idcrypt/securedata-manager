import React, { useState } from "react";

const RestoreForm = ({ text, onRestore }) => {
  const [file, setFile] = useState(null);
  const [master, setMaster] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleRestore = () => {
    if (!file) return alert(text.no_file_selected);
    if (!master) return alert(text.no_password);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        onRestore(backup, master);
      } catch {
        alert(text.restore_error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <input
        type="password"
        placeholder={text.restore_password_placeholder}
        value={master}
        onChange={(e) => setMaster(e.target.value)}
      />
      <button type="button" onClick={handleRestore}>
        {text.restore_btn}
      </button>
    </div>
  );
};

export default RestoreForm;
