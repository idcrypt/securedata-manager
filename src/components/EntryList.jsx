import React from "react";

const EntryList = ({ entries, text, onView }) => {
  if (!entries || entries.length === 0) {
    return <p>{text.list_empty || "No secret data saved yet."}</p>;
  }
  return (
    <ul id="data-list">
      {entries.map((entry, idx) => (
        <li key={idx} className={`entry-${entry.type}`}>
          <b>{entry.label}</b> <span>({text[`opt_${entry.type}`] || entry.type})</span>
          <button onClick={() => onView(idx)}>{text.btn_view || "View"}</button>
        </li>
      ))}
    </ul>
  );
};

export default EntryList;
