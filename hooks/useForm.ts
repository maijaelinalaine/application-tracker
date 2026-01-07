import React from "react";

export function useForm<T extends Record<string, any>>(initialState: T) {
  const [formData, setFormData] = React.useState<T>(initialState);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => setFormData(initialState);

  return { formData, handleChange, handleReset };
}
