import React from "react";

const BackupDownloader = ({ entries, text }) => {
  const handleDownload = () => {
    if (!entries || entries.length === 0) {
      alert(text.list_empty || "No data to download.");
      return;
    }

    const dataStr = JSON.stringify({ entries }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup_securedata.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return (
    <button type="button" onClick={handleDownload}>
      {text.download_btn || "Download Backup"}
    </button>
  );
};

export default BackupDownloader;
