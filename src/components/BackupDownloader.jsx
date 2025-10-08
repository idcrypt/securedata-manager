import React from "react";

const BackupDownloader = ({ entries, text }) => {
  const handleDownload = () => {
    const dataStr = JSON.stringify({ entries });
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup_securedata.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button id="download-btn" type="button" onClick={handleDownload}>
      {text.download_btn || "Download Backup"}
    </button>
  );
};

export default BackupDownloader;
