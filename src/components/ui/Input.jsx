import "./FormControls.css";

/** Labelled text / email / tel input. */
export default function Input({ id, label, name, type = "text", value, onChange, placeholder, required }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
