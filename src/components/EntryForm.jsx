import React, { useState } from "react";

const EntryForm = ({ lang, text, onAdd }) => {
  const [type, setType] = useState("seed_phrase");
  const [label, setLabel] = useState("");
  const [data, setData] = useState("");
  const [master, setMaster] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label || !data || !master) return;
    onAdd({ type, label, data, master });
    setLabel("");
    setData("");
    setMaster("");
  };

  return (
    <form id="secret-form" onSubmit={handleSubmit}>
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
        placeholder={text.label_label_placeholder}
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        required
      />

      <label htmlFor="data">{text.label_data}</label>
      <textarea
        id="data"
        placeholder={text.label_data_placeholder}
        value={data}
        onChange={(e) => setData(e.target.value)}
        required
      />

      <label htmlFor="master">{text.label_master}</label>
      <input
        type="password"
        id="master"
        placeholder={text.label_master_placeholder}
        value={master}
        onChange={(e) => setMaster(e.target.value)}
        required
      />

      <button type="submit">{text.btn_add}</button>
    </form>
  );
};

export default EntryForm;
