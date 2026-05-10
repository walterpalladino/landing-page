import "./FormControls.css";

/** Labelled textarea. */
export default function Textarea({ id, label, name, value, onChange, placeholder, rows = 5, required }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
      />
    </div>
  );
}
