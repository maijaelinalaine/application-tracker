import { useState } from "react";

export const useForm = <T>(initialValues: T) => {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;

    const isCheckbox =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox";

    setFormData((prev) => ({
      ...prev,
      [id]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleReset = () => {
    setFormData(initialValues);
  };

  return {
    formData,
    handleChange,
    handleReset,
    setFormData,
  };
};
