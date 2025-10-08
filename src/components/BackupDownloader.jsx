import React from "react";

const BackupDownloader = ({ entries, text }) => {
  const handleDownload = () => {
    if (!entries || entries.length === 0) {
      alert(text.no_data || "No entries to backup.");
      return;
    }

    try {
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

      alert(text.download_success || "Backup file downloaded successfully!");
    } catch (err) {
      console.error(err);
      alert(text.download_error || "Error while creating backup file.");
    }
  };

  return (
    <button id="download-btn" type="button" onClick={handleDownload}>
      {text.download_btn || "Download Backup"}
    </button>
  );
};

export default BackupDownloader;
