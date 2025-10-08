import React, { useState } from "react";

const EntryForm = ({ lang, text, onAdd }) => {
  const [type, setType] = useState("seed_phrase");
  const [label, setLabel] = useState("");
  const [data, setData] = useState("");
  const [master, setMaster] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label.trim() || !data.trim() || !master.trim()) {
      alert(text.fill_all_fields || "Please fill in all required fields.");
      return;
    }

    onAdd({
      type,
      label: label.trim(),
      data: data.trim(),
      master: master.trim(),
    });

    setLabel("");
    setData("");
    setMaster("");
    document.getElementById("label")?.focus();
  };

  return (
    <form id="secret-form" onSubmit={handleSubmit} className="entry-form">
      <label htmlFor="type">{text.label_type}</label>
      <select
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      >
        <option value="seed_phrase">{text.opt_seed}</option>
        <option value="password">{text.opt_pass}</option>
        <option value="key_phrase">{text.opt_key}</option>
        <option value="note">{text.opt_note}</option>
      </select>

      <label htmlFor="label">{text.label_label}</label>
      <input
        type="text"
        id="label"
        value={label}
        placeholder={text.label_label_placeholder}
        onChange={(e) => setLabel(e.target.value)}
        required
      />

      <label htmlFor="data">{text.label_data}</label>
      <textarea
        id="data"
        value={data}
        placeholder={text.label_data_placeholder}
        onChange={(e) => setData(e.target.value)}
        required
      />

      <label htmlFor="master">{text.label_master}</label>
      <input
        type="password"
        id="master"
        value={master}
        placeholder={text.label_master_placeholder}
        onChange={(e) => setMaster(e.target.value)}
        required
      />

      <button type="submit" id="btn-add">
        {text.btn_add}
      </button>
    </form>
  );
};

export default EntryForm;
