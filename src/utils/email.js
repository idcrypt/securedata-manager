// Utility untuk export dan import file backup JSON

// Export array entries sebagai file JSON
export function exportBackup(entries) {
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
}

// Import file JSON dan parsing isinya
export function importBackup(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const backup = JSON.parse(e.target.result);
      callback(backup);
    } catch (err) {
      callback(null);
    }
  };
  reader.readAsText(file);
}
