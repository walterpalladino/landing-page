import { useState } from "react";

/**
 * useForm
 * Lightweight controlled-form hook.
 * @param {Object} initialValues - shape of the form fields
 */
export function useForm(initialValues) {
  const [values, setValues]   = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    onSubmit(values);
    setSubmitted(true);
  };

  const reset = () => {
    setValues(initialValues);
    setSubmitted(false);
  };

  return { values, submitted, handleChange, handleSubmit, reset };
}
