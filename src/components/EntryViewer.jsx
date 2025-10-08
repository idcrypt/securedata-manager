import React from "react";

const EntryViewer = ({ entry, text }) => {
  if (!entry) return null;
  return (
    <div className="entry-viewer">
      <h3>{text.view_title || "Secret Data Detail"}</h3>
      <p>
        <b>{text.label_type}:</b> {text[`opt_${entry.type}`] || entry.type}
      </p>
      <p>
        <b>{text.label_label}:</b> {entry.label}
      </p>
      <p>
        <b>{text.label_data}:</b> <span className="secret-data">{entry.decrypted}</span>
      </p>
    </div>
  );
};

export default EntryViewer;
