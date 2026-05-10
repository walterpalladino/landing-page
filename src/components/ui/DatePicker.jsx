import "./FormControls.css";

/**
 * DatePicker
 * Labelled native date input that restricts selection to today and beyond.
 */
export default function DatePicker({ id, label, name, value, onChange, required }) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type="date"
        min={today}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
