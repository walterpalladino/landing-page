import "./FormControls.css";

/** Labelled native select. */
export default function Select({ id, label, name, value, onChange, options = [] }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        <option value="">Select a service...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
